"use client";

import Link from "next/link";
import { useState } from "react";
import { getAttribution, trackEvent } from "@/lib/track";
import { whatsappUrl } from "@/lib/contact";
import type { AuditCheck, AuditReport } from "@/lib/websiteAudit";

const STATUS_ICON: Record<AuditCheck["status"], string> = { pass: "✓", warn: "!", fail: "✗" };
const STATUS_WORD: Record<AuditCheck["status"], string> = { pass: "Good", warn: "Could be better", fail: "Needs fixing" };

function scoreTone(score: number): "good" | "ok" | "poor" {
  return score >= 80 ? "good" : score >= 55 ? "ok" : "poor";
}

function hostOf(url: string) {
  try {
    return new URL(url).hostname.replace(/^www\./, "");
  } catch {
    return url;
  }
}

export default function WebsiteAuditForm() {
  const [url, setUrl] = useState("");
  const [email, setEmail] = useState("");
  const [name, setName] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [report, setReport] = useState<AuditReport | null>(null);
  const [emailed, setEmailed] = useState(false);

  async function onSubmit(event: React.FormEvent) {
    event.preventDefault();
    if (loading) return;
    setError("");
    setLoading(true);
    trackEvent("website_audit_start", { form_name: "website_audit" });
    try {
      const res = await fetch("/api/website-audit", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ url, email, name, attribution: getAttribution() }),
      });
      const data = (await res.json()) as { report?: AuditReport; emailed?: boolean; error?: string };
      if (!res.ok || !data.report) throw new Error(data.error || "Something went wrong. Please try again.");
      setReport(data.report);
      setEmailed(!!data.emailed);
      trackEvent("website_audit_complete", { form_name: "website_audit", score: data.report.score });
      window.scrollTo({ top: 0, behavior: "smooth" });
    } catch (err) {
      setError(err instanceof Error ? err.message : "Something went wrong. Please try again.");
    } finally {
      setLoading(false);
    }
  }

  if (report) {
    const tone = scoreTone(report.score);
    const waMessage = `Hi NeoKlyn, I ran the website audit on ${hostOf(report.finalUrl)} and got ${report.score}/100. Can you help me fix it?`;
    return (
      <div className="wa-wrap" data-track-location="website_audit_result">
        <div className="wa-card wa-score-card">
          <div className="wa-site">{hostOf(report.finalUrl)}</div>
          <div className={`wa-score ${tone}`} aria-label={`Score ${report.score} out of 100`}>
            {report.score}
            <span>/100</span>
          </div>
          <p className="wa-verdict">{report.verdict}</p>
          {emailed && <p className="wa-note">We&apos;ve also emailed you a copy of this report.</p>}
        </div>

        {report.topFixes.length > 0 && (
          <div className="wa-card">
            <h2 className="wa-h">Fix these first</h2>
            <ol className="wa-fixes">
              {report.topFixes.map((fix) => (
                <li key={fix.id}>
                  <strong>{fix.label}</strong>
                  <p>{fix.detail}</p>
                  <p className="wa-fix">{fix.fix}</p>
                </li>
              ))}
            </ol>
          </div>
        )}

        <div className="wa-card">
          <h2 className="wa-h">Full results</h2>
          {report.categories.map((cat) => (
            <details key={cat.id} className="wa-cat" open={cat.checks.some((c) => c.status === "fail")}>
              <summary>
                <span>{cat.label}</span>
                <span className={`wa-cat-score ${scoreTone(cat.score)}`}>{cat.score}/100</span>
              </summary>
              <ul>
                {cat.checks.map((check) => (
                  <li key={check.id} className={`wa-check ${check.status}`}>
                    <span className="wa-icon" aria-hidden="true">
                      {STATUS_ICON[check.status]}
                    </span>
                    <div>
                      <strong>{check.label}</strong> <span className="wa-status">{STATUS_WORD[check.status]}</span>
                      <p>{check.detail}</p>
                    </div>
                  </li>
                ))}
              </ul>
            </details>
          ))}
        </div>

        <div className="wa-card wa-cta">
          <h2 className="wa-h">Want these fixed?</h2>
          <p>We can fix the issues above or rebuild the site, usually in 2-5 weeks, at a fixed price. Get a rough number in two minutes, or talk to us directly.</p>
          <div className="wa-btns">
            <Link href="/estimate" className="btn-main">
              Get a free estimate ↗
            </Link>
            <a href={whatsappUrl(waMessage)} target="_blank" rel="noopener noreferrer" className="btn-ghost">
              Talk to us on WhatsApp
            </a>
            <button type="button" className="btn-ghost" onClick={() => setReport(null)}>
              Audit another site
            </button>
          </div>
        </div>

        <ul className="wa-limits">
          {report.limitations.map((text) => (
            <li key={text}>{text}</li>
          ))}
        </ul>
        <Styles />
      </div>
    );
  }

  return (
    <div className="wa-wrap">
      <form className="wa-card wa-form" onSubmit={onSubmit} noValidate>
        <label className="wa-field">
          <span>Your website address *</span>
          <input
            type="text"
            inputMode="url"
            autoComplete="url"
            autoCapitalize="none"
            spellCheck={false}
            placeholder="yourbusiness.com"
            value={url}
            onChange={(e) => setUrl(e.target.value)}
            required
          />
        </label>
        <label className="wa-field">
          <span>Email, to send you the report *</span>
          <input type="email" autoComplete="email" placeholder="you@company.com" value={email} onChange={(e) => setEmail(e.target.value)} required />
        </label>
        <label className="wa-field">
          <span>Name (optional)</span>
          <input type="text" autoComplete="name" placeholder="Your name" value={name} onChange={(e) => setName(e.target.value)} />
        </label>
        {error && (
          <div className="wa-error" role="alert">
            {error}
          </div>
        )}
        <button type="submit" className="btn-main wa-submit" disabled={loading || !url.trim() || !email.trim()}>
          {loading ? "Checking your site… (about 10 seconds)" : "Run my free audit →"}
        </button>
        <p className="wa-note">
          We only read your public homepage. We use your email to send the report and may follow up about it. No spam. See our{" "}
          <Link href="/privacy">privacy policy</Link>.
        </p>
      </form>
      <Styles />
    </div>
  );
}

function Styles() {
  return (
    <style>{`
      .wa-wrap { max-width: 760px; margin: 0 auto; padding: 0 1rem; display: flex; flex-direction: column; gap: 1.2rem; }
      .wa-card { background: rgba(12,12,18,0.78); border: 1px solid rgba(255,255,255,0.08); border-radius: 18px; padding: 1.7rem; backdrop-filter: blur(14px); -webkit-backdrop-filter: blur(14px); }
      .wa-form { display: flex; flex-direction: column; gap: 1rem; }
      .wa-field { display: flex; flex-direction: column; gap: 0.4rem; }
      .wa-field span { font-family: 'JetBrains Mono', monospace; font-size: 0.68rem; text-transform: uppercase; letter-spacing: 0.07em; color: var(--muted); }
      .wa-field input { border: 1px solid rgba(255,255,255,0.12); border-radius: 10px; background: rgba(255,255,255,0.03); color: var(--white); padding: 0.85rem 0.95rem; font-size: 1rem; outline: none; }
      .wa-field input:focus { border-color: rgba(6,182,212,0.55); box-shadow: 0 0 0 2px rgba(6,182,212,0.12); }
      .wa-submit { width: 100%; border: none; cursor: pointer; padding: 0.95rem 1rem; border-radius: 10px; }
      .wa-submit:disabled { opacity: 0.55; cursor: not-allowed; }
      .wa-error { border: 1px solid rgba(248,113,113,0.4); background: rgba(248,113,113,0.08); color: #fecaca; border-radius: 10px; padding: 0.7rem 0.85rem; font-size: 0.85rem; }
      .wa-note { font-size: 0.78rem; line-height: 1.6; color: var(--muted); margin: 0; }
      .wa-note a { color: var(--cyan); }
      .wa-score-card { text-align: center; }
      .wa-site { font-family: 'JetBrains Mono', monospace; font-size: 0.8rem; color: var(--muted); letter-spacing: 0.05em; }
      .wa-score { font-family: 'JetBrains Mono', monospace; font-size: clamp(4rem, 14vw, 6.5rem); font-weight: 700; line-height: 1.1; margin: 0.4rem 0; }
      .wa-score span { font-size: 0.3em; color: var(--muted); margin-left: 0.15em; }
      .wa-score.good, .wa-cat-score.good { color: #34d399; }
      .wa-score.ok, .wa-cat-score.ok { color: #fbbf24; }
      .wa-score.poor, .wa-cat-score.poor { color: #f87171; }
      .wa-verdict { font-size: 1.1rem; line-height: 1.6; margin: 0 auto 0.6rem; max-width: 36ch; }
      .wa-h { font-size: 1.15rem; margin: 0 0 1rem; font-weight: 600; }
      .wa-fixes { margin: 0; padding-left: 1.2rem; display: flex; flex-direction: column; gap: 1.1rem; }
      .wa-fixes p { margin: 0.3rem 0 0; color: rgba(255,255,255,0.8); line-height: 1.65; font-size: 0.92rem; }
      .wa-fixes .wa-fix { color: var(--cyan); }
      .wa-cat { border-top: 1px solid rgba(255,255,255,0.08); padding: 0.4rem 0; }
      .wa-cat:first-of-type { border-top: none; }
      .wa-cat summary { display: flex; justify-content: space-between; gap: 1rem; cursor: pointer; padding: 0.7rem 0; font-weight: 500; list-style: none; }
      .wa-cat summary::-webkit-details-marker { display: none; }
      .wa-cat-score { font-family: 'JetBrains Mono', monospace; font-size: 0.85rem; }
      .wa-cat ul { list-style: none; margin: 0 0 0.6rem; padding: 0; display: flex; flex-direction: column; gap: 0.8rem; }
      .wa-check { display: flex; gap: 0.75rem; align-items: flex-start; }
      .wa-check p { margin: 0.2rem 0 0; font-size: 0.86rem; line-height: 1.6; color: var(--muted); }
      .wa-icon { flex: none; width: 22px; height: 22px; border-radius: 999px; display: inline-flex; align-items: center; justify-content: center; font-size: 0.75rem; font-weight: 700; margin-top: 0.1rem; }
      .wa-check.pass .wa-icon { background: rgba(52,211,153,0.15); color: #34d399; }
      .wa-check.warn .wa-icon { background: rgba(251,191,36,0.15); color: #fbbf24; }
      .wa-check.fail .wa-icon { background: rgba(248,113,113,0.15); color: #f87171; }
      .wa-status { font-family: 'JetBrains Mono', monospace; font-size: 0.66rem; text-transform: uppercase; letter-spacing: 0.05em; color: var(--muted); margin-left: 0.4rem; }
      .wa-cta p { color: rgba(255,255,255,0.82); line-height: 1.7; margin: 0 0 1.2rem; }
      .wa-btns { display: flex; flex-wrap: wrap; gap: 0.75rem; }
      .wa-btns button { cursor: pointer; }
      .wa-limits { margin: 0; padding-left: 1.1rem; color: var(--muted); font-size: 0.78rem; line-height: 1.7; }
      @media (max-width: 640px) {
        .wa-card { padding: 1.15rem; }
        .wa-btns > * { flex: 1 1 100%; justify-content: center; text-align: center; }
      }
    `}</style>
  );
}
