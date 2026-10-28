/* 产品形态示例的交互：后台、Web 页面、手机 */
(function () {
  const A = Atlas.acts;
  const $ = (id) => document.getElementById(id);

  /* ---------- 管理后台 ---------- */
  const viewNames = { dash: '仪表盘', crud: '用户管理', screen: '数据大屏' };
  A.admView = (el) => {
    const app = $('adminApp');
    const v = el.dataset.view;
    app.querySelectorAll('.adm-view').forEach((x) => x.classList.toggle('on', x.dataset.view === v));
    app.querySelectorAll('.adm-menu[data-view]').forEach((x) => x.classList.toggle('on', x.dataset.view === v));
    app.querySelectorAll('.adm-tab').forEach((x) => x.classList.toggle('on', x.dataset.view === v));
    $('admCrumb').textContent = viewNames[v];
    app.querySelector('.adm-body').scrollTop = 0;
  };
  A.admCollapse = () => $('adminApp').classList.toggle('collapsed');
  A.admSubmenu = (el) => el.classList.toggle('is-open');
  A.admDrawer = (el) => {
    const isNew = !el.dataset.name;
    $('admDrawerTitle').textContent = isNew ? '新建用户' : `编辑用户 · ${el.dataset.name}`;
    $('admDrawerName').value = el.dataset.name || '';
    $('admDrawerEmail').value = el.dataset.email || '';
    $('admDrawerEmail').classList.toggle('is-error', isNew);
    $('admDrawerAvatar').textContent = (el.dataset.name || '新')[0];
    $('adminApp').classList.add('drawer-open');
  };
  A.admDrawerClose = () => $('adminApp').classList.remove('drawer-open');
  A.admDrawerSave = () => { A.admDrawerClose(); Atlas.toast('用户信息已保存', 'success'); };
  const syncSel = () => {
    const table = $('admUserTable');
    const boxes = [...table.querySelectorAll('tbody input[type="checkbox"][data-act="admCheckRow"]')];
    const n = boxes.filter((b) => b.checked).length;
    boxes.forEach((b) => b.closest('tr').classList.toggle('is-selected', b.checked));
    const all = table.querySelector('[data-act="admCheckAll"]');
    all.checked = n === boxes.length;
    all.closest('.check').classList.toggle('is-indeterminate', n > 0 && n < boxes.length);
    $('admSelCount').textContent = n;
    $('admSelBar').classList.toggle('is-empty', n === 0);
  };
  A.admCheckRow = syncSel;
  A.admCheckAll = (el) => {
    $('admUserTable').querySelectorAll('tbody [data-act="admCheckRow"]').forEach((b) => { b.checked = el.checked; });
    syncSel();
  };
  A.admClearSel = () => {
    $('admUserTable').querySelectorAll('tbody [data-act="admCheckRow"]').forEach((b) => { b.checked = false; });
    syncSel();
  };

  /* ---------- Web 页面 ---------- */
  A.lpBilling = (el) => {
    document.querySelectorAll('.lp-price[data-m]').forEach((p) => {
      p.textContent = `¥${el.checked ? p.dataset.y : p.dataset.m}`;
      p.classList.remove('bump');
      void p.offsetWidth;
      p.classList.add('bump');
    });
  };
  A.shopThumb = (el) => A.pick(el);
  A.shopSku = (el) => { if (!el.disabled) A.pick(el); };
  A.shopSwatch = (el) => {
    A.pick(el);
    const g = $('shopGallery');
    g.style.setProperty('--prod', el.dataset.c);
    g.style.setProperty('--prod-dark', el.dataset.d);
  };
  const bump = (badge, delta) => {
    const n = (parseInt(badge.textContent, 10) || 0) + delta;
    badge.textContent = n;
    badge.classList.remove('bump');
    void badge.offsetWidth;
    badge.classList.add('bump');
    return n;
  };
  A.shopAdd = (el) => {
    const badge = $('shopCartBadge');
    const from = el.getBoundingClientRect();
    const to = badge.getBoundingClientRect();
    const dot = document.createElement('i');
    dot.className = 'fly-dot';
    document.body.appendChild(dot);
    const x0 = from.left + from.width / 2, y0 = from.top + from.height / 2;
    const dx = to.left - x0, dy = to.top - y0;
    dot.style.left = `${x0}px`;
    dot.style.top = `${y0}px`;
    dot.animate([
      { transform: 'translate(0,0) scale(1)' },
      { transform: `translate(${dx * 0.5}px, ${dy - 80}px) scale(1.2)`, offset: 0.5 },
      { transform: `translate(${dx}px, ${dy}px) scale(.4)`, opacity: 0.6 },
    ], { duration: 650, easing: 'cubic-bezier(.5,0,.5,1)' }).onfinish = () => { dot.remove(); bump(badge, 1); };
    Atlas.toast('已加入购物车', 'success');
  };
  A.like = (el) => el.classList.toggle('liked');

  /* ---------- 手机 ---------- */
  A.chatSend = () => {
    const input = $('chatInput');
    const text = input.value.trim();
    if (!text) { input.focus(); return; }
    const body = $('chatBody');
    const typing = body.querySelector('.typing');
    const msg = document.createElement('div');
    msg.className = 'msg out';
    msg.textContent = text;
    body.insertBefore(msg, typing);
    input.value = '';
    typing.style.display = 'flex';
    body.scrollTop = body.scrollHeight;
    setTimeout(() => {
      const reply = document.createElement('div');
      reply.className = 'msg in';
      reply.textContent = ['收到～', '好主意！', '那就这么定了', '哈哈，可以'][Math.floor(Math.random() * 4)];
      body.insertBefore(reply, typing);
      body.scrollTop = body.scrollHeight;
    }, 1400);
  };
  const ovScreen = () => document.querySelector('.ov-screen');
  const clearLayers = (s) => s.classList.remove('ph-on', 'ly-sheet', 'ly-action', 'ly-alert', 'ly-toast');
  A.phoneLayer = (el) => {
    const s = ovScreen();
    const k = el.dataset.k;
    clearLayers(s);
    if (['sheet', 'action', 'alert'].includes(k)) { s.classList.add('ph-on', `ly-${k}`); return; }
    if (k === 'toast') { s.classList.add('ly-toast'); setTimeout(() => s.classList.remove('ly-toast'), 1600); return; }
    if (k === 'ptr') {
      $('ovBody').scrollTop = 0;
      s.classList.add('ptr-on');
      setTimeout(() => { s.classList.remove('ptr-on'); s.classList.add('ly-toast'); s.querySelector('.ph-toast span').textContent = '已刷新'; setTimeout(() => { s.classList.remove('ly-toast'); s.querySelector('.ph-toast span').textContent = '已保存到相册'; }, 1200); }, 1600);
      return;
    }
    if (k === 'skeleton') { s.classList.add('sk-on'); setTimeout(() => s.classList.remove('sk-on'), 1800); }
  };
  A.phoneLayerClose = () => clearLayers(ovScreen());
  A.mdNav = (el) => A.pick(el);
  A.wxAdd = (el) => {
    bump($('wxCartBadge'), 1);
    const sum = $('wxCartSum');
    const price = parseFloat(el.closest('.wx-goods').querySelector('.wx-price').textContent.replace(/[^\d.]/g, ''));
    sum.textContent = `¥ ${(parseFloat(sum.textContent.replace(/[^\d.]/g, '')) + price).toFixed(2)}`;
    el.animate([{ transform: 'scale(1.4)' }, { transform: 'scale(1)' }], { duration: 300, easing: 'cubic-bezier(.34,1.56,.64,1)' });
  };

  Atlas.onReady(() => {
    /* 数据大屏：时钟与翻牌器 */
    const clock = $('scrClock');
    const digits = $('scrDigits');
    let total = 86421357;
    const paintDigits = (prev) => {
      const s = Atlas.fmt(total);
      const old = prev ? Atlas.fmt(prev) : '';
      digits.innerHTML = s.split('').map((c, i) => (c === ',' ? '<span class="sep">,</span>' : `<span class="${old[i] !== c ? 'flip' : ''}">${c}</span>`)).join('');
    };
    paintDigits();
    setInterval(() => {
      const d = new Date();
      const p = (n) => String(n).padStart(2, '0');
      clock.textContent = `${d.getFullYear()}-${p(d.getMonth() + 1)}-${p(d.getDate())} ${p(d.getHours())}:${p(d.getMinutes())}:${p(d.getSeconds())}`;
    }, 1000);
    setInterval(() => { const prev = total; total += Math.floor(Math.random() * 5000) + 300; paintDigits(prev); }, 3200);

    /* 电商倒计时 */
    let left = 2 * 3600 + 13 * 60 + 45;
    const cd = $('shopCountdown');
    setInterval(() => {
      left = left > 0 ? left - 1 : 3 * 3600;
      const h = Math.floor(left / 3600), m = Math.floor((left % 3600) / 60), s = left % 60;
      cd.innerHTML = [h, m, s].map((n) => `<i>${String(n).padStart(2, '0')}</i>`).join(':');
    }, 1000);

    /* 看板拖拽 */
    const board = document.querySelector('.ws-board');
    let dragging = null;
    board.addEventListener('dragstart', (e) => {
      dragging = e.target.closest('.ws-card');
      if (!dragging) return;
      dragging.classList.add('dragging');
      e.dataTransfer.effectAllowed = 'move';
      e.dataTransfer.setData('text/plain', '');
    });
    board.addEventListener('dragend', () => {
      if (!dragging) return;
      dragging.classList.remove('dragging');
      dragging.classList.add('dropped');
      setTimeout(() => dragging && dragging.classList.remove('dropped'), 500);
      board.querySelectorAll('.ws-col').forEach((c) => {
        c.classList.remove('drag-over');
        c.querySelector('.ws-col-count').textContent = c.querySelectorAll('.ws-card').length;
      });
    });
    board.addEventListener('dragover', (e) => {
      const col = e.target.closest('.ws-col');
      if (!col || !dragging) return;
      e.preventDefault();
      board.querySelectorAll('.ws-col').forEach((c) => c.classList.toggle('drag-over', c === col));
      const body = col.querySelector('.ws-col-body');
      const after = [...body.querySelectorAll('.ws-card:not(.dragging)')].find((c) => e.clientY < c.getBoundingClientRect().top + c.offsetHeight / 2);
      if (after) body.insertBefore(dragging, after); else body.appendChild(dragging);
    });
    board.addEventListener('drop', (e) => e.preventDefault());

    /* 手机首页轮播 */
    document.querySelectorAll('.app-banner').forEach((b) => {
      let i = 0;
      setInterval(() => {
        i = (i + 1) % 3;
        b.querySelector('.app-banner-track').style.transform = `translateX(-${i * 100}%)`;
        b.querySelectorAll('.app-dots i').forEach((d, k) => d.classList.toggle('on', k === i));
      }, 3000);
    });

    /* 聊天回车发送 */
    $('chatInput').addEventListener('keydown', (e) => { if (e.key === 'Enter' && !e.isComposing) A.chatSend(); });
    $('chatBody').querySelector('.typing').style.display = 'none';

    /* 列表项左滑 */
    document.querySelectorAll('[data-swipe]').forEach((cell) => {
      const max = 132;
      let x0 = 0, base = 0, cur = 0;
      cell.addEventListener('pointerdown', (e) => {
        x0 = e.clientX;
        base = cur;
        cell.classList.add('dragging');
        cell.setPointerCapture(e.pointerId);
      });
      cell.addEventListener('pointermove', (e) => {
        if (!cell.classList.contains('dragging')) return;
        cur = Math.min(0, Math.max(-max - 20, base + e.clientX - x0));
        cell.style.transform = `translateX(${cur}px)`;
      });
      const end = () => {
        if (!cell.classList.contains('dragging')) return;
        cell.classList.remove('dragging');
        cur = cur < -max / 2 ? -max : 0;
        cell.style.transform = `translateX(${cur}px)`;
      };
      cell.addEventListener('pointerup', end);
      cell.addEventListener('pointercancel', end);
    });
  });
})();
