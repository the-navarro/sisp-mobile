/* ===== Arquivo Reservado: casos com regras especiais (só no modo Sozinho) =====
   Cada caso é um caso principal comum, com campos extras:
   solo:true · esp:true · mec:['🤐 …'] · SU[i].mudo · notas (consultor) · paginas (diário) · guia · epilogo.
   Aqui ficam: a aba no Arquivo, o parceiro desligado, o suspeito mudo, as notas do consultor no Caderno,
   o diário com páginas, o guia (só quando o jogador parar) e o epílogo. */
window.ESP=window.ESP||[];
const espC=id=>ESP.find(c=>c.id===id);
const espOk=()=>!!(C&&C.esp&&!MENU);
const espEl=(id,cls)=>{let e=document.getElementById(id);if(!e){e=document.createElement('div');e.id=id;if(cls)e.className=cls;document.body.appendChild(e)}return e};
const espDel=id=>{const e=document.getElementById(id);if(e)e.remove()};

/* ---------- lista no Arquivo ---------- */
window.espList=()=>{const intro=`<p class="mut rqsub">Casos de <b>regras especiais</b>, um por vez. Cada um muda a forma de investigar. Só no modo Sozinho, sem parceiro.</p>`;
if(!ESP.length)return intro+`<div class=espsoon><div class=esplk>🔒</div><b>Arquivo Reservado</b><p>O primeiro caso chega em breve. Nele, uma suspeita não diz uma palavra, e alguém em quem você confia pode estar mentindo.</p></div>`;
return intro+ESP.map(c=>{const p=META.p[c.id]||0,d=META.done[c.id];return `<button class=espcard onclick="espSel('${c.id}')"><span class=espimg><img src="assets/casos/mini_${c.id}.webp" alt="" loading=lazy draggable=false><i class=espb>ARQUIVO RESERVADO</i></span><span class=espx><small>${esc(c.num||'')}</small><b>${esc(c.n)}</b><span>${esc(c.place||'')}</span><span class=espm>${(c.mec||[]).map(m=>`<em>${esc(m)}</em>`).join('')}</span><span class=espst>${d?'✓ Resolvido'+(META.rk&&META.rk[c.id]?' · nota '+META.rk[c.id]:''):p?'Em andamento · '+p+'%':'Não iniciado'}</span></span></button>`}).join('')};
window.espSel=id=>{const c=espC(id);if(!c)return;espDel('espm');const e=espEl('espm','duo-m');e.style.zIndex=2050;const p=META.p[id]||0,d=META.done[id];
e.innerHTML=`<div class=dcard style="text-align:left;max-height:94vh;overflow:auto"><img src="assets/casos/mini_${id}.webp" alt="" style="width:100%;border-radius:12px;margin-bottom:8px" onerror="this.remove()"><small>ARQUIVO RESERVADO · ${esc(c.num||'')}</small><h2 style="margin:2px 0 6px">${esc(c.n)}</h2><p class=dsm style="margin-top:0">${esc(c.blurb||'')}</p><div class=dcchips>${(c.mec||[]).map(m=>`<span>${esc(m)}</span>`).join('')}<span>🕵️ Só sozinho</span><span>⏱ até 60 min</span></div>${p||d?`<button class=dbtn onclick="espGo('${id}')">${d?'Jogar de novo':'Continuar'}</button><button class="dbtn gh" onclick="espGo('${id}',1)">Reiniciar</button>`:`<button class=dbtn onclick="espGo('${id}')">Jogar</button>`}<button class="dbtn gh" onclick="espDel('espm')">Voltar</button></div>`};
window.espGo=(id,fr)=>{espDel('espm');const c=espC(id);if(!c)return;if(window.DUO&&DUO.on&&typeof duoOff==='function')duoOff();if(!CASES.includes(c))CASES.push(c);try{warmCase(id)}catch(e){}
startCase(id,fr||(META.done[id]&&!META.p[id]?1:0));S.lv=2;LVO=0;S.eo=S.eo||{};try{save()}catch(e){}ARQ=0;render()};
/* quando volta ao menu, o caso reservado sai da lista dos casos principais */
{const _tm=toMenu;toMenu=function(){const r=_tm.apply(this,arguments);espPurge();return r}}
function espPurge(){if(!MENU)return;ESP.forEach(c=>{const i=CASES.indexOf(c);if(i>=0&&(!C||C!==c||MENU))CASES.splice(i,1)})}

/* ---------- parceiro desligado e modos em dupla ---------- */
/* (ptmFree e ptEpi já respeitam C.solo; aqui só garantimos que nenhum modal de parceiro apareça) */
{const _ps=window.ptmStart;if(_ps)window.ptmStart=function(id,fr){const c=espC(id);if(c){espGo(id,fr);return}return _ps.apply(this,arguments)}}

/* ---------- suspeito mudo ---------- */
const espMudo=id=>{const s=C&&C.SU&&C.SU.find(x=>x.id===id);return !!(s&&s.mudo)};
function espMudoUi(){if(!espOk())return;
document.querySelectorAll('button.ci[onclick^="openChat("]').forEach(b=>{const m=/openChat\('([^']+)'\)/.exec(b.getAttribute('onclick')||'');if(m&&espMudo(m[1])&&!b.querySelector('.espmt')){const t=b.querySelector('.cit b');if(t)t.insertAdjacentHTML('beforeend',' <span class=espmt>🤐 não fala</span>')}});
if(S.tab==='interrogate'&&CHO&&espMudo(S.su)){const cl=document.getElementById('cl');if(cl)cl.classList.add('espmudo');
const lk=document.querySelector('.tray .q.lock');if(lk&&!lk.dataset.m){lk.dataset.m=1;lk.innerHTML=lk.innerHTML.replace('aguardam laudo:','aguardam o laudo (ela não fala, mas reage a provas):')}
const em=document.querySelector('.cmb span');if(em&&/Nenhuma|Sem perguntas novas/.test(em.textContent)&&!QTO)em.textContent='Ela reage às provas que você analisa'}}

/* ---------- notas do consultor (Caderno) ---------- */
function espCond(q){if(q==null||q==='inicio')return true;if(typeof q==='string')return false;
if(q.all)return q.all.every(espCond);if(q.q)return S.asked.includes(q.q);if(q.c)return S.inv.includes(q.c);if(q.an)return S.an.includes(q.an);
if(q.ded!=null)return S.ded.length>=q.ded;if(q.loc)return isLo(q.loc);if(q.win)return !!S.won;if(q.thr)return S.ded.length>=C.thr;return false}
const espNotas=()=>(C&&C.notas||[]).filter(n=>espCond(n.quando));
function espNotasSync(){if(!espOk()||!C.notas)return;S.nlU=S.nlU||[];const nw=espNotas().filter(n=>!S.nlU.includes(n.id));
if(nw.length){nw.forEach(n=>S.nlU.push(n.id));try{save()}catch(e){}if(S.seen>=4&&!CUT){try{tst('📓 Nova nota do consultor','caderno')}catch(e){}}}}
const espNovas=()=>espNotas().filter(n=>!(S.nlR||[]).includes(n.id)).length;
{const _vc=V_.caderno;V_.caderno=function(){if(!(C&&C.notas&&C.notas.length))return _vc.apply(this,arguments);
if(!CDT.some(x=>x[0]==='cons'))CDT.push(['cons','Consultor']);
if(S.f.cd!=='cons')return _vc.apply(this,arguments);
const k='cons',nn=(S.nb||[]).length,bar=`<div class=cdtabs>${CDT.map(([v,t])=>`<button class="${k===v?'on':''}" onclick="S.f.cd='${v}';save();render();$('main').scrollTop=0">${t}${v==='not'&&nn?` <b>${nn}</b>`:''}${v==='cons'&&espNovas()?` <b>${espNovas()}</b>`:''}</button>`).join('')}</div>`;
const L=espNotas();S.nlR=S.nlR||[];L.forEach(n=>{if(!S.nlR.includes(n.id))S.nlR.push(n.id)});
return bar+`<div class=pan style="margin-top:0;border-color:var(--amb)"><h3 style="color:var(--amb)">📓 Notas do consultor</h3><p class=mut style="margin:0 0 8px">Frei Anselmo acompanha a investigação e anota o que observa. As notas são opinião dele. As provas são fatos.</p>${L.length?L.slice().reverse().map(n=>`<div class=espnota><small>${esc(n.fecha||'')}</small><p>${esc(n.txt)}</p><em>— ${esc(C.consultor||'Consultor')}</em></div>`).join(''):'<p class=mut>Nenhuma nota ainda.</p>'}</div>`}}
/* aba "Consultor" sempre disponível só quando o caso tem notas; remove nos outros casos */
{const _r=render;render=function(){if(window.CDT){const i=CDT.findIndex(x=>x[0]==='cons');if(i>=0&&!(C&&C.notas&&C.notas.length))CDT.splice(i,1);else if(i<0&&C&&C.notas&&C.notas.length)CDT.push(['cons','Consultor'])}return _r.apply(this,arguments)}}

/* ---------- diário com páginas ---------- */
window.ESPG={};
{const _in=window.insp;window.insp=function(id){if(C&&C.paginas&&C.paginas[id]){espPag(id,0);return}return _in.apply(this,arguments)}}
window.espPag=(id,i)=>{const L=C.paginas[id],n=L.length;i=Math.max(0,Math.min(n-1,i));ESPG[id]=i;const pg=L[i],trav=pg.lab&&!S.an.includes(id),cl=CL[id];
const e=espEl('esppag','duo-m');e.style.zIndex=2200;
const body=trav?`<div class=esppg><div class=espcola>📎</div><b>As páginas estão coladas.</b><p>Leve o caderno ao Dr. José, na Perícia, para descolar com vapor.</p></div>`:`<div class=esppg>${pg.img?`<img src="${esc(pg.img)}" alt="" draggable=false onerror="this.remove()">`:''}${pg.fecha?`<small>${esc(pg.fecha)}</small>`:''}<p>${esc(pg.txt||'')}</p></div>`;
e.innerHTML=`<div class="dcard espdiario"><div class=esphd><b>${cl?cl.i+' '+esc(cl.n):'Diário'}</b><button class=dcx onclick="espDel('esppag')" aria-label="Fechar">✕</button></div>${body}<div class=esppn><button ${i<=0?'disabled':''} onclick="espPag('${id}',${i-1})">◀</button><span>Página ${i+1} de ${n}</span><button ${i>=n-1?'disabled':''} onclick="espPag('${id}',${i+1})">▶</button></div></div>`};

/* ---------- guia: só quando o jogador parar ---------- */
let ESPT=Date.now(),ESPSIG='';
const espSig=()=>S?S.inv.length+'|'+S.asked.length+'|'+S.an.length+'|'+S.ded.length+'|'+(S.lo||[]).length:'';
function espGuiaCond(q){if(!q)return true;const a=(k,f)=>!q[k]||q[k].every(f);
return a('inv',x=>S.inv.includes(x))&&a('noinv',x=>!S.inv.includes(x))&&a('asked',x=>S.asked.includes(x))&&a('noasked',x=>!S.asked.includes(x))&&a('an',x=>S.an.includes(x))&&a('noan',x=>!S.an.includes(x))&&a('loc',x=>isLo(x))&&a('noloc',x=>!isLo(x))&&(q.ded==null||S.ded.length>=q.ded)&&(q.dedlt==null||S.ded.length<q.dedlt)}
window.espGuiaMsg=()=>{const g=C&&C.guia;if(!g||!g.msgs)return null;const m=g.msgs.find(x=>espGuiaCond(x.se));return m?m.t:null};
function espGuiaShow(t){const e=espEl('espguia');e.innerHTML=`<div class=espgc><span>${av('chefe',40)}</span><div><small>CHEFE REGINA VAZ</small><p>${esc(t)}</p></div><button onclick="espDel('espguia')" aria-label="Fechar">✕</button></div>`;clearTimeout(window.__espgt);window.__espgt=setTimeout(()=>espDel('espguia'),22000)}
window.espGuiaShow=espGuiaShow;
setInterval(()=>{try{if(!espOk()){espDel('espguia');return}const sg=espSig();if(sg!==ESPSIG){ESPSIG=sg;ESPT=Date.now();espDel('espguia')}
espNotasSync();
if(C.guia&&!CUT&&!S.typing&&!RM&&!INS&&S.seen>=4&&Date.now()-ESPT>(C.guia.parado||130000)){const m=espGuiaMsg();ESPT=Date.now();if(m)espGuiaShow(m)}}catch(e){}},4000);
/* objetivo do local, uma vez, ao abrir */
function espObjetivo(){if(!espOk()||!C.guia||!C.guia.obj||S.tab!=='locations')return;S.eo=S.eo||{};const l=S.loc;if(!l||S.eo[l]||!C.guia.obj[l])return;S.eo[l]=1;try{save()}catch(e){}try{tst('🎯 '+C.guia.obj[l])}catch(e){}}

/* ---------- epílogo ---------- */
window.espEpilogo=()=>{if(!C||!C.epilogo||!S.won||S.epi)return;S.epi=1;try{save()}catch(e){}const ep=C.epilogo,n=(C.notas||[]).find(x=>x.id===ep.nota);
const e=espEl('espepi','duo-m');e.style.zIndex=2600;
e.innerHTML=`<div class="dcard espepi">${n?`<div class=espnota style="margin-bottom:14px"><small>ÚLTIMA NOTA DO CONSULTOR · ${esc(n.fecha||'')}</small><p>${esc(n.txt)}</p></div>`:''}<div class=espepf>${av(ep.quem,110,0)}</div><p class=espepq>${esc(ep.fala)}</p><button class=dbtn onclick="espDel('espepi')">Encerrar o caso</button></div>`};
{const _ce=cutEnd;cutEnd=function(){const k=CUT&&CUT.k;const r=_ce.apply(this,arguments);if(k==='end'&&C&&C.epilogo&&S.won)setTimeout(espEpilogo,250);return r}}

/* ---------- ligações de tela ---------- */
{const _r=render;render=function(){const r=_r.apply(this,arguments);try{espPurge();if(espOk()){espMudoUi();espObjetivo()}}catch(e){}return r}}
