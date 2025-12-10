import React, { useEffect, useState } from "react";
import {
  motion,
  useMotionValue,
  useTransform,
  animate,
  useMotionValueEvent,
} from "framer-motion";

interface PieChartProps {
  progress: number;
  label: string;
}

const PieChart: React.FC<PieChartProps> = ({ progress = 0, label }) => {
  const radius = 45;
  const circumference = 2 * Math.PI * radius;

  // MotionValue for animation
  const mv = useMotionValue(0);

  // 🔥 Arc animation
  const dashOffset = useTransform(mv, (v) => circumference * (1 - v / 100));

  // 🔥 Number animation (will sync to local state)
  const displayedNumber = useTransform(mv, (v) => v);

  const [number, setNumber] = useState(0);

  // Sync number changes from MotionValue → React state
  useMotionValueEvent(displayedNumber, "change", (v) => {
    setNumber(Math.round(v));
  });

  useEffect(() => {
    animate(mv, progress, {
      duration: 0.9,
      ease: [0.22, 1, 0.36, 1],
    });
  }, [progress]);

  return (
    <motion.div
      className="relative w-[70px] h-[70px] inline-block"
      initial={{ scale: 0.8, opacity: 0 }}
      animate={{ scale: 1, opacity: 1 }}
      transition={{ duration: 0.4, ease: "easeOut" }}
    >
      {/* 🔥 FIRE WAVE GLOW BACKGROUND */}
      <motion.div
        className="absolute inset-0 blur-xl rounded-full"
        style={{
          background: "radial-gradient(circle, #ec4899, #a855f7)",
        }}
        animate={{
          scale: [1, 1.12, 1],
          opacity: [0.35, 0.5, 0.35],
          filter: [
            "blur(6px) brightness(1.1)",
            "blur(10px) brightness(1.3)",
            "blur(6px) brightness(1.1)",
          ],
        }}
        transition={{
          duration: 3,
          repeat: Infinity,
          ease: "easeInOut",
        }}
      />

      <svg
        className="w-full h-full relative"
        viewBox="0 0 100 100"
        style={{ transform: "rotate(-90deg)" }}
      >
        <defs>
          {/* 🔥 HEAT WAVE FILTER */}
          <filter id="fireWave">
            <feTurbulence
              type="fractalNoise"
              baseFrequency="0.7"
              numOctaves="3"
              result="noise"
            />
            <feDisplacementMap
              in="SourceGraphic"
              in2="noise"
              scale="3"
              xChannelSelector="R"
              yChannelSelector="G"
            />
          </filter>

          {/* Gradient */}
          <linearGradient id="grad" x1="1" y1="0" x2="0" y2="1">
            <stop offset="0%" stopColor="#6366F1" />
            <stop offset="50%" stopColor="#A855F7" />
            <stop offset="100%" stopColor="#EC4899" />
          </linearGradient>
        </defs>

        {/* Background Arc */}
        <circle
          cx="50"
          cy="50"
          r={radius}
          strokeWidth="8"
          fill="none"
          stroke="#ffffff20"
        />

        {/* 🔥 PROGRESS ARC */}
        <motion.circle
          cx="50"
          cy="50"
          r={radius}
          strokeWidth="8"
          fill="none"
          stroke="url(#grad)"
          strokeLinecap="round"
          strokeDasharray={circumference}
          style={{
            strokeDashoffset: dashOffset,
          }}
          filter="url(#fireWave)"
          animate={{
            strokeWidth: [8, 9.5, 8], // pulse
          }}
          transition={{
            duration: 1.6,
            repeat: Infinity,
            ease: "easeInOut",
          }}
        />
      </svg>

      {/* Center Content */}
      <div className="absolute inset-0 flex flex-col items-center justify-center text-white">
        <motion.div className="text-lg font-bold drop-shadow-md">
          {number}%
        </motion.div>
        <div className="text-[11px] opacity-80">{label}</div>
      </div>
    </motion.div>
  );
};

export default PieChart;
