import React, { useEffect, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { FadeIn } from '../components/FadeIn';
import { ArrowUpRight, Menu, X } from 'lucide-react';
import { InteractiveDotAsciiBackground } from '../components/InteractiveDotAsciiBackground';
import { RandomFloatingImages } from '../components/RandomFloatingImages';

const NAV_LINKS = [
  { label: 'About', href: '#about', id: '01' },
  { label: 'Services', href: '#services', id: '02' },
  { label: 'Case Studies', href: '#projects', id: '03' },
  { label: 'Contact', href: '#contact', id: '04' },
];

/* ── Interactive Nav Link: Staggered Bottom-to-Top Character Roll + Underline ── */
const NavHoverLink: React.FC<{
  href: string;
  label: string;
  className?: string;
  onClick?: () => void;
}> = ({ href, label, className = '', onClick }) => {
  const [isHovered, setIsHovered] = useState(false);
  const characters = label.split('');

  return (
    <a
      href={href}
      onClick={onClick}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      className={`relative inline-flex flex-col py-1 text-white/75 hover:text-white transition-colors cursor-pointer group select-none ${className}`}
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

      {/* Animated underline expanding on hover */}
      <motion.span
        className="absolute bottom-0 left-0 w-full h-[1.5px] bg-white origin-left"
        initial={{ scaleX: 0 }}
        animate={{ scaleX: isHovered ? 1 : 0 }}
        transition={{ duration: 0.28, ease: [0.22, 1, 0.36, 1] }}
      />
    </a>
  );
};

export const HeroSection: React.FC = () => {
  const [loopKey, setLoopKey] = useState(0);
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  // Loop character entrance animation every 5 seconds
  useEffect(() => {
    const timer = setInterval(() => {
      setLoopKey((prev) => prev + 1);
    }, 5000);
    return () => clearInterval(timer);
  }, []);

  // Close menu on Escape key press
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        setIsMenuOpen(false);
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, []);

  return (
    <section
      id="hero"
      className="relative w-full min-h-screen bg-[#0C0C0C] p-3 sm:p-5 md:p-6 flex flex-col justify-center select-none"
    >
      {/* ── Mobile Off-Canvas Drawer (Slides from Left) ── */}
      <AnimatePresence>
        {isMenuOpen && (
          <>
            {/* Backdrop */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.25 }}
              onClick={() => setIsMenuOpen(false)}
              className="fixed inset-0 z-50 bg-black/60 backdrop-blur-sm md:hidden"
            />

            {/* Off-canvas Panel sliding from Left */}
            <motion.div
              initial={{ x: '-100%' }}
              animate={{ x: '0%' }}
              exit={{ x: '-100%' }}
              transition={{ duration: 0.38, ease: [0.22, 1, 0.36, 1] }}
              className="fixed inset-y-0 left-0 z-50 w-[85vw] max-w-[340px] bg-[#0C0C0C] text-[#EDEDEB] p-6 sm:p-8 flex flex-col justify-between shadow-2xl border-r border-white/10 md:hidden overflow-y-auto"
            >
              {/* Header inside canvas */}
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
                  className="w-8 h-8 rounded-full bg-white/10 flex items-center justify-center text-white/70 hover:text-white hover:bg-white/20 transition-all active:scale-95"
                >
                  <X className="w-4 h-4" />
                </button>
              </div>

              {/* Navigation Links with Staggered Entrance */}
              <div className="py-8 flex flex-col gap-4">
                {NAV_LINKS.map((link, idx) => (
                  <motion.div
                    key={link.href}
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: 0.08 + idx * 0.05, duration: 0.3 }}
                    className="flex items-center justify-between py-2 px-3 -mx-3 rounded-xl hover:bg-white/5 transition-all group"
                  >
                    <div className="flex items-center gap-3">
                      <span className="font-mono text-xs text-white/35 font-normal">
                        {link.id}
                      </span>
                      <NavHoverLink
                        href={link.href}
                        label={link.label}
                        onClick={() => setIsMenuOpen(false)}
                        className="text-xl font-display font-bold text-white/90 hover:text-white"
                      />
                    </div>
                    <a
                      href={link.href}
                      onClick={() => setIsMenuOpen(false)}
                      aria-label={link.label}
                      className="text-white/30 group-hover:text-white group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-all"
                    >
                      <ArrowUpRight className="w-4 h-4" />
                    </a>
                  </motion.div>
                ))}
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
          </>
        )}
      </AnimatePresence>

      {/* Framed Hero Card with Interactive Dot ASCII + Floating Showcase Background */}
      <div className="relative w-full min-h-[92vh] sm:min-h-[95vh] rounded-[28px] sm:rounded-[38px] md:rounded-[48px] overflow-hidden bg-[#0A0A0C] text-white flex flex-col justify-between shadow-2xl border border-white/10">

        {/* Interactive Dot Grid + ASCII Effect with Disperse on Hover */}
        <InteractiveDotAsciiBackground />

        {/* Floating Portfolio Images with Looping Random Entrance/Exit */}
        <RandomFloatingImages />

        {/* Top Navbar: Menu on the far left, Get in Touch on the far right */}
        <FadeIn delay={0} y={-15} className="w-full z-20">
          <header className="w-full px-5 sm:px-10 md:px-14 pt-6 sm:pt-8 flex justify-between items-center">
            {/* Desktop Nav Links on the Left */}
            <nav className="hidden md:flex items-center gap-6 lg:gap-9 text-xs sm:text-sm font-semibold">
              {NAV_LINKS.map((link) => (
                <NavHoverLink
                  key={link.href}
                  href={link.href}
                  label={link.label}
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
              href="#contact"
              className="flex items-center gap-2 px-4 sm:px-6 py-2.5 sm:py-3 rounded-full bg-white text-[#0F172A] text-xs sm:text-sm font-bold hover:bg-white/90 transition-all shadow-md group cursor-pointer shrink-0"
            >
              <span>Get in Touch</span>
              <ArrowUpRight className="w-3.5 h-3.5 sm:w-4 sm:h-4 transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
            </a>
          </header>
        </FadeIn>

        {/* Central Hero Content - Short, Punchy, High-Contrast & Centered */}
        <div className="relative z-20 flex flex-col items-center justify-center text-center px-4 sm:px-8 my-auto max-w-2xl mx-auto py-10 sm:py-14">
          {/* Compact Pill Badge */}
          <FadeIn delay={0.1} y={15}>
            <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-white/15 backdrop-blur-md border border-white/20 text-white text-xs sm:text-sm font-semibold mb-4 sm:mb-6 shadow-sm">
              <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse" />
              <span>UI/UX &amp; Graphic Designer</span>
            </div>
          </FadeIn>

          {/* Animated Headline: IAN FIRDAUS looping every 5 seconds */}
          <div className="mb-3 sm:mb-4">
            <h1
              className="font-display font-black text-white uppercase tracking-tight text-center max-w-3xl mx-auto select-none"
              style={{ fontSize: 'clamp(2.35rem, 7.5vw, 82px)', lineHeight: 1.05 }}
            >
              <AnimatePresence mode="wait">
                <motion.span
                  key={loopKey}
                  className="inline-flex flex-wrap items-center justify-center gap-x-3 sm:gap-x-5"
                >
                  {/* IAN */}
                  <span className="inline-flex">
                    {['I', 'A', 'N'].map((char, i) => (
                      <span key={`ian-${i}`} className="inline-block overflow-hidden py-1">
                        <motion.span
                          className="inline-block"
                          initial={{ y: '115%', opacity: 0, rotateZ: 4 }}
                          animate={{ y: '0%', opacity: 1, rotateZ: 0 }}
                          exit={{ y: '-115%', opacity: 0, rotateZ: -4 }}
                          transition={{
                            duration: 0.65,
                            ease: [0.22, 1, 0.36, 1],
                            delay: i * 0.05,
                          }}
                        >
                          {char}
                        </motion.span>
                      </span>
                    ))}
                  </span>

                  {/* FIRDAUS */}
                  <span className="inline-flex">
                    {['F', 'I', 'R', 'D', 'A', 'U', 'S'].map((char, i) => (
                      <span key={`firdaus-${i}`} className="inline-block overflow-hidden py-1">
                        <motion.span
                          className="inline-block"
                          initial={{ y: '115%', opacity: 0, rotateZ: 4 }}
                          animate={{ y: '0%', opacity: 1, rotateZ: 0 }}
                          exit={{ y: '-115%', opacity: 0, rotateZ: -4 }}
                          transition={{
                            duration: 0.65,
                            ease: [0.22, 1, 0.36, 1],
                            delay: 0.16 + i * 0.05,
                          }}
                        >
                          {char}
                        </motion.span>
                      </span>
                    ))}
                  </span>
                </motion.span>
              </AnimatePresence>
            </h1>
          </div>

          {/* Concise Single-Line Subtitle */}
          <FadeIn delay={0.3} y={20}>
            <p className="text-white/80 text-sm sm:text-base md:text-lg max-w-md mx-auto leading-relaxed mb-6 sm:mb-8 font-medium">
              High-impact UI/UX design and visual identities for modern digital products.
            </p>
          </FadeIn>

          {/* Centered CTA Pill Button */}
          <FadeIn delay={0.4} y={20}>
            <a
              href="#projects"
              className="flex items-center gap-2 px-8 sm:px-9 py-3.5 sm:py-4 rounded-full bg-white text-[#0F172A] text-sm sm:text-base font-bold hover:bg-white/90 transition-all shadow-xl hover:shadow-2xl hover:scale-105 duration-200 group cursor-pointer"
            >
              <span>Explore Work</span>
              <ArrowUpRight className="w-4 h-4 sm:w-5 sm:h-5 transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
            </a>
          </FadeIn>
        </div>

        {/* Bottom Bar: Clean Minimal Info */}
        <div className="relative w-full z-20 px-6 sm:px-10 md:px-14 pb-6 sm:pt-4 sm:pb-8 flex flex-col sm:flex-row items-center justify-between gap-3 text-xs text-white/70 font-semibold">
          <FadeIn delay={0.5} y={10}>
            <div className="flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-black/40 backdrop-blur-md border border-white/15 text-white/90">
              <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
              <span>Available for Projects &amp; Collaborations</span>
            </div>
          </FadeIn>

          <FadeIn delay={0.55} y={10}>
            <div className="flex items-center gap-1 font-mono text-white/75 px-3.5 py-1.5 rounded-full bg-black/40 backdrop-blur-md border border-white/15">
              <span>Indonesia • Remote Worldwide</span>
            </div>
          </FadeIn>
        </div>
      </div>
    </section>
  );
};
