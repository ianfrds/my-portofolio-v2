import React, { useEffect, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { FadeIn } from '../components/FadeIn';
import { ArrowUpRight } from 'lucide-react';
import { InteractiveDotAsciiBackground } from '../components/InteractiveDotAsciiBackground';
import { RandomFloatingImages } from '../components/RandomFloatingImages';
import { type PageType } from '../components/SiteHeader';

export interface HeroSectionProps {
  onNavigate?: (page: PageType) => void;
}

export const HeroSection: React.FC<HeroSectionProps> = ({ onNavigate }) => {
  const [loopKey, setLoopKey] = useState(0);

  // Loop character entrance animation every 5 seconds
  useEffect(() => {
    const timer = setInterval(() => {
      setLoopKey((prev) => prev + 1);
    }, 5000);
    return () => clearInterval(timer);
  }, []);

  return (
    <section
      id="hero"
      className="relative w-full h-[100dvh] sm:h-auto sm:min-h-screen bg-[#0C0C0C] p-0 sm:p-5 md:p-6 flex flex-col justify-center select-none overflow-hidden"
    >
      {/* Framed Hero Card (100% full height & edge-to-edge on mobile, elegant framed card on desktop) */}
      <div className="relative w-full h-full sm:min-h-[95vh] rounded-none sm:rounded-[38px] md:rounded-[48px] overflow-hidden bg-[#0A0A0C] text-white flex flex-col justify-between shadow-none sm:shadow-2xl border-0 sm:border border-white/10">

        {/* Interactive Dot Grid + ASCII Effect with Disperse on Hover */}
        <InteractiveDotAsciiBackground />

        {/* Floating Portfolio Images with Looping Random Entrance/Exit */}
        <RandomFloatingImages />

        {/* Top Navbar Spacer: Exactly mirrors SiteHeader layout spacing inside the framed hero card */}
        <div className="w-full px-5 sm:px-10 md:px-14 pt-6 sm:pt-8 flex justify-between items-center opacity-0 pointer-events-none select-none shrink-0" aria-hidden="true">
          <div className="h-10 sm:h-11" />
        </div>

        {/* Central Hero Content - Short, Punchy, High-Contrast & Centered */}
        <div className="relative z-20 flex flex-col items-center justify-center text-center px-4 sm:px-8 my-auto max-w-2xl mx-auto py-6 sm:py-14">
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
            <button
              type="button"
              onClick={() => onNavigate?.('work')}
              className="flex items-center gap-2 px-8 sm:px-9 py-3.5 sm:py-4 rounded-full bg-white text-[#0F172A] text-sm sm:text-base font-bold hover:bg-white/90 transition-all shadow-xl hover:shadow-2xl hover:scale-105 duration-200 group cursor-pointer"
            >
              <span>Explore Work</span>
              <ArrowUpRight className="w-4 h-4 sm:w-5 sm:h-5 transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
            </button>
          </FadeIn>
        </div>

        {/* Bottom Bar: Clean Minimal Info */}
        <div className="relative w-full z-20 px-4 sm:px-10 md:px-14 pb-5 sm:pt-4 sm:pb-8 flex flex-col sm:flex-row items-center justify-between gap-2.5 sm:gap-3 text-xs text-white/70 font-semibold">
          <FadeIn delay={0.5} y={10}>
            <div className="flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-black/40 backdrop-blur-md border border-white/15 text-white/90">
              <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
              <span>Available for Projects &amp; Collaborations</span>
            </div>
          </FadeIn>

          <FadeIn delay={0.55} y={10}>
            <div className="flex items-center gap-1 font-mono text-white/75 px-3.5 py-1.5 rounded-full bg-black/40 backdrop-blur-md border border-white/15">
              <span>Surabaya, Indonesia • Remote Worldwide</span>
            </div>
          </FadeIn>
        </div>
      </div>
    </section>
  );
};
