import Link from "next/link";
import { Button } from "@/components/ui/button";

export const CallToAction = () => {
  return (
    <div className="w-full py-20 px-4 relative overflow-hidden">
      <div className="absolute inset-0">
        <div className="absolute inset-0 opacity-20 bg-[url('/api/placeholder/800/800')] bg-center"></div>
        <div className="absolute inset-0  opacity-90"></div>
      </div>

      <div className="max-w-5xl mx-auto text-center relative z-10 space-y-8">
        <h2 className="text-3xl md:text-5xl font-bold text-white">
          Never Enter Receipt Data{" "}
          <span className="text-emerald-300">Again</span>
        </h2>
        <p className="text-emerald-100 text-xl max-w-2xl mx-auto">
          Join thousands of businesses who've already saved countless hours with
          our AI-powered expense management.
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
  );
};
