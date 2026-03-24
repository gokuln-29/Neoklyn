import PageWrapper from "@/components/layout/PageWrapper";
import Link from "next/link";
import { notFound } from "next/navigation";
import type { Metadata } from "next";

// Blog content mock database
const blogPosts: Record<string, any> = {
  "web-development-agency-india": {
    title: "Scaling Enterprise SaaS: Playbook of a Top Web Development Agency in India",
    category: "Engineering",
    date: "Oct 24, 2026",
    readTime: "8 min read",
    author: "Vikaas Dev",
    color: "var(--cyan)",
    content: (
      <>
        <p className="lead" style={{ fontSize: '1.25rem', lineHeight: 1.8, marginBottom: '2rem', color: 'rgba(255,255,255,0.8)' }}>
          When scaling a global SaaS product, the architecture decisions made in the first 12 months dictate the trajectory of your next 5 years. As a leading Web Development Agency in India serving global clients, NeoKlyn has engineered platforms for rising startups and Fortune 500s. Here is our exact playbook for building resilient, high-performance web applications.
        </p>

        <h2 style={{ fontSize: '1.8rem', marginTop: '3rem', marginBottom: '1.5rem', color: 'var(--cyan)' }}>1. Decoupling the Frontend from Legacy Monoliths</h2>
        <p style={{ lineHeight: 1.8, marginBottom: '1.5rem', color: 'rgba(255,255,255,0.7)' }}>
          Speed is a feature. We consistently transition our enterprise clients from heavy monolithic MVC frameworks to headless architectures using React and Next.js. By decoupling the presentation layer from the backend logic, marketing teams can deploy instantaneous content changes via a headless CMS without risking core application stability.
        </p>

        <h2 style={{ fontSize: '1.8rem', marginTop: '3rem', marginBottom: '1.5rem', color: 'var(--cyan)' }}>2. Edge Compute & Global Redundancy</h2>
        <p style={{ lineHeight: 1.8, marginBottom: '1.5rem', color: 'rgba(255,255,255,0.7)' }}>
          For clients operating across the UAE, US, and EU markets, centralized servers cause unacceptable latency. We implement edge computing strategies as standard. By executing middleware and personalized logic directly at the CDN edge (using Vercel Edge or Cloudflare Workers), we consistently cut TTFB (Time to First Byte) by over 60%.
        </p>

        <h2 style={{ fontSize: '1.8rem', marginTop: '3rem', marginBottom: '1.5rem', color: 'var(--cyan)' }}>3. AI-Augmented Quality Assurance</h2>
        <p style={{ lineHeight: 1.8, marginBottom: '1.5rem', color: 'rgba(255,255,255,0.7)' }}>
          Manual QA cannot scale with CI/CD pipelines deploying multiple times a day. At NeoKlyn, we integrate AI-driven end-to-end testing frameworks that automatically adapt to minor UI shifts while fiercely protecting critical user flows — ensuring zero regressions in production.
        </p>

        <div style={{ padding: '2rem', borderLeft: '4px solid var(--violet)', background: 'rgba(124, 58, 237, 0.05)', marginTop: '3rem', marginBottom: '3rem', borderRadius: '0 12px 12px 0' }}>
          <h3 style={{ fontSize: '1.2rem', marginBottom: '1rem', color: 'var(--white)' }}>The NeoKlyn Delivery Pipeline Advantage</h3>
          <p style={{ lineHeight: 1.6, color: 'rgba(255,255,255,0.8)', fontSize: '0.95rem' }}>
            Partnering with a premium IT hub in Bangalore gives your organization access to elite top-1% technical talent, combined with strict London and Dubai compliance standards. This hybrid execution model ensures uncompromised quality at unmatched delivery speeds.
          </p>
        </div>

        <h2 style={{ fontSize: '1.8rem', marginTop: '3rem', marginBottom: '1.5rem', color: 'var(--cyan)' }}>Conclusion</h2>
        <p style={{ lineHeight: 1.8, marginBottom: '1.5rem', color: 'rgba(255,255,255,0.7)' }}>
          Scaling enterprise software isn't simply about hiring more developers; it's about establishing unshakeable, resilient systems. Whether you are re-platforming a complex legacy application or launching a disruptive startup from scratch, your technical foundation is your ultimate competitive moat.
        </p>
      </>
    )
  }
};

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }): Promise<Metadata> {
  const { slug } = await params;
  const post = blogPosts[slug];

  if (!post) {
      return { title: "Insight | NeoKlyn" };
  }

  return {
      title: `${post.title} | NeoKlyn Insights`,
      description: `Read ${post.title} written by ${post.author} on NeoKlyn's Engineering and Data Blog.`,
  };
}

export default async function BlogPostPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const post = blogPosts[slug];

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
            {post.content}
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
