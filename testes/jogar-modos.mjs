/* Joga os outros modos do começo ao fim, num navegador sem tela:

   1. Casos rápidos       sozinho e em dupla (um celular)
   2. Linha do tempo      sozinho e em dupla (um celular)
   3. Dois celulares      duas abas na mesma sala, cada uma com um jogador

   Como no teste dos casos principais, o robô usa as mesmas funções que os
   botões chamam. Além de jogar, ele confere os dados de cada história:
   - caso rápido: todas as provas aparecem, a contradição é aceita, a acusação
     errada é recusada e a certa encerra o caso;
   - linha do tempo: os horários estão em ordem, as pistas verdadeiras fixam uma
     única ordem, a ordem errada é recusada e o relato falso é aceito;
   - dois celulares: cada senha, código ou resposta só é usada depois que a
     prova que a revela está na mão de alguém; todas as contradições são
     aceitas e o voto certo dos dois encerra o caso.

   O modo em dois celulares roda com a rede de teste do próprio jogo
   (window.NETMOCK), que troca o Firebase pelo armazenamento do navegador.
   A conexão real com o Firebase não é testada aqui.

   Uso:  node jogar-modos.mjs
         PARCEIRO=1 node jogar-modos.mjs    casos rápidos com parceiro */
import { servidor, abrirNavegador, novoContexto, ouvirErros, META_INICIAL, arquivosFaltando } from './base.mjs';

const PARCEIRO = !!process.env.PARCEIRO;

/* ---------- funções que rodam dentro da página ---------- */

function jogarRapido({ id, parceiro }) {
  const c = rqC(id), prob = [], feito = [];
  const duoOn = () => window.DUO && DUO.on;
  /* em dupla, a função pede o celular quando a área é do outro papel: passa e repete */
  const troca = fn => { fn(); if (duoOn() && DUO.swap) { feito.push('passou o celular'); duoGo('swap'); fn(); } };
  const conf = () => { if (duoOn() && DUO.conf) { feito.push('acusação em conjunto'); duoConf(1); duoConf(2); } };
  const pop = () => { let n = 0; while (RQ.pp && n++ < 10) { ptPop(1); ptAns('confiar'); if (RQ.rx) ptRxClose(); feito.push('palpite do parceiro'); } };
  rqOpen(id);
  if (RQ.cho) { if (parceiro) ptSet(PTD[0].id); else ptNone(); }
  if (RQ.rx) ptRxClose();
  if (RQ.v === 'intro') rqStart();
  if (RQ.how) rqHow(0);
  if (RQ.res) { RQ.res = 0; render(); }
  if (duoOn()) { duoTick(); const a = duoAct(); if (!a) prob.push('em dupla, o caso rápido não entrou como atividade da dupla'); else if (!DUO.shown[a.key]) duoRoll('keep'); }
  pop();
  /* interrogatório completo */
  c.suspeitos.forEach(s => {
    troca(() => rqTab('su')); rqSuP(s.id);
    (c.interrogatorio[s.id] || []).forEach((q, i) => { rqAsk(s.id, i); pop(); });
  });
  if (RQ.asked.length !== c.suspeitos.reduce((n, s) => n + (c.interrogatorio[s.id] || []).length, 0)) prob.push('nem todas as perguntas foram registradas');
  /* provas */
  troca(() => rqTab('pr'));
  const vis = rqProvas(c);
  c.provas.filter(p => !vis.includes(p)).forEach(p => prob.push('a prova "' + p.nome + '" nunca aparece, mesmo depois de todas as perguntas (regra: ' + p.disponivel + ')'));
  vis.forEach(p => { rqPv(p.id); rqPv(null); });
  rqHs(1); rqHs(0); rqRc(1); rqRc(0);
  /* contradição */
  troca(() => rqTab('ac'));
  const k = c.contradicao, ia = (c.interrogatorio[k.suspeito] || []).findIndex(q => q.registra_afirmacao === k.afirmacao);
  if (ia < 0) prob.push('a fala da contradição (' + k.afirmacao + ') não existe no interrogatório de ' + k.suspeito);
  else {
    const outra = vis.find(p => p.id !== k.prova);
    if (outra) { rqSel('s', k.suspeito); rqSel('a', ia); rqSel('p', outra.id); rqCheck(); if (RQ.ct) prob.push('uma prova errada ("' + outra.nome + '") foi aceita como contradição'); }
    rqSel('s', k.suspeito); rqSel('a', ia); rqSel('p', k.prova); rqCheck();
    if (!RQ.ct) prob.push('a contradição certa não foi aceita');
  }
  /* acusação errada, depois a certa */
  if (RQ.ct) {
    const errado = c.suspeitos.find(s => s.id !== c.solucao.culpado);
    rqPick(errado.id); rqAcc(); conf();
    if (!RQ.fin || RQ.fin.ok) prob.push('acusar a pessoa errada (' + errado.nome + ') não mostrou a tela de erro');
    if (RQ.fin) rqRetry();
    rqPick(c.solucao.culpado); rqAcc(); conf();
    if (!RQ.fin || !RQ.fin.ok) prob.push('acusar o culpado não encerrou o caso');
    else if (!RQM().done[id]) prob.push('o caso encerrou mas não ficou marcado como concluído');
  }
  const estrelas = RQM().done[id] || 0;
  if (duoOn() && RQ.fin && RQ.fin.ok) { DUO.sb = 1; duoTick(); if (!document.getElementById('duoov')) prob.push('o placar da dupla não abriu'); DUO.sb = 0; duoTick(); }
  rqExit();
  return { nome: c.titulo, prob, estrelas, feito: [...new Set(feito)] };
}

function jogarLinha({ id }) {
  const c = tlCase(id), prob = [], feito = [], n = c.fatos.length;
  const duoOn = () => window.DUO && DUO.on;
  const troca = fn => { fn(); if (duoOn() && DUO.swap) { feito.push('passou o celular'); duoGo('swap'); fn(); } };
  /* dados: horários em ordem e pistas verdadeiras que fixam uma única ordem */
  const min = h => { const m = /(\d{1,2})\D+(\d{2})?/.exec(String(h)); return m ? +m[1] * 60 + (+m[2] || 0) : NaN; };
  const hs = c.fatos.map(f => min(f.hora));
  if (hs.some(isNaN)) prob.push('há fato sem horário legível');
  else if (hs.some((h, i) => i && h < hs[i - 1]) && !hs.some((h, i) => i && h < hs[i - 1] - 600)) prob.push('os horários dos fatos não estão em ordem crescente');
  const pos = fid => c.fatos.findIndex(f => f.id === fid), elo = new Set();
  c.fatos.forEach(f => (f.pistas || []).forEach(([a, b]) => {
    if (pos(a) < 0 || pos(b) < 0) { prob.push('a pista de "' + f.fonte.nome + '" cita um fato que não existe'); return; }
    if (f.falso) return;
    if (pos(a) >= pos(b)) prob.push('a pista de "' + f.fonte.nome + '" diz que "' + c.fatos[pos(a)].titulo + '" veio antes de "' + c.fatos[pos(b)].titulo + '", mas a ordem real é a contrária');
    elo.add(pos(a) + '>' + pos(b));
  }));
  for (let i = 0; i + 1 < n; i++) if (!elo.has(i + '>' + (i + 1))) prob.push('nenhuma pista verdadeira liga "' + c.fatos[i].titulo + '" a "' + c.fatos[i + 1].titulo + '": a ordem desses dois não pode ser deduzida');
  const kf = c.fatos.find(f => f.id === c.contradicao.fato);
  if (!kf) prob.push('o fato da contradição não existe');
  else if (kf.fonte.tipo !== 'depoimento') prob.push('o relato falso não é um depoimento, então o jogador não tem como marcá-lo');

  tlOpen(id);
  if (TM.v === 'intro') tlStart();
  if (TM.how) tlHow(0);
  if (TM.res) { TM.res = 0; render(); }
  if (duoOn()) { duoTick(); const a = duoAct(); if (!a) prob.push('em dupla, a linha do tempo não entrou como atividade da dupla'); else if (!DUO.shown[a.key]) duoRoll('keep'); }
  c.fatos.forEach((f, i) => { troca(() => tlSrcOpen(i)); tlSrcOpen(null); });
  if ((TM.read || []).length !== n) prob.push('nem todas as fontes ficaram marcadas como lidas');
  troca(() => tlPl(1)); tlPl(0); tlRc(1); tlRc(0);
  /* ordem errada é recusada */
  if (TM.order.every((v, i) => v === i)) troca(() => tlMove(0, 1));
  troca(() => tlCheck());
  if (TM.fin || TM.ordok) prob.push('uma ordem errada foi aceita');
  /* arruma com as setas, um fato de cada vez */
  for (let alvo = 0; alvo < n; alvo++) { let cur = TM.order.indexOf(alvo); while (cur > alvo) { const p = cur; troca(() => tlMove(p, -1)); cur--; } }
  if (!TM.order.every((v, i) => v === i)) prob.push('as setas não conseguiram colocar os fatos em ordem');
  troca(() => tlCheck());
  if (!TM.ordok) prob.push('a ordem certa não foi aceita');
  if (TM.fin) prob.push('o caso encerrou sem marcar o relato falso');
  /* relato errado é recusado, o certo encerra */
  const outro = c.fatos.find(f => f.fonte.tipo === 'depoimento' && f.id !== c.contradicao.fato);
  if (outro && !TM.fin) { troca(() => tlFlag(outro.id)); troca(() => tlCheck()); if (TM.fin) prob.push('um depoimento verdadeiro ("' + outro.fonte.nome + '") foi aceito como relato falso'); }
  if (!TM.fin) { troca(() => tlFlag(c.contradicao.fato)); troca(() => tlCheck()); }
  if (!TM.fin) prob.push('marcar o relato falso não encerrou o caso');
  else if (!TLM().done[id]) prob.push('o caso encerrou mas não ficou marcado como concluído');
  const estrelas = TLM().done[id] || 0;
  if (duoOn() && TM.fin) { DUO.sb = 1; duoTick(); if (!document.getElementById('duoov')) prob.push('o placar da dupla não abriu'); DUO.sb = 0; duoTick(); }
  tlExit();
  return { nome: c.titulo, prob, estrelas, feito: [...new Set(feito)] };
}

/* Dois celulares: uma rodada de jogadas de um dos jogadores. */
function dcRodada() {
  const c = DC.cs, w = dcRole(), feito = [];
  let st = dcState();
  if (!c || !st) return { feito, erro: 'sem caso aberto' };
  if (st.fim) return { feito, fim: st.fim };
  const ac = c.acusacao || {};
  /* a prova que revela uma senha/código/resposta já está com alguém? */
  const temFonte = v => { const m = /^prova:(.+)$/.exec(v || ''); if (!m) return true; return ['A', 'B'].some(x => dcVisible(c, dcState(), x).some(p => p.id === m[1] && !dcLocked(c, dcState(), p))); };
  /* responde às propostas do parceiro */
  st.props.filter(p => p.st === 'pend' && p.by !== w).forEach(p => { dcResp(p.id, 1); feito.push('respondeu a uma proposta'); });
  /* lê as provas */
  st = dcState(); dcVisible(c, st, w).forEach(p => { if (!st.seen[w][p.id]) { dcOpenP(p.id); DC.pv = null; feito.push('leu ' + p.id); } });
  /* travas */
  st = dcState(); dcVisible(c, st, w).filter(p => dcLocked(c, st, p)).forEach(p => {
    const t = p.trava;
    if (t.tipo === 'senha' && dcOwns(p.dono, w) && temFonte(t.vem_de)) { const ok = dcSenha(p.id, t.resposta || (t.aceita || [])[0] || ''); feito.push((ok ? 'abriu ' : 'ERRO senha recusada em ') + p.id); }
    if (t.tipo === 'codigo_dividido') { const par = t['parte_' + w], cd = dcState().codes[p.id] || {}; if (par && !cd[w] && temFonte(par.vem_de)) { const ok = dcCod(p.id, par.valor); feito.push((ok ? 'digitou a sua parte do código de ' : 'ERRO parte do código recusada em ') + p.id); } }
  });
  /* perguntas */
  st = dcState(); dcMine(c, st, w).forEach(s => (c.interrogatorio[s.id] || []).forEach(q => {
    const k = s.id + '|' + q.id; let z = dcState();
    if (z.asked[k]) return;
    if (q.requer_fato && !z.facts[q.requer_fato.id]) {
      const f = (c.fatos || []).find(x => x.id === q.requer_fato.id);
      if (!temFonte(f && f.aparece_em)) return;
      const ok = dcFato(s.id, q.id, (q.requer_fato.aceita || [])[0] || '');
      feito.push((ok ? 'respondeu ao pedido de ' : 'ERRO resposta recusada por ') + s.id);
      if (!ok) return;
    }
    dcAsk(s.id, q.id); if (dcState().asked[k]) feito.push('perguntou ' + k);
  }));
  /* envia para o parceiro as suas provas e falas registradas */
  st = dcState(); dcVisible(c, st, w).filter(p => p.dono === w && !dcLocked(c, st, p) && !st.sent['p:' + p.id]).forEach(p => { dcSend('p', p.id, 0); feito.push('enviou ' + p.id); });
  st = dcState(); dcAllQ(c).filter(o => o.q.registra_afirmacao && st.asked[o.k] === w && !st.sent['f:' + o.k]).forEach(o => { dcSend('f', o.k, 0); feito.push('enviou a fala ' + o.k); });
  /* contradições */
  (c.contradicoes || []).forEach(k => {
    const z = dcState(); if (z.cts[k.id] || z.props.some(p => p.st === 'pend')) return;
    const fs = dcFalas(c, z, w), f = fs.find(x => x.s.id === k.suspeito && x.a === k.afirmacao); if (!f) return;
    if (k.tipo === 'fala_dupla') { if (!fs.find(x => x.s.id === k.suspeito_b && x.a === k.afirmacao_b)) return; dcPropose(k.suspeito, k.afirmacao, '', k.suspeito_b, k.afirmacao_b); }
    else { const p = dcVisible(c, z, w).find(x => x.id === k.prova); if (!p || dcLocked(c, z, p)) return; dcPropose(k.suspeito, k.afirmacao, k.prova); }
    feito.push('propôs a contradição ' + k.id);
  });
  /* voto */
  st = dcState();
  if (Object.keys(st.cts).length >= (c.contradicoes || []).length && !st.votes[w] && !st.props.some(p => p.st === 'pend')) {
    if (dcStage(c, st, w).n !== 5) return { feito, erro: 'todas as contradições foram achadas, mas o guia ainda não libera a acusação (' + dcStage(c, st, w).t + ')' };
    dcVote(ac.culpado, (ac.perguntas_finais || []).map(q => q.correta)); feito.push('votou');
  }
  /* abre todas as telas do jogador */
  ['su', 'pr', 'ms', 'v', 'cv'].forEach(t => { DC.tab = t; render(); });
  DC.tab = 'su';
  return { feito };
}

function dcFalta() {
  const c = DC.cs, st = dcState(), w = dcRole();
  return {
    quem: w,
    guia: dcStage(c, st, w).t,
    perguntas: dcAllQ(c).filter(o => !st.asked[o.k]).map(o => o.k),
    trancadas: dcPs(c).filter(p => p.trava && p.trava.tipo !== 'parcial' && !st.open[p.id]).map(p => p.id),
    semAparecer: dcPs(c).filter(p => !dcProofOpen(c, st, p) && !st.sent['p:' + p.id]).map(p => p.id),
    contradicoes: (c.contradicoes || []).filter(k => !st.cts[k.id]).map(k => k.id),
  };
}

/* ---------- roteiro ---------- */

const { srv, faltando, url } = await servidor();
const browser = await abrirNavegador();
let falhou = 0;
const relata = (ok, txt, prob) => { if (ok) console.log('✓ ' + txt); else { falhou++; console.log('✗ ' + txt); (prob || []).forEach(p => console.log('    - ' + p)); } };

/* 1 e 2: casos rápidos e linha do tempo, sozinho e em dupla */
{
  const ctx = await novoContexto(browser, url), page = await ctx.newPage(), erros = [];
  ouvirErros(page, erros);
  await page.clock.install();
  await page.addInitScript(m => { if (!localStorage.getItem('sisp-meta')) localStorage.setItem('sisp-meta', m); }, META_INICIAL);
  await page.goto(url + '?teste=0');
  await page.clock.runFor(1500);
  const ids = await page.evaluate(() => { ONS = null; ARQ = 1; RQT = 1; render(); RQT = 2; render(); RQT = 0; return { rq: RQC.map(c => c.id), tl: TLC.map(c => c.id) }; });

  const rodada = async (fn, lista, extra, rotulo) => {
    for (const id of lista) {
      let r;
      try { r = await page.evaluate(fn, Object.assign({ id }, extra)); await page.clock.runFor(800); }
      catch (e) { r = { nome: id, prob: ['erro de JavaScript: ' + String(e.message || e).split('\n')[0]], estrelas: 0, feito: [] }; await page.evaluate(() => { try { RQ = null; TM = null; render(); } catch (e) {} }); }
      if (erros.length) { r.prob.push('erro de JavaScript: ' + erros[0]); erros.length = 0; }
      relata(!r.prob.length, `${id} ${r.nome}${rotulo}: ${r.prob.length ? 'com problema' : 'resolvido com ' + r.estrelas + ' estrela(s)' + (r.feito.length ? ' · ' + r.feito.join(', ') : '')}`, r.prob);
    }
  };
  console.log('\nCasos rápidos, sozinho' + (PARCEIRO ? ' (com parceiro)' : ''));
  await rodada(jogarRapido, ids.rq, { parceiro: PARCEIRO }, '');
  console.log('\nLinha do tempo, sozinho');
  await rodada(jogarLinha, ids.tl, {}, '');

  const dupla = await page.evaluate(() => { duoEdit(); DUO.setup.j[0].n = 'Ana'; DUO.setup.j[1].n = 'Bia'; duoSave(); return { on: DUO.on, rq: Object.keys(META.rq.done).length, tl: Object.keys(META.tl.done).length }; });
  relata(dupla.on && !dupla.rq && !dupla.tl, 'modo dupla ligado, com progresso separado do jogo solo', []);
  if (dupla.on) {
    console.log('\nCasos rápidos, em dupla (um celular)');
    await rodada(jogarRapido, ids.rq, { parceiro: false }, '');
    console.log('\nLinha do tempo, em dupla (um celular)');
    await rodada(jogarLinha, ids.tl, {}, '');
    const volta = await page.evaluate(() => { duoPick(0); return { on: DUO.on, rq: Object.keys(META.rq.done).length, tl: Object.keys(META.tl.done).length }; });
    relata(!volta.on && volta.rq === ids.rq.length && volta.tl === ids.tl.length, 'de volta a "Sozinho", o progresso solo reapareceu', []);
  }
  await ctx.close();
}

/* 3: dois celulares (duas abas na mesma sala, com a rede de teste do jogo) */
{
  console.log('\nDois celulares');
  const ctx = await novoContexto(browser, url), erros = [];
  await ctx.addInitScript(m => { window.NETMOCK = true; if (!localStorage.getItem('sisp-meta')) localStorage.setItem('sisp-meta', m); }, META_INICIAL);
  const A = await ctx.newPage(), B = await ctx.newPage();
  ouvirErros(A, erros, 'celular 1'); ouvirErros(B, erros, 'celular 2');
  for (const p of [A, B]) { await p.goto(url + '?teste=0'); await p.waitForTimeout(400); await p.evaluate(() => { ONS = null; render(); }); }
  const espera = async (p, fn, arg, ms = 5000) => { try { await p.waitForFunction(fn, arg, { timeout: ms, polling: 50 }); return true; } catch (e) { return false; } };

  const cod = await A.evaluate(async () => { DC.myName = 'Ana'; await dcCreate(); return DC.cod; });
  const entrou = await B.evaluate(async cod => { DC.myName = 'Bia'; DC.st = 'join'; dcMod(); const i = document.getElementById('dcc'); if (!i) return 'o campo do código não apareceu'; i.value = cod; await dcJoin(); return DC.on ? '' : (DC.err || 'não entrou'); }, cod);
  const juntos = cod && !entrou && await espera(A, () => DC.names[0] && DC.names[1]) && await espera(B, () => DC.names[0] && DC.names[1]);
  relata(!!juntos, `sala criada (${cod || 'sem código'}) e segundo celular conectado`, [entrou || 'os dois celulares não se enxergaram na sala'].filter(() => !juntos));

  const casos = juntos ? await A.evaluate(() => DCC.map(c => ({ id: c.id, nome: c.titulo }))) : [];
  for (const caso of casos) {
    const prob = [];
    await A.evaluate(id => dcStart(id), caso.id);
    if (!await espera(B, id => DC.joinK === id || (DC.cs && DC.cs.id === id), caso.id)) prob.push('o segundo celular não recebeu o caso escolhido');
    else {
      await B.evaluate(() => dcEnter());
      for (const p of [A, B]) await p.evaluate(() => { DC.v = 'main'; render(); });
      let fim = null, parado = 0, n = 0;
      const jogadas = { A: 0, B: 0 };
      while (!fim && parado < 6 && n++ < 200) {
        let fez = 0;
        for (const p of [A, B]) {
          const r = await p.evaluate(dcRodada);
          if (r.erro) prob.push(r.erro);
          r.feito.filter(x => /^ERRO/.test(x)).forEach(x => prob.push(x.replace(/^ERRO /, '')));
          fez += r.feito.length; if (r.fim) fim = r.fim;
          await p.waitForTimeout(120); /* tempo para o outro celular receber */
        }
        parado = fez ? 0 : parado + 1;
        if (prob.length || erros.length) break;
      }
      if (erros.length) { prob.push('erro de JavaScript: ' + erros[0]); erros.length = 0; }
      if (!prob.length && !fim) { const f = await A.evaluate(dcFalta); prob.push('o caso parou de avançar. Guia: "' + f.guia + '". Perguntas sem fazer: ' + (f.perguntas.join(', ') || 'nenhuma') + '. Provas trancadas: ' + (f.trancadas.join(', ') || 'nenhuma') + '. Provas que não apareceram: ' + (f.semAparecer.join(', ') || 'nenhuma') + '. Contradições sem achar: ' + (f.contradicoes.join(', ') || 'nenhuma')); }
      else if (!prob.length && !fim.ok) prob.push('o voto certo dos dois não foi aceito');
      else if (!prob.length) {
        /* os dois celulares precisam chegar ao mesmo fim, e a tela final precisa desenhar */
        for (const p of [A, B]) { if (!await espera(p, () => { const s = dcState(); return !!(s && s.fim && s.fim.ok); })) prob.push('um dos celulares não chegou à tela final'); await p.evaluate(() => render()); }
        const st = await A.evaluate(() => { const s = dcState(); return { estrelas: dcStars(s), erros: s.errs, a: s.cnt.A, b: s.cnt.B }; });
        if (erros.length) { prob.push('erro de JavaScript na tela final: ' + erros[0]); erros.length = 0; }
        if (!prob.length) { relata(true, `${caso.id} ${caso.nome}: resolvido pelos dois, ${st.estrelas} estrela(s) · jogador A ${st.a.ask} perguntas e ${st.a.send} envios · jogador B ${st.b.ask} perguntas e ${st.b.send} envios`); }
      }
    }
    if (prob.length) relata(false, `${caso.id} ${caso.nome}: com problema`, [...new Set(prob)]);
    for (const p of [A, B]) await p.evaluate(() => { try { dcBack(); } catch (e) {} });
  }
  await ctx.close();
}

const sumidos = arquivosFaltando(faltando);
if (sumidos.length) { falhou++; console.log('✗ arquivos pedidos pelo jogo que não existem no repositório:\n  ' + sumidos.join('\n  ')); }
await browser.close(); srv.close();
console.log(falhou ? `\n${falhou} problema(s) encontrado(s).` : '\nTudo certo: casos rápidos, linha do tempo, dupla e dois celulares foram jogados até o fim sem erro.');
process.exit(falhou ? 1 : 0);
