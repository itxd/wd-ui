/* 组件：数据录入 */
(function () {
  const I = Atlas.icon;
  const lbl = (t) => `<span class="cmp-lbl">${t}</span>`;
  const ck = I('check', 12, 'line', 3);

  const days = () => {
    let s = '';
    const offset = 3;
    for (let i = 0; i < 35; i++) {
      const d = i - offset + 1;
      const inMonth = d >= 1 && d <= 31;
      const label = inMonth ? d : d < 1 ? 30 + d : d - 31;
      const cls = [!inMonth && 'out', d === 28 && 'today', d === 15 && 'sel', d > 15 && d < 22 && 'in-range', d === 22 && 'sel end'].filter(Boolean).join(' ');
      s += `<button type="button" class="${cls}" data-act="pickDay">${label}</button>`;
    }
    return s;
  };
  const timeCol = (n, sel, step = 1) => `<div class="tp-col">${Array.from({ length: n }, (_, i) => `<span class="${i * step === sel ? 'on' : ''}" data-act="pick">${String(i * step).padStart(2, '0')}</span>`).join('')}</div>`;

  Atlas.mount('cmp-entry', Atlas.cmpGrid('数据录入', [
    { id: 'input', zh: '输入框', en: 'Input', alias: 'TextField', w: 2,
      note: '前缀图标说明用途；后缀放清除、密码可见等操作；错误时边框变红并在下方说明原因。',
      html: `<div class="form-grid">
        <div><span class="form-label">基础 Basic</span><input class="input" placeholder="请输入用户名"></div>
        <div><span class="form-label">前缀图标 Prefix</span><div class="field">${I('mail', 14)}<input class="input" placeholder="邮箱地址"></div></div>
        <div><span class="form-label">可清除 Clearable</span><div class="field"><input class="input" value="可以一键清除的内容"><span class="field-suffix"><button type="button" data-act="clearInput" aria-label="清除">${I('xCircle', 14)}</button></span></div></div>
        <div><span class="form-label">密码 Password</span><div class="field">${I('lock', 14)}<input class="input" type="password" value="atlas2026"><span class="field-suffix"><button type="button" data-act="pwdToggle" aria-label="显示密码">${I('eye', 14)}</button></span></div></div>
        <div><span class="form-label">前后置标签 Addon</span><div class="input-addon"><span>https://</span><input class="input" value="atlas"><span>.com</span></div></div>
        <div><span class="form-label">错误 Error</span><input class="input is-error" value="138001"><span class="form-help is-error">手机号格式不正确</span></div>
        <div><span class="form-label">禁用 Disabled</span><input class="input" value="不可编辑" disabled></div>
        <div><span class="form-label">尺寸 Small</span><input class="input input-sm" placeholder="小号输入框"></div>
      </div>` },
    { id: 'floatlabel', zh: '浮动标签输入框', en: 'Floating Label', alias: 'Outlined TextField',
      note: '标签在聚焦或有值时上浮，节省空间，Material 风格常用。',
      html: `<div class="col" style="gap:14px"><label class="float-field"><input placeholder=" "><span>邮箱地址</span></label><label class="float-field"><input placeholder=" " value="Ada Wang"><span>姓名</span></label></div>` },
    { id: 'textarea', zh: '文本域', en: 'Textarea', alias: 'Multiline Input',
      html: `<div class="ta-wrap"><textarea class="textarea" maxlength="100" data-counter placeholder="说说你的想法…">这个页面帮我把设计术语都对上了。</textarea><span class="ta-count num">15 / 100</span></div>` },
    { id: 'autocomplete', zh: '搜索 / 自动补全', en: 'Search · Autocomplete', alias: 'Combobox / Typeahead',
      note: '输入时实时给出建议，可用方向键选择。试着输入“表”。',
      html: `<div class="ac" data-autocomplete><div class="field">${I('search', 14)}<input class="input" placeholder="搜索组件…" autocomplete="off"></div><div class="pop ac-pop"></div></div>` },
    { id: 'inputnumber', zh: '数字输入框', en: 'InputNumber · Stepper', alias: 'NumberField',
      html: `<div class="col"><div class="stepper"><button type="button" data-act="step" data-d="-1">${I('minus', 14)}</button><input value="3" class="num" aria-label="数量"><button type="button" data-act="step" data-d="1">${I('plus', 14)}</button></div>
        <div class="input-addon" style="max-width:180px"><span>¥</span><input class="input num" value="1,299.00"><span>元</span></div></div>` },
    { id: 'select', zh: '选择器', en: 'Select', alias: 'Dropdown / Picker',
      html: `<div class="sel" data-select><div class="input fake-select" data-act="selectOpen"><span class="ph">请选择城市</span>${I('chevD', 14)}</div>
        <div class="pop sel-pop">${['北京', '上海', '杭州', '深圳', '成都'].map((c) => `<div class="pop-item" data-act="selectPick">${c}<span class="spacer"></span>${I('check', 14)}</div>`).join('')}</div></div>` },
    { id: 'multiselect', zh: '多选选择器', en: 'Multi Select', alias: 'Tag Select',
      html: `<div class="sel" data-select data-multi><div class="input fake-select ms-box" data-act="selectOpen"><span class="ms-tags"><span class="tag tag-primary">设计</span><span class="tag tag-primary">前端</span></span>${I('chevD', 14)}</div>
        <div class="pop sel-pop">${['设计', '前端', '后端', '产品', '运营'].map((c, i) => `<div class="pop-item${i < 2 ? ' is-active' : ''}" data-act="selectPick">${c}<span class="spacer"></span>${I('check', 14)}</div>`).join('')}</div></div>` },
    { id: 'cascader', zh: '级联选择', en: 'Cascader', alias: '省市区选择',
      note: '逐级选择有层级关系的数据，如省 / 市 / 区。',
      html: `<div class="input fake-select" style="margin-bottom:8px"><span>浙江 / 杭州 / 西湖区</span>${I('chevD', 14)}</div>
        <div class="cascader"><div>${['北京', '上海', '浙江', '广东'].map((t) => `<span class="${t === '浙江' ? 'on' : ''}" data-act="pick">${t}${I('chevR', 12)}</span>`).join('')}</div><div>${['杭州', '宁波', '温州'].map((t) => `<span class="${t === '杭州' ? 'on' : ''}" data-act="pick">${t}${I('chevR', 12)}</span>`).join('')}</div><div>${['西湖区', '滨江区', '余杭区'].map((t) => `<span class="${t === '西湖区' ? 'on' : ''}" data-act="pick">${t}</span>`).join('')}</div></div>` },
    { id: 'radio', zh: '单选框', en: 'Radio', alias: 'RadioGroup',
      html: `${lbl('基础')}<div class="row-wrap">${['按月', '按季', '按年'].map((t, i) => `<label class="radio"><input type="radio" name="rd1"${i === 0 ? ' checked' : ''}><span class="radio-dot"></span>${t}</label>`).join('')}</div>
        ${lbl('卡片式 Card Radio')}<div class="radio-cards">${[['基础版', '¥0'], ['专业版', '¥39'], ['企业版', '定制']].map(([t, p], i) => `<label class="radio-card"><input type="radio" name="rd2"${i === 1 ? ' checked' : ''}><b>${t}</b><small>${p}</small><i>${ck}</i></label>`).join('')}</div>` },
    { id: 'checkbox', zh: '复选框', en: 'Checkbox', alias: 'CheckboxGroup',
      note: '“全选”有三种状态：全选、部分选中（半选）、未选。',
      html: `<div class="col" data-checkall><label class="check is-indeterminate" data-role="all"><input type="checkbox"><span class="check-box">${ck}</span><b>全选</b></label>
        <div class="col" style="padding-left:24px">${['短信通知', '邮件通知', '站内信'].map((t, i) => `<label class="check"><input type="checkbox" data-role="item"${i === 0 ? ' checked' : ''}><span class="check-box">${ck}</span>${t}</label>`).join('')}</div></div>` },
    { id: 'switch', zh: '开关', en: 'Switch', alias: 'Toggle',
      note: '开关立即生效；需要“提交”才生效的设置应使用复选框。',
      html: `<div class="col" style="gap:12px">
        <label class="switch"><input type="checkbox" checked><span class="switch-track"></span>默认</label>
        <label class="switch switch-sm"><input type="checkbox"><span class="switch-track"></span>小号</label>
        <label class="switch switch-text"><input type="checkbox" checked><span class="switch-track"><em>开</em><em>关</em></span>带文字</label>
        <label class="switch switch-ios"><input type="checkbox" checked><span class="switch-track"></span>iOS 风格</label></div>` },
    { id: 'slider', zh: '滑块', en: 'Slider', alias: 'Range',
      html: `<div class="col" style="gap:16px"><div class="slider-row"><input type="range" class="range" min="0" max="100" value="64" data-range-out="r1"><b class="num" id="r1">64</b></div>
        <div class="slider-row"><span class="muted">${I('volume', 14)}</span><input type="range" class="range" min="0" max="100" value="30" data-range-out="r2"><b class="num" id="r2">30</b></div>
        <div class="range-dual"><i style="left:20%;right:35%"></i><b style="left:20%"></b><b style="left:65%"></b><span class="muted">¥200 – ¥650</span></div></div>` },
    { id: 'rate', zh: '评分', en: 'Rate', alias: 'Rating / Stars',
      html: `<div class="col"><div class="rate" data-rate="4">${Array.from({ length: 5 }, (_, i) => `<span data-v="${i + 1}">${I('star', 22, 'fill')}</span>`).join('')}<b class="rate-txt">满意</b></div>
        <div class="emoji-rate">${['😞', '😐', '🙂', '😀', '😍'].map((e, i) => `<span class="${i === 3 ? 'on' : ''}" data-act="pick">${e}</span>`).join('')}</div></div>` },
    { id: 'datepicker', zh: '日期选择器', en: 'DatePicker', alias: 'Calendar Picker / RangePicker',
      note: '支持单日与范围；今天用圆点标出。点击日期可以切换。',
      html: `<div class="dp"><div class="dp-head"><button type="button" class="btn btn-ghost btn-xs btn-icon">${I('chevL', 14)}</button><b>2026 年 10 月</b><button type="button" class="btn btn-ghost btn-xs btn-icon">${I('chevR', 14)}</button></div>
        <div class="dp-week">${'一二三四五六日'.split('').map((d) => `<span>${d}</span>`).join('')}</div><div class="dp-days">${days()}</div></div>` },
    { id: 'timepicker', zh: '时间选择器', en: 'TimePicker', alias: 'Wheel Picker',
      html: `<div class="tp"><div class="input fake-select" style="margin-bottom:8px">${I('clock', 14)}<span>14 : 30 : 00</span></div><div class="tp-cols">${timeCol(24, 14)}${timeCol(12, 30, 5)}${timeCol(6, 0, 10)}</div></div>` },
    { id: 'upload', zh: '上传', en: 'Upload', alias: 'Dropzone / FilePicker', w: 2,
      note: '支持拖拽、点击选择；上传中显示进度，失败可重试。点击“选择文件”模拟一次上传。',
      html: `<div class="up-grid"><div class="dropzone" data-dropzone>${I('cloudUp', 30)}<b>拖拽文件到这里，或 <button type="button" class="btn btn-text" data-act="uploadSim">选择文件</button></b><small>支持 PNG、JPG、PDF，单个不超过 20MB</small></div>
        <div class="up-list" id="upList">
          <div class="up-item done">${I('fileText', 18)}<div><b>需求文档 v3.pdf</b><small>2.4 MB · 已完成</small></div>${I('checkCircle', 16)}</div>
          <div class="up-item err">${I('image', 18)}<div><b>banner@2x.png</b><small>上传失败：网络中断</small></div><button type="button" class="btn btn-text">重试</button></div>
        </div>
        <div class="up-imgs"><span class="up-img" style="--h:200"></span><span class="up-img" style="--h:320"></span><button type="button" class="up-add" data-act="uploadSim">${I('plus', 18)}<small>上传</small></button></div></div>` },
    { id: 'colorpicker', zh: '颜色选择器', en: 'ColorPicker', alias: 'Swatches',
      html: `<div class="cp" data-colorpicker><div class="cp-swatches">${['#ef4444', '#f97316', '#f59e0b', '#10b981', '#06b6d4', '#3b82f6', '#6366f1', '#a855f7', '#ec4899', '#111827'].map((c, i) => `<button type="button" style="--c:${c}" class="${i === 6 ? 'on' : ''}" data-act="cpPick" data-c="${c}"></button>`).join('')}</div>
        <div class="row"><input type="color" value="#6366f1" class="cp-native" aria-label="自定义颜色"><input class="input input-sm mono cp-hex" value="#6366F1"></div></div>` },
    { id: 'otp', zh: '验证码输入', en: 'OTP · PIN Input', alias: 'Verification Code',
      note: '输入一位自动跳到下一格，支持退格回退。',
      html: `<div class="otp" data-otp>${Array.from({ length: 6 }, () => '<input maxlength="1" inputmode="numeric" aria-label="验证码">').join('')}</div><p class="muted" style="margin-top:10px;font-size:12px">验证码已发送至 138****1234 · <a class="lk" href="javascript:void(0)">58s 后重发</a></p>` },
    { id: 'taginput', zh: '标签输入', en: 'Tag Input', alias: 'Chips Input',
      note: '输入后按回车生成标签，点 × 删除。',
      html: `<div class="tag-input" data-taginput><span class="tag tag-primary">设计系统<button type="button" data-act="tagRemove">${I('x', 11)}</button></span><span class="tag tag-primary">组件库<button type="button" data-act="tagRemove">${I('x', 11)}</button></span><input placeholder="输入后回车" aria-label="添加标签"></div>` },
    { id: 'transfer', zh: '穿梭框', en: 'Transfer', alias: 'Dual List', w: 2,
      note: '在两个列表之间移动选项，常用于权限分配。勾选后点击箭头。',
      html: `<div class="transfer" data-transfer>
        <div class="tf-list" data-side="l"><div class="tf-head"><b>可选成员</b><small class="num">4 项</small></div>${['林小满', '周以安', '陈默', '苏青禾'].map((n) => `<label class="check"><input type="checkbox"><span class="check-box">${ck}</span>${n}</label>`).join('')}</div>
        <div class="tf-btns"><button type="button" class="btn btn-sm btn-icon btn-primary" data-act="transferMove" data-to="r">${I('chevR', 14)}</button><button type="button" class="btn btn-sm btn-icon" data-act="transferMove" data-to="l">${I('chevL', 14)}</button></div>
        <div class="tf-list" data-side="r"><div class="tf-head"><b>已选成员</b><small class="num">2 项</small></div>${['韩一舟', '顾南星'].map((n) => `<label class="check"><input type="checkbox"><span class="check-box">${ck}</span>${n}</label>`).join('')}</div></div>` },
    { id: 'validation', zh: '表单校验', en: 'Form Validation', alias: 'Field Error',
      note: '在失焦或提交时校验；错误紧贴字段显示。直接点“提交”试试。',
      html: `<form class="vf" data-validate onsubmit="return false">
        <label><span class="form-label"><i class="req">*</i>昵称</span><input class="input" name="nick" placeholder="2–12 个字"><span class="form-help">将显示在个人主页</span></label>
        <label><span class="form-label"><i class="req">*</i>邮箱</span><input class="input" name="mail" placeholder="name@example.com"><span class="form-help"></span></label>
        <button class="btn btn-primary" type="button" data-act="validateDemo">提交</button></form>` },
    { id: 'password', zh: '密码强度', en: 'Password Strength', alias: 'Strength Meter',
      html: `<div class="pwd" data-pwd><div class="field">${I('lock', 14)}<input class="input" type="password" placeholder="输入密码试试" autocomplete="new-password"></div><div class="pwd-bars"><i></i><i></i><i></i><i></i></div><small class="muted pwd-txt">至少 8 位，包含字母和数字</small></div>` },
    { id: 'richtext', zh: '富文本编辑器', en: 'Rich Text Editor', alias: 'WYSIWYG', w: 2,
      note: '选中文字后点工具栏按钮改变格式。',
      html: `<div class="rte"><div class="rte-bar">${[['bold', 'bold', '加粗'], ['italic', 'italic', '斜体'], ['underline', 'underline', '下划线'], ['insertUnorderedList', 'list', '列表'], ['formatBlock:blockquote', 'quote', '引用'], ['createLink', 'link', '链接']].map(([cmd, ic, t]) => `<button type="button" data-act="rte" data-cmd="${cmd}" data-tip="${t}">${I(ic, 15)}</button>`).join('')}<span class="rte-sep"></span><button type="button" data-act="rte" data-cmd="undo" data-tip="撤销">${I('refresh', 14)}</button></div>
        <div class="rte-body" contenteditable="true" spellcheck="false"><h4>会议纪要</h4><p>本周完成了<b>定价页改版</b>，转化率提升 <i>12%</i>。</p><ul><li>周四前完成图标替换</li><li>下周一灰度发布</li></ul></div></div>` },
  ]));
})();
