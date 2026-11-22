// node scripts/gen-plants.mjs — app.js'teki FLOWERS ve LOOKUP verisinden api/_plants.js üretir.
// Sunucu (paylaşım önizlemesi) ile ön yüz aynı bitki bilgisini kullansın diye. Test, dosyanın güncel olduğunu denetler.
import { readFileSync, writeFileSync } from "node:fs";
import path from "node:path";
import vm from "node:vm";
import { fileURLToPath } from "node:url";

const ROOT = path.resolve(path.dirname(fileURLToPath(import.meta.url)), "..");

export function buildPlants() {
  const src = readFileSync(path.join(ROOT, "app.js"), "utf8");
  const flowers = src.slice(src.indexOf("const FLOWERS = ["), src.indexOf("const BY_ID"));
  const lookupStart = src.indexOf("const LOOKUP=");
  const lookup = src.slice(lookupStart, src.indexOf("};", lookupStart) + 2);
  const ctx = {};
  vm.runInNewContext(`${flowers}\n${lookup}\nthis.FLOWERS=FLOWERS; this.LOOKUP=LOOKUP;`, ctx);
  const plants = {};
  for (const f of ctx.FLOWERS) {
    plants[f.id] = { name: f.name, latin: f.latin, blurb: f.blurb, colors: f.colors.map((c) => ({ n: c.n, m: c.m })), lookup: ctx.LOOKUP[f.id] };
  }
  return "// OTOMATİK ÜRETİLDİ — elle düzenleme: node scripts/gen-plants.mjs\nexport const PLANTS = " + JSON.stringify(plants, null, 1) + ";\n";
}

if (process.argv[1] && path.resolve(process.argv[1]) === fileURLToPath(import.meta.url)) {
  writeFileSync(path.join(ROOT, "api", "_plants.js"), buildPlants());
  console.log("api/_plants.js güncellendi");
}
