# 🚀 장원준의 포트폴리오

> **프론트엔드 개발자 장원준의 개인 포트폴리오 웹사이트**

[![Live Demo](https://img.shields.io/badge/Live%20Demo-Visit%20Portfolio-blue?style=for-the-badge&logo=vercel)](https://portfolio-git-main-jangwonjuns-projects.vercel.app)
[![Next.js](https://img.shields.io/badge/Next.js-15.5.2-black?style=for-the-badge&logo=next.js)](https://nextjs.org/)
[![TypeScript](https://img.shields.io/badge/TypeScript-5.0-blue?style=for-the-badge&logo=typescript)](https://www.typescriptlang.org/)
[![Tailwind CSS](https://img.shields.io/badge/Tailwind%20CSS-4.0-38B2AC?style=for-the-badge&logo=tailwind-css)](https://tailwindcss.com/)

## 📋 프로젝트 소개

이 프로젝트는 프론트엔드 개발자 장원준의 개인 포트폴리오 웹사이트입니다. 
현대적이고 인터랙티브한 UI/UX를 통해 개인 정보, 기술 스택, 프로젝트 경험을 효과적으로 소개합니다.

### ✨ 주요 특징

- 🎨 **모던한 디자인**: 깔끔하고 세련된 UI/UX
- 📱 **반응형 웹**: 모든 디바이스에서 최적화된 경험
- ⚡ **부드러운 애니메이션**: Framer Motion을 활용한 인터랙티브 애니메이션
- 🧭 **직관적인 네비게이션**: 스크롤 스파이 기능과 스티키 네비게이션
- 🎯 **원페이지 디자인**: 스크롤을 통한 자연스러운 섹션 전환

## 🛠️ 기술 스택

### Frontend
- **Next.js 15.5.2** - React 프레임워크
- **TypeScript 5.0** - 타입 안전성
- **Tailwind CSS 4.0** - 유틸리티 퍼스트 CSS 프레임워크
- **Framer Motion 12.23.12** - 애니메이션 라이브러리
- **Lucide React** - 아이콘 라이브러리

### Development Tools
- **ESLint** - 코드 품질 관리
- **PostCSS** - CSS 후처리
- **Geist Font** - Vercel의 모던 폰트

## 🚀 시작하기

### 사전 요구사항
- Node.js 18.0 이상
- npm 또는 yarn

### 설치 및 실행

1. **저장소 클론**
```bash
git clone https://github.com/jang8163/portfolio.git
cd portfolio
```

2. **의존성 설치**
```bash
npm install
# 또는
yarn install
```

3. **개발 서버 실행**
```bash
npm run dev
# 또는
yarn dev
```

4. **브라우저에서 확인**
```
http://localhost:3001
```

## 📁 프로젝트 구조

```
portfolio/
├── app/                    # Next.js App Router
│   ├── globals.css        # 전역 스타일
│   ├── layout.tsx         # 루트 레이아웃
│   └── page.tsx           # 메인 페이지
├── components/            # React 컴포넌트
│   ├── AnimateIn.tsx      # 애니메이션 컴포넌트
│   ├── Container.tsx      # 컨테이너 컴포넌트
│   ├── FloatingActions.tsx # 플로팅 액션 버튼
│   ├── Hero.tsx           # 히어로 섹션
│   ├── IntroOverlay.tsx   # 인트로 오버레이
│   ├── NavBar.tsx         # 네비게이션 바
│   ├── Section.tsx        # 섹션 컴포넌트
│   └── StickyHome.tsx     # 스티키 홈 섹션
├── hooks/                 # 커스텀 훅
│   └── useScrollSpy.ts    # 스크롤 스파이 훅
├── public/                # 정적 파일
│   ├── about-me.jpg       # 프로필 이미지
│   ├── health/            # 건강 관리 프로젝트 이미지
│   ├── lexilearn/         # LexiLearn 프로젝트 이미지
│   └── musinsa/           # 무신사 프로젝트 이미지
└── package.json           # 프로젝트 설정
```

## 🎯 주요 섹션

### 🏠 Home
- 인트로 오버레이 애니메이션
- "프론트엔드 개발자 장원준입니다" 소개

### 👨‍💻 About Me
- 개인 소개 및 경력
- Interview Q&A 3개 포함
- 파란색 배경의 컴팩트한 디자인

### 🛠️ Skills
- 보유 기술 스택 소개
- 프론트엔드 기술 중심

### 🚀 Projects
- 주요 프로젝트 포트폴리오
- LexiLearn, 건강 관리 앱, 무신사 프로젝트 등

### 💼 Experience
- 업무 경험 및 프로젝트 경험

### 🔧 Backend Demos
- 백엔드 관련 데모 프로젝트

### 📧 Contact
- 연락처 정보
- 이메일: helios8163@gmail.com

## 🎨 디자인 특징

- **색상 테마**: 파란색 계열의 일관된 디자인
- **애니메이션**: 부드러운 스크롤 애니메이션과 섹션 전환
- **네비게이션**: 스티키 네비게이션과 스크롤 스파이
- **플로팅 액션**: 이메일 복사 및 맨 위로 가기 버튼

## 🚀 배포

이 프로젝트는 Vercel을 통해 배포됩니다.

[![Deploy with Vercel](https://vercel.com/button)](https://vercel.com/new/clone?repository-url=https://github.com/jang8163/portfolio)

### 배포 단계
1. GitHub에 코드 푸시
2. Vercel 계정 연결
3. 자동 배포 설정
4. 커스텀 도메인 설정 (선택사항)

## 📞 연락처

- **이메일**: helios8163@gmail.com
- **GitHub**: [jang8163](https://github.com/jang8163)
- **포트폴리오**: [Live Demo](https://portfolio-git-main-jangwonjuns-projects.vercel.app)

## 📄 라이선스

이 프로젝트는 개인 포트폴리오 목적으로 제작되었습니다.

---

⭐ **이 프로젝트가 도움이 되었다면 스타를 눌러주세요!**