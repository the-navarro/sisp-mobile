/* Caso 03 (O Último Número): atmosfera de terror.
   Música sombria, vento e rangidos de fundo, e um sorteio de sustos variados (sons, vultos, olhos, apagão, rabiscos, espelho
   invertido, rosto de palhaço). A tensão cresce com o progresso da investigação, nenhum susto se repete em seguida e o
   intervalo é irregular, com alarmes falsos. Só roda dentro do caso 03. Respeita efeitos sonoros, vibração e "reduzir movimento". */
(function(){
const on=()=>typeof C!=='undefined'&&C&&C.id==='e3'&&typeof MENU!=='undefined'&&!MENU&&S&&S.seen>=4;
const calm=()=>on()&&!CUT&&!RM&&!INS&&!window.MG&&!document.querySelector('#ui .ov');
const calmGentle=()=>on()&&!CUT&&!RM&&!window.MG;
const reduce=()=>{try{return matchMedia('(prefers-reduced-motion: reduce)').matches}catch(e){return false}};
const rnd=(a,b)=>a+Math.random()*(b-a),pick=a=>a[Math.floor(Math.random()*a.length)];
TH.e3={dt:.7,mode:'pad',per:8,len:5,dark:1,w:'sine',CH:[[55,[220,261.6,329.6,466.2]],[51.9,[207.7,261.6,311.1,415.3]],[43.65,[174.6,207.7,261.6,349.2]],[49,[196,233.1,293.7,415.3]]]};
Object.assign(AMBM,{'e3:pista':'wind','e3:bilheteria':'hum','e3:som':'hum','e3:camarins':'wind','e3:carretas':'wind','e3:trailer':'hum'});
const X=()=>{if(!AU.f)return null;try{AU.init()}catch(e){}const x=AU.x;return x&&x.state==='running'?x:null};
const out=(x,pan)=>{if(!pan||!x.createStereoPanner)return AU.mg;const p=x.createStereoPanner();p.pan.value=pan;p.connect(AU.mg);return p};
const nz=(x,t,d,type,fr,q,v,pan)=>{const s=x.createBufferSource();s.buffer=AU.noise();const f=x.createBiquadFilter();f.type=type;f.frequency.value=fr;f.Q.value=q;const g=x.createGain();g.gain.setValueAtTime(.0001,t);g.gain.exponentialRampToValueAtTime(v,t+Math.min(.12,d/3));g.gain.exponentialRampToValueAtTime(.0001,t+d);s.connect(f);f.connect(g);g.connect(out(x,pan));s.start(t,Math.random(),d+.1)};
const tone=(x,f,t,d,ty,v,pan,f2)=>{const o=x.createOscillator(),g=x.createGain();o.type=ty;o.frequency.setValueAtTime(f,t);if(f2)o.frequency.exponentialRampToValueAtTime(f2,t+d);g.gain.setValueAtTime(.0001,t);g.gain.exponentialRampToValueAtTime(v,t+.02);g.gain.exponentialRampToValueAtTime(.0001,t+d);o.connect(g);g.connect(out(x,pan));o.start(t);o.stop(t+d+.05)};
/* ---- sons ---- */
const SND={
sting(x){const t=x.currentTime;nz(x,t,.7,'bandpass',1800,.8,.22);tone(x,311,t,.7,'sawtooth',.09);tone(x,440,t,.7,'sawtooth',.08);tone(x,466,t,.6,'sawtooth',.06);tone(x,42,t,.9,'sine',.45)},
heart(x,n=8,ms=900){const t=x.currentTime;for(let i=0;i<n;i++){const k=t+i*(ms/1000)*Math.pow(.93,i);tone(x,58,k,.14,'sine',.5+i*.03);tone(x,46,k+.16,.12,'sine',.38+i*.03)}},
steps(x){const t=x.currentTime;let side=-.8;for(let i=0;i<7;i++){const k=t+i*.62;nz(x,k,.16,'lowpass',260,.9,.18+i*.04,side+i*.12);tone(x,70,k,.12,'sine',.12)}},
door(x){const t=x.currentTime;nz(x,t,.28,'lowpass',500,.6,.3,.7);tone(x,48,t,.3,'sine',.4,.7)},
whisper(x){return vplay('sussurro',1.5,.2,()=>SND.whisperSynth(x))},
whisperSynth(x){const t=x.currentTime;nz(x,t,1.5,'bandpass',2600,6,.07,-.5);nz(x,t+.8,1.3,'bandpass',1900,5,.06,.5);tone(x,60,t,1.3,'sine',.1)},
breath(x){const t=x.currentTime;nz(x,t,1.6,'bandpass',900,2,.12,.3);nz(x,t+1.9,1.4,'bandpass',800,2,.1,-.3)},
scrape(x){const t=x.currentTime;nz(x,t,1.2,'bandpass',3200,3,.08,-.6)},
creak(x){const t=x.currentTime;tone(x,150,t,1.5,'sawtooth',.06,0,70)},
honk(x){const t=x.currentTime;[0,.42].forEach(d=>{const o=x.createOscillator(),g=x.createGain(),f=x.createBiquadFilter();o.type='square';o.frequency.setValueAtTime(380,t+d);o.frequency.exponentialRampToValueAtTime(300,t+d+.16);f.type='lowpass';f.frequency.value=700;g.gain.setValueAtTime(.0001,t+d);g.gain.exponentialRampToValueAtTime(.05,t+d+.02);g.gain.exponentialRampToValueAtTime(.0001,t+d+.2);o.connect(f);f.connect(g);g.connect(out(x,.9));o.start(t+d);o.stop(t+d+.25)})},
laugh(x){return vplay('palhaco',1,.1,()=>SND.laughSynth(x))},
laughSynth(x){const t=x.currentTime;for(let i=0;i<6;i++){const o=x.createOscillator(),g=x.createGain(),f=x.createBiquadFilter();o.type='sawtooth';o.frequency.setValueAtTime(520-i*38,t+i*.2);o.frequency.exponentialRampToValueAtTime(380-i*38,t+i*.2+.14);f.type='bandpass';f.frequency.value=900+(i%2)*500;f.Q.value=2;g.gain.setValueAtTime(.0001,t+i*.2);g.gain.exponentialRampToValueAtTime(.09,t+i*.2+.02);g.gain.exponentialRampToValueAtTime(.0001,t+i*.2+.16);o.connect(f);f.connect(g);g.connect(AU.mg);o.start(t+i*.2);o.stop(t+i*.2+.2)}},
lullaby(x,cut){const N=[659,659,784,659,659,784,659,784,1047,988,880,880,784],t=x.currentTime;let k=0;N.forEach((f,i)=>{if(cut&&i>=cut)return;const d=.5+i*.07,tt=t+k;k+=d;const dt=1-i*.006;tone(x,f*dt,tt,d*1.4,'sine',.07,0);tone(x,f*2.76*dt,tt,d*.6,'sine',.015,0)})},
bell(x){const t=x.currentTime;[[0,.07],[.9,.04]].forEach(([d,v])=>{[1568,2093,3136].forEach((f,i)=>tone(x,f,t+d,1.6-i*.3,'sine',v/(1+i*.8),.5))})},
laughSoft(x){return vplay('risada',1.1,-.3,()=>SND.laughSoftSynth(x))},
laughSoftSynth(x){const t=x.currentTime;for(let i=0;i<4;i++){const o=x.createOscillator(),g=x.createGain(),f=x.createBiquadFilter(),pn=x.createStereoPanner?x.createStereoPanner():null;o.type='sawtooth';o.frequency.setValueAtTime(330-i*22,t+i*.26);o.frequency.exponentialRampToValueAtTime(260-i*22,t+i*.26+.16);f.type='bandpass';f.frequency.value=780+(i%2)*300;f.Q.value=1.6;g.gain.setValueAtTime(.0001,t+i*.26);g.gain.exponentialRampToValueAtTime(.05-i*.006,t+i*.26+.03);g.gain.exponentialRampToValueAtTime(.0001,t+i*.26+.2);o.connect(f);f.connect(g);if(pn){pn.pan.value=-.5;g.connect(pn);pn.connect(AU.mg)}else g.connect(AU.mg);o.start(t+i*.26);o.stop(t+i*.26+.25)}nz(x,t+1.1,1,'bandpass',900,2,.06,-.4)},
knock(x){const t=x.currentTime;[0,.38,.72].forEach(d=>{tone(x,95,t+d,.14,'sine',.5,.2);nz(x,t+d,.08,'lowpass',400,.8,.25,.2)})},
drip(x){const t=x.currentTime;for(let i=0;i<5;i++){const k=t+i*rnd(.5,1.1);tone(x,1300,k,.12,'sine',.07,rnd(-.5,.5),620)}},
applause(x){const t=x.currentTime;for(let i=0;i<60;i++){const k=t+Math.random()*3;nz(x,k,.05,'bandpass',rnd(1500,4000),1,.05*(1-(k-t)/3.4))}},
squeak(x){const t=x.currentTime;for(let i=0;i<6;i++){const k=t+i*.55,p=.9-i*.3;tone(x,900,k,.14,'sine',.07/(1+i*.12),p,1500);tone(x,1300,k+.08,.09,'triangle',.04,p)}},
buzz(x){const t=x.currentTime;tone(x,60,t,1.8,'sawtooth',.06,0);tone(x,120,t,1.8,'sawtooth',.03,0);for(let i=0;i<5;i++)nz(x,t+i*.35,.05,'highpass',3000,1,.06)},
card(x){const t=x.currentTime;nz(x,t,.18,'highpass',2500,.8,.12);nz(x,t+.45,.12,'highpass',3500,.8,.1);tone(x,70,t+.5,.9,'sine',.2)},
drum(x){const t=x.currentTime;for(let i=0;i<26;i++){const k=t+i*.1;nz(x,k,.07,'lowpass',420,.7,.08+i*.004)}nz(x,t+2.7,1.2,'bandpass',5200,1.2,.16);tone(x,60,t+2.7,1,'sine',.4)},
ring(x){const t=x.currentTime;for(let i=0;i<8;i++){tone(x,440,t+i*1,.38,'sine',.06);tone(x,480,t+i*1,.38,'sine',.06)}},
silence(x){/* corta tudo por um instante */try{AU.mg.gain.setValueAtTime(AU.mg.gain.value,x.currentTime);AU.mg.gain.linearRampToValueAtTime(.02,x.currentTime+.15);AU.mg.gain.linearRampToValueAtTime(.9,x.currentTime+4.2)}catch(e){}}
};
/* Vozes gravadas (assets/voz/e3_susto_*.mp3). Se o arquivo ainda não existir, usa o som sintetizado. */
const VF={palhaco:'assets/voz/e3_susto_riso_palhaco.mp3',risada:'assets/voz/e3_susto_risada.mp3',sussurro:'assets/voz/e3_susto_sussurro.mp3',caixa:'assets/voz/e3_susto_caixa.mp3'},VB={},VM={};
const vplay=(k,vol,pan,fb)=>{const x=X();if(!x){return}
const go=b=>{const s=x.createBufferSource(),g=x.createGain();s.buffer=b;g.gain.value=vol||.9;s.connect(g);g.connect(out(x,pan||0));s.start()};
if(VB[k])return go(VB[k]);if(VM[k]){fb&&fb();return}
fetch(VF[k]).then(r=>{if(!r.ok)throw 0;return r.arrayBuffer()}).then(a=>x.decodeAudioData(a)).then(b=>{VB[k]=b;go(b)}).catch(()=>{VM[k]=1;fb&&fb()})};
const play=(k,a,b)=>{const x=X();if(x&&SND[k])try{SND[k](x,a,b)}catch(e){}};
/* ---- visuais ---- */
const layer=()=>{let e=document.getElementById('e3fx');if(!e){e=document.createElement('div');e.id='e3fx';e.style.cssText='position:fixed;inset:0;pointer-events:none;z-index:2600;overflow:hidden';document.body.appendChild(e)}return e};
const add=(html,css,ms,anim)=>{const e=layer(),d=document.createElement('div');d.dataset.t=Date.now();d.style.cssText='position:absolute;'+css;d.innerHTML=html;e.appendChild(d);try{if(anim&&!reduce())d.animate(anim,{duration:ms,easing:'ease-in-out',fill:'forwards'});else if(anim)d.animate([{opacity:0},{opacity:anim[1].opacity||1},{opacity:0}],{duration:ms,fill:'forwards'})}catch(er){}setTimeout(()=>d.remove(),ms+80);return d};
const flick=()=>{const e=layer();const d=document.createElement('div');d.dataset.t=Date.now();d.style.cssText='position:absolute;inset:0;background:#000;opacity:0';e.appendChild(d);try{d.animate(reduce()?[{opacity:0},{opacity:.6},{opacity:0}]:[{opacity:0},{opacity:.9},{opacity:0},{opacity:0},{opacity:.85},{opacity:0}],{duration:reduce()?1200:1000})}catch(er){}setTimeout(()=>d.remove(),1200)};
const FACE=`<svg viewBox="0 0 120 150" width="100%" height="100%"><defs><radialGradient id="e3f" cx=".5" cy=".4" r=".7"><stop offset="0" stop-color="#e9e4d8"/><stop offset="1" stop-color="#8d8878"/></radialGradient></defs><path d="M60 8l30 52H30z" fill="#14101c"/><ellipse cx="60" cy="86" rx="40" ry="52" fill="url(#e3f)"/><ellipse cx="42" cy="74" rx="11" ry="15" fill="#0b0810"/><ellipse cx="78" cy="74" rx="11" ry="15" fill="#0b0810"/><circle cx="60" cy="98" r="9" fill="#b3121f"/><path d="M26 112q34 38 68 0q-34 18-68 0z" fill="#7a0e18"/><path d="M30 114l6 10m6-8l5 13m6-11l4 14m6-12l3 14m6-12l2 14m6-12l-1 14m6-12l-3 13" stroke="#e9e4d8" stroke-width="2.6"/></svg>`;
const SIL=`<svg viewBox="0 0 80 200" width="100%" height="100%"><path d="M40 4l22 30H18z" fill="#000"/><ellipse cx="40" cy="48" rx="17" ry="20" fill="#000"/><path d="M14 74q26-14 52 0l8 90H6z" fill="#000"/><path d="M26 164v30m28-30v30" stroke="#000" stroke-width="9" stroke-linecap="round"/></svg>`;
const EYES=`<svg viewBox="0 0 100 30" width="100%" height="100%"><ellipse cx="25" cy="15" rx="12" ry="6" fill="#ffe27a"/><ellipse cx="75" cy="15" rx="12" ry="6" fill="#ffe27a"/><ellipse cx="25" cy="15" rx="3" ry="5.5" fill="#000"/><ellipse cx="75" cy="15" rx="3" ry="5.5" fill="#000"/></svg>`;
const V={
silhueta(){const L=Math.random()<.5;add(SIL,'bottom:-2%;'+(L?'left':'right')+':-4%;width:34%;height:62%;opacity:0;filter:drop-shadow(0 0 18px #000)',1700,[{opacity:0,transform:'translateX('+(L?'-30':'30')+'px)'},{opacity:.9,transform:'none'},{opacity:.9},{opacity:0}])},
olhos(){const y=rnd(14,70),x=rnd(8,62);const d=add(EYES,'left:'+x+'%;top:'+y+'%;width:30%;height:9%;opacity:0;filter:drop-shadow(0 0 8px #ffd94a)',2600,[{opacity:0},{opacity:.95,offset:.2},{opacity:0,offset:.3},{opacity:.95,offset:.38},{opacity:.95,offset:.8},{opacity:0}])},
rosto(){const e=layer();const d=add(FACE,'left:50%;top:50%;width:'+(innerWidth<500?'88vw':'46vw')+';max-width:520px;aspect-ratio:120/150;transform:translate(-50%,-50%) scale(.6);opacity:0;filter:contrast(1.3) saturate(.7)',320,[{opacity:0,transform:'translate(-50%,-50%) scale(.6)'},{opacity:1,transform:'translate(-50%,-50%) scale(1.15)'},{opacity:0,transform:'translate(-50%,-50%) scale(1.3)'}])},
sombra(){add('','top:0;bottom:0;left:-40%;width:40%;background:linear-gradient(90deg,transparent,rgba(0,0,0,.85),transparent)',2400,[{transform:'translateX(0)',opacity:0},{opacity:1,offset:.4},{transform:'translateX(380%)',opacity:0}])},
rabisco(t){add('<div style="font:700 '+(innerWidth<500?30:44)+'px/1.1 \'Brush Script MT\',\'Segoe Script\',cursive;color:#b3121f;text-shadow:0 0 14px #000;transform:rotate(-4deg);text-align:center">'+t+'</div>','left:6%;right:6%;top:36%;opacity:0',2300,[{opacity:0},{opacity:.95,offset:.15},{opacity:.95,offset:.7},{opacity:0}])},
espelho(){const u=document.getElementById('app');if(!u)return;if(reduce()){lock(2600);u.animate([{filter:'none'},{filter:'blur(5px) hue-rotate(40deg)'},{filter:'blur(5px) hue-rotate(40deg)',offset:.8},{filter:'none'}],{duration:2600});return}lock(4600);u.style.transformOrigin='50% 50%';u.animate([{transform:'scaleX(1)'},{transform:'scaleX(-1)',offset:.06},{transform:'scaleX(-1) rotate(.7deg)',offset:.3},{transform:'scaleX(-1) rotate(-.7deg)',offset:.55},{transform:'scaleX(-1)',offset:.9},{transform:'scaleX(1)'}],{duration:4400});
setTimeout(()=>add('<div style="font:700 '+(innerWidth<500?32:46)+'px/1.1 \'Brush Script MT\',\'Segoe Script\',cursive;color:#b3121f;text-shadow:0 0 14px #000;transform:scaleX(-1) rotate(3deg);text-align:center">ele está na caixa</div>','left:6%;right:6%;top:40%;opacity:0',2600,[{opacity:0},{opacity:.95,offset:.2},{opacity:.95,offset:.75},{opacity:0}]),700);setTimeout(()=>vplay('caixa',.95,0,()=>play('scrape')),900)},
glitch(){const u=document.getElementById('app');if(!u)return false;const D=4800;lock(D+300);glK=Date.now()+D;const ck=clk00();setTimeout(()=>{glK=0;document.querySelectorAll('#ui .pclk,#ui .sbar span:first-child').forEach(e=>{e.textContent=hm(S.clock)})},D);
const burst=()=>{if(reduce()){add('','inset:0;background:rgba(160,0,30,.3);opacity:0',900,[{opacity:0},{opacity:1},{opacity:0}]);return}u.animate([{filter:'none',transform:'none'},{filter:'hue-rotate(90deg) contrast(1.8) saturate(2)',transform:'translate(9px,-4px) skewX(6deg)'},{filter:'none',transform:'translate(-8px,3px)'},{filter:'hue-rotate(-60deg) saturate(2.5)',transform:'skewX(-5deg) translateX(7px)'},{filter:'invert(1)',transform:'none'},{filter:'none',transform:'none'}],{duration:900,easing:'steps(5,end)'});for(let i=0;i<6;i++)add('','left:0;right:0;top:'+rnd(5,90)+'%;height:'+rnd(2,7)+'%;background:rgba('+pick(['255,40,70','40,255,220','255,255,255'])+',.45);mix-blend-mode:screen;opacity:0',700,[{opacity:0},{opacity:1,transform:'translateX('+rnd(-30,30)+'px)'},{opacity:0}])};
burst();setTimeout(()=>{burst();play('scrape')},1700);setTimeout(()=>{burst();play('breath')},3400);return ck.length>0},
mao(){const L=Math.random()<.5,y=rnd(18,60);add('<svg viewBox="0 0 100 130" width="100%" height="100%"><path d="M50 126C30 126 20 112 18 94L12 58q-2-8 5-9t9 8l3 14V24q0-9 7-9t7 9l1 26 1-34q0-9 7-9t7 9v34l2-26q1-9 8-8t6 10l-3 36 8-16q4-8 10-4t2 11L84 92c-2 20-12 34-34 34z" fill="#d9d2c3" stroke="#6a6354" stroke-width="2"/></svg>','top:'+y+'%;'+(L?'left':'right')+':-2%;width:30%;aspect-ratio:100/130;opacity:0;transform:rotate('+(L?'-14':'14')+'deg)'+(L?'':' scaleX(-1)'),2800,[{opacity:0},{opacity:.8,offset:.12},{opacity:.8,offset:.7},{opacity:0}])},
gota(){for(let i=0;i<7;i++)add('','top:0;left:'+rnd(6,94)+'%;width:3px;height:'+rnd(18,55)+'%;background:linear-gradient(180deg,rgba(120,0,16,.85),rgba(120,0,16,0));border-radius:0 0 3px 3px;opacity:0;transform-origin:top',rnd(2600,4200),[{opacity:0,transform:'scaleY(.1)'},{opacity:.9,transform:'scaleY(1)',offset:.35},{opacity:.7,offset:.75},{opacity:0}])},
lampada(){const u=document.getElementById('app');if(!u)return;u.animate([{filter:'brightness(1)'},{filter:'brightness(.2)',offset:.1},{filter:'brightness(.9)',offset:.2},{filter:'brightness(.15)',offset:.32},{filter:'brightness(.15)',offset:.8},{filter:'brightness(1)'}],{duration:reduce()?1200:2600})},
carta(){const N=pick(['A MORTE','O ENFORCADO','A TORRE','O LOUCO','A LUA']),sym={'A MORTE':'☠','O ENFORCADO':'⛓','A TORRE':'♜','O LOUCO':'☺','A LUA':'☾'}[N];add('<div style="width:100%;height:100%;border:3px solid #c9a24a;border-radius:14px;background:radial-gradient(circle at 50% 40%,#3a2340,#150b1c);display:flex;flex-direction:column;align-items:center;justify-content:space-between;padding:16px 8px;box-shadow:0 0 40px #000"><div style="color:#c9a24a;font:700 15px Georgia,serif;letter-spacing:2px">'+N+'</div><div style="color:#e9d9a8;font:400 74px/1 Georgia,serif">'+sym+'</div><div style="color:#c9a24a;font:italic 12px Georgia,serif">Madame Zora</div></div>','left:50%;top:50%;width:'+(innerWidth<500?'46vw':'220px')+';aspect-ratio:3/4.4;margin-left:'+(innerWidth<500?'-23vw':'-110px')+';transform:translateY(-50%);opacity:0',2800,[{opacity:0,transform:'translateY(-50%) rotateY(90deg) scale(.7)'},{opacity:1,transform:'translateY(-50%) rotateY(0deg) scale(1)',offset:.2},{opacity:1,transform:'translateY(-50%) rotateY(0deg) scale(1)',offset:.8},{opacity:0,transform:'translateY(-50%) rotateY(-90deg) scale(.9)'}])},
cortina(){lock(4200);const P=(side)=>add('','top:0;bottom:0;'+side+':0;width:51%;background:repeating-linear-gradient(90deg,#6b0f1a 0 14px,#8c1624 14px 28px);box-shadow:0 0 30px #000 inset;transform:translateX('+(side==='left'?'-100%':'100%')+')',4000,[{transform:'translateX('+(side==='left'?'-100%':'100%')+')'},{transform:'translateX(0)',offset:.22},{transform:'translateX(0)',offset:.72},{transform:'translateX('+(side==='left'?'-100%':'100%')+')'}]);P('left');P('right')},
telefone(){if(document.getElementById('e3call'))return;const e=layer(),d=document.createElement('div');d.id='e3call';d.dataset.t=Date.now()+9999999;d.style.cssText='position:absolute;inset:0;pointer-events:auto;background:#05070b;display:flex;flex-direction:column;align-items:center;justify-content:center;gap:14px;color:#e8edf5;font-family:inherit';
d.innerHTML='<div style="font:700 11px Arial;letter-spacing:2px;opacity:.6">CHAMADA RECEBIDA</div><div style="width:92px;height:92px;border-radius:50%;background:#1a2230;display:grid;place-items:center;font-size:42px;animation:e3ring 1s infinite">?</div><div style="font:600 22px Arial">Número desconhecido</div><div style="display:flex;gap:46px;margin-top:22px"><button id=e3no style="width:64px;height:64px;border-radius:50%;border:0;background:#c43a3a;color:#fff;font-size:26px">✕</button><button id=e3yes style="width:64px;height:64px;border-radius:50%;border:0;background:#2ea35c;color:#fff;font-size:26px">✆</button></div>';
e.appendChild(d);play('ring');const end=(m)=>{if(!d.isConnected)return;d.remove();if(m)narra(m)};
const t0=setTimeout(()=>end('Uma chamada perdida. Número desconhecido.'),8200);
d.querySelector('#e3no').onclick=()=>{clearTimeout(t0);end()};
d.querySelector('#e3yes').onclick=()=>{clearTimeout(t0);d.querySelector('div').textContent='CHAMADA EM ANDAMENTO';play('silence');setTimeout(()=>play('breath'),1400);setTimeout(()=>{play('whisper')},3200);setTimeout(()=>end('A ligação caiu. Só havia respiração do outro lado.'),6200)}},
pulso(){add('','inset:0;background:radial-gradient(ellipse at 50% 50%,rgba(0,0,0,0) 30%,rgba(160,0,20,.55) 100%);opacity:0',3400,[{opacity:0},{opacity:1,offset:.15},{opacity:.3,offset:.3},{opacity:1,offset:.45},{opacity:.2,offset:.6},{opacity:.9,offset:.75},{opacity:0}])},
/* apagão: escurece tudo, com um pequeno círculo de luz que segue o dedo; no fim, um rosto no lugar da lanterna */
apagao(){if(reduce()){flick();return}const e=layer(),d=document.createElement('div');d.dataset.t=Date.now();let px=innerWidth/2,py=innerHeight/2;d.style.cssText='position:absolute;inset:0;pointer-events:none;opacity:0;transition:opacity .5s';const up=()=>{d.style.background='radial-gradient(circle at '+px+'px '+py+'px,rgba(0,0,0,0) 0,rgba(0,0,0,.2) 40px,rgba(0,0,0,.97) 130px)'};up();e.appendChild(d);requestAnimationFrame(()=>d.style.opacity=1);
const mv=ev=>{const t=ev.touches?ev.touches[0]:ev;px=t.clientX;py=t.clientY;up()};addEventListener('pointermove',mv,true);addEventListener('touchmove',mv,true);
const stop=()=>{removeEventListener('pointermove',mv,true);removeEventListener('touchmove',mv,true)};
play('silence');setTimeout(()=>play('breath'),1800);setTimeout(()=>{d.style.transition='none';d.style.opacity=1;const f=document.createElement('div');f.style.cssText='position:absolute;left:'+(px-60)+'px;top:'+(py-75)+'px;width:120px;height:150px;opacity:.95';f.innerHTML=FACE;e.appendChild(f);play('sting');vib([80,50,160]);setTimeout(()=>{f.remove();d.style.transition='opacity .6s';d.style.opacity=0;setTimeout(()=>{d.remove();stop()},700)},260)},4300+rnd(0,1200))}
};
function vib(p){try{if(typeof getA==='function'&&getA('vib')&&navigator.vibrate)navigator.vibrate(p||[50,60,90])}catch(e){}}
let glK=0;const clk00=()=>{const ck=[...document.querySelectorAll('#ui .pclk,#ui .sbar span:first-child')];ck.forEach(e=>{e.textContent='00:00'});return ck};
{const _r=render;render=function(){const r=_r.apply(this,arguments);try{if(Date.now()<glK)clk00()}catch(e){}return r}}
const lock=ms=>{const e=layer(),d=document.createElement('div');d.dataset.t=Date.now();d.style.cssText='position:absolute;inset:0;pointer-events:auto;background:transparent;touch-action:none';e.appendChild(d);setTimeout(()=>d.remove(),ms)};
const narra=(t,ms)=>{const tx=String(t).replace(/^[^\p{L}"]+/u,'');const e=layer(),d=document.createElement('div');d.dataset.t=Date.now();d.style.cssText='position:absolute;left:0;right:0;bottom:calc(env(safe-area-inset-bottom,0px) + 54px);padding:34px 22px 16px;text-align:center;background:linear-gradient(0deg,rgba(0,0,0,.78),rgba(0,0,0,0));color:#e6dcc8;font:italic 400 '+(innerWidth<500?15:18)+'px/1.4 Georgia,\'Times New Roman\',serif;letter-spacing:.2px;text-shadow:0 1px 8px #000;opacity:0;transition:opacity .7s';d.textContent=tx;e.appendChild(d);requestAnimationFrame(()=>d.style.opacity=1);const L=ms||Math.min(7500,2600+tx.length*55);setTimeout(()=>{d.style.opacity=0},L);setTimeout(()=>d.remove(),L+900)};
const say=narra;
/* ---- sustos ---- cada um: nível mínimo de tensão (0 a 1) e a cena */
const SC=[
{id:'sil',lv:0,cool:420,go(){play('steps');setTimeout(V.silhueta,rnd(1500,3200))}},
{id:'sus',lv:0,cool:300,go(){const v=pick([['Alguém sussurra o seu nome, bem perto da orelha.','whisper'],['Um cochicho: "ele não saiu dali".','whisper'],['Uma voz pergunta, baixinho: "você contou os minutos?"','whisper'],['Atrás de você, alguém ri baixinho. Quando você olha, só há serragem e silêncio.','laughSoft']]);play(v[1]);setTimeout(()=>say(v[0]),v[1]==='laughSoft'?600:200)}},
{id:'ri',lv:0,cool:900,go(){play('laugh');setTimeout(()=>say('O botão do riso de palhaço disparou sozinho na tenda. Ninguém encostou nele.'),900)}},
{id:'sin',lv:0,cool:900,go(){play('bell');setTimeout(()=>say('A sineta da bilheteria tocou sozinha. Ninguém entrou.'),700);setTimeout(flick,1800)}},
{id:'honk',lv:0,cool:600,go(){play('honk');setTimeout(V.olhos,900)}},
{id:'cx',lv:0,cool:900,max:2,go(){const x=X();if(x){SND.lullaby(x,rnd(6,11)|0)}setTimeout(()=>{play('silence');setTimeout(()=>play('laughSoft'),1200)},4200)}},
{id:'pal',lv:0,cool:900,max:2,go(){play('applause');setTimeout(()=>{play('silence');say('A plateia aplaudiu por um instante. Não há ninguém na lona.')},3000)}},
{id:'sap',lv:0,cool:700,go(){play('squeak')}},
{id:'sombra',lv:.1,cool:480,go(){play('door');V.sombra()}},
{id:'olhos',lv:.1,cool:480,go(){play('creak');setTimeout(()=>{V.olhos();play('breath')},700)}},
{id:'mao',lv:.1,cool:720,go(){play('knock');setTimeout(V.mao,1300);setTimeout(()=>say('Três batidas, vindas de dentro da madeira.'),400)}},
{id:'gota',lv:.15,cool:720,go(){play('drip');V.gota()}},
{id:'lamp',lv:.15,cool:600,go(){play('buzz');V.lampada()}},
{id:'carta',lv:.2,cool:900,max:3,go(){play('card');V.carta()}},
{id:'rab',lv:.2,cool:600,go(){const t=pick(['conte de novo','não foi um acidente','ela mente','olhe atrás de você','a plateia riu','o último número já começou']);play('scrape');V.rabisco(t)}},
{id:'gli',lv:.2,cool:900,when(){return S.tab==='phone'},go(){play('sting');V.glitch()}},
{id:'tel',lv:.25,cool:1200,max:3,when(){return S.tab==='phone'||S.tab==='locations'},go(){V.telefone()}},
{id:'cor',lv:.3,cool:720,go(){play('heart');V.pulso();vib([60,120,60,120,60])}},
{id:'esp',lv:.3,cool:900,max:3,go(){play('whisper');V.espelho();setTimeout(()=>play('breath'),2600)}},
{id:'cort',lv:.35,cool:1200,max:2,go(){play('drum');V.cortina();setTimeout(()=>say('O pano fechou. O último número vai começar?'),3300)}},
{id:'ros',lv:.5,cool:1500,max:2,go(){play('heart',4,700);setTimeout(()=>{play('sting');V.rosto();flick();vib([90,40,200])},2600+rnd(0,1400))}},
{id:'apg',lv:.6,cool:1500,max:2,go(){V.apagao()}}];
const LOCS={pista:{k:'cx'},bilheteria:{k:'sin'},som:{k:'ri'},camarins:{k:'esp'},carretas:{k:'honk'},trailer:{k:'olhos'}};
const tension=()=>{try{return Math.min(1,((S.ded||[]).length*1.2+(S.inv||[]).length*.5+(S.asked||[]).length*.4)/ (C.NT?C.NT*1.4:20))}catch(e){return 0}};
let last='',last2='',nextT=0,boxT=0,boxI=0,lastBig=0;const USED={},WHEN={};
const draw=lv=>{const now=Date.now();let ok=SC.filter(s=>s.lv<=lv&&s.id!==last&&s.id!==last2&&(!s.when||s.when())&&(!s.max||(USED[s.id]||0)<s.max)&&now-(WHEN[s.id]||0)>(s.cool||600)*1000);if(!ok.length)ok=SC.filter(s=>s.lv<=lv&&s.id!==last&&(!s.when||s.when())&&(!s.max||(USED[s.id]||0)<s.max));if(!ok.length)return null;const mn=Math.min(...ok.map(s=>USED[s.id]||0));const low=ok.filter(s=>(USED[s.id]||0)<=mn+1);return pick(low.length?low:ok)};
const fire=s=>{if(!s)return;last2=last;last=s.id;USED[s.id]=(USED[s.id]||0)+1;WHEN[s.id]=Date.now();if(s.id==='ros'||s.id==='apg'||s.id==='cort')lastBig=Date.now();try{s.go()}catch(e){}};
const NOTES=[440,523.3,659.3,587.3,523.3,415.3,440,392,415.3,523.3,659.3,622.3];
const box=x=>{if(!AU.m||!AU.mus)return;const droop=1-Math.min(.06,(boxI%36)*.0018),f=NOTES[boxI%NOTES.length]*droop*(1+(Math.random()-.5)*.012),t=x.currentTime;boxI++;if(Math.random()<.35)return;AU.o(f,t,1.1,'sine',.045,AU.mus);AU.o(f*2.76,t,.5,'sine',.012,AU.mus)};
const vig=()=>{let e=document.getElementById('e3vig');if(!on()){if(e)e.remove();return}
if(!e){e=document.createElement('div');e.id='e3vig';e.style.cssText='position:fixed;inset:0;pointer-events:none;z-index:40;background:radial-gradient(ellipse at 50% 45%,rgba(0,0,0,0) 50%,rgba(8,0,6,.58) 100%);animation:e3pulse 7s ease-in-out infinite';document.body.appendChild(e)}
const t=tension();e.style.background='radial-gradient(ellipse at 50% 45%,rgba(0,0,0,0) '+(52-t*14)+'%,rgba(10,0,6,'+(.55+t*.2).toFixed(2)+') 100%)'};
let lastLoc='';
setInterval(()=>{try{vig();const L0=document.getElementById('e3fx');if(L0){[...L0.children].forEach(c=>{if(Date.now()-(+c.dataset.t||Date.now())>12000)c.remove()})}const A0=document.getElementById('app');if(A0&&A0.getAnimations&&!A0.getAnimations().length&&(A0.style.transform||A0.style.filter)){A0.style.transform='';A0.style.filter=''}if(!calmGentle())return;const x=X(),now=Date.now(),t=tension();
if(S.tab==='locations'&&S.loc&&S.loc!==lastLoc){lastLoc=S.loc;S.sc=S.sc||{};const L=LOCS[S.loc];if(L&&!S.sc[S.loc]&&calm()){S.sc[S.loc]=1;try{save()}catch(e){}setTimeout(()=>{if(calm()&&S.tab==='locations')fire(SC.find(s=>s.id===L.k))},rnd(1400,3200))}}
else if(S.tab!=='locations')lastLoc='';
if(!nextT)nextT=now+rnd(45000,85000);
if(now>nextT&&calm()){
 /* o intervalo é irregular e encurta com a tensão; às vezes é só um alarme falso (um som sem imagem) */
 nextT=now+rnd(55000,150000)*(1-t*.4);
 if(Math.random()<.22){play(pick(['creak','door','scrape','breath','honk']));return}
 const lv=Date.now()-lastBig<240000?Math.min(t,.45):t;fire(draw(lv))}
if(x&&now>boxT){boxT=now+1700;box(x)}}catch(e){}},700);
setInterval(()=>{try{if(calm()&&Math.random()<.4)play(pick(['creak','scrape','door']))}catch(e){}},23000);
})();

/* Rede de segurança: se a tela falhar ao desenhar, o jogo não pode ficar preso. Tenta voltar ao celular e, se ainda falhar, mostra o erro com botões. */
(function(){
const rec=m=>{try{localStorage.setItem('sisp_lasterr',String(m).slice(0,300)+' @'+new Date().toISOString())}catch(e){}};
addEventListener('error',e=>rec((e.message||'erro')+' '+String(e.filename||'').split('/').pop()+':'+(e.lineno||'')));
addEventListener('unhandledrejection',e=>rec('promessa: '+(e.reason&&e.reason.message||e.reason)));
const _r=render;let busy=0;
render=function(){try{return _r.apply(this,arguments)}catch(err){rec('render: '+(err&&err.stack||err).toString().split('\n').slice(0,2).join(' '));
 if(busy)throw err;busy=1;
 try{try{INS=null}catch(e){}try{window.MG=null}catch(e){}try{CHO=0;QTO=0;SWO=0;APPA=0}catch(e){}try{if(!MENU&&S&&S.tab!=='phone')S.tab='phone'}catch(e){}return _r.apply(this,arguments)}
 catch(e2){try{const u=document.getElementById('ui');if(u)u.innerHTML='<div class="ov" style="z-index:50"><h2>Algo deu errado nesta tela</h2><p class=mut style="font-size:12px;max-width:320px">'+String(e2&&e2.message||e2).replace(/</g,'&lt;')+'</p><p><button class=btn onclick="location.reload()">Recarregar</button></p><p><button class="btn gh" onclick="try{MENU=1;render()}catch(e){location.reload()}">Voltar ao menu</button></p></div>'}catch(e3){}}
 finally{busy=0}}};
})();
