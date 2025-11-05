// Dummy service worker to unregister itself
console.log('Old service worker loading - will unregister');

// Unregister this service worker
self.addEventListener('install', function(event) {
  console.log('Dummy SW: Installing and skipping waiting');
  self.skipWaiting();
});

self.addEventListener('activate', function(event) {
  console.log('Dummy SW: Activating and unregistering');
  event.waitUntil(
    self.registration.unregister().then(function() {
      console.log('Dummy SW: Successfully unregistered');
      return self.clients.matchAll();
    }).then(function(clients) {
      clients.forEach(client => {
        console.log('Dummy SW: Reloading client');
        client.navigate(client.url);
      });
    })
  );
});