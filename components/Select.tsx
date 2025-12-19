import React from 'react';

interface SelectProps extends React.SelectHTMLAttributes<HTMLSelectElement> {
  label?: string;
  error?: string;
  options: Array<{ value: string; label: string }>;
}

export const Select: React.FC<SelectProps> = ({ 
  label,
  error,
  options,
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
      <select
        className={`w-full bg-prompt-subtle text-prompt-text p-2.5 rounded-lg border border-transparent focus:bg-white focus:border-prompt-border outline-none text-xs font-bold uppercase tracking-wide cursor-pointer transition-all ${
          error ? 'border-red-200 focus:border-red-300' : ''
        } ${className}`}
        {...props}
      >
        {options.map(option => (
          <option key={option.value} value={option.value}>
            {option.label}
          </option>
        ))}
      </select>
      {error && (
        <span className="text-[10px] text-red-600 font-mono">{error}</span>
      )}
    </div>
  );
};

