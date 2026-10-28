# 行业 × 形态 → 风格与配色匹配矩阵

风格 id 对应 `styles.md`，配色名称对应 `palettes.md`。“主推”是多数情况下的最优解，“可选”需要结合品牌调性判断，“慎用”需要说明理由才用。

## 一、按行业

| 行业 / 业务 | 主推风格 | 可选风格 | 慎用 | 推荐配色 |
| --- | --- | --- | --- | --- |
| 企业 B 端、SaaS 后台、CRM、ERP | `saas` | `flat` `m3` `fluent` `darktech` | `neu` `clay` `memphis` `y2k` | 科技蓝、商务深海、薄荷海洋 |
| 开发者工具、云服务、API 平台 | `darktech` | `terminal` `saas` `blueprint` `swiss` | `clay` `memphis` | 黑白极简、优雅紫 |
| AI / 大模型产品 | `darktech`（工具）/ `aurora`（官网） | `glasslight` `glass` `bento` `min` | `skeuo` `pixel` | 优雅紫、黑白极简、科技蓝 |
| 金融、银行、保险、券商 | `saas` | `min` `glasslight`（App）`lux`（高净值）`ios` | `brutal` `memphis` `cyber` | 商务深海、科技蓝、暗夜金 |
| 政务、国企、党建、公共服务 | `saas` | `flat` `guochao`（文化宣传） | `cyber` `y2k` `brutal` | 科技蓝、中国红 |
| 电商、零售、促销会场 | `flat` | `bento` `clay`（年轻）`guochao`（节日） | `darktech` `swiss` | 活力橙、中国红、珊瑚日落 |
| 本地生活、外卖、出行、小程序 | `flat` | `m3` `ios` `clay` | `editorial` `swiss` | 活力橙、清新绿、薄荷海洋 |
| 社交、内容社区、短视频 | `ios` | `glasslight` `glass` `y2k` `memphis` `clay` | `swiss` `blueprint` | 樱花粉、珊瑚日落、马卡龙 |
| 教育、少儿、K12 | `clay` | `memphis` `hand` `flat` `pixel`（游戏化） | `darktech` `lux` | 马卡龙、清新绿、活力橙 |
| 医疗、健康、心理 | `min` | `saas` `ios` `glasslight` `neu`（家用设备） | `cyber` `brutal` | 薄荷海洋、清新绿 |
| 游戏、电竞、潮玩 | `cyber` | `pixel` `hud` `y2k` `clay` | `min` `editorial` | 赛博霓虹、优雅紫 |
| 奢侈品、珠宝、高端酒店、地产 | `lux` | `min` `editorial` | `flat` `memphis` `clay` | 暗夜金、黑白极简、莫兰迪 |
| 媒体、博客、出版、品牌故事 | `editorial` | `swiss` `min` | `neu` `clay` | 黑白极简、大地自然 |
| 数据大屏、指挥中心、安防、能源 | `hud` | `darktech` | 所有浅色风格 | 科技蓝（深色版）、赛博霓虹（克制） |
| 文化、文旅、茶饮、节日营销 | `guochao` | `hand` `memphis` `editorial` | `darktech` `terminal` | 中国红、大地自然 |
| 家居、生活方式、咖啡、手作 | `min` | `editorial` `hand` `bento` | `cyber` `hud` | 莫兰迪、大地自然 |
| 智能硬件、IoT 控制面板、车机 | `glasslight` | `glass`（深色）`neu` `bento` `ios` `hud`（车机） | `memphis` `brutal` | 黑白极简、薄荷海洋、科技蓝 |
| 创意机构、个人作品集、设计工作室 | `brutal` | `swiss` `bauhaus` `editorial` `iso` `bento` | `fluent` | 黑白极简 + 一个高饱和强调色 |
| Web3、加密、元宇宙 | `aurora` | `cyber` `glass` `y2k` | `skeuo` `editorial` | 赛博霓虹、优雅紫 |
| Windows 桌面软件、Office 插件 | `fluent` | `saas` | `ios` `m3` | 科技蓝 |
| Android 原生应用 | `m3` | `flat` | `ios` | 主色取品牌色，生成色调表面 |
| iOS 原生应用 | `ios` | `min` `glass` | `m3` | 主色取品牌色，系统色作功能色 |

## 二、按产品形态的额外约束

| 形态 | 信息密度 | 必须满足 | 风格倾向 |
| --- | --- | --- | --- |
| 管理后台 | 高 | 表格可扫视、状态色清晰、批量操作、多页签 | 低装饰：`saas` `flat` `m3` `fluent` `darktech` |
| SaaS 工作台 | 中高 | 键盘优先（⌘K）、拖拽、多栏布局 | `darktech` `saas` `min` |
| 官网 / 落地页 | 低 | 首屏 5 秒讲清价值、明确 CTA、社会证明 | 表现力强：`aurora` `bento` `glasslight` `brutal` `min` |
| 电商 | 中 | 价格醒目、促销氛围、加购路径短 | `flat` `clay` `guochao` |
| 文档站 | 中 | 三栏布局、代码块、搜索 | `saas` `min` `darktech` |
| App | 中低 | 触控热区 ≥ 44pt、拇指区放主操作、遵循平台规范 | `ios` `m3` `glasslight` `clay` |
| 小程序 | 中 | 不遮挡右上角胶囊、首屏金刚区与活动入口 | `flat` `clay` `guochao` |
| 数据大屏 | 中 | 远距离可读、深色、动态数据 | `hud` `darktech` |

## 三、按调性关键词

| 用户说的词 | 倾向风格 |
| --- | --- |
| 专业、可信、稳重 | `saas` `min` `fluent` |
| 高级、质感、精致 | `min` `lux` `glasslight` `editorial` |
| 科技感、未来感 | `darktech` `aurora` `glass` `glasslight` `hud` |
| 年轻、潮、有个性 | `brutal` `y2k` `memphis` `cyber` |
| 可爱、亲和、温暖 | `clay` `hand` `memphis` |
| 简洁、干净 | `min` `flat` `saas` |
| 中国风、国潮、传统 | `guochao` |
| 复古、怀旧 | `pixel` `skeuo` `swiss` `bauhaus` `y2k` |
| 极客、硬核 | `terminal` `darktech` `blueprint` |

## 四、常见混搭（主风格 + 点缀）

- `saas` + `aurora` 首屏：B 端产品官网，后台保持克制，官网首屏有记忆点
- `darktech` + `bento`：AI / 开发者产品官网的功能介绍区
- `min` + `editorial`：品牌故事页、长文内容
- `flat` + `clay` 图标：面向年轻用户的工具类 App
- `guochao` + `flat`：节日活动页，活动区国潮，交易流程扁平
