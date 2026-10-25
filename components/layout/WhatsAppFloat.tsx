"use client";

import React, { useState } from "react";
import { MessageCircle } from "lucide-react";
import { getWhatsAppUrl } from "@/lib/site";
import { trackEvent } from "@/lib/analytics";

export function WhatsAppFloat() {
  const [isHovered, setIsHovered] = useState(false);
  const waUrl = getWhatsAppUrl();

  return (
    <aside aria-label="Quick contact" className="fixed bottom-6 right-6 z-50">
      <div className="relative flex items-center justify-end">
        {/* Tooltip on desktop hover */}
        <div
          role="status"
          className={`hidden md:block absolute right-16 px-3.5 py-1.5 rounded-full bg-ink-soft text-paper text-xs font-semibold uppercase tracking-wider whitespace-nowrap shadow-lg border border-white/10 transition-all duration-300 pointer-events-none ${
            isHovered
              ? "opacity-100 translate-x-0"
              : "opacity-0 translate-x-2"
          }`}
        >
          Chat with us
        </div>

        {/* 6s gentle pulse ring animation */}
        <div className="absolute inset-0 rounded-full bg-[#25D366] animate-wa-pulse pointer-events-none" />

        {/* Floating WhatsApp Button */}
        <a
          href={waUrl}
          target="_blank"
          rel="noopener noreferrer"
          aria-label="Chat on WhatsApp"
          onClick={() => trackEvent("whatsapp_click", { source: "floating_button" })}
          onMouseEnter={() => setIsHovered(true)}
          onMouseLeave={() => setIsHovered(false)}
          className="relative flex items-center justify-center w-14 h-14 rounded-full bg-[#25D366] text-white shadow-xl hover:scale-105 active:scale-95 transition-transform duration-200 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand-orange focus-visible:ring-offset-2"
        >
          <MessageCircle className="w-7 h-7 fill-white stroke-none" />
        </a>
      </div>
    </aside>
  );
}
