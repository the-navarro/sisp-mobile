/* Palpites do parceiro nos casos principais (piloto: caso 1). `quando`: n = nº de perguntas feitas; ask = pergunta feita; an = prova analisada.
   `prova` é a prova que desmente (ou confirma) o palpite. No máximo 3 por caso. */
const PLP={
c0:[
{id:'pa',quando:{n:2},aponta_para:'marta',correto:false,prova:'keybox',texto:{
 marcos:'A zeladora! Quem limpa a vitrine todo dia conhece cada cantinho dela. Foi a Marta! Meu faro sentiu cheiro de cera.',
 beatriz:'A Marta cuida da limpeza e vive perto da vitrine. Deixa que eu ilumino: foi ela!'}},
{id:'pb',quando:{an:'keybox'},aponta_para:'lucio',correto:true,prova:'keybox',texto:{
 marcos:'O registro da chave reserva é do Lúcio. Foi o tesoureiro! Meu faro nunca falha. Dessa vez eu nem precisei de lanche.',
 beatriz:'Só o tesoureiro mexe na chave reserva. Faísca acesa: foi o Lúcio!'}}
],
c1:[
{id:'pa',quando:{n:2},aponta_para:'eleanor',correto:false,prova:'poison_vial',texto:{
 marcos:'Viúva e diretora da empresa do marido? Meu faro de sabujo apita: foi a Eleanor. Cônjuge é sempre o primeiro suspeito. Está no manual. Ou deveria estar.',
 beatriz:'A esposa de quem morreu e que dirige a empresa dele? Deixa que eu ilumino: foi a Eleanor, não foi?'}},
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
 marcos:'Técnico que jura que conferiu o aperto e que alguém mexeu depois dele? Foi o Caio! Quem sabe apertar também sabe desapertar. Parece lógica, né? Pareceu pra mim.',
 beatriz:'Ele cuida da passarela e ficou pálido quando falaram das porcas. Faísca acesa: foi o Caio!'}},
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
 beatriz:'Helena conhece a adega por dentro e brigou com o pai na semana passada. Teoria perfeita: foi ela!'}},
{id:'pc',quando:{an:'padlock'},aponta_para:'rui',correto:true,prova:'padlock',texto:{
 marcos:'O cadeado nº 3 é do Rui e ele diz que qualquer um pega. Qualquer um que tenha a chave dele, né? Foi o Rui! Faro de sabujo, de novo.',
 beatriz:'O cadeado nº 3 é do Rui e a fita é do uso dele. Faísca acesa: foi o encarregado da adega!'}}
],
c4:[
{id:'pa',quando:{ask:'q_i3'},aponta_para:'icaro',correto:false,prova:'cctv',texto:{
 marcos:'Comandante que largou o casaco na enfermaria bem na hora do crime? Quem manda no navio manda até no gelo. Foi o Ícaro! Meu faro adora uniforme.',
 beatriz:'O casaco do comandante ficou na maca da enfermaria justo àquela hora. Deixa que eu ilumino: foi o Ícaro!'}},
{id:'pb',quando:{ask:'q_h2'},aponta_para:'henrique',correto:false,prova:'cardlog',texto:{
 marcos:'Filho que discute com o barman e fica nervoso quando falam de manutenção? Henrique! Meu faro farejou a briga de longe.',
 beatriz:'Brigou com o barman por causa de perguntas sobre o navio. Faísca acesa: foi o Henrique!'}},
{id:'pc',quando:{an:'visit'},aponta_para:'lidia',correto:true,prova:'visit',texto:{
 marcos:'A doutora some com o barman, empurra um carrinho coberto e diz que só cumprimentou a equipe. Foi a Lídia! E eu avisei, tá? Antes de ontem.',
 beatriz:'O registro de atendimentos não bate com o que a doutora contou. Faísca acesa: foi a Lídia!'}}
],
c5:[
{id:'pa',quando:{ask:'q_l3'},aponta_para:'lucia',correto:false,prova:'proposal',texto:{
 marcos:'Filha que mentiu sobre a academia e vendia a loja escondida? Foi a Lúcia! Quem mente uma vez já sabe como é. Digo, meu faro sabe.',
 beatriz:'Ela mentiu sobre onde estava e ainda assinava a venda da loja. Deixa que eu ilumino: foi a Lúcia!'}},
{id:'pb',quando:{ask:'q_s1'},aponta_para:'sergio',correto:false,prova:'gatelog',texto:{
 marcos:'Joalheiro rival, com loja bem ali ao lado? Foi o Sérgio! Concorrente é sempre suspeito. Principalmente quando diz que estava fechando a loja.',
 beatriz:'O rival do Armando, com a loja ali do lado! Faísca acesa: foi o Sérgio!'}},
{id:'pc',quando:{an:'keyreceipt'},aponta_para:'davi',correto:true,prova:'keyreceipt',texto:{
 marcos:'Ex-aprendiz com cópia da chave e o recibo do chaveiro no nome dele. Foi o Davi! E eu cheguei nele antes, tá? Anota aí.',
 beatriz:'O recibo do chaveiro mostra a cópia da chave. Faísca acesa: foi o Davi, e a gente tem a prova!'}}
],
c6:[
{id:'pa',quando:{ask:'q_a2'},aponta_para:'alvaro',correto:false,prova:'cam_sala',texto:{
 marcos:'Dono de galeria que fala do seguro do quadro justo agora? Foi o Álvaro! Quem fala de dinheiro sem ninguém perguntar tem um plano. Meu faro nunca falha, e agora sentiu cheiro de verniz.',
 beatriz:'Ele puxou o assunto do seguro do quadro sem ninguém perguntar. Faísca acesa: foi o Álvaro!'}},
{id:'pb',quando:{ask:'q_c2'},aponta_para:'camila',correto:false,prova:'guia_transporte',texto:{
 marcos:'A curadora mentiu sobre o horário e saiu escondida da galeria na noite da abertura. Foi a Camila! Quem esconde hora sabe mais do que diz. Digo, meu faro sabe.',
 beatriz:'Ela disse que ficou até meia-noite e saiu às 22h. Quem mente sobre o relógio esconde coisa. Foi a Camila!'}},
{id:'pc',quando:{an:'registro_atelie'},aponta_para:'heitor',correto:true,prova:'registro_atelie',texto:{
 marcos:'Restaurador que jurou nunca mais tocar no quadro e assinou uma "revisão" no livro do ateliê? Foi o Heitor! E eu cheguei nele antes, tá? Anota aí.',
 beatriz:'O livro do ateliê tem a assinatura dele numa revisão que ele negou. Faísca acesa: foi o Heitor, e a prova está no papel!'}}
]};
