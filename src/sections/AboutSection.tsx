import React from 'react';
import { FadeIn } from '../components/FadeIn';
import { AnimatedText } from '../components/AnimatedText';
import { ContactButton } from '../components/ContactButton';

const SOFTWARE = [
  'Figma',
  'Framer',
  'Canva',
  'Photoshop',
  'PowerPoint',
];

export const AboutSection: React.FC = () => {
  return (
    <section
      id="about"
      className="relative min-h-screen w-full flex flex-col items-center justify-center px-5 sm:px-8 md:px-10 py-24 sm:py-32 overflow-hidden bg-[#0C0C0C] select-none"
    >
      {/* Background subtle neutral lighting */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[700px] h-[400px] bg-white/[0.02] rounded-full blur-[140px] pointer-events-none" />

      {/* Center content */}
      <div className="relative z-10 flex flex-col items-center text-center max-w-[760px] w-full">
        {/* Subtitle tag */}
        <FadeIn delay={0} y={20}>
          <span className="text-xs font-mono uppercase tracking-widest text-[#94A3B8] mb-3 block font-semibold">
            // PHILOSOPHY &amp; APPROACH
          </span>
        </FadeIn>

        {/* Heading */}
        <FadeIn delay={0.05} y={35} className="w-full">
          <h2
            className="hero-heading font-display font-black uppercase leading-none tracking-tight text-center"
            style={{ fontSize: 'clamp(3rem, 10vw, 130px)' }}
          >
            About Ian
          </h2>
        </FadeIn>

        {/* Gap between heading and text */}
        <div className="h-8 sm:h-12 md:h-14" />

        {/* Animated paragraph */}
        <div
          className="text-[#D7E2EA] font-medium text-center leading-relaxed max-w-[620px] mx-auto"
          style={{ fontSize: 'clamp(1.05rem, 1.9vw, 1.4rem)' }}
        >
          <AnimatedText
            text="With more than six years of experience in product design, i focus on user experience, scalable design systems, and graphic brand identities. I bridge human psychology and pixel-level craft to create interfaces people truly love using. Let's design something extraordinary together!"
            className="text-center font-normal"
          />
        </div>

        {/* Software & Tools */}
        <FadeIn delay={0.25} y={25} className="mt-10 sm:mt-12 w-full">
          <div className="flex flex-wrap items-center justify-center gap-2.5 sm:gap-3 max-w-2xl mx-auto">
            {SOFTWARE.map((tool, i) => (
              <span
                key={i}
                className="px-4 py-2 rounded-full text-xs sm:text-sm font-medium bg-white/[0.04] border border-white/[0.1] text-[#D7E2EA] hover:border-white/40 hover:text-white hover:bg-white/[0.08] transition-all"
              >
                {tool}
              </span>
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
