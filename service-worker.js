const CACHE_NAME = 'my-site-cache-v5';

const urlsToCache = [
    '/',
    '/index.html',
    '/assets/css/styles.css',

    // Favicons and Manifest
    '/assets/favicon/apple-touch-icon.png',
    '/assets/favicon/favicon-96x96.png',
    '/assets/favicon/favicon.ico',
    '/assets/favicon/favicon.svg',
    '/site.webmanifest',
    '/assets/favicon/web-app-manifest-192x192.png',
    '/assets/favicon/web-app-manifest-512x512.png',

    // Images
    '/assets/images/awardceremony.jpg',
    '/assets/images/conference.jpg',
    '/assets/images/demostration.jpg',
    '/assets/images/groupphoto2023-2025.jpg',
    '/assets/images/hackathon.jpg',
    '/assets/images/logo.png',
    '/assets/images/profile.png',
    '/assets/images/project1.png',
    '/assets/images/project2.png',
    '/assets/images/project3.jpeg',
    '/assets/images/social-sprite.png',
    '/assets/images/workshop.jpg',

    // JS
    '/assets/js/script.js'
];

// INSTALL
self.addEventListener('install', event => {
    event.waitUntil(
        caches.open(CACHE_NAME).then(cache => cache.addAll(urlsToCache))
    );
    self.skipWaiting(); // optional but good to activate immediately
});

// ACTIVATE
self.addEventListener('activate', event => {
    event.waitUntil(
        caches.keys().then(keys =>
            Promise.all(
                keys.map(key => {
                    if (key !== CACHE_NAME) {
                        return caches.delete(key);
                    }
                })
            )
        )
    );
    self.clients.claim();
});

// FETCH
self.addEventListener('fetch', event => {
    event.respondWith(
        fetch(event.request)
            .then(networkResponse => {
                return caches.open(CACHE_NAME).then(cache => {
                    cache.put(event.request, networkResponse.clone());
                    return networkResponse;
                });
            })
            .catch(() => caches.match(event.request))
    );
});
