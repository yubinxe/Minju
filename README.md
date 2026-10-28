# 민주 파노라마

더불어민주당 70년(1955 — 현재)을 열네 장면으로 펼친 학습 자료. 민주청년지도자 양성과정 수강생 참고용 독립 자료이며 공식 교재가 아님.

## 구성

| 경로 | 내용 |
| --- | --- |
| `/` | 파노라마 차트(가로 스크롤 · 미니맵 · 방향키), 암송표, 다섯 줄기. A3 가로 한 장 벽면 차트로 인쇄 |
| `/archive` | 장면별 상세 연대기, 당명 계보, 참고 자료 |
| `/course` | 4주 학습 설계, 지도자 역량, 청년의 여섯 역할, 토론 질문 28선, 점검 퀴즈 |

콘텐츠는 `data/eras.ts`, `data/course.ts` 한 곳에서 관리한다. 세 페이지가 같은 데이터를 읽는다.

## 기술

- Next.js 16 App Router · React 19 Server Components — 전 페이지 정적 생성(SSG)
- React Compiler — 자동 메모이제이션
- TypeScript strict · typed routes
- CSS: cascade layers, subgrid(행 정렬 차트), container queries, scroll-driven animations, `text-wrap: pretty`, named print pages(`@page chart` A3)
- 폰트: Noto Serif KR(`next/font` 자체 호스팅) · Pretendard 동적 서브셋(npm, 자체 호스팅)
- `next/og` 정적 OG 이미지, sitemap · robots · JSON-LD(LearningResource)
- Vercel Analytics · Speed Insights(대시보드에서 활성화 시 동작)

## 실행

```bash
npm install
npm run dev      # http://localhost:3000
npm run build
```

## 배포

Vercel에서 이 저장소를 Import하면 프레임워크(Next.js)가 자동 감지된다. `main` 푸시마다 프로덕션 배포.

### 정적 호스팅(GitHub Pages)

```bash
STATIC_EXPORT=1 BASE_PATH=/Minju SITE_URL=https://yubinxe.github.io/Minju npm run build   # → out/
```

`out/` 내용(+ `.nojekyll`)을 `gh-pages` 브랜치에 올리면 https://yubinxe.github.io/Minju/ 로 서비스된다.
