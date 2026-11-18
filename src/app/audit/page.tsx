import type { Metadata } from "next";
import Link from "next/link";
import PageWrapper from "@/components/layout/PageWrapper";
import PageHeader from "@/components/ui/PageHeader";
import AuditQuizWizard from "@/components/AuditQuizWizard";

export const metadata: Metadata = {
  title: "AI Automation Readiness Audit",
  description:
    "Answer 6 quick questions and get a free, personalized read on where AI automation would help your business most.",
  openGraph: {
    title: "AI Automation Readiness Audit — NeoKlyn",
    description:
      "Answer 6 quick questions and get a free, personalized read on where AI automation would help your business most.",
    url: "https://neoklyn.com/audit",
    siteName: "NeoKlyn",
    type: "website",
  },
  alternates: { canonical: "https://neoklyn.com/audit" },
  twitter: {
    card: "summary_large_image",
    title: "AI Automation Readiness Audit — NeoKlyn",
    description:
      "Answer 6 quick questions and get a free, personalized read on where AI automation would help your business most.",
  },
};

export default function AuditPage() {
  return (
    <PageWrapper includeCTA={false}>
      <section className="section">
        <PageHeader
          label="Free Audit"
          titleOutline="READINESS"
          titleSolid="AUDIT"
          titleColorClass="title-cyan"
          description="6 quick questions. Get a free, personalized read on where AI automation would help your business most — no sales call required to see it."
        />

        <AuditQuizWizard />

        <p style={{ textAlign: "center", color: "var(--muted)", fontSize: "0.85rem", marginTop: "2rem" }}>
          Looking for a check of your website instead?{" "}
          <Link href="/website-audit" style={{ color: "var(--cyan)" }}>
            Run the free website audit
          </Link>
          .
        </p>
      </section>
    </PageWrapper>
  );
}
