/* Caso 03: painel "Sentidos" (o que Madame Zora ouviu x o que Tico viu), aba no Caderno e botão fixo */
(function(){
const has=()=>!!(typeof C!=='undefined'&&C&&C.esp&&C.matriz&&C.matriz.length);
const V={livre:['Livre','#6fcf8a'],duvida:['Dúvida','#eaa73c'],suspeita:['Suspeita','#ff6b5a']};
const cel=(c,ic)=>S.asked.includes(c.q)?`<p><span>${ic}</span>${esc(c.txt)}</p>`:`<p class=mut><span>${ic}</span>Ainda não revelado.</p>`;
window.espSentHtml=()=>{const m=C.matriz,n=m.filter(r=>S.asked.includes(r.ouvido.q)&&S.asked.includes(r.visto.q)).length;
return `<div class=pan style="margin-top:0;border-color:var(--amb)"><h3 style="color:var(--amb)">👂👁️ Matriz dos sentidos</h3><p class=mut style="margin:0 0 10px">Madame Zora só ouve e cheira; Tico só vê. Cruze o que uma ouviu com o que o outro viu. <b>${n} de ${m.length}</b> completos.</p>${m.map(r=>{const su=C.SU.find(x=>x.id===r.suspeito)||{n:r.suspeito},ok=S.asked.includes(r.ouvido.q)&&S.asked.includes(r.visto.q),v=V[r.veredito]||V.duvida;
return `<div class=sentrow><div class=senthd><b>${esc(nm1?nm1(su.n):su.n)}</b>${ok?`<i style="color:${v[1]};border-color:${v[1]}">${v[0]}</i>`:'<i class=mut>?</i>'}</div>${cel(r.ouvido,'👂')}${cel(r.visto,'👁️')}</div>`}).join('')}</div>`};
{const _vc=V_.caderno;V_.caderno=function(){if(!has())return _vc.apply(this,arguments);
if(!CDT.some(x=>x[0]==='sent'))CDT.push(['sent','Sentidos']);
if(S.f.cd!=='sent')return _vc.apply(this,arguments);
const k='sent',nn=(S.nb||[]).length,bar=`<div class=cdtabs>${CDT.map(([v,t])=>`<button class="${k===v?'on':''}" onclick="S.f.cd='${v}';save();render();$('main').scrollTop=0">${t}${v==='not'&&nn?` <b>${nn}</b>`:''}</button>`).join('')}</div>`;
return bar+espSentHtml()}}
window.espSentAbrir=()=>{const e=espEl('espssheet','duo-m');e.style.zIndex=2300;e.innerHTML=`<div class="dcard espfs"><div class=esphd><div style="flex:1"><b>Matriz dos sentidos</b><small>O que Zora ouviu e o que Tico viu</small></div><button class=dcx onclick="espDel('espssheet');espSentUi()" aria-label="Fechar">✕</button></div><div class=espfl>${espSentHtml()}</div></div>`;espSentUi()};
function espSentUi(){let c=document.getElementById('espschip');const show=has()&&S&&S.seen>=4&&!CUT&&!RM&&!INS&&!document.getElementById('espssheet')&&!document.getElementById('espfsheet')&&!document.querySelector('#ui .ov');
if(!show){if(c)c.remove();return}const n=C.matriz.filter(r=>S.asked.includes(r.ouvido.q)&&S.asked.includes(r.visto.q)).length;
if(!c){c=document.createElement('button');c.id='espschip';c.setAttribute('aria-label','Matriz dos sentidos');c.onclick=()=>espSentAbrir();document.body.appendChild(c)}
c.innerHTML=`<span>👂</span><b>${n}/${C.matriz.length}</b>`;if(n>(window.ESPSN||0)){c.classList.remove('jump');void c.offsetWidth;c.classList.add('jump')}window.ESPSN=n}
{const _r=render;render=function(){if(window.CDT){const i=CDT.findIndex(x=>x[0]==='sent');if(i>=0&&!has())CDT.splice(i,1);else if(i<0&&has())CDT.push(['sent','Sentidos'])}const r=_r.apply(this,arguments);try{espSentUi()}catch(e){}return r}}
})();
