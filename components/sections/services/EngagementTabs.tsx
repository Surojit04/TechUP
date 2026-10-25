"use client";

import React, { useState } from "react";
import { motion, AnimatePresence, useReducedMotion } from "framer-motion";
import { Check, ArrowRight, ShieldCheck, Star } from "lucide-react";
import Link from "next/link";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { Badge } from "@/components/ui/Badge";
import { Button } from "@/components/ui/Button";
import { cn } from "@/lib/utils";
import { ENGAGEMENT_MODELS, EngagementModel } from "@/content/services";

export function EngagementTabs() {
  const [activeTabId, setActiveTabId] = useState<string>("retainer");
  const prefersReducedMotion = useReducedMotion();

  const activeModel =
    ENGAGEMENT_MODELS.find((m) => m.id === activeTabId) || ENGAGEMENT_MODELS[0];

  return (
    <section className="relative py-24 md:py-32 bg-ink text-white overflow-hidden border-t border-white/10">
      {/* Background glow */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-96 h-96 bg-brand-orange/10 rounded-full blur-[140px] pointer-events-none" />

      <div className="container max-w-7xl mx-auto px-4 sm:px-6 relative z-10">
        <SectionHeading
          eyebrow="Flexible Partnership"
          title="WORK WITH US YOUR WAY"
          subtitle="Choose the engagement model that best fits your immediate milestones, capacity, and growth pace."
          align="center"
          theme="dark"
        />

        {/* Tab navigation pills */}
        <div className="flex items-center justify-start md:justify-center gap-2 sm:gap-3 overflow-x-auto no-scrollbar pb-2 mb-10 max-w-4xl mx-auto">
          {ENGAGEMENT_MODELS.map((model) => {
            const isActive = activeTabId === model.id;
            return (
              <button
                key={model.id}
                type="button"
                onClick={() => setActiveTabId(model.id)}
                className={cn(
                  "relative px-4 sm:px-6 py-3 rounded-full text-xs sm:text-sm font-medium transition-all duration-300 shrink-0 select-none",
                  isActive
                    ? "bg-brand-gradient text-white shadow-lg shadow-brand-orange/30 font-semibold ring-1 ring-white/20"
                    : "bg-ink-soft text-white/70 hover:text-white hover:bg-white/10 border border-white/10"
                )}
              >
                <span>{model.title}</span>
                {model.badge && (
                  <span className="ml-2 text-[10px] uppercase font-mono bg-white/20 px-1.5 py-0.5 rounded-full text-white">
                    {model.badge}
                  </span>
                )}
              </button>
            );
          })}
        </div>

        {/* Cross-fade Tab Content Container */}
        <div className="max-w-3xl mx-auto">
          <AnimatePresence mode="wait">
            <motion.div
              key={activeModel.id}
              initial={prefersReducedMotion ? { opacity: 1 } : { opacity: 0, y: 15 }}
              animate={prefersReducedMotion ? { opacity: 1 } : { opacity: 1, y: 0 }}
              exit={prefersReducedMotion ? { opacity: 0 } : { opacity: 0, y: -15 }}
              transition={{ duration: 0.35, ease: [0.16, 1, 0.3, 1] }}
              className="p-6 sm:p-10 rounded-3xl bg-ink-soft border border-white/10 shadow-2xl relative overflow-hidden"
            >
              {/* Top Row: Title + Badge */}
              <div className="flex flex-wrap items-center justify-between gap-4 mb-4 pb-4 border-b border-white/10">
                <div>
                  <h3 className="font-display uppercase text-2xl sm:text-3xl text-white tracking-wide">
                    {activeModel.title}
                  </h3>
                  <p className="text-xs font-mono text-brand-orange uppercase tracking-wider mt-1">
                    [NO COMMISSIONS · NO HIDDEN FEES]
                  </p>
                </div>
                {activeModel.isPopular && (
                  <Badge variant="orange" className="py-1 px-3">
                    <Star className="w-3 h-3 fill-current mr-1" /> Most Chosen Model
                  </Badge>
                )}
              </div>

              {/* Description */}
              <p className="font-body text-base sm:text-lg text-white/90 leading-relaxed mb-6">
                {activeModel.description}
              </p>

              {/* Ideal For Callout */}
              <div className="p-4 rounded-xl bg-white/[0.04] border border-white/10 mb-8">
                <span className="text-xs font-mono uppercase tracking-wider text-brand-amber font-semibold block mb-1">
                  Ideal For:
                </span>
                <p className="text-sm font-body text-white/80">
                  {activeModel.idealFor}
                </p>
              </div>

              {/* Features Grid */}
              <div className="mb-8">
                <h4 className="text-xs font-mono uppercase tracking-widest text-white/50 mb-3">
                  Key Inclusions:
                </h4>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                  {activeModel.features.map((feature) => (
                    <div key={feature} className="flex items-start gap-2.5">
                      <div className="w-5 h-5 rounded-full bg-brand-orange/20 text-brand-orange flex items-center justify-center shrink-0 mt-0.5">
                        <Check className="w-3 h-3 stroke-[2.5]" />
                      </div>
                      <span className="text-sm font-body text-white/80">
                        {feature}
                      </span>
                    </div>
                  ))}
                </div>
              </div>

              {/* Footer CTA Button */}
              <div className="pt-4 border-t border-white/10 flex flex-col sm:flex-row items-center justify-between gap-4">
                <div className="flex items-center gap-2 text-xs text-white/60">
                  <ShieldCheck className="w-4 h-4 text-brand-orange" />
                  <span>Founder-led oversight on every delivery</span>
                </div>
                <Link
                  href={`/contact?model=${encodeURIComponent(activeModel.id)}`}
                  className="w-full sm:w-auto"
                >
                  <Button variant="primary" size="lg" className="w-full sm:w-auto">
                    <span>Get a Quote</span>
                    <ArrowRight className="w-4 h-4 ml-2" />
                  </Button>
                </Link>
              </div>
            </motion.div>
          </AnimatePresence>
        </div>
      </div>
    </section>
  );
}
