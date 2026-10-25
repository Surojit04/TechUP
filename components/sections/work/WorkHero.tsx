"use client";

import React from "react";
import { motion, useReducedMotion } from "framer-motion";
import { Sparkles, Layers, Video, Globe } from "lucide-react";

export function WorkHero() {
  const prefersReducedMotion = useReducedMotion();

  return (
    <section className="relative pt-32 pb-12 md:pt-40 md:pb-16 bg-ink text-white overflow-hidden">
      {/* Background radial gradient glow */}
      <div
        aria-hidden="true"
        className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[750px] h-[450px] bg-brand-orange/[0.08] rounded-full blur-[160px] pointer-events-none"
      />

      {/* Subtle micro dot grid for agency polish */}
      <div
        aria-hidden="true"
        className="absolute inset-0 opacity-[0.035] pointer-events-none select-none"
        style={{
          backgroundImage: "radial-gradient(#ffffff 1px, transparent 1px)",
          backgroundSize: "28px 28px",
        }}
      />

      <div className="container max-w-6xl mx-auto px-4 sm:px-6 relative z-10 text-center">
        {/* Eyebrow badge */}
        <motion.div
          initial={prefersReducedMotion ? {} : { opacity: 0, y: -10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.4 }}
          className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-white/5 border border-white/10 text-xs font-mono uppercase tracking-widest mb-6 backdrop-blur-md"
        >
          <span className="w-2 h-2 rounded-full bg-brand-orange animate-pulse" />
          <span className="text-brand-orange font-bold">{"//"}</span>
          <span className="text-white/90">Curated Creative Portfolio</span>
        </motion.div>

        {/* Commanding Display Headline */}
        <motion.h1
          initial={prefersReducedMotion ? {} : { opacity: 0, y: 15 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.05 }}
          className="font-display uppercase text-4xl sm:text-6xl md:text-7xl lg:text-8xl tracking-wide leading-[0.95] text-white mb-6"
        >
          PROOF,{" "}
          <span className="text-transparent bg-clip-text bg-brand-gradient-h">
            NOT PROMISES
          </span>
        </motion.h1>

        {/* Clear supporting description */}
        <motion.p
          initial={prefersReducedMotion ? {} : { opacity: 0, y: 15 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.1 }}
          className="font-body text-base sm:text-lg md:text-xl text-white/70 max-w-2xl mx-auto leading-relaxed mb-8"
        >
          A curated collection of viral reels, high-retention video edits, bespoke
          brand identity systems, and performance-driven web platforms engineered
          for ambitious creators and growing brands.
        </motion.p>

        {/* Portfolio Highlights Meta Strip */}
        <motion.div
          initial={prefersReducedMotion ? {} : { opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.15 }}
          className="flex flex-wrap items-center justify-center gap-2.5 sm:gap-4 text-xs font-mono text-white/60"
        >
          <div className="flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-white/5 border border-white/10 backdrop-blur-sm">
            <Sparkles className="w-3.5 h-3.5 text-brand-orange" />
            <span>12+ Curated Case Studies</span>
          </div>
          <div className="flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-white/5 border border-white/10 backdrop-blur-sm">
            <Video className="w-3.5 h-3.5 text-brand-amber" />
            <span>5 Creative Disciplines</span>
          </div>
          <div className="flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-white/5 border border-white/10 backdrop-blur-sm">
            <Layers className="w-3.5 h-3.5 text-brand-orange" />
            <span>100% Vector & Master Deliverables</span>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
