/**
 * Testimonials content.
 * SPEC RULE: Never invent testimonials. Use clearly marked placeholders until real content arrives.
 */

export interface TestimonialItem {
  id: string;
  quote: string;
  clientName: string;
  role: string;
  brand: string;
  isPlaceholder: boolean;
  avatarUrl?: string;
}

export const TESTIMONIALS: TestimonialItem[] = [
  {
    id: "testimonial-1",
    quote:
      "[TESTIMONIAL] TechUP Digital streamlined our entire post-production pipeline with remarkable speed, precision, and consistency across all our weekly reels.",
    clientName: "[CLIENT NAME]",
    role: "Founder",
    brand: "[CLIENT BRAND]",
    isPlaceholder: true,
  },
  {
    id: "testimonial-2",
    quote:
      "[TESTIMONIAL] Having one team handle both our visual identity and monthly content turned our brand presence into a cohesive, high-converting digital machine.",
    clientName: "[CLIENT NAME]",
    role: "Marketing Lead",
    brand: "[CLIENT BRAND]",
    isPlaceholder: true,
  },
  {
    id: "testimonial-3",
    quote:
      "[TESTIMONIAL] The precision and founder-led accountability set them apart. We no longer spend hours juggling separate freelancers for design, video, and web.",
    clientName: "[CLIENT NAME]",
    role: "Content Creator",
    brand: "[CREATOR CHANNEL]",
    isPlaceholder: true,
  },
  {
    id: "testimonial-4",
    quote:
      "[TESTIMONIAL] Clean execution, fast turnarounds, and creative direction that truly understood our audience from day one.",
    clientName: "[CLIENT NAME]",
    role: "Managing Director",
    brand: "[CLIENT BRAND]",
    isPlaceholder: true,
  },
];
