// GET /api/stock?cat=Buket
// Pexels'ten kategori görselleri (yalnızca vitrin süsü; tür tanımada KULLANILMAZ).
// Her görselle fotoğrafçı adı ve Pexels bağlantısı döner; ön yüz bunları gösterir.
import { json, getJSON, httpsOnly, clean } from "./_lib.js";

const QUERIES = {
  "Kesme çiçek": "cut flowers bouquet",
  "Saksı çiçeği": "potted flowering plant bouquet",
  "Buket": "flower bouquet",
  "Ağaç / fidan": "tree sapling nursery",
  "Soğan / tohum": "flower bulbs",
  "Diğer": "flower shop",
};

export async function GET(request) {
  const cat = new URL(request.url).searchParams.get("cat") || "";
  if (!Object.hasOwn(QUERIES, cat)) return json({ error: "Geçersiz kategori" }, 400);
  const key = process.env.PEXELS_KEY;
  if (!key) return json({ photos: [] }, 200, "public, s-maxage=600");

  const d = await getJSON(`https://api.pexels.com/v1/search?query=${encodeURIComponent(QUERIES[cat])}&per_page=6&orientation=landscape`, { headers: { authorization: key } });
  const photos = (Array.isArray(d?.photos) ? d.photos : []).map((p) => {
    const src = httpsOnly(p?.src?.medium), page = httpsOnly(p?.url), authorUrl = httpsOnly(p?.photographer_url);
    if (!src || !src.startsWith("https://images.pexels.com/") || !page?.startsWith("https://www.pexels.com/")) return null;
    return { src, page, author: clean(p.photographer, 60) || "Pexels", authorUrl: authorUrl?.startsWith("https://www.pexels.com/") ? authorUrl : null, alt: clean(p.alt, 120) };
  }).filter(Boolean);
  // CDN'de 1 gün: saatlik 200 istek sınırına yaklaşılmaz
  return json({ photos }, 200, photos.length ? "public, s-maxage=86400, stale-while-revalidate=604800" : "public, s-maxage=600");
}
