// components/StickyHome.tsx
'use client';

import { useRef, useEffect, useState } from 'react';
import { motion, useScroll, useTransform, useInView, AnimatePresence } from 'framer-motion';
import Image from 'next/image';
import Hero from '@/components/Hero';
import NavBar from '@/components/NavBar';

/**
 * 고정 스테이지(150vh) 안에서: About Me만 포함하고 높이 최소화
 * - 상층(absolute) Hero(Home)는 sticky로 '고정'
 * - About 시트는 y: 80% → 0% 으로 스크롤에 따라 위로 슬라이드
 * 결과: Home이 고정된 상태에서 스크롤 시 About이 위로 덮어 올라오는 느낌
 */
export default function StickyHome() {
  const stageRef = useRef<HTMLDivElement | null>(null);
  const thankYouRef = useRef<HTMLDivElement | null>(null);
  const [showNavBar, setShowNavBar] = useState(false);
  const [isProjectModalOpen, setIsProjectModalOpen] = useState(false);
  const [selectedProject, setSelectedProject] = useState<number | null>(null);
  const [selectedImage, setSelectedImage] = useState<string | null>(null);
  
  const isThankYouInView = useInView(thankYouRef, { once: false, amount: 0.3 });

  // 3초 후에 네비게이션 바 표시 (인트로 완료 후)
  useEffect(() => {
    const timer = setTimeout(() => {
      setShowNavBar(true);
    }, 3000); // 인트로 시간(2400ms) + 여유(600ms)

    return () => clearTimeout(timer);
  }, []);

  // 스크롤 진행도: 스테이지 시작(start start) → 끝(end start)
  const { scrollYProgress } = useScroll({
    target: stageRef,
    offset: ['start start', 'end start'],
  });

  // About 시트 위치: 아래(80%) → 제자리(0%) - 더 빨리 나타남
  const aboutY = useTransform(scrollYProgress, [0, 1], ['80%', '0%']);

  return (
    <>
      <div ref={stageRef} className="relative h-[150vh]">
        {/* 네비게이션 바 - 인트로 완료 후에만 표시 */}
        <motion.div
          className="fixed top-0 left-0 right-0 z-[100]"
          initial={{ opacity: 0, y: -20 }}
          animate={{ 
            opacity: showNavBar ? 1 : 0,
            y: showNavBar ? 0 : -20
          }}
          transition={{ duration: 0.5, ease: 'easeOut' }}
        >
          <NavBar />
        </motion.div>

        {/* HOME (고정, sticky) - home 섹션 ID 추가 */}
        <div id="home" className="sticky top-0 h-screen overflow-hidden">
          <Hero />
        </div>

        {/* ABOUT + 모든 후속 섹션들이 하나의 연속된 레이어 */}
        <motion.div
          style={{ y: aboutY }}
          className="absolute inset-0 z-20 bg-[#7CA7F7] border-t border-[#6B96E6] shadow-[0_-8px_24px_rgba(0,0,0,0.08)]"
        >
          {/* About Me 섹션 - 컴팩트한 높이, 상단바 공간 확보 */}
          <section id="about" className={`scroll-mt-24 bg-[#7CA7F7] py-12 ${showNavBar ? 'pt-24' : 'pt-12'}`}>
            <div className="mx-auto max-w-4xl px-4">
              {/* About Me 제목 - 왼쪽 정렬 */}
              <h2 className="text-3xl md:text-4xl font-bold text-left mb-8 text-white">About Me</h2>
              
              {/* 프로필 이미지 섹션 */}
              <div className="flex flex-col md:flex-row items-center md:items-start gap-8 mb-12">
                {/* 프로필 이미지 */}
                <motion.div
                  initial={{ opacity: 0, scale: 0.8 }}
                  whileInView={{ opacity: 1, scale: 1 }}
                  transition={{ duration: 0.6 }}
                  className="flex-shrink-0"
                >
                  <div className="relative">
                    <div className="w-48 h-48 md:w-56 md:h-56 rounded-2xl overflow-hidden bg-white/20 border-4 border-white/30 shadow-2xl">
                      <div className="w-full h-full bg-gray-300/30 items-center justify-center flex">
                        <div className="text-6xl text-gray-100">��‍��</div>
                      </div>
                    </div>
                    
                    {/* 이미지 주변 장식 효과 */}
                    <div className="absolute -inset-4 bg-gradient-to-r from-gray-200/20 to-gray-400/20 rounded-3xl blur-xl -z-10"></div>
                  </div>
                </motion.div>

                {/* 간단한 소개 텍스트 */}
                <motion.div
                  initial={{ opacity: 0, x: 30 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  transition={{ duration: 0.6, delay: 0.2 }}
                  className="flex-1 text-center md:text-left"
                >
                  <div className="space-y-6">
                    <h3 className="text-3xl font-bold text-white">Jang won jun</h3>
                    <div className="space-y-4">
                      <p className="text-lg text-gray-50 leading-relaxed">
                        경험을 설계하는 Creative Technologist를 꿈꾸며, 
                        <br className="hidden md:block" />
                        끊임없이 학습하고 성장하는 개발자입니다.
                      </p>
                    </div>
                    <div className="flex flex-wrap gap-2 justify-center md:justify-start">
                      <span className="px-3 py-1 bg-gray-300/30 text-gray-50 text-sm rounded-full border border-gray-200/30">
                        #성실함
                      </span>
                      <span className="px-3 py-1 bg-gray-300/30 text-gray-50 text-sm rounded-full border border-gray-200/30">
                        #리더십
                      </span>
                      <span className="px-3 py-1 bg-gray-300/30 text-gray-50 text-sm rounded-full border border-gray-200/30">
                        #끊임없는 배움
                      </span>
                      <span className="px-3 py-1 bg-gray-300/30 text-gray-50 text-sm rounded-full border border-gray-200/30">
                        #copy
                      </span>
                    </div>
                  </div>
                </motion.div>
              </div>

              {/* Interview 섹션 */}
              <div className="mb-4">
                <h3 className="text-2xl font-bold text-white mb-4">Interview</h3>

                <div className="space-y-4">
                  {/* Q1 */}
                  <div className="bg-gray-500/50 rounded-lg p-4 border border-gray-300/30">
                    <h4 className="text-lg font-bold text-white mb-2">Q. 왜 Creative Technologist가 되고 싶은가?</h4>
                    <div className="space-y-2 text-gray-50 text-sm">
                      <p>저는 단순히 기능적인 개발자에 머무르는 것이 아니라, 사람들에게 새로운 경험과 가치를 줄 수 있는 메이커가 되고 싶습니다.</p>
                      <p>개발과 디자인을 모두 아우르며 아이디어를 직접 구현하는 과정에서 큰 보람을 느껴왔고, 그 과정이 저를 Creative Technologist라는 목표로 이끌었습니다.</p>
                      <p>궁극적으로는 창의성과 기술을 잇는 다리 역할을 하며, 문제 해결을 통해 더 많은 사람들에게 행복을 전하는 것이 제가 이 길을 선택한 이유입니다.</p>
                    </div>
                  </div>

                  {/* Q2 */}
                  <div className="bg-gray-500/50 rounded-lg p-4 border border-gray-300/30">
                    <h4 className="text-lg font-bold text-white mb-2">Q. AI Agent 분야 중 Voice Agent에 관심이 있는가?</h4>
                    <div className="space-y-2 text-gray-50 text-sm">
                      <p>저는 사람들의 문제를 해결하고 삶의 질을 높이는 기술에 관심이 많습니다. 특히 AI Agent는 단순한 도구가 아니라 사용자와 함께 생각하고 행동하는 파트너로서, 사람들의 일상과 업무 방식을 근본적으로 바꿀 수 있다고 생각합니다.</p>
                      <p>그 중에서도 우울증이나 정서적 어려움을 겪는 사람들을 돕고 싶어서 Voice Agent 분야에 관심을 갖게 되었습니다. 이런 분들은 집 밖으로 나가 치료받기가 쉽지 않고, 외로움도 크게 느끼기 때문에 도움이 절실합니다.</p>
                      <p>Voice Agent는 방 안에서도 자연스럽게 다가가 대화를 나누고, 치료적 역할을 하며, 언제나 곁을 지켜줄 수 있는 따뜻한 기술이라고 생각합니다.</p>
                    </div>
                  </div>

                  {/* Q3 */}
                  <div className="bg-gray-500/50 rounded-lg p-4 border border-gray-300/30">
                    <h4 className="text-lg font-bold text-white mb-2">Q. 앞으로의 목표?</h4>
                    <div className="space-y-2 text-gray-50 text-sm">
                      <p>저는 아직 배움의 초입에 있어 부족한 점이 많지만, 작은 문제라도 끝까지 집요하게 파고들며 해결하는 성격을 가지고 있습니다.</p>
                      <p>이 과정 속에서 개발과 디자인의 기초를 다져가고 있으며, 점차 아이디어를 직접 구현할 수 있는 역량을 쌓아가고자 합니다.</p>
                      <p>궁극적으로는 창의성과 기술을 연결하는 Creative Technologist로 성장하여, 사람들에게 의미 있고 가치 있는 경험을 만들어내는 것이 제 목표입니다.</p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </section>

          {/* Skills 섹션 */}
          <section id="skills" className="scroll-mt-24 py-20 bg-[#8BB3F8] min-h-screen">
            <div className="mx-auto max-w-4xl px-4">
              <h2 className="text-3xl md:text-4xl font-bold text-left mb-12 text-white">Skills <span className="text-sm font-normal text-gray-100 align-middle ml-1">(beginner)</span></h2>
              <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
                {[
                  { name: 'Next.js', src: '/next.svg' },
                  { name: 'TypeScript', src: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/typescript/typescript-original.svg' },
                  { name: 'Node.js', src: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/nodejs/nodejs-original.svg' },
                  { name: 'JavaScript', src: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/javascript/javascript-original.svg' },
                  { name: 'Python', src: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/python/python-original.svg' },
                  { name: 'React', src: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/react/react-original.svg' },
                  { name: 'PostCSS', src: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/postcss/postcss-original.svg' },
                  { name: 'HTML5', src: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/html5/html5-original.svg' }
                ].map(({ name, src }) => (
                  <div key={name} className="flex flex-col items-center p-6 rounded-lg bg-white/20 border border-white/30 text-white hover:bg-white/30 transition-colors">
                    <Image src={src} alt={`${name} logo`} width={64} height={64} className="w-16 h-16 object-contain mb-2" />
                    <span className="text-sm mt-1">{name}</span>
                  </div>
                ))}
              </div>
            </div>
          </section>

          {/* Projects 섹션 */}
          <section id="projects" className="scroll-mt-24 py-20 bg-[#7CA7F7] min-h-screen">
            <div className="mx-auto max-w-4xl px-4">
              <h2 className="text-3xl md:text-4xl font-bold text-left mb-12 text-white">Projects</h2>
              <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
                {[1, 2, 3, 4, 5].map((i) => (
                  <div key={i} className="relative group p-6 rounded-xl bg-white/20 border border-white/30 hover:bg-white/30 transition-colors">
                    {i === 1 ? (
                      <Image
                        src="/lexilearn/1.jpg"
                        alt="LexiLearn 프로젝트 메인 화면"
                        width={400}
                        height={160}
                        className="h-40 w-full rounded-lg object-cover mb-4"
                      />
                    ) : i === 2 ? (
                      <Image
                        src="/health/메인 페이지.jpg"
                        alt="Health 프로젝트 메인 화면"
                        width={400}
                        height={160}
                        className="h-40 w-full rounded-lg object-cover mb-4"
                      />
                    ) : i === 3 ? (
                      <Image
                        src="/musinsa/베스트 결과.jpg"
                        alt="Musinsa Collector 프로젝트 메인 화면"
                        width={400}
                        height={160}
                        className="h-40 w-full rounded-lg object-cover mb-4"
                      />
                    ) : i === 5 ? (
                      <Image
                        src="/dex/home.jpg"
                        alt="Web 포트폴리오 프로젝트 메인 화면"
                        width={400}
                        height={160}
                        className="h-40 w-full rounded-lg object-cover mb-4"
                      />
                    ) : (
                      <div className="h-40 rounded-lg bg-gray-300 mb-4" />
                    )}
                    <div 
                      className="h-40 rounded-lg bg-gray-300 mb-4"
                      style={{ display: 'none' }}
                    />
                    <h3 className="text-xl font-semibold mb-3 text-white">
                      {i === 1 ? '🎯 LexiLearn' : i === 2 ? '🎤 HealthVoice' : i === 3 ? '🛍️ Musinsa Collector' : i === 5 ? '💼 Web Portfolio' : `프로젝트 ${i}`}
                    </h3>
                    <p className="text-gray-50 mb-4">
                      {i === 1 ? 'AI 기반 영어 발음 연습 플랫폼' : i === 2 ? '음성 기반 건강 & 웰빙 도우미' : i === 3 ? '공개 API 기반 패션 상품 데이터 수집 & 분석 도구' : i === 5 ? '인터랙티브 포트폴리오 웹사이트' : '프로젝트 설명 요약…'}
                    </p>
                    
                    {/* LexiLearn 프로젝트(i === 1)에 자세히 보기 및 GitHub 버튼 */}
                    {i === 1 && (
                      <div className="absolute inset-0 bg-black/50 rounded-xl flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                        <div className="flex flex-col gap-3">
                          <button
                            className="bg-white text-black px-6 py-3 rounded-lg font-semibold hover:bg-gray-100 transition-colors"
                            onClick={() => {
                              setSelectedProject(i);
                              setIsProjectModalOpen(true);
                            }}
                          >
                            자세히 보기
                          </button>
                          <button
                            className="bg-gray-800 text-white px-6 py-3 rounded-lg font-semibold hover:bg-gray-700 transition-colors"
                            onClick={() => {
                              window.open('https://github.com/jang8163/lexilearn', '_blank');
                            }}
                          >
                            GitHub 바로가기
                          </button>
                        </div>
                      </div>
                    )}
                    
                    {/* HealthVoice 프로젝트(i === 2)에 자세히 보기 및 GitHub 버튼 */}
                    {i === 2 && (
                      <div className="absolute inset-0 bg-black/50 rounded-xl flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                        <div className="flex flex-col gap-3">
                          <button
                            className="bg-white text-black px-6 py-3 rounded-lg font-semibold hover:bg-gray-100 transition-colors"
                            onClick={() => {
                              setSelectedProject(i);
                              setIsProjectModalOpen(true);
                            }}
                          >
                            자세히 보기
                          </button>
                          <button
                            className="bg-gray-800 text-white px-6 py-3 rounded-lg font-semibold hover:bg-gray-700 transition-colors"
                            onClick={() => {
                              window.open('https://github.com/jang8163/healthvoice', '_blank');
                            }}
                          >
                            GitHub 바로가기
                          </button>
                        </div>
                      </div>
                    )}
                    
                    {/* 다른 프로젝트들(3, 5)에 자세히 보기 버튼 */}
                    {(i === 3 || i === 5) && (
                      <motion.button
                        initial={{ opacity: 0, y: 10 }}
                        whileHover={{ opacity: 1, y: 0 }}
                        className="absolute inset-0 bg-black/50 rounded-xl flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-300"
                        onClick={() => {
                          setSelectedProject(i);
                          setIsProjectModalOpen(true);
                        }}
                      >
                        <span className="bg-white text-black px-6 py-3 rounded-lg font-semibold hover:bg-gray-100 transition-colors">
                          자세히 보기
                        </span>
                      </motion.button>
                    )}
                    
                    {/* 다른 프로젝트들은 태그 제거 */}
                    {i !== 1 && i !== 2 && i !== 3 && i !== 5 && (
                      <div className="flex gap-2">
                        <span className="px-3 py-1 bg-gray-300 text-gray-800 text-sm rounded">React</span>
                        <span className="px-3 py-1 bg-gray-300 text-gray-800 text-sm rounded">Next.js</span>
                      </div>
                    )}
                  </div>
                ))}
              </div>
            </div>
          </section>

          {/* Experience & Education 섹션 */}
          <section id="experience" className="scroll-mt-24 py-20 bg-[#6B96E6] min-h-screen">
            <div className="mx-auto max-w-4xl px-4">
              <h2 className="text-3xl md:text-4xl font-bold text-left mb-12 text-white">Experience?</h2>
              <div className="space-y-6 text-gray-50 text-base leading-relaxed">
                <p>저는 아직 직접적인 프로젝트 경험은 많지 않고 모르는 부분도 많아 내세울 점은 부족합니다. 하지만 <strong className="text-white">꾸준한 학습과 성실한 태도</strong>를 통해 성장해 온 과정에 강한 자신감을 가지고 있으며, 새로운 환경에 적응하고 지식을 습득하는 데 빠른 편입니다. 문제를 마주했을 때는 표면적인 해결에 그치지 않고, 원인을 끝까지 <strong className="text-white">집요하게 탐구</strong>하며 본질적인 해답을 찾아내고자 합니다. 이러한 과정 속에서 작은 성취를 축적하며 스스로를 발전시켜 왔습니다.</p>

                <p>저는 새로운 아이디어를 창의적으로 발굴하고, 이를 기술적으로 연결해 구체화하는 과정을 즐깁니다. 또한 팀원들과 유연하게 소통하며 협업하여 아이디어를 실제 결과물로 발전시키는 데 기여할 수 있습니다. 아울러 맡은 일은 끝까지 <strong className="text-white">책임감</strong> 있게 완수하여 프로젝트가 안정적으로 추진될 수 있도록 힘을 보태겠습니다.</p>

                <p>무엇보다 <strong className="text-white">&ldquo;문제를 해결하여 행복을 이룬다&rdquo;</strong>라는 귀사의 비전은 저의 가치관과 깊이 맞닿아 있습니다. 저 역시 기술을 통해 사람들을 돕고, 더 많은 이들이 행복을 느낄 수 있는 경험을 만들어 가고 싶습니다. 그렇기에 단순히 회사의 구성원이 되는 것을 넘어, 같은 목표를 향해 함께 나아가며 의미 있는 성과를 이루고 싶습니다.</p>
              </div>
            </div>
          </section>

          {/* Thank You 섹션 */}
          <section 
            ref={thankYouRef}
            className="min-h-screen bg-gradient-to-b from-gray-700 to-slate-800 flex items-center justify-center relative overflow-hidden py-20"
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
                  animate={isThankYouInView ? { opacity: 1, scale: 1 } : { opacity: 0, scale: 0.8 }}
                  transition={{ duration: 1.5, delay: 0.2 }}
                >
                  <span 
                    className="font-extrabold text-white/5 leading-none whitespace-nowrap"
                    style={{ fontSize: 'clamp(80px, 15vw, 200px)' }}
                  >
                    Thank You
                  </span>
                </motion.div>
                
                {/* 전경 텍스트 */}
                <motion.h1 
                  className="relative text-4xl md:text-6xl lg:text-7xl font-bold text-white leading-tight"
                  initial={{ opacity: 0, y: 50 }}
                  animate={isThankYouInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 50 }}
                  transition={{ duration: 1, delay: 0.5 }}
                >
                  Thank You
                </motion.h1>
              </div>

              {/* 한글 텍스트 */}
              <motion.div
                initial={{ opacity: 0, y: 30 }}
                animate={isThankYouInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 30 }}
                transition={{ duration: 0.8, delay: 1 }}
                className="mb-12"
              >
                <p className="text-xl md:text-2xl text-gray-50 font-medium">
                  봐주셔서 감사합니다 :)
                </p>
              </motion.div>

              {/* 설명 텍스트 */}
              <motion.div
                initial={{ opacity: 0, y: 30 }}
                animate={isThankYouInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 30 }}
                transition={{ duration: 0.8, delay: 1.3 }}
                className="space-y-4 mb-16"
              >
                <p className="text-base md:text-lg text-gray-100 leading-relaxed">
                Creative Technologist로 성장하기 위해 낮선 기술에도 적극적으로 도전하고,
                </p>
                <p className="text-base md:text-lg text-gray-100 leading-relaxed">
                  항상 사용자의 관점에서 생각하며 사용하기 좋은 서비스를 만들고 싶습니다.
                </p>
              </motion.div>

              {/* 연락처 정보 */}
              <motion.div
                initial={{ opacity: 0, y: 30 }}
                animate={isThankYouInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 30 }}
                transition={{ duration: 0.8, delay: 1.6 }}
              >
                <div className="inline-flex items-center space-x-3 px-6 py-3 bg-white/10 backdrop-blur-sm rounded-full border border-white/20 hover:bg-white/20 transition-colors">
                  <svg className="w-5 h-5 text-gray-100" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 4.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                  </svg>
                  <span className="text-gray-50 font-medium">helios8163@gmail.com</span>
                </div>
              </motion.div>

              {/* 파티클 효과 */}
              {isThankYouInView && (
                <div className="absolute inset-0 pointer-events-none">
                  {[...Array(12)].map((_, i) => (
                    <motion.div
                      key={i}
                      className="absolute w-1 h-1 bg-white rounded-full"
                      style={{
                        left: `${20 + Math.random() * 60}%`,
                        top: `${20 + Math.random() * 60}%`,
                      }}
                      animate={{
                        opacity: [0, 0.6, 0],
                        scale: [0, 1, 0],
                        y: [0, -30, 0],
                      }}
                      transition={{
                        duration: 4 + Math.random() * 2,
                        repeat: Infinity,
                        delay: Math.random() * 3,
                        ease: "easeInOut"
                      }}
                    />
                  ))}
                </div>
              )}
            </div>
          </section>
        </motion.div>
      </div>

      {/* 프로젝트 모달 */}
      <AnimatePresence>
        {isProjectModalOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4"
            onClick={() => setIsProjectModalOpen(false)}
          >
            <motion.div
              initial={{ scale: 0.8, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.8, opacity: 0 }}
              className="bg-white rounded-xl max-w-2xl w-full max-h-[80vh] overflow-y-auto"
              onClick={(e) => e.stopPropagation()}
            >
              <div className="p-8">
                {/* 모달 헤더 */}
                <div className="flex justify-between items-center mb-6">
                  <div>
                    <h2 className="text-2xl font-bold text-gray-900">
                      {selectedProject === 1 ? '🎯 LexiLearn' : selectedProject === 2 ? '🎤 HealthVoice' : selectedProject === 3 ? '🛍️ Musinsa Collector' : selectedProject === 5 ? '💼 Web Portfolio' : '프로젝트'}
                    </h2>
                    <p className="text-gray-600 mt-1">
                      {selectedProject === 1 ? '영어 발음 연습 AI 시스템' : selectedProject === 2 ? '음성 기반 건강 & 웰빙 도우미' : selectedProject === 3 ? '공개 API 기반 패션 상품 데이터 수집 & 분석 도구' : selectedProject === 5 ? '인터랙티브 포트폴리오 웹사이트' : '프로젝트 설명'}
                    </p>
                  </div>
                  <button
                    onClick={() => setIsProjectModalOpen(false)}
                    className="text-gray-500 hover:text-gray-700 text-2xl"
                  >
                    ×
                  </button>
                </div>

                {/* 프로젝트 이미지 */}
                <div className="h-48 rounded-lg bg-gradient-to-br from-blue-500 to-purple-600 mb-6 flex items-center justify-center">
                  <div className="text-center text-white">
                    <div className="text-4xl mb-2">
                      {selectedProject === 1 ? '🗣️' : selectedProject === 2 ? '🎤' : selectedProject === 3 ? '🛍️' : selectedProject === 5 ? '💼' : '📁'}
                    </div>
                    <p className="text-lg font-semibold">
                      {selectedProject === 1 ? 'AI 기반 영어 발음 학습' : selectedProject === 2 ? '음성 기반 건강 & 웰빙 도우미' : selectedProject === 3 ? '공개 API 기반 패션 상품 데이터 수집 & 분석 도구' : selectedProject === 5 ? '인터랙티브 포트폴리오 웹사이트' : '프로젝트 설명'}
                    </p>
                  </div>
                </div>

                {/* 프로젝트 설명 */}
                <div className="space-y-6">
                  <div>
                    <h3 className="text-lg font-semibold text-gray-900 mb-3 flex items-center">
                      <span className="mr-2">📋</span>프로젝트 개요
                    </h3>
                    <p className="text-gray-700 leading-relaxed">
                      {selectedProject === 1 
                        ? '영어 학습자를 위한 종합적인 발음 연습 및 학습 플랫폼입니다. AI 기반 발음 평가 시스템과 체계적인 학습 콘텐츠를 통해 사용자의 영어 실력을 효과적으로 향상시킬 수 있도록 설계되었습니다.'
                        : selectedProject === 2
                        ? '음성만으로 건강 습관을 관리하고, 정서적 안정과 가벼운 운동까지 챙겨주는 개인 맞춤형 웰빙 에이전트입니다. 특히 복약 알림을 중심으로, 약 복용을 자주 잊는 노인·만성질환자·바쁜 직장인에게 큰 도움을 줍니다.'
                        : selectedProject === 3
                        ? '공개 API를 활용한 안전하고 합법적인 데이터 수집 방법을 학습하기 위한 교육용 프로젝트입니다. 실제 API 호출을 통해 패션 상품 데이터를 수집하고, 데이터 분석 및 시각화까지 제공하는 종합적인 데이터 사이언스 학습 플랫폼입니다. 특히 웹 스크래핑의 윤리적 측면을 강조하며, 공개 API만을 사용하여 완전히 합법적인 데이터 수집 방법을 제시합니다.'
                        : selectedProject === 5
                        ? 'Creative Technologist로서의 역량과 프로젝트를 보여주는 인터랙티브한 포트폴리오 웹사이트입니다. Next.js 15와 React 19를 활용하여 최신 기술 스택으로 구현되었으며, Framer Motion을 통한 고급 애니메이션과 스크롤 기반 스토리텔링으로 사용자에게 몰입감 있는 경험을 제공합니다. 반응형 디자인과 모던한 UI/UX로 모든 디바이스에서 최적화된 경험을 제공합니다.'
                        : '프로젝트 설명이 들어갑니다.'
                      }
                    </p>
                  </div>

                  <div>
                    <h3 className="text-lg font-semibold text-gray-900 mb-3 flex items-center">
                      <span className="mr-2">✨</span>주요 기능
                    </h3>
                    <div className="grid md:grid-cols-2 gap-4">
                      {selectedProject === 1 ? (
                        <>
                          <div className="bg-blue-50 p-4 rounded-lg">
                            <h4 className="font-semibold text-blue-900 mb-2">🗣️ AI 발음 평가</h4>
                            <ul className="text-sm text-blue-800 space-y-1">
                              <li>• Web Speech API 실시간 음성 인식</li>
                              <li>• 발음 정확도, 유창성 종합 평가</li>
                              <li>• 즉시 피드백 제공</li>
                            </ul>
                          </div>
                          <div className="bg-green-50 p-4 rounded-lg">
                            <h4 className="font-semibold text-green-900 mb-2">📚 학습 콘텐츠</h4>
                            <ul className="text-sm text-green-800 space-y-1">
                              <li>• 표현 학습: 5,400개 (3레벨×6카테고리)</li>
                              <li>• 단어 학습: 1,350개 (3레벨×30단계)</li>
                              <li>• 체계적인 단계별 학습</li>
                            </ul>
                          </div>
                          <div className="bg-purple-50 p-4 rounded-lg">
                            <h4 className="font-semibold text-purple-900 mb-2">📊 진도 관리</h4>
                            <ul className="text-sm text-purple-800 space-y-1">
                              <li>• 실시간 학습 진행 상황 추적</li>
                              <li>• 개인별 학습 통계 제공</li>
                              <li>• 단계별 완료 상태 관리</li>
                            </ul>
                          </div>
                          <div className="bg-orange-50 p-4 rounded-lg">
                            <h4 className="font-semibold text-orange-900 mb-2">📝 오답 노트</h4>
                            <ul className="text-sm text-orange-800 space-y-1">
                              <li>• 표현 및 단어별 오답 기록</li>
                              <li>• 맞춤형 복습 계획</li>
                              <li>• 학습 효과 분석</li>
                            </ul>
                          </div>
                        </>
                      ) : selectedProject === 2 ? (
                        <>
                          <div className="bg-blue-50 p-4 rounded-lg">
                            <h4 className="font-semibold text-blue-900 mb-2">💊 복약 관리</h4>
                            <ul className="text-sm text-blue-800 space-y-1">
                              <li>• 스마트 복약 알림 (음성)</li>
                              <li>• 음성 복용 확인</li>
                              <li>• 누락 약 확인 및 안내</li>
                            </ul>
                          </div>
                          <div className="bg-green-50 p-4 rounded-lg">
                            <h4 className="font-semibold text-green-900 mb-2">🏃‍♂️ 건강 루틴</h4>
                            <ul className="text-sm text-green-800 space-y-1">
                              <li>• 물 마시기 알림 (2시간마다)</li>
                              <li>• 수면 기록 및 시각화</li>
                              <li>• 혈압/혈당 음성 기록</li>
                            </ul>
                          </div>
                          <div className="bg-purple-50 p-4 rounded-lg">
                            <h4 className="font-semibold text-purple-900 mb-2">🧘‍♀️ 정서 케어</h4>
                            <ul className="text-sm text-purple-800 space-y-1">
                              <li>• 마음 체크인 (기분 이모지)</li>
                              <li>• 명상·호흡 가이드</li>
                              <li>• 기분 일기 및 동기부여</li>
                            </ul>
                          </div>
                          <div className="bg-orange-50 p-4 rounded-lg">
                            <h4 className="font-semibold text-orange-900 mb-2">💪 운동 코치</h4>
                            <ul className="text-sm text-orange-800 space-y-1">
                              <li>• 가벼운 운동 루틴 제공</li>
                              <li>• 음성 카운트 코치</li>
                              <li>• 활동 리마인드 (2시간마다)</li>
                            </ul>
                          </div>
                        </>
                      ) : selectedProject === 3 ? (
                        <>
                          <div className="bg-blue-50 p-4 rounded-lg">
                            <h4 className="font-semibold text-blue-900 mb-2">🌐 다중 API 수집</h4>
                            <ul className="text-sm text-blue-800 space-y-1">
                              <li>• FakeStore API (완전 무료 패션 상품)</li>
                              <li>• DummyJSON API (다양한 카테고리 뷰티/패션)</li>
                              <li>• JSONPlaceholder API (테스트용 모의 데이터)</li>
                              <li>• 실시간 API 호출 및 오류 처리</li>
                            </ul>
                          </div>
                          <div className="bg-green-50 p-4 rounded-lg">
                            <h4 className="font-semibold text-green-900 mb-2">📊 데이터 처리 & 분석</h4>
                            <ul className="text-sm text-green-800 space-y-1">
                              <li>• pandas DataFrame 고성능 조작</li>
                              <li>• 데이터 정제 및 표준화</li>
                              <li>• 통계 분석 (평균, 분포, 상관관계)</li>
                              <li>• matplotlib, seaborn 시각화</li>
                            </ul>
                          </div>
                          <div className="bg-purple-50 p-4 rounded-lg">
                            <h4 className="font-semibold text-purple-900 mb-2">💾 파일 저장 & 내보내기</h4>
                            <ul className="text-sm text-purple-800 space-y-1">
                              <li>• Excel 다중 시트 저장 (openpyxl)</li>
                              <li>• CSV UTF-8 한글 완벽 지원</li>
                              <li>• 자동 타임스탬프 파일명</li>
                              <li>• 대용량 분할 저장 (100개 단위)</li>
                            </ul>
                          </div>
                          <div className="bg-orange-50 p-4 rounded-lg">
                            <h4 className="font-semibold text-orange-900 mb-2">🎓 교육용 데모 시스템</h4>
                            <ul className="text-sm text-orange-800 space-y-1">
                              <li>• Jupyter Notebook 인터랙티브 환경</li>
                              <li>• 단계별 가이드 및 튜토리얼</li>
                              <li>• 실무 API 호출 방법 학습</li>
                              <li>• 샘플 데이터 생성 (안전한 학습)</li>
                            </ul>
                          </div>
                        </>
                      ) : selectedProject === 5 ? (
                        <>
                          <div className="bg-blue-50 p-4 rounded-lg">
                            <h4 className="font-semibold text-blue-900 mb-2">🎬 인트로 애니메이션</h4>
                            <ul className="text-sm text-blue-800 space-y-1">
                              <li>• 시네마틱한 인트로 오버레이</li>
                              <li>• &ldquo;아이디어를 스케치에서 코드로 옮겨 담는 사람, 장원준입니다&rdquo; 텍스트</li>
                              <li>• &ldquo;Front-End&rdquo; 배경 텍스트 애니메이션</li>
                              <li>• 자연스러운 메인 콘텐츠 전환</li>
                            </ul>
                          </div>
                          <div className="bg-green-50 p-4 rounded-lg">
                            <h4 className="font-semibold text-green-900 mb-2">🔄 인터랙티브 스크롤</h4>
                            <ul className="text-sm text-green-800 space-y-1">
                              <li>• Sticky 스크롤: Home 고정 + About 슬라이드업</li>
                              <li>• 스크롤 기반 스토리텔링</li>
                              <li>• 부드러운 섹션 전환 애니메이션</li>
                              <li>• 스크롤 스파이 네비게이션</li>
                            </ul>
                          </div>
                          <div className="bg-purple-50 p-4 rounded-lg">
                            <h4 className="font-semibold text-purple-900 mb-2">📱 반응형 디자인</h4>
                            <ul className="text-sm text-purple-800 space-y-1">
                              <li>• 모바일 우선 설계</li>
                              <li>• 모든 디바이스 최적화</li>
                              <li>• Tailwind CSS 기반 반응형 레이아웃</li>
                              <li>• 터치 친화적 인터페이스</li>
                            </ul>
                          </div>
                          <div className="bg-orange-50 p-4 rounded-lg">
                            <h4 className="font-semibold text-orange-900 mb-2">⚡ 성능 최적화</h4>
                            <ul className="text-sm text-orange-800 space-y-1">
                              <li>• Next.js 15 + Turbopack</li>
                              <li>• TypeScript 완전 적용</li>
                              <li>• 모듈화된 컴포넌트 구조</li>
                              <li>• 빠른 로딩 및 빌드</li>
                            </ul>
                          </div>
                        </>
                      ) : null}
                    </div>
                  </div>

                  <div>
                    <h3 className="text-lg font-semibold text-gray-900 mb-3 flex items-center">
                      <span className="mr-2">🛠️</span>기술 스택
                    </h3>
                    <div className="space-y-3">
                      {selectedProject === 1 ? (
                        <>
                          <div>
                            <h4 className="font-medium text-gray-800 mb-2">Frontend</h4>
                            <div className="flex flex-wrap gap-2">
                              <span className="px-3 py-1 bg-blue-100 text-blue-800 text-sm rounded-full">Next.js 15.5.2</span>
                              <span className="px-3 py-1 bg-cyan-100 text-cyan-800 text-sm rounded-full">React 19.1.0</span>
                              <span className="px-3 py-1 bg-indigo-100 text-indigo-800 text-sm rounded-full">TypeScript 5</span>
                              <span className="px-3 py-1 bg-teal-100 text-teal-800 text-sm rounded-full">Tailwind CSS 3.4.0</span>
                            </div>
                          </div>
                          <div>
                            <h4 className="font-medium text-gray-800 mb-2">브라우저 API</h4>
                            <div className="flex flex-wrap gap-2">
                              <span className="px-3 py-1 bg-purple-100 text-purple-800 text-sm rounded-full">Web Speech API</span>
                              <span className="px-3 py-1 bg-orange-100 text-orange-800 text-sm rounded-full">LocalStorage</span>
                            </div>
                          </div>
                        </>
                      ) : selectedProject === 2 ? (
                        <>
                          <div>
                            <h4 className="font-medium text-gray-800 mb-2">Frontend</h4>
                            <div className="flex flex-wrap gap-2">
                              <span className="px-3 py-1 bg-blue-100 text-blue-800 text-sm rounded-full">HTML5</span>
                              <span className="px-3 py-1 bg-cyan-100 text-cyan-800 text-sm rounded-full">CSS3</span>
                              <span className="px-3 py-1 bg-indigo-100 text-indigo-800 text-sm rounded-full">JavaScript ES6+</span>
                              <span className="px-3 py-1 bg-teal-100 text-teal-800 text-sm rounded-full">PWA</span>
                            </div>
                          </div>
                          <div>
                            <h4 className="font-medium text-gray-800 mb-2">브라우저 API & 기능</h4>
                            <div className="flex flex-wrap gap-2">
                              <span className="px-3 py-1 bg-purple-100 text-purple-800 text-sm rounded-full">Web Speech API</span>
                              <span className="px-3 py-1 bg-orange-100 text-orange-800 text-sm rounded-full">LocalStorage</span>
                              <span className="px-3 py-1 bg-pink-100 text-pink-800 text-sm rounded-full">Service Worker</span>
                              <span className="px-3 py-1 bg-gray-100 text-gray-800 text-sm rounded-full">브라우저 알림</span>
                            </div>
                          </div>
                        </>
                      ) : selectedProject === 3 ? (
                        <>
                          <div>
                            <h4 className="font-medium text-gray-800 mb-2">Backend</h4>
                            <div className="flex flex-wrap gap-2">
                              <span className="px-3 py-1 bg-blue-100 text-blue-800 text-sm rounded-full">Python 3.7+</span>
                              <span className="px-3 py-1 bg-cyan-100 text-cyan-800 text-sm rounded-full">requests</span>
                              <span className="px-3 py-1 bg-indigo-100 text-indigo-800 text-sm rounded-full">pandas</span>
                              <span className="px-3 py-1 bg-teal-100 text-teal-800 text-sm rounded-full">openpyxl</span>
                              <span className="px-3 py-1 bg-green-100 text-green-800 text-sm rounded-full">matplotlib</span>
                              <span className="px-3 py-1 bg-yellow-100 text-yellow-800 text-sm rounded-full">seaborn</span>
                            </div>
                          </div>
                          <div>
                            <h4 className="font-medium text-gray-800 mb-2">Data Processing & Management</h4>
                            <div className="flex flex-wrap gap-2">
                              <span className="px-3 py-1 bg-purple-100 text-purple-800 text-sm rounded-full">JSON 파싱</span>
                              <span className="px-3 py-1 bg-orange-100 text-orange-800 text-sm rounded-full">argparse</span>
                              <span className="px-3 py-1 bg-pink-100 text-pink-800 text-sm rounded-full">오류 처리</span>
                              <span className="px-3 py-1 bg-gray-100 text-gray-800 text-sm rounded-full">메모리 최적화</span>
                            </div>
                          </div>
                        </>
                      ) : selectedProject === 5 ? (
                        <>
                          <div>
                            <h4 className="font-medium text-gray-800 mb-2">Frontend Framework</h4>
                            <div className="flex flex-wrap gap-2">
                              <span className="px-3 py-1 bg-blue-100 text-blue-800 text-sm rounded-full">Next.js 15.5.2</span>
                              <span className="px-3 py-1 bg-cyan-100 text-cyan-800 text-sm rounded-full">React 19.1.0</span>
                              <span className="px-3 py-1 bg-indigo-100 text-indigo-800 text-sm rounded-full">TypeScript 5</span>
                              <span className="px-3 py-1 bg-teal-100 text-teal-800 text-sm rounded-full">Tailwind CSS 4</span>
                            </div>
                          </div>
                          <div>
                            <h4 className="font-medium text-gray-800 mb-2">애니메이션 & 스타일링</h4>
                            <div className="flex flex-wrap gap-2">
                              <span className="px-3 py-1 bg-purple-100 text-purple-800 text-sm rounded-full">Framer Motion 12.23.12</span>
                              <span className="px-3 py-1 bg-orange-100 text-orange-800 text-sm rounded-full">Geist Font</span>
                              <span className="px-3 py-1 bg-pink-100 text-pink-800 text-sm rounded-full">Lucide React</span>
                            </div>
                          </div>
                          <div>
                            <h4 className="font-medium text-gray-800 mb-2">개발 도구</h4>
                            <div className="flex flex-wrap gap-2">
                              <span className="px-3 py-1 bg-gray-100 text-gray-800 text-sm rounded-full">Turbopack</span>
                              <span className="px-3 py-1 bg-gray-100 text-gray-800 text-sm rounded-full">ESLint</span>
                              <span className="px-3 py-1 bg-gray-100 text-gray-800 text-sm rounded-full">PostCSS</span>
                            </div>
                          </div>
                        </>
                      ) : (
                        <>
                          <div>
                            <h4 className="font-medium text-gray-800 mb-2">Backend</h4>
                            <div className="flex flex-wrap gap-2">
                              <span className="px-3 py-1 bg-blue-100 text-blue-800 text-sm rounded-full">Python 3.7+</span>
                              <span className="px-3 py-1 bg-cyan-100 text-cyan-800 text-sm rounded-full">requests</span>
                              <span className="px-3 py-1 bg-indigo-100 text-indigo-800 text-sm rounded-full">pandas</span>
                              <span className="px-3 py-1 bg-teal-100 text-teal-800 text-sm rounded-full">openpyxl</span>
                              <span className="px-3 py-1 bg-green-100 text-green-800 text-sm rounded-full">matplotlib</span>
                              <span className="px-3 py-1 bg-yellow-100 text-yellow-800 text-sm rounded-full">seaborn</span>
                            </div>
                          </div>
                          <div>
                            <h4 className="font-medium text-gray-800 mb-2">Data Processing & Management</h4>
                            <div className="flex flex-wrap gap-2">
                              <span className="px-3 py-1 bg-purple-100 text-purple-800 text-sm rounded-full">JSON 파싱</span>
                              <span className="px-3 py-1 bg-orange-100 text-orange-800 text-sm rounded-full">argparse</span>
                              <span className="px-3 py-1 bg-pink-100 text-pink-800 text-sm rounded-full">오류 처리</span>
                              <span className="px-3 py-1 bg-gray-100 text-gray-800 text-sm rounded-full">메모리 최적화</span>
                            </div>
                          </div>
                        </>
                      )}
                    </div>
                  </div>


                  <div>
                    <h3 className="text-lg font-semibold text-gray-900 mb-3 flex items-center">
                      <span className="mr-2">🚀</span>핵심 성과
                    </h3>
                    <div className="grid md:grid-cols-2 gap-4">
                      {selectedProject === 1 ? (
                        <>
                          <div className="bg-blue-50 p-4 rounded-lg">
                            <h4 className="font-semibold text-blue-900 mb-2">🎯 학습 효과</h4>
                            <ul className="text-sm text-blue-800 space-y-1">
                              <li>• <strong>개인화된 맞춤형 학습 경험</strong></li>
                              <li>• <strong>실시간 발음 피드백으로 즉시 개선</strong></li>
                              <li>• <strong>체계적인 단계별 실력 향상</strong></li>
                            </ul>
                          </div>
                          <div className="bg-green-50 p-4 rounded-lg">
                            <h4 className="font-semibold text-green-900 mb-2">🎯 기술적 성과</h4>
                            <ul className="text-sm text-green-800 space-y-1">
                              <li>• <strong>Web Speech API 활용</strong> - 브라우저 네이티브 음성 인식</li>
                              <li>• <strong>체계적인 데이터 관리</strong> - TypeScript 인터페이스로 타입 안전성</li>
                              <li>• <strong>확장 가능한 구조</strong> - 모듈화된 데이터 구조</li>
                            </ul>
                          </div>
                        </>
                      ) : selectedProject === 2 ? (
                        <>
                          <div className="bg-blue-50 p-4 rounded-lg">
                            <h4 className="font-semibold text-blue-900 mb-2">🎯 사용자 경험</h4>
                            <ul className="text-sm text-blue-800 space-y-1">
                              <li>• <strong>음성 중심 인터페이스</strong> - 손이 불편한 사용자도 쉽게 사용</li>
                              <li>• <strong>개인화된 건강 관리</strong> - 맞춤형 알림과 피드백</li>
                              <li>• <strong>실시간 건강 모니터링</strong> - 즉시 상태 확인 및 기록</li>
                            </ul>
                          </div>
                          <div className="bg-green-50 p-4 rounded-lg">
                            <h4 className="font-semibold text-green-900 mb-2">🎯 기술적 성과</h4>
                            <ul className="text-sm text-green-800 space-y-1">
                              <li>• <strong>Web Speech API 활용</strong> - 브라우저 네이티브 음성 인식</li>
                              <li>• <strong>PWA 구현</strong> - 네이티브 앱 수준의 사용자 경험</li>
                              <li>• <strong>LocalStorage 활용</strong> - 오프라인에서도 데이터 보존</li>
                              <li>• <strong>반응형 디자인</strong> - 모든 디바이스에서 최적화된 경험</li>
                            </ul>
                          </div>
                        </>
                      ) : selectedProject === 5 ? (
                        <>
                          <div className="bg-blue-50 p-4 rounded-lg">
                            <h4 className="font-semibold text-blue-900 mb-2">🎯 사용자 경험</h4>
                            <ul className="text-sm text-blue-800 space-y-1">
                              <li>• <strong>인터랙티브한 스크롤 애니메이션</strong> - 몰입감 있는 스토리텔링</li>
                              <li>• <strong>직관적인 네비게이션</strong> - 쉬운 정보 탐색</li>
                              <li>• <strong>프로젝트 상세 모달</strong> - 깊이 있는 정보 제공</li>
                              <li>• <strong>반응형 디자인</strong> - 모든 디바이스에서 최적 경험</li>
                            </ul>
                          </div>
                          <div className="bg-green-50 p-4 rounded-lg">
                            <h4 className="font-semibold text-green-900 mb-2">🎯 기술적 성과</h4>
                            <ul className="text-sm text-green-800 space-y-1">
                              <li>• <strong>Next.js 15 + React 19</strong> - 최신 기술 스택 활용</li>
                              <li>• <strong>TypeScript 완전 적용</strong> - 타입 안전성 확보</li>
                              <li>• <strong>Framer Motion 고급 애니메이션</strong> - 전문적인 인터랙션</li>
                              <li>• <strong>모듈화된 컴포넌트 구조</strong> - 유지보수성 향상</li>
                            </ul>
                          </div>
                        </>
                      ) : null}
                    </div>
                  </div>

                  <div>
                    <h3 className="text-lg font-semibold text-gray-900 mb-3 flex items-center">
                      <span className="mr-2">🎨</span>UI/UX 특징
                    </h3>
                    <div className="space-y-4">
                      {selectedProject === 1 ? (
                        <>
                          <div className="bg-gradient-to-r from-blue-50 to-purple-50 p-4 rounded-lg">
                            <h4 className="font-semibold text-gray-800 mb-2 flex items-center">
                              <span className="mr-2">🎨</span>모던한 디자인
                            </h4>
                            <ul className="text-sm text-gray-600 space-y-1">
                              <li>• <strong>그라데이션 배경</strong> - 시각적 매력도 향상</li>
                              <li>• <strong>카드 기반 레이아웃</strong> - 직관적인 네비게이션</li>
                              <li>• <strong>반응형 디자인</strong> - 모든 디바이스에서 최적화</li>
                            </ul>
                          </div>
                          <div className="bg-gradient-to-r from-green-50 to-teal-50 p-4 rounded-lg">
                            <h4 className="font-semibold text-gray-800 mb-2 flex items-center">
                              <span className="mr-2">👤</span>사용자 경험
                            </h4>
                            <ul className="text-sm text-gray-600 space-y-1">
                              <li>• <strong>원클릭 학습 시작</strong> - 간편한 학습 진입</li>
                              <li>• <strong>실시간 피드백</strong> - 즉시 학습 효과 확인</li>
                              <li>• <strong>진도 시각화</strong> - 학습 동기 부여</li>
                            </ul>
                          </div>
                        </>
                      ) : selectedProject === 2 ? (
                        <>
                          <div className="bg-gradient-to-r from-blue-50 to-purple-50 p-4 rounded-lg">
                            <h4 className="font-semibold text-gray-800 mb-2 flex items-center">
                              <span className="mr-2">🎨</span>모던한 그라데이션 디자인
                            </h4>
                            <ul className="text-sm text-gray-600 space-y-1">
                              <li>• <strong>부드러운 보라-파랑 그라데이션</strong> 배경</li>
                              <li>• <strong>카드 기반 레이아웃</strong>으로 정보 구조화</li>
                              <li>• <strong>직관적인 아이콘과 색상 코딩</strong></li>
                            </ul>
                          </div>
                          <div className="bg-gradient-to-r from-green-50 to-teal-50 p-4 rounded-lg">
                            <h4 className="font-semibold text-gray-800 mb-2 flex items-center">
                              <span className="mr-2">📱</span>반응형 디자인
                            </h4>
                            <ul className="text-sm text-gray-600 space-y-1">
                              <li>• <strong>모바일 우선 설계</strong></li>
                              <li>• <strong>태블릿, 데스크톱 완벽 지원</strong></li>
                              <li>• <strong>터치 친화적 인터페이스</strong></li>
                            </ul>
                          </div>
                          <div className="bg-gradient-to-r from-orange-50 to-red-50 p-4 rounded-lg">
                            <h4 className="font-semibold text-gray-800 mb-2 flex items-center">
                              <span className="mr-2">⚡</span>원클릭 학습 시작
                            </h4>
                            <ul className="text-sm text-gray-600 space-y-1">
                              <li>• <strong>음성 버튼으로 즉시 명령 실행</strong></li>
                              <li>• <strong>플로팅 액션 버튼</strong>으로 빠른 접근</li>
                              <li>• <strong>직관적인 네비게이션</strong></li>
                            </ul>
                          </div>
                        </>
                      ) : selectedProject === 5 ? (
                        <>
                          <div className="bg-gradient-to-r from-blue-50 to-purple-50 p-4 rounded-lg">
                            <h4 className="font-semibold text-gray-800 mb-2 flex items-center">
                              <span className="mr-2">🎬</span>시네마틱한 인트로
                            </h4>
                            <ul className="text-sm text-gray-600 space-y-1">
                              <li>• <strong>전문적인 첫인상</strong> - 시네마틱한 인트로 오버레이</li>
                              <li>• <strong>자연스러운 전환</strong> - 메인 콘텐츠로 부드러운 이동</li>
                              <li>• <strong>브랜딩 강화</strong> - &ldquo;아이디어를 스케치에서 코드로 옮겨 담는 사람, 장원준입니다&rdquo; 메시지</li>
                            </ul>
                          </div>
                          <div className="bg-gradient-to-r from-green-50 to-teal-50 p-4 rounded-lg">
                            <h4 className="font-semibold text-gray-800 mb-2 flex items-center">
                              <span className="mr-2">🔄</span>인터랙티브 스크롤
                            </h4>
                            <ul className="text-sm text-gray-600 space-y-1">
                              <li>• <strong>스크롤 기반 스토리텔링</strong> - 몰입감 있는 경험</li>
                              <li>• <strong>Sticky 스크롤 효과</strong> - Home 고정 + About 슬라이드업</li>
                              <li>• <strong>부드러운 애니메이션</strong> - Framer Motion 고급 효과</li>
                            </ul>
                          </div>
                          <div className="bg-gradient-to-r from-orange-50 to-red-50 p-4 rounded-lg">
                            <h4 className="font-semibold text-gray-800 mb-2 flex items-center">
                              <span className="mr-2">📱</span>반응형 디자인
                            </h4>
                            <ul className="text-sm text-gray-600 space-y-1">
                              <li>• <strong>모바일 우선 설계</strong> - 모든 디바이스 최적화</li>
                              <li>• <strong>Tailwind CSS</strong> - 유틸리티 퍼스트 반응형 레이아웃</li>
                              <li>• <strong>터치 친화적</strong> - 모바일에서도 완벽한 사용성</li>
                            </ul>
                          </div>
                        </>
                      ) : (
                        <>
                          <div className="bg-gradient-to-r from-blue-50 to-purple-50 p-4 rounded-lg">
                            <h4 className="font-semibold text-gray-800 mb-2 flex items-center">
                              <span className="mr-2">🖥️</span>명령행 인터페이스
                            </h4>
                            <ul className="text-sm text-gray-600 space-y-1">
                              <li>• <strong>직관적인 진행률 표시</strong> - 실시간 수집 현황 모니터링</li>
                              <li>• <strong>컬러풀한 출력</strong> - 성공/오류/경고 메시지 색상 구분</li>
                              <li>• <strong>상세한 로그</strong> - 각 단계별 상세한 실행 정보</li>
                              <li>• <strong>사용자 친화적</strong> - 초보자도 쉽게 이해할 수 있는 메시지</li>
                            </ul>
                          </div>
                          <div className="bg-gradient-to-r from-green-50 to-teal-50 p-4 rounded-lg">
                            <h4 className="font-semibold text-gray-800 mb-2 flex items-center">
                              <span className="mr-2">📊</span>데이터 시각화
                            </h4>
                            <ul className="text-sm text-gray-600 space-y-1">
                              <li>• <strong>실시간 통계</strong> - 수집 중 실시간 요약 정보 표시</li>
                              <li>• <strong>카테고리별 분석</strong> - 브랜드, 카테고리별 상품 분포</li>
                              <li>• <strong>가격 분석</strong> - 평균 가격, 할인율 통계</li>
                              <li>• <strong>평점 분석</strong> - 상품 평점 분포 및 리뷰 수 분석</li>
                            </ul>
                          </div>
                          <div className="bg-gradient-to-r from-orange-50 to-red-50 p-4 rounded-lg">
                            <h4 className="font-semibold text-gray-800 mb-2 flex items-center">
                              <span className="mr-2">⚡</span>원클릭 실행
                            </h4>
                            <ul className="text-sm text-gray-600 space-y-1">
                              <li>• <strong>간단한 명령어</strong> - `py fashion_api_demo.py` 한 줄로 실행</li>
                              <li>• <strong>옵션 설정</strong> - `--items` 옵션으로 수집량 조절</li>
                              <li>• <strong>자동 저장</strong> - 수집 완료 시 자동으로 파일 저장</li>
                              <li>• <strong>즉시 분석</strong> - 수집과 동시에 기본 통계 제공</li>
                            </ul>
                          </div>
                        </>
                      )}
                    </div>
                  </div>

                  <div>
                    <h3 className="text-lg font-semibold text-gray-900 mb-3 flex items-center">
                      <span className="mr-2">🏗️</span>프로젝트 구조
                    </h3>
                    <div className="bg-gray-50 p-4 rounded-lg">
                      <div className="text-sm text-gray-700 font-mono">
                        {selectedProject === 1 ? (
                          <>
                            <div className="text-blue-600 font-semibold">src/</div>
                            <div className="ml-4">├── <span className="text-green-600">app/</span> <span className="text-gray-500"># Next.js App Router</span></div>
                            <div className="ml-8">├── <span className="text-blue-600">expression/</span> <span className="text-gray-500"># 표현 학습 페이지</span></div>
                            <div className="ml-8">├── <span className="text-blue-600">vocabulary/</span> <span className="text-gray-500"># 단어 학습 페이지</span></div>
                            <div className="ml-8">├── <span className="text-blue-600">notes/</span> <span className="text-gray-500"># 오답 노트 페이지</span></div>
                            <div className="ml-8">├── <span className="text-blue-600">progress/</span> <span className="text-gray-500"># 진도 관리 페이지</span></div>
                            <div className="ml-8">└── <span className="text-blue-600">layout.tsx</span> <span className="text-gray-500"># 전역 레이아웃</span></div>
                            <div className="ml-4">└── <span className="text-green-600">lib/</span> <span className="text-gray-500"># 핵심 로직 및 데이터</span></div>
                            <div className="ml-8">├── <span className="text-purple-600">expressions-5400-complete.ts</span> <span className="text-gray-500"># 표현 데이터</span></div>
                            <div className="ml-8">├── <span className="text-purple-600">vocabulary-data-1350-new.ts</span> <span className="text-gray-500"># 단어 데이터</span></div>
                            <div className="ml-8">├── <span className="text-purple-600">speaking-practice.ts</span> <span className="text-gray-500"># AI 발음 평가</span></div>
                            <div className="ml-8">├── <span className="text-purple-600">level-stage-manager.ts</span> <span className="text-gray-500"># 레벨 관리</span></div>
                            <div className="ml-8">└── <span className="text-purple-600">vocabulary-system.ts</span> <span className="text-gray-500"># 단어 시스템</span></div>
                          </>
                        ) : selectedProject === 2 ? (
                          <>
                            <div className="text-blue-600 font-semibold">health-voice/</div>
                            <div className="ml-4">├── <span className="text-green-600">📁 메인 프로그램</span></div>
                            <div className="ml-8">├── <span className="text-blue-600">index.html</span> <span className="text-gray-500"># 메인 페이지</span></div>
                            <div className="ml-8">├── <span className="text-blue-600">script.js</span> <span className="text-gray-500"># 핵심 로직</span></div>
                            <div className="ml-8">└── <span className="text-blue-600">style.css</span> <span className="text-gray-500"># 스타일링</span></div>
                            <div className="ml-4">├── <span className="text-green-600">📁 학습 자료</span></div>
                            <div className="ml-8">├── <span className="text-purple-600">README.md</span> <span className="text-gray-500"># 프로젝트 가이드</span></div>
                            <div className="ml-8">└── <span className="text-purple-600">demo/</span> <span className="text-gray-500"># 데모 파일들</span></div>
                            <div className="ml-4">└── <span className="text-green-600">📁 설정 파일</span></div>
                            <div className="ml-8">└── <span className="text-purple-600">manifest.json</span> <span className="text-gray-500"># PWA 설정</span></div>
                          </>
                        ) : selectedProject === 5 ? (
                          <>
                            <div className="text-blue-600 font-semibold">portfolio/</div>
                            <div className="ml-4">├── <span className="text-green-600">app/</span> <span className="text-gray-500"># Next.js App Router</span></div>
                            <div className="ml-8">├── <span className="text-blue-600">layout.tsx</span> <span className="text-gray-500"># 전역 레이아웃</span></div>
                            <div className="ml-8">├── <span className="text-blue-600">page.tsx</span> <span className="text-gray-500"># 메인 페이지</span></div>
                            <div className="ml-8">└── <span className="text-blue-600">globals.css</span> <span className="text-gray-500"># 전역 스타일</span></div>
                            <div className="ml-4">├── <span className="text-green-600">components/</span> <span className="text-gray-500"># React 컴포넌트들</span></div>
                            <div className="ml-8">├── <span className="text-purple-600">StickyHome.tsx</span> <span className="text-yellow-600">⭐</span> <span className="text-gray-500"># 메인 스크롤 애니메이션</span></div>
                            <div className="ml-8">├── <span className="text-purple-600">Hero.tsx</span> <span className="text-gray-500"># 홈 섹션</span></div>
                            <div className="ml-8">├── <span className="text-purple-600">IntroOverlay.tsx</span> <span className="text-gray-500"># 인트로 오버레이</span></div>
                            <div className="ml-8">├── <span className="text-purple-600">NavBar.tsx</span> <span className="text-gray-500"># 네비게이션 바</span></div>
                            <div className="ml-8">└── <span className="text-purple-600">FloatingActions.tsx</span> <span className="text-gray-500"># 플로팅 액션 버튼</span></div>
                            <div className="ml-4">├── <span className="text-green-600">hooks/</span> <span className="text-gray-500"># 커스텀 훅</span></div>
                            <div className="ml-8">└── <span className="text-purple-600">useScrollSpy.ts</span> <span className="text-gray-500"># 스크롤 스파이 기능</span></div>
                            <div className="ml-4">└── <span className="text-green-600">public/</span> <span className="text-gray-500"># 정적 자산</span></div>
                            <div className="ml-8">├── <span className="text-orange-600">dex/</span> <span className="text-gray-500"># Web Portfolio 이미지</span></div>
                            <div className="ml-8">├── <span className="text-orange-600">lexilearn/</span> <span className="text-gray-500"># LexiLearn 이미지</span></div>
                            <div className="ml-8">├── <span className="text-orange-600">health/</span> <span className="text-gray-500"># HealthVoice 이미지</span></div>
                            <div className="ml-8">└── <span className="text-orange-600">musinsa/</span> <span className="text-gray-500"># Musinsa Collector 이미지</span></div>
                          </>
                        ) : null}
                      </div>
                    </div>
                  </div>

                  <div>
                    <h3 className="text-lg font-semibold text-gray-900 mb-3 flex items-center">
                      <span className="mr-2">🖥️</span>작업 화면
                    </h3>
                    <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
                      {selectedProject === 1 ? (
                        // LexiLearn 이미지들
                        [1, 2, 3, 4, 5, 6, 7, 8, 9, 10].map((num) => (
                          <div 
                            key={num} 
                            className="relative group cursor-pointer"
                            onClick={() => {
                              console.log(`이미지 클릭: ${num}`);
                              setSelectedImage(`/lexilearn/${num}.jpg`);
                            }}
                          >
                            <img
                              src={`/lexilearn/${num}.jpg`}
                              alt={`LexiLearn 화면 ${num}`}
                              className="w-full h-32 object-cover rounded-lg border border-gray-200 hover:border-blue-300 transition-colors"
                              onError={(e) => {
                                // 이미지 로드 실패 시 플레이스홀더 표시
                                e.currentTarget.style.display = 'none';
                                const placeholder = e.currentTarget.nextElementSibling as HTMLElement;
                                if (placeholder) placeholder.style.display = 'flex';
                              }}
                            />
                            <div 
                              className="w-full h-32 bg-gradient-to-br from-blue-100 to-purple-100 rounded-lg border border-gray-200 hover:border-blue-300 transition-colors flex items-center justify-center absolute inset-0"
                              style={{ display: 'none' }}
                            >
                              <div className="text-center">
                                <div className="text-2xl mb-1">🖼️</div>
                                <p className="text-sm font-medium text-gray-700">화면 {num}</p>
                              </div>
                            </div>
                            <div className="absolute inset-0 bg-black/0 group-hover:bg-black/20 transition-colors rounded-lg flex items-center justify-center">
                              <span className="opacity-0 group-hover:opacity-100 text-white text-sm font-medium transition-opacity">
                                클릭하여 확대
                              </span>
                            </div>
                          </div>
                        ))
                      ) : selectedProject === 2 ? (
                        // Health Care 이미지들
                        [
                          '메인 페이지.jpg',
                          '건강 관리 - 수면.jpg',
                          '건강 관리 - 수분.jpg',
                          '건강 관리- 혈당_혈압.jpg',
                          '마음 케어.jpg',
                          '메인 페이지 - 응급.jpg',
                          '약물 추가 후.jpg',
                          '약물 추가.jpg',
                          '운동코치.jpg',
                          '음성 명령 듣는중.jpg'
                        ].map((filename, index) => (
                          <div 
                            key={index} 
                            className="relative group cursor-pointer"
                            onClick={() => {
                              console.log(`이미지 클릭: ${filename}`);
                              setSelectedImage(`/health/${filename}`);
                            }}
                          >
                            <img
                              src={`/health/${filename}`}
                              alt={`Health Care 화면 ${index + 1}`}
                              className="w-full h-32 object-cover rounded-lg border border-gray-200 hover:border-blue-300 transition-colors"
                              onError={(e) => {
                                // 이미지 로드 실패 시 플레이스홀더 표시
                                e.currentTarget.style.display = 'none';
                                const placeholder = e.currentTarget.nextElementSibling as HTMLElement;
                                if (placeholder) placeholder.style.display = 'flex';
                              }}
                            />
                            <div 
                              className="w-full h-32 bg-gradient-to-br from-green-100 to-blue-100 rounded-lg border border-gray-200 hover:border-blue-300 transition-colors flex items-center justify-center absolute inset-0"
                              style={{ display: 'none' }}
                            >
                              <div className="text-center">
                                <div className="text-2xl mb-1">🏥</div>
                                <p className="text-sm font-medium text-gray-700">화면 {index + 1}</p>
                              </div>
                            </div>
                            <div className="absolute inset-0 bg-black/0 group-hover:bg-black/20 transition-colors rounded-lg flex items-center justify-center">
                              <span className="opacity-0 group-hover:opacity-100 text-white text-sm font-medium transition-opacity">
                                클릭하여 확대
                              </span>
                            </div>
                          </div>
                        ))
                      ) : selectedProject === 5 ? (
                        // Web Portfolio 이미지들
                        [
                          'home.jpg',
                          'about me.jpg',
                          'skills.jpg',
                          'projects.jpg',
                          'experience.jpg',
                          '인트로.jpg',
                          '아웃.jpg'
                        ].map((filename, index) => (
                          <div 
                            key={index} 
                            className="relative group cursor-pointer"
                            onClick={() => {
                              console.log(`이미지 클릭: ${filename}`);
                              setSelectedImage(`/dex/${filename}`);
                            }}
                          >
                            <img
                              src={`/dex/${filename}`}
                              alt={`Web Portfolio 화면 ${index + 1}`}
                              className="w-full h-32 object-cover rounded-lg border border-gray-200 hover:border-blue-300 transition-colors"
                              onError={(e) => {
                                // 이미지 로드 실패 시 플레이스홀더 표시
                                e.currentTarget.style.display = 'none';
                                const placeholder = e.currentTarget.nextElementSibling as HTMLElement;
                                if (placeholder) placeholder.style.display = 'flex';
                              }}
                            />
                            <div 
                              className="w-full h-32 bg-gradient-to-br from-blue-100 to-purple-100 rounded-lg border border-gray-200 hover:border-blue-300 transition-colors flex items-center justify-center absolute inset-0"
                              style={{ display: 'none' }}
                            >
                              <div className="text-center">
                                <div className="text-2xl mb-1">💼</div>
                                <p className="text-sm font-medium text-gray-700">화면 {index + 1}</p>
                              </div>
                            </div>
                            <div className="absolute inset-0 bg-black/0 group-hover:bg-black/20 transition-colors rounded-lg flex items-center justify-center">
                              <span className="opacity-0 group-hover:opacity-100 text-white text-sm font-medium transition-opacity">
                                클릭하여 확대
                              </span>
                            </div>
                          </div>
                        ))
                      ) : (
                        // Musinsa Collector 이미지들
                        [
                          '베스트 결과.jpg',
                          '1.jpg',
                          '2.jpg',
                          '3.jpg',
                          '4.jpg',
                          '설명 1.jpg',
                          '패션 결과.jpg'
                        ].map((filename, index) => (
                          <div 
                            key={index} 
                            className="relative group cursor-pointer"
                            onClick={() => {
                              console.log(`이미지 클릭: ${filename}`);
                              setSelectedImage(`/musinsa/${filename}`);
                            }}
                          >
                            <img
                              src={`/musinsa/${filename}`}
                              alt={`Musinsa Collector 화면 ${index + 1}`}
                              className="w-full h-32 object-cover rounded-lg border border-gray-200 hover:border-blue-300 transition-colors"
                              onError={(e) => {
                                // 이미지 로드 실패 시 플레이스홀더 표시
                                e.currentTarget.style.display = 'none';
                                const placeholder = e.currentTarget.nextElementSibling as HTMLElement;
                                if (placeholder) placeholder.style.display = 'flex';
                              }}
                            />
                            <div 
                              className="w-full h-32 bg-gradient-to-br from-purple-100 to-pink-100 rounded-lg border border-gray-200 hover:border-blue-300 transition-colors flex items-center justify-center absolute inset-0"
                              style={{ display: 'none' }}
                            >
                              <div className="text-center">
                                <div className="text-2xl mb-1">🛍️</div>
                                <p className="text-sm font-medium text-gray-700">화면 {index + 1}</p>
                              </div>
                            </div>
                            <div className="absolute inset-0 bg-black/0 group-hover:bg-black/20 transition-colors rounded-lg flex items-center justify-center">
                              <span className="opacity-0 group-hover:opacity-100 text-white text-sm font-medium transition-opacity">
                                클릭하여 확대
                              </span>
                            </div>
                          </div>
                        ))
                      )}
                    </div>
                    <p className="text-sm text-gray-600 mt-3 text-center">
                      💡 이미지를 클릭하면 크게 볼 수 있습니다
                    </p>
                  </div>
                </div>

                {/* 모달 푸터 */}
                <div className="flex justify-center mt-8 pt-6 border-t">
                  <button
                    onClick={() => setIsProjectModalOpen(false)}
                    className="px-6 py-2 bg-gray-200 text-gray-800 rounded-lg hover:bg-gray-300 transition-colors"
                  >
                    닫기
                  </button>
                </div>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* 이미지 확대 모달 */}
      {selectedImage && (
        <div
          className="fixed inset-0 bg-black/90 flex items-center justify-center z-50 p-4"
          onClick={() => setSelectedImage(null)}
        >
          <div
            className="relative max-w-5xl max-h-[95vh] w-full bg-white rounded-lg overflow-hidden"
            onClick={(e) => e.stopPropagation()}
          >
            {/* 헤더 */}
            <div className="flex justify-between items-center p-4 border-b">
              <h3 className="text-lg font-semibold text-gray-900">LexiLearn 프로젝트 화면</h3>
              <button
                onClick={() => setSelectedImage(null)}
                className="text-gray-500 hover:text-gray-700 text-2xl font-bold"
              >
                ✕
              </button>
            </div>
            
            {/* 이미지 영역 */}
            <div className="p-4 bg-gray-50">
              <div className="bg-white rounded-lg overflow-hidden shadow-lg">
                <img
                  src={selectedImage}
                  alt="LexiLearn 프로젝트 화면 확대"
                  className="w-full h-auto max-h-[60vh] object-contain"
                  onError={(e) => {
                    // 이미지 로드 실패 시 플레이스홀더 표시
                    e.currentTarget.style.display = 'none';
                    const placeholder = e.currentTarget.nextElementSibling as HTMLElement;
                    if (placeholder) placeholder.style.display = 'flex';
                  }}
                />
                <div 
                  className="bg-gradient-to-br from-blue-100 to-purple-100 p-8 text-center"
                  style={{ display: 'none' }}
                >
                  <div className="text-6xl mb-4">🖼️</div>
                  <h4 className="text-xl font-semibold text-gray-800 mb-2">LexiLearn 화면</h4>
                  <p className="text-gray-600 mb-4">이미지를 불러올 수 없습니다</p>
                  <div className="bg-white rounded-lg p-4 shadow-inner">
                    <p className="text-sm text-gray-500">
                      이미지 경로: {selectedImage}
                    </p>
                  </div>
                </div>
              </div>
            </div>
            
            {/* 푸터 */}
            <div className="p-4 border-t bg-gray-50">
              <div className="flex justify-center">
                <button
                  onClick={() => setSelectedImage(null)}
                  className="px-6 py-2 bg-gray-200 text-gray-800 rounded-lg hover:bg-gray-300 transition-colors"
                >
                  닫기
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  );
}