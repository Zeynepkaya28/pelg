// GET /api/plant?latin=Lilium&tr=Zambak
// Gerçek fotoğraflar (iNaturalist + Wikimedia Commons) ve Türkçe Vikipedi özeti.
// Yalnızca ticari kullanıma uygun lisanslar (CC0, CC BY, CC BY-SA) döner; her fotoğrafta sahibi ve lisansı vardır.

const UA = "SeraDefteri/1.0 (bitki bakım rehberi; https://sera-defteri.vercel.app)";
const OK_LICENSES = new Set(["cc0", "cc-by", "cc-by-sa"]);
const LATIN_RE = /^[A-Za-z][A-Za-z .×-]{1,59}$/;
const TR_RE = /^[A-Za-zÇĞİÖŞÜçğıöşüâîû .'-]{2,60}$/;

const json = (body, status = 200, cache = true) =>
  new Response(JSON.stringify(body), {
    status,
    headers: {
      "content-type": "application/json; charset=utf-8",
      // CDN'de 7 gün sakla; kaynak API'lere her ziyaretçide gidilmez
      "cache-control": cache ? "public, s-maxage=604800, stale-while-revalidate=86400" : "no-store",
      "x-content-type-options": "nosniff",
    },
  });

async function getJSON(url, ms = 6000) {
  const ctl = new AbortController();
  const t = setTimeout(() => ctl.abort(), ms);
  try {
    const r = await fetch(url, { headers: { "user-agent": UA, accept: "application/json" }, signal: ctl.signal });
    if (!r.ok) return null;
    return await r.json();
  } catch { return null; } finally { clearTimeout(t); }
}

const stripHtml = (s) => String(s || "").replace(/<[^>]*>/g, "").replace(/\s+/g, " ").trim().slice(0, 160);
const httpsOnly = (u) => (typeof u === "string" && /^https:\/\//.test(u) ? u : null);

async function inaturalist(latin) {
  const q = await getJSON(`https://api.inaturalist.org/v1/taxa?q=${encodeURIComponent(latin)}&is_active=true&per_page=5`);
  const want = latin.toLowerCase();
  const taxon = q?.results?.find((t) => t.name?.toLowerCase() === want) || q?.results?.[0];
  if (!taxon?.id) return { taxon: null, photos: [] };
  const full = await getJSON(`https://api.inaturalist.org/v1/taxa/${taxon.id}`);
  const tp = full?.results?.[0]?.taxon_photos || [];
  const photos = [];
  for (const { photo } of tp) {
    if (!photo || !OK_LICENSES.has(photo.license_code)) continue;
    const base = httpsOnly(photo.url);
    if (!base) continue;
    photos.push({
      src: base.replace(/\/square\.(jpe?g|png)/i, "/large.$1"),
      thumb: base.replace(/\/square\.(jpe?g|png)/i, "/small.$1"),
      author: stripHtml(photo.attribution),
      license: photo.license_code.toUpperCase().replace("CC0", "CC0"),
      page: `https://www.inaturalist.org/photos/${photo.id}`,
      source: "iNaturalist",
    });
    if (photos.length >= 8) break;
  }
  return { taxon: { id: taxon.id, name: taxon.name, common: taxon.preferred_common_name || "" }, photos };
}

async function commons(latin, need) {
  if (need <= 0) return [];
  const u = new URL("https://commons.wikimedia.org/w/api.php");
  Object.entries({
    action: "query", format: "json", origin: "*", generator: "search",
    gsrsearch: `${latin} flower filetype:bitmap`, gsrnamespace: "6", gsrlimit: "12",
    prop: "imageinfo", iiprop: "url|extmetadata", iiurlwidth: "1200",
    iiextmetadatafilter: "LicenseShortName|Artist|LicenseUrl",
  }).forEach(([k, v]) => u.searchParams.set(k, v));
  const r = await getJSON(u.toString());
  const pages = Object.values(r?.query?.pages || {});
  const out = [];
  for (const p of pages) {
    const ii = p.imageinfo?.[0]; const m = ii?.extmetadata || {};
    const lic = String(m.LicenseShortName?.value || "").toLowerCase();
    const okLic = lic.includes("public domain") || lic === "cc0" || /^cc by(-sa)? \d/.test(lic) || /^cc-by(-sa)?-\d/.test(lic);
    if (!okLic || /nc|nd/.test(lic.replace("cc0", ""))) continue;
    const src = httpsOnly(ii.thumburl), page = httpsOnly(ii.descriptionurl);
    if (!src || !page) continue;
    out.push({ src, thumb: src.replace(/\/\d+px-/, "/320px-"), author: stripHtml(m.Artist?.value) || "Wikimedia Commons", license: m.LicenseShortName.value, page, source: "Wikimedia Commons" });
    if (out.length >= need) break;
  }
  return out;
}

async function wikiTr(tr) {
  if (!tr) return null;
  const r = await getJSON(`https://tr.wikipedia.org/api/rest_v1/page/summary/${encodeURIComponent(tr.replace(/ /g, "_"))}`);
  if (!r || r.type === "disambiguation" || !r.extract) return null;
  return { text: String(r.extract).slice(0, 700), url: httpsOnly(r.content_urls?.desktop?.page) };
}

export async function GET(request) {
  const url = new URL(request.url);
  const latin = (url.searchParams.get("latin") || "").trim();
  const tr = (url.searchParams.get("tr") || "").trim();
  if (!LATIN_RE.test(latin) || (tr && !TR_RE.test(tr))) return json({ error: "Geçersiz bitki adı" }, 400, false);

  const [nat, wiki] = await Promise.all([inaturalist(latin), wikiTr(tr)]);
  const extra = await commons(latin, 6 - nat.photos.length);
  const photos = [...nat.photos, ...extra].slice(0, 8);
  return json({ latin, taxon: nat.taxon, photos, wiki });
}
