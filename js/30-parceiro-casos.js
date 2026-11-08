/* ===== Parceiro nos casos principais: palpites em momentos livres, mesma mecânica dos Casos rápidos ===== */
window.MX={pp:null,pop:0,rx:null,cho:0};
const ptmPal=()=>(typeof PLP!=='undefined'&&C&&PLP[C.id])||[];
const ptmFree=()=>!(MENU||!C||RM||S.call||V||T||S.typing||S.seen<4||ND||Date.now()<QOK||CUT||PLO||SET||GAL||GD||HT||FIN||(S.mq&&S.mq.length)||window.MG||window.RQ||window.TM||LVO||(typeof ONS!=='undefined'&&ONS));
function ptmWhen(q){const w=q.quando;if(w.n!=null)return S.asked.length>=w.n;if(w.ask)return S.asked.includes(w.ask);if(w.an)return S.an.includes(w.an);return false}
function ptmCheck(){if(!C||MX.pp||MX.pop||MX.rx||!ptmFree())return;const L=ptmPal();if(!L.length||!ptId()||PTM().no[C.id])return;S.pal=S.pal||{};
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
window.ptTakeFree=cost=>{if(!cost||!C||PTM().no[C.id])return cost;if(S.pfu||S.pfw||!ptId()||ptConf()<70)return cost;S.pfu=1;return 0};
const ptmView=()=>{if(MENU||!C)return '';let h='';
if(MX.cho)h=`<div class=rqmd><div class=rqmc><small>SEU PARCEIRO</small><h3>Escolha seu parceiro</h3><p class=rqp style="margin:0 0 8px">Ele dá palpites durante os casos. Às vezes acerta, às vezes erra: você decide quando confiar.</p>${PTD.map(p=>ptCard(p,false,`ptmSet('${p.id}')`)).join('')}<button class="rqbtn gh" onclick="ptmSkip()">Agora não</button></div></div>`;
else if(MX.rx){const x=MX.rx,p=ptD(x.id);h=`<div class=rqmd><div class=rqmc style="text-align:center"><div style="display:flex;justify-content:center">${ptAv(p.id,96,x.expr)}</div><h3>${p.nome} ${p.sobrenome}</h3><p>${esc(p.falas[x.fala])}</p>${x.d?`<p class=rqp style="margin:4px 0">Confiança ${x.d>0?'+':''}${x.d} · agora ${ptConf(p.id)}</p>`:''}${x.prova?`<div class=rqok style="text-align:left"><small>PROVA SUGERIDA</small><p><b>${esc(x.prova.n)}</b><br>${esc(x.prova.t)}</p></div>`:''}${(x.ach||[]).map(a=>`<div class=rqok style="text-align:left"><small>NOVA CONQUISTA</small><p>${esc(a)}</p></div>`).join('')}<button class=rqbtn onclick="ptmRx()">Continuar</button></div></div>`}
else if(MX.pop&&MX.pp){const p=ptD(),q=ptmPal().find(x=>x.id===MX.pp);h=`<div class=rqmd><div class=rqmc><small>PALPITE DE ${p.nome.toUpperCase()}</small><div style="display:flex;gap:12px;align-items:center;margin:6px 0">${ptAv(p.id,64,'n')}<p style="margin:0;font-style:italic">“${esc(q.texto[p.id])}”</p></div><p class=rqp>O que você faz?</p><button class=rqbtn style="margin-top:0" onclick="ptmAns('confiar')">Confiar</button><button class="rqbtn gh" onclick="ptmAns('prova')">Pedir uma prova</button><button class="rqbtn gh" onclick="ptmAns('discordar')">Discordar</button></div></div>`}
else if(MX.pp){const p=ptD();h=`<button class="rqnotif ptmb" onclick="ptmPop(1)">${ptAv(p.id,34,'n')}<span><small>MENSAGEM DE ${p.nome.toUpperCase()}</small>Tenho um palpite sobre o caso. Toque para ler.</span></button>`}
return h?`<div class=ptmain>${h}</div>`:''};
{const _r=render;render=function(){_r.apply(this,arguments);try{if(!window.RQ&&!window.TM&&!MENU&&C){ptmCheck();const u=$('#ui');const v=ptmView();if(u&&u.insertAdjacentHTML&&v)u.insertAdjacentHTML('beforeend',v)}}catch(e){}}}

/* pergunta antes de iniciar cada caso: parceiro ou sem parceiro */
window.MXQ=null;
window.ptmStart=(id,fr)=>{const asked=PTM().q[id];if(asked&&!fr||typeof PTD==='undefined'){startCase(id,fr);return}MXQ={id,fr:fr||0};render()};
window.ptmQ=k=>{const q=MXQ;if(!q)return;PTM().q[q.id]=1;if(k==='none')PTM().no[q.id]=1;else{delete PTM().no[q.id];PTM().id=k}msave();MXQ=null;startCase(q.id,q.fr)};
window.ptmQx=()=>{MXQ=null;render()};
const ptmQView=()=>{if(!MXQ)return '';const c=CASES.find(x=>x.id===MXQ.id);return `<div class=ptmain><div class=rqmd><div class=rqmc><small>ANTES DE COMEÇAR</small><h3>Quer um parceiro neste caso?</h3><p class=rqp style="margin:0 0 8px">${c?esc(c.n)+'. ':''}O parceiro dá palpites durante o caso. Às vezes acerta, às vezes erra: você decide quando confiar. Você pode jogar sem ele.</p>${PTD.map(p=>ptCard(p,ptId()===p.id,`ptmQ('${p.id}')`)).join('')}<button class="rqbtn gh" onclick="ptmQ('none')">Jogar sem parceiro</button><button class="rqbtn gh" onclick="ptmQx()">Voltar</button></div></div></div>`};
{const _r=render;render=function(){_r.apply(this,arguments);try{if(MXQ){const u=$('#ui');const v=ptmQView();if(u&&u.insertAdjacentHTML&&v)u.insertAdjacentHTML('beforeend',v)}}catch(e){}}}

/* fechamento: comentário do parceiro no fim do caso e final da temporada */
const ptLvlK=c=>c>=70?'alta':c<=30?'baixa':'media';
const ptSeasonId=()=>{const h=PTM().hist,n={};h.forEach(x=>n[x.pa]=(n[x.pa]||0)+1);const best=Object.keys(n).sort((a,b)=>n[b]-n[a])[0];return best||ptId()};
const ptAllDone=()=>CASES.every(c=>META.done[c.id]);
window.ptEpi=()=>{if(!C||!ptId()||PTM().no[C.id])return '';const id=ptId(),p=ptD(id),k=ptLvlK(ptConf(id)),last=C.id===CASES[CASES.length-1].id&&ptAllDone();
return `<div class=ptfin style="justify-content:center;margin:10px 0;text-align:left">${ptAv(id,52,k==='alta'?'a':k==='baixa'?'e':'n')}<p style="margin:0;font:400 13px/1.45 Arial">“${esc(PTF[id].caso[k])}”</p></div>${last?'<button class=btn style="padding:10px 18px;margin-bottom:8px" onclick="event.stopPropagation();ptSeasonOpen()">Ver o final da temporada</button>':''}`};
window.MXS=0;
window.ptSeasonOpen=()=>{if(!ptSeasonId())return;MXS=1;render()};
window.ptSeasonClose=()=>{MXS=0;render()};
const ptSeasonView=()=>{if(!MXS)return '';const id=ptSeasonId();if(!id)return '';const p=ptD(id),c=ptConf(id),lv=c>=70?'forte':c<=30?'fria':'neutra',nome={forte:'Parceria forte',neutra:'Parceria neutra',fria:'Parceria fria'}[lv];
return `<div class=ptmain style="z-index:500"><div class=rqmd><div class=rqmc style="text-align:center"><small>FIM DA TEMPORADA</small><div style="display:flex;justify-content:center;margin:8px 0">${ptAv(id,110,lv==='forte'?'a':lv==='fria'?'e':'n')}</div><h3>${p.nome} ${p.sobrenome}</h3><div class=rqlb>${nome} · confiança ${c} de 100</div><p style="text-align:left">${esc(PTF[id].temp[lv])}</p><button class=rqbtn onclick="ptSeasonClose()">Fechar</button></div></div></div>`};
{const _r=render;render=function(){_r.apply(this,arguments);try{if(MXS){const u=$('#ui'),v=ptSeasonView();if(u&&u.insertAdjacentHTML&&v)u.insertAdjacentHTML('beforeend',v)}}catch(e){}}}
window.ptAllDoneP=()=>ptAllDone()&&!!ptSeasonId();
