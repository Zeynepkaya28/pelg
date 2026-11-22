// npm test — ağ ya da anahtar gerektirmeyen birim testleri
import { test } from "node:test";
import assert from "node:assert/strict";

delete process.env.AI_GATEWAY_API_KEY; delete process.env.VERCEL_OIDC_TOKEN;
const { POST: ai } = await import("../api/ai.js");
const { POST: identify } = await import("../api/identify.js");
const { GET: care } = await import("../api/care.js");
const { GET: plant, commonsLicenseOk } = await import("../api/plant.js");
const { GET: stock } = await import("../api/stock.js");
const { validatePlantCard, sameOrigin, normKey } = await import("../api/_lib.js");

const req = (body, { origin = "https://sera.test", ip = "1.1.1.1", host = "sera.test" } = {}) =>
  new Request("https://sera.test/api/ai", {
    method: "POST", body: typeof body === "string" ? body : JSON.stringify(body),
    headers: { "content-type": "application/json", host, ...(origin ? { origin } : {}), "x-forwarded-for": ip },
  });

test("/api/ai: başka alan adından gelen istek 403", async () => {
  assert.equal((await ai(req({ mode: "ask", question: "neden" }, { origin: "https://kotu.example" }))).status, 403);
  assert.equal((await ai(req({ mode: "ask", question: "neden" }, { origin: null }))).status, 403);
  assert.equal((await ai(req({ mode: "ask", question: "neden" }, { origin: "bozuk:::" }))).status, 403);
});

test("/api/ai: aynı IP'den dakikada 9. istek 429", async () => {
  const codes = [];
  for (let i = 0; i < 9; i++) codes.push((await ai(req({ mode: "ask", question: "sarı yaprak?" }, { ip: "9.9.9.9" }))).status);
  assert.ok(codes.slice(0, 8).every((c) => c !== 429), codes.join());
  assert.equal(codes[8], 429);
});

test("/api/ai: 4 KB üstü gövde 413, bozuk JSON 400, kısa soru 400", async () => {
  assert.equal((await ai(req({ mode: "ask", question: "x".repeat(5000) }, { ip: "2.2.2.2" }))).status, 413);
  assert.equal((await ai(req("{bozuk", { ip: "2.2.2.3" }))).status, 400);
  assert.equal((await ai(req({ mode: "ask", question: "a" }, { ip: "2.2.2.4" }))).status, 400);
  assert.equal((await ai(req({ mode: "nope" }, { ip: "2.2.2.5" }))).status, 400);
});

test("yapay zekâ kartı doğrulaması: renk kodu, shape ve uzunluklar", () => {
  const v = validatePlantCard({
    found: true, name: "Begonya<script>", latin: "Begonia", colors: [{ n: "Kırmızı", hex: "#FF0000", m: "aşk" }, { n: "Kötü", hex: "red;background:url(x)", m: "x" }],
    care: { light: [9, "çok"], water: ["a", "az"] }, shape: "evil", center: "javascript:", good: ["x".repeat(500)],
  });
  assert.equal(v.found, true);
  assert.ok(!v.name.includes("<"));
  assert.deepEqual(v.colors.map((c) => c.hex), ["#FF0000"]);
  assert.equal(v.shape, "daisy");
  assert.equal(v.center, "#E2C04A");
  assert.equal(v.care.light[0], 3);
  assert.equal(v.care.water[0], 2);
  assert.equal(v.good[0].length, 140);
  assert.deepEqual(validatePlantCard({ found: "true" }), { found: false });
  assert.deepEqual(validatePlantCard(null), { found: false });
});

test("Commons lisans süzgeci: NC/ND ve GFDL reddedilir", () => {
  for (const ok of ["CC BY-SA 4.0", "CC BY 2.0", "CC0", "Public domain", "cc-by-sa-3.0"]) assert.equal(commonsLicenseOk(ok), true, ok);
  for (const no of ["CC BY-NC 2.0", "CC BY-NC-SA 4.0", "CC BY-ND 3.0", "GFDL 1.2", "", "All rights reserved"]) assert.equal(commonsLicenseOk(no), false, no);
});

test("/api/plant girdi doğrulaması", async () => {
  for (const q of ["latin=<script>", "latin=a", "latin=Lilium&tr=<b>", "latin=" + "A".repeat(80)])
    assert.equal((await plant(new Request("https://x/api/plant?" + q))).status, 400, q);
});

test("/api/care: başka siteden 403, geçersiz ad 400", async () => {
  const mk = (q, h = { host: "sera.test", "sec-fetch-site": "same-origin" }) => new Request("https://sera.test/api/care?" + q, { headers: h });
  assert.equal((await care(mk("name=Monstera", { host: "sera.test", "sec-fetch-site": "cross-site" }))).status, 403);
  assert.equal((await care(mk("name=<x>"))).status, 400);
  assert.equal((await care(mk("name=" + "a".repeat(41)))).status, 400);
});

test("/api/identify: kökeni yanlışsa 403; geçerli görsel ama AI erişimi yoksa 502", async () => {
  const fd = new FormData(); fd.append("image", new Blob([new Uint8Array([0xff, 0xd8, 0xff, 0])], { type: "image/jpeg" }), "a.jpg");
  assert.equal((await identify(new Request("https://sera.test/api/identify", { method: "POST", body: fd, headers: { host: "sera.test", origin: "https://kotu.example" } }))).status, 403);
  assert.equal((await identify(new Request("https://sera.test/api/identify", { method: "POST", body: fd, headers: { host: "sera.test", origin: "https://sera.test", "x-forwarded-for": "6.6.6.6" } }))).status, 502);
});

test("/api/identify: sahte uzantılı dosya 415", async () => {
  const fd = new FormData(); fd.append("image", new Blob([new TextEncoder().encode("<html>not an image")], { type: "image/png" }), "a.png");
  const r = await identify(new Request("https://sera.test/api/identify", { method: "POST", body: fd, headers: { host: "sera.test", origin: "https://sera.test", "x-forwarded-for": "5.5.5.5" } }));
  assert.equal(r.status, 415);
});

test("/api/stock: yalnızca bilinen kategoriler", async () => {
  assert.equal((await stock(new Request("https://x/api/stock?cat=__proto__"))).status, 400);
  assert.equal((await stock(new Request("https://x/api/stock?cat=Bilinmeyen"))).status, 400);
});

test("Türkçe anahtar normalleştirme", () => {
  assert.equal(normKey("Şakayık"), "sakayik");
  assert.equal(normKey("  IĞDIR  Çiçeği "), "igdir cicegi");
});

test("sameOrigin: GET'te Sec-Fetch-Site", () => {
  const h = (o) => new Request("https://sera.test/", { headers: { host: "sera.test", ...o } });
  assert.equal(sameOrigin(h({ "sec-fetch-site": "same-origin" })), true);
  assert.equal(sameOrigin(h({ "sec-fetch-site": "cross-site" })), false);
  assert.equal(sameOrigin(h({})), false);
});

test("api/_plants.js app.js ile aynı (değiştiyse: node scripts/gen-plants.mjs)", async () => {
  const { buildPlants } = await import("../scripts/gen-plants.mjs");
  const { readFileSync } = await import("node:fs");
  assert.equal(readFileSync(new URL("../api/_plants.js", import.meta.url), "utf8"), buildPlants());
});

test("paylaşım önizlemesi: başlık, açıklama, og etiketleri ve kaçış", async () => {
  const { renderHead } = await import("../api/page.js");
  const html = '<html><head><title>Sera Defteri</title>\n<meta name="description" content="eski">\n<link rel="canonical" href="https://x/">\n<meta property="og:title" content="eski">\n</head><body></body></html>';
  const out = renderHead(html, { title: 'Pembe "Orkide" <b>', desc: "a & b", url: "https://pelg.vercel.app/bitki/orkide", image: { src: "https://img.example/a.jpg", alt: "foto" } });
  assert.match(out, /<title>Pembe &quot;Orkide&quot; &lt;b&gt;<\/title>/);
  assert.match(out, /<meta name="description" content="a &amp; b">/);
  assert.match(out, /<link rel="canonical" href="https:\/\/pelg.vercel.app\/bitki\/orkide">/);
  assert.match(out, /<meta property="og:image" content="https:\/\/img.example\/a.jpg">/);
  assert.equal((out.match(/og:title/g) || []).length, 1);
  assert.ok(!out.includes("<b>"));
});

test("/api/page: bilinmeyen bitki 404", async () => {
  const { GET } = await import("../api/page.js");
  assert.equal((await GET(new Request("https://x/api/page?id=yokboyle"))).status, 404);
  assert.equal((await GET(new Request("https://x/api/page?id=__proto__"))).status, 404);
});

test("/api/info: girdi doğrulaması ve bölüm metni temizliği", async () => {
  const { GET, sectionText } = await import("../api/info.js");
  assert.equal((await GET(new Request("https://x/api/info?latin=<x>"))).status, 400);
  assert.equal((await GET(new Request("https://x/api/info?latin=Rosa&tr=<b>"))).status, 400);
  const html = '<div class="toc"><ul><li>1 Uses 1.1 Food and drink</li></ul></div><h2>Uses</h2><p>Gül suyu <b>cilt</b> için kullanılır<sup>[1]</sup> ve çok eskidir.</p><table><tr><td>tablo</td></tr></table><p>短 Rosa damascena yağı parfümcülükte önemlidir, uzun cümle.</p>';
  const t = sectionText(html);
  assert.ok(!t.includes("1 Uses"), t);
  assert.ok(!t.includes("tablo") && !t.includes("[1]") && !t.includes("<"), t);
  assert.ok(t.includes("Gül suyu cilt için kullanılır") && t.includes("Rosa damascena"), t);
  assert.ok(!/[㐀-鿿]/.test(t), t);
});

test("/api/lookup: başka siteden 403, geçersiz ad 400", async () => {
  const { GET } = await import("../api/lookup.js");
  const mk = (q, site = "same-origin") => new Request("https://sera.test/api/lookup?" + q, { headers: { host: "sera.test", "sec-fetch-site": site, "x-forwarded-for": "7.7.7.7" } });
  assert.equal((await GET(mk("name=Begonya", "cross-site"))).status, 403);
  assert.equal((await GET(mk("name=<script>"))).status, 400);
});
