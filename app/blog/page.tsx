import { Metadata } from "next";
import { constructMetadata, getBreadcrumbSchema } from "@/lib/seo";
import { getAllPosts } from "@/lib/blog";
import { BlogHero } from "@/components/sections/blog/BlogHero";
import { BlogListing } from "@/components/sections/blog/BlogListing";
import { CTABand } from "@/components/sections/CTABand";
import { ChevronDivider } from "@/components/ui/ChevronDivider";

export const metadata: Metadata = constructMetadata({
  title: "Blog | Digital Growth Tips - TechUP Digital",
  description:
    "Actionable guides and growth blueprints on short-form reels editing, branding strategy, and modern website performance for Indian creators and growing brands.",
  keywords: ["content marketing tips India", "reels tips"],
  path: "/blog",
});

export default function BlogListingPage() {
  const posts = getAllPosts();
  const breadcrumbSchema = getBreadcrumbSchema([
    { name: "Home", url: "/" },
    { name: "Blog", url: "/blog" },
  ]);

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbSchema) }}
      />
      {/* Blog Hero (Dark) */}
      <BlogHero />

      {/* Blog Editorial Showcase, Category Filters & Article Grid (Dark) */}
      <BlogListing posts={posts} />

      {/* Divider: Ink to Brand Orange CTA */}
      <ChevronDivider color="brand-orange" bgColor="ink" direction="down" height={28} />

      {/* Final CTA Band */}
      <CTABand />
    </>
  );
}
