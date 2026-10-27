import type { Metadata } from 'next'
import { ERAS, LINEAGE } from '@/data/eras'

export const metadata: Metadata = {
  title: '연대기',
  description: '민주 파노라마 열네 장면의 사건을 맥락과 함께 읽는 연대기. 당명 계보 수록.',
}

export default function Archive() {
  const history = ERAS.filter(e => e.status !== 'future')
  return (
    <>
      <section className="page-head">
        <div className="wrap">
          <p className="eyebrow">연대기 · 열세 장면의 상세</p>
          <h1>사건의 맥락</h1>
          <p className="hero-lede">파노라마가 지도라면 연대기는 길 안내다. 사실은 본문으로, 해석은 ‘지도자 레슨’으로 따로 표기했다.</p>
          <nav className="jump" aria-label="장면 바로가기">
            {history.map(e => <a key={e.id} href={`#a-${e.no}`} title={`${e.name} ${e.years}`}>{e.key}</a>)}
            <a href="#lineage" className="jump-text">당명 계보</a>
          </nav>
        </div>
      </section>

      {history.map(e => (
        <section key={e.id} id={`a-${e.no}`} className="section hall">
          <div className="wrap hall-grid">
            <aside className="hall-label">
              <p className="hall-no">제{e.no}장면 · {e.statusNote}</p>
              <h2><span className="hall-key" aria-hidden="true">{e.key}</span>{e.name}</h2>
              <p className="hall-years">{e.years}</p>
              <p className="hall-thesis">{e.thesis}</p>
              <p className="hall-people">{e.people.join(' · ')}</p>
            </aside>
            <div>
              <ol className="events">
                {e.events.map(ev => (
                  <li key={ev.date + ev.title}>
                    <time>{ev.date}</time>
                    <h3>{ev.title}</h3>
                    <p>{ev.desc}</p>
                  </li>
                ))}
              </ol>
              <figure className="hall-phrase">
                <blockquote>{e.phrase.text}</blockquote>
                <figcaption>{e.phrase.kind} · {e.phrase.source}</figcaption>
              </figure>
              <p className="note"><b>지도자 레슨</b>{e.lesson}</p>
            </div>
          </div>
        </section>
      ))}

      <section id="lineage" className="section lineage">
        <div className="wrap">
          <header className="sec-head light">
            <p className="sec-num">당명 계보</p>
            <h2>이름은 바뀌어도 줄기는 이어졌다</h2>
            <p className="sec-lede">주요 정당명만 추린 계보이며, 분당·합당의 세부 경로는 생략했다.</p>
          </header>
          <ol className="tree">
            {LINEAGE.map((l, i) => (
              <li key={l.year + l.name} className={i === LINEAGE.length - 1 ? 'now' : ''}>
                <time>{l.year}</time><b>{l.name}</b><span>{l.note}</span>
              </li>
            ))}
          </ol>
        </div>
      </section>

      <section className="section sources">
        <div className="wrap">
          <header className="sec-head">
            <p className="sec-num">참고 자료</p>
            <h2>원문으로 확인하기</h2>
          </header>
          <ul className="src-list">
            <li><a href="https://theminjoo.kr" target="_blank" rel="noopener noreferrer">더불어민주당 공식 홈페이지</a><span>강령 · 당헌 · 당사</span></li>
            <li><a href="https://encykorea.aks.ac.kr" target="_blank" rel="noopener noreferrer">한국민족문화대백과사전</a><span>정당사 · 사건 항목</span></li>
            <li><a href="https://www.archives.go.kr" target="_blank" rel="noopener noreferrer">국가기록원</a><span>사료 · 대통령기록</span></li>
            <li><a href="https://info.nec.go.kr" target="_blank" rel="noopener noreferrer">중앙선거관리위원회 선거통계시스템</a><span>역대 선거 결과</span></li>
            <li><a href="https://www.law.go.kr" target="_blank" rel="noopener noreferrer">국가법령정보센터</a><span>헌법 · 공직선거법 · 정당법</span></li>
            <li><a href="https://www.518.org" target="_blank" rel="noopener noreferrer">5·18기념재단</a><span>5·18 민주화운동</span></li>
            <li><a href="https://www.kdemo.or.kr" target="_blank" rel="noopener noreferrer">민주화운동기념사업회</a><span>민주화운동 아카이브</span></li>
          </ul>
        </div>
      </section>
    </>
  )
}
