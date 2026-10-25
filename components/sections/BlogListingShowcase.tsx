"use client";

import React, { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { Clock, ArrowRight } from "lucide-react";
import { Badge } from "@/components/ui/Badge";
import { BlogPostMeta } from "@/lib/blog";

const CATEGORIES = ["All", "Video Editing", "Branding", "Websites", "Growth"];

export function BlogListingShowcase({ posts }: { posts: BlogPostMeta[] }) {
  const [selectedCategory, setSelectedCategory] = useState("All");

  const filteredPosts =
    selectedCategory === "All"
      ? posts
      : posts.filter((post) => post.category === selectedCategory);

  const featuredPost = filteredPosts[0];
  const remainingPosts = filteredPosts.slice(1);

  return (
    <section className="bg-paper text-ink py-16 md:py-24 border-b border-ink/5">
      <div className="max-w-content mx-auto px-6 md:px-12">
        {/* Filter chips */}
        <div className="flex flex-wrap items-center justify-center gap-3 mb-16">
          {CATEGORIES.map((cat) => {
            const isActive = cat === selectedCategory;

            return (
              <button
                key={cat}
                type="button"
                onClick={() => setSelectedCategory(cat)}
                className={`px-5 py-2.5 rounded-full text-xs font-semibold uppercase tracking-wider transition-all duration-200 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand-orange ${
                  isActive
                    ? "bg-brand-gradient text-white shadow-brand-glow"
                    : "bg-mist text-ink/70 hover:bg-ink/5 border border-ink/10"
                }`}
              >
                {cat}
              </button>
            );
          })}
        </div>

        {/* Featured Post (if available) */}
        {featuredPost && (
          <div className="mb-16">
            <Link
              href={`/blog/${featuredPost.slug}`}
              className="group rounded-[24px] overflow-hidden bg-mist border border-ink/10 hover:border-brand-orange/40 hover:shadow-brand-glow transition-all duration-300 grid grid-cols-1 lg:grid-cols-12 gap-8 items-center p-6 md:p-8"
            >
              <div className="lg:col-span-7 relative w-full aspect-[16/10] rounded-2xl overflow-hidden bg-ink">
                <Image
                  src={featuredPost.cover}
                  alt={featuredPost.coverAlt || featuredPost.title}
                  fill
                  className="object-cover transition-transform duration-500 group-hover:scale-105"
                />
                <div className="absolute top-4 left-4">
                  <Badge variant="dark">{featuredPost.category}</Badge>
                </div>
              </div>

              <div className="lg:col-span-5 flex flex-col justify-center">
                <span className="text-xs font-mono uppercase text-brand-orange tracking-widest block mb-2">
                  FEATURED ARTICLE
                </span>
                <div className="flex items-center gap-2 text-xs text-muted mb-3 font-body">
                  <Clock className="w-3.5 h-3.5 text-brand-orange" />
                  <span>{featuredPost.readTime}</span>
                  <span>•</span>
                  <span>{featuredPost.date}</span>
                </div>
                <h2 className="font-display uppercase text-3xl sm:text-4xl text-ink tracking-wide group-hover:text-brand-orange transition-colors mb-4">
                  {featuredPost.title}
                </h2>
                <p className="font-body text-sm md:text-base text-ink/75 leading-relaxed mb-6">
                  {featuredPost.description}
                </p>
                <div className="inline-flex items-center gap-2 text-sm font-semibold uppercase tracking-wider text-brand-orange group-hover:text-brand-amber transition-colors">
                  <span>Read Full Article</span>
                  <ArrowRight className="w-4 h-4 transition-transform duration-300 group-hover:translate-x-1.5" />
                </div>
              </div>
            </Link>
          </div>
        )}

        {/* Grid for Remaining Posts */}
        {remainingPosts.length > 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {remainingPosts.map((post) => (
              <Link
                key={post.slug}
                href={`/blog/${post.slug}`}
                className="group rounded-[20px] overflow-hidden bg-mist border border-ink/10 hover:border-brand-orange/40 transition-all duration-300 hover:shadow-brand-glow hover:-translate-y-2 flex flex-col justify-between"
              >
                <div>
                  <div className="relative w-full aspect-[16/10] overflow-hidden bg-ink">
                    <Image
                      src={post.cover}
                      alt={post.coverAlt || post.title}
                      fill
                      className="object-cover transition-transform duration-500 group-hover:scale-105"
                    />
                    <div className="absolute top-4 left-4">
                      <Badge variant="dark">{post.category}</Badge>
                    </div>
                  </div>

                  <div className="p-6">
                    <div className="flex items-center gap-2 text-xs text-muted mb-2 font-body">
                      <Clock className="w-3.5 h-3.5 text-brand-orange" />
                      <span>{post.readTime}</span>
                      <span>•</span>
                      <span>{post.date}</span>
                    </div>

                    <h3 className="font-display uppercase text-2xl text-ink tracking-wide group-hover:text-brand-orange transition-colors line-clamp-2">
                      {post.title}
                    </h3>
                    <p className="font-body text-xs text-muted mt-2 line-clamp-2 leading-relaxed">
                      {post.description}
                    </p>
                  </div>
                </div>

                <div className="px-6 pb-6 pt-2">
                  <span className="inline-flex items-center gap-2 text-xs font-semibold uppercase tracking-wider text-brand-orange group-hover:text-brand-amber transition-colors">
                    <span>Read Article</span>
                    <ArrowRight className="w-3.5 h-3.5 transition-transform duration-300 group-hover:translate-x-1" />
                  </span>
                </div>
              </Link>
            ))}
          </div>
        ) : (
          !featuredPost && (
            <div className="text-center py-16 text-muted font-body">
              No articles found in this category yet.
            </div>
          )
        )}
      </div>
    </section>
  );
}
