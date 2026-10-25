"use client";

import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Mail, MessageCircle, Instagram, MapPin, Copy, Check, ExternalLink } from "lucide-react";
import {
  CONTACT_EMAIL,
  PHONE_DISPLAY,
  INSTAGRAM_HANDLE,
  INSTAGRAM_URL,
  LOCATION,
  getWhatsAppUrl,
} from "@/lib/site";

export function ContactDetails() {
  const [toastMessage, setToastMessage] = useState<string | null>(null);

  const copyToClipboard = (text: string, label: string) => {
    navigator.clipboard.writeText(text);
    setToastMessage(`${label} copied to clipboard!`);
    setTimeout(() => {
      setToastMessage(null);
    }, 2500);
  };

  const contactItems = [
    {
      id: "email",
      label: "Email Us",
      value: CONTACT_EMAIL,
      display: CONTACT_EMAIL,
      actionHref: `mailto:${CONTACT_EMAIL}`,
      actionLabel: "Send Email",
      isCopyable: true,
      icon: Mail,
    },
    {
      id: "whatsapp",
      label: "WhatsApp Direct",
      value: PHONE_DISPLAY,
      display: PHONE_DISPLAY,
      actionHref: getWhatsAppUrl(),
      actionLabel: "Open Chat",
      isCopyable: true,
      icon: MessageCircle,
    },
    {
      id: "instagram",
      label: "Follow Us",
      value: INSTAGRAM_HANDLE,
      display: INSTAGRAM_HANDLE,
      actionHref: INSTAGRAM_URL,
      actionLabel: "View Profile",
      isCopyable: false,
      isExternal: true,
      icon: Instagram,
    },
    {
      id: "location",
      label: "Headquarters",
      value: LOCATION,
      display: LOCATION,
      subtext: "[owner to confirm whether to show]",
      isCopyable: false,
      icon: MapPin,
    },
  ];

  return (
    <section className="relative py-24 md:py-32 bg-ink text-paper overflow-hidden border-t border-white/5">
      {/* Background glow */}
      <div className="absolute top-1/2 left-1/4 -translate-y-1/2 w-96 h-96 rounded-full bg-brand-orange/10 blur-[100px] pointer-events-none" />

      <div className="container max-w-6xl mx-auto px-4 sm:px-6 relative z-10">
        <div className="text-center max-w-2xl mx-auto mb-16">
          <span className="font-mono text-xs uppercase tracking-widest text-brand-orange font-semibold block mb-2">
            {"// DIRECT CHANNELS"}
          </span>
          <h2 className="font-display uppercase text-3xl sm:text-4xl md:text-5xl tracking-wide text-white mb-4">
            Reach Out Directly
          </h2>
          <p className="font-body text-sm sm:text-base text-white/70">
            Prefer direct communication over filling out forms? We are always one message or email away.
          </p>
        </div>

        {/* 4 Cards Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {contactItems.map((item, idx) => {
            const Icon = item.icon;
            return (
              <motion.div
                key={item.id}
                initial={{ opacity: 0, y: 24 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: idx * 0.1 }}
                className="group relative p-6 rounded-3xl bg-ink-soft border border-white/10 hover:border-brand-orange/40 hover:shadow-xl hover:shadow-brand-orange/10 transition-all duration-300 flex flex-col justify-between"
              >
                <div>
                  <div className="w-12 h-12 rounded-2xl bg-white/5 border border-white/10 flex items-center justify-center text-white/70 group-hover:text-brand-orange group-hover:border-brand-orange/30 group-hover:bg-brand-orange/10 transition-all duration-300 mb-5">
                    <Icon className="w-6 h-6" />
                  </div>

                  <span className="text-[11px] font-mono uppercase tracking-wider text-brand-orange block mb-1 font-semibold">
                    {item.label}
                  </span>

                  <h3 className="font-display uppercase text-xl text-white tracking-wide mb-1 break-all">
                    {item.display}
                  </h3>

                  {item.subtext && (
                    <p className="text-[11px] font-mono text-white/40 mb-3">
                      {item.subtext}
                    </p>
                  )}
                </div>

                <div className="pt-4 mt-4 border-t border-white/10 flex items-center justify-between gap-2">
                  {item.actionHref ? (
                    <a
                      href={item.actionHref}
                      target={item.isExternal ? "_blank" : undefined}
                      rel={item.isExternal ? "noopener noreferrer" : undefined}
                      className="text-xs font-mono uppercase text-brand-orange hover:text-brand-amber inline-flex items-center gap-1 font-medium transition-colors"
                    >
                      <span>{item.actionLabel}</span>
                      <ExternalLink className="w-3.5 h-3.5" />
                    </a>
                  ) : (
                    <span className="text-xs font-mono text-white/50">India</span>
                  )}

                  {item.isCopyable && (
                    <button
                      type="button"
                      onClick={() => copyToClipboard(item.value, item.label)}
                      title={`Copy ${item.label}`}
                      aria-label={`Copy ${item.label}`}
                      className="p-1.5 rounded-lg bg-white/5 hover:bg-white/10 text-white/60 hover:text-white transition-colors"
                    >
                      <Copy className="w-3.5 h-3.5" />
                    </button>
                  )}
                </div>
              </motion.div>
            );
          })}
        </div>
      </div>

      {/* Floating Toast Notification */}
      <AnimatePresence>
        {toastMessage && (
          <motion.div
            initial={{ opacity: 0, y: 20, scale: 0.95 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 20, scale: 0.95 }}
            transition={{ duration: 0.2 }}
            className="fixed bottom-8 left-1/2 -translate-x-1/2 z-50 px-5 py-3 rounded-full bg-brand-orange text-white text-xs font-mono uppercase tracking-wider font-semibold shadow-2xl flex items-center gap-2 select-none"
          >
            <Check className="w-4 h-4 stroke-[3]" />
            <span>{toastMessage}</span>
          </motion.div>
        )}
      </AnimatePresence>
    </section>
  );
}
