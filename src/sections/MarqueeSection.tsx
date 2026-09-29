import React, { useRef, useState, useEffect } from 'react';
import { FadeIn } from '../components/FadeIn';

interface MarqueeItem {
  src: string;
  tag: string;
  category: string;
}

const ROW_1_DATA: MarqueeItem[] = [
  {
    src: 'https://i.pinimg.com/736x/b7/0f/5b/b70f5bf06ec9829c79682b1d1f9e4e49.jpg',
    tag: 'Web3 & Spatial UX',
    category: 'Product Design',
  },
  {
    src: 'https://i.pinimg.com/736x/ec/5f/b6/ec5fb6c6088e6d4545ffb1af03987bc0.jpg',
    tag: 'Developer Cloud IDE',
    category: 'Design System',
  },
  {
    src: 'https://i.pinimg.com/736x/f6/55/cc/f655cc518fb05ce8a76c37d91638d8fe.jpg',
    tag: 'Venture Capital Brand',
    category: 'Brand Identity',
  },
  {
    src: 'https://i.pinimg.com/736x/35/6c/f8/356cf86473be723e9fffeb672fd7681a.jpg',
    tag: 'AI Generative Canvas',
    category: 'UI/UX Interface',
  },
  {
    src: 'https://i.pinimg.com/736x/61/b8/50/61b850013d6cb178683ecb82c4b4c864.jpg',
    tag: 'Precision Engineering OS',
    category: 'Enterprise SaaS',
  },
  {
    src: 'https://i.pinimg.com/736x/a4/4f/99/a44f993ee4f65d7d29c98253d8361ecb.jpg',
    tag: 'Analytics & Data Viz',
    category: 'Dashboard UX',
  },
  {
    src: 'https://i.pinimg.com/736x/b9/04/71/b9047102fc2705bf58c3267112898a81.jpg',
    tag: 'Automotive Digital Cluster',
    category: 'HMI / Spatial UI',
  },
  {
    src: 'https://i.pinimg.com/736x/1a/62/9b/1a629b88de5afdfe395dee5e56a8ce4c.jpg',
    tag: 'BioTech Research Portal',
    category: 'Web Application',
  },
  {
    src: 'https://i.pinimg.com/736x/38/7b/aa/387baa9ee49a64e0acaab9cd93c3bb57.jpg',
    tag: 'Luxury Aviation Booking',
    category: 'Mobile & Web UI',
  },
  {
    src: 'https://i.pinimg.com/736x/da/a7/ae/daa7ae806698af225a71566381abe8dd.jpg',
    tag: 'Editorial Typography System',
    category: 'Graphic Design',
  },
  {
    src: 'https://i.pinimg.com/736x/08/03/38/0803384fc9fd7efd94aa0eb085d6b14b.jpg',
    tag: 'Creative Suite Toolkit',
    category: 'Product Design',
  },
];

const ROW_2_DATA: MarqueeItem[] = [
  {
    src: 'https://i.pinimg.com/736x/5d/06/43/5d0643fe56de4a616f83d67d21be2a69.jpg',
    tag: 'Autonomous AI Copilot',
    category: 'User Experience',
  },
  {
    src: 'https://i.pinimg.com/736x/b7/66/27/b7662714904a08ff9e001957d3a3107c.jpg',
    tag: 'Dynamic Art Direction',
    category: 'Graphic Design',
  },
  {
    src: 'https://i.pinimg.com/736x/9e/bf/51/9ebf51493e40fb7abe051f843e281fdb.jpg',
    tag: 'DeFi Portfolio Tracker',
    category: 'Fintech UI',
  },
  {
    src: 'https://i.pinimg.com/736x/49/d2/78/49d278ffdd9385b3dfb2104f0009c58d.jpg',
    tag: 'Modular Component Kit',
    category: 'Design Tokens',
  },
  {
    src: 'https://i.pinimg.com/736x/56/f8/df/56f8df79b10c7c885353e57c21e61ea5.jpg',
    tag: 'Global Venture Identity',
    category: 'Brand Guidelines',
  },
  {
    src: 'https://i.pinimg.com/736x/fe/84/2b/fe842b0bbdb22e01a0cea0ad3fa91b12.jpg',
    tag: 'Spatial Orbit 3D Interface',
    category: 'Interaction UI',
  },
  {
    src: 'https://i.pinimg.com/736x/60/48/c4/6048c4579835a9dbe213d94522603e45.jpg',
    tag: 'Architectural Lookbook',
    category: 'Visual Design',
  },
  {
    src: 'https://i.pinimg.com/736x/e6/4c/ea/e64cea0ce9fc99e659cad162b0bd5643.jpg',
    tag: 'Neo-Bank Consumer App',
    category: 'iOS & Android UX',
  },
  {
    src: 'https://i.pinimg.com/736x/5a/69/f8/5a69f87ad6650c58f3f7c704084a2f5d.jpg',
    tag: 'Design System Documentation',
    category: 'Component Library',
  },
  {
    src: 'https://i.pinimg.com/736x/0a/39/ff/0a39ff2ab2e4b3029b2bbc6a5de6924d.jpg',
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
