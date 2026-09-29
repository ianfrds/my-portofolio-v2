import React, { useState, useEffect, useCallback } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

interface IntroLoaderProps {
  onComplete: () => void;
}

const REEL_IMAGES = [
  'https://i.pinimg.com/736x/b7/0f/5b/b70f5bf06ec9829c79682b1d1f9e4e49.jpg',
  'https://i.pinimg.com/736x/ec/5f/b6/ec5fb6c6088e6d4545ffb1af03987bc0.jpg',
  'https://i.pinimg.com/736x/f6/55/cc/f655cc518fb05ce8a76c37d91638d8fe.jpg',
  'https://i.pinimg.com/736x/35/6c/f8/356cf86473be723e9fffeb672fd7681a.jpg',
  'https://i.pinimg.com/736x/61/b8/50/61b850013d6cb178683ecb82c4b4c864.jpg',
  'https://i.pinimg.com/736x/a4/4f/99/a44f993ee4f65d7d29c98253d8361ecb.jpg',
];

export const IntroLoader: React.FC<IntroLoaderProps> = ({ onComplete }) => {
  const [currentImgIndex, setCurrentImgIndex] = useState(0);
  const [isExiting, setIsExiting] = useState(false);

  // Preload reel images
  useEffect(() => {
    REEL_IMAGES.forEach((src) => {
      const img = new Image();
      img.src = src;
    });
  }, []);

  const handleFinish = useCallback(() => {
    setIsExiting(true);
  }, []);

  // Rapid image shuffle reel (like pamidordesign.co)
  useEffect(() => {
    // Start rapid switching after the square card appears (~400ms)
    const startDelay = setTimeout(() => {
      const interval = setInterval(() => {
        setCurrentImgIndex((prev) => (prev + 1) % REEL_IMAGES.length);
      }, 160);

      // Auto trigger exit after ~2.4 seconds
      const finishTimer = setTimeout(() => {
        clearInterval(interval);
        handleFinish();
      }, 2300);

      return () => {
        clearInterval(interval);
        clearTimeout(finishTimer);
      };
    }, 450);

    return () => clearTimeout(startDelay);
  }, [handleFinish]);

  // Support ESC or click anywhere to skip
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape' || e.key === ' ') {
        handleFinish();
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [handleFinish]);

  const leftChars = ['I', 'A', 'N'];
  const rightChars = ['F', 'R', 'D', 'S'];

  return (
    <AnimatePresence onExitComplete={onComplete}>
      {!isExiting && (
        <motion.div
          key="intro-curtain"
          initial={{ y: 0 }}
          exit={{ y: '-100%' }}
          transition={{ duration: 0.85, ease: [0.76, 0, 0.24, 1] }}
          className="fixed inset-0 z-[100] bg-[#0A0A0C] text-[#EDEDEB] flex flex-col justify-between p-6 sm:p-10 select-none overflow-hidden cursor-pointer"
          onClick={handleFinish}
        >
          {/* Top Bar Info */}
          <div className="w-full flex items-center justify-between text-[11px] sm:text-xs font-semibold tracking-wider uppercase text-white/40">
            <motion.div
              initial={{ opacity: 0, y: -10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.1 }}
              className="flex items-center gap-2"
            >
              <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse" />
              <span>IAN FIRDAUS</span>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: -10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.1 }}
              className="text-right"
            >
              <span>PORTFOLIO ©2026</span>
            </motion.div>
          </div>

          {/* Centerpiece: IAN [Square Image] FRDS */}
          <div className="my-auto flex flex-col items-center justify-center">
            <div className="flex items-center justify-center font-kanit font-black text-white text-5xl sm:text-7xl md:text-8xl lg:text-[110px] tracking-tight leading-none">
              {/* Part 1: I A N */}
              <div className="flex items-center">
                {leftChars.map((char, i) => (
                  <span
                    key={`l-${char}-${i}`}
                    className="inline-block overflow-hidden pb-1"
                  >
                    <motion.span
                      className="inline-block"
                      initial={{ y: '115%', opacity: 0, rotateZ: 4 }}
                      animate={{ y: '0%', opacity: 1, rotateZ: 0 }}
                      transition={{
                        duration: 0.75,
                        ease: [0.22, 1, 0.36, 1],
                        delay: 0.15 + i * 0.08,
                      }}
                    >
                      {char}
                    </motion.span>
                  </span>
                ))}
              </div>

              {/* Middle: Rapidly Cycling Square Image */}
              <motion.div
                className="relative inline-flex items-center justify-center mx-2.5 sm:mx-4 md:mx-5 w-12 h-12 sm:w-16 sm:h-16 md:w-20 md:h-20 lg:w-24 lg:h-24 rounded-xl sm:rounded-2xl md:rounded-[22px] overflow-hidden border border-white/20 shadow-2xl bg-neutral-900 shrink-0 select-none pointer-events-none"
                initial={{ scale: 0, opacity: 0, rotate: -12 }}
                animate={{ scale: 1, opacity: 1, rotate: 0 }}
                transition={{
                  duration: 0.65,
                  ease: [0.34, 1.56, 0.64, 1],
                  delay: 0.42,
                }}
              >
                <img
                  key={currentImgIndex}
                  src={REEL_IMAGES[currentImgIndex]}
                  alt="Work preview"
                  className="w-full h-full object-cover transition-transform duration-200"
                />
                <div className="absolute inset-0 ring-1 ring-inset ring-white/15 rounded-xl sm:rounded-2xl md:rounded-[22px]" />
              </motion.div>

              {/* Part 2: F R D S */}
              <div className="flex items-center">
                {rightChars.map((char, i) => (
                  <span
                    key={`r-${char}-${i}`}
                    className="inline-block overflow-hidden pb-1"
                  >
                    <motion.span
                      className="inline-block"
                      initial={{ y: '115%', opacity: 0, rotateZ: -4 }}
                      animate={{ y: '0%', opacity: 1, rotateZ: 0 }}
                      transition={{
                        duration: 0.75,
                        ease: [0.22, 1, 0.36, 1],
                        delay: 0.5 + i * 0.08,
                      }}
                    >
                      {char}
                    </motion.span>
                  </span>
                ))}
              </div>
            </div>

            {/* Subtitle that fades in */}
            <motion.p
              initial={{ opacity: 0, y: 12 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.85 }}
              className="mt-4 sm:mt-6 text-xs sm:text-sm font-medium tracking-widest uppercase text-white/50 text-center"
            >
              Product &amp; UI/UX Designer
            </motion.p>
          </div>

          {/* Bottom Bar Info / Skip Notice */}
          <div className="w-full flex items-center justify-between text-[11px] sm:text-xs text-white/35 font-medium">
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.5, delay: 0.3 }}
            >
              <span>INDONESIA · GMT+7</span>
            </motion.div>

            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.5, delay: 0.3 }}
              className="flex items-center gap-1.5 hover:text-white/70 transition-colors"
            >
              <span>Click anywhere to enter</span>
              <span className="text-[10px] px-1.5 py-0.5 rounded bg-white/10 font-mono">ESC</span>
            </motion.div>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};
