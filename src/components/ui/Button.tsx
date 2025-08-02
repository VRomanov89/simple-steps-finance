'use client';

import { motion } from 'framer-motion';
import { ReactNode } from 'react';

interface ButtonProps {
  children: ReactNode;
  variant?: 'primary' | 'secondary' | 'outline' | 'ghost' | 'danger';
  size?: 'sm' | 'md' | 'lg' | 'xl';
  className?: string;
  onClick?: () => void;
  type?: 'button' | 'submit' | 'reset';
  disabled?: boolean;
  loading?: boolean;
  fullWidth?: boolean;
  icon?: ReactNode;
}

export default function Button({
  children,
  variant = 'primary',
  size = 'md',
  className = '',
  onClick,
  type = 'button',
  disabled = false,
  loading = false,
  fullWidth = false,
  icon,
}: ButtonProps) {
  const baseClasses = `
    inline-flex items-center justify-center font-medium rounded-xl 
    transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-offset-2
    disabled:cursor-not-allowed disabled:opacity-50
    ${fullWidth ? 'w-full' : ''}
  `;
  
  const variants = {
    primary: `
      bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 
      text-white shadow-lg hover:shadow-xl focus:ring-blue-500
      disabled:from-gray-400 disabled:to-gray-400 disabled:shadow-none
    `,
    secondary: `
      bg-white hover:bg-gray-50 text-gray-900 border-2 border-gray-200 
      hover:border-gray-300 shadow-sm hover:shadow-md focus:ring-gray-500
      disabled:bg-gray-100 disabled:text-gray-400 disabled:border-gray-200
    `,
    outline: `
      bg-transparent hover:bg-blue-50 text-blue-600 border-2 border-blue-200 
      hover:border-blue-300 focus:ring-blue-500
      disabled:bg-transparent disabled:text-gray-400 disabled:border-gray-200
    `,
    ghost: `
      bg-transparent hover:bg-gray-100 text-gray-600 hover:text-gray-900
      focus:ring-gray-500 disabled:text-gray-400 disabled:bg-transparent
    `,
    danger: `
      bg-red-600 hover:bg-red-700 text-white shadow-lg hover:shadow-xl 
      focus:ring-red-500 disabled:bg-gray-400 disabled:shadow-none
    `,
  };

  const sizes = {
    sm: 'px-3 py-2 text-sm gap-1.5',
    md: 'px-4 py-2.5 text-base gap-2',
    lg: 'px-6 py-3 text-lg gap-2.5',
    xl: 'px-8 py-4 text-xl gap-3',
  };

  const isDisabled = disabled || loading;

  return (
    <motion.button
      whileHover={isDisabled ? {} : { scale: 1.02 }}
      whileTap={isDisabled ? {} : { scale: 0.98 }}
      className={`
        ${baseClasses}
        ${variants[variant]}
        ${sizes[size]}
        ${className}
      `}
      onClick={onClick}
      type={type}
      disabled={isDisabled}
    >
      {loading && (
        <svg 
          className="animate-spin -ml-1 mr-2 h-4 w-4 text-current" 
          fill="none" 
          viewBox="0 0 24 24"
        >
          <circle 
            className="opacity-25" 
            cx="12" 
            cy="12" 
            r="10" 
            stroke="currentColor" 
            strokeWidth="4"
          />
          <path 
            className="opacity-75" 
            fill="currentColor" 
            d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
          />
        </svg>
      )}
      {icon && !loading && <span className="shrink-0">{icon}</span>}
      <span className={loading ? 'opacity-75' : ''}>
        {children}
      </span>
    </motion.button>
  );
}