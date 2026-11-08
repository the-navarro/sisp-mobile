/* ===== Casos rápidos: lista, telas e regras (usa os dados de casos/rapidos.js) ===== */
window.RQ=null;let RQT=0;
const RQM=()=>{META.rq=META.rq||{done:{},prog:{}};META.rq.done=META.rq.done||{};META.rq.prog=META.rq.prog||{};return META.rq};
const rqC=id=>RQC.find(c=>c.id===id);
const rqAv=(c,s,sz)=>av('rq_'+s,sz||52);
const rqSu=(c,id)=>c.suspeitos.find(s=>s.id===id);
const rqStars=n=>[1,2,3].map(i=>`<svg viewBox="0 0 24 24" class="rqst ${i<=n?'on':''}"><path d="M12 2.8l2.8 5.9 6.4.8-4.7 4.4 1.2 6.4L12 17.2 6.3 20.3l1.2-6.4L2.8 9.5l6.4-.8z"/></svg>`).join('');
const RQIC={su:'<circle cx=9 cy=8 r=3.2 /><path d="M3 19c0-3.5 2.7-5.5 6-5.5s6 2 6 5.5" /><circle cx=17 cy=9 r=2.5 /><path d="M17 14c2.6 0 4.5 1.6 4.5 4.5" />',pr:'<circle cx=10.5 cy=10.5 r=5.5 /><path d="M15 15l5.5 5.5" />',cv:'<path d="M4 5h16v11H9l-5 4z" />',ac:'<path d="M12 4v16M6 20h12M5 7h14" /><path d="M5 7l-3 7a3 3 0 006 0zM19 7l-3 7a3 3 0 006 0z" />'};
const rqIcon=k=>`<svg viewBox="0 0 24 24" aria-hidden=true>${RQIC[k]}</svg>`;
const rqAsked=(s,i)=>RQ.asked.includes(s+':'+i);
const rqLib=p=>RQ.inv.includes(p);
function rqOn(c,p){const d=p.disponivel;if(d==='inicio')return true;if(rqLib(p.id))return true;if(d==='apos_primeiro_interrogatorio')return RQ.asked.length>0;const m=/^apos_([a-z]+)_q(\d)$/.exec(d);if(m)return rqAsked(m[1],+m[2]-1);return false}
const rqProvas=c=>c.provas.filter(p=>rqOn(c,p));
function rqSave(){const r=RQM();r.prog[RQ.id]={asked:RQ.asked,inv:RQ.inv,seen:RQ.seen,hint:RQ.hint,ct:RQ.ct,pal:RQ.pal,free:RQ.free,pno:RQ.pno};msave()}
const rqPt=()=>ptId()&&!RQ.pno;
const rqPaid=()=>Math.max(0,RQ.hint-(RQ.free&&rqPt()?1:0));
window.rqDone=()=>RQC.filter(c=>RQM().done[c.id]).length;
window.rqTabs=()=>`<div class=rqt><button class="${RQT===0?'on':''}" onclick="RQT=0;render()">Principais</button><button class="${RQT===1?'on':''}" onclick="RQT=1;render()">Rápidos <small>${rqDone()}/${RQC.length}</small></button><button class="${RQT===2?'on':''}" onclick="RQT=2;render()">Linha do tempo</button></div>`;
window.rqList=()=>`<p class="mut rqsub">Casos curtos para jogar em poucos minutos: 3 suspeitos, 4 provas e uma contradição. Sem relógio. <b>${rqDone()} de ${RQC.length} concluídos.</b></p>${RQC.map(c=>{const d=RQM().done[c.id],p=RQM().prog[c.id],st=d?'Concluído':(p&&(p.asked.length||p.seen))?'Em andamento':'Novo';return `<button class=rqcard onclick="rqOpen('${c.id}')"><span class=rqcs><img src="assets/casos/mini_${c.id}.webp" alt="" loading=lazy draggable=false></span><span class=rqci><b>${esc(c.titulo)}</b><small>${esc(c.cenario.local.split(',')[0])}</small><span class=rqcf>${c.suspeitos.map(s=>rqAv(c,s.id,26)).join('')}<em class="${d?'ok':''}">${d?rqStars(d):st}</em></span></span></button>`}).join('')}`;
window.rqOpen=id=>{const c=rqC(id),p=RQM().prog[id];RQ={id,asked:p?p.asked.slice():[],inv:p?p.inv.slice():[],seen:p?p.seen:0,hint:p?p.hint:0,ct:p?p.ct:0,tab:'su',su:null,sel:{},acc:null,fin:null,pv:null,hs:0,res:0,v:p&&p.seen?'main':'intro',nw:[],err:0,pal:p&&p.pal?Object.assign({},p.pal):{},free:p&&p.free!==undefined?p.free:!!(ptFree()&&!PTM().no[id]),pp:null,pop:0,rx:null,pf:0,cho:PTM().q[id]?0:1,pno:p&&p.pno!==undefined?p.pno:(PTM().no[id]?1:0)};if(p&&p.seen&&(p.asked.length||p.ct))RQ.res=1;render()};
window.rqStart=()=>{RQ.v='main';RQ.seen=1;rqSave();rqPal();render()};
window.rqExit=()=>{RQ=null;render()};
window.rqTab=t=>{if(RQ.tab==='pr'&&t!=='pr')RQ.nw=[];RQ.tab=t;RQ.sb='top';RQ.err=0;render()};
window.rqSuP=s=>{RQ.su=s;RQ.tab='cv';RQ.sb='end';render()};
window.rqAsk=(s,i)=>{const c=rqC(RQ.id);if(rqAsked(s,i))return;RQ.asked.push(s+':'+i);const q=c.interrogatorio[s][i];if(q.libera_prova&&!rqLib(q.libera_prova)){RQ.inv.push(q.libera_prova);RQ.nw.push(q.libera_prova)}rqSave();rqPal();RQ.sb='end';render()};
window.rqPv=p=>{RQ.pv=p;render()};
window.rqHs=v=>{RQ.hs=v;render()};
window.rqHint=()=>{const c=rqC(RQ.id);if(RQ.hint<c.dicas.length){RQ.hint++;rqSave()}render()};
window.rqSel=(k,v)=>{RQ.sel[k]=v;if(k==='s')RQ.sel.a=undefined;RQ.err=0;render()};
window.rqCheck=()=>{const c=rqC(RQ.id),x=RQ.sel,k=c.contradicao,q=x.s&&x.a!=null?c.interrogatorio[x.s][x.a]:null;if(q&&x.s===k.suspeito&&q.registra_afirmacao===k.afirmacao&&x.p===k.prova){RQ.ct=1;RQ.err=0;AU.fx&&AU.fx('chime');rqSave()}else{RQ.err=1;RQ.sb='end'}render()};
window.rqPick=s=>{RQ.acc=s;render()};
window.rqAcc=()=>{const c=rqC(RQ.id);if(RQ.acc===c.solucao.culpado){const st=Math.max(1,3-rqPaid()),r=RQM();r.done[c.id]=Math.max(r.done[c.id]||0,st);delete r.prog[c.id];msave();RQ.fin={ok:1,st};AU.fx&&AU.fx('chime')}else RQ.fin={ok:0};render()};
window.rqRetry=()=>{RQ.fin=null;RQ.acc=null;render()};
window.rqReplay=()=>{const id=RQ.id;delete RQM().prog[id];msave();rqOpen(id)};
function rqStmts(c,s){return c.interrogatorio[s].map((q,i)=>({q,i})).filter(o=>rqAsked(s,o.i))}
function rqBody(c){
const T=RQ.tab;
if(T==='su')return `<h2 class=rqh2>Suspeitos</h2><p class=rqp>Toque em um suspeito para conversar com ele.</p>${c.suspeitos.map(s=>{const n=rqStmts(c,s.id),reg=n.filter(o=>o.q.registra_afirmacao);return `<button class=rqsu onclick="rqSuP('${s.id}')">${rqAv(c,s.id,56)}<span><b>${esc(s.nome)}</b><small>${esc(s.papel)} · ${s.idade} anos</small><em>${esc(s.perfil)}</em><i>${n.length} de 2 perguntas feitas</i></span></button>${reg.length?reg.map(o=>`<div class=rqreg><small>FALA REGISTRADA</small>“${esc(o.q.resposta)}”</div>`).join(''):''}`}).join('')}`;
if(T==='pr'){const L=rqProvas(c);return `<h2 class=rqh2>Provas</h2><p class=rqp>${L.length} de ${c.provas.length} provas encontradas. Toque para ver.</p><div class=rqgr>${L.map(p=>`<button class="rqpr ${RQ.nw.includes(p.id)?'nw':''}" onclick="rqPv('${p.id}')">${rqIl(c.id+p.id)}<b>${esc(p.nome)}</b></button>`).join('')}</div>${L.length<c.provas.length?'<p class=rqp style="text-align:center;margin-top:14px">Converse com os suspeitos para encontrar mais provas.</p>':''}`}
if(T==='cv'){const s=RQ.su||c.suspeitos[0].id,su=rqSu(c,s),H=c.interrogatorio[s];return `<div class=rqch>${c.suspeitos.map(x=>`<button class="${x.id===s?'on':''}" onclick="rqSuP('${x.id}')" aria-label="${esc(x.nome)}">${rqAv(c,x.id,40)}<span>${esc(x.nome.split(' ')[0])}</span></button>`).join('')}</div><div class=rqchat id=rqchat><div class=rqwho>${esc(su.nome)} · ${esc(su.papel)}</div>${H.map((q,i)=>rqAsked(s,i)?`<div class=rqbq>${esc(q.pergunta)}</div><div class=rqba>${rqAv(c,s,30)}<p>${esc(q.resposta)}</p></div>${q.libera_prova?`<div class=rqnt>Nova prova no caderno: <b>${esc(c.provas.find(p=>p.id===q.libera_prova).nome)}</b></div>`:''}`:'').join('')}${H.every((q,i)=>rqAsked(s,i))?'<p class=rqp style="text-align:center">Não há mais perguntas para este suspeito.</p>':''}</div><div class=rqask>${H.map((q,i)=>rqAsked(s,i)?'':`<button onclick="rqAsk('${s}',${i})">${esc(q.pergunta)}</button>`).join('')}</div>`}
/* acusar */
const k=c.contradicao,x=RQ.sel,L=rqProvas(c);let h=`<h2 class=rqh2>Acusar</h2>`;
if(RQ.ct){const q=c.interrogatorio[k.suspeito].find(q=>q.registra_afirmacao===k.afirmacao);h+=`<div class=rqok><small>CONTRADIÇÃO CONFIRMADA</small><p>${esc(k.explicacao)}</p></div>`}
else{h+=`<p class=rqp><b>1.</b> Marque a contradição: escolha o suspeito, a fala dele e a prova que a desmente.</p><div class=rqsl>${c.suspeitos.map(s=>`<button class="${x.s===s.id?'on':''}" onclick="rqSel('s','${s.id}')">${rqAv(c,s.id,34)}<span>${esc(s.nome.split(' ')[0])}</span></button>`).join('')}</div>`;
if(x.s){const st=rqStmts(c,x.s);h+=st.length?`<div class=rqlb>Fala</div>${st.map(o=>`<button class="rqopt ${x.a===o.i?'on':''}" onclick="rqSel('a',${o.i})">“${esc(o.q.resposta)}”</button>`).join('')}`:'<p class=rqp>Converse com este suspeito primeiro.</p>'}
if(x.s&&x.a!=null){h+=`<div class=rqlb>Prova</div><div class=rqgr>${L.map(p=>`<button class="rqpr ${x.p===p.id?'on':''}" onclick="rqSel('p','${p.id}')">${rqIl(c.id+p.id)}<b>${esc(p.nome)}</b></button>`).join('')}</div>`}
if(x.s&&x.a!=null&&x.p)h+=`<button class="rqbtn" onclick="rqCheck()">Confirmar contradição</button>`;
if(RQ.err)h+=`<div class=rqer>Essa prova não desmente essa fala. Tente outra combinação.</div>`}
h+=`<p class=rqp style="margin-top:18px"><b>2.</b> Quem é o culpado?</p>`;
if(!RQ.ct)h+=`<p class="rqp rqlock">Disponível depois de confirmar a contradição.</p>`;
else h+=`<div class=rqsl>${c.suspeitos.map(s=>`<button class="${RQ.acc===s.id?'on':''}" onclick="rqPick('${s.id}')">${rqAv(c,s.id,34)}<span>${esc(s.nome.split(' ')[0])}</span></button>`).join('')}</div>${RQ.acc?`<button class="rqbtn" onclick="rqAcc()">Acusar ${esc(rqSu(c,RQ.acc).nome)}</button>`:''}`;
return h}
function rqModals(c){let m='';
if(RQ.res){const p=rqProvas(c).length;m+=`<div class=rqmd><div class=rqmc><small>RESUMO DE ONDE VOCÊ PAROU</small><h3>${esc(c.titulo)}</h3><p>Provas: ${p} de ${c.provas.length}<br>Perguntas feitas: ${RQ.asked.length} de 6<br>Contradição: ${RQ.ct?'confirmada':'ainda não marcada'}<br>Dicas usadas: ${RQ.hint} de ${c.dicas.length}</p><button class=rqbtn onclick="RQ.res=0;rqPal();render()">Continuar</button></div></div>`}
if(RQ.pv){const p=c.provas.find(x=>x.id===RQ.pv);m+=`<div class=rqmd onclick="rqPv(null)"><div class=rqmc onclick="event.stopPropagation()">${rqIl(c.id+p.id,'width:100%;border-radius:12px')}<h3>${esc(p.nome)}</h3><p>${esc(p.descricao)}</p><button class=rqbtn onclick="rqPv(null)">Fechar</button></div></div>`}
if(RQ.hs){m+=`<div class=rqmd onclick="rqHs(0)"><div class=rqmc onclick="event.stopPropagation()"><small>DICAS DA CHEFE</small>${RQ.hint?c.dicas.slice(0,RQ.hint).map((d,i)=>`<p class=rqdica><b>${i+1}.</b> ${esc(d)}</p>`).join(''):'<p>Você ainda não pediu dicas. Cada dica usada tira uma estrela da nota final.</p>'}${RQ.free&&rqPt()&&!RQ.hint?`<p class=rqp>${ptD().nome} confia em você: a primeira dica não tira estrela.</p>`:''}${RQ.hint<c.dicas.length?`<button class=rqbtn onclick="rqHint()">Pedir ${RQ.hint?'outra ':''}dica (${RQ.hint} de ${c.dicas.length} usadas)</button>`:'<p class=rqp>Você já usou todas as dicas.</p>'}<button class="rqbtn gh" onclick="rqHs(0)">Fechar</button></div></div>`}
return m}
const rqSay=c=>{const p=ptD();return Object.values(RQ.pal).some(v=>v==='confiar'||v==='discordar')&&PTM().hist.filter(x=>x.c===c.id&&x.ok===true).length?p.falas.confiou_certo:p.bordoes[0]};
function rqFinal(c){const f=RQ.fin;if(f.ok)return `<div class="rqv fin"><div class=rqfin><div class=rqfst>${rqStars(f.st)}</div><small>CASO RESOLVIDO</small><h2>${esc(c.titulo)}</h2><p>${esc(c.final.acerto)}</p><div class=rqok style="text-align:left"><small>COMO FOI</small><p>${esc(c.solucao.como)} Motivo: ${esc(c.solucao.motivo.charAt(0).toLowerCase()+c.solucao.motivo.slice(1))}</p></div><p class=rqp>Dicas usadas: ${RQ.hint}${RQ.free&&rqPt()?' (uma foi cortesia do parceiro)':''}</p>${rqPt()?`<div class=ptfin>${ptAv(ptId(),48,'a')}<p>“${esc(rqSay(c))}”</p></div>`:''}<button class=rqbtn onclick="rqExit()">Voltar aos casos rápidos</button><button class="rqbtn gh" onclick="rqReplay()">Jogar de novo</button></div></div>`;
return `<div class="rqv fin"><div class=rqfin><small>ACUSAÇÃO ERRADA</small><h2>Ainda não foi desta vez</h2><p>${esc(c.final.erro)}</p><button class=rqbtn onclick="rqRetry()">Tentar de novo</button><button class="rqbtn gh" onclick="rqExit()">Voltar aos casos rápidos</button></div></div>`}
function rqView(){const c=rqC(RQ.id);if(RQ.fin)return rqFinal(c);
if(RQ.v==='intro')return `<div class="rqv intro"><div class=rqsc><img src="assets/casos/mini_${c.id}.webp" alt="" draggable=false></div><div class=rqin><small>CASO RÁPIDO · ${esc(c.cenario.local.split(',')[0]).toUpperCase()}</small><h2>${esc(c.titulo)}</h2><p class=rqres>${esc(c.cenario.resumo)}</p><div class=rqchf>${av('chefe',44)}<p>${esc(c.abertura_chefe)}</p></div>${rqPt()?`<button class=ptrow onclick="RQ.cho=1;render()">${ptAv(ptId(),34,'n')}<span>Seu parceiro: <b>${ptD().nome} ${ptD().sobrenome}</b> · trocar</span></button>`:''}<button class=rqbtn onclick="rqStart()">Começar</button><button class="rqbtn gh" onclick="rqExit()">Voltar</button></div>${ptModals(c)}</div>`;
const nav=[['su','Suspeitos'],['pr','Provas'],['cv','Conversas'],['ac','Acusar']];
return `<div class=rqv><div class=rqtop>${ib('back','Voltar aos casos rápidos','rqExit()')}<span>${esc(c.titulo)}</span>${rqPt()?`<button class=ib aria-label="Perfil do parceiro" onclick="ptPf(1)" style="padding:0">${ptAv(ptId(),34,'n')}</button>`:''}${ib('hint','Dicas da chefe','rqHs(1)')}</div><div class=rqb id=rqb>${rqBody(c)}</div><nav class=rqn>${nav.map(([k,n])=>`<button class="${RQ.tab===k?'on':''}" onclick="rqTab('${k}')">${rqIcon(k)}<span>${n}</span>${k==='pr'&&RQ.nw.length&&RQ.tab!=='pr'?'<i></i>':''}</button>`).join('')}</nav>${ptBanner()}${rqModals(c)}${ptModals(c)}</div>`}
{const _r=render;render=function(){let sb=0;if(RQ){const b=document.getElementById('rqb');sb=b?b.scrollTop:0}_r.apply(this,arguments);if(RQ){const u=$('#ui');if(u&&u.insertAdjacentHTML){u.insertAdjacentHTML('beforeend',rqView());const b=document.getElementById('rqb');if(b){b.scrollTop=RQ.sb==='end'?b.scrollHeight:RQ.sb==='top'?0:sb;RQ.sb=0}}}}}
