import React, { useState, useEffect } from 'react';

interface CircularProgressBarProps {
  percentage: number;
  completedCount: number;
  totalCount?: number;
  size?: number;
  strokeWidth?: number;
  color?: string;
  trackColor?: string;
  label?: string;
}

export const CircularProgressBar: React.FC<CircularProgressBarProps> = ({
  percentage,
  completedCount,
  totalCount = 100,
  size = 88,
  strokeWidth = 7,
  color = '#24364B',
  trackColor = '#E2DFD2',
  label,
}) => {
  const clampedPct = Math.min(100, Math.max(0, percentage));
  const radius = (size - strokeWidth) / 2;
  const circumference = 2 * Math.PI * radius;

  // Animation state to smoothly grow from 0 to target state on page load
  const [animatedPct, setAnimatedPct] = useState(0);

  useEffect(() => {
    // Small timeout ensures the initial 0 state is registered by the browser before animating
    const timer = setTimeout(() => {
      setAnimatedPct(clampedPct);
    }, 60);

    return () => clearTimeout(timer);
  }, [clampedPct]);

  const strokeDashoffset = circumference - (animatedPct / 100) * circumference;

  return (
    <div className="relative inline-flex items-center justify-center shrink-0" style={{ width: size, height: size }}>
      <svg
        width={size}
        height={size}
        viewBox={`0 0 ${size} ${size}`}
        className="transform -rotate-90"
      >
        {/* Track circle */}
        <circle
          cx={size / 2}
          cy={size / 2}
          r={radius}
          stroke={trackColor}
          strokeWidth={strokeWidth}
          fill="transparent"
          strokeLinecap="round"
        />

        {/* Progress active circle with smooth CSS transition */}
        <circle
          cx={size / 2}
          cy={size / 2}
          r={radius}
          stroke={color}
          strokeWidth={strokeWidth}
          fill="transparent"
          strokeDasharray={circumference}
          strokeDashoffset={strokeDashoffset}
          strokeLinecap="round"
          style={{
            transition: 'stroke-dashoffset 1000ms cubic-bezier(0.16, 1, 0.3, 1)',
            willChange: 'stroke-dashoffset',
          }}
        />
      </svg>

      {/* Center content */}
      <div className="absolute inset-0 flex flex-col items-center justify-center text-center select-none pointer-events-none">
        <span className="text-sm font-black text-[#24364B] leading-none transition-opacity duration-500">
          {clampedPct}%
        </span>
        <span className="text-[10px] font-semibold text-[#6B7787] mt-0.5 leading-none">
          {completedCount}/{totalCount}
        </span>
      </div>
    </div>
  );
};
