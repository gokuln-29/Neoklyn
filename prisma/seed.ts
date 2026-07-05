import "dotenv/config";
import { PrismaClient, PostStatus } from "@prisma/client";
import { PrismaPg } from "@prisma/adapter-pg";
import bcrypt from "bcryptjs";

const adapter = new PrismaPg({ connectionString: process.env.DATABASE_URL! });
const prisma = new PrismaClient({ adapter });

// ─── Category seed data ─────────────────────────────────
const categories = [
  { name: "AI Agents & Automation", slug: "ai-agents", color: "#06B6D4", icon: "🤖" },
  { name: "Generative AI", slug: "gen-ai", color: "#7C3AED", icon: "✨" },
  { name: "Web Design & Development", slug: "web-development", color: "#06B6D4", icon: "🌐" },
  { name: "Mobile Apps", slug: "mobile-apps", color: "#3B82F6", icon: "📱" },
  { name: "Ecommerce", slug: "ecommerce", color: "#10b981", icon: "🛒" },
  { name: "3D & Immersive", slug: "3d-immersive", color: "#3B82F6", icon: "🎮" },
  { name: "Digital Marketing", slug: "digital-marketing", color: "#f59e0b", icon: "📈" },
  { name: "UI/UX & Branding", slug: "ui-ux-branding", color: "#7C3AED", icon: "🎨" },
  { name: "Machine Learning", slug: "machine-learning", color: "#06B6D4", icon: "🧠" },
  { name: "Tutorials", slug: "tutorials", color: "#3B82F6", icon: "📚" },
  { name: "Case Studies", slug: "case-studies", color: "#10b981", icon: "📋" },
  { name: "News", slug: "news", color: "#f59e0b", icon: "📰" },
];

// ─── Tag seed data ──────────────────────────────────────
const tags = [
  "GPT", "Claude", "Gemini", "LangGraph", "LangChain",
  "MCP", "RAG", "LLM", "AI Workflow", "AI Automation",
  "Next.js", "React", "TypeScript", "Node.js", "Python",
  "OpenAI", "Anthropic", "Google AI", "Prisma", "PostgreSQL",
  "SEO", "Performance", "UI Design", "Tailwind CSS", "Vercel",
];

async function main() {
  console.log("🌱 Starting seed...");

  // ─── Create Admin User ───────────────────────────────
  const hashedPassword = await bcrypt.hash("admin123", 12);

  const admin = await prisma.user.upsert({
    where: { email: "admin@neoklyn.com" },
    update: {},
    create: {
      email: "admin@neoklyn.com",
      name: "NeoKlyn Admin",
      password: hashedPassword,
      role: "ADMIN",
      bio: "NeoKlyn CMS Administrator",
    },
  });
  console.log(`✅ Admin user created: ${admin.email}`);

  // ─── Create Categories ───────────────────────────────
  for (let i = 0; i < categories.length; i++) {
    const cat = categories[i];
    await prisma.category.upsert({
      where: { slug: cat.slug },
      update: {},
      create: {
        name: cat.name,
        slug: cat.slug,
        color: cat.color,
        icon: cat.icon,
        sortOrder: i,
      },
    });
  }
  console.log(`✅ ${categories.length} categories created`);

  // ─── Create Tags ─────────────────────────────────────
  for (const tagName of tags) {
    const slug = tagName.toLowerCase().replace(/[^a-z0-9]+/g, "-").replace(/(^-|-$)/g, "");
    await prisma.tag.upsert({
      where: { slug },
      update: {},
      create: { name: tagName, slug },
    });
  }
  console.log(`✅ ${tags.length} tags created`);

  // ─── Seed Site Settings ──────────────────────────────
  const settings = [
    {
      key: "site_name",
      value: "NeoKlyn",
      group: "GENERAL" as const,
      label: "Site Name",
    },
    {
      key: "site_tagline",
      value: "AI Agency & Web Development Studio",
      group: "GENERAL" as const,
      label: "Tagline",
    },
    {
      key: "site_email",
      value: "hello@neoklyn.com",
      group: "GENERAL" as const,
      label: "Contact Email",
    },
    {
      key: "site_phone",
      value: "+916380202766",
      group: "GENERAL" as const,
      label: "Phone Number",
    },
    {
      key: "google_analytics_id",
      value: "G-C9FYRR791J",
      group: "SEO" as const,
      label: "Google Analytics ID",
    },
    {
      key: "gtm_id",
      value: "GTM-K4425M6M",
      group: "SEO" as const,
      label: "Google Tag Manager ID",
    },
    {
      key: "google_verification",
      value: "eae07f2fdc2af551",
      group: "SEO" as const,
      label: "Google Site Verification",
    },
    {
      key: "social_github",
      value: "https://github.com/neoklyn",
      group: "SOCIAL" as const,
      label: "GitHub",
    },
    {
      key: "social_linkedin",
      value: "https://www.linkedin.com/company/neoklyn",
      group: "SOCIAL" as const,
      label: "LinkedIn",
    },
    {
      key: "social_twitter",
      value: "https://twitter.com/neoklyn",
      group: "SOCIAL" as const,
      label: "Twitter/X",
    },
    {
      key: "social_dribbble",
      value: "https://dribbble.com/neoklyn",
      group: "SOCIAL" as const,
      label: "Dribbble",
    },
  ];

  for (const setting of settings) {
    await prisma.siteSetting.upsert({
      where: { key: setting.key },
      update: {},
      create: {
        key: setting.key,
        value: JSON.parse(JSON.stringify(setting.value)),
        group: setting.group,
        label: setting.label,
      },
    });
  }
  console.log(`✅ ${settings.length} site settings created`);

  // ─── Seed sample blog posts ──────────────────────────
  const samplePosts = [
    {
      title: "Why UAE Businesses Need a Custom Web Platform in 2025",
      slug: "uae-custom-web-platform-2025",
      excerpt: "Generic templates won't cut it in the UAE market. Discover why custom web development is the differentiator that drives real business growth in 2025.",
      categorySlug: "web-development",
      readTime: "7 min read",
      status: PostStatus.PUBLISHED,
      content: {
        type: "doc",
        content: [
          { type: "heading", attrs: { level: 2 }, content: [{ type: "text", text: "The Template Problem" }] },
          { type: "paragraph", content: [{ type: "text", text: "Every business that launched in the last five years using a template-driven builder has the same problem: their website looks like everyone else's. In a market where trust and premium positioning drive purchasing decisions, blending in is the first step toward being ignored." }] },
          { type: "heading", attrs: { level: 2 }, content: [{ type: "text", text: "Trust and Credibility" }] },
          { type: "paragraph", content: [{ type: "text", text: "For B2B enterprises in the UAE, your website is often the first interaction a prospect has with your brand. A custom platform signals investment, attention to detail, and operational excellence." }] },
          { type: "heading", attrs: { level: 2 }, content: [{ type: "text", text: "Performance as a Feature" }] },
          { type: "paragraph", content: [{ type: "text", text: "Custom development allows complete control over performance optimization. Our UAE clients achieve sub-1-second load times, mobile-first interactions, and Core Web Vitals scores consistently above 95." }] },
        ],
      },
      seoTitle: "Why UAE Businesses Need Custom Web Development in 2025",
      metaDescription: "Why UAE businesses need custom web platforms in 2025. Learn how bespoke development drives growth, trust, and competitive advantage in the Middle East market.",
      focusKeyword: "web development agency Dubai",
    },
    {
      title: "How AI Agents Are Transforming Business Operations in India",
      slug: "ai-agents-business-operations-india",
      excerpt: "AI agents are moving beyond hype into production. Learn how Indian enterprises are automating workflows and achieving 3-5x ROI with autonomous AI systems.",
      categorySlug: "ai-agents",
      readTime: "8 min read",
      status: PostStatus.PUBLISHED,
      content: {
        type: "doc",
        content: [
          { type: "heading", attrs: { level: 2 }, content: [{ type: "text", text: "The AI Agent Revolution" }] },
          { type: "paragraph", content: [{ type: "text", text: "Traditional automation could only handle rule-based, repetitive tasks. AI agents bring reasoning, context awareness, and adaptive decision-making to automation." }] },
          { type: "heading", attrs: { level: 2 }, content: [{ type: "text", text: "What Agents Actually Do" }] },
          { type: "paragraph", content: [{ type: "text", text: "Current production deployments include: customer support triage and resolution, sales lead qualification and follow-up, document processing and data extraction, ERP workflow automation, and financial reporting." }] },
          { type: "heading", attrs: { level: 2 }, content: [{ type: "text", text: "ROI Benchmarks" }] },
          { type: "paragraph", content: [{ type: "text", text: "Based on our deployments: 40-60% reduction in manual task completion time, 70% faster customer response times, 85% accuracy on document processing, and 3-5x ROI within the first year." }] },
        ],
      },
      seoTitle: "How AI Agents Transform Business Operations in India | NeoKlyn",
      metaDescription: "How AI agents are transforming business operations in India. Discover real-world automation use cases and ROI benchmarks for enterprise deployment.",
      focusKeyword: "AI agents for business India",
    },
    {
      title: "Headless Shopify vs WooCommerce: Which Wins for D2C Brands",
      slug: "headless-shopify-vs-woocommerce-d2c",
      excerpt: "D2C brands face a critical platform decision. Compare Headless Shopify and WooCommerce across performance, flexibility, and total cost of ownership.",
      categorySlug: "ecommerce",
      readTime: "6 min read",
      status: PostStatus.PUBLISHED,
      content: {
        type: "doc",
        content: [
          { type: "heading", attrs: { level: 2 }, content: [{ type: "text", text: "The Architecture Difference" }] },
          { type: "paragraph", content: [{ type: "text", text: "Headless Shopify separates the front-end from the back-end. You build your store UI using any framework while Shopify handles transactions, inventory, and orders." }] },
          { type: "heading", attrs: { level: 2 }, content: [{ type: "text", text: "Performance Comparison" }] },
          { type: "paragraph", content: [{ type: "text", text: "Headless Shopify typically scores 90+ on Core Web Vitals out of the box. WooCommerce performance depends heavily on hosting, caching, and optimization expertise." }] },
        ],
      },
      seoTitle: "Headless Shopify vs WooCommerce for D2C Brands | NeoKlyn",
      metaDescription: "Headless Shopify vs WooCommerce comparison for D2C brands. Learn which platform delivers better performance, flexibility, and ROI for your ecommerce business.",
      focusKeyword: "ecommerce development agency",
    },
  ];

  for (const post of samplePosts) {
    const category = await prisma.category.findUnique({
      where: { slug: post.categorySlug },
    });

    const existingPost = await prisma.post.findUnique({
      where: { slug: post.slug },
    });

    if (!existingPost) {
      const created = await prisma.post.create({
        data: {
          title: post.title,
          slug: post.slug,
          excerpt: post.excerpt,
          content: post.content,
          contentHtml: "", // Will be rendered by Tiptap in Phase 3
          status: post.status,
          readTime: post.readTime,
          publishedAt: post.status === PostStatus.PUBLISHED ? new Date() : null,
          authorId: admin.id,
          categoryId: category?.id,
          seoMetadata: {
            create: {
              seoTitle: post.seoTitle,
              metaDescription: post.metaDescription,
              focusKeyword: post.focusKeyword,
              canonicalUrl: `https://neoklyn.com/blog/${post.slug}`,
              robots: "index, follow",
              twitterCard: "summary_large_image",
            },
          },
        },
      });
      console.log(`  📝 Post: ${created.title}`);
    }
  }
  console.log(`✅ Sample posts seeded`);

  console.log("\n🎉 Seed complete!");
}

main()
  .catch((e) => {
    console.error("❌ Seed error:", e);
    process.exit(1);
  })
  .finally(() => {
    prisma.$disconnect();
  });
