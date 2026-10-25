import React from "react";
import Image from "next/image";
import Link from "next/link";
import { ArrowRight, Clock } from "lucide-react";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { Badge } from "@/components/ui/Badge";
import { Button } from "@/components/ui/Button";
import { BLOG_TEASER_CONTENT } from "@/content/home";
import { getAllPosts } from "@/lib/blog";

export function BlogTeaser() {
  const posts = getAllPosts().slice(0, 3);

  return (
    <section id="blog" className="bg-ink text-paper py-20 md:py-32 border-b border-white/10 relative overflow-hidden scroll-mt-24">
      {/* Background Ambience */}
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-0 overflow-hidden select-none"
      >
        <div className="absolute bottom-10 right-10 w-96 h-96 rounded-full bg-brand-orange/5 blur-3xl" />
      </div>

      <div className="max-w-content mx-auto px-6 md:px-12 relative z-10">
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-12">
          <SectionHeading
            eyebrow="Insights & Articles"
            title={BLOG_TEASER_CONTENT.heading}
            align="left"
            className="mb-0"
            subtitle="Actionable tactics on video retention, visual branding, and digital growth."
          />
          <div className="mt-6 md:mt-0">
            <Button href="/blog" variant="secondary" size="md">
              <span className="flex items-center gap-2">
                {BLOG_TEASER_CONTENT.buttonText}
                <ArrowRight className="w-4 h-4 transition-transform group-hover:translate-x-1" />
              </span>
            </Button>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {posts.map((post) => (
            <div key={post.slug} className="flex">
              <Link
                href={`/blog/${post.slug}`}
                className="w-full group rounded-[22px] overflow-hidden bg-ink-soft border border-white/10 hover:border-brand-orange/50 transition-all duration-300 hover:shadow-brand-glow hover:-translate-y-2 flex flex-col justify-between"
              >
                <div>
                  {/* Cover Image Container */}
                  <div className="relative w-full aspect-[16/9] overflow-hidden bg-ink">
                    <Image
                      src={post.cover}
                      alt={post.coverAlt || post.title}
                      fill
                      sizes="(max-width: 768px) 100vw, 33vw"
                      className="object-cover transition-transform duration-500 ease-out group-hover:scale-105"
                    />
                    <div className="absolute top-4 left-4">
                      <Badge variant="dark">{post.category}</Badge>
                    </div>
                  </div>

                  {/* Card Content */}
                  <div className="p-6">
                    <div className="flex items-center gap-2 text-xs text-muted mb-2.5 font-body">
                      <Clock className="w-3.5 h-3.5 text-brand-orange" />
                      <span>{post.readTime}</span>
                      <span>•</span>
                      <span>{post.date}</span>
                    </div>

                    <h3 className="font-display uppercase text-2xl text-white tracking-wide group-hover:text-brand-orange transition-colors line-clamp-2">
                      {post.title}
                    </h3>
                    <p className="font-body text-xs text-muted mt-2 line-clamp-2 leading-relaxed">
                      {post.description}
                    </p>
                  </div>
                </div>

                {/* Read link */}
                <div className="px-6 pb-6 pt-2">
                  <span className="inline-flex items-center gap-2 text-xs font-semibold uppercase tracking-wider text-brand-orange group-hover:text-brand-amber transition-colors">
                    <span>Read Article</span>
                    <ArrowRight className="w-3.5 h-3.5 transition-transform duration-300 group-hover:translate-x-1.5" />
                  </span>
                </div>
              </Link>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
