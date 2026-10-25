"use client";

import React from "react";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { Accordion } from "@/components/ui/Accordion";
import { SERVICES_FAQS } from "@/content/faq";
import { getFAQSchema } from "@/lib/seo";

export function ServicesFAQ() {
  const faqSchema = getFAQSchema(SERVICES_FAQS);

  return (
    <section className="relative py-24 md:py-32 bg-paper text-ink overflow-hidden border-t border-ink/5">
      {/* Structured Data: FAQPage JSON-LD */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }}
      />

      <div className="container max-w-7xl mx-auto px-4 sm:px-6 relative z-10">
        <SectionHeading
          eyebrow="Frequently Asked Questions"
          title="EVERYTHING YOU NEED TO KNOW"
          subtitle="Clear answers to common questions about our services, timelines, revisions, and how we collaborate."
          align="center"
          theme="light"
          className="max-w-3xl mx-auto"
        />

        <div className="mt-12">
          <Accordion items={SERVICES_FAQS} theme="light" />
        </div>
      </div>
    </section>
  );
}
