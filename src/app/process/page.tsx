import CTASection from "@/components/CTASection";

export default function ProcessPage() {
    return (
        <main style={{ paddingTop: '8rem' }}>
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

                <div className="process-grid reveal" style={{ gridTemplateColumns: '1fr', display: 'flex', flexDirection: 'column', gap: '2px', background: 'transparent', border: 'none', margin: '4rem 0' }}>

                    {/* Step 1 */}
                    <div className="p-step reveal" style={{ background: 'var(--ink)', border: '1px solid var(--border)', borderRadius: '16px', display: 'flex', alignItems: 'center', gap: '3rem', padding: '4rem' }}>
                        <div style={{ flexShrink: 0 }}>
                            <div className="p-num" style={{ fontSize: '10rem', color: 'rgba(0,255,224,0.03)', margin: '-2rem 0', fontFamily: "'Bebas Neue', sans-serif", lineHeight: 1 }}>01</div>
                        </div>
                        <div style={{ flex: 1 }}>
                            <div className="p-line" style={{ width: '60px', height: '3px', background: 'var(--cyan)', marginBottom: '1.5rem' }}></div>
                            <h2 className="p-title" style={{ fontSize: '2.5rem', fontFamily: "'Bebas Neue', sans-serif", letterSpacing: '0.04em', marginBottom: '1rem' }}>Discovery &amp; Strategy</h2>
                            <p className="p-desc" style={{ fontSize: '1.1rem', maxWidth: '600px', marginBottom: '1.5rem' }}>We don&apos;t just build specs. We interrogate the problem space to define an acquisition strategy, technology stack, and user journey that guarantees impact.</p>
                            <div className="sc-tags"><span className="sc-tag">Competitive Audits</span><span className="sc-tag">Tech Stack Definition</span><span className="sc-tag">KPI alignment</span></div>
                        </div>
                    </div>

                    <div style={{ height: '40px', width: '2px', background: 'var(--cyan)', margin: '0 6rem', opacity: 0.2 }}></div>

                    {/* Step 2 */}
                    <div className="p-step reveal" style={{ background: 'var(--ink)', border: '1px solid var(--border)', borderRadius: '16px', display: 'flex', alignItems: 'center', gap: '3rem', padding: '4rem' }}>
                        <div style={{ flexShrink: 0 }}>
                            <div className="p-num" style={{ fontSize: '10rem', color: 'rgba(255,45,107,0.03)', margin: '-2rem 0', fontFamily: "'Bebas Neue', sans-serif", lineHeight: 1 }}>02</div>
                        </div>
                        <div style={{ flex: 1 }}>
                            <div className="p-line" style={{ width: '60px', height: '3px', background: 'var(--pink)', marginBottom: '1.5rem' }}></div>
                            <h2 className="p-title" style={{ fontSize: '2.5rem', fontFamily: "'Bebas Neue', sans-serif", letterSpacing: '0.04em', marginBottom: '1rem' }}>UX / UI Design</h2>
                            <p className="p-desc" style={{ fontSize: '1.1rem', maxWidth: '600px', marginBottom: '1.5rem' }}>A conversion-centric approach to interface design. From low-fidelity wireframes to interactive high-fidelity prototypes, you approve the vision before production begins.</p>
                            <div className="sc-tags"><span className="sc-tag">Wireframing</span><span className="sc-tag">Design Systems</span><span className="sc-tag">Prototyping</span></div>
                        </div>
                    </div>

                    <div style={{ height: '40px', width: '2px', background: 'var(--pink)', margin: '0 6rem', opacity: 0.2 }}></div>

                    {/* Step 3 */}
                    <div className="p-step reveal" style={{ background: 'var(--ink)', border: '1px solid var(--border)', borderRadius: '16px', display: 'flex', alignItems: 'center', gap: '3rem', padding: '4rem' }}>
                        <div style={{ flexShrink: 0 }}>
                            <div className="p-num" style={{ fontSize: '10rem', color: 'rgba(255,184,0,0.03)', margin: '-2rem 0', fontFamily: "'Bebas Neue', sans-serif", lineHeight: 1 }}>03</div>
                        </div>
                        <div style={{ flex: 1 }}>
                            <div className="p-line" style={{ width: '60px', height: '3px', background: 'var(--amber)', marginBottom: '1.5rem' }}></div>
                            <h2 className="p-title" style={{ fontSize: '2.5rem', fontFamily: "'Bebas Neue', sans-serif", letterSpacing: '0.04em', marginBottom: '1rem' }}>Engineering &amp; Build</h2>
                            <p className="p-desc" style={{ fontSize: '1.1rem', maxWidth: '600px', marginBottom: '1.5rem' }}>Clean, scalable, serverless-native code. Bi-weekly sprints ensure total transparency, with access to staging environments for continuous feedback.</p>
                            <div className="sc-tags"><span className="sc-tag">Agile Sprints</span><span className="sc-tag">Full-Stack Dev</span><span className="sc-tag">QA Testing</span></div>
                        </div>
                    </div>

                    <div style={{ height: '40px', width: '2px', background: 'var(--amber)', margin: '0 6rem', opacity: 0.2 }}></div>

                    {/* Step 4 */}
                    <div className="p-step reveal" style={{ background: 'var(--ink)', border: '1px solid var(--border)', borderRadius: '16px', display: 'flex', alignItems: 'center', gap: '3rem', padding: '4rem' }}>
                        <div style={{ flexShrink: 0 }}>
                            <div className="p-num" style={{ fontSize: '10rem', color: 'rgba(0,255,224,0.03)', margin: '-2rem 0', fontFamily: "'Bebas Neue', sans-serif", lineHeight: 1 }}>04</div>
                        </div>
                        <div style={{ flex: 1 }}>
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
