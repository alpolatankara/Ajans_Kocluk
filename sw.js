const SURUM='akp-v3.17.0',DOSYALAR=['./','index.html','manifest.json','icon-192.png','icon-512.png','apple-touch-icon.png','favicon-32.png'];
self.addEventListener('install',e=>{e.waitUntil(caches.open(SURUM).then(c=>c.addAll(DOSYALAR)).then(()=>self.skipWaiting()));});
self.addEventListener('activate',e=>{e.waitUntil(caches.keys().then(k=>Promise.all(k.filter(x=>x!==SURUM).map(x=>caches.delete(x)))).then(()=>self.clients.claim()));});
self.addEventListener('fetch',e=>{const r=e.request;if(r.method!=='GET'||new URL(r.url).origin!==location.origin)return;
  e.respondWith(fetch(r).then(y=>{if(y&&y.ok){const k=y.clone();caches.open(SURUM).then(c=>c.put(r,k));}return y;}).catch(()=>caches.match(r).then(x=>x||caches.match('index.html'))));});
