import { Metadata } from "next";
import { constructMetadata, getBreadcrumbSchema } from "@/lib/seo";
import { AboutHero } from "@/components/sections/about/AboutHero";
import { WhoWeAre } from "@/components/sections/about/WhoWeAre";
import { VisionMission } from "@/components/sections/about/VisionMission";
import { ProblemsWeSolve } from "@/components/sections/about/ProblemsWeSolve";
import { WhoWeWorkWith } from "@/components/sections/about/WhoWeWorkWith";
import { FoundersNote } from "@/components/sections/about/FoundersNote";
import { AboutTeam } from "@/components/sections/about/AboutTeam";
import { GrowthDirection } from "@/components/sections/about/GrowthDirection";
import { CTABand } from "@/components/sections/CTABand";
import { ChevronDivider } from "@/components/ui/ChevronDivider";

export const metadata: Metadata = constructMetadata({
  title: "About TechUP Digital | Your Vision, Our Precision",
  description:
    "Learn about TechUP Digital, an Indian creative and tech partner founded by Dwaipayan Saha. Delivering video editing, branding, and web design with precision.",
  keywords: ["digital solutions agency", "creative agency India"],
  path: "/about",
});

export default function AboutPage() {
  const breadcrumbSchema = getBreadcrumbSchema([
    { name: "Home", url: "/" },
    { name: "About", url: "/about" },
  ]);

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbSchema) }}
      />
      {/* 9.1 Page Hero (Dark) */}
      <AboutHero />

      {/* Divider: Dark to Light */}
      <ChevronDivider color="paper" bgColor="ink" direction="down" height={28} />

      {/* 9.2 Who we are (Light) */}
      <WhoWeAre />

      {/* Divider: Light to Dark */}
      <ChevronDivider color="ink" bgColor="paper" direction="down" height={28} />

      {/* 9.3 Vision and Mission (Dark) */}
      <VisionMission />

      {/* Divider: Dark to Light */}
      <ChevronDivider color="paper" bgColor="ink" direction="down" height={28} />

      {/* 9.4 Problems we solve (Light) */}
      <ProblemsWeSolve />

      {/* Divider: Light to Dark */}
      <ChevronDivider color="ink" bgColor="paper" direction="down" height={28} />

      {/* 9.5 Who we work with (Dark) */}
      <WhoWeWorkWith />

      {/* Divider: Dark to Light */}
      <ChevronDivider color="paper" bgColor="ink" direction="down" height={28} />

      {/* 9.6 Founder's note (Light) */}
      <FoundersNote />

      {/* Divider: Light to Dark */}
      <ChevronDivider color="ink" bgColor="paper" direction="down" height={28} />

      {/* 9.7 Our team (Dark, anchor #team) */}
      <AboutTeam />

      {/* Divider: Dark to Light */}
      <ChevronDivider color="paper" bgColor="ink" direction="down" height={28} />

      {/* 9.8 Growth direction (Light) */}
      <GrowthDirection />

      {/* Divider: Light to Brand Gradient */}
      <ChevronDivider color="brand-orange" bgColor="paper" direction="down" height={28} />

      {/* 9.9 Final CTA band */}
      <CTABand />
    </>
  );
}
