// components/FloatingActions.tsx
'use client';

import * as React from 'react';
import { motion } from 'framer-motion';

// 아이콘 컴포넌트들
type IconProps = React.SVGProps<SVGSVGElement>;

const MailIcon: React.FC<IconProps> = (props) => (
  <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" {...props}>
    <rect x="2" y="4" width="20" height="16" rx="2" />
    <path d="m2 7 10 5 10-5" />
  </svg>
);

const ChevronUpIcon: React.FC<IconProps> = (props) => (
  <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" {...props}>
    <path d="m18 15-6-6-6 6" />
  </svg>
);

export default function FloatingActions(): React.JSX.Element {
  const [showTooltip, setShowTooltip] = React.useState<string | null>(null);

  // 이메일 주소 복사하기
  const copyEmail = async () => {
    const email = 'helios8163@gmail.com';
    try {
      await navigator.clipboard.writeText(email);
      setShowTooltip('copied');
      setTimeout(() => setShowTooltip(null), 2000);
    } catch (err) {
      console.error('이메일 복사 실패:', err);
      // 폴백: 텍스트 선택
      const textArea = document.createElement('textarea');
      textArea.value = email;
      document.body.appendChild(textArea);
      textArea.select();
      document.execCommand('copy');
      document.body.removeChild(textArea);
      setShowTooltip('copied');
      setTimeout(() => setShowTooltip(null), 2000);
    }
  };

  // 페이지 맨 위로 스크롤
  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: 'smooth'
    });
  };

  return (
    <div className="fixed bottom-6 right-6 z-50 flex flex-col gap-3">
      {/* 이메일 복사 버튼 */}
      <div className="relative">
        <motion.button
          onClick={copyEmail}
          onMouseEnter={() => setShowTooltip('email')}
          onMouseLeave={() => setShowTooltip(null)}
          className="flex items-center justify-center w-12 h-12 bg-white dark:bg-gray-800 rounded-full shadow-lg border border-gray-200 dark:border-gray-700 text-gray-700 dark:text-gray-300 hover:text-primary hover:border-primary transition-colors"
          whileHover={{ scale: 1.1 }}
          whileTap={{ scale: 0.9 }}
          aria-label="이메일 주소 복사"
        >
          <MailIcon />
        </motion.button>
        
        {/* 툴팁 */}
        {showTooltip === 'email' && (
          <motion.div
            initial={{ opacity: 0, x: 10 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: 10 }}
            className="absolute right-full mr-3 top-1/2 -translate-y-1/2 px-3 py-2 bg-gray-900 dark:bg-gray-700 text-white text-sm rounded-lg"
          >
            <div className="text-center">
              <div className="font-medium">helios8163@gmail.com</div>
              <div className="text-xs mt-1">이메일 복사</div>
            </div>
            <div className="absolute left-full top-1/2 -translate-y-1/2 w-0 h-0 border-l-4 border-l-gray-900 dark:border-l-gray-700 border-y-4 border-y-transparent"></div>
          </motion.div>
        )}
        
        {showTooltip === 'copied' && (
          <motion.div
            initial={{ opacity: 0, x: 10 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: 10 }}
            className="absolute right-full mr-3 top-1/2 -translate-y-1/2 px-3 py-2 bg-green-600 text-white text-sm rounded-lg whitespace-nowrap"
          >
            복사완료!
            <div className="absolute left-full top-1/2 -translate-y-1/2 w-0 h-0 border-l-4 border-l-green-600 border-y-4 border-y-transparent"></div>
          </motion.div>
        )}
      </div>

      {/* 맨 위로 가기 버튼 */}
      <div className="relative">
        <motion.button
          onClick={scrollToTop}
          onMouseEnter={() => setShowTooltip('top')}
          onMouseLeave={() => setShowTooltip(null)}
          className="flex items-center justify-center w-12 h-12 bg-white dark:bg-gray-800 rounded-full shadow-lg border border-gray-200 dark:border-gray-700 text-gray-700 dark:text-gray-300 hover:text-primary hover:border-primary transition-colors"
          whileHover={{ scale: 1.1 }}
          whileTap={{ scale: 0.9 }}
          aria-label="맨 위로 가기"
        >
          <ChevronUpIcon />
        </motion.button>
        
        {/* 툴팁 */}
        {showTooltip === 'top' && (
          <motion.div
            initial={{ opacity: 0, x: 10 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: 10 }}
            className="absolute right-full mr-3 top-1/2 -translate-y-1/2 px-3 py-2 bg-gray-900 dark:bg-gray-700 text-white text-sm rounded-lg whitespace-nowrap"
          >
            맨 위로
            <div className="absolute left-full top-1/2 -translate-y-1/2 w-0 h-0 border-l-4 border-l-gray-900 dark:border-l-gray-700 border-y-4 border-y-transparent"></div>
          </motion.div>
        )}
      </div>
    </div>
  );
}