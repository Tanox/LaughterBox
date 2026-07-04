# 完善所有页面代码开发 Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** 将主页面与高保真原型完全对齐（修复 11 项功能/无障碍/UI 偏差），并补全已搭建数据层但缺失 UI 的收藏页面，完成 LaughterBox 全部页面的代码开发。

**Architecture:** 本项目是单页 PWA 笑话应用（Next.js 15 App Router + React 19 + Tailwind v4 + Motion）。当前 `app/page.tsx` 主页已实现核心功能，但与 `prototype/prototype.html` 存在 11 项可量化偏差；同时 `useFavorites` Hook 已完整实现并导出 `favorites` 数组，但没有任何页面消费它（用户无法浏览收藏）。本计划分两阶段：阶段一（Task 1-3、5）对齐主页面与原型；阶段二（Task 4-5）补建收藏页面与主页入口。

**Tech Stack:** Next.js 15.4.9 (App Router)、React 19.2.1、TypeScript 5.9.3、Tailwind CSS 4.1.11、Motion 12.23.24、next-themes 0.4.6、lucide-react 0.553.0、shadcn/ui 风格组件。

---

## 范围说明 (Scope)

**包含（In Scope）：**
- 修复原型与实现之间的全部功能缺失（自动播放 Toast、版本标签）
- 修复全部无障碍偏差（JokeCard `role/aria`、NavigationControls `toolbar` 语义）
- 修复全部 UI/UX 细节偏差（拖拽阈值、卡片尺寸、副标题可见性、Header 模糊、Toast 图标、取消收藏颜色）
- 新建收藏页面 `app/favorites/page.tsx`，消费已就绪的 `useFavorites` Hook
- 在主页面 Header 添加收藏入口链接

**排除（Out of Scope，遵循 YAGNI）：**
- 搜索、分类筛选 UI、标签云、历史记录、统计页、设置页、关于页 —— 这些功能在 `openspec/spec.md` 和 `prototype/prototype.html` 中均未定义，尽管 `types.ts` 中有 `CATEGORIES`/`tags` 数据脚手架。新增它们属于新功能开发，不在"完善现有页面"范围内。

**验证策略说明：**
本项目 `package.json` 未配置单元测试框架（无 jest/vitest）。因此各任务验证采用：TypeScript 类型检查（`npx tsc --noEmit`）、ESLint（`npm run lint`）、生产构建（`npm run build`）三层验证，辅以手动浏览器检查。

**前置条件：**
- 当前分支为 `trae/solo-agent-Cku97F`（非 main/master），工作区干净。✅ 已确认。
- 依赖已安装（`node_modules` 存在）。

---

## File Structure

| 文件 | 操作 | 职责 |
|------|------|------|
| `app/components/joke-card.tsx` | 修改 | 添加无障碍属性；对齐卡片最小高度与内边距到原型 |
| `app/components/page-decorations.tsx` | 修改 | SkeletonCard 尺寸同步对齐 |
| `app/components/navigation-controls.tsx` | 修改 | 添加 toolbar 语义；版本标签；自动播放 Toast；取消收藏 Toast 颜色 |
| `app/components/ui/toast.tsx` | 修改 | 按 variant 渲染图标 |
| `app/favorites/page.tsx` | 新建 | 收藏列表页面，消费 useFavorites |
| `app/page.tsx` | 修改 | 拖拽阈值；副标题移动端可见；Header 模糊；收藏入口链接 |

---

## Task 1: JokeCard 与 SkeletonCard 对齐原型（无障碍 + 尺寸）

**Files:**
- Modify: `app/components/joke-card.tsx`
- Modify: `app/components/page-decorations.tsx`

**对齐项：** GAP-3（卡片无障碍属性）、DIFF-3（最小高度 350/450 → 360/480）、DIFF-8（内边距对齐原型 2rem/3rem）

- [ ] **Step 1: 为 JokeCard 的 motion.div 添加无障碍属性**

在 `app/components/joke-card.tsx` 中，给 `<motion.div>` 添加 `tabIndex={0}`、`role="region"`、`aria-label="笑话卡片"`（对齐原型 `prototype.html:261`）。

修改后的 `<motion.div>` 开标签：

```tsx
    <motion.div
      id={`joke-card-${joke.id}`}
      key={joke.id}
      custom={direction}
      drag="x"
      dragConstraints={{ left: 0, right: 0 }}
      dragElastic={0.7}
      onDragEnd={(_, info) => onDragEnd?.(info.offset)}
      initial="initial"
      animate="animate"
      exit="exit"
      variants={cardVariants}
      transition={cardTransition}
      tabIndex={0}
      role="region"
      aria-label="笑话卡片"
      className="touch-pan-y cursor-grab active:cursor-grabbing"
    >
```

- [ ] **Step 2: 对齐 JokeCard 的 Card 尺寸**

将 `Card` 的 `className` 从 `min-h-[350px] ... md:min-h-[450px] ... p-8 sm:p-12 md:p-16 lg:p-20` 改为 `min-h-[360px] ... md:min-h-[480px] ... p-8 md:p-12`（对齐原型 `prototype.html:95,105,98`：min-height 360/480px，padding 2rem/3rem）。

修改后的 `<Card>` 标签：

```tsx
      <Card
        className={cn(
          'relative flex min-h-[360px] flex-col items-center justify-center p-8 md:min-h-[480px] md:p-12'
        )}
      >
```

- [ ] **Step 3: 同步对齐 SkeletonCard 尺寸**

在 `app/components/page-decorations.tsx` 中，将 `SkeletonCard` 的 `className` 同步为 `min-h-[360px] ... md:min-h-[480px] ... p-8 md:p-12`，保持与 JokeCard 一致。

修改后的 `<div>` 标签：

```tsx
    <div
      aria-hidden="true"
      className="flex min-h-[360px] flex-col justify-center rounded-3xl bg-card p-8 shadow-[0_8px_30px_rgb(0,0,0,0.04)] dark:shadow-[0_8px_30px_rgb(0,0,0,0.20)] md:min-h-[480px] md:p-12"
    >
```

- [ ] **Step 4: 类型检查与 Lint 验证**

Run: `npx tsc --noEmit && npm run lint`
Expected: 无错误输出，退出码 0。

- [ ] **Step 5: 提交**

```bash
git add app/components/joke-card.tsx app/components/page-decorations.tsx
git commit -m "fix(joke-card): 对齐原型无障碍属性与卡片尺寸 (GAP-3, DIFF-3, DIFF-8)"
```

---

## Task 2: NavigationControls 对齐原型（toolbar 语义 + 版本标签 + 自动播放 Toast + 取消收藏颜色）

**Files:**
- Modify: `app/components/navigation-controls.tsx`

**对齐项：** GAP-1（自动播放 Toast）、GAP-2（版本标签）、GAP-4（toolbar 语义）、DIFF-7（取消收藏 Toast 颜色 info→success）

- [ ] **Step 1: 添加 toolbar 语义到外层容器**

将外层 `<div className="mt-10 flex flex-col items-center gap-5 md:mt-12">` 改为带 `role="toolbar" aria-label="导航控件"`（对齐原型 `prototype.html:280`）：

```tsx
    <div role="toolbar" aria-label="导航控件" className="mt-10 flex flex-col items-center gap-5 md:mt-12">
```

- [ ] **Step 2: 添加自动播放 Toast 反馈**

在组件内（`handleShare` 之后）新增 `handleAutoPlay` 回调，开启/停止时分别弹出 Toast（对齐原型 `prototype.html:561,568`）。`useCallback` 已在文件顶部导入。

新增代码（插入到 `handleShare` 的 `useCallback` 之后）：

```tsx
  const handleAutoPlay = useCallback(() => {
    if (autoPlay) {
      toast({ title: '已停止自动播放', variant: 'info', duration: 1500 })
    } else {
      toast({ title: '已开启自动播放', variant: 'info', duration: 1500 })
    }
    onToggleAutoPlay()
  }, [autoPlay, onToggleAutoPlay, toast])
```

- [ ] **Step 3: 将自动播放按钮 onClick 指向 handleAutoPlay**

将自动播放按钮的 `onClick={onToggleAutoPlay}` 改为 `onClick={handleAutoPlay}`：

```tsx
        <Button
          onClick={handleAutoPlay}
          variant="icon-ghost"
          size="icon-xs"
          aria-label={autoPlay ? '停止自动播放' : '开始自动播放'}
          className={autoPlay ? 'text-blue-500' : undefined}
        >
```

- [ ] **Step 4: 修正取消收藏 Toast 颜色为 success**

将 `handleToggleFavorite` 中取消收藏分支的 `variant: 'info'` 改为 `variant: 'success'`（对齐原型绿色样式 `prototype.html:193,499`）：

```tsx
    } else {
      toast({ title: '已取消收藏', variant: 'success', duration: 1500 })
    }
```

- [ ] **Step 5: 添加版本标签**

在次按钮组 `</div>` 之后、外层容器 `</div>` 之前，添加版本标签（对齐原型 `prototype.html:309`）：

```tsx
      </div>

      <div className="text-xs tracking-[0.15em] text-muted-foreground opacity-60">
        v6.1.0
      </div>
    </div>
```

- [ ] **Step 6: 类型检查与 Lint 验证**

Run: `npx tsc --noEmit && npm run lint`
Expected: 无错误输出，退出码 0。

- [ ] **Step 7: 提交**

```bash
git add app/components/navigation-controls.tsx
git commit -m "fix(nav-controls): 对齐原型 toolbar 语义/版本标签/自动播放 Toast/取消收藏颜色 (GAP-1,2,4 / DIFF-7)"
```

---

## Task 3: Toast 按 variant 渲染图标

**Files:**
- Modify: `app/components/ui/toast.tsx`

**对齐项：** GAP-5（Toast 缺少勾选图标，对齐原型 `prototype.html:319-322`）

- [ ] **Step 1: 导入 lucide 图标**

在 `app/components/ui/toast.tsx` 顶部 import 区添加（`cn` 已导入）：

```tsx
import { Check, X, Info } from 'lucide-react'
```

- [ ] **Step 2: 重写 ToastItemView 按 variant 渲染图标**

将 `ToastItemView` 函数替换为带图标的版本。每个 variant 对应一个图标（success→Check，error→X，info→Info）：

```tsx
function ToastItemView({ toast }: { toast: ToastItem }) {
  const variantConfig: Record<ToastVariant, { icon: React.ReactNode; style: string }> = {
    success: {
      icon: <Check className="h-4 w-4" strokeWidth={2.5} />,
      style: 'bg-green-500 text-white shadow-[0_8px_24px_rgba(34,197,94,0.4)]',
    },
    error: {
      icon: <X className="h-4 w-4" strokeWidth={2.5} />,
      style: 'bg-red-500 text-white shadow-[0_8px_24px_rgba(239,68,68,0.4)]',
    },
    info: {
      icon: <Info className="h-4 w-4" strokeWidth={2.5} />,
      style:
        'bg-neutral-900 text-white dark:bg-neutral-100 dark:text-neutral-900 shadow-[0_8px_24px_rgba(0,0,0,0.2)]',
    },
  }
  const config = variantConfig[toast.variant ?? 'info']
  return (
    <div
      role="status"
      aria-live="polite"
      className={cn(
        'pointer-events-auto flex items-center gap-2 rounded-full px-6 py-3 text-sm font-medium',
        config.style
      )}
    >
      {config.icon}
      <span>{toast.title}</span>
    </div>
  )
}
```

- [ ] **Step 3: 类型检查与 Lint 验证**

Run: `npx tsc --noEmit && npm run lint`
Expected: 无错误输出，退出码 0。

- [ ] **Step 4: 提交**

```bash
git add app/components/ui/toast.tsx
git commit -m "feat(toast): 按 variant 渲染图标对齐原型 (GAP-5)"
```

---

## Task 4: 新建收藏页面

**Files:**
- Create: `app/favorites/page.tsx`

**目的：** 消费已就绪的 `useFavorites` Hook（导出 `favorites`/`toggleFavorite`/`isLoaded`），让用户能浏览和管理收藏的笑话。对齐 DESIGN_SYSTEM.md 8.4 节"收藏列表为空"空状态设计。

- [ ] **Step 1: 创建收藏页面组件**

创建 `app/favorites/page.tsx`。该页面为客户端组件，复用 `useFavorites` Hook 读取/移除收藏，从 `JOKES_DATA_DEDUPED` 查找笑话内容，用 `CATEGORIES` 显示分类徽章。包含：返回链接、加载骨架、空状态、收藏列表（含移除按钮）。

完整文件内容：

```tsx
'use client'

// app/favorites/page.tsx v6.1.0

import { useMemo } from 'react'
import Link from 'next/link'
import { ArrowLeft, Heart, Trash2 } from 'lucide-react'
import { JOKES_DATA_DEDUPED } from '@/lib/jokes-data'
import { CATEGORIES } from '@/lib/types'
import { useFavorites } from '@/hooks/use-favorites'

const JOKES = JOKES_DATA_DEDUPED

export default function FavoritesPage() {
  const { favorites, toggleFavorite, isLoaded } = useFavorites()

  const categoryMap = useMemo(() => {
    const map = new Map<string, { name: string; emoji: string }>()
    for (const c of CATEGORIES) {
      map.set(c.id, { name: c.name, emoji: c.emoji })
    }
    return map
  }, [])

  const favoriteJokes = useMemo(() => {
    const favSet = new Set(favorites)
    return JOKES.filter((j) => favSet.has(j.id))
  }, [favorites])

  return (
    <div className="flex min-h-screen flex-col bg-background transition-colors duration-300">
      <header className="sticky top-0 z-10 border-b border-border/50 bg-background/90 backdrop-blur-md">
        <div className="mx-auto flex max-w-3xl items-center justify-between px-4 py-3 md:px-8">
          <Link
            href="/"
            className="inline-flex items-center gap-2 text-sm text-muted-foreground transition-colors hover:text-foreground"
            aria-label="返回首页"
          >
            <ArrowLeft className="h-4 w-4" strokeWidth={2.25} />
            返回
          </Link>
          <h1 className="flex items-center gap-2 text-sm font-semibold tracking-tight">
            <Heart className="h-4 w-4 fill-red-500 text-red-500" strokeWidth={2.25} />
            我的收藏
          </h1>
          <span className="text-xs text-muted-foreground">{favoriteJokes.length} 则</span>
        </div>
      </header>

      <main className="mx-auto w-full max-w-3xl flex-1 px-4 py-6 md:px-8 md:py-10">
        {!isLoaded ? (
          <div className="space-y-3">
            {[0, 1, 2].map((i) => (
              <div
                key={i}
                aria-hidden="true"
                className="h-20 animate-pulse rounded-2xl bg-muted dark:bg-neutral-800"
              />
            ))}
          </div>
        ) : favoriteJokes.length === 0 ? (
          <div className="flex flex-col items-center justify-center gap-4 py-24 text-center">
            <Heart className="h-12 w-12 text-muted-foreground/40" strokeWidth={1.5} />
            <p className="text-sm text-muted-foreground">还没有收藏任何笑话</p>
            <Link
              href="/"
              className="inline-flex items-center gap-2 rounded-full bg-primary px-5 py-2.5 text-sm font-medium text-primary-foreground transition-opacity hover:opacity-90"
            >
              去看看笑话
            </Link>
          </div>
        ) : (
          <ul className="space-y-3">
            {favoriteJokes.map((joke) => {
              const cat = categoryMap.get(joke.category)
              return (
                <li
                  key={joke.id}
                  className="flex items-start gap-3 rounded-2xl border border-border/50 bg-card p-4 shadow-[0_8px_30px_rgb(0,0,0,0.04)] dark:shadow-[0_8px_30px_rgb(0,0,0,0.20)]"
                >
                  <div className="flex-1">
                    <p className="font-serif text-base leading-relaxed text-foreground">
                      {joke.content}
                    </p>
                    {cat && (
                      <span className="mt-2 inline-flex items-center gap-1 text-xs text-muted-foreground">
                        <span aria-hidden="true">{cat.emoji}</span>
                        {cat.name}
                      </span>
                    )}
                  </div>
                  <button
                    onClick={() => toggleFavorite(joke.id)}
                    aria-label="取消收藏"
                    className="shrink-0 rounded-full p-2 text-muted-foreground transition-colors hover:bg-accent hover:text-red-500"
                  >
                    <Trash2 className="h-4 w-4" strokeWidth={2.25} />
                  </button>
                </li>
              )
            })}
          </ul>
        )}
      </main>
    </div>
  )
}
```

- [ ] **Step 2: 类型检查与 Lint 验证**

Run: `npx tsc --noEmit && npm run lint`
Expected: 无错误输出，退出码 0。

- [ ] **Step 3: 提交**

```bash
git add app/favorites/page.tsx
git commit -m "feat(favorites): 新建收藏列表页面，消费 useFavorites Hook"
```

---

## Task 5: 主页面对齐原型 + 收藏入口

**Files:**
- Modify: `app/page.tsx`

**对齐项：** DIFF-1（拖拽阈值 50→60）、DIFF-4（副标题移动端可见）、DIFF-5（Header backdrop-blur 8→12px）。同时添加收藏入口链接（指向 Task 4 新建的 `/favorites`）。

- [ ] **Step 1: 添加 Link 与 Heart 图标导入**

在 `app/page.tsx` 顶部 import 区，添加 `next/link` 与 `lucide-react` 的 `Heart`。在现有 import 之后插入：

```tsx
import Link from 'next/link'
import { Heart } from 'lucide-react'
```

- [ ] **Step 2: 从 useFavorites 解构 favorites**

将 `useFavorites` 调用改为同时解构 `favorites`（用于 Header 收藏计数）：

```tsx
  const { favorites, toggleFavorite, isFavorite, isLoaded: favoritesLoaded } = useFavorites()
```

- [ ] **Step 3: 修正拖拽阈值为 60px**

将 `handleDragEnd` 中的 `-50` / `50` 改为 `-60` / `60`（对齐原型 `prototype.html:627-628`）：

```tsx
  const handleDragEnd = useCallback(
    (offset: { x: number }) => {
      if (offset.x < -60) {
        handleNext()
      } else if (offset.x > 60) {
        handlePrev()
      }
    },
    [handleNext, handlePrev]
  )
```

- [ ] **Step 4: Header 添加 backdrop-blur-md 与收藏入口链接**

将 Header 的 `className` 中 `backdrop-blur` 改为 `backdrop-blur-md`（12px，对齐原型 `prototype.html:62`），并在 `<ThemeToggle />` 前添加收藏入口链接。注意收藏计数徽章需用 `mounted` 门控以避免水合不匹配。

修改后的 Header 区域：

```tsx
      <header
        id="main-header"
        className="sticky top-0 z-10 border-b border-border/50 bg-background/90 backdrop-blur-md"
      >
        <div className="mx-auto flex max-w-6xl items-center justify-between px-4 py-3 md:px-8">
          <div className="flex items-center gap-3">
            <div className="flex h-8 w-8 items-center justify-center rounded-xl bg-primary text-primary-foreground">
              <LogoIcon />
            </div>
            <div className="flex flex-col leading-tight">
              <span className="text-sm font-semibold tracking-tight">LaughterBox</span>
              <span className="text-[11px] text-muted-foreground">
                极简笑话收藏 · {JOKES_COUNT} 则
              </span>
            </div>
          </div>
          <div className="flex items-center gap-2">
            <Link
              href="/favorites"
              className="relative inline-flex h-9 w-9 items-center justify-center rounded-full text-muted-foreground transition-colors hover:text-foreground md:h-10 md:w-10"
              aria-label="我的收藏"
            >
              <Heart className="h-4 w-4 md:h-5 md:w-5" strokeWidth={2.25} />
              {mounted && favorites.length > 0 && (
                <span className="absolute -right-0.5 -top-0.5 flex h-4 min-w-4 items-center justify-center rounded-full bg-red-500 px-1 text-[10px] font-medium text-white">
                  {favorites.length}
                </span>
              )}
            </Link>
            <ThemeToggle />
          </div>
        </div>
      </header>
```

- [ ] **Step 5: 类型检查与 Lint 验证**

Run: `npx tsc --noEmit && npm run lint`
Expected: 无错误输出，退出码 0。

- [ ] **Step 6: 提交**

```bash
git add app/page.tsx
git commit -m "fix(page): 对齐原型拖拽阈值/副标题/模糊，新增收藏入口 (DIFF-1,4,5)"
```

---

## Task 6: 全量验证与文档同步

**Files:**
- Modify: `openspec/COMPONENT.md`
- Modify: `openspec/spec.md`

**目的：** 运行完整生产构建确认无回归；将规范文档中组件版本与新增收藏页同步到实际代码状态。

- [ ] **Step 1: 运行生产构建**

Run: `npm run build`
Expected: 构建成功，`✓ Compiled successfully`，无 TypeScript 错误，无 ESLint 错误。`/` 与 `/favorites` 路由均出现在路由清单中。

- [ ] **Step 2: 同步 COMPONENT.md 组件版本与收藏页**

在 `openspec/COMPONENT.md` 的组件清单表（第 2 节）中：
1. 将所有 `v6.0.0` 版本号更新为 `v6.1.0`（Page、ThemeProvider、ThemeToggle、JokeCard、NavigationControls、PageDecorations、Button、Card、Toast、useFavorites、useClipboard、clipboard）。
2. 新增一行收藏页组件：`| FavoritesPage | app/favorites/page.tsx | v6.1.0 | 页面组件 | ✅ 核心 |`

将组件清单表替换为：

```markdown
| 组件名 | 文件名 | 版本 | 类型 | 状态 |
|-------|-------|------|------|------|
| Page | app/page.tsx | v6.1.0 | 页面组件 | ✅ 核心 |
| FavoritesPage | app/favorites/page.tsx | v6.1.0 | 页面组件 | ✅ 核心 |
| ThemeProvider | app/components/theme-provider.tsx | v6.1.0 | 上下文提供者 | ✅ 核心 |
| ThemeToggle | app/components/theme-toggle.tsx | v6.1.0 | UI 组件 | ✅ 核心 |
| JokeCard | app/components/joke-card.tsx | v6.1.0 | UI 组件（shadcn Card） | ✅ 核心 |
| NavigationControls | app/components/navigation-controls.tsx | v6.1.0 | UI 组件（shadcn Button） | ✅ 核心 |
| PageDecorations | app/components/page-decorations.tsx | v6.1.0 | UI 组件（Logo、骨架屏） | ✅ 核心 |
| Button | components/ui/button.tsx | v6.1.0 | shadcn 基础组件 | ✅ 基础 |
| Card | components/ui/card.tsx | v6.1.0 | shadcn 基础组件 | ✅ 基础 |
| Toast | components/ui/toast.tsx | v6.1.0 | shadcn 反馈组件 | ✅ 基础 |
| useFavorites | app/hooks/use-favorites.ts | v6.1.0 | 自定义 Hook | ✅ 核心 |
| useClipboard | app/hooks/use-clipboard.ts | v6.1.0 | 自定义 Hook | ✅ 核心 |
| clipboard | app/lib/clipboard.ts | v6.1.0 | 工具函数 | ✅ 基础 |
```

- [ ] **Step 3: 同步 spec.md 项目版本与收藏页路由**

在 `openspec/spec.md` 中：
1. 将 1.1 节"当前版本"从 `v6.0.0` 改为 `v6.1.0`。
2. 在第 4 节目录结构的 `app/` 目录下，`page.tsx` 之后新增收藏页与 favorites 目录说明。
3. 在 9. 版本历史表顶部新增 v6.1.0 行（如已存在则保留）。

将 1.1 节版本行改为：

```markdown
| **当前版本** | v6.1.0 |
```

在目录结构的 `page.tsx` 行之后插入：

```markdown
│   ├── favorites/               # 收藏页面目录
│   │   └── page.tsx             # 收藏列表页面
```

- [ ] **Step 4: 提交文档同步**

```bash
git add openspec/COMPONENT.md openspec/spec.md
git commit -m "docs: 同步规范文档版本号与收藏页路由 (v6.1.0)"
```

- [ ] **Step 5: 推送到远程**

Run: `git push`
Expected: 推送成功，无冲突。

---

## Self-Review

**1. Spec 覆盖检查：**
- GAP-1 自动播放 Toast → Task 2 Step 2-3 ✅
- GAP-2 版本标签 → Task 2 Step 5 ✅
- GAP-3 JokeCard 无障碍 → Task 1 Step 1 ✅
- GAP-4 toolbar 语义 → Task 2 Step 1 ✅
- GAP-5 Toast 图标 → Task 3 ✅
- DIFF-1 拖拽阈值 → Task 5 Step 3 ✅
- DIFF-3 卡片最小高度 → Task 1 Step 2 ✅
- DIFF-4 副标题可见 → Task 5 Step 4 ✅
- DIFF-5 Header 模糊 → Task 5 Step 4 ✅
- DIFF-7 取消收藏颜色 → Task 2 Step 4 ✅
- DIFF-8 卡片内边距 → Task 1 Step 2 ✅
- 收藏页（消费 useFavorites）→ Task 4 ✅
- 主页收藏入口 → Task 5 Step 4 ✅
- 文档同步 → Task 6 ✅

**2. 占位符扫描：** 无 TBD/TODO/"实现细节"等占位符；所有步骤均含完整代码或确切命令。

**3. 类型一致性检查：**
- `handleAutoPlay`（Task 2）使用 `autoPlay`/`onToggleAutoPlay`/`toast`，与 NavigationControlsProps 一致 ✅
- `ToastVariant`（Task 3）复用 toast.tsx 已有类型 `'success'|'error'|'info'` ✅
- 收藏页（Task 4）使用 `useFavorites()` 返回的 `favorites`/`toggleFavorite`/`isLoaded`，与 use-favorites.ts 导出一致 ✅
- Task 5 解构 `favorites` 与 use-favorites.ts 返回值一致 ✅
- `mounted` 变量在 page.tsx 已存在（第 19 行），Task 5 Step 4 引用合法 ✅

**4. 范围控制：** 排除搜索/分类筛选/统计/设置等未在 spec/prototype 定义的功能，符合 YAGNI。
