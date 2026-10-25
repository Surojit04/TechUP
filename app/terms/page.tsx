import { Metadata } from "next";
import { constructMetadata } from "@/lib/seo";
import { CONTACT_EMAIL } from "@/lib/site";

export const metadata: Metadata = constructMetadata({
  title: "Terms of Service | TechUP Digital",
  description:
    "Read the TechUP Digital Terms of Service. Review our commercial terms, intellectual property assignment, project milestones, and creative agency engagement guidelines.",
  path: "/terms",
});

export default function TermsPage() {
  return (
    <div className="bg-ink text-paper pt-36 pb-24 border-b border-white/10">
      <div className="max-w-3xl mx-auto px-6 md:px-12 font-body">
        <span className="text-xs font-mono uppercase tracking-[0.2em] text-brand-orange font-bold block mb-2">
          {"// "}Legal
        </span>
        <h1 className="font-display uppercase text-4xl sm:text-6xl text-white tracking-wide mb-8">
          TERMS OF SERVICE
        </h1>

        <div className="space-y-6 text-paper/85 text-sm md:text-base leading-relaxed">
          <p>
            Welcome to TechUP Digital. By accessing our website or retaining our digital solutions (video editing, brand design, web development, growth support), you agree to these Terms of Service.
          </p>

          <h2 className="font-display uppercase text-2xl text-white tracking-wide pt-4">
            1. Services & Engagement
          </h2>
          <p>
            TechUP Digital provides creative and digital agency services under agreed monthly retainers, project scopes, or custom digital packages. Exact deliverables, review rounds, and timelines are confirmed in writing prior to project kickoff.
          </p>

          <h2 className="font-display uppercase text-2xl text-white tracking-wide pt-4">
            2. Intellectual Property
          </h2>
          <p>
            Upon full payment for completed projects, intellectual property rights and final production assets are assigned to the client, while TechUP Digital reserves the right to showcase approved work in portfolio showcases unless bound by a Non-Disclosure Agreement (NDA).
          </p>

          <h2 className="font-display uppercase text-2xl text-white tracking-wide pt-4">
            3. Limitation of Liability
          </h2>
          <p>
            TechUP Digital strives for top-tier creative precision, but cannot guarantee third-party platform algorithm performance (e.g. Instagram reach, YouTube recommendations).
          </p>

          <h2 className="font-display uppercase text-2xl text-white tracking-wide pt-4">
            4. Inquiries
          </h2>
          <p>
            For any commercial or legal questions, reach our team at{" "}
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
