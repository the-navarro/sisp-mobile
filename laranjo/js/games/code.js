import { esc, shuffle } from '../util.js';

const SYMS = ['🔺', '🟦', '⭐', '🌙', '❤️', '🔥', '🍀', '⚡'];
const NAMES = ['triângulo', 'quadrado azul', 'estrela', 'lua', 'coração', 'fogo', 'trevo', 'raio'];
const TOTAL = 6, MAX_STRIKES = 3, LIMIT = 75000;

function startRound(s, api) {
  s.book = shuffle([0, 1, 2, 3, 4, 5, 6, 7, 8, 9]).slice(0, 8);        // dígito de cada símbolo
  s.seq = shuffle([0, 1, 2, 3, 4, 5, 6, 7]).slice(0, 4);               // símbolos do código
  s.startAt = Math.round(api.now()); s.limit = LIMIT; s.phase = 'play'; s.err = s.err || 0;
  const [a, b] = api.players.map((p) => p.uid);
  s.op = s.round % 2 === 1 ? a : b; s.an = s.round % 2 === 1 ? b : a;
  api.after(LIMIT + 300, { t: 'timeout', round: s.round });
}
const finish = (s) => {
  s.over = true; s.coop = true; s.overDelay = 1800;
  const ok = s.strikes < MAX_STRIKES;
  s.win = ok;
  s.title = ok ? '🔓 Cofre aberto!' : '💥 O cofre travou';
  s.sub = `${s.solved} de ${TOTAL} códigos certos • ${s.strikes} ${s.strikes === 1 ? 'erro' : 'erros'}`;
};
function advance(s, api) {
  if (s.strikes >= MAX_STRIKES || s.round >= TOTAL) return finish(s);
  s.round++; startRound(s, api);
}

export default {
  id: 'code', name: 'Código Cego', emoji: '🔐', mode: 'coop', color: 'var(--yellow)',
  tagline: 'Um vê os símbolos, o outro tem o dicionário secreto.',
  how: 'O OPERADOR vê 4 símbolos e precisa digitar o código. Só que quem sabe qual número vale cada símbolo é o ANALISTA, que não vê a sequência. Descrevam, traduzam e digitem! 3 erros travam o cofre. Os papéis alternam a cada rodada.',
  init({ players, now, after }) {
    const s = { round: 1, solved: 0, strikes: 0, err: 0 };
    startRound(s, { now, after, players });
    return s;
  },
  reduce(s, a, api) {
    if (a.t === 'submit') {
      if (s.phase !== 'play' || a.round !== s.round || a.from !== s.op) return false;
      const want = s.seq.map((i) => s.book[i]).join('');
      if (String(a.code) === want) { s.solved++; s.phase = 'ok'; api.after(1800, { t: 'next', round: s.round }); }
      else { s.strikes++; s.err++; s.limit -= 5000; if (s.strikes >= MAX_STRIKES) finish(s); }
    } else if (a.t === 'next') {
      if (s.phase !== 'ok' || a.round !== s.round) return false;
      advance(s, api);
    } else if (a.t === 'timeout') {
      if (s.phase !== 'play' || a.round !== s.round) return false;
      const left = s.startAt + s.limit - api.now();
      if (left > 150) { api.after(left + 100, a); return false; }
      s.strikes++; s.err++; advance(s, api);
    } else return false;
  },
  mount(root, ctx) {
    root.innerHTML = `<div class="cb"><div class="cb-top"><div class="role"></div><div class="lives"></div></div>
      <div class="timer"><i></i><b></b></div><div class="cb-main"></div></div>`;
    const roleEl = root.querySelector('.role'), lives = root.querySelector('.lives'), main = root.querySelector('.cb-main');
    const bar = root.querySelector('.timer i'), tt = root.querySelector('.timer b');
    const me = ctx.me.uid;
    let S = null, key = '', entry = '', lastErr = 0, raf;

    const flash = (cls) => { main.classList.remove('shake', 'pulse'); void main.offsetWidth; main.classList.add(cls); };
    const slots = () => main.querySelector('.slots') && (main.querySelector('.slots').innerHTML = [0, 1, 2, 3].map((i) => `<span class="${entry[i] !== undefined ? 'f' : ''}">${entry[i] ?? ''}</span>`).join(''));
    const press = (d) => {
      if (S.phase !== 'play' || S.op !== me) return;
      if (d === '⌫') entry = entry.slice(0, -1);
      else if (entry.length < 4) entry += d;
      slots();
      if (entry.length === 4) { const code = entry; entry = ''; setTimeout(slots, 150); ctx.send({ t: 'submit', round: S.round, code }); }
    };
    const onKey = (e) => {
      if (e.target.closest('input,textarea') || S?.op !== me) return;
      if (/^\d$/.test(e.key)) press(e.key); else if (e.key === 'Backspace') press('⌫');
    };
    addEventListener('keydown', onKey);

    const draw = () => {
      const isOp = S.op === me;
      roleEl.innerHTML = `<small>Rodada ${S.round}/${TOTAL}</small><b>${isOp ? '👁️ OPERADOR' : '📖 ANALISTA'}</b>`;
      if (S.phase === 'ok') { main.innerHTML = `<div class="cb-ok">✅<br>Código aceito!</div>`; return; }
      if (isOp) {
        main.innerHTML = `<p class="hint">Descreva estes símbolos, na ordem, para o analista. Ele diz os números e você digita.</p>
          <div class="seq">${S.seq.map((i) => `<div class="sym">${SYMS[i]}<small>${NAMES[i]}</small></div>`).join('')}</div>
          <div class="slots"></div>
          <div class="keypad">${['1', '2', '3', '4', '5', '6', '7', '8', '9', '⌫', '0'].map((d) => `<button type="button" data-k="${d}">${d}</button>`).join('')}</div>`;
        slots();
        main.querySelectorAll('[data-k]').forEach((b) => b.addEventListener('pointerdown', (e) => { e.preventDefault(); press(b.dataset.k); }));
      } else {
        main.innerHTML = `<p class="hint">Só você sabe o valor de cada símbolo. Peça ao operador para descrever a sequência e diga os números!</p>
          <div class="book">${SYMS.map((sy, i) => `<div class="entry"><span>${sy}</span><small>${NAMES[i]}</small><b>${S.book[i]}</b></div>`).join('')}</div>`;
      }
    };

    const tick = () => {
      raf = requestAnimationFrame(tick);
      if (!S) return;
      const rem = Math.max(0, S.startAt + S.limit - ctx.now());
      bar.style.width = (S.phase === 'ok' ? 0 : rem / LIMIT * 100) + '%';
      bar.parentElement.classList.toggle('low', rem < 15000);
      tt.textContent = Math.ceil(rem / 1000) + 's';
    };
    tick();

    return {
      update(s) {
        S = s;
        lives.innerHTML = Array.from({ length: MAX_STRIKES }, (_, i) => `<span class="${i < MAX_STRIKES - s.strikes ? '' : 'lost'}">❤️</span>`).join('');
        const k = `${s.round}:${s.phase}:${s.op}`;
        if (k !== key) { key = k; entry = ''; draw(); if (s.phase === 'ok') flash('pulse'); }
        if ((s.err || 0) !== lastErr) { if (lastErr !== undefined && (s.err || 0) > lastErr) { flash('shake'); } lastErr = s.err || 0; }
      },
      destroy() { cancelAnimationFrame(raf); removeEventListener('keydown', onKey); },
    };
  },
};
