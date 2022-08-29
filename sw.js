;
// asignar un nombre y versión al cache
const CACHE_NAME = 'v1_cache_pandanotas',
  urlsToCache = [
    './',
    'https://fonts.googleapis.com',
    'https://fonts.gstatic.com',
    'https://fonts.googleapis.com/css2?family=Mochiy+Pop+One&family=Raleway:wght@400;500;700;900&display=swap',
    './style.css',
    './script.js',
    './assets/style-fondo.css',
    './assets/favicon.png',
    './assets/hoja01.png',
    './assets/hoja02.png',
    './assets/hoja03.png',
    './assets/hoja04.png',
    './assets/hoja05.png',
    './assets/hoja06.png',
    './assets/icon_32.png',
    './assets/icon_64.png',
    './assets/icon_96.png',
    './assets/icon_192.png',
    './assets/icon_256.png',
    './assets/icon_384.png',
    './assets/icon_512.png',
    './assets/icon_1024.png',
    './assets/icon-add.svg',
    './assets/icon-check-circle.svg',
    './assets/icon-check-fill.svg',
    './assets/icon-delete.svg',
    './assets/pexels-kroetlaender-pictures-8791837.jpg'
  ]

// durante la fase de instalación, generalmente se almacena en chaché los activos estáticos

self.addEventListener('install', e => {
  e.waitUntil(
    caches.open(CACHE_NAME)
      .then(cache => {
        return cache.addAll(urlsToCache)
          .then(() => self.skipWaiting())
      })
      .catch(err => console.log("Falló registro de cache", err))
  )
});

// una vez que se instale el SW, se activa y busca los recursos para haver función sin conexión

self.addEventListener('activate', e => {
  const cacheWhitelist = [CACHE_NAME];

  e.waitUntil(
    caches.keys()
      .then(cachesNames => {
        cachesNames.map(cacheName => {
          // Eliminamos lo que ya no necesita el cache
          if (cacheWhitelist.indexOf(cacheName) === -1) {
            return caches.delete(cacheName);
          };
        })
      })
      // Le indica al SW activar el cache actual
      .then(() => self.clients.claim())
  )
});

// cuando el navegador recupera una url

self.addEventListener('fetch', e => {
  // Responder ya sea con el objeto en caché o continuar y buscar la url real

  e.respondWidth(
    caches.match(e.request)
      .then(res => {
        if (res) {
          // recuperar del cache
          return res
        }

        // recuperar de la peticion a la url
        return fetch(e.request)
      })

  )

});