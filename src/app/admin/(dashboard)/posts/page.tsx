"use client";

import { useCallback, useEffect, useRef, useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { StatusBadge } from "@/components/admin/Badge";
import { ConfirmModal } from "@/components/admin/Modal";
import { useToast } from "@/components/admin/Toast";

type PostRow = {
  id: string;
  title: string;
  slug: string;
  status: string;
  views: number;
  createdAt: string;
  publishedAt: string | null;
  author: { id: string; name: string };
  category: { id: string; name: string; color: string } | null;
  tags: { tag: { id: string; name: string } }[];
};

type Category = { id: string; name: string };

export default function PostsPage() {
  const router = useRouter();
  const { addToast } = useToast();

  const [posts, setPosts] = useState<PostRow[]>([]);
  const [categories, setCategories] = useState<Category[]>([]);
  const [loading, setLoading] = useState(true);
  const [page, setPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [total, setTotal] = useState(0);
  const [search, setSearch] = useState("");
  const [status, setStatus] = useState("");
  const [categoryId, setCategoryId] = useState("");
  const [sort, setSort] = useState("latest");
  const [deleteTarget, setDeleteTarget] = useState<PostRow | null>(null);
  const [deleting, setDeleting] = useState(false);
  const searchTimer = useRef<ReturnType<typeof setTimeout> | null>(null);

  const fetchPosts = useCallback(async (opts: {
    page: number; search: string; status: string; categoryId: string; sort: string;
  }) => {
    setLoading(true);
    try {
      const qs = new URLSearchParams({ page: String(opts.page), perPage: "20", sort: opts.sort });
      if (opts.search) qs.set("search", opts.search);
      if (opts.status) qs.set("status", opts.status);
      if (opts.categoryId) qs.set("categoryId", opts.categoryId);
      const res = await fetch(`/api/admin/posts?${qs}`);
      if (!res.ok) throw new Error("Failed to load posts");
      const data = await res.json();
      setPosts(data.posts);
      setTotalPages(data.pagination.totalPages || 1);
      setTotal(data.pagination.total);
    } catch {
      addToast("Failed to load posts", "error");
    } finally {
      setLoading(false);
    }
  }, [addToast]);

  useEffect(() => {
    fetchPosts({ page, search, status, categoryId, sort });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [page, status, categoryId, sort]);

  useEffect(() => {
    fetch("/api/admin/categories?perPage=100")
      .then((r) => (r.ok ? r.json() : { categories: [] }))
      .then((d) => setCategories(d.categories || []))
      .catch(() => {});
  }, []);

  function onSearchChange(value: string) {
    setSearch(value);
    if (searchTimer.current) clearTimeout(searchTimer.current);
    searchTimer.current = setTimeout(() => {
      setPage(1);
      fetchPosts({ page: 1, search: value, status, categoryId, sort });
    }, 350);
  }

  async function handleDelete() {
    if (!deleteTarget) return;
    setDeleting(true);
    try {
      const res = await fetch(`/api/admin/posts/${deleteTarget.id}`, { method: "DELETE" });
      if (!res.ok) throw new Error();
      addToast("Post deleted", "success");
      setDeleteTarget(null);
      fetchPosts({ page, search, status, categoryId, sort });
    } catch {
      addToast("Failed to delete post", "error");
    } finally {
      setDeleting(false);
    }
  }

  async function handleDuplicate(post: PostRow) {
    try {
      const res = await fetch(`/api/admin/posts/${post.id}/duplicate`, { method: "POST" });
      if (!res.ok) throw new Error();
      const data = await res.json();
      addToast("Post duplicated", "success");
      router.push(`/admin/posts/${data.post.id}`);
    } catch {
      addToast("Failed to duplicate post", "error");
    }
  }

  async function handleQuickStatus(post: PostRow, newStatus: string) {
    try {
      const res = await fetch(`/api/admin/posts/${post.id}`, {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ status: newStatus }),
      });
      if (!res.ok) throw new Error();
      addToast(newStatus === "PUBLISHED" ? "Post published" : "Post unpublished", "success");
      fetchPosts({ page, search, status, categoryId, sort });
    } catch {
      addToast("Failed to update status", "error");
    }
  }

  return (
    <div>
      <div className="admin-page-header">
        <div>
          <h1 className="admin-page-title">Posts</h1>
          <p className="admin-page-subtitle">{total} article{total === 1 ? "" : "s"} total</p>
        </div>
        <Link href="/admin/posts/new" className="btn btn-primary">
          + New Post
        </Link>
      </div>

      {/* Filters */}
      <div style={{ display: "flex", gap: "0.75rem", flexWrap: "wrap", marginBottom: "1.25rem" }}>
        <input
          className="form-input"
          style={{ flex: "1 1 220px", maxWidth: 340 }}
          placeholder="Search title, slug, excerpt…"
          value={search}
          onChange={(e) => onSearchChange(e.target.value)}
        />
        <select className="form-select" style={{ width: 150 }} value={status} onChange={(e) => { setStatus(e.target.value); setPage(1); }}>
          <option value="">All statuses</option>
          <option value="PUBLISHED">Published</option>
          <option value="DRAFT">Draft</option>
          <option value="SCHEDULED">Scheduled</option>
          <option value="ARCHIVED">Archived</option>
        </select>
        <select className="form-select" style={{ width: 180 }} value={categoryId} onChange={(e) => { setCategoryId(e.target.value); setPage(1); }}>
          <option value="">All categories</option>
          {categories.map((c) => (
            <option key={c.id} value={c.id}>{c.name}</option>
          ))}
        </select>
        <select className="form-select" style={{ width: 140 }} value={sort} onChange={(e) => { setSort(e.target.value); setPage(1); }}>
          <option value="latest">Latest</option>
          <option value="views">Most viewed</option>
          <option value="title">Title A–Z</option>
        </select>
      </div>

      {/* Table */}
      {loading ? (
        <div className="empty-state"><p className="empty-state-text">Loading…</p></div>
      ) : posts.length === 0 ? (
        <div className="empty-state">
          <div className="empty-state-icon">📝</div>
          <h3 className="empty-state-title">No posts found</h3>
          <p className="empty-state-text">Try adjusting your filters, or create a new post.</p>
        </div>
      ) : (
        <div className="admin-table-wrap">
          <table className="admin-table">
            <thead>
              <tr>
                <th>Title</th>
                <th>Status</th>
                <th>Category</th>
                <th>Views</th>
                <th>Date</th>
                <th style={{ textAlign: "right" }}>Actions</th>
              </tr>
            </thead>
            <tbody>
              {posts.map((post) => (
                <tr key={post.id}>
                  <td>
                    <Link href={`/admin/posts/${post.id}`} className="table-title">{post.title}</Link>
                    <div className="table-meta">/{post.slug} · {post.author.name}</div>
                  </td>
                  <td><StatusBadge status={post.status} /></td>
                  <td>{post.category ? post.category.name : <span className="table-meta">—</span>}</td>
                  <td>{post.views.toLocaleString()}</td>
                  <td className="table-meta">
                    {new Date(post.publishedAt || post.createdAt).toLocaleDateString("en-US", { month: "short", day: "numeric", year: "numeric" })}
                  </td>
                  <td style={{ textAlign: "right", whiteSpace: "nowrap" }}>
                    <Link href={`/admin/posts/${post.id}`} className="btn btn-ghost btn-sm">Edit</Link>
                    {post.status === "PUBLISHED" ? (
                      <button className="btn btn-ghost btn-sm" onClick={() => handleQuickStatus(post, "DRAFT")}>Unpublish</button>
                    ) : (
                      <button className="btn btn-ghost btn-sm" onClick={() => handleQuickStatus(post, "PUBLISHED")}>Publish</button>
                    )}
                    <button className="btn btn-ghost btn-sm" onClick={() => handleDuplicate(post)}>Duplicate</button>
                    <button className="btn btn-ghost btn-sm danger" onClick={() => setDeleteTarget(post)}>Delete</button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}

      {/* Pagination */}
      {totalPages > 1 && (
        <div style={{ display: "flex", justifyContent: "center", gap: "0.5rem", marginTop: "1.5rem", alignItems: "center" }}>
          <button className="btn btn-ghost btn-sm" disabled={page <= 1} onClick={() => setPage(page - 1)}>← Prev</button>
          <span className="table-meta">Page {page} of {totalPages}</span>
          <button className="btn btn-ghost btn-sm" disabled={page >= totalPages} onClick={() => setPage(page + 1)}>Next →</button>
        </div>
      )}

      <ConfirmModal
        open={!!deleteTarget}
        onClose={() => setDeleteTarget(null)}
        onConfirm={handleDelete}
        title="Delete post"
        message={`Delete "${deleteTarget?.title}"? This cannot be undone.`}
        confirmLabel="Delete"
        variant="danger"
        loading={deleting}
      />
    </div>
  );
}
