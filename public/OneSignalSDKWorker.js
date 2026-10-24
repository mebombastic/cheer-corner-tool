// The site's service worker, used only for OneSignal push notifications (v5).
// It deliberately has no fetch handler: pages and scripts load straight from the network,
// as on a normal website. An earlier version also kept an offline cache, and on iPhones
// that cache could serve an old page after an update ("Importing a module script failed").
// On activation it deletes those old caches.
try {
  importScripts("https://cdn.onesignal.com/sdks/web/v16/OneSignalSDK.sw.js");
} catch (e) {
  // OneSignal blocked or offline: the site works the same, only notifications are missing
}

self.addEventListener("install", () => self.skipWaiting());
self.addEventListener("activate", (event) => {
  event.waitUntil(
    caches
      .keys()
      .then((keys) => Promise.all(keys.filter((k) => k.startsWith("recane-")).map((k) => caches.delete(k))))
      .then(() => self.clients.claim()),
  );
});
