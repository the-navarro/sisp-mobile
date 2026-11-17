/* Caso 03 (O Último Número): atmosfera de terror. Música sombria, vento, rangidos, sustos curtos e uma vinheta que pulsa.
   Tudo só roda dentro do caso 03, nunca no menu, e respeita os botões de som e de vibração. */
(function(){
const on=()=>typeof C!=='undefined'&&C&&C.id==='e3'&&typeof MENU!=='undefined'&&!MENU&&S&&S.seen>=4;
const calm=()=>on()&&!CUT&&!RM&&!INS;
TH.e3={dt:.7,mode:'pad',per:8,len:5,dark:1,w:'sine',CH:[[55,[220,261.6,329.6,466.2]],[51.9,[207.7,261.6,311.1,415.3]],[43.65,[174.6,207.7,261.6,349.2]],[49,[196,233.1,293.7,415.3]]]};
Object.assign(AMBM,{'e3:pista':'wind','e3:bilheteria':'hum','e3:som':'hum','e3:camarins':'wind','e3:carretas':'wind','e3:trailer':'hum'});
const X=()=>{if(!AU.f)return null;try{AU.init()}catch(e){}const x=AU.x;return x&&x.state==='running'?x:null};
const noise=(x,t,d,type,fr,q,v)=>{const s=x.createBufferSource();s.buffer=AU.noise();const f=x.createBiquadFilter();f.type=type;f.frequency.value=fr;f.Q.value=q;const g=x.createGain();g.gain.setValueAtTime(.0001,t);g.gain.exponentialRampToValueAtTime(v,t+Math.min(.15,d/3));g.gain.exponentialRampToValueAtTime(.0001,t+d);s.connect(f);f.connect(g);g.connect(AU.mg);s.start(t,Math.random(),d+.1)};
const SND={
organ(x){const t=x.currentTime;[[392,0],[370,.5],[349.2,1.1],[311.1,1.8]].forEach(([f,d],i)=>{AU.o(f,t+d,1.4-i*.2,'triangle',.08-i*.015);AU.o(f*1.006,t+d,1.4-i*.2,'triangle',.05)});AU.o(98,t+2.1,1.6,'sine',.12)},
laugh(x){const t=x.currentTime;for(let i=0;i<6;i++){const o=x.createOscillator(),g=x.createGain(),f=x.createBiquadFilter();o.type='sawtooth';o.frequency.setValueAtTime(520-i*38,t+i*.2);o.frequency.exponentialRampToValueAtTime(380-i*38,t+i*.2+.14);f.type='bandpass';f.frequency.value=900+(i%2)*500;f.Q.value=2;g.gain.setValueAtTime(.0001,t+i*.2);g.gain.exponentialRampToValueAtTime(.09,t+i*.2+.02);g.gain.exponentialRampToValueAtTime(.0001,t+i*.2+.16);o.connect(f);f.connect(g);g.connect(AU.mg);o.start(t+i*.2);o.stop(t+i*.2+.2)}},
whisper(x){const t=x.currentTime;noise(x,t,1.6,'bandpass',2600,6,.06);noise(x,t+.9,1.2,'bandpass',1800,5,.05);AU.o(60,t,1.4,'sine',.12)},
hiss(x){const t=x.currentTime;noise(x,t,1.1,'highpass',4200,.7,.07);AU.o(70,t+.3,.9,'sine',.09)},
creak(x){const t=x.currentTime,o=x.createOscillator(),g=x.createGain(),f=x.createBiquadFilter();o.type='sawtooth';o.frequency.setValueAtTime(150,t);o.frequency.exponentialRampToValueAtTime(70,t+1.4);f.type='lowpass';f.frequency.value=260;g.gain.setValueAtTime(.0001,t);g.gain.exponentialRampToValueAtTime(.07,t+.3);g.gain.exponentialRampToValueAtTime(.0001,t+1.5);o.connect(f);f.connect(g);g.connect(AU.mg);o.start(t);o.stop(t+1.6)},
thud(x){const t=x.currentTime;AU.o(55,t,.5,'sine',.3);AU.o(110,t,.15,'triangle',.1)}};
const play=k=>{const x=X();if(x&&SND[k])try{SND[k](x)}catch(e){}};
/* clarão curto de escuridão, como uma lâmpada que falha */
const flick=()=>{let e=document.getElementById('e3fx');if(!e){e=document.createElement('div');e.id='e3fx';e.style.cssText='position:fixed;inset:0;background:#000;opacity:0;pointer-events:none;z-index:2600';document.body.appendChild(e)}
try{e.animate([{opacity:0},{opacity:.88},{opacity:0},{opacity:.65},{opacity:0},{opacity:.92},{opacity:.2},{opacity:0}],{duration:900})}catch(er){}};
const vib=()=>{try{if(typeof getA==='function'&&getA('vib')&&navigator.vibrate)navigator.vibrate([50,60,90])}catch(e){}};
const scare=(txt,fx,fl)=>{play(fx);if(fl)flick();vib();try{tst(txt)}catch(e){}};
const LOCS={pista:['🎪 Um acorde de realejo soa em algum lugar da lona e morre, de repente, no meio da nota.','organ',1],
bilheteria:['🤡 O palhaço de papelão na fila parece ter virado a cabeça para você. Ele estava de frente para a porta, não estava?','thud',0],
som:['😂 Um riso de palhaço gravado dispara sozinho na tenda. Ninguém apertou nada.','laugh',1],
camarins:['🪞 No espelho de palco, seu reflexo demora meio segundo para acompanhar você. No corredor, o palhaço de costas continua parado no escuro.','whisper',1],
carretas:['🪆 O baú está fechado, mas o boneco de ventríloquo chiou, como se tivesse tentado falar.','hiss',0],
trailer:['🖼️ Na moldura, os olhos do casal parecem seguir você pela sala. A lamparina ainda está morna.','creak',1]};
const RAND=[['👂 Atrás de você, alguém ri baixinho. Quando você olha, só há serragem e silêncio.','whisper',1],
['🎪 A lona respira. Um vento frio passa e as bandeirolas se mexem, embora não haja vento.','creak',0],
['🔦 A luz oscila por um instante, e a sombra no chão não é a sua.','thud',1],
['🎠 Ao longe, uma caixinha de música toca duas notas e para.','organ',0]];
let lastLoc='',nextRand=0,boxT=0,boxI=0;
const NOTES=[440,523.3,659.3,587.3,523.3,415.3,440,392,415.3,523.3,659.3,622.3];
/* caixinha de música desafinada: notas esparsas que caem de altura */
const box=x=>{if(!AU.m||!AU.mus)return;const droop=1-Math.min(.06,(boxI%36)*.0018),f=NOTES[boxI%NOTES.length]*droop*(1+(Math.random()-.5)*.012),t=x.currentTime;boxI++;if(Math.random()<.35)return;AU.o(f,t,1.1,'sine',.045,AU.mus);AU.o(f*2.76,t,.5,'sine',.012,AU.mus)};
const vig=()=>{let e=document.getElementById('e3vig');if(!on()){if(e)e.remove();return}
if(!e){e=document.createElement('div');e.id='e3vig';e.style.cssText='position:fixed;inset:0;pointer-events:none;z-index:40;background:radial-gradient(ellipse at 50% 45%,rgba(0,0,0,0) 52%,rgba(8,0,6,.55) 100%);animation:e3pulse 7s ease-in-out infinite';document.body.appendChild(e)}};
setInterval(()=>{try{vig();if(!calm()){return}
const x=X();const now=Date.now();
if(S.tab==='locations'&&S.loc&&S.loc!==lastLoc){lastLoc=S.loc;S.sc=S.sc||{};if(LOCS[S.loc]&&!S.sc[S.loc]){S.sc[S.loc]=1;try{save()}catch(e){}const L=LOCS[S.loc];setTimeout(()=>{if(calm()&&S.tab==='locations')scare(L[0],L[1],L[2])},1800)}}
else if(S.tab!=='locations')lastLoc='';
if(!nextRand)nextRand=now+60000+Math.random()*50000;
if(now>nextRand){nextRand=now+75000+Math.random()*70000;const r=RAND[Math.floor(Math.random()*RAND.length)];scare(r[0],r[1],r[2])}
if(x&&now>boxT){boxT=now+1700;box(x)}}catch(e){}},700);
/* rangido grave de vez em quando, sem texto */
setInterval(()=>{try{if(calm()&&Math.random()<.35)play('creak')}catch(e){}},26000);
})();
