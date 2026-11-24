/* On The Record service worker — conservative network-first.
   Pages and data always try the network first so the daily updates are
   never masked by a stale cache; the cache is only an offline fallback
   (the latest week's briefing stays readable with no connection). */
const CACHE = "otr-cache-v1";
const SHELL = [
  "/",
  "/index.html",
  "/manifest.webmanifest",
  "/og-image.png",
  "/icon-192.png",
  "/icon-512.png",
  "/apple-touch-icon.png",
  "/data/facilities.json",
  "/data/weeks/index.json"
];

self.addEventListener("install", (event) => {
  event.waitUntil(
    caches.open(CACHE).then((cache) => cache.addAll(SHELL)).then(() => self.skipWaiting())
  );
});

self.addEventListener("activate", (event) => {
  event.waitUntil(
    caches.keys()
      .then((keys) => Promise.all(keys.filter((k) => k !== CACHE).map((k) => caches.delete(k))))
      .then(() => self.clients.claim())
  );
});

self.addEventListener("fetch", (event) => {
  const req = event.request;
  if (req.method !== "GET") return;
  const url = new URL(req.url);
  if (url.origin !== self.location.origin) return; // map tiles and CDNs pass through untouched
  event.respondWith(
    fetch(req)
      .then((res) => {
        const copy = res.clone();
        caches.open(CACHE).then((cache) => cache.put(req, copy));
        return res;
      })
      .catch(() =>
        caches.match(req).then((hit) => {
          if (hit) return hit;
          if (req.mode === "navigate") return caches.match("/index.html");
          return Response.error();
        })
      )
  );
});
