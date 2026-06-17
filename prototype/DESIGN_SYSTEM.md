# LaughterBox 设计系统规范

## 版本：v5.9.0
## 更新日期：2026-06-10

---

## 目录

1. [设计原则](#1-设计原则)
2. [色彩系统](#2-色彩系统)
3. [字体系统](#3-字体系统)
4. [间距与布局](#4-间距与布局)
5. [图标系统](#5-图标系统)
6. [动效系统](#6-动效系统)
7. [组件库规范](#7-组件库规范)
8. [交互标准](#8-交互标准)

---

## 1. 设计原则

### 1.1 核心价值

| 原则 | 描述 | 实践 |
|------|------|------|
| **极简** | 去除一切不必要的元素 | 只保留核心内容，零干扰 |
| **聚焦** | 用户注意力放在笑话内容上 | 卡片居中，大面积留白 |
| **流畅** | 每一个交互都有即时反馈 | 动画时长 0.2-0.4s |
| **一致** | 保持跨平台体验统一 | 单一数据源，多端适配 |

### 1.2 设计语言

- **风格定位**：现代极简主义，带有温暖的情感化元素
- **情感调性**：轻松、幽默、亲切
- **视觉隐喻**：星形 Logo 象征快乐与惊喜

---

## 2. 色彩系统

### 2.1 语义化色彩

```css
:root {
  /* 浅色主题 */
  --bg-primary: #fafafa;           /* 页面背景 */
  --bg-card: #ffffff;              /* 卡片背景 */
  --bg-overlay: rgba(255,255,255,0.9); /* 毛玻璃遮罩 */

  --text-primary: #171717;         /* 主要文字 */
  --text-secondary: #525252;        /* 次要文字 */
  --text-muted: #a3a3a3;           /* 辅助文字 */

  --border-default: rgba(229,229,229,0.5);  /* 默认边框 */
  --border-strong: rgba(229,229,229,0.8);   /* 强调边框 */

  --shadow-sm: 0 2px 8px rgba(0,0,0,0.04);   /* 浅阴影 */
  --shadow-md: 0 8px 30px rgba(0,0,0,0.04);  /* 中阴影 */
  --shadow-lg: 0 12px 40px rgba(0,0,0,0.08); /* 深阴影 */

  /* 功能色 */
  --color-favorite: #ef4444;        /* 收藏红 */
  --color-autoplay: #3b82f6;       /* 自动播放蓝 */
  --color-success: #22c55e;         /* 成功绿 */
  --color-warning: #eab308;         /* 警告黄 */

  /* 主题过渡 */
  --transition-theme: background 0.3s ease, color 0.3s ease;
}

:root.dark {
  --bg-primary: #030303;
  --bg-card: #171717;
  --bg-overlay: rgba(3,3,3,0.9);

  --text-primary: #fafafa;
  --text-secondary: #d4d4d4;
  --text-muted: #737373;

  --border-default: rgba(38,38,38,0.5);
  --border-strong: rgba(38,38,38,0.8);

  --shadow-sm: 0 2px 8px rgba(0,0,0,0.15);
  --shadow-md: 0 8px 30px rgba(0,0,0,0.2);
  --shadow-lg: 0 12px 40px rgba(0,0,0,0.3);
}
```

### 2.2 色彩应用规范

| 场景 | 浅色模式 | 深色模式 | 用途 |
|------|----------|----------|------|
| 页面背景 | `#fafafa` | `#030303` | 全局背景 |
| 卡片背景 | `#ffffff` | `#171717` | 笑话卡片、按钮 |
| 主要文字 | `#171717` | `#fafafa` | 标题、重要内容 |
| 次要文字 | `#525252` | `#d4d4d4` | 按钮图标 |
| 辅助文字 | `#a3a3a3` | `#737373` | 索引数字、版本号 |
| 收藏激活 | `#ef4444` | `#ef4444` | 心形图标填充 |
| 自动播放激活 | `#3b82f6` | `#3b82f6` | 播放按钮激活态 |
| Toast 成功 | `#22c55e` | `#22c55e` | 复制成功提示 |

### 2.3 阴影层级

| 层级 | CSS 值 | 用途 |
|------|--------|------|
| `shadow-sm` | `0 2px 8px rgba(0,0,0,0.04)` | 按钮悬停、输入框 |
| `shadow-md` | `0 8px 30px rgba(0,0,0,0.04)` | 卡片默认状态 |
| `shadow-lg` | `0 12px 40px rgba(0,0,0,0.08)` | 卡片悬停状态 |

---

## 3. 字体系统

### 3.1 字体家族

```css
/* 中文优先字体栈 */
--font-family-base: 'Noto Serif SC', 'Source Han Serif CN', serif;

/* 数字/代码字体 */
--font-family-mono: 'Courier New', 'SF Mono', monospace;

/* 系统回退 */
--font-family-fallback: -apple-system, BlinkMacSystemFont, 'Segoe UI', sans-serif;
```

### 3.2 字体规格

| 元素 | 字号 | 字重 | 行高 | 字间距 | 用途 |
|------|------|------|------|--------|------|
| 品牌名称 | 18px / 20px | 600 | 1.2 | 0 | Header Logo |
| 笑话正文 | 24px-36px | 300 | 1.6-1.9 | -0.025em | 主内容区 |
| 索引数字 | 12px | 400 | 1 | 0.1em | 计数显示 |
| 版本徽章 | 12px | 400 | 1 | 0.1em | 底部信息 |

### 3.3 响应式字体

```css
.joke-text {
  font-size: 1.5rem;    /* 默认 <640px */
  line-height: 1.6;
  letter-spacing: -0.025em;
}

@media (min-width: 640px) {
  .joke-text {
    font-size: 1.75rem;
    line-height: 1.7;
  }
}

@media (min-width: 768px) {
  .joke-text {
    font-size: 2rem;
    line-height: 1.8;
  }
}

@media (min-width: 1024px) {
  .joke-text {
    font-size: 2.25rem;
    line-height: 1.9;
  }
}
```

---

## 4. 间距与布局

### 4.1 间距系统

```css
/* 基础间距单位 */
--space-1: 0.25rem;   /* 4px */
--space-2: 0.5rem;    /* 8px */
--space-3: 0.75rem;    /* 12px */
--space-4: 1rem;       /* 16px */
--space-5: 1.25rem;    /* 20px */
--space-6: 1.5rem;     /* 24px */
--space-8: 2rem;       /* 32px */
--space-10: 2.5rem;    /* 40px */
--space-12: 3rem;      /* 48px */
--space-16: 4rem;      /* 64px */

/* 组件专用间距 */
--nav-gap: 1rem;        /* 导航按钮间距 */
--card-padding: 2rem-4rem; /* 卡片内边距 */
--section-gap: 2.5rem;  /* 主区域间距 */
```

### 4.2 布局规范

| 容器 | 最大宽度 | 内边距 | 断点 |
|------|----------|--------|------|
| Header | 72rem (1152px) | 16px / 32px | mobile/desktop |
| Main Content | 48rem-64rem | 16px-96px | mobile/tablet/desktop |
| Joke Card | 48rem-64rem | 32px-64px | mobile/tablet/desktop |

### 4.3 响应式断点

```css
/* 移动优先 */
/* 默认: <640px */
/* sm: 640px */
/* md: 768px */
/* lg: 1024px */
/* xl: 1280px */

@media (min-width: 640px) { /* sm */ }
@media (min-width: 768px) { /* md */ }
@media (min-width: 1024px) { /* lg */ }
```

---

## 5. 图标系统

### 5.1 图标库

使用 **Lucide Icons** 作为主要图标库，遵循以下规则：

- 所有图标使用 `stroke` 填充，非 `fill`
- `stroke-width: 2`
- `stroke-linecap: round`
- `stroke-linejoin: round`

### 5.2 图标尺寸

| 上下文 | 尺寸 | 说明 |
|--------|------|------|
| Header Logo | 20px / 24px | 品牌图标 |
| 主题切换 | 16px | Sun/Moon |
| 导航按钮 | 24px / 28px | prev/next/random |
| 次要按钮 | 21.6px | favorite/copy/share |
| Toast 图标 | 16px | 成功提示勾选 |

### 5.3 自定义 SVG 图标

#### 品牌星形图标
```svg
<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
  <path d="M12 3l1.912 5.813a2 2 0 0 0 1.275 1.275L21 12l-5.813 1.912a2 2 0 0 0-1.275 1.275L12 21l-1.912-5.813a2 2 0 0 0-1.275-1.275L3 12l5.813-1.912a2 2 0 0 0 1.275-1.275L12 3z"/>
  <path d="M5 3l2 4"/>
  <path d="M19 3l-2 4"/>
  <path d="M5 21l2 4"/>
  <path d="M19 21l-2 4"/>
</svg>
```

#### 引号装饰
```svg
<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor">
  <path d="M14.017 21v-7.391c0-5.704 3.731-9.57 8.983-10.609l.995 2.151c-2.432.917-3.995 3.638-3.995 5.849h4v10h-9.983zm-14.017 0v-7.391c0-5.704 3.748-9.57 9-10.609l.996 2.151c-2.433.917-3.996 3.638-3.996 5.849h3.983v10h-9.983z"/>
</svg>
```

---

## 6. 动效系统

### 6.1 动画时长

| 动画类型 | 时长 | 缓动函数 |
|----------|------|----------|
| 主题切换 | 0.3s | `ease` |
| 按钮悬停 | 0.2s | `ease` |
| 卡片切换 | 0.4s | `cubic-bezier(0.34, 1.56, 0.64, 1)` |
| Toast 出现 | 0.3s | `cubic-bezier(0.34, 1.56, 0.64, 1)` |
| 心跳动画 | 0.5s | `ease` |

### 6.2 关键帧动画

```css
/* 淡入动画 */
@keyframes fadeIn {
  from {
    opacity: 0;
    transform: translateY(10px);
  }
  to {
    opacity: 1;
    transform: translateY(0);
  }
}

/* 左滑动画 */
@keyframes slideInLeft {
  from {
    opacity: 0;
    transform: translateX(50px);
  }
  to {
    opacity: 1;
    transform: translateX(0);
  }
}

/* 右滑动画 */
@keyframes slideInRight {
  from {
    opacity: 0;
    transform: translateX(-50px);
  }
  to {
    opacity: 1;
    transform: translateX(0);
  }
}

/* 缩放动画 */
@keyframes scaleIn {
  from {
    opacity: 0;
    transform: scale(0.95);
  }
  to {
    opacity: 1;
    transform: scale(1);
  }
}

/* 心跳动画 */
@keyframes heartBeat {
  0%, 100% { transform: scale(1); }
  25% { transform: scale(1.3); }
  50% { transform: scale(0.95); }
  75% { transform: scale(1.15); }
}
```

### 6.3 交互反馈

| 交互 | 效果 |
|------|------|
| 按钮悬停 | `translateY(-2px)` + 阴影加深 |
| 按钮按下 | `scale(0.92)` + 阴影减弱 |
| 卡片拖拽 | 拖拽时 `cursor: grabbing` |
| 收藏激活 | 心形填充 + heartBeat 动画 |
| 复制成功 | Toast 滑入显示 2s 后消失 |

---

## 7. 组件库规范

### 7.1 基础组件

#### Button 按钮

**变体**：
- `nav-btn` - 圆形导航按钮
- `secondary-btn` - 次要操作按钮

**状态**：
| 状态 | 样式变化 |
|------|----------|
| Default | 背景色 `--bg-card`，阴影 `--shadow-md` |
| Hover | 背景微亮，`translateY(-2px)`，阴影加深 |
| Active | `scale(0.92)`，`translateY(0)` |
| Disabled | `opacity: 0.5`，`cursor: not-allowed` |
| Loading | 显示 Spinner，禁用点击 |

**尺寸**：
| 尺寸 | 尺寸 | 用途 |
|------|------|------|
| small | 56px / 64px | 上一页/下一页 |
| large | 64px / 80px | 随机按钮 |

#### Card 卡片

**结构**：
```html
<div class="joke-card">
  <div class="quote-decoration top-left">...</div>
  <div class="joke-content">
    <p class="joke-text">笑话内容</p>
    <div class="joke-index-container">索引</div>
  </div>
  <div class="quote-decoration bottom-right">...</div>
</div>
```

**状态**：
| 状态 | 样式 |
|------|------|
| Default | 阴影 `--shadow-md`，圆角 24px |
| Hover | 阴影 `--shadow-lg` |
| Dragging | `cursor: grabbing` |

#### Toast 提示

**状态**：
| 类型 | 背景色 | 用途 |
|------|--------|------|
| Success | `#22c55e` | 复制成功 |
| Error | `#ef4444` | 操作失败 |
| Info | `#3b82f6` | 提示信息 |

---

### 7.2 复合组件

#### NavigationControls 导航控制

**结构**：
```html
<div class="nav-controls">
  <div class="main-buttons">
    <!-- 上一个 -->
    <button class="nav-btn small">...</button>
    <!-- 随机 -->
    <button class="nav-btn large">...</button>
    <!-- 下一个 -->
    <button class="nav-btn small">...</button>
  </div>
  <div class="secondary-buttons">
    <!-- 自动播放 -->
    <button class="secondary-btn autoplay">...</button>
    <!-- 收藏 -->
    <button class="secondary-btn favorite">...</button>
    <!-- 复制 -->
    <button class="secondary-btn">...</button>
    <!-- 分享 -->
    <button class="secondary-btn">...</button>
  </div>
</div>
```

#### ThemeToggle 主题切换

**状态**：
| 状态 | 样式 |
|------|------|
| Light | 显示 Sun 图标 |
| Dark | 显示 Moon 图标 |

---

### 7.3 业务组件

#### JokeCard 笑话卡片

**Props**：
| Prop | 类型 | 默认值 | 说明 |
|------|------|--------|------|
| `joke` | string | required | 笑话内容 |
| `index` | number | required | 当前索引 |
| `total` | number | required | 总数 |
| `isFavorite` | boolean | false | 是否收藏 |
| `onFavorite` | function | - | 收藏回调 |

#### NavigationControls 导航控制

**Props**：
| Prop | 类型 | 默认值 | 说明 |
|------|------|--------|------|
| `onPrev` | function | required | 上一条回调 |
| `onNext` | function | required | 下一条回调 |
| `onRandom` | function | required | 随机回调 |
| `onFavorite` | function | - | 收藏回调 |
| `onCopy` | function | - | 复制回调 |
| `onShare` | function | - | 分享回调 |
| `isFavorite` | boolean | false | 收藏状态 |
| `isAutoplay` | boolean | false | 自动播放状态 |
| `onAutoplay` | function | - | 自动播放回调 |

---

### 7.4 组件使用规则

1. **组合优先**：使用现有组件组合，而非自定义 markup
2. **语义化**：使用正确的 HTML 元素和 ARIA 标签
3. **可访问性**：所有交互元素必须有 `aria-label`
4. **一致性**：相同类型的交互使用相同的动画和反馈

---

## 8. 交互标准

### 8.1 交互模式库

| 操作 | 触发方式 | 反馈 |
|------|----------|------|
| 切换笑话 | 点击 prev/next/random 按钮 | 卡片滑动 + 文字淡入 |
| 拖拽切换 | 水平拖拽卡片 >50px | 卡片跟随拖拽方向 |
| 收藏 | 点击心形按钮 | 心形填充 + 心跳动画 |
| 复制 | 点击复制按钮 | Toast 显示 2 秒 |
| 分享 | 点击分享按钮 | 调用系统分享或复制 |
| 主题切换 | 点击主题按钮 | 图标旋转 + 颜色过渡 |
| 自动播放 | 点击播放按钮 | 按钮变色 + 30s 自动切换 |

### 8.2 交互反馈规范

#### 即时反馈
- 按钮点击：10ms 内视觉反馈
- 拖拽：实时位置更新
- 键盘：立即响应

#### 延迟反馈
- API 调用：显示加载状态
- Toast：300ms 后出现
- 动画完成前禁用重复触发

### 8.3 错误处理规范

| 错误类型 | 处理方式 |
|----------|----------|
| 复制失败 | Console error，不显示 Toast |
| 分享失败 | 回退到复制到剪贴板 |
| 加载失败 | 显示重试按钮 |
| 网络错误 | 显示错误提示 + 重试选项 |

### 8.4 空状态设计规范

```css
/* 空状态样式 */
.empty-state {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  gap: var(--space-4);
  padding: var(--space-8);
  color: var(--text-muted);
}

.empty-state svg {
  width: 48px;
  height: 48px;
  opacity: 0.5;
}

.empty-state p {
  font-size: 0.875rem;
  text-align: center;
}
```

---

## 附录

### A. 设计令牌汇总

```css
:root {
  /* 颜色 */
  --bg-primary: #fafafa;
  --bg-card: #ffffff;
  --text-primary: #171717;
  --text-secondary: #525252;
  --text-muted: #a3a3a3;
  --color-favorite: #ef4444;
  --color-autoplay: #3b82f6;
  --color-success: #22c55e;

  /* 阴影 */
  --shadow-sm: 0 2px 8px rgba(0,0,0,0.04);
  --shadow-md: 0 8px 30px rgba(0,0,0,0.04);
  --shadow-lg: 0 12px 40px rgba(0,0,0,0.08);

  /* 间距 */
  --space-4: 1rem;
  --space-6: 1.5rem;
  --space-8: 2rem;

  /* 动画 */
  --duration-fast: 0.2s;
  --duration-normal: 0.3s;
  --duration-slow: 0.4s;
  --ease-bounce: cubic-bezier(0.34, 1.56, 0.64, 1);

  /* 圆角 */
  --radius-sm: 0.375rem;
  --radius-md: 0.75rem;
  --radius-lg: 1.5rem;
  --radius-full: 9999px;
}
```

### B. 版本历史

| 版本 | 日期 | 更新内容 |
|------|------|----------|
| v5.9.0 | 2026-06-10 | 完善设计系统规范文档 |
| v5.8.0 | 2026-06-01 | 初始设计系统定义 |
