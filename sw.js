/* Kill-switch service worker: wipes every cache, unregisters itself, reloads open tabs.
   Upload as /sw.js (same path the app registers). After one visit the old cached app is gone. */
self.addEventListener('install', function(){ self.skipWaiting(); });
self.addEventListener('activate', function(e){
  e.waitUntil((async function(){
    try{ var ks = await caches.keys(); await Promise.all(ks.map(function(k){ return caches.delete(k); })); }catch(_){}
    try{ await self.registration.unregister(); }catch(_){}
    try{ var cs = await self.clients.matchAll({type:'window'}); cs.forEach(function(c){ try{ c.navigate(c.url); }catch(_){} }); }catch(_){}
  })());
});
self.addEventListener('fetch', function(){ /* no caching: always network */ });
