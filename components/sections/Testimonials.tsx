"use client";

import React, { useState, useEffect } from "react";
import { motion, AnimatePresence, useReducedMotion } from "framer-motion";
import { ChevronLeft, ChevronRight, Quote } from "lucide-react";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { TESTIMONIALS_SECTION_CONTENT } from "@/content/home";
import { TESTIMONIALS } from "@/content/testimonials";

export function Testimonials() {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isPaused, setIsPaused] = useState(false);
  const prefersReducedMotion = useReducedMotion();

  useEffect(() => {
    if (isPaused || prefersReducedMotion) return;
    const interval = setInterval(() => {
      setCurrentIndex((prev) => (prev + 1) % TESTIMONIALS.length);
    }, 5000);
    return () => clearInterval(interval);
  }, [isPaused, prefersReducedMotion]);

  const handlePrev = () => {
    setCurrentIndex(
      (prev) => (prev - 1 + TESTIMONIALS.length) % TESTIMONIALS.length
    );
  };

  const handleNext = () => {
    setCurrentIndex((prev) => (prev + 1) % TESTIMONIALS.length);
  };

  const handleDragEnd = (
    _: MouseEvent | TouchEvent | PointerEvent,
    info: { offset: { x: number } }
  ) => {
    if (info.offset.x < -40) {
      handleNext();
    } else if (info.offset.x > 40) {
      handlePrev();
    }
  };

  const current = TESTIMONIALS[currentIndex];

  return (
    <section
      onMouseEnter={() => setIsPaused(true)}
      onMouseLeave={() => setIsPaused(false)}
      className="bg-ink text-paper py-20 md:py-32 border-b border-white/10 relative overflow-hidden"
    >
      <div className="max-w-content mx-auto px-6 md:px-12">
        <SectionHeading
          eyebrow="Client Feedback"
          title={TESTIMONIALS_SECTION_CONTENT.heading}
          subtitle="Experiences and feedback from brand leaders and digital creators across India."
        />

        {/* Carousel Container with Drag and Pause on Hover */}
        <div className="max-w-3xl mx-auto relative mt-10">
          <div className="overflow-hidden">
            <AnimatePresence mode="wait">
              <motion.div
                key={current.id}
                drag="x"
                dragConstraints={{ left: 0, right: 0 }}
                dragElastic={0.2}
                onDragEnd={handleDragEnd}
                initial={
                  prefersReducedMotion
                    ? { opacity: 1 }
                    : { opacity: 0, x: 20 }
                }
                animate={{ opacity: 1, x: 0 }}
                exit={
                  prefersReducedMotion
                    ? { opacity: 0 }
                    : { opacity: 0, x: -20 }
                }
                transition={{ duration: 0.35, ease: "easeOut" }}
                className="p-8 md:p-12 rounded-[24px] bg-ink-soft border border-white/10 shadow-2xl relative cursor-grab active:cursor-grabbing select-none"
              >
                <Quote className="w-12 h-12 text-brand-orange/30 mb-6" />

                <blockquote className="font-body text-lg md:text-2xl text-paper/95 leading-relaxed italic mb-8 min-h-[96px]">
                  &ldquo;{current.quote}&rdquo;
                </blockquote>

                <div className="flex items-center justify-between border-t border-white/10 pt-6">
                  <div>
                    <span className="font-display uppercase text-xl text-white tracking-wide block">
                      {current.clientName}
                    </span>
                    <span className="font-body text-xs text-brand-orange uppercase tracking-wider font-semibold">
                      {current.role} · {current.brand}
                    </span>
                  </div>

                  {/* Navigation Arrows */}
                  <div className="flex items-center gap-3">
                    <button
                      type="button"
                      onClick={handlePrev}
                      aria-label="Previous testimonial"
                      className="w-10 h-10 rounded-full bg-ink border border-white/10 flex items-center justify-center text-paper hover:text-brand-orange hover:border-brand-orange transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand-orange"
                    >
                      <ChevronLeft className="w-5 h-5" />
                    </button>
                    <button
                      type="button"
                      onClick={handleNext}
                      aria-label="Next testimonial"
                      className="w-10 h-10 rounded-full bg-ink border border-white/10 flex items-center justify-center text-paper hover:text-brand-orange hover:border-brand-orange transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand-orange"
                    >
                      <ChevronRight className="w-5 h-5" />
                    </button>
                  </div>
                </div>
              </motion.div>
            </AnimatePresence>
          </div>

          {/* Dots Indicator */}
          <div className="flex justify-center items-center gap-1 mt-8">
            {TESTIMONIALS.map((_, i) => (
              <button
                key={i}
                type="button"
                onClick={() => setCurrentIndex(i)}
                aria-label={`Go to slide ${i + 1}`}
                className="p-2 flex items-center justify-center focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand-orange rounded-full"
              >
                <span
                  className={`h-2 rounded-full transition-all duration-300 block ${
                    i === currentIndex
                      ? "w-8 bg-brand-orange"
                      : "w-2 bg-white/30 hover:bg-white/50"
                  }`}
                />
              </button>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
