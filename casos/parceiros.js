/* Parceiros (dados de parceiros.json). Cada parceiro guarda a própria confiança. */
const PTD=[
 {
  "id": "marcos",
  "nome": "Marcos",
  "sobrenome": "Pimenta",
  "idade": 38,
  "aparencia": "Ruivo, barba ruiva, óculos escuros, quepe e farda de policial azul, ombros largos, caderninho amassado e um doce no bolso.",
  "cor_cabelo": "#B5471E",
  "personalidade": "Cabeça-dura de nascença, confiante demais e leal até o fim. Apaixonado por comida, confia no próprio faro e sempre acha uma desculpa engraçada quando erra.",
  "bordoes": [
   "Meu faro de sabujo nunca falha.",
   "Isso aqui está mais claro que cafezinho coado.",
   "Primeiro um lanche, depois a verdade.",
   "Eu não teimo, eu insisto com convicção."
  ],
  "falas": {
   "boas_vindas": "Marcos Pimenta, às ordens. Pode rir do sobrenome, já me acostumei. Só não peça para eu mudar de ideia: isso eu nunca fiz.",
   "confiou_errado": "Tá, tá... o faro tirou folga hoje. Mas anota assim: foi empate entre mim e a realidade.",
   "confiou_certo": "Viu? Eu avisei! Meu faro e eu merecemos um lanche. Você também, mas o maior pedaço é meu.",
   "pediu_prova": "Prova? Eu já tinha certeza, mas tudo bem... finjo que também quero ver.",
   "discordou_certo": "Poxa, eu tinha certeza! Quer dizer, ainda tenho. Mas você tem razão, pelo menos hoje.",
   "discordou_errado": "Eu sabia que você ia discordar. E eu estava certo, tá? Não vou fazer cara de 'eu avisei'. Já fiz, desculpa.",
   "troca": "Vou ficar com saudade. Deixei um lanche na gaveta. Se ele sumir, não fui eu. Fui eu, sim."
  }
 },
 {
  "id": "beatriz",
  "nome": "Beatriz",
  "sobrenome": "Faísca",
  "idade": 34,
  "aparencia": "Ruiva, cabelos longos e cacheados cor de cobre, sardas, olhos verdes, batom vermelho, sobretudo bege de investigadora, crachá no pescoço e uma lanterninha na bolsa.",
  "cor_cabelo": "#C2561F",
  "personalidade": "Esperta, bem-humorada e curiosa. Faz trocadilhos com luz e faíscas. Se empolga com teorias e às vezes tira conclusões cedo demais. Vive com o celular sem bateria.",
  "bordoes": [
   "Deixa que eu ilumino.",
   "Faísca acesa!",
   "Meu celular? Sem bateria, de novo."
  ],
  "falas": {
   "boas_vindas": "Beatriz Faísca. Sim, é sobrenome de verdade. Deixa que eu ilumino!",
   "confiou_errado": "Ops, me empolguei. Teoria bonita, resultado nem tanto.",
   "confiou_certo": "Faísca acesa! A gente é uma dupla de peso.",
   "pediu_prova": "Boa ideia. Provas primeiro, teorias depois.",
   "discordou_certo": "Tá bom, eu me apressei. Anota aí: você ganhou essa.",
   "discordou_errado": "Eu sabia que a minha ideia tinha brilho. Pelo menos um pouquinho!",
   "troca": "Vou carregar meu celular até a gente se ver de novo!"
  }
 }
];

/* Falas de fechamento: `caso` = comentário no fim de cada caso (por nível de confiança); `temp` = final da temporada (parceria forte, neutra ou fria). */
const PTF={
marcos:{
 caso:{alta:'Mais um caso fechado, e eu sabia desde o começo. Quer dizer, desde o meio. Mas confiei no meu faro e você confiou em mim. Dupla boa!',media:'Caso encerrado. A gente acertou umas, errou outras, e eu ainda acho que tinha razão na maioria. Tá, na metade.',baixa:'Caso resolvido, mas você me ouviu pouco. Tudo bem, eu não fiquei chateado. Fiquei de cara fechada, que é diferente.'},
 temp:{forte:'Temporada encerrada. No começo eu achava que meu faro resolvia tudo. Hoje sei que o melhor faro é o seu junto com o meu. Lanche por minha conta, sempre.',neutra:'Temporada encerrada. A gente discordou, acertou, errou e acertou de novo. Não foi perfeito, mas foi nosso. Aceito um lanche para comemorar.',fria:'Temporada encerrada. Você mandou bem e eu fui mais enfeite, né? Sem mágoa. Se um dia precisar de parceiro, meu faro continua aqui. E meu lanche também.'}},
beatriz:{
 caso:{alta:'Faísca acesa! Esse caso brilhou, e a gente brilhou junto. Anota aí: dupla de peso.',media:'Caso resolvido! Teve teoria boa e teve teoria que apagou. A gente se acerta no próximo.',baixa:'Caso resolvido... sem muita luz entre a gente, né? Mas eu carreguei o celular. Vamos tentar de novo?'},
 temp:{forte:'Temporada encerrada, e que luz! A gente se entendeu até no silêncio. Se tiver outro caso, eu levo a lanterna e você leva as ideias. Dupla perfeita.',neutra:'Temporada encerrada. Teve faísca, teve apagão, e no fim a gente resolveu tudo. Da próxima, eu carrego o celular e a gente combina melhor.',fria:'Temporada encerrada. Você resolveu quase tudo por conta própria, e tudo bem. Fico aqui com minha lanterninha, caso um dia queira uma segunda opinião.'}}
};
