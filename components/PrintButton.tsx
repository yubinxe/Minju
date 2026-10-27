'use client'

export function PrintButton({ label = '인쇄용 차트' }: { label?: string }) {
  return (
    <button type="button" className="btn-line" onClick={() => window.print()}>
      {label}
    </button>
  )
}
