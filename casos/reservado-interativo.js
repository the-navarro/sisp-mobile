/* Arquivo Reservado: provas mais interativas. Detalhes escondidos na ampliação (aparecem no Caderno), coleta de digitais e DNA
   e livros para folhear. Como os mesmos nomes de prova existem em casos diferentes, tudo é guardado por caso. */
(function(){
const D={'e1:terco':[820,816],'e1:lanterna':[716,820],'e1:xicara':[820,409],'e1:cadmed':[820,528],'e1:termica':[398,820],'e1:tombo':[820,495],'e1:recibo':[820,633],'e1:chaves':[820,583],
'e2:bolso':[430,458],'e2:alavanca':[687,341],'e2:contador':[580,465],'e2:molde':[606,378],'e2:chaves':[672,509],
'e3:caixa':[578,376],'e3:cartola':[529,318],'e3:programa':[472,512],'e3:fita':[580,384],'e3:deck':[746,406],'e3:garrafa':[590,373],'e3:xale':[610,436],'e3:giz':[610,426],'e3:carta':[510,520],'e3:bengala':[214,560],'e3:caderno':[632,493]};
/* a imagem da prova é desenhada num quadro 240x180 (encaixada); converte a posição relativa da imagem para esse quadro */
const pos=(c,id,fx,fy)=>{const[W,H]=D[c+':'+id],s=Math.min(240/W,180/H),ox=(240-W*s)/2,oy=(180-H*s)/2;return[Math.round(ox+W*s*fx),Math.round(oy+H*s*fy)]};
const SE={},IX={};
const sec=(c,id,fx,fy,t)=>{const p=pos(c,id,fx,fy);(SE[id]=SE[id]||{})[c]={x:p[0],y:p[1],t}};
const ix=(c,id,o)=>{(IX[id]=IX[id]||{})[c]=o};
const st=(c,id,L)=>L.map(p=>pos(c,id,p[0],p[1]));
const pg=(h,t,hl)=>hl==null?{h,t}:{h,t,hl};

/* ---------- caso 01 ---------- */
sec('e1','terco',.50,.86,'O braço da cruz está rachado e abre como uma tampa. Dentro, enrolado, um papelzinho a lápis com as letras "Lc 8". Margarida guardava ali o que não podia dizer.');
sec('e1','lanterna',.60,.71,'Uma fita crepe cobre o botão de desligar: Irmã Margarida deixou a lanterna sempre acesa, de propósito.');
sec('e1','xicara',.80,.34,'No encaixe vazio da bandeja, o anel de umidade da garrafa ainda está fresco: a térmica saiu dali há menos de uma hora.');
sec('e1','cadmed',.12,.66,'Um post-it vermelho na letra da Irmã Clotilde: "Frei leva o da Madre, estou sem tempo". Ela mesma pediu.');
sec('e1','termica',.50,.50,'Sob a etiqueta "Vigília" há restos de outra, raspada com a unha. Dá para ler "…adre, chá". A garrafa era da Madre.');
sec('e1','tombo',.90,.25,'Uma etiqueta presa à capa: "inventário 2022, conferir com o capelão". Nunca foi assinada.');
sec('e1','recibo',.62,.70,'O barbante do envelope tem um nó de três voltas, igual ao do cordão que o frade usa na cintura.');
ix('e1','xicara',{col:'dna',lab:'Coletar resto do chá',seed:3,st:st('e1','xicara',[[.53,.18],[.55,.31],[.22,.36]]),ttl:'Coletar o resto do chá'});
ix('e1','termica',{col:'dust',lab:'Levantar digitais da tampa',seed:6,ok:1,ttl:'Levantar digitais da tampa'});
ix('e1','cadmed',{pg:[pg('ENFERMARIA · DIGOXINA',['Frasco da Madre, no armário trancado.','Contagem feita pela Irmã Clotilde.']),pg('Terça, 14h',['30 comprimidos no frasco da Madre.','(letra firme)']),pg('Quarta, 16h',['18 comprimidos no frasco da Madre.','(letra com tremor, escrita às pressas)'],0),pg('Recado preso à página',['"Frei leva o da Madre, estou sem tempo."','(post-it vermelho, letra de Clotilde)'])]});
ix('e1','chaves',{pg:[pg('RETIRADAS · ARMÁRIO DA ENFERMARIA',['Quem retira anota nome, hora e motivo.','Devolver ao fim do uso.']),pg('Terça, 14h00',['Irmã Clotilde','contagem do armário']),pg('Terça, 17h20',['Frei Anselmo','levar o remédio da Madre, a pedido da Irmã Clotilde, que estava ocupada','devolução às 17h34'],1)]});
ix('e1','tombo',{pg:[pg('LIVRO DE TOMBO · INVENTÁRIO',['Bens do convento, por ordem de entrada.','Guardado no cofre do arquivo.']),pg('Ostensório, séc. XVIII',['(folha nova, de papel branco)','a anotação antiga desapareceu'],0),pg('Ex-votos de prata',['(folha nova, de papel branco)','as demais folhas são amareladas'],0)]});

/* ---------- caso 02 ---------- */
sec('e2','bolso',.60,.08,'Uma impressão de polegar na coroa, com óleo fluorescente: quem parou o relógio tinha as mãos sujas do óleo da oficina.');
sec('e2','alavanca',.20,.40,'Os parafusos da tampa têm a pintura riscada em círculo: foram soltos há pouco, com uma chave de fenda de relojoeiro.');
sec('e2','contador',.50,.28,'Entre o oito e a engrenagem há um calço de cera: o contador foi travado, não parou sozinho.');
sec('e2','molde',.80,.28,'Na cera, uma impressão de dedo manchada de nanquim: quem copiou a chave tinha acabado de mexer em desenho técnico.');
sec('e2','chaves',.40,.63,'Logo abaixo da última linha, a marca de uma linha raspada com lâmina: houve um terceiro registro, apagado.');
ix('e2','alavanca',{col:'dust',lab:'Levantar digitais',seed:9,ok:2,ttl:'Levantar digitais da alavanca'});
ix('e2','bolso',{col:'dust',lab:'Levantar digitais da coroa',seed:4,ok:0,ttl:'Levantar digitais do relógio'});
ix('e2','chaves',{pg:[pg('LIVRO DE CHAVES · TORRE',['Cópias registradas da chave da torre.','Preso ao quadro de chaves da guarita.']),pg('Cópias',['Cópia 1: Aurélio Bastos, com o dono.','Cópia 2: Portaria (Seu Daimo), no quadro.'],1),pg('Retiradas desde junho',['nenhuma','(abaixo, uma linha raspada com lâmina)'],1)]});
ix('e2','ronda',{pg:[pg('LIVRO DE RONDAS · PORTARIA',['O vigia anota hora e ocorrências.']),pg('Quinta, 20h',['20h00: ronda do pátio, sem novidade.','20h15: pedestal do autômato vazio, restauro?'],1),pg('Quinta, 21h',['21h00: tudo em ordem.','21h30: tudo em ordem.','(outra caneta, escrita depois)'],2)]});
ix('e2','agenda',{pg:[pg('AGENDA · AURÉLIO BASTOS',['Compromissos da semana, a mão.']),pg('Sexta',['20h45: torre, conferir o carrilhão.','(escrito na segunda-feira)'],0),pg('Sexta, depois',['Teodoro, conversa séria.','(outra tinta, mais pressão)'],0)]});

/* ---------- caso 03 ---------- */
sec('e3','caixa',.49,.72,'Arranhões finos ao redor do fecho e a argola esfregada: o cadeado foi limpo com um pano depois de fechado.');
sec('e3','cartola',.83,.60,'O valor no bilhete foi riscado e reescrito duas vezes: Madame Zora já tinha cobrado menos do dono do circo.');
sec('e3','programa',.60,.76,'Uma migalha seca de bolo de fubá está colada na faixa da meia-noite: alguém comeu enquanto lia o programa.');
sec('e3','fita',.62,.46,'Na borda da etiqueta, a letra miúda de Aldo: "NÃO REGRAVAR". Todo mundo no som sabia que essa fita ficava ali.');
sec('e3','deck',.47,.66,'A tecla PLAY está bem mais funda que as outras: foi apertada devagar, com um dedo só, por quem não tem costume de mexer no aparelho.');
sec('e3','garrafa',.30,.52,'Dentro do gargalo, um papelzinho enrolado: "tenda: Zora, 3 garrafas, fiado". Aldo bebia na conta da cartomante.');
sec('e3','xale',.50,.68,'Entre as franjas, uma lantejoula roxa: o xale já foi usado por alguém de roupa de cena roxa.');
sec('e3','giz',.88,.22,'Debaixo da caixinha, um recibo dobrado: "Parque Maravilha, teste de câmera, sexta, 15h". Valquíria já tinha contato com eles.');
sec('e3','carta',.78,.82,'O lacre de cera está rompido e refeito, e há uma marca redonda de café ainda úmida na dobra: a carta foi aberta e lida esta noite.');
ix('e3','deck',{col:'dust',lab:'Levantar digitais do PLAY',seed:7,ok:0,ttl:'Levantar digitais da tecla PLAY'});
ix('e3','garrafa',{col:'dna',lab:'Coletar saliva do gargalo',seed:2,st:st('e3','garrafa',[[.30,.10],[.30,.30],[.14,.62]]),ttl:'Coletar saliva do gargalo'});
ix('e3','bengala',{col:'dna',lab:'Coletar suor do cabo',seed:4,st:st('e3','bengala',[[.35,.05],[.55,.04],[.68,.13]]),ttl:'Coletar suor do cabo'});
ix('e3','xale',{col:'dna',lab:'Recolher fibras e DNA',seed:6,st:st('e3','xale',[[.30,.40],[.50,.58],[.72,.40]]),ttl:'Recolher fibras e DNA do xale'});
ix('e3','caderno',{pg:[pg('ESTREIA · CAIXA',['23h20  ingressos  412,00','23h40  balcão  86,50','23h44  troco Zequinha  12,00','23h54  fecho do caixa  539,50'],2),pg('FIADO',['Seu Alcides  8,00','Zora  —','Rocco  bolo','Tico  3,00'],1)]});
ix('e3','carta',{pg:[pg('PARQUE MARAVILHA · Diversões e Atrações S.A.',['Carta de intenção de compra do Circo Esperança, com todo o seu material, lona e animais.','A venda será comunicada ao público à meia-noite do dia da estreia.']),pg('CLÁUSULAS',['1. Dispensa de toda a trupe na data da assinatura.','2. O Parque assume lona, animais e carretas.','3. O vendedor se compromete a anunciar a venda.'],0),pg('ASSINATURA',['Hermínio Tavares','(lacre de cera vermelha, rompido e refeito)'],1)]});

const def=(O,T)=>Object.keys(T).forEach(id=>Object.defineProperty(O,id,{configurable:true,enumerable:true,get(){return T[id][typeof C!=='undefined'&&C?C.id:'']}}));
def(SEC,SE);def(IXM,IX);
})();
