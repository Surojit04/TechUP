# TechUP Digital Website

> **"Your Vision, Our Precision"**  
> Creative & digital solutions agency delivering video editing, branding & design, modern web presence, and growth support for Indian brands and creators.

---

## 📌 Source of Truth

The single source of truth for architecture, content, design tokens, and behavior is [`/docs/SPEC.md`](./docs/SPEC.md). Always consult this document before adding or modifying features.

---

## 🛠️ Tech Stack

- **Framework**: Next.js 14 (App Router) + TypeScript
- **Styling**: Tailwind CSS with custom design tokens (`tailwind.config.ts`, `globals.css`)
- **UI Animation**: Framer Motion & GSAP ScrollTrigger
- **Smooth Scroll**: Lenis (with `prefers-reduced-motion` compliance)
- **Blog Engine**: MDX files located in `/content/blog/` parsed with `gray-matter` & `next-mdx-remote/rsc`
- **Quote Form & Email**: Next.js Server Action (`app/actions/contact.ts`) with Zod validation, rate limiting, and Resend delivery to `tchup.official@gmail.com`
- **Booking**: Cal.com lazy-loaded embed modal (`NEXT_PUBLIC_CAL_LINK`)
- **Analytics**: Vercel Analytics (`@vercel/analytics`) with privacy-friendly event tracking & cookie notice
- **Icons**: Lucide React

---

## ⚡ Hard Rules & Conventions

1. **Tokens Only**: All colors, typography, and spacing originate from Tailwind tokens in `tailwind.config.ts` and `app/globals.css`. Never use hard-coded colors or pixel values.
2. **Editable Text**: All copy lives in `/content/*.ts` and `/content/blog/*.mdx`. Never hard-code copy inside layout or section components.
3. **No Pricing & No Invented Proof**:
   - NEVER show prices anywhere on the site. All price inquiries route to "Get a Quote" or WhatsApp.
   - Use placeholders: `[CLIENT LOGO]`, `[TESTIMONIAL]`, `[CLIENT NAME]`, `[XX]`.
   - Results counters strip is hidden until confirmed numbers exist (`RESULTS_STRIP_CONFIG.showResultsStrip = false` in `content/work.ts`).
4. **Division Restrictions**: The Technical & IT division is NOT displayed on the site.
5. **Contact Constants**: Email (`tchup.official@gmail.com`), WhatsApp number (`WA_NUMBER`), and Instagram handle (`@techup.digital`) reside ONLY in [`/lib/site.ts`](./lib/site.ts). Every WhatsApp link across the site is generated via `getWhatsAppUrl()`.
6. **Motion**: Animate only `transform` and `opacity` (plus `clip-path` and accordion height). Honor `prefers-reduced-motion: reduce`. Tilt, magnetic, and custom cursor effects are automatically disabled on touch devices.
7. **Accessibility**: 2px orange focus ring (`:focus-visible`), 44px minimum touch targets, WCAG AA contrast, semantic HTML, and skip links.

---

## 🚀 Getting Started

### 1. Install Dependencies
```bash
npm install
```

### 2. Environment Variables
Create a local `.env.local` file:
```bash
cp .env.example .env.local
```
Fill in your keys:
```env
# Email Service (Resend)
RESEND_API_KEY=re_your_api_key_here
CONTACT_EMAIL=tchup.official@gmail.com
RESEND_FROM_EMAIL=TechUP Digital <onboarding@resend.dev>

# Optional Cal.com Booking Link (e.g. techup-digital/intro)
NEXT_PUBLIC_CAL_LINK=
```

### 3. Run Development Server
```bash
npm run dev
```
Open [http://localhost:3000](http://localhost:3000) in your browser.

### 4. Build and Lint
```bash
npm run lint
npm run build
npm start
```

---

## 📝 Updating Copy & Adding Blog Posts

### Updating Site Copy in `/content`
- **Home Page**: Edit [`/content/home.ts`](./content/home.ts)
- **Services & Engagement Models**: Edit [`/content/services.ts`](./content/services.ts)
- **Portfolio / Work**: Edit [`/content/work.ts`](./content/work.ts)
- **About Page**: Edit [`/content/about.ts`](./content/about.ts)
- **Team**: Edit [`/content/team.ts`](./content/team.ts)
- **FAQs**: Edit [`/content/faq.ts`](./content/faq.ts)
- **Clients**: Edit [`/content/clients.ts`](./content/clients.ts)
- **Testimonials**: Edit [`/content/testimonials.ts`](./content/testimonials.ts)

### Adding a New MDX Blog Post
1. Create a new `.mdx` file in [`/content/blog/your-post-slug.mdx`](./content/blog/)
2. Include the required front matter schema:
```markdown
---
title: "Your Post Title Here"
slug: "your-post-slug"
description: "A compelling summary of the article between 140 and 160 characters."
date: "2026-10-17"
updated: "2026-10-17"
category: "Video Editing" # One of: Video Editing | Branding | Websites | Growth
tags: ["Reels", "Content Strategy", "Creator Growth"]
cover: "/thumbnails/reel-placeholder-1.svg"
coverAlt: "Descriptive alt text for the cover image"
author: "TechUP Digital Team"
readTime: "5 min read"
---

## Why This Topic Matters

Write your content here using standard Markdown. You can include:
- Headings (`##`, `###`)
- Bullet points and numbered lists
- Blockquotes (`> Note: ...`)
- Bold and italic text

## Actionable Takeaways

Summary points for the reader...
```
3. The blog engine will automatically parse the file, add it to `/blog`, generate a dedicated route at `/blog/[slug]`, inject Schema.org `Article` and `BreadcrumbList` JSON-LD schemas, and update the dynamic `sitemap.xml`!

---

## 📊 Analytics Event Tracking

Vercel Analytics tracks 5 key user interactions defined in SPEC Section 14:
1. `quote_submit`: Fired when the quote intake form is submitted successfully.
2. `whatsapp_click`: Fired when any WhatsApp button or link is clicked (tracks `source`).
3. `booking_click`: Fired when the "Book a Call" card is clicked or Cal.com modal is opened.
4. `instagram_click`: Fired when the Instagram social link is clicked.
5. `reel_play`: Fired when a reel video preview is hovered or clicked.
