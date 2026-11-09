/* Dupla Online: caso curto de teste do motor (d0). Os casos definitivos virão no mesmo formato. */
(function(){const B=PDX.victor,F=PDX.marta,mk=(b,o)=>Object.assign({},b,o);
PDX.dc_nair=mk(F,{e:'round',n:'button',b:'arch',hc:'#b8bcc4',hs:'bun',sk:'#e2c4a6',sh:'#bc9c80',bg:['#2a3a40','#0b151c'],deco:'',out:'suit',oc:'#7a2a35',oc2:'#f2efe8',age:58,ex:['wr']});
PDX.dc_tobias=mk(B,{e:'narrow',n:'pointed',b:'straight',hc:'#2a1d14',hs:'short',sk:'#c99a76',sh:'#a87752',bg:['#2a3a40','#0b151c'],deco:'',out:'suit',oc:'#26262c',oc2:'#e8e4da',age:31,ex:['bags']});
PDX.dc_iris=mk(F,{e:'round',n:'button',b:'arch',hc:'#8a3a2a',hs:'bun',sk:'#e6c3a3',sh:'#c3a085',bg:['#2a3a40','#0b151c'],deco:'',out:'apron',oc:'#6b4a8a',oc2:'#f2efe8',age:27,ex:['lipstick:#b04a5a','freckles']})})();
DCC.push({
 id:'d0',tipo:'dupla',titulo:'A Caixa do Teatro',duracao_min:15,dificuldade:2,
 cenario:{local:'Teatro Aurora, noite de estreia',horario_do_crime:'entre 21h e 21h30, no intervalo',resumo:'A caixa com a arrecadação da estreia sumiu da bilheteria trancada durante o intervalo. Só três pessoas estavam por perto.'},
 abertura:{A:'Você cuida da bilheteria e da bilheteira. A porta estava trancada e a caixa sumiu. Converse com Nair e com Íris e veja as provas da bilheteria.',B:'Você cuida dos bastidores. A chave reserva da bilheteria sumiu do quadro. Converse com Tobias e com Íris e veja as provas dos bastidores.'},
 suspeitos:[
  {id:'nair',nome:'Nair Campos',idade:58,papel:'Bilheteira',aparencia:'Cabelo grisalho preso, blazer vinho',perfil:'Séria e organizada. Cuida da bilheteria há 30 anos.',dono:'A'},
  {id:'tobias',nome:'Tobias Ramos',idade:31,papel:'Contrarregra',aparencia:'Cabelo curto escuro, roupa toda preta',perfil:'Quieto e ágil. Vive atrás do palco.',dono:'B'},
  {id:'iris',nome:'Íris Valente',idade:27,papel:'Atriz',aparencia:'Cabelo ruivo preso, sardas',perfil:'Falante e distraída. Fica no camarim no intervalo.',dono:'ambos'}],
 fatos:[
  {id:'f_neto',texto:'O neto de Nair se chama Davi.',aparece_em:'prova:p_desenho',dono:'B'},
  {id:'f_ano',texto:'O Teatro Aurora foi fundado em 1952.',aparece_em:'prova:p_programa',dono:'A'},
  {id:'f_meia',texto:'Foram vendidas 73 meias-entradas.',aparece_em:'prova:p_planilha',dono:'A'},
  {id:'f_chave',texto:'A chave reserva da bilheteria é a de número 41.',aparece_em:'prova:p_quadro',dono:'B'}],
 interrogatorio:{
  nair:[
   {id:'n1',pergunta:'A senhora viu alguém perto da bilheteria no intervalo?',resposta:'Fui ao banheiro às 21h05 e voltei às 21h30. Deixei a porta trancada.',registra_afirmacao:'A1'},
   {id:'n2',pergunta:'Quem tem a chave reserva da bilheteria?',requer_fato:{id:'f_neto',pedido:'Só falo da minha bilheteria com quem conhece a minha família. Qual é o nome do meu neto?',tipo_entrada:'texto',aceita:['Davi'],erro:'Não. Quem me conhece sabe o nome dele.'},resposta:'Fica no quadro dos fundos. O Tobias é quem mais mexe lá.',registra_afirmacao:'A2',libera_prova:'p_programa'}],
  tobias:[
   {id:'t1',pergunta:'Onde o senhor estava no intervalo?',resposta:'No palco, arrumando o cenário o tempo todo. Não saí de lá.',registra_afirmacao:'B1'},
   {id:'t2',pergunta:'O senhor mexeu na chave reserva da bilheteria?',resposta:'Nunca encostei nessa chave.',registra_afirmacao:'B2'}],
  iris:[
   {id:'i1',pergunta:'A senhora viu algo estranho no intervalo?',resposta:'Vi alguém de preto mexendo numa caixa de ferramentas atrás do palco. Não vi o rosto.',registra_afirmacao:'I1',libera_prova:'p_ferramentas'},
   {id:'i2',pergunta:'Onde a senhora estava?',resposta:'No camarim, ensaiando a minha fala. Saí só para pegar água.',registra_afirmacao:'I2'}]},
 provas:[
  {id:'p_planilha',nome:'Planilha da bilheteria',descricao:'Resumo de vendas da noite. Total arrecadado: R$ 3.400. Meias-entradas vendidas: 73.',dono:'A',disponivel:'inicio'},
  {id:'p_foto',nome:'Foto do intervalo',descricao:'Foto de celular às 21h10: o palco vazio e o tripé do contrarregra sem ninguém por perto.',dono:'A',disponivel:'inicio'},
  {id:'p_programa',nome:'Programa da peça',descricao:'Folheto de estreia. Na contracapa: “Teatro Aurora, fundado em 1952”.',dono:'A',disponivel:'apos_n2'},
  {id:'p_quadro',nome:'Quadro de chaves',descricao:'O quadro dos fundos. A chave reserva da bilheteria, a de número 41, não está no gancho.',dono:'B',disponivel:'inicio'},
  {id:'p_desenho',nome:'Desenho no camarim 3',descricao:'Um desenho de criança colado no espelho: “Para a vovó Nair, do seu Davi”.',dono:'B',disponivel:'inicio'},
  {id:'p_agenda',nome:'Agenda do Tobias',descricao:'Uma agenda preta com cadeado de 4 dígitos. Na capa: “Meu ano favorito: o da fundação do teatro”.',descricao_aberta:'Quinta, 21h05: pegar a chave 41 e ir até a bilheteria.',dono:'B',disponivel:'inicio',trava:{tipo:'senha',pedido:'Agenda trancada. Digite o ano de 4 dígitos.',resposta:'1952',aceita:[]}},
  {id:'p_ferramentas',nome:'Caixa de ferramentas',descricao:'Caixa preta com cadeado de 4 dígitos. Adesivo: “Meia-entrada vendida + chave reserva”.',descricao_aberta:'Dentro: a caixa de arrecadação do teatro, a chave reserva nº 41 e o crachá do Tobias.',dono:'ambos',disponivel:'apos_i1',trava:{tipo:'codigo_dividido',pedido:'Cadeado de 4 dígitos. Cada um digita a sua parte.',digitos:4,parte_A:{valor:'73',vem_de:'prova:p_planilha'},parte_B:{valor:'41',vem_de:'prova:p_quadro'}}}],
 contradicoes:[
  {id:'c1',suspeito:'tobias',afirmacao:'B1',prova:'p_foto',explicacao:'Tobias disse que não saiu do palco, mas a foto das 21h10 mostra o palco vazio e o tripé dele sem ninguém.',lado_afirmacao:'B',lado_prova:'A'},
  {id:'c2',suspeito:'tobias',afirmacao:'B2',prova:'p_ferramentas',explicacao:'Tobias disse que nunca encostou na chave reserva, mas ela estava na caixa de ferramentas dele, junto com o crachá.',lado_afirmacao:'B',lado_prova:'ambos'}],
 acusacao:{culpado:'tobias',min_contradicoes:1,perguntas_finais:[
  {pergunta:'Onde estava escondida a caixa de arrecadação?',opcoes:['No camarim da Íris','Na caixa de ferramentas do Tobias','No quadro de chaves','Atrás da bilheteria'],correta:1,explicacao:'Estava na caixa de ferramentas, trancada.'},
  {pergunta:'Como o ladrão entrou na bilheteria?',opcoes:['Arrombou a porta','Usou a chave reserva','Pelo telhado','A bilheteira deixou aberta'],correta:1,explicacao:'Usou a chave reserva nº 41.'}]},
 dicas:{A:['Você tem os números que abrem o cadeado da caixa de ferramentas. Veja a planilha.','Nair só fala da chave reserva se você souber o nome do neto dela.'],B:['A agenda do Tobias pede um ano. Quem tem o programa da peça?','O quadro de chaves tem o número que falta no cadeado.'],geral:['Enviem provas um ao outro e comparem as falas dos suspeitos.']},
 final:{acerto:'Tobias pegou a chave reserva, levou a caixa no intervalo e a escondeu na própria caixa de ferramentas. Com o cadeado aberto pela dupla, o roubo foi desmascarado.',erro:'O caso foi arquivado: a dupla não conseguiu fechar a acusação.'}});
