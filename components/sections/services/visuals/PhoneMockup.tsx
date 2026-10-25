"use client";

import React from "react";
import { motion, useReducedMotion } from "framer-motion";
import { Play, Volume2, Heart, MessageSquare, Share2, Music } from "lucide-react";

export function PhoneMockup() {
  const prefersReducedMotion = useReducedMotion();

  return (
    <div className="relative mx-auto w-full max-w-[280px] sm:max-w-[300px]">
      {/* Soft orange ambient glow behind phone */}
      <div className="absolute -inset-4 bg-brand-orange/15 rounded-[44px] blur-2xl pointer-events-none" />

      {/* Phone chassis */}
      <div className="relative rounded-[36px] bg-ink-soft p-2.5 shadow-2xl border-2 border-white/10 ring-1 ring-black/40">
        {/* Dynamic Island / Notch */}
        <div className="absolute top-4 left-1/2 -translate-x-1/2 w-24 h-4 bg-black rounded-full z-20 flex items-center justify-center">
          <div className="w-2 h-2 rounded-full bg-ink mr-3" />
          <div className="w-1.5 h-1.5 rounded-full bg-brand-orange/60" />
        </div>

        {/* Screen container: 9:16 aspect ratio */}
        <div className="relative w-full aspect-[9/16] rounded-[28px] overflow-hidden bg-gradient-to-b from-ink via-ink-soft to-ink flex flex-col justify-between p-4 border border-white/5 select-none">
          {/* Subtle grid pattern background */}
          <div
            className="absolute inset-0 opacity-10 pointer-events-none"
            style={{
              backgroundImage: "radial-gradient(#ffffff 1px, transparent 1px)",
              backgroundSize: "16px 16px",
            }}
          />

          {/* Top Bar inside Reel */}
          <div className="relative z-10 pt-4 flex items-center justify-between text-white/80">
            <span className="font-display tracking-wider text-xs uppercase bg-black/40 px-2 py-0.5 rounded-full border border-white/10">
              Reels
            </span>
            <div className="flex items-center gap-1.5 bg-black/40 px-2 py-0.5 rounded-full border border-white/10 text-xs">
              <Volume2 className="w-3 h-3 text-brand-orange" />
              <span className="text-[10px] text-white/70">Original Audio</span>
            </div>
          </div>

          {/* Center Play Graphic & Waveform */}
          <div className="relative z-10 flex flex-col items-center justify-center gap-3">
            <motion.div
              animate={prefersReducedMotion ? {} : { scale: [1, 1.06, 1] }}
              transition={{ repeat: Infinity, duration: 2.4, ease: "easeInOut" }}
              className="w-14 h-14 rounded-full bg-brand-gradient flex items-center justify-center shadow-lg shadow-brand-orange/30 cursor-pointer"
            >
              <Play className="w-6 h-6 text-white fill-white translate-x-0.5" />
            </motion.div>

            <div className="text-center px-2">
              <span className="text-[11px] font-mono uppercase tracking-wider text-brand-amber bg-black/60 px-2.5 py-1 rounded border border-brand-orange/30">
                [REEL PREVIEW: 9:16 CLIP]
              </span>
            </div>

            {/* Animated Audio Waveform */}
            <div className="flex items-center justify-center gap-1 h-8 mt-1">
              {[40, 75, 55, 90, 65, 80, 50, 95, 70, 85, 45, 60].map((h, i) => (
                <motion.div
                  key={i}
                  animate={
                    prefersReducedMotion
                      ? { height: `${h}%` }
                      : { height: [`${Math.max(20, h - 35)}%`, `${h}%`, `${Math.max(20, h - 35)}%`] }
                  }
                  transition={{
                    repeat: Infinity,
                    duration: 1.2,
                    delay: i * 0.08,
                    ease: "easeInOut",
                  }}
                  className="w-1 bg-brand-orange/70 rounded-full"
                />
              ))}
            </div>
          </div>

          {/* Reel Bottom Meta & Actions */}
          <div className="relative z-10 flex items-end justify-between">
            {/* Creator info & caption */}
            <div className="flex-1 pr-3">
              <div className="flex items-center gap-1.5 mb-1.5">
                <div className="w-5 h-5 rounded-full bg-brand-orange flex items-center justify-center text-[9px] font-bold text-white">
                  TU
                </div>
                <span className="text-xs font-semibold text-white">@techup.digital</span>
                <span className="text-[10px] text-white/60">· Follow</span>
              </div>
              <p className="text-[11px] text-white/90 line-clamp-2 leading-tight">
                High-retention reel pacing with kinetic subtitles and sound design for [CLIENT NAME].
              </p>
              <div className="flex items-center gap-1 mt-1.5 text-[10px] text-brand-orange">
                <Music className="w-2.5 h-2.5" />
                <span className="truncate">TechUP Digital · Viral Audio Edit</span>
              </div>
            </div>

            {/* Right sidebar actions */}
            <div className="flex flex-col items-center gap-2.5 text-white/90">
              <div className="flex flex-col items-center">
                <div className="w-8 h-8 rounded-full bg-black/40 flex items-center justify-center border border-white/10">
                  <Heart className="w-4 h-4 text-brand-orange fill-brand-orange" />
                </div>
                <span className="text-[10px] mt-0.5 font-mono">24.6K</span>
              </div>
              <div className="flex flex-col items-center">
                <div className="w-8 h-8 rounded-full bg-black/40 flex items-center justify-center border border-white/10">
                  <MessageSquare className="w-4 h-4" />
                </div>
                <span className="text-[10px] mt-0.5 font-mono">842</span>
              </div>
              <div className="flex flex-col items-center">
                <div className="w-8 h-8 rounded-full bg-black/40 flex items-center justify-center border border-white/10">
                  <Share2 className="w-4 h-4" />
                </div>
                <span className="text-[10px] mt-0.5 font-mono">Share</span>
              </div>
            </div>
          </div>

          {/* Bottom progress bar */}
          <div className="absolute bottom-0 left-0 right-0 h-1 bg-white/10">
            <motion.div
              animate={prefersReducedMotion ? { width: "65%" } : { width: ["0%", "100%"] }}
              transition={{ repeat: Infinity, duration: 8, ease: "linear" }}
              className="h-full bg-brand-orange"
            />
          </div>
        </div>
      </div>
    </div>
  );
}
