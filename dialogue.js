(() => {
  "use strict";

  // Quotations and page numbers follow the supplied simplified-Chinese textbook PDF.
  const people = [
    {
      id: "qu-yuan", name: "屈原", place: "战国 · 楚地", scene: "江畔遇渔父",
      work: "《楚辞·渔父》", chapter: "古代汉语（二）第一章", pages: "362–363",
      context: "屈原行吟泽畔，一位渔父停舟相问。两个人看着同一江水，各自说出了处世之道。",
      opening: "渔父问我，为何独在江边行吟。你若也在岸上，想问我什么？",
      topics: [
        {
          ask: "江水的清浊，让你想到了什么？", keys: ["清浊","清醒","独醒","皆醉","独清","江水","清和浊","意象","坚持","清白"],
          quote: "举世皆浊我独清，众人皆醉我独醒，是以见放。", page: 363,
          answer: "你看，我说了两次“我独”。把江水的清浊移到人身上，就成了我与世人的分歧。接着说醉与醒，又把这分歧变成了一个人清醒时的孤独。",
          gloss: "旁人都随俗，我还守着自己的判断。“皆”与“独”相对，水色和醉态便写出了我的处境。"
        },
        {
          ask: "“见放”的“见”怎样讲？", keys: ["见放","被动","语法","放逐","流放","是以"],
          quote: "是以见放。", page: 363,
          answer: "我在这里说的是自己遭遇了什么。“放”是放逐，“见”放在动词前表被动。“是以”接上文，合起来就是“因此被放逐”。",
          gloss: "请先找谁承受这个动作。被放逐的人是我，所以“见放”可以换成今天的“被放逐”。"
        },
        {
          ask: "渔父为何唱着歌离开？", keys: ["渔父","渔夫","沧浪","唱歌","濯","离开","帽带","莞尔","与世推移"],
          quote: "沧浪之水清兮，可以濯吾缨；沧浪之水浊兮，可以濯吾足。", page: 363,
          answer: "你听他唱，清水洗帽带，浊水洗脚。水变了，他便换一种用法。他把顺应世情的主张留在歌里，唱过便划船离去，篇中也把回答留给了读者。",
          gloss: "“濯”是洗，“缨”是帽带。清水、浊水都有用处，是渔父的想法；想听清我们俩的分歧，可以把这句和我的“我独清”对读。"
        },
        {
          ask: "江潭究竟在什么地方？", keys: ["江潭","泽畔","哪里","何处","地理","地点","背景","楚国","故事","是谁","你好","时代"],
          quote: "屈原既放，游于江潭，行吟泽畔。", page: 362,
          answer: "篇首只让我出现在江边。教材把“江潭”解释为泛指江湖之间，“泽畔”就是水边。你可以想象一人沿岸行吟，却很难凭这几个字给我定下一个确切渡口。",
          gloss: "这一句先交代我的处境，再写我的位置和动作。把“江潭”“泽畔”圈出来，下一句渔父出场，就有了相遇的地方。"
        }
      ]
    },
    {
      id: "meng-zi", name: "孟子", place: "战国 · 魏国", scene: "答梁惠王问",
      work: "《孟子·寡人之于国也》", chapter: "古代汉语（一）第二章", pages: "180–182",
      context: "魏国遭遇荒年，梁惠王移民运粮，却等不到人口增长。他带着这个疑问见了孟子。",
      opening: "梁王问我，移民又移粟，民为何还不多？请你一道听听，他拿什么来衡量自己的政事。",
      topics: [
        {
          ask: "为何让梁王想象五十步和百步？", keys: ["五十","百步","五十步笑百步","比喻","譬喻","论辩","笑","好战"],
          quote: "以五十步笑百步，则何如？", page: 181,
          answer: "王好谈战事，我便请他自己判断。两人都弃甲而走，只是奔逃的远近不同。王一开口承认这一点，也就得重新问自己：救荒时比邻国多做一些，足以称作善政吗？",
          gloss: "先问两人逃了多远，再问两人做的是不是同一件事。梁王亲口说出“是亦走也”，这个判断也就可以移到他和邻国的政事上。"
        },
        {
          ask: "“走”在这句话里是什么意思？", keys: ["走","步行","奔跑","逃跑","古今","词义","曳兵","逃"],
          quote: "弃甲曳兵而走。", page: 181,
          answer: "请你想想那人的动作：铠甲扔了，兵器拖在身后，唯恐逃得不快。在这里，“走”是跑，放在交战的情境里就是奔逃。“曳”是拖。",
          gloss: "全句可以说成“丢下铠甲，拖着兵器逃跑”。把“走”换成“散步”，便读不出下文急急停在五十步、百步的样子了。"
        },
        {
          ask: "救过荒以后，百姓还需要什么？", keys: ["农时","仁政","王道","百姓","救荒","人口","治理","移民","不加多","民生","粮食"],
          quote: "不违农时，谷不可胜食也。", page: 181,
          answer: "我会请王把目光从一次救荒移向一年的耕作。百姓播种、收获的时候，别征发他们去服役。家中经常有饭吃，才有供养老人、抚养孩子的余地。",
          gloss: "“违”在这里是耽误，“胜”是尽。用今天的话说，就是别误了种田的时节，粮食才能充足。"
        },
        {
          ask: "河内与河东在什么地方？", keys: ["河内","河东","哪里","何处","地理","地点","背景","魏国","梁惠王","故事","是谁","你好","时代"],
          quote: "河内凶，则移其民于河东，移其粟于河内。", page: 180,
          answer: "梁王说的“河”是黄河。教材所指的河内在黄河北岸，约今河南沁阳一带；河东在今山西西南部。“凶”是遭逢荒年，移民与运粮的方向恰好相反。",
          gloss: "沿着“于”字找目的地。灾民去河东，粮食送河内，一去一来，便是梁王自认尽心的两件事。"
        }
      ]
    },
    {
      id: "xun-zi", name: "荀子", place: "战国 · 诸子讲学", scene: "从染青说起",
      work: "《荀子·劝学》", chapter: "古代汉语（二）第一章", pages: "252–255",
      context: "《劝学》开篇写染料、冰水和木轮。荀子让读者先去看日常事物，再讨论学习怎样改变人。",
      opening: "不妨从一株蓝草看起。你想问染出的颜色，还是我为何要借染色来讲学习？",
      topics: [
        {
          ask: "蓝草怎样说明学习能改变人？", keys: ["蓝草","染色","青出于蓝","蓝色","颜色","学习","变好","比喻","改变","青取"],
          quote: "青，取之于蓝而青于蓝。", page: 252,
          answer: "“蓝”是能制染料的草。由草取出染料，所得的青色还能更深。我让你看到这个变化，然后再问：人肯下功夫学习，又怎会永远停在原处？",
          gloss: "句中“青”先指青色染料，后写颜色深。“蓝”是草名。你若把它们只当作两个颜色的名字，便读不出“取”的过程。"
        },
        {
          ask: "两个“于”的用法有何不同？", keys: ["两个于","于","介词","语法","比较","出处","句式"],
          quote: "青，取之于蓝而青于蓝。", page: 252,
          answer: "“取之于蓝”是从蓝草中提取，问来源；“青于蓝”是比蓝草的颜色更深，问比较。试着把两个“于”分别换成“从”和“比”，各自的关系就清楚了。",
          gloss: "把句子从“而”处断开。前半句跟着“取”找来处，后半句跟着“青”找比较对象。"
        },
        {
          ask: "“假舟楫”里的“假”该怎么读懂？", keys: ["舟","船","楫","假","绝江河","工具","外物","借助"],
          quote: "假舟楫者，非能水也，而绝江河。", page: 253,
          answer: "试想一个借船过河的人。他能到彼岸，并不要求他先成为游水高手。“假”是凭借，“绝”是横渡。我用这件寻常事，讲人怎样借外物增长自己的本领。",
          gloss: "舟是船，楫是桨。“能水”是会游泳，“水”在这里作动词。“绝江河”描画的是从这一岸到了另一岸。"
        },
        {
          ask: "走得慢的人怎样走远？", keys: ["积累","跬步","蹞步","坚持","锲","金石","千里","驽马","走得慢","放弃","慢","积水"],
          quote: "骐骥一跃，不能十步；驽马十驾，功在不舍。", page: 255,
          answer: "你只看起初一跃，良马轻捷得多；若看十天的路程，走得慢的也能走远。“舍”是停下来。我把时间放进譬喻里，正要你去想功夫怎样一天一天积起来。",
          gloss: "“驾”在这里按马拉车一天的路程来算。“十驾”给驽马留下了时间，因此最后四字才落在“不舍”。"
        }
      ]
    }
  ];

  const mounts = new WeakMap();
  const compact = value => value.toLowerCase().replace(/[\s\p{P}\p{S}]/gu, "");
  const followUp = /换个说法|说得再|通俗|白话|再讲|再说|翻[译譯]|举个例|何意|什么意思|怎么理解|继续|上一句|这句|再解释|简单点/;

  function el(tag, className, content) {
    const element = document.createElement(tag);
    if (className) element.className = className;
    if (content !== undefined) element.textContent = content;
    return element;
  }

  function action(label, className, callback) {
    const button = el("button", className, label);
    button.type = "button";
    button.addEventListener("click", callback);
    return button;
  }

  function pickTopic(person, question, lastTopic) {
    const text = compact(question);
    const exact = person.topics.find(topic => compact(topic.ask) === text);
    if (exact) return {topic: exact, gloss: false};
    let best;
    let highest = 0;
    for (const topic of person.topics) {
      const score = topic.keys.reduce((total, key) => total + (text.includes(key) ? key.length : 0), 0);
      if (score > highest) {
        highest = score;
        best = topic;
      }
    }
    const follow = followUp.test(question) || /^(为什么|为何|然后呢|再详细些|请展开)(呢|啊|呀)?$/.test(text);
    return {topic: best || (follow ? lastTopic : undefined), gloss: follow};
  }

  const sessions = new Map(people.map(person => [person.id, {turns: [], draft: "", topic: person.topics[0]}]));
  const MODEL = "deepseek-flash";
  let personalKey = "";
  let useAI = false;

  async function deepSeek(path, key, signal, body) {
    const headers = {Authorization: "Bearer " + key};
    if (body) headers["Content-Type"] = "application/json";
    const reply = await fetch("https://api.deepseek.com/" + path, {
      method: body ? "POST" : "GET", headers, signal,
      body: body ? JSON.stringify(body) : undefined,
      credentials: "omit", redirect: "error", referrerPolicy: "no-referrer", cache: "no-store"
    });
    if (!reply.ok) {
      const error = new Error("DeepSeek request failed");
      error.status = reply.status;
      throw error;
    }
    return reply.json();
  }

  function apiNotice(error) {
    if (error.status === 401 || error.status === 403) return "DeepSeek 未接受这把密钥，请检查后重新填写。";
    if (error.status === 402) return "DeepSeek 账户余额不足，课文研读仍可使用。";
    if (error.status === 429) return "DeepSeek 请求较多，请稍后重试。";
    return "未能收到 DeepSeek 的回复，请检查网络后重试。";
  }

  function mount(container, options = {}) {
    const host = typeof container === "string" ? document.querySelector(container) : container;
    if (!host) throw new Error("古人对话缺少容器。");
    mounts.get(host)?.destroy();
    const root = el("section", "course-dialogue");
    root.setAttribute("aria-label", "古人对话");
    host.replaceChildren(root);
    let person;
    let controller;
    let active = true;
    let phase = "";
    let status = "";

    const selectors = el("div", "cd-people");
    selectors.setAttribute("role", "group");
    selectors.setAttribute("aria-label", "选择对话人物");
    const grid = el("div", "cd-grid");
    const scene = el("aside", "cd-scene");
    const chat = el("section", "cd-chat");
    const header = el("div", "cd-chat-head");
    const heading = el("h3", "cd-chat-title");
    const mode = el("button", "cd-mode");
    mode.type = "button";
    mode.title = "选择课文研读或 AI 自由对话";
    header.append(heading, mode);
    const history = el("div", "cd-history");
    history.setAttribute("role", "log");
    history.setAttribute("aria-label", "对话记录");
    history.setAttribute("aria-live", "polite");
    history.tabIndex = 0;
    const prompts = el("div", "cd-prompts");
    prompts.setAttribute("role", "group");
    prompts.setAttribute("aria-label", "可选问题");
    const form = el("form", "cd-compose");
    const input = el("textarea", "cd-input");
    input.rows = 1;
    input.maxLength = 500;
    input.setAttribute("aria-label", "输入给古人的问题");
    const send = el("button", "cd-send");
    send.type = "submit";
    send.title = "发送问题";
    send.setAttribute("aria-label", "发送问题");
    send.innerHTML = '<svg viewBox="0 0 24 24" fill="none" aria-hidden="true"><path d="M12 19V5m-6 6 6-6 6 6" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round"/></svg>';
    form.append(input, send);
    const settings = el("details", "cd-settings");
    const summary = el("summary", "cd-details-label");
    const settingText = el("p", "cd-setting-copy", "浏览器会向 DeepSeek 官方验证你的密钥。启用后，问题、相关原文和近期对话将发送给 DeepSeek，费用计入你的账户。密钥仅在本页内存中保留，刷新即清除。");
    const keyLabel = el("label", "cd-key-label", "DeepSeek API 密钥");
    const keyField = el("input", "cd-key-input");
    keyField.type = "password";
    keyField.maxLength = 256;
    keyField.autocomplete = "off";
    keyField.autocapitalize = "none";
    keyField.spellcheck = false;
    keyLabel.append(keyField);
    const toggle = action("开启 AI 对话", "cd-toggle", toggleAI);
    const forget = action("清除密钥", "cd-forget", forgetKey);
    const getKey = el("a", "cd-key-link", "获取 DeepSeek 密钥 ↗");
    getKey.href = "https://platform.deepseek.com/api_keys";
    getKey.target = "_blank";
    getKey.rel = "noopener noreferrer";
    const keyActions = el("div", "cd-key-actions");
    keyActions.append(toggle, forget, getKey);
    const keyNotice = el("p", "cd-key-notice");
    keyNotice.setAttribute("role", "status");
    keyField.addEventListener("input", () => { keyNotice.textContent = ""; drawControls(); });
    keyField.addEventListener("keydown", event => {
      if (event.key === "Enter" && !event.isComposing) { event.preventDefault(); toggleAI(); }
    });
    mode.addEventListener("click", () => {
      settings.open = true;
      if (keyField.hidden) toggle.focus();
      else keyField.focus();
    });
    settings.append(summary, settingText, keyLabel, keyActions, keyNotice);
    const notice = el("p", "cd-notice");
    notice.setAttribute("role", "status");
    chat.append(header, history, prompts, form, notice);
    grid.append(scene, chat);
    root.append(selectors, settings, grid);

    function sourceLink(page, label) {
      const link = el("a", "cd-source", label);
      link.href = "#reference/" + page;
      link.setAttribute("aria-label", "查看教材页码说明，第 " + page + " 页");
      return link;
    }

    const personButtons = people.map(item => {
      const button = action("", "cd-person", () => selectPerson(item.id));
      button.append(el("b", "", item.name), el("span", "cd-work", item.work));
      selectors.append(button);
      return button;
    });

    function renderScene() {
      const first = person.topics[0];
      const title = el("h3", "cd-scene-title", person.scene);
      const meta = el("p", "cd-scene-meta", person.place + "　·　" + person.chapter);
      const quote = el("blockquote", "cd-scene-quote", first.quote);
      const attribution = el("p", "cd-attribution", person.work);
      const illustration = el("img", "cd-scene-art");
      const scenes = {
        "qu-yuan": ["river", "江岸与渔舟的情境画"],
        "meng-zi": ["mulberry", "桑树植物图版"],
        "xun-zi": ["slips", "竹简与书案的情境画"]
      };
      const [artName, artDescription] = scenes[person.id];
      illustration.src = "assets/art/" + artName + ".webp";
      illustration.alt = artDescription;
      scene.replaceChildren(illustration, meta, title, el("p", "cd-context", person.context), quote, attribution,
        sourceLink(person.id === "qu-yuan" ? 362 : person.id === "meng-zi" ? 180 : 252, "教材页码　" + person.pages + " 页 ↗"));
    }

    function makeTurn(turn) {
      const row = el("div", "cd-turn cd-" + turn.role);
      const who = turn.role === "user" ? "我" : person.name + " · " + (turn.ai ? "AI 拟答" : "教学拟答");
      row.append(el("span", "cd-speaker", who), el("p", "cd-bubble", turn.text));
      if (turn.evidence) {
        const evidence = el("details", "cd-evidence");
        const title = el("summary", "", turn.ai ? "本轮参考原文" : "对照原文");
        const citation = el("div", "cd-citation");
        citation.append(el("q", "", turn.evidence.quote), sourceLink(turn.evidence.page, person.work + " · 第 " + turn.evidence.page + " 页 ↗"));
        evidence.append(title, citation);
        row.append(evidence);
      }
      return row;
    }

    function drawLog() {
      const turns = sessions.get(person.id).turns;
      history.replaceChildren(makeTurn({role: "assistant", text: person.opening}), ...turns.map(makeTurn));
      history.scrollTop = history.scrollHeight;
    }

    function drawControls() {
      const thread = sessions.get(person.id);
      const hasTurns = thread.turns.some(turn => turn.role === "assistant" && turn.evidence);
      const pending = phase !== "";
      const next = person.topics.filter(topic => !hasTurns || topic !== thread.topic);
      const nextQuestions = hasTurns ? ["换个说法", ...next.slice(0, 2).map(t => t.ask)] : next.slice(0, 3).map(t => t.ask);
      prompts.replaceChildren(...nextQuestions.map(label => {
        const b = action(label, "cd-prompt", () => submit(label, false));
        b.disabled = pending;
        return b;
      }));
      toggle.textContent = phase === "checking" ? "正在验证…" : useAI ? "切换到课文研读" : "开启 AI 对话";
      toggle.disabled = pending || (!useAI && !keyField.value.trim() && !personalKey);
      forget.disabled = !personalKey && !keyField.value;
      keyField.hidden = useAI;
      keyLabel.hidden = useAI;
      keyField.disabled = pending;
      keyField.placeholder = personalKey ? "密钥已在本页验证，可输入新密钥" : "粘贴你的个人 API 密钥";
      summary.textContent = useAI ? "个人 API 密钥 · 已启用 DeepSeek" : "填写个人 API 密钥，开启 AI 对话";
      mode.textContent = useAI ? "AI 对话 · DeepSeek　⌄" : "课文研读 / 切换 AI　⌄";
      mode.classList.toggle("cd-mode-ai", useAI);
      input.disabled = pending;
      send.disabled = pending || !input.value.trim();
      notice.textContent = status;
      notice.hidden = !status;
    }

    function selectPerson(id) {
      const selected = people.find(item => item.id === id || item.name === id) || people[0];
      if (person === selected) return;
      if (person) {
        const previous = sessions.get(person.id);
        previous.draft = phase === "asking" ? previous.turns.pop().text : input.value;
      }
      cancelRequest();
      person = selected;
      status = "";
      heading.textContent = "与" + person.name + "对话";
      input.placeholder = "问" + person.name + "一个问题…";
      input.value = sessions.get(person.id).draft;
      personButtons.forEach((button, i) => button.setAttribute("aria-pressed", String(people[i] === person)));
      renderScene();
      drawLog();
      drawControls();
    }

    function cancelRequest() {
      controller?.abort();
      controller = undefined;
      phase = "";
    }

    function forgetKey() {
      if (phase === "asking") {
        const thread = sessions.get(person.id);
        input.value = thread.turns.pop().text;
        drawLog();
      }
      cancelRequest();
      personalKey = "";
      keyField.value = "";
      useAI = false;
      status = "";
      keyNotice.textContent = "密钥已清除，当前使用课文研读。";
      drawControls();
    }

    async function toggleAI() {
      if (phase) return;
      if (useAI) {
        useAI = false;
        keyNotice.textContent = "已切换到课文研读。你可以随时清除本页密钥。";
        status = "";
        drawControls();
        return;
      }
      const candidate = keyField.value.trim() || personalKey;
      if (!candidate) return;
      const check = new AbortController();
      controller = check;
      phase = "checking";
      keyNotice.textContent = "正在向 DeepSeek 官方验证密钥…";
      drawControls();
      const deadline = setTimeout(() => check.abort(), 15000);
      try {
        const data = await deepSeek("models", candidate, check.signal);
        if (!active || controller !== check) return;
        if (!data.data?.some(item => item.id === MODEL)) {
          keyNotice.textContent = "这个账户当前没有可用的 DeepSeek Flash 模型。";
          return;
        }
        personalKey = candidate;
        keyField.value = "";
        useAI = true;
        keyNotice.textContent = "密钥已验证，使用 DeepSeek Flash。";
        status = "已开启个人 AI 对话。";
        settings.open = false;
      } catch (error) {
        if (active && controller === check) keyNotice.textContent = apiNotice(error);
      } finally {
        clearTimeout(deadline);
        if (active && controller === check) {
          cancelRequest();
          drawControls();
        }
      }
    }

    function localTurn(topic, gloss) {
      if (topic) return {role: "assistant", text: gloss ? topic.gloss : topic.answer, evidence: topic};
      return {role: "assistant", text: "这个问题暂时超出本篇收录的问答。你可以引一句想读懂的原文，也可以从下面的问题接着谈。"};
    }

    async function submit(raw, refocus) {
      const question = raw.trim().slice(0, input.maxLength);
      if (!question || phase) return;
      const thread = sessions.get(person.id);
      const picked = pickTopic(person, question, thread.topic);
      const earlier = thread.turns.slice(-6).map(turn => ({role: turn.role, content: turn.text}));
      thread.turns.push({role: "user", text: question});
      input.value = "";
      status = "";
      if (!useAI) {
        if (picked.topic) thread.topic = picked.topic;
        thread.turns.push(localTurn(picked.topic, picked.gloss));
        drawLog();
        drawControls();
        if (refocus) input.focus({preventScroll: true});
        return;
      }
      const evidence = picked.topic || thread.topic;
      const instruction = "你扮演作品中的" + person.name + "，面向大学古代汉语课程学生，用第一人称自然回答。此为教学拟答，传世原话只能引给定原文。区分作品情节与史实，不虚构年代或出处。以一至两段回应学生提问，结合字词和语境。";
      const material = "篇目：" + person.work + "。情境：" + person.context + "。本轮参考原文：「" + evidence.quote + "」。教师释义：" + evidence.gloss;
      const messages = [{role:"system", content:instruction + "\n" + material}, ...earlier, {role:"user", content:question}];
      const job = new AbortController();
      controller = job;
      phase = "asking";
      status = "正在等待 AI 拟答…";
      drawLog();
      drawControls();
      const deadline = setTimeout(() => job.abort(), 65000);
      try {
        const data = await deepSeek("chat/completions", personalKey, job.signal, {
          model: MODEL, messages, max_tokens: 500, stream: false, thinking: {type:"disabled"}
        });
        const reply = data.choices?.[0]?.message?.content;
        if (typeof reply !== "string" || !reply.trim()) throw Error();
        if (!active || controller !== job) return;
        thread.topic = evidence;
        thread.turns.push({role:"assistant", text:reply.trim(), ai:true, evidence});
        status = "";
      } catch (error) {
        if (!active || controller !== job) return;
        useAI = false;
        if (error.status === 401 || error.status === 403) personalKey = "";
        keyNotice.textContent = apiNotice(error);
        if (picked.topic) thread.topic = picked.topic;
        thread.turns.push(localTurn(picked.topic, picked.gloss));
        status = apiNotice(error) + " 本条采用课文研读。";
      } finally {
        clearTimeout(deadline);
        if (active && controller === job) {
          cancelRequest();
          drawLog();
          drawControls();
          if (refocus) input.focus({preventScroll: true});
        }
      }
    }

    input.addEventListener("input", () => { send.disabled = !!phase || !input.value.trim(); });
    input.addEventListener("keydown", event => {
      if (event.key === "Enter" && !event.shiftKey && !event.isComposing && event.keyCode !== 229) {
        event.preventDefault();
        submit(input.value, true);
      }
    });
    form.addEventListener("submit", event => { event.preventDefault(); submit(input.value, true); });
    selectPerson(options.person);
    const instance = {selectPerson, destroy() {
      if (!active) return;
      active = false;
      const thread = sessions.get(person.id);
      thread.draft = phase === "asking" ? thread.turns.pop().text : input.value;
      cancelRequest();
      keyField.value = "";
      mounts.delete(host);
      root.remove();
    }};
    mounts.set(host, instance);
    return instance;
  }

  window.CourseDialogue = Object.freeze({mount});
})();
