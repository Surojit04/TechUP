/**
 * FAQ content for Services and Contact pages.
 * SPEC RULE: Never show prices. Route all pricing to "Get a Quote" or WhatsApp.
 */

export interface FAQItem {
  id: string;
  question: string;
  answer: string;
}

export const SERVICES_FAQS: FAQItem[] = [
  {
    id: "services-offered",
    question: "What services do you offer?",
    // TODO: Owner to confirm draft answer
    answer:
      "We provide four core digital solutions: Content & Video editing (reels, podcasts, long-form), Branding & Design (logos, identity systems, social creatives, thumbnails), Web & Digital Presence (custom websites, landing pages, WordPress), and ongoing Growth & Digital Support.",
  },
  {
    id: "how-retainers-work",
    question: "How do monthly retainers work?",
    // TODO: Owner to confirm draft answer
    answer:
      "A monthly retainer gives you dedicated production capacity, priority turnarounds, and direct communication. We agree on a predictable monthly volume of videos or designs, ensuring your channels publish high-quality creative consistently without freelance lag.",
  },
  {
    id: "how-to-get-price",
    question: "How do I get a price?",
    // Confirmed spec answer
    answer:
      "Every project is different, so we quote after a short chat. Use the Get a Quote button or WhatsApp us.",
  },
  {
    id: "project-timeline",
    question: "How long does a project take?",
    // TODO: Owner to confirm draft answer
    answer:
      "Short-form reels and individual design creatives are typically turned around in 24 to 48 hours under active retainers. Full brand identity systems or custom websites usually take between 2 to 4 weeks depending on scope.",
  },
  {
    id: "revisions",
    question: "How many revisions are included?",
    // TODO: Owner to confirm draft answer
    answer:
      "All project and retainer deliverables include structured revision rounds to ensure the finished work precisely matches your brand vision before final sign-off.",
  },
  {
    id: "creators-small-business",
    question: "Do you work with creators and small businesses?",
    // TODO: Owner to confirm draft answer
    answer:
      "Yes! We work closely with individual creators, personal brands, educators, startups, and growing local businesses looking to build authority and consistency online.",
  },
  {
    id: "file-sharing",
    question: "How do we share files and approvals?",
    // TODO: Owner to confirm draft answer
    answer:
      "We use streamlined cloud workflows (Google Drive / Frame.io / Notion) combined with dedicated WhatsApp or Slack communication so you can upload raw assets and review drafts with zero friction.",
  },
];

export const CONTACT_FAQS: FAQItem[] = [
  {
    id: "project-types",
    question: "What types of projects does TechUp Digital work on?",
    answer:
      "We specialize in four core creative divisions: high-retention short-form and podcast video editing, comprehensive brand identities and design systems, modern responsive websites and landing pages, and ongoing monthly digital growth support for creators, startups, and ambitious businesses.",
  },
  {
    id: "inquiry-info",
    question: "What information should I include in my inquiry?",
    answer:
      "A brief overview of your brand or business, the services you need, your main objectives (such as scaling social content, launching a new website, or rebranding), your approximate budget range, and any links to reference work or your current digital channels. The more context you provide, the faster and more accurately we can scope your requirements.",
  },
  {
    id: "after-submission",
    question: "What happens after I submit the form?",
    answer:
      "Our creative team reviews your project brief, clarifies any outstanding details with you via email or WhatsApp, and prepares tailored recommendations and next steps for your project.",
  },
];
