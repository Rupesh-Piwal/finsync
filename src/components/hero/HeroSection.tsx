"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import Particles from "./Particles";

export const HeroSection = () => {
  return (
    <div className="flex-1 w-full flex flex-col md:flex-row items-center justify-between px-4 py-16 md:py-28 md:px-10 max-w-7xl mx-auto relative overflow-hidden">
      {/* Enhanced background elements with smoother gradients */}
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,_var(--tw-gradient-stops))] from-emerald-800/20 via-gray-950 to-teal-900/10 z-0"></div>

      <motion.div
        className="absolute top-20 right-20 w-96 h-96 rounded-full bg-gradient-to-br from-emerald-500/15 to-teal-400/5 blur-3xl"
        animate={{
          scale: [1, 1.2, 1],
          opacity: [0.5, 0.7, 0.5],
        }}
        transition={{
          duration: 8,
          repeat: Infinity,
          ease: "easeInOut",
        }}
      />

      <motion.div
        className="absolute -bottom-20 -left-20 w-96 h-96 rounded-full bg-gradient-to-tr from-teal-500/15 to-emerald-400/5 blur-3xl"
        animate={{
          scale: [1.2, 1, 1.2],
          opacity: [0.7, 0.5, 0.7],
        }}
        transition={{
          duration: 8,
          delay: 2,
          repeat: Infinity,
          ease: "easeInOut",
        }}
      />

      {/* Floating particles background - now client-side only */}
      <Particles />

      {/* Left content */}
      <HeroContent />

      {/* Right content */}
      <ReceiptVisualization />
    </div>
  );
};

const HeroContent = () => {
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.2,
        delayChildren: 0.3,
      },
    },
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.8,
        ease: [0.6, 0.05, -0.01, 0.9],
      },
    },
  };

  return (
    <motion.div
      className="w-full md:w-1/2 space-y-10 text-center md:text-left z-10"
      variants={containerVariants}
      initial="hidden"
      animate="visible"
    >
      <motion.div className="space-y-2" variants={itemVariants}>
        <motion.div
          className="inline-block px-4 py-1.5 rounded-full bg-gradient-to-r from-emerald-900/70 to-teal-900/70 text-emerald-300 text-sm font-medium mb-4 backdrop-blur-sm shadow-inner shadow-emerald-900/20"
          whileHover={{ scale: 1.05 }}
          transition={{ type: "spring", stiffness: 400, damping: 10 }}
        >
          AI-Powered Receipt Scanning
        </motion.div>
        <h1 className="text-4xl md:text-6xl font-bold tracking-tight">
          <motion.span
            className="bg-gradient-to-r from-emerald-300 via-teal-200 to-emerald-300 bg-clip-text text-transparent inline-block"
            animate={{
              backgroundPosition: ["0% center", "100% center", "0% center"],
            }}
            transition={{
              duration: 8,
              repeat: Infinity,
              ease: "linear",
            }}
          >
            Transform Receipts
          </motion.span>
          <br />
          <motion.span
            className="bg-gradient-to-r from-teal-400 via-emerald-300 to-teal-300 bg-clip-text text-transparent inline-block"
            animate={{
              backgroundPosition: ["100% center", "0% center", "100% center"],
            }}
            transition={{
              duration: 8,
              repeat: Infinity,
              ease: "linear",
            }}
          >
            Into Insights
          </motion.span>
        </h1>
      </motion.div>

      <motion.p
        className="text-xl text-gray-300 leading-relaxed font-light"
        variants={itemVariants}
      >
        Our AI instantly scans and converts your receipts and bills into
        organized expenses. No more manual data entry — just snap, scan, and
        track your financial journey effortlessly.
      </motion.p>

      <motion.div
        className="flex flex-col sm:flex-row space-y-4 sm:space-y-0 sm:space-x-6 md:justify-start justify-center"
        variants={itemVariants}
      >
        <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
          <Button
            asChild
            className="bg-gradient-to-r from-emerald-600 via-teal-500 to-emerald-500 hover:from-emerald-500 hover:via-teal-400 hover:to-emerald-400 text-white rounded-full h-14 px-10 font-medium transition-all duration-300 shadow-lg shadow-emerald-900/30"
          >
            <Link href="/sign-in">Try For Free</Link>
          </Button>
        </motion.div>

        <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
          <Button
            variant="outline"
            className="border-2 border-emerald-500/40 bg-gray-950/50 backdrop-blur-sm text-emerald-300 hover:text-emerald-200 hover:bg-gray-900/70 rounded-full h-14 px-10 font-medium transition-all duration-300"
            asChild
          >
            <Link href="/sign-up">Watch Demo</Link>
          </Button>
        </motion.div>
      </motion.div>
    </motion.div>
  );
};

const ReceiptVisualization = () => {
  return (
    <motion.div
      className="hidden md:block w-1/2 z-10 pl-10"
      initial={{ opacity: 0, x: 50 }}
      animate={{ opacity: 1, x: 0 }}
      transition={{ duration: 0.8, delay: 0.5 }}
    >
      <div className="relative h-96 w-full max-w-md mx-auto">
        {/* Phone frame with hover effect */}
        <motion.div
          className="absolute inset-0 rounded-3xl border-8 border-gray-800 bg-gray-900 shadow-xl overflow-hidden"
          initial={{ rotate: 3 }}
          animate={{ rotate: [3, 0, 3] }}
          transition={{ duration: 10, repeat: Infinity, ease: "easeInOut" }}
          whileHover={{ scale: 1.02 }}
        >
          {/* Screen content */}
          <div className="absolute inset-0 bg-gradient-to-br from-gray-900 to-gray-800 p-4">
            {/* Receipt being scanned visualization */}
            <div className="h-full flex flex-col">
              <motion.div
                className="text-sm text-emerald-400 font-medium mb-2 flex items-center"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 1 }}
              >
                <motion.div
                  className="w-2 h-2 rounded-full bg-emerald-500 mr-2"
                  animate={{ opacity: [0.5, 1, 0.5] }}
                  transition={{ duration: 1.5, repeat: Infinity }}
                />
                FinSync AI
              </motion.div>

              {/* "Scanner" view with receipt */}
              <div className="flex-1 relative rounded-lg bg-gray-950 flex items-center justify-center overflow-hidden border border-gray-800">
                {/* Receipt */}
                <motion.div
                  className="w-3/4 h-4/5 bg-white rounded-md shadow-lg"
                  initial={{ rotate: 2, y: 20, opacity: 0 }}
                  animate={{ rotate: 2, y: 0, opacity: 1 }}
                  transition={{ duration: 0.8, delay: 1.2 }}
                >
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
                </motion.div>

                {/* Scanning effect */}
                <motion.div
                  className="absolute inset-x-0 h-8 bg-gradient-to-b from-emerald-400/30 to-transparent rounded-full blur-sm"
                  initial={{ y: -100 }}
                  animate={{ y: ["-100%", "200%"] }}
                  transition={{
                    duration: 2,
                    repeat: Infinity,
                    repeatType: "loop",
                    ease: "linear",
                  }}
                />
              </div>

              {/* Processing indicator */}
              <motion.div
                className="mt-3 bg-gray-800 rounded-lg p-3 border border-emerald-900/30"
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 1.5, duration: 0.5 }}
              >
                <div className="flex items-center">
                  <motion.div
                    className="h-2 w-2 rounded-full bg-emerald-400"
                    animate={{ scale: [1, 1.5, 1] }}
                    transition={{ duration: 1.5, repeat: Infinity }}
                  />
                  <span className="ml-2 text-sm text-emerald-300">
                    Processing Receipt...
                  </span>
                </div>
                <div className="mt-2 h-1.5 w-full bg-gray-700 rounded-full overflow-hidden">
                  <motion.div
                    className="h-full bg-gradient-to-r from-emerald-500 to-teal-400 rounded-full"
                    initial={{ width: "0%" }}
                    animate={{ width: ["0%", "60%", "75%", "90%", "100%"] }}
                    transition={{
                      duration: 3.5,
                      ease: "easeInOut",
                      times: [0, 0.3, 0.5, 0.8, 1],
                    }}
                  />
                </div>
              </motion.div>
            </div>
          </div>
        </motion.div>

        {/* Decorative elements */}
        <motion.div
          className="absolute -bottom-6 -right-6 w-24 h-24 rounded-full bg-gradient-to-br from-emerald-500 to-teal-400 blur-2xl"
          animate={{
            opacity: [0.3, 0.5, 0.3],
            scale: [1, 1.2, 1],
          }}
          transition={{
            duration: 4,
            repeat: Infinity,
            ease: "easeInOut",
          }}
        />
      </div>
    </motion.div>
  );
};

export default HeroSection;
