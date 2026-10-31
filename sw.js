/* Akademik Koçluk Paneli — basit önbellekleme service worker'ı.
   Çevrimdışı açılabilmesi ve tarayıcının "Uygulamayı yükle" seçeneğini göstermesi için gerekli. */
const CACHE = "akp-cache-v27";
const DOSYALAR = ["./", "./index.html", "./manifest.json", "./icon-192.png", "./icon-512.png", "./apple-touch-icon.png", "./favicon-32.png"];

self.addEventListener("install", e => {
  e.waitUntil(caches.open(CACHE).then(c => c.addAll(DOSYALAR)).catch(()=>{}));
  self.skipWaiting();
});

self.addEventListener("activate", e => {
  e.waitUntil(
    caches.keys().then(keys => Promise.all(keys.filter(k => k !== CACHE).map(k => caches.delete(k))))
  );
  self.clients.claim();
});

self.addEventListener("fetch", e => {
  if (e.request.method !== "GET") return;
  e.respondWith(
    caches.match(e.request).then(cached => {
      const ag = fetch(e.request).then(res => {
        if (res && res.ok) { const c = res.clone(); caches.open(CACHE).then(cc => cc.put(e.request, c)); }
        return res;
      }).catch(() => cached);
      return cached || ag;
    })
  );
});
