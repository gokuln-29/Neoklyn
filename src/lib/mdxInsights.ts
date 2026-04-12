import path from "path";
import { promises as fs } from "fs";
import matter from "gray-matter";

export type MdxInsightPost = {
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
  primaryKeyword: string;
  secondaryKeywords: string[];
  outline: string[];
  body: string;
};

export type MdxInsightSummary = Omit<MdxInsightPost, "body">;

const CONTENT_DIR = path.join(process.cwd(), "content", "insights");

function defaultColorForCategory(categorySlug: string) {
  if (categorySlug === "web-development") return "var(--cyan)";
  if (categorySlug === "ai-agents") return "var(--cyan)";
  if (categorySlug === "gen-ai") return "var(--violet)";
  if (categorySlug === "mobile-apps") return "var(--blue)";
  if (categorySlug === "ecommerce") return "var(--violet)";
  if (categorySlug === "3d-immersive") return "var(--blue)";
  if (categorySlug === "digital-marketing") return "var(--cyan)";
  if (categorySlug === "ui-ux-branding") return "var(--violet)";
  return "var(--cyan)";
}

function inferOutlineFromContent(content: string) {
  return content
    .split("\n")
    .filter((line) => line.trim().startsWith("## "))
    .map((line) => line.replace(/^##\s+/, "").trim())
    .slice(0, 12);
}

function toStringArray(value: unknown): string[] {
  if (Array.isArray(value)) {
    return value
      .filter((item): item is string => typeof item === "string")
      .map((item) => item.trim())
      .filter(Boolean);
  }

  if (typeof value === "string") {
    return value
      .split(",")
      .map((item) => item.trim())
      .filter(Boolean);
  }

  return [];
}

async function getMdxFileNames() {
  try {
    const files = await fs.readdir(CONTENT_DIR);
    return files.filter((file) => file.endsWith(".mdx"));
  } catch {
    return [];
  }
}

function parseMdxInsight(fileName: string, fileContent: string): MdxInsightPost {
  const parsed = matter(fileContent);
  const data = parsed.data as Record<string, unknown>;
  const slug =
    (typeof data.slug === "string" && data.slug.trim()) ||
    fileName.replace(/\.mdx$/, "");
  const categorySlug =
    (typeof data.categorySlug === "string" && data.categorySlug.trim()) ||
    "web-development";

  const outline = toStringArray(data.outline);
  const inferredOutline = inferOutlineFromContent(parsed.content);

  return {
    title:
      (typeof data.title === "string" && data.title.trim()) ||
      slug
        .split("-")
        .map((token) => token.charAt(0).toUpperCase() + token.slice(1))
        .join(" "),
    slug,
    category:
      (typeof data.category === "string" && data.category.trim()) ||
      "Web Development",
    categorySlug,
    date: (typeof data.date === "string" && data.date.trim()) || "Jan 01, 2026",
    readTime:
      (typeof data.readTime === "string" && data.readTime.trim()) || "8 min read",
    author:
      (typeof data.author === "string" && data.author.trim()) || "NeoKlyn Editorial",
    color:
      (typeof data.color === "string" && data.color.trim()) ||
      defaultColorForCategory(categorySlug),
    excerpt:
      (typeof data.excerpt === "string" && data.excerpt.trim()) ||
      "New insight from NeoKlyn engineering and growth teams.",
    metaDescription:
      (typeof data.metaDescription === "string" && data.metaDescription.trim()) ||
      "Read the latest NeoKlyn insight on engineering, AI, and digital growth.",
    primaryKeyword:
      (typeof data.primaryKeyword === "string" && data.primaryKeyword.trim()) ||
      slug.replace(/-/g, " "),
    secondaryKeywords: toStringArray(data.secondaryKeywords),
    outline: outline.length ? outline : inferredOutline,
    body: parsed.content.trim(),
  };
}

export async function getMdxInsightPosts(): Promise<MdxInsightPost[]> {
  const files = await getMdxFileNames();
  const posts = await Promise.all(
    files.map(async (fileName) => {
      const filePath = path.join(CONTENT_DIR, fileName);
      const content = await fs.readFile(filePath, "utf-8");
      return parseMdxInsight(fileName, content);
    })
  );

  return posts;
}

export async function getMdxInsightPostBySlug(slug: string): Promise<MdxInsightPost | undefined> {
  const posts = await getMdxInsightPosts();
  return posts.find((post) => post.slug === slug);
}

export async function getMdxInsightSummaries(): Promise<MdxInsightSummary[]> {
  const posts = await getMdxInsightPosts();
  return posts.map((post) => ({
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
    primaryKeyword: post.primaryKeyword,
    secondaryKeywords: post.secondaryKeywords,
    outline: post.outline,
  }));
}
