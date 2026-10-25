"use client";

import React, { useRef, useState, useEffect } from "react";
import { motion, useReducedMotion } from "framer-motion";
import { cn } from "@/lib/utils";

export interface CardProps extends React.HTMLAttributes<HTMLDivElement> {
  tilt?: boolean;
  glowOnHover?: boolean;
  animatedBorder?: boolean;
  theme?: "dark" | "light";
  children: React.ReactNode;
}

export function Card({
  tilt = false,
  glowOnHover = true,
  animatedBorder = true,
  theme = "dark",
  className,
  children,
  ...props
}: CardProps) {
  const cardRef = useRef<HTMLDivElement>(null);
  const [rotate, setRotate] = useState({ x: 0, y: 0 });
  const [glare, setGlare] = useState({ x: 50, y: 50, opacity: 0 });
  const [isTouchDevice, setIsTouchDevice] = useState(false);
  const prefersReducedMotion = useReducedMotion();

  useEffect(() => {
    if (typeof window !== "undefined") {
      setIsTouchDevice("ontouchstart" in window || navigator.maxTouchPoints > 0);
    }
  }, []);

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!tilt || isTouchDevice || prefersReducedMotion || !cardRef.current) return;
    const rect = cardRef.current.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;
    const centerX = rect.width / 2;
    const centerY = rect.height / 2;

    // Max 6 degrees rotation (spec section 12)
    const rotateX = ((y - centerY) / centerY) * -6;
    const rotateY = ((x - centerX) / centerX) * 6;

    setRotate({ x: rotateX, y: rotateY });
    setGlare({
      x: (x / rect.width) * 100,
      y: (y / rect.height) * 100,
      opacity: 0.15,
    });
  };

  const handleMouseLeave = () => {
    if (!tilt) return;
    setRotate({ x: 0, y: 0 });
    setGlare((prev) => ({ ...prev, opacity: 0 }));
  };

  const isDark = theme === "dark";

  return (
    <motion.div
      ref={cardRef}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      animate={
        tilt && !isTouchDevice && !prefersReducedMotion
          ? {
              rotateX: rotate.x,
              rotateY: rotate.y,
            }
          : {}
      }
      transition={{ type: "spring", stiffness: 300, damping: 20 }}
      style={{ transformStyle: "preserve-3d" }}
      className={cn(
        "group relative rounded-[20px] p-6 md:p-8 transition-all duration-300 select-none",
        "hover:-translate-y-2", // 8px hover lift (spec section 4 & 12)
        glowOnHover && "hover:shadow-brand-glow",
        isDark
          ? "bg-ink-soft text-paper border border-white/10"
          : "bg-paper text-ink border border-ink/10 shadow-sm",
        className
      )}
      {...(props as any)}
    >
      {/* Animated Conic Gradient Border on Hover (spec section 12: 400ms in, 300ms out) */}
      {animatedBorder && !prefersReducedMotion && (
        <div
          aria-hidden="true"
          className="pointer-events-none absolute -inset-[1.5px] rounded-[21.5px] overflow-hidden opacity-0 group-hover:opacity-100 transition-opacity duration-400 ease-out"
        >
          <div className="absolute inset-[-100%] animate-[spin_4s_linear_infinite] bg-[conic-gradient(from_0deg_at_50%_50%,transparent_0deg,transparent_60deg,#E04A00_120deg,#F57C00_180deg,transparent_240deg)]" />
          {/* Inner backing mask so only the 1.5px border reveals the gradient */}
          <div
            className={cn(
              "absolute inset-[1.5px] rounded-[20px]",
              isDark ? "bg-ink-soft" : "bg-paper"
            )}
          />
        </div>
      )}

      {/* 3D Tilt Glare Overlay */}
      {tilt && !isTouchDevice && !prefersReducedMotion && (
        <div
          aria-hidden="true"
          className="pointer-events-none absolute inset-0 rounded-[20px] transition-opacity duration-300 z-10"
          style={{
            background: `radial-gradient(circle at ${glare.x}% ${glare.y}%, rgba(224, 74, 0, ${glare.opacity}), transparent 60%)`,
          }}
        />
      )}

      {/* Card Content */}
      <div className="relative z-10">{children}</div>
    </motion.div>
  );
}
