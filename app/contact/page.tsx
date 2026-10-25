import { Suspense } from "react";
import { Metadata } from "next";
import { constructMetadata, getFAQSchema, getBreadcrumbSchema } from "@/lib/seo";
import { CONTACT_FAQS } from "@/content/faq";
import { ContactHeaderLeft } from "@/components/sections/contact/ContactHeaderLeft";
import { QuoteForm } from "@/components/sections/contact/QuoteForm";
import { WhatHappensNext } from "@/components/sections/contact/WhatHappensNext";
import { ContactFAQ } from "@/components/sections/contact/ContactFAQ";

export const metadata: Metadata = constructMetadata({
  title: "Contact & Project Inquiry | TechUP Digital",
  description:
    "Have a project in mind? Tell us what you're building. TechUP Digital delivers video editing, brand identity systems, and modern websites with founder-led precision across India.",
  keywords: [
    "hire creative agency India",
    "video editing agency quote",
    "branding and website inquiry",
    "TechUP Digital contact",
  ],
  path: "/contact",
});

function QuoteFormFallback() {
  return (
    <div className="rounded-3xl bg-ink-soft/90 border border-white/10 shadow-2xl p-8 sm:p-10 min-h-[600px] animate-pulse">
      <div className="h-4 w-32 bg-white/10 rounded mb-4" />
      <div className="h-8 w-56 bg-white/15 rounded mb-2" />
      <div className="h-4 w-full max-w-sm bg-white/10 rounded mb-8" />
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-5 mb-5">
        <div className="h-12 bg-white/5 rounded-xl" />
        <div className="h-12 bg-white/5 rounded-xl" />
      </div>
      <div className="h-28 bg-white/5 rounded-xl" />
    </div>
  );
}

export default function ContactPage() {
  const faqSchema = getFAQSchema(CONTACT_FAQS);
  const breadcrumbSchema = getBreadcrumbSchema([
    { name: "Home", url: "/" },
    { name: "Contact", url: "/contact" },
  ]);

  return (
    <main className="bg-ink text-paper min-h-screen">
      {/* JSON-LD Schemas */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbSchema) }}
      />

      {/* 1. Main Project Inquiry Experience — Two-Column Composition */}
      <section className="relative pt-32 pb-20 md:pt-40 md:pb-28 bg-ink overflow-hidden">
        {/* Ambient atmospheric backdrop lighting */}
        <div className="absolute top-20 left-1/4 -translate-x-1/2 w-[600px] h-[500px] bg-brand-orange/[0.08] rounded-full blur-[140px] pointer-events-none" />
        <div className="absolute top-1/3 right-10 w-[500px] h-[400px] bg-brand-amber/[0.05] rounded-full blur-[160px] pointer-events-none" />

        {/* Micro dot matrix background */}
        <div
          className="absolute inset-0 opacity-[0.035] pointer-events-none select-none"
          style={{
            backgroundImage: "radial-gradient(#ffffff 1px, transparent 1px)",
            backgroundSize: "28px 28px",
          }}
          aria-hidden="true"
        />

        <div className="container max-w-6xl mx-auto px-4 sm:px-6 relative z-10">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-14 items-start">
            {/* Left Column (Editorial Header, Value Proposition, Verified Channels & Brand Visual) */}
            <div className="lg:col-span-5 xl:col-span-5">
              <ContactHeaderLeft />
            </div>

            {/* Right Column (Polished Project Inquiry Form) */}
            <div className="lg:col-span-7 xl:col-span-7">
              <Suspense fallback={<QuoteFormFallback />}>
                <QuoteForm />
              </Suspense>
            </div>
          </div>
        </div>
      </section>

      {/* 2. What Happens Next Section */}
      <WhatHappensNext />

      {/* 3. Compact FAQ Section */}
      <ContactFAQ />
    </main>
  );
}
