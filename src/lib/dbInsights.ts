import { db } from "@/lib/db";

export type DbInsightPost = {
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
  seoTitle?: string;
  primaryKeyword: string;
  secondaryKeywords: string[];
  outline: string[];
  contentHtml: string;
  featuredImage: string | null;
};

export type DbInsightSummary = Omit<DbInsightPost, "contentHtml">;

const HEX_TO_VAR: Record<string, string> = {
  "#06B6D4": "var(--cyan)",
  "#06b6d4": "var(--cyan)",
  "#7C3AED": "var(--violet)",
  "#7c3aed": "var(--violet)",
  "#3B82F6": "var(--blue)",
  "#3b82f6": "var(--blue)",
};

function formatDate(date: Date): string {
  return date.toLocaleDateString("en-US", { month: "short", day: "numeric", year: "numeric" });
}

function extractOutline(html: string): string[] {
  const matches = html.match(/<h2[^>]*>(.*?)<\/h2>/gi) || [];
  return matches
    .map((m) => m.replace(/<[^>]+>/g, "").trim())
    .filter(Boolean)
    .slice(0, 12);
}

// Published now, or scheduled and the scheduled time has passed
function publishedWhere() {
  return {
    OR: [
      { status: "PUBLISHED" as const },
      { status: "SCHEDULED" as const, scheduledAt: { lte: new Date() } },
    ],
  };
}

type PostWithRelations = {
  title: string;
  slug: string;
  excerpt: string | null;
  contentHtml: string | null;
  featuredImage: string | null;
  publishedAt: Date | null;
  scheduledAt: Date | null;
  createdAt: Date;
  readTime: string | null;
  author: { name: string };
  category: { name: string; slug: string; color: string } | null;
  seoMetadata: { seoTitle: string | null; metaDescription: string | null; focusKeyword: string | null; keywords: string[] } | null;
};

function toDbPost(post: PostWithRelations): DbInsightPost {
  const publishDate = post.publishedAt || post.scheduledAt || post.createdAt;
  const color = post.category ? (HEX_TO_VAR[post.category.color] || "var(--cyan)") : "var(--cyan)";
  const contentHtml = post.contentHtml || "";
  return {
    title: post.title,
    slug: post.slug,
    category: post.category?.name || "Insight",
    categorySlug: post.category?.slug || "general",
    date: formatDate(publishDate),
    readTime: post.readTime || "5 min read",
    author: post.author.name,
    color,
    excerpt: post.excerpt || "",
    metaDescription: post.seoMetadata?.metaDescription || post.excerpt || "",
    seoTitle: post.seoMetadata?.seoTitle || undefined,
    primaryKeyword: post.seoMetadata?.focusKeyword || "",
    secondaryKeywords: post.seoMetadata?.keywords || [],
    outline: extractOutline(contentHtml),
    contentHtml,
    featuredImage: post.featuredImage,
  };
}

const RELATION_INCLUDE = {
  author: { select: { name: true } },
  category: { select: { name: true, slug: true, color: true } },
  seoMetadata: { select: { seoTitle: true, metaDescription: true, focusKeyword: true, keywords: true } },
} as const;

export async function getDbInsightSummaries(): Promise<DbInsightSummary[]> {
  try {
    const posts = await db.post.findMany({
      where: publishedWhere(),
      orderBy: { publishedAt: "desc" },
      include: RELATION_INCLUDE,
    });
    return posts.map((p) => {
      const full = toDbPost(p);
      // Drop contentHtml from summaries to keep list payloads small
      const { contentHtml: _contentHtml, ...summary } = full;
      return summary;
    });
  } catch (error) {
    // Database unavailable (e.g. during build without DB) — degrade gracefully
    console.error("getDbInsightSummaries failed:", error);
    return [];
  }
}

export async function getDbInsightPostBySlug(slug: string): Promise<DbInsightPost | undefined> {
  try {
    const post = await db.post.findFirst({
      where: { slug, ...publishedWhere() },
      include: RELATION_INCLUDE,
    });
    if (!post) return undefined;
    return toDbPost(post);
  } catch (error) {
    console.error("getDbInsightPostBySlug failed:", error);
    return undefined;
  }
}

/** Increment view counter (fire-and-forget from the page) */
export async function incrementPostViews(slug: string): Promise<void> {
  try {
    await db.post.updateMany({ where: { slug }, data: { views: { increment: 1 } } });
  } catch {
    // non-critical
  }
}
