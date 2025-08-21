const CACHE_NAME = "tcc-cache-v1";
const URLS_TO_CACHE = [
  "./",
  "index.html",
  "style.css",
  "assets/video/hero.mp4",
  "assets/img/hero_poster.png",
  "assets/img/liposuccion.png",
  "assets/img/liftings.png",
  "assets/img/bbl_soft.png",
  "assets/img/j_plasma.png",
  "assets/img/hollywood_smile.png",
  "manifest.webmanifest"
];

self.addEventListener("install", (event) => {
  event.waitUntil(
    caches.open(CACHE_NAME).then((cache) => cache.addAll(URLS_TO_CACHE))
  );
});

self.addEventListener("activate", (event) => {
  event.waitUntil(
    caches.keys().then((keys) =>
      Promise.all(keys.map((key) => (key !== CACHE_NAME ? caches.delete(key) : null)))
    )
  );
});

self.addEventListener("fetch", (event) => {
  event.respondWith(
    caches.match(event.request).then((response) => response || fetch(event.request))
  );
});