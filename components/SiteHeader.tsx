'use client'

import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { useEffect, useState } from 'react'

const LINKS = [
  { href: '/', label: '파노라마' },
  { href: '/archive', label: '연대기' },
  { href: '/course', label: '과정 가이드' },
] as const

export function SiteHeader() {
  const pathname = usePathname()
  const [open, setOpen] = useState(false)
  const [scrolled, setScrolled] = useState(false)

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 8)
    onScroll()
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  useEffect(() => setOpen(false), [pathname])

  return (
    <header className={`masthead${scrolled ? ' scrolled' : ''}`}>
      <Link className="brand" href="/" aria-label="민주 파노라마 처음으로">
        <span className="brand-mark" aria-hidden="true">民</span>
        <span className="brand-name">
          민주 파노라마<small>1955 — 다음 장</small>
        </span>
      </Link>
      <button
        className="nav-toggle"
        aria-expanded={open}
        aria-controls="site-nav"
        onClick={() => setOpen(v => !v)}
      >
        {open ? '닫기' : '메뉴'}
      </button>
      <nav id="site-nav" className={`nav${open ? ' open' : ''}`} aria-label="주요 메뉴">
        {LINKS.map(l => (
          <Link key={l.href} href={l.href} aria-current={pathname === l.href ? 'page' : undefined}>
            {l.label}
          </Link>
        ))}
      </nav>
    </header>
  )
}
