"use client";

import { useCallback, useEffect, useState } from "react";
import { ConfirmModal } from "@/components/admin/Modal";
import { useToast } from "@/components/admin/Toast";

type Tag = {
  id: string;
  name: string;
  slug: string;
  _count: { posts: number };
};

export default function TagsPage() {
  const { addToast } = useToast();
  const [tags, setTags] = useState<Tag[]>([]);
  const [loading, setLoading] = useState(true);
  const [newTag, setNewTag] = useState("");
  const [busy, setBusy] = useState(false);
  const [deleteTarget, setDeleteTarget] = useState<Tag | null>(null);
  const [filter, setFilter] = useState("");

  const load = useCallback(async () => {
    setLoading(true);
    try {
      const res = await fetch("/api/admin/tags");
      if (!res.ok) throw new Error();
      setTags((await res.json()).tags);
    } catch {
      addToast("Failed to load tags", "error");
    } finally {
      setLoading(false);
    }
  }, [addToast]);

  useEffect(() => { load(); }, [load]);

  async function handleCreate() {
    if (!newTag.trim()) return;
    setBusy(true);
    try {
      const res = await fetch("/api/admin/tags", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ name: newTag.trim() }),
      });
      if (!res.ok) {
        const err = await res.json().catch(() => ({}));
        throw new Error(err.error || "Create failed");
      }
      addToast("Tag created", "success");
      setNewTag("");
      load();
    } catch (e) {
      addToast(e instanceof Error ? e.message : "Create failed", "error");
    } finally {
      setBusy(false);
    }
  }

  async function handleDelete() {
    if (!deleteTarget) return;
    setBusy(true);
    try {
      const res = await fetch(`/api/admin/tags/${deleteTarget.id}`, { method: "DELETE" });
      if (!res.ok) throw new Error();
      addToast("Tag deleted", "success");
      setDeleteTarget(null);
      load();
    } catch {
      addToast("Delete failed", "error");
    } finally {
      setBusy(false);
    }
  }

  const visible = filter
    ? tags.filter((t) => t.name.toLowerCase().includes(filter.toLowerCase()))
    : tags;

  return (
    <div>
      <div className="admin-page-header">
        <div>
          <h1 className="admin-page-title">Tags</h1>
          <p className="admin-page-subtitle">{tags.length} tags</p>
        </div>
      </div>

      <div style={{ display: "flex", gap: "0.75rem", flexWrap: "wrap", marginBottom: "1.25rem" }}>
        <input
          className="form-input"
          style={{ flex: "1 1 200px", maxWidth: 300 }}
          placeholder="Filter tags…"
          value={filter}
          onChange={(e) => setFilter(e.target.value)}
        />
        <div style={{ display: "flex", gap: 8 }}>
          <input
            className="form-input"
            style={{ width: 220 }}
            placeholder="New tag name…"
            value={newTag}
            onChange={(e) => setNewTag(e.target.value)}
            onKeyDown={(e) => e.key === "Enter" && handleCreate()}
          />
          <button className="btn btn-primary" disabled={busy || !newTag.trim()} onClick={handleCreate}>
            + Add
          </button>
        </div>
      </div>

      {loading ? (
        <div className="empty-state"><p className="empty-state-text">Loading…</p></div>
      ) : (
        <div style={{ display: "flex", flexWrap: "wrap", gap: 8 }}>
          {visible.map((tag) => (
            <span key={tag.id} className="pe-tag" style={{ fontSize: 13, padding: "6px 12px" }}>
              {tag.name}
              <span className="table-meta" style={{ fontSize: 11 }}>({tag._count.posts})</span>
              <button title="Delete tag" onClick={() => setDeleteTarget(tag)}>×</button>
            </span>
          ))}
          {visible.length === 0 && (
            <p className="empty-state-text">No tags match.</p>
          )}
        </div>
      )}

      <ConfirmModal
        open={!!deleteTarget}
        onClose={() => setDeleteTarget(null)}
        onConfirm={handleDelete}
        title="Delete tag"
        message={`Delete "${deleteTarget?.name}"? It will be removed from ${deleteTarget?._count.posts || 0} post(s).`}
        confirmLabel="Delete"
        variant="danger"
        loading={busy}
      />
    </div>
  );
}
