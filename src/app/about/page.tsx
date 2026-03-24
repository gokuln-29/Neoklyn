import PageWrapper from "@/components/layout/PageWrapper";
import PageHeader from "@/components/ui/PageHeader";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "About Us | NeoKlyn Digital Studio",
  description: "Meet the engineers and visionaries behind NeoKlyn. We are a globally distributed digital agency building high-performance web applications and enterprise platforms.",
};

export default function AboutPage() {
    return (
        <PageWrapper>
            <section className="section" style={{ position: 'relative', overflow: 'hidden' }}>

                {/* Particle effect simulation for about background */}
                <div style={{ position: 'absolute', inset: 0, zIndex: 0, opacity: 0.3, pointerEvents: 'none' }}>
                    <div style={{ width: '4px', height: '4px', background: 'var(--cyan)', borderRadius: '50%', position: 'absolute', top: '20%', left: '10%', boxShadow: '0 0 10px var(--cyan)', animation: 'float 6s ease-in-out infinite' }}></div>
                    <div style={{ width: '3px', height: '3px', background: 'var(--violet)', borderRadius: '50%', position: 'absolute', top: '70%', left: '30%', boxShadow: '0 0 10px var(--violet)', animation: 'float 8s ease-in-out infinite reverse' }}></div>
                    <div style={{ width: '5px', height: '5px', background: 'var(--blue)', borderRadius: '50%', position: 'absolute', top: '40%', right: '20%', boxShadow: '0 0 10px var(--blue)', animation: 'float 5s ease-in-out infinite' }}></div>
                    <div style={{ width: '2px', height: '2px', background: 'var(--white)', borderRadius: '50%', position: 'absolute', bottom: '15%', right: '40%', boxShadow: '0 0 10px var(--white)', animation: 'float 7s ease-in-out infinite reverse' }}></div>
                </div>

                <PageHeader
                    label="The Studio"
                    titleOutline="ENGINEERING"
                    titleSolid="TOMORROW"
                    titleColorClass="title-cyan"
                    description="A distributed digital agency focused on pushing the boundaries of web experiences, combining top-tier design with unparalleled technical execution."
                />

                <div className="reveal" style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '4rem', marginTop: '6rem', position: 'relative', zIndex: 1 }}>
                    <div style={{ padding: '3rem', background: 'var(--ink)', border: '1px solid var(--border)', borderRadius: '16px' }}>
                        <h3 className="p-title" style={{ fontSize: '1.8rem', marginBottom: '1rem', color: 'var(--cyan)' }}>Philosophy</h3>
                        <p className="p-desc" style={{ fontSize: '1rem', lineHeight: 1.8 }}>We belong to a new era of the internet. The standard for digital products requires more than just functioning code — it demands absolute friction-less design, cinematic aesthetics, and high-performance serverless architecture. We build digital spaces that enterprise users love, and that drive measurable bottom-line value.</p>
                    </div>
                    <div style={{ padding: '3rem', background: 'var(--ink)', border: '1px solid var(--border)', borderRadius: '16px' }}>
                        <h3 className="p-title" style={{ fontSize: '1.8rem', marginBottom: '1rem', color: 'var(--violet)' }}>Global Talent</h3>
                        <p className="p-desc" style={{ fontSize: '1rem', lineHeight: 1.8 }}>Our headquarters may be in India, but our team is an asymmetrical network spanning to the US and UAE. We hire ex-FAANG engineers and award-winning designers, ensuring that every project is handled by specialists, not generalists.</p>
                    </div>
                </div>
            </section>

            {/* Leadership & Culture */}
            <section className="section section-alt">
                <div className="reveal">
                    <div className="s-label">Culture</div>
                    <h2 className="s-title">TECHNOLOGY DRIVEN</h2>
                    <p className="s-sub">We leverage bleeding-edge tools to deliver results faster and more securely.</p>
                </div>
                <div className="reveal" style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: '1px', background: 'var(--border)', border: '1px solid var(--border)', borderRadius: '16px', overflow: 'hidden', marginTop: '4rem' }}>
                    <div style={{ background: 'var(--bg)', padding: '3rem' }}>
                        <div className="m-num" style={{ color: 'rgba(6, 182, 212,0.05)', fontSize: '4rem', marginBottom: '1rem' }}>01</div>
                        <h3 className="p-title" style={{ fontSize: '1.2rem' }}>Server-First Performance</h3>
                        <p className="p-desc">Edge computing and server-components mean our projects achieve perfect Lighthouse scores out of the box.</p>
                    </div>
                    <div style={{ background: 'var(--bg)', padding: '3rem' }}>
                        <div className="m-num" style={{ color: 'rgba(6, 182, 212,0.05)', fontSize: '4rem', marginBottom: '1rem' }}>02</div>
                        <h3 className="p-title" style={{ fontSize: '1.2rem' }}>Impeccable Typography</h3>
                        <p className="p-desc">We agonize over variable fonts, tracking, and leading. Words are the interface, and we treat them as such.</p>
                    </div>
                    <div style={{ background: 'var(--bg)', padding: '3rem' }}>
                        <div className="m-num" style={{ color: 'rgba(6, 182, 212,0.05)', fontSize: '4rem', marginBottom: '1rem' }}>03</div>
                        <h3 className="p-title" style={{ fontSize: '1.2rem' }}>Component-Driven</h3>
                        <p className="p-desc">Building with strict design systems ensures technical debt remains low and UI remains aggressively consistent.</p>
                    </div>
                </div>
            </section>

            {/* MEET THE TEAM */}
            <section className="section" id="team">
                <div className="reveal">
                    <div className="s-label">Leadership</div>
                    <h2 className="s-title">THE ENGINEERS & VISIONARIES</h2>
                    <p className="s-sub">A tight-knit collective of elite developers, award-winning designers, and growth architects.</p>
                </div>
                
                <div className="reveal" style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))', gap: '3rem', marginTop: '4rem' }}>
                    {/* Founder / Core Member 1 */}
                    <div className="tcard" style={{ padding: '0', background: 'transparent', border: 'none' }}>
                        <div style={{ width: '100%', aspectRatio: '1/1', background: 'var(--bg)', borderRadius: '16px', marginBottom: '1.5rem', border: '1px solid var(--border)', position: 'relative', overflow: 'hidden', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                            {/* TODO: Replace this <span> with <Image src="/team/founder.jpg" fill style={{objectFit: 'cover'}} alt="Founder" /> */}
                            <span style={{ color: 'var(--muted)', fontFamily: "'JetBrains Mono', monospace", fontSize: '0.8rem' }}>[IMG_PLACEHOLDER_1]</span>
                            <div style={{ position: 'absolute', inset: 0, background: 'linear-gradient(to top, rgba(0,0,0,0.8), transparent)', zIndex: 1, opacity: 0.5 }}></div>
                        </div>
                        <h3 style={{ fontSize: '1.6rem', marginBottom: '0.3rem', color: 'var(--white)' }}>Founder Name</h3>
                        <p style={{ color: 'var(--cyan)', fontFamily: "'JetBrains Mono', monospace", fontSize: '0.85rem', marginBottom: '1rem', textTransform: 'uppercase', letterSpacing: '0.05em' }}>Chief Executive Officer</p>
                        <p style={{ lineHeight: 1.6, color: 'var(--muted)', fontSize: '0.95rem' }}>Leading the strategic vision and engineering operations. Formerly scaled enterprise architectures at tier-1 tech companies. Passionate about Next.js edge performance.</p>
                    </div>

                    {/* Core Member 2 */}
                    <div className="tcard" style={{ padding: '0', background: 'transparent', border: 'none' }}>
                        <div style={{ width: '100%', aspectRatio: '1/1', background: 'var(--bg)', borderRadius: '16px', marginBottom: '1.5rem', border: '1px solid var(--border)', position: 'relative', overflow: 'hidden', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                            {/* TODO: Replace this with Image component */}
                            <span style={{ color: 'var(--muted)', fontFamily: "'JetBrains Mono', monospace", fontSize: '0.8rem' }}>[IMG_PLACEHOLDER_2]</span>
                            <div style={{ position: 'absolute', inset: 0, background: 'linear-gradient(to top, rgba(0,0,0,0.8), transparent)', zIndex: 1, opacity: 0.5 }}></div>
                        </div>
                        <h3 style={{ fontSize: '1.6rem', marginBottom: '0.3rem', color: 'var(--white)' }}>Co-Founder / CTO</h3>
                        <p style={{ color: 'var(--violet)', fontFamily: "'JetBrains Mono', monospace", fontSize: '0.85rem', marginBottom: '1rem', textTransform: 'uppercase', letterSpacing: '0.05em' }}>Head of Engineering</p>
                        <p style={{ lineHeight: 1.6, color: 'var(--muted)', fontSize: '0.95rem' }}>The architectural mind behind our headless systems and generative AI deployments. Obsessed with shipping zero-latency systems and perfect Lighthouse scores globally.</p>
                    </div>

                    {/* Core Member 3 */}
                    <div className="tcard" style={{ padding: '0', background: 'transparent', border: 'none' }}>
                        <div style={{ width: '100%', aspectRatio: '1/1', background: 'var(--bg)', borderRadius: '16px', marginBottom: '1.5rem', border: '1px solid var(--border)', position: 'relative', overflow: 'hidden', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                            {/* TODO: Replace this with Image component */}
                            <span style={{ color: 'var(--muted)', fontFamily: "'JetBrains Mono', monospace", fontSize: '0.8rem' }}>[IMG_PLACEHOLDER_3]</span>
                            <div style={{ position: 'absolute', inset: 0, background: 'linear-gradient(to top, rgba(0,0,0,0.8), transparent)', zIndex: 1, opacity: 0.5 }}></div>
                        </div>
                        <h3 style={{ fontSize: '1.6rem', marginBottom: '0.3rem', color: 'var(--white)' }}>Creative Director</h3>
                        <p style={{ color: 'var(--blue)', fontFamily: "'JetBrains Mono', monospace", fontSize: '0.85rem', marginBottom: '1rem', textTransform: 'uppercase', letterSpacing: '0.05em' }}>Head of UI/UX</p>
                        <p style={{ lineHeight: 1.6, color: 'var(--muted)', fontSize: '0.95rem' }}>Translates complex B2B brand requirements into stunning, award-winning visual interfaces. Specializes in Three.js, WebGL animations, and seamless interactive design.</p>
                    </div>
                </div>
            </section>

            <style>{`
        @keyframes float {
          0%, 100% { transform: translateY(0); }
          50% { transform: translateY(-20px); }
         }
      `}</style>
        </PageWrapper>
    );
}
