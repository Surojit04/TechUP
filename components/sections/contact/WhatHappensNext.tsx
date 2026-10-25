"use client";

import React from "react";
import { Lightbulb, MessageSquareShare, Compass, ArrowRight } from "lucide-react";

const STEPS = [
  {
    step: "01",
    title: "Share Your Idea",
    subtitle: "Tell us about your goals, requirements, and project vision.",
    description:
      "Submit your project inquiry using the form above or text our founder directly on WhatsApp with your project scope and reference links.",
    icon: Lightbulb,
  },
  {
    step: "02",
    title: "Discuss Your Needs",
    subtitle: "We review the inquiry and clarify the important project details.",
    description:
      "Our creative team analyzes your brief, evaluates production requirements, and connects with you to refine goals and align expectations.",
    icon: MessageSquareShare,
  },
  {
    step: "03",
    title: "Plan the Next Steps",
    subtitle: "Discuss the appropriate next steps for the project.",
    description:
      "We outline transparent scope, milestone deliverables, and creative direction, allowing you to kick off production with complete clarity.",
    icon: Compass,
  },
];

export function WhatHappensNext() {
  return (
    <section className="relative py-20 md:py-28 bg-ink border-t border-white/10 text-white overflow-hidden">
      {/* Background ambient lighting */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[700px] h-[350px] bg-brand-orange/[0.06] rounded-full blur-[140px] pointer-events-none" />

      <div className="container max-w-6xl mx-auto px-4 sm:px-6 relative z-10">
        {/* Section Header */}
        <div className="text-center max-w-2xl mx-auto mb-14 md:mb-16">
          <span className="font-mono text-xs uppercase tracking-widest text-brand-orange font-semibold block mb-2">
            {"// PROCESS TRANSPARENCY"}
          </span>
          <h2 className="font-display uppercase text-3xl sm:text-4xl md:text-5xl tracking-tight text-white mb-4">
            What Happens Next?
          </h2>
          <p className="font-body text-sm sm:text-base text-white/70">
            A straightforward, transparent onboarding path designed to get your project moving without unnecessary back-and-forth.
          </p>
        </div>

        {/* 3 Step Cards Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 lg:gap-8 relative">
          {STEPS.map((s, index) => {
            const Icon = s.icon;
            return (
              <div
                key={s.step}
                className="group relative p-7 sm:p-8 rounded-3xl bg-ink-soft/80 border border-white/10 hover:border-brand-orange/40 transition-all duration-300 flex flex-col justify-between"
              >
                {/* Top card metadata */}
                <div>
                  <div className="flex items-center justify-between gap-4 mb-6">
                    <span className="font-mono text-xs font-bold text-brand-orange tracking-widest px-3 py-1 rounded-full bg-brand-orange/10 border border-brand-orange/20">
                      STEP {s.step}
                    </span>
                    <div className="w-10 h-10 rounded-2xl bg-white/5 border border-white/10 flex items-center justify-center text-white/70 group-hover:bg-brand-orange group-hover:text-white group-hover:border-brand-orange transition-colors duration-300">
                      <Icon className="w-5 h-5" />
                    </div>
                  </div>

                  <h3 className="font-display uppercase text-xl sm:text-2xl text-white tracking-wide mb-2 group-hover:text-brand-orange transition-colors">
                    {s.title}
                  </h3>

                  <p className="font-body font-medium text-xs sm:text-sm text-white/80 mb-3 leading-relaxed">
                    {s.subtitle}
                  </p>

                  <p className="font-body text-xs text-white/60 leading-relaxed">
                    {s.description}
                  </p>
                </div>

                {/* Bottom subtle connector accent on desktop */}
                {index < STEPS.length - 1 && (
                  <div className="hidden lg:flex items-center gap-1.5 pt-6 text-[11px] font-mono uppercase tracking-wider text-white/30">
                    <span>Proceed to Step 0{index + 2}</span>
                    <ArrowRight className="w-3 h-3 text-brand-orange" />
                  </div>
                )}
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
