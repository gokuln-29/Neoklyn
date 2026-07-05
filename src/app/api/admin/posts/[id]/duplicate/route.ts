import { NextRequest, NextResponse } from "next/server";
import { db } from "@/lib/db";
import { requireAdmin, isErrorResponse, handleApiError } from "@/lib/adminApi";
import { logAudit } from "@/lib/audit";
import type { Prisma } from "@prisma/client";

type Params = { params: Promise<{ id: string }> };

// POST /api/admin/posts/[id]/duplicate
export async function POST(_req: NextRequest, { params }: Params) {
  const session = await requireAdmin();
  if (isErrorResponse(session)) return session;

  try {
    const { id } = await params;
    const source = await db.post.findUnique({
      where: { id },
      include: { tags: true, seoMetadata: true },
    });

    if (!source) {
      return NextResponse.json({ error: "Post not found" }, { status: 404 });
    }

    // Find a free slug: my-post-copy, my-post-copy-2, ...
    let slug = `${source.slug}-copy`;
    let counter = 2;
    while (await db.post.findUnique({ where: { slug } })) {
      slug = `${source.slug}-copy-${counter++}`;
    }

    const { seoMetadata, tags } = source;

    const post = await db.post.create({
      data: {
        title: `${source.title} (Copy)`,
        slug,
        excerpt: source.excerpt,
        content: (source.content ?? undefined) as Prisma.InputJsonValue | undefined,
        contentHtml: source.contentHtml,
        featuredImage: source.featuredImage,
        status: "DRAFT",
        readTime: source.readTime,
        categoryId: source.categoryId,
        authorId: session.userId,
        ...(tags.length
          ? { tags: { create: tags.map((t) => ({ tagId: t.tagId })) } }
          : {}),
        ...(seoMetadata
          ? {
              seoMetadata: {
                create: {
                  seoTitle: seoMetadata.seoTitle,
                  metaDescription: seoMetadata.metaDescription,
                  focusKeyword: seoMetadata.focusKeyword,
                  keywords: seoMetadata.keywords,
                  robots: seoMetadata.robots,
                  ogTitle: seoMetadata.ogTitle,
                  ogDescription: seoMetadata.ogDescription,
                  ogImage: seoMetadata.ogImage,
                  twitterCard: seoMetadata.twitterCard,
                },
              },
            }
          : {}),
      },
    });

    await logAudit({
      userId: session.userId,
      action: "DUPLICATE",
      entity: "Post",
      entityId: post.id,
      metadata: { sourceId: id, title: post.title },
    });

    return NextResponse.json({ post }, { status: 201 });
  } catch (error) {
    return handleApiError(error);
  }
}
