"use client";

import React from "react";
import Link from "next/link";
import { motion, useReducedMotion } from "framer-motion";
import {
  Layers,
  Video,
  Code2,
  ShieldCheck,
  Zap,
  Sparkles,
  ArrowRight,
  Clock,
  CheckCircle2,
} from "lucide-react";
import { Button } from "@/components/ui/Button";
import { cn } from "@/lib/utils";

export function WhoWeAre() {
  const prefersReducedMotion = useReducedMotion();

  const highlights = [
    {
      icon: Layers,
      title: "Integrated Disciplines",
      description:
        "Content, branding, and web platforms built under one unified standard of quality.",
    },
    {
      icon: ShieldCheck,
      title: "Founder Accountability",
      description:
        "Direct oversight from Dwaipayan Saha on every milestone, deliverable, and sprint.",
    },
    {
      icon: Zap,
      title: "Scheduled Turnarounds",
      description:
        "Structured monthly output pipelines and reliable delivery schedules with zero ghosting.",
    },
    {
      icon: Sparkles,
      title: "Commercial Impact",
      description:
        "Engineered to boost audience retention, brand credibility, and measurable business growth.",
    },
  ];

  return (
    <section className="relative py-20 md:py-32 bg-paper text-ink overflow-hidden border-t border-ink/5">
      {/* Background Ambience */}
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-0 overflow-hidden select-none"
      >
        <div className="absolute top-1/3 right-0 w-96 h-96 rounded-full bg-brand-orange/[0.04] blur-3xl" />
        <div className="absolute bottom-1/4 left-0 w-80 h-80 rounded-full bg-brand-amber/[0.03] blur-3xl" />
        <div
          className="absolute inset-0 opacity-[0.025]"
          style={{
            backgroundImage: "radial-gradient(#0B0B0F 1px, transparent 1px)",
            backgroundSize: "28px 28px",
          }}
        />
      </div>

      <div className="container max-w-7xl mx-auto px-4 sm:px-6 relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-center">
          {/* Left Column: Headline, Narrative & Highlights (7 cols) */}
          <motion.div
            initial={prefersReducedMotion ? {} : { opacity: 0, y: 15 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: "some" }}
            transition={{ duration: 0.4, ease: [0.25, 1, 0.5, 1] }}
            className="lg:col-span-7 flex flex-col justify-center"
          >
            {/* Eyebrow Badge */}
            <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-mist border border-ink/10 text-xs font-mono uppercase tracking-widest text-brand-orange font-semibold mb-5 w-fit">
              <span className="w-2 h-2 rounded-full bg-brand-orange animate-pulse" />
              <span>{"// WHO WE ARE"}</span>
            </div>

            {/* Impactful Heading */}
            <h2 className="font-display uppercase text-4xl sm:text-5xl lg:text-6xl tracking-wide leading-[0.98] text-ink mb-6">
              A ONE-STOP PARTNER{" "}
              <span className="text-transparent bg-clip-text bg-brand-gradient-h">
                UNDER ONE ROOF
              </span>
            </h2>

            {/* Structured Narrative */}
            <div className="space-y-4 mb-8 text-ink/80">
              <p className="font-body text-base sm:text-lg md:text-xl font-medium leading-relaxed text-ink/90">
                TechUP Digital is a modern creative technology agency built to
                help ambitious brands, creators, startups, and professionals scale
                their digital presence with precision.
              </p>
              <p className="font-body text-sm sm:text-base text-muted leading-relaxed">
                Instead of managing disconnected freelancers who deliver isolated
                files and disappear, we provide a centralized creative partner.
                From viral reels and documentary video editing to complete brand
                identity systems and high-speed web platforms, we handle your
                creative pipeline from concept to master deliverable.
              </p>
            </div>

            {/* 2x2 Highlights Grid */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-8">
              {highlights.map((item, idx) => {
                const IconComponent = item.icon;
                return (
                  <div
                    key={idx}
                    className="p-4 sm:p-5 rounded-2xl bg-mist/90 border border-ink/8 hover:border-brand-orange/30 hover:bg-white transition-all duration-300 flex items-start gap-3.5 shadow-sm group"
                  >
                    <div className="w-10 h-10 rounded-xl bg-brand-orange/10 border border-brand-orange/20 text-brand-orange flex items-center justify-center shrink-0 mt-0.5 group-hover:scale-105 group-hover:bg-brand-orange group-hover:text-white transition-all duration-300">
                      <IconComponent className="w-5 h-5" />
                    </div>
                    <div>
                      <h3 className="font-display uppercase text-sm tracking-wide text-ink mb-1 group-hover:text-brand-orange transition-colors">
                        {item.title}
                      </h3>
                      <p className="text-xs font-body text-muted leading-relaxed">
                        {item.description}
                      </p>
                    </div>
                  </div>
                );
              })}
            </div>

            {/* Call to Action Row */}
            <div className="flex flex-col sm:flex-row items-start sm:items-center gap-4 pt-2">
              <Link href="/contact">
                <Button variant="primary" size="lg">
                  <span>Work With Us</span>
                  <ArrowRight className="w-4 h-4 ml-2" />
                </Button>
              </Link>
              <div className="flex items-center gap-2 text-xs font-mono text-muted">
                <Clock className="w-3.5 h-3.5 text-brand-orange" />
                <span>Direct inquiry response within 15 minutes</span>
              </div>
            </div>
          </motion.div>

          {/* Right Column: Creative Technology Brand Visual (5 cols) */}
          <motion.div
            initial={prefersReducedMotion ? {} : { opacity: 0, y: 15 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: "some" }}
            transition={{ duration: 0.4, delay: 0.05, ease: [0.25, 1, 0.5, 1] }}
            className="lg:col-span-5 flex items-center justify-center select-none"
          >
            <div className="relative w-full max-w-md mx-auto">
              {/* Subtle ambient backlight */}
              <div
                aria-hidden="true"
                className="absolute -inset-3 bg-gradient-to-r from-brand-orange/20 to-brand-amber/15 rounded-3xl blur-2xl opacity-75 pointer-events-none"
              />

              {/* Main Studio Console Artifact */}
              <div className="relative rounded-3xl bg-ink text-white border border-white/15 p-6 sm:p-8 shadow-2xl overflow-hidden">
                {/* Micro dot matrix grid overlay */}
                <div
                  aria-hidden="true"
                  className="absolute inset-0 opacity-[0.08] pointer-events-none"
                  style={{
                    backgroundImage:
                      "radial-gradient(#ffffff 1px, transparent 1px)",
                    backgroundSize: "20px 20px",
                  }}
                />

                {/* Card Top Row: Studio Header & Live Capacity */}
                <div className="relative z-10 flex items-center justify-between pb-5 border-b border-white/10">
                  <div className="flex items-center gap-2.5">
                    <div className="w-8 h-8 rounded-lg bg-brand-gradient flex items-center justify-center text-white font-display text-sm font-bold shadow-md shadow-brand-orange/30">
                      ▲
                    </div>
                    <div>
                      <span className="font-display uppercase text-sm tracking-wider text-white block">
                        TECHUP STUDIO
                      </span>
                      <span className="font-mono text-[10px] text-brand-orange uppercase tracking-widest block">
                        KOLKATA, INDIA
                      </span>
                    </div>
                  </div>
                  <div className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full bg-emerald-500/10 border border-emerald-500/30 text-emerald-400 text-[10px] font-mono font-medium">
                    <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse" />
                    <span>ACTIVE CAPACITY</span>
                  </div>
                </div>

                {/* Central Brand Composition */}
                <div className="relative z-10 py-7 flex flex-col items-center justify-center text-center">
                  {/* Central Double Chevron Logo Icon */}
                  <div className="relative w-24 h-24 sm:w-28 sm:h-28 rounded-2xl bg-gradient-to-br from-white/10 via-white/5 to-transparent border border-white/15 flex items-center justify-center shadow-inner mb-4">
                    <div className="absolute inset-0 rounded-2xl bg-brand-orange/20 blur-xl opacity-60" />
                    <svg
                      viewBox="0 0 100 100"
                      fill="none"
                      className="w-14 h-14 sm:w-16 sm:h-16 relative z-10 drop-shadow-md"
                    >
                      <path
                        d="M50 15L85 50L75 60L50 35L25 60L15 50L50 15Z"
                        fill="url(#brandGradWhoA)"
                      />
                      <path
                        d="M50 45L85 80L75 90L50 65L25 90L15 80L50 45Z"
                        fill="url(#brandGradWhoB)"
                      />
                      <defs>
                        <linearGradient
                          id="brandGradWhoA"
                          x1="0%"
                          y1="0%"
                          x2="100%"
                          y2="100%"
                        >
                          <stop offset="0%" stopColor="#E04A00" />
                          <stop offset="100%" stopColor="#F57C00" />
                        </linearGradient>
                        <linearGradient
                          id="brandGradWhoB"
                          x1="0%"
                          y1="0%"
                          x2="100%"
                          y2="100%"
                        >
                          <stop offset="0%" stopColor="#F57C00" />
                          <stop offset="100%" stopColor="#FF9F1C" />
                        </linearGradient>
                      </defs>
                    </svg>
                  </div>

                  <span className="font-display uppercase text-lg sm:text-xl text-white tracking-wider mb-1">
                    CREATIVE TECHNOLOGY PARTNER
                  </span>
                  <span className="font-mono text-xs text-brand-orange tracking-wider">
                    [YOUR VISION, OUR PRECISION]
                  </span>
                </div>

                {/* Disciplines Triad */}
                <div className="relative z-10 grid grid-cols-3 gap-2 pt-5 border-t border-white/10">
                  <div className="p-2.5 rounded-xl bg-white/5 border border-white/10 text-center">
                    <Video className="w-4 h-4 text-brand-orange mx-auto mb-1" />
                    <span className="font-mono text-[10px] uppercase tracking-wider text-white/90 block font-semibold">
                      VIDEO & REELS
                    </span>
                    <span className="text-[9px] font-mono text-white/40 block mt-0.5">
                      Retention
                    </span>
                  </div>
                  <div className="p-2.5 rounded-xl bg-white/5 border border-white/10 text-center">
                    <Layers className="w-4 h-4 text-brand-amber mx-auto mb-1" />
                    <span className="font-mono text-[10px] uppercase tracking-wider text-white/90 block font-semibold">
                      BRANDING
                    </span>
                    <span className="text-[9px] font-mono text-white/40 block mt-0.5">
                      Vector Suite
                    </span>
                  </div>
                  <div className="p-2.5 rounded-xl bg-white/5 border border-white/10 text-center">
                    <Code2 className="w-4 h-4 text-brand-orange mx-auto mb-1" />
                    <span className="font-mono text-[10px] uppercase tracking-wider text-white/90 block font-semibold">
                      WEBSITES
                    </span>
                    <span className="text-[9px] font-mono text-white/40 block mt-0.5">
                      Next.js
                    </span>
                  </div>
                </div>

                {/* Studio Footer Info */}
                <div className="relative z-10 mt-5 pt-3.5 border-t border-white/5 flex items-center justify-between text-[10px] font-mono text-white/50">
                  <span>FOUNDER: DWAIPAYAN SAHA</span>
                  <span className="text-brand-orange">100% ACCOUNTABILITY</span>
                </div>
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
