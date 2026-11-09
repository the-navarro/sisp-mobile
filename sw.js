/* SISP Mobile: funcionamento como app instalado e sem internet.

   - Programa do jogo (index.html, css/, js/, casos/): busca primeiro na rede,
     para o jogador receber sempre a versão mais nova; sem internet, usa a
     última cópia guardada.
   - Arte, vídeos, sons e fontes (assets/): entrega a cópia guardada na hora e
     confere em segundo plano se o arquivo mudou; a versão nova vale na vez
     seguinte. Cada arquivo fica guardado depois de aparecer uma vez.
   - Tudo que é de outro endereço (Firebase do modo em dois celulares) passa
     direto, sem ser guardado.

   Ao instalar, o programa do jogo inteiro é guardado lendo a lista de
   arquivos do próprio index.html, então não há lista para manter à mão.
   Se a regra de guarda mudar, troque o número de VERSAO: as cópias antigas
   são apagadas na próxima visita. */
const VERSAO = 1;
const PROGRAMA = 'sisp-programa-v' + VERSAO;
const ARTE = 'sisp-arte-v' + VERSAO;
const BASE = new URL('./', self.location).href;
const eArte = u => u.pathname.includes('/assets/');

self.addEventListener('install', e => {
  e.waitUntil((async () => {
    const c = await caches.open(PROGRAMA);
    const r = await fetch(BASE, { cache: 'no-cache' });
    const html = await r.clone().text();
    await c.put(BASE, r);
    const arquivos = [...html.matchAll(/(?:src|href)="((?:css|js|casos)\/[^"]+)"/g)].map(m => new URL(m[1], BASE).href);
    arquivos.push(new URL('manifest.webmanifest', BASE).href);
    /* um arquivo que falhe não impede a instalação: ele entra na primeira vez que for usado */
    await Promise.all(arquivos.map(u => fetch(u, { cache: 'no-cache' }).then(x => x.ok && c.put(u, x)).catch(() => {})));
    await self.skipWaiting();
  })());
});

self.addEventListener('activate', e => {
  e.waitUntil((async () => {
    const nomes = await caches.keys();
    await Promise.all(nomes.filter(n => n.startsWith('sisp-') && n !== PROGRAMA && n !== ARTE).map(n => caches.delete(n)));
    await self.clients.claim();
  })());
});

/* Vídeo e áudio pedem o arquivo em pedaços (cabeçalho Range): corta o pedaço da cópia inteira guardada. */
async function pedaco(req, inteira) {
  const m = /bytes=(\d*)-(\d*)/.exec(req.headers.get('range') || '');
  const buf = await inteira.arrayBuffer(), total = buf.byteLength;
  if (!m || (m[1] === '' && m[2] === '')) return new Response(buf, { status: 200, headers: inteira.headers });
  let ini = m[1] === '' ? Math.max(0, total - +m[2]) : +m[1];
  let fim = m[1] === '' || m[2] === '' ? total - 1 : Math.min(+m[2], total - 1);
  if (ini >= total || ini > fim) return new Response(null, { status: 416, headers: { 'Content-Range': 'bytes */' + total } });
  const h = new Headers(inteira.headers);
  h.set('Content-Range', `bytes ${ini}-${fim}/${total}`); h.set('Content-Length', String(fim - ini + 1)); h.set('Accept-Ranges', 'bytes');
  return new Response(buf.slice(ini, fim + 1), { status: 206, statusText: 'Partial Content', headers: h });
}

async function arte(req, ev) {
  const c = await caches.open(ARTE), chave = req.url, temRange = req.headers.has('range');
  /* busca sempre o arquivo inteiro, para a cópia servir a qualquer pedido depois */
  const baixar = async () => { const novo = await fetch(chave); if (novo.ok && novo.status === 200) await c.put(chave, novo.clone()); return novo; };
  let r = await c.match(chave);
  if (r) ev.waitUntil(baixar().catch(() => {}));   /* entrega a cópia já e confere em segundo plano se o arquivo mudou */
  else { r = await baixar(); if (!r.ok || r.status !== 200) return r; }
  return temRange ? pedaco(req, r) : r;
}

async function programa(req) {
  const c = await caches.open(PROGRAMA);
  /* a página do jogo é guardada num endereço só, com ou sem ?teste=0 e outros parâmetros */
  const chave = req.mode === 'navigate' ? BASE : req.url;
  try {
    const r = await fetch(req.mode === 'navigate' ? BASE : req, { cache: 'no-cache' });
    if (r.ok) c.put(chave, r.clone());
    return r;
  } catch (e) {
    const g = await c.match(chave);
    if (g) return g;
    throw e;
  }
}

self.addEventListener('fetch', e => {
  const req = e.request;
  if (req.method !== 'GET') return;
  const u = new URL(req.url);
  if (!u.href.startsWith(BASE)) return;                 /* outro endereço: não mexe */
  if (u.pathname.endsWith('/sw.js')) return;
  e.respondWith(eArte(u) ? arte(req, e) : programa(req));
});
