import PageWrapper from "@/components/layout/PageWrapper";
import PageHeader from "@/components/ui/PageHeader";
import Link from "next/link";
import { notFound } from "next/navigation";
import type { Metadata } from "next";

// Local data for all services
const servicesData = {
    web: {
        label: "01 // Service",
        titleOutline: "WEB",
        titleSolid: "DEVELOPMENT",
        titleColorClass: "title-cyan",
        description: "Fast, scalable, and beautifully designed web applications. We utilize modern JavaScript stacks to build robust, secure, and SEO-optimized digital products that convert.",
        content: [
            {
                heading: "Frontend Engineering",
                text: "We architect resilient frontends using React, Next.js, and modern CSS to deliver uncompromised user experiences across all devices."
            },
            {
                heading: "Backend Systems",
                text: "From serverless architectures to robust REST or GraphQL APIs, our backend solutions ensure data scales securely with your business."
            },
            {
                heading: "Performance & SEO",
                text: "Built from the ground up for Core Web Vitals, ensuring your application ranks well and loads instantaneously."
            }
        ]
    },
    mobile: {
        label: "02 // Service",
        titleOutline: "MOBILE",
        titleSolid: "APPS",
        titleColorClass: "title-blue",
        description: "Native and cross-platform mobile applications engineered for the iOS and Android ecosystems. We focus on frictionless UX and high scale.",
        content: [
            {
                heading: "Cross-Platform Efficiency",
                text: "Utilizing frameworks like Flutter and React Native to deploy apps on both major platforms simultaneously, cutting development costs and time-to-market."
            },
            {
                heading: "Native Capabilities",
                text: "When raw performance or deep hardware integration is required, we build using Swift and Kotlin to deliver native excellence."
            },
            {
                heading: "App Store Optimization",
                text: "We don't just build your app; we make sure it gets found with built-in ASO strategies and launch support."
            }
        ]
    },
    ecommerce: {
        label: "03 // Service",
        titleOutline: "ECOMMERCE",
        titleSolid: "SOLUTIONS",
        titleColorClass: "title-violet",
        description: "High-converting, globally scalable storefronts that seamlessly blend premium brand aesthetics with frictionless shopping experiences.",
        content: [
            {
                heading: "Custom Shopify & Shopify Plus",
                text: "Bespoke theme development, advanced app integrations, and conversion rate optimization for top-tier merchants."
            },
            {
                heading: "Headless Commerce",
                text: "Decoupling the frontend using Next.js to provide lightning-fast, highly customized shopping experiences independent of your backend platform."
            },
            {
                heading: "Payment & Logistics integrations",
                text: "Connecting local and global payment gateways, shipping providers, and ERPs for a unified operational flow."
            }
        ]
    },
    marketing: {
        label: "04 // Service",
        titleOutline: "DIGITAL",
        titleSolid: "MARKETING",
        titleColorClass: "title-cyan",
        description: "Metrics-obsessed, data-driven acquisition. We drive highly targeted scaling strategies using technical SEO, performance marketing, and conversion funnels.",
        content: [
            {
                heading: "Performance Paid Media",
                text: "Laser-targeted Google Ads, Meta Ads, and LinkedIn campaigns optimized for ROAS and lowest possible CAC."
            },
            {
                heading: "Technical & Content SEO",
                text: "Comprehensive site audits, schema markup, semantic search optimization, and authority building to win organic rankings."
            },
            {
                heading: "Conversion Rate Optimization (CRO)",
                text: "A/B testing, user behavior analysis, and funnel optimization to extract maximum value from existing traffic."
            }
        ]
    },
    "3d": {
        label: "05 // Service",
        titleOutline: "3D &",
        titleSolid: "IMMERSIVE",
        titleColorClass: "title-blue",
        description: "Mind-bending custom WebGL experiences, 3D product viewers, and interactive storytelling that leave a lasting impression on your audience.",
        content: [
            {
                heading: "WebGL & Three.js",
                text: "Building complex 3D scenes running directly in the browser at 60 frames per second on both desktop and mobile."
            },
            {
                heading: "Interactive Product Viewers",
                text: "Allow your customers to rotate, zoom, and customize 3D models of your products in real-time before buying."
            },
            {
                heading: "Scroll-Triggered Animations",
                text: "High-end GSAP animations tied to user scroll, creating a cinematic, agency-level storytelling experience."
            }
        ]
    },
    branding: {
        label: "06 // Service",
        titleOutline: "UI/UX &",
        titleSolid: "BRANDING",
        titleColorClass: "title-violet",
        description: "Premium brand identity systems, scalable UI component kits, and friction-less user experiences engineered for engagement.",
        content: [
            {
                heading: "Identity & Visual Language",
                text: "Developing color palettes, typography systems, and visual guidelines that position you as a premium leader in your space."
            },
            {
                heading: "User Experience (UX) Design",
                text: "Wireframing, user journey mapping, and low-fidelity prototyping to ensure your product is inherently intuitive."
            },
            {
                heading: "Design Systems & UI Kits",
                text: "Creating reusable Figma design systems that keep your product visually consistent as it scales across new features."
            }
        ]
    },
    "ai-agents": {
        label: "07 // Service",
        titleOutline: "AI",
        titleSolid: "AGENTS",
        titleColorClass: "title-cyan",
        description: "Autonomous workflow automation, autonomous web agents, and intelligent ops. Leverage cutting-edge agentic frameworks to 100x your team's productivity.",
        content: [
            {
                heading: "Workflow Automation Agents",
                text: "Custom-trained AI agents that automate repetitive internal tasks, data entry, and CRM management, running 24/7."
            },
            {
                heading: "Specialized RAG Architectures",
                text: "Implement Retrieval-Augmented Generation to allow agents to instantly query and reason over your proprietary company data engines privately."
            },
            {
                heading: "Multi-Agent Systems",
                text: "Deploy LangChain and LangGraph ecosystems where multiple specialized algorithms coordinate dynamically to solve complex business problems."
            }
        ]
    },
    "gen-ai": {
        label: "08 // Service",
        titleOutline: "GENERATIVE",
        titleSolid: "AI",
        titleColorClass: "title-blue",
        description: "Custom Large Language Model integration, dynamic content generation engines, and predictive marketing algorithms tailored to your exact data.",
        content: [
            {
                heading: "Proprietary LLM Integration",
                text: "Custom deployment of OpenAI, Anthropic, or open-source Llama/Mistral models perfectly integrated into your existing SaaS products."
            },
            {
                heading: "Generative UI/UX",
                text: "Build applications that dynamically generate completely unique interfaces based on the specific user's prompt or intent."
            },
            {
                heading: "Predictive & Generative Marketing",
                text: "Engines that dynamically generate millions of highly personalized ad creatives and email copies based on individual user behaviors."
            }
        ]
    }
};

const servicesMetadata: Record<string, { title: string; description: string }> = {
    web: {
        title: "Custom Web Development & Design Agency | NeoKlyn",
        description: "Elevate your digital presence with NeoKlyn's fast, scalable, and secure custom web development services tailored for enterprises and growing startups.",
    },
    mobile: {
        title: "iOS & Android Mobile App Development Services | NeoKlyn",
        description: "Build intuitive, high-performing mobile applications for iOS and Android. NeoKlyn creates seamless mobile experiences that drive user engagement.",
    },
    ecommerce: {
        title: "High-Converting eCommerce Development Agency | NeoKlyn",
        description: "Launch scalable, high-converting eCommerce platforms with seamless payment integrations, premium UX design, and conversion rate optimization by NeoKlyn.",
    },
    marketing: {
        title: "Data-Driven Digital Marketing & SEO Services | NeoKlyn",
        description: "Grow your brand and maximize revenue with NeoKlyn's data-driven digital marketing, SEO, and performance-based marketing strategies.",
    },
    "3d": {
        title: "Immersive 3D Modeling & Animation Studio | NeoKlyn",
        description: "Bring your ideas to life with NeoKlyn’s stunning 3D modeling, product rendering, and interactive web animations that captivate your audience.",
    },
    branding: {
        title: "Brand Identity, Strategy & Logo Design Services | NeoKlyn",
        description: "Craft a memorable brand identity with NeoKlyn. From logo design to comprehensive brand strategy, we help you stand out in the crowded digital space.",
    },
    "ai-agents": {
        title: "Custom AI Agents & Business Automation Services | NeoKlyn",
        description: "Streamline operations and enhance customer experience with NeoKlyn’s intelligent, custom AI agents and advanced workflow automation solutions.",
    },
    "gen-ai": {
        title: "Enterprise Generative AI Solutions & Integration | NeoKlyn",
        description: "Harness the power of Generative AI. NeoKlyn develops custom LLMs and advanced machine learning solutions to completely transform your business processes.",
    }
};

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }): Promise<Metadata> {
    const { slug } = await params;
    const meta = servicesMetadata[slug];
    
    if (!meta) {
        return { title: "Service | NeoKlyn" };
    }

    return {
        title: meta.title,
        description: meta.description,
    };
}

export function generateStaticParams() {
    return Object.keys(servicesData).map((slug) => ({
        slug: slug,
    }));
}

export default async function ServiceDetailPage({ params }: { params: Promise<{ slug: string }> }) {
    const { slug } = await params;
    const service = servicesData[slug as keyof typeof servicesData];

    if (!service) {
        notFound();
    }

    const meta = servicesMetadata[slug] || { title: service.titleSolid, description: service.description };

    const serviceSchema = {
        "@context": "https://schema.org",
        "@type": "Service",
        "serviceType": meta.title,
        "provider": {
            "@type": "Organization",
            "name": "NeoKlyn",
            "url": "https://neoklyn.com"
        },
        "description": meta.description,
        "areaServed": [
            { "@type": "City", "name": "Bangalore" },
            { "@type": "City", "name": "Dubai" },
            { "@type": "City", "name": "London" }
        ]
    };

    return (
        <PageWrapper>
            <script
                type="application/ld+json"
                dangerouslySetInnerHTML={{ __html: JSON.stringify(serviceSchema) }}
            />
            <section className="section">
                <PageHeader
                    label={service.label}
                    titleOutline={service.titleOutline}
                    titleSolid={service.titleSolid}
                    titleColorClass={service.titleColorClass}
                    description={service.description}
                />

                <div className="reveal" style={{ maxWidth: '900px', margin: '4rem auto 0' }}>
                    
                    <div className="service-content-grid">
                        {service.content.map((block, idx) => (
                            <div key={idx} className="sc-block tcard">
                                <h3 className="p-title" style={{ marginBottom: '1rem', fontSize: '1.4rem' }}>{block.heading}</h3>
                                <p className="sc-desc" style={{ fontSize: '1rem', lineHeight: '1.7', opacity: 0.8 }}>
                                    {block.text}
                                </p>
                            </div>
                        ))}
                    </div>

                    <div style={{ marginTop: '4rem', textAlign: 'center' }}>
                        <Link href="/services" className="btn-ghost" style={{ marginBottom: '2rem' }}>
                            <svg width="14" height="14" viewBox="0 0 14 14" fill="none" xmlns="http://www.w3.org/2000/svg" style={{ transform: 'rotate(180deg)' }}><path d="M1 7h12M7 1l6 6-6 6" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" /></svg>
                            Back to All Services
                        </Link>
                    </div>
                </div>

                <style>{`
                    .service-content-grid {
                        display: grid;
                        grid-template-columns: 1fr;
                        gap: 2rem;
                    }
                    @media (min-width: 768px) {
                        .service-content-grid {
                            grid-template-columns: repeat(3, 1fr);
                        }
                    }
                    .sc-block {
                        padding: 2.5rem 2rem;
                        background: rgba(255, 255, 255, 0.02);
                        border-radius: 12px;
                        border: 1px solid rgba(255, 255, 255, 0.05);
                        transition: transform 0.3s ease, border-color 0.3s ease;
                    }
                    .sc-block:hover {
                        transform: translateY(-5px);
                        border-color: rgba(255, 255, 255, 0.1);
                    }
                `}</style>
            </section>
        </PageWrapper>
    );
}
