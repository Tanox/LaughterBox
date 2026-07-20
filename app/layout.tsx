import type { Metadata, Viewport } from 'next'
import './globals.css'
import { ThemeProvider } from '@/components/theme-provider'
import { ToastProvider } from '@/components/ui/toast'

// 站点基础 URL：优先使用环境变量，回退到默认生产域名
const siteUrl =
  process.env.NEXT_PUBLIC_APP_URL ||
  process.env.APP_URL ||
  'https://laughterbox.app'
const siteUrlObj = new URL(siteUrl)

export const viewport: Viewport = {
  width: 'device-width',
  initialScale: 1,
  themeColor: [
    { media: '(prefers-color-scheme: light)', color: '#ffffff' },
    { media: '(prefers-color-scheme: dark)', color: '#0a0a0a' },
  ],
}

export const metadata: Metadata = {
  metadataBase: siteUrlObj,
  title: {
    default: 'LaughterBox - 极简短篇笑话集合',
    template: '%s | LaughterBox',
  },
  description:
    'LaughterBox 是一款极简风格的中文短篇笑话集合，每篇控制在 100 字以内，支持收藏、随机切换与键盘快捷键，适合在通勤、排队或碎片时间快速放松心情。',
  applicationName: 'LaughterBox',
  generator: 'Next.js',
  keywords: [
    '笑话',
    '短笑话',
    '幽默',
    '段子',
    '冷笑话',
    '开心',
    '极简',
    '中文笑话',
    '中文幽默',
    'LaughterBox',
    '笑话合集',
    '每日一笑',
  ],
  authors: [{ name: 'LaughterBox Team', url: siteUrl }],
  creator: 'LaughterBox Team',
  publisher: 'LaughterBox Team',
  manifest: '/manifest.json',
  appleWebApp: {
    capable: true,
    statusBarStyle: 'default',
    title: 'LaughterBox',
  },
  formatDetection: {
    telephone: false,
    address: false,
    email: false,
  },
  robots: {
    index: true,
    follow: true,
    nocache: false,
    googleBot: {
      index: true,
      follow: true,
      'max-image-preview': 'large',
      'max-snippet': -1,
      'max-video-preview': -1,
    },
  },
  alternates: {
    canonical: '/',
    languages: {
      'zh-CN': '/',
    },
  },
  openGraph: {
    type: 'website',
    locale: 'zh_CN',
    alternateLocale: ['en_US'],
    url: siteUrl,
    siteName: 'LaughterBox',
    title: 'LaughterBox - 极简短篇笑话集合',
    description:
      '一款极简风格的中文短篇笑话集合，每篇控制在 100 字以内，支持收藏与随机切换，让你在碎片时间快速一笑。',
    // OG 图由 app/opengraph-image.tsx 文件约定自动注入，避免重复声明
  },
  twitter: {
    card: 'summary_large_image',
    title: 'LaughterBox - 极简短篇笑话集合',
    description:
      '一款极简风格的中文短篇笑话集合，每篇控制在 100 字以内，支持收藏与随机切换。',
    // Twitter Card 图复用 OG 图，由 opengraph-image.tsx 文件约定注入
    creator: '@laughterbox',
    site: '@laughterbox',
  },
  icons: {
    icon: [{ url: '/icon-192x192.svg', type: 'image/svg+xml' }],
    apple: [{ url: '/icon-192x192.svg' }],
  },
  category: 'entertainment',
}

// Schema.org JSON-LD 结构化数据：WebSite + WebApplication
const jsonLd = {
  '@context': 'https://schema.org',
  '@graph': [
    {
      '@type': 'WebSite',
      '@id': `${siteUrl}/#website`,
      url: siteUrl,
      name: 'LaughterBox',
      description:
        '极简风格的中文短篇笑话集合，每篇控制在 100 字以内，支持收藏与随机切换。',
      inLanguage: 'zh-CN',
      publisher: { '@id': `${siteUrl}/#organization` },
      potentialAction: {
        '@type': 'SearchAction',
        target: `${siteUrl}/?q={search_term_string}`,
        'query-input': 'required name=search_term_string',
      },
    },
    {
      '@type': 'WebApplication',
      '@id': `${siteUrl}/#webapp`,
      url: siteUrl,
      name: 'LaughterBox',
      applicationCategory: 'EntertainmentApplication',
      operatingSystem: 'Web',
      inLanguage: 'zh-CN',
      description:
        '一款极简风格的中文短篇笑话集合，每篇控制在 100 字以内，支持收藏、随机切换与键盘快捷键。',
      offers: {
        '@type': 'Offer',
        price: '0',
        priceCurrency: 'CNY',
      },
      publisher: { '@id': `${siteUrl}/#organization` },
    },
    {
      '@type': 'Organization',
      '@id': `${siteUrl}/#organization`,
      name: 'LaughterBox Team',
      url: siteUrl,
    },
  ],
}

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="zh-CN" suppressHydrationWarning id="root-html">
      <body
        id="root-body"
        className="min-h-screen bg-background font-sans antialiased text-foreground transition-colors duration-300"
      >
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
        />
        <ThemeProvider
          attribute="class"
          defaultTheme="system"
          enableSystem
          disableTransitionOnChange
        >
          <ToastProvider>
            <div id="app-container" className="min-h-screen flex flex-col">
              {children}
            </div>
          </ToastProvider>
        </ThemeProvider>
      </body>
    </html>
  )
}
