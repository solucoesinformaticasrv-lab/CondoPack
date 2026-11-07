// Service Worker do CondoPack Admin: só permite instalar como app.
// Não guarda nada em cache (os dados vêm sempre do Apps Script).
const CACHE_NAME = "condopack-admin-shell-v1";

self.addEventListener("install", function () {
  self.skipWaiting();
});

self.addEventListener("activate", function (event) {
  event.waitUntil(
    (async function () {
      const nomes = await caches.keys();
      await Promise.all(
        nomes
          .filter(function (nome) {
            return nome.startsWith("condopack-admin-shell-") && nome !== CACHE_NAME;
          })
          .map(function (nome) { return caches.delete(nome); })
      );
      await self.clients.claim();
    })()
  );
});
