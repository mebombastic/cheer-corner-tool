// Retired. This was the site's first service worker (offline cache). Phones that still have
// it registered pick up this version, which deletes its caches and unregisters itself, so
// pages load straight from the network. The site now registers OneSignalSDKWorker.js.
self.addEventListener("install", () => self.skipWaiting());
self.addEventListener("activate", (event) => {
  event.waitUntil(
    caches
      .keys()
      .then((keys) => Promise.all(keys.filter((k) => k.startsWith("recane-")).map((k) => caches.delete(k))))
      .then(() => self.registration.unregister()),
  );
});
