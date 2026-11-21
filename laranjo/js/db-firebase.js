import { initializeApp } from 'https://www.gstatic.com/firebasejs/10.14.1/firebase-app.js';
import { getAuth, signInAnonymously } from 'https://www.gstatic.com/firebasejs/10.14.1/firebase-auth.js';
import {
  getDatabase, ref, set, update, remove, push, get, onValue, onChildAdded,
  onDisconnect, runTransaction,
} from 'https://www.gstatic.com/firebasejs/10.14.1/firebase-database.js';

export async function create(cfg) {
  const app = initializeApp(cfg);
  const auth = getAuth(app);
  const rtdb = getDatabase(app);
  const cred = await signInAnonymously(auth);
  const uid = cred.user.uid;

  let offset = 0;
  onValue(ref(rtdb, '.info/serverTimeOffset'), (s) => { offset = s.val() || 0; });

  const R = (p) => ref(rtdb, p);
  return {
    uid,
    serverNow: () => Date.now() + offset,
    get: async (p) => (await get(R(p))).val(),
    set: (p, v) => set(R(p), v),
    update: (p, o) => update(R(p), o),
    remove: (p) => remove(R(p)),
    push: async (p, v) => { const r = push(R(p)); await set(r, v); return r.key; },
    on: (p, cb) => onValue(R(p), (s) => cb(s.val())),
    onChild: (p, cb) => onChildAdded(R(p), (s) => cb(s.key, s.val())),
    onConnect: (cb) => onValue(R('.info/connected'), (s) => { if (s.val() === true) cb(); }),
    disconnectSet: (p, v) => onDisconnect(R(p)).set(v),
    cancelDisconnect: (p) => onDisconnect(R(p)).cancel(),
    transaction: async (p, fn) => (await runTransaction(R(p), (cur) => fn(cur === undefined ? null : cur))).committed,
  };
}
