import type { MetadataRoute } from 'next'

const base = process.env.VERCEL_PROJECT_PRODUCTION_URL
  ? `https://${process.env.VERCEL_PROJECT_PRODUCTION_URL}`
  : 'http://localhost:3000'

export default function sitemap(): MetadataRoute.Sitemap {
  const now = new Date('2026-10-27')
  return ['', '/archive', '/course'].map(p => ({ url: `${base}${p}`, lastModified: now, changeFrequency: 'monthly', priority: p ? 0.8 : 1 }))
}
