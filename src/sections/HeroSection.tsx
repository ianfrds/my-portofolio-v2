import React, { useRef, useEffect } from 'react';
import { FadeIn } from '../components/FadeIn';
import { ArrowUpRight } from 'lucide-react';

export const HeroSection: React.FC = () => {
  const videoRef = useRef<HTMLVideoElement>(null);

  useEffect(() => {
    if (videoRef.current) {
      videoRef.current.play().catch(() => {
        // Autoplay policy fallback
      });
    }
  }, []);

  return (
    <section
      id="hero"
      className="relative w-full min-h-screen bg-[#0C0C0C] p-3 sm:p-5 md:p-6 flex flex-col justify-center select-none"
    >
      {/* Framed Hero Card with Motion Video Background */}
      <div className="relative w-full min-h-[92vh] sm:min-h-[95vh] rounded-[28px] sm:rounded-[38px] md:rounded-[48px] overflow-hidden bg-[#E6E7E6] text-[#0F172A] flex flex-col justify-between shadow-2xl border border-white/30">
        
        {/* Full-bleed Video Background with Enhanced Contrast Layer */}
        <div className="absolute inset-0 pointer-events-none select-none z-0 overflow-hidden">
          <video
            ref={videoRef}
            autoPlay
            loop
            muted
            playsInline
            preload="auto"
            className="w-full h-full object-cover object-center scale-100"
          >
            <source src="/animasikan_ini.mp4" type="video/mp4" />
          </video>
          {/* Enhanced readability wash: ensures text is 100% readable regardless of video frame */}
          <div className="absolute inset-0 bg-[#E6E7E6]/65 backdrop-blur-[1.5px]" />
          <div className="absolute inset-0 bg-radial from-white/40 via-transparent to-transparent pointer-events-none" />
        </div>

        {/* Top Navbar */}
        <FadeIn delay={0} y={-15} className="w-full z-20">
          <header className="w-full px-6 sm:px-10 md:px-14 pt-6 sm:pt-8 flex justify-between items-center">
            {/* Brand */}
            <a
              href="#hero"
              className="font-display font-extrabold text-xl sm:text-2xl text-[#0F172A] tracking-tight hover:opacity-80 transition-opacity"
            >
              Ian Frds
            </a>

            {/* Nav Links in Center */}
            <nav className="hidden md:flex items-center gap-7 lg:gap-10 text-sm font-semibold text-[#334155]">
              <a
                href="#about"
                className="hover:text-[#0F172A] transition-colors"
              >
                About
              </a>
              <a
                href="#services"
                className="hover:text-[#0F172A] transition-colors"
              >
                Services
              </a>
              <a
                href="#projects"
                className="hover:text-[#0F172A] transition-colors"
              >
                Case Studies
              </a>
              <a
                href="#contact"
                className="hover:text-[#0F172A] transition-colors"
              >
                Contact
              </a>
            </nav>

            {/* Right Action Button */}
            <a
              href="#contact"
              className="flex items-center gap-2 px-5 sm:px-6 py-2.5 sm:py-3 rounded-full bg-[#0F172A] text-white text-xs sm:text-sm font-semibold hover:bg-black transition-all shadow-md group cursor-pointer"
            >
              <span>Get in Touch</span>
              <ArrowUpRight className="w-3.5 h-3.5 sm:w-4 sm:h-4 transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
            </a>
          </header>
        </FadeIn>

        {/* Central Hero Content - Short, Punchy, High-Contrast & Centered */}
        <div className="relative z-20 flex flex-col items-center justify-center text-center px-4 sm:px-8 my-auto max-w-2xl mx-auto py-10 sm:py-14">
          {/* Compact Pill Badge */}
          <FadeIn delay={0.1} y={15}>
            <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-white/80 backdrop-blur-md border border-black/10 text-[#1E3A2F] text-xs sm:text-sm font-semibold mb-4 sm:mb-6 shadow-sm">
              <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse" />
              <span>UI/UX &amp; Graphic Designer</span>
            </div>
          </FadeIn>

          {/* Short & Punchy Headline (High Contrast #0F172A) */}
          <FadeIn delay={0.2} y={25}>
            <h1 className="font-display font-extrabold text-[#0F172A] leading-[1.12] tracking-tight text-3xl sm:text-5xl md:text-6xl text-center max-w-xl mx-auto mb-3 sm:mb-4">
              Shaping Products,<br />Crafting Brands
            </h1>
          </FadeIn>

          {/* Concise Single-Line Subtitle */}
          <FadeIn delay={0.3} y={20}>
            <p className="text-[#334155] text-sm sm:text-base md:text-lg max-w-md mx-auto leading-relaxed mb-6 sm:mb-8 font-medium">
              High-impact UI/UX design and visual identities for modern digital products.
            </p>
          </FadeIn>

          {/* Centered CTA Pill Button */}
          <FadeIn delay={0.4} y={20}>
            <a
              href="#projects"
              className="flex items-center gap-2 px-8 sm:px-9 py-3.5 sm:py-4 rounded-full bg-[#0F172A] text-white text-sm sm:text-base font-semibold hover:bg-black transition-all shadow-xl hover:shadow-2xl hover:scale-105 duration-200 group cursor-pointer"
            >
              <span>Explore Work</span>
              <ArrowUpRight className="w-4 h-4 sm:w-5 sm:h-5 transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
            </a>
          </FadeIn>
        </div>

        {/* Bottom Bar: Clean Minimal Info */}
        <div className="relative w-full z-20 px-6 sm:px-10 md:px-14 pb-6 sm:pt-4 sm:pb-8 flex flex-col sm:flex-row items-center justify-between gap-3 text-xs text-[#334155] font-semibold">
          <FadeIn delay={0.5} y={10}>
            <div className="flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-white/70 backdrop-blur-sm border border-black/5">
              <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />
              <span>Available for Projects &amp; Collaborations</span>
            </div>
          </FadeIn>

          <FadeIn delay={0.55} y={10}>
            <div className="flex items-center gap-1 font-mono text-[#475569] px-3.5 py-1.5 rounded-full bg-white/70 backdrop-blur-sm border border-black/5">
              <span>Indonesia • Remote Worldwide</span>
            </div>
          </FadeIn>
        </div>
      </div>
    </section>
  );
};
