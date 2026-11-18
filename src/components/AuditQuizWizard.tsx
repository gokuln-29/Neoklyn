"use client";

import Link from "next/link";
import { useState } from "react";
import { getAttribution, trackEvent } from "@/lib/track";
import { AUDIT_QUESTIONS, type AuditAnswers } from "@/data/auditQuestions";

type AuditResult = {
  segment: "hot" | "warm" | "cold";
  score: number;
  takeaway: string;
};

const TOTAL_STEPS = AUDIT_QUESTIONS.length + 1; // + email capture step

function isValidEmail(email: string) {
  return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email.trim());
}

function getUtmParam(name: string): string | undefined {
  if (typeof window === "undefined") return undefined;
  return new URLSearchParams(window.location.search).get(name) || undefined;
}

export default function AuditQuizWizard() {
  const [step, setStep] = useState(1);
  const [answers, setAnswers] = useState<Partial<AuditAnswers>>({});
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [touched, setTouched] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState("");
  const [result, setResult] = useState<AuditResult | null>(null);

  const isEmailStep = step === TOTAL_STEPS;
  const currentQuestion = !isEmailStep ? AUDIT_QUESTIONS[step - 1] : null;
  const emailError = !isValidEmail(email) ? "Enter a valid email." : "";

  function selectAnswer(key: string, value: string) {
    setAnswers((prev) => ({ ...prev, [key]: value }));
    setTimeout(() => setStep((prev) => Math.min(TOTAL_STEPS, prev + 1)), 180);
  }

  async function submit() {
    setTouched(true);
    if (emailError) return;

    setIsLoading(true);
    setError("");

    try {
      const response = await fetch("/api/audit", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          answers,
          name,
          email,
          utmSource: getUtmParam("utm_source"),
          utmCampaign: getUtmParam("utm_campaign"),
          attribution: getAttribution(),
        }),
      });

      const payload = (await response.json()) as AuditResult & { error?: string };
      if (!response.ok) throw new Error(payload.error || "Unable to process the audit");

      trackEvent("audit_quiz_complete", { form_name: "audit_quiz", segment: payload.segment });
      setResult(payload);
    } catch (err) {
      setError(err instanceof Error ? err.message : "Could not process the audit right now.");
    } finally {
      setIsLoading(false);
    }
  }

  return (
    <>
      <div className="audit-wrap">
        {!result ? (
          <>
            <div className="audit-progress-row">
              {Array.from({ length: TOTAL_STEPS }).map((_, index) => {
                const dot = index + 1;
                return (
                  <div key={dot} className="audit-progress-item">
                    <span className={`audit-dot ${dot === step ? "active" : ""} ${dot < step ? "done" : ""}`}>{dot}</span>
                    {dot < TOTAL_STEPS && <span className={`audit-line ${dot < step ? "filled" : ""}`} />}
                  </div>
                );
              })}
            </div>

            <div className="audit-card" key={step}>
              <div className="audit-step-header">
                <div className="audit-step-tag">Question {Math.min(step, AUDIT_QUESTIONS.length)} of {AUDIT_QUESTIONS.length}</div>
                <h3>{isEmailStep ? "Get Your Results" : currentQuestion!.question}</h3>
              </div>

              {!isEmailStep && currentQuestion && (
                <div className="audit-grid">
                  {currentQuestion.options.map((option) => (
                    <button
                      key={option.value}
                      type="button"
                      className={`audit-select-card ${answers[currentQuestion.key] === option.value ? "selected" : ""}`}
                      onClick={() => selectAnswer(currentQuestion.key, option.value)}
                    >
                      {option.value}
                    </button>
                  ))}
                </div>
              )}

              {isEmailStep && (
                <div className="audit-lead-form">
                  <div className="audit-input-group">
                    <label>Name (optional)</label>
                    <input type="text" value={name} onChange={(e) => setName(e.target.value)} placeholder="Jane Doe" />
                  </div>
                  <div className="audit-input-group">
                    <label>Email *</label>
                    <input type="email" value={email} onChange={(e) => setEmail(e.target.value)} placeholder="jane@company.com" />
                    {touched && emailError && <span className="audit-error">{emailError}</span>}
                  </div>
                  {error && <div className="audit-api-error">{error}</div>}
                  <button type="button" className="btn-main audit-submit-btn" onClick={() => void submit()} disabled={isLoading}>
                    {isLoading ? "Analyzing..." : "Get My Results →"}
                  </button>
                </div>
              )}
            </div>

            {step > 1 && (
              <div className="audit-nav-row">
                <button type="button" className="btn-ghost audit-nav-btn" onClick={() => setStep((prev) => Math.max(1, prev - 1))} disabled={isLoading}>
                  ← Back
                </button>
              </div>
            )}
          </>
        ) : (
          <div className="audit-result-card">
            <span className={`audit-segment-badge ${result.segment}`}>
              {result.segment === "hot" ? "Ready to move" : result.segment === "warm" ? "Worth exploring" : "Just getting started"}
            </span>
            <p className="audit-takeaway">{result.takeaway}</p>
            <div className="audit-cta-row">
              <Link href="/contact" className="btn-main audit-nav-btn">
                Book a Free 15-Min Consult →
              </Link>
            </div>
            <p className="audit-followup-note">We&apos;ve also sent this to your email.</p>
          </div>
        )}
      </div>

      <style>{`
        .audit-wrap { margin-top: 3.2rem; display: flex; flex-direction: column; gap: 1.35rem; }
        .audit-progress-row { display: flex; align-items: center; justify-content: center; flex-wrap: wrap; gap: 0; }
        .audit-progress-item { display: flex; align-items: center; }
        .audit-dot {
          width: 26px; height: 26px; border-radius: 999px; border: 1px solid rgba(255,255,255,0.18);
          color: var(--muted); font-family: 'JetBrains Mono', monospace; font-size: 0.66rem;
          display: inline-flex; align-items: center; justify-content: center; background: rgba(255,255,255,0.02);
        }
        .audit-dot.active, .audit-dot.done { border-color: rgba(6,182,212,0.62); color: var(--cyan); background: rgba(6,182,212,0.12); }
        .audit-line { width: 28px; height: 2px; background: rgba(255,255,255,0.12); }
        .audit-line.filled { background: rgba(6,182,212,0.55); }
        .audit-card {
          background: rgba(12,12,18,0.78); border: 1px solid rgba(255,255,255,0.08); border-radius: 18px;
          padding: 1.7rem; backdrop-filter: blur(14px); -webkit-backdrop-filter: blur(14px);
          animation: audit-slide-in 0.25s ease;
        }
        @keyframes audit-slide-in { from { opacity: 0; transform: translateY(8px); } to { opacity: 1; transform: translateY(0); } }
        .audit-step-header { margin-bottom: 1.3rem; }
        .audit-step-tag { font-family: 'JetBrains Mono', monospace; font-size: 0.66rem; text-transform: uppercase; color: var(--cyan); letter-spacing: 0.08em; margin-bottom: 0.45rem; }
        .audit-step-header h3 { margin: 0; font-size: clamp(1.25rem, 2.5vw, 1.8rem); font-weight: 500; }
        .audit-grid { display: grid; grid-template-columns: repeat(2, minmax(0, 1fr)); gap: 0.85rem; }
        .audit-select-card {
          text-align: left; border-radius: 12px; border: 1px solid rgba(255,255,255,0.1); background: rgba(255,255,255,0.02);
          color: var(--white); padding: 0.95rem 1rem; cursor: pointer; min-height: 64px; transition: all 0.2s ease;
          font-size: 0.9rem;
        }
        .audit-select-card:hover { border-color: rgba(6,182,212,0.35); transform: translateY(-2px); }
        .audit-select-card.selected { border-color: rgba(6,182,212,0.6); background: rgba(6,182,212,0.1); box-shadow: 0 0 0 2px rgba(6,182,212,0.08); }
        .audit-nav-row { display: flex; justify-content: flex-start; }
        .audit-nav-btn { padding: 0.72rem 1rem; border-radius: 10px; text-decoration: none; border: none; cursor: pointer; }
        .audit-nav-btn:disabled { opacity: 0.45; cursor: not-allowed; }
        .audit-lead-form { display: flex; flex-direction: column; gap: 0.95rem; }
        .audit-input-group { display: flex; flex-direction: column; gap: 0.35rem; }
        .audit-input-group label { font-family: 'JetBrains Mono', monospace; font-size: 0.66rem; text-transform: uppercase; color: var(--muted); letter-spacing: 0.07em; }
        .audit-input-group input {
          border: 1px solid rgba(255,255,255,0.1); border-radius: 10px; background: rgba(255,255,255,0.03);
          color: var(--white); padding: 0.82rem 0.9rem; outline: none; font-size: 0.88rem;
        }
        .audit-input-group input:focus { border-color: rgba(6,182,212,0.45); box-shadow: 0 0 0 2px rgba(6,182,212,0.1); }
        .audit-error { color: #fca5a5; font-size: 0.73rem; }
        .audit-api-error { border-radius: 10px; border: 1px solid rgba(248,113,113,0.4); background: rgba(248,113,113,0.08); color: #fecaca; padding: 0.7rem 0.82rem; font-size: 0.8rem; }
        .audit-submit-btn { margin-top: 0.35rem; width: 100%; border: none; cursor: pointer; padding: 0.88rem 1rem; border-radius: 10px; }
        .audit-result-card {
          background: rgba(12,12,18,0.78); border: 1px solid rgba(255,255,255,0.08); border-radius: 18px;
          padding: 2rem; backdrop-filter: blur(14px); text-align: center;
        }
        .audit-segment-badge {
          display: inline-flex; border-radius: 999px; font-size: 0.72rem; font-family: 'JetBrains Mono', monospace;
          text-transform: uppercase; letter-spacing: 0.05em; padding: 0.4rem 0.9rem; margin-bottom: 1.2rem;
        }
        .audit-segment-badge.hot { border: 1px solid rgba(248,113,113,0.4); color: #fca5a5; background: rgba(248,113,113,0.08); }
        .audit-segment-badge.warm { border: 1px solid rgba(6,182,212,0.34); color: var(--cyan); background: rgba(6,182,212,0.1); }
        .audit-segment-badge.cold { border: 1px solid rgba(255,255,255,0.18); color: var(--muted); background: rgba(255,255,255,0.03); }
        .audit-takeaway { font-size: 1.05rem; line-height: 1.75; color: rgba(255,255,255,0.9); margin: 0 auto 1.6rem; max-width: 520px; }
        .audit-cta-row { display: flex; justify-content: center; }
        .audit-followup-note { margin-top: 1rem; font-size: 0.78rem; color: var(--muted); }
        @media (max-width: 640px) {
          .audit-grid { grid-template-columns: 1fr; }
          .audit-card, .audit-result-card { padding: 1.1rem; }
        }
      `}</style>
    </>
  );
}
