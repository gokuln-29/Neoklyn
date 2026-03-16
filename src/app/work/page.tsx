import PageWrapper from "@/components/layout/PageWrapper";
import PageHeader from "@/components/ui/PageHeader";

export default function WorkPage() {
  const projects = [
    {
      title: "Luxury Dubai Villas 3D",
      category: "Real Estate",
      location: "Dubai",
      image: "https://images.unsplash.com/photo-1600596542815-ffad4c1539a9?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
      description: "Immersive 3D property viewer built with WebGL and Next.js, optimizing conversion rates by 40%.",
      color: "var(--cyan)"
    },
    {
      title: "Next-Gen Storefront",
      category: "Ecommerce",
      location: "New York",
      image: "https://images.unsplash.com/photo-1556742049-0cfed4f6a45d?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
      description: "A high-performance headless Shopify build allowing seamless discovery and frictionless checkout.",
      color: "var(--violet)"
    },
    {
      title: "FinTech Analytics Dash",
      category: "SaaS Platform",
      location: "Bangalore",
      image: "https://images.unsplash.com/photo-1460925895917-afdab827c52f?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
      description: "Real-time enterprise analytics platform featuring complex data visualization architectures.",
      color: "var(--blue)"
    },
    {
      title: "Automotive Brand Space",
      category: "3D Experience",
      location: "Berlin",
      image: "https://images.unsplash.com/photo-1542282088-fe8426682b8f?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
      description: "Interactive 3D configurator for luxury electric vehicles using Three.js and GSAP.",
      color: "var(--cyan)"
    },
    {
      title: "HealthTech Mobile App",
      category: "Flutter Native",
      location: "Austin",
      image: "https://images.unsplash.com/photo-1550831107-1553da8c8464?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
      description: "Cross-platform iOS and Android application ensuring HIPAA compliance and sleek user experience.",
      color: "var(--violet)"
    },
    {
      title: "Web3 NFT Marketplace",
      category: "Blockchain Integrations",
      location: "Remote",
      image: "https://images.unsplash.com/photo-1639762681485-074b7f4f2314?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
      description: "Scalable smart contract interfaces coupled with high-converting landing pages.",
      color: "var(--blue)"
    }
  ];

  return (
    <PageWrapper>
      <section className="section">
        <PageHeader
          label="Featured Portfolio"
          titleOutline="OUR"
          titleSolid="WORK"
          titleColorClass="title-cyan"
          description="High-end enterprise builds spanning 3D web experiences, mobile applications, and complex SaaS dashboards."
        />

        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(350px, 1fr))', gap: '2.5rem', marginTop: '4rem' }}>
          {projects.map((project, idx) => (
            <div key={idx} className="tcard reveal group" style={{ cursor: 'pointer', textDecoration: 'none', color: 'inherit', padding: '0', minHeight: '400px', display: 'flex', flexDirection: 'column', position: 'relative', overflow: 'hidden' }}>
              <div style={{ position: 'absolute', inset: 0, background: `linear-gradient(to top, rgba(10,10,15,1) 0%, rgba(10,10,15,0.4) 50%, rgba(0,0,0,0.1) 100%), url(${project.image}) center/cover` }}></div>
              <div style={{ position: 'relative', zIndex: 1, padding: '2.5rem', display: 'flex', flexDirection: 'column', height: '100%', justifyContent: 'flex-end' }}>
                <div>
                  <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '1rem' }}>
                    <div className="m-tag" style={{ border: 'none', background: project.color, color: '#000', margin: '0', padding: '0.3rem 0.8rem', borderRadius: '4px', fontWeight: 'bold' }}>{project.category}</div>
                    <div className="si-num" style={{ margin: '0' }}>{project.location}</div>
                  </div>
                  <h3 className="p-title" style={{ fontSize: '1.8rem', marginBottom: '0.5rem' }}>{project.title}</h3>
                  <p className="p-desc" style={{ color: 'rgba(255,255,255,0.7)', lineHeight: '1.6' }}>{project.description}</p>
                  <div className="si-arrow" style={{ marginTop: '1.5rem', display: 'inline-block' }}>View Case Study →</div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </section>

      <style>{`
                .group:hover .si-arrow { opacity: 1; transform: translateX(8px); }
                .group .si-arrow { opacity: 0; transform: translateX(0); transition: all 0.3s; color: var(--cyan); }
            `}</style>
    </PageWrapper>
  );
}
