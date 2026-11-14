/* Casos exclusivos da Corrida competitiva (formato dos casos rápidos). Dados vindos de corrida_v1..v3.json. */
window.VSC=window.VSC||[];
(function(){const L=[
 {
  "id": "v1",
  "tipo": "corrida",
  "titulo": "O Lote do Vento Sul",
  "duracao_min": 8,
  "cenario": {
   "local": "Cais de pesca, madrugada do leilão de lagostas",
   "horario_do_crime": "entre 5h e 5h40",
   "resumo": "A caixa térmica azul com 40 kg de lagostas, o lote mais caro do leilão das 6h, sumiu do convés do barco Vento Sul enquanto o mestre inscrevia o lote."
  },
  "abertura_chefe": "O leilão começa às 6h e a caixa do lote 12 desapareceu do convés. Quatro pessoas circulavam pelo cais. Descubra quem levou.",
  "suspeitos": [
   {
    "id": "otavio",
    "nome": "Otávio Brandão",
    "idade": 52,
    "papel": "Mestre e dono do barco",
    "aparencia": "Capa de chuva AMARELA, boné cinza, barba grisalha por fazer, cicatriz na mão esquerda",
    "perfil": "Orgulhoso e endividado. Fala alto para esconder a preocupação."
   },
   {
    "id": "nilza",
    "nome": "Nilza Prates",
    "idade": 38,
    "papel": "Compradora de um restaurante",
    "aparencia": "Blusa verde, galochas pretas, cabelo preso em coque, bolsa grande de lona",
    "perfil": "Direta e apressada. Costuma conseguir o que quer pagando bem."
   },
   {
    "id": "zeca",
    "nome": "Zeca Lopes",
    "idade": 24,
    "papel": "Marinheiro do Vento Sul",
    "aparencia": "Jaqueta VERMELHA, gorro azul-marinho, fones de ouvido pendurados no pescoço, mãos calejadas",
    "perfil": "Simpático e brincalhão, mas anda de cara fechada desde que o salário atrasou."
   },
   {
    "id": "dalia",
    "nome": "Dália Monteiro",
    "idade": 45,
    "papel": "Fiscal do cais",
    "aparencia": "Colete laranja de fiscal, óculos de aro fino, prancheta sempre debaixo do braço, boné azul-escuro",
    "perfil": "Metódica e desconfiada. Anota tudo, de preferência duas vezes."
   }
  ],
  "interrogatorio": {
   "otavio": [
    {
     "pergunta": "Onde o senhor estava entre 5h e 5h40?",
     "resposta": "Na sala do leilão, inscrevendo o lote. Deixei a caixa azul coberta com a lona no convés e o Zeca dormindo na cabine.",
     "registra_afirmacao": "A2"
    },
    {
     "pergunta": "A caixa valia muito?",
     "resposta": "Quarenta quilos de lagosta, uns 18 mil no leilão. Não vou negar: estou com conta atrasada com o fornecedor, esse lote me salvava."
    },
    {
     "pergunta": "Alguém mexeu no carrinho do barco?",
     "resposta": "Ele fica no paiol, trancado, e a chave fica pendurada na cabine. Hoje cedo estava no convés, todo molhado. Eu não toquei nele.",
     "libera_prova": "p8"
    },
    {
     "pergunta": "Desconfia de alguém?",
     "resposta": "Da Nilza, ela queria o lote a qualquer preço. De quem dorme na minha cabine prefiro nem falar."
    }
   ],
   "nilza": [
    {
     "pergunta": "A que horas a senhora chegou ao cais?",
     "resposta": "Às 5h50, direto para o leilão. Antes disso eu estava abrindo meu restaurante, a dez quadras daqui.",
     "registra_afirmacao": "A3"
    },
    {
     "pergunta": "A senhora ofereceu dinheiro pelo lote?",
     "resposta": "Ofereci 4 mil pelo lote inteiro, ontem à tarde. O Otávio recusou. Foi negócio, não roubo."
    },
    {
     "pergunta": "Conhece a tripulação?",
     "resposta": "Só o Zeca. Ele me disse ontem que o patrão ainda ia se arrepender de recusar minha oferta."
    },
    {
     "pergunta": "A senhora costuma carregar peso?",
     "resposta": "Eu? Na minha bolsa só cabem as notas fiscais. Quarenta quilos eu pago para outro carregar."
    }
   ],
   "zeca": [
    {
     "pergunta": "Onde você estava entre 5h e 5h40?",
     "resposta": "Dormindo na cabine, de fones, no volume alto. Só acordei com o apito de abertura, às 5h45.",
     "registra_afirmacao": "A1"
    },
    {
     "pergunta": "Quem poderia carregar a caixa?",
     "resposta": "Sozinho ninguém. Quarenta quilos mais o gelo. Só com carrinho."
    },
    {
     "pergunta": "Como é sua relação com o mestre?",
     "resposta": "Ele me deve dois meses de salário. Mas sou leal ao barco, nunca faria nada contra o patrão."
    },
    {
     "pergunta": "Ouviu algo da cabine?",
     "resposta": "Nada. Quando durmo, durmo. Pergunte a qualquer um."
    }
   ],
   "dalia": [
    {
     "pergunta": "Quando começou o seu plantão?",
     "resposta": "Às 4h30, na portaria. Anoto todo mundo que entra no livro de entrada."
    },
    {
     "pergunta": "O que mais se movimenta no cais de madrugada?",
     "resposta": "Gelo, principalmente. A barraca de gelo abre às 5h e cada barra retirada é anotada no livro, com a assinatura de quem pegou.",
     "libera_prova": "p6"
    },
    {
     "pergunta": "Viu alguém levando uma caixa grande?",
     "resposta": "Não. Fico de costas para a doca, olhando para a portaria."
    },
    {
     "pergunta": "Quem passou pela portaria?",
     "resposta": "Só a Nilza, às 5h50. Os tripulantes dormem a bordo e não passam por aqui."
    }
   ]
  },
  "provas": [
   {
    "id": "p1",
    "nome": "Foto do convés",
    "descricao": "Convés do Vento Sul às 5h41: lona dobrada, um retângulo seco onde ficava a caixa e marcas de rodas molhadas indo até a popa.",
    "ilustracao_nova": "Foto noir do convés com a lona dobrada, retângulo seco nas tábuas e dois sulcos de rodas molhados",
    "disponivel": "inicio",
    "arquivo": "assets/provas/v1_p1.png"
   },
   {
    "id": "p2",
    "nome": "Bilhete da Nilza",
    "descricao": "Bilhete oferecendo R$ 4.000 em dinheiro pelo lote inteiro de lagostas antes do leilão, assinado por Nilza P.",
    "ilustracao_nova": "Bilhete manuscrito num cartão com clipe, assinatura legível",
    "disponivel": "inicio",
    "arquivo": "assets/provas/v1_p2.png"
   },
   {
    "id": "p3",
    "nome": "Aviso de cobrança",
    "descricao": "Aviso de R$ 6.800 em atraso do mestre Otávio com a Casa do Pescador, vencido há 60 dias.",
    "ilustracao_nova": "Folha de cobrança com carimbo de ATRASADO em vermelho",
    "disponivel": "inicio",
    "arquivo": "assets/provas/v1_p3.png"
   },
   {
    "id": "p4",
    "nome": "Quadro do leilão",
    "descricao": "Quadro de giz: apito de abertura 5h45, leilão às 6h, lote 12: Vento Sul, 40 kg de lagostas.",
    "ilustracao_nova": "Lousa verde com giz branco listando horários e lotes",
    "disponivel": "inicio",
    "arquivo": "assets/provas/v1_p4.png"
   },
   {
    "id": "p5",
    "nome": "Livro de entrada da portaria",
    "descricao": "Entradas: Dália (plantão) 4h30; Nilza Prates 5h50, leilão; Sr. Anselmo 5h58, comprador.",
    "ilustracao_nova": "Livro de registro com colunas de hora, nome e motivo",
    "disponivel": "apos_primeiro_interrogatorio",
    "arquivo": "assets/provas/v1_p5.png"
   },
   {
    "id": "p6",
    "nome": "Livro de gelo da barraca",
    "descricao": "5h05 Vento Sul, 2 barras, O. Brandão; 5h14 Sereia, 3 barras, R. Alves; 5h22 Vento Sul, 1 barra, Z. Lopes; 5h31 Gaivota, 2 barras, M. Faria.",
    "ilustracao_nova": "Livro de registro de gelo com assinaturas e uma linha destacada",
    "disponivel": "apos_p6_liberada_por_dalia",
    "arquivo": "assets/provas/v1_p6.png"
   },
   {
    "id": "p7",
    "nome": "Ficha de inscrição do leilão",
    "descricao": "Lote 12 do Vento Sul, responsável O. Brandão: carimbo de entrada às 5h12 e carimbo de conferência às 5h38.",
    "ilustracao_nova": "Ficha com dois carimbos de hora",
    "disponivel": "apos_primeiro_interrogatorio",
    "arquivo": "assets/provas/v1_p7.png"
   },
   {
    "id": "p8",
    "nome": "Carrinho do paiol",
    "descricao": "Carrinho de duas rodas achado no convés, molhado, com pedaços de gelo ainda derretendo e uma pinça de lagosta caída.",
    "ilustracao_nova": "Foto do carrinho azul junto à amurada, poça e gelo derretendo",
    "disponivel": "apos_p8_liberada_por_otavio",
    "arquivo": "assets/provas/v1_p8.png"
   }
  ],
  "contradicao": {
   "suspeito": "zeca",
   "afirmacao": "A1",
   "prova": "p6",
   "explicacao": "Zeca disse que dormiu na cabine até as 5h45, mas o livro de gelo mostra a assinatura Z. Lopes às 5h22 retirando uma barra de gelo, bem na hora em que a caixa sumiu."
  },
  "solucao": {
   "culpado": "zeca",
   "motivo": "Estava com dois meses de salário atrasado e queria se vingar do mestre, vendendo o lote por fora.",
   "como": "Quando o Otávio saiu para inscrever o lote, Zeca levou a caixa no carrinho do paiol, comprou gelo às 5h22 para manter as lagostas frias e escondeu o lote antes de fingir que dormia."
  },
  "dicas": [
   "Compare o que cada um diz com os horários nos registros do cais.",
   "Dois dos suspeitos têm motivo, mas os registros mostram onde eles estavam.",
   "Veja quem assinou o livro de gelo e que horas eram."
  ]
 },
 {
  "id": "v2",
  "tipo": "corrida",
  "titulo": "O Diário Fora da Vitrine",
  "duracao_min": 10,
  "cenario": {
   "local": "Biblioteca universitária, sala de Coleções Raras, noite de abertura de exposição",
   "horario_do_crime": "entre 19h15 e 19h35",
   "resumo": "O diário de campo de Dona Aurélia, peça central da exposição que abre às 20h, desapareceu da mesa de leitura da sala trancada de Coleções Raras."
  },
  "abertura_chefe": "A exposição abre às 20h e a peça principal sumiu de uma sala que só se abre com cartão. Quatro pessoas tinham motivo ou oportunidade. Descubra quem levou o diário.",
  "suspeitos": [
   {
    "id": "esmeralda",
    "nome": "Profa. Esmeralda Bastos",
    "idade": 58,
    "papel": "Orientadora e curadora da exposição",
    "aparencia": "Cardigã roxo, coque grisalho, óculos pendurados numa correntinha, broche de coruja",
    "perfil": "Elegante e exigente. Fica irritada quando algo foge do cronograma."
   },
   {
    "id": "davi",
    "nome": "Davi Cunha",
    "idade": 26,
    "papel": "Doutorando",
    "aparencia": "Moletom cinza, mochila preta, cabelo raspado nas laterais com topete, relógio digital no pulso esquerdo",
    "perfil": "Brilhante e ansioso. Fala rápido quando está nervoso."
   },
   {
    "id": "irene",
    "nome": "Irene Tavares",
    "idade": 49,
    "papel": "Bibliotecária-chefe",
    "aparencia": "Blusa branca, crachá azul no pescoço, cabelo curto grisalho, sapatos bege silenciosos",
    "perfil": "Calma e precisa. Conhece cada porta e cada chave da biblioteca."
   },
   {
    "id": "mauro",
    "nome": "Mauro Pinheiro",
    "idade": 34,
    "papel": "Técnico de restauro",
    "aparencia": "Jaleco azul-claro, luvas brancas no bolso, barba curta, tatuagem de um livro aberto no antebraço",
    "perfil": "Cuidadoso e reservado. Só fala quando perguntam."
   }
  ],
  "interrogatorio": {
   "esmeralda": [
    {
     "pergunta": "Onde a senhora estava entre 19h e 19h40?",
     "resposta": "Na minha sala, corrigindo provas, até umas 19h20. Depois fui ao auditório ensaiar a abertura com os alunos.",
     "registra_afirmacao": "A2"
    },
    {
     "pergunta": "Sobre o e-mail que a senhora mandou à direção?",
     "resposta": "Escrevi com raiva, admito. Achava cedo demais para expor o diário. Mas ensaiei com doze alunos, o Tiago até postou uma foto do grupo.",
     "libera_prova": "p7"
    },
    {
     "pergunta": "O Davi é seu orientando?",
     "resposta": "Meu doutorando. Brilhante e ansioso. Anda dizendo que descobriu quem realmente escreveu o diário."
    },
    {
     "pergunta": "A senhora tem cartão da sala de Coleções Raras?",
     "resposta": "Não. Só entro com a Irene ou com o Mauro. Sou dessas que respeitam procedimento."
    }
   ],
   "davi": [
    {
     "pergunta": "Onde você estava entre 19h e 19h40?",
     "resposta": "No laboratório 3, imprimindo e revisando capítulo. Nem cheguei perto da sala de Coleções Raras hoje. Minha pesquisa usa só a cópia digital.",
     "registra_afirmacao": "A1"
    },
    {
     "pergunta": "Qual é o seu interesse no diário?",
     "resposta": "Minha tese. A autoria do diário é o capítulo central. Mas tudo o que preciso são as fotografias digitais."
    },
    {
     "pergunta": "Quando soube do desaparecimento?",
     "resposta": "Quando o alarme tocou, perto de 19h40. Saí correndo do laboratório."
    },
    {
     "pergunta": "O que acha do Mauro?",
     "resposta": "Do restauro. Cheio de manias, sempre de luvas. Não sei o que ele faz lá embaixo."
    }
   ],
   "irene": [
    {
     "pergunta": "O que a senhora fez hoje à noite na sala?",
     "resposta": "Fechei a sala às 18h30 e só voltei às 19h35. Vi a mesa de leitura vazia e chamei todo mundo.",
     "registra_afirmacao": "A3"
    },
    {
     "pergunta": "Como funciona o acesso à sala?",
     "resposta": "Só por cartão pessoal. Cada entrada e saída fica no registro eletrônico, com nome e hora. Posso mostrar.",
     "libera_prova": "p5"
    },
    {
     "pergunta": "Quem tem cartão?",
     "resposta": "Eu, o Mauro, o professor visitante D. Campos e alguns doutorandos autorizados, como o Davi. A porta é pesada, de mola, e só abre para uma pessoa por cartão."
    },
    {
     "pergunta": "O diário valia muito?",
     "resposta": "Para a biblioteca, é insubstituível. Para uns, é só papel. Para outros, uma carreira."
    }
   ],
   "mauro": [
    {
     "pergunta": "Onde o senhor estava entre 19h e 19h40?",
     "resposta": "Entrei na sala às 19h05 para ajustar a iluminação da vitrine. Saí às 19h15, porque faltava uma lâmpada. O diário estava na mesa quando saí.",
     "registra_afirmacao": "A4"
    },
    {
     "pergunta": "Tem como provar que o diário estava lá?",
     "resposta": "Tenho. Eu fotografo o exemplar a cada manuseio, com data e hora, na ficha de restauro.",
     "libera_prova": "p6"
    },
    {
     "pergunta": "Viu alguém no corredor?",
     "resposta": "Um rapaz de moletom cinza indo para o lado da sala, com um cartão na mão. Não olhei o relógio."
    },
    {
     "pergunta": "Achou algo depois do alarme?",
     "resposta": "Na lixeira do corredor, um rascunho amassado, com letra que me pareceu do Davi.",
     "libera_prova": "p8"
    }
   ]
  },
  "provas": [
   {
    "id": "p1",
    "nome": "Cartaz da exposição",
    "descricao": "Abertura hoje às 20h no auditório. Vitrine da sala de Coleções Raras aberta à visitação a partir das 19h. Ensaio da abertura no auditório das 19h20 às 19h55, com a Profa. Esmeralda.",
    "ilustracao_nova": "Cartaz sóbrio de exposição com programação",
    "disponivel": "inicio",
    "arquivo": "assets/provas/v2_p1.png"
   },
   {
    "id": "p2",
    "nome": "E-mail impresso da Esmeralda",
    "descricao": "E-mail de E. Bastos à direção pedindo para adiar a exposição e ameaçando retirar o nome do projeto.",
    "ilustracao_nova": "E-mail impresso com um trecho sublinhado à mão",
    "disponivel": "inicio",
    "arquivo": "assets/provas/v2_p2.png"
   },
   {
    "id": "p3",
    "nome": "Foto da mesa de leitura",
    "descricao": "Sala de Coleções Raras às 19h35: apoio de livro vazio, um par de luvas brancas, um marcador verde e uma lâmpada fora do soquete.",
    "ilustracao_nova": "Foto noir da mesa de leitura com apoio vazio e luvas",
    "disponivel": "inicio",
    "arquivo": "assets/provas/v2_p3.png"
   },
   {
    "id": "p4",
    "nome": "Registro de impressão do laboratório 3",
    "descricao": "19h04 e 19h41, d.cunha; 18h47 L. Tavares; 20h02 t.souza.",
    "ilustracao_nova": "Lista de impressões com duas linhas do d.cunha",
    "disponivel": "inicio",
    "arquivo": "assets/provas/v2_p4.png"
   },
   {
    "id": "p5",
    "nome": "Registro de acesso da sala",
    "descricao": "Entradas e saídas com nome e hora: D. Campos 18h05/18h25; I. Tavares 18h28/18h30; M. Pinheiro 19h05/19h15; D. Cunha 19h22/19h31; I. Tavares 19h35.",
    "ilustracao_nova": "Tabela do registro eletrônico da porta",
    "disponivel": "apos_p5_liberada_por_irene",
    "arquivo": "assets/provas/v2_p5.png"
   },
   {
    "id": "p6",
    "nome": "Ficha de restauro do Mauro",
    "descricao": "Foto de conferência do diário na mesa às 19h14, com anotação de estado: íntegro.",
    "ilustracao_nova": "Ficha de manuseio com a foto do livro e um carimbo de hora",
    "disponivel": "apos_p6_liberada_por_mauro",
    "arquivo": "assets/provas/v2_p6.png"
   },
   {
    "id": "p7",
    "nome": "Foto do ensaio no auditório",
    "descricao": "Foto às 19h27 com a Profa. Esmeralda e doze alunos no palco do auditório.",
    "ilustracao_nova": "Foto de palco com um grupo de silhuetas e uma mulher de cardigã roxo na frente",
    "disponivel": "apos_p7_liberada_por_esmeralda",
    "arquivo": "assets/provas/v2_p7.png"
   },
   {
    "id": "p8",
    "nome": "Rascunho da lixeira",
    "descricao": "Rascunho amassado: \"cap. 4: autoria do diário NÃO é da Aurélia. Provar antes de sexta.\"",
    "ilustracao_nova": "Papel amassado com anotações manuscritas",
    "disponivel": "apos_p8_liberada_por_mauro",
    "arquivo": "assets/provas/v2_p8.png"
   }
  ],
  "contradicao": {
   "suspeito": "davi",
   "afirmacao": "A1",
   "prova": "p5",
   "explicacao": "Davi disse que nem chegou perto da sala de Coleções Raras, mas o registro de acesso mostra D. Cunha entrando às 19h22 e saindo às 19h31, depois que o Mauro viu o diário na mesa às 19h14 e antes de a Irene encontrar a mesa vazia às 19h35."
  },
  "solucao": {
   "culpado": "davi",
   "motivo": "Queria o original para provar sua teoria sobre a autoria do diário e publicá-la antes de qualquer outra pessoa.",
   "como": "Imprimiu um capítulo às 19h04, entrou na sala às 19h22 com o próprio cartão, pegou o diário e voltou ao laboratório para imprimir de novo às 19h41, como se nunca tivesse saído."
  },
  "dicas": [
   "O diário estava na sala às 19h14 e já tinha sumido às 19h35.",
   "Duas impressões do Davi não provam que ele ficou o tempo todo no laboratório.",
   "Procure quem entrou na sala entre 19h15 e 19h35 e leia bem as iniciais."
  ]
 },
 {
  "id": "v3",
  "tipo": "corrida",
  "titulo": "A Lente do Refrator",
  "duracao_min": 12,
  "cenario": {
   "local": "Observatório municipal, noite de visitação com doadores",
   "horario_do_crime": "entre 21h10 e 21h40",
   "resumo": "A lente de 1892 do telescópio histórico desapareceu da vitrine da Sala do Refrator enquanto todos os convidados observavam o céu no terraço."
  },
  "abertura_chefe": "A lente centenária sumiu da vitrine durante a sessão de observação. A sala estava fechada e a noite estava escura. Descubra quem levou a lente.",
  "suspeitos": [
   {
    "id": "leopoldo",
    "nome": "Dr. Leopoldo Ramos",
    "idade": 63,
    "papel": "Diretor do observatório",
    "aparencia": "Jaleco bege, bigode branco, gravata-borboleta vinho, relógio de bolso",
    "perfil": "Cerimonioso e vaidoso. Adora ser aplaudido e odeia surpresas."
   },
   {
    "id": "isis",
    "nome": "Dra. Ísis Montenegro",
    "idade": 31,
    "papel": "Astrônoma",
    "aparencia": "Cabelo cacheado preso com um lápis, casaco verde-garrafa, cachecol laranja, lanterna de luz vermelha no pescoço",
    "perfil": "Entusiasta e distraída com tudo que não seja céu."
   },
   {
    "id": "teodoro",
    "nome": "Teodoro Brito",
    "idade": 47,
    "papel": "Zelador e eletricista",
    "aparencia": "Macacão azul, boné cinza, chaveiro enorme na cintura, óculos de armação preta grossa",
    "perfil": "Calado e desconfiado. Sabe todos os cantos do prédio."
   },
   {
    "id": "ofelia",
    "nome": "Ofélia Sampaio",
    "idade": 40,
    "papel": "Doadora da lente",
    "aparencia": "Vestido preto, xale cinza, brincos de pérola, luvas de couro marrom",
    "perfil": "Elegante e reservada. Fala devagar, como quem escolhe cada palavra."
   }
  ],
  "interrogatorio": {
   "leopoldo": [
    {
     "pergunta": "Onde o senhor estava entre 21h e 21h40?",
     "resposta": "No auditório, na minha palestra das 21h10 às 21h30 e, depois, cumprimentando os convidados. Tudo gravado, com microfone e câmera.",
     "registra_afirmacao": "A2"
    },
    {
     "pergunta": "A lente valia muito?",
     "resposta": "Duzentos anos de história. O seguro cobre dois milhões, e não pense que isso me interessa mais do que a lente."
    },
    {
     "pergunta": "Quem tinha as chaves da vitrine?",
     "resposta": "Duas chaves. Uma comigo, na direção. A outra está descrita no termo de doação, leia a cláusula.",
     "libera_prova": "p6"
    },
    {
     "pergunta": "Desconfia de alguém?",
     "resposta": "Do Teodoro, talvez. Some durante os eventos, e ninguém sabe onde."
    }
   ],
   "isis": [
    {
     "pergunta": "O que a senhora fazia durante a sessão?",
     "resposta": "Conduzia a fila do telescópio no terraço, das 21h05 às 21h35, sem parar. Vinte visitantes, noventa segundos cada.",
     "registra_afirmacao": "A3"
    },
    {
     "pergunta": "Como se confere isso?",
     "resposta": "Cada visitante assina a ficha de observação. Está comigo.",
     "libera_prova": "p7"
    },
    {
     "pergunta": "Viu a Sra. Ofélia na fila ou no terraço?",
     "resposta": "Não sei dizer. Usamos só luz vermelha para não ofuscar a vista, reconheci pouca gente."
    },
    {
     "pergunta": "Como estava o céu?",
     "resposta": "Escuríssimo. Sem Lua até tarde, perfeito para Saturno. Os visitantes adoraram."
    }
   ],
   "teodoro": [
    {
     "pergunta": "Onde o senhor estava durante a sessão?",
     "resposta": "No gerador dos fundos, conferindo, e depois nas luzes do jardim. Passei no gerador às 21h12 e às 21h38 e anotei.",
     "registra_afirmacao": "A4"
    },
    {
     "pergunta": "O senhor tem chave da vitrine?",
     "resposta": "Eu? Só as chaves gerais do prédio. A vitrine nunca foi comigo."
    },
    {
     "pergunta": "O guarda-volumes é seu posto?",
     "resposta": "Até as 20h30. Depois ele fica sem ninguém, cada um pega e deixa o ticket no relógio, que carimba a entrada e a saída.",
     "libera_prova": "p8"
    },
    {
     "pergunta": "Viu algo estranho?",
     "resposta": "A senhora do xale cinza saiu apressada pela porta lateral, perto das 21h50, com uma bolsa grande. Achei que tinha passado mal."
    }
   ],
   "ofelia": [
    {
     "pergunta": "Onde a senhora esteve entre 21h e 21h40?",
     "resposta": "No terraço, do começo ao fim da sessão, sozinha com o céu. A Lua nascendo lá no leste, enorme, atrás do bosque, foi o mais bonito da noite. Não entrei no prédio.",
     "registra_afirmacao": "A1"
    },
    {
     "pergunta": "A lente foi doação sua?",
     "resposta": "Doei em memória do meu pai. Doar não é crime."
    },
    {
     "pergunta": "A senhora tem chave da vitrine?",
     "resposta": "Tenho a reserva, por contrato, guardada em casa. Hoje nem a trouxe."
    },
    {
     "pergunta": "Por que saiu cedo?",
     "resposta": "Dor de cabeça. Voltei para casa às 21h50, o frio estava cortante."
    }
   ]
  },
  "provas": [
   {
    "id": "p1",
    "nome": "Programação da noite",
    "descricao": "20h recepção; 21h05 a 21h35 fila do telescópio com a Dra. Ísis; 21h10 a 21h30 palestra do Dr. Leopoldo; Sala do Refrator fechada ao público a partir das 21h.",
    "ilustracao_nova": "Programa elegante de evento com horários",
    "disponivel": "inicio",
    "arquivo": "assets/provas/v3_p1.png"
   },
   {
    "id": "p2",
    "nome": "Foto da vitrine vazia",
    "descricao": "Vitrine às 21h40: porta aberta sem marcas de arrombamento, veludo verde amassado e etiqueta \"Lente objetiva, 1892\".",
    "ilustracao_nova": "Foto noir da vitrine aberta com veludo verde e etiqueta",
    "disponivel": "inicio",
    "arquivo": "assets/provas/v3_p2.png"
   },
   {
    "id": "p3",
    "nome": "Guia do Céu da noite",
    "descricao": "Folheto entregue aos visitantes: Saturno ao sul às 21h; Marte a leste às 22h30; Lua: nasce às 23h10.",
    "ilustracao_nova": "Folheto com constelações e uma tabela de horários dos astros",
    "disponivel": "inicio",
    "arquivo": "assets/provas/v3_p3.png"
   },
   {
    "id": "p4",
    "nome": "Apólice de seguro",
    "descricao": "Seguro da lente: R$ 2.000.000, vigência até segunda, beneficiário: observatório.",
    "ilustracao_nova": "Folha de apólice com carimbo e valor em destaque",
    "disponivel": "inicio",
    "arquivo": "assets/provas/v3_p4.png"
   },
   {
    "id": "p5",
    "nome": "Registro do gerador",
    "descricao": "Rubricas de T.B. às 21h12 e às 21h38, leituras normais.",
    "ilustracao_nova": "Folha de leituras do gerador com horários e rubricas",
    "disponivel": "apos_primeiro_interrogatorio",
    "arquivo": "assets/provas/v3_p5.png"
   },
   {
    "id": "p6",
    "nome": "Termo de doação",
    "descricao": "Cláusula 5: a vitrine tem duas chaves, uma com a direção e uma reserva com a doadora, Sra. Ofélia Sampaio, para inspeções.",
    "ilustracao_nova": "Termo com cláusula destacada e assinaturas",
    "disponivel": "apos_p6_liberada_por_leopoldo",
    "arquivo": "assets/provas/v3_p6.png"
   },
   {
    "id": "p7",
    "nome": "Ficha de observação do telescópio",
    "descricao": "Vinte assinaturas de visitantes entre 21h05 e 21h35. O nome da Sra. Ofélia Sampaio não consta.",
    "ilustracao_nova": "Ficha numerada com assinaturas e horários",
    "disponivel": "apos_p7_liberada_por_isis",
    "arquivo": "assets/provas/v3_p7.png"
   },
   {
    "id": "p8",
    "nome": "Relógio do guarda-volumes",
    "descricao": "Ticket 047: bolsa grande de Ofélia S., entrada 20h05, saída 21h50.",
    "ilustracao_nova": "Ticket de guarda-volumes carimbado com horários",
    "disponivel": "apos_p8_liberada_por_teodoro",
    "arquivo": "assets/provas/v3_p8.png"
   }
  ],
  "contradicao": {
   "suspeito": "ofelia",
   "afirmacao": "A1",
   "prova": "p3",
   "explicacao": "Ofélia disse que passou a sessão no terraço vendo a Lua nascer, mas o Guia do Céu informa que a Lua só nasce às 23h10. A noite estava sem Lua, então ela inventou a cena."
  },
  "solucao": {
   "culpado": "ofelia",
   "motivo": "Queria a lente de volta para a própria coleção, e o seguro cobriria o prejuízo do observatório sem que ninguém desconfiasse dela.",
   "como": "Usou a chave reserva a que tinha direito pelo contrato, abriu a vitrine durante a sessão no terraço, escondeu a lente sob o xale, pôs na bolsa grande ao retirá-la do guarda-volumes às 21h50 e saiu pela porta lateral."
  },
  "dicas": [
   "Todos tinham álibi na sessão, menos um. Leia com atenção o que cada um conta.",
   "Uma das falas descreve algo do céu que não podia ser visto naquele horário.",
   "Veja o que o Guia do Céu diz sobre a Lua."
  ]
 }
];
L.forEach(c=>{c.final=c.final||{acerto:'O culpado foi identificado e o inquérito está encerrado. Bom trabalho, detetive!',erro:'Essa acusação não se sustenta.'};c.palpites_parceiro=c.palpites_parceiro||[];VSC.push(c);pvReg(c.id,c.provas)});
const B=PDX.victor,F=PDX.marta,mk=(b,o)=>Object.assign({},b,o),bg=['#2a3a40','#0b151c'];
PDX.rq_otavio=mk(B,{e:'narrow',n:'pointed',b:'straight',hc:'#b8bcc4',hs:'cap',sk:'#d9b793',sh:'#b99a7e',bg,deco:'',out:'tee',oc:'#e8c030',oc2:'#f2efe8',age:52,g:'',ex:['stubble','wr','capc:#8a8f98']});
PDX.rq_nilza=mk(F,{e:'round',n:'button',b:'arch',hc:'#4a2e1a',hs:'bun',sk:'#e2c4a6',sh:'#bc9c80',bg,deco:'',out:'sweater',oc:'#3f8a5a',oc2:'#f2efe8',age:38,g:'',ex:['smile']});
PDX.rq_zeca=mk(B,{e:'round',n:'button',b:'arch',hc:'#1c1a1a',hs:'cap',sk:'#c99a76',sh:'#a87752',bg,deco:'',out:'tee',oc:'#c0392b',oc2:'#f2efe8',age:24,g:'',ex:['capc:#1f2f55']});
PDX.rq_dalia=mk(F,{e:'narrow',n:'pointed',b:'straight',hc:'#2a1d14',hs:'cap',sk:'#e0bf9f',sh:'#b99a7e',bg,deco:'',out:'vest',oc:'#e8742a',oc2:'#f2efe8',age:45,g:'rect',ex:['wr','capc:#1f2a55']});
PDX.rq_esmeralda=mk(F,{e:'narrow',n:'pointed',b:'straight',hc:'#b8bcc4',hs:'bun',sk:'#e6c3a3',sh:'#c3a085',bg,deco:'',out:'sweater',oc:'#6b3f8a',oc2:'#f2efe8',age:58,g:'round',ex:['wr','pearl']});
PDX.rq_davi=mk(B,{e:'round',n:'button',b:'arch',hc:'#1c1a1a',hs:'swept',sk:'#e2c4a6',sh:'#bc9c80',bg,deco:'',out:'sweater',oc:'#8a8f98',oc2:'#3a3f48',age:26,g:'',ex:[]});
PDX.rq_irene=mk(F,{e:'round',n:'button',b:'arch',hc:'#b8bcc4',hs:'short',sk:'#e6c3a3',sh:'#c3a085',bg,deco:'',out:'sweater',oc:'#f2efe8',oc2:'#2c5aa0',age:49,g:'',ex:['lanyard','wr']});
PDX.rq_mauro=mk(B,{e:'narrow',n:'pointed',b:'straight',hc:'#4a2e1a',hs:'short',sk:'#e2c4a6',sh:'#bc9c80',bg,deco:'',out:'labcoat',oc:'#a8d4e8',oc2:'#f2efe8',age:34,g:'',ex:['stubble']});
PDX.rq_leopoldo=mk(B,{e:'round',n:'hooked',b:'arch',hc:'#ececf1',hs:'comb',sk:'#e6c3a3',sh:'#c3a085',bg,deco:'',out:'labcoat',oc:'#d8c9a0',oc2:'#7a2a35',age:63,g:'',ex:['mustache','wr']});
PDX.rq_isis=mk(F,{e:'round',n:'button',b:'arch',hc:'#3a2415',hs:'curly',sk:'#c99a76',sh:'#a87752',bg,deco:'',out:'blazer',oc:'#1f4a3a',oc2:'#e8742a',age:31,g:'',ex:['smile']});
PDX.rq_teodoro=mk(B,{e:'narrow',n:'pointed',b:'straight',hc:'#2a1d14',hs:'cap',sk:'#e0bf9f',sh:'#b99a7e',bg,deco:'',out:'uniform',oc:'#2c5aa0',oc2:'#f2efe8',age:47,g:'rect',ex:['stubble','capc:#8a8f98']});
PDX.rq_ofelia=mk(F,{e:'narrow',n:'pointed',b:'straight',hc:'#1c1a1a',hs:'long',sk:'#e6c3a3',sh:'#c3a085',bg,deco:'',out:'dress',oc:'#1b1b22',oc2:'#f2efe8',age:40,g:'',ex:['pearl','earrg']});
})();
