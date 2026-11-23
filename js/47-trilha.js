/* Trilha por cidades: cada capítulo acontece numa cidade do Brasil.
   Aba "Trilha" = mapa do Brasil, que aparece inteiro e logo guia o zoom até a cidade onde o jogador parou.
   Tocar numa cidade aberta mostra o capítulo: capas em carrossel em cima e a curva da trilha embaixo.
   O progresso é o dos próprios casos: concluir um caso por qualquer aba também avança a trilha. */
(function(){
/* cidades (capítulos), na ordem da trilha; x/y estão no quadro do mapa (435x440) */
const CT=[
{id:'tir',n:'Tiradentes',uf:'MG',reg:'Serra de Minas',x:324.8,y:298.0,side:'r',pin:'e1',cs:[['c','c0'],['r','r1'],['t','t1'],['r','r2'],['c','c3'],['e','e1']]},
{id:'nf',n:'Nova Friburgo',uf:'RJ',reg:'Região Serrana',x:342.6,y:311.1,side:'r',pin:'e2',cs:[['c','c1'],['r','r3'],['c','c2'],['t','t2'],['e','e2']]},
{id:'pir',n:'Piracicaba',uf:'SP',reg:'Interior paulista',x:287.2,y:316.2,side:'l',pin:'e3',cs:[['r','r4'],['c','c5'],['t','t3'],['e','e3']]},
{id:'bh',n:'Belo Horizonte',uf:'MG',reg:'Capital mineira',x:327.4,y:284.7,side:'l',pin:'e4',cs:[['c','c6'],['t','t4'],['e','e4']]},
{id:'san',n:'Santos',uf:'SP',reg:'Litoral paulista',x:301.5,y:329.9,side:'l',pin:'c4',soon:1,cs:[['c','c4']]}];
/* os casos comuns passam a mostrar a cidade onde acontecem (os premium já mostram) */
CT.forEach(ct=>ct.cs.forEach(([k,id])=>{if(k!=='c')return;const c=CASES.find(x=>x.id===id);if(c&&c.place&&c.place.indexOf('(')<0)c.place=c.place.replace(/, Centro$/,'')+', '+ct.n+' ('+ct.uf+')'}));
const TR=[];CT.forEach((c,ci)=>c.cs.forEach(([k,id])=>TR.push([k,id,ci])));
const LB={c:'CASO COMUM',r:'CASO RÁPIDO',t:'LINHA DO TEMPO',e:'ARQUIVO RESERVADO'};
const COL={c:'#e0a63a',r:'#3fd0c0',t:'#a78bfa',e:'#f0c75e'};
const solo=()=>typeof amMode==='function'?amMode()==='solo':true;
const capa=id=>'assets/casos/capa_'+id+'.webp'+IMV(id);
function info(k,id){
 if(k==='c'||k==='e'){const c=k==='c'?CASES.find(x=>x.id===id):(window.ESP||[]).find(x=>x.id===id);if(!c)return null;const d=META.done[id],p=META.p[id]||0;return{k,id,t:c.n,sub:c.place,done:!!d,p,nota:META.rk&&META.rk[id],lab:k==='c'&&c.tut?'TREINAMENTO':LB[k]}}
 if(k==='r'){const c=RQC.find(x=>x.id===id);if(!c)return null;const d=RQM().done[id],p=RQM().prog[id];return{k,id,t:c.titulo,sub:c.cenario.local.split(',')[0],done:!!d,p:p&&(p.asked.length||p.seen)?1:0,stars:d,lab:LB.r}}
 if(k==='t'){const c=TLC.find(x=>x.id===id);if(!c)return null;const d=TLM().done[id],p=TLM().prog[id];return{k,id,t:c.titulo,sub:c.cenario.local.split(',')[0],done:!!d,p:p&&(p.conf||p.hints)?1:0,stars:d,lab:LB.t}}
 return null}
window.trCities=()=>CT;
window.trNodes=()=>{const L=[];TR.forEach(([k,id,ci])=>{const n=info(k,id);if(n){n.ci=ci;n.city=CT[ci];L.push(n)}});const cur=L.findIndex(n=>!n.done);L.forEach((n,i)=>{n.i=i;n.cur=i===cur;n.open=true});return L};
window.trNext=()=>trNodes().find(n=>n.cur)||null;
/* estado de cada cidade: aberta (primeiro caso liberado), concluída, etapas feitas, caso atual */
function cities(){const L=trNodes();return CT.map((c,ci)=>{const ns=L.filter(n=>n.ci===ci),dn=ns.filter(n=>n.done).length;return Object.assign({ci,ns,dn,open:!!(ns[0]&&ns[0].open),full:ns.length&&dn===ns.length&&!c.soon,cur:ns.find(n=>n.cur)||null},c)})}
window.trStart=i=>{const L=trNodes(),n=L[i];if(!n)return;if(!n.open){const pv=L[i-1];try{tst('🔒 Conclua "'+(pv?pv.t:'a etapa anterior')+'" para liberar este caso.')}catch(e){}return}
 trClose();if(n.k==='c')ptmStart(n.id);else if(n.k==='r')rqOpen(n.id);else if(n.k==='t')tlOpen(n.id);else espSel(n.id)};
const stTxt=n=>n.soon?'Em breve':n.done?('✓ Concluído'+(n.nota?' · nota '+n.nota:n.stars?' · '+n.stars+(n.stars>1?' estrelas':' estrela'):'')):n.cur?(n.p?'Em andamento':'Próximo da trilha'):n.open?'Disponível':'🔒 Bloqueado';

/* ============ mapa ============ */
let Z=1,CX=217.5,CY=220,TOK=0,SY=280;
const sleep=ms=>new Promise(r=>setTimeout(r,ms));
const LOCK='<svg viewBox="0 0 24 24"><rect x="5" y="11" width="14" height="9" rx="2"/><path d="M8 11V8a4 4 0 018 0v3"/></svg>';
function camApply(g,z,cx,cy,sy){g=g||document.getElementById('trg');if(!g)return false;z=z||Z;cx=cx==null?CX:cx;cy=cy==null?CY:cy;sy=sy||SY;g.setAttribute('transform','translate('+(217.5-z*cx)+','+(sy-z*cy)+') scale('+z+')');
 const d=.5+.8*Math.min(1,(z-1)/3);g.querySelectorAll('.tp').forEach(p=>{p.setAttribute('transform','translate('+p.dataset.x+','+p.dataset.y+') scale('+(d/z)+')');p.style.setProperty('--lo',z>2.4?1:0)});return true}
function camTo(z,x,y,ms){const my=++TOK;return new Promise(res=>{const z0=Z,x0=CX,y0=CY,t0=performance.now();const e=t=>t<.5?2*t*t:1-Math.pow(-2*t+2,2)/2;(function f(now){if(my!==TOK||!camApply()){res();return}const t=Math.min(1,(now-t0)/ms),k=e(t);Z=z0+(z-z0)*k;CX=x0+(x-x0)*k;CY=y0+(y-y0)*k;camApply();t<1?requestAnimationFrame(f):res()})(t0)})}
function pinHTML(c,st){const k='#'+(st==='lk'?'3a3a42':st==='dn'?'3fbf72':'f0c75e');const lab=(c.side==='l'?-17:17),an=c.side==='l'?'end':'start';
 return `<g class="tp ${st}" id="trp${c.ci}" data-x="${c.x}" data-y="${c.y}" onclick="trPin(${c.ci})" style="--k:${k}"><circle class=pls r=13 /><clipPath id="trcp${c.ci}"><circle r="11"/></clipPath><circle class=pr r=13 /><image href="${capa(c.pin)}" x=-11 y=-11 width=22 height=22 clip-path="url(#trcp${c.ci})" preserveAspectRatio="xMidYMid slice"/><text class=pk y=4 text-anchor=middle font-size=12>${st==='lk'?'🔒':st==='dn'?'✓':''}</text><text class="tl s" x=${lab} y=-3 text-anchor=${an}>CAP. ${c.ci+1}</text><text class=tl x=${lab} y=8 text-anchor=${an}>${esc(c.n)}</text></g>`}
function stOf(c,ci,seen){return ci>=seen?'lk':c.full?'dn':c.cur?'op cur':'op'}
let MP=null;
function mapHTML(CS,seen){const used=new Set(CT.map(c=>c.uf));
 const sts=(window.BRS||[]).map(([s,d])=>`<path class="st${used.has(s)?' se':''}" d="${d}"/>`).join('');
 const rts=CT.slice(1).map((c,i)=>{const a=CT[i];return ''}).join('');
 return `<svg id=trsvg viewBox="0 0 435 560" role="img" aria-label="Mapa do Brasil com as cidades da trilha"><g id=trg>${sts}${CS.map(c=>pinHTML(c,stOf(c,c.ci,seen))).join('')}</g></svg>`}
window.trPin=ci=>{const c=cities()[ci];if(!c)return;if(!c.open){const pv=cities()[ci-1];try{tst('🔒 Conclua '+(pv?pv.n+' ('+pv.uf+')':'a cidade anterior')+' para liberar '+c.n+'.')}catch(e){}return}trCity(ci)};
async function trMapRun(my){SY=280;const CS=cities(),nx=trNext(),target=(nx&&CS[nx.ci])||CS[0];
 const alive=()=>my===MP&&document.getElementById('trg');
 Z=1;CX=217.5;CY=220;camApply();await sleep(650);if(!alive())return;
 await camTo(3.6,(target.x+312)/2,(target.y+308)/2,2300)}
window.trList=()=>{const L=trNodes(),dn=L.filter(n=>n.done).length,CS=cities();
 const nx=trNext(),t=(nx&&CS[nx.ci])||CS[0],seen=CS.length,nc=CS[t.ci+1]||null;
 const my=MP=Date.now()+Math.random();setTimeout(()=>trMapRun(my),30);
 return `<div class=trh><div><b>${dn} de ${L.length}</b><small>etapas concluídas</small></div><button class=trinfo onclick="trInfo()" aria-label="Como funciona a trilha">i</button></div>
<div class=trmw>${mapHTML(CS,seen)}<div class=trbn id=trbn><small>CIDADE DESBLOQUEADA</small><b></b></div></div>
<button class=trgo onclick="trCity(${t.ci})"><span><small>${nx?'VOCÊ PAROU EM':'JORNADA CONCLUÍDA EM'}</small><b>${esc(t.n)} (${t.uf})</b></span><em>${t.dn}/${t.ns.length+(t.soon?1:0)} · Entrar</em></button>
${nc?`<button class="trgo nx" onclick="trCity(${nc.ci})"><span><small>PRÓXIMA CIDADE</small><b>${esc(nc.n)} (${nc.uf})</b></span><em>${nc.dn}/${nc.ns.length+(nc.soon?1:0)}</em></button>`:''}`};
/* miniatura do mapa para o passo a passo da chefe (tela inicial): mesma aparência, sem animação nem toque */
window.trMock=()=>{const L=trNodes(),dn=L.filter(n=>n.done).length,CS=cities(),nx=trNext(),t=(nx&&CS[nx.ci])||CS[0],nc=CS[t.ci+1]||CS[0];
 const map=mapHTML(CS,CS.length).replace('viewBox="0 0 435 560"','viewBox="0 0 435 330"');
 return `<div class="tmk tma"><div class=trh><div><b>${dn} de ${L.length}</b><small>etapas concluídas</small></div><span class=trinfo>i</span></div><div class=trmw>${map}</div><div class=trgo><span><small>VOCÊ PAROU EM</small><b>${esc(t.n)} (${t.uf})</b></span><em>${t.dn}/${t.ns.length+(t.soon?1:0)} · Entrar</em></div><div class="trgo nx"><span><small>PRÓXIMA CIDADE</small><b>${esc(nc.n)} (${nc.uf})</b></span><em>${nc.dn}/${nc.ns.length+(nc.soon?1:0)}</em></div></div>`};
window.trMockCam=()=>{const CS=cities(),nx=trNext(),t=(nx&&CS[nx.ci])||CS[0];
 document.querySelectorAll('.tma .trmw g[id=trg]').forEach(g=>camApply(g,3.6,(t.x+312)/2,(t.y+308)/2,165));
 document.querySelectorAll('.hth g.trg').forEach(g=>camApply(g,3,(t.x+312)/2,(t.y+308)/2,165))};
/* texto de ajuda: fica escondido atrás do botão "i" e abre num modal com fundo desfocado */
window.trInfo=()=>{if(document.getElementById('trim'))return;const o=document.createElement('div');o.id='trim';o.setAttribute('role','dialog');o.setAttribute('aria-label','Como funciona a trilha');o.onclick=e=>{if(e.target===o)trInfoX()};
 o.innerHTML='<div class=trimc><small>TRILHA DE CASOS</small><h3>Como funciona</h3><p>Cada capítulo acontece numa <b>cidade do Brasil</b>. Toque numa cidade do mapa para ver os casos dela: casos comuns, rápidos, linha do tempo e o <b>Arquivo Reservado</b>, que fecha o capítulo.</p><p>Todas as cidades e casos estão abertos: escolha por onde começar. Qualquer caso concluído por outra via também conta na trilha.</p><button class=trplay onclick="trInfoX()">Entendi</button></div>';
 (document.getElementById('app')||document.body).appendChild(o)};
window.trInfoX=()=>{const o=document.getElementById('trim');if(o)o.remove()};

/* ============ capítulo (cidade): capas em cima, curva da trilha embaixo ============ */
let TRS={ci:0,sel:0};
const pad=(c)=>{const ns=cities()[c].ns.slice();if(CT[c].soon)ns.push({k:'e',soon:1,t:'Arquivo Reservado',sub:'Novo caso premium em breve',lab:LB.e,open:0,done:0});return ns};
function curvePts(n){const A=15;return [...Array(n)].map((_,i)=>{const t=n>1?i/(n-1):.5;return[n>1?34+t*362:215,66+Math.sin(t*Math.PI*2)*A]})}
function curveHTML(ns,sel){const n=ns.length,P=curvePts(n);const f=t=>[n>1?34+t*362:215,66+Math.sin(t*Math.PI*2)*15];
 const dense=[...Array(81)].map((_,k)=>f(k/80).map(v=>v.toFixed(1)).join(',')).join(' ');
 const ci=ns.findIndex(x=>x.cur),last=ns.reduce((a,x,i)=>x.done?i:a,-1),upto=Math.max(last,ci>=0?ci:last);
 const part=[...Array(81)].map((_,k)=>f(k/80)).filter((_,k)=>n>1&&k/80<=upto/(n-1)+1e-6).map(v=>v.map(q=>q.toFixed(1)).join(',')).join(' ');
 let h=`<svg id=trcv viewBox="0 0 430 128" role="group" aria-label="Trilha da cidade"><polyline points="${dense}" fill=none stroke="#0b0b0e" stroke-width=9 stroke-linecap=round /><polyline points="${dense}" fill=none stroke="#d9a44166" stroke-width=2.4 stroke-dasharray="2 7" stroke-linecap=round />${part?`<polyline points="${part}" fill=none stroke="#d9a441" stroke-width=3 stroke-linecap=round />`:''}`;
 ns.forEach((x,i)=>{const[px,py]=P[i],st=x.done?'dn':x.cur?'cu':x.open?'op':'lk',e=x.k==='e';
  h+=`<g class="tcd ${st} ${e?'pe':''}" style="--k:${COL[x.k]}" onclick="trSel(${i})" tabindex=0 role=button aria-label="${esc(x.t)}. ${stTxt(x)}" onkeydown="if(event.key==='Enter')trSel(${i})"><circle cx=${px} cy=${py} r=22 fill=transparent /><circle class=tcdc cx=${px} cy=${py} r=${e?15:10.5} />${x.done?`<path d="M${px-4.5},${py+.5}l3.2,3.2l6-6.4" fill=none stroke="#07130b" stroke-width=2.4 stroke-linecap=round stroke-linejoin=round />`:e?`<text x=${px} y=${py+4.4} text-anchor=middle font-size=12 class=tcds>${x.soon||!x.open?'★':'★'}</text>`:!x.open?`<text x=${px} y=${py+3.4} text-anchor=middle font-size=9>🔒</text>`:''}</g>`});
 const[tx,ty]=P[sel],sx=ns[sel];
 h+=`<g id=trth style="transform:translate(${tx}px,${ty-34}px)"><circle r=19 fill="#0b0b0e" stroke="#fff" stroke-width=2.5 /><clipPath id=trthc><circle r=17 /></clipPath>${sx.soon?`<text y=6 text-anchor=middle font-size=17 fill="#f0c75e">★</text>`:`<image href="${capa(sx.id)}" x=-17 y=-17 width=34 height=34 clip-path="url(#trthc)" preserveAspectRatio="xMidYMid slice"/>`}<path d="M-5,18 L0,26 L5,18z" fill="#fff"/></g></svg>`;
 return h}
function covHTML(ns,sel){const mk=(j,c)=>{const x=ns[j];if(!x)return '';const g=x.k==='e';return `<button class="tcv ${c} ${g?'gold':''} ${!x.open&&!x.soon?'lk':''}" ${c==='c'?'tabindex=-1 aria-label="Capa selecionada"':`onclick="trSel(${j})" aria-label="Ver ${esc(x.t)}"`}>${x.soon?'<span class=tcvs><i>★</i><small>EM BREVE</small></span>':`<img src="${capa(x.id)}" alt="" draggable=false>`}</button>`};return mk(sel-1,'l')+mk(sel+1,'r')+mk(sel,'c')}
function infHTML(x){const g=x.k==='e'?' ★ PREMIUM':'';const act=x.soon?`<button class=trplay disabled>Em breve</button>`:x.open?`<button class=trplay onclick="trStart(${x.i})">${x.done?'↻ Rever':x.p?'▶ Continuar':'▶ Jogar'}</button>`:`<button class="trplay lk" onclick="trStart(${x.i})">🔒 Bloqueado</button>`;
 return `<small style="color:${COL[x.k]}">${x.lab}${g} · ${stTxt(x).toUpperCase().replace('✓ ','')}</small><b>${esc(x.t)}</b><span>${esc(x.sub||'')}</span>${act}`}
function chHTML(){const c=cities()[TRS.ci],ns=pad(TRS.ci),sel=Math.max(0,Math.min(TRS.sel,ns.length-1)),prem=ns.find(x=>x.k==='e'&&!x.soon);
 return `<div class=trhd><button class=trbk onclick="trClose()" aria-label="Voltar ao mapa"><svg viewBox="0 0 24 24"><path d="M15 5l-7 7 7 7"/></svg></button><div><small>CAPÍTULO ${c.ci+1} · ${esc(c.n.toUpperCase())} · ${c.uf}</small><h2>Escolha o caso</h2></div></div>
<div class=tcf id=trcf>${covHTML(ns,sel)}</div><div class=tin id=trinf>${infHTML(ns[sel])}</div>
<div class=trmt><h4>SUA TRILHA EM ${esc(c.n.toUpperCase())} · TOQUE EM UM PONTO PARA VER A CAPA</h4><div class=tcw id=trcw>${curveHTML(ns,sel)}</div>
<div class=tcz id=trcz>${ns.map((x,i)=>`<button class="${x.done?'d':''} ${i===sel?'cur':''} ${x.k==='e'?'e':''}" onclick="trSel(${i})">${x.done?'✓ ':x.k==='e'?'★ ':''}${esc(x.t)}</button>`).join('')}</div>
<p class=trnote>${prem?'O capítulo termina no premium <b>'+esc(prem.t)+'</b>. ':c.soon?'Mais casos de Santos estão sendo preparados. Quando o premium chegar, ele fecha este capítulo.':''}</p></div>`}
window.trCity=(ci,sel)=>{const CS=cities();if(!CS[ci]||!CS[ci].open)return;TRS.ci=ci;const ns=pad(ci);let s=sel;if(s==null){s=ns.findIndex(x=>x.cur);if(s<0)s=ns.length-1}TRS.sel=s;
 let o=document.getElementById('trc');if(!o){o=document.createElement('div');o.id='trc';o.setAttribute('role','dialog');o.setAttribute('aria-label','Capítulo da trilha');(document.getElementById('app')||document.body).appendChild(o)}
 o.innerHTML=chHTML();o.scrollTop=0;wire(o);try{AU&&AU.sfx&&AU.sfx('tap')}catch(e){}};
function wire(o){const cf=o.querySelector('#trcf');if(!cf||cf._w)return;cf._w=1;let x0=null;cf.addEventListener('pointerdown',e=>{x0=e.clientX});cf.addEventListener('pointerup',e=>{if(x0==null)return;const dx=e.clientX-x0;x0=null;if(Math.abs(dx)>40)trSel(TRS.sel+(dx<0?1:-1))});cf.addEventListener('pointercancel',()=>x0=null)}
window.trSel=i=>{const ns=pad(TRS.ci);if(i<0||i>=ns.length)return;TRS.sel=i;const o=document.getElementById('trc');if(!o)return;const cf=o.querySelector('#trcf');cf.innerHTML=covHTML(ns,i);const c=cf.querySelector('.tcv.c');if(c)c.classList.add('pop');
 o.querySelector('#trinf').innerHTML=infHTML(ns[i]);o.querySelector('#trcw').innerHTML=curveHTML(ns,i);
 o.querySelectorAll('#trcz button').forEach((b,j)=>b.classList.toggle('cur',j===i))};
window.trClose=()=>{const o=document.getElementById('trc');if(o)o.remove()};
/* o capítulo some quando a tela do Arquivo/Trilha deixa de estar aberta (ex.: ao começar um caso) */
{const _r=render;render=function(){const r=_r.apply(this,arguments);try{trMockCam()}catch(e){}const o=document.getElementById('trc');if(o&&!(MENU&&ARQ&&RQT===6))o.remove();const m=document.getElementById('trim');if(m&&!(MENU&&ARQ&&RQT===6))m.remove();return r}}

/* tela inicial: barra no topo (investigador e atalhos) e cartão do mapa embaixo */
const GALS='<svg viewBox="0 0 24 24"><circle cx="12" cy="9" r="6"/><path d="M8.5 14L7 22l5-3 5 3-1.5-8"/></svg>';
window.trHomeTop=()=>{const nm=esc(((META.pl&&META.pl.n)||'Investigador').slice(0,14)),du=window.amMode&&amMode()!=='solo';
 return `<div class=htop><button class=hinv onclick="plOpen()" aria-label="Investigador"><span class=hav>${av('det',30)}</span><span>${nm}</span></button><div class=hic><button class="${du?'on':''}" onclick="amDupla()" aria-label="Modo dupla">${eic('👥')}</button><button onclick="GAL=1;render()" aria-label="Galeria">${GALS}</button><button onclick="SET=1;render()" aria-label="Ajustes">${eic('⚙')}</button></div></div>`};
window.trHomeCard=()=>{if(!solo()){const m=window.amMode?amMode():'rev',nme=(window.AMN&&AMN[m]&&AMN[m][1])||'Dupla';
  return `<div class=hcard><span class="hth hdu">${eic('👥')}</span><div class=hct><small>MODO DUPLA</small><b>${esc(nme)}</b><span>Casos principais, rápidos e linha do tempo</span><button class=hgo onclick="ARQ=1;render()">ACESSAR CASOS</button></div></div>`}
 const L=trNodes(),dn=L.filter(n=>n.done).length,CS=cities(),nx=trNext(),t=(nx&&CS[nx.ci])||CS[CS.length-1];
 const map=mapHTML(CS,CS.length).replace('<svg id=trsvg viewBox="0 0 435 560"','<svg viewBox="0 0 435 330" preserveAspectRatio="xMidYMid slice"').replace('<g id=trg>','<g class=trg>');
 return `<div class=hcard><span class=hth>${map}</span><div class=hct><small>${dn?'SEU MAPA':'COMECE POR AQUI'}</small><b>${esc(t.n)} (${t.uf})</b><span>${t.dn} de ${t.ns.length+(t.soon?1:0)} casos · ${dn} de ${L.length} no total</span><button class=hgo onclick="ARQ=1;RQT=6;render()">ACESSAR MAPA</button></div></div>`};
window.trPlay=()=>trHomeCard();
/* a primeira tela pode ser desenhada antes deste arquivo carregar (sem barra e sem cartão): redesenha a tela inicial uma vez, para a tela de "toque para começar" já nascer igual à tela inicial */
window.addEventListener('load',()=>{try{if(document.querySelector('.hmh')&&!document.querySelector('.hcard'))render()}catch(e){}});
})();
