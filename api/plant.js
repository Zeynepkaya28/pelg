// GET /api/plant?latin=Lilium&tr=Zambak
// Gerçek fotoğraflar (iNaturalist + Wikimedia Commons) ve Türkçe Vikipedi özeti.
// Yalnızca ticari kullanıma uygun lisanslar (CC0, CC BY, CC BY-SA, kamu malı) döner; her fotoğrafta sahibi ve lisansı vardır.
import { json, getJSON, stripHtml, httpsOnly } from "./_lib.js";

const TR_TITLE_RE = /^[A-Za-zÇĞİÖŞÜçğıöşüâîû .'()-]{2,60}$/;

const OK_LICENSES = new Set(["cc0", "cc-by", "cc-by-sa"]);
const LATIN_RE = /^[A-Za-z][A-Za-z .×-]{1,59}$/;
const MAX_PHOTOS = 24;
const dedupe = (list) => { const seen = new Set(); return list.filter((p) => !seen.has(p.page) && seen.add(p.page)); };
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
    if (photos.length >= 12) break;
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
    gsrsearch: `${latin} flower filetype:bitmap`, gsrnamespace: "6", gsrlimit: "40",
    prop: "imageinfo", iiprop: "url|extmetadata", iiurlwidth: "1200",
    iiextmetadatafilter: "LicenseShortName|Artist|LicenseUrl",
  }).forEach(([k, v]) => u.searchParams.set(k, v));
  return commonsPhotos(await getJSON(u.toString()), need);
}

/** Commons API yanıtındaki dosyalardan lisansı uygun olanlar (arama ya da tek dosya sorgusu için ortak). */
function commonsPhotos(r, need) {
  const pages = Object.values(r?.query?.pages || {}).sort((a, b) => (a.index ?? 0) - (b.index ?? 0));
  const out = [];
  for (const p of pages) {
    const ii = p.imageinfo?.[0]; const m = ii?.extmetadata || {};
    if (!commonsLicenseOk(m.LicenseShortName?.value)) continue;
    const src = httpsOnly(ii?.thumburl), page = httpsOnly(ii?.descriptionurl);
    if (!src || !page || !/^https:\/\/(upload|thumb)\.wikimedia\.org\//.test(src)) continue;
    out.push({
      // Wikimedia yalnızca standart küçük resim genişliklerini sunar (330 var, 320 yok)
      src, thumb: src.replace(/\/\d+px-/, "/330px-"),
      author: stripHtml(m.Artist?.value, 120) || "Wikimedia Commons",
      license: stripHtml(m.LicenseShortName.value, 30), page, source: "Wikimedia Commons",
    });
    if (out.length >= need) break;
  }
  return out;
}

/* Rehberdeki 16 bitki için elle seçilmiş fotoğraflar: ilki ana fotoğraf (bitkinin ilk rengine uyan, en tanıdık görünüm),
   sonraki dördü yanındaki mozaik. Galeride varsa bu sırayla başa alınır; ana fotoğraf aramadan düşmüşse dosya adıyla getirilir. */
export const HERO = {
  "Lilium": [
    "https://commons.wikimedia.org/wiki/File:Lilium_flower_detail.jpg",
    "https://commons.wikimedia.org/wiki/File:Lilium_LxO_hybrid_%27Triumphator%27.jpg",
    "https://commons.wikimedia.org/wiki/File:Lilium_%27Nochka%27_02.jpg",
    "https://commons.wikimedia.org/wiki/File:Lilium_bulbiferum_var._bulbiferum_01.JPG",
    "https://commons.wikimedia.org/wiki/File:Lilium_regale,_regal_lily_in_Essex,_England_(cropped).jpg",
  ],
  "Rosa": [
    "https://commons.wikimedia.org/wiki/File:Red_rose_with_black_background.jpg",
    "https://commons.wikimedia.org/wiki/File:Rosa_%27Rosengr%C3%A4fin_Marie_Henriette%27_(actm).jpg",
    "https://commons.wikimedia.org/wiki/File:Rosa_%27Nostalgie%27_(d.j.b)_02.jpg",
    "https://commons.wikimedia.org/wiki/File:Rosa_%27Mr._Darcy%27_(actm)_01.jpg",
    "https://commons.wikimedia.org/wiki/File:Rosa_%27Aspirin_Rose%27_(actm)_01.jpg",
  ],
  "Tulipa": [
    "https://commons.wikimedia.org/wiki/File:Tulip_cultivar_%27Banja_Luka%27_Moscow_Oblast,_Russia,_21_May_2022_(IMGP1191a2).jpg",
    "https://commons.wikimedia.org/wiki/File:Red_and_white_tulip_at_Myddelton_House,_Enfield,_London.jpg",
    "https://commons.wikimedia.org/wiki/File:Tulipa_suaveolens_floriade_to_Canberra.jpg",
    "https://commons.wikimedia.org/wiki/File:Tulipa_flower.jpg",
    "https://commons.wikimedia.org/wiki/File:Tulpe_%27Strong_Gold%27_im_botanischen_Garten_in_M%C3%BCnchen_01.jpg",
  ],
  "Phalaenopsis": [
    "https://www.inaturalist.org/photos/368194406",
    "https://commons.wikimedia.org/wiki/File:Phalaenopsis_(aka).jpg",
    "https://commons.wikimedia.org/wiki/File:Phalaenopsis_cultivar_FR_2012.jpg",
    "https://commons.wikimedia.org/wiki/File:Phalaenopsis_Cultivar_Mini_01.jpg",
    "https://commons.wikimedia.org/wiki/File:Phalaenopsis_orchidee_(actm)_04.jpg",
  ],
  "Leucanthemum vulgare": [
    "https://commons.wikimedia.org/wiki/File:Leucanthemum_vulgare,_the_ox-eye_daisy_from_Kanthalloor,_Idukki_district,_Kerala_06.jpg",
    "https://commons.wikimedia.org/wiki/File:Leucanthemum_vulgare_kz05.jpg",
    "https://commons.wikimedia.org/wiki/File:%D0%A0%D0%BE%D0%BC%D0%B0%D1%88%D0%BA%D0%B0_(%D0%BD%D0%B8%D0%B2%D1%8F%D0%BD%D0%B8%D0%BA)_%D0%B2_%D1%81%D0%B0%D0%B4%D1%83_%D0%92%D0%BE%D1%81%D0%BA%D1%80%D0%B5%D1%81%D0%B5%D0%BD%D1%81%D0%BA%D0%B8%D0%B9_%D1%86%D0%B5%D1%80%D0%BA%D0%B2%D0%B8,_%D0%A8%D1%83%D1%88%D0%B0%D1%80%D1%8B_01.jpg",
    "https://commons.wikimedia.org/wiki/File:IMG_6732-Leucanthemum_vulgare.jpg",
    "https://commons.wikimedia.org/wiki/File:%D0%A0%D0%BE%D0%BC%D0%B0%D1%88%D0%BA%D0%B0_(%D0%BD%D0%B8%D0%B2%D1%8F%D0%BD%D0%B8%D0%BA)_%D0%B2_%D1%81%D0%B0%D0%B4%D1%83_%D0%92%D0%BE%D1%81%D0%BA%D1%80%D0%B5%D1%81%D0%B5%D0%BD%D1%81%D0%BA%D0%B8%D0%B9_%D1%86%D0%B5%D1%80%D0%BA%D0%B2%D0%B8,_%D0%A8%D1%83%D1%88%D0%B0%D1%80%D1%8B_02.jpg",
  ],
  "Helianthus annuus": [
    "https://commons.wikimedia.org/wiki/File:Eberndorf_K%C3%B6cking_Sonnenblumenfeld_Biohof_Tomic_18072014_0792.jpg",
    "https://commons.wikimedia.org/wiki/File:Sunflower_head_2026_G1.jpg",
    "https://commons.wikimedia.org/wiki/File:Sunflower_head_2015_G4.jpg",
    "https://commons.wikimedia.org/wiki/File:Helianthus_annuus_00064.jpg",
    "https://commons.wikimedia.org/wiki/File:Sunflower_l.jpg",
  ],
  "Lavandula angustifolia": [
    "https://commons.wikimedia.org/wiki/File:Lavandula_angustifolia_(English_lavender),_flower_spikes_(SaatPilot).jpg",
    "https://commons.wikimedia.org/wiki/File:Lavandula_angustifolia_lavender_Lavendel_01.jpg",
    "https://commons.wikimedia.org/wiki/File:Lavandula_angustifolia_(English_lavender)_(SaatPilot).jpg",
    "https://commons.wikimedia.org/wiki/File:Lavandula_angustifolia_in_Sedovo_1.jpg",
    "https://commons.wikimedia.org/wiki/File:Lamiales_-_Lavandula_angustifolia_-_4.jpg",
  ],
  "Dianthus caryophyllus": [
    "https://commons.wikimedia.org/wiki/File:Dianthus_caryophyllus_cultivar_1DS-II_2506.jpg",
    "https://commons.wikimedia.org/wiki/File:%E5%BA%B7%E4%B9%83%E9%A6%A8_Dianthus_caryophyllus_-%E9%A6%99%E6%B8%AF%E8%8A%B1%E5%B1%95_Hong_Kong_Flower_Show-_(9450626234).jpg",
    "https://commons.wikimedia.org/wiki/File:%E5%BA%B7%E4%B9%83%E9%A6%A8(%E9%A6%99%E7%9F%B3%E7%AB%B9)_Dianthus_caryophyllus_-%E9%A6%99%E6%B8%AF%E8%8A%B1%E5%B1%95_Hong_Kong_Flower_Show-_(20103253689).jpg",
    "https://commons.wikimedia.org/wiki/File:Carnation_(Dianthus_Caryophyllus)_in_Athens_on_May_25,_2023.jpg",
    "https://commons.wikimedia.org/wiki/File:%E5%BA%B7%E4%B9%83%E9%A6%A8_Dianthus_caryophyllus_Marie_Chabaud_-%E9%A6%99%E6%B8%AF%E8%8A%B1%E5%B1%95_Hong_Kong_Flower_Show-_(9216082536).jpg",
  ],
  "Hyacinthus orientalis": [
    "https://commons.wikimedia.org/wiki/File:Asparagales_-_Hyacinthus_orientalis_4.jpg",
    "https://commons.wikimedia.org/wiki/File:Hyacinthus_orientalis_(common_hyacinth)_(Newark,_Ohio,_USA)_2.jpg",
    "https://commons.wikimedia.org/wiki/File:(MHNT)_%27Hyacinthus_orientalis%27_-_Flower.jpg",
    "https://commons.wikimedia.org/wiki/File:Hyacinth_(Hyacinthus).JPG",
    "https://commons.wikimedia.org/wiki/File:%E9%A2%A8%E4%BF%A1%E5%AD%90_Hyacinthus_orientalis_-%E9%A6%99%E6%B8%AF%E8%8A%B1%E5%B1%95_Hong_Kong_Flower_Show-_(9200964464).jpg",
  ],
  "Narcissus": [
    "https://commons.wikimedia.org/wiki/File:Narcissus_pseudonarcissus_flower_%E2%80%93_front.jpg",
    "https://commons.wikimedia.org/wiki/File:Narcissus_poeticus_Spechtensee_01.JPG",
    "https://commons.wikimedia.org/wiki/File:Narcissus_%27Ipi_Tombi%27_Flower_1.jpg",
    "https://commons.wikimedia.org/wiki/File:Narcis_(Narcissus)_d.j.b_02.jpg",
    "https://commons.wikimedia.org/wiki/File:Narcissus-tazetta-2014-Zachi-Evenor.jpg",
  ],
  "Chrysanthemum morifolium": [
    "https://www.inaturalist.org/photos/53487018",
    "https://commons.wikimedia.org/wiki/File:Chrysanthemum_morifolium_(2).JPG",
    "https://commons.wikimedia.org/wiki/File:Chrysanthemum_morifolium_Flower.jpg",
    "https://commons.wikimedia.org/wiki/File:Chrysantheme_rot_tautropfen_-20191024-RM-102058.jpg",
    "https://commons.wikimedia.org/wiki/File:Chrysanthemum_%C3%97_morifolium_Flowers_10.jpg",
  ],
  "Hydrangea macrophylla": [
    "https://commons.wikimedia.org/wiki/File:Hydrangea_macrophylla_-_Hortensia_hydrangea.jpg",
    "https://commons.wikimedia.org/wiki/File:Hydrangea_macrophylla,_L%C3%A9vis.jpg",
    "https://commons.wikimedia.org/wiki/File:Hydrangea_macrophylla_(Hortensia).JPG",
    "https://commons.wikimedia.org/wiki/File:Hydrangea_macrophylla_in_the_park_of_the_Castle_of_Selles-sur-Cher_02.jpg",
    "https://commons.wikimedia.org/wiki/File:Hydrangea_macrophylla_flowers.jpg",
  ],
  "Streptocarpus ionanthus": [
    "https://commons.wikimedia.org/wiki/File:Usambaraveilchen_1826.JPG",
    "https://commons.wikimedia.org/wiki/File:Saintpaulia_(cultivar)_01.jpg",
    "https://commons.wikimedia.org/wiki/File:Saintpaulia_%27Red_Velvet%27_01.jpg",
    "https://commons.wikimedia.org/wiki/File:Saintpaulia_%27Volshebnye_Sny%27_01.jpg",
    "https://commons.wikimedia.org/wiki/File:Planta_para_interiores.jpg",
  ],
  "Gerbera jamesonii": [
    "https://commons.wikimedia.org/wiki/File:Gerbera_Jamesonii_-_flower_view_03.jpg",
    "https://commons.wikimedia.org/wiki/File:Gerbera_jamesonii_in_Kolkata.jpg",
    "https://commons.wikimedia.org/wiki/File:Gerbera_Jamesonii_-_flower_view_01.jpg",
    "https://commons.wikimedia.org/wiki/File:Gerbera_jamesonii-1.JPG",
    "https://commons.wikimedia.org/wiki/File:Gerbera_daisy_orange001.jpg",
  ],
  "Paeonia lactiflora": [
    "https://commons.wikimedia.org/wiki/File:Paeonia_lactiflora_2021_06_20_Kumpula_0565.jpg",
    "https://commons.wikimedia.org/wiki/File:Paeonia_lactiflora_2021_06_20_Kumpula_0387.jpg",
    "https://commons.wikimedia.org/wiki/File:Paeonia_lactiflora_Blaze.jpg",
    "https://commons.wikimedia.org/wiki/File:Paeonia_lactiflora_Barrington_Bride.jpg",
    "https://commons.wikimedia.org/wiki/File:Paeonia_lactiflora_unid_cultivar_3.jpg",
  ],
  "Olea europaea": [
    "https://www.inaturalist.org/photos/95624108",
    "https://commons.wikimedia.org/wiki/File:Olea_europaea_fruit_Navarre_St_7th_Brigade_Park_Chermside_L1050166.jpg",
    "https://commons.wikimedia.org/wiki/File:Olea_europaea_2356_flowers.jpg",
    "https://commons.wikimedia.org/wiki/File:Olea_europaea_Olive_%E1%83%96%E1%83%94%E1%83%97%E1%83%98%E1%83%A1%E1%83%AE%E1%83%98%E1%83%9A%E1%83%98.jpg",
    "https://commons.wikimedia.org/wiki/File:Olea_europaea_003.JPG",
  ],
};

export async function heroFirst(latin, photos) {
  const picks = HERO[latin];
  if (!picks) return photos;
  let list = [...photos];
  if (!list.some((p) => p.page === picks[0])) {
    // ana fotoğraf aramada yoksa: Commons dosyasını adıyla getir (aynı lisans süzgecinden geçer)
    const m = picks[0].match(/^https:\/\/commons\.wikimedia\.org\/wiki\/(File:.+)$/);
    if (m) {
      const u = new URL("https://commons.wikimedia.org/w/api.php");
      Object.entries({ action: "query", format: "json", titles: decodeURIComponent(m[1]).replace(/_/g, " "), prop: "imageinfo",
        iiprop: "url|extmetadata", iiurlwidth: "1200", iiextmetadatafilter: "LicenseShortName|Artist|LicenseUrl" }).forEach(([k, v]) => u.searchParams.set(k, v));
      const [h] = commonsPhotos(await getJSON(u.toString()), 1);
      if (h) list = [h, ...list];
    }
  }
  // seçilenler (bulunanlar) bu sırayla başa, kalanlar arkaya
  const chosen = picks.map((pg) => list.find((p) => p.page === pg)).filter(Boolean);
  return [...chosen, ...list.filter((p) => !chosen.includes(p))].slice(0, MAX_PHOTOS);
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
  // iNaturalist'in seçtikleri önce; galeri Commons'taki lisansı uygun fotoğraflarla 24'e tamamlanır
  const extra = await commons(latin, MAX_PHOTOS - nat.photos.length);
  const photos = await heroFirst(latin, dedupe([...nat.photos, ...extra]).slice(0, MAX_PHOTOS));
  // hiçbir kaynaktan veri gelmediyse kısa süre önbelleğe al (geçici kesinti olabilir)
  const empty = !photos.length && !wiki;
  return json({ latin, taxon: nat.taxon, photos, wiki }, 200, empty ? "public, s-maxage=600" : CACHE);
}
