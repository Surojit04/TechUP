"use client";

import React, { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { X, Calendar, MessageCircle, ArrowRight } from "lucide-react";
import { Button } from "@/components/ui/Button";
import { getWhatsAppUrl } from "@/lib/site";
import dynamic from "next/dynamic";

// Dynamic import for Cal to prevent SSR issues
const Cal = dynamic(
  () => import("@calcom/embed-react").then((mod) => mod.default || mod),
  {
    ssr: false,
    loading: () => (
      <div className="flex flex-col items-center justify-center p-12 min-h-[400px]">
        <div className="w-8 h-8 border-2 border-brand-orange border-t-transparent rounded-full animate-spin mb-4" />
        <p className="text-white/60 font-mono text-xs uppercase tracking-wider">
          Loading Booking Calendar...
        </p>
      </div>
    ),
  }
);

interface BookingModalProps {
  isOpen: boolean;
  onClose: () => void;
  onScrollToForm?: () => void;
}

export function BookingModal({
  isOpen,
  onClose,
  onScrollToForm,
}: BookingModalProps) {
  const [calLink, setCalLink] = useState<string | null>(null);

  useEffect(() => {
    const link =
      process.env.NEXT_PUBLIC_CAL_LINK ||
      process.env.NEXT_PUBLIC_CALCOM_LINK ||
      "";
    setCalLink(link.trim());
  }, []);

  // Keyboard Escape listener
  useEffect(() => {
    if (!isOpen) return;

    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        onClose();
      }
    };

    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [isOpen, onClose]);

  // Lock body scroll when modal open
  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "";
    }
    return () => {
      document.body.style.overflow = "";
    };
  }, [isOpen]);

  const waBookingUrl = getWhatsAppUrl(
    "Hi TechUP Digital, I would like to schedule a call to discuss my project."
  );

  return (
    <AnimatePresence>
      {isOpen && (
        <div
          role="dialog"
          aria-modal="true"
          aria-label="Book a Call with TechUP Digital"
          className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6 overflow-y-auto"
        >
          {/* Backdrop */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.2 }}
            onClick={onClose}
            className="fixed inset-0 bg-black/80 backdrop-blur-md"
          />

          {/* Modal Card */}
          <motion.div
            initial={{ opacity: 0, scale: 0.95, y: 16 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.95, y: 16 }}
            transition={{ type: "spring", stiffness: 300, damping: 25 }}
            className="relative z-10 w-full max-w-2xl bg-ink text-paper border border-white/10 rounded-3xl shadow-2xl overflow-hidden flex flex-col my-auto"
          >
            {/* Modal Header */}
            <div className="flex items-center justify-between px-6 py-4 border-b border-white/10 bg-ink-soft">
              <div className="flex items-center gap-3">
                <div className="w-8 h-8 rounded-full bg-brand-orange/20 border border-brand-orange/40 flex items-center justify-center text-brand-orange">
                  <Calendar className="w-4 h-4" />
                </div>
                <div>
                  <h3 className="font-display uppercase text-lg sm:text-xl text-white tracking-wide">
                    Book a Discovery Call
                  </h3>
                  <p className="text-[11px] font-mono text-white/50">
                    15-Minute Strategy & Project Scoping Session
                  </p>
                </div>
              </div>

              <button
                type="button"
                onClick={onClose}
                aria-label="Close booking modal"
                className="w-9 h-9 rounded-full bg-white/5 hover:bg-white/10 text-white/70 hover:text-white flex items-center justify-center transition-colors focus:outline-none focus:ring-2 focus:ring-brand-orange"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            {/* Modal Body */}
            <div className="p-6 sm:p-8">
              {calLink ? (
                <div className="w-full min-h-[500px]">
                  <Cal
                    calLink={calLink}
                    style={{ width: "100%", height: "100%", minHeight: "500px" }}
                    config={{ layout: "month_view" }}
                  />
                </div>
              ) : (
                /* Graceful Placeholder when NEXT_PUBLIC_CAL_LINK is empty */
                <div className="text-center py-6 px-2 flex flex-col items-center">
                  <div className="w-20 h-20 rounded-3xl bg-brand-orange/15 border border-brand-orange/40 flex items-center justify-center text-brand-orange mb-6 shadow-xl shadow-brand-orange/20">
                    <Calendar className="w-10 h-10 animate-pulse" />
                  </div>

                  <span className="font-mono text-xs uppercase tracking-widest text-brand-orange mb-2 font-semibold">
                    {"// DIRECT SCHEDULING"}
                  </span>

                  <h4 className="font-display uppercase text-2xl sm:text-3xl text-white tracking-wide mb-3 max-w-md">
                    Direct Calendar Booking Coming Soon
                  </h4>

                  <p className="font-body text-sm text-white/70 max-w-md leading-relaxed mb-8">
                    Our automated calendar booking is currently being connected. In the meantime, you can reach out directly on WhatsApp or fill out our quote form to lock in a time today.
                  </p>

                  <div className="flex flex-col sm:flex-row items-center gap-3 w-full max-w-md justify-center">
                    <a
                      href={waBookingUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="w-full sm:w-auto"
                    >
                      <Button
                        variant="primary"
                        size="md"
                        className="w-full flex items-center justify-center gap-2"
                      >
                        <MessageCircle className="w-4 h-4" />
                        <span>Chat on WhatsApp</span>
                      </Button>
                    </a>

                    <Button
                      variant="secondary"
                      size="md"
                      onClick={() => {
                        onClose();
                        if (onScrollToForm) onScrollToForm();
                      }}
                      className="w-full sm:w-auto flex items-center justify-center gap-2"
                    >
                      <span>Fill Quote Form</span>
                      <ArrowRight className="w-4 h-4" />
                    </Button>
                  </div>
                </div>
              )}
            </div>
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  );
}
