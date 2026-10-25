"use client";

import React from "react";
import { useReducedMotion } from "framer-motion";
import { SectionHeading } from "@/components/ui/SectionHeading";

export function ServicesHero() {
  const prefersReducedMotion = useReducedMotion();

  return (
    <section className="relative pt-28 pb-4 sm:pt-36 sm:pb-6 md:pt-40 md:pb-6 bg-ink text-white overflow-hidden">
      {/* Soft background glow */}
      <div className="absolute top-1/4 left-1/2 -translate-x-1/2 w-96 h-96 bg-brand-orange/10 rounded-full blur-[120px] pointer-events-none" />

      {/* Subtle grid pattern background */}
      <div
        className="absolute inset-0 opacity-15 pointer-events-none"
        style={{
          backgroundImage: "radial-gradient(#ffffff 1px, transparent 1px)",
          backgroundSize: "24px 24px",
        }}
      />

      <div className="container max-w-7xl mx-auto px-4 sm:px-6 relative z-10 text-center">
        <SectionHeading
          as="h1"
          eyebrow="Services"
          title="DIGITAL SERVICES BUILT AROUND YOUR GROWTH"
          subtitle="Content, creative and web, delivered by one reliable team with founder-led precision and accountability."
          align="center"
          theme="dark"
          className="max-w-3xl mx-auto mb-0"
        />
      </div>
    </section>
  );
}
