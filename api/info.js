// GET /api/info?latin=Lavandula%20angustifolia&tr=Lavanta
// Bir bitki hakkında anahtarsız kaynaklardan ek bilgi:
//  - Wikidata: Latince ad (P225), koruma durumu (P141), Türkçe yaygın adlar (P1843), İngilizce Vikipedi başlığı
//  - GBIF: familya, cins, Türkiye'deki gözlem kaydı sayısı
//  - Vikipedi (TR, yoksa EN): "Kullanım / Tıbbi kullanım", "Zehirlilik", "Hastalık ve zararlılar" bölümleri
// Metinler HTML'den arındırılır, kısaltılır ve kaynak bağlantısıyla döner. Sonuç CDN'de 7 gün saklanır.
import { json, getJSON, stripHtml, httpsOnly, clean } from "./_lib.js";

const LATIN_RE = /^[A-Za-z][A-Za-z .×-]{1,59}$/;
const TR_TITLE_RE = /^[A-Za-zÇĞİÖŞÜçğıöşüâîû .'()-]{2,60}$/;
const QID_RE = /^Q\d{1,12}$/;
const CACHE = "public, s-maxage=604800, stale-while-revalidate=86400";

// bölüm başlığı -> tür
const KINDS = [
  { kind: "uses", tr: /tıbb|tıbbi|şifa|herbol|ilaç|kullanım|mutfak|yağı/i, en: /^(uses?|medicin|medical|traditional medicine|herbal|culinary|food|tea|cultivation and uses)/i },
  { kind: "toxicity", tr: /zehir|toksik/i, en: /^toxic/i },
  { kind: "pests", tr: /hastalık|zararlı/i, en: /pest|disease|threat/i },
];

const wikiApi = (lang, params) => `https://${lang}.wikipedia.org/w/api.php?format=json&formatversion=2&redirects=1&${new URLSearchParams(params)}`;

/** Bölüm HTML'inden okunur düz metin: paragraf ve maddeler; tablo, dipnot, düzenle bağlantısı atılır. */
export function sectionText(html, max = 900) {
  const h = String(html || "")
    .replace(/<table[\s\S]*?<\/table>/gi, " ").replace(/<sup[\s\S]*?<\/sup>/gi, "").replace(/<style[\s\S]*?<\/style>/gi, " ")
    .replace(/<span class="mw-editsection[\s\S]*?<\/span>\s*<\/span>/gi, "").replace(/<h[1-6][\s\S]*?<\/h[1-6]>/gi, " ")
    .replace(/<figure[\s\S]*?<\/figure>/gi, " ").replace(/<div class="(?:thumb|gallery|hatnote|navbox|reflist)[\s\S]*?<\/div>/gi, " ");
  const parts = [...h.matchAll(/<(p|li)[^>]*>([\s\S]*?)<\/\1>/gi)]
    .map((m) => stripHtml(m[2], 600).replace(/[぀-ヿ㐀-鿿가-힯]+/g, "").replace(/\s{2,}/g, " ").trim())
    .filter((t) => t.length > 25 && !/^\d+(\.\d+)*\s/.test(t)); // içindekiler satırlarını ("1 Uses 1.1 …") at
  let out = "";
  for (const t of parts) { if ((out + " " + t).length > max) { if (!out) out = t.slice(0, max - 1) + "…"; break; } out = out ? out + "\n" + t : t; }
  return out.replace(/\[\d+\]/g, "").trim();
}

async function wikiSections(lang, title) {
  if (!title) return [];
  const s = await getJSON(wikiApi(lang, { action: "parse", page: title, prop: "sections" }));
  const secs = s?.parse?.sections || [];
  const page = clean(s?.parse?.title, 120) || title;
  const picked = [];
  for (const k of KINDS) {
    const hit = secs.find((x) => k[lang].test(stripHtml(x.line, 80)) && !picked.some((p) => p.index === x.index));
    if (hit) picked.push({ kind: k.kind, index: hit.index, title: stripHtml(hit.line, 80), anchor: clean(hit.anchor, 120) });
  }
  const texts = await Promise.all(picked.map((p) => getJSON(wikiApi(lang, { action: "parse", page, section: p.index, prop: "text" }))));
  return picked.map((p, i) => ({
    kind: p.kind, lang, title: p.title,
    text: sectionText(texts[i]?.parse?.text),
    url: `https://${lang}.wikipedia.org/wiki/${encodeURIComponent(page.replace(/ /g, "_"))}#${encodeURIComponent(p.anchor || "")}`,
  })).filter((x) => x.text.length > 40);
}

async function wikidata(qid) {
  if (!QID_RE.test(qid || "")) return null;
  const r = await getJSON(`https://www.wikidata.org/w/api.php?action=wbgetentities&ids=${qid}&props=claims%7Csitelinks&sitefilter=enwiki&format=json`);
  const e = r?.entities?.[qid];
  if (!e) return null;
  const val = (p) => e.claims?.[p]?.[0]?.mainsnak?.datavalue?.value;
  const iucnId = val("P141")?.id;
  let iucn = null;
  if (QID_RE.test(iucnId || "")) {
    const l = await getJSON(`https://www.wikidata.org/w/api.php?action=wbgetentities&ids=${iucnId}&props=labels&languages=tr%7Cen&format=json`);
    iucn = clean(l?.entities?.[iucnId]?.labels?.tr?.value || l?.entities?.[iucnId]?.labels?.en?.value, 60) || null;
  }
  const names = (e.claims?.P1843 || []).map((c) => c.mainsnak?.datavalue?.value).filter((v) => v?.language === "tr").map((v) => clean(v.text, 40)).filter(Boolean);
  return { qid, latin: typeof val("P225") === "string" ? clean(val("P225"), 80) : null, iucn, names: [...new Set(names)].slice(0, 6), enTitle: clean(e.sitelinks?.enwiki?.title, 120) || null };
}

async function gbif(latin) {
  const m = await getJSON(`https://api.gbif.org/v1/species/match?name=${encodeURIComponent(latin)}`);
  if (!m || m.matchType === "NONE" || !m.usageKey) return null;
  const key = Number(m.usageKey);
  const occ = await getJSON(`https://api.gbif.org/v1/occurrence/search?taxonKey=${key}&country=TR&limit=0`);
  return {
    family: clean(m.family, 60), genus: clean(m.genus, 60), rank: clean(m.rank, 20), kingdom: clean(m.kingdom, 30),
    trCount: Number.isFinite(occ?.count) ? occ.count : null, url: `https://www.gbif.org/species/${key}`,
  };
}

export async function GET(request) {
  const u = new URL(request.url);
  const latin = (u.searchParams.get("latin") || "").trim(), tr = (u.searchParams.get("tr") || "").trim();
  if (!LATIN_RE.test(latin) || (tr && !TR_TITLE_RE.test(tr))) return json({ error: "Geçersiz bitki adı" }, 400);

  const trSum = tr ? await getJSON(`https://tr.wikipedia.org/api/rest_v1/page/summary/${encodeURIComponent(tr.replace(/ /g, "_"))}`) : null;
  const trTitle = trSum && trSum.type !== "disambiguation" ? clean(trSum.title, 120) : null;
  const [wd, gb, trSecs] = await Promise.all([
    wikidata(trSum?.wikibase_item),
    gbif(latin),
    wikiSections("tr", trTitle),
  ]);
  // Türkçe Vikipedi'de olmayan bölüm türleri İngilizce Vikipedi'den tamamlanır
  const enTitle = wd?.enTitle || latin;
  const enSecs = (await wikiSections("en", enTitle)).filter((s) => !trSecs.some((t) => t.kind === s.kind));
  const body = {
    latin, qid: wd?.qid || null, wikidataUrl: wd?.qid ? `https://www.wikidata.org/wiki/${wd.qid}` : null,
    family: gb?.family || null, genus: gb?.genus || null, iucn: wd?.iucn || null, names: wd?.names || [],
    trCount: gb?.trCount ?? null, gbifUrl: httpsOnly(gb?.url),
    sections: [...trSecs, ...enSecs],
  };
  const empty = !body.family && !body.sections.length;
  return json(body, 200, empty ? "public, s-maxage=600" : CACHE);
}
