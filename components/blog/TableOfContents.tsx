"use client";

import React, { useEffect, useState } from "react";
import { List, ChevronRight } from "lucide-react";
import { cn } from "@/lib/utils";

interface TOCItem {
  id: string;
  text: string;
  level: number;
}

export function TableOfContents() {
  const [headings, setHeadings] = useState<TOCItem[]>([]);
  const [activeId, setActiveId] = useState<string>("");

  useEffect(() => {
    // Find all H2 and H3 elements in the article body
    const article = document.querySelector("article");
    if (!article) return;

    const headingEls = Array.from(article.querySelectorAll("h2, h3"));
    const items: TOCItem[] = headingEls.map((el, i) => {
      // Ensure id exists
      if (!el.id) {
        el.id = el.textContent
          ? el.textContent.toLowerCase().replace(/[^a-z0-9]+/g, "-").replace(/^-|-$/g, "")
          : `heading-${i}`;
      }
      return {
        id: el.id,
        text: el.textContent || "",
        level: el.tagName === "H2" ? 2 : 3,
      };
    });

    setHeadings(items);

    // Scroll spy using IntersectionObserver
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setActiveId(entry.target.id);
          }
        });
      },
      {
        rootMargin: "-80px 0px -60% 0px",
        threshold: 0.1,
      }
    );

    headingEls.forEach((el) => observer.observe(el));

    return () => observer.disconnect();
  }, []);

  if (headings.length === 0) return null;

  const handleClick = (e: React.MouseEvent<HTMLAnchorElement>, id: string) => {
    e.preventDefault();
    const el = document.getElementById(id);
    if (el) {
      const yOffset = -100;
      const y = el.getBoundingClientRect().top + window.pageYOffset + yOffset;
      if (typeof window !== "undefined") {
        if ((window as any).__lenis) {
          (window as any).__lenis.scrollTo(y, { immediate: true });
        } else {
          window.scrollTo({ top: y, behavior: "instant" as ScrollBehavior });
        }
      }
      setActiveId(id);
      window.history.pushState(null, "", `#${id}`);
    }
  };

  return (
    <nav
      aria-label="Table of contents"
      className="p-6 rounded-2xl bg-ink-soft border border-white/10"
    >
      <div className="flex items-center gap-2 text-xs font-mono uppercase tracking-widest text-brand-orange mb-4 font-semibold">
        <List className="w-4 h-4" />
        <span>Table of Contents</span>
      </div>

      <ul className="space-y-2.5 text-xs font-body">
        {headings.map((item) => {
          const isActive = activeId === item.id;
          return (
            <li
              key={item.id}
              className={cn(
                "transition-colors",
                item.level === 3 ? "pl-3 text-[11px]" : "pl-0"
              )}
            >
              <a
                href={`#${item.id}`}
                onClick={(e) => handleClick(e, item.id)}
                className={cn(
                  "flex items-start gap-1.5 py-0.5 leading-snug transition-colors",
                  isActive
                    ? "text-brand-orange font-semibold"
                    : "text-white/70 hover:text-white"
                )}
              >
                <ChevronRight
                  className={cn(
                    "w-3.5 h-3.5 shrink-0 mt-0.5 transition-transform",
                    isActive ? "text-brand-orange translate-x-0.5" : "text-white/30"
                  )}
                />
                <span className="line-clamp-2">{item.text}</span>
              </a>
            </li>
          );
        })}
      </ul>
    </nav>
  );
}
