import { Metadata } from "next";
import { constructMetadata, getBreadcrumbSchema } from "@/lib/seo";
import { SERVICE_DIVISIONS } from "@/content/services";
import { ServicesHero } from "@/components/sections/services/ServicesHero";
import { ServicesSubNav } from "@/components/sections/services/ServicesSubNav";
import { ServiceSection } from "@/components/sections/services/ServiceSection";
import { EngagementTabs } from "@/components/sections/services/EngagementTabs";
import { ServicesFAQ } from "@/components/sections/services/ServicesFAQ";
import { CTABand } from "@/components/sections/CTABand";
import { ChevronDivider } from "@/components/ui/ChevronDivider";

export const metadata: Metadata = constructMetadata({
  title: "Services | Video Editing, Branding, Web Design - TechUP Digital",
  description:
    "Explore our core services: high-retention reels editing, brand identity and design, modern responsive websites, and ongoing digital growth support across India.",
  keywords: ["reels editing service", "logo design", "website design for business"],
  path: "/services",
});

export default function ServicesPage() {
  const breadcrumbSchema = getBreadcrumbSchema([
    { name: "Home", url: "/" },
    { name: "Services", url: "/services" },
  ]);

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbSchema) }}
      />
      {/* 7.1 Services Hero & Category Divisions Container */}
      <div id="service-divisions-container" className="relative bg-ink">
        {/* Services Page Header (Dark) */}
        <ServicesHero />

        {/* Category Navigation Tabs (Integrated into the dark header) */}
        <ServicesSubNav activeId="content-video" />

        {/* Subtle, refined hairline transition into Section 01 */}
        <div className="w-full h-8 sm:h-10 border-b border-white/5" />

        {/* 01: Content & Video (Light - Paper) */}
        <ServiceSection service={SERVICE_DIVISIONS[0]} index={0} />

        {/* Divider: Light to Dark */}
        <ChevronDivider color="ink" bgColor="paper" direction="down" height={28} />

        {/* 02: Branding & Design (Dark - Ink) */}
        <ServiceSection service={SERVICE_DIVISIONS[1]} index={1} />

        {/* Divider: Dark to Light (Mist) */}
        <ChevronDivider color="mist" bgColor="ink" direction="down" height={28} />

        {/* 03: Web & Digital Presence (Light - Mist) */}
        <ServiceSection service={SERVICE_DIVISIONS[2]} index={2} />

        {/* Divider: Light (Mist) to Dark */}
        <ChevronDivider color="ink" bgColor="mist" direction="down" height={28} />

        {/* 04: Growth & Digital Support (Dark - Ink) */}
        <ServiceSection service={SERVICE_DIVISIONS[3]} index={3} />
      </div>

      {/* 7.3 Engagement Models (Dark) */}
      <EngagementTabs />

      {/* Divider: Dark to Light (Paper) */}
      <ChevronDivider color="paper" bgColor="ink" direction="down" height={28} />

      {/* 7.4 FAQ Accordion with FAQPage JSON-LD (Light) */}
      <ServicesFAQ />

      {/* Divider: Light to Brand Gradient */}
      <ChevronDivider color="brand-orange" bgColor="paper" direction="down" height={28} />

      {/* 7.5 Final CTA Band */}
      <CTABand />
    </>
  );
}
