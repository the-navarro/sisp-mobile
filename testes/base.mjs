/* Peças comuns aos testes: servidor local, navegador sem tela e coleta de erros. */
import http from 'node:http';
import fs from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';
import { chromium } from 'playwright';

export const RAIZ = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '..');
const TIPOS = { '.html': 'text/html; charset=utf-8', '.js': 'text/javascript; charset=utf-8', '.css': 'text/css; charset=utf-8', '.json': 'application/json', '.webmanifest': 'application/manifest+json', '.png': 'image/png', '.jpg': 'image/jpeg', '.webp': 'image/webp', '.svg': 'image/svg+xml', '.mp4': 'video/mp4', '.m4a': 'audio/mp4', '.mp3': 'audio/mpeg', '.woff2': 'font/woff2' };

/* Serve a pasta do jogo e anota todo arquivo pedido que não existe. */
export function servidor() {
  const faltando = new Set();
  const srv = http.createServer((req, res) => {
    const u = decodeURIComponent(new URL(req.url, 'http://x').pathname);
    const arq = path.join(RAIZ, u === '/' ? 'index.html' : u);
    if (!arq.startsWith(RAIZ) || !fs.existsSync(arq) || fs.statSync(arq).isDirectory()) {
      faltando.add(u); res.writeHead(404); res.end(); return;
    }
    res.writeHead(200, { 'Content-Type': TIPOS[path.extname(arq)] || 'application/octet-stream' });
    fs.createReadStream(arq).pipe(res);
  });
  return new Promise(ok => srv.listen(0, '127.0.0.1', () => ok({ srv, faltando, url: `http://127.0.0.1:${srv.address().port}/` })));
}

export async function abrirNavegador() {
  try { return await chromium.launch(); }
  catch (e) { return await chromium.launch({ channel: 'chrome' }); }
}

/* Contexto de celular, sem internet (o jogo solo não precisa dela). */
export async function novoContexto(browser, url, { app = false } = {}) {
  /* o serviço de app (sw.js) só é ligado no teste dele: nos outros, cada pedido vai direto ao servidor */
  const ctx = await browser.newContext({ viewport: { width: 390, height: 844 }, hasTouch: true, isMobile: true, serviceWorkers: app ? 'allow' : 'block' });
  await ctx.route(u => !u.href.startsWith(url), r => r.abort());
  return ctx;
}

/* Liga a coleta de erros de JavaScript de uma página. */
export function ouvirErros(page, erros, nome) {
  page.on('pageerror', e => erros.push((nome ? nome + ': ' : '') + String(e.stack || e).split('\n').slice(0, 3).join(' | ')));
  page.on('console', m => {
    if (process.env.DEPURAR && m.type() === 'log') console.log('  [página] ' + m.text());
    if (m.type() === 'error' && !/Failed to load resource|net::ERR/.test(m.text())) erros.push((nome ? nome + ': ' : '') + 'console: ' + m.text());
  });
}

/* Jogador que já passou pela apresentação inicial. */
export const META_INICIAL = JSON.stringify({ done: {}, p: {}, onb: 1, pl: { n: 'Teste' } });

export function arquivosFaltando(faltando) {
  return [...faltando].filter(u => u !== '/favicon.ico');
}
