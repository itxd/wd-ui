/* 全局：点击分发、主题与主题色、检查器与标注、滚动进度与导航高亮、定位、图表提示 */
(function () {
  const I = Atlas.icon;
  const A = Atlas.acts;
  const root = document.documentElement;
  /* 部分浏览器在 file:// 或隐私模式下禁用 localStorage，此时只是不记住偏好 */
  const canStore = (() => {
    try {
      localStorage.setItem('atlas-probe', '1');
      localStorage.removeItem('atlas-probe');
      return true;
    } catch (err) {
      if (err instanceof DOMException) return false;
      throw err;
    }
  })();
  const store = {
    get: (k) => (canStore ? localStorage.getItem(k) : null),
    set: (k, v) => { if (canStore) localStorage.setItem(k, v); },
  };

  /* ---------- 主题 ---------- */
  const themeBtn = document.getElementById('themeToggle');
  const applyTheme = (t) => {
    root.dataset.theme = t;
    themeBtn.innerHTML = I(t === 'dark' ? 'sun' : 'moon', 17);
    document.querySelectorAll('input[data-act="toggleTheme"]').forEach((i) => { i.checked = t === 'dark'; });
    store.set('atlas-theme', t);
  };
  Atlas.toggleTheme = () => applyTheme(root.dataset.theme === 'dark' ? 'light' : 'dark');
  A.toggleTheme = () => Atlas.toggleTheme();
  themeBtn.addEventListener('click', Atlas.toggleTheme);

  /* ---------- 主题色 ---------- */
  const accents = ['#4f46e5', '#1677ff', '#7c3aed', '#db2777', '#ea580c', '#059669', '#0d9488', '#e11d48'];
  const dots = document.getElementById('accentDots');
  dots.innerHTML = accents.map((c) => `<button type="button" class="accent-dot" style="--c:${c}" data-act="applyAccent" data-c="${c}" aria-label="主题色 ${c}"></button>`).join('');
  const applyAccent = (c) => {
    root.style.setProperty('--primary', c);
    root.style.setProperty('--primary-fg', Atlas.readableOn(c));
    dots.querySelectorAll('.accent-dot').forEach((d) => d.classList.toggle('on', d.dataset.c.toLowerCase() === c.toLowerCase()));
    store.set('atlas-accent', c);
  };
  A.applyAccent = (el) => {
    applyAccent(el.dataset.c);
    if (!el.classList.contains('accent-dot')) Atlas.toast(`全站主题色已切换为 ${el.dataset.c}`, 'success');
  };

  /* ---------- 定位到某个元素 ---------- */
  Atlas.locate = (el) => {
    const chain = [];
    for (let p = el.closest('.tab-panel'); p; p = p.parentElement.closest('.tab-panel')) chain.unshift(p);
    chain.forEach((panel) => {
      if (panel.classList.contains('on')) return;
      const btn = document.querySelector(`[data-tg="${panel.dataset.tp}"][data-tt="${panel.id}"]`);
      if (btn) A.tab(btn);
    });
    const view = el.closest('.adm-view');
    if (view && !view.classList.contains('on')) A.admView({ dataset: { view: view.dataset.view } });
    if (el.closest('.style-card.is-hidden')) document.querySelector('[data-act="styleFilter"][data-k="all"]').click();
    if (el.closest('.wf-card.is-hidden')) document.querySelector('[data-act="pageFilter"][data-k="全部"]').click();
    if (el.closest('.cmp.is-hidden, .cmp-cat.is-empty')) {
      const s = document.getElementById('cmpSearch');
      s.value = '';
      s.dispatchEvent(new Event('input'));
    }
    const rv = el.closest('.rv');
    if (rv) rv.classList.add('in');
    setTimeout(() => {
      el.scrollIntoView({ behavior: 'smooth', block: 'center' });
      el.classList.remove('locate-flash');
      void el.offsetWidth;
      el.classList.add('locate-flash');
    }, 80);
  };

  /* ---------- 点击分发 ---------- */
  document.addEventListener('click', (e) => {
    const t = e.target.closest('[data-act]');
    const openPops = [...document.querySelectorAll('.pop.open')];
    openPops.forEach((p) => {
      const owner = p.closest('[data-act="dropdown"], .sel, .ac');
      if (!owner || !owner.contains(e.target)) p.classList.remove('open');
    });
    if (!t) return;
    const fn = A[t.dataset.act];
    if (!fn) throw new Error(`未注册的交互动作：${t.dataset.act}`);
    fn(t, e);
    const pop = t.closest('.pop.open');
    if (pop && t.dataset.act !== 'selectPick' && t.dataset.act !== 'dropdown') pop.classList.remove('open');
  });

  /* ---------- 键盘 ---------- */
  document.addEventListener('keydown', (e) => {
    if ((e.metaKey || e.ctrlKey) && e.key.toLowerCase() === 'k') { e.preventDefault(); A.cmdk(); }
    if (e.key === 'Escape') {
      Atlas.closePops();
      A.phoneLayerClose();
      A.admDrawerClose();
    }
  });

  /* ---------- 检查器：悬停显示组件名 ---------- */
  const tip = document.getElementById('inspectorTip');
  const inspect = document.getElementById('inspectToggle');
  let hoverEl = null;
  const hideTip = () => { tip.classList.remove('show'); if (hoverEl) hoverEl.classList.remove('ui-hover'); hoverEl = null; };
  const syncInspect = () => { document.body.classList.toggle('inspect-on', inspect.checked); if (!inspect.checked) hideTip(); };
  inspect.addEventListener('change', syncInspect);
  document.addEventListener('mouseover', (e) => {
    if (!inspect.checked) return;
    const el = e.target.closest('[data-ui]');
    if (el === hoverEl) return;
    if (hoverEl) hoverEl.classList.remove('ui-hover');
    hoverEl = el;
    if (!el) { tip.classList.remove('show'); return; }
    el.classList.add('ui-hover');
    const [zh, en = ''] = el.dataset.ui.split(' · ');
    tip.innerHTML = `${Atlas.esc(zh)}${en ? `<small>${Atlas.esc(en)}</small>` : ''}`;
    const r = el.getBoundingClientRect();
    const top = r.top - 26 < 64 ? r.top + 4 : r.top - 26;
    tip.style.left = `${Math.max(8, Math.min(r.left, window.innerWidth - tip.offsetWidth - 8))}px`;
    tip.style.top = `${Math.max(64, top)}px`;
    tip.classList.add('show');
  });
  window.addEventListener('scroll', hideTip, { passive: true });
  document.addEventListener('scroll', hideTip, { passive: true, capture: true });

  /* ---------- 全部标注 ---------- */
  const anno = document.getElementById('annoToggle');
  anno.addEventListener('change', () => {
    document.body.classList.toggle('anno-all', anno.checked);
    if (anno.checked) {
      document.querySelectorAll('[data-ui]').forEach((el) => {
        if (['INPUT', 'TEXTAREA', 'IMG', 'SELECT'].includes(el.tagName)) return;
        if (getComputedStyle(el).position === 'static') el.classList.add('anno-host');
        const tag = document.createElement('span');
        tag.className = 'anno-tag';
        tag.textContent = el.dataset.ui.split(' · ')[0];
        el.appendChild(tag);
      });
      Atlas.toast('已在所有示例界面上标注组件名称', 'success');
    } else {
      document.querySelectorAll('.anno-tag').forEach((t) => t.remove());
      document.querySelectorAll('.anno-host').forEach((el) => el.classList.remove('anno-host'));
    }
  });

  /* ---------- 图表悬浮提示 ---------- */
  const ctip = document.getElementById('chartTip');
  document.addEventListener('mousemove', (e) => {
    const m = e.target.closest('[data-tt]');
    if (!m) { ctip.classList.remove('show'); return; }
    ctip.textContent = m.dataset.tt;
    ctip.style.left = `${Math.min(e.clientX + 14, window.innerWidth - ctip.offsetWidth - 10)}px`;
    ctip.style.top = `${e.clientY + 16}px`;
    ctip.classList.add('show');
  });

  /* ---------- 滚动进度、导航高亮、滚动显现 ---------- */
  const bar = document.getElementById('scrollProgress');
  const navLinks = [...document.querySelectorAll('#topnav a')];
  const secs = navLinks.map((a) => document.querySelector(a.getAttribute('href')));
  const onScroll = () => {
    const max = document.documentElement.scrollHeight - window.innerHeight;
    bar.style.transform = `scaleX(${max > 0 ? window.scrollY / max : 0})`;
    let cur = -1;
    secs.forEach((s, i) => { if (s.getBoundingClientRect().top < 140) cur = i; });
    navLinks.forEach((a, i) => a.classList.toggle('on', i === cur));
  };
  window.addEventListener('scroll', onScroll, { passive: true });
  const revealIO = new IntersectionObserver((entries) => entries.forEach((en) => {
    if (en.isIntersecting) { en.target.classList.add('in'); revealIO.unobserve(en.target); }
  }), { rootMargin: '0px 0px -8% 0px' });
  document.querySelectorAll('.rv').forEach((el) => revealIO.observe(el));

  /* ---------- 首屏统计与页脚 ---------- */
  const motionCount = document.querySelectorAll('.mo').length + document.querySelectorAll('.loader-cell, .enter-cell, .ease-row').length;
  const stats = {
    D1: [14, '个可交互示例界面'],
    D2: [Atlas.palettes.length, '套色板 + 15 种渐变'],
    D3: [Atlas.styles.length, '种风格样本'],
    D4: [document.querySelectorAll('.cmp').length + document.querySelectorAll('.wf-card').length, '个组件与页面类型'],
    D5: [motionCount, '种动效'],
  };
  document.querySelectorAll('[data-stat]').forEach((el) => {
    const [n, unit] = stats[el.dataset.stat];
    el.innerHTML = `${n}<small>${unit}</small>`;
  });
  document.getElementById('siteFooter').innerHTML = `
    <div class="wrap">
      <span>UI 图谱 Interface Atlas · 纯 HTML / CSS / JavaScript，无第三方依赖 · 共收录 ${Atlas.glossaryItems.length} 个术语</span>
      <span>形态 × 色系 × 风格 × 功能 × 动效</span>
    </div>`;

  /* ---------- 启动 ---------- */
  const savedTheme = store.get('atlas-theme');
  applyTheme(savedTheme || (window.matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light'));
  applyAccent(store.get('atlas-accent') || accents[0]);
  syncInspect();
  Atlas.runReady();
  onScroll();
})();
