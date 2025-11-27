import React from "react";

interface ProgressBarProps {
  progress: number; // The progress percentage (0 to 100)
  color?: string; // Tailwind color class for the bar (e.g., 'bg-blue-500')
  height?: string; // Tailwind height class for the bar (e.g., 'h-4')
}

const RoundedProgressBar: React.FC<ProgressBarProps> = ({
  progress,
  color = "bg-blue-600", // Default color
  height = "h-2", // Default height
}) => {
  // Ensure progress is within 0-100 range
  const clampedProgress = Math.min(100, Math.max(0, progress));

  return (
    <div
      className={`w-full ${height} bg-gray-200 rounded-full overflow-hidden`}
    >
      <div
        className={`${height} ${color} rounded-full transition-all duration-500 ease-out`}
        style={{ width: `${clampedProgress}%` }}
        role="progressbar"
        aria-valuenow={clampedProgress}
        aria-valuemin={0}
        aria-valuemax={100}
      />
    </div>
  );
};

export default RoundedProgressBar;
