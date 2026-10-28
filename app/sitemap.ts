import type { MetadataRoute } from 'next'
import { SITE_URL } from '@/lib/site'

export const dynamic = 'force-static'

export default function sitemap(): MetadataRoute.Sitemap {
  const now = new Date('2026-10-28')
  return ['/', '/archive/', '/course/'].map(p => ({ url: `${SITE_URL}${p}`, lastModified: now, changeFrequency: 'monthly', priority: p === '/' ? 1 : 0.8 }))
}
