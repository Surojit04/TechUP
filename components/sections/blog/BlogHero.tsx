"use client";

import React from "react";
import { motion, useReducedMotion } from "framer-motion";

export function BlogHero() {
  const prefersReducedMotion = useReducedMotion();

  return (
    <section className="relative pt-32 pb-16 md:pt-40 md:pb-24 bg-ink text-white overflow-hidden border-b border-white/10">
      {/* Background ambient radial glow */}
      <div className="absolute top-1/4 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-brand-orange/[0.08] rounded-full blur-[140px] pointer-events-none" />

      {/* Subtle grid pattern background */}
      <div
        className="absolute inset-0 opacity-10 pointer-events-none"
        style={{
          backgroundImage: "radial-gradient(#ffffff 1px, transparent 1px)",
          backgroundSize: "24px 24px",
        }}
      />

      <div className="container max-w-7xl mx-auto px-4 sm:px-6 relative z-10 text-center">
        {/* Eyebrow badge */}
        <div className="inline-flex items-center gap-2.5 px-4 py-1.5 rounded-full bg-white/[0.05] border border-white/10 backdrop-blur-md mb-6">
          <span className="w-2 h-2 rounded-full bg-brand-orange shadow-sm shadow-brand-orange animate-pulse" />
          <span className="font-mono text-xs uppercase tracking-widest text-brand-orange font-semibold">
            TechUP Editorial &amp; Insights
          </span>
        </div>

        {/* Distinctive, bold headline */}
        <h1 className="font-display uppercase text-4xl sm:text-5xl md:text-6xl lg:text-7xl tracking-tight leading-[1.02] text-white mb-6 max-w-4xl mx-auto">
          Ideas to Grow Your{" "}
          <span className="text-transparent bg-clip-text bg-gradient-to-r from-brand-orange via-[#FF6D2C] to-brand-amber">
            Digital Presence
          </span>
        </h1>

        {/* Clear supporting description */}
        <p className="font-body text-base sm:text-lg md:text-xl text-white/70 max-w-2xl mx-auto leading-relaxed mb-8">
          Actionable guides, creative frameworks, and practical playbooks on short-form video, branding systems, and modern web architecture.
        </p>

        {/* Topic tags / editorial pillars ribbon */}
        <div className="flex flex-wrap items-center justify-center gap-2 sm:gap-2.5 max-w-3xl mx-auto">
          <span className="inline-flex items-center gap-1.5 px-3.5 py-1.5 rounded-full bg-ink-soft/80 border border-white/10 text-xs font-mono text-white/70 hover:text-white hover:border-brand-orange/40 transition-colors">
            <span className="text-brand-orange font-bold">#</span> Video Editing &amp; Reels
          </span>
          <span className="inline-flex items-center gap-1.5 px-3.5 py-1.5 rounded-full bg-ink-soft/80 border border-white/10 text-xs font-mono text-white/70 hover:text-white hover:border-brand-orange/40 transition-colors">
            <span className="text-brand-orange font-bold">#</span> Brand Identity Systems
          </span>
          <span className="inline-flex items-center gap-1.5 px-3.5 py-1.5 rounded-full bg-ink-soft/80 border border-white/10 text-xs font-mono text-white/70 hover:text-white hover:border-brand-orange/40 transition-colors">
            <span className="text-brand-orange font-bold">#</span> High-Performance Web
          </span>
          <span className="inline-flex items-center gap-1.5 px-3.5 py-1.5 rounded-full bg-ink-soft/80 border border-white/10 text-xs font-mono text-white/70 hover:text-white hover:border-brand-orange/40 transition-colors">
            <span className="text-brand-orange font-bold">#</span> Creator Growth
          </span>
        </div>
      </div>
    </section>
  );
}

