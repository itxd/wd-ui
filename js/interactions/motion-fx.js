/* 动效章节交互：波纹、磁吸、倾斜、聚光灯、重播、转场、滚动演示、文字、粒子、拖拽手势 */
(function () {
  const A = Atlas.acts;
  const reduce = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

  const restart = (el, cls = 'run') => { el.classList.remove(cls); void el.offsetWidth; el.classList.add(cls); };

  A.moReplay = (el) => restart(el.closest('.mo').querySelector('.mo-stage'));
  A.enterOne = (el) => restart(el.querySelector('.enter-stage'));
  A.enterReplay = () => document.querySelectorAll('.enter-stage').forEach((s) => restart(s));

  A.easePlay = (el) => {
    const balls = el.dataset.i !== undefined ? [el.querySelector('.ease-ball')] : [...document.querySelectorAll('.ease-ball')];
    balls.forEach((b) => restart(b, 'go'));
  };

  A.likeBurst = (el) => {
    el.classList.toggle('on');
    const n = el.parentElement.querySelector('.fx-like-n');
    n.textContent = +n.textContent + (el.classList.contains('on') ? 1 : -1);
    if (el.classList.contains('on')) restart(el, 'burst');
  };
  A.fxCopy = (el) => {
    el.classList.add('done');
    el.querySelector('em').textContent = '已复制';
    setTimeout(() => { el.classList.remove('done'); el.querySelector('em').textContent = '复制链接'; }, 1600);
  };
  A.fxShake = (el) => {
    const input = el.parentElement.querySelector('input');
    input.classList.add('is-error');
    restart(input, 'shake');
    Atlas.toast('密码错误，请重试', 'error');
  };
  A.fxMorph = (el) => {
    if (el.classList.contains('loading') || el.classList.contains('success')) return;
    el.classList.add('loading');
    setTimeout(() => { el.classList.remove('loading'); el.classList.add('success'); }, 1400);
    setTimeout(() => el.classList.remove('success'), 3000);
  };

  /* 数字滚动：每一位是一列 0–9 */
  const paintOdo = (el, value) => {
    const s = String(value);
    if (el.children.length !== s.length) {
      el.innerHTML = s.split('').map(() => `<span class="col">${Array.from({ length: 10 }, (_, k) => `<span>${k}</span>`).join('')}</span>`).join('');
      void el.offsetWidth;
    }
    [...el.children].forEach((col, i) => { col.style.transform = `translateY(-${+s[i] * 48}px)`; });
  };
  A.fxOdo = (el) => paintOdo(el.parentElement.querySelector('[data-odo]'), 1000 + Math.floor(Math.random() * 9000));

  /* 页面转场 */
  A.pageTrans = () => {
    const frame = document.getElementById('ptFrame');
    const mode = document.querySelector('#ptMode button.on').dataset.mode;
    frame.dataset.mode = mode;
    const pages = frame.querySelectorAll('.pt-page');
    const cur = [...pages].findIndex((p) => p.classList.contains('on'));
    const next = (cur + 1) % pages.length;
    pages.forEach((p) => p.classList.remove('out'));
    /* 先把新页面瞬移到入场起点，再切换 */
    pages[next].style.transition = 'none';
    pages[next].classList.remove('on');
    void pages[next].offsetWidth;
    pages[next].style.transition = '';
    pages[cur].classList.remove('on');
    pages[cur].classList.add('out');
    pages[next].classList.add('on');
    setTimeout(() => {
      pages[cur].style.transition = 'none';
      pages[cur].classList.remove('out');
      void pages[cur].offsetWidth;
      pages[cur].style.transition = '';
    }, 750);
  };

  /* 共享元素展开（FLIP） */
  A.seOpen = (el) => {
    const grid = document.getElementById('seGrid');
    const d = document.getElementById('seDetail');
    const g = grid.getBoundingClientRect();
    const r = el.getBoundingClientRect();
    d.querySelector('.se-hero').className = `se-hero ${[...el.classList].find((c) => c.startsWith('s-'))}`;
    d.querySelector('.se-t').textContent = el.textContent.trim();
    Object.assign(d.style, { transition: 'none', left: `${r.left - g.left}px`, top: `${r.top - g.top}px`, width: `${r.width}px`, height: `${r.height}px` });
    d.classList.add('show');
    d.classList.remove('expanded');
    void d.offsetWidth;
    Object.assign(d.style, { transition: 'all .5s cubic-bezier(.22,1,.36,1)', left: '0px', top: '0px', width: `${g.width}px`, height: `${g.height}px` });
    d.classList.add('expanded');
    d.dataset.from = [...grid.querySelectorAll('.se-card')].indexOf(el);
  };
  A.seClose = () => {
    const grid = document.getElementById('seGrid');
    const d = document.getElementById('seDetail');
    const card = grid.querySelectorAll('.se-card')[+d.dataset.from || 0];
    const g = grid.getBoundingClientRect();
    const r = card.getBoundingClientRect();
    d.classList.remove('expanded');
    Object.assign(d.style, { left: `${r.left - g.left}px`, top: `${r.top - g.top}px`, width: `${r.width}px`, height: `${r.height}px` });
    setTimeout(() => d.classList.remove('show'), 480);
  };

  /* 列表增删 */
  const todo = ['读完一本书', '整理桌面', '给家里打电话', '学习新组件', '喝八杯水'];
  A.listAdd = () => {
    const ul = document.getElementById('fxList');
    if (ul.children.length >= 4) { Atlas.toast('最多 4 项，先删除一些', 'warning'); return; }
    const li = document.createElement('li');
    li.className = 'enter';
    li.innerHTML = `<span>${todo[Math.floor(Math.random() * todo.length)]}</span>`;
    ul.prepend(li);
  };
  A.listRemove = () => {
    const li = document.querySelector('#fxList li:not(.leave)');
    if (!li) return;
    li.classList.add('leave');
    setTimeout(() => li.remove(), 380);
  };

  /* 文字解码 */
  const scramble = (el) => {
    const target = el.dataset.scramble;
    const chars = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ#$%&*<>/';
    let frame = 0;
    const total = 28;
    const tick = () => {
      el.textContent = target.split('').map((c, i) => (c === ' ' ? ' ' : frame / total > i / target.length ? c : chars[Math.floor(Math.random() * chars.length)])).join('');
      if (++frame <= total) requestAnimationFrame(() => setTimeout(tick, 28));
    };
    tick();
  };

  /* 粒子连线 */
  const particles = (canvas) => {
    const ctx = canvas.getContext('2d');
    const dpr = window.devicePixelRatio || 1;
    let w = 0, h = 0, pts = [], mouse = null, visible = false;
    const resize = () => {
      w = canvas.clientWidth; h = canvas.clientHeight;
      canvas.width = w * dpr; canvas.height = h * dpr;
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
      pts = Array.from({ length: 34 }, () => ({ x: Math.random() * w, y: Math.random() * h, vx: (Math.random() - 0.5) * 0.5, vy: (Math.random() - 0.5) * 0.5 }));
    };
    const draw = () => {
      if (visible) {
        ctx.clearRect(0, 0, w, h);
        pts.forEach((p) => {
          p.x += p.vx; p.y += p.vy;
          if (p.x < 0 || p.x > w) p.vx *= -1;
          if (p.y < 0 || p.y > h) p.vy *= -1;
        });
        const all = mouse ? [...pts, mouse] : pts;
        for (let i = 0; i < all.length; i++) {
          for (let j = i + 1; j < all.length; j++) {
            const d = Math.hypot(all[i].x - all[j].x, all[i].y - all[j].y);
            if (d < 70) { ctx.strokeStyle = `rgba(129,140,248,${1 - d / 70})`; ctx.lineWidth = 1; ctx.beginPath(); ctx.moveTo(all[i].x, all[i].y); ctx.lineTo(all[j].x, all[j].y); ctx.stroke(); }
          }
        }
        ctx.fillStyle = '#c7d2fe';
        pts.forEach((p) => { ctx.beginPath(); ctx.arc(p.x, p.y, 1.8, 0, Math.PI * 2); ctx.fill(); });
      }
      requestAnimationFrame(draw);
    };
    canvas.addEventListener('mousemove', (e) => { const r = canvas.getBoundingClientRect(); mouse = { x: e.clientX - r.left, y: e.clientY - r.top }; });
    canvas.addEventListener('mouseleave', () => { mouse = null; });
    new IntersectionObserver(([en]) => { visible = en.isIntersecting; if (visible && !w) resize(); }).observe(canvas);
    window.addEventListener('resize', () => { if (w) resize(); });
    draw();
  };

  Atlas.onReady(() => {
    /* 一次性动画：进入视野时播放 */
    const replayIO = new IntersectionObserver((entries) => entries.forEach((en) => {
      if (en.isIntersecting) { restart(en.target); replayIO.unobserve(en.target); }
    }), { threshold: 0.4 });
    document.querySelectorAll('[data-replay], .enter-stage').forEach((s) => replayIO.observe(s));
    const easeIO = new IntersectionObserver(([en]) => { if (en.isIntersecting) { A.easePlay({ dataset: {} }); easeIO.disconnect(); } }, { threshold: 0.5 });
    easeIO.observe(document.getElementById('m-easing'));

    /* 波纹 */
    document.addEventListener('pointerdown', (e) => {
      const el = e.target.closest('.ripple');
      if (!el || reduce) return;
      const r = el.getBoundingClientRect();
      const size = Math.max(r.width, r.height) * 2.2;
      const w = document.createElement('span');
      w.className = 'ripple-wave';
      Object.assign(w.style, { width: `${size}px`, height: `${size}px`, left: `${e.clientX - r.left - size / 2}px`, top: `${e.clientY - r.top - size / 2}px` });
      el.appendChild(w);
      w.addEventListener('animationend', () => w.remove());
    });

    /* 磁吸、倾斜、聚光灯 */
    document.querySelectorAll('[data-magnetic]').forEach((b) => {
      const stage = b.parentElement;
      stage.addEventListener('mousemove', (e) => {
        const r = b.getBoundingClientRect();
        const dx = e.clientX - (r.left + r.width / 2), dy = e.clientY - (r.top + r.height / 2);
        b.style.transform = `translate(${dx * 0.35}px, ${dy * 0.35}px)`;
        b.firstElementChild.style.transform = `translate(${dx * 0.15}px, ${dy * 0.15}px)`;
      });
      stage.addEventListener('mouseleave', () => { b.style.transform = ''; b.firstElementChild.style.transform = ''; });
    });
    document.querySelectorAll('[data-tilt]').forEach((card) => {
      const stage = card.parentElement;
      stage.addEventListener('mousemove', (e) => {
        const r = card.getBoundingClientRect();
        const px = (e.clientX - r.left) / r.width, py = (e.clientY - r.top) / r.height;
        card.style.setProperty('--ry', `${(px - 0.5) * 30}deg`);
        card.style.setProperty('--rx', `${(0.5 - py) * 30}deg`);
        card.style.setProperty('--gx', `${px * 100}%`);
        card.style.setProperty('--gy', `${py * 100}%`);
      });
      stage.addEventListener('mouseleave', () => { card.style.setProperty('--rx', '0deg'); card.style.setProperty('--ry', '0deg'); });
    });
    document.addEventListener('mousemove', (e) => {
      const el = e.target.closest('.spot');
      if (!el) return;
      const r = el.getBoundingClientRect();
      el.style.setProperty('--x', `${e.clientX - r.left}px`);
      el.style.setProperty('--y', `${e.clientY - r.top}px`);
    });

    /* 数字滚动初值 */
    document.querySelectorAll('[data-odo]').forEach((el) => paintOdo(el, el.dataset.odo));

    /* 滚动类演示 */
    document.querySelectorAll('[data-sc-reveal]').forEach((box) => {
      const io = new IntersectionObserver((entries) => entries.forEach((en) => en.target.classList.toggle('in', en.isIntersecting)), { root: box, threshold: 0.3 });
      box.querySelectorAll('.sc-item').forEach((it) => io.observe(it));
    });
    document.querySelectorAll('[data-parallax]').forEach((box) => {
      const layers = box.querySelectorAll('[data-speed]');
      box.addEventListener('scroll', () => layers.forEach((l) => { l.style.transform = `translateY(${box.scrollTop * (1 - l.dataset.speed)}px)`; }), { passive: true });
    });
    document.querySelectorAll('[data-shrink]').forEach((box) => box.addEventListener('scroll', () => box.classList.toggle('shrunk', box.scrollTop > 10), { passive: true }));
    document.querySelectorAll('[data-readprog]').forEach((box) => {
      const bar = box.querySelector('.rp-bar');
      box.addEventListener('scroll', () => { bar.style.transform = `scaleX(${box.scrollTop / (box.scrollHeight - box.clientHeight)})`; }, { passive: true });
    });

    /* 打字机 */
    document.querySelectorAll('.tw[data-words]').forEach((el) => {
      const words = el.dataset.words.split('|');
      let w = 0, i = 0, del = false;
      const tick = () => {
        const word = words[w];
        i += del ? -1 : 1;
        el.textContent = word.slice(0, i);
        let wait = del ? 60 : 140;
        if (!del && i === word.length) { del = true; wait = 1400; }
        else if (del && i === 0) { del = false; w = (w + 1) % words.length; wait = 300; }
        setTimeout(tick, wait);
      };
      tick();
    });
    document.querySelectorAll('[data-scramble]').forEach((el) => {
      el.closest('.mo').addEventListener('mouseenter', () => scramble(el));
      new IntersectionObserver(([en], ob) => { if (en.isIntersecting) { scramble(el); ob.disconnect(); } }).observe(el);
    });

    /* 粒子 */
    if (!reduce) document.querySelectorAll('[data-particles]').forEach(particles);

    /* 拖拽排序 */
    document.querySelectorAll('[data-sortable]').forEach((list) => {
      let drag = null;
      list.addEventListener('dragstart', (e) => { drag = e.target.closest('li'); drag.classList.add('dragging'); e.dataTransfer.effectAllowed = 'move'; e.dataTransfer.setData('text/plain', ''); });
      list.addEventListener('dragend', () => { drag.classList.remove('dragging'); list.querySelectorAll('li').forEach((li) => li.classList.remove('over')); drag = null; });
      list.addEventListener('dragover', (e) => {
        e.preventDefault();
        const li = e.target.closest('li');
        if (!li || li === drag) return;
        const r = li.getBoundingClientRect();
        list.insertBefore(drag, e.clientY < r.top + r.height / 2 ? li : li.nextSibling);
      });
    });

    /* 卡片滑动 */
    document.querySelectorAll('[data-swipe-cards]').forEach((root) => {
      root.addEventListener('pointerdown', (e) => {
        const cards = root.querySelectorAll('.sw-card');
        const card = cards[cards.length - 1];
        if (!card || e.target.closest('.sw-card') !== card) return;
        card.setPointerCapture(e.pointerId);
        card.classList.add('dragging');
        const x0 = e.clientX, y0 = e.clientY;
        const like = card.querySelector('.sw-like'), nope = card.querySelector('.sw-nope');
        let dx = 0, dy = 0;
        const move = (ev) => {
          dx = ev.clientX - x0; dy = ev.clientY - y0;
          card.style.transform = `translate(${dx}px, ${dy}px) rotate(${dx / 10}deg)`;
          like.style.opacity = Math.max(0, dx / 80);
          nope.style.opacity = Math.max(0, -dx / 80);
        };
        const up = () => {
          card.removeEventListener('pointermove', move);
          card.classList.remove('dragging');
          if (Math.abs(dx) > 80) {
            card.style.transform = `translate(${dx * 4}px, ${dy}px) rotate(${dx / 4}deg)`;
            card.style.opacity = '0';
            setTimeout(() => { card.style.transform = ''; card.style.opacity = ''; like.style.opacity = 0; nope.style.opacity = 0; root.prepend(card); }, 400);
          } else {
            card.style.transform = '';
            like.style.opacity = 0; nope.style.opacity = 0;
          }
        };
        card.addEventListener('pointermove', move);
        card.addEventListener('pointerup', up, { once: true });
      });
    });

    /* 弹性拖拽 */
    document.querySelectorAll('[data-elastic]').forEach((ball) => {
      ball.addEventListener('pointerdown', (e) => {
        ball.setPointerCapture(e.pointerId);
        ball.classList.remove('release');
        const x0 = e.clientX, y0 = e.clientY;
        const move = (ev) => {
          const dx = ev.clientX - x0, dy = ev.clientY - y0;
          const d = Math.hypot(dx, dy) || 1;
          const k = Math.min(1, 90 / d);
          ball.style.transform = `translate(${dx * k}px, ${dy * k}px) scale(${1 + Math.min(d, 120) / 600}, ${1 - Math.min(d, 120) / 600})`;
        };
        ball.addEventListener('pointermove', move);
        ball.addEventListener('pointerup', () => {
          ball.removeEventListener('pointermove', move);
          ball.classList.add('release');
          ball.style.transform = '';
        }, { once: true });
      });
    });
  });
})();
