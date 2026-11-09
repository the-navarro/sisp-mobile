/* Confere se o jogo pode ser instalado como app e se abre sem internet.

   1. O manifesto é válido e os ícones existem no tamanho declarado.
   2. O serviço de app (sw.js) é registrado e guarda o programa do jogo inteiro.
   3. Com o servidor desligado, o jogo recarrega, mostra o menu e abre um caso;
      imagens e vídeos já vistos continuam aparecendo.
   4. As Configurações mostram o quadro "Instalar como app".

   Uso:  node conferir-app.mjs */
import fs from 'node:fs';
import path from 'node:path';
import { servidor, abrirNavegador, novoContexto, ouvirErros, META_INICIAL, RAIZ } from './base.mjs';

let falhou = 0;
const relata = (ok, txt, det) => { if (ok) console.log('✓ ' + txt); else { falhou++; console.log('✗ ' + txt + (det ? '\n    - ' + det : '')); } };

/* 1. manifesto e ícones */
{
  const prob = [];
  let m = null;
  try { m = JSON.parse(fs.readFileSync(path.join(RAIZ, 'manifest.webmanifest'), 'utf8')); } catch (e) { prob.push('manifest.webmanifest não é um JSON válido'); }
  if (m) {
    ['name', 'short_name', 'start_url', 'display', 'icons'].forEach(k => { if (!m[k]) prob.push('falta "' + k + '" no manifesto'); });
    const tam = new Set();
    (m.icons || []).forEach(i => {
      const arq = path.join(RAIZ, i.src);
      if (!fs.existsSync(arq)) { prob.push('ícone não existe: ' + i.src); return; }
      const b = fs.readFileSync(arq), w = b.readUInt32BE(16), h = b.readUInt32BE(20);
      if (i.sizes !== w + 'x' + h) prob.push(`o ícone ${i.src} tem ${w}x${h}, mas o manifesto diz ${i.sizes}`);
      tam.add(i.sizes + (i.purpose === 'maskable' ? ' maskable' : ''));
    });
    ['192x192', '512x512', '512x512 maskable'].forEach(t => { if (!tam.has(t)) prob.push('falta um ícone ' + t); });
  }
  const html = fs.readFileSync(path.join(RAIZ, 'index.html'), 'utf8');
  if (!/rel="manifest"/.test(html)) prob.push('o index.html não aponta para o manifesto');
  if (!/apple-touch-icon/.test(html)) prob.push('falta o ícone para iPhone no index.html');
  relata(!prob.length, 'manifesto e ícones do app', prob.join('\n    - '));
}

const { srv, faltando, url } = await servidor();
const browser = await abrirNavegador();
const ctx = await novoContexto(browser, url, { app: true });
await ctx.addInitScript(m => { if (!localStorage.getItem('sisp-meta')) localStorage.setItem('sisp-meta', m); }, META_INICIAL);
const page = await ctx.newPage(), erros = [];
ouvirErros(page, erros);

/* 2. registro e programa guardado */
await page.goto(url);
const pronto = await page.evaluate(async () => {
  if (!('serviceWorker' in navigator)) return { erro: 'o navegador de teste não tem suporte' };
  const fim = Date.now() + 15000;
  await navigator.serviceWorker.ready;
  while (!navigator.serviceWorker.controller && Date.now() < fim) await new Promise(r => setTimeout(r, 100));
  const nomes = await caches.keys(), prog = nomes.find(n => n.startsWith('sisp-programa'));
  const guard = prog ? (await (await caches.open(prog)).keys()).map(r => r.url) : [];
  const precisa = [...document.querySelectorAll('script[src],link[rel=stylesheet]')].map(e => e.src || e.href);
  return { controla: !!navigator.serviceWorker.controller, guardados: guard.length, faltam: precisa.filter(u => !guard.includes(u)).map(u => u.replace(location.origin, '')) };
});
relata(!pronto.erro && pronto.controla && !pronto.faltam.length, `serviço de app registrado, ${pronto.guardados || 0} arquivos do programa guardados`, pronto.erro || (!pronto.controla ? 'o serviço não assumiu a página' : 'não foram guardados: ' + pronto.faltam.join(', ')));

/* usa o jogo um pouco com internet: menu, lista de casos e a abertura do treinamento */
await page.reload();
await page.waitForTimeout(600);
const visto = await page.evaluate(async () => {
  ONS = null; render(); await new Promise(r => setTimeout(r, 700));
  ARQ = 1; render(); await new Promise(r => setTimeout(r, 900));
  const imgs = [...document.querySelectorAll('#ui img')].filter(i => i.complete && i.naturalWidth > 0).map(i => i.getAttribute('src'));
  const v = await fetch('assets/v/c0_intro.mp4'); await v.arrayBuffer();
  return { imgs, video: v.status };
});
await page.waitForTimeout(500);

/* 3. sem internet: servidor desligado e rede cortada */
await new Promise(r => { srv.close(r); srv.closeAllConnections && srv.closeAllConnections(); });
await ctx.setOffline(true);
erros.length = 0;
let abriu = true;
try { await page.reload({ timeout: 15000 }); } catch (e) { abriu = false; }
await page.waitForTimeout(800);
const off = abriu ? await page.evaluate(async ({ imgs }) => {
  const r = { casos: typeof CASES !== 'undefined' ? CASES.length : 0 };
  try {
    ONS = null; render(); r.menu = /SISP/.test(document.body.innerText);
    ARQ = 1; render(); await new Promise(z => setTimeout(z, 900));
    const agora = [...document.querySelectorAll('#ui img')];
    r.imgsQuebradas = agora.filter(i => imgs.includes(i.getAttribute('src')) && !(i.complete && i.naturalWidth > 0)).map(i => i.getAttribute('src'));
    r.imgsOk = agora.filter(i => i.complete && i.naturalWidth > 0).length;
    const p = await fetch('assets/v/c0_intro.mp4', { headers: { Range: 'bytes=0-99' } }); r.pedaco = p.status + ' ' + (await p.arrayBuffer()).byteLength + ' ' + p.headers.get('Content-Range');
    const f = await fetch('assets/v/c0_intro.mp4', { headers: { Range: 'bytes=-50' } }); r.fimDoVideo = f.status + ' ' + (await f.arrayBuffer()).byteLength;
    ARQ = 0; startCase('c0', 1); r.caso = !!C && !MENU; cutEnd(); while (S.seen < 4) brN(1); r.telaDoCaso = !!document.querySelector('#ui').innerText.trim();
    toMenu(); SET = 1; render(); r.quadro = /Instalar/.test(document.querySelector('.setv') ? document.querySelector('.setv').innerText : ''); SET = 0; render();
  } catch (e) { r.erro = String(e.message || e); }
  return r;
}, { imgs: visto.imgs }) : {};
relata(abriu && off.casos > 0 && off.menu, 'sem internet, o jogo recarrega e mostra o menu', !abriu ? 'a página não abriu sem internet' : off.erro || 'o menu não apareceu');
relata(abriu && off.caso && off.telaDoCaso && !off.erro, 'sem internet, um caso abre e passa do briefing', off.erro);
relata(abriu && off.imgsQuebradas && !off.imgsQuebradas.length && off.imgsOk > 0, `sem internet, as ${off.imgsOk || 0} imagens já vistas continuam aparecendo`, (off.imgsQuebradas || []).join(', '));
relata(abriu && /^206 100 bytes 0-99\//.test(off.pedaco || '') && off.fimDoVideo === '206 50', 'sem internet, o vídeo já visto é entregue em pedaços (como o celular pede)', 'respostas: ' + off.pedaco + ' | ' + off.fimDoVideo);
relata(abriu && off.quadro, 'as Configurações mostram o quadro "Instalar como app"', '');
relata(!erros.length, 'nenhum erro de JavaScript sem internet', erros[0]);

await browser.close();
console.log(falhou ? `\n${falhou} problema(s) encontrado(s).` : '\nTudo certo: o jogo pode ser instalado e abre sem internet.');
process.exit(falhou ? 1 : 0);
