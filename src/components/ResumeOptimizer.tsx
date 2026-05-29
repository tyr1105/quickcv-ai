"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  Search,
  Wand2,
  Copy,
  Check,
  Loader2,
  AlertCircle,
  ThumbsUp,
  ThumbsDown,
  Key,
  Lightbulb,
} from "lucide-react";

interface AnalysisResult {
  matchScore: number;
  strengths: string[];
  weaknesses: string[];
  missingKeywords: string[];
  suggestions: string[];
}

export default function ResumeOptimizer() {
  const [resume, setResume] = useState("");
  const [jobDescription, setJobDescription] = useState("");
  const [language, setLanguage] = useState<"zh" | "en">("zh");

  const [analyzeLoading, setAnalyzeLoading] = useState(false);
  const [optimizeLoading, setOptimizeLoading] = useState(false);
  const [analyzeResult, setAnalyzeResult] = useState<AnalysisResult | null>(null);
  const [optimizeResult, setOptimizeResult] = useState<string | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [copied, setCopied] = useState(false);

  const handleAnalyze = async () => {
    if (!resume.trim() || !jobDescription.trim()) {
      setError("请输入简历和职位描述");
      return;
    }
    setError(null);
    setOptimizeResult(null);
    setAnalyzeLoading(true);
    try {
      const res = await fetch("/api/analyze", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ resume, jobDescription }),
      });
      const data = await res.json();
      if (data.error) {
        setError(data.error);
      } else {
        setAnalyzeResult(data);
      }
    } catch {
      setError("网络错误，请重试");
    } finally {
      setAnalyzeLoading(false);
    }
  };

  const handleOptimize = async () => {
    if (!resume.trim() || !jobDescription.trim()) {
      setError("请输入简历和职位描述");
      return;
    }
    setError(null);
    setAnalyzeResult(null);
    setOptimizeLoading(true);
    try {
      const res = await fetch("/api/optimize", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ resume, jobDescription, language }),
      });
      const data = await res.json();
      if (data.error) {
        setError(data.error);
      } else {
        setOptimizeResult(data.result);
      }
    } catch {
      setError("网络错误，请重试");
    } finally {
      setOptimizeLoading(false);
    }
  };

  const handleCopy = async () => {
    if (optimizeResult) {
      await navigator.clipboard.writeText(optimizeResult);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    }
  };

  const getScoreColor = (score: number) => {
    if (score >= 80) return "text-green-500";
    if (score >= 60) return "text-yellow-500";
    return "text-red-500";
  };

  const getScoreBg = (score: number) => {
    if (score >= 80) return "from-green-50 to-emerald-50 border-green-200";
    if (score >= 60) return "from-yellow-50 to-amber-50 border-yellow-200";
    return "from-red-50 to-rose-50 border-red-200";
  };

  const renderMarkdown = (text: string) => {
    const lines = text.split("\n");
    const elements: React.ReactNode[] = [];
    let inList = false;
    let listItems: string[] = [];

    const flushList = () => {
      if (listItems.length > 0) {
        elements.push(
          <ul key={`list-${elements.length}`} className="list-disc pl-6 space-y-1 mb-3">
            {listItems.map((item, i) => (
              <li key={i} className="text-gray-600 leading-relaxed" dangerouslySetInnerHTML={{ __html: item }} />
            ))}
          </ul>
        );
        listItems = [];
      }
      inList = false;
    };

    lines.forEach((line, i) => {
      const trimmed = line.trim();

      if (trimmed.startsWith("### ")) {
        flushList();
        elements.push(
          <h3 key={i} className="text-base font-semibold text-gray-700 mt-4 mb-2">
            {trimmed.slice(4)}
          </h3>
        );
      } else if (trimmed.startsWith("## ")) {
        flushList();
        elements.push(
          <h2 key={i} className="text-lg font-bold text-gray-800 mt-6 mb-3 pb-2 border-b border-gray-100">
            {trimmed.slice(3)}
          </h2>
        );
      } else if (trimmed.startsWith("# ")) {
        flushList();
        elements.push(
          <h1 key={i} className="text-xl font-bold text-gray-900 mt-4 mb-3">
            {trimmed.slice(2)}
          </h1>
        );
      } else if (trimmed.startsWith("- ") || trimmed.startsWith("* ")) {
        inList = true;
        const content = trimmed.slice(2).replace(/\*\*(.*?)\*\*/g, '<strong>$1</strong>');
        listItems.push(content);
      } else if (trimmed.startsWith("---")) {
        flushList();
        elements.push(<hr key={i} className="my-4 border-gray-200" />);
      } else if (trimmed === "") {
        flushList();
      } else {
        flushList();
        const content = trimmed
          .replace(/\*\*(.*?)\*\*/g, '<strong class="font-semibold text-gray-800">$1</strong>')
          .replace(/\*(.*?)\*/g, '<em>$1</em>');
        elements.push(
          <p key={i} className="text-gray-600 leading-relaxed mb-2" dangerouslySetInnerHTML={{ __html: content }} />
        );
      }
    });

    flushList();
    return elements;
  };

  return (
    <section id="tool" className="py-16 px-4 bg-gray-50/50">
      <div className="max-w-6xl mx-auto">
        {/* Section header */}
        <div className="text-center mb-10">
          <h2 className="text-2xl sm:text-3xl font-bold text-gray-900">
            开始优化你的简历
          </h2>
          <p className="mt-2 text-gray-500">
            粘贴简历内容和目标职位描述，AI帮你分析匹配度并优化
          </p>
        </div>

        {/* Input area */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {/* Resume textarea */}
          <div className="space-y-2">
            <label className="block text-sm font-medium text-gray-700">
              📄 简历内容
            </label>
            <textarea
              className="w-full h-64 p-4 bg-white border border-gray-200 rounded-xl text-sm text-gray-800 placeholder-gray-400 resize-none focus:outline-none focus:ring-2 focus:ring-purple-400 focus:border-transparent transition-all"
              placeholder="粘贴你的简历内容...&#10;&#10;张三&#10;前端开发工程师 | 3年经验&#10;&#10;教育背景：XXX大学 计算机科学&#10;工作经历：XXX公司 前端开发&#10;..."
              value={resume}
              onChange={(e) => setResume(e.target.value)}
            />
          </div>

          {/* Job description textarea */}
          <div className="space-y-2">
            <label className="block text-sm font-medium text-gray-700">
              🎯 职位描述
            </label>
            <textarea
              className="w-full h-64 p-4 bg-white border border-gray-200 rounded-xl text-sm text-gray-800 placeholder-gray-400 resize-none focus:outline-none focus:ring-2 focus:ring-purple-400 focus:border-transparent transition-all"
              placeholder="粘贴目标职位描述...&#10;&#10;职位：高级前端开发工程师&#10;要求：3年以上React开发经验...&#10;..."
              value={jobDescription}
              onChange={(e) => setJobDescription(e.target.value)}
            />
          </div>
        </div>

        {/* Controls */}
        <div className="mt-6 flex flex-col sm:flex-row items-center justify-between gap-4">
          {/* Language toggle */}
          <div className="flex items-center gap-2">
            <span className="text-sm text-gray-500">输出语言：</span>
            <div className="flex bg-gray-100 rounded-lg p-1">
              <button
                className={`px-3 py-1.5 text-sm font-medium rounded-md transition-all ${
                  language === "zh"
                    ? "bg-white text-purple-700 shadow-sm"
                    : "text-gray-500 hover:text-gray-700"
                }`}
                onClick={() => setLanguage("zh")}
              >
                中文
              </button>
              <button
                className={`px-3 py-1.5 text-sm font-medium rounded-md transition-all ${
                  language === "en"
                    ? "bg-white text-purple-700 shadow-sm"
                    : "text-gray-500 hover:text-gray-700"
                }`}
                onClick={() => setLanguage("en")}
              >
                English
              </button>
            </div>
          </div>

          {/* Action buttons */}
          <div className="flex gap-3">
            <button
              onClick={handleAnalyze}
              disabled={analyzeLoading || optimizeLoading}
              className="inline-flex items-center gap-2 px-5 py-2.5 text-sm font-medium text-purple-700 bg-purple-50 border border-purple-200 rounded-xl hover:bg-purple-100 transition-all disabled:opacity-50 disabled:cursor-not-allowed"
            >
              {analyzeLoading ? (
                <Loader2 className="w-4 h-4 animate-spin" />
              ) : (
                <Search className="w-4 h-4" />
              )}
              {analyzeLoading ? "分析中..." : "分析匹配度"}
            </button>
            <button
              onClick={handleOptimize}
              disabled={analyzeLoading || optimizeLoading}
              className="inline-flex items-center gap-2 px-5 py-2.5 text-sm font-medium text-white bg-gradient-to-r from-purple-600 to-indigo-600 rounded-xl hover:shadow-lg hover:shadow-purple-200 transition-all disabled:opacity-50 disabled:cursor-not-allowed hover:-translate-y-0.5"
            >
              {optimizeLoading ? (
                <Loader2 className="w-4 h-4 animate-spin" />
              ) : (
                <Wand2 className="w-4 h-4" />
              )}
              {optimizeLoading ? "优化中..." : "优化简历"}
            </button>
          </div>
        </div>

        {/* Error */}
        <AnimatePresence>
          {error && (
            <motion.div
              initial={{ opacity: 0, y: -10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -10 }}
              className="mt-4 flex items-center gap-2 p-3 text-sm text-red-700 bg-red-50 border border-red-200 rounded-xl"
            >
              <AlertCircle className="w-4 h-4 flex-shrink-0" />
              {error}
            </motion.div>
          )}
        </AnimatePresence>

        {/* Results */}
        <AnimatePresence mode="wait">
          {/* Analysis Results */}
          {analyzeResult && (
            <motion.div
              key="analyze"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              transition={{ duration: 0.4 }}
              className="mt-8 space-y-6"
            >
              {/* Score card */}
              <div
                className={`flex flex-col sm:flex-row items-center gap-6 p-6 bg-gradient-to-r ${getScoreBg(analyzeResult.matchScore)} border rounded-2xl`}
              >
                <div className="text-center sm:text-left">
                  <div className={`text-6xl font-bold ${getScoreColor(analyzeResult.matchScore)}`}>
                    {analyzeResult.matchScore}
                  </div>
                  <div className="text-sm text-gray-500 mt-1">匹配度分数</div>
                </div>
                <div className="flex-1 text-center sm:text-left">
                  <p className="text-sm text-gray-600">
                    {analyzeResult.matchScore >= 80
                      ? "🎉 你的简历与该职位高度匹配！"
                      : analyzeResult.matchScore >= 60
                      ? "💪 匹配度不错，还有一些优化空间"
                      : "⚡ 匹配度较低，建议使用AI优化简历"}
                  </p>
                </div>
              </div>

              {/* Details grid */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {/* Strengths */}
                {analyzeResult.strengths?.length > 0 && (
                  <div className="p-5 bg-white rounded-xl border border-gray-100 shadow-sm">
                    <div className="flex items-center gap-2 mb-3">
                      <ThumbsUp className="w-4 h-4 text-green-500" />
                      <h3 className="font-semibold text-gray-800">优势</h3>
                    </div>
                    <ul className="space-y-1.5">
                      {analyzeResult.strengths.map((s, i) => (
                        <li key={i} className="text-sm text-gray-600 flex items-start gap-2">
                          <span className="text-green-400 mt-1">•</span>
                          {s}
                        </li>
                      ))}
                    </ul>
                  </div>
                )}

                {/* Weaknesses */}
                {analyzeResult.weaknesses?.length > 0 && (
                  <div className="p-5 bg-white rounded-xl border border-gray-100 shadow-sm">
                    <div className="flex items-center gap-2 mb-3">
                      <ThumbsDown className="w-4 h-4 text-red-500" />
                      <h3 className="font-semibold text-gray-800">不足</h3>
                    </div>
                    <ul className="space-y-1.5">
                      {analyzeResult.weaknesses.map((w, i) => (
                        <li key={i} className="text-sm text-gray-600 flex items-start gap-2">
                          <span className="text-red-400 mt-1">•</span>
                          {w}
                        </li>
                      ))}
                    </ul>
                  </div>
                )}

                {/* Missing keywords */}
                {analyzeResult.missingKeywords?.length > 0 && (
                  <div className="p-5 bg-white rounded-xl border border-gray-100 shadow-sm">
                    <div className="flex items-center gap-2 mb-3">
                      <Key className="w-4 h-4 text-amber-500" />
                      <h3 className="font-semibold text-gray-800">缺失关键词</h3>
                    </div>
                    <div className="flex flex-wrap gap-2">
                      {analyzeResult.missingKeywords.map((k, i) => (
                        <span
                          key={i}
                          className="px-2.5 py-1 text-xs font-medium text-amber-700 bg-amber-50 border border-amber-200 rounded-full"
                        >
                          {k}
                        </span>
                      ))}
                    </div>
                  </div>
                )}

                {/* Suggestions */}
                {analyzeResult.suggestions?.length > 0 && (
                  <div className="p-5 bg-white rounded-xl border border-gray-100 shadow-sm">
                    <div className="flex items-center gap-2 mb-3">
                      <Lightbulb className="w-4 h-4 text-purple-500" />
                      <h3 className="font-semibold text-gray-800">优化建议</h3>
                    </div>
                    <ul className="space-y-1.5">
                      {analyzeResult.suggestions.map((s, i) => (
                        <li key={i} className="text-sm text-gray-600 flex items-start gap-2">
                          <span className="text-purple-400 mt-1">•</span>
                          {s}
                        </li>
                      ))}
                    </ul>
                  </div>
                )}
              </div>
            </motion.div>
          )}

          {/* Optimization Result */}
          {optimizeResult && (
            <motion.div
              key="optimize"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              transition={{ duration: 0.4 }}
              className="mt-8"
            >
              <div className="bg-white rounded-2xl border border-gray-100 shadow-sm overflow-hidden">
                {/* Header */}
                <div className="flex items-center justify-between px-6 py-4 border-b border-gray-100 bg-gray-50/50">
                  <h3 className="font-semibold text-gray-800">✨ 优化后简历</h3>
                  <button
                    onClick={handleCopy}
                    className="inline-flex items-center gap-1.5 px-3 py-1.5 text-sm text-gray-600 bg-white border border-gray-200 rounded-lg hover:bg-gray-50 transition-all"
                  >
                    {copied ? (
                      <>
                        <Check className="w-3.5 h-3.5 text-green-500" />
                        已复制
                      </>
                    ) : (
                      <>
                        <Copy className="w-3.5 h-3.5" />
                        复制
                      </>
                    )}
                  </button>
                </div>

                {/* Content */}
                <div className="p-6 prose max-w-none">
                  {renderMarkdown(optimizeResult)}
                </div>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </section>
  );
}
