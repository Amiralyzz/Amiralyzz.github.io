const resourcesToPrecache = [
  "/",
  "index.html",
  "style.css",
  "JSON.js",
  "manifest.json",
  "engine.js",
  "script.js",
  "tree.js",
  "statistics.js",
  "TabContent.js",
  "liver.js",
  "electrolyte.js",
  "cbc.js",
  "abg.js",
  "metabolic.js",
  "appIcon.png",
  "/Art/abg.png",
  "/Art/analysis.png",
  "/Art/bio.png",
  "/Art/cbc.png",
  "/Art/clinical.png",
  "/Art/critical.png",
  "/Art/ebm.png",
  "/Art/female.png",
  "/Art/high.png",
  "/Art/kft.png",
  "/Art/lft.png",
  "/Art/link.png",
  "/Art/low.png",
  "/Art/male.png",
  "/Art/measurements.png",
  "/Art/normal.png",
  "/Art/pbs.png",
  "/Art/pin.png",
  "/Art/search.png",
  "/Art/tft.png",
  "/Art/unpin.png",
  "/Art/aja.png"
];

// Register the service worker
self.addEventListener("install", function (event) {
  console.log("service worker install event");
  event.waitUntil(
    caches.open("my-cache").then(async (cache) => {
      let ok;
      try {
        ok = await cache.addAll(resourcesToPrecache);

      } catch (err){
        console.error('sw: cache.addAll');
        for (let i of resourcesToPrecache) {
          try {
            ok = await cache.add(i);
          } catch (err) {
            console.warn('sw: cache.add',i);
          }
        }
      }
      return ok;
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


