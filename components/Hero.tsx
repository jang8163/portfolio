// components/Hero.tsx
'use client';

import * as React from 'react';
import { motion } from 'framer-motion';

// 아이콘 컴포넌트들
type IconProps = React.SVGProps<SVGSVGElement>;

const ChevronDownIcon: React.FC<IconProps> = (p) => (
  <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" {...p}>
    <path d="m6 9 6 6 6-6" />
  </svg>
);

export default function Hero(): React.JSX.Element {
  // 줄별로 분리
  const lines = [
    "\"상상력을 현실로 구현하며, 협업 속에서\"",
    "\"소통과 집요한 문제해결력을 발휘해\"",
    "\"책임감 있게 성장하는 개발자입니다.\""
  ];

  return (
    <section aria-label="Hero" className="relative h-screen flex flex-col bg-white">
      {/* 이미지 */}
      <div 
        className="absolute inset-0 bg-center bg-no-repeat z-30"
        style={{
          backgroundImage: 'url(/사진-removebg-preview.png)',
          backgroundPosition: 'center 90%',
          backgroundSize: '15%'
        }}
      />
      
      {/* 메인 콘텐츠 영역 - 상단바 바로 아래에 배치 */}
      <motion.div
        className="relative z-20 flex-1 flex flex-col items-center px-4 pb-20"
        style={{ paddingTop: '80px' }}
        initial="hidden"
        animate="visible"
        variants={{
          hidden: { opacity: 0 },
          visible: { opacity: 1, transition: { staggerChildren: 0.3, delayChildren: 1.2 } }
        }}
      >
        {/* 메인 텍스트 - 모핑 애니메이션으로 인트로에서 전환 */}
        <div className="text-center mb-8 relative flex flex-col justify-between" style={{ minHeight: 'clamp(90px, 15vh, 150px)' }}>
          {/* 배경 큰 텍스트 - 인트로에서 자연스럽게 모핑 */}
          <motion.div
            layoutId="background-text"
            className="flex justify-center items-start"
            aria-hidden="true"
            style={{ 
              fontSize: 'clamp(35px, 8vw, 105px)',
              whiteSpace: 'nowrap',
              letterSpacing: '-0.02em'
            }}
            initial={{ opacity: 0.15, y: -40, scale: 2.5 }}
            animate={{ 
              opacity: 0.5, 
              y: 0, 
              scale: 1,
              transition: { 
                duration: 1.0, 
                ease: [0.22, 1, 0.36, 1],
                delay: 0.05
              }
            }}
          >
            <div className="font-extrabold leading-none text-blue-600">
              Creative Technologist
            </div>
          </motion.div>

          {/* 전경 텍스트 - 인트로에서 자연스럽게 모핑 */}
          <motion.h1
            layoutId="main-text"
            className="font-black tracking-tight text-black relative z-0"
            style={{ 
              fontSize: 'clamp(1.32rem, 2.62vw, 2.62rem)',
              lineHeight: 1.2
            }}
            initial={{ 
              scale: 2.5,
              y: -200
            }}
            animate={{ 
              scale: 1,
              y: 0,
              transition: { 
                duration: 1.0, 
                ease: [0.22, 1, 0.36, 1],
                delay: 0.3
              }
            }}
          >
            아이디어를 스케치에서 코드로 옮겨 담는 사람, 장원준입니다.
          </motion.h1>
        </div>

        {/* 줄별로 위에서 아래로 등장하는 텍스트 */}
        <motion.div
          className="absolute bottom-20 right-4"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 3.0, duration: 0.5 }} // 3초 후에 시작
        >
          <div className="flex flex-col justify-center items-end text-lg md:text-xl font-medium tracking-wider" style={{ color: '#101010' }}>
            {lines.map((line, lineIndex) => (
              <motion.div
                key={lineIndex}
                className="flex justify-center items-center"
                initial={{ opacity: 0, y: -50 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{
                  delay: 3.0 + (lineIndex * 0.5), // 각 줄마다 0.5초씩 지연
                  duration: 0.8,
                  ease: [0.22, 1, 0.36, 1]
                }}
              >
                {line.split("").map((letter, letterIndex) => (
                  <motion.span
                    key={`${lineIndex}-${letterIndex}`}
                    initial={{ 
                      opacity: 0, 
                      y: -30,
                      scale: 0.8
                    }}
                    animate={{ 
                      opacity: 1, 
                      y: 0,
                      scale: 1
                    }}
                    transition={{
                      delay: 3.0 + (lineIndex * 0.5) + (letterIndex * 0.05), // 줄 지연 + 글자 지연
                      duration: 0.6,
                      ease: [0.22, 1, 0.36, 1]
                    }}
                    className="inline-block"
                    style={{ 
                      transformOrigin: 'center top'
                    }}
                    dangerouslySetInnerHTML={{ __html: letter === ' ' ? '&nbsp;' : letter }}
                  >
                  </motion.span>
                ))}
              </motion.div>
            ))}
          </div>
        </motion.div>
      </motion.div>

      {/* 개선된 스크롤 표시 - 화면 하단에 고정 */}
      <motion.div
        className="relative z-40 absolute bottom-0 left-1/2 transform -translate-x-1/2 flex flex-col items-center"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 8.0, duration: 0.8 }} // 모든 애니메이션 완료 후 등장
      >
        {/* 스크롤 텍스트 */}
        <motion.p 
          className="text-sm mb-3 font-medium tracking-wide px-3 py-1 rounded-full bg-blue-600"
          style={{ 
            color: 'white',
            opacity: 0.5
          }}
          animate={{ opacity: [0.3, 0.5, 0.3] }}
          transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
        >
          SCROLL DOWN
        </motion.p>
        
        {/* 스크롤 인디케이터 */}
        <motion.div 
          className="relative w-6 h-10 border-2 rounded-full flex justify-center"
          style={{ 
            borderColor: '#1A3A6B',
            backgroundColor: 'white',
            padding: '2px'
          }}
          animate={{ 
            borderColor: ["rgba(26, 58, 107, 0.6)", "rgba(26, 58, 107, 0.9)", "rgba(26, 58, 107, 0.6)"]
          }}
          transition={{ duration: 2, repeat: Infinity }}
        >
          <motion.div 
            className="w-1 h-2 rounded-full mt-2"
            style={{ backgroundColor: '#1A3A6B' }}
            animate={{ y: [0, 16, 0], opacity: [1, 0, 1] }}
            transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
          />
        </motion.div>
        
        {/* 아래 화살표들 */}
        <div className="flex flex-col items-center mt-4 space-y-1">
          <motion.div
            animate={{ y: [0, 8, 0], opacity: [0.6, 1, 0.6] }}
            transition={{ duration: 1.5, repeat: Infinity, ease: "easeInOut" }}
          >
            <ChevronDownIcon className="w-6 h-6" style={{ color: '#1A3A6B' }} />
          </motion.div>
          <motion.div
            animate={{ y: [0, 8, 0], opacity: [0.4, 0.9, 0.4] }}
            transition={{ duration: 1.5, repeat: Infinity, ease: "easeInOut", delay: 0.2 }}
          >
            <ChevronDownIcon className="w-5 h-5" style={{ color: '#1A3A6B' }} />
          </motion.div>
          <motion.div
            animate={{ y: [0, 8, 0], opacity: [0.2, 0.7, 0.2] }}
            transition={{ duration: 1.5, repeat: Infinity, ease: "easeInOut", delay: 0.4 }}
          >
            <ChevronDownIcon className="w-4 h-4" style={{ color: '#1A3A6B' }} />
          </motion.div>
        </div>
      </motion.div>
    </section>
  );
}