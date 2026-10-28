/* 08 组合实验室：形态 × 色系 × 风格 × 圆角 × 密度 × 动效，实时预览并生成设计描述 */
(function () {
  const I = Atlas.icon;
  const forms = [['admin', '管理后台'], ['web', 'Web 官网'], ['app', 'App']];
  const styles = [['flat', '扁平'], ['minimal', '极简'], ['glass', '玻璃拟态'], ['neu', '新拟态'], ['brutal', '新野兽派'], ['dark', '暗黑科技'], ['clay', '粘土拟态'], ['material', 'Material']];
  const densities = [['compact', '紧凑'], ['normal', '标准'], ['comfy', '宽松']];
  const motions = [['none', '无'], ['soft', '柔和'], ['spring', '弹性']];

  const bars = Atlas.series(31, 8, 30, 100).map((v) => `<i style="height:${v}%"></i>`).join('');
  const listItems = [['林小满', '已付款', 'av1'], ['周以安', '配送中', 'av2'], ['陈默', '待发货', 'av3']]
    .map(([n, s, a]) => `<div class="lab-li"><span class="avatar avatar-sm ${a}">${n[0]}</span><b>${n}</b><span class="lab-chip">${s}</span></div>`).join('');

  const admin = `
    <div class="lab-frame lab-admin">
      <aside class="lab-side"><b class="lab-logo">${I('layers', 15)}Nova</b>${['仪表盘', '订单', '用户', '报表', '设置'].map((t, i) => `<a class="${i === 0 ? 'on' : ''}">${I(['home', 'bag', 'users', 'chart', 'settings'][i], 14)}${t}</a>`).join('')}</aside>
      <main class="lab-main">
        <header class="lab-top"><b>仪表盘</b><span class="lab-search">${I('search', 13)}搜索…</span><span class="avatar avatar-sm av4">A</span></header>
        <div class="lab-stats">${[['销售额', '¥128.4K', '+12%'], ['订单', '8,846', '+8%'], ['转化率', '3.6%', '+0.4%']].map(([l, v, d]) => `<div class="lab-card lab-stat"><small>${l}</small><b>${v}</b><em>${d}</em></div>`).join('')}</div>
        <div class="lab-row"><div class="lab-card"><small>近 8 周趋势</small><div class="lab-bars">${bars}</div></div><div class="lab-card lab-list"><small>最新订单</small>${listItems}</div></div>
        <div class="lab-actions"><button class="lab-btn primary" type="button">新建订单</button><button class="lab-btn" type="button">导出</button></div>
      </main>
    </div>`;
  const web = `
    <div class="lab-frame lab-web">
      <header class="lab-nav"><b class="lab-logo">${I('sparkle', 15)}Lumen</b><span>产品</span><span>定价</span><span>文档</span><button class="lab-btn primary sm" type="button">免费试用</button></header>
      <section class="lab-hero"><span class="lab-chip">新功能 · AI 助手</span><h3>让团队协作<br>快十倍</h3><p>任务、文档与数据在同一个工作区。</p><div class="lab-actions"><button class="lab-btn primary" type="button">开始使用</button><button class="lab-btn" type="button">观看演示</button></div></section>
      <div class="lab-feats">${[['zap', '极速', '毫秒级同步'], ['shield', '安全', '端到端加密'], ['bot', '智能', 'AI 自动整理']].map(([ic, t, d]) => `<div class="lab-card"><span class="lab-ic">${I(ic, 16)}</span><b>${t}</b><small>${d}</small></div>`).join('')}</div>
    </div>`;
  const app = `
    <div class="lab-phone"><div class="lab-frame lab-app">
      <header class="lab-app-head"><div><small>早上好</small><b>林小满</b></div><span class="avatar av1">林</span></header>
      <div class="lab-card lab-balance"><small>账户余额（元）</small><b>12,846.50</b><div class="lab-actions"><button class="lab-btn primary" type="button">充值</button><button class="lab-btn" type="button">转账</button></div></div>
      <div class="lab-chips">${['全部', '收入', '支出'].map((t, i) => `<span class="lab-chip${i === 0 ? ' on' : ''}">${t}</span>`).join('')}</div>
      <div class="lab-card lab-list">${listItems}</div>
      <nav class="lab-tabbar">${['home', 'chart', 'wallet', 'user'].map((ic, i) => `<span class="${i === 0 ? 'on' : ''}">${I(ic, 18)}</span>`).join('')}</nav>
    </div></div>`;

  const seg = (key, items, cur) => `<div class="seg lab-seg">${items.map(([v, t]) => `<button type="button" class="${v === cur ? 'on' : ''}" data-act="lab" data-k="${key}" data-v="${v}">${t}</button>`).join('')}</div>`;

  Atlas.mount('lab', `
    <div class="wrap">
      ${Atlas.head({
        no: '08 / 组合实验室',
        title: '把维度组合起来',
        en: 'Playground',
        desc: '在左侧依次选择产品形态、色系、风格、圆角、密度和动效，右侧实时预览组合效果，下方自动生成一段设计描述和设计令牌，可以直接复制给设计师、前端或 AI 作为需求说明。',
        chips: ['形态', '色系', '风格', '圆角', '密度', '动效', '自动生成描述'],
      })}
      <div class="lab rv" id="labRoot">
        <div class="lab-ctrl panel">
          <div class="lab-field"><span>${I('monitor', 14)}产品形态</span>${seg('form', forms, 'admin')}</div>
          <div class="lab-field"><span>${I('palette', 14)}色系</span>
            <div class="lab-pals">${Atlas.palettes.map((p, i) => `<button type="button" class="${i === 0 ? 'on' : ''}" style="--c:${p.c[p.p]}" data-act="lab" data-k="pal" data-v="${i}" data-tip="${p.zh}"></button>`).join('')}</div></div>
          <div class="lab-field"><span>${I('layers', 14)}UI 风格</span><div class="lab-styles">${styles.map(([v, t], i) => `<button type="button" class="${i === 0 ? 'on' : ''}" data-act="lab" data-k="style" data-v="${v}">${t}</button>`).join('')}</div></div>
          <div class="lab-field"><span>${I('box', 14)}圆角 <b class="num" id="labRadiusVal">12px</b></span><input type="range" class="range" min="0" max="28" value="12" id="labRadius" aria-label="圆角"></div>
          <div class="lab-field"><span>${I('columns', 14)}信息密度</span>${seg('density', densities, 'normal')}</div>
          <div class="lab-field"><span>${I('zap', 14)}动效</span><div class="row">${seg('motion', motions, 'soft')}<button class="btn btn-sm" type="button" data-act="labReplay">${I('play', 13)}重播</button></div></div>
        </div>
        <div class="lab-right">
          <div class="lab-preview" id="labPreview" data-form="admin" data-style="flat" data-density="normal" data-motion="soft">
            <div class="lab-bg"><i></i><i></i></div>
            <div class="lab-view" data-v="admin">${admin}</div>
            <div class="lab-view" data-v="web">${web}</div>
            <div class="lab-view" data-v="app">${app}</div>
          </div>
          <div class="lab-out">
            <div class="lab-brief panel"><div class="lab-out-head"><b>${I('fileText', 14)}设计描述 Brief</b><button class="btn btn-ghost btn-xs" type="button" data-act="copyFrom" data-from="labBrief">${I('copy', 12)}复制</button></div><p id="labBrief"></p></div>
            <div class="lab-tokens panel"><div class="lab-out-head"><b>${I('code', 14)}设计令牌 Tokens</b><button class="btn btn-ghost btn-xs" type="button" data-act="copyFrom" data-from="labTokens">${I('copy', 12)}复制</button></div><pre id="labTokens"></pre></div>
          </div>
        </div>
      </div>
    </div>`);

  /* 实验室状态与渲染 */
  const state = { form: 'admin', pal: 0, style: 'flat', radius: 12, density: 'normal', motion: 'soft' };
  const label = (list, v) => list.find((x) => x[0] === v)[1];
  const comps = { admin: '侧边菜单、顶部栏、统计卡片、柱状图、列表、主次按钮', web: '导航栏、首屏 Hero、胶囊徽章、行动按钮、功能卡片', app: '问候头部、余额卡片、筛选纸片、列表、底部标签栏' };
  const motionTok = { none: ['0ms', 'linear'], soft: ['250ms', 'cubic-bezier(.22, 1, .36, 1)'], spring: ['450ms', 'cubic-bezier(.34, 1.56, .64, 1)'] };
  const spaceTok = { compact: 4, normal: 8, comfy: 12 };

  Atlas.labRender = function labRender() {
    const p = Atlas.palettes[state.pal];
    const prim = p.c[p.p];
    const pv = document.getElementById('labPreview');
    pv.dataset.form = state.form;
    pv.dataset.style = state.style;
    pv.dataset.density = state.density;
    pv.dataset.motion = state.motion;
    pv.style.setProperty('--lp', prim);
    pv.style.setProperty('--lp-fg', Atlas.readableOn(prim));
    pv.style.setProperty('--lr', `${state.radius}px`);
    document.getElementById('labRadiusVal').textContent = `${state.radius}px`;
    const [dur, ease] = motionTok[state.motion];
    document.getElementById('labBrief').innerHTML =
      `一个<mark>${label(forms, state.form)}</mark>界面，主色采用<mark>${p.zh} ${prim}</mark>（${p.mood.join('、')}），` +
      `整体为<mark>${label(styles, state.style)}</mark>风格，圆角 <mark>${state.radius}px</mark>，<mark>${label(densities, state.density)}</mark>信息密度，` +
      `动效<mark>${label(motions, state.motion)}</mark>${state.motion === 'none' ? '' : `（${dur}，${state.motion === 'spring' ? '回弹曲线' : '缓出曲线'}）`}。` +
      `核心组件：${comps[state.form]}。适用行业参考：${p.fit}。`;
    document.getElementById('labTokens').textContent =
      `:root {\n  --color-primary: ${prim};\n  --color-on-primary: ${Atlas.readableOn(prim)};\n  --color-palette: ${p.c.join(', ')};\n  --radius: ${state.radius}px;\n  --space-unit: ${spaceTok[state.density]}px;\n  --duration: ${dur};\n  --easing: ${ease};\n  /* style: ${state.style} · form: ${state.form} */\n}`;
  };
  Atlas.labState = state;

  Atlas.acts.lab = (el) => {
    const k = el.dataset.k;
    state[k] = k === 'pal' ? +el.dataset.v : el.dataset.v;
    if (k === 'pal' || k === 'style') Atlas.acts.pick(el);
    Atlas.labRender();
    if (k === 'form' || k === 'style') Atlas.acts.labReplay();
  };
  Atlas.acts.labReplay = () => {
    const v = document.querySelector(`#labPreview .lab-view[data-v="${state.form}"]`);
    v.style.animation = 'none';
    void v.offsetWidth;
    v.style.animation = '';
  };
  Atlas.onReady(() => {
    document.getElementById('labRadius').addEventListener('input', (e) => { state.radius = +e.target.value; Atlas.labRender(); });
    Atlas.labRender();
  });
})();
