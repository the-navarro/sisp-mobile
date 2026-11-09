/* Joga cada caso do começo ao fim, sozinho, num navegador sem tela.

   O robô segue o guia do próprio jogo (a função nxt(), a mesma que escreve o
   passo a passo no rodapé) e usa as mesmas funções que os botões chamam:
   coletar, enviar à perícia, perguntar, atender ligação, contradizer, ligar
   provas no Quadro e pedir o mandado. Assim ele confere três coisas:

   1. todo caso tem solução seguindo as regras do jogo (nada fica trancado);
   2. o guia nunca manda o jogador para um beco sem saída;
   3. nenhuma tela dá erro de JavaScript pelo caminho.

   O relógio do navegador é controlado pelo teste, então esperas longas
   (laudos, digitação das respostas) passam em instantes.

   Depois de jogar tudo sozinho, o robô liga o modo "Em dupla" (um celular,
   dois papéis) e joga os casos de novo, passando o celular sempre que a tela
   pertence ao outro papel e confirmando a acusação em conjunto.

   Uso:  cd testes && npm install && npm test
         node jogar-casos.mjs c3            joga só o caso c3
         PARCEIRO=1 node jogar-casos.mjs    joga escolhendo um parceiro em cada caso
         DEPURAR=1 node jogar-casos.mjs     mostra o estado completo quando um caso trava

   "Avisos" são coisas que o robô estranhou mas que não impedem terminar o caso
   (por exemplo, o guia apontar para uma tela ainda trancada). Só problemas de
   verdade (caso sem solução, erro de JavaScript, arquivo faltando) fazem o
   teste falhar. */
import { servidor, abrirNavegador, novoContexto, ouvirErros, META_INICIAL, arquivosFaltando } from './base.mjs';

const SO = process.argv.slice(2).filter(a => /^c\d+$/.test(a));
const PARCEIRO = !!process.env.PARCEIRO;
const MAX_PASSOS = 1500;      // por caso
const MAX_PARADO = 80;        // passos seguidos sem progresso

/* ---------- funções que rodam dentro da página ---------- */

/* Um passo do robô. Devolve {a: ação feita, w: ms de relógio para avançar}. */
function passo() {
  const fim = (a, w, x) => ({ a, w: w || 300, x: x || '' });
  if (MENU || !C) return fim('menu');
  /* modo dupla (um celular): sorteio dos papéis, passagem do celular e acusação em conjunto */
  const duo = window.DUO && DUO.on ? duoAct() : null;
  if (duo) {
    if (!DUO.shown[duo.key]) { duoRoll('keep'); return fim('dupla: papéis sorteados'); }
    if (DUO.conf) { const st = DUO.conf.st; duoConf(st === 0 ? 1 : 2); return fim(st === 0 ? 'dupla: passou o celular para ver a acusação' : 'dupla: concordou com a acusação', 600); }
    if (DUO.swap) { duoGo('swap'); return fim('dupla: passou o celular'); }
    if (DUO.role || DUO.sb) { DUO.role = 0; DUO.sb = 0; duoTick(); return fim('dupla: fechou o cartão'); }
  }
  if (CUT) { cutEnd(); return fim('pulou a cena'); }
  if (V) return fim(V.w ? 'venceu' : 'mandado negado', 0, V.t + ' · ' + V.m);
  if (S.seen < 4) { brN(1); return fim('briefing'); }
  if (S.lv == null && !C.tut) { S.lv = 0; LVO = 0; save(); render(); return fim('nível de guia'); }
  if (RS) { RS = 0; render(); return fim('fechou o resumo'); }
  if (S.typing || T) return fim('esperando a resposta', 500);
  if (window.MXQ) return fim('modal de parceiro aberto', 300);
  if (window.MG) {
    const it = IXM[MG.id], k = MG.k;
    if (k === 'pz') { mgPick(it.ok); return fim('quebra-cabeça da perícia', 1500); }
    if (k === 'col' && it.col === 'dust') {
      const sv = document.getElementById('mgd'), r = sv.getBoundingClientRect();
      const ev = (t, x, y) => sv.dispatchEvent(new PointerEvent(t, { bubbles: true, clientX: r.left + x / 240 * r.width, clientY: r.top + y / 180 * r.height }));
      ev('pointerdown', 55, 25);
      for (let y = 25; y < 160; y += 14) for (let x = 55; x < 190; x += 11) ev('pointermove', x, y);
      window.dispatchEvent(new PointerEvent('pointerup'));
      return fim('coleta de digitais', 900);
    }
    if (k === 'col') { it.st.forEach((_, i) => mgSt(i)); return fim('coleta de material', 1200); }
    mgClose(); return fim('fechou minijogo');
  }
  if (S.call) { if (!S.callst) { S.callst = 1; save(); render(); return fim('atendeu a ligação'); } endcall(); return fim('anotou a ligação', 1600); }
  if (window.ARRQ && ARRQ.length) { arrGo(1); return fim('recebeu suspeito novo'); }
  if ((S.mq || []).length) { if (Date.now() < QOK) return fim('esperando o registro', 500); doreg(); return fim('registrou'); }

  if (duo && duoLabPend() && duoHolderRole(duo, duoSes(duo)) === 1) { duoLbClose(duoLabPend().id); return fim('dupla: leu o laudo'); }

  const x = nxt();
  /* em dupla, a tela do passo pode ser do outro papel: pede o celular como o jogador faria */
  if (duo && tabOpen(x.tab === 'dossier' || x.tab === 'timeline' ? 'caderno' : x.tab)) {
    const t = x.tab === 'dossier' || x.tab === 'timeline' ? 'caderno' : x.tab, g = duoGate(duo, t);
    if (g >= 0 && g !== duoHolderRole(duo, duoSes(duo))) {
      go(t); /* o mesmo que tocar no botão do guia */
      if (!DUO.swap) return fim('guia sem saída', 0, 'em dupla, o botão do guia para ' + t + ' não pediu a troca do celular');
      return fim('dupla: pediu o celular para ' + t);
    }
  }
  /* o guia mandou para uma tela que ainda está trancada: anota e espera */
  if (!tabOpen(x.tab === 'dossier' || x.tab === 'timeline' ? 'caderno' : x.tab)) return fim('guia aponta para tela trancada', 4000, '"' + x.t.replace(/\s*\(.*\)$/, '') + '" manda abrir ' + x.tab + ', que responde: ' + (LK[x.tab] || 'Ainda bloqueado.'));
  if (x.tab === 'caderno') {
    const falta = CDT.map(t => t[0]).find(k => !(S.cdv || []).includes(k));
    if (falta && !S.cd1) { go('caderno'); S.f.cd = falta; save(); render(); return fim('caderno: ' + falta); }
  }
  if (x.tab === 'locations') {
    const un = LO.filter(l => locOpen(l.id) && l.c.some(c => !S.inv.includes(c[0]) && cAv(c[0])));
    if (un.length) {
      const l = un.find(l => l.id === S.loc) || un[0]; S.loc = l.id; go('locations');
      const id = l.c.map(c => c[0]).find(i => !S.inv.includes(i) && cAv(i));
      if (IXM[id] && IXM[id].col) mgOpen(id, 'col'); else grab(id);
      return fim('coletou ' + id);
    }
  }
  if (x.tab === 'lab') {
    go('lab');
    const pa = toAn().filter(i => !(S.lb || {})[i]);
    if (pa.length) { analyze(pa[0]); return fim('enviou à perícia ' + pa[0]); }
    if (S.inv.includes(C.lock.id) && !S.dec) {
      S.f.lab = 'all'; render(); const i = document.querySelector('#pn');
      if (!i) return fim('campo da senha não apareceu', 300);
      i.value = C.lock.pin; unlock(); return fim('destravou ' + C.lock.id);
    }
  }
  if (x.tab === 'interrogate') {
    const nq = s => s.q.filter(q => !S.asked.includes(q[0]) && (!q[2] || S.an.includes(q[2])));
    const sq = SU.find(s => nq(s).length && s.id === S.su) || SU.find(s => nq(s).length);
    if (sq) { S.su = sq.id; CHPRE = 1; go('interrogate'); const id = nq(sq)[0][0]; ask(id); return fim('perguntou ' + id, 1200); }
    const ca = ctAvail()[0];
    if (ca) { go('interrogate'); tryCt(ca[0], ca[1]); return fim('contradisse ' + ca[0] + ' com ' + ca[1]); }
  }
  if (x.tab === 'mindmap') {
    const k = pend()[0];
    if (k) { go('mindmap'); S.sel = k.split('|'); link(); return fim('deduziu ' + k); }
  }
  if (x.tab === 'solve') {
    go('solve');
    const tem = (L, v) => (L || []).some(o => o[0] === v);
    if (!tem(C.wp, C.sol[1])) return fim('erro de dados', 0, 'o meio certo (' + C.sol[1] + ') não está entre as opções');
    if (!tem(C.mo, C.sol[2])) return fim('erro de dados', 0, 'a motivação certa (' + C.sol[2] + ') não está entre as opções');
    if (C.two) S.accs = [C.sol[0], C.sol2]; else S.acc = C.sol[0];
    S.wp = C.sol[1]; S.mo = C.sol[2]; if (C.vic) S.vic = C.sol[3];
    (C.xq || []).forEach(q => { S['x_' + q[0]] = q[3]; });
    save(); render(); accuse(); return fim('pediu o mandado', 600);
  }
  /* nada a fazer além de esperar o laboratório */
  if (lbWt().length) {
    const t = x.t.replace(/\s*\(.*\)$/, '');
    return /laudo/i.test(t) ? fim('aguardando laudo', 15000) : fim('guia não avisa da espera', 15000, 'diz "' + t + ': ' + x.d + '" enquanto a única coisa a fazer é esperar ' + lbWt().length + ' laudo(s)');
  }
  return fim('guia sem saída', 0, x.t + ' → ' + x.tab);
}

/* Assinatura do progresso: se não muda por muitos passos, o caso travou. */
function assinatura() {
  if (MENU || !C) return 'menu';
  return [S.seen, S.lv, S.inv.length, Object.keys(S.lb || {}).length, S.an.length, S.asked.length, S.ded.length, (S.ct || []).length, (S.lo || []).length, S.dec, (S.cdv || []).length, (S.mq || []).length, S.won, SU.length, V ? 1 : 0, CUT ? 1 : 0].join(',');
}

/* Abre todas as telas liberadas do caso, para pegar erro de desenho. */
function visitarTelas() {
  const abertas = [];
  /* em dupla, só as telas do papel de quem está com o celular (e as que são dos dois) */
  const duo = window.DUO && DUO.on ? duoAct() : null, meu = t => { if (!duo) return true; const g = duoGate(duo, t); return g < 0 || g === duoHolderRole(duo, duoSes(duo)); };
  APPTABS.filter(t => tabOpen(t) && meu(t)).forEach(t => { go(t); abertas.push(t); });
  if (meu('caderno')) CDT.forEach(t => { S.f.cd = t[0]; go('caderno'); S.f.cd = t[0]; render(); abertas.push('caderno/' + t[0]); });
  if (meu('interrogate')) SU.forEach(s => { if (tabOpen('interrogate')) { S.su = s.id; CHPRE = 1; go('interrogate'); } });
  S.tab = 'phone'; save(); render();
  return abertas;
}

function estado() {
  if (MENU || !C) return 'no menu';
  const x = nxt();
  if (window.DEPURAR) console.log(JSON.stringify({ rd: rdState(), locais: LO.map(l => [l.id, isLo(l.id) ? 'aberto' : 'fechado', 'pergunta-chave ' + (LOCT[l.id] || '-') + (S.asked.includes(LOCT[l.id]) ? ' feita' : ' não feita'), l.c.map(c => c[0] + (S.inv.includes(c[0]) ? '' : cAv(c[0]) ? ' (não coletada)' : ' (depende de ' + CL[c[0]].req + ')'))]), faltam: SU.flatMap(s => s.q.filter(q => !S.asked.includes(q[0])).map(q => q[0] + (q[2] ? ' precisa do laudo ' + q[2] : ''))), semLaudo: S.inv.filter(i => !S.an.includes(i)), trava: C.lock.id + (S.dec ? ' aberta' : ' fechada'), lig: Object.keys(EV).filter(i => !S.asked.includes(i)), tick: S.tick }));
  return `guia: "${x.t}" (${x.tab}) · provas ${S.inv.length} · laudos ${S.an.length} · perguntas ${S.asked.length}/${TOTAL_Q} · deduções ${S.ded.length}/${C.thr} · cenários ${(S.lo || []).length}/${LO.length} · suspeitos ${SU.length}`;
}

/* ---------- roteiro do teste ---------- */

async function jogarCaso(page, caso, erros) {
  const linhas = [];
  const info = await page.evaluate(({ id, parceiro }) => {
    const i = CASES.findIndex(c => c.id === id);
    const aberto = i === 0 || !!META.done[CASES[i - 1].id];
    if (!MENU) toMenu();
    ptmStart(id, 1);
    if (window.MXQ) ptmQ(parceiro && typeof PTD !== 'undefined' ? Object.keys(PTD)[0] : 'none');
    return { aberto, n: C && C.n, ok: !!C && C.id === id && !MENU };
  }, { id: caso, parceiro: PARCEIRO });
  if (!info.ok) return { ok: false, motivo: 'o caso não abriu a partir do menu', linhas };
  if (!info.aberto) return { ok: false, motivo: 'o caso anterior não ficou marcado como concluído, então este estaria trancado no menu', linhas };

  let parado = 0, ant = '', telas = 0;
  const avisos = new Set();
  for (let n = 0; n < MAX_PASSOS; n++) {
    const p = await page.evaluate(passo);
    linhas.push(p.a + (p.x ? ' (' + p.x + ')' : ''));
    if (p.a === 'guia aponta para tela trancada' || p.a === 'guia não avisa da espera') avisos.add('o guia ' + p.x.replace(/esperar \d+ laudo\(s\)/, 'esperar o laboratório'));
    if (erros.length) return { ok: false, motivo: 'erro de JavaScript depois de "' + p.a + '": ' + erros[0], linhas, nome: info.n };
    if (p.a === 'venceu') {
      const f = await page.evaluate(() => { const r = { won: S.won, done: META.done[C.id], nota: META.rk && META.rk[C.id], ded: S.ded.length, tot: NT, perg: S.asked.filter(q => TS[q]).length, totq: TOTAL_Q }; FIN = 1; render(); FIN = 0; if (window.DUO && DUO.on) { DUO.sb = 1; duoTick(); r.placar = !!document.getElementById('duoov'); DUO.sb = 0; duoTick(); } V = null; toMenu(); return r; });
      if (erros.length) return { ok: false, motivo: 'erro de JavaScript na tela final: ' + erros[0], linhas, nome: info.n };
      if (!f.won || !f.done) return { ok: false, motivo: 'o mandado saiu mas o caso não ficou marcado como concluído', linhas, nome: info.n };
      if (f.placar === false) return { ok: false, motivo: 'o placar da dupla não abriu no fim do caso', linhas, nome: info.n };
      return { ok: true, passos: n, telas, nome: info.n, f, avisos: [...avisos] };
    }
    if (['mandado negado', 'erro de dados', 'guia sem saída', 'menu'].includes(p.a))
      return { ok: false, motivo: p.a + (p.x ? ': ' + p.x : ''), linhas, nome: info.n, estado: await page.evaluate(estado) };
    if (p.w) { try { await page.clock.runFor(p.w); } catch (e) { erros.push(String(e.message || e).split('\n').slice(0, 2).join(' | ')); } }
    if (p.a === 'pediu o mandado' || /^deduziu|^coletou/.test(p.a)) {
      /* de tempos em tempos, abre todas as telas liberadas */
      if (p.a === 'pediu o mandado' || n % 12 === 0) { telas += (await page.evaluate(visitarTelas)).length; }
      if (erros.length) return { ok: false, motivo: 'erro de JavaScript ao abrir as telas: ' + erros[0], linhas, nome: info.n };
    }
    const s = await page.evaluate(assinatura);
    parado = s === ant ? parado + 1 : 0; ant = s;
    if (parado >= MAX_PARADO) return { ok: false, motivo: 'o caso parou de avançar', linhas, nome: info.n, estado: await page.evaluate(estado) };
  }
  return { ok: false, motivo: 'passou de ' + MAX_PASSOS + ' passos sem terminar', linhas, nome: info.n, estado: await page.evaluate(estado) };
}

const { srv, faltando, url } = await servidor();
const browser = await abrirNavegador();
const ctx = await novoContexto(browser, url);
const page = await ctx.newPage();
const erros = [];
ouvirErros(page, erros);
await page.clock.install();
await page.addInitScript(m => { if (!localStorage.getItem('sisp-meta')) localStorage.setItem('sisp-meta', m); }, META_INICIAL);
/* ?teste=0: joga como o jogador final, com os casos abrindo um depois do outro */
await page.goto(url + '?teste=0');
if (process.env.DEPURAR) await page.evaluate(() => { window.DEPURAR = 1; });
await page.clock.runFor(1500);

let falhou = 0;
const avisos = {};
const inicio = await page.evaluate(() => { ONS = null; render(); return { teste: TESTE, casos: CASES.map(c => c.id), naTela: /\bteste\b/i.test(document.body.innerText) }; });
if (erros.length) { console.log('✗ erro ao abrir o jogo: ' + erros[0]); falhou++; }
if (inicio.teste) { console.log('✗ ?teste=0 não desligou o modo teste'); falhou++; }
if (inicio.naTela) { console.log('✗ a palavra "teste" aparece na tela inicial'); falhou++; }

const lista = SO.length ? inicio.casos.filter(c => SO.includes(c)) : inicio.casos;

async function rodada(titulo, sufixo) {
  console.log('\n' + titulo);
  for (const caso of lista) {
    if (SO.length) await page.evaluate(id => { const i = CASES.findIndex(c => c.id === id); if (i > 0) META.done[CASES[i - 1].id] = META.done[CASES[i - 1].id] || 'Investigador'; }, caso);
    const r = await jogarCaso(page, caso, erros);
    if (r.ok) {
      console.log(`✓ ${caso} ${r.nome}: resolvido em ${r.passos} passos · ${r.f.ded}/${r.f.tot} deduções · ${r.f.perg}/${r.f.totq} perguntas · nota ${r.f.nota} · ${r.telas} telas abertas sem erro`);
      if (r.f.perg > r.f.totq) r.avisos.push(`a tela final mostra "${r.f.perg}/${r.f.totq} falas": o total de falas do caso está contado a menos`);
      else if (r.f.ded > r.f.tot) r.avisos.push(`a tela final teria mais deduções feitas (${r.f.ded}) que o total (${r.f.tot})`);
      r.avisos.forEach(a => { (avisos[a] = avisos[a] || []).push(caso + sufixo); });
    }
    else {
      falhou++;
      console.log(`✗ ${caso} ${r.nome || ''}: ${r.motivo}`);
      if (r.estado) console.log('  onde parou → ' + r.estado);
      console.log('  últimos passos → ' + r.linhas.slice(-12).join(' › '));
      erros.length = 0;
      if (!SO.length) { console.log('  (os casos seguintes dependem deste e não foram jogados)'); break; }
    }
  }
}

if (!falhou) await rodada('Casos principais, sozinho' + (PARCEIRO ? ' (com parceiro)' : ''), '');

if (!falhou) {
  /* liga o modo dupla do jeito que a tela faz: nomes dos dois jogadores e "Começar" */
  const dupla = await page.evaluate(() => { if (!MENU) toMenu(); duoEdit(); DUO.setup.j[0].n = 'Ana'; DUO.setup.j[1].n = 'Bia'; duoSave(); return { on: DUO.on, feitos: Object.keys(META.done).length }; });
  if (!dupla.on) { console.log('✗ o modo dupla não ligou'); falhou++; }
  else if (dupla.feitos) { console.log('✗ o progresso da dupla não começou separado do jogo solo'); falhou++; }
  else {
    await rodada('Casos principais, em dupla (um celular)', ' em dupla');
    const volta = await page.evaluate(() => { if (!MENU) toMenu(); duoPick(0); return { on: DUO.on, feitos: Object.keys(META.done).length }; });
    if (volta.on || volta.feitos < lista.length) { console.log('✗ ao voltar para "Sozinho", o progresso solo não reapareceu'); falhou++; }
  }
}

const sumidos = arquivosFaltando(faltando);
if (sumidos.length) { falhou++; console.log('✗ arquivos pedidos pelo jogo que não existem no repositório:\n  ' + sumidos.join('\n  ')); }

await browser.close(); srv.close();
const nAvisos = Object.keys(avisos).length;
if (nAvisos) { console.log('\nAvisos (não impedem o jogo, mas valem uma olhada):'); Object.entries(avisos).forEach(([a, cs]) => console.log(`  • ${a} [${cs.join(', ')}]`)); }
console.log(falhou ? `\n${falhou} problema(s) encontrado(s).` : '\nTudo certo: todos os casos têm solução, sozinho e em dupla, e nenhuma tela deu erro.');
process.exit(falhou ? 1 : 0);
