import React, { useRef, useState, useEffect } from 'react';
import { FadeIn } from '../components/FadeIn';

interface MarqueeItem {
  src: string;
  tag: string;
  category: string;
}

const ROW_1_DATA: MarqueeItem[] = [
  {
    src: 'https://motionsites.ai/assets/hero-space-voyage-preview-eECLH3Yc.gif',
    tag: 'Web3 & Spatial UX',
    category: 'Product Design',
  },
  {
    src: 'https://motionsites.ai/assets/hero-codenest-preview-Cgppc2qV.gif',
    tag: 'Developer Cloud IDE',
    category: 'Design System',
  },
  {
    src: 'https://motionsites.ai/assets/hero-vex-ventures-preview-BczMFIiw.gif',
    tag: 'Venture Capital Brand',
    category: 'Brand Identity',
  },
  {
    src: 'https://motionsites.ai/assets/hero-stellar-ai-v2-preview-DjvxjG3C.gif',
    tag: 'AI Generative Canvas',
    category: 'UI/UX Interface',
  },
  {
    src: 'https://motionsites.ai/assets/hero-asme-preview-B_nGDnTP.gif',
    tag: 'Precision Engineering OS',
    category: 'Enterprise SaaS',
  },
  {
    src: 'https://motionsites.ai/assets/hero-transform-data-preview-Cx5OU29N.gif',
    tag: 'Analytics & Data Viz',
    category: 'Dashboard UX',
  },
  {
    src: 'https://motionsites.ai/assets/hero-vitara-preview-Cjz2QYyU.gif',
    tag: 'Automotive Digital Cluster',
    category: 'HMI / Spatial UI',
  },
  {
    src: 'https://motionsites.ai/assets/hero-terra-preview-BFjrCr7T.gif',
    tag: 'BioTech Research Portal',
    category: 'Web Application',
  },
  {
    src: 'https://motionsites.ai/assets/hero-skyelite-preview-DHaZIgUv.gif',
    tag: 'Luxury Aviation Booking',
    category: 'Mobile & Web UI',
  },
  {
    src: 'https://motionsites.ai/assets/hero-aethera-preview-DknSlcTa.gif',
    tag: 'Editorial Typography System',
    category: 'Graphic Design',
  },
  {
    src: 'https://motionsites.ai/assets/hero-designpro-preview-D8c5_een.gif',
    tag: 'Creative Suite Toolkit',
    category: 'Product Design',
  },
];

const ROW_2_DATA: MarqueeItem[] = [
  {
    src: 'https://motionsites.ai/assets/hero-stellar-ai-preview-D3HL6bw1.gif',
    tag: 'Autonomous AI Copilot',
    category: 'User Experience',
  },
  {
    src: 'https://motionsites.ai/assets/hero-xportfolio-preview-D4A8maiC.gif',
    tag: 'Dynamic Art Direction',
    category: 'Graphic Design',
  },
  {
    src: 'https://motionsites.ai/assets/hero-orbit-web3-preview-BXt4OttD.gif',
    tag: 'DeFi Portfolio Tracker',
    category: 'Fintech UI',
  },
  {
    src: 'https://motionsites.ai/assets/hero-nexora-preview-cx5HmUgo.gif',
    tag: 'Modular Component Kit',
    category: 'Design Tokens',
  },
  {
    src: 'https://motionsites.ai/assets/hero-evr-ventures-preview-DZxeVFEX.gif',
    tag: 'Global Venture Identity',
    category: 'Brand Guidelines',
  },
  {
    src: 'https://motionsites.ai/assets/hero-planet-orbit-preview-DWAP8Z1P.gif',
    tag: 'Spatial Orbit 3D Interface',
    category: 'Interaction UI',
  },
  {
    src: 'https://motionsites.ai/assets/hero-new-era-preview-CocuDUm9.gif',
    tag: 'Architectural Lookbook',
    category: 'Visual Design',
  },
  {
    src: 'https://motionsites.ai/assets/hero-wealth-preview-B70idl_u.gif',
    tag: 'Neo-Bank Consumer App',
    category: 'iOS & Android UX',
  },
  {
    src: 'https://motionsites.ai/assets/hero-luminex-preview-CxOP7ce6.gif',
    tag: 'Design System Documentation',
    category: 'Component Library',
  },
  {
    src: 'https://motionsites.ai/assets/hero-celestia-preview-0yO3jXO8.gif',
    tag: 'Immersive 3D Experience',
    category: 'Interactive Web',
  },
];

// Tripled for seamless scrolling
const TRIPLED_ROW_1 = [...ROW_1_DATA, ...ROW_1_DATA, ...ROW_1_DATA];
const TRIPLED_ROW_2 = [...ROW_2_DATA, ...ROW_2_DATA, ...ROW_2_DATA];

export const MarqueeSection: React.FC = () => {
  const sectionRef = useRef<HTMLElement>(null);
  const [offset, setOffset] = useState(0);

  useEffect(() => {
    let ticking = false;

    const handleScroll = () => {
      if (!ticking) {
        window.requestAnimationFrame(() => {
          if (sectionRef.current) {
            const sectionRect = sectionRef.current.getBoundingClientRect();
            const sectionTop = window.scrollY + sectionRect.top;
            const currentOffset =
              (window.scrollY - sectionTop + window.innerHeight) * 0.3;
            setOffset(currentOffset);
          }
          ticking = false;
        });
        ticking = true;
      }
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    handleScroll();

    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, []);

  return (
    <section
      ref={sectionRef}
      className="relative w-full overflow-hidden bg-[#0C0C0C] pt-20 sm:pt-28 md:pt-36 pb-12 flex flex-col gap-5 select-none"
    >
      {/* Section Subheading */}
      <div className="w-full px-6 md:px-12 flex items-center justify-between mb-2">
        <FadeIn delay={0} y={15}>
          <div className="flex items-center gap-3">
            <span className="w-2 h-2 rounded-full bg-white/70" />
            <h3 className="text-xs sm:text-sm uppercase tracking-widest text-[#D7E2EA]/70 font-mono">
              Selected Digital Products &amp; Brand Systems
            </h3>
          </div>
        </FadeIn>
        <span className="hidden sm:block text-xs uppercase tracking-widest text-[#D7E2EA]/40 font-mono">
              SCROLL DRIVEN INTERACTIVE REEL ➔
        </span>
      </div>

      {/* Row 1 - Moves RIGHT on scroll: translateX(offset - 200) */}
      <div
        className="flex gap-4 will-change-transform"
        style={{
          transform: `translateX(${offset - 200}px)`,
          willChange: 'transform',
        }}
      >
        {TRIPLED_ROW_1.map((item, index) => (
          <div
            key={`row1-${index}`}
            className="group relative w-[420px] h-[270px] flex-shrink-0 rounded-2xl overflow-hidden bg-[#16171E] border border-white/[0.08] shadow-lg"
          >
            <img
              src={item.src}
              alt={item.tag}
              loading="lazy"
              className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105 pointer-events-none"
            />
            {/* Overlay badges on hover */}
            <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent p-5 flex flex-col justify-end opacity-90 transition-opacity">
              <span className="text-[11px] font-mono uppercase tracking-widest text-[#D7E2EA]/70">
                {item.category}
              </span>
              <h4 className="text-white font-medium text-lg leading-snug">
                {item.tag}
              </h4>
            </div>
          </div>
        ))}
      </div>

      {/* Row 2 - Moves LEFT on scroll: translateX(-(offset - 200)) */}
      <div
        className="flex gap-4 will-change-transform"
        style={{
          transform: `translateX(${-(offset - 200)}px)`,
          willChange: 'transform',
        }}
      >
        {TRIPLED_ROW_2.map((item, index) => (
          <div
            key={`row2-${index}`}
            className="group relative w-[420px] h-[270px] flex-shrink-0 rounded-2xl overflow-hidden bg-[#16171E] border border-white/[0.08] shadow-lg"
          >
            <img
              src={item.src}
              alt={item.tag}
              loading="lazy"
              className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105 pointer-events-none"
            />
            {/* Overlay badges on hover */}
            <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent p-5 flex flex-col justify-end opacity-90 transition-opacity">
              <span className="text-[11px] font-mono uppercase tracking-widest text-cyan-400">
                {item.category}
              </span>
              <h4 className="text-white font-medium text-lg leading-snug">
                {item.tag}
              </h4>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
};
