import Link from 'next/link'

export default function NotFound() {
  return (
    <section className="page-head nf">
      <div className="wrap">
        <p className="eyebrow">404</p>
        <h1>아직 쓰이지 않은 장면</h1>
        <p className="hero-lede">찾는 페이지가 없습니다. 파노라마로 돌아가 흐름을 다시 짚어 보십시오.</p>
        <div className="head-actions"><Link className="btn-solid" href="/">파노라마로</Link></div>
      </div>
    </section>
  )
}
