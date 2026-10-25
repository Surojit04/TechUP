"use client";

import React, { useState } from "react";
import { motion, useReducedMotion } from "framer-motion";
import { MessageCircle, FileText, Calendar, ArrowDown, ArrowUpRight } from "lucide-react";
import { getWhatsAppUrl, PHONE_DISPLAY } from "@/lib/site";
import { BookingModal } from "./BookingModal";
import { trackEvent } from "@/lib/analytics";

export function ConnectOptions() {
  const [isBookingOpen, setIsBookingOpen] = useState(false);
  const prefersReduced = useReducedMotion();

  const scrollToQuoteForm = () => {
    const el = document.getElementById("quote-form");
    if (el) {
      if (typeof window !== "undefined") {
        if ((window as any).__lenis) {
          (window as any).__lenis.scrollTo(el, { offset: -88, immediate: true });
        } else {
          el.scrollIntoView({ behavior: "instant" as ScrollBehavior });
        }
      }
    }
  };

  const waUrl = getWhatsAppUrl(
    "Hi TechUP Digital, I'm reaching out from your website to discuss my project."
  );

  return (
    <>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 sm:gap-8 mb-16 sm:mb-20">
        {/* Card 1: Chat on WhatsApp */}
        <motion.a
          href={waUrl}
          target="_blank"
          rel="noopener noreferrer"
          onClick={() => trackEvent("whatsapp_click", { source: "connect_card" })}
          whileHover={prefersReduced ? {} : { y: -8 }}
          transition={{ duration: 0.25 }}
          className="group relative flex flex-col justify-between p-8 rounded-3xl bg-white border border-ink/10 shadow-lg hover:shadow-2xl hover:shadow-brand-orange/15 hover:border-brand-orange/40 transition-all duration-300 text-ink overflow-hidden"
        >
          {/* Subtle hover gradient background */}
          <div className="absolute inset-0 bg-gradient-to-br from-brand-orange/[0.04] to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />

          <div className="relative z-10">
            <div className="w-14 h-14 rounded-2xl bg-brand-orange/10 border border-brand-orange/20 flex items-center justify-center text-brand-orange mb-6 group-hover:bg-brand-orange group-hover:text-white transition-colors duration-300">
              <motion.div
                whileHover={
                  prefersReduced
                    ? {}
                    : { rotate: [-10, 10, -8, 8, 0], transition: { duration: 0.5 } }
                }
              >
                <MessageCircle className="w-7 h-7" />
              </motion.div>
            </div>

            <span className="font-mono text-[11px] uppercase tracking-wider text-brand-orange font-semibold block mb-1">
              {"// FASTEST RESPONSE"}
            </span>
            <h3 className="font-display uppercase text-2xl sm:text-3xl tracking-wide mb-2 text-ink">
              Chat on WhatsApp
            </h3>
            <p className="font-body text-sm text-ink-muted leading-relaxed mb-4">
              Fastest way to talk to us. Quick questions, audio notes, or brief project scope.
            </p>
          </div>

          <div className="relative z-10 pt-4 border-t border-ink/5 flex items-center justify-between text-xs font-mono font-semibold text-ink group-hover:text-brand-orange transition-colors">
            <span>{PHONE_DISPLAY}</span>
            <ArrowUpRight className="w-4 h-4 transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform" />
          </div>
        </motion.a>

        {/* Card 2: Get a Quote */}
        <motion.div
          role="button"
          tabIndex={0}
          onClick={scrollToQuoteForm}
          onKeyDown={(e) => {
            if (e.key === "Enter" || e.key === " ") {
              e.preventDefault();
              scrollToQuoteForm();
            }
          }}
          whileHover={prefersReduced ? {} : { y: -8 }}
          transition={{ duration: 0.25 }}
          className="group relative flex flex-col justify-between p-8 rounded-3xl bg-white border border-ink/10 shadow-lg hover:shadow-2xl hover:shadow-brand-orange/15 hover:border-brand-orange/40 transition-all duration-300 text-ink overflow-hidden cursor-pointer focus:outline-none focus:ring-2 focus:ring-brand-orange"
        >
          <div className="absolute inset-0 bg-gradient-to-br from-brand-orange/[0.04] to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />

          <div className="relative z-10">
            <div className="w-14 h-14 rounded-2xl bg-brand-orange/10 border border-brand-orange/20 flex items-center justify-center text-brand-orange mb-6 group-hover:bg-brand-orange group-hover:text-white transition-colors duration-300">
              <motion.div
                whileHover={
                  prefersReduced
                    ? {}
                    : { y: [-2, 2, -2], transition: { duration: 0.4 } }
                }
              >
                <FileText className="w-7 h-7" />
              </motion.div>
            </div>

            <span className="font-mono text-[11px] uppercase tracking-wider text-brand-orange font-semibold block mb-1">
              {"// DETAILED SCOPE"}
            </span>
            <h3 className="font-display uppercase text-2xl sm:text-3xl tracking-wide mb-2 text-ink">
              Get a Quote
            </h3>
            <p className="font-body text-sm text-ink-muted leading-relaxed mb-4">
              Share your requirements and get a tailored quote delivered in under 24 hours.
            </p>
          </div>

          <div className="relative z-10 pt-4 border-t border-ink/5 flex items-center justify-between text-xs font-mono font-semibold text-ink group-hover:text-brand-orange transition-colors">
            <span>Scroll to Form</span>
            <ArrowDown className="w-4 h-4 transform group-hover:translate-y-1 transition-transform" />
          </div>
        </motion.div>

        {/* Card 3: Book a Call */}
        <motion.div
          role="button"
          tabIndex={0}
          onClick={() => {
            trackEvent("booking_click", { source: "connect_card" });
            setIsBookingOpen(true);
          }}
          onKeyDown={(e) => {
            if (e.key === "Enter" || e.key === " ") {
              e.preventDefault();
              trackEvent("booking_click", { source: "connect_card" });
              setIsBookingOpen(true);
            }
          }}
          whileHover={prefersReduced ? {} : { y: -8 }}
          transition={{ duration: 0.25 }}
          className="group relative flex flex-col justify-between p-8 rounded-3xl bg-white border border-ink/10 shadow-lg hover:shadow-2xl hover:shadow-brand-orange/15 hover:border-brand-orange/40 transition-all duration-300 text-ink overflow-hidden cursor-pointer focus:outline-none focus:ring-2 focus:ring-brand-orange"
        >
          <div className="absolute inset-0 bg-gradient-to-br from-brand-orange/[0.04] to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />

          <div className="relative z-10">
            <div className="w-14 h-14 rounded-2xl bg-brand-orange/10 border border-brand-orange/20 flex items-center justify-center text-brand-orange mb-6 group-hover:bg-brand-orange group-hover:text-white transition-colors duration-300">
              <motion.div
                whileHover={
                  prefersReduced
                    ? {}
                    : { rotateY: 180, transition: { duration: 0.5 } }
                }
              >
                <Calendar className="w-7 h-7" />
              </motion.div>
            </div>

            <span className="font-mono text-[11px] uppercase tracking-wider text-brand-orange font-semibold block mb-1">
              {"// 15-MIN DISCOVERY"}
            </span>
            <h3 className="font-display uppercase text-2xl sm:text-3xl tracking-wide mb-2 text-ink">
              Book a Call
            </h3>
            <p className="font-body text-sm text-ink-muted leading-relaxed mb-4">
              Pick a time that suits you. Discuss your roadmap live with our creative leadership.
            </p>
          </div>

          <div className="relative z-10 pt-4 border-t border-ink/5 flex items-center justify-between text-xs font-mono font-semibold text-ink group-hover:text-brand-orange transition-colors">
            <span>Open Cal.com Modal</span>
            <ArrowUpRight className="w-4 h-4 transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform" />
          </div>
        </motion.div>
      </div>

      {/* Cal.com Booking Modal */}
      <BookingModal
        isOpen={isBookingOpen}
        onClose={() => setIsBookingOpen(false)}
        onScrollToForm={scrollToQuoteForm}
      />
    </>
  );
}
