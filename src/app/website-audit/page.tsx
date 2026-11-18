import type { Metadata } from "next";
import Link from "next/link";
import PageWrapper from "@/components/layout/PageWrapper";
import PageHeader from "@/components/ui/PageHeader";
import WebsiteAuditForm from "@/components/WebsiteAuditForm";

import { DEFAULT_OG_IMAGES, DEFAULT_TWITTER_IMAGES } from "@/lib/seo";
const TITLE = "Free Website Audit: Speed, SEO & Enquiries";
const DESCRIPTION =
  "Enter your website address and get a free health check in about 10 seconds: mobile, speed, Google visibility, enquiry paths and security, with the top fixes.";

export const metadata: Metadata = {
  title: TITLE,
  description: DESCRIPTION,
  alternates: { canonical: "https://neoklyn.com/website-audit" },
  openGraph: {
    title: `${TITLE} | NeoKlyn`,
    description: DESCRIPTION,
    url: "https://neoklyn.com/website-audit",
    siteName: "NeoKlyn",
        images: DEFAULT_OG_IMAGES,
    type: "website",
  },
  twitter: { card: "summary_large_image",
        images: DEFAULT_TWITTER_IMAGES, title: `${TITLE} | NeoKlyn`, description: DESCRIPTION },
};

const CHECKS = [
  { title: "Speed & mobile", body: "Server response time, mobile layout, compression, scripts and images." },
  { title: "Search visibility", body: "Title, description, headings, sitemap, link previews and structured data." },
  { title: "Enquiries", body: "Tap-to-call, WhatsApp, forms and a clear call to action." },
  { title: "Trust & security", body: "HTTPS, security headers, privacy policy and favicon." },
];

export default function WebsiteAuditPage() {
  return (
    <PageWrapper includeCTA={false}>
      <section className="section">
        <PageHeader
          label="Free Website Audit"
          titleOutline="WEBSITE"
          titleSolid="AUDIT"
          titleColorClass="title-cyan"
          description="Is your website helping or hurting your business? Get a score out of 100 and the top three fixes, in about 10 seconds. No call needed."
        />

        <WebsiteAuditForm />

        <div style={{ maxWidth: 760, margin: "3rem auto 0", padding: "0 1rem" }}>
          <h2 style={{ fontSize: "1.1rem", fontWeight: 600, marginBottom: "1rem" }}>What we check</h2>
          <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(220px, 1fr))", gap: "1rem" }}>
            {CHECKS.map((item) => (
              <div key={item.title} style={{ border: "1px solid var(--border)", borderRadius: 12, padding: "1rem 1.1rem" }}>
                <strong style={{ display: "block", marginBottom: "0.35rem" }}>{item.title}</strong>
                <span style={{ color: "var(--muted)", fontSize: "0.88rem", lineHeight: 1.6 }}>{item.body}</span>
              </div>
            ))}
          </div>
          <p style={{ color: "var(--muted)", fontSize: "0.85rem", lineHeight: 1.7, marginTop: "1.5rem" }}>
            Running a business with repetitive manual work instead? Try the{" "}
            <Link href="/audit" style={{ color: "var(--cyan)" }}>
              AI automation readiness audit
            </Link>
            .
          </p>
        </div>
      </section>
    </PageWrapper>
  );
}
