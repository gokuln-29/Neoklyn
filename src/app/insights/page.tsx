import Link from 'next/link';
import PageWrapper from "@/components/layout/PageWrapper";
import PageHeader from "@/components/ui/PageHeader";
import { blogPosts } from '@/data/blogPosts';

export default function InsightsPage() {
  const posts = blogPosts;

  return (
    <PageWrapper>
      <section className="section">
        <PageHeader
          label="Engineering Blog"
          titleOutline="OUR"
          titleSolid="INSIGHTS"
          titleColorClass="title-cyan"
          description="Technical deep-dives, strategic playbooks, and design philosophies from the NeoKlyn engineering team."
        />

        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(350px, 1fr))', gap: '2.5rem', marginTop: '4rem' }}>
          {posts.map((post, idx) => (
            <Link href={`/insights/${post.slug}`} key={idx} className="tcard reveal group" style={{ textDecoration: 'none', color: 'inherit', display: 'flex', flexDirection: 'column', position: 'relative', overflow: 'hidden', padding: '3rem 2.5rem', border: '1px solid var(--border)', borderRadius: '16px', background: 'rgba(255,255,255,0.01)', backdropFilter: 'blur(10px)' }}>
              {/* Glowing hover effect */}
              <div style={{ position: 'absolute', inset: 0, opacity: 0, background: `radial-gradient(100% 100% at 50% 100%, ${post.color}22 0%, transparent 80%)`, transition: 'opacity 0.3s' }} className="hover-glow"></div>

              <div style={{ position: 'relative', zIndex: 1, height: '100%', display: 'flex', flexDirection: 'column' }}>
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '1.5rem', fontFamily: "'JetBrains Mono', monospace", fontSize: '0.65rem', color: 'var(--muted)', textTransform: 'uppercase', letterSpacing: '0.05em' }}>
                  <div style={{ display: 'flex', gap: '1rem', alignItems: 'center' }}>
                    <span style={{ color: post.color }}>{post.category}</span>
                    <span>•</span>
                    <span>{post.readTime}</span>
                  </div>
                  <span>{post.date}</span>
                </div>

                <h3 className="p-title" style={{ fontSize: '1.6rem', marginBottom: '2rem', flex: 1, letterSpacing: '0.02em', lineHeight: '1.4' }}>{post.title}</h3>

                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginTop: 'auto', borderTop: '1px solid var(--border)', paddingTop: '1.5rem' }}>
                  <div style={{ fontFamily: "'JetBrains Mono', monospace", fontSize: '0.7rem', color: 'rgba(255,255,255,0.7)' }}>By {post.author}</div>
                  <div className="si-arrow" style={{ opacity: 0.5, margin: 0, fontSize: '1rem', color: 'var(--white)' }}>&rarr;</div>
                </div>
              </div>
            </Link>
          ))}
        </div>
      </section>

      <style>{`
                .group:hover .hover-glow { opacity: 1 !important; }
                .group:hover .si-arrow { opacity: 1 !important; color: var(--cyan) !important; transform: translateX(5px); }
            `}</style>
    </PageWrapper>
  );
}
