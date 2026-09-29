import React, { useRef } from 'react';
import { motion, useScroll, useTransform } from 'framer-motion';
import { FadeIn } from '../components/FadeIn';
import { ArrowUpRight } from 'lucide-react';

interface ServiceItem {
  id: string;
  name: string;
  deliverables: string[];
}

const SERVICES: ServiceItem[] = [
  {
    id: '01',
    name: 'UI/UX & Product Design',
    deliverables: ['User Flows', 'Wireframes', 'Prototypes', 'Design Systems'],
  },
  {
    id: '02',
    name: 'Scalable Design Systems',
    deliverables: ['Figma Variables', 'Design Tokens', 'Component Libraries'],
  },
  {
    id: '03',
    name: 'Mobile App Design',
    deliverables: ['iOS HIG', 'Material 3', 'Micro-interactions'],
  },
  {
    id: '04',
    name: 'Web Design & Framer',
    deliverables: ['Landing Pages', 'Responsive Web', 'Framer Dev'],
  },
  {
    id: '05',
    name: 'Brand Identity & Visuals',
    deliverables: ['Logo Systems', 'Typography', 'Brand Guidelines'],
  },
];

/* ── Parallax service row ────────────────────── */
const ServiceRow: React.FC<{ service: ServiceItem; index: number }> = ({ service, index }) => {
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
      className="py-7 sm:py-9 group hover:bg-[#F8FAFC]/80 px-2 sm:px-4 -mx-2 sm:-mx-4 rounded-2xl transition-[background] duration-200"
    >
      <div className="flex flex-col sm:flex-row sm:items-center gap-3 sm:gap-6">
        {/* Number */}
        <span className="font-mono text-sm font-semibold text-[#94A3B8] group-hover:text-[#0F172A] transition-colors shrink-0 w-10">
          /{service.id}
        </span>

        {/* Title */}
        <div className="flex items-center gap-2 sm:min-w-[260px]">
          <h3 className="font-display font-bold uppercase text-lg sm:text-xl md:text-2xl text-[#0F172A] tracking-tight group-hover:translate-x-1 transition-transform">
            {service.name}
          </h3>
          <ArrowUpRight className="w-4 h-4 text-slate-400 opacity-0 group-hover:opacity-100 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-all shrink-0" />
        </div>

        {/* Deliverable Tags — with independent parallax */}
        <motion.div style={{ x: tagsX }} className="flex flex-wrap gap-1.5 sm:ml-auto">
          {service.deliverables.map((item, idx) => (
            <span
              key={idx}
              className="text-xs px-2.5 py-1 rounded-full bg-white text-[#334155] border border-[#E2E8F0] font-medium shadow-2xs group-hover:border-slate-300 transition-colors"
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
      className="relative w-full bg-[#FFFFFF] text-[#0F172A] rounded-t-[44px] sm:rounded-t-[54px] md:rounded-t-[64px] px-5 sm:px-8 md:px-14 py-24 sm:py-32 md:py-36 z-0 shadow-2xl border-t border-[#E2E8F0] overflow-hidden"
    >
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
        <div className="divide-y divide-[#E2E8F0] border-b border-[#E2E8F0]">
          {SERVICES.map((service, index) => (
            <ServiceRow key={service.id} service={service} index={index} />
          ))}
        </div>
      </div>
    </section>
  );
};
