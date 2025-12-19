import React from 'react';

interface TextareaProps extends React.TextareaHTMLAttributes<HTMLTextAreaElement> {
  label?: string;
  error?: string;
}

export const Textarea: React.FC<TextareaProps> = ({ 
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
      <textarea
        className={`w-full bg-prompt-subtle text-prompt-text p-5 rounded-xl border border-transparent focus:border-prompt-accent focus:bg-white focus:ring-1 focus:ring-prompt-accent outline-none min-h-[160px] resize-none transition-all placeholder-prompt-text-muted/50 font-mono text-sm leading-relaxed ${
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

