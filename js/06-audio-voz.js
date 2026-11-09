const VFEM=new Set(['marta','eleanor','clara','marina','beatriz','celia','helena','sofia','olivia','lidia','bianca','monica','nair']);
/* Vozes gravadas das ligações: assets/voz/<caso>_<ligação>.mp3, listadas em VOZ (casos/voz.js). Sem arquivo, usa a voz de reserva. */
window.VOZ=window.VOZ||{};
Object.assign(AU,{vo:null,vc:null,
vozArq(id){try{if(typeof C==='undefined'||!C||typeof S==='undefined'||!S||!S.call)return 0;const u=VOZ[C.id+'_'+S.call]||(VFEM.has(id)?VOZ.padraoF:VOZ.padraoM);if(!u)return 0;this.init();const x=this.x;if(!x||!this.mg)return 0;
const a=new Audio(u);a.preload='auto';a.volume=.9;this.vc=a;
const src=x.createMediaElementSource(a),hp=x.createBiquadFilter(),lp=x.createBiquadFilter();hp.type='highpass';hp.frequency.value=260;lp.type='lowpass';lp.frequency.value=3600;src.connect(hp);hp.connect(lp);lp.connect(this.mg);
const pr=a.play();if(pr&&pr.catch)pr.catch(()=>{});return 1}catch(e){return 0}},
vstop(){try{if(this.vc){this.vc.pause();this.vc.currentTime=0;this.vc=null}}catch(e){}try{introStop()}catch(e){}try{window.speechSynthesis&&speechSynthesis.cancel()}catch(e){}try{if(this.vo){this.vo.gain.cancelScheduledValues(0);this.vo.gain.value=0;this.vo.disconnect()}}catch(e){}this.vo=null},
voice(id,len){this.vstop();if(!this.f)return;
if(this.vozArq(id))return;
const ss=window.speechSynthesis;if(ss&&window.SpeechSynthesisUtterance&&typeof S!=='undefined'&&S&&S.call&&EV[S.call]){try{const t=gx(String(EV[S.call][1])).replace(/\[[^\]]*\]/g,' ').replace(/<[^>]*>/g,' ').replace(/[*_#~]/g,'').replace(/\s+/g,' ').trim(),u=new SpeechSynthesisUtterance(t),fem=VFEM.has(id),vs=(ss.getVoices()||[]).filter(v=>/^pt/i.test(v.lang)),pk=vs.find(v=>/pt-BR/i.test(v.lang)&&(fem?/maria|francisca|luciana|helo[ií]sa|fernanda|female|feminina/i.test(v.name):/daniel|felipe|ant[oô]nio|ricardo|male|masculin/i.test(v.name)))||vs.find(v=>/pt-BR/i.test(v.lang))||vs[0];u.lang='pt-BR';if(pk)u.voice=pk;u.pitch=fem?1.2:.65;u.rate=1.02;u.volume=.85;ss.cancel();ss.speak(u);return}catch(e){}}
this.init();const x=this.x;if(!x||!this.mg)return;
let h=0;for(const ch of id)h=(h*31+ch.charCodeAt(0))>>>0;const r=()=>{h=(h*1664525+1013904223)>>>0;return (h>>>8)/16777216};
const fem=VFEM.has(id),base=(fem?275:100)*(.93+r()*.14),fm=fem?1.22:.94,dur=Math.min(8,Math.max(2.6,(len||60)*.05)),t0=x.currentTime+.08,end=t0+dur;
const out=x.createGain();out.gain.value=.5;out.connect(this.mg);this.vo=out;
const lp=x.createBiquadFilter();lp.type='lowpass';lp.frequency.value=fem?3000:2100;lp.Q.value=.4;lp.connect(out);
const vg=x.createGain();vg.gain.value=.0001;vg.connect(lp);
const o=x.createOscillator();o.type='sawtooth';o.frequency.value=base;
const lf=x.createOscillator();lf.frequency.value=4.8+r();const lg=x.createGain();lg.gain.value=base*.008;lf.connect(lg);lg.connect(o.frequency);
const bo=x.createBiquadFilter();bo.type='lowpass';bo.frequency.value=fem?900:600;const bg=x.createGain();bg.gain.value=.7;o.connect(bo);bo.connect(bg);bg.connect(vg);
const F=[[4,1],[5,.7],[6,.35]].map(([q,k])=>{const b=x.createBiquadFilter();b.type='bandpass';b.Q.value=q;b.frequency.value=700;const g=x.createGain();g.gain.value=k;o.connect(b);b.connect(g);g.connect(vg);return b});
const nb=x.createBuffer(1,x.sampleRate*.2|0,x.sampleRate),nd=nb.getChannelData(0);for(let i=0;i<nd.length;i++)nd[i]=Math.random()*2-1;
const V=[[750,1200,2500],[450,2000,2600],[300,2300,3000],[450,850,2500],[330,800,2400],[560,1750,2500],[650,1050,2450]];
const setF=(v,t)=>F.forEach((b,j)=>b.frequency.setTargetAtTime(v[j]*fm*(1+(r()-.5)*.05),t,.035));
const fric=(t,d)=>{const n=x.createBufferSource();n.buffer=nb;const hp=x.createBiquadFilter();hp.type='highpass';hp.frequency.value=fem?4200:3200;const g=x.createGain();g.gain.setValueAtTime(.0001,t);g.gain.linearRampToValueAtTime(.05,t+d*.3);g.gain.linearRampToValueAtTime(.0001,t+d);n.connect(hp);hp.connect(g);g.connect(out);n.start(t);n.stop(t+d+.02)};
let t=t0,first=1;vg.gain.setValueAtTime(.0001,t0);o.frequency.setValueAtTime(base,t0);
while(t<end-.2){const ns=4+((r()*5)|0),q=r()<.22;let p=t;
for(let i=0;i<ns&&p<end;i++){const k=ns>1?i/(ns-1):0,last=i===ns-1,sd=(.12+r()*.09)*(last?1.55:1),v=V[(r()*V.length)|0];
let ct=1.03+.05*Math.sin(Math.PI*Math.min(1,k*1.2))-(q?-.09*k*k:.1*k)+(r()-.5)*.02;
o.frequency.setTargetAtTime(base*ct,p,.05);setF(v,p);
const lv=(last?.5:.75)*(.85+r()*.15);
if(!first&&i>0&&r()<.3){vg.gain.setTargetAtTime(.1,p-.02,.012);fric(p-.02,.06);vg.gain.setTargetAtTime(lv,p+.05,.025)}else vg.gain.setTargetAtTime(lv,p,.03);
vg.gain.setTargetAtTime(lv*.55,p+sd*.62,.04);first=0;p+=sd}
vg.gain.setTargetAtTime(.0001,p,.07);t=p+.22+r()*.28}
o.start(t0);lf.start(t0);const stp=Math.min(end+.3,t+.4);o.stop(stp);lf.stop(stp)}});
