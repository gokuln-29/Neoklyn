"use client";

import { useEffect, useMemo, useState } from "react";

type ArticleClientToolsProps = {
  slug: string;
  title: string;
};

export default function ArticleClientTools({ slug, title }: ArticleClientToolsProps) {
  const [progress, setProgress] = useState(0);
  const [copied, setCopied] = useState(false);
  const [activeHeading, setActiveHeading] = useState<string | null>(null);

  const canonicalUrl = useMemo(() => `https://neoklyn.com/insights/${slug}`, [slug]);
  const encodedTitle = encodeURIComponent(title);
  const encodedUrl = encodeURIComponent(canonicalUrl);

  useEffect(() => {
    function handleScroll() {
      const documentHeight = document.documentElement.scrollHeight - window.innerHeight;
      if (documentHeight <= 0) {
        setProgress(0);
        return;
      }

      const percent = Math.min(100, Math.max(0, (window.scrollY / documentHeight) * 100));
      setProgress(percent);
    }

    handleScroll();
    window.addEventListener("scroll", handleScroll, { passive: true });
    window.addEventListener("resize", handleScroll);
    return () => {
      window.removeEventListener("scroll", handleScroll);
      window.removeEventListener("resize", handleScroll);
    };
  }, []);

  useEffect(() => {
    const headingElements = document.querySelectorAll(".ins-section-block h2[id], .ins-mdx-body h2[id]");

    if (headingElements.length === 0) return;

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setActiveHeading(entry.target.id);
            const tocLinks = document.querySelectorAll(".ins-toc a");
            tocLinks.forEach((link) => {
              const href = link.getAttribute("href");
              if (href === `#${entry.target.id}`) {
                link.classList.add("ins-toc-active");
              } else {
                link.classList.remove("ins-toc-active");
              }
            });
          }
        });
      },
      {
        rootMargin: "-100px 0px -60% 0px",
        threshold: 0,
      }
    );

    headingElements.forEach((el) => observer.observe(el));
    return () => observer.disconnect();
  }, []);

  async function copyLink() {
    try {
      await navigator.clipboard.writeText(canonicalUrl);
      setCopied(true);
      window.setTimeout(() => setCopied(false), 1800);
    } catch {
      setCopied(false);
    }
  }

  return (
    <>
      <div className="ins-progress-bar" style={{ width: `${progress}%` }} />

      <div className="ins-share-row">
        <a
          href={`https://twitter.com/intent/tweet?text=${encodedTitle}&url=${encodedUrl}`}
          target="_blank"
          rel="noreferrer"
        >
          Share on X
        </a>
        <a
          href={`https://www.linkedin.com/sharing/share-offsite/?url=${encodedUrl}`}
          target="_blank"
          rel="noreferrer"
        >
          Share on LinkedIn
        </a>
        <a
          href={`https://wa.me/?text=${encodedTitle}%20${encodedUrl}`}
          target="_blank"
          rel="noreferrer"
        >
          Share on WhatsApp
        </a>
        <button type="button" onClick={() => void copyLink()}>
          {copied ? "Copied" : "Copy Link"}
        </button>
      </div>

      <style>{`
        .ins-progress-bar {
          position: fixed;
          top: 0;
          left: 0;
          z-index: 10000;
          height: 2px;
          background: linear-gradient(90deg, #06b6d4, #3b82f6);
          transition: width 0.12s linear;
          box-shadow: 0 0 8px rgba(6,182,212,0.5);
        }

        .ins-share-row {
          display: flex;
          flex-wrap: wrap;
          gap: 0.45rem;
          margin: 0 0 1.4rem;
        }

        .ins-share-row a,
        .ins-share-row button {
          border: 1px solid rgba(255,255,255,0.13);
          border-radius: 999px;
          background: rgba(255,255,255,0.02);
          color: var(--muted);
          text-decoration: none;
          padding: 0.4rem 0.72rem;
          font-size: 0.64rem;
          font-family: 'JetBrains Mono', monospace;
          letter-spacing: 0.08em;
          text-transform: uppercase;
          cursor: pointer;
          transition: all 0.18s;
        }

        .ins-share-row a:hover,
        .ins-share-row button:hover {
          color: var(--cyan);
          border-color: rgba(6,182,212,0.42);
        }

        .ins-toc a.ins-toc-active {
          color: var(--cyan) !important;
        }
      `}</style>
    </>
  );
}
