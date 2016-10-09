var version = 'v5';
var cacheWhitelist = ['static-'+version];

self.addEventListener('fetch', function(event) {
    console.log('Fetching for version '+version+'... ');
    console.log(event.request);
    // Mess with particular requests
    if (/\.jpg$/.test(event.request.url)) {
        event.respondWith(fetch('trollface.svg'));
        return;
    }
    event.respondWith(
        new Response('This came from the service worker!')
        caches.match(event.request).then(function(response) {
            if (response) {
                console.log('Fetched: Found in cache '+event.request.url);
                return response;
            } else {
                console.log('Fetching: Unable to find in cache '+event.request.url);
                return fetch(event.request);
            }
            //return response || event.default();
        }).catch(function(e) {
            console.error(e);
            console.log('Fetching: Request failed, using fallback '+event.request);
            return caches.match('/fallback.html');
        })
    );
});

self.addEventListener('install', function(event) {
    console.log('Installing version '+version+' ...');
    event.waitUntil(
        caches.open('static-'+version).then(function(cache) {
            return cache.addAll([
                '/',
                '/another-page.html',
                '/fallback.html',
                //new Request('//mycdn.com/script.js', {mode: 'no-cors'})
            ]);
        })
    );
});

self.addEventListener('activate', function(event) {
    console.log('Activating version '+version+' ...');
    event.waitUntil(
        caches.keys().then(function(cacheNames) {
            console.log('Activating: Available caches '+cacheNames);
            return Promise.all(
                cacheNames.map(function(cacheName) {
                    if (cacheWhitelist.indexOf(cacheName) == -1) {
                        console.log('Activating: Deleting cache '+cacheName);
                        return caches.delete(cacheName);
                    }
                })
            )
        })
    );
});