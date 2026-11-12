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
