import React from "react";
import { SectionHeader } from "../shared/SectionHeader";

export const FeatureCards = () => {
  const features = [
    {
      title: "Receipt Recognition",
      description:
        "Our AI recognizes and extracts data from any receipt format, including handwritten ones.",
      icon: (
        <svg
          viewBox="0 0 24 24"
          className="w-6 h-6"
          fill="none"
          stroke="currentColor"
          strokeWidth="1.5"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            d="M7.5 3.75H6A2.25 2.25 0 003.75 6v1.5M16.5 3.75H18A2.25 2.25 0 0120.25 6v1.5m0 9V18A2.25 2.25 0 0118 20.25h-1.5m-9 0H6A2.25 2.25 0 013.75 18v-1.5M15 12a3 3 0 11-6 0 3 3 0 016 0z"
          />
        </svg>
      ),
      gradient: "from-emerald-400 to-teal-500",
    },
    {
      title: "Auto-Categorization",
      description:
        "Expenses are intelligently sorted into categories based on vendor and purchase patterns.",
      icon: (
        <svg
          viewBox="0 0 24 24"
          className="w-6 h-6"
          fill="none"
          stroke="currentColor"
          strokeWidth="1.5"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            d="M9.568 3H5.25A2.25 2.25 0 003 5.25v4.318c0 .597.237 1.17.659 1.591l9.581 9.581c.699.699 1.78.872 2.607.33a18.095 18.095 0 005.223-5.223c.542-.827.369-1.908-.33-2.607L11.16 3.66A2.25 2.25 0 009.568 3z"
          />
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            d="M6 6h.008v.008H6V6z"
          />
        </svg>
      ),
      gradient: "from-teal-400 to-emerald-500",
    },
    {
      title: "Real-time Sync",
      description:
        "All scanned receipts immediately sync across all your devices and team members.",
      icon: (
        <svg
          viewBox="0 0 24 24"
          className="w-6 h-6"
          fill="none"
          stroke="currentColor"
          strokeWidth="1.5"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            d="M7.5 21L3 16.5m0 0L7.5 12M3 16.5h13.5m0-13.5L21 7.5m0 0L16.5 12M21 7.5H7.5"
          />
        </svg>
      ),
      gradient: "from-emerald-400 to-teal-500",
    },
  ];

  return (
    <div className=" w-full py-24 px-4 relative">
      {/* Modern background elements */}
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute -top-24 -right-24 w-96 h-96 rounded-full blur-3xl animate-pulse"></div>
        <div
          className="absolute -bottom-24 -left-24 w-96 h-96 rounded-full  blur-3xl animate-pulse"
          style={{ animationDelay: "2s" }}
        ></div>
        <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-full h-full bg-grid-pattern opacity-5"></div>
      </div>

      <div className="max-w-7xl mx-auto relative z-10">
        <SectionHeader
          subtitle="Powerful Features"
          title="Everything You Need"
          description="Our AI-powered platform handles the tedious work so you can focus on financial insights and growth."
        />

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mt-16">
          {features.map((feature, index) => (
            <FeatureCard key={index} index={index} feature={feature} />
          ))}
        </div>
      </div>
    </div>
  );
};

const FeatureCard = ({
  index,
  feature,
}: {
  index: number;
  feature: {
    title: string;
    description: string;
    icon: React.ReactNode;
    gradient: string;
  };
}) => {
  return (
    <div className="relative backdrop-blur-md bg-white/5 p-8 rounded-2xl border border-white/10 transition-all duration-300 group hover:transform hover:translate-y-1 hover:shadow-lg shadow-xl overflow-hidden">
      {/* Gradient background that reveals on hover */}
      <div className="absolute inset-0 bg-gradient-to-br from-emerald-900/0 to-teal-900/0 group-hover:from-emerald-900/20 group-hover:to-teal-900/20 transition-all duration-500"></div>

      {/* Top accent line */}
      <div
        className={`absolute top-0 left-0 right-0 h-1 bg-gradient-to-r ${feature.gradient} transform scale-x-0 group-hover:scale-x-100 transition-transform duration-300 origin-left`}
      ></div>

      {/* Feature number badge */}
      <div className="absolute top-3 right-3 w-6 h-6 rounded-full bg-white/10 flex items-center justify-center text-xs font-medium text-emerald-300">
        {index + 1}
      </div>

      {/* Icon with gradient background */}
      <div
        className={`mb-6 w-14 h-14 rounded-full bg-gradient-to-br ${feature.gradient} text-white flex items-center justify-center shadow-lg group-hover:shadow-emerald-500/20 transition-all duration-300`}
      >
        {feature.icon}
      </div>

      <h3 className="text-xl font-semibold mb-4 text-white group-hover:text-emerald-300 transition-colors duration-300">
        {feature.title}
      </h3>

      <p className="text-gray-400 group-hover:text-gray-300 transition-colors duration-300 relative z-10">
        {feature.description}
      </p>

      {/* Bottom decoration */}
      <div className="absolute bottom-0 right-0 w-24 h-24 rounded-tl-full bg-gradient-to-tl from-emerald-500/10 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
    </div>
  );
};

export default FeatureCards;
