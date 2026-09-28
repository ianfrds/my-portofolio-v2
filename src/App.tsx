import { HeroSection } from './sections/HeroSection';
import { MarqueeSection } from './sections/MarqueeSection';
import { AboutSection } from './sections/AboutSection';
import { ServicesSection } from './sections/ServicesSection';
import { ProjectsSection } from './sections/ProjectsSection';
import { ContactButton } from './components/ContactButton';
import { FadeIn } from './components/FadeIn';
import { Mail, Globe, ArrowUp } from 'lucide-react';

export default function App() {
  return (
    <div className="main-wrapper bg-[#0C0C0C] min-h-screen text-[#D7E2EA] font-sans relative selection:bg-white selection:text-black">
      {/* 5 Ordered Sections */}
      <HeroSection />
      <MarqueeSection />
      <AboutSection />
      <ServicesSection />
      <ProjectsSection />

      {/* Footer / Contact Section */}
      <footer
        id="contact"
        className="w-full bg-[#08080A] border-t border-white/[0.08] px-6 sm:px-10 md:px-16 py-20 sm:py-28 relative z-20 overflow-hidden"
      >
        {/* Subtle neutral glow backdrop */}
        <div className="absolute bottom-0 left-1/2 -translate-x-1/2 w-[600px] h-[250px] bg-white/[0.02] rounded-full blur-[140px] pointer-events-none" />

        <div className="max-w-6xl mx-auto flex flex-col md:flex-row items-start md:items-center justify-between gap-10">
          <FadeIn delay={0.1} y={20} className="flex flex-col items-start gap-4 max-w-xl">
            <span className="text-xs font-mono uppercase tracking-widest text-[#94A3B8] font-semibold">
              // LET&apos;S COLLABORATE
            </span>
            <h4 className="hero-heading font-display font-black uppercase text-3xl sm:text-4xl md:text-5xl tracking-tight leading-tight">
              Have a digital product in mind?
            </h4>
            <p className="text-[#D7E2EA]/70 font-light text-sm sm:text-base leading-relaxed">
              Available for full product design cycles, mobile apps, enterprise design systems in Figma, and visual brand identity transformations.
            </p>
            <div className="flex items-center gap-3 pt-2 text-xs text-[#D7E2EA]/60 font-mono">
              <span className="flex items-center gap-1.5 px-3 py-1 rounded-full bg-white/[0.04] border border-white/[0.08]">
                <Globe className="w-3.5 h-3.5 text-white/70" />
                <span>Indonesia • Remote Worldwide</span>
              </span>
              <span className="px-3 py-1 rounded-full bg-white/[0.04] border border-white/[0.08]">
                GMT+7 (WIB)
              </span>
            </div>
          </FadeIn>

          <FadeIn delay={0.2} y={20} className="flex flex-col sm:flex-row items-stretch sm:items-center gap-4 w-full sm:w-auto">
            <a
              href="mailto:ianfirdaus.design@gmail.com"
              className="flex items-center justify-center gap-2 px-8 py-3.5 sm:py-4 rounded-full border border-white/20 text-white hover:bg-white/[0.06] transition-colors text-xs sm:text-sm uppercase tracking-wider font-medium"
            >
              <Mail className="w-4 h-4 text-white/70" />
              <span>ianfirdaus.design@gmail.com</span>
            </a>
            <ContactButton href="mailto:ianfirdaus.design@gmail.com" label="Start a Project" />
          </FadeIn>
        </div>

        {/* Social Links & Copyright */}
        <div className="max-w-6xl mx-auto mt-16 pt-8 border-t border-white/[0.06] flex flex-col sm:flex-row items-center justify-between gap-6 text-xs text-[#D7E2EA]/50 font-light">
          <p>© {new Date().getFullYear()} Ian Frds (Ian Firdaus). Crafted with precision &amp; care.</p>

          <div className="flex items-center gap-6 uppercase tracking-wider text-xs font-mono">
            <a
              href="https://dribbble.com"
              target="_blank"
              rel="noopener noreferrer"
              className="hover:text-white transition-colors"
            >
              Dribbble
            </a>
            <a
              href="https://behance.net"
              target="_blank"
              rel="noopener noreferrer"
              className="hover:text-white transition-colors"
            >
              Behance
            </a>
            <a
              href="https://linkedin.com"
              target="_blank"
              rel="noopener noreferrer"
              className="hover:text-white transition-colors"
            >
              LinkedIn
            </a>
            <a
              href="#hero"
              className="flex items-center gap-1 hover:text-white transition-colors"
            >
              <span>Top</span>
              <ArrowUp className="w-3 h-3" />
            </a>
          </div>
        </div>
      </footer>
    </div>
  );
}
