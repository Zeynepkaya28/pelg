// Yerel geliştirme sunucusu: `npm run dev` → http://localhost:3000
// Vercel CLI olmadan statik dosyaları ve /api/*.js uçlarını (Web Request/Response imzasıyla) çalıştırır.
// Ortam değişkenleri .env.local dosyasından okunur (repoya girmez). Canlıya benzer güvenlik başlıkları vercel.json'dan alınır.
import http from "node:http";
import { readFile, stat } from "node:fs/promises";
import { existsSync, readFileSync } from "node:fs";
import path from "node:path";
import { fileURLToPath, pathToFileURL } from "node:url";

const ROOT = path.resolve(path.dirname(fileURLToPath(import.meta.url)), "..");
const PORT = Number(process.env.PORT || 3000);

const envFile = path.join(ROOT, ".env.local");
if (existsSync(envFile)) {
  for (const line of readFileSync(envFile, "utf8").split(/\r?\n/)) {
    const m = line.match(/^\s*([A-Z0-9_]+)\s*=\s*(.*)\s*$/);
    if (m && !(m[1] in process.env)) process.env[m[1]] = m[2].replace(/^["']|["']$/g, "");
  }
}

const vercel = JSON.parse(readFileSync(path.join(ROOT, "vercel.json"), "utf8"));
const securityHeaders = Object.fromEntries((vercel.headers?.[0]?.headers || []).filter((h) => h.key !== "Strict-Transport-Security").map((h) => [h.key, h.key === "Content-Security-Policy" ? h.value.replace(/; upgrade-insecure-requests/, "") : h.value]));
// yerelde http kullanıldığı için HSTS ve upgrade-insecure-requests uygulanmaz
const TYPES = { ".html": "text/html; charset=utf-8", ".js": "text/javascript; charset=utf-8", ".css": "text/css; charset=utf-8", ".svg": "image/svg+xml", ".png": "image/png", ".ico": "image/x-icon", ".json": "application/json", ".xml": "application/xml; charset=utf-8", ".txt": "text/plain; charset=utf-8" };
const STATIC_OK = /^\/(index\.html|app\.js|styles\.css|favicon\.svg|sitemap\.xml|robots\.txt)?$/;
const PLANT_RE = /^\/bitki\/[a-z]+\/?$/; // vercel.json'daki rewrites ile aynı

async function handleApi(req, res, url) {
  const name = url.pathname.slice(5);
  if (!/^[a-z]+$/.test(name)) { res.writeHead(404).end(); return; }
  const file = path.join(ROOT, "api", name + ".js");
  if (!existsSync(file)) { res.writeHead(404).end(); return; }
  const mod = await import(pathToFileURL(file).href);
  const fn = mod[req.method];
  if (typeof fn !== "function") { res.writeHead(405).end(); return; }
  const chunks = []; for await (const c of req) chunks.push(c);
  const headers = new Headers();
  for (const [k, v] of Object.entries(req.headers)) if (typeof v === "string") headers.set(k, v);
  headers.set("x-forwarded-for", req.socket.remoteAddress || "127.0.0.1");
  const request = new Request(url, { method: req.method, headers, body: ["GET", "HEAD"].includes(req.method) ? undefined : Buffer.concat(chunks), duplex: "half" });
  const response = await fn(request);
  res.writeHead(response.status, { ...securityHeaders, ...Object.fromEntries(response.headers) });
  res.end(Buffer.from(await response.arrayBuffer()));
}

http.createServer(async (req, res) => {
  const url = new URL(req.url, `http://localhost:${PORT}`);
  try {
    if (url.pathname.startsWith("/api/")) return await handleApi(req, res, url);
    if (!STATIC_OK.test(url.pathname) && !PLANT_RE.test(url.pathname)) { res.writeHead(404, securityHeaders).end("Bulunamadı"); return; }
    const file = path.join(ROOT, url.pathname === "/" || PLANT_RE.test(url.pathname) ? "index.html" : url.pathname.slice(1));
    await stat(file);
    res.writeHead(200, { ...securityHeaders, "content-type": TYPES[path.extname(file)] || "application/octet-stream", "cache-control": "no-cache" });
    res.end(await readFile(file));
  } catch (e) {
    console.error(req.method, url.pathname, e);
    if (!res.headersSent) res.writeHead(500).end("Sunucu hatası");
  }
}).listen(PORT, () => console.log(`Sera Defteri → http://localhost:${PORT}`));
