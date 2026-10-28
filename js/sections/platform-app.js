/* App 应用示例：七台手机，覆盖 iOS、Material 3、小程序与常见交互层 */
(function () {
  const I = Atlas.icon;

  const statusBar = (first) => `
    <div class="sb"${first ? ' data-ui="状态栏 · Status Bar"' : ''}>
      <span class="sb-time">9:41</span>
      <span class="sb-island"${first ? ' data-ui="灵动岛 · Dynamic Island"' : ''}></span>
      <span class="sb-icons"><i class="sb-signal"><b></b><b></b><b></b><b></b></i>${I('wifi', 14)}<i class="sb-batt"><b></b></i></span>
    </div>`;
  const homeInd = (first) => `<div class="home-ind"${first ? ' data-ui="主屏指示条 · Home Indicator"' : ''}></div>`;

  const phone = (cls, inner, title, desc, view, first = false) => `
    <figure class="phone-item rv">
      <div class="phone"${first ? ' data-ui="设备外框 · Device Frame"' : ''}>
        <div class="phone-screen ${cls}">${statusBar(first)}${inner}${homeInd(first)}</div>
      </div>
      <figcaption><b>${title}</b><span>${desc}</span>
        <button class="btn btn-sm prompt-mini" type="button" data-act="prompt" data-kind="form" data-view="${view}">${I('sparkle', 13)}复制该屏提示词</button></figcaption>
    </figure>`;

  const tabbar = (active, first) => `
    <nav class="tabbar"${first ? ' data-ui="标签栏 · Tab Bar"' : ''}>
      ${[['home', '首页'], ['compass', '发现'], ['plus', ''], ['message', '消息'], ['user', '我的']].map(([ic, t], i) => (i === 2
        ? `<span class="tab-center"${first ? ' data-ui="中心凸起按钮 · Center Action"' : ''}>${I('plus', 22, 'line', 2.4)}</span>`
        : `<span class="tab${t === active ? ' on' : ''}">${i === 3 ? `<span class="badge-wrap">${I(ic, 22)}<em class="badge">5</em></span>` : I(ic, 22)}<small>${t}</small></span>`)).join('')}
    </nav>`;

  /* 1. 首页 Feed */
  const feed = `
    <div class="app-scroll">
      <div class="ios-large" data-ui="大标题导航栏 · Large Title">
        <div><small>10 月 28 日 星期二</small><h2>发现</h2></div><span class="avatar av1">林</span>
      </div>
      <div class="ios-search" data-ui="搜索栏 · Search Bar">${I('search', 15)}<span>搜索地点、攻略、用户</span>${I('mic', 15)}</div>
      <div class="stories" data-ui="快拍 · Stories">
        ${[['我的', 'av1', 1], ['青禾', 'av4', 0], ['以安', 'av2', 0], ['陈默', 'av3', 1], ['一舟', 'av5', 0]].map(([n, a, seen], i) => `
          <div class="story${seen ? ' seen' : ''}"><span class="story-ring"><span class="avatar avatar-lg ${a}">${n[0]}</span>${i === 0 ? `<em>${I('plus', 10, 'line', 3)}</em>` : ''}</span><small>${n}</small></div>`).join('')}
      </div>
      <div class="app-chips" data-ui="分类标签 · Chips">${['推荐', '美食', '旅行', '露营', '咖啡', '展览'].map((c, i) => `<span class="${i === 0 ? 'on' : ''}">${c}</span>`).join('')}</div>
      <div class="app-banner" data-ui="轮播横幅 · Banner Carousel">
        <div class="app-banner-track">
          <div class="app-slide s1"><small>秋日限定</small><b>去山里看一场<br>金色的银杏</b></div>
          <div class="app-slide s2"><small>城市漫步</small><b>西湖边的<br>12 家咖啡馆</b></div>
          <div class="app-slide s3"><small>周末露营</small><b>新手装备<br>清单</b></div>
        </div>
        <div class="app-dots" data-ui="分页指示器 · Page Indicator"><i class="on"></i><i></i><i></i></div>
      </div>
      <div class="app-sec-row" data-ui="分区标题 · Section Header"><b>热门推荐</b><a href="javascript:void(0)">查看全部 ${I('chevR', 12)}</a></div>
      ${[['莫干山竹林树屋，推开窗就是云海', '苏青禾', 'av4', '2.4k', 's-forest'], ['安吉云上草原，秋天最美的时刻', '周以安', 'av2', '1.1k', 's-sunset']].map(([t, n, a, l, bg], i) => `
        <div class="feed-card"${i === 0 ? ' data-ui="内容卡片 · Content Card"' : ''}>
          <div class="feed-img ${bg}"><span class="feed-tag">${I('pin', 11)} 湖州</span></div>
          <b>${t}</b>
          <div class="feed-meta"><span class="avatar avatar-xs ${a}">${n[0]}</span><span>${n}</span><span class="spacer"></span><span class="feed-like"${i === 0 ? ' data-act="like"' : ''}>${I('heart', 14)}${l}</span></div>
        </div>`).join('')}
    </div>
    ${tabbar('首页', true)}`;

  /* 2. 详情页 */
  const detail = `
    <div class="app-scroll no-pad">
      <div class="detail-hero" data-ui="头图 · Hero Image">
        <div class="detail-mtn"></div>
        <div class="detail-float">
          <span class="glass-btn" data-ui="悬浮导航按钮 · Floating Button">${I('chevL', 18)}</span>
          <span class="row"><span class="glass-btn">${I('share', 16)}</span><span class="glass-btn" data-act="like">${I('heart', 16)}</span></span>
        </div>
        <span class="detail-count" data-ui="图片计数 · Image Counter">1 / 8</span>
      </div>
      <div class="detail-sheet" data-ui="内容面板 · Content Sheet">
        <h3>莫干山 · 竹林树屋</h3>
        <div class="detail-sub"><span class="detail-rate">★ 4.92</span><span>128 条评价</span><span>·</span><span>${I('pin', 12)}德清县</span></div>
        <div class="row-wrap detail-tags">${['整套房源', '2 卧 1 卫', '观景露台', '可带宠物'].map((t) => `<span class="tag tag-round">${t}</span>`).join('')}</div>
        <div class="detail-host" data-ui="列表项 · List Item（头像 + 文字 + 操作）">
          <span class="avatar avatar-lg av4 avatar-online">苏</span>
          <div><b>房东 苏青禾</b><small>超赞房东 · 接待 6 年</small></div>
          <span class="detail-chat">${I('message', 16)}</span>
        </div>
        <div class="detail-feats" data-ui="图标特性列表 · Feature List">
          ${[['wifi', '高速 Wi-Fi'], ['coffee', '手冲咖啡'], ['leaf', '竹林景观'], ['truck', '免费停车']].map(([ic, t]) => `<div>${I(ic, 18)}<span>${t}</span></div>`).join('')}
        </div>
        <p class="detail-desc">树屋建在半山腰的毛竹林里，二层露台正对山谷。清晨常有云海，晚上可以在露台看星星。<a href="javascript:void(0)">展开</a></p>
      </div>
    </div>
    <div class="detail-bar" data-ui="底部操作栏 · Bottom Action Bar">
      <div><b class="num">¥688</b><small> / 晚</small><span>11 月 8 日 – 10 日</span></div>
      <button class="app-btn" type="button" data-act="toast" data-msg="已为你保留房源 15 分钟">预订</button>
    </div>`;

  /* 3. 聊天 */
  const chat = `
    <div class="chat-nav" data-ui="导航栏 · Navigation Bar">
      <span class="chat-back">${I('chevL', 20)}<em>12</em></span>
      <div class="chat-who"><span class="avatar avatar-sm av4 avatar-online">苏</span><div><b>苏青禾</b><small>在线</small></div></div>
      <span class="chat-acts">${I('call', 18)}${I('video', 20)}</span>
    </div>
    <div class="chat-body app-scroll" id="chatBody" data-ui="消息列表 · Message List">
      <div class="chat-time">今天 09:41</div>
      <div class="msg in" data-ui="消息气泡 · Chat Bubble">周末一起去莫干山吗？天气预报说是晴天</div>
      <div class="msg out">好呀！我看中一家竹林树屋，你看看</div>
      <div class="msg out card-msg" data-ui="链接卡片 · Link Preview">
        <div class="card-msg-img s-forest"></div><b>莫干山 · 竹林树屋</b><small>★ 4.92 · ¥688 / 晚</small>
      </div>
      <div class="msg in voice" data-ui="语音消息 · Voice Message">${I('play', 12)}<span class="wave">${Array.from({ length: 14 }, (_, i) => `<i style="--h:${4 + ((i * 7) % 11)}px"></i>`).join('')}</span><small>12″</small></div>
      <div class="msg in">这家我收藏过！周六早上 8 点出发？</div>
      <div class="msg out read">可以，我来订房 <small class="msg-status" data-ui="已读状态 · Read Receipt">已读</small></div>
      <div class="msg in typing" data-ui="正在输入 · Typing Indicator"><i></i><i></i><i></i></div>
    </div>
    <div class="chat-input" data-ui="输入栏 · Input Bar / Composer">
      <span class="chat-plus">${I('plus', 18)}</span>
      <input id="chatInput" placeholder="发消息…" aria-label="输入消息">
      <span class="chat-emoji">${I('smile', 18)}</span>
      <button class="chat-send" type="button" data-act="chatSend" aria-label="发送">${I('arrowUp', 16, 'line', 2.6)}</button>
    </div>`;

  /* 4. 个人中心 */
  const cell = (ic, color, label, val = '', extra = '') => `
    <div class="cell"${extra}><span class="cell-ic" style="--c:${color}">${I(ic, 15)}</span><span class="cell-label">${label}</span>${val}<span class="cell-chev">${I('chevR', 14)}</span></div>`;
  const profile = `
    <div class="app-scroll prof">
      <div class="prof-head" data-ui="个人信息头部 · Profile Header">
        <div class="prof-top"><span>${I('scan', 18)}</span><span>${I('settings', 18)}</span></div>
        <div class="prof-me"><span class="avatar avatar-xl av1">林</span><div><b>林小满</b><small>ID: lin_xiaoman · 杭州</small></div><span class="prof-edit">编辑资料</span></div>
        <div class="prof-stats" data-ui="数据统计行 · Stats Row">${[['128', '关注'], ['2.4k', '粉丝'], ['9.8k', '获赞']].map(([v, t]) => `<div><b class="num">${v}</b><small>${t}</small></div>`).join('')}</div>
      </div>
      <div class="vip-card" data-ui="会员卡片 · Membership Card"><div><b>PLUS 会员</b><small>有效期至 2027-10-28 · 已省 ¥1,286</small></div><span>续费</span></div>
      <div class="order-entry" data-ui="宫格入口 · Grid Entry">
        ${[['wallet', '待付款', 0], ['box', '待发货', 2], ['truck', '待收货', 1], ['message', '待评价', 0], ['refresh', '售后', 0]].map(([ic, t, n]) => `<div><span class="badge-wrap">${I(ic, 22)}${n ? `<em class="badge">${n}</em>` : ''}</span><small>${t}</small></div>`).join('')}
      </div>
      <div class="ios-group-title" data-ui="分组标题 · Section Header">我的内容</div>
      <div class="ios-group" data-ui="分组列表 · Grouped List">
        <div class="swipe-cell" data-ui="滑动操作 · Swipe Actions（向左拖动）">
          <div class="swipe-actions"><button type="button" class="pin">置顶</button><button type="button" class="del">删除</button></div>
          ${cell('bookmark', '#f59e0b', '我的收藏', '<span class="cell-val">36</span>', ' data-swipe')}
        </div>
        ${cell('clock', '#0ea5e9', '浏览记录')}
        ${cell('gift', '#ef4444', '优惠券', '<span class="cell-val"><em class="cell-pill">3 张可用</em></span>')}
      </div>
      <div class="ios-group-title">设置</div>
      <div class="ios-group">
        <div class="cell"><span class="cell-ic" style="--c:#6366f1">${I('moon', 15)}</span><span class="cell-label">深色模式</span><label class="switch switch-ios" data-ui="开关 · Switch (iOS)"><input type="checkbox" data-act="toggleTheme"><span class="switch-track"></span></label></div>
        <div class="cell"><span class="cell-ic" style="--c:#22c55e">${I('bell', 15)}</span><span class="cell-label">消息通知</span><label class="switch switch-ios"><input type="checkbox" checked><span class="switch-track"></span></label></div>
        ${cell('globe', '#64748b', '语言', '<span class="cell-val">简体中文</span>')}
      </div>
      <div class="ios-group"><div class="cell cell-danger">退出登录</div></div>
    </div>
    ${tabbar('我的', false)}`;

  /* 5. Material 3 */
  const material = `
    <div class="md-topbar" data-ui="顶部应用栏 · Top App Bar">${I('menu', 20)}<b>相册</b><span class="avatar avatar-sm av3">陈</span></div>
    <div class="app-scroll md-body">
      <div class="md-search" data-ui="搜索栏 · Search Bar (M3)">${I('search', 18)}<span>搜索照片和地点</span>${I('mic', 18)}</div>
      <div class="md-chips" data-ui="筛选纸片 · Filter Chips">
        <span class="md-chip on ripple">${I('check', 14)}全部</span><span class="md-chip ripple">人物</span><span class="md-chip ripple">地点</span><span class="md-chip ripple">收藏</span>
      </div>
      <div class="md-card elevated" data-ui="卡片 · Card (Elevated)">
        <div class="md-card-img s-sunset"></div>
        <div class="md-card-txt"><b>回忆 · 去年今天</b><small>安吉云上草原 · 46 张照片</small></div>
        <div class="md-card-acts"><span class="md-text-btn ripple">分享</span><span class="md-tonal-btn ripple">查看</span></div>
      </div>
      <div class="md-grid" data-ui="图片网格 · Image Grid">${['s-forest', 's-sea', 's-sunset', 's-night', 's-sea', 's-forest'].map((s) => `<i class="${s}"></i>`).join('')}</div>
      <div class="md-card outlined" data-ui="卡片 · Card (Outlined)">
        <div class="md-list-item ripple"><span class="md-lead">${I('cloud', 18)}</span><div><b>自动备份</b><small>已备份 3,214 项</small></div><label class="switch md-switch"><input type="checkbox" checked><span class="switch-track"></span></label></div>
      </div>
    </div>
    <button class="md-fab ripple" type="button" data-ui="扩展悬浮按钮 · Extended FAB">${I('edit', 18)}新建相册</button>
    <nav class="md-nav" data-ui="导航栏 · Navigation Bar (M3)">
      ${[['image', '照片'], ['grid', '影集'], ['users', '共享'], ['layers', '工具']].map(([ic, t], i) => `<span class="md-nav-item${i === 0 ? ' on' : ''}" data-act="mdNav"><i${i === 0 ? ' data-ui="活动指示器 · Active Indicator"' : ''}>${I(ic, 20)}</i><small>${t}</small></span>`).join('')}
    </nav>`;

  /* 6. 交互层演示 */
  const overlays = `
    <div class="ios-navbar" data-ui="导航栏 · Navigation Bar（标准）"><span>${I('chevL', 18)}</span><b>交互层演示</b><span>${I('more', 18)}</span></div>
    <div class="app-scroll ov-body" id="ovBody">
      <div class="ptr" data-ui="下拉刷新 · Pull to Refresh"><span class="spin"></span><small>正在刷新…</small></div>
      <div class="ios-group-title">点按体验移动端弹层</div>
      <div class="ios-group">
        ${[['layers', '#6366f1', '底部弹层 Bottom Sheet', 'sheet'], ['list', '#0ea5e9', '动作面板 Action Sheet', 'action'], ['alert', '#f59e0b', '对话框 Alert', 'alert'],
           ['checkCircle', '#22c55e', '轻提示 Toast', 'toast'], ['refresh', '#ec4899', '下拉刷新 Pull to Refresh', 'ptr'], ['grid', '#64748b', '骨架屏 Skeleton', 'skeleton']]
          .map(([ic, c, t, k]) => `<div class="cell" data-act="phoneLayer" data-k="${k}"><span class="cell-ic" style="--c:${c}">${I(ic, 15)}</span><span class="cell-label">${t}</span><span class="cell-chev">${I('chevR', 14)}</span></div>`).join('')}
      </div>
      <div class="ios-group-title">最近动态</div>
      <div class="ov-list" id="ovList">
        ${[['av2', '周以安', '分享了 12 张照片'], ['av3', '陈默', '评论了你的游记'], ['av5', '韩一舟', '关注了你']].map(([a, n, t]) => `
          <div class="ov-item"><span class="avatar ${a}">${n[0]}</span><div><b>${n}</b><small>${t}</small></div></div>`).join('')}
      </div>
    </div>
    <div class="ph-mask" data-act="phoneLayerClose"></div>
    <div class="ph-sheet" data-ui="底部弹层 · Bottom Sheet">
      <i class="ph-grabber" data-ui="拖拽手柄 · Grabber"></i><b>分享到</b>
      <div class="ph-share">${[['message', '#22c55e', '微信'], ['users', '#0ea5e9', '朋友圈'], ['send', '#6366f1', '私信'], ['link', '#64748b', '复制链接'], ['download', '#f59e0b', '保存图片'], ['more', '#94a3b8', '更多']].map(([ic, c, t]) => `<span><i style="--c:${c}">${I(ic, 20)}</i><small>${t}</small></span>`).join('')}</div>
      <button class="ph-cancel" type="button" data-act="phoneLayerClose">取消</button>
    </div>
    <div class="ph-action" data-ui="动作面板 · Action Sheet">
      <div class="ph-action-group"><p>选择要进行的操作</p><button type="button" data-act="phoneLayerClose">保存到相册</button><button type="button" data-act="phoneLayerClose">转发给朋友</button><button type="button" class="danger" data-act="phoneLayerClose">删除</button></div>
      <button type="button" class="ph-action-cancel" data-act="phoneLayerClose">取消</button>
    </div>
    <div class="ph-alert" data-ui="对话框 · Alert Dialog">
      <b>开启通知？</b><p>及时收到订单、消息与活动提醒，可随时在设置中关闭。</p>
      <div><button type="button" data-act="phoneLayerClose">以后再说</button><button type="button" class="strong" data-act="phoneLayerClose">允许</button></div>
    </div>
    <div class="ph-toast" data-ui="轻提示 · Toast">${I('checkCircle', 26)}<span>已保存到相册</span></div>`;

  /* 7. 小程序 */
  const kk = [['leaf', '#22c55e', '时令水果'], ['coffee', '#a16207', '咖啡饮品'], ['gift', '#ef4444', '礼盒'], ['truck', '#0ea5e9', '次日达'], ['flame', '#f97316', '爆款'],
    ['heart', '#ec4899', '会员专享'], ['award', '#eab308', '积分商城'], ['wallet', '#6366f1', '充值'], ['users', '#14b8a6', '拼团'], ['grid', '#64748b', '全部']];
  const goods = [['阳光玫瑰青提 500g', '19.9', 150, 's-grape'], ['云南蓝莓 125g×4', '39.8', 110, 's-berry'], ['海南贵妃芒 2.5kg', '29.9', 120, 's-mango'], ['新西兰奇异果 6 粒', '25.8', 150, 's-kiwi']];
  const mini = `
    <div class="wx-nav" data-ui="小程序导航栏 · Mini Program Nav"><b>鲜果时光</b><span class="wx-capsule" data-ui="胶囊按钮 · Capsule Button"><span>${I('more', 16)}</span><i></i><span class="wx-close"></span></span></div>
    <div class="app-scroll wx-body">
      <div class="wx-hero">
        <div class="wx-loc">${I('pin', 13)}杭州 · 西湖店 ${I('chevD', 12)}</div>
        <div class="wx-search">${I('search', 14)}<span>搜索水果、礼盒</span></div>
      </div>
      <div class="wx-notice" data-ui="通知栏 · NoticeBar">${I('volume', 14)}<div><span>新人首单立减 10 元 · 满 39 元免配送费 · 今日 18:00 前下单当日达</span></div></div>
      <div class="wx-kk" data-ui="金刚区 · Icon Grid">${kk.map(([ic, c, t]) => `<span><i style="--c:${c}">${I(ic, 18)}</i><small>${t}</small></span>`).join('')}</div>
      <div class="wx-coupons" data-ui="优惠券 · Coupon">
        <div class="wx-coupon"><b><small>¥</small>10</b><div><span>新人券</span><small>满 39 可用</small></div><em>领取</em></div>
        <div class="wx-coupon"><b><small>¥</small>5</b><div><span>水果券</span><small>满 29 可用</small></div><em>领取</em></div>
      </div>
      <div class="wx-fall" data-ui="瀑布流 · Waterfall">
        ${[0, 1].map((col) => `<div>${goods.filter((_, i) => i % 2 === col).map(([n, p, h, s]) => `
          <div class="wx-goods"><i class="${s}" style="height:${h}px"></i><b>${n}</b><div class="row"><span class="wx-price num"><small>¥</small>${p}</span><span class="spacer"></span><span class="wx-add" data-act="wxAdd">${I('plus', 14, 'line', 3)}</span></div></div>`).join('')}</div>`).join('')}
      </div>
    </div>
    <div class="wx-cartbar" data-ui="购物车悬浮栏 · Cart Bar">
      <span class="wx-cart badge-wrap">${I('cart', 20)}<em class="badge" id="wxCartBadge">3</em></span>
      <div><b class="num" id="wxCartSum">¥ 38.80</b><small>另需配送费 ¥4</small></div>
      <button type="button" data-act="toast" data-msg="去结算">去结算</button>
    </div>`;

  const terms = [
    ['状态栏', 'Status Bar', '时间、信号、电量，系统所有'], ['灵动岛 / 刘海', 'Dynamic Island', '内容需避开的顶部区域'], ['安全区', 'Safe Area', '刘海和底部指示条之外的可用区域'],
    ['导航栏', 'Navigation Bar', '标题 + 返回 + 操作，页面堆栈的顶部'], ['大标题', 'Large Title', 'iOS 一级页面的大号标题，滚动后收起'], ['标签栏', 'Tab Bar', '底部 3–5 个一级入口'],
    ['底部弹层', 'Bottom Sheet', '从底部滑出的半屏面板，可拖拽'], ['动作面板', 'Action Sheet', '一组操作选项 + 取消'], ['轻提示', 'Toast', '居中或底部的短暂提示，自动消失'],
    ['下拉刷新', 'Pull to Refresh', '在顶部下拉重新加载'], ['滑动操作', 'Swipe Actions', '列表项左滑露出删除等按钮'], ['悬浮按钮', 'FAB', 'Material 的主操作圆形按钮'],
    ['金刚区', 'Icon Grid', '首页 8–10 个图标入口，国内电商常用'], ['胶囊按钮', 'Capsule', '小程序右上角的系统按钮，不可遮挡'], ['瀑布流', 'Waterfall / Masonry', '两列错落的卡片流'],
    ['骨架屏', 'Skeleton', '加载时先显示内容轮廓'],
  ];

  Atlas.mount('appMock', `
    <div class="phones">
      ${phone('ios', feed, '首页 Feed', 'iOS 风格 · 大标题 + 快拍 + 轮播 + 卡片流 + 标签栏', 'app-feed', true)}
      ${phone('ios detail-screen', detail, '详情页 Detail', '沉浸式头图 + 内容面板 + 底部操作栏', 'app-detail')}
      ${phone('ios chat-screen', chat, '聊天 Chat', '气泡、语音、链接卡片、输入中；可输入并发送', 'app-chat')}
      ${phone('ios prof-screen', profile, '个人中心 Profile', '分组列表 + 开关；“我的收藏”可向左滑动', 'app-profile')}
      ${phone('md', material, 'Material 3 · Android', '顶部应用栏、纸片、卡片、扩展 FAB、导航栏；点按有波纹', 'app-material')}
      ${phone('ios ov-screen', overlays, '交互层 Overlays', '底部弹层 / 动作面板 / 对话框 / Toast / 下拉刷新 / 骨架屏', 'app-overlays')}
      ${phone('wx', mini, '小程序 Mini Program', '胶囊按钮、通知栏、金刚区、优惠券、瀑布流、购物车栏', 'app-mini')}
      <figure class="phone-item app-terms-card rv">
        <div class="app-terms">
          <b>App 专属术语</b>
          ${terms.map(([zh, en, d]) => `<div><span>${zh}<em>${en}</em></span><small>${d}</small></div>`).join('')}
        </div>
      </figure>
    </div>`);
})();
