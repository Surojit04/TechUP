"use client";

import React, { useState, useEffect } from "react";
import Image from "next/image";
import { motion, AnimatePresence } from "framer-motion";
import { X, Play, ArrowRight, Check } from "lucide-react";
import { Badge } from "@/components/ui/Badge";
import { Button } from "@/components/ui/Button";
import {
  WORK_ITEMS,
  WORK_CATEGORIES,
  WorkCategory,
  WorkItem,
} from "@/content/work";

export function WorkShowcase() {
  const [selectedFilter, setSelectedFilter] = useState<"all" | WorkCategory>("all");
  const [activeModalItem, setActiveModalItem] = useState<WorkItem | null>(null);

  const filteredItems =
    selectedFilter === "all"
      ? WORK_ITEMS
      : WORK_ITEMS.filter((item) => item.category === selectedFilter);

  // Close modal on ESC key
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape" && activeModalItem) {
        setActiveModalItem(null);
      }
    };
    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [activeModalItem]);

  // Lock body scroll when modal is open
  useEffect(() => {
    if (activeModalItem) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "unset";
    }
    return () => {
      document.body.style.overflow = "unset";
    };
  }, [activeModalItem]);

  return (
    <>
      <section className="bg-paper text-ink py-20 md:py-32 border-b border-ink/5">
        <div className="max-w-content mx-auto px-6 md:px-12">
          {/* Filter Bar Chips */}
          <div className="flex flex-wrap items-center justify-center gap-3 mb-16">
            {WORK_CATEGORIES.map((cat) => {
              const isActive = cat.id === selectedFilter;

              return (
                <button
                  key={cat.id}
                  type="button"
                  onClick={() => setSelectedFilter(cat.id)}
                  className={`px-5 py-2.5 rounded-full text-xs font-semibold uppercase tracking-wider transition-all duration-200 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand-orange ${
                    isActive
                      ? "bg-brand-gradient text-white shadow-brand-glow"
                      : "bg-mist text-ink/70 hover:bg-ink/5 border border-ink/10"
                  }`}
                >
                  {cat.label}
                </button>
              );
            })}
          </div>

          {/* Portfolio Grid with Framer Motion layout */}
          <motion.div
            layout
            className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 items-start"
          >
            <AnimatePresence>
              {filteredItems.map((item) => (
                <motion.div
                  key={item.id}
                  layout
                  initial={{ opacity: 0, scale: 0.95 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0, scale: 0.95 }}
                  transition={{ duration: 0.35 }}
                  data-cursor="view"
                  onClick={() => setActiveModalItem(item)}
                  className="group rounded-[20px] overflow-hidden bg-white border border-ink/10 hover:border-brand-orange/40 hover:shadow-brand-glow transition-all duration-300 hover:-translate-y-2 cursor-pointer"
                >
                  {/* Poster Image */}
                  <div
                    className={`relative w-full bg-ink ${
                      item.aspectRatio === "9/16"
                        ? "aspect-[9/16]"
                        : item.aspectRatio === "1/1"
                        ? "aspect-square"
                        : "aspect-[16/10]"
                    }`}
                  >
                    <Image
                      src={item.poster}
                      alt={item.title}
                      fill
                      className="object-cover transition-transform duration-500 group-hover:scale-105"
                    />

                    {item.category === "reels" && (
                      <div className="absolute top-4 right-4 w-9 h-9 rounded-full bg-brand-orange text-white flex items-center justify-center shadow-lg">
                        <Play className="w-4 h-4 fill-white translate-x-0.5" />
                      </div>
                    )}

                    <div className="absolute top-4 left-4">
                      <Badge variant="dark">{item.categoryLabel}</Badge>
                    </div>
                  </div>

                  {/* Info */}
                  <div className="p-6">
                    <span className="text-xs font-mono text-brand-orange uppercase tracking-wider block mb-1">
                      {item.client}
                    </span>
                    <h3 className="font-display uppercase text-2xl text-ink tracking-wide group-hover:text-brand-orange transition-colors">
                      {item.title}
                    </h3>
                    <p className="font-body text-xs text-muted line-clamp-2 mt-2 leading-relaxed">
                      {item.description}
                    </p>
                  </div>
                </motion.div>
              ))}
            </AnimatePresence>
          </motion.div>
        </div>
      </section>

      {/* 8.3 Project Viewer (Modal) */}
      <AnimatePresence>
        {activeModalItem && (
          <div
            role="dialog"
            aria-modal="true"
            aria-label={activeModalItem.title}
            className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6 md:p-10"
          >
            {/* Backdrop with blur */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setActiveModalItem(null)}
              className="absolute inset-0 bg-ink/80 backdrop-blur-md"
            />

            {/* Modal Box */}
            <motion.div
              initial={{ opacity: 0, scale: 0.95, y: 20 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.95, y: 20 }}
              transition={{ duration: 0.3 }}
              className="relative w-full max-w-4xl max-h-[90vh] overflow-y-auto rounded-[24px] bg-ink-soft border border-white/10 shadow-2xl text-paper p-6 sm:p-8 md:p-10 z-10"
            >
              {/* Close Button */}
              <button
                type="button"
                onClick={() => setActiveModalItem(null)}
                aria-label="Close project modal"
                className="absolute top-6 right-6 p-2 rounded-full bg-ink border border-white/10 text-paper hover:text-brand-orange hover:border-brand-orange transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand-orange"
              >
                <X className="w-5 h-5" />
              </button>

              <div className="grid grid-cols-1 md:grid-cols-12 gap-8 items-center mt-2">
                {/* Media Column */}
                <div className="md:col-span-6 flex justify-center">
                  <div
                    className={`relative w-full max-w-[360px] rounded-2xl overflow-hidden border border-white/10 bg-ink ${
                      activeModalItem.aspectRatio === "9/16"
                        ? "aspect-[9/16]"
                        : activeModalItem.aspectRatio === "1/1"
                        ? "aspect-square"
                        : "aspect-[16/10]"
                    }`}
                  >
                    <Image
                      src={activeModalItem.poster}
                      alt={activeModalItem.title}
                      fill
                      className="object-cover"
                    />
                  </div>
                </div>

                {/* Details Column */}
                <div className="md:col-span-6 flex flex-col items-start">
                  <div className="mb-3">
                    <Badge variant="orange">
                      {activeModalItem.categoryLabel}
                    </Badge>
                  </div>

                  <span className="text-xs font-mono text-muted uppercase tracking-wider mb-2">
                    Client: {activeModalItem.client}
                  </span>

                  <h3 className="font-display uppercase text-3xl sm:text-4xl text-white tracking-wide mb-4">
                    {activeModalItem.title}
                  </h3>

                  <p className="font-body text-sm md:text-base text-paper/85 mb-6 leading-relaxed">
                    {activeModalItem.description}
                  </p>

                  {/* Tools used */}
                  {activeModalItem.toolsUsed && (
                    <div className="mb-8 w-full border-t border-white/10 pt-4">
                      <span className="text-xs font-mono text-muted uppercase tracking-wider block mb-2">
                        Tools & Workflow:
                      </span>
                      <div className="flex flex-wrap gap-2">
                        {activeModalItem.toolsUsed.map((tool, i) => (
                          <span
                            key={i}
                            className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-semibold bg-white/5 border border-white/10 text-paper"
                          >
                            <Check className="w-3 h-3 text-brand-orange" />
                            {tool}
                          </span>
                        ))}
                      </div>
                    </div>
                  )}

                  {/* Quote link */}
                  <Button
                    href={`/contact?service=${encodeURIComponent(
                      activeModalItem.categoryLabel
                    )}`}
                    size="md"
                    withRocketIcon
                    className="w-full sm:w-auto"
                    onClick={() => setActiveModalItem(null)}
                  >
                    <span className="flex items-center gap-2">
                      <span>Want something like this? Get a Quote</span>
                      <ArrowRight className="w-4 h-4" />
                    </span>
                  </Button>
                </div>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </>
  );
}
