"use client";

import React, { useState, useEffect, useRef, useMemo } from "react";
import { motion, useReducedMotion } from "framer-motion";
import {
  Play,
  ArrowRight,
  Sparkles,
  Maximize2,
  Layers,
  Globe,
  Film,
  Image as ImageIcon,
  ChevronDown,
} from "lucide-react";
import { cn } from "@/lib/utils";
import {
  WORK_ITEMS,
  WORK_CATEGORIES,
  WorkItem,
  WorkCategory,
} from "@/content/work";
import { ProjectModal } from "./ProjectModal";
import { trackEvent } from "@/lib/analytics";

export function WorkGrid() {
  const [selectedCategory, setSelectedCategory] = useState<"all" | WorkCategory>("all");
  const [visibleCount, setVisibleCount] = useState<number>(9);
  const [activeModalItem, setActiveModalItem] = useState<WorkItem | null>(null);
  const [hoveredId, setHoveredId] = useState<string | null>(null);
  const prefersReducedMotion = useReducedMotion();
  const gridContainerRef = useRef<HTMLDivElement>(null);

  // Dynamic counts for each category
  const categoryCounts = useMemo(() => {
    const counts: Record<string, number> = { all: WORK_ITEMS.length };
    WORK_ITEMS.forEach((item) => {
      counts[item.category] = (counts[item.category] || 0) + 1;
    });
    return counts;
  }, []);

  // Filter items
  const filteredItems = useMemo(() => {
    return WORK_ITEMS.filter((item) =>
      selectedCategory === "all" ? true : item.category === selectedCategory
    );
  }, [selectedCategory]);

  const displayedItems = filteredItems.slice(0, visibleCount);
  const hasMore = visibleCount < filteredItems.length;

  // Modal navigation
  const handleNextModal = () => {
    if (!activeModalItem) return;
    const currentIndex = filteredItems.findIndex((i) => i.id === activeModalItem.id);
    const nextIndex = (currentIndex + 1) % filteredItems.length;
    setActiveModalItem(filteredItems[nextIndex]);
  };

  const handlePrevModal = () => {
    if (!activeModalItem) return;
    const currentIndex = filteredItems.findIndex((i) => i.id === activeModalItem.id);
    const prevIndex = (currentIndex - 1 + filteredItems.length) % filteredItems.length;
    setActiveModalItem(filteredItems[prevIndex]);
  };

  return (
    <section className="relative pb-24 md:pb-36 bg-ink text-white overflow-hidden">
      {/* Background ambient lighting */}
      <div
        aria-hidden="true"
        className="absolute top-1/4 right-0 w-[500px] h-[500px] bg-brand-orange/[0.05] rounded-full blur-[150px] pointer-events-none"
      />
      <div
        aria-hidden="true"
        className="absolute bottom-1/4 left-0 w-[500px] h-[500px] bg-brand-amber/[0.04] rounded-full blur-[150px] pointer-events-none"
      />

      <div className="container max-w-7xl mx-auto px-4 sm:px-6 relative z-10">
        {/* Category Filter Bar */}
        <div className="flex items-center justify-start md:justify-center gap-2 sm:gap-3 overflow-x-auto no-scrollbar pb-3 mb-10 sm:mb-14">
          {WORK_CATEGORIES.map((cat) => {
            const isActive = selectedCategory === cat.id;
            const count = categoryCounts[cat.id] ?? 0;

            return (
              <button
                key={cat.id}
                type="button"
                onClick={() => {
                  setSelectedCategory(cat.id);
                  setVisibleCount(9); // Reset visible count on filter switch
                }}
                className={cn(
                  "relative px-4 sm:px-5 py-2.5 rounded-full text-xs sm:text-sm font-body transition-all duration-200 shrink-0 select-none flex items-center gap-2 cursor-pointer focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand-orange",
                  isActive
                    ? "bg-brand-gradient text-white shadow-lg shadow-brand-orange/30 font-semibold ring-1 ring-white/25 border-brand-orange scale-[1.02]"
                    : "bg-ink-soft/90 text-white/70 hover:text-white hover:bg-white/10 border border-white/10 hover:border-white/20"
                )}
              >
                <span>{cat.label}</span>
                <span
                  className={cn(
                    "px-1.5 py-0.5 rounded-full text-[10px] font-mono transition-colors",
                    isActive
                      ? "bg-black/30 text-white font-bold"
                      : "bg-white/10 text-white/50"
                  )}
                >
                  {count}
                </span>
              </button>
            );
          })}
        </div>

        {/* Portfolio Grid (3 cols desktop, 2 tablet, 1 mobile) */}
        <motion.div
          key={selectedCategory}
          ref={gridContainerRef}
          initial={prefersReducedMotion ? false : "hidden"}
          animate="visible"
          variants={{
            hidden: { opacity: 0 },
            visible: {
              opacity: 1,
              transition: {
                staggerChildren: prefersReducedMotion ? 0 : 0.04,
                delayChildren: 0.02,
              },
            },
          }}
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8 items-start"
        >
          {displayedItems.map((item, index) => {
            const isHovered = hoveredId === item.id;
            const isReel = item.category === "reels";
            const isWeb = item.category === "websites";
            const isBranding = item.category === "branding";
            const isLongForm = item.category === "long-form";
            const isThumbnail = item.category === "thumbnails";

            // Aspect ratio container classes
            const aspectClass =
              item.aspectRatio === "9/16"
                ? "aspect-[9/16]"
                : item.aspectRatio === "1/1"
                ? "aspect-square"
                : "aspect-[16/10]";

            return (
              <motion.div
                key={item.id}
                variants={{
                  hidden: prefersReducedMotion
                    ? { opacity: 1, y: 0 }
                    : { opacity: 0, y: 16 },
                  visible: {
                    opacity: 1,
                    y: 0,
                    transition: {
                      duration: prefersReducedMotion ? 0.1 : 0.35,
                      ease: [0.25, 1, 0.5, 1],
                    },
                  },
                }}
                data-work-card-id={item.id}
                data-cursor="view"
                onClick={() => {
                  setActiveModalItem(item);
                  if (isReel) {
                    trackEvent("reel_play", { title: item.title, id: item.id });
                  }
                }}
                onMouseEnter={() => setHoveredId(item.id)}
                onMouseLeave={() => setHoveredId(null)}
                role="button"
                tabIndex={0}
                aria-label={`View ${item.title}`}
                onKeyDown={(e) => {
                  if (e.key === "Enter" || e.key === " ") {
                    e.preventDefault();
                    setActiveModalItem(item);
                    if (isReel) {
                      trackEvent("reel_play", { title: item.title, id: item.id });
                    }
                  }
                }}
                className="group relative rounded-[22px] bg-ink-soft text-white overflow-hidden shadow-xl border border-white/10 hover:border-brand-orange/50 hover:shadow-2xl hover:shadow-brand-orange/15 transition-all duration-300 hover:-translate-y-1.5 cursor-pointer select-none focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand-orange flex flex-col"
              >
                {/* Media Showcase Container */}
                <div
                  className={cn(
                    "relative w-full overflow-hidden bg-black/60",
                    aspectClass
                  )}
                >
                  {/* Real Project Poster Thumbnail */}
                  <img
                    src={item.poster}
                    alt={item.title}
                    loading="eager"
                    className="absolute inset-0 w-full h-full object-cover transition-transform duration-700 ease-out group-hover:scale-105"
                  />

                  {/* Gradient Overlay for visual depth */}
                  <div className="absolute inset-0 bg-gradient-to-t from-ink via-transparent to-black/35 opacity-70 group-hover:opacity-40 transition-opacity duration-300 pointer-events-none" />

                  {/* Top-Left Category Badge */}
                  <div className="absolute top-4 left-4 z-10">
                    <span className="inline-flex items-center px-3 py-1 rounded-full text-[10px] font-mono uppercase tracking-wider bg-black/75 backdrop-blur-md border border-white/15 text-white/90 shadow-sm">
                      {item.categoryLabel}
                    </span>
                  </div>

                  {/* Top-Right Media Action Indicator */}
                  <div className="absolute top-4 right-4 z-10">
                    {isReel && (
                      <div className="w-10 h-10 rounded-full bg-brand-orange text-white flex items-center justify-center shadow-brand-glow group-hover:scale-110 transition-transform duration-300">
                        <Play className="w-4 h-4 fill-white translate-x-0.5" />
                      </div>
                    )}
                    {isLongForm && (
                      <div className="w-9 h-9 rounded-full bg-black/70 backdrop-blur-md border border-white/20 text-white flex items-center justify-center group-hover:bg-brand-orange group-hover:border-brand-orange group-hover:scale-105 transition-all duration-300">
                        <Film className="w-4 h-4" />
                      </div>
                    )}
                    {isBranding && (
                      <div className="w-9 h-9 rounded-full bg-black/70 backdrop-blur-md border border-white/20 text-white flex items-center justify-center group-hover:bg-brand-orange group-hover:border-brand-orange group-hover:scale-105 transition-all duration-300">
                        <Layers className="w-4 h-4" />
                      </div>
                    )}
                    {isWeb && (
                      <div className="w-9 h-9 rounded-full bg-black/70 backdrop-blur-md border border-white/20 text-white flex items-center justify-center group-hover:bg-brand-orange group-hover:border-brand-orange group-hover:scale-105 transition-all duration-300">
                        <Globe className="w-4 h-4" />
                      </div>
                    )}
                    {isThumbnail && (
                      <div className="w-9 h-9 rounded-full bg-black/70 backdrop-blur-md border border-white/20 text-white flex items-center justify-center group-hover:bg-brand-orange group-hover:border-brand-orange group-hover:scale-105 transition-all duration-300">
                        <ImageIcon className="w-4 h-4" />
                      </div>
                    )}
                  </div>

                  {/* Hover Center Indicator Cue */}
                  <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
                    <div className="opacity-0 group-hover:opacity-100 group-hover:translate-y-0 translate-y-2 transition-all duration-300 px-4 py-2 rounded-full bg-black/85 backdrop-blur-md border border-white/20 text-xs font-mono uppercase tracking-wider text-white shadow-2xl flex items-center gap-2">
                      <span>Preview Project</span>
                      <Maximize2 className="w-3.5 h-3.5 text-brand-orange" />
                    </div>
                  </div>
                </div>

                {/* Card Information Footer */}
                <div className="p-5 sm:p-6 bg-ink-soft border-t border-white/10 flex-1 flex flex-col justify-between">
                  <div>
                    {/* Client Label */}
                    <span className="font-mono text-[11px] uppercase tracking-wider text-brand-orange block mb-1.5">
                      {item.client}
                    </span>

                    {/* Title */}
                    <h3 className="font-display uppercase text-xl text-white tracking-wide group-hover:text-brand-orange transition-colors leading-snug line-clamp-2">
                      {item.title}
                    </h3>

                    {/* Short Description */}
                    <p className="font-body text-xs text-white/70 line-clamp-2 mt-2 leading-relaxed">
                      {item.description}
                    </p>

                    {/* Result Highlight Pill if present */}
                    {item.result && (
                      <div className="mt-3.5 inline-flex items-center gap-1.5 px-2.5 py-1 rounded-md bg-brand-orange/10 border border-brand-orange/25 text-xs font-mono text-brand-amber">
                        <Sparkles className="w-3.5 h-3.5 text-brand-orange shrink-0" />
                        <span className="truncate">{item.result}</span>
                      </div>
                    )}

                    {/* Tools Used micro chips */}
                    {item.toolsUsed && item.toolsUsed.length > 0 && (
                      <div className="mt-3.5 flex flex-wrap gap-1.5">
                        {item.toolsUsed.slice(0, 3).map((tool) => (
                          <span
                            key={tool}
                            className="px-2 py-0.5 rounded bg-white/5 border border-white/10 text-white/50 text-[10px] font-mono"
                          >
                            {tool}
                          </span>
                        ))}
                      </div>
                    )}
                  </div>

                  {/* Interactive Case Study Link */}
                  <div className="mt-5 pt-3.5 border-t border-white/5 flex items-center justify-between text-xs font-mono uppercase tracking-wider text-white/50 group-hover:text-brand-orange transition-colors">
                    <span>View Case Study</span>
                    <ArrowRight className="w-3.5 h-3.5 transition-transform duration-300 group-hover:translate-x-1" />
                  </div>
                </div>
              </motion.div>
            );
          })}
        </motion.div>

        {/* Load More Button */}
        {hasMore && (
          <div className="mt-14 text-center">
            <button
              type="button"
              onClick={() => setVisibleCount((prev) => prev + 3)}
              className="inline-flex items-center gap-2 px-6 py-3 rounded-full bg-white/5 hover:bg-brand-orange text-white border border-white/15 hover:border-brand-orange font-body text-sm font-semibold transition-all duration-300 shadow-md hover:shadow-brand-glow cursor-pointer"
            >
              <span>Load More Work ({filteredItems.length - visibleCount} remaining)</span>
              <ChevronDown className="w-4 h-4" />
            </button>
          </div>
        )}

        {/* Full-screen Shared Element Project Viewer Modal */}
        <ProjectModal
          item={activeModalItem}
          onClose={() => setActiveModalItem(null)}
          onNext={handleNextModal}
          onPrev={handlePrevModal}
        />
      </div>
    </section>
  );
}
