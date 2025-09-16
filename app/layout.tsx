// app/layout.tsx
import type { Metadata } from "next";
import "./globals.css";
import { GeistSans } from "geist/font/sans";
import { GeistMono } from "geist/font/mono";

import StartAtHome from "@/components/StartAtHome"; // 항상 Home에서 시작

export const metadata: Metadata = {
  title: "Omnicorn | Jang Wonjun",
  description: "Backend-in-progress → Future Full-Stack PM",
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