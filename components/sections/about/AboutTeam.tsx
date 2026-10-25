"use client";

import React, { useState } from "react";
import Image from "next/image";
import { motion, useReducedMotion, AnimatePresence } from "framer-motion";
import { Linkedin, Instagram, ArrowUpRight, Sparkles, ChevronDown } from "lucide-react";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { TEAM_MEMBERS, TeamMember } from "@/content/team";
import { cn } from "@/lib/utils";

export function AboutTeam() {
  const [activeTouchBioId, setActiveTouchBioId] = useState<string | null>(null);
  const [hoveredMemberId, setHoveredMemberId] = useState<string | null>(null);
  const prefersReducedMotion = useReducedMotion();

  // Founder is member 1 (Dwaipayan Saha)
  const founder = TEAM_MEMBERS[0];
  // The other 5 core members
  const coreMembers = TEAM_MEMBERS.slice(1);

  const toggleTouchBio = (id: string) => {
    setActiveTouchBioId((prev) => (prev === id ? null : id));
  };

  return (
    <section
      id="team"
      className="relative py-24 md:py-32 bg-ink text-white overflow-hidden border-t border-white/10 scroll-mt-24 md:scroll-mt-32"
    >
      {/* Background glow */}
      <div className="absolute top-1/3 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-brand-orange/[0.06] rounded-full blur-[160px] pointer-events-none" />

      <div className="container max-w-7xl mx-auto px-4 sm:px-6 relative z-10">
        <SectionHeading
          eyebrow="Our team"
          title="MEET THE CORE TEAM"
          subtitle="TechUP Digital is founder-led, supported by a core team across operations, finance, technology and partnerships."
          align="center"
          theme="dark"
        />

        {/* 1. Large Founder Card at the top */}
        <div className="max-w-4xl mx-auto mb-16">
          <div className="relative group">
            {/* Offset Orange Gradient Frame */}
            <div className="absolute -inset-1 rounded-3xl bg-brand-gradient opacity-60 blur-sm group-hover:opacity-100 transition-opacity duration-300 pointer-events-none" />

            <div className="relative z-10 rounded-3xl bg-ink-soft border border-white/15 p-6 sm:p-8 md:p-10 shadow-2xl flex flex-col md:flex-row items-center gap-8 md:gap-10">
              {/* Founder Photo Frame (Left) */}
              <div className="relative w-48 sm:w-56 aspect-[4/5] rounded-2xl overflow-hidden shrink-0 bg-gradient-to-br from-ink-soft to-ink border-2 border-brand-orange/40 flex flex-col items-center justify-center shadow-xl">
                {founder.photo ? (
                  <Image
                    src={founder.photo}
                    alt={`${founder.name}, ${founder.designation}`}
                    fill
                    sizes="(max-width: 640px) 192px, 224px"
                    className="object-cover object-[center_20%]"
                  />
                ) : (
                  <>
                    {/* Initials Badge */}
                    <div className="w-20 h-20 rounded-full bg-gradient-to-tr from-brand-orange to-brand-amber flex items-center justify-center text-white shadow-lg shadow-brand-orange/30">
                      <span className="font-display text-3xl font-bold tracking-wider">
                        {founder.initials}
                      </span>
                    </div>
                    <span className="font-mono text-[10px] uppercase tracking-wider text-brand-orange mt-3">
                      [PHOTO PENDING]
                    </span>
                    <span className="text-[10px] font-mono text-white/40 mt-0.5">
                      TechUP Leadership
                    </span>
                  </>
                )}
              </div>

              {/* Founder Details & Bio (Right) */}
              <div className="flex-1 flex flex-col justify-center text-center md:text-left">
                <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-brand-orange/15 border border-brand-orange/30 text-brand-orange text-xs font-mono uppercase tracking-wider w-fit mx-auto md:mx-0 mb-3">
                  <Sparkles className="w-3.5 h-3.5" />
                  <span>Founder-Led Agency</span>
                </div>

                <h3 className="font-display uppercase text-3xl sm:text-4xl md:text-5xl text-white tracking-wide">
                  {founder.name}
                </h3>

                <p className="font-mono text-sm uppercase tracking-widest text-brand-amber font-semibold mt-1 mb-4">
                  {founder.designation}
                </p>

                <p className="font-body text-base sm:text-lg text-white/80 leading-relaxed mb-6">
                  {founder.bio ||
                    "Leading TechUP Digital's mission to bridge creative vision and technical precision for Indian brands and modern creators."}
                </p>

                {/* Socials */}
                <div className="flex items-center justify-center md:justify-start gap-3">
                  <div className="w-9 h-9 rounded-full bg-white/5 border border-white/10 flex items-center justify-center text-white/70 hover:text-white hover:border-brand-orange transition-colors cursor-pointer">
                    <Linkedin className="w-4 h-4" />
                  </div>
                  <div className="w-9 h-9 rounded-full bg-white/5 border border-white/10 flex items-center justify-center text-white/70 hover:text-white hover:border-brand-orange transition-colors cursor-pointer">
                    <Instagram className="w-4 h-4" />
                  </div>
                  <span className="text-xs font-mono text-white/40 ml-2">
                    @techup.digital
                  </span>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* 2. Five-card Grid below (3 columns top, 2 centered below) */}
        <div className="max-w-5xl mx-auto">
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8 justify-center">
            {coreMembers.map((member, idx) => {
              const isTouchOpen = activeTouchBioId === member.id;
              const isHovered = hoveredMemberId === member.id;
              const isBioVisible = isHovered || isTouchOpen;

              return (
                <motion.div
                  key={member.id}
                  initial={prefersReducedMotion ? { opacity: 1 } : { opacity: 0, y: 30 }}
                  whileInView={prefersReducedMotion ? { opacity: 1 } : { opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.5, delay: idx * 0.08 }}
                  onMouseEnter={() => setHoveredMemberId(member.id)}
                  onMouseLeave={() => setHoveredMemberId(null)}
                  onClick={() => toggleTouchBio(member.id)}
                  className={cn(
                    "group relative rounded-2xl bg-ink-soft border border-white/10 overflow-hidden shadow-xl transition-all duration-300 select-none cursor-pointer",
                    // For the last 2 items on desktop 3-col grid, center them nicely
                    idx === 3 && "lg:col-start-1 lg:translate-x-1/2",
                    idx === 4 && "lg:col-start-2 lg:translate-x-1/2"
                  )}
                >
                  {/* Aspect 4:5 Card Container */}
                  <div className="relative aspect-[4/5] w-full flex flex-col justify-between p-5 bg-gradient-to-b from-ink-soft to-ink overflow-hidden">
                    {/* Subtle offset frame glow on hover */}
                    <div className="absolute -inset-0.5 rounded-2xl bg-brand-gradient opacity-0 group-hover:opacity-30 transition-opacity duration-300 pointer-events-none" />

                    {/* Top Row: Initials & TechUP Team pill */}
                    <div className="relative z-10 flex items-center justify-between">
                      <span className="font-mono text-[9px] uppercase tracking-wider text-brand-orange bg-black/50 px-2 py-0.5 rounded border border-brand-orange/20">
                        {member.designation}
                      </span>
                      <span className="text-[10px] font-mono text-white/40">
                        0{idx + 2}
                      </span>
                    </div>

                    {/* Member Photo or Silhouette Graphic */}
                    {member.photo ? (
                      <div className="absolute inset-0 z-0">
                        <Image
                          src={member.photo}
                          alt={`${member.name}, ${member.designation}`}
                          fill
                          sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
                          className={cn(
                            "object-cover transition-transform duration-500 group-hover:scale-105",
                            member.photoPosition || "object-[center_20%]"
                          )}
                        />
                        <div className="absolute inset-0 bg-gradient-to-t from-ink via-ink/40 to-black/20" />
                      </div>
                    ) : (
                      <div className="relative z-10 flex flex-col items-center justify-center my-auto">
                        <div className="w-20 h-20 rounded-full bg-gradient-to-br from-white/10 to-black/60 border border-brand-orange/30 flex items-center justify-center group-hover:border-brand-orange group-hover:scale-105 transition-all duration-300 shadow-md">
                          <span className="font-display text-2xl font-bold text-brand-amber">
                            {member.initials}
                          </span>
                        </div>
                        <span className="text-[9px] font-mono text-white/40 mt-2">
                          [PHOTO PENDING]
                        </span>
                      </div>
                    )}

                    {/* Bottom Title Bar (Visible normally) */}
                    <div className="relative z-10 pt-3 border-t border-white/10 flex items-center justify-between">
                      <div>
                        <h4 className="font-display uppercase text-lg text-white tracking-wide leading-tight group-hover:text-brand-orange transition-colors">
                          {member.name}
                        </h4>
                        <p className="font-mono text-[11px] uppercase tracking-wider text-white/60">
                          {member.designation}
                        </p>
                      </div>

                      {/* Tap to open indicator for touch */}
                      <div className="w-6 h-6 rounded-full bg-white/5 flex items-center justify-center text-white/50 group-hover:text-white transition-colors">
                        <ChevronDown
                          className={cn(
                            "w-3.5 h-3.5 transition-transform duration-300",
                            isBioVisible && "rotate-180 text-brand-orange"
                          )}
                        />
                      </div>
                    </div>

                    {/* Sliding Hover / Tap Bio Panel (Over lower third of the card) */}
                    <AnimatePresence>
                      {isBioVisible && (
                        <motion.div
                          initial={prefersReducedMotion ? { opacity: 0 } : { y: "100%" }}
                          animate={prefersReducedMotion ? { opacity: 1 } : { y: 0 }}
                          exit={prefersReducedMotion ? { opacity: 0 } : { y: "100%" }}
                          transition={{ duration: 0.28, ease: [0.16, 1, 0.3, 1] }}
                          className="absolute inset-x-0 bottom-0 z-20 p-4 sm:p-5 bg-gradient-to-t from-black via-ink to-ink-soft/95 border-t border-brand-orange/30 shadow-2xl flex flex-col justify-between"
                        >
                          <div>
                            <div className="flex items-center justify-between mb-1.5">
                              <span className="font-display uppercase text-base text-white">
                                {member.name}
                              </span>
                              <span className="text-[9px] font-mono uppercase text-brand-orange">
                                {member.designation}
                              </span>
                            </div>
                            <p className="font-body text-xs text-white/80 leading-relaxed">
                              {member.bio ||
                                "Dedicated member of the TechUP core team ensuring seamless client execution."}
                            </p>
                          </div>

                          <div className="mt-3 pt-2 border-t border-white/10 flex items-center justify-between text-[11px] text-white/60">
                            <span className="text-[10px] font-mono text-brand-orange">
                              Core Team
                            </span>
                            <div className="flex items-center gap-2">
                              <Linkedin className="w-3.5 h-3.5 hover:text-white cursor-pointer" />
                              <Instagram className="w-3.5 h-3.5 hover:text-white cursor-pointer" />
                            </div>
                          </div>
                        </motion.div>
                      )}
                    </AnimatePresence>
                  </div>
                </motion.div>
              );
            })}
          </div>
        </div>
      </div>
    </section>
  );
}
