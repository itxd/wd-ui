#!/usr/bin/env node
/* 生成两类产物：
   1. js/data/css-bundle.js —— 全部 CSS 文本，供提示词提取参考实现（本地 file:// 也可用）
   2. skills/wd-ui/references/*.md 中的自动生成部分 —— 与网站数据保持一致
   用法：node scripts/build.mjs           写入文件
         node scripts/build.mjs --check   只检查产物是否最新，不一致时退出码为 1 */
import fs from 'node:fs';
import path from 'node:path';
import vm from 'node:vm';
import { fileURLToPath } from 'node:url';

const ROOT = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '..');
const SITE = 'https://itxd.github.io/wd-ui/';
const read = (p) => fs.readFileSync(path.join(ROOT, p), 'utf8');

/* ---------- 1. CSS 打包 ---------- */
function cssBundle() {
  const html = read('index.html');
  const files = [...html.matchAll(/<link rel="stylesheet" href="([^"]+)">/g)].map((m) => m[1]);
  const css = files.map((f) => `/* ${f} */\n${read(f)}`).join('\n');
  return `/* 自动生成，请勿手改：node scripts/build.mjs */\nwindow.AtlasCSS = ${JSON.stringify(css)};\n`;
}

/* ---------- 2. 在 vm 中执行网站数据脚本，读取结构化数据 ---------- */
function loadSiteData() {
  const stubEl = () => ({ innerHTML: '', dataset: {}, style: { setProperty() {} }, addEventListener() {}, querySelector: () => null, querySelectorAll: () => [] });
  const ctx = { console, Math, Date, JSON, Number, String, Array, Object, Set, Map, RegExp, Error };
  ctx.window = ctx;
  ctx.document = { getElementById: stubEl, querySelector: () => null, querySelectorAll: () => [], addEventListener() {}, documentElement: stubEl() };
  vm.createContext(ctx);
  const run = (f) => vm.runInContext(read(f), ctx, { filename: f });
  ['js/core.js', 'js/icons.js', 'js/charts.js', 'js/data/style-specs.js', 'js/data/form-prompts.js',
    'js/sections/colors.js', 'js/sections/styles.js', 'js/sections/pages.js', 'js/sections/components.js'].forEach(run);
  const cmps = [];
  const orig = ctx.Atlas.cmpGrid;
  ctx.Atlas.cmpGrid = (cat, items) => { cmps.push({ cat, items }); return orig(cat, items); };
  ['js/sections/components-nav.js', 'js/sections/components-entry.js', 'js/sections/components-display.js',
    'js/sections/components-feedback.js', 'js/sections/components-charts-ai.js', 'js/sections/motion.js'].forEach(run);
  return { A: ctx.Atlas, cmps };
}

/* ---------- 3. 生成 skill 参考资料 ---------- */
const HEAD = (title, desc) => `<!-- 自动生成，请勿手改：node scripts/build.mjs（数据源：网站 js/ 目录） -->\n# ${title}\n\n${desc}\n`;

function stylesMd(A) {
  const order = ['saas', ...A.styles.map((s) => s.id)];
  const meta = Object.fromEntries(A.styles.map((s) => [s.id, s]));
  const tagZh = { classic: '经典', texture: '质感', trend: '潮流', retro: '复古/艺术', tech: '科技', local: '本土' };
  const index = order.map((id) => {
    const sp = A.styleSpecs[id];
    const m = meta[id];
    return `| \`${id}\` | ${sp.zh} | ${sp.en} | ${m ? m.tags.split(' ').map((t) => tagZh[t]).join(' / ') : '经典'} | ${sp.mood} | ${m ? m.fit : 'B 端系统、SaaS、工具类产品'} |`;
  }).join('\n');
  const body = order.map((id) => {
    const sp = A.styleSpecs[id];
    const m = meta[id];
    return [
      `## \`${id}\` ${sp.zh}（${sp.en}）`,
      m ? `- 流行时期：${m.era}\n- 特征：${m.feats.join('；')}\n- 关键实现：${m.css.map((c) => `\`${c}\``).join('、')}\n- 适用：${m.fit}\n- 代表：${m.ref}\n- 在线样本：${SITE}#st-${id}` : `- 适用：B 端系统、SaaS、工具类产品（网站“产品形态”章节的默认风格）\n- 在线样本：${SITE}#platforms`,
      '',
      '```text',
      A.styleSpecText(id),
      '```',
    ].join('\n');
  }).join('\n\n');
  return `${HEAD('UI 风格库', `共 ${order.length} 种风格。每种风格的“规格”块可以直接放进设计提示词的“视觉风格”部分。`)}\n## 索引\n\n| id | 中文 | English | 类别 | 气质 | 适用 |\n| --- | --- | --- | --- | --- | --- |\n${index}\n\n${body}\n`;
}

function palettesMd(A) {
  const rows = A.palettes.map((p, i) => `| ${i + 1} | ${p.zh} | ${p.en} | \`${p.c[p.p]}\` | ${p.c.map((c) => `\`${c}\``).join(' ')} | ${p.mood.join('、')} | ${p.fit} | ${p.ref} |`).join('\n');
  return `${HEAD('配色库', `共 ${A.palettes.length} 套。“主色”列是推荐的品牌主色；其余色值按亮度分配为文字色、背景色和辅助色。在线色板：${SITE}#colors`)}\n| # | 名称 | English | 主色 | 色值 | 情绪 | 适用行业 | 代表品牌 |\n| --- | --- | --- | --- | --- | --- | --- | --- |\n${rows}\n\n## 功能色（所有配色通用）\n\n| 角色 | 色值 | 用途 |\n| --- | --- | --- |\n| 成功 Success | \`#16A34A\` | 完成、正常、上涨 |\n| 警告 Warning | \`#F59E0B\` | 注意、即将过期、待处理 |\n| 错误 Error | \`#EF4444\` | 失败、删除、校验错误 |\n| 信息 Info | \`#0EA5E9\` | 提示、进行中 |\n\n## 使用规则\n\n- 60-30-10：60% 中性背景，30% 表面与次要色，10% 主色\n- 主色扩展为 50–950 色阶：50–100 选中底色，300–400 边框与禁用，500 基准，600–700 悬停与按下，900 深色文字\n- 深色模式不是反色：背景用深灰，表面逐级提亮，主色饱和度略降\n`;
}

function componentsMd(cmps) {
  const total = cmps.reduce((a, c) => a + c.items.length, 0);
  const body = cmps.map(({ cat, items }) => `## ${cat}\n\n| 中文 | English | 别名 | 要点 |\n| --- | --- | --- | --- |\n${items.map((c) => `| ${c.zh} | ${c.en} | ${c.alias || ''} | ${(c.note || '').replace(/\|/g, '/')} |`).join('\n')}`).join('\n\n');
  return `${HEAD('组件词汇表', `共 ${total} 个组件，按功能分 ${cmps.length} 类。写提示词时用这里的标准名称（中文 + English），AI 能更准确地理解。每个组件都可以在 ${SITE}#components 点击“提示词”复制带完整 HTML / CSS 的精确提示词。`)}\n${body}\n`;
}

function pagesMd(A) {
  const body = A.pageItems.map((p) => `## ${p.zh}（${p.en}）· ${p.cat}\n\n- 布局：${p.layout}\n- 必备组件：${p.keys}`).join('\n\n');
  return `${HEAD('页面模板', `共 ${A.pageItems.length} 种常见页面。先选最接近的页面类型，再把布局和必备组件写进提示词。线框图：${SITE}#pages`)}\n${body}\n`;
}

function formsMd(A) {
  const body = Object.entries(A.formViews).map(([k, v]) => [
    `## \`${k}\` ${v.form} · ${v.title}（${v.size}）`,
    `- 目标：${v.goal}`,
    `- 布局：\n${v.layout.map((l) => `  - ${l}`).join('\n')}`,
    `- 区域与组件：\n${v.parts.map((p, i) => `  ${i + 1}. ${p}`).join('\n')}`,
    `- 交互：${v.interactions.join('；')}`,
  ].join('\n')).join('\n\n');
  return `${HEAD('产品形态界面模板', `${Object.keys(A.formViews).length} 个高保真界面的结构描述，覆盖管理后台、Web 应用、App 三种形态。可与任意风格组合：结构取自这里，视觉取自 styles.md。在线示例（可切换风格）：${SITE}#platforms`)}\n${body}\n`;
}

function motionMd(A) {
  const m = A.motionCatalog;
  const list = (title, items) => `## ${title}\n\n| 中文 | English | 实现 | 触发 |\n| --- | --- | --- | --- |\n${items.map((x) => `| ${x.zh} | ${x.en} | \`${x.tech}\` | ${x.how} |`).join('\n')}`;
  const howZh = (arr) => arr.map((x) => ({ ...x, how: { hover: '悬停', click: '点击', drag: '拖动', auto: '自动', scroll: '滚动', replay: '进入视野' }[x.how] }));
  return `${HEAD('动效库', `缓动、时长与 ${m.micro.length + m.loaders.length + m.enters.length + m.enterItems.length + m.scrollItems.length + m.textItems.length + m.ambient.length + m.gesture.length} 种常用动效。在线演示与精确提示词：${SITE}#motion`)}
## 动效令牌

\`\`\`css
:root {
  --duration-fast: 150ms;   /* 悬停、按下、颜色变化 */
  --duration-base: 250ms;   /* 开关、下拉、复选 */
  --duration-slow: 400ms;   /* 对话框、抽屉、页面转场 */
  --ease-out: cubic-bezier(.22, 1, .36, 1);      /* 进入，最常用 */
  --ease-in: cubic-bezier(.55, 0, 1, .45);       /* 离开 */
  --ease-in-out: cubic-bezier(.65, 0, .35, 1);   /* 位置移动 */
  --ease-spring: cubic-bezier(.34, 1.56, .64, 1); /* 弹窗、按钮回弹 */
}
\`\`\`

## 缓动曲线

| 名称 | 写法 | 用途 |
| --- | --- | --- |
${m.eases.map(([zh, en, css, , d]) => `| ${zh} | \`${css === 'keyframes' ? '@keyframes 多段衰减' : css}\` | ${d}（${en}） |`).join('\n')}

${list('微交互', howZh(m.micro))}

## 加载

${m.loaders.map(([zh, en]) => `${zh} ${en}`).join('、')}

## 入场

${m.enters.map(([zh, en]) => `${zh} ${en}`).join('、')}

${list('转场', howZh(m.enterItems))}

${list('滚动驱动', howZh(m.scrollItems))}

${list('文字', howZh(m.textItems))}

${list('背景与氛围', howZh(m.ambient))}

${list('拖拽与手势', howZh(m.gesture))}

## 原则

- 进入用缓出，离开用缓入；多数界面动效 150–400ms
- 只对 transform / opacity / filter 做动画
- 尊重 prefers-reduced-motion
`;
}

/* ---------- 写入或检查 ---------- */
const { A, cmps } = loadSiteData();
const outputs = {
  'js/data/css-bundle.js': cssBundle(),
  'skills/wd-ui/references/styles.md': stylesMd(A),
  'skills/wd-ui/references/palettes.md': palettesMd(A),
  'skills/wd-ui/references/components.md': componentsMd(cmps),
  'skills/wd-ui/references/pages.md': pagesMd(A),
  'skills/wd-ui/references/forms.md': formsMd(A),
  'skills/wd-ui/references/motion.md': motionMd(A),
};
const check = process.argv.includes('--check');
let stale = 0;
for (const [file, content] of Object.entries(outputs)) {
  const abs = path.join(ROOT, file);
  const old = fs.existsSync(abs) ? fs.readFileSync(abs, 'utf8') : null;
  if (old === content) continue;
  if (check) { stale += 1; console.error(`过期：${file}`); continue; }
  fs.mkdirSync(path.dirname(abs), { recursive: true });
  fs.writeFileSync(abs, content);
  console.log(`已写入：${file}`);
}
if (check && stale) process.exit(1);
if (check) console.log('产物均为最新');
