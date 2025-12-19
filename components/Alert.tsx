import React from 'react';

interface AlertProps {
  children: React.ReactNode;
  variant?: 'success' | 'warning' | 'error' | 'info';
  className?: string;
}

export const Alert: React.FC<AlertProps> = ({ 
  children, 
  variant = 'info',
  className = ''
}) => {
  const baseStyles = "p-4 rounded-lg border flex items-start gap-3 text-xs font-mono";
  
  const variants = {
    success: "bg-green-50 border-green-100 text-green-900",
    warning: "bg-yellow-50 border-yellow-100 text-yellow-900",
    error: "bg-red-50 border-red-100 text-red-900",
    info: "bg-blue-50 border-blue-100 text-blue-900"
  };
  
  const dotColors = {
    success: "bg-green-400",
    warning: "bg-yellow-400",
    error: "bg-red-400",
    info: "bg-blue-400"
  };
  
  return (
    <div className={`${baseStyles} ${variants[variant]} ${className}`}>
      <span className={`w-2 h-2 rounded-full mt-1 flex-shrink-0 ${dotColors[variant]}`}></span>
      <div className="flex-1">{children}</div>
    </div>
  );
};

