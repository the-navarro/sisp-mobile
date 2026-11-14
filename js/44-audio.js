/* Caso 04 (só áudio): tocador de clipes, transcrição que abre após a 1ª escuta, marcas de som e painel "Marcas de som" */
(function(){
const has=()=>!!(typeof C!=='undefined'&&C&&C.esp&&C.clipes);
const clh=()=>(S.clh=S.clh||[]),mks=()=>(S.mks=S.mks||[]);
/* arte do clipe: ondas sonoras e o ícone */
AR.eclip=o=>{const bars=Array.from({length:30},(_,i)=>{const h=8+Math.abs(Math.sin(i*1.7)*34+Math.sin(i*.6)*18);return `<rect x=${18+i*7} y=${90-h/2} width=4 height=${h} rx=2 fill="${o.m?'#eaa73c':'#4fa3d9'}" opacity=${.35+.5*((i%5)/5)} />`}).join('');
return `<rect class=evbg width=240 height=180 fill="#0b121a" /><rect x=10 y=10 width=220 height=160 rx=14 fill="#101c28" stroke="${o.m?'#eaa73c':'#2c4a63'}" stroke-width=1.5 />${bars}<text x=120 y=104 text-anchor=middle font-size=${o.m?44:50} opacity=.95>${o.e||'🎧'}</text>`};
const IPL='<svg class=ecs1 viewBox="0 0 24 24"><path d="M8 5.5v13l11-6.5z" fill="currentColor"/></svg>',IPA='<svg class=ecs1 viewBox="0 0 24 24"><rect x="6.5" y="5" width="4" height="14" rx="1" fill="currentColor"/><rect x="13.5" y="5" width="4" height="14" rx="1" fill="currentColor"/></svg>';
const ipl=on=>on?IPA:IPL;
let A=null;const aud=()=>A||(A=new Audio());
const stop=()=>{try{if(A){A.pause();A.removeAttribute('src');A.load()}}catch(e){}};
const mm=t=>{t=Math.max(0,Math.round(t||0));return Math.floor(t/60)+':'+String(t%60).padStart(2,'0')};
const trans=t=>esc(t).split('\n').map(l=>/^\[som:/.test(l)?`<i class=ecs>🔊 ${l.replace(/^\[som:\s*|\]$/g,'')}</i>`:`<span>${l}</span>`).join('<br>');

/* marcas ainda não feitas em gravações já ouvidas (as verdadeiras viram provas para o Quadro) */
const marcasDe=cid=>((C.clipes[cid]||{}).marcas||[]).filter(m=>!mks().includes(m.id));
const semMarca=cid=>{const L=(C.clipes[cid]||{}).marcas||[];return L.length>0&&L.every(m=>!mks().includes(m.id))};
/* só avisa quando de fato falta uma marca para seguir: não há dedução disponível, ainda faltam deduções e uma marca verdadeira de gravação já ouvida não foi feita */
window.espMarcasPend=()=>{if(!has())return false;let pd=1;try{pd=pend().length}catch(e){}return pd===0&&S.ded.length<NT&&Object.keys(C.clipes).some(id=>clh().includes(id)&&((C.clipes[id].marcas||[]).some(m=>m.verdadeira&&!S.inv.includes(m.id))))};
const hsh=s=>{let x=0;for(let i=0;i<s.length;i++)x=(x*31+s.charCodeAt(i))>>>0;return x};
function claim(m){if(!S.inv.includes(m.id)){S.inv.push(m.id);if(!S.an.includes(m.id))S.an.push(m.id);try{galE(m.id)}catch(e){}try{lg('🔊','Marca de som: '+CL[m.id].n,2)}catch(e){}try{AU.fx('grab')}catch(e){}}}
window.espClipMark=(cid,mid)=>{const c=C.clipes[cid];if(!c||!clh().includes(cid))return;const m=(c.marcas||[]).find(x=>x.id===mid);if(!m||mks().includes(mid))return;mks().push(mid);
if(m.verdadeira){claim(m);try{tst('🔊 Marca registrada: '+(CL[mid]?CL[mid].n:''))}catch(e){}}try{save()}catch(e){}espClipUi(cid,1)};
window.espClipPlay=cid=>{const c=C.clipes[cid];if(!c)return;const a=aud();
if(a.dataset.id===cid&&a.src&&!a.ended&&a.currentTime>0&&!a.paused){a.pause();espClipTick(cid);return}
if(a.dataset.id!==cid||!a.src){a.dataset.id=cid;a.onerror=null;const base=c.audio.replace(/\.mp3$/,'');let tried=0;a.onerror=()=>{if(!tried++){a.src='assets/audio/'+base+'_sons.mp3';a.play().catch(()=>{})}};a.src='assets/audio/'+c.audio}
a.onended=()=>{if(!clh().includes(cid)){clh().push(cid);try{save()}catch(e){}}if(document.getElementById('espclip'))espClipUi(cid,1);else if(S.tab==='grav'&&semMarca(cid))try{tst('🎯 Gravação ouvida: toque no ⓘ para marcar o que você ouviu')}catch(e){}if(window.gravEnded)gravEnded(cid)};a.ontimeupdate=()=>{espClipTick(cid);window.gmTick&&gmTick()};a.onpause=()=>{espClipTick(cid);window.gmTick&&gmTick()};a.onplay=()=>{espClipTick(cid);window.gmTick&&gmTick()};
a.play().catch(()=>{});espClipTick(cid)};
window.espClipSeek=(cid,t)=>{const a=aud();if(a.dataset.id!==cid||!a.src||a.ended)espClipPlay(cid);const go=()=>{try{a.currentTime=t}catch(e){}if(a.paused)a.play().catch(()=>{});espClipTick(cid)};if(a.readyState>=1)go();else a.addEventListener('loadedmetadata',go,{once:true})};
window.espClipAgain=cid=>{const a=aud();a.dataset.id=cid;try{a.currentTime=0}catch(e){}espClipPlay(cid)};
function espClipTick(cid){const a=A,b=document.getElementById('ecbar'),t=document.getElementById('ectm'),p=document.getElementById('ecpl');if(!b||!a||a.dataset.id!==cid)return;const d=a.duration||C.clipes[cid].dur_s||1;b.style.width=Math.min(100,(a.currentTime/d)*100)+'%';if(t)t.textContent=mm(a.currentTime)+' / '+mm(d);if(p)p.innerHTML=ipl(!a.paused&&!a.ended)}

/* app "Gravações": todas as gravações já coletadas ficam aqui para ouvir de novo */
PIC.grav='<path d="M4.5 15v-3a7.500 7.500 0 0115 0v3" fill="none" stroke="#fff" stroke-width="2" stroke-linecap="round"/><rect class="w" x="3" y="13.500" width="4.500" height="7.500" rx="2"/><rect class="w" x="16.500" y="13.500" width="4.500" height="7.500" rx="2"/>';
/* playlists do app Gravações: por pessoa e por horário */
const GRV={tab:'t',pl:'todas',q:[],qi:-1};
const gtn=id=>C.clipes[id];
const gcol=id=>{let h=0;for(const ch of id)h=(h*31+ch.charCodeAt(0))%360;return `linear-gradient(135deg,hsl(${h} 60% 38%),hsl(${(h+40)%360} 55% 20%))`};
const gHas=id=>S.inv.includes(id);
const LIC={ar:'📻',estudio:'🎙️',caixa:'📮',porta:'🚪',reuniao:'🗂️',vinhetas:'🔔'};
const gLists=()=>{if(GRV.tab!=='l')return [{id:'todas',n:'Todas as gravações',ic:'🎧',sub:'na ordem em que você coletou',clips:S.inv.filter(id=>C.clipes[id])}];
const L=(C.LO||[]).filter(l=>isLo(l.id)||locOpen(l.id)).map(l=>({id:l.id,ic:LIC[l.id]||'🎧',n:l.n,clips:l.c.map(c=>c[0]).filter(id=>C.clipes[id])})).filter(l=>l.clips.length),ids=new Set((C.LO||[]).flatMap(l=>l.c.map(c=>c[0]))),ex=Object.keys(C.clipes).filter(id=>!ids.has(id));
const exh=ex.filter(id=>S.inv.includes(id));if(exh.length)L.push({id:'entregas',ic:'🤝',n:'Entregues em conversa',clips:exh});return L};
const gCover=(l,sz)=>l.av?`<span class=gvcv style="width:${sz}px;height:${sz}px">${av(l.av,sz,0)}</span>`:`<span class=gvcv style="width:${sz}px;height:${sz}px;background:${gcol(l.id)}"><b style="font-size:${Math.round(sz/3.2)}px">${esc(l.ic||'🎧')}</b></span>`;
const gravGrid=()=>{const L=gLists();return `<div class=gvgrid>${L.map(l=>{const n=l.clips.filter(gHas).length;return `<button class=gvcard onclick="gravPl('${l.id}')">${gCover(l,88)}<b>${esc(l.n)}</b><small>${n} de ${l.clips.length} ${l.clips.length===1?'faixa':'faixas'}${l.sub?' · '+esc(l.sub):''}</small></button>`}).join('')}</div>`};
const gravLista=()=>{const l=gLists().find(x=>x.id===GRV.pl);if(!l)return gravGrid();const own=l.clips.filter(gHas);
return `${GRV.tab==='l'?'<button class=gvback onclick="gravPl(null)">‹ Playlists</button>':''}<div class=gvhead>${gCover(l,96)}<div><b>${esc(l.n)}</b><small>${own.length} de ${l.clips.length} faixas${l.sub?' · '+esc(l.sub):''}</small>${own.length?`<button class=gvall onclick="gravTocar('${l.id}')">▶ Tocar tudo</button>`:''}</div></div><div class=gvtr>${l.clips.length?'':'<p class=mut style="padding:10px 0">Nenhuma gravação coletada ainda. Colete nos locais.</p>'}${l.clips.map((id,i)=>{const c=gtn(id),has=gHas(id),playing=A&&A.dataset.id===id&&!A.paused&&!A.ended,heard=clh().includes(id);
return has?`<button class="gvrow ${playing?'on':''}" onclick="gravTocar('${l.id}','${id}')"><span class=gvn>${playing?'<i class=gveq></i>':i+1}</span><span class=gvt><b>${esc(c.nome)}</b><small>${mm(c.dur_s)}${heard?' · ✓ ouvida':''}</small>${heard&&semMarca(id)?'<em class=gvmk>🎯 marcar o que ouviu</em>':''}</span><span class=gvi onclick="event.stopPropagation();espClipUi('${id}')" aria-label="Detalhes">ⓘ</span></button>`:`<div class="gvrow lk"><span class=gvn>🔒</span><span class=gvt><b>Gravação ainda não coletada</b><small>Colete nos locais</small></span></div>`}).join('')}</div>`};
const gravMini=()=>{const id=GRV.q[GRV.qi];if(!id)return '';const c=gtn(id),a=A,pl=a&&a.dataset.id===id&&!a.paused&&!a.ended;return `<div class=gvmini><div class=gvmb><div class=gvmbar id=gmbar></div></div><div class=gvmr><span class=gvmt onclick="espClipUi('${id}')"><b>${esc(c.nome)}</b><small id=gmtm>${mm(c.dur_s)}</small></span><button onclick="gravPrev()" aria-label="Anterior">⏮</button><button class=gvpp id=gmpl onclick="espClipPlay('${id}')" aria-label="Tocar ou pausar">${ipl(pl)}</button><button onclick="gravNext()" aria-label="Próxima">⏭</button></div></div>`};

/* rede de segurança: se o jogador não consegue mais avançar por falta de marcas, o Dr. José revisa as gravações já ouvidas (conta como uma dica) */
window.espMarcasAjuda=()=>{if(!has()||!window.espMarcasPend||!espMarcasPend())return;let n=0;Object.keys(C.clipes).forEach(id=>{if(!clh().includes(id))return;(C.clipes[id].marcas||[]).forEach(m=>{if(m.verdadeira&&!S.inv.includes(m.id)){claim(m);if(!mks().includes(m.id))mks().push(m.id);n++}})});S.hints=(S.hints||0)+1;try{lg('💡','Pediu ao Dr. José para rever as gravações.',20)}catch(e){}try{save()}catch(e){}try{tst('🎧 O Dr. José revisou as gravações e registrou '+n+' marca'+(n>1?'s':'')+' que faltavam.')}catch(e){}render()};
const gravAjuda=()=>window.espMarcasPend&&espMarcasPend()?`<div class=gvhelp><b>Sem mais o que fazer?</b><p>Se você já ouviu tudo e não consegue mais marcar nada, o Dr. José pode rever as gravações e registrar as marcas que faltam. Isso conta como uma dica.</p><button onclick="espMarcasAjuda()">Pedir ajuda ao Dr. José</button></div>`:'';
const gravBody=()=>`<div class=gvtabs>${[['t','Todas'],['l','Por local']].map(([k,t])=>`<button class="${GRV.tab===k?'on':''}" onclick="gravTab('${k}')">${t}</button>`).join('')}</div><div class=gvmain>${gravAjuda()}${GRV.pl?gravLista():gravGrid()}</div>${gravMini()}`;
/* o app Gravações é uma tela cheia, como os outros apps do celular */
APPTABS.push('grav');ANAME.grav='Gravações';
V_.grav=()=>`<div id=gvbody class=gvapp>${gravBody()}</div>`;
window.espGravAbrir=()=>{APPA=1;S.tab='grav';try{save()}catch(e){}render()};
window.espGravRefresh=()=>{const b=document.getElementById('gvbody');if(b){b.innerHTML=gravBody();gmTick()}};
{const _ca=closeApp;closeApp=function(){if(S.tab==='grav'){stop();GRV.q=[];GRV.qi=-1}return _ca.apply(this,arguments)}}

window.gravTab=k=>{GRV.tab=k;GRV.pl=k==='t'?'todas':null;espGravRefresh()};
window.gravPl=id=>{GRV.pl=id;espGravRefresh()};
window.gravTocar=(plId,id)=>{const l=gLists().find(x=>x.id===plId);if(!l)return;const own=l.clips.filter(gHas);if(!own.length)return;const cur=id||own[0];GRV.q=own;GRV.qi=own.indexOf(cur);if(A&&A.dataset.id===cur&&A.src&&!A.ended)espClipPlay(cur);else{if(A){try{A.pause();A.removeAttribute('data-id');A.removeAttribute('src')}catch(e){}}espClipPlay(cur)}espGravRefresh()};
window.gravNext=()=>{if(GRV.qi<GRV.q.length-1){GRV.qi++;const id=GRV.q[GRV.qi];if(A){try{A.pause();A.removeAttribute('src')}catch(e){}}espClipPlay(id);espGravRefresh()}};
window.gravPrev=()=>{if(A&&A.currentTime>3){A.currentTime=0;return}if(GRV.qi>0){GRV.qi--;const id=GRV.q[GRV.qi];if(A){try{A.pause();A.removeAttribute('src')}catch(e){}}espClipPlay(id);espGravRefresh()}};
window.gravEnded=cid=>{if(S.tab!=='grav')return;if(GRV.q[GRV.qi]===cid&&GRV.qi<GRV.q.length-1)gravNext();else espGravRefresh()};
window.gmTick=()=>{const id=GRV.q[GRV.qi],b=document.getElementById('gmbar');if(!b||!A||A.dataset.id!==id)return;const d=A.duration||gtn(id).dur_s||1;b.style.width=Math.min(100,(A.currentTime/d)*100)+'%';const t=document.getElementById('gmtm');if(t)t.textContent=mm(A.currentTime)+' / '+mm(d);const p=document.getElementById('gmpl');if(p)p.innerHTML=ipl(!A.paused&&!A.ended)};
window.espClipClose=()=>{stop();espDel('espclip');try{render()}catch(e){}espMarcaUi();espGravRefresh()};
function espClipUi(cid,keep){const c=C.clipes[cid],cl=CL[cid],e=espEl('espclip','duo-m');e.style.zIndex=2200;const heard=clh().includes(cid),g=S.inv.includes(cid),ms=(c.marcas||[]).slice().sort((x,y)=>hsh(cid+x.id)-hsh(cid+y.id));
e.innerHTML=`<div class="dcard espfs ecw"><div class=esphd><div style="flex:1"><b>${esc(c.nome)}</b><small>🎧 Gravação · ${mm(c.dur_s)}</small></div><button class=dcx onclick="espClipClose()" aria-label="Fechar">✕</button></div><div class=espfl>
<svg class=ecart viewBox="0 0 240 180">${art(cid)}</svg>
<div class=ecbarw><div class=ecbar id=ecbar></div></div><div class=ecctl><button id=ecpl class=ecplay onclick="espClipPlay('${cid}')" aria-label="Tocar ou pausar">${IPL}</button><button class=ecagain onclick="espClipAgain('${cid}')" aria-label="Ouvir de novo">↺</button><span id=ectm>0:00 / ${mm(c.dur_s)}</span></div>
<p class=mut style="margin:8px 0 10px">${esc(cl.d.split(' ').slice(0,40).join(' '))}${cl.d.split(' ').length>40?'…':''}</p>
${c.caps?`<div class=eccaps>${c.caps.map(x=>`<button onclick="espClipSeek('${cid}',${x[1]})">${x[0]}</button>`).join('')}</div>`:''}<div class=ecbox>${heard?`<small>📝 TRANSCRIÇÃO</small><p>${trans(c.transcricao||'')}</p>`:'<small>🔒 TRANSCRIÇÃO</small><p class=mut>Ouça a gravação até o fim, uma vez, para abrir a transcrição.</p>'}</div>
${heard&&ms.length?`<div class=ecbox><small>🎯 O QUE VOCÊ OUVIU?</small><p class=mut style="margin:4px 0 8px">Toque no que você realmente ouviu. Ouça de novo antes de marcar, se precisar.</p>${ms.map(m=>{const done=mks().includes(m.id);return `<button class="ecmk ${done?(m.verdadeira?'ok':'no'):''}" ${done?'disabled':''} onclick="espClipMark('${cid}','${m.id}')"><span>${done?(m.verdadeira?'✓':'✕'):'○'}</span>${esc(m.txt)}${done?`<em>${m.verdadeira?'Marca registrada como prova.':'Não é isso que se ouve aqui.'}</em>`:''}</button>`}).join('')}</div>`:''}
<button class=btn style="width:100%;margin-top:6px" ${g?'disabled':''} onclick="grab('${cid}');espClipUi('${cid}',1)">${g?'Registrado · EV-'+String(S.inv.indexOf(cid)+1).padStart(2,'0'):'Coletar'}</button></div></div>`;
if(keep&&A&&A.dataset.id===cid)espClipTick(cid)}
window.espClipUi=espClipUi;window.espMarcaUi=espMarcaUi;
const _in=window.insp;window.insp=function(id){if(has()&&C.clipes[id]){espClipUi(id);return}return _in.apply(this,arguments)};
/* painel "Marcas de som": hora declarada x hora pelo som */
const found=r=>S.inv.includes(r.marca);
const mkTot=()=>(C.marcas||[]).length,mkOk=()=>(C.marcas||[]).filter(m=>S.inv.includes(m.id)).length;
window.espMarcasHtml=()=>{const L=C.msom,n=L.filter(found).length;
return `<div class=pan style="margin-top:0;border-color:var(--amb)"><h3 style="color:var(--amb)">🎧 Marcas de som</h3><p class=mut style="margin:0 0 10px">Você registrou <b>${mkOk()} de ${mkTot()}</b> marcas de som. As ${L.length} linhas abaixo comparam a hora que cada trecho diz ter com a hora que o som revela (verde: bate; vermelho: não bate), e <b>${n}</b> já foram reveladas.</p>${L.map(r=>{if(!found(r))return `<div class=sentrow><div class=senthd><b>? ? ?</b><i class=mut>?</i></div><p class=mut>Ainda não ouvido: marque o que escuta nas gravações.</p></div>`;const cl=C.clipes[r.clip]||{nome:r.clip},m=CL[r.marca]||{n:r.marca},col=r.bate?'#6fcf8a':'#ff6b5a';
return `<div class=sentrow style="border-color:${col}55"><div class=senthd><b>${esc(cl.nome)}</b><i style="color:${col};border-color:${col}">${r.bate?'Bate':'Não bate'}</i></div><p><span>🔊</span>${esc(m.n)}</p><p><span>🕐</span>Diz ser <b>${esc(r.hora_declarada)}</b> · o som diz <b style="color:${col}">${esc(r.hora_pelo_som)}</b></p></div>`}).join('')}</div>`};
{const _vc=V_.caderno;V_.caderno=function(){if(!has())return _vc.apply(this,arguments);
if(!CDT.some(x=>x[0]==='msom'))CDT.push(['msom','Marcas']);
if(S.f.cd!=='msom')return _vc.apply(this,arguments);
const k='msom',nn=(S.nb||[]).length,bar=`<div class=cdtabs>${CDT.map(([v,t])=>`<button class="${k===v?'on':''}" onclick="S.f.cd='${v}';save();render();$('main').scrollTop=0">${t}${v==='not'&&nn?` <b>${nn}</b>`:''}</button>`).join('')}</div>`;
return bar+espMarcasHtml()}}
window.espMarcasAbrir=()=>{const e=espEl('espmsheet','duo-m');e.style.zIndex=2300;e.innerHTML=`<div class="dcard espfs"><div class=esphd><div style="flex:1"><b>Marcas de som</b><small>Hora declarada x hora pelo som</small></div><button class=dcx onclick="espDel('espmsheet');espMarcaUi()" aria-label="Fechar">✕</button></div><div class=espfl>${espMarcasHtml()}</div></div>`;espMarcaUi()};
function espMarcaUi(){let c=document.getElementById('espmchip');const show=has()&&S&&S.seen>=4&&S.tab!=='grav'&&!CUT&&!RM&&!INS&&!document.getElementById('espmsheet')&&!document.getElementById('espclip')&&!document.getElementById('espfsheet')&&!document.querySelector('#ui .ov');
if(!show){if(c)c.remove();return}const n=mkOk();
if(!c){c=document.createElement('button');c.id='espmchip';c.setAttribute('aria-label','Marcas de som');c.onclick=()=>espMarcasAbrir();document.body.appendChild(c)}
c.innerHTML=`<span>🎧</span><b>${n}/${mkTot()}</b>`;if(n>(window.ESPMN||0)){c.classList.remove('jump');void c.offsetWidth;c.classList.add('jump')}window.ESPMN=n}
{const _r=render;render=function(){if(window.CDT){const i=CDT.findIndex(x=>x[0]==='msom');if(i>=0&&!has())CDT.splice(i,1);else if(i<0&&has())CDT.push(['msom','Marcas'])}const r=_r.apply(this,arguments);try{espMarcaUi()}catch(e){}return r}}
{const _tm=window.toMenu||toMenu;toMenu=function(){stop();espDel('espclip');return _tm.apply(this,arguments)}}
})();
