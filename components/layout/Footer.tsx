"use client";

import React from "react";
import Link from "next/link";
import Image from "next/image";
import { Mail, Instagram, MessageCircle, ArrowUpRight } from "lucide-react";
import {
  SITE_TAGLINE,
  CONTACT_EMAIL,
  INSTAGRAM_HANDLE,
  INSTAGRAM_URL,
  FOOTER_LINKS,
  getWhatsAppUrl,
} from "@/lib/site";
import { Button } from "@/components/ui/Button";
import { trackEvent } from "@/lib/analytics";

export function Footer() {
  const currentYear = new Date().getFullYear();
  const waUrl = getWhatsAppUrl();

  return (
    <footer className="relative bg-ink text-paper overflow-hidden pt-20 pb-12 border-t border-white/10">
      {/* Large Faded Background Wordmark */}
      <div
        aria-hidden="true"
        className="pointer-events-none select-none absolute bottom-0 left-1/2 -translate-x-1/2 w-full text-center overflow-hidden opacity-[0.03]"
      >
        <span className="font-display uppercase text-[18vw] leading-none tracking-widest whitespace-nowrap text-white font-black block">
          TECH UP
        </span>
      </div>

      <div className="w-full max-w-content mx-auto px-6 md:px-12 relative z-10">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-12 mb-16">
          {/* Brand Info */}
          <div className="lg:col-span-2 flex flex-col gap-5">
            <Link
              href="/"
              className="inline-flex items-center gap-3.5 group focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand-orange rounded-lg"
              aria-label="TechUp Digital Home"
            >
              <div className="relative w-12 h-12 sm:w-14 sm:h-14 shrink-0 transition-transform duration-300 group-hover:scale-105">
                <Image
                  src="/logos/techup-logo.png"
                  alt="TechUp Digital Logo"
                  fill
                  className="object-contain"
                />
              </div>
              <div className="flex flex-col">
                <span className="font-display uppercase text-2xl tracking-wider text-white leading-none">
                  TECH<span className="text-brand-orange">UP</span>
                </span>
                <span className="text-[10px] font-mono tracking-widest text-white/50 uppercase leading-tight mt-1">
                  DIGITAL
                </span>
              </div>
            </Link>
            <p className="text-muted text-sm max-w-sm font-body">
              {SITE_TAGLINE} — Bringing video editing, branding, and modern web
              presence under one roof for ambitious brands and creators across India.
            </p>
            <div className="pt-2">
              <Button href="/contact" size="sm" withRocketIcon>
                Get a Quote
              </Button>
            </div>
          </div>

          {/* Column: Services */}
          <div>
            <h3 className="font-display text-lg tracking-wider uppercase text-paper mb-4">
              Services
            </h3>
            <ul className="flex flex-col gap-2.5 text-sm text-muted">
              {FOOTER_LINKS.services.map((item) => (
                <li key={item.href}>
                  <Link
                    href={item.href}
                    className="hover:text-brand-orange transition-colors"
                  >
                    {item.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Column: Company */}
          <div>
            <h3 className="font-display text-lg tracking-wider uppercase text-paper mb-4">
              Company
            </h3>
            <ul className="flex flex-col gap-2.5 text-sm text-muted">
              {FOOTER_LINKS.company.map((item) => (
                <li key={item.href}>
                  <Link
                    href={item.href}
                    className="hover:text-brand-orange transition-colors"
                  >
                    {item.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Column: Connect */}
          <div>
            <h3 className="font-display text-lg tracking-wider uppercase text-paper mb-4">
              Connect
            </h3>
            <ul className="flex flex-col gap-3 text-sm text-muted">
              <li>
                <a
                  href={`mailto:${CONTACT_EMAIL}`}
                  className="flex items-center gap-2 hover:text-brand-orange transition-colors"
                >
                  <Mail className="w-4 h-4 text-brand-orange shrink-0" />
                  <span className="truncate">{CONTACT_EMAIL}</span>
                </a>
              </li>
              <li>
                <a
                  href={waUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  onClick={() => trackEvent("whatsapp_click", { source: "footer" })}
                  className="flex items-center gap-2 hover:text-brand-orange transition-colors"
                >
                  <MessageCircle className="w-4 h-4 text-[#25D366] shrink-0" />
                  <span>WhatsApp Chat</span>
                  <ArrowUpRight className="w-3.5 h-3.5 opacity-60" />
                </a>
              </li>
              <li>
                <a
                  href={INSTAGRAM_URL}
                  target="_blank"
                  rel="noopener noreferrer"
                  onClick={() => trackEvent("instagram_click", { source: "footer" })}
                  className="flex items-center gap-2 hover:text-brand-orange transition-colors"
                >
                  <Instagram className="w-4 h-4 text-brand-amber shrink-0" />
                  <span>{INSTAGRAM_HANDLE}</span>
                  <ArrowUpRight className="w-3.5 h-3.5 opacity-60" />
                </a>
              </li>
            </ul>
          </div>
        </div>

        {/* Bottom bar */}
        <div className="pt-8 border-t border-white/10 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-muted">
          <p>© {currentYear} TechUP Digital. All rights reserved.</p>
          <div className="flex items-center gap-6">
            {FOOTER_LINKS.legal.map((item) => (
              <Link
                key={item.href}
                href={item.href}
                className="hover:text-paper transition-colors"
              >
                {item.label}
              </Link>
            ))}
          </div>
        </div>
      </div>
    </footer>
  );
}
