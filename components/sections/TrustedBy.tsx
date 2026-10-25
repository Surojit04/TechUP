"use client";

import React, { useMemo } from "react";
import Image from "next/image";
import { motion, useReducedMotion } from "framer-motion";
import { CLIENT_LOGOS, ClientLogo } from "@/content/clients";
import { defaultViewport } from "@/lib/motion";

interface LogoBadgeProps {
  client: ClientLogo;
  isClone?: boolean;
}

function LogoBadge({ client, isClone = false }: LogoBadgeProps) {
  return (
    <div
      role={isClone ? "presentation" : undefined}
      className={`group relative flex items-center justify-center shrink-0 h-14 sm:h-16 md:h-[68px] px-4 sm:px-6 rounded-xl sm:rounded-2xl border ${client.borderColor} ${client.cardBg} ${client.hoverBorder} shadow-[0_1px_3px_rgba(0,0,0,0.02)] hover:shadow-[0_4px_12px_rgba(0,0,0,0.05)] transition-all duration-200 ease-out select-none cursor-default hover:-translate-y-0.5`}
    >
      {/* Subtle hover ambient orange tint */}
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-0 rounded-xl sm:rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-200 bg-brand-orange/[0.03]"
      />

      {/* Logo container with explicit dimensions to guarantee object-fit: contain */}
      <div
        className={`relative flex items-center justify-center h-7 sm:h-8 md:h-9 ${
          client.containerWidth || "w-24 sm:w-28 md:w-32"
        }`}
      >
        <Image
          src={client.src}
          alt={isClone ? "" : client.alt}
          fill
          unoptimized
          sizes="200px"
          className={`object-contain ${client.scaleClass || ""}`}
          priority={!isClone}
        />
      </div>
    </div>
  );
}

export function TrustedBy() {
  const prefersReducedMotion = useReducedMotion();

  // Create a 16-item primary sequence (2 sets of 8 logos) for seamless width coverage
  const primarySequence = useMemo(
    () => [...CLIENT_LOGOS, ...CLIENT_LOGOS],
    []
  );

  return (
    <section
      id="clients"
      className="bg-paper text-ink py-10 sm:py-14 md:py-16 border-b border-ink/5 relative overflow-hidden"
    >
      <div className="w-full">
        {/* Section Heading & Understated Subtitle */}
        <motion.div
          initial={prefersReducedMotion ? {} : { opacity: 0, y: 12 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={defaultViewport}
          transition={{ duration: 0.5 }}
          className="flex flex-col items-center justify-center gap-2 mb-7 sm:mb-9 text-center px-6 max-w-content mx-auto"
        >
          <span className="text-xs md:text-sm font-body font-bold uppercase tracking-[0.25em] text-muted">
            TRUSTED BY AMBITIOUS CREATORS & BRANDS
          </span>
          <div className="w-12 h-0.5 bg-brand-orange/40 rounded-full mt-1 mb-1.5" />
          <p className="text-xs sm:text-sm font-body text-muted/75 max-w-md">
            Creative partnerships built on trust and results.
          </p>
        </motion.div>

        {/* Marquee or Accessible Reduced-Motion Layout */}
        {prefersReducedMotion ? (
          <div className="max-w-content mx-auto px-6">
            <div className="flex flex-wrap items-center justify-center gap-3.5 sm:gap-4 md:gap-5 py-2">
              {CLIENT_LOGOS.map((client) => (
                <LogoBadge key={client.id} client={client} />
              ))}
            </div>
          </div>
        ) : (
          <div className="relative w-full overflow-hidden select-none">
            {/* Subtle fade masks at edges */}
            <div
              aria-hidden="true"
              className="pointer-events-none absolute left-0 top-0 bottom-0 w-16 sm:w-28 md:w-44 bg-gradient-to-r from-paper via-paper/90 to-transparent z-10"
            />
            <div
              aria-hidden="true"
              className="pointer-events-none absolute right-0 top-0 bottom-0 w-16 sm:w-28 md:w-44 bg-gradient-to-l from-paper via-paper/90 to-transparent z-10"
            />

            {/* Seamless Left-to-Right Continuous Marquee Track */}
            <div className="flex w-max animate-marquee-ltr hover:[animation-play-state:paused] py-2">
              {/* Primary Sequence (16 logos) */}
              <div className="flex items-center gap-4 sm:gap-6 md:gap-7 shrink-0 pr-4 sm:pr-6 md:pr-7">
                {primarySequence.map((client, index) => (
                  <LogoBadge
                    key={`primary-${client.id}-${index}`}
                    client={client}
                  />
                ))}
              </div>

              {/* Cloned Sequence (16 logos) for seamless infinite looping */}
              <div
                className="flex items-center gap-4 sm:gap-6 md:gap-7 shrink-0 pr-4 sm:pr-6 md:pr-7"
                aria-hidden="true"
              >
                {primarySequence.map((client, index) => (
                  <LogoBadge
                    key={`clone-${client.id}-${index}`}
                    client={client}
                    isClone
                  />
                ))}
              </div>
            </div>
          </div>
        )}
      </div>
    </section>
  );
}
