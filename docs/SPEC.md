# TechUP Digital Website Architecture & Content Spec

Oct 9, 2026 · @Dwaipayan Saha

## 1. Overview

This site presents TechUP Digital as a one-stop digital partner for Indian brands and creators, and turns visitors into quote requests or WhatsApp chats. Every page below carries one job: build trust, then push the visitor to "Get a Quote".

| Item | Decision |
| --- | --- |
| Company | TechUP Digital, digital solutions agency. Tagline: "Your Vision, Our Precision" |
| Audience | India-focused: brands, startups, creators and influencers, coaches and educators, local businesses |
| Primary conversion | Quote form submission, WhatsApp chat (+91 9831710140), or a booked call |
| Secondary conversion | Instagram follow (@techup.digital), blog subscription |
| Pricing | Never shown. Every price question routes to "Get a Quote" |
| Services shown | Content & Video, Branding & Design, Web & Digital Presence, Growth Support. The Technical & IT division is not shown |
| Style | Polished, bold, premium, with rich 2D motion. No 3D or WebGL. One light/dark look, no theme toggle |
| Tone of voice | Confident, clear, plain English, short sentences. Speaks to the client's growth, not to the agency's tools |
| Contact email | tchup.official@gmail.com |

**Rules for all content**

- Never invent clients, numbers, awards or testimonials. Use clearly marked placeholders such as `[CLIENT NAME]` until real content arrives.
- Every page ends with the same final CTA band so the next step is always visible.
- Text in this spec marked "Copy:" is a proposed first draft; the owner may edit it.

## 2. Tech stack and project structure

| Layer | Choice | Why |
| --- | --- | --- |
| Framework | Next.js (App Router) + TypeScript | Fast loading, SEO-friendly, server rendering |
| Styling | Tailwind CSS with design tokens | Fast, consistent, easy to maintain |
| UI animation | Framer Motion | Reveals, hover effects, page transitions |
| Scroll | Lenis (smooth scroll) + GSAP ScrollTrigger | Smooth scroll everywhere; GSAP only for the hero and pinned moments |
| Blog | MDX files in the repo | No database, easy to add posts |
| Forms | Resend or Web3Forms, plus server action | Sends the quote form to the company email |
| Booking | Cal.com embed (free plan) | "Book a call" without custom code |
| Hosting | Vercel (code on GitHub) | Auto deploys on every push |
| Domain | Bought on Hostinger, DNS pointed to Vercel | Client already has a Hostinger account |

**Folder structure**

```text
/app
  layout.tsx            global shell: header, footer, WhatsApp button
  page.tsx              Home
  services/page.tsx     Services
  work/page.tsx         Work (portfolio)
  about/page.tsx        About
  blog/page.tsx         Blog listing
  blog/[slug]/page.tsx  Blog post
  contact/page.tsx      Contact
  sitemap.ts, robots.ts, not-found.tsx
/components
  layout/   Header, Footer, WhatsAppFloat, PageTransition, Cursor
  sections/ Hero, TrustedBy, ServicesGrid, Process, Testimonials, Team, CTABand ...
  ui/       Button, Card, Badge, SectionHeading, Marquee, Counter
/content
  blog/*.mdx            blog posts
  work.ts               portfolio items
  testimonials.ts, clients.ts, services.ts, team.ts
/public
  logos/ clients/ team/ reels/ thumbnails/ images/
/lib
  motion.ts (shared animation variants), seo.ts, utils.ts
```

Keep all editable text in `/content` files so the owner can update copy without touching components.

## 3. Sitemap and navigation

&#91;embedded content: sitemap · Home plus 5 pages\]

Home leads to five pages, and the Contact page (highlighted) holds the quote form that every call to action points to. Main navigation order: Home, Services, Work, About, Blog, Contact, with a "Get a Quote" button at the right of the header. Footer links repeat the same pages plus Privacy Policy and Terms.

## 4. Design system

Define every value below once as a Tailwind token or CSS variable and reuse it everywhere.

**Colors**

| Token | Value | Use |
| --- | --- | --- |
| `brand-orange` | `#E04A00` | Primary accent, links, key highlights |
| `brand-amber` | `#F57C00` | Gradient end, hover states |
| `brand-gradient` | `linear-gradient(180deg, #E04A00, #F57C00)` | Buttons, hero shapes, badges, big numbers |
| `ink` | `#0B0B0F` | Dark section background, main text on white |
| `ink-soft` | `#17171D` | Cards on dark sections |
| `paper` | `#FFFFFF` | White section background |
| `mist` | `#F5F5F7` | Cards and alternate light sections |
| `muted` | `#6B6B76` | Secondary text |

Alternate dark (`ink`) and light (`paper`) sections down each page. Text on dark is white; text on light is `ink`. All text must keep WCAG AA contrast.

**Typography**

| Role | Font | Size (desktop / mobile) |
| --- | --- | --- |
| Display heading (H1) | Bebas Neue or Teko, uppercase | 96px / 48px, line height 0.95 |
| Section heading (H2) | Same display font | 56px / 36px |
| Card title (H3) | Display font | 28px / 24px |
| Body | Inter or Manrope | 18px / 16px, line height 1.6 |
| Small / labels | Inter or Manrope, medium | 13-14px, letter spacing 0.08em, uppercase |

**Layout and spacing**

- Max content width 1200px, side padding 24px (mobile) and 48px (desktop).
- Section vertical padding 120px desktop, 72px mobile.
- Use an 8px spacing scale. Card radius 20px, button radius 999px (pill).
- Section dividers use the angular chevron shape from the logo (an SVG clip-path), not a straight line.

**Core components**

| Component | Behavior |
| --- | --- |
| Primary button | Orange gradient pill, white text, magnetic hover (see section 12), small rocket icon slides in on hover |
| Secondary button | Transparent with a 1.5px white or ink outline; fills with gradient on hover |
| Card | Radius 20px, subtle border, lifts 8px with a soft orange glow on hover |
| Section heading | Small uppercase eyebrow label in orange, large display title, one-line supporting text |
| Badge | Pill with a small label such as "Video", "Branding", "Web" |

## 5. Global elements (on every page)

| Element | Content | Behavior and effect |
| --- | --- | --- |
| Loader (first visit only) | TechUP logo mark on dark background, then the rocket lifts off the screen | 1.2s max, plays once per session, skipped if reduced motion is on |
| Header | Logo (left); links: Home, Services, Work, About, Blog, Contact; button "Get a Quote" (right) | Sticky. Transparent on the hero, then turns dark with blur after 80px scroll. Hides on scroll down, shows on scroll up. Active link has an orange underline that slides |
| Mobile menu | Full-screen dark overlay with large display-font links, the Quote button, WhatsApp and Instagram links | Opens with a circular reveal from the menu icon, links stagger in (60ms apart) |
| Floating WhatsApp button | Round green-and-white WhatsApp icon, bottom right, links to `wa.me/919831710140?text=Hi%20TechUP%20Digital%2C%20I%20want%20to%20know%20more%20about%20your%20services` | Gentle pulse ring every 6s. Tooltip "Chat with us" on hover (desktop). Sits above the footer on mobile |
| Footer | Logo and tagline; link columns (Services, Company, Resources); email, WhatsApp, Instagram; "Get a Quote" button; copyright line | Dark. Large faded "TECH UP" wordmark behind the text; columns fade up on scroll |
| Page transition | Orange gradient panel with a chevron edge sweeps across between pages | 500ms. Uses Framer Motion `AnimatePresence`. Disabled for reduced motion |
| Custom cursor | Small orange dot with a larger trailing ring | Desktop with a mouse only. Ring grows over buttons and links, and shows "View" over portfolio cards. Hidden on touch devices |
| Scroll progress | Thin orange line at the top of the screen | Fills with page scroll |
| Smooth scroll | Lenis | Duration about 1.1s. Anchor links scroll smoothly |
| 404 page | Large "404", text "This page took off without us", button back to Home | Rocket floats gently up and down |

**Final CTA band (reused at the bottom of every page)**

- Background: orange gradient with a faint chevron pattern.
- Copy: **"Ready to level up your brand?"** / "Tell us what you need. We'll reply with a clear plan and quote."
- Buttons: "Get a Quote" (white pill) and "Chat on WhatsApp" (outline pill).
- Effect: the headline reveals word by word; the buttons are magnetic.

## 6. Home page (`/`)

Goal: in 5 seconds the visitor knows what TechUP does, sees proof, and finds the Quote button. Sections run top to bottom in this order, alternating dark and light backgrounds.

### 6.1 Hero (dark)

- **Purpose:** state the offer and get the first click.
- **Layout:** left, text block; right, a stylised rocket lifting off from a monitor (the logo idea) with an orange glow and trail. Chevron shape cuts the bottom edge.
- **Eyebrow:** "Digital Solutions Agency"
- **Headline (H1):** "YOUR VISION. OUR PRECISION."
- **Sub-text:** "Video editing, branding and websites for brands and creators who want to grow online. One team, one standard of quality."
- **Buttons:** "Get a Quote" (primary), "View Our Work" (secondary)
- **Small proof line:** "Trusted by creators and brands across India" `[confirm before publishing]`
- **Effects:** headline reveals line by line (mask slide-up, 80ms stagger); the rocket rises slowly and a vertical trail line draws behind it, then it hovers with a gentle float; background has soft orange light blobs that follow the mouse slightly (desktop); a small "Scroll" indicator bounces at the bottom.

### 6.2 Trusted By (light)

- **Purpose:** instant credibility.
- **Heading:** "TRUSTED BY" (small, centered, uppercase, letter-spaced)
- **Content:** one row of client logos in an infinite marquee, using all logos in `/public/clients`.
- **Effects:** logos are grayscale at 60% opacity and turn full color on hover; the marquee moves right to left at a slow constant speed and pauses on hover; soft fade on both edges. Show two rows moving in opposite directions if there are more than 12 logos.
- **Placeholder rule:** until real logos arrive, show 8 neutral gray boxes labelled `[CLIENT LOGO]`.

### 6.3 What we do (dark)

- **Eyebrow:** "What we do"
- **Heading:** "ONE PARTNER FOR YOUR WHOLE DIGITAL PRESENCE"
- **Text:** "Most brands juggle separate freelancers for editing, design and websites. That means delays, mismatched styles and endless follow-ups. TechUP Digital brings content, creative and web under one roof, with one point of contact."
- **Layout:** large text on the left; on the right three short statements with check icons: "Consistent content, every month", "Branding that looks professional", "A website that builds trust".
- **Effects:** words of the heading highlight to white one by one as the section scrolls into view; check icons draw themselves.

### 6.4 Services (light)

- **Eyebrow:** "Our services"; **Heading:** "EVERYTHING YOUR BRAND NEEDS TO GROW"
- **Layout:** four large cards (2x2 on desktop, one column on mobile). Each card has an icon, title, one line, three bullet services, and a "Learn more" arrow linking to its section on `/services`.

| Card | One-line description | Bullet services |
| --- | --- | --- |
| Content & Video | Reels, long videos and podcasts that keep your audience watching | Short-form and reels editing; long-form and podcast editing; content repurposing |
| Branding & Design | A look that makes your brand feel professional | Logo and brand identity; social media creatives; thumbnails and posters |
| Web & Digital Presence | A website that turns visitors into customers | Business and portfolio websites; landing pages; WordPress sites and support |
| Growth & Digital Support | Ongoing help to keep your brand active online | Content planning support; campaign creatives; monthly support packages |

- **Effects:** cards fade up in sequence; on hover the card tilts in 3D toward the cursor (max 6 degrees), an orange gradient border glows, the icon animates, and the arrow slides right. Tilt is disabled on touch devices.

### 6.5 Featured work (dark)

- **Eyebrow:** "Our work"; **Heading:** "WORK THAT SPEAKS FOR ITSELF"
- **Content:** 3 to 6 items from the portfolio: reels (vertical 9:16 cards) and design pieces. Each shows a poster image, title, category badge and client name.
- **Layout:** horizontal draggable slider on mobile; 3-column grid on desktop with the middle card slightly raised.
- **Effects:** reel cards play a muted preview on hover (desktop) or when centered (mobile); custom cursor shows "View"; cards parallax slightly on scroll. Button "See All Work" links to `/work`.

### 6.6 Why TechUP (light)

- **Eyebrow:** "Why choose us"; **Heading:** "BUILT FOR BRANDS THAT WANT TO KEEP GROWING"
- **Content:** five feature cards, taken from the company profile:

| Title | Text |
| --- | --- |
| Everything under one roof | Content, design, branding and web support, so you manage one team instead of many freelancers |
| Content plus creativity plus presence | We look at your whole digital brand, not only the edit or the design |
| Built for monthly support | Retainers and packages for long-term, consistent output |
| Founder-led attention | Your work gets direct attention and accountability |
| Growth-focused delivery | We care about trust, consistency and visibility, not just delivering files |

- **Effects:** cards stagger in; an orange number (01 to 05) in the display font counts in; a thin line connects the cards as the user scrolls.

### 6.7 How we work (dark)

- **Eyebrow:** "Our process"; **Heading:** "FROM FIRST CHAT TO FINISHED WORK"
- **Steps:** 1 Discover (we understand your brand and goals) -> 2 Plan (we agree scope, timeline and quote) -> 3 Create (we produce, with clear review rounds) -> 4 Deliver and grow (final files, then ongoing support)
- **Layout:** a horizontal line with four nodes on desktop; a vertical timeline on mobile.
- **Effects:** the line draws itself with scroll; each node lights orange and its card slides in when reached; a small rocket icon travels along the line.

### 6.8 Engagement models (light)

- **Heading:** "WORK WITH US YOUR WAY"
- **Cards:** Monthly Retainer, Project-Based, Creative Support Package, Custom Digital Solution (descriptions from the profile). No prices. Each card's button says "Get a Quote".
- **Effects:** hover lift with orange glow; the most popular card (Monthly Retainer) has a "Most chosen" badge `[confirm]`.

### 6.9 Testimonials (dark)

- **Heading:** "WHAT OUR CLIENTS SAY"
- **Content:** 3 to 6 testimonial cards: quote, client name, role and brand, optional photo or logo. Use `[TESTIMONIAL]` placeholders until real quotes are supplied.
- **Effects:** auto-sliding carousel (5s) with drag, arrows and dots; the active card is centered and scaled up, others are dimmed; pause on hover.

### 6.10 Our team (light)

- **Purpose:** put real faces behind the brand, so visitors trust who they are hiring.
- **Eyebrow:** "Our team"; **Heading:** "THE PEOPLE BEHIND YOUR WORK"
- **Sub-text:** "A founder-led team that treats your brand like its own."
- **Content:** one card for each of the 6 core members, in this order, each with a portrait photo, name and designation:

| # | Name | Designation shown on the site |
| --- | --- | --- |
| 1 | Dwaipayan Saha | Founder & CEO |
| 2 | Manish Kumar Parui | COO |
| 3 | Mayukh Mukherjee | CFO |
| 4 | Surojit Dutta | IT Support Specialist |
| 5 | Shreyansa Patni | Strategic Partner |
| 6 | Arnab Karmakar | Technical Support |

- **Designation check:** the brief said "Founder & SEO". This spec uses "Founder & CEO", matching the company profile. `[owner to confirm]`
- **Layout:** 3 columns by 2 rows on desktop, 2 columns on tablet, a swipeable row of cards on mobile. All cards are the same size; the founder card comes first.
- **Photo rules:** portrait 4:5 ratio (at least 800x1000px), same background color and similar lighting for all six, shoulders-up crop, WebP via `next/image`. Alt text: "Name, designation". Until photos arrive, show a neutral silhouette with the person's initials.
- **Card design:** photo with an orange gradient frame offset behind it; name in the display font below; designation as a small orange uppercase label. Optional small LinkedIn or Instagram icons if the member shares a link.
- **Effects:** cards fade up with a 100ms stagger; photos are slightly desaturated and turn full color on hover while the card lifts 8px; the gradient frame shifts a few pixels toward the cursor; social icons fade in on hover (always visible on touch devices).
- **Button:** "Meet the Full Team" links to `/about#team`.

### 6.11 Blog teaser (dark)

- **Heading:** "LATEST FROM THE BLOG"; the three newest posts as cards (image, category, title, read time). Button "Read More Articles".
- **Effects:** image zooms 5% on hover; title underline draws left to right.

### 6.12 Final CTA band

Use the reusable CTA band from section 5.

## 7. Services page (`/services`)

Goal: let each visitor find their service quickly, understand the value, and request a quote for it.

### 7.1 Page hero (dark, short)

- **Eyebrow:** "Services"; **H1:** "DIGITAL SERVICES BUILT AROUND YOUR GROWTH"
- **Sub-text:** "Content, creative and web, delivered by one reliable team."
- **Sticky sub-navigation** under the header with four anchor chips: Content & Video, Branding & Design, Web & Digital Presence, Growth Support.
- **Effects:** the chip for the section in view is highlighted with the orange gradient; clicking scrolls smoothly. Heading reveals word by word.

### 7.2 Service sections (one per division, alternating light and dark)

Each section uses the same layout: left, text; right, a visual (a looping reel mockup, a design collage, a browser mockup). The order alternates left and right. Each section contains: a number and title, a one-line promise, a "Services included" list, a "Best for" row of badges, a "Value delivered" sentence, and a "Get a Quote for this service" button that opens `/contact?service=<name>` with the service pre-selected.

| Section | Promise (copy) | Services included | Best for | Value delivered |
| --- | --- | --- | --- | --- |
| 01 Content & Video | "Consistent, high-quality content that keeps your audience watching." | Short-form video editing; long-form editing; podcast editing; reels and social video; creator and business content editing; repurposing long content into short assets; cinematic and promotional editing | Creators and influencers; personal brands; businesses growing on social media; coaches, educators and founder-led brands | Consistent output that improves presentation, engagement and brand credibility |
| 02 Branding & Design | "A visual identity that makes you look as good as you are." | Logo design; brand identity support; social media creatives; posters and banners; thumbnail design; campaign graphics; digital assets for business communication | Businesses building identity; creators; startups and local businesses | A professional look through stronger branding and better creative assets |
| 03 Web & Digital Presence | "A website that earns trust before you say a word." | Business websites; portfolio websites; landing pages; WordPress websites and support; presence websites for creators, businesses and professionals | Businesses needing a stronger online identity; professionals building authority; startups and service providers | A stronger digital foundation that improves trust, professionalism and discoverability |
| 04 Growth & Digital Support | "The steady creative support behind your online growth." | Content support and planning; social media creative support; campaign creative execution; ongoing support for brand communication; selected growth-oriented creative services | Businesses marketing online; brands needing recurring support; founders and creators building visibility | Consistency and better execution of content, communication and brand building |

- **Effects per section:** the big section number (01 to 04) in outlined display type slides in from the side; included services appear one by one with a check icon drawing; the visual has parallax; badges pop in last.
- **Visuals:** Content & Video, a phone frame playing a muted reel loop; Branding, a collage of logos and posters that shuffles on hover; Web, a laptop mockup that scrolls its screen image as the user scrolls; Growth, an animated content calendar graphic.

### 7.3 Engagement models (dark)

Show the four models (Monthly Retainer, Project-Based, Creative Support Packages, Custom Digital Solutions) as a horizontal tabbed block. Selecting a tab changes the description and "Ideal for" line with a cross-fade. Each tab ends with a "Get a Quote" button.

### 7.4 FAQ (light)

Accordion with smooth height animation and a rotating plus icon. Questions (answers to be confirmed by the owner):

- What services do you offer?
- How do monthly retainers work?
- How do I get a price?  (Answer: "Every project is different, so we quote after a short chat. Use the Get a Quote button or WhatsApp us.")
- How long does a project take?
- How many revisions are included?
- Do you work with creators and small businesses?
- How do we share files and approvals?

Add FAQ structured data (JSON-LD) for search engines.

### 7.5 Final CTA band

Reuse the CTA band from section 5.

## 8. Work page (`/work`)

Goal: prove quality. The page is a visual showcase with filters, built from `/content/work.ts`.

### 8.1 Page hero (dark, short)

- **Eyebrow:** "Our work"; **H1:** "PROOF, NOT PROMISES"; **Sub-text:** "A look at the content, creatives and sites we have built for our clients."
- **Effect:** heading reveal; a row of floating thumbnails drifts slowly behind the text at low opacity.

### 8.2 Filter bar and grid (light)

- **Filter chips:** All, Reels & Short-form, Long-form & Podcasts, Branding & Design, Thumbnails, Websites. Active chip has the orange gradient.
- **Grid:** masonry layout, 3 columns on desktop, 2 on tablet, 1 on mobile. Reels use a 9:16 card, thumbnails 16:9, designs 1:1 or free ratio.
- **Each card shows:** poster image, category badge, project title, client name `[CLIENT]`, and a short result line when available.
- **Effects:** filtering animates with Framer Motion `layout`, so cards smoothly re-flow; cards fade up on scroll; hovering a reel card plays a muted preview with a zoom of 1.04; the cursor shows "View"; on mobile the card nearest the screen center autoplays.
- **Load more:** show 9 items first, then a "Load more" button. Videos load only when near the viewport.

### 8.3 Project viewer (modal)

- Clicking a card opens a full-screen overlay: video player (or large image) with sound controls, title, client, category, a short description of what was done, tools or format used, and "Next project" and "Previous project" arrows.
- **Effects:** the card expands into the modal (shared-element transition), background dims with blur, Escape or the close button exits. Keyboard accessible with focus trap.
- **Button inside:** "Want something like this? Get a Quote", which opens `/contact?service=<category>`.

### 8.4 Results strip (dark)

- A row of 3 or 4 animated counters, for example `[XX]+ videos delivered`, `[XX]+ happy clients`, `[XX] months average client relationship`. Use only true numbers; hide this strip until the owner supplies them.
- **Effect:** numbers count up once when scrolled into view.

### 8.5 Final CTA band

Reuse the CTA band from section 5.

**Data format for each portfolio item (`work.ts`)**

| Field | Example / note |
| --- | --- |
| `id`, `slug` | Unique, URL friendly |
| `title` | "Reel edit for \[CLIENT\]" |
| `category` | One of: reels, long-form, branding, thumbnails, websites |
| `client` | Name or "Confidential" |
| `poster` | Path in `/public/thumbnails` |
| `video` | Optional MP4 path in `/public/reels` (720p, under 5 MB) |
| `description` | 1 to 2 lines about the work done |
| `featured` | true/false, controls the Home page selection |

## 9. About page (`/about`)

Goal: show who is behind the work and why the company is trustworthy. All text comes from the company profile.

### 9.1 Page hero (dark)

- **Eyebrow:** "About us"; **H1:** "MORE THAN A FREELANCE SETUP"
- **Sub-text:** "We are building a reliable digital solutions company for modern brands, businesses and creators."
- **Effect:** large faded logo chevrons slowly rotate behind the heading.

### 9.2 Who we are (light)

- **Copy:** "TechUP Digital is a modern digital solutions agency built to help brands, businesses, creators, startups and professionals strengthen their online presence through content production, creative design, branding, websites and digital support. We are a one-stop partner for clients who need more than isolated freelance work."
- **Layout:** text left; right, a tall image of the founder or team (supplied by the owner) with an orange gradient frame offset behind it.
- **Effects:** the image reveals with a clip-path wipe; the frame shifts slightly with the mouse (parallax).

### 9.3 Vision and Mission (dark)

Two large side-by-side cards.

- **Vision:** "To build TechUP Digital into a trusted and scalable digital solutions company that empowers brands, businesses, creators and professionals with high-quality content, creative execution, branding, web presence and digital support under one roof."
- **Mission:** "To help brands, businesses, creators and professionals grow their digital presence and business impact through content, creativity, branding, websites and digital execution systems that improve visibility, trust and growth."
- **Effects:** each card has a large outlined "VISION" / "MISSION" word behind the text that fills with orange gradient on hover; cards slide in from opposite sides.

### 9.4 Problems we solve (light)

Five short rows, each with a number and two lines (problem, then how we help):

1. Inconsistent content creation and editing: recurring editing and monthly content execution.
2. Weak brand presentation: branding support and stronger design assets.
3. Poor or incomplete digital presence: websites, landing pages and portfolio sites.
4. Fragmented freelance execution: one centralized creative and digital partner.
5. No reliable recurring support: retainers, packages and long-term partnerships.

- **Effects:** rows expand on hover to show the "how we help" line; numbers in orange display font.

### 9.5 Who we work with (dark)

A wrap of pill tags: Brands & Businesses, Startups, Content Creators & Influencers, Personal Brands, Coaches, Consultants & Educators, Local Businesses, Professionals & Individuals. **Effect:** pills float with a slow, offset up-and-down motion and light up on hover.

### 9.6 Founder's note (light)

- **Copy:** use the Founder's Note from the profile: "Tech UP Digital was built with the vision of creating more than just another freelance service setup..." (use the full text from page 14 of the company profile PDF).
- **Layout:** large quote mark in orange, the note in big readable type, founder name (Dwaipayan) and title "Founder & CEO" with a photo `[founder photo needed]`.
- **Effect:** the text fades in line by line as the user scrolls.

### 9.7 Our team (dark, anchor `#team`)

- **Eyebrow:** "Our team"; **Heading:** "MEET THE CORE TEAM"
- **Sub-text:** "TechUP Digital is founder-led, supported by a core team across operations, finance, technology and partnerships."
- **Layout:** the founder gets a large featured card at the top (photo left; name, designation and a 2 to 3 line bio right). The other five members sit in a grid below (3 columns, then 2 centered on desktop; 2 columns on tablet; swipeable on mobile). Same members, order and designations as section 6.10.
- **Each card:** portrait photo, name, designation, and an optional one-line bio and social links, all read from `/content/team.ts`.
- **Photo rules:** same as section 6.10.
- **Effects:** the founder photo reveals with a clip-path wipe; the five cards stagger in; on hover the photo turns to full color and a bio panel slides up over its lower third (on touch devices, tap to open and close); the orange frame follows the cursor slightly.
- **Data fields in `team.ts`:** `name`, `designation`, `photo`, `bio` (optional), `linkedin` and `instagram` (optional), `order`.
- Put `id="team"` on this section so `/about#team` scrolls straight to it, with an offset for the sticky header.

### 9.8 Growth direction (light)

A short vertical timeline of current priorities and the long-term direction (strengthen recurring revenue, improve delivery systems, expand branding and websites, build proof and case studies). Keep wording customer-friendly, not internal. **Effect:** line draws on scroll; items appear as it passes them.

### 9.9 Final CTA band

Reuse the CTA band from section 5.

## 10. Blog (`/blog` and `/blog/[slug]`)

Goal: bring in search traffic from Indian businesses and creators, and build authority. Posts are MDX files in `/content/blog`, so adding a post means adding one file.

### 10.1 Blog listing page

- **Hero (dark):** eyebrow "Insights"; H1 "IDEAS TO GROW YOUR DIGITAL PRESENCE"; sub-text "Practical tips on video, branding and websites for creators and businesses."
- **Featured post:** one large card (image left, text right).
- **Filter chips:** All, Video Editing, Branding, Websites, Growth.
- **Grid (light):** 3 columns desktop, 1 mobile. Card = cover image, category badge, title, 2-line excerpt, date, read time.
- **Pagination:** 9 posts per page, with "Next" and "Previous".
- **Effects:** cards fade up; image zooms 5% on hover; title underline draws in; filter change re-flows cards.

### 10.2 Blog post page

- **Header:** category badge, title, author ("TechUP Digital Team" or founder name), date, read time, cover image.
- **Body:** readable column 720px wide, with H2/H3, lists, images, pull quotes and code-free styling.
- **Sidebar (desktop):** sticky table of contents with the current heading highlighted; share buttons (WhatsApp, LinkedIn, copy link).
- **After the post:** author box, a mid-size CTA card ("Need help with this? Get a Quote"), and three related posts.
- **Effects:** reading progress bar at the top; headings fade in; images have a soft reveal.
- **SEO per post:** unique title and meta description, Open Graph image, `Article` JSON-LD, canonical URL, and breadcrumb.

### 10.3 Front matter for each post

| Field | Note |
| --- | --- |
| `title`, `slug`, `description` | Description 140-160 characters |
| `date`, `updated` | ISO dates |
| `category`, `tags` | Category must match the filter chips |
| `cover`, `coverAlt` | Image path and alt text |
| `author`, `readTime` | Text |

### 10.4 Starter post topics (for launch)

Write 3 posts at launch and one new post every 2 weeks after.

1. How often should a creator post reels? A simple content plan for Indian creators
2. 5 signs your business needs a proper website (and not only an Instagram page)
3. Short-form vs long-form video: what each does for your brand
4. What goes into a strong brand identity for a small business
5. Why one creative partner beats five freelancers

## 11. Contact page (`/contact`)

Goal: the most important conversion page. Offer three ways to reach TechUP: a quote form, WhatsApp, or a booked call.

### 11.1 Page hero (dark, short)

- **Eyebrow:** "Contact"; **H1:** "LET'S BUILD YOUR DIGITAL PRESENCE BETTER"
- **Sub-text:** "Tell us what you need. We reply with a clear plan and quote, usually within 24 hours." `[owner to confirm reply time]`

### 11.2 Three ways to connect (light)

Three cards in a row (stacked on mobile):

| Card | Content | Action |
| --- | --- | --- |
| Chat on WhatsApp | "Fastest way to talk to us." +91 98317 10140 | Opens `wa.me/919831710140` with a pre-filled message |
| Get a Quote | "Share your requirements and get a tailored quote." | Scrolls to the form below |
| Book a Call | "Pick a time that suits you." | Opens the Cal.com booking embed in a modal or inline section |

- **Effects:** cards lift with orange glow on hover; icons animate (WhatsApp icon wiggles, calendar icon flips, document icon draws).

### 11.3 Quote form (light, in a large card)

| Field | Type | Required | Notes |
| --- | --- | --- | --- |
| Full name | Text | Yes |  |
| Email | Email | Yes | Validated |
| Phone / WhatsApp | Tel | Yes | Indian numbers, +91 prefix helper |
| Brand or company | Text | No |  |
| Service needed | Multi-select chips | Yes | Content & Video, Branding & Design, Web & Digital Presence, Growth Support, Not sure |
| Budget range | Not shown |  | Do not ask for budget; pricing is by quote only |
| Project details | Textarea | Yes | Placeholder: "Tell us about your brand and what you need..." |
| How did you hear about us? | Dropdown | No | Instagram, Google, Referral, Other |
| Consent | Checkbox | Yes | "I agree to be contacted about my enquiry" |
| Hidden spam field | Honeypot |  | Reject if filled |

- **Service pre-selection:** if the URL contains `?service=`, that chip starts selected.
- **Validation:** inline errors under each field in plain language; submit button disabled while sending.
- **On submit:** server action sends an email to `tchup.official@gmail.com` with all fields, and a short confirmation email to the visitor if the email service allows it. Rate-limit by IP to prevent spam.
- **Success state:** the form folds away and an animated check and rocket appear: "Thank you! We have your request and will reply soon." with a "Chat on WhatsApp now" button.
- **Error state:** friendly message with the WhatsApp and email as fallback.
- **Effects:** labels float up on focus; the focused field gets an orange glow; the submit button shows a progress animation; confetti-style orange sparks on success (small, 1 second).

### 11.4 Contact details and social (dark)

- Email: tchup.official@gmail.com (click to open mail)
- WhatsApp: +91 98317 10140
- Instagram: @techup.digital (link opens in a new tab)
- Location: "Based in Kolkata, India" `[owner to confirm whether to show]`
- **Effect:** each detail row slides in; the icons turn orange on hover; click-to-copy for email and phone with a "Copied" toast.

### 11.5 Short FAQ (light)

Reuse three questions from the Services FAQ: how pricing works, how long a project takes, how the process works.

### 11.6 Final strip

No full CTA band here, because the page itself is the CTA. Show only the footer.

## 12. Motion and effects library

Build each effect once as a reusable component or variant in `/lib/motion.ts`, then reuse it. This table is the single reference for the developer.

| Effect | Used on | How it works | Timing |
| --- | --- | --- | --- |
| Text mask reveal | Hero and page H1s | Each line sits in an overflow-hidden wrapper; text slides up from 100% to 0 | 700ms, ease-out, 80ms stagger |
| Word-by-word reveal | Section headings, CTA band | Split heading into words; each fades and rises 24px | 500ms, 40ms stagger |
| Scroll reveal (fade up) | Cards, rows, images | Opacity 0 to 1 and translateY 32px to 0 when 20% in view; plays once | 600ms, ease-out |
| Stagger children | Card grids, lists | Parent variant staggers children | 100ms between items |
| Rocket trail line | Hero | SVG path draws with `pathLength` while rocket rises | 1.6s, then idle float 4s loop |
| Magnetic button | Primary buttons, CTA | Button moves up to 12px toward the cursor within 80px; springs back | Spring, stiffness 200, damping 15 |
| 3D card tilt | Service cards | Rotates up to 6 degrees by cursor position; glare highlight follows | Spring, 300ms |
| Gradient border glow | Cards on hover | Animated conic-gradient border | 400ms in, 300ms out |
| Infinite marquee | Trusted By | CSS keyframe translateX loop with duplicated list; pause on hover | 40s per loop |
| Counter | Stats strips | Count from 0 to target when in view; plays once | 1.6s, ease-out |
| Scroll-drawn line | Process, timeline, About | Line length tied to scroll progress via `useScroll` | Linked to scroll |
| Parallax | Hero blobs, images, mockups | translateY at 0.1-0.3 speed difference | Linked to scroll |
| Pinned scroll moment | Hero only (optional) | GSAP ScrollTrigger pins the hero while the rocket rises | One screen of scroll |
| Shared-element modal | Work viewer | Framer Motion `layoutId` expands card to modal | 450ms spring |
| Layout re-flow | Work and blog filters | `layout` prop on cards inside `AnimatePresence` | 400ms |
| Carousel | Testimonials | Drag, auto-advance, scale of active slide | 5s auto-advance |
| Accordion | FAQ | Animated height with `AnimatePresence` | 300ms |
| Page transition | Between pages | Gradient chevron panel sweeps in and out | 500ms |
| Custom cursor | Desktop | Dot plus trailing ring with spring follow | Spring |
| Floating shapes | About, Work hero | Slow transform loops, offset per item | 6-10s loops |

**Hard rules for all motion**

- Animate only `transform` and `opacity` (plus `clip-path` for wipes). Never animate width, height, top or left, except accordion height.
- Respect `prefers-reduced-motion: reduce`: turn off parallax, tilt, cursor, marquee speed-up, page transitions and loops; keep simple fades.
- Disable tilt, cursor and magnetic effects on touch devices.
- Reveal animations play once, not on every scroll back.
- Never block content: text must be readable in the HTML even when JavaScript is slow.
- Maximum one heavy, continuous animation visible at a time. Pause off-screen animations and videos.

## 13. SEO, performance and accessibility

**SEO**

| Page | Title (about 55 characters) | Primary keywords |
| --- | --- | --- |
| Home | TechUP Digital \| Video Editing, Branding & Websites | digital agency India, video editing agency, branding and web design |
| Services | Services \| Video Editing, Branding, Web Design - TechUP Digital | reels editing service, logo design, website design for business |
| Work | Our Work \| Reels, Branding & Websites - TechUP Digital | video editing portfolio, creative design portfolio |
| About | About TechUP Digital \| Your Vision, Our Precision | digital solutions agency, creative agency India |
| Blog | Blog \| Digital Growth Tips - TechUP Digital | content marketing tips India, reels tips |
| Contact | Contact & Get a Quote \| TechUP Digital | get a quote video editing, hire video editor India |

- Unique meta description (140-160 characters) and Open Graph image for each page.
- One H1 per page; headings in order; descriptive alt text on every image.
- `sitemap.xml` and `robots.txt` generated by Next.js; canonical URLs; clean slugs.
- JSON-LD: `Organization` (logo, email, phone, Instagram), `LocalBusiness` or `ProfessionalService`, `FAQPage`, `Article` for posts, `BreadcrumbList`.
- After launch: verify the site in Google Search Console, submit the sitemap, and create a Google Business Profile if the owner wants local search.
- Add `lang="en-IN"` to the HTML tag.

**Performance targets (mobile)**

| Metric | Target |
| --- | --- |
| Lighthouse Performance, SEO, Best Practices, Accessibility | 90+ each |
| Largest Contentful Paint | under 2.5s |
| Cumulative Layout Shift | under 0.1 |
| Interaction to Next Paint | under 200ms |

- Use `next/image` with WebP or AVIF, correct sizes and `priority` only for the hero.
- Videos: MP4 (H.264) 720p, under 5 MB each, with a poster image; load on hover or in view; never autoplay with sound.
- Load fonts with `next/font` (self-hosted, `display: swap`); at most 2 families and 3 weights.
- Code-split heavy components (modal viewer, GSAP, Cal.com embed) and lazy-load below-the-fold sections.
- Keep total JavaScript on the Home page lean; remove unused packages.

**Accessibility**

- Semantic HTML (header, nav, main, section, footer); a "Skip to content" link.
- Visible focus ring (2px orange) on every interactive element; full keyboard use of menu, carousel, accordion, filters and modal (with focus trap).
- Color contrast at WCAG AA or better; do not use color alone to show state.
- Buttons and links have clear text or `aria-label`; the WhatsApp button has `aria-label="Chat on WhatsApp"`.
- Pause control or hover-pause for moving content (marquee, carousel).
- Form labels linked to inputs; errors announced to screen readers.
- Touch targets at least 44x44px.

## 14. Integrations, domain and deployment

| Item | Setup |
| --- | --- |
| Quote form email | Resend or Web3Forms through a Next.js server action; secrets in environment variables on Vercel, never in the code. Delivers to tchup.official@gmail.com. Add a honeypot field and rate limiting |
| WhatsApp | Click-to-chat link `https://wa.me/91983171``0``1``4``0``?text=\<encoded message>` on the floating button, header menu, Contact page and CTA bands. Use a different pre-filled message per page if useful |
| Booking | Free Cal.com account; embed in a modal on `/contact`. Owner sets availability and call length |
| Analytics | Vercel Analytics or Google Analytics 4 with a short cookie notice. Track events: quote form submit, WhatsApp click, booking click, Instagram click, reel play |
| Search | Google Search Console and sitemap submission after launch |
| Code | GitHub repository `techup-digital-website`; `main` branch deploys to production, other branches create preview links |
| Hosting | Vercel project connected to GitHub |
| Domain | Buy on Hostinger (`techupdigital.in` or `.com`, owner to confirm). In Vercel add the domain, then in Hostinger set the DNS records Vercel shows (A record for the root, CNAME for `www`). Redirect `www` to the root or the reverse, not both |
| Email on domain (optional) | Hostinger business email such as `hello@yourdomain`, then use it as the form recipient |
| Legal pages | Privacy Policy and Terms (simple pages linked in the footer), required because the form collects personal data |

**Before launch, test**

- Submit the form from desktop and mobile and confirm the email arrives and nothing lands in spam.
- Tap every WhatsApp link on a real phone.
- Complete a test booking.
- Check that every page title, description and Open Graph image shows correctly in a link preview.
- Test on Chrome, Safari (iPhone), Edge and Firefox, at 360, 768, 1280 and 1920px widths.

## 15. Assets and content checklist

The owner supplies these. The developer uses clearly marked placeholders for anything missing, so the build is never blocked.

**Brand assets**

- [ ] Logo SVGs: full-color circle logo, wordmark only, white version, orange version
- [ ] Favicon source (square, at least 512x512)
- [ ] Brand tagline confirmed: "Your Vision, Our Precision"

**Portfolio**

- [ ] 6 to 12 reels, exported MP4 (H.264) 720p, under 5 MB each, vertical 9:16
- [ ] A poster image for each reel
- [ ] Thumbnails, posters and logo designs as PNG or JPG (min 1600px on the long side)
- [ ] For each item: title, client name (or "Confidential"), category, one-line description

**Clients and proof**

- [ ] Client logos with transparent background (SVG or PNG), with permission to display them
- [ ] 3 to 6 real testimonials: quote, name, role, brand, optional photo
- [ ] Real numbers for the results strip, if any (videos delivered, clients served)

**Content**

- [ ] Founder photo and a short bio
- [ ] Portrait photos of all 6 core members (4:5, at least 800x1000px, same background and lighting), with an optional one-line bio and LinkedIn or Instagram link for each; confirm the founder's designation (CEO or other)
- [ ] Final FAQ answers
- [ ] Confirm: reply time promise, location to show, "Most chosen" badge
- [ ] 3 blog posts for launch (or approval for the starter topics in section 10.4)
- [ ] Privacy Policy and Terms text, or approval to use a standard template

**Accounts**

- [ ] Domain bought on Hostinger
- [ ] GitHub repository access for the developer
- [ ] Vercel project access
- [ ] Cal.com account created
- [ ] Resend or Web3Forms account created, with the key shared securely (not by chat or email)

## 16. Build order and acceptance checklist

**Build order**

1. **Foundation:** project setup, design tokens, fonts, global layout (header, footer, WhatsApp button), Lenis, page transition.
2. **Shared components:** buttons, cards, section headings, marquee, counter, CTA band, motion variants.
3. **Home page:** hero first, then Trusted By, services, work, why us, process, testimonials, blog teaser.
4. **Services and About pages.**
5. **Work page** with filters and the project viewer.
6. **Blog:** MDX setup, listing, post page, three starter posts.
7. **Contact page:** form with email delivery, booking embed, WhatsApp links.
8. **Motion polish pass:** timings, stagger, hover states, reduced-motion and touch fallbacks.
9. **SEO and analytics:** metadata, JSON-LD, sitemap, events.
10. **QA and launch:** testing, performance fixes, domain connection, go live.

**Acceptance checklist (the site is done when all are true)**

- [ ] All 6 page types and the 404 page exist and match sections 5 to 11
- [ ] Colors, fonts and spacing come from the tokens in section 4, with no hard-coded values
- [ ] Every effect in section 12 is present where specified and follows the hard rules
- [ ] The site works and looks right at 360, 768, 1280 and 1920px
- [ ] Reduced-motion mode and touch devices behave as specified
- [ ] The quote form delivers email to tchup.official@gmail.com and shows success and error states
- [ ] Every WhatsApp link opens a chat with +91 98317 10140 on mobile and desktop
- [ ] No prices appear anywhere
- [ ] No invented clients, numbers or testimonials; placeholders are clearly marked
- [ ] Lighthouse mobile scores of 90+ on all four categories
- [ ] Keyboard-only use works across the whole site
- [ ] Every page has the correct title, description, Open Graph image and structured data
- [ ] The domain works over HTTPS, and `www` redirects correctly
- [ ] Analytics events fire for form submit, WhatsApp click and booking click
- [ ] Code is on GitHub with a README describing how to run it and how to edit content
