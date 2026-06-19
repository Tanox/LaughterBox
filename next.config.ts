import type { NextConfig } from 'next'
import withPWAInit from '@ducanh2912/next-pwa'

const isDeployingToVercel = process.env.VERCEL === '1'
const isDeployingToEdgeOne = process.env.EDGEONE === '1'

const withPWA = withPWAInit({
  dest: 'public',
  disable: process.env.NODE_ENV === 'development',
  cacheOnFrontEndNav: true,
  aggressiveFrontEndNavCaching: true,
  reloadOnOnline: true,
  workboxOptions: {
    disableDevLogs: true,
  },
})

// Security headers (CSP, XSS protection, clickjacking prevention, etc.)
// 说明:
// - default-src 'self': 默认仅允许同源资源
// - script-src: 启用 Next.js 运行时必要的内联脚本
// - style-src: 允许 Tailwind v4 注入的样式与 Google Fonts
// - img-src: 允许 data: (内联图标) 与本站资源
// - connect-src: 仅允许同源 API 调用
// - frame-ancestors: 禁止被嵌入 (clickjacking 防护)
// - Permissions-Policy: 默认关闭敏感传感器
const securityHeaders = [
  {
    key: 'Content-Security-Policy',
    value:
      "default-src 'self'; script-src 'self' 'unsafe-inline'; style-src 'self' 'unsafe-inline' https://fonts.googleapis.com; font-src 'self' https://fonts.gstatic.com; img-src 'self' data:; connect-src 'self'; frame-ancestors 'none';",
  },
  { key: 'X-Frame-Options', value: 'DENY' },
  { key: 'X-Content-Type-Options', value: 'nosniff' },
  { key: 'Referrer-Policy', value: 'strict-origin-when-cross-origin' },
  {
    key: 'Permissions-Policy',
    value: 'camera=(), microphone=(), geolocation=(), interest-cohort=()',
  },
  { key: 'Strict-Transport-Security', value: 'max-age=63072000; includeSubDomains; preload' },
  { key: 'X-XSS-Protection', value: '1; mode=block' },
]

const nextConfig: NextConfig = {
  reactStrictMode: true,
  eslint: { ignoreDuringBuilds: false },
  typescript: { ignoreBuildErrors: false },
  images: { unoptimized: true },
  ...(isDeployingToVercel || isDeployingToEdgeOne ? {} : { output: 'standalone' }),
  transpilePackages: ['motion'],
  onDemandEntries: {
    maxInactiveAge: 25 * 1000,
    pagesBufferLength: 2,
  },
  async headers() {
    return [
      {
        source: '/:path*',
        headers: securityHeaders,
      },
    ]
  },
}

export default withPWA(nextConfig)
