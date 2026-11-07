const AU={m:META.mus!==undefined?META.mus:(META.snd===undefined||META.snd===2?1:0),f:META.fx!==undefined?META.fx:(META.snd===undefined||META.snd>=1?1:0),x:null,set(k){this[k]=this[k]?0:1;META.mus=this.m;META.fx=this.f;msave();this.init();if(this.mus)this.mus.gain.value=this.m?.15:0;if(!this.f){this.ring(0);this.hb(0)}render()},
init(){try{if(!this.x){const x=this.x=new(window.AudioContext||window.webkitAudioContext)();this.mg=x.createGain();this.mg.gain.value=.9;this.mg.connect(x.destination);this.mus=x.createGain();this.mus.gain.value=this.m?.15:0;this.mus.connect(this.mg);this.nx=x.currentTime+.2;this.st=0;setInterval(()=>this.tick(),120)}if(this.x.state==='suspended')this.x.resume()}catch(e){}},
// som suave: seno com varredura de altura, ataque de 6 ms e filtro passa-baixa (sem as arestas da onda quadrada)
s(f0,f1,t,d,v,ty,lp){const x=this.x,o=x.createOscillator(),g=x.createGain(),l=x.createBiquadFilter();o.type=ty||'sine';o.frequency.setValueAtTime(f0,t);o.frequency.exponentialRampToValueAtTime(f1,t+d);l.type='lowpass';l.frequency.value=lp||3200;g.gain.setValueAtTime(.0001,t);g.gain.exponentialRampToValueAtTime(v,t+.006);g.gain.exponentialRampToValueAtTime(.0001,t+d);o.connect(l);l.connect(g);g.connect(this.mg);o.start(t);o.stop(t+d+.03)},
o(f,t,d,ty,v,dst,h){const x=this.x,o=x.createOscillator(),g=x.createGain();o.type=ty;o.frequency.value=f;g.gain.setValueAtTime(.0001,t);g.gain.exponentialRampToValueAtTime(v,t+.02);if(h)g.gain.setValueAtTime(v,t+d-.05);g.gain.exponentialRampToValueAtTime(.0001,t+d);o.connect(g);g.connect(dst||this.mg);o.start(t);o.stop(t+d+.05)},
tick(){const x=this.x;if(!x||x.state!=='running')return;if(!this.m){if(this.nx<x.currentTime)this.nx=x.currentTime+.1;return}while(this.nx<x.currentTime+.4){this.bar(this.st++,this.nx);this.nx+=.43}},
bar(i,t){const CH=[[73.4,[293.7,349.2,440,587.3]],[58.3,[233.1,293.7,349.2,466.2]],[49,[196,233.1,293.7,392]],[55,[220,277.2,329.6,440]]],k=Math.floor(i/8)%4,r=CH[k][0],A=CH[k][1],p=i%8,m=this.mus;
if(p===0){this.o(r,t,3.2,'triangle',.5,m);this.o(r*2,t,3.2,'sine',.18,m);this.o(r*3,t,3.4,'sine',.08,m)}
if(p===4&&k%2===0)this.o(r,t,1.2,'triangle',.25,m);
if([2,5,7].includes(p)&&Math.random()<.75)this.o(A[(i*7+p)%4],t,1.6,'sine',.2,m)},
fx(k){if(getA('cc')&&k!=='tick'&&k!=='pick'&&k!=='err')tst('🔊 '+({grab:'clique: prova coletada',chime:'som de confirmação',thud:'baque do veredito'}[k]||'efeito sonoro'));if(!this.f)return;
// um só som por toque: o clique global e a própria ação do botão chamavam 'tick' juntos (som duplicado e sobreposto)
if(k==='tick'||k==='pick'){const n=performance.now();if(k==='tick'&&n-(this.ls||0)<150)return;this.ls=n}
this.init();const x=this.x;if(!x||x.state!=='running')return;const t=x.currentTime;
if(k==='tick')this.s(560,400,t,.09,.025);
if(k==='pick'){this.s(440,436,t,.12,.024);this.s(880,872,t,.08,.005);this.s(587,583,t+.075,.16,.024);this.s(1174,1166,t+.075,.1,.005)}
if(k==='grab'){this.o(220,t,.08,'square',.07);this.o(440,t+.05,.1,'square',.05)}
if(k==='chime')[660,880,1320].forEach((f,i)=>this.o(f,t+i*.09,.5,'sine',.14));
if(k==='thud')this.o(70,t,.5,'sine',.5);
if(k==='err')this.o(150,t,.3,'sawtooth',.1)},
ring(on){if(on&&!this.rt){this.init();const b=()=>{const x=this.x;if(!x||x.state!=='running')return;const t=x.currentTime;[0,.55].forEach(d=>{this.o(440,t+d,.4,'sine',.16,null,1);this.o(480,t+d,.4,'sine',.16,null,1)})};b();this.rt=setInterval(b,2600)}else if(!on&&this.rt){clearInterval(this.rt);this.rt=0}},
hb(b){if(!b||!this.f){if(this.ht){clearTimeout(this.ht);this.ht=0;this.hv=''}return}const k=b[0]+'/'+b[1];if(this.hv===k&&this.ht)return;clearTimeout(this.ht);this.hv=k;this.init();const lp=()=>{if(this.x&&this.x.state==='running')this.o(880+b[1]*140,this.x.currentTime,.09,'sine',.1);this.ht=setTimeout(lp,60000/b[0])};lp()},
sync(){const on=!MENU&&C;this.ring(!!(on&&S.call&&!S.callst&&this.f));this.hb(on&&S.tab==='interrogate'&&CHO&&!S.call&&!V&&!RM&&!ND&&S.seen>=4?HBV:0)}};

