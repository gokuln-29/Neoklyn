import PageWrapper from "@/components/layout/PageWrapper";
import Link from "next/link";
import { notFound } from "next/navigation";
import type { Metadata } from "next";
import ServiceHeroAnimation from "@/components/ServiceHeroAnimation";
import { breadcrumbSchema, serviceSchema, faqSchema } from "@/lib/schema";

const serviceFaqs: Record<string, { question: string; answer: string }[]> = {
    web: [
        { question: "What technologies does NeoKlyn use for web development?", answer: "We build with React, Next.js, and TypeScript, using headless CMS platforms like Sanity for content management and deploying on modern edge infrastructure for maximum performance." },
        { question: "How long does a web development project take?", answer: "Standard websites: 2-3 weeks. Web apps and ecommerce: 3-6 weeks. Complex platforms: 6-10 weeks, depending on scope and integrations." },
        { question: "How much does a website cost at NeoKlyn?", answer: "Websites start from ₹50,000 / $600. Web apps typically range ₹1-4 lakh / $1,200-5,000 depending on features. Get a free AI-powered estimate at neoklyn.com/estimate." },
    ],
    mobile: [
        { question: "Does NeoKlyn build both iOS and Android apps?", answer: "Yes. We build for both platforms using modern cross-platform tooling, delivering native-quality performance from a single codebase." },
        { question: "How long does mobile app development take?", answer: "Mobile apps typically require 3-6 weeks for standard scope, or 6-10 weeks for complex platforms, depending on feature complexity and integrations." },
        { question: "How much does a mobile app cost?", answer: "Mobile app projects typically range ₹1-4 lakh / $1,200-5,000 depending on scope. Use the free estimator at neoklyn.com/estimate for a tailored budget." },
    ],
    ecommerce: [
        { question: "Does NeoKlyn work with Shopify?", answer: "Yes. We build both Shopify storefronts and fully custom ecommerce platforms, including B2B portals with RFQ systems." },
        { question: "Can NeoKlyn migrate my existing store?", answer: "Yes. We handle platform migrations including product data, SEO preservation, and redirect strategies to protect existing search rankings." },
        { question: "What makes NeoKlyn ecommerce builds different?", answer: "Every build is engineered for conversion: fast page loads, optimized checkout flows, and analytics instrumentation from day one." },
    ],
    marketing: [
        { question: "What digital marketing services does NeoKlyn offer?", answer: "SEO, performance marketing, content strategy, and growth engineering — focused on measurable organic and paid acquisition." },
        { question: "How long until SEO results show?", answer: "Technical SEO improvements can show within weeks. Meaningful organic growth from content typically takes 3-6 months of consistent execution — there are no guaranteed timelines for organic rankings." },
        { question: "Does NeoKlyn handle both organic and paid marketing?", answer: "Yes. We combine SEO-driven organic growth with performance marketing campaigns, sharing one analytics foundation for accurate attribution." },
    ],
    "3d": [
        { question: "What 3D technologies does NeoKlyn use?", answer: "We build with Three.js, WebGL, and React Three Fiber to deliver cinema-quality 3D experiences that run in any browser without plugins." },
        { question: "Do 3D websites hurt performance?", answer: "Not when engineered properly. We use progressive loading, level-of-detail optimization, and GPU-aware rendering so 3D experiences stay fast on all devices." },
        { question: "What are 3D web experiences used for?", answer: "Interactive product visualization, virtual showrooms, configurators, and immersive brand storytelling that flat interfaces can't match." },
    ],
    branding: [
        { question: "What does NeoKlyn's branding service include?", answer: "Brand identity, product design, UI/UX design systems, and visual language development for digital-first brands." },
        { question: "Can NeoKlyn redesign an existing product?", answer: "Yes. We audit existing products, identify UX friction, and deliver redesigns that improve both aesthetics and conversion metrics." },
    ],
    "ai-agents": [
        { question: "What are AI agents and how can they help my business?", answer: "AI agents are LLM-powered systems that autonomously handle tasks like lead qualification, customer support, and workflow automation. They work 24/7 and integrate with your existing tools." },
        { question: "Does NeoKlyn build production-ready AI agents?", answer: "Yes. We build production-grade agents with proper guardrails, evaluation, and monitoring — integrated with your CRM, helpdesk, or internal systems, not just demos." },
        { question: "How much does a custom AI agent cost?", answer: "AI agent projects typically start from ₹1 lakh / $1,200 depending on complexity, integrations, and model requirements. Get a free estimate at neoklyn.com/estimate." },
    ],
    "gen-ai": [
        { question: "What generative AI services does NeoKlyn offer?", answer: "GenAI product development including RAG systems, AI content pipelines, LLM integration into existing products, and custom AI tooling." },
        { question: "Which AI models does NeoKlyn work with?", answer: "We work with leading model providers and select the right model per use case, balancing capability, latency, and cost for production workloads." },
        { question: "Can NeoKlyn add AI to my existing product?", answer: "Yes. We specialize in integrating LLM capabilities into existing web and mobile products with proper evaluation and safety guardrails." },
    ],
};

// Local data for all services
const servicesData = {
    web: {
        label: "01 // Service",
        titleOutline: "WEB",
        titleSolid: "DEVELOPMENT",
        titleColorClass: "title-cyan",
        accentColor: "var(--cyan)",
        description: "Fast, scalable, and beautifully designed web applications. We utilize modern JavaScript stacks to build robust, secure, and SEO-optimized digital products that convert.",
        techStack: ["React", "Next.js", "TypeScript", "Node.js", "GraphQL", "Tailwind CSS", "Vercel", "AWS"],
        content: [
            {
                heading: "Frontend Engineering",
                text: "We architect resilient frontends using React, Next.js, and modern CSS to deliver uncompromised user experiences across all devices.",
                icon: "bolt"
            },
            {
                heading: "Backend Systems",
                text: "From serverless architectures to robust REST or GraphQL APIs, our backend solutions ensure data scales securely with your business.",
                icon: "server"
            },
            {
                heading: "Performance & SEO",
                text: "Built from the ground up for Core Web Vitals, ensuring your application ranks well and loads instantaneously.",
                icon: "rocket"
            }
        ],
        stats: [
            { value: "99", unit: "/100", label: "Lighthouse Score Target" },
            { value: "10+", unit: "", label: "Years Engineering Experience" },
            { value: "100%", unit: "", label: "Founder-Reviewed Code" },
        ]
    },
    mobile: {
        label: "02 // Service",
        titleOutline: "MOBILE",
        titleSolid: "APPS",
        titleColorClass: "title-blue",
        accentColor: "var(--blue)",
        description: "Native and cross-platform mobile applications engineered for the iOS and Android ecosystems. We focus on frictionless UX and high scale.",
        techStack: ["Flutter", "React Native", "Swift", "Kotlin", "Firebase", "Supabase", "Expo", "Fastlane"],
        content: [
            {
                heading: "Cross-Platform Efficiency",
                text: "Utilizing frameworks like Flutter and React Native to deploy apps on both major platforms simultaneously, cutting development costs and time-to-market.",
                icon: "phone"
            },
            {
                heading: "Native Capabilities",
                text: "When raw performance or deep hardware integration is required, we build using Swift and Kotlin to deliver native excellence.",
                icon: "gear"
            },
            {
                heading: "App Store Optimization",
                text: "We don't just build your app; we make sure it gets found with built-in ASO strategies and launch support.",
                icon: "chart-up"
            }
        ],
        stats: [
            { value: "10+", unit: "", label: "Years Engineering Experience" },
            { value: "40-60%", unit: "", label: "Below Agency Pricing" },
            { value: "100%", unit: "", label: "Founder-Reviewed Code" },
        ]
    },
    ecommerce: {
        label: "03 // Service",
        titleOutline: "ECOMMERCE",
        titleSolid: "SOLUTIONS",
        titleColorClass: "title-violet",
        accentColor: "var(--violet)",
        description: "High-converting, globally scalable storefronts that seamlessly blend premium brand aesthetics with frictionless shopping experiences.",
        techStack: ["Shopify Plus", "WooCommerce", "Next.js", "Stripe", "Razorpay", "Medusa", "Sanity", "Algolia"],
        content: [
            {
                heading: "Custom Shopify & Shopify Plus",
                text: "Bespoke theme development, advanced app integrations, and conversion rate optimization for top-tier merchants.",
                icon: "bag"
            },
            {
                heading: "Headless Commerce",
                text: "Decoupling the frontend using Next.js to provide lightning-fast, highly customized shopping experiences independent of your backend platform.",
                icon: "bolt"
            },
            {
                heading: "Payment & Logistics Integrations",
                text: "Connecting local and global payment gateways, shipping providers, and ERPs for a unified operational flow.",
                icon: "card"
            }
        ],
        stats: [
            { value: "10+", unit: "", label: "Years Engineering Experience" },
            { value: "40-60%", unit: "", label: "Below Agency Pricing" },
            { value: "100%", unit: "", label: "Founder-Reviewed Code" },
        ]
    },
    marketing: {
        label: "04 // Service",
        titleOutline: "DIGITAL",
        titleSolid: "MARKETING",
        titleColorClass: "title-cyan",
        accentColor: "var(--cyan)",
        description: "Metrics-obsessed, data-driven acquisition. We drive highly targeted scaling strategies using technical SEO, performance marketing, and conversion funnels.",
        techStack: ["Google Ads", "Meta Ads", "SEMrush", "Ahrefs", "GA4", "GTM", "HubSpot", "Mailchimp"],
        content: [
            {
                heading: "Performance Paid Media",
                text: "Laser-targeted Google Ads, Meta Ads, and LinkedIn campaigns optimized for ROAS and lowest possible CAC.",
                icon: "target"
            },
            {
                heading: "Technical & Content SEO",
                text: "Comprehensive site audits, schema markup, semantic search optimization, and authority building to win organic rankings.",
                icon: "search"
            },
            {
                heading: "Conversion Rate Optimization",
                text: "A/B testing, user behavior analysis, and funnel optimization to extract maximum value from existing traffic.",
                icon: "chart-bars"
            }
        ],
        stats: [
            { value: "10+", unit: "", label: "Years Engineering Experience" },
            { value: "40-60%", unit: "", label: "Below Agency Pricing" },
            { value: "100%", unit: "", label: "Founder-Reviewed Code" },
        ]
    },
    "3d": {
        label: "05 // Service",
        titleOutline: "3D &",
        titleSolid: "IMMERSIVE",
        titleColorClass: "title-blue",
        accentColor: "var(--blue)",
        description: "Mind-bending custom WebGL experiences, 3D product viewers, and interactive storytelling that leave a lasting impression on your audience.",
        techStack: ["Three.js", "WebGL", "GSAP", "Blender", "React Three Fiber", "Spline", "Lottie", "Rive"],
        content: [
            {
                heading: "WebGL & Three.js",
                text: "Building complex 3D scenes running directly in the browser at 60 frames per second on both desktop and mobile.",
                icon: "cube"
            },
            {
                heading: "Interactive Product Viewers",
                text: "Allow your customers to rotate, zoom, and customize 3D models of your products in real-time before buying.",
                icon: "viewer"
            },
            {
                heading: "Scroll-Triggered Animations",
                text: "High-end GSAP animations tied to user scroll, creating a cinematic, agency-level storytelling experience.",
                icon: "film"
            }
        ],
        stats: [
            { value: "60", unit: "fps", label: "Render Target" },
            { value: "10+", unit: "", label: "Years Engineering Experience" },
            { value: "100%", unit: "", label: "Founder-Reviewed Code" },
        ]
    },
    branding: {
        label: "06 // Service",
        titleOutline: "UI/UX &",
        titleSolid: "BRANDING",
        titleColorClass: "title-violet",
        accentColor: "var(--violet)",
        description: "Premium brand identity systems, scalable UI component kits, and friction-less user experiences engineered for engagement.",
        techStack: ["Figma", "Adobe CC", "Framer", "Principle", "Storybook", "Zeplin", "InVision", "Miro"],
        content: [
            {
                heading: "Identity & Visual Language",
                text: "Developing color palettes, typography systems, and visual guidelines that position you as a premium leader in your space.",
                icon: "palette"
            },
            {
                heading: "User Experience (UX) Design",
                text: "Wireframing, user journey mapping, and low-fidelity prototyping to ensure your product is inherently intuitive.",
                icon: "ux"
            },
            {
                heading: "Design Systems & UI Kits",
                text: "Creating reusable Figma design systems that keep your product visually consistent as it scales across new features.",
                icon: "system"
            }
        ],
        stats: [
            { value: "10+", unit: "", label: "Years Engineering Experience" },
            { value: "40-60%", unit: "", label: "Below Agency Pricing" },
            { value: "100%", unit: "", label: "Founder-Reviewed Code" },
        ]
    },
    "ai-agents": {
        label: "07 // Service",
        titleOutline: "AI",
        titleSolid: "AGENTS",
        titleColorClass: "title-cyan",
        accentColor: "var(--cyan)",
        description: "Autonomous workflow automation, autonomous web agents, and intelligent ops. We build production-grade agents on modern agentic frameworks to cut repetitive manual work.",
        techStack: ["LangChain", "LangGraph", "OpenAI", "Anthropic", "CrewAI", "AutoGen", "Pinecone", "Weaviate"],
        content: [
            {
                heading: "Workflow Automation Agents",
                text: "Custom-trained AI agents that automate repetitive internal tasks, data entry, and CRM management, running 24/7.",
                icon: "bot"
            },
            {
                heading: "Specialized RAG Architectures",
                text: "Implement Retrieval-Augmented Generation to allow agents to instantly query and reason over your proprietary company data engines privately.",
                icon: "brain"
            },
            {
                heading: "Multi-Agent Systems",
                text: "Deploy LangChain and LangGraph ecosystems where multiple specialized algorithms coordinate dynamically to solve complex business problems.",
                icon: "network"
            }
        ],
        stats: [
            { value: "24/7", unit: "", label: "Always Active" },
            { value: "10+", unit: "", label: "Years Engineering Experience" },
            { value: "100%", unit: "", label: "Founder-Reviewed Code" },
        ]
    },
    "gen-ai": {
        label: "08 // Service",
        titleOutline: "GENERATIVE",
        titleSolid: "AI",
        titleColorClass: "title-blue",
        accentColor: "var(--blue)",
        description: "Custom Large Language Model integration, dynamic content generation engines, and predictive marketing algorithms tailored to your exact data.",
        techStack: ["GPT-4", "Claude", "Llama", "Mistral", "Hugging Face", "TensorFlow", "PyTorch", "ONNX"],
        content: [
            {
                heading: "Proprietary LLM Integration",
                text: "Custom deployment of OpenAI, Anthropic, or open-source Llama/Mistral models perfectly integrated into your existing SaaS products.",
                icon: "dna"
            },
            {
                heading: "Generative UI/UX",
                text: "Build applications that dynamically generate completely unique interfaces based on the specific user's prompt or intent.",
                icon: "spark"
            },
            {
                heading: "Predictive & Generative Marketing",
                text: "Engines that dynamically generate millions of highly personalized ad creatives and email copies based on individual user behaviors.",
                icon: "signal"
            }
        ],
        stats: [
            { value: "10+", unit: "", label: "Years Engineering Experience" },
            { value: "40-60%", unit: "", label: "Below Agency Pricing" },
            { value: "100%", unit: "", label: "Founder-Reviewed Code" },
        ]
    }
};

function CapabilityIcon({ name }: { name: string }) {
    switch (name) {
        case "bolt":
            return <svg viewBox="0 0 24 24" fill="none" aria-hidden="true"><path className="pulse" d="M13 2L5 13h5l-1 9 8-11h-5l1-9Z" stroke="currentColor" strokeWidth="1.7" strokeLinejoin="round" /></svg>;
        case "server":
            return <svg viewBox="0 0 24 24" fill="none" aria-hidden="true"><rect x="4" y="4" width="16" height="6" rx="2" stroke="currentColor" strokeWidth="1.6" /><rect x="4" y="14" width="16" height="6" rx="2" stroke="currentColor" strokeWidth="1.6" /><circle cx="8" cy="7" r="1" fill="currentColor" /><circle cx="8" cy="17" r="1" fill="currentColor" /></svg>;
        case "rocket":
            return <svg viewBox="0 0 24 24" fill="none" aria-hidden="true"><path d="M14 4c3 0 6 3 6 6-3 0-6-3-6-6Z" stroke="currentColor" strokeWidth="1.6" /><path d="M14 4L9 9l6 6 5-5" stroke="currentColor" strokeWidth="1.6" strokeLinejoin="round" /><path className="pulse" d="M8 16l-3 3m1-5-2 2" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" /></svg>;
        case "phone":
            return <svg viewBox="0 0 24 24" fill="none" aria-hidden="true"><rect x="7" y="2.5" width="10" height="19" rx="2.5" stroke="currentColor" strokeWidth="1.6" /><path d="M10 5h4" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" /><circle className="pulse" cx="12" cy="18" r="1" fill="currentColor" /></svg>;
        case "gear":
            return <svg viewBox="0 0 24 24" fill="none" aria-hidden="true"><g className="spin"><path d="M12 3v2m0 14v2m9-9h-2M5 12H3m15.3-6.3-1.4 1.4M7.1 16.9l-1.4 1.4m0-12.8 1.4 1.4m9.8 9.8 1.4 1.4" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" /></g><circle cx="12" cy="12" r="3" stroke="currentColor" strokeWidth="1.6" /></svg>;
        case "chart-up":
            return <svg viewBox="0 0 24 24" fill="none" aria-hidden="true"><path d="M4 18h16" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" /><path className="pulse" d="M6 15l4-4 3 3 5-6" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" /></svg>;
        case "bag":
            return <svg viewBox="0 0 24 24" fill="none" aria-hidden="true"><rect x="5" y="7" width="14" height="13" rx="2" stroke="currentColor" strokeWidth="1.6" /><path d="M9 9V7a3 3 0 0 1 6 0v2" stroke="currentColor" strokeWidth="1.6" /><path className="pulse" d="M10.5 13h3" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" /></svg>;
        case "card":
            return <svg viewBox="0 0 24 24" fill="none" aria-hidden="true"><rect x="3" y="6" width="18" height="12" rx="2" stroke="currentColor" strokeWidth="1.6" /><path d="M3 10h18" stroke="currentColor" strokeWidth="1.6" /><path className="pulse" d="M7 14h4" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" /></svg>;
        case "target":
            return <svg viewBox="0 0 24 24" fill="none" aria-hidden="true"><circle className="spin-slow" cx="12" cy="12" r="8" stroke="currentColor" strokeWidth="1.4" /><circle cx="12" cy="12" r="4.5" stroke="currentColor" strokeWidth="1.4" /><circle className="pulse" cx="12" cy="12" r="1.5" fill="currentColor" /></svg>;
        case "search":
            return <svg viewBox="0 0 24 24" fill="none" aria-hidden="true"><circle cx="10.5" cy="10.5" r="5.5" stroke="currentColor" strokeWidth="1.6" /><path className="pulse" d="M15 15l4.5 4.5" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" /></svg>;
        case "chart-bars":
            return <svg viewBox="0 0 24 24" fill="none" aria-hidden="true"><path d="M4 20h16" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" /><rect className="pulse" x="6" y="12" width="2.8" height="6" rx="1" fill="currentColor" /><rect x="10.6" y="9" width="2.8" height="9" rx="1" fill="currentColor" opacity="0.85" /><rect x="15.2" y="6" width="2.8" height="12" rx="1" fill="currentColor" opacity="0.7" /></svg>;
        case "cube":
            return <svg viewBox="0 0 24 24" fill="none" aria-hidden="true"><path className="spin-slow" d="M12 3l7 4-7 4-7-4 7-4Z" stroke="currentColor" strokeWidth="1.4" /><path d="M5 7v10l7 4 7-4V7" stroke="currentColor" strokeWidth="1.4" /><path className="pulse" d="M12 11v10" stroke="currentColor" strokeWidth="1.4" /></svg>;
        case "viewer":
            return <svg viewBox="0 0 24 24" fill="none" aria-hidden="true"><circle cx="11" cy="11" r="5" stroke="currentColor" strokeWidth="1.6" /><path d="M14.8 14.8L19 19" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" /><circle className="pulse" cx="11" cy="11" r="1.3" fill="currentColor" /></svg>;
        case "film":
            return <svg viewBox="0 0 24 24" fill="none" aria-hidden="true"><rect x="4" y="5" width="16" height="14" rx="2" stroke="currentColor" strokeWidth="1.6" /><path d="M4 9h16M8 5v14M16 5v14" stroke="currentColor" strokeWidth="1.2" opacity="0.85" /><path className="pulse" d="M10 12h4" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" /></svg>;
        case "palette":
            return <svg viewBox="0 0 24 24" fill="none" aria-hidden="true"><path d="M12 4a8 8 0 1 0 0 16h1.5a2 2 0 0 0 0-4H12a2 2 0 0 1 0-4h4a4 4 0 0 0 4-4A8 8 0 0 0 12 4Z" stroke="currentColor" strokeWidth="1.5" /><circle className="pulse" cx="8" cy="9" r="1" fill="currentColor" /><circle cx="10" cy="7" r="1" fill="currentColor" opacity="0.8" /><circle cx="7" cy="12" r="1" fill="currentColor" opacity="0.7" /></svg>;
        case "ux":
            return <svg viewBox="0 0 24 24" fill="none" aria-hidden="true"><path d="M4 8h6v6H4zM14 8h6v6h-6zM9 14l3 3 3-3" stroke="currentColor" strokeWidth="1.6" strokeLinejoin="round" /><path className="pulse" d="M12 5v3" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" /></svg>;
        case "system":
            return <svg viewBox="0 0 24 24" fill="none" aria-hidden="true"><rect x="4" y="4" width="7" height="7" rx="1.5" stroke="currentColor" strokeWidth="1.5" /><rect x="13" y="4" width="7" height="7" rx="1.5" stroke="currentColor" strokeWidth="1.5" /><rect x="4" y="13" width="7" height="7" rx="1.5" stroke="currentColor" strokeWidth="1.5" /><rect x="13" y="13" width="7" height="7" rx="1.5" stroke="currentColor" strokeWidth="1.5" /><path className="pulse" d="M11 7h2M7 11v2" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" /></svg>;
        case "bot":
            return <svg viewBox="0 0 24 24" fill="none" aria-hidden="true"><rect x="5" y="7" width="14" height="11" rx="3" stroke="currentColor" strokeWidth="1.6" /><path d="M12 4v3" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" /><circle className="pulse" cx="9" cy="12" r="1" fill="currentColor" /><circle className="pulse" cx="15" cy="12" r="1" fill="currentColor" /></svg>;
        case "brain":
            return <svg viewBox="0 0 24 24" fill="none" aria-hidden="true"><path d="M9 8a3 3 0 1 1 3-3 3 3 0 1 1 3 3 3 3 0 1 1 0 6 3 3 0 1 1-3 3 3 3 0 1 1-3-3 3 3 0 1 1 0-6Z" stroke="currentColor" strokeWidth="1.4" /><path className="pulse" d="M12 8v8" stroke="currentColor" strokeWidth="1.5" /></svg>;
        case "network":
            return <svg viewBox="0 0 24 24" fill="none" aria-hidden="true"><circle cx="6" cy="6" r="2" stroke="currentColor" strokeWidth="1.4" /><circle cx="18" cy="6" r="2" stroke="currentColor" strokeWidth="1.4" /><circle cx="12" cy="18" r="2" stroke="currentColor" strokeWidth="1.4" /><path className="pulse" d="M8 7.4l2.8 8M16 7.4l-2.8 8M8 6h8" stroke="currentColor" strokeWidth="1.4" /></svg>;
        case "dna":
            return <svg viewBox="0 0 24 24" fill="none" aria-hidden="true"><path className="spin-slow" d="M7 4c4 2 6 6 10 8M7 20c4-2 6-6 10-8" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" /><path d="M8 7h8M8 12h8M8 17h8" stroke="currentColor" strokeWidth="1.2" opacity="0.85" /></svg>;
        case "spark":
            return <svg viewBox="0 0 24 24" fill="none" aria-hidden="true"><path className="pulse" d="M12 3l1.8 4.2L18 9l-4.2 1.8L12 15l-1.8-4.2L6 9l4.2-1.8L12 3Z" stroke="currentColor" strokeWidth="1.5" strokeLinejoin="round" /><path d="M18.5 4.5l.8 1.8 1.7.7-1.7.8-.8 1.7-.7-1.7-1.8-.8 1.8-.7.7-1.8Z" fill="currentColor" opacity="0.65" /></svg>;
        case "signal":
            return <svg viewBox="0 0 24 24" fill="none" aria-hidden="true"><path d="M4 18h2M8 15h2M12 12h2M16 9h2M20 6h0" stroke="currentColor" strokeWidth="1.7" strokeLinecap="round" /><path className="pulse" d="M5 19l14-14" stroke="currentColor" strokeWidth="1.4" strokeLinecap="round" opacity="0.75" /></svg>;
        default:
            return <svg viewBox="0 0 24 24" fill="none" aria-hidden="true"><circle cx="12" cy="12" r="7" stroke="currentColor" strokeWidth="1.6" /><circle className="pulse" cx="12" cy="12" r="2" fill="currentColor" /></svg>;
    }
}

const servicesMetadata: Record<string, { title: string; description: string }> = {
    web: {
        title: "Next.js Web Development Agency India — NeoKlyn",
        description: "Fast, scalable web apps built with React, Next.js & TypeScript, reviewed line-by-line by a senior engineer. Request a free audit.",
    },
    mobile: {
        title: "Mobile App Development Company India — NeoKlyn",
        description: "Cross-platform & native mobile apps with Flutter, React Native & Swift. From MVP to enterprise scale. Start your project.",
    },
    ecommerce: {
        title: "Ecommerce Development Agency — NeoKlyn",
        description: "High-converting Shopify Plus, WooCommerce & headless commerce stores, engineered for conversion. Launch your store with NeoKlyn.",
    },
    marketing: {
        title: "Digital Marketing Agency Bengaluru — NeoKlyn",
        description: "Data-driven SEO, Google Ads & Meta campaigns focused on measurable organic and paid acquisition. Talk to NeoKlyn's marketing team.",
    },
    "3d": {
        title: "3D Website & WebGL Development — NeoKlyn",
        description: "Immersive 3D product viewers, WebGL animations & scroll-driven storytelling, built to stay fast on all devices. Explore our 3D portfolio.",
    },
    branding: {
        title: "UI/UX Design & Branding Agency India — NeoKlyn",
        description: "Premium brand identity, Figma design systems & conversion-focused UX. Book a design consultation.",
    },
    "ai-agents": {
        title: "AI Agent Development Company — NeoKlyn",
        description: "Deploy autonomous AI agents to automate workflows, CRM ops & data pipelines. Built with LangChain & GPT. Talk to our AI team.",
    },
    "gen-ai": {
        title: "Generative AI Integration Services — NeoKlyn",
        description: "Custom LLM integration, generative UI, and predictive AI marketing. Enterprise-grade Gen AI solutions from NeoKlyn. Book a demo.",
    }
};

// Figures mirror the pricing already published in the FAQs above and on the home page.
const servicePricing: Record<string, { from: string; range: string; timeline: string; examples: string[] }> = {
    web: {
        from: "From ₹50,000 / $600",
        range: "Web apps typically ₹1-4 lakh / $1,200-5,000, depending on features",
        timeline: "Typical delivery: 2-5 weeks",
        examples: ["Business or clinic website with online booking", "Company site with an enquiry funnel", "Customer portal or dashboard"],
    },
    mobile: {
        from: "From ₹1 lakh / $1,200",
        range: "Mobile apps typically ₹1-4 lakh / $1,200-5,000, depending on scope",
        timeline: "Typical delivery: 2-5 weeks",
        examples: ["Booking or appointment app", "Ordering or delivery app", "Membership or field-staff app"],
    },
    "ai-agents": {
        from: "From ₹1 lakh / $1,200",
        range: "Final price depends on complexity, integrations and model requirements",
        timeline: "Typical delivery: 2-5 weeks",
        examples: ["WhatsApp or website enquiry assistant", "Lead follow-up and booking automation", "Internal assistant over your own documents"],
    },
};

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }): Promise<Metadata> {
    const { slug } = await params;
    const meta = servicesMetadata[slug];
    const url = `https://neoklyn.com/services/${slug}`;

    if (!meta) {
        return {
            title: {
                absolute: "Service — NeoKlyn",
            },
            openGraph: {
                title: "Service — NeoKlyn",
                description: "Explore NeoKlyn's digital services for web, mobile, AI, and growth.",
                url,
                siteName: "NeoKlyn",
                type: "website",
            },
        };
    }

    return {
        title: {
            absolute: meta.title,
        },
        description: meta.description,
        alternates: {
            canonical: `https://neoklyn.com/services/${slug}`,
        },
        openGraph: {
            title: meta.title,
            description: meta.description,
            url,
            siteName: "NeoKlyn",
            type: "website",
        },
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
    const serviceName = meta.title.replace(/\s+—\s+NeoKlyn$/, "");
    const serviceStructuredData = serviceSchema(serviceName, meta.description);
    const breadcrumbStructuredData = breadcrumbSchema([
        { name: "Home", url: "https://neoklyn.com" },
        { name: "Services", url: "https://neoklyn.com/services" },
        { name: serviceName, url: `https://neoklyn.com/services/${slug}` },
    ]);
    const faqStructuredData = serviceFaqs[slug] ? faqSchema(serviceFaqs[slug]) : null;

    return (
        <PageWrapper>
            <script
                type="application/ld+json"
                dangerouslySetInnerHTML={{ __html: JSON.stringify(serviceStructuredData) }}
            />
            <script
                type="application/ld+json"
                dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbStructuredData) }}
            />
            {faqStructuredData && (
                <script
                    type="application/ld+json"
                    dangerouslySetInnerHTML={{ __html: JSON.stringify(faqStructuredData) }}
                />
            )}

            {/* ─── HERO SECTION ─── */}
            <section className="svc-hero">
                <div className="svc-hero-orb svc-hero-orb-1" />
                <div className="svc-hero-orb svc-hero-orb-2" />
                <div className="svc-hero-grid">
                    <div className="svc-hero-left reveal">
                        <div className="s-label" style={{ justifyContent: 'flex-start' }}>{service.label}</div>
                        <h1 className="hero-title" style={{ fontSize: 'clamp(3rem,8vw,6.5rem)', marginBottom: '1.5rem', textAlign: 'left' }}>
                            <span className="title-outline">{service.titleOutline}</span>{" "}
                            <span className={service.titleColorClass}>{service.titleSolid}</span>
                        </h1>
                        <p className="hero-desc" style={{ maxWidth: '500px' }}>
                            {service.description}
                        </p>
                        <div className="hero-btns" style={{ marginTop: '2rem' }}>
                            <Link href="/contact" className="btn-main">Start a Project ↗</Link>
                            <Link href="/services" className="btn-ghost">
                                <svg width="14" height="14" viewBox="0 0 14 14" fill="none" xmlns="http://www.w3.org/2000/svg" style={{ transform: 'rotate(180deg)' }}><path d="M1 7h12M7 1l6 6-6 6" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" /></svg>
                                All Services
                            </Link>
                        </div>
                    </div>
                    <div className="svc-hero-right reveal">
                        <ServiceHeroAnimation slug={slug} />
                    </div>
                </div>
            </section>

            {/* ─── STATS STRIP ─── */}
            <div className="svc-stats-strip">
                <div className="svc-stats-inner reveal">
                    {service.stats.map((stat, i) => (
                        <div key={i} className="svc-stat">
                            <div className="svc-stat-value" style={{ color: service.accentColor }}>
                                {stat.value}<span className="svc-stat-unit">{stat.unit}</span>
                            </div>
                            <div className="svc-stat-label">{stat.label}</div>
                        </div>
                    ))}
                </div>
            </div>

            {/* ─── PRICING ─── */}
            {servicePricing[slug] && (
                <section className="section">
                    <div className="svc-pricing reveal">
                        <div className="svc-pricing-main">
                            <div className="s-label" style={{ justifyContent: 'flex-start' }}>Pricing</div>
                            <div className="svc-pricing-from" style={{ color: service.accentColor }}>{servicePricing[slug].from}</div>
                            <p className="svc-pricing-range">{servicePricing[slug].range}.</p>
                            <p className="svc-pricing-range">{servicePricing[slug].timeline}. Fixed price, you own 100% of the code.</p>
                            <div className="hero-btns" style={{ marginTop: '1.5rem' }}>
                                <Link href="/estimate" className="btn-main">Get a Free Estimate ↗</Link>
                                <a
                                    href="https://wa.me/916380202766?text=Hi%20NeoKlyn%2C%20I%27d%20like%20a%20quote%20for%20my%20project"
                                    className="btn-ghost"
                                    target="_blank"
                                    rel="noopener noreferrer"
                                >
                                    WhatsApp Us
                                </a>
                            </div>
                        </div>
                        <div className="svc-pricing-examples">
                            <div className="svc-pricing-examples-title">Popular things to build</div>
                            <ul>
                                {servicePricing[slug].examples.map((example) => (
                                    <li key={example}>{example}</li>
                                ))}
                            </ul>
                        </div>
                    </div>
                </section>
            )}

            {/* ─── CAPABILITIES ─── */}
            <section className="section section-alt">
                <div className="reveal">
                    <div className="s-label">Capabilities</div>
                    <h2 className="s-title">WHAT WE DELIVER</h2>
                    <p className="s-sub">Technical excellence across every dimension of this service.</p>
                </div>
                <div className="svc-capabilities-grid reveal">
                    {service.content.map((block, idx) => (
                        <div key={idx} className="svc-capability-card">
                            <div className="svc-cap-icon" style={{ '--icon-color': service.accentColor } as React.CSSProperties}>
                                <CapabilityIcon name={block.icon} />
                            </div>
                            <div className="svc-cap-num" style={{ color: service.accentColor }}>0{idx + 1}</div>
                            <h3 className="svc-cap-heading">{block.heading}</h3>
                            <p className="svc-cap-text">{block.text}</p>
                            <div className="svc-cap-line" style={{ background: service.accentColor }} />
                        </div>
                    ))}
                </div>
            </section>

            {/* ─── TECH STACK ─── */}
            <section className="section">
                <div className="reveal" style={{ textAlign: 'center' }}>
                    <div className="s-label" style={{ justifyContent: 'center' }}>Technology Stack</div>
                    <h2 className="s-title">TOOLS WE USE</h2>
                    <p className="s-sub" style={{ margin: '0 auto' }}>Industry-leading technologies powering our solutions.</p>
                </div>
                <div className="svc-tech-grid reveal">
                    {service.techStack.map((tech, i) => (
                        <div key={i} className="svc-tech-pill" style={{ animationDelay: `${i * 0.08}s` }}>
                            <span className="svc-tech-dot" style={{ background: service.accentColor }} />
                            {tech}
                        </div>
                    ))}
                </div>
            </section>

            {/* ─── PROCESS ─── */}
            <section className="section section-alt">
                <div className="reveal" style={{ textAlign: 'center' }}>
                    <div className="s-label" style={{ justifyContent: 'center' }}>Our Process</div>
                    <h2 className="s-title">HOW WE WORK</h2>
                    <p className="s-sub" style={{ margin: '0 auto' }}>A structured, transparent approach from concept to delivery.</p>
                </div>
                <div className="svc-process-grid reveal">
                    {[
                        { step: "01", title: "Discovery", desc: "Deep-dive into your business goals, user needs, and technical requirements to build a clear roadmap." },
                        { step: "02", title: "Strategy & Design", desc: "Wireframes, prototypes, and design systems — your approval before any production code." },
                        { step: "03", title: "Development", desc: "Clean, tested code with weekly demos. Full transparency through staging environments." },
                        { step: "04", title: "Launch & Scale", desc: "Production deployment, monitoring, and ongoing iteration to keep growing post-launch." },
                    ].map((phase, i) => (
                        <div key={i} className="svc-process-step">
                            <div className="svc-process-num" style={{ color: service.accentColor }}>{phase.step}</div>
                            <div className="svc-process-connector" style={{ background: service.accentColor }} />
                            <h3 className="svc-process-title">{phase.title}</h3>
                            <p className="svc-process-desc">{phase.desc}</p>
                        </div>
                    ))}
                </div>
            </section>

            {/* ─── BUILT THE NEOKLYN WAY ─── */}
            <section className="section">
                <div className="svc-neoklyn-way reveal">
                    <h3>Built the NeoKlyn way</h3>
                    <p>AI-accelerated development, senior-engineer review on every line, fixed pricing, 2-3x agency speed.</p>
                    <Link href="/how-we-work" className="btn-ghost" style={{ fontSize: '0.85rem', padding: '0.7rem 1.4rem' }}>
                        Learn how we work →
                    </Link>
                </div>
            </section>

            <style>{`
                /* ─── PRICING ─── */
                .svc-pricing {
                    display: grid;
                    grid-template-columns: 1.3fr 1fr;
                    gap: 2rem;
                    max-width: 1100px;
                    margin: 0 auto;
                    padding: 2rem;
                    border: 1px solid var(--border);
                    border-radius: 14px;
                    background: rgba(255,255,255,0.02);
                }
                .svc-pricing-from {
                    font-family: var(--font-space-grotesk), sans-serif;
                    font-weight: 700;
                    font-size: clamp(1.8rem, 4vw, 2.6rem);
                    margin: 0.5rem 0 0.75rem;
                }
                .svc-pricing-range {
                    font-size: 0.9rem;
                    color: var(--muted);
                    line-height: 1.7;
                    margin-bottom: 0.35rem;
                }
                .svc-pricing-examples-title {
                    font-family: var(--font-space-grotesk), sans-serif;
                    font-weight: 700;
                    margin-bottom: 0.75rem;
                }
                .svc-pricing-examples ul {
                    list-style: none;
                    padding: 0;
                    margin: 0;
                    display: grid;
                    gap: 0.6rem;
                }
                .svc-pricing-examples li {
                    font-size: 0.88rem;
                    color: var(--muted);
                    padding-left: 1.1rem;
                    position: relative;
                }
                .svc-pricing-examples li::before {
                    content: '→';
                    position: absolute;
                    left: 0;
                }
                @media (max-width: 800px) {
                    .svc-pricing { grid-template-columns: 1fr; padding: 1.5rem; }
                }

                /* ─── SERVICE HERO ─── */
                .svc-hero {
                    position: relative;
                    overflow: hidden;
                    padding: 8rem 4% 4rem;
                }
                .svc-hero-orb {
                    position: absolute;
                    border-radius: 50%;
                    pointer-events: none;
                    filter: blur(80px);
                }
                .svc-hero-orb-1 {
                    width: 500px; height: 500px;
                    background: radial-gradient(circle, rgba(6,182,212,0.12) 0%, transparent 70%);
                    top: -15%; left: -8%;
                }
                .svc-hero-orb-2 {
                    width: 400px; height: 400px;
                    background: radial-gradient(circle, rgba(124,58,237,0.1) 0%, transparent 70%);
                    bottom: -10%; right: -5%;
                }
                .svc-hero::after {
                    content: '';
                    position: absolute;
                    inset: 0;
                    background: repeating-linear-gradient(0deg, transparent, transparent 2px, rgba(6,182,212,0.008) 2px, rgba(6,182,212,0.008) 4px);
                    pointer-events: none;
                }
                .svc-hero-grid {
                    display: grid;
                    grid-template-columns: 1fr 1fr;
                    align-items: center;
                    gap: 4rem;
                    position: relative;
                    z-index: 1;
                    max-width: 1200px;
                    margin: 0 auto;
                }
                .svc-hero-left { position: relative; z-index: 2; }
                .svc-hero-right { position: relative; z-index: 2; animation: fadeIn 1.2s 0.4s both; }

                /* ─── STATS STRIP ─── */
                .svc-stats-strip {
                    border-top: 1px solid var(--border);
                    border-bottom: 1px solid var(--border);
                    background: var(--ink);
                    padding: 0;
                }
                .svc-stats-inner {
                    display: grid;
                    grid-template-columns: repeat(3, 1fr);
                    gap: 1px;
                    background: var(--border);
                    max-width: 900px;
                    margin: 0 auto;
                }
                .svc-stat {
                    text-align: center;
                    padding: 2.5rem 1.5rem;
                    background: var(--ink);
                }
                .svc-stat-value {
                    font-family: 'JetBrains Mono', monospace;
                    font-size: clamp(2rem, 4vw, 2.8rem);
                    font-weight: 700;
                    line-height: 1;
                    margin-bottom: 0.5rem;
                }
                .svc-stat-unit {
                    font-size: 0.6em;
                    opacity: 0.7;
                }
                .svc-stat-label {
                    font-size: 0.72rem;
                    color: var(--muted);
                    text-transform: uppercase;
                    letter-spacing: 0.12em;
                    font-family: 'JetBrains Mono', monospace;
                }

                /* ─── CAPABILITIES ─── */
                .svc-capabilities-grid {
                    display: grid;
                    grid-template-columns: repeat(3, 1fr);
                    gap: 1px;
                    background: var(--border);
                    border: 1px solid var(--border);
                    border-radius: 16px;
                    overflow: hidden;
                    margin-top: 4rem;
                }
                .svc-capability-card {
                    background: var(--bg);
                    padding: 3rem 2.5rem;
                    position: relative;
                    transition: background 0.3s;
                    overflow: hidden;
                }
                .svc-capability-card:hover { background: #0a0a12; }
                .svc-cap-icon {
                    --icon-color: var(--cyan);
                    width: 58px;
                    height: 58px;
                    border-radius: 14px;
                    border: 1px solid rgba(255,255,255,0.08);
                    background: radial-gradient(circle at 30% 30%, rgba(255,255,255,0.08), rgba(255,255,255,0.01));
                    display: inline-flex;
                    align-items: center;
                    justify-content: center;
                    margin-bottom: 1rem;
                    color: var(--icon-color);
                    position: relative;
                    overflow: hidden;
                    box-shadow: inset 0 0 16px rgba(255,255,255,0.03);
                }
                .svc-cap-icon::after {
                    content: '';
                    position: absolute;
                    inset: 4px;
                    border: 1px dashed rgba(255,255,255,0.08);
                    border-radius: 10px;
                    animation: icon-spin 7s linear infinite;
                }
                .svc-cap-icon svg {
                    width: 28px;
                    height: 28px;
                    position: relative;
                    z-index: 1;
                    filter: drop-shadow(0 0 8px rgba(255,255,255,0.2));
                    animation: icon-float 2.8s ease-in-out infinite;
                }
                .svc-cap-icon .spin { transform-origin: center; animation: icon-spin 2.5s linear infinite; }
                .svc-cap-icon .spin-slow { transform-origin: center; animation: icon-spin 5.5s linear infinite; }
                .svc-cap-icon .pulse { animation: icon-pulse 1.8s ease-in-out infinite; }
                @keyframes icon-float {
                    0%, 100% { transform: translateY(0px); }
                    50% { transform: translateY(-2px); }
                }
                @keyframes icon-spin {
                    from { transform: rotate(0deg); }
                    to { transform: rotate(360deg); }
                }
                @keyframes icon-pulse {
                    0%, 100% { opacity: 0.7; }
                    50% { opacity: 1; }
                }
                .svc-cap-num {
                    font-family: 'JetBrains Mono', monospace;
                    font-size: 0.65rem;
                    letter-spacing: 0.1em;
                    opacity: 0.5;
                    margin-bottom: 1rem;
                }
                .svc-cap-heading {
                    font-family: var(--font-space-grotesk), sans-serif;
                    font-weight: 700;
                    font-size: 1.3rem;
                    margin-bottom: 1rem;
                    letter-spacing: 0.02em;
                }
                .svc-cap-text {
                    font-size: 0.88rem;
                    color: var(--muted);
                    line-height: 1.7;
                }
                .svc-cap-line {
                    width: 40px;
                    height: 2px;
                    margin-top: 1.5rem;
                    opacity: 0.5;
                    border-radius: 2px;
                    transition: width 0.4s ease;
                }
                .svc-capability-card:hover .svc-cap-line { width: 80px; opacity: 1; }

                /* ─── TECH STACK ─── */
                .svc-tech-grid {
                    display: flex;
                    flex-wrap: wrap;
                    gap: 0.8rem;
                    justify-content: center;
                    margin-top: 3.5rem;
                    max-width: 700px;
                    margin-left: auto;
                    margin-right: auto;
                }
                .svc-tech-pill {
                    display: inline-flex;
                    align-items: center;
                    gap: 0.6rem;
                    padding: 0.75rem 1.5rem;
                    border: 1px solid var(--border);
                    border-radius: 40px;
                    font-family: 'JetBrains Mono', monospace;
                    font-size: 0.78rem;
                    letter-spacing: 0.04em;
                    color: rgba(255,255,255,0.7);
                    background: rgba(255,255,255,0.02);
                    transition: all 0.3s ease;
                    animation: fadeIn 0.6s ease-out both;
                }
                .svc-tech-pill:hover {
                    border-color: rgba(6,182,212,0.3);
                    background: rgba(6,182,212,0.05);
                    color: var(--white);
                    transform: translateY(-3px);
                    box-shadow: 0 8px 20px rgba(0,0,0,0.3);
                }
                .svc-tech-dot {
                    width: 6px;
                    height: 6px;
                    border-radius: 50%;
                    flex-shrink: 0;
                }

                /* ─── PROCESS ─── */
                .svc-process-grid {
                    display: grid;
                    grid-template-columns: repeat(4, 1fr);
                    gap: 1px;
                    background: var(--border);
                    border: 1px solid var(--border);
                    border-radius: 16px;
                    overflow: hidden;
                    margin-top: 4rem;
                }
                .svc-process-step {
                    background: var(--bg);
                    padding: 2.5rem 2rem;
                    position: relative;
                    transition: background 0.3s;
                }
                .svc-process-step:hover { background: #0a0a12; }
                .svc-process-num {
                    font-family: var(--font-space-grotesk), sans-serif;
                    font-size: 3rem;
                    font-weight: 800;
                    opacity: 0.15;
                    line-height: 1;
                    margin-bottom: 0.5rem;
                }
                .svc-process-connector {
                    width: 32px;
                    height: 2px;
                    margin-bottom: 1.5rem;
                    opacity: 0.6;
                    border-radius: 2px;
                }
                .svc-process-title {
                    font-family: var(--font-space-grotesk), sans-serif;
                    font-weight: 700;
                    font-size: 1.05rem;
                    margin-bottom: 0.8rem;
                }
                .svc-process-desc {
                    font-size: 0.82rem;
                    color: var(--muted);
                    line-height: 1.7;
                }

                /* ─── TITLE COLOR CLASSES ─── */
                .title-blue {
                    background: linear-gradient(135deg, var(--blue), var(--cyan));
                    -webkit-background-clip: text;
                    -webkit-text-fill-color: transparent;
                    background-clip: text;
                    filter: drop-shadow(0 0 20px rgba(59,130,246,0.5));
                }
                .title-violet {
                    background: linear-gradient(135deg, var(--violet), var(--blue));
                    -webkit-background-clip: text;
                    -webkit-text-fill-color: transparent;
                    background-clip: text;
                    filter: drop-shadow(0 0 20px rgba(124,58,237,0.5));
                }

                /* ─── BUILT THE NEOKLYN WAY ─── */
                .svc-neoklyn-way {
                    max-width: 640px;
                    margin: 0 auto;
                    text-align: center;
                    border: 1px solid rgba(255,255,255,0.08);
                    border-radius: 16px;
                    background: rgba(255,255,255,0.02);
                    padding: 2.25rem 2rem;
                }
                .svc-neoklyn-way h3 {
                    margin: 0 0 0.75rem;
                    font-size: 1.15rem;
                    font-family: var(--font-space-grotesk), sans-serif;
                    color: var(--white);
                }
                .svc-neoklyn-way p {
                    margin: 0 0 1.25rem;
                    color: rgba(255,255,255,0.72);
                    font-size: 0.9rem;
                    line-height: 1.7;
                }

                /* ─── RESPONSIVE ─── */
                @media (max-width: 900px) {
                    .svc-hero-grid { grid-template-columns: 1fr; gap: 2rem; }
                    .svc-hero-right { order: -1; }
                    .svc-hero-left { text-align: center; }
                    .svc-hero-left .hero-desc { margin: 0 auto; }
                    .svc-hero-left .hero-btns { justify-content: center; }
                    .svc-hero-left .s-label { justify-content: center !important; }
                    .svc-hero-left .hero-title { text-align: center !important; }
                    .svc-capabilities-grid,
                    .svc-process-grid { grid-template-columns: 1fr; }
                    .svc-stats-inner { grid-template-columns: 1fr; }
                }
            `}</style>
        </PageWrapper>
    );
}
