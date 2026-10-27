import { ImageResponse } from 'next/og'
import { readFile } from 'node:fs/promises'
import { join } from 'node:path'
import { ERAS } from '@/data/eras'

export const alt = '민주 파노라마 — 70년을 한 장에'
export const size = { width: 1200, height: 630 }
export const contentType = 'image/png'

export default async function Image() {
  const dir = join(process.cwd(), 'node_modules/pretendard/dist/public/static')
  const [bold, regular] = await Promise.all([
    readFile(join(dir, 'Pretendard-Bold.otf')),
    readFile(join(dir, 'Pretendard-Regular.otf')),
  ])

  return new ImageResponse(
    (
      <div style={{ width: '100%', height: '100%', display: 'flex', flexDirection: 'column', justifyContent: 'space-between', background: '#F6F2EA', padding: '64px 72px', fontFamily: 'Pretendard' }}>
        <div style={{ display: 'flex', flexDirection: 'column' }}>
          <div style={{ fontSize: 24, color: '#9C7E48', letterSpacing: 2 }}>민주청년지도자 양성과정 참고 자료</div>
          <div style={{ fontSize: 112, fontWeight: 700, color: '#0F2A5C', marginTop: 20, letterSpacing: -4 }}>민주 파노라마</div>
          <div style={{ fontSize: 32, color: '#3A4458', marginTop: 12 }}>1955년부터 다음 장까지, 열네 장면으로 읽는 70년</div>
        </div>
        <div style={{ display: 'flex', borderTop: '2px solid #0D1830' }}>
          {ERAS.map((e, i) => (
            <div key={e.id} style={{ flex: 1, display: 'flex', flexDirection: 'column', alignItems: 'flex-start', paddingTop: 18, borderLeft: i ? '1px solid #D9D1C2' : 'none', paddingLeft: i ? 12 : 0 }}>
              <div style={{ fontSize: 44, fontWeight: 700, color: e.status === 'future' ? '#9C7E48' : '#0F2A5C' }}>{e.key}</div>
              <div style={{ fontSize: 15, color: '#6D7486', marginTop: 4 }}>{e.name}</div>
            </div>
          ))}
        </div>
      </div>
    ),
    {
      ...size,
      fonts: [
        { name: 'Pretendard', data: bold, weight: 700, style: 'normal' },
        { name: 'Pretendard', data: regular, weight: 400, style: 'normal' },
      ],
    },
  )
}
