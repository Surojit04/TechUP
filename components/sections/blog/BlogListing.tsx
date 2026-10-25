"use client";

import React, { useState } from "react";
import { motion, useReducedMotion } from "framer-motion";
import Link from "next/link";
import { Clock, Calendar, ArrowRight, ChevronLeft, ChevronRight, Sparkles } from "lucide-react";
import { Badge } from "@/components/ui/Badge";
import { cn } from "@/lib/utils";
import { BlogPostMeta } from "@/lib/blog";

interface BlogListingProps {
  posts: BlogPostMeta[];
}

const CATEGORIES = ["All", "Video Editing", "Branding", "Websites", "Growth"];
const POSTS_PER_PAGE = 9;

function formatDisplayDate(dateStr: string): string {
  try {
    const parts = dateStr.split("-").map(Number);
    if (parts.length === 3) {
      const [year, month, day] = parts;
      const d = new Date(Date.UTC(year, month - 1, day));
      return d.toLocaleDateString("en-US", {
        month: "short",
        day: "numeric",
        year: "numeric",
        timeZone: "UTC",
      });
    }
    const d = new Date(dateStr);
    if (!isNaN(d.getTime())) {
      return d.toLocaleDateString("en-US", {
        month: "short",
        day: "numeric",
        year: "numeric",
      });
    }
    return dateStr;
  } catch {
    return dateStr;
  }
}

export function BlogListing({ posts }: BlogListingProps) {
  const [selectedCategory, setSelectedCategory] = useState<string>("All");
  const [currentPage, setCurrentPage] = useState<number>(1);
  const prefersReducedMotion = useReducedMotion();

  // Filter posts
  const filteredPosts = posts.filter((post) =>
    selectedCategory === "All" ? true : post.category === selectedCategory
  );

  // Featured post is the first post of the current category/all
  const featuredPost = filteredPosts[0];
  // Remaining posts go to the grid
  const gridPosts = filteredPosts.slice(1);

  // Pagination for grid posts
  const totalPages = Math.ceil(gridPosts.length / POSTS_PER_PAGE) || 1;
  const startIndex = (currentPage - 1) * POSTS_PER_PAGE;
  const paginatedGridPosts = gridPosts.slice(startIndex, startIndex + POSTS_PER_PAGE);

  const handleCategoryChange = (cat: string) => {
    setSelectedCategory(cat);
    setCurrentPage(1);
  };

  return (
    <section className="relative py-16 md:py-24 bg-ink text-white overflow-hidden">
      {/* Ambient background glow */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[800px] h-[400px] bg-brand-orange/[0.04] rounded-full blur-[160px] pointer-events-none" />

      <div className="container max-w-7xl mx-auto px-4 sm:px-6 relative z-10">
        {/* Category Filter Pills with Post Counts */}
        <div className="mb-12">
          <div className="flex items-center justify-start md:justify-center gap-2 sm:gap-2.5 overflow-x-auto no-scrollbar pb-2 -mx-4 px-4 sm:mx-0 sm:px-0">
            {CATEGORIES.map((cat) => {
              const isActive = selectedCategory === cat;
              const count =
                cat === "All"
                  ? posts.length
                  : posts.filter((p) => p.category === cat).length;

              return (
                <button
                  key={cat}
                  type="button"
                  onClick={() => handleCategoryChange(cat)}
                  className={cn(
                    "relative inline-flex items-center gap-2 px-4 sm:px-5 py-2.5 rounded-full text-xs sm:text-sm font-body font-semibold transition-all duration-200 shrink-0 select-none",
                    isActive
                      ? "bg-brand-gradient text-white shadow-lg shadow-brand-orange/25 ring-1 ring-white/20"
                      : "bg-ink-soft text-white/70 hover:text-white hover:bg-white/[0.07] border border-white/10"
                  )}
                >
                  <span>{cat}</span>
                  <span
                    className={cn(
                      "px-1.5 py-0.5 rounded-full text-[10px] font-mono leading-none",
                      isActive
                        ? "bg-white/20 text-white font-bold"
                        : "bg-white/[0.08] text-white/50"
                    )}
                  >
                    {count}
                  </span>
                </button>
              );
            })}
          </div>
        </div>

        {/* Featured Post Card */}
        {featuredPost && (
          <div className="mb-14 sm:mb-16">
            <div className="flex items-center justify-between mb-4">
              <div className="flex items-center gap-2">
                <span className="w-1.5 h-1.5 rounded-full bg-brand-orange" />
                <span className="font-mono text-xs uppercase tracking-widest text-brand-orange font-semibold">
                  Featured Editorial
                </span>
              </div>
              <span className="text-xs font-mono text-white/40 hidden sm:inline">
                Lead Story
              </span>
            </div>

            <Link
              href={`/blog/${featuredPost.slug}`}
              className="group relative block rounded-3xl bg-gradient-to-br from-ink-soft to-ink border border-white/10 overflow-hidden shadow-2xl hover:border-brand-orange/50 hover:shadow-brand-glow/20 transition-all duration-300"
            >
              <div className="grid grid-cols-1 lg:grid-cols-12 gap-0 items-stretch">
                {/* Left: Real Cover Artwork Showcase */}
                <div className="lg:col-span-7 relative min-h-[260px] sm:min-h-[340px] lg:min-h-[420px] bg-ink overflow-hidden flex items-center justify-center border-b lg:border-b-0 lg:border-r border-white/10">
                  <img
                    src={featuredPost.cover}
                    alt={featuredPost.coverAlt || featuredPost.title}
                    className="w-full h-full object-cover transition-transform duration-700 ease-out group-hover:scale-105"
                    loading="eager"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-ink/70 via-transparent to-transparent pointer-events-none" />

                  {/* Category badge */}
                  <div className="absolute top-4 left-4 z-10">
                    <span className="inline-flex items-center px-3 py-1 rounded-full text-xs font-body font-bold uppercase tracking-wider bg-brand-orange text-white shadow-lg shadow-brand-orange/30">
                      {featuredPost.category}
                    </span>
                  </div>

                  {/* Read time badge */}
                  <div className="absolute top-4 right-4 z-10">
                    <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-mono text-white/90 bg-ink/80 backdrop-blur-md border border-white/15">
                      <Clock className="w-3.5 h-3.5 text-brand-orange" />
                      <span>{featuredPost.readTime}</span>
                    </span>
                  </div>
                </div>

                {/* Right: Editorial Content */}
                <div className="lg:col-span-5 p-6 sm:p-8 lg:p-10 flex flex-col justify-between">
                  <div>
                    {/* Metadata: Date & Author */}
                    <div className="flex flex-wrap items-center gap-2.5 text-xs font-mono text-white/60 mb-4">
                      <span className="inline-flex items-center gap-1.5 text-brand-orange">
                        <Calendar className="w-3.5 h-3.5" />
                        <span>{formatDisplayDate(featuredPost.date)}</span>
                      </span>
                      <span>·</span>
                      <span>By {featuredPost.author}</span>
                    </div>

                    {/* Headline */}
                    <h2 className="font-display uppercase text-2xl sm:text-3xl lg:text-3xl xl:text-4xl text-white tracking-wide leading-tight group-hover:text-brand-orange transition-colors duration-200 mb-4">
                      {featuredPost.title}
                    </h2>

                    {/* Excerpt */}
                    <p className="font-body text-sm sm:text-base text-white/70 leading-relaxed line-clamp-3 mb-6">
                      {featuredPost.description}
                    </p>

                    {/* Tags preview */}
                    {featuredPost.tags && featuredPost.tags.length > 0 && (
                      <div className="flex flex-wrap gap-1.5 mb-6">
                        {featuredPost.tags.slice(0, 3).map((tag) => (
                          <span
                            key={tag}
                            className="px-2.5 py-0.5 rounded-full text-[11px] font-mono text-white/50 bg-white/[0.04] border border-white/10"
                          >
                            #{tag}
                          </span>
                        ))}
                      </div>
                    )}
                  </div>

                  {/* Read Article CTA */}
                  <div className="pt-4 border-t border-white/10 flex items-center justify-between">
                    <div className="inline-flex items-center gap-2.5 font-body font-bold text-sm uppercase tracking-wider text-brand-orange group-hover:text-white transition-colors">
                      <span>Read Full Article</span>
                      <span className="w-8 h-8 rounded-full bg-brand-orange/15 border border-brand-orange/30 group-hover:bg-brand-orange group-hover:border-brand-orange flex items-center justify-center transition-all duration-300">
                        <ArrowRight className="w-4 h-4 text-brand-orange group-hover:text-white group-hover:translate-x-0.5 transition-all" />
                      </span>
                    </div>
                    <span className="text-xs font-mono text-white/40 group-hover:text-white/60 transition-colors">
                      {featuredPost.readTime}
                    </span>
                  </div>
                </div>
              </div>
            </Link>
          </div>
        )}

        {/* Grid Header and Count */}
        {paginatedGridPosts.length > 0 && (
          <div className="flex items-center justify-between mb-6 pb-3 border-b border-white/10">
            <div className="flex items-center gap-2">
              <span className="font-mono text-xs uppercase tracking-widest text-brand-orange font-semibold">
                {selectedCategory === "All" ? "Latest Articles" : `${selectedCategory} Articles`}
              </span>
              <span className="text-xs font-mono text-white/40">
                ({paginatedGridPosts.length + (featuredPost ? 1 : 0)} total)
              </span>
            </div>
            <span className="text-xs font-mono text-white/40 hidden sm:inline">
              Showing {paginatedGridPosts.length} in grid
            </span>
          </div>
        )}

        {/* 3-Column Grid */}
        {paginatedGridPosts.length > 0 ? (
          <div
            key={selectedCategory + currentPage}
            className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8"
          >
            {paginatedGridPosts.map((post, idx) => (
              <motion.div
                key={post.slug}
                initial={prefersReducedMotion ? { opacity: 1 } : { opacity: 0, y: 14 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.35, delay: prefersReducedMotion ? 0 : idx * 0.05 }}
                className="group h-full"
              >
                <Link
                  href={`/blog/${post.slug}`}
                  className="rounded-2xl bg-ink-soft border border-white/10 overflow-hidden shadow-lg hover:border-brand-orange/50 hover:shadow-brand-glow/15 hover:-translate-y-1.5 transition-all duration-300 h-full flex flex-col justify-between"
                >
                  <div>
                    {/* Thumbnail Container 16:9 with Real Cover SVG */}
                    <div className="relative aspect-[16/9] bg-ink overflow-hidden border-b border-white/5 select-none">
                      <img
                        src={post.cover}
                        alt={post.coverAlt || post.title}
                        className="w-full h-full object-cover transition-transform duration-500 ease-out group-hover:scale-105"
                        loading="lazy"
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-ink-soft/80 via-transparent to-transparent pointer-events-none" />

                      {/* Category Badge */}
                      <div className="absolute top-3 left-3 z-10">
                        <Badge
                          variant="orange"
                          size="sm"
                          className="bg-brand-orange/95 text-white border-none font-bold shadow-md shadow-brand-orange/20"
                        >
                          {post.category}
                        </Badge>
                      </div>

                      {/* Reading Time */}
                      <div className="absolute top-3 right-3 z-10">
                        <span className="inline-flex items-center gap-1 px-2 py-0.5 rounded-full text-[10px] font-mono text-white/90 bg-ink/80 backdrop-blur-md border border-white/15">
                          <Clock className="w-2.5 h-2.5 text-brand-orange" />
                          <span>{post.readTime}</span>
                        </span>
                      </div>
                    </div>

                    {/* Card Body */}
                    <div className="p-5 sm:p-6">
                      {/* Date & Author */}
                      <div className="flex items-center gap-2 text-xs font-mono text-white/50 mb-2.5">
                        <Calendar className="w-3.5 h-3.5 text-brand-orange/80" />
                        <span>{formatDisplayDate(post.date)}</span>
                        <span>·</span>
                        <span className="truncate">By {post.author}</span>
                      </div>

                      {/* Title */}
                      <h3 className="font-display uppercase text-lg sm:text-xl text-white tracking-wide leading-snug mb-2.5 group-hover:text-brand-orange transition-colors">
                        <span className="relative inline">
                          {post.title}
                          <span className="absolute bottom-0 left-0 w-0 h-0.5 bg-brand-orange transition-all duration-300 group-hover:w-full" />
                        </span>
                      </h3>

                      {/* Excerpt */}
                      <p className="font-body text-xs sm:text-sm text-white/65 leading-relaxed line-clamp-2">
                        {post.description}
                      </p>
                    </div>
                  </div>

                  {/* Card Footer */}
                  <div className="p-5 sm:p-6 pt-0">
                    <div className="pt-3.5 border-t border-white/5 flex items-center justify-between text-xs font-semibold text-brand-orange group-hover:text-white transition-colors">
                      <span className="font-body uppercase tracking-wider">Read Article</span>
                      <ArrowRight className="w-4 h-4 text-brand-orange group-hover:text-white group-hover:translate-x-1 transition-all" />
                    </div>
                  </div>
                </Link>
              </motion.div>
            ))}
          </div>
        ) : filteredPosts.length === 0 ? (
          /* Empty State for category with 0 posts */
          <div className="text-center py-16 px-4 rounded-3xl bg-ink-soft/50 border border-white/10 max-w-xl mx-auto my-8">
            <div className="w-12 h-12 rounded-2xl bg-brand-orange/15 border border-brand-orange/30 text-brand-orange flex items-center justify-center mx-auto mb-4">
              <Sparkles className="w-6 h-6" />
            </div>
            <h3 className="font-display uppercase text-xl text-white tracking-wide mb-2">
              No Articles In {selectedCategory} Yet
            </h3>
            <p className="font-body text-sm text-white/60 mb-6 max-w-md mx-auto">
              We are actively crafting detailed playbooks and breakdowns for this category. Check back soon or browse all topics.
            </p>
            <button
              type="button"
              onClick={() => handleCategoryChange("All")}
              className="inline-flex items-center gap-2 px-5 py-2.5 rounded-full text-xs font-body font-semibold bg-brand-gradient text-white shadow-md shadow-brand-orange/20 hover:brightness-110 transition-all"
            >
              <span>Browse All Articles</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </button>
          </div>
        ) : null}

        {/* Pagination */}
        {totalPages > 1 && (
          <div className="mt-14 flex items-center justify-center gap-4">
            <button
              type="button"
              disabled={currentPage === 1}
              onClick={() => setCurrentPage((prev) => Math.max(1, prev - 1))}
              className="inline-flex items-center gap-1.5 px-4 py-2 rounded-full text-xs font-mono font-semibold bg-ink-soft border border-white/15 text-white hover:border-brand-orange/50 disabled:opacity-40 disabled:pointer-events-none transition-colors"
            >
              <ChevronLeft className="w-4 h-4" />
              <span>Previous</span>
            </button>

            <span className="text-xs font-mono text-white/50 px-2">
              Page {currentPage} of {totalPages}
            </span>

            <button
              type="button"
              disabled={currentPage === totalPages}
              onClick={() => setCurrentPage((prev) => Math.min(totalPages, prev + 1))}
              className="inline-flex items-center gap-1.5 px-4 py-2 rounded-full text-xs font-mono font-semibold bg-ink-soft border border-white/15 text-white hover:border-brand-orange/50 disabled:opacity-40 disabled:pointer-events-none transition-colors"
            >
              <span>Next</span>
              <ChevronRight className="w-4 h-4" />
            </button>
          </div>
        )}
      </div>
    </section>
  );
}

