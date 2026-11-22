// GET /api/geocode?q=Alsancak, Kıbrıs Şehitleri Cd. 12, İzmir
// Çiçekçinin adresinden harita konumu: OpenStreetMap Nominatim (anahtar gerekmez).
// Nominatim kullanım kuralları: tanımlayıcı User-Agent, saniyede en fazla 1 istek, toplu sorgu yok.
// Bu yüzden: IP başına dakikada 10, sunucu örneği başına saniyede 1 istek; sonuç CDN'de 30 gün saklanır.
import { json, getJSON, clean, sameOrigin, clientIp, makeLimiter } from "./_lib.js";

const limited = makeLimiter(10);
const Q_RE = /^[\p{L}\p{N} .,'/#:()&-]{5,200}$/u;
let last = 0;

export async function GET(request) {
  if (!sameOrigin(request)) return json({ error: "forbidden" }, 403);
  const q = (new URL(request.url).searchParams.get("q") || "").trim().replace(/\s+/g, " ");
  if (!Q_RE.test(q)) return json({ error: "Geçersiz adres" }, 400);
  if (limited(clientIp(request))) return json({ error: "rate_limited" }, 429);

  // saniyede en fazla 1 istek
  const wait = last + 1100 - Date.now();
  if (wait > 0) await new Promise((r) => setTimeout(r, wait));
  last = Date.now();

  const u = `https://nominatim.openstreetmap.org/search?format=jsonv2&limit=1&countrycodes=tr&accept-language=tr&q=${encodeURIComponent(q)}`;
  const r = await getJSON(u, { ms: 6000 });
  const hit = Array.isArray(r) ? r[0] : null;
  const lat = Number(hit?.lat), lon = Number(hit?.lon);
  // yalnızca Türkiye sınırları içindeki sonuçlar (veritabanı da aynı aralığı denetler)
  if (!hit || !(lat >= 35 && lat <= 43 && lon >= 25 && lon <= 45)) return json({ found: false }, 200, "public, s-maxage=86400");
  return json({ found: true, lat: Math.round(lat * 1e6) / 1e6, lon: Math.round(lon * 1e6) / 1e6, label: clean(hit.display_name, 200) },
    200, "public, s-maxage=2592000");
}
