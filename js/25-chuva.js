// Chuva da janela do escritório (caso 1): gotas em 3 profundidades, respingos no
// parapeito, gotas escorrendo no vidro e clarões de raio, desenhadas num canvas.
// O estado fica aqui fora (CHU) para a chuva não reiniciar quando render() redesenha a tela.
const CHU={cv:null,raf:0,last:0,d:null,g:null,s:[],fl:0,nf:4,seed:7,W:92,H:70};
const chuR=()=>{CHU.seed=CHU.seed*16807%2147483647;return CHU.seed/2147483647};
const chuReduz=()=>document.body.classList.contains('rm')||(window.matchMedia&&matchMedia('(prefers-reduced-motion: reduce)').matches);
function chuInit(){const W=CHU.W,H=CHU.H,R=chuR;
CHU.d=Array.from({length:75},()=>{const z=[.4,.7,1][Math.floor(R()*3)];return{x:R()*(W+30)-5,y:R()*(H+20)-20,z,v:(70+R()*50)*z+30,l:(5+R()*6)*z,a:.14+.5*z*R()+.1,w:.4+.7*z}});
CHU.g=Array.from({length:7},()=>({x:6+R()*(W-12),y:R()*H*.6,t:R()*4,st:R()*3,tr:[]}))}
function chuDraw(dt){const cv=CHU.cv,c=cv.getContext('2d'),W=CHU.W,H=CHU.H,R=chuR,u=cv.width/W;
c.setTransform(1,0,0,1,0,0);c.clearRect(0,0,cv.width,cv.height);c.setTransform(u,0,0,u,0,0);c.lineCap='round';
for(const d of CHU.d){d.y+=d.v*dt;d.x+=-.27*d.v*dt;
if(d.y>H){if(d.z>.65&&CHU.s.length<40)for(let i=0;i<3;i++)CHU.s.push({x:d.x,y:H-.2,vx:(R()-.5)*14,vy:-(8+R()*12),t:0});d.y=-d.l-R()*20;d.x=R()*(W+30)-5}
c.strokeStyle='rgba(190,210,235,'+d.a+')';c.lineWidth=d.w;c.beginPath();c.moveTo(d.x,d.y);c.lineTo(d.x+.27*d.l,d.y-d.l);c.stroke()}
for(let i=CHU.s.length-1;i>=0;i--){const s=CHU.s[i];s.t+=dt;s.vy+=70*dt;s.x+=s.vx*dt;s.y+=s.vy*dt;if(s.t>.28){CHU.s.splice(i,1);continue}c.fillStyle='rgba(205,222,245,'+.7*(1-s.t/.28)+')';c.fillRect(s.x,s.y,.7,.7)}
for(const q of CHU.g){q.t+=dt;if(q.t>q.st){q.y+=(14+q.st*4)*dt;if(q.t>q.st+.7){q.t=0;q.st=.4+R()*2.2}}
q.tr.push([q.x,q.y]);if(q.tr.length>24)q.tr.shift();
c.strokeStyle='rgba(215,228,247,.16)';c.lineWidth=.55;c.beginPath();q.tr.forEach((p,i)=>i?c.lineTo(p[0],p[1]):c.moveTo(p[0],p[1]));c.stroke();
c.fillStyle='rgba(222,234,250,.62)';c.beginPath();c.ellipse(q.x,q.y,1.15,1.65,0,0,6.3);c.fill();c.fillStyle='rgba(255,255,255,.8)';c.fillRect(q.x-.6,q.y-1,.5,.7);
if(q.y>H+4){q.y=-4;q.tr=[];q.x=6+R()*(W-12)}}
CHU.nf-=dt;if(CHU.nf<0){CHU.fl=1;CHU.nf=5+R()*5}
if(CHU.fl>0){c.fillStyle='rgba(232,240,255,'+.5*CHU.fl*(R()>.35?1:.2)+')';c.fillRect(0,0,W,H);CHU.fl-=dt*3.5}}
function chuLoop(n){const cv=CHU.cv;if(!cv||!cv.isConnected){CHU.raf=0;return}
const dt=Math.min(.05,(n-CHU.last)/1000);CHU.last=n;chuDraw(dt);CHU.raf=requestAnimationFrame(chuLoop)}
function chuSync(){const cv=document.querySelector('canvas.rainc');
if(!cv){CHU.cv=null;return}
if(cv===CHU.cv&&CHU.raf)return;
CHU.cv=cv;CHU.W=+cv.dataset.w||92;CHU.H=+cv.dataset.h||70;
const r=cv.getBoundingClientRect(),dpr=Math.min(window.devicePixelRatio||1,2);
cv.width=Math.max(1,Math.round((r.width||CHU.W)*dpr));cv.height=Math.max(1,Math.round((r.height||CHU.H)*dpr));
if(!CHU.d)chuInit();
if(chuReduz()){chuDraw(0);return}
if(!CHU.raf){CHU.last=performance.now();CHU.raf=requestAnimationFrame(chuLoop)}}
{const _rc=render;render=function(){_rc.apply(this,arguments);try{chuSync()}catch(e){}}}
