import { BlogPost } from "@/types/blog";

// Legacy static posts removed — they contained fabricated client claims and
// invented performance stats with no real case study backing. New content
// going forward comes from the automated pipeline (src/app/api/pipeline/posts)
// and the honest, verifiable pieces described in the trust-first content plan
// (real pricing guide, real case studies, decision guides).
export const blogPosts: BlogPost[] = [];

export function getPostBySlug(slug: string): BlogPost | undefined {
  return blogPosts.find((p) => p.slug === slug);
}

export function getAllCategories(): { name: string; slug: string; color: string }[] {
  const seen = new Set<string>();
  return blogPosts.reduce((acc, p) => {
    if (!seen.has(p.categorySlug)) {
      seen.add(p.categorySlug);
      acc.push({ name: p.category, slug: p.categorySlug, color: p.color });
    }
    return acc;
  }, [] as { name: string; slug: string; color: string }[]);
}
