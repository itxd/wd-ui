/* 07 动效：原则、缓动、微交互、加载、入场转场、滚动、文字、氛围、手势 */
(function () {
  const I = Atlas.icon;
  const hows = { hover: ['pointer', '悬停'], click: ['target', '点击'], drag: ['grip', '拖动'], auto: ['refresh', '自动'], scroll: ['arrowDown', '滚动'], replay: ['play', '可重播'] };

  const mo = (cat) => (m) => `
    <div class="mo rv${m.w ? ` w${m.w}` : ''}" id="m-${m.id}" data-zh="${m.zh}" data-en="${m.en}" data-cat="动效 · ${cat}">
      <div class="mo-stage${m.replay ? ' run' : ''}${m.stage ? ` ${m.stage}` : ''}"${m.replay ? ' data-replay' : ''}>${m.html}</div>
      <div class="mo-meta">
        <div class="mo-title"><b>${m.zh}</b><em>${m.en}</em></div>
        <div class="mo-sub"><code>${m.tech}</code><span class="mo-how">${I(hows[m.how][0], 11)}${hows[m.how][1]}</span>
          ${m.replay ? `<button type="button" class="mo-replay" data-act="moReplay" aria-label="重播">${I('refresh', 13)}</button>` : ''}</div>
      </div>
    </div>`;
  const grid = (cat, items) => `<div class="mo-grid">${items.map(mo(cat)).join('')}</div>`;

  /* ---------- 缓动曲线 ---------- */
  const eases = [
    ['线性', 'linear', 'linear', [0, 0, 1, 1], '匀速，机械感。只用于旋转、进度条'],
    ['缓入缓出（默认）', 'ease', 'ease', [0.25, 0.1, 0.25, 1], '浏览器默认值'],
    ['缓入', 'ease-in', 'cubic-bezier(.55,0,1,.45)', [0.55, 0, 1, 0.45], '先慢后快。用于元素离开'],
    ['缓出', 'ease-out', 'cubic-bezier(.22,1,.36,1)', [0.22, 1, 0.36, 1], '先快后慢。用于元素进入，最常用'],
    ['缓入缓出', 'ease-in-out', 'cubic-bezier(.65,0,.35,1)', [0.65, 0, 0.35, 1], '两端慢中间快。用于位置移动'],
    ['回弹', 'back-out', 'cubic-bezier(.34,1.56,.64,1)', [0.34, 1.56, 0.64, 1], '冲过头再回来。用于弹窗、按钮'],
    ['弹簧', 'spring', 'keyframes', null, '多次衰减振荡。用于拖拽释放、物理感'],
    ['阶跃', 'steps(6)', 'steps(6)', null, '逐帧跳动。用于像素动画、打字'],
  ];
  const curve = (b) => {
    if (!b) return '<svg viewBox="-4 -14 48 68" class="ease-svg"><path d="M0,40 L40,0" style="stroke:var(--border-2)" stroke-dasharray="2 3"/></svg>';
    const [x1, y1, x2, y2] = b;
    return `<svg viewBox="-4 -14 48 68" class="ease-svg"><rect x="0" y="0" width="40" height="40" fill="none" style="stroke:var(--border)"/><line x1="0" y1="40" x2="${x1 * 40}" y2="${40 - y1 * 40}" style="stroke:var(--muted)"/><line x1="40" y1="0" x2="${x2 * 40}" y2="${40 - y2 * 40}" style="stroke:var(--muted)"/><path d="M0,40 C${x1 * 40},${40 - y1 * 40} ${x2 * 40},${40 - y2 * 40} 40,0" fill="none" style="stroke:var(--primary)" stroke-width="2.5"/></svg>`;
  };
  const easing = `
    <div class="ease-box rv" id="m-easing" data-zh="缓动曲线" data-en="Easing" data-cat="动效 · 基础">
      <div class="ease-head"><div><b>缓动曲线 Easing</b><p class="muted">同样 800ms，不同曲线的“性格”完全不同。点击某一行单独播放。</p></div><button class="btn btn-primary" type="button" data-act="easePlay">${I('play', 14)}全部播放</button></div>
      ${eases.map(([zh, en, css, b, d], i) => `
        <div class="ease-row" data-act="easePlay" data-i="${i}">
          ${curve(b)}
          <div class="ease-txt"><b>${zh}</b><code>${css === 'keyframes' ? '@keyframes 多段振荡' : css}</code><small>${d}</small></div>
          <div class="ease-track"><i class="ease-ball" style="--ease:${css === 'keyframes' ? 'linear' : css}" data-kind="${en}"></i></div>
        </div>`).join('')}
    </div>`;

  const durations = [['100–150ms', '微交互', '悬停、按下、颜色变化', 14], ['200–250ms', '小组件', '开关、复选框、下拉菜单', 24], ['300ms', '中型组件', '对话框、抽屉、标签页切换', 32], ['400–500ms', '大面积 / 页面', '页面转场、全屏展开', 48], ['600ms +', '强调 / 叙事', '首屏动画、引导、庆祝', 70]];
  const principles = [
    ['target', '有目的', 'Purposeful', '每个动效都在解释“发生了什么”：从哪来、到哪去、因果关系。'],
    ['zap', '快速', 'Fast', '多数界面动效在 150–400ms 之间，超过 500ms 就会让人等。'],
    ['leaf', '自然', 'Natural', '进入用缓出、离开用缓入，模拟真实物体的惯性。'],
    ['layers', '一致', 'Consistent', '同类元素使用同样的时长和曲线，定义为动效令牌。'],
    ['shield', '可关闭', 'Accessible', '尊重系统“减少动态效果”设置（prefers-reduced-motion）。'],
  ];

  /* ---------- 微交互 ---------- */
  const micro = [
    { id: 'lift', zh: '悬停上浮', en: 'Hover Lift', tech: 'translateY + shadow', how: 'hover', html: '<div class="fx-lift">卡片</div>' },
    { id: 'press', zh: '按压缩放', en: 'Press Scale', tech: ':active { scale(.94) }', how: 'click', html: '<button class="fx-press" type="button">按住我</button>' },
    { id: 'ripple', zh: '波纹', en: 'Ripple', tech: 'JS 定位 + scale', how: 'click', html: '<button class="fx-ripple ripple" type="button">点击产生波纹</button>' },
    { id: 'shine', zh: '光泽扫过', en: 'Shine Sweep', tech: '伪元素 translateX', how: 'hover', html: '<button class="fx-shine" type="button">立即购买</button>' },
    { id: 'magnetic', zh: '磁吸按钮', en: 'Magnetic', tech: 'JS 跟随鼠标偏移', how: 'hover', html: `<button class="fx-magnetic" type="button" data-magnetic><span>${I('arrowUR', 20)}</span></button>` },
    { id: 'beam', zh: '流光边框', en: 'Border Beam', tech: '@property + conic-gradient', how: 'auto', html: '<div class="fx-beam"><span>AI 已就绪</span></div>' },
    { id: 'underline', zh: '下划线生长', en: 'Underline Grow', tech: 'scaleX + transform-origin', how: 'hover', html: '<div class="fx-under"><a href="javascript:void(0)">产品</a><a href="javascript:void(0)">方案</a><a href="javascript:void(0)">定价</a></div>' },
    { id: 'fill', zh: '背景填充', en: 'Fill Slide', tech: 'background-size 过渡', how: 'hover', html: '<button class="fx-fill" type="button">了解更多</button>' },
    { id: 'nudge', zh: '图标位移', en: 'Icon Nudge', tech: 'translateX', how: 'hover', html: `<button class="fx-nudge btn btn-primary" type="button">下一步 ${I('arrowR', 16)}</button>` },
    { id: 'glow', zh: '呼吸发光', en: 'Glow Pulse', tech: 'box-shadow 关键帧', how: 'auto', html: '<span class="fx-glow"></span><span class="fx-glow-ring"></span>' },
    { id: 'tilt', zh: '3D 倾斜', en: 'Tilt Card', tech: 'rotateX/Y + perspective', how: 'hover', html: '<div class="fx-tilt" data-tilt><b>3D</b><small>移动鼠标</small><i class="fx-tilt-glare"></i></div>' },
    { id: 'spot', zh: '聚光灯', en: 'Spotlight', tech: 'radial-gradient 跟随鼠标', how: 'hover', html: '<div class="fx-spot spot"><b>Spotlight</b><small>光斑跟随鼠标</small></div>' },
    { id: 'flip', zh: '翻转卡片', en: 'Flip Card', tech: 'rotateY + backface-visibility', how: 'hover', html: '<div class="fx-flip"><div class="fx-flip-in"><div class="ff">正面</div><div class="fb">背面</div></div></div>' },
    { id: 'like', zh: '点赞爆发', en: 'Like Burst', tech: 'scale + 粒子扩散', how: 'click', html: `<button class="fx-like" type="button" data-act="likeBurst" aria-label="点赞">${I('heart', 30)}<i></i></button><span class="fx-like-n num">128</span>` },
    { id: 'burger', zh: '汉堡菜单变形', en: 'Hamburger Morph', tech: 'rotate + translate', how: 'click', html: '<button class="fx-burger" type="button" data-act="toggleOn" aria-label="菜单"><i></i><i></i><i></i></button>' },
    { id: 'daynight', zh: '日夜开关', en: 'Day / Night Toggle', tech: 'transform + 背景过渡', how: 'click', html: '<button class="fx-dn" type="button" data-act="toggleOn" aria-label="日夜切换"><i class="fx-dn-knob"></i><i class="fx-dn-star"></i></button>' },
    { id: 'checkdraw', zh: '勾选描绘', en: 'Checkbox Draw', tech: 'stroke-dashoffset', how: 'click', html: '<label class="fx-cd"><input type="checkbox"><svg viewBox="0 0 24 24"><rect x="2" y="2" width="20" height="20" rx="6"/><path d="M7 12.5l3.5 3.5L17 9"/></svg><span>完成任务</span></label>' },
    { id: 'copy', zh: '复制反馈', en: 'Copy → Check', tech: '图标交叉淡入', how: 'click', html: `<button class="fx-copy" type="button" data-act="fxCopy"><span class="a">${I('copy', 16)}</span><span class="b">${I('check', 16)}</span><em>复制链接</em></button>` },
    { id: 'shake', zh: '抖动报错', en: 'Shake Error', tech: 'translateX 关键帧', how: 'click', html: '<div class="fx-shake-wrap"><input class="input" value="wrong-password" type="password" aria-label="密码"><button class="btn btn-primary btn-sm" type="button" data-act="fxShake">登录</button></div>' },
    { id: 'morph', zh: '按钮状态变形', en: 'Button Morph', tech: 'width + border-radius', how: 'click', html: `<button class="fx-morph" type="button" data-act="fxMorph"><span class="t">提交订单</span><span class="spin"></span><span class="ok">${I('check', 20, 'line', 3)}</span></button>` },
    { id: 'odometer', zh: '数字滚动', en: 'Odometer', tech: 'translateY 数字列', how: 'click', html: '<div class="fx-odo" data-odo="2048"></div><button class="btn btn-sm" type="button" data-act="fxOdo">随机数字</button>' },
    { id: 'jelly', zh: '果冻弹跳', en: 'Jelly / Rubber Band', tech: 'scale(x,y) 关键帧', how: 'hover', html: '<div class="fx-jelly">Jelly</div>' },
  ];

  /* ---------- 加载 ---------- */
  const loaders = [
    ['环形', 'Ring', '<span class="ld-ring"></span>'], ['双环', 'Dual Ring', '<span class="ld-dual"></span>'], ['跳动三点', 'Bouncing Dots', '<span class="ld-bounce"><i></i><i></i><i></i></span>'],
    ['呼吸点', 'Pulse Dots', '<span class="ld-pulse"><i></i><i></i><i></i></span>'], ['音频条', 'Bars', '<span class="ld-bars"><i></i><i></i><i></i><i></i><i></i></span>'], ['轨道', 'Orbit', '<span class="ld-orbit"><i></i></span>'],
    ['方块翻转', 'Flip Square', '<span class="ld-flip"></span>'], ['波纹扩散', 'Ripple', '<span class="ld-ripple"><i></i><i></i></span>'], ['描边环', 'Stroke Ring', '<svg class="ld-stroke" viewBox="0 0 40 40"><circle cx="20" cy="20" r="16"/></svg>'],
    ['渐变旋转', 'Conic Spinner', '<span class="ld-conic"></span>'], ['网格闪烁', 'Grid Fade', `<span class="ld-grid">${'<i></i>'.repeat(9)}</span>`], ['顶部进度条', 'Top Progress', '<span class="ld-top"><i></i></span>'],
  ];

  /* ---------- 入场 ---------- */
  const enters = [['淡入', 'Fade In', 'a-fade'], ['上滑淡入', 'Fade Up', 'a-up'], ['侧滑入', 'Slide In', 'a-slide'], ['缩放入', 'Zoom In', 'a-zoom'], ['模糊入', 'Blur In', 'a-blur'], ['翻转入', 'Flip In', 'a-flip'],
    ['弹入', 'Bounce In', 'a-bounce'], ['旋转入', 'Rotate In', 'a-rotate'], ['裁切揭示', 'Clip Reveal', 'a-clip'], ['圆形揭示', 'Circle Reveal', 'a-circle'], ['弹性缩放', 'Elastic', 'a-elastic'], ['掉落', 'Drop In', 'a-drop']];

  const enterItems = [
    { id: 'stagger', zh: '交错进场', en: 'Stagger', tech: 'animation-delay 递增', how: 'replay', replay: true, html: `<ul class="fx-stagger">${['设计令牌', '组件库', '页面模板', '动效规范', '文档站点'].map((t, i) => `<li style="--i:${i}">${I('check', 13)}${t}</li>`).join('')}</ul>` },
    { id: 'pagetrans', zh: '页面转场', en: 'Page Transition', tech: 'Fade / Push / Zoom / Cover', how: 'click', w: 2, html: `
      <div class="pt-wrap"><div class="pt-ctrl"><div class="seg" id="ptMode">${[['fade', '淡入淡出'], ['push', '推入'], ['zoom', '缩放'], ['cover', '覆盖'], ['flip', '翻转']].map(([k, t], i) => `<button type="button" class="${i === 1 ? 'on' : ''}" data-mode="${k}">${t}</button>`).join('')}</div><button class="btn btn-primary btn-sm" type="button" data-act="pageTrans">${I('arrowR', 14)}切换页面</button></div>
      <div class="pt-frame" id="ptFrame" data-mode="push"><div class="pt-page on" data-p="0"><b>列表页</b>${['订单 #0871', '订单 #0870', '订单 #0869'].map((t) => `<span>${t}${I('chevR', 13)}</span>`).join('')}</div><div class="pt-page" data-p="1"><b>${I('chevL', 14)}详情页</b><i class="pt-hero"></i><span>订单 #0871 · 已完成</span><span>¥2,380.00</span></div></div></div>` },
    { id: 'shared', zh: '共享元素展开', en: 'Shared Element (FLIP)', tech: 'First-Last-Invert-Play', how: 'click', html: `<div class="se-grid" id="seGrid">${[['s-forest', '莫干山'], ['s-sunset', '安吉'], ['s-sea', '千岛湖']].map(([s, t]) => `<button type="button" class="se-card ${s}" data-act="seOpen"><b>${t}</b></button>`).join('')}<div class="se-detail" id="seDetail"><div class="se-hero"></div><b class="se-t"></b><p>点击卡片后，卡片从原位置平滑放大成详情，而不是突然切换。</p><button class="btn btn-sm" type="button" data-act="seClose">${I('x', 13)}关闭</button></div></div>` },
    { id: 'heightauto', zh: '高度自适应展开', en: 'Height Auto', tech: 'grid-template-rows 0fr→1fr', how: 'click', html: `<div class="fx-ha"><button class="btn btn-sm" type="button" data-act="toggleOn" data-target="parent">${I('chevD', 14)}展开详情</button><div class="fx-ha-body"><div><p>内容高度不固定也能平滑展开，过去需要 JS 计算高度，现在用 CSS Grid 即可。</p></div></div></div>` },
    { id: 'listanim', zh: '列表增删', en: 'List Add / Remove', tech: '展开 + 淡出折叠', how: 'click', html: `<div class="fx-list"><div class="row"><button class="btn btn-sm btn-primary" type="button" data-act="listAdd">${I('plus', 13)}添加</button><button class="btn btn-sm" type="button" data-act="listRemove">${I('minus', 13)}删除</button></div><ul id="fxList">${['买菜', '健身 30 分钟'].map((t) => `<li><span>${t}</span></li>`).join('')}</ul></div>` },
  ];

  /* ---------- 滚动 ---------- */
  const scrollItems = [
    { id: 'reveal', zh: '滚动显现', en: 'Scroll Reveal', tech: 'IntersectionObserver', how: 'scroll', html: `<div class="sc-box sc-reveal" data-sc-reveal>${Array.from({ length: 8 }, (_, i) => `<div class="sc-item" style="--h:${i * 45}"><i></i><span>第 ${i + 1} 张卡片</span></div>`).join('')}</div>` },
    { id: 'parallax', zh: '视差滚动', en: 'Parallax', tech: '不同层不同速度', how: 'scroll', html: `<div class="sc-box sc-para" data-parallax><div class="px-sky"></div><div class="px-l px-far" data-speed="0.2"></div><div class="px-l px-mid" data-speed="0.45"></div><div class="px-l px-near" data-speed="0.8"></div><div class="px-content"><b>向下滚动</b><p>远处的山移动得慢，近处的山移动得快，产生纵深感。</p>${'<p class="px-fill"></p>'.repeat(4)}</div></div>` },
    { id: 'shrink', zh: '吸顶收缩', en: 'Sticky Shrink Header', tech: 'scroll 事件 + class', how: 'scroll', html: `<div class="sc-box sc-shrink" data-shrink><header class="sh-head"><b>${I('layers', 16)}Brand</b><span class="sh-sub">滚动后我会变矮</span></header>${Array.from({ length: 10 }, (_, i) => `<p>内容第 ${i + 1} 行</p>`).join('')}</div>` },
    { id: 'readprog', zh: '阅读进度条', en: 'Reading Progress', tech: 'scrollTop / scrollHeight', how: 'scroll', html: `<div class="sc-box sc-read" data-readprog><i class="rp-bar"></i><h5>如何设计一个好的空状态</h5>${Array.from({ length: 7 }, () => '<p>空状态是用户第一次使用产品时最常见到的页面，它应该说明原因、给出下一步，并保持品牌语气。</p>').join('')}</div>` },
    { id: 'marquee', zh: '跑马灯', en: 'Marquee', tech: 'translateX 无限循环', how: 'auto', html: `<div class="fx-marquee">${[0, 1].map((r) => `<div class="mq-row${r ? ' rev' : ''}"><div class="mq-track">${[0, 1].map(() => ['设计令牌', '组件', '动效', '无障碍', '栅格', '色彩', '排版', '图标'].map((t) => `<span>${t}</span>`).join('')).join('')}</div></div>`).join('')}</div>` },
    { id: 'snap', zh: '滚动吸附', en: 'Scroll Snap', tech: 'scroll-snap-type', how: 'scroll', html: `<div class="fx-snap">${['s-forest', 's-sunset', 's-sea', 's-night'].map((s, i) => `<div class="${s}"><b>0${i + 1}</b></div>`).join('')}</div><small class="muted fx-snap-hint">横向拖动或滚动，卡片会自动对齐</small>` },
  ];

  /* ---------- 文字 ---------- */
  const textItems = [
    { id: 'typewriter', zh: '打字机', en: 'Typewriter', tech: 'JS 逐字 + 光标闪烁', how: 'auto', html: '<div class="fx-type">让界面<span class="tw" data-words="更清晰|更高效|更有温度|更好看"></span></div>' },
    { id: 'scramble', zh: '文字解码', en: 'Text Scramble', tech: 'JS 随机字符替换', how: 'hover', html: '<div class="fx-scramble" data-scramble="INTERFACE ATLAS">INTERFACE ATLAS</div><small class="muted">悬停重新解码</small>' },
    { id: 'gradtext', zh: '渐变流光文字', en: 'Gradient Text', tech: 'background-clip: text', how: 'auto', html: '<div class="fx-gradtext">Make it shine.</div>' },
    { id: 'wave', zh: '逐字波浪', en: 'Letter Wave', tech: '逐字 animation-delay', how: 'auto', html: `<div class="fx-wave">${'LOADING…'.split('').map((c, i) => `<span style="--i:${i}">${c}</span>`).join('')}</div>` },
    { id: 'highlight', zh: '马克笔高亮', en: 'Highlighter', tech: 'background-size 0→100%', how: 'hover', html: '<p class="fx-hl">好的设计是<mark>尽可能少</mark>的设计，<mark>少</mark>但更好。</p>' },
    { id: 'rotate', zh: '文字轮播', en: 'Rotating Words', tech: 'translateY 关键帧', how: 'auto', html: '<div class="fx-rot">为<span class="fx-rot-w"><span>设计师</span><span>工程师</span><span>产品经理</span><span>设计师</span></span>而做</div>' },
    { id: 'glitch', zh: '故障文字', en: 'Glitch', tech: 'clip-path + 偏移', how: 'auto', html: '<div class="fx-glitch" data-text="GLITCH">GLITCH</div>' },
    { id: 'strokefill', zh: '描边填充', en: 'Stroke → Fill', tech: '-webkit-text-stroke + clip', how: 'hover', html: '<div class="fx-stroke" data-text="HOVER">HOVER</div>' },
  ];

  /* ---------- 氛围 ---------- */
  const ambient = [
    { id: 'aurora', zh: '极光背景', en: 'Aurora', tech: 'blur + 漂移关键帧', how: 'auto', stage: 'dark', html: '<div class="am-aurora"><i></i><i></i><i></i></div><b class="am-txt">Aurora</b>' },
    { id: 'gridbeam', zh: '网格流光', en: 'Grid Beam', tech: '渐变线条位移', how: 'auto', stage: 'dark', html: '<div class="am-grid"><i class="h"></i><i class="v"></i><i class="h d2"></i></div>' },
    { id: 'particles', zh: '粒子连线', en: 'Particles', tech: 'Canvas 2D', how: 'auto', stage: 'dark', html: '<canvas class="am-particles" data-particles></canvas>' },
    { id: 'blob', zh: '流体形变', en: 'Morphing Blob', tech: 'border-radius 关键帧', how: 'auto', html: '<div class="am-blob"></div>' },
    { id: 'waves', zh: '波浪', en: 'Waves', tech: 'SVG + translateX', how: 'auto', html: `<div class="am-waves">${[0, 1, 2].map((i) => `<svg viewBox="0 0 1200 120" preserveAspectRatio="none" class="w${i}"><path d="M0 60 C150 100 350 20 600 60 S1050 100 1200 60 V120 H0Z"/></svg>`).join('')}</div>` },
    { id: 'radar', zh: '雷达扫描', en: 'Radar Sweep', tech: 'conic-gradient 旋转', how: 'auto', stage: 'dark', html: '<div class="am-radar"><i></i><b style="left:62%;top:30%"></b><b style="left:30%;top:58%"></b></div>' },
    { id: 'stars', zh: '星空闪烁', en: 'Starfield', tech: 'opacity 随机延迟', how: 'auto', stage: 'dark', html: `<div class="am-stars">${Array.from({ length: 40 }, (_, i) => { const r = Atlas.rand(i + 3); return `<i style="left:${(r() * 100).toFixed(1)}%;top:${(r() * 100).toFixed(1)}%;animation-delay:${(-r() * 3).toFixed(2)}s;--s:${(1 + r() * 2).toFixed(1)}px"></i>`; }).join('')}<span class="am-shoot"></span></div>` },
    { id: 'gradmesh', zh: '流动渐变', en: 'Gradient Flow', tech: 'background-position 循环', how: 'auto', html: '<div class="am-flow"></div>' },
  ];

  /* ---------- 手势 ---------- */
  const gesture = [
    { id: 'sortable', zh: '拖拽排序', en: 'Sortable List', tech: 'HTML5 Drag & Drop', how: 'drag', html: `<ul class="fx-sort" data-sortable>${['🥇 设计评审', '🥈 前端开发', '🥉 联调测试', '🚀 正式发布'].map((t) => `<li draggable="true">${I('grip', 14)}${t}</li>`).join('')}</ul>` },
    { id: 'swipe', zh: '卡片滑动', en: 'Swipe Cards', tech: 'Pointer 事件 + 旋转', how: 'drag', html: `<div class="fx-swipe" data-swipe-cards>${[['s-sea', '千岛湖', '27 岁 · 摄影'], ['s-sunset', '安吉', '25 岁 · 插画'], ['s-forest', '莫干山', '29 岁 · 设计']].map(([s, n, d]) => `<div class="sw-card ${s}"><b>${n}</b><small>${d}</small><em class="sw-like">喜欢</em><em class="sw-nope">跳过</em></div>`).join('')}<small class="muted sw-hint">左右拖动卡片</small></div>` },
    { id: 'elastic', zh: '弹性拖拽', en: 'Elastic Drag', tech: '松手弹簧回位', how: 'drag', html: '<div class="fx-elastic"><span class="el-ball" data-elastic></span><small class="muted">拖动小球后松手</small></div>' },
  ];

  Atlas.mount('motion', `
    <div class="wrap">
      ${Atlas.head({
        no: '07 / 动效',
        title: '动效样式',
        en: 'Motion',
        desc: '动效决定界面的“手感”。下面先讲原则、时长和缓动曲线，再按用途展示 80 多种常用动效。每张卡片都标注实现手段和触发方式（悬停 / 点击 / 拖动 / 滚动 / 自动），一次性的动画可以点右下角按钮重播。',
        chips: ['缓动', '时长', '微交互', '加载', '入场', '转场', '滚动', '文字', '手势'],
      })}

      <div class="prin-grid">${principles.map(([ic, zh, en, d]) => `<div class="prin rv"><span>${I(ic, 18)}</span><b>${zh}<em>${en}</em></b><p>${d}</p></div>`).join('')}</div>

      <div class="ease-dur">
        ${easing}
        <div class="dur-box rv">
          <b>时长参考 Duration</b>
          <p class="muted">元素越大、移动距离越远，时长越长；移动端可比桌面端稍快。</p>
          ${durations.map(([t, n, d, w]) => `<div class="dur-row"><div class="dur-top"><b class="mono">${t}</b><span>${n}</span></div><div class="dur-bar"><i style="width:${w}%"></i></div><small>${d}</small></div>`).join('')}
          <div class="dur-tokens"><code>--duration-fast: 150ms</code><code>--duration-base: 250ms</code><code>--duration-slow: 400ms</code><code>--ease-out: cubic-bezier(.22,1,.36,1)</code></div>
        </div>
      </div>

      ${Atlas.sub({ title: '微交互', en: 'Micro-interactions', desc: '鼠标悬停、点击、切换状态时的小动画。它们让用户确认“我的操作被收到了”。' })}
      ${grid('微交互', micro)}

      ${Atlas.sub({ title: '加载', en: 'Loading', desc: '等待超过 300ms 才显示加载动画，超过 1 秒给出进度或骨架屏，超过 10 秒说明原因并允许取消。' })}
      <div class="loaders rv" id="m-loaders" data-zh="加载动画" data-en="Loaders" data-cat="动效 · 加载">${loaders.map(([zh, en, h]) => `<div class="loader-cell"><div class="loader-stage">${h}</div><b>${zh}</b><small>${en}</small></div>`).join('')}</div>

      ${Atlas.sub({ title: '入场与转场', en: 'Enter & Transition', desc: '元素出现、消失和页面切换的方式。点击任意格子重播，或点击“全部重播”。', right: `<button class="btn" type="button" data-act="enterReplay">${I('refresh', 14)}全部重播</button>` })}
      <div class="enter-grid rv" id="m-enter" data-zh="入场动画" data-en="Entrance Animations" data-cat="动效 · 入场">${enters.map(([zh, en, cls]) => `<button type="button" class="enter-cell" data-act="enterOne"><span class="enter-stage run"><i class="enter-box ${cls}"></i></span><b>${zh}</b><small>${en}</small></button>`).join('')}</div>
      ${grid('转场', enterItems)}

      ${Atlas.sub({ title: '滚动驱动', en: 'Scroll-driven', desc: '在下方每个小窗口里滚动体验。本页面本身也用了“滚动显现”和顶部“阅读进度条”。' })}
      ${grid('滚动', scrollItems)}

      ${Atlas.sub({ title: '文字动效', en: 'Text Effects', desc: '用于标题、口号、加载提示，吸引注意力，但正文不要动。' })}
      ${grid('文字', textItems)}

      ${Atlas.sub({ title: '背景与氛围', en: 'Ambient', desc: '营造氛围的循环动画，常见于首屏和大屏。注意性能和对正文的干扰。' })}
      ${grid('氛围', ambient)}

      ${Atlas.sub({ title: '拖拽与手势', en: 'Drag & Gesture', desc: '跟随手指 / 鼠标的直接操纵，松手后有物理回弹。' })}
      ${grid('手势', gesture)}
    </div>`);
})();
