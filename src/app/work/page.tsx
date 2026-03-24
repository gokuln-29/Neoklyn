import Link from "next/link";
import PageWrapper from "@/components/layout/PageWrapper";
import PageHeader from "@/components/ui/PageHeader";

export default function WorkPage() {
  const projects = [
    {
      title: "Dwarka Gen. Trading",
      slug: "dwarka-general-trading",
      category: "B2B Corporate",
      location: "UAE",
      image: "/assets/work/dwarka.jpg",
      description: "A fast, robust corporate site for trading operations in the Middle East. Scalable architecture with sleek design.",
      color: "var(--cyan)"
    },
    {
      title: "Travex Ventures",
      slug: "travex-ventures",
      category: "Travel Agency",
      location: "India",
      image: "/assets/work/travex.jpg",
      description: "A bespoke UI and striking visual aesthetic that jumped metrics significantly post-launch.",
      color: "var(--violet)"
    },
    {
      title: "Zinad Concrete Works",
      slug: "zinad-concrete-works",
      category: "Industrial Web",
      location: "UAE",
      image: "/assets/work/zinad.jpg",
      description: "A highly professional platform showing strength and scale that drives immediate trust for B2B industrial clients.",
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
          description="High-end enterprise builds spanning B2B commerce, industrial platforms, and dynamic travel ventures."
        />

        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(350px, 1fr))', gap: '2.5rem', marginTop: '4rem' }}>
          {projects.map((project, idx) => (
            <Link href={`/work/${project.slug}`} key={idx} className="tcard reveal group" style={{ cursor: 'pointer', textDecoration: 'none', color: 'inherit', padding: '0', minHeight: '400px', display: 'flex', flexDirection: 'column', position: 'relative', overflow: 'hidden' }}>
              <div style={{ position: 'absolute', inset: 0, background: `linear-gradient(to top, rgba(10,10,15,1) 0%, rgba(10,10,15,0.4) 50%, rgba(0,0,0,0.1) 100%), url(${project.image}) center/cover` }}></div>
              <div style={{ position: 'relative', zIndex: 1, padding: '2.5rem', display: 'flex', flexDirection: 'column', height: '100%', justifyContent: 'flex-end' }}>
                <div>
                  <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '1rem' }}>
                    <div className="m-tag" style={{ border: 'none', background: project.color, color: (project.color === 'var(--violet)' || project.color === 'var(--blue)') ? '#fff' : '#000', margin: '0', padding: '0.3rem 0.8rem', borderRadius: '4px', fontWeight: 'bold' }}>{project.category}</div>
                    <div className="si-num" style={{ margin: '0' }}>{project.location}</div>
                  </div>
                  <h3 className="p-title" style={{ fontSize: '1.8rem', marginBottom: '0.5rem' }}>{project.title}</h3>
                  <p className="p-desc" style={{ color: 'rgba(255,255,255,0.7)', lineHeight: '1.6' }}>{project.description}</p>
                  <div className="si-arrow" style={{ marginTop: '1.5rem', display: 'inline-block' }}>View Case Study →</div>
                </div>
              </div>
            </Link>
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
