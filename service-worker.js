const CACHE_NAME = 'puravi-v2';
const ASSETS = [
  'puravi_app.html',
  'manifest.json',
  'https://cdnjs.cloudflare.com/ajax/libs/paho-mqtt/1.0.1/mqttws31.min.js',
  'https://fonts.googleapis.com/css2?family=Outfit:wght@400;600;800&family=Inter:wght@400;700&display=swap'
];

self.addEventListener('install', (e) => {
  self.skipWaiting();
  e.waitUntil(
    caches.open(CACHE_NAME).then((cache) => cache.addAll(ASSETS))
  );
});

self.addEventListener('activate', (e) => {
  e.waitUntil(
    caches.keys().then((keys) => {
      return Promise.all(keys.map((key) => {
        if (key !== CACHE_NAME) return caches.delete(key);
      }));
    })
  );
});

self.addEventListener('fetch', (e) => {
  // Network-First Strategy
  e.respondWith(
    fetch(e.request).catch(() => caches.match(e.request))
  );
});
