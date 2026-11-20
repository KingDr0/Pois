/* Offline support + self-updating.
   Every release bumps VERSION. When the app opens (or comes back to the foreground) it asks the
   browser to re-check this file; a changed VERSION installs a fresh copy of the app, which then
   takes over and the page reloads itself. */
const VERSION = "pois-2026-11-20m";
const SHELL = ["./", "index.html", "style.css", "config.js", "cloud.js", "content.js", "words.js", "app.js", "manifest.webmanifest",
  "icons/icon-192.png", "icons/icon-512.png", "icons/favicon.png", "icons/apple-touch-icon.png"];

self.addEventListener("install", e => {
  /* cache: "reload" skips the browser's HTTP cache so the new version really is new */
  e.waitUntil(caches.open(VERSION).then(c => c.addAll(SHELL.map(u => new Request(u, { cache: "reload" })))).then(() => self.skipWaiting()));
});
self.addEventListener("activate", e => {
  e.waitUntil(caches.keys().then(ks => Promise.all(ks.filter(k => k !== VERSION).map(k => caches.delete(k)))).then(() => self.clients.claim()));
});
self.addEventListener("message", e => { if (e.data === "version" && e.source) e.source.postMessage({ type: "version", version: VERSION }); });

self.addEventListener("fetch", e => {
  const req = e.request; if (req.method !== "GET") return;
  const url = new URL(req.url);
  const isFont = /fonts\.(googleapis|gstatic)\.com$/.test(url.hostname);
  if (url.origin !== location.origin && !isFont) return; /* APIs, sign-in, database: always live */

  /* The page itself: network first so a fresh start gets the newest shell; cached copy when offline. */
  if (req.mode === "navigate") {
    e.respondWith(fetch(req, { cache: "no-cache" }).then(r => { const c = r.clone(); caches.open(VERSION).then(cache => cache.put("index.html", c)); return r; })
      .catch(() => caches.open(VERSION).then(cache => cache.match("index.html"))));
    return;
  }
  /* Everything else: instant from this version's cache, refreshed in the background. */
  e.respondWith(caches.open(VERSION).then(async cache => {
    const hit = await cache.match(req, { ignoreSearch: url.origin === location.origin });
    const live = fetch(url.origin === location.origin ? new Request(req, { cache: "no-cache" }) : req)
      .then(r => { if (r && (r.ok || r.type === "opaque")) cache.put(req, r.clone()); return r; }).catch(() => hit);
    return hit || live;
  }));
});
