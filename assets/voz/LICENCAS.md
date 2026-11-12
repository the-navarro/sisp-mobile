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
