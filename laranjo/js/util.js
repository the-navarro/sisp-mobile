export const $ = (s, r = document) => r.querySelector(s);
export const $$ = (s, r = document) => [...r.querySelectorAll(s)];
export const esc = (s) => String(s ?? '').replace(/[&<>"']/g, (c) => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;' }[c]));
export const vals = (o) => Object.values(o || {});
export const norm = (s) => String(s || '').normalize('NFD').replace(/[̀-ͯ]/g, '').replace(/[^a-z0-9 ]/gi, '').replace(/\s+/g, ' ').toLowerCase().trim();
export const secs = (ms) => (ms / 1000).toFixed(2) + 's';
export function mulberry32(a) {
  return () => { a |= 0; a = (a + 0x6D2B79F5) | 0; let t = Math.imul(a ^ (a >>> 15), 1 | a); t = (t + Math.imul(t ^ (t >>> 7), 61 | t)) ^ t; return ((t ^ (t >>> 14)) >>> 0) / 4294967296; };
}
export function shuffle(arr, rnd = Math.random) {
  const a = [...arr];
  for (let i = a.length - 1; i > 0; i--) { const j = Math.floor(rnd() * (i + 1)); [a[i], a[j]] = [a[j], a[i]]; }
  return a;
}
export const pick = (arr) => arr[Math.floor(Math.random() * arr.length)];
export function html(str) { const t = document.createElement('template'); t.innerHTML = str.trim(); return t.content.firstElementChild; }
export function toast(msg, ms = 2600) {
  const box = document.getElementById('toasts');
  const t = html(`<div class="toast">${esc(msg)}</div>`);
  box.append(t); setTimeout(() => t.classList.add('out'), ms); setTimeout(() => t.remove(), ms + 400);
}
export const pcolor = (slot) => (slot === 0 ? 'var(--p1)' : 'var(--p2)');
export const pOf = (players, uid) => players.find((p) => p.uid === uid) || { name: '?', avatar: '👤', slot: 0, uid };
// helper de tempo para requestAnimationFrame com limpeza
export function loop(fn) { let id; const f = (t) => { fn(t); id = requestAnimationFrame(f); }; id = requestAnimationFrame(f); return () => cancelAnimationFrame(id); }
