# 设计提示词拼装方法

最终提示词要做到：**别人只拿到这段话，就能做出与方案一致的界面**。按下面 7 段拼装，缺一段都会让 AI 自由发挥。

## 模板

````markdown
# 任务
请实现「<产品名> · <页面名>」（<形态>，<尺寸，如 桌面 1440×900 / iPhone 390×844>），
使用 <技术栈，如 HTML + CSS + 原生 JS / React + Tailwind / Vue 3>，示例数据使用真实感的中文内容。

## 界面目标
<一句话：用户在这里完成什么任务>

## 布局骨架
- <区域 1：位置、尺寸、是否固定>
- <区域 2 …>

## 区域与组件（自上而下、自左向右）
1. <区域名>：<组件标准名称> + <内容与数量> + <关键视觉细节>
2. …

## 交互与动效
- <触发 → 反馈，含时长与曲线，如：点击“编辑”从右侧滑入 380px 抽屉，400ms cubic-bezier(.22,1,.36,1)>
- <加载 / 空数据 / 错误状态如何展示>

## 视觉风格
<粘贴 styles.md 中所选风格的“规格”块；若用户有品牌色，把“主色”替换为品牌色，并说明主色上的文字颜色>

## 设计令牌
```css
:root {
  --color-primary: …; --color-primary-hover: …; --color-primary-soft: …; --color-on-primary: …;
  --color-bg: …; --color-surface: …; --color-text: …; --color-text-secondary: …; --color-border: …;
  --color-success: #16A34A; --color-warning: #F59E0B; --color-danger: #EF4444; --color-info: #0EA5E9;
  --radius-control: …; --radius-card: …; --shadow-card: …;
  --space-unit: 8px; --font-sans: …;
  --duration-base: 250ms; --ease-out: cubic-bezier(.22, 1, .36, 1);
}
```

## 验收标准
- 布局与组件顺序与上文一致，没有遗漏区域
- 颜色、圆角、阴影、字体只通过上面的 CSS 变量引用
- 所有可点击元素有 hover / active / focus-visible / disabled 状态
- 正文对比度 ≥ 4.5:1；数字使用等宽数字（tabular-nums），金额右对齐
- 在 ≤ 768px 宽度下布局合理；尊重 prefers-reduced-motion
````

## 写法要点

1. **用标准组件名**：从 `components.md` 取中文 + 英文（如“抽屉 Drawer”“分段控制器 Segmented”“骨架屏 Skeleton”），AI 对标准名的理解最准确。
2. **写数字，不写形容词**：“圆角 12px、1px #E4E7EC 边框、阴影 0 1px 2px rgba(16,24,40,.06)”比“精致的卡片”有用得多。
3. **写清状态**：选中、悬停、按下、禁用、加载、空数据、错误，各写一句。
4. **写清数量与示例数据**：“4 张统计卡片：销售额 ¥1,284,560 ↑12.5% …”，生成结果会更像真实产品。
5. **一种风格到底**：不要在同一份提示词里混入两种风格的圆角和阴影；需要混搭时写明“主风格 + 点缀区域”。
6. **单个组件或动效**：如果用户只要一个组件 / 动效，建议打开在线图谱 https://itxd.github.io/wd-ui/#components 点击该组件的“提示词”按钮，复制带完整 HTML / CSS 的版本，一模一样还原的成功率最高。

## 只要“风格模板”时

直接给：任务一句话 + `styles.md` 中该风格的完整规格块 + 设计令牌 + 验收标准。例如：

```text
# 任务
请按「玻璃拟态（Glassmorphism）」风格为一个金融 App 设计组件库：按钮、卡片、输入框、导航栏、标签栏、对话框。
（接 styles.md 中 glass 的规格块）
（接设计令牌）
（接验收标准）
```
