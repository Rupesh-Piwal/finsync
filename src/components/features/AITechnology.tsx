import Link from "next/link";
import { Button } from "@/components/ui/button";
import { ArrowRight, CheckCircle, FileText, Zap } from "lucide-react";

export const AITechnology = () => {
  return (
    <div className="w-full py-12 sm:py-16 md:py-24 px-4 relative overflow-hidden bg-black">
      {/* Background gradients - adjusted for better mobile positioning */}
      <div className="absolute top-10  left-5  w-40  h-30  md:w-120 md:h-80 rounded-full bg-[#134E4A]/40 blur-3xl"></div>
      <div className="absolute bottom-20 sm:bottom-40 right-0 sm:right-[30%] w-60 sm:w-110 h-40 sm:h-80 rounded-full bg-[#047857]/30 blur-3xl"></div>

      <div className="max-w-7xl mx-auto relative z-10">
        <div className="flex flex-col md:flex-row items-center gap-8 md:gap-12">
          {/* Text content - improved spacing for mobile */}
          <div className="w-full md:w-1/2 space-y-6 md:space-y-8">
            <div className="space-y-2">
              <h2 className="text-sm font-medium text-emerald-400 uppercase tracking-wide">
                Advanced AI Technology
              </h2>
              <h3 className="text-2xl sm:text-3xl md:text-4xl font-bold bg-gradient-to-r from-emerald-300 to-teal-200 bg-clip-text text-transparent">
                Built for Accuracy & Speed
              </h3>
            </div>

            <p className="text-gray-300 text-base sm:text-lg">
              Our proprietary AI engine uses computer vision and machine
              learning to process receipts with 99.8% accuracy, faster than any
              human could.
            </p>

            <Button
              asChild
              className="bg-gradient-to-r from-emerald-600 to-teal-500 hover:from-emerald-500 hover:to-teal-400 text-white rounded-full h-10 sm:h-12 px-6 sm:px-8 font-medium transition-all duration-300 shadow-lg shadow-emerald-900/30 w-fit"
            >
              <Link href="/technology">Learn More About Our AI</Link>
            </Button>
          </div>

          {/* AI Visualization */}
          <AIVisualization />
        </div>
      </div>
    </div>
  );
};

const AIVisualization = () => {
  return (
    <div className="w-full h-full md:w-1/2 p-2 sm:p-4">
      <div className="relative aspect-square max-w-[280px] xs:max-w-[320px] sm:max-w-md mx-auto">
        {/* Main visualization container - adjusted padding for mobile */}
        <div className="absolute inset-0 rounded-xl sm:rounded-2xl overflow-hidden border border-emerald-900/30 p-3 xs:p-4 sm:p-6">
          {/* Processing stages infographic */}
          <div className="relative h-full flex flex-col justify-between z-10">
            {/* Stage 1: Receipt Capture - adjusted for mobile */}
            <div className="flex items-center gap-2 sm:gap-4 bg-gray-800/60 p-2 sm:p-3 rounded-lg border border-emerald-900/30 transform transition-all hover:scale-105 duration-300">
              <div className="bg-emerald-500/20 p-1.5 sm:p-2 rounded-full">
                <FileText className="h-4 w-4 sm:h-6 sm:w-6 text-emerald-400" />
              </div>
              <div className="flex-1">
                <h4 className="text-emerald-300 text-sm sm:text-base font-medium">
                  Receipt Capture
                </h4>
                <p className="text-gray-400 text-xs sm:text-sm">
                  Scan any receipt format
                </p>
              </div>
              <div className="h-6 w-6 sm:h-8 sm:w-8 rounded-full bg-emerald-500/20 flex items-center justify-center">
                <span className="text-emerald-400 text-xs sm:text-base font-medium">
                  1
                </span>
              </div>
            </div>

            {/* Animated connection line */}
            <div className="h-8 sm:h-12 w-1 bg-gradient-to-b from-emerald-500 to-emerald-400/30 mx-auto my-1 relative overflow-hidden">
              <div className="absolute top-0 left-0 right-0 h-4 sm:h-6 bg-emerald-400 animate-pulse"></div>
            </div>

            {/* Stage 2: AI Processing */}
            <div className="flex items-center gap-2 sm:gap-4 bg-gray-800/60 p-2 sm:p-3 rounded-lg border border-emerald-900/30 transform transition-all hover:scale-105 duration-300">
              <div className="bg-emerald-500/20 p-1.5 sm:p-2 rounded-full">
                <Zap className="h-4 w-4 sm:h-6 sm:w-6 text-emerald-400" />
              </div>
              <div className="flex-1">
                <h4 className="text-emerald-300 text-sm sm:text-base font-medium">
                  AI Processing
                </h4>
                <p className="text-gray-400 text-xs sm:text-sm">
                  Computer vision analysis
                </p>
              </div>
              <div className="h-6 w-6 sm:h-8 sm:w-8 rounded-full bg-emerald-500/20 flex items-center justify-center">
                <span className="text-emerald-400 text-xs sm:text-base font-medium">
                  2
                </span>
              </div>
            </div>

            {/* Animated connection line */}
            <div className="h-8 sm:h-12 w-1 bg-gradient-to-b from-emerald-500 to-emerald-400/30 mx-auto my-1 relative overflow-hidden">
              <div
                className="absolute top-0 left-0 right-0 h-4 sm:h-6 bg-emerald-400 animate-pulse"
                style={{ animationDelay: "0.5s" }}
              ></div>
            </div>

            {/* Stage 3: Data Extraction */}
            <div className="flex items-center gap-2 sm:gap-4 bg-gray-800/60 p-2 sm:p-3 rounded-lg border border-emerald-900/30 transform transition-all hover:scale-105 duration-300">
              <div className="bg-emerald-500/20 p-1.5 sm:p-2 rounded-full">
                <CheckCircle className="h-4 w-4 sm:h-6 sm:w-6 text-emerald-400" />
              </div>
              <div className="flex-1">
                <h4 className="text-emerald-300 text-sm sm:text-base font-medium">
                  Data Extraction
                </h4>
                <p className="text-gray-400 text-xs sm:text-sm">
                  99.8% accuracy guaranteed
                </p>
              </div>
              <div className="h-6 w-6 sm:h-8 sm:w-8 rounded-full bg-emerald-500/20 flex items-center justify-center">
                <span className="text-emerald-400 text-xs sm:text-base font-medium">
                  3
                </span>
              </div>
            </div>
          </div>

          {/* Animated receipt - adjusted size and positioning for mobile */}
          <div className="absolute top-1/2 right-2 sm:right-6 transform -translate-y-1/2 scale-75 sm:scale-100 origin-right">
            <div className="relative w-32 h-48 bg-white opacity-20 rounded-md shadow-xl rotate-6 animate-float">
              {/* Receipt header */}
              <div className="absolute top-0 left-0 right-0 p-2 border-b border-gray-200">
                <div className="w-full flex justify-center">
                  <div className="h-2 w-16 bg-gray-400 rounded-full"></div>
                </div>
                <div className="mt-1 w-full flex justify-center">
                  <div className="h-2 w-12 bg-gray-300 rounded-full"></div>
                </div>
              </div>

              {/* Receipt items with scanning effect */}
              <div className="absolute top-12 left-0 right-0 p-2">
                {Array.from({ length: 6 }).map((_, i) => (
                  <div
                    key={i}
                    className="flex justify-between items-center mt-2"
                  >
                    <div className="h-1.5 w-10 bg-gray-400 rounded-full"></div>
                    <div className="h-1.5 w-6 bg-gray-400 rounded-full"></div>
                  </div>
                ))}

                {/* Scanning line animation */}
                <div className="absolute top-0 left-0 right-0 h-1 bg-emerald-400 opacity-70 animate-scan"></div>
              </div>

              {/* Receipt total */}
              <div className="absolute bottom-4 left-0 right-0 p-2 border-t border-gray-200">
                <div className="flex justify-between items-center mt-1">
                  <div className="h-2 w-8 bg-gray-500 rounded-full"></div>
                  <div className="h-2 w-10 bg-gray-600 rounded-full"></div>
                </div>
              </div>

              {/* Highlighted data points */}
              <div className="absolute top-16 left-3 h-1.5 w-10 bg-emerald-400 rounded-full animate-pulse"></div>
              <div
                className="absolute top-24 right-3 h-1.5 w-6 bg-emerald-400 rounded-full animate-pulse"
                style={{ animationDelay: "1s" }}
              ></div>
              <div
                className="absolute bottom-8 right-3 h-2 w-10 bg-emerald-400 rounded-full animate-pulse"
                style={{ animationDelay: "2s" }}
              ></div>
            </div>

            {/* Data extraction lines - adjusted for mobile */}
            <div className="absolute top-1/4 right-full w-10 sm:w-16 h-0.5 bg-gradient-to-r from-transparent to-emerald-400 animate-grow"></div>
            <div
              className="absolute top-1/2 right-full w-10 sm:w-16 h-0.5 bg-gradient-to-r from-transparent to-emerald-400 animate-grow"
              style={{ animationDelay: "1s" }}
            ></div>
            <div
              className="absolute bottom-1/4 right-full w-10 sm:w-16 h-0.5 bg-gradient-to-r from-transparent to-emerald-400 animate-grow"
              style={{ animationDelay: "2s" }}
            ></div>
          </div>

          {/* Accuracy indicator - adjusted for mobile */}
          <div className="absolute bottom-1 sm:bottom-4 right-2 sm:right-4 bg-gray-800/80 rounded-full px-2 sm:px-3 py-0.5 sm:py-1 border border-emerald-500/30">
            <div className="flex items-center gap-1 sm:gap-1.5">
              <div className="h-1.5 w-1.5 sm:h-2 sm:w-2 rounded-full bg-emerald-400 animate-ping opacity-75"></div>
              <span className="text-emerald-300 text-[10px] xs:text-xs font-medium">
                99.8% Accuracy
              </span>
            </div>
          </div>

          {/* Processing speed indicator - adjusted for mobile */}
          <div className="absolute top-2 sm:top-4 right-2 sm:right-4 bg-gray-800/80 rounded-full px-2 sm:px-3 py-0.5 sm:py-1 border border-emerald-500/30">
            <div className="flex items-center gap-1 sm:gap-1.5">
              <ArrowRight className="h-2.5 w-2.5 sm:h-3 sm:w-3 text-emerald-400" />
              <span className="text-emerald-300 text-[10px] xs:text-xs font-medium">
                0.5s Processing
              </span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
