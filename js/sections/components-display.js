/* 组件：数据展示 */
(function () {
  const I = Atlas.icon;
  const lbl = (t) => `<span class="cmp-lbl">${t}</span>`;

  /* 示意二维码：三个定位角 + 伪随机模块 */
  function qr() {
    const n = 21, r = Atlas.rand(2026);
    const finder = (x, y) => (x < 7 && y < 7) || (x >= n - 7 && y < 7) || (x < 7 && y >= n - 7);
    let s = '';
    for (let y = 0; y < n; y++) {
      for (let x = 0; x < n; x++) {
        if (finder(x, y)) continue;
        if (r() > 0.52) s += `<rect x="${x}" y="${y}" width="1" height="1"/>`;
      }
    }
    const f = (x, y) => `<rect x="${x}" y="${y}" width="7" height="7"/><rect x="${x + 1}" y="${y + 1}" width="5" height="5" style="fill:var(--card)"/><rect x="${x + 2}" y="${y + 2}" width="3" height="3"/>`;
    return `<svg viewBox="-1 -1 ${n + 2} ${n + 2}" class="qr-svg" shape-rendering="crispEdges">${s}${f(0, 0)}${f(n - 7, 0)}${f(0, n - 7)}</svg>`;
  }

  const tableRows = [
    ['林小满', '产品', 128, 96.5, '2025-03-12', 'success', '在职'],
    ['周以安', '市场', 86, 88.2, '2024-11-02', 'success', '在职'],
    ['陈默', '技术', 214, 92.8, '2023-06-18', 'warning', '休假'],
    ['苏青禾', '设计', 167, 98.1, '2024-01-09', 'success', '在职'],
    ['韩一舟', '财务', 45, 79.4, '2025-08-27', 'danger', '离职'],
  ];

  const calEvents = { 6: ['评审', 's1'], 12: ['发布', 's3'], 13: ['发布', 's3'], 20: ['团建', 's2'], 28: ['今天', 'today'] };
  const cal = () => {
    let s = '';
    for (let i = 0; i < 35; i++) {
      const d = i - 2;
      const ev = calEvents[d];
      s += `<div class="${d < 1 || d > 31 ? 'out' : ''}${ev && ev[1] === 'today' ? ' today' : ''}"><span>${d < 1 ? 30 + d : d > 31 ? d - 31 : d}</span>${ev && ev[1] !== 'today' ? `<em style="--c:var(--${ev[1]})">${ev[0]}</em>` : ''}</div>`;
    }
    return s;
  };

  Atlas.mount('cmp-display', Atlas.cmpGrid('数据展示', [
    { id: 'avatar', zh: '头像', en: 'Avatar', alias: 'AvatarGroup',
      html: `${lbl('尺寸与形状')}<div class="row"><span class="avatar avatar-xs av1">A</span><span class="avatar avatar-sm av2">B</span><span class="avatar av3">C</span><span class="avatar avatar-lg av4">D</span><span class="avatar avatar-lg avatar-sq av5">E</span><span class="avatar avatar-lg av6 avatar-online">F</span></div>
        ${lbl('头像组 Group')}<div class="avatar-group">${['av1', 'av2', 'av3', 'av4'].map((a, i) => `<span class="avatar ${a}">${'林周陈苏'[i]}</span>`).join('')}<span class="avatar" style="--av:var(--bg-2);color:var(--fg-2)">+9</span></div>` },
    { id: 'badge', zh: '徽标', en: 'Badge', alias: 'Dot / Counter / Ribbon',
      note: '数字徽标提示未读数，超过 99 显示 99+；小红点只提示“有新内容”。',
      html: `<div class="row" style="gap:22px"><span class="badge-wrap">${I('bell', 22)}<em class="badge">5</em></span><span class="badge-wrap">${I('message', 22)}<em class="badge">99+</em></span><span class="badge-wrap">${I('mail', 22)}<em class="badge badge-dot"></em></span><span class="badge-wrap"><span class="avatar av2">周</span><em class="badge">2</em></span></div>
        <div class="ribbon-card"><span class="ribbon">热卖</span><b>专业版</b><small class="muted">¥39 / 月</small></div>` },
    { id: 'tag', zh: '标签', en: 'Tag · Chip', alias: 'Label / Pill',
      note: '用于分类、状态、筛选。可关闭、可选中。',
      html: `${lbl('颜色')}<div class="row-wrap"><span class="tag">默认</span><span class="tag tag-primary">主要</span><span class="tag tag-success">成功</span><span class="tag tag-warning">警告</span><span class="tag tag-danger">错误</span><span class="tag tag-info">信息</span><span class="tag tag-solid">实心</span></div>
        ${lbl('可关闭 / 可选中')}<div class="row-wrap"><span class="tag tag-round">${I('hash', 11)}设计<button type="button" data-act="tagRemove">${I('x', 11)}</button></span><span class="tag tag-round">${I('hash', 11)}前端<button type="button" data-act="tagRemove">${I('x', 11)}</button></span>${['全部', '图片', '视频'].map((t, i) => `<span class="tag tag-round chip-check${i === 0 ? ' on' : ''}" data-act="toggleOn">${t}</span>`).join('')}</div>` },
    { id: 'card', zh: '卡片', en: 'Card', alias: 'Panel / Tile', w: 2,
      note: '把相关信息组织在一个容器里。图片卡片、资料卡片、数据卡片是最常见的三种。',
      html: `<div class="card-demos">
        <div class="card cd-img"><div class="cd-cover s-forest"></div><div class="card-body"><b>莫干山两日游</b><p class="muted">竹林、云海与树屋民宿。</p><div class="row"><span class="tag tag-round">${I('pin', 11)}湖州</span><span class="spacer"></span><b class="cd-price num">¥688</b></div></div></div>
        <div class="card cd-profile"><div class="cd-banner"></div><span class="avatar avatar-xl av4 avatar-online">苏</span><b>苏青禾</b><small class="muted">资深设计师 · 杭州</small><div class="row"><button class="btn btn-primary btn-sm" type="button">关注</button><button class="btn btn-sm" type="button">私信</button></div></div>
        <div class="card cd-stat"><div class="row"><span class="cd-ic">${I('wallet', 16)}</span><span class="muted">本月收入</span></div><b class="num">¥86,420</b><span class="delta up">${I('trendUp', 12)}18.2%</span>${Atlas.chart.spark({ data: Atlas.series(8, 14, 30, 100), color: 'var(--primary)', w: 160, h: 44 })}</div>
      </div>` },
    { id: 'list', zh: '列表', en: 'List', alias: 'ListItem / Cell',
      html: `<div class="list">${[['av1', '林小满', '把“定价页”移到了评审中', '2 分钟前'], ['av2', '周以安', '评论：首屏标题再短一点', '10 分钟前'], ['av3', '陈默', '上传了 3 个文件', '1 小时前']].map(([a, n, d, t]) => `
        <div class="list-item"><span class="avatar ${a}">${n[0]}</span><div><b>${n}</b><small>${d}</small></div><span class="muted list-time">${t}</span><button class="btn btn-ghost btn-xs btn-icon" type="button" aria-label="更多">${I('more', 14)}</button></div>`).join('')}</div>` },
    { id: 'table', zh: '表格', en: 'Table', alias: 'DataGrid / DataTable', w: 2,
      note: '点击表头“绩效”“入职日期”可以排序；斑马纹帮助横向阅读；数字右对齐。',
      html: `<div class="tbl-wrap"><table class="tbl tbl-striped" data-sort-table>
        <thead><tr><th>姓名</th><th>部门</th><th class="r"><span class="th-sort" data-sort="2">任务数 ${I('sort', 12)}</span></th><th class="r"><span class="th-sort" data-sort="3">绩效 ${I('sort', 12)}</span></th><th><span class="th-sort" data-sort="4">入职日期 ${I('sort', 12)}</span></th><th>状态</th></tr></thead>
        <tbody>${tableRows.map((r) => `<tr><td><div class="cell-user"><span class="avatar avatar-sm av${(r[0].charCodeAt(0) % 6) + 1}">${r[0][0]}</span>${r[0]}</div></td><td>${r[1]}</td><td class="r num">${r[2]}</td><td class="r num">${r[3]}</td><td class="num">${r[4]}</td><td><span class="status status-${r[5] === 'success' ? 'ok' : r[5] === 'warning' ? 'warn' : 'err'}">${r[6]}</span></td></tr>`).join('')}</tbody>
      </table></div>` },
    { id: 'descriptions', zh: '描述列表', en: 'Descriptions', alias: 'Key-Value / Definition List',
      note: '详情页最常用：成对展示“字段名 - 值”。',
      html: `<dl class="desc">${[['订单号', '<span class="mono">#20261028-0871</span>'], ['下单时间', '2026-10-28 10:24'], ['支付方式', '微信支付'], ['订单状态', '<span class="tag tag-success">已完成</span>'], ['收货地址', '浙江省杭州市西湖区文三路 90 号']].map(([k, v]) => `<dt>${k}</dt><dd>${v}</dd>`).join('')}</dl>` },
    { id: 'statistic', zh: '统计数值', en: 'Statistic', alias: 'KPI / Metric',
      note: '数字进入视野时从 0 滚动到目标值。',
      html: `<div class="stat-grid"><div><small class="muted">活跃用户</small><b class="num" data-countup="128460">0</b><span class="delta up">${I('trendUp', 12)}12.4%</span></div><div><small class="muted">转化率</small><b class="num" data-countup="3.62" data-decimals="2" data-suffix="%">0</b><span class="delta down">${I('trendDown', 12)}0.3%</span></div></div>` },
    { id: 'timeline', zh: '时间轴', en: 'Timeline', alias: 'Activity Feed',
      html: `<ul class="tl">${[['success', '10:24', '订单已签收', '快递员：王师傅'], ['primary', '08:10', '派送中', '杭州西湖区网点'], ['primary', '昨天 21:40', '到达转运中心', '杭州转运中心'], ['muted', '昨天 14:02', '已发货', '优选 Mall 杭州仓']].map(([c, t, h, d]) => `<li style="--c:var(--${c})"><span class="tl-time num">${t}</span><b>${h}</b><small>${d}</small></li>`).join('')}</ul>` },
    { id: 'tree', zh: '树形控件', en: 'Tree', alias: 'TreeView',
      note: '展示层级数据；点击箭头展开 / 收起。',
      html: `<ul class="tree" data-tree>
        <li class="open"><span class="tree-node" data-act="treeToggle">${I('chevR', 12)}${I('folder', 14)}src</span><ul>
          <li class="open"><span class="tree-node" data-act="treeToggle">${I('chevR', 12)}${I('folder', 14)}components</span><ul><li><span class="tree-leaf">${I('file', 13)}Button.vue</span></li><li><span class="tree-leaf on">${I('file', 13)}Table.vue</span></li></ul></li>
          <li><span class="tree-node" data-act="treeToggle">${I('chevR', 12)}${I('folder', 14)}views</span><ul><li><span class="tree-leaf">${I('file', 13)}Dashboard.vue</span></li></ul></li>
          <li><span class="tree-leaf">${I('file', 13)}main.ts</span></li></ul></li>
        <li><span class="tree-leaf">${I('fileText', 13)}package.json</span></li></ul>` },
    { id: 'collapse', zh: '折叠面板', en: 'Collapse · Accordion', alias: 'Expansion Panel',
      note: '手风琴模式：同一时间只展开一个。',
      html: `<div class="accordion" data-accordion>${[['什么是设计令牌？', '把颜色、字号、间距等设计决策存成变量，设计稿和代码共用同一套值。'], ['组件和模式有什么区别？', '组件是单个控件（如按钮），模式是多个组件组合解决一类问题（如登录表单）。'], ['什么时候用抽屉而不是对话框？', '内容较多、需要参照背后页面时用抽屉；需要用户立即确认时用对话框。']].map(([q, a], i) => `
        <details${i === 0 ? ' open' : ''}><summary>${q}${I('chevD', 14)}</summary><p>${a}</p></details>`).join('')}</div>` },
    { id: 'carousel', zh: '轮播图', en: 'Carousel', alias: 'Slider / Swiper', w: 2,
      note: '自动轮播，悬停暂停；左右箭头与底部圆点都可切换。',
      html: `<div class="carousel" data-carousel><div class="car-track">
        <div class="car-slide" style="--g:linear-gradient(120deg,#6366f1,#ec4899)"><small>NEW</small><b>秋季新品发布</b><span>全场 8 折起</span></div>
        <div class="car-slide" style="--g:linear-gradient(120deg,#0ea5e9,#10b981)"><small>EVENT</small><b>设计周 2026</b><span>11 月 18 日 · 杭州</span></div>
        <div class="car-slide" style="--g:linear-gradient(120deg,#f59e0b,#ef4444)"><small>HOT</small><b>会员日限时福利</b><span>领取 50 元券</span></div></div>
        <button class="car-arrow l" type="button" data-act="carousel" data-d="-1" aria-label="上一张">${I('chevL', 18)}</button><button class="car-arrow r" type="button" data-act="carousel" data-d="1" aria-label="下一张">${I('chevR', 18)}</button>
        <div class="car-dots"><i class="on"></i><i></i><i></i></div></div>` },
    { id: 'image', zh: '图片与预览', en: 'Image · Lightbox', alias: 'Image Preview / Gallery',
      note: '点击缩略图打开全屏预览（灯箱）。',
      html: `<div class="img-grid">${['s-forest', 's-sunset', 's-sea', 's-night'].map((s, i) => `<button type="button" class="img-thumb ${s}" data-act="lightbox" data-i="${i}" aria-label="预览图片 ${i + 1}">${I('eye', 16)}</button>`).join('')}</div>` },
    { id: 'calendar', zh: '日历', en: 'Calendar', alias: 'Scheduler / Month View',
      html: `<div class="calendar"><div class="row"><b>2026 年 10 月</b><span class="spacer"></span><div class="seg"><button type="button">周</button><button type="button" class="on">月</button></div></div>
        <div class="cal-week">${'一二三四五六日'.split('').map((d) => `<span>${d}</span>`).join('')}</div><div class="cal-grid">${cal()}</div></div>` },
    { id: 'empty', zh: '空状态', en: 'Empty State', alias: 'Empty / No Data',
      note: '没有数据时告诉用户原因，并给出下一步操作。',
      html: `<div class="empty"><svg viewBox="0 0 120 80" class="empty-svg" aria-hidden="true"><rect x="20" y="22" width="80" height="50" rx="8" style="fill:var(--bg-2)"/><path d="M20 40h24l6 8h20l6-8h24" style="fill:none;stroke:var(--border-2)" stroke-width="2"/><circle cx="92" cy="20" r="10" style="fill:var(--primary-soft-2)"/><path d="M88 20h8M92 16v8" style="stroke:var(--primary)" stroke-width="2" stroke-linecap="round"/></svg><b>还没有项目</b><small class="muted">创建第一个项目，开始和团队协作</small><button class="btn btn-primary btn-sm" type="button">${I('plus', 14)}新建项目</button></div>` },
    { id: 'qrcode', zh: '二维码', en: 'QR Code', alias: 'QRCode',
      html: `<div class="qr-wrap"><div class="qr-box">${qr()}<span class="qr-logo">${I('layers', 14)}</span></div><div><b>扫码下载 App</b><small class="muted">支持 iOS 与 Android</small><span class="tag tag-warning" style="margin-top:6px">示意图形</span></div></div>` },
    { id: 'code', zh: '代码块', en: 'Code Block', alias: 'Syntax Highlight',
      html: `<div class="code-block"><div class="cb-head"><span class="mono">tokens.css</span><button class="btn btn-ghost btn-xs" type="button" data-act="copyCode">${I('copy', 12)}<span>复制</span></button></div><pre><code><span class="ln">1</span><span class="tk-kw">:root</span> {
<span class="ln">2</span>  <span class="tk-attr">--primary</span>: <span class="tk-str">#4f46e5</span>;
<span class="ln">3</span>  <span class="tk-attr">--radius</span>: <span class="tk-str">12px</span>;
<span class="ln">4</span>  <span class="tk-attr">--ease-out</span>: <span class="tk-fn">cubic-bezier</span>(.22, 1, .36, 1);
<span class="ln">5</span>}</code></pre></div>` },
    { id: 'compare', zh: '对比滑块', en: 'Image Compare', alias: 'Before / After',
      note: '拖动中间手柄对比前后效果，常用于修图、改版展示。',
      html: `<div class="compare" data-compare style="--pos:50%"><div class="ic-after"><span>改版后</span></div><div class="ic-before"><span>改版前</span></div><div class="ic-handle"><i>${I('chevsLR', 14)}</i></div></div>` },
    { id: 'watermark', zh: '水印', en: 'Watermark',
      note: '在敏感页面铺满半透明文字，防止截图外泄。',
      html: `<div class="watermark"><b>2026 Q4 财务报表</b><p class="muted">营收 ¥ 12,840,000 · 毛利 38.6%</p><div class="progress"><i style="--v:72%"></i></div></div>` },
  ]));
})();
