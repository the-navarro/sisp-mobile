/* Dupla Online: caso d0 (criado pelo chat, instalado sem mudar o texto, exceto o tratamento “senhora” dirigido ao detetive). */
DCC.push({
 "id": "d0",
 "tipo": "dupla",
 "titulo": "O Vaso Sumido do Ateliê",
 "duracao_min": 18,
 "dificuldade": 1,
 "cenario": {
  "local": "Ateliê Barro Vivo, oficina de cerâmica no bairro do Mercado",
  "horario_do_crime": "Quinta-feira, entre 19h30 e 20h30",
  "resumo": "O Vaso Lua de Barro, peça mais valiosa do ateliê (R$ 12.000), desapareceu da vitrine trancada. O vidro está intacto e a fechadura foi aberta com a chave. Só três pessoas estavam por perto naquela noite."
 },
 "abertura": {
  "A": "Detetive, aqui é o chefe. O Vaso Lua de Barro sumiu da vitrine do Ateliê Barro Vivo. Você cuida da área das aulas: converse com Otávio, o professor, e com Gil, o assistente. Você também tem a foto da vitrine, o convite de inauguração e o mural de avisos. Seu parceiro está com outra parte do caso. Troquem tudo o que descobrirem.",
  "B": "Detetive, aqui é o chefe. O Vaso Lua de Barro sumiu da vitrine do Ateliê Barro Vivo. Você cuida da turma e da sala de queima: converse com Priscila, aluna dedicada do ateliê. Você tem a foto da sala de queima, a foto da festa de aniversário do ateliê e o tablet da bancada. Seu parceiro está com outra parte do caso. Troquem tudo o que descobrirem."
 },
 "suspeitos": [
  {
   "id": "otavio",
   "nome": "Otávio Brandão",
   "idade": 48,
   "papel": "Professor de torno",
   "aparencia": "Homem alto e magro, cabelo grisalho curto, barba rala, avental de couro marrom manchado de argila e óculos redondos de aro preto",
   "perfil": "Orgulhoso do ofício e muito protetor do forno.",
   "dono": "A"
  },
  {
   "id": "gil",
   "nome": "Gil Antunes",
   "idade": 22,
   "papel": "Assistente do ateliê",
   "aparencia": "Rapaz magro, cabelo preto bagunçado, boné verde virado para trás, camiseta cinza com respingos de esmalte azul",
   "perfil": "Simpático, distraído e sempre com fone no pescoço.",
   "dono": "A"
  },
  {
   "id": "priscila",
   "nome": "Priscila Nunes",
   "idade": 34,
   "papel": "Aluna dedicada",
   "aparencia": "Mulher de estatura média, cabelo castanho preso em coque, avental amarelo, brincos de argola dourados e unhas com tinta azul",
   "perfil": "Perfeccionista e muito reservada sobre a vida fora do ateliê.",
   "dono": "B"
  }
 ],
 "fatos": [
  {
   "id": "f_forno",
   "texto": "O forno do ateliê se chama Dragão.",
   "aparece_em": "prova:p_foto_forno",
   "dono": "B"
  },
  {
   "id": "f_dia",
   "texto": "O ateliê foi inaugurado no dia 14.",
   "aparece_em": "prova:p_convite",
   "dono": "A"
  },
  {
   "id": "f_mes",
   "texto": "O ateliê faz aniversário em março (mês 03).",
   "aparece_em": "prova:p_bolo",
   "dono": "B"
  },
  {
   "id": "f_mascote",
   "texto": "A mascote do ateliê se chama Pipoca.",
   "aparece_em": "prova:p_mural",
   "dono": "A"
  }
 ],
 "interrogatorio": {
  "otavio": [
   {
    "id": "o1",
    "pergunta": "Quando o senhor viu o vaso pela última vez?",
    "resposta": "Na quinta, às 18h, quando fechei a aula. Estava lá, brilhando na vitrine.",
    "registra_afirmacao": "af_o1"
   },
   {
    "id": "o2",
    "pergunta": "Quem tem acesso à chave da vitrine?",
    "requer_fato": {
     "id": "f_forno",
     "pedido": "Não falo de chaves com quem não respeita o ofício. Primeiro me diga: qual é o nome do forno de queima do ateliê?",
     "tipo_entrada": "texto",
     "aceita": [
      "Dragão",
      "Dragao",
      "o Dragão",
      "forno Dragão",
      "forno dragao"
     ],
     "erro": "Não. Quem trabalha com barro de verdade sabe o nome do forno."
    },
    "resposta": "A chave fica no armário de chaves do corredor. O código, só eu e a Celeste, a dona do ateliê, sabemos.",
    "registra_afirmacao": "af_o2",
    "libera_prova": "p_armario"
   },
   {
    "id": "o3",
    "pergunta": "O que o senhor fez depois da aula?",
    "resposta": "Fiquei na sala de queima até as 21h, corrigindo peças com o Gil.",
    "registra_afirmacao": "af_o3"
   },
   {
    "id": "o4",
    "pergunta": "E a Priscila, ficou até tarde?",
    "resposta": "A Priscila? Foi embora junto com a turma, às 18h30. Sempre vai direto para casa.",
    "registra_afirmacao": "af_o4"
   }
  ],
  "gil": [
   {
    "id": "g1",
    "pergunta": "Onde você estava às 19h40?",
    "resposta": "Na copa, coando café. Estava com o fone, nem ouvi nada.",
    "registra_afirmacao": "af_g1"
   },
   {
    "id": "g2",
    "pergunta": "Você tem cópia da chave da vitrine?",
    "resposta": "Eu? Não! Só pego o cadeado do depósito. Pergunta pro Otávio.",
    "registra_afirmacao": "af_g2"
   },
   {
    "id": "g3",
    "pergunta": "Quem cuida da mascote do ateliê?",
    "resposta": "Todo mundo, mas a Pipoca é minha parceira. Ela ganhou até um cartaz no mural.",
    "registra_afirmacao": "af_g3"
   }
  ],
  "priscila": [
   {
    "id": "p1",
    "pergunta": "O que a senhora fez na quinta à noite?",
    "resposta": "Fui embora com a turma às 18h30 e fui direto para casa.",
    "registra_afirmacao": "af_p1"
   },
   {
    "id": "p2",
    "pergunta": "A senhora conhece o Vaso Lua de Barro?",
    "resposta": "Claro. É a peça mais linda daqui. Qualquer aluna sonha em fazer algo parecido.",
    "registra_afirmacao": "af_p2"
   },
   {
    "id": "p3",
    "pergunta": "Alguém lhe pediu uma réplica do vaso?",
    "resposta": "Réplica? Não, que ideia. Eu só faço as peças das aulas.",
    "registra_afirmacao": "af_p3"
   },
   {
    "id": "p4",
    "pergunta": "A senhora sabe usar o tablet da bancada?",
    "resposta": "Só para ver os horários das aulas.",
    "registra_afirmacao": "af_p4"
   }
  ]
 },
 "provas": [
  {
   "id": "p_vitrine",
   "nome": "Foto da vitrine",
   "descricao": "A vitrine está vazia, com o vidro intacto e a fechadura aberta com chave. Resta apenas a etiqueta da peça: Vaso Lua de Barro, R$ 12.000.",
   "dono": "A",
   "disponivel": "inicio",
   "imagem": "d0_p_vitrine.png"
  },
  {
   "id": "p_convite",
   "nome": "Convite de inauguração",
   "descricao": "Convite antigo do ateliê: 'Inauguração do Ateliê Barro Vivo, sábado, dia 14. Venha conhecer!'. O mês foi cortado pela dobra do papel.",
   "dono": "A",
   "disponivel": "inicio",
   "imagem": "d0_p_convite.png"
  },
  {
   "id": "p_mural",
   "nome": "Mural de avisos",
   "descricao": "Mural da copa com recados. Um cartaz mostra a cachorra mascote do ateliê: 'Pipoca foi vacinada! Obrigado, Gil'.",
   "dono": "A",
   "disponivel": "inicio",
   "imagem": "d0_p_mural.png"
  },
  {
   "id": "p_foto_forno",
   "nome": "Foto da sala de queima",
   "descricao": "O forno elétrico da sala de queima, com uma plaquinha de metal: 'DRAGÃO'.",
   "dono": "B",
   "disponivel": "inicio",
   "imagem": "d0_p_foto_forno.png"
  },
  {
   "id": "p_bolo",
   "nome": "Foto da festa do ateliê",
   "descricao": "Foto de uma festa na bancada: o bolo diz 'Parabéns, Barro Vivo! 5 anos' e uma faixa 'Aniversário do ateliê: março'.",
   "dono": "B",
   "disponivel": "inicio",
   "imagem": "d0_p_bolo.png"
  },
  {
   "id": "p_tablet",
   "nome": "Tablet da bancada",
   "descricao": "O tablet que a turma usa para ver horários, trancado por senha. Na tela de bloqueio: 'Dica: nome da mascote do ateliê'.",
   "dono": "B",
   "disponivel": "inicio",
   "imagem": "d0_p_tablet.png",
   "trava": {
    "tipo": "senha",
    "aceita": [
     "Pipoca"
    ],
    "vem_de": "prova:p_mural",
    "imagem_aberta": "d0_p_tablet_aberto.png",
    "texto_aberto": "Aberto, o tablet mostra uma conversa de Priscila com 'Colecionador' às 19h52: 'Réplica pronta. Levo o original às 20h.'",
    "dica_apos_3_erros": "A mascote aparece num cartaz da copa."
   }
  },
  {
   "id": "p_armario",
   "nome": "Armário de chaves",
   "descricao": "Armário do corredor com teclado de 4 dígitos. Etiqueta: 'Código = dia e mês da inauguração do ateliê (4 dígitos: primeiro o dia, depois o mês)'.",
   "dono": "ambos",
   "disponivel": "apos_otavio_o2",
   "imagem": "d0_p_armario.png",
   "trava": {
    "tipo": "codigo_dividido",
    "digitos": 4,
    "parte_A": {
     "valor": "14",
     "vem_de": "prova:p_convite",
     "posicao": "primeiros 2"
    },
    "parte_B": {
     "valor": "03",
     "vem_de": "prova:p_bolo",
     "posicao": "últimos 2"
    },
    "ao_abrir": {
     "libera_prova": "p_registro_chaves"
    },
    "dica_apos_3_erros": "A etiqueta pede o dia e o mês. Cada um de vocês tem um deles."
   }
  },
  {
   "id": "p_registro_chaves",
   "nome": "Registro de retirada de chaves",
   "descricao": "Folha dentro do armário: 'Chave da vitrine. Retirada: quinta, 19h40. Assinatura: P. Nunes. Devolução: (em branco)'.",
   "dono": "ambos",
   "disponivel": "apos_trava_p_armario",
   "imagem": "d0_p_registro_chaves.png"
  }
 ],
 "contradicoes": [
  {
   "id": "c1",
   "suspeito": "priscila",
   "afirmacao": "af_p1",
   "prova": "p_tablet",
   "explicacao": "Priscila disse que foi embora às 18h30 e foi direto para casa, mas a conversa no tablet foi escrita por ela às 19h52, falando de uma réplica pronta e do original. Ela estava ativa, falando do vaso, mais de uma hora depois do horário em que disse ter ido embora.",
   "lado_afirmacao": "B",
   "lado_prova": "B"
  },
  {
   "id": "c2",
   "suspeito": "otavio",
   "afirmacao": "af_o2",
   "prova": "p_registro_chaves",
   "explicacao": "Otávio garantiu que só ele e a Celeste sabiam o código do armário, mas o registro mostra a retirada da chave da vitrine às 19h40 assinada por P. Nunes. Alguém além deles descobriu o código, que é a data de inauguração do ateliê. Priscila assinou a folha por hábito, sem pensar: é a aluna que toda semana retira a chave do depósito e está acostumada a escrever o nome.",
   "lado_afirmacao": "A",
   "lado_prova": "ambos"
  }
 ],
 "acusacao": {
  "culpado": "priscila",
  "perguntas_finais": [
   {
    "pergunta": "Como o vaso saiu da vitrine?",
    "opcoes": [
     "O vidro foi quebrado e remendado depois",
     "Alguém retirou a chave do armário usando o código e abriu a vitrine",
     "Gil usou a cópia da chave que guardava no boné"
    ],
    "correta": 1,
    "explicacao": "O registro de retirada mostra a chave da vitrine pega às 19h40 por P. Nunes, e o código do armário é a data de inauguração, que consta no convite e na festa."
   },
   {
    "pergunta": "Por que o vaso foi levado?",
    "opcoes": [
     "Para vender o original a um colecionador, deixando uma réplica",
     "Por vingança contra o professor",
     "Para usar como peça de uma exposição concorrente"
    ],
    "correta": 0,
    "explicacao": "A conversa no tablet fala de 'réplica pronta' e de levar 'o original' às 20h para um colecionador."
   }
  ]
 },
 "dicas": {
  "A": [
   "Você tem a foto da vitrine, o convite e o mural. Algum desses detalhes pode ser útil para o seu parceiro.",
   "Se Otávio se recusa a falar, ele quer saber algo sobre o ateliê que seu parceiro pode ter visto na sala de queima."
  ],
  "B": [
   "O tablet da bancada guarda segredos. A dica da tela de bloqueio fala de um animal.",
   "Priscila disse onde estava às 18h30. Confira se a história bate com o que seu parceiro descobrir."
  ],
  "geral": [
   "O armário de chaves usa dia e mês. Cada um de vocês viu um deles em uma imagem diferente."
  ]
 },
 "final": {
  "acerto": "Mandado expedido! Priscila Nunes copiou o código do armário (a data de inauguração), retirou a chave da vitrine às 19h40 e assinou a folha por hábito, sem pensar, e combinou a entrega do original a um colecionador, deixando uma réplica pronta. O Vaso Lua de Barro foi recuperado antes da entrega.",
  "erro": "A acusação não se sustenta. Revisem juntos a conversa do tablet e o registro de retirada de chaves: eles apontam para quem pegou a chave e quando."
 }
});
