/* 03 基础规范：字体、间距、圆角、阴影、栅格、图标、可访问性 */
(function () {
  const I = Atlas.icon;

  const types = [
    ['Display', '展示标题', 56, 800, '1.05', '-0.04em', '首屏大标题、营销口号'],
    ['H1', '一级标题', 40, 700, '1.15', '-0.03em', '页面标题'],
    ['H2', '二级标题', 30, 700, '1.25', '-0.02em', '区块标题'],
    ['H3', '三级标题', 22, 600, '1.35', '-0.01em', '卡片标题、弹窗标题'],
    ['Body L', '大正文', 17, 400, '1.7', '0', '营销页正文、App 正文'],
    ['Body', '正文', 14, 400, '1.6', '0', '后台与 Web 应用默认正文'],
    ['Caption', '辅助文字', 12, 400, '1.5', '0', '说明、时间、表单提示'],
    ['Overline', '上标签', 11, 600, '1.4', '0.12em', '分组标签、眉题（常大写）'],
  ];

  const families = [
    ['无衬线 Sans-serif', 'var(--font)', '界面默认字体。PingFang SC、思源黑体、Inter、SF Pro。清晰、中性。', '界面让信息有序 Aa 123'],
    ['衬线 Serif', 'var(--font-serif)', '杂志、品牌、长文阅读。思源宋体、Georgia、Playfair。有文化感和权威感。', '慢下来读一本书 Aa'],
    ['等宽 Monospace', 'var(--mono)', '代码、数字对齐、开发者产品。SF Mono、JetBrains Mono。', 'const ui = 0x1F;'],
    ['圆体 Rounded', 'ui-rounded, "SF Pro Rounded", "Arial Rounded MT Bold", var(--font)', '儿童、社交、可爱品牌，亲和力强。', '你好呀 Hello 123'],
  ];

  const spaces = [4, 8, 12, 16, 24, 32, 48, 64];
  const radii = [[0, '直角', '严肃、数据密集'], [4, '小', '标签、输入框'], [8, '中', '按钮、卡片（后台）'], [12, '大', '卡片、弹窗'], [16, '较大', '移动端卡片'], [24, '超大', '营销卡片、底部弹层'], [999, '胶囊', '标签、头像、开关']];
  const shadows = [
    [0, '平面', 'none', '页面背景'],
    [1, '轻微', '0 1px 2px rgba(16,24,40,.06)', '按钮、输入框'],
    [2, '低', '0 1px 3px rgba(16,24,40,.08), 0 4px 10px rgba(16,24,40,.06)', '卡片'],
    [3, '中', '0 10px 24px -6px rgba(16,24,40,.16)', '下拉菜单、气泡'],
    [4, '高', '0 20px 40px -10px rgba(16,24,40,.24)', '对话框、抽屉'],
    [5, '最高', '0 32px 64px -12px rgba(16,24,40,.35)', '全屏浮层、拖拽中'],
  ];
  const bps = [['xs', '< 576px', '手机竖屏', 4], ['sm', '≥ 576px', '手机横屏', 4], ['md', '≥ 768px', '平板', 8], ['lg', '≥ 992px', '小笔记本', 12], ['xl', '≥ 1200px', '桌面', 12], ['xxl', '≥ 1600px', '大屏', 12]];
  const iconSet = ['home', 'search', 'heart', 'bell', 'user', 'settings', 'star', 'message'];

  Atlas.mount('foundations', `
    <div class="wrap">
      ${Atlas.head({
        no: '03 / 基础规范',
        title: '设计基础',
        en: 'Foundations',
        desc: '风格和组件都建立在这些“原子”之上：字体层级、间距、圆角、阴影、栅格和图标。它们通常被定义为设计令牌（Design Tokens），在设计稿和代码之间共用。',
        chips: ['字体层级', '8 点网格', '圆角', '阴影层级', '栅格断点', '图标', '可访问性'],
      })}

      <div class="fd-grid">
        <div class="fd-card fd-type rv">
          <div class="fd-title"><b>字体层级</b><em>Type Scale</em></div>
          ${types.map(([n, zh, size, w, lh, ls, use]) => `
            <div class="type-row" data-zh="${zh}" data-en="${n}" data-cat="基础规范">
              <div class="type-spec"><b>${n}</b><span>${zh}</span><code>${size}px / ${w} / ${lh}</code></div>
              <div class="type-sample" style="font-size:${Math.min(size, 48)}px;font-weight:${w};line-height:${lh};letter-spacing:${ls}${n === 'Overline' ? ';text-transform:uppercase' : ''}">${n === 'Overline' ? 'Section · 分组标签' : size > 20 ? '界面让信息有序' : '好的界面让人一眼看懂下一步该做什么。'}</div>
              <small class="type-use">${use}</small>
            </div>`).join('')}
        </div>

        <div class="fd-col">
          <div class="fd-card rv">
            <div class="fd-title"><b>字体家族</b><em>Typeface</em></div>
            <div class="fam-grid">${families.map(([n, f, d, s]) => `<div class="fam"><div class="fam-sample" style="font-family:${f.replace(/"/g, '&quot;')}">${s}</div><b>${n}</b><p>${d}</p></div>`).join('')}</div>
          </div>
          <div class="fd-card rv">
            <div class="fd-title"><b>间距</b><em>Spacing · 4 / 8 点网格</em></div>
            <div class="space-list">${spaces.map((s) => `<div><code>${s}</code><i style="width:${s * 3}px"></i><small>${s <= 8 ? '图标与文字、紧凑元素' : s <= 16 ? '组件内边距、表单项' : s <= 32 ? '卡片间距、区块内' : '区块之间、页面留白'}</small></div>`).join('')}</div>
          </div>
        </div>

        <div class="fd-card rv">
          <div class="fd-title"><b>圆角</b><em>Border Radius</em></div>
          <div class="radius-list">${radii.map(([r, n, u]) => `<div><i style="border-radius:${r === 999 ? '999px' : `${r}px`}"></i><b>${r === 999 ? 'full' : `${r}px`}</b><span>${n}</span><small>${u}</small></div>`).join('')}</div>
          <p class="fd-note">圆角越大越亲和、越年轻；越小越严谨、越专业。嵌套时外圆角 = 内圆角 + 内边距，才能保持同心。</p>
        </div>

        <div class="fd-card rv">
          <div class="fd-title"><b>阴影与层级</b><em>Elevation</em></div>
          <div class="elev-list">${shadows.map(([lv, n, sh, u]) => `<div class="elev" style="box-shadow:${sh}"><b>${lv}</b><span>${n}</span><small>${u}</small></div>`).join('')}</div>
          <p class="fd-note">离用户越“近”的元素阴影越大越柔。深色模式下阴影几乎看不见，要改用更亮的表面色表达层级。</p>
        </div>

        <div class="fd-card fd-wide rv">
          <div class="fd-title"><b>栅格与断点</b><em>Grid & Breakpoints</em></div>
          <div class="grid-demo">${Array.from({ length: 12 }, (_, i) => `<i><span>${i + 1}</span></i>`).join('')}</div>
          <div class="grid-spans">
            <div style="grid-column:span 3">span 3 · 侧栏</div><div style="grid-column:span 9">span 9 · 主内容</div>
            <div style="grid-column:span 4">span 4</div><div style="grid-column:span 4">span 4</div><div style="grid-column:span 4">span 4</div>
            <div style="grid-column:span 6">span 6</div><div style="grid-column:span 6">span 6</div>
          </div>
          <table class="tbl tbl-compact bp-table">
            <thead><tr><th>断点</th><th>宽度</th><th>典型设备</th><th>常用列数</th></tr></thead>
            <tbody>${bps.map(([k, w, d, c]) => `<tr><td><code>${k}</code></td><td class="num">${w}</td><td>${d}</td><td class="num">${c}</td></tr>`).join('')}</tbody>
          </table>
        </div>

        <div class="fd-card rv">
          <div class="fd-title"><b>图标风格</b><em>Iconography</em></div>
          ${[['线性 Outline', 'line', 2], ['细线 Thin', 'line', 1.4], ['面性 Filled', 'fill', 2], ['双色 Duotone', 'duo', 2]].map(([n, v, sw]) => `
            <div class="icon-style"><span>${n}</span><div>${iconSet.map((ic) => I(ic, 22, v, sw)).join('')}</div></div>`).join('')}
          <p class="fd-note">同一产品内只用一种图标风格；线宽与字重匹配（14px 正文配 1.5–2px 线宽）。选中态常用“线性 → 面性”切换。</p>
        </div>

        <div class="fd-card rv">
          <div class="fd-title"><b>可访问性</b><em>Accessibility</em></div>
          <div class="a11y">
            <div class="a11y-row"><span class="a11y-sample" style="background:#ffffff;color:#64748b">Aa 正文</span><div><b class="ok">4.8 : 1 通过</b><small>正文对比度 ≥ 4.5 : 1（WCAG AA）</small></div></div>
            <div class="a11y-row"><span class="a11y-sample" style="background:#ffffff;color:#cbd5e1">Aa 正文</span><div><b class="bad">1.5 : 1 不通过</b><small>浅灰字在白底上难以阅读</small></div></div>
            <div class="a11y-row"><button class="btn btn-primary a11y-focus" type="button">焦点环</button><div><b>Focus Ring</b><small>键盘操作时必须能看到当前焦点</small></div></div>
            <div class="a11y-row"><span class="a11y-target"><i>${I('heart', 16)}</i></span><div><b>触控热区 ≥ 44 × 44</b><small>图标只有 16px，点击区域也要够大</small></div></div>
            <div class="a11y-row"><span class="a11y-sample a11y-cb"><i style="background:#16a34a"></i><i style="background:#ef4444"></i></span><div><b>不只靠颜色</b><small>状态同时配图标或文字，照顾色弱用户</small></div></div>
          </div>
        </div>
      </div>
    </div>`);
})();
