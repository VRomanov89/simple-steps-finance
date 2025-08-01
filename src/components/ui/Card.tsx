'use client';

import { motion } from 'framer-motion';
import { ReactNode } from 'react';

interface CardProps {
  children: ReactNode;
  className?: string;
  hover?: boolean;
}

export default function Card({ children, className = '', hover = true }: CardProps) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      whileHover={hover ? { y: -4, shadow: '0 10px 40px -10px rgba(0, 0, 0, 0.1)' } : {}}
      className={`
        bg-white rounded-2xl shadow-sm border border-gray-100 p-6 
        transition-all duration-200
        ${hover ? 'hover:shadow-md' : ''}
        ${className}
      `}
    >
      {children}
    </motion.div>
  );
}