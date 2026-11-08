/* ===== Parceiro nos casos principais: palpites em momentos livres, mesma mecânica dos Casos rápidos ===== */
window.MX={pp:null,pop:0,rx:null,cho:0};
const ptmPal=()=>(typeof PLP!=='undefined'&&C&&PLP[C.id])||[];
const ptmFree=()=>!(MENU||!C||RM||S.call||V||T||S.typing||S.seen<4||ND||Date.now()<QOK||CUT||PLO||SET||GAL||GD||HT||FIN||(S.mq&&S.mq.length)||window.MG||window.RQ||window.TM||LVO||(typeof ONS!=='undefined'&&ONS));
function ptmWhen(q){const w=q.quando;if(w.n!=null)return S.asked.length>=w.n;if(w.ask)return S.asked.includes(w.ask);if(w.an)return S.an.includes(w.an);return false}
function ptmCheck(){if(!C||MX.pp||MX.pop||MX.rx||MX.cho||!ptmFree())return;const L=ptmPal();if(!L.length)return;S.pal=S.pal||{};
if(!ptId()){if(!PTM().ask&&L.some(q=>!S.pal[q.id]&&ptmWhen(q))){PTM().ask=1;msave();MX.cho=1}return}
for(const q of L){if(S.pal[q.id])continue;if(!ptmWhen(q))continue;if(ptSilent()){S.pal[q.id]='calado';save();continue}MX.pp=q.id;break}}
window.ptmSet=id=>{const first=!ptId();PTM().id=id;msave();MX.cho=0;MX.rx={id,fala:'boas_vindas',expr:'a',ach:[]};render()};
window.ptmSkip=()=>{MX.cho=0;render()};
window.ptmPop=v=>{MX.pop=v;render()};
function ptmProva(q){const x=CL[q.prova];if(!x)return null;const has=S.inv.includes(q.prova);const lo=LO.find(l=>l.c.some(c=>c[0]===q.prova));return {n:x.n,t:has?(x.d||''):('Ainda não temos essa prova. Procure em '+(lo?lo.n:'outro local')+'.')}}
window.ptmAns=k=>{const q=ptmPal().find(x=>x.id===MX.pp),pt=PTM(),id=ptId(),cor=q.correto;let d=0,fala='',expr='n',ok=null,pr=null;
if(k==='confiar'){ok=cor;d=ok?10:-10;fala=ok?'confiou_certo':'confiou_errado';expr=ok?'a':'e';if(!ok)S.pfw=1}
else if(k==='prova'){d=10;fala='pediu_prova';pr=ptmProva(q)}
else{ok=!cor;d=ok?10:-5;fala=ok?'discordou_certo':'discordou_errado';expr=ok?'e':'a'}
pt.conf[id]=Math.max(0,Math.min(100,pt.conf[id]+d));pt.hist.push({c:C.id,p:q.id,pa:id,k,ok});if(pt.hist.length>40)pt.hist.shift();
S.pal[q.id]=k;if(S.pfree===undefined)S.pfree=0;MX.pp=null;MX.pop=0;MX.rx={id,fala,expr,prova:pr,ach:ptAch(),d};msave();save();render()};
window.ptmRx=()=>{MX.rx=null;ptmCheck();render()};
window.ptTakeFree=cost=>{if(!cost||!C)return cost;if(S.pfu||S.pfw||!ptId()||ptConf()<70)return cost;S.pfu=1;return 0};
const ptmView=()=>{if(MENU||!C)return '';let h='';
if(MX.cho)h=`<div class=rqmd><div class=rqmc><small>SEU PARCEIRO</small><h3>Escolha seu parceiro</h3><p class=rqp style="margin:0 0 8px">Ele dá palpites durante os casos. Às vezes acerta, às vezes erra: você decide quando confiar.</p>${PTD.map(p=>ptCard(p,false,`ptmSet('${p.id}')`)).join('')}<button class="rqbtn gh" onclick="ptmSkip()">Agora não</button></div></div>`;
else if(MX.rx){const x=MX.rx,p=ptD(x.id);h=`<div class=rqmd><div class=rqmc style="text-align:center"><div style="display:flex;justify-content:center">${ptAv(p.id,96,x.expr)}</div><h3>${p.nome} ${p.sobrenome}</h3><p>${esc(p.falas[x.fala])}</p>${x.d?`<p class=rqp style="margin:4px 0">Confiança ${x.d>0?'+':''}${x.d} · agora ${ptConf(p.id)}</p>`:''}${x.prova?`<div class=rqok style="text-align:left"><small>PROVA SUGERIDA</small><p><b>${esc(x.prova.n)}</b><br>${esc(x.prova.t)}</p></div>`:''}${(x.ach||[]).map(a=>`<div class=rqok style="text-align:left"><small>NOVA CONQUISTA</small><p>${esc(a)}</p></div>`).join('')}<button class=rqbtn onclick="ptmRx()">Continuar</button></div></div>`}
else if(MX.pop&&MX.pp){const p=ptD(),q=ptmPal().find(x=>x.id===MX.pp);h=`<div class=rqmd><div class=rqmc><small>PALPITE DE ${p.nome.toUpperCase()}</small><div style="display:flex;gap:12px;align-items:center;margin:6px 0">${ptAv(p.id,64,'n')}<p style="margin:0;font-style:italic">“${esc(q.texto[p.id])}”</p></div><p class=rqp>O que você faz?</p><button class=rqbtn style="margin-top:0" onclick="ptmAns('confiar')">Confiar</button><button class="rqbtn gh" onclick="ptmAns('prova')">Pedir uma prova</button><button class="rqbtn gh" onclick="ptmAns('discordar')">Discordar</button></div></div>`}
else if(MX.pp){const p=ptD();h=`<button class="rqnotif ptmb" onclick="ptmPop(1)">${ptAv(p.id,34,'n')}<span><small>MENSAGEM DE ${p.nome.toUpperCase()}</small>Tenho um palpite sobre o caso. Toque para ler.</span></button>`}
return h?`<div class=ptmain>${h}</div>`:''};
{const _r=render;render=function(){_r.apply(this,arguments);try{if(!window.RQ&&!window.TM&&!MENU&&C){ptmCheck();const u=$('#ui');const v=ptmView();if(u&&u.insertAdjacentHTML&&v)u.insertAdjacentHTML('beforeend',v)}}catch(e){}}}
