/* ===== Parceiros: retratos de Marcos Pimenta e Beatriz Faísca (neutro, animado; envergonhado = estado 3 do retrato) ===== */
(function(){const B=PDX.victor,F=PDX.marta,mk=(b,o)=>Object.assign({},b,o);
const bg=['#2a3a40','#0b151c'];
const M={fa:20.5,e:'wide',n:'button',b:'straight',bt:1.5,lp:.9,mw:1.05,sp:8.2,sk:'#e8c4a4',sh:'#c29c80',hc:'#B5471E',hs:'bald',bg,deco:'',out:'police',oc:'#2a4a8a',oc2:'#f2efe8',age:38,g:'shades',ex:['nosef','mB','cmouth','police','sheep'],ms:.5};
PDX.marcos=mk(B,M);
PDX.marcos_a=mk(B,Object.assign({},M,{ex:['nosef','mB','police','grin','blush'],ms:.5}));
const Bt={e:'up',n:'up',b:'arch',bt:.8,lp:1.4,mw:1.05,sp:8.4,sk:'#f0d2b8',sh:'#cfa88c',hc:'#C2561F',hs:'curly',bg,deco:'',out:'blazer',oc:'#b8935c',oc2:'#f2efe8',age:34,ex:['lipstick:#c01838','freckles','earr','lash','lanyard','sheep'],ms:.9};
PDX.beatriz=mk(F,Bt);
PDX.beatriz_a=mk(F,Object.assign({},Bt,{ex:['lipstick:#c01838','freckles','earr','lash','lanyard','smilec','blush'],ms:.9}));
['beatriz','beatriz_a'].forEach(k=>VFEM.add(k));
})();
const PTX={marcos:['marcos','marcos_a'],beatriz:['beatriz','beatriz_a']};
const ptAv=(id,sz,ex)=>ex==='a'?av(PTX[id][1],sz,0):ex==='e'?av(PTX[id][0],sz,3):av(PTX[id][0],sz,0);
