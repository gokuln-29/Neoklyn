import CTASection from "@/components/CTASection";

const faqSchema = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: [
        {
            "@type": "Question",
            name: "What is your pricing model?",
            acceptedAnswer: {
                "@type": "Answer",
                text: "We work with flexible engagement models — project-based for defined scopes, and monthly retainers for ongoing development. Minimum enterprise projects start at $5K USD. Final pricing depends on scope, timeline, and tech complexity."
            }
        },
        {
            "@type": "Question",
            name: "How long does a typical project take?",
            acceptedAnswer: {
                "@type": "Answer",
                text: "MVP timelines range from 6-12 weeks. Full-scale web applications take 3-6 months. Mobile apps typically require 8-16 weeks. We provide detailed sprint plans during discovery."
            }
        },
        {
            "@type": "Question",
            name: "Do you offer ongoing maintenance?",
            acceptedAnswer: {
                "@type": "Answer",
                text: "Yes. All projects include a 30-day post-launch support window. For ongoing maintenance, we offer monthly retainers covering updates, monitoring, security patches, and feature iterations."
            }
        },
        {
            "@type": "Question",
            name: "What industries do you specialize in?",
            acceptedAnswer: {
                "@type": "Answer",
                text: "We serve B2B SaaS,ecommerce, logistics, healthcare tech, and premium lifestyle brands. Our strength is translating complex technical requirements into intuitive user experiences."
            }
        },
        {
            "@type": "Question",
            name: "How do we get started?",
            acceptedAnswer: {
                "@type": "Answer",
                text: "Book a free 30-minute discovery call through our contact page. We'll discuss your goals, technical requirements, and provide a preliminary roadmap and estimate."
            }
        }
    ]
};

export default function ProcessPage() {
    return (
        <main style={{ paddingTop: '8rem' }}>
            <script
                type="application/ld+json"
                dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }}
            />
            <style>{`
                .p-step-card {
                    background: var(--ink);
                    border: 1px solid var(--border);
                    border-radius: 16px;
                    display: flex;
                    align-items: center;
                    gap: 3rem;
                    padding: 4rem;
                    position: relative;
                    overflow: hidden;
                }
                .p-num-large {
                    font-size: 10rem;
                    color: rgba(6, 182, 212, 0.03);
                    font-family: 'Bebas Neue', sans-serif;
                    line-height: 1;
                    flex-shrink: 0;
                    transition: all 0.3s ease;
                }
                .p-content {
                    flex: 1;
                    position: relative;
                    z-index: 1;
                }
                
                @media (max-width: 900px) {
                    .p-step-card {
                        flex-direction: column;
                        align-items: flex-start;
                        gap: 1.5rem;
                        padding: 2.5rem 1.5rem;
                    }
                    .p-num-large {
                        font-size: 5.5rem;
                        margin-bottom: -1rem;
                    }
                    .p-title {
                        font-size: 2rem !important;
                    }
                    .p-desc {
                        font-size: 1rem !important;
                    }
                }
            `}</style>

            <section className="section">
                <div className="reveal" style={{ textAlign: 'center', maxWidth: '800px', margin: '0 auto 4rem' }}>
                    <div className="s-label" style={{ justifyContent: 'center' }}>Our Approach</div>
                    <h1 className="hero-title" style={{ fontSize: 'clamp(3rem,8vw,6rem)', marginBottom: '1rem' }}>
                        <span className="title-outline">THE</span>{' '}
                        <span className="title-cyan">PROCESS</span>
                    </h1>
                    <p className="hero-desc" style={{ margin: '0 auto' }}>
                        A rigorous engineering methodology designed to remove friction, eliminate ambiguity, and guarantee enterprise-grade delivery.
                    </p>
                </div>

                <div className="process-grid reveal" style={{ display: 'flex', flexDirection: 'column', gap: '0', background: 'transparent', border: 'none', margin: '4rem 0' }}>

                    {/* Step 1 */}
                    <div className="p-step-card reveal">
                        <div className="p-num-large">01</div>
                        <div className="p-content">
                            <div className="p-line" style={{ width: '60px', height: '3px', background: 'var(--cyan)', marginBottom: '1.5rem' }}></div>
                            <h2 className="p-title" style={{ fontSize: '2.5rem', fontFamily: "'Bebas Neue', sans-serif", letterSpacing: '0.04em', marginBottom: '1rem' }}>Discovery &amp; Strategy</h2>
                            <p className="p-desc" style={{ fontSize: '1.1rem', maxWidth: '600px', marginBottom: '1.5rem' }}>We don&apos;t just build specs. We interrogate the problem space to define an acquisition strategy, technology stack, and user journey that guarantees impact.</p>
                            <div className="sc-tags"><span className="sc-tag">Competitive Audits</span><span className="sc-tag">Tech Stack Definition</span><span className="sc-tag">KPI alignment</span></div>
                        </div>
                    </div>

                    <div style={{ height: '40px', width: '2px', background: 'var(--cyan)', margin: '0 4rem', opacity: 0.2 }}></div>

                    {/* Step 2 */}
                    <div className="p-step-card reveal">
                        <div className="p-num-large" style={{ color: 'rgba(124, 58, 237, 0.03)' }}>02</div>
                        <div className="p-content">
                            <div className="p-line" style={{ width: '60px', height: '3px', background: 'var(--violet)', marginBottom: '1.5rem' }}></div>
                            <h2 className="p-title" style={{ fontSize: '2.5rem', fontFamily: "'Bebas Neue', sans-serif", letterSpacing: '0.04em', marginBottom: '1rem' }}>UX / UI Design</h2>
                            <p className="p-desc" style={{ fontSize: '1.1rem', maxWidth: '600px', marginBottom: '1.5rem' }}>A conversion-centric approach to interface design. From low-fidelity wireframes to interactive high-fidelity prototypes, you approve the vision before production begins.</p>
                            <div className="sc-tags"><span className="sc-tag">Wireframing</span><span className="sc-tag">Design Systems</span><span className="sc-tag">Prototyping</span></div>
                        </div>
                    </div>

                    <div style={{ height: '40px', width: '2px', background: 'var(--violet)', margin: '0 4rem', opacity: 0.2 }}></div>

                    {/* Step 3 */}
                    <div className="p-step-card reveal">
                        <div className="p-num-large" style={{ color: 'rgba(59, 130, 246, 0.03)' }}>03</div>
                        <div className="p-content">
                            <div className="p-line" style={{ width: '60px', height: '3px', background: 'var(--blue)', marginBottom: '1.5rem' }}></div>
                            <h2 className="p-title" style={{ fontSize: '2.5rem', fontFamily: "'Bebas Neue', sans-serif", letterSpacing: '0.04em', marginBottom: '1rem' }}>Engineering &amp; Build</h2>
                            <p className="p-desc" style={{ fontSize: '1.1rem', maxWidth: '600px', marginBottom: '1.5rem' }}>Clean, scalable, serverless-native code. Bi-weekly sprints ensure total transparency, with access to staging environments for continuous feedback.</p>
                            <div className="sc-tags"><span className="sc-tag">Agile Sprints</span><span className="sc-tag">Full-Stack Dev</span><span className="sc-tag">QA Testing</span></div>
                        </div>
                    </div>

                    <div style={{ height: '40px', width: '2px', background: 'var(--blue)', margin: '0 4rem', opacity: 0.2 }}></div>

                    {/* Step 4 */}
                    <div className="p-step-card reveal">
                        <div className="p-num-large">04</div>
                        <div className="p-content">
                            <div className="p-line" style={{ width: '60px', height: '3px', background: 'var(--cyan)', marginBottom: '1.5rem' }}></div>
                            <h2 className="p-title" style={{ fontSize: '2.5rem', fontFamily: "'Bebas Neue', sans-serif", letterSpacing: '0.04em', marginBottom: '1rem' }}>Launch &amp; Scaling</h2>
                            <p className="p-desc" style={{ fontSize: '1.1rem', maxWidth: '600px', marginBottom: '1.5rem' }}>Deployment is just the beginning. We manage technical handoffs, monitor edge-performance, and implement post-launch growth strategies.</p>
                            <div className="sc-tags"><span className="sc-tag">CI/CD Deployment</span><span className="sc-tag">Performance Monitoring</span><span className="sc-tag">Growth Retainers</span></div>
                        </div>
                    </div>

                </div>
            </section>

            <CTASection />
        </main>
    );
}
