# Licenças das vozes (assets/voz)

**Status:** em andamento. Todas as 37 faixas foram geradas.

## Ferramenta
- **Gemini API (Google), modelo `gemini-2.5-flash-preview-tts`**, com as vozes pré-definidas do Google (nomes na tabela). Nenhuma voz de pessoa real foi clonada.
- Geradas em 11/11/2026 em quatro projetos do Google AI Studio, no nível gratuito (limite de 10 pedidos por dia por projeto).
- Pós-processamento com ffmpeg: MP3 mono, 44,1 kHz, 128 kbps, normalização perto de -16 LUFS, 0,25 s de silêncio no começo e no fim.
- O modelo foi anunciado como "saindo de linha" em 17/11/2026 (fonte: cloudprice.net). Faixas geradas depois disso podem exigir outro modelo, com vozes um pouco diferentes.

## Licença e uso comercial (o que foi e o que não foi comprovado)
- Pelos Termos Adicionais da Gemini API (versão de 28/04/2026, https://ai.google.dev/gemini-api/terms), o Google **não reivindica a propriedade do conteúdo gerado**; a responsabilidade pelo uso é de quem gera. Li um resumo dessa página, não o texto integral.
- Os termos **não mencionam anúncios de forma específica**. **Não há prova explícita de que o uso em app com anúncios é permitido.** Antes de publicar, confirme os termos e, se possível, guarde uma cópia da versão vigente.
- Os termos podem exigir atribuição ao usuário final quando a lei pedir.
- No nível **gratuito**, o Google pode usar os textos enviados para melhorar produtos; no **pago**, não. As falas do jogo não têm dados pessoais.
- Usar mais de um projeto para contornar a cota gratuita pode contrariar os termos do Google; não consegui confirmar.

## Vozes por personagem
| Arquivo | Personagem | Voz (Gemini) | Versão `_a` |
|---|---|---|---|
| c0_r_m | Marta Veiga | Gacrux | sim |
| c1_r_c | Clara Rossi | Kore | sim |
| c1_r_e | Dra. Eleanor Sterling | Sulafat | não |
| c1_r_v | Victor Vance | Charon | sim |
| c2_r_k | Caio Ferraz | Puck | sim |
| c2_r_b | Beatriz Valadão | Leda | não |
| c2_r_m | Marina Dutra | Kore | sim |
| c3_r_h | Helena Lemos | Leda | sim |
| c3_r_s | Sofia Prado | Sulafat | não |
| c3_r_a | Augusto Lemos | Algenib | sim |
| c4_r_b | Bianca Rocha | Kore | sim |
| c4_r_h | Henrique Brandão | Orus | sim |
| c4_r_i | Comandante Ícaro Duarte | Charon | não |
| c5_r_a | Armando Teixeira | Algenib | sim |
| c5_r_l | Lúcia Teixeira | Leda | sim |
| c6_r_perita | Álvaro Menezes | Orus | sim |
| c6_r_iracema | Iracema Pontes | Gacrux | sim |
| e1_r_v | Dra. Verônica Villar | Sulafat | sim |
| e1_r_b | Irmã Benedita Ramos | Gacrux | sim |
| e1_r_t | Matias Quintão | Orus | não |
| e1_epi_voz | Irmã Margarida Aguiar | Kore | sim |

Cada personagem usa sempre a mesma voz, inclusive na versão "delegada". Dentro de um mesmo caso, não há duas personagens com a mesma voz.

## Epílogo
A fala de `e1_epi_voz` e `e1_epi_voz_a` foi gerada em ritmo mais rápido e acelerada em 12% no ffmpeg para terminar por volta de 3 s (fim da fala em cerca de 3,1 s e 2,9 s). O volume ficou em cerca de -17 LUFS (levemente abaixo de -16, por ser sussurro curto), com pico próximo de -1,5 dBFS.

## Não foi possível ouvir ou conferir
- Eu não ouvi os áudios: só medi (duração, volume, pico, formato) e comparei com uma transcrição automática (Whisper local), que erra nomes e horários. A escuta final é sua.
- Possíveis falhas a ouvir com atenção: `e1_epi_voz_a` (a transcrição ouviu uma pausa após "Eu vi."), `e1_r_t` (a transcrição ouviu "em comenda" no lugar de "encomenda"), `c5_r_a` e `c5_r_a_a` ("18h50" pode ter saído como "18 e 50" ou "18,50"), `c3_r_a` (a transcrição entendeu "Me legado" no lugar de "Delegado" e "ruim" no lugar de "Rui"), `c2_r_k_a` ("16h30" pode ter saído como "16,5"), `c4_r_b` e `c4_r_b_a` ("eu não o vi mais" pode ter saído "não ouvi mais"), `c4_r_h` ("duas horinhas").
- Pronúncia de nomes não conferida: Ícaro, Verônica Villar, Benedita, Matias Quintão, Álvaro Menezes, Iracema.
- A direção de tom (sussurro, tremida, embargada) foi pedida por texto; o resultado depende da escuta.

## Vozes de reserva (padrao_f.mp3 e padrao_m.mp3)
Vozes em inglês com sílabas inventadas (Piper, `en_US-ljspeech-medium` e `en_US-norman-medium`, ambas de domínio público), usadas apenas se uma ligação não tiver arquivo próprio.

## Regravações (12/11/2026)
Nove arquivos foram regravados com o mesmo modelo e as mesmas vozes, em mais dois projetos gratuitos do Google AI Studio (seis no total): `c3_r_a`, `c3_r_h_a`, `c4_r_b`, `c4_r_b_a`, `c4_r_h`, `c6_r_perita_a`, `e1_r_v`, `e1_r_b`, `e1_r_b_a`. As ressalvas acima continuam valendo. O texto da ligação da Bianca (caso 4) passou de "o barman" para "o rapaz do bar", só nessa ligação.


---

# Licenças das vozes · Arquivo Reservado 02 (assets/voz)

## Ferramenta
- **Gemini API (Google), modelo `gemini-2.5-flash-preview-tts`**, vozes pré-definidas do Google. Nenhuma voz de pessoa real foi clonada.
- Silêncio do começo e do fim ajustado para 0,25 s em todos os arquivos (alguns saíram com até 0,5 s). Geradas em 12/11/2026 em projetos gratuitos do Google AI Studio (limite de 10 pedidos por dia por projeto).
- Pós-processamento com ffmpeg: MP3 mono, 44,1 kHz, 128 kbps, normalização perto de -16 LUFS, 0,25 s de silêncio no começo e no fim.
- O modelo foi anunciado como "saindo de linha" em 17/11/2026 (fonte: cloudprice.net). Depois disso, novas faixas podem exigir outro modelo, com vozes um pouco diferentes.

## Uso comercial com anúncios: ressalva pendente
- Pelos Termos Adicionais da Gemini API (versão de 28/04/2026, https://ai.google.dev/gemini-api/terms), o Google não reivindica a propriedade do conteúdo gerado; a responsabilidade pelo uso é de quem gera. Li um resumo da página, não o texto integral.
- Os termos **não mencionam anúncios** de forma específica. **Não há prova explícita de que o uso em app com anúncios é permitido.** Confirmar nos termos vigentes antes de publicar e guardar uma cópia.
- No nível gratuito o Google pode usar os textos enviados para melhorar produtos. Usar vários projetos para contornar a cota gratuita pode contrariar os termos; não consegui confirmar.

## Vozes e durações
| Arquivo | Personagem | Voz (Gemini) | Duração |
|---|---|---|---|
| e2_r_c.mp3 | Cecília Moura | Aoede | 12.6 s |
| e2_r_c_a.mp3 | Cecília Moura (delegada) | Aoede | 12.9 s |
| e2_r_r.mp3 | Rafael Quintela | Rasalgethi | 12.0 s |
| e2_r_r_a.mp3 | Rafael Quintela (delegada) | Rasalgethi | 13.0 s |
| e2_r_d.mp3 | Seu Dalmo Siqueira | Umbriel | 12.4 s |
| e2_r_d_a.mp3 | Seu Dalmo Siqueira (delegada) | Umbriel | 12.7 s |
| e2_r_regina.mp3 | Regina Vaz (opcional) | Erinome | 9.2 s |
| e2_r_regina_a.mp3 | Regina Vaz (opcional, delegada) | Erinome | 8.9 s |
| e2_epi_voz.mp3 | Noêmia Prado (fala final) | Vindemiatrix | 4.3 s |
| e2_epi_voz_a.mp3 | Noêmia Prado (fala final, delegada) | Vindemiatrix | 4.7 s |

Vozes diferentes entre si no caso e diferentes das já usadas nos casos anteriores (Gacrux, Kore, Sulafat, Charon, Puck, Leda, Algenib, Orus). A Regina não estava na tabela de arquivos esperados; usei o nome `e2_r_regina` por analogia com as outras.

## Fala final da Noêmia: encaixe no vídeo
A fala termina em cerca de 4,0 s (`e2_epi_voz`) e 4,4 s (`e2_epi_voz_a`) do início do arquivo, e o arquivo dura 4,3 s e 4,7 s. O briefing pedia terminar por volta de 3,5 s. Para chegar perto disso, a fala foi pedida em ritmo mais ligeiro e acelerada em 25% no ffmpeg. Acelerar mais soaria artificial.
Como o vídeo `e2_epi.mp4` tem 18 s e o áudio entra em 14,35 s, ele passa de 18 s em cerca de 0,6 a 1,0 s. Opções: entrar um pouco antes (em torno de 13,5 s) ou estender o vídeo.

## Não foi possível ouvir ou conferir
- Eu não ouvi os áudios; só medi (duração, volume, pico, altura da voz) e comparei com uma transcrição automática (Whisper local), que erra nomes e números. A escuta final é sua.
- Possíveis falhas a ouvir com atenção: a pronúncia de "Noêmia" (a transcrição escreveu "noímia" em `e2_r_c`), "autômato", "Teodoro" (em `e2_r_regina`), "ene pê" em `e2_r_r` e `e2_r_r_a` (pedi "ene pê" por extenso em vez de "N.P." para a voz não ler "N ponto P"), "pedi emprestado" em `e2_epi_voz_a`.
- A transcrição automática mais forte (Whisper medium) bateu com o texto em todos os arquivos, exceto por números escritos em dígitos pelo próprio transcritor e por "porquê" em `e2_r_r`.
- Rafael usa a voz Rasalgethi (a pedido) e Seu Dalmo usa a Umbriel; ambos foram refeitos depois da primeira versão. Não confirmei se o Rafael soa jovem e fino como pede o briefing, nem se o Seu Dalmo ficou grave: a altura da voz medida ficou em torno de 150 a 180 Hz nos dois.
- Não conferi se o toque fluminense apareceu.
- Os valores de volume ficaram entre -17,6 e -15,8 LUFS, com pico de -1,7 dBFS ou menos; todas as faixas têm menos de 13 s, abaixo do limite de 25 s.

---

# Arquivo Reservado 03, "O Último Número do Circo Esperança" (assets/voz)

## Ferramenta
- **Gemini API (Google), modelo `gemini-2.5-flash-preview-tts`**, vozes pré-definidas do Google. Nenhuma voz de pessoa real foi clonada.
- Geradas em 12/11/2026 em projetos gratuitos do Google AI Studio (limite de 10 pedidos por dia por projeto).
- Pós-processamento com ffmpeg: MP3 mono, 44,1 kHz, 128 kbps, normalização perto de -16 LUFS, 0,25 s de silêncio no começo e no fim. **Nenhum áudio foi acelerado.**
- O modelo foi anunciado como "saindo de linha" em 17/11/2026 (fonte: cloudprice.net). Depois disso, novas faixas podem exigir outro modelo, com vozes um pouco diferentes.

## Uso comercial com anúncios: ressalva pendente
- Pelos Termos Adicionais da Gemini API (versão de 28/04/2026, https://ai.google.dev/gemini-api/terms), o Google não reivindica a propriedade do conteúdo gerado; a responsabilidade pelo uso é de quem gera. Li um resumo da página, não o texto integral.
- Os termos **não mencionam anúncios** de forma específica. **Não há prova explícita de que o uso em app com anúncios é permitido.** Confirmar nos termos vigentes antes de publicar e guardar uma cópia.
- No nível gratuito o Google pode usar os textos enviados para melhorar produtos. Usar vários projetos para contornar a cota gratuita pode contrariar os termos; não consegui confirmar.

## Vozes e durações
| Arquivo | Personagem | Voz (Gemini) | Duração |
|---|---|---|---|
| e3_r_z.mp3 | Madame Zora Campos | Despina | 20.3 s |
| e3_r_z_a.mp3 | Madame Zora Campos (delegada) | Despina | 20.8 s |
| e3_r_v.mp3 | Valquíria Nunes | Laomedeia | 11.5 s |
| e3_r_v_a.mp3 | Valquíria Nunes (delegada) | Laomedeia | 11.5 s |
| e3_r_r.mp3 | Rocco Bellini | Schedar | 16.2 s |
| e3_r_r_a.mp3 | Rocco Bellini (delegada) | Schedar | 16.6 s |
| e3_r_regina.mp3 | Regina Vaz (opcional) | Pulcherrima | 9.4 s |
| e3_r_regina_a.mp3 | Regina Vaz (opcional) (delegada) | Pulcherrima | 10.3 s |
| e3_epi_voz.mp3 | Dona Gertrudes Tavares (fala final) | Autonoe | 6.7 s |
| e3_epi_voz_a.mp3 | Dona Gertrudes Tavares (fala final) (delegada) | Autonoe | 7.2 s |

Vozes diferentes entre si e das já usadas nos casos anteriores (Gacrux, Kore, Sulafat, Charon, Puck, Leda, Algenib, Orus, Aoede, Rasalgethi, Umbriel, Erinome, Vindemiatrix). O Tico "Pimenta" é surdo e não tem ligação: nada foi gravado. A ligação da Regina é a opcional.

## Duas trocas de grafia no texto enviado ao gerador
- "toc" foi enviado como "**tóque**", como pede o briefing. O áudio diz "tóque"; o texto na tela pode continuar "toc".
- Nenhuma outra troca de palavra.

## Fala da Gertrudes: voz mais velha, mas bem mais longa que a janela
A primeira versão (voz Achernar) soou jovem para uma bilheteira de 61 anos, então foi trocada pela voz **Autonoe**, pedindo "avó, rouca e grave, gasta pela idade". A altura medida caiu de cerca de 220 Hz para cerca de 165 Hz, o que indica voz mais madura, mas só a escuta confirma. Em troca, a fala ficou mais lenta: termina em **cerca de 6,5 s** (`e3_epi_voz`, arquivo de 6,7 s) e **cerca de 6,9 s** (`e3_epi_voz_a`, arquivo de 7,2 s), sem acelerar. O briefing pedia 3,5 a 4 s e a janela do vídeo `e3_epi.mp4` é de 4,5 s (entra em 13,5 s, o vídeo tem 18 s). Para caber, o áudio teria de entrar em cerca de 11,3 s, ou o vídeo ser estendido. A voz Achernar (fala em 4,8 s, mais jovem) ficou guardada como alternativa.
As duas versões foram escolhidas entre as gerações para ter altura parecida (cerca de 168 e 167 Hz). A pausa antes de "Mentem" tem 0,66 s em `e3_epi_voz` e 0,77 s em `e3_epi_voz_a`.

## Duração das ligações
Todas abaixo de 25 s. A mais longa é a da Madame Zora, com cerca de 21 s (pausas teatrais).

## Não foi possível ouvir ou conferir
- Eu não ouvi os áudios; só medi (duração, volume, pico, silêncios) e comparei com uma transcrição automática (Whisper medium), que erra nomes e números. A escuta final é sua.
- Pontos para ouvir com atenção:
  - **"Rocco"** em `e3_r_r` (a transcrição ouviu "eu Rocco") e em `e3_r_r_a` (ouviu "Rocco" certo); versões anteriores saíram "Pio", "Loco" e "Oco".
  - **"Delegada"** em `e3_r_r_a`: uma versão anterior disse "delegado". Esta passou na transcrição, mas confirme na escuta.
  - **"Delegado/Delegada"** com D claro em todas.
  - **Valquíria**: `e3_r_v` ficou em -17,8 LUFS e `e3_r_v_a` em -17,3 LUFS, um pouco abaixo de -16; a transcrição ouviu "cumprido" no lugar de "comprido" em `e3_r_v`.
  - **Zora e Gertrudes**: se a voz soa idosa, e se a Gertrudes soa terna sem tom de vilã.
  - **"Mentem"**: a pausa antes da palavra não foi medida.
- Os valores de volume ficaram entre -17.8 e -16.1 LUFS, com pico de -1.5 dBFS ou menos.

---

# Licenças das vozes · Caso 04, "A Voz da Madrugada" (assets/voz)

## Ferramenta
- **Gemini API (Google), modelo `gemini-2.5-flash-preview-tts`**, vozes pré-definidas do Google. Nenhuma voz de pessoa real foi clonada.
- Geradas em 13/11/2026 em projetos gratuitos do Google AI Studio (limite de 10 pedidos por dia por projeto, por isso o uso de vários projetos).
- Pós-processamento com ffmpeg: MP3 mono, 44,1 kHz, 128 kbps, normalização perto de -16 LUFS, 0,25 s de silêncio no começo e no fim. **Nenhum áudio foi acelerado.** Nenhum efeito, música, eco ou som de fundo.
- O modelo foi anunciado como "saindo de linha" em 17/11/2026 (fonte: cloudprice.net). Depois disso, novas faixas podem exigir outro modelo, com vozes um pouco diferentes.

## Uso comercial com anúncios: ressalva pendente
- Pelos Termos Adicionais da Gemini API (versão de 28/04/2026, https://ai.google.dev/gemini-api/terms), o Google não reivindica a propriedade do conteúdo gerado; a responsabilidade pelo uso é de quem gera. Li um resumo da página, não o texto integral.
- Os termos **não mencionam anúncios** de forma específica. **Não há prova explícita de que o uso em app com anúncios é permitido.** Confirmar nos termos vigentes antes de publicar e guardar uma cópia.
- No nível gratuito o Google pode usar os textos enviados para melhorar produtos. Usar vários projetos para contornar a cota gratuita pode contrariar os termos; não consegui confirmar.

## Voz de cada personagem
- **Davi**: Algieba
- **Lia**: Achernar
- **Dona Beth**: Gacrux (trocada de Callirrhoe após o teste: não soava idosa)
- **Cléo**: Zephyr
- **Tadeu**: Achird
- **Wagner**: Zubenelgenubi
- **Seu Horácio**: Alnilam
- **Regina Vaz**: Erinome
- **Hora certa**: Leda
- **Porteiro automático**: Sadaltager
- **Locutor de vinheta**: Sadachbia

A Dona Beth agora usa a Gacrux, que já foi usada em idosas dos casos 00, 01 e 02. A hora certa reaproveita a Leda, que já foi usada em personagens de outros casos (falta voz feminina nova no catálogo). Regina Vaz usa a Erinome, a mesma do caso 02. As demais vozes não repetem as dos casos anteriores.

## Vozes e durações
| Arquivo | Personagem | Voz (Gemini) | Duração |
|---|---|---|---|
| ar_abertura__01.mp3 | Davi | Algieba | 12.2 s |
| ar_boletim__01.mp3 | Davi | Algieba | 8.9 s |
| ar_boletim__02.mp3 | Davi | Algieba | 6.4 s |
| ar_beth__01.mp3 | Davi | Algieba | 5.8 s |
| ar_beth__02.mp3 | Dona Beth | Callirrhoe | 6.5 s |
| ar_beth__03.mp3 | Davi | Algieba | 5.5 s |
| ar_beth__04.mp3 | Dona Beth | Callirrhoe | 5.6 s |
| ensaio_davi__01.mp3 | Davi | Algieba | 16.4 s |
| ensaio_davi__02.mp3 | Davi | Algieba | 12.1 s |
| ensaio_davi__03.mp3 | Davi | Algieba | 7.4 s |
| cleo_demo__01.mp3 | Hora certa | Leda | 4.3 s |
| cleo_demo__02.mp3 | Cléo | Zephyr | 7.4 s |
| cleo_demo__04.mp3 | Hora certa | Leda | 6.3 s |
| cleo_demo__05.mp3 | Cléo | Zephyr | 2.4 s |
| xarope__01.mp3 | Lia | Achernar | 5.9 s |
| xarope__02.mp3 | Davi | Algieba | 4.1 s |
| xarope__03.mp3 | Lia | Achernar | 5.7 s |
| recado_davi__01.mp3 | Davi | Algieba | 12.9 s |
| recado_lia__01.mp3 | Lia | Achernar | 10.4 s |
| porta_manual__01.mp3 | Porteiro automático | Sadaltager | 7.9 s |
| porta_manual__02.mp3 | Porteiro automático | Sadaltager | 1.1 s |
| porta_manual__03.mp3 | Porteiro automático | Sadaltager | 1.1 s |
| porta_manual__04.mp3 | Porteiro automático | Sadaltager | 1.3 s |
| porta_manual__05.mp3 | Porteiro automático | Sadaltager | 1.3 s |
| porta_manual__06.mp3 | Porteiro automático | Sadaltager | 3.0 s |
| porta_manual__07.mp3 | Porteiro automático | Sadaltager | 2.8 s |
| porta_corredor__01.mp3 | Hora certa | Leda | 3.1 s |
| porta_corredor__02.mp3 | Hora certa | Leda | 5.1 s |
| porta_corredor__03.mp3 | Hora certa | Leda | 4.9 s |
| porta_corredor__04.mp3 | Hora certa | Leda | 4.8 s |
| porta_corredor__05.mp3 | Hora certa | Leda | 1.6 s |
| porta_corredor__06.mp3 | Hora certa | Leda | 3.6 s |
| reuniao__01.mp3 | Seu Horácio | Alnilam | 8.1 s |
| reuniao__02.mp3 | Lia | Achernar | 4.5 s |
| reuniao__03.mp3 | Davi | Algieba | 8.2 s |
| reuniao__04.mp3 | Wagner | Zubenelgenubi | 7.1 s |
| entrevista__01.mp3 | Davi | Algieba | 13.3 s |
| entrevista__02.mp3 | Davi | Algieba | 10.8 s |
| entrevista__03.mp3 | Davi | Algieba | 3.9 s |
| jingle_novo__01.mp3 | Locutor de vinheta | Sadachbia | 4.3 s |
| jingle_antigo__01.mp3 | Locutor de vinheta | Sadachbia | 5.8 s |
| bootleg__01.mp3 | Davi | Algieba | 10.2 s |
| r_b.mp3 | Dona Beth | Callirrhoe | 11.7 s |
| r_b_a.mp3 | Dona Beth (delegada) | Callirrhoe | 10.5 s |
| r_c.mp3 | Cléo | Zephyr | 7.7 s |
| r_c_a.mp3 | Cléo (delegada) | Zephyr | 8.3 s |
| r_t.mp3 | Tadeu | Achird | 6.7 s |
| r_t_a.mp3 | Tadeu (delegada) | Achird | 7.0 s |
| r_regina.mp3 | Regina Vaz | Erinome | 10.1 s |
| r_regina_a.mp3 | Regina Vaz (delegada) | Erinome | 10.2 s |
| e4_epi_fala.mp3 | Lia | Achernar | 5.0 s |
| e4_epi_fala_a.mp3 | Lia (delegada) | Achernar | 5.4 s |
| e4_intro_voz.mp3 | Davi | Algieba | 3.0 s |

Os 53 nomes de arquivo seguem exatamente a tabela do briefing. As ligações (`r_b`, `r_c`, `r_t`, `r_regina`), as falas finais (`e4_epi_fala`) e a abertura (`e4_intro_voz`) ficaram sem o prefixo `e4_` quando o briefing não o trazia; se houver conflito com arquivos de outros casos, renomeie.

## Alterações após os testes
- `porta_corredor__05` e `__06` agora dizem "Meia-noite." e "Meia-noite e quinze." (sugestão sua; o texto do jogo precisa ser igual).
- Regravados: ar_beth__02/04, r_b, r_b_a, cleo_demo__02, xarope__01, r_c_a, porta_corredor__04/05/06, jingle_antigo__01, bootleg__01, e4_epi_fala e e4_epi_fala_a.
- `xarope__01`: refeito para a Lia soar com a mesma altura de voz das outras falas (218 Hz; as outras ficam entre 216 e 232 Hz). A transcrição ouviu "vós" em vez de "voz".
- `cleo_demo__02`: duas tentativas novas saíram piores (a transcrição ouviu só 3 a 4 "lá"); ficou a de 7,9 s. Cantado, não conferi.

## Escolhas de leitura do briefing
- Os trechos "aparelho de rádio ligado ao fundo" e "leve ambiente de sala diferente" foram ignorados, porque a regra geral pede voz limpa e sem reverb; você aplica o efeito depois.
- `ar_beth__01` e `ar_beth__03` são o Davi com a mesma voz dele, sem efeito de sala. `ar_beth__02` é a Dona Beth.
- `cleo_demo__02` foi gerado uma só vez (canto de oito "lá", cerca de 7 s).
- A pausa nas pontas é de 0,25 s (menos de 0,3 s, como pedido).

## Não foi possível ouvir ou conferir
- Eu não ouvi os áudios; só medi (duração, volume, pico, silêncios, altura) e comparei com uma transcrição automática (Whisper medium), que erra nomes e números. A escuta final é sua.
- **Cléo, canto (`cleo_demo__02`):** a transcrição ouviu oito "lá", mas não consigo saber se saiu realmente cantado, com melodia, ou só falado em tom longo. A primeira tentativa tinha 30 s e foi descartada.
- **Tadeu:** `r_t_a` foi refeito porque a primeira versão saiu sussurrada e a `r_t` saiu falada. A nova está falada, mas a altura da voz ficou mais grave que a `r_t` (113 Hz contra 150 Hz); ouça os dois juntos.
- **Voz sintética (hora certa e porteiro):** se soam neutras e "de sistema", sem emoção.
- **Hora certa:** `porta_corredor__02` foi o mais difícil de gerar (precisou de várias tentativas pelo modelo devolver resposta vazia) e `porta_corredor__06` também.
- **Pronúncia:** "A Voz de Veludo" em `ar_abertura__01` (a transcrição ouviu "Vós"), "noventa e oito vírgula sete" e os nomes Pirulita, Natal Solidário e Íris. O sotaque mineiro leve foi pedido por texto, mas não confirmei se apareceu.
- **Mesma voz por pessoa:** pedi a mesma voz do Gemini para cada personagem, mas cada geração sai com pequenas variações de timbre e tom. O Davi, com 16 arquivos, é o mais exposto; ouça-o em sequência (abertura, boletim, ensaio, xarope, recado, reunião, entrevista, bootleg).
- **Volume:** a maioria ficou perto de -16 LUFS, entre -18.5 e -14.5. Os nomes soltos do porteiro (`porta_manual__03`, `04`, `06` e `07`) ficaram em cerca de -18 LUFS, porque palavras curtas têm pico alto e não dá para subir mais sem passar de -1 dBFS. Pico máximo de -1.3 dBFS; maior duração de 16.4 s.

