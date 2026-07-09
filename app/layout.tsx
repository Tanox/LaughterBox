import type { Metadata, Viewport } from 'next'
import './globals.css'
import { ThemeProvider } from '@/components/theme-provider'
import { ToastProvider } from '@/components/ui/toast'

export const viewport: Viewport = {
  width: 'device-width',
  initialScale: 1,
  themeColor: [
    { media: '(prefers-color-scheme: light)', color: '#ffffff' },
    { media: '(prefers-color-scheme: dark)', color: '#0a0a0a' },
  ],
}

export const metadata: Metadata = {
  title: 'LaughterBox v6.2.0',
  description: '极简风格的短篇笑话集合，每篇控制在 100 字以内。',
  keywords: '笑话, 幽默, 极简, 段子, 开心',
  authors: [{ name: 'LaughterBox Team' }],
  manifest: '/manifest.json',
  appleWebApp: {
    capable: true,
    statusBarStyle: 'default',
    title: 'LaughterBox',
  },
  robots: 'index, follow',
}

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="zh-CN" suppressHydrationWarning id="root-html">
      <body
        id="root-body"
        className="min-h-screen bg-background font-sans antialiased text-foreground transition-colors duration-300"
      >
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
