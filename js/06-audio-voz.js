const VFEM=new Set(['marta','eleanor','clara','marina','beatriz','celia','helena','sofia','olivia','lidia','bianca','monica','nair']);
Object.assign(AU,{vo:null,
vstop(){try{introStop()}catch(e){}try{window.speechSynthesis&&speechSynthesis.cancel()}catch(e){}try{if(this.vo){this.vo.gain.cancelScheduledValues(0);this.vo.gain.value=0;this.vo.disconnect()}}catch(e){}this.vo=null},
voice(id,len){this.vstop();if(!this.f)return;
let txt='';try{if(typeof S!=='undefined'&&S&&S.call&&EV[S.call])txt=gx(String(EV[S.call][1])).replace(/\[[^\]]*\]/g,' ').replace(/<[^>]*>/g,' ').replace(/[*_#~]/g,'').replace(/\s+/g,' ').trim()}catch(e){}
this.init();const x=this.x;if(!x||!this.mg)return;
const out=x.createGain();out.gain.value=.7;out.connect(this.mg);this.vo=out;
try{AUV.fala(x,out,VFEM.has(id),id,txt||'',len)}catch(e){}}});

/* ===== Voz de telefone: fala sem palavras, feita de sílabas do próprio texto =====
   Cada sílaba vira uma vogal de verdade (formantes do português), com consoantes curtas, entonação de frase
   (queda no fim, subida na pergunta), acento nas sílabas fortes e pausas nas vírgulas e pontos.
   Passa por um filtro de telefone. Serve para a voz feminina (mais aguda) e masculina (mais grave). */
const AUV=(()=>{
const VOG={a:[730,1100,2450],e:[470,1950,2550],i:[300,2250,3050],o:[470,880,2400],u:[330,830,2300],'é':[580,1780,2500],'ó':[610,950,2450],'@':[520,1450,2500]};
const MAPV={'á':'a','à':'a','â':'a','ã':'a','ê':'e','í':'i','ô':'o','õ':'o','ú':'u','ü':'u'};
const isV=c=>/[aeiouáàâãéêíóôõúü]/.test(c);
const CON={p:{t:'p',f:700,v:0},b:{t:'p',f:600,v:1},t:{t:'p',f:3500,v:0},d:{t:'p',f:3000,v:1},k:{t:'p',f:1800,v:0},c:{t:'p',f:1800,v:0},q:{t:'p',f:1800,v:0},g:{t:'p',f:1600,v:1},
s:{t:'f',f:6500,v:0},z:{t:'f',f:6000,v:1},x:{t:'f',f:4200,v:0},j:{t:'f',f:3800,v:1},f:{t:'f',f:3000,v:0},v:{t:'f',f:2800,v:1},h:{t:'f',f:2200,v:0},
m:{t:'n',f:1000},n:{t:'n',f:1400},l:{t:'l',f:1100},r:{t:'r',f:1300}};
function silabas(w){const L=[...w.toLowerCase().replace(/[^a-zçáàâãéêíóôõúü]/g,'')].map(ch=>ch==='ç'?'s':ch);const S=[];let i=0,on=[];
while(i<L.length){const c=L[i];
if(isV(c)){let v=MAPV[c]||c,ac=/[áéíóúâêô]/.test(c);const cod=[];i++;
if(i<L.length&&isV(L[i])&&/[iu]/.test(L[i])&&!/[áéíóú]/.test(L[i])){i++}
while(i<L.length&&!isV(L[i])){const nx=L[i+1];if(nx&&isV(nx))break;if(/[smnrlz]/.test(L[i])&&cod.length<1){cod.push(L[i]);i++}else break}
S.push({on,v,cod,ac});on=[]}
else{on.push(c);i++}}
if(on.length&&S.length){S[S.length-1].cod.push(...on.filter(c=>c))}
if(S.length&&!S.some(z=>z.ac)){const n=S.length;let k=n-1;if(n>1&&/(a|e|o|as|es|os|am|em|ens)$/.test(w.toLowerCase()))k=n-2;S[k].ac=1}
return S}
function fala(x,out,fem,seed,txt,len){
let h=0;for(const ch of String(seed))h=(h*31+ch.charCodeAt(0))>>>0;const r=()=>{h=(h*1664525+1013904223)>>>0;return (h>>>8)/16777216};
const f0=(fem?205:112)*(.94+r()*.12),vt=(fem?1.17:1)*(.97+r()*.06);
txt=txt||('Alô, tudo bem? Preciso falar com você sobre o que aconteceu. '.repeat(Math.max(1,Math.round((len||60)/60)))).trim();
/* texto em frases e palavras */
const fr=txt.split(/(?<=[.!?…:;])\s+/).filter(Boolean);
const ev=[];fr.forEach((f,fi)=>{const tipo=/\?\s*$/.test(f)?'q':/!\s*$/.test(f)?'e':'d';const pal=f.split(/\s+/).filter(Boolean);
pal.forEach((w,wi)=>{const sl=silabas(w);if(!sl.length)return;const virg=/[,;:]$/.test(w);sl.forEach((z,k)=>ev.push({z,fi,tipo,wi,np:pal.length,k,ns:sl.length,fimPal:k===sl.length-1,fimFr:wi===pal.length-1&&k===sl.length-1,virg:virg&&k===sl.length-1,curta:w.replace(/[^a-zA-Zà-ú]/g,'').length<=2}))})});
if(!ev.length)return;
/* velocidade: cabe no tempo, sem passar de 14 s */
let dur=ev.reduce((a,e)=>a+.15+(e.z.on.length?.045:0)+(e.z.cod.length?.04:0)+(e.fimFr?.18:0)+(e.virg?.16:0),0);
const sp=Math.min(1.45,Math.max(.8,dur>14?dur/14:1)),t0=x.currentTime+.1;
/* fonte glotal: harmônicos com queda suave */
const N=40,re=new Float32Array(N),im=new Float32Array(N);for(let n=1;n<N;n++){im[n]=1/Math.pow(n,1.55)*(n>8?.8:1)}
const wave=x.createPeriodicWave(re,im);
const src=x.createOscillator();src.setPeriodicWave(wave);
const vib=x.createOscillator();vib.frequency.value=4.6+r()*.8;const vg=x.createGain();vg.gain.value=f0*.007;vib.connect(vg);vg.connect(src.frequency);
const vozG=x.createGain();vozG.gain.value=.0001;src.connect(vozG);
/* ruído de sopro e de consoantes */
const nb=x.createBuffer(1,x.sampleRate*1|0,x.sampleRate),nd=nb.getChannelData(0);for(let i=0;i<nd.length;i++)nd[i]=Math.random()*2-1;
const ns=x.createBufferSource();ns.buffer=nb;ns.loop=true;const sopro=x.createGain();sopro.gain.value=fem?.1:.05;ns.connect(sopro);
/* formantes em paralelo */
const BW=[85,110,170],GN=[1,.62,.34];
const F=[0,1,2].map(j=>{const b=x.createBiquadFilter();b.type='bandpass';b.frequency.value=VOG.a[j]*vt;b.Q.value=VOG.a[j]*vt/BW[j];const g=x.createGain();g.gain.value=GN[j];vozG.connect(b);sopro.connect(b);b.connect(g);return {b,g}});
const f4=x.createBiquadFilter();f4.type='bandpass';f4.frequency.value=3400*vt;f4.Q.value=9;const f4g=x.createGain();f4g.gain.value=.12;vozG.connect(f4);f4.connect(f4g);
const mix=x.createGain();mix.gain.value=1;F.forEach(o=>o.g.connect(mix));f4g.connect(mix);
/* telefone */
const hp=x.createBiquadFilter();hp.type='highpass';hp.frequency.value=300;const lp=x.createBiquadFilter();lp.type='lowpass';lp.frequency.value=3400;lp.Q.value=.6;
const ws=x.createWaveShaper();const cv=new Float32Array(257);for(let i=0;i<257;i++){const v=i/128-1;cv[i]=Math.tanh(1.6*v)/Math.tanh(1.6)}ws.curve=cv;
mix.connect(hp);hp.connect(ws);ws.connect(lp);lp.connect(out);
const fric=(t,d,hz,ga)=>{const n=x.createBufferSource();n.buffer=nb;n.loopStart=r()*.5;n.loop=true;const b=x.createBiquadFilter();b.type='bandpass';b.frequency.value=hz;b.Q.value=hz>4000?1.1:.9;const g=x.createGain();g.gain.setValueAtTime(.0001,t);g.gain.linearRampToValueAtTime(ga,t+Math.min(.01,d/3));g.gain.setTargetAtTime(.0001,t+d*.7,d*.15);n.connect(b);b.connect(g);g.connect(hp);n.start(t);n.stop(t+d+.05)};
let t=t0,prog=0;const tot=ev.length;
vozG.gain.setValueAtTime(.0001,t0);src.frequency.setValueAtTime(f0,t0);
ev.forEach((e,idx)=>{const z=e.z,ac=z.ac&&!e.curta,pg=idx/tot,decl=1.1-.24*(e.fi===0?pg:Math.min(1,pg));
let alvo=f0*(1.1-.2*(e.wi/Math.max(1,e.np-1||1)))*(ac?1.08:.97);
if(e.tipo==='q'&&e.wi>=e.np-2)alvo*=1+.16*((e.wi-(e.np-3))/2+(e.fimPal?.4:0));
if(e.tipo==='e')alvo*=1.07;if(e.virg)alvo*=1.05;if(e.fimFr&&e.tipo==='d')alvo*=.86;
alvo*=1+(r()-.5)*.03;
/* consoante de início */
let ts=t,dc=0;const c0=z.on.length?CON[z.on[z.on.length-1]]:null;
if(c0){dc=(c0.t==='p'?.03:c0.t==='f'?.075:.05)/sp;const ga=(c0.v?.2:.32);
if(c0.t==='p'){fric(ts,.02,c0.f,ga*.42);if(c0.v){vozG.gain.setTargetAtTime(.1,ts,.01)}else vozG.gain.setTargetAtTime(.0001,ts,.006)}
else if(c0.t==='f'){fric(ts,dc,c0.f,ga*.5);if(c0.v)vozG.gain.setTargetAtTime(.22,ts,.01);else vozG.gain.setTargetAtTime(.0001,ts,.008)}
else{vozG.gain.setTargetAtTime(.3,ts,.012);F.forEach((o,j)=>o.b.frequency.setTargetAtTime([280,c0.f,2500][j]*vt,ts,.012))}}
const vs=ts+dc;let v=VOG[(e.fimPal&&!ac&&(z.v==='e'||z.v==='o'))?(z.v==='e'?'i':'u'):(z.v==='e'&&z.ac?(r()<.5?'e':'é'):z.v==='o'&&z.ac?(r()<.4?'ó':'o'):z.v)]||VOG['@'];
const dv=((ac?.115:.085)+(e.fimFr?.07:0)+(e.fimPal?.015:0))*(.9+r()*.2)/sp;
const lv=(ac?.95:e.curta?.6:.78)*(e.fimFr?.8:1)*(.9+r()*.12);
src.frequency.setValueAtTime(src.frequency.value,vs-.005);
F.forEach((o,j)=>o.b.frequency.setTargetAtTime(v[j]*vt*(1+(r()-.5)*.03),vs,.022));
/* entonação: sobe/desce dentro da sílaba */
src.frequency.setTargetAtTime(alvo,vs,.025);if(e.fimFr&&e.tipo==='q')src.frequency.setTargetAtTime(alvo*1.18,vs+dv*.5,.06);
else if(e.fimFr)src.frequency.setTargetAtTime(alvo*.82,vs+dv*.45,.07);
vozG.gain.setTargetAtTime(lv,vs,.016);
let te=vs+dv;
/* coda: s, r, l, m, n */
if(z.cod.length){const c1=CON[z.cod[0]];const dd=.05/sp;if(c1&&c1.t==='f'){vozG.gain.setTargetAtTime(.0001,te-.01,.012);fric(te,dd,c1.f,.12)}else if(c1&&c1.t==='n'){F.forEach((o,j)=>o.b.frequency.setTargetAtTime([280,c1.f,2500][j]*vt,te,.012));vozG.gain.setTargetAtTime(lv*.5,te,.015)}else vozG.gain.setTargetAtTime(lv*.55,te,.02);te+=dd}
vozG.gain.setTargetAtTime(e.fimPal?.0001:lv*.35,te,.02);
t=te+(e.fimFr?(e.tipo==='d'?.34:.3):e.virg?.18:e.fimPal?.02:0)/Math.sqrt(sp);
if(e.fimFr||e.virg)vozG.gain.setTargetAtTime(.0001,te+.005,.03);prog=t});
src.start(t0);vib.start(t0);ns.start(t0);const fim=Math.min(prog+.4,t0+16);src.stop(fim);vib.stop(fim);ns.stop(fim)}
return {fala}})();
