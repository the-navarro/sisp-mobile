/* Service worker mínimo: deixa o Chrome instalar o jogo como aplicativo.
   Não guarda nada em cache, então cada atualização do site aparece na hora. */
self.addEventListener('install',()=>self.skipWaiting());
self.addEventListener('activate',e=>e.waitUntil(self.clients.claim()));
self.addEventListener('fetch',()=>{});
