/* ===== Arquivo: escolha do modo de jogo antes dos casos =====
   Sozinho · Em dupla (Revezamento, Cooperativo online, Competitivo online). A etiqueta no topo troca de modo. */
const AMN={solo:['🕵️','Sozinho'],rev:['👥','Revezamento'],coop:['🤝','Cooperativo online'],comp:['🏁','Competitivo online']};
window.AM={step:1};
window.amMode=()=>DUO.on?'rev':(META.am==='coop'||META.am==='comp'?META.am:'solo');
const amClose=()=>{const e=document.getElementById('amm');if(e)e.remove();if(!META.ams){META.ams=1;msave()}};
window.amSet=m=>{const e=document.getElementById('amm');if(e)e.remove();META.ams=1;
 if(m==='rev'){META.am='rev';msave();if(!DUO.on)duoStartRev()}
 else{if(DUO.on)duoOff();META.am=m;msave()}
 if(m==='coop')RQT=3;else if(m==='comp')RQT=4;else if(RQT>2)RQT=0;
 ARQ=1;render()};
window.amChoose=()=>{AM.step=1;amDraw()};
window.amStep=n=>{AM.step=n;amDraw()};
function amDraw(){let e=document.getElementById('amm');if(!e){e=document.createElement('div');e.id='amm';e.className='duo-m';e.style.zIndex=2100;document.body.appendChild(e)}
const cur=amMode(),opt=(k,d)=>`<button class="dopt ${cur===k?'amcur':''}" onclick="amSet('${k}')"><b>${AMN[k][0]} ${AMN[k][1]}${cur===k?' · atual':''}</b><span>${d}</span></button>`;
e.innerHTML=AM.step===1?`<div class=dcard style="text-align:left"><small>ARQUIVO DE CASOS</small><h2 style="margin:2px 0 8px">Como você vai jogar?</h2><button class="dopt ${cur==='solo'?'amcur':''}" onclick="amSet('solo')"><b>🕵️ Sozinho</b><span>Casos principais, rápidos e linha do tempo.</span></button><button class="dopt ${cur!=='solo'?'amcur':''}" onclick="amStep(2)"><b>👥 Em dupla</b><span>Revezamento, cooperativo ou competitivo.</span></button><button class="dbtn gh" onclick="amClose()">Fechar</button></div>`
:`<div class=dcard style="text-align:left"><small>EM DUPLA</small><h2 style="margin:2px 0 8px">Qual modo?</h2>${opt('rev','No mesmo celular, com papéis sorteados. Casos principais, rápidos e linha do tempo.')}${opt('coop','Dois celulares. Cada um vê uma parte do caso e vocês trocam provas e falas.')}${opt('comp','Dois celulares. O mesmo caso para os dois: quem acusar certo primeiro vence, com golpes.')}<button class="dbtn gh" onclick="amStep(1)">Voltar</button></div>`}
const amBar=()=>{const m=amMode();return `<button class=amchip onclick="amChoose()" aria-label="Trocar o modo de jogo"><span>${m==='solo'?'🕵️ Sozinho':'👥 Em dupla · '+AMN[m][1]}</span><b>Trocar ▾</b></button>`};
window.rqTabs=()=>{const m=amMode();if(m==='coop')RQT=3;else if(m==='comp')RQT=4;else if(RQT>2)RQT=0;
return amBar()+(m==='solo'||m==='rev'?`<div class=rqt><button class="${RQT===0?'on':''}" onclick="RQT=0;render()">Principais</button><button class="${RQT===1?'on':''}" onclick="RQT=1;render()">Rápidos <small>${rqDone()}/${RQC.length}</small></button><button class="${RQT===2?'on':''}" onclick="RQT=2;render()">Linha do tempo</button></div>`:'')};
/* lista da corrida */
window.vsList=()=>`${DC.on?`<div class=dcbn><b>Você está na sala ${esc(DC.cod)}</b><span>${DC.host?'Escolha um caso para chamar '+esc(DC.names[1]||'a outra pessoa')+'.':'Quem criou a sala escolhe o caso.'}</span><div><button onclick="DC.st='lobby';dcMod()">Ver a sala</button></div></div>`:''}<p class="mut rqsub">Casos feitos só para a corrida. Os dois jogam <b>o mesmo caso ao mesmo tempo, cada um no seu celular</b>. Quem acusar certo primeiro vence, e dá para atrapalhar o rival com golpes. Precisa de internet.</p>${VSC.map(c=>`<button class=rqcard onclick="vsCard('${c.id}')"><span class="rqcs dcnoir"><img src="assets/casos/cartao_${c.id}.webp" alt="" loading=lazy draggable=false><i class=dcbadge>CORRIDA ONLINE</i></span><span class=rqci><b>${esc(c.titulo)}</b><small>${esc(c.cenario.local.split(',')[0])} · ~${c.duracao_min||10} min</small><span class=rqcf>${c.suspeitos.map(s=>av('rq_'+s.id,26)).join('')}<em>2 jogadores</em></span></span></button>`).join('')}`;
window.vsCard=id=>{const c=VSC.find(x=>x.id===id);if(!c)return;let e=document.getElementById('vscm');if(!e){e=document.createElement('div');e.id='vscm';e.className='duo-m';e.style.zIndex=2050;document.body.appendChild(e)}
const hostOn=DC.on&&DC.host,guestOn=DC.on&&!DC.host,both=DC.names[0]&&DC.names[1];
const act=hostOn&&both?`<label class=vsgf><input type=checkbox ${VS.pk.gf?'checked':''} onchange="VS.pk.gf=this.checked?1:0"> <span><b>Golpes ligados</b><small>Quem investiga bem ganha golpes para atrapalhar o rival.</small></span></label><button class=dbtn onclick="document.getElementById('vscm').remove();vsStart('r','${id}')">Começar com ${esc(DC.names[1-DC.me])}</button>`
:guestOn?`<p class=dsm>Você está numa sala como convidado(a). Quem criou a sala escolhe o caso.</p>`
:hostOn?`<p class=dsm>Sua sala está aberta. Quando a outra pessoa entrar, o botão para começar aparece aqui.</p>`
:`<button class=dbtn onclick="VS.want='${id}';document.getElementById('vscm').remove();DC.st='home';dcMod()">Criar uma sala e convidar alguém</button><button class="dbtn gh" onclick="VS.want='${id}';document.getElementById('vscm').remove();DC.st='join';dcMod()">Entrar numa sala com um código</button>`;
e.innerHTML=`<div class=dcard style="text-align:left;max-height:94vh;overflow:auto"><img src="assets/casos/mini_${id}.webp" alt="" style="width:100%;border-radius:12px;margin-bottom:8px"><small>🏁 CORRIDA ONLINE · ${esc(c.cenario.local.split(',')[0]).toUpperCase()}</small><h2 style="margin:2px 0 6px">${esc(c.titulo)}</h2><p class=dsm style="margin-top:0">${esc(c.cenario.resumo)}</p><div class=dcchips><span>👥 2 celulares</span><span>⏱ ~${c.duracao_min||10} min</span><span>🌐 internet</span></div>${act}${DC.on?`<button class="dbtn gh" onclick="document.getElementById('vscm').remove();DC.st='lobby';dcMod()">Ver a sala (${esc(DC.cod)})</button>`:''}<button class="dbtn gh" onclick="document.getElementById('vscm').remove()">Voltar</button></div>`};
/* primeira vez no Arquivo: pergunta o modo */
{const _r=render;render=function(){_r.apply(this,arguments);try{if(ARQ&&MENU&&!META.ams&&!document.getElementById('amm'))amChoose()}catch(e){}}}
