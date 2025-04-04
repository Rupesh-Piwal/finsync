import Link from "next/link";
import { Button } from "@/components/ui/button";

export const HeroSection = () => {
  return (
    <div className="flex-1 w-full flex flex-col md:flex-row items-center justify-between px-4 py-16 md:py-28 md:px-10 max-w-7xl mx-auto relative overflow-hidden">
      {/* Background elements */}
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top_right,_var(--tw-gradient-stops))] from-emerald-700/20 via-gray-950 to-teal-800/10 z-0"></div>
      <div className="absolute top-20 right-20 w-96 h-96 rounded-full bg-gradient-to-br from-emerald-500/10 to-teal-400/5 blur-3xl animate-pulse"></div>
      <div
        className="absolute -bottom-20 -left-20 w-96 h-96 rounded-full bg-gradient-to-tr from-teal-500/10 to-emerald-400/5 blur-3xl animate-pulse"
        style={{ animationDelay: "1.5s" }}
      ></div>

      {/* Left content */}
      <HeroContent />

      {/* Right content */}
      <ReceiptVisualization />
    </div>
  );
};

const HeroContent = () => {
  return (
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
  );
};

const ReceiptVisualization = () => {
  return (
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
  );
};
