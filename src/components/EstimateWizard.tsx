"use client";

import Link from "next/link";
import { useMemo, useState } from "react";
import {
  ESTIMATE_FEATURES,
  PROJECT_TYPES,
  SCALE_OPTIONS,
  TIMELINE_OPTIONS,
  type ProjectType,
  type ScaleOption,
  type TimelineOption,
} from "@/data/estimateFeatures";

type FormState = {
  projectType: ProjectType | "";
  features: string[];
  scale: ScaleOption | "";
  timeline: TimelineOption | "";
  name: string;
  email: string;
  company: string;
};

type EstimateResult = {
  estimated_timeline: string;
  estimated_budget_range: string;
  key_assumptions: string[];
  what_increases_cost: string[];
  recommended_stack: string[];
  next_steps: string;
};

const TOTAL_STEPS = 5;

const INITIAL_FORM: FormState = {
  projectType: "",
  features: [],
  scale: "",
  timeline: "",
  name: "",
  email: "",
  company: "",
};

function isValidEmail(email: string) {
  return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email.trim());
}

export default function EstimateWizard() {
  const [step, setStep] = useState(1);
  const [form, setForm] = useState<FormState>(INITIAL_FORM);
  const [touchedLeadFields, setTouchedLeadFields] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState("");
  const [estimate, setEstimate] = useState<EstimateResult | null>(null);

  const featureOptions = useMemo(() => {
    if (!form.projectType) return [];
    return ESTIMATE_FEATURES[form.projectType];
  }, [form.projectType]);

  const leadNameError = form.name.trim().length < 2 ? "Name should be at least 2 characters." : "";
  const leadEmailError = !isValidEmail(form.email) ? "Enter a valid business email." : "";

  const canGoNext =
    (step === 1 && !!form.projectType) ||
    (step === 2 && form.features.length > 0) ||
    (step === 3 && !!form.scale) ||
    (step === 4 && !!form.timeline);

  function updateForm<K extends keyof FormState>(key: K, value: FormState[K]) {
    setForm((prev) => ({ ...prev, [key]: value }));
  }

  function toggleFeature(feature: string) {
    setForm((prev) => {
      const alreadySelected = prev.features.includes(feature);
      return {
        ...prev,
        features: alreadySelected
          ? prev.features.filter((item) => item !== feature)
          : [...prev.features, feature],
      };
    });
  }

  async function submitEstimate() {
    setTouchedLeadFields(true);
    if (leadNameError || leadEmailError) return;

    setIsLoading(true);
    setError("");

    try {
      const response = await fetch("/api/estimate", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          projectType: form.projectType,
          features: form.features,
          scale: form.scale,
          timeline: form.timeline,
          name: form.name,
          email: form.email,
          company: form.company,
        }),
      });

      const payload = (await response.json()) as { estimate?: EstimateResult; error?: string };
      if (!response.ok || !payload.estimate) {
        throw new Error(payload.error || "Unable to generate estimate");
      }

      setEstimate(payload.estimate);
    } catch (err) {
      const message = err instanceof Error ? err.message : "Could not generate estimate right now.";
      setError(message);
    } finally {
      setIsLoading(false);
    }
  }

  function resetWizard() {
    setStep(1);
    setForm(INITIAL_FORM);
    setTouchedLeadFields(false);
    setEstimate(null);
    setError("");
  }

  const contactCtaHref = `/contact?service=${encodeURIComponent(
    form.projectType || "Project Estimate"
  )}&budget=${encodeURIComponent(estimate?.estimated_budget_range || "")}`;

  return (
    <>
      <div className="est-wrap">
        {!estimate ? (
          <>
            <div className="est-progress-row">
              {Array.from({ length: TOTAL_STEPS }).map((_, index) => {
                const dot = index + 1;
                const isActive = dot === step;
                const isDone = dot < step;
                return (
                  <div key={dot} className="est-progress-item">
                    <span className={`est-dot ${isActive ? "active" : ""} ${isDone ? "done" : ""}`}>{dot}</span>
                    {dot < TOTAL_STEPS && <span className={`est-line ${dot < step ? "filled" : ""}`} />}
                  </div>
                );
              })}
            </div>

            <div className="est-card" key={step}>
              <div className="est-step-header">
                <div className="est-step-tag">Step {step} of 5</div>
                <h3>
                  {step === 1 && "Choose Project Type"}
                  {step === 2 && "Pick Core Features"}
                  {step === 3 && "Select Delivery Scale"}
                  {step === 4 && "Preferred Timeline"}
                  {step === 5 && "Get Your Free Estimate"}
                </h3>
              </div>

              {step === 1 && (
                <div className="est-grid est-grid-3">
                  {PROJECT_TYPES.map((type) => (
                    <button
                      key={type.value}
                      type="button"
                      className={`est-select-card ${form.projectType === type.value ? "selected" : ""}`}
                      onClick={() => {
                        updateForm("projectType", type.value);
                        updateForm("features", []);
                      }}
                    >
                      <strong>{type.value}</strong>
                      <span>{type.description}</span>
                    </button>
                  ))}
                </div>
              )}

              {step === 2 && (
                <div className="est-feature-grid">
                  {featureOptions.map((feature) => (
                    <label key={feature} className="est-checkbox-row">
                      <input
                        type="checkbox"
                        checked={form.features.includes(feature)}
                        onChange={() => toggleFeature(feature)}
                      />
                      <span>{feature}</span>
                    </label>
                  ))}
                </div>
              )}

              {step === 3 && (
                <div className="est-grid est-grid-3">
                  {SCALE_OPTIONS.map((item) => (
                    <button
                      key={item.value}
                      type="button"
                      className={`est-select-card ${form.scale === item.value ? "selected" : ""}`}
                      onClick={() => updateForm("scale", item.value)}
                    >
                      <strong>{item.title}</strong>
                      <span>{item.description}</span>
                    </button>
                  ))}
                </div>
              )}

              {step === 4 && (
                <div className="est-grid est-grid-3">
                  {TIMELINE_OPTIONS.map((item) => (
                    <button
                      key={item.value}
                      type="button"
                      className={`est-select-card ${form.timeline === item.value ? "selected" : ""}`}
                      onClick={() => updateForm("timeline", item.value)}
                    >
                      <strong>{item.value}</strong>
                      <span>{item.description}</span>
                    </button>
                  ))}
                </div>
              )}

              {step === 5 && (
                <div className="est-lead-form">
                  <div className="est-input-group">
                    <label>Full Name *</label>
                    <input
                      type="text"
                      value={form.name}
                      onChange={(event) => updateForm("name", event.target.value)}
                      placeholder="John Doe"
                    />
                    {touchedLeadFields && leadNameError && <span className="est-error">{leadNameError}</span>}
                  </div>

                  <div className="est-input-group">
                    <label>Business Email *</label>
                    <input
                      type="email"
                      value={form.email}
                      onChange={(event) => updateForm("email", event.target.value)}
                      placeholder="john@company.com"
                    />
                    {touchedLeadFields && leadEmailError && <span className="est-error">{leadEmailError}</span>}
                  </div>

                  <div className="est-input-group">
                    <label>Company (Optional)</label>
                    <input
                      type="text"
                      value={form.company}
                      onChange={(event) => updateForm("company", event.target.value)}
                      placeholder="Acme Inc"
                    />
                  </div>

                  {error && <div className="est-api-error">{error}</div>}

                  <button
                    type="button"
                    className="btn-main est-submit-btn"
                    onClick={() => void submitEstimate()}
                    disabled={isLoading}
                  >
                    {isLoading ? "Generating Estimate..." : "Get Your Free Estimate →"}
                  </button>
                </div>
              )}
            </div>

            <div className="est-nav-row">
              <button
                type="button"
                className="btn-ghost est-nav-btn"
                disabled={step === 1 || isLoading}
                onClick={() => setStep((prev) => Math.max(1, prev - 1))}
              >
                ← Back
              </button>

              {step < 5 && (
                <button
                  type="button"
                  className="btn-main est-nav-btn"
                  disabled={!canGoNext || isLoading}
                  onClick={() => setStep((prev) => Math.min(5, prev + 1))}
                >
                  Next →
                </button>
              )}
            </div>
          </>
        ) : (
          <div className="est-result-card">
            <div className="est-result-hero">
              <span className="est-result-kicker">Estimated Budget Range</span>
              <h3>{estimate.estimated_budget_range}</h3>
              <div className="est-timeline-badge">Estimated Timeline: {estimate.estimated_timeline}</div>
            </div>

            <div className="est-section">
              <h4>Assumptions</h4>
              <div className="est-mini-grid">
                {estimate.key_assumptions.slice(0, 3).map((item) => (
                  <div className="est-mini-card" key={item}>
                    {item}
                  </div>
                ))}
              </div>
            </div>

            <div className="est-section">
              <h4>What Increases Cost</h4>
              <div className="est-mini-grid">
                {estimate.what_increases_cost.slice(0, 3).map((item) => (
                  <div className="est-mini-card danger" key={item}>
                    {item}
                  </div>
                ))}
              </div>
            </div>

            <div className="est-section">
              <h4>Recommended Stack</h4>
              <div className="est-pill-row">
                {estimate.recommended_stack.map((tech) => (
                  <span key={tech} className="est-pill">
                    {tech}
                  </span>
                ))}
              </div>
            </div>

            <div className="est-section">
              <h4>Next Steps</h4>
              <p>{estimate.next_steps}</p>
            </div>

            <div className="est-cta-row">
              <Link href={contactCtaHref} className="btn-main est-nav-btn">
                Get a Precise Quote →
              </Link>
              <button type="button" className="btn-ghost est-nav-btn" onClick={resetWizard}>
                Start New Estimate
              </button>
            </div>
          </div>
        )}
      </div>

      <style>{`
        .est-wrap {
          margin-top: 3.2rem;
          display: flex;
          flex-direction: column;
          gap: 1.35rem;
        }

        .est-progress-row {
          display: flex;
          align-items: center;
          justify-content: center;
          gap: 0;
        }

        .est-progress-item {
          display: flex;
          align-items: center;
        }

        .est-dot {
          width: 30px;
          height: 30px;
          border-radius: 999px;
          border: 1px solid rgba(255,255,255,0.18);
          color: var(--muted);
          font-family: 'JetBrains Mono', monospace;
          font-size: 0.73rem;
          display: inline-flex;
          align-items: center;
          justify-content: center;
          background: rgba(255,255,255,0.02);
        }

        .est-dot.active,
        .est-dot.done {
          border-color: rgba(6,182,212,0.62);
          color: var(--cyan);
          background: rgba(6,182,212,0.12);
        }

        .est-line {
          width: 58px;
          height: 2px;
          background: rgba(255,255,255,0.12);
        }

        .est-line.filled {
          background: rgba(6,182,212,0.55);
        }

        .est-card,
        .est-result-card {
          background: rgba(12,12,18,0.78);
          border: 1px solid rgba(255,255,255,0.08);
          border-radius: 18px;
          padding: 1.7rem;
          backdrop-filter: blur(14px);
          -webkit-backdrop-filter: blur(14px);
          animation: est-slide-in 0.25s ease;
        }

        @keyframes est-slide-in {
          from {
            opacity: 0;
            transform: translateY(8px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }

        .est-step-header {
          margin-bottom: 1.3rem;
        }

        .est-step-tag {
          font-family: 'JetBrains Mono', monospace;
          font-size: 0.66rem;
          text-transform: uppercase;
          color: var(--cyan);
          letter-spacing: 0.08em;
          margin-bottom: 0.45rem;
        }

        .est-step-header h3 {
          margin: 0;
          font-size: clamp(1.35rem, 2.5vw, 1.95rem);
          font-weight: 500;
        }

        .est-grid {
          display: grid;
          gap: 0.85rem;
        }

        .est-grid-3 {
          grid-template-columns: repeat(3, minmax(0, 1fr));
        }

        .est-select-card {
          text-align: left;
          border-radius: 12px;
          border: 1px solid rgba(255,255,255,0.1);
          background: rgba(255,255,255,0.02);
          color: var(--white);
          padding: 0.95rem 1rem;
          cursor: pointer;
          min-height: 108px;
          transition: all 0.2s ease;
          display: flex;
          flex-direction: column;
          gap: 0.4rem;
        }

        .est-select-card strong {
          font-size: 0.95rem;
          font-weight: 600;
        }

        .est-select-card span {
          font-size: 0.78rem;
          line-height: 1.5;
          color: var(--muted);
        }

        .est-select-card:hover {
          border-color: rgba(6,182,212,0.35);
          transform: translateY(-2px);
        }

        .est-select-card.selected {
          border-color: rgba(6,182,212,0.6);
          background: rgba(6,182,212,0.1);
          box-shadow: 0 0 0 2px rgba(6,182,212,0.08);
        }

        .est-feature-grid {
          display: grid;
          grid-template-columns: repeat(2, minmax(0, 1fr));
          gap: 0.6rem;
        }

        .est-checkbox-row {
          display: flex;
          align-items: center;
          gap: 0.55rem;
          border: 1px solid rgba(255,255,255,0.1);
          border-radius: 10px;
          padding: 0.62rem 0.78rem;
          background: rgba(255,255,255,0.02);
          font-size: 0.83rem;
          color: rgba(255,255,255,0.86);
          cursor: pointer;
        }

        .est-checkbox-row input {
          accent-color: #06b6d4;
        }

        .est-nav-row {
          display: flex;
          justify-content: space-between;
          align-items: center;
          gap: 0.7rem;
        }

        .est-nav-btn {
          padding: 0.72rem 1rem;
          border-radius: 10px;
          text-decoration: none;
          border: none;
          cursor: pointer;
        }

        .est-nav-btn:disabled {
          opacity: 0.45;
          cursor: not-allowed;
        }

        .est-lead-form {
          display: flex;
          flex-direction: column;
          gap: 0.95rem;
        }

        .est-input-group {
          display: flex;
          flex-direction: column;
          gap: 0.35rem;
        }

        .est-input-group label {
          font-family: 'JetBrains Mono', monospace;
          font-size: 0.66rem;
          text-transform: uppercase;
          color: var(--muted);
          letter-spacing: 0.07em;
        }

        .est-input-group input {
          border: 1px solid rgba(255,255,255,0.1);
          border-radius: 10px;
          background: rgba(255,255,255,0.03);
          color: var(--white);
          padding: 0.82rem 0.9rem;
          outline: none;
          font-size: 0.88rem;
        }

        .est-input-group input:focus {
          border-color: rgba(6,182,212,0.45);
          box-shadow: 0 0 0 2px rgba(6,182,212,0.1);
        }

        .est-error {
          color: #fca5a5;
          font-size: 0.73rem;
        }

        .est-api-error {
          border-radius: 10px;
          border: 1px solid rgba(248,113,113,0.4);
          background: rgba(248,113,113,0.08);
          color: #fecaca;
          padding: 0.7rem 0.82rem;
          font-size: 0.8rem;
        }

        .est-submit-btn {
          margin-top: 0.35rem;
          width: 100%;
          border: none;
          cursor: pointer;
          padding: 0.88rem 1rem;
          border-radius: 10px;
        }

        .est-result-hero {
          border-bottom: 1px solid rgba(255,255,255,0.1);
          padding-bottom: 1rem;
          margin-bottom: 1rem;
        }

        .est-result-kicker {
          display: inline-block;
          font-family: 'JetBrains Mono', monospace;
          color: var(--cyan);
          font-size: 0.66rem;
          letter-spacing: 0.08em;
          text-transform: uppercase;
          margin-bottom: 0.4rem;
        }

        .est-result-hero h3 {
          margin: 0;
          font-size: clamp(2rem, 5vw, 3.2rem);
          line-height: 1;
        }

        .est-timeline-badge {
          margin-top: 0.7rem;
          display: inline-flex;
          border: 1px solid rgba(6,182,212,0.34);
          border-radius: 999px;
          background: rgba(6,182,212,0.1);
          color: var(--cyan);
          font-size: 0.72rem;
          font-family: 'JetBrains Mono', monospace;
          text-transform: uppercase;
          letter-spacing: 0.05em;
          padding: 0.35rem 0.7rem;
        }

        .est-section {
          margin-top: 1rem;
        }

        .est-section h4 {
          margin: 0 0 0.65rem;
          font-size: 1.02rem;
          font-weight: 500;
        }

        .est-section p {
          margin: 0;
          color: rgba(255,255,255,0.76);
          line-height: 1.7;
          font-size: 0.9rem;
        }

        .est-mini-grid {
          display: grid;
          grid-template-columns: repeat(3, minmax(0, 1fr));
          gap: 0.65rem;
        }

        .est-mini-card {
          border: 1px solid rgba(255,255,255,0.1);
          border-radius: 11px;
          background: rgba(255,255,255,0.03);
          padding: 0.72rem;
          font-size: 0.8rem;
          line-height: 1.5;
          color: rgba(255,255,255,0.84);
        }

        .est-mini-card.danger {
          border-color: rgba(248,113,113,0.25);
          background: rgba(248,113,113,0.06);
        }

        .est-pill-row {
          display: flex;
          flex-wrap: wrap;
          gap: 0.55rem;
        }

        .est-pill {
          border-radius: 999px;
          border: 1px solid rgba(6,182,212,0.35);
          color: var(--cyan);
          background: rgba(6,182,212,0.07);
          padding: 0.36rem 0.7rem;
          font-size: 0.72rem;
          font-family: 'JetBrains Mono', monospace;
        }

        .est-cta-row {
          margin-top: 1.3rem;
          display: flex;
          flex-wrap: wrap;
          gap: 0.6rem;
        }

        @media (max-width: 1024px) {
          .est-grid-3 {
            grid-template-columns: repeat(2, minmax(0, 1fr));
          }

          .est-mini-grid {
            grid-template-columns: 1fr;
          }
        }

        @media (max-width: 640px) {
          .est-grid-3,
          .est-feature-grid {
            grid-template-columns: 1fr;
          }

          .est-card,
          .est-result-card {
            padding: 1.1rem;
          }

          .est-nav-row {
            flex-direction: column;
            align-items: stretch;
          }

          .est-line {
            width: 34px;
          }
        }
      `}</style>
    </>
  );
}
