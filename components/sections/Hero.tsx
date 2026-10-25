"use client";

import React, { useRef, useState, useEffect } from "react";
import { motion, useReducedMotion, useMotionValue, useSpring, useTransform } from "framer-motion";
import {
  ChevronDown,
  ArrowRight,
  Sparkles,
  Zap,
  Star,
  Activity,
  Video,
  Palette,
  Globe,
  CheckCircle2,
} from "lucide-react";
import { Button } from "@/components/ui/Button";
import { HERO_CONTENT } from "@/content/home";
import { textMaskItem, textMaskContainer } from "@/lib/motion";

export function Hero() {
  const containerRef = useRef<HTMLElement>(null);
  const prefersReducedMotion = useReducedMotion();
  const [isTouchDevice, setIsTouchDevice] = useState(false);

  const spotlightX = useMotionValue(0);
  const spotlightY = useMotionValue(0);
  const springX = useSpring(spotlightX, { stiffness: 80, damping: 25 });
  const springY = useSpring(spotlightY, { stiffness: 80, damping: 25 });

  const badge1X = useTransform(springX, (v) => v * 0.7);
  const badge1Y = useTransform(springY, (v) => v * 0.7);
  const badge2X = useTransform(springX, (v) => -v * 0.6);
  const badge2Y = useTransform(springY, (v) => -v * 0.6);
  const rocketX = useTransform(springX, (v) => v * 0.4);
  const rocketRot = useTransform(springX, (v) => v * 0.1);

  useEffect(() => {
    if (typeof window !== "undefined") {
      setIsTouchDevice("ontouchstart" in window || navigator.maxTouchPoints > 0);
    }
  }, []);

  const handleMouseMove = (e: React.MouseEvent<HTMLElement>) => {
    if (isTouchDevice || prefersReducedMotion) return;
    const { clientX, clientY } = e;
    const x = (clientX / (window.innerWidth || 1) - 0.5) * 60;
    const y = (clientY / (window.innerHeight || 1) - 0.5) * 60;
    spotlightX.set(x);
    spotlightY.set(y);
  };

  return (
    <section
      ref={containerRef}
      onMouseMove={handleMouseMove}
      className="relative min-h-[95vh] flex flex-col justify-center bg-ink text-paper pt-32 pb-24 overflow-hidden chevron-divider-bottom"
    >
      {/* ==================================================== */}
      {/* CONTINUOUS MOVING BACKGROUND ANIMATIONS & DEPTH     */}
      {/* ==================================================== */}
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-0 overflow-hidden select-none"
      >
        {/* Layer 1: Drifting Deep Brand Glow Orbs (Multi-speed) */}
        <div className="absolute -top-40 -left-40 w-[600px] h-[600px] rounded-full bg-brand-orange/15 blur-[140px] animate-float-slow" />
        <div className="absolute top-1/4 -right-40 w-[650px] h-[650px] rounded-full bg-brand-amber/12 blur-[160px] animate-float-reverse" />
        <div className="absolute bottom-10 left-1/3 w-[450px] h-[450px] rounded-full bg-brand-orange/10 blur-[130px] animate-pulse-glow" />

        {/* Layer 2: Interactive Mouse-Follow Spotlight */}
        <motion.div
          style={
            isTouchDevice || prefersReducedMotion
              ? undefined
              : { x: springX, y: springY }
          }
          className="absolute top-1/3 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[500px] h-[500px] rounded-full bg-brand-orange/10 blur-[100px] pointer-events-none"
        />

        {/* Layer 3: Drifting Cybernetic Grid */}
        <div className="absolute inset-0 bg-[radial-gradient(#2a2a38_1.2px,transparent_1.2px)] [background-size:36px_36px] opacity-30 animate-grid-drift" />

        {/* Layer 4: Floating Ambient Particles */}
        <div className="absolute inset-0">
          {[...Array(6)].map((_, i) => (
            <div
              key={i}
              className="absolute w-1.5 h-1.5 rounded-full bg-brand-orange/40 blur-[0.5px] animate-float-slow"
              style={{
                top: `${15 + i * 14}%`,
                left: `${10 + ((i * 17) % 80)}%`,
                animationDelay: `${i * 1.2}s`,
                animationDuration: `${5 + i * 1.5}s`,
              }}
            />
          ))}
        </div>
      </div>

      <div className="max-w-content mx-auto px-6 md:px-12 w-full relative z-10 my-auto">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-8 items-center">
          {/* ==================================================== */}
          {/* LEFT SIDE: ANIMATED TYPOGRAPHY & SEQUENTIAL REVEAL   */}
          {/* ==================================================== */}
          <div className="lg:col-span-7 flex flex-col items-start">
            {/* 1. Staggered Eyebrow Badge */}
            <motion.div
              initial={prefersReducedMotion ? {} : { opacity: 0, y: -12 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, ease: "easeOut" }}
              className="inline-flex items-center gap-2.5 px-4 py-1.5 rounded-full bg-brand-orange/15 border border-brand-orange/30 text-brand-orange text-xs font-semibold uppercase tracking-[0.2em] mb-6 shadow-sm backdrop-blur-sm"
            >
              <span className="w-2 h-2 rounded-full bg-brand-orange animate-pulse" />
              <span>{HERO_CONTENT.eyebrow}</span>
              <span className="text-white/30">•</span>
              <span className="text-white/70 font-mono text-[10px] tracking-widest">
                VERIFIED EXCELLENCE
              </span>
            </motion.div>

            {/* 2. Display Headline H1 with Multi-line Mask Reveal */}
            {prefersReducedMotion ? (
              <h1 className="font-display uppercase text-5xl sm:text-7xl md:text-8xl lg:text-[90px] leading-[0.92] tracking-wide mb-6 text-white">
                <span className="block">{HERO_CONTENT.headlineLine1}</span>
                <span className="block text-transparent bg-clip-text bg-brand-gradient">
                  {HERO_CONTENT.headlineLine2}
                </span>
              </h1>
            ) : (
              <motion.div
                variants={textMaskContainer}
                initial="hidden"
                animate="visible"
                className="font-display uppercase text-5xl sm:text-7xl md:text-8xl lg:text-[90px] leading-[0.92] tracking-wide mb-6 text-white"
              >
                <div className="overflow-hidden">
                  <motion.h1 variants={textMaskItem} className="block">
                    {HERO_CONTENT.headlineLine1}
                  </motion.h1>
                </div>
                <div className="overflow-hidden">
                  <motion.span
                    variants={textMaskItem}
                    className="block text-transparent bg-clip-text bg-brand-gradient"
                  >
                    {HERO_CONTENT.headlineLine2}
                  </motion.span>
                </div>
              </motion.div>
            )}

            {/* 3. Three Pillars Tagline Row */}
            <motion.div
              initial={prefersReducedMotion ? {} : { opacity: 0, y: 12 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.2 }}
              className="flex flex-wrap items-center gap-2.5 mb-6"
            >
              <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-lg bg-ink-soft/90 border border-white/10 text-xs font-body text-paper/90 shadow-sm">
                <Video className="w-3.5 h-3.5 text-brand-orange" />
                <span>Video Editing</span>
              </span>
              <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-lg bg-ink-soft/90 border border-white/10 text-xs font-body text-paper/90 shadow-sm">
                <Palette className="w-3.5 h-3.5 text-brand-orange" />
                <span>Visual Branding</span>
              </span>
              <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-lg bg-ink-soft/90 border border-white/10 text-xs font-body text-paper/90 shadow-sm">
                <Globe className="w-3.5 h-3.5 text-brand-orange" />
                <span>Web Platforms</span>
              </span>
            </motion.div>

            {/* 4. Sub-text Description */}
            <motion.p
              initial={prefersReducedMotion ? {} : { opacity: 0, y: 14 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.3 }}
              className="font-body text-base sm:text-lg md:text-xl text-muted max-w-xl mb-9 leading-relaxed"
            >
              {HERO_CONTENT.subtext}
            </motion.p>

            {/* 5. Interactive CTA Buttons with Refined Hover */}
            <motion.div
              initial={prefersReducedMotion ? {} : { opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.4 }}
              className="flex flex-wrap items-center gap-4 mb-9"
            >
              <Button href="/contact" size="lg" withRocketIcon>
                {HERO_CONTENT.primaryCtaText}
              </Button>
              <Button href="/work" variant="secondary" size="lg">
                <span className="flex items-center gap-2">
                  {HERO_CONTENT.secondaryCtaText}
                  <ArrowRight className="w-4 h-4 transition-transform group-hover:translate-x-1" />
                </span>
              </Button>
            </motion.div>

            {/* 6. Proof Line & Social Trust Badges */}
            <motion.div
              initial={prefersReducedMotion ? {} : { opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.6, delay: 0.55 }}
              className="flex items-center gap-3.5 text-xs sm:text-sm text-muted font-body"
            >
              <div className="flex -space-x-1.5">
                {[1, 2, 3, 4].map((i) => (
                  <div
                    key={i}
                    className="w-7 h-7 rounded-full border-2 border-ink bg-ink-soft flex items-center justify-center text-[10px] text-brand-orange font-bold shadow-sm"
                  >
                    ★
                  </div>
                ))}
              </div>
              <div className="flex flex-col sm:flex-row sm:items-center sm:gap-2">
                <span className="text-paper/90 font-medium">
                  {HERO_CONTENT.proofText}
                </span>
                <span className="hidden sm:inline text-white/30">•</span>
                <span className="text-brand-orange font-semibold flex items-center gap-1">
                  <CheckCircle2 className="w-3.5 h-3.5" />
                  <span>100% Guaranteed Delivery</span>
                </span>
              </div>
            </motion.div>
          </div>

          {/* ==================================================== */}
          {/* RIGHT SIDE: DYNAMIC 3D ROCKET & ORBITING SYSTEM      */}
          {/* ==================================================== */}
          <div className="lg:col-span-5 flex justify-center lg:justify-end relative">
            <div className="relative w-full max-w-[460px] aspect-square flex items-center justify-center">
              {/* Radial Center Aura Glow */}
              <div className="absolute inset-4 rounded-full bg-brand-orange/20 blur-3xl animate-pulse-glow pointer-events-none" />

              {/* Orbital Ring 1 (Outer - Rotating Clockwise) */}
              <div
                aria-hidden="true"
                className="absolute inset-2 sm:inset-4 rounded-full border border-dashed border-white/15 animate-orbit-cw pointer-events-none"
              >
                {/* Orbiting Satellite Node 1 */}
                <div className="absolute -top-3 left-1/2 -translate-x-1/2 px-2.5 py-1 rounded-full bg-ink-soft/90 border border-brand-orange/40 text-[9px] font-mono tracking-wider text-brand-orange shadow-brand-glow flex items-center gap-1">
                  <span className="w-1.5 h-1.5 rounded-full bg-brand-orange animate-ping" />
                  <span>4K RENDER</span>
                </div>
              </div>

              {/* Orbital Ring 2 (Inner - Rotating Counter-Clockwise) */}
              <div
                aria-hidden="true"
                className="absolute inset-14 sm:inset-16 rounded-full border border-white/10 animate-orbit-ccw pointer-events-none"
              >
                {/* Orbiting Satellite Node 2 */}
                <div className="absolute -bottom-2.5 left-1/2 -translate-x-1/2 px-2 py-0.5 rounded-full bg-ink-soft/90 border border-white/20 text-[8px] font-mono tracking-wider text-white/80 shadow-sm">
                  <span>IDENTITY</span>
                </div>
              </div>

              {/* Floating Layered Tech Badge 1: Top Right */}
              <motion.div
                style={
                  isTouchDevice || prefersReducedMotion
                    ? undefined
                    : { x: badge1X, y: badge1Y }
                }
                className="absolute top-2 right-0 sm:right-2 z-20"
              >
                <div className="px-3.5 py-2 rounded-xl bg-ink-soft/90 backdrop-blur-md border border-white/15 shadow-xl flex items-center gap-2.5 animate-float-slow select-none">
                  <div className="w-6 h-6 rounded-lg bg-emerald-500/15 border border-emerald-500/30 flex items-center justify-center text-emerald-400">
                    <Star className="w-3.5 h-3.5 fill-emerald-400" />
                  </div>
                  <div>
                    <span className="text-[11px] font-bold text-white block leading-tight">
                      99.4% Rating
                    </span>
                    <span className="text-[9px] font-mono text-muted tracking-wider block">
                      CLIENT RETENTION
                    </span>
                  </div>
                </div>
              </motion.div>

              {/* Floating Layered Tech Badge 2: Bottom Left */}
              <motion.div
                style={
                  isTouchDevice || prefersReducedMotion
                    ? undefined
                    : { x: badge2X, y: badge2Y }
                }
                className="absolute bottom-6 left-0 sm:left-2 z-20"
              >
                <div className="px-3.5 py-2 rounded-xl bg-ink-soft/90 backdrop-blur-md border border-white/15 shadow-xl flex items-center gap-2.5 animate-float-reverse select-none">
                  <div className="w-6 h-6 rounded-lg bg-brand-orange/20 border border-brand-orange/40 flex items-center justify-center text-brand-orange">
                    <Zap className="w-3.5 h-3.5" />
                  </div>
                  <div>
                    <span className="text-[11px] font-bold text-white block leading-tight">
                      24-48h Sprints
                    </span>
                    <span className="text-[9px] font-mono text-muted tracking-wider block">
                      FAST TURNAROUND
                    </span>
                  </div>
                </div>
              </motion.div>

              {/* Center Monitor & Console Dock */}
              <div className="absolute bottom-6 left-1/2 -translate-x-1/2 w-52 h-24 rounded-2xl bg-ink-soft/80 backdrop-blur-md border border-white/10 shadow-2xl flex flex-col items-center justify-center p-3 select-none">
                <div className="w-full h-full rounded-xl bg-ink border border-white/5 flex items-center justify-between px-3 relative overflow-hidden">
                  <div className="absolute inset-0 bg-brand-gradient opacity-10" />
                  <div className="flex items-center gap-1.5 z-10">
                    <Activity className="w-3.5 h-3.5 text-brand-orange animate-pulse" />
                    <span className="text-[9px] font-mono tracking-widest text-brand-orange font-bold">
                      FLIGHT_SYSTEM_ONLINE
                    </span>
                  </div>
                  <span className="text-[8px] font-mono text-muted z-10">
                    60 FPS
                  </span>
                </div>
                {/* Stand neck */}
                <div className="w-8 h-2 bg-white/20 mt-1 rounded-sm" />
                <div className="w-24 h-1 bg-white/30 rounded-full" />
              </div>

              {/* Vertical Rocket Launch Light Trail */}
              <svg
                className="absolute top-8 bottom-16 left-1/2 -translate-x-1/2 w-8 h-64 pointer-events-none select-none"
                viewBox="0 0 32 240"
                fill="none"
              >
                <motion.line
                  x1="16"
                  y1="240"
                  x2="16"
                  y2="30"
                  stroke="url(#heroTrailGradient)"
                  strokeWidth="3.5"
                  strokeDasharray="6 4"
                  initial={
                    prefersReducedMotion
                      ? { opacity: 1, pathLength: 1 }
                      : { pathLength: 0, opacity: 0 }
                  }
                  animate={{ pathLength: 1, opacity: 1 }}
                  transition={{ duration: 1.6, ease: "easeOut" }}
                />
                <defs>
                  <linearGradient id="heroTrailGradient" x1="0" y1="1" x2="0" y2="0">
                    <stop offset="0%" stopColor="#E04A00" stopOpacity="0" />
                    <stop offset="50%" stopColor="#F57C00" stopOpacity="0.85" />
                    <stop offset="100%" stopColor="#FFFFFF" stopOpacity="1" />
                  </linearGradient>
                </defs>
              </svg>

              {/* Floating Stylized Rocket Craft with 3D Depth & Flame Animation */}
              <motion.div
                style={
                  isTouchDevice || prefersReducedMotion
                    ? undefined
                    : { x: rocketX, rotateZ: rocketRot }
                }
                animate={{ y: [0, -14, 0] }}
                transition={{
                  y: {
                    duration: 4.5,
                    repeat: Infinity,
                    ease: "easeInOut",
                  },
                }}
                className="relative z-10 cursor-pointer"
              >
                <div className="w-40 h-40 md:w-48 md:h-48 rounded-3xl bg-ink-soft/90 backdrop-blur-xl border border-white/20 p-5 shadow-brand-glow-lg flex items-center justify-center relative group transition-all duration-300 hover:border-brand-orange/60">
                  <div className="absolute inset-0 rounded-3xl bg-brand-gradient opacity-15 group-hover:opacity-25 transition-opacity" />

                  {/* Corner Tech Ticks */}
                  <div className="absolute top-2 left-2 w-2 h-2 border-t-2 border-l-2 border-brand-orange/60" />
                  <div className="absolute top-2 right-2 w-2 h-2 border-t-2 border-r-2 border-brand-orange/60" />
                  <div className="absolute bottom-2 left-2 w-2 h-2 border-b-2 border-l-2 border-brand-orange/60" />
                  <div className="absolute bottom-2 right-2 w-2 h-2 border-b-2 border-r-2 border-brand-orange/60" />

                  {/* Stylized Rocket SVG Illustration */}
                  <svg
                    viewBox="0 0 100 100"
                    fill="none"
                    className="w-28 h-28 md:w-32 md:h-32 drop-shadow-2xl transition-transform duration-300 group-hover:scale-105"
                  >
                    {/* Animated Engine Fire Plume */}
                    <path
                      d="M50 72 C41 83 45 96 50 100 C55 96 59 83 50 72 Z"
                      fill="url(#fireOuterGrad)"
                      className="animate-pulse"
                    />
                    <path
                      d="M50 74 C44 82 46 91 50 95 C54 91 56 82 50 74 Z"
                      fill="#FFFFFF"
                    />

                    {/* Left & Right Stabilizer Wings */}
                    <path
                      d="M36 58 L23 69 L27 73 L36 69 Z"
                      fill="#E04A00"
                      stroke="#FFFFFF"
                      strokeWidth="1"
                      strokeOpacity="0.4"
                    />
                    <path
                      d="M64 58 L77 69 L73 73 L64 69 Z"
                      fill="#E04A00"
                      stroke="#FFFFFF"
                      strokeWidth="1"
                      strokeOpacity="0.4"
                    />

                    {/* Main Rocket Fuselage */}
                    <path
                      d="M50 12 C41 23 37 38 37 59 C37 65 41 69 50 69 C59 69 63 65 63 59 C63 38 59 23 50 12 Z"
                      fill="url(#heroRocketBodyGrad)"
                    />

                    {/* Central Cockpit Porthole */}
                    <circle
                      cx="50"
                      cy="38"
                      r="8"
                      fill="#0B0B0F"
                      stroke="#FFFFFF"
                      strokeWidth="2.5"
                    />
                    <circle cx="50" cy="38" r="4.5" fill="#E04A00" />
                    <circle cx="52" cy="36" r="1.5" fill="#FFFFFF" />

                    {/* Gradients */}
                    <defs>
                      <linearGradient
                        id="heroRocketBodyGrad"
                        x1="0"
                        y1="0"
                        x2="1"
                        y2="1"
                      >
                        <stop offset="0%" stopColor="#FFFFFF" />
                        <stop offset="45%" stopColor="#F57C00" />
                        <stop offset="100%" stopColor="#E04A00" />
                      </linearGradient>
                      <linearGradient
                        id="fireOuterGrad"
                        x1="0"
                        y1="0"
                        x2="0"
                        y2="1"
                      >
                        <stop offset="0%" stopColor="#F57C00" />
                        <stop offset="100%" stopColor="#E04A00" stopOpacity="0.3" />
                      </linearGradient>
                    </defs>
                  </svg>
                </div>
              </motion.div>
            </div>
          </div>
        </div>
      </div>

      {/* Bouncing Scroll Down Indicator */}
      <div className="absolute bottom-6 left-1/2 -translate-x-1/2 flex flex-col items-center gap-1 opacity-60 hover:opacity-100 transition-opacity select-none">
        <span className="text-[10px] uppercase font-bold tracking-[0.25em] text-muted">
          Scroll
        </span>
        <motion.div
          animate={prefersReducedMotion ? {} : { y: [0, 6, 0] }}
          transition={{ duration: 1.5, repeat: Infinity, ease: "easeInOut" }}
        >
          <ChevronDown className="w-4 h-4 text-brand-orange" />
        </motion.div>
      </div>
    </section>
  );
}
