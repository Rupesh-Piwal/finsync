import Link from "next/link";
import { Button } from "@/components/ui/button";

export const CallToAction = () => {
  return (
    <div className="w-full py-28 px-4 relative overflow-hidden bg-black">
      <div className="max-w-6xl mx-auto text-center relative z-10 space-y-10">
        <div className="space-y-6">
          <h2 className="text-4xl md:text-6xl font-bold bg-gradient-to-r from-[#FDFDFD] to-[#B7B9BE]/80 bg-clip-text text-transparent leading-tight">
            Never Manually Enter Receipts{" "}
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-emerald-300 to-teal-300">
              Again
            </span>
          </h2>
          <p className="bg-gradient-to-r from-[#FDFDFD] to-[#B7B9BE]/80 bg-clip-text text-transparent text-xl md:text-2xl max-w-3xl mx-auto leading-relaxed">
            Join thousands of businesses saving hundreds of hours with our
            AI-powered expense tracking and management solution.
          </p>
        </div>

        <div className="flex flex-col sm:flex-row gap-4 justify-center">
          <Button
            asChild
            className="group relative overflow-hidden bg-gradient-to-r from-emerald-500 to-teal-500 hover:from-emerald-400 hover:to-teal-400 text-white rounded-full h-10 px-4 w-[70%] md:w-[300px] mx-auto font-medium transition-all duration-300 shadow-lg shadow-emerald-500/20 hover:shadow-emerald-500/30 text-lg"
          >
            <Link href="/sign-in">
              <span className="relative z-10">Start Free Trial</span>
            </Link>
          </Button>
        </div>
      </div>
    </div>
  );
};
