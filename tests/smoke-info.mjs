// node tests/smoke-info.mjs — /api/info gerçek kaynaklardan ne getiriyor (ağ gerekir)
import { GET } from "../api/info.js";
const L = {zambak:["Lilium","Zambak"],gul:["Rosa","Gül"],lavanta:["Lavandula angustifolia","Lavanta"],papatya:["Leucanthemum vulgare","Papatya"],nergis:["Narcissus","Nergis"],zeytin:["Olea europaea","Zeytin"],sumbul:["Hyacinthus orientalis","Sümbül"],ortanca:["Hydrangea macrophylla","Ortanca"]};
for (const [id, [l, t]] of Object.entries(L)) {
  const t0 = Date.now();
  const d = await (await GET(new Request(`https://x/api/info?latin=${encodeURIComponent(l)}&tr=${encodeURIComponent(t)}`))).json();
  console.log(id.padEnd(9), `${Date.now() - t0}ms`, "| aile:", d.family, "| IUCN:", d.iucn, "| TR adlar:", d.names.join("/"), "| TR gözlem:", d.trCount);
  for (const s of d.sections) console.log("   ", s.kind.padEnd(8), s.lang, s.title, "→", s.text.slice(0, 90).replace(/\n/g, " "));
}
