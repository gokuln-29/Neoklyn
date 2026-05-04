"use client";

import Link from "next/link";

const engagementModels = [
  {
    title: "Fixed-Price Project",
    bestFor: "Websites, apps with defined scope",
    howItWorks: "Discovery → Quote → Build → Deliver",
    price: "₹50,000 / $600",
  },
  {
    title: "Monthly Retainer",
    bestFor: "Ongoing dev, marketing, or AI ops",
    howItWorks: "Dedicated hours per month, priority support",
    price: "₹30,000 / month",
  },
  {
    title: "Team Augmentation",
    bestFor: "Scaling your in-house team",
    howItWorks: "One or more engineers embedded in your workflow",
    price: "Custom pricing",
  },
];

export default function EngageSection() {
  return (
    <section className="section section-alt">
      <div className="reveal" style={{ textAlign: "center", marginBottom: "3rem" }}>
        <div className="s-label">Engagement Models</div>
        <h2 className="s-title">HOW WE WORK TOGETHER</h2>
        <p className="s-sub">Choose the model that fits your project needs and budget.</p>
      </div>

      <div
        className="reveal"
        style={{
          display: "grid",
          gridTemplateColumns: "repeat(3, 1fr)",
          gap: "1px",
          background: "var(--border)",
          borderRadius: "16px",
          border: "1px solid var(--border)",
          overflow: "hidden",
          maxWidth: "1100px",
          margin: "0 auto",
        }}
      >
        {engagementModels.map((model, index) => (
          <div
            key={index}
            style={{
              background: "var(--ink)",
              padding: "2.5rem 2rem",
              display: "flex",
              flexDirection: "column",
              transition: "background 0.3s",
            }}
            onMouseEnter={(e) => {
              (e.currentTarget as HTMLElement).style.background = "#0a0a12";
            }}
            onMouseLeave={(e) => {
              (e.currentTarget as HTMLElement).style.background = "var(--ink)";
            }}
          >
            <h3
              style={{
                fontFamily: "var(--font-space-grotesk), sans-serif",
                fontSize: "1.25rem",
                fontWeight: 700,
                color: "var(--white)",
                margin: "0 0 1.5rem 0",
              }}
            >
              {model.title}
            </h3>

            <div style={{ marginBottom: "1.25rem" }}>
              <div
                style={{
                  fontSize: "0.68rem",
                  color: "var(--cyan)",
                  fontFamily: "'JetBrains Mono', monospace",
                  textTransform: "uppercase",
                  letterSpacing: "0.1em",
                  marginBottom: "0.35rem",
                }}
              >
                Best for
              </div>
              <div style={{ color: "var(--muted)", fontSize: "0.9rem", lineHeight: 1.5 }}>
                {model.bestFor}
              </div>
            </div>

            <div style={{ marginBottom: "1.25rem" }}>
              <div
                style={{
                  fontSize: "0.68rem",
                  color: "var(--cyan)",
                  fontFamily: "'JetBrains Mono', monospace",
                  textTransform: "uppercase",
                  letterSpacing: "0.1em",
                  marginBottom: "0.35rem",
                }}
              >
                How it works
              </div>
              <div style={{ color: "var(--muted)", fontSize: "0.9rem", lineHeight: 1.5 }}>
                {model.howItWorks}
              </div>
            </div>

            <div style={{ marginTop: "auto", marginBottom: "1.5rem" }}>
              <div
                style={{
                  fontSize: "0.68rem",
                  color: "var(--cyan)",
                  fontFamily: "'JetBrains Mono', monospace",
                  textTransform: "uppercase",
                  letterSpacing: "0.1em",
                  marginBottom: "0.35rem",
                }}
              >
                Starts from
              </div>
              <div
                style={{
                  color: "var(--white)",
                  fontSize: "1.1rem",
                  fontWeight: 600,
                }}
              >
                {model.price}
              </div>
            </div>

            <Link
              href="/contact"
              className="btn-ghost"
              style={{
                fontSize: "0.85rem",
                padding: "0.75rem 1.5rem",
                alignSelf: "flex-start",
              }}
            >
              Get a Quote →
            </Link>
          </div>
        ))}
      </div>

      <style>{`
        @media (max-width: 900px) {
          .reveal + div[style*="grid-template-columns"] {
            grid-template-columns: 1fr !important;
          }
        }
      `}</style>
    </section>
  );
}