/* ===== Rede para os modos em dois celulares =====
   Camada isolada: o jogo só fala com NET (init, uid, criar, entrar, set, push, on, onAdd, presenca, remover).
   Firebase carrega só quando alguém abre uma sala; o jogo solo continua sem internet.
   Para testes existe um modo local (window.NETMOCK = true) que usa localStorage. */
window.NET=(()=>{
const CFG={apiKey:"AIzaSyDcAsYVovuUfoClGDK0a52SWvvs3OFno1s",authDomain:"sisp-mobile.firebaseapp.com",databaseURL:"https://sisp-mobile-default-rtdb.firebaseio.com",projectId:"sisp-mobile",storageBucket:"sisp-mobile.firebasestorage.app",messagingSenderId:"332434598081",appId:"1:332434598081:web:7abb4d122c47ac81474c40"};
const V='10.12.2';let uid=null,db=null,ready=null;
const mock=()=>!!window.NETMOCK;
const load=src=>new Promise((ok,er)=>{const s=document.createElement('script');s.src=src;s.onload=ok;s.onerror=()=>er(new Error('Sem conexão com o servidor.'));document.head.appendChild(s)});
function init(){if(ready)return ready;ready=(async()=>{
if(mock()){try{uid=sessionStorage.getItem('netmock-uid')||('m'+Math.random().toString(36).slice(2,10));sessionStorage.setItem('netmock-uid',uid)}catch(e){uid='m'+Math.random().toString(36).slice(2,10)}return}
if(!navigator.onLine)throw new Error('Sem internet.');
if(!window.firebase){await load(`https://www.gstatic.com/firebasejs/${V}/firebase-app-compat.js`);await load(`https://www.gstatic.com/firebasejs/${V}/firebase-auth-compat.js`);await load(`https://www.gstatic.com/firebasejs/${V}/firebase-database-compat.js`)}
if(!firebase.apps.length)firebase.initializeApp(CFG);
const a=firebase.auth();if(!a.currentUser)await a.signInAnonymously();uid=a.currentUser.uid;db=firebase.database()})().catch(e=>{ready=null;throw e});return ready}

/* --- modo local de teste --- */
const MK='netmock',L=[];
const mdb=()=>{try{return JSON.parse(localStorage.getItem(MK))||{}}catch(e){return{}}};
const mget=(o,p)=>p.split('/').filter(Boolean).reduce((x,k)=>x==null?undefined:x[k],o);
const mset=(o,p,v)=>{const ks=p.split('/').filter(Boolean);let x=o;ks.slice(0,-1).forEach(k=>{if(x[k]==null||typeof x[k]!=='object')x[k]={};x=x[k]});if(v===null||v===undefined)delete x[ks[ks.length-1]];else x[ks[ks.length-1]]=v;return o};
const mnotify=()=>{L.slice().forEach(l=>l())};
window.addEventListener('storage',e=>{if(e.key===MK)mnotify()});
const mwrite=(p,v)=>{const o=mdb();mset(o,p,v);localStorage.setItem(MK,JSON.stringify(o));mnotify()};

const api={
init,uid:()=>uid,
criar(cod,obj){if(mock()){if(mget(mdb(),'salas/'+cod))return Promise.reject(new Error('PERMISSION_DENIED'));mwrite('salas/'+cod,obj);return Promise.resolve()}return db.ref('salas/'+cod).set(obj)},
entrar(cod,p2){if(mock()){const s=mget(mdb(),'salas/'+cod);if(!s)return Promise.reject(new Error('PERMISSION_DENIED'));if(s.p2&&s.p2.u!==uid)return Promise.reject(new Error('PERMISSION_DENIED'));mwrite(`salas/${cod}/p2`,p2);return Promise.resolve()}return db.ref(`salas/${cod}/p2`).set(p2)},
set(cod,path,val){if(mock()){mwrite(`salas/${cod}/${path}`,val);return Promise.resolve()}return db.ref(`salas/${cod}/${path}`).set(val)},
push(cod,path,val){if(mock()){const k='e'+Date.now().toString(36)+Math.random().toString(36).slice(2,6);mwrite(`salas/${cod}/${path}/${k}`,val);return Promise.resolve()}return db.ref(`salas/${cod}/${path}`).push(val)},
remover(cod,path){if(mock()){mwrite(`salas/${cod}/${path}`,null);return Promise.resolve()}return db.ref(`salas/${cod}/${path}`).remove()},
on(cod,path,cb){if(mock()){let last;const f=()=>{const v=mget(mdb(),`salas/${cod}/${path}`),j=JSON.stringify(v===undefined?null:v);if(j!==last){last=j;cb(v===undefined?null:v)}};L.push(f);setTimeout(f,0);return()=>{const i=L.indexOf(f);if(i>=0)L.splice(i,1)}}
const r=db.ref(`salas/${cod}/${path}`),h=r.on('value',s=>cb(s.val()),()=>cb(null));return()=>r.off('value',h)},
onAdd(cod,path,cb){if(mock()){const seen={};const f=()=>{const v=mget(mdb(),`salas/${cod}/${path}`)||{};Object.keys(v).sort().forEach(k=>{if(!seen[k]){seen[k]=1;cb(k,v[k])}})};L.push(f);setTimeout(f,0);return()=>{const i=L.indexOf(f);if(i>=0)L.splice(i,1)}}
const r=db.ref(`salas/${cod}/${path}`),h=r.on('child_added',s=>cb(s.key,s.val()));return()=>r.off('child_added',h)},
presenca(cod){if(mock()){mwrite(`salas/${cod}/on/${uid}`,true);const bye=()=>{try{const o=mdb();mset(o,`salas/${cod}/on/${uid}`,null);localStorage.setItem(MK,JSON.stringify(o))}catch(e){}};window.addEventListener('pagehide',bye);return()=>{bye();window.removeEventListener('pagehide',bye)}}
const c=db.ref('.info/connected'),me=db.ref(`salas/${cod}/on/${uid}`),h=c.on('value',s=>{if(s.val()===true){me.onDisconnect().remove();me.set(true)}});return()=>{c.off('value',h);me.remove()}}
};
return api})();
