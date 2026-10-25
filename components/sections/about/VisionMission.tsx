"use client";

import React, { useState } from "react";
import { motion, useReducedMotion } from "framer-motion";
import { Compass, Target, ArrowUpRight } from "lucide-react";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { VISION_MISSION_CONTENT } from "@/content/about";
import { cn } from "@/lib/utils";

export function VisionMission() {
  const prefersReducedMotion = useReducedMotion();
  const [hoveredCard, setHoveredCard] = useState<"vision" | "mission" | null>(null);

  const { vision, mission } = VISION_MISSION_CONTENT;

  return (
    <section className="relative py-24 md:py-32 bg-ink text-white overflow-hidden border-t border-white/10">
      {/* Background glow */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-96 h-96 bg-brand-orange/10 rounded-full blur-[140px] pointer-events-none" />

      <div className="container max-w-7xl mx-auto px-4 sm:px-6 relative z-10">
        <SectionHeading
          eyebrow="Vision & Mission"
          title="WHERE WE ARE HEADED"
          subtitle="Our driving commitments to building long-term value, creative consistency, and client trust."
          align="center"
          theme="dark"
        />

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 lg:gap-12 mt-12">
          {/* Vision Card (Slides from left) */}
          <motion.div
            initial={prefersReducedMotion ? { opacity: 1 } : { opacity: 0, x: -40 }}
            whileInView={prefersReducedMotion ? { opacity: 1 } : { opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
            onMouseEnter={() => setHoveredCard("vision")}
            onMouseLeave={() => setHoveredCard(null)}
            className="group relative p-8 sm:p-10 rounded-3xl bg-ink-soft border border-white/10 overflow-hidden shadow-2xl transition-all duration-300 hover:border-brand-orange/40 hover:-translate-y-1"
          >
            {/* Giant Outlined Background Word */}
            <div
              className={cn(
                "absolute -bottom-6 -right-4 font-display text-8xl sm:text-9xl font-bold tracking-tighter select-none pointer-events-none transition-all duration-500",
                hoveredCard === "vision"
                  ? "text-transparent bg-clip-text bg-gradient-to-t from-brand-orange to-brand-amber opacity-40 scale-105"
                  : "text-transparent opacity-15"
              )}
              style={{
                WebkitTextStroke: "1.5px rgba(224, 74, 0, 0.5)",
              }}
            >
              {vision.label}
            </div>

            {/* Card Content */}
            <div className="relative z-10">
              <div className="w-12 h-12 rounded-2xl bg-brand-orange/15 border border-brand-orange/30 text-brand-orange flex items-center justify-center mb-6 shadow-md shadow-brand-orange/20">
                <Compass className="w-6 h-6" />
              </div>

              <span className="font-mono text-xs uppercase tracking-widest text-brand-orange block mb-2 font-semibold">
                {"//"} {vision.label}
              </span>

              <h3 className="font-display uppercase text-3xl sm:text-4xl text-white tracking-wide mb-4">
                {vision.title}
              </h3>

              <p className="font-body text-base sm:text-lg text-white/80 leading-relaxed">
                {vision.text}
              </p>
            </div>
          </motion.div>

          {/* Mission Card (Slides from right) */}
          <motion.div
            initial={prefersReducedMotion ? { opacity: 1 } : { opacity: 0, x: 40 }}
            whileInView={prefersReducedMotion ? { opacity: 1 } : { opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
            onMouseEnter={() => setHoveredCard("mission")}
            onMouseLeave={() => setHoveredCard(null)}
            className="group relative p-8 sm:p-10 rounded-3xl bg-ink-soft border border-white/10 overflow-hidden shadow-2xl transition-all duration-300 hover:border-brand-orange/40 hover:-translate-y-1"
          >
            {/* Giant Outlined Background Word */}
            <div
              className={cn(
                "absolute -bottom-6 -right-4 font-display text-8xl sm:text-9xl font-bold tracking-tighter select-none pointer-events-none transition-all duration-500",
                hoveredCard === "mission"
                  ? "text-transparent bg-clip-text bg-gradient-to-t from-brand-orange to-brand-amber opacity-40 scale-105"
                  : "text-transparent opacity-15"
              )}
              style={{
                WebkitTextStroke: "1.5px rgba(224, 74, 0, 0.5)",
              }}
            >
              {mission.label}
            </div>

            {/* Card Content */}
            <div className="relative z-10">
              <div className="w-12 h-12 rounded-2xl bg-brand-orange/15 border border-brand-orange/30 text-brand-orange flex items-center justify-center mb-6 shadow-md shadow-brand-orange/20">
                <Target className="w-6 h-6" />
              </div>

              <span className="font-mono text-xs uppercase tracking-widest text-brand-orange block mb-2 font-semibold">
                {"//"} {mission.label}
              </span>

              <h3 className="font-display uppercase text-3xl sm:text-4xl text-white tracking-wide mb-4">
                {mission.title}
              </h3>

              <p className="font-body text-base sm:text-lg text-white/80 leading-relaxed">
                {mission.text}
              </p>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
