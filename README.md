# LaughterBox (笑话大集合)

[English](README_EN.md) | [简体中文](README.md)

一个极简的笑话集合应用，旨在提供纯粹的阅读体验。

## 功能特性
- **极简设计**：专注于内容，界面清爽。
- **自适应设计**：针对手机、平板和桌面端进行了全面优化。
- **深色模式**：在浅色和深色主题之间无缝切换。
- **导航功能**：支持随机导航、上一篇/下一篇切换和滑动手势。
- **收藏功能**：收藏喜欢的笑话，数据持久化存储。
- **自动播放**：每隔30秒自动切换到下一条笑话。
- **分享功能**：支持复制笑话内容和分享到社交媒体。
- **PWA 支持**：支持安装为渐进式 Web 应用。
- **高鲁棒性**：完善的空数据处理和水合错误预防机制。

## 高保真原型
项目包含独立的高保真 HTML 原型，可以直接在浏览器中打开：
- 打开 [prototype/prototype.html](prototype/prototype.html) 查看原型
- 包含所有交互功能：笑话切换、收藏、分享、自动播放等
- 支持深色/浅色模式切换
- 响应式设计，适配各种设备

## 技术栈
- Next.js 15
- Tailwind CSS 4
- React 19
- Motion (Framer Motion)
- Lucide React
- next-themes

## 快速开始
1. 克隆仓库。
2. 安装依赖：`npm install`。
3. 运行开发服务器：`npm run dev`。
4. 构建生产版本：`npm run build`。

## 项目结构
```
/workspace/
├── app/              # Next.js App Router 目录
│   ├── layout.tsx    # 根布局组件
│   ├── page.tsx      # 主页面组件
│   ├── globals.css   # 全局样式
│   ├── components/   # React 组件
│   │   ├── joke-card.tsx           # 笑话卡片组件
│   │   ├── navigation-controls.tsx # 导航控制组件
│   │   ├── theme-provider.tsx      # 主题提供者
│   │   └── theme-toggle.tsx        # 主题切换按钮
│   ├── hooks/        # 自定义 React Hooks
│   │   └── use-favorites.ts        # 收藏功能 Hook
│   └── lib/          # 工具函数和数据
│       └── jokes-data.ts           # 笑话数据源
├── openspec/         # OpenSpec 规范文档
├── prototype/        # 原型设计目录
│   ├── prototype.html          # 高保真原型（124条笑话）
│   └── DESIGN_REVIEW.md        # 设计审查报告
└── package.json      # 项目配置
```

## 设计资源
- [设计审查报告](prototype/DESIGN_REVIEW.md) - 设计师视角的改进建议
- [高保真原型](prototype/prototype.html) - 独立 HTML 原型
- [OpenSpec 规范](openspec/spec.md) - 项目详细技术规范

## 版本信息
- 当前版本：v5.9.0
- 笑话数量：124 条

## 许可证
MIT License