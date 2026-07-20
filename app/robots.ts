import type { MetadataRoute } from 'next'

// 站点基础 URL：优先使用环境变量，回退到默认生产域名
const siteUrl =
  process.env.NEXT_PUBLIC_APP_URL ||
  process.env.APP_URL ||
  'https://laughterbox.app'

export default function robots(): MetadataRoute.Robots {
  return {
    rules: {
      userAgent: '*',
      allow: '/',
      // Service Worker 与 PWA 运行时不需被索引
      disallow: ['/sw.js', '/workbox-*.js', '/swe-worker-*.js'],
    },
    host: siteUrl,
    sitemap: `${siteUrl}/sitemap.xml`,
  }
}
