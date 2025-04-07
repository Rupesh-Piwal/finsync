import Link from "next/link";
import { Button } from "@/components/ui/button";

export const CallToAction = () => {
  return (
    <div className="w-full py-28 px-4 relative overflow-hidden ">
      <div className="max-w-6xl mx-auto text-center relative z-10 space-y-10">
        <div className="space-y-6">
          <h2 className="text-4xl md:text-6xl font-bold text-white leading-tight">
            Never Manually Enter Receipts{" "}
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-emerald-300 to-teal-300">
              Again
            </span>
          </h2>
          <p className="text-emerald-100/80 text-xl md:text-2xl max-w-3xl mx-auto leading-relaxed">
            Join thousands of businesses saving hundreds of hours with our
            AI-powered expense tracking and management solution.
          </p>
        </div>

        <div className="flex flex-col sm:flex-row gap-4 justify-center">
          <Button
            asChild
            className="group relative overflow-hidden bg-gradient-to-r from-emerald-500 to-teal-500 hover:from-emerald-400 hover:to-teal-400 text-white rounded-full h-16 px-12 font-semibold transition-all duration-300 shadow-lg shadow-emerald-500/20 hover:shadow-emerald-500/30 text-lg"
          >
            <Link href="/sign-up">
              <span className="relative z-10">Start Free Trial</span>
              <span className="absolute inset-0 bg-gradient-to-r from-white/10 to-white/5 opacity-0 group-hover:opacity-100 transition-opacity duration-300"></span>
            </Link>
          </Button>

          <Button
            variant="outline"
            className="group relative overflow-hidden border-2 border-emerald-400/30 hover:border-emerald-400/50 text-white hover:text-white bg-white/5 hover:bg-white/10 backdrop-blur-sm rounded-full h-16 px-12 font-semibold transition-all duration-300 text-lg"
            asChild
          >
            <Link href="#">
              <span className="relative z-10">See How It Works</span>
              <span className="absolute inset-0 bg-gradient-to-r from-emerald-400/10 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500"></span>
            </Link>
          </Button>
        </div>
      </div>
    </div>
  );
};
