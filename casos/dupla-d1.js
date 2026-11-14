/* Dupla Online: caso d1 (criado pelo chat, instalado sem mudar o texto, exceto o tratamento “senhora” dirigido ao detetive). */
DCC.push({
 "id": "d1",
 "tipo": "dupla",
 "titulo": "O Colar do Hotel Mirante",
 "duracao_min": 35,
 "dificuldade": 3,
 "cenario": {
  "local": "Hotel Mirante, balneário de Pontal, litoral",
  "horario_do_crime": "Sábado, às 22h12, durante a festa dos 30 anos do hotel",
  "resumo": "O Colar Maré Alta, joia da fundadora Dona Ilda, ficou guardado no cofre do escritório da gerência desde as 19h30. Às 23h40 a gerente encontrou o cofre fechado e a caixa de veludo vazia, sem sinal de arrombamento. A festa lotava o salão e quase todos tinham álibi à primeira vista."
 },
 "abertura": {
  "A": "Detetive, aqui é o chefe. Hoje à noite sumiu o Colar Maré Alta do cofre do Hotel Mirante, durante a festa dos 30 anos. Você ficou com o lado da gerência e da governança: interrogue Helga Brandt, a gerente, e Denise Cardoso, a camareira-chefe. Você tem as fotos antigas do hotel, a escala da equipe e a foto do cofre. Seu parceiro cuida da recepção e dos hóspedes. Nada se resolve sozinho: troquem provas e falas.",
  "B": "Detetive, aqui é o chefe. Hoje à noite sumiu o Colar Maré Alta do cofre do Hotel Mirante, durante a festa dos 30 anos. Você ficou com a recepção e os hóspedes: interrogue Tobias Reis, o recepcionista da noite, e Cássio Ventura, hóspede e avaliador de joias. Você tem o laudo do colar e a foto do brinde da festa. Seu parceiro cuida da gerência e da governança. Nada se resolve sozinho: troquem provas e falas."
 },
 "suspeitos": [
  {
   "id": "helga",
   "nome": "Helga Brandt",
   "idade": 52,
   "papel": "Gerente do hotel",
   "aparencia": "Mulher alta, cabelo grisalho curto, blazer vinho, óculos de armação fina prateada e crachá dourado preso na lapela",
   "perfil": "Organizada, reservada e orgulhosa da própria equipe.",
   "dono": "A"
  },
  {
   "id": "denise",
   "nome": "Denise Cardoso",
   "idade": 44,
   "papel": "Camareira-chefe",
   "aparencia": "Mulher de estatura média, cabelo preto preso em rede, uniforme azul-claro com avental branco, chaveiro grande na cintura e tênis brancos",
   "perfil": "Observadora, direta e cansada de turnos longos.",
   "dono": "A"
  },
  {
   "id": "tobias",
   "nome": "Tobias Reis",
   "idade": 29,
   "papel": "Recepcionista da noite",
   "aparencia": "Rapaz esguio, cabelo castanho penteado para trás com gel, colete cinza, gravata azul-marinho e crachá com seu nome no peito",
   "perfil": "Educado demais, sorri muito e fala baixo.",
   "dono": "B"
  },
  {
   "id": "cassio",
   "nome": "Cássio Ventura",
   "idade": 61,
   "papel": "Hóspede e avaliador de joias",
   "aparencia": "Homem corpulento, cabelo branco cuidadosamente penteado, bigode fino, terno bege claro, lenço azul no bolso e anel de pedra verde",
   "perfil": "Elegante, falante e cheio de histórias de leilão.",
   "dono": "B"
  },
  {
   "id": "ilda",
   "nome": "Dona Ilda Mirante",
   "idade": 78,
   "papel": "Fundadora e dona do hotel",
   "aparencia": "Senhora baixinha, cabelo branco em coque, vestido verde-esmeralda, bengala de madeira clara e brincos de pérola",
   "perfil": "Doce, teimosa e muito apegada ao colar.",
   "dono": "ambos",
   "disponivel": "apos_helga_h2"
  }
 ],
 "fatos": [
  {
   "id": "f_perolas",
   "texto": "O colar tem 64 pérolas.",
   "aparece_em": "prova:p_laudo_colar",
   "dono": "B"
  },
  {
   "id": "f_veleiro",
   "texto": "O veleiro da inauguração do hotel se chama Albatroz.",
   "aparece_em": "prova:p_foto_inauguracao",
   "dono": "A"
  },
  {
   "id": "f_dupla_a",
   "texto": "Os dois primeiros dígitos de fábrica dos armários de achados são 47.",
   "aparece_em": "prova:p_manual_armarios",
   "dono": "A"
  },
  {
   "id": "f_dupla_b",
   "texto": "Os dois últimos dígitos do armário 12 são 29.",
   "aparece_em": "prova:p_caderno_turno",
   "dono": "B"
  },
  {
   "id": "f_cartao_tobias",
   "texto": "O cartão RECEP-02 é o do recepcionista da noite, Tobias.",
   "aparece_em": "prova:p_escala",
   "dono": "A"
  }
 ],
 "interrogatorio": {
  "helga": [
   {
    "id": "h1",
    "pergunta": "Onde a senhora estava às 22h12?",
    "resposta": "No palco do salão, fazendo o discurso dos 30 anos. Fiquei lá das 22h às 22h25.",
    "registra_afirmacao": "af_h1"
   },
   {
    "id": "h2",
    "pergunta": "Quem consegue abrir o cofre do escritório?",
    "requer_fato": {
     "id": "f_perolas",
     "pedido": "Só falo do cofre com quem entende o valor do que ele guarda. Quantas pérolas tem o Colar Maré Alta?",
     "tipo_entrada": "texto",
     "aceita": [
      "64",
      "sessenta e quatro",
      "64 pérolas",
      "sessenta e quatro pérolas"
     ],
     "erro": "Não é isso. Quem estudou o colar sabe contar as pérolas."
    },
    "resposta": "Só eu e Dona Ilda sabemos o código do cofre. O sistema registra cada abertura, vou liberar o relatório para vocês.",
    "registra_afirmacao": "af_h2",
    "libera_prova": "p_log_cofre"
   },
   {
    "id": "h3",
    "pergunta": "Mais alguém entra no escritório?",
    "resposta": "Ninguém. Só eu e Dona Ilda temos cartão para aquela porta.",
    "registra_afirmacao": "af_h3"
   },
   {
    "id": "h4",
    "pergunta": "Os armários de achados e perdidos da recepção têm algum segredo?",
    "resposta": "Têm trava em duas partes: os dois primeiros dígitos vêm de fábrica e estão num aviso plastificado; os dois últimos a recepção define para cada armário. Foi regra que eu mesma criei.",
    "registra_afirmacao": "af_h4",
    "libera_prova": "p_manual_armarios"
   }
  ],
  "denise": [
   {
    "id": "d1",
    "pergunta": "Onde a senhora estava durante a festa?",
    "resposta": "No 3º andar, arrumando os quartos, das 21h às 23h. A festa era para os convidados, não para a camareira.",
    "registra_afirmacao": "af_d1"
   },
   {
    "id": "d2",
    "pergunta": "A senhora passou perto do escritório da gerência?",
    "resposta": "Desci pelo corredor dos fundos às 22h10 para pegar toalhas. O balcão da recepção estava vazio. Toquei a campainha e ninguém veio.",
    "registra_afirmacao": "af_d2"
   },
   {
    "id": "d3",
    "pergunta": "A senhora viu algo estranho no lixo do escritório?",
    "resposta": "Ao trocar o saco de lixo, achei uma metade de bilhete rasgado. Guardei no avental, achei estranho.",
    "registra_afirmacao": "af_d3",
    "libera_prova": "p_bilhete:A"
   },
   {
    "id": "d4",
    "pergunta": "A senhora tem chave do escritório?",
    "resposta": "Só a chave-mestra dos quartos. O escritório tem cartão próprio, e eu não tenho.",
    "registra_afirmacao": "af_d4"
   }
  ],
  "tobias": [
   {
    "id": "t1",
    "pergunta": "Onde o senhor estava às 22h?",
    "resposta": "No balcão da recepção, a noite toda. Não saí nem para ir ao banheiro.",
    "registra_afirmacao": "af_t1",
    "libera_prova": "p_pc_recepcao"
   },
   {
    "id": "t2",
    "pergunta": "O seu cartão abre o escritório da gerência?",
    "resposta": "Não. Meu cartão só abre a recepção e o elevador de serviço.",
    "registra_afirmacao": "af_t2"
   },
   {
    "id": "t3",
    "pergunta": "O senhor usa os armários de achados e perdidos?",
    "resposta": "Eu? Nunca. Aquilo é assunto do turno da manhã.",
    "registra_afirmacao": "af_t3",
    "libera_prova": "p_caderno_turno"
   },
   {
    "id": "t4",
    "pergunta": "O senhor tem algum problema com dívidas?",
    "resposta": "Todo mundo tem contas. Nada que eu não resolva. (Um papel dobrado escapa do caderno de turno e cai no balcão.)",
    "registra_afirmacao": "af_t4",
    "libera_prova": "p_aviso_cobranca"
   }
  ],
  "cassio": [
   {
    "id": "c1",
    "pergunta": "O senhor estava no hotel por que motivo?",
    "resposta": "Sou avaliador de joias e fui convidado por Dona Ilda para avaliar o Colar Maré Alta antes da exposição de domingo.",
    "registra_afirmacao": "af_c1"
   },
   {
    "id": "c2",
    "pergunta": "O senhor ofereceu comprar o colar?",
    "resposta": "Ofereci 80 mil. Dona Ilda recusou com toda a educação. Foi só isso, uma proposta honesta.",
    "registra_afirmacao": "af_c2"
   },
   {
    "id": "c3",
    "pergunta": "Viu algo estranho no hotel essa noite?",
    "resposta": "Voltando do salão, achei a outra metade de um bilhete rasgado no tapete do corredor. Pensei em entregar à recepção, mas o balcão estava vazio. Fico com vocês.",
    "registra_afirmacao": "af_c3",
    "libera_prova": "p_bilhete:B"
   },
   {
    "id": "c4",
    "pergunta": "Onde o senhor estava às 22h12?",
    "resposta": "No salão, brindando com Dona Ilda e a Helga. Tem foto.",
    "registra_afirmacao": "af_c4"
   }
  ],
  "ilda": [
   {
    "id": "i1",
    "pergunta": "Há quanto tempo a senhora tem o colar?",
    "resposta": "Desde a inauguração, em 1994. Foi presente do meu marido, que Deus o tenha.",
    "registra_afirmacao": "af_i1"
   },
   {
    "id": "i2",
    "pergunta": "Quem sabia que o colar estava no cofre?",
    "resposta": "A Helga e eu. E o Cássio, que avaliou. E o hotel inteiro, depois do aviso da festa, não é?",
    "registra_afirmacao": "af_i2"
   },
   {
    "id": "i3",
    "pergunta": "A senhora conhece o recepcionista da noite?",
    "resposta": "O Tobias? Um moço gentil. Sempre me chama de Dona Ilda e traz chá. Está conosco há dois anos, e hoje carregou a minha bolsa até a porta do escritório quando fui guardar o colar, às 19h30.",
    "registra_afirmacao": "af_i3"
   }
  ]
 },
 "provas": [
  {
   "id": "p_cofre_vazio",
   "nome": "Foto do cofre aberto",
   "descricao": "O cofre do escritório está fechado e sem sinal de arrombamento. Dentro, a caixa de veludo azul está vazia. Teclado de 6 dígitos intacto.",
   "dono": "ambos",
   "disponivel": "inicio",
   "imagem": "d1_p_cofre_vazio.png"
  },
  {
   "id": "p_foto_brinde",
   "nome": "Foto do brinde dos 30 anos",
   "descricao": "Foto do salão tirada com o relógio da parede marcando 22h12: Helga fala ao microfone, Dona Ilda ergue uma taça e Cássio, ao fundo, também brinda.",
   "dono": "B",
   "disponivel": "inicio",
   "imagem": "d1_p_foto_brinde.png"
  },
  {
   "id": "p_laudo_colar",
   "nome": "Laudo do Colar Maré Alta",
   "descricao": "Laudo assinado por Cássio Ventura: colar com 64 pérolas cultivadas, fecho de ouro, valor estimado R$ 240.000.",
   "dono": "B",
   "disponivel": "inicio",
   "imagem": "d1_p_laudo_colar.png"
  },
  {
   "id": "p_foto_inauguracao",
   "nome": "Foto da inauguração, 1994",
   "descricao": "Foto antiga do saguão. Sobre o balcão está o veleiro em miniatura com a plaquinha: 'Albatroz, presente do capitão Mirante'.",
   "dono": "A",
   "disponivel": "inicio",
   "imagem": "d1_p_foto_inauguracao.png"
  },
  {
   "id": "p_escala",
   "nome": "Escala da equipe de sábado",
   "descricao": "Escala impressa: Helga, gerência, 14h às 24h, cartão GER-01. Denise, governança, 14h às 23h, 3º andar das 21h às 23h, cartão CAM-01. Tobias Reis, recepção noite, 20h às 6h, cartão RECEP-02.",
   "dono": "A",
   "disponivel": "inicio",
   "imagem": "d1_p_escala.png"
  },
  {
   "id": "p_manual_armarios",
   "nome": "Aviso dos armários de achados",
   "descricao": "Aviso plastificado ao lado dos armários: 'Trava em duas partes. Código de fábrica (dois primeiros dígitos): 47. Os dois últimos são definidos pela recepção para cada armário.'",
   "dono": "A",
   "disponivel": "apos_helga_h4",
   "imagem": "d1_p_manual_armarios.png"
  },
  {
   "id": "p_pc_recepcao",
   "nome": "Computador da recepção",
   "descricao": "O computador do balcão está bloqueado. Na tela: 'Digite a senha. Dica: nome do veleiro da inauguração'.",
   "dono": "B",
   "disponivel": "apos_tobias_t1",
   "imagem": "d1_p_pc_recepcao.png",
   "trava": {
    "tipo": "senha",
    "aceita": [
     "Albatroz"
    ],
    "vem_de": "prova:p_foto_inauguracao",
    "ao_abrir": {
     "libera_prova": "p_log_porta"
    },
    "dica_apos_3_erros": "O veleiro aparece numa foto antiga do saguão."
   }
  },
  {
   "id": "p_log_porta",
   "nome": "Controle de acesso da porta do escritório",
   "descricao": "Registro do sistema: 19:28 DONA-01 entra, 19:33 sai. 22:09 RECEP-02 entra. 22:14 RECEP-02 sai. 23:38 GER-01 entra.",
   "dono": "B",
   "disponivel": "apos_trava_p_pc_recepcao",
   "imagem": "d1_p_log_porta.png"
  },
  {
   "id": "p_log_cofre",
   "nome": "Relatório de aberturas do cofre",
   "descricao": "Registro do cofre: 19:31 fechado. 22:12 aberto com código correto. 22:14 fechado. 23:40 aberto (GER-01).",
   "dono": "A",
   "disponivel": "apos_helga_h2",
   "imagem": "d1_p_log_cofre.png"
  },
  {
   "id": "p_caderno_turno",
   "nome": "Caderno de turno da recepção",
   "descricao": "Página do turno da noite: lista dos armários de achados com os dois últimos dígitos: nº 3 = 71, nº 8 = 15, nº 12 = 29. Nota rabiscada: 'pagar até segunda'.",
   "dono": "B",
   "disponivel": "apos_tobias_t3",
   "imagem": "d1_p_caderno_turno.png"
  },
  {
   "id": "p_bilhete",
   "nome": "Bilhete rasgado",
   "descricao": "Bilhete rasgado ao meio, em letra de forma. Cada jogador recebe uma metade. Metade esquerda: \"ARMÁRIO 12:\" e, embaixo, \"ATÉ A FESTA\". Metade direita: \"O PACOTE FICA\" e, embaixo, \"ACABAR.\" Juntas na Mesa: \"ARMÁRIO 12: O PACOTE FICA ATÉ A FESTA ACABAR.\"",
   "dono": "ambos",
   "disponivel": "apos_juntar_bilhete",
   "trava": {
    "tipo": "parcial",
    "parte_A": {
     "valor_visivel": "ARMÁRIO 12: / ATÉ A FESTA",
     "imagem": "d1_p_bilhete_a.png",
     "dono": "A",
     "disponivel": "apos_denise_d3"
    },
    "parte_B": {
     "valor_visivel": "O PACOTE FICA / ACABAR.",
     "imagem": "d1_p_bilhete_b.png",
     "dono": "B",
     "disponivel": "apos_cassio_c3"
    },
    "texto_completo": "ARMÁRIO 12: O PACOTE FICA ATÉ A FESTA ACABAR.",
    "ao_juntar": {
     "libera_prova": "p_armario12"
    }
   }
  },
  {
   "id": "p_armario12",
   "nome": "Armário de achados nº 12",
   "descricao": "Armário da recepção, número 12, com teclado de 4 dígitos. Etiqueta: 'Trava em duas partes: os dois primeiros dígitos (fábrica) e os dois últimos (definidos pela recepção).'",
   "dono": "ambos",
   "disponivel": "apos_juntar_bilhete",
   "imagem": "d1_p_armario12.png",
   "trava": {
    "tipo": "codigo_dividido",
    "digitos": 4,
    "parte_A": {
     "valor": "47",
     "vem_de": "prova:p_manual_armarios",
     "posicao": "primeiros 2"
    },
    "parte_B": {
     "valor": "29",
     "vem_de": "prova:p_caderno_turno",
     "posicao": "últimos 2"
    },
    "ao_abrir": {
     "libera_prova": "p_colar_achados"
    },
    "dica_apos_3_erros": "Um de vocês tem o aviso de fábrica; o outro, o caderno do turno da noite."
   }
  },
  {
   "id": "p_colar_achados",
   "nome": "O colar no armário 12",
   "descricao": "Dentro do armário 12, o Colar Maré Alta envolto num lenço cinza bordado com as iniciais T.R.",
   "dono": "ambos",
   "disponivel": "apos_trava_p_armario12",
   "imagem": "d1_p_colar_achados.png"
  },
  {
   "id": "p_aviso_cobranca",
   "nome": "Aviso de cobrança",
   "descricao": "Carta dobrada: 'Sr. Tobias Reis: parcela do empréstimo vencida há 60 dias. Valor em aberto: R$ 38.500,00. Prazo final: segunda-feira.'",
   "dono": "B",
   "disponivel": "apos_tobias_t4",
   "imagem": "d1_p_aviso_cobranca.png"
  }
 ],
 "contradicoes": [
  {
   "id": "c1",
   "suspeito": "helga",
   "afirmacao": "af_h3",
   "prova": "p_log_porta",
   "explicacao": "Helga disse que só ela e Dona Ilda tinham cartão para a porta do escritório. O controle de acesso mostra que às 22h09 o cartão RECEP-02 entrou na sala e só saiu às 22h14, justo quando o cofre foi aberto e fechado. A escala diz que RECEP-02 é o cartão do recepcionista da noite, que tem um acesso de emergência ao escritório à noite do qual Helga não se lembrava.",
   "lado_afirmacao": "A",
   "lado_prova": "B"
  },
  {
   "id": "c2",
   "tipo": "fala_dupla",
   "suspeito": "denise",
   "afirmacao": "af_d2",
   "suspeito_b": "tobias",
   "afirmacao_b": "af_t1",
   "prova": null,
   "explicacao": "Denise afirma que às 22h10 o balcão da recepção estava vazio e ninguém atendeu a campainha. Tobias jura que ficou no balcão a noite toda e não saiu. As duas falas não podem ser verdade ao mesmo tempo.",
   "lado_afirmacao": "A",
   "lado_afirmacao_b": "B"
  },
  {
   "id": "c3",
   "suspeito": "tobias",
   "afirmacao": "af_t3",
   "prova": "p_colar_achados",
   "explicacao": "Tobias disse que nunca usa os armários de achados, mas o colar foi encontrado no armário 12 embrulhado num lenço bordado com as iniciais T.R., e o código do armário é feito com dígitos que só a recepção conhece.",
   "lado_afirmacao": "B",
   "lado_prova": "ambos"
  }
 ],
 "acusacao": {
  "culpado": "tobias",
  "perguntas_finais": [
   {
    "pergunta": "Como o colar saiu do escritório sem arrombamento?",
    "opcoes": [
     "O cofre foi aberto com código correto, por alguém que entrou com o cartão RECEP-02",
     "A porta do escritório foi forçada com um pé de cabra",
     "Helga abriu o cofre durante o discurso"
    ],
    "correta": 0,
    "explicacao": "O relatório do cofre mostra abertura com código correto às 22h12 e o controle de acesso mostra o cartão RECEP-02 no escritório de 22h09 às 22h14. A foto do brinde prova que Helga, Dona Ilda e Cássio estavam no salão."
   },
   {
    "pergunta": "Onde o colar foi escondido?",
    "opcoes": [
     "No armário de achados nº 12, aberto com 47 e 29",
     "Na caixa de joias do quarto de Cássio",
     "No lixo do escritório"
    ],
    "correta": 0,
    "explicacao": "As duas metades do bilhete dizem 'Armário 12: o pacote fica até a festa acabar', e o aviso de fábrica (47) com o caderno de turno (29) abrem o armário."
   },
   {
    "pergunta": "Por que o crime foi cometido?",
    "opcoes": [
     "Tobias precisava pagar uma dívida com prazo final na segunda",
     "Cássio queria a joia para a coleção",
     "Helga queria o seguro do hotel"
    ],
    "correta": 0,
    "explicacao": "O aviso de cobrança mostra R$ 38.500 em atraso, com prazo final na segunda-feira, e a nota 'pagar até segunda' no caderno do turno."
   }
  ]
 },
 "dicas": {
  "A": [
   "Você tem a escala da equipe. Ela diz quem usa cada cartão de acesso.",
   "Se Helga se recusa a falar do cofre, ela quer provar que vocês estudaram o colar. Seu parceiro tem o laudo.",
   "Uma foto antiga do saguão pode ser a chave de um bloqueio do seu parceiro."
  ],
  "B": [
   "O computador da recepção só abre com um nome. A dica fala de um veleiro.",
   "A foto do brinde mostra quem estava no salão às 22h12. Compare com as falas que seu parceiro ouvir.",
   "Cássio entregou uma metade de bilhete. A outra metade está com seu parceiro."
  ],
  "geral": [
   "Nenhum suspeito disse a verdade completa. Procurem duas falas que não possam ser verdadeiras ao mesmo tempo.",
   "O armário 12 só abre quando cada um digita o seu par de dígitos."
  ]
 },
 "final": {
  "acerto": "Mandado expedido! Tobias Reis deixou o balcão, entrou no escritório com o cartão RECEP-02, abriu o cofre às 22h12 e escondeu o Colar Maré Alta no armário de achados nº 12 para retirar depois da festa. Estava pressionado por uma dívida com prazo final na segunda-feira. O colar foi devolvido a Dona Ilda ainda naquela madrugada.",
  "erro": "A acusação não se sustenta. Revisem o controle de acesso da porta do escritório, a foto do brinde e o armário 12: eles apontam para quem esteve no escritório quando o cofre foi aberto."
 }
});
