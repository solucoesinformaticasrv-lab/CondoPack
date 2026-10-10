
const CACHE_NAME = "condopack-shell-v1";

self.addEventListener("install", function (event) {
  self.skipWaiting();
});

self.addEventListener("activate", function (event) {
  event.waitUntil(
    (async function () {
      const cachesAtivos = await caches.keys();

      await Promise.all(
        cachesAtivos
          .filter(function (nome) {
            return nome.startsWith("condopack-shell-") &&
                   nome !== CACHE_NAME;
          })
          .map(function (nome) {
            return caches.delete(nome);
          })
      );

      await self.clients.claim();
    })()
  );
});
