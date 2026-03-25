import PageWrapper from "@/components/layout/PageWrapper";
import Link from "next/link";
import { notFound } from "next/navigation";
import type { Metadata } from "next";

const caseStudies: Record<string, any> = {
  "dwarka-general-trading": {
    client: "Dwarka General Trading",
    title: "Digitizing B2B Trade Operations in the Middle East",
    category: "B2B Corporate",
    location: "Middle East",
    color: "var(--cyan)",
    image: "/assets/work/dwarka.jpg",
    problem: "Dwarka General Trading, a legacy B2B trading house in the Middle East, relied on outdated platforms that couldn't scale with their rapidly expanding catalog. Their existing digital infrastructure suffered from poor mobile responsiveness, high latency, and an antiquated user experience that failed to capture high-value enterprise leads.",
    solution: "NeoKlyn completely architected a high-performance corporate platform. We mapped out a new UX that prioritized immediate product discovery and corporate credibility. The UI was designed with premium, minimalist aesthetics to establish immediate trust. We migrated their legacy content into a modern headless CMS for instant content delivery.",
    techStack: ["React", "Next.js", "Tailwind CSS", "Framer Motion", "Sanity CMS"],
    results: [
      { metric: "+45%", description: "Increase in Mobile Engagement" },
      { metric: "-60%", description: "Reduction in Page Load Time" },
      { metric: "2x", description: "B2B Lead Generation Rate" }
    ]
  },
  "travex-ventures": {
    client: "Travex Ventures",
    title: "Scaling a Premium Travel Venture Across India",
    category: "Travel Agency",
    location: "India",
    color: "var(--violet)",
    image: "/assets/work/travex.jpg",
    problem: "Travex Ventures needed to differentiate themselves in a highly saturated travel market. Their platform lacked the vibrant, immersive aesthetic required to sell high-ticket travel experiences, and prospective customers were dropping off before completing the inquiry funnel.",
    solution: "We designed a bespoke, striking visual aesthetic using custom CSS animations and rich media components. By utilizing cutting-edge Next.js hydration, we ensured that the computationally heavy imagery loaded instantly without blocking the main browser thread. The entire booking inquiry funnel was redesigned for zero-friction conversions.",
    techStack: ["Next.js", "GSAP Animations", "Vercel Edge", "Node.js API", "PostgreSQL"],
    results: [
      { metric: "110%", description: "Increase in Inquiry Submissions" },
      { metric: "3.5x", description: "Longer Session Durations" },
      { metric: "99.9%", description: "Platform Uptime Maintained" }
    ]
  },
  "zinad-concrete-works": {
    client: "Zinad Concrete Works",
    title: "Establishing Industrial Authority in the Middle East",
    category: "Industrial Web",
    location: "Middle East",
    color: "var(--blue)",
    image: "/assets/work/zinad.jpg",
    problem: "Zinad Concrete Works had an invisible digital footprint. Serving massive industrial projects, they needed a platform that projected strength, massive scale, and elite engineering capability to international contractors and government entities.",
    solution: "We engineered a highly professional, robust digital presence. The architecture was built to showcase massive industrial portfolios, utilizing dynamic routing to categorically display their past infrastructure projects. We implemented advanced localized SEO targeting the Middle Eastern construction sector.",
    techStack: ["Next.js", "TypeScript", "Vercel", "Tailwind CSS"],
    results: [
      { metric: "Top 3", description: "Ranking for Targeted Local Keywords" },
      { metric: "+80%", description: "International Traffic Growth" },
      { metric: "100", description: "Google Lighthouse Performance Score" }
    ]
  }
};

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }): Promise<Metadata> {
  const { slug } = await params;
  const project = caseStudies[slug];

  if (!project) {
      return { title: "Case Study | NeoKlyn Work" };
  }

  return {
      title: `${project.client} Case Study | NeoKlyn`,
      description: `Read how NeoKlyn helped ${project.client} achieve digital transformation.`,
  };
}

export default async function CaseStudyPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const project = caseStudies[slug];

  if (!project) {
    notFound();
  }

  return (
    <PageWrapper>
      <section className="section" style={{ paddingTop: '150px' }}>
        <div style={{ maxWidth: '1000px', margin: '0 auto' }}>
          
          <div className="reveal">
            <Link href="/work" style={{ color: 'var(--muted)', textDecoration: 'none', fontSize: '0.9rem', display: 'inline-block', marginBottom: '2rem' }}>
              &larr; Back to Portfolio
            </Link>
            
            <div style={{ display: 'flex', gap: '1rem', alignItems: 'center', marginBottom: '1.5rem', fontFamily: "'JetBrains Mono', monospace", fontSize: '0.85rem' }}>
              <span className="m-tag" style={{ border: 'none', background: project.color, color: (project.color === 'var(--cyan)') ? '#000' : '#fff', margin: 0, padding: '0.3rem 0.8rem', borderRadius: '4px', fontWeight: 'bold' }}>
                {project.category}
              </span>
              <span style={{ color: 'var(--muted)' }}>•</span>
              <span style={{ color: 'var(--muted)', textTransform: 'uppercase' }}>{project.location}</span>
            </div>

            <h1 className="hero-title" style={{ fontSize: '3.5rem', marginBottom: '1rem', lineHeight: 1.1, textTransform: 'none' }}>
              {project.client}
            </h1>
            <p style={{ fontSize: '1.5rem', color: project.color, marginBottom: '3rem', opacity: 0.9 }}>
              {project.title}
            </p>
          </div>

          <div className="reveal" style={{ width: '100%', height: '500px', borderRadius: '16px', backgroundImage: `url(${project.image})`, backgroundSize: 'cover', backgroundPosition: 'center', marginBottom: '5rem', border: '1px solid rgba(255,255,255,0.1)' }}>
            {/* Image Placeholder or Actual Image */}
          </div>

          <div style={{ display: 'grid', gridTemplateColumns: '1fr', gap: '4rem', fontSize: '1.1rem' }}>
            <div className="reveal tcard" style={{ background: 'rgba(255,255,255,0.02)' }}>
              <h2 style={{ fontSize: '2rem', marginBottom: '1.5rem', color: project.color }}>The Problem</h2>
              <p style={{ lineHeight: 1.8, color: 'rgba(255,255,255,0.75)' }}>{project.problem}</p>
            </div>

            <div className="reveal tcard" style={{ background: 'rgba(255,255,255,0.02)', borderLeft: `4px solid ${project.color}` }}>
              <h2 style={{ fontSize: '2rem', marginBottom: '1.5rem' }}>The Solution</h2>
              <p style={{ lineHeight: 1.8, color: 'rgba(255,255,255,0.85)' }}>{project.solution}</p>
            </div>
            
            <div className="reveal">
              <h2 style={{ fontSize: '2rem', marginBottom: '2rem' }}>Tech Stack Used</h2>
              <div style={{ display: 'flex', flexWrap: 'wrap', gap: '1rem' }}>
                {project.techStack.map((tech: string, i: number) => (
                  <span key={i} style={{ padding: '0.8rem 1.5rem', background: 'rgba(255,255,255,0.05)', borderRadius: '30px', fontFamily: "'JetBrains Mono', monospace", fontSize: '0.9rem', border: '1px solid rgba(255,255,255,0.1)' }}>
                    {tech}
                  </span>
                ))}
              </div>
            </div>

            <div className="reveal" style={{ marginTop: '2rem' }}>
              <h2 style={{ fontSize: '2rem', marginBottom: '2rem', textAlign: 'center' }}>The Results</h2>
              <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(250px, 1fr))', gap: '2rem' }}>
                {project.results.map((res: any, i: number) => (
                  <div key={i} style={{ textAlign: 'center', padding: '3rem 2rem', background: `radial-gradient(circle at center, ${project.color}15 0%, transparent 70%)`, border: '1px solid rgba(255,255,255,0.05)', borderRadius: '16px' }}>
                    <div style={{ fontSize: '3.5rem', fontWeight: 'bold', color: project.color, marginBottom: '0.5rem', fontFamily: "'Space Grotesk', sans-serif" }}>{res.metric}</div>
                    <div style={{ fontSize: '1rem', color: 'rgba(255,255,255,0.7)', textTransform: 'uppercase', letterSpacing: '0.05em' }}>{res.description}</div>
                  </div>
                ))}
              </div>
            </div>

          </div>

          <div className="reveal" style={{ marginTop: '6rem', paddingTop: '4rem', borderTop: '1px solid var(--border)', textAlign: 'center' }}>
            <h3 style={{ fontSize: '1.8rem', marginBottom: '1.5rem' }}>Build your next success story with us.</h3>
            <Link href="/contact" className="btn-main" style={{ padding: '1.2rem 2.5rem', fontSize: '1.1rem' }}>Start a Project ↗</Link>
          </div>
        </div>
      </section>
    </PageWrapper>
  );
}
