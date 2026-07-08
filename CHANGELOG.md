# CHANGELOG

## [6.2.0] - 2026-07-08
### Added
- 完善所有页面开发，统一版本号至 v6.2.0。
- 更新 README.md（中文）：新增收藏列表页面说明、无障碍支持特性、版本号更新。
- 更新 README_EN.md（英文）：完整重写，与中文版保持内容一致。
- 更新 openspec/spec.md：版本号、最后更新日期、项目特点、版本历史。
- 更新 openspec/COMPONENT.md：所有组件版本号至 v6.2.0。
- 更新 openspec/ARCHITECTURE.md：版本号至 v6.2.0。

### Changed
- 统一所有源代码文件版本号从 v6.1.0 升至 v6.2.0。
- 更新 package.json 版本号至 6.2.0。

## [6.1.0] - 2026-07-04
### Fixed
- 修复 `joke-card.tsx` TypeScript 类型错误：Motion 动画 `ease` 数组类型不匹配。
- 修复 `theme-toggle.tsx` ESLint 错误：`useCallback` 在条件返回之后调用（违反 Hooks 规则）。
- 修复 `use-favorites.ts` ESLint 错误：`setState` 在 `useEffect` 中同步调用导致级联渲染。
- 修复 `toast.tsx` 内存泄漏：`setTimeout` 未在组件卸载时清理。
- 对齐原型规范：修正笑话卡片字号断点（移除多余的 `sm:text-3xl`）和行高（`leading-[1.65]` / `md:leading-[1.7]` / `lg:leading-[1.8]`）。
- 对齐原型无障碍属性：`JokeCard` motion.div 添加 `tabIndex={0} role="region" aria-label`。
- 对齐原型卡片尺寸：`JokeCard` 与 `SkeletonCard` 统一为 `min-h-[360px] md:min-h-[480px] p-8 md:p-12`。
- 对齐原型 toolbar 语义：`NavigationControls` 外层添加 `role="toolbar" aria-label`。
- 对齐原型 Toast 反馈：自动播放按钮触发 Toast 提示；取消收藏 Toast 改为 `success` variant。
- `Toast` 组件按 `variant` 渲染对应图标（Check/X/Info）与配色。
- 主页拖拽阈值 50→60 与原型一致。
- 修复 `tsconfig.json` TS 5.9 `baseUrl` 弃用警告（添加 `ignoreDeprecations: "5.0"`）。

### Added
- 新增 `app/lib/clipboard.ts`：提取剪贴板工具函数（`fallbackCopy`、`copyToClipboard`）。
- 新增 `app/hooks/use-clipboard.ts`：封装复制逻辑与 Toast 反馈的自定义 Hook。
- 新增 `app/components/page-decorations.tsx`：提取 `LogoIcon` 和 `SkeletonCard` 静态组件。
- 新增 `app/favorites/page.tsx`：收藏列表页面，消费 `useFavorites` Hook，含加载骨架、空状态、移除收藏。
- `NavigationControls` 新增版本标签 `v6.1.0`。
- 主页 Header 新增 `/favorites` 收藏入口（带计数徽章，`mounted` 门控）。

### Changed
- 拆分 `jokes-data.ts`（905行）为 5 个批次文件（各 185 行），保持导入路径不变。
- 重构 `navigation-controls.tsx` 使用 `useClipboard` Hook，消除重复代码（241行→189行）。
- 重构 `page.tsx` 提取静态组件到 `page-decorations.tsx`（226行→197行）。
- 统一所有源文件版本号至 v6.1.0。
- 主页 Header `backdrop-blur`→`backdrop-blur-md`；副标题移动端始终可见。
- 更新 `openspec/spec.md`：版本号、拖拽阈值、目录结构新增 `favorites/`、版本历史。
- 更新 `openspec/COMPONENT.md` 组件版本号至 v6.1.0 与新文件条目（FavoritesPage）。

## [6.0.0] - 2026-06-12
### Added
- 初始化 shadcn/ui 组件库，添加 `components.json` + `lib/utils.ts` (cn 工具)。
- 新增基础组件: `Button` (`components/ui/button.tsx`)、`Card` (`components/ui/card.tsx`)、`Toast` (`components/ui/toast.tsx`)。
- 建立设计系统规范: `prototype/DESIGN_SYSTEM.md`。
- 完成高保真可交互原型: `prototype/prototype.html`。
- 安全审查报告: `security_best_practices_report.md`。
- Dogfood 测试报告: `dogfood_output/dogfood_report.md`。

### Updated
- 升级版本号至 v6.0.0 (semver major change: 破坏性变更)。
- 重构 `app/components/navigation-controls.tsx` 使用 shadcn Button 组件。
- 重构 `app/components/joke-card.tsx` 使用 shadcn Card 组件。
- 重构 `app/components/theme-toggle.tsx` 使用 shadcn Button 组件。
- 重写 `components/ui/toast.tsx` 为轻量 React Context 实现，兼容 React 19。
- 加强 `next.config.ts` 安全头: 移除 unsafe-eval，新增 HSTS、X-XSS-Protection、Permissions-Policy interest-cohort 防护。
- 修复 `app/globals.css` Tailwind v4 @custom-variant 语法错误。
- 修复 `use-favorites.ts` console.error 泄露调试信息问题。
- 修复构建失败: `swcMinify: false` 解决 motion v12 与 SWC minifier 不兼容。
- OpenSpec 文档同步: `spec.md` 版本号 + 组件库章节, `COMPONENT.md` 版本号 + 新增组件条目。

## [5.9.0] - 2026-06-10
### Updated
- Updated version number across all files from 5.8.0 to 5.9.0.
- Updated joke count in documentation from 124 to 1008.
- Corrected jokes-data.ts version comment to v5.0.0.

## [5.8.0] - 2026-05-23
### Fixed
- Fixed syntax error in `lib/jokes-data.ts` (missing closing array bracket).
- Fixed linting issues by ensuring proper file structure.

### Updated
- Updated version number across all files from 5.7.0 to 5.8.0.
- Updated `package.json` name from "ai-studio-applet" to "laughterbox".
- Refactored and fixed jokes data structure.

## [5.7.0]
### Added
- Optimized joke text typography with decorative quotes and index indicators.
- Refined UI layout by removing borders and using soft shadows.
- Improved visual hierarchy for a more "elegant" editorial feel.

## [5.6.0]
### Added
- Added swipe gestures for mobile devices to navigate to the previous/next joke.
- Added horizontal slide animations for swipe navigation.

## [5.5.0]
### Added
- Created `openspec/spec.md` to document code functionality details.
### Changed
- Updated README.md and README_EN.md.
### Fixed
- Improved robustness in `app/page.tsx` for empty joke data.

## [5.4.0]
### Added
- Added PWA support using `@ducanh2912/next-pwa`.
- Added `manifest.json` and SVG icons for PWABuilder compatibility.

## [5.3.2]
### Fixed
- Fixed dark/light mode toggle bug by using `resolvedTheme` and adding mount check.

## [5.3.1]
### Fixed
- Fixed hydration mismatch error caused by random initial joke index.
- Added loading skeleton for initial mount.

## [5.3.0]
### Changed
- Set Chinese README as the default `README.md`.
- Removed the "New Joke" (新笑话) button and its AI generation logic.
- Simplified the header UI.

## [5.2.0]
### Changed
- Renamed project to "LaughterBox".
- Removed AI-related descriptions from documentation.
- Cleaned up README features and tech stack descriptions.

## [5.1.0]
### Changed
- Replaced Previous/Next navigation with a single "Random" button for a simpler experience.
- Updated transition animations to vertical slide.

## [5.0.1]
### Added
- Completed the joke collection to exactly 1000 unique entries.
- Removed duplicate jokes and improved data variety.

## [5.0.0]
### Added
- Externalized joke data to `lib/jokes-data.ts`.
- Expanded joke collection to over 100 entries (infrastructure ready for 1000).
- Updated versioning across all files.

## [4.0.0]
### Added
- Standardized file headers across all code files.
- SEO and GEO metadata in root layout.
- Semantic IDs to all major containers for debugging.
- Responsive design optimizations for all device sizes.
- README.md and README_CN.md with cross-links.

### Changed
- Refined UI for better mobile/tablet/desktop adaptation.
- Updated metadata.json versioning.

## [3.0.0]
### Added
- Single joke display mode.
- Random initial joke on home page.
- Previous/Next navigation.
- Smooth transition animations.

## [2.0.0]
### Added
- Mobile adaptation with full-width layout.
- Increased font sizes and switched to Noto Serif SC.
- Minimized UI footprint.

## [1.0.0]
### Added
- Initial release with AI joke generation and basic collection.
- Dark mode support.
