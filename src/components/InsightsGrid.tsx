"use client";

import Link from "next/link";
import { useMemo, useState } from "react";
import type { CSSProperties } from "react";
import type { InsightSummary } from "@/lib/insights";

type InsightsGridProps = {
  posts: InsightSummary[];
  filters: { label: string; slug: string }[];
};

export default function InsightsGrid({ posts, filters }: InsightsGridProps) {
  const [activeFilter, setActiveFilter] = useState("all");

  const visiblePosts = useMemo(() => {
    if (activeFilter === "all") return posts;
    return posts.filter((post) => post.categorySlug === activeFilter);
  }, [activeFilter, posts]);

  return (
    <>
      <div className="ins-filter-row reveal">
        {filters.map((filter) => (
          <button
            key={filter.slug}
            type="button"
            className={`ins-filter-pill ${activeFilter === filter.slug ? "active" : ""}`}
            onClick={() => setActiveFilter(filter.slug)}
          >
            {filter.label}
          </button>
        ))}
      </div>

      <div className="ins-grid" key={activeFilter}>
        {visiblePosts.map((post) => (
          <Link
            href={`/insights/${post.slug}`}
            key={`${activeFilter}-${post.slug}`}
            className="ins-card reveal"
            style={{ "--ins-accent": post.color } as CSSProperties}
          >
            <div className="ins-hover-glow" />

            <div className="ins-card-meta">
              <div className="ins-card-meta-left">
                <span className="ins-category">{post.category}</span>
                <span>•</span>
                <span>{post.readTime}</span>
              </div>
              <span>{post.date}</span>
            </div>

            <h3>{post.title}</h3>
            <p className="ins-excerpt">{post.excerpt}</p>

            <div className="ins-card-footer">
              <span>By {post.author}</span>
              <span className="ins-arrow">→</span>
            </div>
          </Link>
        ))}
      </div>

      <style>{`
        .ins-filter-row {
          margin-top: 3rem;
          display: flex;
          flex-wrap: wrap;
          gap: 0.55rem;
        }

        .ins-filter-pill {
          border: 1px solid rgba(255,255,255,0.12);
          border-radius: 999px;
          background: rgba(255,255,255,0.02);
          color: var(--muted);
          padding: 0.44rem 0.8rem;
          font-family: 'JetBrains Mono', monospace;
          font-size: 0.66rem;
          text-transform: uppercase;
          letter-spacing: 0.08em;
          cursor: pointer;
          transition: all 0.2s ease;
        }

        .ins-filter-pill:hover {
          border-color: rgba(6,182,212,0.34);
          color: var(--white);
        }

        .ins-filter-pill.active {
          border-color: rgba(6,182,212,0.55);
          color: var(--cyan);
          background: rgba(6,182,212,0.12);
        }

        .ins-grid {
          margin-top: 1.5rem;
          display: grid;
          grid-template-columns: repeat(auto-fit, minmax(330px, 1fr));
          gap: 1.45rem;
          animation: ins-grid-fade 0.28s ease;
        }

        @keyframes ins-grid-fade {
          from {
            opacity: 0;
            transform: translateY(10px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }

        .ins-card {
          text-decoration: none;
          color: inherit;
          position: relative;
          overflow: hidden;
          border: 1px solid rgba(255,255,255,0.1);
          border-radius: 14px;
          background: rgba(255,255,255,0.02);
          padding: 1.45rem;
          transition: transform 0.2s ease, border-color 0.2s ease;
          display: flex;
          flex-direction: column;
          min-height: 290px;
        }

        .ins-card:hover {
          transform: translateY(-4px);
          border-color: color-mix(in srgb, var(--ins-accent) 45%, rgba(255,255,255,0.24));
        }

        .ins-hover-glow {
          position: absolute;
          inset: 0;
          opacity: 0;
          transition: opacity 0.25s;
          background: radial-gradient(100% 100% at 50% 100%, color-mix(in srgb, var(--ins-accent) 34%, transparent) 0%, transparent 82%);
          pointer-events: none;
        }

        .ins-card:hover .ins-hover-glow {
          opacity: 1;
        }

        .ins-card-meta {
          display: flex;
          justify-content: space-between;
          align-items: center;
          font-family: 'JetBrains Mono', monospace;
          font-size: 0.64rem;
          text-transform: uppercase;
          color: var(--muted);
          letter-spacing: 0.05em;
          margin-bottom: 1rem;
          position: relative;
          z-index: 1;
          gap: 0.6rem;
        }

        .ins-card-meta-left {
          display: inline-flex;
          align-items: center;
          gap: 0.45rem;
          min-width: 0;
        }

        .ins-category {
          color: var(--ins-accent);
          max-width: 160px;
          overflow: hidden;
          white-space: nowrap;
          text-overflow: ellipsis;
        }

        .ins-card h3 {
          margin: 0;
          font-size: 1.34rem;
          line-height: 1.42;
          color: var(--white);
          position: relative;
          z-index: 1;
        }

        .ins-excerpt {
          margin: 0.85rem 0 0;
          color: rgba(255,255,255,0.7);
          line-height: 1.7;
          font-size: 0.88rem;
          position: relative;
          z-index: 1;
          flex: 1;
        }

        .ins-card-footer {
          margin-top: 1.2rem;
          padding-top: 0.95rem;
          border-top: 1px solid rgba(255,255,255,0.08);
          display: flex;
          justify-content: space-between;
          align-items: center;
          font-family: 'JetBrains Mono', monospace;
          font-size: 0.7rem;
          color: rgba(255,255,255,0.72);
          text-transform: uppercase;
          letter-spacing: 0.05em;
          position: relative;
          z-index: 1;
        }

        .ins-arrow {
          font-size: 1rem;
          color: rgba(255,255,255,0.6);
          transition: transform 0.2s ease, color 0.2s ease;
        }

        .ins-card:hover .ins-arrow {
          color: var(--ins-accent);
          transform: translateX(3px);
        }

        @media (max-width: 640px) {
          .ins-grid {
            grid-template-columns: 1fr;
          }

          .ins-card {
            min-height: 250px;
          }
        }
      `}</style>
    </>
  );
}
