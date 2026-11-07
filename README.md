# SISP Mobile

Jogo de investigação policial em HTML, CSS e JavaScript puros (sem frameworks e
sem etapa de build). Cada caso é um inquérito: coletar provas, analisar na
perícia, interrogar suspeitos, ligar as pistas e acusar o culpado.

Este repositório é a versão **organizada em pastas** do jogo que antes vivia em
um único arquivo HTML (cerca de 537 mil caracteres). A separação foi feita só
movendo o código: a lógica não foi reescrita.

## Como rodar localmente

O jogo precisa ser servido por um servidor web simples (abrir o `index.html`
com duplo clique pode não carregar os vídeos). Na pasta do projeto:

```bash
python3 -m http.server 8000
```

Depois abra <http://localhost:8000/index.html> no navegador. Em computador, a
tela aparece em formato de celular, centralizada. Qualquer servidor estático
serve (por exemplo `npx serve`).

Não é preciso instalar nada.

## Estrutura

```
index.html        Só a estrutura: carrega os estilos e os scripts na ordem certa
css/              Estilos (7 arquivos, carregados na ordem do número)
js/               Motor do jogo (25 arquivos, carregados na ordem do número)
casos/            Dados de cada caso (um arquivo por caso)
assets/v/         Vídeos (.mp4) e capas (.jpg) das cenas de cada caso
original/         Cópia intocada do arquivo único original
```

### css/

| Arquivo | Conteúdo aproximado |
|---|---|
| `00-base-artifact.css` | regras da "casca" da página onde o jogo era publicado |
| `01-base.css` | cores, layout do app, abas, papéis, toasts |
| `02-guia-dock.css` | guia e dock de dicas |
| `03-inicio-mapa-casos.css` | tela inicial, mapa e cartazes dos casos |
| `04-guia-caderno.css` | painel do guia e caderno |
| `05-cenas-inspecao-cutscenes.css` | cenas, inspeção de provas, cutscenes |
| `06-onboarding.css` | tutorial de boas-vindas |

### js/

Os arquivos são scripts comuns (não módulos) e **dependem da ordem**: todos
compartilham as mesmas variáveis globais, como no arquivo original. A ordem
está em `index.html`.

| Arquivo | Conteúdo aproximado |
|---|---|
| `01-avatares.js` | avatares dos suspeitos |
| `02-casos-lista.js` | monta a lista `CASES` e as falas extras |
| `03-estado.js` | estado do jogo e dados salvos |
| `04-audio.js` | música e efeitos sonoros |
| `05-utilitarios.js` | salvar, avisos, abas, contadores |
| `06-audio-voz.js` | vozes sintetizadas dos personagens |
| `07-ligacoes.js` | telefonemas |
| `08-progresso-guia.js` | regras de rodada, desbloqueios, dicas do guia |
| `09-icones.js` | ícones SVG |
| `10-perfil-delegado.js` | aparência do detetive (perfil) |
| `11-interface-modais.js` | janelas: registro, dicas, ajustes, resumo, briefing |
| `12-guia-caderno.js` | guia, caderno de notas |
| `13-arte-provas-cenas.js` | desenho das provas e cenários, inspeção com zoom |
| `14-retratos.js` | retratos detalhados dos personagens |
| `15-ambiente-som.js` | sons de ambiente |
| `16-cutscenes.js` | vídeos de abertura e reconstituições |
| `17-galeria-papeis.js` | galeria de selos e papéis de parede |
| `18-interface-celular.js` | apps do "celular" e `render()` |
| `19-telas.js` | as telas de cada app |
| `20-acoes.js` | coletar, analisar, perguntar, acusar, veredito |
| `21-menu.js` | tela inicial e mapa de casos |
| `22-onboarding.js` | tutorial de boas-vindas |
| `23-minijogos.js` | minijogos (câmeras, registros etc.) |
| `24-inicio.js` | ajustes finais e partida inicial |
| `25-chuva.js` | chuva da janela do escritório do caso 1 (canvas) |

Os nomes são aproximados: o código original misturava assuntos, e nada foi
reordenado.

### casos/

| Arquivo | Caso |
|---|---|
| `caso0.js` | O Troféu Sumido (treinamento) |
| `caso1.js` | A Última Xícara |
| `caso2.js` | O Último Ato |
| `caso3.js` | A Última Safra |
| `caso4.js` | A Última Travessia |
| `caso5.js` | A Última Vitrine |
| `caso5-extras.js` | dados do caso 5 que o original completava no fim do arquivo |

Cada `casoN.js` define a função `mkCN()` com suspeitos, locais, provas,
cronologia e solução. Eles carregam **antes** de `js/02-casos-lista.js`, que
monta a lista final.

### assets/v/

84 arquivos nomeados `c<caso>_<cena>.mp4` e `c<caso>_<cena>.jpg`
(`intro` e `b0` a `b5`). O código os busca em `assets/v/` (função `vurl()` em
`js/16-cutscenes.js`). Não há imagens ou áudios embutidos em base64: a arte é
desenhada em SVG pelo próprio JavaScript e os sons são sintetizados.

## Salvamento

O progresso fica no `localStorage` do navegador (chaves `sisp-meta`,
`sisp-c0`, `sisp-c2`... e `sisp104b` para o caso 1). Ele é por endereço: o que
foi salvo no artifact **não aparece** numa cópia rodando em `localhost` ou em
outro domínio.

## Como foi verificado

- A soma dos arquivos de `css/`, `js/` e `casos/` é idêntica, caractere por
  caractere, ao CSS e ao script do original.
- Original e versão separada foram comparados num navegador headless: tela
  inicial, tutorial, avatar e início do caso 0 geraram o mesmo HTML e a mesma
  imagem, com 0 erros no console.
- Não foram jogados até o fim os casos 1 a 5, nem testados som e vozes.

## Mudanças feitas depois da separação

A separação em si não mudou o comportamento. Depois dela, a pedido, entraram
duas correções pequenas:

- **Capa esperando o vídeo:** o vídeo só começava a baixar quando a cena abria,
  e na rede do GitHub Pages a capa ficava ~1,5 s na tela. Agora os vídeos são
  baixados antes (`warmUrl()` e `warmCase()` em `js/16-cutscenes.js`): o da
  abertura no menu e ao abrir o cartaz do caso, o da próxima cena enquanto a
  atual toca, e o da primeira cena da reconstrução ao abrir a Prisão. Medido
  com um servidor local atrasando cada `.mp4` em 1,2 s: de ~1400 ms para
  ~150 ms na abertura e ~20 ms entre cenas.
- **Planta do salão (caso 0):** `SP.plantb` em `js/13-arte-provas-cenas.js`
  passou a usar o mesmo desenho do ícone da lista (`AR.plant`), reduzido.
- **Vídeos das cenas b2 a b5** dos 6 casos substituídos por versões com mão
  esquerda e direita diferentes.
- **Chuva da janela do escritório (caso 1):** os risquinhos retos foram
  trocados por um canvas (`js/25-chuva.js`) com gotas em três profundidades,
  respingos, gotas escorrendo no vidro e clarões de raio. Respeita o ajuste
  "reduzir animações" (fica estática) e só anima enquanto a cena está na tela.

## Pendências conhecidas

- **Mãos nos vídeos:** as cenas b2 a b5 foram refeitas. As cenas `intro`, `b0`
  e `b1` não foram refeitas; se alguma ainda mostrar as duas mãos iguais, é
  preciso regerar o vídeo na ferramenta em que foi feito.

Itens deixados de propósito para não mexer na lógica:

- Os scripts dependem da ordem de carga e de variáveis globais (não usam
  `import/export`).
- Há código "remendado" em camadas, por exemplo `AU`, `EVA` e `PDX` estendidos em
  vários pontos, e `render()` embrulhada duas vezes no final.
- Parte dos dados de cada caso está fora do arquivo do caso (cenas `SCN`, retratos
  `PDX`, papéis de parede `WP`, falas de relacionamento).
- `guide0()` em `js/08-progresso-guia.js` parece não ser chamada.
- `const TESTE=true` faz a tela inicial mostrar "· TESTE".
