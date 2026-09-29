import { useState, useEffect, useLayoutEffect } from 'react';
import { motion } from 'framer-motion';
import { HeroSection } from './sections/HeroSection';
import { MarqueeSection } from './sections/MarqueeSection';
import { AboutSection } from './sections/AboutSection';
import { ServicesSection } from './sections/ServicesSection';
import { ProjectsSection } from './sections/ProjectsSection';
import { IntroLoader } from './components/IntroLoader';
import { ComingSoonPage } from './components/ComingSoonPage';
import { WorkGalleryPage } from './components/WorkGalleryPage';
import { useSmoothScroll } from './hooks/useSmoothScroll';
import { FadeIn } from './components/FadeIn';
import { ArrowUp } from 'lucide-react';

export default function App() {
  const [introFinished, setIntroFinished] = useState(false);
  const [currentPage, setCurrentPage] = useState<'home' | 'work' | 'about'>('home');

  // Guarantee page always starts at top of Hero section on fresh load or refresh
  useLayoutEffect(() => {
    if (typeof window !== 'undefined') {
      if ('scrollRestoration' in window.history) {
        window.history.scrollRestoration = 'manual';
      }
      window.scrollTo({ top: 0, left: 0, behavior: 'instant' as ScrollBehavior });
      if (window.location.hash) {
        window.history.replaceState(null, '', window.location.pathname);
      }
    }
  }, []);

  // Ensure scroll is at 0 before page unloads
  useEffect(() => {
    const handleBeforeUnload = () => {
      window.scrollTo(0, 0);
    };
    window.addEventListener('beforeunload', handleBeforeUnload);
    return () => window.removeEventListener('beforeunload', handleBeforeUnload);
  }, []);

  const handleNavigate = (page: 'home' | 'work' | 'about') => {
    setCurrentPage(page);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleIntroComplete = () => {
    window.scrollTo({ top: 0, left: 0, behavior: 'instant' as ScrollBehavior });
    setIntroFinished(true);
  };

  // Activate buttery smooth scrolling for home page once intro curtain completes
  useSmoothScroll(introFinished && currentPage === 'home');

  return (
    <>
      {!introFinished && (
        <IntroLoader onComplete={handleIntroComplete} />
      )}

      {currentPage === 'work' ? (
        <WorkGalleryPage onNavigate={handleNavigate} />
      ) : currentPage === 'about' ? (
        <ComingSoonPage pageType="about" onNavigate={handleNavigate} />
      ) : (
        <div className="main-wrapper bg-[#0C0C0C] min-h-screen text-[#D7E2EA] font-sans relative selection:bg-white selection:text-black">
          {/* 5 Ordered Sections */}
          <HeroSection onNavigate={handleNavigate} />
          <MarqueeSection />
          <AboutSection />
          <ServicesSection />
          <ProjectsSection />

          {/* Footer — Inspired by Faizur */}
          <footer
            id="contact"
            className="relative w-full bg-[#EDEDEB] text-[#0F172A] rounded-t-[36px] sm:rounded-t-[52px] md:rounded-t-[64px] overflow-hidden z-20"
          >
            {/* ── Top section: Balanced 3-column grid ── */}
            <div className="max-w-7xl mx-auto px-6 sm:px-10 md:px-16 pt-14 sm:pt-18 md:pt-20 pb-8 sm:pb-12">
              <FadeIn delay={0.1} y={20}>
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-10 lg:gap-16 items-start">
                  {/* Col 1: Explore Navigation */}
                  <div>
                    <h4 className="text-xs font-bold uppercase tracking-wider text-[#0F172A]/40 mb-4">
                      Navigation
                    </h4>
                    <nav className="flex flex-col gap-2.5">
                      <button
                        type="button"
                        onClick={() => handleNavigate('home')}
                        className="text-left text-sm sm:text-base font-semibold text-[#0F172A]/75 hover:text-[#0F172A] transition-colors cursor-pointer"
                      >
                        Home
                      </button>
                      <button
                        type="button"
                        onClick={() => handleNavigate('work')}
                        className="text-left text-sm sm:text-base font-semibold text-[#0F172A]/75 hover:text-[#0F172A] transition-colors cursor-pointer flex items-center gap-1.5"
                      >
                        <span>Work</span>
                        <span className="text-[10px] font-mono px-1.5 py-0.2 rounded bg-black/10 text-black/60 font-medium">Soon</span>
                      </button>
                      <button
                        type="button"
                        onClick={() => handleNavigate('about')}
                        className="text-left text-sm sm:text-base font-semibold text-[#0F172A]/75 hover:text-[#0F172A] transition-colors cursor-pointer flex items-center gap-1.5"
                      >
                        <span>About</span>
                        <span className="text-[10px] font-mono px-1.5 py-0.2 rounded bg-black/10 text-black/60 font-medium">Soon</span>
                      </button>
                      <a href="#services" className="text-sm sm:text-base font-semibold text-[#0F172A]/75 hover:text-[#0F172A] transition-colors">Services</a>
                      <a href="#projects" className="text-sm sm:text-base font-semibold text-[#0F172A]/75 hover:text-[#0F172A] transition-colors">Latest Project</a>
                      <a href="mailto:ianfirdaus.design@gmail.com" className="text-sm sm:text-base font-semibold text-[#0F172A]/75 hover:text-[#0F172A] transition-colors">Contact</a>
                    </nav>
                  </div>

              {/* Col 2: Social Links */}
              <div>
                <h4 className="text-xs font-bold uppercase tracking-wider text-[#0F172A]/40 mb-4">
                  Connect &amp; Social
                </h4>
                <div className="grid grid-cols-2 gap-2.5 max-w-[260px]">
                  {/* Dribbble */}
                  <a
                    href="https://dribbble.com"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-2 px-3.5 py-2 rounded-full bg-white/95 hover:bg-white text-xs font-semibold text-[#0F172A] border border-black/[0.07] shadow-xs transition-all hover:scale-105 group"
                  >
                    <svg className="w-3.5 h-3.5 text-[#ea4c89] fill-current shrink-0 group-hover:scale-110 transition-transform" viewBox="0 0 24 24">
                      <path d="M12 0C5.373 0 0 5.373 0 12s5.373 12 12 12 12-5.373 12-12S18.627 0 12 0zm9.897 10.932a10.198 10.198 0 0 0-.897-2.618c-1.378.435-3.356.915-5.612 1.055 1.034 2.802 2.164 5.317 2.378 5.792a10.155 10.155 0 0 0 4.131-4.229zm-6.19 5.41c-.244-.54-1.372-3.04-2.42-5.83-4.708 1.405-9.155 1.348-9.845 1.332a10.17 10.17 0 0 0 5.86 7.085c1.693-2.148 4.793-2.457 6.405-2.587zm-7.986-7.85c2.443-.16 4.717-.674 6.22-1.164A10.133 10.133 0 0 0 8.01 2.502c-1.42 1.487-3.045 3.518-4.289 5.992zm-3.69 2.56a10.02 10.02 0 0 1 .494-1.637c1.233-2.39 2.793-4.35 4.148-5.787A10.22 10.22 0 0 0 2.584 8.76c.466 1.408 1.157 2.705 2.037 3.842-.01-.01-.01-.02-.01-.03zm12.392-7.59a10.152 10.152 0 0 0-4.048-1.46c.162.775.385 2.188.423 3.65 1.547-.464 3.018-.948 3.625-1.19zM10.1 21.688a10.217 10.217 0 0 0 5.158-1.503c-1.517.113-4.288.384-5.894 2.274a10.51 10.51 0 0 0 .736-.771z"/>
                    </svg>
                    <span>Dribbble</span>
                  </a>

                  {/* Behance */}
                  <a
                    href="https://behance.net"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-2 px-3.5 py-2 rounded-full bg-white/95 hover:bg-white text-xs font-semibold text-[#0F172A] border border-black/[0.07] shadow-xs transition-all hover:scale-105 group"
                  >
                    <svg className="w-3.5 h-3.5 text-[#0057ff] fill-current shrink-0 group-hover:scale-110 transition-transform" viewBox="0 0 24 24">
                      <path d="M22 7h-7v2h7V7zm1.726 10c-.442 1.297-2.029 3-4.976 3-3.418 0-5.818-2.224-5.818-5.893 0-3.766 2.455-5.992 5.688-5.992 3.696 0 5.385 2.766 5.097 6.135h-8.082c.07 1.954 1.416 3.013 3.254 3.013 1.341 0 2.296-.582 2.668-1.263h2.169zm-5.029-4.708c-.08-1.428-1.021-2.146-2.273-2.146-1.396 0-2.316.852-2.459 2.146h4.732zM0 4.5v15h7.822c2.185 0 4.14-.54 5.029-2.096.732-1.282.607-2.909-.328-4.01 1.458-.875 1.932-2.584 1.332-4.186-.677-1.808-2.617-2.708-5.26-2.708H0zm3.254 2.793h4.088c1.373 0 2.289.479 2.289 1.707 0 1.25-.916 1.777-2.289 1.777H3.254V7.293zm0 5.637h4.354c1.643 0 2.623.58 2.623 1.951 0 1.459-1.037 2.072-2.623 2.072H3.254V12.93z"/>
                    </svg>
                    <span>Behance</span>
                  </a>

                  {/* Instagram */}
                  <a
                    href="https://instagram.com"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-2 px-3.5 py-2 rounded-full bg-white/95 hover:bg-white text-xs font-semibold text-[#0F172A] border border-black/[0.07] shadow-xs transition-all hover:scale-105 group"
                  >
                    <svg className="w-3.5 h-3.5 text-[#E1306C] fill-current shrink-0 group-hover:scale-110 transition-transform" viewBox="0 0 24 24">
                      <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z"/>
                    </svg>
                    <span>Instagram</span>
                  </a>

                  {/* LinkedIn */}
                  <a
                    href="https://linkedin.com"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-2 px-3.5 py-2 rounded-full bg-white/95 hover:bg-white text-xs font-semibold text-[#0F172A] border border-black/[0.07] shadow-xs transition-all hover:scale-105 group"
                  >
                    <svg className="w-3.5 h-3.5 text-[#0A66C2] fill-current shrink-0 group-hover:scale-110 transition-transform" viewBox="0 0 24 24">
                      <path d="M19 0h-14c-2.761 0-5 2.239-5 5v14c0 2.761 2.239 5 5 5h14c2.762 0 5-2.239 5-5v-14c0-2.761-2.238-5-5-5zm-11 19h-3v-11h3v11zm-1.5-12.268c-.966 0-1.75-.79-1.75-1.764s.784-1.764 1.75-1.764 1.75.79 1.75 1.764-.783 1.764-1.75 1.764zm13.5 12.268h-3v-5.604c0-3.368-4-3.113-4 0v5.604h-3v-11h3v1.765c1.396-2.586 7-2.777 7 2.476v6.759z"/>
                    </svg>
                    <span>LinkedIn</span>
                  </a>
                </div>
              </div>

              {/* Col 3: Direct Actions & CTAs */}
              <div className="flex flex-col gap-5 sm:items-start lg:items-end">
                <div className="lg:text-right">
                  <a
                    href="mailto:ianfirdaus.design@gmail.com"
                    className="inline-flex items-center gap-2 text-xl sm:text-2xl font-bold text-[#E63920] hover:opacity-85 transition-opacity group"
                  >
                    <span>Contact Ian</span>
                    <span className="w-6 h-6 rounded-full bg-[#E63920] text-white flex items-center justify-center group-hover:scale-110 transition-transform">
                      <ArrowUp className="w-3.5 h-3.5 rotate-45 stroke-[2.5]" />
                    </span>
                  </a>
                  <p className="text-xs text-[#0F172A]/45 mt-1 font-medium">Let&apos;s start a project together</p>
                </div>
                <div className="lg:text-right">
                  <a
                    href="#projects"
                    className="inline-flex items-center gap-2 text-base sm:text-lg font-bold text-[#0F172A] hover:opacity-80 transition-opacity group"
                  >
                    <span>Latest Project</span>
                    <span className="w-5 h-5 rounded-full bg-[#0F172A] text-white flex items-center justify-center group-hover:scale-110 transition-transform">
                      <ArrowUp className="w-3 h-3 rotate-45 stroke-[2.5]" />
                    </span>
                  </a>
                  <p className="text-xs text-[#0F172A]/45 mt-0.5 font-medium">Explore selected works</p>
                </div>
              </div>
            </div>
          </FadeIn>
        </div>

        {/* ── Giant IANFRDS Typography with Staggered Entrance Animation ── */}
        <div className="relative w-full overflow-hidden select-none pointer-events-none px-2 sm:px-6 md:px-10">
          <div className="w-full flex justify-center items-end overflow-hidden pt-4 sm:pt-6 pb-1">
            <motion.h2
              initial="hidden"
              whileInView="visible"
              viewport={{ once: false, amount: 0.15 }}
              className="font-kanit font-black text-[#0F172A] tracking-[-0.03em] uppercase whitespace-nowrap inline-flex justify-center items-end m-0 p-0"
              style={{
                fontSize: 'clamp(44px, 16vw, 250px)',
                lineHeight: 0.88,
              }}
            >
              {['I', 'A', 'N', 'F', 'R', 'D', 'S'].map((char, index) => (
                <motion.span
                  key={index}
                  variants={{
                    hidden: { y: '115%', opacity: 0 },
                    visible: {
                      y: '0%',
                      opacity: 1,
                      transition: {
                        duration: 0.7,
                        ease: [0.22, 1, 0.36, 1],
                        delay: index * 0.05,
                      },
                    },
                  }}
                  className="inline-block"
                >
                  {char}
                </motion.span>
              ))}
            </motion.h2>
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
  )}
</>
  );
}
