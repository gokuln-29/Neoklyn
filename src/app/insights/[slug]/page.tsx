import PageWrapper from "@/components/layout/PageWrapper";
import Link from "next/link";
import { notFound } from "next/navigation";
import type { Metadata } from "next";
import { blogPosts, getPostBySlug } from "@/data/blogPosts";

export async function generateStaticParams() {
  return blogPosts.map((post) => ({
    slug: post.slug,
  }));
}

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }): Promise<Metadata> {
  const { slug } = await params;
  const post = getPostBySlug(slug);

  if (!post) {
      return { title: "Insight | NeoKlyn" };
  }

  return {
      title: `${post.title} | NeoKlyn Insights`,
      description: post.metaDescription || `Read ${post.title} written by ${post.author} on NeoKlyn's Engineering and Data Blog.`,
  };
}

export default async function BlogPostPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const post = getPostBySlug(slug);

  if (!post) {
    notFound();
  }

  return (
    <PageWrapper>
      <section className="section" style={{ paddingTop: '150px' }}>
        <div style={{ maxWidth: '800px', margin: '0 auto' }}>
          <div className="reveal">
            <Link href="/insights" style={{ color: 'var(--muted)', textDecoration: 'none', fontSize: '0.9rem', display: 'inline-block', marginBottom: '2rem' }}>
              &larr; Back to Insights
            </Link>
            
            <div style={{ display: 'flex', gap: '1rem', alignItems: 'center', marginBottom: '1rem', fontFamily: "'JetBrains Mono', monospace", fontSize: '0.8rem', textTransform: 'uppercase', color: post.color }}>
              <span>{post.category}</span>
              <span style={{ color: 'var(--muted)' }}>•</span>
              <span style={{ color: 'var(--muted)' }}>{post.readTime}</span>
            </div>

            <h1 className="hero-title" style={{ fontSize: '3rem', marginBottom: '2rem', lineHeight: 1.2, textTransform: 'none' }}>
              {post.title}
            </h1>

            <div style={{ display: 'flex', alignItems: 'center', paddingBottom: '2rem', borderBottom: '1px solid var(--border)', marginBottom: '3rem' }}>
              <div style={{ width: '40px', height: '40px', borderRadius: '50%', background: 'rgba(255,255,255,0.1)', display: 'flex', alignItems: 'center', justifyContent: 'center', marginRight: '1rem', fontFamily: "'JetBrains Mono', monospace", color: 'var(--white)' }}>
                {post.author.charAt(0)}
              </div>
              <div>
                <div style={{ fontWeight: 'bold' }}>{post.author}</div>
                <div style={{ fontSize: '0.8rem', color: 'var(--muted)' }}>{post.date}</div>
              </div>
            </div>
          </div>

          <article className="reveal" style={{ fontSize: '1.1rem' }}>
            <p className="lead" style={{ fontSize: '1.25rem', lineHeight: 1.8, marginBottom: '2rem', color: 'rgba(255,255,255,0.8)' }}>
              {post.content.intro}
            </p>

            {post.content.sections.map((section, idx) => (
              <div key={idx} style={{ marginBottom: '2.5rem' }}>
                <h2 style={{ fontSize: '1.8rem', marginTop: '3rem', marginBottom: '1.5rem', color: post.color }}>{section.heading}</h2>
                <p style={{ lineHeight: 1.8, marginBottom: '1.5rem', color: 'rgba(255,255,255,0.7)' }}>
                  {section.body}
                </p>
              </div>
            ))}

            {post.content.callout && (
              <div style={{ padding: '2rem', borderLeft: `4px solid ${post.color}`, background: 'rgba(255,255,255,0.03)', marginTop: '3rem', marginBottom: '3rem', borderRadius: '0 12px 12px 0' }}>
                <h3 style={{ fontSize: '1.2rem', marginBottom: '1rem', color: 'var(--white)' }}>{post.content.callout.title}</h3>
                <p style={{ lineHeight: 1.6, color: 'rgba(255,255,255,0.8)', fontSize: '0.95rem' }}>
                  {post.content.callout.body}
                </p>
              </div>
            )}

            <h2 style={{ fontSize: '1.8rem', marginTop: '3rem', marginBottom: '1.5rem', color: post.color }}>Conclusion</h2>
            <p style={{ lineHeight: 1.8, marginBottom: '1.5rem', color: 'rgba(255,255,255,0.7)' }}>
              {post.content.conclusion}
            </p>
          </article>

          <div style={{ marginTop: '5rem', paddingTop: '3rem', borderTop: '1px solid var(--border)', textAlign: 'center' }}>
            <h3 style={{ fontSize: '1.5rem', marginBottom: '1.5rem' }}>Ready to scale your digital product?</h3>
            <Link href="/contact" className="btn-main">Talk to our engineering team</Link>
          </div>
        </div>
      </section>
    </PageWrapper>
  );
}
