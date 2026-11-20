// node tests/smoke-keyless.mjs — anahtarsız kaynaklar gerçekten veri döndürüyor mu (ağ gerekir)
import { gather } from "../api/care.js";
import { GET as stock } from "../api/stock.js";
for (const n of ["Begonya", "Monstera deliciosa", "Kauçuk ağacı", "Kaktüs", "Masa"]) {
  const { sources, raw } = await gather(n);
  console.log(n.padEnd(20), "latin:", raw.latin, "| aile:", raw.gbif?.family, "| kaynak:", sources.join(", "), "| EN metin:", raw.wikipedia_en ? raw.wikipedia_en.length + " kr" : "-");
}
for (const c of ["Buket", "Ağaç / fidan"]) {
  const d = await (await stock(new Request("https://x/api/stock?cat=" + encodeURIComponent(c)))).json();
  console.log(c, d.photos.length, "görsel;", d.photos.slice(0, 2).map((p) => `${p.author} (${p.license})`).join(", "));
}
