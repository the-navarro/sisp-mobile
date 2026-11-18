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
whisper(x){const t=x.currentTime;nz(x,t,1.5,'bandpass',2600,6,.07,-.5);nz(x,t+.8,1.3,'bandpass',1900,5,.06,.5);tone(x,60,t,1.3,'sine',.1)},
breath(x){const t=x.currentTime;nz(x,t,1.6,'bandpass',900,2,.12,.3);nz(x,t+1.9,1.4,'bandpass',800,2,.1,-.3)},
scrape(x){const t=x.currentTime;nz(x,t,1.2,'bandpass',3200,3,.08,-.6)},
creak(x){const t=x.currentTime;tone(x,150,t,1.5,'sawtooth',.06,0,70)},
honk(x){const t=x.currentTime;[0,.42].forEach(d=>{const o=x.createOscillator(),g=x.createGain(),f=x.createBiquadFilter();o.type='square';o.frequency.setValueAtTime(380,t+d);o.frequency.exponentialRampToValueAtTime(300,t+d+.16);f.type='lowpass';f.frequency.value=700;g.gain.setValueAtTime(.0001,t+d);g.gain.exponentialRampToValueAtTime(.05,t+d+.02);g.gain.exponentialRampToValueAtTime(.0001,t+d+.2);o.connect(f);f.connect(g);g.connect(out(x,.9));o.start(t+d);o.stop(t+d+.25)})},
laugh(x){const t=x.currentTime;for(let i=0;i<6;i++){const o=x.createOscillator(),g=x.createGain(),f=x.createBiquadFilter();o.type='sawtooth';o.frequency.setValueAtTime(520-i*38,t+i*.2);o.frequency.exponentialRampToValueAtTime(380-i*38,t+i*.2+.14);f.type='bandpass';f.frequency.value=900+(i%2)*500;f.Q.value=2;g.gain.setValueAtTime(.0001,t+i*.2);g.gain.exponentialRampToValueAtTime(.09,t+i*.2+.02);g.gain.exponentialRampToValueAtTime(.0001,t+i*.2+.16);o.connect(f);f.connect(g);g.connect(AU.mg);o.start(t+i*.2);o.stop(t+i*.2+.2)}},
lullaby(x,cut){const N=[659,659,784,659,659,784,659,784,1047,988,880,880,784],t=x.currentTime;let k=0;N.forEach((f,i)=>{if(cut&&i>=cut)return;const d=.5+i*.07,tt=t+k;k+=d;const dt=1-i*.006;tone(x,f*dt,tt,d*1.4,'sine',.07,0);tone(x,f*2.76*dt,tt,d*.6,'sine',.015,0)})},
bell(x){const t=x.currentTime;[[0,.07],[.9,.04]].forEach(([d,v])=>{[1568,2093,3136].forEach((f,i)=>tone(x,f,t+d,1.6-i*.3,'sine',v/(1+i*.8),.5))})},
laughSoft(x){const t=x.currentTime;for(let i=0;i<4;i++){const o=x.createOscillator(),g=x.createGain(),f=x.createBiquadFilter(),pn=x.createStereoPanner?x.createStereoPanner():null;o.type='sawtooth';o.frequency.setValueAtTime(330-i*22,t+i*.26);o.frequency.exponentialRampToValueAtTime(260-i*22,t+i*.26+.16);f.type='bandpass';f.frequency.value=780+(i%2)*300;f.Q.value=1.6;g.gain.setValueAtTime(.0001,t+i*.26);g.gain.exponentialRampToValueAtTime(.05-i*.006,t+i*.26+.03);g.gain.exponentialRampToValueAtTime(.0001,t+i*.26+.2);o.connect(f);f.connect(g);if(pn){pn.pan.value=-.5;g.connect(pn);pn.connect(AU.mg)}else g.connect(AU.mg);o.start(t+i*.26);o.stop(t+i*.26+.25)}nz(x,t+1.1,1,'bandpass',900,2,.06,-.4)},
silence(x){/* corta tudo por um instante */try{AU.mg.gain.setValueAtTime(AU.mg.gain.value,x.currentTime);AU.mg.gain.linearRampToValueAtTime(.02,x.currentTime+.15);AU.mg.gain.linearRampToValueAtTime(.9,x.currentTime+4.2)}catch(e){}}
};
const play=(k,a,b)=>{const x=X();if(x&&SND[k])try{SND[k](x,a,b)}catch(e){}};
/* ---- visuais ---- */
const layer=()=>{let e=document.getElementById('e3fx');if(!e){e=document.createElement('div');e.id='e3fx';e.style.cssText='position:fixed;inset:0;pointer-events:none;z-index:2600;overflow:hidden';document.body.appendChild(e)}return e};
const add=(html,css,ms,anim)=>{const e=layer(),d=document.createElement('div');d.style.cssText='position:absolute;'+css;d.innerHTML=html;e.appendChild(d);try{if(anim&&!reduce())d.animate(anim,{duration:ms,easing:'ease-in-out',fill:'forwards'});else if(anim)d.animate([{opacity:0},{opacity:anim[1].opacity||1},{opacity:0}],{duration:ms,fill:'forwards'})}catch(er){}setTimeout(()=>d.remove(),ms+80);return d};
const flick=()=>{const e=layer();const d=document.createElement('div');d.style.cssText='position:absolute;inset:0;background:#000;opacity:0';e.appendChild(d);try{d.animate(reduce()?[{opacity:0},{opacity:.6},{opacity:0}]:[{opacity:0},{opacity:.9},{opacity:0},{opacity:0},{opacity:.85},{opacity:0}],{duration:reduce()?1200:1000})}catch(er){}setTimeout(()=>d.remove(),1200)};
const FACE=`<svg viewBox="0 0 120 150" width="100%" height="100%"><defs><radialGradient id="e3f" cx=".5" cy=".4" r=".7"><stop offset="0" stop-color="#e9e4d8"/><stop offset="1" stop-color="#8d8878"/></radialGradient></defs><path d="M60 8l30 52H30z" fill="#14101c"/><ellipse cx="60" cy="86" rx="40" ry="52" fill="url(#e3f)"/><ellipse cx="42" cy="74" rx="11" ry="15" fill="#0b0810"/><ellipse cx="78" cy="74" rx="11" ry="15" fill="#0b0810"/><circle cx="60" cy="98" r="9" fill="#b3121f"/><path d="M26 112q34 38 68 0q-34 18-68 0z" fill="#7a0e18"/><path d="M30 114l6 10m6-8l5 13m6-11l4 14m6-12l3 14m6-12l2 14m6-12l-1 14m6-12l-3 13" stroke="#e9e4d8" stroke-width="2.6"/></svg>`;
const SIL=`<svg viewBox="0 0 80 200" width="100%" height="100%"><path d="M40 4l22 30H18z" fill="#000"/><ellipse cx="40" cy="48" rx="17" ry="20" fill="#000"/><path d="M14 74q26-14 52 0l8 90H6z" fill="#000"/><path d="M26 164v30m28-30v30" stroke="#000" stroke-width="9" stroke-linecap="round"/></svg>`;
const EYES=`<svg viewBox="0 0 100 30" width="100%" height="100%"><ellipse cx="25" cy="15" rx="12" ry="6" fill="#ffe27a"/><ellipse cx="75" cy="15" rx="12" ry="6" fill="#ffe27a"/><ellipse cx="25" cy="15" rx="3" ry="5.5" fill="#000"/><ellipse cx="75" cy="15" rx="3" ry="5.5" fill="#000"/></svg>`;
const V={
silhueta(){const L=Math.random()<.5;add(SIL,'bottom:-2%;'+(L?'left':'right')+':-4%;width:34%;height:62%;opacity:0;filter:drop-shadow(0 0 18px #000)',1700,[{opacity:0,transform:'translateX('+(L?'-30':'30')+'px)'},{opacity:.9,transform:'none'},{opacity:.9},{opacity:0}])},
olhos(){const y=rnd(14,70),x=rnd(8,62);const d=add(EYES,'left:'+x+'%;top:'+y+'%;width:30%;height:9%;opacity:0;filter:drop-shadow(0 0 8px #ffd94a)',2600,[{opacity:0},{opacity:.95,offset:.2},{opacity:0,offset:.3},{opacity:.95,offset:.38},{opacity:.95,offset:.8},{opacity:0}])},
rosto(){const e=layer();const d=add(FACE,'left:50%;top:50%;width:'+(innerWidth<500?'88vw':'46vw')+';max-width:520px;aspect-ratio:120/150;transform:translate(-50%,-50%) scale(.6);opacity:0;filter:contrast(1.3) saturate(.7)',320,[{opacity:0,transform:'translate(-50%,-50%) scale(.6)'},{opacity:1,transform:'translate(-50%,-50%) scale(1.15)'},{opacity:0,transform:'translate(-50%,-50%) scale(1.3)'}])},
sombra(){add('','top:0;bottom:0;left:-40%;width:40%;background:linear-gradient(90deg,transparent,rgba(0,0,0,.85),transparent)',2400,[{transform:'translateX(0)',opacity:0},{opacity:1,offset:.4},{transform:'translateX(380%)',opacity:0}])},
rabisco(t){add('<div style="font:700 '+(innerWidth<500?30:44)+'px/1.1 \'Brush Script MT\',\'Segoe Script\',cursive;color:#b3121f;text-shadow:0 0 14px #000;transform:rotate(-4deg);text-align:center">'+t+'</div>','left:6%;right:6%;top:36%;opacity:0',2300,[{opacity:0},{opacity:.95,offset:.15},{opacity:.95,offset:.7},{opacity:0}])},
espelho(){const u=document.getElementById('app');if(!u)return;if(reduce()){u.animate([{filter:'none'},{filter:'blur(5px) hue-rotate(40deg)'},{filter:'none'}],{duration:1400});return}u.style.transformOrigin='50% 50%';u.animate([{transform:'scaleX(1)'},{transform:'scaleX(-1)',offset:.12},{transform:'scaleX(-1)',offset:.78},{transform:'scaleX(1)'}],{duration:1800})},
glitch(){const u=document.getElementById('app');if(!u)return false;const ck=[...document.querySelectorAll('#ui .pclk,#ui .sbar span:first-child')];const old=ck.map(e=>e.textContent);ck.forEach(e=>{e.textContent='00:00'});setTimeout(()=>ck.forEach((e,i)=>{if(e.isConnected)e.textContent=old[i]}),2200);
if(reduce()){add('','inset:0;background:rgba(160,0,30,.35);opacity:0',1200,[{opacity:0},{opacity:1},{opacity:0}])}else{u.animate([{filter:'none',transform:'none'},{filter:'hue-rotate(90deg) contrast(1.8) saturate(2)',transform:'translate(9px,-4px) skewX(6deg)'},{filter:'none',transform:'translate(-8px,3px)'},{filter:'hue-rotate(-60deg) saturate(2.5)',transform:'skewX(-5deg) translateX(7px)'},{filter:'invert(1)',transform:'none'},{filter:'none',transform:'none'}],{duration:900,easing:'steps(5,end)'});for(let i=0;i<6;i++)add('','left:0;right:0;top:'+rnd(5,90)+'%;height:'+rnd(2,7)+'%;background:rgba('+pick(['255,40,70','40,255,220','255,255,255'])+',.45);mix-blend-mode:screen;opacity:0',700,[{opacity:0},{opacity:1,transform:'translateX('+rnd(-30,30)+'px)'},{opacity:0}])}return ck.length>0},
pulso(){add('','inset:0;background:radial-gradient(ellipse at 50% 50%,rgba(0,0,0,0) 30%,rgba(160,0,20,.55) 100%);opacity:0',3400,[{opacity:0},{opacity:1,offset:.15},{opacity:.3,offset:.3},{opacity:1,offset:.45},{opacity:.2,offset:.6},{opacity:.9,offset:.75},{opacity:0}])},
/* apagão: escurece tudo, com um pequeno círculo de luz que segue o dedo; no fim, um rosto no lugar da lanterna */
apagao(){if(reduce()){flick();return}const e=layer(),d=document.createElement('div');let px=innerWidth/2,py=innerHeight/2;d.style.cssText='position:absolute;inset:0;pointer-events:none;opacity:0;transition:opacity .5s';const up=()=>{d.style.background='radial-gradient(circle at '+px+'px '+py+'px,rgba(0,0,0,0) 0,rgba(0,0,0,.2) 40px,rgba(0,0,0,.97) 130px)'};up();e.appendChild(d);requestAnimationFrame(()=>d.style.opacity=1);
const mv=ev=>{const t=ev.touches?ev.touches[0]:ev;px=t.clientX;py=t.clientY;up()};addEventListener('pointermove',mv,true);addEventListener('touchmove',mv,true);
const stop=()=>{removeEventListener('pointermove',mv,true);removeEventListener('touchmove',mv,true)};
play('silence');setTimeout(()=>play('breath'),1800);setTimeout(()=>{d.style.transition='none';d.style.opacity=1;const f=document.createElement('div');f.style.cssText='position:absolute;left:'+(px-60)+'px;top:'+(py-75)+'px;width:120px;height:150px;opacity:.95';f.innerHTML=FACE;e.appendChild(f);play('sting');vib([80,50,160]);setTimeout(()=>{f.remove();d.style.transition='opacity .6s';d.style.opacity=0;setTimeout(()=>{d.remove();stop()},700)},260)},4300+rnd(0,1200))}
};
function vib(p){try{if(typeof getA==='function'&&getA('vib')&&navigator.vibrate)navigator.vibrate(p||[50,60,90])}catch(e){}}
const say=t=>{try{tst(t)}catch(e){}};
/* ---- sustos ---- cada um: nível mínimo de tensão (0 a 1) e a cena */
const SC=[
{id:'sil',lv:0,go(){play('steps');setTimeout(V.silhueta,rnd(1500,3200))}},
{id:'sus',lv:0,go(){const v=pick([['Alguém sussurra o seu nome, bem perto da orelha.','whisper'],['Um cochicho: "ele não saiu dali".','whisper'],['Uma voz pergunta, baixinho: "você contou os minutos?"','whisper'],['Atrás de você, alguém ri baixinho. Quando você olha, só há serragem e silêncio.','laughSoft']]);play(v[1]);setTimeout(()=>say('👂 '+v[0]),v[1]==='laughSoft'?500:150)}},
{id:'sin',lv:0,go(){play('bell');setTimeout(()=>say('🔔 A sineta da bilheteria tocou sozinha. Ninguém entrou.'),700);setTimeout(flick,1800)}},
{id:'honk',lv:0,go(){play('honk');setTimeout(V.olhos,900)}},
{id:'cx',lv:0,go(){const x=X();if(x){SND.lullaby(x,rnd(6,11)|0)}setTimeout(()=>{play('silence');setTimeout(()=>play('laugh'),1200)},4200)}},
{id:'sombra',lv:.1,go(){play('door');V.sombra()}},
{id:'olhos',lv:.1,go(){play('creak');setTimeout(()=>{V.olhos();play('breath')},700)}},
{id:'rab',lv:.2,go(){play('scrape');V.rabisco(pick(['ele está na caixa','conte de novo','não foi um acidente','ela mente','olhe atrás de você','a plateia riu']))}},
{id:'gli',lv:.2,go(){play('sting');const k=V.glitch();setTimeout(()=>say(k?'📡 O relógio do celular marcou 00:00 por um instante, e a tela tremeu.':'📡 Sinal perdido: a tela tremeu por um instante.'),350)}},
{id:'cor',lv:.3,go(){play('heart');V.pulso();vib([60,120,60,120,60])}},
{id:'esp',lv:.3,go(){play('whisper');V.espelho();setTimeout(()=>say('🪞 A tela virou do avesso, como num espelho de palco. O seu reflexo demorou a voltar.'),1600)}},
{id:'ros',lv:.5,go(){play('heart',4,700);setTimeout(()=>{play('sting');V.rosto();flick();vib([90,40,200])},2600+rnd(0,1400))}},
{id:'apg',lv:.6,go(){V.apagao()}}];
const LOCS={pista:{k:'cx'},bilheteria:{k:'sin'},som:{k:'gli'},camarins:{k:'esp'},carretas:{k:'honk'},trailer:{k:'olhos'}};
const tension=()=>{try{return Math.min(1,((S.ded||[]).length*1.2+(S.inv||[]).length*.5+(S.asked||[]).length*.4)/ (C.NT?C.NT*1.4:20))}catch(e){return 0}};
let bag=[],last='',nextT=0,boxT=0,boxI=0,lastBig=0;
const draw=lv=>{const ok=SC.filter(s=>s.lv<=lv&&s.id!==last);if(!ok.length)return SC[0];if(!bag.length)bag=ok.map(s=>s.id).sort(()=>Math.random()-.5);let id;for(let i=0;i<bag.length&&!id;i++){if(ok.some(s=>s.id===bag[i])){id=bag.splice(i,1)[0]}}if(!id)id=pick(ok).id;return SC.find(s=>s.id===id)};
const fire=s=>{if(!s)return;last=s.id;if(s.id==='ros'||s.id==='apg')lastBig=Date.now();try{s.go()}catch(e){}};
const NOTES=[440,523.3,659.3,587.3,523.3,415.3,440,392,415.3,523.3,659.3,622.3];
const box=x=>{if(!AU.m||!AU.mus)return;const droop=1-Math.min(.06,(boxI%36)*.0018),f=NOTES[boxI%NOTES.length]*droop*(1+(Math.random()-.5)*.012),t=x.currentTime;boxI++;if(Math.random()<.35)return;AU.o(f,t,1.1,'sine',.045,AU.mus);AU.o(f*2.76,t,.5,'sine',.012,AU.mus)};
const vig=()=>{let e=document.getElementById('e3vig');if(!on()){if(e)e.remove();return}
if(!e){e=document.createElement('div');e.id='e3vig';e.style.cssText='position:fixed;inset:0;pointer-events:none;z-index:40;background:radial-gradient(ellipse at 50% 45%,rgba(0,0,0,0) 50%,rgba(8,0,6,.58) 100%);animation:e3pulse 7s ease-in-out infinite';document.body.appendChild(e)}
const t=tension();e.style.background='radial-gradient(ellipse at 50% 45%,rgba(0,0,0,0) '+(52-t*14)+'%,rgba(10,0,6,'+(.55+t*.2).toFixed(2)+') 100%)'};
let lastLoc='';
setInterval(()=>{try{vig();if(!calmGentle())return;const x=X(),now=Date.now(),t=tension();
if(S.tab==='locations'&&S.loc&&S.loc!==lastLoc){lastLoc=S.loc;S.sc=S.sc||{};const L=LOCS[S.loc];if(L&&!S.sc[S.loc]&&calm()){S.sc[S.loc]=1;try{save()}catch(e){}setTimeout(()=>{if(calm()&&S.tab==='locations')fire(SC.find(s=>s.id===L.k))},rnd(1400,3200))}}
else if(S.tab!=='locations')lastLoc='';
if(!nextT)nextT=now+rnd(45000,85000);
if(now>nextT&&calm()){
 /* o intervalo é irregular e encurta com a tensão; às vezes é só um alarme falso (um som sem imagem) */
 nextT=now+rnd(30000,110000)*(1-t*.45);
 if(Math.random()<.22){play(pick(['creak','door','scrape','breath','honk']));return}
 const lv=Date.now()-lastBig<240000?Math.min(t,.45):t;fire(draw(lv))}
if(x&&now>boxT){boxT=now+1700;box(x)}}catch(e){}},700);
setInterval(()=>{try{if(calm()&&Math.random()<.4)play(pick(['creak','scrape','door']))}catch(e){}},23000);
})();
