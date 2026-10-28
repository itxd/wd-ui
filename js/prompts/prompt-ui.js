/* 提示词：按条目类型拼装（界面 / 风格 / 组件 / 动效 / 页面 / 配色），并在弹窗中预览与复制 */
(function () {
  const I = Atlas.icon;
  const fence = (lang, code) => `\`\`\`${lang}\n${code}\n\`\`\``;
  const rootStyle = () => getComputedStyle(document.documentElement);
  const themeLine = () => `当前为${document.documentElement.dataset.theme === 'dark' ? '深色' : '浅色'}主题，主色 ${rootStyle().getPropertyValue('--primary').trim()}`;
  const ACCEPT = [
    '尺寸、间距、颜色、圆角、阴影、字体与参考实现一致，颜色只通过 CSS 变量引用',
    '悬停、按下、聚焦（focus-visible）、禁用等状态齐全，过渡时长与缓动曲线保持不变',
    '可点击元素可用键盘操作，图标按钮带 aria-label',
    '如改写为 React / Vue / Tailwind，视觉结果不变',
  ];
  const acceptance = (extra = []) => `## 验收标准\n${[...extra, ...ACCEPT].map((a) => `- ${a}`).join('\n')}`;
  const codeBlock = (ref, what) => [
    `## 设计令牌（${themeLine()}）\n${fence('css', ref.tokens || '/* 无 */')}`,
    `## 参考实现 · HTML（${what}）\n${fence('html', ref.html)}`,
    `## 参考实现 · CSS（只保留命中该${what}的规则，含 hover / active / focus 等状态和 @keyframes）\n${fence('css', ref.css)}`,
  ].join('\n\n');
  const currentSkin = () => document.getElementById('platSkin').dataset.skin;

  /* 相对亮度，用于给色板分配角色 */
  const lum = (hex) => {
    const h = hex.replace('#', '');
    return [0, 2, 4].map((i) => parseInt(h.slice(i, i + 2), 16) / 255)
      .map((c) => (c <= 0.03928 ? c / 12.92 : ((c + 0.055) / 1.055) ** 2.4))
      .reduce((a, c, i) => a + c * [0.2126, 0.7152, 0.0722][i], 0);
  };

  const builders = {
    async form(el) {
      const skin = currentSkin();
      let key = el.dataset.view;
      if (!key) {
        const tab = document.querySelector('[data-tp="plat"].on').id;
        if (tab === 'plat-admin') key = `admin-${document.querySelector('#adminApp .adm-view.on').dataset.view}`;
        if (tab === 'plat-web') key = document.querySelector('[data-tp="web"].on').id;
        if (tab === 'plat-app') {
          const keys = Object.keys(Atlas.formViews).filter((k) => k.startsWith('app-'));
          const text = [
            `# 任务\n请实现一套 App 界面（共 ${keys.length} 屏），统一使用下面的视觉风格；每一屏的结构如下。`,
            ...keys.map((k, i) => { const v = Atlas.formViews[k]; return `## 第 ${i + 1} 屏：${v.title}（${v.size}）\n目标：${v.goal}\n${v.parts.map((p) => `- ${p}`).join('\n')}\n交互：${v.interactions.join('；')}`; }),
            `## 统一视觉风格\n${Atlas.styleSpecText(skin)}`,
            acceptance(['每一屏都包含状态栏、底部安全区，触控热区不小于 44×44']),
          ].join('\n\n');
          return { title: 'App 应用 · 全部 7 屏', sub: `风格：${Atlas.styleSpecs[skin].zh}`, simple: text };
        }
      }
      const v = Atlas.formViews[key];
      return { title: `${v.form} · ${v.title}`, sub: `风格：${Atlas.styleSpecs[key === 'admin-screen' ? 'hud' : key === 'app-material' ? 'm3' : skin].zh}`, simple: Atlas.formPromptText(key, skin) };
    },

    async style(el) {
      const card = el.closest('.style-card');
      const id = card.id.slice(3);
      const sp = Atlas.styleSpecs[id];
      const intro = `# 任务\n请按「${sp.zh}（${sp.en}）」风格设计界面。下面的规格可以直接作为设计系统使用：先抽取为 CSS 变量，再应用到按钮、卡片、输入框、导航等组件。`;
      const simple = [intro, `## 风格规格\n${Atlas.styleSpecText(id)}`, acceptance(['同一界面不混用其它风格的圆角、阴影和配色'])].join('\n\n');
      const ref = await Atlas.extractReference(card.querySelector('.style-demo'));
      const full = [intro, `## 风格规格\n${Atlas.styleSpecText(id)}`, `## 风格样本\n下面是该风格的样本卡片，请先 1:1 还原它，再把同样的视觉语言扩展到其它组件。`, codeBlock(ref, '风格样本'), acceptance(['样本卡片与参考实现一致'])].join('\n\n');
      return { title: `${sp.zh} · 风格提示词`, sub: sp.en, simple, full };
    },

    async cmp(el) {
      const tile = el.closest('.cmp');
      const demo = tile.querySelector('.cmp-demo');
      const d = tile.dataset;
      const note = tile.querySelector('.cmp-note');
      const variants = [...demo.querySelectorAll('.cmp-lbl')].map((x) => x.textContent.trim());
      const beh = Atlas.describeBehaviors(demo);
      const intro = [
        `# 任务\n请实现「${d.zh}」组件（英文 ${d.en}${d.alias ? `，也叫 ${d.alias}` : ''}；${d.cat}），视觉与交互要和参考实现完全一致。`,
        `## 组件说明\n${note ? note.textContent.trim() : `${d.zh}是常用的${d.cat.replace('组件 · ', '')}类组件。`}${variants.length ? `\n需要包含的变体：${variants.join('、')}` : ''}`,
        beh.length ? `## 交互行为\n${beh.map((b) => `- ${b}`).join('\n')}` : '',
      ].filter(Boolean).join('\n\n');
      const ref = await Atlas.extractReference(demo);
      return { title: `${d.zh} ${d.en}`, sub: d.cat, simple: [intro, `## 设计令牌（${themeLine()}）\n${fence('css', ref.tokens)}`, acceptance()].join('\n\n'), full: [intro, codeBlock(ref, '组件'), acceptance()].join('\n\n') };
    },

    async motion(el) {
      const tile = el.closest('.mo');
      const block = tile ? tile.querySelector('.mo-stage') : document.getElementById(el.dataset.target);
      const d = (tile || block).dataset;
      const tech = tile ? tile.querySelector('.mo-sub code').textContent : '';
      const how = tile ? tile.querySelector('.mo-how').textContent.trim() : '';
      const beh = Atlas.describeBehaviors(block);
      const intro = [
        `# 任务\n请实现「${d.zh}」动效（${d.en}）${tech ? `，实现方式：${tech}` : ''}${how ? `，触发方式：${how}` : ''}。时长、缓动曲线、关键帧与参考实现保持一致。`,
        beh.length ? `## 动效行为\n${beh.map((b) => `- ${b}`).join('\n')}` : '',
        '## 动效要求\n- 只对 transform / opacity / filter 做动画，保证 60fps\n- 在 @media (prefers-reduced-motion: reduce) 下关闭或缩短动画',
      ].filter(Boolean).join('\n\n');
      const ref = await Atlas.extractReference(block);
      return { title: `${d.zh} ${d.en}`, sub: d.cat || '动效', simple: [intro, acceptance()].join('\n\n'), full: [intro, codeBlock(ref, '动效'), acceptance()].join('\n\n') };
    },

    async page(el) {
      const card = el.closest('.wf-card');
      const p = Atlas.pageItems.find((x) => x.zh === card.dataset.zh);
      const skin = currentSkin();
      const text = [
        `# 任务\n请设计并实现「${p.zh}」页面（${p.en}，常见于${p.cat === '通用' ? '各类产品' : p.cat}），使用真实感的中文示例数据。`,
        `## 页面布局\n${p.layout}`,
        `## 必备组件\n${p.keys.split('、').map((k) => `- ${k}`).join('\n')}`,
        `## 视觉风格（与“产品形态”中当前选择的风格一致，可替换）\n${Atlas.styleSpecText(skin)}`,
        acceptance(['桌面端与移动端（≤ 768px）都有合理布局', '空数据、加载中、错误三种状态都有对应展示']),
      ].join('\n\n');
      return { title: `${p.zh} · 页面模板提示词`, sub: p.en, simple: text };
    },

    async palette(el) {
      const card = el.closest('.pal-card');
      const p = Atlas.palettes.find((x) => x.zh === card.dataset.zh);
      const sorted = [...p.c].sort((a, b) => lum(a) - lum(b));
      const prim = p.c[p.p];
      const dark = sorted[0], light = sorted[sorted.length - 1];
      const accents = p.c.filter((c) => ![prim, dark, light].includes(c));
      const text = [
        `# 任务\n请为界面应用「${p.zh}（${p.en}）」配色，并输出完整的设计令牌。情绪：${p.mood.join('、')}；适用：${p.fit}；参考品牌：${p.ref}。`,
        `## 色板与角色\n- 主色 ${prim}：主按钮、链接、选中态、进度条（约占界面 10%）\n- 深色 ${dark}：标题文字、深色区块${dark === prim ? '（同主色）' : ''}\n- 浅色 ${light}：页面背景、浅色底${light === prim ? '（同主色）' : ''}\n${accents.map((c) => `- 辅助色 ${c}：插画、图表系列、标签与徽章`).join('\n')}\n- 主色上的文字颜色：${Atlas.readableOn(prim)}`,
        `## 设计令牌\n${fence('css', `:root {\n  --color-primary: ${prim};\n  --color-primary-hover: color-mix(in srgb, ${prim} 86%, #000);\n  --color-primary-soft: color-mix(in srgb, ${prim} 12%, transparent);\n  --color-on-primary: ${Atlas.readableOn(prim)};\n  --color-bg: ${light};\n  --color-surface: #ffffff;\n  --color-text: ${dark};\n  --color-text-secondary: color-mix(in srgb, ${dark} 65%, ${light});\n  --color-border: color-mix(in srgb, ${dark} 12%, ${light});\n${accents.map((c, i) => `  --color-accent-${i + 1}: ${c};`).join('\n')}\n  --color-success: #16a34a;\n  --color-warning: #f59e0b;\n  --color-danger: #ef4444;\n}`)}`,
        '## 使用规则\n- 遵循 60-30-10：60% 中性背景、30% 表面与次要色、10% 主色\n- 功能色（成功 / 警告 / 错误）固定含义，不拿来做装饰\n- 深色模式：背景用深色加深到 L≈10%，表面逐级提亮，主色饱和度降低约 10%，不要直接反色',
        acceptance(['正文与背景对比度 ≥ 4.5:1，大字 ≥ 3:1', '同一屏除功能色外不超过 3 种彩色']),
      ].join('\n\n');
      return { title: `${p.zh} · 配色提示词`, sub: p.en, simple: text };
    },
  };

  const openModal = ({ title, sub, simple, full }) => {
    const { wrap } = Atlas.openLayer('layer-modal', `
      <div class="modal prompt-modal" role="dialog" aria-modal="true" aria-label="${Atlas.esc(title)}">
        <header><div><b>${I('sparkle', 15)}${Atlas.esc(title)}</b><small>${Atlas.esc(sub || '')}</small></div><button type="button" class="btn btn-ghost btn-sm btn-icon" data-close aria-label="关闭">${I('x', 16)}</button></header>
        <div class="pm-bar">
          ${full ? '<div class="seg pm-mode"><button type="button" class="on" data-m="full">完整版（含代码）</button><button type="button" data-m="simple">精简版</button></div>' : ''}
          <span class="pm-count muted num"></span><span class="spacer"></span>
          <button type="button" class="btn btn-primary btn-sm pm-copy">${I('copy', 14)}复制提示词</button>
        </div>
        <pre class="pm-text"></pre>
        <footer class="pm-foot">${I('info', 13)}<span>粘贴给 Claude、ChatGPT、Cursor、v0 等 AI 工具即可生成同款。完整版附带页面上真实使用的 HTML、CSS 和设计令牌。</span></footer>
      </div>`);
    const pre = wrap.querySelector('.pm-text');
    const count = wrap.querySelector('.pm-count');
    const show = (mode) => { pre.textContent = mode === 'full' && full ? full : simple; count.textContent = `${pre.textContent.length.toLocaleString()} 字符`; pre.scrollTop = 0; };
    show(full ? 'full' : 'simple');
    const seg = wrap.querySelector('.pm-mode');
    if (seg) seg.addEventListener('click', (e) => { const b = e.target.closest('button'); if (b) show(b.dataset.m); });
    wrap.querySelector('.pm-copy').addEventListener('click', () => Atlas.copy(pre.textContent, '提示词已复制'));
  };

  Atlas.buildPrompt = (el) => {
    const b = builders[el.dataset.kind];
    if (!b) throw new Error(`未知的提示词类型：${el.dataset.kind}`);
    return b(el);
  };
  Atlas.acts.prompt = (el) => {
    Atlas.buildPrompt(el).then(openModal, (err) => Atlas.toast(err.message, 'error'));
  };
})();
