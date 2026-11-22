// GET /bitki/:id  (vercel.json rewrite -> /api/page?id=:id)
// Bitki sayfasının HTML'ini, paylaşım önizlemesi ve arama motorları için bitkiye özel başlık,
// açıklama ve Open Graph etiketleriyle döner. Sayfanın geri kalanı index.html ile aynıdır.
import { readFile } from "node:fs/promises";
import path from "node:path";
import { PLANTS } from "./_plants.js";
import { GET as plantMedia } from "./plant.js";

const SITE = "Sera Defteri";
const slug = (s) => String(s).toLocaleLowerCase("tr").replace(/ı/g, "i").normalize("NFD").replace(/[̀-ͯ]/g, "").replace(/[^a-z0-9]+/g, "-").replace(/^-|-$/g, "");
const esc = (s) => String(s).replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;").replace(/"/g, "&quot;").replace(/'/g, "&#39;");

let template = null;
async function indexHtml() {
  // vercel.json: functions["api/page.js"].includeFiles = "index.html"
  template ??= await readFile(path.join(process.cwd(), "index.html"), "utf8");
  return template;
}

/** Önizleme görseli: rehberin kullandığı lisanslı ilk fotoğraf (CDN'de önbellekli; 4 sn'de gelmezse görselsiz). */
async function ogImage(p) {
  const [latin, tr] = p.lookup || [];
  if (!latin) return null;
  try {
    const r = await Promise.race([
      plantMedia(new Request(`https://x/api/plant?latin=${encodeURIComponent(latin)}&tr=${encodeURIComponent(tr || "")}`)),
      new Promise((res) => setTimeout(() => res(null), 4000)),
    ]);
    const d = r && r.ok ? await r.json() : null;
    const ph = d?.photos?.[0];
    return ph && /^https:\/\//.test(ph.src) ? { src: ph.src, alt: `${p.name} fotoğrafı — ${ph.author} (${ph.license})` } : null;
  } catch { return null; }
}

export function renderHead(html, { title, desc, url, image }) {
  const tags = [
    `<meta property="og:type" content="article">`,
    `<meta property="og:site_name" content="${esc(SITE)}">`,
    `<meta property="og:locale" content="tr_TR">`,
    `<meta property="og:title" content="${esc(title)}">`,
    `<meta property="og:description" content="${esc(desc)}">`,
    `<meta property="og:url" content="${esc(url)}">`,
    image ? `<meta property="og:image" content="${esc(image.src)}">\n<meta property="og:image:alt" content="${esc(image.alt)}">` : "",
    `<meta name="twitter:card" content="${image ? "summary_large_image" : "summary"}">`,
  ].filter(Boolean).join("\n");
  return html
    .replace(/<title>[^<]*<\/title>/, `<title>${esc(title)}</title>`)
    .replace(/<meta name="description" content="[^"]*">/, `<meta name="description" content="${esc(desc)}">`)
    .replace(/<link rel="canonical" href="[^"]*">/, `<link rel="canonical" href="${esc(url)}">`)
    .replace(/<meta property="og:[^>]*>\n?|<meta name="twitter:[^>]*>\n?/g, "")
    .replace("</head>", `${tags}\n</head>`);
}

export async function GET(request) {
  const u = new URL(request.url);
  const id = u.searchParams.get("id") || "";
  const html = await indexHtml();
  const p = /^[a-z]{2,20}$/.test(id) && Object.hasOwn(PLANTS, id) ? PLANTS[id] : null;
  if (!p) {
    // bilinmeyen bitki: ana sayfa, arama motorları için 404
    return new Response(html, { status: 404, headers: { "content-type": "text/html; charset=utf-8", "cache-control": "public, s-maxage=3600" } });
  }
  const rk = u.searchParams.get("renk") || "";
  const c = p.colors.find((x) => slug(x.n) === rk) || null;
  const origin = `https://${request.headers.get("x-forwarded-host") || request.headers.get("host") || "pelg.vercel.app"}`;
  const title = `${c ? c.n + " " : ""}${p.name} bakımı ve renklerin anlamı — ${SITE}`;
  const m = c || p.colors[0];
  const desc = `${p.name} (${p.latin}): ${p.blurb} ${m.n} ${p.name.toLocaleLowerCase("tr")}: ${m.m}.`.slice(0, 300);
  const out = renderHead(html, { title, desc, url: `${origin}/bitki/${id}`, image: await ogImage(p) });
  return new Response(out, {
    status: 200,
    headers: { "content-type": "text/html; charset=utf-8", "cache-control": "public, s-maxage=86400, stale-while-revalidate=604800" },
  });
}
