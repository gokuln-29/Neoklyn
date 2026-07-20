import { NextRequest, NextResponse } from "next/server";
import { db } from "@/lib/db";
import { uploadToCloudinary } from "@/lib/cloudinary";
import { markdownToHtml } from "@/lib/markdown";
import { calculateReadTime, generateSlug } from "@/lib/validation";
import { z } from "zod";

/**
 * Machine-to-machine endpoint for the automated blog pipeline (n8n).
 * Auth: `Authorization: Bearer <PIPELINE_API_KEY>` — NOT a NextAuth session,
 * since the caller is a workflow, not a logged-in human.
 *
 * Always creates a DRAFT. Nothing this endpoint touches ever goes live
 * without a human publishing it from the admin panel.
 */

const heroImageSchema = z.object({
  filename: z.string(),
  alt_text: z.string(),
  content_type: z.string(),
  base64: z.string(),
});

const pipelinePostSchema = z.object({
  title: z.string().min(1).max(300),
  slug: z.string().min(1).max(200).optional(),
  meta_title: z.string().max(70),
  meta_description: z.string().max(165),
  focus_keyword: z.string().min(1).max(150),
  category: z.string().min(1),
  excerpt: z.string().max(500),
  body_markdown: z.string().min(1),
  hero_image: heroImageSchema.nullable().optional(),
});

function verifyPipelineKey(req: NextRequest): boolean {
  const expected = process.env.PIPELINE_API_KEY;
  if (!expected) return false;

  const auth = req.headers.get("authorization") || "";
  const token = auth.startsWith("Bearer ") ? auth.slice(7) : null;
  return token === expected;
}

/** Same SEO guardrails the pipeline docs promise: no H1 in body, keyword density 0.5–2.5%. */
function validateContent(bodyMarkdown: string, focusKeyword: string) {
  if (/^#\s/m.test(bodyMarkdown)) {
    return "Body contains an H1 heading — rejected (the post title is the H1, body should start at H2)";
  }

  const words = bodyMarkdown.trim().split(/\s+/).filter(Boolean);
  const wordCount = words.length;
  const kwLower = focusKeyword.toLowerCase();
  const bodyLower = bodyMarkdown.toLowerCase();
  const kwUses = bodyLower.split(kwLower).length - 1;
  const kwWordCount = focusKeyword.split(/\s+/).length;
  const density = wordCount > 0 ? ((kwUses * kwWordCount) / wordCount) * 100 : 0;

  if (density < 0.5 || density > 2.5) {
    return `Keyword density ${density.toFixed(2)}% is outside 0.5–2.5% (${kwUses} uses across ${wordCount} words)`;
  }

  return null;
}

export async function POST(req: NextRequest) {
  if (!verifyPipelineKey(req)) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  try {
    const body = pipelinePostSchema.parse(await req.json());

    const validationError = validateContent(body.body_markdown, body.focus_keyword);
    if (validationError) {
      return NextResponse.json({ error: validationError }, { status: 422 });
    }

    const slug = body.slug || generateSlug(body.title);

    const existing = await db.post.findUnique({ where: { slug } });
    if (existing) {
      return NextResponse.json(
        { error: `A post with slug "${slug}" already exists` },
        { status: 409 }
      );
    }

    const category = await db.category.findUnique({ where: { name: body.category } });
    if (!category) {
      return NextResponse.json(
        { error: `Unknown category "${body.category}" — must match an existing category name exactly` },
        { status: 422 }
      );
    }

    // Posts need an author; attribute automated posts to the first admin account.
    const author = await db.user.findFirst({ where: { role: "ADMIN" }, orderBy: { createdAt: "asc" } });
    if (!author) {
      return NextResponse.json({ error: "No admin user exists to attribute this post to" }, { status: 500 });
    }

    let featuredImage: string | null = null;
    if (body.hero_image) {
      try {
        const buffer = Buffer.from(body.hero_image.base64, "base64");
        const uploaded = await uploadToCloudinary(buffer, "blogs", body.hero_image.filename);
        featuredImage = uploaded.url;
      } catch (err) {
        console.error("Pipeline hero image upload failed:", err);
        // Non-fatal — publish without a featured image rather than losing the whole post.
      }
    }

    const contentHtml = await markdownToHtml(body.body_markdown);

    const post = await db.post.create({
      data: {
        title: body.title,
        slug,
        excerpt: body.excerpt,
        contentHtml,
        featuredImage,
        status: "DRAFT",
        readTime: calculateReadTime(body.body_markdown),
        authorId: author.id,
        categoryId: category.id,
        seoMetadata: {
          create: {
            seoTitle: body.meta_title,
            metaDescription: body.meta_description,
            focusKeyword: body.focus_keyword,
          },
        },
      },
    });

    return NextResponse.json({
      ok: true,
      status: "draft",
      slug: post.slug,
      review_url: `https://neoklyn.com/admin/posts/${post.id}`,
    });
  } catch (error) {
    if (error instanceof z.ZodError) {
      return NextResponse.json({ error: "Validation failed", issues: error.issues }, { status: 400 });
    }
    console.error("Pipeline post creation error:", error);
    return NextResponse.json({ error: "Internal server error" }, { status: 500 });
  }
}
