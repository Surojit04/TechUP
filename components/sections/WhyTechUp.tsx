"use client";

import React from "react";
import { motion, useReducedMotion } from "framer-motion";
import { ArrowRight, Sparkles } from "lucide-react";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { Card } from "@/components/ui/Card";
import { Button } from "@/components/ui/Button";
import { WHY_US_CONTENT } from "@/content/home";
import { defaultViewport } from "@/lib/motion";

export function WhyTechUp() {
  const prefersReducedMotion = useReducedMotion();

  return (
    <section id="about" className="bg-paper text-ink py-20 md:py-32 border-b border-ink/5 relative overflow-hidden scroll-mt-24">
      {/* Background Ambience */}
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-0 overflow-hidden select-none"
      >
        <div className="absolute top-1/2 right-0 w-80 h-80 rounded-full bg-brand-orange/5 blur-3xl" />
        <div className="absolute inset-0 bg-[radial-gradient(#0B0B0F_0.75px,transparent_0.75px)] [background-size:24px_24px] opacity-[0.03]" />
      </div>

      <div className="max-w-content mx-auto px-6 md:px-12 relative z-10">
        <SectionHeading
          eyebrow={WHY_US_CONTENT.eyebrow}
          title={WHY_US_CONTENT.heading}
          theme="light"
          subtitle="Why ambitious creators and growing businesses choose TechUP Digital over fragmented freelancers."
        />

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {WHY_US_CONTENT.features.map((feature, idx) => (
            <motion.div
              key={feature.number}
              initial={prefersReducedMotion ? {} : { opacity: 0, y: 24 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={defaultViewport}
              transition={{
                duration: 0.5,
                delay: idx * 0.1,
                ease: "easeOut",
              }}
            >
              <Card
                theme="light"
                tilt
                className="h-full flex flex-col justify-between p-8 hover:shadow-brand-glow group border border-ink/10 bg-white"
              >
                <div>
                  <div className="flex items-center justify-between mb-4">
                    <span className="font-display text-5xl text-brand-orange block group-hover:scale-105 transition-transform duration-300">
                      {feature.number}
                    </span>
                    <span className="w-8 h-1 bg-brand-orange/20 rounded-full group-hover:bg-brand-orange transition-colors" />
                  </div>

                  <h3 className="font-display uppercase text-2xl md:text-3xl text-ink tracking-wide mb-3 group-hover:text-brand-orange transition-colors">
                    {feature.title}
                  </h3>
                </div>
                <p className="font-body text-sm md:text-base text-muted leading-relaxed mt-4">
                  {feature.text}
                </p>
              </Card>
            </motion.div>
          ))}

          {/* 6th Slot: The TechUP Guarantee CTA Card to perfectly balance the 3x2 grid */}
          <motion.div
            initial={prefersReducedMotion ? {} : { opacity: 0, y: 24 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={defaultViewport}
            transition={{
              duration: 0.5,
              delay: 0.5,
              ease: "easeOut",
            }}
          >
            <div className="h-full rounded-[20px] p-8 bg-ink-soft text-paper border border-brand-orange/40 shadow-brand-glow flex flex-col justify-between group hover:-translate-y-1 transition-all duration-300">
              <div>
                <div className="flex items-center justify-between mb-4">
                  <span className="font-display text-4xl text-brand-orange">
                    06 //
                  </span>
                  <div className="w-8 h-8 rounded-full bg-brand-orange/20 flex items-center justify-center text-brand-orange">
                    <Sparkles className="w-4 h-4" />
                  </div>
                </div>

                <h3 className="font-display uppercase text-2xl md:text-3xl text-white tracking-wide mb-3">
                  The TechUP Guarantee
                </h3>

                <p className="font-body text-sm text-paper/80 leading-relaxed">
                  Founder accountability, clear turnaround sprints, and guaranteed revision rounds until you love the output.
                </p>
              </div>

              <div className="pt-6 mt-4 border-t border-white/10">
                <Button href="/contact" size="sm" className="w-full">
                  <span className="flex items-center justify-center gap-2">
                    <span>Work With Us</span>
                    <ArrowRight className="w-4 h-4" />
                  </span>
                </Button>
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
