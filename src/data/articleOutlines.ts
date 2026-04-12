export type ArticleOutlineSeed = {
  title: string;
  primaryKeyword: string;
  targetSections: string[];
};

export const articleOutlineSeeds: ArticleOutlineSeed[] = [
  {
    title: "Building AI Agents with LangChain: A Practical Guide",
    primaryKeyword: "langchain ai agent tutorial",
    targetSections: [
      "What are AI Agents",
      "LangChain Architecture",
      "Building Your First Agent",
      "RAG Integration",
      "Multi-Agent Systems",
      "Production Deployment",
      "NeoKlyn's Approach",
    ],
  },
  {
    title: "Next.js 15 vs Remix in 2026: Which Should You Choose?",
    primaryKeyword: "nextjs vs remix 2026",
    targetSections: [
      "Architecture Comparison",
      "Server Components vs Loaders",
      "Performance Benchmarks",
      "DX and Ecosystem",
      "When to Choose Each",
      "Our Recommendation",
    ],
  },
  {
    title: "How We Built a B2B Platform Handling 10K Daily RFQs",
    primaryKeyword: "b2b platform development",
    targetSections: [
      "The Challenge",
      "Architecture Decisions",
      "Real-time RFQ Engine",
      "Search and Filtering",
      "Performance at Scale",
      "Results and Metrics",
    ],
  },
  {
    title: "Real Cost of Building a Mobile App: India vs UK",
    primaryKeyword: "mobile app development cost india",
    targetSections: [
      "Cost Breakdown",
      "India Market Rates",
      "UK Market Rates",
      "Quality Comparison",
      "Hidden Costs",
      "How to Choose a Partner",
    ],
  },
  {
    title: "What is RAG and Why Every Enterprise Needs It",
    primaryKeyword: "RAG enterprise ai",
    targetSections: [
      "What is RAG",
      "How RAG Works",
      "Vector Databases",
      "Enterprise Use Cases",
      "Implementation Guide",
      "ROI of RAG",
    ],
  },
  {
    title: "GSAP + Three.js: Building 3D Websites That Convert",
    primaryKeyword: "3d website development gsap",
    targetSections: [
      "Why 3D Matters",
      "Three.js Fundamentals",
      "GSAP ScrollTrigger",
      "Performance Optimization",
      "Conversion Impact",
      "Case Study",
    ],
  },
];
