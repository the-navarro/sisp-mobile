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
if(!ESP.length)return intro+`<div class=espsoon><div class=esplk>🔒</div><b>Arquivo Reservado</b><p>O primeiro caso chega em breve. Nele, uma suspeita não diz uma palavra.</p></div>`;
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
const tr=document.querySelector('.tray');if(tr&&!tr.querySelector('.espmlk')){const sp=C.SU.find(x=>x.id===S.su),T=(C.guia&&C.guia.margarida_travas)||{},L=sp.q.filter(q=>!S.asked.includes(q[0])&&!qOk(q));const old=tr.querySelector('.q.lock');if(old)old.remove();if(L.length)tr.insertAdjacentHTML('beforeend',`<div class="q lock espmlk">${L.map(q=>esc(T[q[0]]||('🔒 Aguarda o laudo de '+((CL[q[2]]||{}).n||'uma prova')))).join('<br>')}</div>`)}
const em=document.querySelector('.cmb span');if(em&&/Nenhuma|Sem perguntas novas/.test(em.textContent)&&!QTO)em.textContent='Ela reage às provas que você analisa'}}

/* ---------- o consultor ao lado do jogador (não fica no Caderno) ---------- */
function espCond(q){if(q==null||q==='inicio')return true;if(typeof q==='string')return false;
if(q.all)return q.all.every(espCond);if(q.q)return S.asked.includes(q.q);if(q.c)return S.inv.includes(q.c);if(q.an)return S.an.includes(q.an);
if(q.nasked!=null)return S.asked.length>=q.nasked;if(q.idle){const fr=S.fr||[],now=Date.now();return q.idle===1?now-ESPT>75000:fr.includes('R13')&&now-Math.max(ESPT,window.ESPLF||0)>90000}if(q.ded!=null)return S.ded.length>=q.ded;if(q.loc)return isLo(q.loc);if(q.win)return !!S.won;if(q.thr)return S.ded.length>=C.thr;return false}
const espNotas=()=>(C&&C.notas||[]).filter(n=>espCond(n.quando));
/* todas as falas do consultor: abertura, visitas aos locais e comentários dos marcos */
const espFreiFalas=()=>{const f=C&&C.frei;if(!f)return [];const o=[];if(f.abertura)o.push({id:'abertura',t:f.abertura,k:'abre'});Object.keys(f.visitas||{}).forEach(l=>o.push({id:'v_'+l,t:f.visitas[l],k:'loc',loc:l}));(C.notas||[]).forEach(n=>o.push({id:n.id,t:n.txt,k:'nota',q:n.quando}));return o};
const espFreiOk=f=>f.k==='abre'?S.seen>=4:f.k==='loc'?(S.tab==='locations'&&S.loc===f.loc&&isLo(f.loc)):espCond(f.q);
const espFreiNome=()=>(C&&C.consultor)||'Consultor';
window.espFreiCard=id=>{const f=espFreiFalas().find(x=>x.id===id);if(!f)return;const e=espEl('espfcard');e.innerHTML=`<div class=espfc onclick="espFreiAbrir()"><span>${av('anselmo',44)}</span><div><small>${esc(espFreiNome().toUpperCase())} · AO SEU LADO</small><p>${esc(gx(f.t))}</p></div><button onclick="event.stopPropagation();espDel('espfcard')" aria-label="Fechar">✕</button></div>`;clearTimeout(window.ESPFT);window.ESPFT=setTimeout(()=>espDel('espfcard'),Math.min(22000,6000+f.t.length*55))};
function espFreiSync(){if(!espOk()||!C.frei||CUT||S.seen<4)return;if(!S.frStart){S.frStart=1;ESPT=Date.now()}S.fr=S.fr||[];const nw=espFreiFalas().find(f=>!S.fr.includes(f.id)&&espFreiOk(f));
if(nw&&!S.typing&&!document.getElementById('espfcard')&&!document.getElementById('espguia')&&!document.querySelector('#espfsheet')){S.fr.push(nw.id);window.ESPLF=Date.now();try{save()}catch(e){}espFreiCard(nw.id);try{AU.fx&&AU.fx('tick')}catch(e){}espFreiUi()}}
window.espNotasSync=espFreiSync;
const espFreiNovas=()=>{const r=S.frR||[];return (S.fr||[]).filter(i=>!r.includes(i)).length};
window.espFreiAbrir=()=>{S.frR=(S.fr||[]).slice();try{save()}catch(e){}espDel('espfcard');const L=espFreiFalas().filter(f=>(S.fr||[]).includes(f.id)).reverse();const e=espEl('espfsheet','duo-m');e.style.zIndex=2300;
e.innerHTML=`<div class="dcard espfs"><div class=esphd><span class=espfav>${av('anselmo',40)}</span><div style="flex:1"><b>${esc(espFreiNome())}</b><small>Capelão e historiador · ao seu lado</small></div><button class=dcx onclick="espDel('espfsheet');espFreiUi()" aria-label="Fechar">✕</button></div><div class=espfl>${L.length?L.map(f=>`<div class=espfb>${f.k==='loc'?'<small>📍 '+esc(((C.LO.find(l=>l.id===f.loc)||{}).n||'').replace(' (cena do crime)',''))+'</small>':''}${esc(gx(f.t))}</div>`).join(''):'<p class=mut>Ele ainda não disse nada.</p>'}</div><p class=mut style="margin:8px 0 0;font-size:12px">O que o Frei diz é opinião dele. As provas são fatos.</p></div>`;espFreiUi()};
function espFreiUi(){let c=document.getElementById('espfchip');const show=espOk()&&C.frei&&S&&S.seen>=4&&!CUT&&!RM&&!INS&&!document.getElementById('espfsheet')&&!document.querySelector('#ui .ov');
if(!show){if(c)c.remove();return}if(!c){c=document.createElement('button');c.id='espfchip';c.setAttribute('aria-label','Conversar com o Frei');c.onclick=()=>espFreiAbrir();document.body.appendChild(c)}
const n=espFreiNovas();c.innerHTML=`${av('anselmo',44)}${n?`<b>${n}</b>`:''}`}

/* ---------- diário com páginas ---------- */
window.ESPG={};
{const _in=window.insp;window.insp=function(id){if(C&&C.paginas&&C.paginas[id]){espPag(id,0);return}return _in.apply(this,arguments)}}
window.espPag=(id,i)=>{const L=C.paginas[id],n=L.length;i=Math.max(0,Math.min(n-1,i));ESPG[id]=i;const pg=L[i],trav=pg.lab&&!S.an.includes(id),cl=CL[id];
const e=espEl('esppag','duo-m');e.style.zIndex=2200;
const body=trav?`<div class=esppg>${pg.imgC?`<img src="${esc(pg.imgC)}" alt="Página colada" draggable=false onerror="this.remove()">`:'<div class=espcola>📎</div>'}<div class=espcnt>📎 Página colada · só dá para ler depois da Perícia</div></div>`:`<div class=esppg>${pg.img?`<img src="${esc(pg.img)}" alt="${esc((pg.fecha?pg.fecha+'. ':'')+(pg.txt||''))}" draggable=false>`:`<small>${esc(pg.fecha||'')}</small><p>${esc(pg.txt||'')}</p>`}</div>`;
e.innerHTML=`<div class="dcard espdiario"><div class=esphd><b>${cl?cl.i+' '+esc(cl.n):'Diário'}</b><button class=dcx onclick="espDel('esppag')" aria-label="Fechar">✕</button></div>${body}<div class=esppn><button ${i<=0?'disabled':''} onclick="espPag('${id}',${i-1})">◀</button><span>Página ${i+1} de ${n}</span><button ${i>=n-1?'disabled':''} onclick="espPag('${id}',${i+1})">▶</button></div></div>`};

/* ---------- guia: só quando o jogador parar ---------- */
let ESPT=Date.now(),ESPSIG='';
const espSig=()=>S?S.inv.length+'|'+S.asked.length+'|'+S.an.length+'|'+S.ded.length+'|'+(S.lo||[]).length:'';
function espGuiaCond(q){if(!q)return true;const a=(k,f)=>!q[k]||q[k].every(f);
return a('inv',x=>S.inv.includes(x))&&a('noinv',x=>!S.inv.includes(x))&&a('asked',x=>S.asked.includes(x))&&a('noasked',x=>!S.asked.includes(x))&&a('an',x=>S.an.includes(x))&&a('noan',x=>!S.an.includes(x))&&a('loc',x=>isLo(x))&&a('noloc',x=>!isLo(x))&&(q.ded==null||S.ded.length>=q.ded)&&(q.dedlt==null||S.ded.length<q.dedlt)&&(q.nodec==null||!S.dec)&&(q.strikes==null||S.strikes>=q.strikes)}
window.espGuiaMsg=()=>{const g=C&&C.guia;if(!g||!g.msgs)return null;const m=g.msgs.find(x=>espGuiaCond(x.se));return m?m.t:null};
function espGuiaShow(t){const e=espEl('espguia');e.innerHTML=`<div class=espgc><span>${av('chefe',40)}</span><div><small>CHEFE REGINA VAZ</small><p>${esc(t)}</p></div><button onclick="espDel('espguia')" aria-label="Fechar">✕</button></div>`;clearTimeout(window.__espgt);window.__espgt=setTimeout(()=>espDel('espguia'),22000)}
window.espGuiaShow=espGuiaShow;
setInterval(()=>{try{if(!espOk()){espDel('espguia');return}const sg=espSig();if(sg!==ESPSIG){ESPSIG=sg;ESPT=Date.now();espDel('espguia')}
espNotasSync();
if(C.guia&&!CUT&&!S.typing&&!RM&&!INS&&S.seen>=4&&Date.now()-ESPT>(C.guia.parado||130000)){const m=espGuiaMsg();ESPT=Date.now();if(m)espGuiaShow(m)}}catch(e){}},4000);
/* objetivo do local, uma vez, ao abrir */
function espObjetivo(){if(!espOk()||!C.guia||!C.guia.obj||S.tab!=='locations')return;S.eo=S.eo||{};const l=S.loc;if(!l||S.eo[l]||!C.guia.obj[l])return;S.eo[l]=1;try{save()}catch(e){}try{tst('🎯 '+C.guia.obj[l])}catch(e){}}

/* ---------- epílogo ---------- */
window.espEpiGo=()=>{const v=document.getElementById('espepvw');if(v)v.remove();const c=document.getElementById('espepc');if(c)c.style.display='block'};
window.espEpilogo=()=>{if(!C||!C.epilogo||!S.won||S.epi)return;S.epi=1;try{save()}catch(e){}const ep=C.epilogo,n=(C.notas||[]).find(x=>x.id===ep.nota),id=C.id;
const e=espEl('espepi','duo-m');e.style.zIndex=2600;
e.innerHTML=`<div class=espepvw id=espepvw><video id=espepv playsinline autoplay ${window.AU&&AU.f?'':'muted'} src="assets/v/${id}_epi${plv().g==='f'?'_a':''}.mp4" poster="assets/v/${id}_epi.jpg"></video><button class=espepsk onclick="espEpiGo()">Pular ›</button></div><div class="dcard espepi" id=espepc style="display:none">${n?`<div class=espnota style="margin-bottom:14px"><small>ÚLTIMA NOTA DO CONSULTOR · ${esc(n.fecha||'')}</small><p>${esc(n.txt)}</p></div>`:''}<div class=espepf>${av(ep.quem,110,0)}</div><p class=espepq>${ep.dir?`<small style="display:block;font:12px Arial;color:#9fb0b8;margin-bottom:6px">${esc(ep.dir)}</small>`:''}“${esc(ep.fala)}”</p><button class=dbtn onclick="espDel('espepi')">Encerrar o caso</button></div>`;
const v=document.getElementById('espepv');if(v){v.onended=espEpiGo;v.onerror=espEpiGo;const pr=v.play&&v.play();if(pr&&pr.catch)pr.catch(()=>{v.muted=true;const p2=v.play&&v.play();if(p2&&p2.catch)p2.catch(()=>espEpiGo())})}else espEpiGo()};
{const _ce=cutEnd;cutEnd=function(){const k=CUT&&CUT.k;const r=_ce.apply(this,arguments);if(k==='end'&&C&&C.epilogo&&S.won)setTimeout(espEpilogo,250);return r}}

/* ---------- ligações de tela ---------- */
{const _r=render;render=function(){const r=_r.apply(this,arguments);try{espPurge();if(espOk()){espEntregas();espMudoUi();espObjetivo();espFreiSync()}else{espDel('espfcard');espDel('espfsheet')}espFreiUi()}catch(e){}return r}}

/* ligação da chefe (uma vez) quando a condição acontece */
setInterval(()=>{try{if(!espOk()||!C.guia||!C.guia.chefe||CUT||S.typing||S.seen<4)return;S.ech=S.ech||{};for(const x of C.guia.chefe){if(!S.ech[x.id]&&espGuiaCond(x.se)){S.ech[x.id]=1;try{save()}catch(e){}espGuiaShow(x.t);break}}}catch(e){}},5000);
/* acusar a pessoa errada mostra uma pista sobre aquele suspeito */
{const _ac=accuse;accuse=function(){const r=_ac.apply(this,arguments);try{if(C&&C.esp&&C.fail_por&&V&&!V.w&&S.acc&&C.fail_por[S.acc]&&!S.won){V.m=C.fail_por[S.acc];render()}}catch(e){}return r}}
/* conclusão da chefe no fim */
{const _pe=window.ptEpi;window.ptEpi=function(){if(C&&C.esp&&C.desfecho)return `<div class=ptfin>${av('chefe',48)}<p>“${esc(C.desfecho)}”</p></div>`;return _pe?_pe.apply(this,arguments):''}}
/* dicas da lâmpada: por etapa (último local aberto) */
{const _ht=window.hintTiers||hintTiers;hintTiers=function(x){if(C&&C.esp&&C.dicas&&C.dicas.por_etapa){const open=LO.filter(l=>isLo(l.id)),st=open.length?open[open.length-1].id:C.start,L=C.dicas.por_etapa[st];if(L&&L.length)return L.slice(0,3).concat(C.dicas.gerais||[]).slice(0,3)}return _ht.apply(this,arguments)}}

/* laudo do diário: o Dr. José pede para ler as páginas coladas, no próprio chat */
{const _lb=window.lbBub;if(_lb)window.lbBub=function(e){const r=_lb.apply(this,arguments);try{if(e.k!=='s'&&C&&C.paginas&&C.paginas[e.id]&&!(CL[e.id]||{}).h){const L=C.paginas[e.id];r.push(bl(jb('Delegada, as páginas '+(L.map((p,i)=>p.lab?i+1:0).filter(Boolean).join(' e '))+' ficaram legíveis. Leia aqui mesmo, com calma, e depois me diga o que achou.<div style="margin-top:8px"><button class=btn style="padding:8px 14px;font-size:13px" onclick="espPag(\''+e.id+'\','+L.findIndex(p=>p.lab)+')">📔 Ler as páginas</button></div>')))}}catch(x){}return r}}
/* Prisão só abre perto do fim */
try{Object.defineProperty(LK,'solve',{configurable:true,get(){return 'Faça '+((typeof C!=='undefined'&&C&&C.solveAt)||2)+' deduções no Quadro para liberar o mandado.'}})}catch(e){}

/* provas entregues numa conversa (ex.: Margarida entrega os desenhos) */
function espEntregas(){if(!espOk()||!C.entregas||CUT)return;let n=[];Object.keys(C.entregas).forEach(q=>{if(S.asked.includes(q))C.entregas[q].forEach(id=>{if(!S.inv.includes(id)&&CL[id]){S.inv.push(id);try{galE(id)}catch(e){}try{lg('📦','Recebeu: '+CL[id].n,6)}catch(e){}n.push(CL[id].n)}})});
if(n.length){try{save()}catch(e){}try{AU.fx('grab')}catch(e){}setTimeout(()=>{try{tst('📦 Margarida lhe entregou: '+n.join(' e '))}catch(e){}},900)}}
