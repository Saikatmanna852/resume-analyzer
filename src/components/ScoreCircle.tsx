import React, { useEffect, useState } from 'react';

interface ScoreCircleProps {
  percentage: number;
}

export const ScoreCircle: React.FC<ScoreCircleProps> = ({ percentage }) => {
  const [displayPercentage, setDisplayPercentage] = useState(0);
  
  useEffect(() => {
    // Animate the percentage
    const duration = 1500;
    const interval = 20;
    const steps = duration / interval;
    const increment = percentage / steps;
    let current = 0;
    let timer: number;
    
    const updatePercentage = () => {
      current += increment;
      if (current > percentage) {
        current = percentage;
        clearInterval(timer);
      }
      setDisplayPercentage(Math.floor(current));
    };
    
    timer = window.setInterval(updatePercentage, interval);
    
    return () => {
      clearInterval(timer);
    };
  }, [percentage]);
  
  // Calculate color based on percentage
  const getColor = () => {
    if (percentage >= 80) return 'text-emerald-500';
    if (percentage >= 60) return 'text-blue-500';
    if (percentage >= 40) return 'text-yellow-500';
    return 'text-red-500';
  };
  
  // Calculate stroke-dasharray and stroke-dashoffset for circle
  const radius = 58;
  const circumference = 2 * Math.PI * radius;
  const offset = circumference - (displayPercentage / 100) * circumference;
  
  return (
    <div className="relative w-36 h-36">
      <svg className="w-full h-full" viewBox="0 0 120 120">
        {/* Background circle */}
        <circle
          cx="60"
          cy="60"
          r={radius}
          stroke="#e5e7eb"
          strokeWidth="8"
          fill="none"
        />
        
        {/* Progress circle */}
        <circle
          cx="60"
          cy="60"
          r={radius}
          stroke="currentColor"
          strokeWidth="8"
          strokeLinecap="round"
          strokeDasharray={circumference}
          strokeDashoffset={offset}
          fill="none"
          className={`transition-all duration-300 ${getColor()}`}
          transform="rotate(-90 60 60)"
        />
      </svg>
      
      {/* Percentage text */}
      <div className="absolute inset-0 flex items-center justify-center flex-col">
        <span className={`text-3xl font-bold ${getColor()}`}>
          {displayPercentage}%
        </span>
      </div>
    </div>
  );
};