/* ===== Cooperativo em dois celulares (casos principais) =====
   Cada celular tem um papel fixo (Campo ou Perícia). O estado do caso é espelhado: cada um grava a própria cópia
   (s1 / s2) e junta a do outro (união das listas), então nada se perde mesmo com os dois jogando ao mesmo tempo. */
window.COOP={on:0,cod:null,me:0,host:0,names:['',''],p1u:null,p2u:null,r:0,k:null,conn:[0,0],feed:[],offs:[],st:'home',err:'',busy:0,un:0,pushed:'',pend:null,t0:0,seen:{},end:0,mine:0,myName:'',joinK:null,chat:0,accGo:null};
const CKEY='sisp-coop',COD='ABCDEFGHJKLMNPQRSTUVWXYZ23456789';
const coopCode=()=>Array.from({length:5},()=>COD[Math.floor(Math.random()*COD.length)]).join('');
const coopSaveLS=()=>{try{localStorage.setItem(CKEY,JSON.stringify({cod:COOP.cod,me:COOP.me,host:COOP.host,n:COOP.myName}))}catch(e){}};
const coopMy=()=>COOP.names[COOP.me]||COOP.myName||'Você';
const coopOther=()=>COOP.names[1-COOP.me]||'Parceiro(a)';
const coopErr=m=>{COOP.err=m;COOP.busy=0;coopMod()};
const coopNm=()=>{const i=document.getElementById('cn');return((i&&i.value)||COOP.myName||(META.pl&&META.pl.n)||'').trim().slice(0,14)};

/* ---------- salas ---------- */
window.coopCreate=async()=>{const n=coopNm();if(!n)return coopErr('Escreva o seu nome.');COOP.myName=n;COOP.err='';COOP.busy=1;coopMod();
try{await NET.init();let ok=0;for(let i=0;i<6&&!ok;i++){const cod=coopCode();try{await NET.criar(cod,{c:Date.now(),m:'coop',r:Math.random()<.5?0:1,p1:{u:NET.uid(),n}});COOP.cod=cod;ok=1}catch(e){if(!/PERMISSION/i.test(String(e&&e.message)))throw e}}
if(!ok)throw new Error('Não consegui criar a sala. Tente de novo.');COOP.me=0;COOP.host=1;coopAttach()}catch(e){coopErr(coopMsg(e))}};
window.coopJoin=async()=>{const n=coopNm(),i=document.getElementById('cc'),cod=((i&&i.value)||'').toUpperCase().replace(/[^A-Z0-9]/g,'');if(!n)return coopErr('Escreva o seu nome.');if(cod.length!==5)return coopErr('O código tem 5 letras ou números.');COOP.myName=n;COOP.err='';COOP.busy=1;coopMod();
try{await NET.init();try{await NET.entrar(cod,{u:NET.uid(),n})}catch(e){if(/PERMISSION/i.test(String(e&&e.message)))throw new Error('Sala não encontrada, ou já tem duas pessoas.');throw e}COOP.cod=cod;COOP.me=1;COOP.host=0;coopAttach()}catch(e){coopErr(coopMsg(e))}};
const coopMsg=e=>{const m=String(e&&e.message||e);return /Sala n|Sem internet|Sem conex|Escreva|Não consegui/.test(m)?m:'Sem conexão com o servidor. Confira a internet e tente de novo.'};
function coopAttach(){COOP.on=1;COOP.busy=0;COOP.st='lobby';COOP.t0=Date.now()-8000;COOP.seen={};COOP.end=0;COOP.mine=0;COOP.pushed='';COOP.pend=null;COOP.err='';coopSaveLS();
if(!DUO.on)duoOn();DUO.net=1;try{localStorage.setItem('sisp-modo','net')}catch(e){}
const c=COOP.cod,o=COOP.offs;o.forEach(f=>{try{f()}catch(e){}});o.length=0;
o.push(NET.on(c,'p1',v=>{COOP.names[0]=v?v.n:'';COOP.p1u=v&&v.u;coopCheck();coopMeta()}));
o.push(NET.on(c,'p2',v=>{COOP.names[1]=v?v.n:'';COOP.p2u=v&&v.u;coopCheck();coopMeta()}));
o.push(NET.on(c,'r',v=>{if(v!=null)COOP.r=v;coopMeta()}));
o.push(NET.on(c,'k',v=>{COOP.k=v;coopK()}));
o.push(NET.on(c,'on',v=>{v=v||{};COOP.conn=[COOP.p1u&&v[COOP.p1u]?1:0,COOP.p2u&&v[COOP.p2u]?1:0];coopMeta()}));
o.push(NET.on(c,'s'+(2-COOP.me),v=>{if(typeof v==='string'){try{COOP.pend=JSON.parse(v)}catch(e){}}}));
o.push(NET.onAdd(c,'ev',coopEv));
o.push(NET.presenca(c));
render();coopMod()}
function coopCheck(){}
window.coopLeave=(silent)=>{COOP.offs.forEach(f=>{try{f()}catch(e){}});COOP.offs.length=0;COOP.on=0;COOP.cod=null;COOP.k=null;COOP.names=['',''];COOP.conn=[0,0];COOP.feed=[];COOP.un=0;COOP.st='home';COOP.err='';DUO.net=0;try{localStorage.removeItem(CKEY)}catch(e){}
if(DUO.on)duoOff();const h=document.getElementById('coopm');if(h)h.remove();const ch=document.getElementById('coopch');if(ch)ch.remove();if(!silent)render()};
async function coopResume(){let s;try{s=JSON.parse(localStorage.getItem(CKEY))}catch(e){}if(!s||!s.cod)return;try{await NET.init();COOP.cod=s.cod;COOP.me=s.me;COOP.host=s.host;COOP.myName=s.n||'';coopAttach();COOP.st='lobby';const m=document.getElementById('coopm');if(m)m.remove()}catch(e){/* sem rede agora: tenta de novo mais tarde */setTimeout(coopResume,15000)}}

/* ---------- início do caso ---------- */
function coopK(){if(!COOP.on)return;if(COOP.k&&!COOP.host){const id=String(COOP.k).slice(2),inCase=C&&!MENU&&C.id===id&&!window.RQ&&!window.TM;if(!inCase&&CASES.some(c=>c.id===id)){COOP.joinK=id;COOP.st='lobby';coopMod()}}coopMeta()}
window.coopEnter=()=>{const id=COOP.joinK;if(!id)return;COOP.joinK=null;COOP.end=0;COOP.mine=0;COOP.pushed='';const m=document.getElementById('coopm');if(m)m.remove();window.RQ=null;window.TM=null;ARQ=0;startCase(id)};
{const _sc=startCase;startCase=function(id,fr){if(COOP.on&&COOP.host){COOP.end=0;COOP.mine=0;COOP.pushed='';NET.set(COOP.cod,'k','c:'+id).catch(()=>{})}return _sc.apply(this,arguments)}}
if(window.ptmStart){const _pm=window.ptmStart;window.ptmStart=function(id,fr){if(COOP.on){if(!COOP.host){tst('Quem criou a sala escolhe o caso.');return}startCase(id,fr);return}return _pm.apply(this,arguments)}}
['rqOpen','tlOpen'].forEach(n=>{const f=window[n];if(f)window[n]=function(){if(COOP.on){tst('Em dois celulares, por enquanto só os casos principais.');return}return f.apply(this,arguments)}});
/* só a Perícia faz o laboratório andar; só o Campo recebe ligações */
{const _lp=labPoll;labPoll=function(){if(COOP.on){const a=duoAct();if(a&&duoHolderRole(a,duoSes(a))!==1)return}return _lp.apply(this,arguments)}}
{const _cc=callchk;callchk=function(){if(COOP.on){const a=duoAct();if(a&&duoHolderRole(a,duoSes(a))!==0)return}return _cc.apply(this,arguments)}}

/* ---------- espelho do estado ---------- */
const SH_A=['inv','an','asked','ded','ct','reg'],SH_N=['tick','clock','strikes','hints','cterr'],SH_B=['won','dec'];
function coopSnap(a){const o={k:a.id};SH_A.forEach(k=>{if(Array.isArray(S[k]))o[k]=S[k]});SH_N.forEach(k=>{if(typeof S[k]==='number')o[k]=S[k]});SH_B.forEach(k=>{o[k]=S[k]?1:0});o.log=(S.log||[]).slice(0,30);o.c=duoSes(a).c[COOP.me]||{};return o}
function coopMerge(r,a){const z=duoSes(a);let ch=0;const key=x=>typeof x==='object'?JSON.stringify(x):x,s0=S.strikes||0;
SH_A.forEach(k=>{if(!Array.isArray(r[k]))return;S[k]=S[k]||[];const have=new Set(S[k].map(key));r[k].forEach(x=>{if(!have.has(key(x))){S[k].push(x);ch=1}})});
SH_N.forEach(k=>{if(typeof r[k]==='number'&&r[k]>(S[k]||0)){S[k]=r[k];ch=1}});
SH_B.forEach(k=>{if(r[k]&&!S[k]){S[k]=1;ch=1}});
if(Array.isArray(r.log)){const have=new Set((S.log||[]).map(key));const nw=r.log.filter(x=>!have.has(key(x)));if(nw.length){S.log=nw.concat(S.log||[]);ch=1}}
if(r.c&&JSON.stringify(z.c[1-COOP.me]||{})!==JSON.stringify(r.c)){z.c[1-COOP.me]=r.c;ch=1}
if((S.strikes||0)>s0&&!S.won)tst('❌ Mandado negado. Tentativas: '+S.strikes+'/3');
return ch}
function coopLoop(){if(!COOP.on||!COOP.cod)return;const a=duoAct();if(!a||a.k!=='c'||COOP.joinK)return;
if(COOP.pend&&COOP.pend.k===a.id){const r=COOP.pend;COOP.pend=null;if(coopMerge(r,a)){save();duoRebase();render()}}
const sn=coopSnap(a);let j=JSON.stringify(sn);if(j.length>58000){sn.log=[];j=JSON.stringify(sn)}
if(j!==COOP.pushed){COOP.pushed=j;NET.set(COOP.cod,'s'+(COOP.me+1),j).catch(()=>{COOP.pushed=''})}
if(S.won&&!COOP.end&&!CUT&&!V){COOP.end=1;if(!COOP.mine){tst('🎉 Caso resolvido!');DUO.sb=1;duoTick()}}}
setInterval(()=>{try{coopLoop()}catch(e){}},1000);
window.duoRebase=()=>{const a=duoAct();if(!a)return;const z=duoSes(a);z.last=duoCnt(a,z)};

/* ---------- eventos: acusação em conjunto e chat ---------- */
function coopEv(id,e){if(!COOP.on||!e||COOP.seen[id]||e.u===NET.uid()||(e.t||0)<COOP.t0)return;COOP.seen[id]=1;
if(e.k==='ch'){COOP.feed.push({n:coopOther(),x:e.x,t:e.t});COOP.un++;tst('💬 '+coopOther()+': '+e.x);coopChatUi();duoTick()}
else if(e.k==='acc'){DUO.conf={net:1,st:'r',txt:e.x};duoTick()}
else if(e.k==='ok'){if(DUO.conf&&DUO.conf.net&&DUO.conf.st==='w'){const g=COOP.accGo;DUO.conf=null;COOP.accGo=null;COOP.mine=1;DUO.ok=1;duoTick();if(g)g()}}
else if(e.k==='no'){if(DUO.conf&&DUO.conf.net){const w=DUO.conf.st==='w';DUO.conf=null;COOP.accGo=null;if(w)tst(coopOther()+' ainda não concorda com a acusação.');duoTick()}}}
window.coopAcc=(txt,go)=>{COOP.accGo=go;DUO.conf={net:1,st:'w',txt};NET.push(COOP.cod,'ev',{u:NET.uid(),t:Date.now(),k:'acc',x:String(txt).slice(0,80)}).catch(()=>{});duoTick()};
window.coopAnswer=ok=>{const c=DUO.conf;if(!c)return;DUO.conf=null;NET.push(COOP.cod,'ev',{u:NET.uid(),t:Date.now(),k:ok?'ok':'no'}).catch(()=>{});duoTick()};
const PHR=['Descobri algo importante!','Estou analisando uma prova.','Preciso que você analise uma prova.','Um suspeito mudou a versão.','Achei uma contradição!','Vamos acusar?','Concordo.','Ainda não concordo.','Estou travado(a). Alguma ideia?','Calma, vamos juntar as peças.'];
const coopSend=x=>{x=String(x).slice(0,240);NET.push(COOP.cod,'ev',{u:NET.uid(),t:Date.now(),k:'ch',x}).catch(()=>{});COOP.feed.push({n:'Você',x,t:Date.now()});coopChatUi()};
window.coopSay=i=>coopSend(PHR[i]);
window.coopShare=i=>{const L=coopShares();if(L[i])coopSend(L[i])};
function coopShares(){const a=duoAct();if(!a||a.k!=='c')return[];const rl=duoHolderRole(a,duoSes(a));
if(rl===0)return (S.asked||[]).filter(q=>TS[q]).slice(-12).map(q=>'Depoimento de '+TS[q].s+': '+TS[q].t);
return (S.an||[]).slice(-12).map(id=>'Laudo — '+CL[id].n+': '+(CL[id].h?'sem relação com o crime.':RES[id]))}
window.coopChat=()=>{COOP.chat=1;COOP.un=0;DUO.role=0;DUO.sb=0;coopChatUi();duoTick()};
window.coopChatX=()=>{COOP.chat=0;coopChatUi();duoTick()};
function coopChatUi(){let e=document.getElementById('coopch');if(!COOP.chat||!COOP.on){if(e)e.remove();return}
if(!e){e=document.createElement('div');e.id='coopch';e.className='duo-m';e.style.zIndex=1960;document.body.appendChild(e)}
const sh=coopShares();
e.innerHTML=`<div class=dcard style="text-align:left;max-height:92vh;overflow:auto"><small>CONVERSA COM ${esc(coopOther().toUpperCase())}</small><h2 style="font-size:20px;margin-bottom:8px">Mensagens</h2><div class=cfeed>${COOP.feed.length?COOP.feed.slice(-12).map(m=>`<div class="cmsg ${m.n==='Você'?'me':''}"><b>${esc(m.n)}</b>${esc(m.x)}</div>`).join(''):'<p class=dsm>Nenhuma mensagem ainda. Toque numa frase para enviar.</p>'}</div><p class=dsm style="margin:10px 0 6px">Frases rápidas</p><div class=cph>${PHR.map((p,i)=>`<button onclick="coopSay(${i})">${esc(p)}</button>`).join('')}</div>${sh.length?`<p class=dsm style="margin:12px 0 6px">Compartilhar o que você descobriu</p><div class=cph>${sh.map((p,i)=>`<button onclick="coopShare(${i})">${esc(p.length>90?p.slice(0,88)+'…':p)}</button>`).join('')}</div>`:''}<button class="dbtn gh" onclick="coopChatX()">Fechar</button></div>`;
const f=e.querySelector('.cfeed');if(f)f.scrollTop=f.scrollHeight}

/* ---------- janelas ---------- */
function coopMeta(){if(document.getElementById('coopm'))coopMod()}
window.coopOpen=()=>{COOP.err='';COOP.st=COOP.on?'lobby':'home';coopMod()};
window.coopClose=()=>{const m=document.getElementById('coopm');if(m)m.remove()};
window.coopSt=s=>{COOP.st=s;COOP.err='';coopMod()};
window.coopRoll=()=>{if(!COOP.host)return;NET.set(COOP.cod,'r',Math.random()<.5?0:1).catch(()=>{})};
function coopMod(){let e=document.getElementById('coopm');if(!e){e=document.createElement('div');e.id='coopm';e.className='duo-m';document.body.appendChild(e)}
const nm=COOP.myName||(META.pl&&META.pl.n)||'',err=COOP.err?`<p class=cerr>${esc(COOP.err)}</p>`:'',busy=COOP.busy?'<p class=dsm>Conectando…</p>':'';
let h;
if(COOP.on&&COOP.st==='lobby'){const dot=i=>COOP.conn[i]?'<i class="cdot on"></i>':'<i class=cdot></i>',n0=COOP.names[0],n1=COOP.names[1],both=n0&&n1,R=DUOR.c;
h=`<div class=dcard style="text-align:left"><small>DOIS CELULARES · SALA</small><div class=ccod>${esc(COOP.cod)}</div><p class=dsm style="text-align:center;margin:-4px 0 12px">${COOP.host?'Passe este código para a outra pessoa.':'Você entrou nesta sala.'}</p>
<div class=dpr>${dot(0)}<div><b>${esc(n0||'—')}${COOP.me===0?' (você)':''}</b><span>${both?R[COOP.r===0?0:1].n:'Criou a sala'}</span></div></div>
<div class=dpr>${dot(1)}<div><b>${esc(n1||'Aguardando…')}${COOP.me===1&&n1?' (você)':''}</b><span>${n1?R[COOP.r===0?1:0].n:'Ainda não entrou'}</span></div></div>
${COOP.joinK?`<button class=dbtn onclick="coopEnter()">Entrar no caso: ${esc((CASES.find(c=>c.id===COOP.joinK)||{n:''}).n)}</button>`:''}
<p class=dsm>${both?(COOP.host?'Cada um recebe um papel diferente e vê só a sua parte do caso. Fechem esta janela, abram o Arquivo e escolham o caso.':'O papel de cada um está acima. Quando quem criou a sala escolher o caso, ele aparece aqui para você entrar.'):'Quando a outra pessoa entrar, vocês poderão escolher o caso.'}</p>
${COOP.host&&both?'<button class="dbtn gh" onclick="coopRoll()">Sortear os papéis de novo</button>':''}<button class=dbtn onclick="coopClose()">Fechar</button><button class="dbtn gh" onclick="if(confirm('Sair da sala?'))coopLeave()">Sair da sala</button></div>`}
else if(COOP.st==='join')h=`<div class=dcard style="text-align:left"><small>ENTRAR EM UMA SALA</small><label class=dlb>Seu nome<input id=cn maxlength=14 value="${esc(nm)}"></label><label class=dlb>Código da sala (5 letras ou números)<input id=cc maxlength=5 autocapitalize=characters style="text-transform:uppercase;letter-spacing:.3em;text-align:center;font-size:22px"></label>${err}${busy}<button class=dbtn onclick="coopJoin()">Entrar</button><button class="dbtn gh" onclick="coopSt('home')">Voltar</button></div>`;
else h=`<div class=dcard style="text-align:left"><small>JOGAR EM DOIS CELULARES</small><h2 style="margin-bottom:6px">Cooperativo</h2><p class=dsm style="margin-top:0">Cada um joga no seu celular, com um papel diferente (Campo ou Perícia). Só resolvem conversando. Precisa de internet.</p><label class=dlb>Seu nome<input id=cn maxlength=14 value="${esc(nm)}"></label>${err}${busy}<button class=dbtn onclick="coopCreate()">Criar uma sala</button><button class="dbtn gh" onclick="coopSt('join')">Entrar com um código</button><button class="dbtn gh" onclick="coopClose()">Voltar</button></div>`;
e.innerHTML=h}
window.coopHow=()=>{let e=document.getElementById('coopm');if(!e){e=document.createElement('div');e.id='coopm';e.className='duo-m';document.body.appendChild(e)}
e.innerHTML=`<div class=dcard style="text-align:left"><small>JOGAR EM DUPLA</small><h2 style="margin-bottom:10px">Como vocês vão jogar?</h2><button class=dopt onclick="coopClose();duoStartRev()"><b>No mesmo celular</b><span>Revezam o aparelho. Não precisa de internet.</span></button><button class=dopt onclick="coopOpen()"><b>Em dois celulares</b><span>Cada um no seu, com um papel diferente. Precisa de internet.</span></button><p class=dsm>O progresso em dupla fica separado do seu jogo solo.</p><button class="dbtn gh" onclick="coopClose()">Voltar</button></div>`};
window.duoPick=k=>{if(!k){if(COOP.on)coopLeave(1);else duoOff();render();return}if(COOP.on){coopOpen();return}coopHow()};
{const _ds=duoSel;duoSel=function(){if(!COOP.on)return _ds.apply(this,arguments);return `<div class=dpsel><div class=dpseg><button onclick="duoPick(0)">Sozinho</button><button class=on onclick="duoPick(1)">Em dupla</button></div><div class=dpinf><span><i class="cdot ${COOP.conn[0]?'on':''}"></i>${esc(COOP.names[0]||'—')}</span><span><i class="cdot ${COOP.conn[1]?'on':''}"></i>${esc(COOP.names[1]||'…')}</span><small>Dois celulares · sala ${esc(COOP.cod)}</small><button onclick="coopOpen()">Abrir sala</button></div></div>`}}
setTimeout(()=>{try{if(localStorage.getItem(CKEY))coopResume()}catch(e){}},600);
