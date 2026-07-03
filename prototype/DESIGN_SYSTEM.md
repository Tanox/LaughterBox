# LaughterBox 设计系统 (Design System) v6.1.0

> 极简、克制、专注内容。以"留白"为核心，以"可读"为目标。
> 参考实现：`app/globals.css`、`prototype/prototype.html`、`components/ui/*`

---

## 1. 设计理念 / Design Principles

| 原则 | 说明 | 实现 |
| --- | --- | --- |
| **极简 (Minimal)** | 只保留最必要的元素，界面即内容 | 去除所有多余装饰，仅保留一个核心卡片 |
| **可读 (Readable)** | 字号优先于装饰 | 使用衬线字体 + 大字号呈现笑话主体 |
| **克制 (Restraint)** | 色彩与动效都不喧宾夺主 | 中性灰阶主题 + 低对比阴影 |
| **响应式 (Responsive)** | 从手机到大屏完美呈现 | 基于 Tailwind 断点的流式布局 |
| **可访问 (Accessible)** | 兼顾键盘、屏幕阅读器用户 | 完整 aria-label、语义化标签、焦点环 |

### 核心视觉隐喻
- **一张白纸 / 一本书** —— 用户翻开一个故事
- **一个符号** —— 引号 `“”` 作为唯一的装饰元素
- **一次交互** —— 左右滑动 = 上下一则笑话

---

## 2. 色彩系统 / Color Palette

### 2.1 主色与语义色
| Token | 亮色 (Hex) | 暗色 (Hex) | 用途 |
| --- | --- | --- | --- |
| `--color-background` | `#ffffff` | `#0a0a0a` | 页面最底层背景 |
| `--color-card` | `#ffffff` | `#171717` | 内容卡片背景 |
| `--color-foreground` | `#171717` | `#fafafa` | 正文文字 |
| `--color-muted` | `#f5f5f5` | `#262626` | 次级背景 / 禁用态 |
| `--color-muted-foreground` | `#737373` | `#a3a3a3` | 次要文字、提示文字 |
| `--color-border` | `#e5e5e5` | `#262626` | 分割线、边框 |
| `--color-ring` | `#171717` | `#fafafa` | 键盘聚焦指示 |
| `--color-success` | `#22c55e` | `#16a34a` | 成功反馈（复制成功） |
| `--color-destructive` | `#ef4444` | `#991b1b` | 错误/危险（收藏按钮） |
| `--color-info` | `#3b82f6` | `#2563eb` | 中性操作（自动播放） |
| `--color-warning` | `#eab308` | `#ca8a04` | 警告提示 |

### 2.2 色彩使用规则
- **仅用中性灰**作为主色，避免彩色干扰阅读
- **仅在交互反馈**中使用语义色（收藏→红、复制成功→绿、自动播放→蓝）
- 亮色模式使用 **硬阴影**；暗色模式使用 **柔和发光阴影**
- 深色模式对比度 ≥ 4.5:1（WCAG AA 正文标准）

---

## 3. 字体与排版 / Typography

### 3.1 字体栈
```
正文 (UI): ui-sans-serif, system-ui, -apple-system, "Segoe UI", Roboto
内容 (Joke): "Noto Serif SC", ui-serif, Georgia, Cambria, "Times New Roman"
等宽 (Index): ui-monospace, SFMono-Regular, Menlo, Monaco, Consolas
```

### 3.2 字号与行高
| 用途 | 字号 (Base) | 大屏 (>1024px) | 行高 |
| --- | --- | --- | --- |
| 笑话正文 (核心) | 1.5rem (24px) | 2.25rem (36px) | 1.65 – 1.8 |
| 品牌名称 (Header) | 0.875rem (14px) | 0.875rem | 1 |
| 索引编号 (001/100) | 0.6875rem (11px) | 0.6875rem | 1 |
| Toast 提示 | 0.875rem (14px) | 0.875rem | 1.2 |
| 页脚说明 | 0.75rem (12px) | 0.75rem | 1.2 |

### 3.3 字重与字距
- 正文：font-weight **300-400**（细-正常，强化"极简"感）
- UI：font-weight **500**（中等，清晰可读）
- 字母间距/字距微收紧：`-0.025em`
- 索引编号：`tracking-widest` (0.1em) + 全大写/数字

---

## 4. 间距与布局 / Spacing & Layout

### 4.1 间距系统（基于 4px 基准）
| 名称 | 尺寸 | 用途 |
| --- | --- | --- |
| `xs` | 4px | 紧凑元素间距 |
| `sm` | 8px | 按钮内边距小 |
| `md` | 16px | 标准间距 |
| `lg` | 24px | 较大间距 |
| `xl` | 32px | 卡片内边距 |
| `2xl` | 48px | 大卡片内边距（桌面） |
| `3xl` | 64px | 超大卡片内边距（大屏） |

### 4.2 布局模板
```
┌─────────────────────────────────────────────┐
│  Header (Sticky, 高度自适应)               │
├─────────────────────────────────────────────┤
│                                             │
│         ┌─────────────────────┐           │
│         │                     │           │
│         │      Joke Card      │           │
│         │  (居中, 最大 48-64rem)          │
│         │                     │           │
│         └─────────────────────┘           │
│                                             │
│         ┌───┐   ┌────┐  ┌───┐   主按钮  │
│         │ ◀ │   │ 🔀 │  │ ▶ │             │
│         └───┘   └────┘  └───┘             │
│                                             │
│         ▶  ❤  📋  <share>    次按钮       │
│                                             │
├─────────────────────────────────────────────┤
│  Footer (可选, 极简)                        │
└─────────────────────────────────────────────┘
```

### 4.3 响应式断点
| 断点 | 前缀 | 范围 | 内容变化 |
| --- | --- | --- | --- |
| Base | — | < 640px | 紧凑, 按钮 44x44 (触摸最小) |
| `sm` | `sm:` | ≥ 640px | 卡片内边距增加 |
| `md` | `md:` | ≥ 768px | 卡片高度 480px, 字号加大 |
| `lg` | `lg:` | ≥ 1024px | 容器最大宽度 64rem |
| `xl` | `xl:` | ≥ 1280px | 进一步留白 |

---

## 5. 组件库 / Component Library

### 5.1 Button (按钮)
**文件**: `components/ui/button.tsx`

**变体 (Variants)**:
| Variant | 外观 | 用途 |
| --- | --- | --- |
| `default` | 黑底白字胶囊按钮 | 主操作 |
| `secondary` | 灰底黑字 | 次操作 |
| `ghost` | 透明背景 | 图标式次要操作 |
| `outline` | 边框 + 透明背景 | 次要选择 |
| `destructive` | 红色背景 | 删除/警告操作 |
| `icon-round` | 圆形, 阴影, 悬浮上移 | 笑话导航 ◀ 🔀 ▶ |
| `icon-ghost` | 透明图标按钮 | 自动播放/收藏/复制/分享 |

**Sizes**:
| Size | 尺寸 | 图标尺寸 |
| --- | --- | --- |
| `default` | h-10 px-4 | 标准 |
| `sm` | h-9 px-3 | — |
| `icon` | h-10 w-10 | 标准 |
| `icon-xs` | h-11 w-11 | 次级按钮 |
| `icon-sm` | h-14 w-14 (md:h-16 w-16) | 导航按钮 |
| `icon-lg` | h-16 w-16 (md:h-20 w-20) | 主随机按钮 |

**交互动效**:
- Hover: `translateY(-2px)` + 阴影加深 (0 → 8px/20px)
- Active: `scale(0.95)` + 阴影减弱
- 收藏按钮激活时：`heartBeat` 0.5s

### 5.2 Card (卡片)
**文件**: `components/ui/card.tsx`

**核心属性**:
- 圆角: `rounded-3xl` (1.5rem)
- 阴影: `0 8px 30px rgb(0,0,0,0.04)` (hover 升级)
- 背景: `var(--color-card)` (白色 / 深灰 #171717)
- 最小高度: 350px (md:480px)
- 布局: `flex flex-col items-center justify-center`

**子组件**:
- `CardHeader` / `CardTitle` / `CardDescription` (文本卡片变体)
- `CardContent` / `CardFooter` (操作区变体)

### 5.3 Joke Card (笑话卡片 - 业务组件)
**文件**: `app/components/joke-card.tsx`

**特征**:
- 引号装饰 SVG (左上 & 右下，10% 透明度)
- 居中大字号衬线文字
- 底部索引编号 (`001 / 1008`), 使用等宽字体
- Framer Motion 动画: `fadeIn` 或 `slideInLeft/Right`
- 支持水平拖拽 (`drag="x"` + 弹性反馈)

**动画时间线**:
| 阶段 | 时长 | 效果 |
| --- | --- | --- |
| Enter | 400ms | opacity 0→1, scale 0.95→1, x ±50px → 0 |
| Hold | 用户停留 | 静止 |
| Exit | 400ms | 与 Enter 反向 |
| Easing | `[0.34, 1.56, 0.64, 1]` | 微弹性 |

### 5.4 Navigation Controls (导航控制 - 业务组件)
**文件**: `app/components/navigation-controls.tsx`

**构成**:
- 三个圆形主按钮: ◀ / 🔀 / ▶
- 四个圆形图标次按钮: ▶/⏸ / ❤ / 📋 / <share>
- 操作区居中，主按钮放大以强调随机浏览

### 5.5 Toast (提示组件)
**文件**: `components/ui/toast.tsx`

**特征**:
- 位置：固定在屏幕顶部中央
- 外观：胶囊形状，圆角，带阴影
- 颜色：success → 绿色，error → 红色，info → 中性深色
- 进入动画：`slideInUp` 0.3s cubic-bezier(0.34, 1.56, 0.64, 1)
- 显示时间：2000ms 后自动消失
- 内容：单行简短文本 (`已复制到剪贴板`)

### 5.6 Theme Toggle (主题切换按钮)
**文件**: `app/components/theme-toggle.tsx`

**交互**:
- 默认为太阳图标 (亮色模式)
- 切换后旋转 + 透明度交叉淡入变为月亮图标 (暗色模式)
- 跟随系统默认 (next-themes `attribute: class`)

---

## 6. 图标系统 / Iconography

### 6.1 图标来源
- **库**: `lucide-react` (24x24, 2px stroke)
- **SVG 自定义**: 引号装饰使用内联 SVG

### 6.2 图标使用规范
| 图标 | 用途 | 颜色 | 尺寸 |
| --- | --- | --- | --- |
| ChevronLeft | 上一则笑话 | `currentColor` | 24px |
| ChevronRight | 下一则笑话 | `currentColor` | 24px |
| Shuffle | 随机浏览 | `currentColor` | 24px |
| Heart | 收藏/取消收藏 | 激活时 `--color-destructive`，填充 | 24px |
| Copy | 复制到剪贴板 | 中性 | 24px |
| Share-2 | 分享 | 中性 | 24px |
| Play | 自动播放开启 | 激活时 `--color-info` | 24px |
| Pause | 自动播放暂停 | 激活时 `--color-info` | 24px |
| Sun / Moon | 主题切换 | `currentColor` | 20px |

### 6.3 图标规则
- 图标 stroke 统一为 `2.25px`（略粗，提升可读性）
- 收藏激活时使用 `fill="currentColor"`（填充心）
- 图标颜色始终跟随 `currentColor`，由外层按钮统一管理
- 禁止使用带颜色的图标，以确保主题一致性

---

## 7. 动效系统 / Motion

### 7.1 动画原则
- **克制**：每次仅一个元素动画，避免眼花缭乱
- **有意义**：动画暗示操作结果（左滑→新笑话从左进入）
- **快速响应**：动画时长 ≤ 400ms
- **微弹性**：使用 `[0.34, 1.56, 0.64, 1]` cubic-bezier

### 7.2 动画清单
| 动画名 | 时长 | 缓动 | 触发 |
| --- | --- | --- | --- |
| `fadeIn` | 400ms | ease | 初次加载、内容变化 |
| `slideInLeft` | 400ms | 微弹性 | 点击下一个 / 右拖结束 |
| `slideInRight` | 400ms | 微弹性 | 点击上一个 / 左拖结束 |
| `scaleIn` | 400ms | 微弹性 | 随机浏览 |
| `heartBeat` | 500ms | ease | 首次收藏 |
| `slideInUp (Toast)` | 300ms | 微弹性 | 操作反馈 |

### 7.3 使用的库
- **Framer Motion (motion/react)**: 笑话卡片的进入/退出、拖动手势
- **CSS Keyframes**: 次要动画（心跳、淡入、Toast 进入）
- **Tailwind Transition**: 按钮 hover/active

---

## 8. 交互标准 / Interaction Standards

### 8.1 交互模式库
| 操作 | 手势 | 键盘 | 快捷键 |
| --- | --- | --- | --- |
| 上一则笑话 | 右滑卡片、点击 ◀ | `ArrowLeft` | `←` |
| 下一则笑话 | 左滑卡片、点击 ▶ | `ArrowRight` | `→` |
| 随机笑话 | 点击 🔀 按钮 | `Space` / `R` | `␣` `R` |
| 收藏/取消收藏 | 点击 ❤ 按钮 | `F` | `F` |
| 复制文本 | 点击 📋 按钮 | `C` | `C` |
| 自动播放切换 | 点击 ▶/⏸ 按钮 | — | — |
| 切换主题 | 点击 🌙/☀ 按钮 | — | — |
| 分享 | 点击 📤 按钮 | — | — |

### 8.2 交互反馈规范
| 阶段 | 视觉反馈 | 时机 |
| --- | --- | --- |
| Hover | 轻微上移 (2px) + 阴影增强 | 即时 |
| Active (按下) | 缩小至 95% + 阴影减弱 | 即时 |
| 成功操作 | 图标状态变化 + Toast | 即时 |
| 错误操作 | Toast 红色提示 | 即时 |
| 长按 (拖拽) | 跟随手指位移 (弹性 0.3×) | 持续 |

### 8.3 错误处理规范
| 错误类型 | 处理方式 | UI 表现 |
| --- | --- | --- |
| 剪贴板权限拒绝 | 降级到 `document.execCommand('copy')` | Toast: "复制失败，请重试" |
| 分享 API 不支持 | 降级到"复制文本" | Toast: "已复制到剪贴板" |
| 网络/资源加载失败 | 静默处理，不打断用户体验 | Skeleton 占位 |

### 8.4 空状态设计
| 场景 | 显示内容 | 备注 |
| --- | --- | --- |
| 加载中 | 占位卡片 (`bg-muted` + Skeleton) | 高度与实际卡片一致 |
| 没有笑话数据 | 居中显示 "暂无内容" + 灰色引号装饰 | 极少出现 |
| 收藏列表为空 | 空状态图标 + "暂无收藏" | (未来功能) |

---

## 9. 阴影与圆角 / Elevation

### 9.1 阴影系统
| Token | 值 | 用途 |
| --- | --- | --- |
| `Card` (默认) | `0 8px 30px rgb(0 0 0 / 4%)` | 内容卡片 |
| `Card` (Hover) | `0 12px 40px rgb(0 0 0 / 8%)` | 卡片悬停 |
| `Card` (暗色) | `0 8px 30px rgb(0 0 0 / 20%)` | 暗色模式 |
| `Button Round` | `0 8px 30px rgb(0 0 0 / 4%)` | 圆形按钮 |
| `Button Hover` | `0 8px 20px rgb(0 0 0 / 10%)` | 圆形按钮悬停 |
| `Toast Success` | `0 8px 24px rgb(34 197 94 / 40%)` | 成功提示 |
| `Toast Error` | `0 8px 24px rgb(239 68 68 / 40%)` | 错误提示 |

### 9.2 圆角规范
| 元素 | 圆角 | 说明 |
| --- | --- | --- |
| 内容卡片 | `rounded-3xl` (1.5rem) | 柔和的圆角 |
| 圆形按钮 | `rounded-full` (9999px) | 完美圆形 |
| Toast | `rounded-full` | 胶囊形状 |
| 图标按钮 | `rounded-full` | 完美圆形 |

---

## 10. 可访问性 / Accessibility

### 10.1 A11y 要点
- **语义化 HTML**: 使用 `<main>`, `<header>`, `<footer>`, `<button>` 等原生标签
- **aria-label**: 所有图标按钮必须标注（如"上一个笑话"）
- **焦点管理**: 按钮默认焦点环 + `focus-visible` 伪类
- **键盘可达**: 所有主要操作支持键盘（方向键、空格、字母键）
- **颜色对比度**: 正文 ≥ 4.5:1 (AA), 大号文字 ≥ 3:1
- **触摸目标**: 最小 44×44 px (移动端交互按钮)
- **动画尊重**: 尊重 `prefers-reduced-motion`（可配置关闭动画）

### 10.2 屏幕阅读器流程
1. 进入页面 → 焦点位置: "随机笑话"按钮（主操作）
2. 阅读内容 → Tab 切换到不同操作按钮
3. 每次操作后 → Toast 提示 (使用 `role="status"` + `aria-live="polite"`)

---

## 11. 暗黑模式 / Dark Mode

### 11.1 实现方式
- **库**: `next-themes`
- **属性**: `attribute: class`（HTML 根节点添加 `.dark` 类）
- **默认值**: `system`（跟随操作系统设置）
- **变量切换**: CSS 自定义属性在 `.dark` 类下重定义

### 11.2 视觉特征
- **温暖的深灰**: `#0a0a0a` (背景) vs `#171717` (卡片)
- **柔和的光晕**: 卡片阴影 `rgb(0 0 0 / 0.20)` 而非硬阴影
- **白色文字**: `#fafafa` (近白，避免刺眼纯白)
- **图标微妙发光**: 悬停时轻微放大，无颜色变化

---

## 12. 组件文件索引

| 文件 | 类型 | 说明 |
| --- | --- | --- |
| `components.json` | 配置 | shadcn/ui 组件配置 |
| `components/ui/button.tsx` | 基础组件 | 按钮系统 (8 variants, 6 sizes) |
| `components/ui/card.tsx` | 基础组件 | 卡片 (5 sub-components) |
| `components/ui/toast.tsx` | 复合组件 | Toast 通知系统 |
| `app/components/joke-card.tsx` | 业务组件 | 笑话展示卡片 |
| `app/components/navigation-controls.tsx` | 业务组件 | 导航 + 操作按钮组 |
| `app/components/theme-toggle.tsx` | 业务组件 | 主题切换 |
| `app/components/theme-provider.tsx` | 基础设施 | 主题 Provider |
| `app/globals.css` | 样式 | 设计令牌 (CSS variables) |
| `lib/utils.ts` | 工具 | `cn()` 类名合并工具 |

---

## 13. 设计与代码对齐指南

所有 UI 组件均采用 **shadcn/ui** 风格：
- 使用 **CSS 变量** 而非直接颜色值（便于主题与品牌定制）
- 使用 **Tailwind 原子类** 而非自定义 CSS（便于维护与一致性）
- 使用 **`cn()` 工具函数** 合并条件类名
- 使用 **`cva` (class-variance-authority)** 管理变体

> 若需自定义主题，只需修改 `app/globals.css` 中的 CSS 变量值，所有组件将自动同步。

---

## 14. 更新记录

| 版本 | 日期 | 变更 |
| --- | --- | --- |
| v6.1.0 | 2026-07-03 | 代码审查修复，拆分大文件，对齐原型字号与行高 |
| v6.0.0 | 2026-06-19 | 引入 shadcn/ui 风格；重建设计系统；新增 Toast、Card、Button 基础组件；重写原型 |
| v5.9.0 | — | 早期版本（纯 Tailwind 原子类） |
