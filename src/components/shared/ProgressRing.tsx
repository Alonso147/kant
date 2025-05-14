import React from 'react';

interface ProgressRingProps {
  progress: number; // 0 to 1
  size?: number;
  strokeWidth?: number;
  color?: string;
  backgroundColor?: string;
  children?: React.ReactNode;
}

const ProgressRing: React.FC<ProgressRingProps> = ({
  progress,
  size = 80,
  strokeWidth = 4,
  color = '#10b981',
  backgroundColor = '#e2e8f0',
  children,
}) => {
  // Ensure progress is between 0 and 1
  const normalizedProgress = Math.min(1, Math.max(0, progress));
  
  // Calculate radius
  const radius = (size - strokeWidth) / 2;
  // Calculate circumference
  const circumference = 2 * Math.PI * radius;
  // Calculate stroke dash offset
  const strokeDashoffset = circumference * (1 - normalizedProgress);
  
  // Center position
  const center = size / 2;

  return (
    <div className="relative inline-flex" style={{ width: size, height: size }}>
      <svg width={size} height={size} className="rotate-[-90deg]">
        {/* Background circle */}
        <circle
          cx={center}
          cy={center}
          r={radius}
          fill="none"
          stroke={backgroundColor}
          strokeWidth={strokeWidth}
        />
        
        {/* Progress circle */}
        <circle
          cx={center}
          cy={center}
          r={radius}
          fill="none"
          stroke={color}
          strokeWidth={strokeWidth}
          strokeDasharray={circumference}
          strokeDashoffset={strokeDashoffset}
          strokeLinecap="round"
          className="transition-all duration-500 ease-in-out"
        />
      </svg>
      
      {/* Center content */}
      {children && (
        <div 
          className="absolute top-0 left-0 w-full h-full flex items-center justify-center"
        >
          {children}
        </div>
      )}
    </div>
  );
};

export default ProgressRing;