"use client";

import React, { useState, useEffect } from "react";
import Image from "next/image";
import { motion, AnimatePresence } from "framer-motion";

export function FirstVisitLoader() {
  const [isVisible, setIsVisible] = useState(true);

  useEffect(() => {
    // Check if loader has already displayed in this browser session
    const hasShown = sessionStorage.getItem("techup_loader_shown");
    if (hasShown) {
      setIsVisible(false);
      return;
    }

    const dismiss = () => {
      sessionStorage.setItem("techup_loader_shown", "true");
      setIsVisible(false);
    };

    if (document.readyState === "complete") {
      const timer = setTimeout(dismiss, 500);
      return () => clearTimeout(timer);
    } else {
      window.addEventListener("load", dismiss);
      const fallbackTimer = setTimeout(dismiss, 900);
      return () => {
        window.removeEventListener("load", dismiss);
        clearTimeout(fallbackTimer);
      };
    }
  }, []);

  return (
    <AnimatePresence>
      {isVisible && (
        <motion.div
          key="first-visit-loader"
          initial={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.4, ease: "easeOut" }}
          className="fixed inset-0 z-50 flex items-center justify-center bg-ink pointer-events-none"
          role="status"
          aria-live="polite"
          aria-label="Loading TechUp Digital"
        >
          {/* Subtle ambient lighting behind logo */}
          <div className="absolute w-72 h-72 bg-brand-orange/20 rounded-full blur-3xl pointer-events-none" />

          {/* Centered official TechUp Digital logo */}
          <motion.div
            initial={{ opacity: 1, scale: 0.94 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 1.05 }}
            transition={{ duration: 0.4, ease: "easeOut" }}
            className="relative z-10 flex items-center justify-center"
          >
            <Image
              src="/logos/techup-logo.png"
              alt="TechUp Digital Logo"
              width={160}
              height={160}
              priority
              className="w-28 h-28 sm:w-36 sm:h-36 md:w-44 md:h-44 object-contain drop-shadow-[0_10px_30px_rgba(224,74,0,0.35)]"
            />
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
