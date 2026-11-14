/* Casos rápidos: dados (vieram de casos_rapidos.json). Os palpites do parceiro ficam guardados para o modo Parceiro. */
const RQC=[
 {
  "id": "r1",
  "tipo": "rapido",
  "titulo": "O Bolo Desaparecido",
  "cenario": {
   "local": "Confeitaria Doce Vida, dia do concurso Bolo de Ouro",
   "horario_do_crime": "entre 14h e 14h30",
   "resumo": "O bolo de morango com pimenta-rosa de Dona Cecília, favorito do concurso, sumiu da mesa de exposição meia hora antes do julgamento das 15h."
  },
  "abertura_chefe": "O julgamento é às 15h e o bolo favorito sumiu. Três pessoas estavam na confeitaria. Descubra quem levou e onde está o bolo.",
  "suspeitos": [
   {
    "id": "rogerio",
    "nome": "Rogério Tavares",
    "idade": 45,
    "papel": "Confeiteiro rival",
    "aparencia": "Bigode fino, avental AZUL (único avental azul da confeitaria), mãos com farinha",
    "perfil": "Competitivo e vaidoso. Acha o próprio bolo o melhor da cidade."
   },
   {
    "id": "livia",
    "nome": "Lívia Prado",
    "idade": 19,
    "papel": "Ajudante da Dona Cecília",
    "aparencia": "Cabelo preso, avental VERDE, tênis coloridos",
    "perfil": "Dedicada e nervosa. Teme ser acusada por ter saído."
   },
   {
    "id": "helio",
    "nome": "Hélio Matos",
    "idade": 62,
    "papel": "Jurado do concurso",
    "aparencia": "Terno cinza, óculos redondos, caderneta de notas",
    "perfil": "Pontual e gentil. Adora doce de morango."
   }
  ],
  "interrogatorio": {
   "rogerio": [
    {
     "pergunta": "Onde você estava entre 14h e 14h30?",
     "resposta": "Na cozinha dos fundos, onde os concorrentes têm bancada, de avental e tudo, vigiando meu bolo no forno. Não saí de lá até as 14h40, juro por todas as colheres.",
     "registra_afirmacao": "A1"
    },
    {
     "pergunta": "Você conhece o bolo da Cecília?",
     "resposta": "Todo mundo conhece. Morango com pimenta-rosa. Bonito, mas o meu é melhor."
    }
   ],
   "livia": [
    {
     "pergunta": "Onde você estava?",
     "resposta": "Fui ao mercadinho da esquina porque acabou o granulado. Saí perto das 14h e voltei umas 14h35. Quando voltei, a mesa já estava vazia!"
    },
    {
     "pergunta": "A Cecília era dura com você?",
     "resposta": "Ela é rigorosa, mas me ensinou tudo. Eu nunca faria isso. Só fiquei com medo de ser acusada por ter saído."
    }
   ],
   "helio": [
    {
     "pergunta": "Quando o senhor chegou?",
     "resposta": "Às 14h50, pontualíssimo. Assinei o livro de visitas na entrada."
    },
    {
     "pergunta": "Viu algo estranho?",
     "resposta": "Senti cheiro de morango no corredor dos fundos, perto da despensa. Achei que fosse da cozinha.",
     "libera_prova": "p4"
    }
   ]
  },
  "provas": [
   {
    "id": "p1",
    "nome": "Recibo do mercadinho",
    "descricao": "Recibo de granulado colorido, carimbado 14h12, achado na bolsa da Lívia.",
    "ilustracao_nova": "Papel de recibo térmico amassado ao lado de um saquinho de granulado colorido",
    "disponivel": "inicio"
   },
   {
    "id": "p2",
    "nome": "Livro de visitas",
    "descricao": "Hélio assinou a entrada às 14h50.",
    "ilustracao_nova": "Livro aberto com caneta presa por um barbante e assinatura em cursiva",
    "disponivel": "inicio"
   },
   {
    "id": "p3",
    "nome": "Registro da câmera do corredor",
    "descricao": "14h18: pessoa de avental azul, com bandeja coberta por pano, entra no corredor dos fundos.",
    "ilustracao_nova": "Quadro de câmera em preto e branco com uma figura de avental azul de costas",
    "disponivel": "apos_primeiro_interrogatorio"
   },
   {
    "id": "p4",
    "nome": "Caixa da despensa",
    "descricao": "Dentro de uma caixa de forminhas está o bolo de morango, intacto, com um pano azul por cima.",
    "ilustracao_nova": "Caixa de papelão aberta com o bolo rosa escondido sob um pano azul",
    "disponivel": "apos_p4_liberada_por_helio"
   }
  ],
  "contradicao": {
   "suspeito": "rogerio",
   "afirmacao": "A1",
   "prova": "p3",
   "explicacao": "Rogério disse que não saiu da cozinha até 14h40, mas a câmera mostra alguém de avental azul no corredor às 14h18. Só ele usa avental azul."
  },
  "solucao": {
   "culpado": "rogerio",
   "motivo": "Queria ganhar o Bolo de Ouro.",
   "como": "Aproveitou a saída da Lívia, levou o bolo e escondeu na despensa para devolver só depois do julgamento."
  },
  "dicas": [
   "Compare o horário que cada um diz com o que as provas mostram.",
   "Só uma pessoa usava avental azul naquele dia."
  ],
  "palpites_parceiro": [
   {
    "id": "pa",
    "quando": "apos_abrir_caderno",
    "aponta_para": "livia",
    "correto": false,
    "texto": {
     "marcos": "Meu faro de sabujo diz que foi a ajudante. Quem sai na hora do crime é sempre a ajudante. Está escrito em algum lugar, tenho certeza. Não sei onde, mas tenho.",
     "beatriz": "Ela sumiu justo na hora... Deixa que eu ilumino: só pode ter sido a Lívia, não é?"
    }
   },
   {
    "id": "pb",
    "quando": "apos_p3",
    "aponta_para": "rogerio",
    "correto": true,
    "texto": {
     "marcos": "Avental azul! Meu faro nunca falha. Foi o Rogério. E eu cheguei nele antes, tá? Anota aí a hora.",
     "beatriz": "Faísca acesa! Avental azul, e só um dono. É o Rogério."
    }
   }
  ],
  "final": {
   "acerto": "O bolo voltou à mesa às 14h58. Dona Cecília ganhou o Bolo de Ouro, e Rogério foi desclassificado.",
   "erro": "Sem a prova certa, o bolo só apareceu depois do julgamento. Releia a câmera e as falas."
  }
 },
 {
  "id": "r2",
  "tipo": "rapido",
  "titulo": "O Relógio da Praça",
  "cenario": {
   "local": "Praça do Pelicano, na véspera da inauguração do relógio reformado",
   "horario_do_crime": "quinta-feira à noite",
   "resumo": "O relógio da torre, orgulho do bairro, parou na quinta à noite. A engrenagem de bronze original sumiu da torre."
  },
  "abertura_chefe": "O relógio da praça parou e a engrenagem original desapareceu. Três pessoas conhecem bem aquela torre. Quem mexeu nela?",
  "suspeitos": [
   {
    "id": "ze",
    "nome": "Zé Carlão",
    "idade": 58,
    "papel": "Zelador da praça",
    "aparencia": "Boné azul, macacão cinza, chaveiro enorme",
    "perfil": "Carinhoso com a torre. Fala alto e conta histórias."
   },
   {
    "id": "marlene",
    "nome": "Marlene Gomes",
    "idade": 41,
    "papel": "Vendedora de sorvete",
    "aparencia": "Touca branca, carrinho colorido, celular sempre na mão",
    "perfil": "Simpática e observadora. Posta fotos da praça todo dia."
   },
   {
    "id": "paulo",
    "nome": "Paulo Ribeiro",
    "idade": 50,
    "papel": "Mestre de obras da reforma",
    "aparencia": "CAPACETE AMARELO, colete laranja, prancheta",
    "perfil": "Apressado e vago. Odeia dar explicações."
   }
  ],
  "interrogatorio": {
   "ze": [
    {
     "pergunta": "Quem tem a chave da torre?",
     "resposta": "Eu, mas o livro e a chave ficam na guarita, que a equipe da obra também usa, e tudo é anotado no livro. Na quinta saí às 17h30 porque meu neto tinha dentista. Pergunta pra quem quiser!"
    },
    {
     "pergunta": "O que o relógio significa para o senhor?",
     "resposta": "É a minha vida. Se fosse eu quem quebrou, eu me jogava no chafariz."
    }
   ],
   "marlene": [
    {
     "pergunta": "Viu algo na praça na quinta?",
     "resposta": "Vi o Zé fechando o portão cedo, umas 17h30. À noite tirei uma foto da torre acesa para o meu perfil de sorvete.",
     "libera_prova": "p3"
    },
    {
     "pergunta": "Quem usa capacete amarelo?",
     "resposta": "Só o pessoal da obra. O Zé usa boné, e eu, touca de sorveteira.",
     "libera_prova": "p4"
    }
   ],
   "paulo": [
    {
     "pergunta": "Quando o senhor subiu na torre pela última vez?",
     "resposta": "Terça-feira. Desde então só dei ordens aqui de baixo, por rádio.",
     "registra_afirmacao": "A1"
    },
    {
     "pergunta": "Por que a inauguração está atrasada?",
     "resposta": "Imprevistos de obra. Peças atrasam, é normal. Eu não tenho culpa de nada."
    }
   ]
  },
  "provas": [
   {
    "id": "p1",
    "nome": "Livro de chaves",
    "descricao": "Quinta, 17h50: chave da torre retirada da guarita, com assinatura borrada começando com P. Devolvida às 19h10.",
    "ilustracao_nova": "Livro de chaves com linha manuscrita e um P borrado",
    "disponivel": "inicio"
   },
   {
    "id": "p2",
    "nome": "Folha de ponto do Zé",
    "descricao": "Zé bateu o ponto de saída às 17h30 na quinta.",
    "ilustracao_nova": "Cartão de ponto com carimbo 17:30",
    "disponivel": "inicio"
   },
   {
    "id": "p3",
    "nome": "Foto da Marlene",
    "descricao": "Quinta, 18h07: janela da torre acesa e um homem de capacete amarelo.",
    "ilustracao_nova": "Foto de celular da torre à noite, silhueta com capacete amarelo na janela",
    "disponivel": "apos_marlene_q1"
   },
   {
    "id": "p4",
    "nome": "Nota da loja de antiguidades",
    "descricao": "Venda de peça de bronze de relógio antigo, comprada pelo antiquário de Ribeiro Obras, na sexta de manhã.",
    "ilustracao_nova": "Nota fiscal amarelada com timbre de antiquário",
    "disponivel": "apos_marlene_q2"
   }
  ],
  "contradicao": {
   "suspeito": "paulo",
   "afirmacao": "A1",
   "prova": "p3",
   "explicacao": "Paulo disse que não subiu na torre desde terça, mas a foto de quinta às 18h07 mostra um homem de capacete amarelo na janela. Só o pessoal da obra usa capacete amarelo."
  },
  "solucao": {
   "culpado": "paulo",
   "motivo": "Vendeu a engrenagem original para um antiquário e precisava esconder que a reforma não foi feita.",
   "como": "Subiu na quinta com a chave, retirou a peça e parou o relógio para adiar a inauguração."
  },
  "dicas": [
   "Quem estava na torre quando o relógio parou?",
   "Veja quem usa o que na praça: boné, touca ou capacete."
  ],
  "palpites_parceiro": [
   {
    "id": "pa",
    "quando": "apos_abrir_caderno",
    "aponta_para": "ze",
    "correto": false,
    "texto": {
     "marcos": "O zelador, claro. Quem tem o chaveiro maior é sempre suspeito. Meu faro nunca falha, só às vezes demora.",
     "beatriz": "O Zé vive naquela torre, deve ter visto tudo... ou feito tudo!"
    }
   },
   {
    "id": "pb",
    "quando": "apos_p3",
    "aponta_para": "paulo",
    "correto": true,
    "texto": {
     "marcos": "Capacete amarelo! Quem usa isso numa torre? O mestre de obras. Eu já suspeitava, tá? Desde o café da manhã.",
     "beatriz": "Faísca acesa! Capacete amarelo na janela. Só tem um dono: Paulo."
    }
   }
  ],
  "final": {
   "acerto": "A engrenagem foi recuperada no antiquário. O relógio voltou a bater na sexta, com o bairro inteiro na praça.",
   "erro": "Ainda faltou ligar o capacete amarelo à janela da torre. Veja de novo a foto e o que o Paulo disse."
  }
 },
 {
  "id": "r3",
  "tipo": "rapido",
  "titulo": "O Livro Raro",
  "cenario": {
   "local": "Biblioteca Municipal, sala de obras raras",
   "horario_do_crime": "quinta-feira à noite",
   "resumo": "O Atlas dos Mares, de 1790, sumiu da vitrine da sala de obras raras. Ninguém arrombou nada."
  },
  "abertura_chefe": "Um atlas de mais de duzentos anos sumiu sem sinal de arrombamento. Três pessoas têm motivo para estar por perto. Descubra quem o levou.",
  "suspeitos": [
   {
    "id": "berta",
    "nome": "Dona Berta",
    "idade": 57,
    "papel": "Bibliotecária",
    "aparencia": "Cabelo grisalho em coque, cardigã vinho, óculos na corrente",
    "perfil": "Organizada e preocupada. Cuida da biblioteca como da própria casa."
   },
   {
    "id": "caio",
    "nome": "Caio Duarte",
    "idade": 20,
    "papel": "Estudante pesquisador",
    "aparencia": "Mochila grande, fone no pescoço, moletom",
    "perfil": "Nervoso e agitado. Tem prova na semana."
   },
   {
    "id": "alvaro",
    "nome": "Prof. Álvaro Siqueira",
    "idade": 54,
    "papel": "Professor de História",
    "aparencia": "Blazer de veludo, gravata borboleta, pasta de couro",
    "perfil": "Educado e cheio de títulos. Fala bonito, mas escapa das perguntas."
   }
  ],
  "interrogatorio": {
   "berta": [
    {
     "pergunta": "Quem pode entrar na sala de obras raras?",
     "resposta": "Só pesquisadores credenciados e eu. O cartão registra tudo, mas a impressora do registro estava quebrada, só consegui imprimir hoje de manhã."
    },
    {
     "pergunta": "Quando percebeu o sumiço?",
     "resposta": "Sexta, às 9h, ao abrir. A vitrine estava aberta, sem arrombamento."
    }
   ],
   "caio": [
    {
     "pergunta": "Onde você estava quinta à noite?",
     "resposta": "No café da biblioteca, estudando até tarde. Estou nervoso porque tenho prova, só isso."
    },
    {
     "pergunta": "Conhece o Atlas dos Mares?",
     "resposta": "Vi na vitrine, mas nunca toquei. Uso só a cópia digital."
    }
   ],
   "alvaro": [
    {
     "pergunta": "Quando o senhor esteve na biblioteca?",
     "resposta": "Só na quarta. Na quinta dei aula e jantei em casa.",
     "registra_afirmacao": "A1"
    },
    {
     "pergunta": "O que o senhor pesquisa?",
     "resposta": "Mapas antigos, mas só cópias digitais. O original é frágil demais para mim.",
     "libera_prova": "p4"
    }
   ]
  },
  "provas": [
   {
    "id": "p1",
    "nome": "Registro de acesso da sala",
    "descricao": "Quinta, 19h05 a 19h30: credencial nº 7, Prof. Álvaro Siqueira.",
    "ilustracao_nova": "Folha impressa com linhas de horário e uma linha destacada",
    "disponivel": "apos_berta_q1"
   },
   {
    "id": "p2",
    "nome": "Gravação do café",
    "descricao": "Câmera do café mostra Caio estudando das 19h às 20h30.",
    "ilustracao_nova": "Quadro de câmera de um café com um estudante entre livros",
    "disponivel": "inicio"
   },
   {
    "id": "p3",
    "nome": "Escala de Dona Berta",
    "descricao": "Quinta, 18h30 às 20h: clube do livro com 12 pessoas, dirigido por Berta.",
    "ilustracao_nova": "Cartaz do clube do livro com horário",
    "disponivel": "inicio"
   },
   {
    "id": "p4",
    "nome": "Bilhete do leilão",
    "descricao": "Encontrado na pasta do professor: 'Leilão Boreal: entrega do Atlas dos Mares no sábado', assinado A.S.",
    "ilustracao_nova": "Papel dobrado saindo de uma pasta de couro, com letra inclinada",
    "disponivel": "apos_alvaro_q2"
   }
  ],
  "contradicao": {
   "suspeito": "alvaro",
   "afirmacao": "A1",
   "prova": "p1",
   "explicacao": "O professor disse que só esteve na biblioteca na quarta, mas o registro mostra a credencial nº 7, dele, na sala rara quinta às 19h05."
  },
  "solucao": {
   "culpado": "alvaro",
   "motivo": "Vendeu o Atlas para um leilão particular.",
   "como": "Usou a própria credencial de pesquisador, abriu a vitrine e saiu com o livro na pasta de couro."
  },
  "dicas": [
   "O registro de acesso diz quem entrou na sala e quando.",
   "Compare o que o professor disse com o horário do registro."
  ],
  "palpites_parceiro": [
   {
    "id": "pa",
    "quando": "apos_abrir_caderno",
    "aponta_para": "caio",
    "correto": false,
    "texto": {
     "marcos": "O estudante. Nervoso, jovem, perto de livro raro. Caso fechado, vamos tomar um café. Com bolo, de preferência.",
     "beatriz": "O Caio está suando mais que sorvete no sol. Aposto nele!"
    }
   },
   {
    "id": "pb",
    "quando": "apos_p1",
    "aponta_para": "alvaro",
    "correto": true,
    "texto": {
     "marcos": "Professor ensinando mentira, é? A credencial nº 7 é dele. Faro de sabujo, de novo. Alguém me dá um biscoito.",
     "beatriz": "Número 7 da sorte... pra gente. É o professor."
    }
   }
  ],
  "final": {
   "acerto": "O Atlas foi recuperado antes do leilão e voltou à vitrine. A biblioteca ganhou um sistema novo de registro.",
   "erro": "A resposta está no horário do registro de acesso. Compare com o que o professor disse."
  }
 },
 {
  "id": "r4",
  "tipo": "rapido",
  "titulo": "A Receita Roubada",
  "cenario": {
   "local": "Restaurante Sabor da Vovó, sábado depois do almoço",
   "horario_do_crime": "entre 15h e 15h50",
   "resumo": "O caderno com a receita secreta do molho da casa sumiu da gaveta da despensa. Ele voltou ao balcão 50 minutos depois, mas as folhas do molho estão com borda preta de fotocópia: alguém copiou a receita."
  },
  "abertura_chefe": "A receita do molho de Dona Nair é o segredo do restaurante. O caderno sumiu por 50 minutos e voltou copiado. Três pessoas estavam por perto. Descubra quem copiou.",
  "suspeitos": [
   {
    "id": "caiod",
    "nome": "Caio Dantas",
    "idade": 28,
    "papel": "Cozinheiro",
    "aparencia": "Touca branca, dólmã branco, tatuagem de colher no antebraço",
    "perfil": "Calmo e brincalhão. Vive reclamando que ninguém o deixa almoçar em paz."
   },
   {
    "id": "marisa",
    "nome": "Marisa Silveira",
    "idade": 24,
    "papel": "Garçonete",
    "aparencia": "Avental BORDÔ (único avental bordô do restaurante), rabo de cavalo, tênis branco",
    "perfil": "Simpática e rápida. Sorri muito, mesmo quando está nervosa."
   },
   {
    "id": "duarte",
    "nome": "Seu Duarte",
    "idade": 58,
    "papel": "Fornecedor de verduras",
    "aparencia": "Boné verde, camisa xadrez, caderneta de entregas no bolso",
    "perfil": "Pontual e falante. Adora contar o que viu na rua."
   }
  ],
  "interrogatorio": {
   "caiod": [
    {
     "pergunta": "Onde você estava entre 15h e 15h50?",
     "resposta": "Almoçando na lanchonete da esquina! Saí às 14h55 e só voltei às 15h50. É o único horário que me deixam respirar. Tenho o recibo no bolso.",
     "registra_afirmacao": "A0"
    },
    {
     "pergunta": "Quem pode mexer na gaveta da despensa?",
     "resposta": "A chave fica no quadro de chaves da cozinha, pendurada num gancho. Qualquer um que passe por lá pega, é só querer."
    }
   ],
   "marisa": [
    {
     "pergunta": "Onde você estava durante esse tempo?",
     "resposta": "No salão, o tempo todo! Mesa 4, mesa 6, café, conta. Não saí do salão nem um minutinho desde as 14h.",
     "registra_afirmacao": "A1"
    },
    {
     "pergunta": "Você conhece a receita do molho?",
     "resposta": "Ninguém conhece! Nem eu sei o que tem lá. Só sei que tem cheiro de tomate e de saudade.",
     "libera_prova": null
    }
   ],
   "duarte": [
    {
     "pergunta": "Quando o senhor entregou as verduras?",
     "resposta": "Às 15h10, certinho. Deixei as caixas na cozinha, assinei o recibo e fui embora. A cozinha estava vazia, nem o Caio estava."
    },
    {
     "pergunta": "O senhor viu algo estranho ao sair?",
     "resposta": "Vi sim! Quando fui pegar a caminhonete, vi a moça de avental bordô atravessando a rua, com pressa, segurando um envelope grande. Entrou na Copiadora Expressa, bem na esquina.",
     "libera_prova": "p4"
    }
   ]
  },
  "provas": [
   {
    "id": "p1",
    "nome": "Caderno de ponto da cozinha",
    "descricao": "Caio marcou saída às 14h55 e volta às 15h50.",
    "ilustracao_nova": "Folha de ponto de cozinha, manchada de molho, com os horários escritos a lápis",
    "disponivel": "inicio",
    "arquivo": "assets/provas/r4_p1_caderno_de_ponto.png"
   },
   {
    "id": "p2",
    "nome": "Recibo da lanchonete",
    "descricao": "Prato executivo, hora do pedido 15h02 e conta fechada às 15h40, no bolso de Caio.",
    "ilustracao_nova": "Recibo térmico de lanchonete ao lado de um palito de dente e um guardanapo dobrado",
    "disponivel": "inicio",
    "arquivo": "assets/provas/r4_p2_recibo_lanchonete.png"
   },
   {
    "id": "p3",
    "nome": "Caderno devolvido",
    "descricao": "As folhas do molho têm uma borda preta nas laterais, típica de fotocópia feita com a tampa aberta.",
    "ilustracao_nova": "Caderno de capa de tecido xadrez aberto na receita, com borda escura nas laterais da folha",
    "disponivel": "inicio",
    "arquivo": "assets/provas/r4_p3_caderno_devolvido.png"
   },
   {
    "id": "p4",
    "nome": "Recibo da Copiadora Expressa",
    "descricao": "15h22: 38 cópias, pagas em dinheiro. O papel traz o nome 'M. Silveira' escrito à mão no campo 'cliente'.",
    "ilustracao_nova": "Recibo de copiadora com carimbo do horário e nome escrito à caneta, ao lado de um clipe bordô",
    "disponivel": "apos_duarte_falar",
    "arquivo": "assets/provas/r4_p4_recibo_copiadora.png"
   },
   {
    "id": "p5",
    "nome": "Câmera da rua em frente",
    "descricao": "15h21: uma pessoa de avental bordô atravessa a rua com um envelope grande e entra na copiadora. 15h31: volta pelo mesmo caminho.",
    "ilustracao_nova": "VIDEO curto (6 s) em preto e branco de câmera de rua, com horário no canto",
    "video": "r4_camera_rua.mp4",
    "disponivel": "apos_p4",
    "arquivo": "assets/provas/r4_camera_rua.mp4",
    "miniatura": "assets/provas/r4_camera_rua.png"
   }
  ],
  "contradicao": {
   "suspeito": "marisa",
   "afirmacao": "A1",
   "prova": "p4",
   "explicacao": "Marisa disse que não saiu do salão desde as 14h, mas o recibo da copiadora às 15h22 está no nome dela e a câmera da rua mostra o avental bordô, que só ela usa."
  },
  "solucao": {
   "culpado": "marisa",
   "motivo": "Uma prima dela vai abrir um restaurante e pediu a receita do molho.",
   "como": "Pegou a chave no quadro quando Caio saiu para almoçar, tirou o caderno da gaveta, copiou as folhas na copiadora da esquina e devolveu o caderno ao balcão."
  },
  "dicas": [
   "Compare o horário que cada um diz com o que as provas mostram.",
   "Só uma pessoa usava avental bordô naquele dia.",
   "Caio tem um recibo que cobre o horário todo dele."
  ],
  "palpites_parceiro": [
   {
    "id": "pa",
    "quando": "apos_abrir_caderno",
    "aponta_para": "caiod",
    "correto": false,
    "texto": {
     "marcos": "O cozinheiro! Quem mais mexe na cozinha? Meu faro de sabujo nunca falha. Não que ele falhe muito... só às vezes.",
     "beatriz": "Foi na cozinha, então só pode ter sido o Caio. Faísca acesa!"
    }
   },
   {
    "id": "pb",
    "quando": "apos_p4",
    "aponta_para": "marisa",
    "correto": true,
    "texto": {
     "marcos": "Avental bordô e recibo no nome dela! Eu desconfiava desde o começo. Anota aí que eu falei.",
     "beatriz": "Aquela garçonete sorridente demais... Foi a Marisa, e a prova está no papel."
    }
   }
  ],
  "final": {
   "acerto": "Marisa confessou. O caderno ficou com Dona Nair, e a prima de Marisa não abriu o restaurante com o molho.",
   "erro": "Sem a prova certa, a receita já estava nas mãos de outra cozinha. Releia o que cada um disse e o recibo da copiadora."
  }
 }
];
