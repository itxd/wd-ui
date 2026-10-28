/* 全局命名空间与渲染工具：各章节脚本通过 Atlas 注册内容与交互 */
(function () {
  const readyQueue = [];

  const Atlas = {
    /* data-act 点击动作表：key 为动作名，值为 (el, event) => void */
    acts: {},
    /* 渲染完成后需要初始化的逻辑 */
    onReady(fn) { readyQueue.push(fn); },
    runReady() { readyQueue.forEach((fn) => fn()); },

    mount(id, html) {
      const el = document.getElementById(id);
      if (!el) throw new Error(`Atlas.mount: 找不到容器 #${id}`);
      el.innerHTML = html;
      return el;
    },

    /* 章节大标题 */
    head({ no, title, en, desc, chips = [] }) {
      return `
      <div class="sec-head rv">
        <div>
          <div class="sec-no">${no}</div>
          <h2>${title}<small>${en}</small></h2>
          <p>${desc}</p>
        </div>
        <div class="sec-chips">${chips.map((c) => `<span>${c}</span>`).join('')}</div>
      </div>`;
    },

    /* 小节标题 */
    sub({ title, en = '', desc = '', right = '' }) {
      return `
      <div class="sub-head rv">
        <div>
          <h3>${title}${en ? `<em>${en}</em>` : ''}</h3>
          ${desc ? `<p>${desc}</p>` : ''}
        </div>
        ${right}
      </div>`;
    },

    /* 标签切换按钮组：items = [{ id, label, sub }] */
    tabs(group, items, cls = 'big-tabs') {
      return `<div class="${cls}" role="tablist">${items.map((it, i) => `
        <button type="button" class="${i === 0 ? 'on' : ''}" data-act="tab" data-tg="${group}" data-tt="${it.id}">
          ${it.icon ? Atlas.icon(it.icon, 16) : ''}${it.label}${it.sub ? `<small>${it.sub}</small>` : ''}
        </button>`).join('')}</div>`;
    },
    panel(group, id, html, on = false) {
      return `<div class="tab-panel${on ? ' on' : ''}" id="${id}" data-tp="${group}">${html}</div>`;
    },

    /* 可复现的伪随机数，保证每次打开页面图表一致 */
    rand(seed = 1) {
      let s = seed % 2147483647;
      if (s <= 0) s += 2147483646;
      return () => (s = (s * 16807) % 2147483647) / 2147483647;
    },
    series(seed, n, min, max, smooth = 0.6) {
      const r = Atlas.rand(seed);
      const out = [];
      let v = min + (max - min) * r();
      for (let i = 0; i < n; i++) {
        v = v * smooth + (min + (max - min) * r()) * (1 - smooth);
        out.push(Math.round(v));
      }
      return out;
    },

    fmt(n) { return Number(n).toLocaleString('zh-CN'); },
    esc(s) {
      return String(s).replace(/[&<>"']/g, (c) => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;' }[c]));
    },

    /* 根据背景色计算前景色（白或深色） */
    readableOn(hex) {
      const h = hex.replace('#', '');
      const full = h.length === 3 ? h.split('').map((c) => c + c).join('') : h;
      const [r, g, b] = [0, 2, 4].map((i) => parseInt(full.slice(i, i + 2), 16) / 255)
        .map((c) => (c <= 0.03928 ? c / 12.92 : ((c + 0.055) / 1.055) ** 2.4));
      const lum = 0.2126 * r + 0.7152 * g + 0.0722 * b;
      return lum > 0.45 ? '#111827' : '#ffffff';
    },
  };

  window.Atlas = Atlas;
})();
