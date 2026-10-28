import type { Metadata, Viewport } from 'next'
import { Noto_Serif_KR } from 'next/font/google'
import { Analytics } from '@vercel/analytics/next'
import { SpeedInsights } from '@vercel/speed-insights/next'
import 'pretendard/dist/web/variable/pretendardvariable-dynamic-subset.css'
import './globals.css'
import { SiteHeader } from '@/components/SiteHeader'
import { ON_VERCEL, SITE_URL } from '@/lib/site'

const serif = Noto_Serif_KR({
  weight: ['400', '500', '600', '700'],
  subsets: ['latin'],
  display: 'swap',
  preload: false,
  variable: '--font-serif',
})


export const metadata: Metadata = {
  metadataBase: new URL(SITE_URL),
  title: { default: '민주 파노라마 — 70년을 한 장에', template: '%s · 민주 파노라마' },
  description: '1955년 민주당 창당부터 오늘까지, 더불어민주당 70년의 계보를 열네 장면으로 펼친 학습 자료. 민주청년지도자 양성과정 수강생 참고용.',
  openGraph: { type: 'website', locale: 'ko_KR', siteName: '민주 파노라마' },
  twitter: { card: 'summary_large_image' },
  formatDetection: { telephone: false },
}

export const viewport: Viewport = {
  themeColor: '#0F2A5C',
  width: 'device-width',
  initialScale: 1,
}

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="ko" className={serif.variable}>
      <body>
        <a className="skip" href="#main">본문 바로가기</a>
        <SiteHeader />
        <main id="main">{children}</main>
        <footer className="footer">
          <div className="wrap foot-grid">
            <p className="foot-title">민주 파노라마</p>
            <p className="foot-note">
              개인이 제작한 독립 학습 자료이며 더불어민주당 또는 특정 교육과정의 공식 교재가 아닙니다.
              사실 서술은 공개 자료에 근거했고, 지도자 레슨과 토론 질문은 해석임을 밝힙니다.
            </p>
            <p className="foot-meta">최종 갱신 2026년 10월</p>
          </div>
        </footer>
        {ON_VERCEL && <Analytics />}
        {ON_VERCEL && <SpeedInsights />}
      </body>
    </html>
  )
}
