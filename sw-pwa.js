const CACHE_NAME = "PWA-Materialize-v1";

const urlToCache = [
    "./index.html",
    "./nav.html",
    "./pages/home.html",
    "./pages/contact.html",
    "./pages/about.html",
    "./pages/add_data.html",
    "./css/materialize.min.css",
    "./js/materialize.min.js",
    "./js/custom.js",
    "./js/jquery.min.js"
];

self.addEventListener('install', function(event){
    event.waitUntil(
        caches.open(CACHE_NAME).then(function(cache){
            return cache.addAll(urlToCache);
        })
    );
});

self.addEventListener("activate", function(event) {
    event.waitUntil(
        caches.keys().then(function(cacheNames) {
        return Promise.all(
            cacheNames.map(function(cacheName) {
            if (cacheName != CACHE_NAME) {
                console.log("ServiceWorker: cache " + cacheName + " dihapus");
                return caches.delete(cacheName);
            }
            })
        );
        })
    );
});

self.addEventListener("fetch", function(event) {
    event.respondWith(
      caches
        .match(event.request, { cacheName: CACHE_NAME })
        .then(function(response) {
          if (response) {
           // console.log("ServiceWorker: Gunakan aset dari cache: ", response.url);
            return response;
          }
   
          //console.log(
           // "ServiceWorker: Memuat aset dari server: ",
           // event.request.url
         // );
          return fetch(event.request);
        })
    );
  });

  
