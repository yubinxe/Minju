import { ERAS, THREADS, type Era } from '@/data/eras'
import { PanoramaShell } from './PanoramaShell'

const ROWS = ['흐름', '시대', '한 줄', '인물', '사건', '핵심 문장', '다섯 줄기', '지도자 레슨', '토론'] as const

function weight(e: Era) {
  return e.status === 'future' ? 3.2 : Math.max(2.2, e.span[1] - e.span[0])
}

function Cell({ row, className = '', children }: { row: number; className?: string; children: React.ReactNode }) {
  return (
    <div className={`cell c-${row} ${className}`}>
      {row > 0 && <span className="cell-label">{ROWS[row]}</span>}
      {children}
    </div>
  )
}

function EraColumn({ era }: { era: Era }) {
  const future = era.status === 'future'
  return (
    <article className={`era${future ? ' era-future' : ''}`} id={`era-${era.no}`} aria-labelledby={`era-${era.no}-h`}>
      <div
        className={`cell c-0 rail rail-${era.status}`}
        style={era.govFrom !== undefined ? ({ '--gov-from': `${era.govFrom * 100}%` } as React.CSSProperties) : undefined}
      >
        <span className="rail-note">{era.statusNote}</span>
      </div>

      <Cell row={1} className="head">
        <p className="era-no">{String(era.no).padStart(2, '0')}</p>
        <p className="era-key" aria-hidden="true">{era.key}</p>
        <h3 id={`era-${era.no}-h`} className="era-name">{era.name}</h3>
        <p className="era-years">{era.years}</p>
      </Cell>

      <Cell row={2} className="thesis"><p>{era.thesis}</p></Cell>

      <Cell row={3} className="people">
        <ul>{era.people.map(p => <li key={p}>{p}</li>)}</ul>
      </Cell>

      <Cell row={4} className="evts">
        <ol>
          {era.events.map((ev, i) =>
            ev.title ? (
              <li key={i}><time>{ev.date}</time><span>{ev.title}</span></li>
            ) : (
              <li key={i} className="blank"><time>{ev.date}</time><span aria-label="빈칸" /></li>
            ),
          )}
        </ol>
      </Cell>

      <Cell row={5} className="phrase">
        {era.phrase.kind === '빈칸' ? (
          <p className="phrase-blank"><span aria-hidden="true" /><span aria-hidden="true" /><em>{era.phrase.source}</em></p>
        ) : (
          <figure>
            <blockquote>{era.phrase.text}</blockquote>
            <figcaption><b>{era.phrase.kind}</b>{era.phrase.source}</figcaption>
          </figure>
        )}
      </Cell>

      <Cell row={6} className="threads">
        <ul>
          {THREADS.map(t => (
            <li key={t.id} className={era.threads.includes(t.id) ? 'on' : ''} title={t.name}>
              <i aria-hidden="true" /><span>{t.name}</span>
            </li>
          ))}
        </ul>
      </Cell>

      <Cell row={7} className="lesson"><p>{era.lesson}</p></Cell>

      <Cell row={8} className="ask"><p>{era.questions[0]}</p></Cell>
    </article>
  )
}

export function PanoramaChart() {
  const mini = ERAS.map(e => ({ key: e.key, name: e.name, years: e.years, weight: weight(e), status: e.status, govFrom: e.govFrom }))
  return (
    <PanoramaShell eras={mini}>
      <div className="pano-labels" aria-hidden="true">
        {ROWS.map((r, i) => <div key={r} className={`lab c-${i}`}><span>{r}</span></div>)}
      </div>
      {ERAS.map(e => <EraColumn key={e.id} era={e} />)}
    </PanoramaShell>
  )
}
