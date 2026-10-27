import Link from 'next/link'
import { ERAS, MNEMONIC, THREADS } from '@/data/eras'
import { PanoramaChart } from '@/components/PanoramaChart'
import { PrintButton } from '@/components/PrintButton'

export default function Home() {
  return (
    <>
      <section className="hero">
        <div className="wrap">
          <p className="eyebrow">민주청년지도자 양성과정 참고 자료 · 1955 — 2026</p>
          <h1>민주 파노라마</h1>
          <p className="hero-lede">
            일흔 해를 열네 장면으로 접어 한 장에 펼쳤다. 사건을 하나씩 외우기 전에 흐름 전체를 먼저 본다.
            흐름이 보이면 사건은 저절로 제자리를 찾는다.
          </p>
          <div className="mnemo" aria-label="암송: 창혁기유 광항재교 참시촛포 주청">
            {MNEMONIC.map((g, gi) => (
              <span key={g} className="mnemo-group">
                {[...g].map((ch, ci) => {
                  const idx = MNEMONIC.slice(0, gi).join('').length + ci
                  return (
                    <a key={ch + ci} href={`#era-${idx + 1}`} className={idx === 13 ? 'last' : ''} title={ERAS[idx].name}>
                      {ch}
                    </a>
                  )
                })}
              </span>
            ))}
          </div>
          <p className="mnemo-cap">각 장면의 첫 글자. 네 박자로 외운다 — 창혁기유 · 광항재교 · 참시촛포 · 주청</p>
        </div>
      </section>

      <section className="howto" aria-labelledby="howto-h">
        <div className="wrap howto-grid">
          <h2 id="howto-h" className="howto-title">읽는 법</h2>
          <dl className="howto-list">
            <div><dt>흐름</dt><dd>맨 윗줄은 정당의 위치다. <span className="key-gov" /> 집권 <span className="key-opp" /> 야당</dd></div>
            <div><dt>세로로</dt><dd>한 장면을 위에서 아래로 읽으면 인물·사건·문장·교훈이 이어진다.</dd></div>
            <div><dt>가로로</dt><dd>한 줄을 왼쪽에서 오른쪽으로 읽으면 같은 주제가 70년 동안 어떻게 변했는지 보인다.</dd></div>
            <div><dt>이동</dt><dd>끌기, 가로 스크롤, 방향키(← →), 또는 위의 미니맵을 누른다.</dd></div>
          </dl>
          <div className="howto-actions">
            <PrintButton label="A3 벽면 차트로 인쇄" />
          </div>
        </div>
      </section>

      <section className="pano-section" aria-label="파노라마 차트">
        <PanoramaChart />
      </section>

      <section className="section recite" aria-labelledby="recite-h">
        <div className="wrap">
          <header className="sec-head">
            <p className="sec-num">암송표</p>
            <h2 id="recite-h">열네 글자, 열네 문장</h2>
            <p className="sec-lede">한 글자에 한 문장을 붙여 외운다. 강의 전 5분, 이 표를 소리 내어 읽는 것으로 시작하길 권한다.</p>
          </header>
          <ol className="recite-list">
            {ERAS.map(e => (
              <li key={e.id} className={e.status === 'future' ? 'future' : ''}>
                <a href={`#era-${e.no}`}>
                  <span className="r-key">{e.key}</span>
                  <span className="r-body">
                    <b>{e.name}<i>{e.years}</i></b>
                    <span>{e.thesis}</span>
                  </span>
                </a>
              </li>
            ))}
          </ol>
        </div>
      </section>

      <section className="section strands" aria-labelledby="strands-h">
        <div className="wrap">
          <header className="sec-head">
            <p className="sec-num">다섯 줄기</p>
            <h2 id="strands-h">70년을 꿰는 실</h2>
            <p className="sec-lede">파노라마의 일곱 번째 줄을 가로로 읽은 결과다. 어떤 줄기는 끊기지 않았고, 어떤 줄기는 위기 때만 굵어졌다.</p>
          </header>
          <div className="strand-list">
            {THREADS.map(t => {
              const hits = ERAS.filter(e => e.status !== 'future' && e.threads.includes(t.id))
              return (
                <article key={t.id}>
                  <h3>{t.name}</h3>
                  <p>{t.desc}</p>
                  <ol className="strand-track" aria-label={`${t.name} 줄기가 두드러진 장면`}>
                    {ERAS.slice(0, 13).map(e => (
                      <li key={e.id} className={e.threads.includes(t.id) ? 'on' : ''} title={e.name}>{e.key}</li>
                    ))}
                  </ol>
                  <p className="strand-count">{hits.length} / 13 장면</p>
                </article>
              )
            })}
          </div>
        </div>
      </section>

      <section className="section next-links">
        <div className="wrap next-grid">
          <Link href="/archive" className="next-card">
            <span className="nc-eyebrow">더 깊이</span>
            <span className="nc-title">연대기</span>
            <span className="nc-body">열네 장면의 사건을 맥락과 함께 읽는다. 당명 계보와 남겨진 문장 수록.</span>
            <span className="nc-arrow" aria-hidden="true">→</span>
          </Link>
          <Link href="/course" className="next-card">
            <span className="nc-eyebrow">수강생용</span>
            <span className="nc-title">과정 가이드</span>
            <span className="nc-body">4주 학습 설계, 지도자 역량, 청년의 여섯 역할, 토론 질문 28선, 점검 퀴즈.</span>
            <span className="nc-arrow" aria-hidden="true">→</span>
          </Link>
        </div>
      </section>
    </>
  )
}
