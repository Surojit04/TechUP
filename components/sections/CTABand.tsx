"use client";

import React from "react";
import { motion, useReducedMotion } from "framer-motion";
import { Clock, MessageSquare, Sparkles } from "lucide-react";
import { Button } from "@/components/ui/Button";
import { REUSABLE_CTA_BAND_CONTENT } from "@/content/home";
import { getWhatsAppUrl } from "@/lib/site";
import { wordContainer, wordItem, defaultViewport } from "@/lib/motion";
import { trackEvent } from "@/lib/analytics";

interface CTABandProps {
  headline?: string;
  subtext?: string;
}

export function CTABand({
  headline = REUSABLE_CTA_BAND_CONTENT.headline,
  subtext = REUSABLE_CTA_BAND_CONTENT.subtext,
}: CTABandProps) {
  const prefersReducedMotion = useReducedMotion();
  const words = headline.split(" ");
  const waUrl = getWhatsAppUrl(
    "Hi TechUP Digital, I am ready to level up my brand. Let's discuss a quote and plan."
  );

  return (
    <section className="relative overflow-hidden bg-brand-gradient py-20 md:py-32 text-paper">
      {/* Background Animated Chevron Pattern & Glow Orbs */}
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-0 opacity-15 select-none overflow-hidden"
      >
        <div className="absolute -top-24 -left-24 w-96 h-96 rounded-full bg-white/20 blur-3xl animate-float-slow" />
        <div className="absolute -bottom-24 -right-24 w-96 h-96 rounded-full bg-white/20 blur-3xl animate-float-reverse" />
        <svg className="w-full h-full" viewBox="0 0 100 100" preserveAspectRatio="none">
          <pattern id="chevron-pattern" width="20" height="20" patternUnits="userSpaceOnUse">
            <path d="M0 10 L10 0 L20 10 L20 20 L10 10 L0 20 Z" fill="#FFFFFF" />
          </pattern>
          <rect width="100%" height="100%" fill="url(#chevron-pattern)" />
        </svg>
      </div>

      <div className="max-w-content mx-auto px-6 md:px-12 relative z-10 text-center">
        {/* Subtle Eyebrow Badge */}
        <motion.div
          initial={prefersReducedMotion ? {} : { opacity: 0, y: -10 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={defaultViewport}
          className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-white/15 border border-white/25 text-white text-xs font-semibold uppercase tracking-widest mb-6 backdrop-blur-sm"
        >
          <Sparkles className="w-3.5 h-3.5" />
          <span>START YOUR DIGITAL EVOLUTION</span>
        </motion.div>

        {/* Headline with word-by-word reveal */}
        {prefersReducedMotion ? (
          <h2 className="font-display uppercase text-4xl sm:text-6xl md:text-7xl tracking-wide leading-none text-white mb-6">
            {headline}
          </h2>
        ) : (
          <motion.h2
            variants={wordContainer}
            initial="hidden"
            whileInView="visible"
            viewport={defaultViewport}
            className="font-display uppercase text-4xl sm:text-6xl md:text-7xl tracking-wide leading-none text-white mb-6 flex flex-wrap justify-center gap-x-3 gap-y-1"
          >
            {words.map((word, index) => (
              <motion.span key={index} variants={wordItem} className="inline-block">
                {word}
              </motion.span>
            ))}
          </motion.h2>
        )}

        <p className="font-body text-base md:text-xl text-white/95 max-w-xl mx-auto mb-10 leading-relaxed font-medium">
          {subtext}
        </p>

        {/* Action Buttons */}
        <div className="flex flex-col sm:flex-row items-center justify-center gap-4 mb-8">
          <Button
            href="/contact"
            variant="white"
            size="lg"
            withRocketIcon
            aria-label="Get a Quote"
          >
            {REUSABLE_CTA_BAND_CONTENT.primaryButtonText}
          </Button>

          <Button
            href={waUrl}
            isExternal
            variant="outline"
            size="lg"
            aria-label="Chat on WhatsApp"
            onClick={() => trackEvent("whatsapp_click", { source: "cta_band" })}
          >
            <span className="flex items-center gap-2">
              <MessageSquare className="w-4 h-4" />
              <span>{REUSABLE_CTA_BAND_CONTENT.secondaryButtonText}</span>
            </span>
          </Button>
        </div>

        {/* Response Guarantee Line */}
        <div className="flex items-center justify-center gap-2 text-xs font-mono text-white/80 tracking-wider">
          <Clock className="w-3.5 h-3.5" />
          <span>DIRECT RESPONSE WITHIN 15 MINUTES DURING BUSINESS HOURS</span>
        </div>
      </div>
    </section>
  );
}
