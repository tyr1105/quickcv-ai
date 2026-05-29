import { Sparkles } from "lucide-react";

export default function Header() {
  return (
    <header className="sticky top-0 z-50 bg-white/80 backdrop-blur-md border-b border-gray-100">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          {/* Logo */}
          <div className="flex items-center gap-2">
            <div className="w-8 h-8 bg-gradient-to-br from-purple-600 to-indigo-600 rounded-lg flex items-center justify-center">
              <Sparkles className="w-5 h-5 text-white" />
            </div>
            <span className="text-xl font-bold gradient-text">QuickCV</span>
          </div>

          {/* Nav */}
          <nav className="hidden sm:flex items-center gap-6 text-sm text-gray-600">
            <a href="#tool" className="hover:text-purple-600 transition-colors">
              开始使用
            </a>
            <a href="#pricing" className="hover:text-purple-600 transition-colors">
              定价
            </a>
          </nav>

          {/* CTA */}
          <a
            href="#tool"
            className="inline-flex items-center gap-1.5 px-4 py-2 text-sm font-medium text-white bg-gradient-to-r from-purple-600 to-indigo-600 rounded-full hover:shadow-lg hover:shadow-purple-200 transition-all duration-300 hover:-translate-y-0.5"
          >
            免费使用
          </a>
        </div>
      </div>
    </header>
  );
}
