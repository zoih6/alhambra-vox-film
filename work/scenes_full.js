// ================= FULL FILM: element loader + scenes S5-S13 =================
const EI={}; const __load=[];
const ELN={sheet01:6,sheet02:6,sheet03:6,sheet04:10,sheet05:5,sheet06:7,sheet07:7,sheet08:6,sheet09:12,sheet10:7};
for(const [sh,n] of Object.entries(ELN)) for(let i=1;i<=n;i++){const id=`${sh}_e${String(i).padStart(2,'0')}`;const im=new Image();im.src=`assets/el/${id}.webp`;EI[id]=im;__load.push(im.decode().catch(()=>{}));}
window.__elsReady=Promise.all(__load);
const E=id=>EI[id];
function show(id,cx,cy,w,tIn,tOut,o={}){const sIn=spring(ET-tIn,...(o.preset||DEFAULT));if(sIn<=.02)return;if(tOut&&T>tOut+.45)return;
 const outP=tOut?clamp((tOut+.4-T)/.4):1;const f=o.from||'top';
 const ox=f==='left'?-460*(1-sIn):f==='right'?460*(1-sIn):(o.dx||0), oy=f==='top'?-430*(1-sIn):f==='bottom'?430*(1-sIn):(o.dy||0);
 let fl=0; if(o.float) fl=Math.sin(T*1.4+(o.phase||0))*7;
 layer(E(id),cx,cy,w,{depth:o.depth??1.12,scale:Math.max(.01,sIn)*(tOut?.82+.18*outP:1),dx:ox,dy:oy+fl,rot:(o.rot||0)+(1-sIn)*(o.spin||0),alpha:clamp(sIn*1.55)*outP,flip:o.flip});}
function popText(str,cx,cy,size,tIn,o={}){const s=spring(ET-tIn,...(o.preset||HEAVY));if(s<=.02)return;ctx.save();ctx.translate(cx,cy);ctx.scale(Math.max(.01,s),Math.max(.01,s));ctx.globalAlpha=clamp(s*1.6);ctx.direction='rtl';ctx.textAlign=o.align||'center';ctx.font=`700 ${size}px ${o.font||'Amiri'}`;ctx.shadowColor='rgba(0,0,0,.6)';ctx.shadowBlur=14;ctx.shadowOffsetY=5;ctx.fillStyle=o.color||'#f4ecd9';ctx.fillText(str,0,0);ctx.restore();}
function dark(p){ctx.save();ctx.fillStyle=`rgba(5,5,10,${clamp(p)})`;ctx.fillRect(0,0,W,H);ctx.restore();}
function S5(t){const lt=t-32.6;CAM={x:640+track(lt,[[0,-50],[28,70]],55,16),y:360,z:1.05+track(lt,[[0,0],[28,.14]],48,15),focus:1.12,lx:760,ly:220};bg();plate($('mapP'),{depth:.78,w:1470});dark(.18);
 show('sheet01_e01',370,390,290,33.2,41.5,{from:'top',rot:.16,spin:.25});
 show('sheet01_e02',880,520,450,37.4,45.5,{from:'right'});
 show('sheet01_e03',650,420,560,42.4,54,{from:'left',preset:HEAVY});
 show('sheet01_e04',1000,290,290,46.2,54,{from:'top',preset:PLAYFUL});
 show('sheet01_e06',400,450,390,50.8,58.5,{from:'bottom'});
 layer($('palace'),710,350,640,{depth:1.14,scale:Math.max(.01,spring(ET-55.4,...DEFAULT)),alpha:clamp(spring(ET-55.4)*1.5)});
 popText('١٢٣٨',1050,300,110,34,{color:'#e0483a'});
 if(lt>5)label('المدن تتساقط',1150,170,29);
 if(lt>13.5)label('محمد بن يوسف بن نصر — ابن الأحمر',1150,640,27);
 popText('حلمٌ أخير',640,640,54,56.5,{color:'#e9bc62'});finish();}
function S6(t){const lt=t-61.5;CAM={x:640+track(lt,[[0,40],[28,-60]],55,16),y:362,z:1.04+track(lt,[[0,0],[28,.16]],48,15),focus:1.1,lx:820,ly:230};bg();plate($('mapP'),{depth:.78,w:1470});dark(.12);
 show('sheet02_e01',640,610,760,62.2,69.5,{from:'left',rot:.04});
 show('sheet02_e04',330,250,540,66,74,{from:'top'});
 show('sheet02_e02',770,360,660,70.4,79,{from:'right',preset:HEAVY});
 show('sheet02_e05',350,530,500,74.8,82.5,{from:'bottom'});
 show('sheet02_e06',1030,520,250,79.4,86.5,{from:'right',preset:PLAYFUL});
 layer($('palace'),760,320,580,{depth:1.14,scale:Math.max(.01,spring(ET-83.4,...DEFAULT)),alpha:clamp(spring(ET-83.4)*1.5)});
 popText('٦ كم',1085,470,86,71.2,{color:'#7fb2d9'});
 if(lt>1)label('نهر دارو',1150,165,28);
 if(lt>9.5)label('قناةٌ تجرّ الماء إلى القمة',1150,165,28);
 if(lt>22.5)label('سُمّيت الحمراء… للون طينها الأحمر',1150,652,27);
 popText('وطنٌ أخير',640,150,58,86.8,{color:'#e9bc62'});finish();}
function S7(t){const lt=t-90.3;CAM={x:640+track(lt,[[0,-40],[20,55]],55,16),y:360,z:1.06+track(lt,[[0,0],[20,.13]],48,15),focus:1.14,lx:760,ly:230};bg();plate($('stoneP'),{depth:.8,w:1500});dark(.28);
 show('sheet03_e02',640,430,680,91,100.5,{from:'bottom',preset:HEAVY});
 show('sheet03_e06',960,500,430,94.8,101,{from:'right'});
 show('sheet03_e04',300,290,250,98.4,104.5,{from:'top',spin:1.2,preset:PLAYFUL});
 show('sheet04_e10',640,440,800,101.8,109.5,{from:'bottom'});
 show('sheet04_e02',640,350,580,105.8,110.4,{from:'top'});
 show('sheet04_e08',640,610,460,108.2,110.4,{from:'bottom'});
 if(lt>1.2)label('يوسف الأول · محمد الخامس',1150,168,28);
 if(lt>12)label('بهو الريحان — بركةٌ تعكس السماء',1150,652,27);finish();}
function S8(t){const lt=t-110.5;CAM={x:640+track(lt,[[0,50],[15,-50]],55,16),y:360,z:1.05+track(lt,[[0,0],[15,.15]],48,15),focus:1.16,lx:820,ly:240};bg();plate($('stoneP'),{depth:.8,w:1500});dark(.34);
 show('sheet05_e01',640,320,580,111.3,119.5,{from:'top',preset:HEAVY});
 show('sheet05_e02',400,540,500,115.2,125.5,{from:'left'});
 show('sheet05_e02',885,540,500,117.2,125.5,{from:'right',flip:true});
 show('sheet05_e03',640,430,290,121.4,125.8,{from:'bottom'});
 popText('١٢ أسدًا',1080,610,64,116,{color:'#e9bc62'});
 popText('١٢٤ عمودًا',230,240,60,122.2,{color:'#e9bc62'});
 if(lt>1)label('بهو الأسود — قلب الحمراء النابض',1150,168,28);finish();}
function S9(t){const lt=t-126;CAM={x:640,y:360+track(lt,[[0,14],[21,-10]],48,15),z:1.07+track(lt,[[0,0],[21,.12]],48,15),focus:1.15,lx:640,ly:200};bg();plate($('mapP'),{depth:.78,w:1470});dark(.42);
 show('sheet05_e04',640,320,640,126.9,136,{from:'top',preset:HEAVY});
 show('sheet05_e05',350,545,440,132.2,140,{from:'left'});
 show('sheet10_e01',930,530,300,136.2,144,{from:'right',spin:.8});
 show('sheet10_e02',640,330,560,140.2,146.8,{from:'top'});
 ctx.save();ctx.globalAlpha=.13;ctx.direction='rtl';ctx.textAlign='center';ctx.font='700 44px Amiri';ctx.fillStyle='#e9bc62';for(let r=0;r<3;r++)for(let c=0;c<3;c++)ctx.fillText('ولا غالب إلا الله',220+c*420,600+r*52);ctx.restore();
 popText('ولا غالبَ إلا الله',640,470,88,141.5,{color:'#e9bc62',preset:HEAVY});
 if(lt>1.2)label('قبة المقرنصات — نجومٌ تجمّدت',1150,168,28);finish();}
function S10(t){const lt=t-147;CAM={x:640+track(lt,[[0,-30],[21,45]],55,16),y:360,z:1.05+track(lt,[[0,0],[21,.13]],48,15),focus:1.16,lx:1060,ly:430};bg();plate($('stoneP'),{depth:.8,w:1500});dark(.38);
 show('sheet06_e02',890,430,390,147.9,157,{from:'right'});
 show('sheet06_e01',410,440,500,152.2,161,{from:'left',rot:-.08,float:true});
 show('sheet06_e03',680,330,540,156.8,164.5,{from:'top'});
 show('sheet06_e05',1085,500,230,161.2,167.8,{from:'bottom',preset:PLAYFUL});
 show('sheet06_e06',480,270,150,164.2,167.8,{from:'bottom',float:true,phase:1});
 show('sheet06_e07',740,250,170,165.4,167.8,{from:'bottom',float:true,phase:2.4});
 popText('جادك الغيثُ إذا الغيثُ همى',640,620,57,162.8,{color:'#f4ecd9'});
 popText('يا زمانَ الوصلِ بالأندلسِ',640,685,57,165.8,{color:'#e9bc62'});
 if(lt>9.8)label('لسان الدين بن الخطيب',1150,168,28);finish();}
function S11(t){const lt=t-168;CAM={x:640+track(lt,[[0,30],[28,-40]],55,16),y:360,z:1.08+track(lt,[[0,0],[28,.1]],48,15),focus:1.12,lx:900,ly:220};bg();plate($('duskP'),{depth:.8,w:1560});dark(.15);
 show('sheet07_e01',640,350,740,168.9,177,{from:'top',spin:-.5,preset:HEAVY});
 show('sheet07_e02',890,285,430,173.2,180,{from:'right'});
 const kx=920-clamp((T-177.5)/8.5)*500; show('sheet07_e05',kx,545,470,177.5,187,{from:'right'});
 show('sheet07_e07',1060,235+clamp((T-183)/8)*170,330,183,191,{from:'top'});
 show('sheet07_e06',640,440,310,187.2,195.8,{from:'bottom'});
 popText('١٤٩٢',230,260,105,169.8,{color:'#e0483a'});
 if(lt>9.5)label('تسليم المفاتيح',1150,168,28);
 if(lt>15.5)label('زفرة العربي الأخيرة',1150,640,28);
 dark(clamp((lt-19)/8)*.38);finish();}
function S12(t){const lt=t-196.4;CAM={x:640+track(lt,[[0,-45],[24,55]],55,16),y:360,z:1.05+track(lt,[[0,0],[24,.14]],48,15),focus:1.13,lx:800,ly:230};bg();plate($('mapP'),{depth:.78,w:1470});dark(.25);
 show('sheet08_e01',400,410,540,197.3,205,{from:'left'});
 show('sheet08_e02',890,390,480,201.2,207.5,{from:'right'});
 show('sheet08_e03',390,440,300,205.4,212,{from:'bottom'});
 show('sheet08_e06',830,460,390,208.4,214.5,{from:'right'});
 show('sheet09_e01',340,490,260,213.2,219.8,{from:'left'});
 show('sheet09_e06',620,490,260,214.6,219.8,{from:'bottom'});
 show('sheet09_e02',890,490,240,215.8,219.8,{from:'right'});
 if(lt>4)label('قرونٌ من الإهمال',1150,168,28);
 if(lt>12.5)label('ثم اكتشفها الرحّالة… فأسرت العالم',1150,168,28);finish();}
function S13(t){const lt=t-220.6;CAM={x:640,y:358,z:1.16-track(lt,[[0,0],[24,.14]],48,15),focus:1.15,lx:700,ly:210};bg();plate($('duskP'),{depth:.8,w:1560});dark(.22);
 show('sheet09_e07',640,300,400,221.4,228,{from:'top',rot:-.06});
 show('sheet09_e11',430,520,430,225.2,232,{from:'left'});
 const ax=-100+clamp((T-229)/6)*1500; show('sheet09_e09',ax,175,310,229,236,{from:'left'});
 popText('مليونا زائرٍ كلَّ عام',640,620,58,227,{color:'#e9bc62'});
 layer($('palace'),640,420,880,{depth:1.12,scale:Math.max(.01,spring(ET-233.5,...DEFAULT)),alpha:clamp(spring(ET-233.5)*1.5)});
 show('sheet10_e07',1085,175,210,236.5,244.8,{from:'top',preset:PLAYFUL});
 show('sheet10_e01',235,195,230,238,244.8,{from:'left',spin:.6});
 popText('المكانُ رحل… لكنَّ لحنَهُ بقي',640,610,50,239.5,{});
 popText('ولا غالبَ إلا الله',640,360,98,242.2,{color:'#e9bc62',preset:HEAVY});
 dark(clamp((T-262.6)/2.2));finish();}
