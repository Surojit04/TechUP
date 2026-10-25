"use client";

import React from "react";
import { motion, useReducedMotion } from "framer-motion";
import { Check, Sparkles, ArrowRight } from "lucide-react";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { Card } from "@/components/ui/Card";
import { Badge } from "@/components/ui/Badge";
import { Button } from "@/components/ui/Button";
import { ENGAGEMENT_MODELS_CONTENT } from "@/content/home";
import { ENGAGEMENT_MODELS } from "@/content/services";
import { defaultViewport } from "@/lib/motion";

export function EngagementModels() {
  const prefersReducedMotion = useReducedMotion();

  return (
    <section className="bg-paper text-ink py-20 md:py-32 border-b border-ink/5 relative overflow-hidden">
      {/* Background Ambience */}
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-0 overflow-hidden select-none"
      >
        <div className="absolute top-1/4 -left-32 w-80 h-80 rounded-full bg-brand-orange/5 blur-3xl" />
        <div className="absolute bottom-10 right-0 w-80 h-80 rounded-full bg-brand-amber/5 blur-3xl" />
      </div>

      <div className="max-w-content mx-auto px-6 md:px-12 relative z-10">
        <SectionHeading
          eyebrow="Flexible Partnership"
          title={ENGAGEMENT_MODELS_CONTENT.heading}
          theme="light"
          subtitle="Choose the partnership model that best fits your immediate milestones, content volume, and growth pace."
        />

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {ENGAGEMENT_MODELS.map((model, idx) => (
            <motion.div
              key={model.id}
              initial={prefersReducedMotion ? {} : { opacity: 0, y: 24 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={defaultViewport}
              transition={{
                duration: 0.5,
                delay: idx * 0.1,
                ease: "easeOut",
              }}
              className="flex"
            >
              <Card
                theme="light"
                tilt
                className={`w-full flex flex-col justify-between p-8 hover:shadow-brand-glow relative transition-all duration-300 ${
                  model.isPopular
                    ? "border-brand-orange shadow-md ring-2 ring-brand-orange/30 bg-gradient-to-b from-white to-brand-orange/[0.02]"
                    : "bg-white"
                }`}
              >
                <div>
                  {/* Popular badge */}
                  {model.badge ? (
                    <div className="mb-4 flex items-center justify-between">
                      <span className="inline-flex items-center gap-1 px-3 py-1 rounded-full bg-brand-gradient text-white text-[11px] font-semibold uppercase tracking-wider shadow-sm">
                        <Sparkles className="w-3 h-3" />
                        <span>{model.badge}</span>
                      </span>
                    </div>
                  ) : (
                    <div className="mb-4 h-6" />
                  )}

                  <h3 className="font-display uppercase text-2xl text-ink tracking-wide mb-3 group-hover:text-brand-orange transition-colors">
                    {model.title}
                  </h3>
                  <p className="font-body text-xs text-muted mb-6 leading-relaxed">
                    {model.description}
                  </p>

                  {/* Features */}
                  <ul className="flex flex-col gap-2.5 mb-8 border-t border-ink/10 pt-4">
                    {model.features.map((feat, i) => (
                      <li
                        key={i}
                        className="flex items-start gap-2 text-xs font-body text-ink/85"
                      >
                        <Check className="w-3.5 h-3.5 text-brand-orange shrink-0 mt-0.5" />
                        <span>{feat}</span>
                      </li>
                    ))}
                  </ul>
                </div>

                {/* Action button */}
                <div className="pt-2">
                  <Button
                    href="/contact"
                    variant={model.isPopular ? "primary" : "secondary"}
                    size="sm"
                    className={
                      !model.isPopular
                        ? "w-full border-ink/20 text-ink hover:text-white"
                        : "w-full shadow-brand-glow"
                    }
                  >
                    <span>Get a Quote</span>
                  </Button>
                </div>
              </Card>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
