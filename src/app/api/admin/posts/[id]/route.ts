import { NextRequest, NextResponse } from "next/server";
import { db } from "@/lib/db";
import { requireAdmin, isErrorResponse, handleApiError } from "@/lib/adminApi";
import { updatePostSchema, calculateReadTime } from "@/lib/validation";
import { logAudit } from "@/lib/audit";

type Params = { params: Promise<{ id: string }> };

// GET /api/admin/posts/[id]
export async function GET(_req: NextRequest, { params }: Params) {
  const session = await requireAdmin();
  if (isErrorResponse(session)) return session;

  try {
    const { id } = await params;
    const post = await db.post.findUnique({
      where: { id },
      include: {
        author: { select: { id: true, name: true } },
        category: true,
        tags: { include: { tag: true } },
        seoMetadata: true,
        revisions: {
          take: 10,
          orderBy: { createdAt: "desc" },
          include: { author: { select: { name: true } } },
        },
      },
    });

    if (!post) {
      return NextResponse.json({ error: "Post not found" }, { status: 404 });
    }

    return NextResponse.json({ post });
  } catch (error) {
    return handleApiError(error);
  }
}

// PATCH /api/admin/posts/[id] — update (also handles publish/unpublish/schedule/archive)
export async function PATCH(req: NextRequest, { params }: Params) {
  const session = await requireAdmin();
  if (isErrorResponse(session)) return session;

  try {
    const { id } = await params;
    const body = await req.json();
    const data = updatePostSchema.parse(body);

    const existing = await db.post.findUnique({
      where: { id },
      include: { seoMetadata: true },
    });
    if (!existing) {
      return NextResponse.json({ error: "Post not found" }, { status: 404 });
    }

    // Save a revision snapshot before updating content
    if (data.content !== undefined || data.title !== undefined) {
      await db.postRevision.create({
        data: {
          postId: id,
          title: existing.title,
          content: existing.content ?? undefined,
          authorId: session.userId,
        },
      });
      // Keep only the last 20 revisions per post
      const old = await db.postRevision.findMany({
        where: { postId: id },
        orderBy: { createdAt: "desc" },
        skip: 20,
        select: { id: true },
      });
      if (old.length) {
        await db.postRevision.deleteMany({ where: { id: { in: old.map((r) => r.id) } } });
      }
    }

    const { seo, tagIds, publishedAt, scheduledAt, ...postFields } = data;

    const plainText = data.contentHtml
      ? data.contentHtml.replace(/<[^>]+>/g, " ")
      : null;

    // Publishing for the first time sets publishedAt
    const becomingPublished =
      data.status === "PUBLISHED" && existing.status !== "PUBLISHED";

    const post = await db.post.update({
      where: { id },
      data: {
        ...postFields,
        ...(postFields.featuredImage !== undefined
          ? { featuredImage: postFields.featuredImage || null }
          : {}),
        ...(plainText ? { readTime: calculateReadTime(plainText) } : {}),
        ...(becomingPublished
          ? { publishedAt: new Date(publishedAt || Date.now()) }
          : publishedAt !== undefined
            ? { publishedAt: publishedAt ? new Date(publishedAt) : null }
            : {}),
        ...(scheduledAt !== undefined
          ? { scheduledAt: scheduledAt ? new Date(scheduledAt) : null }
          : {}),
        ...(tagIds !== undefined
          ? {
              tags: {
                deleteMany: {},
                create: tagIds.map((tagId) => ({ tagId })),
              },
            }
          : {}),
        ...(seo
          ? {
              seoMetadata: {
                upsert: {
                  create: {
                    ...seo,
                    canonicalUrl: seo.canonicalUrl || null,
                    ogImage: seo.ogImage || null,
                  },
                  update: {
                    ...seo,
                    canonicalUrl: seo.canonicalUrl || null,
                    ogImage: seo.ogImage || null,
                  },
                },
              },
            }
          : {}),
      },
      include: {
        category: true,
        tags: { include: { tag: true } },
        seoMetadata: true,
      },
    });

    await logAudit({
      userId: session.userId,
      action: "UPDATE",
      entity: "Post",
      entityId: id,
      metadata: { title: post.title, status: post.status },
    });

    return NextResponse.json({ post });
  } catch (error) {
    return handleApiError(error);
  }
}

// DELETE /api/admin/posts/[id]
export async function DELETE(_req: NextRequest, { params }: Params) {
  const session = await requireAdmin(["ADMIN", "EDITOR"]);
  if (isErrorResponse(session)) return session;

  try {
    const { id } = await params;
    const existing = await db.post.findUnique({ where: { id } });
    if (!existing) {
      return NextResponse.json({ error: "Post not found" }, { status: 404 });
    }

    await db.post.delete({ where: { id } });

    await logAudit({
      userId: session.userId,
      action: "DELETE",
      entity: "Post",
      entityId: id,
      metadata: { title: existing.title },
    });

    return NextResponse.json({ success: true });
  } catch (error) {
    return handleApiError(error);
  }
}
