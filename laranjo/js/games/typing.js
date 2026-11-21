import { esc, pcolor, pOf, shuffle } from '../util.js';

const TEXTS = [
  'o gato subiu no telhado enquanto a chuva caia mansa e o vento assobiava uma cancao antiga',
  'quem corre mais rapido nem sempre chega primeiro porque a pressa tambem tropeca nas proprias pernas',
  'a lua trocou de lugar com o sol e ninguem percebeu porque todos estavam olhando para o celular',
  'um cafe bem quente, um bom livro e um sofa macio formam a receita perfeita para uma tarde tranquila',
  'o robo aprendeu a dancar samba mas ainda tropeca sempre que ouve o som do pandeiro e do tamborim',
  'sete peixes pequenos nadaram ate o mar grande para descobrir onde o rio escondia todas as estrelas',
];

export default {
  defaults: { fin: {} },
  id: 'typing', name: 'Corrida de Digitação', emoji: '🏎️', mode: 'comp', color: 'var(--sky)',
  tagline: 'Digite a frase mais rápido que o outro. Erros travam!',
  how: 'A frase aparece depois da contagem. Digite exatamente o texto: se errar uma letra, precisa apagar e corrigir. Quem terminar primeiro vence.',
  init({ now, after }) {
    const s = { text: shuffle(TEXTS)[0], startAt: Math.round(now() + 4200), fin: {} };
    after(120000, { t: 'end' });
    return s;
  },
  reduce(s, a, api) {
    const ids = api.players.map((p) => p.uid);
    if (a.t === 'finish') {
      if (s.fin[a.from]) return false;
      s.fin[a.from] = { ms: Math.max(1, Math.round(a.ms)) };
      if (ids.every((id) => s.fin[id])) return this.end(s, api);
      api.after(9000, { t: 'end' });
    } else if (a.t === 'end') return this.end(s, api);
    else return false;
  },
  end(s, api) {
    if (s.over) return false;
    const done = api.players.filter((p) => s.fin[p.uid]).sort((x, y) => s.fin[x.uid].ms - s.fin[y.uid].ms);
    s.over = true; s.overDelay = 1800;
    s.winner = done.length ? done[0].uid : 'draw';
    const wpm = (u) => Math.round(s.text.length / 5 / (s.fin[u].ms / 60000));
    s.sub = done.length ? done.map((p) => `${p.name}: ${wpm(p.uid)} ppm (${(s.fin[p.uid].ms / 1000).toFixed(1)}s)`).join('  •  ') : 'Ninguém terminou a tempo.';
  },
  mount(root, ctx) {
    root.innerHTML = `<div class="ty"><div class="ty-lanes"></div><div class="ty-count"></div>
      <div class="ty-text"></div><input class="ty-input" autocomplete="off" autocapitalize="off" autocorrect="off" spellcheck="false" placeholder="Digite aqui…" disabled></div>`;
    const lanes = root.querySelector('.ty-lanes'), count = root.querySelector('.ty-count');
    const textEl = root.querySelector('.ty-text'), input = root.querySelector('.ty-input');
    let S = null, correct = 0, sent = false, raf, lastLive = -1;
    const me = ctx.me.uid;
    input.addEventListener('paste', (e) => e.preventDefault());
    input.addEventListener('drop', (e) => e.preventDefault());

    const paintText = (err) => {
      const t = S.text; let h = '';
      for (let i = 0; i < t.length; i++) {
        const c = esc(t[i] === ' ' ? ' ' : t[i]);
        h += i < correct ? `<span class="ok">${c}</span>` : i === correct ? `<span class="cur ${err ? 'bad' : ''}">${c}</span>` : `<span>${c}</span>`;
      }
      textEl.innerHTML = h;
    };
    input.addEventListener('input', () => {
      if (!S || sent) return;
      const v = input.value; let i = 0;
      while (i < v.length && i < S.text.length && v[i] === S.text[i]) i++;
      correct = i; const err = v.length > i;
      input.classList.toggle('err', err);
      paintText(err);
      if (correct !== lastLive) { lastLive = correct; ctx.setLive({ p: correct }); }
      if (!err && v === S.text) { sent = true; input.disabled = true; ctx.send({ t: 'finish', ms: ctx.now() - S.startAt }); }
    });

    const tick = () => {
      raf = requestAnimationFrame(tick);
      if (!S) return;
      const left = S.startAt - ctx.now();
      if (left > 0) { count.textContent = Math.ceil(left / 1000); count.className = 'ty-count show'; }
      else if (count.className.includes('show')) {
        count.textContent = 'VAI!'; count.className = 'ty-count go';
        if (!sent && !S.over) { input.disabled = false; input.focus(); }
        setTimeout(() => (count.className = 'ty-count'), 700);
      }
    };
    tick();

    return {
      update(s, live) {
        const first = !S; S = s;
        if (first) paintText(false);
        lanes.innerHTML = ctx.players.map((p) => {
          const fin = s.fin[p.uid];
          const prog = fin ? 1 : p.uid === me ? correct / s.text.length : ((live?.[p.uid]?.p || 0) / s.text.length);
          return `<div class="lane" style="--c:${pcolor(p.slot)}"><span class="nm">${esc(p.name)}</span>
            <div class="road"><div class="car" style="left:calc(${(prog * 100).toFixed(1)}% - ${(prog * 34).toFixed(1)}px)">${p.avatar}</div><i class="flag">🏁</i></div>
            <span class="pc">${fin ? (fin.ms / 1000).toFixed(1) + 's' : Math.round(prog * 100) + '%'}</span></div>`;
        }).join('');
        if (s.over) input.disabled = true;
      },
      destroy() { cancelAnimationFrame(raf); },
    };
  },
};
