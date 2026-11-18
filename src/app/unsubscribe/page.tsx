import type { Metadata } from "next";
import PageWrapper from "@/components/layout/PageWrapper";
import UnsubscribeForm from "./UnsubscribeForm";
import { verifyUnsubscribe } from "@/lib/unsubscribe";

export const metadata: Metadata = {
  title: "Unsubscribe",
  robots: { index: false, follow: false },
};

export default async function UnsubscribePage({ searchParams }: { searchParams: Promise<{ e?: string; t?: string }> }) {
  const { e = "", t = "" } = await searchParams;
  const email = verifyUnsubscribe(e, t);

  return (
    <PageWrapper includeCTA={false}>
      <section className="section" style={{ maxWidth: 560, margin: "0 auto", textAlign: "center" }}>
        <h1 style={{ fontSize: "1.8rem", fontWeight: 600, marginBottom: "1rem" }}>Unsubscribe</h1>
        {email ? (
          <UnsubscribeForm e={e} t={t} email={email} />
        ) : (
          <p style={{ color: "var(--muted)", lineHeight: 1.7 }}>
            This unsubscribe link is invalid or incomplete. Email <a href="mailto:hello@neoklyn.com" style={{ color: "var(--cyan)" }}>hello@neoklyn.com</a> and we&apos;ll remove you manually.
          </p>
        )}
      </section>
    </PageWrapper>
  );
}
