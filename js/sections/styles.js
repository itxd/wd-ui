/* 04 UI 风格：27 种风格，每种一个实时渲染的样本 + 特征说明 */
(function () {
  const I = Atlas.icon;

  const styles = [
    {
      id: 'flat', zh: '扁平化', en: 'Flat Design', era: '2012 –', tags: 'classic',
      feats: ['纯色块，无渐变、无纹理', '去掉阴影和高光', '简单几何图标'], css: ['background: #3498db', 'box-shadow: none'],
      fit: '工具类产品、信息图、早期移动端', ref: 'Windows Metro、iOS 7、Google 早期',
      demo: `<div class="f-tiles">${[['mail', '#3498db', '邮件'], ['calendar', '#2ecc71', '日历'], ['music', '#e74c3c', '音乐'], ['image', '#f39c12', '相册'], ['chart', '#9b59b6', '报表'], ['settings', '#34495e', '设置']].map(([ic, c, t]) => `<span style="--c:${c}">${I(ic, 22)}<b>${t}</b></span>`).join('')}</div><button class="f-btn" type="button">开始使用</button>`,
    },
    {
      id: 'skeuo', zh: '拟物化', en: 'Skeuomorphism', era: '2007 – 2013', tags: 'classic texture',
      feats: ['模仿真实材质：皮革、金属、木纹', '高光、投影、缝线细节', '控件像实物一样可“拧”可“按”'], css: ['repeating-linear-gradient', 'inset box-shadow'],
      fit: '音乐、相机、乐器、游戏道具', ref: 'iOS 6、早期 Mac、GarageBand',
      demo: `<div class="sk-panel"><div class="sk-knob"><i></i></div><div class="sk-meter"><i></i></div><button class="sk-rec" type="button">● REC</button></div><span class="sk-label">VINTAGE · 1979</span>`,
    },
    {
      id: 'neu', zh: '新拟态', en: 'Neumorphism', era: '2019 –', tags: 'texture trend',
      feats: ['元素与背景同色', '一亮一暗双阴影，像从表面“挤”出来', '按下时变为内凹'], css: ['box-shadow: 8px 8px 16px #a3b1c6, -8px -8px 16px #fff', 'inset'],
      fit: '智能家居、计算器、音乐播放器（对比度低，慎用于重要信息）', ref: 'Dribbble 概念稿、部分 IoT 面板',
      demo: `<div class="neu-knob"><div><b>22°</b><small>室温</small></div></div><div class="neu-col"><button class="neu-btn" type="button">${I('play', 18)}</button><button class="neu-btn pressed" type="button">${I('heart', 18)}</button><div class="neu-slider"><i></i></div></div>`,
    },
    {
      id: 'glass', zh: '玻璃拟态', en: 'Glassmorphism', era: '2020 –', tags: 'texture trend',
      feats: ['半透明磨砂层叠在多彩背景上', '细白边勾勒玻璃边缘', '层次感强、通透'], css: ['backdrop-filter: blur(16px)', 'background: rgba(255,255,255,.18)'],
      fit: '金融卡片、天气、音乐、系统浮层', ref: 'macOS Big Sur、Windows 11、visionOS',
      demo: `<i class="gl-blob b1"></i><i class="gl-blob b2"></i><i class="gl-blob b3"></i><div class="gl-card"><div class="row"><b>NOVA</b><span class="spacer"></span><span class="gl-chip"></span></div><div class="gl-num">6214 •••• •••• 0928</div><div class="row"><small>持卡人<b>LIN XIAOMAN</b></small><span class="spacer"></span><small>有效期<b>08/29</b></small></div></div><div class="gl-widget">${I('sun', 18)}<b>26°</b><small>杭州 · 晴</small></div>`,
    },
    {
      id: 'clay', zh: '粘土拟态', en: 'Claymorphism', era: '2021 –', tags: 'texture trend',
      feats: ['圆润膨胀，像橡皮泥', '外投影 + 内高光 + 内阴影', '糖果色、大圆角'], css: ['border-radius: 32px', 'inset -8px -8px 16px rgba(0,0,0,.1)'],
      fit: '儿童教育、游戏化、轻社交、3D 图标', ref: 'Duolingo 风格插画、Web3 头像',
      demo: `<div class="clay-card"><span class="clay-ic">${I('star', 22, 'fill')}</span><b>每日打卡</b><small>已连续 12 天</small></div><div class="clay-col"><button class="clay-btn" type="button">开始</button><span class="clay-pill">+20 积分</span><span class="clay-ball"></span></div>`,
    },
    {
      id: 'brutal', zh: '新野兽派', en: 'Neo-Brutalism', era: '2021 –', tags: 'trend retro',
      feats: ['粗黑描边 + 实心硬阴影', '高饱和撞色、粗体大字', '刻意“不精致”，个性强'], css: ['border: 3px solid #000', 'box-shadow: 6px 6px 0 #000'],
      fit: '创意品牌、独立产品、年轻化营销', ref: 'Gumroad、Figma 社区、Notion 早期营销',
      demo: `<div class="br-card"><span class="br-tag">NEW!</span><h4>做点<br>大胆的东西</h4><button class="br-btn" type="button">立即开始 →</button></div><div class="br-sticker">★ 100% 原创</div>`,
    },
    {
      id: 'min', zh: '极简主义', en: 'Minimalism', era: '长青', tags: 'classic',
      feats: ['大量留白，元素极少', '黑白灰 + 至多一个强调色', '靠字体与排版建立层级'], css: ['font-weight: 300', 'letter-spacing: -.02em'],
      fit: '高端品牌、作品集、奢侈品、设计工作室', ref: 'Apple、Muji、Aesop',
      demo: `<small>No. 07 — 极简</small><h4>少，即是多。</h4><p>Less, but better.</p><a href="javascript:void(0)">了解更多 →</a>`,
    },
    {
      id: 'swiss', zh: '瑞士国际主义', en: 'Swiss Style', era: '1950s –', tags: 'classic retro',
      feats: ['严格网格、左对齐', '无衬线大字（Helvetica）', '红黑白、客观理性'], css: ['font-family: Helvetica', 'display: grid'],
      fit: '海报、展览、出版、建筑事务所', ref: 'Müller-Brockmann、Vignelli 地铁导视',
      demo: `<div class="sw-num">07</div><div class="sw-red"></div><div class="sw-text"><b>Grid<br>System</b><p>网格 · 秩序 · 客观<br>Helvetica, 1957</p></div><div class="sw-line"></div>`,
    },
    {
      id: 'bento', zh: '便当盒布局', en: 'Bento Grid', era: '2022 –', tags: 'trend',
      feats: ['大小不一的圆角格子拼成整体', '每格讲一个卖点', '信息密度高但整齐'], css: ['grid-template-areas', 'border-radius: 20px'],
      fit: '产品功能介绍、个人主页、发布会页面', ref: 'Apple 发布会、Linear、Vercel',
      demo: `<div class="bt a"><small>芯片</small><b>A19 Pro</b></div><div class="bt b"><b>48MP</b><small>主摄</small></div><div class="bt c">${I('zap', 20)}<small>快充</small></div><div class="bt d"><b>钛金属</b></div><div class="bt e">${I('camera', 22)}</div>`,
    },
    {
      id: 'darktech', zh: '暗黑科技', en: 'Dark Tech / Linear', era: '2020 –', tags: 'trend tech',
      feats: ['近黑背景 + 1px 低对比描边', '渐变光晕、网格线、等宽字', '克制、精密、开发者气质'], css: ['background: #08090a', 'conic-gradient 流光边框'],
      fit: '开发者工具、AI 产品、SaaS 官网', ref: 'Linear、Vercel、Raycast、Supabase',
      demo: `<div class="dk-grid"></div><div class="dk-card"><div class="row"><span class="dk-dot"></span><small class="mono">deploy · production</small></div><b>Ship faster.</b><small>构建完成，用时 <span class="mono">12.4s</span></small><div class="dk-bar"><i></i></div></div><button class="dk-btn" type="button">${I('cmd', 13)} K 打开命令</button>`,
    },
    {
      id: 'cyber', zh: '赛博朋克', en: 'Cyberpunk', era: '2018 –', tags: 'trend tech',
      feats: ['霓虹粉 + 电光青，深色底', '故障字效、扫描线、切角', '高科技低生活的反乌托邦感'], css: ['clip-path: polygon()', 'text-shadow 偏移'],
      fit: '游戏、电竞、潮牌、音乐节', ref: '赛博朋克 2077、Valorant',
      demo: `<div class="cy-title" data-text="NEON//CITY">NEON//CITY</div><div class="cy-sub">系统入侵进度 87%</div><div class="cy-bar"><i></i></div><button class="cy-btn" type="button">接入 &gt;&gt;</button>`,
    },
    {
      id: 'm3', zh: 'Material Design 3', en: 'Material You', era: '2021 –', tags: 'classic',
      feats: ['从壁纸提取动态色调', '色调表面代替阴影', '大圆角、胶囊、FAB、波纹'], css: ['tonal palette', 'border-radius: 16px'],
      fit: 'Android 应用、Google 生态产品', ref: 'Android 12+、Google Workspace',
      demo: `<div class="m3-card"><div class="m3-head"><span class="m3-av">A</span><div><b>Material You</b><small>动态取色 · Tonal</small></div></div><div class="m3-chips"><span class="on">${I('check', 13)}日程</span><span>提醒</span><span>待办</span></div><div class="m3-acts"><span>取消</span><span class="m3-filled">保存</span></div></div><button class="m3-fab ripple" type="button">${I('edit', 20)}</button>`,
    },
    {
      id: 'ios', zh: 'Apple 平台风格', en: 'Apple HIG', era: '2013 –', tags: 'classic',
      feats: ['分组列表、系统色、SF 字体', '毛玻璃导航栏、圆角矩形', '内容优先，控件克制'], css: ['background: #f2f2f7', '-apple-system'],
      fit: 'iOS / macOS 应用、苹果生态工具', ref: 'iOS 设置、Apple Music、Things',
      demo: `<div class="ios-g"><div class="ios-c"><span style="--c:#ff9500">${I('plane', 14)}</span>飞行模式<label class="switch switch-ios"><input type="checkbox"><span class="switch-track"></span></label></div><div class="ios-c"><span style="--c:#007aff">${I('wifi', 14)}</span>无线局域网<em>Home-5G</em>${I('chevR', 14)}</div><div class="ios-c"><span style="--c:#34c759">${I('call', 14)}</span>蜂窝网络<em></em>${I('chevR', 14)}</div><div class="ios-c"><span style="--c:#ff3b30">${I('bell', 14)}</span>通知<em></em>${I('chevR', 14)}</div></div>`,
    },
    {
      id: 'fluent', zh: 'Fluent 设计', en: 'Microsoft Fluent', era: '2017 –', tags: 'classic texture',
      feats: ['亚克力 / 云母半透明材质', '光照：鼠标经过时边缘发光', '深度、动效、比例五要素'], css: ['backdrop-filter', 'radial-gradient 跟随鼠标'],
      fit: 'Windows 应用、Office、企业桌面软件', ref: 'Windows 11、Microsoft Teams',
      demo: `<div class="fl-win"><div class="fl-bar"><span>设置</span><span class="fl-ctrls">─ ▢ ✕</span></div><div class="fl-body"><div class="fl-nav"><span class="on">系统</span><span>蓝牙和设备</span><span>个性化</span><span>应用</span></div><div class="fl-tiles">${[['monitor', '显示'], ['volume', '声音'], ['bell', '通知'], ['zap', '电源']].map(([ic, t]) => `<div class="fl-tile spot">${I(ic, 16)}<span>${t}</span></div>`).join('')}</div></div></div>`,
    },
    {
      id: 'memphis', zh: '孟菲斯', en: 'Memphis', era: '1980s / 复兴', tags: 'retro',
      feats: ['几何图形、波浪线、圆点', '高饱和撞色、黑色描边', '俏皮、反规则'], css: ['radial-gradient 圆点', 'clip-path 三角'],
      fit: '潮流活动、儿童、文创、节日营销', ref: 'Ettore Sottsass、潮牌联名海报',
      demo: `<i class="mp-circle"></i><i class="mp-tri"></i><i class="mp-squiggle"></i><i class="mp-dots"></i><i class="mp-zig"></i><i class="mp-half"></i><h4>POP<br>FUN!</h4>`,
    },
    {
      id: 'y2k', zh: '千禧 Y2K', en: 'Y2K Aesthetic', era: '2000s / 复兴', tags: 'retro trend',
      feats: ['镀铬金属字、全息镭射', '星星、气泡、科幻曲线', '亮粉、电蓝、银色'], css: ['linear-gradient 金属', 'text-stroke'],
      fit: '潮牌、音乐、Z 世代社交', ref: '复古潮牌、K-pop 专辑设计',
      demo: `<span class="y2-star s1">✦</span><span class="y2-star s2">✧</span><span class="y2-star s3">✦</span><h4 class="y2-chrome">Y2K</h4><div class="y2-pill">★ CYBER BABE ★</div><div class="y2-bubble"></div>`,
    },
    {
      id: 'pixel', zh: '像素复古', en: 'Pixel / 8-bit', era: '1980s / 复兴', tags: 'retro',
      feats: ['像素化边框与字体', '有限色板、硬边无抗锯齿', '游戏对话框、血条'], css: ['image-rendering: pixelated', 'box-shadow 阶梯边框'],
      fit: '独立游戏、活动 H5、彩蛋页面', ref: '任天堂 FC、Stardew Valley',
      demo: `<div class="px-hud"><span>HP</span><div class="px-hp"><i></i></div><span>LV 07</span></div><div class="px-box"><p>勇者，你找到了<b>传说之剑</b>！</p><span class="px-arrow">▼</span></div><div class="px-btns"><span>▶ 装备</span><span>　丢弃</span></div>`,
    },
    {
      id: 'aurora', zh: '极光渐变', en: 'Aurora Gradient', era: '2022 –', tags: 'trend texture',
      feats: ['大面积模糊色团缓慢流动', '深色底 + 发光色彩', '常见于 AI 产品首屏'], css: ['filter: blur(40px)', '@keyframes 漂移'],
      fit: 'AI 产品、Web3、科技发布会', ref: 'Stripe、OpenAI 活动页、Arc',
      demo: `<i></i><i></i><i></i><div class="au-txt"><small>Introducing</small><h4>Aurora AI</h4><button type="button">免费试用</button></div>`,
    },
    {
      id: 'guochao', zh: '国潮 / 新中式', en: 'Chinese Chic', era: '2018 –', tags: 'local',
      feats: ['朱红、金、黛青等传统色', '竖排文字、印章、祥云纹', '宋体 / 书法字'], css: ['writing-mode: vertical-rl', 'font-family: Songti SC'],
      fit: '文化品牌、节日活动、茶饮、文旅', ref: '故宫文创、李宁、茶颜悦色',
      demo: `<div class="gc-cloud"></div><div class="gc-poem">山水有相逢</div><div class="gc-main"><h4>国潮</h4><p>东方美学 · 新中式</p></div><span class="gc-seal">雅集</span>`,
    },
    {
      id: 'hand', zh: '手绘涂鸦', en: 'Hand-drawn', era: '长青', tags: 'retro',
      feats: ['不规则边框，像手画的', '马克笔高亮、涂鸦箭头', '亲切、轻松、有温度'], css: ['border-radius: 255px 15px 225px 15px / 15px 225px 15px 255px'],
      fit: '笔记、教育、生活方式、儿童', ref: 'Excalidraw、Notion 插画',
      demo: `<h4>今天也要<span class="hd-mark">好好吃饭</span></h4><div class="hd-card"><b>✎ 待办</b><ul><li class="done">买菜</li><li>做一份沙拉</li><li>早点睡觉</li></ul></div><button class="hd-btn" type="button">开始吧!</button>`,
    },
    {
      id: 'editorial', zh: '杂志编辑', en: 'Editorial', era: '长青', tags: 'classic',
      feats: ['衬线大标题 + 首字下沉', '多栏排版、细分隔线', '像在读一本杂志'], css: ['font-family: serif', 'column-count: 2', '::first-letter'],
      fit: '媒体、博客、品牌故事、长文', ref: 'The New York Times、Kinfolk',
      demo: `<div class="ed-top"><span>Vol. 26</span><span>October 2026</span></div><h4>The Quiet <em>Revolution</em></h4><div class="ed-cols"><p><span class="ed-drop">设</span>计的价值往往藏在看不见的地方：一致的间距、克制的颜色、恰到好处的停顿。</p><p>好的排版让读者忘记排版本身，只记得内容。</p></div>`,
    },
    {
      id: 'terminal', zh: '终端 / 代码风', en: 'Terminal', era: '长青', tags: 'tech retro',
      feats: ['黑底等宽字、绿色或琥珀色', '命令提示符、闪烁光标', '极客、黑客感'], css: ['font-family: monospace', 'animation: blink'],
      fit: '开发者产品、CLI 官网、黑客松', ref: 'Warp、GitHub CLI、Hacker News',
      demo: `<div class="tm-bar"><i></i><i></i><i></i><span>zsh — 80×24</span></div><pre><span class="tm-p">~/atlas</span> <span class="tm-g">$</span> npm run build
<span class="tm-d">  ✓ 27 styles compiled</span>
<span class="tm-d">  ✓ 120 components ready</span>
<span class="tm-y">  ⚡ done in 1.84s</span>
<span class="tm-p">~/atlas</span> <span class="tm-g">$</span> <span class="tm-cursor"></span></pre>`,
    },
    {
      id: 'iso', zh: '等距 3D', en: 'Isometric 3D', era: '2016 –', tags: 'texture',
      feats: ['30° 等距视角展示层级', '立体堆叠、悬停分层', '适合讲架构与流程'], css: ['transform: rotateX(55deg) rotateZ(-45deg)', 'transform-style: preserve-3d'],
      fit: '架构图、SaaS 功能介绍、插画', ref: 'Stripe 插画、云服务商官网',
      demo: `<div class="iso-stage"><div class="iso-layer l1"><span>数据层</span></div><div class="iso-layer l2"><span>服务层</span></div><div class="iso-layer l3"><span>界面层</span></div></div><small class="iso-tip">悬停展开</small>`,
    },
    {
      id: 'hud', zh: '科幻 HUD', en: 'Sci-fi HUD', era: '2015 –', tags: 'tech local',
      feats: ['青色细线、角标、六边形', '环形仪表、扫描线', '指挥中心、大屏常用'], css: ['border-image', 'conic-gradient 雷达'],
      fit: '数据大屏、安防、军工、汽车 HMI', ref: '钢铁侠贾维斯、智慧城市大屏',
      demo: `<div class="hud-ring"><div class="hud-sweep"></div><b>87</b><small>SYNC %</small></div><div class="hud-data"><div><small>LAT</small><b>30.27°N</b></div><div><small>LNG</small><b>120.15°E</b></div><div><small>ALT</small><b>1,204 m</b></div></div><i class="hud-c tl"></i><i class="hud-c tr"></i><i class="hud-c bl"></i><i class="hud-c br"></i>`,
    },
    {
      id: 'lux', zh: '轻奢', en: 'Luxury', era: '长青', tags: 'texture classic',
      feats: ['黑 / 深绿 + 金色细线', '衬线字体、大写字距', '少即是贵'], css: ['letter-spacing: .3em', 'color: #c9a227'],
      fit: '珠宝、腕表、酒店、高端地产', ref: 'Cartier、Rolex、安缦',
      demo: `<small>MAISON · 1926</small><h4>Le Temps</h4><div class="lux-line"></div><p>限量 99 枚 · 18K 玫瑰金</p><button type="button">预约品鉴</button>`,
    },
    {
      id: 'blueprint', zh: '蓝图 / 线框', en: 'Blueprint', era: '长青', tags: 'retro tech',
      feats: ['蓝底白线、网格纸', '尺寸标注、编号', '工程感、过程感'], css: ['background-image: linear-gradient 网格', 'border: 1px dashed'],
      fit: '设计系统文档、工程类品牌、发布过程展示', ref: 'Figma 设计规范、建筑事务所',
      demo: `<div class="bp-box"><span class="bp-dim w">320</span><span class="bp-dim h">180</span><b>BUTTON</b><i class="bp-pad"></i></div><small>FIG. 01 — 组件结构图</small>`,
    },
    {
      id: 'bauhaus', zh: '包豪斯', en: 'Bauhaus', era: '1919 / 复兴', tags: 'retro',
      feats: ['圆、方、三角基本形', '红黄蓝三原色 + 黑', '功能决定形式'], css: ['clip-path', 'border-radius: 50%'],
      fit: '艺术展、品牌视觉、海报', ref: '包豪斯学院、Kandinsky',
      demo: `<i class="bh-c"></i><i class="bh-s"></i><i class="bh-t"></i><i class="bh-bar"></i><h4>bauhaus</h4>`,
    },
  ];
  Atlas.styles = styles;

  const filters = [['all', '全部'], ['classic', '经典'], ['texture', '质感'], ['trend', '潮流'], ['retro', '复古 / 艺术'], ['tech', '科技'], ['local', '本土']];

  Atlas.mount('styles', `
    <div class="wrap">
      ${Atlas.head({
        no: '02 / UI 风格',
        title: `${styles.length} 种 UI 风格`,
        en: 'Visual Styles',
        desc: '风格决定界面的“质感”和“时代感”。下面每张卡片的上半部分都是用 CSS 实时渲染的样本，不是图片；下半部分写明它的特征、关键实现方式、适用场景和代表产品。',
        chips: ['扁平', '拟物', '玻璃', '新拟态', '新野兽派', '便当盒', '暗黑科技', '国潮'],
      })}
      <div class="style-filter rv" id="styleFilter">
        ${filters.map(([k, t], i) => `<button type="button" class="${i === 0 ? 'on' : ''}" data-act="styleFilter" data-k="${k}">${t}<small>${k === 'all' ? styles.length : styles.filter((s) => s.tags.split(' ').includes(k)).length}</small></button>`).join('')}
      </div>
      <div class="style-grid" id="styleGrid">
        ${styles.map((s) => `
          <article class="style-card rv" id="st-${s.id}" data-tags="${s.tags}" data-zh="${s.zh}" data-en="${s.en}" data-cat="UI 风格">
            <div class="style-demo sd-${s.id}">${s.demo}</div>
            <div class="style-meta">
              <div class="style-name"><b>${s.zh}</b><em>${s.en}</em><span>${s.era}</span>${Atlas.promptBtn('style', '', '风格提示词')}</div>
              <ul>${s.feats.map((f) => `<li>${f}</li>`).join('')}</ul>
              <div class="row-wrap">${s.css.map((c) => `<code class="code-chip">${c}</code>`).join('')}</div>
              <dl><dt>适用</dt><dd>${s.fit}</dd><dt>代表</dt><dd>${s.ref}</dd></dl>
            </div>
          </article>`).join('')}
      </div>
    </div>`);

  Atlas.acts.styleFilter = (el) => {
    Atlas.acts.pick(el);
    document.querySelectorAll('#styleGrid .style-card').forEach((c) => {
      c.classList.toggle('is-hidden', el.dataset.k !== 'all' && !c.dataset.tags.split(' ').includes(el.dataset.k));
      c.classList.add('in');
    });
  };
})();
