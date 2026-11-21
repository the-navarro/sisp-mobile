import { esc, mulberry32, pOf } from '../util.js';

const LEVELS = [{ n: 7, time: 90 }, { n: 10, time: 130 }, { n: 13, time: 170 }];
const N = 1, E = 2, S_ = 4, W = 8;
const DIRS = { N: [0, -1, N, S_], E: [1, 0, E, W], S: [0, 1, S_, N], W: [-1, 0, W, E] };

export function genMaze(seed, n) {
  const rnd = mulberry32(seed);
  const w = new Array(n * n).fill(15);
  const seen = new Array(n * n).fill(false);
  const st = [0]; seen[0] = true;
  while (st.length) {
    const c = st[st.length - 1], x = c % n, y = (c / n) | 0;
    const opts = Object.values(DIRS).filter(([dx, dy]) => { const nx = x + dx, ny = y + dy; return nx >= 0 && ny >= 0 && nx < n && ny < n && !seen[ny * n + nx]; });
    if (!opts.length) { st.pop(); continue; }
    const [dx, dy, bit, opp] = opts[Math.floor(rnd() * opts.length)];
    const nc = (y + dy) * n + (x + dx);
    w[c] &= ~bit; w[nc] &= ~opp; seen[nc] = true; st.push(nc);
  }
  return w;
}

function startLevel(s, api) {
  const L = LEVELS[s.level];
  s.n = L.n; s.seed = Math.floor(Math.random() * 1e9);
  s.startAt = Math.round(api.now() + 4000); s.limit = L.time * 1000;
  s.phase = 'play';
  const [a, b] = api.players.map((p) => p.uid);
  s.pilot = s.level % 2 === 0 ? a : b; s.nav = s.level % 2 === 0 ? b : a;
  api.after(s.startAt - api.now() + s.limit + 400, { t: 'timeout', level: s.level });
}

export default {
  id: 'maze', name: 'Piloto & Navegador', emoji: '🔦', mode: 'coop', color: 'var(--mint)',
  tagline: 'Um enxerga só a lanterna. O outro tem o mapa.',
  how: 'O piloto está no escuro e só vê ao redor. O navegador vê o labirinto inteiro e envia setas de dica. Chegue à saída 🏁 antes do tempo acabar. Os papéis se invertem a cada fase. Usem o chat ou uma chamada de voz!',
  init({ players, now, after }) {
    const s = { level: 0, total: 0 };
    startLevel(s, { now, after, players });
    return s;
  },
  reduce(s, a, api) {
    if (a.t === 'reach') {
      if (s.phase !== 'play' || a.level !== s.level || a.from !== s.pilot) return false;
      const el = Math.max(0, Math.min(s.limit, api.now() - s.startAt));
      s.total += el; s.phase = 'clear'; s.lastMs = el;
      if (s.level >= LEVELS.length - 1) {
        s.over = true; s.coop = true; s.win = true; s.overDelay = 2400;
        s.title = '🏁 Saíram do labirinto!'; s.sub = `As 3 fases em ${(s.total / 1000).toFixed(1)}s no total`;
      } else api.after(3200, { t: 'next', level: s.level });
    } else if (a.t === 'next') {
      if (s.phase !== 'clear' || a.level !== s.level) return false;
      s.level++; startLevel(s, api);
    } else if (a.t === 'timeout') {
      if (s.phase !== 'play' || a.level !== s.level) return false;
      s.over = true; s.coop = true; s.win = false; s.overDelay = 1200;
      s.title = '⏰ O tempo acabou'; s.sub = `Vocês chegaram até a fase ${s.level + 1} de ${LEVELS.length}.`;
    } else return false;
  },
  mount(root, ctx) {
    root.innerHTML = `<div class="mz"><div class="mz-top"><div class="role"></div><div class="timer"><i></i><b></b></div></div>
      <div class="mz-canvas"><canvas></canvas><div class="mz-banner"></div><div class="mz-hint"></div></div><div class="mz-ctl"></div></div>`;
    const cv = root.querySelector('canvas'), g = cv.getContext('2d');
    const roleEl = root.querySelector('.role'), bar = root.querySelector('.timer i'), tt = root.querySelector('.timer b');
    const banner = root.querySelector('.mz-banner'), hintEl = root.querySelector('.mz-hint'), ctl = root.querySelector('.mz-ctl');
    const me = ctx.me.uid;
    let S = null, walls = null, lvKey = '', pos = { x: 0, y: 0 }, trail = new Set(), hintId = 0, hintShow = 0, hintDir = '', navHintN = 0, raf, bump = 0;
    let L = null;

    const size = () => { const w = Math.max(220, Math.min((root.clientWidth || 360) - 8, 520, innerHeight - 545)); /* cabe com as setas na tela do celular */ const d = Math.floor(w * 2) ; cv.width = d; cv.height = d; cv.style.width = w + 'px'; cv.style.height = w + 'px'; };

    const cellWalls = (x, y) => walls[y * S.n + x];
    const move = (d) => {
      if (!S || S.phase !== 'play' || S.pilot !== me || ctx.now() < S.startAt) return;
      const [dx, dy, bit] = DIRS[d];
      if (cellWalls(pos.x, pos.y) & bit) { bump = performance.now(); return; }
      pos = { x: pos.x + dx, y: pos.y + dy }; trail.add(pos.x + ',' + pos.y);
      ctx.setLive({ x: pos.x, y: pos.y, lv: S.level });
      if (pos.x === S.n - 1 && pos.y === S.n - 1) ctx.send({ t: 'reach', level: S.level });
    };
    const keys = { ArrowUp: 'N', w: 'N', W: 'N', ArrowDown: 'S', s: 'S', S: 'S', ArrowLeft: 'W', a: 'W', A: 'W', ArrowRight: 'E', d: 'E', D: 'E' };
    const onKey = (e) => {
      if (e.target.closest('input,textarea')) return;
      const d = keys[e.key];
      if (!d) return; e.preventDefault();
      if (S?.pilot === me) move(d); else sendHint(d);
    };
    addEventListener('keydown', onKey);
    const sendHint = (d) => { if (!S || S.nav !== me) return; navHintN++; ctx.setLive({ hint: d, id: navHintN, lv: S.level }); };

    const drawCell = (x, y, px, py, c, goal) => {
      const w = cellWalls(x, y);
      g.fillStyle = goal ? '#3ddc97' : '#2d2266'; g.fillRect(px, py, c, c);
      if (goal) { g.font = `${c * 0.6}px serif`; g.textAlign = 'center'; g.textBaseline = 'middle'; g.fillText('🏁', px + c / 2, py + c / 2 + c * 0.04); }
      g.strokeStyle = '#fff4e2'; g.lineWidth = Math.max(3, c * 0.09); g.lineCap = 'round'; g.beginPath();
      if (w & N) { g.moveTo(px, py); g.lineTo(px + c, py); }
      if (w & E) { g.moveTo(px + c, py); g.lineTo(px + c, py + c); }
      if (w & S_) { g.moveTo(px, py + c); g.lineTo(px + c, py + c); }
      if (w & W) { g.moveTo(px, py); g.lineTo(px, py + c); }
      g.stroke();
    };

    const render = () => {
      raf = requestAnimationFrame(render);
      if (!S || !walls) return;
      const n = S.n, D = cv.width, now = ctx.now();
      g.setTransform(1, 0, 0, 1, 0, 0);
      g.fillStyle = '#0d0820'; g.fillRect(0, 0, D, D);
      const pilotLive = ctx.live?.[S.pilot];
      const pp = S.pilot === me ? pos : (pilotLive && pilotLive.lv === S.level ? pilotLive : { x: 0, y: 0 });
      if (performance.now() - bump < 160) g.translate((Math.random() - .5) * 8, (Math.random() - .5) * 8);
      const pilot = pOf(ctx.players, S.pilot);
      if (S.pilot === me) {
        const R = 2, V = R * 2 + 1, c = D / V;
        for (let dy = -R; dy <= R; dy++) for (let dx = -R; dx <= R; dx++) {
          if (dx * dx + dy * dy > 5) continue;
          const x = pp.x + dx, y = pp.y + dy;
          if (x < 0 || y < 0 || x >= n || y >= n) continue;
          drawCell(x, y, (dx + R) * c, (dy + R) * c, c, x === n - 1 && y === n - 1);
          if (trail.has(x + ',' + y)) { g.fillStyle = 'rgba(255,210,63,.35)'; g.beginPath(); g.arc((dx + R + .5) * c, (dy + R + .5) * c, c * .12, 0, 7); g.fill(); }
        }
        const gr = g.createRadialGradient(D / 2, D / 2, c * 0.8, D / 2, D / 2, c * 2.6);
        gr.addColorStop(0, 'rgba(13,8,32,0)'); gr.addColorStop(1, 'rgba(13,8,32,.96)');
        g.fillStyle = gr; g.fillRect(0, 0, D, D);
        g.font = `${c * 0.55}px serif`; g.textAlign = 'center'; g.textBaseline = 'middle'; g.fillText(pilot.avatar, D / 2, D / 2 + c * .04);
      } else {
        const c = D / n;
        for (let y = 0; y < n; y++) for (let x = 0; x < n; x++) drawCell(x, y, x * c, y * c, c, x === n - 1 && y === n - 1);
        g.fillStyle = 'rgba(255,107,107,.9)'; g.fillRect(c * .3, c * .3, c * .4, c * .4);
        g.shadowColor = '#ffd23f'; g.shadowBlur = 24; g.fillStyle = '#ffd23f';
        g.beginPath(); g.arc((pp.x + .5) * c, (pp.y + .5) * c, c * .36, 0, 7); g.fill(); g.shadowBlur = 0;
        g.font = `${c * 0.5}px serif`; g.textAlign = 'center'; g.textBaseline = 'middle'; g.fillText(pilot.avatar, (pp.x + .5) * c, (pp.y + .5) * c + c * .03);
      }
      // dica recebida
      const nl = ctx.live?.[S.nav];
      if (S.pilot === me && nl && nl.lv === S.level && nl.id !== hintId) { hintId = nl.id; hintDir = nl.hint; hintShow = performance.now(); }
      const show = performance.now() - hintShow < 1700;
      hintEl.textContent = show ? { N: '▲', E: '▶', S: '▼', W: '◀' }[hintDir] : '';
      hintEl.classList.toggle('on', show);
      // tempo
      const left = S.startAt - now;
      if (S.phase === 'clear') { banner.textContent = '✅ Saída!'; banner.classList.add('on'); }
      else if (left > 0) { banner.textContent = Math.ceil(left / 1000); banner.classList.add('on'); }
      else if (left > -700) { banner.textContent = 'VAI!'; banner.classList.add('on'); }
      else banner.classList.remove('on');
      const rem = Math.max(0, S.startAt + S.limit - Math.max(now, S.startAt));
      bar.style.width = (S.phase === 'clear' ? 0 : rem / S.limit * 100) + '%';
      bar.parentElement.classList.toggle('low', rem < 15000);
      tt.textContent = Math.ceil(rem / 1000) + 's';
    };

    const buildLevel = () => {
      walls = genMaze(S.seed, S.n); pos = { x: 0, y: 0 }; trail = new Set(['0,0']); hintId = 0; hintShow = 0; navHintN = 0; size();
      const iPilot = S.pilot === me;
      roleEl.innerHTML = `<small>Fase ${S.level + 1}/${LEVELS.length}</small><b>${iPilot ? '🔦 Você é o PILOTO' : '🗺️ Você é o NAVEGADOR'}</b>`;
      ctl.innerHTML = iPilot
        ? `<div class="dpad"><button data-d="N">▲</button><button data-d="W">◀</button><button data-d="S">▼</button><button data-d="E">▶</button></div><p class="hint">Setas / WASD ou botões. Você só vê ao redor. Espere as dicas do navegador!</p>`
        : `<div class="dpad hints"><button data-h="N">▲</button><button data-h="W">◀</button><button data-h="S">▼</button><button data-h="E">▶</button></div><p class="hint">Você vê o mapa todo (🟡 = piloto). Toque nas setas para mandar dicas ao piloto.</p>`;
      ctl.querySelectorAll('[data-d]').forEach((b) => b.addEventListener('pointerdown', (e) => { e.preventDefault(); move(b.dataset.d); }));
      ctl.querySelectorAll('[data-h]').forEach((b) => b.addEventListener('pointerdown', (e) => { e.preventDefault(); sendHint(b.dataset.h); }));
      if (iPilot) ctx.setLive({ x: 0, y: 0, lv: S.level }); else ctx.setLive(null);
    };

    addEventListener('resize', size);
    raf = requestAnimationFrame(render);
    return {
      update(s, live) {
        S = s; ctx.live = live;
        const k = `${s.level}:${s.seed}`;
        if (k !== lvKey) { lvKey = k; buildLevel(); }
      },
      destroy() { cancelAnimationFrame(raf); removeEventListener('keydown', onKey); removeEventListener('resize', size); },
    };
  },
};
