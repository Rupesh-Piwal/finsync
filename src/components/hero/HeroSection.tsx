"use client";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Sparkles, ArrowRight } from "lucide-react";
import { useRef, useState } from "react";
import { motion, useScroll, useTransform } from "framer-motion";
import Image from "next/image";
import Hero from "../../../public/hero.png";

export const HeroSection = () => {
  return (
    <div className="min-h-screen w-full flex flex-col items-center justify-center px-4 py-8 max-w-7xl mx-auto relative overflow-hidden mt-[30px] md:mt-[65px]">
      <HeroContent />
      <ProductShowcase />
    </div>
  );
};

const HeroContent = () => {
  return (
    <motion.div
      className="w-full max-w-5xl space-y-8 text-center z-10 mb-16"
      initial={{ opacity: 0, y: 40 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6, ease: "easeOut" }}
    >
      <motion.div
        className="space-y-8"
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
            className="md:px-6 py-1 md:py-3 rounded-full border-emerald-800/40 bg-emerald-950/30 text-emerald-400 flex items-center gap-3 w-fit mx-auto text-sm font-medium"
          >
            <Sparkles size={18} className="text-yellow-400" />
            <span>AI-Powered Receipt Scanning</span>
          </Badge>
        </motion.div>

        <motion.h1
          className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-bold tracking-tight leading-[1.1]"
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
          className="text-[16px] sm:text-xl bg-gradient-to-r from-[#FDFDFD] to-[#B7B9BE]/80 bg-clip-text text-transparent leading-relaxed max-w-3xl mx-auto px-4"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.1 }}
        >
          Snap, scan and track. Our AI instantly turns receipts into organized
          expenses, no manual entry needed.
        </motion.p>

        <motion.div
          className="flex flex-col sm:flex-row gap-4 justify-center items-center"
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.4, delay: 0.2 }}
        >
          <Button
            asChild
            size="lg"
            className="bg-gradient-to-r from-emerald-700 to-teal-600 hover:from-emerald-600 hover:to-teal-500 text-white rounded-[10px] px-8 py-4 font-medium shadow-lg shadow-emerald-900/30 w-full sm:w-auto"
          >
            <Link
              href="/dashboard"
              className="flex items-center justify-center gap-3"
            >
              Try For Free
              <ArrowRight size={18} />
            </Link>
          </Button>
        </motion.div>
      </motion.div>
    </motion.div>
  );
};

const ProductShowcase = () => {
  const [isHovered, setIsHovered] = useState(false);
  const imageWrapperRef = useRef(null);

  const { scrollY } = useScroll();
  const scale = useTransform(scrollY, [0, 300], [1, 1.05]);
  const shadow = useTransform(
    scrollY,
    [0, 300],
    ["0px 0px 0px rgba(0,0,0,0)", "0px 20px 40px rgba(0,0,0,0.2)"]
  );

  return (
    <motion.div
      className="relative w-full max-w-4xl mx-auto"
      initial={{ opacity: 0, y: 60 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.8, delay: 0.3 }}
    >
      <div className="relative">
        {/* Floating blurred background circles */}
        <motion.div
          className="absolute -top-20 -left-20 w-40 h-40 bg-black rounded-full blur-3xl"
          animate={{ x: [0, 20, 0], y: [0, -20, 0] }}
          transition={{ duration: 6, repeat: Infinity, ease: "easeInOut" }}
        />
        <motion.div
          className="absolute -bottom-20 -right-20 w-60 h-60 rounded-full blur-3xl"
          animate={{ x: [0, -30, 0], y: [0, 20, 0] }}
          transition={{
            duration: 8,
            repeat: Infinity,
            ease: "easeInOut",
            delay: 2,
          }}
        />

        {/* Gradient glowing border wrapper */}
        <div className="p-[2px] rounded-xl bg-gradient-to-r from-teal-800 to-cyan-700 hover:from-teal-600 hover:to-cyan-600 transition-all duration-200 transform hover:scale-[1.02] shadow-lg shadow-teal-500/25 hover:shadow-teal-500/40">
          <motion.div
            ref={imageWrapperRef}
            className="relative bg-gray-900/50 backdrop-blur-xl rounded-xl border border-transparent overflow-hidden"
            style={{ scale, boxShadow: shadow }}
            onMouseEnter={() => setIsHovered(true)}
            onMouseLeave={() => setIsHovered(false)}
            animate={{
              scale: isHovered ? 1.05 : 1,
              y: isHovered ? -5 : 0,
            }}
            transition={{ duration: 0.3 }}
          >
            <Image
              src={Hero}
              alt="finsync banner"
              className="object-contain w-full h-auto"
              priority
            />
          </motion.div>
        </div>
      </div>
    </motion.div>
  );
};

export default ProductShowcase;
