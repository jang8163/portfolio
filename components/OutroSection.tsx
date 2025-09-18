// components/OutroSection.tsx
'use client';

import { useRef } from 'react';
import { motion, useInView } from 'framer-motion';

export default function OutroSection() {
  const sectionRef = useRef<HTMLDivElement | null>(null);
  const isInView = useInView(sectionRef, { once: false, amount: 0.3 });

  return (
    <section 
      ref={sectionRef}
      className="min-h-screen flex items-center justify-center relative overflow-hidden"
      style={{
        background: 'linear-gradient(to bottom, #2B5DD8 0%, #2B5DD8 30%, #2B5DD8 70%, #1A4BC7 100%)'
      }}
    >
      {/* 배경 패턴 */}
      <div className="absolute inset-0 opacity-10">
        <div className="absolute inset-0" style={{
          backgroundImage: `radial-gradient(circle at 25% 25%, white 2px, transparent 2px),
                           radial-gradient(circle at 75% 75%, white 2px, transparent 2px)`,
          backgroundSize: '100px 100px'
        }} />
      </div>

      <div className="text-center px-6 relative z-10 max-w-4xl">
        {/* Thank You 메인 텍스트 */}
        <div className="mb-8 relative">
          {/* 배경 대형 텍스트 */}
          <motion.div 
            className="absolute inset-0 flex items-center justify-center select-none"
            aria-hidden="true"
            initial={{ opacity: 0, scale: 0.8 }}
            animate={isInView ? { opacity: 1, scale: 1 } : { opacity: 0, scale: 0.8 }}
            transition={{ duration: 1.5, delay: 0.2 }}
          >
            <span 
              className="font-extrabold text-white/5 leading-none whitespace-nowrap"
              style={{ fontSize: 'clamp(100px, 20vw, 300px)' }}
            >
              Thank You
            </span>
          </motion.div>
          
          {/* 전경 텍스트 */}
          <motion.h1 
            className="relative text-4xl md:text-6xl lg:text-7xl font-bold text-white leading-tight"
            initial={{ opacity: 0, y: 50 }}
            animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 50 }}
            transition={{ duration: 1, delay: 0.5 }}
          >
            Thank You
          </motion.h1>
        </div>

        {/* 한글 텍스트 */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 30 }}
          transition={{ duration: 0.8, delay: 1 }}
          className="mb-12"
        >
          <p className="text-xl md:text-2xl text-blue-100 font-medium">
            봐주셔서 감사합니다 :)
          </p>
        </motion.div>

        {/* 설명 텍스트 */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 30 }}
          transition={{ duration: 0.8, delay: 1.3 }}
          className="space-y-4 mb-16"
        >
          <p className="text-base md:text-lg text-blue-200 leading-relaxed">
            프론트엔드 개발자로 성장하기 위해 낮선 기술에도 적극적으로 도전하고,
          </p>
          <p className="text-base md:text-lg text-blue-200 leading-relaxed">
            항상 사용자의 관점에서 생각하며 사용하기 좋은 서비스를 만들고 싶습니다.
          </p>
        </motion.div>

        {/* 연락처 정보 */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 30 }}
          transition={{ duration: 0.8, delay: 1.6 }}
        >
          <div className="inline-flex items-center space-x-3 px-6 py-3 bg-white/10 backdrop-blur-sm rounded-full border border-white/20 hover:bg-white/20 transition-colors">
            <svg className="w-5 h-5 text-blue-200" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 4.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
            </svg>
            <span className="text-blue-100 font-medium">helios8163@gmail.com</span>
          </div>
        </motion.div>
      </div>

      {/* 간단한 파티클 효과 */}
      <div className="absolute inset-0 pointer-events-none">
        {[...Array(15)].map((_, i) => {
          // 고정된 위치 계산 (Math.random() 대신 인덱스 기반)
          const left = 20 + (i * 4) % 60;
          const top = 20 + (i * 3) % 60;
          const duration = 4 + (i % 3);
          const delay = (i % 4) * 0.5;
          
          return (
            <motion.div
              key={i}
              className="absolute w-1 h-1 bg-white rounded-full"
              style={{
                left: `${left}%`,
                top: `${top}%`,
              }}
              animate={{
                opacity: [0, 0.6, 0],
                scale: [0, 1, 0],
                y: [0, -30, 0],
              }}
              transition={{
                duration,
                repeat: Infinity,
                delay,
                ease: "easeInOut"
              }}
            />
          );
        })}
      </div>

    </section>
  );
}