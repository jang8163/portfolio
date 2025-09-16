// app/page.tsx
'use client';

import { LayoutGroup } from 'framer-motion';
import IntroOverlay from '@/components/IntroOverlay';
import StickyHome from '@/components/StickyHome';
import FloatingActions from '@/components/FloatingActions';

export default function Home() {
  return (
    <LayoutGroup>
      {/* 인트로: 중앙 문구 → 종료 시 Home 상단으로 자연 안착 (불투명 오버레이) */}
      <IntroOverlay />

      {/* 스크롤 한 번에: Home 고정 + About + 모든 후속 섹션들이 하나의 레이어 */}
      <main id="main-content">
        <StickyHome />
      </main>

      {/* 플로팅 액션 버튼들 */}
      <FloatingActions />
    </LayoutGroup>
  );
}