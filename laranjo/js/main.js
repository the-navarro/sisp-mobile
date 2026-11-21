import { initDb } from './db.js';
import { GAME_LIST, GAMES } from './games/index.js';
import { $, esc, html, toast, pcolor, pOf } from './util.js';

const AVATARS = ['🦊', '🐙', '🐸', '🦄', '🐼', '🐯', '🦖', '🐧', '🐝', '🦉', '🐳', '🍉'];
const QUICK = ['👆 Cima', '👇 Baixo', '👈 Esquerda', '👉 Direita', '✋ Espera!', '🔥 Vai!'];
const REACTS = ['😂', '😭', '😎', '🤯', '👏', '❤️'];
const app = $('#app');
const LS = 'laranjo.profile', LSROOM = 'laranjo.room';

let db, profile, code = null;
let rawGame = null, players = [], gameState = null, live = {}, scores = {};
let view = null, viewSid = null, ctx = null, unsubs = [], overSid = null, overTimer = null;
let chatOpen = false, unread = 0, offConnect = null;

const R = (p) => `rooms/${code}/${p}`;
const me = () => players.find((p) => p.uid === db.uid);
const isHost = () => players.length > 0 && players[0].uid === db.uid;
const clone = (o) => JSON.parse(JSON.stringify(o));
const genCode = () => Array.from({ length: 5 }, () => 'ABCDEFGHJKMNPQRSTUVWXYZ23456789'[Math.floor(Math.random() * 31)]).join('');

/* ───────────────────────── boot ───────────────────────── */
async function boot() {
  let saved = {};
  try { saved = JSON.parse(localStorage.getItem(LS)) || {}; } catch { /* ignore */ }
  profile = { name: '', avatar: AVATARS[Math.floor(Math.random() * AVATARS.length)], ...saved };
  try { db = await initDb(); } catch (e) { return renderSetup(e); }
  const c = (new URLSearchParams(location.search).get('sala') || '').toUpperCase();
  renderHome(c);
}

function renderSetup(e) {
  const noCfg = e.message === 'NO_CONFIG';
  app.innerHTML = `<section class="home"><div class="logo">LARANJO</div>
    <div class="card setup"><h2>${noCfg ? 'Falta configurar o Firebase' : 'Não consegui conectar'}</h2>
    ${noCfg ? `<p>Abra <code>public/js/firebase-config.js</code> e cole a configuração do seu app web do Firebase. Os passos completos estão no <b>README.md</b>.</p>
    <p>Quer só testar? Abra <a href="?local">?local</a> em duas abas do mesmo navegador.</p>`
      : `<p>${esc(e.message)}</p><p>Confira se o login <b>Anônimo</b> está ativado em Authentication e se o Realtime Database foi criado.</p>`}
    </div></section>`;
}

/* ───────────────────────── home ───────────────────────── */
function renderHome(prefill = '') {
  teardown();
  app.innerHTML = `<section class="home">
    <div class="logo"><span>LARA</span><span>NJO</span></div>
    <p class="tag">arcade para dois, em tempo real</p>
    <div class="card form">
      <label>Seu apelido<input id="name" maxlength="14" placeholder="como te chamam?" value="${esc(profile.name)}" autocomplete="off"></label>
      <div class="avatars">${AVATARS.map((a) => `<button type="button" class="avb ${a === profile.avatar ? 'on' : ''}" data-a="${a}">${a}</button>`).join('')}</div>
      <button class="btn big go" id="create">Criar sala</button>
      <div class="or"><span>ou entre em uma sala</span></div>
      <div class="joinrow"><input id="code" maxlength="6" placeholder="CÓDIGO" value="${esc(prefill)}" autocomplete="off"><button class="btn big" id="join">Entrar</button></div>
      <button class="btn ghost" id="back" hidden></button>
    </div>
    <div class="strip">${GAME_LIST.map((g) => `<span class="chip2 ${g.mode}">${g.emoji} ${g.name}</span>`).join('')}</div>
  </section>`;
  app.querySelectorAll('.avb').forEach((b) => (b.onclick = () => { profile.avatar = b.dataset.a; app.querySelectorAll('.avb').forEach((x) => x.classList.toggle('on', x === b)); }));
  const nameEl = $('#name'), codeEl = $('#code');
  codeEl.oninput = () => (codeEl.value = codeEl.value.toUpperCase().replace(/[^A-Z0-9]/g, ''));
  const need = () => {
    profile.name = nameEl.value.trim();
    if (!profile.name) { toast('Escolha um apelido primeiro 🙂'); nameEl.focus(); return false; }
    localStorage.setItem(LS, JSON.stringify(profile)); return true;
  };
  $('#create').onclick = async () => { if (need()) await createRoom(); };
  $('#join').onclick = async () => { if (need()) await joinRoom(codeEl.value.trim()); };
  codeEl.onkeydown = (e) => e.key === 'Enter' && $('#join').click();
  if (prefill) nameEl.value ? codeEl.focus() : nameEl.focus();
  // voltar para a última sala
  const last = localStorage.getItem(LSROOM);
  if (last) db.get(`rooms/${last}/players/${db.uid}`).then((p) => {
    if (!p) return;
    const b = $('#back'); if (!b) return; b.hidden = false; b.textContent = `↩ Voltar para a sala ${last}`;
    b.onclick = () => { if (need()) joinRoom(last); };
  }).catch(() => {});
}

async function createRoom() {
  for (let i = 0; i < 8; i++) {
    const c = genCode();
    const ok = await db.transaction(`rooms/${c}/meta`, (cur) => (cur ? undefined : { createdAt: Date.now() }));
    if (ok) return enterRoom(c);
  }
  toast('Não consegui criar a sala. Tente de novo.');
}
async function joinRoom(c) {
  if (c.length < 4) return toast('Digite o código da sala.');
  const meta = await db.get(`rooms/${c}/meta`);
  if (!meta) return toast('Sala não encontrada 🤔');
  enterRoom(c);
}
async function enterRoom(c) {
  const ok = await db.transaction(`rooms/${c}/players`, (cur) => {
    cur = cur || {};
    const mine = cur[db.uid];
    if (mine) { cur[db.uid] = { ...mine, name: profile.name, avatar: profile.avatar, online: true }; return cur; }
    if (Object.keys(cur).length >= 2) return undefined;
    let av = profile.avatar;
    if (Object.values(cur).some((p) => p.avatar === av)) av = AVATARS[(AVATARS.indexOf(av) + 1) % AVATARS.length];
    const used = new Set(Object.values(cur).map((p) => p.slot));
    cur[db.uid] = { name: profile.name, avatar: av, slot: used.has(0) ? 1 : 0, online: true, joinedAt: Date.now() };
    return cur;
  });
  if (!ok) return toast('Essa sala já tem 2 jogadores 😕');
  code = c; localStorage.setItem(LSROOM, c);
  history.replaceState(null, '', location.pathname + (new URLSearchParams(location.search).has('local') ? '?local' : ''));
  buildRoom();
}

/* ───────────────────────── sala ───────────────────────── */
function buildRoom() {
  app.innerHTML = `<div class="room">
    <header class="bar" id="bar"></header>
    <main id="stage"></main>
    <div class="reactbar">${REACTS.map((e) => `<button type="button" data-r="${e}">${e}</button>`).join('')}</div>
    <aside class="chat" id="chat">
      <div class="chat-head"><b>Conversa</b><button type="button" id="chatX" class="btn sm">fechar</button></div>
      <div class="msgs" id="msgs"></div>
      <div class="quick">${QUICK.map((q) => `<button type="button" class="btn sm" data-q="${q}">${q}</button>`).join('')}</div>
      <form id="chatForm"><input id="chatIn" maxlength="240" placeholder="mensagem…" autocomplete="off"><button class="btn go">Enviar</button></form>
    </aside></div>`;
  app.querySelectorAll('[data-r]').forEach((b) => (b.onclick = () => sendChat({ k: 'r', e: b.dataset.r })));
  app.querySelectorAll('[data-q]').forEach((b) => (b.onclick = () => sendChat({ k: 'm', t: b.dataset.q })));
  $('#chatForm').onsubmit = (e) => { e.preventDefault(); const v = $('#chatIn').value.trim(); if (v) sendChat({ k: 'm', t: v }); $('#chatIn').value = ''; };
  $('#chatX').onclick = () => toggleChat(false);

  players = []; gameState = null; live = {}; scores = {}; chatOpen = false; unread = 0;
  renderBar(); renderLobby();
  unsubs.push(db.on(R('players'), onPlayers));
  unsubs.push(db.on(R('game'), onGame));
  unsubs.push(db.on(R('live'), (v) => { live = v || {}; if (view && gameState) view.update(gameState, live); }));
  unsubs.push(db.on(R('scores'), (v) => { scores = v || {}; renderBar(); if (!gameState) renderLobby(); }));
  unsubs.push(db.onChild(R('chat'), onChat));
  unsubs.push(db.onChild(R('actions'), (k, a) => { if (isHost()) { db.remove(R('actions/' + k)); hostHandle(a); } }));
  offConnect = db.onConnect(() => {
    db.disconnectSet(R(`players/${db.uid}/online`), false);
    db.set(R(`players/${db.uid}/online`), true);
  });
}

function onPlayers(v) {
  if (!v || !v[db.uid]) {
    // fui removido / sala apagada
    if (code && players.length) { toast('Você saiu da sala.'); }
    return;
  }
  players = Object.entries(v).map(([uid, p]) => ({ uid, ...p })).sort((a, b) => a.slot - b.slot);
  renderBar();
  if (rawGame && !view) onGame(rawGame);
  if (!gameState) renderLobby(); else updateBanner();
}

function renderBar() {
  const bar = $('#bar'); if (!bar) return;
  const wins = scores.wins || {};
  bar.innerHTML = `<div class="mini-logo">LARANJO</div>
    <button class="codechip" id="copy" title="Copiar link da sala">sala <b>${code}</b> ⧉</button>
    <div class="who">${players.map((p) => `<span class="pl ${p.online === false ? 'off' : ''}" style="--c:${pcolor(p.slot)}">
        <i class="dot"></i>${p.avatar} ${esc(p.name)}${scores.wins !== undefined || true ? `<em>${wins[p.uid] || 0}</em>` : ''}</span>`).join('<span class="x">×</span>')}</div>
    <div class="acts"><button class="btn sm" id="chatB">💬${unread ? `<span class="badge">${unread}</span>` : ''}</button><button class="btn sm" id="leave" title="Sair da sala">Sair</button></div>`;
  $('#copy').onclick = shareLink;
  $('#chatB').onclick = () => toggleChat();
  $('#leave').onclick = leaveRoom;
}

async function shareLink() {
  const u = new URL(location.href); u.search = ''; u.searchParams.set('sala', code);
  if (new URLSearchParams(location.search).has('local') || localStorage.getItem('laranjo.local')) u.searchParams.set('local', '');
  const url = u.toString().replace('local=', 'local');
  try {
    if (navigator.share && matchMedia('(pointer:coarse)').matches) await navigator.share({ title: 'Laranjo', text: `Vem jogar comigo! Sala ${code}`, url });
    else { await navigator.clipboard.writeText(url); toast('Link copiado! Mande para seu parceiro 🔗'); }
  } catch { toast(url, 6000); }
}

async function leaveRoom() {
  if (!confirm('Sair da sala?')) return;
  const c = code, alone = players.length <= 1;
  teardown();
  await db.cancelDisconnect(`rooms/${c}/players/${db.uid}/online`);
  await db.remove(`rooms/${c}/players/${db.uid}`);
  if (alone) await db.remove(`rooms/${c}`);
  localStorage.removeItem(LSROOM);
  renderHome();
}
function teardown() {
  unsubs.forEach((u) => u && u()); unsubs = [];
  offConnect && offConnect(); offConnect = null;
  destroyView(); hideOver(); clearTimeout(overTimer); overSid = null;
  code = null; players = []; gameState = null;
}

/* ───────────────────────── lobby ───────────────────────── */
function renderLobby() {
  const stage = $('#stage'); if (!stage || gameState) return;
  const two = players.length >= 2;
  const card = (g) => `<button type="button" class="gcard ${g.mode}" style="--c:${g.color}" data-g="${g.id}" ${two ? '' : 'disabled'}>
      <span class="ic">${g.emoji}</span><span class="tx"><b>${g.name}</b><small>${g.tagline}</small></span>
      <span class="how">${g.how}</span><span class="play">${two ? 'Jogar' : 'aguardando…'}</span></button>`;
  stage.innerHTML = `<div class="lobby">
    <div class="invite card ${two ? 'ready' : ''}">
      ${two ? `<div class="duo">${players.map((p) => `<span style="--c:${pcolor(p.slot)}"><i>${p.avatar}</i>${esc(p.name)}</span>`).join('<b>＋</b>')}</div><p>Dupla pronta! Escolham um jogo 👇</p>`
        : `<p class="small">Chame seu parceiro com este código:</p><div class="bigcode">${code}</div>
           <button class="btn go" id="inv">Copiar link de convite 🔗</button><p class="wait"><i class="spin"></i> aguardando o outro jogador…</p>`}
      ${scores.coop ? `<p class="coopn">🤝 ${scores.coop} ${scores.coop === 1 ? 'vitória' : 'vitórias'} em equipe nesta sala</p>` : ''}
    </div>
    <h2 class="sec comp">⚔️ Competitivos <small>um contra o outro</small></h2>
    <div class="grid">${GAME_LIST.filter((g) => g.mode === 'comp').map(card).join('')}</div>
    <h2 class="sec coop">🤝 Cooperativos <small>juntos contra o desafio</small></h2>
    <div class="grid">${GAME_LIST.filter((g) => g.mode === 'coop').map(card).join('')}</div>
    <p class="tip">💡 Nos jogos cooperativos, usem o chat 💬 ou abram uma chamada de voz em paralelo.</p>
  </div>`;
  stage.querySelectorAll('[data-g]').forEach((b) => (b.onclick = () => send({ t: '$start', game: b.dataset.g })));
  const inv = $('#inv'); if (inv) inv.onclick = shareLink;
}

/* ───────────────────────── jogo (cliente) ───────────────────────── */
function send(action) {
  const a = { ...action, from: db.uid };
  if (isHost()) hostHandle(a); else db.push(R('actions'), a);
}

function applyDefaults(g, s) {
  for (const [k, v] of Object.entries(g.defaults || {})) if (s[k] === undefined) s[k] = clone(v);
  return s;
}

function onGame(v) {
  rawGame = v;
  if (v && !me()) return; // espera a lista de jogadores
  if (!v) { gameState = null; destroyView(); handleOver(null); renderLobby(); return; }
  const g = GAMES[v.id]; if (!g) return;
  gameState = applyDefaults(g, v);
  if (viewSid !== v.sid) mountView(g, v);
  view.update(gameState, live);
  updateBanner();
  handleOver(v);
  if (v.over && !v.tallied && isHost()) tally(v);
}

function mountView(g, v) {
  destroyView(); hideOver();
  viewSid = v.sid;
  $('#stage').innerHTML = `<div class="gamewrap ${g.mode}" style="--c:${g.color}">
    <div class="gamebar"><span class="gname">${g.emoji} ${g.name}</span><span class="mode">${g.mode === 'comp' ? '⚔️ competitivo' : '🤝 cooperativo'}</span>
      <button class="btn sm" id="toMenu">☰ Menu</button></div>
    <div id="banner" class="banner" hidden></div><div id="gameRoot" class="gameroot"></div></div>`;
  $('#toMenu').onclick = () => { if (confirm('Voltar ao menu de jogos?')) send({ t: '$menu' }); };
  const m = me();
  ctx = {
    me: { uid: db.uid, name: m?.name, avatar: m?.avatar, slot: m?.slot },
    get players() { return players; },
    send, now: () => db.serverNow(),
    setLive: (val) => db.set(R(`live/${db.uid}`), val),
  };
  view = g.mount($('#gameRoot'), ctx);
}
function destroyView() { if (view) { try { view.destroy(); } catch { /* */ } } view = null; viewSid = null; ctx = null; }
function updateBanner() {
  const b = $('#banner'); if (!b) return;
  const lone = players.length < 2, off = players.some((p) => p.online === false);
  b.hidden = !(lone || off);
  b.textContent = lone ? '👋 Seu parceiro saiu da sala.' : off ? '📡 Seu parceiro está sem conexão…' : '';
}

/* ───────────────────────── fim de jogo ───────────────────────── */
function handleOver(v) {
  if (!v || !v.over) { overSid = null; clearTimeout(overTimer); hideOver(); return; }
  if (overSid === v.sid) return;
  overSid = v.sid; clearTimeout(overTimer);
  overTimer = setTimeout(() => showOver(v), v.overDelay || 2200);
}
function showOver(v) {
  hideOver();
  let big, cls = '';
  if (v.coop) { big = v.title || (v.win ? '🎉 Missão cumprida!' : '💥 Não foi dessa vez'); cls = v.win ? 'win' : 'lose'; }
  else if (!v.winner || v.winner === 'draw') { big = '🤝 Empate!'; cls = 'draw'; }
  else { const p = pOf(players, v.winner); big = `<span class="trophy">🏆</span> ${p.avatar} ${esc(p.name)} venceu!`; cls = v.winner === db.uid ? 'win' : 'lose'; }
  const el = html(`<div class="over ${cls}"><div class="card"><h2>${v.coop ? esc(big) : big}</h2>
    <p>${esc(v.sub || '')}</p><div class="row"><button class="btn big go" id="again">Jogar de novo</button><button class="btn big" id="menu">Outro jogo</button></div></div></div>`);
  el.querySelector('#again').onclick = () => send({ t: '$again' });
  el.querySelector('#menu').onclick = () => send({ t: '$menu' });
  document.body.append(el);
}
function hideOver() { document.querySelectorAll('.over').forEach((e) => e.remove()); }

function tally(v) {
  db.update(R('game'), { tallied: true });
  if (v.coop) { if (v.win) db.transaction(R('scores/coop'), (n) => (n || 0) + 1); }
  else if (v.winner && v.winner !== 'draw') db.transaction(R(`scores/wins/${v.winner}`), (n) => (n || 0) + 1);
}

/* ───────────────────────── host (autoridade do jogo) ───────────────────────── */
function makeApi(sid) {
  return {
    now: () => db.serverNow(),
    get players() { return players; },
    after: (ms, a) => setTimeout(() => { if (gameState && gameState.sid === sid && isHost()) hostHandle({ ...a, from: '$timer' }); }, ms),
  };
}
function startGame(id) {
  const g = GAMES[id];
  if (!g || players.length < 2) return;
  const sid = Date.now().toString(36) + Math.random().toString(36).slice(2, 5);
  const st = g.init({ players, ...makeApi(sid) });
  db.set(R('live'), null);
  db.set(R('game'), { id, sid, ...st });
}
function hostHandle(a) {
  if (a.t === '$start') return startGame(a.game);
  if (a.t === '$menu') { db.set(R('live'), null); return db.remove(R('game')); }
  if (a.t === '$again') return gameState && startGame(gameState.id);
  if (!gameState || gameState.over) return;
  const g = GAMES[gameState.id];
  const s = applyDefaults(g, clone(gameState));
  const r = g.reduce(s, a, makeApi(s.sid));
  if (r === false) return;
  db.set(R('game'), s);
}

/* ───────────────────────── chat / reações ───────────────────────── */
function sendChat(m) { db.push(R('chat'), { ...m, u: db.uid, n: me()?.name || '?', ts: db.serverNow() }); }
function onChat(_k, m) {
  if (m.k === 'r') { if (db.serverNow() - m.ts < 6000) floatEmoji(m.e); return; }
  const box = $('#msgs'); if (!box) return;
  const mine = m.u === db.uid;
  const p = players.find((x) => x.uid === m.u);
  box.append(html(`<div class="msg ${mine ? 'mine' : ''}" style="--c:${pcolor(p?.slot ?? 0)}"><small>${esc(m.n)}</small>${esc(m.t)}</div>`));
  box.scrollTop = box.scrollHeight;
  if (!mine && !chatOpen && db.serverNow() - m.ts < 8000) { unread++; renderBar(); toast(`💬 ${m.n}: ${m.t}`, 3200); }
}
function toggleChat(v) {
  chatOpen = v ?? !chatOpen; $('#chat').classList.toggle('open', chatOpen);
  if (chatOpen) { unread = 0; renderBar(); setTimeout(() => $('#chatIn')?.focus(), 80); }
}
function floatEmoji(e) {
  const f = html(`<span class="float" style="left:${10 + Math.random() * 80}%">${esc(e)}</span>`);
  $('#floaters').append(f); setTimeout(() => f.remove(), 2600);
}

if (new URLSearchParams(location.search).has('local')) window.__laranjo = { get state() { return gameState; }, get players() { return players; }, get uid() { return db.uid; } };
boot();
