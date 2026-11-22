// node tests/smoke-hero.mjs — rehberdeki bütün bitkilerde ilk fotoğraflar elle seçilenler mi (ağ gerekir)
import { GET, HERO } from "../api/plant.js";
import { PLANTS } from "../api/_plants.js";

const byLatin = Object.fromEntries(Object.values(PLANTS).map((p) => [p.lookup[0], p.lookup[1]]));
let ok = 0, total = 0;
for (const latin of Object.keys(HERO)) {
  total++;
  const tr = byLatin[latin] || "";
  const d = await (await GET(new Request(`https://x/api/plant?latin=${encodeURIComponent(latin)}&tr=${encodeURIComponent(tr)}`))).json();
  const hits = HERO[latin].filter((pg, i) => d.photos[i]?.page === pg).length;
  const heroOk = d.photos[0]?.page === HERO[latin][0];
  if (heroOk && hits === HERO[latin].length) ok++;
  console.log(heroOk ? "✓" : "✗", latin.padEnd(26), `${d.photos.length} foto, seçilen ${HERO[latin].length} fotoğraftan ${hits} tanesi başta`, d.wiki ? "" : "(Vikipedi özeti yok)");
  await new Promise((r) => setTimeout(r, 700)); // kaynaklara nezaket
}
console.log(`${ok}/${total} bitkide seçilen fotoğraflar tam olarak başta`);
