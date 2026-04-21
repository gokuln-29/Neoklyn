import PageWrapper from "@/components/layout/PageWrapper";
import Link from "next/link";
import { notFound } from "next/navigation";
import type { Metadata } from "next";
import type { CSSProperties } from "react";
import { projects, projectsBySlug } from "../projects";

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }): Promise<Metadata> {
  const { slug } = await params;
  const project = projectsBySlug[slug];

  if (!project) {
    return {
      title: {
        absolute: "Case Study — NeoKlyn",
      },
    };
  }

  return {
    title: {
      absolute: `${project.client} Case Study — NeoKlyn`,
    },
    description: `${project.description} ${project.keyMetric}.`,
    openGraph: {
      title: `${project.client} Case Study — NeoKlyn`,
      description: `${project.description} ${project.keyMetric}.`,
      url: `https://neoklyn.com/work/${project.slug}`,
      siteName: "NeoKlyn",
      type: "article",
    },
  };
}

export function generateStaticParams() {
  return projects.map((project) => ({
    slug: project.slug,
  }));
}

export default async function CaseStudyPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const project = projectsBySlug[slug];

  if (!project) {
    notFound();
  }

  return (
    <PageWrapper>
      <section className="section" style={{ paddingTop: "145px" }}>
        <div className="case-shell" style={{ "--case-accent": project.color } as CSSProperties}>
          <div className="reveal case-breadcrumbs">
            <Link href="/">Home</Link>
            <span>/</span>
            <Link href="/work">Work</Link>
            <span>/</span>
            <span>{project.client}</span>
          </div>

          <div className="reveal case-meta-row">
            <span className="case-category">{project.category}</span>
            <span className="case-dot">•</span>
            <span className="case-location">{project.location}</span>
            <span className="case-dot">•</span>
            <span className="case-metric">{project.keyMetric}</span>
          </div>

          <h1 className="reveal case-client">{project.client}</h1>
          <p className="reveal case-title">{project.title}</p>
          <p className="reveal case-tagline">{project.tagline}</p>

          <div className="reveal case-actions">
            <Link href="/work" className="case-back-link">
              ← Back to Portfolio
            </Link>
            <a href={project.liveUrl} target="_blank" rel="noopener noreferrer" className="case-live-link">
              Visit Live Site ↗
            </a>
          </div>
        </div>

        <div className="reveal case-hero-image" style={{ backgroundImage: `url(${project.image})` }} />

        <div className="case-shell" style={{ "--case-accent": project.color } as CSSProperties}>
          <div className="case-panel reveal">
            <h2 className="case-h2">Overview</h2>
            {project.caseStudy.overview.map((paragraph) => (
              <p key={paragraph} className="case-body">
                {paragraph}
              </p>
            ))}
          </div>

          <div className="case-two-col">
            <div className="case-panel reveal">
              <h2 className="case-h2">Problem</h2>
              <p className="case-body">{project.caseStudy.challenge}</p>
            </div>
            <div className="case-panel reveal case-solution-panel">
              <h2 className="case-h2">Our Solution</h2>
              <p className="case-body">{project.caseStudy.solution}</p>
            </div>
          </div>

          <div className="case-panel reveal">
            <h2 className="case-h2">Tech Stack</h2>
            <div className="case-tech-grid">
              {project.techStack.map((tech) => (
                <span key={tech} className="case-tech-pill">
                  {tech}
                </span>
              ))}
            </div>
          </div>

          <div className="case-results-block reveal">
            <h2 className="case-h2 case-results-title">Results</h2>
            <div className="case-results-grid">
              {project.caseStudy.results.map((result) => (
                <div key={result.metric + result.description} className="case-result-card">
                  <div className="case-result-metric">{result.metric}</div>
                  <div className="case-result-description">{result.description}</div>
                </div>
              ))}
            </div>
          </div>

          <div className="reveal case-cta">
            <h3>Build your next success story.</h3>
            <Link href="/contact" className="btn-main">
              Start a Project ↗
            </Link>
          </div>
        </div>
      </section>

      <style>{`
        .case-shell {
          max-width: 1060px;
          margin: 0 auto;
          --case-accent: var(--cyan);
        }

        .case-breadcrumbs {
          display: flex;
          align-items: center;
          gap: 0.55rem;
          font-family: 'JetBrains Mono', monospace;
          font-size: 0.67rem;
          text-transform: uppercase;
          letter-spacing: 0.08em;
          color: var(--dim);
          margin-bottom: 1.4rem;
        }

        .case-breadcrumbs a {
          color: var(--muted);
          text-decoration: none;
        }

        .case-breadcrumbs a:hover {
          color: var(--cyan);
        }

        .case-meta-row {
          display: flex;
          flex-wrap: wrap;
          align-items: center;
          gap: 0.7rem;
          margin-bottom: 1.2rem;
        }

        .case-category {
          background: var(--case-accent);
          color: #06080f;
          font-family: 'JetBrains Mono', monospace;
          font-size: 0.65rem;
          text-transform: uppercase;
          letter-spacing: 0.08em;
          border-radius: 5px;
          padding: 0.32rem 0.72rem;
          font-weight: 700;
        }

        .case-dot,
        .case-location,
        .case-metric {
          color: var(--muted);
          font-family: 'JetBrains Mono', monospace;
          font-size: 0.7rem;
          text-transform: uppercase;
          letter-spacing: 0.08em;
        }

        .case-metric {
          color: var(--case-accent);
        }

        .case-client {
          font-size: clamp(2.5rem, 7vw, 4.3rem);
          line-height: 0.98;
          margin-bottom: 0.75rem;
          text-transform: none;
        }

        .case-title {
          font-size: clamp(1.2rem, 3vw, 1.85rem);
          color: var(--case-accent);
          margin-bottom: 0.9rem;
          line-height: 1.3;
        }

        .case-tagline {
          max-width: 760px;
          color: rgba(255,255,255,0.7);
          line-height: 1.75;
          margin-bottom: 2rem;
        }

        .case-actions {
          display: flex;
          flex-wrap: wrap;
          gap: 0.75rem;
          margin-bottom: 2.5rem;
        }

        .case-back-link,
        .case-live-link {
          border: 1px solid var(--border);
          border-radius: 999px;
          padding: 0.65rem 1.1rem;
          text-decoration: none;
          font-family: 'JetBrains Mono', monospace;
          font-size: 0.68rem;
          text-transform: uppercase;
          letter-spacing: 0.08em;
          transition: all 0.22s ease;
        }

        .case-back-link {
          color: var(--muted);
          background: rgba(255,255,255,0.02);
        }

        .case-back-link:hover {
          color: var(--white);
          border-color: rgba(255,255,255,0.28);
        }

        .case-live-link {
          color: var(--case-accent);
          border-color: color-mix(in srgb, var(--case-accent) 45%, var(--border));
          background: color-mix(in srgb, var(--case-accent) 12%, transparent);
        }

        .case-live-link:hover {
          transform: translateX(4px);
          border-color: color-mix(in srgb, var(--case-accent) 70%, var(--border));
        }

        .case-hero-image {
          width: calc(100vw - 8%);
          max-width: 1380px;
          margin: 0 auto 3.5rem;
          height: clamp(280px, 52vw, 620px);
          border-radius: 16px;
          border: 1px solid rgba(255,255,255,0.1);
          background-size: cover;
          background-position: center;
          position: relative;
          overflow: hidden;
        }

        .case-hero-image::after {
          content: "";
          position: absolute;
          inset: 0;
          background: linear-gradient(to top, rgba(8,8,15,0.75), rgba(8,8,15,0.18));
        }

        .case-panel {
          border: 1px solid var(--border);
          border-radius: 16px;
          background: var(--ink);
          padding: clamp(1.4rem, 3vw, 2.25rem);
          margin-bottom: 1.5rem;
        }

        .case-h2 {
          font-size: clamp(1.5rem, 2.5vw, 2rem);
          margin-bottom: 1rem;
          text-transform: none;
          color: var(--case-accent);
        }

        .case-body {
          color: rgba(255,255,255,0.76);
          line-height: 1.85;
          margin-bottom: 1rem;
          font-size: 0.96rem;
        }

        .case-body:last-child {
          margin-bottom: 0;
        }

        .case-two-col {
          display: grid;
          grid-template-columns: 1fr 1fr;
          gap: 1.5rem;
        }

        .case-solution-panel {
          border-left: 3px solid color-mix(in srgb, var(--case-accent) 70%, transparent);
        }

        .case-tech-grid {
          display: flex;
          flex-wrap: wrap;
          gap: 0.65rem;
        }

        .case-tech-pill {
          border-radius: 999px;
          border: 1px solid rgba(255,255,255,0.14);
          background: rgba(255,255,255,0.02);
          padding: 0.5rem 0.9rem;
          font-family: 'JetBrains Mono', monospace;
          font-size: 0.66rem;
          text-transform: uppercase;
          letter-spacing: 0.08em;
          color: rgba(255,255,255,0.82);
        }

        .case-results-block {
          margin-top: 0.7rem;
        }

        .case-results-title {
          margin-bottom: 1.2rem;
        }

        .case-results-grid {
          display: grid;
          grid-template-columns: repeat(3, minmax(0, 1fr));
          gap: 1rem;
        }

        .case-result-card {
          border: 1px solid rgba(255,255,255,0.08);
          border-radius: 14px;
          padding: 1.5rem 1.2rem;
          text-align: center;
          background: radial-gradient(circle at 50% 8%, color-mix(in srgb, var(--case-accent) 18%, transparent) 0%, transparent 72%);
        }

        .case-result-metric {
          color: var(--case-accent);
          font-size: clamp(1.8rem, 4vw, 2.65rem);
          line-height: 1;
          margin-bottom: 0.45rem;
          font-weight: 700;
          font-family: var(--font-space-grotesk), sans-serif;
        }

        .case-result-description {
          color: rgba(255,255,255,0.68);
          text-transform: uppercase;
          letter-spacing: 0.05em;
          font-size: 0.66rem;
          font-family: 'JetBrains Mono', monospace;
        }

        .case-cta {
          margin-top: 3.25rem;
          padding: 2.6rem 0 0;
          border-top: 1px solid var(--border);
          text-align: center;
        }

        .case-cta h3 {
          margin-bottom: 1.35rem;
          font-size: clamp(1.3rem, 3.2vw, 2rem);
          text-transform: none;
        }

        @media (max-width: 900px) {
          .case-two-col {
            grid-template-columns: 1fr;
            gap: 0;
          }

          .case-results-grid {
            grid-template-columns: 1fr;
          }

          .case-actions {
            flex-direction: column;
            align-items: flex-start;
          }
        }
      `}</style>
    </PageWrapper>
  );
}
