"use client";

import React from "react";
import Image from "next/image";
import Link from "next/link";
import { motion, useReducedMotion } from "framer-motion";
import { ArrowRight, Play, Eye } from "lucide-react";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { Badge } from "@/components/ui/Badge";
import { Button } from "@/components/ui/Button";
import { FEATURED_WORK_CONTENT } from "@/content/home";
import { WORK_ITEMS } from "@/content/work";
import { trackEvent } from "@/lib/analytics";
import { defaultViewport } from "@/lib/motion";

export function FeaturedWork() {
  const prefersReducedMotion = useReducedMotion();
  const featuredItems = WORK_ITEMS.filter((item) => item.featured).slice(0, 3);

  return (
    <section id="work" className="bg-ink text-paper py-20 md:py-32 border-b border-white/10 relative overflow-hidden scroll-mt-24">
      {/* Background Ambience */}
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-0 overflow-hidden select-none"
      >
        <div className="absolute top-1/3 left-1/2 -translate-x-1/2 w-[600px] h-[400px] rounded-full bg-brand-orange/10 blur-[150px] animate-pulse-glow" />
      </div>

      <div className="max-w-content mx-auto px-6 md:px-12 relative z-10">
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-12">
          <SectionHeading
            eyebrow={FEATURED_WORK_CONTENT.eyebrow}
            title={FEATURED_WORK_CONTENT.heading}
            align="left"
            className="mb-0"
            subtitle="Curated reels, branding systems, and web platforms built for real retention and revenue."
          />
          <div className="mt-6 md:mt-0">
            <Button href="/work" variant="secondary" size="md">
              <span className="flex items-center gap-2">
                {FEATURED_WORK_CONTENT.ctaText}
                <ArrowRight className="w-4 h-4 transition-transform group-hover:translate-x-1" />
              </span>
            </Button>
          </div>
        </div>

        {/* 3-column grid with staggered entrance & middle card depth */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 items-center">
          {featuredItems.map((item, index) => {
            const isMiddle = index === 1;

            return (
              <motion.div
                key={item.id}
                initial={prefersReducedMotion ? {} : { opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={defaultViewport}
                transition={{
                  duration: 0.6,
                  delay: index * 0.15,
                  ease: "easeOut",
                }}
              >
                <Link
                  href={`/work`}
                  data-cursor="view"
                  onClick={() => {
                    if (item.category === "reels") {
                      trackEvent("reel_play", { title: item.title, id: item.id });
                    }
                  }}
                  className={`group relative rounded-[22px] overflow-hidden bg-ink-soft border border-white/10 hover:border-brand-orange/60 transition-all duration-500 hover:shadow-brand-glow-lg hover:-translate-y-2 block focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand-orange ${
                    isMiddle ? "lg:-translate-y-4" : ""
                  }`}
                >
                  {/* Media Container */}
                  <div
                    className={`relative w-full bg-ink overflow-hidden ${
                      item.aspectRatio === "9/16" ? "aspect-[9/16]" : "aspect-[16/10]"
                    }`}
                  >
                    <Image
                      src={item.poster}
                      alt={item.title}
                      fill
                      className="object-cover transition-transform duration-700 ease-out group-hover:scale-108"
                    />

                    {/* Gradient Overlay on Hover */}
                    <div className="absolute inset-0 bg-gradient-to-t from-ink via-transparent to-black/30 opacity-60 group-hover:opacity-40 transition-opacity duration-300" />

                    {/* Play Badge for Reels with Glow Pulse */}
                    {item.category === "reels" && (
                      <div className="absolute top-4 right-4 w-10 h-10 rounded-full bg-brand-orange/95 text-white flex items-center justify-center shadow-brand-glow group-hover:scale-110 transition-transform duration-300">
                        <Play className="w-4 h-4 fill-white translate-x-0.5" />
                      </div>
                    )}

                    {/* View Eye for Non-reels */}
                    {item.category !== "reels" && (
                      <div className="absolute top-4 right-4 w-10 h-10 rounded-full bg-ink/80 backdrop-blur-md border border-white/20 text-white flex items-center justify-center opacity-0 group-hover:opacity-100 group-hover:scale-110 transition-all duration-300">
                        <Eye className="w-4 h-4" />
                      </div>
                    )}

                    {/* Category Badge */}
                    <div className="absolute top-4 left-4">
                      <Badge variant="dark">{item.categoryLabel}</Badge>
                    </div>
                  </div>

                  {/* Content Info Container */}
                  <div className="p-6 relative bg-ink-soft">
                    <span className="text-xs font-mono text-brand-orange uppercase tracking-wider block mb-1">
                      {item.client}
                    </span>
                    <h3 className="font-display uppercase text-2xl text-white tracking-wide group-hover:text-brand-orange transition-colors">
                      {item.title}
                    </h3>
                    <p className="font-body text-xs text-muted line-clamp-2 mt-2 leading-relaxed">
                      {item.description}
                    </p>

                    {/* Subtle Explore Footer */}
                    <div className="flex items-center gap-1.5 text-xs font-semibold text-brand-orange/80 group-hover:text-brand-orange mt-4 pt-3 border-t border-white/5 transition-colors uppercase tracking-wider">
                      <span>View Case Study</span>
                      <ArrowRight className="w-3.5 h-3.5 transition-transform duration-300 group-hover:translate-x-1" />
                    </div>
                  </div>
                </Link>
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
