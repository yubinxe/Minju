(() => {
  const head = document.querySelector('.masthead');
  const bar = document.querySelector('.progress span');
  const nav = document.getElementById('nav');
  const toggle = document.querySelector('.nav-toggle');

  const onScroll = () => {
    const h = document.documentElement;
    const max = h.scrollHeight - h.clientHeight;
    bar.style.width = (max > 0 ? (h.scrollTop / max) * 100 : 0) + '%';
    head.classList.toggle('scrolled', h.scrollTop > 8);
  };
  addEventListener('scroll', onScroll, { passive: true });
  onScroll();

  toggle.addEventListener('click', () => {
    const open = nav.classList.toggle('open');
    toggle.setAttribute('aria-expanded', open);
    toggle.textContent = open ? '닫기' : '목차';
  });
  nav.addEventListener('click', e => {
    if (e.target.tagName === 'A' && nav.classList.contains('open')) toggle.click();
  });

  // active nav: halls 1-5 map to the 연대기 link
  const links = [...nav.querySelectorAll('a')];
  const linkFor = id => links.find(a => a.getAttribute('href') === '#' + (id.startsWith('hall-') ? 'hall-1' : id));
  const spy = new IntersectionObserver(entries => {
    entries.forEach(en => {
      if (!en.isIntersecting) return;
      const l = linkFor(en.target.id);
      links.forEach(a => a.classList.toggle('active', a === l));
    });
  }, { rootMargin: '-45% 0px -50% 0px' });
  document.querySelectorAll('main section[id]').forEach(s => spy.observe(s));

  // reveal
  const targets = document.querySelectorAll('.events li, .route li, .tree li, .spirit-list article, .quotes figure, .roles article, .path li, .youth-history li');
  if ('IntersectionObserver' in window && !matchMedia('(prefers-reduced-motion: reduce)').matches) {
    const io = new IntersectionObserver(entries => {
      entries.forEach(en => {
        if (en.isIntersecting) { en.target.classList.add('in'); io.unobserve(en.target); }
      });
    }, { rootMargin: '0px 0px -8% 0px' });
    targets.forEach(t => { t.classList.add('reveal'); io.observe(t); });
  }

  // quiz
  const QUIZ = [
    { q: '더불어민주당이 기원으로 삼는 민주당 창당 연도는?',
      o: ['1948년', '1955년', '1967년', '1987년'], a: 1,
      e: '1955년 9월 18일. 사사오입 개헌에 맞선 반독재 야권 통합으로 창당되었다.' },
    { q: '헌정사 최초의 선거에 의한 여야 정권교체가 이뤄진 대선은?',
      o: ['1987년 13대', '1992년 14대', '1997년 15대', '2002년 16대'], a: 2,
      e: '1997년 12월 18일 제15대 대선. 김대중 후보가 당선되었다.' },
    { q: '2002년 새천년민주당이 한국 정당사 최초로 도입한 제도는?',
      o: ['국민참여경선', '모바일 투표', '비례대표제', '권역별 공천'], a: 0,
      e: '당원뿐 아니라 일반 국민이 대선 후보 선출에 참여한 국민참여경선. 노무현 후보가 선출되었다.' },
    { q: '현재 정당에 가입할 수 있는 최저 연령은?',
      o: ['만 14세', '만 16세', '만 18세', '만 19세'], a: 1,
      e: '2022년 정당법 개정으로 만 16세. 만 18세 미만은 법정대리인 동의가 필요하다.' },
    { q: '“민주주의 최후의 보루는 깨어 있는 시민의 조직된 힘입니다.” 이 문장이 새겨진 곳은?',
      o: ['국회 본회의장', '국립5·18민주묘지', '노무현 전 대통령 묘역 너럭바위', '김대중도서관'], a: 2,
      e: '봉하마을 노무현 전 대통령 묘역의 너럭바위 비문이다.' }
  ];
  const root = document.getElementById('quiz-root');
  const scoreEl = document.getElementById('quiz-score');
  let answered = 0, correct = 0;

  QUIZ.forEach((item, i) => {
    const box = document.createElement('div');
    box.className = 'q';
    box.innerHTML = `<p class="q-title"><span>${String(i + 1).padStart(2, '0')}</span>${item.q}</p><div class="q-opts" role="group"></div>`;
    const opts = box.querySelector('.q-opts');
    item.o.forEach((label, j) => {
      const b = document.createElement('button');
      b.type = 'button';
      b.textContent = label;
      b.addEventListener('click', () => {
        const all = opts.querySelectorAll('button');
        all.forEach(x => x.disabled = true);
        all[item.a].classList.add('right');
        if (j !== item.a) b.classList.add('wrong'); else correct++;
        const exp = document.createElement('p');
        exp.className = 'q-exp';
        exp.textContent = item.e;
        box.appendChild(exp);
        answered++;
        if (answered === QUIZ.length) {
          scoreEl.textContent = `${QUIZ.length}문항 중 ${correct}문항 정답. ` +
            (correct === QUIZ.length ? '계보를 정확히 이해했다.' : '해당 전시실을 다시 둘러보길 권한다.');
        }
      });
      opts.appendChild(b);
    });
    root.appendChild(box);
  });
})();
