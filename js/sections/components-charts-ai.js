/* 组件：图表、AI 交互 */
(function () {
  const I = Atlas.icon;
  const C = Atlas.chart;
  const months = ['5月', '6月', '7月', '8月', '9月', '10月'];
  const legend = (items) => `<div class="legend">${items.map(([n, c, line]) => `<span><i class="${line ? 'line' : ''}" style="--c:${c}"></i>${n}</span>`).join('')}</div>`;
  const use = (t) => `<span class="chart-use">${I('target', 12)}${t}</span>`;

  Atlas.mount('cmp-charts', Atlas.cmpGrid('图表', [
    { id: 'linechart', zh: '折线图', en: 'Line Chart', alias: 'Trend', w: 2,
      html: `<div class="row">${use('看趋势：随时间的变化')}<span class="spacer"></span>${legend([['Web', 'var(--s1)', 1], ['App', 'var(--s2)', 1], ['小程序', 'var(--s3)', 1]])}</div>
        ${C.line({ w: 640, h: 220, area: false, labels: Array.from({ length: 12 }, (_, i) => `${i + 1}月`), series: [
          { name: 'Web', data: Atlas.series(21, 12, 3000, 9000), color: 'var(--s1)' },
          { name: 'App', data: Atlas.series(33, 12, 2000, 7000), color: 'var(--s2)' },
          { name: '小程序', data: Atlas.series(45, 12, 1000, 5000), color: 'var(--s3)' },
        ] })}` },
    { id: 'areachart', zh: '面积图', en: 'Area Chart',
      html: `${use('趋势 + 总量感')}${C.line({ w: 320, h: 180, labels: months, series: [{ name: '访问量', data: Atlas.series(7, 6, 2000, 8000), color: 'var(--s1)' }] })}` },
    { id: 'columnchart', zh: '柱状图', en: 'Column Chart', alias: 'Bar (vertical)',
      html: `<div class="row">${use('比较类别大小')}<span class="spacer"></span>${legend([['今年', 'var(--s1)'], ['去年', 'var(--s2)']])}</div>${C.bars({ w: 320, h: 180, labels: months, series: [{ name: '今年', data: Atlas.series(12, 6, 40, 100), color: 'var(--s1)' }, { name: '去年', data: Atlas.series(19, 6, 30, 90), color: 'var(--s2)' }] })}` },
    { id: 'stackedchart', zh: '堆叠柱状图', en: 'Stacked Column',
      html: `<div class="row">${use('整体 + 构成')}<span class="spacer"></span>${legend([['新客', 'var(--s1)'], ['老客', 'var(--s2)'], ['会员', 'var(--s3)']])}</div>${C.bars({ w: 320, h: 180, stacked: true, labels: months, series: [{ name: '新客', data: Atlas.series(3, 6, 20, 50), color: 'var(--s1)' }, { name: '老客', data: Atlas.series(5, 6, 20, 40), color: 'var(--s2)' }, { name: '会员', data: Atlas.series(9, 6, 10, 30), color: 'var(--s3)' }] })}` },
    { id: 'barchart', zh: '条形图', en: 'Bar Chart', alias: 'Ranking / Horizontal Bar',
      html: `${use('排行：类别名称较长时')}${C.hbars({ w: 320, items: [{ label: '杭州', v: 12840 }, { label: '上海', v: 10620 }, { label: '北京', v: 9480 }, { label: '深圳', v: 8210 }, { label: '成都', v: 6130 }] })}` },
    { id: 'donutchart', zh: '饼图 / 环形图', en: 'Pie · Donut Chart',
      html: `${use('占比：类别不超过 5 个')}<div class="donut-row">${C.donut({ size: 140, thickness: 18, center: { value: '62%', label: '移动端' }, items: [{ name: 'iOS', v: 34, color: 'var(--s1)' }, { name: 'Android', v: 28, color: 'var(--s2)' }, { name: 'Web', v: 24, color: 'var(--s3)' }, { name: '其他', v: 14, color: 'var(--s4)' }] })}${legend([['iOS 34%', 'var(--s1)'], ['Android 28%', 'var(--s2)'], ['Web 24%', 'var(--s3)'], ['其他 14%', 'var(--s4)']])}</div>` },
    { id: 'gaugechart', zh: '仪表盘', en: 'Gauge',
      html: `${use('单一指标完成度')}<div class="center-box">${C.gauge({ value: 82, label: '目标完成率', size: 180, color: 'var(--s1)' })}</div>` },
    { id: 'radarchart', zh: '雷达图', en: 'Radar Chart', alias: 'Spider Chart',
      html: `<div class="row">${use('多维能力对比')}<span class="spacer"></span>${legend([['产品 A', 'var(--s1)'], ['产品 B', 'var(--s2)']])}</div><div class="center-box">${C.radar({ size: 230, axes: ['性能', '易用', '颜值', '价格', '生态', '稳定'], series: [{ name: '产品 A', data: [86, 72, 90, 60, 78, 84], color: 'var(--s1)' }, { name: '产品 B', data: [70, 88, 66, 82, 60, 72], color: 'var(--s2)' }] })}</div>` },
    { id: 'heatmap', zh: '热力图', en: 'Heatmap', alias: 'Contribution Graph', w: 2,
      html: `<div class="row">${use('时间 × 频次的分布')}<span class="spacer"></span><span class="heat-legend">少 ${[0, 25, 45, 70, 100].map((p) => `<i style="background:${p ? `color-mix(in srgb, var(--s1) ${p}%, var(--card))` : 'var(--bg-2)'}"></i>`).join('')} 多</span></div>${C.heat({ rows: 7, cols: 40, cell: 12, seed: 17 })}` },
    { id: 'scatterchart', zh: '散点图', en: 'Scatter Plot',
      html: `<div class="row">${use('两个变量的相关性')}<span class="spacer"></span>${legend([['A 组', 'var(--s1)'], ['B 组', 'var(--s2)']])}</div>${C.scatter({ w: 320, h: 190, series: [{ name: 'A 组', seed: 4, k: 0.7, b: 10, color: 'var(--s1)' }, { name: 'B 组', seed: 8, k: 0.3, b: 40, color: 'var(--s2)' }] })}` },
    { id: 'funnel', zh: '漏斗图', en: 'Funnel Chart',
      html: `${use('流程逐步转化')}<div class="funnel">${[['访问', 10000, 100], ['注册', 4200, 42], ['激活', 2680, 27], ['付费', 860, 8.6]].map(([n, v, p], i) => `<div class="fn-row"><span class="fn-bar" style="width:${Math.max(p, 18)}%;--o:${1 - i * 0.18}" data-tt="${n} ${Atlas.fmt(v)}"><b class="num">${Atlas.fmt(v)}</b></span><span class="fn-lbl">${n}<small class="num">${p}%</small></span></div>`).join('')}</div>` },
    { id: 'sparkline', zh: '迷你图', en: 'Sparkline', alias: 'Inline Chart',
      html: `${use('表格或卡片里的小趋势')}<div class="spark-list">${[['GMV', '¥8.6M', 's1', 2, '+12%'], ['订单', '42.1K', 's3', 6, '+8%'], ['退款', '1.2K', 's8', 9, '-3%']].map(([n, v, c, sd, d]) => `<div><span class="muted">${n}</span><b class="num">${v}</b>${C.spark({ data: Atlas.series(sd, 14, 10, 100), color: `var(--${c})`, w: 90, h: 28, area: false })}<em class="${d[0] === '+' ? 'up' : 'down'} num">${d}</em></div>`).join('')}</div>` },
    { id: 'treemap', zh: '矩形树图', en: 'Treemap',
      html: `${use('层级 + 占比，类别很多时')}<div class="treemap">${[['数码', 32, 's1'], ['服饰', 22, 's2'], ['家居', 16, 's3'], ['美妆', 12, 's4'], ['食品', 10, 's5'], ['图书', 8, 's7']].map(([n, v, c]) => `<div style="--c:var(--${c});flex:${v}" data-tt="${n} ${v}%"><b>${n}</b><small class="num">${v}%</small></div>`).join('')}</div>` },
    { id: 'bullet', zh: '子弹图', en: 'Bullet Chart', alias: 'Target vs Actual',
      html: `${use('实际值与目标值对比')}<div class="bullets">${[['销售额', 78, 90], ['利润率', 62, 70], ['满意度', 92, 85]].map(([n, v, t]) => `<div class="bullet"><span>${n}</span><div class="bl-track"><i class="bl-v" style="width:${v}%" data-tt="${n} 实际 ${v}%"></i><i class="bl-t" style="left:${t}%" data-tt="${n} 目标 ${t}%"></i></div><b class="num">${v}%</b></div>`).join('')}</div>` },
  ]));

  Atlas.mount('cmp-ai', Atlas.cmpGrid('AI 交互', [
    { id: 'aichat', zh: 'AI 对话消息', en: 'AI Chat Message', alias: 'Assistant Response', w: 2,
      note: '用户消息靠右、AI 回复靠左并带头像；回复底部提供复制、重新生成和反馈。点“重新生成”看流式输出。',
      html: `<div class="ai-chat">
        <div class="ai-user">帮我用一句话解释什么是“设计令牌”</div>
        <div class="ai-msg"><span class="ai-av">${I('sparkle', 14)}</span><div class="ai-body"><p class="ai-stream" id="aiStream">设计令牌就是把颜色、字号、间距这类设计决策存成有名字的变量<sup class="ai-cite" data-tip="来源：Design Tokens W3C 草案">1</sup>，设计稿和代码引用同一个名字，改一处就处处生效。</p>
          <div class="ai-actions"><button type="button" data-act="copyAi" data-tip="复制">${I('copy', 14)}</button><button type="button" data-act="aiRegen" data-tip="重新生成">${I('refresh', 14)}</button><button type="button" data-act="toggleOn" data-tip="有帮助">${I('thumb', 14)}</button><span class="ai-model">智能 Pro · 1.2s</span></div></div></div></div>` },
    { id: 'prompt', zh: '提示词输入框', en: 'Prompt Input', alias: 'Composer / Chat Input', w: 2,
      note: '多行输入 + 附件 + 模型选择 + 工具开关 + 发送；Enter 发送，Shift+Enter 换行。',
      html: `<div class="prompt-box"><textarea rows="2" placeholder="问我任何问题，或输入 / 调用指令…" aria-label="提示词"></textarea>
        <div class="prompt-bar"><button type="button" class="pb-btn" data-tip="上传附件">${I('paperclip', 15)}</button><button type="button" class="pb-chip on" data-act="toggleOn">${I('globe', 13)}联网搜索</button><button type="button" class="pb-chip" data-act="toggleOn">${I('bot', 13)}深度思考</button><span class="spacer"></span>
        <span class="pb-model">智能 Pro ${I('chevD', 12)}</span><button type="button" class="pb-btn" data-tip="语音输入">${I('mic', 15)}</button><button type="button" class="pb-send" data-act="toast" data-msg="已发送" aria-label="发送">${I('arrowUp', 16, 'line', 2.6)}</button></div></div>` },
    { id: 'thinking', zh: '思考过程', en: 'Thinking · Reasoning', alias: 'Chain of Thought',
      note: '推理模型先显示“思考中”，完成后可以折叠查看。',
      html: `<div class="col" style="gap:10px"><div class="thinking"><span class="spin"></span><span class="shimmer-text">正在思考如何拆解这个问题…</span></div>
        <details class="think-done"><summary>${I('sparkle', 13)}已思考 8 秒 ${I('chevD', 12)}</summary><ol><li>识别用户问题：比较三种布局</li><li>检索各布局的适用场景</li><li>组织成对比表输出</li></ol></details></div>` },
    { id: 'suggest', zh: '建议问题', en: 'Prompt Starters', alias: 'Suggestion Chips',
      html: `<div class="suggest">${[['palette', '帮我配一套科技蓝色板'], ['code', '把这段 CSS 改成 Tailwind'], ['fileText', '总结这份需求文档'], ['chart', '分析上月销售数据']].map(([ic, t]) => `<button type="button" data-act="toast" data-msg="已填入：${t}">${I(ic, 15)}<span>${t}</span></button>`).join('')}</div>` },
    { id: 'citations', zh: '引用来源', en: 'Citations · Sources',
      html: `<p class="cite-p">玻璃拟态在 2020 年随 macOS Big Sur 流行<sup class="ai-cite">1</sup>，核心是 backdrop-filter 模糊<sup class="ai-cite">2</sup>。</p>
        <div class="sources">${[['1', 'Apple · macOS 设计规范', 'developer.apple.com'], ['2', 'MDN · backdrop-filter', 'developer.mozilla.org']].map(([n, t, d]) => `<a href="javascript:void(0)" class="source"><em>${n}</em><div><b>${t}</b><small>${d}</small></div></a>`).join('')}</div>` },
    { id: 'agentsteps', zh: '工具调用 / 任务步骤', en: 'Tool Calls · Agent Steps',
      note: '智能体执行多步任务时，逐步展示每一步的状态。',
      html: `<ul class="agent">${[['done', '搜索“2026 UI 设计趋势”', '找到 12 条结果'], ['done', '读取 3 篇文章', '共 8,400 字'], ['run', '生成对比表格', '进行中…'], ['wait', '导出为 PDF', '等待']].map(([s, t, d]) => `<li class="ag-${s}"><i>${s === 'done' ? I('check', 12, 'line', 3) : s === 'run' ? '<span class="spin"></span>' : ''}</i><div><b>${t}</b><small>${d}</small></div></li>`).join('')}</ul>` },
    { id: 'aigen', zh: '生成中占位', en: 'Generating Placeholder', alias: 'AI Image Loading',
      html: `<div class="ai-gen"><div class="ai-gen-img"><span>${I('sparkle', 18)} 生成中 62%</span></div><div class="progress"><i style="--v:62%"></i></div><small class="muted">“雨后的西湖，水彩风格，16:9”</small></div>` },
    { id: 'voice', zh: '语音输入', en: 'Voice Input', alias: 'Dictation',
      html: `<div class="voice-in"><button type="button" class="voice-btn" data-act="toggleOn" aria-label="录音">${I('mic', 22)}</button><div class="voice-wave">${Array.from({ length: 24 }, (_, i) => `<i style="animation-delay:${(i % 8) * -0.12}s"></i>`).join('')}</div><span class="muted num">00:07</span></div><p class="muted" style="font-size:12px;margin-top:8px">点按麦克风切换录音状态</p>` },
  ]));

  /* AI 回复：复制与流式重新生成 */
  Atlas.acts.copyAi = () => Atlas.copy(document.getElementById('aiStream').textContent.trim());
  Atlas.acts.aiRegen = (el) => {
    const p = document.getElementById('aiStream');
    if (p.classList.contains('streaming')) return;
    if (!p.dataset.full) p.dataset.full = p.innerHTML;
    const text = p.textContent.trim();
    p.textContent = '';
    p.classList.add('streaming');
    el.disabled = true;
    let i = 0;
    const tick = () => {
      i += 1 + Math.floor(Math.random() * 2);
      p.textContent = text.slice(0, i);
      if (i < text.length) { setTimeout(tick, 35); return; }
      p.innerHTML = p.dataset.full;
      p.classList.remove('streaming');
      el.disabled = false;
    };
    setTimeout(tick, 300);
  };
})();
