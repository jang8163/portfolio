// components/StartAtHome.tsx
'use client';

import { useEffect } from 'react';

export default function StartAtHome() {
  useEffect(() => {
    // 브라우저의 자동 스크롤 복원 끄기
    if ('scrollRestoration' in window.history) {
      const prev = window.history.scrollRestoration;
      window.history.scrollRestoration = 'manual';
      // 언마운트 시 원복(선택사항)
      return () => {
        window.history.scrollRestoration = prev;
      };
    }
  }, []);

  useEffect(() => {
    // URL에 해시(#about 등)가 붙어 있어도 무조건 홈에서 시작
    if (window.location.hash && window.location.hash !== '#home') {
      window.history.replaceState(null, '', window.location.pathname);
    }
    // 최상단으로 이동
    window.scrollTo({ top: 0, left: 0, behavior: 'auto' });
  }, []);

  return null;
}
