"use client";

import React, { useEffect, useState } from "react";
import { motion, useSpring, useMotionValue, useReducedMotion } from "framer-motion";

export function Cursor() {
  const [mounted, setMounted] = useState(false);
  const [isVisible, setIsVisible] = useState(false);
  const [isTouchDevice, setIsTouchDevice] = useState(true);
  const prefersReducedMotion = useReducedMotion();
  const [cursorType, setCursorType] = useState<"default" | "hover" | "view">("default");

  const mouseX = useMotionValue(-100);
  const mouseY = useMotionValue(-100);

  const springConfig = { damping: 25, stiffness: 250, mass: 0.5 };
  const smoothX = useSpring(mouseX, springConfig);
  const smoothY = useSpring(mouseY, springConfig);

  useEffect(() => {
    setMounted(true);
    const hasTouch = "ontouchstart" in window || navigator.maxTouchPoints > 0;
    setIsTouchDevice(hasTouch);

    if (hasTouch) return;

    let currentType: "default" | "hover" | "view" = "default";

    const handleMouseMove = (e: MouseEvent) => {
      setIsVisible(true);
      mouseX.set(e.clientX);
      mouseY.set(e.clientY);

      const target = e.target as HTMLElement | null;
      if (!target) return;

      let nextType: "default" | "hover" | "view" = "default";
      if (target.closest("[data-cursor='view']")) {
        nextType = "view";
      } else if (target.closest("button, a, [role='button'], input, textarea")) {
        nextType = "hover";
      }

      if (nextType !== currentType) {
        currentType = nextType;
        setCursorType(nextType);
      }
    };

    const handleMouseLeave = () => {
      setIsVisible(false);
    };

    const handleMouseEnter = () => {
      setIsVisible(true);
    };

    const handleBlur = () => {
      setIsVisible(false);
    };

    window.addEventListener("mousemove", handleMouseMove, { passive: true });
    document.addEventListener("mouseleave", handleMouseLeave);
    document.addEventListener("mouseenter", handleMouseEnter);
    window.addEventListener("blur", handleBlur);

    return () => {
      window.removeEventListener("mousemove", handleMouseMove);
      document.removeEventListener("mouseleave", handleMouseLeave);
      document.removeEventListener("mouseenter", handleMouseEnter);
      window.removeEventListener("blur", handleBlur);
    };
  }, [mouseX, mouseY]);

  if (!mounted || isTouchDevice || prefersReducedMotion) return null;

  return (
    <>
      {/* Central Orange Dot */}
      <motion.div
        style={{
          x: mouseX,
          y: mouseY,
          translateX: "-50%",
          translateY: "-50%",
        }}
        animate={{
          opacity: isVisible ? 1 : 0,
        }}
        transition={{ opacity: { duration: 0.15 } }}
        className="fixed top-0 left-0 pointer-events-none z-50 w-2.5 h-2.5 rounded-full bg-brand-orange"
      />

      {/* Trailing Ring / View Pill */}
      <motion.div
        style={{
          x: smoothX,
          y: smoothY,
          translateX: "-50%",
          translateY: "-50%",
        }}
        animate={{
          opacity: isVisible ? 1 : 0,
          scale: cursorType === "hover" ? 1.5 : cursorType === "view" ? 2.4 : 1,
          backgroundColor:
            cursorType === "view" ? "rgba(224, 74, 0, 0.9)" : "transparent",
          borderColor:
            cursorType === "hover"
              ? "rgba(224, 74, 0, 0.8)"
              : cursorType === "view"
              ? "transparent"
              : "rgba(224, 74, 0, 0.4)",
        }}
        transition={{
          scale: { type: "spring", stiffness: 350, damping: 25 },
          opacity: { duration: 0.15 },
        }}
        className="fixed top-0 left-0 pointer-events-none z-50 flex items-center justify-center rounded-full border border-brand-orange/40 w-8 h-8"
      >
        {cursorType === "view" && (
          <span className="text-[7px] font-bold uppercase tracking-wider text-white">
            VIEW
          </span>
        )}
      </motion.div>
    </>
  );
}
