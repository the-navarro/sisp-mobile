/* Caso 04 (só áudio): tocador de clipes, transcrição que abre após a 1ª escuta, marcas de som e painel "Marcas de som" */
(function(){
const has=()=>!!(typeof C!=='undefined'&&C&&C.esp&&C.clipes);
const clh=()=>(S.clh=S.clh||[]),mks=()=>(S.mks=S.mks||[]);
/* arte do clipe: ondas sonoras e o ícone */
AR.eclip=o=>{const bars=Array.from({length:30},(_,i)=>{const h=8+Math.abs(Math.sin(i*1.7)*34+Math.sin(i*.6)*18);return `<rect x=${18+i*7} y=${90-h/2} width=4 height=${h} rx=2 fill="${o.m?'#eaa73c':'#4fa3d9'}" opacity=${.35+.5*((i%5)/5)} />`}).join('');
return `<rect class=evbg width=240 height=180 fill="#0b121a" /><rect x=10 y=10 width=220 height=160 rx=14 fill="#101c28" stroke="${o.m?'#eaa73c':'#2c4a63'}" stroke-width=1.5 />${bars}<text x=120 y=104 text-anchor=middle font-size=${o.m?44:50} opacity=.95>${o.e||'🎧'}</text>`};
let A=null;const aud=()=>A||(A=new Audio());
const stop=()=>{try{if(A){A.pause();A.removeAttribute('src');A.load()}}catch(e){}};
const mm=t=>{t=Math.max(0,Math.round(t||0));return Math.floor(t/60)+':'+String(t%60).padStart(2,'0')};
const trans=t=>esc(t).split('\n').map(l=>/^\[som:/.test(l)?`<i class=ecs>🔊 ${l.replace(/^\[som:\s*|\]$/g,'')}</i>`:`<span>${l}</span>`).join('<br>');
const hsh=s=>{let x=0;for(let i=0;i<s.length;i++)x=(x*31+s.charCodeAt(i))>>>0;return x};
function claim(m){if(!S.inv.includes(m.id)){S.inv.push(m.id);if(!S.an.includes(m.id))S.an.push(m.id);try{galE(m.id)}catch(e){}try{lg('🔊','Marca de som: '+CL[m.id].n,2)}catch(e){}try{AU.fx('grab')}catch(e){}}}
window.espClipMark=(cid,mid)=>{const c=C.clipes[cid];if(!c||!clh().includes(cid))return;const m=(c.marcas||[]).find(x=>x.id===mid);if(!m||mks().includes(mid))return;mks().push(mid);
if(m.verdadeira){claim(m);try{tst('🔊 Marca registrada: '+(CL[mid]?CL[mid].n:''))}catch(e){}}try{save()}catch(e){}espClipUi(cid,1)};
window.espClipPlay=cid=>{const c=C.clipes[cid];if(!c)return;const a=aud();
if(a.dataset.id===cid&&a.src&&!a.ended&&a.currentTime>0&&!a.paused){a.pause();espClipTick(cid);return}
if(a.dataset.id!==cid||!a.src){a.dataset.id=cid;a.onerror=null;const base=c.audio.replace(/\.mp3$/,'');let tried=0;a.onerror=()=>{if(!tried++){a.src='assets/audio/'+base+'_sons.mp3';a.play().catch(()=>{})}};a.src='assets/audio/'+c.audio}
a.onended=()=>{if(!clh().includes(cid)){clh().push(cid);try{save()}catch(e){}}espClipUi(cid,1)};a.ontimeupdate=()=>espClipTick(cid);a.onpause=()=>espClipTick(cid);a.onplay=()=>espClipTick(cid);
a.play().catch(()=>{});espClipTick(cid)};
window.espClipAgain=cid=>{const a=aud();a.dataset.id=cid;try{a.currentTime=0}catch(e){}espClipPlay(cid)};
function espClipTick(cid){const a=A,b=document.getElementById('ecbar'),t=document.getElementById('ectm'),p=document.getElementById('ecpl');if(!b||!a||a.dataset.id!==cid)return;const d=a.duration||C.clipes[cid].dur_s||1;b.style.width=Math.min(100,(a.currentTime/d)*100)+'%';if(t)t.textContent=mm(a.currentTime)+' / '+mm(d);if(p)p.textContent=(!a.paused&&!a.ended)?'⏸':'▶'}
window.espClipClose=()=>{stop();espDel('espclip');try{render()}catch(e){}espMarcaUi()};
function espClipUi(cid,keep){const c=C.clipes[cid],cl=CL[cid],e=espEl('espclip','duo-m');e.style.zIndex=2200;const heard=clh().includes(cid),g=S.inv.includes(cid),ms=(c.marcas||[]).slice().sort((x,y)=>hsh(cid+x.id)-hsh(cid+y.id));
e.innerHTML=`<div class="dcard espfs ecw"><div class=esphd><div style="flex:1"><b>${esc(c.nome)}</b><small>🎧 Gravação · ${mm(c.dur_s)}</small></div><button class=dcx onclick="espClipClose()" aria-label="Fechar">✕</button></div><div class=espfl>
<svg class=ecart viewBox="0 0 240 180">${art(cid)}</svg>
<div class=ecbarw><div class=ecbar id=ecbar></div></div><div class=ecctl><button id=ecpl class=ecplay onclick="espClipPlay('${cid}')" aria-label="Tocar ou pausar">▶</button><button class=ecagain onclick="espClipAgain('${cid}')" aria-label="Ouvir de novo">↺</button><span id=ectm>0:00 / ${mm(c.dur_s)}</span></div>
<p class=mut style="margin:8px 0 10px">${esc(cl.d.split(' ').slice(0,40).join(' '))}${cl.d.split(' ').length>40?'…':''}</p>
<div class=ecbox>${heard?`<small>📝 TRANSCRIÇÃO</small><p>${trans(c.transcricao||'')}</p>`:'<small>🔒 TRANSCRIÇÃO</small><p class=mut>Ouça a gravação até o fim, uma vez, para abrir a transcrição.</p>'}</div>
${heard&&ms.length?`<div class=ecbox><small>🎯 O QUE VOCÊ OUVIU?</small><p class=mut style="margin:4px 0 8px">Toque no que você realmente ouviu. Ouça de novo antes de marcar, se precisar.</p>${ms.map(m=>{const done=mks().includes(m.id);return `<button class="ecmk ${done?(m.verdadeira?'ok':'no'):''}" ${done?'disabled':''} onclick="espClipMark('${cid}','${m.id}')"><span>${done?(m.verdadeira?'✓':'✕'):'○'}</span>${esc(m.txt)}${done?`<em>${m.verdadeira?'Marca registrada como prova.':'Não é isso que se ouve aqui.'}</em>`:''}</button>`}).join('')}</div>`:''}
<button class=btn style="width:100%;margin-top:6px" ${g?'disabled':''} onclick="grab('${cid}');espClipUi('${cid}',1)">${g?'Registrado · EV-'+String(S.inv.indexOf(cid)+1).padStart(2,'0'):'Coletar'}</button></div></div>`;
if(keep&&A&&A.dataset.id===cid)espClipTick(cid)}
window.espClipUi=espClipUi;window.espMarcaUi=espMarcaUi;
const _in=window.insp;window.insp=function(id){if(has()&&C.clipes[id]){espClipUi(id);return}return _in.apply(this,arguments)};
/* painel "Marcas de som": hora declarada x hora pelo som */
const found=r=>S.inv.includes(r.marca);
window.espMarcasHtml=()=>{const L=C.msom,n=L.filter(found).length;
return `<div class=pan style="margin-top:0;border-color:var(--amb)"><h3 style="color:var(--amb)">🎧 Marcas de som</h3><p class=mut style="margin:0 0 10px">Compare a hora que cada trecho diz ter com a hora que o som revela. Verde: bate. Vermelho: não bate. <b>${n} de ${L.length}</b> marcas.</p>${L.map(r=>{if(!found(r))return `<div class=sentrow><div class=senthd><b>? ? ?</b><i class=mut>?</i></div><p class=mut>Ainda não ouvido: marque o que escuta nas gravações.</p></div>`;const cl=C.clipes[r.clip]||{nome:r.clip},m=CL[r.marca]||{n:r.marca},col=r.bate?'#6fcf8a':'#ff6b5a';
return `<div class=sentrow style="border-color:${col}55"><div class=senthd><b>${esc(cl.nome)}</b><i style="color:${col};border-color:${col}">${r.bate?'Bate':'Não bate'}</i></div><p><span>🔊</span>${esc(m.n)}</p><p><span>🕐</span>Diz ser <b>${esc(r.hora_declarada)}</b> · o som diz <b style="color:${col}">${esc(r.hora_pelo_som)}</b></p></div>`}).join('')}</div>`};
{const _vc=V_.caderno;V_.caderno=function(){if(!has())return _vc.apply(this,arguments);
if(!CDT.some(x=>x[0]==='msom'))CDT.push(['msom','Marcas']);
if(S.f.cd!=='msom')return _vc.apply(this,arguments);
const k='msom',nn=(S.nb||[]).length,bar=`<div class=cdtabs>${CDT.map(([v,t])=>`<button class="${k===v?'on':''}" onclick="S.f.cd='${v}';save();render();$('main').scrollTop=0">${t}${v==='not'&&nn?` <b>${nn}</b>`:''}</button>`).join('')}</div>`;
return bar+espMarcasHtml()}}
window.espMarcasAbrir=()=>{const e=espEl('espmsheet','duo-m');e.style.zIndex=2300;e.innerHTML=`<div class="dcard espfs"><div class=esphd><div style="flex:1"><b>Marcas de som</b><small>Hora declarada x hora pelo som</small></div><button class=dcx onclick="espDel('espmsheet');espMarcaUi()" aria-label="Fechar">✕</button></div><div class=espfl>${espMarcasHtml()}</div></div>`;espMarcaUi()};
function espMarcaUi(){let c=document.getElementById('espmchip');const show=has()&&S&&S.seen>=4&&!CUT&&!RM&&!INS&&!document.getElementById('espmsheet')&&!document.getElementById('espclip')&&!document.getElementById('espfsheet')&&!document.querySelector('#ui .ov');
if(!show){if(c)c.remove();return}const n=C.msom.filter(found).length;
if(!c){c=document.createElement('button');c.id='espmchip';c.setAttribute('aria-label','Marcas de som');c.onclick=()=>espMarcasAbrir();document.body.appendChild(c)}
c.innerHTML=`<span>🎧</span><b>${n}/${C.msom.length}</b>`;if(n>(window.ESPMN||0)){c.classList.remove('jump');void c.offsetWidth;c.classList.add('jump')}window.ESPMN=n}
{const _r=render;render=function(){if(window.CDT){const i=CDT.findIndex(x=>x[0]==='msom');if(i>=0&&!has())CDT.splice(i,1);else if(i<0&&has())CDT.push(['msom','Marcas'])}const r=_r.apply(this,arguments);try{espMarcaUi()}catch(e){}return r}}
{const _tm=window.toMenu||toMenu;toMenu=function(){stop();espDel('espclip');return _tm.apply(this,arguments)}}
})();
