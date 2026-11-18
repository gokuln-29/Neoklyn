import PageWrapper from "@/components/layout/PageWrapper";
import PageHeader from "@/components/ui/PageHeader";
import Link from "next/link";
import type { Metadata } from "next";
import { solutions } from "@/data/solutions";
import { breadcrumbSchema } from "@/lib/schema";

const TITLE = "Solutions by Business Type: Websites, Apps & AI | NeoKlyn";
const DESCRIPTION =
  "Websites, mobile apps and AI agents for clinics, traders, manufacturers, travel agencies and brands. Fixed prices from ₹50,000, built in 2-5 weeks.";

export const metadata: Metadata = {
  title: { absolute: TITLE },
  description: DESCRIPTION,
  alternates: { canonical: "https://neoklyn.com/solutions" },
  openGraph: { title: TITLE, description: DESCRIPTION, url: "https://neoklyn.com/solutions", siteName: "NeoKlyn", type: "website" },
  twitter: { card: "summary_large_image", title: TITLE, description: DESCRIPTION },
};

export default function SolutionsIndexPage() {
  const breadcrumbs = breadcrumbSchema([
    { name: "Home", url: "https://neoklyn.com" },
    { name: "Solutions", url: "https://neoklyn.com/solutions" },
  ]);

  return (
    <PageWrapper>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbs) }} />
      <section className="section">
        <PageHeader
          label="Solutions"
          titleOutline="BUILT FOR YOUR"
          titleSolid="BUSINESS"
          titleColorClass="title-cyan"
          description="Pick the one closest to your business to see what we build, what it costs, how long it takes and a project like yours."
        />
        <div style={{ maxWidth: 960, margin: "0 auto", display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(280px, 1fr))", gap: "1.1rem" }}>
          {solutions.map((solution) => (
            <Link
              key={solution.slug}
              href={`/solutions/${solution.slug}`}
              className="tcard sol-index-card"
              style={{ display: "flex", flexDirection: "column", gap: "0.6rem", textDecoration: "none", color: "inherit" }}
            >
              <span style={{ fontFamily: "'JetBrains Mono', monospace", fontSize: "0.65rem", letterSpacing: "0.07em", textTransform: "uppercase", color: "var(--muted)" }}>
                {solution.eyebrow}
              </span>
              <strong style={{ fontSize: "1.05rem", fontWeight: 600 }}>{solution.metaTitle.replace(/\s*\|\s*NeoKlyn$/, "")}</strong>
              <span style={{ color: "var(--muted)", fontSize: "0.88rem", lineHeight: 1.6, flex: 1 }}>{solution.metaDescription}</span>
              <span style={{ color: "var(--cyan)", fontSize: "0.8rem", fontFamily: "'JetBrains Mono', monospace" }}>{solution.pricing.from} · {solution.pricing.timeline} →</span>
            </Link>
          ))}
        </div>
        <style>{`.sol-index-card::before { content: none; }`}</style>
      </section>
    </PageWrapper>
  );
}
