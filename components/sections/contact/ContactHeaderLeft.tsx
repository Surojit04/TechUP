"use client";

import React, { useState } from "react";
import { motion, useReducedMotion } from "framer-motion";
import { Mail, MessageCircle, Instagram, MapPin, Copy, Check, Sparkles, ShieldCheck, Zap, Layers } from "lucide-react";
import { CONTACT_EMAIL, PHONE_DISPLAY, INSTAGRAM_HANDLE, INSTAGRAM_URL, LOCATION, getWhatsAppUrl } from "@/lib/site";

export function ContactHeaderLeft() {
  const [copiedField, setCopiedField] = useState<string | null>(null);
  const prefersReduced = useReducedMotion();

  const handleCopy = (text: string, field: string) => {
    if (typeof navigator !== "undefined" && navigator.clipboard) {
      navigator.clipboard.writeText(text);
      setCopiedField(field);
      setTimeout(() => setCopiedField(null), 2200);
    }
  };

  const waUrl = getWhatsAppUrl(
    "Hi TechUP Digital, I'm reaching out from your website to discuss a new project."
  );

  return (
    <div className="flex flex-col justify-between h-full space-y-10">
      {/* 1. Header Typography */}
      <div className="space-y-6">
        {/* Availability status badge */}
        <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-white/[0.04] border border-white/10 backdrop-blur-md">
          <span className="w-2 h-2 rounded-full bg-brand-orange animate-pulse shadow-sm shadow-brand-orange" />
          <span className="font-mono text-[11px] uppercase tracking-widest text-brand-orange font-semibold">
            {"//"} Accepting New Client Inquiries
          </span>
        </div>

        {/* Display Headline */}
        <h1 className="font-display uppercase text-4xl sm:text-5xl lg:text-6xl tracking-tight leading-[1.04] text-white">
          Have a Project in Mind?{" "}
          <span className="text-transparent bg-clip-text bg-gradient-to-r from-brand-orange via-[#FF6D2C] to-brand-amber block sm:inline">
            Let’s Make It Happen.
          </span>
        </h1>

        {/* Supporting Subtitle */}
        <p className="font-body text-base sm:text-lg text-white/70 leading-relaxed max-w-xl">
          Tell us what you’re building. Let’s explore how TechUp Digital can help turn your ideas into meaningful digital experiences.
        </p>

        {/* How TechUp Digital Helps */}
        <div className="p-5 sm:p-6 rounded-2xl bg-ink-soft/70 border border-white/10 backdrop-blur-sm relative overflow-hidden">
          <div className="absolute top-0 left-0 w-1 h-full bg-gradient-to-b from-brand-orange to-brand-amber" />
          <div className="flex items-center gap-2.5 mb-2.5">
            <Sparkles className="w-4 h-4 text-brand-orange shrink-0" />
            <h2 className="font-display uppercase text-sm tracking-wider text-white font-semibold">
              How TechUp Digital Can Help
            </h2>
          </div>
          <p className="font-body text-xs sm:text-sm text-white/65 leading-relaxed">
            From high-retention video content and distinctive brand identities to fast, conversion-focused websites and ongoing digital growth support—we partner directly with ambitious founders, creators, and brands with founder-led accountability and guaranteed craft.
          </p>
        </div>
      </div>

      {/* 2. Distinctive Brand Agency Visual */}
      <div className="relative p-6 rounded-3xl bg-gradient-to-br from-white/[0.04] via-ink-soft/80 to-ink-soft/40 border border-white/10 overflow-hidden">
        {/* Ambient background glow */}
        <div className="absolute -top-12 -right-12 w-48 h-48 bg-brand-orange/15 rounded-full blur-3xl pointer-events-none" />

        <div className="relative z-10 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 mb-4">
          <div>
            <span className="font-mono text-[10px] uppercase tracking-widest text-brand-orange font-bold block mb-1">
              TECHUP PARTNERSHIP STANDARDS
            </span>
            <span className="text-sm font-display uppercase tracking-wide text-white">
              The Agency Advantage
            </span>
          </div>

          <div className="flex items-center gap-1.5 px-3 py-1 rounded-full bg-brand-orange/10 border border-brand-orange/20 text-brand-orange text-xs font-mono">
            <ShieldCheck className="w-3.5 h-3.5" />
            <span>Verified Delivery</span>
          </div>
        </div>

        {/* 3 Pillars micro-badges */}
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-2.5 pt-2">
          <div className="flex items-center gap-2 p-2.5 rounded-xl bg-ink/70 border border-white/5">
            <Zap className="w-3.5 h-3.5 text-brand-orange shrink-0" />
            <span className="text-xs font-body text-white/80">Founder-Led</span>
          </div>
          <div className="flex items-center gap-2 p-2.5 rounded-xl bg-ink/70 border border-white/5">
            <Layers className="w-3.5 h-3.5 text-brand-amber shrink-0" />
            <span className="text-xs font-body text-white/80">Single Team</span>
          </div>
          <div className="flex items-center gap-2 p-2.5 rounded-xl bg-ink/70 border border-white/5">
            <Sparkles className="w-3.5 h-3.5 text-brand-orange shrink-0" />
            <span className="text-xs font-body text-white/80">Direct Comms</span>
          </div>
        </div>
      </div>

      {/* 3. Verified Direct Contact Channels */}
      <div className="space-y-3 pt-2">
        <span className="font-mono text-xs uppercase tracking-widest text-white/40 font-semibold block">
          DIRECT COMMUNICATION CHANNELS
        </span>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
          {/* Email Card */}
          <div className="group relative p-4 rounded-2xl bg-ink-soft/80 border border-white/10 hover:border-brand-orange/40 transition-all flex items-center justify-between gap-3">
            <a
              href={`mailto:${CONTACT_EMAIL}`}
              className="flex items-center gap-3 min-w-0 flex-1 focus-visible:outline-none"
              aria-label={`Email TechUp Digital at ${CONTACT_EMAIL}`}
            >
              <div className="w-9 h-9 rounded-xl bg-brand-orange/10 border border-brand-orange/20 flex items-center justify-center text-brand-orange shrink-0 group-hover:bg-brand-orange group-hover:text-white transition-colors">
                <Mail className="w-4 h-4" />
              </div>
              <div className="min-w-0">
                <span className="text-[10px] font-mono uppercase tracking-wider text-white/40 block">
                  Email
                </span>
                <span className="text-xs font-medium text-white truncate block group-hover:text-brand-orange transition-colors">
                  {CONTACT_EMAIL}
                </span>
              </div>
            </a>
            <button
              type="button"
              onClick={() => handleCopy(CONTACT_EMAIL, "email")}
              className="p-1.5 rounded-lg text-white/40 hover:text-white hover:bg-white/5 transition-colors focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-brand-orange"
              aria-label="Copy email address"
              title="Copy email address"
            >
              {copiedField === "email" ? (
                <Check className="w-3.5 h-3.5 text-green-400" />
              ) : (
                <Copy className="w-3.5 h-3.5" />
              )}
            </button>
          </div>

          {/* WhatsApp Direct Card */}
          <a
            href={waUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="group relative p-4 rounded-2xl bg-ink-soft/80 border border-white/10 hover:border-brand-orange/40 transition-all flex items-center justify-between gap-3 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand-orange"
            aria-label="Chat directly on WhatsApp"
          >
            <div className="flex items-center gap-3 min-w-0 flex-1">
              <div className="w-9 h-9 rounded-xl bg-brand-orange/10 border border-brand-orange/20 flex items-center justify-center text-brand-orange shrink-0 group-hover:bg-brand-orange group-hover:text-white transition-colors">
                <MessageCircle className="w-4 h-4" />
              </div>
              <div className="min-w-0">
                <span className="text-[10px] font-mono uppercase tracking-wider text-white/40 block">
                  WhatsApp Direct
                </span>
                <span className="text-xs font-medium text-white truncate block group-hover:text-brand-orange transition-colors">
                  {PHONE_DISPLAY}
                </span>
              </div>
            </div>
            <span className="text-[10px] font-mono uppercase px-2 py-0.5 rounded bg-white/5 text-brand-orange group-hover:bg-brand-orange group-hover:text-white transition-colors">
              Chat
            </span>
          </a>

          {/* Instagram Card */}
          <a
            href={INSTAGRAM_URL}
            target="_blank"
            rel="noopener noreferrer"
            className="group relative p-4 rounded-2xl bg-ink-soft/80 border border-white/10 hover:border-brand-orange/40 transition-all flex items-center justify-between gap-3 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand-orange"
            aria-label="Follow TechUp Digital on Instagram"
          >
            <div className="flex items-center gap-3 min-w-0 flex-1">
              <div className="w-9 h-9 rounded-xl bg-white/5 border border-white/10 flex items-center justify-center text-white/70 shrink-0 group-hover:bg-brand-orange group-hover:text-white group-hover:border-brand-orange transition-colors">
                <Instagram className="w-4 h-4" />
              </div>
              <div className="min-w-0">
                <span className="text-[10px] font-mono uppercase tracking-wider text-white/40 block">
                  Instagram
                </span>
                <span className="text-xs font-medium text-white truncate block group-hover:text-brand-orange transition-colors">
                  {INSTAGRAM_HANDLE}
                </span>
              </div>
            </div>
          </a>

          {/* Location Card */}
          <div className="p-4 rounded-2xl bg-ink-soft/80 border border-white/10 flex items-center gap-3">
            <div className="w-9 h-9 rounded-xl bg-white/5 border border-white/10 flex items-center justify-center text-white/70 shrink-0">
              <MapPin className="w-4 h-4 text-brand-orange" />
            </div>
            <div className="min-w-0">
              <span className="text-[10px] font-mono uppercase tracking-wider text-white/40 block">
                Headquarters
              </span>
              <span className="text-xs font-medium text-white truncate block">
                {LOCATION}
              </span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
