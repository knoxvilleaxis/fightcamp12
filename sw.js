/* Fight Camp 12 — offline service worker.
   Cache-first: once the app has loaded a single time, it never needs the network again.
   Bump CACHE when you change index.html so phones pick up the new version. */
const CACHE = "vigil-v5";
const FILES = [
  "/fightcamp12/",
  "/fightcamp12/index.html",
  "/fightcamp12/manifest.webmanifest",
  "/fightcamp12/icons/icon-192.png",
  "/fightcamp12/icons/icon-512.png",
  "/fightcamp12/icons/maskable-512.png",
  "/fightcamp12/icons/apple-touch-icon.png"
];

self.addEventListener("install", (e) => {
  e.waitUntil(
    caches.open(CACHE).then((c) => c.addAll(FILES)).then(() => self.skipWaiting())
  );
});

self.addEventListener("activate", (e) => {
  e.waitUntil(
    caches.keys()
      .then((keys) => Promise.all(keys.filter((k) => k !== CACHE).map((k) => caches.delete(k))))
      .then(() => self.clients.claim())
  );
});

self.addEventListener("fetch", (e) => {
  if (e.request.method !== "GET") return;
  e.respondWith(
    caches.match(e.request).then((hit) => {
      if (hit) return hit;
      return fetch(e.request)
        .then((res) => {
          const copy = res.clone();
          caches.open(CACHE).then((c) => c.put(e.request, copy)).catch(() => {});
          return res;
        })
        .catch(() => caches.match("/fightcamp12/index.html"));
    })
  );
});
