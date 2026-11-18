import type { Metadata } from "next";
import Link from "next/link";
import PageWrapper from "@/components/layout/PageWrapper";
import PageHeader from "@/components/ui/PageHeader";

import { DEFAULT_OG_IMAGES, DEFAULT_TWITTER_IMAGES } from "@/lib/seo";
export const metadata: Metadata = {
  title: {
    absolute: "AI-Accelerated Development — How NeoKlyn Builds Faster",
  },
  description:
    "AI tools handle the repetitive 70% of development. A senior engineer with 10+ years of experience handles the critical 30%. Here's exactly how, line by line.",
  openGraph: {
    title: "AI-Accelerated Development — How NeoKlyn Builds Faster",
    description:
      "How NeoKlyn's AI-accelerated development model works: AI tools handle the repetitive 70%, a senior engineer with 10+ years of experience handles the critical 30%.",
    url: "https://neoklyn.com/how-we-work",
    siteName: "NeoKlyn",
        images: DEFAULT_OG_IMAGES,
    type: "website",
  },
  alternates: { canonical: "https://neoklyn.com/how-we-work" },
  twitter: {
    card: "summary_large_image",
        images: DEFAULT_TWITTER_IMAGES,
    title: "AI-Accelerated Development — How NeoKlyn Builds Faster",
    description:
      "AI tools handle the repetitive 70%, a senior engineer with 10+ years of experience handles the critical 30%.",
  },
};

const sections = [
  {
    heading: "What the AI does",
    body: "Modern AI coding tools are extraordinarily good at the repetitive layer of development: scaffolding projects, writing boilerplate, generating UI components from designs, producing test cases, and converting requirements into first-draft code. This layer is roughly 70% of the hours in a traditional project — and it's exactly where agencies bill the most junior-developer time.",
  },
  {
    heading: "What the engineer does",
    body: "The remaining 30% is what determines whether software is good.",
    list: [
      "Architecture — how the system is structured to scale and stay maintainable",
      "Security — auth, data protection, input validation, dependency auditing",
      "Code review — reading every AI-generated line; keeping, fixing, or rewriting it",
      "Testing — automated and manual, before anything reaches you",
      "Judgment — the thousand small decisions that come from 10+ years of building real products",
    ],
    footer: "This part is done personally by NeoKlyn's founder on every project.",
  },
  {
    heading: "What you get out of it",
    list: [
      "2-3x faster delivery than traditional agency timelines",
      "40-60% lower cost — from eliminated overhead, not cut corners",
      "One accountable senior engineer instead of a rotating team",
      "Full code ownership and 30 days of free post-launch fixes",
    ],
  },
  {
    heading: "What we won't do",
    list: [
      "We won't ship code no human has read",
      "We won't quote a price and change it later",
      "We won't claim numbers we can't prove — every project we show is live",
    ],
    footer:
      "Honest limits: for very large enterprise teams needing 10+ dedicated developers, a big agency is a better fit. For everyone else, this model is simply better value.",
  },
];

export default function HowWeWorkPage() {
  return (
    <PageWrapper includeCTA={false}>
      <section className="section">
        <PageHeader
          label="How We Work"
          titleOutline="HOW AI-ACCELERATED"
          titleSolid="DEVELOPMENT WORKS"
          titleColorClass="title-cyan"
          description={
            "“AI-built” software has a bad reputation — for good reason. Unreviewed AI code shipped by people who can't evaluate it produces fragile, insecure products. NeoKlyn's model is different, and this page explains exactly how, because you deserve to know how your product gets built."
          }
        />

        <div className="how-sections reveal">
          {sections.map((s) => (
            <div key={s.heading} className="how-block">
              <h2>{s.heading}</h2>
              {s.body && <p>{s.body}</p>}
              {s.list && (
                <ul>
                  {s.list.map((item) => (
                    <li key={item}>{item}</li>
                  ))}
                </ul>
              )}
              {s.footer && <p className="how-footer">{s.footer}</p>}
            </div>
          ))}
        </div>

        <div className="reveal" style={{ textAlign: "center", marginTop: "3rem" }}>
          <Link href="/contact" className="btn-main">Get a fixed quote within 24 hours →</Link>
        </div>

        <style>{`
          .how-sections {
            max-width: 780px;
            margin: 0 auto;
            display: flex;
            flex-direction: column;
            gap: 2.5rem;
          }
          .how-block {
            border: 1px solid rgba(255,255,255,0.08);
            border-left: 4px solid var(--cyan);
            border-radius: 14px;
            background: rgba(255,255,255,0.02);
            padding: 1.75rem 1.75rem 1.5rem;
          }
          .how-block h2 {
            margin: 0 0 0.9rem;
            font-size: 1.3rem;
            font-family: var(--font-space-grotesk), sans-serif;
            color: var(--white);
          }
          .how-block p {
            margin: 0 0 0.5rem;
            color: rgba(255,255,255,0.75);
            line-height: 1.75;
            font-size: 0.92rem;
          }
          .how-block ul {
            list-style: none;
            margin: 0.5rem 0;
            padding: 0;
            display: grid;
            gap: 0.6rem;
          }
          .how-block li {
            position: relative;
            padding-left: 1.4rem;
            color: rgba(255,255,255,0.78);
            line-height: 1.6;
            font-size: 0.9rem;
          }
          .how-block li::before {
            content: '';
            position: absolute;
            left: 0;
            top: 0.55em;
            width: 7px;
            height: 7px;
            border-radius: 2px;
            background: var(--cyan);
          }
          .how-footer {
            margin-top: 0.9rem !important;
            padding-top: 0.9rem;
            border-top: 1px solid rgba(255,255,255,0.06);
            font-style: italic;
            color: rgba(255,255,255,0.6) !important;
          }
        `}</style>
      </section>
    </PageWrapper>
  );
}
