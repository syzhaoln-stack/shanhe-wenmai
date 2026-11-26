// page is the one-based physical page in the supplied 1,118-page PDF.
// A coordinate identifies the named landscape, town or site at the scale described in geography.
window.CourseContent = {
  courses: [
    {
      id: "c1", title: "古代汉语（一）", term: "第三学期", hours: 48, practicalHours: 16, credits: 3,
      code: "C01010004", textbook: "王力主编《古代汉语》（校订重排本）第一册",
      chapters: [
        { title: "绪论", hours: 1 },
        { title: "文选", hours: 12 },
        { title: "古代汉语常用工具书简介", hours: 1 },
        { title: "汉字的结构", hours: 6 },
        { title: "古书中的用字", hours: 6 },
        { title: "古今词义的异同", hours: 4 },
        { title: "词的本义和引申义", hours: 4 },
        { title: "古汉语中的同义词", hours: 4 },
        { title: "古汉语的句子", hours: 4 },
        { title: "词类活用", hours: 6 }
      ]
    },
    {
      id: "c2", title: "古代汉语（二）", term: "第四学期", hours: 48, practicalHours: 8, credits: 3,
      code: "B01010006", textbook: "王力主编《古代汉语》（校订重排本）第二、三、四册",
      chapters: [
        { title: "文选", hours: 18 },
        { title: "古代汉语虚词", hours: 6 },
        { title: "《诗经》用韵与上古音", hours: 6 },
        { title: "古书的注解", hours: 6 },
        { title: "古文的文体与古书的句读", hours: 2 },
        { title: "中古音与诗律", hours: 6 },
        { title: "古代汉语修辞", hours: 4 }
      ]
    }
  ],
  works: [
    {
      nodeIds: ["k-shijing", "k-shijing-yunli", "k-shanggu-yin"],
      id: "guanju", title: "关雎", collection: "诗经", era: "周代", courseId: "c2",
      place: "周南 · 河洲", lat: null, lon: null,
      image: "雎鸠与荇菜", quote: "关关雎鸠，在河之洲。窈窕淑女，君子好逑。",
      imageNote: "先听水鸟相和，再见水中荇菜。“流”“采”“芼”三个动作把同一处水边写了三次。",
      reading: "“关关”摹写鸟鸣，“逑”指配偶。把“鸠、洲、逑”连起来读，这三个韵脚同属上古幽部，首句也入韵。",
      history: "《关雎》居《诗经》之首，属十五国风中的《周南》。诗从水鸟和鸣写到人的思慕，又以琴瑟、钟鼓写想象里的欢悦。",
      geography: "“洲”是水中的陆地。教材将“周南”解释为洛阳以南延至今湖北的一片诗歌区域；诗句没有指明河洲的确切位置。",
      concepts: ["起兴", "上古用韵", "重章复沓"], source: "《诗经·周南·关雎》",
      syllabus: "古代汉语（二）第一章第二节《诗经》、第三章《诗经》用韵与上古音", page: 299,
      question: "开篇四句中，哪些字需要圈作韵脚？",
      answer: "圈“鸠、洲、逑”。三字属幽部，第三句末的“女”没有加入这一组韵。"
    },
    {
      nodeIds: ["k-chuci", "k-daichen", "k-wenti"],
      id: "lisao", title: "离骚（节录）", collection: "楚辞", era: "战国", courseId: "c2",
      place: "楚地 · 山泽", lat: null, lon: null,
      image: "秋兰为佩", quote: "扈江离与辟芷兮，纫秋兰以为佩。",
      imageNote: "江离、白芷披在身上，秋兰连缀成佩。香草从草木变成人物的随身之物，修身也就成了看得见的动作。",
      reading: "“扈”是披，“纫”是连缀，“以为佩”意为把秋兰做成佩饰。沿着动词读，可以把两句还原为两个连续动作。",
      history: "屈原面对楚国政治中的信任与疏远，在诗中从名字、禀赋写到自身的选择。香草之芳与诗人所珍视的品德相互映照。",
      geography: "篇中并举山上的木兰和洲上的宿莽，山地与水洲组成诗里的楚地景观。采摘地点仅保留在诗的叙述中。",
      concepts: ["香草比喻", "楚辞句式", "实词释义"], source: "《楚辞·离骚》节录",
      syllabus: "古代汉语（二）第一章第三节《楚辞》、第七章古代汉语修辞", page: 350,
      question: "如果把“纫”理解为穿戴，原句会少掉什么？",
      answer: "会少掉制作的过程。“纫”是把秋兰连缀起来，“为佩”才是将它做成佩饰。"
    },
    {
      nodeIds: ["k-zuozhuan", "k-binyu", "k-jieci"],
      id: "zhengbo", title: "郑伯克段于鄢", collection: "左传", era: "春秋", courseId: "c1",
      place: "郑国 · 鄢", lat: 34.1, lon: 114.18,
      geoSource: "https://ditu.amap.com/place/B017600RDN",
      image: "城墙与蔓草", quote: "蔓草犹不可除，况君之宠弟乎？", quotePage: 5,
      imageNote: "京邑的城墙越过旧制，祭仲却说起地上难除的蔓草。野草的扩展，使封邑失控的忧虑有了具体形状。",
      reading: "标题“克”是战胜。“克段于鄢”先写动作和对象，再以“于鄢”补出地点，可以译作“在鄢战胜了段”。",
      history: "鲁隐公元年（前722），郑庄公与弟弟共叔段的冲突发生在郑国。《左传》先追述母亲为段请求封邑，再写京、鄢、共之间的局势变化。",
      geography: "鄢在今河南鄢陵县境。地图以今县城示方位。叙事先写京邑，再写段退往鄢，最后写他出奔共。",
      concepts: ["介词结构", "宾语前置", "比喻"], source: "《春秋左传·隐公元年》",
      syllabus: "古代汉语（一）第二章第一节《左传》、第九章古汉语的句子", page: 4,
      question: "祭仲问“姜氏何厌之有”，这里的“厌”是什么意思？",
      answer: "“厌”是满足。“何厌”是前置的宾语，“何厌之有”即“有何厌”，问姜氏怎样才会满足。"
    },
    {
      nodeIds: ["k-mengzi", "k-mingdong", "k-ciyi-biandong"],
      id: "guaren", title: "寡人之于国也", collection: "孟子", era: "战国", courseId: "c1",
      place: "魏国 · 大梁", lat: 34.79, lon: 114.31,
      image: "五亩之宅", quote: "五亩之宅，树之以桑，五十者可以衣帛矣。", quotePage: 181,
      imageNote: "孟子把治国的讨论落在一户人家的桑树上。顺着“桑—帛—衣”的关系，可以读出政策怎样影响百姓的日子。",
      reading: "“树”在这里是种植，“衣”读 yì，意思是穿。“树之以桑”可译为在宅地上种植桑树。",
      history: "梁惠王以灾年的移民、移粟说明自己用心，又问百姓为何不比邻国多。孟子先设“五十步笑百步”之喻，再谈农时与生计。",
      geography: "魏国都大梁，地在今河南开封，图点取今市区作参照。文中“河内”指黄河北岸一带，“河东”指今山西西南部。",
      concepts: ["词类活用", "古今词义", "设喻论辩"], source: "《孟子·梁惠王上》",
      syllabus: "古代汉语（一）第二章第四节《孟子》、第十章词类活用", page: 180,
      question: "“河内凶”能译成“河内十分凶险”吗？",
      answer: "“凶”在这里指荒年。紧随其后的迁民、运粮都是救荒举措，可以帮助判断词义。"
    },
    {
      nodeIds: ["k-shijing", "k-zhiqi", "k-xiuci"],
      id: "mang", title: "氓", collection: "诗经", era: "周代", courseId: "c2",
      place: "卫地 · 淇水", lat: null, lon: null,
      image: "桑叶与淇水", quote: "桑之未落，其叶沃若。", quotePage: 305,
      imageNote: "先是桑叶润泽，后来写桑叶黄落。这一组前后呼应的颜色，伴着叙述者从相恋写到婚后的遭际。",
      reading: "“沃若”形容润泽的样子。“涉淇”是渡过淇水，诗中女子先送人渡河，后来又写河水浸湿车帷，同一条河见证境况改变。",
      history: "《卫风》保存的这首叙事诗采用女子的口吻。最初约定婚期时她提到“良媒”，婚后的回望又写到劳动与家庭里的处境。",
      geography: "淇水在今河南北部，卫地大致涉及今豫北、冀南。诗中的涉水地点可以理解为行程中的一站，具体渡口未明。",
      concepts: ["比兴", "虚词之", "重章复沓"], source: "《诗经·卫风·氓》",
      syllabus: "古代汉语（二）第一章第二节《诗经》、第七章古代汉语修辞", page: 304,
      question: "把“其叶沃若”和“其黄而陨”放在一起读，能看见什么变化？",
      answer: "桑叶由润泽变为枯黄落下。读者先看见季候变化，又随叙述者回想她的青春和婚姻经历。"
    },
    {
      nodeIds: ["k-shijing", "k-ciyi-biandong", "k-guzhu-tili"],
      id: "qiyue", title: "七月", collection: "诗经", era: "周代", courseId: "c2",
      place: "豳地 · 今陕西旬邑一带", lat: null, lon: null,
      image: "大火与冬衣", quote: "七月流火，九月授衣。",
      imageNote: "诗把黄昏里渐向西沉的星宿和着手缝制的冬衣接在一起。天上的变化成为地上劳作的时序。",
      reading: "“火”指大火星，“流”是西移下沉。“授衣”指交付裁制寒衣的工作。两句写季节渐晚，人们准备过冬。",
      history: "这首《豳风》按月铺陈农事，写采桑、纺织、收获与备冬。朗读时比较是谁在做、为谁而做，可以读出不同人的生活处境。",
      geography: "豳为古地名，教材注明其地约在今陕西旬邑以西。诗中的“南亩”泛指田地，定位宜取区域尺度。",
      concepts: ["古今词义", "农事物候", "重章复沓"], source: "《诗经·豳风·七月》",
      syllabus: "古代汉语（二）第一章第二节《诗经》、第四章古书的注解", page: 313,
      question: "“七月流火”里的“火”能否用来判断当天的气温？",
      answer: "这里观察的是大火星在黄昏时的位置。“九月授衣”接着讲准备寒衣，两句合读可见气候转凉的季节线索。"
    },
    {
      nodeIds: ["k-chuci", "k-beidongju", "k-ciyi-biandong"],
      id: "yufu", title: "渔父", collection: "楚辞", era: "战国叙事", courseId: "c2",
      place: "楚地 · 江潭", lat: null, lon: null,
      image: "沧浪之水", quote: "举世皆浊我独清，众人皆醉我独醒，是以见放。", quotePage: 363,
      imageNote: "屈原说世浊己清，渔父却以清水洗帽带、浊水洗足作答。两人借同一组水色，表达了不同的处世态度。",
      reading: "“是以”可译为因此。“见放”中的“见”标示被动，“放”指放逐。先辨明谁承受动作，再理解屈原的话。",
      history: "篇章写被放逐的屈原与渔父交谈。教材将它解作楚人追念屈原的传说，适合分角色朗读，观察双方如何借比喻回应对方。",
      geography: "教材释“江潭”为泛指江湖之间。“湘流”出现在屈原的答话中，是他表明选择时提到的水域；对话现场只说“泽畔”。",
      concepts: ["被动句", "对比", "古今词义"], source: "《楚辞·渔父》",
      syllabus: "古代汉语（二）第一章第三节《楚辞》、第七章古代汉语修辞", page: 362,
      question: "如果把“见放”译为“见到放逐”，人物的处境会发生什么变化？",
      answer: "句中的屈原亲身承受了放逐。“见”是被动标志，译作“因此被放逐”，才能和开篇“屈原既放”照应。"
    },
    {
      nodeIds: ["k-lunyu-liji", "k-jieci", "k-ciyi-biandong"],
      id: "kezheng", title: "苛政猛于虎也", collection: "礼记", era: "春秋叙事", courseId: "c1",
      place: "鲁地 · 泰山", lat: 36.267, lon: 117.1,
      geoSource: "https://whc.unesco.org/en/list/437/",
      image: "泰山与虎", quote: "小子识之，苛政猛于虎也。",
      imageNote: "妇人连失亲人却不肯离开虎患之地。虎的危险在前几句已经写足，末句把它变成衡量苛政的尺度。",
      reading: "“识”在这里读 zhì，意为记住。“猛于虎”中“于”引出比较对象，读作“比虎还凶猛”。",
      history: "《礼记·檀弓下》借孔子过泰山的一段问答谈政治。孔子先扶轼倾听，随后让子路询问；妇人的回答引出末尾的评语。",
      geography: "篇首明言“孔子过泰山侧”。图点标示今山东泰山的位置，故事里的墓地仅写作山侧。",
      concepts: ["介词结构", "古今词义", "比喻"], source: "《礼记·檀弓下》",
      syllabus: "古代汉语（一）第二章第三节《论语》《礼记》、第六章古今词义的异同", page: 131,
      question: "妇人说“吾舅死于虎”，这里的“舅”应怎样理解？",
      answer: "“舅”指丈夫的父亲。她接着说丈夫、儿子也相继遇难，读出三代亲属关系，才明白这段话的分量。"
    },
    {
      nodeIds: ["k-zhanguoce", "k-mingdong", "k-yidong"],
      id: "fengxuan", title: "冯谖客孟尝君", collection: "战国策", era: "战国", courseId: "c1",
      place: "齐地 · 薛", lat: 34.91, lon: 117.19,
      geoSource: "https://shandong-chorography.org/database/a/section/70/article/77/",
      image: "长铗与债券", quote: "长铗归来乎，食无鱼！",
      imageNote: "开篇，冯谖弹剑唱起门下的饮食；后来，他受命持券去薛收债。长铗和债券把他的身份从求食者逐渐写成谋士。",
      reading: "题中“客孟尝君”，是给孟尝君做门客。到了“孟尝君客我”，主客位置互换，“客我”便是把我当作客人。",
      history: "战国贵族常以养士招揽人才。冯谖烧掉债券后，孟尝君一度不悦；等他回到封邑，父老出迎，才领会冯谖说的“市义”。",
      geography: "薛是孟尝君的封邑，也是冯谖收债之地。薛国故城遗址在今山东滕州市南部，地图取遗址一带的近似位置。",
      concepts: ["词类活用", "古今词义", "叙事照应"], source: "《战国策·齐策四》",
      syllabus: "古代汉语（一）第二章第二节《战国策》、第十章词类活用", page: 62,
      question: "“市义”中“市”是什么动作？",
      answer: "“市”作动词，是买。冯谖用焚券免债换来薛地百姓的拥戴，把这种结果说成给孟尝君买回了“义”。"
    },
    {
      nodeIds: ["k-shiji", "k-wenti", "k-mingdong"],
      id: "huaiyin", title: "淮阴侯列传", collection: "史记", era: "秦末汉初", courseId: "c2",
      place: "淮阴 · 今江苏淮安", lat: 33.54, lon: 118.93,
      geoSource: "https://www.zghy.gov.cn/col/937_157315/o/index.html",
      image: "城下的一餐", quote: "有一母见信饥，饭信，竟漂数十日。",
      imageNote: "韩信在城下钓鱼，漂洗丝絮的老妇见他饥饿，连续多日分食给他。一个“饭”字把救助写成看得见的举动。",
      reading: "“漂”是拍洗丝絮，“饭信”是给韩信饭吃。“竟”表示直到漂洗结束，读时要把它和后面的时间连起来。",
      history: "西汉司马迁为韩信立传，先写他显达以前在家乡寄食、受助的经历。把开篇与后来报答漂母的叙述相对，可以看到传记怎样照应人物的早年。",
      geography: "本篇的淮阴是秦代县名。图点取今江苏淮安马头镇，示意古淮阴县治所在区域。文中仅记“钓于城下”，没有指明钓处。",
      concepts: ["词类活用", "纪传体", "实词释义"], source: "《史记·淮阴侯列传》",
      syllabus: "古代汉语（二）第一章第四节《史记》《汉书》、第五章古文的文体与古书的句读", page: 435,
      question: "“饭信”中的“信”是人名，怎样据此读懂“饭”的用法？",
      answer: "“信”指韩信，是接受食物的人。“饭”放在他前面作动词，两字连起来就是给韩信饭吃。"
    }
  ]
};
