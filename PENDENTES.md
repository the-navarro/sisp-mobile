# SISP Mobile: pendências e combinados

Arquivo de acompanhamento. Atualizado a cada mudança combinada.

## Pendente

### Para remover quando a Laryssa terminar de testar
- [ ] **Botão provisório "Ouvir de novo a ligação da Regina"** (fim das cidades). Código: `trFinReplay` e o botão em `chHTML`, em `js/47-trilha.js`.
- [ ] **Todas as cidades e casos estão liberados só para teste.** Em `trNodes` (`js/47-trilha.js`), `n.open=true` precisa voltar a liberar por progresso real. Só mudar quando ela pedir.
- [ ] **Painel de diagnóstico `?diag=1`** (`js/46-susto.js`). Pode ficar durante os testes. Decidir se sai na publicação.

### Para a publicação do jogo
- [ ] **Botão "Avançar a espera do laudo" com anúncio.** Hoje o laudo sai por tempo (12 s por ação de cada prova, de 24 a 48 s) ou ao fazer ações no caso. A contagem regressiva já aparece no card da perícia.

### Conteúdo novo (depois dos testes)
- [ ] **Santos:** um caso premium e cerca de 3 casos menores.
- [ ] **Belo Horizonte:** mais 1 caso.
- Antes de escrever, apresentar propostas de tema para a Laryssa escolher.

### Se a Laryssa encontrar mais problemas
- [ ] Tela preta / "Continuar" volta ao mapa: **resolvido** (ligação espontânea de suspeito que ainda não chegou). Se voltar, abrir com `?diag=1` e mandar o print da caixa de erros.
- [ ] A Laryssa joga todos os casos de ponta a ponta e relata o que encontrar.

## Regras e combinados
- **Fluxo de trabalho:** implementar, testar no navegador (Playwright), enviar para a branch `ccr-0b61aa4e-vagv85`, mostrar e perguntar. Só abrir PR e fazer squash merge quando ela disser para aplicar. Depois de cada merge: `git fetch origin main && git reset --hard origin/main && git push --force-with-lease`.
- **Deploy:** só sai quando entra na `main` (Firebase). Imagens e vídeos ficam em cache por 7 dias, então arquivos trocados precisam de `?v=N`.
- **Nomes de casos:** sempre citar o nome do caso, nunca o id.
- **Datas:** não considerar o ano real (2026) nas histórias.
- **Aprendiz:** só de 18 a 24 anos. (Rafael Quintela, de O Tempo de Bastos, tem 22.)
- **Textos e pistas:** nada deve citar uma prova, fala ou detalhe que o jogador ainda não tenha. Laudos e dicas valem em qualquer ordem de coleta.
- **Álibi:** só muda de status depois do interrogatório e com prova de horário ou de local. Fora isso, fica pendente.
- **Perguntas novas aos suspeitos:** só aparecem depois de o jogador ler o laudo que as libera.
- **Parceiro:** achados baseados no que o jogador já tem, nunca palpites sobre o culpado.
