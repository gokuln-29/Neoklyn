import Image from "next/image";
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
                        <p className="p-desc" style={{ fontSize: '1rem', lineHeight: 1.8 }}>We believe the next generation of digital products must go far beyond functional code. Every interface we craft is rooted in frictionless, human-centered design — where cinematic motion, pixel-perfect typography, and intuitive user flows converge with high-performance serverless architecture. From lightning-fast Next.js edge deployments to accessible, responsive layouts tested across every device, we obsess over every detail. Our mission is simple: build digital experiences that enterprise users genuinely love to use, that convert visitors into loyal customers, and that deliver measurable, bottom-line impact for every client we partner with.</p>
                    </div>
                    <div style={{ padding: '3rem', background: 'var(--ink)', border: '1px solid var(--border)', borderRadius: '16px' }}>
                        <h3 className="p-title" style={{ fontSize: '1.8rem', marginBottom: '1rem', color: 'var(--violet)' }}>Global Talent</h3>
                        <p className="p-desc" style={{ fontSize: '1rem', lineHeight: 1.8 }}>Headquartered in Bengaluru, India, our team operates as a globally distributed network of specialists across Asia, Europe, and the Americas. We recruit senior engineers with backgrounds at top-tier tech companies and collaborate with award-winning designers who have shaped products used by millions. This distributed model allows us to deliver around the clock — seamlessly handing off work across time zones — while keeping costs competitive. Every project is staffed with domain experts, not generalists, ensuring world-class quality in design, development, and deployment from day one.</p>
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
                        {/* <div className="m-num" style={{ color: 'rgba(6, 182, 212,0.05)', fontSize: '4rem', marginBottom: '1rem' }}>01</ div> */}
                        <h3 className="p-title" style={{ fontSize: '1.2rem' }}>Server-First Performance</h3>
                        <p className="p-desc">We leverage React Server Components, edge-deployed functions, and intelligent CDN caching to ensure every page loads in under a second — globally. Our architecture prioritizes server-side rendering for SEO and initial paint speed, while seamlessly hydrating interactive elements on the client. The result: consistent 95+ Lighthouse scores across Performance, Accessibility, and Best Practices, without sacrificing rich interactivity.</p>
                    </div>
                    <div style={{ background: 'var(--bg)', padding: '3rem' }}>
                        {/* <div className="m-num" style={{ color: 'rgba(6, 182, 212,0.05)', fontSize: '4rem', marginBottom: '1rem' }}>02</div> */}
                        <h3 className="p-title" style={{ fontSize: '1.2rem' }}>Impeccable Typography</h3>
                        <p className="p-desc">Typography is the backbone of every great interface. We hand-pick variable fonts optimized for screen rendering, fine-tune letter-spacing, line-height, and optical sizing at every breakpoint, and implement font-display strategies that eliminate layout shift. From headline hierarchies to body copy rhythm, we treat every word as a design element — ensuring readability, brand consistency, and visual elegance across all devices.</p>
                    </div>
                    <div style={{ background: 'var(--bg)', padding: '3rem' }}>
                        {/* <div className="m-num" style={{ color: 'rgba(6, 182, 212,0.05)', fontSize: '4rem', marginBottom: '1rem' }}>03</div> */}
                        <h3 className="p-title" style={{ fontSize: '1.2rem' }}>Component-Driven</h3>
                        <p className="p-desc">Every project begins with a robust, token-based design system — featuring reusable components, shared spacing scales, and centralized color palettes. This component-driven methodology keeps technical debt low, accelerates development cycles, and guarantees pixel-perfect consistency across hundreds of screens. When your product scales, the UI scales with it — without breaking a single element.</p>
                    </div>
                </div>
            </section>

            {/* MEET THE TEAM */}
            <section className="section" id="team">
                <div className="reveal">
                    <div className="s-label">Founder</div>
                    <h2 className="s-title">THE VISION BEHIND NEOKLYN</h2>
                    <p className="s-sub">A solo-founded studio driven by obsessive attention to craft, engineering excellence, and a relentless pursuit of digital perfection.</p>
                </div>

                <div className="reveal" style={{ display: 'flex', justifyContent: 'center', marginTop: '4rem' }}>
                    <div className="tcard" style={{ padding: '0', background: 'transparent', border: 'none', maxWidth: '420px', width: '100%' }}>
                        <div style={{ width: '100%', aspectRatio: '3/4', background: 'var(--bg)', borderRadius: '16px', marginBottom: '1.5rem', border: '1px solid var(--border)', position: 'relative', overflow: 'hidden', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                            <Image src="/assets/founder.png" fill style={{ objectFit: 'cover' }} alt="Gokulnath N - Founder & CEO" />
                            <div style={{ position: 'absolute', inset: 0, background: 'linear-gradient(to top, rgba(0,0,0,0.8), transparent)', zIndex: 1, opacity: 0.5 }}></div>
                        </div>
                        <h3 style={{ fontSize: '1.6rem', marginBottom: '0.3rem', color: 'var(--white)', textAlign: 'center' }}>Gokulnath N</h3>
                        <p style={{ color: 'var(--cyan)', fontFamily: "'JetBrains Mono', monospace", fontSize: '0.85rem', marginBottom: '1rem', textTransform: 'uppercase', letterSpacing: '0.05em', textAlign: 'center' }}>Founder & CEO</p>
                        <p style={{ lineHeight: 1.6, color: 'var(--muted)', fontSize: '0.95rem', textAlign: 'center' }}>The driving force behind NeoKlyn — architecting high-performance web applications, crafting pixel-perfect interfaces, and delivering end-to-end digital solutions for clients worldwide. From strategy and design to development and deployment, every project is personally engineered to meet the highest standards of quality and performance.</p>
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
