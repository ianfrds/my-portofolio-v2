import React from 'react';
import { motion } from 'framer-motion';
import { ArrowUpRight } from 'lucide-react';

interface ContactButtonProps {
  className?: string;
  onClick?: () => void;
  href?: string;
  label?: string;
}

export const ContactButton: React.FC<ContactButtonProps> = ({
  className = '',
  onClick,
  href = '#contact',
  label = 'Get In Touch',
}) => {
  const content = (
    <motion.button
      type="button"
      whileHover={{ scale: 1.04, y: -2 }}
      whileTap={{ scale: 0.96 }}
      onClick={onClick}
      className={`group relative inline-flex items-center justify-center gap-2 rounded-full font-medium uppercase tracking-wider text-white transition-all duration-300 select-none cursor-pointer px-8 py-3.5 sm:px-10 sm:py-4 text-xs sm:text-sm md:text-base border border-white/20 hover:border-white/50 ${className}`}
      style={{
        background: 'linear-gradient(135deg, #22242C 0%, #111216 100%)',
        boxShadow:
          '0px 4px 20px rgba(0, 0, 0, 0.5), inset 0px 1px 0px rgba(255, 255, 255, 0.15)',
        outline: '1.5px solid rgba(255, 255, 255, 0.25)',
        outlineOffset: '-2px',
      }}
    >
      <span>{label}</span>
      <ArrowUpRight className="w-4 h-4 transition-transform duration-300 group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
    </motion.button>
  );

  if (href && !onClick) {
    return (
      <a href={href} className="inline-block no-underline">
        {content}
      </a>
    );
  }

  return content;
};
