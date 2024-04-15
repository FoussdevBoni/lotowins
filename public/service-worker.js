// service-worker.js

const CACHE_NAME = 'Lotowins';
const urlsToCache = [
  '/',
  '/styles/main.css',
  '/script/main.js',
  '/images/logo.png'
];

window.self.addEventListener('install', event => {
  event.waitUntil(
    caches.open(CACHE_NAME)
      .then(cache => cache.addAll(urlsToCache))
  );
});

window.self.addEventListener('fetch', event => {
  event.respondWith(
    caches.match(event.request)
      .then(response => {
        if (response) {
          return response;
        }
        return fetch(event.request);
      })
  );
});
