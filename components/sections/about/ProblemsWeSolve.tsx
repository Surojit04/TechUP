"use client";

import React, { useState } from "react";
import { motion, useReducedMotion } from "framer-motion";
import { ArrowRight, CheckCircle2 } from "lucide-react";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { PROBLEMS_WE_SOLVE_CONTENT } from "@/content/about";
import { cn } from "@/lib/utils";

export function ProblemsWeSolve() {
  const [activeRow, setActiveRow] = useState<number | null>(null);
  const prefersReducedMotion = useReducedMotion();

  const { eyebrow, heading, problems } = PROBLEMS_WE_SOLVE_CONTENT;

  return (
    <section className="relative py-24 md:py-32 bg-paper text-ink overflow-hidden border-t border-ink/5">
      <div className="container max-w-7xl mx-auto px-4 sm:px-6 relative z-10">
        <SectionHeading
          eyebrow={eyebrow}
          title={heading}
          subtitle="The common bottlenecks brands face when scaling online, and how our unified model solves them."
          align="center"
          theme="light"
          className="max-w-3xl mx-auto"
        />

        <div className="mt-12 max-w-4xl mx-auto flex flex-col gap-4">
          {problems.map((item, index) => {
            const isHovered = activeRow === index;

            return (
              <motion.div
                key={item.number}
                initial={prefersReducedMotion ? { opacity: 1 } : { opacity: 0, y: 20 }}
                whileInView={prefersReducedMotion ? { opacity: 1 } : { opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: index * 0.08 }}
                onMouseEnter={() => setActiveRow(index)}
                onMouseLeave={() => setActiveRow(null)}
                onClick={() => setActiveRow(isHovered ? null : index)}
                className={cn(
                  "p-6 sm:p-7 rounded-2xl border transition-all duration-300 cursor-pointer select-none",
                  isHovered
                    ? "bg-mist border-brand-orange/40 shadow-lg shadow-brand-orange/5 translate-x-1"
                    : "bg-white border-ink/10 hover:border-ink/20 shadow-sm"
                )}
              >
                <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
                  {/* Left: Number + Problem Statement */}
                  <div className="flex items-start sm:items-center gap-4 sm:gap-6">
                    <span className="font-display text-4xl sm:text-5xl font-bold text-brand-orange shrink-0">
                      {item.number}
                    </span>
                    <div>
                      <span className="font-mono text-[10px] uppercase tracking-wider text-muted block mb-0.5">
                        Bottleneck
                      </span>
                      <h3 className="font-display uppercase text-xl sm:text-2xl text-ink tracking-wide">
                        {item.problem}
                      </h3>
                    </div>
                  </div>

                  {/* Right: How TechUP Solves It */}
                  <div className="md:max-w-md md:text-right pl-14 md:pl-0">
                    <div className="flex items-center md:justify-end gap-1.5 text-brand-orange text-xs font-mono uppercase tracking-wider font-semibold mb-0.5">
                      <CheckCircle2 className="w-3.5 h-3.5" />
                      <span>How We Help</span>
                    </div>
                    <p className="font-body text-sm sm:text-base text-ink/80 leading-relaxed font-medium">
                      {item.solution}
                    </p>
                  </div>
                </div>
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
