/* Provas de áudio dos casos comuns: o arquivo só toca depois que o Dr. José recupera na Perícia (laudo lido);
   a transcrição abre depois da primeira escuta completa. Definição em C.gravs = {idDaProva:{src,dur,nome,transc}} */
(function(){
const has=id=>!!(typeof C!=='undefined'&&C&&!C.esp&&C.gravs&&C.gravs[id]&&!(typeof MENU!=='undefined'&&MENU));
const heard=()=>(S.gph=S.gph||[]);
const mm=t=>{t=Math.max(0,Math.round(t||0));return Math.floor(t/60)+':'+String(t%60).padStart(2,'0')};
const IPL='<svg class=ecs1 viewBox="0 0 24 24"><path d="M8 5.5v13l11-6.5z" fill="currentColor"/></svg>',IPA='<svg class=ecs1 viewBox="0 0 24 24"><rect x="6.5" y="5" width="4" height="14" rx="1" fill="currentColor"/><rect x="13.5" y="5" width="4" height="14" rx="1" fill="currentColor"/></svg>';
let A=null,CUR=null;
const stop=()=>{try{if(A){A.pause();A.removeAttribute('src');A.load()}}catch(e){}CUR=null};
const trans=t=>esc(t).split('\n').map(l=>/^\[som:/.test(l)?`<i class=ecs>🔊 ${l.replace(/^\[som:\s*|\]$/g,'')}</i>`:`<span>${l}</span>`).join('<br>');
function ui(id){const c=C.gravs[id],cl=CL[id],e=espEl('gprv','duo-m');e.style.zIndex=2200;
const un=S.an.includes(id),hd=heard().includes(id),g=S.inv.includes(id),lk=(S.ld||[]).includes(id);
const status=un?'':`<div class=ecbox><small>🔒 GRAVAÇÃO LACRADA</small><p class=mut>${lk?'O Dr. José já recuperou o arquivo. Leia o laudo na conversa com ele para ouvir.':'O arquivo está protegido. Envie esta prova para a Perícia: o Dr. José precisa recuperar a gravação.'}</p></div>`;
const player=un?`<div class=ecbarw><div class=ecbar id=gpbar></div></div><div class=ecctl><button id=gppl class=ecplay onclick="gpPlay('${id}')" aria-label="Tocar ou pausar">${IPL}</button><button class=ecagain onclick="gpAgain('${id}')" aria-label="Ouvir de novo">↺</button><span id=gptm>0:00 / ${mm(c.dur)}</span></div><div class=ecbox>${hd?`<small>📝 TRANSCRIÇÃO</small><p>${trans(c.transc)}</p>`:'<small>🔒 TRANSCRIÇÃO</small><p class=mut>Ouça a gravação até o fim, uma vez, para abrir a transcrição.</p>'}</div>`:status;
e.innerHTML=`<div class="dcard espfs ecw"><div class=esphd><div style="flex:1"><b>${esc(c.nome||cl.n)}</b><small>🎧 Gravação · ${mm(c.dur)}</small></div><button class=dcx onclick="gpClose()" aria-label="Fechar">✕</button></div><div class=espfl><svg class=ecart viewBox="0 0 240 180">${art(id)}</svg><p class=mut style="margin:8px 0 10px">${un?"Arquivo das 20h40, recuperado pelo Dr. José.":esc(cl.d)}</p>${player}<button class=btn style="width:100%;margin-top:6px" ${g?'disabled':''} onclick="grab('${id}');gpUi('${id}')">${g?'Registrado · EV-'+String(S.inv.indexOf(id)+1).padStart(2,'0'):'Coletar'}</button></div></div>`}
window.gpUi=ui;
window.gpClose=()=>{stop();espDel('gprv');try{render()}catch(e){}};
const tick=()=>{if(!A||!CUR)return;const b=document.getElementById('gpbar'),t=document.getElementById('gptm'),p=document.getElementById('gppl'),d=A.duration||C.gravs[CUR].dur;if(b)b.style.width=Math.min(100,A.currentTime/d*100)+'%';if(t)t.textContent=mm(A.currentTime)+' / '+mm(d);if(p)p.innerHTML=(!A.paused&&!A.ended)?IPA:IPL};
window.gpPlay=id=>{if(!S.an.includes(id))return;if(!A){A=new Audio();A.addEventListener('timeupdate',tick);A.addEventListener('pause',tick);A.addEventListener('play',tick);A.addEventListener('ended',()=>{const id=CUR;if(id&&!heard().includes(id)){heard().push(id);try{save()}catch(e){}ui(id)}tick()})}
if(CUR===id&&A.src){if(A.paused||A.ended){if(A.ended)A.currentTime=0;A.play().catch(()=>{})}else A.pause();tick();return}
CUR=id;A.src=C.gravs[id].src;A.currentTime=0;A.play().catch(()=>{});tick()};
window.gpAgain=id=>{if(!S.an.includes(id))return;if(!A||CUR!==id){gpPlay(id);return}A.currentTime=0;A.play().catch(()=>{});tick()};
const _in=window.insp;window.insp=function(id){if(has(id)){ui(id);return}return _in.apply(this,arguments)};
})();
