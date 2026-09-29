import React, { useRef } from 'react';
import { motion, useScroll, useTransform, MotionValue } from 'framer-motion';
import { FadeIn } from '../components/FadeIn';
import { ArrowUpRight } from 'lucide-react';

interface ProjectData {
  id: string;
  name: string;
  category: string;
  year: string;
  tags: string[];
  heroImg: string;
  thumbImg: string;
  link?: string;
}

const PROJECTS: ProjectData[] = [
  {
    id: '01',
    name: 'FinFlow OS',
    category: 'Product Design',
    year: '2026',
    tags: ['Fintech', 'Dashboard', 'Design System'],
    heroImg:
      'https://i.pinimg.com/736x/08/03/38/0803384fc9fd7efd94aa0eb085d6b14b.jpg',
    thumbImg:
      'https://i.pinimg.com/736x/5d/06/43/5d0643fe56de4a616f83d67d21be2a69.jpg',
    link: '#',
  },
  {
    id: '02',
    name: 'Lumina Spatial',
    category: 'Spatial UI/UX',
    year: '2025',
    tags: ['visionOS', 'Interaction', '3D UI'],
    heroImg:
      'https://i.pinimg.com/736x/b7/66/27/b7662714904a08ff9e001957d3a3107c.jpg',
    thumbImg:
      'https://i.pinimg.com/736x/9e/bf/51/9ebf51493e40fb7abe051f843e281fdb.jpg',
    link: '#',
  },
  {
    id: '03',
    name: 'Kroma Studio',
    category: 'Brand Identity',
    year: '2025',
    tags: ['Branding', 'Visual Identity', 'Guidelines'],
    heroImg:
      'https://i.pinimg.com/736x/49/d2/78/49d278ffdd9385b3dfb2104f0009c58d.jpg',
    thumbImg:
      'https://i.pinimg.com/736x/fe/84/2b/fe842b0bbdb22e01a0cea0ad3fa91b12.jpg',
    link: '#',
  },
  {
    id: '04',
    name: 'Nexus Cloud',
    category: 'Enterprise SaaS',
    year: '2024',
    tags: ['Data Viz', 'Analytics', 'B2B'],
    heroImg:
      'https://i.pinimg.com/736x/e6/4c/ea/e64cea0ce9fc99e659cad162b0bd5643.jpg',
    thumbImg:
      'https://i.pinimg.com/736x/5a/69/f8/5a69f87ad6650c58f3f7c704084a2f5d.jpg',
    link: '#',
  },
  {
    id: '05',
    name: 'Velox Lookbook',
    category: 'Web Design',
    year: '2024',
    tags: ['E-Commerce', 'Fashion', 'Framer'],
    heroImg:
      'https://i.pinimg.com/736x/0a/39/ff/0a39ff2ab2e4b3029b2bbc6a5de6924d.jpg',
    thumbImg:
      'https://i.pinimg.com/736x/0f/48/9c/0f489c88aaf9cb663283e1b5bbdf91b7.jpg',
    link: '#',
  },
];

interface ProjectCardProps {
  project: ProjectData;
  index: number;
  totalCards: number;
  progress: MotionValue<number>;
}

const ProjectCard: React.FC<ProjectCardProps> = ({
  project,
  index,
  totalCards,
  progress,
}) => {
  const targetScale = 1 - (totalCards - 1 - index) * 0.03;
  const rangeStart = index * (0.8 / totalCards);
  const rangeEnd = Math.min(1, (index + 1) * (1 / totalCards));
  const scale = useTransform(progress, [rangeStart, rangeEnd], [1, targetScale]);

  return (
    <div
      className="sticky flex items-start justify-center w-full mb-10 sm:mb-14 md:mb-16"
      style={{
        top: `calc(clamp(4.5rem, 7vw, 6.5rem) + ${index * 28}px)`,
        zIndex: index + 10,
      }}
    >
      <motion.div
        style={{ scale, transformOrigin: 'top center' }}
        className="w-full max-w-6xl group relative overflow-hidden rounded-[28px] sm:rounded-[36px] md:rounded-[44px] border border-white/[0.08] bg-[#111113] shadow-[0_30px_80px_rgba(0,0,0,0.9)] will-change-transform"
      >
        {/* Top edge glow */}
        <div className="absolute top-0 left-10 right-10 h-px bg-gradient-to-r from-transparent via-white/15 to-transparent z-20" />

        {/* ── Hero image area ── */}
        <div className="relative w-full overflow-hidden" style={{ height: 'clamp(260px, 42vw, 520px)' }}>
          <img
            src={project.heroImg}
            alt={`${project.name} hero`}
            loading="lazy"
            className="w-full h-full object-cover transition-transform duration-700 ease-out group-hover:scale-[1.04]"
          />

          {/* Gradient overlay at bottom for text readability */}
          <div className="absolute inset-0 bg-gradient-to-t from-[#111113] via-[#111113]/30 to-transparent pointer-events-none" />

          {/* Number badge — top left */}
          <div className="absolute top-5 left-6 sm:top-7 sm:left-8 z-10">
            <span className="font-mono text-xs font-semibold text-white/50 bg-white/[0.06] backdrop-blur-md border border-white/[0.08] px-3 py-1.5 rounded-full">
              /{project.id}
            </span>
          </div>

          {/* Year badge — top right */}
          <div className="absolute top-5 right-6 sm:top-7 sm:right-8 z-10">
            <span className="font-mono text-xs font-semibold text-white/50 bg-white/[0.06] backdrop-blur-md border border-white/[0.08] px-3 py-1.5 rounded-full">
              {project.year}
            </span>
          </div>

          {/* Thumbnail preview — bottom right, overlapping into info area */}
          <div className="absolute bottom-[-20px] right-6 sm:right-8 z-20 hidden sm:block">
            <div className="w-[140px] md:w-[180px] h-[90px] md:h-[110px] rounded-2xl overflow-hidden border-2 border-[#111113] shadow-2xl ring-1 ring-white/[0.06]">
              <img
                src={project.thumbImg}
                alt={`${project.name} thumbnail`}
                loading="lazy"
                className="w-full h-full object-cover"
              />
            </div>
          </div>
        </div>

        {/* ── Info bar at bottom ── */}
        <div className="relative z-10 px-6 sm:px-8 py-5 sm:py-6 flex flex-col sm:flex-row sm:items-center gap-4 sm:gap-6">
          {/* Left: title + category */}
          <div className="flex-1 min-w-0">
            <h3 className="font-display font-bold text-white text-xl sm:text-2xl md:text-3xl tracking-tight leading-tight truncate">
              {project.name}
            </h3>
            <span className="text-xs font-mono uppercase tracking-widest text-white/40 mt-1 block">
              {project.category}
            </span>
          </div>

          {/* Center: tags */}
          <div className="flex flex-wrap gap-1.5 sm:gap-2 sm:justify-end">
            {project.tags.map((tag, idx) => (
              <span
                key={idx}
                className="text-[10px] sm:text-xs px-2.5 py-1 rounded-full bg-white/[0.04] text-white/50 border border-white/[0.06] font-medium"
              >
                {tag}
              </span>
            ))}
          </div>

          {/* Right: CTA button */}
          <a
            href={project.link || '#'}
            className="flex items-center gap-2 px-5 py-2.5 rounded-full bg-white text-[#0F172A] text-xs font-semibold uppercase tracking-wider hover:bg-white/90 transition-all hover:scale-105 shrink-0 group/btn"
          >
            <span>View</span>
            <ArrowUpRight className="w-3.5 h-3.5 transition-transform group-hover/btn:translate-x-0.5 group-hover/btn:-translate-y-0.5" />
          </a>
        </div>
      </motion.div>
    </div>
  );
};

export const ProjectsSection: React.FC = () => {
  const containerRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ['start start', 'end end'],
  });

  return (
    <section
      id="projects"
      className="relative w-full bg-[#0C0C0C] rounded-t-[40px] sm:rounded-t-[50px] md:rounded-t-[60px] -mt-10 sm:-mt-12 md:-mt-14 z-10 px-5 sm:px-8 md:px-12 pt-24 sm:pt-28 md:pt-36 pb-40"
    >
      <div className="max-w-6xl mx-auto w-full">
        {/* Heading */}
        <div className="flex flex-col items-center text-center mb-14 sm:mb-18 md:mb-24">
          <FadeIn delay={0.1} y={35} className="w-full text-center">
            <h2
              className="hero-heading font-display font-black uppercase leading-none tracking-tight text-center"
              style={{ fontSize: 'clamp(2.8rem, 8vw, 110px)' }}
            >
              Latest Project
            </h2>
          </FadeIn>
        </div>

        {/* Sticky-stacking project cards container */}
        <div ref={containerRef} className="relative w-full flex flex-col pb-24">
          {PROJECTS.map((project, index) => (
            <ProjectCard
              key={project.id}
              project={project}
              index={index}
              totalCards={PROJECTS.length}
              progress={scrollYProgress}
            />
          ))}
        </div>
      </div>
    </section>
  );
};
