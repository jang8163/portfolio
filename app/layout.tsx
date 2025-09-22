// app/layout.tsx
import type { Metadata } from "next";
import "./globals.css";
import { GeistSans } from "geist/font/sans";
import { GeistMono } from "geist/font/mono";

import StartAtHome from "@/components/StartAtHome"; // 항상 Home에서 시작

export const metadata: Metadata = {
  title: "Portfolio | 장원준",
  description: "프론트엔드 개발자 장원준의 개인 포트폴리오 웹사이트",
  openGraph: {
    title: "Portfolio | 장원준",
    description: "프론트엔드 개발자 장원준의 개인 포트폴리오 웹사이트",
    images: [
      {
        url: "/dex/2.jpg",
        width: 1200,
        height: 630,
        alt: "장원준 포트폴리오",
      },
    ],
    type: "website",
    locale: "ko_KR",
    siteName: "장원준 포트폴리오",
  },
  twitter: {
    card: "summary_large_image",
    title: "Portfolio | 장원준",
    description: "프론트엔드 개발자 장원준의 개인 포트폴리오 웹사이트",
    images: ["/dex/2.jpg"],
  },
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="ko" className={`${GeistSans.variable} ${GeistMono.variable}`}>
      <body className="font-sans bg-background text-foreground antialiased">
        <a href="#home" className="skip-link">본문으로 건너뛰기</a>
        <StartAtHome />
        {children}
      </body>
    </html>
  );
}