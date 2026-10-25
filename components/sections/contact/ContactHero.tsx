"use client";

import React from "react";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { ChevronDivider } from "@/components/ui/ChevronDivider";

export function ContactHero() {

  return (
    <section className="relative min-h-[440px] md:min-h-[480px] flex flex-col justify-center pt-28 pb-16 md:pt-36 md:pb-20 bg-ink text-paper overflow-hidden">
      {/* Background radial glow with fixed top anchor */}
      <div className="absolute top-24 left-1/2 -translate-x-1/2 w-[600px] h-[400px] rounded-full bg-brand-orange/10 blur-[120px] pointer-events-none" />

      {/* Subtle dot matrix grid */}
      <div
        className="absolute inset-0 opacity-[0.03] pointer-events-none"
        style={{
          backgroundImage: `radial-gradient(#ffffff 1px, transparent 1px)`,
          backgroundSize: "24px 24px",
        }}
      />

      <div className="container max-w-5xl mx-auto px-4 sm:px-6 relative z-10 text-center">
        <SectionHeading
          eyebrow="CONTACT"
          title="LET'S BUILD YOUR DIGITAL PRESENCE BETTER"
          subtitle="Tell us what you need. We reply with a clear plan and quote, usually within 24 hours."
          align="center"
          theme="dark"
          as="h1"
          className="max-w-4xl mx-auto mb-0"
        />
      </div>
    </section>
  );
}
