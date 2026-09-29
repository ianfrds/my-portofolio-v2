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
      'https://images.higgs.ai/?default=1&output=webp&url=https%3A%2F%2Fd8j0ntlcm91z4.cloudfront.net%2Fuser_38xzZboKViGWJOttwIXH07lWA1P%2Fhf_20260412_055344_5eff02e0-87a5-41ce-b64f-eb08da8f33db.png&w=1280&q=85',
    thumbImg:
      'https://images.higgs.ai/?default=1&output=webp&url=https%3A%2F%2Fd8j0ntlcm91z4.cloudfront.net%2Fuser_38xzZboKViGWJOttwIXH07lWA1P%2Fhf_20260412_055451_e317bf2d-28d4-48cc-86b0-6f72f25b6327.png&w=1280&q=85',
    link: '#',
  },
  {
    id: '02',
    name: 'Lumina Spatial',
    category: 'Spatial UI/UX',
    year: '2025',
    tags: ['visionOS', 'Interaction', '3D UI'],
    heroImg:
      'https://images.higgs.ai/?default=1&output=webp&url=https%3A%2F%2Fd8j0ntlcm91z4.cloudfront.net%2Fuser_38xzZboKViGWJOttwIXH07lWA1P%2Fhf_20260412_055654_911201c5-36d9-4bc6-bac7-331adfce159f.png&w=1280&q=85',
    thumbImg:
      'https://images.higgs.ai/?default=1&output=webp&url=https%3A%2F%2Fd8j0ntlcm91z4.cloudfront.net%2Fuser_38xzZboKViGWJOttwIXH07lWA1P%2Fhf_20260412_055753_adc5dcbd-a8e6-49c0-b43a-9b030d835cea.png&w=1280&q=85',
    link: '#',
  },
  {
    id: '03',
    name: 'Kroma Studio',
    category: 'Brand Identity',
    year: '2025',
    tags: ['Branding', 'Visual Identity', 'Guidelines'],
    heroImg:
      'https://images.higgs.ai/?default=1&output=webp&url=https%3A%2F%2Fd8j0ntlcm91z4.cloudfront.net%2Fuser_38xzZboKViGWJOttwIXH07lWA1P%2Fhf_20260412_055759_963cfb0b-4bd1-4b0f-9d0a-09bd6cf95b2f.png&w=1280&q=85',
    thumbImg:
      'https://images.higgs.ai/?default=1&output=webp&url=https%3A%2F%2Fd8j0ntlcm91z4.cloudfront.net%2Fuser_38xzZboKViGWJOttwIXH07lWA1P%2Fhf_20260412_055818_9d062121-ad7e-46b9-999a-1a6a692ef1ee.png&w=1280&q=85',
    link: '#',
  },
  {
    id: '04',
    name: 'Nexus Cloud',
    category: 'Enterprise SaaS',
    year: '2024',
    tags: ['Data Viz', 'Analytics', 'B2B'],
    heroImg:
      'https://motionsites.ai/assets/hero-celestia-preview-0yO3jXO8.gif',
    thumbImg:
      'https://motionsites.ai/assets/hero-orbit-web3-preview-BXt4OttD.gif',
    link: '#',
  },
  {
    id: '05',
    name: 'Velox Lookbook',
    category: 'Web Design',
    year: '2024',
    tags: ['E-Commerce', 'Fashion', 'Framer'],
    heroImg:
      'https://motionsites.ai/assets/hero-luminex-preview-CxOP7ce6.gif',
    thumbImg:
      'https://motionsites.ai/assets/hero-stellar-ai-v2-preview-DjvxjG3C.gif',
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
              Case Studies
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
