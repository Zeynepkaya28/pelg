// node tests/smoke-hero.mjs — 16 bitkinin hepsinde ilk 5 fotoğraf elle seçilenler mi (ağ gerekir)
import { GET, HERO } from "../api/plant.js";

const TR = {
  "Lilium": "Zambak", "Rosa": "Gül", "Tulipa": "Lale", "Phalaenopsis": "Orkide", "Leucanthemum vulgare": "Papatya",
  "Helianthus annuus": "Ayçiçeği", "Lavandula angustifolia": "Lavanta", "Dianthus caryophyllus": "Karanfil (çiçek)",
  "Hyacinthus orientalis": "Sümbül", "Narcissus": "Nergis", "Chrysanthemum morifolium": "Kasımpatı",
  "Hydrangea macrophylla": "Ortanca", "Streptocarpus ionanthus": "Afrika menekşesi", "Gerbera jamesonii": "Gerbera",
  "Paeonia lactiflora": "Şakayık", "Olea europaea": "Zeytin",
};

let ok = 0;
for (const latin of Object.keys(HERO)) {
  const res = await GET(new Request(`https://x/api/plant?latin=${encodeURIComponent(latin)}&tr=${encodeURIComponent(TR[latin])}`));
  const d = await res.json();
  const hits = HERO[latin].filter((pg, i) => d.photos[i]?.page === pg).length;
  const heroOk = d.photos[0]?.page === HERO[latin][0];
  if (heroOk && hits === HERO[latin].length) ok++;
  console.log(heroOk ? "✓" : "✗", latin.padEnd(26), `${d.photos.length} foto, ilk 5'ten ${hits} tanesi seçilen`);
  await new Promise((r) => setTimeout(r, 800)); // kaynaklara nezaket
}
console.log(`${ok}/16 bitkide ana fotoğraf ve mozaik tam olarak seçilenler`);
