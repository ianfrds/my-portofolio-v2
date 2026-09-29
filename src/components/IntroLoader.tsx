import React, { useState, useEffect, useCallback } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

interface IntroLoaderProps {
  onComplete: () => void;
}

interface ReelItem {
  src: string;
  ratio: string;
}

// Curated aspect ratios: 1:1, 4:3, 3:4, 5:4, 4:5, 3:2 (strictly excluding 16:9 and 9:16)
const REEL_ITEMS: ReelItem[] = [
  {
    src: 'https://i.pinimg.com/736x/b7/0f/5b/b70f5bf06ec9829c79682b1d1f9e4e49.jpg',
    ratio: '1 / 1', // 1:1 Square
  },
  {
    src: 'https://i.pinimg.com/736x/ec/5f/b6/ec5fb6c6088e6d4545ffb1af03987bc0.jpg',
    ratio: '4 / 3', // 4:3 Landscape
  },
  {
    src: 'https://i.pinimg.com/736x/f6/55/cc/f655cc518fb05ce8a76c37d91638d8fe.jpg',
    ratio: '3 / 4', // 3:4 Portrait
  },
  {
    src: 'https://i.pinimg.com/736x/35/6c/f8/356cf86473be723e9fffeb672fd7681a.jpg',
    ratio: '5 / 4', // 5:4 Landscape
  },
  {
    src: 'https://i.pinimg.com/736x/61/b8/50/61b850013d6cb178683ecb82c4b4c864.jpg',
    ratio: '4 / 5', // 4:5 Portrait
  },
  {
    src: 'https://i.pinimg.com/736x/a4/4f/99/a44f993ee4f65d7d29c98253d8361ecb.jpg',
    ratio: '3 / 2', // 3:2 Landscape
  },
  {
    src: 'https://i.pinimg.com/736x/01/aa/2a/01aa2a70aa432c2533e4b7863bf0178d.jpg',
    ratio: '1 / 1', // 1:1 Square
  },
  {
    src: 'https://i.pinimg.com/736x/5a/69/f8/5a69f87ad6650c58f3f7c704084a2f5d.jpg',
    ratio: '3 / 4', // 3:4 Portrait
  },
  {
    src: 'https://i.pinimg.com/736x/08/03/38/0803384fc9fd7efd94aa0eb085d6b14b.jpg',
    ratio: '4 / 3', // 4:3 Landscape
  },
];

// Stacked colorful curtain layers underneath main screen for tiered upward slide:
// Oranye -> Ungu -> Biru
const STACKED_LAYERS = [
  {
    id: 'layer-blue',
    bg: 'bg-[#2563EB]', // Biru (Electric Cobalt Blue)
    zIndex: 'z-[96]',
    delay: 0.24,
    shadow: 'shadow-[0_30px_60px_rgba(0,0,0,0.6)]',
  },
  {
    id: 'layer-purple',
    bg: 'bg-[#7C3AED]', // Ungu (Vibrant Electric Purple)
    zIndex: 'z-[97]',
    delay: 0.16,
    shadow: 'shadow-[0_25px_50px_rgba(0,0,0,0.5)]',
  },
  {
    id: 'layer-orange',
    bg: 'bg-[#FF6422]', // Oranye (Punchy Modern Sunset Orange)
    zIndex: 'z-[98]',
    delay: 0.08,
    shadow: 'shadow-[0_20px_40px_rgba(0,0,0,0.4)]',
  },
];

export const IntroLoader: React.FC<IntroLoaderProps> = ({ onComplete }) => {
  const [currentImgIndex, setCurrentImgIndex] = useState(0);
  const [isParted, setIsParted] = useState(false);
  const [isExiting, setIsExiting] = useState(false);

  const [isMobile, setIsMobile] = useState(() => typeof window !== 'undefined' && window.innerWidth < 640);

  useEffect(() => {
    const handleResize = () => setIsMobile(window.innerWidth < 640);
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  const partedOffset = isMobile ? 24 : 46;

  // Preload reel images
  useEffect(() => {
    REEL_ITEMS.forEach((item) => {
      const img = new Image();
      img.src = item.src;
    });
  }, []);

  const handleFinish = useCallback(() => {
    setIsExiting(true);
  }, []);

  // Staged Choreography:
  // 1. Letters roll up together (0ms - 650ms)
  // 2. IAN & FRDS part / separate to create space (750ms)
  // 3. Middle image blooms in and THEN starts cycling through ratios (1200ms)
  // 4. Stacked colorful layers sweep up (2950ms)
  useEffect(() => {
    // Step 1: Trigger parting animation after letters arrive
    const partTimer = setTimeout(() => {
      setIsParted(true);
    }, 750);

    // Step 2: Once separated and the first image is revealed, start the cycling reel
    let cycleInterval: ReturnType<typeof setInterval> | null = null;
    const startCycleTimer = setTimeout(() => {
      cycleInterval = setInterval(() => {
        setCurrentImgIndex((prev) => (prev + 1) % REEL_ITEMS.length);
      }, 190);
    }, 1200);

    // Step 3: Trigger exit transition
    const finishTimer = setTimeout(() => {
      if (cycleInterval) clearInterval(cycleInterval);
      handleFinish();
    }, 2950);

    return () => {
      clearTimeout(partTimer);
      clearTimeout(startCycleTimer);
      clearTimeout(finishTimer);
      if (cycleInterval) clearInterval(cycleInterval);
    };
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
  const currentItem = REEL_ITEMS[currentImgIndex];

  return (
    <AnimatePresence onExitComplete={onComplete}>
      {!isExiting && (
        <>
          {/* ── Tiered Colorful Stack Layers (Sliding Upwards Sequentially) ── */}
          {STACKED_LAYERS.map((layer) => (
            <motion.div
              key={layer.id}
              initial={{ y: 0 }}
              exit={{ y: '-100%' }}
              transition={{
                duration: 0.82,
                ease: [0.76, 0, 0.24, 1],
                delay: layer.delay,
              }}
              className={`fixed inset-0 ${layer.zIndex} ${layer.bg} ${layer.shadow} pointer-events-none will-change-transform`}
            />
          ))}

          {/* ── Main Topmost Curtain Layer with Content (Obsidian Black) ── */}
          <motion.div
            key="intro-curtain-main"
            initial={{ y: 0 }}
            exit={{ y: '-100%' }}
            transition={{
              duration: 0.82,
              ease: [0.76, 0, 0.24, 1],
              delay: 0,
            }}
            className="fixed inset-0 z-[100] bg-[#0A0A0C] text-[#EDEDEB] shadow-[0_30px_70px_rgba(0,0,0,0.8)] flex flex-col justify-between p-6 sm:p-10 select-none overflow-hidden cursor-pointer will-change-transform"
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

            {/* Centerpiece: IAN [Multi-Ratio Morphing Image] FRDS */}
            <div className="my-auto flex flex-col items-center justify-center">
              <div className="flex items-center justify-center font-kanit font-black text-white text-5xl sm:text-7xl md:text-8xl lg:text-[110px] tracking-tight leading-none">
                {/* Part 1: I A N (shifts right initially, glides left to 0 when parting) */}
                <motion.div
                  className="flex items-center"
                  animate={{
                    x: isParted ? 0 : partedOffset,
                  }}
                  transition={{
                    duration: 0.65,
                    ease: [0.16, 1, 0.3, 1],
                  }}
                >
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
                          duration: 0.65,
                          ease: [0.22, 1, 0.36, 1],
                          delay: 0.12 + i * 0.07,
                        }}
                      >
                        {char}
                      </motion.span>
                    </span>
                  ))}
                </motion.div>

                {/* Middle: Rapidly Cycling Multi-Ratio Image (1:1, 4:3, 3:4, 5:4, 4:5, 3:2) */}
                <motion.div
                  layout
                  className="relative inline-flex items-center justify-center mx-2 sm:mx-3.5 md:mx-4.5 h-11 sm:h-16 md:h-20 lg:h-24 rounded-xl sm:rounded-2xl md:rounded-[22px] overflow-hidden border border-white/20 shadow-2xl bg-neutral-900 shrink-0 select-none pointer-events-none will-change-[width,height,transform]"
                  style={{
                    aspectRatio: currentItem.ratio,
                  }}
                  initial={{ scale: 0, opacity: 0, rotate: -12 }}
                  animate={
                    isParted
                      ? { scale: 1, opacity: 1, rotate: 0 }
                      : { scale: 0, opacity: 0, rotate: -12 }
                  }
                  transition={{
                    layout: { duration: 0.2, ease: [0.16, 1, 0.3, 1] },
                    scale: { duration: 0.6, ease: [0.34, 1.56, 0.64, 1] },
                    opacity: { duration: 0.3 },
                  }}
                >
                  <img
                    key={currentImgIndex}
                    src={currentItem.src}
                    alt="Work preview"
                    className="w-full h-full object-cover select-none transition-transform duration-200"
                  />
                  <div className="absolute inset-0 ring-1 ring-inset ring-white/15 rounded-xl sm:rounded-2xl md:rounded-[22px] pointer-events-none" />
                </motion.div>

                {/* Part 2: F R D S (shifts left initially, glides right to 0 when parting) */}
                <motion.div
                  className="flex items-center"
                  animate={{
                    x: isParted ? 0 : -partedOffset,
                  }}
                  transition={{
                    duration: 0.65,
                    ease: [0.16, 1, 0.3, 1],
                  }}
                >
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
                          duration: 0.65,
                          ease: [0.22, 1, 0.36, 1],
                          delay: 0.22 + i * 0.07,
                        }}
                      >
                        {char}
                      </motion.span>
                    </span>
                  ))}
                </motion.div>
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
        </>
      )}
    </AnimatePresence>
  );
};
