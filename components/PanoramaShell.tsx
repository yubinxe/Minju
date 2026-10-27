'use client'

import { useCallback, useEffect, useRef, useState } from 'react'
import type { Status } from '@/data/eras'

type MiniEra = { key: string; name: string; years: string; weight: number; status: Status; govFrom?: number }

export function PanoramaShell({ eras, children }: { eras: MiniEra[]; children: React.ReactNode }) {
  const trackRef = useRef<HTMLDivElement>(null)
  const [active, setActive] = useState(0)
  const [atStart, setAtStart] = useState(true)
  const [atEnd, setAtEnd] = useState(false)

  const columns = () => Array.from(trackRef.current?.querySelectorAll<HTMLElement>('.era') ?? [])
  const labelWidth = () => trackRef.current?.querySelector<HTMLElement>('.pano-labels')?.offsetWidth ?? 0

  const sync = useCallback(() => {
    const track = trackRef.current
    if (!track) return
    const x = track.scrollLeft + labelWidth() + 48
    let idx = 0
    columns().forEach((c, i) => { if (c.offsetLeft <= x) idx = i })
    setActive(idx)
    setAtStart(track.scrollLeft < 4)
    setAtEnd(track.scrollLeft + track.clientWidth >= track.scrollWidth - 4)
  }, [])

  const goTo = useCallback((i: number) => {
    const track = trackRef.current
    const cols = columns()
    const target = cols[Math.max(0, Math.min(cols.length - 1, i))]
    if (!track || !target) return
    const reduce = window.matchMedia('(prefers-reduced-motion: reduce)').matches
    track.scrollTo({ left: target.offsetLeft - labelWidth(), behavior: reduce ? 'auto' : 'smooth' })
  }, [])

  useEffect(() => {
    const track = trackRef.current
    if (!track) return
    let frame = 0
    const onScroll = () => { cancelAnimationFrame(frame); frame = requestAnimationFrame(sync) }
    track.addEventListener('scroll', onScroll, { passive: true })
    window.addEventListener('resize', onScroll)
    sync()

    // 마우스 끌기로 가로 이동 (터치·펜은 기본 스크롤 유지)
    let dragging = false, startX = 0, startLeft = 0, moved = 0
    const down = (e: PointerEvent) => {
      if (e.pointerType !== 'mouse' || e.button !== 0) return
      if ((e.target as HTMLElement).closest('a, button')) return
      dragging = true; moved = 0; startX = e.clientX; startLeft = track.scrollLeft
      track.classList.add('dragging')
    }
    const move = (e: PointerEvent) => {
      if (!dragging) return
      const dx = e.clientX - startX
      moved = Math.max(moved, Math.abs(dx))
      if (moved > 3) track.setPointerCapture(e.pointerId)
      track.scrollLeft = startLeft - dx
    }
    const up = (e: PointerEvent) => {
      if (!dragging) return
      dragging = false
      track.classList.remove('dragging')
      if (track.hasPointerCapture(e.pointerId)) track.releasePointerCapture(e.pointerId)
    }
    track.addEventListener('pointerdown', down)
    track.addEventListener('pointermove', move)
    track.addEventListener('pointerup', up)
    track.addEventListener('pointercancel', up)
    return () => {
      cancelAnimationFrame(frame)
      track.removeEventListener('scroll', onScroll)
      window.removeEventListener('resize', onScroll)
      track.removeEventListener('pointerdown', down)
      track.removeEventListener('pointermove', move)
      track.removeEventListener('pointerup', up)
      track.removeEventListener('pointercancel', up)
    }
  }, [sync])

  const onKey = (e: React.KeyboardEvent) => {
    const map: Record<string, number> = { ArrowRight: active + 1, ArrowLeft: active - 1, Home: 0, End: eras.length - 1 }
    if (e.key in map) { e.preventDefault(); goTo(map[e.key]) }
  }

  const current = eras[active]

  return (
    <div className="pano">
      <div className="pano-bar">
        <div className="wrap pano-bar-inner">
          <p className="pano-now" aria-live="polite">
            <span className="pano-now-key">{current.key}</span>
            <span className="pano-now-text">
              <b>{String(active + 1).padStart(2, '0')} {current.name}</b>
              <i>{current.years}</i>
            </span>
          </p>
          <ol className="minimap" aria-label="시대 바로가기">
            {eras.map((e, i) => (
              <li key={e.key} style={{ flexGrow: e.weight }}>
                <button
                  type="button"
                  className={`mm-seg mm-${e.status}${i === active ? ' on' : ''}`}
                  style={e.govFrom !== undefined ? ({ '--gov-from': `${e.govFrom * 100}%` } as React.CSSProperties) : undefined}
                  onClick={() => goTo(i)}
                  aria-label={`${i + 1}. ${e.name} (${e.years})`}
                  aria-current={i === active ? 'step' : undefined}
                >
                  <span className="mm-key">{e.key}</span>
                </button>
              </li>
            ))}
          </ol>
          <div className="pano-ctrl">
            <button type="button" onClick={() => goTo(active - 1)} disabled={atStart} aria-label="이전 시대">←</button>
            <button type="button" onClick={() => goTo(active + 1)} disabled={atEnd} aria-label="다음 시대">→</button>
          </div>
        </div>
        <div className="pano-progress" aria-hidden="true"><span /></div>
      </div>
      <div
        ref={trackRef}
        className="pano-track"
        tabIndex={0}
        role="region"
        aria-label="민주 파노라마 차트. 좌우 화살표 키로 시대를 이동합니다."
        onKeyDown={onKey}
      >
        {children}
      </div>
    </div>
  )
}
