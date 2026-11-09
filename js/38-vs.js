/* ===== Corrida online (modo competitivo) =====
   Dois celulares, mesma sala da Dupla Online. Os dois jogam o MESMO caso (principal ou rápido) cada um no seu aparelho,
   com o motor normal do jogo. Pela sala só trafegam: pronto, andamento, golpes, defesas e resultado.
   Eventos: vr (pronto) · vp (andamento) · vh (golpe) · vd (resposta ao golpe) · vf (fim). */
window.VS={g:null,t:'m',id:null,gf:1,ph:'',rdy:{},tOpen:0,t0:0,p:0,ch:0,held:0,pen:0,err:0,lastP:0,sentP:0,sentT:0,rp:0,fx:{},inc:null,q:[],fin:{me:null,ri:null},snap:null,egg:0,eggN:0,eggT:0,iv:null,gone:0,used:0,lf:null,res:null,pk:{t:'m',gf:1}};
const VSCH=20;
const VSG={
 nevoa:{n:'Névoa',i:'🌫️',d:'Embaça a tela do rival por 8 segundos.'},
 longo:{n:'Interrogatório longo',i:'⏳',d:'Os suspeitos do rival demoram a responder por 25 segundos.'},
 mexe:{n:'Embaralhar',i:'🔀',d:'Troca a ordem dos suspeitos do rival por 30 segundos.'},
 pista:{n:'Pista falsa',i:'📝',d:'Um bilhete anônimo e enganoso cai na mesa do rival.'},
 chuva:{n:'Chuva forte',i:'⛈️',d:'Chuva e relâmpagos na tela do rival por 10 segundos.'},
 tele:{n:'Telefonema da chefe',i:'📞',d:'A chefe liga e o rival precisa atender.'},
 cad:{n:'Troca de caderno',i:'📒',d:'Leva o rival de volta para a primeira aba.'},
 rel:{n:'Relógio roubado',i:'⏱️',d:'Soma 20 segundos ao tempo do rival.'},
 isca:{n:'Isca',i:'🎭',d:'Finge um golpe para o rival gastar o escudo à toa.'}};
const VSFALSA=['“Vi alguém de chapéu saindo pela porta dos fundos.”','“O culpado é canhoto, tenho certeza.”','“Ouvi dizer que a vítima devia dinheiro a todo mundo.”','“A prova mais importante está no último lugar que você pensa em olhar.”','“Ignore o primeiro suspeito: ele estava em outro lugar a noite toda.”','“Quem mais fala é quem menos sabe.”'];
const vsTitle=(t,id)=>{try{if(t==='r'){const c=RQC.find(x=>x.id===id);return c?c.titulo:id}const c=CASES.find(x=>x.id===id);return c?c.n:id}catch(e){return id}};
const vsOth=()=>DC.names[1-DC.me]||'Rival';
const vsMe=()=>DC.names[DC.me]||'Você';
const vsEmit=(k,d)=>{if(!DC.on||!VS.g)return;const id=Date.now().toString(36)+Math.random().toString(36).slice(2,6),e={u:DC.uid,t:Date.now(),k,x:VS.g,d:JSON.stringify(d||{})};NET.set(DC.cod,'ev/'+id,e).catch(()=>{})};
const vsFmt=ms=>{const s=Math.max(0,Math.round(ms/1000));return Math.floor(s/60)+':'+String(s%60).padStart(2,'0')};
const vsEl=(id,cls)=>{let e=document.getElementById(id);if(!e){e=document.createElement('div');e.id=id;if(cls)e.className=cls;document.body.appendChild(e)}return e};
const vsDel=id=>{const e=document.getElementById(id);if(e)e.remove()};
const vsSnd=k=>{try{AU.fx&&AU.fx(k)}catch(e){}};

/* ---------- convite e escolha do caso ---------- */
window.vsLobby=()=>{if(!DC.on)return '';const both=DC.names[0]&&DC.names[1];
if(VS.g&&VS.ph==='ask')return `<button class=dbtn onclick="vsPrompt()">🏁 Corrida: ${esc(vsTitle(VS.t,VS.id))}</button>`;
return DC.host&&both?`<button class=dbtn style="background:transparent;border:1px solid #eaa73c;color:#eaa73c" onclick="vsPicker()">🏁 Corrida competitiva</button>`:''};
window.vsPicker=()=>{const m=vsEl('vsm','duo-m'),P=VS.pk,L=P.t==='m'?CASES.map(c=>[c.id,c.n,c.tut?'Tutorial':(c.place||'')]):RQC.map(c=>[c.id,c.titulo,(c.cenario&&c.cenario.local||'').split(',')[0]]);
m.innerHTML=`<div class=dcard style="text-align:left;max-height:94vh;overflow:auto"><small>CORRIDA COMPETITIVA</small><h2 style="margin:2px 0 6px">Quem resolve primeiro?</h2><p class=dsm style="margin-top:0">Os dois jogam o mesmo caso, cada um no seu celular. Quem acusar certo primeiro vence.</p>
<div class=vstabs><button class="${P.t==='m'?'on':''}" onclick="VS.pk.t='m';vsPicker()">Principais</button><button class="${P.t==='r'?'on':''}" onclick="VS.pk.t='r';vsPicker()">Rápidos</button></div>
<label class=vsgf><input type=checkbox ${P.gf?'checked':''} onchange="VS.pk.gf=this.checked?1:0"> <span><b>Golpes ligados</b><small>Quem investiga bem ganha golpes para atrapalhar o rival. Desligue para uma corrida pura.</small></span></label>
${L.map(o=>`<button class=dopt onclick="vsStart('${P.t}','${o[0]}')"><b>${esc(o[1])}</b><span>${esc(o[2]||'')}</span></button>`).join('')}<button class="dbtn gh" onclick="vsDel('vsm')">Voltar</button></div>`};
window.vsStart=(t,id)=>{if(!DC.host)return;const n=1+Math.max(0,...Object.keys(DC.evs).map(i=>+(/^v(\d+)$/.exec(DC.evs[i].x||'')||[0,0])[1]),+(/^v(\d+)$/.exec(VS.g||'')||[0,0])[1]);const g='v'+n;
NET.set(DC.cod,'k',`v:${t}${VS.pk.gf?1:0}:${id}:${g}`).catch(()=>{});vsDel('vsm');vsSet(t,id,VS.pk.gf,g)};
function vsSet(t,id,gf,g){if(VS.ph==='run'||VS.ph==='cd')return;vsReset();VS.g=g;VS.t=t;VS.id=id;VS.gf=+gf?1:0;VS.ph='ask';VS.tOpen=Date.now()-1500;const dm=document.getElementById('dcm');if(dm)dm.remove();vsPrompt()}
function vsReset(){clearInterval(VS.iv);VS.iv=null;Object.assign(VS,{ph:'',rdy:{},t0:0,p:0,ch:0,held:0,pen:0,err:0,lastP:0,sentP:0,sentT:0,rp:0,fx:{},inc:null,q:[],fin:{me:null,ri:null},egg:0,eggN:0,used:0,lf:null,res:null,gone:0});['vsw','vsb','vsn','vsr','vst','vsfog','vsres','vscd','vsg'].forEach(vsDel);document.body.classList.remove('vsrun','vs-fog')}
window.vsPrompt=()=>{if(VS.ph!=='ask')return;const m=vsEl('vsm','duo-m'),me=VS.rdy[DC.uid],oth=Object.keys(VS.rdy).some(u=>u!==DC.uid);
m.innerHTML=`<div class=dcard style="text-align:left"><small>🏁 CORRIDA COMPETITIVA</small><h2 style="margin:2px 0 6px">${esc(vsTitle(VS.t,VS.id))}</h2><p class=dsm style="margin-top:0">${esc(DC.host?'Você chamou':vsOth()+' chamou')} ${DC.host?esc(vsOth()):'você'} para uma corrida. Os dois jogam o mesmo caso ao mesmo tempo. Vence quem acusar certo primeiro. Erros custam 20 segundos.</p>
<div class=vsrules><span>${VS.gf?'⚡ Golpes ligados: investigar bem enche a barra e dá um golpe para atrapalhar o rival. Com um golpe guardado, dá para defender ou rebater o do rival.':'🏁 Corrida pura, sem golpes.'}</span></div>
<p class=dsm>${me?(oth?'Começando…':'Aguardando '+esc(vsOth())+' ficar pronto…'):oth?esc(vsOth())+' já está pronto.':''}</p>
${me?'':`<button class=dbtn onclick="vsReady()">Estou pronto</button>`}<button class="dbtn gh" onclick="vsCancel()">${me?'Cancelar':'Recusar'}</button></div>`};
window.vsCancel=()=>{vsDel('vsm');VS.ph='';VS.rdy={};DC.st='lobby'};
window.vsReady=()=>{if(VS.ph!=='ask')return;VS.rdy[DC.uid]=1;vsEmit('vr',{});vsPrompt();vsCheckGo()};
function vsCheckGo(){if(VS.ph!=='ask')return;if(Object.keys(VS.rdy).length>=2){VS.ph='cd';vsDel('vsm');let n=3;const e=vsEl('vscd');const t=()=>{if(n>0){e.innerHTML=`<b>${n}</b>`;vsSnd('chime');n--;setTimeout(t,900)}else{e.innerHTML='<b style="font-size:48px">VALENDO!</b>';setTimeout(()=>{vsDel('vscd');vsGo()},700)}};t()}}

/* ---------- começar, acompanhar e terminar ---------- */
function vsGo(){VS.ph='run';VS.t0=Date.now();DC.open=0;const id=VS.id;
if(VS.t==='m'){const c=CASES.find(x=>x.id===id);VS.snap={ls:localStorage.getItem(c.key),key:c.key,done:META.done[id],p:META.p[id],rk:META.rk&&META.rk[id]};c.key=c.key+'-vs';try{localStorage.removeItem(c.key)}catch(e){}startCase(id,true)}
else{const r=RQM();VS.snap={prog:r.prog[id]?JSON.parse(JSON.stringify(r.prog[id])):undefined,done:r.done[id],how:(META.how||{}).rq};delete r.prog[id];META.how=META.how||{};META.how.rq=1;rqOpen(id);RQ.pno=1;RQ.cho=0;rqStart();RQ.cho=0}
document.body.classList.add('vsrun');vsHud();clearInterval(VS.iv);VS.iv=setInterval(vsTick,400);render()}
function vsProg(){try{if(VS.t==='m'){return C&&S?pct():0}const c=rqC(VS.id);if(!RQ||!c)return VS.p;const tq=Object.values(c.interrogatorio).reduce((n,a)=>n+a.length,0)||1,tp=c.provas.length||1;return Math.min(100,Math.round(RQ.asked.length/tq*60+Math.min(RQ.inv.length+0,tp)/tp*40))}catch(e){return VS.p}}
function vsTick(){if(VS.ph!=='run'&&VS.ph!=='out')return;const now=Date.now();
if(VS.ph==='run'){
 const p=vsProg();if(p>VS.p){if(VS.gf&&!VS.held){VS.ch=Math.min(VSCH,VS.ch+(p-VS.p));if(VS.ch>=VSCH){VS.held=1;VS.ch=0;vsNote('⚡ Você ganhou um golpe!');vsSnd('chime')}}VS.p=p}
 if(p!==VS.sentP&&(now-VS.sentT>1800)){VS.sentP=p;VS.sentT=now;vsEmit('vp',{p})}
 /* fim */
 if(VS.t==='m'){if(C&&S&&S.won)vsFinish(1,{sc:score().r});else if(C&&S&&S.strikes>=3)vsFinish(0,{out:1});else if(MENU||!C||C.id!==VS.id){VS.gone++;if(VS.gone>=4)vsFinish(0,{ff:1})}else VS.gone=0}
 else{if(!RQ)VS.gone++;else{VS.gone=0;if(RQ.fin&&RQ.fin!==VS.lf){VS.lf=RQ.fin;if(RQ.fin.ok)vsFinish(1,{sc:RQ.fin.st});else{VS.err++;VS.pen+=20000;vsNote('✖ Acusação errada: +20 s')}}}if(VS.gone>=4)vsFinish(0,{ff:1})}
 if(VS.t==='m'&&C&&S&&S.strikes>VS.err&&VS.ph==='run'){VS.pen+=20000*(S.strikes-VS.err);VS.err=S.strikes;vsNote('✖ Acusação errada: +20 s')}}
for(const k in VS.fx){if(VS.fx[k]<now){delete VS.fx[k];vsFxOff(k)}}
vsHud()}
function vsFinish(ok,x){if(VS.ph!=='run')return;x=x||{};const tm=Date.now()-VS.t0+VS.pen;VS.ph=ok?'end':'out';VS.fin.me={ok,tm,er:VS.err,sc:x.sc==null?'':x.sc,ff:x.ff?1:0,out:x.out?1:0,ts:Date.now()};
if(VS.t==='m'&&ok){try{CUT=null;clearTimeout(CTM);AU.vstop()}catch(e){}}
vsEmit('vf',{ok:ok?1:0,tm,er:VS.err,sc:String(x.sc==null?'':x.sc),ff:x.ff?1:0,out:x.out?1:0});if(ok){vsNote('🏁 Acusação enviada! Conferindo o resultado…');setTimeout(vsResolve,1600)}else vsResolve()}
function vsResolve(){const m=VS.fin.me,r=VS.fin.ri;let w=null;
if(m&&m.ok&&r&&r.ok)w=m.ts<=r.ts?'me':'ri';else if(m&&m.ok)w='me';else if(r&&r.ok)w='ri';else if(m&&r&&r.ff&&!m.ff)w='me';else if(m&&r&&m.ff)w='ri';else if(m&&r)w='draw';
if(VS.ph==='out'&&!w){vsHud();return}
if(w&&!VS.res){VS.res=w;vsResult()}}
window.vsResult=()=>{const w=VS.res,m=VS.fin.me,r=VS.fin.ri;vsDel('vsw');vsDel('vsg');vsSnd(w==='me'?'chime':'thud');
const stat=(o,n)=>o?`<div class=vscol><b>${esc(n)}</b><span>${o.ff?'Desistiu':o.ok?'Acusou certo':o.out?'Arquivado':'Não terminou'}</span><span>Tempo: <b>${vsFmt(o.tm)}</b></span><span>Erros: <b>${o.er}</b></span>${o.sc!==''&&o.sc!=null?`<span>Nota: <b>${VS.t==='r'?'★'.repeat(+o.sc||0):esc(o.sc)}</b></span>`:''}</div>`:`<div class=vscol><b>${esc(n)}</b><span>Ainda jogando…</span></div>`;
const e=vsEl('vsres','duo-m');e.style.zIndex=2500;e.innerHTML=`<div class=dcard><small>🏁 ${esc(vsTitle(VS.t,VS.id))}</small><div class=vsbig style="color:${w==='me'?'#6fd18f':w==='ri'?'#e0645c':'#eaa73c'}">${w==='me'?'VOCÊ VENCEU':w==='ri'?'VOCÊ PERDEU':'EMPATE'}</div><p class=dsm>${w==='me'?(r&&r.ff?esc(vsOth())+' desistiu.':'Você acusou certo primeiro.'):w==='ri'?(m&&m.ff?'Você saiu da corrida.':esc(vsOth())+' acusou certo primeiro.'):'Os dois ficaram sem solução.'}</p><div class=vscols>${stat(m,vsMe())}${stat(r,vsOth())}</div><button class=dbtn onclick="vsEnd(1)">Voltar à sala</button><button class="dbtn gh" onclick="vsEnd(0)">Sair da corrida</button></div>`};
window.vsEnd=toLobby=>{clearInterval(VS.iv);VS.iv=null;const sn=VS.snap;
if(sn){try{if(VS.t==='m'){const c=CASES.find(x=>x.id===VS.id);try{save()}catch(e){}toMenu();try{localStorage.removeItem(c.key)}catch(e){}c.key=sn.key;if(sn.ls!=null)localStorage.setItem(sn.key,sn.ls);if(sn.done===undefined)delete META.done[VS.id];else META.done[VS.id]=sn.done;if(sn.p===undefined)delete META.p[VS.id];else META.p[VS.id]=sn.p;if(META.rk){if(sn.rk===undefined)delete META.rk[VS.id];else META.rk[VS.id]=sn.rk}}
 else{const r=RQM();if(sn.prog===undefined)delete r.prog[VS.id];else r.prog[VS.id]=sn.prog;if(sn.done===undefined)delete r.done[VS.id];else r.done[VS.id]=sn.done;if(sn.how===undefined&&META.how)delete META.how.rq;try{rqExit()}catch(e){}}
 msave()}catch(e){}}
VS.snap=null;const g=VS.g;vsReset();VS.g=g;VS.ph='over';document.body.classList.remove('vsrun');
if(toLobby&&DC.on){DC.st='lobby';dcMod()}else{try{DC.open=0}catch(e){}render()}}
window.vsQuit=()=>{if(!confirm('Desistir da corrida? O rival vence.'))return;vsFinish(0,{ff:1})};

/* ---------- barra no topo ---------- */
function vsHud(){if(VS.ph!=='run'&&VS.ph!=='out')return vsDel('vshud');const e=vsEl('vshud');const now=Date.now(),t=vsFmt(now-VS.t0+VS.pen),ch=Math.round(100*VS.ch/VSCH);
e.innerHTML=`<span class=vsav>${dcAvParc(24)}</span><span class=vsrb><i style="width:${VS.rp}%"></i><em>${esc(dcFirst(vsOth()))} ${VS.rp}%</em></span><button class=vstm onclick="vsEgg()" aria-label="Tempo">${VS.ph==='out'?'⌛':t}</button>${VS.gf?`<button class="vsgb ${VS.held?'on':''}" onclick="vsGolpes()" aria-label="Golpes"><i style="height:${VS.held?100:ch}%"></i><b>⚡</b></button>`:''}<button class=vsx onclick="vsQuit()" aria-label="Desistir">✕</button>`;
if(VS.ph==='out'&&!VS.res){e.querySelector('.vstm').title='Arquivado'}}
window.vsEgg=()=>{const now=Date.now();if(now-VS.eggT>2500)VS.eggN=0;VS.eggT=now;VS.eggN++;if(VS.eggN>=7&&!VS.egg&&VS.gf){VS.egg=1;VS.held=1;VS.ch=0;vsNote('🔥 Você achou o isqueiro do chefe! Golpe grátis.');vsSnd('chime');vsHud()}};
function vsNote(t){try{tst(t)}catch(e){}}

/* ---------- golpes que você lança ---------- */
window.vsGolpes=()=>{if(!VS.gf||VS.ph!=='run')return;if(!VS.held){vsNote('⚡ Continue investigando: a barra está em '+Math.round(100*VS.ch/VSCH)+'%.');return}
const e=vsEl('vsg','duo-m');e.style.zIndex=2200;e.innerHTML=`<div class=dcard style="text-align:left;max-height:92vh;overflow:auto"><small>⚡ ESCOLHA O GOLPE</small><p class=dsm style="margin:2px 0 6px">Ao usar, você gasta o golpe guardado. Guardá-lo também serve para defender ou rebater.</p>${Object.keys(VSG).map(k=>`<button class=dopt onclick="vsUse('${k}')"><b>${VSG[k].i} ${VSG[k].n}</b><span>${VSG[k].d}</span></button>`).join('')}<button class="dbtn gh" onclick="vsDel('vsg')">Guardar para me defender</button></div>`};
window.vsUse=k=>{vsDel('vsg');if(!VS.held||VS.ph!=='run')return;VS.held=0;VS.used++;const real=k==='isca'?['nevoa','chuva','tele','pista','longo','mexe'][Math.floor(Math.random()*6)]:k;
vsEmit('vh',{i:Date.now().toString(36),k:real,f:k==='isca'?1:0});VS.last={k:real,f:k==='isca'?1:0};vsNote((k==='isca'?'🎭 Isca lançada…':VSG[k].i+' '+VSG[k].n+' lançado!'));vsHud()};

/* ---------- golpes que chegam ---------- */
function vsIncoming(d,from){if(VS.ph!=='run'||!VS.gf)return;if(VS.inc){VS.q.push([d,from]);return}
VS.inc={i:d.i,k:d.k,f:d.f,end:Date.now()+3000,from};vsSnd('thud');vsWarn();VS.incIv=setInterval(vsWarnTick,80)}
function vsWarn(){const I=VS.inc;if(!I)return vsDel('vsw');const e=vsEl('vsw');const left=Math.max(0,I.end-Date.now()),win=left<=1000,g=VSG[I.k];
e.innerHTML=`<div class=vswc><div class=vswh><b>⚠️ ${esc(dcFirst(vsOth()))} vai te atingir!</b><span>${g.i} ${g.n}</span></div><div class=vswbar><i style="width:${Math.round(100*left/3000)}%"></i><u></u></div>${VS.held?`<div class=vswb><button onclick="vsDefend()">🛡️ Defender</button><button class="${win?'gold':''}" onclick="vsParry()">↩️ Rebater</button></div><small>${win?'AGORA! Toque em Rebater.':'Rebater só funciona no último segundo. Defender sempre funciona.'}</small>`:'<small>Você não tem golpe guardado para se defender.</small>'}</div>`}
function vsWarnTick(){const I=VS.inc;if(!I){clearInterval(VS.incIv);return}if(Date.now()>=I.end){vsResolveHit('hit')}else vsWarn()}
function vsResolveHit(r){const I=VS.inc;if(!I)return;clearInterval(VS.incIv);VS.inc=null;vsDel('vsw');
if(r==='hit'){if(!I.f)vsFx(I.k)}
vsEmit('vd',{i:I.i,r,k:I.k,f:I.f});const nx=VS.q.shift();if(nx)setTimeout(()=>vsIncoming(nx[0],nx[1]),400)}
window.vsDefend=()=>{if(!VS.inc||!VS.held)return;VS.held=0;vsNote('🛡️ Golpe bloqueado!');vsResolveHit('def');vsHud()};
window.vsParry=()=>{const I=VS.inc;if(!I||!VS.held)return;VS.held=0;const ok=I.end-Date.now()<=1000;if(ok){vsNote('↩️ Rebatido! O golpe volta para '+vsOth()+'.');vsResolveHit('reb')}else{vsNote('Cedo demais! O golpe acertou.');vsResolveHit('hit')}vsHud()};
function vsAnswer(d){const g=VSG[d.k]||{n:'Golpe',i:''};if(d.r==='def'){vsNote('🛡️ '+vsOth()+' bloqueou '+(d.f?'a isca':'o seu golpe')+'.')}else if(d.r==='reb'){if(d.f){vsNote('↩️ '+vsOth()+' rebateu a sua isca. Sem efeito.')}else{vsNote('↩️ '+vsOth()+' rebateu! O golpe voltou para você.');vsFx(d.k)}}else{vsNote(d.f?'🎭 Sua isca não enganou ninguém, mas gastou a atenção de '+vsOth()+'.':'💥 '+g.n+' acertou '+vsOth()+'.')}}

/* ---------- efeitos na minha tela ---------- */
function vsFx(k){const now=Date.now();
if(k==='nevoa'){VS.fx.nevoa=now+8000;vsEl('vsfog').className='on'}
else if(k==='longo'){VS.fx.longo=now+25000;vsNote('⏳ Os suspeitos estão demorando a responder…')}
else if(k==='mexe'){VS.fx.mexe=now+30000;vsMix();vsNote('🔀 Os suspeitos mudaram de lugar!')}
else if(k==='chuva'){VS.fx.chuva=now+10000;vsEl('vsr').innerHTML='<div class=vsrain></div><div class=vsflash></div>'}
else if(k==='pista'){const e=vsEl('vsn');e.innerHTML=`<div class=vsnc><small>BILHETE ANÔNIMO</small><p>${esc(VSFALSA[Math.floor(Math.random()*VSFALSA.length)])}</p><button onclick="vsDel('vsn')">Dispensar</button></div>`;setTimeout(()=>vsDel('vsn'),20000)}
else if(k==='tele'){const e=vsEl('vst','duo-m');e.style.zIndex=2300;e.innerHTML=`<div class=dcard><div class=vsring>📞</div><h2>Chefe ligando…</h2><button class=dbtn onclick="vsAtender()">Atender</button></div>`;vsSnd('chime')}
else if(k==='cad'){try{if(VS.t==='r'&&RQ){RQ.tab='su';RQ.pv=null;RQ.su=null}else if(C&&S){S.tab='dossier';CHO=0}render()}catch(e){}vsNote('📒 O caderno foi trocado!')}
else if(k==='rel'){VS.pen+=20000;vsNote('⏱️ +20 segundos no seu tempo!')}
vsHud()}
function vsFxOff(k){if(k==='nevoa')vsDel('vsfog');if(k==='chuva')vsDel('vsr');if(k==='mexe'){document.querySelectorAll('[data-vsmix]').forEach(e=>{e.style.order='';e.removeAttribute('data-vsmix')})}}
window.vsAtender=()=>{const e=document.getElementById('vst');if(!e)return;e.innerHTML=`<div class=dcard><div class=vsring style="animation:none">👩‍✈️</div><p style="font-size:16px;font-style:italic">“Cadê o relatório? Quero tudo em cima da minha mesa. Volte ao trabalho!”</p></div>`;setTimeout(()=>vsDel('vst'),3800)};
function vsMix(){if(!VS.fx.mexe)return;let seed=(VS.t0%100000)+7;const rnd=()=>{seed=(seed*1664525+1013904223)>>>0;return seed/4294967296};
['.ci','.rqsu','.rqch>button'].forEach(sel=>{const L=[...document.querySelectorAll(sel)];if(L.length<2)return;const o=L.map((_,i)=>i);for(let i=o.length-1;i>0;i--){const j=Math.floor(rnd()*(i+1));[o[i],o[j]]=[o[j],o[i]]}
L.forEach((e,i)=>{e.style.order=o[i];e.setAttribute('data-vsmix',1);const pe=e.parentElement;if(pe){const d=getComputedStyle(pe).display;if(d!=='flex'&&d!=='grid'){pe.style.display='flex';pe.style.flexDirection='column'}}})})}
/* interrogatório longo: segura a pergunta por 5 s */
function vsHold(fn,ctx,args){if(!VS.fx.longo||VS.ph!=='run')return fn.apply(ctx,args);const e=vsEl('vsb');e.innerHTML='<div class=vsbc><span></span><span></span><span></span><p>O suspeito está pensando…</p></div>';setTimeout(()=>{vsDel('vsb');try{fn.apply(ctx,args)}catch(x){}},5000)}
{const _rq=window.rqAsk;if(_rq)window.rqAsk=function(){const a=arguments,t=this;if(VS.fx.longo&&VS.ph==='run'&&!(VS.hold)){VS.hold=1;vsHold(_rq,t,a);setTimeout(()=>{VS.hold=0},5100);return}return _rq.apply(this,arguments)};
 const _ak=ask;ask=function(){const a=arguments,t=this;if(VS.fx.longo&&VS.ph==='run'&&!VS.hold){VS.hold=1;vsHold(_ak,t,a);setTimeout(()=>{VS.hold=0},5100);return}return _ak.apply(this,arguments)}}
{const _r=render;render=function(){_r.apply(this,arguments);try{if(VS.ph==='run'||VS.ph==='out'){vsHud();if(VS.fx.mexe)vsMix()}}catch(e){}}}

/* ---------- eventos que chegam do outro celular ---------- */
{const _d=dcOnEv;dcOnEv=function(id,e){_d.apply(this,arguments);try{if(!e||!e.k||e.k.charAt(0)!=='v'||e.x!==VS.g||!VS.g)return;let d={};try{d=JSON.parse(e.d||'{}')}catch(x){}
 if(e.k==='vr'){VS.rdy[e.u]=1;if(VS.ph==='ask'){vsPrompt();vsCheckGo()}return}
 if(e.u===DC.uid||(e.t||0)<VS.tOpen)return;
 if(e.k==='vp'){VS.rp=d.p|0;vsHud()}
 else if(e.k==='vh')vsIncoming(d,e.u);
 else if(e.k==='vd')vsAnswer(d);
 else if(e.k==='vf'){VS.fin.ri={ok:!!d.ok,tm:d.tm|0,er:d.er|0,sc:d.sc||'',ff:!!d.ff,out:!!d.out,ts:e.t};if(VS.ph==='run'&&(d.ok||d.ff)){VS.ph=d.ok?'lost':'won'}vsResolve2()}
}catch(x){}}}
function vsResolve2(){if(VS.ph==='lost'||VS.ph==='won'){/* o rival terminou primeiro, ou desistiu */const ok=VS.ph==='won';VS.fin.me=VS.fin.me||{ok:false,tm:Date.now()-VS.t0+VS.pen,er:VS.err,sc:'',ff:ok?0:0,ts:Date.now()};VS.ph='end';if(VS.t==='m'){try{CUT=null;clearTimeout(CTM);AU.vstop()}catch(e){}}}vsResolve()}
/* corrida chamada pelo outro celular */
{const _k=dcK;dcK=function(){const m=/^v:([pmr])([01]):([A-Za-z0-9_]+):(v\d+)$/.exec(DC.k||'');if(!m)return _k.apply(this,arguments);if(VS.g===m[4])return;const t=m[1]==='r'?'r':'m',id=m[3],gf=m[2],g=m[4];
 if(DC.host)return;setTimeout(()=>{if(VS.g===g)return;const done=Object.keys(DC.evs).some(i=>DC.evs[i].x===g&&DC.evs[i].k==='vf');if(done)return;vsSet(t,id,gf,g);try{tst('🏁 '+vsOth()+' chamou você para uma corrida!')}catch(e){}},1200)}}
