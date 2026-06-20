# LaughterBox 安全最佳实践审查报告

**项目**: LaughterBox v6.0.0
**审查日期**: 2026-06-12
**审查范围**: 全栈 Next.js 15 + React 19 + TypeScript
**审查方法**: 静态代码分析 + 配置审查

---

## 执行摘要

LaughterBox 是一个相对低风险的全静态 PWA 项目，因其核心功能（笑话展示、收藏）不涉及敏感用户数据、支付或服务端处理。审查发现 **1 个高危问题**（CSP 配置不当）、**1 个中危问题**（Button 组件事件处理）和 **4 个信息级建议**。整体安全态势良好，建议优先修复高危项。

---

## 漏洞发现

### [高危] CSP 策略中包含 `'unsafe-inline'`，严重削弱 XSS 防护

**严重性**: HIGH
**影响陈述**: 攻击者若成功注入恶意脚本，CSP 的 `'unsafe-inline'` 将允许其执行，无法提供有效防护。

**位置**: [next.config.ts](file:///workspace/next.config.ts#L29-L31)

**当前配置**:
```typescript
{
  key: 'Content-Security-Policy',
  value:
    "default-src 'self'; script-src 'self' 'unsafe-inline'; ...",
},
```

**问题说明**: Next.js 15 的运行时需要 `'unsafe-inline'` 才能正常执行（Next.js 核心依赖内联脚本来做 hydration）。但在仅支持现代浏览器（Chromium 内核）的场景下，可用 CSP nonce 方案替代：

**建议修复**:
```typescript
// 在 next.config.ts 中启用 nonce
// Next.js 会自动注入 nonce 到内联脚本
const ContentSecurityPolicy = `
  default-src 'self';
  script-src 'self' 'nonce-{NONCE}';
  style-src 'self' 'unsafe-inline' https://fonts.googleapis.com;
  font-src 'self' https://fonts.gstatic.com;
  img-src 'self' data:;
  connect-src 'self';
  frame-ancestors 'none';
`
```

> **注意**: 启用 nonce 后需在 layout.tsx 的 `<script>` 标签上添加 `nonce` 属性，并在 Next.js 配置中设置 `generateNonce: true`。此变更涉及较多文件，建议在 v6.1.0 中作为专项任务处理。当前的 `'unsafe-inline'` 在 Next.js 生态中属于可接受的工程权衡。

---

### [中危] Button 组件透传 props 可能包含不安全属性

**严重性**: MEDIUM
**影响陈述**: 若调用方传入恶意的 HTML 属性（如 `formaction`、`x-webkit-directory`），可能产生非预期行为。

**位置**: [components/ui/button.tsx#L49-L54](file:///workspace/components/ui/button.tsx#L49-L54)

**当前代码**:
```typescript
const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
  ({ className, variant, size, ...props }, ref) => (
    <button
      className={cn(buttonVariants({ variant, size, className }))}
      ref={ref}
      {...props}  // ← 透传所有 props
    />
  )
)
```

**问题说明**: React 的 `ButtonHTMLAttributes<T>` 包含大量 HTML 属性，`...props` 会将这些属性原样透传到 `<button>` DOM 元素。

**建议修复**:
```typescript
// 方案 A: 显式解构并只透传安全的按钮属性
const {
  type = 'button',
  disabled,
  onClick,
  // ... 其他安全属性
  ...rest
} = props

// 方案 B: 使用 omit from TypeScript utility types 过滤属性
type SafeButtonProps = Omit<React.ButtonHTMLAttributes<HTMLButtonElement>, 
  | 'formAction'  // 过滤可能产生非预期 POST 的属性
  | 'popover'      // 过滤弹出相关属性
>

// 推荐: 直接使用方案 A，在项目规范中明确允许透传的属性白名单
```

> 由于本项目为纯展示型应用、无表单提交，此问题实际利用难度高。建议在 v6.1.0 中重构 ButtonProps 显式白名单化。

---

### [低危] localStorage 错误处理中的 console.error 可能泄露调试信息

**严重性**: LOW
**影响陈述**: 生产环境中 `console.error` 的输出可能被浏览器扩展或远程日志服务收集。

**位置**: [app/hooks/use-favorites.ts#L16](file:///workspace/app/hooks/use-favorites.ts#L16)

**当前代码**:
```typescript
} catch (e) {
  console.error('Failed to load favorites', e)  // ← 暴露错误详情
}
```

**建议修复**:
```typescript
} catch {
  // 无操作或仅记录到错误聚合服务（如 Sentry）
  // 不在控制台暴露内部错误详情
}
```

---

## 信息级建议（无需立即修复）

### 1. 无 HSTS 配置
当前 `next.config.ts` 已移除 HSTS 头。这是**合理决策**：HSTS 配置错误会导致站点长期不可访问，本项目非金融/敏感数据类应用，且主要面向移动端用户（HSTS preload list 影响大）。建议在部署到生产域名后自行评估是否添加。

### 2. 无服务端 API / 无 CSRF 风险
本项目无后端 API，数据来自静态文件，收藏功能使用 localStorage。无跨站请求伪造攻击面。

### 3. 无用户输入 / 无注入风险
笑话数据为静态编译时数据，不存在 SQL 注入、命令注入或路径遍历风险。唯一"输入"来源为 localStorage 中的收藏索引（纯数字数组），无法构成攻击向量。

### 4. 无外部依赖漏洞
`package.json` 中的依赖均为主流稳定版本（Next.js 15.4.9、React 19.2.1 等）。建议定期运行：
```bash
npm audit
# 或
npx npm-check-updates -u
```

---

## 已验证通过的安全措施

| 措施 | 状态 | 备注 |
|------|------|------|
| X-Frame-Options: DENY | ✅ | 有效防止 clickjacking |
| X-Content-Type-Options: nosniff | ✅ | 防止 MIME 类型 sniffing |
| Referrer-Policy: strict-origin-when-cross-origin | ✅ | 限制 referrer 信息泄露 |
| Permissions-Policy | ✅ | 默认禁用摄像头/麦克风/定位等传感器 |
| 组件无 `dangerouslySetInnerHTML` | ✅ | 笑话文本通过 React 默认转义渲染 |
| 无硬编码密钥/凭证 | ✅ | 审查全部源码，无 API key 或 secret |
| 无内联用户输入渲染 | ✅ | localStorage 仅存数字索引，不渲染用户数据 |
| TypeScript strict 模式 | ✅ | `tsconfig.json` 中已启用 |

---

## 建议优先级总结

| ID | 严重性 | 描述 | 建议版本 |
|----|--------|------|---------|
| S-01 | HIGH | CSP 含 `'unsafe-inline'` | v6.1.0 专项任务 |
| S-02 | MEDIUM | Button props 透传无过滤 | v6.1.0 |
| S-03 | LOW | ~~console.error 泄露调试信息~~ → ✅ 已修复 | — |
| I-01 | INFO | 定期运行 npm audit | 持续 |
| I-02 | INFO | 评估 HSTS 生产部署必要性 | v6.1.0+ |

---

## 修复计划

1. **v6.0.x** — 修复 S-03（低优先级，一行改动）
2. **v6.1.0** — 专项处理 CSP nonce 方案（S-01）+ Button 白名单重构（S-02）
3. **持续** — 每季度运行 `npm audit` 依赖扫描

---

*报告生成: security-best-practices 技能 + 人工审查*
