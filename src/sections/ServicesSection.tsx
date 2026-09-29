import React, { useRef, useState, useEffect } from 'react';
import { motion, useScroll, useTransform, useSpring, AnimatePresence } from 'framer-motion';
import { FadeIn } from '../components/FadeIn';
import { ArrowUpRight } from 'lucide-react';

interface ServiceItem {
  id: string;
  name: string;
  deliverables: string[];
  image: string;
  accent: string;
  badge: string;
  rotate: number;
}

const SERVICES: ServiceItem[] = [
  {
    id: '01',
    name: 'UI/UX & Product Design',
    deliverables: ['User Flows', 'Wireframes', 'Prototypes', 'Design Systems'],
    image:
      'https://images.higgs.ai/?default=1&output=webp&url=https%3A%2F%2Fd8j0ntlcm91z4.cloudfront.net%2Fuser_38xzZboKViGWJOttwIXH07lWA1P%2Fhf_20260412_055344_5eff02e0-87a5-41ce-b64f-eb08da8f33db.png&w=1280&q=85',
    accent: '#10B981', // emerald
    badge: 'Fintech & SaaS',
    rotate: 3,
  },
  {
    id: '02',
    name: 'Scalable Design Systems',
    deliverables: ['Figma Variables', 'Design Tokens', 'Component Libraries'],
    image:
      'https://images.higgs.ai/?default=1&output=webp&url=https%3A%2F%2Fd8j0ntlcm91z4.cloudfront.net%2Fuser_38xzZboKViGWJOttwIXH07lWA1P%2Fhf_20260412_055451_e317bf2d-28d4-48cc-86b0-6f72f25b6327.png&w=1280&q=85',
    accent: '#6366F1', // indigo
    badge: 'Tokens & UI Kits',
    rotate: -2.5,
  },
  {
    id: '03',
    name: 'Mobile App Design',
    deliverables: ['iOS HIG', 'Material 3', 'Micro-interactions'],
    image:
      'https://images.higgs.ai/?default=1&output=webp&url=https%3A%2F%2Fd8j0ntlcm91z4.cloudfront.net%2Fuser_38xzZboKViGWJOttwIXH07lWA1P%2Fhf_20260412_055654_911201c5-36d9-4bc6-bac7-331adfce159f.png&w=1280&q=85',
    accent: '#F97316', // coral
    badge: 'iOS & Android',
    rotate: 2,
  },
  {
    id: '04',
    name: 'Web Design & Framer',
    deliverables: ['Landing Pages', 'Responsive Web', 'Framer Dev'],
    image:
      'https://images.higgs.ai/?default=1&output=webp&url=https%3A%2F%2Fd8j0ntlcm91z4.cloudfront.net%2Fuser_38xzZboKViGWJOttwIXH07lWA1P%2Fhf_20260412_055818_9d062121-ad7e-46b9-999a-1a6a692ef1ee.png&w=1280&q=85',
    accent: '#A855F7', // purple
    badge: 'High-Conversion Web',
    rotate: -3,
  },
  {
    id: '05',
    name: 'Brand Identity & Visuals',
    deliverables: ['Logo Systems', 'Typography', 'Brand Guidelines'],
    image:
      'https://images.higgs.ai/?default=1&output=webp&url=https%3A%2F%2Fd8j0ntlcm91z4.cloudfront.net%2Fuser_38xzZboKViGWJOttwIXH07lWA1P%2Fhf_20260412_055759_963cfb0b-4bd1-4b0f-9d0a-09bd6cf95b2f.png&w=1280&q=85',
    accent: '#EC4899', // pink
    badge: 'Branding & Identity',
    rotate: 3.5,
  },
];

/* ── Parallax service row with hover preview ────────── */
const ServiceRow: React.FC<{
  service: ServiceItem;
  index: number;
  isHovered: boolean;
  onHoverStart: () => void;
  onHoverEnd: () => void;
}> = ({ service, index, isHovered, onHoverStart, onHoverEnd }) => {
  const rowRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: rowRef,
    offset: ['start end', 'end start'],
  });

  // All rows enter from the left with staggered intensity based on index
  const offset = 40 + index * 10;
  const x = useTransform(scrollYProgress, [0, 0.5, 1], [-offset, 0, 10]);
  const y = useTransform(scrollYProgress, [0, 0.5, 1], [30, 0, -15]);
  const opacity = useTransform(scrollYProgress, [0, 0.25, 0.75, 1], [0.3, 1, 1, 0.6]);

  // Tags enter from the left too, slightly slower
  const tagsX = useTransform(scrollYProgress, [0, 0.5, 1], [-20, 0, 5]);

  return (
    <motion.div
      ref={rowRef}
      style={{ x, y, opacity }}
      onMouseEnter={onHoverStart}
      onMouseLeave={onHoverEnd}
      className={`relative py-7 sm:py-9 px-3 sm:px-6 -mx-3 sm:-mx-6 rounded-2xl transition-all duration-300 cursor-pointer ${
        isHovered ? 'bg-[#F1F5F9]/80 shadow-xs' : 'hover:bg-[#F8FAFC]/60'
      }`}
    >
      <div className="flex flex-col sm:flex-row sm:items-center gap-3 sm:gap-6 relative z-10">
        {/* Number */}
        <span
          className="font-mono text-sm font-semibold transition-colors shrink-0 w-10"
          style={{ color: isHovered ? service.accent : '#94A3B8' }}
        >
          /{service.id}
        </span>

        {/* Title */}
        <div className="flex items-center gap-2.5 sm:min-w-[280px]">
          <h3
            className="font-display font-bold uppercase text-lg sm:text-xl md:text-2xl text-[#0F172A] tracking-tight transition-transform duration-300"
            style={{ transform: isHovered ? 'translateX(6px)' : 'translateX(0)' }}
          >
            {service.name}
          </h3>
          <span
            className="w-6 h-6 rounded-full flex items-center justify-center transition-all duration-300"
            style={{
              backgroundColor: isHovered ? service.accent : 'transparent',
              opacity: isHovered ? 1 : 0,
              transform: isHovered ? 'scale(1) translate(2px, -2px)' : 'scale(0.8) translate(0, 0)',
            }}
          >
            <ArrowUpRight className="w-3.5 h-3.5 text-white" />
          </span>
        </div>

        {/* Mobile Inline Preview Thumbnail (visible on small screens) */}
        <div className="sm:hidden w-full h-32 rounded-xl overflow-hidden mt-1 border border-black/[0.08] shadow-xs">
          <img
            src={service.image}
            alt={service.name}
            className="w-full h-full object-cover"
          />
        </div>

        {/* Deliverable Tags — with independent parallax */}
        <motion.div style={{ x: tagsX }} className="flex flex-wrap gap-1.5 sm:ml-auto">
          {service.deliverables.map((item, idx) => (
            <span
              key={idx}
              className="text-xs px-2.5 py-1 rounded-full bg-white text-[#334155] border font-medium shadow-2xs transition-colors duration-200"
              style={{
                borderColor: isHovered ? `${service.accent}60` : '#E2E8F0',
                color: isHovered ? '#0F172A' : '#475569',
              }}
            >
              {item}
            </span>
          ))}
        </motion.div>
      </div>
    </motion.div>
  );
};

export const ServicesSection: React.FC = () => {
  const sectionRef = useRef<HTMLElement>(null);
  const [activeService, setActiveService] = useState<ServiceItem | null>(null);
  const [mousePos, setMousePos] = useState({ x: 0, y: 0 });

  // Spring physics for buttery magnetic floating image
  const springX = useSpring(0, { damping: 22, stiffness: 200, mass: 0.5 });
  const springY = useSpring(0, { damping: 22, stiffness: 200, mass: 0.5 });

  const handleMouseMove = (e: React.MouseEvent) => {
    // Keep image slightly to the right & centered vertically relative to cursor
    setMousePos({ x: e.clientX + 30, y: e.clientY - 20 });
  };

  useEffect(() => {
    springX.set(mousePos.x);
    springY.set(mousePos.y);
  }, [mousePos, springX, springY]);

  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ['start end', 'end start'],
  });

  // Header parallax — title moves up slower than scroll, creating depth
  const headerY = useTransform(scrollYProgress, [0, 1], [60, -40]);
  const headerOpacity = useTransform(scrollYProgress, [0, 0.15, 0.8, 1], [0, 1, 1, 0.5]);

  // Subtle background gradient shift
  const bgY = useTransform(scrollYProgress, [0, 1], ['0%', '-8%']);

  return (
    <section
      ref={sectionRef}
      id="services"
      onMouseMove={handleMouseMove}
      className="relative w-full bg-[#FFFFFF] text-[#0F172A] rounded-t-[44px] sm:rounded-t-[54px] md:rounded-t-[64px] px-5 sm:px-8 md:px-14 py-24 sm:py-32 md:py-36 z-0 shadow-2xl border-t border-[#E2E8F0] overflow-hidden"
    >
      {/* ── Magnetic Floating Image Preview (Desktop) ── */}
      <motion.div
        style={{
          x: springX,
          y: springY,
          translateX: '-20%',
          translateY: '-50%',
        }}
        className="fixed top-0 left-0 pointer-events-none z-50 hidden sm:block"
      >
        <AnimatePresence mode="wait">
          {activeService && (
            <motion.div
              key={activeService.id}
              initial={{ scale: 0.75, opacity: 0, rotate: activeService.rotate * 1.8 }}
              animate={{ scale: 1, opacity: 1, rotate: activeService.rotate }}
              exit={{ scale: 0.75, opacity: 0, rotate: activeService.rotate * 2 }}
              transition={{ duration: 0.28, ease: [0.22, 1, 0.36, 1] }}
              className="relative w-72 sm:w-80 md:w-[340px] aspect-[16/10] rounded-2xl overflow-hidden shadow-2xl bg-slate-900 border-2"
              style={{
                borderColor: `${activeService.accent}80`,
                boxShadow: `0 25px 50px -12px rgba(15, 23, 42, 0.35), 0 0 35px -5px ${activeService.accent}30`,
              }}
            >
              {/* Preview Image */}
              <img
                src={activeService.image}
                alt={activeService.name}
                className="w-full h-full object-cover"
              />

              {/* Gradient Overlay & Metadata Pill */}
              <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/20 to-transparent flex items-end p-4">
                <div className="flex items-center justify-between w-full">
                  <span
                    className="text-xs font-bold px-3 py-1 rounded-full text-white shadow-sm flex items-center gap-1.5"
                    style={{ backgroundColor: activeService.accent }}
                  >
                    <span className="w-1.5 h-1.5 rounded-full bg-white animate-pulse" />
                    <span>{activeService.badge}</span>
                  </span>
                  <span className="font-mono text-xs text-white/80 font-semibold">
                    /{activeService.id}
                  </span>
                </div>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </motion.div>

      {/* Parallax decorative background circle */}
      <motion.div
        style={{ y: bgY }}
        className="absolute -top-32 -right-32 w-[500px] h-[500px] rounded-full bg-gradient-to-br from-slate-100/80 to-transparent pointer-events-none blur-3xl"
      />
      <motion.div
        style={{ y: useTransform(scrollYProgress, [0, 1], ['0%', '-12%']) }}
        className="absolute -bottom-20 -left-20 w-[400px] h-[400px] rounded-full bg-gradient-to-tr from-blue-50/50 to-transparent pointer-events-none blur-3xl"
      />

      <div className="max-w-6xl mx-auto w-full relative z-10">
        {/* Section Header with parallax */}
        <motion.div
          style={{ y: headerY, opacity: headerOpacity }}
          className="mb-12 sm:mb-16 md:mb-20 pb-8 border-b border-[#E2E8F0]"
        >
          <FadeIn delay={0} y={15}>
            <span className="text-xs font-mono uppercase tracking-widest text-[#64748B] mb-2 block font-semibold">
              // WHAT I DO
            </span>
          </FadeIn>
          <FadeIn delay={0.1} y={25}>
            <h2
              className="font-display font-black uppercase text-[#0F172A] leading-none tracking-tight"
              style={{ fontSize: 'clamp(2.5rem, 7vw, 90px)' }}
            >
              Services
            </h2>
          </FadeIn>
        </motion.div>

        {/* Parallax Services List */}
        <div
          className="divide-y divide-[#E2E8F0] border-b border-[#E2E8F0]"
          onMouseLeave={() => setActiveService(null)}
        >
          {SERVICES.map((service, index) => (
            <ServiceRow
              key={service.id}
              service={service}
              index={index}
              isHovered={activeService?.id === service.id}
              onHoverStart={() => setActiveService(service)}
              onHoverEnd={() => {
                // Kept smooth via mouseLeave on container or next row
              }}
            />
          ))}
        </div>
      </div>
    </section>
  );
};

