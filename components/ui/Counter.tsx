"use client";

import React, { useEffect, useState, useRef } from "react";
import { useInView, useReducedMotion } from "framer-motion";

export interface CounterProps {
  value: string; // e.g. "50+", "99%", "[XX]+"
  duration?: number;
  className?: string;
}

export function Counter({ value, duration = 1.6, className }: CounterProps) {
  const ref = useRef<HTMLSpanElement>(null);
  const isInView = useInView(ref, { once: true, amount: 0.4 });
  const prefersReducedMotion = useReducedMotion();
  const [displayValue, setDisplayValue] = useState<string>("0");

  // Check if value is a placeholder like "[XX]+"
  const isPlaceholder = value.includes("[") || value.includes("XX");
  const numericMatch = value.match(/\d+/);
  const targetNumber = numericMatch ? parseInt(numericMatch[0], 10) : 0;
  const prefix = value.startsWith("+") ? "+" : "";
  const suffix = value.replace(/^[+]?\d+/, "");

  useEffect(() => {
    // If it's a placeholder or reduced motion is requested, display target immediately
    if (isPlaceholder || prefersReducedMotion) {
      setDisplayValue(value);
      return;
    }

    if (!isInView) return;

    let start = 0;
    const end = targetNumber;
    const totalFrames = Math.round(duration * 60);
    let frame = 0;

    const timer = setInterval(() => {
      frame++;
      // Ease out expo / cubic
      const progress = frame / totalFrames;
      const easeProgress = 1 - Math.pow(1 - progress, 3);
      const current = Math.round(start + (end - start) * easeProgress);

      setDisplayValue(`${prefix}${current}${suffix}`);

      if (frame >= totalFrames) {
        clearInterval(timer);
        setDisplayValue(value);
      }
    }, 1000 / 60);

    return () => clearInterval(timer);
  }, [isInView, isPlaceholder, prefersReducedMotion, value, targetNumber, prefix, suffix, duration]);

  return (
    <span ref={ref} className={className} aria-label={value}>
      {displayValue}
    </span>
  );
}
