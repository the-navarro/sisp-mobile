/* ===== Tela cheia e altura da tela quando o jogo está instalado como app ===== */
const fsIs=()=>!!(document.fullscreenElement||document.webkitFullscreenElement);
const fsApp=()=>{try{return matchMedia('(display-mode: standalone)').matches||matchMedia('(display-mode: fullscreen)').matches||navigator.standalone===true}catch(e){return false}};
window.fsOn=()=>META.fs===undefined?fsApp():!!META.fs;
window.fsGo=()=>{if(fsIs())return;const e=document.documentElement,f=e.requestFullscreen||e.webkitRequestFullscreen;if(!f)return;try{const r=f.call(e,{navigationUI:'hide'});r&&r.catch&&r.catch(()=>{})}catch(x){}};
window.fsSet=v=>{META.fs=v?1:0;msave();if(v)fsGo();else{try{(document.exitFullscreen||document.webkitExitFullscreen).call(document)}catch(e){}}if(window.setmodRefresh)setmodRefresh();render()};
window.fsPanel=()=>{const on=fsOn();return `<div class=pan><h3>📱 Tela</h3><div class=row style="gap:10px"><div style="flex:1"><b>Tela cheia</b><div class=mut style="font-size:12px">Esconde as barras do celular enquanto você joga. Deslize da borda para vê-las.</div></div><button class="chip ${on?'on':''}" onclick="fsSet(${on?0:1})">${on?'Ligado':'Desligado'}</button></div></div>`};
/* o primeiro toque liga a tela cheia (o navegador só deixa por gesto do usuário) */
document.addEventListener('pointerup',()=>{if(fsOn()&&fsApp()&&!fsIs())fsGo()},{passive:true});
/* altura real da tela: refaz a conta ao entrar/sair da tela cheia e ao voltar para o jogo */
{const re=()=>{const R=document.documentElement,vv=window.visualViewport,e=document.activeElement;if(e&&e.matches&&e.matches('input,textarea'))return;R.style.setProperty('--H',Math.round(vv?Math.max(vv.height,innerHeight):innerHeight)+'px');scrollTo(0,0)};
['fullscreenchange','webkitfullscreenchange','orientationchange','pageshow'].forEach(n=>addEventListener(n,()=>{setTimeout(re,120);setTimeout(re,600)}));document.addEventListener('fullscreenchange',()=>{setTimeout(re,120);setTimeout(re,600)});
document.addEventListener('visibilitychange',()=>{if(!document.hidden){setTimeout(re,200)}});
if(fsApp()){setTimeout(re,300);setTimeout(re,1200)}}
