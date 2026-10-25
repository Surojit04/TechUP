"use client";

import React, { useState, useEffect } from "react";
import { useSearchParams } from "next/navigation";
import { motion } from "framer-motion";
import { Check, Sparkles, AlertCircle, MessageCircle, ArrowUpRight } from "lucide-react";
import {
  getWhatsAppUrl,
  buildWhatsAppContactMessage,
  PHONE_DISPLAY,
} from "@/lib/site";
import { trackEvent } from "@/lib/analytics";

// Actual services offered by TechUp Digital
const SERVICE_OPTIONS = [
  "Content & Video",
  "Branding & Design",
  "Web & Digital Presence",
  "Growth Support",
  "Full-Stack Partnership",
] as const;

// Sensible agency budget tiers
const BUDGET_OPTIONS = [
  "Under ₹25,000",
  "₹25,000 – ₹50,000",
  "₹50,000 – ₹1,00,000",
  "₹1,00,000+",
  "Not sure yet",
] as const;

export function QuoteForm() {
  const searchParams = useSearchParams();

  // Form Field State
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [company, setCompany] = useState("");
  const [phone, setPhone] = useState("");
  const [services, setServices] = useState<string[]>([]);
  const [budget, setBudget] = useState<string>("Not sure yet");
  const [details, setDetails] = useState("");
  const [honeypot, setHoneypot] = useState("");

  // UI state
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [whatsappUrl, setWhatsappUrl] = useState<string | null>(null);

  // Pre-select service from URL query param ?service=...
  useEffect(() => {
    const serviceParam = searchParams.get("service")?.toLowerCase();
    if (!serviceParam) return;

    if (
      serviceParam.includes("video") ||
      serviceParam.includes("content") ||
      serviceParam.includes("reel")
    ) {
      setServices((prev) =>
        prev.includes("Content & Video") ? prev : [...prev, "Content & Video"]
      );
    } else if (
      serviceParam.includes("brand") ||
      serviceParam.includes("design") ||
      serviceParam.includes("logo")
    ) {
      setServices((prev) =>
        prev.includes("Branding & Design") ? prev : [...prev, "Branding & Design"]
      );
    } else if (
      serviceParam.includes("web") ||
      serviceParam.includes("site")
    ) {
      setServices((prev) =>
        prev.includes("Web & Digital Presence")
          ? prev
          : [...prev, "Web & Digital Presence"]
      );
    } else if (serviceParam.includes("growth")) {
      setServices((prev) =>
        prev.includes("Growth Support") ? prev : [...prev, "Growth Support"]
      );
    }
  }, [searchParams]);

  // Toggle service selection chip
  const toggleService = (srv: string) => {
    setServices((prev) =>
      prev.includes(srv) ? prev.filter((s) => s !== srv) : [...prev, srv]
    );
    if (errors.services) {
      setErrors((prev) => {
        const next = { ...prev };
        delete next.services;
        return next;
      });
    }
  };

  // Client validation
  const validateClient = (): boolean => {
    const errs: Record<string, string> = {};

    if (!name.trim() || name.trim().length < 2) {
      errs.name = "Please enter your full name (at least 2 characters).";
    }

    if (!email.trim() || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email.trim())) {
      errs.email = "Please enter a valid work email address.";
    }

    if (services.length === 0) {
      errs.services = "Please choose at least one service category.";
    }

    if (!details.trim() || details.trim().length < 10) {
      errs.details =
        "Please share a few sentences about your requirements (at least 10 characters).";
    }

    setErrors(errs);
    return Object.keys(errs).length === 0;
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    // Honeypot spam deterrence: silently drop automated bots
    if (honeypot && honeypot.length > 0) {
      return;
    }

    if (!validateClient()) {
      return;
    }

    // Format the submitted information into a clear, professional WhatsApp message
    const message = buildWhatsAppContactMessage({
      name,
      email,
      company: company.trim() || undefined,
      phone: phone.trim() || undefined,
      services,
      budget: budget.trim() || undefined,
      details,
    });

    const url = getWhatsAppUrl(message);
    setWhatsappUrl(url);

    trackEvent("quote_submit", {
      channel: "whatsapp",
      services: services.join(", "),
      hasCompany: Boolean(company.trim()),
      hasPhone: Boolean(phone.trim()),
      budget,
    });

    // Open WhatsApp in a new tab without disrupting current form view
    try {
      const link = document.createElement("a");
      link.href = url;
      link.target = "_blank";
      link.rel = "noopener noreferrer";
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
    } catch {
      window.open(url, "_blank", "noopener,noreferrer");
    }
  };

  return (
    <div
      id="project-inquiry-form"
      className="relative rounded-3xl bg-ink-soft/90 backdrop-blur-xl border border-white/10 shadow-2xl p-6 sm:p-8 md:p-10 text-white overflow-hidden"
    >
      {/* Soft internal gradient lighting */}
      <div className="absolute top-0 right-0 w-80 h-80 bg-brand-orange/10 rounded-full blur-3xl pointer-events-none" />

      {/* Form Card Header */}
      <div className="relative z-10 mb-8 border-b border-white/10 pb-6">
        <div className="flex items-center justify-between gap-4 mb-2">
          <span className="font-mono text-xs uppercase tracking-widest text-brand-orange font-semibold">
            {"// PROJECT INQUIRY"}
          </span>
          <span className="text-[11px] font-mono uppercase text-white/40">
            Step 1 of 1
          </span>
        </div>
        <h2 className="font-display uppercase text-2xl sm:text-3xl text-white tracking-wide">
          Start Your Project Brief
        </h2>
        <p className="font-body text-xs sm:text-sm text-white/60 mt-1">
          Provide your project requirements below. Clicking submit opens WhatsApp with your prefilled brief.
        </p>
      </div>

      <form onSubmit={handleSubmit} noValidate className="relative z-10 space-y-6">
        {/* Honeypot for spam deterrence */}
        <input
          type="text"
          name="website_hp"
          value={honeypot}
          onChange={(e) => setHoneypot(e.target.value)}
          className="hidden"
          tabIndex={-1}
          autoComplete="off"
          aria-hidden="true"
        />

        {/* WhatsApp Ready Status Banner */}
        {whatsappUrl && (
          <motion.div
            initial={{ opacity: 0, y: -6 }}
            animate={{ opacity: 1, y: 0 }}
            role="status"
            aria-live="polite"
            className="p-4 sm:p-5 rounded-2xl bg-brand-orange/10 border border-brand-orange/30 text-white space-y-2"
          >
            <div className="flex items-center gap-2 font-mono text-xs uppercase tracking-wider text-brand-orange font-semibold">
              <MessageCircle className="w-4 h-4 shrink-0" />
              <span>WhatsApp Conversation Ready</span>
            </div>
            <p className="text-white/80 text-xs sm:text-sm leading-relaxed">
              Your project inquiry has been formatted. Please review and click{" "}
              <strong>Send</strong> in WhatsApp to deliver your brief directly to our team.
            </p>
            <div className="pt-1 flex flex-wrap items-center gap-3 text-xs font-mono">
              <a
                href={whatsappUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-1.5 underline font-semibold text-brand-orange hover:text-brand-amber transition-colors"
              >
                <span>Open WhatsApp directly</span>
                <ArrowUpRight className="w-3.5 h-3.5" />
              </a>
              <span className="text-white/30">•</span>
              <span className="text-white/50">Destination: +91 98317 10140</span>
            </div>
          </motion.div>
        )}

        {/* Row 1: Name & Work Email */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
          {/* Full Name */}
          <div>
            <label
              htmlFor="inquiry-name"
              className="block text-xs font-mono uppercase tracking-wider text-white/80 font-semibold mb-2"
            >
              Full Name <span className="text-brand-orange" aria-hidden="true">*</span>
            </label>
            <input
              id="inquiry-name"
              type="text"
              required
              placeholder="e.g. Alex Morgan"
              value={name}
              onChange={(e) => {
                setName(e.target.value);
                if (errors.name) {
                  setErrors((prev) => {
                    const next = { ...prev };
                    delete next.name;
                    return next;
                  });
                }
              }}
              aria-invalid={Boolean(errors.name)}
              aria-describedby={errors.name ? "name-error" : undefined}
              className={`w-full px-4 py-3 rounded-xl bg-ink/80 border text-white text-sm placeholder-white/30 transition-all focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand-orange ${
                errors.name
                  ? "border-red-500 ring-1 ring-red-500/40"
                  : "border-white/15 focus:border-brand-orange"
              }`}
            />
            {errors.name && (
              <p
                id="name-error"
                className="mt-1.5 text-xs text-red-400 flex items-center gap-1 font-mono"
              >
                <AlertCircle className="w-3.5 h-3.5 shrink-0" />
                <span>{errors.name}</span>
              </p>
            )}
          </div>

          {/* Work Email */}
          <div>
            <label
              htmlFor="inquiry-email"
              className="block text-xs font-mono uppercase tracking-wider text-white/80 font-semibold mb-2"
            >
              Work Email <span className="text-brand-orange" aria-hidden="true">*</span>
            </label>
            <input
              id="inquiry-email"
              type="email"
              required
              placeholder="name@company.com"
              value={email}
              onChange={(e) => {
                setEmail(e.target.value);
                if (errors.email) {
                  setErrors((prev) => {
                    const next = { ...prev };
                    delete next.email;
                    return next;
                  });
                }
              }}
              aria-invalid={Boolean(errors.email)}
              aria-describedby={errors.email ? "email-error" : undefined}
              className={`w-full px-4 py-3 rounded-xl bg-ink/80 border text-white text-sm placeholder-white/30 transition-all focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand-orange ${
                errors.email
                  ? "border-red-500 ring-1 ring-red-500/40"
                  : "border-white/15 focus:border-brand-orange"
              }`}
            />
            {errors.email && (
              <p
                id="email-error"
                className="mt-1.5 text-xs text-red-400 flex items-center gap-1 font-mono"
              >
                <AlertCircle className="w-3.5 h-3.5 shrink-0" />
                <span>{errors.email}</span>
              </p>
            )}
          </div>
        </div>

        {/* Row 2: Company & Phone/WhatsApp (Optional) */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
          {/* Company / Brand */}
          <div>
            <label
              htmlFor="inquiry-company"
              className="block text-xs font-mono uppercase tracking-wider text-white/80 font-semibold mb-2"
            >
              Company / Brand <span className="text-white/40 font-normal lowercase">(optional)</span>
            </label>
            <input
              id="inquiry-company"
              type="text"
              placeholder="e.g. Acme Studio"
              value={company}
              onChange={(e) => setCompany(e.target.value)}
              className="w-full px-4 py-3 rounded-xl bg-ink/80 border border-white/15 text-white text-sm placeholder-white/30 transition-all focus:border-brand-orange focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand-orange"
            />
          </div>

          {/* Phone / WhatsApp */}
          <div>
            <label
              htmlFor="inquiry-phone"
              className="block text-xs font-mono uppercase tracking-wider text-white/80 font-semibold mb-2"
            >
              Phone / WhatsApp <span className="text-white/40 font-normal lowercase">(optional)</span>
            </label>
            <input
              id="inquiry-phone"
              type="tel"
              placeholder={PHONE_DISPLAY}
              value={phone}
              onChange={(e) => setPhone(e.target.value)}
              className="w-full px-4 py-3 rounded-xl bg-ink/80 border border-white/15 text-white text-sm placeholder-white/30 transition-all focus:border-brand-orange focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand-orange"
            />
          </div>
        </div>

        {/* Row 3: Service Interested In (Interactive Selection Chips) */}
        <div>
          <div className="flex items-center justify-between mb-2.5">
            <label className="block text-xs font-mono uppercase tracking-wider text-white/80 font-semibold">
              Service Interested In <span className="text-brand-orange" aria-hidden="true">*</span>
            </label>
            <span className="text-[11px] font-mono text-white/40">Select all that apply</span>
          </div>

          <div
            role="group"
            aria-label="Services selection"
            className="flex flex-wrap gap-2.5"
          >
            {SERVICE_OPTIONS.map((srv) => {
              const isSelected = services.includes(srv);
              return (
                <button
                  key={srv}
                  type="button"
                  onClick={() => toggleService(srv)}
                  aria-pressed={isSelected}
                  className={`inline-flex items-center gap-2 px-3.5 py-2 rounded-xl text-xs font-medium font-body transition-all duration-200 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand-orange ${
                    isSelected
                      ? "bg-brand-orange text-white border border-brand-orange shadow-md shadow-brand-orange/20"
                      : "bg-ink/80 text-white/70 border border-white/15 hover:border-brand-orange/40 hover:text-white"
                  }`}
                >
                  <span
                    className={`w-3.5 h-3.5 rounded flex items-center justify-center transition-colors ${
                      isSelected
                        ? "bg-white text-brand-orange"
                        : "border border-white/30"
                    }`}
                  >
                    {isSelected && <Check className="w-2.5 h-2.5 stroke-[3]" />}
                  </span>
                  <span>{srv}</span>
                </button>
              );
            })}
          </div>
          {errors.services && (
            <p className="mt-1.5 text-xs text-red-400 flex items-center gap-1 font-mono">
              <AlertCircle className="w-3.5 h-3.5 shrink-0" />
              <span>{errors.services}</span>
            </p>
          )}
        </div>

        {/* Row 4: Estimated Budget (Sensible Ranges) */}
        <div>
          <div className="flex items-center justify-between mb-2.5">
            <label className="block text-xs font-mono uppercase tracking-wider text-white/80 font-semibold">
              Estimated Budget <span className="text-white/40 font-normal lowercase">(optional)</span>
            </label>
            <span className="text-[11px] font-mono text-white/40">Helps calibrate scope</span>
          </div>

          <div
            role="radiogroup"
            aria-label="Estimated budget range"
            className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-5 gap-2"
          >
            {BUDGET_OPTIONS.map((b) => {
              const isSelected = budget === b;
              return (
                <button
                  key={b}
                  type="button"
                  role="radio"
                  aria-checked={isSelected}
                  onClick={() => setBudget(b)}
                  className={`px-3 py-2 rounded-xl text-xs font-medium font-body text-center transition-all duration-200 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand-orange ${
                    isSelected
                      ? "bg-white/15 border border-brand-orange text-brand-orange font-semibold shadow-sm"
                      : "bg-ink/80 text-white/60 border border-white/10 hover:border-white/25 hover:text-white"
                  }`}
                >
                  {b}
                </button>
              );
            })}
          </div>
        </div>

        {/* Row 5: Project Details */}
        <div>
          <div className="flex items-center justify-between mb-2">
            <label
              htmlFor="inquiry-details"
              className="block text-xs font-mono uppercase tracking-wider text-white/80 font-semibold"
            >
              Project Details <span className="text-brand-orange" aria-hidden="true">*</span>
            </label>
            <span className="text-[11px] font-mono text-white/40">
              {details.length} chars
            </span>
          </div>
          <textarea
            id="inquiry-details"
            required
            rows={4}
            placeholder="Tell us what you are building, your primary goals, desired deliverables, target timeline, or any reference links..."
            value={details}
            onChange={(e) => {
              setDetails(e.target.value);
              if (errors.details) {
                setErrors((prev) => {
                  const next = { ...prev };
                  delete next.details;
                  return next;
                });
              }
            }}
            aria-invalid={Boolean(errors.details)}
            aria-describedby={errors.details ? "details-error" : undefined}
            className={`w-full px-4 py-3 rounded-xl bg-ink/80 border text-white text-sm placeholder-white/30 transition-all resize-y focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand-orange ${
              errors.details
                ? "border-red-500 ring-1 ring-red-500/40"
                : "border-white/15 focus:border-brand-orange"
            }`}
          />
          {errors.details && (
            <p
              id="details-error"
              className="mt-1.5 text-xs text-red-400 flex items-center gap-1 font-mono"
            >
              <AlertCircle className="w-3.5 h-3.5 shrink-0" />
              <span>{errors.details}</span>
            </p>
          )}
        </div>

        {/* Submit Button */}
        <div className="pt-2">
          <button
            type="submit"
            className="group relative inline-flex items-center justify-center gap-2.5 w-full px-8 py-4 rounded-full bg-gradient-to-r from-brand-orange via-[#FF6D2C] to-brand-amber text-white font-semibold text-sm uppercase tracking-wider shadow-lg shadow-brand-orange/25 hover:shadow-brand-orange/40 hover:brightness-110 active:scale-[0.99] transition-all duration-300 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand-orange focus-visible:ring-offset-2 focus-visible:ring-offset-ink"
          >
            <span>{whatsappUrl ? "Reopen Inquiry in WhatsApp" : "Send Inquiry via WhatsApp"}</span>
            <MessageCircle className="w-4 h-4 transition-transform duration-300 group-hover:scale-110" />
          </button>

          <div className="mt-3 flex items-center justify-center gap-2 text-[11px] font-mono text-white/40">
            <Sparkles className="w-3 h-3 text-brand-orange" />
            <span>Direct to +91 98317 10140 • Opens WhatsApp with your prefilled brief</span>
          </div>
        </div>
      </form>
    </div>
  );
}
