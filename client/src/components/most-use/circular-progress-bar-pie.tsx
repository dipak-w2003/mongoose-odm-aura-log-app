import React from "react";

interface PieChartProps {
  progress: number;
  label: string;
}

const PieChart: React.FC<PieChartProps> = ({ progress = 0, label }) => {
  const radius = 45;
  const circumference = 2 * Math.PI * radius;

  // Modern Rich Multicolor Palette
  const getProgressColor = (value: number) => {
    if (value <= 20) return "#3B82F6"; // Blue
    if (value <= 40) return "#6366F1"; // Indigo
    if (value <= 60) return "#A855F7"; // Purple
    if (value <= 80) return "#EC4899"; // Pink
    if (value <= 90) return "#F97316"; // Orange
    return "#10B981"; // Green (Success)
  };

  const progressColor = getProgressColor(progress);

  return (
    <div className="inline-block m-2 w-[50px] h-[50px] relative rounded-full text-white">
      <svg
        className="w-full h-full"
        viewBox="0 0 100 100"
        style={{ transform: "rotate(-90deg)" }}
      >
        {/* Light Gray Background Arc */}
        <circle
          cx="50"
          cy="50"
          r={radius}
          strokeWidth="8"
          fill="none"
          stroke="#e5e7eb"
          strokeDasharray={circumference}
          strokeDashoffset={0}
          strokeLinecap="round"
        />

        {/* Solid Color Progress Arc */}
        <circle
          cx="50"
          cy="50"
          r={radius}
          strokeWidth="8"
          fill="none"
          stroke={progressColor}
          strokeDasharray={circumference}
          strokeDashoffset={circumference * (1 - progress / 100)}
          strokeLinecap="round"
          style={{
            transition: "stroke-dashoffset 0.7s ease-out, stroke 0.4s ease-out",
          }}
        />
      </svg>

      {/* Center Label */}
      <div className="absolute inset-0 flex flex-col items-center justify-center">
        <div className="text-sm font-bold">{progress}%</div>
        <div className="text-xs text-white">{label}</div>
      </div>
    </div>
  );
};

export default PieChart;
