import React, { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

const SHOWCASE_IMAGES = [
  'https://i.pinimg.com/736x/b7/0f/5b/b70f5bf06ec9829c79682b1d1f9e4e49.jpg',
  'https://i.pinimg.com/736x/ec/5f/b6/ec5fb6c6088e6d4545ffb1af03987bc0.jpg',
  'https://i.pinimg.com/736x/f6/55/cc/f655cc518fb05ce8a76c37d91638d8fe.jpg',
  'https://i.pinimg.com/736x/35/6c/f8/356cf86473be723e9fffeb672fd7681a.jpg',
  'https://i.pinimg.com/736x/61/b8/50/61b850013d6cb178683ecb82c4b4c864.jpg',
  'https://i.pinimg.com/736x/a4/4f/99/a44f993ee4f65d7d29c98253d8361ecb.jpg',
  'https://i.pinimg.com/736x/b9/04/71/b9047102fc2705bf58c3267112898a81.jpg',
  'https://i.pinimg.com/736x/1a/62/9b/1a629b88de5afdfe395dee5e56a8ce4c.jpg',
  'https://i.pinimg.com/736x/38/7b/aa/387baa9ee49a64e0acaab9cd93c3bb57.jpg',
  'https://i.pinimg.com/736x/08/03/38/0803384fc9fd7efd94aa0eb085d6b14b.jpg',
];

interface StackedPhoto {
  id: number;
  src: string;
  x: string;
  y: string;
  rotate: number;
  aspect: string;
  zIndex: number;
}

// Coordinate clusters around hero perimeter so center text remains legible
const ANCHOR_ZONES = [
  // Top Left cluster
  { xMin: 5, xMax: 18, yMin: 14, yMax: 28 },
  // Bottom Left cluster
  { xMin: 6, xMax: 20, yMin: 50, yMax: 70 },
  // Top Right cluster
  { xMin: 68, xMax: 84, yMin: 14, yMax: 28 },
  // Bottom Right cluster
  { xMin: 66, xMax: 82, yMin: 48, yMax: 68 },
  // Mid Left cluster
  { xMin: 4, xMax: 15, yMin: 32, yMax: 48 },
  // Mid Right cluster
  { xMin: 72, xMax: 86, yMin: 32, yMax: 48 },
];

const ASPECT_RATIOS = ['aspect-[4/3]', 'aspect-[16/10]', 'aspect-[3/2]'];

export const RandomFloatingImages: React.FC = () => {
  const [photos, setPhotos] = useState<StackedPhoto[]>([]);
  const [isDesktop, setIsDesktop] = useState(false);
  const nextIdRef = useRef(1);
  const zCounterRef = useRef(10);
  const lastImgRef = useRef('');

  useEffect(() => {
    const checkScreen = () => {
      setIsDesktop(window.innerWidth >= 768);
    };
    checkScreen();
    window.addEventListener('resize', checkScreen);
    return () => window.removeEventListener('resize', checkScreen);
  }, []);

  useEffect(() => {
    if (!isDesktop) {
      setPhotos([]);
      return;
    }

    const spawnImage = () => {
      // Pick image different from the previous one
      const available = SHOWCASE_IMAGES.filter((img) => img !== lastImgRef.current);
      const chosenImg = available[Math.floor(Math.random() * available.length)];
      lastImgRef.current = chosenImg;

      // Pick an anchor zone with slight random jitter to create natural stacking
      const zone = ANCHOR_ZONES[Math.floor(Math.random() * ANCHOR_ZONES.length)];
      const posX = zone.xMin + Math.random() * (zone.xMax - zone.xMin);
      const posY = zone.yMin + Math.random() * (zone.yMax - zone.yMin);
      const rotate = Math.random() * 16 - 8; // -8deg to +8deg
      const aspect = ASPECT_RATIOS[Math.floor(Math.random() * ASPECT_RATIOS.length)];

      const id = nextIdRef.current++;
      zCounterRef.current++;

      const newPhoto: StackedPhoto = {
        id,
        src: chosenImg,
        x: `${posX.toFixed(1)}%`,
        y: `${posY.toFixed(1)}%`,
        rotate,
        aspect,
        zIndex: zCounterRef.current,
      };

      // Add to stack, keeping max 5 photos simultaneously to prevent memory bloat
      setPhotos((prev) => [...prev.slice(-4), newPhoto]);

      // Schedule removal of this specific photo after lifecycle
      setTimeout(() => {
        setPhotos((prev) => prev.filter((p) => p.id !== id));
      }, 5200);
    };

    // Initial spawn
    const initTimer = setTimeout(spawnImage, 500);

    // Continuous loop interval: spawn a new stacked image every 1.8s
    const interval = setInterval(spawnImage, 1800);

    return () => {
      clearTimeout(initTimer);
      clearInterval(interval);
    };
  }, [isDesktop]);

  if (!isDesktop) return null;

  return (
    <div className="hidden md:block absolute inset-0 pointer-events-none select-none z-10 overflow-hidden">
      <AnimatePresence>
        {photos.map((photo) => (
          <motion.div
            key={photo.id}
            style={{
              position: 'absolute',
              left: photo.x,
              top: photo.y,
              zIndex: photo.zIndex,
            }}
            // Zoom out entrance: begins at 1.4x scale and zooms out down to 1x scale
            initial={{
              scale: 1.4,
              opacity: 0,
              rotate: photo.rotate * 1.25,
            }}
            // Smooth zoom-out landing, subtle drift, and gradual slow fade dissolve
            animate={{
              scale: [1.4, 1.0, 0.98],
              opacity: [0, 1, 0.95, 0.35, 0],
              rotate: photo.rotate,
              transition: {
                scale: {
                  duration: 4.8,
                  times: [0, 0.16, 1],
                  ease: [0.16, 1, 0.3, 1], // Cinematic deceleration
                },
                opacity: {
                  duration: 5.2,
                  times: [0, 0.08, 0.45, 0.85, 1], // Holds crisp opacity, then slowly dissolves
                  ease: 'easeInOut',
                },
                rotate: {
                  duration: 0.9,
                  ease: [0.16, 1, 0.3, 1],
                },
              },
            }}
            // Gentle fade exit
            exit={{
              opacity: 0,
              scale: 0.95,
              transition: { duration: 0.8, ease: 'easeOut' },
            }}
            className="w-40 sm:w-56 md:w-64 lg:w-72"
          >
            {/* Pure image without rounded corners and without any text */}
            <div className="relative w-full rounded-none overflow-hidden border border-white/20 shadow-2xl shadow-black/90 bg-[#121216]">
              <img
                src={photo.src}
                alt=""
                className={`w-full h-full object-cover rounded-none block ${photo.aspect}`}
                loading="eager"
              />
              {/* Subtle filmic ambient edge */}
              <div className="absolute inset-0 ring-1 ring-inset ring-white/10 pointer-events-none" />
            </div>
          </motion.div>
        ))}
      </AnimatePresence>
    </div>
  );
};
