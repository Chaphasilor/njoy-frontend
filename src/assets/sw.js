if (workbox) {

  console.log(`Workbox is active`);
  
  // adjust log level for displaying workbox logs
  workbox.setConfig({
    debug: true,
  })

  // apply precaching. In the built version, the precacheManifest will be imported using importScripts (as is workbox itself) and we can precache this. This is all we need for precaching
  workbox.precaching.precacheAndRoute(self.__precacheManifest);

} else {
  console.warn(`Workbox is inactive!`);
}

console.log(`Custom service worker running!`);
