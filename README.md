# wd-ui · UI 图谱与设计风格 Skill

一个开源项目，包含两部分：

1. **UI 图谱网站**：按“产品形态 × UI 风格 × 色系 × 功能 × 动效”整理网页界面，全部示例可交互，每个风格、组件、动效、页面、配色都能一键复制**精确提示词**（附带页面真实使用的 HTML、CSS 和设计令牌）。
   在线访问：<https://itxd.github.io/wd-ui/>
2. **wd-ui Skill**：给 Claude Code 等 AI 编程助手使用的设计风格顾问。它会分析你的业务场景，从 28 种 UI 风格、15 套配色、100+ 组件、27 种页面模板中推荐最合适的方案，并输出可直接使用的设计提示词和设计令牌。

## 安装 Skill

任选一种：

```bash
# 方式一：skills CLI（支持 Claude Code、Codex、Cursor 等多种 Agent）
npx skills add itxd/wd-ui

# 方式二：Claude Code 插件市场（在 Claude Code 中输入）
/plugin marketplace add itxd/wd-ui
/plugin install wd-ui@wd-ui

# 方式三：手动安装到 Claude Code 个人 skills 目录
git clone https://github.com/itxd/wd-ui.git
mkdir -p ~/.claude/skills && cp -r wd-ui/skills/wd-ui ~/.claude/skills/
```

## 使用示例

安装后直接用自然语言提问，Claude 会自动调用 wd-ui：

- “我要做一个面向中小企业的进销存管理后台，帮我选 UI 风格并给出设计提示词”
- “给一个儿童英语学习 App 推荐配色和风格”
- “我们品牌色是 #0F766E，做一个医疗预约小程序首页，给我完整提示词”
- “用玻璃拟态风格写一套按钮、卡片、输入框的提示词”

输出包含：推荐结论（主推 + 两个备选及评分）、主推方案说明、设计令牌（CSS 变量）、可直接复制的完整设计提示词、在线参考链接。

## 网站内容

| 章节 | 内容 |
| --- | --- |
| 产品形态 | 管理后台（仪表盘 / CRUD / 数据大屏）、Web 应用（落地页 / SaaS 工作台 / 电商 / 文档站）、App（7 屏），可切换 10 种 UI 风格 |
| UI 风格 | 27 种风格的实时样本、特征、实现要点、适用场景 |
| 色系 | 色彩角色、15 套色板、色阶、配色方法、渐变、明暗模式 |
| 基础规范 | 字体、间距、圆角、阴影、栅格、图标、可访问性 |
| 页面类型 | 27 种常见页面线框图 |
| 组件 | 8 类 100+ 可交互组件，含 AI 交互组件 |
| 动效 | 缓动、时长、微交互、加载、转场、滚动、文字、氛围、手势 |
| 术语索引 | 450+ 条中英文术语，可搜索并定位 |

## 目录结构

```
index.html            网站入口（纯静态，无依赖，可直接双击打开）
css/                  样式
js/                   网站脚本；js/data 为风格规格、界面提示词等数据
skills/wd-ui/         Skill：SKILL.md + references/
.claude-plugin/       Claude Code 插件与插件市场清单
scripts/build.mjs     生成 CSS 包与 skill 参考资料
```

## 开发

```bash
# 修改 css/ 或 js/data、js/sections 中的数据后，重新生成产物
node scripts/build.mjs

# 检查产物是否最新（适合放进 CI）
node scripts/build.mjs --check
```

`skills/wd-ui/references/` 中带“自动生成”标记的文件由网站数据生成，请修改网站数据后重新构建；`industry-matrix.md` 与 `prompt-recipe.md` 为手写文件。

## 许可证

[MIT](LICENSE)：可免费用于个人和商业项目，可修改、再分发，只需保留版权声明。
