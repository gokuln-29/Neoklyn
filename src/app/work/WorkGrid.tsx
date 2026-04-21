"use client";

import Link from "next/link";
import { useMemo, useState } from "react";
import { useRouter } from "next/navigation";
import type { CSSProperties } from "react";
import type { Project } from "./projects";
import { projectFilters } from "./projects";

type WorkGridProps = {
  projects: Project[];
};

export default function WorkGrid({ projects }: WorkGridProps) {
  const router = useRouter();
  const [activeFilter, setActiveFilter] = useState<(typeof projectFilters)[number]>("All");

  const filteredProjects = useMemo(() => {
    if (activeFilter === "All") return projects;
    return projects.filter((project) => project.filters.includes(activeFilter));
  }, [activeFilter, projects]);

  return (
    <>
      <div className="work-filter-row reveal">
        {projectFilters.map((filter) => (
          <button
            key={filter}
            type="button"
            className={`work-filter-pill ${activeFilter === filter ? "active" : ""}`}
            onClick={() => setActiveFilter(filter)}
          >
            {filter}
          </button>
        ))}
      </div>

      <div className="work-grid reveal">
        {filteredProjects.map((project) => (
          <div
            key={`${activeFilter}-${project.slug}`}
            className="work-card"
            style={{ 
              "--work-accent": project.color,
              cursor: 'pointer'
            } as CSSProperties}
            onClick={() => router.push(`/work/${project.slug}`)}
          >
            <div
              className="work-card-bg"
              style={{
                backgroundImage: `linear-gradient(to top, rgba(10,10,15,0.98) 6%, rgba(10,10,15,0.62) 48%, rgba(0,0,0,0.16) 100%), url(${project.image})`,
              }}
            />
            <div className="work-card-content">
              <div className="work-card-meta">
                <span className="work-card-badge">{project.category}</span>
                <span className="work-card-location">{project.location}</span>
              </div>

              <h3 className="work-card-client">{project.client}</h3>
              <p className="work-card-metric">{project.keyMetric}</p>
              <p className="work-card-desc">{project.description}</p>

              <div className="work-card-tech-row">
                {project.techStack.slice(0, 3).map((tech) => (
                  <span key={tech} className="work-card-tech-pill">
                    {tech}
                  </span>
                ))}
              </div>

              <div className="work-card-actions">
                <a
                  href={project.liveUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="work-card-live"
                  onClick={(e) => e.stopPropagation()}
                >
                  Live Site ↗
                </a>
                <Link 
                  href={`/work/${project.slug}`} 
                  className="work-card-case"
                  onClick={(e) => e.stopPropagation()}
                >
                  Case Study →
                </Link>
              </div>
            </div>
          </div>
        ))}
      </div>

      <style>{`
        .work-filter-row {
          display: flex;
          flex-wrap: wrap;
          gap: 0.7rem;
          margin-top: 3.2rem;
        }

        .work-filter-pill {
          background: rgba(255,255,255,0.02);
          border: 1px solid var(--border);
          color: var(--muted);
          font-family: 'JetBrains Mono', monospace;
          font-size: 0.7rem;
          letter-spacing: 0.08em;
          text-transform: uppercase;
          padding: 0.62rem 1rem;
          border-radius: 999px;
          cursor: pointer;
          transition: all 0.25s ease;
        }

        .work-filter-pill:hover {
          border-color: rgba(6,182,212,0.3);
          color: var(--white);
        }

        .work-filter-pill.active {
          background: rgba(6,182,212,0.14);
          border-color: rgba(6,182,212,0.5);
          color: var(--cyan);
        }

        .work-grid {
          display: grid;
          grid-template-columns: repeat(auto-fit, minmax(380px, 1fr));
          gap: 2rem;
          margin-top: 2rem;
        }

        .work-card {
          position: relative;
          overflow: hidden;
          min-height: 430px;
          border-radius: 14px;
          border: 1px solid var(--border);
          text-decoration: none;
          color: inherit;
          display: flex;
          animation: workFadeIn 0.35s ease both;
          transition: transform 0.28s ease, border-color 0.28s ease;
        }

        .work-card:hover {
          transform: translateY(-5px);
          border-color: color-mix(in srgb, var(--work-accent) 40%, #1f2430);
        }

        .work-card-bg {
          position: absolute;
          inset: 0;
          background-size: cover;
          background-position: center;
          transform: scale(1.01);
          transition: transform 0.45s ease;
        }

        .work-card:hover .work-card-bg {
          transform: scale(1.06);
        }

        .work-card-content {
          position: relative;
          z-index: 1;
          width: 100%;
          display: flex;
          flex-direction: column;
          justify-content: flex-end;
          gap: 0.8rem;
          padding: 2.1rem;
        }

        .work-card-meta {
          display: flex;
          justify-content: space-between;
          align-items: center;
          gap: 0.75rem;
        }

        .work-card-badge {
          display: inline-block;
          background: color-mix(in srgb, var(--work-accent) 84%, #0b0d14);
          color: #04070d;
          border-radius: 6px;
          padding: 0.34rem 0.7rem;
          font-size: 0.66rem;
          text-transform: uppercase;
          letter-spacing: 0.08em;
          font-family: 'JetBrains Mono', monospace;
          font-weight: 700;
        }

        .work-card-location {
          color: rgba(255,255,255,0.78);
          font-size: 0.7rem;
          text-transform: uppercase;
          letter-spacing: 0.12em;
          font-family: 'JetBrains Mono', monospace;
        }

        .work-card-client {
          font-family: var(--font-space-grotesk), sans-serif;
          font-size: clamp(1.45rem, 2.3vw, 1.95rem);
          margin: 0;
          line-height: 1.1;
        }

        .work-card-metric {
          margin: 0;
          color: var(--work-accent);
          font-size: 0.9rem;
          font-family: 'JetBrains Mono', monospace;
          letter-spacing: 0.06em;
          text-transform: uppercase;
        }

        .work-card-desc {
          margin: 0;
          color: rgba(255,255,255,0.72);
          line-height: 1.65;
          font-size: 0.88rem;
        }

        .work-card-tech-row {
          display: flex;
          flex-wrap: wrap;
          gap: 0.5rem;
        }

        .work-card-tech-pill {
          border: 1px solid rgba(255,255,255,0.16);
          border-radius: 999px;
          padding: 0.3rem 0.58rem;
          font-size: 0.64rem;
          letter-spacing: 0.06em;
          text-transform: uppercase;
          color: rgba(255,255,255,0.76);
          font-family: 'JetBrains Mono', monospace;
          background: rgba(0,0,0,0.24);
        }

.work-card-actions {
          margin-top: 0.55rem;
          display: flex;
          gap: 0.85rem;
        }

        .work-card-live,
        .work-card-case {
          font-size: 0.78rem;
          color: rgba(255,255,255,0.52);
          text-transform: uppercase;
          letter-spacing: 0.1em;
          font-family: 'JetBrains Mono', monospace;
          transition: color 0.22s ease;
          text-decoration: none;
        }

        .work-card-live:hover,
        .work-card-case:hover {
          color: var(--cyan);
        }

        .work-card:hover .work-card-link {
          transform: translateX(6px);
          opacity: 1;
        }

        @keyframes workFadeIn {
          from {
            opacity: 0;
            transform: translateY(10px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }

        @media (max-width: 900px) {
          .work-grid {
            grid-template-columns: 1fr;
          }

          .work-card {
            min-height: 400px;
          }
        }
      `}</style>
    </>
  );
}
