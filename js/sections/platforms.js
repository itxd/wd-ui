/* 01 产品形态：管理后台 / Web 应用 / App 应用 —— 章节框架、特征卡与对比表 */
(function () {
  const I = Atlas.icon;

  const facts = {
    admin: {
      lead: '面向内部运营、客服、财务等管理人员的 B 端系统。核心任务是对大量数据进行<b>查看、筛选、增删改查和监控</b>，追求效率和一致性，而不是视觉冲击。',
      items: [
        ['信息密度', '高：正文 12–14px，紧凑行高，一屏尽量多放数据'],
        ['导航模式', '侧边菜单 + 顶栏 + 面包屑 + 多页签'],
        ['布局骨架', '左侧固定菜单（200–240px），右侧内容区自适应'],
        ['核心页面', '仪表盘、列表 CRUD、表单、详情、权限、设置、数据大屏'],
        ['设计体系', 'Ant Design · Element Plus · Arco · TDesign · Naive UI · shadcn/ui'],
        ['关键词', '效率、可扫视、批量操作、状态清晰、权限控制'],
      ],
      tip: '下方示例可点击左侧菜单切换「仪表盘 / 用户管理 / 数据大屏」三种典型页面；用户管理里点“编辑”会打开抽屉。',
    },
    web: {
      lead: '在浏览器里运行的产品。一类是<b>营销型</b>（官网、落地页、电商），重叙事和转化；另一类是<b>工具型</b>（SaaS 工作台、文档、协作），重复杂交互和效率。',
      items: [
        ['信息密度', '营销型低：大字号、大留白；工具型中高'],
        ['导航模式', '顶部导航 + 页脚；工具型为多栏布局 + 命令面板'],
        ['布局骨架', '居中内容（1200–1440px 容器）+ 响应式断点'],
        ['核心页面', '落地页、定价、文档、电商列表与详情、社区、工作台'],
        ['设计体系', 'Tailwind UI · shadcn/ui · Radix · Vercel Geist · Linear 风格'],
        ['关键词', '首屏叙事、行动按钮、SEO、响应式、品牌感'],
      ],
      tip: '下方切换四种 Web 页面。落地页可切换月付 / 年付价格；工作台的看板卡片可拖拽，按“⌘K”按钮打开命令面板；电商页可选规格、加购。',
    },
    app: {
      lead: '手机上的原生应用、小程序或 H5。屏幕小、以<b>拇指触控</b>为主，强调手势、沉浸感和单手可达，遵循 iOS / Android 各自的平台规范。',
      items: [
        ['信息密度', '中低：正文 15–17px，触控热区 ≥ 44pt'],
        ['导航模式', '底部标签栏 + 页面堆栈（推入 / 返回）+ 手势'],
        ['布局骨架', '状态栏 + 导航栏 + 内容滚动区 + 底部标签栏 / 操作栏'],
        ['核心页面', '首页 Feed、详情、聊天、我的、下单支付、发现'],
        ['设计体系', 'Apple HIG · Material Design 3 · WeUI · Vant · NutUI'],
        ['关键词', '触控、手势、拇指热区、沉浸、底部弹层'],
      ],
      tip: '下方手机可直接操作：聊天页能输入发送；“交互层”手机演示底部弹层、动作面板、对话框和 Toast；个人中心的列表项可向左滑动。',
    },
  };

  const factCard = (k) => `
    <div class="plat-facts rv">
      <div class="plat-lead">
        <p>${facts[k].lead}</p>
        <div class="plat-tip">${I('pointer', 14)}<span>${facts[k].tip}</span></div>
      </div>
      <dl class="plat-dl">
        ${facts[k].items.map(([t, d]) => `<div><dt>${t}</dt><dd>${d}</dd></div>`).join('')}
      </dl>
    </div>`;

  const compare = [
    ['主要用户', '内部员工、运营、管理者', '访客、潜在客户、知识工作者', '大众消费者、移动场景用户'],
    ['屏幕与输入', '大屏桌面 · 鼠标 + 键盘', '桌面到手机全尺寸 · 鼠标 / 触控', '手机竖屏 · 手指触控 + 手势'],
    ['主导航', '侧边菜单 SideMenu', '顶部导航 Navbar', '底部标签栏 TabBar'],
    ['信息密度', '高', '营销低 / 工具中高', '中低'],
    ['基础字号', '12–14px', '14–18px（营销页标题 48px+）', '15–17pt'],
    ['栅格', '24 栅格 · 固定侧栏', '12 栅格 · 居中容器', '4 栅格 · 16pt 页边距'],
    ['弹层', '模态框、抽屉、气泡确认', '模态框、超级菜单、命令面板', '底部弹层、动作面板、全屏页'],
    ['动效', '克制：150–250ms，功能性', '叙事：滚动显现、视差、首屏动画', '物理感：弹簧、手势跟随、转场'],
    ['代表组件库', 'Ant Design、Element Plus、Arco', 'shadcn/ui、Tailwind UI、Radix', 'HIG、Material 3、Vant、WeUI'],
  ];

  /* 产品形态示例可切换的 UI 风格皮肤：[风格 id, 名称, 色样] */
  const skins = [
    ['saas', '现代 SaaS（默认）', 'linear-gradient(135deg,#fff 50%,#4f46e5 50%)'], ['flat', '扁平', '#3498db'], ['min', '极简', 'linear-gradient(135deg,#fafaf9 50%,#1c1917 50%)'],
    ['glasslight', '浅色玻璃', 'linear-gradient(135deg,#eef2ff,#fbcfe8,#ccfbf1)'], ['glass', '深色玻璃', 'linear-gradient(135deg,#1e1b4b,#7c3aed)'], ['neu', '新拟态', '#f1f4f8'], ['brutal', '新野兽派', 'linear-gradient(135deg,#fde047 50%,#ff5c8a 50%)'],
    ['darktech', '暗黑科技', 'linear-gradient(135deg,#08090a 55%,#6366f1)'], ['clay', '粘土拟态', 'linear-gradient(135deg,#fdf2f8,#a855f7)'], ['m3', 'Material 3', '#eaddff'], ['cyber', '赛博朋克', 'linear-gradient(135deg,#0d0221 50%,#ff2a6d 50%)'],
  ];
  const paintSkinDesc = (id) => {
    const sp = Atlas.styleSpecs[id];
    document.getElementById('skinDesc').innerHTML = `<span>当前：<b>${sp.zh}</b> · ${sp.mood}</span><span>${sp.shape.split('；')[0]}</span>${document.getElementById(`st-${id}`) ? `<a class="btn btn-text" href="#st-${id}">查看该风格 ${I('arrowR', 12)}</a>` : ''}`;
  };
  Atlas.acts.skin = (el) => {
    Atlas.acts.pick(el);
    document.getElementById('platSkin').dataset.skin = el.dataset.skin;
    paintSkinDesc(el.dataset.skin);
  };
  Atlas.onReady(() => paintSkinDesc('saas'));

  Atlas.mount('platforms', `
    <div class="wrap">
      ${Atlas.head({
        no: '01 / 产品形态',
        title: '三种产品形态',
        en: 'Admin · Web App · Mobile App',
        desc: '同样是“网页界面”，管理后台、Web 应用和 App 的骨架完全不同。先判断形态，就能确定导航方式、信息密度和常用组件。下面每种形态都给出特征说明和可交互的高保真示例。',
        chips: ['布局骨架', '导航模式', '信息密度', '平台规范'],
      })}
      <div class="plat-switch rv">
        <div class="plat-tools">
          <label class="tool-switch" title="鼠标悬停在示例界面上，显示该区域的组件名称">
            <input type="checkbox" id="inspectToggle" checked><span class="tool-switch-ui"></span><span>检查器</span>
          </label>
          <label class="tool-switch" title="在所有示例界面上同时显示组件名称">
            <input type="checkbox" id="annoToggle"><span class="tool-switch-ui"></span><span>全部标注</span>
          </label>
          <button class="btn btn-primary prompt-cta" type="button" data-act="prompt" data-kind="form">${I('sparkle', 15)}复制当前界面提示词</button>
        </div>
        ${Atlas.tabs('plat', [
          { id: 'plat-admin', label: '管理后台', sub: 'Admin', icon: 'sidebar' },
          { id: 'plat-web', label: 'Web 应用', sub: 'Web App', icon: 'globe' },
          { id: 'plat-app', label: 'App 应用', sub: 'Mobile', icon: 'phone' },
        ])}
      </div>
      <div class="skin-bar rv">
        <b>${I('layers', 15)}UI 风格</b>
        <div class="skin-list">${skins.map(([id, t, sw], i) => `<button type="button" class="${i === 0 ? 'on' : ''}" data-act="skin" data-skin="${id}"><i style="--sw:${sw}"></i>${t}</button>`).join('')}</div>
        <div class="skin-desc" id="skinDesc"></div>
      </div>
      <div id="platSkin" data-skin="saas">
        ${Atlas.panel('plat', 'plat-admin', `${factCard('admin')}<div id="adminMock" class="mock-stage" data-form="管理后台"></div>`, true)}
        ${Atlas.panel('plat', 'plat-web', `${factCard('web')}<div id="webMock" class="mock-stage" data-form="Web 应用"></div>`)}
        ${Atlas.panel('plat', 'plat-app', `${factCard('app')}<div id="appMock" class="mock-stage" data-form="App 应用"></div>`)}
      </div>

      ${Atlas.sub({ title: '三种形态对比', en: 'Comparison', desc: '同一个维度在三种形态下的典型取值。做设计评审时可以按这张表逐行核对。' })}
      <div class="panel compare-wrap rv">
        <table class="tbl compare-tbl">
          <thead><tr><th>维度</th><th>${I('sidebar', 14)} 管理后台</th><th>${I('globe', 14)} Web 应用</th><th>${I('phone', 14)} App 应用</th></tr></thead>
          <tbody>${compare.map((r) => `<tr><td><b>${r[0]}</b></td><td>${r[1]}</td><td>${r[2]}</td><td>${r[3]}</td></tr>`).join('')}</tbody>
        </table>
      </div>
    </div>`);
})();
