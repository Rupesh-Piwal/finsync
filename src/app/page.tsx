import { Button } from "@/components/ui/button";
import { auth } from "@/lib/auth";
import Link from "next/link";
import { redirect } from "next/navigation";

const Page = async () => {
  const session = await auth();
  if (session) redirect("/dashboard");

  return (
    <div className="min-h-screen bg-gray-950 text-gray-100 flex flex-col">
      {/* Hero Section with Sophisticated Gradient Background */}
      <div className="flex-1 w-full flex flex-col md:flex-row items-center justify-between px-4 py-16 md:py-28 md:px-10 max-w-7xl mx-auto relative overflow-hidden">
        {/* Immersive Gradient Background */}
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top_right,_var(--tw-gradient-stops))] from-emerald-700/20 via-gray-950 to-teal-800/10 z-0"></div>

        {/* Animated Gradient Elements */}
        <div className="absolute top-20 right-20 w-96 h-96 rounded-full bg-gradient-to-br from-emerald-500/10 to-teal-400/5 blur-3xl animate-pulse"></div>
        <div
          className="absolute -bottom-20 -left-20 w-96 h-96 rounded-full bg-gradient-to-tr from-teal-500/10 to-emerald-400/5 blur-3xl animate-pulse"
          style={{ animationDelay: "1.5s" }}
        ></div>

        {/* Left content */}
        <div className="w-full md:w-1/2 space-y-10 text-center md:text-left z-10">
          <div className="space-y-2">
            <div className="inline-block px-4 py-1.5 rounded-full bg-gradient-to-r from-emerald-900/70 to-teal-900/70 text-emerald-300 text-sm font-medium mb-4 backdrop-blur-sm shadow-inner shadow-emerald-900/20">
              AI-Powered Receipt Scanning
            </div>
            <h1 className="text-4xl md:text-6xl font-bold">
              <span className="bg-gradient-to-r from-emerald-300 via-teal-200 to-emerald-300 bg-clip-text text-transparent">
                Transform Receipts
              </span>
              <br />
              <span className="bg-gradient-to-r from-teal-400 via-emerald-300 to-teal-300 bg-clip-text text-transparent">
                Into Insights
              </span>
            </h1>
          </div>
          <p className="text-xl text-gray-300 leading-relaxed">
            Our AI instantly scans and converts your receipts and bills into
            organized expenses. No more manual data entry — just snap, scan, and
            track.
          </p>
          <div className="flex flex-col sm:flex-row space-y-4 sm:space-y-0 sm:space-x-6 md:justify-start justify-center">
            <Button
              asChild
              className="bg-gradient-to-r from-emerald-600 via-teal-500 to-emerald-500 hover:from-emerald-500 hover:via-teal-400 hover:to-emerald-400 text-white rounded-full h-14 px-10 font-medium transition-all duration-300 shadow-lg shadow-emerald-900/30"
            >
              <Link href="/sign-in">Try For Free</Link>
            </Button>
            <Button
              variant="outline"
              className="border-2 border-gradient from-emerald-500/40 to-teal-500/40 bg-gray-950/50 backdrop-blur-sm text-emerald-300 hover:text-emerald-200 hover:bg-gray-900 rounded-full h-14 px-10 font-medium transition-all duration-300"
              asChild
            >
              <Link href="/sign-up">Watch Demo</Link>
            </Button>
          </div>
        </div>

        {/* Right content - Receipt scanning visualization */}
        <div className="hidden md:block w-1/2 z-10 pl-10">
          <div className="relative h-96 w-full max-w-md mx-auto">
            {/* Phone frame */}
            <div className="absolute inset-0 rounded-3xl border-8 border-gray-800 bg-gray-900 shadow-xl transform rotate-3 overflow-hidden">
              {/* Screen content */}
              <div className="absolute inset-0 bg-gradient-to-br from-gray-900 to-gray-800 p-4">
                {/* Receipt being scanned visualization */}
                <div className="h-full flex flex-col">
                  <div className="text-sm text-emerald-400 font-medium mb-2">
                    FinSync AI
                  </div>

                  {/* "Scanner" view with receipt */}
                  <div className="flex-1 relative rounded-lg bg-gray-950 flex items-center justify-center overflow-hidden border border-gray-800">
                    {/* Receipt */}
                    <div className="w-3/4 h-4/5 bg-white rounded-md shadow-lg transform rotate-2">
                      {/* Receipt contents */}
                      <div className="h-full w-full p-2 flex flex-col">
                        <div className="border-b border-gray-300 pb-1 text-center">
                          <div className="text-gray-900 text-xs font-medium">
                            COFFEE SHOP
                          </div>
                        </div>
                        <div className="flex-1 py-1">
                          <div className="flex justify-between">
                            <div className="bg-gray-200 h-1 w-20 rounded-full"></div>
                            <div className="bg-gray-200 h-1 w-8 rounded-full"></div>
                          </div>
                          <div className="mt-2 bg-gray-200 h-1 w-full rounded-full"></div>
                          <div className="mt-2 bg-gray-200 h-1 w-full rounded-full"></div>
                          <div className="mt-2 bg-gray-200 h-1 w-3/4 rounded-full"></div>
                        </div>
                        <div className="border-t border-gray-300 pt-1 flex justify-between">
                          <div className="bg-gray-300 h-2 w-12 rounded-full"></div>
                          <div className="bg-gray-800 h-2 w-10 rounded-full"></div>
                        </div>
                      </div>
                    </div>

                    {/* Scanning effect */}
                    <div className="absolute inset-x-0 h-8 bg-gradient-to-b from-emerald-400/30 to-transparent rounded-full blur-sm animate-scan"></div>
                  </div>

                  {/* Processing indicator */}
                  <div className="mt-3 bg-gray-800 rounded-lg p-3 border border-emerald-900/30">
                    <div className="flex items-center">
                      <div className="h-2 w-2 rounded-full bg-emerald-400 animate-pulse"></div>
                      <span className="ml-2 text-sm text-emerald-300">
                        Processing Receipt...
                      </span>
                    </div>
                    <div className="mt-2 h-1.5 w-full bg-gray-700 rounded-full overflow-hidden">
                      <div className="h-full bg-gradient-to-r from-emerald-500 to-teal-400 w-2/3 rounded-full"></div>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* Decorative elements */}
            <div className="absolute -bottom-6 -right-6 w-24 h-24 rounded-full bg-gradient-to-br from-emerald-500 to-teal-400 opacity-30 blur-2xl"></div>
          </div>
        </div>
      </div>

      {/* How It Works Section */}
      <div className="w-full py-24 px-4 relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-b from-gray-950 via-gray-900 to-gray-950"></div>
        <div className="absolute inset-0 opacity-5 bg-[url('/api/placeholder/800/800')] bg-center bg-repeat"></div>

        <div className="max-w-7xl mx-auto relative z-10">
          <div className="text-center mb-16">
            <h2 className="text-sm font-medium text-emerald-400 uppercase tracking-wide mb-3">
              Simplicity Meets Intelligence
            </h2>
            <h3 className="text-3xl md:text-4xl font-bold bg-gradient-to-r from-emerald-300 to-teal-200 bg-clip-text text-transparent inline-block">
              How Our AI Works
            </h3>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {[
              {
                title: "Snap a Photo",
                description:
                  "Take a quick photo of any receipt or bill with your smartphone camera.",
                icon: "📸",
                gradient: "from-emerald-600 to-teal-500",
              },
              {
                title: "AI Processing",
                description:
                  "Our advanced AI extracts all relevant information including date, vendor, items, and total amount.",
                icon: "🧠",
                gradient: "from-teal-600 to-emerald-500",
              },
              {
                title: "Auto Categorization",
                description:
                  "Expenses are automatically categorized and added to your financial dashboard.",
                icon: "📊",
                gradient: "from-emerald-500 to-teal-600",
              },
            ].map((step, index) => (
              <div key={index} className="flex flex-col items-center">
                <div
                  className={`w-16 h-16 rounded-2xl bg-gradient-to-br ${step.gradient} flex items-center justify-center text-3xl shadow-lg shadow-emerald-900/20 mb-6`}
                >
                  {step.icon}
                </div>
                <div className="text-center">
                  <h3 className="text-xl font-semibold mb-4 text-white">
                    {step.title}
                  </h3>
                  <p className="text-gray-400">{step.description}</p>
                </div>

                {/* Connecting line between steps */}
                {index < 2 && (
                  <div
                    className="hidden md:block absolute h-0.5 bg-gradient-to-r from-emerald-500/30 to-teal-500/30 w-24"
                    style={{
                      left: `calc(16.7% + ${index * 33.3}%)`,
                      top: "calc(50% + 24px)",
                      transform: "translateX(24px)",
                    }}
                  ></div>
                )}
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Features Section with Glass Cards */}
      <div className="bg-gradient-to-br from-gray-950 via-gray-900/95 to-gray-950 w-full py-24 px-4 relative">
        <div className="absolute inset-0 overflow-hidden">
          <div className="absolute -top-24 -right-24 w-96 h-96 rounded-full bg-emerald-900/20 blur-3xl"></div>
          <div className="absolute -bottom-24 -left-24 w-96 h-96 rounded-full bg-teal-900/20 blur-3xl"></div>
        </div>

        <div className="max-w-7xl mx-auto relative z-10">
          <div className="text-center mb-16 space-y-4">
            <h2 className="text-sm font-medium text-emerald-400 uppercase tracking-wide">
              Powerful Features
            </h2>
            <h3 className="text-3xl md:text-4xl font-bold bg-gradient-to-r from-emerald-300 to-teal-200 bg-clip-text text-transparent inline-block">
              Everything You Need
            </h3>
            <p className="text-gray-400 max-w-2xl mx-auto">
              Our AI-powered platform handles the tedious work so you can focus
              on financial insights and growth.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {[
              {
                title: "Receipt Recognition",
                description:
                  "Our AI recognizes and extracts data from any receipt format, including handwritten ones.",
                gradient: "from-emerald-900/40 to-gray-900/90",
              },
              {
                title: "Auto-Categorization",
                description:
                  "Expenses are intelligently sorted into categories based on vendor and purchase patterns.",
                gradient: "from-teal-900/40 to-gray-900/90",
              },
              {
                title: "Real-time Sync",
                description:
                  "All scanned receipts immediately sync across all your devices and team members.",
                gradient: "from-emerald-900/40 to-gray-900/90",
              },
              {
                title: "Fraud Detection",
                description:
                  "AI algorithms flag unusual spending patterns and potential duplicate expenses.",
                gradient: "from-teal-900/40 to-gray-900/90",
              },
              {
                title: "Tax Preparation",
                description:
                  "Automatically tag business expenses and generate tax-ready reports in seconds.",
                gradient: "from-emerald-900/40 to-gray-900/90",
              },
              {
                title: "Budget Forecasting",
                description:
                  "AI-powered predictions help you anticipate future expenses based on historical data.",
                gradient: "from-teal-900/40 to-gray-900/90",
              },
            ].map((feature, index) => (
              <div
                key={index}
                className="backdrop-blur-md bg-gradient-to-br from-white/5 to-white/10 p-8 rounded-2xl border border-white/10 hover:border-emerald-500/30 transition-all duration-300 group shadow-xl"
              >
                <div
                  className={`mb-6 w-12 h-12 rounded-2xl bg-gradient-to-br ${feature.gradient} text-emerald-300 flex items-center justify-center text-xl group-hover:text-emerald-200 transition-colors`}
                >
                  {index + 1}
                </div>
                <h3 className="text-xl font-semibold mb-4 text-white group-hover:text-emerald-200 transition-colors">
                  {feature.title}
                </h3>
                <p className="text-gray-400 group-hover:text-gray-300 transition-colors">
                  {feature.description}
                </p>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* AI Technology Showcase */}
      <div className="w-full py-24 px-4 bg-gray-950 relative overflow-hidden">
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,_var(--tw-gradient-stops))] from-emerald-900/10 via-gray-950 to-gray-950"></div>

        <div className="max-w-7xl mx-auto relative z-10">
          <div className="flex flex-col md:flex-row items-center gap-12">
            <div className="w-full md:w-1/2 space-y-8">
              <div className="space-y-2">
                <h2 className="text-sm font-medium text-emerald-400 uppercase tracking-wide">
                  Advanced AI Technology
                </h2>
                <h3 className="text-3xl md:text-4xl font-bold bg-gradient-to-r from-emerald-300 to-teal-200 bg-clip-text text-transparent">
                  Built for Accuracy & Speed
                </h3>
              </div>

              <p className="text-gray-300 text-lg">
                Our proprietary AI engine uses computer vision and machine
                learning to process receipts with 99.8% accuracy, faster than
                any human could.
              </p>

              <div className="space-y-4">
                {[
                  "Multi-language receipt recognition",
                  "Automatic currency conversion",
                  "Learns from your corrections",
                  "Works offline when needed",
                ].map((item, index) => (
                  <div key={index} className="flex items-center">
                    <div className="h-6 w-6 rounded-full bg-gradient-to-r from-emerald-500 to-teal-400 flex items-center justify-center mr-3">
                      <svg
                        width="12"
                        height="12"
                        viewBox="0 0 12 12"
                        fill="none"
                        xmlns="http://www.w3.org/2000/svg"
                      >
                        <path
                          d="M10 3L4.5 8.5L2 6"
                          stroke="white"
                          strokeWidth="2"
                          strokeLinecap="round"
                          strokeLinejoin="round"
                        />
                      </svg>
                    </div>
                    <span className="text-gray-300">{item}</span>
                  </div>
                ))}
              </div>

              <Button
                asChild
                className="bg-gradient-to-r from-emerald-600 to-teal-500 hover:from-emerald-500 hover:to-teal-400 text-white rounded-full h-12 px-8 font-medium transition-all duration-300 shadow-lg shadow-emerald-900/30 w-fit"
              >
                <Link href="/technology">Learn More About Our AI</Link>
              </Button>
            </div>

            {/* AI Visualization */}
            <div className="w-full md:w-1/2 p-4">
              <div className="relative aspect-square max-w-md mx-auto">
                {/* Neural network visualization */}
                <div className="absolute inset-0 rounded-2xl overflow-hidden bg-gray-900 border border-emerald-900/30">
                  <div className="absolute inset-0 grid grid-cols-8 grid-rows-8 gap-1 p-4">
                    {Array.from({ length: 64 }).map((_, i) => (
                      <div
                        key={i}
                        className="bg-gray-800 rounded-md flex items-center justify-center"
                      >
                        <div
                          className={`w-1.5 h-1.5 rounded-full ${
                            i % 5 === 0
                              ? "bg-emerald-400"
                              : i % 3 === 0
                              ? "bg-teal-400"
                              : "bg-gray-700"
                          } ${i % 7 === 0 ? "animate-ping" : ""}`}
                          style={{ animationDuration: `${(i % 4) + 2}s` }}
                        ></div>
                      </div>
                    ))}
                  </div>

                  {/* Connections */}
                  <svg
                    className="absolute inset-0 w-full h-full"
                    viewBox="0 0 400 400"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <g opacity="0.4">
                      {Array.from({ length: 20 }).map((_, i) => (
                        <path
                          key={i}
                          d={`M${100 + Math.random() * 200},${
                            100 + Math.random() * 200
                          } Q${200 + Math.random() * 100},${
                            Math.random() * 200
                          } ${100 + Math.random() * 200},${
                            100 + Math.random() * 200
                          }`}
                          stroke={`hsl(${160 + Math.random() * 20}, 80%, 50%)`}
                          strokeWidth="0.5"
                          fill="none"
                        />
                      ))}
                    </g>
                  </svg>

                  {/* Floating receipt */}
                  <div className="absolute top-1/4 right-1/4 w-32 h-40 bg-white rounded-md shadow-xl transform rotate-6 animate-float">
                    <div className="h-full w-full p-2 flex flex-col">
                      <div className="border-b border-gray-300 pb-1 text-center">
                        <div className="text-gray-900 text-xs">RECEIPT</div>
                      </div>
                      <div className="flex-1 py-1">
                        {Array.from({ length: 5 }).map((_, i) => (
                          <div
                            key={i}
                            className="mt-1 bg-gray-200 h-1 w-full rounded-full"
                          ></div>
                        ))}
                      </div>
                    </div>
                  </div>

                  {/* Data extraction animation */}
                  <div className="absolute bottom-1/4 left-1/4 h-36 w-28 bg-gray-800 rounded-lg p-2 animate-pulse">
                    <div className="bg-emerald-900/40 p-1 rounded mb-2">
                      <div className="h-1 w-12 bg-emerald-400/60 rounded-full"></div>
                    </div>
                    {Array.from({ length: 4 }).map((_, i) => (
                      <div
                        key={i}
                        className="flex justify-between items-center mt-2"
                      >
                        <div className="h-1 w-12 bg-gray-700 rounded-full"></div>
                        <div className="h-1 w-8 bg-teal-500/60 rounded-full"></div>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Call To Action */}
      <div className="w-full py-20 px-4 bg-gradient-to-br from-emerald-800 to-teal-900 relative overflow-hidden">
        <div className="absolute inset-0">
          <div className="absolute inset-0 opacity-20 bg-[url('/api/placeholder/800/800')] bg-center"></div>
          <div className="absolute inset-0 bg-gradient-to-br from-emerald-800 to-teal-900 opacity-90"></div>
        </div>

        <div className="max-w-5xl mx-auto text-center relative z-10 space-y-8">
          <h2 className="text-3xl md:text-5xl font-bold text-white">
            Never Enter Receipt Data{" "}
            <span className="text-emerald-300">Again</span>
          </h2>
          <p className="text-emerald-100 text-xl max-w-2xl mx-auto">
            Join thousands of businesses who've already saved countless hours
            with our AI-powered expense management.
          </p>
          <div className="flex flex-col sm:flex-row space-y-4 sm:space-y-0 sm:space-x-6 justify-center">
            <Button
              asChild
              className="bg-white text-emerald-900 hover:bg-emerald-50 rounded-full h-14 px-10 font-medium transition-all duration-300 shadow-lg text-lg"
            >
              <Link href="/sign-up">Start Free Trial</Link>
            </Button>
            <Button
              variant="outline"
              className="border-2 border-white/70 text-white hover:bg-white/10 rounded-full h-14 px-10 font-medium transition-all duration-300 text-lg"
              asChild
            >
              <Link href="#">Schedule Demo</Link>
            </Button>
          </div>
          <p className="text-emerald-200/80 pt-2">
            No credit card required • 14-day free trial
          </p>
        </div>
      </div>

      {/* Footer */}
      <footer className="w-full py-12 px-4 bg-gray-950 border-t border-emerald-900/30">
        <div className="max-w-7xl mx-auto">
          <div className="flex flex-col md:flex-row justify-between items-center mb-12">
            <div className="flex items-center space-x-3 mb-8 md:mb-0">
              <div className="h-10 w-10 rounded-full bg-gradient-to-br from-emerald-500 to-teal-400 flex items-center justify-center shadow-lg shadow-emerald-900/30">
                <span className="text-gray-900 font-bold text-lg">F</span>
              </div>
              <span className="font-semibold text-xl text-white">FinSync</span>
            </div>

            <div className="grid grid-cols-2 md:grid-cols-4 gap-8 mb-8 md:mb-0">
              <div>
                <h4 className="text-white font-medium mb-3">Product</h4>
                <ul className="space-y-2">
                  <li>
                    <Link
                      href="#"
                      className="text-gray-400 hover:text-emerald-300 transition-colors"
                    >
                      Features
                    </Link>
                  </li>
                  <li>
                    <Link
                      href="#"
                      className="text-gray-400 hover:text-emerald-300 transition-colors"
                    >
                      Pricing
                    </Link>
                  </li>
                  <li>
                    <Link
                      href="#"
                      className="text-gray-400 hover:text-emerald-300 transition-colors"
                    >
                      Security
                    </Link>
                  </li>
                </ul>
              </div>

              <div>
                <h4 className="text-white font-medium mb-3">Company</h4>
                <ul className="space-y-2">
                  <li>
                    <Link
                      href="#"
                      className="text-gray-400 hover:text-emerald-300 transition-colors"
                    >
                      About
                    </Link>
                  </li>
                  <li>
                    <Link
                      href="#"
                      className="text-gray-400 hover:text-emerald-300 transition-colors"
                    >
                      Blog
                    </Link>
                  </li>
                  <li>
                    <Link
                      href="#"
                      className="text-gray-400 hover:text-emerald-300 transition-colors"
                    >
                      Careers
                    </Link>
                  </li>
                </ul>
              </div>

              <div>
                <h4 className="text-white font-medium mb-3">Resources</h4>
                <ul className="space-y-2">
                  <li>
                    <Link
                      href="#"
                      className="text-gray-400 hover:text-emerald-300 transition-colors"
                    >
                      Help Center
                    </Link>
                  </li>
                  <li>
                    <Link
                      href="#"
                      className="text-gray-400 hover:text-emerald-300 transition-colors"
                    >
                      API Docs
                    </Link>
                  </li>
                  <li>
                    <Link
                      href="#"
                      className="text-gray-400 hover:text-emerald-300 transition-colors"
                    >
                      Community
                    </Link>
                  </li>
                </ul>
              </div>

              <div>
                <h4 className="text-white font-medium mb-3">Legal</h4>
                <ul className="space-y-2">
                  <li>
                    <Link
                      href="#"
                      className="text-gray-400 hover:text-emerald-300 transition-colors"
                    >
                      Privacy
                    </Link>
                  </li>
                  <li>
                    <Link
                      href="#"
                      className="text-gray-400 hover:text-emerald-300 transition-colors"
                    >
                      Terms
                    </Link>
                  </li>
                  <li>
                    <Link
                      href="#"
                      className="text-gray-400 hover:text-emerald-300 transition-colors"
                    >
                      Security
                    </Link>
                  </li>
                </ul>
              </div>
            </div>
          </div>

          <div className="pt-8 border-t border-gray-800 flex flex-col md:flex-row justify-between items-center">
            <p className="text-gray-500 text-sm order-2 md:order-1">
              © 2025 FinSync. All rights reserved.
            </p>

            <div className="flex space-x-6 mb-4 md:mb-0 order-1 md:order-2">
              <Link
                href="#"
                className="text-gray-400 hover:text-emerald-300 transition-colors"
              >
                <span className="sr-only">Twitter</span>
                <svg
                  className="h-6 w-6"
                  fill="currentColor"
                  viewBox="0 0 24 24"
                  aria-hidden="true"
                >
                  <path d="M8.29 20.251c7.547 0 11.675-6.253 11.675-11.675 0-.178 0-.355-.012-.53A8.348 8.348 0 0022 5.92a8.19 8.19 0 01-2.357.646 4.118 4.118 0 001.804-2.27 8.224 8.224 0 01-2.605.996 4.107 4.107 0 00-6.993 3.743 11.65 11.65 0 01-8.457-4.287 4.106 4.106 0 001.27 5.477A4.072 4.072 0 012.8 9.713v.052a4.105 4.105 0 003.292 4.022 4.095 4.095 0 01-1.853.07 4.108 4.108 0 003.834 2.85A8.233 8.233 0 012 18.407a11.616 11.616 0 006.29 1.84" />
                </svg>
              </Link>
              <Link
                href="#"
                className="text-gray-400 hover:text-emerald-300 transition-colors"
              >
                <span className="sr-only">LinkedIn</span>
                <svg
                  className="h-6 w-6"
                  fill="currentColor"
                  viewBox="0 0 24 24"
                  aria-hidden="true"
                >
                  <path
                    fillRule="evenodd"
                    d="M19 0h-14c-2.761 0-5 2.239-5 5v14c0 2.761 2.239 5 5 5h14c2.762 0 5-2.239 5-5v-14c0-2.761-2.238-5-5-5zm-11 19h-3v-11h3v11zm-1.5-12.268c-.966 0-1.75-.79-1.75-1.764s.784-1.764 1.75-1.764 1.75.79 1.75 1.764-.783 1.764-1.75 1.764zm13.5 12.268h-3v-5.604c0-3.368-4-3.113-4 0v5.604h-3v-11h3v1.765c1.396-2.586 7-2.777 7 2.476v6.759z"
                    clipRule="evenodd"
                  />
                </svg>
              </Link>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default Page;
