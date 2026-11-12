const save=()=>{chk();if(!C)return;META.p[C.id]=pct();try{localStorage.setItem(C.key,JSON.stringify(S));localStorage.setItem('sisp-meta',JSON.stringify(META))}catch(e){}};
const $=s=>document.querySelector(s);
function swp(el,rm){let x0=null,dx=0,mv=0;el.style.touchAction='pan-y';el.addEventListener('animationend',()=>{el.style.animation='none'},{once:true});
el.addEventListener('pointerdown',e=>{x0=e.clientX;dx=0;mv=0;el.style.animation='none';el.style.transition='none';try{el.setPointerCapture(e.pointerId)}catch(_){}});
el.addEventListener('pointermove',e=>{if(x0==null)return;dx=e.clientX-x0;mv=Math.max(mv,Math.abs(dx));el.style.transform='translateX('+dx+'px)';el.style.opacity=Math.max(.15,1-Math.abs(dx)/260)});
const up=()=>{if(x0==null)return;x0=null;el.style.transition='transform .22s ease,opacity .22s ease,margin .22s ease';if(Math.abs(dx)>70){el.style.transform='translateX('+(dx>0?'':'-')+'120%)';el.style.opacity=0;setTimeout(()=>{rm&&rm();el.remove()},230)}else{el.style.transform='';el.style.opacity=''}};
el.addEventListener('pointerup',up);el.addEventListener('pointercancel',up);
el.addEventListener('click',e=>{if(mv>8){e.stopImmediatePropagation();e.preventDefault()}},true)}
const tst=(t,tab)=>{const c=$('#tc'),e=document.createElement('div');e.className='toast';e.textContent=t;if(tab)e.onclick=()=>{e.remove();go(tab)};c.appendChild(e);swp(e);emz(e);getA('vib')&&navigator.vibrate&&navigator.vibrate(15);setTimeout(()=>e.remove(),tab?4600:2600);while(c.children.length>1)c.firstChild.remove()};
const ICO={timeline:'<circle cx="12" cy="12" r="9"/><path d="M12 7v5l3 2"/>',dossier:'<path d="M5 3h10l4 4v14H5z"/><path d="M9 12h6M9 16h6"/>',locations:'<path d="M12 21s7-6 7-12a7 7 0 10-14 0c0 6 7 12 7 12z"/><circle cx="12" cy="9" r="2.5"/>',interrogate:'<path d="M4 5h16v11H9l-5 4z"/>',mindmap:'<circle cx="6" cy="7" r="2"/><circle cx="18" cy="6" r="2"/><circle cx="12" cy="18" r="2"/><path d="M8 7l8-1M7 9l4 7M17 8l-4 8"/>',lab:'<path d="M9 3h6M10 3v6l-5 10h14L14 9V3"/>',solve:'<path d="M12 3v18M6 21h12M5 7h14M5 7l-3 7a3 3 0 006 0zM19 7l-3 7a3 3 0 006 0z"/>'};
const TABS=[['dossier','Dossiê'],['timeline','Cronologia'],['locations','Cenários'],['interrogate','Entrevistas'],['mindmap','Quadro'],['lab','Perícia'],['solve','Prisão']];
const pct=()=>Math.min(100,Math.round((S.inv.length/LO.reduce((n,l)=>n+l.c.length,0)*.2+S.an.length/TOTAL_C*.3+S.asked.length/TOTAL_Q*.2+S.ded.length/NT*.3)*100));
const stress=id=>SU.find(s=>s.id===id).q.filter(q=>q[2]&&S.asked.includes(q[0])).length;
const items=()=>[...S.inv.map(id=>({id,t:0})),...S.asked.filter(q=>TS[q]).map(id=>({id,t:1}))];
const label=i=>i.t?TS[i.id].t:CL[i.id].n;
const fn=s=>nm1(s.n);
const hm=m=>String(Math.floor(m/60)%24).padStart(2,'0')+':'+String(m%60).padStart(2,'0');
const fmt=t=>gx(t).replace(/\[(.*?)\]/,'<em>[$1]</em>');
const lg=(i,x,c)=>{S.tick++;S.clock+=c;S.log.unshift({t:hm(S.clock),i,x})};
const fchips=(k,o)=>`<div class=loc style="margin:6px 0">${o.map(([v,t])=>`<button class="chip ${S.f[k]===v?'on':''}" onclick="S.f.${k}='${v}';save();render()">${t}</button>`).join('')}</div>`;
const avail=()=>items().filter(i=>!(isLk(i.id)&&!i.t&&!S.dec)).map(i=>i.id);
const pend=()=>{const a=avail();return Object.keys(DD).filter(k=>!S.ded.includes(k)&&k.split('|').every(x=>a.includes(x)))};
const rem=id=>pend().filter(k=>k.split('|').includes(id)).length;
function callchk(){if(S.seen<4||S.call||V||S.tick-S.lc<3||S.asked.length<3||S.an.length<1||S.tab==='interrogate'||S.typing||T||AN||RM||ND)return;for(const id in EV)if(!S.asked.includes(id)&&C.EVW[id]()){S.call=id;S.callst=0;const s=SU.find(x=>x.id===EV[id][0]);S.notes.unshift({t:'📞 '+fn(s)+' ligou para você.',tab:'interrogate',r:0,h:hm(S.clock)});getA('vib')&&navigator.vibrate&&navigator.vibrate([200,100,200]);break}}
