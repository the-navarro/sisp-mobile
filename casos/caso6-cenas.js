// Cenários desenhados do Caso 6 — A Falsificação da Galeria
const c6art=(x,y,w,h,mode)=>`${rc(x-5,y-5,w+10,h+10,'#6b4a2a')}${rc(x-2,y-2,w+4,h+4,'#c9a44a')}${rc(x,y,w,h,mode==='empty'?'#0d0b10':'#2a3a5a')}${mode==='empty'?'':`<path d="M${x} ${y+h*.7}q${w*.25} -${h*.3} ${w*.5} -${h*.1}t${w*.5} -${h*.2}V${y+h}H${x}z" fill="#3b5a4a" /><circle cx=${x+w*.72} cy=${y+h*.28} r=${w*.09} fill="#e8d9a0" /><path d="M${x} ${y+h*.82}q${w*.3} -${h*.2} ${w} -${h*.05}V${y+h}H${x}z" fill="#1d2e28" />`}`;
const c6cam=(x,y,rot)=>`<g transform="translate(${x} ${y}) rotate(${rot||0})"><rect x=-9 y=-5 width=18 height=10 rx=2 fill="#1d2127" stroke="#59616e" /><circle cx=7 cy=0 r=3 fill="#07090c" stroke="#8d97a6" /><circle cx=-5 cy=-2 r=1.5 fill="#ff3030"><animate attributeName=opacity values="1;.2;1" dur="1.6s" repeatCount=indefinite /></circle></g><path d="M${x} ${y+4}v-10" stroke="#59616e" stroke-width=2 />`;
SCN['c6:galeria']={b:SW('#3b3744')+rc(0,118,360,6,'#2a2630')+SP.spot(130,34)+SP.spot(250,34)
+c6art(96,34,70,58,'empty')+`<path d="M96 92L166 92L174 118H88z" fill="#ffe9a8" opacity=.05 />`+rc(104,102,54,5,'#d9d4c8')+`<text x=131 y=106 font-size=4 fill="#222" text-anchor=middle font-family=serif>Iracema Pontes</text>`
+c6art(220,40,44,36,'full')+c6art(284,46,38,30,'full')+c6art(24,44,38,32,'full')
+c6cam(346,10,0)+SFL('zfw')
+`<path d="M60 168q30 -8 60 0t60 0t60 0t60 0" stroke="#7a1420" stroke-width=3 fill=none opacity=.8 />`+[60,120,180,240,300].map(x=>rc(x-2,160,4,30,'#c9a44a')+`<circle cx=${x} cy=160 r=4 fill="#c9a44a" />`).join('')
+SP.table(22,172,70,'#5a4a3a')+rc(34,166,26,6,'#d9d4c8')+rc(64,168,18,4,'#8ab4d8')
+`<g transform="translate(188 176)"><rect x=0 y=0 width=44 height=26 rx=3 fill="#2a2630" stroke="#59616e" /><rect x=4 y=4 width=36 height=18 fill="#1a2a4a" /><path d="M8 18l8-8 6 6 8-10 6 12z" fill="#7a5cff" opacity=.7 /></g>`
+glw(131,70,80)+dust,
h:{cam_sala:[346,12,.28],laudo_uv:[210,190,.25],laudo_pigmento:[48,178,.25],etiqueta_peso:[131,106,.22],seguro_foto:[250,60,.22]}};
SCN['c6:atelie']={b:SW('#3a2e26')+SP.win(250,22,70,60,'moon')+SP.shelf(12,20,110,80,3,['#c9362e','#2a6bff','#e0b02a','#3a8a4a','#d9d4c8'])
+`<g transform="translate(150 36)"><path d="M0 110L18 0M60 110L42 0M30 110V20" stroke="#4a2f1b" stroke-width=5 /><rect x=4 y=22 width=52 height=42 fill="#d9d4c8" stroke="#6b4a2a" /><path d="M8 58q14 -22 22 -8t24 -20V64H8z" fill="#3b5a4a" /></g>`
+c6cam(10,12,0)+SFL('zfw')
+SP.bench(20,140,150)+rc(36,134,22,6,'#ddd','')+`<rect x=64 y=128 width=14 height=12 rx=2 fill="#c9362e" /><rect x=84 y=130 width=12 height=10 rx=2 fill="#2a6bff" />`
+`<rect x=122 y=132 width=20 height=8 rx=2 fill="#101820" stroke="#8d97a6" /><circle cx=132 cy=136 r=1.5 fill="#7a5cff" />`
+SP.desk(210,150,100)+`<rect x=228 y=146 width=32 height=6 fill="#d8d4c4" /><path d="M232 149h24" stroke="#555" />`
+`<g transform="translate(296 168)"><path d="M0 0h22l-3 28h-16z" fill="#3a4654" stroke="#0008" /><path d="M5 -2l-3 -10M10 -2l1 -12M15 -2l4 -9" stroke="#c9a44a" stroke-width=2 /></g>`
+`<g transform="translate(330 150) rotate(12)"><rect x=0 y=0 width=10 height=70 rx=5 fill="#c9b78a" stroke="#8a7a50" /></g>`
+glw(180,90,80)+dust,
h:{registro_atelie:[244,146,.24],cam_atelie:[10,14,.28],pincel_lixo:[307,188,.24],celular:[132,134,.22]}};
SCN['c6:deposito']={b:SW('#252b30')+SP.shelf(14,20,120,96,3,['#8a6a3a','#6a5a48','#a08a5a','#4a5a6a'])+SP.rail(160,60,120)+SFL('zfc')
+SP.crate(24,150,40)+SP.crate(70,158,34)+SP.crate(40,116,34)+SP.crate(150,148,44)+SP.crate(200,158,36)
+`<g transform="translate(250 100)"><rect x=0 y=0 width=14 height=88 rx=7 fill="#c9b78a" stroke="#8a7a50" /><rect x=2 y=10 width=10 height=3 fill="#7a1420" /></g>`
+`<g transform="translate(290 150)"><rect x=0 y=0 width=40 height=28 fill="#d8d4c4" stroke="#8a7a50" /><path d="M5 8h30M5 14h24M5 20h18" stroke="#555" /><circle cx=34 cy=22 r=3 fill="#c9362e" /></g>`
+`<path d="M180 6v26" stroke="#59616e" stroke-width=2 /><circle cx=180 cy=36 r=5 fill="#ffe9a8" />`+glw(180,36,90)+dust,
h:{guia_transporte:[310,164,.26]}};
// Exterior da galeria (abertura em vídeo)
XT.c6=()=>XSKY('#0a0c1a','#2a2440',520)+stars(34,170)+`<circle cx=300 cy=70 r=20 fill="#efe3bd" opacity=.85 />`+tree(20,520,1.1,'#10241c')+tree(344,520,1.2,'#0e2018')
+`<rect x=40 y=310 width=280 height=210 fill="#3a3646" />`+`<path d="M30 310h300l-12-24H42z" fill="#24212e" />`+`<rect x=40 y=306 width=280 height=6 fill="#c9a44a" />`
+`<rect x=88 y=322 width=184 height=30 rx=3 fill="#0d0b12" stroke="#c9a44a" stroke-width=1.6 /><text x=180 y=343 text-anchor=middle font-size=14 font-weight=700 fill="#f0d98a" font-family="Georgia,serif" letter-spacing=2>GALERIA DUARTE</text>`
+[0,1].map(i=>`<rect x=${58+i*196} y=372 width=88 height=96 fill="#161420" stroke="#c9a44a" stroke-width=2 /><rect x=${66+i*196} y=382 width=34 height=28 fill="#2a3a5a" stroke="#c9a44a" /><rect x=${106+i*196} y=392 width=30 height=20 fill="#3b5a4a" stroke="#c9a44a" />${i?'':'<rect x=66 y=424 width=70 height=3 fill="#f6c869" opacity=.5 />'}`).join('')
+`<rect x=150 y=420 width=60 height=100 fill="#1a1620" stroke="#c9a44a" stroke-width=2 /><rect x=154 y=424 width=52 height=92 fill="#f6c869" opacity=0 class=dr />`
+`<path d="M150 420h60M180 420v100" stroke="#c9a44a" stroke-width=1.4 />`+XGR('#2a2a34','#16161c')+lampx(30)+lampx(334);
