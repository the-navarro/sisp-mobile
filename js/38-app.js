/* ===== Jogo instalável como app (ícone na tela do celular) e jogável sem internet =====
   O trabalho de guardar os arquivos é do sw.js, na raiz. Aqui ficam só o registro dele
   e o quadro "Instalar como app" das Configurações. */
let APPI=null;
const appOk=()=>'serviceWorker' in navigator&&(location.protocol==='https:'||location.hostname==='localhost'||location.hostname==='127.0.0.1');
const appInst=()=>{try{return matchMedia('(display-mode: standalone)').matches||navigator.standalone===true}catch(e){return false}};
const appIos=()=>/iphone|ipad|ipod/i.test(navigator.userAgent)||(navigator.platform==='MacIntel'&&navigator.maxTouchPoints>1);
if(appOk()){
window.addEventListener('load',()=>{navigator.serviceWorker.register('sw.js').catch(()=>{})});
/* Android e computador: o navegador avisa quando o jogo pode ser instalado; guardamos o aviso para o botão */
window.addEventListener('beforeinstallprompt',e=>{e.preventDefault();APPI=e;try{if(SET)render()}catch(x){}});
window.addEventListener('appinstalled',()=>{APPI=null;try{tst('Jogo instalado. Procure o ícone do SISP na tela do aparelho.');if(SET)render()}catch(x){}})}
window.appInstall=async()=>{if(!APPI)return;const p=APPI;APPI=null;try{p.prompt();await p.userChoice}catch(e){}try{render()}catch(e){}};
window.appPanel=()=>{if(!appOk())return '';
const linha=(t,sub,btn)=>`<div class=row style="gap:10px"><div style="flex:1"><b>${t}</b><div class=mut style="font-size:12px">${sub}</div></div>${btn||''}</div>`;
let h;
if(appInst())h=linha('Jogo instalado','Você está jogando pelo app. O que já foi aberto funciona sem internet.');
else if(APPI)h=linha('Instalar o jogo','Ganha um ícone na tela do aparelho e funciona sem internet.','<button class=btn style="padding:8px 14px" onclick="appInstall()">Instalar</button>');
else if(appIos())h=linha('Instalar no iPhone ou iPad','No Safari, toque em Compartilhar (o quadrado com a seta para cima) e depois em "Adicionar à Tela de Início".');
else h=linha('Instalar o jogo','Abra o menu do navegador e escolha "Instalar app" ou "Adicionar à tela inicial".');
return `<div class=pan><h3>Instalar como app</h3>${h}</div>`};
