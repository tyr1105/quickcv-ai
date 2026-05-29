import { Sparkles } from "lucide-react";

export default function Footer() {
  return (
    <footer className="bg-gray-50 border-t border-gray-100">
      <div className="max-w-7xl mx-auto px-4 py-10">
        <div className="flex flex-col md:flex-row items-center justify-between gap-6">
          {/* Logo */}
          <div className="flex items-center gap-2">
            <div className="w-7 h-7 bg-gradient-to-br from-purple-600 to-indigo-600 rounded-lg flex items-center justify-center">
              <Sparkles className="w-4 h-4 text-white" />
            </div>
            <span className="text-lg font-bold gradient-text">QuickCV</span>
          </div>

          {/* Links */}
          <div className="flex items-center gap-6 text-sm text-gray-500">
            <a href="#" className="hover:text-purple-600 transition-colors">
              关于我们
            </a>
            <a href="#" className="hover:text-purple-600 transition-colors">
              隐私政策
            </a>
            <a href="#" className="hover:text-purple-600 transition-colors">
              使用条款
            </a>
            <a href="#" className="hover:text-purple-600 transition-colors">
              联系我们
            </a>
          </div>

          {/* Made with AI badge */}
          <div className="flex items-center gap-2">
            <span className="inline-flex items-center gap-1 px-3 py-1 text-xs text-purple-600 bg-purple-50 rounded-full border border-purple-100">
              <Sparkles className="w-3 h-3" />
              Made with AI
            </span>
          </div>
        </div>

        {/* Copyright */}
        <div className="mt-8 pt-6 border-t border-gray-200 text-center text-sm text-gray-400">
          © {new Date().getFullYear()} QuickCV. All rights reserved.
        </div>
      </div>
    </footer>
  );
}
