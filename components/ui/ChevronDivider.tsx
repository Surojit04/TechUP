"use client";

import React from "react";
import { cn } from "@/lib/utils";

export interface ChevronDividerProps {
  position?: "top" | "bottom";
  color?: "ink" | "ink-soft" | "paper" | "mist" | "brand-orange" | "brand-gradient";
  bgColor?: "ink" | "ink-soft" | "paper" | "mist" | "transparent";
  direction?: "down" | "up";
  height?: number;
  className?: string;
}

const colorMap = {
  ink: "#0B0B0F",
  "ink-soft": "#17171D",
  paper: "#FFFFFF",
  mist: "#F5F5F7",
  "brand-orange": "#E04A00",
  "brand-gradient": "url(#chevronDividerGrad)",
  transparent: "transparent",
};

export function ChevronDivider({
  position = "bottom",
  color = "ink",
  bgColor = "transparent",
  direction = "down",
  height = 24,
  className,
}: ChevronDividerProps) {
  const fillColor = colorMap[color] || color;
  const bgFillColor = colorMap[bgColor] || bgColor;

  // Path for chevron pointing down or up
  // ViewBox: 0 0 1200 48
  const pathD =
    direction === "down"
      ? "M0 0 L600 48 L1200 0 L1200 48 L0 48 Z" // chevron down
      : "M0 48 L600 0 L1200 48 L1200 0 L0 0 Z"; // chevron up

  return (
    <div
      aria-hidden="true"
      className={cn(
        "w-full overflow-hidden leading-none select-none pointer-events-none relative z-20",
        position === "top" ? "-mb-px" : "-mt-px",
        className
      )}
      style={{ height: `${height}px` }}
    >
      <svg
        className="w-full h-full block"
        viewBox="0 0 1200 48"
        preserveAspectRatio="none"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
      >
        <defs>
          <linearGradient id="chevronDividerGrad" x1="0%" y1="0%" x2="100%" y2="0%">
            <stop offset="0%" stopColor="#E04A00" />
            <stop offset="100%" stopColor="#F57C00" />
          </linearGradient>
        </defs>
        {bgColor !== "transparent" && (
          <rect width="100%" height="100%" fill={bgFillColor} />
        )}
        <path d={pathD} fill={fillColor} />
      </svg>
    </div>
  );
}
