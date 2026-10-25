"use client";

import React from "react";
import { motion, useReducedMotion } from "framer-motion";
import { Sparkles, ShieldCheck, Compass, MapPin } from "lucide-react";
import { ABOUT_HERO_CONTENT } from "@/content/about";

export function AboutHero() {
  const prefersReducedMotion = useReducedMotion();

  return (
    <section className="relative pt-32 pb-20 md:pt-40 md:pb-24 bg-ink text-white overflow-hidden">
      {/* Background radial glow */}
      <div
        aria-hidden="true"
        className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[650px] h-[450px] bg-brand-orange/[0.08] rounded-full blur-[150px] pointer-events-none"
      />

      {/* Subtle micro dot grid */}
      <div
        aria-hidden="true"
        className="absolute inset-0 opacity-[0.035] pointer-events-none select-none"
        style={{
          backgroundImage: "radial-gradient(#ffffff 1px, transparent 1px)",
          backgroundSize: "28px 28px",
        }}
      />

      <div className="container max-w-5xl mx-auto px-4 sm:px-6 relative z-10 text-center">
        {/* Eyebrow badge */}
        <motion.div
          initial={prefersReducedMotion ? {} : { opacity: 0, y: -10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.4 }}
          className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-white/5 border border-white/10 text-xs font-mono uppercase tracking-widest mb-6 backdrop-blur-md"
        >
          <span className="w-2 h-2 rounded-full bg-brand-orange animate-pulse" />
          <span className="text-brand-orange font-bold">{"//"}</span>
          <span className="text-white/90">About TechUP Digital</span>
        </motion.div>

        {/* Powerful Headline */}
        <motion.h1
          initial={prefersReducedMotion ? {} : { opacity: 0, y: 15 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.05 }}
          className="font-display uppercase text-4xl sm:text-6xl md:text-7xl lg:text-8xl tracking-wide leading-[0.95] text-white mb-6"
        >
          MORE THAN A{" "}
          <span className="text-transparent bg-clip-text bg-brand-gradient-h">
            FREELANCE SETUP
          </span>
        </motion.h1>

        {/* Supporting description */}
        <motion.p
          initial={prefersReducedMotion ? {} : { opacity: 0, y: 15 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.1 }}
          className="font-body text-base sm:text-lg md:text-xl text-white/75 max-w-2xl mx-auto leading-relaxed mb-8"
        >
          {ABOUT_HERO_CONTENT.subtext}
        </motion.p>

        {/* Agency Highlights Ribbon */}
        <motion.div
          initial={prefersReducedMotion ? {} : { opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.15 }}
          className="flex flex-wrap items-center justify-center gap-2.5 sm:gap-4 text-xs font-mono text-white/60"
        >
          <div className="flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-white/5 border border-white/10 backdrop-blur-sm">
            <ShieldCheck className="w-3.5 h-3.5 text-brand-orange" />
            <span>Founder Accountable</span>
          </div>
          <div className="flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-white/5 border border-white/10 backdrop-blur-sm">
            <Sparkles className="w-3.5 h-3.5 text-brand-amber" />
            <span>Content, Branding & Web</span>
          </div>
          <div className="flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-white/5 border border-white/10 backdrop-blur-sm">
            <MapPin className="w-3.5 h-3.5 text-brand-orange" />
            <span>Kolkata, India</span>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
