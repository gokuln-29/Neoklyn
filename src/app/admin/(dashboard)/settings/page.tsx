"use client";

import { useCallback, useEffect, useState } from "react";
import { useToast } from "@/components/admin/Toast";

type Setting = {
  id: string;
  key: string;
  value: unknown;
  group: string;
  label: string | null;
};

const GROUP_LABELS: Record<string, string> = {
  GENERAL: "General",
  SEO: "SEO Defaults",
  SOCIAL: "Social Links",
  FOOTER: "Footer",
  NAV: "Navigation",
  HOMEPAGE: "Homepage",
};

export default function SettingsPage() {
  const { addToast } = useToast();
  const [settings, setSettings] = useState<Setting[]>([]);
  const [loading, setLoading] = useState(true);
  const [drafts, setDrafts] = useState<Record<string, string>>({});
  const [savingKey, setSavingKey] = useState<string | null>(null);
  const [newKey, setNewKey] = useState("");
  const [newValue, setNewValue] = useState("");
  const [newGroup, setNewGroup] = useState("GENERAL");

  const load = useCallback(async () => {
    setLoading(true);
    try {
      const res = await fetch("/api/admin/settings");
      if (!res.ok) throw new Error();
      const data = await res.json();
      setSettings(data.settings);
      const d: Record<string, string> = {};
      for (const s of data.settings) {
        d[s.key] = typeof s.value === "string" ? s.value : JSON.stringify(s.value);
      }
      setDrafts(d);
    } catch {
      addToast("Failed to load settings", "error");
    } finally {
      setLoading(false);
    }
  }, [addToast]);

  useEffect(() => { load(); }, [load]);

  async function save(setting: Setting) {
    setSavingKey(setting.key);
    try {
      const raw = drafts[setting.key] ?? "";
      let value: unknown = raw;
      // Try to preserve JSON values (arrays/objects/numbers/booleans)
      if (typeof setting.value !== "string") {
        try { value = JSON.parse(raw); } catch { value = raw; }
      }
      const res = await fetch("/api/admin/settings", {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ key: setting.key, value, group: setting.group }),
      });
      if (!res.ok) throw new Error();
      addToast(`Saved ${setting.key}`, "success");
    } catch {
      addToast(`Failed to save ${setting.key}`, "error");
    } finally {
      setSavingKey(null);
    }
  }

  async function addSetting() {
    if (!newKey.trim()) {
      addToast("Key is required", "warning");
      return;
    }
    try {
      const res = await fetch("/api/admin/settings", {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ key: newKey.trim(), value: newValue, group: newGroup }),
      });
      if (!res.ok) throw new Error();
      addToast("Setting added", "success");
      setNewKey("");
      setNewValue("");
      load();
    } catch {
      addToast("Failed to add setting", "error");
    }
  }

  const groups = [...new Set(settings.map((s) => s.group))];

  return (
    <div>
      <div className="admin-page-header">
        <div>
          <h1 className="admin-page-title">Settings</h1>
          <p className="admin-page-subtitle">Global site configuration (key–value)</p>
        </div>
      </div>

      {loading ? (
        <div className="empty-state"><p className="empty-state-text">Loading…</p></div>
      ) : (
        <>
          {groups.map((group) => (
            <div key={group} className="pe-panel" style={{ marginBottom: "1.25rem" }}>
              <h3 className="pe-panel-title">{GROUP_LABELS[group] || group}</h3>
              {settings.filter((s) => s.group === group).map((setting) => (
                <div key={setting.key} className="form-group" style={{ display: "flex", gap: 8, alignItems: "flex-end" }}>
                  <div style={{ flex: 1 }}>
                    <label className="form-label">
                      {setting.label || setting.key}
                      <span className="table-meta" style={{ marginLeft: 6, fontSize: 10 }}>{setting.key}</span>
                    </label>
                    <input
                      className="form-input"
                      value={drafts[setting.key] ?? ""}
                      onChange={(e) => setDrafts({ ...drafts, [setting.key]: e.target.value })}
                    />
                  </div>
                  <button
                    className="btn btn-ghost"
                    disabled={savingKey === setting.key}
                    onClick={() => save(setting)}
                  >
                    {savingKey === setting.key ? "…" : "Save"}
                  </button>
                </div>
              ))}
            </div>
          ))}

          {/* Add new setting */}
          <div className="pe-panel">
            <h3 className="pe-panel-title">Add Setting</h3>
            <div style={{ display: "flex", gap: 8, flexWrap: "wrap", alignItems: "flex-end" }}>
              <div className="form-group" style={{ flex: "1 1 160px", marginBottom: 0 }}>
                <label className="form-label">Key</label>
                <input className="form-input" placeholder="site_tagline" value={newKey} onChange={(e) => setNewKey(e.target.value)} />
              </div>
              <div className="form-group" style={{ flex: "2 1 220px", marginBottom: 0 }}>
                <label className="form-label">Value</label>
                <input className="form-input" value={newValue} onChange={(e) => setNewValue(e.target.value)} />
              </div>
              <div className="form-group" style={{ width: 150, marginBottom: 0 }}>
                <label className="form-label">Group</label>
                <select className="form-select" value={newGroup} onChange={(e) => setNewGroup(e.target.value)}>
                  {Object.entries(GROUP_LABELS).map(([k, v]) => (
                    <option key={k} value={k}>{v}</option>
                  ))}
                </select>
              </div>
              <button className="btn btn-primary" onClick={addSetting}>+ Add</button>
            </div>
          </div>
        </>
      )}
    </div>
  );
}
