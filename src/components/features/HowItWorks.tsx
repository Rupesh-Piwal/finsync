"use client";
import React from "react";
import { motion } from "framer-motion";
import { SectionHeader } from "../shared/SectionHeader";
import { Badge } from "../ui/badge";

export const HowItWorks = () => {
  return (
    <div className="w-full py-24 px-4 relative overflow-hidden bg-black text-center">
      <div className="absolute top-50 left-30 w-45 h-40 md:w-100 md:h-80 rounded-full bg-[#0D9488]/20 blur-3xl"></div>
      <div className="absolute bottom-20 right-20 w-100 h-80 rounded-full bg-[#10B981]/20 blur-3xl"></div>
      <div className="max-w-7xl mx-auto relative z-10">
        {/* Header */}
        <div className="text-center mb-12">
          <Badge
            variant="outline"
            className="px-4 py-1.5 rounded-full border-emerald-800/40 bg-emerald-950/30 text-emerald-300 flex items-center gap-2 w-fit mx-auto mb-6"
          >
            <span className="relative flex items-center ">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75"></span>
              <span className="relative inline-flex rounded-full h-2 w-2 bg-emerald-500"></span>
            </span>
            <span className="font-medium">Demo</span>
          </Badge>
          <h2 className="text-4xl md:text-5xl lg:text-6xl font-bold bg-gradient-to-r from-[#FDFDFD] to-[#B7B9BE]/70 bg-clip-text text-transparent mb-6">
            See WaitFast in action
          </h2>
          <p className="text-lg md:text-xl bg-gradient-to-r from-[#FDFDFD]/80 to-[#B7B9BE]/90 bg-clip-text text-transparent max-w-3xl mx-auto">
            Watch how easy it is to create beautiful waitlist pages in minutes
          </p>
        </div>

        {/* Video presentation area */}
        <div className="mt-12 relative">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="relative"
          >
            {/* Main container with angled elements */}
            <div className="relative z-10 bg-gradient-to-br from-gray-800/50 to-gray-900/80 backdrop-blur-md rounded-2xl border border-white/5 shadow-2xl overflow-hidden max-w-5xl mx-auto">
              {/* Floating mockup decorative elements */}
              <div className="absolute -left-16 -top-12 w-40 h-56 rounded-lg bg-gradient-to-br from-purple-300/10 to-blue-300/10 border border-white/10 transform rotate-12 backdrop-blur-sm"></div>
              <div className="absolute -right-20 -bottom-12 w-48 h-56 rounded-lg bg-gradient-to-br from-blue-300/10 to-cyan-300/10 border border-white/10 transform -rotate-12 backdrop-blur-sm"></div>

              {/* Video container */}
              <div className="relative p-6 md:p-8">
                {/* Video frame */}
                <div className="rounded-xl overflow-hidden aspect-video relative shadow-xl">
                  {/* Video thumbnail */}
                  <div className="absolute inset-0 bg-gradient-to-r from-green-400 to-yellow-400 opacity-80"></div>

                  {/* Mock browser chrome */}
                  <div className="absolute inset-0">
                    <div className="bg-gray-900/90 h-10 flex items-center px-4 border-b border-white/10">
                      <div className="flex space-x-2">
                        <div className="w-3 h-3 rounded-full bg-red-400"></div>
                        <div className="w-3 h-3 rounded-full bg-yellow-400"></div>
                        <div className="w-3 h-3 rounded-full bg-green-400"></div>
                      </div>
                      <div className="mx-auto bg-gray-800/80 rounded-md px-4 py-1 w-2/3 flex items-center">
                        <div className="w-4 h-4 rounded-full bg-gray-600 mr-2"></div>
                        <div className="h-2 bg-gray-600 rounded-full w-full"></div>
                      </div>
                    </div>

                    {/* Demo content */}
                    <div className="bg-white/5 h-full pt-10">
                      {/* Mockup of app interface */}
                      <div className="max-w-md mx-auto bg-white rounded-lg shadow-lg overflow-hidden">
                        <div className="bg-gradient-to-r from-green-300 to-yellow-300 p-8 flex items-center justify-center">
                          <div className="text-center">
                            <div className="text-2xl font-bold text-gray-800 flex items-center justify-center mb-2">
                              <svg
                                className="w-6 h-6 mr-2"
                                viewBox="0 0 24 24"
                                fill="none"
                              >
                                <path
                                  d="M13 10V3L4 14h7v7l9-11h-7z"
                                  stroke="currentColor"
                                  strokeWidth="2"
                                  strokeLinecap="round"
                                  strokeLinejoin="round"
                                />
                              </svg>
                              Simple project
                            </div>
                            <p className="text-gray-700">
                              Join the waitlist for exclusive updates!
                            </p>
                          </div>
                        </div>

                        <div className="p-6">
                          <div className="mb-3 text-sm font-medium text-gray-700">
                            Exclusive discount for Early Birds
                          </div>
                          <div className="mb-4 bg-gray-100 border border-gray-200 rounded-md px-3 py-2 flex items-center">
                            <div className="w-5 h-5 rounded-full bg-gray-300 mr-2"></div>
                            <div className="text-sm text-gray-500">
                              Email address
                            </div>
                          </div>
                          <button className="w-full bg-black text-white py-3 rounded-md font-medium flex items-center justify-center">
                            <span>Join the waitlist</span>
                            <svg
                              className="w-4 h-4 ml-2"
                              viewBox="0 0 24 24"
                              fill="none"
                              stroke="currentColor"
                              strokeWidth="2"
                            >
                              <path
                                d="M5 12h14M12 5l7 7-7 7"
                                strokeLinecap="round"
                                strokeLinejoin="round"
                              />
                            </svg>
                          </button>
                        </div>
                      </div>
                    </div>
                  </div>

                  {/* Play button */}
                  <div className="absolute inset-0 flex items-center justify-center">
                    <motion.div
                      className="w-20 h-20 bg-white/10 backdrop-blur-md rounded-full flex items-center justify-center border border-white/20 cursor-pointer"
                      whileHover={{ scale: 1.05 }}
                      whileTap={{ scale: 0.95 }}
                    >
                      <svg
                        className="w-10 h-10 text-white"
                        viewBox="0 0 24 24"
                        fill="currentColor"
                      >
                        <path d="M8 5v14l11-7z" />
                      </svg>
                    </motion.div>
                  </div>

                  {/* Video controls */}
                  <div className="absolute bottom-4 right-4 bg-black/40 backdrop-blur-sm rounded-full px-3 py-1 flex items-center space-x-2">
                    <svg
                      className="w-5 h-5 text-white"
                      viewBox="0 0 24 24"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth="2"
                    >
                      <path
                        d="M15.5 7.5a3.5 3.5 0 100 7 3.5 3.5 0 000-7z"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                      />
                      <path
                        d="M19.94 12.94c.5-.5.5-1.38 0-1.88L17.31 8.44c-.5-.5-1.38-.5-1.88 0l-2.72 2.72a3.5 3.5 0 14.96 4.96l2.72-2.72c.5-.5.5-1.38 0-1.88l-2.63-2.63c-.5-.5-1.38-.5-1.88 0L12.44 6.06a3.5 3.5 0 01-4.95 4.95L4.06 15.56c-.5.5-.5 1.38 0 1.88l2.63 2.63c.5.5 1.38.5 1.88 0l2.72-2.72"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                      />
                    </svg>
                    <svg
                      className="w-5 h-5 text-white"
                      viewBox="0 0 24 24"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth="2"
                    >
                      <rect
                        x="2"
                        y="2"
                        width="20"
                        height="20"
                        rx="5"
                        ry="5"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                      />
                      <path
                        d="M16 8v8H8V8h8z"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                      />
                    </svg>
                  </div>
                </div>

                {/* Video cursor animation */}
                <motion.div
                  className="absolute w-6 h-6 pointer-events-none z-20"
                  animate={{
                    x: [200, 500, 600, 400, 200],
                    y: [200, 300, 400, 250, 200],
                  }}
                  transition={{
                    duration: 10,
                    repeat: Infinity,
                    ease: "easeInOut",
                  }}
                >
                  <svg
                    viewBox="0 0 24 24"
                    className="w-full h-full text-white"
                    fill="currentColor"
                  >
                    <path d="M13.75 6.75L19.25 12L13.75 17.25V6.75Z" />
                    <path
                      d="M4 18H10"
                      strokeWidth="2"
                      stroke="currentColor"
                      strokeLinecap="round"
                    />
                  </svg>
                </motion.div>
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </div>
  );
};

export default HowItWorks;
