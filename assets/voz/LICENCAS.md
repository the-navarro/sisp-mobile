# Vozes padrão (Simlish) — SISP Mobile

Arquivos: `c1_r_c.mp3` (feminina, 12,2 s) e `c1_r_v.mp3` (masculina, 17,0 s).
Formato: MP3 mono, 44,1 kHz, 128 kbps, respiro de 0,25 s antes e depois.
Loudness medido nos MP3: cerca de -17 LUFS (alvo -16; o limite de pico de -1 dBFS impediu subir mais).

## Ferramenta e vozes
- TTS: **Piper** (`piper-tts` 1.8.0, código MIT), rodando localmente, sem voz clonada e sem pessoa real identificável.
- Feminina (`c1_r_c`): `en_US-ljspeech-medium`. Dataset LJ Speech, **domínio público**. Treinada do zero.
- Masculina (`c1_r_v`): `en_US-norman-medium`. Gravações do LibriVox, **domínio público**. Treinada do zero.
- Pós-processamento com ffmpeg: loudnorm em 2 passadas, mono, 44,1 kHz, MP3 128 kbps.

## Por que não usei vozes pt-BR
As vozes pt-BR do Piper (`cadu`, `faber`, `jeff`) têm dataset CC0, mas foram **ajustadas a partir da voz `lessac`**. A licença do dataset Lessac (Blizzard 2013) exclui "qualquer finalidade comercial" (cláusula 1.1). Não há decisão clara sobre se isso contamina modelos derivados, então preferi evitar o risco num jogo com anúncios. Pelo mesmo motivo descartei `ryan`, `hfc_male` e `l2arctic` (licenças NC) e `amy` (licença "ver URL", não verificada).

## Pontos de atenção
- O Piper usa o fonemizador **espeak-ng (GPL)**. O mantenedor do Piper diz que não está claro se isso afeta os WAVs gerados. Não sou advogado: se quiser segurança total, vale uma consulta jurídica ou usar um TTS sem espeak-ng.
- O Piper não publica licença própria nos modelos. As licenças acima vêm dos cartões dos modelos (`MODEL_CARD`) no repositório `rhasspy/piper-voices`.

## Ajustes no texto (para não soar como palavra real)
`bro` → `bru`, `mel` → `mev`, `mora` → `mura`, `fen` → `fet`, `mi` → `mu`, `nol` → `nul`, `kesa` → `kesu`. Acentos removidos, porque as vozes são em inglês (`é` → `e`, `ké` → `ke`, `tó` → `to`).

## Qualidade, com honestidade
- As duas vozes são **inglesas lendo sílabas inventadas**. A prosódia é a de uma leitura em inglês, não a de uma pessoa falando de verdade.
- Os dois áudios ficam **abaixo de "voz humana natural"**. O Piper medium é claramente sintético.
- Eu não consegui ouvir os arquivos, só conferir duração, formato e loudness. Escute antes de usar.
- O efeito de "confessar" na feminina é só queda de volume e fala mais lenta nas duas últimas frases. A masculina tem fala lenta e pausas, sem mudança de tom.
- As durações passaram do alvo (~10 s e ~14 s). Acelerar mais deixava a fala corrida demais.
