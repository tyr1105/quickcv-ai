"use client";

import { motion } from "framer-motion";
import { Zap, Shield, Globe, Lock } from "lucide-react";

const trustItems = [
  { icon: Zap, text: "免费试用3次" },
  { icon: Shield, text: "ATS友好" },
  { icon: Globe, text: "支持中英文" },
  { icon: Lock, text: "隐私保护" },
];

export default function HeroSection() {
  return (
    <section className="relative overflow-hidden bg-gradient-to-b from-purple-50/50 via-white to-white pt-16 pb-20">
      {/* Background decoration */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute -top-40 -right-40 w-80 h-80 bg-purple-100 rounded-full blur-3xl opacity-50" />
        <div className="absolute -bottom-40 -left-40 w-80 h-80 bg-indigo-100 rounded-full blur-3xl opacity-50" />
      </div>

      <div className="relative max-w-4xl mx-auto px-4 text-center">
        {/* Badge */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
        >
          <span className="inline-flex items-center gap-2 px-4 py-1.5 text-sm font-medium text-purple-700 bg-purple-100/80 rounded-full">
            <Zap className="w-3.5 h-3.5" />
            AI驱动 · 秒出优化简历
          </span>
        </motion.div>

        {/* H1 */}
        <motion.h1
          className="mt-8 text-4xl sm:text-5xl lg:text-6xl font-bold leading-tight tracking-tight"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.1 }}
        >
          <span className="text-gray-900">粘贴简历+职位描述</span>
          <br />
          <span className="gradient-text">AI立刻输出优化版</span>
        </motion.h1>

        {/* Subtitle */}
        <motion.p
          className="mt-6 text-lg sm:text-xl text-gray-500 max-w-2xl mx-auto leading-relaxed"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.2 }}
        >
          智能匹配职位关键词，ATS系统友好排版，量化你的成就
          <br className="hidden sm:block" />
          让你的简历在HR面前脱颖而出，面试通过率提升50%+
        </motion.p>

        {/* Trust indicators */}
        <motion.div
          className="mt-10 flex flex-wrap items-center justify-center gap-4 sm:gap-6"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.5, delay: 0.3 }}
        >
          {trustItems.map((item) => (
            <div
              key={item.text}
              className="flex items-center gap-1.5 text-sm text-gray-500"
            >
              <item.icon className="w-4 h-4 text-purple-500" />
              <span>✓ {item.text}</span>
            </div>
          ))}
        </motion.div>

        {/* CTA */}
        <motion.div
          className="mt-10"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.4 }}
        >
          <a
            href="#tool"
            className="inline-flex items-center gap-2 px-8 py-3.5 text-base font-semibold text-white bg-gradient-to-r from-purple-600 to-indigo-600 rounded-full hover:shadow-xl hover:shadow-purple-200 transition-all duration-300 hover:-translate-y-0.5"
          >
            开始优化简历 →
          </a>
        </motion.div>
      </div>
    </section>
  );
}
