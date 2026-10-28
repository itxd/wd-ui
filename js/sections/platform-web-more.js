/* Web 应用示例（二）：电商商品详情页、文档站 */
(function () {
  const I = Atlas.icon;

  /* 用 SVG 画一副头戴耳机作为商品图，颜色跟随 --prod */
  const headphone = (scale = 1) => `
    <svg viewBox="0 0 200 200" class="shop-prod-svg" style="transform:scale(${scale})" aria-hidden="true">
      <path d="M40 112 V96 a60 60 0 0 1 120 0 V112" fill="none" style="stroke:var(--prod-dark)" stroke-width="10" stroke-linecap="round"/>
      <rect x="22" y="104" width="40" height="62" rx="18" style="fill:var(--prod)"/>
      <rect x="138" y="104" width="40" height="62" rx="18" style="fill:var(--prod)"/>
      <rect x="30" y="114" width="14" height="42" rx="7" style="fill:var(--prod-dark)" opacity=".35"/>
      <rect x="156" y="114" width="14" height="42" rx="7" style="fill:var(--prod-dark)" opacity=".35"/>
      <ellipse cx="100" cy="182" rx="70" ry="6" fill="#000" opacity=".08"/>
    </svg>`;

  const swatches = [['#1f2937', '#0b0f17', '曜石黑'], ['#e5e7eb', '#9ca3af', '云母白'], ['#94a3b8', '#475569', '远峰蓝'], ['#d6b38a', '#8a6a45', '沙丘金']];
  const recs = [
    ['Aura Buds 真无线耳机', '¥699', '¥899', '#a5b4fc', '-22%'],
    ['Nova 智能音箱 Mini', '¥299', '¥399', '#fca5a5', '-25%'],
    ['Loop 磁吸充电底座', '¥159', '', '#86efac', '新品'],
    ['Pulse 运动手环 5', '¥249', '¥329', '#fcd34d', '-24%'],
  ];

  const shop = `
    <div class="shop">
      <header class="shop-head" data-ui="电商顶栏 · Store Header">
        <div class="shop-logo">${I('bag', 18)}<b>优选 Mall</b></div>
        <div class="shop-search" data-ui="搜索栏 · Search Bar">
          <span class="shop-search-cat">全部 ${I('chevD', 12)}</span>
          <input placeholder="降噪耳机" aria-label="搜索商品">
          <button class="btn btn-primary" type="button">${I('search', 15)}搜索</button>
        </div>
        <div class="shop-icons">
          <a href="javascript:void(0)">${I('user', 18)}<span>登录</span></a>
          <a href="javascript:void(0)">${I('heart', 18)}<span>收藏</span></a>
          <a href="javascript:void(0)" class="badge-wrap" data-ui="购物车徽标 · Cart Badge">${I('cart', 18)}<span>购物车</span><em class="badge" id="shopCartBadge">2</em></a>
        </div>
      </header>
      <nav class="shop-cats" data-ui="分类导航 · Category Nav">
        <a href="javascript:void(0)" class="shop-allcat">${I('menu', 14)}全部分类</a>
        ${['数码影音', '手机', '电脑办公', '智能家居', '运动户外', '美妆个护', '食品生鲜'].map((c, i) => `<a href="javascript:void(0)"${i === 0 ? ' class="on"' : ''}>${c}</a>`).join('')}
        <a href="javascript:void(0)" class="shop-hot">${I('flame', 13)}双 11 会场</a>
      </nav>
      <div class="shop-wrap">
        <nav class="crumb"><a href="javascript:void(0)">首页</a><span class="sep">›</span><a href="javascript:void(0)">数码影音</a><span class="sep">›</span><a href="javascript:void(0)">耳机</a><span class="sep">›</span><b>Aura Pro</b></nav>
        <div class="shop-main">
          <div class="shop-gallery" id="shopGallery" data-ui="商品图集 · Product Gallery" style="--prod:#1f2937;--prod-dark:#0b0f17">
            <div class="shop-main-img">${headphone(1)}<span class="shop-zoom">${I('search', 14)} 悬停放大</span><span class="tag tag-danger shop-img-tag">秒杀</span></div>
            <div class="shop-thumbs" data-ui="缩略图 · Thumbnails">
              ${[1, 0.8, 0.9, 0.7].map((s, i) => `<button type="button" class="${i === 0 ? 'on' : ''}" data-act="shopThumb">${headphone(s)}</button>`).join('')}
            </div>
          </div>
          <div class="shop-info">
            <div class="row-wrap"><span class="tag tag-primary">自营</span><span class="tag">官方旗舰店</span></div>
            <h1>Aura Pro 主动降噪头戴式耳机 · 40 小时续航 · 空间音频</h1>
            <div class="shop-rating" data-ui="评分 · Rate"><span class="shop-stars">★★★★★</span><b>4.8</b><a href="javascript:void(0)">2,316 条评价</a><span class="muted">|</span><span class="muted">已售 1 万+</span></div>
            <div class="shop-price-box">
              <div class="shop-flash" data-ui="倒计时 · Countdown">${I('zap', 14)}<b>限时秒杀</b><span class="spacer"></span>距结束<span class="shop-cd num" id="shopCountdown"><i>02</i>:<i>13</i>:<i>45</i></span></div>
              <div class="shop-price-row" data-ui="价格 · Price">
                <span class="shop-price num"><small>¥</small>1,299</span><s class="muted num">¥1,699</s><span class="tag tag-danger">省 ¥400</span>
              </div>
              <div class="shop-coupons" data-ui="优惠券 · Coupon">
                <span class="muted">优惠</span>
                <span class="shop-coupon"><b>¥50</b>满 999 可用</span><span class="shop-coupon"><b>12 期</b>免息</span>
                <a href="javascript:void(0)" class="btn btn-text">领券 ${I('chevR', 12)}</a>
              </div>
            </div>
            <div class="shop-opt"><span class="muted">配送</span><div>${I('pin', 13)} 浙江 杭州 西湖区 <b class="shop-ok">有货</b> · 今天 23:00 前下单，明天送达</div></div>
            <div class="shop-opt"><span class="muted">颜色</span>
              <div class="shop-swatches" data-ui="颜色选择 · Color Swatch">
                ${swatches.map(([c, d, n], i) => `<button type="button" class="${i === 0 ? 'on' : ''}" data-act="shopSwatch" data-c="${c}" data-d="${d}"><i style="background:${c}"></i>${n}</button>`).join('')}
              </div>
            </div>
            <div class="shop-opt"><span class="muted">版本</span>
              <div class="shop-skus" data-ui="规格选择 · SKU Selector">
                <button type="button" class="on" data-act="shopSku">标准版</button><button type="button" data-act="shopSku">Pro 版 + 收纳包</button><button type="button" disabled>典藏版（无货）</button>
              </div>
            </div>
            <div class="shop-opt"><span class="muted">数量</span>
              <div class="stepper" data-ui="数量步进器 · InputNumber / Stepper"><button type="button" data-act="step" data-d="-1">${I('minus', 14)}</button><input value="1" class="num" aria-label="数量"><button type="button" data-act="step" data-d="1">${I('plus', 14)}</button></div>
              <span class="muted shop-stock">库存 326 件 · 限购 5 件</span>
            </div>
            <div class="shop-buy" data-ui="购买操作栏 · Buy Box">
              <button class="btn btn-lg shop-add" type="button" data-act="shopAdd">${I('cart', 16)}加入购物车</button>
              <button class="btn btn-lg btn-primary shop-now" type="button" data-act="toast" data-msg="正在跳转到结算页…">立即购买</button>
              <button class="btn btn-lg btn-icon" type="button" data-act="like" aria-label="收藏">${I('heart', 18)}</button>
            </div>
            <div class="shop-guarantee" data-ui="服务保障 · Service Tags">
              ${['正品保证', '7 天无理由退货', '顺丰包邮', '两年质保'].map((t) => `<span>${I('checkCircle', 13)}${t}</span>`).join('')}
            </div>
          </div>
        </div>

        <div class="shop-detail">
          <div class="tabs-line shop-tabs" data-ui="详情标签页 · Tabs"><button class="on" type="button">商品详情</button><button type="button">规格参数</button><button type="button">用户评价 <span class="tag tag-round">2.3k</span></button><button type="button">售后保障</button></div>
          <div class="shop-reviews">
            <div class="shop-score" data-ui="评分分布 · Rating Summary">
              <b class="num">4.8</b><span class="shop-stars">★★★★★</span><span class="muted">好评率 97%</span>
              ${[[5, 86], [4, 9], [3, 3], [2, 1], [1, 1]].map(([s, p]) => `<div class="shop-bar"><span>${s} 星</span><div class="progress"><i style="--v:${p}%;--c:#f59e0b"></i></div><em class="num">${p}%</em></div>`).join('')}
            </div>
            <div class="shop-review-list">
              <div class="shop-review-tags" data-ui="评价标签 · Review Tags">${['降噪效果好 (412)', '佩戴舒适 (356)', '音质出色 (298)', '续航长 (201)', '有点夹头 (23)'].map((t, i) => `<span class="tag ${i < 4 ? 'tag-primary' : ''} tag-round">${t}</span>`).join('')}</div>
              <article class="shop-review" data-ui="评价卡片 · Review Card">
                <header><span class="avatar avatar-sm av2">周</span><b>周**安</b><span class="shop-stars small">★★★★★</span><span class="muted">曜石黑 · 标准版 · 10 月 21 日</span></header>
                <p>地铁上打开降噪基本听不到报站声，戴两个小时耳朵也不闷。空间音频看电影很有包围感，就是收纳包要另买。</p>
                <div class="shop-review-imgs">${[0, 1, 2].map((k) => `<span style="--h:${200 + k * 40}"></span>`).join('')}</div>
                <footer class="muted"><span>${I('thumb', 13)} 有用 128</span><span>${I('message', 13)} 回复 6</span></footer>
              </article>
            </div>
          </div>
        </div>

        <div class="shop-recs">
          <div class="row"><h3>猜你喜欢</h3><span class="spacer"></span><a class="btn btn-text" href="javascript:void(0)">换一批 ${I('refresh', 12)}</a></div>
          <div class="shop-grid" data-ui="商品卡片网格 · Product Card Grid">
            ${recs.map(([n, p, o, c, t], i) => `
              <div class="shop-card"${i === 0 ? ' data-ui="商品卡片 · Product Card"' : ''}>
                <div class="shop-card-img" style="--pc:${c}"><span class="tag ${t === '新品' ? 'tag-success' : 'tag-danger'}">${t}</span><button class="shop-quick" type="button" data-act="shopAdd" data-ui="快速加购 · Quick Add">${I('plus', 16)}</button></div>
                <b>${n}</b><div class="row"><span class="shop-card-price num">${p}</span>${o ? `<s class="muted num">${o}</s>` : ''}</div>
              </div>`).join('')}
          </div>
        </div>
      </div>
    </div>`;

  /* ---------- 文档站 Docs ---------- */
  const docTree = [
    ['开始', ['介绍', '安装', '快速上手', '更新日志']],
    ['基础', ['主题定制', '暗色模式', '国际化', '无障碍']],
    ['组件', ['Button 按钮', 'Input 输入框', 'Table 表格', 'Modal 对话框', 'Toast 轻提示']],
  ];
  const props = [
    ['variant', '按钮类型', "'primary' | 'secondary' | 'ghost' | 'danger'", "'secondary'"],
    ['size', '尺寸', "'sm' | 'md' | 'lg'", "'md'"],
    ['loading', '是否显示加载状态', 'boolean', 'false'],
    ['icon', '前置图标', 'ReactNode', '—'],
    ['onClick', '点击回调', '(e: MouseEvent) => void', '—'],
  ];
  const docs = `
    <div class="docs">
      <header class="docs-top" data-ui="文档顶栏 · Docs Header">
        <div class="docs-logo">${I('book', 17)}<b>Lumen UI</b><span class="tag tag-round" data-ui="版本选择 · Version Switcher">v3.2 ${I('chevD', 11)}</span></div>
        <nav><a href="javascript:void(0)" class="on">指南</a><a href="javascript:void(0)">组件</a><a href="javascript:void(0)">API</a><a href="javascript:void(0)">资源</a></nav>
        <span class="spacer"></span>
        <button class="docs-search" type="button" data-act="cmdk" data-ui="文档搜索 · DocSearch">${I('search', 14)}<span>搜索文档</span><span class="kbd">⌘</span><span class="kbd">K</span></button>
        <a class="btn btn-ghost btn-sm btn-icon" href="javascript:void(0)" aria-label="GitHub">${I('github', 16)}</a>
      </header>
      <div class="docs-body">
        <aside class="docs-side" data-ui="文档目录树 · Sidebar Tree">
          ${docTree.map(([g, items]) => `<div class="docs-group"><b>${g}</b>${items.map((it) => `<a href="javascript:void(0)"${it === '安装' ? ' class="on"' : ''}>${it}${it === '更新日志' ? '<span class="tag tag-success tag-round">新</span>' : ''}</a>`).join('')}</div>`).join('')}
        </aside>
        <article class="docs-content">
          <nav class="crumb"><a href="javascript:void(0)">指南</a><span class="sep">›</span><a href="javascript:void(0)">开始</a><span class="sep">›</span><b>安装</b></nav>
          <h1>安装</h1>
          <p class="docs-lead">Lumen UI 支持 React 18+ 与 Vue 3.3+。推荐使用包管理器安装，也可以通过 CDN 直接引入。</p>
          <div class="docs-callout tip" data-ui="提示块 · Callout">${I('info', 16)}<div><b>提示</b><p>如果你在用 Next.js 14 及以上版本，可以直接使用官方模板，跳过手动配置。</p></div></div>
          <h2 id="docs-pm">使用包管理器</h2>
          <div class="docs-code" data-ui="代码块 · Code Block（带标签与复制）">
            <div class="docs-code-head">
              <div class="docs-code-tabs">${['npm', 'pnpm', 'yarn'].map((p, i) => `<button type="button" class="${i === 0 ? 'on' : ''}" data-act="codeTab" data-cmd="${p === 'npm' ? 'npm install @lumen/ui' : p === 'pnpm' ? 'pnpm add @lumen/ui' : 'yarn add @lumen/ui'}">${p}</button>`).join('')}</div>
              <button class="btn btn-ghost btn-xs" type="button" data-act="copyCode">${I('copy', 12)}<span>复制</span></button>
            </div>
            <pre><code><span class="tk-mute">$</span> <span class="docs-cmd">npm install @lumen/ui</span></code></pre>
          </div>
          <h2 id="docs-import">引入组件</h2>
          <div class="docs-code">
            <div class="docs-code-head"><span class="mono muted">App.tsx</span><button class="btn btn-ghost btn-xs" type="button" data-act="copyCode">${I('copy', 12)}<span>复制</span></button></div>
            <pre><code><span class="tk-kw">import</span> { <span class="tk-fn">Button</span> } <span class="tk-kw">from</span> <span class="tk-str">'@lumen/ui'</span>;
<span class="tk-kw">import</span> <span class="tk-str">'@lumen/ui/styles.css'</span>;

<span class="tk-kw">export default function</span> <span class="tk-fn">App</span>() {
  <span class="tk-kw">return</span> &lt;<span class="tk-tag">Button</span> <span class="tk-attr">variant</span>=<span class="tk-str">"primary"</span>&gt;开始使用&lt;/<span class="tk-tag">Button</span>&gt;;
}</code></pre>
          </div>
          <h2 id="docs-api">API</h2>
          <div class="docs-table-wrap"><table class="tbl" data-ui="属性表 · API Table">
            <thead><tr><th>属性</th><th>说明</th><th>类型</th><th>默认值</th></tr></thead>
            <tbody>${props.map((p) => `<tr><td><code class="docs-prop">${p[0]}</code></td><td>${p[1]}</td><td><code class="docs-type">${p[2]}</code></td><td><code>${p[3]}</code></td></tr>`).join('')}</tbody>
          </table></div>
          <div class="docs-callout warn">${I('alert', 16)}<div><b>注意</b><p>v3 起移除了 <code>type</code> 属性，请改用 <code>variant</code>。</p></div></div>
          <div class="docs-feedback" data-ui="反馈 · Feedback">这篇文档有帮助吗？<button class="btn btn-sm" type="button" data-act="toast" data-msg="感谢你的反馈">${I('thumb', 13)} 有帮助</button><button class="btn btn-sm" type="button" data-act="toast" data-msg="我们会继续改进">没帮助</button><span class="spacer"></span><a href="javascript:void(0)" class="muted row">${I('edit', 13)} 在 GitHub 上编辑此页</a></div>
          <div class="docs-pager" data-ui="上下篇导航 · Prev / Next">
            <a href="javascript:void(0)"><small>上一篇</small><b>${I('arrowL', 14)} 介绍</b></a>
            <a href="javascript:void(0)"><small>下一篇</small><b>快速上手 ${I('arrowR', 14)}</b></a>
          </div>
        </article>
        <aside class="docs-toc" data-ui="页内目录 · Table of Contents">
          <b>本页目录</b>
          <a href="javascript:void(0)" class="on">使用包管理器</a><a href="javascript:void(0)">引入组件</a><a href="javascript:void(0)">API</a>
          <div class="docs-toc-ad"><span class="tag tag-primary tag-round">活动</span><p>Lumen Conf 2026 · 11 月 18 日 杭州</p></div>
        </aside>
      </div>
    </div>`;

  Atlas.mount('webShop', Atlas.browser('mall.example.com/item/aura-pro', shop));
  Atlas.mount('webDocs', Atlas.browser('ui.lumen.app/docs/installation', docs));
})();
