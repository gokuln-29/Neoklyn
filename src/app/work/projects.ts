export type ProjectFilter = "Web" | "3D" | "Travel" | "Industrial" | "Manufacturing" | "Ecommerce";

export interface ProjectResult {
  metric: string;
  description: string;
}

export interface ProjectCaseStudy {
  overview: string[];
  challenge: string;
  solution: string;
  results: ProjectResult[];
  /** Heading for the results block. Defaults to "Results"; use "Highlights" when no measured results are published. */
  resultsHeading?: string;
  /**
   * How the results were measured, shown under the results block, e.g.
   * "Measured by the client over the 3 months after launch, from their
   * analytics." Add one only when it is true and you can back it up.
   */
  resultsNote?: string;
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
  "Ecommerce",
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
    image: "/assets/work/dwarka.webp",
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
    image: "/assets/work/Aathithyan.webp",
    liveUrl: "https://aathithyan.com",
    keyMetric: "Pixel-perfect luxury positioning",
    seoDescription: "How NeoKlyn designed a fast, premium brand website for Aathithyan, a luxury brand in India, with 95+ Lighthouse scores.",
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
    image: "/assets/work/zinad.webp",
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
    image: "/assets/work/travex.webp",
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
    seoDescription: "How NeoKlyn built an immersive 3D travel website for Travex Ventures that boosted luxury booking inquiries by 110%.",
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
    image: "/assets/work/lpsmpvtltd.webp",
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
  {
    slug: "sharon-physio",
    client: "Sharon Physio",
    title: "A Booking-First Website for a Growing Physiotherapy Clinic",
    tagline: "A clean, trust-building clinic website engineered to turn visitors into booked appointments.",
    category: "Physiotherapy Clinic",
    filters: ["Web"],
    location: "Madurai, Tamil Nadu, India",
    color: "var(--blue)",
    image: "/assets/work/sharon-physio.webp",
    liveUrl: "https://sharonphysio.com/",
    keyMetric: "+30% booking inquiries",
    description:
      "We rebuilt Sharon Physio's online presence into a fast, credible clinic website with a frictionless appointment booking flow.",
    techStack: ["Next.js", "TypeScript", "Tailwind CSS", "Vercel"],
    caseStudy: {
      overview: [
        "Sharon Physio had strong local trust and clinical expertise, but their old website made it difficult for new patients to understand services or book an appointment, especially on mobile.",
        "NeoKlyn redesigned the site around one goal: getting a visitor from 'searching for a physiotherapist' to 'booked appointment' in as few steps as possible. We simplified the service pages, added clear calls to action, and built a clean, mobile-first layout that reflects the clinic's professionalism.",
        "The result was a website that felt as trustworthy as the clinic itself, with a noticeable lift in patients reaching out to book care.",
      ],
      challenge:
        "An outdated, hard-to-navigate website that made it difficult for prospective patients to find services or book appointments, especially on mobile.",
      solution:
        "A fast, mobile-first Next.js rebuild with clear service pages, streamlined appointment CTAs, and a trust-focused design suited to a healthcare practice.",
      results: [
        { metric: "+30%", description: "Increase in booking inquiries" },
        { metric: "Mobile-first", description: "Fully responsive patient experience" },
        { metric: "Faster", description: "Page loads and appointment flow" },
      ],
    },
    seoTitle: "Sharon Physio Case Study — NeoKlyn",
    seoDescription: "How NeoKlyn redesigned a physiotherapy clinic website to increase booking inquiries by 30%.",
  },
  {
    slug: "athira-flowers",
    client: "Athira Flowers",
    title: "An Online Flower Shop with a Built-In CRM for a Dubai Florist",
    tagline: "A fast online store for ordering hand bouquets in Dubai, connected to a CRM.",
    category: "Ecommerce · Flower Delivery",
    filters: ["Web", "Ecommerce"],
    location: "Dubai, UAE",
    color: "var(--cyan)",
    image: "/assets/work/athira-flowers.webp",
    liveUrl: "https://athiraflowers.ae",
    keyMetric: "Online store with a CRM, live in Dubai",
    seoDescription:
      "How NeoKlyn built an online flower shop with a CRM for Athira Flowers, a Dubai florist delivering across Dubai, Abu Dhabi and Sharjah.",
    description:
      "We built Athira Flowers' online shop for ordering hand bouquets and single flowers in Dubai, Abu Dhabi and Sharjah, together with a CRM to manage customers.",
    techStack: ["Next.js", "Custom storefront", "CRM"],
    caseStudy: {
      overview: [
        "Athira Flowers sells fresh hand bouquets and single flowers for delivery across Dubai, Abu Dhabi and Sharjah, with customised bouquets available on request. For a business like this, the website has to make choosing and ordering flowers quick on a phone, and give customers clear delivery information before they pay.",
        "NeoKlyn built the online shop around that: a clean storefront with three clear categories (Athira Special, Hand Bouquets and Single Flowers), product search, a cart and customer accounts, with prices in AED. Delivery, returns, contact and policy pages sit alongside it, and a WhatsApp chat button gives customers a fast way to ask questions or request a custom bouquet.",
        "Behind the storefront, a CRM helps the business keep track of its customers, so the shop is not just a catalogue but the start of a relationship with each buyer.",
      ],
      challenge:
        "A flower business needs customers to find the right bouquet and order quickly on a phone, with clear delivery and returns information, and a way to keep track of those customers afterwards.",
      solution:
        "A fast Next.js storefront with product categories, search, cart and customer accounts in AED, delivery and returns pages, WhatsApp chat and a cookie choice that lets visitors decline, connected to a CRM.",
      resultsHeading: "Highlights",
      results: [
        { metric: "3-4 hrs", description: "Delivery window promoted across Dubai, Abu Dhabi and Sharjah" },
        { metric: "AED", description: "Dirham pricing with a cart and customer accounts" },
        { metric: "Store + CRM", description: "An online shop with customer management behind it" },
      ],
      resultsNote:
        "The delivery window is Athira Flowers' own service promise, as shown on their site. Performance figures for this project have not been published.",
    },
    seoTitle: "Athira Flowers Ecommerce Case Study — NeoKlyn",
  },
  {
    slug: "neoklyn-shop",
    client: "NeoKlyn Shop",
    title: "NeoKlyn's Own Ecommerce Store, Live as a Demo",
    tagline: "A multilingual storefront we built as our own product, so you can try it before you commit.",
    category: "Ecommerce · NeoKlyn Product",
    filters: ["Web", "Ecommerce"],
    location: "India (live demo)",
    color: "var(--violet)",
    image: "/assets/work/neoklyn-shop.webp",
    liveUrl: "https://shop.neoklyn.com/en",
    keyMetric: "Live demo in English, Tamil and Kannada",
    seoDescription:
      "Try NeoKlyn Shop, our own multilingual ecommerce storefront, as a live demo store with categories, search, cart, accounts and promotions.",
    description:
      "NeoKlyn Shop is our own ecommerce storefront, running as a live demo store with clothing, food and electronics so you can use a real store before commissioning one.",
    techStack: ["Next.js", "Multilingual", "Cart & accounts"],
    caseStudy: {
      overview: [
        "NeoKlyn Shop is the ecommerce product we built ourselves. It runs as a demo store: orders and payments are not real, and the site says so at the top of every page, so you can click through a full shopping experience without any risk.",
        "It shows what a NeoKlyn store can include: categories for clothing, food and electronics, product search, a cart, customer accounts with order history, promotions such as free delivery above ₹999 and a discount code, and a language switcher for English, Tamil and Kannada.",
        "If you are deciding between a custom store and a template, this is the quickest way to see how ours feels on a phone and in your customers' own language before you commit.",
      ],
      challenge:
        "Small businesses selling online in India need a store that works in their customers' languages and feels fast on a phone, but it is hard to judge an ecommerce build from screenshots alone.",
      solution:
        "A Next.js storefront with product categories, search, cart, customer accounts and order history, promotions, and a language switcher for English, Tamil and Kannada, published as a live demo you can try.",
      resultsHeading: "What's in the demo",
      results: [
        { metric: "3", description: "Languages: English, Tamil and Kannada" },
        { metric: "3", description: "Product categories: clothing, food and electronics" },
        { metric: "Demo", description: "No real orders or payments, so it is safe to try" },
      ],
      resultsNote:
        "This is NeoKlyn's own product demo, not a client project, so there are no client results to report.",
    },
    seoTitle: "NeoKlyn Shop: Live Ecommerce Demo — NeoKlyn",
  },
];

export const projectsBySlug = projects.reduce<Record<string, Project>>((acc, project) => {
  acc[project.slug] = project;
  return acc;
}, {});
