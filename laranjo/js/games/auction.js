import { esc, pcolor, pOf, shuffle } from '../util.js';

const COINS = 100;

export default {
  defaults: { bids: {}, hist: {} },
  id: 'auction', name: 'Leilão Cego', emoji: '🔨', mode: 'comp', color: 'var(--coral)',
  tagline: 'Aposte em segredo, blefe e leve os prêmios.',
  how: '7 prêmios, 100 moedas cada. Em cada rodada vocês apostam em segredo: quem apostar mais leva o prêmio e paga a aposta. Empate? O prêmio acumula para a próxima. Vence quem somar mais pontos.',
  init({ players }) {
    const [a, b] = players.map((p) => p.uid);
    return {
      round: 0, phase: 'bid', prizes: shuffle([2, 3, 4, 5, 6, 8, 10]), pot: 0,
      coins: { [a]: COINS, [b]: COINS }, pts: { [a]: 0, [b]: 0 }, bids: {}, hist: {},
    };
  },
  reduce(s, a, api) {
    const ids = api.players.map((p) => p.uid);
    if (a.t === 'bid') {
      if (s.phase !== 'bid' || a.round !== s.round || s.bids[a.from] !== undefined) return false;
      s.bids[a.from] = Math.max(0, Math.min(s.coins[a.from], Math.floor(+a.amount || 0)));
      if (ids.every((id) => s.bids[id] !== undefined)) {
        const [x, y] = ids; const bx = s.bids[x], by = s.bids[y];
        const value = s.prizes[s.round] + (s.pot || 0);
        let winner = 'tie';
        if (bx !== by) {
          winner = bx > by ? x : y;
          s.coins[winner] -= s.bids[winner]; s.pts[winner] += value; s.pot = 0;
        } else s.pot = value;
        s.last = { bids: { ...s.bids }, winner, value };
        s.hist[s.round] = winner;
        s.phase = 'reveal';
        api.after(4200, { t: 'next', round: s.round });
      }
    } else if (a.t === 'next') {
      if (s.phase !== 'reveal' || a.round !== s.round) return false;
      if (s.round + 1 >= s.prizes.length) {
        const [x, y] = ids;
        let w = 'draw';
        if (s.pts[x] !== s.pts[y]) w = s.pts[x] > s.pts[y] ? x : y;
        else if (s.coins[x] !== s.coins[y]) w = s.coins[x] > s.coins[y] ? x : y;
        s.over = true; s.winner = w; s.overDelay = 600;
        s.sub = `${s.pts[x]} × ${s.pts[y]} pontos` + (s.pts[x] === s.pts[y] && w !== 'draw' ? ' (desempate por moedas)' : '');
      } else { s.round++; s.phase = 'bid'; s.bids = {}; }
    } else return false;
  },
  mount(root, ctx) {
    root.innerHTML = `<div class="au"><div class="au-track"></div><div class="au-prize"></div><div class="au-players"></div><div class="au-panel"></div></div>`;
    const track = root.querySelector('.au-track'), prize = root.querySelector('.au-prize');
    const pl = root.querySelector('.au-players'), panel = root.querySelector('.au-panel');
    let S = null, key = '', amount = 0, locked = false, lastRound = -1;
    const me = ctx.me.uid, other = () => ctx.players.find((p) => p.uid !== me);

    const drawStatic = () => {
      track.innerHTML = S.prizes.map((v, i) => {
        const h = S.hist[i]; const done = i < S.round || (i === S.round && S.phase === 'reveal');
        const who = done && h && h !== 'tie' ? pOf(ctx.players, h) : null;
        return `<div class="chip ${i === S.round ? 'cur' : ''} ${done ? 'done' : ''}" ${who ? `style="--c:${pcolor(who.slot)}"` : ''}>
          <b>${v}</b><small>${who ? who.avatar : done ? '🤝' : '💎'}</small></div>`;
      }).join('');
      const val = S.prizes[S.round] + (S.pot || 0);
      prize.innerHTML = `<div class="gem">💎</div><div><small>Prêmio da rodada ${S.round + 1}/${S.prizes.length}</small>
        <div class="val">${val} pts</div>${S.pot ? `<small class="pot">inclui ${S.pot} acumulados do empate</small>` : ''}</div>`;
      pl.innerHTML = ctx.players.map((p) => `<div class="au-p" style="--c:${pcolor(p.slot)}">
        <span class="av">${p.avatar}</span><b>${esc(p.name)}${p.uid === me ? ' (você)' : ''}</b>
        <span class="stat">🪙 ${S.coins[p.uid]}</span><span class="stat">⭐ ${S.pts[p.uid]}</span></div>`).join('');
    };

    const drawPanel = () => {
      if (S.phase === 'bid') {
        const max = S.coins[me];
        amount = Math.min(amount, max);
        locked = S.bids[me] !== undefined;
        panel.innerHTML = locked
          ? `<div class="locked">🔒 Aposta travada: <b>${S.bids[me]}</b><br><small class="oppst"></small></div>`
          : `<div class="bidbox"><div class="bignum"><span id="amt">${amount}</span><small> / ${max} moedas</small></div>
              <input type="range" min="0" max="${max}" value="${amount}" id="rng">
              <div class="quick">${[1, 5, 10, 25].map((n) => `<button type="button" class="btn sm" data-add="${n}">+${n}</button>`).join('')}
                <button type="button" class="btn sm" data-set="0">0</button><button type="button" class="btn sm" data-set="${max}">Tudo</button></div>
              <button type="button" class="btn big go" id="lock">Travar aposta 🔒</button>
              <small class="oppst"></small></div>`;
        if (!locked) {
          const amt = panel.querySelector('#amt'), rng = panel.querySelector('#rng');
          const setAmt = (v) => { amount = Math.max(0, Math.min(max, v)); amt.textContent = amount; rng.value = amount; };
          rng.oninput = () => setAmt(+rng.value);
          panel.querySelectorAll('[data-add]').forEach((b) => (b.onclick = () => setAmt(amount + +b.dataset.add)));
          panel.querySelectorAll('[data-set]').forEach((b) => (b.onclick = () => setAmt(+b.dataset.set)));
          panel.querySelector('#lock').onclick = () => ctx.send({ t: 'bid', round: S.round, amount });
        }
      } else if (S.phase === 'reveal') {
        const L = S.last, w = L.winner;
        panel.innerHTML = `<div class="reveal">${ctx.players.map((p) => `<div class="rv ${w === p.uid ? 'won' : ''}" style="--c:${pcolor(p.slot)}">
          <span class="av">${p.avatar}</span><div class="bignum flip">${L.bids[p.uid]}</div></div>`).join('<span class="vs">×</span>')}</div>
          <div class="verdict">${w === 'tie' ? '🤝 Empate! O prêmio acumula.' : `${pOf(ctx.players, w).avatar} <b>${esc(pOf(ctx.players, w).name)}</b> leva ${L.value} pts!`}</div>`;
      }
    };

    return {
      update(s) {
        S = s;
        const k = `${s.round}:${s.phase}:${s.bids[me] !== undefined}`;
        drawStatic();
        if (s.round !== lastRound) { lastRound = s.round; amount = 0; }
        if (k !== key) { key = k; drawPanel(); }
        const st = panel.querySelector('.oppst');
        if (st && s.phase === 'bid') { const o = other(); st.textContent = s.bids[o?.uid] !== undefined ? `${o.name} já travou a aposta ✔` : `${o?.name ?? 'Parceiro'} ainda está pensando…`; }
      },
      destroy() {},
    };
  },
};
