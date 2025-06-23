"use client";
import { motion } from "framer-motion";

export const CallToAction = () => {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.8, delay: 0.8 }}
      className="text-center mt-20"
    >
      <div className="bg-gradient-to-r from-emerald-700 to-teal-600 rounded-2xl mx-[20px] md:[120px] p-8 md:p-12 text-white shadow-xl">
        <h3 className="text-2xl md:text-3xl font-bold mb-4">
          Ready to Experience AI-Powered Receipt Processing?
        </h3>
        <p className="text-emerald-100 md:text-lg mb-8 max-w-2xl mx-auto">
          Join thousands of users who have already streamlined their workflow
          with intelligent receipt scanning.
        </p>
        <motion.button
          className="bg-white text-emerald-600 px-8 py-4 rounded-xl font-semibold text-lg hover:bg-gray-50 transition-colors duration-200 shadow-lg cursor-pointer"
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}
        >
          Start Free Trial
        </motion.button>
      </div>
    </motion.div>
  );
};
