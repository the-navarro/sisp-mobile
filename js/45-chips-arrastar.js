/* Botões flutuantes do Arquivo Reservado (Frei, álibi, sentidos, marcas): dá para arrastar para outro lugar da tela; a posição fica salva */
(function(){
const SEL='#espfchip,#espachip,#espschip,#espmchip',K=id=>'sisp_chip_'+id;
const rd=id=>{try{return JSON.parse(localStorage.getItem(K(id))||'null')}catch(e){return null}};
const wr=(id,v)=>{try{localStorage.setItem(K(id),JSON.stringify(v))}catch(e){}};
const put=(c,v)=>{const W=innerWidth,H=innerHeight,w=c.offsetWidth||50,h=c.offsetHeight||50;const x=Math.max(4,Math.min(W-w-4,v.x*W)),y=Math.max(4,Math.min(H-h-4,v.y*H));c.style.setProperty('left',x+'px','important');c.style.setProperty('top',y+'px','important');c.style.setProperty('right','auto','important');c.style.setProperty('bottom','auto','important')};
const apply=c=>{const v=rd(c.id);if(v)put(c,v);c.style.touchAction='none'};
new MutationObserver(m=>{m.forEach(r=>r.addedNodes.forEach(n=>{if(n.nodeType===1&&n.matches&&n.matches(SEL))apply(n)}))}).observe(document.body,{childList:true});
let d=null,moved=false;
document.addEventListener('pointerdown',e=>{const c=e.target.closest&&e.target.closest(SEL);if(!c)return;const r=c.getBoundingClientRect();d={c,dx:e.clientX-r.left,dy:e.clientY-r.top,x0:e.clientX,y0:e.clientY};moved=false},true);
document.addEventListener('pointermove',e=>{if(!d)return;if(!moved&&Math.hypot(e.clientX-d.x0,e.clientY-d.y0)<8)return;moved=true;const W=innerWidth,H=innerHeight,c=d.c,x=e.clientX-d.dx,y=e.clientY-d.dy;put(c,{x:x/W,y:y/H});e.preventDefault()},{passive:false,capture:true});
const end=()=>{if(!d)return;if(moved){const c=d.c,r=c.getBoundingClientRect();wr(c.id,{x:r.left/innerWidth,y:r.top/innerHeight})}d=null};
document.addEventListener('pointerup',end,true);document.addEventListener('pointercancel',end,true);
document.addEventListener('click',e=>{if(moved&&e.target.closest&&e.target.closest(SEL)){e.stopImmediatePropagation();e.preventDefault();moved=false}},true);
})();
