"use client";

import React, { useRef, useState, useEffect } from "react";
import Link from "next/link";
import { motion, useReducedMotion } from "framer-motion";
import { Rocket } from "lucide-react";
import { cn } from "@/lib/utils";
import { magneticSpring } from "@/lib/motion";

export interface ButtonProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: "primary" | "secondary" | "white" | "outline" | "ghost";
  size?: "sm" | "md" | "lg";
  theme?: "dark" | "light";
  href?: string;
  isExternal?: boolean;
  withRocketIcon?: boolean;
  children: React.ReactNode;
}

export const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
  (
    {
      variant = "primary",
      size = "md",
      theme = "dark",
      href,
      isExternal = false,
      withRocketIcon = false,
      className,
      children,
      disabled,
      ...props
    },
    ref
  ) => {
    const btnRef = useRef<HTMLDivElement>(null);
    const [offset, setOffset] = useState({ x: 0, y: 0 });
    const [isTouchDevice, setIsTouchDevice] = useState(false);
    const prefersReducedMotion = useReducedMotion();

    useEffect(() => {
      if (typeof window !== "undefined") {
        setIsTouchDevice("ontouchstart" in window || navigator.maxTouchPoints > 0);
      }
    }, []);

    const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
      if (isTouchDevice || prefersReducedMotion || !btnRef.current) return;
      const rect = btnRef.current.getBoundingClientRect();
      const centerX = rect.left + rect.width / 2;
      const centerY = rect.top + rect.height / 2;
      const distX = e.clientX - centerX;
      const distY = e.clientY - centerY;
      const distance = Math.hypot(distX, distY);

      // Only apply magnetic pull when cursor is within 80px radius (per spec section 12)
      if (distance < 80) {
        // Cap at 12px movement
        const factor = (1 - distance / 80) * 0.35;
        const x = Math.max(-12, Math.min(12, distX * factor));
        const y = Math.max(-12, Math.min(12, distY * factor));
        setOffset({ x, y });
      } else {
        setOffset({ x: 0, y: 0 });
      }
    };

    const handleMouseLeave = () => {
      setOffset({ x: 0, y: 0 });
    };

    const sizeClasses = {
      sm: "px-5 py-2.5 text-xs tracking-wider",
      md: "px-7 py-3.5 text-sm tracking-wider",
      lg: "px-9 py-4 text-base tracking-wider",
    }[size];

    const isDark = theme === "dark";

    const variantClasses = {
      primary:
        "bg-brand-gradient text-paper shadow-brand-glow hover:shadow-brand-glow-lg border border-transparent hover:brightness-110",
      secondary: isDark
        ? "bg-transparent text-paper border border-white/25 hover:border-transparent hover:bg-brand-gradient hover:text-paper"
        : "bg-transparent text-ink border border-ink/25 hover:border-transparent hover:bg-brand-gradient hover:text-paper",
      white:
        "bg-paper text-ink shadow-md hover:bg-mist hover:text-brand-orange hover:shadow-brand-glow border border-transparent",
      outline:
        "bg-transparent text-paper border border-paper/40 hover:bg-paper/10 hover:border-paper",
      ghost: isDark
        ? "bg-transparent text-paper hover:text-brand-orange hover:bg-white/5"
        : "bg-transparent text-ink hover:text-brand-orange hover:bg-ink/5",
    }[variant];

    const content = (
      <span className="flex items-center justify-center gap-2 font-semibold uppercase tracking-wider">
        <span>{children}</span>
        {withRocketIcon && (
          <Rocket className="w-4 h-4 transition-transform duration-300 ease-out group-hover:translate-x-1 group-hover:-translate-y-0.5" />
        )}
      </span>
    );

    const baseClassName = cn(
      "group relative inline-flex items-center justify-center rounded-full font-body font-semibold transition-all duration-300 select-none min-h-[44px] min-w-[44px] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand-orange focus-visible:ring-offset-2",
      sizeClasses,
      variantClasses,
      disabled && "opacity-50 pointer-events-none",
      className
    );

    const motionWrapper = (
      <motion.div
        ref={btnRef}
        onMouseMove={handleMouseMove}
        onMouseLeave={handleMouseLeave}
        animate={
          isTouchDevice || prefersReducedMotion ? {} : { x: offset.x, y: offset.y }
        }
        transition={magneticSpring}
        className="inline-block"
      >
        {href ? (
          isExternal ? (
            <a
              href={href}
              target="_blank"
              rel="noopener noreferrer"
              className={baseClassName}
              aria-label={props["aria-label"]}
            >
              {content}
            </a>
          ) : (
            <Link
              href={href}
              className={baseClassName}
              aria-label={props["aria-label"]}
            >
              {content}
            </Link>
          )
        ) : (
          <button
            ref={ref}
            type={props.type || "button"}
            disabled={disabled}
            className={baseClassName}
            {...props}
          >
            {content}
          </button>
        )}
      </motion.div>
    );

    return motionWrapper;
  }
);

Button.displayName = "Button";
