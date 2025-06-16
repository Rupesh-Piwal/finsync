"use client";
import React from "react";
import { motion } from "framer-motion";
import { Badge } from "../ui/badge";

export const HowItWorks = () => {
  return (
    <div className="w-full py-24 md:py-32 px-4 relative overflow-hidden bg-gradient-to-br from-gray-950 via-black to-gray-950">
      {/* Subtle grid background */}
      <div
        className="absolute inset-0 opacity-20"
        style={{
          backgroundImage: `radial-gradient(circle at 1px 1px, rgba(255,255,255,0.1) 1px, transparent 0)`,
          backgroundSize: "24px 24px",
        }}
      />

      {/* Minimal gradient orbs */}
      <div className="absolute top-1/3 left-1/4 w-80 h-80 bg-emerald-500/5 rounded-full blur-3xl" />
      <div className="absolute bottom-1/3 right-1/4 w-80 h-80 bg-teal-500/5 rounded-full blur-3xl" />

      <div className="max-w-6xl mx-auto relative z-10">
        {/* Header */}
        <div className="text-center mb-16">
          <Badge
            variant="outline"
            className="inline-flex items-center justify-center px-4 py-2 mb-8 text-sm font-medium text-emerald-400 bg-emerald-400/10 border border-emerald-400/20 rounded-full backdrop-blur-sm"
          >
            <span className="flex items-center mr-2">
              <span className="animate-ping absolute inline-flex h-2 w-2 rounded-full bg-emerald-400 opacity-75"></span>
              <span className="relative inline-flex rounded-full h-2 w-2 bg-emerald-400"></span>
            </span>
            Demo
          </Badge>

          <h2 className="text-4xl md:text-5xl lg:text-6xl font-bold mb-6 leading-tight">
            <span className="bg-gradient-to-r from-white via-gray-100 to-gray-300 bg-clip-text text-transparent">
              See WaitFast in
            </span>
            <br />
            <span className="bg-gradient-to-r from-emerald-400 via-teal-400 to-cyan-400 bg-clip-text text-transparent">
              Action
            </span>
          </h2>

          <p className="text-gray-400 text-lg md:text-xl max-w-2xl mx-auto leading-relaxed">
            Watch how easy it is to create beautiful waitlist pages in minutes
          </p>
        </div>

        {/* Demo Video Section */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, ease: "easeOut" }}
          className="relative"
        >
          {/* Main video container */}
          <div className="relative bg-gradient-to-br from-gray-900/50 to-gray-800/30 backdrop-blur-xl rounded-2xl border border-white/10 shadow-2xl overflow-hidden max-w-4xl mx-auto">
            {/* Browser chrome */}
            <div className="bg-gray-900/90 px-4 py-3 border-b border-white/10 flex items-center">
              <div className="flex space-x-2 mr-4">
                <div className="w-3 h-3 rounded-full bg-red-400/80"></div>
                <div className="w-3 h-3 rounded-full bg-yellow-400/80"></div>
                <div className="w-3 h-3 rounded-full bg-green-400/80"></div>
              </div>
              <div className="flex-1 bg-gray-800/60 rounded-lg px-3 py-1.5 text-sm text-gray-400 flex items-center">
                <svg
                  className="w-4 h-4 mr-2 text-gray-500"
                  fill="currentColor"
                  viewBox="0 0 20 20"
                >
                  <path
                    fillRule="evenodd"
                    d="M5 9V7a5 5 0 0110 0v2a2 2 0 012 2v5a2 2 0 01-2 2H5a2 2 0 01-2-2v-5a2 2 0 012-2zm8-2v2H7V7a3 3 0 016 0z"
                    clipRule="evenodd"
                  />
                </svg>
                waitfast.com/demo
              </div>
            </div>

            {/* Video content area */}
            <div className="relative aspect-video bg-gradient-to-br from-white to-gray-50">
              {/* Mock waitlist interface */}
              <div className="absolute inset-0 flex items-center justify-center p-8 md:p-16">
                <div className="w-full max-w-md bg-white rounded-xl shadow-xl border border-gray-200 overflow-hidden">
                  {/* Header */}
                  <div className="bg-gradient-to-r from-emerald-500 to-teal-500 p-6 text-center text-white">
                    <div className="flex items-center justify-center mb-2">
                      <svg
                        className="w-6 h-6 mr-2"
                        fill="currentColor"
                        viewBox="0 0 20 20"
                      >
                        <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                      </svg>
                      <span className="text-xl font-bold">WaitFast</span>
                    </div>
                    <p className="text-emerald-100">
                      Join the waitlist for exclusive early access
                    </p>
                  </div>

                  {/* Form */}
                  <div className="p-6 space-y-4">
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        Email address
                      </label>
                      <div className="relative">
                        <input
                          type="email"
                          placeholder="you@example.com"
                          className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-emerald-500 focus:border-transparent outline-none transition-all"
                        />
                      </div>
                    </div>

                    <motion.button
                      className="w-full bg-gradient-to-r from-emerald-500 to-teal-500 text-white py-3 px-4 rounded-lg font-semibold flex items-center justify-center space-x-2 hover:from-emerald-600 hover:to-teal-600 transition-all duration-200"
                      whileHover={{ scale: 1.02 }}
                      whileTap={{ scale: 0.98 }}
                    >
                      <span>Join Waitlist</span>
                      <svg
                        className="w-4 h-4"
                        fill="none"
                        stroke="currentColor"
                        viewBox="0 0 24 24"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth={2}
                          d="M13 7l5 5-5 5M6 12h12"
                        />
                      </svg>
                    </motion.button>

                    <p className="text-xs text-gray-500 text-center">
                      Join 2,847 others waiting for early access
                    </p>
                  </div>
                </div>
              </div>

              {/* Play button overlay */}
              <div className="absolute inset-0 flex items-center justify-center bg-black/20 group cursor-pointer">
                <motion.div
                  className="w-16 h-16 bg-white/90 backdrop-blur-sm rounded-full flex items-center justify-center border border-white/20 shadow-lg group-hover:bg-white transition-all duration-200"
                  whileHover={{ scale: 1.1 }}
                  whileTap={{ scale: 0.9 }}
                >
                  <svg
                    className="w-6 h-6 text-gray-800 ml-1"
                    fill="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path d="M8 5v14l11-7z" />
                  </svg>
                </motion.div>
              </div>
            </div>

            {/* Video duration indicator */}
            <div className="absolute bottom-4 left-4 bg-black/60 backdrop-blur-sm rounded-full px-3 py-1 text-white text-sm font-medium">
              2:34
            </div>
          </div>
        </motion.div>
      </div>
    </div>
  );
};

export default HowItWorks;
