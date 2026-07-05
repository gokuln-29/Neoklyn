import { db } from "@/lib/db";
import StatCard from "@/components/admin/StatCard";

// Always render fresh stats from the database
export const dynamic = "force-dynamic";
import { StatusBadge } from "@/components/admin/Badge";
import Link from "next/link";

export default async function AdminDashboard() {
  // Fetch stats — use Promise.all for parallel queries
  const [
    totalPosts,
    publishedPosts,
    draftPosts,
    scheduledPosts,
    totalCategories,
    totalTags,
    totalViews,
    totalLeads,
    recentPosts,
    recentlyEdited,
  ] = await Promise.all([
    db.post.count(),
    db.post.count({ where: { status: "PUBLISHED" } }),
    db.post.count({ where: { status: "DRAFT" } }),
    db.post.count({ where: { status: "SCHEDULED" } }),
    db.category.count(),
    db.tag.count(),
    db.post.aggregate({ _sum: { views: true } }),
    db.lead.count(),
    db.post.findMany({
      take: 5,
      orderBy: { createdAt: "desc" },
      include: { author: { select: { name: true } }, category: { select: { name: true } } },
    }),
    db.post.findMany({
      take: 5,
      orderBy: { updatedAt: "desc" },
      where: { updatedAt: { not: undefined } },
      include: { author: { select: { name: true } } },
    }),
  ]);

  const viewCount = totalViews._sum.views || 0;

  return (
    <div>
      {/* Page Header */}
      <div className="admin-page-header">
        <div>
          <h1 className="admin-page-title">Dashboard</h1>
          <p className="admin-page-subtitle">
            Welcome back — here&apos;s an overview of your content
          </p>
        </div>
        <div className="dashboard-actions">
          <Link href="/admin/posts/new" className="btn btn-primary">
            + New Post
          </Link>
        </div>
      </div>

      {/* Stat Cards */}
      <div className="stat-cards-grid">
        <StatCard label="Total Posts" value={totalPosts} icon="📝" color="var(--admin-accent)" />
        <StatCard
          label="Published"
          value={publishedPosts}
          icon="✅"
          color="var(--admin-green)"
        />
        <StatCard
          label="Drafts"
          value={draftPosts}
          icon="📄"
          color="var(--admin-yellow)"
        />
        <StatCard
          label="Scheduled"
          value={scheduledPosts}
          icon="📅"
          color="var(--admin-blue)"
        />
        <StatCard
          label="Categories"
          value={totalCategories}
          icon="📂"
          color="var(--admin-violet)"
        />
        <StatCard label="Tags" value={totalTags} icon="🏷️" color="var(--admin-accent)" />
        <StatCard
          label="Total Views"
          value={viewCount.toLocaleString()}
          icon="👁️"
          color="var(--admin-green)"
        />
        <StatCard
          label="Contact Leads"
          value={totalLeads}
          icon="📬"
          color="var(--admin-red)"
        />
      </div>

      {/* Recent Articles */}
      <div className="dashboard-section">
        <h2 className="dashboard-section-title">📝 Recent Articles</h2>
        {recentPosts.length === 0 ? (
          <div className="empty-state">
            <div className="empty-state-icon">📝</div>
            <h3 className="empty-state-title">No posts yet</h3>
            <p className="empty-state-text">
              Create your first blog post to get started.
            </p>
            <Link href="/admin/posts/new" className="btn btn-primary">
              Create Post
            </Link>
          </div>
        ) : (
          <div className="admin-table-wrap">
            <table className="admin-table">
              <thead>
                <tr>
                  <th>Title</th>
                  <th>Category</th>
                  <th>Status</th>
                  <th>Author</th>
                  <th>Date</th>
                </tr>
              </thead>
              <tbody>
                {recentPosts.map((post) => (
                  <tr key={post.id}>
                    <td>
                      <Link
                        href={`/admin/posts/${post.id}/edit`}
                        className="table-title"
                        style={{ color: "var(--admin-accent)", textDecoration: "none" }}
                      >
                        {post.title}
                      </Link>
                    </td>
                    <td className="table-meta">{post.category?.name || "—"}</td>
                    <td>
                      <StatusBadge status={post.status} />
                    </td>
                    <td className="table-meta">{post.author.name}</td>
                    <td className="table-meta">
                      {post.createdAt.toLocaleDateString("en-US", {
                        month: "short",
                        day: "numeric",
                        year: "numeric",
                      })}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>

      {/* Recently Edited */}
      <div className="dashboard-section">
        <h2 className="dashboard-section-title">✏️ Recently Edited</h2>
        {recentlyEdited.length === 0 ? (
          <p style={{ color: "var(--admin-text-muted)", fontSize: 14 }}>
            No recently edited posts.
          </p>
        ) : (
          <div className="admin-table-wrap">
            <table className="admin-table">
              <thead>
                <tr>
                  <th>Title</th>
                  <th>Status</th>
                  <th>Last Edited</th>
                  <th>Author</th>
                </tr>
              </thead>
              <tbody>
                {recentlyEdited.map((post) => (
                  <tr key={post.id}>
                    <td>
                      <Link
                        href={`/admin/posts/${post.id}/edit`}
                        className="table-title"
                        style={{ color: "var(--admin-accent)", textDecoration: "none" }}
                      >
                        {post.title}
                      </Link>
                    </td>
                    <td>
                      <StatusBadge status={post.status} />
                    </td>
                    <td className="table-meta">
                      {post.updatedAt.toLocaleDateString("en-US", {
                        month: "short",
                        day: "numeric",
                        year: "numeric",
                      })}
                    </td>
                    <td className="table-meta">{post.author.name}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>
    </div>
  );
}
