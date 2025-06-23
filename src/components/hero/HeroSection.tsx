"use client";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Sparkles, ArrowRight, Receipt, CheckCircle2, Zap } from "lucide-react";
import { useEffect, useState } from "react";
import { motion } from "framer-motion";

export const HeroSection = () => {
  return (
    <div className="min-h-screen w-full flex flex-col items-center justify-center px-4 py-8 max-w-7xl mx-auto relative overflow-hidden mt-[65px]">
      <HeroContent />
      <ProductDemo />
    </div>
  );
};

const HeroContent = () => {
  return (
    <motion.div
      className="w-full max-w-4xl space-y-8 text-center z-10 mb-12"
      initial={{ opacity: 0, y: 40 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6, ease: "easeOut" }}
    >
      <motion.div
        className="space-y-6"
        initial="hidden"
        animate="visible"
        variants={{
          hidden: {},
          visible: {
            transition: {
              staggerChildren: 0.15,
            },
          },
        }}
      >
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
        >
          <Badge
            variant="outline"
            className="px-4 py-2 rounded-full border-emerald-800/40 bg-emerald-950/30 text-emerald-500 flex items-center gap-2 w-fit mx-auto"
          >
            <Sparkles size={16} className="text-yellow-400" />
            <span className="font-medium text-sm sm:text-base">
              AI-Powered Receipt Scanning
            </span>
          </Badge>
        </motion.div>

        <motion.h1
          className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold tracking-tight leading-tight"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
        >
          <span className="bg-gradient-to-r from-emerald-300 via-teal-300 to-emerald-400 bg-clip-text text-transparent">
            Transform Receipts
          </span>
          <br />
          <span className="bg-gradient-to-r from-teal-400 via-emerald-300 to-teal-200 bg-clip-text text-transparent">
            Into Insights
          </span>
        </motion.h1>

        <motion.p
          className="text-base sm:text-lg bg-gradient-to-r from-[#FDFDFD] to-[#B7B9BE]/80 bg-clip-text text-transparent leading-relaxed max-w-2xl mx-auto px-4"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.1 }}
        >
          Our AI instantly scans and converts your receipts and bills into
          organized expenses. No more manual data entry — just snap, scan, and
          track.
        </motion.p>
      </motion.div>

      <motion.div
        className="flex justify-center"
        initial={{ opacity: 0, scale: 0.95 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.4, delay: 0.2 }}
      >
        <Button
          asChild
          size="lg"
          className="bg-gradient-to-r from-emerald-700 to-teal-600 hover:from-emerald-600 hover:to-teal-500 text-white rounded-lg px-8 py-3 font-medium shadow-lg shadow-emerald-900/30 w-full max-w-xs sm:w-auto"
        >
          <Link
            href="/dashboard"
            className="flex items-center justify-center gap-2"
          >
            Try For Free
            <ArrowRight size={16} />
          </Link>
        </Button>
      </motion.div>
    </motion.div>
  );
};

const ProductDemo = () => {
  const [currentStep, setCurrentStep] = useState(0);

  const steps = [
    { label: "Upload Receipt", icon: Receipt, color: "emerald" },
    { label: "AI Processing", icon: Sparkles, color: "teal" },
    { label: "Data Extracted", icon: CheckCircle2, color: "emerald" },
  ];

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentStep((prev) => (prev + 1) % steps.length);
    }, 2500);
    return () => clearInterval(interval);
  }, []);

  return (
    <div className="relative w-full  max-w-md sm:max-w-lg mx-auto">
      <motion.div
        className="relative rounded-2xl border border-white/10 shadow-xl overflow-hidden mx-4 sm:mx-0"
        animate={{ y: [0, -5, 0] }}
        transition={{
          duration: 4,
          repeat: Number.POSITIVE_INFINITY,
          ease: "easeInOut",
        }}
      >
        <div className="bg-black px-4 sm:px-6 py-4 border-b p-8 rounded-2xl border border-white/10">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className="w-8 h-8 bg-emerald-700/60 rounded-lg flex items-center justify-center">
                <Receipt className="w-4 h-4 text-emerald-600" />
              </div>
              <div>
                <div className="font-semibold bg-gradient-to-r from-emerald-700 via-teal-400 to-emerald-400 bg-clip-text text-transparent text-sm sm:text-base">
                  Receipt Scanner
                </div>
                <div className="text-xs bg-gradient-to-r from-[#FDFDFD] to-[#B7B9BE]/80 bg-clip-text text-transparent">
                  AI-Powered Processing
                </div>
              </div>
            </div>
          </div>
        </div>

        <div className="p-4 sm:p-6">
          <motion.div
            className="border-2 border-dashed border-gray-300 rounded-xl p-4 sm:p-8 text-center relative overflow-hidden"
            animate={{
              borderColor: currentStep === 1 ? "#10b981" : "#d1d5db",
            }}
            transition={{ duration: 0.3 }}
          >
            <div className="relative bg-white rounded-lg shadow-sm border border-gray-200 p-3 sm:p-4 max-w-48 mx-auto">
              <div className="text-center mb-3">
                <div className="font-bold text-black text-xs sm:text-sm">
                  TARGET #1234
                </div>
                <div className="text-xs text-gray-800">123 Main St</div>
              </div>
              <div className="space-y-1 text-xs font-mono text-black">
                <div className="flex justify-between">
                  <span>MILK 1GAL</span>
                  <span>$4.99</span>
                </div>
                <div className="flex justify-between">
                  <span>BREAD</span>
                  <span>$2.49</span>
                </div>
                <div className="flex justify-between">
                  <span>EGGS DOZEN</span>
                  <span>$3.29</span>
                </div>
                <div className="border-t border-gray-200 pt-1 mt-2">
                  <div className="flex justify-between font-bold">
                    <span>TOTAL</span>
                    <span>$10.77</span>
                  </div>
                </div>
              </div>
            </div>

            {/* Processing overlay */}
            {currentStep === 1 && (
              <motion.div
                className="absolute inset-0 bg-emerald-50/80 flex items-center justify-center"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
              >
                <div className="text-center">
                  <motion.div
                    className="w-8 h-8 border-2 border-emerald-600 border-t-transparent rounded-full mx-auto mb-2"
                    animate={{ rotate: 360 }}
                    transition={{
                      duration: 1,
                      repeat: Number.POSITIVE_INFINITY,
                      ease: "linear",
                    }}
                  />
                  <div className="text-sm font-medium text-emerald-700">
                    Processing...
                  </div>
                </div>
              </motion.div>
            )}
          </motion.div>

          {/* Extracted data */}
          {currentStep === 2 && (
            <motion.div
              className="mt-4 sm:mt-6 space-y-3"
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
            >
              <div className="text-sm font-semibold text-white mb-3">
                Extracted Data
              </div>
              {[
                { label: "Store", value: "Target #1234", confidence: 99 },
                { label: "Total", value: "$10.77", confidence: 98 },
                { label: "Items", value: "3 products", confidence: 97 },
              ].map((item, index) => (
                <motion.div
                  key={index}
                  className="bg-gray-50/70 flex items-center justify-between p-3 border border-white/5 rounded-lg"
                  initial={{ opacity: 0, x: -10 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: index * 0.1 }}
                >
                  <div>
                    <div className="text-sm font-medium text-gray-900">
                      {item.label}
                    </div>
                    <div className="text-sm text-gray-600">{item.value}</div>
                  </div>
                  <div className="text-xs text-emerald-600 font-medium">
                    {item.confidence}%
                  </div>
                </motion.div>
              ))}
            </motion.div>
          )}
        </div>

        {/* Progress steps */}
        <div className="px-4 sm:px-6 pb-6">
          <div className="flex items-center justify-center">
            {steps.map((step, index) => (
              <div key={index} className="flex items-center">
                <motion.div
                  className={`w-8 h-8 rounded-full flex items-center justify-center border-2 transition-colors ${
                    index <= currentStep
                      ? "bg-emerald-100 border-emerald-500 text-emerald-600"
                      : "bg-gray-100 border-gray-300 text-gray-400"
                  }`}
                  animate={{
                    scale: index === currentStep ? 1.1 : 1,
                  }}
                  transition={{ duration: 0.2 }}
                >
                  <step.icon className="w-4 h-4" />
                </motion.div>
                {index < steps.length - 1 && (
                  <motion.div
                    className={`w-12 sm:w-16 h-0.5 mx-2 transition-colors ${
                      index < currentStep ? "bg-emerald-500" : "bg-gray-300"
                    }`}
                    animate={{
                      backgroundColor:
                        index < currentStep ? "#10b981" : "#d1d5db",
                    }}
                    transition={{ duration: 0.3 }}
                  />
                )}
              </div>
            ))}
          </div>
          <div className="flex justify-center mt-2 space-x-8 sm:space-x-12">
            {steps.map((step, index) => (
              <div key={index} className="text-xs text-gray-600 text-center">
                {step.label}
              </div>
            ))}
          </div>
        </div>
      </motion.div>

      {/* Floating elements - Hidden on mobile to avoid clutter */}
      <motion.div
        className="absolute -top-4 -right-2 sm:-right-4 w-12 h-12 sm:w-16 sm:h-16 bg-emerald-100 rounded-full items-center justify-center shadow-lg hidden sm:flex"
        animate={{ y: [0, -10, 0] }}
        transition={{
          duration: 3,
          repeat: Number.POSITIVE_INFINITY,
          ease: "easeInOut",
        }}
      >
        <Zap className="w-6 h-6 sm:w-8 sm:h-8 text-emerald-600" />
      </motion.div>

      <motion.div
        className="absolute -bottom-4 -left-2 sm:-left-4 w-10 h-10 sm:w-12 sm:h-12 bg-teal-100 rounded-full items-center justify-center shadow-lg hidden sm:flex"
        animate={{ y: [0, 10, 0] }}
        transition={{
          duration: 2.5,
          repeat: Number.POSITIVE_INFINITY,
          ease: "easeInOut",
          delay: 1,
        }}
      >
        <CheckCircle2 className="w-5 h-5 sm:w-6 sm:h-6 text-teal-600" />
      </motion.div>
    </div>
  );
};
