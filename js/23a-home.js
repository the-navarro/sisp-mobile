// Tela inicial em camadas: profundidade (parallax), névoa, luz do poste, garoa com
// respingos na rua, raios e uma gota ocasional escorrendo no "vidro" da tela.
// As imagens ficam em assets/home/ (uma por camada, recortada no tamanho do conteúdo).
// O estado da animação fica aqui fora, para não reiniciar quando render() redesenha a
// tela. Respeita "reduzir animações" (a tela fica parada).
// HOMEL: [camada, profundidade do parallax, esquerda, topo, largura, altura] (em % do palco)
const HOMEL=[
['ceu',0.05,0.0,0.0,100.0,100.0],
['distantes',0.15,0.0,34.753,100.0,32.222],
['meio',0.3,0.0,33.58,100.0,33.395],
['proximos',0.55,0.0,23.086,100.0,43.889],
['rua',0.7,0.0,66.975,100.0,33.025],
['luz',0.8,15.648,41.79,30.926,26.975],
['poste',0.8,27.778,43.704,12.778,23.827],
['inv',0.85,34.074,49.63,9.259,18.148]];
// Garoa: n=quantidade, vmin/vs=velocidade, lmin/ls=comprimento, wk/ak=espessura e brilho,
// slant=inclinação, rip=chance de respingo na rua, flash=intervalo entre raios (s).
const HG={n:2.4,vmin:170,vs:100,lmin:7,ls:7,wk:.6,ak:1,slant:.12,rip:.5,flash:[16,26]};
const HM={raf:0,hero:null,st:null,cv:null,gv:null,px:0,py:0,tx:0,ty:0,t:0,last:0,d:null,rip:[],nf:7,seed:11,sw:0,sh:0,hw:0,hh:0,ox:0,oy:0,els:[],luz:null,fx:null,mask:null,g:null,ng:4};
const hmR=()=>{HM.seed=HM.seed*16807%2147483647;return HM.seed/2147483647};
const hmReduz=()=>document.body.classList.contains('rm')||(window.matchMedia&&matchMedia('(prefers-reduced-motion: reduce)').matches);
function homeArt(){
const L=k=>{const a=HOMEL.find(x=>x[0]===k);return `<img class=hl data-d=${a[1]} alt="" draggable=false src="assets/home/${a[0]}.webp" style="left:${a[2]}%;top:${a[3]}%;width:${a[4]}%;height:${a[5]}%">`};
return `<div class=hstage aria-hidden=true>${L('ceu')}${L('distantes')}${L('meio')}<div class="hfog f1"></div>${L('proximos')}<div class="hfog f2"></div><div class=hflash></div>${L('rua')}${L('luz')}${L('poste')}${L('inv')}</div><canvas class=hrain aria-hidden=true></canvas><div class=hvig></div>`}
// canvas do vidro: fica por cima do título, para a gota passar na frente de tudo
function homeGlass(){return '<canvas class=hglass aria-hidden=true></canvas>'}
function homeGeom(){const h=HM.hero,r=h.getBoundingClientRect(),hw=h.clientWidth||r.width,hh=h.clientHeight||r.height;
if(!hw||!hh)return;HM.hw=hw;HM.hh=hh;
h.style.setProperty('--hs',Math.min(1,Math.max(.78,hh/560)).toFixed(3));
const k=1.06,sw=Math.max(hw,hh/1.5)*k,sh=sw*1.5,lampY=Math.max(150,hh*.38),oy=Math.min(0,Math.max(hh-sh,lampY-sh*.452)),ox=(hw-sw)/2;
HM.sw=sw;HM.sh=sh;HM.ox=ox;HM.oy=oy;
const s=HM.st.style;s.width=sw+'px';s.height=sh+'px';s.left=ox+'px';s.top=oy+'px';
const dpr=Math.min(window.devicePixelRatio||1,2);for(const cv of [HM.cv,HM.gv]){cv.width=Math.round(hw*dpr);cv.height=Math.round(hh*dpr);cv.dataset.dpr=dpr}
HM.d=Array.from({length:Math.round(hw*hh/(430*600)*170*HG.n)},()=>hmDrop(true));HM.g=null}
function hmDrop(first){const z=[.4,.7,1][Math.floor(hmR()*3)],streetTop=HM.oy+HM.sh*.67,land=Math.min(HM.hh,streetTop+(HM.hh-streetTop)*(.1+.9*z*hmR()));
return{x:hmR()*(HM.hw+120)-30,y:first?hmR()*land-30:-20-hmR()*60,z,v:(HG.vmin+hmR()*HG.vs)*z+120,l:(HG.lmin+hmR()*HG.ls)*z,a:(.12+.45*z*hmR()+.08)*HG.ak,w:(.5+.9*z)*HG.wk,land}}
// máscara da luz do poste: a chuva fica mais clara e dourada onde há luz
function hmMask(){const a=HOMEL.find(x=>x[0]==='luz'),im=new Image();im.onload=()=>{const W=108,H=162,cv=document.createElement('canvas');cv.width=W;cv.height=H;const x=cv.getContext('2d',{willReadFrequently:true});x.drawImage(im,a[2]/100*W,a[3]/100*H,a[4]/100*W,a[5]/100*H);const d=x.getImageData(0,0,W,H).data;let mx=1;for(let k=3;k<d.length;k+=4)if(d[k]>mx)mx=d[k];HM.mask=(fx,fy)=>{const i=Math.floor(fx*W),j=Math.floor(fy*H);return i<0||j<0||i>=W||j>=H?0:Math.min(1,d[(j*W+i)*4+3]/mx*1.15)}};im.src='assets/home/luz.webp'}
function homeDraw(dt){const cv=HM.cv,c=cv.getContext('2d'),dpr=+cv.dataset.dpr||1;c.setTransform(dpr,0,0,dpr,0,0);c.clearRect(0,0,HM.hw,HM.hh);c.lineCap='round';
const sl=HG.slant,lit=(x,y)=>HM.mask?HM.mask((x-HM.ox)/HM.sw,(y-HM.oy)/HM.sh):0;
for(const d of HM.d){d.y+=d.v*dt;d.x+=-sl*d.v*dt;
if(d.y>=d.land){if(d.z>.5&&hmR()<HG.rip&&HM.rip.length<20)HM.rip.push({x:d.x,y:d.land,t:0,r:3+d.z*9});Object.assign(d,hmDrop(false));continue}
const li=lit(d.x,d.y),A=d.a*(1+li*1.2);if(A<.015)continue;
c.strokeStyle=(li>.12?'rgba(255,226,176,':'rgba(185,205,228,')+Math.min(.95,A)+')';c.lineWidth=d.w;c.beginPath();c.moveTo(d.x,d.y);c.lineTo(d.x+sl*d.l,d.y-d.l);c.stroke()}
for(let i=HM.rip.length-1;i>=0;i--){const q=HM.rip[i];q.t+=dt;if(q.t>.8){HM.rip.splice(i,1);continue}const p=q.t/.8;c.strokeStyle='rgba(170,195,215,'+.45*(1-p)+')';c.lineWidth=.8;c.beginPath();c.ellipse(q.x,q.y,q.r*p+1,(q.r*p+1)*.32,0,0,6.3);c.stroke()}}
// uma única gota no vidro: desce aos trancos (anda, para, anda), deixa um rastro molhado e some; depois passa um tempo sem nenhuma
function hmGotaNova(){const r=5.5+hmR()*4;HM.g={x:HM.hw*(.14+.72*hmR()),y:-r*2,r,mv:1,pt:.35+hmR()*.35,sp:150+hmR()*80,tr:[],out:0,fade:1,w:hmR()*6}}
function homeGlassDraw(dt){const cv=HM.gv,c=cv.getContext('2d'),dpr=+cv.dataset.dpr||1;c.setTransform(dpr,0,0,dpr,0,0);c.clearRect(0,0,HM.hw,HM.hh);
const g=HM.g;if(!g){HM.ng-=dt;if(HM.ng<0)hmGotaNova();return}
g.pt-=dt;if(g.pt<0){g.mv=!g.mv;g.pt=g.mv?.35+hmR()*.4:.3+hmR()*.6;g.sp=150+hmR()*90}
if(g.mv&&!g.out){g.y+=g.sp*dt;g.w+=dt*3;g.x+=Math.sin(g.w)*.12;g.tr.push([g.x,g.y]);if(g.tr.length>140)g.tr.shift()}
if(g.y>HM.hh+g.r*2)g.out=1;if(g.out){g.fade-=dt*.8;if(g.fade<=0){HM.g=null;HM.ng=14+hmR()*12;return}}
const f=g.fade;if(g.tr.length>1){c.lineCap='round';c.strokeStyle='rgba(200,220,240,'+.14*f+')';c.lineWidth=Math.max(.8,g.r*.38);c.beginPath();g.tr.forEach((p,i)=>i?c.lineTo(p[0],p[1]):c.moveTo(p[0],p[1]));c.stroke()}
if(!g.out){const r=g.r,gr=c.createRadialGradient(g.x-r*.3,g.y-r*.35,r*.1,g.x,g.y,r*1.15);gr.addColorStop(0,'rgba(210,225,240,.10)');gr.addColorStop(.7,'rgba(150,180,205,.24)');gr.addColorStop(1,'rgba(235,245,255,.6)');
c.fillStyle=gr;c.beginPath();c.ellipse(g.x,g.y,r*.92,r*1.2,0,0,6.3);c.fill();c.fillStyle='rgba(255,255,255,.8)';c.beginPath();c.ellipse(g.x-r*.35,g.y-r*.45,r*.22,r*.14,-.6,0,6.3);c.fill()}}
function homeLoop(n){if(!HM.hero||!HM.hero.isConnected){HM.raf=0;return}
const dt=Math.min(.05,(n-HM.last)/1000);HM.last=n;HM.t+=dt;
HM.px+=(HM.tx-HM.px)*Math.min(1,dt*3);HM.py+=(HM.ty-HM.py)*Math.min(1,dt*3);
const ix=Math.sin(HM.t*.21)*.85+Math.sin(HM.t*.07)*.4,iy=Math.sin(HM.t*.17+1)*.35,X=HM.px*.6+ix,Y=HM.py*.4+iy,A=Math.min(HM.sw*.022,13);
for(const e of HM.els){const d=+e.dataset.d;e.style.transform='translate3d('+(-X*A*d).toFixed(2)+'px,'+(-Y*A*d*.6).toFixed(2)+'px,0)'}
if(HM.luz){const s=Math.sin(HM.t*1.7)*.05+Math.sin(HM.t*5.1)*.025,st=Math.sin(HM.t*.9)>.985?.35:0;HM.luz.style.opacity=Math.max(.35,.9+s-st)}
HM.nf-=dt;if(HM.nf<0){HM.fx.classList.remove('on');void HM.fx.offsetWidth;HM.fx.classList.add('on');HM.nf=HG.flash[0]+hmR()*(HG.flash[1]-HG.flash[0])}
homeDraw(dt);homeGlassDraw(dt);HM.raf=requestAnimationFrame(homeLoop)}
function homeSync(){const h=document.querySelector('.hero');
if(!h||!h.querySelector('.hstage')){HM.hero=null;return}
if(h===HM.hero&&HM.raf)return;
HM.hero=h;HM.st=h.querySelector('.hstage');HM.cv=h.querySelector('.hrain');HM.gv=h.querySelector('.hglass');HM.els=[...h.querySelectorAll('.hl')];HM.luz=h.querySelector('img[src$="luz.webp"]');HM.fx=h.querySelector('.hflash');
homeGeom();if(!HM.mask)hmMask();
if(!h.dataset.hb){h.dataset.hb=1;h.addEventListener('pointermove',e=>{const r=h.getBoundingClientRect();HM.tx=(e.clientX-r.left)/r.width*2-1;HM.ty=(e.clientY-r.top)/r.height*2-1});h.addEventListener('pointerleave',()=>{HM.tx=HM.ty=0});
if(window.ResizeObserver)new ResizeObserver(()=>{if(HM.hero===h)homeGeom()}).observe(h)}
if(hmReduz()){homeDraw(0);return}
if(!HM.raf){HM.last=performance.now();HM.raf=requestAnimationFrame(homeLoop)}}
{const _rh=render;render=function(){_rh.apply(this,arguments);try{homeSync()}catch(e){}}}
