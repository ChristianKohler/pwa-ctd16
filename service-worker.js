var version = 'v10';
var cacheWhitelist = ['static-'+version];

self.addEventListener('fetch', function(event) {
    console.log('Fetching for version '+version+'... ');
    console.log(event.request);
	
    event.respondWith(
        caches.match(event.request).then(function(response) {
            if (response) {
                console.log('Fetched: Found in cache '+event.request.url);
                return response;
            } else {
                console.log('Fetching: Unable to find in cache '+event.request.url);
                return fetch(event.request);
            }
            return response || event.default();
        }).catch(function(e) {
            console.error(e);
            console.log('Fetching: Request failed');
			return event.default();
        })
    );
});

self.addEventListener('install', function(event) {
    console.log('Installing version '+version+' ...');
    event.waitUntil(
        caches.open('static-'+version).then(function(cache) {
            cache.addAll([
				new Request('https://ajax.googleapis.com/ajax/libs/angularjs/1.5.6/angular.min.js', {mode: 'no-cors'})
			]).then(function() { //Non-CORS fail by default
				console.log('All non-cors resources have been fetched and cached.');
			}).catch(function(e) {
				console.log('All non-cors resources have been fetched and cached. Expected failure when loading non-CORS URLs');
			})
            return cache.addAll([
                '/',
                '/main.js',
                '/styles/bootstrap.css',
                '/styles/vendor.css',
                '/styles/main.css',
                '/styles/specific.css',
                '/lib/jquery.js',
                '/lib/bootstrap.js',
                '/img/logo.png'
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
    )
});