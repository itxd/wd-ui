/* Web 应用示例（一）：浏览器外框、落地页、SaaS 工作台 */
(function () {
  const I = Atlas.icon;

  /* 浏览器外框，供本文件与 platform-web-more.js 共用 */
  Atlas.browser = (url, inner, cls = '') => `
    <div class="browser ${cls}" data-ui="浏览器窗口 · Browser Frame">
      <div class="browser-bar">
        <span class="browser-dots"><i></i><i></i><i></i></span>
        <span class="browser-nav">${I('chevL', 14)}${I('chevR', 14)}${I('refresh', 13)}</span>
        <div class="browser-url">${I('lock', 11)}<span>${url}</span></div>
        <span class="browser-act">${I('share', 13)}${I('plus', 14)}</span>
      </div>
      <div class="browser-body">${inner}</div>
    </div>`;

  /* ---------- 落地页 Landing ---------- */
  const megaItems = [
    ['kanban', '项目管理', '看板、甘特图与迭代计划'],
    ['fileText', '协作文档', '多人实时编辑，支持评论'],
    ['bot', 'AI 助手', '自动生成纪要与周报'],
    ['chart', '数据看板', '把进度变成可视化报表'],
  ];
  const tiers = [
    { name: '免费版', desc: '适合个人和小团队起步', m: 0, y: 0, cta: '免费开始', feats: ['最多 5 名成员', '无限任务与文档', '7 天历史版本', '社区支持'] },
    { name: '专业版', desc: '适合成长中的团队', m: 39, y: 31, cta: '开始 14 天试用', hot: true, feats: ['不限成员数量', 'AI 助手 500 次/月', '高级权限与访客', '无限历史版本', '优先客服支持'] },
    { name: '企业版', desc: '适合对安全有要求的组织', m: null, cta: '联系销售', feats: ['单点登录 SSO', '审计日志', '私有化部署', '专属客户成功经理'] },
  ];
  const faqs = [
    ['可以随时取消订阅吗？', '可以。取消后当前计费周期结束前仍可使用全部功能，之后自动降级为免费版，数据不会丢失。'],
    ['支持哪些付款方式？', '支持支付宝、微信支付、对公转账和国际信用卡，企业版支持按年开具增值税专用发票。'],
    ['数据存储在哪里？', '默认存储在国内的云服务区域，企业版可选择私有化部署到自有机房。'],
    ['如何从其他工具迁移？', '提供 Trello、Notion、飞书文档的一键导入，也可以联系我们获取免费迁移服务。'],
  ];

  const landing = `
    <div class="lp">
      <div class="lp-announce" data-ui="公告条 · Announcement Bar">${I('sparkle', 13)}<span>Lumen 3.0 发布：AI 自动整理会议纪要</span><a href="javascript:void(0)">了解更多 ${I('arrowR', 12)}</a></div>
      <header class="lp-nav" data-ui="导航栏 · Navbar">
        <div class="lp-logo" data-ui="品牌标识 · Logo"><span class="lp-logo-mark"></span>Lumen</div>
        <nav class="lp-links">
          <div class="lp-has-mega" tabindex="0">产品 ${I('chevD', 12)}
            <div class="lp-mega" data-ui="超级菜单 · Mega Menu">
              <div class="lp-mega-grid">
                ${megaItems.map(([ic, t, d]) => `<a href="javascript:void(0)" class="lp-mega-item"><span>${I(ic, 16)}</span><div><b>${t}</b><small>${d}</small></div></a>`).join('')}
              </div>
              <div class="lp-mega-feature"><span class="tag tag-primary tag-round">新功能</span><b>AI 周报</b><small>每周五自动汇总团队进展</small></div>
            </div>
          </div>
          <a href="javascript:void(0)">解决方案</a><a href="javascript:void(0)">定价</a><a href="javascript:void(0)">客户案例</a><a href="javascript:void(0)">文档</a>
        </nav>
        <div class="row"><a class="btn btn-ghost btn-sm" href="javascript:void(0)">登录</a><a class="btn btn-dark btn-sm btn-pill" href="javascript:void(0)">免费试用</a></div>
      </header>

      <section class="lp-hero" data-ui="首屏 · Hero Section">
        <span class="lp-pill" data-ui="胶囊徽章 · Pill Badge"><b>新</b>AI 助手已上线，免费体验 ${I('arrowR', 12)}</span>
        <h1>让团队协作<br><span class="lp-grad">快十倍</span></h1>
        <p class="lp-lead">任务、文档、会议和数据都在一个工作区。Lumen 自动整理信息，团队只需专注真正重要的事。</p>
        <div class="lp-cta" data-ui="行动按钮 · CTA Buttons">
          <a class="btn btn-primary btn-lg btn-pill" href="javascript:void(0)">免费开始 ${I('arrowR', 16)}</a>
          <a class="btn btn-lg btn-pill" href="javascript:void(0)">${I('play', 14)}观看演示 · 2:30</a>
        </div>
        <div class="lp-trust" data-ui="社会证明 · Social Proof">
          <div class="avatar-group">${['av1', 'av2', 'av3', 'av4', 'av5'].map((a, i) => `<span class="avatar avatar-sm ${a}">${'林周陈苏韩'[i]}</span>`).join('')}</div>
          <span><b class="lp-stars">★★★★★</b> 4.9 分 · 来自 2,000+ 团队的评价</span>
        </div>
        <div class="lp-shot" data-ui="产品截图 · Product Shot">
          <div class="lp-shot-glow"></div>
          <div class="lp-shot-win">
            <div class="lp-shot-side"><i></i><i></i><i></i><i></i><i></i></div>
            <div class="lp-shot-main">
              <div class="lp-shot-bar"><i></i><i></i></div>
              <div class="lp-shot-cols">${[3, 2, 4, 2].map((n, c) => `<div>${Array.from({ length: n }, (_, k) => `<span style="--h:${28 + ((c + k) % 3) * 12}px"></span>`).join('')}</div>`).join('')}</div>
            </div>
          </div>
          <div class="lp-float lp-float-1" data-ui="悬浮卡片 · Floating Card">${I('checkCircle', 16)}<div><b>设计评审已完成</b><small>苏青禾 · 刚刚</small></div></div>
          <div class="lp-float lp-float-2">${I('trendUp', 16)}<div><b>交付效率 +38%</b><small>对比上季度</small></div></div>
        </div>
      </section>

      <section class="lp-logos" data-ui="客户墙 · Logo Cloud">
        <p>超过 10,000 支团队正在使用 Lumen</p>
        <div class="lp-marquee" data-ui="跑马灯 · Marquee"><div class="lp-marquee-track">
          ${[0, 1].map(() => ['Acme', 'Polaris', 'Vertex°', 'Northwind', 'Globex', 'Umbrella', 'Hooli', 'Initech'].map((n) => `<span>${n}</span>`).join('')).join('')}
        </div></div>
      </section>

      <section class="lp-sec">
        <div class="lp-sec-head"><span class="lp-eyebrow">功能</span><h2>一个工作区，替代五个工具</h2><p>从需求到交付的每一步都在这里完成，不再在聊天、文档和表格之间来回切换。</p></div>
        <div class="lp-bento" data-ui="便当格布局 · Bento Grid">
          <div class="lp-cell lp-cell-a">
            <div class="lp-cell-txt"><span class="lp-cell-ic">${I('bot', 18)}</span><h3>AI 会议纪要</h3><p>录音自动转写，提炼决议与待办，并分配给对应成员。</p></div>
            <div class="lp-chat">
              <div class="lp-bubble me">帮我总结今天的评审会</div>
              <div class="lp-bubble ai">${I('sparkle', 12)} 共 3 项决议：<br>① 定价页首屏改为对比式<br>② 周四前完成图标替换<br>③ 下周一灰度发布</div>
            </div>
          </div>
          <div class="lp-cell lp-cell-b">
            <div class="lp-cell-txt"><span class="lp-cell-ic">${I('users', 18)}</span><h3>实时协作</h3><p>多人同时编辑，光标与评论实时可见。</p></div>
            <div class="lp-cursors"><span class="lp-cursor c1">${I('pointer', 14)}<em>苏青禾</em></span><span class="lp-cursor c2">${I('pointer', 14)}<em>陈默</em></span><div class="lp-lines"><i></i><i></i><i class="hl"></i><i></i></div></div>
          </div>
          <div class="lp-cell lp-cell-c">
            <div class="lp-cell-txt"><span class="lp-cell-ic">${I('chart', 18)}</span><h3>进度看板</h3><p>燃尽图、吞吐量一目了然。</p></div>
            <div class="lp-minibars">${Atlas.series(4, 12, 20, 100).map((v) => `<i style="height:${v}%"></i>`).join('')}</div>
          </div>
          <div class="lp-cell lp-cell-d">
            <div class="lp-cell-txt"><span class="lp-cell-ic">${I('layers', 18)}</span><h3>200+ 集成</h3><p>连接你已经在用的工具。</p></div>
            <div class="lp-integrations">${['github', 'mail', 'calendar', 'message', 'cloud', 'database', 'video', 'code'].map((n) => `<span>${I(n, 16)}</span>`).join('')}</div>
          </div>
          <div class="lp-cell lp-cell-e">
            <div class="lp-cell-txt"><span class="lp-cell-ic">${I('shield', 18)}</span><h3>企业级安全</h3><p>SOC 2 · 等保三级 · 端到端加密</p></div>
          </div>
        </div>
      </section>

      <section class="lp-stats" data-ui="数据亮点 · Stats Band">
        ${[['10,000+', '团队在使用'], ['38%', '平均提升交付效率'], ['99.99%', '服务可用性'], ['4.9/5', '用户满意度']].map(([v, t]) => `<div><b class="num">${v}</b><span>${t}</span></div>`).join('')}
      </section>

      <section class="lp-sec">
        <div class="lp-sec-head"><span class="lp-eyebrow">客户评价</span><h2>他们这样说</h2></div>
        <div class="lp-quotes" data-ui="用户评价 · Testimonials">
          ${[['把周会时间从 90 分钟缩短到 30 分钟，AI 纪要是真的好用。', '林小满', '某电商平台 产品总监', 'av1'],
             ['我们把 Jira、Confluence 和飞书文档都迁了过来，团队终于只看一个地方。', '周以安', '某 SaaS 公司 CTO', 'av2'],
             ['看板和数据报表让我不用再挨个问进度，管理成本降了一半。', '陈默', '设计工作室 创始人', 'av3']].map(([q, n, r, a]) => `
            <figure class="lp-quote"><div class="lp-stars">★★★★★</div><blockquote>“${q}”</blockquote><figcaption><span class="avatar ${a}">${n[0]}</span><div><b>${n}</b><small>${r}</small></div></figcaption></figure>`).join('')}
        </div>
      </section>

      <section class="lp-sec" id="lpPricing">
        <div class="lp-sec-head"><span class="lp-eyebrow">定价</span><h2>简单透明的价格</h2>
          <div class="lp-billing" data-ui="计费周期切换 · Billing Toggle">
            <span>月付</span><label class="switch"><input type="checkbox" data-act="lpBilling"><span class="switch-track"></span></label><span>年付 <em class="tag tag-success tag-round">省 20%</em></span>
          </div>
        </div>
        <div class="lp-pricing" data-ui="定价表 · Pricing Table">
          ${tiers.map((t) => `
            <div class="lp-tier${t.hot ? ' hot' : ''}">
              ${t.hot ? '<span class="lp-ribbon" data-ui="角标 · Ribbon">最受欢迎</span>' : ''}
              <h3>${t.name}</h3><p class="muted">${t.desc}</p>
              <div class="lp-price-row">${t.m === null ? '<b class="lp-price">定制</b>' : `<b class="lp-price num" data-m="${t.m}" data-y="${t.y}">¥${t.m}</b><span class="muted">/人/月</span>`}</div>
              <a class="btn ${t.hot ? 'btn-primary' : ''} btn-block btn-lg" href="javascript:void(0)">${t.cta}</a>
              <ul>${t.feats.map((f) => `<li>${I('check', 14)}${f}</li>`).join('')}</ul>
            </div>`).join('')}
        </div>
      </section>

      <section class="lp-sec">
        <div class="lp-sec-head"><span class="lp-eyebrow">FAQ</span><h2>常见问题</h2></div>
        <div class="lp-faq" data-ui="手风琴 · Accordion">
          ${faqs.map(([q, a], i) => `<details${i === 0 ? ' open' : ''}><summary>${q}<span>${I('plus', 16)}</span></summary><p>${a}</p></details>`).join('')}
        </div>
      </section>

      <section class="lp-cta-band" data-ui="行动横幅 · CTA Banner">
        <h2>今天就开始，让协作更轻松</h2>
        <p>14 天免费试用专业版，无需绑定银行卡。</p>
        <form class="lp-subscribe" onsubmit="return false" data-ui="邮箱订阅 · Email Capture">
          <input class="input" type="email" placeholder="输入工作邮箱"><button class="btn btn-lg" type="button" data-act="toast" data-msg="已发送激活邮件，请查收">开始试用</button>
        </form>
      </section>

      <footer class="lp-foot" data-ui="页脚 · Footer">
        <div class="lp-foot-grid">
          <div><div class="lp-logo"><span class="lp-logo-mark"></span>Lumen</div><p class="muted">让每个团队都能高效协作。</p>
            <div class="lp-social">${['github', 'message', 'video', 'mail'].map((n) => `<a href="javascript:void(0)">${I(n, 15)}</a>`).join('')}</div></div>
          ${[['产品', ['功能', '集成', '定价', '更新日志']], ['资源', ['文档', '模板', '博客', '社区']], ['公司', ['关于我们', '招聘', '联系我们']], ['法律', ['隐私政策', '服务条款', '安全']]].map(([h, ls]) => `
            <div><b>${h}</b>${ls.map((l) => `<a href="javascript:void(0)">${l}</a>`).join('')}</div>`).join('')}
        </div>
        <div class="lp-foot-bottom"><span>© 2026 Lumen Inc.</span><span>浙 ICP 备 00000000 号</span><span class="row">${I('globe', 13)} 简体中文</span></div>
      </footer>
    </div>`;

  /* ---------- SaaS 工作台 Workspace ---------- */
  const cols = [
    { name: '待办', en: 'Todo', c: 'var(--muted)', cards: [
      ['LUM-131', '整理竞品定价页截图', ['调研'], 'low', 'av3', '11/02', 0],
      ['LUM-129', '编写 3.0 发布邮件文案', ['市场'], 'mid', 'av2', '11/04', 0],
      ['LUM-127', '统一空状态插画规范', ['设计', '规范'], 'low', 'av4', '11/06', 0],
    ] },
    { name: '进行中', en: 'In Progress', c: 'var(--s1)', cards: [
      ['LUM-128', '重做定价页首屏', ['设计', '官网'], 'high', 'av1', '10/30', 60],
      ['LUM-125', '命令面板支持模糊搜索', ['前端'], 'mid', 'av5', '10/31', 35],
    ] },
    { name: '评审中', en: 'In Review', c: 'var(--s7)', cards: [
      ['LUM-122', '暗色模式色板校准', ['设计', '规范'], 'mid', 'av4', '10/29', 90],
    ] },
    { name: '已完成', en: 'Done', c: 'var(--s3)', cards: [
      ['LUM-118', '图标库迁移到 24 网格', ['设计'], 'low', 'av3', '10/25', 100],
      ['LUM-116', '登录页支持 SSO', ['前端', '安全'], 'high', 'av5', '10/24', 100],
    ] },
  ];
  const prio = { high: ['紧急', 'var(--danger)'], mid: ['中', 'var(--warning)'], low: ['低', 'var(--muted)'] };
  const card = (c, first) => `
    <div class="ws-card" draggable="true"${first ? ' data-ui="任务卡片 · Issue Card（可拖拽）"' : ''}>
      <div class="ws-card-top"><span class="mono">${c[0]}</span><span class="ws-prio" style="--c:${prio[c[3]][1]}"${first ? ' data-ui="优先级 · Priority"' : ''}>${prio[c[3]][0]}</span></div>
      <b>${c[1]}</b>
      <div class="row-wrap">${c[2].map((t) => `<span class="tag">${t}</span>`).join('')}</div>
      <div class="ws-card-foot">
        ${c[6] ? `<div class="ws-mini-prog"><i style="width:${c[6]}%"></i></div><span class="num muted">${c[6]}%</span>` : '<span class="muted">未开始</span>'}
        <span class="spacer"></span><span class="muted row">${I('calendar', 12)}${c[5]}</span><span class="avatar avatar-xs ${c[4]}">${'林周陈苏韩'[+c[4].slice(2) - 1]}</span>
      </div>
    </div>`;

  const workspace = `
    <div class="ws">
      <aside class="ws-side" data-ui="侧边栏 · Sidebar">
        <div class="ws-workspace" data-ui="工作区切换器 · Workspace Switcher"><span class="ws-ws-logo">L</span><b>Lumen 设计组</b>${I('chevD', 14)}</div>
        <button class="ws-search" type="button" data-act="cmdk" data-ui="命令面板入口 · Command Palette Trigger">${I('search', 14)}<span>搜索或跳转</span><span class="kbd">⌘K</span></button>
        <nav class="ws-nav">
          <a href="javascript:void(0)">${I('inbox', 15)}收件箱<span class="ws-count">4</span></a>
          <a href="javascript:void(0)" class="on">${I('target', 15)}我的任务</a>
          <a href="javascript:void(0)">${I('clock', 15)}最近浏览</a>
        </nav>
        <div class="ws-group">团队</div>
        <div class="ws-tree" data-ui="树形导航 · Tree Nav">
          <a href="javascript:void(0)" class="on">${I('chevD', 12)}<i style="--c:var(--s1)"></i>设计组</a>
          <a href="javascript:void(0)" class="ws-leaf on2">${I('kanban', 13)}官网改版</a>
          <a href="javascript:void(0)" class="ws-leaf">${I('layers', 13)}设计系统</a>
          <a href="javascript:void(0)" class="ws-leaf">${I('fileText', 13)}周会纪要</a>
          <a href="javascript:void(0)">${I('chevR', 12)}<i style="--c:var(--s2)"></i>前端组</a>
          <a href="javascript:void(0)">${I('chevR', 12)}<i style="--c:var(--s3)"></i>市场组</a>
        </div>
        <div class="ws-side-foot"><a href="javascript:void(0)">${I('plus', 14)}邀请成员</a><a href="javascript:void(0)">${I('help', 14)}帮助</a></div>
      </aside>
      <div class="ws-main">
        <header class="ws-head">
          <nav class="crumb"><a href="javascript:void(0)">设计组</a><span class="sep">/</span><b>官网改版</b><span class="tag tag-round">${I('star', 11)} 已收藏</span></nav>
          <span class="spacer"></span>
          <div class="avatar-group" data-ui="协作者头像组 · Avatar Group">${['av1', 'av2', 'av3', 'av4'].map((a, i) => `<span class="avatar avatar-sm ${a}">${'林周陈苏'[i]}</span>`).join('')}<span class="avatar avatar-sm ws-more">+5</span></div>
          <button class="btn btn-sm" type="button">${I('share', 13)}分享</button>
          <button class="btn btn-primary btn-sm" type="button" data-act="toast" data-msg="已创建任务 LUM-132">${I('plus', 13)}新建任务</button>
        </header>
        <div class="ws-filters">
          <div class="seg" data-ui="视图切换 · View Switcher"><button class="on" type="button">${I('kanban', 13)}</button><button type="button">${I('list', 13)}</button><button type="button">${I('timeline', 13)}</button></div>
          <div class="ws-chips" data-ui="筛选标签 · Filter Chips">
            <button class="ws-chip on" type="button">全部 <b>8</b></button><button class="ws-chip" type="button">我负责的</button><button class="ws-chip" type="button">紧急</button><button class="ws-chip dashed" type="button">${I('filter', 12)}添加筛选</button>
          </div>
          <span class="spacer"></span><span class="muted ws-hint">${I('grip', 13)}拖动卡片可以改变状态</span>
        </div>
        <div class="ws-board" data-ui="看板 · Kanban Board">
          ${cols.map((col, ci) => `
            <div class="ws-col" data-col="${ci}">
              <div class="ws-col-head"><i style="--c:${col.c}"></i><b>${col.name}</b><span class="ws-col-count num">${col.cards.length}</span><span class="spacer"></span><button class="btn btn-ghost btn-xs btn-icon" type="button" aria-label="添加">${I('plus', 13)}</button></div>
              <div class="ws-col-body">${col.cards.map((c, k) => card(c, ci === 1 && k === 0)).join('')}</div>
            </div>`).join('')}
        </div>
      </div>
    </div>`;

  Atlas.mount('webMock', `
    <div class="web-switch rv">
      ${Atlas.tabs('web', [
        { id: 'web-landing', label: '官网落地页', sub: 'Landing' },
        { id: 'web-ws', label: 'SaaS 工作台', sub: 'Workspace' },
        { id: 'web-shop', label: '电商详情', sub: 'E-commerce' },
        { id: 'web-docs', label: '文档站', sub: 'Docs' },
      ], 'seg web-seg')}
      <span class="muted web-switch-note">${I('info', 13)} 示例在浏览器框内独立滚动</span>
    </div>
    ${Atlas.panel('web', 'web-landing', Atlas.browser('lumen.app', landing, 'rv'), true)}
    ${Atlas.panel('web', 'web-ws', Atlas.browser('app.lumen.app/design/website', workspace))}
    ${Atlas.panel('web', 'web-shop', '<div id="webShop"></div>')}
    ${Atlas.panel('web', 'web-docs', '<div id="webDocs"></div>')}`);
})();
