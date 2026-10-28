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

  const REPO = 'itxd/wd-ui';
  const CMD = `npx skills add ${REPO}`;

  Atlas.mount('top', `
    <div class="hero-bg"><div class="hero-grid"></div><i></i><i></i><i></i></div>
    <div class="wrap">
      <span class="hero-eyebrow rv"><b>开源 Skill</b>wd-ui · 让 AI 选对 UI 风格，写出精准的设计提示词</span>
      <h1 class="rv">网页 UI <span class="grad">图谱</span></h1>
      <p class="hero-sub rv">一页看懂网页界面，<br>一条命令让 AI 学会。</p>
      <p class="hero-lead rv">
        按产品形态、UI 风格、色系、功能、动效五个维度拆解网页：14 个可交互示例界面、27 种风格、15 套色板、100 多个组件、27 种页面类型、80 多种动效，每一项都能复制精确提示词。
        安装 wd-ui 后，Claude Code、Cursor、Codex 等 AI 助手会按你的业务场景推荐风格，并生成可直接使用的设计提示词。
      </p>
      <div class="hero-cmd rv">
        <code><em>$</em> ${CMD}</code>
        <button type="button" data-act="copy" data-copy="${CMD}" aria-label="复制安装命令">${I('copy', 16)}复制</button>
      </div>
      <div class="hero-cta rv">
        <a class="btn btn-dark btn-lg btn-pill" href="#platforms">从产品形态开始</a>
        <a class="btn btn-lg btn-pill hero-more" href="https://github.com/${REPO}#安装-skill" target="_blank" rel="noopener">其他安装方式 ${I('arrowR', 16)}</a>
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
        <span>${I('pointer', 14)} 在产品形态区打开检查器，悬停查看组件名</span>
        <span>${I('palette', 14)} 右上角圆点切换主题色，全站示例同步变色</span>
        <span>${I('moon', 14)} 支持明暗模式</span>
        <span>${I('play', 14)} 动效卡片可点击重播</span>
      </div>
    </div>`);
})();
