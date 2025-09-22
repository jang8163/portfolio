# 🚀 Jang Won Jun's Portfolio

> **Creative Technologist를 꿈꾸는 프론트엔드 개발자 장원준의 인터랙티브 포트폴리오**

## 🌐 사이트 바로가기

**[🚀 포트폴리오 사이트 방문하기](https://portfolio-ten-opal-53.vercel.app/)**

> 💡 위 링크를 클릭하여 바로 포트폴리오를 체험해보세요!

[![Next.js](https://img.shields.io/badge/Next.js-15.5.2-black?style=flat-square&logo=next.js)](https://nextjs.org/)
[![React](https://img.shields.io/badge/React-19.1.0-blue?style=flat-square&logo=react)](https://reactjs.org/)
[![TypeScript](https://img.shields.io/badge/TypeScript-5-blue?style=flat-square&logo=typescript)](https://www.typescriptlang.org/)
[![Tailwind CSS](https://img.shields.io/badge/Tailwind_CSS-4-38B2AC?style=flat-square&logo=tailwind-css)](https://tailwindcss.com/)
[![Framer Motion](https://img.shields.io/badge/Framer_Motion-12.23.12-black?style=flat-square&logo=framer)](https://www.framer.com/motion/)

## ✨ 주요 특징

### 🎬 시네마틱한 인트로 애니메이션
- **전문적인 첫인상**: 시네마틱한 인트로 오버레이
- **자연스러운 전환**: 메인 콘텐츠로 부드러운 이동
- **브랜딩 강화**: "아이디어를 스케치에서 코드로 옮겨 담는 사람, 장원준입니다" 메시지

### 🔄 인터랙티브 스크롤 애니메이션
- **스크롤 기반 스토리텔링**: 몰입감 있는 경험
- **Sticky 스크롤 효과**: Home 고정 + About 슬라이드업
- **부드러운 애니메이션**: Framer Motion 고급 효과
- **스크롤 스파이 네비게이션**: 현재 섹션 실시간 표시

### 📱 반응형 디자인
- **모바일 우선 설계**: 모든 디바이스 최적화
- **Tailwind CSS**: 유틸리티 퍼스트 반응형 레이아웃
- **터치 친화적**: 모바일에서도 완벽한 사용성

### ⚡ 성능 최적화
- **Next.js 15 + Turbopack**: 최신 기술 스택
- **TypeScript 완전 적용**: 타입 안전성 확보
- **모듈화된 컴포넌트 구조**: 유지보수성 향상
- **빠른 로딩 및 빌드**: 최적화된 성능

## 🛠️ 기술 스택

### Frontend Framework
- **Next.js 15.5.2** - React 기반 풀스택 프레임워크
- **React 19.1.0** - 최신 React 기능 활용
- **TypeScript 5** - 타입 안전성과 개발 경험 향상

### 스타일링 & 애니메이션
- **Tailwind CSS 4** - 유틸리티 퍼스트 CSS 프레임워크
- **Framer Motion 12.23.12** - 고급 애니메이션 라이브러리
- **Geist Font** - 모던한 타이포그래피

### 개발 도구
- **Turbopack** - Next.js 15의 새로운 번들러
- **ESLint** - 코드 품질 관리
- **PostCSS** - CSS 후처리

## 📁 프로젝트 구조

```
portfolio/
├── app/                          # Next.js App Router
│   ├── layout.tsx               # 전역 레이아웃
│   ├── page.tsx                 # 메인 페이지
│   └── globals.css              # 전역 스타일
├── components/                   # React 컴포넌트들
│   ├── StickyHome.tsx          ⭐ # 메인 스크롤 애니메이션
│   ├── Hero.tsx                 # 홈 섹션
│   ├── IntroOverlay.tsx         # 인트로 오버레이
│   ├── NavBar.tsx               # 네비게이션 바
│   ├── FloatingActions.tsx      # 플로팅 액션 버튼
│   └── ...                      # 기타 컴포넌트들
├── hooks/                        # 커스텀 훅
│   └── useScrollSpy.ts          # 스크롤 스파이 기능
├── public/                       # 정적 자산
│   ├── back.png                 # 메인 배경 이미지
│   ├── JANG.jpg                 # 프로필 사진
│   ├── unicon-removebg-preview.png # 유니콘 배경 이미지
│   ├── dex/                     # Web Portfolio 이미지 (1-7.jpg)
│   ├── lexilearn/               # LexiLearn 이미지 (1-10.jpg)
│   ├── health/                  # HealthVoice 이미지
│   └── musinsa/                 # Musinsa Collector 이미지
└── ...                          # 설정 파일들
```

## 🚀 시작하기

### 필수 요구사항
- Node.js 18.0.0 이상
- npm 또는 yarn

### 설치 및 실행

```bash
# 저장소 클론
git clone https://github.com/jang8163/portfolio.git
cd portfolio

# 의존성 설치
npm install

# 개발 서버 실행
npm run dev

# 프로덕션 빌드
npm run build

# 프로덕션 서버 실행
npm start
```

## 📱 섹션 구성

### 🏠 Home
- **인트로 애니메이션**: 시네마틱한 첫인상
- **메인 메시지**: "아이디어를 스케치에서 코드로 옮겨 담는 사람, 장원준입니다"
- **오른쪽 애니메이션**: 상상력을 현실로 구현하는 메시지
- **스크롤 인디케이터**: 부드러운 스크롤 가이드

### 👨‍💻 About Me
- **프로필 사진**: JANG.jpg 사용
- **개인 소개**: Creative Technologist를 꿈꾸는 개발자
- **Interview Q&A**: 3개의 핵심 질문과 답변
  - Creative Technologist가 되고 싶은 이유
  - Voice Agent 분야에 대한 관심
  - 앞으로의 목표

### 🛠️ Skills
- **기술 스택**: Next.js, TypeScript, React, Node.js 등
- **학습 단계**: Beginner 레벨로 표시
- **시각적 표현**: 아이콘과 함께 깔끔한 그리드 레이아웃

### 🎯 Projects
- **LexiLearn**: AI 기반 영어 발음 연습 플랫폼
- **HealthVoice**: 음성 기반 건강 & 웰빙 도우미
- **Musinsa Collector**: 공개 API 기반 패션 상품 데이터 수집 도구
- **Main Portfolio**: Framer를 이용한 메인 포트폴리오
- **Web Portfolio**: 현재 보고 계신 인터랙티브 포트폴리오

### 💼 Experience
- **성장 과정**: 꾸준한 학습과 성실한 태도
- **문제 해결 능력**: 집요한 탐구 정신
- **협업 능력**: 팀원들과의 유연한 소통
- **비전 공유**: "문제를 해결하여 행복을 이룬다"
- **유니콘 메시지**: 특별한 가치로 인정받는 사람이 되겠다는 다짐

### 🙏 Thank You
- **감사 인사**: "봐주셔서 감사합니다 :)"
- **미래 비전**: Creative Technologist로의 성장
- **연락처**: helios8163@gmail.com
- **파티클 효과**: 감동적인 마무리 애니메이션

## 🎨 디자인 특징

### 색상 팔레트
- **메인 블루**: #2B5DD8, #3B6DE8, #7CA7F7
- **그라데이션**: 부드러운 파란색 계열
- **텍스트**: 흰색과 회색 계열의 대비

### 타이포그래피
- **제목**: 굵은 폰트로 강조
- **본문**: 궁서체(font-serif)로 전통적 느낌
- **강조 텍스트**: 흰색으로 하이라이트

### 애니메이션
- **Framer Motion**: 부드럽고 자연스러운 전환
- **스크롤 기반**: 사용자 인터랙션에 반응
- **성능 최적화**: 60fps 유지

## 🔄 최신 업데이트 (2025.01.08)

### ✨ 새로운 기능
- **Web Portfolio 모달**: 상세한 프로젝트 정보와 실행화면 추가
- **메인 이미지 변경**: dex/2.jpg로 프로필 사진 교체
- **배경 이미지**: back.png를 활용한 세련된 홈 배경
- **실행화면 갤러리**: dex 폴더 이미지들을 Web Portfolio 실행화면으로 활용

### 🛠️ 기술적 개선
- **이미지 최적화**: 모든 프로젝트 이미지 경로 정리
- **모달 시스템**: 프로젝트별 상세 정보 표시
- **반응형 디자인**: 모든 디바이스에서 최적화된 경험

## 📧 연락처

- **이메일**: helios8163@gmail.com
- **GitHub**: [@jang8163](https://github.com/jang8163)
- **포트폴리오**: [현재 사이트](https://portfolio-jang8163.vercel.app)

## 📄 라이선스

이 프로젝트는 개인 포트폴리오 목적으로 제작되었습니다.

---

> **"유니콘이 이상적인 기업을 상징하듯, 저는 비록 지금은 작은 시작이지만, 언젠가는 특별한 가치로 인정받는 사람이 되도록 최선을 다하겠습니다."**

**Creative Technologist를 꿈꾸는 개발자, 장원준**