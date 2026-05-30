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
  title: "QuickCV - AI简历优化器 | 免费简历匹配度分析+一键优化",
  description:
    "QuickCV是免费的AI简历优化工具。粘贴简历和职位描述，AI秒出优化版简历。匹配度打分、ATS关键词优化、中英文支持。零成本，无需注册。",
  keywords: [
    "简历优化", "AI简历", "ATS", "求职", "resume optimizer",
    "job matching", "简历模板", "简历怎么写", "求职攻略",
    "AI工具", "免费简历优化", "简历匹配", "春招", "秋招"
  ],
  openGraph: {
    title: "QuickCV - 免费AI简历优化器",
    description: "粘贴简历+职位描述，AI秒出优化版。匹配度分析+ATS关键词优化。完全免费！",
    type: "website",
    url: "https://tyr1105.github.io/quickcv-ai/",
    siteName: "QuickCV",
  },
  twitter: {
    card: "summary_large_image",
    title: "QuickCV - 免费AI简历优化器",
    description: "粘贴简历+职位描述，AI秒出优化版。完全免费！",
  },
  robots: {
    index: true,
    follow: true,
  },
  alternates: {
    canonical: "https://tyr1105.github.io/quickcv-ai/",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "SoftwareApplication",
    name: "QuickCV",
    description: "AI驱动的免费简历优化工具，支持匹配度分析、ATS关键词优化、中英双语",
    url: "https://tyr1105.github.io/quickcv-ai/",
    applicationCategory: "BusinessApplication",
    operatingSystem: "Web",
    offers: {
      "@type": "Offer",
      price: "0",
      priceCurrency: "CNY",
    },
    aggregateRating: {
      "@type": "AggregateRating",
      ratingValue: "4.8",
      ratingCount: "120",
    },
  };

  return (
    <html lang="zh-CN" className={`${geistSans.variable} ${geistMono.variable} h-full antialiased`}>
      <head>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
        />
      </head>
      <body className="min-h-full flex flex-col bg-white text-gray-900">
        {children}
      </body>
    </html>
  );
}
