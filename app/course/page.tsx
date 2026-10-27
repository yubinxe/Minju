import type { Metadata } from 'next'
import Link from 'next/link'
import { ERAS } from '@/data/eras'
import { BOOKS, COMPETENCIES, PATH, QUIZ, RIGHTS, ROLES, WEEKS } from '@/data/course'
import { Quiz } from '@/components/Quiz'
import { PrintButton } from '@/components/PrintButton'

export const metadata: Metadata = {
  title: '과정 가이드',
  description: '민주 파노라마를 교재로 쓰는 4주 학습 설계, 지도자 역량, 청년의 여섯 역할, 토론 질문 28선과 점검 퀴즈.',
}

const jsonLd = {
  '@context': 'https://schema.org',
  '@type': 'LearningResource',
  name: '민주 파노라마 과정 가이드',
  inLanguage: 'ko',
  learningResourceType: 'Study guide',
  educationalLevel: '청년 정치 지도자 교육',
  timeRequired: 'P4W',
  teaches: WEEKS.map(w => w.title),
  isAccessibleForFree: true,
}

export default function Course() {
  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }} />

      <section className="page-head">
        <div className="wrap">
          <p className="eyebrow">민주청년지도자 양성과정 수강생 참고 자료</p>
          <h1>과정 가이드</h1>
          <p className="hero-lede">파노라마를 교재로 쓰는 4주 설계. 1주 차에 흐름을 잡고, 4주 차에는 열네 번째 장면을 직접 쓴다.</p>
          <div className="head-actions">
            <Link className="btn-solid" href="/">파노라마 펼치기</Link>
            <PrintButton label="가이드 인쇄" />
          </div>
        </div>
      </section>

      <section className="section weeks" aria-labelledby="weeks-h">
        <div className="wrap">
          <header className="sec-head">
            <p className="sec-num">01</p>
            <h2 id="weeks-h">4주 학습 설계</h2>
          </header>
          <ol className="week-list">
            {WEEKS.map(w => {
              const [from, to] = w.eras
              const keys = ERAS.slice(from - 1, to).map(e => e.key).join('')
              return (
                <li key={w.week}>
                  <div className="wk-head">
                    <p className="wk-no">{w.week}</p>
                    <h3>{w.title}</h3>
                    <p className="wk-keys" aria-label={`해당 장면 ${keys}`}>{keys}</p>
                  </div>
                  <dl className="wk-body">
                    <div><dt>목표</dt><dd>{w.goal}</dd></div>
                    <div><dt>수업 활동</dt><dd>{w.activity}</dd></div>
                    <div><dt>과제</dt><dd>{w.assignment}</dd></div>
                  </dl>
                </li>
              )
            })}
          </ol>
        </div>
      </section>

      <section className="section comp" aria-labelledby="comp-h">
        <div className="wrap">
          <header className="sec-head">
            <p className="sec-num">02</p>
            <h2 id="comp-h">지도자 역량 다섯 가지</h2>
            <p className="sec-lede">각 역량을 파노라마의 실제 장면에서 근거를 찾아 연결했다. 역량은 추상명사가 아니라 사례로 익힌다.</p>
          </header>
          <table className="comp-table">
            <thead><tr><th>역량</th><th>정의</th><th>파노라마 근거</th></tr></thead>
            <tbody>
              {COMPETENCIES.map(c => (
                <tr key={c.name}><td>{c.name}</td><td>{c.desc}</td><td>{c.evidence}</td></tr>
              ))}
            </tbody>
          </table>
        </div>
      </section>

      <section className="section roles-sec" aria-labelledby="roles-h">
        <div className="wrap">
          <header className="sec-head">
            <p className="sec-num">03</p>
            <h2 id="roles-h">청년이 맡을 여섯 가지 역할</h2>
            <p className="sec-lede">4·19의 학생, 40대 기수론, 6월 항쟁의 대학생, 광장의 응원봉. 결정적 장면마다 청년이 있었다.</p>
          </header>
          <div className="roles">
            {ROLES.map((r, i) => (
              <article key={r.title}>
                <p className="role-no">{String(i + 1).padStart(2, '0')}</p>
                <h3>{r.title}</h3>
                <p>{r.body}</p>
                <p className="act">실천 · {r.act}</p>
              </article>
            ))}
          </div>

          <h3 className="sub">청년의 정치적 권리, 이렇게 넓어졌다</h3>
          <table className="rights">
            <thead><tr><th>제도</th><th>변화</th><th>근거 · 시기</th></tr></thead>
            <tbody>
              {RIGHTS.map(r => <tr key={r.item}><td>{r.item}</td><td>{r.change}</td><td>{r.basis}</td></tr>)}
            </tbody>
          </table>
        </div>
      </section>

      <section className="section practice" aria-labelledby="path-h">
        <div className="wrap">
          <header className="sec-head">
            <p className="sec-num">04</p>
            <h2 id="path-h">헤리티지에서 목적까지</h2>
            <p className="sec-lede">배움이 참여로, 참여가 책임으로 이어지는 네 단계.</p>
          </header>
          <ol className="path">
            {PATH.map((p, i) => (
              <li key={p.title}>
                <span className="step">{i + 1}</span>
                <div><h3>{p.title}</h3><p>{p.body}</p></div>
              </li>
            ))}
          </ol>
        </div>
      </section>

      <section className="section asks" aria-labelledby="asks-h">
        <div className="wrap">
          <header className="sec-head">
            <p className="sec-num">05</p>
            <h2 id="asks-h">토론 질문 28선</h2>
            <p className="sec-lede">장면마다 두 문항. 정답이 없는 질문이므로 근거의 질로 평가한다.</p>
          </header>
          <ol className="ask-list">
            {ERAS.map(e => (
              <li key={e.id}>
                <p className="ask-era"><span>{e.key}</span>{e.name}</p>
                <ol>{e.questions.map(q => <li key={q}>{q}</li>)}</ol>
              </li>
            ))}
          </ol>
        </div>
      </section>

      <section className="section books" aria-labelledby="books-h">
        <div className="wrap">
          <header className="sec-head">
            <p className="sec-num">06</p>
            <h2 id="books-h">함께 읽을 책</h2>
          </header>
          <ul className="book-list">
            {BOOKS.map(b => (
              <li key={b.title}>
                <p className="bk-title">{b.title}</p>
                <p className="bk-author">{b.author}</p>
                <p className="bk-note">{b.note}</p>
              </li>
            ))}
          </ul>
        </div>
      </section>

      <section className="section quiz" aria-labelledby="quiz-h">
        <div className="wrap narrow">
          <header className="sec-head">
            <p className="sec-num">07</p>
            <h2 id="quiz-h">점검 퀴즈</h2>
            <p className="sec-lede">열 문항. 선택하면 바로 해설이 나온다.</p>
          </header>
          <Quiz items={QUIZ} />
        </div>
      </section>
    </>
  )
}
