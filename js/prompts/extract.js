/* 从实际渲染结果中提取“参考实现”：精简后的 HTML、命中的 CSS 规则、用到的设计令牌和关键帧。
   本地 file:// 打开时浏览器禁止读取 <link> 样式表的规则，所以从 js/data/css-bundle.js（全部 CSS 文本）
   构造一个同源样式表来匹配，线上和本地结果一致。 */
(function () {
  let sheetPromise = null;
  const loadSheet = () => {
    if (sheetPromise) return sheetPromise;
    sheetPromise = new Promise((resolve, reject) => {
      const build = () => {
        const sheet = new CSSStyleSheet();
        sheet.replaceSync(window.AtlasCSS);
        resolve(sheet);
      };
      if (window.AtlasCSS) { build(); return; }
      const s = document.createElement('script');
      s.src = 'js/data/css-bundle.js';
      s.onload = build;
      s.onerror = () => { sheetPromise = null; reject(new Error('无法加载 js/data/css-bundle.js，请先运行 node scripts/build.mjs')); };
      document.head.appendChild(s);
    });
    return sheetPromise;
  };

  /* 按顶层逗号拆分选择器（忽略括号内的逗号） */
  const splitSelectors = (text) => {
    const out = [];
    let depth = 0, cur = '';
    for (const ch of text) {
      if (ch === '(') depth += 1;
      if (ch === ')') depth -= 1;
      if (ch === ',' && depth === 0) { out.push(cur.trim()); cur = ''; } else cur += ch;
    }
    if (cur.trim()) out.push(cur.trim());
    return out;
  };
  /* 去掉状态伪类与伪元素，用于判断“这条规则在某个状态下会作用到子树” */
  const STATE = /::?(before|after|placeholder|selection|marker|-webkit-[\w-]+|-moz-[\w-]+)|:(hover|active|focus-visible|focus-within|focus|checked|disabled|placeholder-shown|indeterminate|visited)/g;
  const PAGE_ONLY = /inspect-on|anno-all|ui-hover|anno-host|anno-tag|locate-flash|\.prompt-btn|\.mo-replay/;
  const matchesTree = (root, sel) => {
    const s = sel.replace(STATE, '').replace(/:not\(\s*\)/g, '').trim();
    if (!s || s === '*' || /^(html|body|:root)$/.test(s)) return false;
    try {
      return root.matches(s) || !!root.querySelector(s);
    } catch (err) {
      if (err instanceof DOMException) return false; /* 去掉伪类后不再合法的选择器，视为不匹配 */
      throw err;
    }
  };

  /* 声明块格式化：按分号拆行，忽略引号与括号里的分号 */
  const formatRule = (text) => {
    const open = text.indexOf('{');
    const head = text.slice(0, open).trim();
    const body = text.slice(open + 1, text.lastIndexOf('}')).trim();
    if (!body) return '';
    const decls = [];
    let depth = 0, quote = '', cur = '';
    for (const ch of body) {
      if (quote) { if (ch === quote) quote = ''; cur += ch; continue; }
      if (ch === '"' || ch === "'") { quote = ch; cur += ch; continue; }
      if (ch === '(') depth += 1;
      if (ch === ')') depth -= 1;
      if (ch === ';' && depth === 0) { if (cur.trim()) decls.push(cur.trim()); cur = ''; } else cur += ch;
    }
    if (cur.trim()) decls.push(cur.trim());
    return `${head} {\n${decls.map((d) => `  ${d};`).join('\n')}\n}`;
  };

  const collectCSS = (sheet, root) => {
    const rules = [];
    const animNames = new Set();
    [...sheet.cssRules].forEach((rule) => {
      if (!(rule instanceof CSSStyleRule)) return;
      if (PAGE_ONLY.test(rule.selectorText)) return;
      if (!splitSelectors(rule.selectorText).some((sel) => matchesTree(root, sel))) return;
      rules.push(rule);
      (rule.style.animationName || '').split(',').map((n) => n.trim()).filter((n) => n && n !== 'none').forEach((n) => animNames.add(n));
    });
    const text = rules.map((r) => formatRule(r.cssText)).filter(Boolean);
    const extra = [];
    [...sheet.cssRules].forEach((rule) => {
      if (rule instanceof CSSKeyframesRule && animNames.has(rule.name)) extra.push(rule.cssText);
      if (typeof CSSPropertyRule !== 'undefined' && rule instanceof CSSPropertyRule && text.some((t) => t.includes(rule.name))) extra.unshift(rule.cssText);
    });
    return { css: [...text, ...extra].join('\n\n'), raw: text.join('\n') + extra.join('\n') };
  };

  const collectTokens = (root, cssText, html) => {
    const names = new Set();
    `${cssText}\n${html}`.replace(/var\((--[\w-]+)/g, (_, n) => { names.add(n); return _; });
    const cs = getComputedStyle(root);
    const lines = [...names].sort().map((n) => [n, cs.getPropertyValue(n).trim()]).filter(([, v]) => v).map(([n, v]) => `  ${n}: ${v};`);
    return lines.length ? `:root {\n${lines.join('\n')}\n}` : '';
  };

  /* HTML 清理与缩进 */
  const DROP_ATTR = ['data-ui', 'data-zh', 'data-en', 'data-alias', 'data-cat', 'data-cat-k', 'data-act', 'data-tt', 'data-i', 'aria-hidden'];
  const cleanHTML = (root) => {
    const clone = root.cloneNode(true);
    clone.querySelectorAll('.prompt-btn, .mo-replay, .anno-tag').forEach((n) => n.remove());
    [clone, ...clone.querySelectorAll('*')].forEach((el) => {
      DROP_ATTR.forEach((a) => el.removeAttribute(a));
      el.classList.remove('rv', 'in', 'ui-hover', 'anno-host', 'locate-flash', 'flash');
      if (el.getAttribute('class') === '') el.removeAttribute('class');
    });
    clone.querySelectorAll('svg').forEach((svg) => {
      if (svg.outerHTML.length > 1600) {
        const note = document.createComment(` ${svg.getAttribute('aria-label') || '图形'} SVG（viewBox ${svg.getAttribute('viewBox')}）：按“图表”规范用数据生成，线宽 2px、柱宽 ≤24px、顶部 4px 圆角、网格 1px `);
        svg.replaceWith(note);
      }
    });
    return pretty(clone.outerHTML);
  };
  function pretty(html) {
    const tokens = html.replace(/>\s+</g, '><').split(/(<!--[\s\S]*?-->|<[^>]+>)/).map((t) => t.trim()).filter(Boolean);
    const VOID = /^<(area|br|col|hr|img|input|meta|link|source|wbr)\b/i;
    const lines = [];
    let depth = 0;
    for (let i = 0; i < tokens.length; i += 1) {
      const t = tokens[i];
      const pad = '  '.repeat(depth);
      const isClose = t.startsWith('</');
      const isOpen = t.startsWith('<') && !isClose && !t.startsWith('<!--') && !VOID.test(t) && !t.endsWith('/>');
      if (isOpen && tokens[i + 1] && !tokens[i + 1].startsWith('<') && tokens[i + 2] && tokens[i + 2].startsWith('</')) {
        lines.push(pad + t + tokens[i + 1] + tokens[i + 2]);
        i += 2;
      } else if (isOpen && tokens[i + 1] && tokens[i + 1].startsWith('</')) {
        lines.push(pad + t + tokens[i + 1]);
        i += 1;
      } else if (isClose) {
        depth = Math.max(0, depth - 1);
        lines.push('  '.repeat(depth) + t);
      } else {
        lines.push(pad + t);
        if (isOpen) depth += 1;
      }
    }
    return lines.join('\n');
  }

  /* 对外：提取一个子树的参考实现 */
  Atlas.extractReference = async (root) => {
    const sheet = await loadSheet();
    const html = cleanHTML(root);
    const { css, raw } = collectCSS(sheet, root);
    const base = 'body {\n  font-family: -apple-system, BlinkMacSystemFont, "PingFang SC", "Inter", "Microsoft YaHei", sans-serif;\n  font-size: 14px;\n  line-height: 1.6;\n  color: var(--fg);\n  -webkit-font-smoothing: antialiased;\n}\n*, *::before, *::after { box-sizing: border-box; }\nsvg { display: block; flex-shrink: 0; }';
    const tokens = collectTokens(root, `${raw}\n${base}`, html);
    return { html, css: `${base}\n\n${css}`, tokens };
  };
})();
