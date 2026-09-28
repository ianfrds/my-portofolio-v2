import React from 'react';
import { motion } from 'framer-motion';

interface LiveProjectButtonProps {
  className?: string;
  href?: string;
  onClick?: () => void;
}

export const LiveProjectButton: React.FC<LiveProjectButtonProps> = ({
  className = '',
  href = '#',
  onClick,
}) => {
  return (
    <motion.a
      href={href}
      onClick={onClick}
      target={href.startsWith('http') ? '_blank' : undefined}
      rel={href.startsWith('http') ? 'noopener noreferrer' : undefined}
      whileHover={{ scale: 1.03 }}
      whileTap={{ scale: 0.97 }}
      className={`inline-flex items-center justify-center rounded-full border-2 border-[#D7E2EA] text-[#D7E2EA] font-medium uppercase tracking-widest hover:bg-[#D7E2EA]/10 transition-colors duration-200 px-8 py-3 sm:px-10 sm:py-3.5 text-sm sm:text-base select-none cursor-pointer whitespace-nowrap ${className}`}
    >
      Live Project
    </motion.a>
  );
};
