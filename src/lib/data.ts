/* ————————————————————————————————————————————————————————————
 * 郑超 Zheng Chao / Terry Arison — central content & imagery.
 * All imagery is locally generated in the site's shared
 * Organic-Futurist art direction (see /public/images).
 * ———————————————————————————————————————————————————————————— */

/* ————————————————— Hero visual ————————————————— */

export const heroVisual = {
  desktop: '/images/hero-desktop.jpg',
  mobile: '/images/hero-mobile.jpg',
};

/* ————————————————— Works ————————————————— */

export type Stream = 'write' | 'build' | 'produce' | 'collect';

export interface Work {
  slug: string;
  title: string;
  titleEn: string;
  stream: Stream;
  streamLabel: string;
  status: string;
  statusEn: string;
  summary: string;
  summaryEn: string;
  hero: string;
  overview: string[];
  overviewEn: string[];
  gallery: { src: string; caption: string }[];
  quote: string;
}

export const works: Work[] = [
  {
    slug: 'first-novel',
    title: '第一部长篇小说',
    titleEn: 'First Novel',
    stream: 'write',
    streamLabel: 'Write · 写作',
    status: '创作中',
    statusEn: 'In Progress',
    summary: '一部以时间与执念为主题的长篇小说，正在缓慢而持续地生长。',
    summaryEn: 'A long-form novel on time and obsession — growing slowly, continuously.',
    hero: '/images/works/novel-hero.jpg',
    overview: [
      '写作是我在造物之外最私密的实践。这部长篇小说以时间为经、执念为纬，试图把那些无法归档的经验，缝进一个可以栖居的故事里。',
      '它不追赶进度。一页一页地写，像收藏一件旧物——不急，但从不停止。',
    ],
    overviewEn: [
      'Writing is my most private practice beside building. This novel takes time as its warp and obsession as its weft — stitching experience that refuses to be archived into a story one can live inside.',
      'It does not chase deadlines. It is written page by page, like collecting an old object: unhurried, never stopped.',
    ],
    gallery: [
      { src: '/images/works/novel-1.jpg', caption: '手稿 · 章节片段' },
      { src: '/images/works/novel-2.jpg', caption: '手稿 · 器物' },
      { src: '/images/works/novel-3.jpg', caption: '手稿 · 长夜' },
    ],
    quote: '把无法归档的时间，缝进可以栖居的故事。',
  },
  {
    slug: 'app-concept',
    title: 'App 概念',
    titleEn: 'Digital Product Concepts',
    stream: 'build',
    streamLabel: 'Build · 造物',
    status: '概念迭代',
    statusEn: 'Iterating',
    summary: '关于阅读、收藏与工具的数字产品概念——以界面造物。',
    summaryEn: 'Digital product concepts around reading, archives and tools — building through interfaces.',
    hero: '/images/works/app-hero.jpg',
    overview: [
      '我持续构思以阅读与档案为核心的数字产品：让长文字获得应有的安静界面，让收藏拥有配得上旧物的秩序。',
      '目前处于概念与原型阶段。没有宏大的数据故事，只有对界面上每一寸呼吸感的执念。',
    ],
    overviewEn: [
      'I keep exploring digital products centred on reading and archives: interfaces that give long-form text the quiet it deserves, and systems that give old objects the order they deserve.',
      'Everything here is concept and prototype. No grand numbers — only the obsession with every inch of breathing room in an interface.',
    ],
    gallery: [
      { src: '/images/works/app-1.jpg', caption: '概念界面 · 阅读' },
      { src: '/images/works/app-2.jpg', caption: '概念界面 · 档案' },
      { src: '/images/works/app-3.jpg', caption: '概念界面 · 工具' },
    ],
    quote: '界面应该退后，让内容站在光里。',
  },
  {
    slug: 'freeframe-studio',
    title: 'FreeFrame Studio',
    titleEn: 'FreeFrame Studio',
    stream: 'produce',
    streamLabel: 'Produce · 制作',
    status: '长期实践',
    statusEn: 'Ongoing',
    summary: '以工作室为单位的内容制作——从场地、摄制到协作。',
    summaryEn: 'Content production through a studio — from location and shooting to collaboration.',
    hero: '/images/works/studio-hero.jpg',
    overview: [
      'FreeFrame Studio 是我的制作实践：内容生产、场地与摄制协调、KOL 协作与品牌视觉。',
      '它把「造物」扩展成一群人的协作——把想法变成画面，把画面变成作品。',
    ],
    overviewEn: [
      'FreeFrame Studio is my production practice: content production, location and shooting coordination, creator collaboration and brand visuals.',
      'It expands "building" into collaboration — turning ideas into imagery, and imagery into work.',
    ],
    gallery: [
      { src: '/images/works/studio-1.jpg', caption: '制作 · 现场' },
      { src: '/images/works/studio-2.jpg', caption: '制作 · 后期' },
      { src: '/images/works/studio-3.jpg', caption: '制作 · 场地' },
    ],
    quote: '把想法变成画面，把画面变成作品。',
  },
  {
    slug: 'collection',
    title: '旧物收藏档案',
    titleEn: 'Antiques & Thai Amulets',
    stream: 'collect',
    streamLabel: 'Collect · 收藏',
    status: '长期收藏',
    statusEn: 'Collecting',
    summary: '古董与泰国佛牌——收藏时间与手艺的档案。',
    summaryEn: 'Antiques and Thai amulets — an archive of time and craft.',
    hero: '/images/works/collection-hero.jpg',
    overview: [
      '收藏是我理解时间的方式。古董承载手艺与年代，泰国佛牌承载信仰与祝福——每一件都是一段被凝固的时间。',
      '我不追热点，只收让我愿意长久注视的物件。',
    ],
    overviewEn: [
      'Collecting is how I understand time. Antiques carry craft and eras; Thai amulets carry faith and blessing — each piece is time, solidified.',
      'I do not chase trends. I only keep the objects I am willing to gaze at for a very long time.',
    ],
    gallery: [
      { src: '/images/works/collection-1.jpg', caption: '收藏 · 古董' },
      { src: '/images/works/collection-2.jpg', caption: '收藏 · 木器' },
      { src: '/images/works/collection-3.jpg', caption: '收藏 · 佛牌' },
    ],
    quote: '收藏的不是物件，是时间与手艺。',
  },
  {
    slug: 'short-form',
    title: '短篇与随笔',
    titleEn: 'Short Form',
    stream: 'write',
    streamLabel: 'Write · 写作',
    status: '持续写作',
    statusEn: 'Ongoing',
    summary: '短篇、随笔与创作手记——长篇之外的呼吸练习。',
    summaryEn: 'Short pieces, essays and notes — breathing exercises between the long runs.',
    hero: '/images/works/shortform-hero.jpg',
    overview: [
      '长篇是长跑，短篇是呼吸。随笔记录造物与收藏过程中的碎片思考，它们是同一株根上的小枝。',
    ],
    overviewEn: [
      'The novel is a marathon; short form is breathing. Essays record fragments of thought from building and collecting — small branches on the same root.',
    ],
    gallery: [
      { src: '/images/works/shortform-1.jpg', caption: '随笔 · 笔迹' },
      { src: '/images/works/shortform-2.jpg', caption: '随笔 · 手记' },
      { src: '/images/works/shortform-3.jpg', caption: '随笔 · 夜桌' },
    ],
    quote: '长篇是长跑，短篇是呼吸。',
  },
];

/* ————————————————— Navigation ————————————————— */

export const navItems = [
  { to: '/studio', zh: '工作室', en: 'Studio' },
  { to: '/career', zh: '履历', en: 'Career' },
  { to: '/works', zh: '作品', en: 'Works' },
  { to: '/about', zh: '关于', en: 'About' },
  { to: '/contact', zh: '联系', en: 'Contact' },
];

export const footerNav = [
  { to: '/studio', zh: '工作室' },
  { to: '/career', zh: '履历' },
  { to: '/works', zh: '作品' },
  { to: '/books', zh: '书籍' },
  { to: '/app', zh: 'App' },
  { to: '/about', zh: '关于' },
  { to: '/contact', zh: '联系' },
];

/* ————————————————— Home: index & manifesto ————————————————— */

export const indexItems = [
  {
    to: '/studio',
    num: '01',
    en: 'Studio',
    zh: '工作室',
    desc: 'FreeFrame Studio · 制作与内容协作',
  },
  { to: '/career', num: '02', en: 'Career', zh: '履历', desc: '建造、写作、制作与收藏的四条线' },
  { to: '/works', num: '03', en: 'Works', zh: '作品', desc: '写作与造物，两条河流' },
  { to: '/about', num: '04', en: 'About', zh: '关于', desc: '郑超 · 造物、旧物与其他执念' },
];

export const manifestoLines = [
  'I build digital products.',
  'I write long-form fiction.',
  'I produce through FreeFrame Studio.',
  'I collect antiques & Thai amulets.',
];

export const manifestoZh =
  '造物、写作、制作与收藏——这些彼此不同的执念，共同构成了我。身份不是一张清单，而是一座正在生长的园子。';

/* ————————————————— Studio ————————————————— */

export const studioCapabilities = [
  {
    num: '01',
    en: 'Production',
    zh: '内容制作',
    desc: '从概念到成片的内容生产与项目管理。',
  },
  {
    num: '02',
    en: 'Location & Shooting',
    zh: '场地与摄制',
    desc: '场地协调、现场制作与摄制执行。',
  },
  {
    num: '03',
    en: 'Collaboration',
    zh: 'KOL 协作',
    desc: '创作者与品牌之间的匹配与协作。',
  },
  {
    num: '04',
    en: 'Brand & Visual',
    zh: '品牌与视觉',
    desc: '品牌叙事、视觉系统与内容策略。',
  },
];

export const studioRail = [
  { src: '/images/studio-rail-1.jpg', caption: '现场 · On Set' },
  { src: '/images/studio-rail-2.jpg', caption: '镜头 · Glass' },
  { src: '/images/studio-rail-3.jpg', caption: '工作室 · Studio' },
  { src: '/images/studio-rail-4.jpg', caption: '布光 · Light' },
  { src: '/images/studio-rail-5.jpg', caption: '调色 · Grade' },
];

/* ————————————————— Career ————————————————— */

export const careerPhases = [
  {
    key: 'build',
    en: 'Build',
    zh: '造物',
    years: '长期 · Ongoing',
    desc: '数字产品、界面与工程实现。从概念、原型到落地，把想法变成可用的东西。',
    link: { to: '/work/app-concept', label: 'App 概念' },
  },
  {
    key: 'write',
    en: 'Write',
    zh: '写作',
    years: '进行中 · In Progress',
    desc: '长篇小说与短篇随笔。以年为单位的长跑，以页为单位的呼吸。',
    link: { to: '/books', label: '长篇书籍' },
  },
  {
    key: 'produce',
    en: 'Produce',
    zh: '制作',
    years: '长期 · Ongoing',
    desc: 'FreeFrame Studio。以工作室为单位的内容制作与协作。',
    link: { to: '/work/freeframe-studio', label: 'FreeFrame Studio' },
  },
  {
    key: 'collect',
    en: 'Collect',
    zh: '收藏',
    years: '长期 · Ongoing',
    desc: '古董与泰国佛牌。收藏物件，也收藏时间与手艺。',
    link: { to: '/about', label: '关于收藏' },
  },
];

/* ————————————————— Books ————————————————— */

export const books = [
  {
    title: '第一部长篇小说',
    titleEn: 'The First Novel',
    status: '创作中 · In Progress',
    featured: true,
    to: '/work/first-novel',
    desc: '一部以时间与执念为主题的长篇小说。它不追赶进度，一页一页地写——像收藏一件旧物，不急，但从不停止。',
    cover: '/images/books-1.jpg',
  },
  {
    title: '短篇与随笔集',
    titleEn: 'Short Form & Essays',
    status: '持续写作 · Ongoing',
    featured: false,
    to: '/work/short-form',
    desc: '短篇、随笔与创作手记——长篇之外的呼吸练习。',
    cover: '/images/books-2.jpg',
  },
  {
    title: '第二部长篇',
    titleEn: 'The Second Novel',
    status: '构想中 · Concepting',
    featured: false,
    to: null,
    desc: '仍在构想中——一颗已经埋进土里的种子。',
    cover: '/images/books-3.jpg',
  },
];

/* ————————————————— App ————————————————— */

export const appExhibits = [
  {
    src: '/images/works/app-1.jpg',
    caption: '概念界面 · 阅读',
    desc: '为长文字设计的安静阅读器概念。',
  },
  {
    src: '/images/works/app-2.jpg',
    caption: '概念界面 · 档案',
    desc: '收藏与旧物的数字化档案概念。',
  },
  {
    src: '/images/works/app-3.jpg',
    caption: '概念界面 · 工具',
    desc: '面向制作流程的轻量工具概念。',
  },
];

export const appNotes = [
  {
    num: '01',
    zh: '阅读优先',
    en: 'Reading First',
    desc: '界面应该退后，让文字站在光里。',
  },
  { num: '02', zh: '工具即秩序', en: 'Tools as Order', desc: '好工具把混乱变成可以呼吸的秩序。' },
  { num: '03', zh: '内容与人', en: 'Content & People', desc: '产品最终服务的，是人的注意力与感受。' },
];

/* ————————————————— About ————————————————— */

export const aboutPortrait = '/images/about-portrait.jpg';

export const aboutBioZh = [
  '我是郑超（Terry Arison）。造物——把想法变成产品与界面；写作——把经验缝进故事；制作——通过 FreeFrame Studio 把画面变成作品；收藏——通过古董与泰国佛牌，把时间留在身边。',
  'All of this is me. None of it is all of me. 这些身份彼此不同，却共享同一种执念：对「长久之物」的偏爱。',
];

export const aboutBioEn = [
  'I am Zheng Chao (Terry Arison). I build — turning ideas into products and interfaces; I write — stitching experience into stories; I produce — turning imagery into work through FreeFrame Studio; I collect — keeping time close, through antiques and Thai amulets.',
  'All of this is me. None of it is all of me. These identities differ, yet share one obsession: a preference for things that last.',
];

export const identityMarquee =
  '郑超 ZHENG CHAO · BUILD 造物 · WRITE 写作 · PRODUCE 制作 · COLLECT 收藏 · TERRY ARISON · 旧物 · 执念 · ';

export const collectionImages = [
  { src: '/images/works/collection-1.jpg', caption: '古董 · 青铜' },
  { src: '/images/works/collection-3.jpg', caption: '泰国佛牌' },
  { src: '/images/works/collection-2.jpg', caption: '木器' },
];

export const nowItems = [
  { label: '第一部长篇小说', status: '创作中', dot: 'petal' },
  { label: 'App 概念与原型', status: '迭代中', dot: 'ice' },
  { label: 'FreeFrame Studio', status: '项目进行中', dot: 'gold' },
  { label: '收藏档案整理', status: '持续进行', dot: 'mist' },
];

/* ————————————————— Contact ————————————————— */

export const contact = {
  email: 'hello@freeframe.studio',
  wechat: 'zhengchao-studio',
  line: 'zhengchao-studio',
  location: '中国 · 远程协作',
  locationEn: 'China · Remote',
  collabNote:
    'FreeFrame Studio 长期接受内容制作、场地摄制与品牌协作的洽谈。来信请简要说明来意，期待与你共事。',
};

/* ————————————————— Works streams ————————————————— */

export const streamImages = {
  write: '/images/stream-write.jpg',
  build: '/images/stream-build.jpg',
};
