import React, { useState, useRef, useEffect, useLayoutEffect, useCallback, useMemo } from 'react';
import { motion } from 'framer-motion';
import { LayoutGrid, AppWindow, Presentation, Palette, Sparkles } from 'lucide-react';
import { SiteHeader, type PageType } from './SiteHeader';

interface WorkGalleryPageProps {
  onNavigate: (page: PageType) => void;
}

type CategoryType = 'All' | 'UI Design' | 'Presentation' | 'Graphic Design' | 'Etc';

interface GalleryProject {
  id: string;
  title: string;
  category: CategoryType;
  src: string;
}

// 25 Curated Works categorized cleanly
const BASE_PROJECTS: GalleryProject[] = [
  // Column 1
  {
    id: 'p-01',
    title: 'Velox Spatial OS',
    category: 'UI Design',
    src: 'https://i.pinimg.com/736x/b7/0f/5b/b70f5bf06ec9829c79682b1d1f9e4e49.jpg',
  },
  {
    id: 'p-02',
    title: 'Aura Venture Labs',
    category: 'Presentation',
    src: 'https://i.pinimg.com/736x/f6/55/cc/f655cc518fb05ce8a76c37d91638d8fe.jpg',
  },
  {
    id: 'p-03',
    title: 'Axiom Type Specimen',
    category: 'Graphic Design',
    src: 'https://i.pinimg.com/736x/da/a7/ae/daa7ae806698af225a71566381abe8dd.jpg',
  },
  {
    id: 'p-04',
    title: 'Hyperion Cockpit',
    category: 'Etc',
    src: 'https://i.pinimg.com/736x/b9/04/71/b9047102fc2705bf58c3267112898a81.jpg',
  },
  {
    id: 'p-05',
    title: 'Lumina Token Kit',
    category: 'Graphic Design',
    src: 'https://i.pinimg.com/736x/49/d2/78/49d278ffdd9385b3dfb2104f0009c58d.jpg',
  },

  // Column 2
  {
    id: 'p-06',
    title: 'Apex Cloud IDE',
    category: 'UI Design',
    src: 'https://i.pinimg.com/736x/ec/5f/b6/ec5fb6c6088e6d4545ffb1af03987bc0.jpg',
  },
  {
    id: 'p-07',
    title: 'Arch Lookbook Keynote',
    category: 'Presentation',
    src: 'https://i.pinimg.com/736x/60/48/c4/6048c4579835a9dbe213d94522603e45.jpg',
  },
  {
    id: 'p-08',
    title: 'Prism Generative AI',
    category: 'UI Design',
    src: 'https://i.pinimg.com/736x/35/6c/f8/356cf86473be723e9fffeb672fd7681a.jpg',
  },
  {
    id: 'p-09',
    title: 'Atelier Motion Lab',
    category: 'Graphic Design',
    src: 'https://i.pinimg.com/736x/b7/66/27/b7662714904a08ff9e001957d3a3107c.jpg',
  },
  {
    id: 'p-10',
    title: 'Kinetix 3D Visualizer',
    category: 'Etc',
    src: 'https://i.pinimg.com/736x/0a/39/ff/0a39ff2ab2e4b3029b2bbc6a5de6924d.jpg',
  },

  // Column 3 (center column)
  {
    id: 'p-11',
    title: 'Chronos Precision OS',
    category: 'UI Design',
    src: 'https://i.pinimg.com/736x/61/b8/50/61b850013d6cb178683ecb82c4b4c864.jpg',
  },
  {
    id: 'p-12',
    title: 'Synapse Brand Pitch',
    category: 'Presentation',
    src: 'https://i.pinimg.com/736x/56/f8/df/56f8df79b10c7c885353e57c21e61ea5.jpg',
  },
  {
    id: 'p-13',
    title: 'Nova Data Viz',
    category: 'UI Design',
    src: 'https://i.pinimg.com/736x/a4/4f/99/a44f993ee4f65d7d29c98253d8361ecb.jpg',
  },
  {
    id: 'p-14',
    title: 'Flux Spec Typography',
    category: 'Graphic Design',
    src: 'https://i.pinimg.com/736x/5a/69/f8/5a69f87ad6650c58f3f7c704084a2f5d.jpg',
  },
  {
    id: 'p-15',
    title: 'Sphere Orbit 3D',
    category: 'Etc',
    src: 'https://i.pinimg.com/736x/fe/84/2b/fe842b0bbdb22e01a0cea0ad3fa91b12.jpg',
  },

  // Column 4
  {
    id: 'p-16',
    title: 'Helios Neo-Bank App',
    category: 'UI Design',
    src: 'https://i.pinimg.com/736x/e6/4c/ea/e64cea0ce9fc99e659cad162b0bd5643.jpg',
  },
  {
    id: 'p-17',
    title: 'Velox Editorial Deck',
    category: 'Presentation',
    src: 'https://i.pinimg.com/736x/0f/48/9c/0f489c88aaf9cb663283e1b5bbdf91b7.jpg',
  },
  {
    id: 'p-18',
    title: 'Pulse DeFi Protocol',
    category: 'UI Design',
    src: 'https://i.pinimg.com/736x/9e/bf/51/9ebf51493e40fb7abe051f843e281fdb.jpg',
  },
  {
    id: 'p-19',
    title: 'Nexus Autonomous AI',
    category: 'Etc',
    src: 'https://i.pinimg.com/736x/5d/06/43/5d0643fe56de4a616f83d67d21be2a69.jpg',
  },
  {
    id: 'p-20',
    title: 'Verve Graphic System',
    category: 'Graphic Design',
    src: 'https://i.pinimg.com/736x/08/03/38/0803384fc9fd7efd94aa0eb085d6b14b.jpg',
  },

  // Column 5
  {
    id: 'p-21',
    title: 'Zeta Crypto Wallet',
    category: 'UI Design',
    src: 'https://i.pinimg.com/736x/27/7b/42/277b42fc5b3a00d20795fdb365965f6f.jpg',
  },
  {
    id: 'p-22',
    title: 'Vanguard Jet Showcase',
    category: 'Presentation',
    src: 'https://i.pinimg.com/736x/38/7b/aa/387baa9ee49a64e0acaab9cd93c3bb57.jpg',
  },
  {
    id: 'p-23',
    title: 'Stratum Cloud Keynote',
    category: 'Presentation',
    src: 'https://i.pinimg.com/736x/dd/80/4b/dd804bda03294fec04c0b3ba7c231041.jpg',
  },
  {
    id: 'p-24',
    title: 'BioGenics Molecular 3D',
    category: 'Etc',
    src: 'https://i.pinimg.com/736x/1a/62/9b/1a629b88de5afdfe395dee5e56a8ce4c.jpg',
  },
  {
    id: 'p-25',
    title: 'Omni Visual Suite',
    category: 'UI Design',
    src: 'https://i.pinimg.com/736x/08/03/38/0803384fc9fd7efd94aa0eb085d6b14b.jpg',
  },
];

const CATEGORY_ITEMS: { label: CategoryType; icon: React.ComponentType<{ className?: string }> }[] = [
  { label: 'All', icon: LayoutGrid },
  { label: 'UI Design', icon: AppWindow },
  { label: 'Presentation', icon: Presentation },
  { label: 'Graphic Design', icon: Palette },
  { label: 'Etc', icon: Sparkles },
];

// Column configuration
const NUM_COLS = 5;
const NUM_ROWS = 5;

// We render a 3x3 grid of blocks (bx: 0..2, by: 0..2)
const BLOCK_INDICES = [0, 1, 2];

export const WorkGalleryPage: React.FC<WorkGalleryPageProps> = ({ onNavigate }) => {
  const containerRef = useRef<HTMLDivElement>(null);
  const cardRefs = useRef<Record<string, HTMLDivElement | null>>({});

  const [activeCategory, setActiveCategory] = useState<CategoryType>('All');
  const [galleryCategory, setGalleryCategory] = useState<CategoryType>('All');
  const [selectedCardKey, setSelectedCardKey] = useState<string | null>(null);
  const [isBloomed, setIsBloomed] = useState(false);
  const [isGathered, setIsGathered] = useState(true);
  const isTransitioningRef = useRef(false);
  const bloomTimeoutRef = useRef<ReturnType<typeof setTimeout>[]>([]);

  const clearBloomTimeouts = () => {
    bloomTimeoutRef.current.forEach((t) => clearTimeout(t));
    bloomTimeoutRef.current = [];
  };

  // Clean up timers on unmount
  useEffect(() => {
    return () => {
      bloomTimeoutRef.current.forEach((t) => clearTimeout(t));
    };
  }, []);

  // Memoized 5 columns of 5 cards each.
  // When 'All': uses BASE_PROJECTS (5 cols x 5 rows = 25 distinct cards).
  // When filtered: filters by category and loops/cycles the matching cards across all 25 slots,
  // ensuring the layout remains 100% dense without empty holes, with seamless infinite 2D looping!
  const displayedColumns = useMemo(() => {
    if (galleryCategory === 'All') {
      return Array.from({ length: NUM_COLS }, (_, colIdx) =>
        BASE_PROJECTS.slice(colIdx * NUM_ROWS, (colIdx + 1) * NUM_ROWS)
      );
    }

    const matches = BASE_PROJECTS.filter((p) => p.category === galleryCategory);
    if (matches.length === 0) {
      return Array.from({ length: NUM_COLS }, (_, colIdx) =>
        BASE_PROJECTS.slice(colIdx * NUM_ROWS, (colIdx + 1) * NUM_ROWS)
      );
    }

    // Smart stagger indexing: (colIdx * 7 + rowIdx) % matches.length
    // Since 7 is coprime with 4, 5, 6, 8, each column starts at a distinct card offset,
    // creating a rich, organic layout without adjacent card duplicates.
    return Array.from({ length: NUM_COLS }, (_, colIdx) =>
      Array.from({ length: NUM_ROWS }, (_, rowIdx) => {
        const matchIndex = (colIdx * 7 + rowIdx) % matches.length;
        return matches[matchIndex];
      })
    );
  }, [galleryCategory]);

  // Responsive state for mobile view
  const [isMobile, setIsMobile] = useState(() => typeof window !== 'undefined' && window.innerWidth < 640);

  useEffect(() => {
    const handleResize = () => {
      setIsMobile(window.innerWidth < 640);
    };
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  // Card dimensions:
  // Desktop: 348px × 220px (slightly enlarged) | Mobile: 272px × 172px
  const CARD_WIDTH = isMobile ? 272 : 348;
  const CARD_HEIGHT = isMobile ? 172 : 220;
  const GAP_X = isMobile ? 18 : 24;
  const GAP_Y = isMobile ? 18 : 24;
  const COL_STAGGERS = isMobile ? [0, 72, 28, 98, 52] : [0, 96, 36, 132, 68];

  // Exact repetition dimensions for 1 block
  const BLOCK_WIDTH = NUM_COLS * (CARD_WIDTH + GAP_X);
  const BLOCK_HEIGHT = NUM_ROWS * (CARD_HEIGHT + GAP_Y);

  // Exact geometric center coordinate of the 5-column gallery grid in center block (bx=1, by=1)
  const gridHeight = COL_STAGGERS[3] + NUM_ROWS * CARD_HEIGHT + (NUM_ROWS - 1) * GAP_Y;
  const CENTER_CARD_X = 1 * BLOCK_WIDTH + 2 * (CARD_WIDTH + GAP_X) + CARD_WIDTH / 2;
  const CENTER_CARD_Y = 1 * BLOCK_HEIGHT + Math.round(gridHeight / 2);

  // Drag-to-pan & smooth scrolling engine state
  const isDraggingRef = useRef(false);
  const dragStartRef = useRef<{ x: number; y: number; scrollLeft: number; scrollTop: number }>({
    x: 0,
    y: 0,
    scrollLeft: 0,
    scrollTop: 0,
  });
  const hasMovedRef = useRef(false);
  const isAdjustingScroll = useRef(false);

  // Smooth scroll target and current position refs (inertial lerp engine)
  const targetPosRef = useRef({ x: 0, y: 0 });
  const currentPosRef = useRef({ x: 0, y: 0 });
  const momentumVelRef = useRef({ x: 0, y: 0 });
  const isWheelingRef = useRef(false);
  const lastMousePosRef = useRef({ x: 0, y: 0, time: 0 });

  // Initial entrance bloom: cards start gathered at center, then bloom outward
  useEffect(() => {
    const gatherTimer = setTimeout(() => {
      setIsGathered(false);
    }, 220);

    const bloomTimer = setTimeout(() => {
      setIsBloomed(true);
    }, 1250);

    return () => {
      clearTimeout(gatherTimer);
      clearTimeout(bloomTimer);
    };
  }, []);

  // Initial scroll position: dead center in viewport before paint
  useLayoutEffect(() => {
    const alignExactCenter = () => {
      if (!containerRef.current) return;
      const container = containerRef.current;
      const initX = Math.round(CENTER_CARD_X - container.clientWidth / 2);
      const initY = Math.round(CENTER_CARD_Y - container.clientHeight / 2);
      container.scrollLeft = initX;
      container.scrollTop = initY;
      targetPosRef.current = { x: initX, y: initY };
      currentPosRef.current = { x: initX, y: initY };
    };

    alignExactCenter();
    const rafId = requestAnimationFrame(alignExactCenter);
    window.addEventListener('resize', alignExactCenter);

    return () => {
      cancelAnimationFrame(rafId);
      window.removeEventListener('resize', alignExactCenter);
    };
  }, [CENTER_CARD_X, CENTER_CARD_Y]);

  // Buttery Smooth 2D Inertial Scrolling Engine
  useEffect(() => {
    const container = containerRef.current;
    if (!container) return;

    let rafId: number;

    const onWheel = (e: WheelEvent) => {
      e.preventDefault();

      let dx = e.deltaX;
      let dy = e.deltaY;
      if (e.deltaMode === 1) {
        dx *= 28;
        dy *= 28;
      } else if (e.deltaMode === 2) {
        dx *= 280;
        dy *= 280;
      }

      // If user holds Shift, map vertical wheel to horizontal
      if (e.shiftKey && dy !== 0 && dx === 0) {
        dx = dy;
        dy = 0;
      }

      targetPosRef.current.x += dx;
      targetPosRef.current.y += dy;
      isWheelingRef.current = true;
    };

    const updateSmoothScroll = () => {
      if (!containerRef.current) return;
      const c = containerRef.current;

      if (isDraggingRef.current) {
        targetPosRef.current.x = c.scrollLeft;
        targetPosRef.current.y = c.scrollTop;
        currentPosRef.current.x = c.scrollLeft;
        currentPosRef.current.y = c.scrollTop;
      } else if (
        isWheelingRef.current ||
        Math.abs(momentumVelRef.current.x) > 0.1 ||
        Math.abs(momentumVelRef.current.y) > 0.1
      ) {
        // Apply fling inertia momentum if mouse released with velocity
        if (Math.abs(momentumVelRef.current.x) > 0.1 || Math.abs(momentumVelRef.current.y) > 0.1) {
          targetPosRef.current.x -= momentumVelRef.current.x;
          targetPosRef.current.y -= momentumVelRef.current.y;
          momentumVelRef.current.x *= 0.92;
          momentumVelRef.current.y *= 0.92;
        }

        // Fluid dampening lerp
        const factor = 0.12;
        const diffX = targetPosRef.current.x - currentPosRef.current.x;
        const diffY = targetPosRef.current.y - currentPosRef.current.y;

        if (Math.abs(diffX) > 0.25 || Math.abs(diffY) > 0.25) {
          currentPosRef.current.x += diffX * factor;
          currentPosRef.current.y += diffY * factor;
          c.scrollLeft = Math.round(currentPosRef.current.x);
          c.scrollTop = Math.round(currentPosRef.current.y);
        } else {
          isWheelingRef.current = false;
        }
      }

      rafId = requestAnimationFrame(updateSmoothScroll);
    };

    container.addEventListener('wheel', onWheel, { passive: false });
    rafId = requestAnimationFrame(updateSmoothScroll);

    return () => {
      container.removeEventListener('wheel', onWheel);
      cancelAnimationFrame(rafId);
    };
  }, []);

  // Infinite 2D Seamless Loop wrapping in both X and Y directions
  const handleScroll = useCallback(() => {
    if (!containerRef.current || isAdjustingScroll.current) return;

    const { scrollLeft, scrollTop } = containerRef.current;
    let nextLeft = scrollLeft;
    let nextTop = scrollTop;

    // Horizontal loop: if scrolling too far left or right from center block
    if (scrollLeft < BLOCK_WIDTH * 0.4) {
      nextLeft = scrollLeft + BLOCK_WIDTH;
    } else if (scrollLeft > BLOCK_WIDTH * 1.6) {
      nextLeft = scrollLeft - BLOCK_WIDTH;
    }

    // Vertical loop: if scrolling too far up or down from center block
    if (scrollTop < BLOCK_HEIGHT * 0.4) {
      nextTop = scrollTop + BLOCK_HEIGHT;
    } else if (scrollTop > BLOCK_HEIGHT * 1.6) {
      nextTop = scrollTop - BLOCK_HEIGHT;
    }

    if (nextLeft !== scrollLeft || nextTop !== scrollTop) {
      isAdjustingScroll.current = true;
      const shiftX = nextLeft - scrollLeft;
      const shiftY = nextTop - scrollTop;

      containerRef.current.scrollLeft = nextLeft;
      containerRef.current.scrollTop = nextTop;

      targetPosRef.current.x += shiftX;
      targetPosRef.current.y += shiftY;
      currentPosRef.current.x += shiftX;
      currentPosRef.current.y += shiftY;

      if (isDraggingRef.current) {
        dragStartRef.current.scrollLeft += shiftX;
        dragStartRef.current.scrollTop += shiftY;
      }

      requestAnimationFrame(() => {
        isAdjustingScroll.current = false;
      });
    }
  }, [BLOCK_WIDTH, BLOCK_HEIGHT]);

  // Mouse Drag-to-Pan Handlers with Inertial Momentum
  const handleMouseDown = (e: React.MouseEvent) => {
    if (!containerRef.current) return;
    isDraggingRef.current = true;
    hasMovedRef.current = false;
    momentumVelRef.current = { x: 0, y: 0 };
    dragStartRef.current = {
      x: e.clientX,
      y: e.clientY,
      scrollLeft: containerRef.current.scrollLeft,
      scrollTop: containerRef.current.scrollTop,
    };
    lastMousePosRef.current = {
      x: e.clientX,
      y: e.clientY,
      time: performance.now(),
    };
  };

  const handleMouseMove = (e: React.MouseEvent) => {
    if (!isDraggingRef.current || !containerRef.current) return;
    const now = performance.now();
    const dt = Math.max(1, now - lastMousePosRef.current.time);
    const dxMouse = e.clientX - lastMousePosRef.current.x;
    const dyMouse = e.clientY - lastMousePosRef.current.y;

    momentumVelRef.current = {
      x: (dxMouse / dt) * 16,
      y: (dyMouse / dt) * 16,
    };

    lastMousePosRef.current = {
      x: e.clientX,
      y: e.clientY,
      time: now,
    };

    const dx = e.clientX - dragStartRef.current.x;
    const dy = e.clientY - dragStartRef.current.y;

    if (Math.abs(dx) > 3 || Math.abs(dy) > 3) {
      hasMovedRef.current = true;
    }

    containerRef.current.scrollLeft = dragStartRef.current.scrollLeft - dx;
    containerRef.current.scrollTop = dragStartRef.current.scrollTop - dy;
  };

  const handleMouseUp = () => {
    if (!isDraggingRef.current) return;
    isDraggingRef.current = false;

    // Cap momentum fling velocity
    const maxVel = 32;
    momentumVelRef.current.x = Math.max(-maxVel, Math.min(maxVel, momentumVelRef.current.x * 0.85));
    momentumVelRef.current.y = Math.max(-maxVel, Math.min(maxVel, momentumVelRef.current.y * 0.85));
    isWheelingRef.current = true;
  };

  // Click card to center
  const handleCardClick = (fullKey: string) => {
    if (hasMovedRef.current) return;

    setSelectedCardKey(fullKey);
    const el = cardRefs.current[fullKey];
    if (el) {
      el.scrollIntoView({
        behavior: 'smooth',
        block: 'center',
        inline: 'center',
      });
    }
  };

  // Category filter click: immediate tab highlight with silky smooth card bloom animation
  const handleCategorySelect = (cat: CategoryType) => {
    if (cat === activeCategory) return;

    // 1. Immediately highlight new tab on the menu (0ms delay for instant touch response)
    setActiveCategory(cat);
    setSelectedCardKey(null);

    // 2. Clear any pending timeouts to prevent stutter on fast clicks
    clearBloomTimeouts();
    isTransitioningRef.current = true;
    setIsBloomed(false);
    setIsGathered(true);

    // 3. Smoothly re-center viewport
    if (containerRef.current) {
      const initX = Math.round(CENTER_CARD_X - containerRef.current.clientWidth / 2);
      const initY = Math.round(CENTER_CARD_Y - containerRef.current.clientHeight / 2);
      targetPosRef.current = { x: initX, y: initY };
      isWheelingRef.current = true;
    }

    const collapseTime = isMobile ? 220 : 260;
    const bloomTime = isMobile ? 550 : 650;

    // Step 1: Wait for cards to collapse into center stack
    const t1 = setTimeout(() => {
      // Switch project category while collapsed at center
      setGalleryCategory(cat);

      // Step 2: Bloom outward with filtered cards
      const t2 = setTimeout(() => {
        setIsGathered(false);

        // Step 3: Reactivate borders & shadows once bloom finishes
        const t3 = setTimeout(() => {
          setIsBloomed(true);
          isTransitioningRef.current = false;
        }, bloomTime);

        bloomTimeoutRef.current.push(t3);
      }, 40);

      bloomTimeoutRef.current.push(t2);
    }, collapseTime);

    bloomTimeoutRef.current.push(t1);
  };

  return (
    <div className="relative w-full h-[100dvh] sm:min-h-screen bg-[#0C0C0C] text-[#EDEDEB] p-0 sm:p-5 md:p-6 flex flex-col justify-center select-none overflow-hidden">
      {/* ── Main Framed Card (100% full height on mobile, elegant framed card on desktop) ── */}
      <div className="relative w-full h-full sm:min-h-[95vh] rounded-none sm:rounded-[38px] md:rounded-[48px] overflow-hidden bg-[#0A0A0C] text-white flex flex-col justify-between shadow-none sm:shadow-2xl border-0 sm:border border-white/10">

        {/* ── Top Navbar (100% Identical placement & padding across all pages) ── */}
        <SiteHeader currentPage="work" onNavigate={onNavigate} className="relative z-40" />

        {/* ── 2D Infinite Looping Canvas (Inside Framed Card) ── */}
        <div
          ref={containerRef}
          onScroll={handleScroll}
          onMouseDown={handleMouseDown}
          onMouseMove={handleMouseMove}
          onMouseUp={handleMouseUp}
          onMouseLeave={handleMouseUp}
          className={`absolute inset-0 z-10 w-full h-full overflow-x-auto overflow-y-auto overscroll-contain select-none ${isDraggingRef.current ? 'cursor-grabbing' : 'cursor-grab'
            }`}
          style={{
            scrollbarWidth: 'none',
            msOverflowStyle: 'none',
          }}
        >
          {/* Subtle Ambient Background Grid */}
          <div className="absolute inset-0 min-w-[5000px] min-h-[3500px] pointer-events-none opacity-20 bg-[radial-gradient(#ffffff_1px,transparent_1px)] [background-size:28px_28px]" />

          {/* 3x3 Infinite Tiled Grid System (9 Blocks) */}
          <div
            className="relative"
            style={{
              width: `${BLOCK_WIDTH * 3}px`,
              height: `${BLOCK_HEIGHT * 3}px`,
            }}
          >
            {BLOCK_INDICES.map((by) =>
              BLOCK_INDICES.map((bx) => {
                const blockLeft = bx * BLOCK_WIDTH;
                const blockTop = by * BLOCK_HEIGHT;

                return (
                  <div
                    key={`block-${bx}-${by}`}
                    className="absolute flex items-start"
                    style={{
                      left: `${blockLeft}px`,
                      top: `${blockTop}px`,
                      width: `${BLOCK_WIDTH}px`,
                      gap: `${GAP_X}px`,
                    }}
                  >
                    {Array.from({ length: NUM_COLS }).map((_, colIdx) => {
                      const colItems = displayedColumns[colIdx];
                      const staggerOffset = COL_STAGGERS[colIdx];

                      return (
                        <div
                          key={`col-${bx}-${by}-${colIdx}`}
                          className="flex flex-col shrink-0"
                          style={{
                            width: `${CARD_WIDTH}px`,
                            gap: `${GAP_Y}px`,
                            paddingTop: `${staggerOffset}px`,
                          }}
                        >
                          {colItems.map((card, rowIdx) => {
                            const fullKey = `b-${bx}-${by}-${colIdx}-${rowIdx}`;
                            const isSelected = selectedCardKey === fullKey;
                            const isMainBlock = bx === 1 && by === 1;

                            // Compute exact subpixel delta from the absolute center coordinate
                            const cardCenterX = bx * BLOCK_WIDTH + colIdx * (CARD_WIDTH + GAP_X) + CARD_WIDTH / 2;
                            const cardCenterY = by * BLOCK_HEIGHT + rowIdx * (CARD_HEIGHT + GAP_Y) + staggerOffset + CARD_HEIGHT / 2;
                            const deltaX = cardCenterX - CENTER_CARD_X;
                            const deltaY = cardCenterY - CENTER_CARD_Y;
                            const dist = Math.sqrt(deltaX * deltaX + deltaY * deltaY);

                            return (
                              <motion.div
                                key={fullKey}
                                ref={(el) => {
                                  cardRefs.current[fullKey] = el;
                                }}
                                initial={
                                  isMainBlock
                                    ? {
                                      x: -deltaX,
                                      y: -deltaY,
                                      scale: 1,
                                      opacity: 1,
                                      rotate: 0,
                                    }
                                    : {
                                      x: 0,
                                      y: 0,
                                      scale: 1,
                                      opacity: 0,
                                      rotate: 0,
                                    }
                                }
                                animate={
                                  isMainBlock
                                    ? isGathered
                                      ? {
                                        x: -deltaX,
                                        y: -deltaY,
                                        scale: 1,
                                        opacity: 1,
                                        rotate: 0,
                                      }
                                      : {
                                        x: 0,
                                        y: 0,
                                        scale: isSelected ? 1.05 : 1,
                                        opacity: 1,
                                        rotate: 0,
                                      }
                                    : {
                                      x: 0,
                                      y: 0,
                                      scale: 1,
                                      opacity: isGathered ? 0 : 1,
                                      rotate: 0,
                                    }
                                }
                                whileHover={{ scale: isBloomed && !isGathered ? 1.03 : 1 }}
                                transition={
                                  isMainBlock
                                    ? isGathered
                                      ? {
                                        duration: isMobile ? 0.28 : 0.38,
                                        ease: [0.38, 0, 0.25, 1],
                                      }
                                      : {
                                        duration: isMobile ? 0.65 : 0.85,
                                        ease: [0.16, 1, 0.3, 1],
                                        delay: Math.min(0.12, (dist / 1400) * 0.1),
                                      }
                                    : {
                                      duration: isGathered ? (isMobile ? 0.18 : 0.25) : (isMobile ? 0.45 : 0.65),
                                      ease: 'easeOut',
                                    }
                                }
                                onClick={() => isBloomed && !isGathered && handleCardClick(fullKey)}
                                className={`group relative rounded-xl md:rounded-2xl overflow-hidden cursor-pointer shrink-0 will-change-transform transition-[border-color,box-shadow,opacity] duration-500 ${!isBloomed || isGathered
                                    ? 'border border-transparent ring-0 outline-none shadow-none'
                                    : isSelected
                                      ? 'border-transparent ring-2 ring-white shadow-[0_0_35px_rgba(255,255,255,0.4)]'
                                      : 'border border-white/10 hover:border-white/40 shadow-lg'
                                  }`}
                                style={{
                                  width: `${CARD_WIDTH}px`,
                                  height: `${CARD_HEIGHT}px`,
                                  minWidth: `${CARD_WIDTH}px`,
                                  maxWidth: `${CARD_WIDTH}px`,
                                  minHeight: `${CARD_HEIGHT}px`,
                                  maxHeight: `${CARD_HEIGHT}px`,
                                  flexShrink: 0,
                                  pointerEvents: isBloomed && !isGathered ? 'auto' : 'none',
                                  zIndex: isSelected
                                    ? 40
                                    : (isGathered || !isBloomed) && isMainBlock
                                      ? Math.max(1, 30 - Math.round(dist / 60))
                                      : 10,
                                }}
                              >
                                {/* Pure, Clean Image (100% Identical Height & Width) */}
                                <img
                                  src={card.src}
                                  alt={card.title}
                                  loading="lazy"
                                  draggable={false}
                                  className={`w-full h-full object-cover transition-transform duration-500 ease-out select-none ${isSelected ? 'scale-105' : 'group-hover:scale-105'
                                    }`}
                                />

                                {/* Subtle Dark Gradient & Clean Title on Hover/Selected */}
                                <div
                                  className={`absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent flex items-end p-2.5 transition-opacity duration-200 ${isSelected ? 'opacity-100' : 'opacity-0 group-hover:opacity-100'
                                    }`}
                                >
                                  <span className="text-xs font-semibold text-white/90 truncate tracking-tight">
                                    {card.title}
                                  </span>
                                </div>
                              </motion.div>
                            );
                          })}
                        </div>
                      );
                    })}
                  </div>
                );
              })
            )}
          </div>
        </div>

        {/* ── Progressive Blur (Pure Black) on the Left Side ── */}
        <div className="absolute top-0 left-0 bottom-0 w-16 sm:w-28 md:w-44 lg:w-52 pointer-events-none z-30 overflow-hidden">
          <div
            className="absolute inset-0 backdrop-blur-[2px]"
            style={{
              maskImage: 'linear-gradient(to right, rgba(0,0,0,1) 0%, rgba(0,0,0,0) 45%)',
              WebkitMaskImage: 'linear-gradient(to right, rgba(0,0,0,1) 0%, rgba(0,0,0,0) 45%)',
            }}
          />
          <div
            className="absolute inset-0 backdrop-blur-[5px]"
            style={{
              maskImage: 'linear-gradient(to right, rgba(0,0,0,1) 0%, rgba(0,0,0,0) 70%)',
              WebkitMaskImage: 'linear-gradient(to right, rgba(0,0,0,1) 0%, rgba(0,0,0,0) 70%)',
            }}
          />
          <div
            className="absolute inset-0 backdrop-blur-[10px]"
            style={{
              maskImage: 'linear-gradient(to right, rgba(0,0,0,1) 0%, rgba(0,0,0,0) 100%)',
              WebkitMaskImage: 'linear-gradient(to right, rgba(0,0,0,1) 0%, rgba(0,0,0,0) 100%)',
            }}
          />
          <div className="absolute inset-0 bg-gradient-to-r from-[#0A0A0C]/90 via-[#0A0A0C]/35 to-transparent" />
        </div>

        {/* ── Progressive Blur (Pure Black) on the Right Side ── */}
        <div className="absolute top-0 right-0 bottom-0 w-16 sm:w-28 md:w-44 lg:w-52 pointer-events-none z-30 overflow-hidden">
          <div
            className="absolute inset-0 backdrop-blur-[2px]"
            style={{
              maskImage: 'linear-gradient(to left, rgba(0,0,0,1) 0%, rgba(0,0,0,0) 45%)',
              WebkitMaskImage: 'linear-gradient(to left, rgba(0,0,0,1) 0%, rgba(0,0,0,0) 45%)',
            }}
          />
          <div
            className="absolute inset-0 backdrop-blur-[5px]"
            style={{
              maskImage: 'linear-gradient(to left, rgba(0,0,0,1) 0%, rgba(0,0,0,0) 70%)',
              WebkitMaskImage: 'linear-gradient(to left, rgba(0,0,0,1) 0%, rgba(0,0,0,0) 70%)',
            }}
          />
          <div
            className="absolute inset-0 backdrop-blur-[10px]"
            style={{
              maskImage: 'linear-gradient(to left, rgba(0,0,0,1) 0%, rgba(0,0,0,0) 100%)',
              WebkitMaskImage: 'linear-gradient(to left, rgba(0,0,0,1) 0%, rgba(0,0,0,0) 100%)',
            }}
          />
          <div className="absolute inset-0 bg-gradient-to-l from-[#0A0A0C]/90 via-[#0A0A0C]/35 to-transparent" />
        </div>

        {/* Top & Bottom Soft Fade (Pure Black) */}
        <div className="absolute top-0 inset-x-0 h-20 bg-gradient-to-b from-[#0A0A0C]/90 via-[#0A0A0C]/40 to-transparent pointer-events-none z-30" />
        <div className="absolute bottom-0 inset-x-0 h-24 bg-gradient-to-t from-[#0A0A0C]/90 via-[#0A0A0C]/45 to-transparent pointer-events-none z-30" />

        {/* ── Fixed Bottom Tab Menu (z-40) ── */}
        <div className="absolute bottom-5 sm:bottom-8 inset-x-0 z-40 flex items-center justify-center pointer-events-none px-4">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.85, duration: 0.45, ease: [0.16, 1, 0.3, 1] }}
            className="pointer-events-auto flex items-center justify-center gap-1 sm:gap-1.5 p-1 sm:p-1.5 rounded-full bg-[#111114]/90 backdrop-blur-2xl border border-white/15 shadow-[0_12px_40px_rgba(0,0,0,0.8)] w-fit max-w-[95vw] touch-manipulation select-none"
          >
            {CATEGORY_ITEMS.map((item) => {
              const isActive = activeCategory === item.label;
              const Icon = item.icon;
              return (
                <button
                  key={item.label}
                  type="button"
                  onClick={() => handleCategorySelect(item.label)}
                  aria-label={item.label}
                  className={`relative flex items-center justify-center rounded-full font-semibold transition-all duration-150 cursor-pointer whitespace-nowrap active:scale-95 touch-manipulation select-none ${isActive
                      ? 'bg-white text-[#0A0A0C] font-bold shadow-md'
                      : 'text-white/60 sm:hover:text-white sm:hover:bg-white/10 active:bg-white/20 active:text-white'
                    } px-4 py-2.5 sm:px-5 sm:py-2 text-xs sm:text-sm`}
                >
                  <Icon className="w-4 h-4 shrink-0 sm:hidden" />
                  <span className="hidden sm:inline">{item.label}</span>
                </button>
              );
            })}
          </motion.div>
        </div>
      </div>
    </div>
  );
};
