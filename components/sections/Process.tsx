"use client";

import React, { useRef } from "react";
import { motion, useScroll, useTransform, useReducedMotion } from "framer-motion";
import { Rocket } from "lucide-react";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { PROCESS_CONTENT } from "@/content/home";
import { defaultViewport } from "@/lib/motion";

export function Process() {
  const containerRef = useRef<HTMLElement>(null);
  const prefersReducedMotion = useReducedMotion();

  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start 70%", "end 60%"],
  });

  const desktopLineWidth = useTransform(scrollYProgress, [0, 1], ["0%", "100%"]);
  const desktopRocketLeft = useTransform(scrollYProgress, [0, 1], ["0%", "100%"]);

  const mobileLineHeight = useTransform(scrollYProgress, [0, 1], ["0%", "100%"]);
  const mobileRocketTop = useTransform(scrollYProgress, [0, 1], ["0%", "100%"]);

  return (
    <section
      ref={containerRef}
      className="bg-ink text-paper py-20 md:py-32 border-b border-white/10 relative overflow-hidden"
    >
      <div className="max-w-content mx-auto px-6 md:px-12">
        <SectionHeading
          eyebrow={PROCESS_CONTENT.eyebrow}
          title={PROCESS_CONTENT.heading}
          subtitle="A clear, predictable roadmap from initial discovery to long-term digital growth."
        />

        {/* ========================================= */}
        {/* DESKTOP TIMELINE (Horizontal) */}
        {/* ========================================= */}
        <div className="hidden lg:block relative mt-20">
          {/* Base Track */}
          <div
            aria-hidden="true"
            className="absolute top-10 left-[8%] right-[8%] h-[3px] bg-white/10 rounded-full"
          >
            {/* Scroll-drawn progress line */}
            <motion.div
              style={{
                width: prefersReducedMotion ? "100%" : desktopLineWidth,
              }}
              className="h-full bg-brand-gradient origin-left rounded-full shadow-brand-glow"
            />

            {/* Traveling Rocket along the horizontal track */}
            {!prefersReducedMotion && (
              <motion.div
                style={{
                  left: desktopRocketLeft,
                  translateX: "-50%",
                  translateY: "-50%",
                }}
                className="absolute top-1/2 w-8 h-8 rounded-full bg-brand-orange text-white flex items-center justify-center shadow-brand-glow z-20 pointer-events-none"
              >
                <Rocket className="w-4 h-4 rotate-45" />
              </motion.div>
            )}
          </div>

          <div className="grid grid-cols-4 gap-8 relative z-10">
            {PROCESS_CONTENT.steps.map((step, idx) => (
              <motion.div
                key={step.stepNumber}
                initial={prefersReducedMotion ? {} : { opacity: 0, y: 24 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={defaultViewport}
                transition={{
                  duration: 0.5,
                  delay: idx * 0.12,
                  ease: "easeOut",
                }}
                className="flex flex-col items-center text-center p-6 rounded-2xl bg-ink-soft border border-white/10 hover:border-brand-orange/40 transition-colors group"
              >
                {/* Node icon / Number */}
                <div className="w-20 h-20 rounded-full bg-ink border-2 border-brand-orange/40 text-brand-orange flex items-center justify-center mb-6 shadow-brand-glow group-hover:bg-brand-gradient group-hover:text-white group-hover:scale-105 transition-all duration-300">
                  {idx === 3 ? (
                    <Rocket className="w-8 h-8" />
                  ) : (
                    <span className="font-display text-3xl font-bold">
                      {step.stepNumber}
                    </span>
                  )}
                </div>

                <h3 className="font-display uppercase text-2xl text-white tracking-wide mb-2 group-hover:text-brand-orange transition-colors">
                  {step.title}
                </h3>
                <p className="font-body text-sm text-muted leading-relaxed">
                  {step.summary}
                </p>
              </motion.div>
            ))}
          </div>
        </div>

        {/* ========================================= */}
        {/* MOBILE & TABLET TIMELINE (Vertical) */}
        {/* ========================================= */}
        <div className="lg:hidden relative mt-12 pl-4 sm:pl-8">
          {/* Vertical Track */}
          <div
            aria-hidden="true"
            className="absolute top-4 bottom-8 left-8 sm:left-12 w-[3px] bg-white/10 rounded-full"
          >
            {/* Scroll-drawn vertical progress line */}
            <motion.div
              style={{
                height: prefersReducedMotion ? "100%" : mobileLineHeight,
              }}
              className="w-full bg-brand-gradient origin-top rounded-full shadow-brand-glow"
            />

            {/* Traveling Rocket along vertical line */}
            {!prefersReducedMotion && (
              <motion.div
                style={{
                  top: mobileRocketTop,
                  translateX: "-50%",
                  translateY: "-50%",
                }}
                className="absolute left-1/2 w-7 h-7 rounded-full bg-brand-orange text-white flex items-center justify-center shadow-brand-glow z-20 pointer-events-none"
              >
                <Rocket className="w-3.5 h-3.5 rotate-135" />
              </motion.div>
            )}
          </div>

          <div className="flex flex-col gap-8 relative z-10">
            {PROCESS_CONTENT.steps.map((step, idx) => (
              <motion.div
                key={step.stepNumber}
                initial={prefersReducedMotion ? {} : { opacity: 0, x: 20 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={defaultViewport}
                transition={{
                  duration: 0.5,
                  delay: idx * 0.1,
                  ease: "easeOut",
                }}
                className="flex items-start gap-5 pl-10 sm:pl-16 relative"
              >
                {/* Node marker */}
                <div className="absolute left-4 sm:left-8 -translate-x-1/2 top-4 w-9 h-9 rounded-full bg-ink border-2 border-brand-orange text-brand-orange flex items-center justify-center text-xs font-bold font-display z-10 shadow-brand-glow">
                  {step.stepNumber}
                </div>

                <div className="w-full p-6 rounded-2xl bg-ink-soft border border-white/10 hover:border-brand-orange/40 transition-colors">
                  <h3 className="font-display uppercase text-2xl text-white tracking-wide mb-2">
                    {step.title}
                  </h3>
                  <p className="font-body text-sm text-muted leading-relaxed">
                    {step.summary}
                  </p>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
