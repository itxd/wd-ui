/* 通用组件交互：标签、选择器、步骤条、分页、表单类控件、轮播、树、表格排序等 */
(function () {
  const I = Atlas.icon;
  const A = Atlas.acts;

  /* ---------- 切换类 ---------- */
  A.tab = (el) => {
    const g = el.dataset.tg;
    document.querySelectorAll(`[data-tg="${g}"]`).forEach((b) => b.classList.toggle('on', b === el));
    document.querySelectorAll(`[data-tp="${g}"]`).forEach((p) => p.classList.toggle('on', p.id === el.dataset.tt));
    const panel = document.getElementById(el.dataset.tt);
    panel.querySelectorAll('.rv:not(.in)').forEach((r) => r.classList.add('in'));
  };
  A.pick = (el) => [...el.parentElement.children].forEach((c) => c.classList.toggle('on', c === el));
  A.miniNav = A.pick;
  A.toggleOn = (el) => (el.dataset.target === 'parent' ? el.parentElement : el).classList.toggle('on');
  A.vmenu = (el) => {
    el.closest('.v-menu').querySelectorAll('a').forEach((a) => a.classList.toggle('on', a === el));
  };
  A.vsub = (el) => el.classList.toggle('open');
  A.closeParent = (el) => {
    const box = el.parentElement;
    box.animate([{ opacity: 1, transform: 'none' }, { opacity: 0, transform: 'translateX(20px)' }], { duration: 250, easing: 'ease-in' }).onfinish = () => box.remove();
  };
  A.treeToggle = (el) => el.parentElement.classList.toggle('open');
  A.skToggle = () => document.getElementById('skDemo').classList.toggle('loaded');
  A.backTop = () => { document.getElementById('btBox').scrollTop = 0; };

  /* 下拉与选择器 */
  Atlas.closePops = (except) => document.querySelectorAll('.pop.open').forEach((p) => { if (!except || !except.contains(p)) p.classList.remove('open'); });
  A.dropdown = (el, e) => {
    const pop = el.querySelector(':scope > .pop');
    if (e.target.closest('.pop') && !e.target.closest('[data-act]:not([data-act="dropdown"])')) { pop.classList.remove('open'); return; }
    if (e.target.closest('.pop')) return;
    const willOpen = !pop.classList.contains('open');
    Atlas.closePops();
    pop.classList.toggle('open', willOpen);
  };
  A.selectOpen = (el) => {
    const pop = el.closest('.sel').querySelector('.sel-pop');
    const willOpen = !pop.classList.contains('open');
    Atlas.closePops();
    pop.classList.toggle('open', willOpen);
  };
  A.selectPick = (el) => {
    const sel = el.closest('.sel');
    const box = sel.querySelector('.fake-select');
    if (sel.hasAttribute('data-multi')) {
      el.classList.toggle('is-active');
      const picked = [...sel.querySelectorAll('.pop-item.is-active')].map((p) => p.textContent.trim());
      box.querySelector('.ms-tags').innerHTML = picked.length ? picked.map((t) => `<span class="tag tag-primary">${t}</span>`).join('') : '<span class="ph">请选择</span>';
      return;
    }
    sel.querySelectorAll('.pop-item').forEach((p) => p.classList.toggle('is-active', p === el));
    box.querySelector('span').className = '';
    box.querySelector('span').textContent = el.textContent.trim();
    sel.querySelector('.sel-pop').classList.remove('open');
  };

  /* ---------- 表单类 ---------- */
  A.step = (el) => {
    const input = el.parentElement.querySelector('input');
    const v = Math.min(99, Math.max(1, (parseInt(input.value, 10) || 1) + Number(el.dataset.d)));
    input.value = v;
    input.animate([{ transform: `translateY(${el.dataset.d > 0 ? 6 : -6}px)`, opacity: 0.3 }, { transform: 'none', opacity: 1 }], { duration: 220, easing: 'ease-out' });
  };
  A.clearInput = (el) => { const input = el.closest('.field').querySelector('input'); input.value = ''; input.focus(); };
  A.pwdToggle = (el) => {
    const input = el.closest('.field').querySelector('input');
    const show = input.type === 'password';
    input.type = show ? 'text' : 'password';
    el.innerHTML = I(show ? 'eyeOff' : 'eye', 14);
  };
  A.pickDay = (el) => {
    el.parentElement.querySelectorAll('button').forEach((b) => b.classList.remove('sel', 'end', 'in-range'));
    el.classList.add('sel');
  };
  A.tagRemove = (el) => {
    const tag = el.closest('.tag');
    tag.animate([{ opacity: 1, transform: 'scale(1)' }, { opacity: 0, transform: 'scale(.6)' }], { duration: 200, easing: 'ease-in' }).onfinish = () => tag.remove();
  };
  A.transferMove = (el) => {
    const root = el.closest('[data-transfer]');
    const from = root.querySelector(`[data-side="${el.dataset.to === 'r' ? 'l' : 'r'}"]`);
    const to = root.querySelector(`[data-side="${el.dataset.to}"]`);
    const moved = [...from.querySelectorAll('label')].filter((l) => l.querySelector('input').checked);
    if (!moved.length) { Atlas.toast('请先勾选要移动的成员', 'warning'); return; }
    moved.forEach((l) => {
      l.querySelector('input').checked = false;
      to.appendChild(l);
      l.animate([{ opacity: 0, transform: `translateX(${el.dataset.to === 'r' ? -20 : 20}px)` }, { opacity: 1, transform: 'none' }], { duration: 300, easing: 'cubic-bezier(.22,1,.36,1)' });
    });
    root.querySelectorAll('.tf-list').forEach((list) => { list.querySelector('.tf-head small').textContent = `${list.querySelectorAll('label').length} 项`; });
  };
  A.validateDemo = (el) => {
    const form = el.closest('form');
    const nick = form.querySelector('[name="nick"]');
    const mail = form.querySelector('[name="mail"]');
    const set = (input, msg) => {
      const help = input.parentElement.querySelector('.form-help');
      input.classList.toggle('is-error', !!msg);
      input.classList.toggle('is-ok', !msg);
      help.classList.toggle('is-error', !!msg);
      help.textContent = msg || '格式正确';
      return !msg;
    };
    const ok1 = set(nick, nick.value.trim().length < 2 || nick.value.trim().length > 12 ? '昵称需要 2–12 个字' : '');
    const ok2 = set(mail, /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(mail.value.trim()) ? '' : '请输入有效的邮箱地址');
    if (ok1 && ok2) { Atlas.toast('提交成功', 'success'); return; }
    el.classList.remove('shake');
    void el.offsetWidth;
    el.classList.add('shake');
  };
  A.uploadSim = () => {
    const list = document.getElementById('upList');
    const names = ['设计稿-首页.fig', '用户访谈记录.docx', '品牌手册.pdf', '产品截图.png'];
    const item = document.createElement('div');
    item.className = 'up-item is-new';
    item.innerHTML = `${I('file', 18)}<div><b>${names[list.children.length % names.length]}</b><small class="num">上传中 0%</small></div><span class="spin" style="width:14px;height:14px;border-width:2px;color:var(--primary)"></span><i class="up-prog" style="width:0"></i>`;
    list.prepend(item);
    let p = 0;
    const timer = setInterval(() => {
      p = Math.min(100, p + 7 + Math.random() * 14);
      item.querySelector('.up-prog').style.width = `${p}%`;
      item.querySelector('small').textContent = `上传中 ${Math.floor(p)}%`;
      if (p >= 100) {
        clearInterval(timer);
        item.classList.add('done');
        item.querySelector('small').textContent = '1.8 MB · 已完成';
        item.querySelector('.spin').outerHTML = I('checkCircle', 16);
        item.querySelector('.up-prog').remove();
      }
    }, 160);
  };
  A.cpPick = (el) => {
    A.pick(el);
    const root = el.closest('[data-colorpicker]');
    root.querySelector('.cp-hex').value = el.dataset.c.toUpperCase();
    root.querySelector('.cp-native').value = el.dataset.c;
  };
  A.rte = (el) => {
    const [cmd, arg] = el.dataset.cmd.split(':');
    el.closest('.rte').querySelector('.rte-body').focus();
    document.execCommand(cmd, false, cmd === 'createLink' ? 'https://example.com' : arg);
  };
  A.btnLoading = (el) => {
    if (el.classList.contains('is-disabled')) return;
    const html = el.innerHTML;
    el.classList.add('is-disabled');
    el.innerHTML = '<span class="spin"></span>加载中';
    setTimeout(() => { el.innerHTML = html; el.classList.remove('is-disabled'); Atlas.toast('加载完成', 'success'); }, 1500);
  };
  A.loadMore = (el) => {
    el.innerHTML = '<span class="spin" style="width:14px;height:14px;border-width:2px"></span>加载中…';
    setTimeout(() => { el.textContent = '加载更多'; Atlas.toast('已加载 20 条新内容', 'success'); }, 1200);
  };

  /* ---------- 步骤条 ---------- */
  const paintSteps = (root) => {
    const cur = +root.dataset.cur;
    root.querySelectorAll('.step').forEach((s, i) => {
      s.classList.toggle('done', i < cur);
      s.classList.toggle('cur', i === cur);
      s.querySelector('i').innerHTML = i < cur ? I('check', 14, 'line', 3) : i + 1;
    });
  };
  A.stepGo = (el) => {
    const root = el.closest('.cmp-demo').querySelector('[data-steps]');
    root.dataset.cur = Math.min(3, Math.max(0, +root.dataset.cur + Number(el.dataset.d)));
    paintSteps(root);
  };

  /* ---------- 分页 ---------- */
  const paintPager = (el) => {
    const pages = +el.dataset.pager;
    const cur = +el.dataset.cur;
    const nums = new Set([1, pages, cur - 1, cur, cur + 1].filter((n) => n >= 1 && n <= pages));
    const list = [...nums].sort((a, b) => a - b);
    let html = el.dataset.total ? `<span class="pager-info">共 ${el.dataset.total} 条</span>` : '';
    html += `<button type="button" data-p="${cur - 1}"${cur === 1 ? ' disabled' : ''} aria-label="上一页">${I('chevL', 14)}</button>`;
    list.forEach((n, i) => {
      if (i && n - list[i - 1] > 1) html += '<span class="pager-ellipsis">…</span>';
      html += `<button type="button" data-p="${n}" class="${n === cur ? 'on' : ''}">${n}</button>`;
    });
    html += `<button type="button" data-p="${cur + 1}"${cur === pages ? ' disabled' : ''} aria-label="下一页">${I('chevR', 14)}</button>`;
    html += '<span class="input fake-select pager-size"><span>10 条/页</span>' + I('chevD', 12) + '</span>';
    el.innerHTML = html;
  };

  /* ---------- 轮播 ---------- */
  const carouselGo = (root, d) => {
    const n = root.querySelectorAll('.car-slide').length;
    const i = ((+(root.dataset.i || 0) + d) % n + n) % n;
    root.dataset.i = i;
    root.querySelector('.car-track').style.transform = `translateX(-${i * 100}%)`;
    root.querySelectorAll('.car-dots i').forEach((dot, k) => dot.classList.toggle('on', k === i));
  };
  A.carousel = (el) => carouselGo(el.closest('[data-carousel]'), +el.dataset.d);

  /* ---------- 复制 ---------- */
  Atlas.copy = (text, okMsg = '已复制到剪贴板') => {
    const done = () => Atlas.toast(okMsg, 'success');
    if (navigator.clipboard && window.isSecureContext) {
      navigator.clipboard.writeText(text).then(done, () => Atlas.toast('复制失败，请手动选择文本', 'error'));
      return;
    }
    const ta = document.createElement('textarea');
    ta.value = text;
    ta.style.cssText = 'position:fixed;opacity:0';
    document.body.appendChild(ta);
    ta.select();
    const ok = document.execCommand('copy');
    ta.remove();
    if (ok) done(); else Atlas.toast('复制失败，请手动选择文本', 'error');
  };
  A.copy = (el) => Atlas.copy(el.dataset.copy, `已复制：${el.dataset.copy.length > 40 ? 'CSS 代码' : el.dataset.copy}`);
  A.copyCode = (el) => {
    const pre = el.closest('.docs-code, .code-block').querySelector('pre').cloneNode(true);
    pre.querySelectorAll('.ln, .tk-mute').forEach((n) => n.remove());
    Atlas.copy(pre.textContent.trim());
    const label = el.querySelector('span');
    label.textContent = '已复制';
    setTimeout(() => { label.textContent = '复制'; }, 1500);
  };
  A.copyFrom = (el) => Atlas.copy(document.getElementById(el.dataset.from).innerText);
  A.codeTab = (el) => { A.pick(el); el.closest('.docs-code').querySelector('.docs-cmd').textContent = el.dataset.cmd; };

  /* ---------- 初始化 ---------- */
  Atlas.onReady(() => {
    document.addEventListener('click', (e) => {
      const b = e.target.closest('.seg button, .tabs-line button');
      if (b) [...b.parentElement.children].forEach((c) => c.classList.toggle('on', c === b));
      const pb = e.target.closest('.pager button[data-p]');
      if (pb && !pb.disabled) { const pager = pb.closest('.pager'); pager.dataset.cur = pb.dataset.p; paintPager(pager); }
    });

    document.querySelectorAll('.pager[data-pager]').forEach(paintPager);
    document.querySelectorAll('[data-steps]').forEach(paintSteps);

    /* 滑动指示条标签页 */
    document.querySelectorAll('[data-tabs-slide]').forEach((root) => {
      const ink = root.querySelector('.tabs-ink');
      const move = (b) => { ink.style.left = `${b.offsetLeft}px`; ink.style.width = `${b.offsetWidth}px`; };
      root.addEventListener('click', (e) => {
        const b = e.target.closest('button');
        if (!b) return;
        root.querySelectorAll('button').forEach((x) => x.classList.toggle('on', x === b));
        move(b);
      });
      requestAnimationFrame(() => move(root.querySelector('button.on')));
    });
    document.querySelectorAll('[data-anchor]').forEach((root) => {
      const ink = root.querySelector('.anchor-ink');
      const move = (a) => { ink.style.top = `${a.offsetTop + 3}px`; };
      root.addEventListener('click', (e) => {
        const a = e.target.closest('a');
        if (!a) return;
        root.querySelectorAll('a').forEach((x) => x.classList.toggle('on', x === a));
        move(a);
      });
      requestAnimationFrame(() => move(root.querySelector('a.on')));
    });

    /* 自动补全：数据来自术语索引中的组件 */
    document.querySelectorAll('[data-autocomplete]').forEach((root) => {
      const input = root.querySelector('input');
      const pop = root.querySelector('.ac-pop');
      const pool = Atlas.glossaryItems.filter((it) => it.top === '组件');
      let cur = 0;
      const render = () => {
        const q = input.value.trim().toLowerCase();
        if (!q) { pop.classList.remove('open'); return; }
        const hits = pool.filter((it) => `${it.zh} ${it.en} ${it.alias}`.toLowerCase().includes(q)).slice(0, 6);
        const hl = (s) => Atlas.esc(s).replace(new RegExp(q.replace(/[.*+?^${}()|[\]\\]/g, '\\$&'), 'ig'), (m) => `<mark>${m}</mark>`);
        pop.innerHTML = hits.length ? hits.map((it, i) => `<div class="pop-item${i === cur ? ' is-active' : ''}" data-i="${pool.indexOf(it)}">${hl(it.zh)}<span class="spacer"></span><small class="muted">${hl(it.en)}</small></div>`).join('') : '<div class="pop-item muted">无匹配结果</div>';
        pop.classList.add('open');
      };
      input.addEventListener('input', () => { cur = 0; render(); });
      input.addEventListener('keydown', (e) => {
        const n = pop.querySelectorAll('.pop-item[data-i]').length;
        if (e.key === 'ArrowDown') { cur = Math.min(cur + 1, n - 1); render(); e.preventDefault(); }
        if (e.key === 'ArrowUp') { cur = Math.max(cur - 1, 0); render(); e.preventDefault(); }
        if (e.key === 'Enter') { const it = pop.querySelectorAll('.pop-item[data-i]')[cur]; if (it) it.click(); }
        if (e.key === 'Escape') pop.classList.remove('open');
      });
      pop.addEventListener('click', (e) => {
        const it = e.target.closest('.pop-item[data-i]');
        if (!it) return;
        const hit = pool[+it.dataset.i];
        input.value = hit.zh;
        pop.classList.remove('open');
        Atlas.locate(hit.el);
      });
    });

    /* 评分 */
    document.querySelectorAll('[data-rate]').forEach((root) => {
      const txt = ['', '很差', '较差', '一般', '满意', '超赞'];
      const stars = root.querySelectorAll('span[data-v]');
      const paint = (v) => stars.forEach((s) => s.classList.toggle('on', +s.dataset.v <= v));
      paint(+root.dataset.rate);
      root.addEventListener('mouseover', (e) => { const s = e.target.closest('span[data-v]'); if (s) { paint(+s.dataset.v); root.querySelector('.rate-txt').textContent = txt[s.dataset.v]; } });
      root.addEventListener('mouseleave', () => { paint(+root.dataset.rate); root.querySelector('.rate-txt').textContent = txt[root.dataset.rate]; });
      root.addEventListener('click', (e) => { const s = e.target.closest('span[data-v]'); if (s) { root.dataset.rate = s.dataset.v; s.animate([{ transform: 'scale(1.5)' }, { transform: 'scale(1)' }], { duration: 300, easing: 'cubic-bezier(.34,1.56,.64,1)' }); } });
    });

    /* 验证码 */
    document.querySelectorAll('[data-otp]').forEach((root) => {
      const boxes = [...root.querySelectorAll('input')];
      boxes.forEach((b, i) => {
        b.addEventListener('input', () => {
          b.value = b.value.replace(/\D/g, '').slice(-1);
          b.classList.toggle('filled', !!b.value);
          if (b.value && boxes[i + 1]) boxes[i + 1].focus();
          if (boxes.every((x) => x.value)) Atlas.toast(`验证码 ${boxes.map((x) => x.value).join('')} 已提交`, 'success');
        });
        b.addEventListener('keydown', (e) => { if (e.key === 'Backspace' && !b.value && boxes[i - 1]) boxes[i - 1].focus(); });
      });
    });

    /* 标签输入 */
    document.querySelectorAll('[data-taginput]').forEach((root) => {
      const input = root.querySelector('input');
      input.addEventListener('keydown', (e) => {
        if (e.key !== 'Enter' || !input.value.trim()) return;
        e.preventDefault();
        const tag = document.createElement('span');
        tag.className = 'tag tag-primary';
        tag.innerHTML = `${Atlas.esc(input.value.trim())}<button type="button" data-act="tagRemove">${I('x', 11)}</button>`;
        root.insertBefore(tag, input);
        input.value = '';
      });
    });

    /* 全选 / 半选 */
    document.querySelectorAll('[data-checkall]').forEach((root) => {
      const all = root.querySelector('[data-role="all"]');
      const allInput = all.querySelector('input');
      const items = [...root.querySelectorAll('[data-role="item"]')];
      const sync = () => {
        const n = items.filter((i) => i.checked).length;
        allInput.checked = n === items.length;
        all.classList.toggle('is-indeterminate', n > 0 && n < items.length);
      };
      allInput.addEventListener('change', () => { items.forEach((i) => { i.checked = allInput.checked; }); sync(); });
      items.forEach((i) => i.addEventListener('change', sync));
      sync();
    });

    /* 分栏拖拽 */
    document.querySelectorAll('[data-splitter]').forEach((root) => {
      const left = root.querySelector('.sp-left');
      const handle = root.querySelector('.sp-handle');
      handle.addEventListener('pointerdown', (e) => {
        handle.setPointerCapture(e.pointerId);
        root.classList.add('dragging');
        const rect = root.getBoundingClientRect();
        const move = (ev) => { left.style.width = `${Math.min(80, Math.max(15, ((ev.clientX - rect.left) / rect.width) * 100))}%`; };
        const up = () => { root.classList.remove('dragging'); handle.removeEventListener('pointermove', move); handle.removeEventListener('pointerup', up); };
        handle.addEventListener('pointermove', move);
        handle.addEventListener('pointerup', up);
      });
    });

    /* 对比滑块 */
    document.querySelectorAll('[data-compare]').forEach((root) => {
      const set = (x) => { const r = root.getBoundingClientRect(); root.style.setProperty('--pos', `${Math.min(100, Math.max(0, ((x - r.left) / r.width) * 100))}%`); };
      root.addEventListener('pointerdown', (e) => {
        root.setPointerCapture(e.pointerId);
        set(e.clientX);
        const move = (ev) => set(ev.clientX);
        root.addEventListener('pointermove', move);
        root.addEventListener('pointerup', () => root.removeEventListener('pointermove', move), { once: true });
      });
    });

    /* 轮播自动播放 */
    document.querySelectorAll('[data-carousel]').forEach((root) => {
      root.querySelectorAll('.car-dots i').forEach((dot, k) => dot.addEventListener('click', () => carouselGo(root, k - +(root.dataset.i || 0))));
      setInterval(() => { if (!root.matches(':hover')) carouselGo(root, 1); }, 3800);
    });

    /* 表格排序 */
    document.querySelectorAll('[data-sort-table]').forEach((table) => {
      table.querySelectorAll('.th-sort[data-sort]').forEach((th) => th.addEventListener('click', () => {
        const col = +th.dataset.sort;
        const dir = th.classList.contains('asc') ? -1 : 1;
        table.querySelectorAll('.th-sort').forEach((x) => x.classList.remove('asc', 'desc'));
        th.classList.add(dir === 1 ? 'asc' : 'desc');
        const tbody = table.tBodies[0];
        const rows = [...tbody.rows];
        const val = (r) => { const t = r.cells[col].textContent.trim(); const n = parseFloat(t.replace(/,/g, '')); return Number.isNaN(n) || /-\d{2}-/.test(t) ? t : n; };
        rows.sort((a, b) => (val(a) > val(b) ? dir : val(a) < val(b) ? -dir : 0));
        rows.forEach((r, i) => { tbody.appendChild(r); r.animate([{ opacity: 0, transform: 'translateY(-6px)' }, { opacity: 1, transform: 'none' }], { duration: 300, delay: i * 30, fill: 'backwards' }); });
      }));
    });

    /* 密码强度 */
    document.querySelectorAll('[data-pwd]').forEach((root) => {
      const input = root.querySelector('input');
      const txt = root.querySelector('.pwd-txt');
      const words = ['至少 8 位，包含字母和数字', '弱：太短或太简单', '一般：再加点符号', '较强：不错', '很强：完美'];
      input.addEventListener('input', () => {
        const v = input.value;
        let lv = 0;
        if (v.length) lv = 1;
        if (v.length >= 8 && /\d/.test(v) && /[a-z]/i.test(v)) lv = 2;
        if (lv === 2 && /[A-Z]/.test(v) && /[a-z]/.test(v)) lv = 3;
        if (lv === 3 && /[^\w]/.test(v) && v.length >= 10) lv = 4;
        root.dataset.level = lv;
        txt.textContent = words[lv];
      });
    });

    /* 文本域计数、滑块数值 */
    document.querySelectorAll('[data-counter]').forEach((ta) => {
      const out = ta.parentElement.querySelector('.ta-count');
      const sync = () => { out.textContent = `${ta.value.length} / ${ta.maxLength}`; };
      ta.addEventListener('input', sync);
      sync();
    });
    document.querySelectorAll('.range').forEach((r) => {
      const sync = () => {
        r.style.setProperty('--p', `${((r.value - r.min) / (r.max - r.min)) * 100}%`);
        if (r.dataset.rangeOut) document.getElementById(r.dataset.rangeOut).textContent = r.value;
      };
      r.addEventListener('input', sync);
      sync();
    });

    /* 拖拽上传区、颜色选择 */
    document.querySelectorAll('[data-dropzone]').forEach((dz) => {
      ['dragenter', 'dragover'].forEach((t) => dz.addEventListener(t, (e) => { e.preventDefault(); dz.classList.add('over'); }));
      ['dragleave', 'drop'].forEach((t) => dz.addEventListener(t, (e) => { e.preventDefault(); dz.classList.remove('over'); if (t === 'drop') A.uploadSim(); }));
    });
    document.querySelectorAll('[data-colorpicker]').forEach((root) => {
      root.querySelector('.cp-native').addEventListener('input', (e) => { root.querySelector('.cp-hex').value = e.target.value.toUpperCase(); });
    });

    /* 数字滚动计数：进入视野时触发 */
    const io = new IntersectionObserver((entries) => entries.forEach((en) => {
      if (!en.isIntersecting) return;
      io.unobserve(en.target);
      const el = en.target;
      const to = parseFloat(el.dataset.countup);
      const dec = +(el.dataset.decimals || 0);
      const t0 = performance.now();
      const tick = (t) => {
        const k = Math.min(1, (t - t0) / 1600);
        const v = to * (1 - (1 - k) ** 4);
        el.textContent = `${dec ? v.toFixed(dec) : Atlas.fmt(Math.round(v))}${el.dataset.suffix || ''}`;
        if (k < 1) requestAnimationFrame(tick);
      };
      requestAnimationFrame(tick);
    }), { threshold: 0.6 });
    document.querySelectorAll('[data-countup]').forEach((el) => io.observe(el));
  });
})();
