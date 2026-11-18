"use client";

import { useState } from "react";

export default function UnsubscribeForm({ e, t, email }: { e: string; t: string; email: string }) {
  const [state, setState] = useState<"idle" | "loading" | "done" | "error">("idle");

  async function submit() {
    setState("loading");
    try {
      const res = await fetch("/api/unsubscribe", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ e, t }),
      });
      setState(res.ok ? "done" : "error");
    } catch {
      setState("error");
    }
  }

  if (state === "done") {
    return <p style={{ lineHeight: 1.7 }}>Done. <strong>{email}</strong> won&apos;t get any more follow-up emails from us. If you enquired about a project, we may still reply to you directly.</p>;
  }

  return (
    <>
      <p style={{ color: "var(--muted)", lineHeight: 1.7, marginBottom: "1.5rem" }}>
        Stop follow-up emails to <strong style={{ color: "var(--white)" }}>{email}</strong>?
      </p>
      <button type="button" className="btn-main" onClick={submit} disabled={state === "loading"} style={{ border: "none", cursor: "pointer" }}>
        {state === "loading" ? "Unsubscribing…" : "Yes, unsubscribe me"}
      </button>
      {state === "error" && (
        <p style={{ color: "#fca5a5", marginTop: "1rem" }}>
          Something went wrong. Please email <a href="mailto:hello@neoklyn.com" style={{ color: "var(--cyan)" }}>hello@neoklyn.com</a>.
        </p>
      )}
    </>
  );
}
