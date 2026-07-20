import { ImageResponse } from 'next/og'

export const runtime = 'edge'
export const alt = 'LaughterBox - 极简短篇笑话集合'
export const size = { width: 1200, height: 630 }
export const contentType = 'image/png'

// 动态生成社交分享卡片（OG / Twitter Card 共用）
// 采用与品牌一致的极简风格：浅底 + 强对比深色文字
export default function OpenGraphImage() {
  return new ImageResponse(
    (
      <div
        style={{
          width: '100%',
          height: '100%',
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          justifyContent: 'center',
          background:
            'linear-gradient(135deg, #fafafa 0%, #f0f0f0 50%, #e8e8e8 100%)',
          fontFamily: 'sans-serif',
          position: 'relative',
        }}
      >
        <div
          style={{
            display: 'flex',
            alignItems: 'center',
            gap: 24,
            marginBottom: 40,
          }}
        >
          <div
            style={{
              width: 96,
              height: 96,
              borderRadius: 24,
              background: '#0a0a0a',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              fontSize: 64,
              color: '#ffffff',
            }}
          >
            L
          </div>
          <div style={{ fontSize: 56, fontWeight: 700, color: '#0a0a0a' }}>
            LaughterBox
          </div>
        </div>
        <div
          style={{
            fontSize: 44,
            color: '#404040',
            marginBottom: 24,
            fontWeight: 500,
          }}
        >
          极简短篇笑话集合
        </div>
        <div
          style={{
            fontSize: 28,
            color: '#737373',
            maxWidth: 800,
            textAlign: 'center',
            lineHeight: 1.5,
          }}
        >
          每篇 100 字以内 · 支持收藏与随机切换
        </div>
        <div
          style={{
            position: 'absolute',
            bottom: 48,
            display: 'flex',
            alignItems: 'center',
            gap: 12,
            fontSize: 24,
            color: '#a3a3a3',
          }}
        >
          <span>laughterbox.app</span>
        </div>
      </div>
    ),
    { ...size }
  )
}
