import type { NextConfig } from 'next'

// STATIC_EXPORT=1 → GitHub Pages 등 정적 호스팅용 빌드 (BASE_PATH 하위 경로)
const isExport = process.env.STATIC_EXPORT === '1'
const basePath = process.env.BASE_PATH || ''

const nextConfig: NextConfig = {
  reactStrictMode: true,
  reactCompiler: true,
  typedRoutes: true,
  poweredByHeader: false,
  ...(isExport
    ? { output: 'export', basePath, trailingSlash: true, images: { unoptimized: true } }
    : {
        async headers() {
          return [
            {
              source: '/(.*)',
              headers: [
                { key: 'X-Content-Type-Options', value: 'nosniff' },
                { key: 'Referrer-Policy', value: 'strict-origin-when-cross-origin' },
                { key: 'X-Frame-Options', value: 'SAMEORIGIN' },
                { key: 'Permissions-Policy', value: 'camera=(), microphone=(), geolocation=()' },
              ],
            },
          ]
        },
      }),
}

export default nextConfig
