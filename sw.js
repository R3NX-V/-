const CACHE_NAME = 'ege-survival-v1';
const urlsToCache = [
  './',
  './index.html',
  './manifest.json',
  './char1.png',
  './char2.png',
  './char3.png',
  './char4.png',
  './char5.png',
  './char6.png',
  './char7.png',
  './char8.png',
  './char9.png',
  './char10.png',
  './icon-192.png',
  './icon-512.png'
];

// Установка Service Worker
self.addEventListener('install', event => {
  event.waitUntil(
    caches.open(CACHE_NAME)
      .then(cache => {
        console.log('Кэширование файлов');
        return cache.addAll(urlsToCache);
      })
  );
});

// Обработка запросов
self.addEventListener('fetch', event => {
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

// Обновление кэша
self.addEventListener('activate', event => {
  event.waitUntil(
    caches.keys().then(cacheNames => {
      return Promise.all(
        cacheNames.map(cacheName => {
          if (cacheName !== CACHE_NAME) {
            return caches.delete(cacheName);
          }
        })
      );
    })
  );
});