import React from 'react';
import { motion } from 'framer-motion';
import { ArrowUpRight, Mail, MapPin } from 'lucide-react';
import { InteractiveDotAsciiBackground } from './InteractiveDotAsciiBackground';
import { SiteHeader, type PageType } from './SiteHeader';

interface AboutPageProps {
  onNavigate: (page: PageType) => void;
}

interface WorkHistoryItem {
  period: string;
  role: string;
  company: string;
  type: string;
  description: string;
}

const WORK_EXPERIENCES: WorkHistoryItem[] = [
  {
    period: '2024 — Present',
    role: 'Lead Product Designer',
    company: 'Independent / Studio Practice',
    type: 'Contract',
    description: 'Leading product design for spatial UI concepts, SaaS platforms, and scalable design token systems.',
  },
  {
    period: '2022 — 2024',
    role: 'Senior UI/UX Designer',
    company: 'FinFlow Technologies',
    type: 'Full-time',
    description: 'Spearheaded financial dashboards and responsive mobile banking experiences for high-frequency users.',
  },
  {
    period: '2020 — 2022',
    role: 'UI/UX & Graphic Designer',
    company: 'Kroma Digital Agency',
    type: 'Agency',
    description: 'Crafted digital brand manuals, web design systems, and high-stakes investor keynote decks.',
  },
  {
    period: '2018 — 2020',
    role: 'Visual & Digital Designer',
    company: 'Freelance Consultant',
    type: 'Freelance',
    description: 'Partnered with early-stage founders to design MVPs, interactive prototypes, and digital collateral.',
  },
];

const SOCIAL_LINKS = [
  { name: 'LinkedIn', url: 'https://linkedin.com' },
  { name: 'Dribbble', url: 'https://dribbble.com' },
  { name: 'Behance', url: 'https://behance.net' },
  { name: 'Instagram', url: 'https://instagram.com' },
];

export const AboutPage: React.FC<AboutPageProps> = ({ onNavigate }) => {
  return (
    <div className="relative w-full min-h-screen bg-[#0C0C0C] text-[#EDEDEB] p-0 sm:p-5 md:p-6 flex flex-col justify-center selection:bg-white selection:text-black">
      {/* ── Main Framed Container ── */}
      <div className="relative w-full min-h-[92vh] sm:min-h-[95vh] rounded-none sm:rounded-[38px] md:rounded-[48px] overflow-hidden bg-[#0A0A0C] text-white flex flex-col justify-between shadow-2xl border border-white/10">
        <InteractiveDotAsciiBackground />

        {/* ── Top Navbar (Consistent across all pages) ── */}
        <SiteHeader currentPage="about" onNavigate={onNavigate} className="relative z-30" />

        {/* ── Main Clean Content ── */}
        <div className="relative z-20 flex-1 flex flex-col justify-center px-4 sm:px-8 md:px-10 lg:px-12 py-8 sm:py-12 max-w-7xl mx-auto w-full">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-10 lg:gap-16 xl:gap-20 items-start">

            {/* ── Left Column: Profile & Info ── */}
            <motion.div
              initial={{ opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
              className="flex flex-col justify-between gap-6 sm:gap-8"
            >
              <div>
                {/* ── Circular Profile Avatar ── */}
                <div className="relative mb-5 sm:mb-6 w-fit group">
                  <div className="w-20 h-20 sm:w-24 sm:h-24 md:w-28 md:h-28 rounded-full overflow-hidden bg-white p-1 ring-2 ring-white/15 shadow-xl group-hover:ring-white/35 transition-all duration-300">
                    <img
                      src="/profile-avatar.jpg"
                      alt="Ian Firdaus"
                      className="w-full h-full object-cover rounded-full group-hover:scale-105 transition-transform duration-300 select-none"
                    />
                  </div>
                  <span
                    className="absolute bottom-1 right-1 w-3.5 h-3.5 sm:w-4 sm:h-4 rounded-full bg-emerald-400 border-2 border-[#0A0A0C] shadow-sm"
                    title="Available for Work"
                  />
                </div>

                {/* Name */}
                <h1
                  className="font-display font-black text-white uppercase tracking-tight leading-[0.95] mb-2 sm:mb-3 select-none"
                  style={{ fontSize: 'clamp(2.1rem, 4.2vw, 54px)' }}
                >
                  Ian Firdaus
                </h1>

                {/* Role */}
                <p className="text-sm sm:text-base text-white/60 font-medium tracking-wide mb-4 sm:mb-5">
                  Product Designer &amp; UI/UX Specialist
                </p>

                {/* Bio */}
                <p className="text-white/75 text-sm sm:text-base leading-relaxed font-normal max-w-md mb-5">
                  With over six years of experience in product design, I bridge human psychology and pixel-level craft to build intuitive interfaces, scalable design systems, and engaging visual experiences.
                </p>

                {/* Status Pill (Positioned below profile description) */}
                <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-white/[0.06] border border-white/10 text-white/70 text-xs font-mono tracking-wider">
                  <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse" />
                  <span>AVAILABLE FOR WORK</span>
                </div>
              </div>

              {/* Contact & Details */}
              <div className="flex flex-col gap-4 pt-2 border-t border-white/[0.08]">
                <div className="flex items-center gap-2 text-xs font-mono text-white/50">
                  <MapPin className="w-3.5 h-3.5 text-white/40" />
                  <span>Indonesia • GMT+7</span>
                </div>

                {/* Email Action */}
                <a
                  href="mailto:ianfirdaus.design@gmail.com"
                  className="inline-flex items-center gap-2 text-sm font-semibold text-white hover:text-white/80 transition-colors group w-fit cursor-pointer"
                >
                  <Mail className="w-4 h-4 text-white/50 group-hover:text-white transition-colors" />
                  <span>ianfirdaus.design@gmail.com</span>
                  <ArrowUpRight className="w-3.5 h-3.5 text-white/40 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 group-hover:text-white transition-all" />
                </a>

                {/* Social links */}
                <div className="flex flex-wrap items-center gap-4 pt-1">
                  {SOCIAL_LINKS.map((link) => (
                    <a
                      key={link.name}
                      href={link.url}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-xs font-medium text-white/50 hover:text-white transition-colors cursor-pointer"
                    >
                      {link.name}
                    </a>
                  ))}
                </div>
              </div>
            </motion.div>

            {/* ── Right Column: Riwayat Pekerjaan ── */}
            <motion.div
              initial={{ opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.1, ease: [0.16, 1, 0.3, 1] }}
              className="flex flex-col"
            >
              {/* Header */}
              <div className="flex items-center justify-between pb-4 mb-3 border-b border-white/[0.1]">
                <span className="text-xs font-mono uppercase tracking-widest text-white/50 font-semibold">
                  Riwayat Pekerjaan
                </span>
                <span className="text-xs font-mono text-white/40">
                  2018 — Present
                </span>
              </div>

              {/* Minimal Clean Timeline Rows */}
              <div className="flex flex-col divide-y divide-white/[0.06]">
                {WORK_EXPERIENCES.map((item, index) => (
                  <motion.div
                    key={`${item.company}-${index}`}
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.4, delay: 0.15 + index * 0.06 }}
                    className="py-5 sm:py-6 px-3 -mx-3 rounded-xl hover:bg-white/[0.03] transition-colors duration-200 group"
                  >
                    <div className="flex flex-col sm:flex-row sm:items-baseline justify-between gap-1 sm:gap-4 mb-1.5">
                      <div className="flex items-baseline gap-2.5 flex-wrap">
                        <h2 className="text-base sm:text-lg font-bold text-white tracking-tight group-hover:text-white transition-colors">
                          {item.role}
                        </h2>
                        <span className="text-xs sm:text-sm text-white/50 font-medium">
                          at {item.company}
                        </span>
                      </div>
                      <span className="text-xs font-mono text-white/45 shrink-0">
                        {item.period}
                      </span>
                    </div>

                    <p className="text-xs sm:text-sm text-white/60 leading-relaxed max-w-xl">
                      {item.description}
                    </p>
                  </motion.div>
                ))}
              </div>
            </motion.div>
          </div>
        </div>

        {/* ── Bottom Info Bar ── */}
        <div className="relative w-full z-20 px-5 sm:px-8 md:px-10 lg:px-12 py-3.5 sm:py-4 flex flex-col sm:flex-row items-center justify-between gap-2.5 text-xs text-white/40 font-mono border-t border-white/[0.06] bg-[#0A0A0C]/40 backdrop-blur-sm">
          <span>Ian Firdaus • Independent Portfolio</span>
          <span>©{new Date().getFullYear()}</span>
        </div>
      </div>
    </div>
  );
};
