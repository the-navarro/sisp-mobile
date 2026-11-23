/* ===== Parceiros: retratos de Marcos Pimenta e Beatriz Faísca (neutro, animado; envergonhado = estado 3 do retrato) ===== */
(function(){const B=PDX.victor,F=PDX.marta,mk=(b,o)=>Object.assign({},b,o);
const bg=['#2a3a40','#0b151c'];
const M={fa:20.5,e:'wide',n:'button',b:'straight',bt:1.5,lp:.9,mw:1.05,sp:8.2,sk:'#e8c4a4',sh:'#c29c80',hc:'#B5471E',hs:'bald',bg,deco:'',out:'police',oc:'#2a4a8a',oc2:'#f2efe8',age:38,g:'shades',ex:['nosef','mB','cmouth','police','sheep'],ms:.5};
PDX.ptmarcos=mk(B,M);
PDX.ptmarcos_a=mk(B,Object.assign({},M,{ex:['nosef','mB','police','grin','blush'],ms:.5}));
const Bt={fa:17.5,jw:70.5,jx:10.5,e:'up',n:'button',b:'arch',bt:.7,lp:1.3,mw:1,sp:8,sk:'#d1a07a',sh:'#a87c5a',hc:'#2a1c16',hs:'wavybang',bg,deco:'',out:'tee',oc:'#f4f2ee',oc2:'#d8d4cc',ic:'#2e1d14',age:34,ex:['hoop:#cfd3d9','lash','smile'],ms:.8};
PDX.ptbeatriz=mk(F,Bt);
PDX.ptbeatriz_a=mk(F,Object.assign({},Bt,{ex:['hoop:#cfd3d9','lash','smile','blush'],ms:.9}));
['ptbeatriz','ptbeatriz_a'].forEach(k=>VFEM.add(k));
})();
const PTX={marcos:['ptmarcos','ptmarcos_a'],beatriz:['ptbeatriz','ptbeatriz_a']};
const ptAv=(id,sz,ex)=>ex==='a'?av(PTX[id][1],sz,0):ex==='e'?av(PTX[id][0],sz,3):av(PTX[id][0],sz,0);
