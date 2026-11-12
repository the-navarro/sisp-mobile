/* Navegação entre provas do mesmo local (‹ ›) e rolagem automática dos suspeitos no briefing. Vale para todos os casos. */
window.insn=d=>{if(!INS||!C)return;const l=LO.find(x=>x.c.some(c=>c[0]===INS));if(!l)return;const ids=l.c.map(c=>c[0]).filter(id=>EVA[id]);if(ids.length<2)return;const i=ids.indexOf(INS);INS=ids[(i+d+ids.length)%ids.length];INZ={s:1,x:0,y:0};try{AU.fx&&AU.fx('tick')}catch(e){}render()};
{const _r=render;render=function(){const r=_r.apply(this,arguments);try{
const ov=document.querySelector('.ov.insv');
if(ov&&INS&&C){const l=LO.find(x=>x.c.some(c=>c[0]===INS)),ids=l?l.c.map(c=>c[0]).filter(id=>EVA[id]):[];
if(ids.length>1&&!ov.querySelector('.insnav')){const i=ids.indexOf(INS);ov.insertAdjacentHTML('beforeend',`<button class="insnav l" onclick="insn(-1)" aria-label="Prova anterior">‹</button><button class="insnav r" onclick="insn(1)" aria-label="Próxima prova">›</button><div class=insct>${i+1} / ${ids.length}</div>`)}}
const on=document.querySelector('.sgi.on');if(on&&on.scrollIntoView){const g=on.parentElement;if(g)g.scrollTo({left:on.offsetLeft-g.clientWidth/2+on.clientWidth/2,behavior:'smooth'})}
}catch(e){}return r}}
/* enquanto um vídeo de cena está tocando, qualquer render() não pode recriar o vídeo (isso congelava a abertura) */
{const _r=render;render=function(){if(typeof CUT!=='undefined'&&CUT&&document.querySelector('#cutb .cvv[src]'))return;return _r.apply(this,arguments)}}
