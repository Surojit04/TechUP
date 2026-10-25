import React from "react";
import Link from "next/link";
import { Button } from "@/components/ui/Button";

interface PagePlaceholderProps {
  eyebrow: string;
  title: string;
  description: string;
  phaseNote?: string;
  ctaText?: string;
  ctaHref?: string;
}

export function PagePlaceholder({
  eyebrow,
  title,
  description,
  phaseNote = "[PHASE 1 FOUNDATION PLACEHOLDER]",
  ctaText = "Get a Quote",
  ctaHref = "/contact",
}: PagePlaceholderProps) {
  return (
    <div className="min-h-[75vh] flex flex-col justify-center items-center text-center px-6 md:px-12 py-32 bg-ink text-paper relative overflow-hidden">
      {/* Background Soft Glow */}
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-0 overflow-hidden select-none"
      >
        <div className="absolute top-1/4 left-1/2 -translate-x-1/2 w-[500px] h-[500px] rounded-full bg-brand-orange/10 blur-[120px]" />
      </div>

      <div className="max-w-3xl mx-auto relative z-10 flex flex-col items-center">
        {/* Eyebrow & Phase Badge */}
        <div className="flex flex-wrap items-center justify-center gap-3 mb-6">
          <span className="inline-block text-xs md:text-sm font-body font-bold uppercase tracking-[0.2em] text-brand-orange">
            {"// "}
            {eyebrow}
          </span>
          <span className="px-3 py-1 rounded-full text-[11px] font-mono uppercase tracking-wider bg-brand-orange/15 text-brand-orange border border-brand-orange/30">
            {phaseNote}
          </span>
        </div>

        {/* Display Heading H1 */}
        <h1 className="font-display uppercase text-4xl sm:text-6xl md:text-7xl lg:text-8xl tracking-wide leading-[0.95] text-white mb-6">
          {title}
        </h1>

        {/* Description */}
        <p className="font-body text-base md:text-xl text-muted max-w-xl mx-auto mb-10 leading-relaxed">
          {description}
        </p>

        {/* Action Button */}
        <div className="flex items-center gap-4">
          <Button href={ctaHref} size="lg" withRocketIcon>
            {ctaText}
          </Button>
          <Button href="/" variant="secondary" size="lg">
            Back to Home
          </Button>
        </div>
      </div>
    </div>
  );
}
