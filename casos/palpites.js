/* Palpites do parceiro nos casos principais (piloto: caso 1). `quando`: n = nº de perguntas feitas; ask = pergunta feita; an = prova analisada.
   `prova` é a prova que desmente (ou confirma) o palpite. No máximo 3 por caso. */
const PLP={
c0:[
{id:'pa',tipo:'achado',quando:{ask:'q_l2'},ref:'Fala de Lúcio ("não saí do salão em nenhum momento") × Registro da chave reserva (retirada às 20h10 por "L.P.").',prova:'keybox',texto:{
 marcos:'Chefe, deixa eu farejar uma coisa. O Lúcio jurou que não saiu do salão em nenhum momento. Mas o registro da chave reserva mostra uma retirada às 20h10 com as iniciais L.P. Cruza a fala dele com esse registro.',
 beatriz:'Deixa que eu ilumino um detalhe: o Lúcio disse que não saiu do salão, mas o registro da chave reserva tem uma retirada às 20h10 assinada L.P. Vale cruzar a fala com o registro.'}},
{id:'pb',tipo:'achado',quando:{ask:'q_m2'},ref:'Fala de Marta ("passei o pano no troféu às 19h") × Pano de polir (marcas douradas do polimento).',prova:'rag',texto:{
 marcos:'Sobre a Marta: o pano com marcas douradas bate com o polimento que ela disse ter feito às 19h, e a chave reserva só saiu às 20h10. Ela limpou o troféu, mas não há nada que a ponha na vitrine depois disso. Meu faro diz que dá para riscar a Marta dessa janela.',
 beatriz:'Sobre a Marta: o pano tem as marcas douradas do polimento das 19h, e a chave reserva só foi retirada às 20h10. Ela limpou o troféu antes, não depois. Dá para deixar a Marta de lado nessa janela.'}}
],
c1:[
{id:'pa',tipo:'achado',quando:{ask:'q_v5'},ref:'Fala de Victor ("foi engano de número, eu pedia um café") × Registro do interfone (40 segundos de chamada, fone fora do gancho, ninguém no portão).',texto:{
 marcos:'Chefe, deixa eu farejar uma coisa. O Victor disse que ligou por engano, pra pedir um café. Mas o registro do interfone mostra 40 segundos de chamada e o fone largado fora do gancho. Quem pede café fala, espera e desliga. Dessa vez o meu faro tem prova: confere a fala dele com o registro.',
 beatriz:'Deixa que eu ilumino um detalhe: o Victor jura que foi engano de número e que queria um café. Só que o registro mostra 40 segundos de chamada e o fone largado fora do gancho. Ninguém pede café assim. Confere a fala dele com o registro do interfone.'}},
{id:'pb',tipo:'achado',quando:{all:['q_v1','q_e2']},ref:'Fala de Victor ("só uma divergência sobre investimentos") × Fala de Eleanor ("bate-boca terrível no jantar") e o fragmento queimado (Victor não podia saber antes da votação).',texto:{
 marcos:'Anotei duas coisas aqui. O Victor chamou a briga de "divergência sobre investimentos". A doutora Eleanor falou em bate-boca terrível no jantar, e o papel queimado diz que o Victor não podia saber das novas regras. Divergência, sei. Meu faro diz que ele está minimizando.',
 beatriz:'Faísca acesa! O Victor chamou a discussão de "divergência sobre investimentos", mas a Eleanor falou em bate-boca terrível no jantar. E o fragmento queimado mostra o que estava em jogo. Vale cruzar essas duas falas com o papel.'}}
],
c2:[
{id:'pa',tipo:'achado',quando:{ask:'q_k3'},ref:'Fala de Caio ("conferi o aperto às 16h30") × Livro de chaves (quem retirou a chave da passarela depois da inspeção dele?).',prova:'keylog',texto:{
 marcos:'A mesa de luz mostra o Caio operando de 20h30 a 20h55, na hora da queda, então ele não estava na passarela. Só que a sabotagem pode ter vindo antes. Dá uma olhada no livro de chaves: quem pegou a chave da passarela depois da inspeção dele, às 16h30?',
 beatriz:'A mesa de luz põe o Caio no posto de 20h30 a 20h55, justo na queda. Então a sabotagem veio antes. Deixa que eu ilumino: veja no livro de chaves quem retirou a chave da passarela depois da inspeção dele.'}},
{id:'pb',tipo:'achado',quando:{ask:'q_c3'},ref:'Chave de boca 17 mm (caixa do figurino) × Parafusos da grade (ferrugem e graxa das porcas soltas).',prova:'rail_bolts',texto:{
 marcos:'A chave de 17 mm estava na caixa do figurino, e o Caio disse que a dele é de 19. Cruza essa chave com as porcas da grade: o laudo fala em ferrugem e graxa. Meu faro diz que as duas coisas se encaixam.',
 beatriz:'Faísca acesa! A chave de 17 mm é da caixa do figurino, e a do Caio é de 19. Vale cruzar a chave com os parafusos da grade, que têm ferrugem e graxa.'}}
],
c3:[
{id:'pa',tipo:'achado',quando:{ask:'q_h3'},ref:'Fala de Helena ("não saí do laboratório") × Planilha dos analisadores (31 amostras, de 21h00 às 21h50).',prova:'samples',texto:{
 marcos:'Sobre a Helena: a planilha dos analisadores mostra 31 amostras de 21h00 às 21h50, sem pausa. O exaustor foi desligado às 21h05, no meio disso. Dá para riscar a Helena dessa janela. Cruza a fala dela com a planilha.',
 beatriz:'A Helena disse que não saiu do laboratório, e a planilha dos analisadores registra 31 amostras de 21h00 às 21h50 sem pausa. O exaustor caiu às 21h05. Confere a fala dela com a planilha.'}},
{id:'pb',tipo:'achado',quando:{ask:'q_r2'},ref:'Fala de Rui ("sempre desligo para limpar os filtros") × Registro do painel (exaustor 21h05) e Sensor de CO₂ (21h06).',prova:'sensor',texto:{
 marcos:'O Rui falou em limpar filtros em plena festa. Mas o painel mostra o exaustor desligado às 21h05, e o sensor de CO₂ foi desligado um minuto depois. Duas proteções desligadas em um minuto não parece limpeza de filtro. Cruza o painel com o sensor.',
 beatriz:'Deixa que eu ilumino: o painel registra o exaustor desligado às 21h05, e o sensor de CO₂ às 21h06. Duas proteções em um minuto. Filtro de ar não se limpa assim. Cruza o registro do painel com o sensor.'}}
],
c4:[
{id:'pa',tipo:'achado',quando:{ask:'q_o3'},ref:'Fala de Olívia ("mesa de honra, não saí dali") × Transmissão de Bianca (mesa de honra das 01h20 às 02h30).',prova:'live',texto:{
 marcos:'A transmissão da Bianca mostra a Olívia na mesa de honra das 01h20 às 02h30, com cem testemunhas e uma câmera ligada. Meu faro diz que dá para riscar a Olívia da hora do crime. Confere a fala dela com a transmissão.',
 beatriz:'A transmissão da Bianca confirma a Olívia na mesa de honra das 01h20 às 02h30. Com tanta gente olhando, ela fica fora da hora do crime. Confere a fala dela com a transmissão.'}},
{id:'pb',tipo:'achado',quando:{all:['q_l1','q_l2']},ref:'Fala de Lídia ("atendendo enjoo na enfermaria") × Registro de atendimentos (nenhum paciente entre 01h20 e 02h25).',prova:'visit',texto:{
 marcos:'A doutora disse que atendeu enjoo na enfermaria, mas o registro de atendimentos está vazio entre 01h20 e 02h25. Ou ela atendeu e não anotou, ou não atendeu ninguém. Meu faro quer saber qual. Cruza a fala dela com o registro.',
 beatriz:'Faísca acesa! A Lídia disse que ficou atendendo enjoo, mas o registro de atendimentos não tem nenhum paciente entre 01h20 e 02h25. Cruza a fala dela com o registro.'}}
],
c5:[
{id:'pa',tipo:'achado',quando:{ask:'q_a4'},ref:'Fala de Armando ("tranquei a porta às 18h, quem entrou tinha chave") × Fechadura da porta dos fundos (sem arrombamento). Vale procurar quem fez uma cópia da chave.',prova:'keyreceipt',texto:{
 marcos:'O Seu Armando trancou a porta às 18h e ela não foi arrombada. Então quem entrou tinha uma cópia da chave. Meu faro diz para procurar um recibo de chaveiro: alguém pode ter mandado copiar a chave dos fundos.',
 beatriz:'A porta dos fundos estava trancada e ninguém a arrombou. Deixa que eu ilumino: quem entrou tinha uma cópia da chave. Vale procurar um recibo de chaveiro.'}},
{id:'pb',tipo:'achado',quando:{ask:'q_l3'},ref:'Fala de Lúcia ("na academia desde as 18h30") × Proposta de compra (carimbo das 18h20, na loja do Quintela).',prova:'proposal',texto:{
 marcos:'A Lúcia mentiu sobre a academia, mas a proposta de compra tem o carimbo das 18h20, na loja do Quintela. O assalto foi às 18h45. Ela estava escondendo outra coisa. A mentira é feia, mas é de outro assunto. Cruza a fala dela com o carimbo.',
 beatriz:'A Lúcia mentiu sobre a academia, mas o carimbo da proposta mostra que ela estava assinando a venda na loja do Quintela às 18h20. Mentira, sim, mas de outro assunto. Cruza a fala dela com a proposta.'}}
],
c6:[
{id:'pa',tipo:'achado',quando:{ask:'q_i2'},ref:'Fala de Iracema (furinho de alfinete no canto inferior esquerdo) × Ficha do seguro (foto de março).',prova:'seguro_foto',texto:{
 marcos:'A Dona Iracema falou de um furinho de alfinete no canto inferior esquerdo do quadro. A ficha do seguro tem a foto de março. Dá para conferir se o quadro exposto tem esse furinho. Meu faro quer ver isso de perto.',
 beatriz:'Deixa que eu ilumino um detalhe: a Dona Iracema descreveu um furinho de alfinete no canto inferior esquerdo. A ficha do seguro tem a foto de março. Vale cruzar a fala dela com a foto.'}},
{id:'pb',tipo:'achado',quando:{ask:'q_a3'},ref:'Fala de Álvaro ("achei o brilho do verniz estranho") × Gravação da câmera da sala 3 (parado diante do quadro, cabeça inclinada).',prova:'cam_sala',texto:{
 marcos:'O Álvaro ficou parado diante do quadro, de cabeça inclinada, e foi ele quem pediu a perita. Quem desconfia da obra e chama a perícia não costuma ser quem a trocou. Cruza a fala dele com a gravação da sala 3.',
 beatriz:'O Álvaro estranhou o brilho do verniz na gravação e foi ele quem pediu a perita. Quem chama a perícia não costuma ser quem trocou o quadro. Cruza a fala dele com a gravação da sala 3.'}}
],
};
