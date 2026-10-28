/* 09 术语索引：从页面已渲染的内容中收集所有带名称的条目，可搜索并跳转定位 */
(function () {
  const I = Atlas.icon;
  const topCat = (c) => {
    if (c.startsWith('组件')) return '组件';
    if (c.startsWith('动效')) return '动效';
    if (c.startsWith('界面部件')) return '界面部件';
    if (c === '渐变') return '色系';
    return c;
  };

  /* 收集条目：{ zh, en, alias, cat, el } */
  const items = [];
  const seen = new Set();
  const push = (zh, en, alias, cat, el) => {
    const key = `${zh}|${en}|${topCat(cat)}`;
    if (!zh || seen.has(key)) return;
    seen.add(key);
    items.push({ zh, en, alias, cat, top: topCat(cat), el });
  };

  document.querySelectorAll('[data-ui]').forEach((el) => {
    const [zh, en = ''] = el.dataset.ui.split(' · ');
    const form = el.closest('[data-form]');
    push(zh.trim(), en.trim(), '', `界面部件 · ${form ? form.dataset.form : '示例'}`, el);
  });
  document.querySelectorAll('[data-zh][data-en][data-cat]').forEach((el) => push(el.dataset.zh, el.dataset.en, el.dataset.alias || '', el.dataset.cat, el));
  document.querySelectorAll('.loader-cell').forEach((el) => push(el.querySelector('b').textContent, el.querySelector('small').textContent, '', '动效 · 加载', el));
  document.querySelectorAll('.enter-cell').forEach((el) => push(el.querySelector('b').textContent, el.querySelector('small').textContent, '', '动效 · 入场', el));
  document.querySelectorAll('.app-terms > div').forEach((el) => {
    const span = el.querySelector('span');
    push(span.firstChild.textContent.trim(), span.querySelector('em').textContent, '', '界面部件 · App 应用', el);
  });
  Atlas.glossaryItems = items;

  const order = ['全部', '界面部件', '色系', '基础规范', 'UI 风格', '页面类型', '组件', '动效'];
  const counts = order.map((c) => (c === '全部' ? items.length : items.filter((it) => it.top === c).length));

  Atlas.mount('glossary', `
    <div class="wrap">
      ${Atlas.head({
        no: '09 / 术语索引',
        title: '术语索引',
        en: 'Glossary',
        desc: `本页出现过的全部界面部件、色板、风格、页面类型、组件和动效，共 ${items.length} 条，都是从页面里自动收集的。输入中文、英文或别名搜索，点击任意一行会跳转并高亮对应的示例。`,
        chips: ['中英对照', '别名', '一键定位'],
      })}
      <div class="glo-bar rv">
        <div class="field glo-search">${I('search', 15)}<input class="input" id="gloSearch" placeholder="搜索：抽屉 / Drawer / Toast / 玻璃…" autocomplete="off"></div>
        <div class="glo-cats" id="gloCats">${order.map((c, i) => `<button type="button" class="${i === 0 ? 'on' : ''}" data-act="gloCat" data-k="${c}">${c}<small>${counts[i]}</small></button>`).join('')}</div>
      </div>
      <div class="glo-table panel rv">
        <table class="tbl">
          <thead><tr><th>中文名称</th><th>English</th><th>别名</th><th>维度 / 分类</th><th class="r">定位</th></tr></thead>
          <tbody id="gloBody">${items.map((it, i) => `
            <tr data-i="${i}" data-act="gloGo" data-top="${it.top}" data-s="${`${it.zh} ${it.en} ${it.alias}`.toLowerCase()}">
              <td><b>${it.zh}</b></td><td class="mono glo-en">${it.en}</td><td class="muted">${it.alias}</td>
              <td><span class="tag glo-tag" data-top="${it.top}">${it.cat}</span></td>
              <td class="r"><span class="glo-go">${I('arrowUR', 14)}</span></td>
            </tr>`).join('')}</tbody>
        </table>
        <p class="glo-empty" id="gloEmpty">没有匹配的条目。</p>
      </div>
    </div>`);

  Atlas.acts.gloGo = (el) => Atlas.locate(items[+el.dataset.i].el);
  let curCat = '全部';
  const filter = () => {
    const q = document.getElementById('gloSearch').value.trim().toLowerCase();
    let shown = 0;
    document.querySelectorAll('#gloBody tr').forEach((tr) => {
      const ok = (curCat === '全部' || tr.dataset.top === curCat) && (!q || tr.dataset.s.includes(q));
      tr.classList.toggle('is-hidden', !ok);
      if (ok) shown += 1;
    });
    document.getElementById('gloEmpty').classList.toggle('show', shown === 0);
  };
  Atlas.acts.gloCat = (el) => { Atlas.acts.pick(el); curCat = el.dataset.k; filter(); };
  Atlas.onReady(() => document.getElementById('gloSearch').addEventListener('input', filter));
})();
