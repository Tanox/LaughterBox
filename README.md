# LaughterBox (笑话大集合)

[English](README_EN.md) | [简体中文](README.md)

一个极简的笑话集合应用，旨在提供纯粹的阅读体验。

## 功能特性
- **极简设计**：专注于内容，界面清爽。
- **自适应设计**：针对手机、平板和桌面端进行了全面优化。
- **深色模式**：在浅色和深色主题之间无缝切换。
- **导航功能**：支持随机导航、上一篇/下一篇切换和滑动手势。
- **收藏功能**：收藏喜欢的笑话，数据持久化存储（localStorage 版本化管理）。
- **自动播放**：每隔30秒自动切换到下一条笑话。
- **分享功能**：支持复制笑话内容和分享到社交媒体。
- **键盘快捷键**：方向键切换、空格随机、F收藏、C复制。
- **PWA 支持**：支持安装为渐进式 Web 应用。
- **高鲁棒性**：完善的空数据处理和水合错误预防机制。

## 键盘快捷键
| 快捷键 | 功能 |
|-------|------|
| `←` / `→` | 上一条 / 下一条笑话 |
| `空格` / `R` | 随机切换笑话 |
| `F` | 收藏 / 取消收藏 |
| `C` | 复制当前笑话到剪贴板 |

## 高保真原型
项目包含独立的高保真 HTML 原型，可以直接在浏览器中打开：
- 打开 [prototype/prototype.html](prototype/prototype.html) 查看原型
- 包含所有交互功能：笑话切换、收藏、分享、自动播放等
- 支持深色/浅色模式切换
- 响应式设计，适配各种设备

## 技术栈
- Next.js 15 (App Router)
- Tailwind CSS 4
- React 19
- TypeScript 5.9
- Motion (Framer Motion)
- Lucide React
- next-themes
- shadcn/ui 风格组件

## 快速开始
1. 克隆仓库。
2. 安装依赖：`npm install`。
3. 运行开发服务器：`npm run dev`。
4. 构建生产版本：`npm run build`。

## 项目结构
```
/workspace/
├── app/                          # Next.js App Router 目录
│   ├── layout.tsx                # 根布局组件
│   ├── page.tsx                  # 主页面组件
│   ├── globals.css               # 全局样式与设计令牌
│   ├── components/               # React 组件
│   │   ├── joke-card.tsx             # 笑话卡片组件
│   │   ├── navigation-controls.tsx   # 导航控制组件
│   │   ├── page-decorations.tsx      # 页面装饰组件（Logo、骨架屏）
│   │   ├── theme-provider.tsx        # 主题提供者
│   │   ├── theme-toggle.tsx          # 主题切换按钮
│   │   └── ui/                       # shadcn/ui 基础组件
│   │       ├── button.tsx
│   │       ├── card.tsx
│   │       └── toast.tsx
│   ├── hooks/                    # 自定义 React Hooks
│   │   ├── use-favorites.ts          # 收藏功能 Hook
│   │   └── use-clipboard.ts          # 剪贴板复制 Hook
│   └── lib/                      # 工具函数和数据
│       ├── jokes-data.ts             # 笑话数据聚合
│       ├── jokes/                    # 笑话数据分批文件
│       │   ├── jokes-batch-1.ts      # 第 1-30 条
│       │   ├── jokes-batch-2.ts      # 第 31-60 条
│       │   ├── jokes-batch-3.ts      # 第 61-90 条
│       │   ├── jokes-batch-4.ts      # 第 91-120 条
│       │   └── jokes-batch-5.ts      # 第 121-150 条
│       ├── clipboard.ts              # 剪贴板工具函数
│       ├── types.ts                  # 类型定义
│       └── utils.ts                  # cn() 类名合并工具
├── openspec/                     # OpenSpec 规范文档
│   ├── spec.md                   # 主规范文档
│   ├── ARCHITECTURE.md           # 架构设计文档
│   ├── COMPONENT.md              # 组件规范文档
│   ├── DEVELOPMENT.md            # 开发指南
│   └── DEPLOYMENT.md             # 部署指南
├── prototype/                    # 原型设计目录
│   ├── prototype.html            # 高保真原型
│   ├── DESIGN_SYSTEM.md          # 设计系统规范
│   └── DESIGN_REVIEW.md          # 设计审查报告
├── public/                       # 静态资源
│   ├── manifest.json             # PWA 清单
│   ├── icon-192x192.svg          # PWA 图标
│   └── icon-512x512.svg          # PWA 图标
├── CHANGELOG.md                  # 版本更新日志
├── README.md                     # 项目说明（中文）
├── README_EN.md                  # 项目说明（英文）
├── eslint.config.mjs             # ESLint 配置
├── next.config.ts                # Next.js 配置
├── package.json                  # 依赖管理
├── postcss.config.mjs            # PostCSS 配置
└── tsconfig.json                 # TypeScript 配置
```

## 设计资源
- [设计系统规范](prototype/DESIGN_SYSTEM.md) - 完整的设计令牌、组件规范
- [设计审查报告](prototype/DESIGN_REVIEW.md) - 设计师视角的改进建议
- [高保真原型](prototype/prototype.html) - 独立 HTML 原型
- [OpenSpec 规范](openspec/spec.md) - 项目详细技术规范
- [组件规范](openspec/COMPONENT.md) - 组件接口与设计规范
- [架构设计](openspec/ARCHITECTURE.md) - 技术架构文档

## 开发命令
```bash
npm run dev      # 启动开发服务器
npm run build    # 构建生产版本
npm run start    # 启动生产服务器
npm run lint     # 运行 ESLint 检查
npm run clean    # 清理 .next 目录
```

## 版本信息
- 当前版本：v6.1.0
- 笑话数量：150 条

## 许可证
MIT License
