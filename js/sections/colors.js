/* 02 色系：色彩角色、15 套色板、主色色阶、配色方法、渐变、明暗模式 */
(function () {
  const I = Atlas.icon;

  const palettes = [
    { zh: '科技蓝', en: 'Tech Blue', c: ['#1677FF', '#0B1F4D', '#69B1FF', '#E6F4FF', '#00C2FF'], p: 0, mood: ['专业', '可信', '理性'], fit: 'B 端系统、金融、政务、SaaS', ref: 'Ant Design、钉钉、支付宝' },
    { zh: '商务深海', en: 'Navy Business', c: ['#1E3A8A', '#0F172A', '#3B82F6', '#CBD5E1', '#F8FAFC'], p: 0, mood: ['稳重', '权威', '克制'], fit: '咨询、银行、企业官网、律所', ref: 'IBM、麦肯锡、招商银行' },
    { zh: '活力橙', en: 'Energetic Orange', c: ['#FF6A00', '#FF9A3C', '#FFD166', '#FFF4E6', '#2B2D42'], p: 0, mood: ['热情', '促销', '食欲'], fit: '电商、外卖、运动、餐饮', ref: '淘宝、橙心优选、Nike 活动页' },
    { zh: '清新绿', en: 'Fresh Green', c: ['#10B981', '#34D399', '#A7F3D0', '#ECFDF5', '#064E3B'], p: 0, mood: ['健康', '环保', '增长'], fit: '健康医疗、环保、理财收益', ref: '微信、Spotify、Robinhood' },
    { zh: '优雅紫', en: 'Elegant Violet', c: ['#7C3AED', '#A78BFA', '#DDD6FE', '#F5F3FF', '#2E1065'], p: 0, mood: ['创意', '神秘', '高端'], fit: 'AI 产品、创意工具、美妆、游戏', ref: 'Twitch、Figma 活动页、Notion AI' },
    { zh: '中国红', en: 'China Red', c: ['#C8102E', '#E63946', '#F4A261', '#FFF1E6', '#3D0C11'], p: 0, mood: ['喜庆', '传统', '热烈'], fit: '节日营销、文化品牌、国潮', ref: '春节活动页、故宫文创、京东' },
    { zh: '莫兰迪', en: 'Morandi', c: ['#A79C93', '#B7B1A5', '#9AA5A0', '#C9B8A8', '#5E6B6E'], p: 4, mood: ['低饱和', '安静', '高级'], fit: '家居、生活方式、女性向品牌', ref: '无印良品、宜家内容页' },
    { zh: '马卡龙', en: 'Macaron', c: ['#FFB5C2', '#B5EAD7', '#C7CEEA', '#FFDAC1', '#E2F0CB'], p: 0, mood: ['甜美', '轻松', '童趣'], fit: '儿童、母婴、甜品、社交', ref: '泡泡玛特、喜茶、小红书活动' },
    { zh: '黑白极简', en: 'Monochrome', c: ['#000000', '#1F1F1F', '#737373', '#E5E5E5', '#FFFFFF'], p: 0, mood: ['克制', '专注', '高级'], fit: '奢侈品、设计工作室、开发者工具', ref: 'Apple、Vercel、Zara' },
    { zh: '赛博霓虹', en: 'Cyber Neon', c: ['#FF2A6D', '#05D9E8', '#7700FF', '#D1F7FF', '#0D0221'], p: 0, mood: ['未来', '刺激', '夜晚'], fit: '游戏、电竞、Web3、音乐节', ref: '赛博朋克 2077、Discord 活动' },
    { zh: '大地自然', en: 'Earth Tone', c: ['#7F5539', '#B08968', '#DDB892', '#EDE0D4', '#606C38'], p: 0, mood: ['温暖', '质朴', '可持续'], fit: '咖啡、农业、户外、手作', ref: 'Patagonia、星巴克臻选' },
    { zh: '薄荷海洋', en: 'Ocean Teal', c: ['#0D9488', '#06B6D4', '#99F6E4', '#F0FDFA', '#134E4A'], p: 0, mood: ['清爽', '平静', '专业'], fit: '旅游、医疗、SaaS、海洋品牌', ref: 'Airbnb 体验页、Teladoc' },
    { zh: '珊瑚日落', en: 'Sunset Coral', c: ['#FF7E5F', '#FEB47B', '#FF5E62', '#FFF5EE', '#4A1C40'], p: 2, mood: ['浪漫', '温暖', '活泼'], fit: '社交、旅行、生活内容', ref: 'Instagram、Tinder、Airbnb' },
    { zh: '暗夜金', en: 'Black Gold', c: ['#C9A227', '#0B0B0C', '#1C1C1E', '#E8D9A8', '#F5F0E1'], p: 0, mood: ['奢华', '尊贵', '稀缺'], fit: '高端会员、酒店、珠宝、白酒', ref: '黑卡会员页、茅台、宝格丽' },
    { zh: '樱花粉', en: 'Sakura Pink', c: ['#EC4899', '#F9A8D4', '#FCE7F3', '#FDF2F8', '#831843'], p: 0, mood: ['浪漫', '女性', '柔和'], fit: '美妆、婚恋、女性社区', ref: '小红书、美图、Glossier' },
  ];
  Atlas.palettes = palettes;

  const palCard = (pl) => {
    const p = pl.c[pl.p];
    const fg = Atlas.readableOn(p);
    return `
    <article class="pal-card rv" data-zh="${pl.zh}" data-en="${pl.en}" data-cat="色系">
      <div class="pal-swatches">
        ${pl.c.map((c, i) => `<button type="button" style="--c:${c};--t:${Atlas.readableOn(c)}" data-act="copy" data-copy="${c}" title="点击复制 ${c}"${i === pl.p ? ' class="is-main"' : ''}><span>${c}</span></button>`).join('')}
      </div>
      <div class="pal-body">
        <div class="pal-title"><b>${pl.zh}</b><em>${pl.en}</em></div>
        <div class="row-wrap">${pl.mood.map((m) => `<span class="pal-mood">${m}</span>`).join('')}</div>
        <dl class="pal-dl"><dt>适用</dt><dd>${pl.fit}</dd><dt>代表</dt><dd>${pl.ref}</dd></dl>
        <div class="pal-preview tok" style="--primary:${p};--primary-fg:${fg}">
          <button class="btn btn-primary btn-sm" type="button">主要按钮</button>
          <button class="btn btn-soft btn-sm" type="button">次要</button>
          <span class="tag tag-primary">标签</span>
          <div class="progress"><i style="--v:68%"></i></div>
        </div>
        <button class="btn btn-sm btn-block pal-apply" type="button" data-act="applyAccent" data-c="${p}">${I('palette', 14)}设为全站主题色</button>
      </div>
    </article>`;
  };

  /* 色阶：用 color-mix 从当前主题色派生，切换主题色时实时变化 */
  const steps = [[50, '#fff', 92], [100, '#fff', 84], [200, '#fff', 66], [300, '#fff', 46], [400, '#fff', 22], [500, null, 0], [600, '#000', 14], [700, '#000', 30], [800, '#000', 46], [900, '#000', 60], [950, '#000', 74]];
  const scale = steps.map(([n, mix, pct]) => {
    const bg = mix ? `color-mix(in srgb, var(--primary), ${mix} ${pct}%)` : 'var(--primary)';
    return `<div class="scale-step" style="--c:${bg}"><i></i><b>${n}</b><small>${mix ? `${mix === '#fff' ? '+白' : '+黑'} ${pct}%` : '主色'}</small></div>`;
  }).join('');

  const grays = ['#f8fafc', '#f1f5f9', '#e2e8f0', '#cbd5e1', '#94a3b8', '#64748b', '#475569', '#334155', '#1e293b', '#0f172a'];
  const semantic = [
    ['success', '成功 Success', '#16A34A', '操作完成、状态正常、上涨', 'checkCircle'],
    ['warning', '警告 Warning', '#F59E0B', '需要注意、即将过期、待处理', 'alert'],
    ['danger', '错误 Error', '#EF4444', '失败、删除、校验错误、下跌', 'xCircle'],
    ['info', '信息 Info', '#0EA5E9', '提示、说明、进行中', 'info'],
  ];

  /* 配色方法：基于同一色相计算 */
  const H = 230;
  const harmonies = [
    ['单色', 'Monochromatic', '同一色相改变明度和饱和度，最稳妥、最统一', [0], [[H, 70, 28], [H, 70, 42], [H, 70, 56], [H, 70, 72], [H, 70, 88]]],
    ['类比色', 'Analogous', '色环上相邻 30° 的颜色，和谐自然', [-30, 0, 30], [[H - 30, 70, 55], [H, 70, 55], [H + 30, 70, 58], [H, 30, 92], [H, 30, 20]]],
    ['互补色', 'Complementary', '色环对面 180°，对比最强，适合强调 CTA', [0, 180], [[H, 75, 50], [H, 60, 80], [H + 180, 85, 55], [H + 180, 70, 85], [H, 20, 18]]],
    ['分裂互补', 'Split-Complementary', '主色 + 互补色两侧 ±30°，对比强但更柔和', [0, 150, 210], [[H, 75, 50], [H + 150, 70, 55], [H + 210, 75, 58], [H, 30, 94], [H, 20, 18]]],
    ['三角色', 'Triadic', '色环上间隔 120° 的三色，活泼丰富', [0, 120, 240], [[H, 70, 52], [H + 120, 65, 48], [H + 240, 75, 58], [H, 25, 94], [H, 20, 18]]],
    ['四方色', 'Tetradic', '间隔 90° 的四色，需要选一个作为主导', [0, 90, 180, 270], [[H, 70, 52], [H + 90, 70, 55], [H + 180, 75, 55], [H + 270, 60, 50], [H, 20, 18]]],
  ];
  const hsl = ([h, s, l]) => `hsl(${(h + 360) % 360} ${s}% ${l}%)`;
  const harmonyCard = ([zh, en, desc, angles, sw]) => `
    <div class="harm-card rv">
      <div class="harm-wheel">${angles.map((a) => `<i style="--a:${H + a}deg;--c:hsl(${(H + a + 360) % 360} 75% 52%)"></i>`).join('')}</div>
      <div class="harm-body">
        <b>${zh}<em>${en}</em></b><p>${desc}</p>
        <div class="harm-sw">${sw.map((c) => `<span style="background:${hsl(c)}"></span>`).join('')}</div>
      </div>
    </div>`;

  const grads = [
    ['极光', 'Linear · 线性', 'linear-gradient(135deg, #a78bfa, #f472b6, #fb923c)'],
    ['深海', 'Linear · 线性', 'linear-gradient(135deg, #0ea5e9, #2563eb 50%, #1e1b4b)'],
    ['日落', 'Linear · 线性', 'linear-gradient(160deg, #fde047, #fb7185 50%, #7c3aed)'],
    ['薄荷', 'Linear · 线性', 'linear-gradient(135deg, #d9f99d, #34d399 50%, #0d9488)'],
    ['光晕', 'Radial · 径向', 'radial-gradient(circle at 30% 30%, #ffffff 0, #c4b5fd 30%, #4c1d95 80%)'],
    ['色环', 'Conic · 锥形', 'conic-gradient(from 180deg, #f43f5e, #f59e0b, #10b981, #3b82f6, #a855f7, #f43f5e)'],
    ['网格渐变', 'Mesh · 多点径向叠加', 'radial-gradient(at 20% 20%, #fbcfe8 0, transparent 50%), radial-gradient(at 80% 0%, #a5f3fc 0, transparent 50%), radial-gradient(at 80% 80%, #c7d2fe 0, transparent 50%), radial-gradient(at 0% 100%, #fde68a 0, transparent 50%), #ffffff'],
    ['暗夜霓虹', 'Mesh · 深色', 'radial-gradient(at 30% 20%, #ec4899 0, transparent 45%), radial-gradient(at 75% 80%, #06b6d4 0, transparent 45%), #0b0b1a'],
    ['金属拉丝', 'Metallic · 多停点', 'linear-gradient(135deg, #e5e7eb, #9ca3af 30%, #f9fafb 50%, #6b7280 70%, #d1d5db)'],
    ['全息镭射', 'Holographic', 'linear-gradient(120deg, #a5f3fc, #c4b5fd, #fbcfe8, #fde68a, #a7f3d0)'],
    ['硬边分割', 'Hard Stop · 硬停点', 'linear-gradient(135deg, #111827 50%, #f43f5e 50%)'],
    ['柔和粉彩', 'Pastel', 'linear-gradient(135deg, #fef3c7, #fce7f3, #e0e7ff)'],
    ['颗粒质感', 'Grain · 噪点叠加', 'linear-gradient(135deg, #f97316, #db2777)', 'grain'],
    ['流动渐变', 'Animated · 动态', 'linear-gradient(120deg, #6366f1, #ec4899, #f59e0b, #10b981, #6366f1)', 'grad-anim'],
    ['玻璃叠层', 'Glass Overlay', 'linear-gradient(135deg, rgba(255,255,255,.5), rgba(255,255,255,.05)), linear-gradient(135deg, #0ea5e9, #8b5cf6)', 'grad-glass'],
  ];

  const tokenRows = (dark) => [
    ['--bg', '页面背景', dark ? '#0A0C10' : '#F5F6F8'], ['--card', '表面 / 卡片', dark ? '#12161D' : '#FFFFFF'],
    ['--fg', '主文字', dark ? '#EEF1F6' : '#0B1220'], ['--fg-3', '次要文字', dark ? '#8A94A6' : '#6B7486'], ['--border', '边框', dark ? '#232935' : '#E4E7EC'],
  ].map(([k, n, v]) => `<tr><td><code>${k}</code></td><td>${n}</td><td><span class="tok-sw" style="background:${v}"></span><code>${v}</code></td></tr>`).join('');
  const modeDemo = (mode) => `
    <div class="mode-panel" data-theme="${mode}">
      <div class="mode-head"><b>${mode === 'light' ? `${I('sun', 15)}浅色模式 Light` : `${I('moon', 15)}深色模式 Dark`}</b><span class="tag">${mode === 'light' ? '默认' : '夜间 / 沉浸'}</span></div>
      <div class="mode-ui">
        <div class="mode-card">
          <div class="row"><span class="avatar av3">陈</span><div><b>陈默</b><small class="muted">产品设计师</small></div><span class="spacer"></span><span class="tag tag-success">在线</span></div>
          <p>深色模式不是简单反色：背景用深灰而不是纯黑，层级越高表面越亮，文字降低到 87% 左右的亮度。</p>
          <div class="row"><button class="btn btn-primary btn-sm" type="button">确认</button><button class="btn btn-sm" type="button">取消</button><span class="spacer"></span><span class="muted">${I('clock', 13)}</span></div>
        </div>
        <div class="alert alert-warning">${I('alert', 15)}<div><b>注意对比度</b><p>正文与背景对比度至少 4.5 : 1。</p></div></div>
      </div>
      <table class="tbl tbl-compact mode-tokens"><tbody>${tokenRows(mode === 'dark')}</tbody></table>
    </div>`;

  Atlas.mount('colors', `
    <div class="wrap">
      ${Atlas.head({
        no: '02 / 色系',
        title: '色系与配色',
        en: 'Color System',
        desc: '颜色决定界面的情绪和识别度。一个完整的色彩系统 = 主色 + 辅助色 + 中性色 + 功能色，再配上明暗两套取值。点击下方色块可以复制色值；点击“设为全站主题色”，整个页面的示例都会换成这套主色。',
        chips: ['主色 Primary', '中性色 Neutral', '功能色 Semantic', '60-30-10', '色阶', '渐变', '明暗模式'],
      })}

      ${Atlas.sub({ title: '色彩角色', en: 'Color Roles', desc: '先分配角色，再挑颜色。同一个蓝色，当主色用和当信息提示色用，出现的位置和面积完全不同。' })}
      <div class="roles">
        <div class="role-card rv role-primary">
          <span class="role-sw" style="background:var(--primary)"></span>
          <b>主色 Primary</b><p>品牌识别色。用于主按钮、链接、选中态、进度条。面积约 10%。</p>
          <div class="row-wrap"><button class="btn btn-primary btn-sm" type="button">主按钮</button><a class="btn btn-text" href="javascript:void(0)">文字链接</a><span class="tag tag-primary">选中</span></div>
        </div>
        <div class="role-card rv">
          <span class="role-sw" style="background:linear-gradient(135deg, #ec4899, #f59e0b)"></span>
          <b>辅助色 / 强调色 Secondary · Accent</b><p>与主色搭配，用于插画、图表系列、营销角标，避免与功能色冲突。</p>
          <div class="row-wrap"><span class="tag" style="background:#fce7f3;color:#be185d;border-color:#fbcfe8">新品</span><span class="tag" style="background:#fef3c7;color:#b45309;border-color:#fde68a">限时</span></div>
        </div>
        <div class="role-card rv role-neutral">
          <b>中性色 Neutral</b><p>文字、边框、背景、分割线。界面 60% 以上的面积都是中性色。</p>
          <div class="gray-scale">${grays.map((g, i) => `<span style="background:${g}" title="${g}"><small style="color:${i < 5 ? '#334155' : '#e2e8f0'}">${[50, 100, 200, 300, 400, 500, 600, 700, 800, 900][i]}</small></span>`).join('')}</div>
        </div>
        <div class="role-card rv role-semantic">
          <b>功能色 Semantic</b><p>表达状态，含义固定、全局一致，不拿来做装饰。</p>
          <div class="sem-list">${semantic.map(([k, n, hex, use, ic]) => `<div class="sem-item" style="--c:var(--${k})">${I(ic, 15)}<b>${n}</b><code>${hex}</code><small>${use}</small></div>`).join('')}</div>
        </div>
      </div>

      <div class="ratio rv">
        <div class="ratio-text"><b>60 – 30 – 10 法则</b><p>60% 主导色（通常是中性背景），30% 次要色（卡片、侧栏、模块底色），10% 强调色（按钮、链接、关键数字）。比例对了，界面就不会“花”。</p></div>
        <div class="ratio-bar"><span style="flex:60">60% 中性背景</span><span style="flex:30">30% 次要表面</span><span style="flex:10">10%</span></div>
        <div class="ratio-demo">
          <div class="ratio-side"><i></i><i></i><i></i></div>
          <div class="ratio-main"><div class="ratio-card"><i></i><i></i><b>¥ 86,420</b><span class="ratio-btn">查看</span></div><div class="ratio-card"><i></i><i></i><i></i></div></div>
        </div>
      </div>

      ${Atlas.sub({ title: '15 套常用色板', en: 'Palettes', desc: '每套色板标注了情绪关键词、适用行业和代表品牌。色板的第一个大色块是主色。' })}
      <div class="pal-grid">${palettes.map(palCard).join('')}</div>

      ${Atlas.sub({ title: '主色色阶', en: 'Tonal Scale 50 – 950', desc: '一个主色要扩展成 10 级左右的色阶：浅色用于背景和选中底色，深色用于悬停、按下和文字。下面的色阶随右上角主题色实时变化。' })}
      <div class="scale rv">${scale}</div>
      <div class="scale-uses rv">
        <span><i style="background:color-mix(in srgb, var(--primary), #fff 92%)"></i>50–100：选中行、标签底色</span>
        <span><i style="background:color-mix(in srgb, var(--primary), #fff 46%)"></i>300–400：边框、禁用态、图表浅色</span>
        <span><i style="background:var(--primary)"></i>500：按钮、链接（基准色）</span>
        <span><i style="background:color-mix(in srgb, var(--primary), #000 14%)"></i>600–700：悬停 / 按下</span>
        <span><i style="background:color-mix(in srgb, var(--primary), #000 60%)"></i>900：深色文字、深色背景</span>
      </div>

      ${Atlas.sub({ title: '配色方法', en: 'Color Harmony', desc: '从色环上取色的六种经典方法。以下都以同一个蓝色（色相 230°）为基准，最后两格是配套的浅色背景和深色文字。' })}
      <div class="harm-grid">${harmonies.map(harmonyCard).join('')}</div>

      ${Atlas.sub({ title: '渐变', en: 'Gradients', desc: '渐变是现代界面最常用的氛围手段。点击任意渐变即可复制 CSS。' })}
      <div class="grad-grid">
        ${grads.map(([n, t, css, cls]) => `
          <button class="grad-tile rv ${cls || ''}" type="button" style="--g:${css}" data-act="copy" data-copy="background: ${css};" data-zh="${n}" data-en="${t}" data-cat="渐变">
            <span class="grad-fill"></span><span class="grad-meta"><b>${n}</b><small>${t}</small><em>${I('copy', 12)} 复制 CSS</em></span>
          </button>`).join('')}
      </div>

      ${Atlas.sub({ title: '明暗模式', en: 'Light & Dark', desc: '同一套组件在浅色与深色下的取值。用语义化令牌（如 --bg、--card、--fg）写样式，切换主题时只需替换令牌值。' })}
      <div class="modes rv">${modeDemo('light')}${modeDemo('dark')}</div>
    </div>`);
})();
