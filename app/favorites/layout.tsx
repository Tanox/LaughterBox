import type { Metadata } from 'next'

// 站点基础 URL：优先使用环境变量，回退到默认生产域名
const siteUrl =
  process.env.NEXT_PUBLIC_APP_URL ||
  process.env.APP_URL ||
  'https://laughterbox.app'

export const metadata: Metadata = {
  title: '我的收藏',
  description:
    '查看你在 LaughterBox 收藏的短篇笑话。一键管理你的笑话收藏夹，随时回味那些让你会心一笑的瞬间。',
  alternates: {
    canonical: '/favorites',
  },
  openGraph: {
    title: '我的收藏 | LaughterBox',
    description:
      '查看你在 LaughterBox 收藏的短篇笑话，随时回味让你会心一笑的瞬间。',
    url: `${siteUrl}/favorites`,
  },
  robots: {
    index: false,
    follow: true,
  },
}

export default function FavoritesLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return children
}
