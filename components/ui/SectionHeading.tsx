"use client";

import React from "react";
import { motion, useReducedMotion } from "framer-motion";
import { cn } from "@/lib/utils";
import { wordContainer, wordItem, defaultViewport } from "@/lib/motion";

interface SectionHeadingProps {
  eyebrow?: string;
  title: string;
  subtitle?: string;
  align?: "left" | "center";
  theme?: "dark" | "light";
  className?: string;
  as?: "h1" | "h2";
}

export function SectionHeading({
  eyebrow,
  title,
  subtitle,
  align = "center",
  theme = "dark",
  className,
  as = "h2",
}: SectionHeadingProps) {
  const prefersReducedMotion = useReducedMotion();
  const words = title.split(" ");

  return (
    <div
      className={cn(
        "max-w-3xl mb-12 md:mb-16",
        align === "center" ? "mx-auto text-center" : "text-left",
        className
      )}
    >
      {eyebrow && (
        <span className="inline-block text-xs md:text-sm font-body font-bold uppercase tracking-[0.2em] text-brand-orange mb-3">
          {"// "}
          {eyebrow}
        </span>
      )}

      {prefersReducedMotion ? (
        React.createElement(
          as,
          {
            className: cn(
              "font-display uppercase text-4xl md:text-6xl tracking-wide leading-[0.95] mb-4",
              theme === "dark" ? "text-paper" : "text-ink"
            ),
          },
          title
        )
      ) : as === "h1" ? (
        <motion.h1
          variants={wordContainer}
          initial="hidden"
          whileInView="visible"
          viewport={defaultViewport}
          className={cn(
            "font-display uppercase text-4xl md:text-6xl tracking-wide leading-[0.95] mb-4 flex flex-wrap gap-x-3 gap-y-1",
            align === "center" ? "justify-center" : "justify-start",
            theme === "dark" ? "text-paper" : "text-ink"
          )}
        >
          {words.map((word, i) => (
            <motion.span key={i} variants={wordItem} className="inline-block">
              {word}
            </motion.span>
          ))}
        </motion.h1>
      ) : (
        <motion.h2
          variants={wordContainer}
          initial="hidden"
          whileInView="visible"
          viewport={defaultViewport}
          className={cn(
            "font-display uppercase text-4xl md:text-6xl tracking-wide leading-[0.95] mb-4 flex flex-wrap gap-x-3 gap-y-1",
            align === "center" ? "justify-center" : "justify-start",
            theme === "dark" ? "text-paper" : "text-ink"
          )}
        >
          {words.map((word, i) => (
            <motion.span key={i} variants={wordItem} className="inline-block">
              {word}
            </motion.span>
          ))}
        </motion.h2>
      )}

      {subtitle && (
        <p
          className={cn(
            "font-body text-base md:text-lg leading-relaxed max-w-2xl",
            align === "center" ? "mx-auto" : "",
            theme === "dark" ? "text-muted" : "text-ink/75"
          )}
        >
          {subtitle}
        </p>
      )}
    </div>
  );
}
