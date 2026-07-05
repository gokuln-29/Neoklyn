"use client";

import { useCallback, useEffect, useState } from "react";
import { StatusBadge } from "@/components/admin/Badge";
import Modal, { ConfirmModal } from "@/components/admin/Modal";
import { useToast } from "@/components/admin/Toast";

type Lead = {
  id: string;
  type: string;
  name: string | null;
  email: string;
  phone: string | null;
  company: string | null;
  message: string | null;
  source: string | null;
  status: string;
  metadata: Record<string, unknown> | null;
  createdAt: string;
};

const TYPE_LABELS: Record<string, string> = {
  CONTACT: "Contact",
  CONSULTATION: "Consultation",
  NEWSLETTER: "Newsletter",
  AI_DEMO: "AI Chat",
  PDF_DOWNLOAD: "PDF",
};

export default function LeadsPage() {
  const { addToast } = useToast();
  const [leads, setLeads] = useState<Lead[]>([]);
  const [loading, setLoading] = useState(true);
  const [page, setPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [total, setTotal] = useState(0);
  const [type, setType] = useState("");
  const [status, setStatus] = useState("");
  const [search, setSearch] = useState("");
  const [from, setFrom] = useState("");
  const [to, setTo] = useState("");
  const [viewing, setViewing] = useState<Lead | null>(null);
  const [deleteTarget, setDeleteTarget] = useState<Lead | null>(null);
  const [busy, setBusy] = useState(false);

  const load = useCallback(async () => {
    setLoading(true);
    try {
      const qs = new URLSearchParams({ page: String(page), perPage: "25" });
      if (type) qs.set("type", type);
      if (status) qs.set("status", status);
      if (search) qs.set("search", search);
      if (from) qs.set("from", from);
      if (to) qs.set("to", to);
      const res = await fetch(`/api/admin/leads?${qs}`);
      if (!res.ok) throw new Error();
      const data = await res.json();
      setLeads(data.leads);
      setTotalPages(data.pagination.totalPages || 1);
      setTotal(data.pagination.total);
    } catch {
      addToast("Failed to load leads", "error");
    } finally {
      setLoading(false);
    }
  }, [page, type, status, search, from, to, addToast]);

  useEffect(() => { load(); }, [load]);

  async function updateStatus(lead: Lead, newStatus: string) {
    try {
      const res = await fetch(`/api/admin/leads/${lead.id}`, {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ status: newStatus }),
      });
      if (!res.ok) throw new Error();
      addToast("Status updated", "success");
      load();
      if (viewing?.id === lead.id) setViewing({ ...viewing, status: newStatus });
    } catch {
      addToast("Failed to update status", "error");
    }
  }

  async function handleDelete() {
    if (!deleteTarget) return;
    setBusy(true);
    try {
      const res = await fetch(`/api/admin/leads/${deleteTarget.id}`, { method: "DELETE" });
      if (!res.ok) throw new Error();
      addToast("Lead deleted", "success");
      setDeleteTarget(null);
      load();
    } catch {
      addToast("Failed to delete lead", "error");
    } finally {
      setBusy(false);
    }
  }

  return (
    <div>
      <div className="admin-page-header">
        <div>
          <h1 className="admin-page-title">Leads</h1>
          <p className="admin-page-subtitle">{total} lead{total === 1 ? "" : "s"}</p>
        </div>
      </div>

      {/* Filters */}
      <div style={{ display: "flex", gap: "0.75rem", flexWrap: "wrap", marginBottom: "1.25rem" }}>
        <input
          className="form-input"
          style={{ flex: "1 1 180px", maxWidth: 260 }}
          placeholder="Search email, name, company…"
          value={search}
          onChange={(e) => { setSearch(e.target.value); setPage(1); }}
        />
        <select className="form-select" style={{ width: 150 }} value={type} onChange={(e) => { setType(e.target.value); setPage(1); }}>
          <option value="">All sources</option>
          <option value="CONTACT">Contact</option>
          <option value="CONSULTATION">Consultation</option>
          <option value="NEWSLETTER">Newsletter</option>
          <option value="AI_DEMO">AI Chat</option>
          <option value="PDF_DOWNLOAD">PDF Download</option>
        </select>
        <select className="form-select" style={{ width: 140 }} value={status} onChange={(e) => { setStatus(e.target.value); setPage(1); }}>
          <option value="">All statuses</option>
          <option value="NEW">New</option>
          <option value="CONTACTED">Contacted</option>
          <option value="QUALIFIED">Qualified</option>
          <option value="CLOSED">Closed</option>
        </select>
        <input type="date" className="form-input" style={{ width: 150 }} value={from} onChange={(e) => { setFrom(e.target.value); setPage(1); }} />
        <input type="date" className="form-input" style={{ width: 150 }} value={to} onChange={(e) => { setTo(e.target.value); setPage(1); }} />
      </div>

      {loading ? (
        <div className="empty-state"><p className="empty-state-text">Loading…</p></div>
      ) : leads.length === 0 ? (
        <div className="empty-state">
          <div className="empty-state-icon">📬</div>
          <h3 className="empty-state-title">No leads yet</h3>
          <p className="empty-state-text">Leads from the contact form, estimator, and KLYN chatbot will appear here.</p>
        </div>
      ) : (
        <div className="admin-table-wrap">
          <table className="admin-table">
            <thead>
              <tr>
                <th>Lead</th>
                <th>Source</th>
                <th>Status</th>
                <th>Date</th>
                <th style={{ textAlign: "right" }}>Actions</th>
              </tr>
            </thead>
            <tbody>
              {leads.map((lead) => (
                <tr key={lead.id}>
                  <td>
                    <button className="table-title" style={{ background: "none", border: "none", cursor: "pointer", padding: 0, textAlign: "left" }} onClick={() => setViewing(lead)}>
                      {lead.name || lead.email}
                    </button>
                    <div className="table-meta">{lead.email}{lead.company ? ` · ${lead.company}` : ""}</div>
                  </td>
                  <td>
                    <span className="table-meta">{TYPE_LABELS[lead.type] || lead.type}{lead.source ? ` — ${lead.source}` : ""}</span>
                  </td>
                  <td>
                    <select
                      className="form-select"
                      style={{ width: 130, padding: "4px 8px", fontSize: 12 }}
                      value={lead.status}
                      onChange={(e) => updateStatus(lead, e.target.value)}
                    >
                      <option value="NEW">New</option>
                      <option value="CONTACTED">Contacted</option>
                      <option value="QUALIFIED">Qualified</option>
                      <option value="CLOSED">Closed</option>
                    </select>
                  </td>
                  <td className="table-meta">
                    {new Date(lead.createdAt).toLocaleDateString("en-US", { month: "short", day: "numeric", year: "numeric" })}
                  </td>
                  <td style={{ textAlign: "right", whiteSpace: "nowrap" }}>
                    <button className="btn btn-ghost btn-sm" onClick={() => setViewing(lead)}>View</button>
                    <a className="btn btn-ghost btn-sm" href={`mailto:${lead.email}`}>Email</a>
                    <button className="btn btn-ghost btn-sm danger" onClick={() => setDeleteTarget(lead)}>Delete</button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}

      {totalPages > 1 && (
        <div style={{ display: "flex", justifyContent: "center", gap: "0.5rem", marginTop: "1.5rem", alignItems: "center" }}>
          <button className="btn btn-ghost btn-sm" disabled={page <= 1} onClick={() => setPage(page - 1)}>← Prev</button>
          <span className="table-meta">Page {page} of {totalPages}</span>
          <button className="btn btn-ghost btn-sm" disabled={page >= totalPages} onClick={() => setPage(page + 1)}>Next →</button>
        </div>
      )}

      {/* Detail modal */}
      <Modal
        open={!!viewing}
        onClose={() => setViewing(null)}
        title={viewing?.name || viewing?.email || "Lead"}
        size="md"
      >
        {viewing && (
          <div style={{ display: "flex", flexDirection: "column", gap: 10, fontSize: 14 }}>
            <div style={{ display: "flex", gap: 8, alignItems: "center" }}>
              <StatusBadge status={viewing.status} />
              <span className="table-meta">{TYPE_LABELS[viewing.type]} · {viewing.source || "unknown source"}</span>
            </div>
            <div><strong>Email:</strong> <a href={`mailto:${viewing.email}`} style={{ color: "#06b6d4" }}>{viewing.email}</a></div>
            {viewing.phone && <div><strong>Phone:</strong> {viewing.phone}</div>}
            {viewing.company && <div><strong>Company:</strong> {viewing.company}</div>}
            {viewing.message && (
              <div>
                <strong>Message:</strong>
                <p style={{ whiteSpace: "pre-wrap", marginTop: 4, color: "rgba(255,255,255,0.7)" }}>{viewing.message}</p>
              </div>
            )}
            {viewing.metadata && Object.keys(viewing.metadata).length > 0 && (
              <div>
                <strong>Details:</strong>
                <pre style={{ fontSize: 12, background: "rgba(0,0,0,0.3)", padding: 10, borderRadius: 8, overflow: "auto", marginTop: 4 }}>
                  {JSON.stringify(viewing.metadata, null, 2)}
                </pre>
              </div>
            )}
            <div className="table-meta">
              Received {new Date(viewing.createdAt).toLocaleString()}
            </div>
          </div>
        )}
      </Modal>

      <ConfirmModal
        open={!!deleteTarget}
        onClose={() => setDeleteTarget(null)}
        onConfirm={handleDelete}
        title="Delete lead"
        message={`Delete lead ${deleteTarget?.email}? This cannot be undone.`}
        confirmLabel="Delete"
        variant="danger"
        loading={busy}
      />
    </div>
  );
}
