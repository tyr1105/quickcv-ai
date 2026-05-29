import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "QuickCV - AI简历优化器",
  description:
    "粘贴简历和职位描述，AI秒出优化版，匹配度提升50%+。ATS友好，支持中英文，免费试用。",
  keywords: ["简历优化", "AI简历", "ATS", "求职", "resume optimizer", "job matching"],
  openGraph: {
    title: "QuickCV - AI简历优化器",
    description: "AI驱动的简历优化工具，秒出优化版简历，提升面试通过率",
    type: "website",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="zh-CN" className={`${geistSans.variable} ${geistMono.variable} h-full antialiased`}>
      <body className="min-h-full flex flex-col bg-white text-gray-900">
        {children}
      </body>
    </html>
  );
}
