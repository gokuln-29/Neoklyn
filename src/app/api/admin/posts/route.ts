import { NextRequest, NextResponse } from "next/server";
import { db } from "@/lib/db";
import { requireAdmin, isErrorResponse, handleApiError } from "@/lib/adminApi";
import { createPostSchema, calculateReadTime } from "@/lib/validation";
import { logAudit } from "@/lib/audit";
import type { Prisma, PostStatus } from "@prisma/client";

// GET /api/admin/posts — list with search, filters, pagination, sort
export async function GET(req: NextRequest) {
  const session = await requireAdmin();
  if (isErrorResponse(session)) return session;

  try {
    const params = req.nextUrl.searchParams;
    const page = Math.max(1, parseInt(params.get("page") || "1", 10));
    const perPage = Math.min(100, Math.max(1, parseInt(params.get("perPage") || "20", 10)));
    const search = params.get("search")?.trim();
    const status = params.get("status");
    const categoryId = params.get("categoryId");
    const tagId = params.get("tagId");
    const authorId = params.get("authorId");
    const sort = params.get("sort") || "latest"; // latest | views | title

    const where: Prisma.PostWhereInput = {};

    if (search) {
      where.OR = [
        { title: { contains: search, mode: "insensitive" } },
        { excerpt: { contains: search, mode: "insensitive" } },
        { slug: { contains: search, mode: "insensitive" } },
      ];
    }
    if (status && ["DRAFT", "PUBLISHED", "SCHEDULED", "ARCHIVED"].includes(status)) {
      where.status = status as PostStatus;
    }
    if (categoryId) where.categoryId = categoryId;
    if (authorId) where.authorId = authorId;
    if (tagId) where.tags = { some: { tagId } };

    const orderBy: Prisma.PostOrderByWithRelationInput =
      sort === "views" ? { views: "desc" } :
      sort === "title" ? { title: "asc" } :
      { createdAt: "desc" };

    const [posts, total] = await Promise.all([
      db.post.findMany({
        where,
        orderBy,
        skip: (page - 1) * perPage,
        take: perPage,
        include: {
          author: { select: { id: true, name: true } },
          category: { select: { id: true, name: true, color: true } },
          tags: { include: { tag: { select: { id: true, name: true } } } },
        },
      }),
      db.post.count({ where }),
    ]);

    return NextResponse.json({
      posts,
      pagination: { page, perPage, total, totalPages: Math.ceil(total / perPage) },
    });
  } catch (error) {
    return handleApiError(error);
  }
}

// POST /api/admin/posts — create
export async function POST(req: NextRequest) {
  const session = await requireAdmin();
  if (isErrorResponse(session)) return session;

  try {
    const body = await req.json();
    const data = createPostSchema.parse(body);

    const { seo, tagIds, publishedAt, scheduledAt, ...postFields } = data;

    const plainText = data.contentHtml
      ? data.contentHtml.replace(/<[^>]+>/g, " ")
      : "";

    const post = await db.post.create({
      data: {
        ...postFields,
        featuredImage: postFields.featuredImage || null,
        readTime: postFields.readTime || (plainText ? calculateReadTime(plainText) : null),
        publishedAt: data.status === "PUBLISHED" ? new Date(publishedAt || Date.now()) : publishedAt ? new Date(publishedAt) : null,
        scheduledAt: scheduledAt ? new Date(scheduledAt) : null,
        authorId: session.userId,
        ...(tagIds?.length
          ? { tags: { create: tagIds.map((tagId) => ({ tagId })) } }
          : {}),
        ...(seo
          ? {
              seoMetadata: {
                create: {
                  ...seo,
                  canonicalUrl: seo.canonicalUrl || null,
                  ogImage: seo.ogImage || null,
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
      action: "CREATE",
      entity: "Post",
      entityId: post.id,
      metadata: { title: post.title, status: post.status },
    });

    return NextResponse.json({ post }, { status: 201 });
  } catch (error) {
    return handleApiError(error);
  }
}
