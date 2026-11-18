import PageWrapper from "@/components/layout/PageWrapper";
import PageHeader from "@/components/ui/PageHeader";
import TechStackGrid from "@/components/services/TechStackGrid";
import Link from "next/link";
import type { Metadata } from "next";

import { DEFAULT_OG_IMAGES, DEFAULT_TWITTER_IMAGES } from "@/lib/seo";
export const metadata: Metadata = {
    title: "Digital Services — AI, Web, Mobile & More",
    description:
        "Explore NeoKlyn's full-stack services: AI agents, web dev, mobile apps, ecommerce, 3D, marketing & UI/UX. Start your project today.",
    openGraph: {
        title: "Digital Services — AI, Web, Mobile & More | NeoKlyn",
        description:
            "Explore NeoKlyn's full-stack services: AI agents, web dev, mobile apps, ecommerce, 3D, marketing & UI/UX. Start your project today.",
        url: "https://neoklyn.com/services",
        siteName: "NeoKlyn",
        images: DEFAULT_OG_IMAGES,
        type: "website",
    },
    alternates: { canonical: "https://neoklyn.com/services" },
    twitter: {
        card: "summary_large_image",
        images: DEFAULT_TWITTER_IMAGES,
        title: "Digital Services — AI, Web, Mobile & More | NeoKlyn",
        description:
            "Explore NeoKlyn's full-stack services: AI agents, web dev, mobile apps, ecommerce, 3D, marketing & UI/UX. Start your project today.",
    },
};

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
                                <div className="sc-tags" style={{ marginTop: '1rem', marginBottom: '1.5rem' }}><span className="sc-tag">React</span><span className="sc-tag">Next.js</span><span className="sc-tag">TypeScript</span></div>
                                <Link href="/contact" className="btn-ghost">Start a Web Project ↗</Link>
                            </div>
                        </div>
                        <div className="service-item" id="mobile">
                            <span className="si-num">02</span>
                            <div>
                                <span className="si-name" style={{ display: 'block', marginBottom: '0.8rem' }}>Mobile App Development</span>
                                <p className="sc-desc" style={{ maxWidth: '400px' }}>Native performance with cross-platform efficiency for iOS and Android ecosystems.</p>
                                <div className="sc-tags" style={{ marginTop: '1rem', marginBottom: '1.5rem' }}><span className="sc-tag">Flutter</span><span className="sc-tag">React Native</span><span className="sc-tag">Swift</span></div>
                                <Link href="/contact" className="btn-ghost">Start a Mobile Project ↗</Link>
                            </div>
                        </div>
                        <div className="service-item" id="ecommerce">
                            <span className="si-num">03</span>
                            <div>
                                <span className="si-name" style={{ display: 'block', marginBottom: '0.8rem' }}>Ecommerce Solutions</span>
                                <p className="sc-desc" style={{ maxWidth: '400px' }}>High-converting, scalable storefronts that blend performance with luxury aesthetics.</p>
                                <div className="sc-tags" style={{ marginTop: '1rem', marginBottom: '1.5rem' }}><span className="sc-tag">Shopify</span><span className="sc-tag">WooCommerce</span><span className="sc-tag">Headless</span></div>
                                <Link href="/contact" className="btn-ghost">Start an Ecommerce Project ↗</Link>
                            </div>
                        </div>
                        <div className="service-item" id="3d">
                            <span className="si-num">04</span>
                            <div>
                                <span className="si-name" style={{ display: 'block', marginBottom: '0.8rem' }}>3D &amp; Immersive Web</span>
                                <p className="sc-desc" style={{ maxWidth: '400px' }}>Custom WebGL experiences, 3D product viewers, and interactive storytelling.</p>
                                <div className="sc-tags" style={{ marginTop: '1rem', marginBottom: '1.5rem' }}><span className="sc-tag">Three.js</span><span className="sc-tag">WebGL</span><span className="sc-tag">GSAP</span></div>
                                <Link href="/contact" className="btn-ghost">Start a 3D Project ↗</Link>
                            </div>
                        </div>
                        <div className="service-item" id="marketing">
                            <span className="si-num">05</span>
                            <div>
                                <span className="si-name" style={{ display: 'block', marginBottom: '0.8rem' }}>Digital Marketing</span>
                                <p className="sc-desc" style={{ maxWidth: '400px' }}>Data-driven acquisition, technical SEO, and high-ROI performance campaigns.</p>
                                <div className="sc-tags" style={{ marginTop: '1rem', marginBottom: '1.5rem' }}><span className="sc-tag">Google Ads</span><span className="sc-tag">Meta Ads</span><span className="sc-tag">SEO</span></div>
                                <Link href="/contact" className="btn-ghost">Start a Marketing Campaign ↗</Link>
                            </div>
                        </div>
                        <div className="service-item" id="branding">
                            <span className="si-num">06</span>
                            <div>
                                <span className="si-name" style={{ display: 'block', marginBottom: '0.8rem' }}>UI/UX &amp; Branding</span>
                                <p className="sc-desc" style={{ maxWidth: '400px' }}>Premium brand identity systems, UI kits, and friction-less user experiences.</p>
                                <div className="sc-tags" style={{ marginTop: '1rem', marginBottom: '1.5rem' }}><span className="sc-tag">Figma</span><span className="sc-tag">Design Systems</span><span className="sc-tag">Prototyping</span></div>
                                <Link href="/contact" className="btn-ghost">Start a Branding Project ↗</Link>
                            </div>
                        </div>
                        <div className="service-item" id="ai-agents">
                            <span className="si-num">07</span>
                            <div>
                                <span className="si-name" style={{ display: 'block', marginBottom: '0.8rem' }}>AI Agents &amp; Automation</span>
                                <p className="sc-desc" style={{ maxWidth: '400px' }}>Autonomous workflow agents and intelligent ops that run 24/7 to eliminate repetitive operational work.</p>
                                <div className="sc-tags" style={{ marginTop: '1rem', marginBottom: '1.5rem' }}><span className="sc-tag">LangChain</span><span className="sc-tag">OpenAI</span><span className="sc-tag">Anthropic</span></div>
                                <Link href="/contact" className="btn-ghost">Start an AI Agent Project ↗</Link>
                            </div>
                        </div>
                        <div className="service-item" id="gen-ai">
                            <span className="si-num">08</span>
                            <div>
                                <span className="si-name" style={{ display: 'block', marginBottom: '0.8rem' }}>Generative AI</span>
                                <p className="sc-desc" style={{ maxWidth: '400px' }}>Custom LLM integration, dynamic content generation, and predictive marketing tailored to your data.</p>
                                <div className="sc-tags" style={{ marginTop: '1rem', marginBottom: '1.5rem' }}><span className="sc-tag">GPT-4</span><span className="sc-tag">Claude</span><span className="sc-tag">Llama</span></div>
                                <Link href="/contact" className="btn-ghost">Start a Generative AI Project ↗</Link>
                            </div>
                        </div>
                    </div>

                    {/* ═══ TECH STACK — CURSOR SPOTLIGHT GRID ═══ */}
                    <TechStackGrid />
                </div>
            </section>
        </PageWrapper>
    );
}
