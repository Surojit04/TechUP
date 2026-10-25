"use client";

import React from "react";
import { motion, useReducedMotion } from "framer-motion";
import { Quote } from "lucide-react";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { FOUNDERS_NOTE_CONTENT } from "@/content/about";

export function FoundersNote() {
  const prefersReducedMotion = useReducedMotion();
  const { quote, founderName, founderTitle, placeholderNotice } = FOUNDERS_NOTE_CONTENT;

  return (
    <section className="relative py-24 md:py-32 bg-paper text-ink overflow-hidden border-t border-ink/5">
      <div className="container max-w-7xl mx-auto px-4 sm:px-6 relative z-10">
        <SectionHeading
          eyebrow="Founder's perspective"
          title="A NOTE FROM OUR FOUNDER"
          align="center"
          theme="light"
          className="max-w-3xl mx-auto mb-12"
        />

        <div className="max-w-4xl mx-auto p-8 sm:p-12 md:p-16 rounded-3xl bg-mist border border-ink/10 shadow-xl relative">
          {/* Giant Stylized Orange Quote Mark */}
          <div className="text-brand-orange/20 absolute -top-8 left-8 sm:left-12 pointer-events-none select-none">
            <span className="font-display text-8xl sm:text-9xl leading-none">“</span>
          </div>

          <div className="relative z-10">
            {/* Founder Note Text */}
            <motion.p
              initial={prefersReducedMotion ? { opacity: 1 } : { opacity: 0, y: 20 }}
              whileInView={prefersReducedMotion ? { opacity: 1 } : { opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
              className="font-body text-lg sm:text-xl md:text-2xl text-ink leading-relaxed font-normal mb-8"
            >
              “{quote}”
            </motion.p>

            {/* Founder Signature & Avatar */}
            <div className="pt-6 border-t border-ink/10 flex items-center justify-between flex-wrap gap-4">
              <div className="flex items-center gap-4">
                {/* Silhouette avatar with initials DS */}
                <div className="relative w-14 h-14 rounded-full bg-ink flex items-center justify-center ring-2 ring-brand-orange shadow-md">
                  <span className="font-display text-xl text-brand-orange font-bold">
                    DS
                  </span>
                </div>
                <div>
                  <h4 className="font-display uppercase text-xl text-ink tracking-wide">
                    {founderName}
                  </h4>
                  <p className="font-mono text-xs uppercase tracking-wider text-brand-orange font-semibold">
                    {founderTitle} · TechUP Digital
                  </p>
                </div>
              </div>

              <div className="font-mono text-xs text-muted uppercase tracking-wider">
                Kolkata, India
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
