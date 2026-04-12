import {
  blogPosts,
  getAllCategories,
  getPostBySlug,
  type BlogPost,
} from "@/data/blogPosts";
import {
  getMdxInsightPostBySlug,
  getMdxInsightSummaries,
  type MdxInsightPost,
  type MdxInsightSummary,
} from "@/lib/mdxInsights";

export type InsightSummary = {
  source: "ts" | "mdx";
  title: string;
  slug: string;
  category: string;
  categorySlug: string;
  date: string;
  readTime: string;
  author: string;
  color: string;
  excerpt: string;
  metaDescription: string;
};

export type InsightDetail =
  | { source: "ts"; post: BlogPost }
  | { source: "mdx"; post: MdxInsightPost };

type CategoryFilter = {
  label: string;
  slug: string;
};

const CATEGORY_LABELS: Record<string, string> = {
  "web-development": "Web Dev",
  "ai-agents": "AI Agents",
  "gen-ai": "Gen AI",
  "mobile-apps": "Mobile",
  ecommerce: "Ecommerce",
  "3d-immersive": "3D",
  "digital-marketing": "Marketing",
  "ui-ux-branding": "UI/UX",
};

const CATEGORY_ORDER = [
  "web-development",
  "ai-agents",
  "gen-ai",
  "mobile-apps",
  "ecommerce",
  "3d-immersive",
  "digital-marketing",
  "ui-ux-branding",
];

function parseDateSafely(dateText: string) {
  const parsed = Date.parse(dateText);
  if (Number.isNaN(parsed)) return 0;
  return parsed;
}

function toSummary(post: BlogPost): InsightSummary {
  return {
    source: "ts",
    title: post.title,
    slug: post.slug,
    category: post.category,
    categorySlug: post.categorySlug,
    date: post.date,
    readTime: post.readTime,
    author: post.author,
    color: post.color,
    excerpt: post.excerpt,
    metaDescription: post.metaDescription,
  };
}

function toMdxSummary(post: MdxInsightSummary): InsightSummary {
  return {
    source: "mdx",
    title: post.title,
    slug: post.slug,
    category: post.category,
    categorySlug: post.categorySlug,
    date: post.date,
    readTime: post.readTime,
    author: post.author,
    color: post.color,
    excerpt: post.excerpt,
    metaDescription: post.metaDescription,
  };
}

export async function getAllInsightSummaries(): Promise<InsightSummary[]> {
  const tsPosts = blogPosts.map(toSummary);
  const mdxPosts = (await getMdxInsightSummaries()).map(toMdxSummary);

  return [...tsPosts, ...mdxPosts].sort(
    (a, b) => parseDateSafely(b.date) - parseDateSafely(a.date)
  );
}

export async function getInsightBySlug(slug: string): Promise<InsightDetail | undefined> {
  const tsPost = getPostBySlug(slug);
  if (tsPost) {
    return {
      source: "ts",
      post: tsPost,
    };
  }

  const mdxPost = await getMdxInsightPostBySlug(slug);
  if (mdxPost) {
    return {
      source: "mdx",
      post: mdxPost,
    };
  }

  return undefined;
}

export async function getRelatedInsightSummaries(
  currentSlug: string,
  categorySlug: string,
  count = 3
): Promise<InsightSummary[]> {
  const allPosts = await getAllInsightSummaries();
  return allPosts
    .filter((post) => post.slug !== currentSlug && post.categorySlug === categorySlug)
    .slice(0, count);
}

export async function getInsightFilterCategories(): Promise<CategoryFilter[]> {
  const base = getAllCategories().map((category) => ({
    label: CATEGORY_LABELS[category.slug] || category.name,
    slug: category.slug,
  }));

  const mdxPosts = await getMdxInsightSummaries();
  const uniqueMdxCategorySlugs = new Set(mdxPosts.map((post) => post.categorySlug));

  const mergedBySlug = new Map<string, CategoryFilter>();
  for (const category of base) {
    mergedBySlug.set(category.slug, category);
  }

  for (const categorySlug of uniqueMdxCategorySlugs) {
    if (!mergedBySlug.has(categorySlug)) {
      mergedBySlug.set(categorySlug, {
        slug: categorySlug,
        label: CATEGORY_LABELS[categorySlug] || categorySlug,
      });
    }
  }

  const sorted = [...mergedBySlug.values()].sort((a, b) => {
    const aOrder = CATEGORY_ORDER.indexOf(a.slug);
    const bOrder = CATEGORY_ORDER.indexOf(b.slug);
    if (aOrder === -1 && bOrder === -1) return a.label.localeCompare(b.label);
    if (aOrder === -1) return 1;
    if (bOrder === -1) return -1;
    return aOrder - bOrder;
  });

  return [{ label: "All", slug: "all" }, ...sorted];
}
