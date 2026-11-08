/* Palpites do parceiro nos casos principais (piloto: caso 1). `quando`: n = nº de perguntas feitas; ask = pergunta feita; an = prova analisada.
   `prova` é a prova que desmente (ou confirma) o palpite. No máximo 3 por caso. */
const PLP={
c1:[
{id:'pa',quando:{n:2},aponta_para:'eleanor',correto:false,prova:'poison_vial',texto:{
 marcos:'Viúva em briga na justiça por bens? Meu faro de sabujo apita: foi a Eleanor. Cônjuge é sempre o primeiro suspeito. Está no manual. Ou deveria estar.',
 beatriz:'Casamento em guerra judicial e ela ainda herda tudo? Deixa que eu ilumino: foi a Eleanor, não foi?'}},
{id:'pb',quando:{ask:'q_c1'},aponta_para:'clara',correto:false,prova:'intercom',texto:{
 marcos:'A bandeja ficou quatro minutos com a governanta e sem ninguém olhando. Foi a Clara! Eu já desconfiava desde o café. Que ela não me ofereceu.',
 beatriz:'Quatro minutos sozinha com a bandeja e a Clara sumiu da cozinha bem nessa hora. Faísca acesa: foi ela!'}},
{id:'pc',quando:{an:'keycard'},aponta_para:'victor',correto:true,prova:'keycard',texto:{
 marcos:'Cartão do laboratório no nome do Victor! Meu faro nunca falha. Foi ele. E eu cheguei nele antes, tá?',
 beatriz:'Faísca acesa! Cartão #441 e o álibi do terraço foi por água abaixo. É o Victor.'}}
]};
