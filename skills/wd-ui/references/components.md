<!-- 自动生成，请勿手改：node scripts/build.mjs（数据源：网站 js/ 目录） -->
# 组件词汇表

共 102 个组件，按功能分 8 类。写提示词时用这里的标准名称（中文 + English），AI 能更准确地理解。每个组件都可以在 https://itxd.github.io/wd-ui/#components 点击“提示词”复制带完整 HTML / CSS 的精确提示词。

## 通用

| 中文 | English | 别名 | 要点 |
| --- | --- | --- | --- |
| 按钮 | Button | Btn | 一个区域只放一个主按钮；危险操作用红色；图标按钮必须有提示文字。 |
| 按钮组 / 分裂按钮 | Button Group · Split Button | ButtonGroup | 把相关操作放在一起；分裂按钮左边执行默认操作，右边展开更多。 |
| 悬浮按钮 | FAB / Float Button | Speed Dial | 页面最主要的操作，固定在右下角。悬停展开的叫“速拨 Speed Dial”。 |
| 图标 | Icon | Iconfont / SVG Icon | 本页使用 24×24 网格、2px 描边的线性图标。悬停查看图标名。 |
| 快捷键 | Kbd | Keyboard Key | 在菜单、提示和文档里展示快捷键。 |
| 链接 | Link | Anchor Text | 链接与按钮的区别：链接去往别处，按钮执行操作。 |

## 布局

| 中文 | English | 别名 | 要点 |
| --- | --- | --- | --- |
| 栅格 | Grid | Row / Col | 把宽度等分成 12 或 24 列，元素按列数占位，不同断点可以占不同列数。 |
| 分割线 | Divider | Separator |  |
| 间距 / 堆叠 | Space · Stack | HStack / VStack | 统一控制子元素之间的间距，避免到处写 margin。 |
| 分栏 | Splitter | Resizable Panels | 拖动中间的手柄调整两侧宽度，常见于 IDE、邮件、文件管理。 |
| 瀑布流 | Masonry | Waterfall | 高度不一的卡片紧密排列，适合图片、灵感、商品。 |
| 吸顶 / 固钉 | Affix · Sticky | position: sticky | 在下方区域内滚动，标题栏会固定在顶部。 |
| 宽高比 | Aspect Ratio | aspect-ratio |  |

## 导航

| 中文 | English | 别名 | 要点 |
| --- | --- | --- | --- |
| 导航栏 | Navbar · Header | Top Nav / App Bar |  |
| 侧边菜单 | Menu · Sidebar | SideNav / Drawer Menu |  |
| 标签页 | Tabs | Tab / TabView | 线形标签的指示条会滑动到选中项；卡片式常用于多文档；胶囊式就是分段控制器。 |
| 面包屑 | Breadcrumb | Crumbs | 显示当前页面在层级中的位置，并可以快速返回上级。 |
| 分页 | Pagination | Pager | 数据很多时分页加载。移动端更常用“加载更多”或无限滚动。 |
| 步骤条 | Steps | Stepper / Wizard | 把长流程拆成几步，显示当前进度。点击按钮切换。 |
| 下拉菜单 | Dropdown Menu | Menu / Context Menu | 点击按钮展开一组操作；右键菜单叫 Context Menu。 |
| 锚点 / 目录 | Anchor · TOC | Table of Contents |  |
| 命令面板 | Command Palette | Spotlight / ⌘K | 键盘优先的全局搜索与操作入口，Linear、VS Code、Raycast 的标配。 |
| 回到顶部 | BackTop · Scroll to Top |  |  |
| 超级菜单 | Mega Menu | Flyout | 官网导航展开的大面板，按分组展示大量入口。 |
| 底部标签栏 | Tab Bar · Bottom Navigation | BottomNav | 移动端一级导航，3–5 个入口。 |

## 数据录入

| 中文 | English | 别名 | 要点 |
| --- | --- | --- | --- |
| 输入框 | Input | TextField | 前缀图标说明用途；后缀放清除、密码可见等操作；错误时边框变红并在下方说明原因。 |
| 浮动标签输入框 | Floating Label | Outlined TextField | 标签在聚焦或有值时上浮，节省空间，Material 风格常用。 |
| 文本域 | Textarea | Multiline Input |  |
| 搜索 / 自动补全 | Search · Autocomplete | Combobox / Typeahead | 输入时实时给出建议，可用方向键选择。试着输入“表”。 |
| 数字输入框 | InputNumber · Stepper | NumberField |  |
| 选择器 | Select | Dropdown / Picker |  |
| 多选选择器 | Multi Select | Tag Select |  |
| 级联选择 | Cascader | 省市区选择 | 逐级选择有层级关系的数据，如省 / 市 / 区。 |
| 单选框 | Radio | RadioGroup |  |
| 复选框 | Checkbox | CheckboxGroup | “全选”有三种状态：全选、部分选中（半选）、未选。 |
| 开关 | Switch | Toggle | 开关立即生效；需要“提交”才生效的设置应使用复选框。 |
| 滑块 | Slider | Range |  |
| 评分 | Rate | Rating / Stars |  |
| 日期选择器 | DatePicker | Calendar Picker / RangePicker | 支持单日与范围；今天用圆点标出。点击日期可以切换。 |
| 时间选择器 | TimePicker | Wheel Picker |  |
| 上传 | Upload | Dropzone / FilePicker | 支持拖拽、点击选择；上传中显示进度，失败可重试。点击“选择文件”模拟一次上传。 |
| 颜色选择器 | ColorPicker | Swatches |  |
| 验证码输入 | OTP · PIN Input | Verification Code | 输入一位自动跳到下一格，支持退格回退。 |
| 标签输入 | Tag Input | Chips Input | 输入后按回车生成标签，点 × 删除。 |
| 穿梭框 | Transfer | Dual List | 在两个列表之间移动选项，常用于权限分配。勾选后点击箭头。 |
| 表单校验 | Form Validation | Field Error | 在失焦或提交时校验；错误紧贴字段显示。直接点“提交”试试。 |
| 密码强度 | Password Strength | Strength Meter |  |
| 富文本编辑器 | Rich Text Editor | WYSIWYG | 选中文字后点工具栏按钮改变格式。 |

## 数据展示

| 中文 | English | 别名 | 要点 |
| --- | --- | --- | --- |
| 头像 | Avatar | AvatarGroup |  |
| 徽标 | Badge | Dot / Counter / Ribbon | 数字徽标提示未读数，超过 99 显示 99+；小红点只提示“有新内容”。 |
| 标签 | Tag · Chip | Label / Pill | 用于分类、状态、筛选。可关闭、可选中。 |
| 卡片 | Card | Panel / Tile | 把相关信息组织在一个容器里。图片卡片、资料卡片、数据卡片是最常见的三种。 |
| 列表 | List | ListItem / Cell |  |
| 表格 | Table | DataGrid / DataTable | 点击表头“绩效”“入职日期”可以排序；斑马纹帮助横向阅读；数字右对齐。 |
| 描述列表 | Descriptions | Key-Value / Definition List | 详情页最常用：成对展示“字段名 - 值”。 |
| 统计数值 | Statistic | KPI / Metric | 数字进入视野时从 0 滚动到目标值。 |
| 时间轴 | Timeline | Activity Feed |  |
| 树形控件 | Tree | TreeView | 展示层级数据；点击箭头展开 / 收起。 |
| 折叠面板 | Collapse · Accordion | Expansion Panel | 手风琴模式：同一时间只展开一个。 |
| 轮播图 | Carousel | Slider / Swiper | 自动轮播，悬停暂停；左右箭头与底部圆点都可切换。 |
| 图片与预览 | Image · Lightbox | Image Preview / Gallery | 点击缩略图打开全屏预览（灯箱）。 |
| 日历 | Calendar | Scheduler / Month View |  |
| 空状态 | Empty State | Empty / No Data | 没有数据时告诉用户原因，并给出下一步操作。 |
| 二维码 | QR Code | QRCode |  |
| 代码块 | Code Block | Syntax Highlight |  |
| 对比滑块 | Image Compare | Before / After | 拖动中间手柄对比前后效果，常用于修图、改版展示。 |
| 水印 | Watermark |  | 在敏感页面铺满半透明文字，防止截图外泄。 |

## 反馈

| 中文 | English | 别名 | 要点 |
| --- | --- | --- | --- |
| 警告提示 | Alert | Banner / Callout | 页面内的静态提示，不会自动消失。四种语义色对应四种情况。 |
| 全局提示 | Message · Toast | Snackbar | 轻量、自动消失的反馈。带“撤销”按钮的叫 Snackbar。 |
| 通知提醒框 | Notification | Push / Notice | 从屏幕角落滑入，内容比 Toast 多，可以有标题、描述和操作。 |
| 对话框 | Modal · Dialog | Popup / Lightbox | 打断当前操作，要求用户处理。确认类对话框按钮放右下角。 |
| 抽屉 | Drawer · Sheet | Side Panel / Off-canvas | 从屏幕边缘滑出，适合放表单、详情、筛选，背后的页面仍可参照。 |
| 气泡确认框 | Popconfirm | Inline Confirm | 比对话框轻，在按钮旁边就地确认。 |
| 文字提示 | Tooltip | Hint / Title | 悬停显示的简短说明，四个方向。 |
| 气泡卡片 | Popover · Hover Card | Flyout | 比 Tooltip 内容更丰富，可放头像、按钮。悬停头像试试。 |
| 进度条 | Progress | ProgressBar / Meter |  |
| 加载中 | Spin · Loading | Spinner / Loader | 等待超过 1 秒时出现。更多加载动画见“动效”章节。 |
| 骨架屏 | Skeleton | Placeholder / Shimmer | 先显示内容轮廓，减少等待焦虑。点击按钮切换真实内容。 |
| 结果 | Result | Success / Error Page |  |
| 新手引导 | Tour · Coachmark | Onboarding Tip / Spotlight | 高亮某个功能并用气泡说明，引导用户一步步认识产品。 |

## 图表

| 中文 | English | 别名 | 要点 |
| --- | --- | --- | --- |
| 折线图 | Line Chart | Trend |  |
| 面积图 | Area Chart |  |  |
| 柱状图 | Column Chart | Bar (vertical) |  |
| 堆叠柱状图 | Stacked Column |  |  |
| 条形图 | Bar Chart | Ranking / Horizontal Bar |  |
| 饼图 / 环形图 | Pie · Donut Chart |  |  |
| 仪表盘 | Gauge |  |  |
| 雷达图 | Radar Chart | Spider Chart |  |
| 热力图 | Heatmap | Contribution Graph |  |
| 散点图 | Scatter Plot |  |  |
| 漏斗图 | Funnel Chart |  |  |
| 迷你图 | Sparkline | Inline Chart |  |
| 矩形树图 | Treemap |  |  |
| 子弹图 | Bullet Chart | Target vs Actual |  |

## AI 交互

| 中文 | English | 别名 | 要点 |
| --- | --- | --- | --- |
| AI 对话消息 | AI Chat Message | Assistant Response | 用户消息靠右、AI 回复靠左并带头像；回复底部提供复制、重新生成和反馈。点“重新生成”看流式输出。 |
| 提示词输入框 | Prompt Input | Composer / Chat Input | 多行输入 + 附件 + 模型选择 + 工具开关 + 发送；Enter 发送，Shift+Enter 换行。 |
| 思考过程 | Thinking · Reasoning | Chain of Thought | 推理模型先显示“思考中”，完成后可以折叠查看。 |
| 建议问题 | Prompt Starters | Suggestion Chips |  |
| 引用来源 | Citations · Sources |  |  |
| 工具调用 / 任务步骤 | Tool Calls · Agent Steps |  | 智能体执行多步任务时，逐步展示每一步的状态。 |
| 生成中占位 | Generating Placeholder | AI Image Loading |  |
| 语音输入 | Voice Input | Dictation |  |
