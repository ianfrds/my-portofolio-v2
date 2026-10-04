import React, { useState, useEffect } from 'react';
import { createPortal } from 'react-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { ArrowUpRight, Menu, X } from 'lucide-react';

export type PageType = 'home' | 'work' | 'about';

interface SiteHeaderProps {
  currentPage: PageType;
  onNavigate: (page: PageType) => void;
  className?: string;
  sticky?: boolean;
}

interface NavLinkItem {
  label: string;
  page: PageType;
  id: string;
}

const NAV_LINKS: NavLinkItem[] = [
  { label: 'Home', page: 'home', id: '01' },
  { label: 'Work', page: 'work', id: '02' },
  { label: 'About', page: 'about', id: '03' },
];

/* ── Interactive Nav Link: Staggered Bottom-to-Top Character Roll + Underline ── */
export const NavHoverLink: React.FC<{
  label: string;
  isActive?: boolean;
  className?: string;
  onClick?: () => void;
}> = ({ label, isActive = false, className = '', onClick }) => {
  const [isHovered, setIsHovered] = useState(false);
  const characters = label.split('');

  return (
    <button
      type="button"
      onClick={onClick}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      className={`relative inline-flex flex-col py-1 transition-colors cursor-pointer group select-none text-left ${isActive ? 'text-white font-bold' : 'text-white/70 hover:text-white'
        } ${className}`}
    >
      <span className="relative overflow-hidden inline-flex items-center leading-none">
        {/* Primary characters moving up */}
        <span className="inline-flex" aria-hidden={isHovered}>
          {characters.map((char, i) => (
            <motion.span
              key={`c1-${i}`}
              animate={{ y: isHovered ? '-120%' : '0%' }}
              transition={{
                duration: 0.32,
                ease: [0.22, 1, 0.36, 1],
                delay: i * 0.022,
              }}
              className="inline-block"
            >
              {char === ' ' ? '\u00A0' : char}
            </motion.span>
          ))}
        </span>

        {/* Duplicate characters rolling in from bottom */}
        <span className="absolute inset-0 inline-flex pointer-events-none" aria-hidden="true">
          {characters.map((char, i) => (
            <motion.span
              key={`c2-${i}`}
              initial={{ y: '120%' }}
              animate={{ y: isHovered ? '0%' : '120%' }}
              transition={{
                duration: 0.32,
                ease: [0.22, 1, 0.36, 1],
                delay: i * 0.022,
              }}
              className="inline-block text-white"
            >
              {char === ' ' ? '\u00A0' : char}
            </motion.span>
          ))}
        </span>
      </span>

      {/* Animated underline expanding on hover OR when active */}
      <motion.span
        className="absolute bottom-0 left-0 w-full h-[1.5px] bg-white origin-left"
        initial={{ scaleX: isActive ? 1 : 0 }}
        animate={{ scaleX: isActive || isHovered ? 1 : 0 }}
        transition={{ duration: 0.28, ease: [0.22, 1, 0.36, 1] }}
      />
    </button>
  );
};

export const SiteHeader: React.FC<SiteHeaderProps> = ({
  currentPage,
  onNavigate,
  className = '',
  sticky = false,
}) => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [mounted, setMounted] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  // Listen to window and Lenis scroll when sticky is enabled
  useEffect(() => {
    if (!sticky) return;

    const checkScroll = () => {
      const y = window.scrollY || document.documentElement.scrollTop;
      setIsScrolled(y > 20);
    };

    checkScroll();
    window.addEventListener('scroll', checkScroll, { passive: true });

    const lenis = (window as any).__lenis;
    if (lenis) {
      lenis.on('scroll', checkScroll);
    }

    return () => {
      window.removeEventListener('scroll', checkScroll);
      if (lenis) {
        lenis.off('scroll', checkScroll);
      }
    };
  }, [sticky]);

  // Lock background scroll when mobile off-canvas drawer is open
  useEffect(() => {
    if (isMenuOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = '';
    }
    return () => {
      document.body.style.overflow = '';
    };
  }, [isMenuOpen]);

  return (
    <>
      {/* ── Mobile Off-Canvas Drawer (Rendered at Root document.body via Portal to prevent any clipping/stacking bugs) ── */}
      {mounted &&
        createPortal(
          <AnimatePresence>
            {isMenuOpen && (
              <div className="fixed inset-0 z-[9999] md:hidden">
                {/* Backdrop Blur Overlay */}
                <motion.div
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                  transition={{ duration: 0.25 }}
                  onClick={() => setIsMenuOpen(false)}
                  className="absolute inset-0 bg-black/75 backdrop-blur-md"
                />

                {/* Off-Canvas Drawer Panel */}
                <motion.div
                  initial={{ x: '-100%' }}
                  animate={{ x: '0%' }}
                  exit={{ x: '-100%' }}
                  transition={{ duration: 0.35, ease: [0.16, 1, 0.3, 1] }}
                  className="absolute inset-y-0 left-0 w-[85vw] max-w-[340px] bg-[#0A0A0C] text-[#EDEDEB] p-6 sm:p-8 flex flex-col justify-between shadow-[0_0_50px_rgba(0,0,0,0.9)] border-r border-white/10 overflow-y-auto"
                >
                  {/* Drawer Top */}
                  <div className="flex items-center justify-between pb-6 border-b border-white/10">
                    <div className="flex items-center gap-2">
                      <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
                      <span className="font-mono text-xs uppercase tracking-wider text-white/50 font-semibold">
                        // MENU
                      </span>
                    </div>
                    <button
                      onClick={() => setIsMenuOpen(false)}
                      aria-label="Close Navigation Menu"
                      className="w-9 h-9 rounded-full bg-white/10 flex items-center justify-center text-white/70 hover:text-white hover:bg-white/20 transition-all active:scale-95 cursor-pointer"
                    >
                      <X className="w-4 h-4" />
                    </button>
                  </div>

                  {/* Navigation Links with Staggered Entrance */}
                  <div className="py-8 flex flex-col gap-4">
                    {NAV_LINKS.map((link, idx) => {
                      const isActive = currentPage === link.page;
                      return (
                        <motion.div
                          key={link.page}
                          initial={{ opacity: 0, x: -20 }}
                          animate={{ opacity: 1, x: 0 }}
                          transition={{ delay: 0.08 + idx * 0.05, duration: 0.3 }}
                          className={`flex items-center justify-between py-2 px-3 -mx-3 rounded-xl transition-all group ${isActive ? 'bg-white/10' : 'hover:bg-white/5'
                            }`}
                        >
                          <div className="flex items-center gap-3">
                            <span className="font-mono text-xs text-white/35 font-normal">
                              {link.id}
                            </span>
                            <NavHoverLink
                              label={link.label}
                              isActive={isActive}
                              onClick={() => {
                                setIsMenuOpen(false);
                                onNavigate(link.page);
                              }}
                              className="text-xl font-display font-bold text-white/90 hover:text-white"
                            />
                          </div>
                          <button
                            type="button"
                            onClick={() => {
                              setIsMenuOpen(false);
                              onNavigate(link.page);
                            }}
                            aria-label={link.label}
                            className="text-white/30 group-hover:text-white group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-all cursor-pointer"
                          >
                            <ArrowUpRight className="w-4 h-4" />
                          </button>
                        </motion.div>
                      );
                    })}
                  </div>

                  {/* Drawer Footer Info */}
                  <div className="pt-6 border-t border-white/10 flex flex-col gap-4">
                    <a
                      href="mailto:ianfirdaus.design@gmail.com"
                      className="text-xs text-white/50 hover:text-white transition-colors font-mono truncate"
                    >
                      ianfirdaus.design@gmail.com
                    </a>
                    <div className="flex items-center justify-between text-xs text-white/40">
                      <span>Indonesia</span>
                      <span>GMT+7</span>
                    </div>
                  </div>
                </motion.div>
              </div>
            )}
          </AnimatePresence>,
          document.body
        )}

      {/* ── Top Header Bar (Unified exact placement & transitions to Full-Width Sticky Header on Scroll) ── */}
      {sticky ? (
        <header
          className={`fixed top-0 left-0 right-0 z-50 transition-[padding] duration-300 ease-[0.16,1,0.3,1] ${isScrolled
              ? 'py-3 sm:py-3.5 px-5 sm:px-10 md:px-14'
              : 'pt-6 sm:pt-[52px] md:pt-[56px] pb-0 px-5 sm:px-[60px] md:px-[80px]'
            } ${className}`}
        >
          {/* Smooth Frosted Glass Backdrop Layer (Clean fade without any white bottom border) */}
          <div
            className={`absolute inset-0 -z-10 bg-[#0A0A0C]/90 backdrop-blur-2xl shadow-[0_12px_36px_rgba(0,0,0,0.7)] transition-opacity duration-300 ease-out pointer-events-none ${isScrolled ? 'opacity-100' : 'opacity-0'
              }`}
          />

          <div className="w-full flex justify-between items-center pointer-events-auto">
            {/* Desktop Nav Links on the Left */}
            <nav className="hidden md:flex items-center gap-6 lg:gap-9 text-xs sm:text-sm font-semibold">
              {NAV_LINKS.map((link) => (
                <NavHoverLink
                  key={link.page}
                  label={link.label}
                  isActive={currentPage === link.page}
                  onClick={() => onNavigate(link.page)}
                />
              ))}
            </nav>

            {/* Mobile Hamburger Button on the Left */}
            <button
              onClick={() => setIsMenuOpen(true)}
              aria-label="Open Navigation Menu"
              className="md:hidden flex items-center gap-2 px-3.5 py-2 rounded-full bg-white/15 backdrop-blur-md border border-white/20 text-white text-xs font-semibold shadow-xs hover:bg-white/25 transition-all active:scale-95 cursor-pointer"
            >
              <Menu className="w-4 h-4" />
              <span>Menu</span>
            </button>

            {/* Right Action Button */}
            <a
              href={currentPage === 'home' ? '#contact' : 'mailto:ianfirdaus.design@gmail.com'}
              className="flex items-center gap-2 px-4 sm:px-6 py-2.5 sm:py-3 rounded-full bg-white text-[#0F172A] text-xs sm:text-sm font-bold hover:bg-white/90 transition-all shadow-md group cursor-pointer shrink-0 hover:scale-105 active:scale-95"
            >
              <span>Get in Touch</span>
              <ArrowUpRight className="w-3.5 h-3.5 sm:w-4 sm:h-4 transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
            </a>
          </div>
        </header>
      ) : (
        <header className={`w-full px-5 sm:px-10 md:px-14 pt-6 sm:pt-8 flex justify-between items-center ${className}`}>
          {/* Desktop Nav Links on the Left */}
          <nav className="hidden md:flex items-center gap-6 lg:gap-9 text-xs sm:text-sm font-semibold">
            {NAV_LINKS.map((link) => (
              <NavHoverLink
                key={link.page}
                label={link.label}
                isActive={currentPage === link.page}
                onClick={() => onNavigate(link.page)}
              />
            ))}
          </nav>

          {/* Mobile Hamburger Button on the Left */}
          <button
            onClick={() => setIsMenuOpen(true)}
            aria-label="Open Navigation Menu"
            className="md:hidden flex items-center gap-2 px-3.5 py-2 rounded-full bg-white/15 backdrop-blur-md border border-white/20 text-white text-xs font-semibold shadow-xs hover:bg-white/25 transition-all active:scale-95 cursor-pointer"
          >
            <Menu className="w-4 h-4" />
            <span>Menu</span>
          </button>

          {/* Right Action Button */}
          <a
            href={currentPage === 'home' ? '#contact' : 'mailto:ianfirdaus.design@gmail.com'}
            className="flex items-center gap-2 px-4 sm:px-6 py-2.5 sm:py-3 rounded-full bg-white text-[#0F172A] text-xs sm:text-sm font-bold hover:bg-white/90 transition-all shadow-md group cursor-pointer shrink-0 hover:scale-105 active:scale-95"
          >
            <span>Get in Touch</span>
            <ArrowUpRight className="w-3.5 h-3.5 sm:w-4 sm:h-4 transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
          </a>
        </header>
      )}
    </>
  );
};
