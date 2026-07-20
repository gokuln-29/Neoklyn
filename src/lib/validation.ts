import { z } from "zod";

// ─── Post Schemas ───────────────────────────────────────

export const createPostSchema = z.object({
  title: z.string().min(1, "Title is required").max(200),
  slug: z
    .string()
    .min(1, "Slug is required")
    .max(200)
    .regex(/^[a-z0-9]+(?:-[a-z0-9]+)*$/, "Slug must be lowercase, alphanumeric, with hyphens"),
  excerpt: z.string().max(500).optional(),
  content: z.any().optional(), // Tiptap JSON
  contentHtml: z.string().optional(),
  featuredImage: z.string().url().optional().or(z.literal("")),
  status: z.enum(["DRAFT", "PUBLISHED", "SCHEDULED", "ARCHIVED"]).default("DRAFT"),
  publishedAt: z.string().datetime().optional().nullable(),
  scheduledAt: z.string().datetime().optional().nullable(),
  readTime: z.string().optional(),
  categoryId: z.string().optional().nullable(),
  tagIds: z.array(z.string()).optional(),
  seo: z
    .object({
      seoTitle: z.string().max(70).optional(),
      metaDescription: z.string().max(170).optional(),
      canonicalUrl: z.string().url().optional().or(z.literal("")),
      focusKeyword: z.string().max(100).optional(),
      keywords: z.array(z.string()).optional(),
      robots: z.string().optional(),
      ogTitle: z.string().max(100).optional(),
      ogDescription: z.string().max(200).optional(),
      ogImage: z.string().url().optional().or(z.literal("")),
      twitterCard: z.string().optional(),
    })
    .optional(),
});

export const updatePostSchema = createPostSchema.partial();

// ─── Category Schemas ───────────────────────────────────

export const createCategorySchema = z.object({
  name: z.string().min(1, "Name is required").max(100),
  slug: z
    .string()
    .min(1, "Slug is required")
    .max(100)
    .regex(/^[a-z0-9]+(?:-[a-z0-9]+)*$/, "Invalid slug format"),
  description: z.string().max(500).optional(),
  color: z.string().regex(/^#[0-9a-fA-F]{6}$/).optional(),
  icon: z.string().max(10).optional(),
  sortOrder: z.number().int().optional(),
});

export const updateCategorySchema = createCategorySchema.partial();

// ─── Tag Schemas ────────────────────────────────────────

export const createTagSchema = z.object({
  name: z.string().min(1, "Name is required").max(100),
  slug: z
    .string()
    .min(1, "Slug is required")
    .max(100)
    .regex(/^[a-z0-9]+(?:-[a-z0-9]+)*$/, "Invalid slug format"),
  description: z.string().max(500).optional(),
});

export const updateTagSchema = createTagSchema.partial();

// ─── Lead Schemas ───────────────────────────────────────

export const createLeadSchema = z.object({
  type: z.enum(["CONTACT", "CONSULTATION", "NEWSLETTER", "AI_DEMO", "PDF_DOWNLOAD", "AUDIT_QUIZ"]),
  name: z.string().max(200).optional(),
  email: z.string().email("Valid email is required"),
  phone: z.string().max(20).optional(),
  company: z.string().max(200).optional(),
  message: z.string().max(5000).optional(),
  source: z.string().max(200).optional(),
  segment: z.enum(["hot", "warm", "cold"]).optional(),
  metadata: z.any().optional(),
});

export const updateLeadStatusSchema = z.object({
  status: z.enum(["NEW", "CONTACTED", "QUALIFIED", "NURTURING", "BOOKED", "CLOSED"]),
});

// ─── Auth Schemas ───────────────────────────────────────

export const loginSchema = z.object({
  email: z.string().email("Valid email is required"),
  password: z.string().min(6, "Password must be at least 6 characters"),
});

export const changePasswordSchema = z.object({
  currentPassword: z.string().min(6),
  newPassword: z.string().min(8, "New password must be at least 8 characters"),
  confirmPassword: z.string(),
}).refine((data) => data.newPassword === data.confirmPassword, {
  message: "Passwords don't match",
  path: ["confirmPassword"],
});

// ─── Settings Schemas ───────────────────────────────────

export const updateSettingSchema = z.object({
  key: z.string().min(1),
  value: z.unknown(),
  group: z.enum(["GENERAL", "SEO", "SOCIAL", "FOOTER", "NAV", "HOMEPAGE"]).optional(),
  label: z.string().optional(),
});

// ─── Newsletter Schema ─────────────────────────────────

export const subscribeNewsletterSchema = z.object({
  email: z.string().email("Valid email is required"),
  name: z.string().max(200).optional(),
});

// ─── Utility: Generate slug from title ──────────────────

export function generateSlug(title: string): string {
  return title
    .toLowerCase()
    .replace(/[^a-z0-9\s-]/g, "")
    .replace(/\s+/g, "-")
    .replace(/-+/g, "-")
    .replace(/(^-|-$)/g, "")
    .slice(0, 200);
}

// ─── Utility: Calculate reading time ────────────────────

export function calculateReadTime(text: string): string {
  const wordsPerMinute = 200;
  const wordCount = text.split(/\s+/).filter(Boolean).length;
  const minutes = Math.ceil(wordCount / wordsPerMinute);
  return `${minutes} min read`;
}
