import { Metadata } from "next";
import { constructMetadata } from "@/lib/seo";
import { CONTACT_EMAIL } from "@/lib/site";

export const metadata: Metadata = constructMetadata({
  title: "Privacy Policy | TechUP Digital",
  description:
    "Read the TechUP Digital Privacy Policy. Learn how we protect your personal information, handle project enquiries, and maintain data security under Indian regulations.",
  path: "/privacy",
});

export default function PrivacyPage() {
  return (
    <div className="bg-ink text-paper pt-36 pb-24 border-b border-white/10">
      <div className="max-w-3xl mx-auto px-6 md:px-12 font-body">
        <span className="text-xs font-mono uppercase tracking-[0.2em] text-brand-orange font-bold block mb-2">
          {"// "}Legal
        </span>
        <h1 className="font-display uppercase text-4xl sm:text-6xl text-white tracking-wide mb-8">
          PRIVACY POLICY
        </h1>

        <div className="space-y-6 text-paper/85 text-sm md:text-base leading-relaxed">
          <p>
            At TechUP Digital, we value your privacy. This policy outlines how we collect, use, and safeguard your personal information when you visit our website or submit inquiries through our quote form.
          </p>

          <h2 className="font-display uppercase text-2xl text-white tracking-wide pt-4">
            1. Information We Collect
          </h2>
          <p>
            When you submit our &quot;Get a Quote&quot; form or contact us via WhatsApp or email, we collect personal information you choose to provide, including your full name, email address, phone/WhatsApp number, company name, and project specifications.
          </p>

          <h2 className="font-display uppercase text-2xl text-white tracking-wide pt-4">
            2. How We Use Your Information
          </h2>
          <p>
            We use your data solely to respond to your inquiries, prepare tailored project proposals, provide ongoing client services, and communicate project updates. We never sell, rent, or trade your personal data to third parties.
          </p>

          <h2 className="font-display uppercase text-2xl text-white tracking-wide pt-4">
            3. Data Security
          </h2>
          <p>
            We implement industry-standard encryption and operational procedures to protect your submitted contact details against unauthorized access, disclosure, or alteration.
          </p>

          <h2 className="font-display uppercase text-2xl text-white tracking-wide pt-4">
            4. Contact Us
          </h2>
          <p>
            If you have questions about our privacy practices, please contact us at{" "}
            <a
              href={`mailto:${CONTACT_EMAIL}`}
              className="text-brand-orange underline hover:text-brand-amber"
            >
              {CONTACT_EMAIL}
            </a>
            .
          </p>
        </div>
      </div>
    </div>
  );
}
