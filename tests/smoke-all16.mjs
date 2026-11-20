// node tests/smoke-all16.mjs — rehberdeki 16 bitkinin hepsinde lisanslı fotoğraf var mı?
import { GET } from "../api/plant.js";
const L = {zambak:["Lilium","Zambak"],gul:["Rosa","Gül"],lale:["Tulipa","Lale"],orkide:["Phalaenopsis","Orkide"],papatya:["Leucanthemum vulgare","Papatya"],aycicegi:["Helianthus annuus","Ayçiçeği"],lavanta:["Lavandula angustifolia","Lavanta"],karanfil:["Dianthus caryophyllus","Karanfil"],sumbul:["Hyacinthus orientalis","Sümbül"],nergis:["Narcissus","Nergis"],kasimpati:["Chrysanthemum morifolium","Kasımpatı"],ortanca:["Hydrangea macrophylla","Ortanca"],menekse:["Streptocarpus ionanthus","Afrika menekşesi"],gerbera:["Gerbera jamesonii","Gerbera"],sakayik:["Paeonia lactiflora","Şakayık"],zeytin:["Olea europaea","Zeytin"]};
for (const [id, [l, t]] of Object.entries(L)) {
  const d = await (await GET(new Request(`http://x/api/plant?latin=${encodeURIComponent(l)}&tr=${encodeURIComponent(t)}`))).json();
  console.log(id.padEnd(10), String(d.photos.length).padStart(2), "foto", d.wiki ? "wiki" : "----", d.photos.every((p) => p.author && p.license && p.page.startsWith("https://")) ? "atıf ok" : "ATIF EKSİK");
  await new Promise((r) => setTimeout(r, 1100)); // iNaturalist nezaketi: ~1 istek/sn
}
