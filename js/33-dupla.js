/* ===== Modo dupla: Revezamento (um celular, duas pessoas) =====
   Regra: o jogo solo não muda. Em dupla, o progresso fica em outro lugar
   (META.duo.store e chaves '-duo'), trocado por baixo dos panos. */
const DUOF=['rq','tl','p','done','rk','last'];
window.DUO={on:0,stash:null,shown:{},lc:{},sg:{},conf:null,mode:0,setup:null,sb:0,t0:{}};
const DUOCOL=['#eaa73c','#4aa3df','#d86a8a','#5fbf7a','#9a7ad8','#e8e0d0'];
const DU=()=>{const d=META.duo=META.duo||{};d.ses=d.ses||{};d.store=d.store||{};return d};
const duoCfg=()=>DU().cfg||null;
const duoPl=i=>{const c=duoCfg();return c?c.j[i]:{n:'Jogador '+(i+1),c:DUOCOL[i]}};

/* guarda o progresso da dupla separado do solo */
{const _si=Storage.prototype.setItem;Storage.prototype.setItem=function(k,v){if(k==='sisp-meta'&&DUO.on&&DUO.stash){try{const o=JSON.parse(v);o.duo=o.duo||{};o.duo.store={};DUOF.forEach(f=>o.duo.store[f]=o[f]);DUOF.forEach(f=>{if(DUO.stash[f]===undefined)delete o[f];else o[f]=DUO.stash[f]});v=JSON.stringify(o)}catch(e){}}return _si.call(this,k,v)}}
function duoOn(){if(DUO.on)return;const st=DU().store||{};DUO.stash={};DUOF.forEach(k=>DUO.stash[k]=META[k]);
META.rq=st.rq||{done:{},prog:{}};META.tl=st.tl||{done:{},prog:{}};META.p=st.p||{};META.done=st.done||{};META.rk=st.rk||{};if(st.last===undefined)delete META.last;else META.last=st.last;
DUO.on=1;try{localStorage.setItem('sisp-modo','dupla')}catch(e){}}
function duoOff(){if(!DUO.on)return;const d=DU();d.store={};DUOF.forEach(k=>d.store[k]=META[k]);DUOF.forEach(k=>{if(DUO.stash[k]===undefined)delete META[k];else META[k]=DUO.stash[k]});DUO.on=0;DUO.stash=null;try{localStorage.setItem('sisp-modo','solo')}catch(e){}msave()}
{const _sc=startCase;startCase=function(id,fr){const c=CASES.find(x=>x.id===id);if(c){if(!c.k0)c.k0=c.key;c.key=DUO.on?c.k0+'-duo':c.k0}if(DUO.on&&fr)delete DU().ses['c:'+id];return _sc.apply(this,arguments)}}
{const _rp=window.rqReplay;if(_rp)window.rqReplay=function(){if(DUO.on&&RQ)delete DU().ses['r:'+RQ.id];return _rp.apply(this,arguments)}}
{const _tp=window.tlReplay;if(_tp)window.tlReplay=function(){if(DUO.on&&TM)delete DU().ses['t:'+TM.id];return _tp.apply(this,arguments)}}

/* atividade atual: caso comum, caso rápido ou linha do tempo */
function duoAct(){if(!DUO.on||!duoCfg())return null;
if(window.RQ&&RQ.v==='main')return{k:'r',id:RQ.id,key:'r:'+RQ.id};
if(window.TM&&TM.v==='main')return{k:'t',id:TM.id,key:'t:'+TM.id};
if(!window.RQ&&!window.TM&&C&&!MENU)return{k:'c',id:C.id,key:'c:'+C.id};return null}
const duoSes=a=>{const d=DU(),z=d.ses[a.key]=d.ses[a.key]||{t:0,n:0,pass:0,c:[{},{}],last:null,sb:0};return z};
function duoCnt(a,z){
if(a.k==='c'){const lc=DUO.lc[a.key];if(lc===undefined)DUO.lc[a.key]=S.loc;else if(lc!==S.loc){DUO.lc[a.key]=S.loc;z.vv=(z.vv||0)+1}return{q:S.asked.length,e:S.inv.length,a:S.an.length,v:z.vv||0}}
if(a.k==='r')return{q:RQ.asked.length,e:RQ.inv.length};
const sg=TM.order.join();if(DUO.sg[a.key]===undefined)DUO.sg[a.key]=sg;else if(DUO.sg[a.key]!==sg){DUO.sg[a.key]=sg;z.mm=(z.mm||0)+1}return{e:(TM.read||[]).length,m:z.mm||0}}
function duoFree(a){if(a.k==='c')return ptmFree()&&!window.MX.pp&&!window.MX.rx&&!window.MX.pop&&!window.MXQ&&!S.typing;
if(a.k==='r')return !(RQ.pop||RQ.rx||RQ.cho||RQ.how||RQ.pv||RQ.fin);
return !(TM.how||TM.rc||TM.sv!=null||TM.dr||TM.fin)}
const duoDone=a=>a.k==='c'?!!S.won:a.k==='r'?!!(RQ.fin&&RQ.fin.ok):!!(TLM().done[a.id]&&TM.fin);
const DUOLBL={q:['interrogatório','interrogatórios'],e:['prova','provas'],a:['análise','análises'],v:['local visitado','locais visitados'],m:['ajuste na ordem','ajustes na ordem']};
const DUOLBLT={e:['pista lida','pistas lidas']};
const duoTxt=(a,c)=>{const L=a.k==='t'?Object.assign({},DUOLBL,DUOLBLT):DUOLBL,r=[];Object.keys(L).forEach(k=>{if(c[k])r.push(c[k]+' '+L[k][c[k]===1?0:1])});return r.join(' · ')||'ainda sem descobertas'};
const duoTot=c=>Object.keys(c).reduce((s,k)=>s+(c[k]||0),0);

function duoTick(){const a=duoAct();let hud=document.getElementById('duohud');
if(!a){duoOv(null);if(hud)hud.remove();return}
const d=DU(),z=duoSes(a),cur=duoCnt(a,z);
if(!z.last){z.last=cur}
else{let ch=0;Object.keys(cur).forEach(k=>{const dl=(cur[k]||0)-(z.last[k]||0);if(dl>0){z.c[z.t][k]=(z.c[z.t][k]||0)+dl;z.n+=dl;ch=1}z.last[k]=cur[k]});if(ch){const ev=d.cfg.ev;if(z.n>=ev)z.pass=1;msave()}}
const free=duoFree(a);
let ov=null;
if(DUO.conf)ov='conf';else if(!DUO.shown[a.key])ov='pass0';else if(z.pass&&free)ov='pass';else if(DUO.sb)ov='sb';
duoOv(ov,a,z);
if(duoDone(a)&&!z.sb&&!ov){DUO.t0[a.key]=DUO.t0[a.key]||Date.now();if(Date.now()-DUO.t0[a.key]>3500){z.sb=1;msave();DUO.sb=1;duoTick();return}}
/* indicador de vez */
if(!ov){const p=duoPl(z.t),ev=d.cfg.ev,left=Math.max(0,ev-z.n);const h=`<span class=dh-d style="background:${p.c}"></span><b>${esc(p.n)}</b><small>${z.pass?'passe o celular':left+(left===1?' ação':' ações')}</small>`;
if(!hud){hud=document.createElement('button');hud.id='duohud';hud.onclick=()=>{DUO.sb=1;duoTick()};document.body.appendChild(hud)}
if(hud.dataset.h!==h){hud.dataset.h=h;hud.innerHTML=h}}else if(hud)hud.remove()}

/* tela cheia: passagem do celular, placar, confirmação */
function duoOv(kind,a,z){let e=document.getElementById('duoov');const sig=kind&&kind+'|'+(z?z.t+'|'+z.n:'')+'|'+(DUO.conf?DUO.conf.st:'')+'|'+DUO.sb;
if(!kind){if(e)e.remove();return}
if(e&&e.dataset.s===sig)return;
if(!e){e=document.createElement('div');e.id='duoov';document.body.appendChild(e)}
e.dataset.s=sig;const nxt=1-z.t;let h='';
const badge=(p,s)=>`<span class=dbd style="background:${p.c};width:${s||64}px;height:${s||64}px;font-size:${(s||64)*.45}px">${esc((p.n||'?').trim().charAt(0).toUpperCase())}</span>`;
if(kind==='pass0'){const p=duoPl(z.t);h=`<div class=dcard>${badge(p)}<small>VEZ DE</small><h2>${esc(p.n)}</h2><p>Só ${esc(p.n)} deve olhar a tela agora. ${duoCfg().ev} ações e o celular passa para ${esc(duoPl(nxt).n)}.</p><button class=dbtn onclick="duoGo('pass0')">Sou ${esc(p.n)} · Continuar</button></div>`}
else if(kind==='pass'){const p=duoPl(nxt);h=`<div class=dcard>${badge(p)}<small>PASSE O CELULAR PARA</small><h2>${esc(p.n)}</h2><p>A tela está escondida. Quando ${esc(p.n)} estiver com o celular, é só tocar.</p><button class=dbtn onclick="duoGo('pass')">Sou ${esc(p.n)} · Continuar</button></div>`}
else if(kind==='sb'){const ca=z.c[0],cb=z.c[1],ta=duoTot(ca),tb=duoTot(cb),pa=duoPl(0),pb=duoPl(1),fin=duoDone(a);
const row=(p,c,t)=>`<div class=dpr>${badge(p,40)}<div><b>${esc(p.n)}</b><span>${duoTxt(a,c)}</span></div><em>${t}</em></div>`;
const lead=ta===tb?'Vocês contribuíram igualmente.':(ta>tb?pa:pb).n+' trouxe mais descobertas.';
h=`<div class=dcard><small>${fin?'CASO ENCERRADO · ':''}PLACAR DA DUPLA</small><h2>${fin?'Bom trabalho, dupla!':'Contribuições até agora'}</h2>${row(pa,ca,ta)}${row(pb,cb,tb)}<p>${lead}</p><button class=dbtn onclick="DUO.sb=0;duoTick()">Fechar</button></div>`}
else if(kind==='conf'){const c=DUO.conf,p=duoPl(c.who),q=duoPl(1-c.who);
if(c.st===0)h=`<div class=dcard>${badge(q)}<small>PASSE O CELULAR PARA</small><h2>${esc(q.n)}</h2><p>${esc(p.n)} quer fazer uma acusação e precisa da sua opinião. Em dupla, a acusação só sai se os dois concordarem.</p><button class=dbtn onclick="duoConf(1)">Sou ${esc(q.n)} · Ver a acusação</button><button class="dbtn gh" onclick="duoConf(9)">Cancelar</button></div>`;
else h=`<div class=dcard>${badge(p)}<small>ACUSAÇÃO PROPOSTA POR ${esc(p.n.toUpperCase())}</small><h2>${esc(c.txt)}</h2><p>${esc(q.n)}, você concorda com essa acusação?</p><button class=dbtn onclick="duoConf(2)">Concordo, acusar</button><button class="dbtn gh" onclick="duoConf(9)">Ainda não</button></div>`}
e.innerHTML=h}
window.duoGo=k=>{const a=duoAct();if(!a)return;const z=duoSes(a);DUO.shown[a.key]=1;if(k==='pass'){z.t=1-z.t;z.n=0;z.pass=0;msave()}try{AU.fx&&AU.fx('tick')}catch(e){}duoTick()};

/* acusação em conjunto */
function duoAsk(txt,go){DUO.conf={who:0,st:0,txt,go};const a=duoAct();DUO.conf.who=a?duoSes(a).t:0;duoTick()}
window.duoConf=k=>{const c=DUO.conf;if(!c)return;if(k===1){c.st=1}else if(k===9){DUO.conf=null}else if(k===2){const go=c.go;DUO.conf=null;DUO.ok=1;duoTick();go()}duoTick()};
{const _ac=accuse;accuse=function(){if(!DUO.on||DUO.ok||!C){DUO.ok=0;return _ac.apply(this,arguments)}
const two=!!C.two,xq=C.xq||[],A=S.accs||[];if(!S.wp||!S.mo||(two?A.length!==2:!S.acc)||(C.vic&&!S.vic)||xq.some(q=>!S['x_'+q[0]]))return _ac.apply(this,arguments);
const all=C.SUALL||SU,nm=id=>{const x=all.find(z=>z.id===id);return x?x.n||x.nome||id:id};
duoAsk('Acusar '+(two?A.map(nm).join(' e '):nm(S.acc)),()=>accuse())}}
{const _ra=window.rqAcc;if(_ra)window.rqAcc=function(){if(!DUO.on||DUO.ok||!window.RQ||!RQ.acc){DUO.ok=0;return _ra.apply(this,arguments)}
const c=rqC(RQ.id);duoAsk('Acusar '+rqSu(c,RQ.acc).nome,()=>window.rqAcc())}}

/* seletor Sozinho / Em dupla (início e Arquivo) */
function duoSel(){if(window.PLO||window.GAL)return '';const on=DUO.on&&duoCfg(),c=duoCfg();
return `<div class=dpsel><div class=dpseg><button class="${on?'':'on'}" onclick="duoPick(0)">Sozinho</button><button class="${on?'on':''}" onclick="duoPick(1)">Em dupla</button></div>${on?`<div class=dpinf><span><i style="background:${c.j[0].c}"></i>${esc(c.j[0].n)}</span><span><i style="background:${c.j[1].c}"></i>${esc(c.j[1].n)}</span><small>Revezamento · troca a cada ${c.ev} ações</small><button onclick="duoEdit()">Mudar</button></div>`:''}</div>`}
window.duoPick=k=>{if(!k){duoOff();render();return}DUO.mode=1;duoMod()};
function duoMod(){let e=document.getElementById('duomod');if(e)e.remove();if(!DUO.mode&&!DUO.setup)return;e=document.createElement('div');e.id='duomod';e.className='duo-m';
if(DUO.setup){const s=DUO.setup;e.innerHTML=`<div class=dcard style="text-align:left"><small>REVEZAMENTO · UM CELULAR</small><h2 style="margin-bottom:10px">Quem vai jogar?</h2>${[0,1].map(i=>`<label class=dlb>Jogador ${i+1}<input id=dn${i} maxlength=14 value="${esc(s.j[i].n)}" oninput="DUO.setup.j[${i}].n=this.value"></label><div class=dcol>${DUOCOL.map(c=>`<button class="${s.j[i].c===c?'on':''}" style="background:${c}" onclick="DUO.setup.j[${i}].c='${c}';duoMod()"></button>`).join('')}</div>`).join('')}<label class=dlb>O celular passa a cada…</label><div class=dev>${[2,3,4,5].map(n=>`<button class="${s.ev===n?'on':''}" onclick="DUO.setup.ev=${n};duoMod()">${n} ações</button>`).join('')}</div><p class=dsm>Contam: perguntar, achar prova, analisar, visitar um local.</p><button class=dbtn onclick="duoSave()">Começar a jogar em dupla</button><button class="dbtn gh" onclick="DUO.setup=null;duoMod()">Cancelar</button></div>`}
else e.innerHTML=`<div class=dcard style="text-align:left"><small>JOGAR EM DUPLA</small><h2 style="margin-bottom:10px">Como vocês querem jogar?</h2><button class=dopt onclick="duoStartRev()"><b>Revezamento</b><span>Um celular, duas pessoas. O aparelho passa de mão em mão. Não precisa de internet.</span></button><button class="dopt off" disabled><b>Cooperativo <i>EM BREVE</i></b><span>Dois celulares, cada um vê uma parte do caso.</span></button><button class="dopt off" disabled><b>Competitivo <i>EM BREVE</i></b><span>Dois celulares, a mesma investigação em corrida.</span></button><p class=dsm>O progresso em dupla fica separado do seu jogo solo.</p><button class="dbtn gh" onclick="DUO.mode=0;duoMod()">Voltar</button></div>`;
document.body.appendChild(e)}
window.duoStartRev=()=>{DUO.mode=0;const c=duoCfg();if(c){duoOn();duoMod();render();return}duoEdit()};
window.duoEdit=()=>{const c=duoCfg();DUO.mode=0;DUO.setup=c?JSON.parse(JSON.stringify(c)):{j:[{n:(META.pl&&META.pl.n)||'Jogador 1',c:DUOCOL[0]},{n:'Jogador 2',c:DUOCOL[1]}],ev:3};duoMod()};
window.duoSave=()=>{const s=DUO.setup;if(!s)return;s.j.forEach((p,i)=>{p.n=(p.n||'').trim()||'Jogador '+(i+1)});if(s.j[0].n.toLowerCase()===s.j[1].n.toLowerCase())s.j[1].n+=' 2';DU().cfg={j:s.j,ev:s.ev};DUO.setup=null;duoOn();msave();duoMod();render()};

/* ligação com a tela */
{const _r=render;render=function(){_r.apply(this,arguments);try{
if((MENU||!C)&&!window.RQ&&!window.TM){const u=$('#ui');if(u){const h=u.querySelector('.hbt');if(h&&!h.querySelector('.dpsel'))h.insertAdjacentHTML('afterbegin',duoSel());const ar=u.querySelector('.arh');if(ar&&!u.querySelector('.dpsel'))ar.insertAdjacentHTML('afterend',duoSel())}}
duoTick()}catch(e){}}}
setInterval(()=>{try{duoTick()}catch(e){}},600);
try{if(localStorage.getItem('sisp-modo')==='dupla'&&duoCfg()){duoOn();render()}}catch(e){}
