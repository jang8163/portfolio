// components/ScrollUnlock.tsx
'use client';

import { useEffect } from 'react';

export default function ScrollUnlock() {
  useEffect(() => {
    const html = document.documentElement;
    const body = document.body;

    // 잠금 흔적 제거
    body.style.overflow = '';
    html.style.overflowY = '';
  }, []);

  return null;
}
