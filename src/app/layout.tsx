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
  title: "QuickCV - 免费AI简历优化器 | 简历匹配度分析+ATS关键词一键优化",
  description:
    "免费AI简历优化工具：粘贴简历和职位描述，秒出优化版简历。智能匹配JD关键词，ATS系统友好排版，面试通过率提升50%+。支持中英文，无需注册。",
  keywords: [
    "简历优化", "简历修改", "简历润色", "AI简历", "简历匹配",
    "ATS简历", "免费简历优化", "求职", "春招", "秋招",
    "简历怎么写", "简历关键词", "应届生简历", "跳槽简历",
    "resume optimizer", "job matching", "ATS resume", "简历模板"
  ],
  openGraph: {
    title: "QuickCV - 免费AI简历优化器 | 粘贴简历秒出优化版",
    description: "AI驱动的免费简历优化工具。粘贴简历+职位描述，即刻获得匹配度评分、ATS关键词优化、量化成就。支持中英文。完全免费，无需注册！",
    type: "website",
    url: "https://tyr1105.github.io/quickcv-ai/",
    siteName: "QuickCV",
    locale: "zh_CN",
    images: [
      {
        url: "https://opengraph.githubassets.com/1/tyr1105/quickcv-ai",
        width: 1200,
        height: 630,
        alt: "QuickCV AI简历优化器",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "QuickCV - 免费AI简历优化器",
    description: "粘贴简历+职位描述，AI秒出优化版。匹配度分析+ATS关键词优化。完全免费！",
    images: ["https://opengraph.githubassets.com/1/tyr1105/quickcv-ai"],
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-video-preview": -1,
      "max-image-preview": "large",
      "max-snippet": -1,
    },
  },
  alternates: {
    canonical: "https://tyr1105.github.io/quickcv-ai/",
    languages: {
      "zh-CN": "https://tyr1105.github.io/quickcv-ai/",
      "en": "https://tyr1105.github.io/quickcv-ai/",
      "x-default": "https://tyr1105.github.io/quickcv-ai/",
    },
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const jsonLdWebApp = {
    "@context": "https://schema.org",
    "@type": "WebApplication",
    name: "QuickCV - AI Resume Optimizer",
    alternateName: "QuickCV AI简历优化器",
    description:
      "Free AI-powered resume optimization tool. Paste your resume and job description to get an optimized version instantly. Features match scoring, ATS keyword optimization, and bilingual support.",
    url: "https://tyr1105.github.io/quickcv-ai/",
    applicationCategory: "BusinessApplication",
    operatingSystem: "Any",
    browserRequirements: "Requires JavaScript. Requires HTML5.",
    offers: {
      "@type": "Offer",
      price: "0",
      priceCurrency: "USD",
    },
    featureList: [
      "AI resume match scoring (0-100)",
      "ATS keyword auto-matching",
      "One-click resume optimization",
      "Bilingual support (Chinese & English)",
      "Quantified achievement optimization",
      "Strong action verb rewriting",
    ],
    audience: {
      "@type": "Audience",
      audienceType: "Job seekers, career changers, students",
    },
    author: {
      "@type": "Organization",
      name: "QuickCV",
      url: "https://github.com/tyr1105/quickcv-ai",
    },
  };

  const jsonLdSoftwareApp = {
    "@context": "https://schema.org",
    "@type": "SoftwareApplication",
    name: "QuickCV",
    description:
      "AI驱动的免费简历优化工具，支持匹配度分析、ATS关键词优化、中英双语",
    url: "https://tyr1105.github.io/quickcv-ai/",
    applicationCategory: "BusinessApplication",
    operatingSystem: "Web",
    offers: {
      "@type": "Offer",
      price: "0",
      priceCurrency: "CNY",
    },
    featureList: [
      "AI简历匹配度分析（0-100分）",
      "ATS关键词自动匹配",
      "一键简历优化",
      "中英双语支持",
      "量化成就优化",
      "强动词改写",
    ],
  };

  return (
    <html lang="zh-CN" className={`${geistSans.variable} ${geistMono.variable} h-full antialiased`}>
      <head>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLdWebApp) }}
        />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLdSoftwareApp) }}
        />
        <meta name="google-site-verification" content="quickcv-ai" />
      </head>
      <body className="min-h-full flex flex-col bg-white text-gray-900">
        {children}
      </body>
    </html>
  );
}