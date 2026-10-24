// The site's service worker: OneSignal push notifications plus the offline cache (sw.js).
// If OneSignal can't be loaded (blocked or offline on first visit), the site still installs
// and works offline; only notifications are missing.
try {
  importScripts("https://cdn.onesignal.com/sdks/web/v16/OneSignalSDK.sw.js");
} catch (e) {
  // ignore
}
// The version number makes every phone fetch the new sw.js (Safari doesn't check imported scripts
// for changes on its own). Raising it clears the old offline cache on all phones.
importScripts("sw.js?v=3");
