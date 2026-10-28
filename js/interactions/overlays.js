/* 全局浮层：Toast、通知、对话框、确认框、抽屉、命令面板、灯箱 */
(function () {
  const I = Atlas.icon;
  const A = Atlas.acts;
  const $ = (id) => document.getElementById(id);

  /* ---------- Toast ---------- */
  const toastIcons = { success: 'checkCircle', error: 'xCircle', warning: 'alert', info: 'info', undo: 'trash' };
  Atlas.toast = (msg, type = 'info') => {
    const host = $('toastHost');
    const el = document.createElement('div');
    el.className = `toast t-${type}`;
    const ic = type === 'loading' ? '<span class="spin"></span>' : I(toastIcons[type] || 'info', 16);
    el.innerHTML = `${ic}<span>${Atlas.esc(msg)}</span>${type === 'undo' ? '<button type="button" class="toast-undo">撤销</button>' : ''}`;
    host.appendChild(el);
    const close = () => {
      el.classList.add('leave');
      el.addEventListener('animationend', () => el.remove(), { once: true });
    };
    const undo = el.querySelector('.toast-undo');
    if (undo) undo.addEventListener('click', () => { close(); Atlas.toast('已撤销删除', 'success'); });
    setTimeout(close, type === 'loading' ? 1800 : 2600);
    if (type === 'loading') setTimeout(() => Atlas.toast('上传完成', 'success'), 1900);
  };
  A.toast = (el) => Atlas.toast(el.dataset.msg || '操作成功', el.dataset.type || 'success');

  /* ---------- 通知 Notification ---------- */
  Atlas.notify = (title, desc, kind = 'info') => {
    const host = $('notifyHost');
    const el = document.createElement('div');
    el.className = 'notify';
    el.innerHTML = `
      <span class="notify-ic ${kind}">${I(kind === 'success' ? 'checkCircle' : 'bell', 18)}</span>
      <div class="notify-body"><b>${Atlas.esc(title)}</b><p>${Atlas.esc(desc)}</p>
        <div class="row"><button type="button" class="btn btn-primary btn-xs">查看</button><button type="button" class="btn btn-xs notify-x">忽略</button></div></div>
      <button type="button" class="notify-close notify-x" aria-label="关闭">${I('x', 14)}</button>
      <i class="notify-timer"></i>`;
    host.prepend(el);
    const close = () => {
      if (el.classList.contains('leave')) return;
      el.classList.add('leave');
      el.addEventListener('animationend', () => el.remove(), { once: true });
    };
    el.querySelectorAll('.notify-x').forEach((b) => b.addEventListener('click', close));
    setTimeout(close, 5200);
  };
  A.notify = (el) => Atlas.notify(el.dataset.title, el.dataset.desc, el.dataset.kind);

  /* ---------- 浮层容器通用 ---------- */
  function openLayer(cls, html, onClose) {
    const host = $('overlayHost');
    const wrap = document.createElement('div');
    wrap.className = `layer ${cls}`;
    wrap.innerHTML = `<div class="layer-mask" data-close></div>${html}`;
    host.appendChild(wrap);
    requestAnimationFrame(() => wrap.classList.add('open'));
    const close = () => {
      wrap.classList.remove('open');
      wrap.classList.add('closing');
      setTimeout(() => wrap.remove(), 320);
      document.removeEventListener('keydown', onKey);
      if (onClose) onClose();
    };
    const onKey = (e) => { if (e.key === 'Escape') close(); };
    document.addEventListener('keydown', onKey);
    wrap.addEventListener('click', (e) => { if (e.target.closest('[data-close]')) close(); });
    return { wrap, close };
  }
  Atlas.openLayer = openLayer;

  /* ---------- 对话框 / 确认框 ---------- */
  A.modal = () => {
    openLayer('layer-modal', `
      <div class="modal" role="dialog" aria-modal="true" aria-label="创建项目">
        <header><b>创建新项目</b><button type="button" class="btn btn-ghost btn-sm btn-icon" data-close aria-label="关闭">${I('x', 16)}</button></header>
        <div class="modal-body">
          <label><span class="form-label"><i class="req">*</i>项目名称</span><input class="input" value="官网改版 2026"></label>
          <label><span class="form-label">可见范围</span><div class="seg"><button type="button" class="on">仅团队</button><button type="button">公司内</button><button type="button">公开</button></div></label>
          <label><span class="form-label">描述</span><textarea class="textarea" placeholder="简单说明项目目标"></textarea></label>
        </div>
        <footer><button type="button" class="btn" data-close>取消</button><button type="button" class="btn btn-primary" data-close data-act="toast" data-msg="项目已创建">创建</button></footer>
      </div>`);
  };
  A.confirm = (el) => {
    openLayer('layer-modal', `
      <div class="modal modal-confirm" role="alertdialog" aria-modal="true">
        <div class="confirm-row"><span class="confirm-ic">${I('alert', 22)}</span><div><b>${Atlas.esc(el.dataset.title || '确定执行此操作？')}</b><p>${Atlas.esc(el.dataset.desc || '')}</p></div></div>
        <footer><button type="button" class="btn" data-close>取消</button><button type="button" class="btn btn-danger" data-close data-act="toast" data-type="undo" data-msg="已删除">确定删除</button></footer>
      </div>`);
  };

  /* ---------- 抽屉 ---------- */
  A.drawer = (el) => {
    const side = el.dataset.side || 'right';
    openLayer(`layer-drawer side-${side}`, `
      <aside class="drawer" role="dialog" aria-modal="true" aria-label="筛选">
        <header><b>${side === 'bottom' ? '分享到' : '高级筛选'}</b><button type="button" class="btn btn-ghost btn-sm btn-icon" data-close aria-label="关闭">${I('x', 16)}</button></header>
        <div class="drawer-body">
          ${side === 'bottom' ? `<div class="drawer-share">${[['message', '微信'], ['link', '复制链接'], ['mail', '邮件'], ['download', '下载']].map(([ic, t]) => `<span>${I(ic, 22)}<small>${t}</small></span>`).join('')}</div>` : `
          <span class="form-label">状态</span><div class="row-wrap">${['全部', '进行中', '已完成', '已归档'].map((t, i) => `<span class="tag tag-round chip-check${i === 0 ? ' on' : ''}" data-act="toggleOn">${t}</span>`).join('')}</div>
          <span class="form-label">负责人</span><div class="avatar-group">${['av1', 'av2', 'av3', 'av4'].map((a, i) => `<span class="avatar ${a}">${'林周陈苏'[i]}</span>`).join('')}</div>
          <span class="form-label">截止日期</span><div class="input fake-select">${I('calendar', 14)}<span>2026-11-01 → 2026-11-30</span></div>
          <span class="form-label">优先级</span><div class="col">${['紧急', '高', '中', '低'].map((t, i) => `<label class="check"><input type="checkbox"${i < 2 ? ' checked' : ''}><span class="check-box">${I('check', 12, 'line', 3)}</span>${t}</label>`).join('')}</div>`}
        </div>
        ${side === 'bottom' ? '' : `<footer><button type="button" class="btn" data-close>重置</button><button type="button" class="btn btn-primary" data-close data-act="toast" data-msg="已应用筛选条件">应用筛选</button></footer>`}
      </aside>`);
  };

  /* ---------- 命令面板 ---------- */
  const sections = [['platforms', '产品形态'], ['colors', '色系'], ['foundations', '基础规范'], ['styles', 'UI 风格'], ['pages', '页面类型'], ['components', '组件库'], ['motion', '动效'], ['lab', '组合实验室'], ['glossary', '术语索引']];
  const actions = [
    ['moon', '切换明暗模式', () => Atlas.toggleTheme()],
    ['pointer', '开关组件检查器', () => document.getElementById('inspectToggle').click()],
    ['tag', '开关全部标注', () => document.getElementById('annoToggle').click()],
    ['palette', '随机主题色', () => { const dots = document.querySelectorAll('.accent-dot'); dots[Math.floor(Math.random() * dots.length)].click(); }],
  ];
  A.cmdk = () => {
    if (document.querySelector('.layer-cmdk')) return;
    const { wrap, close } = openLayer('layer-cmdk', `
      <div class="cmdk" role="dialog" aria-modal="true" aria-label="命令面板">
        <div class="cmdk-input">${I('search', 18)}<input placeholder="搜索章节、组件、动效，或输入命令…" autocomplete="off"><span class="kbd">Esc</span></div>
        <div class="cmdk-list"></div>
        <footer><span><span class="kbd">↑</span><span class="kbd">↓</span> 选择</span><span><span class="kbd">↵</span> 打开</span><span class="spacer"></span><span>共 ${Atlas.glossaryItems.length} 条可搜索</span></footer>
      </div>`);
    const input = wrap.querySelector('input');
    const list = wrap.querySelector('.cmdk-list');
    let rows = [];
    let cur = 0;
    const render = () => {
      const q = input.value.trim().toLowerCase();
      const groups = [];
      const nav = sections.filter(([, t]) => !q || t.includes(q)).map(([id, t]) => ({ icon: 'hash', t, sub: '章节', run: () => document.getElementById(id).scrollIntoView({ behavior: 'smooth' }) }));
      const act = actions.filter(([, t]) => !q || t.includes(q)).map(([ic, t, fn]) => ({ icon: ic, t, sub: '操作', run: fn }));
      const hits = q ? Atlas.glossaryItems.filter((it) => `${it.zh} ${it.en} ${it.alias}`.toLowerCase().includes(q)).slice(0, 12)
        .map((it) => ({ icon: 'arrowUR', t: `${it.zh}  ${it.en}`, sub: it.cat, run: () => Atlas.locate(it.el) })) : [];
      if (hits.length) groups.push(['页面中的条目', hits]);
      if (nav.length) groups.push(['跳转到章节', nav]);
      if (act.length) groups.push(['操作', act]);
      rows = groups.flatMap((g) => g[1]);
      cur = Math.min(cur, Math.max(rows.length - 1, 0));
      let k = 0;
      list.innerHTML = rows.length ? groups.map(([g, rs]) => `<div class="cmdk-group">${g}</div>${rs.map((r) => `<div class="cmdk-item${k === cur ? ' on' : ''}" data-k="${k++}">${I(r.icon, 15)}<span>${Atlas.esc(r.t)}</span><small>${Atlas.esc(r.sub)}</small></div>`).join('')}`).join('')
        : '<p class="cmdk-empty">没有找到结果</p>';
    };
    const run = (k) => { const r = rows[k]; if (!r) return; close(); setTimeout(r.run, 120); };
    input.addEventListener('input', () => { cur = 0; render(); });
    input.addEventListener('keydown', (e) => {
      if (e.key === 'ArrowDown') { cur = Math.min(cur + 1, rows.length - 1); render(); e.preventDefault(); }
      if (e.key === 'ArrowUp') { cur = Math.max(cur - 1, 0); render(); e.preventDefault(); }
      if (e.key === 'Enter') run(cur);
      const on = list.querySelector('.cmdk-item.on');
      if (on) on.scrollIntoView({ block: 'nearest' });
    });
    list.addEventListener('click', (e) => { const it = e.target.closest('.cmdk-item'); if (it) run(+it.dataset.k); });
    list.addEventListener('mousemove', (e) => {
      const it = e.target.closest('.cmdk-item');
      if (it && +it.dataset.k !== cur) { cur = +it.dataset.k; list.querySelectorAll('.cmdk-item').forEach((x) => x.classList.toggle('on', x === it)); }
    });
    render();
    setTimeout(() => input.focus(), 50);
  };

  /* ---------- 灯箱 ---------- */
  const shots = [['s-forest', '莫干山 · 竹林'], ['s-sunset', '安吉 · 日落'], ['s-sea', '千岛湖 · 海岸'], ['s-night', '星空 · 银河']];
  A.lightbox = (el) => {
    let i = +el.dataset.i;
    const { wrap } = openLayer('layer-lightbox', `
      <div class="lb">
        <div class="lb-img"></div>
        <div class="lb-bar"><span class="lb-cap"></span><span class="lb-count num"></span></div>
        <button type="button" class="lb-nav l" aria-label="上一张">${I('chevL', 22)}</button><button type="button" class="lb-nav r" aria-label="下一张">${I('chevR', 22)}</button>
        <button type="button" class="lb-close" data-close aria-label="关闭">${I('x', 20)}</button>
      </div>`);
    const show = () => {
      const img = wrap.querySelector('.lb-img');
      img.className = `lb-img ${shots[i][0]}`;
      img.animate([{ opacity: 0, transform: 'scale(.96)' }, { opacity: 1, transform: 'none' }], { duration: 300, easing: 'cubic-bezier(.22,1,.36,1)' });
      wrap.querySelector('.lb-cap').textContent = shots[i][1];
      wrap.querySelector('.lb-count').textContent = `${i + 1} / ${shots.length}`;
    };
    wrap.querySelector('.lb-nav.l').addEventListener('click', () => { i = (i + shots.length - 1) % shots.length; show(); });
    wrap.querySelector('.lb-nav.r').addEventListener('click', () => { i = (i + 1) % shots.length; show(); });
    show();
  };
})();
