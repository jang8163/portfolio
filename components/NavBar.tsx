// components/NavBar.tsx
'use client'; // ← 반드시 최상단(주석/공백 없이)

import useScrollSpy from "../hooks/useScrollSpy"; // ← 상대경로!

const IDS = ["home", "about", "skills", "projects", "experience"];

export default function NavBar() {
  const activeId = useScrollSpy({ ids: IDS });

  const handleNavClick = (id: string) => {
    if (id === "home") {
      window.scrollTo({ top: 0, behavior: 'smooth' });
      return;
    }
    
    if (id === "about") {
      // About Me 제목부터 Interview Q1까지 보이도록 최적화된 스크롤 위치
      const targetScroll = window.innerHeight * 0.6; // 110vh - About 섹션이 적절히 올라온 상태
      window.scrollTo({
        top: targetScroll,
        behavior: 'smooth'
      });
      return;
    }
    
    // 다른 섹션들
    const element = document.getElementById(id);
    if (element) {
      const offsetTop = element.offsetTop - 80;
      window.scrollTo({
        top: offsetTop,
        behavior: 'smooth'
      });
    }
  };

  return (
    <header className="sticky top-0 z-[100] border-b border-border bg-white/90 dark:bg-gray-900/90 backdrop-blur-md shadow-sm">
      <nav aria-label="Primary" className="mx-auto max-w-6xl px-4 py-3">
        <ul className="flex flex-wrap items-center gap-2 md:gap-4">
          {IDS.map((id) => {
            const label = id.charAt(0).toUpperCase() + id.slice(1);
            const isActive = activeId === id;
            return (
              <li key={id}>
                <button
                  onClick={() => handleNavClick(id)}
                  aria-current={isActive ? "page" : undefined}
                  className={`px-3 py-2 rounded-md transition-colors focus-visible:outline-2 ${
                    isActive ? "text-blue-600 font-semibold underline" : "text-gray-700 dark:text-gray-300 hover:text-blue-600 dark:hover:text-blue-400"
                  }`}
                >
                  {label}
                </button>
              </li>
            );
          })}
        </ul>
      </nav>
    </header>
  );
}