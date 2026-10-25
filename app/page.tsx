import { Metadata } from "next";
import { Hero } from "@/components/sections/Hero";
import { TrustedBy } from "@/components/sections/TrustedBy";
import { WhatWeDo } from "@/components/sections/WhatWeDo";
import { ServicesGrid } from "@/components/sections/ServicesGrid";
import { FeaturedWork } from "@/components/sections/FeaturedWork";
import { WhyTechUp } from "@/components/sections/WhyTechUp";
import { Process } from "@/components/sections/Process";
import { EngagementModels } from "@/components/sections/EngagementModels";
import { Testimonials } from "@/components/sections/Testimonials";
import { TeamSection } from "@/components/sections/TeamSection";
import { BlogTeaser } from "@/components/sections/BlogTeaser";
import { CTABand } from "@/components/sections/CTABand";
import { ChevronDivider } from "@/components/ui/ChevronDivider";
import { constructMetadata } from "@/lib/seo";

export const metadata: Metadata = constructMetadata({
  title: "TechUP Digital | Video Editing, Branding & Websites",
  description:
    "Video editing, branding, and modern websites for ambitious creators and businesses across India. Fast turnarounds, founder accountability, and guaranteed quality.",
  keywords: ["digital agency India", "video editing agency", "branding and web design"],
  path: "/",
});

export default function HomePage() {
  return (
    <>
      {/* 6.1 Hero (Dark) */}
      <Hero />

      {/* 6.2 Trusted By (Light) */}
      <TrustedBy />

      {/* Divider: Light to Dark */}
      <ChevronDivider color="ink" bgColor="paper" direction="down" height={28} />

      {/* 6.3 What we do (Dark) */}
      <WhatWeDo />

      {/* Divider: Dark to Light (Mist) */}
      <ChevronDivider color="mist" bgColor="ink" direction="down" height={28} />

      {/* 6.4 Services (Light) */}
      <ServicesGrid />

      {/* Divider: Light (Mist) to Dark */}
      <ChevronDivider color="ink" bgColor="mist" direction="down" height={28} />

      {/* 6.5 Featured work (Dark) */}
      <FeaturedWork />

      {/* Divider: Dark to Light (Paper) */}
      <ChevronDivider color="paper" bgColor="ink" direction="down" height={28} />

      {/* 6.6 Why TechUP (Light) */}
      <WhyTechUp />

      {/* Divider: Light (Paper) to Dark */}
      <ChevronDivider color="ink" bgColor="paper" direction="down" height={28} />

      {/* 6.7 How we work / Process (Dark) */}
      <Process />

      {/* Divider: Dark to Light (Paper) */}
      <ChevronDivider color="paper" bgColor="ink" direction="down" height={28} />

      {/* 6.8 Engagement models (Light) */}
      <EngagementModels />

      {/* Divider: Light (Paper) to Dark */}
      <ChevronDivider color="ink" bgColor="paper" direction="down" height={28} />

      {/* 6.9 Testimonials (Dark) */}
      <Testimonials />

      {/* Divider: Dark to Light (Mist) */}
      <ChevronDivider color="mist" bgColor="ink" direction="down" height={28} />

      {/* 6.10 Our team (Light) */}
      <TeamSection />

      {/* Divider: Light (Mist) to Dark */}
      <ChevronDivider color="ink" bgColor="mist" direction="down" height={28} />

      {/* 6.11 Blog teaser (Dark) */}
      <BlogTeaser />

      {/* Divider: Dark to Brand Gradient */}
      <ChevronDivider color="brand-orange" bgColor="ink" direction="down" height={28} />

      {/* 6.12 Final CTA band (Brand Gradient) */}
      <CTABand />
    </>
  );
}
