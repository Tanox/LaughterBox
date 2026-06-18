# LaughterBox 组件规范文档

## 1. 概述

本文档详细定义 LaughterBox 项目中所有 React 组件的设计规范、接口定义、状态管理、样式规范和使用示例。

## 2. 组件清单

| 组件名 | 文件名 | 版本 | 类型 | 状态 |
|-------|-------|------|------|------|
| Page | app/page.tsx | v5.9.0 | 页面组件 | ✅ 核心 |
| ThemeProvider | app/components/theme-provider.tsx | v4.0.0 | 上下文提供者 | ✅ 核心 |
| ThemeToggle | app/components/theme-toggle.tsx | v5.3.2 | UI 组件 | ✅ 核心 |
| JokeCard | app/components/joke-card.tsx | v4.0.0 | UI 组件 | ✅ 核心 |
| NavigationControls | app/components/navigation-controls.tsx | v5.8.0 | UI 组件 | ✅ 核心 |

## 3. Page 组件 (主页面)

### 3.1 基本信息

| 属性 | 值 |
|-----|-----|
| 文件路径 | app/page.tsx |
| 组件名 | Page |
| 版本 | v5.9.0 |
| 类型 | 客户端组件 (`"use client"`) |
| 导出方式 | 默认导出 |
| 依赖 | React、Motion、Lucide React、JOKES_DATA |

### 3.2 接口定义

```typescript
export default function Page(): JSX.Element;
```

### 3.3 状态管理

| 状态名 | 类型 | 初始值 | 用途 |
|-------|------|-------|------|
| jokes | string[] | JOKES_DATA | 笑话数据（只读） |
| currentIndex | number | 0 | 当前展示笑话的索引 |
| mounted | boolean | false | 客户端挂载标志（水合错误预防） |
| direction | number | 0 | 动画方向（-1: 左，0: 随机，1: 右） |

### 3.4 回调函数

#### handleRandom()

随机切换到不同的笑话。

```typescript
const handleRandom = useCallback(() => {
  if (jokes.length <= 1) return;
  setDirection(0);
  setCurrentIndex((prev) => {
    let nextIndex = prev;
    while (nextIndex === prev) {
      nextIndex = Math.floor(Math.random() * jokes.length);
    }
    return nextIndex;
  });
}, [jokes.length]);
```

**特性**：
- 确保不会选中与当前相同的笑话
- 当笑话数量 ≤ 1 时不执行任何操作
- 使用 useCallback 优化性能

#### handleNext()

切换到下一条笑话（循环）。

```typescript
const handleNext = useCallback(() => {
  if (jokes.length <= 1) return;
  setDirection(1);
  setCurrentIndex((prev) => (prev + 1) % jokes.length);
}, [jokes.length]);
```

#### handlePrev()

切换到上一条笑话（循环）。

```typescript
const handlePrev = useCallback(() => {
  if (jokes.length <= 1) return;
  setDirection(-1);
  setCurrentIndex((prev) => (prev - 1 + jokes.length) % jokes.length);
}, [jokes.length]);
```

### 3.5 生命周期

```typescript
useEffect(() => {
  const timer = setTimeout(() => {
    setMounted(true);
    if (JOKES_DATA.length > 0) {
      setCurrentIndex(Math.floor(Math.random() * JOKES_DATA.length));
    } else {
      setCurrentIndex(0);
    }
  }, 0);
  return () => clearTimeout(timer);
}, []);
```

**职责**：
- 延迟设置 mounted 状态为 true（水合错误预防）
- 随机初始化笑话索引
- 使用 setTimeout 确保在客户端执行

### 3.6 渲染结构

```tsx
<div id="page-wrapper">
  {/* 导航栏 */}
  <header id="main-header">
    <div id="header-content">
      {/* 品牌标识 - 自定义 SVG 星形图案 */}
      <div id="brand-logo">
        <svg className="star-icon">
          {/* 星形图案 SVG */}
        </svg>
        <h1>LaughterBox</h1>
      </div>
      {/* 主题切换按钮 */}
      <ThemeToggle />
    </div>
  </header>

  {/* 主内容区 */}
  <main id="main-content">
    <div id="joke-viewer-container">
      {/* 笑话展示区域 */}
      <AnimatePresence mode="wait" custom={direction}>
        {mounted && (
          <motion.div
            key={currentIndex}
            drag="x"
            dragConstraints={{ left: 0, right: 0 }}
            dragElastic={0.7}
            onDragEnd={(e, { offset }) => {
              if (offset.x < -50) handleNext();
              else if (offset.x > 50) handlePrev();
            }}
            custom={direction}
            variants={variants}
            initial="initial"
            animate="animate"
            exit="exit"
            transition={transition}
          >
            {/* 装饰性引号 - 自定义 SVG */}
            <svg className="quote-decoration rotate-180" />
            
            {/* 笑话文本 */}
            <p id="joke-text">
              {jokes.length > 0 ? jokes[currentIndex] : "暂无笑话"}
            </p>
            
            {/* 索引指示器 */}
            {jokes.length > 0 && (
              <div id="joke-index">
                <span>{String(currentIndex + 1).padStart(3, "0")}</span>
                <span>/</span>
                <span>{jokes.length}</span>
              </div>
            )}
            
            {/* 右下角装饰性引号 - 自定义 SVG */}
            <svg className="quote-decoration opacity-10" />
          </motion.div>
        )}
      </AnimatePresence>

      {/* 导航控制区 */}
      <div id="nav-controls">
        <button
          id="btn-random"
          onClick={handleRandom}
          disabled={jokes.length <= 1}
        >
          <Shuffle />
        </button>
      </div>
    </div>
  </main>
</div>
```

### 3.7 动画配置

#### 变体 (Variants)

```typescript
const variants = {
  initial: (dir: number) => ({
    opacity: 0,
    scale: 0.98,
    x: dir === 0 ? 0 : dir * 50,
    y: dir === 0 ? 10 : 0,
  }),
  animate: {
    opacity: 1,
    scale: 1,
    x: 0,
    y: 0,
  },
  exit: (dir: number) => ({
    opacity: 0,
    scale: 0.98,
    x: dir === 0 ? 0 : dir * -50,
    y: dir === 0 ? -10 : 0,
  }),
};
```

#### 过渡 (Transition)

```typescript
const transition = {
  duration: 0.4,
  ease: [0.34, 1.56, 0.64, 1], // 弹性缓和曲线
};
```

### 3.8 使用示例

```tsx
// 在 app/layout.tsx 中直接使用
import Page from './page';

export default function RootLayout({ children }) {
  return (
    <html lang="zh-CN">
      <body>
        <Page />
      </body>
    </html>
  );
}
```

---

## 4. ThemeProvider 组件

### 4.1 基本信息

| 属性 | 值 |
|-----|-----|
| 文件路径 | app/components/theme-provider.tsx |
| 组件名 | ThemeProvider |
| 版本 | v4.0.0 |
| 类型 | 客户端组件 |
| 导出方式 | 命名导出 |
| 依赖 | next-themes |

### 4.2 接口定义

```typescript
import { ThemeProvider as NextThemesProvider } from "next-themes";

export function ThemeProvider(props: React.ComponentProps<typeof NextThemesProvider>): JSX.Element;
```

### 4.3 Props 说明

继承自 `next-themes` 的 ThemeProvider Props。

| Prop | 类型 | 默认值 | 说明 |
|-----|------|-------|------|
| children | ReactNode | 必填 | 子组件 |
| attribute | string | "class" | 主题应用方式（class 或 data-theme） |
| defaultTheme | string | "system" | 默认主题 |
| enableSystem | boolean | true | 启用系统主题 |
| disableTransitionOnChange | boolean | false | 切换主题时禁用过渡 |

### 4.4 实现代码

```tsx
"use client";

import { ThemeProvider as NextThemesProvider } from "next-themes";

export function ThemeProvider({ children, ...props }: React.ComponentProps<typeof NextThemesProvider>) {
  return <NextThemesProvider {...props}>{children}</NextThemesProvider>;
}
```

### 4.5 使用示例

```tsx
// 在 app/layout.tsx 中
import { ThemeProvider } from "@/app/components/theme-provider";

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="zh-CN" suppressHydrationWarning>
      <body>
        <ThemeProvider
          attribute="class"
          defaultTheme="system"
          enableSystem
          disableTransitionOnChange
        >
          {children}
        </ThemeProvider>
      </body>
    </html>
  );
}
```

---

## 5. ThemeToggle 组件

### 5.1 基本信息

| 属性 | 值 |
|-----|-----|
| 文件路径 | app/components/theme-toggle.tsx |
| 组件名 | ThemeToggle |
| 版本 | v5.3.2 |
| 类型 | 客户端组件 |
| 导出方式 | 命名导出 |
| 依赖 | next-themes、Lucide React |

### 5.2 接口定义

```typescript
export function ThemeToggle(): JSX.Element;
```

### 5.3 状态管理

| 状态名 | 类型 | 初始值 | 用途 |
|-------|------|-------|------|
| mounted | boolean | false | 客户端挂载标志（水合错误预防） |

### 5.4 核心逻辑

```typescript
const { setTheme, resolvedTheme } = useTheme();
const [mounted, setMounted] = useState(false);

// 延迟挂载，防止水合错误
useEffect(() => {
  setMounted(true);
}, []);

// 挂载前返回占位符
if (!mounted) {
  return (
    <div className="h-9 w-9 rounded-md border border-neutral-200 bg-white dark:border-neutral-800 dark:bg-neutral-950" />
  );
}
```

### 5.5 渲染结构

```tsx
<button
  id="btn-theme-toggle"
  onClick={() => setTheme(resolvedTheme === "light" ? "dark" : "light")}
>
  {/* 太阳图标（浅色模式显示） */}
  <Sun className="h-4 w-4 rotate-0 scale-100 transition-all dark:-rotate-90 dark:scale-0" />
  
  {/* 月亮图标（深色模式显示） */}
  <Moon className="absolute h-4 w-4 rotate-90 scale-0 transition-all dark:rotate-0 dark:scale-100" />
  
  {/* 屏幕阅读器文本 */}
  <span className="sr-only">切换主题</span>
</button>
```

### 5.6 样式规范

| 元素 | 浅色模式 | 深色模式 |
|-----|---------|---------|
| 按钮尺寸 | h-9 w-9 | 相同 |
| 背景色 | bg-white | bg-neutral-950 |
| 边框色 | border-neutral-200 | border-neutral-800 |
| 悬停背景 | hover:bg-neutral-100 | dark:hover:bg-neutral-800 |
| 圆角 | rounded-md | 相同 |

### 5.7 使用示例

```tsx
import { ThemeToggle } from "@/app/components/theme-toggle";

export default function Header() {
  return (
    <header>
      <div className="flex items-center justify-between">
        <h1>My App</h1>
        <ThemeToggle />
      </div>
    </header>
  );
}
```

---

## 6. JokeCard 组件 (备用)

### 6.1 基本信息

| 属性 | 值 |
|-----|-----|
| 文件路径 | app/components/joke-card.tsx |
| 组件名 | JokeCard |
| 版本 | v4.0.0 |
| 类型 | 客户端组件 |
| 导出方式 | 命名导出 |
| 状态 | ✅ 核心组件 |

### 6.2 接口定义

```typescript
interface JokeCardProps {
  content: string;
  index: number;
}

export function JokeCard({ content, index }: JokeCardProps): JSX.Element;
```

### 6.3 Props 说明

| Prop | 类型 | 必填 | 说明 |
|-----|------|-----|------|
| content | string | 是 | 笑话文本内容 |
| index | number | 是 | 笑话索引（从 0 开始） |

### 6.4 状态管理

| 状态名 | 类型 | 初始值 | 用途 |
|-------|------|-------|------|
| copied | boolean | false | 复制状态提示 |

### 6.5 核心功能

#### 复制到剪贴板

```typescript
const handleCopy = async () => {
  try {
    await navigator.clipboard.writeText(content);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  } catch (err) {
    console.error("Failed to copy text: ", err);
  }
};
```

### 6.6 渲染结构

```tsx
<motion.div
  id={`joke-card-${index}`}
  initial={{ opacity: 0, y: 10 }}
  animate={{ opacity: 1, y: 0 }}
  transition={{ duration: 0.3, delay: index * 0.03 }}
>
  {/* 笑话文本 */}
  <p id={`joke-text-${index}`}>
    {content}
  </p>
  
  {/* 页脚区域 */}
  <div id={`joke-footer-${index}`}>
    {/* 索引显示 */}
    <span id={`joke-index-${index}`}>
      #{index + 1}
    </span>
    
    {/* 复制按钮 */}
    <button id={`btn-copy-${index}`} onClick={handleCopy}>
      {copied ? <Check /> : <Copy />}
    </button>
  </div>
</motion.div>
```

### 6.7 使用示例

```tsx
import { JokeCard } from "@/app/components/joke-card";
import { JOKES_DATA } from "@/app/lib/jokes-data";

export default function JokesList() {
  return (
    <div className="grid gap-4">
      {JOKES_DATA.map((joke, index) => (
        <JokeCard key={index} content={joke} index={index} />
      ))}
    </div>
  );
}
```

---

## 7. NavigationControls 组件

### 7.1 基本信息

| 属性 | 值 |
|-----|-----|
| 文件路径 | app/components/navigation-controls.tsx |
| 组件名 | NavigationControls |
| 版本 | v5.8.0 |
| 类型 | 客户端组件 |
| 导出方式 | 命名导出 |
| 依赖 | Lucide React、React |

### 7.2 接口定义

```typescript
interface NavigationControlsProps {
  onRandom: () => void;
  onPrev: () => void;
  onNext: () => void;
  onToggleFavorite: () => void;
  isFavorite: boolean;
  jokeText: string;
  autoPlay: boolean;
  onToggleAutoPlay: () => void;
}

export function NavigationControls({ 
  onRandom, 
  onPrev, 
  onNext, 
  onToggleFavorite,
  isFavorite,
  jokeText,
  autoPlay,
  onToggleAutoPlay
}: NavigationControlsProps): JSX.Element;
```

### 7.3 Props 说明

| Prop | 类型 | 必填 | 说明 |
|-----|------|------|------|
| onRandom | () => void | 是 | 随机切换笑话的回调函数 |
| onPrev | () => void | 是 | 切换到上一条笑话的回调函数 |
| onNext | () => void | 是 | 切换到下一条笑话的回调函数 |
| onToggleFavorite | () => void | 是 | 切换收藏状态的回调函数 |
| isFavorite | boolean | 是 | 当前笑话是否已收藏 |
| jokeText | string | 是 | 当前笑话文本内容（用于复制和分享） |
| autoPlay | boolean | 是 | 是否启用自动播放 |
| onToggleAutoPlay | () => void | 是 | 切换自动播放状态的回调函数 |

### 7.3 状态管理

| 状态名 | 类型 | 初始值 | 用途 |
|-------|------|-------|------|
| copied | boolean | false | 复制成功提示 |
| showToast | boolean | false | Toast 通知显示状态 |
| heartAnimating | boolean | false | 收藏心跳动画触发 |

### 7.5 核心功能

#### handleCopy()

将当前笑话文本复制到剪贴板并显示 Toast 通知。

```typescript
const handleCopy = async () => {
  try {
    await navigator.clipboard.writeText(jokeText);
    setCopied(true);
    setShowToast(true);
    setTimeout(() => {
      setCopied(false);
      setShowToast(false);
    }, 2000);
  } catch (e) {
    console.error('Failed to copy', e);
  }
};
```

#### handleToggleFavorite()

切换收藏状态，触发心跳动画。

```typescript
const handleToggleFavorite = () => {
  if (!isFavorite) {
    setHeartAnimating(true);
    setTimeout(() => setHeartAnimating(false), 500);
  }
  onToggleFavorite();
};
```

#### handleShare()

使用 Web Share API 分享当前笑话，如果不支持则回退到复制功能。

```typescript
const handleShare = async () => {
  if (navigator.share) {
    try {
      await navigator.share({
        title: 'LaughterBox',
        text: jokeText,
        url: window.location.href
      });
    } catch (e) {
      console.error('Failed to share', e);
    }
  } else {
    handleCopy();
  }
};
```

### 7.6 渲染结构

```tsx
<div id="nav-controls" className="mt-10 flex flex-col items-center gap-4 md:mt-12">
  <div className="flex items-center gap-4">
    <button id="btn-prev" onClick={onPrev} aria-label="上一个">
      <ChevronLeft />
    </button>
    <button id="btn-random" onClick={onRandom} aria-label="随机">
      <Shuffle />
    </button>
    <button id="btn-next" onClick={onNext} aria-label="下一个">
      <ChevronRight />
    </button>
  </div>
  
  <div className="flex items-center gap-3">
    <button id="btn-autoplay" onClick={onToggleAutoPlay} aria-label={autoPlay ? '暂停自动播放' : '开始自动播放'}>
      {autoPlay ? <Pause /> : <Play />}
    </button>
    <button id="btn-favorite" onClick={handleToggleFavorite} aria-label={isFavorite ? '取消收藏' : '收藏'}>
      <Heart className={isFavorite ? 'fill-current animate-heartBeat' : ''} />
    </button>
    <button id="btn-copy" onClick={handleCopy} aria-label="复制">
      {copied ? <Check /> : <Copy />}
    </button>
    <button id="btn-share" onClick={handleShare} aria-label="分享">
      <Share2 />
    </button>
  </div>
</div>

{/* Toast 通知 */}
<div id="copied-toast" className="fixed top-8 left-1/2 -translate-x-1/2 ...">
  <Check />
  已复制到剪贴板
</div>
```

### 7.7 使用示例

```tsx
import { NavigationControls } from "@/app/components/navigation-controls";

export default function JokeViewer() {
  const handleRandom = () => console.log('Random clicked');
  const handlePrev = () => console.log('Prev clicked');
  const handleNext = () => console.log('Next clicked');
  const handleToggleFavorite = () => console.log('Toggle favorite');
  const handleToggleAutoPlay = () => console.log('Toggle autoplay');

  return (
    <NavigationControls
      onRandom={handleRandom}
      onPrev={handlePrev}
      onNext={handleNext}
      onToggleFavorite={handleToggleFavorite}
      isFavorite={false}
      jokeText="这是一条笑话"
      autoPlay={false}
      onToggleAutoPlay={handleToggleAutoPlay}
    />
  );
}
```

---

## 9. 组件设计原则

### 9.1 设计规范

1. **单一职责原则**：每个组件只负责一个明确的功能
2. **接口清晰**：使用 TypeScript 接口明确定义 Props
3. **可访问性**：提供适当的 ARIA 标签和语义化 HTML
4. **响应式设计**：确保在各种屏幕尺寸上正常显示
5. **深色模式**：使用 Tailwind CSS 的 dark: 前缀支持

### 9.2 命名规范

#### 9.2.1 文件命名

- 组件文件：PascalCase（如 ThemeToggle.tsx）
- Hook 文件：camelCase（如 use-favorites.ts）
- 数据文件：kebab-case（如 jokes-data.ts）

#### 9.2.2 组件命名

- 组件名：PascalCase（如 ThemeToggle）
- 导出的函数组件：PascalCase
- 默认导出：PascalCase

#### 9.2.3 ID 命名规范

| 元素类型 | 命名格式 | 示例 |
|---------|---------|------|
| 页面容器 | {name}-wrapper | page-wrapper |
| 主要区域 | main-{name} | main-header, main-content |
| 按钮 | btn-{name} | btn-random, btn-theme-toggle |
| 文本 | {name}-text | joke-text |
| 索引 | {name}-index | joke-index |
| 卡片 | {name}-card-{id} | joke-card-0 |

### 9.3 版本管理规范

每个组件文件的顶部应包含版本注释：

```typescript
// app/components/theme-toggle.tsx v5.3.2
```

版本升级规则：
- **主版本 (Major)**：破坏性 API 变更、重大架构调整
- **次版本 (Minor)**：新增功能、接口扩展
- **修订号 (Patch)**：Bug 修复、性能优化、文档更新

---

## 10. 附录

### 10.1 图标库

本项目使用 Lucide React 图标库和自定义 SVG：

| 图标名 | 用途 |
|-------|------|
| 星形图案 (自定义 SVG) | 品牌标识 |
| Shuffle | 随机按钮 |
| Sun | 浅色模式 |
| Moon | 深色模式 |
| Check | 复制成功 |
| Copy | 复制按钮 |
| Share2 | 分享按钮 |
| Play | 自动播放开始 |
| Pause | 自动播放暂停 |
| ChevronLeft | 上一个 |
| ChevronRight | 下一个 |
| Heart | 收藏 |

**注意**：引号装饰使用自定义 SVG，不依赖 Lucide React。

### 10.2 相关资源

- [React 官方文档](https://react.dev/)
- [Next.js App Router](https://nextjs.org/docs/app)
- [Motion 文档](https://motion.dev/docs)
- [Lucide React](https://lucide.dev/)

---

*本文档遵循 OpenSpec 规范 v1.0*
