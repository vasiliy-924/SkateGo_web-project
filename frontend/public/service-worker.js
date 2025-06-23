/* eslint-disable no-restricted-globals */

// Кэширование статических ресурсов
const CACHE_NAME = 'skatego-cache-v1';
const urlsToCache = [
  '/',
  '/index.html',
  '/static/js/bundle.js',
  '/static/css/main.css'
];

self.addEventListener('install', event => {
  event.waitUntil(
    caches.open(CACHE_NAME)
      .then(cache => cache.addAll(urlsToCache))
  );
});

// Обработка push-уведомлений
self.addEventListener('push', event => {
  const data = event.data.json();
  
  const options = {
    body: data.body,
    icon: '/logo192.png',
    badge: '/logo192.png',
    vibrate: [200, 100, 200],
    data: data.url,
    actions: data.actions
  };

  event.waitUntil(
    self.registration.showNotification(data.title, options)
  );
});

// Обработка клика по уведомлению
self.addEventListener('notificationclick', event => {
  event.notification.close();

  if (event.action) {
    // Обработка действий уведомления
    switch (event.action) {
      case 'view_rental':
        event.waitUntil(clients.openWindow('/profile'));
        break;
      case 'return_skateboard':
        event.waitUntil(clients.openWindow('/return'));
        break;
      default:
        event.waitUntil(clients.openWindow(event.notification.data || '/'));
    }
  } else {
    // Действие по умолчанию при клике на уведомление
    event.waitUntil(
      clients.openWindow(event.notification.data || '/')
    );
  }
});

// Стратегия кэширования: сначала сеть, затем кэш
self.addEventListener('fetch', event => {
  event.respondWith(
    fetch(event.request)
      .then(response => {
        // Клонируем ответ, так как он может быть использован только один раз
        const responseToCache = response.clone();

        caches.open(CACHE_NAME)
          .then(cache => {
            cache.put(event.request, responseToCache);
          });

        return response;
      })
      .catch(() => caches.match(event.request))
  );
}); 