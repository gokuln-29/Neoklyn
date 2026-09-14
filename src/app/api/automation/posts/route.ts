import { NextRequest, NextResponse } from "next/server";
import { db } from "@/lib/db";
import { handleApiError } from "@/lib/adminApi";
import { calculateReadTime, generateSlug } from "@/lib/validation";
import { logAudit } from "@/lib/audit";
import { z } from "zod";

// POST /api/automation/posts — create a DRAFT post from a scheduled content job.
//
// This route is intentionally separate from /api/admin/posts: it authenticates
// with a static bearer token (AUTOMATION_API_KEY) instead of an admin session,
// so scheduled automation never needs a real admin password. It always creates
// posts as DRAFT, regardless of what the caller sends — publishing stays a
// deliberate human action in the CMS, not something automation can trigger.

const automationPostSchema = z.object({
  title: z.string().min(1).max(200),
  slug: z
    .string()
    .min(1)
    .max(200)
    .regex(/^[a-z0-9]+(?:-[a-z0-9]+)*$/, "Slug must be lowercase, alphanumeric, with hyphens"),
  excerpt: z.string().max(500).optional(),
  contentHtml: z.string().min(1),
  featuredImage: z.string().url().optional().or(z.literal("")),
  categorySlug: z.string().optional(),
  tagNames: z.array(z.string()).optional(),
  seo: z
    .object({
      seoTitle: z.string().max(70).optional(),
      metaDescription: z.string().max(170).optional(),
      focusKeyword: z.string().max(100).optional(),
      keywords: z.array(z.string()).optional(),
    })
    .optional(),
});

function unauthorized() {
  return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
}

async function resolveAuthorId(): Promise<string | null> {
  const email = process.env.AUTOMATION_AUTHOR_EMAIL;
  const user = email
    ? await db.user.findUnique({ where: { email } })
    : await db.user.findFirst({ where: { role: "ADMIN" }, orderBy: { createdAt: "asc" } });
  return user?.id ?? null;
}

async function resolveCategoryId(categorySlug?: string): Promise<string | null> {
  if (!categorySlug) return null;
  const category = await db.category.findUnique({ where: { slug: categorySlug } });
  return category?.id ?? null;
}

async function resolveTagIds(tagNames?: string[]): Promise<string[]> {
  if (!tagNames?.length) return [];
  const ids: string[] = [];
  for (const name of tagNames) {
    const existing = await db.tag.findUnique({ where: { name } });
    if (existing) {
      ids.push(existing.id);
      continue;
    }
    const created = await db.tag.create({ data: { name, slug: generateSlug(name) } });
    ids.push(created.id);
  }
  return ids;
}

export async function POST(req: NextRequest) {
  const configuredKey = process.env.AUTOMATION_API_KEY;
  if (!configuredKey) {
    return NextResponse.json(
      { error: "Automation posting is not configured (AUTOMATION_API_KEY unset)" },
      { status: 503 }
    );
  }

  const authHeader = req.headers.get("authorization") || "";
  const providedKey = authHeader.startsWith("Bearer ") ? authHeader.slice(7) : "";
  if (!providedKey || providedKey !== configuredKey) {
    return unauthorized();
  }

  try {
    const body = await req.json();
    const data = automationPostSchema.parse(body);

    const authorId = await resolveAuthorId();
    if (!authorId) {
      return NextResponse.json(
        { error: "No automation author configured or found (set AUTOMATION_AUTHOR_EMAIL)" },
        { status: 500 }
      );
    }

    const [categoryId, tagIds] = await Promise.all([
      resolveCategoryId(data.categorySlug),
      resolveTagIds(data.tagNames),
    ]);

    const plainText = data.contentHtml.replace(/<[^>]+>/g, " ");

    const post = await db.post.create({
      data: {
        title: data.title,
        slug: data.slug,
        excerpt: data.excerpt,
        contentHtml: data.contentHtml,
        featuredImage: data.featuredImage || null,
        status: "DRAFT",
        readTime: calculateReadTime(plainText),
        authorId,
        categoryId,
        ...(tagIds.length ? { tags: { create: tagIds.map((tagId) => ({ tagId })) } } : {}),
        ...(data.seo
          ? {
              seoMetadata: {
                create: {
                  seoTitle: data.seo.seoTitle,
                  metaDescription: data.seo.metaDescription,
                  focusKeyword: data.seo.focusKeyword,
                  keywords: data.seo.keywords ?? [],
                },
              },
            }
          : {}),
      },
      include: { category: true, tags: { include: { tag: true } }, seoMetadata: true },
    });

    await logAudit({
      userId: authorId,
      action: "CREATE",
      entity: "Post",
      entityId: post.id,
      metadata: { title: post.title, status: post.status, source: "automation" },
    });

    return NextResponse.json({ post }, { status: 201 });
  } catch (error) {
    return handleApiError(error);
  }
}
