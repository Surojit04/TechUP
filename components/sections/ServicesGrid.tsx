"use client";

import React, { useState } from "react";
import Link from "next/link";
import { motion, useReducedMotion } from "framer-motion";
import {
  Video,
  Palette,
  Globe,
  TrendingUp,
  ArrowRight,
  Check,
  RotateCw,
  X,
  Sparkles,
  Layers,
} from "lucide-react";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { SERVICES_SECTION_CONTENT } from "@/content/home";
import { SERVICE_DIVISIONS, ServiceDivision } from "@/content/services";

export function ServicesGrid() {
  const [flippedCards, setFlippedCards] = useState<Record<string, boolean>>({});
  const prefersReducedMotion = useReducedMotion();

  const toggleFlip = (id: string) => {
    setFlippedCards((prev) => ({
      ...prev,
      [id]: !prev[id],
    }));
  };

  const getIcon = (id: string) => {
    switch (id) {
      case "content-video":
        return <Video className="w-6 h-6 text-brand-orange" />;
      case "branding-design":
        return <Palette className="w-6 h-6 text-brand-orange" />;
      case "web-digital":
        return <Globe className="w-6 h-6 text-brand-orange" />;
      case "growth-support":
        return <TrendingUp className="w-6 h-6 text-brand-orange" />;
      default:
        return <Video className="w-6 h-6 text-brand-orange" />;
    }
  };

  return (
    <section id="services" className="bg-mist text-ink py-16 sm:py-20 md:py-32 border-b border-ink/5 relative overflow-hidden scroll-mt-24">
      {/* Subtle background tech elements */}
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-0 select-none overflow-hidden"
      >
        <div className="absolute -top-24 -right-24 w-96 h-96 rounded-full bg-brand-orange/5 blur-3xl" />
        <div className="absolute -bottom-24 -left-24 w-96 h-96 rounded-full bg-brand-amber/5 blur-3xl" />
        <div className="absolute inset-0 bg-[radial-gradient(#0B0B0F_0.75px,transparent_0.75px)] [background-size:24px_24px] opacity-[0.03]" />
      </div>

      <div className="max-w-content mx-auto px-4 sm:px-6 md:px-12 relative z-10">
        <SectionHeading
          eyebrow={SERVICES_SECTION_CONTENT.eyebrow}
          title={SERVICES_SECTION_CONTENT.heading}
          theme="light"
          subtitle="One accountable partner across editing, creative identity, and web presence. Click any card to explore full deliverables."
        />

        {/* 2x2 Grid of 3D Flip Cards with Responsive Gaps */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 sm:gap-8 items-stretch">
          {SERVICE_DIVISIONS.map((service) => {
            const isFlipped = !!flippedCards[service.id];

            return (
              <ServiceFlipCard
                key={service.id}
                service={service}
                isFlipped={isFlipped}
                onToggle={() => toggleFlip(service.id)}
                icon={getIcon(service.id)}
                prefersReducedMotion={!!prefersReducedMotion}
              />
            );
          })}
        </div>
      </div>
    </section>
  );
}

interface ServiceFlipCardProps {
  service: ServiceDivision;
  isFlipped: boolean;
  onToggle: () => void;
  icon: React.ReactNode;
  prefersReducedMotion: boolean;
}

function ServiceFlipCard({
  service,
  isFlipped,
  onToggle,
  icon,
  prefersReducedMotion,
}: ServiceFlipCardProps) {
  const handleKeyDown = (e: React.KeyboardEvent) => {
    // Ignore keypress if focus is inside interactive child (button, link)
    const target = e.target as HTMLElement;
    if (target.tagName === "BUTTON" || target.tagName === "A" || target.closest("button, a")) {
      return;
    }

    if (e.key === "Enter" || e.key === " ") {
      e.preventDefault();
      onToggle();
    }
  };

  return (
    <div
      className="perspective-1000 w-full min-h-[520px] sm:min-h-[540px] lg:min-h-[560px]"
      tabIndex={0}
      role="region"
      aria-label={`${service.title} card. Click or press space to flip for detailed deliverables.`}
      onKeyDown={handleKeyDown}
    >
      <motion.div
        animate={
          prefersReducedMotion
            ? { opacity: 1 }
            : { rotateY: isFlipped ? 180 : 0 }
        }
        transition={{ duration: 0.65, ease: [0.23, 1, 0.32, 1] }}
        className="preserve-3d relative w-full h-full cursor-pointer select-none"
        onClick={(e) => {
          // If clicked directly on a link or button, do not flip
          const target = e.target as HTMLElement;
          if (target.tagName === "BUTTON" || target.tagName === "A" || target.closest("button, a")) {
            return;
          }
          onToggle();
        }}
      >
        {/* ========================================= */}
        {/* FRONT SIDE                                */}
        {/* ========================================= */}
        <div
          className={`backface-hidden w-full h-full rounded-[22px] bg-paper text-ink border border-ink/10 p-6 sm:p-8 md:p-9 shadow-sm hover:shadow-brand-glow hover:-translate-y-1 transition-all duration-300 flex flex-col justify-between group ${
            isFlipped ? "pointer-events-none" : ""
          }`}
        >
          {/* Top Bar: Icon, Division Number & Interactive Flip Hint */}
          <div>
            <div className="flex items-center justify-between mb-5 sm:mb-6">
              <div className="w-12 h-12 sm:w-14 sm:h-14 rounded-2xl bg-brand-orange/10 border border-brand-orange/20 flex items-center justify-center group-hover:scale-110 group-hover:bg-brand-orange/20 transition-all duration-300 shadow-sm shrink-0">
                {icon}
              </div>

              <div className="flex items-center gap-2 sm:gap-3">
                <span className="inline-flex items-center gap-1.5 px-2.5 sm:px-3 py-1 rounded-full bg-brand-orange/10 text-brand-orange text-[11px] sm:text-xs font-semibold uppercase tracking-wider group-hover:bg-brand-orange group-hover:text-white transition-all duration-300">
                  <RotateCw className="w-3 h-3 group-hover:rotate-180 transition-transform duration-500" />
                  <span>Click to flip</span>
                </span>
                <span className="font-display text-3xl sm:text-4xl text-ink/20 group-hover:text-brand-orange transition-colors">
                  {service.number}
                </span>
              </div>
            </div>

            {/* Title & Short description */}
            <h3 className="font-display uppercase text-2xl sm:text-3xl md:text-4xl text-ink tracking-wide mb-2 sm:mb-3 group-hover:text-brand-orange transition-colors">
              {service.title}
            </h3>
            <p className="font-body text-muted text-sm sm:text-base mb-6 leading-relaxed">
              {service.shortDescription}
            </p>

            {/* 3 Highlighted Deliverables */}
            <ul className="flex flex-col gap-2.5 mb-6 border-t border-ink/10 pt-4 sm:pt-5">
              {service.includedServices.slice(0, 3).map((item, idx) => (
                <li
                  key={idx}
                  className="flex items-center gap-2.5 text-xs sm:text-sm font-body text-ink/80"
                >
                  <Check className="w-4 h-4 text-brand-orange shrink-0" />
                  <span>{item}</span>
                </li>
              ))}
            </ul>
          </div>

          {/* Bottom Bar: Action buttons */}
          <div className="flex items-center justify-between pt-4 border-t border-ink/5 mt-auto">
            <span className="text-xs font-semibold text-brand-orange flex items-center gap-1.5 uppercase tracking-wider">
              <Layers className="w-3.5 h-3.5" />
              <span>Full Scope & Details</span>
            </span>

            <Link
              href={`/services#${service.id}`}
              onClick={(e) => e.stopPropagation()}
              aria-label={`View full details for ${service.title}`}
              className="inline-flex items-center gap-1.5 font-body font-semibold text-xs uppercase tracking-wider text-ink/60 hover:text-brand-orange transition-colors group/link p-2 -mr-2"
            >
              <span>Explore</span>
              <ArrowRight className="w-3.5 h-3.5 transition-transform duration-300 group-hover/link:translate-x-1" />
            </Link>
          </div>
        </div>

        {/* ========================================= */}
        {/* BACK SIDE (Rotated 180deg)                */}
        {/* ========================================= */}
        <div
          className={`backface-hidden rotate-y-180 absolute inset-0 w-full h-full rounded-[22px] bg-ink-soft text-paper border border-brand-orange/40 shadow-brand-glow-lg flex flex-col overflow-hidden ${
            !isFlipped ? "pointer-events-none" : ""
          }`}
        >
          {/* 1. STICKY / FIXED HEADER: Always visible, never scrolls away */}
          <div className="shrink-0 px-4 sm:px-6 md:px-7 py-3 sm:py-3.5 border-b border-white/10 bg-ink-soft/95 backdrop-blur-md flex items-center justify-between gap-3 z-10">
            <div className="flex items-center gap-2 sm:gap-3 min-w-0">
              <span className="font-display text-lg sm:text-2xl text-brand-orange tracking-wider truncate">
                {service.number} {"//"} {service.shortTitle}
              </span>
              <span className="px-2 py-0.5 rounded bg-brand-orange/20 text-brand-orange text-[9px] sm:text-[10px] font-mono uppercase tracking-widest shrink-0 font-bold">
                FULL SCOPE
              </span>
            </div>

            {/* Close/Flip Back Button */}
            <button
              type="button"
              onClick={(e) => {
                e.stopPropagation();
                onToggle();
              }}
              className="w-8 h-8 sm:w-9 sm:h-9 min-w-[32px] rounded-full bg-ink border border-white/20 text-paper/70 hover:text-white hover:border-brand-orange flex items-center justify-center transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand-orange shrink-0 touch-target"
              aria-label="Close details and flip back to front"
            >
              <X className="w-4 h-4" />
            </button>
          </div>

          {/* 2. SCROLLABLE CONTENT BODY: Accessible scrolling if needed, never overlaps */}
          <div className="flex-1 overflow-y-auto custom-card-scrollbar px-4 sm:px-6 md:px-7 pt-3.5 pb-6 space-y-3.5 min-h-0">
            {/* A. Included Deliverables Grid (Single column on mobile, 2 columns on sm+) */}
            <div>
              <span className="text-[10px] sm:text-[11px] font-mono text-muted uppercase tracking-wider block mb-2 font-semibold">
                What&apos;s Included:
              </span>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                {service.includedServices.map((item, idx) => (
                  <div
                    key={idx}
                    className="flex items-start gap-2 text-xs font-body text-paper/90 bg-ink/70 p-2 sm:p-2.5 rounded-lg border border-white/5 hover:border-white/10 transition-colors"
                  >
                    <Check className="w-3.5 h-3.5 text-brand-orange shrink-0 mt-0.5" />
                    <span className="leading-snug">{item}</span>
                  </div>
                ))}
              </div>
            </div>

            {/* B. Target Audience: Best For */}
            <div>
              <span className="text-[10px] sm:text-[11px] font-mono text-muted uppercase tracking-wider block mb-2 font-semibold">
                Best For:
              </span>
              <div className="flex flex-wrap gap-1.5">
                {service.bestFor.map((audience, idx) => (
                  <span
                    key={idx}
                    className="px-2.5 py-1 rounded-full bg-white/5 border border-white/10 text-[10px] sm:text-[11px] text-paper/85 font-body leading-none"
                  >
                    {audience}
                  </span>
                ))}
              </div>
            </div>

            {/* C. Value Delivered Callout (The TechUP Impact) */}
            <div className="p-3 sm:p-3.5 rounded-xl bg-brand-orange/10 border border-brand-orange/25 shadow-inner">
              <div className="flex items-center gap-1.5 text-brand-orange text-xs font-semibold mb-1">
                <Sparkles className="w-3.5 h-3.5 shrink-0" />
                <span>The TechUP Impact</span>
              </div>
              <p className="text-xs font-body text-paper/90 leading-relaxed italic">
                &ldquo;{service.valueDelivered}&rdquo;
              </p>
            </div>
          </div>

          {/* 3. STICKY ACTION FOOTER: Pinned to bottom, always visible and clickable */}
          <div className="shrink-0 px-4 sm:px-6 md:px-7 py-3 sm:py-3.5 border-t border-white/10 bg-ink-soft/95 backdrop-blur-md flex items-center justify-between gap-3 z-10">
            <button
              type="button"
              onClick={(e) => {
                e.stopPropagation();
                onToggle();
              }}
              className="text-xs font-semibold text-muted hover:text-white uppercase tracking-wider flex items-center gap-1.5 transition-colors p-1.5 -ml-1.5 touch-target"
            >
              <RotateCw className="w-3 h-3" />
              <span>Back</span>
            </button>

            <Link
              href={`/contact?service=${encodeURIComponent(
                service.contactServiceParam
              )}`}
              onClick={(e) => e.stopPropagation()}
              className="px-4 sm:px-5 py-2 sm:py-2.5 rounded-full bg-brand-gradient text-white text-xs font-semibold uppercase tracking-wider shadow-brand-glow hover:shadow-brand-glow-lg transition-all duration-300 flex items-center gap-2 touch-target"
            >
              <span>Get a Quote</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </Link>
          </div>
        </div>
      </motion.div>
    </div>
  );
}
