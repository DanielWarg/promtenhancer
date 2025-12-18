import React from 'react';

interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: 'primary' | 'secondary' | 'ghost';
  isLoading?: boolean;
}

export const Button: React.FC<ButtonProps> = ({ 
  children, 
  variant = 'primary', 
  isLoading = false, 
  className = '',
  disabled,
  ...props 
}) => {
  // Enhanced base styles: Tracking, transform, shadow handling
  const baseStyles = "relative px-8 py-3.5 rounded-lg font-bold tracking-[0.15em] text-xs uppercase transition-all duration-300 ease-out flex items-center justify-center gap-3 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-prompt-bg focus:ring-prompt-accent disabled:opacity-50 disabled:cursor-not-allowed disabled:transform-none disabled:shadow-none";
  
  const variants = {
    // Primary: Rich solid color, lift on hover, soft shadow
    primary: "bg-prompt-accent text-white shadow-button hover:shadow-button-hover hover:-translate-y-0.5 active:translate-y-0 active:shadow-button hover:bg-prompt-accent-dark",
    
    // Secondary: Clean border, subtle background shift, text darken
    secondary: "bg-white text-prompt-text border border-prompt-border hover:border-prompt-accent hover:text-prompt-heading hover:bg-prompt-subtle hover:-translate-y-0.5 shadow-sm hover:shadow-md",
    
    // Ghost: Minimalist text only
    ghost: "bg-transparent text-prompt-text-muted hover:text-prompt-accent hover:bg-prompt-subtle/50",
  };

  return (
    <button 
      className={`${baseStyles} ${variants[variant]} ${className}`}
      disabled={disabled || isLoading}
      {...props}
    >
      {isLoading && (
        <svg className="animate-spin -ml-1 h-3 w-3 text-current" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
          <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
          <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
        </svg>
      )}
      {children}
    </button>
  );
};