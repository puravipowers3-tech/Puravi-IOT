const CACHE_NAME = 'puravi-v1';
const ASSETS = [
  'puravi_app.html',
  'manifest.json',
  'https://cdnjs.cloudflare.com/ajax/libs/paho-mqtt/1.0.1/mqttws31.min.js',
  'https://fonts.googleapis.com/css2?family=Outfit:wght@400;600;800&family=Inter:wght@400;700&display=swap'
];

self.addEventListener('install', (e) => {
  e.waitUntil(
    caches.open(CACHE_NAME).then((cache) => cache.addAll(ASSETS))
  );
});

self.addEventListener('fetch', (e) => {
  e.respondWith(
    caches.match(e.request).then((res) => res || fetch(e.request))
  );
});
