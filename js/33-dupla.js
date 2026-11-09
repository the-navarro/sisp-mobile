/* ===== Modo dupla: Papéis (um celular, duas pessoas, visões diferentes) =====
   Regra: o jogo solo não muda. Em dupla, o progresso fica em outro lugar
   (META.duo.store e chaves '-duo'), trocado por baixo dos panos. */
const DUOF=['rq','tl','p','done','rk','last'];
window.DUO={on:0,stash:null,shown:{},lc:{},sg:{},conf:null,mode:0,setup:null,sb:0,t0:{}};
const DUOCOL=['#eaa73c','#4aa3df','#d86a8a','#5fbf7a','#9a7ad8','#e8e0d0'];
const DU=()=>{const d=META.duo=META.duo||{};d.ses=d.ses||{};d.store=d.store||{};return d};
const duoCfg=()=>DUO.net&&window.COOP&&COOP.on?{j:[{n:COOP.names[0]||'Jogador 1',c:DUOCOL[0]},{n:COOP.names[1]||'Jogador 2',c:DUOCOL[1]}],ev:3}:(DU().cfg||null);
const duoPl=i=>{const c=duoCfg();return c?c.j[i]:{n:'Jogador '+(i+1),c:DUOCOL[i]}};

/* guarda o progresso da dupla separado do solo */
{const _si=Storage.prototype.setItem;Storage.prototype.setItem=function(k,v){if(k==='sisp-meta'&&DUO.on&&DUO.stash){try{const o=JSON.parse(v);o.duo=o.duo||{};o.duo.store={};DUOF.forEach(f=>o.duo.store[f]=o[f]);DUOF.forEach(f=>{if(DUO.stash[f]===undefined)delete o[f];else o[f]=DUO.stash[f]});v=JSON.stringify(o)}catch(e){}}return _si.call(this,k,v)}}
function duoOn(){if(DUO.on)return;const st=DU().store||{};DUO.stash={};DUOF.forEach(k=>DUO.stash[k]=META[k]);
META.rq=st.rq||{done:{},prog:{}};META.tl=st.tl||{done:{},prog:{}};META.p=st.p||{};META.done=st.done||{};META.rk=st.rk||{};if(st.last===undefined)delete META.last;else META.last=st.last;
DUO.on=1;DUO.shown={};try{localStorage.setItem('sisp-modo','dupla')}catch(e){}}
function duoOff(){if(!DUO.on)return;const d=DU();d.store={};DUOF.forEach(k=>d.store[k]=META[k]);DUOF.forEach(k=>{if(DUO.stash[k]===undefined)delete META[k];else META[k]=DUO.stash[k]});DUO.on=0;DUO.stash=null;try{localStorage.setItem('sisp-modo','solo')}catch(e){}msave()}
{const _sc=startCase;startCase=function(id,fr){const c=CASES.find(x=>x.id===id);if(c){if(!c.k0)c.k0=c.key;c.key=DUO.on?c.k0+'-duo':c.k0}if(DUO.on&&fr)delete DU().ses['c:'+id];return _sc.apply(this,arguments)}}
{const _rp=window.rqReplay;if(_rp)window.rqReplay=function(){if(DUO.on&&RQ)delete DU().ses['r:'+RQ.id];return _rp.apply(this,arguments)}}
{const _tp=window.tlReplay;if(_tp)window.tlReplay=function(){if(DUO.on&&TM)delete DU().ses['t:'+TM.id];return _tp.apply(this,arguments)}}

/* atividade atual: caso comum, caso rápido ou linha do tempo */
function duoAct(){if(!DUO.on||!duoCfg())return null;
if(window.RQ&&RQ.v==='main')return{k:'r',id:RQ.id,key:'r:'+RQ.id};
if(window.TM&&TM.v==='main')return{k:'t',id:TM.id,key:'t:'+TM.id};
if(!window.RQ&&!window.TM&&C&&!MENU)return{k:'c',id:C.id,key:(DUO.net&&window.COOP?'n'+COOP.cod+'~':'')+'c:'+C.id};return null}
const duoSes=a=>{const d=DU(),z=d.ses[a.key]=d.ses[a.key]||{t:0,n:0,pass:0,c:[{},{}],last:null,sb:0};if(z.r===undefined){z.r=Math.random()<.5?0:1;z.t=z.r}if(DUO.net&&window.COOP&&COOP.on){z.r=COOP.r;z.t=COOP.me}return z};
/* papéis: 0 e 1; z.r = jogador que tem o papel 0; z.t = quem está com o celular */
const DUOR={c:[{n:'Campo',d:'Conversa com os suspeitos, atende ligações e visita os locais, e coleta as provas.',h:'Não vê Perícia, Quadro nem Caderno.',a:['Conversas','Chamadas','Locais']},{n:'Perícia',d:'Manda as provas para o Dr. José e conversa com ele na Perícia, liga as peças no Quadro e anota no Caderno.',h:'Não vê Conversas, Chamadas nem Locais.',a:['Perícia (com o Dr. José)','Quadro','Caderno']}],
r:[{n:'Interrogatório',d:'Conversa com os suspeitos e ouve os depoimentos.',h:'Não vê as provas.',a:['Suspeitos','Conversas']},{n:'Perícia',d:'Examina as provas e os laudos.',h:'Não vê as conversas.',a:['Provas']}],
t:[{n:'Leitura',d:'Abre e lê as fontes das pistas. Lê em voz alta para a dupla.',h:'Não mexe na ordem dos fatos.',a:['Abrir as fontes das pistas','Minhas pistas','Marcar o depoimento que não bate']},{n:'Montagem',d:'Coloca os fatos em ordem e confere a linha do tempo.',h:'Não abre as fontes das pistas.',a:['Mover os fatos','Pedir dica','Conferir a ordem']}]};
const DUOSH={c:'Prisão (acusação), Briefing, Dicas e Ajustes',r:'Acusar',t:'Ver os títulos e horários dos fatos'};
window.duoLabOk=()=>{const a=duoAct();return a&&a.k==='c'?duoHolderRole(a,duoSes(a))===1:true};
const duoRoles=a=>DUOR[a.k];
const duoHolderRole=(a,z)=>z.t===z.r?0:1;
const duoWho=(z,r)=>r===0?z.r:1-z.r;
const DUOAPP=[['interrogate','calls','locations'],['lab','mindmap','caderno']];
const DUORQ=[['su','cv'],['pr']];
const duoGate=(a,k)=>{const L=a.k==='c'?DUOAPP:DUORQ;for(let i=0;i<2;i++)if(L[i].includes(k))return i;return -1};
function duoCnt(a,z){
if(a.k==='c'){const lc=DUO.lc[a.key];if(lc===undefined)DUO.lc[a.key]=S.loc;else if(lc!==S.loc){DUO.lc[a.key]=S.loc;z.vv=(z.vv||0)+1}return{q:S.asked.length,e:S.inv.length,a:S.an.length,v:z.vv||0}}
if(a.k==='r')return{q:RQ.asked.length,e:RQ.inv.length};
const sg=TM.order.join();if(DUO.sg[a.key]===undefined)DUO.sg[a.key]=sg;else if(DUO.sg[a.key]!==sg){DUO.sg[a.key]=sg;z.mm=(z.mm||0)+1}return{e:(TM.read||[]).length,m:z.mm||0}}
function duoFree(a){if(a.k==='c')return ptmFree()&&!window.MX.pp&&!window.MX.rx&&!window.MX.pop&&!window.MXQ&&!S.typing;
if(a.k==='r')return !(RQ.pop||RQ.rx||RQ.cho||RQ.how||RQ.pv||RQ.fin);
return !(TM.how||TM.rc||TM.sv!=null||TM.dr||TM.fin)}
const duoDone=a=>a.k==='c'?!!S.won:a.k==='r'?!!(RQ.fin&&RQ.fin.ok):!!(TLM().done[a.id]&&TM.fin);
const DUOLBL={q:['interrogatório','interrogatórios'],e:['prova','provas'],a:['análise','análises'],v:['local visitado','locais visitados'],m:['ajuste na ordem','ajustes na ordem']};
const DUOLBLT={e:['pista lida','pistas lidas']};
const duoTxt=(a,c)=>{const L=a.k==='t'?Object.assign({},DUOLBL,DUOLBLT):DUOLBL,r=[];Object.keys(L).forEach(k=>{if(c[k])r.push(c[k]+' '+L[k][c[k]===1?0:1])});return r.join(' · ')||'ainda sem descobertas'};
const duoTot=c=>Object.keys(c).reduce((s,k)=>s+(c[k]||0),0);

function duoTick(){const a=duoAct();let hud=document.getElementById('duohud');
if(!a){duoOv(null);duoLabUi(0,null,0,1);if(hud)hud.remove();DUO.shown={};DUO.t0={};DUO.sb=0;DUO.role=0;DUO.swap=null;return}
const d=DU(),z=duoSes(a),cur=duoCnt(a,z);
if(!z.last){z.last=cur}
else{let ch=0;Object.keys(cur).forEach(k=>{const dl=(cur[k]||0)-(z.last[k]||0);if(dl>0){z.c[z.t][k]=(z.c[z.t][k]||0)+dl;ch=1}z.last[k]=cur[k]});if(ch)msave()}
const rl=duoHolderRole(a,z);
/* cada um só fica nas telas do seu papel */
if(a.k==='c'&&!DUO.conf&&!DUO.swap){const g=duoGate(a,S.tab);if(g>=0&&g!==rl){S.tab='phone';CHO=0;QTO=0;try{LBO=0}catch(e){}render();return}}
if(a.k==='r'&&!DUO.swap){const g=duoGate(a,RQ.tab);if(g>=0&&g!==rl){RQ.tab=rl?'pr':'su';RQ.pv=null;RQ.su=null;render();return}}
let ov=null;
if(DUO.conf)ov='conf';else if(!DUO.shown[a.key])ov='sort';else if(DUO.swap)ov='swap';else if(DUO.role)ov='role';else if(DUO.sb)ov='sb';
duoOv(ov,a,z);duoLabUi(0,a,duoHolderRole(a,z),!!ov);
if(!ov&&!(a.k==='c'&&(CUT||V))){const p=duoPl(z.t),fin=duoDone(a),h=fin?`<b>🏆 Ver placar da dupla</b>`:`<span class=dh-d style="background:${p.c}"></span><b>${esc(p.n)}</b><small>${DUOR[a.k][rl].n}</small>${DUO.net?`<span class=dh-p style="background:${COOP.conn[1-COOP.me]?'#5fbf7a':'#777'}"></span>${COOP.un?`<em class=dh-u>${COOP.un}</em>`:''}`:''}`;
if(!hud){hud=document.createElement('button');hud.id='duohud';hud.onclick=()=>{const a2=duoAct();if(a2&&duoDone(a2))DUO.sb=1;else DUO.role=1;duoTick()};document.body.appendChild(hud)}
if(hud.dataset.h!==h){hud.dataset.h=h;hud.innerHTML=h}}else if(hud)hud.remove()}

/* tela cheia: passagem do celular, placar, confirmação */
function duoOv(kind,a,z){let e=document.getElementById('duoov');const sig=kind&&kind+'|'+(z?z.t+'|'+z.r+'|'+z.go:'')+'|'+(DUO.conf?DUO.conf.st+DUO.conf.txt:'')+'|'+DUO.sb+'|'+DUO.role+'|'+(window.COOP?COOP.r:'');
if(!kind){if(e)e.remove();return}
if(e&&e.dataset.s===sig)return;
if(!e){e=document.createElement('div');e.id='duoov';document.body.appendChild(e)}
e.dataset.s=sig;const nxt=1-z.t;let h='';
const badge=(p,s)=>`<span class=dbd style="background:${p.c};width:${s||64}px;height:${s||64}px;font-size:${(s||64)*.45}px">${esc((p.n||'?').trim().charAt(0).toUpperCase())}</span>`;
const A0=duoPl(0),role=r=>DUOR[a.k][r];
if(kind==='sort'&&DUO.net){const rl=duoHolderRole(a,z),R=role(rl),me=duoPl(z.t);h=`<div class=dcard>${badge(me)}<small>${esc(me.n.toUpperCase())} · SEU PAPEL NESTE CASO</small><h2>${R.n}</h2><p style="margin-bottom:10px">${R.d}</p><div class=dpr style="display:block"><b>Você acessa</b><span>${R.a.join(' · ')}</span></div><div class=dpr style="display:block"><b>${esc(duoPl(1-z.t).n)} acessa (${role(1-rl).n})</b><span>${role(1-rl).a.join(' · ')}</span></div><p style="margin-top:10px">Cada um vê só a sua parte. Usem o 💬 para trocar informações.</p><button class=dbtn onclick="DUO.shown[duoAct().key]=1;duoTick()">Entendi · Começar</button></div>`}
else if(kind==='sort'){const hp=duoPl(z.t),again=!!z.go;
h=`<div class=dcard><small>PAPÉIS ${again?'DESTE CASO':'SORTEADOS PARA ESTE CASO'}</small>${[0,1].map(r=>{const w=duoWho(z,r),pp=duoPl(w);return `<div class=dpr>${badge(pp,40)}<div><b>${esc(pp.n)} · ${role(r).n}</b><span>${role(r).d}</span><span>Acessa: ${role(r).a.join(', ')}</span></div></div>`}).join('')}<button class=dbtn onclick="duoRoll('keep')">${again?'Manter os papéis · Continuar':esc(hp.n)+' começa · Continuar'}</button><button class="dbtn gh" onclick="duoRoll('new')">Sortear de novo</button><button class="dbtn gh" onclick="duoRoll('swap')">Trocar os papéis entre vocês</button></div>`}
else if(kind==='role'){const rl=duoHolderRole(a,z),me=duoPl(z.t),R=role(rl),O=role(1-rl);
h=`<div class=dcard>${badge(me)}<small>${esc(me.n.toUpperCase())} · SEU PAPEL</small><h2>${R.n}</h2><p style="margin-bottom:10px">${R.d}</p><div class=dpr style="display:block"><b>Você acessa</b><span>${R.a.join(' · ')}</span></div><div class=dpr style="display:block"><b>Só ${esc(duoPl(1-z.t).n)} acessa (${O.n})</b><span>${O.a.join(' · ')}</span></div><div class=dpr style="display:block"><b>Telas dos dois</b><span>${DUOSH[a.k]}</span></div>${DUO.net?`<button class=dbtn onclick="coopChat()">💬 Conversar com ${esc(duoPl(1-z.t).n)}</button>`:`<button class=dbtn onclick="duoNow()">Passar o celular para ${esc(duoPl(1-z.t).n)}</button>`}<button class="dbtn gh" onclick="DUO.sb=1;DUO.role=0;duoTick()">Ver placar</button><button class="dbtn gh" onclick="DUO.role=0;duoTick()">Fechar</button></div>`}
else if(kind==='swap'){const w=duoWho(z,DUO.swap.r),pp=duoPl(w);
h=`<div class=dcard>${badge(pp)}<small>ESSA ÁREA É DE ${role(DUO.swap.r).n.toUpperCase()}</small><h2>Passe o celular para ${esc(pp.n)}</h2><p>${esc(pp.n)} está na ${role(DUO.swap.r).n}: ${role(DUO.swap.r).d.toLowerCase()} A tela fica escondida até ${esc(pp.n)} tocar.</p><button class=dbtn onclick="duoGo('swap')">Sou ${esc(pp.n)} · Continuar</button><button class="dbtn gh" onclick="DUO.swap=null;duoTick()">Voltar</button></div>`}
else if(kind==='sb'){const ca=z.c[0],cb=z.c[1],ta=duoTot(ca),tb=duoTot(cb),pa=duoPl(0),pb=duoPl(1),fin=duoDone(a);
const row=(p,c,t)=>`<div class=dpr>${badge(p,40)}<div><b>${esc(p.n)}</b><span>${duoTxt(a,c)}</span></div><em>${t}</em></div>`;
const lead=ta===tb?'Vocês contribuíram igualmente.':(ta>tb?pa:pb).n+' trouxe mais descobertas.';
h=`<div class=dcard><small>${fin?'CASO ENCERRADO · ':''}PLACAR DA DUPLA</small><h2>${fin?'Bom trabalho, dupla!':'Contribuições até agora'}</h2>${row(pa,ca,ta)}${row(pb,cb,tb)}<p>${lead}</p>${fin||DUO.net?'':`<button class=dbtn onclick="duoNow()">Passar o celular para ${esc(duoPl(1-z.t).n)}</button>`}<button class="dbtn gh" onclick="DUO.sb=0;duoTick()">Fechar</button></div>`}
else if(kind==='conf'&&DUO.conf.net){const c=DUO.conf,o=duoPl(1-z.t);h=c.st==='w'?`<div class=dcard><small>ACUSAÇÃO EM CONJUNTO</small><h2>${esc(c.txt)}</h2><p>Aguardando ${esc(o.n)} concordar…</p><button class="dbtn gh" onclick="coopAnswer(0)">Cancelar</button></div>`:`<div class=dcard>${badge(o)}<small>${esc(o.n.toUpperCase())} QUER ACUSAR</small><h2>${esc(c.txt)}</h2><p>Em dupla, a acusação só sai se os dois concordarem. Você concorda?</p><button class=dbtn onclick="coopAnswer(1)">Concordo, acusar</button><button class="dbtn gh" onclick="coopAnswer(0)">Ainda não</button></div>`}
else if(kind==='conf'){const c=DUO.conf,p=duoPl(c.who),q=duoPl(1-c.who);
if(c.st===0)h=`<div class=dcard>${badge(q)}<small>PASSE O CELULAR PARA</small><h2>${esc(q.n)}</h2><p>${esc(p.n)} quer fazer uma acusação e precisa da sua opinião. Em dupla, a acusação só sai se os dois concordarem.</p><button class=dbtn onclick="duoConf(1)">Sou ${esc(q.n)} · Ver a acusação</button><button class="dbtn gh" onclick="duoConf(9)">Cancelar</button></div>`;
else h=`<div class=dcard>${badge(p)}<small>ACUSAÇÃO PROPOSTA POR ${esc(p.n.toUpperCase())}</small><h2>${esc(c.txt)}</h2><p>${esc(q.n)}, você concorda com essa acusação?</p><button class=dbtn onclick="duoConf(2)">Concordo, acusar</button><button class="dbtn gh" onclick="duoConf(9)">Ainda não</button></div>`}
e.innerHTML=h}
function duoFlip(a,z,to){z.t=to;
if(a.k==='c'){S.tab='phone';CHO=0;QTO=0;try{LBO=0}catch(e){}try{INS=null}catch(e){}}
else if(a.k==='r'){RQ.pv=null;RQ.su=null;RQ.tab=duoHolderRole(a,z)?'pr':'su'}
else{TM.sv=null;TM.pl=0}msave()}
window.duoGo=k=>{const a=duoAct();if(!a)return;const z=duoSes(a);DUO.shown[a.key]=1;
if(k==='swap'&&DUO.swap){const sw=DUO.swap;DUO.swap=null;duoFlip(a,z,duoWho(z,sw.r));if(sw.k!=null&&a.k==='c')try{openApp(sw.k)}catch(e){}else if(sw.k!=null&&a.k==='r')try{rqTab(sw.k)}catch(e){}render()}
else if(k==='sort'&&!z.go){z.go=1;duoFlip(a,z,z.r)}
try{AU.fx&&AU.fx('tick')}catch(e){}duoTick()};
/* troca de visão pedida pelo jogador */
window.duoRoll=k=>{const a=duoAct();if(!a)return;const z=duoSes(a);if(k==='new')z.r=Math.random()<.5?0:1;else if(k==='swap')z.r=1-z.r;if(k!=='keep'){z.go=1;duoFlip(a,z,z.r)}else z.go=1;DUO.shown[a.key]=1;try{AU.fx&&AU.fx('tick')}catch(e){}duoTick()};
window.duoRole=()=>{DUO.sb=0;DUO.role=1;duoTick()};
window.duoNow=()=>{const a=duoAct();if(!a)return;const z=duoSes(a);DUO.sb=0;DUO.role=0;DUO.swap={r:1-duoHolderRole(a,z),k:null};duoTick()};
function duoSwapReq(r,k){if(DUO.net){const a=duoAct(),z=duoSes(a);tst('Essa área é de '+duoPl(duoWho(z,r)).n+' ('+DUOR[a.k][r].n+'). Peça pelo 💬.');return}DUO.swap={r,k};duoTick()}
/* bloqueio por papel nas telas */
{{const _oa=openApp;openApp=function(k,ev){const a=duoAct();if(a&&a.k==='c'){const g=duoGate(a,k),z=duoSes(a);if(g>=0&&g!==duoHolderRole(a,z)){duoSwapReq(g,k);return}}return _oa.apply(this,arguments)}}
{const _rt=window.rqTab;window.rqTab=function(t){const a=duoAct();if(a&&a.k==='r'){const g=duoGate(a,t),z=duoSes(a);if(g>=0&&g!==duoHolderRole(a,z)){duoSwapReq(g,t);return}}return _rt.apply(this,arguments)}}
const tb=(n,role,allowNull)=>{const _f=window[n];if(!_f)return;window[n]=function(){const a=duoAct();if(a&&a.k==='t'){if(allowNull&&arguments[0]==null)return _f.apply(this,arguments);const z=duoSes(a);if(role!==duoHolderRole(a,z)){duoSwapReq(role,null);return}}return _f.apply(this,arguments)}};
tb('tlSrcOpen',0,1);tb('tlPl',0,0);tb('tlFlag',0,0);tb('tlMove',1,0);tb('tlDown',1,0);tb('tlCheck',1,0);tb('tlHint',1,0)}

/* acusação em conjunto */
function duoAsk(txt,go){if(DUO.net&&window.coopAcc)return coopAcc(txt,go);DUO.conf={who:0,st:0,txt,go};const a=duoAct();DUO.conf.who=a?duoSes(a).t:0;duoTick()}
window.duoConf=k=>{const c=DUO.conf;if(!c)return;if(k===1){c.st=1}else if(k===9){DUO.conf=null}else if(k===2){const go=c.go;DUO.conf=null;DUO.ok=1;duoTick();go()}duoTick()};
{const _ac=accuse;accuse=function(){if(!DUO.on||DUO.ok||!C){DUO.ok=0;return _ac.apply(this,arguments)}
const two=!!C.two,xq=C.xq||[],A=S.accs||[];if(!S.wp||!S.mo||(two?A.length!==2:!S.acc)||(C.vic&&!S.vic)||xq.some(q=>!S['x_'+q[0]]))return _ac.apply(this,arguments);
const all=C.SUALL||SU,nm=id=>{const x=all.find(z=>z.id===id);return x?x.n||x.nome||id:id};
duoAsk('Acusar '+(two?A.map(nm).join(' e '):nm(S.acc)),()=>accuse())}}
{const _ra=window.rqAcc;if(_ra)window.rqAcc=function(){if(!DUO.on||DUO.ok||!window.RQ||!RQ.acc){DUO.ok=0;return _ra.apply(this,arguments)}
const c=rqC(RQ.id);duoAsk('Acusar '+rqSu(c,RQ.acc).nome,()=>window.rqAcc())}}

/* seletor Sozinho / Em dupla (início e Arquivo) */
function duoSel(){if(window.PLO||window.GAL)return '';const on=DUO.on&&duoCfg(),c=duoCfg();
return `<div class=dpsel><div class=dpseg><button class="${on?'':'on'}" onclick="duoPick(0)">Sozinho</button><button class="${on?'on':''}" onclick="duoPick(1)">Em dupla</button></div>${on?`<div class=dpinf><span><i style="background:${c.j[0].c}"></i>${esc(c.j[0].n)}</span><span><i style="background:${c.j[1].c}"></i>${esc(c.j[1].n)}</span><small>Papéis sorteados a cada caso</small><button onclick="duoEdit()">Mudar</button></div>`:''}</div>`}
window.duoPanel=()=>(MENU||!C)&&!window.RQ&&!window.TM?`<div class=pan><h3>👥 Modo de jogo</h3>${duoSel()}</div>`:'';
window.duoPick=k=>{if(!k){duoOff();render();return}duoStartRev()};
function duoMod(){let e=document.getElementById('duomod');if(e)e.remove();if(!DUO.mode&&!DUO.setup)return;e=document.createElement('div');e.id='duomod';e.className='duo-m';
if(DUO.setup){const s=DUO.setup;e.innerHTML=`<div class=dcard style="text-align:left"><small>JOGAR EM DUPLA · UM CELULAR</small><h2 style="margin-bottom:10px">Quem vai jogar?</h2><p class=dsm style="margin-top:0">Cada um tem uma função diferente no caso. O progresso em dupla fica separado do seu jogo solo.</p>${[0,1].map(i=>`<label class=dlb>Jogador ${i+1}<input id=dn${i} maxlength=14 value="${esc(s.j[i].n)}" oninput="DUO.setup.j[${i}].n=this.value"></label><div class=dcol>${DUOCOL.map(c=>`<button class="${s.j[i].c===c?'on':''}" style="background:${c}" onclick="DUO.setup.j[${i}].c='${c}';duoMod()"></button>`).join('')}</div>`).join('')}<p class=dsm>A cada caso, o jogo sorteia o papel de cada um. Cada papel vê só uma parte do caso, e o celular passa quando alguém precisa da área do outro.</p><button class=dbtn onclick="duoSave()">Começar a jogar em dupla</button><button class="dbtn gh" onclick="DUO.setup=null;duoMod()">Cancelar</button></div>`}
else{e.remove();return}
document.body.appendChild(e)}
window.duoStartRev=()=>{DUO.mode=0;const c=duoCfg();if(c){duoOn();duoMod();render();return}duoEdit()};
window.duoEdit=()=>{const c=duoCfg();DUO.mode=0;DUO.setup=c?JSON.parse(JSON.stringify(c)):{j:[{n:(META.pl&&META.pl.n)||'Jogador 1',c:DUOCOL[0]},{n:'Jogador 2',c:DUOCOL[1]}],ev:3};duoMod()};
window.duoSave=()=>{const s=DUO.setup;if(!s)return;s.j.forEach((p,i)=>{p.n=(p.n||'').trim()||'Jogador '+(i+1)});if(s.j[0].n.toLowerCase()===s.j[1].n.toLowerCase())s.j[1].n+=' 2';DU().cfg={j:s.j,ev:s.ev};DUO.setup=null;duoOn();msave();duoMod();render()};

/* Dr. José em dupla: sem chat; o laudo aparece num cartão (modal) para quem está na Perícia */
const duoLabPend=()=>(S.lq||[]).find(q=>q.k==='d'&&!q.sn);
function duoLabMsg(q){const id=q.id,nm=lbNm(id),h=CL[id].h;return{id,nm,h,intro:pk(LBI,id,1).replace('%',nm),body:h?pk(LBH,id):pk(LBM[lbCat(id)],id),laudo:h?'':RES[id],muda:h?'':lbMuda(id)}}
window.duoLbClose=id=>{const q=(S.lq||[]).find(x=>x.k==='d'&&x.id===id);if(q){q.sn=1;save()}DUO.lbx=0;duoLabUi(1);render()};
window.duoLbRM=id=>{const q=(S.lq||[]).find(x=>x.k==='d'&&x.id===id);if(q){q.sn=1;save()}DUO.lbx=0;RM=id;duoLabUi(1);render()};
function duoLabUi(force,a,rl,busy){let m=document.getElementById('dlbm'),b=document.getElementById('dlbb');
const off=()=>{if(m)m.remove();if(b)b.remove()};
if(!DUO.on||!C||MENU||window.RQ||window.TM||CUT||V||RM||window.MG||busy||DUO.sbBusy){off();return}
a=a||duoAct();if(!a||a.k!=='c'){off();return}const z=duoSes(a);rl=duoHolderRole(a,z);if(rl!==1){off();return}
const q=duoLabPend();let sig,html;
if(b)b.remove();{if(!q){if(m)m.remove();return}const x=duoLabMsg(q);sig='m|'+q.id;
html=`<div class=dlbc>${jav(64)}<small>DR. JOSÉ MENEZES · LAUDO PRONTO</small><h3>${esc(x.nm)}</h3><p>${x.intro}</p><p>${x.body}</p>${x.laudo?`<div class=dlbx><b>📄 Laudo</b><span>${x.laudo}</span></div><div class=dlbx><b>O que muda</b><span>${x.muda}</span></div>`:''}<button class=dbtn onclick="duoLbRM('${x.id}')">Rever laudo ilustrado</button><button class="dbtn gh" onclick="duoLbClose('${x.id}')">Entendi</button></div>`;
if(!m||m.dataset.s!==sig||force){if(!m){m=document.createElement('div');m.id='dlbm';document.body.appendChild(m)}m.dataset.s=sig;m.innerHTML=html}return}
}

/* ligação com a tela */
{const _r=render;render=function(){_r.apply(this,arguments);try{
duoTick()}catch(e){}}}
setInterval(()=>{try{duoTick()}catch(e){}},600);
try{if(localStorage.getItem('sisp-modo')==='dupla'&&duoCfg()){duoOn();render()}}catch(e){}
