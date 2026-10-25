import { Metadata } from "next";
import Link from "next/link";
import { ArrowLeft, Sparkles, CheckCircle2 } from "lucide-react";
import { Button } from "@/components/ui/Button";
import { Card } from "@/components/ui/Card";
import { Badge } from "@/components/ui/Badge";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { Marquee } from "@/components/ui/Marquee";
import { Counter } from "@/components/ui/Counter";
import { Accordion } from "@/components/ui/Accordion";
import { ChevronDivider } from "@/components/ui/ChevronDivider";
import { CTABand } from "@/components/sections/CTABand";

export const metadata: Metadata = {
  title: "Dev: Shared Components Review | TechUP Digital",
  description:
    "Internal development showcase for reviewing all Phase 2 shared components in dark and light contexts.",
  robots: {
    index: false,
    follow: false,
  },
};

const sampleFaqDark = [
  {
    id: "dark-faq-1",
    question: "How do monthly retainers work at TechUP?",
    answer:
      "We agree on a set volume of deliverables each month (e.g., reels, carousels, and landing page updates) with a fixed workflow and turnaround guarantee.",
  },
  {
    id: "dark-faq-2",
    question: "Do you handle both editing and brand strategy?",
    answer:
      "Yes, our team brings video editing, visual design, and web development together under one roof with a single point of communication.",
  },
];

const sampleFaqLight = [
  {
    id: "light-faq-1",
    question: "What is your typical turnaround time for a project?",
    answer:
      "Reels are delivered within 48 to 72 hours. Complete brand identities and business websites typically take 2 to 4 weeks depending on scope.",
  },
  {
    id: "light-faq-2",
    question: "Can we request revisions on creative assets?",
    answer:
      "Every project includes structured review rounds to ensure typography, pacing, color grading, and messaging meet your brand standard.",
  },
];

const clientLogoPlaceholders = [
  "[CLIENT LOGO 01]",
  "[CLIENT LOGO 02]",
  "[CLIENT LOGO 03]",
  "[CLIENT LOGO 04]",
  "[CLIENT LOGO 05]",
  "[CLIENT LOGO 06]",
  "[CLIENT LOGO 07]",
  "[CLIENT LOGO 08]",
];

export default function DevComponentsPage() {
  return (
    <div className="min-h-screen pt-28 pb-16">
      {/* Dev Header Banner */}
      <div className="bg-ink-soft border-b border-white/10 py-6 mb-12">
        <div className="max-w-content mx-auto px-6 md:px-12 flex flex-col md:flex-row md:items-center justify-between gap-4">
          <div>
            <div className="flex items-center gap-3 mb-2">
              <Badge variant="orange" size="sm">
                Phase 2
              </Badge>
              <span className="text-xs font-mono text-muted uppercase tracking-wider">
                Dev Component Catalog
              </span>
            </div>
            <h1 className="font-display uppercase text-3xl md:text-5xl text-paper tracking-wide">
              Shared UI Components Showcase
            </h1>
          </div>
          <Link
            href="/"
            className="inline-flex items-center gap-2 text-xs font-mono uppercase tracking-wider text-brand-orange hover:underline focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand-orange rounded"
          >
            <ArrowLeft className="w-4 h-4" />
            Back to Home
          </Link>
        </div>
      </div>

      {/* ========================================================= */}
      {/* 1. DARK SECTION SHOWCASE */}
      {/* ========================================================= */}
      <section className="bg-ink text-paper py-16 md:py-24 relative overflow-hidden">
        <div className="max-w-content mx-auto px-6 md:px-12">
          {/* Section Heading: Dark Center */}
          <SectionHeading
            eyebrow="Dark Theme Review"
            title="CORE UI COMPONENTS ON INK (#0B0B0F)"
            subtitle="Testing buttons, cards, badges, headings, counters, and accordions on dark backgrounds."
            align="center"
            theme="dark"
          />

          {/* 1.1 BUTTONS (Dark) */}
          <div className="mb-20">
            <h3 className="font-display uppercase text-2xl text-brand-orange tracking-wider mb-6 pb-2 border-b border-white/10">
              01. Buttons (Magnetic Hover + Rocket Slide)
            </h3>
            <div className="flex flex-wrap items-center gap-6 p-8 rounded-2xl bg-ink-soft border border-white/10 mb-4">
              <div>
                <span className="text-xs font-mono text-muted block mb-2">
                  Primary Pill (size=&quot;lg&quot;)
                </span>
                <Button variant="primary" size="lg" withRocketIcon>
                  Get a Quote
                </Button>
              </div>

              <div>
                <span className="text-xs font-mono text-muted block mb-2">
                  Primary Pill (size=&quot;md&quot;)
                </span>
                <Button variant="primary" size="md" withRocketIcon>
                  Start Project
                </Button>
              </div>

              <div>
                <span className="text-xs font-mono text-muted block mb-2">
                  Primary Pill (size=&quot;sm&quot;)
                </span>
                <Button variant="primary" size="sm" withRocketIcon>
                  Explore
                </Button>
              </div>

              <div>
                <span className="text-xs font-mono text-muted block mb-2">
                  Secondary Outline (Dark)
                </span>
                <Button variant="secondary" size="md" theme="dark">
                  View Our Work
                </Button>
              </div>

              <div>
                <span className="text-xs font-mono text-muted block mb-2">
                  Ghost Button
                </span>
                <Button variant="ghost" size="md" theme="dark">
                  Learn More
                </Button>
              </div>
            </div>
            <p className="text-xs font-mono text-muted">
              Note: Hover near buttons within 80px to test the magnetic pull (max 12px) and rocket icon slide.
            </p>
          </div>

          {/* 1.2 CARDS (Dark) */}
          <div className="mb-20">
            <h3 className="font-display uppercase text-2xl text-brand-orange tracking-wider mb-6 pb-2 border-b border-white/10">
              02. Cards (8px Lift + Glow + Animated Conic Border + 3D Tilt)
            </h3>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              <Card theme="dark" animatedBorder tilt>
                <div className="flex items-center justify-between mb-4">
                  <Badge variant="orange" size="sm">
                    Reels & Video
                  </Badge>
                  <Sparkles className="w-5 h-5 text-brand-orange" />
                </div>
                <h4 className="font-display uppercase text-2xl text-paper mb-2">
                  Card with 3D Tilt
                </h4>
                <p className="font-body text-sm text-muted mb-6 leading-relaxed">
                  Hover to test 8px upward lift, soft brand-glow shadow, rotating conic-gradient border, and mouse-follow 3D tilt.
                </p>
                <Button href="/services" size="sm" withRocketIcon>
                  Learn More
                </Button>
              </Card>

              <Card theme="dark" animatedBorder tilt={false}>
                <div className="flex items-center justify-between mb-4">
                  <Badge variant="dark" size="sm">
                    Branding
                  </Badge>
                  <CheckCircle2 className="w-5 h-5 text-brand-amber" />
                </div>
                <h4 className="font-display uppercase text-2xl text-paper mb-2">
                  Standard Flat Card
                </h4>
                <p className="font-body text-sm text-muted mb-6 leading-relaxed">
                  Smooth 8px lift and glowing conic border without 3D tilt, optimized for pure readability.
                </p>
                <span className="text-xs font-mono text-brand-orange uppercase tracking-wider font-semibold">
                  Hover to inspect border glow →
                </span>
              </Card>

              <Card theme="dark" animatedBorder tilt>
                <div className="flex items-center justify-between mb-4">
                  <Badge variant="outline" size="sm">
                    Web Presence
                  </Badge>
                  <span className="text-xs font-mono text-muted">03</span>
                </div>
                <h4 className="font-display uppercase text-2xl text-paper mb-2">
                  Retainer Model
                </h4>
                <p className="font-body text-sm text-muted mb-6 leading-relaxed">
                  Consistent digital output every month with structured review rounds and founder accountability.
                </p>
                <Button variant="secondary" size="sm" theme="dark">
                  View Scope
                </Button>
              </Card>
            </div>
          </div>

          {/* 1.3 BADGES (Dark) */}
          <div className="mb-20">
            <h3 className="font-display uppercase text-2xl text-brand-orange tracking-wider mb-6 pb-2 border-b border-white/10">
              03. Badges
            </h3>
            <div className="flex flex-wrap items-center gap-4 p-6 rounded-2xl bg-ink-soft border border-white/10">
              <Badge variant="orange" size="md">
                Video Editing
              </Badge>
              <Badge variant="orange" size="sm">
                Short-form
              </Badge>
              <Badge variant="dark" size="md">
                Branding & Design
              </Badge>
              <Badge variant="outline" size="md">
                Web & Digital
              </Badge>
              <Badge variant="light" size="md">
                Growth Support
              </Badge>
            </div>
          </div>

          {/* 1.4 COUNTER (Dark) */}
          <div className="mb-20">
            <h3 className="font-display uppercase text-2xl text-brand-orange tracking-wider mb-6 pb-2 border-b border-white/10">
              04. Counters (Counts Once in View)
            </h3>
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-6 p-8 rounded-2xl bg-ink-soft border border-white/10 text-center">
              <div>
                <div className="font-display text-4xl sm:text-6xl text-brand-orange tracking-wide">
                  <Counter value="100%" duration={1.6} />
                </div>
                <p className="text-xs font-mono uppercase tracking-wider text-muted mt-2">
                  Commitment
                </p>
              </div>

              <div>
                <div className="font-display text-4xl sm:text-6xl text-paper tracking-wide">
                  <Counter value="24h" duration={1.6} />
                </div>
                <p className="text-xs font-mono uppercase tracking-wider text-muted mt-2">
                  Fast Turnaround
                </p>
              </div>

              <div>
                <div className="font-display text-4xl sm:text-6xl text-brand-amber tracking-wide">
                  <Counter value="4" duration={1.6} />
                </div>
                <p className="text-xs font-mono uppercase tracking-wider text-muted mt-2">
                  Core Divisions
                </p>
              </div>

              <div>
                <div className="font-display text-4xl sm:text-6xl text-brand-orange tracking-wide">
                  <Counter value="[XX]+" duration={1.6} />
                </div>
                <p className="text-xs font-mono uppercase tracking-wider text-muted mt-2">
                  Placeholder Safe
                </p>
              </div>
            </div>
          </div>

          {/* 1.5 ACCORDION (Dark) */}
          <div className="mb-12">
            <h3 className="font-display uppercase text-2xl text-brand-orange tracking-wider mb-6 pb-2 border-b border-white/10">
              05. Accordion on Dark (Animated Height + Rotating Plus)
            </h3>
            <Accordion items={sampleFaqDark} theme="dark" />
          </div>
        </div>
      </section>

      {/* CHEVRON DIVIDER: Dark to Light */}
      <ChevronDivider position="bottom" color="paper" bgColor="ink" direction="down" height={32} />

      {/* ========================================================= */}
      {/* 2. LIGHT SECTION SHOWCASE */}
      {/* ========================================================= */}
      <section className="bg-paper text-ink py-16 md:py-24 relative overflow-hidden">
        <div className="max-w-content mx-auto px-6 md:px-12">
          {/* Section Heading: Light Left-Aligned */}
          <SectionHeading
            eyebrow="Light Theme Review"
            title="CORE UI COMPONENTS ON PAPER (#FFFFFF)"
            subtitle="Testing contrast, buttons, cards, headings, and accordions on white and mist backgrounds."
            align="left"
            theme="light"
          />

          {/* 2.1 BUTTONS (Light) */}
          <div className="mb-20">
            <h3 className="font-display uppercase text-2xl text-brand-orange tracking-wider mb-6 pb-2 border-b border-ink/10">
              01. Buttons on Light Background
            </h3>
            <div className="flex flex-wrap items-center gap-6 p-8 rounded-2xl bg-mist border border-ink/10">
              <Button variant="primary" size="lg" withRocketIcon>
                Get a Quote
              </Button>
              <Button variant="secondary" size="lg" theme="light">
                Secondary Outline (Ink)
              </Button>
              <Button variant="ghost" size="md" theme="light">
                Ghost on Light
              </Button>
            </div>
          </div>

          {/* 2.2 CARDS (Light) */}
          <div className="mb-20">
            <h3 className="font-display uppercase text-2xl text-brand-orange tracking-wider mb-6 pb-2 border-b border-ink/10">
              02. Cards on Light Background
            </h3>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              <Card theme="light" animatedBorder tilt>
                <span className="text-xs font-mono uppercase text-brand-orange font-bold block mb-2">
                  01 · Video
                </span>
                <h4 className="font-display uppercase text-2xl text-ink mb-2">
                  High-Retention Reels
                </h4>
                <p className="font-body text-sm text-muted mb-6 leading-relaxed">
                  Tailored pacing, clean sound design, and custom text animations engineered for creator retention.
                </p>
                <Button size="sm" withRocketIcon>
                  See Work
                </Button>
              </Card>

              <Card theme="light" animatedBorder tilt>
                <span className="text-xs font-mono uppercase text-brand-orange font-bold block mb-2">
                  02 · Design
                </span>
                <h4 className="font-display uppercase text-2xl text-ink mb-2">
                  Brand Identity
                </h4>
                <p className="font-body text-sm text-muted mb-6 leading-relaxed">
                  Clean visual foundations, color systems, and templates that build instant authority.
                </p>
                <Button variant="secondary" size="sm" theme="light">
                  Learn More
                </Button>
              </Card>

              <Card theme="light" animatedBorder tilt>
                <span className="text-xs font-mono uppercase text-brand-orange font-bold block mb-2">
                  03 · Web
                </span>
                <h4 className="font-display uppercase text-2xl text-ink mb-2">
                  Conversion Websites
                </h4>
                <p className="font-body text-sm text-muted mb-6 leading-relaxed">
                  Fast, responsive, SEO-ready web presence built using modern Next.js and Tailwind.
                </p>
                <Button size="sm" withRocketIcon>
                  Get a Quote
                </Button>
              </Card>
            </div>
          </div>

          {/* 2.3 MARQUEE (Two rows, second reversed) */}
          <div className="mb-20">
            <h3 className="font-display uppercase text-2xl text-brand-orange tracking-wider mb-6 pb-2 border-b border-ink/10">
              03. Infinite Marquee (Edge Fade + Hover Pause + Reverse Row)
            </h3>
            <div className="p-8 rounded-2xl bg-mist border border-ink/10 overflow-hidden">
              <Marquee direction="left" speedSeconds={25} reverseRow>
                {clientLogoPlaceholders.map((logo, idx) => (
                  <div
                    key={idx}
                    className="px-6 py-3 rounded-xl bg-paper border border-ink/10 text-xs font-mono text-muted tracking-wider uppercase shadow-sm hover:border-brand-orange hover:text-brand-orange transition-colors"
                  >
                    {logo}
                  </div>
                ))}
              </Marquee>
            </div>
          </div>

          {/* 2.4 ACCORDION (Light) */}
          <div className="mb-8">
            <h3 className="font-display uppercase text-2xl text-brand-orange tracking-wider mb-6 pb-2 border-b border-ink/10">
              04. Accordion on Light (Animated Height + Rotating Plus)
            </h3>
            <Accordion items={sampleFaqLight} theme="light" />
          </div>
        </div>
      </section>

      {/* CHEVRON DIVIDER: Light to Brand Gradient */}
      <ChevronDivider position="bottom" color="brand-orange" bgColor="paper" direction="down" height={32} />

      {/* ========================================================= */}
      {/* 3. CTA BAND SECTION (Spec Section 5) */}
      {/* ========================================================= */}
      <CTABand />
    </div>
  );
}
