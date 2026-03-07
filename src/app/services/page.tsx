import PageWrapper from "@/components/layout/PageWrapper";
import PageHeader from "@/components/ui/PageHeader";

export default function ServicesPage() {
    return (
        <PageWrapper>
            <section className="section">
                <PageHeader
                    label="Our Expertise"
                    titleOutline="DIGITAL"
                    titleSolid="CAPABILITIES"
                    titleColorClass="title-cyan"
                    description="Full-stack engineering, high-end design, and growth marketing methodologies applied to top-tier enterprise products."
                />

                <div className="services-layout reveal">
                    <div className="service-list">
                        <div className="service-item" id="web">
                            <span className="si-num">01</span>
                            <div>
                                <span className="si-name" style={{ display: 'block', marginBottom: '0.8rem' }}>Web Design &amp; Development</span>
                                <p className="sc-desc" style={{ maxWidth: '400px' }}>Fast, scalable, SEO-optimized web applications built on modern JavaScript stacks.</p>
                                <div className="sc-tags" style={{ marginTop: '1rem' }}><span className="sc-tag">React</span><span className="sc-tag">Next.js</span><span className="sc-tag">TypeScript</span></div>
                            </div>
                        </div>
                        <div className="service-item" id="mobile">
                            <span className="si-num">02</span>
                            <div>
                                <span className="si-name" style={{ display: 'block', marginBottom: '0.8rem' }}>Mobile App Development</span>
                                <p className="sc-desc" style={{ maxWidth: '400px' }}>Native performance with cross-platform efficiency for iOS and Android ecosystems.</p>
                                <div className="sc-tags" style={{ marginTop: '1rem' }}><span className="sc-tag">Flutter</span><span className="sc-tag">React Native</span><span className="sc-tag">Swift</span></div>
                            </div>
                        </div>
                        <div className="service-item" id="ecommerce">
                            <span className="si-num">03</span>
                            <div>
                                <span className="si-name" style={{ display: 'block', marginBottom: '0.8rem' }}>Ecommerce Solutions</span>
                                <p className="sc-desc" style={{ maxWidth: '400px' }}>High-converting, scalable storefronts that blend performance with luxury aesthetics.</p>
                                <div className="sc-tags" style={{ marginTop: '1rem' }}><span className="sc-tag">Shopify</span><span className="sc-tag">WooCommerce</span><span className="sc-tag">Headless</span></div>
                            </div>
                        </div>
                        <div className="service-item" id="3d">
                            <span className="si-num">04</span>
                            <div>
                                <span className="si-name" style={{ display: 'block', marginBottom: '0.8rem' }}>3D &amp; Immersive Web</span>
                                <p className="sc-desc" style={{ maxWidth: '400px' }}>Custom WebGL experiences, 3D product viewers, and interactive storytelling.</p>
                                <div className="sc-tags" style={{ marginTop: '1rem' }}><span className="sc-tag">Three.js</span><span className="sc-tag">WebGL</span><span className="sc-tag">GSAP</span></div>
                            </div>
                        </div>
                        <div className="service-item" id="marketing">
                            <span className="si-num">05</span>
                            <div>
                                <span className="si-name" style={{ display: 'block', marginBottom: '0.8rem' }}>Digital Marketing</span>
                                <p className="sc-desc" style={{ maxWidth: '400px' }}>Data-driven acquisition, technical SEO, and high-ROI performance campaigns.</p>
                                <div className="sc-tags" style={{ marginTop: '1rem' }}><span className="sc-tag">Google Ads</span><span className="sc-tag">Meta Ads</span><span className="sc-tag">SEO</span></div>
                            </div>
                        </div>
                        <div className="service-item" id="branding">
                            <span className="si-num">06</span>
                            <div>
                                <span className="si-name" style={{ display: 'block', marginBottom: '0.8rem' }}>UI/UX &amp; Branding</span>
                                <p className="sc-desc" style={{ maxWidth: '400px' }}>Premium brand identity systems, UI kits, and friction-less user experiences.</p>
                                <div className="sc-tags" style={{ marginTop: '1rem' }}><span className="sc-tag">Figma</span><span className="sc-tag">Design Systems</span><span className="sc-tag">Prototyping</span></div>
                            </div>
                        </div>
                    </div>

                    <div className="service-detail" style={{ background: 'var(--ink)' }}>
                        <div className="sd-active-label">Core Tech Stack</div>
                        <div style={{ position: 'relative', height: '500px', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                            <div className="orb orb-1" style={{ width: '300px', height: '300px', background: 'rgba(0,255,224,0.1)', top: '50%', left: '50%', transform: 'translate(-50%, -50%)', filter: 'blur(50px)' }}></div>

                            {/* Antigravity floating icons simulation */}
                            <div style={{ position: 'absolute', top: '10%', left: '15%', padding: '1rem 1.5rem', background: 'rgba(255,255,255,0.05)', border: '1px solid var(--border)', borderRadius: '12px', animation: 'float 6s ease-in-out infinite' }}>React</div>
                            <div style={{ position: 'absolute', top: '25%', right: '10%', padding: '1rem 1.5rem', background: 'rgba(0,255,224,0.08)', border: '1px solid var(--cyan)', borderRadius: '12px', color: 'var(--cyan)', animation: 'float 5s ease-in-out infinite reverse' }}>Next.js</div>
                            <div style={{ position: 'absolute', bottom: '30%', left: '5%', padding: '1rem 1.5rem', background: 'rgba(255,45,107,0.08)', border: '1px solid var(--pink)', borderRadius: '12px', color: 'var(--pink)', animation: 'float 7s ease-in-out infinite' }}>Three.js</div>
                            <div style={{ position: 'absolute', bottom: '15%', right: '20%', padding: '1rem 1.5rem', background: 'rgba(255,255,255,0.05)', border: '1px solid var(--border)', borderRadius: '12px', animation: 'float 4.5s ease-in-out infinite reverse' }}>Flutter</div>
                            <div style={{ position: 'absolute', top: '45%', left: '40%', padding: '1rem 1.5rem', background: 'rgba(255,184,0,0.08)', border: '1px solid var(--amber)', borderRadius: '12px', color: 'var(--amber)', animation: 'float 8s ease-in-out infinite' }}>Node.js</div>
                            <div style={{ position: 'absolute', top: '65%', right: '35%', padding: '1rem 1.5rem', background: 'rgba(255,255,255,0.05)', border: '1px solid var(--border)', borderRadius: '12px', animation: 'float 5.5s ease-in-out infinite' }}>Shopify</div>
                        </div>
                        <style>{`
               @keyframes float {
                 0%, 100% { transform: translateY(0) rotate(0); }
                 50% { transform: translateY(-15px) rotate(2deg); }
               }
             `}</style>
                    </div>
                </div>
            </section>
        </PageWrapper>
    );
}
