// GET /api/lookup?name=Begonya
// Rehberde olmayan bir bitki için yapay zekâ gerektirmeyen "ansiklopedi kartı":
// Türkçe/İngilizce Vikipedi + Wikidata + GBIF. Bakım bilgisi üretmez; yalnızca kaynakta yazanı döner.
import { json, sameOrigin, clientIp, makeLimiter, clean, TR_NAME_RE } from "./_lib.js";
import { gather } from "./care.js";

const limited = makeLimiter(20);

export async function GET(request) {
  if (!sameOrigin(request)) return json({ error: "forbidden" }, 403);
  if (limited(clientIp(request))) return json({ error: "rate_limited" }, 429);
  const name = (new URL(request.url).searchParams.get("name") || "").trim().replace(/\s+/g, " ");
  if (!TR_NAME_RE.test(name) || name.length > 40) return json({ error: "Geçersiz bitki adı" }, 400);

  const { sources, raw } = await gather(name);
  const plant = raw.gbif?.kingdom === "Plantae" && raw.latin;
  if (!plant) return json({ found: false }, 200, "public, s-maxage=3600");
  const blurb = raw.vikipedi_tr || raw.wikipedia_en || "";
  return json({
    found: true,
    name: clean(name.charAt(0).toLocaleUpperCase("tr") + name.slice(1), 40),
    latin: clean(raw.latin, 80),
    family: clean(raw.gbif?.family, 60),
    blurb: clean(blurb, 600),
    blurbLang: raw.vikipedi_tr ? "tr" : raw.wikipedia_en ? "en" : null,
    sources,
  }, 200, "public, s-maxage=604800, stale-while-revalidate=86400");
}
