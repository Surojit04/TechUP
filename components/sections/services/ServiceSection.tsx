"use client";

import React from "react";
import { motion, useReducedMotion } from "framer-motion";
import { Check, ArrowRight, Sparkles } from "lucide-react";
import Link from "next/link";
import { Badge } from "@/components/ui/Badge";
import { Button } from "@/components/ui/Button";
import { cn } from "@/lib/utils";
import { ServiceDivision } from "@/content/services";
import { PhoneMockup } from "./visuals/PhoneMockup";
import { DesignCollage } from "./visuals/DesignCollage";
import { LaptopMockup } from "./visuals/LaptopMockup";
import { CalendarGraphic } from "./visuals/CalendarGraphic";

interface ServiceSectionProps {
  service: ServiceDivision;
  index: number;
}

export function ServiceSection({ service, index }: ServiceSectionProps) {
  const prefersReducedMotion = useReducedMotion();
  const isEven = index % 2 === 0;

  // Alternating background themes:
  // 0: Light (Paper)
  // 1: Dark (Ink)
  // 2: Light (Mist)
  // 3: Dark (Ink)
  const isDark = index % 2 === 1;
  const bgColorClass = isDark
    ? "bg-ink text-white"
    : index === 0
    ? "bg-paper text-ink"
    : "bg-mist text-ink";

  // Visual component mapping
  const renderVisual = () => {
    switch (service.id) {
      case "content-video":
        return <PhoneMockup />;
      case "branding-design":
        return <DesignCollage />;
      case "web-digital":
        return <LaptopMockup />;
      case "growth-support":
        return <CalendarGraphic />;
      default:
        return null;
    }
  };

  return (
    <section
      id={service.id}
      className={cn(
        "relative pt-24 pb-20 md:pt-32 md:pb-28 overflow-hidden scroll-mt-28 md:scroll-mt-36 transition-colors",
        bgColorClass
      )}
    >
      {/* Background radial highlight for dark sections */}
      {isDark && (
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[500px] h-[500px] bg-brand-orange/[0.04] rounded-full blur-[140px] pointer-events-none" />
      )}

      <div className="container max-w-7xl mx-auto px-4 sm:px-6 relative z-10">
        <div
          className={cn(
            "grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-center",
            // Alternating column order on desktop
            !isEven && "lg:flex-row-reverse"
          )}
        >
          {/* Text Content Column */}
          <motion.div
            initial={prefersReducedMotion ? { opacity: 1 } : { opacity: 0, y: 15 }}
            whileInView={prefersReducedMotion ? { opacity: 1 } : { opacity: 1, y: 0 }}
            viewport={{ once: true, amount: "some" }}
            transition={{ duration: 0.35, ease: [0.16, 1, 0.3, 1] }}
            className={cn(
              "lg:col-span-7 flex flex-col justify-center",
              !isEven ? "lg:order-2" : "lg:order-1"
            )}
          >
            {/* Header: Outlined big number + Title */}
            <div className="flex items-baseline gap-4 mb-3">
              <motion.span
                initial={
                  prefersReducedMotion
                    ? { opacity: 1 }
                    : { opacity: 0, x: isEven ? -25 : 25 }
                }
                whileInView={
                  prefersReducedMotion
                    ? { opacity: 1 }
                    : { opacity: 1, x: 0 }
                }
                viewport={{ once: true }}
                transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
                className={cn(
                  "font-display text-5xl sm:text-6xl md:text-7xl font-bold tracking-tight select-none",
                  isDark
                    ? "text-transparent bg-clip-text bg-gradient-to-b from-brand-orange to-brand-amber opacity-90"
                    : "text-transparent bg-clip-text bg-gradient-to-b from-brand-orange to-brand-amber opacity-95"
                )}
                style={{
                  WebkitTextStroke: isDark ? "1px rgba(224, 74, 0, 0.8)" : "1px rgba(224, 74, 0, 0.9)",
                }}
              >
                {service.number}
              </motion.span>
              <h2
                className={cn(
                  "font-display uppercase text-3xl sm:text-4xl md:text-5xl tracking-wide",
                  isDark ? "text-white" : "text-ink"
                )}
              >
                {service.title}
              </h2>
            </div>

            {/* Promise Quote */}
            <p
              className={cn(
                "text-base sm:text-lg font-medium italic mb-6 leading-relaxed",
                isDark ? "text-brand-amber" : "text-brand-orange"
              )}
            >
              “{service.promise}”
            </p>

            {/* Services Included List */}
            <div className="mb-8">
              <h3
                className={cn(
                  "text-xs font-mono uppercase tracking-widest mb-3",
                  isDark ? "text-white/60" : "text-ink/60"
                )}
              >
                {"//"} SERVICES INCLUDED
              </h3>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5">
                {service.includedServices.map((item, i) => (
                  <motion.div
                    key={item}
                    initial={prefersReducedMotion ? { opacity: 1 } : { opacity: 0, x: -10 }}
                    whileInView={prefersReducedMotion ? { opacity: 1 } : { opacity: 1, x: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.4, delay: i * 0.05 }}
                    className="flex items-start gap-2.5"
                  >
                    <div className="w-5 h-5 rounded-full bg-brand-orange/15 text-brand-orange flex items-center justify-center shrink-0 mt-0.5">
                      <Check className="w-3 h-3 stroke-[2.5]" />
                    </div>
                    <span
                      className={cn(
                        "text-sm font-body leading-snug",
                        isDark ? "text-white/80" : "text-ink/80"
                      )}
                    >
                      {item}
                    </span>
                  </motion.div>
                ))}
              </div>
            </div>

            {/* Best For Badges */}
            <div className="mb-6">
              <h3
                className={cn(
                  "text-xs font-mono uppercase tracking-widest mb-2.5",
                  isDark ? "text-white/60" : "text-ink/60"
                )}
              >
                {"//"} BEST FOR
              </h3>
              <div className="flex flex-wrap gap-2">
                {service.bestFor.map((item) => (
                  <Badge
                    key={item}
                    variant={isDark ? "dark" : "outline"}
                    className={cn(
                      "text-xs py-1 px-3",
                      !isDark && "border-ink/20 text-ink/80 bg-white shadow-sm"
                    )}
                  >
                    {item}
                  </Badge>
                ))}
              </div>
            </div>

            {/* Value Delivered Block */}
            <div
              className={cn(
                "p-4 rounded-xl border mb-8 flex items-start gap-3",
                isDark
                  ? "bg-white/[0.03] border-white/10 text-white/80"
                  : "bg-white border-ink/10 text-ink/80 shadow-sm"
              )}
            >
              <Sparkles className="w-5 h-5 text-brand-orange shrink-0 mt-0.5" />
              <div>
                <span className="text-xs font-mono uppercase tracking-wider block text-brand-orange font-semibold mb-0.5">
                  Value Delivered:
                </span>
                <p className="text-sm font-body leading-relaxed">
                  {service.valueDelivered}
                </p>
              </div>
            </div>

            {/* Primary Action Button */}
            <div>
              <Link href={`/contact?service=${encodeURIComponent(service.contactServiceParam)}`}>
                <Button variant="primary" size="lg" className="w-full sm:w-auto">
                  <span>Get a Quote for this service</span>
                  <ArrowRight className="w-4 h-4 ml-2" />
                </Button>
              </Link>
            </div>
          </motion.div>

          {/* Visual Column */}
          <motion.div
            initial={prefersReducedMotion ? { opacity: 1 } : { opacity: 0, scale: 0.98 }}
            whileInView={prefersReducedMotion ? { opacity: 1 } : { opacity: 1, scale: 1 }}
            viewport={{ once: true, amount: "some" }}
            transition={{ duration: 0.35, ease: [0.16, 1, 0.3, 1] }}
            className={cn(
              "lg:col-span-5 flex items-center justify-center",
              !isEven ? "lg:order-1" : "lg:order-2"
            )}
          >
            {renderVisual()}
          </motion.div>
        </div>
      </div>
    </section>
  );
}
