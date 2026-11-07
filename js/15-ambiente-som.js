const TH={
menu:{dt:.46,mode:'pad',per:8,len:3.2,CH:[[73.4,[293.7,349.2,440,587.3]],[58.3,[233.1,293.7,349.2,466.2]],[49,[196,233.1,293.7,392]],[55,[220,277.2,329.6,440]]]},
c0:{dt:.4,mode:'pad',per:8,len:2.6,w:'sine',CH:[[65.4,[261.6,329.6,392,493.9]],[55,[220,261.6,329.6,392]],[73.4,[293.7,349.2,440,523.3]],[49,[246.9,293.7,349.2,392]]]},
c1:{dt:.62,mode:'pad',per:8,len:4.4,dark:1,CH:[[65.4,[261.6,311.1,392,466.2]],[51.9,[207.7,261.6,311.1,415.3]],[43.65,[174.6,207.7,261.6,349.2]],[49,[196,246.9,293.7,311.1]]]},
c2:{dt:.34,mode:'waltz',per:6,CH:[[110,[220,261.6,329.6]],[82.4,[207.7,246.9,329.6]],[73.4,[220,293.7,349.2]],[110,[220,261.6,329.6]]]},
c4:{dt:.4,mode:'arp',per:8,CH:[[73.4,[146.8,174.6,220,293.7]],[58.3,[116.5,146.8,174.6,233.1]],[87.3,[174.6,220,261.6,349.2]],[65.4,[130.8,164.8,196,261.6]]]},c3:{dt:.36,mode:'arp',per:8,CH:[[82.4,[164.8,196,246.9,329.6]],[65.4,[130.8,164.8,196,261.6]],[98,[196,246.9,293.7,392]],[73.4,[146.8,185,220,293.7]]]},
end:{dt:.8,mode:'pad',per:8,len:6,w:'sine',CH:[[110,[220,261.6,329.6,440]],[87.3,[174.6,220,261.6,349.2]],[65.4,[196,261.6,329.6,392]],[98,[196,246.9,293.7,392]]]}};
const AMBM={'c1:office':'rain,fire','c1:lab':'hum','c1:vault':'hum','c1:copa':'rain','c2:stage':'crowd','c2:back':'hum','c2:bar':'crowd','c2:office':'hum','c4:cold':'hum,drip','c4:bridge':'hum','c4:med':'hum','c4:suite':'wind','c4:deck':'crowd,wind','c3:tanks':'hum,drip','c3:ctrl':'hum','c3:terrace':'wind','c3:lab':'hum','c3:office':'','c0:hall':'hum','c0:office':'','c0:closet':''};
Object.assign(AU,{
tick(){const x=this.x;if(!x||x.state!=='running')return;const c=this.cfg||TH.menu;if(!this.m){if(this.nx<x.currentTime)this.nx=x.currentTime+.1;return}while(this.nx<x.currentTime+.4){this.bar(this.st++,this.nx);this.nx+=c.dt}},
bar(i,t){const c=this.cfg||TH.menu,k=Math.floor(i/c.per)%4,[r,A]=c.CH[k],p=i%c.per,m=this.mus,w=c.w||'triangle';
if(c.mode==='waltz'){const q=p%3;if(q===0)this.o(r,t,.9,'triangle',.5,m);else{this.o(A[0],t,.25,'sawtooth',.07,m);this.o(A[2],t,.25,'sawtooth',.06,m)}if(p===0&&Math.random()<.5)this.o(A[1]*2,t+.12,.3,'sine',.1,m);return}
if(c.mode==='arp'){const n=A[(p%4)];if(p%4===0)this.o(r,t,1.2,'triangle',.4,m);this.o(n,t,.7,'triangle',.2,m);if(p%2===1)this.o(n*2,t+.02,.3,'sine',.07,m);return}
if(p===0){this.o(r,t,c.len,w,.5,m);this.o(r*2,t,c.len,'sine',.18,m);this.o(r*3,t,c.len+.2,'sine',.08,m);if(c.dark)this.o(r*1.5,t,c.len,'sine',.1,m)}
if(p===4&&k%2===0)this.o(r,t,c.len/2.5,w,.25,m);
if([2,5,7].includes(p)&&Math.random()<.7)this.o(A[(i*7+p)%4]*(c.dark&&Math.random()<.15?1.06:1),t,c.len/2,'sine',.2,m)},
theme(k){if(this.th===k)return;this.th=k;this.cfg=TH[k]||TH.menu;this.st=0;if(this.x)this.nx=this.x.currentTime+.2},
noise(){if(this.nb)return this.nb;const x=this.x,b=x.createBuffer(1,x.sampleRate*2,x.sampleRate),d=b.getChannelData(0);for(let i=0;i<d.length;i++)d[i]=Math.random()*2-1;return this.nb=b},
amb(spec){if(this.ak===spec)return;this.ak=spec;(this.an||[]).forEach(f=>{try{f()}catch(e){}});this.an=[];if(!spec||!this.f)return;this.init();const x=this.x;if(!x)return;const g=x.createGain();g.gain.value=.35;g.connect(this.mg);this.an.push(()=>{g.disconnect()});
const nz=(type,fr,q,v,lfo)=>{const s=x.createBufferSource();s.buffer=this.noise();s.loop=true;const f=x.createBiquadFilter();f.type=type;f.frequency.value=fr;f.Q.value=q;const gg=x.createGain();gg.gain.value=v;s.connect(f);f.connect(gg);gg.connect(g);s.start();this.an.push(()=>{s.stop()});if(lfo){const o=x.createOscillator(),og=x.createGain();o.frequency.value=lfo;og.gain.value=v*.6;o.connect(og);og.connect(gg.gain);o.start();this.an.push(()=>{o.stop()})}return gg};
spec.split(',').forEach(a=>{
if(a==='rain'){nz('lowpass',900,.3,.045)}
if(a==='fire'){nz('lowpass',500,.5,.04,.7);const iv=setInterval(()=>{if(x.state!=='running'||!this.f)return;const s=x.createBufferSource();s.buffer=this.noise();const f=x.createBiquadFilter();f.type='bandpass';f.frequency.value=1400+Math.random()*900;const gg=x.createGain(),t=x.currentTime;gg.gain.setValueAtTime(.05*Math.random(),t);gg.gain.exponentialRampToValueAtTime(.0001,t+.05);s.connect(f);f.connect(gg);gg.connect(g);s.start(t,Math.random(),.06)},220);this.an.push(()=>clearInterval(iv))}
if(a==='hum'){const o=x.createOscillator(),o2=x.createOscillator(),gg=x.createGain();o.frequency.value=55;o2.frequency.value=110.6;o2.type='triangle';gg.gain.value=.025;o.connect(gg);o2.connect(gg);gg.connect(g);o.start();o2.start();this.an.push(()=>{o.stop();o2.stop()})}
if(a==='crowd'){nz('lowpass',420,.9,.03,.13)}
if(a==='wind'){nz('lowpass',380,.7,.04,.1)}
if(a==='drip'){const iv=setInterval(()=>{if(x.state!=='running'||!this.f)return;if(Math.random()<.4)this.o(1400+Math.random()*500,x.currentTime,.12,'sine',.05,g)},900);this.an.push(()=>clearInterval(iv))}})},
ambSync(){let k='';if(!this.f||MENU||!C)k='';else if(CUT&&CUT.k==='in')k=C.id==='c1'?'rain':'wind';else if(CUT)k='';else if(S.tab==='locations')k=AMBM[C.id+':'+S.loc]||'';this.amb(k)}});
{const _fx=AU.fx;AU.fx=function(k){if(!['car','door','camera','reveal','stamp','siren'].includes(k))return _fx.call(AU,k);if(!this.f)return;this.init();const x=this.x;if(!x||x.state!=='running')return;const t=x.currentTime;
if(k==='car'){const o=x.createOscillator(),g=x.createGain();o.type='sawtooth';o.frequency.setValueAtTime(70,t+.5);o.frequency.exponentialRampToValueAtTime(38,t+3);g.gain.setValueAtTime(.0001,t+.4);g.gain.exponentialRampToValueAtTime(.09,t+.9);g.gain.exponentialRampToValueAtTime(.0001,t+3.1);const f=x.createBiquadFilter();f.type='lowpass';f.frequency.value=260;o.connect(f);f.connect(g);g.connect(this.mg);o.start(t+.4);o.stop(t+3.2);this.o(180,t+3.1,.12,'square',.05);this.o(120,t+3.2,.2,'sine',.08)}
if(k==='door'){const n=x.sampleRate*.18,b=x.createBuffer(1,n,x.sampleRate),d=b.getChannelData(0);for(let q=0;q<n;q++)d[q]=(Math.random()*2-1)*Math.pow(1-q/n,3);const ns=x.createBufferSource();ns.buffer=b;const lf=x.createBiquadFilter();lf.type='lowpass';lf.frequency.value=700;const g=x.createGain();g.gain.value=.5;ns.connect(lf);lf.connect(g);g.connect(this.mg);ns.start(t);this.o(70,t,.12,'sine',.18);this.o(1800,t+.09,.02,'square',.025)}
if(k==='siren'){const o=x.createOscillator(),g=x.createGain(),f=x.createBiquadFilter(),l=x.createOscillator(),lg=x.createGain();o.type='triangle';f.type='lowpass';f.frequency.value=1800;o.frequency.value=820;l.frequency.value=1.1;lg.gain.value=160;l.connect(lg);lg.connect(o.frequency);g.gain.setValueAtTime(.0001,t);g.gain.exponentialRampToValueAtTime(.05,t+3);g.gain.setValueAtTime(.05,t+4.5);g.gain.exponentialRampToValueAtTime(.0001,t+6.4);o.connect(f);f.connect(g);g.connect(this.mg);o.start(t);l.start(t);o.stop(t+6.5);l.stop(t+6.5)}
if(k==='camera'){this.o(2400,t+.6,.03,'square',.08);this.o(1200,t+.65,.05,'square',.07);this.o(3200,t+.62,.12,'sine',.04)}
if(k==='reveal'){[196,233.1,293.7,370].forEach((f,i)=>this.o(f,t+i*.03,2.2,'sawtooth',.06));this.o(98,t,2.4,'sine',.3)}
if(k==='stamp'){this.o(80,t,.4,'sine',.5);this.o(200,t,.06,'square',.08)}};}

/* ===== CUTSCENES: início e final ===== */
