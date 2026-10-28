<!-- 自动生成，请勿手改：node scripts/build.mjs（数据源：网站 js/ 目录） -->
# 动效库

缓动、时长与 76 种常用动效。在线演示与精确提示词：https://itxd.github.io/wd-ui/#motion

## 动效令牌

```css
:root {
  --duration-fast: 150ms;   /* 悬停、按下、颜色变化 */
  --duration-base: 250ms;   /* 开关、下拉、复选 */
  --duration-slow: 400ms;   /* 对话框、抽屉、页面转场 */
  --ease-out: cubic-bezier(.22, 1, .36, 1);      /* 进入，最常用 */
  --ease-in: cubic-bezier(.55, 0, 1, .45);       /* 离开 */
  --ease-in-out: cubic-bezier(.65, 0, .35, 1);   /* 位置移动 */
  --ease-spring: cubic-bezier(.34, 1.56, .64, 1); /* 弹窗、按钮回弹 */
}
```

## 缓动曲线

| 名称 | 写法 | 用途 |
| --- | --- | --- |
| 线性 | `linear` | 匀速，机械感。只用于旋转、进度条（linear） |
| 缓入缓出（默认） | `ease` | 浏览器默认值（ease） |
| 缓入 | `cubic-bezier(.55,0,1,.45)` | 先慢后快。用于元素离开（ease-in） |
| 缓出 | `cubic-bezier(.22,1,.36,1)` | 先快后慢。用于元素进入，最常用（ease-out） |
| 缓入缓出 | `cubic-bezier(.65,0,.35,1)` | 两端慢中间快。用于位置移动（ease-in-out） |
| 回弹 | `cubic-bezier(.34,1.56,.64,1)` | 冲过头再回来。用于弹窗、按钮（back-out） |
| 弹簧 | `@keyframes 多段衰减` | 多次衰减振荡。用于拖拽释放、物理感（spring） |
| 阶跃 | `steps(6)` | 逐帧跳动。用于像素动画、打字（steps(6)） |

## 微交互

| 中文 | English | 实现 | 触发 |
| --- | --- | --- | --- |
| 悬停上浮 | Hover Lift | `translateY + shadow` | 悬停 |
| 按压缩放 | Press Scale | `:active { scale(.94) }` | 点击 |
| 波纹 | Ripple | `JS 定位 + scale` | 点击 |
| 光泽扫过 | Shine Sweep | `伪元素 translateX` | 悬停 |
| 磁吸按钮 | Magnetic | `JS 跟随鼠标偏移` | 悬停 |
| 流光边框 | Border Beam | `@property + conic-gradient` | 自动 |
| 下划线生长 | Underline Grow | `scaleX + transform-origin` | 悬停 |
| 背景填充 | Fill Slide | `background-size 过渡` | 悬停 |
| 图标位移 | Icon Nudge | `translateX` | 悬停 |
| 呼吸发光 | Glow Pulse | `box-shadow 关键帧` | 自动 |
| 3D 倾斜 | Tilt Card | `rotateX/Y + perspective` | 悬停 |
| 聚光灯 | Spotlight | `radial-gradient 跟随鼠标` | 悬停 |
| 翻转卡片 | Flip Card | `rotateY + backface-visibility` | 悬停 |
| 点赞爆发 | Like Burst | `scale + 粒子扩散` | 点击 |
| 汉堡菜单变形 | Hamburger Morph | `rotate + translate` | 点击 |
| 日夜开关 | Day / Night Toggle | `transform + 背景过渡` | 点击 |
| 勾选描绘 | Checkbox Draw | `stroke-dashoffset` | 点击 |
| 复制反馈 | Copy → Check | `图标交叉淡入` | 点击 |
| 抖动报错 | Shake Error | `translateX 关键帧` | 点击 |
| 按钮状态变形 | Button Morph | `width + border-radius` | 点击 |
| 数字滚动 | Odometer | `translateY 数字列` | 点击 |
| 果冻弹跳 | Jelly / Rubber Band | `scale(x,y) 关键帧` | 悬停 |

## 加载

环形 Ring、双环 Dual Ring、跳动三点 Bouncing Dots、呼吸点 Pulse Dots、音频条 Bars、轨道 Orbit、方块翻转 Flip Square、波纹扩散 Ripple、描边环 Stroke Ring、渐变旋转 Conic Spinner、网格闪烁 Grid Fade、顶部进度条 Top Progress

## 入场

淡入 Fade In、上滑淡入 Fade Up、侧滑入 Slide In、缩放入 Zoom In、模糊入 Blur In、翻转入 Flip In、弹入 Bounce In、旋转入 Rotate In、裁切揭示 Clip Reveal、圆形揭示 Circle Reveal、弹性缩放 Elastic、掉落 Drop In

## 转场

| 中文 | English | 实现 | 触发 |
| --- | --- | --- | --- |
| 交错进场 | Stagger | `animation-delay 递增` | 进入视野 |
| 页面转场 | Page Transition | `Fade / Push / Zoom / Cover` | 点击 |
| 共享元素展开 | Shared Element (FLIP) | `First-Last-Invert-Play` | 点击 |
| 高度自适应展开 | Height Auto | `grid-template-rows 0fr→1fr` | 点击 |
| 列表增删 | List Add / Remove | `展开 + 淡出折叠` | 点击 |

## 滚动驱动

| 中文 | English | 实现 | 触发 |
| --- | --- | --- | --- |
| 滚动显现 | Scroll Reveal | `IntersectionObserver` | 滚动 |
| 视差滚动 | Parallax | `不同层不同速度` | 滚动 |
| 吸顶收缩 | Sticky Shrink Header | `scroll 事件 + class` | 滚动 |
| 阅读进度条 | Reading Progress | `scrollTop / scrollHeight` | 滚动 |
| 跑马灯 | Marquee | `translateX 无限循环` | 自动 |
| 滚动吸附 | Scroll Snap | `scroll-snap-type` | 滚动 |

## 文字

| 中文 | English | 实现 | 触发 |
| --- | --- | --- | --- |
| 打字机 | Typewriter | `JS 逐字 + 光标闪烁` | 自动 |
| 文字解码 | Text Scramble | `JS 随机字符替换` | 悬停 |
| 渐变流光文字 | Gradient Text | `background-clip: text` | 自动 |
| 逐字波浪 | Letter Wave | `逐字 animation-delay` | 自动 |
| 马克笔高亮 | Highlighter | `background-size 0→100%` | 悬停 |
| 文字轮播 | Rotating Words | `translateY 关键帧` | 自动 |
| 故障文字 | Glitch | `clip-path + 偏移` | 自动 |
| 描边填充 | Stroke → Fill | `-webkit-text-stroke + clip` | 悬停 |

## 背景与氛围

| 中文 | English | 实现 | 触发 |
| --- | --- | --- | --- |
| 极光背景 | Aurora | `blur + 漂移关键帧` | 自动 |
| 网格流光 | Grid Beam | `渐变线条位移` | 自动 |
| 粒子连线 | Particles | `Canvas 2D` | 自动 |
| 流体形变 | Morphing Blob | `border-radius 关键帧` | 自动 |
| 波浪 | Waves | `SVG + translateX` | 自动 |
| 雷达扫描 | Radar Sweep | `conic-gradient 旋转` | 自动 |
| 星空闪烁 | Starfield | `opacity 随机延迟` | 自动 |
| 流动渐变 | Gradient Flow | `background-position 循环` | 自动 |

## 拖拽与手势

| 中文 | English | 实现 | 触发 |
| --- | --- | --- | --- |
| 拖拽排序 | Sortable List | `HTML5 Drag & Drop` | 拖动 |
| 卡片滑动 | Swipe Cards | `Pointer 事件 + 旋转` | 拖动 |
| 弹性拖拽 | Elastic Drag | `松手弹簧回位` | 拖动 |

## 原则

- 进入用缓出，离开用缓入；多数界面动效 150–400ms
- 只对 transform / opacity / filter 做动画
- 尊重 prefers-reduced-motion
