// hooks/useScrollSpy.ts
'use client';

import { useEffect, useState } from 'react';

type Options = {
  ids: string[];
  rootMargin?: string;
  thresholds?: number[];
};

export default function useScrollSpy({
  ids,
  rootMargin = '0px 0px -50% 0px',
  thresholds = [0.1, 0.5],
}: Options) {
  const [activeId, setActiveId] = useState<string>(ids[0] ?? '');

  useEffect(() => {
    if (!ids.length) return;

    const handleScroll = () => {
      const scrollY = window.scrollY;
      const windowHeight = window.innerHeight;
      
      // 각 섹션의 위치 확인
      for (let i = ids.length - 1; i >= 0; i--) {
        const id = ids[i];
        const element = document.getElementById(id);
        
        if (element) {
          const rect = element.getBoundingClientRect();
          const elementTop = rect.top + scrollY;
          const elementHeight = rect.height;
          
          // 섹션이 화면 상단에서 100px 아래로 내려왔을 때 활성화
          if (scrollY >= elementTop - 100 && scrollY < elementTop + elementHeight - 100) {
            if (activeId !== id) {
              setActiveId(id);
            }
            break;
          }
        }
      }
    };

    // 초기 상태 설정
    handleScroll();
    
    // 스크롤 이벤트 리스너 등록
    window.addEventListener('scroll', handleScroll, { passive: true });
    
    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, [ids, activeId]);

  return activeId;
}