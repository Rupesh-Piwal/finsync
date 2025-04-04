import Link from "next/link";
import { Button } from "@/components/ui/button";

export const AITechnology = () => {
  return (
    <div className="w-full py-24 px-4 relative overflow-hidden">
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
              learning to process receipts with 99.8% accuracy, faster than any
              human could.
            </p>

            <Button
              asChild
              className="bg-gradient-to-r from-emerald-600 to-teal-500 hover:from-emerald-500 hover:to-teal-400 text-white rounded-full h-12 px-8 font-medium transition-all duration-300 shadow-lg shadow-emerald-900/30 w-fit"
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
                  } Q${200 + Math.random() * 100},${Math.random() * 200} ${
                    100 + Math.random() * 200
                  },${100 + Math.random() * 200}`}
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
              <div key={i} className="flex justify-between items-center mt-2">
                <div className="h-1 w-12 bg-gray-700 rounded-full"></div>
                <div className="h-1 w-8 bg-teal-500/60 rounded-full"></div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};
