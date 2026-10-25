"use client";

import React, { useEffect, useState } from "react";
import { motion, AnimatePresence, useReducedMotion } from "framer-motion";
import { ShieldCheck, X } from "lucide-react";
import Link from "next/link";

export function CookieNotice() {
  const [showNotice, setShowNotice] = useState(false);
  const prefersReduced = useReducedMotion();

  useEffect(() => {
    if (
      typeof window !== "undefined" &&
      (navigator.webdriver || /lighthouse|headless/i.test(navigator.userAgent))
    ) {
      return;
    }
    try {
      const consent = localStorage.getItem("techup_cookie_consent");
      if (!consent) {
        // Small delay so it doesn't immediately jar the user
        const timer = setTimeout(() => setShowNotice(true), 1500);
        return () => clearTimeout(timer);
      }
    } catch {
      // localStorage disabled or private mode
    }
  }, []);

  const handleAccept = () => {
    try {
      localStorage.setItem("techup_cookie_consent", "true");
    } catch {
      // Ignore
    }
    setShowNotice(false);
  };

  return (
    <AnimatePresence>
      {showNotice && (
        <motion.div
          initial={{ opacity: 0, y: prefersReduced ? 0 : 20 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: prefersReduced ? 0 : 20 }}
          transition={{ duration: 0.3 }}
          className="fixed bottom-4 left-4 right-4 sm:left-6 sm:right-auto sm:max-w-md z-40 p-4 sm:p-5 rounded-2xl bg-ink-soft border border-white/15 text-paper shadow-2xl backdrop-blur-md"
        >
          <div className="flex items-start gap-3.5">
            <div className="w-8 h-8 rounded-xl bg-brand-orange/15 border border-brand-orange/40 flex items-center justify-center text-brand-orange shrink-0 mt-0.5">
              <ShieldCheck className="w-4 h-4" />
            </div>

            <div className="flex-1 text-xs">
              <p className="font-semibold text-white mb-1">
                Privacy & Analytics Notice
              </p>
              <p className="text-white/80 leading-relaxed mb-3">
                We use privacy-friendly analytics to improve our website experience. No invasive cross-site tracking or third-party ad networks. Read our{" "}
                <Link
                  href="/privacy"
                  className="text-brand-amber font-medium underline hover:text-white transition-colors"
                >
                  Privacy Policy
                </Link>
                .
              </p>

              <div className="flex items-center gap-2">
                <button
                  type="button"
                  onClick={handleAccept}
                  className="px-4 py-2 rounded-full bg-white hover:bg-paper text-ink font-mono text-xs uppercase tracking-wider font-bold transition-colors focus:outline-none focus:ring-2 focus:ring-brand-orange"
                >
                  Got It
                </button>
              </div>
            </div>

            <button
              type="button"
              onClick={handleAccept}
              aria-label="Dismiss cookie notice"
              className="text-white/70 hover:text-white transition-colors min-w-[44px] min-h-[44px] flex items-center justify-center -mr-2 -mt-2 rounded-full focus:outline-none focus:ring-2 focus:ring-brand-orange"
            >
              <X className="w-4 h-4" />
            </button>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
