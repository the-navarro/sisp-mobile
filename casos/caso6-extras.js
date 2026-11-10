/* Caso 6: provas em imagem/vídeo, retratos e textos de apoio */
{const _ph=AR.photo;AR.photo=o=>!(o&&o.src)&&_ph?_ph(o):`<rect width=240 height=180 fill="#0c1418" /><image href="${o.src}" width=240 height=180 preserveAspectRatio="xMidYMid slice" />${o.v?'<g><circle cx=120 cy=90 r=22 fill="#000" opacity=.55 /><path d="M112 78l22 12-22 12z" fill="#fff" /></g>':''}`}
const EVV=id=>{const e=EVA[id];return e&&e[0]==='photo'&&e[1].v?`<video class=pvv src="${e[1].v}" poster="${e[1].src}" controls playsinline autoplay loop muted preload=auto></video>`:''};
(()=>{const f=(id,png,mp4)=>{EVA[id]=['photo',mp4?{src:'assets/provas/'+png,v:'assets/provas/'+mp4}:{src:'assets/provas/'+png}]};
f('cam_sala','c6_cam_sala.png','c6_cam_sala.mp4');f('laudo_uv','c6_laudo_uv.png');f('laudo_pigmento','c6_laudo_pigmento.png');f('etiqueta_peso','c6_etiqueta_peso.png');f('seguro_foto','c6_seguro_foto.png');
f('registro_atelie','c6_registro_atelie.png');f('cam_atelie','c6_cam_atelie.png','c6_cam_atelie.mp4');f('pincel_lixo','c6_pincel_lixo.png');f('celular','c6_celular.png');f('guia_transporte','c6_guia_transporte.png')})();
PDX.iracema={e:'almond',n:'pointed',b:'arch',bt:.8,lp:1,mw:.95,sp:7.9,sk:'#e4c8b2',sh:'#c2a68e',hc:'#e8e8ee',hs:'bun',bg:['#3a2f4a','#120e1a'],deco:'fabric',out:'blazer',oc:'#6b4a7a',oc2:'#e8e1d2',ic:'#4a3a2a',age:74,g:'',ex:['smile','earr','wr'],ms:.6};
PDX.alvaro={e:'hooded',n:'wide',b:'straight',bt:1.1,lp:.8,mw:1,sp:8.2,sk:'#dcb592',sh:'#b69274',hc:'#9a9aa2',hs:'slick',bg:['#2a3550','#0b0f1a'],deco:'mirror',out:'suit',oc:'#1c2a4a',oc2:'#e8e1d2',ic:'#3a2a1c',age:52,g:'',ex:['ring','smile'],ms:.4};
PDX.camila={e:'almond',n:'pointed',b:'arch',bt:.9,lp:1.1,mw:1,sp:7.9,sk:'#d9b496',sh:'#b69273',hc:'#3a2616',hs:'bun',bg:['#34344f','#0e0f1a'],deco:'posters',out:'blazer',oc:'#3a3a4a',oc2:'#e8e1d2',ic:'#3a2a1c',age:34,g:'',ex:['lanyard','lipstick:#a0384c'],ms:.2};
PDX.paula={e:'up',n:'button',b:'straight',bt:1.1,lp:.9,mw:1,sp:8,sk:'#c9a07e',sh:'#a07a5c',hc:'#2a1d12',hs:'short',bg:['#2a3a40','#0b151c'],deco:'lights',out:'uniform',oc:'#5a6068',oc2:'#d9d9de',ic:'#2a1c12',age:30,g:'',ex:['headset'],ms:-.2};
window.PDXO=window.PDXO||{c6:{}};PDXO.c6.rui={e:'down',n:'wide',b:'straight',bt:1.3,lp:.8,mw:1,sp:8.3,sk:'#c49470',sh:'#9c7050',hc:'#2a1c14',hs:'cap',bg:['#3a3426','#141108'],deco:'tanks',out:'vest',oc:'#d8a020',oc2:'#3a3a40',ic:'#3a2a1c',age:41,g:'',ex:['stubble'],ms:.1};
PDXO.c6.heitor={e:'hooded',n:'wide',b:'straight',bt:1.4,lp:.75,mw:1,sp:8.2,sk:'#d4aa88',sh:'#ab8466',hc:'#9a9aa2',hs:'short',bg:['#3a2f26','#120d09'],deco:'shelf',out:'apron',oc:'#6a4a2a',oc2:'#d9d2c2',ic:'#3a2a1c',age:49,g:'',ex:['longbeard','bags'],ms:-.3};
PDX.tiago={e:'narrow',n:'hooked',b:'sharp',bt:1.2,lp:.8,mw:1,sp:7.8,sk:'#c49470',sh:'#9c7050',hc:'#2a1c14',hs:'curly',bg:['#3a2a2a','#140d0d'],deco:'posters',out:'tee',oc:'#3a3a44',oc2:'#c0522d',ic:'#2a1c12',age:26,g:'',ex:['stubble','bags'],ms:-.7};
['iracema','camila','paula'].forEach(i=>VFEM.add(i));
VICN.c6=['iracema','Iracema Pontes','74 anos · Dona do quadro'];
RECON.c6=[['c6:atelie',['registro_atelie'],'20 dias antes, 22h30','Heitor anota uma "revisão de verniz" no livro do ateliê. É o álibi que usa para trocar o quadro sem despertar suspeita.'],['c6:atelie',['cam_atelie','celular'],'20 dias antes, 22h41','Combinada por mensagem, a troca é feita com a câmera ligada: Tiago traz a cópia no tubo e os dois retiram o original do cavalete.'],['c6:deposito',['guia_transporte','etiqueta_peso'],'19 dias antes, 8h15','Rui pesa 4,2 kg e entrega a cópia na galeria sem desconfiar. O peso já não era o do seguro.'],['c6:galeria',['laudo_pigmento','laudo_uv'],'Sexta, 9h','A perita encontra branco de titânio e trincas pintadas. O quadro verdadeiro estava escondido, à espera de um comprador.']];
TH.c6=TH.c3;

/* Rui e Heitor existem em dois casos diferentes (c3/c5 e c6) com rostos diferentes: cada caso usa o seu retrato */
{const BASE={};Object.keys(PDXO).forEach(k=>Object.keys(PDXO[k]).forEach(n=>{if(!(n in BASE))BASE[n]=PDX[n]}));
const set=id=>{Object.keys(BASE).forEach(n=>{const o=PDXO[id]&&PDXO[id][n];if(o)PDX[n]=o;else if(BASE[n])PDX[n]=BASE[n];else delete PDX[n]})};
const _sc=startCase;startCase=function(id){set(id);return _sc.apply(this,arguments)};set('')}
