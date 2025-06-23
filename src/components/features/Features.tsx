"use client";
import { motion } from "framer-motion";
import { FileText, Brain, Clock, Target } from "lucide-react";

export const Features = () => {
  const stats = [
    {
      number: "99.9%",
      label: "Accuracy Rate",
      icon: <Target className="w-5 h-5" />,
    },
    {
      number: "<3s",
      label: "Processing Time",
      icon: <Clock className="w-5 h-5" />,
    },
    {
      number: "50+",
      label: "Receipt Types",
      icon: <FileText className="w-5 h-5" />,
    },
    {
      number: "24/7",
      label: "AI Availability",
      icon: <Brain className="w-5 h-5" />,
    },
  ];

  return (
    <div className="w-full py-24 px-4 relative overflow-hidden bg-black">
      {/* Decorative backgrounds */}
      <div
        className="absolute inset-0 opacity-30"
        style={{
          backgroundImage: `radial-gradient(circle at 2px 2px, rgba(0,0,0,0.05) 1px, transparent 0)`,
          backgroundSize: "32px 32px",
        }}
      />
      <div className="absolute top-1/6 left-1/6 w-96 h-96 bg-gradient-to-r from-emerald-200/20 to-teal-200/20 rounded-full blur-3xl" />
      <div className="absolute bottom-1/4 right-1/6 w-96 h-96 bg-gradient-to-r from-cyan-200/20 to-blue-200/20 rounded-full blur-3xl" />

      <div className="max-w-7xl mx-auto relative z-10">
        {/* Header Section */}
        <motion.div
          className="text-center mb-20"
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, ease: "easeOut" }}
          viewport={{ once: true }}
        >
          <h2 className="text-4xl md:text-5xl lg:text-6xl font-bold mb-6 leading-tight">
            <span className="bg-gradient-to-r from-emerald-300 via-teal-300 to-emerald-400 bg-clip-text text-transparent">
              Intelligent Receipt
            </span>
            <br />
            <span className="bg-gradient-to-r from-emerald-300 via-teal-300 to-emerald-400 bg-clip-text text-transparent">
              Processing
            </span>
          </h2>

          <p className="bg-gradient-to-r from-[#FDFDFD] to-[#B7B9BE]/80 bg-clip-text text-transparent text-lg md:text-xl max-w-3xl mx-auto leading-relaxed">
            Transform any receipt into structured data instantly with our
            advanced AI technology. No more manual typing, no more errors—just
            intelligent automation.
          </p>
        </motion.div>

        {/* Stats Cards */}
        <motion.div
          className="grid grid-cols-2 md:grid-cols-4 gap-6 mb-20"
          initial="hidden"
          whileInView="visible"
          transition={{ staggerChildren: 0.15 }}
          viewport={{ once: true }}
        >
          {stats.map((stat, index) => (
            <motion.div
              key={index}
              variants={{
                hidden: { opacity: 0, scale: 0.9 },
                visible: { opacity: 1, scale: 1 },
              }}
              transition={{ duration: 0.4, ease: "easeOut" }}
              className="text-center"
            >
              <div className="relative backdrop-blur-md bg-white/5 p-8 rounded-2xl border border-white/10 transition-all duration-300 group hover:transform hover:translate-y-1 hover:shadow-lg shadow-xl overflow-hidden">
                <div className="flex items-center justify-center mb-3">
                  <div className="p-2 bg-gradient-to-r from-emerald-100 to-teal-100 rounded-lg text-emerald-600">
                    {stat.icon}
                  </div>
                </div>
                <div className="text-2xl md:text-3xl font-bold bg-gradient-to-r from-emerald-800 via-teal-400 to-emerald-400 bg-clip-text text-transparent mb-1">
                  {stat.number}
                </div>
                <div className="text-sm bg-gradient-to-r from-[#FDFDFD] to-[#B7B9BE]/80 bg-clip-text text-transparent font-medium">
                  {stat.label}
                </div>
              </div>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </div>
  );
};
