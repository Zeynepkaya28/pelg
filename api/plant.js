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

// yaprağıyla tanınan bitkilerde "flower" araması nadir çiçeklerini getirir; bunlarda "plant" aranır
const FOLIAGE = new Set(["Monstera deliciosa", "Epipremnum aureum", "Dracaena trifasciata", "Zamioculcas zamiifolia", "Aloe vera",
  "Cactaceae", "Echeveria", "Ficus elastica", "Ficus benjamina", "Crassula ovata", "Yucca elephantipes", "Dieffenbachia",
  "Ocimum basilicum", "Mentha spicata", "Salvia rosmarinus"]);

async function commons(latin, need) {
  if (need <= 0) return [];
  const u = new URL("https://commons.wikimedia.org/w/api.php");
  Object.entries({
    action: "query", format: "json", generator: "search",
    gsrsearch: `${latin} ${FOLIAGE.has(latin) ? "plant" : "flower"} filetype:bitmap`, gsrnamespace: "6", gsrlimit: "40",
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
  "Monstera deliciosa": [
    "https://commons.wikimedia.org/wiki/File:Monstera_deliciosa_Monstera_dziurawa_2024-01-20_Malaga_03.jpg",
    "https://commons.wikimedia.org/wiki/File:Fruit_Salad_Plant_(Monstera_deliciosa).jpg",
    "https://commons.wikimedia.org/wiki/File:Monstera_deliciosa_Swiss_Cheese_Plant_%E1%83%9B%E1%83%9D%E1%83%9C%E1%83%A1%E1%83%A2%E1%83%94%E1%83%A0%E1%83%90.JPG",
    "https://commons.wikimedia.org/wiki/File:Monstera_deliciosa_Monstera_dziurawa_2023-10-31_02.jpg",
    "https://commons.wikimedia.org/wiki/File:Fruit_Salad_Plant_(Monstera_deliciosa_%27Albo-Variegata%27).jpg",
  ],
  "Epipremnum aureum": [
    "https://commons.wikimedia.org/wiki/File:Epipremnum_aureum_31082012.jpg",
    "https://commons.wikimedia.org/wiki/File:Money_plant(Epipremnum_Aureum).jpg",
    "https://commons.wikimedia.org/wiki/File:Epipremnum_aureum_(Marble_Queen)_houseplant.png",
    "https://commons.wikimedia.org/wiki/File:Money_plant_(Epipremnum_aureum)_1.jpg",
    "https://commons.wikimedia.org/wiki/File:Money_Plant_(Epipremnum_aureum_%27N%27_Joy%27)_2.jpg",
  ],
  "Dracaena trifasciata": [
    "https://commons.wikimedia.org/wiki/File:Dracaena_trifasciata_21744978.jpg",
    "https://commons.wikimedia.org/wiki/File:Dracaena_trifasciata_60105757.jpg",
    "https://commons.wikimedia.org/wiki/File:Dracaena_trifasciata_177940020.jpg",
    "https://commons.wikimedia.org/wiki/File:Dracaena_trifasciata_120738827.jpg",
    "https://commons.wikimedia.org/wiki/File:Dracaena_trifasciata_58878359.jpg",
  ],
  "Zamioculcas zamiifolia": [
    "https://commons.wikimedia.org/wiki/File:ZZ_Plant_(Zamioculcas_zamiifolia).jpg",
    "https://commons.wikimedia.org/wiki/File:Zamioculcas_zamiifolia_1.jpg",
    "https://commons.wikimedia.org/wiki/File:Zamioculcas_zamiifolia_8zz.jpg",
    "https://commons.wikimedia.org/wiki/File:Zamioculcas_zamiifolia_10zz.jpg",
    "https://commons.wikimedia.org/wiki/File:ZZ_Plant_(Zamioculcas_zamiifolia)_1.jpg",
  ],
  "Aloe vera": [
    "https://commons.wikimedia.org/wiki/File:Aloe_Vera_Plant_3.jpg",
    "https://commons.wikimedia.org/wiki/File:Aloe_Vera_Plant_4.jpg",
    "https://commons.wikimedia.org/wiki/File:Aloe_vera_(Asphodelaceae).jpg",
    "https://commons.wikimedia.org/wiki/File:A_potted_aloe_vera_plant.jpg",
    "https://commons.wikimedia.org/wiki/File:Aloe_vera_(51653).jpg",
  ],
  "Cactaceae": [
    "https://commons.wikimedia.org/wiki/File:Pachycereus_pringlei_forest.jpg",
    "https://www.inaturalist.org/photos/33108041",
    "https://commons.wikimedia.org/wiki/File:Ferocactus_wislizeni_(Fishhook_Barrel_Cactus)_fruit.jpg",
    "https://commons.wikimedia.org/wiki/File:Cactaceae_in_Suan_Luang_Rama_9_Photographed_by_Trisorn_Triboon_(46).jpg",
    "https://commons.wikimedia.org/wiki/File:Cactaceae_-_Oasis_Park_botanical_garden_-_Fuerteventura_-_04.jpg",
  ],
  "Echeveria": [
    "https://commons.wikimedia.org/wiki/File:(MHNT)_Echeveria_secunda.jpg",
    "https://commons.wikimedia.org/wiki/File:Echeveria_secunda_8840.jpg",
    "https://commons.wikimedia.org/wiki/File:Echeveria_harmsii_in_Botanischer_Garten_Muenster.jpg",
    "https://commons.wikimedia.org/wiki/File:Echeveria_pulvinata,_Jard%C3%ADn_Bot%C3%A1nico,_M%C3%BAnich,_Alemania,_2013-09-08,_DD_01.JPG",
    "https://commons.wikimedia.org/wiki/File:Echeveria_%E2%80%98Rainbow%E2%80%99_(variegata).jpg",
  ],
  "Spathiphyllum": [
    "https://commons.wikimedia.org/wiki/File:Peace_lily_-_1_-_cropped.jpg",
    "https://www.inaturalist.org/photos/439386",
    "https://commons.wikimedia.org/wiki/File:Spathiphyllum-Flower.jpg",
    "https://commons.wikimedia.org/wiki/File:Spathiphyllum_cannaefolium-yercaud-salem-India.JPG",
    "https://commons.wikimedia.org/wiki/File:Spathiphyllum_cannifolium_kz2.jpg",
  ],
  "Euphorbia pulcherrima": [
    "https://commons.wikimedia.org/wiki/File:Euphorbia_pulcherrima_cultivar-B_5Dsr_4013.jpg",
    "https://commons.wikimedia.org/wiki/File:Euphorbia_pulcherrima_cultivar-B_5Dsr_4014.jpg",
    "https://commons.wikimedia.org/wiki/File:Euphorbia_pulcherrima_cultivar-B_5Dsr_4022.jpg",
    "https://commons.wikimedia.org/wiki/File:Euphorbia_pulcherrima_%27Alaska%27,_Longwood_Gardens_2024_02.jpg",
    "https://commons.wikimedia.org/wiki/File:Euphorbia_pulcherrima_%27Ice_Punch%27,_Longwood_Gardens_2024_01.jpg",
  ],
  "Pelargonium": [
    "https://commons.wikimedia.org/wiki/File:Pelargonium_2025_G1.jpg",
    "https://commons.wikimedia.org/wiki/File:Pelargonium_inquinans_flower_in_Bhopal.jpg",
    "https://commons.wikimedia.org/wiki/File:Pelargonium-Sitia-Crete-2.jpg",
    "https://commons.wikimedia.org/wiki/File:Pelargonium-Sitia-Crete-5.jpg",
    "https://commons.wikimedia.org/wiki/File:Pelargonium_flower_macro.jpg",
  ],
  "Begonia": [
    "https://commons.wikimedia.org/wiki/File:Begonia_pink,.jpg",
    "https://commons.wikimedia.org/wiki/File:Begonia_%27Saturn%27,_Tatton_Park.jpg",
    "https://commons.wikimedia.org/wiki/File:White_Begonia_Bloom.jpg",
    "https://commons.wikimedia.org/wiki/File:Begonia_semperflorens_male_flower.jpg",
    "https://commons.wikimedia.org/wiki/File:Begonia_U485_female_flower.jpg",
  ],
  "Ficus elastica": [
    "https://commons.wikimedia.org/wiki/File:Ficus_elastica_81315295.jpg",
    "https://commons.wikimedia.org/wiki/File:Ficus_November_2008-1.jpg",
    "https://commons.wikimedia.org/wiki/File:Ficus_elastica_59867379.jpg",
    "https://commons.wikimedia.org/wiki/File:Ficus_elastica_60622992.jpg",
    "https://commons.wikimedia.org/wiki/File:Backlit_ficus_elastica_leaf_texture_2014_02.jpg",
  ],
  "Ficus benjamina": [
    "https://commons.wikimedia.org/wiki/File:Ficus_benjamina-weeping_fig-benjamin_fig_01.jpg",
    "https://commons.wikimedia.org/wiki/File:Ficus_benjamina_Household_Plant.jpg",
    "https://commons.wikimedia.org/wiki/File:Ficus_benjamina_at_University_of_Kyrenia.jpg",
    "https://www.inaturalist.org/photos/31479359",
    "https://commons.wikimedia.org/wiki/File:Ficus_benjamina-weeping_fig-benjamin_fig_03.jpg",
  ],
  "Crassula ovata": [
    "https://commons.wikimedia.org/wiki/File:(MHNT)_Crassula_ovata_-_Serres_du_Museum_de_Toulouse.jpg",
    "https://commons.wikimedia.org/wiki/File:Jade_Plant_(Crassula_ovata).jpg",
    "https://commons.wikimedia.org/wiki/File:Crassulaceae_Crassula_ovata_2.1.jpg",
    "https://commons.wikimedia.org/wiki/File:Crassula_ovata_fleurs_FR_2013.jpg",
    "https://commons.wikimedia.org/wiki/File:A_40_year_old_jade_plant_(Crassula_ovata).jpg",
  ],
  "Yucca elephantipes": [
    "https://commons.wikimedia.org/wiki/File:Yucca_elephantipes_%27Silver_Star%27_Plant_2000px.jpg",
    "https://commons.wikimedia.org/wiki/File:Yucca_elephantipes-Stammsteckling.jpg",
    "https://commons.wikimedia.org/wiki/File:Yucca_gigantea_(Yucca_elephantipes)_-_Fruit_and_Spice_Park_-_Homestead,_Florida_-_DSC08919.jpg",
    "https://www.inaturalist.org/photos/62056284",
    "https://commons.wikimedia.org/wiki/File:Yucca_gigantea_-_Jard%C3%ADn_Bot%C3%A1nico_Canario_Viera_y_Clavijo_-_Gran_Canaria.jpg",
  ],
  "Dieffenbachia": [
    "https://commons.wikimedia.org/wiki/File:Dieffenbachia_amoena_plant,_April_2023.jpg",
    "https://commons.wikimedia.org/wiki/File:Dumb_Cane_(Dieffenbachia)_plant.jpg",
    "https://commons.wikimedia.org/wiki/File:Dieffenbachia_seguine_kz03.jpg",
    "https://commons.wikimedia.org/wiki/File:Dieffenbachia_Tropic_Marianne_02.jpg",
    "https://commons.wikimedia.org/wiki/File:Dieffenbachia_plant.jpg",
  ],
  "Anthurium andraeanum": [
    "https://commons.wikimedia.org/wiki/File:Anthurium_andraeanum_flower.jpg",
    "https://commons.wikimedia.org/wiki/File:Anthurium_andraeanum_Flamingo_flower_Barbados_0987.jpg",
    "https://commons.wikimedia.org/wiki/File:Anthurium_(Flamingoplant)_12-08-2019_(actm)_03.jpg",
    "https://commons.wikimedia.org/wiki/File:Anthurium_Andraenum_Flower.jpg",
    "https://commons.wikimedia.org/wiki/File:Anthurium_andraeanum_%27Antherzek%27,_Longwood_Gardens_2024_03.jpg",
  ],
  "Kalanchoe blossfeldiana": [
    "https://commons.wikimedia.org/wiki/File:Kalanchoe_blossfeldiana_Plant-_082558.jpg",
    "https://commons.wikimedia.org/wiki/File:Kalanchoe_blossfeldiana_Plant-_082548.jpg",
    "https://commons.wikimedia.org/wiki/File:%E0%B8%81%E0%B8%B8%E0%B8%AB%E0%B8%A5%E0%B8%B2%E0%B8%9A%E0%B8%AB%E0%B8%B4%E0%B8%99_Kalanchoe_blossfeldiana_Poelln._and_hybrids_(3).jpg",
    "https://commons.wikimedia.org/wiki/File:2025_Kalanchoe_blossfeldiana_Poelin._Santiago_de_Compostela._Galiza.jpg",
    "https://commons.wikimedia.org/wiki/File:%E0%B8%81%E0%B8%B8%E0%B8%AB%E0%B8%A5%E0%B8%B2%E0%B8%9A%E0%B8%AB%E0%B8%B4%E0%B8%99_Kalanchoe_blossfeldiana_Poelln._and_hybrids_(4).jpg",
  ],
  "Cyclamen persicum": [
    "https://commons.wikimedia.org/wiki/File:CyclamenPersicumMill20.jpg",
    "https://commons.wikimedia.org/wiki/File:Cyclamen_persicum_(Myrsinaceae)_flower_2.jpg",
    "https://commons.wikimedia.org/wiki/File:Cyclamen_persicum_kz3.jpg",
    "https://commons.wikimedia.org/wiki/File:Cyclamen_persicum_Mill._(Myrsinaceae)_flower.jpg",
    "https://commons.wikimedia.org/wiki/File:Cyclamen_persicum_kz08.jpg",
  ],
  "Ocimum basilicum": [
    "https://commons.wikimedia.org/wiki/File:Ocimum_basilicum_15-p.bot-ocim.basil-01.jpg",
    "https://commons.wikimedia.org/wiki/File:Ocimum_basilicum_CG_NBG_LR.jpg",
    "https://commons.wikimedia.org/wiki/File:-2019-07-20_Purple_basil,_(Ocimum_basilicum),_Trimingham.JPG",
    "https://commons.wikimedia.org/wiki/File:-2020-06-25_Basil_plant_(Ocimum_basilicum),_Trimingham.JPG",
  ],
  "Mentha spicata": [
    "https://commons.wikimedia.org/wiki/File:Mentha_spicata_var._crispa_002.JPG",
    "https://commons.wikimedia.org/wiki/File:Starr_080607-7255_Mentha_x_spicata.jpg",
    "https://commons.wikimedia.org/wiki/File:-2019-10-31_Garden_Mint_(Mentha_spicata),_Trimingham.JPG",
    "https://www.inaturalist.org/photos/85965702",
    "https://www.inaturalist.org/photos/22667704",
  ],
  "Salvia rosmarinus": [
    "https://commons.wikimedia.org/wiki/File:Rosmarinus_officinalis_(1).jpg",
    "https://commons.wikimedia.org/wiki/File:Rosmarinus_officinalis133095382.jpg",
    "https://commons.wikimedia.org/wiki/File:Rosmarinus_officinalis_als_Tischdekoration_Juni_2012.JPG",
    "https://commons.wikimedia.org/wiki/File:Salvia_rosmarinus_5Dsr_0089.jpg",
  ],
  "Jasminum officinale": [
    "https://commons.wikimedia.org/wiki/File:Jasminum_officinale.JPG",
    "https://commons.wikimedia.org/wiki/File:Jasminum_officionale_flowers,_74_Sunbury_St_Geebung_IMGP2384.jpg",
    "https://commons.wikimedia.org/wiki/File:Jasminum_officionale_flowers,_74_Sunbury_St_Geebung_IMGP2383.jpg",
    "https://www.inaturalist.org/photos/496730426",
    "https://commons.wikimedia.org/wiki/File:Jasmine_flower_(20210).jpg",
  ],
  "Bougainvillea": [
    "https://commons.wikimedia.org/wiki/File:Bougainvillea_flower_image.jpg",
    "https://commons.wikimedia.org/wiki/File:Bougainvillea_flower_(94868).jpg",
    "https://commons.wikimedia.org/wiki/File:Bougainvillea_flower_(11215).jpg",
    "https://commons.wikimedia.org/wiki/File:Bougainvillea_flower_at_Pulikurumba.jpg",
    "https://commons.wikimedia.org/wiki/File:Bougainvillea_Flower_(15).jpg",
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
