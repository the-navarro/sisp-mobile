import { esc, norm, pcolor, pOf } from '../util.js';

const MAX = 10;

export default {
  defaults: { words: {}, hist: {} },
  id: 'mind', name: 'Sincronia Mental', emoji: '🔮', mode: 'coop', color: 'var(--violet)',
  tagline: 'Pensem na mesma palavra… sem conversar!',
  how: 'Os dois escrevem uma palavra ao mesmo tempo. Se forem diferentes, a próxima rodada pede uma palavra que fique "no meio" das duas anteriores. Em quantas rodadas vocês se sincronizam? (Vale combinar de não falar.)',
  init() { return { round: 1, phase: 'write', words: {}, hist: {} }; },
  reduce(s, a, api) {
    const ids = api.players.map((p) => p.uid);
    if (a.t === 'word') {
      const w = String(a.word || '').trim().slice(0, 24);
      if (s.phase !== 'write' || a.round !== s.round || !w || s.words[a.from]) return false;
      s.words[a.from] = w;
      if (ids.every((id) => s.words[id])) {
        s.phase = 'reveal';
        const [x, y] = ids;
        s.hist[s.round - 1] = { a: s.words[x], b: s.words[y] };
        if (norm(s.words[x]) === norm(s.words[y])) {
          s.matched = true; s.over = true; s.coop = true; s.win = true; s.overDelay = 4200;
          s.title = '🔮 Mentes sincronizadas!';
          s.sub = `Vocês pensaram igual em ${s.round} ${s.round === 1 ? 'rodada' : 'rodadas'}: “${s.words[x]}”`;
        } else if (s.round >= MAX) {
          s.over = true; s.coop = true; s.win = false; s.overDelay = 3500;
          s.title = '🌫️ Quase lá…'; s.sub = `Não deu em ${MAX} rodadas. As mentes estavam por perto!`;
        } else api.after(4200, { t: 'next', round: s.round });
      }
    } else if (a.t === 'next') {
      if (s.phase !== 'reveal' || a.round !== s.round) return false;
      s.round++; s.phase = 'write'; s.words = {};
    } else return false;
  },
  mount(root, ctx) {
    root.innerHTML = `<div class="mm"><div class="mm-trail"></div><div class="mm-prompt"></div><div class="mm-stage"></div></div>`;
    const trail = root.querySelector('.mm-trail'), prompt = root.querySelector('.mm-prompt'), stage = root.querySelector('.mm-stage');
    let S = null, key = '';
    const me = ctx.me.uid;

    const draw = () => {
      const hist = Object.values(S.hist || {});
      const prev = S.phase === 'write' ? hist[hist.length - 1] : null;
      if (S.phase === 'reveal') {
        prompt.innerHTML = S.matched ? `<h2>🎉 Mesma palavra!</h2>` : `<h2>Ainda não… 🤔</h2><p>Próxima rodada em instantes.</p>`;
        const [x, y] = ctx.players;
        stage.innerHTML = `<div class="mm-reveal">${[x, y].map((p) => `<div class="mm-card ${S.matched ? 'match' : ''}" style="--c:${pcolor(p.slot)}">
          <span class="av">${p.avatar}</span><b>${esc(S.words[p.uid])}</b><small>${esc(p.name)}</small></div>`).join('<span class="vs">≈</span>')}</div>`;
        return;
      }
      prompt.innerHTML = prev
        ? `<small>Rodada ${S.round} de ${MAX}</small><h2>Escreva uma palavra que fique <em>entre</em></h2>
           <div class="mm-pair"><b>${esc(prev.a)}</b><span>+</span><b>${esc(prev.b)}</b></div>`
        : `<small>Rodada 1 de ${MAX}</small><h2>Escreva qualquer palavra</h2><p>Sem combinar nada. Vamos ver se vocês pensam parecido!</p>`;
      const mine = S.words[me];
      stage.innerHTML = mine
        ? `<div class="locked">🔒 Sua palavra: <b>${esc(mine)}</b><br><small class="oppst"></small></div>`
        : `<form class="mm-form"><input maxlength="24" autocomplete="off" autocapitalize="none" placeholder="sua palavra…" required><button class="btn big go">Travar 🔒</button></form><small class="oppst"></small>`;
      const f = stage.querySelector('form');
      if (f) { const inp = f.querySelector('input'); setTimeout(() => inp.focus(), 50); f.onsubmit = (e) => { e.preventDefault(); const w = inp.value.trim(); if (w) ctx.send({ t: 'word', round: S.round, word: w }); }; }
    };

    return {
      update(s) {
        S = s;
        const hist = Object.values(s.hist || {});
        trail.innerHTML = hist.length ? hist.map((h, i) => `<div class="step ${i === hist.length - 1 && s.matched ? 'ok' : ''}"><small>${i + 1}</small><span>${esc(h.a)}</span><i>·</i><span>${esc(h.b)}</span></div>`).join('') : '';
        const k = `${s.round}:${s.phase}:${!!s.words[me]}`;
        if (k !== key) { key = k; draw(); }
        const st = stage.querySelector('.oppst');
        if (st) { const o = ctx.players.find((p) => p.uid !== me); st.textContent = s.words[o?.uid] ? `${o.name} já travou a palavra ✔` : `${o?.name ?? 'Parceiro'} ainda está pensando…`; }
      },
      destroy() {},
    };
  },
};
