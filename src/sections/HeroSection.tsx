import React, { useRef, useEffect, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { FadeIn } from '../components/FadeIn';
import { ArrowUpRight, Menu, X } from 'lucide-react';

const NAV_LINKS = [
  { label: 'About', href: '#about', id: '01' },
  { label: 'Services', href: '#services', id: '02' },
  { label: 'Case Studies', href: '#projects', id: '03' },
  { label: 'Contact', href: '#contact', id: '04' },
];

export const HeroSection: React.FC = () => {
  const videoRef = useRef<HTMLVideoElement>(null);
  const [loopKey, setLoopKey] = useState(0);
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  useEffect(() => {
    if (videoRef.current) {
      videoRef.current.play().catch(() => {
        // Autoplay policy fallback
      });
    }
  }, []);

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
                  <motion.a
                    key={link.href}
                    href={link.href}
                    onClick={() => setIsMenuOpen(false)}
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: 0.08 + idx * 0.05, duration: 0.3 }}
                    className="flex items-center justify-between py-2.5 px-3 -mx-3 rounded-xl hover:bg-white/5 text-xl font-display font-bold text-white/80 hover:text-white transition-all group"
                  >
                    <div className="flex items-center gap-3">
                      <span className="font-mono text-xs text-white/35 font-normal">
                        {link.id}
                      </span>
                      <span>{link.label}</span>
                    </div>
                    <ArrowUpRight className="w-4 h-4 text-white/30 group-hover:text-white group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-all" />
                  </motion.a>
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

      {/* Framed Hero Card with Motion Video Background */}
      <div className="relative w-full min-h-[92vh] sm:min-h-[95vh] rounded-[28px] sm:rounded-[38px] md:rounded-[48px] overflow-hidden bg-[#E6E7E6] text-[#0F172A] flex flex-col justify-between shadow-2xl border border-white/30">

        {/* Full-bleed Video Background with Enhanced Contrast Layer */}
        <div className="absolute inset-0 pointer-events-none select-none z-0 overflow-hidden">
          <video
            ref={videoRef}
            autoPlay
            loop
            muted
            playsInline
            preload="auto"
            className="w-full h-full object-cover object-center scale-100"
          >
            <source src="/animasikan_ini.mp4" type="video/mp4" />
          </video>
          {/* Enhanced readability wash: ensures text is 100% readable regardless of video frame */}
          <div className="absolute inset-0 bg-[#E6E7E6]/65 backdrop-blur-[1.5px]" />
          <div className="absolute inset-0 bg-radial from-white/40 via-transparent to-transparent pointer-events-none" />
        </div>

        {/* Top Navbar: Menu on the far left, Get in Touch on the far right */}
        <FadeIn delay={0} y={-15} className="w-full z-20">
          <header className="w-full px-5 sm:px-10 md:px-14 pt-6 sm:pt-8 flex justify-between items-center">
            {/* Desktop Nav Links on the Left */}
            <nav className="hidden md:flex items-center gap-6 lg:gap-9 text-xs sm:text-sm font-semibold text-[#334155]">
              {NAV_LINKS.map((link) => (
                <a
                  key={link.href}
                  href={link.href}
                  className="hover:text-[#0F172A] transition-colors"
                >
                  {link.label}
                </a>
              ))}
            </nav>

            {/* Mobile Hamburger Button on the Left */}
            <button
              onClick={() => setIsMenuOpen(true)}
              aria-label="Open Navigation Menu"
              className="md:hidden flex items-center gap-2 px-3.5 py-2 rounded-full bg-white/80 backdrop-blur-md border border-black/10 text-[#0F172A] text-xs font-semibold shadow-xs hover:bg-white transition-all active:scale-95 cursor-pointer"
            >
              <Menu className="w-4 h-4" />
              <span>Menu</span>
            </button>

            {/* Right Action Button */}
            <a
              href="#contact"
              className="flex items-center gap-2 px-4 sm:px-6 py-2.5 sm:py-3 rounded-full bg-[#0F172A] text-white text-xs sm:text-sm font-semibold hover:bg-black transition-all shadow-md group cursor-pointer shrink-0"
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
            <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-white/80 backdrop-blur-md border border-black/10 text-[#1E3A2F] text-xs sm:text-sm font-semibold mb-4 sm:mb-6 shadow-sm">
              <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse" />
              <span>UI/UX &amp; Graphic Designer</span>
            </div>
          </FadeIn>

          {/* Animated Headline: IAN FRDS looping every 5 seconds */}
          <div className="mb-3 sm:mb-4">
            <h1
              className="font-display font-black text-[#0F172A] uppercase tracking-tight text-center max-w-2xl mx-auto select-none"
              style={{ fontSize: 'clamp(2.75rem, 8.5vw, 84px)', lineHeight: 1.05 }}
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
                            delay: i * 0.06,
                          }}
                        >
                          {char}
                        </motion.span>
                      </span>
                    ))}
                  </span>

                  {/* FRDS */}
                  <span className="inline-flex">
                    {['F', 'R', 'D', 'S'].map((char, i) => (
                      <span key={`frds-${i}`} className="inline-block overflow-hidden py-1">
                        <motion.span
                          className="inline-block"
                          initial={{ y: '115%', opacity: 0, rotateZ: 4 }}
                          animate={{ y: '0%', opacity: 1, rotateZ: 0 }}
                          exit={{ y: '-115%', opacity: 0, rotateZ: -4 }}
                          transition={{
                            duration: 0.65,
                            ease: [0.22, 1, 0.36, 1],
                            delay: 0.2 + i * 0.06,
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
            <p className="text-[#334155] text-sm sm:text-base md:text-lg max-w-md mx-auto leading-relaxed mb-6 sm:mb-8 font-medium">
              High-impact UI/UX design and visual identities for modern digital products.
            </p>
          </FadeIn>

          {/* Centered CTA Pill Button */}
          <FadeIn delay={0.4} y={20}>
            <a
              href="#projects"
              className="flex items-center gap-2 px-8 sm:px-9 py-3.5 sm:py-4 rounded-full bg-[#0F172A] text-white text-sm sm:text-base font-semibold hover:bg-black transition-all shadow-xl hover:shadow-2xl hover:scale-105 duration-200 group cursor-pointer"
            >
              <span>Explore Work</span>
              <ArrowUpRight className="w-4 h-4 sm:w-5 sm:h-5 transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
            </a>
          </FadeIn>
        </div>

        {/* Bottom Bar: Clean Minimal Info */}
        <div className="relative w-full z-20 px-6 sm:px-10 md:px-14 pb-6 sm:pt-4 sm:pb-8 flex flex-col sm:flex-row items-center justify-between gap-3 text-xs text-[#334155] font-semibold">
          <FadeIn delay={0.5} y={10}>
            <div className="flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-white/70 backdrop-blur-sm border border-black/5">
              <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />
              <span>Available for Projects &amp; Collaborations</span>
            </div>
          </FadeIn>

          <FadeIn delay={0.55} y={10}>
            <div className="flex items-center gap-1 font-mono text-[#475569] px-3.5 py-1.5 rounded-full bg-white/70 backdrop-blur-sm border border-black/5">
              <span>Indonesia • Remote Worldwide</span>
            </div>
          </FadeIn>
        </div>
      </div>
    </section>
  );
};
