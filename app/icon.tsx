import { ImageResponse } from 'next/og'

export const runtime = 'edge'
export const size = { width: 32, height: 32 }
export const contentType = 'image/png'

// 动态生成浏览器标签页图标 (favicon)
// 采用与品牌 Logo 一致的深色方块 + 白色字母
export default function Icon() {
  return new ImageResponse(
    (
      <div
        style={{
          width: '100%',
          height: '100%',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          background: '#0a0a0a',
          color: '#ffffff',
          fontSize: 22,
          fontWeight: 700,
          borderRadius: 6,
        }}
      >
        L
      </div>
    ),
    { ...size }
  )
}
