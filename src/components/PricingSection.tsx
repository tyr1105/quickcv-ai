import { Check, Crown } from "lucide-react";

const plans = [
  {
    name: "免费版",
    price: "¥0",
    period: "永久免费",
    description: "体验AI简历优化的核心功能",
    features: ["3次简历优化", "基础匹配度分析", "支持中英文", "基础优化建议"],
    cta: "免费开始",
    highlighted: false,
    badge: null,
  },
  {
    name: "Pro",
    price: "¥29.9",
    period: "/月",
    description: "无限使用，深度优化",
    features: [
      "无限次简历优化",
      "深度匹配度分析",
      "ATS兼容性报告",
      "一键多版本生成",
      "关键词密度优化",
      "优先客服支持",
    ],
    cta: "升级 Pro",
    highlighted: true,
    badge: "推荐",
  },
];

export default function PricingSection() {
  return (
    <section id="pricing" className="py-20 px-4 bg-white">
      <div className="max-w-4xl mx-auto">
        {/* Header */}
        <div className="text-center mb-12">
          <h2 className="text-2xl sm:text-3xl font-bold text-gray-900">
            简单透明的定价
          </h2>
          <p className="mt-2 text-gray-500">
            免费试用，满意后再升级
          </p>
        </div>

        {/* Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {plans.map((plan) => (
            <div
              key={plan.name}
              className={`relative rounded-2xl p-6 border transition-all ${
                plan.highlighted
                  ? "border-purple-300 shadow-lg shadow-purple-100 bg-gradient-to-b from-purple-50/50 to-white"
                  : "border-gray-200 bg-white hover:shadow-md"
              }`}
            >
              {/* Badge */}
              {plan.badge && (
                <span className="absolute -top-3 left-6 inline-flex items-center gap-1 px-3 py-1 text-xs font-semibold text-white bg-gradient-to-r from-purple-600 to-indigo-600 rounded-full">
                  <Crown className="w-3 h-3" />
                  {plan.badge}
                </span>
              )}

              {/* Plan info */}
              <div className="mb-6">
                <h3 className="text-lg font-bold text-gray-900">{plan.name}</h3>
                <p className="mt-1 text-sm text-gray-500">{plan.description}</p>
              </div>

              {/* Price */}
              <div className="mb-6">
                <span className="text-4xl font-bold text-gray-900">{plan.price}</span>
                <span className="text-gray-500 text-sm">{plan.period}</span>
              </div>

              {/* Features */}
              <ul className="space-y-3 mb-8">
                {plan.features.map((feature) => (
                  <li key={feature} className="flex items-center gap-2 text-sm text-gray-600">
                    <Check className={`w-4 h-4 flex-shrink-0 ${plan.highlighted ? "text-purple-500" : "text-gray-400"}`} />
                    {feature}
                  </li>
                ))}
              </ul>

              {/* CTA */}
              <div className="relative">
                <button
                  className={`w-full py-2.5 rounded-xl text-sm font-medium transition-all ${
                    plan.highlighted
                      ? "text-white bg-gradient-to-r from-purple-600 to-indigo-600 hover:shadow-lg hover:shadow-purple-200 hover:-translate-y-0.5"
                      : "text-gray-700 bg-gray-100 hover:bg-gray-200"
                  }`}
                >
                  {plan.cta}
                </button>
                {plan.highlighted && (
                  <span className="absolute -top-2 -right-2 px-2 py-0.5 text-xs text-purple-600 bg-purple-100 rounded-full">
                    即将上线
                  </span>
                )}
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
