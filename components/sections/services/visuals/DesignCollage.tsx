"use client";

import React, { useState } from "react";
import { motion, useReducedMotion } from "framer-motion";
import { Sparkles, Layers, Palette, Type } from "lucide-react";

export function DesignCollage() {
  const [isHovered, setIsHovered] = useState(false);
  const prefersReducedMotion = useReducedMotion();

  return (
    <div
      className="relative mx-auto w-full max-w-[360px] sm:max-w-[420px] aspect-[4/3] flex items-center justify-center cursor-pointer select-none"
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      onTouchStart={() => setIsHovered((prev) => !prev)}
    >
      {/* Background glow */}
      <div className="absolute -inset-4 bg-brand-orange/15 rounded-3xl blur-2xl pointer-events-none" />

      {/* Card 1: Brand Color Palette (Back left) */}
      <motion.div
        animate={
          prefersReducedMotion
            ? {}
            : isHovered
            ? { x: -75, y: -45, rotate: -12, scale: 1.02 }
            : { x: -40, y: -25, rotate: -6, scale: 0.96 }
        }
        transition={{ type: "spring", stiffness: 220, damping: 20 }}
        className="absolute w-48 sm:w-56 p-4 rounded-2xl bg-ink-soft border border-white/10 shadow-xl"
      >
        <div className="flex items-center justify-between mb-3 text-xs text-white/70">
          <span className="flex items-center gap-1.5 font-mono text-[10px] uppercase text-brand-orange">
            <Palette className="w-3 h-3" /> Palette
          </span>
          <span className="text-[10px] text-white/40">Tokens</span>
        </div>
        <div className="grid grid-cols-4 gap-1.5 h-10 rounded-lg overflow-hidden border border-white/5">
          <div className="bg-brand-orange flex items-center justify-center text-[8px] font-mono text-white/90">
            #E0
          </div>
          <div className="bg-brand-amber flex items-center justify-center text-[8px] font-mono text-white/90">
            #F5
          </div>
          <div className="bg-ink flex items-center justify-center text-[8px] font-mono text-white/70">
            #0B
          </div>
          <div className="bg-paper flex items-center justify-center text-[8px] font-mono text-ink font-bold">
            #FF
          </div>
        </div>
        <p className="mt-2 text-[10px] font-mono text-white/50 text-right">
          WCAG AA Compliant
        </p>
      </motion.div>

      {/* Card 2: Typography Specimen (Back right) */}
      <motion.div
        animate={
          prefersReducedMotion
            ? {}
            : isHovered
            ? { x: 75, y: -45, rotate: 14, scale: 1.02 }
            : { x: 40, y: -20, rotate: 7, scale: 0.96 }
        }
        transition={{ type: "spring", stiffness: 220, damping: 20 }}
        className="absolute w-48 sm:w-56 p-4 rounded-2xl bg-ink border border-white/15 shadow-xl"
      >
        <div className="flex items-center justify-between mb-2 text-xs text-white/70">
          <span className="flex items-center gap-1.5 font-mono text-[10px] uppercase text-brand-amber">
            <Type className="w-3 h-3" /> Typography
          </span>
          <span className="text-[10px] text-white/40">Scale</span>
        </div>
        <div className="font-display text-2xl uppercase tracking-wider text-white leading-none">
          BEBAS NEUE
        </div>
        <div className="font-body text-xs text-white/60 mt-1">
          Inter · Body Regular & Medium
        </div>
        <div className="mt-2 h-1 w-full bg-brand-gradient rounded-full" />
      </motion.div>

      {/* Card 3: Social Creative / Poster (Bottom center) */}
      <motion.div
        animate={
          prefersReducedMotion
            ? {}
            : isHovered
            ? { x: 0, y: 70, rotate: 0, scale: 1.02 }
            : { x: 0, y: 40, rotate: 2, scale: 0.98 }
        }
        transition={{ type: "spring", stiffness: 220, damping: 20 }}
        className="absolute w-56 sm:w-64 p-3.5 rounded-2xl bg-ink-soft border border-white/10 shadow-2xl"
      >
        <div className="flex items-center justify-between text-[10px] text-white/60 mb-2">
          <span className="font-mono text-brand-orange">[POSTER SPECIMEN]</span>
          <span>1080 × 1350</span>
        </div>
        <div className="h-20 rounded-xl bg-gradient-to-r from-ink via-ink-soft to-black border border-white/5 p-2.5 flex flex-col justify-between">
          <div className="flex items-center gap-1.5">
            <div className="w-2 h-2 rounded-full bg-brand-orange" />
            <span className="text-[9px] uppercase tracking-wider font-display text-white/80">
              TechUP Creative System
            </span>
          </div>
          <p className="text-[10px] font-semibold text-white leading-tight">
            Stand out in crowded feeds with cohesive visual direction.
          </p>
        </div>
      </motion.div>

      {/* Card 4: Main Logo Identity Mark (Front center) */}
      <motion.div
        animate={
          prefersReducedMotion
            ? {}
            : isHovered
            ? { x: 0, y: -10, rotate: 0, scale: 1.06 }
            : { x: 0, y: 0, rotate: -2, scale: 1 }
        }
        transition={{ type: "spring", stiffness: 240, damping: 18 }}
        className="relative z-10 w-52 sm:w-60 p-5 rounded-2xl bg-gradient-to-br from-ink-soft to-ink border-2 border-brand-orange/40 shadow-2xl"
      >
        <div className="flex items-center justify-between mb-3">
          <div className="w-8 h-8 rounded-lg bg-brand-gradient flex items-center justify-center text-white font-bold shadow-md shadow-brand-orange/30">
            <Sparkles className="w-4 h-4" />
          </div>
          <span className="text-[9px] font-mono uppercase tracking-wider text-brand-amber bg-black/50 px-2 py-0.5 rounded border border-brand-orange/20">
            [BRAND LOGO]
          </span>
        </div>
        <div className="space-y-1">
          <div className="font-display uppercase text-lg text-white tracking-wide">
            BRAND IDENTITY SYSTEM
          </div>
          <p className="text-[11px] font-body text-white/70 leading-snug">
            Custom logomarks, typography rules & brand guidelines built for modern authority.
          </p>
        </div>
        <div className="mt-3 pt-2.5 border-t border-white/10 flex items-center justify-between text-[10px] text-white/50">
          <span className="flex items-center gap-1">
            <Layers className="w-3 h-3 text-brand-orange" /> Vector Assets
          </span>
          <span className="text-brand-orange font-medium">Hover to shuffle</span>
        </div>
      </motion.div>
    </div>
  );
}
