export type ProjectFilter = "Web" | "3D" | "Travel" | "Industrial" | "Manufacturing";

export interface ProjectResult {
  metric: string;
  description: string;
}

export interface ProjectCaseStudy {
  overview: string[];
  challenge: string;
  solution: string;
  results: ProjectResult[];
}

export interface Project {
  slug: string;
  client: string;
  title: string;
  tagline: string;
  category: string;
  filters: ProjectFilter[];
  location: string;
  color: string;
  image: string;
  liveUrl: string;
  keyMetric: string;
  description: string;
  techStack: string[];
  caseStudy: ProjectCaseStudy;
  seoTitle?: string;
  seoDescription?: string;
}

export const projectFilters: Array<"All" | ProjectFilter> = [
  "All",
  "Web",
  "3D",
  "Travel",
  "Industrial",
  "Manufacturing",
];

export const projects: Project[] = [
  {
    slug: "dwarka-trading",
    client: "Dwarka General Trading",
    title: "Digitizing B2B Trade Operations in the Middle East",
    tagline: "A high-performance B2B platform engineered for speed, trust, and lead capture.",
    category: "Web Platform",
    filters: ["Web"],
    location: "Middle East",
    color: "var(--cyan)",
    image: "/assets/work/dwarka.jpg",
    liveUrl: "http://dwarkageneraltrading.ae/",
    keyMetric: "+45% mobile engagement",
    description:
      "We rebuilt Dwarka's digital presence into a faster, conversion-led B2B platform with modern architecture and premium UX.",
    techStack: ["React", "Next.js", "TypeScript", "Sanity CMS", "Vercel"],
    caseStudy: {
      overview: [
        "Dwarka General Trading had deep operational expertise but an outdated digital surface that did not reflect enterprise credibility. Their old website struggled on mobile and made product exploration difficult for procurement teams.",
        "NeoKlyn re-architected the platform as a modern, headless web system focused on performance and discoverability. We simplified information architecture, tightened interaction flows, and delivered a premium visual language aligned with global B2B expectations.",
        "The result was a faster product discovery experience, stronger trust signals for enterprise buyers, and significantly improved lead quality from high-intent visitors.",
      ],
      challenge:
        "Legacy website with poor mobile performance and no content management.",
      solution:
        "Next.js headless CMS setup, mobile-first redesign, B2B portal with RFQ system.",
      results: [
        { metric: "+45%", description: "Mobile engagement increase in Q1" },
        { metric: "5x", description: "Faster content deployment for the team" },
        { metric: "Modern", description: "B2B portal with RFQ system" },
      ],
    },
    seoTitle: "Dwarka General Trading Case Study — NeoKlyn",
    seoDescription: "How NeoKlyn digitized B2B trade operations for a Middle Eastern leader.",
  },
  {
    slug: "aathithyan",
    client: "Aathithyan",
    title: "Designing a Premium Digital Presence for a Luxury Brand",
    tagline: "A pixel-perfect brand experience crafted for modern luxury positioning.",
    category: "Web · Brand Website",
    filters: ["Web"],
    location: "India",
    color: "var(--violet)",
    image: "/assets/work/travex.png",
    liveUrl: "https://aathithyan.com",
    keyMetric: "Pixel-perfect luxury positioning",
    description:
      "We translated Aathithyan's premium brand language into a cinematic, ultra-fast digital experience that converts attention into trust.",
    techStack: ["Next.js", "TypeScript", "GSAP", "Vercel Edge", "Figma"],
    caseStudy: {
      overview: [
        "Aathithyan needed its online presence to reflect the same premium quality customers experienced offline. The previous web touchpoint felt generic and lacked the refined depth expected from a luxury-first brand.",
        "Our team shaped a custom visual system with intentional typography, breathing room, and high-polish motion. Every section was designed to communicate exclusivity while preserving speed and usability.",
        "By pairing cinematic presentation with a server-first Next.js stack, we delivered an experience that elevated brand perception without sacrificing performance.",
      ],
      challenge:
        "The brand required flawless visual execution and fast loading across devices, but the existing site could not support premium storytelling or modern performance benchmarks.",
      solution:
        "We built a custom Next.js website with edge deployment, precision-crafted UI components, and a typography-led layout system. Motion was subtle and purposeful, supporting narrative flow while maintaining near-instant interactions.",
      results: [
        { metric: "95+", description: "Lighthouse scores maintained" },
        { metric: "<1s", description: "Average first-load time" },
        { metric: "Premium", description: "Brand perception established" },
      ],
    },
  },
  {
    slug: "zinad-concrete-works",
    client: "Zinad Concrete Works",
    title: "Establishing Industrial Authority in the Middle East",
    tagline: "An industrial-grade web platform built to signal capability and scale.",
    category: "Industrial Web",
    filters: ["Industrial"],
    location: "Middle East",
    color: "var(--blue)",
    image: "/assets/work/zinad.jpg",
    liveUrl: "https://zinadconcreteworks.com",
    keyMetric: "Top 3 local keyword ranking",
    description:
      "We created a robust, authority-focused platform that helped Zinad improve visibility and attract high-value contractors.",
    techStack: ["Next.js", "TypeScript", "Vercel", "Structured SEO", "CMS"],
    caseStudy: {
      overview: [
        "Zinad Concrete Works executes large-scale infrastructure projects, but its digital footprint did not reflect that level of capability. Decision-makers could not easily evaluate project depth or technical breadth.",
        "NeoKlyn designed a structured digital experience focused on portfolio proof, trust indicators, and regional SEO performance. The platform architecture made key project categories easier to discover for procurement and engineering audiences.",
        "This gave Zinad a stronger market signal online and a measurable rise in relevant inbound traffic.",
      ],
      challenge:
        "A minimal online presence, inconsistent messaging, and low discoverability were limiting exposure to large-value industrial opportunities.",
      solution:
        "We rebuilt the site with a scalable case-led content framework, optimized technical SEO for priority geographies, and introduced a clearer visual hierarchy to position Zinad as an enterprise-ready industrial partner.",
      results: [
        { metric: "Top 3", description: "Local keyword ranking" },
        { metric: "+80%", description: "International traffic growth" },
        { metric: "100", description: "Lighthouse performance score" },
      ],
    },
  },
  {
    slug: "travex-ventures",
    client: "Travex Ventures",
    title: "Scaling a Travel Brand with Immersive Storytelling",
    tagline: "A high-conversion travel experience blending rich visuals with fast interactions.",
    category: "Travel · 3D Experience",
    filters: ["Travel", "3D"],
    location: "India",
    color: "var(--violet)",
    image: "/assets/work/travex.png",
    liveUrl: "https://travexventures.com",
    keyMetric: "+110% booking inquiries",
    description:
      "We transformed Travex into an immersive digital destination that improved engagement and boosted conversion intent.",
    techStack: ["Next.js", "GSAP", "WebGL", "Node.js", "PostgreSQL"],
    caseStudy: {
      overview: [
        "Travex Ventures needed to stand apart in a crowded market where most travel sites looked and behaved the same. Their previous funnel failed to maintain user attention long enough to drive meaningful inquiries.",
        "NeoKlyn introduced an immersive, motion-rich visual system and restructured the conversion journey for faster decision-making. We balanced expressive storytelling with a performance-first implementation to keep interaction smooth.",
        "The new platform delivered stronger engagement signals and a sharp lift in inquiry intent across core offerings.",
      ],
      challenge:
        "Needed a premium web presence that matched their luxury brand positioning.",
      solution:
        "GSAP 3D animations, custom WebGL effects, performance-optimized delivery.",
      results: [
        { metric: "+110%", description: "Increase in luxury booking inquiries" },
        { metric: "Immersive", description: "GSAP 3D animations & WebGL" },
        { metric: "99.9%", description: "Platform uptime" },
      ],
    },
    seoTitle: "Travex Ventures Case Study — NeoKlyn",
    seoDescription: "Immersive 3D travel experiences that boosted luxury bookings by 110%.",
  },
  {
    slug: "lpsm-pvt-ltd",
    client: "LPSM Pvt Ltd",
    title: "Modernizing Manufacturing Operations with Zero Downtime",
    tagline: "A serverless migration that upgraded operations without disrupting production.",
    category: "Manufacturing · Enterprise",
    filters: ["Manufacturing"],
    location: "India",
    color: "var(--cyan)",
    image: "/assets/work/zinad.jpg",
    liveUrl: "https://lpsm.in",
    keyMetric: "Zero-downtime migration",
    description:
      "We migrated LPSM from legacy systems to a modern edge-ready platform, improving reliability and operational visibility.",
    techStack: ["Next.js", "TypeScript", "Serverless", "Node APIs", "Monitoring"],
    caseStudy: {
      overview: [
        "LPSM operated on monolithic legacy systems that were expensive to maintain and risky to change. Operational dashboards were fragmented, and updates frequently introduced downtime.",
        "NeoKlyn planned and executed a phased migration strategy to a serverless architecture without interrupting core workflows. We introduced a new operational interface designed for day-to-day manufacturing visibility.",
        "The transformation gave LPSM a more resilient platform, clearer operational control, and improved cost efficiency at scale.",
      ],
      challenge:
        "Frequent service interruptions and rigid legacy tooling were slowing teams down and increasing operational risk during every release cycle.",
      solution:
        "We delivered a zero-downtime cutover to a modern Next.js and serverless stack, built a streamlined operations dashboard, and introduced release-safe deployment workflows backed by monitoring.",
      results: [
        { metric: "0", description: "Downtime during migration" },
        { metric: "Modern", description: "Unified ops interface" },
        { metric: "-32%", description: "Infra cost optimization" },
      ],
    },
  },
];

export const projectsBySlug = projects.reduce<Record<string, Project>>((acc, project) => {
  acc[project.slug] = project;
  return acc;
}, {});
