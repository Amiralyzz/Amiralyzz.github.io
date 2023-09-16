const resourcesToPrecache = [
  "/",
  "index.html",
  "styles.css",
  "JSON.js",
  "manifest.json",
  "engine.js",
  "script.js",
  "tree.js",
  "statistics.js",
  "TabContent.js",
  "appIcon.png",
];

// Register the service worker
self.addEventListener("install", function (event) {
  console.log("service worker install event");
  event.waitUntil(
    caches.open("my-cache").then(function (cache) {
      return cache.addAll(resourcesToPrecache);
    })
  );
});

// Serve cached content when offline
self.addEventListener("fetch", function (event) {
  event.respondWith(
    caches.match(event.request).then(function (response) {
      return response || fetch(event.request);
    })
  );
});
