/* ===== Dupla Online: casos próprios para dois celulares =====
   Motor: sala (Firebase via NET), registro de eventos e regras do jogo.
   Todo o jogo é um registro de eventos (ev) gravado na sala. Cada celular repete o registro e chega ao mesmo estado,
   então os dois veem as mesmas coisas sem precisar de um servidor de regras. */
window.DCC=window.DCC||[];window.DCI=window.DCI||{};
const dcFirst=n=>{const w=String(n).split(' ');return /^(Dona|Seu|Dr\.?|Dra\.?|Sr\.?|Sra\.?)$/i.test(w[0])&&w[1]?w[1]:w[0]};
const dcCase=id=>DCC.find(c=>c.id===id);
window.DC={on:0,cod:null,uid:null,me:0,host:0,names:['',''],p1u:null,p2u:null,r:0,k:null,g:'g1',conn:[0,0],evs:{},ver:0,offs:[],cs:null,v:'intro',tab:'su',su:null,pv:null,sel:{},msg:'',err:'',busy:0,open:0,st:'home',myName:'',joinK:null,feed:[],un:0,lobby:0,chat:0,hint:0,wiz:null,rsp:null,stc:null,stv:-1,t0:0,seenNote:{}};
const DCK='sisp-dc',COD='ABCDEFGHJKLMNPQRSTUVWXYZ23456789';
const dcCode=()=>Array.from({length:5},()=>COD[Math.floor(Math.random()*COD.length)]).join('');
const dcRole=()=>DC.me===DC.r?'A':'B';
const dcOth=()=>dcRole()==='A'?'B':'A';
const dcNameOf=w=>DC.names[(w==='A')===(DC.r===0)?0:1]||('Jogador '+w);
const dcMy=()=>DC.names[DC.me]||DC.myName||'Você';
const dcPartner=()=>DC.names[1-DC.me]||'Parceiro(a)';
const dcNorm=s=>String(s==null?'':s).toLowerCase().normalize('NFD').replace(/[̀-ͯ]/g,'').replace(/[^a-z0-9]/g,'');
const dcWho=e=>{const i=e.u===DC.p1u?0:1;return i===DC.r?'A':'B'};
const dcOwns=(o,w)=>o==='ambos'||o===w;
const dcSave=()=>{try{localStorage.setItem(DCK,JSON.stringify({cod:DC.cod,me:DC.me,host:DC.host,n:DC.myName}))}catch(e){}};

/* ---------- regras: estado a partir dos eventos ---------- */
function dcState(){const c=DC.cs;if(!c)return null;if(DC.stc&&DC.stv===DC.ver&&DC.stc.g===DC.g)return DC.stc;
const st={g:DC.g,asked:{},sent:{},facts:{},codes:{},open:{},props:[],cts:{},votes:{},rod:0,strikes:0,fim:null,errs:0,hints:{A:0,B:0},feed:[],div:null,wrong:0,cnt:{A:{ask:0,send:0,open:0,ct:0},B:{ask:0,send:0,open:0,ct:0}}};
Object.keys(DC.evs).sort().forEach(id=>{const e=DC.evs[id];if(e.x!==DC.g)return;const w=dcWho(e);let d={};try{d=JSON.parse(e.d||'{}')}catch(x){}
switch(e.k){
case 'ask':if(!st.asked[d.q]){st.asked[d.q]=w;st.cnt[w].ask++}break;
case 'send':if(!st.sent[d.k+':'+d.id]){st.sent[d.k+':'+d.id]=w;st.cnt[w].send++}break;
case 'fato':if(!st.facts[d.id]){st.facts[d.id]=w;st.cnt[w].open++}break;
case 'code':{const o=st.codes[d.p]=st.codes[d.p]||{A:0,B:0,err:0};if(d.ok){if(d.w)o[d.w]=1;if(d.pw||(o.A&&o.B)){if(!st.open[d.p]){st.open[d.p]=1;st.cnt[w].open++}}}else{o.err++;st.errs++}break}
case 'prop':st.props.push({id:d.id,s:d.s,a:d.a,p:d.p,s2:d.s2,a2:d.a2,by:w,st:'pend'});break;
case 'resp':{const pr=st.props.find(x=>x.id===d.id);if(!pr||pr.st!=='pend')break;if(d.ok){const ct=(c.contradicoes||[]).find(k=>k.tipo==='fala_dupla'?(pr.s2&&((k.suspeito===pr.s&&k.afirmacao===pr.a&&k.suspeito_b===pr.s2&&k.afirmacao_b===pr.a2)||(k.suspeito===pr.s2&&k.afirmacao===pr.a2&&k.suspeito_b===pr.s&&k.afirmacao_b===pr.a))):(!pr.s2&&k.suspeito===pr.s&&k.afirmacao===pr.a&&k.prova===pr.p));if(ct){pr.st='ok';st.cts[ct.id]=1;st.cnt[pr.by].ct++}else{pr.st='wrong';st.errs++}}else{pr.st='no';pr.m=d.m}break}
case 'vote':{if(d.rod!==st.rod||st.fim)break;st.votes[w]={cul:d.cul,fin:d.fin||[]};if(st.votes.A&&st.votes.B){const a=st.votes.A,b=st.votes.B,ac=c.acusacao||{};
if(a.cul!==b.cul||JSON.stringify(a.fin)!==JSON.stringify(b.fin)){st.div={A:a,B:b,rod:st.rod};st.rod++;st.votes={}}
else{const ok=a.cul===ac.culpado&&(ac.perguntas_finais||[]).every((q,i)=>a.fin[i]===q.correta);if(ok)st.fim={ok:1};else{st.strikes++;st.wrong=st.rod;st.div=null;if(st.strikes>=3)st.fim={ok:0};st.rod++;st.votes={}}}}break}
case 'chat':st.feed.push({w,x:d.x,t:e.t});break;
case 'hint':st.hints[w]++;break}});
DC.stc=st;DC.stv=DC.ver;return st}
const dcPen=st=>st.errs+st.hints.A+st.hints.B+st.strikes*2;
const dcStars=st=>{const p=dcPen(st);return p<=2?3:p<=6?2:1};
function dcPs(c){if(c._ps)return c._ps;const L=[];c.provas.forEach(p=>{L.push(p);const t=p.trava;if(t&&t.tipo==='parcial')['A','B'].forEach(h=>{const x=t['parte_'+h];if(x)L.push({id:p.id+':'+h,nome:p.nome+' (metade '+h+')',descricao:'Metade do bilhete: '+(x.valor_visivel||'').replace(/ \/ /g,' … '),imagem:x.imagem,dono:x.dono,disponivel:x.disponivel||'inicio',half:p.id,lado:h})})});c._ps=L;return L}
const dcP=(c,id)=>dcPs(c).find(x=>x.id===id);
const dcAllQ=c=>c.suspeitos.flatMap(s=>(c.interrogatorio[s.id]||[]).map(q=>({s,q,k:s.id+'|'+q.id})));
const dcQAsked=(c,st,rem)=>dcAllQ(c).some(o=>(rem===o.q.id||rem===o.s.id+'_'+o.q.id)&&st.asked[o.k]);
const dcJoined=(st,pid)=>!!(st.sent['p:'+pid+':A']&&st.sent['p:'+pid+':B']);
function dcProofOpen(c,st,p){const d=p.disponivel||'inicio';
if(p.liberada_quando&&p.liberada_quando.enviadas)return p.liberada_quando.enviadas.every(i=>st.sent['p:'+i]);
if(d==='inicio')return true;
let m=/^apos_trava_(.+)$/.exec(d);if(m&&st.open[m[1]])return true;
m=/^apos_juntar_(.+)$/.exec(d);if(m){const par=c.provas.find(x=>x.trava&&x.trava.tipo==='parcial'&&(x.id===m[1]||x.id==='p_'+m[1]));if(par&&dcJoined(st,par.id))return true}
m=/^apos_(.+)$/.exec(d);if(m&&!/^apos_(trava|juntar)_/.test(d)&&dcQAsked(c,st,m[1]))return true;
if(dcAllQ(c).some(o=>o.q.libera_prova===p.id&&st.asked[o.k]))return true;
if(c.provas.some(q=>q.trava&&q.trava.ao_abrir&&q.trava.ao_abrir.libera_prova===p.id&&st.open[q.id]))return true;
if(c.provas.some(q=>q.trava&&q.trava.ao_juntar&&q.trava.ao_juntar.libera_prova===p.id&&dcJoined(st,q.id)))return true;
return false}
const dcLocked=(c,st,p)=>!!p.trava&&p.trava.tipo!=='parcial'&&!st.open[p.id];
function dcVisible(c,st,w){return dcPs(c).filter(p=>(dcOwns(p.dono,w)&&dcProofOpen(c,st,p))||st.sent['p:'+p.id])}
function dcFalas(c,st,w){return dcAllQ(c).filter(o=>o.q.registra_afirmacao&&st.asked[o.k]&&(st.asked[o.k]===w||st.sent['f:'+o.k])).map(o=>({s:o.s,q:o.q,k:o.k,a:o.q.registra_afirmacao,by:st.asked[o.k]}))}
const dcSuspOk=(c,st,s)=>{const m=/^apos_(.+)$/.exec(s.disponivel||'');return !m||dcQAsked(c,st,m[1])};
const dcMine=(c,st,w)=>c.suspeitos.filter(s=>dcOwns(s.dono,w)&&dcSuspOk(c,st,s));

/* ---------- ações ---------- */
function dcEmit(k,d){if(!DC.on||!DC.cs)return;const id=Date.now().toString(36)+Math.random().toString(36).slice(2,6),e={u:DC.uid,t:Date.now(),k,x:DC.g,d:JSON.stringify(d||{})};DC.evs[id]=e;DC.ver++;
NET.set(DC.cod,'ev/'+id,e).catch(()=>{DC.err='Sem conexão com o servidor.'});render()}
const dcNote=t=>{try{tst(t)}catch(e){}};
window.dcAsk=(sid,qid)=>{const c=DC.cs,st=dcState(),w=dcRole(),s=c.suspeitos.find(x=>x.id===sid),q=(c.interrogatorio[sid]||[]).find(x=>x.id===qid);if(!s||!q||!dcOwns(s.dono,w)||!dcSuspOk(c,st,s))return;const k=sid+'|'+qid;if(st.asked[k])return;
if(q.requer_fato&&!st.facts[q.requer_fato.id])return;
dcEmit('ask',{q:k});const n=dcAllQ(c).filter(o=>o.k===k&&o.q.libera_prova)[0];if(n){const p=dcP(c,n.q.libera_prova);if(p)dcNote('🔎 Nova prova: '+p.nome)}};
window.dcFato=(sid,qid,txt)=>{const c=DC.cs,q=(c.interrogatorio[sid]||[]).find(x=>x.id===qid);if(!q||!q.requer_fato)return false;const rf=q.requer_fato,ok=(rf.aceita||[]).some(a=>dcNorm(a)===dcNorm(txt))&&dcNorm(txt)!=='';
if(ok){dcEmit('fato',{id:rf.id});return true}dcEmit('code',{p:'f:'+rf.id,ok:0});return false};
window.dcSenha=(pid,txt)=>{const c=DC.cs,p=dcP(c,pid);if(!p||!p.trava||p.trava.tipo!=='senha')return false;const t=p.trava,ok=[t.resposta].concat(t.aceita||[]).some(a=>dcNorm(a)===dcNorm(txt))&&dcNorm(txt)!=='';dcEmit('code',{p:pid,ok:ok?1:0,pw:1});return ok};
window.dcCod=(pid,txt)=>{const c=DC.cs,p=dcP(c,pid),w=dcRole();if(!p||!p.trava||p.trava.tipo!=='codigo_dividido')return false;const par=p.trava['parte_'+w];if(!par)return false;const ok=dcNorm(par.valor)===dcNorm(txt)&&dcNorm(txt)!=='';dcEmit('code',{p:pid,w,ok:ok?1:0});return ok};
window.dcSend=(k,id)=>{const st=dcState();if(st.sent[k+':'+id])return;dcEmit('send',{k,id});dcNote('📤 Enviado para '+dcPartner())};
window.dcPropose=(s,a,p,s2,a2)=>{const c=DC.cs,st=dcState(),w=dcRole(),fs=dcFalas(c,st,w);const f=fs.find(x=>x.s.id===s&&x.a===a);if(f&&!st.sent['f:'+f.k])dcEmit('send',{k:'f',id:f.k});if(s2){const f2=fs.find(x=>x.s.id===s2&&x.a===a2);if(f2&&!st.sent['f:'+f2.k])dcEmit('send',{k:'f',id:f2.k})}else if(p&&!st.sent['p:'+p])dcEmit('send',{k:'p',id:p});
dcEmit('prop',{id:'pr'+Date.now().toString(36),s,a,p:p||'',s2:s2||'',a2:a2||''});DC.wiz=null;DC.tab='ms';render()};
window.dcResp=(id,ok,m)=>{dcEmit('resp',{id,ok:ok?1:0,m:m||''});DC.rsp=null;render()};
window.dcVote=(cul,fin)=>{const st=dcState();dcEmit('vote',{rod:st.rod,cul,fin})};
window.dcHint=()=>{dcEmit('hint',{});};
window.dcChatSay=i=>{dcEmit('chat',{x:DCPHR[i]});};
const DCPHR=['Achei algo importante!','Pode me enviar uma prova?','Preciso de uma informação sua.','Enviei algo para você.','Vamos propor uma contradição?','Concordo.','Ainda não concordo.','Estou travado(a). Alguma ideia?','Calma, vamos juntar as peças.'];

/* 5 erros seguidos em senha, código ou resposta bloqueiam o teclado por 20 segundos */
function dcLockLeft(){let n=0,last=0;Object.keys(DC.evs).sort().forEach(id=>{const e=DC.evs[id];if(e.x!==DC.g||e.u!==DC.uid)return;if(e.k==='code'||e.k==='fato'){let d={};try{d=JSON.parse(e.d||'{}')}catch(x){}if(e.k==='code'&&!d.ok){n++;last=e.t}else n=0}});return n>0&&n%5===0?Math.max(0,Math.ceil((last+20000-Date.now())/1000)):0}

/* ---------- sala ---------- */
const dcErr=m=>{DC.err=m;DC.busy=0;if(window.dcMod)dcMod()};
const dcMsg=e=>{const m=String(e&&e.message||e),cod=String((e&&e.code)||m).replace(/^Firebase:\s*/,'').slice(0,60);if(/Sala n|Sem internet|Sem conex|Escreva|Não consegui/.test(m))return m;if(/admin-restricted|operation-not-allowed|ADMIN_ONLY/i.test(cod+m))return 'O login do servidor ainda não está liberado para o jogo em dupla (login anônimo desativado no Firebase). Código: '+cod;return 'Não foi possível falar com o servidor. Confira a internet e tente de novo. Código: '+cod};
const dcNm=()=>{const i=document.getElementById('dn');return((i&&i.value)||DC.myName||(META.pl&&META.pl.n)||'').trim().slice(0,14)};
window.dcCreate=async()=>{const n=dcNm();if(!n)return dcErr('Escreva o seu nome.');DC.myName=n;DC.err='';DC.busy=1;dcMod();
try{await NET.init();let ok=0;for(let i=0;i<6&&!ok;i++){const cod=dcCode();try{await NET.criar(cod,{c:Date.now(),m:'dupla',r:Math.random()<.5?0:1,p1:{u:NET.uid(),n}});DC.cod=cod;ok=1}catch(e){if(!/PERMISSION/i.test(String(e&&e.message)))throw e}}
if(!ok)throw new Error('Não consegui criar a sala. Tente de novo.');DC.me=0;DC.host=1;dcAttach()}catch(e){dcErr(dcMsg(e))}};
window.dcJoin=async()=>{const n=dcNm(),i=document.getElementById('dcc'),cod=((i&&i.value)||'').toUpperCase().replace(/[^A-Z0-9]/g,'');if(!n)return dcErr('Escreva o seu nome.');if(cod.length!==5)return dcErr('O código tem 5 letras ou números.');DC.myName=n;DC.err='';DC.busy=1;dcMod();
try{await NET.init();try{await NET.entrar(cod,{u:NET.uid(),n})}catch(e){if(/PERMISSION/i.test(String(e&&e.message)))throw new Error('Sala não encontrada, ou já tem duas pessoas.');throw e}DC.cod=cod;DC.me=1;DC.host=0;dcAttach()}catch(e){dcErr(dcMsg(e))}};
function dcAttach(){DC.on=1;DC.busy=0;DC.st='lobby';DC.err='';DC.uid=NET.uid();DC.evs={};DC.ver++;DC.cs=null;DC.open=0;DC.v='intro';DC.feed=[];DC.t0=Date.now()-2000;dcSave();
const c=DC.cod,o=DC.offs;o.forEach(f=>{try{f()}catch(e){}});o.length=0;
o.push(NET.on(c,'p1',v=>{DC.names[0]=v?v.n:'';DC.p1u=v&&v.u;dcRefresh()}));
o.push(NET.on(c,'p2',v=>{DC.names[1]=v?v.n:'';DC.p2u=v&&v.u;dcRefresh()}));
o.push(NET.on(c,'r',v=>{if(v!=null)DC.r=v;DC.ver++;dcRefresh()}));
o.push(NET.on(c,'k',v=>{DC.k=v;dcK()}));
o.push(NET.on(c,'on',v=>{v=v||{};DC.conn=[DC.p1u&&v[DC.p1u]?1:0,DC.p2u&&v[DC.p2u]?1:0];dcRefresh()}));
o.push(NET.onAdd(c,'ev',dcOnEv));
o.push(NET.presenca(c));
dcMod();render()}
function dcRefresh(){if(window.dcMod&&document.getElementById('dcm'))dcMod();if(DC.open)render()}
window.dcLeave=()=>{DC.offs.forEach(f=>{try{f()}catch(e){}});DC.offs.length=0;DC.on=0;DC.cod=null;DC.k=null;DC.cs=null;DC.open=0;DC.names=['',''];DC.conn=[0,0];DC.evs={};DC.feed=[];DC.st='home';DC.err='';try{localStorage.removeItem(DCK)}catch(e){}
['dcm','dcch'].forEach(i=>{const e=document.getElementById(i);if(e)e.remove()});render()};
async function dcResume(){let s;try{s=JSON.parse(localStorage.getItem(DCK))}catch(e){}if(!s||!s.cod)return;try{await NET.init();DC.cod=s.cod;DC.me=s.me;DC.host=s.host;DC.myName=s.n||'';dcAttach();DC.st='lobby';const m=document.getElementById('dcm');if(m)m.remove()}catch(e){setTimeout(dcResume,15000)}}
/* caso escolhido pela pessoa que criou a sala: k = 'd:<caso>:<partida>' */
function dcK(){if(!DC.on)return;const m=/^d:([^:]+):(g\d+)$/.exec(DC.k||'');if(!m){dcRefresh();return}const c=dcCase(m[1]);if(!c){dcRefresh();return}
if(DC.g!==m[2]||!DC.cs||DC.cs.id!==c.id){DC.g=m[2];DC.cs=c;DC.ver++;DC.v=Object.keys(DC.evs).some(i=>DC.evs[i].x===DC.g&&DC.evs[i].u===DC.uid)?'main':'intro';DC.tab='su';DC.su=null;DC.pv=null;DC.sel={};DC.stc=null;
if(DC.host){DC.open=1;const mm=document.getElementById('dcm');if(mm)mm.remove()}else{DC.joinK=c.id}}
dcRefresh()}
window.dcEnter=()=>{DC.joinK=null;DC.open=1;const m=document.getElementById('dcm');if(m)m.remove();render()};
window.dcStart=id=>{if(!DC.host||!dcCase(id))return;const n=1+Math.max(0,...Object.keys(DC.evs).map(i=>+(/g(\d+)/.exec(DC.evs[i].x)||[0,0])[1]),+(/g(\d+)/.exec(DC.g)||[0,0])[1]);
NET.set(DC.cod,'k','d:'+id+':g'+n).catch(()=>dcErr('Sem conexão.'));
DC.g='g'+n;DC.cs=dcCase(id);DC.ver++;DC.v='intro';DC.tab='su';DC.su=null;DC.pv=null;DC.sel={};DC.stc=null;DC.open=1;const m=document.getElementById('dcm');if(m)m.remove();render()};
window.dcRoll=()=>{if(DC.host)NET.set(DC.cod,'r',Math.random()<.5?0:1).catch(()=>{})};
window.dcBack=()=>{DC.open=0;DC.st='lobby';render();dcMod()};

/* eventos que chegam do outro celular */
function dcOnEv(id,e){if(!DC.on||!e||DC.evs[id])return;DC.evs[id]=e;DC.ver++;
if(e.x===DC.g&&e.u!==DC.uid&&(e.t||0)>DC.t0){let d={};try{d=JSON.parse(e.d||'{}')}catch(x){}const n=dcPartner();
if(e.k==='send'){const c=DC.cs;let nm='';if(c){if(d.k==='p'){const p=dcP(c,d.id);nm=p?p.nome:''}else{const o=dcAllQ(c).find(x=>x.k===d.id);nm=o?'fala de '+dcFirst(o.s.nome):''}}dcNote('📥 '+n+' enviou: '+nm);DC.un++}
else if(e.k==='prop'){dcNote('⚖️ '+n+' propôs uma contradição. Veja na Mesa.');DC.un++}
else if(e.k==='resp'){dcNote(d.ok?'⚖️ '+n+' respondeu à proposta.':'⚖️ '+n+' contestou a proposta.')}
else if(e.k==='chat'){dcNote('💬 '+n+': '+d.x);DC.un++}
else if(e.k==='vote'){dcNote('🗳️ '+n+' já votou na acusação.')}}
if(DC.open)render();else dcRefresh()}
setTimeout(()=>{try{if(localStorage.getItem(DCK)&&!window.COOP)dcResume()}catch(e){}},700);
