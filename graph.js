/* The map, reader and index are three views of the same course graph. */
(() => {
  "use strict";
  const nodes = new Map(NODES.map(node => [node.id, node]));
  const types = { root: "课程总纲", course: "教学大纲", chapter: "教学章节", concept: "知识点", resource: "课程资料" };
  const tones = { root: "#e9d39e", wenzi: "#dfbc80", cihui: "#98d3af", yufa: "#c4b5da", yinyun: "#8bc5d1", xungu: "#e1b2ab", wenxian: "#b6caca" };
  const edges = new Map();
  const adjacent = new Map(NODES.map(n => [n.id, []]));
  const courses = window.CourseContent.courses;
  const works = window.CourseContent.works;
  const escape = value => String(value ?? "").replace(/[&<>"']/g, c => ({ "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;", "'": "&#39;" })[c]);
  const key = (a, b) => [a, b].sort().join("/");
  const path = id => "#graph/" + encodeURIComponent(id);
  const domain = node => META.domains[node.domain].name;
  const svgIcon = (d, width=18) => `<svg aria-hidden="true" width="${width}" height="${width}" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.6" stroke-linecap="round" stroke-linejoin="round">${d}</svg>`;
  const searchIcon = svgIcon('<circle cx="10" cy="10" r="6.4"/><path d="m15 15 5 5"/>');
  const expandIcon = svgIcon('<path d="M8 4H4v4m12-4h4v4M4 16v4h4m12-4v4h-4"/>',16);
  const detailIcon = svgIcon('<path d="M5 6.5c2-1.2 4.7-.9 7 .7 2.3-1.6 5-1.9 7-.7v11.8c-2.4-1.3-4.7-.8-7 .7-2.3-1.5-4.6-2-7-.7zM12 7.2V19"/>',18);

  for (const [a,b,kind] of LINKS) {
    const edgeKey = key(a,b);
    if (edges.has(edgeKey) || !nodes.has(a) || !nodes.has(b)) continue;
    const branch = nodes.get(a).parent === b || nodes.get(b).parent === a || a === "root" || b === "root";
    edges.set(edgeKey, {a,b,related: !branch && !!kind});
    adjacent.get(a).push(b);
    adjacent.get(b).push(a);
  }

  function resourcesFor(node) {
    if (node.res) {
      const suffix = { "res-plan1": "一", "res-plan2": "二" }[node.id];
      return `<a href="${node.res.src}"${node.id === "res-book" ? "" : ' target="_blank" rel="noopener"'}>${escape(node.res.label)} ↗</a>` +
        (suffix ? `<a href="assets/大纲${suffix}.docx" download>下载 Word 大纲 ↓</a>` : "");
    }
    let ancestor = node;
    while (ancestor.parent && !ancestor.id.match(/^c[12]$/)) ancestor = nodes.get(ancestor.parent);
    if (ancestor.id === "c1" || ancestor.id === "c2") {
      return `<a href="assets/outline${ancestor.id[1]}.html" target="_blank" rel="noopener">对应教学大纲 ↗</a><a href="#resources">教材与课程资料 →</a>`;
    }
    return '<a href="#resources">查看两份大纲与教材 →</a>';
  }

  function contentFor(node) {
    if (node.id === "root") return '<p>从一、二两门课进入章节，再沿连线找到具体知识点。每个知识点都可以回到所属章节，部分知识点还连着相应的精读篇目。</p><div class="kv"><span>古代汉语（一）</span><b>文字、词义、句式与词类活用</b></div><div class="kv"><span>古代汉语（二）</span><b>虚词、音韵、训诂、文体与修辞</b></div>';
    if (node.id === "res-book") return '<p>王力《古代汉语》的课程页码按所用简体电子本的阅读器页序标注。可从页码索引查找各篇起始页与引句位置。</p>';
    if (node.type === "course") {
      const c = courses.find(item => item.id === node.id);
      return `<p>${c.term}开设，共 ${c.hours} 学时，其中实践 ${c.practicalHours} 学时，${c.credits} 学分。</p><div class="kv"><span>课程教材</span><b>${escape(c.textbook)}</b></div>`;
    }
    return node.body.replace(/<p class="tip">.*?以下为 DOCX.*?<\/p>/gs, "");
  }

  function nodeReader(node) {
    const workList = works.filter(work => work.nodeIds.includes(node.id));
    const neighbors = adjacent.get(node.id).map(id => nodes.get(id));
    const summary = node.id === "res-book" ? "文选、常用词与古汉语通论。" : node.brief;
    return `<div class="kg-reader-kicker">${detailIcon} 节点研读</div>
      <h2 tabindex="-1">${escape(node.label)}</h2>
      <div class="kg-meta">${escape(types[node.type])}${node.domain === "root" ? "" : "　/　"+escape(domain(node))}${node.hours ? "　/　"+escape(node.hours) : ""}</div>
      <p class="kg-lead">${escape(summary)}</p>
      <div class="kg-text">${contentFor(node)}</div>
      ${workList.length ? `<section class="kg-reader-section"><h3>关联文选</h3>${workList.map(w=>`<div class="kg-work"><a href="#work/${w.id}">《${escape(w.title)}》 <span>→</span></a><a class="kg-page" href="#reference/${w.page}">篇目起始 · 教材第 ${w.page} 页 ↗</a></div>`).join("")}</section>` : ""}
      <section class="kg-reader-section"><h3>相连节点 <small>${neighbors.length}</small></h3><div class="kg-pills">${neighbors.map(n=>`<a href="${path(n.id)}" data-kg-node="${n.id}">${escape(n.label)}</a>`).join("")}</div></section>
      <div class="kg-resources">${resourcesFor(node)}</div>`;
  }

  function positions(id,compact) {
    const spots = new Map();
    const width = compact ? 380 : 720;
    const height = compact ? 368 : 402;
    const add = (n,x,y) => spots.set(n, [x*width,y*height]);
    add(id,.5,.47);
    if (id === "root" && !compact) {
      [["c1",.31,.40],["c2",.69,.56],["res-plan1",.30,.73],["res-plan2",.69,.21],["res-book",.48,.81],
        ["c1-4",.135,.23],["c1-7",.112,.47],["c1-10",.115,.70],
        ["c2-3",.874,.35],["c2-4",.89,.57],["c2-7",.866,.78]].forEach(p=>add(...p));
    } else {
      const neighbors = adjacent.get(id);
      const max = compact ? 6 : 10;
      const visible = neighbors.slice(0,max);
      const left = visible.filter((_,i)=>i%2===0);
      const right = visible.filter((_,i)=>i%2!==0);
      [left,right].forEach((group,side) => group.forEach((n,i) => {
        const y = group.length === 1 ? .40 : .17 + .66*i/(group.length-1);
        const inset = .035*Math.sin(Math.PI*y);
        add(n,side === 0 ? .20-inset : .80+inset, y);
      }));
    }
    return {spots,width,height};
  }

  function nodeLabels(id) {
    if (id === "c2-3") return ["《诗经》用韵", "与上古音"];
    const renames = {"res-plan1":"教学大纲（一）","res-plan2":"教学大纲（二）","res-book":"王力《古代汉语》"};
    const text = renames[id] ?? nodes.get(id).label;
    if (text.length <= 8) return [text];
    let split = text.indexOf("（");
    if (split < 2 || split > 8) split = Math.ceil(text.length/2);
    return [text.slice(0,split),text.slice(split)];
  }

  function chart(id,compact) {
    const {spots,width,height} = positions(id,compact);
    const mid = spots.get(id);
    const lineMarkup = [...edges.values()].filter(e=>spots.has(e.a) && spots.has(e.b)).map(e=>{
      const [a,b] = [spots.get(e.a),spots.get(e.b)];
      return `<line class="kg-edge${e.related?" kg-related":""}" x1="${a[0]}" y1="${a[1]}" x2="${b[0]}" y2="${b[1]}"/>`;
    }).join("");
    const starMarkup = [...spots.entries()].sort(([a],[b])=>Number(a===id)-Number(b===id)).map(([n,coords])=>{
      const node = nodes.get(n);
      const active = n === id;
      const r = active ? 13 : (node.type === "course" ? 7 : 4.8);
      const text = nodeLabels(n);
      return `<a href="${path(n)}" data-kg-node="${n}" class="kg-star${active?" kg-star-current":""}" aria-label="${escape(node.label)}${active?"，当前节点":""}">
        <g transform="translate(${coords.join(" ")})" style="--star:${tones[node.domain]}">
          <title>${escape(node.label)}</title>
          <rect class="kg-target" x="-48" y="-15" width="96" height="${text.length>1?64:54}" rx="6"/>
          ${active ? '<circle class="kg-aura" r="28"/><circle class="kg-aura-outer" r="36"/>' : ''}
          <circle class="kg-halo" r="${r+4}"/><circle class="kg-pip" r="${r}"/>
          <text text-anchor="middle" y="${active ? 41 : 23}">${text.map((s,i)=>`<tspan x="0" dy="${i?15:0}">${escape(s)}</tspan>`).join("")}</text>
        </g></a>`;
    }).join("");
    const dust = Array.from({length:74},(_,i)=>{
      const x = (37*i*i + 109*i+4)%width;
      const y = (43*i*i + 67*i+19)%height;
      return `<circle cx="${x}" cy="${y}" r="${i%5===0?1.1:.7}" opacity="${i%4===0?.47:.25}"/>`;
    }).join("");
    return `<svg class="kg-diagram" viewBox="0 0 ${width} ${height}" aria-label="知识关系图，可选择节点" role="group">
      <g aria-hidden="true" fill="#e3f1de">${dust}</g>
      <g class="kg-orbits" aria-hidden="true" transform="translate(${mid.join(" ")})"><circle r="76"/><circle r="144"/><circle r="215"/></g>
      <g aria-hidden="true">${lineMarkup}</g>${starMarkup}</svg>`;
  }

  window.renderGraph = function renderGraph(container,id) {
    let current = nodes.has(id) ? id : "root";
    let indexPage = 0;
    const pageSize = 9;
    container.innerHTML = `<div class="page-title"><h1>知识图谱</h1><p>从一个字词出发，循着它与章节、文选的联系向外读。</p></div>
      <div class="kg-shell"><section class="kg-sky" aria-label="课程知识关系">
        <div class="kg-sky-heading"><div><span class="kg-signal" aria-hidden="true"></span>课程关系图</div><button type="button" data-kg-home>${expandIcon} 总览</button></div>
        <div class="kg-stage"></div>
        <div class="kg-sky-foot"><span><i></i>课程层级</span><span><i></i>关联知识</span><small>${nodes.size} 个节点 · ${edges.size} 组关系</small><button type="button" data-kg-read>读当前节点 ↓</button></div>
      </section><aside class="kg-reader" aria-label="当前知识节点"></aside></div>
      <section class="kg-index"><div class="kg-index-top"><h2>节点索引</h2><div class="kg-tools"><label class="kg-search">${searchIcon}<input type="search" placeholder="查找字词或篇名" aria-label="查找图谱节点"></label><label class="kg-select"><select aria-label="按学科领域筛选"><option value="">全部领域</option>${Object.entries(META.domains).map(([id,d])=>`<option value="${id}">${escape(d.name)}</option>`).join("")}</select></label></div></div>
        <div class="kg-list"></div><div class="kg-list-footer"></div></section>`;
    const stage = container.querySelector(".kg-stage");
    const reader = container.querySelector(".kg-reader");
    const input = container.querySelector("input");
    const select = container.querySelector("select");
    const home = container.querySelector("[data-kg-home]");

    function renderMap() {
      stage.innerHTML = chart(current,stage.clientWidth < 530);
    }
    function renderReader() {
      reader.innerHTML = nodeReader(nodes.get(current));
      reader.scrollTop=0;
      home.disabled = current === "root";
      renderMap();
    }
    function renderIndex() {
      const query = input.value.trim().toLowerCase();
      const matches = NODES.filter(n=>(!select.value || select.value===n.domain) &&
        (!query || [n.label,n.brief,domain(n)].some(t=>t.toLowerCase().includes(query)) || works.some(w=>w.title.includes(query) && w.nodeIds.includes(n.id))));
      const total = Math.ceil(matches.length/pageSize);
      indexPage = Math.max(0,Math.min(indexPage,total-1));
      const subset = matches.slice(indexPage*pageSize,(indexPage+1)*pageSize);
      container.querySelector(".kg-list").innerHTML = subset.length ? subset.map(n=>
        `<a href="${path(n.id)}" data-kg-node="${n.id}" class="kg-list-item"${n.id===current?' aria-current="true"':''}><i style="--star:${tones[n.domain]}"></i><span><strong>${escape(n.label)}</strong><small>${escape(domain(n))} · ${types[n.type]}</small></span><em>↗</em></a>`).join("") :
        '<p class="kg-empty">没有找到匹配的节点。可以更换关键词，或查看全部领域。</p>';
      container.querySelector(".kg-list-footer").innerHTML = `<span aria-live="polite">共 ${matches.length} 个条目${total>1 ? "　·　第 "+(indexPage+1)+" / "+total+" 页" : ""}</span>
        ${total>1?`<div><button data-kg-page="-1" ${indexPage===0?"disabled":""} aria-label="上一页节点">←</button><button data-kg-page="1" ${indexPage===total-1?"disabled":""} aria-label="下一页节点">→</button></div>`:""}`;
    }
    function choose(next,focusReader) {
      if (next!==current) {
        current = next;
        history.pushState(null,"",path(next));
        renderReader();
        renderIndex();
      }
      if (focusReader) reader.querySelector("h2").focus({preventScroll:false});
    }
    input.addEventListener("input",()=>{indexPage=0;renderIndex();});
    select.addEventListener("change",()=>{indexPage=0;renderIndex();});
    container.addEventListener("click",event=>{
      const nodeLink = event.target.closest("[data-kg-node]");
      if (nodeLink && !event.ctrlKey && !event.shiftKey && !event.altKey && !event.metaKey && event.button===0) {
        event.preventDefault();
        const movingFromIndex = !!nodeLink.closest(".kg-index");
        choose(nodeLink.dataset.kgNode,movingFromIndex || event.detail===0);
      } else if (event.target.closest("[data-kg-read]")) {
        reader.querySelector("h2").focus();
      } else if (event.target.closest("[data-kg-home]")) {
        choose("root",false);
        stage.querySelector(".kg-star-current").focus({preventScroll:true});
      } else if (event.target.closest("[data-kg-page]")) {
        const dir = Number(event.target.closest("[data-kg-page]").dataset.kgPage);
        indexPage+=dir;renderIndex();
        const btn = container.querySelector(`[data-kg-page="${dir}"]:not(:disabled)`) || container.querySelector("[data-kg-page]:not(:disabled)");
        btn?.focus({preventScroll:true});
      }
    });
    renderReader();
    renderIndex();
    if (!window.ResizeObserver) return;
    const observer = new ResizeObserver(()=>{
      if (!container.isConnected) {observer.disconnect();return;}
      const compact = stage.clientWidth < 530;
      if (stage.dataset.compact !== String(compact)) {stage.dataset.compact=String(compact);renderMap();}
    });
    observer.observe(stage);
  };
})();
