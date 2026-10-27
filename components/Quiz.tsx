'use client'

import { useState } from 'react'

type Item = { q: string; o: string[]; a: number; e: string }

export function Quiz({ items }: { items: Item[] }) {
  const [picked, setPicked] = useState<(number | null)[]>(() => items.map(() => null))
  const answered = picked.filter(p => p !== null).length
  const correct = picked.filter((p, i) => p === items[i].a).length

  return (
    <div className="quiz-root">
      {items.map((item, i) => {
        const p = picked[i]
        return (
          <div className="q" key={item.q}>
            <p className="q-title"><span>{String(i + 1).padStart(2, '0')}</span>{item.q}</p>
            <div className="q-opts" role="group" aria-label={`${i + 1}번 보기`}>
              {item.o.map((label, j) => {
                const state = p === null ? '' : j === item.a ? 'right' : j === p ? 'wrong' : ''
                return (
                  <button
                    key={label}
                    type="button"
                    className={state}
                    disabled={p !== null}
                    onClick={() => setPicked(prev => prev.map((v, k) => (k === i ? j : v)))}
                  >
                    {label}
                  </button>
                )
              })}
            </div>
            {p !== null && <p className="q-exp">{item.e}</p>}
          </div>
        )
      })}
      <div className="quiz-foot">
        <p className="quiz-score" aria-live="polite">
          {answered === items.length
            ? `${items.length}문항 중 ${correct}문항 정답. ${correct === items.length ? '흐름을 정확히 꿰었다.' : '틀린 문항의 장면을 파노라마에서 다시 짚어 보길 권한다.'}`
            : `${answered} / ${items.length} 응답`}
        </p>
        {answered > 0 && (
          <button type="button" className="btn-line" onClick={() => setPicked(items.map(() => null))}>다시 풀기</button>
        )}
      </div>
    </div>
  )
}
