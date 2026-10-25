import { Variants } from "framer-motion";

/**
 * Shared motion configurations for TechUP Digital.
 * SPEC RULES:
 * - Animate only transform/opacity (plus clip-path; accordion height).
 * - Respect prefers-reduced-motion.
 * - Reveals play once (viewport: { once: true }).
 */

export const easeOutExpo = [0.16, 1, 0.3, 1] as const;
export const easeOutQuad = [0.25, 0.46, 0.45, 0.94] as const;

// Text mask reveal for H1 display titles
export const textMaskContainer: Variants = {
  hidden: {},
  visible: {
    transition: {
      staggerChildren: 0.08,
      delayChildren: 0.1,
    },
  },
};

export const textMaskItem: Variants = {
  hidden: { y: "105%", opacity: 0 },
  visible: {
    y: "0%",
    opacity: 1,
    transition: {
      duration: 0.7,
      ease: easeOutExpo,
    },
  },
};

// Word-by-word reveal for section headings and CTA bands
export const wordContainer: Variants = {
  hidden: {},
  visible: {
    transition: {
      staggerChildren: 0.02,
      delayChildren: 0.02,
    },
  },
};

export const wordItem: Variants = {
  hidden: { y: 12, opacity: 0 },
  visible: {
    y: 0,
    opacity: 1,
    transition: {
      duration: 0.35,
      ease: easeOutExpo,
    },
  },
};

// Fade up scroll reveal for cards, rows, images
export const fadeUpVariant: Variants = {
  hidden: { y: 16, opacity: 0 },
  visible: {
    y: 0,
    opacity: 1,
    transition: {
      duration: 0.35,
      ease: easeOutExpo,
    },
  },
};

// Stagger parent container
export const staggerContainer: Variants = {
  hidden: {},
  visible: {
    transition: {
      staggerChildren: 0.05,
      delayChildren: 0.02,
    },
  },
};

// Simple fade
export const fadeInVariant: Variants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: { duration: 0.3, ease: easeOutQuad },
  },
};

// Spring configuration for magnetic buttons
export const magneticSpring = {
  type: "spring" as const,
  stiffness: 200,
  damping: 15,
  mass: 0.5,
};

// Default viewport configuration for all scroll reveals
export const defaultViewport = {
  once: true,
  amount: "some" as const,
  margin: "0px 0px -20px 0px",
};
