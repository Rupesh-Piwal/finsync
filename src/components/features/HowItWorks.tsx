"use client";
import React, { useState, useEffect } from "react";
import { SectionHeader } from "../shared/SectionHeader";
import { motion } from "framer-motion";

export const HowItWorks = () => {
  const [activeStep, setActiveStep] = useState(0);

  // Auto-advance through steps
  useEffect(() => {
    const interval = setInterval(() => {
      setActiveStep((prev) => (prev + 1) % 3);
    }, 5000);
    return () => clearInterval(interval);
  }, []);

  const steps = [
    {
      title: "Upload Receipt",
      description:
        "Capture or upload any receipt or bill instantly from your device.",
      gradient: "from-emerald-600 to-teal-500",
      icon: (
        <svg
          viewBox="0 0 24 24"
          className="w-12 h-12 text-white"
          fill="none"
          stroke="currentColor"
          strokeWidth="1.5"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            d="M3 16.5v2.25A2.25 2.25 0 005.25 21h13.5A2.25 2.25 0 0021 18.75V16.5m-13.5-9L12 3m0 0l4.5 4.5M12 3v13.5"
          />
        </svg>
      ),
      illustration: (
        <div className="relative h-full w-full">
          <div className="absolute inset-0 flex items-center justify-center">
            <div className="w-32 h-48 bg-white/10 backdrop-blur-sm rounded-lg shadow-xl border border-white/20 flex flex-col items-center justify-center">
              <div className="w-24 h-24 rounded-lg bg-gradient-to-br from-gray-200 to-gray-300 mb-4"></div>
              <div className="w-20 h-2 bg-white/30 rounded-full mb-2"></div>
              <div className="w-16 h-2 bg-white/20 rounded-full"></div>
            </div>
          </div>
          <motion.div
            className="absolute left-1/2 -translate-x-1/2 -top-4 w-16 h-16 bg-gradient-to-br from-emerald-400 to-teal-500 rounded-lg shadow-lg flex items-center justify-center transform rotate-12"
            animate={{
              y: [0, -20, 0],
              rotate: [12, -5, 12],
            }}
            transition={{
              repeat: Infinity,
              duration: 3,
              ease: "easeInOut",
            }}
          >
            <svg
              className="w-10 h-10 text-white"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M3 10h18M7 15h1m4 0h1m-7 4h12a3 3 0 003-3V8a3 3 0 00-3-3H6a3 3 0 00-3 3v8a3 3 0 003 3z"
              />
            </svg>
          </motion.div>
          <motion.div
            className="absolute bottom-0 right-0 w-24 h-24 opacity-40"
            animate={{
              opacity: [0.4, 0.8, 0.4],
              scale: [1, 1.1, 1],
            }}
            transition={{
              repeat: Infinity,
              duration: 4,
              ease: "easeInOut",
            }}
          >
            <svg viewBox="0 0 200 200" fill="none">
              <path
                fill="rgba(64, 224, 208, 0.3)"
                d="M139.5,21.2c16.9,6.5,31.6,18.8,38,34.8c6.5,16,4.6,35.6-2.2,53.2c-6.7,17.6-18.3,33.2-34.5,41.1c-16.2,7.9-36.9,8-53.3,0.4c-16.4-7.7-28.4-23.1-35.2-39.8c-6.8-16.7-8.3-34.6-2.9-49.3c5.4-14.7,17.8-26.2,32.5-35C97.7,18,114.9,11.5,127.7,12.1C140.5,12.6,149,17.2,139.5,21.2z"
              />
            </svg>
          </motion.div>
        </div>
      ),
    },
    {
      title: "AI Processing",
      description:
        "Our advanced AI extracts all relevant information including date, vendor, items, and total amount.",
      gradient: "from-teal-600 to-cyan-500",
      icon: (
        <svg
          viewBox="0 0 24 24"
          className="w-12 h-12 text-white"
          fill="none"
          stroke="currentColor"
          strokeWidth="1.5"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            d="M9.75 3.104v5.714a2.25 2.25 0 01-.659 1.591L5 14.5M9.75 3.104c-.251.023-.501.05-.75.082m.75-.082a24.301 24.301 0 014.5 0m0 0v5.714c0 .597.237 1.17.659 1.591L19.8 15.3M14.25 3.104c.251.023.501.05.75.082M19.8 15.3l-1.57.393A9.065 9.065 0 0112 15a9.065 9.065 0 00-6.23-.693L5 14.5m14.8.8l1.402 1.402c1.232 1.232.65 3.318-1.067 3.611A48.309 48.309 0 0112 21c-2.773 0-5.491-.235-8.135-.687-1.718-.293-2.3-2.379-1.067-3.61L5 14.5"
          />
        </svg>
      ),
      illustration: (
        <div className="relative h-full w-full">
          <div className="absolute inset-0 flex items-center justify-center">
            <div className="w-40 h-40 rounded-lg bg-gradient-to-br from-gray-900/60 to-gray-800/60 backdrop-blur-md p-3 border border-teal-500/30 flex flex-col shadow-xl">
              <div className="flex justify-between mb-3">
                <div className="w-16 h-2 bg-teal-400/40 rounded-full"></div>
                <div className="w-6 h-2 bg-teal-500/60 rounded-full"></div>
              </div>
              <div className="flex gap-2 mb-3">
                <div className="w-3 h-3 rounded-full bg-teal-400/60"></div>
                <div className="w-16 h-2 my-auto bg-white/20 rounded-full"></div>
              </div>
              <div className="flex gap-2 mb-3">
                <div className="w-3 h-3 rounded-full bg-cyan-400/60"></div>
                <div className="w-20 h-2 my-auto bg-white/20 rounded-full"></div>
              </div>
              <div className="flex gap-2 mb-3">
                <div className="w-3 h-3 rounded-full bg-emerald-400/60"></div>
                <div className="w-12 h-2 my-auto bg-white/20 rounded-full"></div>
              </div>
              <div className="w-full h-px bg-white/10 my-2"></div>
              <div className="flex justify-between">
                <div className="w-12 h-2 bg-white/20 rounded-full"></div>
                <div className="w-16 h-2 bg-teal-400/60 rounded-full"></div>
              </div>
            </div>
          </div>
          <motion.div
            className="absolute inset-0"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
          >
            {Array.from({ length: 8 }).map((_, i) => (
              <motion.div
                key={i}
                className="absolute"
                style={{
                  left: `${Math.random() * 100}%`,
                  top: `${Math.random() * 100}%`,
                  width: `${Math.random() * 20 + 10}px`,
                  height: `${Math.random() * 20 + 10}px`,
                  borderRadius: "50%",
                  background: `rgba(${45 + Math.random() * 30}, ${
                    212 + Math.random() * 30
                  }, ${200 + Math.random() * 30}, ${
                    0.2 + Math.random() * 0.3
                  })`,
                }}
                animate={{
                  scale: [1, 1.5, 1],
                  opacity: [0.5, 0.8, 0.5],
                }}
                transition={{
                  duration: 2 + Math.random() * 3,
                  repeat: Infinity,
                  delay: Math.random() * 2,
                }}
              />
            ))}
          </motion.div>
          <motion.div
            className="absolute top-0 right-0 w-12 h-12"
            animate={{
              rotate: [0, 360],
            }}
            transition={{
              duration: 20,
              repeat: Infinity,
              ease: "linear",
            }}
          >
            <svg viewBox="0 0 100 100" fill="none">
              <circle
                cx="50"
                cy="50"
                r="40"
                stroke="rgba(20, 184, 166, 0.3)"
                strokeWidth="6"
                strokeDasharray="251.2"
                strokeDashoffset="62.8"
              />
            </svg>
          </motion.div>
        </div>
      ),
    },
    {
      title: "Auto Categorization",
      description:
        "Expenses are automatically categorized and added to your financial dashboard.",
      gradient: "from-cyan-500 to-blue-500",
      icon: (
        <svg
          viewBox="0 0 24 24"
          className="w-12 h-12 text-white"
          fill="none"
          stroke="currentColor"
          strokeWidth="1.5"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            d="M10.5 6a7.5 7.5 0 107.5 7.5h-7.5V6z"
          />
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            d="M13.5 10.5H21A7.5 7.5 0 0013.5 3v7.5z"
          />
        </svg>
      ),
      illustration: (
        <div className="relative h-full w-full">
          <div className="absolute inset-0 flex items-center justify-center">
            <div className="w-52 h-36 bg-gradient-to-br from-gray-900/50 to-gray-800/50 backdrop-blur-sm rounded-lg shadow-xl border border-white/10 p-4">
              <div className="flex justify-between mb-4">
                <div className="space-y-1">
                  <div className="w-16 h-1.5 bg-white/30 rounded-full"></div>
                  <div className="w-12 h-1.5 bg-white/20 rounded-full"></div>
                </div>
                <div className="flex gap-1.5">
                  <div className="w-3 h-3 rounded-full bg-cyan-400/60"></div>
                  <div className="w-3 h-3 rounded-full bg-indigo-400/60"></div>
                </div>
              </div>
              <div className="flex gap-4">
                <motion.div
                  className="w-24 h-16 bg-gradient-to-br from-cyan-500/20 to-blue-500/20 rounded-lg border border-cyan-500/30 flex flex-col justify-center items-center"
                  animate={{
                    y: [0, -5, 0],
                  }}
                  transition={{
                    duration: 3,
                    repeat: Infinity,
                    ease: "easeInOut",
                  }}
                >
                  <div className="w-10 h-10 rounded-full bg-gradient-to-br from-cyan-400/40 to-blue-400/40 flex items-center justify-center mb-1">
                    <svg
                      className="w-5 h-5 text-white/80"
                      viewBox="0 0 24 24"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth="2"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z"
                      />
                    </svg>
                  </div>
                  <div className="w-12 h-1 bg-white/30 rounded-full"></div>
                </motion.div>
                <motion.div
                  className="w-24 h-16 bg-gradient-to-br from-blue-500/20 to-indigo-500/20 rounded-lg border border-blue-500/30 flex flex-col justify-center items-center"
                  animate={{
                    y: [0, -5, 0],
                  }}
                  transition={{
                    duration: 3,
                    repeat: Infinity,
                    ease: "easeInOut",
                    delay: 0.5,
                  }}
                >
                  <div className="w-10 h-10 rounded-full bg-gradient-to-br from-blue-400/40 to-indigo-400/40 flex items-center justify-center mb-1">
                    <svg
                      className="w-5 h-5 text-white/80"
                      viewBox="0 0 24 24"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth="2"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6"
                      />
                    </svg>
                  </div>
                  <div className="w-12 h-1 bg-white/30 rounded-full"></div>
                </motion.div>
              </div>
            </div>
          </div>
          <motion.div
            className="absolute left-0 right-0 bottom-0 h-16"
            animate={{
              y: [5, -5, 5],
              opacity: [0.6, 1, 0.6],
            }}
            transition={{
              duration: 5,
              repeat: Infinity,
              ease: "easeInOut",
            }}
          >
            <svg
              viewBox="0 0 200 50"
              preserveAspectRatio="none"
              className="w-full h-full"
            >
              <path
                d="M0,25 Q40,5 80,25 T160,25 T240,25"
                fill="none"
                stroke="rgba(14, 116, 144, 0.3)"
                strokeWidth="2"
              />
            </svg>
          </motion.div>
        </div>
      ),
    },
  ];

  // Animation variants
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.3,
        delayChildren: 0.2,
      },
    },
  };

  const itemVariants = {
    hidden: { y: 20, opacity: 0 },
    visible: {
      y: 0,
      opacity: 1,
      transition: { duration: 0.6, ease: "easeOut" },
    },
  };

  return (
    <div className="w-full py-24 px-4 relative overflow-hidden ">
      {/* Animated background elements */}
      <div
        className="absolute inset-0 opacity-5 bg-[radial-gradient(circle,_rgba(0,200,200,0.15)_1.5px,_transparent_1.5px)] bg-center bg-repeat"
        style={{ backgroundSize: "30px 30px" }}
      ></div>

      {/* Dynamic blobs */}
      <motion.div
        className="absolute -top-20 -left-20 w-96 h-96 rounded-full bg-gradient-to-r from-emerald-600/10 to-cyan-600/10 blur-3xl"
        animate={{
          scale: [1, 1.2, 1],
          x: [0, 20, 0],
          y: [0, 30, 0],
        }}
        transition={{
          duration: 15,
          repeat: Infinity,
          ease: "easeInOut",
        }}
      />

      <motion.div
        className="absolute -bottom-40 -right-20 w-96 h-96 rounded-full bg-gradient-to-l from-blue-600/10 to-teal-600/10 blur-3xl"
        animate={{
          scale: [1, 1.3, 1],
          x: [0, -30, 0],
          y: [0, -20, 0],
        }}
        transition={{
          duration: 20,
          repeat: Infinity,
          ease: "easeInOut",
        }}
      />

      <div className="max-w-7xl mx-auto relative z-10">
        <SectionHeader
          subtitle="Simplicity Meets Intelligence"
          title="How Our AI Works"
        />

        {/* Interactive step selector */}
        <div className="flex justify-center mt-12 mb-16">
          <div className="flex items-center bg-white/5 backdrop-blur-sm rounded-full p-1.5 gap-2">
            {steps.map((_, index) => (
              <button
                key={index}
                onClick={() => setActiveStep(index)}
                className={`relative w-24 h-10 rounded-full flex items-center justify-center text-sm font-medium transition-all duration-300 ${
                  activeStep === index
                    ? "text-white"
                    : "text-gray-400 hover:text-white/80"
                }`}
              >
                {activeStep === index && (
                  <motion.div
                    className={`absolute inset-0 rounded-full bg-gradient-to-r ${steps[index].gradient}`}
                    layoutId="activeStepBackground"
                    initial={false}
                    transition={{
                      type: "spring",
                      stiffness: 300,
                      damping: 30,
                    }}
                  />
                )}
                <span className="relative z-10">Step {index + 1}</span>
              </button>
            ))}
          </div>
        </div>

        <motion.div
          variants={containerVariants}
          initial="hidden"
          animate="visible"
          className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center"
        >
          {/* Left side: Step content */}
          <motion.div variants={itemVariants} className="order-2 lg:order-1">
            <div className="relative">
              <motion.div
                key={`step-${activeStep}`}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -20 }}
                transition={{ duration: 0.5 }}
                className="flex flex-col"
              >
                {/* Step indicator with glowing effect */}
                <div className="flex items-center mb-6">
                  <div
                    className={`relative w-12 h-12 rounded-full bg-gradient-to-br ${steps[activeStep].gradient} flex items-center justify-center shadow-lg shadow-emerald-900/20 mr-4`}
                  >
                    <div
                      className={`absolute inset-0 rounded-full bg-gradient-to-br ${steps[activeStep].gradient} blur-md opacity-50 animate-pulse`}
                    ></div>
                    <span className="relative z-10 text-lg font-bold text-white">
                      {activeStep + 1}
                    </span>
                  </div>
                  <h3 className="text-2xl font-bold text-white">
                    {steps[activeStep].title}
                  </h3>
                </div>

                {/* Description */}
                <div className="ml-16 mb-8">
                  <p className="text-gray-300 text-lg">
                    {steps[activeStep].description}
                  </p>
                </div>

                {/* Features list */}
                <motion.div
                  className="ml-16 space-y-4"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ delay: 0.3 }}
                >
                  {[
                    "Advanced machine learning algorithms",
                    "99.8% accuracy in data extraction",
                    "Real-time processing and updates",
                  ].map((feature, i) => (
                    <div key={i} className="flex items-center gap-3">
                      <div
                        className={`w-5 h-5 rounded-full bg-gradient-to-br ${steps[activeStep].gradient} flex items-center justify-center`}
                      >
                        <svg
                          className="w-3 h-3 text-white"
                          viewBox="0 0 24 24"
                          fill="none"
                          stroke="currentColor"
                          strokeWidth="3"
                        >
                          <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            d="M5 13l4 4L19 7"
                          />
                        </svg>
                      </div>
                      <span className="text-gray-300">{feature}</span>
                    </div>
                  ))}
                </motion.div>
              </motion.div>
            </div>
          </motion.div>

          {/* Right side: Visual illustration */}
          <motion.div variants={itemVariants} className="order-1 lg:order-2">
            <div className="relative h-80 rounded-xl overflow-hidden bg-gray-900/50 backdrop-blur-sm border border-white/10 shadow-2xl">
              {/* Progress bar */}
              <div className="absolute top-0 left-0 right-0 h-1 bg-gray-800/50">
                <motion.div
                  className={`h-full bg-gradient-to-r ${steps[activeStep].gradient}`}
                  initial={{ width: "0%" }}
                  animate={{ width: "100%" }}
                  transition={{
                    duration: 5,
                    ease: "linear",
                    repeat: Infinity,
                    repeatType: "loop",
                  }}
                />
              </div>

              {/* Step Illustration */}
              <motion.div
                key={`illustration-${activeStep}`}
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                transition={{ duration: 0.5 }}
                className="w-full h-full"
              >
                {steps[activeStep].illustration}
              </motion.div>

              {/* Bottom decorative elements */}
              <div className="absolute bottom-0 left-0 right-0 h-16 bg-gradient-to-t from-gray-900/80 to-transparent" />
            </div>
          </motion.div>
        </motion.div>

        {/* Progress steps */}
        <div className="flex justify-center mt-20">
          <div className="flex items-center gap-2">
            {steps.map((_, index) => (
              <button
                key={index}
                onClick={() => setActiveStep(index)}
                className="group"
              >
                <div
                  className={`w-3 h-3 rounded-full transition-all duration-300 ${
                    activeStep === index
                      ? `bg-gradient-to-r ${steps[index].gradient}`
                      : "bg-gray-600 group-hover:bg-gray-400"
                  }`}
                />
              </button>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default HowItWorks;
