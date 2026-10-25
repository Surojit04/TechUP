/**
 * Portfolio Work items for TechUP Digital.
 * SPEC RULES:
 * - NEVER invent clients, numbers, awards or testimonials.
 * - Use placeholders: [CLIENT NAME], [XX].
 * - Hide results strip until real numbers exist (showResultsStrip = false).
 */

export type WorkCategory =
  | "reels"
  | "long-form"
  | "branding"
  | "thumbnails"
  | "websites";

export interface WorkItem {
  id: string;
  slug: string;
  title: string;
  category: WorkCategory;
  categoryLabel: string;
  client: string;
  poster: string;
  video?: string;
  description: string;
  result?: string;
  toolsUsed?: string[];
  featured: boolean;
  aspectRatio: "9/16" | "16/9" | "1/1";
}

export const WORK_CATEGORIES: { id: "all" | WorkCategory; label: string }[] = [
  { id: "all", label: "All" },
  { id: "reels", label: "Reels & Short-form" },
  { id: "long-form", label: "Long-form & Podcasts" },
  { id: "branding", label: "Branding & Design" },
  { id: "thumbnails", label: "Thumbnails" },
  { id: "websites", label: "Websites" },
];

export const WORK_ITEMS: WorkItem[] = [
  {
    id: "work-1",
    slug: "high-retention-reel-client-1",
    title: "High-Retention Instagram Reel for [CLIENT NAME]",
    category: "reels",
    categoryLabel: "Reels & Short-form",
    client: "[CLIENT NAME]",
    poster: "/thumbnails/reel-placeholder-1.svg",
    video: "/reels/Reel 2_Before After.mp4",
    description:
      "Dynamic pacing, kinetic typography, and motion graphics built to maximize watch time and viewer engagement.",
    result: "[XX]% watch time boost",
    toolsUsed: ["Premiere Pro", "After Effects"],
    featured: true,
    aspectRatio: "9/16",
  },
  {
    id: "work-2",
    slug: "brand-identity-system-client-2",
    title: "Comprehensive Brand Identity for [CLIENT NAME]",
    category: "branding",
    categoryLabel: "Branding & Design",
    client: "[CLIENT NAME]",
    poster: "/thumbnails/brand-placeholder-1.svg",
    description:
      "Modern logo suite, distinct typographic hierarchy, color language, and corporate digital asset guidelines.",
    result: "Complete identity rollout",
    toolsUsed: ["Illustrator", "Photoshop", "Figma"],
    featured: true,
    aspectRatio: "1/1",
  },
  {
    id: "work-3",
    slug: "corporate-presence-website-client-3",
    title: "Corporate Web Platform for [CLIENT NAME]",
    category: "websites",
    categoryLabel: "Websites",
    client: "[CLIENT NAME]",
    poster: "/thumbnails/web-placeholder-1.svg",
    description:
      "SEO-optimized Next.js web presence featuring smooth page transitions and responsive quote conversion funnels.",
    result: "[XX]ms load time & 100 SEO score",
    toolsUsed: ["Next.js", "Tailwind CSS", "TypeScript"],
    featured: true,
    aspectRatio: "16/9",
  },
  {
    id: "work-4",
    slug: "podcast-episode-edit-client-4",
    title: "Multicam Podcast Episode for [CLIENT NAME]",
    category: "long-form",
    categoryLabel: "Long-form & Podcasts",
    client: "[CLIENT NAME]",
    poster: "/thumbnails/podcast-placeholder-1.svg",
    description:
      "Full episode audio mastering, multicam auto-switching, and color grading tailored for YouTube audiences.",
    result: "[XX]K+ organic YouTube views",
    toolsUsed: ["DaVinci Resolve", "Audition"],
    featured: false,
    aspectRatio: "16/9",
  },
  {
    id: "work-5",
    slug: "youtube-thumbnail-suite-client-5",
    title: "High-CTR Thumbnail Suite for [CLIENT NAME]",
    category: "thumbnails",
    categoryLabel: "Thumbnails",
    client: "[CLIENT NAME]",
    poster: "/thumbnails/thumbnail-placeholder-1.svg",
    description:
      "Vibrant high-contrast YouTube thumbnails designed for maximum click-through rates across mobile and desktop feeds.",
    result: "[XX]% CTR increase",
    toolsUsed: ["Photoshop", "Lightroom"],
    featured: false,
    aspectRatio: "16/9",
  },
  {
    id: "work-6",
    slug: "founder-personal-brand-reel-client-6",
    title: "Founder Authority Reel for [CLIENT NAME]",
    category: "reels",
    categoryLabel: "Reels & Short-form",
    client: "[CLIENT NAME]",
    poster: "/thumbnails/reel-placeholder-2.svg",
    video: "/reels/02. Before After (04. Best In The Room) (07. June-July) (02. July) (1).mp4",
    description:
      "Story-driven personal branding edit with sound design, B-roll layering, and captioned takeaways for LinkedIn & Instagram.",
    result: "[XX]K+ organic reach",
    toolsUsed: ["Premiere Pro", "After Effects"],
    featured: true,
    aspectRatio: "9/16",
  },
  {
    id: "work-7",
    slug: "social-creatives-pack-client-7",
    title: "Monthly Social Creatives for [CLIENT NAME]",
    category: "branding",
    categoryLabel: "Branding & Design",
    client: "[CLIENT NAME]",
    poster: "/thumbnails/brand-placeholder-2.svg",
    description:
      "Series of high-impact promotional carousel graphics and announcement posters for LinkedIn and Instagram campaigns.",
    result: "Cohesive visual cadence",
    toolsUsed: ["Photoshop", "Illustrator"],
    featured: false,
    aspectRatio: "1/1",
  },
  {
    id: "work-8",
    slug: "creator-portfolio-site-client-8",
    title: "Creator Portfolio Site for [CLIENT NAME]",
    category: "websites",
    categoryLabel: "Websites",
    client: "[CLIENT NAME]",
    poster: "/thumbnails/web-placeholder-2.svg",
    description:
      "Interactive creator portfolio showcasing brand collaborations, media kit downloads, and direct inquiry booking.",
    result: "[XX]+ brand partnership inquiries",
    toolsUsed: ["Next.js", "Framer Motion", "Tailwind CSS"],
    featured: false,
    aspectRatio: "16/9",
  },
  {
    id: "work-9",
    slug: "educational-explainer-reel-client-9",
    title: "Educational Explainer Reel for [CLIENT NAME]",
    category: "reels",
    categoryLabel: "Reels & Short-form",
    client: "[CLIENT NAME]",
    poster: "/thumbnails/reel-placeholder-3.svg",
    description:
      "Fast-paced breakdown video with customized motion graphics, pop-up citations, and sound effects for coaches & educators.",
    result: "[XX]K+ shares & saves",
    toolsUsed: ["Premiere Pro", "After Effects"],
    featured: false,
    aspectRatio: "9/16",
  },
  {
    id: "work-10",
    slug: "long-form-documentary-edit-client-10",
    title: "Brand Story Documentary Edit for [CLIENT NAME]",
    category: "long-form",
    categoryLabel: "Long-form & Podcasts",
    client: "[CLIENT NAME]",
    poster: "/thumbnails/podcast-placeholder-2.svg",
    description:
      "Cinematic documentary narrative with archival footage treatments, custom audio track mixing, and sound design.",
    result: "[XX] min average view duration",
    toolsUsed: ["DaVinci Resolve", "Premiere Pro"],
    featured: false,
    aspectRatio: "16/9",
  },
  {
    id: "work-11",
    slug: "campaign-key-visual-suite-client-11",
    title: "Product Launch Key Visuals for [CLIENT NAME]",
    category: "branding",
    categoryLabel: "Branding & Design",
    client: "[CLIENT NAME]",
    poster: "/thumbnails/brand-placeholder-3.svg",
    description:
      "Omnichannel visual direction, digital ad creative variations, and billboard-ready master design assets.",
    result: "Multi-platform rollout",
    toolsUsed: ["Illustrator", "Photoshop"],
    featured: false,
    aspectRatio: "1/1",
  },
  {
    id: "work-12",
    slug: "youtube-viral-thumbnail-pack-client-12",
    title: "Finance Channel Thumbnail Pack for [CLIENT NAME]",
    category: "thumbnails",
    categoryLabel: "Thumbnails",
    client: "[CLIENT NAME]",
    poster: "/thumbnails/thumbnail-placeholder-2.svg",
    description:
      "Emotion-driven face framing, 3D asset integration, and clear typography hierarchy built for high search & browse CTR.",
    result: "[XX]% higher impressions-to-views",
    toolsUsed: ["Photoshop", "Blender"],
    featured: false,
    aspectRatio: "16/9",
  },
];

/**
 * Results Counters Strip.
 * SPEC RULE: "Hide the results counters strip until real numbers exist."
 */
export const RESULTS_STRIP_CONFIG = {
  showResultsStrip: false, // Flag to keep hidden until owner provides real numbers
  counters: [
    { label: "Videos Delivered", value: "[XX]+" },
    { label: "Happy Clients", value: "[XX]+" },
    { label: "Average Relationship", value: "[XX] mos" },
  ],
};
