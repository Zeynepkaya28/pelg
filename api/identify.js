// POST /api/identify  (multipart: image=<tek fotoğraf>)
// Pl@ntNet ile fotoğraftan bitki tanıma. Anahtar sunucuda kalır; dosya türü ve boyutu burada da doğrulanır.
import { json, clean, sameOrigin, clientIp, makeLimiter, UA } from "./_lib.js";

const limited = makeLimiter(6);
const MAX = 5 * 1024 * 1024;
const TYPES = { "image/jpeg": [0xff, 0xd8, 0xff], "image/png": [0x89, 0x50, 0x4e, 0x47], "image/webp": [0x52, 0x49, 0x46, 0x46] };

function magicOk(type, bytes) {
  const sig = TYPES[type];
  if (!sig || !sig.every((b, i) => bytes[i] === b)) return false;
  // WEBP: "RIFF....WEBP"
  return type !== "image/webp" || String.fromCharCode(...bytes.slice(8, 12)) === "WEBP";
}

export async function POST(request) {
  if (!sameOrigin(request)) return json({ error: "forbidden" }, 403);
  if (limited(clientIp(request))) return json({ error: "rate_limited" }, 429);
  const key = process.env.PLANTNET_KEY;
  if (!key) return json({ error: "not_configured" }, 503);

  const len = Number(request.headers.get("content-length") || 0);
  if (len > MAX + 64 * 1024) return json({ error: "too_large" }, 413);
  if (!/^multipart\/form-data/i.test(request.headers.get("content-type") || "")) return json({ error: "bad_request" }, 400);

  let file;
  try { file = (await request.formData()).get("image"); } catch { return json({ error: "bad_request" }, 400); }
  if (!file || typeof file === "string") return json({ error: "no_file" }, 400);
  if (file.size > MAX) return json({ error: "too_large" }, 413);
  const bytes = new Uint8Array(await file.arrayBuffer());
  if (!TYPES[file.type] || !magicOk(file.type, bytes)) return json({ error: "bad_type" }, 415);

  const fd = new FormData();
  fd.append("images", new Blob([bytes], { type: file.type }), "photo." + file.type.split("/")[1]);
  fd.append("organs", "auto");
  const ctl = new AbortController(); const t = setTimeout(() => ctl.abort(), 12_000);
  try {
    const r = await fetch(`https://my-api.plantnet.org/v2/identify/all?api-key=${encodeURIComponent(key)}&lang=tr&nb-results=5`, {
      method: "POST", body: fd, signal: ctl.signal, headers: { "user-agent": UA },
    });
    if (r.status === 404) return json({ results: [] }); // Pl@ntNet: tür bulunamadı
    if (!r.ok) { console.error("plantnet", r.status, (await r.text()).slice(0, 200)); return json({ error: "unavailable" }, 502); }
    const d = await r.json();
    const results = (Array.isArray(d?.results) ? d.results : []).slice(0, 5).map((x) => ({
      score: Math.max(0, Math.min(1, Number(x?.score) || 0)),
      latin: clean(x?.species?.scientificNameWithoutAuthor, 80),
      genus: clean(x?.species?.genus?.scientificNameWithoutAuthor, 60),
      family: clean(x?.species?.family?.scientificNameWithoutAuthor, 60),
      common: (Array.isArray(x?.species?.commonNames) ? x.species.commonNames : []).slice(0, 3).map((c) => clean(c, 40)).filter(Boolean),
    })).filter((x) => x.latin);
    return json({ results });
  } catch (e) {
    console.error("plantnet fail", e.name);
    return json({ error: "unavailable" }, 502);
  } finally { clearTimeout(t); }
}
