// Sera Defteri — service worker: çevrimdışı rehber ve hızlı açılış.
// Yalnızca kendi alan adımızdaki dosyalar ve CDN'deki iki kütüphane önbelleğe alınır; Supabase ve kişisel veri asla.
const VERSION = "v2";
const SHELL = `shell-${VERSION}`, DATA = `data-${VERSION}`;
const CDN = [
  "https://cdn.jsdelivr.net/npm/three@0.128.0/build/three.min.js",
  "https://cdn.jsdelivr.net/npm/@supabase/supabase-js@2.119.2/dist/umd/supabase.js",
];
const PRECACHE = ["/", "/app.js", "/styles.css", "/favicon.svg", "/manifest.webmanifest", "/gizlilik", "/kosullar"];

self.addEventListener("install", (e) => {
  e.waitUntil((async () => {
    const c = await caches.open(SHELL);
    await c.addAll(PRECACHE);
    await Promise.all(CDN.map((u) => c.add(new Request(u, { mode: "cors", credentials: "omit" })).catch(() => {})));
    await self.skipWaiting();
  })());
});

self.addEventListener("activate", (e) => {
  e.waitUntil((async () => {
    for (const k of await caches.keys()) if (k !== SHELL && k !== DATA) await caches.delete(k);
    await self.clients.claim();
  })());
});

async function networkFirst(req, cacheName, fallbackUrl) {
  const c = await caches.open(cacheName);
  try {
    const res = await fetch(req);
    if (res.ok) c.put(req, res.clone());
    return res;
  } catch {
    return (await c.match(req)) || (fallbackUrl && (await caches.match(fallbackUrl))) || Response.error();
  }
}

self.addEventListener("fetch", (e) => {
  const req = e.request;
  if (req.method !== "GET") return;
  const url = new URL(req.url);
  if (CDN.includes(url.href)) { e.respondWith(caches.match(req).then((r) => r || fetch(req))); return; }
  if (url.origin !== self.location.origin) return; // Supabase, görseller vb.: tarayıcıya bırak
  if (req.mode === "navigate") { e.respondWith(networkFirst(req, SHELL, "/")); return; }
  if (url.pathname === "/api/plant") { e.respondWith(networkFirst(req, DATA)); return; } // gezilen bitkilerin fotoğraf listesi
  if (url.pathname.startsWith("/api/")) return; // diğer uçlar: hep ağdan
  // site dosyaları da önce ağdan: yayından sonra herkes yeni sürümü alır; ağ yoksa önbellek
  e.respondWith(networkFirst(req, SHELL));
});

// bildirime tıklanınca Bitkilerim'i aç
self.addEventListener("notificationclick", (e) => {
  e.notification.close();
  e.waitUntil(self.clients.matchAll({ type: "window" }).then((ws) => {
    const w = ws.find((x) => new URL(x.url).origin === self.location.origin);
    return w ? (w.navigate("/#bitkilerim"), w.focus()) : self.clients.openWindow("/#bitkilerim");
  }));
});
