/* 首屏：阅读方法 + 五个维度公式 */
(function () {
  const I = Atlas.icon;
  const dims = [
    { no: 'D1', icon: 'monitor', title: '产品形态', desc: '管理后台 / Web 应用 / App 应用，决定布局骨架、信息密度与导航方式。', count: 3, unit: '种形态 · 14 个示例界面' },
    { no: 'D2', icon: 'layers', title: 'UI 风格', desc: '扁平、玻璃、新拟态、新野兽派……决定质感与时代感。', count: 27, unit: '种风格' },
    { no: 'D3', icon: 'palette', title: '色系', desc: '主色、辅助色、中性色与功能色，决定情绪与品牌识别。', count: 15, unit: '套色板' },
    { no: 'D4', icon: 'grid', title: '功能', desc: '页面类型 + 组件，决定界面能“做什么”。', count: 129, unit: '个组件与页面类型' },
    { no: 'D5', icon: 'zap', title: '动效', desc: '缓动、微交互、加载、转场、滚动，决定“手感”。', count: 84, unit: '种动效' },
  ];

  Atlas.mount('top', `
    <div class="hero-bg"><div class="hero-grid"></div><i></i><i></i><i></i></div>
    <div class="wrap">
      <span class="hero-eyebrow rv"><b>2026 版</b>一页看懂网页界面：形态 × 色系 × 风格 × 功能 × 动效</span>
      <h1 class="rv">网页 UI <span class="grad">图谱</span><br>Interface Atlas</h1>
      <p class="hero-lead rv">
        任何一个网页，都可以被拆成五个维度来描述和设计。下面每个维度都配了<strong>可以直接操作</strong>的示例：
        14 个可交互的后台、官网、App 示例界面，15 套色板，27 种风格样本，100 多个带中英文名称的组件，27 种页面类型，80 多种动效。
        打开右上角的<strong>检查器</strong>，鼠标移到示例界面的任何区域，都会显示它的组件名称。
      </p>
      <div class="hero-cta rv">
        <a class="btn btn-primary btn-lg" href="#platforms">从产品形态开始 ${I('arrowDown', 16)}</a>
        <a class="btn btn-lg" href="#styles">${I('layers', 16)} 浏览 UI 风格</a>
        <a class="btn btn-ghost btn-lg" href="#glossary">${I('search', 16)} 术语索引</a>
      </div>

      <div class="formula rv">
        ${dims.map((d) => `
          <a class="formula-item" href="#${{ D1: 'platforms', D2: 'styles', D3: 'colors', D4: 'components', D5: 'motion' }[d.no]}">
            <div class="formula-no">${d.no}</div>
            <h3>${I(d.icon, 18)}${d.title}</h3>
            <p>${d.desc}</p>
            <div class="formula-count" data-stat="${d.no}">${d.count}<small>${d.unit}</small></div>
          </a>`).join('')}
      </div>

      <div class="hero-sentence rv">
        <span class="muted">用五个维度描述一个界面：</span>
        这是一个<mark data-k="形态">SaaS 管理后台</mark>，
        采用<mark data-k="色系">科技蓝 #1677FF + 中性灰</mark>，
        <mark data-k="风格">扁平 + 卡片化</mark>风格，
        核心功能是<mark data-k="功能">筛选表单、数据表格、分页、抽屉编辑</mark>，
        配合<mark data-k="动效">骨架屏加载、200ms 缓出过渡</mark>。
      </div>
      <div class="hero-tips rv">
        <span>${I('pointer', 14)} 悬停示例界面查看组件名</span>
        <span>${I('palette', 14)} 右上角圆点切换主题色，全站示例同步变色</span>
        <span>${I('moon', 14)} 支持明暗模式</span>
        <span>${I('play', 14)} 动效卡片可点击重播</span>
      </div>
    </div>`);
})();
