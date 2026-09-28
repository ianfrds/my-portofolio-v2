import React, { useRef } from 'react';
import { motion, useScroll, useTransform, MotionValue } from 'framer-motion';
import { FadeIn } from '../components/FadeIn';
import { LiveProjectButton } from '../components/LiveProjectButton';

interface ProjectData {
  id: string;
  name: string;
  category: string;
  col1Img1: string;
  col1Img2: string;
  col2Img: string;
  link?: string;
}

const PROJECTS: ProjectData[] = [
  {
    id: '01',
    name: 'FinFlow OS',
    category: 'Product Design • Fintech',
    col1Img1:
      'https://images.higgs.ai/?default=1&output=webp&url=https%3A%2F%2Fd8j0ntlcm91z4.cloudfront.net%2Fuser_38xzZboKViGWJOttwIXH07lWA1P%2Fhf_20260412_055344_5eff02e0-87a5-41ce-b64f-eb08da8f33db.png&w=1280&q=85',
    col1Img2:
      'https://images.higgs.ai/?default=1&output=webp&url=https%3A%2F%2Fd8j0ntlcm91z4.cloudfront.net%2Fuser_38xzZboKViGWJOttwIXH07lWA1P%2Fhf_20260412_055431_11d841fd-8b41-46a5-82e4-b04f2407a7d8.png&w=1280&q=85',
    col2Img:
      'https://images.higgs.ai/?default=1&output=webp&url=https%3A%2F%2Fd8j0ntlcm91z4.cloudfront.net%2Fuser_38xzZboKViGWJOttwIXH07lWA1P%2Fhf_20260412_055451_e317bf2d-28d4-48cc-86b0-6f72f25b6327.png&w=1280&q=85',
    link: '#',
  },
  {
    id: '02',
    name: 'Lumina Spatial',
    category: 'Spatial UI/UX • Interaction',
    col1Img1:
      'https://images.higgs.ai/?default=1&output=webp&url=https%3A%2F%2Fd8j0ntlcm91z4.cloudfront.net%2Fuser_38xzZboKViGWJOttwIXH07lWA1P%2Fhf_20260412_055654_911201c5-36d9-4bc6-bac7-331adfce159f.png&w=1280&q=85',
    col1Img2:
      'https://images.higgs.ai/?default=1&output=webp&url=https%3A%2F%2Fd8j0ntlcm91z4.cloudfront.net%2Fuser_38xzZboKViGWJOttwIXH07lWA1P%2Fhf_20260412_055723_5ceda0b8-d9c2-4665-b2e3-83ba19ba76d1.png&w=1280&q=85',
    col2Img:
      'https://images.higgs.ai/?default=1&output=webp&url=https%3A%2F%2Fd8j0ntlcm91z4.cloudfront.net%2Fuser_38xzZboKViGWJOttwIXH07lWA1P%2Fhf_20260412_055753_adc5dcbd-a8e6-49c0-b43a-9b030d835cea.png&w=1280&q=85',
    link: '#',
  },
  {
    id: '03',
    name: 'Kroma Studio',
    category: 'Graphic Design • Branding',
    col1Img1:
      'https://images.higgs.ai/?default=1&output=webp&url=https%3A%2F%2Fd8j0ntlcm91z4.cloudfront.net%2Fuser_38xzZboKViGWJOttwIXH07lWA1P%2Fhf_20260412_055759_963cfb0b-4bd1-4b0f-9d0a-09bd6cf95b2f.png&w=1280&q=85',
    col1Img2:
      'https://images.higgs.ai/?default=1&output=webp&url=https%3A%2F%2Fd8j0ntlcm91z4.cloudfront.net%2Fuser_38xzZboKViGWJOttwIXH07lWA1P%2Fhf_20260412_060108_438f781a-9846-4dcc-89ab-c4e6cb830f5b.png&w=1280&q=85',
    col2Img:
      'https://images.higgs.ai/?default=1&output=webp&url=https%3A%2F%2Fd8j0ntlcm91z4.cloudfront.net%2Fuser_38xzZboKViGWJOttwIXH07lWA1P%2Fhf_20260412_055818_9d062121-ad7e-46b9-999a-1a6a692ef1ee.png&w=1280&q=85',
    link: '#',
  },
  {
    id: '04',
    name: 'Nexus Cloud',
    category: 'Enterprise SaaS • Data Viz',
    col1Img1:
      'https://motionsites.ai/assets/hero-celestia-preview-0yO3jXO8.gif',
    col1Img2:
      'https://motionsites.ai/assets/hero-space-voyage-preview-eECLH3Yc.gif',
    col2Img:
      'https://motionsites.ai/assets/hero-orbit-web3-preview-BXt4OttD.gif',
    link: '#',
  },
  {
    id: '05',
    name: 'Velox Lookbook',
    category: 'Web Design • E-Commerce',
    col1Img1:
      'https://motionsites.ai/assets/hero-luminex-preview-CxOP7ce6.gif',
    col1Img2:
      'https://motionsites.ai/assets/hero-stellar-ai-v2-preview-DjvxjG3C.gif',
    col2Img:
      'https://motionsites.ai/assets/hero-transform-data-preview-Cx5OU29N.gif',
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
  // Scale calculation: targetScale = 1 - (totalCards - 1 - index) * 0.03
  const targetScale = 1 - (totalCards - 1 - index) * 0.03;

  const rangeStart = index * (0.8 / totalCards);
  const rangeEnd = Math.min(1, (index + 1) * (1 / totalCards));
  const scale = useTransform(progress, [rangeStart, rangeEnd], [1, targetScale]);

  return (
    <div
      className="sticky flex items-start justify-center w-full mb-12 sm:mb-16 md:mb-20"
      style={{
        top: `calc(clamp(4.5rem, 7vw, 6.5rem) + ${index * 28}px)`,
        zIndex: index + 10,
      }}
    >
      <motion.div
        style={{
          scale,
          transformOrigin: 'top center',
        }}
        className="w-full max-w-6xl rounded-[32px] sm:rounded-[44px] md:rounded-[52px] border border-white/20 bg-[#0C0C0C]/95 backdrop-blur-2xl p-5 sm:p-7 md:p-9 shadow-[0_25px_70px_rgba(0,0,0,0.9)] will-change-transform relative overflow-hidden"
      >
        {/* Subtle accent highlight at top edge */}
        <div className="absolute top-0 left-10 right-10 h-[1px] bg-gradient-to-r from-transparent via-white/20 to-transparent" />

        {/* Top row */}
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 pb-6 sm:pb-8">
          <div className="flex items-center gap-5 sm:gap-7 flex-wrap">
            {/* Number */}
            <span
              className="font-display font-black text-white/90 leading-none select-none"
              style={{ fontSize: 'clamp(2.5rem, 5.5vw, 5rem)' }}
            >
              {project.id}
            </span>

            <div className="flex flex-col gap-1">
              <span className="text-xs font-mono uppercase tracking-widest text-[#D7E2EA]/60">
                {project.category}
              </span>
              <h3
                className="text-white font-display font-bold uppercase leading-tight tracking-wide"
                style={{ fontSize: 'clamp(1.2rem, 2.5vw, 2.3rem)' }}
              >
                {project.name}
              </h3>
            </div>
          </div>

          <div className="flex items-center self-start md:self-center">
            <LiveProjectButton href={project.link || '#'} />
          </div>
        </div>

        {/* Bottom row: Two-column image grid */}
        <div className="grid grid-cols-1 md:grid-cols-10 gap-3 sm:gap-4 md:gap-5 mt-2">
          {/* Left column (40% width) has 2 stacked images */}
          <div className="md:col-span-4 flex flex-col gap-3 sm:gap-4 md:gap-5">
            <div
              className="w-full rounded-[24px] sm:rounded-[32px] md:rounded-[40px] overflow-hidden bg-[#16171E] border border-white/[0.08]"
              style={{ height: 'clamp(130px, 16vw, 230px)' }}
            >
              <img
                src={project.col1Img1}
                alt={`${project.name} Detail 1`}
                loading="lazy"
                className="w-full h-full object-cover transition-transform duration-500 hover:scale-105"
              />
            </div>
            <div
              className="w-full rounded-[24px] sm:rounded-[32px] md:rounded-[40px] overflow-hidden bg-[#16171E] border border-white/[0.08]"
              style={{ height: 'clamp(160px, 22vw, 340px)' }}
            >
              <img
                src={project.col1Img2}
                alt={`${project.name} Detail 2`}
                loading="lazy"
                className="w-full h-full object-cover transition-transform duration-500 hover:scale-105"
              />
            </div>
          </div>

          {/* Right column (60% width) has 1 tall image */}
          <div className="md:col-span-6 flex">
            <div className="w-full h-[260px] sm:h-[340px] md:h-full min-h-[260px] rounded-[24px] sm:rounded-[32px] md:rounded-[40px] overflow-hidden bg-[#16171E] border border-white/[0.08]">
              <img
                src={project.col2Img}
                alt={`${project.name} Hero UI Screen`}
                loading="lazy"
                className="w-full h-full object-cover transition-transform duration-500 hover:scale-105"
              />
            </div>
          </div>
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
