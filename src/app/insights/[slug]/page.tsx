import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { compileMDX } from "next-mdx-remote/rsc";
import rehypeSlug from "rehype-slug";
import remarkGfm from "remark-gfm";
import PageWrapper from "@/components/layout/PageWrapper";
import ArticleClientTools from "@/components/insights/ArticleClientTools";
import { AUTHOR } from "@/data/author";
import {
  getAllInsightSummaries,
  getInsightBySlug,
  getRelatedInsightSummaries,
} from "@/lib/insights";

type TocItem = {
  id: string;
  title: string;
};

function slugifyHeading(input: string) {
  return input
    .toLowerCase()
    .replace(/[^a-z0-9\s-]/g, "")
    .trim()
    .replace(/\s+/g, "-")
    .replace(/-+/g, "-");
}

function dateToIso(dateText: string) {
  const parsed = Date.parse(dateText);
  if (Number.isNaN(parsed)) return new Date().toISOString();
  return new Date(parsed).toISOString();
}

function extractMdxHeadings(markdown: string): TocItem[] {
  return markdown
    .split("\n")
    .filter((line) => line.trim().startsWith("## "))
    .map((line) => line.replace(/^##\s+/, "").trim())
    .filter(Boolean)
    .map((title) => ({
      title,
      id: slugifyHeading(title),
    }));
}

export async function generateStaticParams() {
  const posts = await getAllInsightSummaries();
  return posts.map((post) => ({ slug: post.slug }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const insight = await getInsightBySlug(slug);

  if (!insight) {
    return {
      title: {
        absolute: "Insight — NeoKlyn",
      },
    };
  }

  const post = insight.post;
  const title = `${post.title} | NeoKlyn Insights`;
  const description = post.metaDescription;
  const canonicalUrl = `https://neoklyn.com/insights/${post.slug}`;
  const ogImageUrl = `${canonicalUrl}/opengraph-image`;

  return {
    title: {
      absolute: title,
    },
    description,
    keywords: [post.primaryKeyword, ...post.secondaryKeywords],
    authors: [{ name: AUTHOR.name, url: AUTHOR.linkedin }],
    alternates: {
      canonical: canonicalUrl,
    },
    openGraph: {
      title,
      description,
      url: canonicalUrl,
      siteName: "NeoKlyn",
      type: "article",
      publishedTime: dateToIso(post.date),
      modifiedTime: dateToIso(post.date),
      authors: [AUTHOR.name],
      images: [
        {
          url: ogImageUrl,
          width: 1200,
          height: 630,
          alt: post.title,
        },
      ],
    },
    twitter: {
      card: "summary_large_image",
      title,
      description,
      images: [ogImageUrl],
    },
  };
}

export default async function BlogPostPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const insight = await getInsightBySlug(slug);

  if (!insight) {
    notFound();
  }

  const post = insight.post;
  const tsPost = insight.source === "ts" ? insight.post : null;
  const mdxPost = insight.source === "mdx" ? insight.post : null;

  const tocItems: TocItem[] =
    tsPost
      ? [
          ...tsPost.content.sections.map((section) => ({
            id: slugifyHeading(section.heading),
            title: section.heading,
          })),
          {
            id: slugifyHeading("Conclusion"),
            title: "Conclusion",
          },
        ]
      : mdxPost && mdxPost.outline.length
        ? mdxPost.outline.map((title) => ({
            title,
            id: slugifyHeading(title),
          }))
        : extractMdxHeadings(mdxPost?.body || "");

  const mdxCompiled = mdxPost
      ? await compileMDX({
          source: mdxPost.body,
          options: {
            mdxOptions: {
              remarkPlugins: [remarkGfm],
              rehypePlugins: [rehypeSlug],
            },
          },
        })
      : null;

  const relatedPosts = await getRelatedInsightSummaries(post.slug, post.categorySlug, 3);

  const articleSchema = {
    "@context": "https://schema.org",
    "@type": "Article",
    headline: post.title,
    description: post.metaDescription,
    image: `https://neoklyn.com/insights/${post.slug}/opengraph-image`,
    keywords: [post.primaryKeyword, ...post.secondaryKeywords].join(", "),
    author: {
      "@type": "Person",
      name: AUTHOR.name,
      jobTitle: AUTHOR.role,
      url: AUTHOR.linkedin,
    },
    datePublished: dateToIso(post.date),
    dateModified: dateToIso(post.date),
    mainEntityOfPage: `https://neoklyn.com/insights/${post.slug}`,
    publisher: {
      "@type": "Organization",
      name: "NeoKlyn",
      logo: {
        "@type": "ImageObject",
        url: "https://neoklyn.com/logo.png",
      },
    },
  };

  return (
    <PageWrapper>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(articleSchema) }}
      />

      <section className="section" style={{ paddingTop: "145px" }}>
        <div className="ins-shell">
          <Link href="/insights" className="ins-back-link reveal">
            ← Back to Insights
          </Link>

          <div className="ins-meta-row reveal">
            <span style={{ color: post.color }}>{post.category}</span>
            <span style={{ color: "var(--muted)" }}>•</span>
            <span style={{ color: "var(--muted)" }}>{post.readTime}</span>
            <span style={{ color: "var(--muted)" }}>•</span>
            <span style={{ color: "var(--muted)" }}>{post.date}</span>
          </div>

          <h1 className="ins-title reveal">{post.title}</h1>

          <div className="ins-author-row reveal">
            <div className="ins-author-avatar">{AUTHOR.initials}</div>
            <div className="ins-author-info">
              <div className="ins-author-name">
                {AUTHOR.name}
                <a href={AUTHOR.linkedin} target="_blank" rel="noopener noreferrer"
                   className="ins-linkedin-link" aria-label="LinkedIn profile">
                  <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor">
                    <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z"/>
                  </svg>
                </a>
              </div>
              <div className="ins-author-role">{AUTHOR.role}</div>
              <div className="ins-author-date">Published on {post.date}</div>
            </div>
          </div>
          <p className="ins-author-bio reveal">{AUTHOR.bio}</p>

          <ArticleClientTools slug={post.slug} title={post.title} />
        </div>

        <div className="ins-layout">
          <aside className="ins-toc reveal">
            <h3>On This Page</h3>
            <ul>
              {tocItems.map((item) => (
                <li key={item.id}>
                  <a href={`#${item.id}`}>{item.title}</a>
                </li>
              ))}
            </ul>
          </aside>

          <article className="ins-article reveal">
            {tsPost ? (
              <>
                <p className="ins-lead">{tsPost.content.intro}</p>

                {tsPost.content.sections.map((section) => (
                  <section key={section.heading} className="ins-section-block">
                    <h2 id={slugifyHeading(section.heading)}>{section.heading}</h2>
                    <p>{section.body}</p>
                  </section>
                ))}

                {tsPost.content.callout && (
                  <div className="ins-callout" style={{ borderLeftColor: post.color }}>
                    <h3>{tsPost.content.callout.title}</h3>
                    <p>{tsPost.content.callout.body}</p>
                  </div>
                )}

                <section className="ins-section-block">
                  <h2 id={slugifyHeading("Conclusion")}>Conclusion</h2>
                  <p>{tsPost.content.conclusion}</p>
                </section>
              </>
            ) : (
              <div className="ins-mdx-body">{mdxCompiled?.content}</div>
            )}
          </article>
        </div>

        {relatedPosts.length > 0 && (
          <div className="ins-shell" style={{ marginTop: "4rem" }}>
            <h3 className="ins-related-title reveal">Related Articles</h3>
            <div className="ins-related-grid">
              {relatedPosts.map((related) => (
                <Link
                  key={related.slug}
                  href={`/insights/${related.slug}`}
                  className="ins-related-card reveal"
                >
                  <div className="ins-related-meta">
                    <span style={{ color: related.color }}>{related.category}</span>
                    <span>{related.date}</span>
                  </div>
                  <h4>{related.title}</h4>
                  <p className="ins-related-excerpt">{related.excerpt}</p>
                </Link>
              ))}
            </div>
          </div>
        )}

        <div className="ins-shell" style={{ marginTop: "4rem" }}>
          <div className="ins-cta reveal">
            <h3>Ready to build your next digital advantage?</h3>
            <Link href="/contact" className="btn-main">
              Talk to our engineering team
            </Link>
          </div>
        </div>
      </section>

      <style>{`
        .ins-shell {
          max-width: 1040px;
          margin: 0 auto;
        }

        .ins-back-link {
          color: var(--muted);
          text-decoration: none;
          font-size: 0.88rem;
          display: inline-block;
          margin-bottom: 1.4rem;
        }

        .ins-back-link:hover {
          color: var(--cyan);
        }

        .ins-meta-row {
          display: flex;
          flex-wrap: wrap;
          gap: 0.65rem;
          font-family: 'JetBrains Mono', monospace;
          font-size: 0.72rem;
          text-transform: uppercase;
          letter-spacing: 0.05em;
          margin-bottom: 1rem;
        }

        .ins-title {
          margin: 0 0 1.2rem;
          font-size: clamp(2rem, 4.8vw, 3.35rem);
          line-height: 1.15;
          text-transform: none;
        }

        .ins-author-row {
          display: flex;
          align-items: center;
          gap: 0.9rem;
          margin-bottom: 1.2rem;
          padding-bottom: 1.2rem;
          border-bottom: 1px solid rgba(255,255,255,0.09);
        }

        .ins-author-avatar {
          width: 44px;
          height: 44px;
          border-radius: 50%;
          background: linear-gradient(135deg, rgba(6,182,212,0.3), rgba(139,92,246,0.3));
          border: 2px solid rgba(6,182,212,0.5);
          display: flex;
          align-items: center;
          justify-content: center;
          font-family: 'JetBrains Mono', monospace;
          font-size: 0.95rem;
          font-weight: 600;
          color: var(--cyan);
          flex-shrink: 0;
        }

        .ins-author-info {
          display: flex;
          flex-direction: column;
          gap: 0.15rem;
        }

        .ins-author-name {
          font-size: 0.95rem;
          color: var(--white);
          font-weight: 500;
          display: flex;
          align-items: center;
          gap: 0.5rem;
        }

        .ins-author-role {
          font-size: 0.75rem;
          color: var(--muted);
        }

        .ins-author-date {
          font-size: 0.75rem;
          color: var(--muted);
        }

        .ins-linkedin-link {
          color: var(--muted);
          display: inline-flex;
          align-items: center;
          transition: color 0.2s ease;
        }

        .ins-linkedin-link:hover {
          color: #0A66C2;
          filter: drop-shadow(0 0 4px rgba(10,102,194,0.5));
        }

        .ins-author-bio {
          font-size: 0.88rem;
          color: rgba(255,255,255,0.6);
          line-height: 1.65;
          margin: 0 0 2rem;
          padding: 0.9rem;
          background: rgba(255,255,255,0.02);
          border-radius: 8px;
          border-left: 3px solid rgba(6,182,212,0.4);
        }

        .ins-layout {
          max-width: 1040px;
          margin: 0 auto;
          display: grid;
          grid-template-columns: 250px minmax(0, 1fr);
          gap: 2rem;
          align-items: start;
        }

        .ins-toc {
          position: sticky;
          top: 110px;
          border: 1px solid rgba(255,255,255,0.08);
          border-radius: 12px;
          background: rgba(255,255,255,0.02);
          padding: 1rem;
        }

        .ins-toc h3 {
          margin: 0 0 0.75rem;
          font-size: 0.9rem;
          font-family: 'JetBrains Mono', monospace;
          color: var(--cyan);
          letter-spacing: 0.06em;
          text-transform: uppercase;
        }

        .ins-toc ul {
          margin: 0;
          padding: 0;
          list-style: none;
          display: flex;
          flex-direction: column;
          gap: 0.45rem;
        }

        .ins-toc a {
          text-decoration: none;
          color: rgba(255,255,255,0.68);
          font-size: 0.78rem;
          line-height: 1.45;
        }

        .ins-toc a:hover {
          color: var(--cyan);
        }

        .ins-article {
          font-size: 1.02rem;
        }

        .ins-lead {
          margin: 0 0 1.4rem;
          color: rgba(255,255,255,0.82);
          line-height: 1.85;
          font-size: 1.15rem;
        }

        .ins-section-block {
          margin-bottom: 2rem;
        }

        .ins-section-block h2,
        .ins-mdx-body h2 {
          margin: 2.4rem 0 1rem;
          font-size: 1.65rem;
          color: var(--cyan);
          scroll-margin-top: 110px;
          text-transform: none;
        }

        .ins-mdx-body h3 {
          margin: 1.7rem 0 0.85rem;
          font-size: 1.18rem;
          color: var(--white);
          text-transform: none;
        }

        .ins-section-block p,
        .ins-mdx-body p,
        .ins-mdx-body li {
          color: rgba(255,255,255,0.74);
          line-height: 1.85;
        }

        .ins-mdx-body ul,
        .ins-mdx-body ol {
          padding-left: 1.2rem;
        }

        .ins-mdx-body code {
          font-family: 'JetBrains Mono', monospace;
          background: rgba(255,255,255,0.07);
          border-radius: 5px;
          padding: 0.05rem 0.35rem;
          font-size: 0.88em;
        }

        .ins-mdx-body pre {
          border: 1px solid rgba(255,255,255,0.08);
          border-radius: 12px;
          padding: 1rem;
          overflow-x: auto;
          background: rgba(12,12,18,0.9);
        }

        .ins-mdx-body pre code {
          background: transparent;
          padding: 0;
        }

        .ins-callout {
          margin: 2.5rem 0;
          border-left: 4px solid var(--cyan);
          border-radius: 0 12px 12px 0;
          background: rgba(255,255,255,0.03);
          padding: 1.4rem;
        }

        .ins-callout h3 {
          margin: 0 0 0.6rem;
          color: var(--white);
          font-size: 1.1rem;
        }

        .ins-callout p {
          margin: 0;
          font-size: 0.95rem;
          line-height: 1.7;
          color: rgba(255,255,255,0.75);
        }

        .ins-related-title {
          margin: 0 0 1rem;
          font-size: 1.38rem;
          text-transform: none;
        }

        .ins-related-grid {
          display: grid;
          grid-template-columns: repeat(3, minmax(0, 1fr));
          gap: 0.85rem;
        }

        .ins-related-card {
          text-decoration: none;
          color: inherit;
          border: 1px solid rgba(255,255,255,0.1);
          border-radius: 12px;
          background: rgba(255,255,255,0.02);
          padding: 0.95rem;
          transition: border-color 0.2s, transform 0.2s;
        }

        .ins-related-card:hover {
          border-color: rgba(6,182,212,0.4);
          transform: translateY(-2px);
        }

        .ins-related-meta {
          display: flex;
          justify-content: space-between;
          gap: 0.5rem;
          font-family: 'JetBrains Mono', monospace;
          font-size: 0.62rem;
          letter-spacing: 0.05em;
          text-transform: uppercase;
          color: var(--muted);
          margin-bottom: 0.55rem;
        }

        .ins-related-card h4 {
          margin: 0;
          font-size: 0.97rem;
          line-height: 1.45;
          text-transform: none;
          color: rgba(255,255,255,0.92);
        }

        .ins-related-excerpt {
          margin: 0.4rem 0 0;
          font-size: 0.82rem;
          color: rgba(255,255,255,0.55);
          line-height: 1.5;
          display: -webkit-box;
          -webkit-line-clamp: 2;
          -webkit-box-orient: vertical;
          overflow: hidden;
        }

        .ins-cta {
          border-top: 1px solid rgba(255,255,255,0.1);
          padding-top: 2rem;
          text-align: center;
        }

        .ins-cta h3 {
          margin: 0 0 1rem;
          font-size: 1.45rem;
          text-transform: none;
        }

        @media (max-width: 980px) {
          .ins-layout {
            grid-template-columns: 1fr;
          }

          .ins-toc {
            position: static;
          }

          .ins-related-grid {
            grid-template-columns: 1fr;
          }
        }
      `}</style>
    </PageWrapper>
  );
}
