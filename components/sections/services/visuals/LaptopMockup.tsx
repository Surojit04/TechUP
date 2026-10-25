"use client";

import React from "react";
import { motion, useReducedMotion } from "framer-motion";
import { Globe, ArrowRight, ShieldCheck, Zap } from "lucide-react";

export function LaptopMockup() {
  const prefersReducedMotion = useReducedMotion();

  return (
    <div className="relative mx-auto w-full max-w-[420px] sm:max-w-[460px] select-none">
      {/* Soft ambient orange glow behind laptop */}
      <div className="absolute -inset-4 bg-brand-orange/15 rounded-3xl blur-2xl pointer-events-none" />

      {/* Laptop Screen Bezel */}
      <div className="relative rounded-t-2xl bg-ink-soft p-3 pt-2.5 shadow-2xl border border-white/15">
        {/* Webcam indicator */}
        <div className="w-1.5 h-1.5 rounded-full bg-black mx-auto mb-2 ring-1 ring-white/20" />

        {/* Browser Frame */}
        <div className="rounded-lg overflow-hidden bg-ink border border-white/10 shadow-inner">
          {/* Browser Navigation Bar */}
          <div className="bg-ink px-3 py-2 flex items-center justify-between border-b border-white/10">
            {/* Window control dots */}
            <div className="flex items-center gap-1.5">
              <div className="w-2.5 h-2.5 rounded-full bg-red-500/80" />
              <div className="w-2.5 h-2.5 rounded-full bg-yellow-500/80" />
              <div className="w-2.5 h-2.5 rounded-full bg-emerald-500/80" />
            </div>

            {/* Address bar */}
            <div className="flex-1 max-w-[220px] mx-3 px-2 py-0.5 rounded bg-ink-soft border border-white/10 flex items-center gap-1.5 text-[10px] text-white/60">
              <Globe className="w-3 h-3 text-brand-orange shrink-0" />
              <span className="truncate">techup.digital/web-preview</span>
            </div>

            <div className="text-[10px] font-mono text-brand-amber">
              100/100
            </div>
          </div>

          {/* Screen Content Viewport (Simulating scrolling web platform) */}
          <div className="relative h-56 sm:h-64 overflow-hidden bg-gradient-to-b from-ink via-ink-soft to-ink p-3.5">
            <motion.div
              animate={
                prefersReducedMotion
                  ? { y: 0 }
                  : { y: [0, -90, -90, 0] }
              }
              transition={{
                repeat: Infinity,
                duration: 9,
                ease: "easeInOut",
                times: [0, 0.45, 0.55, 1],
              }}
              className="space-y-3"
            >
              {/* Header inside site */}
              <div className="flex items-center justify-between pb-2 border-b border-white/10">
                <div className="flex items-center gap-1.5">
                  <div className="w-4 h-4 rounded bg-brand-orange" />
                  <span className="font-display tracking-wider text-xs text-white">
                    CLIENT BRAND
                  </span>
                </div>
                <div className="flex items-center gap-2 text-[9px] text-white/70">
                  <span>Home</span>
                  <span>Products</span>
                  <span>Contact</span>
                  <div className="px-2 py-0.5 rounded-full bg-brand-orange text-white text-[8px] font-bold">
                    Book Call
                  </div>
                </div>
              </div>

              {/* Hero Banner inside site */}
              <div className="p-3 rounded-xl bg-white/[0.04] border border-white/10">
                <div className="inline-block px-1.5 py-0.5 rounded bg-brand-orange/20 text-brand-orange text-[9px] font-mono mb-1">
                  [LIVE PREVIEW: HIGH-CONVERTING LANDING PAGE]
                </div>
                <h4 className="font-display text-base text-white tracking-wide leading-tight">
                  SCALE YOUR ONLINE PRESENCE WITH ZERO DOWNTIME
                </h4>
                <p className="text-[10px] text-white/60 mt-1 line-clamp-2">
                  Fast, SEO-first architecture built with Next.js, Tailwind, and custom micro-interactions.
                </p>
                <div className="mt-2.5 flex items-center gap-2">
                  <div className="h-6 px-3 rounded-full bg-brand-gradient text-white text-[9px] font-bold flex items-center gap-1">
                    Get Started <ArrowRight className="w-2.5 h-2.5" />
                  </div>
                  <div className="h-6 px-2.5 rounded-full bg-white/5 border border-white/10 text-white/80 text-[9px] flex items-center">
                    View Demo
                  </div>
                </div>
              </div>

              {/* Features / Metrics inside site */}
              <div className="grid grid-cols-2 gap-2">
                <div className="p-2.5 rounded-lg bg-white/[0.03] border border-white/5">
                  <div className="flex items-center gap-1 text-brand-orange text-[10px] font-semibold mb-0.5">
                    <Zap className="w-3 h-3" /> 0.4s Load Time
                  </div>
                  <p className="text-[9px] text-white/50">Core Web Vitals Optimized</p>
                </div>
                <div className="p-2.5 rounded-lg bg-white/[0.03] border border-white/5">
                  <div className="flex items-center gap-1 text-emerald-400 text-[10px] font-semibold mb-0.5">
                    <ShieldCheck className="w-3 h-3" /> Fully Responsive
                  </div>
                  <p className="text-[9px] text-white/50">Mobile, Tablet & Desktop</p>
                </div>
              </div>

              {/* Content section below fold */}
              <div className="p-3 rounded-xl bg-white/[0.02] border border-white/5">
                <div className="h-2 w-24 bg-brand-orange/60 rounded mb-1.5" />
                <div className="h-1.5 w-full bg-white/10 rounded mb-1" />
                <div className="h-1.5 w-3/4 bg-white/10 rounded" />
              </div>
            </motion.div>
          </div>
        </div>
      </div>

      {/* Laptop Base / Keyboard Chassis */}
      <div className="relative mx-auto w-[108%] -left-[4%] h-3 bg-gradient-to-b from-ink-soft to-ink rounded-b-xl shadow-xl border-t border-white/20">
        {/* Notch to open laptop */}
        <div className="w-16 h-1 bg-black/40 rounded-b-md mx-auto" />
      </div>
    </div>
  );
}
