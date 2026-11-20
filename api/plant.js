// GET /api/plant?latin=Lilium&tr=Zambak
// Gerçek fotoğraflar (iNaturalist + Wikimedia Commons) ve Türkçe Vikipedi özeti.
// Yalnızca ticari kullanıma uygun lisanslar (CC0, CC BY, CC BY-SA, kamu malı) döner; her fotoğrafta sahibi ve lisansı vardır.
import { json, getJSON, stripHtml, httpsOnly } from "./_lib.js";

const TR_TITLE_RE = /^[A-Za-zÇĞİÖŞÜçğıöşüâîû .'()-]{2,60}$/;

const OK_LICENSES = new Set(["cc0", "cc-by", "cc-by-sa"]);
const LATIN_RE = /^[A-Za-z][A-Za-z .×-]{1,59}$/;
const CACHE = "public, s-maxage=604800, stale-while-revalidate=86400"; // CDN'de 7 gün

async function inaturalist(latin) {
  const q = await getJSON(`https://api.inaturalist.org/v1/taxa?q=${encodeURIComponent(latin)}&is_active=true&per_page=5`);
  const want = latin.toLowerCase();
  const taxon = q?.results?.find((t) => t.name?.toLowerCase() === want) || q?.results?.[0];
  if (!taxon?.id) return { taxon: null, photos: [] };
  const full = await getJSON(`https://api.inaturalist.org/v1/taxa/${Number(taxon.id)}`);
  const tp = full?.results?.[0]?.taxon_photos || [];
  const photos = [];
  for (const { photo } of tp) {
    // lisanssız ya da NC/ND fotoğraflar atılır
    if (!photo || !OK_LICENSES.has(photo.license_code)) continue;
    const base = httpsOnly(photo.url);
    if (!base || !/\/square\.(jpe?g|png)/i.test(base)) continue;
    photos.push({
      src: base.replace(/\/square\.(jpe?g|png)/i, "/large.$1"),
      thumb: base.replace(/\/square\.(jpe?g|png)/i, "/small.$1"),
      author: stripHtml(photo.attribution, 160) || "iNaturalist katılımcısı",
      license: photo.license_code.toUpperCase(),
      page: `https://www.inaturalist.org/photos/${Number(photo.id)}`,
      source: "iNaturalist",
    });
    if (photos.length >= 8) break;
  }
  return { taxon: { id: Number(taxon.id), name: stripHtml(taxon.name, 80), common: stripHtml(taxon.preferred_common_name, 80) }, photos };
}

/** "CC BY-SA 4.0", "CC0", "Public domain" kabul; NC / ND içerenler ret. */
export function commonsLicenseOk(raw) {
  const lic = String(raw || "").toLowerCase().trim();
  if (!lic) return false;
  if (/\bnc\b|-nc|\bnd\b|-nd|noncommercial|noderiv/.test(lic)) return false;
  return lic === "cc0" || lic.startsWith("public domain") || lic === "pd" || /^cc[ -]by(-sa)?[ -]\d(\.\d)?$/.test(lic);
}

async function commons(latin, need) {
  if (need <= 0) return [];
  const u = new URL("https://commons.wikimedia.org/w/api.php");
  Object.entries({
    action: "query", format: "json", generator: "search",
    gsrsearch: `${latin} flower filetype:bitmap`, gsrnamespace: "6", gsrlimit: "12",
    prop: "imageinfo", iiprop: "url|extmetadata", iiurlwidth: "1200",
    iiextmetadatafilter: "LicenseShortName|Artist|LicenseUrl",
  }).forEach(([k, v]) => u.searchParams.set(k, v));
  const r = await getJSON(u.toString());
  const pages = Object.values(r?.query?.pages || {}).sort((a, b) => (a.index ?? 0) - (b.index ?? 0));
  const out = [];
  for (const p of pages) {
    const ii = p.imageinfo?.[0]; const m = ii?.extmetadata || {};
    if (!commonsLicenseOk(m.LicenseShortName?.value)) continue;
    const src = httpsOnly(ii?.thumburl), page = httpsOnly(ii?.descriptionurl);
    if (!src || !page || !/^https:\/\/(upload|thumb)\.wikimedia\.org\//.test(src)) continue;
    out.push({
      src, thumb: src.replace(/\/\d+px-/, "/320px-"),
      author: stripHtml(m.Artist?.value, 120) || "Wikimedia Commons",
      license: stripHtml(m.LicenseShortName.value, 30), page, source: "Wikimedia Commons",
    });
    if (out.length >= need) break;
  }
  return out;
}

async function wikiTr(tr) {
  if (!tr) return null;
  const r = await getJSON(`https://tr.wikipedia.org/api/rest_v1/page/summary/${encodeURIComponent(tr.replace(/ /g, "_"))}`);
  if (!r || r.type === "disambiguation" || !r.extract) return null;
  const url = httpsOnly(r.content_urls?.desktop?.page);
  return { text: stripHtml(r.extract, 700), url: url && url.startsWith("https://tr.wikipedia.org/") ? url : null };
}

export async function GET(request) {
  const url = new URL(request.url);
  const latin = (url.searchParams.get("latin") || "").trim();
  const tr = (url.searchParams.get("tr") || "").trim();
  // Vikipedi başlığında ayrım için parantez olabilir: "Karanfil (çiçek)"
  if (!LATIN_RE.test(latin) || (tr && !TR_TITLE_RE.test(tr))) return json({ error: "Geçersiz bitki adı" }, 400);

  const [nat, wiki] = await Promise.all([inaturalist(latin), wikiTr(tr)]);
  // iNaturalist 6'dan az fotoğraf verdiyse eksik Commons'tan tamamlanır
  const extra = await commons(latin, 6 - nat.photos.length);
  const photos = [...nat.photos, ...extra].slice(0, 8);
  // hiçbir kaynaktan veri gelmediyse kısa süre önbelleğe al (geçici kesinti olabilir)
  const empty = !photos.length && !wiki;
  return json({ latin, taxon: nat.taxon, photos, wiki }, 200, empty ? "public, s-maxage=600" : CACHE);
}
