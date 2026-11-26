(() => {
  const eras = [
    ["all", "全部"], ["zhou", "周代国风"], ["chunqiu", "春秋"],
    ["zhanguo", "战国"], ["qinhan", "秦末汉初"]
  ];
  const eraKey = { "周代": "zhou", "春秋": "chunqiu", "春秋叙事": "chunqiu", "战国": "zhanguo", "战国叙事": "zhanguo", "秦末汉初": "qinhan" };
  // Broad ellipses indicate the approximate cultural settings of literary works.
  // They are deliberately distinct from the locatable places below.
  const regions = [
    { works: ["guanju"], label: "周南", x: 367, y: 326, rx: 36, ry: 49, labelY: 6 },
    { works: ["mang"], label: "卫地", x: 446, y: 156, rx: 32, ry: 20, labelY: 6 },
    { works: ["qiyue"], label: "豳地", x: 197, y: 204, rx: 28, ry: 20, labelY: 6 },
    { works: ["lisao", "yufu"], label: "楚地", x: 385, y: 455, rx: 65, ry: 34, labelY: 6 }
  ];
  const pins = {
    zhengbo: { label: "鄢", x: -17, anchor: "end" }, guaren: { label: "大梁", x: -17, anchor: "end" },
    kezheng: { label: "泰山", x: 16 }, fengxuan: { label: "薛", x: 16 }, huaiyin: { label: "淮阴", x: 16 }
  };
  const people = {
    lisao: ["qu-yuan", "屈原"], yufu: ["qu-yuan", "屈原"], guaren: ["meng-zi", "孟子"]
  };
  const esc = value => String(value).replace(/[&<>"']/g, char => ({ "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;", "'": "&#39;" }[char]));
  const arrow = '<span aria-hidden="true">↗</span>';
  const point = (w, data) => [
    (w.lon - data.west) / (data.east - data.west) * data.width,
    (data.north - w.lat) / (data.north - data.south) * data.height
  ];
  function baseMap(data) {
    let grid = "";
    for (const lat of [30, 35]) {
      const y = (data.north - lat) / (data.north - data.south) * data.height;
      grid += '<path d="M0 ' + y + 'H900"/><text x="10" y="' + (y - 5) + '">' + lat + '°N</text>';
    }
    for (const lon of [105, 110, 115, 120]) {
      const x = (lon - data.west) / (data.east - data.west) * data.width;
      grid += '<path d="M' + x + ' 0V588"/><text x="' + (x + 4) + '" y="18">' + lon + '°E</text>';
    }
    const streams = Object.entries(data.rivers).map(([name, path]) =>
      '<path class="at-stream ' + (name === "黄河" || name === "长江" ? "at-large" : "") + '" d="' + path + '"/>').join("");
    return '<image href="assets/eastern-relief.webp" width="900" height="588" preserveAspectRatio="none"/>' +
      '<g class="at-grid" aria-hidden="true">' + grid + '</g><g aria-hidden="true">' + streams + '</g>' +
      '<g class="at-terrain-label" aria-hidden="true"><text x="180" y="324" transform="rotate(-4 180 324)">秦岭</text>' +
      '<text x="327" y="138" transform="rotate(-65 327 138)">太行山</text></g>' +
      '<g class="at-river-label" aria-hidden="true"><text x="527" y="174" transform="rotate(-34 527 174)">黄河</text>' +
      '<text x="541" y="474" transform="rotate(4 541 474)">长江</text><text x="817" y="252">黄海</text></g>';
  }
  window.renderAtlas = (container, workId) => {
    const { works } = window.CourseContent;
    const data = window.CourseMapData;
    let current = works.find(w => w.id === workId) || works.find(w => w.id === "zhengbo");
    let filter = "all";
    let zoomIndex = 0;
    const zoomLevels = [1, 1.55, 2.35];
    const section = document.createElement("section");
    section.className = "at-page";
    section.setAttribute("aria-labelledby", "at-title");
    section.innerHTML = `<div class="at-heading"><h1 id="at-title">时空地图</h1><p>从文选中的一个地名，走进人物说话时的山河。</p></div>
      <div class="at-filters" role="group" aria-label="按作品所涉时代筛选">${eras.map(([id,label]) => `<button type="button" data-era="${id}" aria-pressed="${id === "all"}">${label}</button>`).join("")}</div>
      <div class="at-spread"><div class="at-map-panel"><div class="at-map-frame">
        <svg class="at-map" viewBox="0 0 900 588" preserveAspectRatio="xMidYMid meet" aria-label="文选所涉地与文化区域交互图" role="group">
          <g class="at-basemap">${baseMap(data)}</g><g class="at-marks" role="group" aria-label="选择图上地点"></g>
        </svg><div class="at-compass" aria-label="地图上方为北"><span>N</span><svg width="13" height="20" viewBox="0 0 14 22" aria-hidden="true"><path d="M7 1 13 19 7 15Z" fill="#35594a"/><path d="M7 1 1 19 7 15Z" fill="#879889"/></svg></div>
        <div class="at-zoom" role="group" aria-label="地图缩放"><button type="button" data-zoom="in" aria-label="放大地图">+</button><button type="button" data-zoom="out" aria-label="缩小地图">−</button></div>
      </div><div class="at-map-key"><span><i></i>所涉地</span><span><i class="at-area-key"></i>文化区域</span><small>河道据现代水系示意</small></div></div>
      <aside class="at-details" aria-label="所选作品的地理与历史"></aside></div>
      <div class="at-index-head"><h2>地图中的篇目</h2><span aria-live="polite" class="at-count"></span></div>
      <div class="at-index" role="group" aria-label="选择篇目"></div>
      <details class="at-sources"><summary>地图依据</summary><p>实点标示作品所涉地的今地参照，虚线标示诗歌或故事的文化区域。古河道和古国疆界随时代变化。作品与地名解说据两份课程大纲及王力《古代汉语》。</p>
      <p>现代河流取自 <a href="https://www.naturalearthdata.com/" target="_blank" rel="noopener">Natural Earth</a>。地形据 <a href="https://github.com/tilezen/joerd/blob/master/docs/attribution.md" target="_blank" rel="noopener">Mapzen Terrain Tiles</a>（USGS、NOAA 等提供高程数据）。</p></details>`;
    container.replaceChildren(section);
    const map = section.querySelector(".at-map");
    const marks = section.querySelector(".at-marks");
    const detail = section.querySelector(".at-details");
    const index = section.querySelector(".at-index");
    const selectWorks = () => filter === "all" ? works : works.filter(w => eraKey[w.era] === filter);

    function frameMap() {
      const zoom = zoomLevels[zoomIndex];
      const width = data.width / zoom;
      const height = data.height / zoom;
      const region = regions.find(r => r.works.includes(current.id));
      const center = region ? [region.x, region.y] : point(current, data);
      const left = Math.max(0, Math.min(data.width - width, center[0] - width / 2));
      const top = Math.max(0, Math.min(data.height - height, center[1] - height / 2));
      map.setAttribute("viewBox", [left, top, width, height].join(" "));
      section.querySelector('[data-zoom="in"]').disabled = zoomIndex === zoomLevels.length - 1;
      section.querySelector('[data-zoom="out"]').disabled = zoomIndex === 0;
    }
    function markAttributes(id, title, selected) {
      return `data-work="${esc(id)}" role="button" tabindex="0" aria-label="${esc(title)}" aria-pressed="${selected}"`;
    }
    function drawMarks(shown) {
      const areas = regions.map(r => {
        const candidates = shown.filter(w => r.works.includes(w.id));
        if (!candidates.length) return "";
        const active = candidates.some(w => w.id === current.id);
        const target = active ? current : candidates[0];
        return `<g class="at-area" transform="translate(${r.x} ${r.y})" ${markAttributes(target.id, r.label + "，" + target.title, active)}>
          <ellipse rx="${r.rx}" ry="${r.ry}"/><text y="${r.labelY}" text-anchor="middle">${r.label}</text></g>`;
      });
      const locations = shown.filter(w => pins[w.id]).map(w => {
        const coords = point(w, data);
        const pin = pins[w.id];
        const active = w.id === current.id;
        return `<g class="at-pin" transform="translate(${coords.join(" ")})" ${markAttributes(w.id, w.place + "，" + w.title, active)}>
          <circle class="at-hit" r="16"/><circle class="at-halo" r="10"/><circle class="at-dot" r="5.5"/>
          <text x="${pin.x}" y="6" text-anchor="${pin.anchor || "start"}">${pin.label}</text></g>`;
      });
      marks.innerHTML = [...areas, ...locations].join("");
      frameMap();
    }
    function draw() {
      const shown = selectWorks();
      const w = current;
      section.querySelectorAll("[data-era]").forEach(b => b.setAttribute("aria-pressed", String(b.dataset.era === filter)));
      section.querySelector(".at-count").textContent = shown.length + " 篇";
      index.innerHTML = shown.map(item => `<button class="at-index-item" type="button" data-work="${item.id}" aria-pressed="${item.id === w.id}"><i class="${pins[item.id] ? "" : "at-index-region"}"></i><span><b>${esc(item.title)}</b><small>${esc(item.place)}</small></span></button>`).join("");
      const person = people[w.id];
      detail.innerHTML = `<div class="at-detail-place"><svg width="16" height="18" viewBox="0 0 20 22" fill="none" aria-hidden="true"><path d="M10 21S2 13 2 9a8 8 0 1 1 16 0c0 4-8 12-8 12Z" stroke="currentColor" stroke-width="1.5"/><circle cx="10" cy="9" r="2.5" stroke="currentColor" stroke-width="1.5"/></svg><span>${esc(w.place)}</span></div>
        <h2>${esc(w.title)}</h2><div class="at-detail-ref">${esc(w.era)} <span>·</span> 《${esc(w.collection)}》</div>
        <blockquote>${esc(w.quote)}</blockquote>
        <h3>此地何在</h3><p>${esc(w.geography)}</p><h3>时代与故事</h3><p>${esc(w.history)}</p>
        <div class="at-links"><a href="#work/${w.id}">研读此篇 ${arrow}</a><a href="#graph/${w.nodeIds[0]}">知识图谱 ${arrow}</a>${person ? `<a href="#dialogue/${person[0]}">问${person[1]} ${arrow}</a>` : ""}</div>`;
      drawMarks(shown);
    }
    function storeSelection() {
      const hash = "#atlas/" + current.id;
      if (location.hash === hash) return;
      try { history.pushState(history.state, "", hash); }
      catch { location.hash = hash; }
    }
    function chooseWork(id) {
      const w = selectWorks().find(item => item.id === id);
      if (!w) return;
      current = w;
      storeSelection();
      draw();
    }
    section.addEventListener("click", e => {
      const btn = e.target.closest("[data-era], [data-work], [data-zoom]");
      if (!btn) return;
      if (btn.hasAttribute("data-era")) {
        filter = btn.dataset.era;
        const shown = selectWorks();
        if (!shown.includes(current)) current = shown[0];
        zoomIndex = 0;
        storeSelection();
        draw();
      } else if (btn.hasAttribute("data-work")) {
        const keyboard = e.detail === 0;
        const inMap = !!btn.closest("svg");
        chooseWork(btn.dataset.work);
        if (keyboard) (inMap ? marks : index).querySelector('[data-work="' + btn.dataset.work + '"]')?.focus({preventScroll: true});
      } else {
        zoomIndex += btn.dataset.zoom === "in" ? 1 : -1;
        zoomIndex = Math.max(0, Math.min(zoomLevels.length - 1, zoomIndex));
        frameMap();
      }
    });
    marks.addEventListener("keydown", e => {
      if ((e.key !== "Enter" && e.key !== " ") || !e.target.closest("[data-work]")) return;
      e.preventDefault();
      const id = e.target.closest("[data-work]").dataset.work;
      chooseWork(id);
      marks.querySelector('[data-work="' + id + '"]')?.focus({preventScroll: true});
    });
    draw();
  };
})();
