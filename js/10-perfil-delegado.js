const DEFPL={n:'',g:'m',sk:2,hs:0,hc:1,bd:0,ht:1,gl:0,cc:0,ou:0,tie:1,hcl:0,bc:0,tc:0,fs:0,ey:0,ic:0,no:0,br:0,mo:0};const ICL=['#3a2a1c','#4a6a3a','#4a6a9a','#8a6a2a','#6a7480'],EKS=['almond','round','narrow','down','up','hooded','wide'],NKS=['straight','button','wide','pointed','hooked','up','bulb'],FSZ=[[17,20],[18.5,19],[19,20],[15.5,20.5]];
const SK=['#f1d3b8','#e0b898','#c99a76','#a87752','#8a5a3a','#5c3a26'],HC=['#1c1a1a','#4a2e1a','#8a5a2b','#d2ab4a','#b8b8b8','#a33a2a','#e8d9a8','#ececf1','#5b8bd6','#c46aa6'],CC=['#9a7d4d','#6e7681','#34495e','#7a2a35','#3f5a3a','#26262c','#d8cfb8','#2f6f9a','#7a4a2a','#6b4a8a'],HS=['Curto','Longo','Cacheado','Coque','Raspado','Careca','Chanel','Rabo de cavalo','Black power','Tranças','Topete','Ondulado','Dreads','Lateral','Cacheado longo'];
const rl=z=>z.r+(PDX[z.id]&&PDX[z.id].age?' · '+PDX[z.id].age+' anos':'');
const plv=()=>PLO&&PLT?PLT:Object.assign({},DEFPL,META.pl||{});
function TT(){const p=plv();return{D:p.g==='f'?'Delegada':p.g==='n'?'Delegade':'Delegado',n:(p.n||'').trim()}}
function gx(t){if(typeof t!=='string')return t;const p=plv(),g=p.g,n=(p.n||'').trim();if(g==='m'&&!n)return t;const F=g==='f',N=g==='n',d=F?'delegada':N?'delegade':'delegado',D=F?'Delegada':N?'Delegade':'Delegado',nm=n?' '+n:'';
return t.replace(/de volta, delegado\b/g,()=>'de volta, '+d+nm).replace(/\bBem-vindo\b/g,()=>F?'Bem-vinda':N?'Bem-vinde':'Bem-vindo').replace(/\bao delegado\b/g,()=>F?'à delegada':N?'a delegade':'ao delegado').replace(/\bdo delegado\b/g,()=>F?'da delegada':N?'de delegade':'do delegado').replace(/\b([Oo]) delegado\b/g,(m,o)=>F?(o==='O'?'A':'a')+' delegada':N?(o==='O'?'Delegade':'delegade'):m).replace(/\bDelegado-/g,()=>D+'-').replace(/\bDelegado\b/g,()=>D+nm).replace(/\bdelegado\b/g,()=>d)}
let NOBG=0;
const headOnly=(id,st)=>{NOBG=1;try{return PDX[id]?pt(id,st):detSvg(st>=2,null)}finally{NOBG=0}};
const hdsv=(id,st,x,y,w)=>`<svg x=${x} y=${y} width=${w} height=${w*66/68} viewBox="16 8 68 66">${headOnly(id,st)}</svg>`;
const HDT='translate(50 72) scale(.92) translate(-50 -72)';
function detSvg(w,E){const P=plv(),nw=P.g==='f'?13:P.g==='n'?15:17,sd=P.g==='f'?15:P.g==='n'?7:0,[fx,fy]=FSZ[P.fs||0]||FSZ[0],ek=EKS[P.ey||0],ic=ICL[P.ic||0],bi=P.br||0,mth=[3.4,2.2,4.8][P.mo||0],sk=SK[P.sk]||SK[2],hc=HC[P.hc]||HC[1],cc=CC[P.cc]||CC[0],hs=P.hs,f=`fill="${hc}"`;let back='',front=`<path d="M32 46c-1-16 7-22 18-22s19 6 18 22c-3-6-6-9-9-10-6 2-14 2-20 0-3 1-6 4-7 10z" ${f}/>`;
switch(hs){
case 1:back=`<path d="M29 50c0-20 8-28 21-28s21 8 21 28v22c0 4-4 6-8 6H37c-4 0-8-2-8-6z" ${f}/>`;break;
case 2:back=`<g ${f}><ellipse cx=50 cy=50 rx=24 ry=27 /><circle cx=27 cy=54 r=7 /><circle cx=73 cy=54 r=7 /><circle cx=29 cy=63 r=6 /><circle cx=71 cy=63 r=6 /><circle cx=36 cy=69 r=5.500 /><circle cx=64 cy=69 r=5.500 /><circle cx=31 cy=42 r=9 /><circle cx=39 cy=30 r=10 /><circle cx=50 cy=26 r=11 /><circle cx=61 cy=30 r=10 /><circle cx=69 cy=42 r=9 /></g>`;break;
case 3:back=`<circle cx=50 cy=19 r=9 ${f}/>`;break;
case 4:front=front.replace('/>',' opacity=.55 />');break;
case 5:front='';break;
case 6:back=`<path d="M28 50c0-20 9-29 22-29s22 9 22 29v15c0 4-4 6-8 6H36c-4 0-8-2-8-6z" ${f}/>`;front=`<path d="M30 46c-2-17 7-26 20-26s22 9 20 26c-1-3-3-6-5-7-10-3-20-3-30 0-2 1-4 4-5 7z" ${f}/>`;break;
case 7:back=`<path d="M64 34c14 0 18 14 12 30-2 6-6 8-8 4 3-8 1-16-6-20z" ${f}/><circle cx=65 cy=36 r=3 fill="#a3283a"/>`;break;
case 8:back=`<circle cx=50 cy=33 r=30 ${f}/>`;break;
case 9:back=`<g ${f}>${[58,67,76,85].map(y=>`<ellipse cx=29 cy=${y} rx=4 ry=5 /><ellipse cx=71 cy=${y} rx=4 ry=5 />`).join('')}</g>`;break;
case 10:front=`<path d="M31 46c-4-22 6-34 21-34 13 0 21 9 18 34-3-8-6-12-10-13-9-3-17-3-22 0-4 2-6 6-7 13z" ${f}/>`;break;
case 11:back=`<path d="M28 48c-3 12 3 17-1 25-3 6 2 9 7 10h32c5-1 10-4 7-10-4-8 2-13-1-25 0-18-9-26-22-26s-22 8-22 26z" ${f}/>`;break;
case 12:back=`<path d="M30 44v34M36 40v40M64 40v40M70 44v34M24 50v26M76 50v26" stroke="${hc}" stroke-width=5 stroke-linecap=round fill=none />`;break;
case 14:back=`<path d="M23 46c-4 24-2 40 6 50l10 4h22l10-4c8-10 10-26 6-50-4-18-14-26-27-26s-23 8-27 26z" ${f}/><g ${f}>${[[26,50],[24,62],[26,74],[31,84],[74,50],[76,62],[74,74],[69,84],[36,88],[64,88],[28,40],[72,40]].map(([x,y])=>`<circle cx=${x} cy=${y} r=${y>80?8:9.5} />`).join('')}</g><g ${f}>${[[32,32],[41,25],[50,22],[59,25],[68,32]].map(([x,y])=>`<circle cx=${x} cy=${y} r=10 />`).join('')}</g>`;front=`<g ${f}>${[[35,36],[42,32],[50,31],[58,32],[65,36]].map(([x,y])=>`<circle cx=${x} cy=${y} r=5.4 />`).join('')}</g>`;break;
case 13:front=`<path d="M31 46c-2-18 8-25 20-25 12 0 20 8 18 25-2-9-7-14-14-15-9 3-17 7-24 15z" ${f}/>`;break;
}
const shd=(c,a)=>{const n=parseInt(c.slice(1),16);return '#'+[16,8,0].map(q=>Math.round(((n>>q)&255)*(1-a)).toString(16).padStart(2,'0')).join('')};
const HTC=[null,'#383843','#1c1c20','#8a5a2b','#c9b48a','#7a1f2b','#2a3f6a','#4a6a3a','#a33a2a','#7a808a','#c9962b'],TCL=[null,'#a3283a','#2f5a9a','#2a2a30','#3f7a4a','#c9962b','#6b4a8a','#e4e0d8','#d86a8a','#8a5a2b','#2a8a8a'];
const HT=[ '',
c=>{c=c||'#383843';return `<ellipse cx=50 cy=33 rx=34 ry=7 fill="${shd(c,.35)}"/><path d="M31 33c0-20 8-26 19-26s19 6 19 26z" fill="${c}"/><rect x=31 y=25 width=38 height=5 fill="${c==='#7a1f2b'?'#d7b25a':'#7a1f2b'}"/>`},
c=>{c=c||'#3a2f55';return `<ellipse cx=50 cy=30 rx=27 ry=10 fill="${c}"/><circle cx=50 cy=19 r=2.6 fill="${c}"/>`},
c=>{c=c||'#2f6f9a';return `<path d="M31 35c0-15 8-21 19-21s19 6 19 21z" fill="${c}"/><path d="M50 14v21" stroke="${shd(c,.25)}" stroke-width=1 /><path d="M58 33c10-1 21 1 24 6-9 2-19 1-28-1z" fill="${shd(c,.25)}"/><circle cx=50 cy=14 r=2.2 fill="${shd(c,.25)}"/>`},
c=>{c=c||'#a33a2a';return `<path d="M30 37c-1-17 7-27 20-27s21 10 20 27z" fill="${c}"/><rect x=29 y=31 width=42 height=8 rx=3 fill="${shd(c,.3)}"/><circle cx=50 cy=9 r=4.5 fill="#e8e0d0"/>`},
c=>{c=c||'#a06a32';return `<path d="M33 35c0-12 4-22 17-22s17 10 17 22z" fill="${c}"/><path d="M42 17q8 5 16 0" stroke="${shd(c,.35)}" stroke-width=1.4 fill=none /><path d="M10 34c8 6 22 6 40 3 18 3 32 3 40-3-3-8-13-6-20-5-5-8-9-18-20-18S35 23 30 31c-7-1-17-3-20 3z" fill="${shd(c,.12)}"/><path d="M33 33c10 3 24 3 34 0v-4c-10 3-24 3-34 0z" fill="${shd(c,.6)}"/>`},
c=>{c=c||'#2a2a33';return `<ellipse cx=50 cy=34 rx=31 ry=5 fill="${shd(c,.25)}"/><path d="M32 34c0-18 8-25 18-25s18 7 18 25z" fill="${c}"/><rect x=32 y=27 width=36 height=4 fill="#555"/>`},
c=>{c=c||'#7d8c5a';return `<path d="M18 37c8-6 18-6 32-6s24 0 32 6c-8 4-18 5-32 5s-24-1-32-5z" fill="${shd(c,.12)}"/><path d="M33 34c0-14 6-21 17-21s17 7 17 21z" fill="${c}"/><path d="M33 31h34" stroke="${shd(c,.3)}" stroke-width=1.6 />`},
c=>{c=c||'#1d2a44';return `<path d="M30 33c0-9 8-15 20-15s20 6 20 15z" fill="${c}"/><rect x=30 y=29 width=40 height=5 fill="${shd(c,.4)}"/><path d="M32 34h36c0 6-8 8-18 8s-18-2-18-8z" fill="${shd(c,.55)}"/><circle cx=50 cy=25 r=2.8 fill="#d7b25a"/>`}];
const hat=(typeof HT[P.ht||0]==='function'?HT[P.ht||0](P.hcl?HTC[P.hcl]:null):HT[P.ht||0])||'';
const bf=`fill="${P.bc?HC[P.bc-1]:hc}"`,BDS=['',
`<path d="M35 55c1 12 7 18 15 18s14-6 15-18c-3 5-8 8-15 8s-12-3-15-8z" ${bf}/>`,
`<path d="M42 58q8-4 16 0q-8 3-16 0z" ${bf}/>`,
`<path d="M43 64q7 3 14 0 2 8-7 10-9-2-7-10z" ${bf}/>`,
`<path d="M33 52c-1 16 6 28 17 30 11-2 18-14 17-30-3 8-8 12-17 12S36 60 33 52z" ${bf}/>`,
`<path d="M35 55c1 12 7 18 15 18s14-6 15-18c-3 5-8 8-15 8s-12-3-15-8z" ${bf} opacity=.34 />`,
`<path d="M32.500 45v13l3.500 4v-14zM67.500 45v13l-3.500 4v-14z" ${bf}/>`,
`<path d="M42 58q8-4 16 0q-8 3-16 0z" ${bf}/><path d="M43 65q7 3 14 0 2 7-7 9-9-2-7-9z" ${bf}/>`,
`<path d="M49 58.500q-5 3-10 .5-3-1.500-5 1.500 4-6.500 12-2zM51 58.500q5 3 10 .5 3-1.500 5 1.500-4-6.500-12-2z" ${bf}/>`,
`<path d="M34 50c0 14 6 22 16 22s16-8 16-22l-3 2c0 11-5 16-13 16s-13-5-13-16z" ${bf}/>`];
const bd=BDS[P.bd||0]||'';
const GL=['',
`<g fill=none stroke="#2a2a30" stroke-width=1.8><circle cx=43 cy=50 r=5.5 /><circle cx=57 cy=50 r=5.5 /><path d="M48.5 50h3" /></g>`,
`<g fill=none stroke="#2a2a30" stroke-width=1.8><rect x=36.500 y=45.500 width=12 height=9 rx=2 /><rect x=51.500 y=45.500 width=12 height=9 rx=2 /><path d="M48.5 49h3" /></g>`,
`<g stroke="#b8963a" stroke-width=1.4 fill="#7a8aa044"><path d="M36.500 46h13c0 8-3 11-6.500 11s-6.500-3-6.500-11z" /><path d="M50.500 46h13c0 8-3 11-6.500 11s-6.500-3-6.500-11z" /><path d="M49.500 47h1" fill=none /></g>`,
`<g fill="#14141a"><rect x=35.500 y=46 width=13 height=8.500 rx=3 /><rect x=51.500 y=46 width=13 height=8.500 rx=3 /><rect x=48 y=47.500 width=4 height=1.800 /></g><path d="M35.500 48l-3-1M64.500 48l3-1" stroke="#14141a" stroke-width=1.500 /><path d="M38 48l4 0" stroke="#fff5" stroke-width=1 />`,
`<g fill=none stroke="#a3283a" stroke-width=1.900 stroke-linejoin=round><path d="M35 47l12 1.500c0 5-3 7-6.500 7S35 52 35 47z" /><path d="M65 47l-12 1.500c0 5 3 7 6.500 7S65 52 65 47z" /><path d="M47 49h6" /></g>`,
`<g fill=none stroke="#a3283a" stroke-width=2.400><circle cx=43 cy=50 r=5.800 /><circle cx=57 cy=50 r=5.800 /><path d="M48.800 50h2.400" /></g>`,
`<g fill=none stroke="#c9a23a" stroke-width=1.500><circle cx=57 cy=50 r=6.500 /><path d="M63 53q5 12-1 26" stroke-width=1 /></g>`,
`<g stroke="#2a2a30" stroke-width=1.500 fill="#7fb6ff33"><ellipse cx=43 cy=50 rx=7 ry=5.200 /><ellipse cx=57 cy=50 rx=7 ry=5.200 /></g><path d="M50 50h0" stroke="#2a2a30" />`];
const gl=GL[P.gl||0]||'';
const T=P.tie==null?1:P.tie,ou=P.ou||0,tcl=d=>P.tc?TCL[P.tc]:d;
const tie=[`<path d="M38 70l8 7M62 70l-8 7" stroke="#cfd3da" stroke-width=1.6 stroke-linecap=round fill=none />`,`<path d="M47 75h6l2 20-5 5-5-5z" fill="${tcl('#a3283a')}"/><path d="M46 70h8l-1.500 6h-5z" fill="${shd(tcl('#a3283a'),.3)}"/>`,`<path d="M47 75h6l2 20-5 5-5-5z" fill="${tcl('#2f5a9a')}"/><path d="M46 70h8l-1.500 6h-5z" fill="${shd(tcl('#2f5a9a'),.3)}"/>`,`<path d="M50 75l-10-5v10zM50 75l10-5v10z" fill="${tcl('#22222a')}"/><circle cx=50 cy=75 r=2.200 fill="${shd(tcl('#22222a'),.3)}"/>`,`<path d="M35 69q15 11 30 0l2 7q-17 10-34 0z" fill="${tcl('#c9962b')}"/><path d="M56 75l6 22-7 2-3-20z" fill="${shd(tcl('#c9962b'),.25)}"/>`][T]||'';
const nkx=`<rect x=${50-nw/2} y=54 width=${nw} height=22 fill="${sk}"/><path d="M${50-nw/2} 62q${nw/2} 6 ${nw} 0v-3q-${nw/2} 5-${nw} 0z" fill="#0004"/>`,trs=`M${4+sd} 100C${8+sd} 74 ${26+sd} 68 50 68C${74-sd} 68 ${92-sd} 74 ${96-sd} 100z`,tp=c=>`<path d="${trs}" fill="${c}"/>`;
const BODY=[
nkx+tp(cc)+`<path d="M38 70l12 20 12-20z" fill="#f2f2f2"/>${tie}<path d="M30 72l12 24-16 6zM70 72l-12 24 16 6z" fill="#0004"/>`,
nkx+tp(cc)+`<path d="M38 70l12 20 12-20z" fill="#f2f2f2"/>${tie}<path d="M30 72l12 24-16 6zM70 72l-12 24 16 6z" fill="#0004"/><path d="M38 70l8 14-4 12M62 70l-8 14 4 12" stroke="#fff4" stroke-width=1.200 fill=none /><path d="M61 83h7v5h-7z" fill="#e9e1cf"/><path d="M62 83l2.500-2 2.500 2z" fill="#c9a23a"/>`,
nkx+tp(cc)+`<path d="M38 69l12 8-4 7zM62 69l-12 8 4 7z" fill="#f4f4f6" stroke="#8a929c" stroke-width=.8 />${tie}<path d="M50 80v20" stroke="#0004" stroke-width=.9 /><g fill="#f4f4f6"><circle cx=50 cy=86 r=1.100 /><circle cx=50 cy=92 r=1.100 /><circle cx=50 cy=98 r=1.100 /></g><path d="M30 74l-5 26M70 74l5 26" stroke="#0003" stroke-width=1.500 fill=none />`,
nkx+tp(shd(cc,.5))+`<path d="M42 69l8 15 8-15z" fill="#d9dbe0"/><path d="M36 69l10 4-5 11-10-6zM64 69l-10 4 5 11 10-6z" fill="${shd(cc,.3)}" stroke="#0007" stroke-width=.8 /><path d="M50 84v18" stroke="#b9bec8" stroke-width=1.300 /><path d="M18 92q4-14 14-19" stroke="#fff3" stroke-width=2.200 fill=none stroke-linecap=round />${T===4?tie:''}`,
nkx+tp(cc)+`<path d="M33 69q17 12 34 0v6q-17 12-34 0z" fill="${shd(cc,.25)}"/><path d="M43 79v11M57 79v11" stroke="#ecebf0" stroke-width=1.500 stroke-linecap=round /><path d="M34 95q16 6 32 0" stroke="#0004" stroke-width=1.200 fill=none />${T===4?tie:''}`,
nkx+tp(cc)+`<path d="M40 68q10 12 20 0z" fill="${sk}"/><path d="M40 68q10 12 20 0" stroke="${shd(cc,.35)}" stroke-width=1.800 fill=none />${T===4?tie:''}`,
nkx+tp('#eeeff2')+`<path d="M38 69l12 8-4 7zM62 69l-12 8 4 7z" fill="#fff" stroke="#9aa" stroke-width=.8 />${tie}<path d="M38 70l8 12-6 20H22c1-14 8-26 16-32zM62 70l-8 12 6 20h18c-1-14-8-26-16-32z" fill="${cc}"/><circle cx=44 cy=90 r=1.100 fill="#0006"/><circle cx=43 cy=96 r=1.100 fill="#0006"/>`];
const bodyX=BODY[ou]||BODY[0];
return `<defs><radialGradient id=pfdet cx=.38 cy=.32 r=.8><stop offset=0 stop-color="#fff" stop-opacity=.28 /><stop offset=.5 stop-color="#fff" stop-opacity=0 /><stop offset=1 stop-color="#000" stop-opacity=.22 /></radialGradient><radialGradient id=pbdet cx=.5 cy=.35 r=.85><stop offset=0 stop-color="#2c4260" /><stop offset=1 stop-color="#0b121c" /></radialGradient></defs>${NOBG?'':'<rect width=100 height=100 fill="url(#pbdet)"/>'}<g transform="${HDT}">${back}</g><g transform="translate(0 6)">${bodyX}</g><g transform="${HDT}"><ellipse cx=${50-fx+.6} cy=52 rx=3.2 ry=4.4 fill="${sk}"/><ellipse cx=${50+fx-.6} cy=52 rx=3.2 ry=4.4 fill="${sk}"/><ellipse cx=50 cy=50 rx=${fx} ry=${fy} fill="${sk}"/><ellipse cx=50 cy=50 rx=${fx} ry=${fy} fill="url(#pfdet)"/><ellipse cx=38 cy=58 rx=4 ry=2.6 fill="#d9544a" opacity=.14 /><ellipse cx=62 cy=58 rx=4 ry=2.6 fill="#d9544a" opacity=.14 /><g transform="translate(0 2.2)">${NZ(NKS[P.no||0],"#6a4a3a")}</g>${bd}${front}${hat}${eyeR(43,50,ic,ek==='round'?2.8:2.6,w?.5:0,ek,-1,sk)}${eyeR(57,50,ic,ek==='round'?2.8:2.6,w?.5:0,ek,1,sk)}${gl}${w?`<path d="M37 44l9 3M63 44l-9 3" stroke="${hc}" stroke-width=2.6 stroke-linecap=round />`:`<path d="M37 45${['q4.5-2.4 9 -.4','l9 -.2','q4-3.4 9 -1.4','q4.5-2.4 9 -.4'][bi]}M63 45${['q-4.5-2.4 -9 -.4','l-9 -.2','q-4-3.4 -9 -1.4','q-4.5-2.4 -9 -.4'][bi]}" stroke="${hc}" stroke-width=${bi===3?3.8:2.4} fill=none stroke-linecap=round />`}<path d="M43.6 62q3.2-1.6 6.4-.6q3.2-1 6.4.6q-3.2 ${mth} -6.4 ${mth}t-6.4-${mth}z" fill="#8a4a44" transform="translate(0 ${w?1:0})" /><path d="M43.8 62.2q6.2 ${w?-1:1} 12.4 0" stroke="#0007" stroke-width=.8 fill=none /></g><g transform="translate(0 6)"><path d="M28 84l5-3 5 3v6l-5 4-5-4z" fill="#d7b25a" stroke="#8a6a1a" stroke-width=.8 /><circle cx=33 cy=87 r=1.6 fill="#8a6a1a" /><circle cx=80 cy=80 r=8 fill="#8fd6ff33" stroke="#d8b24a" stroke-width=3 /><path d="M86 86l8 8" stroke="#d8b24a" stroke-width=3.5 stroke-linecap=round /></g>`}
