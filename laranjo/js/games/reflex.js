import { esc, loop, pcolor, pOf, secs } from '../util.js';

const WIN_AT = 3, MAX_ROUNDS = 5;

function startRound(s, api) {
  const t0 = api.now() + 1200;
  const delay = 1800 + Math.random() * 3400;
  s.t0 = Math.round(t0);
  s.goAt = Math.round(t0 + delay);
  s.decoyAt = Math.random() < 0.65 ? Math.round(t0 + delay * (0.3 + Math.random() * 0.35)) : 0;
  s.phase = 'play'; s.times = {}; s.res = null;
  api.after(s.goAt - api.now() + 3200, { t: 'timeout', round: s.round });
}

function resolve(s, api) {
  const [a, b] = api.players.map((p) => p.uid);
  const ta = s.times[a], tb = s.times[b];
  let winner = 'draw';
  if (ta === -1 || tb === -1) winner = ta === -1 && tb === -1 ? 'draw' : ta === -1 ? b : a;
  else if (ta !== undefined && tb !== undefined) winner = ta === tb ? 'draw' : ta < tb ? a : b;
  else if (ta !== undefined) winner = a;
  else if (tb !== undefined) winner = b;
  s.res = { winner, times: { ...s.times } };
  if (winner !== 'draw') s.wins[winner] = (s.wins[winner] || 0) + 1;
  s.phase = 'result';
  const wa = s.wins[a] || 0, wb = s.wins[b] || 0;
  if (wa >= WIN_AT || wb >= WIN_AT || s.round >= MAX_ROUNDS) {
    s.over = true; s.winner = wa === wb ? 'draw' : wa > wb ? a : b;
    s.sub = `Placar final ${wa} × ${wb}`;
  } else api.after(2800, { t: 'next', round: s.round });
}

export default {
  defaults: { times: {} },
  id: 'reflex', name: 'Reflexo Relâmpago', emoji: '⚡', mode: 'comp', color: 'var(--yellow)',
  tagline: 'Toque quando a tela ficar verde. Cuidado com as iscas!',
  how: 'Melhor de 5. Espere a tela ficar VERDE e toque o mais rápido que puder. Se tocar antes (ou na isca vermelha), perde a rodada.',
  init({ players, now, after }) {
    const s = { round: 1, wins: { [players[0].uid]: 0, [players[1].uid]: 0 } };
    startRound(s, { now, after });
    return s;
  },
  reduce(s, a, api) {
    if (a.t === 'tap') {
      if (a.round !== s.round || s.phase !== 'play' || s.times[a.from] !== undefined) return false;
      s.times[a.from] = a.early ? -1 : Math.max(0, a.ms);
      const ids = api.players.map((p) => p.uid);
      if (a.early || ids.every((id) => s.times[id] !== undefined)) resolve(s, api);
    } else if (a.t === 'timeout') {
      if (a.round !== s.round || s.phase !== 'play') return false;
      resolve(s, api);
    } else if (a.t === 'next') {
      if (a.round !== s.round || s.phase !== 'result' || s.over) return false;
      s.round++; startRound(s, api);
    } else return false;
  },
  mount(root, ctx) {
    root.innerHTML = `
      <div class="rx">
        <div class="rx-score"></div>
        <button class="rx-pad" type="button"><div class="rx-big"></div><div class="rx-small"></div></button>
        <p class="hint">Toque na tela (ou aperte <kbd>espaço</kbd>) quando ficar verde.</p>
      </div>`;
    const pad = root.querySelector('.rx-pad'), big = root.querySelector('.rx-big'), small = root.querySelector('.rx-small');
    const scoreEl = root.querySelector('.rx-score');
    let S = null, tappedRound = 0;

    const tap = (e) => {
      if (e) e.preventDefault();
      if (!S || S.phase !== 'play' || tappedRound === S.round) return;
      tappedRound = S.round;
      const t = ctx.now();
      if (t < S.goAt) ctx.send({ t: 'tap', round: S.round, early: true });
      else ctx.send({ t: 'tap', round: S.round, ms: Math.round(t - S.goAt) });
    };
    pad.addEventListener('pointerdown', tap);
    const key = (e) => { if (e.code === 'Space' && !e.repeat) tap(e); };
    addEventListener('keydown', key);

    const paint = () => {
      if (!S) return;
      let cls = 'wait', b = '', sm = '';
      const t = ctx.now();
      if (S.phase === 'play') {
        if (tappedRound === S.round) { cls = 'sent'; b = 'Registrado!'; sm = 'esperando o resultado…'; }
        else if (t < S.t0) { cls = 'prep'; b = 'Preparar…'; sm = `rodada ${S.round}`; }
        else if (t < S.goAt) {
          if (S.decoyAt && t >= S.decoyAt && t < S.decoyAt + 650) { cls = 'decoy'; b = 'NÃO!'; sm = 'era isca'; }
          else { cls = 'wait'; b = 'Espere…'; sm = 'ainda não'; }
        } else { cls = 'go'; b = 'AGORA!'; sm = ''; }
      } else {
        cls = 'result';
        const r = S.res || {}; r.times = r.times || {};
        const lines = ctx.players.map((p) => {
          const v = r.times[p.uid];
          const txt = v === undefined ? 'não tocou' : v === -1 ? 'largou cedo!' : Math.round(v) + ' ms';
          return `<span style="color:${pcolor(p.slot)}">${p.avatar} ${esc(p.name)}</span> ${txt}`;
        }).join('<br>');
        b = r.winner === 'draw' ? 'Empate' : `${pOf(ctx.players, r.winner).avatar} ${esc(pOf(ctx.players, r.winner).name)} leva!`;
        sm = lines;
      }
      if (pad.dataset.cls !== cls) { pad.dataset.cls = cls; pad.className = 'rx-pad ' + cls; }
      if (big.innerHTML !== b) big.innerHTML = b;
      if (small.innerHTML !== sm) small.innerHTML = sm;
    };
    const stop = loop(paint);

    return {
      update(s) {
        S = s;
        scoreEl.innerHTML = ctx.players.map((p) => {
          const w = s.wins[p.uid] || 0;
          return `<div class="rx-p" style="--c:${pcolor(p.slot)}"><span class="av">${p.avatar}</span><b>${esc(p.name)}</b>
            <span class="pips">${[0, 1, 2].map((i) => `<i class="${i < w ? 'on' : ''}"></i>`).join('')}</span></div>`;
        }).join('<span class="vs">VS</span>');
        paint();
      },
      destroy() { stop(); removeEventListener('keydown', key); },
    };
  },
};
