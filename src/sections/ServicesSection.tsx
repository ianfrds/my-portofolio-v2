import React from 'react';
import { FadeIn } from '../components/FadeIn';
import { ArrowUpRight } from 'lucide-react';

interface ServiceItem {
  id: string;
  name: string;
  tagline: string;
  description: string;
  deliverables: string[];
}

const SERVICES: ServiceItem[] = [
  {
    id: '01',
    name: 'UI/UX & Product Design',
    tagline: 'Web & mobile digital products',
    description:
      'End-to-end product design from user research and wireframing to high-fidelity interfaces and interactive prototypes that maximize clarity and task completion.',
    deliverables: ['User Flows', 'Wireframes', 'Interactive Prototypes', 'Design Systems'],
  },
  {
    id: '02',
    name: 'Scalable Design Systems',
    tagline: 'Component libraries & tokens',
    description:
      'Production-ready component libraries in Figma structured with variables, auto-layout, WCAG accessibility, and standardized design tokens for seamless developer handoff.',
    deliverables: ['Figma Variables', 'Design Tokens', 'Component Libraries', 'Dev Handoff Specs'],
  },
  {
    id: '03',
    name: 'Mobile App Design',
    tagline: 'iOS & Android native UI',
    description:
      'Native iOS (HIG) and Android (Material 3) interfaces engineered with fluid gestures, responsive adaptability, and thumb-friendly ergonomic flows.',
    deliverables: ['iOS HIG', 'Material 3 UI', 'Micro-interactions', 'App Store Assets'],
  },
  {
    id: '04',
    name: 'Web Design & Framer',
    tagline: 'High-converting digital storefronts',
    description:
      'High-converting marketing websites and SaaS landing pages with rigorous attention to visual hierarchy, typography rhythm, and narrative storytelling.',
    deliverables: ['Landing Pages', 'Responsive Web', 'Conversion UX', 'Framer Development'],
  },
  {
    id: '05',
    name: 'Brand Identity & Visuals',
    tagline: 'Memorable visual languages',
    description:
      'Distinctive visual identities that command attention — from bespoke logo marks and typography hierarchies to presentation collateral and brand guideline books.',
    deliverables: ['Logo Systems', 'Typography', 'Brand Guidelines', 'Marketing Collateral'],
  },
];

export const ServicesSection: React.FC = () => {
  return (
    <section
      id="services"
      className="relative w-full bg-[#FFFFFF] text-[#0F172A] rounded-t-[44px] sm:rounded-t-[54px] md:rounded-t-[64px] px-5 sm:px-8 md:px-14 py-24 sm:py-32 md:py-36 z-0 shadow-2xl border-t border-[#E2E8F0]"
    >
      <div className="max-w-6xl mx-auto w-full">
        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-12 sm:mb-16 md:mb-20 pb-8 border-b border-[#E2E8F0]">
          <div>
            <FadeIn delay={0} y={15}>
              <span className="text-xs font-mono uppercase tracking-widest text-[#64748B] mb-2 block font-semibold">
                // WHAT I DO
              </span>
            </FadeIn>
            <FadeIn delay={0.1} y={25}>
              <h2
                className="font-display font-black uppercase text-[#0F172A] leading-none tracking-tight"
                style={{ fontSize: 'clamp(2.5rem, 7vw, 90px)' }}
              >
                Services
              </h2>
            </FadeIn>
          </div>

          <FadeIn delay={0.2} y={15} className="max-w-md">
            <p className="text-[#475569] text-sm sm:text-base leading-relaxed font-normal">
              Specialized in translating ambitious product visions into clean, functional, and award-winning digital design solutions.
            </p>
          </FadeIn>
        </div>

        {/* Clean Editorial Services List */}
        <div className="divide-y divide-[#E2E8F0] border-b border-[#E2E8F0]">
          {SERVICES.map((service, index) => (
            <FadeIn key={service.id} delay={index * 0.06} y={15}>
              <div className="py-8 sm:py-10 md:py-12 group hover:bg-[#F8FAFC]/80 px-2 sm:px-4 -mx-2 sm:-mx-4 rounded-2xl transition-all duration-200">
                <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 lg:gap-8 items-start">
                  {/* Column 1: Number */}
                  <div className="lg:col-span-1 flex items-center justify-between lg:block">
                    <span className="font-mono text-sm sm:text-base font-semibold text-[#94A3B8] group-hover:text-[#0F172A] transition-colors">
                      /{service.id}
                    </span>
                    <span className="lg:hidden text-xs font-mono px-2 py-0.5 rounded bg-slate-100 text-slate-600">
                      {service.tagline}
                    </span>
                  </div>

                  {/* Column 2: Title & Tagline */}
                  <div className="lg:col-span-4">
                    <div className="flex items-center gap-2">
                      <h3 className="font-display font-bold uppercase text-xl sm:text-2xl md:text-2xl text-[#0F172A] tracking-tight group-hover:translate-x-1 transition-transform">
                        {service.name}
                      </h3>
                      <ArrowUpRight className="w-4 h-4 text-slate-400 opacity-0 group-hover:opacity-100 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-all hidden sm:inline-block shrink-0" />
                    </div>
                    <p className="hidden lg:block text-xs sm:text-sm text-[#64748B] mt-1 font-mono">
                      {service.tagline}
                    </p>
                  </div>

                  {/* Column 3: Description */}
                  <div className="lg:col-span-4">
                    <p className="text-sm sm:text-base text-[#475569] leading-relaxed font-normal">
                      {service.description}
                    </p>
                  </div>

                  {/* Column 4: Key Deliverables Tags */}
                  <div className="lg:col-span-3 flex flex-wrap gap-1.5 lg:justify-end">
                    {service.deliverables.map((item, idx) => (
                      <span
                        key={idx}
                        className="text-xs px-2.5 py-1 rounded-full bg-white text-[#334155] border border-[#E2E8F0] font-medium shadow-2xs group-hover:border-slate-300 transition-colors"
                      >
                        {item}
                      </span>
                    ))}
                  </div>
                </div>
              </div>
            </FadeIn>
          ))}
        </div>
      </div>
    </section>
  );
};
