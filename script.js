document.documentElement.dataset.theme='day';
const $=(s,r=document)=>r.querySelector(s),$$=(s,r=document)=>[...r.querySelectorAll(s)];
function setLang(l){document.body.classList.remove('FaresDev_lang-ar','FaresDev_lang-en');document.body.classList.add('FaresDev_lang-'+l);document.documentElement.lang=l;document.documentElement.dir=l==='ar'?'rtl':'ltr';
  $$('.FaresDev_lang button').forEach(b=>b.classList.toggle('FaresDev_active',b.dataset.lang===l));try{localStorage.setItem('fs-lang',l)}catch(e){}
  if(window.__refresh)window.__refresh();}
(function(){var s='ar';try{s=localStorage.getItem('fs-lang')||'ar'}catch(e){}setLang(s);})();

document.addEventListener('DOMContentLoaded',()=>{
  const lang=()=>document.body.classList.contains('FaresDev_lang-en')?'en':'ar',pad=n=>String(n).padStart(2,'0');
  
  $$('.FaresDev_chat').forEach(c=>{const ms=$$('.FaresDev_msg',c);
    ms.forEach(m=>{const b=$('.FaresDev_bub',m);if(b)b.insertAdjacentHTML('beforeend','<span class="FaresDev_dots"><i></i><i></i><i></i></span>');});
    const play=i=>{if(i>=ms.length)return;const m=ms[i];
      if(m.classList.contains('FaresDev_n')){setTimeout(()=>{m.classList.add('FaresDev_show');setTimeout(()=>play(i+1),700)},300);return;}
      m.classList.add('FaresDev_typing');
      setTimeout(()=>{m.classList.remove('FaresDev_typing');m.classList.add('FaresDev_show');setTimeout(()=>play(i+1),450)},Math.min(1700,550+m.textContent.length*20));};
    let go=false;new IntersectionObserver((es,ob)=>{if(es[0].isIntersecting&&!go){go=true;ob.disconnect();play(0)}},{threshold:.2}).observe(c);});

  
  const boot=$('#boot');let done=false;
  const finish=()=>{if(done)return;done=true;boot.classList.add('FaresDev_off');try{sessionStorage.setItem('fs-boot','1')}catch(e){}};
  let seen=false;try{seen=sessionStorage.getItem('fs-boot')==='1'}catch(e){}
  if(seen){boot.style.display='none';done=true;}
  else{const L=['> BRILLIANCE ACADEMY','> LINK ESTABLISHED // PHAROS UNIVERSITY','> LOADING FIELDS ... OK','> SYNC WATCH CLOCK ... OK','> ALL UNITS READY'];let p=0,k=0;const lg=$('#bootlog');
    const iv=setInterval(()=>{p=Math.min(100,p+Math.floor(Math.random()*9)+4);$('#bootbar').style.width=p+'%';$('#bootpct').textContent=p+'%';
      const n=Math.floor(p/21);while(k<=n&&k<L.length){lg.textContent+=L[k++]+'\n';}
      if(p>=100){clearInterval(iv);setTimeout(finish,500);}},90);
    ['keydown','click','touchstart'].forEach(e=>addEventListener(e,()=>{clearInterval(iv);finish();},{once:true}));}

  
  let lenis=null;if(typeof Lenis!=='undefined'){lenis=new Lenis({lerp:.08});const raf=t=>{lenis.raf(t);requestAnimationFrame(raf)};requestAnimationFrame(raf);}
  const goTo=el=>{const y=el.getBoundingClientRect().top+scrollY-(el.classList.contains('FaresDev_hero')?0:94);lenis?lenis.scrollTo(y):scrollTo({top:y,behavior:'smooth'});};

  
  const secs=$$('[data-label]'),N=secs.length,roman=['I','II','III'];
  const tk=$('#tk');secs.forEach((s,i)=>{const d=document.createElement('s');d.style.left=(N>1?i/(N-1)*100:0)+'%';d.onclick=()=>goTo(s);tk.appendChild(d);});
  const ticks=$$('s',tk);
  const clock=p=>{const m=Math.round(360+p*960);return pad(Math.floor(m/60)%24)+':'+pad(m%60)};
  let act=0;
  function tick(){
    const max=Math.max(1,document.documentElement.scrollHeight-innerHeight),p=Math.min(1,Math.max(0,scrollY/max));
    $('#wClock').textContent=clock(p);$('#wRoman').textContent='WATCH '+roman[Math.min(2,Math.floor(p*3))];$('#tkf').style.width=(p*100)+'%';
    act=0;secs.forEach((s,i)=>{if(s.getBoundingClientRect().top<=innerHeight*.45)act=i;});
    ticks.forEach((t,i)=>t.classList.toggle('FaresDev_on',i<=act));
    $('#wSec').textContent=pad(act+1)+'/'+pad(N)+' · '+(lang()==='ar'?secs[act].dataset.ar:secs[act].dataset.label);
    const st=$('.FaresDev_stage');if(st&&scrollY<innerHeight*1.2)st.style.transform='translateY('+scrollY*.15+'px)';
  }
  addEventListener('scroll',tick,{passive:true});addEventListener('resize',tick);

  
  const tc=$('#tcode');setInterval(()=>{if(tc){const d=new Date();tc.textContent=pad(d.getHours())+':'+pad(d.getMinutes())+':'+pad(d.getSeconds());}},1000);

  
  const io=new IntersectionObserver(es=>es.forEach(e=>{if(!e.isIntersecting)return;e.target.classList.add('FaresDev_in');io.unobserve(e.target);
    const c=$('[data-count]',e.target)||(e.target.dataset.count?e.target:null);if(c){const to=+c.dataset.count;let v=0;const t=setInterval(()=>{v++;c.textContent=v;if(v>=to)clearInterval(t)},80);}}),{threshold:.12});
  $$('.FaresDev_rv').forEach((r,i)=>{r.style.transitionDelay=(i%4)*.05+'s';io.observe(r)});

  
  const ix=$('#ix'),q=$('#ixq'),list=$('#ixlist');
  function build(){const f=q.value.trim().toLowerCase();list.innerHTML='';
    secs.forEach((s,i)=>{const en=s.dataset.label,ar=s.dataset.ar;if(f&&!(en.toLowerCase().includes(f)||ar.includes(f)))return;
      const a=document.createElement('a');a.innerHTML='<em>'+pad(i+1)+'</em>'+(lang()==='ar'?ar:en)+'<small>'+en+'</small>';a.onclick=()=>{closeIx();setTimeout(()=>goTo(s),150)};list.appendChild(a);});}
  const openIx=()=>{ix.classList.add('FaresDev_open');q.value='';build();setTimeout(()=>q.focus(),50);lenis&&lenis.stop();},closeIx=()=>{ix.classList.remove('FaresDev_open');lenis&&lenis.start();};
  $$('[data-ix]').forEach(b=>b.onclick=openIx);$('#ixx').onclick=closeIx;ix.addEventListener('click',e=>{if(e.target===ix)closeIx()});q.addEventListener('input',build);
  addEventListener('keydown',e=>{if((e.ctrlKey||e.metaKey)&&e.key.toLowerCase()==='k'){e.preventDefault();ix.classList.contains('FaresDev_open')?closeIx():openIx();}
    else if(e.key==='Escape'){closeIx();$('#viewer')&&$('#viewer').classList.remove('FaresDev_max');}});
  window.__refresh=()=>{build();tick();show(cur,true)};

  
  const V=$('#viewer');let cur=0,show=()=>{};
  if(V){const th=$$('.FaresDev_th',V),img=$('#vimg'),cap=$('#vcap'),code=$('#vcode'),cnt=$('#vcnt');
    show=(i,quiet)=>{cur=(i+th.length)%th.length;const t=th[cur];
      const set=()=>{img.src=t.dataset.full;cap.textContent=t.dataset[lang()];code.textContent=t.dataset.code;cnt.textContent=pad(cur+1)+' / '+pad(th.length);img.classList.remove('FaresDev_sw')};
      th.forEach((x,k)=>x.classList.toggle('FaresDev_on',k===cur));if(quiet){set();return;}img.classList.add('FaresDev_sw');setTimeout(set,200);};
    th.forEach((t,i)=>t.onclick=()=>show(i));$('.FaresDev_vp',V).onclick=e=>{e.stopPropagation();show(cur-1)};$('.FaresDev_vn',V).onclick=e=>{e.stopPropagation();show(cur+1)};
    $('.FaresDev_vfs',V).onclick=e=>{e.stopPropagation();V.classList.toggle('FaresDev_max')};$('.FaresDev_vmain',V).onclick=()=>V.classList.toggle('FaresDev_max');
    addEventListener('keydown',e=>{if(!V.classList.contains('FaresDev_max'))return;if(e.key==='ArrowLeft')show(cur-1);if(e.key==='ArrowRight')show(cur+1)});
    let sx=0;V.addEventListener('touchstart',e=>sx=e.touches[0].clientX,{passive:true});V.addEventListener('touchend',e=>{const d=e.changedTouches[0].clientX-sx;if(Math.abs(d)>50)show(cur+(d<0?1:-1))});
    show(0,true);}

  
  const rt=$('#rt');
  if(rt){
    const TITLES={'index.html':['الرئيسية','Home'],'judiciary.html':['القضاء','Judiciary'],'art.html':['التربية الفنية','Art Education']};
    const rtTitle=p=>{const f=(p.split('/').pop()||'index.html').toLowerCase();return TITLES[f]||['بريليانس أكاديمي','Brilliance Academy'];};
    const setRt=t=>{const ar=document.querySelector('[data-rt-ar]'),en=document.querySelector('[data-rt-en]');if(ar)ar.textContent=t[0];if(en)en.textContent=t[1];};
    let actx=null;
    const whoosh=up=>{try{
      const AC=window.AudioContext||window.webkitAudioContext;if(!AC)return;
      actx=actx||new AC();if(actx.state==='suspended')actx.resume();
      const dur=1.15,t=actx.currentTime,buf=actx.createBuffer(1,actx.sampleRate*dur,actx.sampleRate),d=buf.getChannelData(0);
      for(let i=0;i<d.length;i++)d[i]=Math.random()*2-1;
      const src=actx.createBufferSource();src.buffer=buf;
      const bp=actx.createBiquadFilter();bp.type='bandpass';bp.Q.value=1.1;
      bp.frequency.setValueAtTime(up?320:2600,t);bp.frequency.exponentialRampToValueAtTime(up?2600:320,t+dur);
      const g=actx.createGain();g.gain.setValueAtTime(.0001,t);
      g.gain.exponentialRampToValueAtTime(up?.16:.13,t+dur*.4);g.gain.exponentialRampToValueAtTime(.0001,t+dur);
      src.connect(bp);bp.connect(g);g.connect(actx.destination);src.start(t);src.stop(t+dur);
    }catch(e){}};
    const pctEl=document.getElementById('rtpct'),barEl=document.getElementById('rtbar');
    const loadAnim=(ms,done)=>{let p=0;const iv=setInterval(()=>{p=Math.min(100,p+Math.floor(Math.random()*12)+9);if(pctEl)pctEl.textContent=p+'%';if(barEl)barEl.style.width=p+'%';if(p>=100){clearInterval(iv);done&&done();}},ms/11);};
    if(sessionStorage.getItem('wipe-nav')){sessionStorage.removeItem('wipe-nav');setRt(rtTitle(location.pathname));
      loadAnim(800);
      requestAnimationFrame(()=>{requestAnimationFrame(()=>{
        setTimeout(()=>{document.documentElement.classList.remove('FaresDev_wipe-arrive');document.documentElement.classList.add('FaresDev_rt-release');whoosh(true);
          setTimeout(()=>document.documentElement.classList.remove('FaresDev_rt-release'),1600);},1250);});});}
    addEventListener('click',e=>{const a=e.target.closest('a[href$=".html"]');if(!a||a.target==='_blank'||e.metaKey||e.ctrlKey||e.shiftKey)return;
      const url=a.getAttribute('href');if(!url)return;e.preventDefault();
      try{sessionStorage.setItem('wipe-nav',url)}catch(err){}
      setRt(rtTitle(url));document.documentElement.classList.add('FaresDev_rt-leave');whoosh(false);
      loadAnim(1150);setTimeout(()=>{location.href=url},1450);});
  }

  
  const mn=$('#mnav'),bg=$('#burger');
  if(mn&&bg){const t=()=>{const o=mn.classList.toggle('FaresDev_open');bg.setAttribute('aria-expanded',o);bg.querySelector('i')&&(bg.querySelector('i').className=o?'fa-solid fa-xmark':'fa-solid fa-bars');lenis&&(o?lenis.stop():lenis.start());};
    bg.onclick=t;$$('#mnav a').forEach(a=>a.onclick=()=>{mn.classList.remove('FaresDev_open');bg.setAttribute('aria-expanded','false');bg.querySelector('i')&&(bg.querySelector('i').className='fa-solid fa-bars');lenis&&lenis.start();});
    addEventListener('keydown',e=>{if(e.key==='Escape'&&mn.classList.contains('FaresDev_open'))t();});
    addEventListener('resize',()=>{if(innerWidth>980&&mn.classList.contains('FaresDev_open'))t();});}

  
  const hd=$('.FaresDev_top');addEventListener('scroll',()=>hd&&hd.classList.toggle('FaresDev_scrolled',scrollY>30),{passive:true});

  
  const gl=$('.FaresDev_glow'),fine=matchMedia('(pointer:fine)').matches&&!matchMedia('(prefers-reduced-motion:reduce)').matches;
  if(gl&&fine){let gx=innerWidth/2,gy=innerHeight/2,tx=gx,ty=gy;
    addEventListener('pointermove',e=>{tx=e.clientX;ty=e.clientY;},{passive:true});
    (function loop(){gx+=(tx-gx)*.09;gy+=(ty-gy)*.09;gl.style.left=gx+'px';gl.style.top=gy+'px';requestAnimationFrame(loop);})();}
  if(fine){$$('.FaresDev_pcard,.FaresDev_unit').forEach(c=>{
    c.addEventListener('pointermove',e=>{const r=c.getBoundingClientRect(),x=(e.clientX-r.left)/r.width,y=(e.clientY-r.top)/r.height;
      c.style.setProperty('--mx',(x*100)+'%');c.style.setProperty('--my',(y*100)+'%');
      if(c.classList.contains('FaresDev_pcard')){const rx=(.5-y)*4,ry=(x-.5)*5;c.style.transform='perspective(1100px) rotateX('+rx+'deg) rotateY('+ry+'deg)';}});
    c.addEventListener('pointerleave',()=>{c.style.transform='';});});}

  build();tick();
});
