"use client";

import { motion } from "framer-motion";
import { useMemo } from "react";

const generateParticles = (count: number) => {
  return Array.from({ length: count }, () => ({
    x: Math.random() * 100,
    y: Math.random() * 100,
    size: Math.random() * 4 + 2,
    duration: Math.random() * 2 + 3,
  }));
};

export default function Particles({ count = 30 }: { count?: number }) {
  const particles = useMemo(() => generateParticles(count), [count]);

  return (
    <div className="absolute inset-0 -z-10 overflow-hidden">
      {particles.map((particle, index) => (
        <motion.div
          key={index}
          className="absolute bg-white rounded-full"
          initial={{
            x: `${particle.x}vw`,
            y: `${particle.y}vh`,
            opacity: 0,
            scale: 0,
          }}
          animate={{
            y: `${particle.y - 20}vh`,
            opacity: [0, 0.5, 0],
            scale: [0, 1, 0],
          }}
          transition={{
            duration: particle.duration,
            repeat: Infinity,
            ease: [0.6, 0.05, 0.01, 0.9], // ✅ Valid cubic-bezier
          }}
          style={{
            width: particle.size,
            height: particle.size,
          }}
        />
      ))}
    </div>
  );
}
