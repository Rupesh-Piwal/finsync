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
    <div className="min-h-screen w-full flex flex-col items-center justify-center px-4 py-8 max-w-7xl mx-auto relative mt-[30px] md:mt-[65px]">
      <HeroContent />
      <ProductShowcase />
    </div>
  );
};

const HeroContent = () => {
  return (
    <motion.div
      className="w-full max-w-5xl space-y-8 text-center z-10 mb-20"
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
          className="text-4xl sm:text-5xl md:text-6xl lg:text-5xl font-bold tracking-tight leading-[1.1]"
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
          className="text-[16px] md:text-[17px] sm:text-xl bg-gradient-to-r from-[#FDFDFD] to-[#B7B9BE]/80 bg-clip-text text-transparent leading-relaxed max-w-3xl mx-auto px-4"
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
  const y = useTransform(scrollY, [0, 500], [0, -50]);

  return (
    <motion.div
      className="relative w-full max-w-6xl mx-auto"
      initial={{ opacity: 0, y: 60 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.8, delay: 0.4 }}
      style={{ y }}
    >
      <motion.div
        ref={imageWrapperRef}
        className="relative group cursor-pointer"
        onMouseEnter={() => setIsHovered(true)}
        onMouseLeave={() => setIsHovered(false)}
        whileHover={{ y: -8 }}
        transition={{ duration: 0.4, ease: "easeOut" }}
      >
        {/* Main image container with premium shadow */}
        <div className="relative overflow-hidden rounded-2xl bg-white/5 backdrop-blur-sm border border-white/10">
          {/* Premium shadow layers */}
          <div className="absolute inset-0 rounded-2xl shadow-[0_0_0_1px_rgba(255,255,255,0.05)] pointer-events-none" />
          <div className="absolute -inset-4 rounded-3xl bg-gradient-to-b from-white/[0.02] to-transparent blur-2xl opacity-60 pointer-events-none" />

          {/* Subtle glow effect */}
          <motion.div
            className="absolute -inset-8 rounded-3xl opacity-0 pointer-events-none"
            style={{
              background:
                "radial-gradient(600px circle at var(--mouse-x) var(--mouse-y), rgba(16, 185, 129, 0.06), transparent 40%)",
            }}
            animate={{ opacity: isHovered ? 1 : 0 }}
            transition={{ duration: 0.3 }}
          />

          {/* Image */}
          <motion.div
            className="relative z-10 overflow-hidden rounded-2xl"
            animate={{
              scale: isHovered ? 1.02 : 1,
            }}
            transition={{ duration: 0.4, ease: "easeOut" }}
          >
            <Image
              src={Hero}
              alt="finsync banner"
              className="object-contain w-full h-auto select-none"
              priority
              draggable={false}
            />

            {/* Subtle overlay for premium feel */}
            <div className="absolute inset-0 bg-gradient-to-t from-black/5 via-transparent to-white/5 pointer-events-none" />
          </motion.div>
        </div>

        {/* Ultra-subtle ambient glow */}
        <div className="absolute inset-0 -z-10 rounded-2xl bg-gradient-to-b from-emerald-500/5 to-transparent blur-3xl scale-110 opacity-40" />

        {/* Premium drop shadow */}
        <motion.div
          className="absolute inset-0 -z-20 rounded-2xl"
          style={{
            boxShadow:
              "0 25px 50px -12px rgba(0, 0, 0, 0.25), 0 0 0 1px rgba(255, 255, 255, 0.05)",
          }}
          animate={{
            boxShadow: isHovered
              ? "0 35px 80px -12px rgba(0, 0, 0, 0.35), 0 0 0 1px rgba(255, 255, 255, 0.1)"
              : "0 25px 50px -12px rgba(0, 0, 0, 0.25), 0 0 0 1px rgba(255, 255, 255, 0.05)",
          }}
          transition={{ duration: 0.4 }}
        />
      </motion.div>

      {/* Floating elements for depth */}
      <motion.div
        className="absolute top-1/4 -left-20 w-2 h-2 bg-emerald-400/30 rounded-full blur-sm"
        animate={{
          y: [0, -20, 0],
          opacity: [0.3, 0.7, 0.3],
        }}
        transition={{
          duration: 4,
          repeat: Infinity,
          ease: "easeInOut",
          delay: 1,
        }}
      />
      <motion.div
        className="absolute top-3/4 -right-16 w-1 h-1 bg-teal-400/40 rounded-full blur-sm"
        animate={{
          y: [0, 15, 0],
          opacity: [0.4, 0.8, 0.4],
        }}
        transition={{
          duration: 3,
          repeat: Infinity,
          ease: "easeInOut",
          delay: 2,
        }}
      />
    </motion.div>
  );
};

export default ProductShowcase;
