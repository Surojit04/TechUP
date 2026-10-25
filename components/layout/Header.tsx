"use client";

import React, { useState, useEffect, useRef } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import Image from "next/image";
import { motion, AnimatePresence } from "framer-motion";
import { Menu, X, ArrowUpRight } from "lucide-react";
import { NAV_LINKS, INSTAGRAM_URL, getWhatsAppUrl } from "@/lib/site";
import { Button } from "@/components/ui/Button";
import { cn } from "@/lib/utils";

export function Header() {
  const pathname = usePathname();
  const [isScrolled, setIsScrolled] = useState(false);
  const [isVisible, setIsVisible] = useState(true);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const lastScrollYRef = useRef(0);
  const isScrolledRef = useRef(false);
  const isVisibleRef = useRef(true);

  useEffect(() => {
    let ticking = false;

    const handleScroll = () => {
      if (!ticking) {
        window.requestAnimationFrame(() => {
          const currentScrollY = window.scrollY;

          // Blur & dark background after 80px
          const nextScrolled = currentScrollY > 80;
          if (nextScrolled !== isScrolledRef.current) {
            isScrolledRef.current = nextScrolled;
            setIsScrolled(nextScrolled);
          }

          // Hide on scroll down, show on scroll up
          const nextVisible = !(
            currentScrollY > lastScrollYRef.current && currentScrollY > 150
          );
          if (nextVisible !== isVisibleRef.current) {
            isVisibleRef.current = nextVisible;
            setIsVisible(nextVisible);
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

  // Lock body scroll when mobile menu is open
  useEffect(() => {
    if (mobileMenuOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "unset";
    }
    return () => {
      document.body.style.overflow = "unset";
    };
  }, [mobileMenuOpen]);

  // Close menu on ESC
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape" && mobileMenuOpen) {
        setMobileMenuOpen(false);
      }
    };
    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [mobileMenuOpen]);

  const waUrl = getWhatsAppUrl();

  const handleNavClick = (
    e: React.MouseEvent<HTMLAnchorElement>,
    targetHref: string
  ) => {
    if (pathname === targetHref) {
      e.preventDefault();
      if (typeof window !== "undefined") {
        if ((window as any).__lenis) {
          (window as any).__lenis.scrollTo(0, { immediate: true });
        }
        window.scrollTo({ top: 0, left: 0, behavior: "instant" as ScrollBehavior });
      }
    }
  };

  return (
    <>
      <header
        className={cn(
          "fixed top-0 left-0 right-0 z-40 transition-all duration-300",
          isVisible ? "translate-y-0" : "-translate-y-full",
          isScrolled
            ? "bg-ink/90 backdrop-blur-md border-b border-white/10 py-3.5 shadow-lg"
            : "bg-transparent py-5"
        )}
      >
        <div className="w-full max-w-content mx-auto px-4 sm:px-6 md:px-12 flex items-center justify-between">
          {/* Logo */}
          <Link
            href="/"
            prefetch={true}
            onClick={(e) => handleNavClick(e, "/")}
            className="flex items-center gap-3 shrink-0 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand-orange rounded-lg group"
            aria-label="TechUp Digital Home"
          >
            <div className="relative w-9 h-9 sm:w-10 sm:h-10 md:w-11 md:h-11 shrink-0 transition-transform duration-300 group-hover:scale-105">
              <Image
                src="/logos/techup-logo.png"
                alt="TechUp Digital Logo"
                fill
                priority
                className="object-contain"
              />
            </div>
            <div className="flex flex-col">
              <span className="font-display uppercase text-lg sm:text-xl tracking-wider text-white leading-none">
                TECH<span className="text-brand-orange">UP</span>
              </span>
              <span className="text-[9px] font-mono tracking-widest text-white/50 uppercase leading-none mt-1">
                DIGITAL
              </span>
            </div>
          </Link>

          {/* Desktop Nav */}
          <nav
            aria-label="Main Navigation"
            className="hidden lg:flex items-center gap-8 bg-ink-soft/80 border border-white/10 px-6 py-2 rounded-full backdrop-blur-sm"
          >
            {NAV_LINKS.map((link) => {
              const isActive =
                link.href === "/"
                  ? pathname === "/"
                  : pathname.startsWith(link.href);

              return (
                <Link
                  key={link.href}
                  href={link.href}
                  prefetch={true}
                  onClick={(e) => handleNavClick(e, link.href)}
                  className={cn(
                    "relative py-1 text-sm font-body font-medium transition-colors hover:text-brand-orange uppercase tracking-wider",
                    isActive ? "text-paper font-semibold" : "text-muted"
                  )}
                >
                  {link.label}
                  {isActive && (
                    <motion.div
                      layoutId="activeNavIndicator"
                      className="absolute bottom-0 left-0 right-0 h-[2px] bg-brand-orange rounded-full"
                      transition={{ type: "spring", stiffness: 350, damping: 30 }}
                    />
                  )}
                </Link>
              );
            })}
          </nav>

          {/* CTA & Mobile Toggle */}
          <div className="flex items-center gap-4">
            <div className="hidden sm:block">
              <Button href="/contact" size="sm" withRocketIcon>
                Get a Quote
              </Button>
            </div>

            {/* Mobile menu button */}
            <button
              type="button"
              onClick={() => setMobileMenuOpen(true)}
              aria-label="Open navigation menu"
              aria-expanded={mobileMenuOpen}
              className="lg:hidden p-2.5 rounded-full bg-ink-soft border border-white/10 text-paper hover:text-brand-orange focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand-orange"
            >
              <Menu className="w-6 h-6" />
            </button>
          </div>
        </div>
      </header>

      {/* Full-Screen Mobile Menu */}
      <AnimatePresence>
        {mobileMenuOpen && (
          <motion.div
            initial={{
              clipPath: "circle(0% at calc(100% - 36px) 36px)",
              opacity: 0,
            }}
            animate={{
              clipPath: "circle(150% at calc(100% - 36px) 36px)",
              opacity: 1,
            }}
            exit={{
              clipPath: "circle(0% at calc(100% - 36px) 36px)",
              opacity: 0,
            }}
            transition={{ duration: 0.45, ease: [0.16, 1, 0.3, 1] }}
            className="fixed inset-0 z-50 bg-ink flex flex-col justify-between p-6 md:p-12 lg:hidden"
          >
            {/* Top Bar inside menu */}
            <div className="flex items-center justify-between">
              <Link
                href="/"
                prefetch={true}
                onClick={(e) => {
                  setMobileMenuOpen(false);
                  handleNavClick(e, "/");
                }}
                className="flex items-center gap-3 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand-orange rounded-lg"
                aria-label="TechUp Digital Home"
              >
                <div className="relative w-10 h-10 shrink-0">
                  <Image
                    src="/logos/techup-logo.png"
                    alt="TechUp Digital Logo"
                    fill
                    className="object-contain"
                  />
                </div>
                <div className="flex flex-col">
                  <span className="font-display uppercase text-lg tracking-wider text-white leading-none">
                    TECH<span className="text-brand-orange">UP</span>
                  </span>
                  <span className="text-[9px] font-mono tracking-widest text-white/50 uppercase leading-none mt-1">
                    DIGITAL
                  </span>
                </div>
              </Link>
              <button
                type="button"
                onClick={() => setMobileMenuOpen(false)}
                aria-label="Close navigation menu"
                className="p-2.5 rounded-full bg-ink-soft border border-white/10 text-paper hover:text-brand-orange focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand-orange"
              >
                <X className="w-6 h-6" />
              </button>
            </div>

            {/* Links */}
            <nav className="flex flex-col gap-4 my-auto">
              {NAV_LINKS.map((link, index) => {
                const isActive =
                  link.href === "/"
                    ? pathname === "/"
                    : pathname.startsWith(link.href);

                return (
                  <motion.div
                    key={link.href}
                    initial={{ opacity: 0, x: -30 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{
                      delay: 0.04 * index,
                      duration: 0.25,
                      ease: "easeOut",
                    }}
                  >
                    <Link
                      href={link.href}
                      prefetch={true}
                      onClick={(e) => {
                        setMobileMenuOpen(false);
                        handleNavClick(e, link.href);
                      }}
                      className={cn(
                        "font-display text-4xl sm:text-5xl uppercase tracking-wider flex items-center justify-between py-2 transition-colors",
                        isActive ? "text-brand-orange" : "text-paper hover:text-brand-orange"
                      )}
                    >
                      <span>{link.label}</span>
                      <ArrowUpRight className="w-6 h-6 opacity-40" />
                    </Link>
                  </motion.div>
                );
              })}
            </nav>

            {/* Bottom actions */}
            <div className="flex flex-col gap-4 pt-6 border-t border-white/10">
              <Button
                href="/contact"
                size="md"
                withRocketIcon
                className="w-full"
                onClick={() => setMobileMenuOpen(false)}
              >
                Get a Quote
              </Button>

              <div className="flex items-center justify-between text-xs font-semibold uppercase tracking-wider text-muted pt-2">
                <a
                  href={waUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="hover:text-brand-orange transition-colors"
                >
                  WhatsApp Us
                </a>
                <a
                  href={INSTAGRAM_URL}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="hover:text-brand-orange transition-colors"
                >
                  Instagram
                </a>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
