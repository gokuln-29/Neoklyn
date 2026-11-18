import PageWrapper from "@/components/layout/PageWrapper";
import PageHeader from "@/components/ui/PageHeader";
import Link from "next/link";
import { notFound } from "next/navigation";
import type { Metadata } from "next";
import { getSolution, solutions } from "@/data/solutions";
import { projectsBySlug } from "@/app/work/projects";
import { breadcrumbSchema, faqSchema, serviceSchema } from "@/lib/schema";
import { whatsappUrl } from "@/lib/contact";

import { DEFAULT_OG_IMAGES, DEFAULT_TWITTER_IMAGES } from "@/lib/seo";
export function generateStaticParams() {
  return solutions.map((solution) => ({ slug: solution.slug }));
}

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }): Promise<Metadata> {
  const { slug } = await params;
  const solution = getSolution(slug);
  if (!solution) return { title: { absolute: "Solution — NeoKlyn" } };

  const url = `https://neoklyn.com/solutions/${solution.slug}`;
  return {
    title: { absolute: solution.metaTitle },
    description: solution.metaDescription,
    alternates: { canonical: url },
    openGraph: {
      title: solution.metaTitle,
      description: solution.metaDescription,
      url,
      siteName: "NeoKlyn",
        images: DEFAULT_OG_IMAGES,
      type: "website",
    },
    twitter: { card: "summary_large_image",
        images: DEFAULT_TWITTER_IMAGES, title: solution.metaTitle, description: solution.metaDescription },
  };
}

const SERVICE_NAMES: Record<string, string> = {
  web: "Web development",
  mobile: "Mobile app development",
  "ai-agents": "AI agent development",
  ecommerce: "Ecommerce development",
};

export default async function SolutionPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const solution = getSolution(slug);
  if (!solution) notFound();

  const url = `https://neoklyn.com/solutions/${solution.slug}`;
  const cases = solution.caseSlugs.map((s) => projectsBySlug[s]).filter(Boolean);
  const serviceName = SERVICE_NAMES[solution.serviceSlug];

  const schemas = [
    serviceSchema(solution.eyebrow, solution.metaDescription),
    breadcrumbSchema([
      { name: "Home", url: "https://neoklyn.com" },
      { name: "Solutions", url: "https://neoklyn.com/solutions" },
      { name: solution.eyebrow, url },
    ]),
    faqSchema(solution.faqs),
  ];

  return (
    <PageWrapper includeCTA={false}>
      {schemas.map((schema, i) => (
        <script key={i} type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }} />
      ))}

      <section className="section sol">
        <nav className="sol-crumbs" aria-label="Breadcrumb">
          <Link href="/">Home</Link> / <Link href="/solutions">Solutions</Link> / <span>{solution.eyebrow}</span>
        </nav>

        <PageHeader
          label={solution.eyebrow}
          titleOutline={solution.titleOutline}
          titleSolid={solution.titleSolid}
          titleColorClass="title-cyan"
          description={solution.intro}
        />

        <div className="sol-facts reveal" aria-label="At a glance">
          <div>
            <span>Price</span>
            <strong>{solution.pricing.from}</strong>
          </div>
          <div>
            <span>Delivery</span>
            <strong>{solution.pricing.timeline}</strong>
          </div>
          <div>
            <span>Quote</span>
            <strong>Fixed, in writing</strong>
          </div>
          <div>
            <span>Ownership</span>
            <strong>You own the code</strong>
          </div>
        </div>

        <div className="sol-inner">
          <h2 className="sol-h2">What matters most</h2>
          <div className="sol-grid">
            {solution.needs.map((need) => (
              <div key={need.title} className="sol-card">
                <h3>{need.title}</h3>
                <p>{need.body}</p>
              </div>
            ))}
          </div>

          <h2 className="sol-h2">What we build</h2>
          <ul className="sol-list">
            {solution.builds.map((item) => (
              <li key={item}>{item}</li>
            ))}
          </ul>

          {solution.extra && (
            <>
              <h2 className="sol-h2">{solution.extra.heading}</h2>
              {solution.extra.paragraphs.map((p) => (
                <p key={p} className="sol-p">
                  {p}
                </p>
              ))}
              {solution.extra.bullets && (
                <ul className="sol-list">
                  {solution.extra.bullets.map((item) => (
                    <li key={item}>{item}</li>
                  ))}
                </ul>
              )}
            </>
          )}

          <h2 className="sol-h2">Price and timeline</h2>
          <div className="sol-card sol-price">
            <strong>{solution.pricing.from}</strong>
            <p>{solution.pricing.detail}</p>
            <p className="sol-timeline">{solution.pricing.timeline}. 30 days of free fixes after launch.</p>
          </div>

          {cases.length > 0 && (
            <>
              <h2 className="sol-h2">{cases.length > 1 ? "Projects like this" : "A project like this"}</h2>
              <div className="sol-cases">
                {cases.map((project) => (
                  <div key={project.slug} className="sol-card">
                    <div className="sol-case-meta">
                      {project.category} · {project.location}
                    </div>
                    <h3>{project.client}</h3>
                    <p>{project.tagline}</p>
                    <p>
                      <strong>Challenge.</strong> {project.caseStudy.challenge}
                    </p>
                    <p>
                      <strong>What we built.</strong> {project.caseStudy.solution}
                    </p>
                    <ul className="sol-results">
                      {project.caseStudy.results.map((r) => (
                        <li key={r.metric + r.description}>
                          <strong>{r.metric}</strong> {r.description}
                        </li>
                      ))}
                    </ul>
                    <Link href={`/work/${project.slug}`} className="sol-link">
                      Read the full case study →
                    </Link>
                  </div>
                ))}
              </div>
            </>
          )}

          <h2 className="sol-h2">Common questions</h2>
          <div className="sol-faq">
            {solution.faqs.map((faq) => (
              <details key={faq.question}>
                <summary>{faq.question}</summary>
                <p>{faq.answer}</p>
              </details>
            ))}
          </div>

          <div className="sol-cta" data-track-location={`solution_${solution.slug}`}>
            <h2>Get a fixed quote within 24 hours</h2>
            <p>Tell us what you need. You&apos;ll hear back from the engineer who would build it, with a price, a timeline and what&apos;s included.</p>
            <div className="sol-cta-btns">
              <Link href="/estimate" className="btn-main">
                Get a free estimate ↗
              </Link>
              <a href={whatsappUrl(solution.whatsappMessage)} target="_blank" rel="noopener noreferrer" className="btn-ghost">
                WhatsApp us
              </a>
              <Link href="/contact" className="btn-ghost">
                Contact form
              </Link>
            </div>
          </div>

          <h2 className="sol-h2">Related</h2>
          <ul className="sol-related">
            <li>
              <Link href={`/services/${solution.serviceSlug}`}>{serviceName} services</Link>
            </li>
            {solution.related.map((link) => (
              <li key={link.href}>
                <Link href={link.href}>{link.label}</Link>
              </li>
            ))}
          </ul>
        </div>
      </section>

      <style>{`
        .sol { content-visibility: visible; }
        .sol-crumbs { max-width: 960px; margin: 0 auto 1.5rem; font-family: 'JetBrains Mono', monospace; font-size: 0.7rem; letter-spacing: 0.05em; color: var(--muted); }
        .sol-crumbs a { color: var(--muted); text-decoration: none; }
        .sol-crumbs a:hover { color: var(--cyan); }
        .sol-facts { max-width: 960px; margin: 0 auto 3rem; display: grid; grid-template-columns: repeat(4, 1fr); gap: 1px; background: var(--border); border: 1px solid var(--border); border-radius: 14px; overflow: hidden; }
        .sol-facts > div { background: rgba(12,12,18,0.9); padding: 1.1rem 1.2rem; display: flex; flex-direction: column; gap: 0.3rem; }
        .sol-facts span { font-family: 'JetBrains Mono', monospace; font-size: 0.62rem; text-transform: uppercase; letter-spacing: 0.08em; color: var(--muted); }
        .sol-facts strong { font-size: 0.98rem; font-weight: 600; }
        .sol-inner { max-width: 960px; margin: 0 auto; }
        .sol-h2 { font-size: clamp(1.3rem, 3vw, 1.8rem); font-weight: 600; margin: 3.2rem 0 1.2rem; }
        .sol-grid, .sol-cases { display: grid; grid-template-columns: repeat(auto-fit, minmax(280px, 1fr)); gap: 1.1rem; }
        .sol-card { position: relative; background: rgba(12,12,18,0.78); border: 1px solid var(--border); border-radius: 14px; padding: 1.4rem 1.5rem; }
        .sol-card h3 { margin: 0 0 0.55rem; font-size: 1.05rem; font-weight: 600; }
        .sol-card p { margin: 0 0 0.7rem; color: rgba(255,255,255,0.78); line-height: 1.7; font-size: 0.93rem; }
        .sol-p { color: rgba(255,255,255,0.8); line-height: 1.8; max-width: 70ch; }
        .sol-list { margin: 0; padding-left: 1.2rem; display: grid; gap: 0.55rem; color: rgba(255,255,255,0.85); line-height: 1.65; }
        .sol-price strong { font-size: 1.6rem; color: var(--cyan); }
        .sol-price .sol-timeline { color: var(--muted); font-size: 0.85rem; margin-bottom: 0; }
        .sol-case-meta { font-family: 'JetBrains Mono', monospace; font-size: 0.65rem; text-transform: uppercase; letter-spacing: 0.06em; color: var(--muted); margin-bottom: 0.5rem; }
        .sol-results { margin: 0.4rem 0 1rem; padding-left: 1.1rem; color: rgba(255,255,255,0.85); font-size: 0.9rem; line-height: 1.7; }
        .sol-results strong { color: var(--cyan); margin-right: 0.3rem; }
        .sol-link { color: var(--cyan); font-size: 0.88rem; text-decoration: none; }
        .sol-faq details { border-top: 1px solid var(--border); padding: 0.2rem 0; }
        .sol-faq details:last-child { border-bottom: 1px solid var(--border); }
        .sol-faq summary { cursor: pointer; padding: 1rem 0; font-weight: 500; list-style: none; display: flex; justify-content: space-between; gap: 1rem; }
        .sol-faq summary::-webkit-details-marker { display: none; }
        .sol-faq summary::after { content: '+'; color: var(--cyan); font-family: 'JetBrains Mono', monospace; }
        .sol-faq details[open] summary::after { content: '–'; }
        .sol-faq details p { margin: 0 0 1.1rem; color: rgba(255,255,255,0.78); line-height: 1.75; max-width: 70ch; }
        .sol-cta { margin-top: 3.5rem; padding: 2rem; border: 1px solid rgba(6,182,212,0.3); border-radius: 16px; background: rgba(6,182,212,0.05); }
        .sol-cta h2 { margin: 0 0 0.6rem; font-size: 1.5rem; font-weight: 600; }
        .sol-cta p { margin: 0 0 1.3rem; color: var(--muted); line-height: 1.7; max-width: 60ch; }
        .sol-cta-btns { display: flex; flex-wrap: wrap; gap: 0.75rem; }
        .sol-related { margin: 0; padding: 0; list-style: none; display: flex; flex-wrap: wrap; gap: 0.6rem 1.6rem; }
        .sol-related a { color: var(--cyan); text-decoration: none; font-size: 0.92rem; }
        @media (max-width: 760px) {
          .sol-facts { grid-template-columns: repeat(2, 1fr); }
          .sol-cta { padding: 1.4rem 1.2rem; }
          .sol-cta-btns > * { flex: 1 1 100%; justify-content: center; text-align: center; }
        }
      `}</style>
    </PageWrapper>
  );
}
