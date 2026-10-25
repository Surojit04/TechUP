"use client";

import React from "react";
import { Accordion } from "@/components/ui/Accordion";
import { CONTACT_FAQS } from "@/content/faq";

export function ContactFAQ() {
  return (
    <section className="relative py-20 md:py-28 bg-ink text-white overflow-hidden border-t border-white/10">
      {/* Background ambient lighting */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[300px] bg-brand-orange/[0.05] rounded-full blur-[130px] pointer-events-none" />

      <div className="container max-w-4xl mx-auto px-4 sm:px-6 relative z-10">
        <div className="text-center max-w-2xl mx-auto mb-12 md:mb-14">
          <span className="font-mono text-xs uppercase tracking-widest text-brand-orange font-semibold block mb-2">
            {"// COMMON INQUIRIES"}
          </span>
          <h2 className="font-display uppercase text-3xl sm:text-4xl md:text-5xl tracking-tight text-white mb-4">
            Frequently Asked Questions
          </h2>
          <p className="font-body text-sm sm:text-base text-white/70">
            Clear, practical answers about our services, scoping requirements, and project kickoff.
          </p>
        </div>

        {/* Compact, accessible accordion with dark theme */}
        <Accordion items={CONTACT_FAQS} theme="dark" />
      </div>
    </section>
  );
}
