(function site(){
  "use strict";
  const main = document.querySelector("main");
  const {works, courses} = window.CourseContent;
  const nodes = new Map(NODES.map(node => [node.id, node]));
  const iconPaths = {
    search:'<circle cx="10.5" cy="10.5" r="6.4"/><path d="m15.3 15.3 4.8 4.8"/>',
    spark:'<path d="m10 3 1.9 5.8L17.5 11l-5.6 2.1L10 19l-2.1-5.9L2.5 11l5.4-2.2L10 3Z"/><path d="m18.5 2 .9 2.6L22 5.5l-2.6.9-.9 2.6-.9-2.6-2.6-.9 2.6-.9.9-2.6Z"/>',
    arrow:'<path d="M4.5 12h14m-5.7-5.5 5.7 5.5-5.7 5.5"/>',
    'arrow-up-right':'<path d="M6 18 18 6M7.5 6H18v10.5"/>',
    left:'<path d="m14.5 5.5-6.3 6.5 6.3 6.5"/>', right:'<path d="m9.5 5.5 6.3 6.5-6.3 6.5"/>',
    network:'<circle cx="5.5" cy="15.5" r="2.5"/><circle cx="12" cy="5" r="2.5"/><circle cx="18.5" cy="16" r="2.5"/><path d="m7 13.4 3.7-6.1m2.7 0 3.8 6.3M8 15.8h7.8"/>',
    leaf:'<path d="M4 18C2 8 10 5 21 3c-1 9-4 16-14 16M3 22l13-13"/>',
    map:'<path d="m3 5 6-2 6 2 6-2v15l-6 3-6-2-6 2V5Zm6-2v16m6-14v16"/>',
    book:'<path d="M12 6c-3-2.2-6-2.6-10-1.2v14c3.6-1.2 7-.8 10 1.4 3-2.2 6.4-2.6 10-1.4v-14C18 3.4 15 3.8 12 6Zm0 0v14"/>',
    pin:'<path d="M19.5 9.5c0 5.5-7.5 12-7.5 12s-7.5-6.5-7.5-12a7.5 7.5 0 1 1 15 0Z"/><circle cx="12" cy="9.5" r="2.4"/>',
    x:'<path d="m6 6 12 12M18 6 6 18"/>',menu:'<path d="M3 6h18M3 12h18M3 18h18"/>',
    mountain:'<path d="m2 18 7-11 4 6 3-4 6 9H2Z"/>'
  };
  function icon(name){return `<svg aria-hidden="true" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.65" stroke-linecap="round" stroke-linejoin="round">${iconPaths[name] || ""}</svg>`;}
  document.querySelectorAll("[data-icon]").forEach(el => {el.innerHTML=icon(el.dataset.icon);});
  function safe(text){return String(text ?? "").replace(/[&<>"']/g, ch=>({"&":"&amp;","<":"&lt;",">":"&gt;",'"':"&quot;","'":"&#39;"}[ch]));}
  function art(name){return `assets/art/${name}.webp`;}
  const illustration={guanju:"guanju",mang:"mang",qiyue:"qiyue",lisao:"orchid",yufu:"river",fengxuan:"sword",zhengbo:"wall",guaren:"mulberry",kezheng:"tiger",huaiyin:"rice"};
  const imageCaptions={lisao:"图像参照 · 今之佩兰，古名“秋兰”所指有不同解释",guaren:"图像参照 · 白桑植物图版",kezheng:"图像参照 · 南宋《虎》局部",huaiyin:"图像参照 · 现代盛饭器皿",fengxuan:"器物参照 · 战国错绿松石青铜剑，约公元前 4 至前 3 世纪",zhengbo:"图像参照 · 课堂课件中的城墙意象"};
  const glosses={
    guanju:[["关关","鸟儿相应的鸣声。全诗从声音起笔。"],["洲","水中的陆地。"],["逑","配偶。与前面的“鸠”“洲”押韵。"]],
    lisao:[["扈","披在身上。"],["纫","以线连缀。读出这个动作，才看得见秋兰怎样成为佩饰。"]],
    zhengbo:[["蔓草","蔓延滋长的草。祭仲借它比喻难以遏制的势力。"],["犹","尚且。与后面的“况”相呼应，语气递进。"]],
    guaren:[["树","种植。“树之以桑”是说在宅地上种桑树。"],["衣","读 yì，穿。“衣帛”即穿丝织品。"]],
    mang:[["桑","桑树。诗中先写桑叶润泽，后写桑叶枯黄飘落。"],["沃若","润泽的样子。"]],
    qiyue:[["流火","黄昏时大火星向西下沉，标志时序渐秋。"],["授衣","交付裁制寒衣的工作。"]],
    yufu:[["浊","字面写水的浑浊，屈原借清浊谈自己的处境。"],["见放","被放逐。“见”在这里表示被动。"]],
    kezheng:[["小子","这里是孔子对弟子们的称呼。"],["识","读 zhì，记住。"],["于","引出比较的对象，相当于今天的“比”。"]],
    fengxuan:[["长铗","长剑。冯谖弹着剑唱，向孟尝君的门下提出要求。"],["食无鱼","饭食里没有鱼，点明冯谖这一回所求的待遇。"]],
    huaiyin:[["饭信","给韩信饭吃。“饭”在这里作动词。"],["漂","在水边拍洗丝絮。"]]
  };
  function quoteReader(w){
    const terms=glosses[w.id] || [];
    let cursor=0,marked="";
    terms.forEach(([word],i)=>{
      const start=w.quote.indexOf(word,cursor);
      if(start<0)return;
      marked+=safe(w.quote.slice(cursor,start))+`<button class="word-gloss" aria-label="点读${safe(word)}" data-work-id="${w.id}" data-gloss="${i}" aria-pressed="false">${safe(word)}</button>`;
      cursor=start+word.length;
    });
    return `<span class="reading-label">${icon("book")} 原文节选 <small>点读画线字词</small></span><blockquote>${marked+safe(w.quote.slice(cursor))}</blockquote><p class="gloss-detail" aria-live="polite" hidden></p>`;
  }
  const people={lisao:"qu-yuan",yufu:"qu-yuan",guaren:"meng-zi"};
  function referenceLink(page){return `#reference/${Number(page)}`;}
  function references(raw) {
    const page = /^\d{1,4}$/.test(raw) ? Number(raw) : null;
    const extras = [
      {page:5, title:"《左传·郑伯克段于鄢》", note:"汉风日课选句「多行不义，必自毙，子姑待之」。", href:"#resources"},
      {page:8, title:"《左传·齐桓公伐楚》", note:"汉风日课选句「风马牛不相及」。", href:"#resources"},
      {page:180, title:"《孟子·梁惠王上》", note:"梁惠王谈灾岁移民运粟，开篇见「河内凶，则移其民于河东」。", href:"#dialogue/meng-zi"},
      {page:181, title:"《孟子·梁惠王上》", note:"孟子以五十步笑百步为喻，继而问政于农时和百姓生计。", href:"#dialogue/meng-zi"},
      {page:220, title:"古汉语通论 · 名词用作状语", note:"汉风日课选句「豕人立而啼」。", href:"#graph/k-zhuangyu"},
      {page:252, title:"《荀子·劝学》", note:"篇目起始，见「青，取之于蓝而青于蓝」。", href:"#dialogue/xun-zi"},
      {page:253, title:"《荀子·劝学》", note:"舟楫之喻，见「假舟楫者，非能水也，而绝江河」。", href:"#dialogue/xun-zi"},
      {page:255, title:"《荀子·劝学》", note:"积累之喻，见「骐骥一跃，不能十步」。", href:"#dialogue/xun-zi"},
      {page:362, title:"《楚辞·渔父》", note:"篇首写屈原游于江潭、行吟泽畔，渔父在此发问。", href:"#dialogue/qu-yuan"},
      {page:363, title:"《楚辞·渔父》", note:"屈原论清浊，渔父唱沧浪之歌；「是以见放」也在本页。", href:"#dialogue/qu-yuan"}
    ];
    const workRows = works.filter(w=>!page || w.page===page || (w.quotePage || w.page)===page);
    const extraRows = extras.filter(x=>!page || x.page===page);
    if(raw && (!page || (!workRows.length && !extraRows.length))){notFound();return;}
    const rows = workRows.map(w=>`<article class="course-box"><small>${safe(w.collection)} · ${safe(w.era)}</small><h2>${safe(w.title)}</h2>
      <p>篇目起始 · 第 ${w.page} 页<br>本站所引原句 · 第 ${w.quotePage || w.page} 页</p>
      <p>「${safe(w.quote)}」</p><a class="text-action" href="#work/${w.id}">进入文选研读 ${icon("arrow")}</a></article>`);
    rows.push(...extraRows.map(x=>`<article class="course-box"><small>课程延伸选读 · 第 ${x.page} 页</small><h2>${safe(x.title)}</h2><p>${safe(x.note)}</p><a class="text-action" href="${x.href}">返回研习内容 ${icon("arrow")}</a></article>`));
    main.innerHTML = `<section class="wrap interior"><div class="bread"><a href="#resources">课程资料</a>${icon("right")}<a href="#reference">教材页码</a></div>
      ${titleBlock(page ? "教材第 "+page+" 页" : "教材页码索引", "王力主编《古代汉语》。页码按课程所用简体电子本的阅读器页序标注；使用其他版本时，可按篇名或引句定位。")}
      <div class="course-grid">${rows.join("")}</div>${page ? '<a class="text-action" href="#reference">查看全部篇目页码 →</a>' : ''}</section>`;
  }
  function titleBlock(name,desc){return `<div class="page-title"><h1>${name}</h1>${desc ? `<p>${desc}</p>`:""}</div>`;}
  function bread(label){return `<div class="bread"><a href="#home">课程总览</a>${icon("right")}<span>${label}</span></div>`;}
  function workLink(w){return `<a href="#work/${w.id}" class="work-line"><span class="collection">${safe(w.collection)}</span><div><h3>${safe(w.title)}</h3><p>${safe(w.image)}<b>·</b>${safe(w.concepts[0])}</p></div><span class="thin-arrow">${icon("arrow-up-right")}</span></a>`;}
  const slides = [
    {tag:"辽宁师范大学 · 古代汉语数字研习馆",name:"山河文脉",desc:"从《诗经》的水岸到《楚辞》的江畔，<br>循着意象、地名与字词，读懂古人的语言。",image:"hero",label:"青绿山水",btn:"探索知识图谱",link:"#graph",second:"与古人对话",link2:"#dialogue",sicon:"spark"},
    {tag:"诗经 · 周南",name:"关关雎鸠",desc:"从水鸟的一声和鸣出发，<br>读《关雎》的起兴与韵脚。",image:"guanju",label:"诗经水岸",btn:"研读《关雎》",link:"#work/guanju",second:"走进意象研读",link2:"#imagery",sicon:"leaf"},
    {tag:"左传 · 隐公元年",name:"一字见春秋",desc:"从京邑到鄢，沿着地名，<br>读懂一场兄弟争端如何写进史书。",image:"bronze",label:"春秋器物意象",btn:"进入时空地图",link:"#atlas/zhengbo",second:"研读《郑伯克段于鄢》",link2:"#work/zhengbo",sicon:"book"}
  ];
  let slideIndex = 0, dialogue, homeTerm="all", imageryGroup="all";
  function hero(){
    const s=slides[slideIndex];
    return `<div class="hero-art" style="background-image:url('${art(s.image)}')"></div><div class="hero-shade"></div>
      <div class="hero-content"><div class="hero-tag"><span class="signal"></span>${s.tag}</div><h1>${s.name}</h1><p>${s.desc}</p>
      <div class="hero-actions"><a class="primary" href="${s.link}">${s.btn}${icon("arrow")}</a><a class="glass" href="${s.link2}">${icon(s.sicon)}${s.second}</a></div></div>
      <div class="hero-bottom"><div class="hero-pages" aria-label="选择主题">${slides.map((v,i)=>`<button class="${i===slideIndex?"selected":""}" data-slide="${i}" aria-label="第${i+1}幅：${v.label}" aria-current="${i===slideIndex}"><span></span></button>`).join("")}</div><div class="slide-controls"><span class="art-caption">${icon("mountain")} ${s.label}</span><span class="slide-count"><strong>0${slideIndex+1}</strong> / 03</span><button aria-label="上一幅" data-slide="${(slideIndex+2)%3}">${icon("left")}</button><button aria-label="下一幅" data-slide="${(slideIndex+1)%3}">${icon("right")}</button></div></div>`;
  }
  function graphPreview(){
    const pts=[[15,110],[44,58],[54,129],[70,89],[80,27],[91,153],[109,58],[112,106],[133,87],[151,28],[152,140],[164,66],[183,105],[202,24],[202,150],[221,77],[237,125],[248,42],[268,86],[282,146],[306,112],[320,54],[347,85],[361,35],[380,136],[7,28],[386,59],[146,174],[240,174]];
    let lines="";
    for(let i=0;i<pts.length;i++) for(let j=i+1;j<pts.length;j++){
      const [x,y]=pts[i], [u,v]=pts[j],distance=Math.hypot(x-u,y-v);
      if(distance<74 && distance>26) lines+=`<path d="M${x} ${y}L${u} ${v}" opacity="${(1-distance/108).toFixed(2)}"/>`;
    }
    const major=[3,6,8,11,12,15,18,21];
    return `<svg viewBox="0 0 400 185" preserveAspectRatio="xMidYMid slice" aria-hidden="true"><defs><radialGradient id="s-star"><stop stop-color="#f0ffec"/><stop offset=".22" stop-color="#ddfbed" stop-opacity=".95"/><stop offset=".48" stop-color="#79dabc" stop-opacity=".65"/><stop offset="1" stop-color="#459888" stop-opacity="0"/></radialGradient></defs><g fill="none" stroke="#a4e6d6" stroke-width=".8">${lines}</g>${pts.map(([x,y],i)=>`<circle cx="${x}" cy="${y}" r="${major.includes(i)?12:5}" fill="url(#s-star)"/><circle cx="${x}" cy="${y}" r="${major.includes(i)?2.4:1.25}" fill="#d4fce9"/>`).join("")}<g fill="#d6eae2" font-size="7.6" font-family="sans-serif" letter-spacing="1"><text x="94" y="49">文字</text><text x="189" y="103">古代汉语</text><text x="276" y="83">音韵</text><text x="127" y="140">词汇</text></g></svg>`;
  }
  const features=[
    {key:"graph",name:"知识图谱",text:"循节点梳理文字、词汇与音韵的关联。",ico:"network"},
    {key:"imagery",name:"意象研读",text:"从水鸟、桑叶与香草，读进诗文深处。",ico:"leaf",image:"reeds"},
    {key:"atlas",name:"时空地图",text:"沿古地名回到作品发生的历史语境。",ico:"map",image:"atlas"}];
  function home(){
    main.innerHTML=`<div class="wrap home"><section class="hero" id="hero" aria-label="课程主题">${hero()}</section>
      <section class="entry-section"><div class="section-heading"><h2>研习空间</h2><a class="quiet-link" href="#resources">${icon("book")}课程资料${icon("right")}</a></div>
      <div class="features">${features.map(f=>`<a class="feature ${f.key}" href="#${f.key}"><div class="feature-art ${f.image?"":"net-art"}">${f.image?`<img src="${art(f.image)}" alt="" loading="lazy">`:graphPreview()}<span class="art-icon">${icon(f.ico)}</span></div><div class="feature-text"><h3>${f.name}</h3><p>${f.text}</p><span class="feature-arrow">${icon("arrow-up-right")}</span></div></a>`).join("")}</div></section>
      <section class="home-works"><div class="section-heading"><h2>经典文选</h2><div class="pills" aria-label="按学期筛选">${[["all","全部"],["c1","古代汉语（一）"],["c2","古代汉语（二）"]].map(([id,label])=>`<button data-term="${id}" class="${id===homeTerm?"on":""}" aria-pressed="${id===homeTerm}">${label}</button>`).join("")}</div></div><div class="work-grid" id="home-work-list"></div></section></div>`;
    drawHomeWorks();
  }
  function drawHomeWorks(){const dest=document.querySelector("#home-work-list");if(dest) dest.innerHTML=works.filter(w=>homeTerm==="all" || w.courseId===homeTerm).map(workLink).join("");}
  function imagery(){
    const filters=["all",...new Set(works.map(w=>w.collection))];
    main.innerHTML=`<div class="wrap interior">${bread("意象研读")}${titleBlock("意象研读","选一幅意象，回到它所在的诗句。")}<div class="pills filter-pills" aria-label="按文献筛选">${filters.map(id=>`<button data-group="${safe(id)}" class="${imageryGroup===id?"on":""}" aria-pressed="${imageryGroup===id}">${id==="all"?"全部文献":safe(id)}</button>`).join("")}</div>
      <div class="imagery-grid">${works.filter(w=>imageryGroup==="all" || w.collection===imageryGroup).map(w=>`<a class="image-card" href="#work/${w.id}"><div><img src="${art(illustration[w.id])}" loading="lazy" alt=""><span>${safe(w.collection)}</span></div><section><small>${safe(w.title)}</small><h2>${safe(w.image)}</h2><p>${safe(w.quote)}</p><i>${icon("arrow-up-right")}</i></section></a>`).join("")}</div></div>`;
  }
  function work(id){
    const w=works.find(row=>row.id===id); if(!w){notFound();return;}
    const next=works[(works.indexOf(w)+1)%works.length];
    main.innerHTML=`<article class="wrap interior"><div class="bread"><a href="#imagery">意象研读</a>${icon("right")}<span>${safe(w.title)}</span></div>
      <header class="work-hero"><img src="${art(illustration[w.id])}" alt=""><div></div><section><span>${safe(w.era)}　/　${safe(w.collection)}</span><h1>${safe(w.title)}</h1><p>${safe(w.source)}</p></section></header>
      ${imageCaptions[w.id]?`<p class="image-caption">${imageCaptions[w.id]} <a href="#resources/images">图源 ↗</a></p>`:""}
      <div class="read-layout"><section class="reading"><div class="quote-panel">${quoteReader(w)}<a class="quiet-link" href="${referenceLink(w.quotePage || w.page)}">引句出处 · 教材第 ${w.quotePage || w.page} 页 ${icon("arrow-up-right")}</a></div>
      <section class="read-section"><h2>${safe(w.image)}</h2><p>${safe(w.imageNote)}</p><h3>字词细读</h3><p>${safe(w.reading)}</p></section><section class="read-section"><h2>历史与地理</h2><p>${safe(w.history)}</p><p>${safe(w.geography)}</p><a class="text-action" href="#atlas/${w.id}">${icon("pin")}在时空地图中查看${icon("arrow")}</a></section>
      <details class="study-question"><summary><span><small>随文一问</small>${safe(w.question)}</span><b>＋</b></summary><p>${safe(w.answer)}</p></details></section>
      <aside class="read-aside"><h3>研读线索</h3><div class="tag-row">${w.concepts.map(c=>`<span>${safe(c)}</span>`).join("")}</div><h4>关联知识点</h4>${w.nodeIds.filter(n=>nodes.has(n)).map(n=>`<a href="#graph/${n}">${icon("network")}${safe(nodes.get(n).label)}${icon("right")}</a>`).join("")}<h4>课程定位</h4><p>${safe(w.syllabus)}</p><a href="${referenceLink(w.page)}">篇目起始 · 教材第 ${w.page} 页${icon("arrow-up-right")}</a>${people[w.id]?`<a class="aside-ask" href="#dialogue/${people[w.id]}">${icon("spark")}与${w.id==="guaren"?"孟子":"屈原"}对话${icon("right")}</a>`:""}</aside></div><a class="next-reading" href="#work/${next.id}"><span>下一篇文选</span><b>${safe(next.title)}</b>${icon("arrow")}</a></article>`;
  }
  function resources(){
    main.innerHTML=`<div class="wrap interior">${bread("课程资料")}${titleBlock("课程资料","查阅两学期的教学大纲，按篇目核对教材页码。")}
      <section class="book-resource"><div class="book-illustration">${icon("book")}</div><div><small>课程教材 · 页码指引</small><h2>王力《古代汉语》</h2><p>本站标注课程所用简体电子本的阅读器页序，方便对照自己手中的教材。</p></div><a class="solid-link" href="#reference">查看教材页码${icon("arrow-up-right")}</a></section>
      <div class="course-grid">${courses.map((c,i)=>`<section class="course-box"><small>${safe(c.term)}　·　${c.credits} 学分　·　${c.hours} 学时</small><h2>${safe(c.title)}</h2><p>${safe(c.textbook)}</p><div class="course-links"><a href="assets/outline${i+1}.html" target="_blank" rel="noopener">阅读大纲 ${icon("arrow-up-right")}</a><a href="assets/大纲${i===0?"一":"二"}.docx" download>下载 Word</a></div><h3>教学章节</h3>${c.chapters.map((ch,j)=>`<a class="chapter-line" href="#graph/${c.id}-${j+1}"><span>${String(j+1).padStart(2,"0")}</span><b>${safe(ch.title)}</b><em>${ch.hours} 学时</em></a>`).join("")}</section>`).join("")}</div></div>`;
  }
  function notFound(){main.innerHTML=`<div class="wrap interior">${titleBlock("未找到此页","可从课程总览选择篇目或使用顶部搜索。")}<a class="text-action" href="#home">返回课程总览 ${icon("arrow")}</a></div>`;}
  function render(reset=true){
    const [page="home",raw=""]=location.hash.slice(1).split("/");
    const route=page || "home";
    let id;try{id=decodeURIComponent(raw);}catch{id="";}
    if(dialogue){dialogue.destroy();dialogue=null;}
    document.querySelectorAll(".main-nav a,.mobile-nav a,.ask-link").forEach(a=>{
      const active=a.hash===`#${route==="work"?"imagery":route}`;
      a.classList.toggle("current",active);
      if(active)a.setAttribute("aria-current","page");else a.removeAttribute("aria-current");
    });
    closeNav();
    if(route==="home")home();
    else if(route==="imagery")imagery();
    else if(route==="work")work(id);
    else if(route==="reference")references(id);
    else if(route==="resources"){
      resources();
      const supplements=document.createElement("div");
      main.querySelector(".interior").append(supplements);
      window.renderCompanions(supplements);
    }
    else if(route==="graph"||route==="atlas"){
      const name=route==="graph"?"知识图谱":"时空地图";
      main.innerHTML=`<div class="wrap interior">${bread(name)}<div id="special-view"></div></div>`;
      const fn=route==="graph"?window.renderGraph:window.renderAtlas;
      if(fn)fn(document.querySelector("#special-view"),id);else notFound();
    }else if(route==="dialogue"){
      main.innerHTML=`<div class="wrap interior">${bread("问古人")}${titleBlock("问古人","走进一篇课文，和故事里的人物谈谈。")}<div id="dialogue-view"></div></div>`;
      if(window.CourseDialogue)dialogue=window.CourseDialogue.mount("#dialogue-view",{person:id||"qu-yuan"});
    }else notFound();
    const current=main.querySelector("h1")?.textContent || ({graph:"知识图谱",atlas:"时空地图"}[route]||"课程研习馆");
    document.title=route==="home"?"山河文脉 · 古代汉语研习馆":`${current} · 山河文脉`;
    if(reset){window.scrollTo({top:0,behavior:"instant"});main.focus({preventScroll:true});}
    if(route==="resources" && id==="images"){
      const credits=main.querySelector(".cp-credits");
      credits.open=true;
      credits.scrollIntoView({block:"center"});
    }
  }
  main.addEventListener("click",e=>{
    const btn=e.target.closest("button"); if(!btn)return;
    if(btn.matches(".word-gloss")){
      const panel=btn.closest(".quote-panel"), detail=panel.querySelector(".gloss-detail");
      const [word,note]=glosses[btn.dataset.workId][Number(btn.dataset.gloss)];
      const wasOpen=btn.getAttribute("aria-pressed")==="true";
      panel.querySelectorAll(".word-gloss").forEach(b=>b.setAttribute("aria-pressed",String(b===btn&&!wasOpen)));
      detail.hidden=wasOpen;
      detail.textContent=wasOpen?"":word+"　"+note;
    }
    if(btn.closest("#hero") && btn.dataset.slide!==undefined){slideIndex=Number(btn.dataset.slide); const box=document.querySelector("#hero");box.innerHTML=hero();if(e.detail===0)box.querySelector(".hero-pages .selected")?.focus();}
    if(btn.closest(".home-works") && btn.dataset.term){homeTerm=btn.dataset.term;main.querySelectorAll("[data-term]").forEach(b=>{b.classList.toggle("on",b===btn);b.setAttribute("aria-pressed",String(b===btn));});drawHomeWorks();}
    if(btn.closest(".filter-pills") && btn.dataset.group){imageryGroup=btn.dataset.group;imagery();main.querySelector(".filter-pills .on")?.focus({preventScroll:true});}
  });
  const dialog=document.getElementById("search-dialog"),input=document.getElementById("search-input"),results=document.getElementById("results");
  const lower=x=>x.toLowerCase().replace(/\s|《|》/g,"");
  const searchItems=[
    ...works.map(w=>({title:w.title,group:"文选",detail:w.image,link:`#work/${w.id}`,terms:[w.collection,w.image,w.quote,...w.concepts,w.place,w.era,w.history,w.geography].join(" ")})),
    ...NODES.filter(n=>n.type==="concept" || n.type==="chapter").map(n=>({title:n.label,group:"图谱",detail:META.domains[n.domain]?.name || "古代汉语",link:`#graph/${n.id}`,terms:n.brief})),
    ...[["屈原","qu-yuan"],["孟子","meng-zi"],["荀子","xun-zi"]].map(([name,id])=>({title:`与${name}对话`,group:"问古人",detail:"人物对话",link:`#dialogue/${id}`,terms:"古人 AI 人物对话"})),
    {title:"时空地图",group:"地图",detail:"历史背景与作品地理",link:"#atlas",terms:"时代 位置 方位 历史 地图 地名 山川 黄河 长江 古地理"},
    {title:"意象研读",group:"意象",detail:"逐篇品读意象",link:"#imagery",terms:"诗词 诗文 场景 物象 图像"},
    {title:"知识图谱",group:"图谱",detail:"课程知识点及关联",link:"#graph",terms:"知识关系 图谱 章节 网络"},
    {title:"教学大纲与课件",group:"课程",detail:"两个学期的课程资料",link:"#resources",terms:"资料 课程一 课程二 资源 Word PPT 下载"},
    {title:"教材页码索引",group:"课程",detail:"王力《古代汉语》",link:"#reference",terms:"古代汉语 教材 PDF 页码 文选 原句"}
  ];
  function search(){
    const q=lower(input.value.trim());
    const shown=q?searchItems.map(item=>({item,score:lower(item.title).includes(q)?3:lower(item.detail).includes(q)?2:lower(item.terms).includes(q)?1:0})).filter(entry=>entry.score).sort((a,b)=>b.score-a.score).map(entry=>entry.item).slice(0,40):[searchItems[0],searchItems[1],...searchItems.filter(item=>["六书","与屈原对话","教学大纲与教材"].includes(item.title))];
    results.innerHTML=`<small class="search-label">${q?"搜索结果":"常用入口"}</small>`+(shown.length?shown.map(item=>`<a href="${item.link}"><span>${safe(item.group)}</span><div><b>${safe(item.title)}</b><small>${safe(item.detail)}</small></div>${icon("arrow-up-right")}</a>`).join(""):`<p class="no-results">未找到相关条目，可试试“关雎”“起兴”或“音韵”。</p>`);
  }
  function openSearch(){if(dialog.open)return;input.value="";search();dialog.showModal();input.focus();}
  document.querySelector("#search-toggle").onclick=openSearch;
  document.querySelector("#search-close").onclick=()=>dialog.close();
  input.addEventListener("input",search);
  input.addEventListener("keydown",e=>{if(e.key==="Enter")results.querySelector("a")?.click();if(e.key==="ArrowDown"){e.preventDefault();results.querySelector("a")?.focus();}});
  results.addEventListener("click",e=>{if(e.target.closest("a"))dialog.close();});
  dialog.addEventListener("click",e=>{if(e.target===dialog){const r=dialog.getBoundingClientRect();if(e.clientX<r.left||e.clientX>r.right||e.clientY<r.top||e.clientY>r.bottom)dialog.close();}});
  document.addEventListener("keydown",e=>{if((e.ctrlKey||e.metaKey)&&e.key.toLowerCase()==="k"){e.preventDefault();openSearch();}if(e.key==="Escape")closeNav();});
  const menu=document.querySelector("#mobile-nav"),menuButton=document.querySelector("#menu-toggle");
  function closeNav(){menu.hidden=true;menuButton.setAttribute("aria-expanded","false");}
  menuButton.onclick=()=>{menu.hidden=!menu.hidden;menuButton.setAttribute("aria-expanded",String(!menu.hidden));};
  menu.addEventListener("click",closeNav);
  document.querySelector(".skip").addEventListener("click",e=>{e.preventDefault();main.focus();});
  window.addEventListener("hashchange",()=>render());
  render(false);
})();
