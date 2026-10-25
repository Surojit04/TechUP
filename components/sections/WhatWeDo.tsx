"use client";

import React from "react";
import { motion, useReducedMotion } from "framer-motion";
import { Check, ShieldCheck, Zap, Users2 } from "lucide-react";
import { WHAT_WE_DO_CONTENT } from "@/content/home";
import { wordContainer, wordItem, defaultViewport } from "@/lib/motion";

export function WhatWeDo() {
  const prefersReducedMotion = useReducedMotion();
  const words = WHAT_WE_DO_CONTENT.heading.split(" ");

  const icons = [
    <Zap key="1" className="w-5 h-5 text-brand-orange" />,
    <ShieldCheck key="2" className="w-5 h-5 text-brand-orange" />,
    <Users2 key="3" className="w-5 h-5 text-brand-orange" />,
  ];

  return (
    <section id="what-we-do" className="bg-ink text-paper py-20 md:py-32 border-b border-white/10 relative overflow-hidden scroll-mt-24">
      {/* Background Ambient Glow */}
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-0 overflow-hidden select-none"
      >
        <div className="absolute top-1/2 -left-32 -translate-y-1/2 w-96 h-96 rounded-full bg-brand-orange/10 blur-[130px] animate-pulse-glow" />
        <div className="absolute inset-0 bg-[radial-gradient(#262630_1px,transparent_1px)] [background-size:32px_32px] opacity-15" />
      </div>

      <div className="max-w-content mx-auto px-6 md:px-12 relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-start">
          {/* Left Column: Heading & Lead Text */}
          <div className="lg:col-span-7">
            <span className="inline-block text-xs md:text-sm font-body font-bold uppercase tracking-[0.2em] text-brand-orange mb-3">
              {"// "}
              {WHAT_WE_DO_CONTENT.eyebrow}
            </span>

            {prefersReducedMotion ? (
              <h2 className="font-display uppercase text-3xl sm:text-5xl md:text-6xl tracking-wide leading-[0.98] text-white mb-6">
                {WHAT_WE_DO_CONTENT.heading}
              </h2>
            ) : (
              <motion.h2
                variants={wordContainer}
                initial="hidden"
                whileInView="visible"
                viewport={defaultViewport}
                className="font-display uppercase text-3xl sm:text-5xl md:text-6xl tracking-wide leading-[0.98] text-white mb-6 flex flex-wrap gap-x-3 gap-y-1"
              >
                {words.map((word, i) => (
                  <motion.span key={i} variants={wordItem} className="inline-block">
                    {word}
                  </motion.span>
                ))}
              </motion.h2>
            )}

            <motion.p
              initial={prefersReducedMotion ? {} : { opacity: 0, y: 16 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={defaultViewport}
              transition={{ duration: 0.6, delay: 0.2 }}
              className="font-body text-base md:text-lg text-muted leading-relaxed max-w-xl mb-8"
            >
              {WHAT_WE_DO_CONTENT.leadText}
            </motion.p>

            {/* Added Assurance Pills */}
            <motion.div
              initial={prefersReducedMotion ? {} : { opacity: 0 }}
              whileInView={{ opacity: 1 }}
              viewport={defaultViewport}
              transition={{ duration: 0.6, delay: 0.35 }}
              className="flex flex-wrap items-center gap-3 pt-2 border-t border-white/10"
            >
              <span className="text-xs font-mono text-brand-orange tracking-wider">
                ✓ 100% IN-HOUSE TEAM
              </span>
              <span className="text-white/20">•</span>
              <span className="text-xs font-mono text-paper/80 tracking-wider">
                ✓ ZERO FREELANCER CHAOS
              </span>
              <span className="text-white/20">•</span>
              <span className="text-xs font-mono text-paper/80 tracking-wider">
                ✓ SINGLE ACCOUNT MANAGER
              </span>
            </motion.div>
          </div>

          {/* Right Column: 3 Interactive Checked Cards */}
          <div className="lg:col-span-5 flex flex-col gap-5 pt-4 lg:pt-8">
            {WHAT_WE_DO_CONTENT.checklist.map((item, index) => (
              <motion.div
                key={index}
                initial={
                  prefersReducedMotion
                    ? {}
                    : { opacity: 0, x: 24 }
                }
                whileInView={{ opacity: 1, x: 0 }}
                viewport={defaultViewport}
                transition={{
                  duration: 0.5,
                  delay: index * 0.12,
                  ease: "easeOut",
                }}
                className="flex items-start gap-4 p-6 rounded-2xl bg-ink-soft border border-white/10 hover:border-brand-orange/50 hover:bg-ink-soft/90 hover:shadow-brand-glow hover:-translate-x-1 transition-all duration-300 group cursor-default"
              >
                <div className="flex items-center justify-center w-12 h-12 rounded-xl bg-brand-orange/15 text-brand-orange border border-brand-orange/30 shrink-0 group-hover:bg-brand-gradient group-hover:text-white group-hover:scale-105 transition-all duration-300 shadow-sm">
                  {icons[index] || <Check className="w-5 h-5" />}
                </div>
                <div>
                  <div className="flex items-center gap-2 mb-1.5">
                    <span className="text-[10px] font-mono text-brand-orange font-bold uppercase tracking-widest">
                      0{index + 1} {"//"}
                    </span>
                    <h3 className="font-display uppercase text-xl text-white tracking-wide group-hover:text-brand-orange transition-colors">
                      {item.title}
                    </h3>
                  </div>
                  <p className="font-body text-sm text-muted leading-relaxed">
                    {item.description}
                  </p>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
