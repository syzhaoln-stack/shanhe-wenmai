(() => {
  // Selected from 汉风日课/utils/lessons.js. Page numbers refer to the supplied PDF.
  const lessons = [
    {
      title: "风马牛不相及", source: "《左传·僖公四年》", page: 8,
      quote: "君处北海，寡人处南海，唯是风马牛不相及也。",
      note: "齐军已到楚境，楚使先从两国相距遥远说起。接着读“何故”，才能听出这句成语在外交场合的诘问语气。"
    },
    {
      title: "多行不义，必自毙", source: "《左传·隐公元年》", page: 5,
      quote: "多行不义，必自毙，子姑待之。",
      note: "祭仲劝郑庄公及早处置共叔段，庄公用“姑”请他暂且等一等。联系教材注释，“毙”的意思是倒下去。"
    },
    {
      title: "豕人立而啼", source: "《左传·庄公八年》", page: 220,
      quote: "豕人立而啼。",
      note: "句子的主语是“豕”。“人”放在“立”之前作状语，说的是猪像人一样直立。教材在“名词用作状语”一节举了这个例子。"
    },
    {
      title: "关关雎鸠", source: "《诗经·周南·关雎》", page: 299,
      quote: "关关雎鸠，在河之洲。窈窕淑女，君子好逑。",
      note: "读完四句，依次圈出“鸠、洲、逑”。三个韵脚都归入上古幽部；再看诗中用“流”和“求”呼应的地方。"
    }
  ];

  window.renderCompanions = container => {
    container.innerHTML = `<section class="cp-section" aria-labelledby="cp-heading">
      <h2 id="cp-heading">配套研习</h2><div class="cp-grid">
        <article class="cp-card"><h3>汉风日课</h3>
          <label class="cp-picker">选读条目<select>${lessons.map((l, i) => `<option value="${i}">${l.title}</option>`).join("")}</select></label>
          <div class="cp-excerpt" aria-live="polite"></div>
        </article>
        <article class="cp-card cp-slides"><h3>《诗经》的语言密码</h3>
          <div class="cp-meta">课堂课件 · 16 页 · PowerPoint</div>
          <p>从《关雎》的水鸟、《静女》的彤管、《氓》的桑叶读到《七月》的星象。后半部分转入诗歌的韵脚、双声叠韵与古音通假。</p>
          <a class="cp-link" download="诗经的语言密码.pptx" href="assets/诗经的语言密码.pptx">下载课件 <span aria-hidden="true">↓</span></a>
        </article>
      </div><details class="cp-credits"><summary>图像来源与使用说明</summary><ul>
        <li>首页青绿山水、芦苇和青铜纹饰为教学情境创作。水鸟、桑叶、星象、城墙和书案图像选自课程课件《诗经的语言密码》，江畔渔舟选自配套小程序「汉风日课」。</li>
        <li>舆图入口采用约 1750 年的<a href="https://www.loc.gov/item/gm71005024/" target="_blank" rel="noopener">《黄河南河图》</a>局部，美国国会图书馆地理与地图部藏。</li>
        <li>香草照片为 Hungda 拍摄的<a href="https://commons.wikimedia.org/?curid=24977336" target="_blank" rel="noopener">现代佩兰</a>，经裁切后以 <a href="https://creativecommons.org/licenses/by-sa/3.0/" target="_blank" rel="noopener">CC BY-SA 3.0</a> 许可提供，仅作植物形态参照。</li>
        <li>白桑图版出自 Francisco Manuel Blanco《菲律宾植物志》，取自<a href="https://commons.wikimedia.org/wiki/File:Morus_alba_Blanco1.206.jpg" target="_blank" rel="noopener">公共领域原图</a>，局部裁切。</li>
        <li>南宋《虎》（传牧谿），约 1250—1279 年，选用<a href="https://www.clevelandart.org/art/1958.427.2" target="_blank" rel="noopener">克利夫兰艺术博物馆藏图</a>局部，裁切并提亮，CC0。</li>
        <li>长铗意象采用<a href="https://www.metmuseum.org/art/collection/search/44717" target="_blank" rel="noopener">大都会艺术博物馆藏战国青铜剑</a>，藏品号 1992.298.2，公共领域馆藏配图。</li>
        <li>米饭照片为 epSos.de 的 <a href="https://commons.wikimedia.org/wiki/File:Ceramic_bowl_full_of_white_rice.jpg" target="_blank" rel="noopener">Ceramic bowl full of white rice</a>，经裁切，以 <a href="https://creativecommons.org/licenses/by/2.0/" target="_blank" rel="noopener">CC BY 2.0</a> 许可提供。</li>
      </ul></details></section>`;

    const select = container.querySelector("select");
    const excerpt = container.querySelector(".cp-excerpt");
    function showLesson() {
      const lesson = lessons[Number(select.value)];
      excerpt.innerHTML = `<blockquote>${lesson.quote}</blockquote><div class="cp-meta">${lesson.source}</div>
        <p>${lesson.note}</p><a class="cp-link" href="#reference/${lesson.page}">引句出处 · 教材第 ${lesson.page} 页 <span aria-hidden="true">↗</span></a>`;
    }
    select.addEventListener("change", showLesson);
    showLesson();
  };
})();
