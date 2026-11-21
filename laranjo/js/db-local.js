// Banco "falso" em memória sincronizado entre abas (BroadcastChannel).
// Serve para testar tudo sem Firebase: abra a mesma página com ?local em duas abas.
export function create() {
  const ch = new BroadcastChannel('laranjo-local');
  let uid = sessionStorage.getItem('laranjo.uid');
  if (!uid) { uid = 'u' + Math.random().toString(36).slice(2, 10); sessionStorage.setItem('laranjo.uid', uid); }

  let data = {};
  const listeners = new Set();
  const dcs = new Map();

  const parts = (p) => String(p).split('/').filter(Boolean);
  const tree = (v) => {
    if (v === null || v === undefined) return undefined;
    if (typeof v !== 'object') return v;
    const out = {};
    for (const [k, x] of Object.entries(v)) { const t = tree(x); if (t !== undefined) out[k] = t; }
    return Object.keys(out).length ? out : undefined;
  };
  const arrayify = (v) => {
    if (v === null || typeof v !== 'object') return v;
    const keys = Object.keys(v);
    const out = {};
    for (const k of keys) out[k] = arrayify(v[k]);
    if (keys.length && keys.every((k, i) => String(i) === k) ) return keys.map((k) => out[k]);
    return out;
  };
  const read = (p) => {
    let n = data;
    for (const k of parts(p)) { if (n == null || typeof n !== 'object') return null; n = n[k]; }
    return n === undefined ? null : arrayify(JSON.parse(JSON.stringify(n)));
  };
  const setAt = (p, v) => {
    const ks = parts(p);
    const val = tree(v);
    if (!ks.length) { data = val || {}; return; }
    let n = data; const stack = [];
    for (let i = 0; i < ks.length - 1; i++) {
      stack.push([n, ks[i]]);
      if (typeof n[ks[i]] !== 'object' || n[ks[i]] === null) { if (val === undefined) return; n[ks[i]] = {}; }
      n = n[ks[i]];
    }
    if (val === undefined) delete n[ks[ks.length - 1]]; else n[ks[ks.length - 1]] = val;
    for (let i = stack.length - 1; i >= 0; i--) { // poda pais vazios
      const [par, k] = stack[i];
      if (par[k] && Object.keys(par[k]).length === 0) delete par[k]; else break;
    }
  };
  const notify = () => listeners.forEach((l) => l());
  const apply = (op) => { setAt(op.path, op.value); notify(); };
  const emit = (op) => { apply(op); ch.postMessage({ type: 'op', op }); };

  ch.onmessage = (e) => {
    const m = e.data;
    if (m.type === 'op') apply(m.op);
    else if (m.type === 'hello') ch.postMessage({ type: 'snap', data });
    else if (m.type === 'snap' && !Object.keys(data).length) { data = m.data; notify(); }
  };
  ch.postMessage({ type: 'hello' });
  addEventListener('pagehide', () => dcs.forEach((v, p) => ch.postMessage({ type: 'op', op: { path: p, value: v } })));

  const later = (fn) => Promise.resolve().then(fn);
  return {
    uid,
    serverNow: () => Date.now(),
    get: async (p) => read(p),
    set: async (p, v) => emit({ path: p, value: v }),
    update: async (p, o) => { for (const [k, v] of Object.entries(o)) emit({ path: p + '/' + k, value: v }); },
    remove: async (p) => emit({ path: p, value: null }),
    push: async (p, v) => { const k = Date.now().toString(36) + Math.random().toString(36).slice(2, 7); emit({ path: p + '/' + k, value: v }); return k; },
    on(p, cb) {
      let last = '\u0000'; let dead = false;
      const check = () => { if (dead) return; const v = read(p); const s = JSON.stringify(v); if (s !== last) { last = s; cb(v); } };
      listeners.add(check); later(check);
      return () => { dead = true; listeners.delete(check); };
    },
    onChild(p, cb) {
      const seen = new Set(); let dead = false;
      const check = () => {
        if (dead) return; const v = read(p) || {};
        for (const k of [...seen]) if (!(k in v)) seen.delete(k);
        for (const k of Object.keys(v).sort()) if (!seen.has(k)) { seen.add(k); cb(k, v[k]); }
      };
      listeners.add(check); later(check);
      return () => { dead = true; listeners.delete(check); };
    },
    onConnect(cb) { later(cb); return () => {}; },
    disconnectSet: async (p, v) => { dcs.set(p, v); },
    cancelDisconnect: async (p) => { dcs.delete(p); },
    transaction: async (p, fn) => {
      const nv = fn(read(p)); if (nv === undefined) return false;
      emit({ path: p, value: nv }); return true;
    },
  };
}
