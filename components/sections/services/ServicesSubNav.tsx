"use client";

import React, { useEffect, useState, useRef } from "react";
import { cn } from "@/lib/utils";

interface SubNavProps {
  activeId: string;
}

const NAV_ITEMS = [
  { id: "content-video", label: "Content & Video" },
  { id: "branding-design", label: "Branding & Design" },
  { id: "web-digital", label: "Web & Digital Presence" },
  { id: "growth-support", label: "Growth Support" },
];

export function ServicesSubNav({ activeId }: SubNavProps) {
  const [currentActive, setCurrentActive] = useState(activeId || "content-video");
  const [isHeaderVisible, setIsHeaderVisible] = useState(true);
  const lastScrollYRef = useRef(0);
  const isHeaderVisibleRef = useRef(true);

  useEffect(() => {
    if (activeId) {
      setCurrentActive(activeId);
    }
  }, [activeId]);

  // Synchronize top offset with the main website header's auto-hide behavior
  useEffect(() => {
    let ticking = false;

    const handleScroll = () => {
      if (!ticking) {
        window.requestAnimationFrame(() => {
          const currentScrollY = window.scrollY;
          // Header hides on scroll down after 150px, shows on scroll up
          const nextVisible = !(
            currentScrollY > lastScrollYRef.current && currentScrollY > 150
          );
          if (nextVisible !== isHeaderVisibleRef.current) {
            isHeaderVisibleRef.current = nextVisible;
            setIsHeaderVisible(nextVisible);
          }
          lastScrollYRef.current = currentScrollY;
          ticking = false;
        });
        ticking = true;
      }
    };

    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  // Scroll spy to highlight active service category
  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setCurrentActive(entry.target.id);
          }
        });
      },
      {
        rootMargin: "-20% 0px -45% 0px",
        threshold: 0.1,
      }
    );

    NAV_ITEMS.forEach((item) => {
      const el = document.getElementById(item.id);
      if (el) observer.observe(el);
    });

    return () => observer.disconnect();
  }, []);

  // On mobile, keep the active tab centered in the pill dock without blocking smooth loops
  useEffect(() => {
    if (typeof document !== "undefined") {
      const activeLink = document.querySelector(
        `nav[aria-label="Services Sub-navigation"] a[href="#${currentActive}"]`
      );
      if (activeLink) {
        activeLink.scrollIntoView({
          behavior: "instant" as ScrollBehavior,
          block: "nearest",
          inline: "center",
        });
      }
    }
  }, [currentActive]);

  const handleClick = (e: React.MouseEvent<HTMLAnchorElement>, id: string) => {
    e.preventDefault();
    const el = document.getElementById(id);
    if (el) {
      // Offset for sticky navigation clearance so the heading is never obscured
      const yOffset = -80;
      const y = el.getBoundingClientRect().top + window.pageYOffset + yOffset;
      if (typeof window !== "undefined") {
        if ((window as any).__lenis) {
          (window as any).__lenis.scrollTo(y, { immediate: true });
        } else {
          window.scrollTo({ top: y, behavior: "instant" as ScrollBehavior });
        }
      }
      setCurrentActive(id);
      window.history.pushState(null, "", `#${id}`);
    }
  };

  return (
    <div
      className={cn(
        "sticky z-30 w-full pointer-events-none transition-all duration-300 py-2 sm:py-2.5",
        isHeaderVisible ? "top-[70px] sm:top-[74px]" : "top-2 sm:top-3"
      )}
    >
      <div className="w-full max-w-7xl mx-auto px-4 sm:px-6 flex justify-center">
        <nav
          aria-label="Services Sub-navigation"
          className="pointer-events-auto inline-flex items-center gap-1 sm:gap-1.5 p-1 sm:p-1.5 rounded-full bg-ink-soft/90 backdrop-blur-xl border border-white/10 shadow-lg shadow-black/30 max-w-[calc(100vw-2rem)] overflow-x-auto no-scrollbar overscroll-x-contain touch-pan-x"
        >
          <ul className="flex items-center gap-1 sm:gap-1.5 list-none m-0 p-0">
            {NAV_ITEMS.map((item) => {
              const isActive = currentActive === item.id;
              return (
                <li key={item.id} className="shrink-0">
                  <a
                    href={`#${item.id}`}
                    onClick={(e) => handleClick(e, item.id)}
                    aria-current={isActive ? "page" : undefined}
                    className={cn(
                      "inline-flex items-center px-3.5 sm:px-4 py-1.5 rounded-full text-xs sm:text-sm font-body font-medium transition-all duration-200 select-none",
                      isActive
                        ? "bg-brand-orange text-white shadow-sm font-semibold"
                        : "text-white/70 hover:text-white hover:bg-white/5"
                    )}
                  >
                    {item.label}
                  </a>
                </li>
              );
            })}
          </ul>
        </nav>
      </div>
    </div>
  );
}
