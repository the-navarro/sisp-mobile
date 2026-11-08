/* ===== Personalização do avatar do jogador (v2): camadas opcionais. Chave ausente = desenho legado intacto ===== */
const A2SHD=(c,a)=>{const n=parseInt(c.slice(1),16);return '#'+[16,8,0].map(q=>Math.round(((n>>q)&255)*(1-a)).toString(16).padStart(2,'0')).join('')};
const A2LIT=(c,a)=>{const n=parseInt(c.slice(1),16);return '#'+[16,8,0].map(q=>Math.round(((n>>q)&255)*(1-a)+255*a).toString(16).padStart(2,'0')).join('')};
const A2SKIN=['#fde7d3','#f6d6bd','#efc7a5','#e3b48c','#d49f78','#c08860','#a87048','#8f5a38','#774a2e','#5f3a24','#4a2c1a','#3a2216'];
const A2EYEC=[['Castanho escuro','#3a2316'],['Castanho','#6a4224'],['Mel','#a06a2a'],['Âmbar','#c08a2a'],['Avelã','#8a7a3a'],['Verde','#3f7a4a'],['Verde-água','#3a8a82'],['Azul','#2f6fb0'],['Azul claro','#7ab0d8'],['Cinza','#7a8490'],['Violeta','#7a4a9a'],['Preto','#15151a']];
const A2HAIRC=['#1c1a1a','#3a2418','#5a3a22','#8a5a2b','#b8863a','#d2ab4a','#e8d9a8','#a33a2a','#c2561f','#b8b8b8','#ececf1','#5b8bd6','#c46aa6','#6a3aa0'];
const A2BROWC=['#1c1a1a','#3a2418','#5a3a22','#8a5a2b','#b8863a','#d2ab4a','#a33a2a','#c2561f','#8a8a8a','#d8d8dc','#5b8bd6','#c46aa6'];
const A2LIPC=[['Natural',null],['Rosa claro','#e29a9a'],['Rosa','#d4687a'],['Coral','#e0705a'],['Vermelho','#b81f2e'],['Vinho','#7a1f3a'],['Nude','#c58a78'],['Marrom','#8a4a3a'],['Roxo escuro','#5a2a4a'],['Rosa chiclete','#ee7fb0']];
const A2CLOTHC=['#2a3550','#2f4f6f','#7a2431','#3a5a3a','#5b6b3a','#6b4a7a','#a3283a','#e9e2d3','#2a2a30','#8a5a2b','#d86a8a','#2a8a8a','#c9962b','#e8a0b0','#9fb4d8','#4a4a55'];
const A2FRAMEC=['#2a2a30','#7a2431','#d9b25a','#2f4f6f','#d86a8a','#e9e2d3','#3a5a3a','#6b4a7a'];
const A2LENSC=['#14141a','#5a3a22','#2f6fb0','#3a8a82','#b81f2e','#ffb6d4','#d9b25a','#6b4a7a'];
const A2FACE=i=>['M50 28C65 28 69 42 67 54C65 66 58 72 50 72C42 72 35 66 33 54C31 42 35 28 50 28Z','M50 29C66 29 71 40 70 52C69 66 61 73 50 73C39 73 31 66 30 52C29 40 34 29 50 29Z','M34 37Q34 28 50 28Q66 28 66 37L68 58L61 71Q50 74 39 71L32 58Z','M32 38Q33 28 50 28Q67 28 68 38Q68 54 50 74Q32 54 32 38Z','M50 25C63 25 67 40 66 54C65 68 58 76 50 76C42 76 35 68 34 54C33 40 37 25 50 25Z','M50 27Q64 28 69 46Q67 62 50 75Q33 62 31 46Q36 28 50 27Z'][i];
const A2BODY=i=>['M14 100C16 78 30 70 50 70C70 70 84 78 86 100Z','M4 100C8 74 26 68 50 68C74 68 92 74 96 100Z','M-4 100C0 76 22 68 50 68C78 68 100 76 104 100Z','M-2 100C2 72 24 66 50 66C76 66 98 72 102 100Z','M12 100C13 80 24 70 40 69Q50 71 60 69C76 70 87 80 88 100Q80 92 70 90Q50 94 30 90Q20 92 12 100Z'][i];
const A2NECK=[12,15,16,19,12];
const A2eye=(cx,cy,sh,iris,side,lash,skin)=>{const [rx,ry,tilt,lid]=[[5.2,3.3,0,1],[4.5,4.1,0,1],[5.6,2.5,0,1],[5.2,3.2,9,1],[5.2,3.2,-9,1],[5.2,3.2,0,2],[5.7,4.5,0,1],[5.4,2.7,0,0]][sh],t=tilt*side*-1,ir=Math.min(ry,3.0);
let g=`<g transform="rotate(${t} ${cx} ${cy})"><ellipse cx=${cx} cy=${cy} rx=${rx} ry=${ry} fill="#f6f2ea"/><circle cx=${cx} cy=${cy} r=${ir+.2} fill="${iris}"/><circle cx=${cx} cy=${cy} r=${ir*.45} fill="#0b0b10"/><circle cx=${cx-.8} cy=${cy-.9} r=.7 fill="#fff"/>`;
g+=`<path d="M${cx-rx-.4} ${cy}Q${cx} ${cy-ry*1.5} ${cx+rx+.4} ${cy}" fill=none stroke="#0006" stroke-width=1 />`;
if(lid===2)g+=`<path d="M${cx-rx} ${cy-ry*.5}Q${cx} ${cy-ry*2.2} ${cx+rx} ${cy-ry*.5}L${cx+rx} ${cy-ry*1.4}Q${cx} ${cy-ry*3} ${cx-rx} ${cy-ry*1.4}Z" fill="${A2SHD(skin,.12)}"/>`;
if(lid===1)g+=`<path d="M${cx-rx} ${cy-ry-.6}Q${cx} ${cy-ry-2.6} ${cx+rx} ${cy-ry-.6}" fill=none stroke="${A2SHD(skin,.35)}" stroke-width=.7 />`;
if(lash>=1){const w=lash===1?1.1:1.9;g+=`<path d="M${cx-rx-.5} ${cy}Q${cx} ${cy-ry*1.6} ${cx+rx+.5} ${cy}" fill=none stroke="#15151a" stroke-width=${w} stroke-linecap=round />`;
if(lash===2)g+=`<path d="M${cx+side*(rx+.2)} ${cy-.3}l${side*2.6} -1.6M${cx+side*(rx-1.2)} ${cy-ry*.9}l${side*2.2} -2" stroke="#15151a" stroke-width=1 stroke-linecap=round />`}
return g+'</g>'};
const A2lash=(cx,cy,side,lash)=>{if(!lash)return '';const rx=5.2,ry=3.2,w=lash===1?1.1:1.9;let g=`<path d="M${cx-rx-.5} ${cy}Q${cx} ${cy-ry*1.6} ${cx+rx+.5} ${cy}" fill=none stroke="#15151a" stroke-width=${w} stroke-linecap=round />`;if(lash===2)g+=`<path d="M${cx+side*(rx+.2)} ${cy-.3}l${side*2.6} -1.6M${cx+side*(rx-1.2)} ${cy-ry*.9}l${side*2.2} -2" stroke="#15151a" stroke-width=1 stroke-linecap=round />`;return g};
const A2brow=(sh,col,side)=>{const [p,w]=[['M37 45L48 44',2.4],['M37 46Q43 41 48 45',2.4],['M37 45L48 44',3.9],['M37 46Q43 42.5 48 45',1.3],['M37 46.5L43 42L48 45',2.2],['M37 43L48 46',2.4],['M40 45L47 44.4',2.6],['M37 46.5Q43 40.5 48 45',3.6]][sh];
return `<path d="${p}" ${side>0?'transform="translate(100 0) scale(-1 1)"':''} stroke="${col}" stroke-width=${w} fill=none stroke-linecap=round stroke-linejoin=round />`};
const A2mouth=(sh,lipc,skin)=>{const base=lipc||A2SHD(skin,.28),dk=A2SHD(base,.35),y=62;
switch(sh){
case 0:return `<path d="M43.5 ${y}q3.2-1.5 6.5-.5q3.3-1 6.5.5q-3.2 2.8-6.5 2.8t-6.5-2.8z" fill="${base}"/><path d="M43.8 ${y+.1}q6.2 1 12.4 0" stroke="${dk}" stroke-width=.8 fill=none />`;
case 1:return `<path d="M44 ${y}q3-1 6-.4q3-.6 6 .4q-3 1.8-6 1.8t-6-1.8z" fill="${base}"/><path d="M44.2 ${y+.1}q5.8 .8 11.6 0" stroke="${dk}" stroke-width=.8 fill=none />`;
case 2:return `<path d="M42.8 ${y}q3.6-2.4 7.2-1q3.6-1.4 7.2 1q-3.4 5.4-7.2 5.4t-7.2-5.4z" fill="${base}"/><path d="M43 ${y+.2}q7 1.4 14 0" stroke="${dk}" stroke-width=.8 fill=none /><path d="M46 ${y+2.4}q4 1.6 8 0" stroke="#fff6" stroke-width=.8 fill=none />`;
case 3:return `<path d="M42.5 ${y-1}q7.5 7 15 0q-7.5 2.2-15 0z" fill="#f6f2ea" stroke="${dk}" stroke-width=.8 /><path d="M42 ${y-1.4}q8 2.4 16 0" stroke="${base}" stroke-width=1.8 fill=none stroke-linecap=round />`;
case 4:return `<path d="M43.5 ${y+.6}q6.5 1.6 13-1.4" stroke="${base}" stroke-width=2.4 fill=none stroke-linecap=round /><path d="M56.5 ${y-.8}q1.4-.4 1.8-1.6" stroke="${dk}" stroke-width=.9 fill=none stroke-linecap=round />`;
case 5:return `<path d="M43.8 ${y}q6.2-2 12.4 0q-1.4 4.6-6.2 4.6t-6.2-4.6z" fill="#3a1a1a"/><path d="M44.6 ${y+.5}q5.4-1.4 10.8 0v1.4q-5.4-1-10.8 0z" fill="#f6f2ea"/><path d="M43.4 ${y}q6.6-2.4 13.2 0" stroke="${base}" stroke-width=1.6 fill=none stroke-linecap=round />`;
case 6:return `<path d="M43 ${y+.2}Q46.5 ${y-2.8} 50 ${y-.8}Q53.5 ${y-2.8} 57 ${y+.2}Q53.5 ${y+4.8} 50 ${y+4.8}Q46.5 ${y+4.8} 43 ${y+.2}z" fill="${base}"/><path d="M43.4 ${y+.3}Q50 ${y+1.8} 56.6 ${y+.3}" stroke="${dk}" stroke-width=.8 fill=none />`;
default:return `<path d="M43.5 ${y+1.2}q6.5-3 13 0" stroke="${base}" stroke-width=2.2 fill=none stroke-linecap=round />`}};
const A2hair=(i,c)=>{const f=`fill="${c}"`,d=A2SHD(c,.25);
switch(i){
case 0:return [`<path d="M29 50c0-22 8-30 21-30s21 8 21 30v24c0 4-4 6-8 6H37c-4 0-8-2-8-6z" ${f}/>`,`<path d="M30 46C28 24 40 20 50 20S72 24 70 46l-1-9q-19-6-38 0z" ${f}/><path d="M36 34q14-3 28 0" stroke="${d}" stroke-width=.8 fill=none />`];
case 1:return [`<path d="M29 50c0-22 8-30 21-30s21 8 21 30v22c0 4-4 6-8 6H37c-4 0-8-2-8-6z" ${f}/>`,`<path d="M30 48C28 24 40 19 52 20S73 26 70 46c-3-8-10-14-22-14-8 3-14 8-18 16z" ${f}/><path d="M34 30q10-6 24-4" stroke="${d}" stroke-width=.8 fill=none />`];
case 2:return [`<path d="M28 52c0-22 9-31 22-31s22 9 22 31c0 12-3 18-6 20-4-8-4-24-4-30H38c0 6 0 22-4 30-3-2-6-8-6-20z" ${f}/>`,`<path d="M29 46C28 26 39 21 50 21S72 26 71 46l-1-8q-20-7-40 0z" ${f}/>`];
case 3:return ['',`<path d="M31 46C27 26 38 18 52 19c13 1 20 11 17 27-2-7-5-11-9-13-7 2-14 0-20-3-3 2-6 8-9 16z" ${f}/><path d="M44 22q6-3 14 0" stroke="${d}" stroke-width=.8 fill=none />`];
case 4:return [`<ellipse cx=50 cy=14 rx=11 ry=9 ${f}/><ellipse cx=50 cy=14 rx=11 ry=9 fill="none" stroke="${d}" stroke-width=.8 />`,`<path d="M31 46C30 26 38 22 50 22S70 26 69 46c-3-6-7-9-10-10-6 2-12 2-18 0-3 1-8 4-10 10z" ${f}/>`];
case 5:return [`<circle cx=22 cy=38 r=9 ${f}/><circle cx=78 cy=38 r=9 ${f}/><path d="M30 46C30 20 70 20 70 46c-3-6-7-9-10-10-6 2-12 2-18 0-3 1-8 4-10 10z" ${f}/>`,`<path d="M31 46C30 24 38 21 50 21S70 24 69 46c-3-6-7-9-10-10-6 2-12 2-18 0-3 1-8 4-10 10z" ${f}/><rect x=17 y=34 width=10 height=3.5 rx=1.5 fill="#d86a8a"/><rect x=73 y=34 width=10 height=3.5 rx=1.5 fill="#d86a8a"/>`];
case 6:return [`<path d="M29 50c0-22 8-30 21-30s21 8 21 30v6c0 4-4 6-8 6H37c-4 0-8-2-8-6z" ${f}/><path d="M68 54c8 6 10 14 6 26M72 56c6 6 8 12 6 22" stroke="${c}" stroke-width=7 fill=none stroke-linecap=round /><path d="M68 62l8 4M70 70l8 4M72 78l6 3" stroke="${d}" stroke-width=1.2 />`,`<path d="M31 46C30 24 38 21 50 21S70 24 69 46c-4-9-10-13-20-13-9 2-14 6-18 13z" ${f}/><circle cx=76 cy=83 r=3 fill="#d86a8a"/>`];
case 7:return ['',`<path d="M34 42c0-14 6-22 16-22s16 8 16 22c-3-5-7-8-10-9-8 2-14 2-22 0z" ${f}/><path d="M31 46c-1-6 0-12 3-16-1 6-1 10 0 14z M69 46c1-6 0-12-3-16 1 6 1 10 0 14z" fill="#0004"/>`];
case 8:return [`<g ${f}><circle cx=50 cy=34 r=29 />${[[26,34],[30,22],[40,14],[50,10],[60,14],[70,22],[74,34],[24,46],[76,46]].map(([x,y])=>`<circle cx=${x} cy=${y} r=7 />`).join('')}</g>`,`<path d="M32 46c-1-12 7-18 18-18s19 6 18 18c-3-6-7-8-10-9-6 2-14 2-20 0-3 1-5 3-6 9z" ${f}/>`];
default:return [`<path d="M44 78q6 4 12 0l1 16q-7 4-14 0z" ${f}/><rect x=44 y=74 width=12 height=5 rx=2 fill="#d86a8a"/>`,`<path d="M30 46C28 24 38 20 50 20S72 24 70 46c-3-8-8-13-20-13s-17 5-20 13z" ${f}/>`]}};
const A2beard=(i,c)=>{const f=`fill="${c}"`;
switch(i){
case 0:return [[60,[-14,-11,-8,-5,-2,1,4,7,10,13]],[64,[-12,-9,-6,-3,0,3,6,9,12]],[68,[-9,-6,-3,0,3,6,9]],[72,[-5,-2,1,4]]].map(([y,xs])=>xs.map(dx=>`<circle cx=${50+dx} cy=${y} r=.55 fill="${c}" opacity=.7 />`).join('')).join('');
case 1:return `<path d="M50 58.5q-5 1.5-9 .2q-4-1.5-7 .5q3 4.5 9 3.5q4-.5 7-4.2zM50 58.5q5 1.5 9 .2q4-1.5 7 .5q-3 4.5-9 3.5q-4-.5-7-4.2z" ${f}/><path d="M34 60q-3 -2 -2 -5M66 60q3 -2 2 -5" stroke="${c}" stroke-width=1.6 fill=none stroke-linecap=round />`;
case 2:return `<path d="M43 58q7-3 14 0q-7 3-14 0z" ${f}/><path d="M45 66q5 2 10 0 1 8-5 11-6-3-5-11z" ${f}/>`;
case 3:return `<path d="M32 48c-1 20 5 38 18 42 13-4 19-22 18-42-3 10-8 16-18 16S35 58 32 48z" ${f}/>`;
case 4:return `<path d="M32 50c0 14 7 24 18 24s18-10 18-24c-3 8-8 12-18 12S35 58 32 50z" ${f}/><path d="M43 61q7-3 14 0q-7 3-14 0z" fill="${A2SHD(c,.2)}"/>`;
default:return `<path d="M32 44v14l3 6v-18zM68 44v14l-3 6v-18z" ${f}/><path d="M42 58.4q8-3.6 16 0q-8 3-16 0z" ${f}/>`}};
const A2GLI=[0,1,2,3,4,5,7,8,9,10,11,12,13];
const A2gl=(i,fc,lc)=>{fc=fc||'#2a2a30';const s=`stroke="${fc}" stroke-width=1.8 fill=none`;
switch(i){
case 0:return `<g ${s}><circle cx=43 cy=50 r=5.8 /><circle cx=57 cy=50 r=5.8 /><path d="M48.8 49.5q1.2-1 2.4 0" /><path d="M37.2 49l-4-1.5M62.8 49l4-1.5" /></g><g fill="#cfe8ff" opacity=.18><circle cx=43 cy=50 r=5.8 /><circle cx=57 cy=50 r=5.8 /></g>`;
case 1:return `<g ${s}><rect x=36 y=45.5 width=12.5 height=9 rx=2 /><rect x=51.5 y=45.5 width=12.5 height=9 rx=2 /><path d="M48.5 49h3" /><path d="M36 48l-3-1M64 48l3-1" /></g><g fill="#cfe8ff" opacity=.18><rect x=36 y=45.5 width=12.5 height=9 rx=2 /><rect x=51.5 y=45.5 width=12.5 height=9 rx=2 /></g>`;
case 2:return `<g stroke="${fc}" stroke-width=1.8 fill="#cfe8ff22" stroke-linejoin=round><path d="M35.5 46.5q5-2 12.5 1.5c0 5-3 7-6.5 7s-6-2.5-6-8.5z" /><path d="M64.5 46.5q-5-2-12.5 1.5c0 5 3 7 6.5 7s6-2.5 6-8.5z" /><path d="M48 49h4" fill=none /></g>`;
case 3:return `<g ${s}><path d="M36.5 47h13c0 6-3 8-6.500 8s-6.500-2-6.500-8z" /><path d="M50.500 47h13c0 6-3 8-6.500 8s-6.500-2-6.500-8z" /><path d="M49.500 47.500h1" /></g><g fill="#cfe8ff" opacity=.16><path d="M36.5 47h13c0 6-3 8-6.5 8s-6.500-2-6.500-8z" /><path d="M50.5 47h13c0 6-3 8-6.5 8s-6.500-2-6.500-8z" /></g>`;
}
const L=lc||'#14141a';
switch(i){
case 4:return `<g stroke="#c9a23a" stroke-width=1.4 fill="${L}" fill-opacity=.78><path d="M35.5 46h14c0 8-3 12-7 12s-7-4-7-12z" /><path d="M50.5 46h14c0 8-3 12-7 12s-7-4-7-12z" /></g><path d="M49.500 47h1" stroke="#c9a23a" /><path d="M39 49l4-1" stroke="#fff6" stroke-width=1 />`;
case 5:return `<g fill="${L}"><rect x=35 y=46 width=13.500 height=9 rx=3 /><rect x=51.500 y=46 width=13.500 height=9 rx=3 /><rect x=48 y=47.500 width=4 height=1.800 /></g><path d="M35 48l-3-1M65 48l3-1" stroke="${fc!=='#2a2a30'?fc:'#14141a'}" stroke-width=1.600 /><path d="M38 48l4 0" stroke="#fff5" stroke-width=1 />`;
case 6:return `<g fill="${L}"><circle cx=43 cy=50 r=6 /><circle cx=57 cy=50 r=6 /></g><path d="M49 49q1 -1 2 0M37 49l-4-1.500M63 49l4-1.500" stroke="#14141a" stroke-width=1.500 fill=none /><path d="M39 47q2-1.500 4-1" stroke="#fff6" stroke-width=1 fill=none />`;
case 7:return `<g fill="${L}" stroke="#14141a" stroke-width=1.200 stroke-linejoin=round><path d="M34.5 46.500q6-3 13.500 1c0 5-3 8-7 8s-7-3-6.500-9z" /><path d="M65.500 46.500q-6-3-13.500 1c0 5 3 8 7 8s7-3 6.500-9z" /></g><path d="M47 49h6" stroke="#14141a" stroke-width=1.200 /><path d="M38 48q2-1 4-.5" stroke="#fff6" stroke-width=1 fill=none />`;
case 8:return `<path d="M34 47q16-3 32 0v4q-3 5-9 5-4 0-7-4-3 4-7 4-6 0-9-5z" fill="${L}" stroke="#14141a" stroke-width=1.200 /><path d="M36 48q6-1.500 12-.5" stroke="#fff5" stroke-width=1 fill=none />`;
case 9:{const Lc=lc||'#ffb6d4';return `<g fill="${Lc}" fill-opacity=.55 stroke="${fc}" stroke-width=1.400><circle cx=43 cy=50 r=5.800 /><circle cx=57 cy=50 r=5.800 /></g><path d="M48.800 49.500q1.200-1 2.400 0" stroke="${fc}" stroke-width=1.400 fill=none />`}
case 10:return '<g fill="#cfe8ff" fill-opacity=.18 stroke="#9aa6b2" stroke-width=.8><circle cx=43 cy=50 r=5.800 /><circle cx=57 cy=50 r=5.800 /></g><path d="M48.800 49.500h2.400M37.200 49.500l-4-1.500M62.800 49.500l4-1.500" stroke="#9aa6b2" stroke-width=.8 fill=none />';
case 11:return '<g fill="#cfe8ff" fill-opacity=.2 stroke="#d8e4ec" stroke-width=2.200 stroke-opacity=.8><rect x=36 y=45.500 width=12.500 height=9 rx=3.500 /><rect x=51.500 y=45.500 width=12.500 height=9 rx=3.500 /></g><path d="M48.500 49h3" stroke="#d8e4ec" stroke-width=1.600 />';
case 12:return `<g ${s}><path d="M43 44l5.500 2.800v5.400L43 55l-5.500-2.800v-5.400zM57 44l5.500 2.800v5.400L57 55l-5.500-2.800v-5.400z" /><path d="M48.500 49h3" /></g><g fill="#cfe8ff" opacity=.16><path d="M43 44l5.500 2.800v5.400L43 55l-5.500-2.800v-5.400zM57 44l5.500 2.800v5.400L57 55l-5.500-2.800v-5.400z" /></g>`;
default:return `<path d="M33 45h34v7q0 4-5 4h-5q-3 0-4-3-1-3-4-3t-4 3q-1 3-4 3h-5q-5 0-5-4z" fill="${lc||'#1a1a22'}" fill-opacity=.9 stroke="#14141a" stroke-width=1.200 /><path d="M37 48h10" stroke="#fff5" stroke-width=1.200 />`}};
const A2out=(i,c,skin,bod)=>{bod=bod==null?1:bod;const tp=`<path d="${A2BODY(bod)}" fill="${c}"/>`,nw=A2NECK[bod],nk=`<rect x=${50-nw/2} y=54 width=${nw} height=22 fill="${skin}"/><path d="M${50-nw/2} 62q${nw/2} 6 ${nw} 0v-3q-${nw/2} 5-${nw} 0z" fill="#0004"/>`,w='#f2f2f2';
switch(i){
case 0:return nk+tp+`<path d="M38 70l12 20 12-20z" fill="${w}"/><path d="M47 75h6l2 20-5 5-5-5z" fill="#a3283a"/><path d="M46 70h8l-1.5 6h-5z" fill="#7a1f2b"/><path d="M30 72l12 24-16 6zM70 72l-12 24 16 6z" fill="#0004"/>`;
case 1:return nk+tp+`<path d="M40 69l10 12 10-12z" fill="${w}"/><path d="M34 69l12 6-6 14-12-6zM66 69l-12 6 6 14 12-6z" fill="${A2SHD(c,.28)}" stroke="#0006" stroke-width=.7 /><path d="M50 81v20" stroke="#0005" stroke-width=1 />`;
case 2:return nk+tp+`<path d="M36 69l14 18 14-18-4 30H40z" fill="${A2SHD(c,.18)}"/><path d="M34 69l10 4-4 12-12-8zM66 69l-10 4 4 12 12-8z" fill="${A2SHD(c,.35)}" stroke="#0006" stroke-width=.8 /><path d="M30 86l40 0" stroke="#0004" stroke-width=1.500 /><circle cx=44 cy=92 r=1.300 fill="#0006"/><circle cx=56 cy=92 r=1.300 fill="#0006"/>`;
case 3:return nk+`<path d="${A2BODY(bod)}" fill="${A2SHD(c,.55)}"/><path d="M40 69l6 14-14 3zM60 69l-6 14 14 3z" fill="${A2SHD(c,.35)}"/><path d="M50 72v28" stroke="#c9c9d0" stroke-width=1.200 /><path d="M20 90q6-12 14-16" stroke="#fff3" stroke-width=2 fill=none stroke-linecap=round /><circle cx=36 cy=82 r=1.200 fill="#c9c9d0"/>`;
case 4:return nk+tp+`<path d="M40 68q10 12 20 0z" fill="${skin}"/><path d="M40 68q10 12 20 0" stroke="${A2SHD(c,.35)}" stroke-width=1.800 fill=none />`;
case 5:return nk+tp+`<rect x=40 y=64 width=20 height=13 rx=6 fill="${A2SHD(c,.12)}"/><path d="M40 70h20" stroke="#0003" stroke-width=1 /><path d="M34 90q16 6 32 0" stroke="#0003" stroke-width=1.200 fill=none />`;
case 6:return nk+tp+`<path d="M40 69l10 24 10-24-4 3-6 14-6-14z" fill="${A2LIT(c,.4)}" /><path d="M50 74v26" stroke="#0004" stroke-width=1 />`+[82,89,96].map(y=>`<circle cx=50 cy=${y} r=1.100 fill="#e9e1cf"/>`).join('');
case 7:return nk+tp+`<path d="M35 70q15 8 30 0l1 6q-16 8-32 0z" fill="${A2SHD(c,.12)}"/><path d="M50 74q-8-6-10 0 2 6 10 0zM50 74q8-6 10 0-2 6-10 0z" fill="${A2SHD(c,.22)}"/><circle cx=50 cy=74 r=2.200 fill="${A2SHD(c,.38)}"/><path d="M47 76l-3 12M53 76l3 12" stroke="${A2SHD(c,.22)}" stroke-width=2.400 stroke-linecap=round />`;
case 8:return nk+tp+`<path d="M36 68q14 22 28 0z" fill="${skin}"/><path d="M36 68q14 22 28 0" stroke="${A2SHD(c,.3)}" stroke-width=1.800 fill=none /><path d="M38 69q12 18 24 0" fill=none stroke="${A2SHD(skin,.18)}" stroke-width=.8 />`;
case 9:return nk+tp+`<path d="M42 69l8 10 8-10z" fill="#f4f4f6"/><path d="M36 69l12 8-3 18-10 5zM64 69l-12 8 3 18 10 5z" fill="${A2SHD(c,.22)}" stroke="#0006" stroke-width=.7 /><path d="M38 98l12-3 12 3" stroke="#0004" stroke-width=1.200 fill=none /><circle cx=50 cy=86 r=1.200 fill="#d7b25a"/>`;
case 10:return nk+tp+`<path d="M38 69l12 8-4 6zM62 69l-12 8 4 6z" fill="#fff" stroke="#9aa" stroke-width=.8 />`+[14,23,32,41,50,59,68,77,86].map(x=>`<path d="M${x} 70v32" stroke="${A2SHD(c,.35)}" stroke-width=3 opacity=.55 />`).join('');
case 11:return nk+tp+`<path d="M30 69Q50 82 70 69Q74 62 66 60Q50 70 34 60Q26 62 30 69Z" fill="${A2SHD(c,.2)}"/><path d="M44 74v10M56 74v10" stroke="#e8e8ee" stroke-width=1.500 stroke-linecap=round /><path d="M36 92h28v8H36z" fill="${A2SHD(c,.12)}"/>`;
case 12:return nk+tp+`<path d="M38 69l12 8-3 6zM62 69l-12 8 3 6z" fill="${A2SHD(c,.25)}"/><path d="M50 77v24" stroke="#fff5" stroke-width=1 /><path d="M28 80h12M60 80h12" stroke="#d9b56a" stroke-width=1 stroke-dasharray="2 2" /><rect x=31 y=84 width=9 height=8 fill="none" stroke="#d9b56a" stroke-width=.8 />`;
default:return nk+tp+`<path d="M18 74Q50 62 82 74L84 82Q50 70 16 82Z" fill="${A2LIT(c,.15)}" opacity=.9 /><path d="M18 74Q50 62 82 74" stroke="${A2SHD(c,.3)}" stroke-width=1 fill=none />`}};
const A2acc=(i,part)=>{const ear=i===1||i===2||i===3||i===7;if(part==='e'!==ear)return '';
switch(i){
case 1:return '<circle cx=31 cy=60 r=2.200 fill="#f4efe6" stroke="#aaa" stroke-width=.4 /><circle cx=69 cy=60 r=2.200 fill="#f4efe6" stroke="#aaa" stroke-width=.4 />';
case 2:return '<circle cx=31 cy=63 r=4 fill=none stroke="#d9b25a" stroke-width=1.300 /><circle cx=69 cy=63 r=4 fill=none stroke="#d9b25a" stroke-width=1.300 />';
case 3:return '<path d="M31 58v5" stroke="#d9b25a" stroke-width=.8 /><path d="M31 63l-2 3 2 3 2-3z" fill="#4aa8d8"/><path d="M69 58v5" stroke="#d9b25a" stroke-width=.8 /><path d="M69 63l-2 3 2 3 2-3z" fill="#4aa8d8"/>';
case 4:return [36,41,46,51,56,61].map(x=>`<circle cx=${x} cy=${(74+((x-50)**2)/55).toFixed(1)} r=2 fill="#f4efe6" stroke="#bbb" stroke-width=.4 />`).join('');
case 5:return '<path d="M36 70q14 12 28 0l-3 8q-11 7-22 0z" fill="#d86a8a"/><path d="M46 78l4 12 4-12z" fill="#c05476"/>';
case 6:return '<path d="M38 70q12 14 24 0" stroke="#d9b25a" stroke-width=1 fill=none /><circle cx=50 cy=82 r=2 fill="#d9b25a"/>';
case 7:return '<circle cx=54.600 cy=55 r=.9 fill="#d9b25a"/>';
default:return ''}};
const A2MKS=['sinal_bochecha','sinal_queixo','sinal_labio','sinal_testa','covinhas','rubor','olheiras','rugas','vitiligo'];
const A2marks=(fr,mk,skin)=>{let o='';mk=mk||[];const ft=A2SHD(skin,.28);
if(fr){let s=7;const r=()=>(s=s*16807%2147483647)/2147483647,n=[0,10,22,40][fr];for(let i=0;i<n;i++){const x=37+r()*26,y=51+r()*9;o+=`<circle cx=${x.toFixed(1)} cy=${y.toFixed(1)} r=${(.5+(i%3)*.15).toFixed(2)} fill="${ft}" opacity=.8 />`}}
if(mk.includes('sinal_bochecha'))o+='<circle cx=38.5 cy=57 r=.9 fill="#3a2a20"/>';
if(mk.includes('sinal_queixo'))o+='<circle cx=55 cy=69 r=.9 fill="#3a2a20"/>';
if(mk.includes('sinal_labio'))o+='<circle cx=57.5 cy=60 r=.8 fill="#3a2a20"/>';
if(mk.includes('sinal_testa'))o+='<circle cx=57 cy=38 r=.9 fill="#3a2a20"/>';
if(mk.includes('covinhas'))o+=`<path d="M41 60q-1.200 1.500 0 3M59 60q1.200 1.500 0 3" stroke="${A2SHD(skin,.35)}" stroke-width=.8 fill=none stroke-linecap=round />`;
if(mk.includes('rubor'))o+='<ellipse cx=38 cy=57.500 rx=5 ry=3 fill="#e0605a" opacity=.28 /><ellipse cx=62 cy=57.500 rx=5 ry=3 fill="#e0605a" opacity=.28 />';
if(mk.includes('olheiras'))o+='<path d="M38 54q5 3 10 0M52 54q5 3 10 0" stroke="#5a4a8a" stroke-width=1.300 fill=none opacity=.28 stroke-linecap=round />';
if(mk.includes('rugas'))o+=`<path d="M37 41q6-1.500 12 0M51 41q6-1.500 12 0" stroke="${A2SHD(skin,.3)}" stroke-width=.7 fill=none /><path d="M40 61q-3 3 0 6M60 61q3 3 0 6" stroke="${A2SHD(skin,.3)}" stroke-width=.7 fill=none />`;
if(mk.includes('vitiligo'))o+='<path d="M60 52q4-2 5 2 0 3-4 3-2-2-1-5z" fill="#fff" opacity=.55 /><path d="M36 66q3-1 3 2-1 2-3 1z" fill="#fff" opacity=.5 />';
return o};
/* chaves novas do perfil (todas opcionais) */
const A2KEYS=['body','skc','face','eye','lash','icx','brow','brc','mouth','lip','hair2','hcx','beard2','gl2','glc','gll','out2','ocx','acc','fr','mk'];
const a2used=P=>A2KEYS.some(k=>P[k]!=null&&!(k==='mk'&&!P[k].length));
/* ===== editor: seções novas dentro das abas existentes ===== */
const A2N={face:['Oval','Redondo','Quadrado','Coração','Alongado','Diamante'],eye:['Amendoado','Redondo','Estreito','Caído','Puxado','Encapuzado','Grande','Pálpebra única'],brow:['Reta','Arqueada','Grossa','Fina','Angulosa','Caída','Curta','Espessa arqueada'],mouth:['Neutra','Fina','Cheia','Sorriso','Meio sorriso','Aberta leve','Coração','Caída'],hair2:['Franja reta','Franja lateral','Chanel com franja','Pixie','Coque alto','Maria-chiquinha','Trança lateral','Undercut','Afro curto','Cabelo preso baixo'],beard2:['Barba rala','Bigode guidão','Cavanhaque','Barba longa','Barba cheia aparada','Costeletas + bigode'],gl2:['Redondo','Retangular','Gatinho','Meia-lua','Aviador','Quadrado grosso','Redondo escuro','Gatinho solar','Esportivo','Lente colorida','Sem aro','Armação transparente','Hexagonal','Máscara de sol'],out2:['Camisa e gravata','Blazer e camisa','Sobretudo','Jaqueta de couro','Camiseta','Gola alta','Cardigã','Blusa de laço','Vestido decote V','Blazer cintado','Camisa listrada','Moletom com capuz','Jaqueta jeans','Vestido gola canoa'],body:['Ombros estreitos','Padrão','Ombros largos','Forte','Curvilíneo'],acc:['Nenhum','Brincos de pérola','Argolas','Pingentes','Colar de pérolas','Lenço no pescoço','Corrente','Piercing no nariz'],fr:['Nenhuma','Leves','Médias','Muitas'],lash:['Sem','Naturais','Marcados'],mk:['Sinal na bochecha','Sinal no queixo','Sinal no lábio','Sinal na testa','Covinhas','Rubor','Olheiras','Rugas','Vitiligo']};
const A2LEG={sk:['skc'],fs:['face'],ey:['eye'],ic:['icx'],br:['brow'],mo:['mouth'],hs:['hair2'],hc:['hcx'],bd:['beard2'],gl:['gl2'],ou:['out2'],cc:['ocx'],tie:['out2'],tc:['out2']};
const A2NUL=k=>{const o={};(A2LEG[k]||[]).forEach(n=>o[n]=null);return o};
const A2SEC={
sk:[{k:'skc',t:'Mais tons de pele',sw:A2SKIN,nm:A2SKIN.map((_,i)=>'Tom '+(i+1))}],
fs:[{k:'face',t:'Mais formatos de rosto',v:[0,1,2,3,4,5]}],
ey:[{k:'eye',t:'Mais formatos de olho',v:[0,1,2,3,4,5,6,7]},{k:'lash',t:'Cílios',v:[0,1,2],z:1}],
ic:[{k:'icx',t:'Mais cores de olho',sw:A2EYEC.map(x=>x[1]),nm:A2EYEC.map(x=>x[0])}],
br:[{k:'brow',t:'Mais sobrancelhas',v:[0,1,2,3,4,5,6,7]},{k:'brc',t:'Cor da sobrancelha',sw:[null,...A2BROWC],nm:['Igual ao cabelo',...A2BROWC.map((_,i)=>'Cor '+(i+1))]}],
mo:[{k:'mouth',t:'Mais bocas',v:[0,1,2,3,4,5,6,7]},{k:'lip',t:'Batom e cor da boca',sw:A2LIPC.map(x=>x[1]),nm:A2LIPC.map(x=>x[0])}],
hs:[{k:'hair2',t:'Mais estilos de cabelo',v:[0,1,2,3,4,5,6,7,8,9]}],
hc:[{k:'hcx',t:'Mais cores de cabelo',sw:A2HAIRC,nm:A2HAIRC.map((_,i)=>'Cor '+(i+1))}],
bd:[{k:'beard2',t:'Mais barbas',v:[0,1,2,3,4,5]}],
gl:[{k:'gl2',t:'Mais óculos (grau, solares e moda)',v:[0,1,2,3,4,5,7,8,9,10,11,12,13]},{k:'glc',t:'Cor da armação',sw:[null,...A2FRAMEC],nm:['Padrão',...A2FRAMEC.map((_,i)=>'Cor '+(i+1))]},{k:'gll',t:'Cor da lente (solares e coloridos)',sw:[null,...A2LENSC],nm:['Padrão',...A2LENSC.map((_,i)=>'Cor '+(i+1))]}],
ou:[{k:'out2',t:'Mais roupas',v:[0,1,2,3,4,5,6,7,8,9,10,11,12,13]}],
cc:[{k:'ocx',t:'Mais cores de roupa',sw:A2CLOTHC,nm:A2CLOTHC.map((_,i)=>'Cor '+(i+1))}],
body:[{k:'body',t:'Formato do corpo',v:[null,0,1,2,3,4]}],
acc:[{k:'acc',t:'Acessórios',v:[0,1,2,3,4,5,6,7],z:1},{k:'fr',t:'Sardas',v:[0,1,2,3],z:1},{k:'mk',t:'Marcas (combináveis)',v:A2MKS,m:1}]};
function plmk(n){plkeep(()=>{const a=(PLT.mk||[]).slice(),i=a.indexOf(n);i<0?a.push(n):a.splice(i,1);PLT.mk=a;render()})}
function plx(cat,crop){const L=A2SEC[cat];if(!L)return '';return L.map(s=>{const P=PLT;let b;
if(s.sw)b=`<div class=plsws>${s.sw.map((c,i)=>{const on=P[s.k]==null?c===null:P[s.k]===c;return `<button class="plsw ${on?'on':''} ${c?'':'n0'}" ${c?`style="background:${c}"`:''} title="${(s.nm||[])[i]||''}" aria-label="${(s.nm||[])[i]||''}" onclick="plset('${s.k}',${c?`'${c}'`:'null'})"></button>`}).join('')}</div>`;
else b=`<div class=plg>${s.v.map(v=>{const on=s.m?(P.mk||[]).includes(v):(s.z&&P[s.k]==null?v===0:(P[s.k]==null?null:P[s.k])===v),lab=s.m?A2N.mk[A2MKS.indexOf(v)]:v==null?'Atual':A2N[s.k][v];return `<button class="plo ${on?'on':''}" onclick="${s.m?`plmk('${v}')`:`plset('${s.k}',${v})`}">${plth(s.k,s.m?[v]:v,crop)}<span>${lab}</span></button>`}).join('')}</div>`;
return `<div class="pll plsec">${s.t}</div>${b}`}).join('')}
const a2clean=P=>{A2KEYS.forEach(k=>{if(P[k]==null||(k==='mk'&&!P[k].length))delete P[k]});if(a2used(P))P.v=2;else delete P.v;return P};
