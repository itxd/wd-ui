/* 05 功能维度（一）：常见页面类型的线框图 */
(function () {
  const I = Atlas.icon;
  /* 线框积木 */
  const l = (w = 100, cls = '') => `<i class="w-l ${cls}" style="width:${w}%"></i>`;
  const h = (w = 60) => l(w, 'h');
  const btn = (w = 30, g = false) => `<i class="w-btn${g ? ' g' : ''}" style="width:${w}%"></i>`;
  const box = (inner = '', style = '', cls = '') => `<div class="w-box ${cls}" style="${style}">${inner}</div>`;
  const img = (style = '') => `<div class="w-img" style="${style}"></div>`;
  const av = (s = 14) => `<i class="w-av" style="width:${s}px;height:${s}px"></i>`;
  const inp = (w = 100) => `<i class="w-in" style="width:${w}%"></i>`;
  const col = (inner, style = '') => `<div class="w-col" style="${style}">${inner}</div>`;
  const row = (inner, style = '') => `<div class="w-row" style="${style}">${inner}</div>`;
  const side = (n = 6) => `<div class="w-side">${av(12)}${Array.from({ length: n }, (_, i) => l(i === 1 ? 90 : 70 - (i % 3) * 10, i === 1 ? 'on' : '')).join('')}</div>`;
  const rep = (n, f) => Array.from({ length: n }, (_, i) => f(i)).join('');

  const pages = [
    { zh: '登录注册', layout: '左右分栏：左侧 55% 品牌插画或产品图（可放标语），右侧居中 360px 表单卡：Logo、标题“欢迎回来”、账号输入框、密码输入框（可切换明文）、记住我 + 忘记密码一行、全宽主按钮、分割线“或”、第三方登录图标按钮、底部“还没有账号？注册”', en: 'Login / Sign up', cat: '通用', keys: '表单、第三方登录、验证码、记住我',
      wf: row(img('flex:1.1') + col(h(50) + l(70) + inp() + inp() + btn(100) + row(l(30) + l(30), 'justify-content:space-between'), 'flex:1;justify-content:center;padding:0 10px'), 'height:100%') },
    { zh: '仪表盘', layout: '左侧导航 + 顶栏；内容区：页头（标题 + 时间筛选 + 导出）→ 4 张统计卡片一行（数值、涨跌、迷你图）→ 2:1 两张图表卡（趋势折线 + 占比环形）→ 2:1 表格卡 + 动态时间轴', en: 'Dashboard', cat: '后台', keys: '统计卡片、图表、表格、时间筛选',
      wf: row(side() + col(row(rep(4, () => box(l(50) + h(70), 'flex:1'))) + row(box('<div class="w-chart"></div>', 'flex:2') + box('<i class="w-pie"></i>', 'flex:1;display:grid;place-items:center')) + box(rep(3, () => l(100)), ''), 'flex:1'), 'height:100%') },
    { zh: '列表页', layout: '左侧导航；内容区：页头（标题 + 新建主按钮）→ 查询表单卡（2–4 列条件 + 查询/重置）→ 表格卡（工具栏：批量操作 + 刷新/列设置/密度；选择提示条；带复选框、排序、状态标签、行操作的表格；底部分页）→ 编辑抽屉', en: 'List / CRUD', cat: '后台', keys: '查询表单、表格、批量操作、分页',
      wf: row(side() + col(row(inp(28) + inp(28) + btn(14) + btn(14, true)) + box(rep(6, (i) => row(av(8) + l(i ? 40 : 50, i ? '' : 'h') + l(20) + l(14)))) + row('<span style="flex:1"></span>' + rep(5, () => '<i class="w-dot"></i>')), 'flex:1'), 'height:100%') },
    { zh: '卡片网格', layout: '页头（标题 + 主按钮）→ 横向筛选纸片 → 3–4 列响应式卡片网格（封面图 4:3、标题、两行描述、底部元信息），滚动到底自动加载', en: 'Card Grid', cat: '通用', keys: '卡片、筛选标签、无限滚动',
      wf: col(row(h(30) + '<span style="flex:1"></span>' + btn(16)) + row(rep(4, (i) => `<i class="w-chip${i ? '' : ' on'}"></i>`)) + `<div class="w-grid3">${rep(6, () => col(img('height:34px') + l(80) + l(50)))}</div>`) },
    { zh: '详情页', layout: '面包屑 → 左右布局（左主图/图集，右标题、关键信息、主次按钮）→ 线形标签页（详情 / 参数 / 记录）→ 描述列表（两列字段名-值）与正文', en: 'Detail', cat: '通用', keys: '面包屑、主图、描述列表、标签页',
      wf: col(l(30) + row(img('flex:1;height:70px') + col(h(80) + l(60) + l(90) + row(btn(40) + btn(30, true)), 'flex:1')) + `<div class="w-tabs">${rep(3, (i) => `<i class="${i ? '' : 'on'}"></i>`)}</div>` + l(100) + l(80)) },
    { zh: '表单页', layout: '居中 640px 卡片：分组标题 → 标签左对齐 120px 的表单项（输入框、下拉、单选组、日期、文本域）→ 必填红星与下方说明/错误文字 → 底部固定操作栏（取消 + 提交）', en: 'Form', cat: '通用', keys: '表单项、校验、分组、提交栏',
      wf: col(h(30) + rep(4, () => row(l(18) + inp(70))) + row(l(18) + rep(3, () => '<i class="w-radio"></i>' + l(10))) + row('<span style="width:22%"></span>' + btn(18) + btn(14, true)), 'padding:4px 20px') },
    { zh: '分步表单', layout: '顶部横向步骤条（4 步：已完成/当前/未开始）→ 当前步骤表单卡 → 底部上一步/下一步按钮；最后一步为确认信息 + 结果页', en: 'Steps Wizard', cat: '通用', keys: '步骤条、分步校验、上一步 / 下一步',
      wf: col(`<div class="w-steps">${rep(4, (i) => `<i class="${i < 2 ? 'on' : ''}"></i>`)}</div>` + box(rep(3, () => row(l(20) + inp(70))), 'flex:1') + row('<span style="flex:1"></span>' + btn(18, true) + btn(18))) },
    { zh: '设置页', layout: '左侧二级导航（个人资料 / 账号安全 / 通知 / 偏好 / 危险区）→ 右侧分组卡片，每行“标题 + 说明 + 右侧开关或按钮”，危险区红色描边', en: 'Settings', cat: '通用', keys: '分组导航、开关、单元格、危险区',
      wf: row(side(5) + col(rep(2, () => box(h(30) + rep(3, () => row(l(50) + '<span style="flex:1"></span><i class="w-toggle"></i>')))), 'flex:1'), 'height:100%') },
    { zh: '个人主页', layout: '顶部封面图 → 左下压住封面的大头像 → 昵称、简介、关注按钮 → 关注 / 粉丝 / 获赞统计 → 内容标签页 → 3 列作品网格', en: 'Profile', cat: 'App', keys: '封面、头像、统计、内容标签页',
      wf: col(img('height:40px;border-radius:6px') + row(av(30) + col(h(50) + l(30), 'flex:1;margin-top:10px'), 'margin-top:-16px;padding:0 8px') + row(rep(3, () => col(l(60, 'h') + l(40), 'flex:1;align-items:center'))) + `<div class="w-grid3">${rep(3, () => img('height:24px'))}</div>`) },
    { zh: '搜索结果', layout: '顶部大搜索框（带清除与搜索建议）→ 结果类型纸片 + 排序 → 左侧结果列表（标题主色可点、URL、摘要中关键词高亮）→ 右侧筛选面板（复选框分组）→ 分页', en: 'Search Results', cat: 'Web', keys: '搜索框、筛选、高亮、排序',
      wf: row(col(inp() + row(rep(4, (i) => `<i class="w-chip${i ? '' : ' on'}"></i>`)) + rep(3, () => col(l(50, 'link') + l(95) + l(70), 'gap:3px;margin-top:4px')), 'flex:1') + col(rep(5, () => row('<i class="w-check"></i>' + l(60))), 'width:26%;padding-top:20px')) },
    { zh: '消息中心', layout: '主从布局：左侧 40% 消息列表（头像、标题、摘要、时间、未读圆点，当前项浅主色底）→ 右侧详情（发送人、正文、附件、回复/归档按钮）；顶部“全部已读”', en: 'Inbox', cat: '通用', keys: '主从布局、未读标记、批量已读',
      wf: row(col(rep(5, (i) => row(av(12) + col(l(60, i === 0 ? 'h' : '') + l(80), 'flex:1;gap:3px'), i === 0 ? 'background:var(--primary-soft);border-radius:4px;padding:2px' : '')), 'width:42%;border-right:1px solid var(--border);padding-right:6px') + col(row(av(16) + h(40)) + l(100) + l(90) + l(95) + l(60) + row(btn(20) + btn(20, true)), 'flex:1'), 'height:100%') },
    { zh: '聊天 IM', layout: '三栏或两栏：会话列表（头像、昵称、最后一条、时间、未读数）→ 会话区（顶部对方信息、中间气泡流：左灰右主色、时间分隔、图片/文件卡）→ 底部输入栏（表情、附件、发送）', en: 'Chat', cat: 'App', keys: '会话列表、气泡、输入栏、表情',
      wf: row(col(rep(5, () => row(av(12) + l(70))), 'width:30%;border-right:1px solid var(--border);padding-right:6px') + col('<div class="w-bub l"></div><div class="w-bub r"></div><div class="w-bub l s"></div><div class="w-bub r"></div><span style="flex:1"></span>' + row(inp(85) + '<i class="w-av" style="width:14px;height:14px;background:var(--primary)"></i>'), 'flex:1'), 'height:100%') },
    { zh: '看板', layout: '页头（项目名 + 成员 + 视图切换）→ 筛选纸片 → 横向滚动的 4 列（待办 / 进行中 / 评审 / 完成），每列标题带数量与 +，卡片可拖拽（编号、标题、标签、负责人、截止日）', en: 'Kanban', cat: 'Web', keys: '列、可拖拽卡片、泳道、筛选',
      wf: row(rep(4, (c) => col(l(50, 'h') + rep(3 - (c % 2), () => box(l(80) + l(40), 'padding:4px')), 'flex:1;background:var(--bg-2);border-radius:5px;padding:4px')), 'height:100%;align-items:flex-start') },
    { zh: '日历排期', layout: '顶部月份切换 + 今天按钮 + 日/周/月分段控制器 → 7 列月视图网格，日期格内彩色事件条（左侧 2px 色条），今天日期主色圆形；点击日期新建事件', en: 'Calendar', cat: '通用', keys: '月 / 周视图、事件块、拖拽改期',
      wf: col(row(h(25) + '<span style="flex:1"></span>' + btn(20, true)) + `<div class="w-cal">${rep(35, (i) => `<i>${[3, 9, 10, 17, 24, 26].includes(i) ? `<b style="--c:var(--s${(i % 4) + 1})"></b>` : ''}</i>`)}</div>`) },
    { zh: '文件管理', layout: '左侧目录树 → 顶部面包屑路径 + 上传按钮 + 网格/列表切换 → 文件夹与文件网格（图标、名称、修改时间），支持拖拽上传与多选', en: 'File Manager', cat: 'Web', keys: '树形目录、网格 / 列表切换、上传',
      wf: row(side(6) + col(row(l(30) + '<span style="flex:1"></span>' + btn(18)) + `<div class="w-grid4">${rep(8, (i) => col(`<i class="w-folder${i > 4 ? ' f' : ''}"></i>` + l(70), 'align-items:center'))}</div>`, 'flex:1'), 'height:100%') },
    { zh: '文章阅读', layout: '居中 680px 正文栏：标题（32px）→ 作者头像、名称、发布时间、阅读时长 → 封面大图 → 正文（17px / 1.8 行高，二级标题、引用块、代码块、图片说明）→ 右侧浮动目录 → 文末点赞分享与相关推荐', en: 'Article', cat: 'Web', keys: '标题、作者信息、正文排版、目录',
      wf: col(h(80) + row(av(12) + l(30)) + img('height:46px') + l(100) + l(96) + l(88) + l(60), 'padding:0 26px') },
    { zh: '落地页', layout: '导航栏 → 首屏（徽章 + 大标题 + 副标题 + 两个 CTA + 产品截图）→ 客户 Logo 墙 → 功能区（便当格或三列）→ 数据亮点 → 用户评价 → 定价 → FAQ → 行动横幅 → 页脚', en: 'Landing', cat: 'Web', keys: '导航、首屏、CTA、功能区、评价',
      wf: col(row(l(14, 'h') + '<span style="flex:1"></span>' + l(30) + btn(12)) + col(l(20, 'pill') + h(60) + l(46) + row(btn(18) + btn(18, true), 'justify-content:center'), 'align-items:center;padding:8px 0') + row(rep(3, () => box(`<i class="w-ic"></i>` + l(60) + l(80), 'flex:1')))) },
    { zh: '定价页', layout: '标题 + 月付/年付切换（年付优惠标签）→ 3 档价格卡（中间推荐档高亮上浮 + 角标）→ 功能对比表（勾/叉）→ FAQ', en: 'Pricing', cat: 'Web', keys: '套餐卡片、周期切换、功能对比',
      wf: col(col(h(40) + `<i class="w-toggle on"></i>`, 'align-items:center') + row(rep(3, (i) => box(l(40) + l(60, 'h') + rep(3, () => l(80)) + btn(100, i !== 1), `flex:1${i === 1 ? ';border-color:var(--primary);transform:translateY(-4px)' : ''}`)))) },
    { zh: '商品列表', layout: '左侧筛选栏（分类、价格区间、品牌复选、评分）→ 顶部排序（综合 / 销量 / 价格 / 新品）与结果数 → 3–4 列商品卡（图片、标题两行、价格红色、销量、加购按钮）→ 分页或无限滚动', en: 'Product Listing', cat: '电商', keys: '筛选侧栏、排序、商品卡片、加购',
      wf: row(col(rep(4, () => col(l(50, 'h') + rep(2, () => row('<i class="w-check"></i>' + l(60))))), 'width:24%') + `<div class="w-grid3" style="flex:1">${rep(6, () => col(img('height:30px') + l(80) + l(40, 'price')))}</div>`) },
    { zh: '购物车结算', layout: '左侧商品行列表（复选框、缩略图、标题与规格、单价、数量步进器、小计、删除）→ 右侧吸顶订单汇总卡（商品金额、优惠、运费、应付合计大号红色、去结算主按钮）', en: 'Cart / Checkout', cat: '电商', keys: '商品行、数量步进、优惠、订单汇总',
      wf: row(col(rep(3, () => row('<i class="w-check"></i>' + img('width:30px;height:30px') + col(l(70) + l(30, 'price'), 'flex:1') + '<i class="w-step"></i>')), 'flex:1.6') + box(h(50) + rep(3, () => row(l(40) + '<span style="flex:1"></span>' + l(20))) + btn(100), 'flex:1;align-self:flex-start')) },
    { zh: '结果页', layout: '居中：64px 状态图标（成功绿色圆 + 勾，失败红色）→ 标题 → 说明（订单号、金额）→ 主按钮“查看详情”+ 次按钮“返回首页”→ 可选的后续步骤列表', en: 'Result', cat: '通用', keys: '状态图标、说明、下一步操作',
      wf: col(`<i class="w-result">${I('check', 18, 'line', 3)}</i>` + h(40) + l(60) + row(btn(22) + btn(22, true), 'justify-content:center;width:100%'), 'align-items:center;justify-content:center;height:100%') },
    { zh: '空状态 / 404', layout: '居中：插画或大号渐变“404”→ 标题“页面走丢了”→ 原因说明 → 主按钮“返回首页”+ 搜索框或常用链接', en: 'Empty / Error', cat: '通用', keys: '插画、原因说明、引导操作',
      wf: col('<b class="w-404">404</b>' + l(50) + l(36) + btn(26), 'align-items:center;justify-content:center;height:100%') },
    { zh: '地图 LBS', layout: '全屏地图（道路、绿地、水域简化底图）→ 定位点（当前选中放大红色水滴）→ 顶部搜索框 → 底部可拖拽弹层（半屏，列表项：缩略图、名称、距离、评分）', en: 'Map', cat: 'App', keys: '地图、定位点、底部弹层列表',
      wf: `<div class="w-map"><i class="w-pin" style="left:30%;top:30%"></i><i class="w-pin on" style="left:60%;top:40%"></i><i class="w-pin" style="left:45%;top:20%"></i><div class="w-sheet">${col(l(20, 'grab') + row(img('width:30px;height:24px') + col(l(70, 'h') + l(50), 'flex:1')) + row(img('width:30px;height:24px') + col(l(60, 'h') + l(40), 'flex:1')))}</div></div>` },
    { zh: 'AI 对话', layout: '左侧 260px 会话历史（新对话按钮 + 按日期分组的标题列表）→ 中间对话区（最大 760px，用户气泡靠右灰底，AI 回复左侧头像 + Markdown 内容 + 复制/重试/反馈）→ 底部固定提示词输入框（多行、附件、模型选择、发送）', en: 'AI Chat', cat: 'Web', keys: '历史会话、流式回答、提示词输入框',
      wf: row(col(btn(100, true) + rep(5, (i) => l(90 - i * 8)), 'width:26%;background:var(--bg-2);border-radius:4px;padding:4px') + col('<div class="w-bub r"></div>' + row(`<i class="w-ai">${I('sparkle', 9)}</i>` + col(l(90) + l(80) + l(50), 'flex:1;gap:3px')) + '<span style="flex:1"></span>' + `<div class="w-prompt">${l(50)}<i class="w-av" style="width:12px;height:12px;background:var(--primary)"></i></div>`, 'flex:1;padding:0 10px'), 'height:100%') },
    { zh: '引导页', layout: '全屏单页：顶部“跳过”→ 中间大插画 → 标题 + 两行说明 → 分页指示点（当前为胶囊）→ 底部全宽主按钮“下一步 / 开始使用”，左右滑动切换', en: 'Onboarding', cat: 'App', keys: '插画、分页点、跳过、开始使用',
      wf: col(`<i class="w-illu"></i>` + h(50) + l(70) + `<div class="w-pdots"><i class="on"></i><i></i><i></i></div>` + btn(60), 'align-items:center;justify-content:center;height:100%') },
    { zh: '编辑器', layout: '顶部工具栏（撤销、形状、文本、图片、对齐、导出主按钮）→ 左侧图层面板 → 中间带点阵背景的画布（选中元素有主色描边与控制点）→ 右侧属性面板（尺寸、位置、填充、描边、圆角）', en: 'Editor / Canvas', cat: 'Web', keys: '工具栏、图层、画布、属性面板',
      wf: col(row(rep(6, () => '<i class="w-tool"></i>') + '<span style="flex:1"></span>' + btn(14)) + row(col(rep(5, () => l(80)), 'width:18%') + `<div class="w-canvas"><i class="c1"></i><i class="c2"></i><i class="c3"></i></div>` + col(rep(4, () => row(l(30) + inp(50))), 'width:24%'), 'flex:1;align-items:stretch'), 'height:100%') },
    { zh: '数据大屏', layout: '深色背景 1920×1080：顶部发光标题栏 + 时钟 → 左右两列数据面板（细线框 + 角标：排行、柱状、环形、滚动告警）→ 中间数字翻牌器 + 飞线地图', en: 'Data Screen', cat: '后台', keys: '标题装饰、地图、翻牌器、轮播表',
      wf: `<div class="w-screen">${row('<i class="w-scr-title"></i>', 'justify-content:center')}${row(col(rep(2, () => '<div class="w-scr-box"></div>'), 'flex:1') + col('<b class="w-scr-num">8,642</b><div class="w-scr-map"></div>', 'flex:1.6') + col(rep(2, () => '<div class="w-scr-box"></div>'), 'flex:1'), 'flex:1;align-items:stretch')}</div>` },
  ];

  Atlas.pageItems = pages;

  const cats = ['全部', '通用', '后台', 'Web', 'App', '电商'];

  Atlas.mount('pages', `
    <div class="wrap">
      ${Atlas.head({
        no: '05 / 功能 · 页面',
        title: '常见页面类型',
        en: 'Page Patterns',
        desc: '功能维度分两层：先看“页面”，再看“组件”。下面是 27 种最常见的页面类型线框图，灰色块代表文字，色块代表主操作。设计一个新页面时，先找到最接近的类型，再往里填组件。',
        chips: ['登录', '仪表盘', 'CRUD', '详情', '表单', '设置', '结算', 'AI 对话'],
      })}
      <div class="style-filter rv">
        ${cats.map((c, i) => `<button type="button" class="${i === 0 ? 'on' : ''}" data-act="pageFilter" data-k="${c}">${c}<small>${i === 0 ? pages.length : pages.filter((p) => p.cat === c).length}</small></button>`).join('')}
      </div>
      <div class="wf-grid">
        ${pages.map((p) => `
          <article class="wf-card rv" data-cat-k="${p.cat}" data-zh="${p.zh}" data-en="${p.en}" data-cat="页面类型">
            <div class="wf">${p.wf}</div>
            <div class="wf-meta"><div class="row"><b>${p.zh}</b><em>${p.en}</em><span class="tag tag-round">${p.cat}</span>${Atlas.promptBtn('page')}</div><small>${p.keys}</small></div>
          </article>`).join('')}
      </div>
    </div>`);

  Atlas.acts.pageFilter = (el) => {
    Atlas.acts.pick(el);
    document.querySelectorAll('.wf-card').forEach((c) => {
      c.classList.toggle('is-hidden', el.dataset.k !== '全部' && c.dataset.catK !== el.dataset.k);
      c.classList.add('in');
    });
  };
})();
