import { Metadata } from "next";
import { notFound } from "next/navigation";
import Link from "next/link";
import Image from "next/image";
import { Clock, ArrowLeft, ArrowRight, User, Calendar, Sparkles } from "lucide-react";
import { MDXRemote } from "next-mdx-remote/rsc";
import { Badge } from "@/components/ui/Badge";
import { Button } from "@/components/ui/Button";
import { CTABand } from "@/components/sections/CTABand";
import { ChevronDivider } from "@/components/ui/ChevronDivider";
import { ShareButtons } from "@/components/blog/ShareButtons";
import { TableOfContents } from "@/components/blog/TableOfContents";
import { ReadingProgressBar } from "@/components/blog/ReadingProgressBar";
import { getPostBySlug, getAllPosts, getRelatedPosts } from "@/lib/blog";
import { constructMetadata, getArticleSchema, getBreadcrumbSchema } from "@/lib/seo";
import { SITE_URL } from "@/lib/site";

interface BlogPostPageProps {
  params: {
    slug: string;
  };
}

export async function generateStaticParams() {
  const posts = getAllPosts();
  return posts.map((post) => ({
    slug: post.slug,
  }));
}

export async function generateMetadata({
  params,
}: BlogPostPageProps): Promise<Metadata> {
  const post = getPostBySlug(params.slug);
  if (!post) return {};

  return constructMetadata({
    title: `${post.meta.title} | TechUP Digital`,
    description: post.meta.description,
    path: `/blog/${post.meta.slug}`,
    ogImage: post.meta.cover,
  });
}

function getServiceParamForCategory(category: string): string {
  switch (category) {
    case "Video Editing":
      return "Content & Video";
    case "Branding":
      return "Branding & Design";
    case "Websites":
      return "Web & Digital Presence";
    case "Growth":
      return "Growth Support";
    default:
      return "Content & Video";
  }
}

export default function BlogPostPage({ params }: BlogPostPageProps) {
  const post = getPostBySlug(params.slug);

  if (!post) {
    notFound();
  }

  const relatedPosts = getRelatedPosts(post.meta.slug, post.meta.category, 3);

  const articleSchema = getArticleSchema({
    title: post.meta.title,
    description: post.meta.description,
    slug: post.meta.slug,
    date: post.meta.date,
    author: post.meta.author,
    cover: post.meta.cover,
  });

  const breadcrumbSchema = getBreadcrumbSchema([
    { name: "Home", url: SITE_URL },
    { name: "Blog", url: `${SITE_URL}/blog` },
    { name: post.meta.title, url: `${SITE_URL}/blog/${post.meta.slug}` },
  ]);

  const serviceParam = getServiceParamForCategory(post.meta.category);

  return (
    <>
      {/* 10.2 Reading Progress Bar */}
      <ReadingProgressBar />

      {/* Structured Data: Article & BreadcrumbList JSON-LD */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(articleSchema),
        }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(breadcrumbSchema),
        }}
      />

      <article className="bg-ink text-paper pt-32 pb-24 md:pt-40 md:pb-32 overflow-hidden border-b border-white/10">
        <div className="container max-w-7xl mx-auto px-4 sm:px-6 relative z-10">
          {/* Breadcrumb Navigation */}
          <nav aria-label="Breadcrumb" className="mb-8">
            <ol className="flex items-center gap-2 text-xs font-mono text-white/50">
              <li>
                <Link href="/" className="hover:text-brand-orange transition-colors">
                  Home
                </Link>
              </li>
              <li>/</li>
              <li>
                <Link href="/blog" className="hover:text-brand-orange transition-colors">
                  Blog
                </Link>
              </li>
              <li>/</li>
              <li className="text-brand-orange truncate max-w-[200px] sm:max-w-none">
                {post.meta.category}
              </li>
            </ol>
          </nav>

          {/* Header Metadata */}
          <div className="max-w-4xl mb-6">
            <div className="inline-block mb-4">
              <Badge variant="orange">{post.meta.category}</Badge>
            </div>

            <h1 className="font-display uppercase text-3xl sm:text-5xl md:text-6xl text-white tracking-wide leading-[1.05] mb-6">
              {post.meta.title}
            </h1>

            <div className="flex flex-wrap items-center gap-4 text-xs font-mono text-white/60 pb-6 border-b border-white/10">
              <div className="flex items-center gap-1.5">
                <User className="w-3.5 h-3.5 text-brand-orange" />
                <span>{post.meta.author}</span>
              </div>
              <span>•</span>
              <div className="flex items-center gap-1.5">
                <Clock className="w-3.5 h-3.5 text-brand-orange" />
                <span>{post.meta.readTime}</span>
              </div>
              <span>•</span>
              <div className="flex items-center gap-1.5">
                <Calendar className="w-3.5 h-3.5 text-brand-orange" />
                <span>{post.meta.date}</span>
              </div>
            </div>
          </div>

          {/* Featured Cover Graphic Banner */}
          <div className="relative w-full aspect-[16/9] rounded-2xl sm:rounded-3xl overflow-hidden mb-12 sm:mb-16 bg-ink border border-white/10 shadow-2xl">
            {post.meta.cover ? (
              <Image
                src={post.meta.cover}
                alt={post.meta.coverAlt || post.meta.title}
                fill
                priority
                sizes="(max-width: 768px) 100vw, (max-width: 1200px) 95vw, 1200px"
                className="object-cover object-center"
              />
            ) : (
              <div className="relative w-full h-full bg-gradient-to-br from-ink-soft to-ink flex flex-col justify-between p-8 sm:p-12 select-none">
                <div className="flex items-center justify-between relative z-10">
                  <span className="font-mono text-xs uppercase tracking-widest text-brand-orange">
                    TechUP Digital Editorial
                  </span>
                  <span className="text-xs font-mono text-white/40">
                    {post.meta.readTime}
                  </span>
                </div>

                <div className="flex flex-col items-center justify-center my-auto relative z-10 text-center">
                  <div className="w-16 h-16 sm:w-20 sm:h-20 rounded-2xl bg-brand-orange/15 border border-brand-orange/40 flex items-center justify-center text-brand-orange mb-4 shadow-xl shadow-brand-orange/20">
                    <Sparkles className="w-8 h-8 sm:w-10 sm:h-10" />
                  </div>
                  <h2 className="font-display uppercase text-2xl sm:text-4xl text-white tracking-wide max-w-2xl">
                    {post.meta.title}
                  </h2>
                </div>

                <div className="pt-4 border-t border-white/10 flex items-center justify-between text-xs text-white/50 font-mono relative z-10">
                  <span>Published: {post.meta.date}</span>
                  <span>Author: {post.meta.author}</span>
                </div>
              </div>
            )}
          </div>

          {/* Two-Column Layout: 720px Reading Column + Desktop Sidebar */}
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-start">
            {/* 720px Readable Main Content Column */}
            <div className="lg:col-span-8 max-w-[720px] font-body text-base md:text-lg leading-relaxed text-white/90 space-y-6">
              <MDXRemote
                source={post.content}
                components={{
                  h2: (props) => (
                    <h2
                      className="font-display uppercase text-2xl sm:text-3xl md:text-4xl text-white tracking-wide mt-12 mb-4 pt-6 border-t border-white/10 scroll-mt-28"
                      {...props}
                    />
                  ),
                  h3: (props) => (
                    <h3
                      className="font-display uppercase text-xl sm:text-2xl text-white tracking-wide mt-8 mb-3 scroll-mt-28"
                      {...props}
                    />
                  ),
                  p: (props) => (
                    <p className="leading-relaxed text-white/85 mb-5" {...props} />
                  ),
                  ul: (props) => (
                    <ul className="list-disc pl-6 space-y-2.5 mb-6 text-white/85" {...props} />
                  ),
                  ol: (props) => (
                    <ol className="list-decimal pl-6 space-y-2.5 mb-6 text-white/85" {...props} />
                  ),
                  li: (props) => <li className="pl-1" {...props} />,
                  blockquote: (props) => (
                    <blockquote
                      className="border-l-4 border-brand-orange pl-5 italic my-8 text-white text-lg bg-white/[0.03] p-5 rounded-r-2xl border-y border-r border-white/5"
                      {...props}
                    />
                  ),
                  strong: (props) => (
                    <strong className="text-white font-semibold" {...props} />
                  ),
                }}
              />

              {/* Author Box */}
              <div className="mt-16 p-8 rounded-3xl bg-ink-soft border border-white/10 flex flex-col sm:flex-row items-center sm:items-start gap-6 text-center sm:text-left shadow-xl">
                <div className="w-16 h-16 rounded-full bg-ink border-2 border-brand-orange text-brand-orange flex items-center justify-center font-display text-2xl font-bold shrink-0 shadow-lg shadow-brand-orange/20">
                  TU
                </div>
                <div>
                  <h4 className="font-display uppercase text-2xl text-white tracking-wide mb-1">
                    {post.meta.author}
                  </h4>
                  <p className="font-mono text-xs text-brand-orange uppercase tracking-wider mb-2 font-semibold">
                    TechUP Digital Editorial Team
                  </p>
                  <p className="font-body text-sm text-white/70 leading-relaxed">
                    Actionable advice, creative systems, and execution blueprints for ambitious Indian brands, creators, and business founders.
                  </p>
                </div>
              </div>
            </div>

            {/* Sidebar Column (Desktop sticky) */}
            <div className="lg:col-span-4 flex flex-col gap-8">
              <div className="sticky top-28 flex flex-col gap-8">
                {/* 1. Sticky Table of Contents */}
                <TableOfContents />

                {/* 2. Share Buttons */}
                <div className="p-6 rounded-2xl bg-ink-soft border border-white/10">
                  <ShareButtons title={post.meta.title} slug={post.meta.slug} />
                </div>

                {/* 3. Inline Mid-Article CTA Card */}
                <div className="p-6 sm:p-7 rounded-2xl bg-brand-gradient text-white shadow-xl shadow-brand-orange/20 relative overflow-hidden">
                  <div className="relative z-10">
                    <span className="font-mono text-[10px] uppercase tracking-wider bg-black/30 px-2 py-0.5 rounded text-white inline-block mb-3">
                      Need Help With This?
                    </span>
                    <h3 className="font-display uppercase text-2xl sm:text-3xl text-white tracking-wide mb-2 leading-tight">
                      Ready to Scale Your Brand?
                    </h3>
                    <p className="font-body text-xs text-white/90 mb-5 leading-relaxed">
                      We handle video editing, branding, and modern websites with guaranteed consistency and founder-led accountability.
                    </p>
                    <Link href={`/contact?service=${encodeURIComponent(serviceParam)}`}>
                      <Button
                        variant="secondary"
                        size="md"
                        className="w-full bg-white text-ink border-transparent hover:bg-black hover:text-white"
                      >
                        <span>Get a Quote</span>
                        <ArrowRight className="w-4 h-4 ml-1.5" />
                      </Button>
                    </Link>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Three Related Posts */}
          {relatedPosts.length > 0 && (
            <div className="mt-24 pt-16 border-t border-white/10">
              <div className="flex items-center justify-between mb-8">
                <div>
                  <span className="font-mono text-xs uppercase tracking-widest text-brand-orange block mb-1 font-semibold">
                    {"// KEEP READING"}
                  </span>
                  <h3 className="font-display uppercase text-3xl sm:text-4xl text-white tracking-wide">
                    Related Articles
                  </h3>
                </div>
                <Link
                  href="/blog"
                  className="hidden sm:inline-flex items-center gap-1.5 text-xs font-mono uppercase text-brand-orange hover:text-brand-amber transition-colors"
                >
                  <span>All Articles</span>
                  <ArrowRight className="w-3.5 h-3.5" />
                </Link>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-3 gap-6 sm:gap-8">
                {relatedPosts.map((rel) => (
                  <Link
                    key={rel.slug}
                    href={`/blog/${rel.slug}`}
                    className="group rounded-2xl overflow-hidden bg-ink-soft border border-white/10 hover:border-brand-orange/40 hover:-translate-y-1 transition-all duration-300 flex flex-col justify-between"
                  >
                    <div>
                      {rel.cover && (
                        <div className="relative aspect-[16/9] w-full bg-ink overflow-hidden border-b border-white/5 select-none">
                          <Image
                            src={rel.cover}
                            alt={rel.coverAlt || rel.title}
                            fill
                            sizes="(max-width: 768px) 100vw, 33vw"
                            className="object-cover transition-transform duration-500 ease-out group-hover:scale-105"
                          />
                        </div>
                      )}
                      <div className="p-6">
                        <div className="flex items-center justify-between mb-3">
                          <Badge variant="orange" size="sm">
                            {rel.category}
                          </Badge>
                          <span className="text-[11px] font-mono text-white/50">
                            {rel.readTime}
                          </span>
                        </div>
                        <h4 className="font-display uppercase text-xl text-white tracking-wide group-hover:text-brand-orange transition-colors line-clamp-2 mb-2 leading-snug">
                          {rel.title}
                        </h4>
                        <p className="font-body text-xs text-white/70 line-clamp-2 leading-relaxed">
                          {rel.description}
                        </p>
                      </div>
                    </div>
                    <div className="px-6 pb-6 pt-2 border-t border-white/5 flex items-center justify-between text-xs font-semibold text-brand-orange">
                      <span>Read Article</span>
                      <ArrowRight className="w-4 h-4 group-hover:translate-x-1.5 transition-transform" />
                    </div>
                  </Link>
                ))}
              </div>
            </div>
          )}
        </div>
      </article>

      {/* Divider: Dark to Brand Gradient */}
      <ChevronDivider color="brand-orange" bgColor="ink" direction="down" height={28} />

      {/* Reused Final CTA Band */}
      <CTABand />
    </>
  );
}
