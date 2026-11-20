// Elle çalıştırılan duman testi: node tests/smoke-plant.mjs (ağ gerektirir)
import { GET } from "../api/plant.js";
for (const [l, t] of [["Lilium","Zambak"],["Phalaenopsis","Orkide"],["Olea europaea","Zeytin"],["Streptocarpus ionanthus","Afrika menekşesi"],["bad<x",""]]) {
  const r = await GET(new Request(`http://x/api/plant?latin=${encodeURIComponent(l)}&tr=${encodeURIComponent(t)}`));
  const d = await r.json();
  console.log(l, r.status, "photos", d.photos?.length ?? "-", [...new Set((d.photos || []).map((p) => p.source + ":" + p.license))].join(","), "wiki", !!d.wiki, d.error || "");
  if (l === "Lilium") console.log(" ", JSON.stringify(d.photos?.[0]), "|", d.wiki?.text?.slice(0, 80));
}
