import type { Metadata, Viewport } from "next";
import "./globals.css";
import { bebasNeue, inter } from "@/lib/fonts";
import { Header } from "@/components/layout/Header";
import { Footer } from "@/components/layout/Footer";
import { WhatsAppFloat } from "@/components/layout/WhatsAppFloat";
import { ScrollProgress } from "@/components/layout/ScrollProgress";
import { Cursor } from "@/components/layout/Cursor";
import { SmoothScroll } from "@/components/layout/SmoothScroll";
import { FirstVisitLoader } from "@/components/layout/FirstVisitLoader";
import { PageTransition } from "@/components/layout/PageTransition";
import { CookieNotice } from "@/components/ui/CookieNotice";
import { Analytics } from "@vercel/analytics/react";
import { constructMetadata, getOrganizationSchema, getProfessionalServiceSchema } from "@/lib/seo";

export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
  maximumScale: 5,
  themeColor: "#0B0B0F",
};

export const metadata: Metadata = constructMetadata({
  title: "TechUP Digital | Video Editing, Branding & Websites",
  description:
    "Video editing, branding, and modern websites for ambitious creators and businesses across India. Fast turnarounds, founder accountability, and guaranteed quality.",
  keywords: ["digital agency India", "video editing agency", "branding and web design"],
});

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const organizationSchema = getOrganizationSchema();
  const professionalServiceSchema = getProfessionalServiceSchema();

  return (
    <html lang="en-IN" className={`${bebasNeue.variable} ${inter.variable}`}>
      <head>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify(organizationSchema),
          }}
        />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify(professionalServiceSchema),
          }}
        />
      </head>
      <body className="bg-ink text-paper antialiased selection:bg-brand-orange selection:text-white relative">
        {/* Accessibility Skip Link */}
        <a
          href="#main-content"
          className="sr-only focus:not-sr-only focus:fixed focus:top-4 focus:left-4 focus:z-50 focus:px-4 focus:py-2 focus:bg-brand-orange focus:text-white focus:rounded-md focus:shadow-lg focus:outline-none"
        >
          Skip to content
        </a>

        <FirstVisitLoader />
        <SmoothScroll>
          <ScrollProgress />
          <Cursor />
          <Header />
          <PageTransition>
            <main id="main-content" tabIndex={-1} className="focus:outline-none">
              {children}
            </main>
          </PageTransition>
          <Footer />
          <WhatsAppFloat />
          <CookieNotice />
        </SmoothScroll>
        <Analytics />
      </body>
    </html>
  );
}
