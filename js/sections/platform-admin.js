/* 管理后台示例：仪表盘 / 用户管理 CRUD / 数据大屏，三视图通过侧边菜单切换 */
(function () {
  const I = Atlas.icon;
  const C = Atlas.chart;
  const days = Array.from({ length: 14 }, (_, i) => `10/${String(i + 15).padStart(2, '0')}`);

  const kpi = (o, first) => `
    <div class="card adm-kpi"${first ? ' data-ui="统计卡片 · Statistic Card"' : ''}>
      <div class="adm-kpi-top">
        <span class="adm-kpi-ic" style="--c:${o.color}">${I(o.icon, 16)}</span>
        <span class="muted">${o.label}</span>
        <button class="btn btn-ghost btn-xs btn-icon" type="button" aria-label="更多">${I('more', 14)}</button>
      </div>
      <div class="adm-kpi-val num">${o.value}</div>
      <div class="adm-kpi-foot">
        <span class="delta ${o.up ? 'up' : 'down'}"${first ? ' data-ui="趋势标记 · Trend Indicator"' : ''}>${I(o.up ? 'trendUp' : 'trendDown', 12)}${o.delta}</span>
        <span class="muted">较上周</span>
      </div>
      <div class="adm-kpi-spark"${first ? ' data-ui="迷你图 · Sparkline"' : ''}>${C.spark({ data: Atlas.series(o.seed, 16, 20, 100), color: o.color, w: 120, h: 40 })}</div>
    </div>`;

  const kpis = [
    { label: '销售额', value: '¥1,284,560', delta: '12.5%', up: true, icon: 'dollar', color: 'var(--s1)', seed: 3 },
    { label: '订单量', value: '8,846', delta: '8.2%', up: true, icon: 'bag', color: 'var(--s3)', seed: 11 },
    { label: '新增用户', value: '1,293', delta: '3.1%', up: false, icon: 'users', color: 'var(--s2)', seed: 23 },
    { label: '转化率', value: '3.62%', delta: '0.4%', up: true, icon: 'target', color: 'var(--s7)', seed: 41 },
  ];

  const orders = [
    ['#20261028-0871', '林小满', 'av1', '¥2,380.00', 'success', '已完成', '10:24'],
    ['#20261028-0870', '周以安', 'av2', '¥768.50', 'info', '配送中', '10:12'],
    ['#20261028-0869', '陈默', 'av3', '¥12,999.00', 'warning', '待付款', '09:58'],
    ['#20261028-0868', '苏青禾', 'av4', '¥329.00', 'danger', '已退款', '09:41'],
    ['#20261028-0867', '韩一舟', 'av5', '¥1,045.20', 'success', '已完成', '09:30'],
  ];

  const users = [
    ['林小满', 'xiaoman@nova.io', 'av1', '管理员', 'primary', true, '产品部', '2024-03-12', '刚刚'],
    ['周以安', 'yian@nova.io', 'av2', '编辑', 'info', true, '市场部', '2024-06-08', '5 分钟前'],
    ['陈默', 'chenmo@nova.io', 'av3', '访客', '', false, '技术部', '2025-01-21', '3 天前'],
    ['苏青禾', 'qinghe@nova.io', 'av4', '编辑', 'info', true, '设计部', '2025-04-02', '1 小时前'],
    ['韩一舟', 'yizhou@nova.io', 'av5', '财务', 'warning', true, '财务部', '2025-07-19', '昨天'],
    ['顾南星', 'nanxing@nova.io', 'av6', '访客', '', false, '运营部', '2025-09-30', '2 周前'],
  ];

  const menu = (icon, label, view, extra = '') => `
    <a class="adm-menu${view === 'dash' ? ' on' : ''}" href="javascript:void(0)" ${view ? `data-act="admView" data-view="${view}"` : ''}>
      ${I(icon, 16)}<span class="adm-menu-label">${label}</span>${extra}
    </a>`;

  /* ---------- 视图一：仪表盘 ---------- */
  const dashView = `
    <div class="adm-pagehead" data-ui="页头 · PageHeader">
      <div>
        <h2>仪表盘</h2>
        <p class="muted">欢迎回来，Ada。今天有 <b class="num">12</b> 笔订单待处理，3 个工单即将超时。</p>
      </div>
      <div class="row-wrap">
        <div class="seg" data-ui="分段控制器 · Segmented"><button class="on" type="button">今日</button><button type="button">本周</button><button type="button">本月</button><button type="button">全年</button></div>
        <div class="input fake-select adm-range" data-ui="日期范围选择器 · RangePicker">${I('calendar', 14)}<span class="num">2026-10-15 → 10-28</span></div>
        <button class="btn btn-primary" type="button" data-act="toast" data-msg="报表已开始导出，完成后将通知你" data-ui="主按钮 · Primary Button">${I('download', 14)}导出报表</button>
      </div>
    </div>

    <div class="adm-kpis">${kpis.map((k, i) => kpi(k, i === 0)).join('')}</div>

    <div class="adm-row adm-row-2-1">
      <div class="card" data-ui="图表卡片 · Chart Card">
        <div class="card-head">
          <div><h4>销售趋势</h4><p class="muted adm-sub">近 14 天每日销售额（元）</p></div>
          <div class="row">
            <div class="legend" data-ui="图例 · Legend"><span><i class="line" style="--c:var(--primary)"></i>本期</span><span><i class="line" style="--c:var(--muted)"></i>上期</span></div>
            <div class="seg"><button class="on" type="button">销售额</button><button type="button">订单量</button></div>
          </div>
        </div>
        <div class="card-body" data-ui="面积折线图 · Area Chart">
          ${C.line({ w: 620, h: 230, labels: days, labelEvery: 2, series: [
            { name: '本期', data: Atlas.series(5, 14, 42000, 98000, 0.55), color: 'var(--primary)' },
            { name: '上期', data: Atlas.series(9, 14, 38000, 80000, 0.6), color: 'var(--muted)', fillOpacity: 0, dash: true },
          ] })}
        </div>
      </div>
      <div class="card">
        <div class="card-head"><h4>渠道占比</h4><button class="btn btn-ghost btn-xs" type="button">详情 ${I('chevR', 12)}</button></div>
        <div class="card-body adm-donut" data-ui="环形图 · Donut Chart">
          ${C.donut({ size: 170, thickness: 20, center: { value: '8,846', label: '总订单' }, items: [
            { name: '小程序', v: 3620, color: 'var(--s1)' },
            { name: 'App', v: 2480, color: 'var(--s2)' },
            { name: 'Web', v: 1720, color: 'var(--s3)' },
            { name: '线下', v: 1026, color: 'var(--s4)' },
          ] })}
          <ul class="adm-donut-legend">
            ${[['小程序', 3620, 's1'], ['App', 2480, 's2'], ['Web', 1720, 's3'], ['线下', 1026, 's4']].map(([n, v, c]) => `
              <li><i style="background:var(--${c})"></i><span>${n}</span><b class="num">${Atlas.fmt(v)}</b><em class="num">${((v / 8846) * 100).toFixed(1)}%</em></li>`).join('')}
          </ul>
        </div>
      </div>
    </div>

    <div class="adm-row adm-row-2-1">
      <div class="card">
        <div class="card-head">
          <h4>最新订单</h4>
          <div class="tabs-line adm-mini-tabs" data-ui="标签页 · Tabs"><button class="on" type="button">全部</button><button type="button">待付款</button><button type="button">售后</button></div>
        </div>
        <table class="tbl" data-ui="数据表格 · Table">
          <thead><tr><th>订单号</th><th>客户</th><th class="r">金额</th><th>状态</th><th>时间</th><th class="r">操作</th></tr></thead>
          <tbody>
            ${orders.map((o, i) => `
              <tr>
                <td class="mono adm-mono">${o[0]}</td>
                <td><div class="cell-user"><span class="avatar avatar-sm ${o[2]}"${i === 0 ? ' data-ui="头像 · Avatar"' : ''}>${o[1][0]}</span>${o[1]}</div></td>
                <td class="r num">${o[3]}</td>
                <td><span class="tag tag-${o[4]}"${i === 0 ? ' data-ui="状态标签 · Status Tag"' : ''}>${o[5]}</span></td>
                <td class="muted num">${o[6]}</td>
                <td class="r"><button class="btn btn-text" type="button"${i === 0 ? ' data-ui="文字按钮 · Text Button"' : ''}>查看</button></td>
              </tr>`).join('')}
          </tbody>
        </table>
      </div>
      <div class="adm-stack">
        <div class="card">
          <div class="card-head"><h4>实时动态</h4><span class="status status-ok">实时</span></div>
          <ul class="adm-timeline card-body" data-ui="时间轴 · Timeline">
            <li style="--c:var(--success)"><b>订单 #0871 已完成</b><span class="muted">林小满 · 2 分钟前</span></li>
            <li style="--c:var(--primary)"><b>新用户注册 +38</b><span class="muted">来自小程序渠道 · 15 分钟前</span></li>
            <li style="--c:var(--warning)"><b>库存预警：云朵抱枕</b><span class="muted">剩余 12 件 · 1 小时前</span></li>
            <li style="--c:var(--danger)"><b>支付通道波动</b><span class="muted">已自动切换备用通道 · 3 小时前</span></li>
          </ul>
        </div>
        <div class="card">
          <div class="card-head"><h4>月度目标</h4><span class="muted num">10 月</span></div>
          <div class="card-body adm-goals" data-ui="进度条 · Progress">
            ${[['销售额', 82, 'var(--primary)'], ['新客数', 64, 'var(--s3)'], ['复购率', 45, 'var(--s2)']].map(([n, v, c]) => `
              <div><div class="row"><span>${n}</span><span class="spacer"></span><b class="num">${v}%</b></div><div class="progress"><i style="--v:${v}%;--c:${c}"></i></div></div>`).join('')}
          </div>
        </div>
      </div>
    </div>`;

  /* ---------- 视图二：用户管理（列表 CRUD） ---------- */
  const crudView = `
    <div class="adm-pagehead">
      <div>
        <h2>用户管理</h2>
        <p class="muted">管理平台用户、角色与账号状态。典型的「查询表单 + 工具栏 + 表格 + 分页 + 抽屉」结构。</p>
      </div>
      <div class="row">
        <button class="btn" type="button">${I('upload', 14)}导入</button>
        <button class="btn btn-primary" type="button" data-act="admDrawer" data-name="">${I('plus', 14)}新建用户</button>
      </div>
    </div>

    <div class="card adm-filter" data-ui="查询表单 · Search Form / Filter Bar">
      <div class="adm-filter-grid">
        <label><span>用户名</span><div class="field">${I('search', 14)}<input class="input" placeholder="请输入用户名或邮箱"></div></label>
        <label><span>角色</span><div class="input fake-select" data-ui="下拉选择 · Select"><span class="ph">全部角色</span>${I('chevD', 14)}</div></label>
        <label><span>状态</span><div class="seg"><button class="on" type="button">全部</button><button type="button">启用</button><button type="button">停用</button></div></label>
        <label><span>注册时间</span><div class="input fake-select"><span class="ph">开始日期 → 结束日期</span>${I('calendar', 14)}</div></label>
      </div>
      <div class="adm-filter-actions">
        <button class="btn btn-primary" type="button" data-act="toast" data-msg="已按条件查询，共 128 条结果">查询</button>
        <button class="btn" type="button">重置</button>
        <button class="btn btn-text" type="button">展开 ${I('chevD', 12)}</button>
      </div>
    </div>

    <div class="card">
      <div class="adm-toolbar" data-ui="表格工具栏 · Table Toolbar">
        <div class="row"><b>用户列表</b><span class="tag">共 128 条</span></div>
        <div class="row">
          <button class="btn btn-sm" type="button">批量启用</button>
          <button class="btn btn-sm btn-danger-ghost" type="button" data-act="confirm" data-title="确定删除选中的用户吗？" data-desc="删除后不可恢复，相关订单记录将保留。">批量删除</button>
          <span class="adm-tool-sep"></span>
          <button class="btn btn-ghost btn-sm btn-icon" type="button" data-tip="刷新">${I('refresh', 14)}</button>
          <button class="btn btn-ghost btn-sm btn-icon" type="button" data-tip="列设置">${I('columns', 14)}</button>
          <button class="btn btn-ghost btn-sm btn-icon" type="button" data-tip="密度">${I('sliders', 14)}</button>
          <button class="btn btn-ghost btn-sm btn-icon" type="button" data-tip="全屏">${I('expand', 14)}</button>
        </div>
      </div>
      <div class="adm-selbar" id="admSelBar" data-ui="批量选择提示 · Selection Alert">
        ${I('info', 14)}<span>已选择 <b class="num" id="admSelCount">2</b> 项</span>
        <button class="btn btn-text" type="button" data-act="admClearSel">取消选择</button>
      </div>
      <div class="adm-table-scroll">
        <table class="tbl" id="admUserTable" data-ui="数据表格 · Table（含选择列）">
          <thead><tr>
            <th class="adm-check-col"><label class="check"><input type="checkbox" data-act="admCheckAll"><span class="check-box">${I('check', 12, 'line', 3)}</span></label></th>
            <th>用户</th><th><span class="th-sort" data-ui="排序 · Sorter">角色 ${I('sort', 12)}</span></th><th>状态</th><th>部门</th>
            <th><span class="th-sort">注册时间 ${I('sort', 12)}</span></th><th>最近登录</th><th class="r">操作</th>
          </tr></thead>
          <tbody>
            ${users.map((u, i) => `
              <tr class="${i < 2 ? 'is-selected' : ''}">
                <td class="adm-check-col"><label class="check"><input type="checkbox" data-act="admCheckRow"${i < 2 ? ' checked' : ''}><span class="check-box">${I('check', 12, 'line', 3)}</span></label></td>
                <td><div class="cell-user"><span class="avatar ${u[2]}${u[5] ? ' avatar-online' : ''}">${u[0][0]}</span><div><b>${u[0]}</b><small>${u[1]}</small></div></div></td>
                <td><span class="tag ${u[4] ? `tag-${u[4]}` : ''}">${u[3]}</span></td>
                <td><label class="switch switch-sm"${i === 0 ? ' data-ui="开关 · Switch"' : ''}><input type="checkbox"${u[5] ? ' checked' : ''}><span class="switch-track"></span><span class="muted">${u[5] ? '启用' : '停用'}</span></label></td>
                <td>${u[6]}</td>
                <td class="num muted">${u[7]}</td>
                <td class="muted">${u[8]}</td>
                <td class="r adm-actions"${i === 0 ? ' data-ui="行操作 · Row Actions"' : ''}>
                  <button class="btn btn-text" type="button" data-act="admDrawer" data-name="${u[0]}" data-email="${u[1]}">编辑</button>
                  <button class="btn btn-text adm-danger" type="button" data-act="confirm" data-title="删除用户「${u[0]}」？" data-desc="该操作无法撤销。">删除</button>
                  <button class="btn btn-ghost btn-xs btn-icon" type="button" aria-label="更多">${I('more', 14)}</button>
                </td>
              </tr>`).join('')}
          </tbody>
        </table>
      </div>
      <div class="adm-tablefoot">
        <div class="pager" data-pager="13" data-cur="1" data-total="128" data-ui="分页 · Pagination"></div>
      </div>
    </div>`;

  /* ---------- 视图三：数据大屏 ---------- */
  const rankings = [['华东', 98], ['华南', 86], ['华北', 74], ['西南', 61], ['华中', 52], ['西北', 33]];
  const alerts = [
    ['10:24:31', '杭州仓', '温度超阈值 32.6℃', 'warn'], ['10:23:08', '深圳 2 号线', '设备离线', 'err'], ['10:21:47', '成都站', '流量突增 +180%', 'warn'],
    ['10:19:02', '北京仓', '恢复正常', 'ok'], ['10:17:55', '上海中心', '支付延迟 1.2s', 'warn'], ['10:15:20', '武汉仓', '门禁异常开启', 'err'],
  ];
  const alertRows = alerts.map((a) => `<li><span class="num">${a[0]}</span><b>${a[1]}</b><em class="scr-lvl scr-${a[3]}">${a[2]}</em></li>`).join('');

  function mapSvg() {
    const r = Atlas.rand(99);
    let dots = '';
    for (let x = 0; x < 46; x++) {
      for (let y = 0; y < 26; y++) {
        const nx = (x - 23) / 23, ny = (y - 13) / 13;
        const ang = Math.atan2(ny, nx);
        const rad = 0.78 + 0.16 * Math.sin(ang * 3 + 1) + 0.08 * Math.cos(ang * 5);
        if (nx * nx + ny * ny * 1.1 < rad * rad && r() > 0.12) {
          dots += `<circle cx="${20 + x * 12}" cy="${14 + y * 12}" r="${r() > 0.85 ? 2 : 1.4}" opacity="${0.25 + r() * 0.5}"/>`;
        }
      }
    }
    const hub = [330, 170];
    const nodes = [[120, 90, '北京'], [150, 230, '成都'], [440, 250, '深圳'], [500, 120, '上海'], [250, 290, '广州'], [400, 60, '沈阳']];
    const lines = nodes.map(([x, y], i) => {
      const mx = (x + hub[0]) / 2, my = Math.min(y, hub[1]) - 60;
      return `<path class="scr-fly" style="animation-delay:${i * 0.35}s" d="M${x},${y} Q${mx},${my} ${hub[0]},${hub[1]}"/>`;
    }).join('');
    const pins = nodes.map(([x, y, n]) => `<g class="scr-node"><circle cx="${x}" cy="${y}" r="3.5"/><circle class="scr-pulse" cx="${x}" cy="${y}" r="3.5"/><text x="${x + 7}" y="${y + 4}">${n}</text></g>`).join('');
    return `<svg viewBox="0 0 580 340" class="scr-map-svg" role="img" aria-label="飞线地图示意">
      <g class="scr-dots">${dots}</g>${lines}${pins}
      <g class="scr-hub"><circle cx="${hub[0]}" cy="${hub[1]}" r="6"/><circle class="scr-pulse big" cx="${hub[0]}" cy="${hub[1]}" r="6"/><circle class="scr-pulse big d2" cx="${hub[0]}" cy="${hub[1]}" r="6"/><text x="${hub[0] + 10}" y="${hub[1] - 8}">杭州 · 总部</text></g>
    </svg>`;
  }

  const screenView = `
    <div class="scr" data-ui="数据大屏 · Data Screen">
      <div class="scr-head" data-ui="大屏标题装饰 · Header Decoration">
        <span class="num" id="scrClock">2026-10-28 10:24:36</span>
        <h2>智慧运营指挥中心</h2>
        <span>杭州 · 晴 22℃</span>
      </div>
      <div class="scr-grid">
        <div class="scr-col">
          <div class="scr-box" data-ui="边框装饰 · Border Box">
            <h4>区域销售排行</h4>
            <ul class="scr-rank" data-ui="排行榜 · Ranking Board">
              ${rankings.map(([n, v], i) => `<li><em>${i + 1}</em><span>${n}</span><div><i style="width:${v}%"></i></div><b class="num">${v * 137}</b></li>`).join('')}
            </ul>
          </div>
          <div class="scr-box">
            <h4>近 7 日订单（万单）</h4>
            <div class="scr-bars" data-ui="柱状图 · Bar Chart">
              ${Atlas.series(17, 7, 30, 95).map((v, i) => `<div><i style="height:${v}%" data-tt="10/${22 + i}　${(v / 10).toFixed(1)} 万单"></i><span>${22 + i}日</span></div>`).join('')}
            </div>
          </div>
        </div>
        <div class="scr-center">
          <div class="scr-flop" data-ui="数字翻牌器 · Digital Flop">
            <span class="scr-flop-label">今日累计交易额（元）</span>
            <div class="scr-digits num" id="scrDigits"></div>
          </div>
          <div class="scr-map" data-ui="飞线地图 · Fly-line Map">${mapSvg()}<div class="scr-scan"></div></div>
        </div>
        <div class="scr-col">
          <div class="scr-box">
            <h4>设备在线率</h4>
            <div class="scr-rings" data-ui="环形进度 · Ring Progress">
              ${[[96.4, '在线率', '#22d3ee'], [72.8, '负载', '#a78bfa'], [88.1, '健康度', '#34d399']].map(([v, n, c]) => `
                <div class="scr-ring-wrap"><div class="scr-ring" style="--v:${v};--c:${c}"></div><div class="scr-ring-label"><b class="num">${v}%</b><span>${n}</span></div></div>`).join('')}
            </div>
          </div>
          <div class="scr-box">
            <h4>实时告警</h4>
            <div class="scr-scroll" data-ui="轮播列表 · Scroll Board"><ul>${alertRows}${alertRows}</ul></div>
          </div>
        </div>
      </div>
    </div>`;

  /* ---------- 抽屉：编辑用户 ---------- */
  const drawer = `
    <div class="adm-drawer-mask" data-act="admDrawerClose"></div>
    <aside class="adm-drawer" data-ui="抽屉 · Drawer" aria-label="编辑用户">
      <header><b id="admDrawerTitle">编辑用户</b><button class="btn btn-ghost btn-sm btn-icon" type="button" data-act="admDrawerClose" aria-label="关闭">${I('x', 16)}</button></header>
      <div class="adm-drawer-body">
        <div class="adm-upload" data-ui="头像上传 · Avatar Upload"><span class="avatar avatar-xl av1" id="admDrawerAvatar">林</span><button class="btn btn-sm" type="button">${I('camera', 14)}更换头像</button></div>
        <label class="adm-form-item"><span class="form-label"><i class="req">*</i>姓名</span><input class="input" id="admDrawerName" value="林小满"></label>
        <label class="adm-form-item" data-ui="表单校验 · Form Validation"><span class="form-label"><i class="req">*</i>邮箱</span><input class="input is-error" id="admDrawerEmail" value="xiaoman@nova"><span class="form-help is-error">请输入有效的邮箱地址</span></label>
        <label class="adm-form-item"><span class="form-label">手机号</span><div class="input-addon" data-ui="前置标签输入框 · Input Addon"><span>+86</span><input class="input" value="138 0000 1234"></div></label>
        <div class="adm-form-item"><span class="form-label">角色</span>
          <div class="row-wrap" data-ui="单选框组 · Radio Group">
            ${['管理员', '编辑', '财务', '访客'].map((r, i) => `<label class="radio"><input type="radio" name="admRole"${i === 0 ? ' checked' : ''}><span class="radio-dot"></span>${r}</label>`).join('')}
          </div>
        </div>
        <div class="adm-form-item"><span class="form-label">权限</span>
          <div class="row-wrap" data-ui="复选框组 · Checkbox Group">
            ${['查看', '编辑', '导出', '删除'].map((r, i) => `<label class="check"><input type="checkbox"${i < 3 ? ' checked' : ''}><span class="check-box">${I('check', 12, 'line', 3)}</span>${r}</label>`).join('')}
          </div>
        </div>
        <div class="adm-form-item row"><span class="form-label adm-inline-label">账号状态</span><label class="switch"><input type="checkbox" checked><span class="switch-track"></span>启用</label></div>
        <label class="adm-form-item"><span class="form-label">备注</span><textarea class="textarea" placeholder="选填，最多 200 字"></textarea></label>
      </div>
      <footer><button class="btn" type="button" data-act="admDrawerClose">取消</button><button class="btn btn-primary" type="button" data-act="admDrawerSave">保存</button></footer>
    </aside>`;

  Atlas.mount('adminMock', `
    <div class="admin rv" id="adminApp" data-ui="后台布局 · Admin Layout">
      <aside class="adm-side" data-ui="侧边导航 · Sidebar / SideMenu">
        <div class="adm-logo" data-ui="品牌标识 · Logo"><span class="adm-logo-mark">${I('layers', 16)}</span><b class="adm-menu-label">Nova Admin</b></div>
        <div class="adm-menu-group adm-menu-label">概览</div>
        ${menu('home', '仪表盘', 'dash')}
        ${menu('users', '用户管理', 'crud', '<span class="adm-menu-badge">12</span>')}
        ${menu('monitor', '数据大屏', 'screen', '<span class="adm-menu-new">NEW</span>')}
        <div class="adm-menu-group adm-menu-label">业务</div>
        <a class="adm-menu is-open" href="javascript:void(0)" data-act="admSubmenu">${I('bag', 16)}<span class="adm-menu-label">订单中心</span><span class="adm-menu-arrow">${I('chevD', 14)}</span></a>
        <div class="adm-submenu" data-ui="子菜单 · SubMenu"><a href="javascript:void(0)">订单列表</a><a href="javascript:void(0)">退款售后</a><a href="javascript:void(0)">发票管理</a></div>
        ${menu('box', '商品管理', '')}
        ${menu('fileText', '内容管理', '')}
        <div class="adm-menu-group adm-menu-label">系统</div>
        ${menu('shield', '权限角色', '')}
        ${menu('settings', '系统设置', '')}
        <div class="adm-side-foot" data-ui="用户信息卡 · User Card">
          <span class="avatar avatar-online av4">A</span>
          <div class="adm-menu-label"><b>Ada Wang</b><small>超级管理员</small></div>
        </div>
      </aside>
      <div class="adm-main">
        <header class="adm-top" data-ui="顶部栏 · Header">
          <button class="btn btn-ghost btn-sm btn-icon" type="button" data-act="admCollapse" aria-label="折叠菜单" data-ui="折叠按钮 · Collapse Trigger">${I('sidebar', 16)}</button>
          <nav class="crumb" data-ui="面包屑 · Breadcrumb"><a href="javascript:void(0)">首页</a><span class="sep">/</span><a href="javascript:void(0)">概览</a><span class="sep">/</span><b id="admCrumb">仪表盘</b></nav>
          <span class="spacer"></span>
          <button class="adm-search" type="button" data-act="cmdk" data-ui="全局搜索 · Global Search">${I('search', 14)}<span>搜索菜单、用户、订单</span><span class="kbd">⌘K</span></button>
          <button class="btn btn-ghost btn-sm btn-icon" type="button" data-act="toggleTheme" data-tip="切换主题" data-tip-pos="bottom">${I('moon', 16)}</button>
          <span class="badge-wrap" data-ui="徽标数 · Badge"><button class="btn btn-ghost btn-sm btn-icon" type="button" data-act="notify" data-title="你有 3 条新消息" data-desc="订单 #0869 等待付款超过 30 分钟。" aria-label="通知">${I('bell', 16)}</button><span class="badge">3</span></span>
          <div class="adm-user" data-ui="头像下拉菜单 · Avatar Dropdown" data-act="dropdown">
            <span class="avatar avatar-sm av4">A</span><span>Ada</span>${I('chevD', 12)}
            <div class="pop adm-user-pop">
              <div class="pop-item">${I('user', 14)}个人中心</div>
              <div class="pop-item">${I('settings', 14)}账号设置</div>
              <div class="pop-sep"></div>
              <div class="pop-item is-danger">${I('logout', 14)}退出登录</div>
            </div>
          </div>
        </header>
        <div class="adm-tabsbar" data-ui="多页签 · Tabs View">
          <span class="adm-tab on" data-act="admView" data-view="dash">仪表盘</span>
          <span class="adm-tab" data-act="admView" data-view="crud">用户管理 ${I('x', 11)}</span>
          <span class="adm-tab" data-act="admView" data-view="screen">数据大屏 ${I('x', 11)}</span>
        </div>
        <div class="adm-body">
          <div class="adm-view on" data-view="dash">${dashView}</div>
          <div class="adm-view" data-view="crud">${crudView}</div>
          <div class="adm-view" data-view="screen">${screenView}</div>
        </div>
      </div>
      ${drawer}
    </div>`);
})();
