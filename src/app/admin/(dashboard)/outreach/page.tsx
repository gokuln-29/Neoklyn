"use client";

import { useCallback, useEffect, useState } from "react";
import { useToast } from "@/components/admin/Toast";

type Finding = { id: string; label: string; status: string; detail: string };

type Prospect = {
  id: string;
  businessName: string;
  contactName: string | null;
  channel: "WHATSAPP" | "EMAIL" | "INSTAGRAM" | "LINKEDIN";
  phone: string | null;
  email: string | null;
  handle: string | null;
  website: string | null;
  niche: string | null;
  city: string | null;
  observation: string | null;
  auditScore: number | null;
  auditFindings: Finding[] | null;
  draft: string | null;
  status: string;
  followUpStage: number;
  nextFollowUpAt: string | null;
  notes: string | null;
  message: string | null;
  subject: string | null;
  isFollowUp: boolean;
  followUpNumber: number | null;
  openUrl: string | null;
  openLabel: string | null;
  profileUrl: string | null;
};

type Stats = {
  needsInput: number;
  queue: number;
  ready: number;
  followUpsDue: number;
  sent: number;
  sentToday: number;
  replied: number;
  won: number;
  dailyTarget: number;
  dailySoftLimit: number;
  unprepared: number;
};

type Tab = "queue" | "ready" | "follow-ups" | "needs-input" | "sent" | "closed";

const TAB_LABELS: Record<Tab, string> = {
  queue: "Approval queue",
  ready: "Ready to send",
  "follow-ups": "Follow-ups due",
  "needs-input": "Needs your input",
  sent: "Sent",
  closed: "Closed",
};

const CHANNEL_LABEL: Record<string, string> = { WHATSAPP: "WhatsApp", EMAIL: "Email", INSTAGRAM: "Instagram", LINKEDIN: "LinkedIn" };

const SAMPLE = "business,contact_name,phone,email,website,niche,city,observation\nSri Clinic,Dr Priya,98765 43210,,sriclinic.in,clinic,Madurai,";

function scoreTone(score: number | null) {
  if (score == null) return "neutral";
  return score >= 80 ? "good" : score >= 55 ? "ok" : "poor";
}

export default function OutreachPage() {
  const { addToast } = useToast();
  const [tab, setTab] = useState<Tab>("queue");
  const [prospects, setProspects] = useState<Prospect[]>([]);
  const [stats, setStats] = useState<Stats | null>(null);
  const [loading, setLoading] = useState(true);
  const [busyId, setBusyId] = useState<string | null>(null);
  const [importText, setImportText] = useState("");
  const [importing, setImporting] = useState(false);
  const [importResult, setImportResult] = useState<{ added: number; skipped: Array<{ business: string; reason: string }> } | null>(null);
  const [preparing, setPreparing] = useState<string | null>(null);
  const [drafts, setDrafts] = useState<Record<string, string>>({});
  const [observations, setObservations] = useState<Record<string, string>>({});

  const load = useCallback(
    async (which: Tab) => {
      setLoading(true);
      try {
        const res = await fetch(`/api/admin/outreach?tab=${which}`);
        if (!res.ok) throw new Error((await res.json()).error || "Failed to load");
        const data = (await res.json()) as { prospects: Prospect[]; stats: Stats };
        setProspects(data.prospects);
        setStats(data.stats);
        setDrafts({});
      } catch (error) {
        addToast(error instanceof Error ? error.message : "Failed to load", "error");
      } finally {
        setLoading(false);
      }
    },
    [addToast]
  );

  useEffect(() => {
    void load(tab);
  }, [tab, load]);

  async function patch(id: string, body: Record<string, unknown>, success?: string) {
    setBusyId(id);
    try {
      const res = await fetch(`/api/admin/outreach/${id}`, { method: "PATCH", headers: { "Content-Type": "application/json" }, body: JSON.stringify(body) });
      const data = await res.json();
      if (!res.ok) throw new Error(data.error || "Something went wrong");
      if (success) addToast(success, "success");
      await load(tab);
      return true;
    } catch (error) {
      addToast(error instanceof Error ? error.message : "Something went wrong", "error");
      return false;
    } finally {
      setBusyId(null);
    }
  }

  async function remove(p: Prospect) {
    if (!window.confirm(`Delete ${p.businessName}?`)) return;
    setBusyId(p.id);
    try {
      const res = await fetch(`/api/admin/outreach/${p.id}`, { method: "DELETE" });
      const data = await res.json();
      if (!res.ok) throw new Error(data.error || "Could not delete");
      addToast("Deleted", "success");
      await load(tab);
    } catch (error) {
      addToast(error instanceof Error ? error.message : "Could not delete", "error");
    } finally {
      setBusyId(null);
    }
  }

  async function runImport() {
    setImporting(true);
    setImportResult(null);
    try {
      const res = await fetch("/api/admin/outreach", { method: "POST", headers: { "Content-Type": "application/json" }, body: JSON.stringify({ text: importText }) });
      const data = await res.json();
      if (!res.ok) throw new Error(data.error || "Import failed");
      setImportResult({ added: data.added, skipped: data.skipped });
      if (data.added) {
        addToast(`${data.added} prospect${data.added === 1 ? "" : "s"} added`, "success");
        setImportText("");
      }
      await load(tab);
    } catch (error) {
      addToast(error instanceof Error ? error.message : "Import failed", "error");
    } finally {
      setImporting(false);
    }
  }

  async function prepareAll() {
    let done = 0;
    try {
      for (let guard = 0; guard < 60; guard++) {
        setPreparing(done ? `Audited ${done} site${done === 1 ? "" : "s"}…` : "Auditing sites and writing drafts…");
        const res = await fetch("/api/admin/outreach/prepare", { method: "POST" });
        const data = await res.json();
        if (!res.ok) throw new Error(data.error || "Could not prepare drafts");
        done += data.processed;
        if (data.remaining === 0 || data.processed === 0) break;
      }
      addToast(done ? `Prepared ${done} prospect${done === 1 ? "" : "s"}. Review the queue.` : "Nothing new to prepare", done ? "success" : "info");
      await load(tab);
    } catch (error) {
      addToast(error instanceof Error ? error.message : "Could not prepare drafts", "error");
    } finally {
      setPreparing(null);
    }
  }

  async function copy(text: string | null) {
    if (!text) return;
    try {
      await navigator.clipboard.writeText(text);
      addToast("Message copied", "success");
    } catch {
      addToast("Could not copy; select the text and copy it", "error");
    }
  }

  const overLimit = stats ? stats.sentToday > stats.dailySoftLimit : false;
  const counts: Record<Tab, number | undefined> = {
    queue: stats?.queue,
    ready: stats?.ready,
    "follow-ups": stats?.followUpsDue,
    "needs-input": stats?.needsInput,
    sent: stats?.sent,
    closed: undefined,
  };

  return (
    <div>
      <div className="admin-page-header">
        <div>
          <h1 className="admin-page-title">Outreach</h1>
          <p className="admin-page-subtitle">You approve and send every message yourself. Nothing is sent automatically.</p>
        </div>
      </div>

      {stats && (
        <div className="stat-cards-grid oq-stats">
          <div className="stat-card">
            <div className="stat-card-value">
              {stats.sentToday}
              <span className="oq-of"> / {stats.dailyTarget}</span>
            </div>
            <div className="stat-card-label">Sent today (target)</div>
          </div>
          <div className="stat-card"><div className="stat-card-value">{stats.queue}</div><div className="stat-card-label">Waiting for approval</div></div>
          <div className="stat-card"><div className="stat-card-value">{stats.ready}</div><div className="stat-card-label">Ready to send</div></div>
          <div className="stat-card"><div className="stat-card-value">{stats.followUpsDue}</div><div className="stat-card-label">Follow-ups due</div></div>
          <div className="stat-card"><div className="stat-card-value">{stats.replied}</div><div className="stat-card-label">Replied</div></div>
          <div className="stat-card"><div className="stat-card-value">{stats.won}</div><div className="stat-card-label">Won</div></div>
        </div>
      )}

      {overLimit && (
        <p className="oq-alert" role="alert">
          You have sent more than {stats?.dailySoftLimit} messages today. Slow down: high volume gets WhatsApp and Instagram accounts restricted.
        </p>
      )}

      <details className="oq-card oq-import">
        <summary>Add prospects</summary>
        <p className="oq-help">
          Paste a table with a header row (from Google Sheets or Excel). Required: <code>business</code> and at least one of <code>phone</code>, <code>email</code> or <code>handle</code>. Optional: <code>contact_name</code>, <code>website</code>, <code>niche</code>, <code>city</code>, <code>observation</code>. Duplicates and anyone who opted out are skipped.
        </p>
        <textarea className="form-textarea" rows={6} value={importText} onChange={(e) => setImportText(e.target.value)} placeholder={SAMPLE} />
        <div className="oq-row">
          <button type="button" className="btn btn-primary btn-sm" disabled={importing || !importText.trim()} onClick={() => void runImport()}>
            {importing ? "Importing…" : "Import"}
          </button>
          {importResult && (
            <span className="oq-help">
              Added {importResult.added}. Skipped {importResult.skipped.length}
              {importResult.skipped.length > 0 && `: ${importResult.skipped.slice(0, 4).map((s) => `${s.business} (${s.reason})`).join("; ")}${importResult.skipped.length > 4 ? "…" : ""}`}
            </span>
          )}
        </div>
      </details>

      {stats && stats.unprepared > 0 && (
        <div className="oq-card oq-prepare">
          <div>
            <strong>{stats.unprepared} new prospect{stats.unprepared === 1 ? "" : "s"} to prepare.</strong>
            <p className="oq-help">This checks each website and writes a draft based on a real finding. It sends nothing.</p>
          </div>
          <button type="button" className="btn btn-primary btn-sm" disabled={!!preparing} onClick={() => void prepareAll()}>
            {preparing ?? "Audit and write drafts"}
          </button>
        </div>
      )}

      <div className="oq-tabs" role="tablist">
        {(Object.keys(TAB_LABELS) as Tab[]).map((t) => (
          <button key={t} role="tab" aria-selected={tab === t} className={tab === t ? "active" : ""} onClick={() => setTab(t)}>
            {TAB_LABELS[t]}
            {counts[t] ? <span className="oq-count">{counts[t]}</span> : null}
          </button>
        ))}
      </div>

      {loading ? (
        <p className="oq-help">Loading…</p>
      ) : prospects.length === 0 ? (
        <p className="oq-empty">
          {tab === "queue" && "Nothing waiting for approval. Add prospects above, then audit and write drafts."}
          {tab === "ready" && "No approved messages yet. Approve drafts in the queue."}
          {tab === "follow-ups" && "No follow-ups due right now."}
          {tab === "needs-input" && "Every prospect has a draft or is waiting for approval."}
          {tab === "sent" && "Nothing sent yet."}
          {tab === "closed" && "Nothing closed yet."}
        </p>
      ) : (
        <ul className="oq-list">
          {prospects.map((p) => {
            const busy = busyId === p.id;
            const draftValue = drafts[p.id] ?? p.draft ?? "";
            const contactBits = [p.contactName, p.phone && `+${p.phone}`, p.email, p.handle].filter(Boolean).join(" · ");
            return (
              <li key={p.id} className="oq-card oq-prospect">
                <div className="oq-head">
                  <div>
                    <h3>{p.businessName}</h3>
                    <p className="oq-meta">
                      {[p.niche, p.city].filter(Boolean).join(" · ") || "No niche or city"} · <span className="oq-chan">{CHANNEL_LABEL[p.channel]}</span>
                    </p>
                    <p className="oq-meta">
                      {contactBits}
                      {p.website && (
                        <>
                          {" · "}
                          <a href={p.website} target="_blank" rel="noopener noreferrer">
                            {p.website.replace(/^https?:\/\//, "").replace(/\/$/, "")}
                          </a>
                        </>
                      )}
                    </p>
                  </div>
                  {p.auditScore != null && (
                    <div className={`oq-score ${scoreTone(p.auditScore)}`} title="Website audit score">
                      {p.auditScore}
                      <span>/100</span>
                    </div>
                  )}
                </div>

                {p.auditFindings && p.auditFindings.length > 0 && (
                  <ul className="oq-findings">
                    {p.auditFindings.slice(0, 3).map((f) => (
                      <li key={f.id} title={f.detail}>
                        <span aria-hidden="true">{f.status === "fail" ? "✗" : "!"}</span> {f.label}
                      </li>
                    ))}
                  </ul>
                )}
                {p.notes && <p className="oq-note">{p.notes}</p>}

                {tab === "needs-input" && (
                  <div className="oq-field">
                    <label>What did you notice about this business? (one specific sentence)</label>
                    <textarea
                      className="form-textarea"
                      rows={2}
                      defaultValue={p.observation ?? ""}
                      onChange={(e) => setObservations((o) => ({ ...o, [p.id]: e.target.value }))}
                      placeholder="e.g. I couldn't find a way to book an appointment online."
                    />
                  </div>
                )}

                {tab !== "needs-input" && p.message && (
                  <div className="oq-field">
                    <label>
                      {p.isFollowUp ? `Follow-up ${p.followUpNumber} (due now)` : tab === "sent" || tab === "closed" ? "First message" : "Message"}
                      {p.channel === "EMAIL" && p.subject ? ` · Subject: ${p.subject}` : ""}
                    </label>
                    {(tab === "queue" || tab === "ready") && !p.isFollowUp ? (
                      <textarea
                        className="form-textarea"
                        rows={6}
                        value={draftValue}
                        onChange={(e) => setDrafts((d) => ({ ...d, [p.id]: e.target.value }))}
                        onBlur={() => {
                          if (drafts[p.id] !== undefined && drafts[p.id] !== (p.draft ?? "")) void patch(p.id, { draft: drafts[p.id] }, tab === "ready" ? "Edited: sent back to the queue for approval" : "Draft saved");
                        }}
                      />
                    ) : (
                      <p className="oq-message">{p.message}</p>
                    )}
                  </div>
                )}

                {tab === "sent" && p.nextFollowUpAt && !p.isFollowUp && (
                  <p className="oq-meta">Next follow-up: {new Date(p.nextFollowUpAt).toLocaleDateString("en-IN", { day: "numeric", month: "short" })}</p>
                )}

                <div className="oq-actions">
                  {tab === "queue" && (
                    <>
                      <button type="button" className="btn btn-primary btn-sm" disabled={busy || !draftValue.trim()} onClick={() => void patch(p.id, { action: "approve" }, "Approved")}>Approve</button>
                      <button type="button" className="btn btn-ghost btn-sm" disabled={busy} onClick={() => void patch(p.id, { action: "regenerate" }, "Redrafted")}>Redraft</button>
                      <button type="button" className="btn btn-ghost btn-sm" disabled={busy} onClick={() => void patch(p.id, { action: "skip" }, "Skipped")}>Skip</button>
                    </>
                  )}
                  {tab === "needs-input" && (
                    <>
                      <button type="button" className="btn btn-primary btn-sm" disabled={busy || !(observations[p.id] ?? p.observation ?? "").trim()} onClick={() => void patch(p.id, { observation: observations[p.id] ?? p.observation ?? "", action: "regenerate" }, "Draft created: check the queue")}>Create draft</button>
                      <button type="button" className="btn btn-ghost btn-sm" disabled={busy} onClick={() => void patch(p.id, { action: "skip" }, "Skipped")}>Skip</button>
                      <button type="button" className="btn btn-ghost btn-sm" disabled={busy} onClick={() => void remove(p)}>Delete</button>
                    </>
                  )}
                  {(tab === "ready" || tab === "follow-ups") && (
                    <>
                      {p.openUrl && (
                        <a className="btn btn-primary btn-sm" href={p.openUrl} target="_blank" rel="noopener noreferrer">{p.openLabel}</a>
                      )}
                      {p.profileUrl && (
                        <a className="btn btn-ghost btn-sm" href={p.profileUrl} target="_blank" rel="noopener noreferrer">Open profile</a>
                      )}
                      <button type="button" className="btn btn-ghost btn-sm" onClick={() => void copy(p.message)}>Copy message</button>
                      <button type="button" className="btn btn-primary btn-sm" disabled={busy} onClick={() => void patch(p.id, { action: "sent" }, "Marked as sent")}>I sent it</button>
                    </>
                  )}
                  {tab === "ready" && (
                    <button type="button" className="btn btn-ghost btn-sm" disabled={busy} onClick={() => void patch(p.id, { action: "requeue" })}>Back to queue</button>
                  )}
                  {(tab === "follow-ups" || tab === "sent") && (
                    <>
                      <button type="button" className="btn btn-ghost btn-sm" disabled={busy} onClick={() => void patch(p.id, { action: "replied" }, "Marked as replied")}>Replied</button>
                      <button type="button" className="btn btn-ghost btn-sm" disabled={busy} onClick={() => void patch(p.id, { action: "won" }, "Marked as won")}>Won</button>
                      <button type="button" className="btn btn-ghost btn-sm" disabled={busy} onClick={() => void patch(p.id, { action: "lost" }, "Marked as lost")}>Not interested</button>
                      <button
                        type="button"
                        className="btn btn-ghost btn-sm"
                        disabled={busy}
                        onClick={() => {
                          if (window.confirm(`Mark ${p.businessName} as "do not contact"? They will never be messaged again.`)) void patch(p.id, { action: "optout" }, "Marked as do not contact");
                        }}
                      >
                        Do not contact
                      </button>
                    </>
                  )}
                  {tab === "closed" && ["SKIPPED", "LOST"].includes(p.status) && (
                    <button type="button" className="btn btn-ghost btn-sm" disabled={busy} onClick={() => void patch(p.id, { action: "requeue" }, "Back in the queue")}>Back to queue</button>
                  )}
                  {tab === "closed" && <span className="oq-chan">{p.status.replace("_", " ").toLowerCase()}</span>}
                </div>
              </li>
            );
          })}
        </ul>
      )}

      <style>{`
        .oq-stats { grid-template-columns: repeat(auto-fit, minmax(150px, 1fr)); }
        .oq-of { font-size: 0.55em; color: var(--admin-text-muted); font-weight: 500; }
        .oq-card { background: var(--admin-surface); border: 1px solid var(--admin-border); border-radius: var(--admin-radius); padding: 1.1rem 1.25rem; }
        .oq-alert { margin: 1rem 0 0; padding: 0.75rem 1rem; border: 1px solid rgba(239,68,68,0.45); background: rgba(239,68,68,0.08); border-radius: var(--admin-radius-sm); font-size: 0.9rem; }
        .oq-import { margin-top: 1rem; }
        .oq-import summary { cursor: pointer; font-weight: 600; }
        .oq-import textarea { margin-top: 0.75rem; font-family: ui-monospace, monospace; font-size: 12px; }
        .oq-help { color: var(--admin-text-muted); font-size: 0.82rem; line-height: 1.6; margin: 0.5rem 0 0; }
        .oq-help code { background: var(--admin-bg); padding: 1px 5px; border-radius: 4px; }
        .oq-row { display: flex; gap: 1rem; align-items: center; margin-top: 0.75rem; flex-wrap: wrap; }
        .oq-prepare { margin-top: 1rem; display: flex; justify-content: space-between; gap: 1rem; align-items: center; flex-wrap: wrap; border-color: rgba(6,182,212,0.4); }
        .oq-prepare p { margin: 0.2rem 0 0; }
        .oq-tabs { display: flex; gap: 0.25rem; margin: 1.5rem 0 1rem; border-bottom: 1px solid var(--admin-border); flex-wrap: wrap; }
        .oq-tabs button { background: none; border: none; color: var(--admin-text-muted); padding: 0.7rem 1rem; cursor: pointer; font-size: 0.88rem; border-bottom: 2px solid transparent; margin-bottom: -1px; }
        .oq-tabs button:hover { color: var(--admin-text); }
        .oq-tabs button.active { color: var(--admin-accent); border-bottom-color: var(--admin-accent); }
        .oq-count { margin-left: 0.4rem; background: var(--admin-accent-glow); color: var(--admin-accent); border-radius: 999px; padding: 1px 8px; font-size: 0.75rem; }
        .oq-empty { color: var(--admin-text-muted); padding: 2rem 0; }
        .oq-list { list-style: none; margin: 0; padding: 0; display: grid; gap: 1rem; }
        .oq-head { display: flex; justify-content: space-between; gap: 1rem; align-items: flex-start; }
        .oq-prospect h3 { margin: 0 0 0.2rem; font-size: 1.05rem; }
        .oq-meta { margin: 0.15rem 0 0; color: var(--admin-text-muted); font-size: 0.82rem; overflow-wrap: anywhere; }
        .oq-meta a { color: var(--admin-accent); }
        .oq-chan { text-transform: capitalize; }
        .oq-score { font-family: ui-monospace, monospace; font-size: 1.4rem; font-weight: 700; text-align: right; }
        .oq-score span { font-size: 0.6em; color: var(--admin-text-muted); font-weight: 400; }
        .oq-score.good { color: var(--admin-green); }
        .oq-score.ok { color: var(--admin-yellow); }
        .oq-score.poor { color: var(--admin-red); }
        .oq-findings { list-style: none; margin: 0.6rem 0 0; padding: 0; display: flex; gap: 0.5rem; flex-wrap: wrap; }
        .oq-findings li { background: var(--admin-bg); border: 1px solid var(--admin-border); border-radius: 999px; padding: 2px 10px; font-size: 0.75rem; color: var(--admin-text-muted); }
        .oq-note { margin: 0.6rem 0 0; font-size: 0.8rem; color: var(--admin-yellow); }
        .oq-field { margin-top: 0.9rem; }
        .oq-field label { display: block; font-size: 0.75rem; font-weight: 600; color: var(--admin-text-muted); margin-bottom: 6px; }
        .oq-message { margin: 0; white-space: pre-wrap; font-size: 0.9rem; line-height: 1.6; background: var(--admin-bg); border: 1px solid var(--admin-border); border-radius: var(--admin-radius-sm); padding: 0.75rem 0.9rem; }
        .oq-actions { display: flex; gap: 0.5rem; flex-wrap: wrap; margin-top: 1rem; align-items: center; }
        @media (max-width: 640px) { .oq-head { flex-direction: column; } .oq-score { text-align: left; } }
      `}</style>
    </div>
  );
}
