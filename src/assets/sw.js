/* eslint-disable no-undef */
if (workbox) {

  console.log(`Workbox is active`);
  
  // adjust log level for displaying workbox logs
  workbox.setConfig({
    debug: true,
  })

  // apply precaching. In the built version, the precacheManifest will be imported using importScripts (as is workbox itself) and we can precache this. This is all we need for precaching
  // workbox.precaching.precacheAndRoute(self.__WB_MANIFEST);
  workbox.precaching.precacheAndRoute(self.__precacheManifest);

} else {
  console.warn(`Workbox is inactive!`);
}

console.log(`Custom service worker running!`);

self.addEventListener('push', function(event) {
  let data = {};
  console.log(event.data);
  if (event.data) {
    data = event.data.json();
  }
  console.log(`Notification data:`, data);
  event.waitUntil(self.registration.showNotification(data.title, {
    body: data.body,
    badge: `https://download-manager.chaphasilor.xyz/img/icons/android-chrome-maskable-192x192.png`,
    icon: `https://download-manager.chaphasilor.xyz/img/icons/android-chrome-512x512.png`,
    lang: `en-US`,
    requireInteraction: false,
    silent: false,
    timestamp: data.timestamp || Date.now(),
  }));
});

self.addEventListener('pushsubscriptionchange', function(event) {
  console.log('Subscription expired');
  event.waitUntil(
    self.registration.pushManager.subscribe({ userVisibleOnly: true })
    .then(function(subscription) {
      console.log('Subscribed after expiration', subscription.endpoint);
      return fetch('register', {
        method: 'post',
        headers: {
          'Content-type': 'application/json'
        },
        body: JSON.stringify({
          endpoint: subscription.endpoint
        })
      });
    })
  );
});
