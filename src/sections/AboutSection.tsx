import React, { useRef } from 'react';
import { motion, useScroll, useTransform } from 'framer-motion';
import { FadeIn } from '../components/FadeIn';
import { AnimatedText } from '../components/AnimatedText';
import { ContactButton } from '../components/ContactButton';

interface ToolItem {
  name: string;
  logo: string;
}

const SOFTWARE: ToolItem[] = [
  {
    name: 'Figma',
    logo: 'https://api.iconify.design/logos:figma.svg',
  },
  {
    name: 'Framer',
    logo: 'https://api.iconify.design/logos:framer.svg',
  },
  {
    name: 'Canva',
    logo: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/canva/canva-original.svg',
  },
  {
    name: 'Photoshop',
    logo: 'https://api.iconify.design/logos:adobe-photoshop.svg',
  },
  {
    name: 'PowerPoint',
    logo: 'https://api.iconify.design/vscode-icons:file-type-powerpoint.svg',
  },
];

export const AboutSection: React.FC = () => {
  const sectionRef = useRef<HTMLElement>(null);
  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ['start end', 'end start'],
  });

  // Parallax: Vertical scrolling depth effect for the ABOUT title
  const titleY = useTransform(scrollYProgress, [0, 1], [-70, 70]);
  const headingOpacity = useTransform(scrollYProgress, [0, 0.2, 0.8, 1], [0.35, 1, 1, 0.35]);

  return (
    <section
      ref={sectionRef}
      id="about"
      className="relative min-h-screen w-full flex flex-col items-center justify-center px-5 sm:px-8 md:px-10 py-24 sm:py-32 overflow-hidden bg-[#0C0C0C] select-none"
    >
      {/* Background subtle neutral lighting */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[700px] h-[400px] bg-white/[0.02] rounded-full blur-[140px] pointer-events-none" />

      {/* Center content */}
      <div className="relative z-10 flex flex-col items-center text-center w-full">
        {/* Subtitle tag */}
        <FadeIn delay={0} y={20}>
          <span className="text-xs font-mono uppercase tracking-widest text-[#94A3B8] mb-4 block font-semibold">
            // PHILOSOPHY &amp; APPROACH
          </span>
        </FadeIn>

        {/* Parallax Heading: ABOUT */}
        <div className="w-full py-4 flex items-center justify-center">
          <motion.h2
            style={{
              y: titleY,
              opacity: headingOpacity,
              fontSize: 'clamp(3rem, 11vw, 130px)',
            }}
            className="hero-heading font-display font-black uppercase tracking-tight text-center whitespace-nowrap leading-none select-none"
          >
            About
          </motion.h2>
        </div>

        {/* Gap between heading and text */}
        <div className="h-8 sm:h-12 md:h-14" />

        {/* Animated paragraph */}
        <div
          className="text-[#D7E2EA] font-medium text-center leading-relaxed max-w-[640px] mx-auto px-4"
          style={{ fontSize: 'clamp(1.05rem, 1.9vw, 1.4rem)' }}
        >
          <AnimatedText
            text="A UI/UX & Graphic Designer with an Informatics background, crafting intuitive mobile apps, web dashboards, and high-impact visual experiences."
            className="text-center font-normal"
          />
        </div>

        {/* Software & Tools with Logos */}
        <FadeIn delay={0.25} y={25} className="mt-10 sm:mt-12 w-full">
          <div className="flex flex-wrap items-center justify-center gap-2.5 sm:gap-3.5 max-w-2xl mx-auto">
            {SOFTWARE.map((tool) => (
              <motion.div
                key={tool.name}
                whileHover={{ y: -3, scale: 1.04 }}
                transition={{ duration: 0.2 }}
                className="inline-flex items-center gap-2.5 px-4 py-2 sm:px-5 sm:py-2.5 rounded-full text-xs sm:text-sm font-semibold bg-white/[0.04] border border-white/[0.1] text-[#D7E2EA] hover:border-white/40 hover:text-white hover:bg-white/[0.08] transition-all shadow-sm group cursor-default"
              >
                <img
                  src={tool.logo}
                  alt={tool.name}
                  className="w-4 h-4 sm:w-5 sm:h-5 object-contain shrink-0 group-hover:scale-110 transition-transform"
                  loading="lazy"
                />
                <span>{tool.name}</span>
              </motion.div>
            ))}
          </div>
        </FadeIn>

        {/* Gap between text block and button */}
        <div className="h-12 sm:h-16" />

        <FadeIn delay={0.3} y={20}>
          <ContactButton href="#contact" label="Start a Conversation" />
        </FadeIn>
      </div>
    </section>
  );
};
