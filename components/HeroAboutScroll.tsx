// components/HeroAboutScroll.tsx
'use client';

import { useRef } from 'react';
import { motion, useScroll, useTransform } from 'framer-motion';
import Hero from './Hero';
import Container from './Container';

const STAGE_H = '280vh';
const ABOUT_START_Y = '60vh';
const ABOUT_END_Y = '0vh';
const ABOUT_EXTRA_PB = '35vh';

export default function HeroAboutScroll() {
  const stageRef = useRef<HTMLDivElement | null>(null);

  const { scrollYProgress } = useScroll({
    target: stageRef,
    offset: ['start start', 'end start'],
  });

  const heroOpacity = useTransform(scrollYProgress, [0, 0.4, 0.8], [1, 0.8, 0]);
  const aboutY = useTransform(scrollYProgress, [0, 1], [ABOUT_START_Y, ABOUT_END_Y]);
  const aboutOpacity = useTransform(scrollYProgress, [0.1, 0.4], [0, 1]);

  return (
    <section id="home" ref={stageRef} className="relative bg-background" style={{ height: STAGE_H }}>
      {/* sticky Hero */}
      <div className="sticky top-0 h-screen flex items-center">
        <motion.div style={{ opacity: heroOpacity }} className="w-full">
          <Hero />
        </motion.div>
      </div>

      {/* 올라오는 About (이 파일 안에만 존재) */}
      <motion.section
        id="about"
        aria-label="About"
        className="pointer-events-none absolute inset-0 flex items-end scroll-mt-24"
        style={{ y: aboutY, opacity: aboutOpacity }}
      >
        <div className="pointer-events-auto w-full">
          <div
            className="bg-muted pt-[--spacing-section] pb-[--spacing-section]"
            style={{ paddingBottom: ABOUT_EXTRA_PB }}
          >
            <Container>
              <h2 className="text-3xl md:text-4xl font-bold text-center mb-12">About Me</h2>
              <div className="grid md:grid-cols-2 gap-12 items-center">
                <div>
                  <p className="text-lg text-muted-foreground mb-6">
                    저는 5년 이상의 경험을 가진 풀스택 개발자입니다.
                    React, Next.js, Node.js, Python 등을 활용하여 사용자 중심의 웹 애플리케이션을 개발하고 있습니다.
                  </p>
                  <p className="text-lg text-muted-foreground">
                    지속적인 학습과 성장을 통해 최신 기술 트렌드를 따라가며, 팀워크와 소통을 중시합니다.
                  </p>
                </div>
                <div className="bg-accent p-8 rounded-xl">
                  <p className="text-center text-muted-foreground">[프로필 이미지 또는 아바타가 들어갈 자리]</p>
                </div>
              </div>
            </Container>
          </div>
        </div>
      </motion.section>
    </section>
  );
}
