import type { Accent, TestimonialItem } from "@/data/testimonials";

const AVATAR: Record<Accent, { background: string; color: string }> = {
  cyan: { background: "var(--cyan)", color: "#000" },
  violet: { background: "var(--violet)", color: "#fff" },
  blue: { background: "var(--blue)", color: "#fff" },
};

/**
 * Client quotes. `fromCms` switches the heading from the "live projects"
 * framing used for the built-in set to a plain "what clients say".
 */
export default function TestimonialsSection({ items, fromCms }: { items: TestimonialItem[]; fromCms: boolean }) {
  if (!items.length) return null;

  return (
    <section className="section" id="testimonials">
      <div className="reveal" style={{ display: "flex", flexWrap: "wrap", justifyContent: "space-between", alignItems: "flex-end", gap: "2rem" }}>
        <div>
          <div className="s-label">Client Trust</div>
          <h2 className="s-title" style={{ marginBottom: 0 }}>
            {fromCms ? "WHAT CLIENTS SAY" : "REAL PROJECTS, LIVE RIGHT NOW"}
          </h2>
          <p className="s-sub" style={{ margin: "0.5rem 0 0" }}>
            {fromCms
              ? "In their own words. See the projects behind them in our work."
              : "Every site below is live. Visit them — the work speaks for itself."}
          </p>
        </div>
      </div>
      <div className="test-grid reveal" style={{ marginTop: "3rem" }}>
        {items.map((item) => (
          <div key={item.id} className="tcard" style={{ display: "flex", flexDirection: "column" }}>
            <div
              className="t-stars"
              role="img"
              aria-label={`${item.rating} out of 5 stars`}
              style={{ display: "flex", color: "#FBBF24", gap: "2px", marginBottom: "1rem", fontSize: "1.2rem" }}
            >
              {"★".repeat(Math.max(1, Math.min(5, item.rating)))}
            </div>
            <p className="t-text" style={{ flex: 1 }}>
              &ldquo;{item.quote}&rdquo;
            </p>
            <div className="t-author" style={{ marginTop: "2rem", borderTop: "1px solid var(--border)", paddingTop: "1.5rem" }}>
              <div className="t-av" style={AVATAR[item.accent]}>
                {item.initials}
              </div>
              <div>
                {item.href ? (
                  <a href={item.href} target="_blank" rel="noopener noreferrer" className="t-name" style={{ textDecoration: "none", color: "inherit" }}>
                    {item.name} <span style={{ fontSize: "0.8em", color: `var(--${item.accent})` }}>↗</span>
                  </a>
                ) : (
                  <div className="t-name">{item.name}</div>
                )}
                {item.subtitle && <div className="t-loc">{item.subtitle}</div>}
              </div>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}
