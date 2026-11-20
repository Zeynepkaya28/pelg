// Sunucu uçlarının ortak yardımcıları. "_" ile başladığı için Vercel bunu ayrı bir uç olarak yayımlamaz.

// HTTP başlıkları yalnızca ASCII taşır (ı, ş gibi harfler fetch'i düşürür)
export const UA = "SeraDefteri/1.0 (plant care guide; https://sera-defteri.vercel.app)";
export const SHAPES = ["lily","rose","tulip","orchid","daisy","sunflower","lavender","carnation","hyacinth","narcissus","mum","hydrangea","violet","gerbera","peony","tree"];
export const TR_NAME_RE = /^[A-Za-zÇĞİÖŞÜçğıöşüâîû .'-]{2,60}$/;
const HEX = /^#[0-9a-fA-F]{6}$/;

export function json(body, status = 200, cacheControl = "no-store") {
  return new Response(JSON.stringify(body), {
    status,
    headers: { "content-type": "application/json; charset=utf-8", "cache-control": cacheControl, "x-content-type-options": "nosniff" },
  });
}

/** Dış API çağrısı: 6 sn zaman aşımı, hata olursa null (diğer kaynaklarla devam edilir). */
export async function getJSON(url, { ms = 6000, headers = {} } = {}) {
  const ctl = new AbortController();
  const t = setTimeout(() => ctl.abort(), ms);
  try {
    const r = await fetch(url, { headers: { "user-agent": UA, accept: "application/json", ...headers }, signal: ctl.signal });
    if (!r.ok) { console.warn("upstream", r.status, String(url).replace(/(key|token|api-key)=[^&]+/gi, "$1=***")); return null; }
    return await r.json();
  } catch (e) {
    console.warn("upstream fail", e.name, String(url).replace(/(key|token|api-key)=[^&]+/gi, "$1=***"));
    return null;
  } finally { clearTimeout(t); }
}

export const stripHtml = (s, max = 160) => String(s ?? "").replace(/<[^>]*>/g, "").replace(/&nbsp;/g, " ").replace(/&amp;/g, "&").replace(/[<>]/g, "").replace(/\s+/g, " ").trim().slice(0, max);
export const httpsOnly = (u) => (typeof u === "string" && /^https:\/\/[^\s"'<>]+$/.test(u) ? u : null);
export const clean = (s, max) => (typeof s === "string" ? s.replace(/[\u0000-\u001F\u007F<>]/g, " ").replace(/\s+/g, " ").trim().slice(0, max) : "");

/** Türkçe-duyarlı anahtar: "Şakayık" -> "sakayik" (ön yüzdeki norm() ile aynı). */
export const normKey = (s) => String(s).toLocaleLowerCase("tr").replace(/ı/g, "i").normalize("NFD").replace(/[̀-ͯ]/g, "").replace(/[^a-z0-9 ]+/g, " ").replace(/\s+/g, " ").trim();

/**
 * Yalnızca kendi sitemizden gelen istekler.
 * POST'ta tarayıcı her zaman Origin gönderir; yoksa ya da başka alan adıysa reddedilir.
 * GET'te Origin olmayabilir; o zaman Sec-Fetch-Site bakılır.
 */
export function sameOrigin(request, { requireOrigin = true } = {}) {
  const host = request.headers.get("x-forwarded-host") || request.headers.get("host") || "";
  const origin = request.headers.get("origin");
  if (origin) {
    try { return new URL(origin).host === host; } catch { return false; }
  }
  const site = request.headers.get("sec-fetch-site");
  if (site) return site === "same-origin" || site === "none";
  return !requireOrigin;
}

export const clientIp = (request) => (request.headers.get("x-forwarded-for") || "").split(",")[0].trim() || request.headers.get("x-real-ip") || "anon";

/**
 * Bellek içi kayan pencere sınırı (her sunucu örneği için ayrı).
 * Kalıcı çözüm: Vercel Firewall rate limit kuralı ya da Upstash Redis.
 */
export function makeLimiter(max, windowMs = 60_000) {
  const hits = new Map();
  return (key) => {
    const now = Date.now();
    const arr = (hits.get(key) || []).filter((t) => now - t < windowMs);
    arr.push(now); hits.set(key, arr);
    if (hits.size > 5000) for (const [k, v] of hits) if (now - v[v.length - 1] > windowMs) hits.delete(k);
    return arr.length > max;
  };
}

/* ---------------- Vercel AI Gateway ---------------- */
const GATEWAY = "https://ai-gateway.vercel.sh/v1/chat/completions";
export const AI_MODEL = process.env.AI_MODEL || "anthropic/claude-haiku-5.5";
const FALLBACKS = (process.env.AI_FALLBACKS ?? "google/gemini-3.6-flash,google/gemini-3.1-flash-lite").split(",").map((s) => s.trim()).filter(Boolean);

export async function chat(request, messages, { json: wantJson = false, maxTokens = 450 } = {}) {
  const token = process.env.AI_GATEWAY_API_KEY || request.headers.get("x-vercel-oidc-token") || process.env.VERCEL_OIDC_TOKEN;
  if (!token) throw Object.assign(new Error("no_token"), { code: "no_token" });
  const ctl = new AbortController(); const t = setTimeout(() => ctl.abort(), 25_000);
  try {
    const r = await fetch(GATEWAY, {
      method: "POST", signal: ctl.signal,
      headers: { authorization: `Bearer ${token}`, "content-type": "application/json" },
      body: JSON.stringify({
        model: AI_MODEL, models: FALLBACKS, messages,
        max_tokens: Math.min(900, maxTokens), temperature: 0.4,
        ...(wantJson ? { response_format: { type: "json_object" } } : {}),
      }),
    });
    if (!r.ok) {
      const e = new Error("gateway_" + r.status);
      e.code = r.status === 429 ? "rate_limited" : "gateway";
      e.detail = (await r.text()).slice(0, 300);
      throw e;
    }
    const d = await r.json();
    return String(d?.choices?.[0]?.message?.content || "");
  } finally { clearTimeout(t); }
}

export const PLANT_SCHEMA = `{"found":true,"name":"Türkçe ad","latin":"Latince tür veya cins adı","kind":"tür (ör. Saksı bitkisi)","blurb":"1-2 cümle","colors":[{"n":"Renk adı","hex":"#RRGGBB","m":"bu rengin çiçek dilindeki geleneksel anlamı, küçük harfle kısa"}],"care":{"light":[1-3,"metin"],"water":[1-3,"metin"],"soil":"","temp":"","humidity":"","feed":""},"good":["3-4 madde"],"bad":["3-4 madde"],"toxic":"kedi/köpek için zehirlilik; zehirsizse 'zehirsiz' kelimesini geçir","shape":"${SHAPES.join("|")} içinden en benzeri","center":"#RRGGBB"}`;

export function parseJsonLoose(text) {
  try { return JSON.parse(text.slice(text.indexOf("{"), text.lastIndexOf("}") + 1)); } catch { return null; }
}

/** Yapay zekâ çıktısı güvenilmez veridir: alan alan doğrula, yalnızca izinli biçimleri geçir. */
export function validatePlantCard(v) {
  if (!v || typeof v !== "object" || v.found !== true) return { found: false };
  const s = (x, m) => clean(x, m);
  const lvl = (x) => Math.max(1, Math.min(3, Math.round(+x) || 2));
  const arr = (a, m) => (Array.isArray(a) ? a.slice(0, 5).map((x) => clean(x, m)).filter(Boolean) : []);
  const C = v.care && typeof v.care === "object" ? v.care : {};
  const colors = (Array.isArray(v.colors) ? v.colors : []).slice(0, 6)
    .map((c) => ({ n: s(c?.n, 20), hex: HEX.test(c?.hex || "") ? c.hex : null, m: s(c?.m, 80) }))
    .filter((c) => c.n && c.hex);
  const name = s(v.name, 40);
  if (!name) return { found: false };
  return {
    found: true, name, latin: s(v.latin, 60), kind: s(v.kind, 40), blurb: s(v.blurb, 300), colors,
    care: {
      light: [lvl(C.light?.[0]), s(C.light?.[1], 120)], water: [lvl(C.water?.[0]), s(C.water?.[1], 120)],
      soil: s(C.soil, 120), temp: s(C.temp, 60), humidity: s(C.humidity, 60), feed: s(C.feed, 120),
    },
    good: arr(v.good, 140), bad: arr(v.bad, 140), toxic: s(v.toxic, 220),
    shape: SHAPES.includes(v.shape) ? v.shape : "daisy",
    center: HEX.test(v.center || "") ? v.center : "#E2C04A",
  };
}

/* ---------------- Supabase (yalnızca sunucu) ---------------- */
const SB_URL = process.env.SUPABASE_URL || "https://scsfclxgoxhogttmhazg.supabase.co";
const SB_PUBLISHABLE = "sb_publishable_HsDfOyv7qiU9dW_y-xeR5g_Y-slgaqr";

export async function cacheGet(key, maxAgeDays) {
  const since = new Date(Date.now() - maxAgeDays * 864e5).toISOString();
  const u = `${SB_URL}/rest/v1/plant_cache?key=eq.${encodeURIComponent(key)}&fetched_at=gte.${encodeURIComponent(since)}&select=data`;
  const rows = await getJSON(u, { ms: 4000, headers: { apikey: SB_PUBLISHABLE } });
  return Array.isArray(rows) && rows[0] ? rows[0].data : null;
}

/** plant_cache'e yalnızca service_role yazabilir (RLS'te yazma politikası yok). Anahtar yoksa sessizce atlanır. */
export async function cachePut(key, data) {
  const secret = process.env.SUPABASE_SERVICE_ROLE_KEY;
  if (!secret) return false;
  const ctl = new AbortController(); const t = setTimeout(() => ctl.abort(), 4000);
  try {
    const r = await fetch(`${SB_URL}/rest/v1/plant_cache?on_conflict=key`, {
      method: "POST", signal: ctl.signal,
      headers: {
        // yeni "sb_secret_…" anahtarları yalnızca apikey başlığıyla; eski JWT service_role anahtarı Bearer olarak da gider
        apikey: secret, ...(secret.startsWith("eyJ") ? { authorization: `Bearer ${secret}` } : {}), "content-type": "application/json",
        prefer: "resolution=merge-duplicates,return=minimal",
      },
      body: JSON.stringify({ key, data, fetched_at: new Date().toISOString() }),
    });
    if (!r.ok) console.warn("cachePut", r.status, (await r.text()).slice(0, 200));
    return r.ok;
  } catch (e) { console.warn("cachePut fail", e.name); return false; } finally { clearTimeout(t); }
}
