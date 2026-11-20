// GET /api/stock?cat=Buket
// Openverse'ten kategori görselleri (anahtar gerekmez). Yalnızca vitrin süsü; tür tanımada KULLANILMAZ.
// Yalnızca ticari kullanıma uygun lisanslar (CC BY, CC BY-SA, CC0, kamu malı); her görselle sahibi, lisansı ve kaynağı döner.
import { json, getJSON, httpsOnly, clean } from "./_lib.js";

const QUERIES = {
  "Kesme çiçek": "cut flowers",
  "Saksı çiçeği": "potted flowering plant",
  "Buket": "flower bouquet",
  "Ağaç / fidan": "tree sapling",
  "Soğan / tohum": "flower bulbs",
  "Diğer": "florist shop",
};
const LICENSES = { by: "CC BY", "by-sa": "CC BY-SA", cc0: "CC0", pdm: "Kamu malı" };

export async function GET(request) {
  const cat = new URL(request.url).searchParams.get("cat") || "";
  if (!Object.hasOwn(QUERIES, cat)) return json({ error: "Geçersiz kategori" }, 400);

  const u = `https://api.openverse.org/v1/images/?q=${encodeURIComponent(QUERIES[cat])}&license=by,by-sa,cc0,pdm&aspect_ratio=wide&mature=false&page_size=6`;
  const d = await getJSON(u);
  const photos = (Array.isArray(d?.results) ? d.results : []).map((p) => {
    const src = httpsOnly(p?.thumbnail), page = httpsOnly(p?.foreign_landing_url);
    const lic = LICENSES[p?.license];
    if (!src || !src.startsWith("https://api.openverse.org/") || !page || !lic) return null;
    return {
      src, page, license: lic + (p.license_version && /^[\d.]+$/.test(p.license_version) && lic.startsWith("CC BY") ? " " + p.license_version : ""),
      author: clean(p.creator, 60) || "Bilinmiyor", alt: clean(p.title, 120),
    };
  }).filter(Boolean);
  // CDN'de 1 gün: Openverse'in anonim istek sınırına yaklaşılmaz
  return json({ photos }, 200, photos.length ? "public, s-maxage=86400, stale-while-revalidate=604800" : "public, s-maxage=600");
}
