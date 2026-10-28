/* 组件：反馈 */
(function () {
  const I = Atlas.icon;
  const lbl = (t) => `<span class="cmp-lbl">${t}</span>`;
  const ring = (v, c, size = 64, label = '') => {
    const r = (size - 8) / 2, len = 2 * Math.PI * r;
    return `<div class="ring" style="width:${size}px;height:${size}px"><svg viewBox="0 0 ${size} ${size}"><circle cx="${size / 2}" cy="${size / 2}" r="${r}" style="stroke:var(--bg-2)"/><circle class="ring-v" cx="${size / 2}" cy="${size / 2}" r="${r}" style="stroke:${c}" stroke-dasharray="${len}" stroke-dashoffset="${len * (1 - v / 100)}" transform="rotate(-90 ${size / 2} ${size / 2})"/></svg><b class="num">${label || `${v}%`}</b></div>`;
  };

  Atlas.mount('cmp-feedback', Atlas.cmpGrid('反馈', [
    { id: 'alert', zh: '警告提示', en: 'Alert', alias: 'Banner / Callout', w: 2,
      note: '页面内的静态提示，不会自动消失。四种语义色对应四种情况。',
      html: `<div class="alert-grid">
        <div class="alert alert-info">${I('info', 16)}<div><b>系统维护通知</b><p>今晚 23:00–24:00 暂停服务。</p></div><button class="alert-close" type="button" data-act="closeParent" aria-label="关闭">${I('x', 14)}</button></div>
        <div class="alert alert-success">${I('checkCircle', 16)}<div><b>保存成功</b><p>所有更改已同步到云端。</p></div><button class="alert-close" type="button" data-act="closeParent" aria-label="关闭">${I('x', 14)}</button></div>
        <div class="alert alert-warning">${I('alert', 16)}<div><b>存储空间即将用完</b><p>已使用 92%，建议升级套餐。</p></div><button class="alert-close" type="button" data-act="closeParent" aria-label="关闭">${I('x', 14)}</button></div>
        <div class="alert alert-error">${I('xCircle', 16)}<div><b>支付失败</b><p>银行卡余额不足，请更换支付方式。</p></div><button class="alert-close" type="button" data-act="closeParent" aria-label="关闭">${I('x', 14)}</button></div>
      </div>` },
    { id: 'message', zh: '全局提示', en: 'Message · Toast', alias: 'Snackbar',
      note: '轻量、自动消失的反馈。带“撤销”按钮的叫 Snackbar。',
      html: `<div class="row-wrap">
        <button class="btn btn-sm" type="button" data-act="toast" data-type="success" data-msg="保存成功">${I('checkCircle', 14)}成功</button>
        <button class="btn btn-sm" type="button" data-act="toast" data-type="error" data-msg="网络错误，请重试">${I('xCircle', 14)}失败</button>
        <button class="btn btn-sm" type="button" data-act="toast" data-type="warning" data-msg="剩余 3 次尝试机会">${I('alert', 14)}警告</button>
        <button class="btn btn-sm" type="button" data-act="toast" data-type="loading" data-msg="正在上传…">${I('refresh', 14)}加载</button>
        <button class="btn btn-sm" type="button" data-act="toast" data-type="undo" data-msg="已删除 1 封邮件">${I('trash', 14)}可撤销</button></div>` },
    { id: 'notification', zh: '通知提醒框', en: 'Notification', alias: 'Push / Notice',
      note: '从屏幕角落滑入，内容比 Toast 多，可以有标题、描述和操作。',
      html: `<div class="row-wrap"><button class="btn btn-primary btn-sm" type="button" data-act="notify" data-title="新的评论" data-desc="周以安评论了你的设计稿：“首屏标题再短一点。”">${I('bell', 14)}弹出通知</button>
        <button class="btn btn-sm" type="button" data-act="notify" data-title="导出完成" data-desc="用户列表.xlsx（2.3 MB）已准备好下载。" data-kind="success">导出完成</button></div>
        <div class="noti-preview"><span class="avatar avatar-sm av2">周</span><div><b>新的评论</b><small>周以安评论了你的设计稿</small></div><span class="muted num">刚刚</span></div>` },
    { id: 'modal', zh: '对话框', en: 'Modal · Dialog', alias: 'Popup / Lightbox',
      note: '打断当前操作，要求用户处理。确认类对话框按钮放右下角。',
      html: `<div class="row-wrap"><button class="btn btn-primary btn-sm" type="button" data-act="modal">打开对话框</button><button class="btn btn-sm btn-danger-ghost" type="button" data-act="confirm" data-title="确定删除这个项目吗？" data-desc="项目中的 32 个文件将一并删除，此操作无法撤销。">确认对话框</button></div>
        <div class="modal-preview"><b>重命名项目</b><input class="input input-sm" value="官网改版 2026"><div class="row"><span class="spacer"></span><span class="btn btn-xs">取消</span><span class="btn btn-xs btn-primary">确定</span></div></div>` },
    { id: 'drawer', zh: '抽屉', en: 'Drawer · Sheet', alias: 'Side Panel / Off-canvas',
      note: '从屏幕边缘滑出，适合放表单、详情、筛选，背后的页面仍可参照。',
      html: `<div class="row-wrap"><button class="btn btn-primary btn-sm" type="button" data-act="drawer" data-side="right">右侧抽屉</button><button class="btn btn-sm" type="button" data-act="drawer" data-side="left">左侧抽屉</button><button class="btn btn-sm" type="button" data-act="drawer" data-side="bottom">底部抽屉</button></div>
        <div class="drawer-preview"><i></i><div><b></b><b></b><b></b></div></div>` },
    { id: 'popconfirm', zh: '气泡确认框', en: 'Popconfirm', alias: 'Inline Confirm',
      note: '比对话框轻，在按钮旁边就地确认。',
      html: `<div class="popc-wrap" data-act="dropdown"><button class="btn btn-sm btn-danger-ghost" type="button">${I('trash', 14)}删除</button>
        <div class="pop popc"><div class="row">${I('alert', 15)}<b>确定删除这条记录？</b></div><div class="row"><span class="spacer"></span><button class="btn btn-xs" type="button">取消</button><button class="btn btn-xs btn-danger" type="button" data-act="toast" data-type="success" data-msg="已删除">删除</button></div></div></div>` },
    { id: 'tooltip', zh: '文字提示', en: 'Tooltip', alias: 'Hint / Title',
      note: '悬停显示的简短说明，四个方向。',
      html: `<div class="tip-grid"><button class="btn btn-sm" type="button" data-tip="上方提示">上</button><button class="btn btn-sm" type="button" data-tip="左侧提示" data-tip-pos="left">左</button><button class="btn btn-sm" type="button" data-tip="右侧提示" data-tip-pos="right">右</button><button class="btn btn-sm" type="button" data-tip="下方提示" data-tip-pos="bottom">下</button></div>` },
    { id: 'popover', zh: '气泡卡片', en: 'Popover · Hover Card', alias: 'Flyout',
      note: '比 Tooltip 内容更丰富，可放头像、按钮。悬停头像试试。',
      html: `<div class="hovercard-wrap"><span>由 <span class="hc-trigger"><span class="avatar avatar-xs av4">苏</span><b>@苏青禾</b><div class="hovercard"><div class="row"><span class="avatar avatar-lg av4">苏</span><div><b>苏青禾</b><small class="muted">资深设计师</small></div></div><p class="muted">专注设计系统与组件库，热爱手冲咖啡。</p><div class="row"><span class="muted"><b>1.2k</b> 关注者</span><span class="spacer"></span><button class="btn btn-primary btn-xs" type="button">关注</button></div></div></span> 发布于 3 天前</span></div>` },
    { id: 'progress', zh: '进度条', en: 'Progress', alias: 'ProgressBar / Meter', w: 2,
      html: `<div class="prog-grid">
        <div class="col">${lbl('线形 Line')}<div class="prog-line"><div class="progress"><i style="--v:72%"></i></div><span class="num">72%</span></div><div class="prog-line"><div class="progress"><i style="--v:100%;--c:var(--success)"></i></div>${I('checkCircle', 15)}</div><div class="prog-line"><div class="progress"><i style="--v:38%;--c:var(--danger)"></i></div>${I('xCircle', 15)}</div>
          ${lbl('分段 Steps')}<div class="prog-steps">${Array.from({ length: 5 }, (_, i) => `<i class="${i < 3 ? 'on' : ''}"></i>`).join('')}</div>
          ${lbl('不确定 Indeterminate')}<div class="progress prog-indet"><i></i></div></div>
        <div class="col">${lbl('环形 Circle')}<div class="row" style="gap:14px">${ring(75, 'var(--primary)')}${ring(100, 'var(--success)', 64, '✓')}${ring(30, 'var(--warning)')}</div>
          ${lbl('仪表 Dashboard')}${Atlas.chart.gauge({ value: 68, label: '健康度', size: 140, color: 'var(--primary)' })}</div></div>` },
    { id: 'spin', zh: '加载中', en: 'Spin · Loading', alias: 'Spinner / Loader',
      note: '等待超过 1 秒时出现。更多加载动画见“动效”章节。',
      html: `<div class="row" style="gap:20px;color:var(--primary)"><span class="spin"></span><span class="spin" style="width:28px;height:28px;border-width:3px"></span><span class="dots-loader"><i></i><i></i><i></i></span></div>
        <div class="spin-box"><p>正在加载数据，请稍候……</p><div class="spin-mask"><span class="spin"></span><small>加载中</small></div></div>` },
    { id: 'skeleton', zh: '骨架屏', en: 'Skeleton', alias: 'Placeholder / Shimmer',
      note: '先显示内容轮廓，减少等待焦虑。点击按钮切换真实内容。',
      html: `<div class="sk-demo" id="skDemo"><div class="sk-item"><span class="sk sk-av"></span><div class="col" style="flex:1"><span class="sk" style="height:12px;width:40%"></span><span class="sk" style="height:10px;width:90%"></span><span class="sk" style="height:10px;width:70%"></span></div></div>
        <div class="sk-real"><span class="avatar av3">陈</span><div><b>陈默</b><p class="muted">完成了组件库 v3.0 的全部单元测试，覆盖率 96%。</p></div></div></div>
        <button class="btn btn-sm" type="button" data-act="skToggle" style="margin-top:10px">切换加载 / 完成</button>` },
    { id: 'result', zh: '结果', en: 'Result', alias: 'Success / Error Page',
      html: `<div class="result"><span class="result-ic">${I('check', 26, 'line', 3)}</span><b>支付成功</b><small class="muted">订单 #0871 · ¥1,299.00</small><div class="row"><button class="btn btn-primary btn-sm" type="button">查看订单</button><button class="btn btn-sm" type="button">继续购物</button></div></div>` },
    { id: 'tour', zh: '新手引导', en: 'Tour · Coachmark', alias: 'Onboarding Tip / Spotlight',
      note: '高亮某个功能并用气泡说明，引导用户一步步认识产品。',
      html: `<div class="tour"><div class="tour-ui"><span class="tour-btn">${I('plus', 14)}新建</span><span></span><span></span></div><div class="tour-spot"></div><div class="tour-pop"><small class="muted">第 1 步 / 共 3 步</small><b>从这里创建项目</b><p>点击“新建”即可开始你的第一个项目。</p><div class="row"><span class="tour-dots"><i class="on"></i><i></i><i></i></span><span class="spacer"></span><button class="btn btn-xs" type="button">跳过</button><button class="btn btn-xs btn-primary" type="button">下一步</button></div></div></div>` },
  ]));
})();
