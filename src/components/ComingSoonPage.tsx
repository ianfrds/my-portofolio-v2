import React from 'react';
import { motion } from 'framer-motion';
import { ArrowUpRight, ArrowLeft } from 'lucide-react';
import { InteractiveDotAsciiBackground } from './InteractiveDotAsciiBackground';
import { SiteHeader, type PageType } from './SiteHeader';

interface ComingSoonPageProps {
  pageType: 'work' | 'about';
  onNavigate: (page: PageType) => void;
}

export const ComingSoonPage: React.FC<ComingSoonPageProps> = ({ pageType, onNavigate }) => {
  const isWork = pageType === 'work';
  const title = isWork ? 'Work' : 'About';
  const subtitle = isWork ? 'Selected Works & Case Studies' : 'Biography & Design Journey';
  const description = isWork
    ? 'Comprehensive case studies, interactive prototypes, and scalable design token systems are currently being curated for the 2026 showcase.'
    : 'An in-depth look into creative philosophies, craft methodologies, and six years of product design evolution is currently in production.';

  return (
    <div className="relative w-full min-h-screen bg-[#0C0C0C] text-[#EDEDEB] p-3 sm:p-5 md:p-6 flex flex-col justify-center select-none">
      {/* Main Framed Card with Interactive Dot Background */}
      <div className="relative w-full min-h-[92vh] sm:min-h-[95vh] rounded-[28px] sm:rounded-[38px] md:rounded-[48px] overflow-hidden bg-[#0A0A0C] text-white flex flex-col justify-between shadow-2xl border border-white/10">
        <InteractiveDotAsciiBackground />

        {/* Top Navbar: 100% consistent with Home and Work */}
        <SiteHeader currentPage={pageType} onNavigate={onNavigate} className="relative z-20" />

        {/* Central Content */}
        <div className="relative z-20 flex flex-col items-center justify-center text-center px-4 sm:px-8 my-auto max-w-2xl mx-auto py-12 sm:py-16">
          <motion.div
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-white/10 backdrop-blur-md border border-white/15 text-white/80 text-xs sm:text-sm font-mono uppercase tracking-wider mb-6"
          >
            <span className="w-2 h-2 rounded-full bg-amber-400 animate-pulse" />
            <span>// {subtitle}</span>
          </motion.div>

          <motion.h1
            initial={{ opacity: 0, scale: 0.94 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.65, ease: [0.22, 1, 0.36, 1], delay: 0.1 }}
            className="font-display font-black text-white uppercase tracking-tight text-center leading-none mb-4 select-none"
            style={{ fontSize: 'clamp(2.8rem, 9vw, 92px)' }}
          >
            {title}
          </motion.h1>

          <motion.div
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.2 }}
            className="inline-block px-3 py-1 rounded bg-white/15 text-white font-mono text-xs uppercase tracking-widest font-semibold mb-6"
          >
            COMING SOON
          </motion.div>

          <motion.p
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.3 }}
            className="text-white/70 text-sm sm:text-base md:text-lg max-w-lg mx-auto leading-relaxed mb-8 font-medium"
          >
            {description}
          </motion.p>

          <motion.div
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.4 }}
            className="flex flex-wrap items-center justify-center gap-4"
          >
            <button
              onClick={() => onNavigate('home')}
              className="flex items-center gap-2 px-6 sm:px-7 py-3 rounded-full bg-white text-[#0F172A] text-xs sm:text-sm font-bold hover:bg-white/90 transition-all shadow-lg hover:scale-105 active:scale-95 cursor-pointer"
            >
              <ArrowLeft className="w-4 h-4" />
              <span>Back to Home</span>
            </button>
            <a
              href="mailto:ianfirdaus.design@gmail.com"
              className="flex items-center gap-2 px-6 sm:px-7 py-3 rounded-full bg-white/10 hover:bg-white/15 border border-white/20 text-white text-xs sm:text-sm font-semibold transition-all hover:scale-105 active:scale-95 cursor-pointer"
            >
              <span>Notify Me</span>
              <ArrowUpRight className="w-4 h-4" />
            </a>
          </motion.div>
        </div>

        {/* Bottom bar */}
        <div className="relative w-full z-20 px-6 sm:px-10 md:px-14 pb-6 sm:pt-4 sm:pb-8 flex flex-col sm:flex-row items-center justify-between gap-3 text-xs text-white/50 font-semibold font-mono">
          <span>Ian Firdaus • Independent UI/UX</span>
          <span>Status: Preparing Launch</span>
        </div>
      </div>
    </div>
  );
};
