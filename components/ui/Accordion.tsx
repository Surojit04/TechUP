"use client";

import React, { useState } from "react";
import { motion, AnimatePresence, useReducedMotion } from "framer-motion";
import { Plus } from "lucide-react";
import { cn } from "@/lib/utils";

export interface AccordionItemData {
  id: string;
  question: string;
  answer: string;
}

export interface AccordionProps {
  items: AccordionItemData[];
  allowMultiple?: boolean;
  theme?: "dark" | "light";
  className?: string;
}

export function Accordion({
  items,
  allowMultiple = false,
  theme = "light",
  className,
}: AccordionProps) {
  const [openIds, setOpenIds] = useState<string[]>([items[0]?.id || ""]);
  const prefersReducedMotion = useReducedMotion();
  const isLight = theme === "light";

  const toggle = (id: string) => {
    if (allowMultiple) {
      setOpenIds((prev) =>
        prev.includes(id) ? prev.filter((i) => i !== id) : [...prev, id]
      );
    } else {
      setOpenIds((prev) => (prev.includes(id) ? [] : [id]));
    }
  };

  return (
    <div className={cn("flex flex-col gap-4 max-w-3xl mx-auto w-full", className)}>
      {items.map((item, index) => {
        const isOpen = openIds.includes(item.id);
        const headerId = `accordion-header-${item.id}`;
        const panelId = `accordion-panel-${item.id}`;

        return (
          <div
            key={item.id || index}
            className={cn(
              "rounded-2xl border transition-all duration-300 overflow-hidden",
              isLight
                ? "bg-mist border-ink/10 hover:border-brand-orange/40 shadow-sm"
                : "bg-ink-soft border-white/10 hover:border-brand-orange/40"
            )}
          >
            <h3>
              <button
                type="button"
                id={headerId}
                aria-expanded={isOpen}
                aria-controls={panelId}
                onClick={() => toggle(item.id)}
                className={cn(
                  "w-full flex items-center justify-between p-6 text-left font-display uppercase text-xl md:text-2xl tracking-wide transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand-orange select-none",
                  isLight ? "text-ink" : "text-white",
                  isOpen && "text-brand-orange"
                )}
              >
                <span className="pr-4">{item.question}</span>
                <div
                  className={cn(
                    "w-8 h-8 rounded-full flex items-center justify-center shrink-0 transition-transform duration-300",
                    isLight ? "bg-white text-ink shadow-sm" : "bg-ink text-white",
                    isOpen && "rotate-45 text-brand-orange bg-brand-orange/15"
                  )}
                >
                  <Plus className="w-4 h-4" />
                </div>
              </button>
            </h3>

            <AnimatePresence initial={false}>
              {isOpen && (
                <motion.div
                  id={panelId}
                  role="region"
                  aria-labelledby={headerId}
                  initial={prefersReducedMotion ? { opacity: 1 } : { height: 0, opacity: 0 }}
                  animate={prefersReducedMotion ? { opacity: 1 } : { height: "auto", opacity: 1 }}
                  exit={prefersReducedMotion ? { opacity: 0 } : { height: 0, opacity: 0 }}
                  transition={{ duration: 0.3, ease: [0.16, 1, 0.3, 1] }}
                >
                  <div
                    className={cn(
                      "px-6 pb-6 pt-1 font-body text-sm md:text-base leading-relaxed border-t",
                      isLight
                        ? "text-ink/80 border-ink/5"
                        : "text-muted border-white/5"
                    )}
                  >
                    {item.answer}
                  </div>
                </motion.div>
              )}
            </AnimatePresence>
          </div>
        );
      })}
    </div>
  );
}
