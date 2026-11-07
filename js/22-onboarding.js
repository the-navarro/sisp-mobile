PDX.chefe={e:'almond',n:'pointed',b:'arch',bt:.8,lp:1,mw:.95,sp:7.8,sk:'#d9b496',sh:'#b89478',hc:'#2a1d12',hs:'swept',bg:['#2a3a40','#0b151c'],deco:'',out:'blazer',oc:'#1d3a3f',oc2:'#ece7dc',ic:'#3a2a1c',age:47,g:'',ex:['lipstick:#8a3a44','earrg','smile'],ms:.6};VFEM.add('chefe');
const ONTALK={talk:["Então é você. A Corregedoria disse que ia mandar alguém bom, e eu não costumo ouvir isso à toa.","Eu sou a superintendente Regina Vaz, chefe da Divisão de Homicídios do SISP, o Sistema de Investigação Policial. A partir de hoje, sou a sua chefe. E quem cobra relatório.","Aqui o trabalho é minucioso: cada caso chega com suspeitos mentindo e provas que ninguém olhou direito.","Antes de tudo, preciso registrar você no sistema."],talk2:["Prazer, {n}. Registro aberto.","Agora o crachá: o sistema precisa de uma foto sua. Escolha a sua aparência. Dá para mudar depois."]};
const ONTOUR=[
{s:'.play',t:"Este é o seu painel, {n}. Toque no nome do caso para ir direto à investigação da vez; ele lembra onde você parou."},
{s:'.tl3 .tile:nth-child(1)',t:"O Arquivo guarda todos os casos: os novos, os em andamento e os que você já resolveu."},
{s:'.tl3 .tile:nth-child(2)',t:"Investigador: aqui você muda o seu visual quando quiser."},
{s:'.tl3 .tile:nth-child(3)',t:"A Galeria reúne os selos. Eles premiam quem investiga a fundo e descobre os segredos de cada caso."},
{s:'.tl3 .tile:nth-child(4)',t:"Em Ajustes ficam o som, a acessibilidade e o nível de ajuda do jogo."},
{m:1,t:"Dentro de um caso, o seu celular é a sua central de trabalho. Vou mostrar os aplicativos."},
{m:1,s:'[data-k=locations]',t:"Locais: você vai até o cenário e coleta as provas. Toque nos objetos e colete tudo o que encontrar."},
{m:1,s:'[data-k=lab]',t:"Perícia: depois de coletar, analise cada prova. Muita coisa só aparece aqui."},
{m:1,s:'[data-k=interrogate]',t:"Conversas: com as provas analisadas, converse com cada suspeito. Se pegar uma mentira, use o Contradizer com a prova certa."},
{m:1,s:'[data-k=calls]',t:"Chamadas: a equipe liga com novidades. Atenda sempre, porque pode ser informação de peso."},
{m:1,s:'[data-k=caderno]',t:"Caderno: tudo fica anotado, como a ocorrência, os suspeitos, a cronologia e as suas notas. Consulte sempre que ficar em dúvida."},
{m:1,s:'[data-k=mindmap]',t:"Quadro: aqui você liga as pistas e faz as deduções. Cada dedução certa aproxima você do culpado."},
{m:1,s:'[data-k=solve]',t:"Prisão: com as deduções feitas, acuse o culpado. Errar custa caro. Com três erros, o caso é arquivado."},
{m:1,s:'[data-k=hint]',t:"Dicas: se travar, toque aqui ou na lâmpada, no topo de qualquer aplicativo. No modo Guiado a dica não custa tempo; no Clássico custa 20 minutos do relógio."},
{t:"A ordem é sempre a mesma: coletar, analisar, conversar e deduzir. Os aplicativos vão se liberando a cada etapa."},
{s:'.play',last:1,t:"Vamos começar, {n}? Seu primeiro caso é um treinamento: {caso}. É só tocar no nome do caso quando estiver pronto."}];
const onbN=()=>esc((ONN||(META.pl&&META.pl.n)||'detetive').trim()||'detetive');
const onbT=t=>t.replace(/\{n\}/g,onbN()).replace(/\{caso\}/g,esc(CASES[0].n));
const onbBust=sz=>av('chefe',sz);
function onbKb(){[0,150,400,800].forEach(t=>setTimeout(()=>{document.querySelectorAll('.onr,.onm,#ui,#app').forEach(e=>{e.scrollTop=0;e.scrollLeft=0});window.scrollTo(0,0)},t))}
function onbSplash(){if(ONSB)return;ONSB=1;if((AU.m||AU.f)&&AU.init)AU.init();const sp=document.querySelector('.spl');if(sp)sp.classList.add('out');setTimeout(()=>{ONSB=0;ONI=0;ONS=(META.pl||META.onb)?null:'talk';document.body.classList.add('onrv');render();setTimeout(()=>document.body.classList.remove('onrv'),1100)},330)}
function onbNext(){clearTimeout(ONTM);if(ONS==='talk'){ONI++;if(ONI>=ONTALK.talk.length){ONS='name';ONI=0}}else if(ONS==='talk2'){ONI++;if(ONI>=ONTALK.talk2.length){ONS='avatar';ONI=0}}else if(ONS==='tour'){ONI++;if(ONI>=ONTOUR.length)return onbEnd();onbSched()}render()}
function onbSched(){clearTimeout(ONTM);if(ONS!=='tour')return;const st=ONTOUR[ONI];if(!st)return;if(st.last)return;ONTM=setTimeout(onbNext,3800+st.t.length*55)}
function onbEnd(){clearTimeout(ONTM);ONS=null;META.onb=1;msave();render()}
function plCan(){PLO=0;if(ONS==='avatar'){ONS='tour';ONI=0;onbSched()}render()}
function onbFull(){SET=0;ONN=(META.pl&&META.pl.n)||'';ONS='talk';ONI=0;render()}
function onbReplay(){SET=0;ONS='tour';ONI=0;onbSched();render()}
function onbName(){const i=document.getElementById('onn'),v=((i&&i.value)||'').replace(/[<>&"'`$\\]/g,'').trim().slice(0,14);if(!v){if(i){i.classList.remove('shake');void i.offsetWidth;i.classList.add('shake');i.focus()}return}ONN=v;ONS='talk2';ONI=0;render()}
function onbmod(){if(!ONS||ONS==='avatar')return '';const heroBits=()=>`<div class=hero><svg viewBox="0 0 390 460" preserveAspectRatio="xMidYMax slice" aria-hidden=true>${SKY}</svg><div class=neon><span>S</span><span>I</span><span>S</span><span>P</span></div><div class=nsub>SISTEMA DE INVESTIGAÇÃO POLICIAL</div></div>`;
if(ONS==='splash')return `<div class=spl onclick="onbSplash()" role=button aria-label="Toque para começar"><div class=onbt>Toque em qualquer lugar<br>para começar</div><div class=onbv>INQUÉRITO 104/2026</div></div>`;
const nm='<div class=onm0>Superintendente Regina Vaz<small>Chefe da Divisão de Homicídios</small></div>';
if(ONS==='talk'||ONS==='talk2'){const L=ONTALK[ONS],last=ONI>=L.length-1;return `<div class=onr><div class="obg ${ONI===0?'in':''}"></div><div class=otk onclick="onbNext()"><div class="opt ${ONI===0?'in':''}">${onbBust(190)}</div><div class=odlg>${nm}<p>${esc(onbT(L[ONI])).replace(/&amp;/g,'&')}</p><div class=onx><span class=odots>${L.map((_,i)=>`<i class="${i===ONI?'on':''}"></i>`).join('')}</span><b>${last&&ONS==='talk'?'Toque para se registrar ▸':'Toque para continuar ▸'}</b></div></div></div></div>`}
if(ONS==='name')return `<div class=onr><div class=obg></div><div class=onm><div class=onc><div class=opt style="width:84px;height:84px;border-radius:20px;margin:-60px auto 10px;animation:none;box-shadow:0 8px 20px #000a">${onbBust(84)}</div><h3>Registro de investigador</h3><div class=mut>Como devemos te chamar?</div><input id=onn maxlength=14 autocomplete=off placeholder="Seu nome" value="${esc(ONN)}" onfocus="onbKb()" onblur="onbKb()" onkeydown="if(event.key==='Enter')onbName()"><button class=btn onclick="onbName()">Confirmar</button></div></div></div>`;
if(ONS==='tour'){const st=ONTOUR[ONI]||ONTOUR[0],mock=st.m?`<div class=tmk><div class=pgr>${[['locations'],['lab'],['interrogate'],['calls'],['caderno'],['mindmap'],['solve'],['hint']].map(([k])=>{const a=APPS.find(x=>x[0]===k);return `<button class=pap data-k=${k}><i class=pic style="background:linear-gradient(180deg,${a[2]},${a[3]});--ic:${a[3]}"><svg viewBox="0 0 24 24">${PIC[k]}</svg></i><span>${a[1]}</span></button>`}).join('')}</div></div>`:'';
return `<div class="onr otr" onclick="onbNext()">${st.m||!st.s?'<div class=obg></div>':''}${mock}${st.s?`<div class="spt ${st.m?'nos':''}" data-s="${st.s}"></div>`:''}<div class=odlg><div class=oav>${onbBust(54)}</div>${nm}<p>${esc(onbT(st.t))}</p><div class=onx><span class=odots>${ONTOUR.map((_,i)=>`<i class="${i===ONI?'on':''}"></i>`).join('')}</span><button class=oskip onclick="event.stopPropagation();onbEnd()">Pular</button></div></div></div>`}
return ''}
function onbPos(){const sp=document.querySelector('.spt'),d=document.querySelector('.otr .odlg,.onr>.odlg');if(!sp)return;const u=$('#ui').getBoundingClientRect(),t=document.querySelector(sp.dataset.s);if(!t){sp.style.display='none';return}const r=t.getBoundingClientRect(),pd=6;sp.style.left=(r.left-u.left-pd)+'px';sp.style.top=(r.top-u.top-pd)+'px';sp.style.width=(r.width+pd*2)+'px';sp.style.height=(r.height+pd*2)+'px';if(d)d.classList.toggle('top',!sp.classList.contains('nos')&&(r.top-u.top+r.height/2)>u.height*.5)}
/* ===== Provas interativas: vídeo, livro, coleta e puzzles ===== */
