'use client';

import { motion } from 'framer-motion';
import { ReactNode } from 'react';

interface CardProps {
  children: ReactNode;
  className?: string;
  hover?: boolean;
  padding?: 'none' | 'sm' | 'md' | 'lg' | 'xl';
  variant?: 'default' | 'elevated' | 'outlined' | 'glass';
  onClick?: () => void;
}

export default function Card({ 
  children, 
  className = '', 
  hover = true,
  padding = 'md',
  variant = 'default',
  onClick
}: CardProps) {
  const baseClasses = `
    rounded-2xl transition-all duration-300 
    ${onClick ? 'cursor-pointer' : ''}
  `;

  const variants = {
    default: 'bg-white border border-gray-100 shadow-sm',
    elevated: 'bg-white shadow-lg border-0',
    outlined: 'bg-white border-2 border-gray-200 shadow-none',
    glass: 'bg-white/80 backdrop-blur-sm border border-gray-200/50 shadow-sm',
  };

  const paddings = {
    none: '',
    sm: 'p-4',
    md: 'p-6',
    lg: 'p-8',
    xl: 'p-10',
  };

  const hoverEffects = hover ? {
    default: 'hover:shadow-lg hover:border-gray-200 hover:-translate-y-1',
    elevated: 'hover:shadow-xl hover:-translate-y-1',
    outlined: 'hover:border-blue-200 hover:shadow-sm hover:-translate-y-1',
    glass: 'hover:bg-white/90 hover:shadow-md hover:-translate-y-1',
  } : {};

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      whileHover={hover && !onClick ? { scale: 1.02 } : {}}
      whileTap={onClick ? { scale: 0.98 } : {}}
      onClick={onClick}
      className={`
        ${baseClasses}
        ${variants[variant]}
        ${paddings[padding]}
        ${hover ? hoverEffects[variant] : ''}
        ${className}
      `}
    >
      {children}
    </motion.div>
  );
}