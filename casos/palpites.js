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
],
c2:[
{id:'pa',quando:{ask:'q_r2'},aponta_para:'rogerio',correto:false,prova:'bar_receipt',texto:{
 marcos:'Sócio com três milhões de comissão e um sorriso de vendedor de carro? Foi o Rogério! Meu faro sentiu cheiro de dinheiro de longe.',
 beatriz:'Três milhões de comissão se o teatro fosse vendido! Deixa que eu ilumino: foi o Rogério.'}},
{id:'pb',quando:{ask:'q_k2'},aponta_para:'caio',correto:false,prova:'cue_log',texto:{
 marcos:'Técnico endividado que mexe em parafuso? Foi o Caio! Quem sabe apertar também sabe desapertar. Parece lógica, né? Pareceu pra mim.',
 beatriz:'Endividado, com acesso à passarela e à chave de boca. Faísca acesa: foi o Caio!'}},
{id:'pc',quando:{an:'keylog'},aponta_para:'celia',correto:true,prova:'keylog',texto:{
 marcos:'A dona Célia diz que não sobe escada, mas o livro de chaves diz outra coisa. Foi ela! Meu faro nunca falha. Dessa vez nem precisou de lanche.',
 beatriz:'O livro de chaves tem o nome dela. Faísca acesa: foi a Célia, e dessa vez não é só empolgação!'}}
],
c3:[
{id:'pa',quando:{ask:'q_a2'},aponta_para:'augusto',correto:false,prova:'plclog',texto:{
 marcos:'Irmão cheio de dívidas, sócio do homem e querendo vender a vinícola? Foi o Augusto! Em novela é sempre o irmão. Tá, não é novela, mas funciona.',
 beatriz:'Irmão endividado que queria vender a vinícola a qualquer preço? Deixa que eu ilumino: foi o Augusto!'}},
{id:'pb',quando:{ask:'q_h2'},aponta_para:'helena',correto:false,prova:'samples',texto:{
 marcos:'A filha entende de adega e ficou sozinha no laboratório. Foi a Helena! Quem se esconde no laboratório não está só estudando.',
 beatriz:'Helena conhece a adega por dentro e estava sozinha com os analisadores. Teoria perfeita: foi ela!'}},
{id:'pc',quando:{an:'padlock'},aponta_para:'rui',correto:true,prova:'padlock',texto:{
 marcos:'O cadeado nº 3 é do Rui e ele diz que qualquer um pega. Qualquer um que tenha a chave dele, né? Foi o Rui! Faro de sabujo, de novo.',
 beatriz:'O cadeado nº 3 é do Rui e a fita é do uso dele. Faísca acesa: foi o encarregado da adega!'}}
],
c4:[
{id:'pa',quando:{ask:'q_i3'},aponta_para:'icaro',correto:false,prova:'cctv',texto:{
 marcos:'Cartão da câmara fria no casaco do comandante? Quem manda no navio manda até no gelo. Foi o Ícaro! Meu faro adora uniforme.',
 beatriz:'O cartão da câmara fria estava no casaco do comandante. Deixa que eu ilumino: foi o Ícaro!'}},
{id:'pb',quando:{ask:'q_h2'},aponta_para:'henrique',correto:false,prova:'cardlog',texto:{
 marcos:'Filho que corta manutenção, discute com o barman e mexe com dinheiro? Henrique! Meu faro farejou a briga de longe.',
 beatriz:'Brigou com o barman e cortou a manutenção do navio. Faísca acesa: foi o Henrique!'}},
{id:'pc',quando:{an:'visit'},aponta_para:'lidia',correto:true,prova:'visit',texto:{
 marcos:'A doutora some com o barman, empurra um carrinho coberto e diz que só cumprimentou a equipe. Foi a Lídia! E eu avisei, tá? Antes de ontem.',
 beatriz:'O registro de atendimentos não bate com o que a doutora contou. Faísca acesa: foi a Lídia!'}}
],
c5:[
{id:'pa',quando:{ask:'q_l3'},aponta_para:'lucia',correto:false,prova:'proposal',texto:{
 marcos:'Filha que mentiu sobre a academia e vendia a loja escondida? Foi a Lúcia! Quem mente uma vez já sabe como é. Digo, meu faro sabe.',
 beatriz:'Ela mentiu sobre onde estava e ainda assinava a venda da loja. Deixa que eu ilumino: foi a Lúcia!'}},
{id:'pb',quando:{ask:'q_s1'},aponta_para:'sergio',correto:false,prova:'gatelog',texto:{
 marcos:'Joalheiro rival, com loja bem ao lado, querendo comprar tudo? Foi o Sérgio! Concorrente é sempre suspeito. Principalmente com o balcão limpo.',
 beatriz:'O rival que queria a loja do Armando! Faísca acesa: foi o Sérgio!'}},
{id:'pc',quando:{an:'keyreceipt'},aponta_para:'davi',correto:true,prova:'keyreceipt',texto:{
 marcos:'Ex-aprendiz com cópia da chave e o recibo do chaveiro no nome dele. Foi o Davi! E eu cheguei nele antes, tá? Anota aí.',
 beatriz:'O recibo do chaveiro mostra a cópia da chave. Faísca acesa: foi o Davi, e a gente tem a prova!'}}
]};
