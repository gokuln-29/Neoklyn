import Link from "next/link";
import { whatsappUrl } from "@/lib/contact";

type CtaConfig = {
  heading: string;
  body: string;
  primary: { href: string; label: string };
  secondary?: { href: string; label: string };
};

const BY_CATEGORY: Record<string, CtaConfig> = {
  "web-development": {
    heading: "Want a real number for your website?",
    body: "Answer a few questions and get a budget and timeline range in about two minutes. Or send us your current site and we'll show you what's costing you enquiries.",
    primary: { href: "/estimate", label: "Get a free estimate" },
    secondary: { href: "/website-audit", label: "Audit my current website" },
  },
  "mobile-apps": {
    heading: "Planning an app? Get a rough price first.",
    body: "Tell us what the app needs to do and we'll give you a realistic budget and timeline range, fixed price, and you own the code.",
    primary: { href: "/estimate", label: "Get a free estimate" },
  },
  "ai-agents": {
    heading: "Where could an AI agent save your team hours?",
    body: "Six quick questions give you a personalised read on which of your workflows are worth automating first. No sales call needed to see it.",
    primary: { href: "/audit", label: "Take the 2-minute AI audit" },
  },
  "ai-accelerated-development": {
    heading: "See how this works on your project",
    body: "We build with AI and review every line with a senior engineer. Get a free estimate and compare it with what an agency quoted you.",
    primary: { href: "/estimate", label: "Get a free estimate" },
    secondary: { href: "/website-audit", label: "Audit my current website" },
  },
};

const DEFAULT_CTA: CtaConfig = {
  heading: "Have a project in mind?",
  body: "Get a free estimate in two minutes, or send us your current website and we'll tell you what to fix first.",
  primary: { href: "/estimate", label: "Get a free estimate" },
  secondary: { href: "/website-audit", label: "Audit my current website" },
};

/** End-of-article call to action that matches the article's topic. */
export default function ArticleCTA({ categorySlug, title }: { categorySlug: string; title: string }) {
  const cta = BY_CATEGORY[categorySlug] ?? DEFAULT_CTA;
  const whatsappMessage = `Hi NeoKlyn, I just read "${title}" and have a question about my project.`;

  return (
    <aside className="ins-end-cta reveal" data-track-location="article_cta" aria-label="Next step">
      <h3>{cta.heading}</h3>
      <p>{cta.body}</p>
      <div className="ins-end-cta-btns">
        <Link href={cta.primary.href} className="btn-main">
          {cta.primary.label} ↗
        </Link>
        {cta.secondary && (
          <Link href={cta.secondary.href} className="btn-ghost">
            {cta.secondary.label}
          </Link>
        )}
        <a href={whatsappUrl(whatsappMessage)} target="_blank" rel="noopener noreferrer" className="btn-ghost">
          Ask on WhatsApp
        </a>
      </div>

      <style>{`
        .ins-end-cta {
          max-width: 860px;
          margin: 3.5rem auto 0;
          padding: 2rem 2rem 2.1rem;
          border: 1px solid rgba(6, 182, 212, 0.28);
          border-radius: 16px;
          background: rgba(6, 182, 212, 0.05);
        }
        .ins-end-cta h3 { margin: 0 0 0.6rem; font-size: clamp(1.25rem, 2.6vw, 1.7rem); font-weight: 600; }
        .ins-end-cta p { margin: 0 0 1.4rem; color: var(--muted); line-height: 1.7; max-width: 62ch; }
        .ins-end-cta-btns { display: flex; flex-wrap: wrap; gap: 0.75rem; }
        @media (max-width: 640px) {
          .ins-end-cta { margin: 2.5rem 1rem 0; padding: 1.4rem 1.2rem; }
          .ins-end-cta-btns > * { flex: 1 1 100%; justify-content: center; text-align: center; }
        }
      `}</style>
    </aside>
  );
}
