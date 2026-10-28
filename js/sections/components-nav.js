/* 组件：通用、布局、导航 */
(function () {
  const I = Atlas.icon;
  const lbl = (t) => `<span class="cmp-lbl">${t}</span>`;

  /* ---------- 通用 ---------- */
  Atlas.mount('cmp-general', Atlas.cmpGrid('通用', [
    { id: 'button', zh: '按钮', en: 'Button', alias: 'Btn', w: 2,
      note: '一个区域只放一个主按钮；危险操作用红色；图标按钮必须有提示文字。',
      html: `
        ${lbl('类型 Type')}
        <div class="row-wrap">
          <button class="btn btn-primary" type="button">主要 Primary</button><button class="btn" type="button">次要 Default</button>
          <button class="btn btn-soft" type="button">柔和 Soft</button><button class="btn btn-dashed" type="button">虚线 Dashed</button>
          <button class="btn btn-ghost" type="button">幽灵 Ghost</button><button class="btn btn-text" type="button">文字 Text</button>
          <button class="btn btn-danger" type="button">危险 Danger</button><button class="btn btn-gradient" type="button">渐变 Gradient</button>
        </div>
        ${lbl('尺寸 Size')}
        <div class="row-wrap"><button class="btn btn-primary btn-xs" type="button">迷你</button><button class="btn btn-primary btn-sm" type="button">小</button><button class="btn btn-primary" type="button">中</button><button class="btn btn-primary btn-lg" type="button">大</button></div>
        ${lbl('形态与状态 Shape & State')}
        <div class="row-wrap">
          <button class="btn btn-primary btn-pill" type="button">胶囊 Pill</button>
          <button class="btn btn-icon" type="button" data-tip="图标按钮">${I('settings', 16)}</button>
          <button class="btn" type="button">${I('download', 15)}带图标</button>
          <button class="btn btn-primary" type="button" data-act="btnLoading">点我加载</button>
          <button class="btn btn-primary" type="button" disabled>禁用 Disabled</button>
          <button class="btn btn-dark" type="button">深色 Dark</button>
        </div>` },
    { id: 'btngroup', zh: '按钮组 / 分裂按钮', en: 'Button Group · Split Button', alias: 'ButtonGroup',
      note: '把相关操作放在一起；分裂按钮左边执行默认操作，右边展开更多。',
      html: `
        <div class="btn-group"><button class="btn" type="button">${I('chevL', 14)}</button><button class="btn" type="button">今天</button><button class="btn" type="button">${I('chevR', 14)}</button></div>
        <div class="btn-group" style="margin-top:12px"><button class="btn" type="button">日</button><button class="btn btn-primary" type="button">周</button><button class="btn" type="button">月</button></div>
        <div class="btn-group split-btn" style="margin-top:12px" data-act="dropdown">
          <button class="btn btn-primary" type="button">保存</button><button class="btn btn-primary btn-icon" type="button" aria-label="更多">${I('chevD', 14)}</button>
          <div class="pop"><div class="pop-item">${I('copy', 14)}保存为副本</div><div class="pop-item">${I('fileText', 14)}保存为模板</div></div>
        </div>` },
    { id: 'fab', zh: '悬浮按钮', en: 'FAB / Float Button', alias: 'Speed Dial',
      note: '页面最主要的操作，固定在右下角。悬停展开的叫“速拨 Speed Dial”。',
      html: `<div class="fab-stage"><div class="speed-dial"><span class="sd-act" data-tip="分享" data-tip-pos="left">${I('share', 16)}</span><span class="sd-act" data-tip="编辑" data-tip-pos="left">${I('edit', 16)}</span><span class="sd-act" data-tip="上传" data-tip-pos="left">${I('upload', 16)}</span><button class="fab-main" type="button" aria-label="新建">${I('plus', 22, 'line', 2.4)}</button></div><span class="muted fab-hint">悬停右下角按钮</span></div>` },
    { id: 'icon', zh: '图标', en: 'Icon', alias: 'Iconfont / SVG Icon', w: 2,
      note: '本页使用 24×24 网格、2px 描边的线性图标。悬停查看图标名。',
      html: `<div class="icon-wall">${Atlas.iconNames.slice(0, 48).map((n) => `<span data-tip="${n}">${I(n, 18)}</span>`).join('')}</div>` },
    { id: 'kbd', zh: '快捷键', en: 'Kbd', alias: 'Keyboard Key',
      note: '在菜单、提示和文档里展示快捷键。',
      html: `<div class="col"><div class="row"><span class="kbd">⌘</span>+<span class="kbd">K</span><span class="muted">打开命令面板</span></div><div class="row"><span class="kbd">Ctrl</span>+<span class="kbd">Shift</span>+<span class="kbd">P</span></div><div class="row"><span class="kbd">Esc</span><span class="muted">关闭弹窗</span></div><div class="row"><span class="kbd">↑</span><span class="kbd">↓</span><span class="kbd">↵</span><span class="muted">选择</span></div></div>` },
    { id: 'link', zh: '链接', en: 'Link', alias: 'Anchor Text',
      note: '链接与按钮的区别：链接去往别处，按钮执行操作。',
      html: `<div class="col"><p>阅读 <a class="lk" href="javascript:void(0)">用户协议</a> 与 <a class="lk" href="javascript:void(0)">隐私政策</a>。</p><a class="lk lk-ext" href="javascript:void(0)">外部链接 ${I('arrowUR', 13)}</a><a class="lk lk-grow" href="javascript:void(0)">悬停下划线展开</a><a class="lk lk-arrow" href="javascript:void(0)">了解更多 ${I('arrowR', 14)}</a></div>` },
  ]));

  /* ---------- 布局 ---------- */
  Atlas.mount('cmp-layout', Atlas.cmpGrid('布局', [
    { id: 'grid', zh: '栅格', en: 'Grid', alias: 'Row / Col', w: 2,
      note: '把宽度等分成 12 或 24 列，元素按列数占位，不同断点可以占不同列数。',
      html: `<div class="g-demo">${[[24], [12, 12], [8, 8, 8], [6, 6, 6, 6], [4, 16, 4], [6, 18]].map((r) => `<div class="g-row">${r.map((n) => `<div style="flex:${n}">col-${n}</div>`).join('')}</div>`).join('')}</div>` },
    { id: 'divider', zh: '分割线', en: 'Divider', alias: 'Separator',
      html: `<p class="muted">上方内容</p><div class="divider"></div><p class="muted">下方内容</p><div class="divider-text">或使用以下方式登录</div><div class="row muted">编辑<span class="v-divider"></span>复制<span class="v-divider"></span>删除</div>` },
    { id: 'space', zh: '间距 / 堆叠', en: 'Space · Stack', alias: 'HStack / VStack',
      note: '统一控制子元素之间的间距，避免到处写 margin。',
      html: `${lbl('水平 gap 8')}<div class="row"><i class="sp-b"></i><i class="sp-b"></i><i class="sp-b"></i></div>${lbl('垂直 gap 12')}<div class="col" style="gap:12px"><i class="sp-b w"></i><i class="sp-b w"></i></div>` },
    { id: 'splitter', zh: '分栏', en: 'Splitter', alias: 'Resizable Panels',
      note: '拖动中间的手柄调整两侧宽度，常见于 IDE、邮件、文件管理。',
      html: `<div class="splitter" data-splitter><div class="sp-pane sp-left">${I('folder', 14)} 文件树</div><div class="sp-handle" title="拖动调整"><i></i></div><div class="sp-pane sp-right">${I('fileText', 14)} 编辑区</div></div>` },
    { id: 'masonry', zh: '瀑布流', en: 'Masonry', alias: 'Waterfall',
      note: '高度不一的卡片紧密排列，适合图片、灵感、商品。',
      html: `<div class="masonry">${[60, 90, 50, 80, 70, 40, 95, 55].map((hh, i) => `<i style="height:${hh}px;--h:${i * 40}"></i>`).join('')}</div>` },
    { id: 'affix', zh: '吸顶 / 固钉', en: 'Affix · Sticky', alias: 'position: sticky',
      note: '在下方区域内滚动，标题栏会固定在顶部。',
      html: `<div class="affix-box"><div class="affix-head">${I('hash', 13)} 吸顶标题栏</div>${Array.from({ length: 8 }, (_, i) => `<p>第 ${i + 1} 行内容</p>`).join('')}</div>` },
    { id: 'aspect', zh: '宽高比', en: 'Aspect Ratio', alias: 'aspect-ratio',
      html: `<div class="ar-row">${[['16 / 9', '视频'], ['4 / 3', '图片'], ['1 / 1', '头像'], ['3 / 4', '海报']].map(([r, t]) => `<div style="aspect-ratio:${r}"><b>${r}</b><small>${t}</small></div>`).join('')}</div>` },
  ]));

  /* ---------- 导航 ---------- */
  Atlas.mount('cmp-nav', Atlas.cmpGrid('导航', [
    { id: 'navbar', zh: '导航栏', en: 'Navbar · Header', alias: 'Top Nav / App Bar', w: 2,
      html: `<div class="mini-nav"><b class="row">${I('layers', 16)}Brand</b><nav>${['首页', '产品', '方案', '定价'].map((t, i) => `<a href="javascript:void(0)" class="${i === 1 ? 'on' : ''}" data-act="miniNav">${t}</a>`).join('')}</nav><span class="spacer"></span><button class="btn btn-ghost btn-sm btn-icon" type="button">${I('search', 15)}</button><span class="avatar avatar-sm av2">周</span></div>` },
    { id: 'menu', zh: '侧边菜单', en: 'Menu · Sidebar', alias: 'SideNav / Drawer Menu',
      html: `<div class="v-menu">
        <span class="v-menu-group">工作台</span>
        <a href="javascript:void(0)" class="on" data-act="vmenu">${I('home', 15)}概览</a>
        <a href="javascript:void(0)" data-act="vmenu">${I('chart', 15)}分析<span class="tag tag-round">新</span></a>
        <a href="javascript:void(0)" class="has-sub open" data-act="vsub">${I('users', 15)}团队${I('chevD', 13)}</a>
        <div class="v-sub"><a href="javascript:void(0)" data-act="vmenu">成员</a><a href="javascript:void(0)" data-act="vmenu">权限</a></div>
        <a href="javascript:void(0)" data-act="vmenu">${I('settings', 15)}设置</a></div>` },
    { id: 'tabs', zh: '标签页', en: 'Tabs', alias: 'Tab / TabView', w: 2,
      note: '线形标签的指示条会滑动到选中项；卡片式常用于多文档；胶囊式就是分段控制器。',
      html: `
        ${lbl('线形 Line（滑动指示条）')}
        <div class="tabs-slide" data-tabs-slide>${['概览', '成员', '账单', '安全设置'].map((t, i) => `<button type="button" class="${i === 0 ? 'on' : ''}">${t}</button>`).join('')}<i class="tabs-ink"></i></div>
        ${lbl('卡片式 Card')}
        <div class="tabs-card">${['index.html', 'style.css', 'app.js'].map((t, i) => `<button type="button" class="${i === 0 ? 'on' : ''}" data-act="pick">${I('file', 13)}${t}<span>${I('x', 11)}</span></button>`).join('')}<button type="button" class="tabs-add">${I('plus', 13)}</button></div>
        ${lbl('胶囊式 Pill / Segmented')}
        <div class="seg">${['日', '周', '月', '年'].map((t, i) => `<button type="button" class="${i === 1 ? 'on' : ''}">${t}</button>`).join('')}</div>` },
    { id: 'breadcrumb', zh: '面包屑', en: 'Breadcrumb', alias: 'Crumbs',
      note: '显示当前页面在层级中的位置，并可以快速返回上级。',
      html: `<nav class="crumb"><a href="javascript:void(0)">${I('home', 13)}</a><span class="sep">/</span><a href="javascript:void(0)">项目</a><span class="sep">/</span><a href="javascript:void(0)">官网改版</a><span class="sep">/</span><b>设计稿</b></nav>
        <nav class="crumb" style="margin-top:12px"><a href="javascript:void(0)">首页</a><span class="sep">›</span><a href="javascript:void(0)">数码</a><span class="sep">›</span><b>耳机</b></nav>` },
    { id: 'pagination', zh: '分页', en: 'Pagination', alias: 'Pager', w: 2,
      note: '数据很多时分页加载。移动端更常用“加载更多”或无限滚动。',
      html: `${lbl('完整分页')}<div class="pager" data-pager="20" data-cur="6" data-total="198"></div>
        ${lbl('简洁分页')}<div class="row"><button class="btn btn-sm btn-icon" type="button">${I('chevL', 14)}</button><span class="num">3 / 12</span><button class="btn btn-sm btn-icon" type="button">${I('chevR', 14)}</button><span class="spacer"></span><button class="btn btn-sm btn-block load-more" type="button" data-act="loadMore" style="max-width:200px">加载更多</button></div>` },
    { id: 'steps', zh: '步骤条', en: 'Steps', alias: 'Stepper / Wizard', w: 2,
      note: '把长流程拆成几步，显示当前进度。点击按钮切换。',
      html: `<div class="steps" data-steps data-cur="1">${[['填写信息', '基本资料'], ['验证身份', '短信验证'], ['设置密码', '至少 8 位'], ['完成', '开始使用']].map(([t, d], i) => `<div class="step"><i>${i + 1}</i><div><b>${t}</b><small>${d}</small></div></div>`).join('')}</div>
        <div class="row" style="margin-top:16px"><button class="btn btn-sm" type="button" data-act="stepGo" data-d="-1">上一步</button><button class="btn btn-sm btn-primary" type="button" data-act="stepGo" data-d="1">下一步</button></div>` },
    { id: 'dropdown', zh: '下拉菜单', en: 'Dropdown Menu', alias: 'Menu / Context Menu',
      note: '点击按钮展开一组操作；右键菜单叫 Context Menu。',
      html: `<div class="dd-wrap" data-act="dropdown"><button class="btn" type="button">操作 ${I('chevD', 14)}</button>
        <div class="pop"><div class="pop-label">文件</div><div class="pop-item">${I('edit', 14)}重命名<span class="kbd">F2</span></div><div class="pop-item">${I('copy', 14)}复制<span class="kbd">⌘C</span></div><div class="pop-item">${I('share', 14)}分享</div><div class="pop-sep"></div><div class="pop-item is-danger">${I('trash', 14)}删除<span class="kbd">⌫</span></div></div></div>` },
    { id: 'anchor', zh: '锚点 / 目录', en: 'Anchor · TOC', alias: 'Table of Contents',
      html: `<div class="anchor" data-anchor>${['简介', '安装', '快速上手', 'API', '常见问题'].map((t, i) => `<a href="javascript:void(0)" class="${i === 0 ? 'on' : ''}">${t}</a>`).join('')}<i class="anchor-ink"></i></div>` },
    { id: 'cmdk', zh: '命令面板', en: 'Command Palette', alias: 'Spotlight / ⌘K',
      note: '键盘优先的全局搜索与操作入口，Linear、VS Code、Raycast 的标配。',
      html: `<button class="cmdk-trigger" type="button" data-act="cmdk">${I('search', 15)}<span>搜索或输入命令…</span><span class="kbd">⌘</span><span class="kbd">K</span></button><p class="muted cmdk-note">按 ⌘K / Ctrl+K 也可以打开</p>` },
    { id: 'backtop', zh: '回到顶部', en: 'BackTop · Scroll to Top',
      html: `<div class="bt-box" id="btBox">${Array.from({ length: 10 }, (_, i) => `<p>列表项 ${i + 1}</p>`).join('')}<button class="bt-btn" type="button" data-act="backTop" aria-label="回到顶部">${I('arrowUp', 16)}</button></div>` },
    { id: 'megamenu', zh: '超级菜单', en: 'Mega Menu', alias: 'Flyout',
      note: '官网导航展开的大面板，按分组展示大量入口。',
      html: `<div class="mm"><div class="mm-col"><b>产品</b><a href="javascript:void(0)">${I('kanban', 13)}项目管理</a><a href="javascript:void(0)">${I('fileText', 13)}文档协作</a><a href="javascript:void(0)">${I('bot', 13)}AI 助手</a></div><div class="mm-col"><b>资源</b><a href="javascript:void(0)">${I('book', 13)}帮助中心</a><a href="javascript:void(0)">${I('video', 13)}视频教程</a></div><div class="mm-feat"><small>新功能</small><b>AI 周报</b></div></div>` },
    { id: 'tabbar', zh: '底部标签栏', en: 'Tab Bar · Bottom Navigation', alias: 'BottomNav',
      note: '移动端一级导航，3–5 个入口。',
      html: `<div class="m-tabbar">${[['home', '首页'], ['compass', '发现'], ['cart', '购物车'], ['user', '我的']].map(([ic, t], i) => `<span class="${i === 0 ? 'on' : ''}" data-act="pick">${I(ic, 20)}<small>${t}</small></span>`).join('')}</div>` },
  ]));
})();
