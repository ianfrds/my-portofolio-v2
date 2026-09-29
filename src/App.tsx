import { useState } from 'react';
import { HeroSection } from './sections/HeroSection';
import { MarqueeSection } from './sections/MarqueeSection';
import { AboutSection } from './sections/AboutSection';
import { ServicesSection } from './sections/ServicesSection';
import { ProjectsSection } from './sections/ProjectsSection';
import { IntroLoader } from './components/IntroLoader';
import { useSmoothScroll } from './hooks/useSmoothScroll';
import { FadeIn } from './components/FadeIn';
import { ArrowUp } from 'lucide-react';

export default function App() {
  const [introFinished, setIntroFinished] = useState(false);

  // Activate buttery smooth scrolling once intro curtain completes
  useSmoothScroll(introFinished);

  return (
    <>
      {!introFinished && (
        <IntroLoader onComplete={() => setIntroFinished(true)} />
      )}

      <div className="main-wrapper bg-[#0C0C0C] min-h-screen text-[#D7E2EA] font-sans relative selection:bg-white selection:text-black">
        {/* 5 Ordered Sections */}
        <HeroSection />
      <MarqueeSection />
      <AboutSection />
      <ServicesSection />
      <ProjectsSection />

      {/* Footer — Inspired by Faizur */}
      <footer
        id="contact"
        className="relative w-full bg-[#EDEDEB] text-[#0F172A] rounded-t-[36px] sm:rounded-t-[52px] md:rounded-t-[64px] overflow-hidden z-20"
      >
        {/* ── Top section: 4-column grid ── */}
        <div className="max-w-7xl mx-auto px-6 sm:px-10 md:px-16 pt-14 sm:pt-18 md:pt-22 pb-8 sm:pb-12">
          <FadeIn delay={0.1} y={20}>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-10 lg:gap-8">
              {/* Col 1: Description */}
              <div className="lg:col-span-1">
                <p className="text-[#0F172A] font-bold text-base sm:text-lg leading-snug max-w-[260px]">
                  Ian Firdaus is an independent UI/UX designer and creative maker
                </p>
              </div>

              {/* Col 2: Explore */}
              <div>
                <h4 className="text-xs font-bold uppercase tracking-wider text-[#0F172A]/40 mb-3.5">
                  Explore
                </h4>
                <nav className="flex flex-col gap-2.5">
                  <a href="#about" className="text-sm font-medium text-[#0F172A]/70 hover:text-[#0F172A] transition-colors">About</a>
                  <a href="#services" className="text-sm font-medium text-[#0F172A]/70 hover:text-[#0F172A] transition-colors">Services</a>
                  <a href="#projects" className="text-sm font-medium text-[#0F172A]/70 hover:text-[#0F172A] transition-colors">Case Studies</a>
                  <a href="mailto:ianfirdaus.design@gmail.com" className="text-sm font-medium text-[#0F172A]/70 hover:text-[#0F172A] transition-colors">Contact</a>
                </nav>
              </div>

              {/* Col 3: Follow me */}
              <div>
                <h4 className="text-xs font-bold uppercase tracking-wider text-[#0F172A]/40 mb-3.5">
                  Follow me
                </h4>
                <div className="grid grid-cols-2 gap-2 max-w-[250px]">
                  <a
                    href="https://dribbble.com"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-white/90 hover:bg-white text-xs font-medium text-[#0F172A] border border-black/[0.06] shadow-sm transition-all hover:scale-105"
                  >
                    <span className="w-2 h-2 rounded-full bg-[#ea4c89] shrink-0" />
                    <span>Dribbble</span>
                  </a>
                  <a
                    href="https://behance.net"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-white/90 hover:bg-white text-xs font-medium text-[#0F172A] border border-black/[0.06] shadow-sm transition-all hover:scale-105"
                  >
                    <span className="w-2 h-2 rounded-full bg-[#1769ff] shrink-0" />
                    <span>Behance</span>
                  </a>
                  <a
                    href="https://instagram.com"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-white/90 hover:bg-white text-xs font-medium text-[#0F172A] border border-black/[0.06] shadow-sm transition-all hover:scale-105"
                  >
                    <span className="w-2 h-2 rounded-full bg-gradient-to-tr from-[#f09433] via-[#e6683c] to-[#bc1888] shrink-0" />
                    <span>Instagram</span>
                  </a>
                  <a
                    href="https://linkedin.com"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-white/90 hover:bg-white text-xs font-medium text-[#0F172A] border border-black/[0.06] shadow-sm transition-all hover:scale-105"
                  >
                    <span className="w-2 h-2 rounded-full bg-[#0077b5] shrink-0" />
                    <span>LinkedIn</span>
                  </a>
                </div>
              </div>

              {/* Col 4: Dual CTAs */}
              <div className="flex flex-col gap-4">
                <div>
                  <a
                    href="mailto:ianfirdaus.design@gmail.com"
                    className="inline-flex items-center gap-2 text-lg sm:text-xl font-bold text-[#E63920] hover:opacity-80 transition-opacity group"
                  >
                    <span>Contact Ian</span>
                    <span className="w-6 h-6 rounded-full bg-[#E63920] text-white flex items-center justify-center group-hover:scale-110 transition-transform">
                      <ArrowUp className="w-3.5 h-3.5 rotate-45 stroke-[2.5]" />
                    </span>
                  </a>
                  <p className="text-xs text-[#0F172A]/40 mt-0.5">Let&apos;s work together</p>
                </div>
                <div>
                  <a
                    href="#projects"
                    className="inline-flex items-center gap-2 text-base font-bold text-[#0F172A] hover:opacity-80 transition-opacity group"
                  >
                    <span>Case Studies</span>
                    <span className="w-5 h-5 rounded-full bg-[#0F172A] text-white flex items-center justify-center group-hover:scale-110 transition-transform">
                      <ArrowUp className="w-3 h-3 rotate-45 stroke-[2.5]" />
                    </span>
                  </a>
                  <p className="text-xs text-[#0F172A]/40 mt-0.5">Selected projects</p>
                </div>
              </div>
            </div>
          </FadeIn>
        </div>

        {/* ── Giant IANFRDS Typography (Matching Faizur reference) ── */}
        <div className="relative w-full overflow-hidden select-none pointer-events-none px-4 sm:px-8 md:px-12">
          <div className="w-full flex justify-center items-end overflow-hidden h-[75px] sm:h-[13vw] md:h-[185px] lg:h-[230px]">
            <span
              className="font-kanit font-black text-[#0F172A] tracking-[-0.035em] uppercase whitespace-nowrap block text-center"
              style={{
                fontSize: 'clamp(44px, 17.2vw, 270px)',
                lineHeight: 0.77,
                transform: 'translateY(13%)',
              }}
            >
              IANFRDS
            </span>
          </div>
        </div>

        {/* ── Bottom bar ── */}
        <div className="relative z-10 max-w-7xl mx-auto px-6 sm:px-10 md:px-16 pt-4 pb-6 flex flex-col sm:flex-row items-center justify-between gap-3 text-xs text-[#0F172A]/45 font-medium border-t border-[#0F172A]/[0.08]">
          <div className="flex items-center gap-3">
            <span>Ian Firdaus ©{new Date().getFullYear()}</span>
            <span>·</span>
            <a href="#" className="hover:text-[#0F172A] transition-colors">Privacy Policy</a>
          </div>
          <div className="flex items-center gap-3">
            <span>Indonesia</span>
            <span>·</span>
            <span>{new Date().toLocaleTimeString('en-US', { hour: '2-digit', minute: '2-digit', hour12: true })}</span>
            <span>·</span>
            <span>29°C ⛅</span>
          </div>
        </div>
      </footer>
    </div>
    </>
  );
}
