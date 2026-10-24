// The site's service worker: OneSignal push notifications plus the offline cache (sw.js).
// If OneSignal can't be loaded (blocked or offline on first visit), the site still installs
// and works offline; only notifications are missing.
try {
  importScripts("https://cdn.onesignal.com/sdks/web/v16/OneSignalSDK.sw.js");
} catch (e) {
  // ignore
}
// The version is part of the URL so that every change to sw.js also changes this file:
// Safari only checks the registered worker file for updates, not the scripts it imports.
// Bump it whenever sw.js changes.
importScripts("sw.js?v=4");
