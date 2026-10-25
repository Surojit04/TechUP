"use client";

import React, { useEffect, useRef } from "react";
import { usePathname } from "next/navigation";
import Lenis from "lenis";

export function SmoothScroll({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();
  const lenisRef = useRef<Lenis | null>(null);

  useEffect(() => {
    // Respect prefers-reduced-motion
    const mediaQuery = window.matchMedia("(prefers-reduced-motion: reduce)");
    if (mediaQuery.matches) {
      return;
    }

    if (typeof window !== "undefined" && "scrollRestoration" in window.history) {
      window.history.scrollRestoration = "manual";
    }

    const lenis = new Lenis({
      duration: 0.7,
      easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
      touchMultiplier: 1.8,
      infinite: false,
    });

    lenisRef.current = lenis;
    (window as any).__lenis = lenis;

    function raf(time: number) {
      lenis.raf(time);
      requestAnimationFrame(raf);
    }

    const animId = requestAnimationFrame(raf);

    // Listen for hashchange events on the window for instant in-page anchor jumps
    const handleHashChange = () => {
      const hash = window.location.hash;
      if (!hash) return;
      try {
        const el = document.querySelector(hash);
        if (el) {
          if (lenisRef.current) {
            lenisRef.current.scrollTo(el as HTMLElement, { offset: -88, immediate: true });
          } else {
            (el as HTMLElement).scrollIntoView({ behavior: "instant" as ScrollBehavior });
          }
        }
      } catch {
        // Ignore invalid selectors
      }
    };

    window.addEventListener("hashchange", handleHashChange);

    return () => {
      cancelAnimationFrame(animId);
      window.removeEventListener("hashchange", handleHashChange);
      lenis.destroy();
      lenisRef.current = null;
      if (typeof window !== "undefined") {
        delete (window as any).__lenis;
      }
    };
  }, []);

  // When pathname changes, immediately reset scroll position to top or to hash target
  useEffect(() => {
    if (typeof window === "undefined") return;

    const hash = window.location.hash;
    if (hash) {
      let attempts = 0;
      const checkAndScroll = () => {
        try {
          const el = document.querySelector(hash);
          if (el) {
            if (lenisRef.current) {
              lenisRef.current.scrollTo(el as HTMLElement, { offset: -88, immediate: true });
            } else {
              (el as HTMLElement).scrollIntoView({ behavior: "instant" as ScrollBehavior });
            }
            return;
          }
        } catch {
          // Ignore
        }
        attempts++;
        if (attempts < 5) {
          requestAnimationFrame(checkAndScroll);
        }
      };
      checkAndScroll();
      return;
    }

    // Immediately snap to top without animation
    if (lenisRef.current) {
      lenisRef.current.scrollTo(0, { immediate: true });
    }
    window.scrollTo({ top: 0, left: 0, behavior: "instant" as ScrollBehavior });
  }, [pathname]);

  return <>{children}</>;
}
