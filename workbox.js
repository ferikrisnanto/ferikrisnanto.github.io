importScripts('https://storage.googleapis.com/workbox-cdn/releases/3.6.3/workbox-sw.js');

if (workbox)
  console.log(`Workbox berhasil dimuat`);
else
  console.log(`Workbox gagal dimuat`);

workbox.precaching.precacheAndRoute([
	"/",

	"/manifest.json",
	"/js/menu.js",
	"/js/api.js",
	"/js/db.js",
	"/js/idb.js",

    { url: '/index.html', revision: '1' },
    { url: '/article.html', revision: '1' },
    { url: '/block/menu.html', revision: '1' },
    // { url: '/pages/news.html', revision: '1' },
    // { url: '/pages/about.html', revision: '1' },
    // { url: '/pages/contact.html', revision: '1' },

    { url: '/css/materialize.min.css', revision: '1' },
    { url: '/js/materialize.min.js', revision: '1' },
    { url: '/js/script.js', revision: '1' },
]);

workbox.routing.registerRoute(
  new RegExp('/pages/'),
    workbox.strategies.staleWhileRevalidate({
        cacheName: 'pages',
        plugins: [
	    new workbox.expiration.Plugin({
	        maxEntries: 60,
	        maxAgeSeconds: 30 * 24 * 60 * 60, // 30 hari
	      }),
	    ],
    })
);

workbox.routing.registerRoute(
  new RegExp('https://api.football-data.org/v2/'),
    workbox.strategies.staleWhileRevalidate({
        cacheName: 'api',
        plugins: [
	    new workbox.expiration.Plugin({
	        maxEntries: 60,
	        maxAgeSeconds: 30 * 24 * 60 * 60, // 30 hari
	      }),
	    ],
    })
);

workbox.routing.registerRoute(
  new RegExp('article.html'),
    workbox.strategies.staleWhileRevalidate({
        cacheName: 'article',
        plugins: [
	    new workbox.expiration.Plugin({
	        maxEntries: 60,
	        maxAgeSeconds: 30 * 24 * 60 * 60, // 30 hari
	      }),
	    ],
    })
);

workbox.routing.registerRoute(
  /\.(?:png|gif|jpg|jpeg|svg)$/,
  workbox.strategies.cacheFirst({
    cacheName: 'images',
    plugins: [
      new workbox.expiration.Plugin({
        maxEntries: 60,
        maxAgeSeconds: 30 * 24 * 60 * 60, // 30 hari
      }),
    ],
  }),
);


// image online https://upload.wikimedia.org/wikipedia
workbox.routing.registerRoute(
  /^https:\/\/upload\.wikimedia\.org/,
  workbox.strategies.staleWhileRevalidate({
    cacheName: 'online-images',
  })
);

workbox.routing.registerRoute(
  /^https:\/\/code\.jquery\.com/,
  workbox.strategies.staleWhileRevalidate({
    cacheName: 'jquery',
  })
);

// unpkg.com
workbox.routing.registerRoute(
  /^https:\/\/unpkg\.com/,
  workbox.strategies.staleWhileRevalidate({
    cacheName: 'sweetalert',
  })
);

// Menyimpan cache untuk file font selama 1 tahun
workbox.routing.registerRoute(
  /^https:\/\/fonts\.googleapis\.com/,
  workbox.strategies.staleWhileRevalidate({
    cacheName: 'google-fonts-stylesheets',
  })
);
workbox.routing.registerRoute(
  /^https:\/\/fonts\.gstatic\.com/,
  workbox.strategies.cacheFirst({
    cacheName: 'google-fonts-webfonts',
    plugins: [
      new workbox.cacheableResponse.Plugin({
        statuses: [0, 200],
      }),
      new workbox.expiration.Plugin({
        maxAgeSeconds: 60 * 60 * 24 * 365,
        maxEntries: 30,
      }),
    ],
  })
);

self.addEventListener('push', function(event) {
  let body;
  if (event.data) {
    body = event.data.text();
  } else {
    body = 'Push message no payload';
  }
  let options = {
    body: body,
    icon: '/img/icon/512.png',
    badge: '/img/icon/128.png',
    image: 'https://gambarwalpaper.files.wordpress.com/2012/12/gudang-gamabr-walpaper-1.png',
    vibrate: [100, 50, 100],
    data: {
      dateOfArrival: Date.now(),
      primaryKey: 1
    }
  };
  event.waitUntil(
    self.registration.showNotification('Push Notification', options)
  );
});