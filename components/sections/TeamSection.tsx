"use client";

import React from "react";
import Image from "next/image";
import { motion, useReducedMotion } from "framer-motion";
import { ArrowRight, UserCheck } from "lucide-react";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { Button } from "@/components/ui/Button";
import { TEAM_SECTION_CONTENT } from "@/content/home";
import { TEAM_MEMBERS } from "@/content/team";
import { defaultViewport } from "@/lib/motion";
import { cn } from "@/lib/utils";

export function TeamSection() {
  const prefersReducedMotion = useReducedMotion();

  return (
    <section className="bg-mist text-ink py-20 md:py-32 border-b border-ink/5 relative overflow-hidden">
      {/* Background Ambience */}
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-0 overflow-hidden select-none"
      >
        <div className="absolute top-1/2 left-0 w-96 h-96 rounded-full bg-brand-orange/5 blur-3xl" />
      </div>

      <div className="max-w-content mx-auto px-6 md:px-12 relative z-10">
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-12">
          <SectionHeading
            eyebrow={TEAM_SECTION_CONTENT.eyebrow}
            title={TEAM_SECTION_CONTENT.heading}
            theme="light"
            align="left"
            className="mb-0"
            subtitle={TEAM_SECTION_CONTENT.subtext}
          />
          <div className="mt-6 md:mt-0">
            <Button
              href="/about#team"
              variant="secondary"
              size="md"
              className="border-ink/20 text-ink hover:text-white"
            >
              <span className="flex items-center gap-2">
                {TEAM_SECTION_CONTENT.buttonText}
                <ArrowRight className="w-4 h-4 transition-transform group-hover:translate-x-1" />
              </span>
            </Button>
          </div>
        </div>

        {/* 6 core members: 3 columns x 2 rows on desktop with staggered entrance */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
          {TEAM_MEMBERS.map((member, idx) => (
            <motion.div
              key={member.id}
              initial={prefersReducedMotion ? {} : { opacity: 0, y: 24 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={defaultViewport}
              transition={{
                duration: 0.5,
                delay: idx * 0.08,
                ease: "easeOut",
              }}
              className="relative group rounded-[22px] bg-paper p-6 border border-ink/10 shadow-sm hover:shadow-brand-glow hover:-translate-y-2 transition-all duration-300"
            >
              {/* Photo Frame (4:5 ratio) with Image or Initials Silhouette */}
              <div className="relative w-full aspect-[4/5] rounded-xl overflow-hidden bg-ink-soft mb-5 flex items-center justify-center">
                {/* Offset Orange Gradient Frame behind */}
                <div className="absolute inset-0 bg-brand-gradient opacity-10 group-hover:opacity-30 transition-opacity duration-300 pointer-events-none z-10" />

                {member.photo ? (
                  <Image
                    src={member.photo}
                    alt={`${member.name}, ${member.designation}`}
                    fill
                    sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
                    priority={idx === 0}
                    className={cn(
                      "object-cover transition-transform duration-500 ease-out group-hover:scale-105",
                      member.photoPosition || "object-[center_20%]"
                    )}
                  />
                ) : (
                  /* Silhouette with Initials */
                  <div className="flex flex-col items-center justify-center z-10 text-center select-none">
                    <div className="w-20 h-20 rounded-full bg-ink border-2 border-brand-orange/40 text-brand-orange flex items-center justify-center font-display text-3xl font-bold mb-2 group-hover:scale-110 group-hover:border-brand-orange group-hover:shadow-brand-glow transition-all duration-300">
                      {member.initials}
                    </div>
                    <span className="text-[10px] font-mono uppercase tracking-widest text-muted">
                      TECHUP TEAM
                    </span>
                  </div>
                )}

                {/* Corner status indicator */}
                <div className="absolute top-3 right-3 px-2 py-0.5 rounded-md bg-ink/70 backdrop-blur-sm border border-white/10 text-[9px] font-mono text-paper/70 flex items-center gap-1 z-20">
                  <span className="w-1.5 h-1.5 rounded-full bg-emerald-400" />
                  <span>ACTIVE</span>
                </div>
              </div>

              {/* Name & Designation */}
              <h3 className="font-display uppercase text-2xl text-ink tracking-wide group-hover:text-brand-orange transition-colors">
                {member.name}
              </h3>
              <p className="text-xs font-body font-bold uppercase tracking-[0.15em] text-brand-orange mt-1">
                {member.designation}
              </p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
