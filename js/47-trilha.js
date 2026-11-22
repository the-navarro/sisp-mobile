/* Trilha: um caminho que mistura casos comuns, rápidos, linha do tempo e Arquivo Reservado (premium), com os premium em intervalos maiores.
   O progresso da trilha é o progresso dos próprios casos: concluir um caso por qualquer aba também avança a trilha. */
(function(){
const TR=[['c','c0'],['r','r1'],['c','c1'],['t','t1'],['r','r2'],['e','e1'],['c','c2'],['t','t2'],['r','r3'],['c','c3'],['e','e2'],['t','t3'],['c','c4'],['r','r4'],['e','e3'],['c','c5'],['t','t4'],['c','c6'],['e','e4']];
const CH=[['Capítulo 1','Primeiros passos',0,5],['Capítulo 2','Ganhando ritmo',6,10],['Capítulo 3','Casos difíceis',11,14],['Capítulo 4','O arquivo final',15,18]];
const LB={c:'CASO COMUM',r:'CASO RÁPIDO',t:'LINHA DO TEMPO',e:'ARQUIVO RESERVADO'};
const IC={c:'<svg viewBox="0 0 24 24"><circle cx="10" cy="10" r="6"/><path d="M15 15l5 5"/></svg>',r:'<svg viewBox="0 0 24 24"><path d="M13 3L5 14h6l-1 7 8-11h-6z"/></svg>',t:'<svg viewBox="0 0 24 24"><circle cx="12" cy="12" r="8"/><path d="M12 7v5l3 2"/></svg>',e:'<svg viewBox="0 0 24 24"><path d="M12 3l2.6 5.6 6.1.7-4.5 4.2 1.2 6L12 16.6 6.6 19.5l1.2-6L3.3 9.3l6.1-.7z"/></svg>'};
const solo=()=>typeof amMode==='function'?amMode()==='solo':true;
function info(k,id){
 if(k==='c'){const c=CASES.find(x=>x.id===id);if(!c)return null;const d=META.done[id],p=META.p[id]||0;return{k,id,t:c.n,sub:c.place,img:'assets/casos/mini_'+id+'.webp'+IMV(id),done:!!d,p,nota:META.rk&&META.rk[id],lab:c.tut?'TREINAMENTO':LB.c}}
 if(k==='e'){const c=(window.ESP||[]).find(x=>x.id===id);if(!c)return null;const d=META.done[id],p=META.p[id]||0;return{k,id,t:c.n,sub:c.place,img:'assets/casos/mini_'+id+'.webp'+IMV(id),done:!!d,p,nota:META.rk&&META.rk[id],lab:LB.e}}
 if(k==='r'){const c=RQC.find(x=>x.id===id);if(!c)return null;const d=RQM().done[id],p=RQM().prog[id];return{k,id,t:c.titulo,sub:c.cenario.local.split(',')[0],img:'assets/casos/cartao_'+id+'.webp'+IMV(id),done:!!d,p:p&&(p.asked.length||p.seen)?1:0,stars:d,lab:LB.r}}
 if(k==='t'){const c=TLC.find(x=>x.id===id);if(!c)return null;const d=TLM().done[id],p=TLM().prog[id];return{k,id,t:c.titulo,sub:c.cenario.local.split(',')[0],img:'assets/casos/cartao_'+id+'.webp'+IMV(id),done:!!d,p:p&&(p.conf||p.hints)?1:0,stars:d,lab:LB.t}}
 return null}
window.trNodes=()=>{const L=TR.map(([k,id])=>info(k,id)).filter(Boolean);const cur=L.findIndex(n=>!n.done);L.forEach((n,i)=>{n.i=i;n.cur=i===cur;n.open=n.done||(cur<0||i<=cur)});return L};
window.trNext=()=>trNodes().find(n=>n.cur)||null;
window.trStart=i=>{const L=trNodes(),n=L[i];if(!n)return;if(!n.open){const pv=L[i-1];try{tst('🔒 Conclua "'+(pv?pv.t:'a etapa anterior')+'" para liberar este caso.')}catch(e){}return}
 if(n.k==='c')ptmStart(n.id);else if(n.k==='r')rqOpen(n.id);else if(n.k==='t')tlOpen(n.id);else espSel(n.id)};
const stTxt=n=>n.done?('✓ Concluído'+(n.nota?' · nota '+n.nota:n.stars&&typeof rqStars==='function'?' · '+rqStars(n.stars):'')):n.cur?(n.p?'Em andamento':'Próximo da trilha'):n.open?'Disponível':'🔒 Bloqueado';
window.trList=()=>{const L=trNodes(),dn=L.filter(n=>n.done).length;
 const head=`<p class="mut rqsub">Uma trilha que mistura <b>todos os modos</b>: casos comuns, rápidos, linha do tempo e, a cada poucos passos, um caso do <b>Arquivo Reservado</b>. Siga a ordem para liberar a próxima etapa. Qualquer caso concluído por outra aba também conta.</p><div class=trh><div><b>${dn} de ${L.length}</b><small>etapas concluídas</small></div><div class=trbar>${L.map(n=>`<i class="${n.done?'on':''} ${n.k==='e'?'st':''}"></i>`).join('')}</div></div>`;
 return head+CH.map(([a,b,x,y])=>{const seg=L.filter(n=>n.i>=x&&n.i<=y);if(!seg.length)return '';const d=seg.filter(n=>n.done).length;
  return `<div class=trch><small>${a}</small><b>${b}</b><span>${d}/${seg.length}</span></div><div class=trp>${seg.map(n=>`<button class="trn k${n.k} ${n.done?'dn':n.cur?'cu':n.open?'op':'lk'}" aria-label="${esc(n.t)}. ${n.done?'Concluído':n.cur?'Próximo da trilha':n.open?'Disponível':'Bloqueado'}" onclick="trStart(${n.i})"><span class=trdot>${n.done?'<svg viewBox="0 0 24 24"><path d="M5 12.5l4.5 4.5L19 7.5"/></svg>':n.open?IC[n.k]:'<svg viewBox="0 0 24 24"><rect x="5" y="11" width="14" height="9" rx="2"/><path d="M8 11V8a4 4 0 018 0v3"/></svg>'}</span><span class=trcard>${n.k==='e'?`<span class=trban><img src="${n.img}" alt="" loading=lazy draggable=false><i>★ PREMIUM</i></span>`:`<span class=trth><img src="${n.img}" alt="" loading=lazy draggable=false></span>`}<span class=trtx><small>${n.lab}</small><b>${esc(n.t)}</b><span>${esc(n.sub||'')}</span><em>${stTxt(n)}</em></span>${n.cur?'<span class=trnx>PRÓXIMO</span>':''}</span></button>`).join('')}</div>`}).join('')};
/* botão principal da tela inicial: segue a trilha (no modo Sozinho) */
window.trPlay=()=>{if(!solo())return '';const n=trNext();const pi='<span class=pi><svg viewBox="0 0 24 24"><path d="M7 4v16l13-8z"/></svg></span>';
 if(!n)return `<button class=play onclick="ARQ=1;RQT=6;render()">${pi}<span class=pt><small>TRILHA CONCLUÍDA</small><b>Rever o arquivo</b></span></button>`;
 return `<button class=play onclick="trStart(${n.i})">${pi}<span class=pt><small>${n.p?'CONTINUAR NA TRILHA':n.i===0?'COMECE POR AQUI':'PRÓXIMO NA TRILHA'} · ${n.lab}</small><b>${esc(n.t)}</b></span>${n.k==='c'&&n.p?`<span class=pp><i style="width:${n.p}%"></i></span>`:''}</button>`};
})();
