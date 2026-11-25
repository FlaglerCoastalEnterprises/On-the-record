/* On The Record service worker — conservative network-first.
   Pages and data always try the network first so the daily updates are
   never masked by a stale cache; the cache is only an offline fallback
   (the latest week's briefing stays readable with no connection). */
const CACHE = "otr-cache-v6";
const SHELL = [
  "/",
  "/index.html",
  "/manifest.webmanifest",
  "/og-image.png",
  "/icon-192.png",
  "/icon-512.png",
  "/apple-touch-icon.png",
  "/data/facilities.json",
  "/data/weeks/index.json",
  "/data/places/flagler.json"
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

/* Push alerts: the otr-push Worker sends JSON payloads {title, body, url, tag}
   for followed buildings/topics. Show the notification; a tap focuses an
   existing site tab and navigates it to the payload's deep link, or opens a
   new window when no site tab is open. */
self.addEventListener("push", (event) => {
  let data = {};
  try { data = event.data ? event.data.json() : {}; } catch (e) { data = {}; }
  const title = data.title || "On The Record";
  const options = {
    body: data.body || "",
    icon: "/icon-192.png",
    badge: "/icon-192.png",
    data: { url: data.url || "/" }
  };
  if (data.tag) options.tag = data.tag;
  event.waitUntil(self.registration.showNotification(title, options));
});

self.addEventListener("notificationclick", (event) => {
  event.notification.close();
  const target = (event.notification.data && event.notification.data.url) || "/";
  event.waitUntil(
    self.clients.matchAll({ type: "window", includeUncontrolled: true }).then((clientList) => {
      for (const client of clientList) {
        if (new URL(client.url).origin === self.location.origin && "focus" in client) {
          if ("navigate" in client) {
            return client.navigate(target).then((c) => (c ? c.focus() : client.focus()));
          }
          return client.focus();
        }
      }
      if (self.clients.openWindow) return self.clients.openWindow(target);
    })
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
