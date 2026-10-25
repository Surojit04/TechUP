"use client";

import React from "react";
import { Counter } from "@/components/ui/Counter";
import { RESULTS_STRIP_CONFIG } from "@/content/work";

interface ResultsStripProps {
  forceShow?: boolean;
}

export function ResultsStrip({ forceShow = false }: ResultsStripProps) {
  const shouldShow = forceShow || RESULTS_STRIP_CONFIG.showResultsStrip;

  // SPEC RULE: "Hide the results counters strip until real numbers exist."
  if (!shouldShow) {
    return null;
  }

  return (
    <section className="relative py-16 md:py-20 bg-ink-soft text-white border-y border-white/10 overflow-hidden">
      <div className="container max-w-7xl mx-auto px-4 sm:px-6 relative z-10">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 text-center divide-y md:divide-y-0 md:divide-x divide-white/10">
          {RESULTS_STRIP_CONFIG.counters.map((counter, idx) => (
            <div key={idx} className="pt-6 md:pt-0 px-4">
              <div className="font-display text-5xl sm:text-6xl text-brand-orange tracking-tight mb-2">
                <Counter value={counter.value} />
              </div>
              <p className="font-mono text-xs uppercase tracking-widest text-white/60">
                {counter.label}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
