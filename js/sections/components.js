/* 06 功能维度（二）：组件库章节框架。各分类内容由 components-*.js 填充 */
(function () {
  const I = Atlas.icon;

  Atlas.cmpCats = [
    { id: 'general', zh: '通用', en: 'General', icon: 'box', desc: '按钮、图标、快捷键等最基础的操作元素。' },
    { id: 'layout', zh: '布局', en: 'Layout', icon: 'columns', desc: '决定元素如何排列：栅格、分割线、间距、分栏。' },
    { id: 'nav', zh: '导航', en: 'Navigation', icon: 'compass', desc: '告诉用户“在哪里、能去哪里”。' },
    { id: 'entry', zh: '数据录入', en: 'Data Entry', icon: 'edit', desc: '收集用户输入：文本、选择、日期、上传等。' },
    { id: 'display', zh: '数据展示', en: 'Data Display', icon: 'grid', desc: '把信息有结构地呈现：表格、列表、卡片、时间轴。' },
    { id: 'feedback', zh: '反馈', en: 'Feedback', icon: 'bell', desc: '告诉用户“发生了什么”：提示、弹窗、加载、进度。' },
    { id: 'charts', zh: '图表', en: 'Charts', icon: 'chart', desc: '把数字变成图形。按“数据要表达什么”选图表类型。' },
    { id: 'ai', zh: 'AI 交互', en: 'AI Patterns', icon: 'sparkle', desc: '2024 年后普及的新组件：对话、流式输出、提示词输入。' },
  ];

  /* 组件卡片：w 为占列数（1–3） */
  Atlas.cmpGrid = (cat, items) => `<div class="cmp-grid">${items.map((c) => `
    <div class="cmp rv${c.w ? ` w${c.w}` : ''}" id="c-${c.id}" data-zh="${c.zh}" data-en="${c.en}" data-alias="${c.alias || ''}" data-cat="组件 · ${cat}">
      <div class="cmp-head"><b>${c.zh}</b><em>${c.en}</em>${c.alias ? `<span class="cmp-alias">${c.alias}</span>` : ''}</div>
      <div class="cmp-demo${c.pad === false ? ' no-pad' : ''}">${c.html}</div>
      ${c.note ? `<p class="cmp-note">${c.note}</p>` : ''}
    </div>`).join('')}</div>`;

  Atlas.mount('components', `
    <div class="wrap">
      ${Atlas.head({
        no: '06 / 功能 · 组件',
        title: '组件库',
        en: 'Components',
        desc: '按功能分成 8 类。每个组件都标注中文名、英文名和常见别名（不同组件库叫法不同，例如 Ant Design 的 Message 在其他地方叫 Toast）。所有组件都可以直接点击、输入、拖动。',
        chips: ['通用', '布局', '导航', '数据录入', '数据展示', '反馈', '图表', 'AI 交互'],
      })}
      <div class="cmp-bar" id="cmpBar">
        <nav class="cmp-cats">${Atlas.cmpCats.map((c) => `<a href="#cc-${c.id}" data-cc="${c.id}">${I(c.icon, 14)}${c.zh}<small id="ccn-${c.id}">0</small></a>`).join('')}</nav>
        <div class="field cmp-search">${I('search', 14)}<input class="input" id="cmpSearch" placeholder="搜索组件：中文 / 英文 / 别名，例如 Toast、抽屉" autocomplete="off"></div>
      </div>
      <p class="cmp-empty" id="cmpEmpty">没有找到匹配的组件，换个关键词试试。</p>
      ${Atlas.cmpCats.map((c) => `
        <section class="cmp-cat" id="cc-${c.id}">
          ${Atlas.sub({ title: `${c.zh}`, en: c.en, desc: c.desc })}
          <div id="cmp-${c.id}"></div>
        </section>`).join('')}
    </div>`);

  Atlas.onReady(() => {
    const input = document.getElementById('cmpSearch');
    const cats = [...document.querySelectorAll('.cmp-cat')];
    const count = () => cats.forEach((c) => {
      document.getElementById(`ccn-${c.id.slice(3)}`).textContent = c.querySelectorAll('.cmp:not(.is-hidden)').length;
    });
    input.addEventListener('input', () => {
      const q = input.value.trim().toLowerCase();
      document.querySelectorAll('.cmp').forEach((el) => {
        const hay = `${el.dataset.zh} ${el.dataset.en} ${el.dataset.alias}`.toLowerCase();
        el.classList.toggle('is-hidden', !!q && !hay.includes(q));
        if (q) el.classList.add('in');
      });
      cats.forEach((c) => c.classList.toggle('is-empty', !c.querySelector('.cmp:not(.is-hidden)')));
      document.getElementById('cmpEmpty').classList.toggle('show', cats.every((c) => c.classList.contains('is-empty')));
      count();
    });
    count();
    const links = document.querySelectorAll('.cmp-cats a');
    const io = new IntersectionObserver((entries) => entries.forEach((en) => {
      if (en.isIntersecting) links.forEach((a) => a.classList.toggle('on', a.dataset.cc === en.target.id.slice(3)));
    }), { rootMargin: '-30% 0px -60% 0px' });
    cats.forEach((c) => io.observe(c));
  });
})();
