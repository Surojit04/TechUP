"use client";

import React from "react";
import { motion, useReducedMotion } from "framer-motion";
import { Rocket, TrendingUp, CheckCircle2, ShieldAlert } from "lucide-react";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { GROWTH_DIRECTION_CONTENT } from "@/content/about";

export function GrowthDirection() {
  const prefersReducedMotion = useReducedMotion();
  const { eyebrow, heading, milestones } = GROWTH_DIRECTION_CONTENT;

  return (
    <section className="relative py-24 md:py-32 bg-paper text-ink overflow-hidden border-t border-ink/5">
      <div className="container max-w-7xl mx-auto px-4 sm:px-6 relative z-10">
        <SectionHeading
          eyebrow={eyebrow}
          title={heading}
          subtitle="How we are systematically investing in capabilities, delivery speed, and client transparency."
          align="center"
          theme="light"
          className="max-w-3xl mx-auto mb-16"
        />

        {/* Vertical Timeline */}
        <div className="max-w-3xl mx-auto relative">
          {/* Scroll-drawn center/left progress line */}
          <div className="absolute left-4 sm:left-1/2 -translate-x-1/2 top-4 bottom-4 w-0.5 bg-ink/10">
            <motion.div
              initial={prefersReducedMotion ? { height: "100%" } : { height: "0%" }}
              whileInView={prefersReducedMotion ? { height: "100%" } : { height: "100%" }}
              viewport={{ once: true }}
              transition={{ duration: 1.2, ease: "easeInOut" }}
              className="w-full bg-brand-gradient"
            />
          </div>

          <div className="space-y-10 sm:space-y-12">
            {milestones.map((milestone, index) => {
              const isEven = index % 2 === 0;

              return (
                <motion.div
                  key={milestone.title}
                  initial={prefersReducedMotion ? { opacity: 1 } : { opacity: 0, y: 25 }}
                  whileInView={prefersReducedMotion ? { opacity: 1 } : { opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.6, delay: index * 0.1 }}
                  className="relative flex items-start gap-6 sm:gap-0"
                >
                  {/* Timeline Node Icon (Centered on sm+, Left on mobile) */}
                  <div className="absolute left-4 sm:left-1/2 -translate-x-1/2 top-1.5 z-10 w-9 h-9 rounded-full bg-white border-2 border-brand-orange flex items-center justify-center text-brand-orange shadow-md">
                    <Rocket className="w-4 h-4 fill-brand-orange" />
                  </div>

                  {/* Card Container: Alternating Left and Right on sm+ screens */}
                  <div
                    className={`w-full pl-12 sm:pl-0 sm:w-1/2 ${
                      isEven
                        ? "sm:pr-10 sm:text-right sm:mr-auto"
                        : "sm:pl-10 sm:text-left sm:ml-auto"
                    }`}
                  >
                    <div className="p-6 rounded-2xl bg-mist border border-ink/10 shadow-sm hover:border-brand-orange/40 hover:shadow-md transition-all">
                      <span className="font-mono text-xs uppercase tracking-wider text-brand-orange font-semibold block mb-1">
                        Phase 0{index + 1} · {milestone.phase}
                      </span>
                      <h4 className="font-display uppercase text-xl text-ink tracking-wide mb-2">
                        {milestone.title}
                      </h4>
                      <p className="font-body text-sm text-ink/75 leading-relaxed">
                        {milestone.description}
                      </p>
                    </div>
                  </div>
                </motion.div>
              );
            })}
          </div>
        </div>
      </div>
    </section>
  );
}
