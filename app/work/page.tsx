import { Metadata } from "next";
import { constructMetadata, getBreadcrumbSchema } from "@/lib/seo";
import { WorkHero } from "@/components/sections/work/WorkHero";
import { WorkGrid } from "@/components/sections/work/WorkGrid";
import { ResultsStrip } from "@/components/sections/work/ResultsStrip";
import { CTABand } from "@/components/sections/CTABand";
import { ChevronDivider } from "@/components/ui/ChevronDivider";

export const metadata: Metadata = constructMetadata({
  title: "Our Work | Reels, Branding & Websites - TechUP Digital",
  description:
    "Explore our portfolio of viral Instagram reels, custom brand identities, and high-conversion web development projects built for ambitious brands and creators.",
  keywords: ["video editing portfolio", "creative design portfolio"],
  path: "/work",
});

export default function WorkPage() {
  const breadcrumbSchema = getBreadcrumbSchema([
    { name: "Home", url: "/" },
    { name: "Our Work", url: "/work" },
  ]);

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbSchema) }}
      />
      {/* 8.1 Page Hero (Curated Creative Portfolio) */}
      <WorkHero />

      {/* 8.2 Filter Bar & Portfolio Grid + 8.3 Project Viewer Modal */}
      <WorkGrid />

      {/* 8.4 Results Strip (Built per spec; hidden via config until real numbers exist) */}
      <ResultsStrip />

      {/* Divider: Dark Ink to Brand Gradient CTA */}
      <ChevronDivider color="brand-orange" bgColor="ink" direction="down" height={28} />

      {/* 8.5 Final CTA Band */}
      <CTABand />
    </>
  );
}
