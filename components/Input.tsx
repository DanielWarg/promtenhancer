import React from 'react';

interface InputProps extends React.InputHTMLAttributes<HTMLInputElement> {
  label?: string;
  error?: string;
}

export const Input: React.FC<InputProps> = ({ 
  label,
  error,
  className = '',
  ...props 
}) => {
  return (
    <div className="flex flex-col gap-3">
      {label && (
        <label className="text-[10px] font-bold text-prompt-text-muted uppercase tracking-widest pl-1">
          {label}
        </label>
      )}
      <input
        className={`w-full bg-prompt-subtle text-prompt-text p-2.5 rounded-lg border border-transparent focus:bg-white focus:border-prompt-border outline-none text-xs font-medium transition-all ${
          error ? 'border-red-200 focus:border-red-300' : ''
        } ${className}`}
        {...props}
      />
      {error && (
        <span className="text-[10px] text-red-600 font-mono">{error}</span>
      )}
    </div>
  );
};

