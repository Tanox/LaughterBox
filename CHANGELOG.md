# CHANGELOG

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
