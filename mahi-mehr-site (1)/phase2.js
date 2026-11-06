(()=>{
const $=(t,c,p)=>{const n=document.createElement(t);if(c)n.className=c;if(p!=null)n.innerHTML=p;return n};
const lang=()=>{try{return localStorage.getItem('lang')||'fa'}catch(e){return'fa'}};
const sm=x=>{x=Math.max(0,Math.min(1,x));return x*x*(3-2*x)};
const S={fa:{en:'ورود',sub:'ماهیان زینتی آب شیرین',ab:'درباره',ca:'نگهداری',tp:'دما',tk:'حداقل آکواریوم',bh:'رفتار',or:'سفارش در واتساپ',ph:'عکس',hint:'بکشید تا بچرخد · اسکرول یا دو انگشت برای زوم',u:'°C',l:'لیتر'},
en:{en:'Enter',sub:'Freshwater ornamental fish',ab:'About',ca:'Care',tp:'Temperature',tk:'Minimum tank',bh:'Temperament',or:'Order on WhatsApp',ph:'Photo',hint:'Drag to rotate · scroll or pinch to zoom',u:'°C',l:'L'}};
Object.assign(S.fa,{sz:'اندازه',cm:'سانت'});Object.assign(S.en,{sz:'Size',cm:'cm'});
S.ar={en:'دخول',sub:'أسماك الزينة العذبة',tp:'الحرارة',tk:'أصغر حوض',bh:'الطباع',or:'اطلب عبر واتساب',ph:'صورة',hint:'اسحب للتدوير · مرّر أو اقرص للتكبير',u:'°م',l:'لتر',sz:'الحجم',cm:'سم'};
S.tr={en:'Giriş',sub:'Tatlı su süs balıkları',tp:'Sıcaklık',tk:'En küçük akvaryum',bh:'Huy',or:'WhatsApp’ta sipariş ver',ph:'Fotoğraf',hint:'Döndürmek için sürükle · yakınlaştırmak için kaydır veya sıkıştır',u:'°C',l:'L',sz:'Boy',cm:'cm'};
const CA=[['سمكة كبيرة وذكية وجريئة تتعرف على صاحبها.','تُربّى وحدها أو مع أسماك بحجمها'],['زعانف طويلة وسباحة هادئة رشيقة.','هادئة إلى شبه إقليمية'],['سيكليد ملوّن بسلوك جذاب وإقليمي.','إقليمي'],['صغيرة نشيطة بذيول لافتة؛ مثالية لبداية الحوض.','مسالمة وتُربّى في مجموعات'],['ولودة قوية ومتعددة الألوان.','مسالمة'],['سمكة أسراب لامعة تتألق ضمن مجموعة.','نشيطة وتعيش في أسراب'],['سمكة متاهة بزعانف طويلة وألوان لافتة.','الذكور تتقاتل؛ يُفضّل ذكر واحد'],['سمكة ماء بارد نشيطة بألوان براقة.','مسالمة وشرهة'],['منظّف قاع هادئ يُبقي الحوض نظيفًا.','هادئة وليلية جزئيًا'],['نوع مميز من مجموعتنا؛ اسأل عن التفاصيل.','يختلف حسب النوع']];
const CT=[['İri, zeki ve cesur; bakıcısını tanır.','Tek başına veya benzer boyda balıklarla'],['Uzun yüzgeçli, sakin ve zarif yüzüş.','Sakin, yarı bölgesel'],['Renkli, bölgesini savunan çarpıcı çiklit.','Bölgesel'],['Küçük, hareketli, gösterişli kuyruklu; ilk akvaryum için ideal.','Barışçıl, grup halinde'],['Dayanıklı ve renkli canlı doğuran.','Barışçıl'],['Sürü halinde en iyi görünen parlak balık.','Aktif sürü balığı'],['Uzun yüzgeçli, çarpıcı renkli labirent balığı.','Erkekler kavga eder; tek erkek tutun'],['Soğuk su seven, enerjik ve parlak renkli.','Barışçıl, çok yer'],['Dip temizleyen sakin akvaryum sakini.','Sakin, kısmen gece'],['Koleksiyonumuzdan özel bir tür; ayrıntıları sorun.','Türe göre değişir']];
// per category: temp, tank(L), fa about, en about, fa temperament, en temperament
const C=[['24–28',300,'ماهی درشت، باهوش و پرانرژی که صاحبش را می‌شناسد.','Large, intelligent and bold; it learns to recognise its keeper.','هم‌اندازه‌ها یا تنها','Keep alone or with similar-sized fish'],
['24–28',150,'باله‌های بلند و حرکت آرام؛ نماد آکواریوم‌های آراسته.','Tall flowing fins and a slow, graceful swim.','آرام تا نیمه‌سرزمینی','Calm to semi-territorial'],
['25–29',200,'سیچلاید رنگین با رفتار جذاب و دفاع از قلمرو.','Colourful cichlid with engaging, territorial behaviour.','سرزمینی','Territorial'],
['22–27',40,'کوچک، پرتحرک و با دم‌های پرزرق‌وبرق؛ مناسب شروع آکواریوم.','Small, lively and flamboyant-tailed; ideal for a first tank.','صلح‌جو و گله‌ای','Peaceful, keep in groups'],
['22–27',60,'زنده‌زا، سخت‌جان و رنگارنگ.','Hardy, colourful live-bearer.','صلح‌جو','Peaceful'],
['23–27',60,'ماهی گله‌ای براق که در گروه بهترین جلوه را دارد.','Shimmering schooling fish, best seen in a group.','گله‌ای و فعال','Active schooler'],
['24–28',40,'ماهی لابیرنت با باله‌های بلند و رنگ‌های شاخص.','Labyrinth fish with long fins and striking colour.','نرها با هم دعوا می‌کنند','Males fight; keep one male'],
['18–24',120,'ماهی سرد‌آب و پرانرژی با رنگ‌های درخشان.','Cool-water, energetic fish with brilliant colour.','صلح‌جو، پرخور','Peaceful, big eater'],
['22–27',80,'پاک‌کنندهٔ کف و ساکن آرام آکواریوم.','Gentle bottom dweller that tidies the tank.','آرام و شبانه','Calm, partly nocturnal'],
['22–28',80,'گونه‌ای ویژه از مجموعهٔ ما؛ جزئیات را بپرسید.','A special species from our range; ask for details.','متفاوت','Varies by species']];
// length, height, width, tail, dorsal
const A=[[1.2,.55,.3,.6,.3],[.7,.85,.16,.8,.9],[1,.5,.3,.5,.3],[.9,.28,.2,.9,.3],[.9,.4,.24,.5,.3],[.95,.38,.22,.5,.25],[.85,.42,.2,.9,.5],[.8,.6,.45,.8,.4],[1.1,.3,.35,.4,.3],[.9,.45,.3,.5,.3]];
const BASE=['#3a2a1a','#cfd8dc','#c47a2c','#d28a2e','#d9742a','#aab4bb','#3a78c8','#e0701e','#8a7355','#9aa5ab'];
const PAL=[[/قرمز|رد|سان رایز|آتشی/,'#c8321e'],[/بلو|آبی/,'#2d6cc0'],[/مشکی|بلک|تکسیدو/,'#1c1c20'],[/زرد|گلدن|کرم|کله شیری|مسی/,'#e0a53a'],[/البینو|وایت|سفید/,'#efe9dc'],[/سبز/,'#3f9a54']];
const pal=(n,g)=>{for(const[r,c]of PAL)if(r.test(n))return c;return BASE[g]};
function skin(c,g){const k=$('canvas');k.width=1024;k.height=512;const x=k.getContext('2d'),gr=x.createLinearGradient(0,0,0,512);
 gr.addColorStop(0,'#efe5d0');gr.addColorStop(.5,c);gr.addColorStop(1,'#efe5d0');x.fillStyle=gr;x.fillRect(0,0,1024,512);
 if(g==1){x.fillStyle='rgba(15,15,18,.82)';[290,480,680].forEach(u=>x.fillRect(u,0,36,512))}
 else if(g==5){[118,374].forEach(y=>{x.fillStyle='#3ec8ff';x.fillRect(150,y,800,24);x.fillStyle='#ff4a3a';x.fillRect(560,y+24,430,20)})}
 else for(let i=0;i<180;i++){x.fillStyle='rgba('+(g==0?'232,84,28':'255,255,255')+','+Math.random()*.3+')';x.beginPath();x.arc(Math.random()*1024,Math.random()*512,5+Math.random()*22,0,7);x.fill()}
 const t=new THREE.CanvasTexture(k);t.anisotropy=8;return t}
function fish(name,g){
 const P=A[g],col=pal(name,g),o=new THREE.Group(),gm=new THREE.SphereGeometry(1,96,64),p=gm.attributes.position,uv=gm.attributes.uv;
 for(let i=0;i<p.count;i++){const x=p.getX(i),y=p.getY(i),z=p.getZ(i),t=(x+1)/2,pr=(.28+.72*sm(t/.5))*(1-.4*Math.pow(Math.max(0,t-.75)/.25,2));
  uv.setXY(i,t,(Math.atan2(z,y)+Math.PI)/(2*Math.PI));p.setXYZ(i,x*P[0],y*P[1]*pr,z*P[2]*pr)}
 gm.computeVertexNormals();
 o.add(new THREE.Mesh(gm,new THREE.MeshPhysicalMaterial({map:skin(col,g),roughness:.38,clearcoat:.7,clearcoatRoughness:.25})));
 const fm=new THREE.MeshStandardMaterial({color:col,transparent:true,opacity:.72,side:THREE.DoubleSide,depthWrite:false,roughness:.6}),L=P[0],s=P[3];
 const tl=new THREE.Shape();tl.moveTo(0,0);tl.quadraticCurveTo(-.4*s,.5*s,-.9*s,.7*s);tl.quadraticCurveTo(-.6*s,0,-.9*s,-.7*s);tl.quadraticCurveTo(-.4*s,-.5*s,0,0);
 const tail=new THREE.Group();tail.position.x=-L*.9;tail.add(new THREE.Mesh(new THREE.ShapeGeometry(tl,24),fm));o.add(tail);
 const fin=(sy,h)=>{const f=new THREE.Shape();f.moveTo(.35*L,0);f.quadraticCurveTo(0,h*1.6,-.45*L,h*.3);f.lineTo(-.4*L,0);const m=new THREE.Mesh(new THREE.ShapeGeometry(f,24),fm);m.position.y=sy*P[1]*.82;m.scale.y=sy;return m};
 o.add(fin(1,P[4]),fin(-1,P[4]*.6));
 [1,-1].forEach(z=>{const e=new THREE.Mesh(new THREE.SphereGeometry(.075,24,16),new THREE.MeshStandardMaterial({color:'#f4efe4'})),q=new THREE.Mesh(new THREE.SphereGeometry(.045,16,12),new THREE.MeshStandardMaterial({color:'#050505'}));
  e.position.set(.68*L,.12*P[1],z*P[2]*.62);q.position.set(.05,0,z*.03);e.add(q);o.add(e)});
 o.scale.setScalar(1.7/L);o.userData.tick=t=>{tail.rotation.y=Math.sin(t*5)*.35};return o}
function logo(){
 const s=new THREE.Shape();s.moveTo(1.3,0);s.quadraticCurveTo(.9,.75,-.2,.7);s.quadraticCurveTo(-.7,.6,-.95,.15);s.lineTo(-1.5,.7);s.lineTo(-1.35,0);s.lineTo(-1.5,-.7);s.lineTo(-.95,-.15);s.quadraticCurveTo(-.7,-.6,-.2,-.7);s.quadraticCurveTo(.9,-.75,1.3,0);
 [-.55,-.15,.25].forEach(x=>{const h=new THREE.Path();h.moveTo(x,-.5);h.lineTo(x+.11,-.5);h.lineTo(x+.3,.5);h.lineTo(x+.19,.5);s.holes.push(h)});
 const e=new THREE.Path();e.absarc(.88,.12,.07,0,Math.PI*2,true);s.holes.push(e);
 const g=new THREE.ExtrudeGeometry(s,{depth:.32,bevelEnabled:true,bevelThickness:.06,bevelSize:.05,bevelSegments:8,curveSegments:40});g.center();
 const o=new THREE.Group();o.add(new THREE.Mesh(g,new THREE.MeshPhysicalMaterial({color:0xd4af6a,metalness:.8,roughness:.26,clearcoat:1,clearcoatRoughness:.12,emissive:0x2a1c06})));
 o.userData.tick=t=>{o.position.y=Math.sin(t*1.2)*.06};return o}
const GL=(()=>{try{const c=document.createElement('canvas');return!!(c.getContext('webgl2')||c.getContext('webgl'))}catch(e){return false}})();
const stage=(...a)=>{try{return stage0(...a)}catch(e){a[0].style.display='none';return()=>{}}};
function stage0(cv,obj,o){
 const R=new THREE.WebGLRenderer({canvas:cv,antialias:true,alpha:true});R.setPixelRatio(Math.min(devicePixelRatio||1,2.5));
 const Sc=new THREE.Scene(),C=new THREE.PerspectiveCamera(35,1,.1,50);C.position.z=o.z;
 Sc.add(new THREE.HemisphereLight(0xfff1d0,0x201810,1.2));const k=new THREE.DirectionalLight(0xffffff,1.5);k.position.set(3,4,5);Sc.add(k);
 const r=new THREE.DirectionalLight(0xc9a45c,1.4);r.position.set(-4,1,-3);Sc.add(r);Sc.add(obj);
 let rx=.15,ry=o.ry||0,z=o.z,raf,drag=0;const pt=new Map(),t0=performance.now();let pd=0;
 const rs=()=>{const w=cv.clientWidth,h=cv.clientHeight;R.setSize(w,h,false);C.aspect=w/h;C.updateProjectionMatrix()};rs();addEventListener('resize',rs);
 const cl=v=>Math.max(o.z*.35,Math.min(o.z*1.5,v));
 cv.onpointerdown=e=>{cv.setPointerCapture(e.pointerId);pt.set(e.pointerId,[e.clientX,e.clientY]);drag=1};
 cv.onpointerup=cv.onpointercancel=e=>{pt.delete(e.pointerId);if(!pt.size)drag=0;pd=0};
 cv.onpointermove=e=>{const a=pt.get(e.pointerId);if(!a)return;
  if(pt.size==1){ry+=(e.clientX-a[0])*.01;rx=Math.max(-1,Math.min(1,rx+(e.clientY-a[1])*.008))}
  pt.set(e.pointerId,[e.clientX,e.clientY]);
  if(pt.size==2){const[b,c]=[...pt.values()],d=Math.hypot(b[0]-c[0],b[1]-c[1]);if(pd)z=cl(z*pd/d);pd=d}};
 cv.onwheel=e=>{e.preventDefault();z=cl(z*(1+e.deltaY*.001))};
 const loop=()=>{raf=requestAnimationFrame(loop);const t=(performance.now()-t0)/1e3;if(!drag)ry+=o.spin;obj.rotation.set(rx,ry,0);obj.userData.tick&&obj.userData.tick(t);C.position.z+=(z-C.position.z)*.12;R.render(Sc,C)};loop();
 return()=>{cancelAnimationFrame(raf);removeEventListener('resize',rs);R.dispose()}}
// entry scene
const gate=()=>{if(!window.THREE||!GL||matchMedia('(prefers-reduced-motion:reduce)').matches)return;const l=lang(),g=$('div');g.id='p2g';const cv=$('canvas');
 g.append(cv);const b=$('div',0,'<h2>MAHI MEHR KASHAN</h2><small>'+(S[l]||S.en).sub+'</small><a class="b" href="#">'+((S[l]||{}).en||AR[l]||'Enter')+'</a>');g.append(b);document.body.append(g);
 const off=stage(cv,logo(),{z:5.2,spin:.006,ry:.5});
 b.querySelector('a').onclick=e=>{e.preventDefault();g.classList.add('out');setTimeout(()=>{off();g.remove()},1300)}};
// detail modal
const open=(name,price,url,g,idx)=>{const l=lang(),s=S[l]||S.en,c=C[g],f=l=='fa'?0:1,ab=l=='ar'?CA[g][0]:l=='tr'?CT[g][0]:c[2+f],bh=l=='ar'?CA[g][1]:l=='tr'?CT[g][1]:c[4+f],m=$('div','p2'),zm=name.match(/([۰-۹]+(?:[–-][۰-۹]+)?)\s*سانت/),sr=zm?'<dt>'+s.sz+'</dt><dd>'+(l=='fa'||l=='ar'&&0?zm[1]:zm[1].replace(/[۰-۹]/g,d=>'۰۱۲۳۴۵۶۷۸۹'.indexOf(d)))+' '+s.cm+'</dd>':'';
 m.innerHTML='<div class="p2x"><button class="p2c">✕</button><div class="p2v"><div class="p2t"><button class="on" data-m="3">3D</button><button data-m="p" hidden>'+s.ph+'</button></div><canvas></canvas><small>'+s.hint+'</small></div>'+
 '<div class="p2i"><span class="k">'+(typeof T!='undefined'&&T[l]&&T[l].cats?T[l].cats[g]:'')+'</span><h2>'+name+'</h2>'+(price?'<b class="fp">'+price+'</b>':'')+
 '<p>'+ab+'</p><dl>'+sr+'<dt>'+s.tp+'</dt><dd>'+c[0]+' '+s.u+'</dd><dt>'+s.tk+'</dt><dd>'+c[1]+' '+s.l+'</dd><dt>'+s.bh+'</dt><dd>'+bh+'</dd></dl><a class="b" target="_blank" rel="noopener" href="'+url+'">'+s.or+'</a></div></div>';
 document.body.append(m);const v=m.querySelector('.p2v'),cv=v.querySelector('canvas');
 let off=stage(cv,fish(name,g),{z:4.6,spin:.008,ry:.6});
 const im=new Image();im.onload=()=>{const pb=m.querySelector('[data-m=p]');pb.hidden=false};im.src='photos/'+String(idx+1).padStart(3,'0')+'.png';
 m.querySelectorAll('[data-m]').forEach(b=>b.onclick=()=>{m.querySelectorAll('[data-m]').forEach(x=>x.classList.toggle('on',x==b));const ph=b.dataset.m=='p';cv.style.display=ph?'none':'';v.querySelector('img')?.remove();if(ph){im.style.cssText='';v.append(im)}});
 const x=()=>{off();m.remove();removeEventListener('keydown',kd)},kd=e=>e.key=='Escape'&&x();addEventListener('keydown',kd);m.querySelector('.p2c').onclick=x;m.onclick=e=>e.target==m&&x()};
document.addEventListener('click',e=>{if(!window.THREE||typeof D=='undefined')return;
 const a=e.target.closest('.pi');if(a){e.preventDefault();const n=a.querySelector('span').textContent,g=Math.max(0,D.findIndex(q=>q.some(r=>r[0]==n))),i=D.flat().findIndex(r=>r[0]==n);open(n,a.querySelector('b').textContent,a.href,g,i);return}
 const c=e.target.closest('.cd');if(c&&!e.target.closest('a')){const i=[...document.querySelectorAll('.cd')].indexOf(c);open(c.querySelector('h3').textContent,'',c.querySelector('a').href,[1,0,2][i]||9,-1)}},true);
gate();
})();
