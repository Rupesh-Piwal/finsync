"use client";
import { BarChart3, Receipt, Table, ScanLine } from "lucide-react";
import Image from "next/image";
import { useState, useEffect } from "react";
import { motion, AnimatePresence, MotionStyle, Transition } from "motion/react";
import { cn } from "@/lib/utils";
import create from "../../../public/create-transaction.png";
import dashboard from "../../../public/Dashboard-chart.png";
import table from "../../../public/transaction.png";

// BorderBeam Component
interface BorderBeamProps {
  size?: number;
  duration?: number;
  delay?: number;
  colorFrom?: string;
  colorTo?: string;
  transition?: Transition;
  className?: string;
  style?: React.CSSProperties;
  reverse?: boolean;
  initialOffset?: number;
  borderWidth?: number;
}

const BorderBeam = ({
  className,
  size = 50,
  delay = 0,
  duration = 6,
  colorFrom = "#10b981",
  colorTo = "#14b8a6",
  transition,
  style,
  reverse = false,
  initialOffset = 0,
  borderWidth = 1,
}: BorderBeamProps) => {
  return (
    <div
      className="pointer-events-none absolute inset-0 rounded-[inherit] border-transparent [mask-clip:padding-box,border-box] [mask-composite:intersect] [mask-image:linear-gradient(transparent,transparent),linear-gradient(#000,#000)]"
      style={
        {
          "--border-beam-width": `${borderWidth}px`,
        } as React.CSSProperties
      }
    >
      <motion.div
        className={cn(
          "absolute aspect-square rounded-full blur-sm",
          "bg-gradient-to-r from-[var(--color-from)] via-[var(--color-to)] to-transparent",
          className
        )}
        style={
          {
            width: size,
            height: size,
            offsetPath: `rect(0 auto auto 0 round 24px)`,
            "--color-from": colorFrom,
            "--color-to": colorTo,
            ...style,
          } as MotionStyle
        }
        initial={{ offsetDistance: `${initialOffset}%` }}
        animate={{
          offsetDistance: reverse
            ? [`${100 - initialOffset}%`, `${-initialOffset}%`]
            : [`${initialOffset}%`, `${100 + initialOffset}%`],
        }}
        transition={{
          repeat: Infinity,
          ease: "linear",
          duration,
          delay: -delay,
          ...transition,
        }}
      />
    </div>
  );
};

export default function FeatAcc() {
  type ImageKey = "item-1" | "item-2" | "item-3";
  const [activeItem, setActiveItem] = useState<ImageKey>("item-1");

  // Auto-advance slides every 3 seconds
  useEffect(() => {
    const features: ImageKey[] = ["item-1", "item-2", "item-3"];
    const interval = setInterval(() => {
      setActiveItem((current) => {
        const currentIndex = features.indexOf(current);
        const nextIndex = (currentIndex + 1) % features.length;
        return features[nextIndex];
      });
    }, 3000);

    return () => clearInterval(interval);
  }, []);

  const images = {
    "item-1": {
      image: create,
      alt: "AI receipt scanning interface",
    },
    "item-2": {
      image: dashboard,
      alt: "Analytics dashboard with charts and budget tracking",
    },
    "item-3": {
      image: table,
      alt: "Transaction history table with filters and sorting",
    },
  };

  const features = [
    {
      key: "item-1" as ImageKey,
      icon: ScanLine,
      title: "AI Receipt Scanning",
      description:
        "Simply snap a photo of any receipt and let our advanced AI extract all transaction details automatically. No more manual data entry - from merchant names to amounts and categories, everything is captured instantly with industry-leading accuracy.",
    },
    {
      key: "item-2" as ImageKey,
      icon: BarChart3,
      title: "Visual Analytics Dashboard",
      description:
        "Get comprehensive insights with interactive charts showing your spending patterns, weekly transaction summaries, and monthly budget tracking. Monitor your financial health with beautiful visualizations that make complex data easy to understand.",
    },
    {
      key: "item-3" as ImageKey,
      icon: Table,
      title: "Smart Transaction Management",
      description:
        "Access your complete transaction history through an advanced table interface with powerful filtering and sorting capabilities. Search by date, amount, category, or merchant to find exactly what you need in seconds.",
    },
  ];

  return (
    <section className="py-20 lg:py-32 bg-zinc-950 relative overflow-hidden">
      {/* Subtle background elements */}
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_30%_20%,rgba(16,185,129,0.03),transparent_50%)]" />
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_70%_80%,rgba(20,184,166,0.02),transparent_50%)]" />

      <div className="mx-auto max-w-7xl px-6 lg:px-8">
        {/* Header */}
        <div className="mx-auto max-w-3xl text-center mb-20">
          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="text-4xl lg:text-6xl font-bold tracking-tight text-white mb-6"
          >
            Smart Expense Tracking
            <span className="text-emerald-400 block lg:inline">
              {" "}
              Made Simple
            </span>
          </motion.h2>
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.1 }}
            className="text-lg text-zinc-400 leading-relaxed"
          >
            Transform how you manage expenses with AI-powered receipt scanning,
            intelligent analytics, and comprehensive transaction management.
          </motion.p>
        </div>

        {/* Main content */}
        <div className="grid lg:grid-cols-2 gap-16 items-start">
          {/* Left side - Accordion */}
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6 }}
            className="space-y-3"
          >
            {features.map((feature, index) => (
              <motion.div
                key={feature.key}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.4, delay: index * 0.1 }}
                className={`group rounded-2xl border transition-all duration-300 overflow-hidden ${
                  activeItem === feature.key
                    ? "bg-emerald-950/20 border-emerald-500/30 shadow-[inset_0_1px_0_rgba(16,185,129,0.1)]  shadow-emerald-500/5"
                    : "bg-zinc-900/50 border-zinc-800/50 hover:border-zinc-700/60 hover:bg-zinc-900/70 shadow-[inset_0_1px_0_rgba(255,255,255,0.02)]"
                }`}
              >
                <button
                  onClick={() => setActiveItem(feature.key)}
                  className="w-full text-left p-6 focus:outline-none"
                >
                  <div className="flex items-center gap-4">
                    <div
                      className={`p-2 rounded-xl transition-colors shadow-[inset_0_-1px_0_rgba(0,0,0,0.2)] ${
                        activeItem === feature.key
                          ? "bg-emerald-500/20 text-emerald-400 shadow-[inset_0_1px_0_rgba(16,185,129,0.1)]"
                          : "bg-zinc-800/50 text-zinc-500 group-hover:text-zinc-400 shadow-[inset_0_-1px_0_rgba(0,0,0,0.3)]"
                      }`}
                    >
                      <feature.icon size={20} />
                    </div>
                    <div className="flex-1">
                      <h3
                        className={`text-lg font-semibold transition-colors ${
                          activeItem === feature.key
                            ? "text-white"
                            : "text-zinc-300 group-hover:text-white"
                        }`}
                      >
                        {feature.title}
                      </h3>
                    </div>
                    <div
                      className={`transition-transform duration-300 ${
                        activeItem === feature.key ? "rotate-180" : ""
                      }`}
                    >
                      <svg
                        width="16"
                        height="16"
                        viewBox="0 0 16 16"
                        className={`transition-colors ${
                          activeItem === feature.key
                            ? "text-emerald-400"
                            : "text-zinc-500"
                        }`}
                      >
                        <path fill="currentColor" d="M4 6l4 4 4-4H4z" />
                      </svg>
                    </div>
                  </div>

                  <AnimatePresence>
                    {activeItem === feature.key && (
                      <motion.div
                        initial={{ opacity: 0, height: 0 }}
                        animate={{ opacity: 1, height: "auto" }}
                        exit={{ opacity: 0, height: 0 }}
                        transition={{ duration: 0.3, ease: "easeInOut" }}
                        className="overflow-hidden"
                      >
                        <div className="pt-4 pl-14 pr-8">
                          <p className="text-zinc-400 leading-relaxed">
                            {feature.description}
                          </p>
                        </div>
                      </motion.div>
                    )}
                  </AnimatePresence>
                </button>
              </motion.div>
            ))}
          </motion.div>

          {/* Right side - Image showcase */}
          <motion.div
            initial={{ opacity: 0, x: 30 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="relative"
          >
            {/* Outer container with modern shadows */}
            <div className="relative bg-black/20 backdrop-blur-sm rounded-3xl p-4 border border-zinc-800/30 shadow-[inset_0_1px_0_rgba(255,255,255,0.03),inset_0_-1px_0_rgba(0,0,0,0.5)] ">
              {/* Inner image container with deep inset shadows */}
              <div className="relative bg-zinc-950 rounded-2xl overflow-hidden shadow-[inset_0_2px_8px_rgba(0,0,0,0.6),inset_0_-1px_2px_rgba(255,255,255,0.02)]">
                <AnimatePresence mode="wait">
                  <motion.div
                    key={activeItem}
                    initial={{ opacity: 0, scale: 0.96, y: 10 }}
                    animate={{ opacity: 1, scale: 1, y: 0 }}
                    exit={{ opacity: 0, scale: 0.96, y: -10 }}
                    transition={{ duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
                    className="aspect-[4/3] relative"
                  >
                    {/* Dark inner border for depth */}
                    <div className="absolute inset-0 rounded-2xl shadow-[inset_0_0_0_1px_rgba(0,0,0,0.8)] z-10 pointer-events-none" />

                    <Image
                      src={images[activeItem].image}
                      alt={images[activeItem].alt}
                      fill
                      className="object-cover object-center rounded-2xl"
                      sizes="(max-width: 768px) 100vw, 50vw"
                    />

                    {/* Deep inner shadows over image */}
                    <div className="absolute inset-0 shadow-[inset_0_4px_12px_rgba(0,0,0,0.4),inset_0_-2px_6px_rgba(0,0,0,0.3)] rounded-2xl pointer-events-none" />

                    {/* Subtle vignette */}
                    <div className="absolute inset-0 bg-gradient-to-br from-transparent via-transparent to-black/20 rounded-2xl pointer-events-none" />
                  </motion.div>
                </AnimatePresence>

                {/* Feature indicator dots with inner shadows */}
                <div className="absolute bottom-6 right-6 flex gap-3 z-20">
                  {features.map((feature) => (
                    <div
                      key={feature.key}
                      className={`w-3 h-3 rounded-full transition-all duration-300 ${
                        activeItem === feature.key
                          ? "bg-emerald-400 shadow-[0_0_8px_rgba(16,185,129,0.4),inset_0_1px_1px_rgba(255,255,255,0.2)]"
                          : "bg-zinc-700 shadow-[inset_0_1px_2px_rgba(0,0,0,0.8)]"
                      }`}
                    />
                  ))}
                </div>
              </div>

              {/* Emerald/Teal BorderBeam */}
              <BorderBeam
                size={80}
                duration={8}
                colorFrom="#10b981"
                colorTo="#14b8a6"
                className="opacity-60"
              />

              {/* Outer glow for premium feel */}
              <div className="absolute -inset-1 bg-gradient-to-br from-emerald-500/5 via-transparent to-teal-500/5 rounded-3xl blur-xl -z-10" />
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
