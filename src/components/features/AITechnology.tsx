import { Button } from "@/components/ui/button";
import { ArrowRight, CheckCircle, FileText, Zap } from "lucide-react";
import Link from "next/link";

export const AITechnology = () => {
  return (
    <section className="relative w-full min-h-screen bg-black overflow-hidden">
      <div className="absolute inset-0">
        <div className="absolute top-1/4 left-1/4 w-96 h-96 rounded-full bg-emerald-500/5 blur-3xl" />
        <div className="absolute bottom-1/3 right-1/4 w-80 h-80 rounded-full bg-teal-500/5 blur-3xl" />
      </div>

      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-2 lg:py-32">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
          <div className="space-y-8">
            <div className="space-y-4">
              <h2 className="text-4xl sm:text-5xl lg:text-6xl font-bold leading-tight">
                <span className="block text-white">Built for</span>
                <span className="block bg-gradient-to-r from-emerald-400 to-teal-400 bg-clip-text text-transparent">
                  Precision
                </span>
              </h2>

              <p className="text-lg text-gray-400 leading-relaxed max-w-lg">
                Our AI engine delivers{" "}
                <span className="text-emerald-300 font-medium">
                  99.8% accuracy
                </span>{" "}
                in milliseconds, powered by Gemini Flash 1.5.
              </p>
            </div>

            {/* CTA */}
            <div className="flex flex-col sm:flex-row gap-4">
              <Link
                href="/sign-in"
                className="h-12 px-8 bg-gradient-to-r from-emerald-600 to-teal-600 hover:from-emerald-500 hover:to-teal-500 text-white rounded-xl font-medium transition-all duration-300 flex items-center gap-3 justify-center"
              >
                <span>Explore Technology</span>
                <ArrowRight className="ml-2 h-4 w-4" />
              </Link>
            </div>
          </div>

          {/* Right side - Simple visualization */}
          <div className="relative">
            <SimpleAIVisualization />
          </div>
        </div>
      </div>
    </section>
  );
};

const SimpleAIVisualization = () => {
  return (
    <div className="relative w-full max-w-lg mx-auto h-96">
      {/* Main container */}
      <div className="absolute inset-0 bg-gradient-to-br from-gray-900/50 to-gray-800/50 backdrop-blur-sm border border-emerald-500/20 rounded-2xl p-8">
        {/* Central AI symbol */}
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-20 h-20 bg-gradient-to-br from-emerald-500/20 to-teal-500/20 rounded-2xl flex items-center justify-center border border-emerald-400/30">
          <Zap className="w-10 h-10 text-emerald-300" />
        </div>

        {/* Feature cards around center */}
        <div className="absolute top-8 left-8 w-32 h-16 bg-gray-900/80 border border-emerald-500/20 rounded-xl p-3">
          <div className="flex items-center gap-2">
            <FileText className="w-4 h-4 text-emerald-400" />
            <div>
              <div className="text-white text-xs font-medium">Smart Scan</div>
              <div className="text-gray-400 text-xs">OCR Tech</div>
            </div>
          </div>
        </div>

        <div className="absolute top-8 right-8 w-32 h-16 bg-gray-900/80 border border-emerald-500/20 rounded-xl p-3">
          <div className="flex items-center gap-2">
            <Zap className="w-4 h-4 text-teal-400" />
            <div>
              <div className="text-white text-xs font-medium">Fast Process</div>
              <div className="text-gray-400 text-xs">0.3 Seconds</div>
            </div>
          </div>
        </div>

        <div className="absolute bottom-8 left-1/2 -translate-x-1/2 w-36 h-16 bg-gray-900/80 border border-emerald-500/20 rounded-xl p-3">
          <div className="flex items-center gap-2">
            <CheckCircle className="w-4 h-4 text-emerald-400" />
            <div>
              <div className="text-white text-xs font-medium">
                Perfect Results
              </div>
              <div className="text-gray-400 text-xs">99.8% Accuracy</div>
            </div>
          </div>
        </div>

        {/* Simple connection lines */}
        <svg className="absolute inset-0 w-full h-full pointer-events-none">
          <line
            x1="50%"
            y1="50%"
            x2="25%"
            y2="25%"
            stroke="rgb(16, 185, 129)"
            strokeWidth="1"
            opacity="0.3"
            strokeDasharray="4,4"
          />
          <line
            x1="50%"
            y1="50%"
            x2="75%"
            y2="25%"
            stroke="rgb(16, 185, 129)"
            strokeWidth="1"
            opacity="0.3"
            strokeDasharray="4,4"
          />
          <line
            x1="50%"
            y1="50%"
            x2="50%"
            y2="85%"
            stroke="rgb(16, 185, 129)"
            strokeWidth="1"
            opacity="0.3"
            strokeDasharray="4,4"
          />
        </svg>

        {/* Status indicator */}
        <div className="absolute bottom-4 right-4 flex items-center gap-2 bg-gray-900/90 rounded-lg px-3 py-1 border border-emerald-500/30">
          <div className="w-2 h-2 bg-emerald-400 rounded-full" />
          <span className="text-emerald-300 font-medium text-sm">
            AI Active
          </span>
        </div>
      </div>
    </div>
  );
};
