/**
 * Services data for TechUP Digital.
 * SPEC RULES:
 * - The Technical & IT division is NOT shown.
 * - NEVER show prices.
 * - All editable text lives here.
 */

export interface ServiceDivision {
  id: string;
  number: string;
  title: string;
  shortTitle: string;
  slug: string;
  promise: string;
  shortDescription: string;
  includedServices: string[];
  bestFor: string[];
  valueDelivered: string;
  contactServiceParam: string;
}

export const SERVICE_DIVISIONS: ServiceDivision[] = [
  {
    id: "content-video",
    number: "01",
    title: "Content & Video",
    shortTitle: "Video",
    slug: "content-video",
    promise:
      "Consistent, high-quality content that keeps your audience watching.",
    shortDescription:
      "Reels, long videos and podcasts that keep your audience watching.",
    includedServices: [
      "Short-form video & reels editing",
      "Long-form & podcast editing",
      "Content repurposing (long into short clips)",
      "Reels & social video pacing",
      "Creator & business content editing",
      "Cinematic & promotional brand editing",
    ],
    bestFor: [
      "Creators & Influencers",
      "Personal Brands",
      "Businesses Growing on Social",
      "Coaches, Educators & Founders",
    ],
    valueDelivered:
      "Consistent output that improves presentation, viewer retention, engagement, and brand credibility.",
    contactServiceParam: "Content & Video",
  },
  {
    id: "branding-design",
    number: "02",
    title: "Branding & Design",
    shortTitle: "Branding",
    slug: "branding-design",
    promise: "A visual identity that makes you look as good as you are.",
    shortDescription:
      "A look that makes your brand feel unmistakably professional.",
    includedServices: [
      "Logo design & brand guidelines",
      "Brand identity systems & typography",
      "High-impact social media creatives",
      "YouTube thumbnails & banner graphics",
      "Promotional posters & campaign graphics",
      "Digital assets for business communication",
    ],
    bestFor: [
      "Businesses Building Identity",
      "Modern Creators",
      "Startups & Growing Brands",
      "Local Businesses Going Digital",
    ],
    valueDelivered:
      "A cohesive, high-trust appearance through stronger visual identity and polished creative assets.",
    contactServiceParam: "Branding & Design",
  },
  {
    id: "web-digital",
    number: "03",
    title: "Web & Digital Presence",
    shortTitle: "Web",
    slug: "web-digital",
    promise: "A website that earns trust before you say a word.",
    shortDescription:
      "A website that turns curious visitors into paying customers.",
    includedServices: [
      "Modern business & corporate websites",
      "High-converting landing pages",
      "Creator & professional portfolio sites",
      "WordPress websites & ongoing maintenance",
      "Mobile-responsive, SEO-first architecture",
      "Speed, security & analytics integration",
    ],
    bestFor: [
      "Businesses Needing Strong Online Authority",
      "Professionals Building Credibility",
      "Startups & Service Providers",
      "Local Businesses Upgrading from Social-Only",
    ],
    valueDelivered:
      "A rock-solid digital foundation that improves organic search, brand authority, and client conversions.",
    contactServiceParam: "Web & Digital Presence",
  },
  {
    id: "growth-support",
    number: "04",
    title: "Growth & Digital Support",
    shortTitle: "Growth",
    slug: "growth-support",
    promise: "The steady creative support behind your online growth.",
    shortDescription:
      "Ongoing help to keep your brand consistently active and relevant online.",
    includedServices: [
      "Content strategy & monthly planning support",
      "Social media creative execution",
      "Campaign visual rollout",
      "Ongoing brand communication support",
      "Recurring creative asset turnaround",
      "Digital growth advisory & coordination",
    ],
    bestFor: [
      "Businesses Marketing Actively Online",
      "Brands Needing Recurring Creative Muscle",
      "Founders & Creators Building Visibility",
      "Agencies Needing Overflow Production",
    ],
    valueDelivered:
      "Consistent, timely execution of brand communication without the headache of managing multiple freelancers.",
    contactServiceParam: "Growth Support",
  },
];

export interface EngagementModel {
  id: string;
  title: string;
  badge?: string;
  isPopular?: boolean;
  description: string;
  idealFor: string;
  features: string[];
}

export const ENGAGEMENT_MODELS: EngagementModel[] = [
  {
    id: "retainer",
    title: "Monthly Retainer",
    badge: "Most Chosen",
    isPopular: true,
    description:
      "Dedicated monthly creative and video production support for consistent, predictable output.",
    idealFor:
      "Active brands and creators wanting continuous content and priority turnaround.",
    features: [
      "Agreed monthly volume of videos/designs",
      "Guaranteed turnaround times",
      "Dedicated slack/chat communication",
      "Continuous brand consistency",
    ],
  },
  {
    id: "project",
    title: "Project-Based",
    description:
      "Fixed-scope execution for defined projects such as a website launch, rebrand, or campaign.",
    idealFor:
      "Clients with specific deliverables and a clear timeline in mind.",
    features: [
      "Defined scope & milestone roadmap",
      "Transparent deliverables & timeline",
      "Dedicated sprint delivery",
      "Post-launch handover & review",
    ],
  },
  {
    id: "creative-package",
    title: "Creative Support Package",
    description:
      "Pre-bundled bundles of creatives, reels, or design assets tailored to seasonal or growth pushes.",
    idealFor:
      "Teams needing a boost in creative output without committing to an ongoing retainer.",
    features: [
      "Curated asset combinations",
      "Streamlined onboarding & production",
      "Standardized revision rounds",
      "High speed-to-market",
    ],
  },
  {
    id: "custom",
    title: "Custom Digital Solution",
    description:
      "A tailored hybrid of content production, brand design, and web development built to your requirements.",
    idealFor:
      "Growing companies needing a flexible extension of their internal marketing team.",
    features: [
      "Bespoke mix of services",
      "Flexible allocation month-to-month",
      "Founder-level strategic oversight",
      "Custom workflow integrations",
    ],
  },
];
