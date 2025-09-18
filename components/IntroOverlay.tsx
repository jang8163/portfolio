'use client';

import { useEffect, useRef, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

type Props = {
  durationMs?: number; // 인트로 유지 총 시간 (기본 2400ms)
};

export default function IntroOverlay({ durationMs = 2400 }: Props) {
  const [open, setOpen] = useState(true);
  const prevOverflow = useRef<{ body: string; html: string }>({ body: '', html: '' });

  useEffect(() => {
    document.body.classList.add('intro-active');
    document.body.classList.remove('intro-done');

    const close = () => {
      setTimeout(() => {
        setOpen(false);
        document.body.classList.remove('intro-active');
        document.body.classList.add('intro-done');
      }, 800);
    };

    if (open) {
      prevOverflow.current.body = document.body.style.overflow;
      prevOverflow.current.html = document.documentElement.style.overflowY;
      document.body.style.overflow = 'hidden';
      document.documentElement.style.overflowY = 'hidden';

      window.addEventListener('wheel', close, { passive: true });
      window.addEventListener('touchstart', close, { passive: true });
      window.addEventListener('click', close);
      window.addEventListener('keydown', close);

      const timer = setTimeout(close, durationMs);

      return () => {
        clearTimeout(timer);
        window.removeEventListener('wheel', close);
        window.removeEventListener('touchstart', close);
        window.removeEventListener('click', close);
        window.removeEventListener('keydown', close);
      };
    } else {
      document.body.style.overflow = prevOverflow.current.body;
      document.documentElement.style.overflowY = prevOverflow.current.html;
    }
  }, [open, durationMs]);

  if (!open) return null;

  return (
    <AnimatePresence>
      <motion.div
        key="intro-overlay"
        className="fixed inset-0 z-[200] bg-background flex items-center justify-center"
        initial={{ opacity: 1 }}
        exit={{ 
          opacity: 0,
        }}
        transition={{ 
          duration: 0.8, 
          ease: [0.22, 1, 0.36, 1]
        }}
      >
        <div className="relative w-full max-w-6xl px-6 text-center">
          {/* 1단계: 중앙 앞쪽 문구 - layoutId로 Hero와 연결 */}
          <motion.div
            layoutId="main-text"
            className="relative z-10"
            initial={{ y: 24, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            exit={{ 
              fontSize: 'clamp(0.94rem, 1.87vw, 1.87rem)',
              y: 200,
              transition: { duration: 0.8, ease: [0.22, 1, 0.36, 1] }
            }}
            transition={{ duration: 0.6, ease: 'easeOut' }}
          >
            <div className="text-2xl md:text-4xl font-bold tracking-tight text-foreground">
              아이디어를 스케치에서 코드로 옮겨 담는 사람, 장원준입니다.
            </div>
          </motion.div>

          {/* 2단계: 1초 뒤, 뒤쪽에 크게 - layoutId로 Hero와 연결 */}
          <motion.div
            layoutId="background-text"
            className="absolute inset-0 flex items-center justify-center select-none"
            initial={{ opacity: 0, scale: 0.96, y: 0 }}
            animate={{ opacity: 1, scale: 1, y: -40 }}
            exit={{
              fontSize: 'clamp(38px, 9.4vw, 112px)',
              y: -100,
              transition: { duration: 0.8, ease: [0.22, 1, 0.36, 1] }
            }}
            transition={{ delay: 1.0, duration: 0.7, ease: 'easeOut' }}
            aria-hidden
          >
            <div
              className="font-extrabold leading-none"
              style={{
                fontSize: 'clamp(45px, 11vw, 130px)',
                whiteSpace: 'nowrap',
                overflow: 'visible',
                wordBreak: 'keep-all',
                maxWidth: '100vw',
                padding: '0 20px',
                color: '#93C5FD'
              }}
            >
              Creative Technologist
            </div>
          </motion.div>

          {/* 스크롤 또는 클릭하여 시작 안내 */}
          <motion.div
            className="absolute bottom-8 left-1/2 transform -translate-x-1/2"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 20 }}
            transition={{ delay: 2.0, duration: 0.6 }}
          >
            <div className="text-sm text-muted-foreground">
              스크롤 또는 클릭하여 시작
            </div>
          </motion.div>
        </div>
      </motion.div>
    </AnimatePresence>
  );
}