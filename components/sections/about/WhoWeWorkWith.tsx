"use client";

import React from "react";
import { motion, useReducedMotion } from "framer-motion";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { WHO_WE_WORK_WITH_CONTENT } from "@/content/about";

export function WhoWeWorkWith() {
  const prefersReducedMotion = useReducedMotion();
  const { eyebrow, heading, tags } = WHO_WE_WORK_WITH_CONTENT;

  return (
    <section className="relative py-24 md:py-32 bg-ink text-white overflow-hidden border-t border-white/10">
      {/* Background glow */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[500px] h-[500px] bg-brand-orange/[0.06] rounded-full blur-[140px] pointer-events-none" />

      <div className="container max-w-7xl mx-auto px-4 sm:px-6 relative z-10 text-center">
        <SectionHeading
          eyebrow={eyebrow}
          title={heading}
          subtitle="From ambitious individual creators to high-growth businesses across India, we partner with clients ready to stand out."
          align="center"
          theme="dark"
          className="max-w-3xl mx-auto mb-12"
        />

        {/* Floating pill tags */}
        <div className="flex flex-wrap items-center justify-center gap-3 sm:gap-4 max-w-4xl mx-auto">
          {tags.map((tag, index) => {
            // Offset float animation
            const floatY = index % 2 === 0 ? [-3, 4, -3] : [3, -4, 3];
            const floatDuration = 3.5 + (index % 3) * 0.8;

            return (
              <motion.div
                key={tag}
                animate={
                  prefersReducedMotion
                    ? {}
                    : { y: floatY }
                }
                transition={{
                  repeat: Infinity,
                  duration: floatDuration,
                  ease: "easeInOut",
                }}
                whileHover={
                  prefersReducedMotion
                    ? {}
                    : { scale: 1.05, y: -6 }
                }
                className="group relative px-5 py-3 sm:px-6 sm:py-3.5 rounded-full bg-ink-soft border border-white/10 hover:border-brand-orange/60 hover:bg-white/[0.06] transition-all duration-300 shadow-lg hover:shadow-brand-orange/20 cursor-default select-none"
              >
                <div className="flex items-center gap-2.5">
                  <span className="w-2 h-2 rounded-full bg-brand-orange group-hover:scale-125 transition-transform" />
                  <span className="font-display uppercase text-sm sm:text-base tracking-wider text-white/90 group-hover:text-white transition-colors">
                    {tag}
                  </span>
                </div>
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
