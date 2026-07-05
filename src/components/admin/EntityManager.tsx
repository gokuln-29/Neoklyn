"use client";

import { useCallback, useEffect, useState } from "react";
import Modal, { ConfirmModal } from "@/components/admin/Modal";
import { useToast } from "@/components/admin/Toast";

export type FieldConfig = {
  name: string;
  label: string;
  type: "text" | "textarea" | "number" | "checkbox" | "color" | "tags";
  required?: boolean;
  placeholder?: string;
  /** show as a table column */
  inTable?: boolean;
};

type EntityManagerProps = {
  title: string;
  subtitle?: string;
  endpoint: string; // e.g. /api/admin/testimonials
  fields: FieldConfig[];
  /** field used as the row title in the table */
  titleField: string;
  /** optional secondary line under the title */
  metaField?: string;
};

type Item = Record<string, unknown> & { id: string };

export default function EntityManager({ title, subtitle, endpoint, fields, titleField, metaField }: EntityManagerProps) {
  const { addToast } = useToast();
  const [items, setItems] = useState<Item[]>([]);
  const [loading, setLoading] = useState(true);
  const [editing, setEditing] = useState<Item | null>(null);
  const [creating, setCreating] = useState(false);
  const [form, setForm] = useState<Record<string, unknown>>({});
  const [busy, setBusy] = useState(false);
  const [deleteTarget, setDeleteTarget] = useState<Item | null>(null);

  const load = useCallback(async () => {
    setLoading(true);
    try {
      const res = await fetch(endpoint);
      if (!res.ok) throw new Error();
      setItems((await res.json()).items);
    } catch {
      addToast(`Failed to load ${title.toLowerCase()}`, "error");
    } finally {
      setLoading(false);
    }
  }, [endpoint, title, addToast]);

  useEffect(() => { load(); }, [load]);

  function emptyForm(): Record<string, unknown> {
    const f: Record<string, unknown> = {};
    for (const field of fields) {
      f[field.name] =
        field.type === "checkbox" ? true :
        field.type === "number" ? 0 :
        field.type === "tags" ? [] :
        field.type === "color" ? "#06B6D4" :
        "";
    }
    return f;
  }

  function openCreate() {
    setForm(emptyForm());
    setCreating(true);
    setEditing(null);
  }

  function openEdit(item: Item) {
    const f: Record<string, unknown> = {};
    for (const field of fields) {
      f[field.name] = item[field.name] ?? (field.type === "tags" ? [] : field.type === "checkbox" ? true : "");
    }
    setForm(f);
    setEditing(item);
    setCreating(false);
  }

  async function handleSubmit() {
    for (const field of fields) {
      if (field.required && !String(form[field.name] || "").trim()) {
        addToast(`${field.label} is required`, "warning");
        return;
      }
    }
    setBusy(true);
    try {
      const payload: Record<string, unknown> = {};
      for (const field of fields) {
        const v = form[field.name];
        if (field.type === "number") payload[field.name] = Number(v) || 0;
        else if (field.type === "checkbox") payload[field.name] = !!v;
        else if (field.type === "tags") payload[field.name] = v;
        else payload[field.name] = v === "" ? null : v;
        // strip nulls for required text fields
        if (payload[field.name] === null && field.required) payload[field.name] = "";
      }
      const url = editing ? `${endpoint}/${editing.id}` : endpoint;
      const res = await fetch(url, {
        method: editing ? "PATCH" : "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      });
      if (!res.ok) {
        const err = await res.json().catch(() => ({}));
        throw new Error(err.error || "Save failed");
      }
      addToast(editing ? "Updated" : "Created", "success");
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
      const res = await fetch(`${endpoint}/${deleteTarget.id}`, { method: "DELETE" });
      if (!res.ok) throw new Error();
      addToast("Deleted", "success");
      setDeleteTarget(null);
      load();
    } catch {
      addToast("Delete failed", "error");
    } finally {
      setBusy(false);
    }
  }

  const tableFields = fields.filter((f) => f.inTable && f.name !== titleField);
  const modalOpen = creating || !!editing;

  return (
    <div>
      <div className="admin-page-header">
        <div>
          <h1 className="admin-page-title">{title}</h1>
          <p className="admin-page-subtitle">{subtitle || `${items.length} item${items.length === 1 ? "" : "s"}`}</p>
        </div>
        <button className="btn btn-primary" onClick={openCreate}>+ New</button>
      </div>

      {loading ? (
        <div className="empty-state"><p className="empty-state-text">Loading…</p></div>
      ) : items.length === 0 ? (
        <div className="empty-state">
          <div className="empty-state-icon">📄</div>
          <h3 className="empty-state-title">Nothing here yet</h3>
          <p className="empty-state-text">Create your first entry with the button above.</p>
        </div>
      ) : (
        <div className="admin-table-wrap">
          <table className="admin-table">
            <thead>
              <tr>
                <th>{fields.find((f) => f.name === titleField)?.label || "Title"}</th>
                {tableFields.map((f) => <th key={f.name}>{f.label}</th>)}
                <th style={{ textAlign: "right" }}>Actions</th>
              </tr>
            </thead>
            <tbody>
              {items.map((item) => (
                <tr key={item.id} style={item.isActive === false ? { opacity: 0.5 } : undefined}>
                  <td>
                    <span className="table-title">{String(item[titleField] || "—")}</span>
                    {metaField && item[metaField] != null && (
                      <div className="table-meta">{String(item[metaField])}</div>
                    )}
                  </td>
                  {tableFields.map((f) => (
                    <td key={f.name} className="table-meta">
                      {f.type === "checkbox"
                        ? (item[f.name] ? "✓" : "—")
                        : f.type === "tags"
                          ? (Array.isArray(item[f.name]) ? (item[f.name] as string[]).join(", ") : "")
                          : String(item[f.name] ?? "—").slice(0, 60)}
                    </td>
                  ))}
                  <td style={{ textAlign: "right", whiteSpace: "nowrap" }}>
                    <button className="btn btn-ghost btn-sm" onClick={() => openEdit(item)}>Edit</button>
                    <button className="btn btn-ghost btn-sm danger" onClick={() => setDeleteTarget(item)}>Delete</button>
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
        title={editing ? `Edit ${title.replace(/s$/, "")}` : `New ${title.replace(/s$/, "")}`}
        size="md"
        footer={
          <div className="modal-actions">
            <button className="btn btn-ghost" onClick={() => { setCreating(false); setEditing(null); }}>Cancel</button>
            <button className="btn btn-primary" disabled={busy} onClick={handleSubmit}>
              {busy ? "Saving…" : editing ? "Update" : "Create"}
            </button>
          </div>
        }
      >
        {fields.map((field) => (
          <div className="form-group" key={field.name}>
            <label className="form-label">{field.label}{field.required ? " *" : ""}</label>
            {field.type === "textarea" ? (
              <textarea
                className="form-textarea"
                rows={3}
                placeholder={field.placeholder}
                value={String(form[field.name] ?? "")}
                onChange={(e) => setForm({ ...form, [field.name]: e.target.value })}
              />
            ) : field.type === "checkbox" ? (
              <label style={{ display: "flex", gap: 8, alignItems: "center", cursor: "pointer" }}>
                <input
                  type="checkbox"
                  checked={!!form[field.name]}
                  onChange={(e) => setForm({ ...form, [field.name]: e.target.checked })}
                />
                <span className="table-meta">Enabled</span>
              </label>
            ) : field.type === "color" ? (
              <input
                type="color"
                className="form-input"
                style={{ height: 40, padding: 4 }}
                value={String(form[field.name] || "#06B6D4")}
                onChange={(e) => setForm({ ...form, [field.name]: e.target.value })}
              />
            ) : field.type === "tags" ? (
              <input
                className="form-input"
                placeholder="Comma-separated…"
                value={Array.isArray(form[field.name]) ? (form[field.name] as string[]).join(", ") : ""}
                onChange={(e) => setForm({ ...form, [field.name]: e.target.value.split(",").map((s) => s.trim()).filter(Boolean) })}
              />
            ) : (
              <input
                className="form-input"
                type={field.type === "number" ? "number" : "text"}
                placeholder={field.placeholder}
                value={String(form[field.name] ?? "")}
                onChange={(e) => setForm({ ...form, [field.name]: field.type === "number" ? Number(e.target.value) : e.target.value })}
              />
            )}
          </div>
        ))}
      </Modal>

      <ConfirmModal
        open={!!deleteTarget}
        onClose={() => setDeleteTarget(null)}
        onConfirm={handleDelete}
        title="Delete"
        message={`Delete "${String(deleteTarget?.[titleField] || "")}"? This cannot be undone.`}
        confirmLabel="Delete"
        variant="danger"
        loading={busy}
      />
    </div>
  );
}
