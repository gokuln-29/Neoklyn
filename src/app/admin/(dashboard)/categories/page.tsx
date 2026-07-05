"use client";

import { useCallback, useEffect, useState } from "react";
import Modal, { ConfirmModal } from "@/components/admin/Modal";
import { useToast } from "@/components/admin/Toast";
import { generateSlug } from "@/lib/validation";

type Category = {
  id: string;
  name: string;
  slug: string;
  description: string | null;
  color: string;
  icon: string | null;
  sortOrder: number;
  _count: { posts: number };
};

const EMPTY_FORM = { name: "", slug: "", description: "", color: "#06B6D4", icon: "" };

export default function CategoriesPage() {
  const { addToast } = useToast();
  const [categories, setCategories] = useState<Category[]>([]);
  const [loading, setLoading] = useState(true);
  const [editing, setEditing] = useState<Category | null>(null);
  const [creating, setCreating] = useState(false);
  const [form, setForm] = useState(EMPTY_FORM);
  const [busy, setBusy] = useState(false);
  const [deleteTarget, setDeleteTarget] = useState<Category | null>(null);

  const load = useCallback(async () => {
    setLoading(true);
    try {
      const res = await fetch("/api/admin/categories");
      if (!res.ok) throw new Error();
      setCategories((await res.json()).categories);
    } catch {
      addToast("Failed to load categories", "error");
    } finally {
      setLoading(false);
    }
  }, [addToast]);

  useEffect(() => { load(); }, [load]);

  function openCreate() {
    setForm(EMPTY_FORM);
    setCreating(true);
    setEditing(null);
  }

  function openEdit(cat: Category) {
    setForm({
      name: cat.name,
      slug: cat.slug,
      description: cat.description || "",
      color: cat.color,
      icon: cat.icon || "",
    });
    setEditing(cat);
    setCreating(false);
  }

  async function handleSubmit() {
    if (!form.name.trim()) {
      addToast("Name is required", "warning");
      return;
    }
    setBusy(true);
    try {
      const payload = {
        ...form,
        slug: form.slug.trim() || generateSlug(form.name),
        description: form.description || undefined,
        icon: form.icon || undefined,
      };
      const url = editing ? `/api/admin/categories/${editing.id}` : "/api/admin/categories";
      const res = await fetch(url, {
        method: editing ? "PATCH" : "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      });
      if (!res.ok) {
        const err = await res.json().catch(() => ({}));
        throw new Error(err.error || "Save failed");
      }
      addToast(editing ? "Category updated" : "Category created", "success");
      setEditing(null);
      setCreating(false);
      load();
    } catch (e) {
      addToast(e instanceof Error ? e.message : "Save failed", "error");
    } finally {
      setBusy(false);
    }
  }

  async function handleDelete() {
    if (!deleteTarget) return;
    setBusy(true);
    try {
      const res = await fetch(`/api/admin/categories/${deleteTarget.id}`, { method: "DELETE" });
      if (!res.ok) {
        const err = await res.json().catch(() => ({}));
        throw new Error(err.error || "Delete failed");
      }
      addToast("Category deleted", "success");
      setDeleteTarget(null);
      load();
    } catch (e) {
      addToast(e instanceof Error ? e.message : "Delete failed", "error");
    } finally {
      setBusy(false);
    }
  }

  const modalOpen = creating || !!editing;

  return (
    <div>
      <div className="admin-page-header">
        <div>
          <h1 className="admin-page-title">Categories</h1>
          <p className="admin-page-subtitle">{categories.length} categories</p>
        </div>
        <button className="btn btn-primary" onClick={openCreate}>+ New Category</button>
      </div>

      {loading ? (
        <div className="empty-state"><p className="empty-state-text">Loading…</p></div>
      ) : (
        <div className="admin-table-wrap">
          <table className="admin-table">
            <thead>
              <tr>
                <th>Category</th>
                <th>Slug</th>
                <th>Posts</th>
                <th style={{ textAlign: "right" }}>Actions</th>
              </tr>
            </thead>
            <tbody>
              {categories.map((cat) => (
                <tr key={cat.id}>
                  <td>
                    <span style={{ display: "inline-flex", alignItems: "center", gap: 8 }}>
                      <span style={{ width: 10, height: 10, borderRadius: "50%", background: cat.color, display: "inline-block" }} />
                      {cat.icon && <span>{cat.icon}</span>}
                      <span className="table-title">{cat.name}</span>
                    </span>
                  </td>
                  <td className="table-meta">/{cat.slug}</td>
                  <td>{cat._count.posts}</td>
                  <td style={{ textAlign: "right", whiteSpace: "nowrap" }}>
                    <button className="btn btn-ghost btn-sm" onClick={() => openEdit(cat)}>Edit</button>
                    <button className="btn btn-ghost btn-sm danger" onClick={() => setDeleteTarget(cat)}>Delete</button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}

      <Modal
        open={modalOpen}
        onClose={() => { setCreating(false); setEditing(null); }}
        title={editing ? "Edit Category" : "New Category"}
        footer={
          <div className="modal-actions">
            <button className="btn btn-ghost" onClick={() => { setCreating(false); setEditing(null); }}>Cancel</button>
            <button className="btn btn-primary" disabled={busy} onClick={handleSubmit}>
              {busy ? "Saving…" : editing ? "Update" : "Create"}
            </button>
          </div>
        }
      >
        <div className="form-group">
          <label className="form-label">Name</label>
          <input className="form-input" value={form.name} onChange={(e) => setForm({ ...form, name: e.target.value })} />
        </div>
        <div className="form-group">
          <label className="form-label">Slug</label>
          <input className="form-input" placeholder={form.name ? generateSlug(form.name) : "auto-generated"} value={form.slug} onChange={(e) => setForm({ ...form, slug: e.target.value })} />
        </div>
        <div className="form-group">
          <label className="form-label">Description</label>
          <textarea className="form-textarea" rows={2} value={form.description} onChange={(e) => setForm({ ...form, description: e.target.value })} />
        </div>
        <div style={{ display: "flex", gap: 12 }}>
          <div className="form-group" style={{ flex: 1 }}>
            <label className="form-label">Color</label>
            <input type="color" className="form-input" style={{ height: 40, padding: 4 }} value={form.color} onChange={(e) => setForm({ ...form, color: e.target.value })} />
          </div>
          <div className="form-group" style={{ flex: 1 }}>
            <label className="form-label">Icon (emoji)</label>
            <input className="form-input" maxLength={4} value={form.icon} onChange={(e) => setForm({ ...form, icon: e.target.value })} />
          </div>
        </div>
      </Modal>

      <ConfirmModal
        open={!!deleteTarget}
        onClose={() => setDeleteTarget(null)}
        onConfirm={handleDelete}
        title="Delete category"
        message={`Delete "${deleteTarget?.name}"? Posts using it must be reassigned first.`}
        confirmLabel="Delete"
        variant="danger"
        loading={busy}
      />
    </div>
  );
}
