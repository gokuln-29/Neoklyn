import Link from "next/link";

/**
 * "Who we build for". Every segment maps to a project in the portfolio, so a
 * visitor can see the same kind of business before they enquire. It makes no
 * result claims; those live on the case-study pages.
 */
const SEGMENTS = [
  {
    title: "Clinics & healthcare",
    body: "Clear services, easy appointment enquiries and a site patients trust on their phone.",
    slug: "sharon-physio",
    example: "Sharon Physio, Madurai",
  },
  {
    title: "Traders & distributors",
    body: "A credible catalogue and quote-request flow so buyers can find you and ask for prices.",
    slug: "dwarka-trading",
    example: "Dwarka General Trading, Middle East",
  },
  {
    title: "Manufacturers & industrial",
    body: "A professional web presence for capabilities, projects and enquiries from contractors.",
    slug: "zinad-concrete-works",
    example: "Zinad Concrete Works, Middle East",
  },
  {
    title: "Travel & hospitality",
    body: "Visual, fast sites that turn browsing into booking enquiries.",
    slug: "travex-ventures",
    example: "Travex Ventures, India",
  },
  {
    title: "Premium & D2C brands",
    body: "Brand-led websites that feel as good as the product and load instantly.",
    slug: "aathithyan",
    example: "Aathithyan, India",
  },
];

export default function AudienceStrip() {
  return (
    <section className="section section-alt" id="who-we-build-for">
      <div className="reveal" style={{ maxWidth: 760 }}>
        <div className="s-label">Who We Build For</div>
        <h2 className="s-title">BUSINESSES LIKE YOURS</h2>
        <p className="s-sub">
          Websites from ₹50,000, delivered in 2-5 weeks at a fixed price. Here&apos;s the kind of business we&apos;ve already built for.
        </p>
      </div>
      <div
        className="reveal"
        data-track-location="audience_strip"
        style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(230px, 1fr))", gap: "1.25rem", marginTop: "3rem" }}
      >
        {SEGMENTS.map((segment) => (
          <Link
            key={segment.slug}
            href={`/work/${segment.slug}`}
            className="tcard audience-card"
            style={{ display: "flex", flexDirection: "column", textDecoration: "none", color: "inherit", gap: "0.75rem" }}
          >
            <h3 style={{ fontSize: "1.1rem", fontWeight: 600, margin: 0 }}>{segment.title}</h3>
            <p style={{ margin: 0, color: "var(--muted)", lineHeight: 1.65, fontSize: "0.9rem", flex: 1 }}>{segment.body}</p>
            <span style={{ fontFamily: "'JetBrains Mono', monospace", fontSize: "0.7rem", letterSpacing: "0.05em", color: "var(--cyan)" }}>
              See: {segment.example} →
            </span>
          </Link>
        ))}
      </div>
      <p className="reveal" style={{ marginTop: "2rem", color: "var(--muted)", fontSize: "0.9rem" }}>
        Not on the list?{" "}
        <Link href="/estimate" style={{ color: "var(--cyan)" }}>
          Get a free estimate
        </Link>{" "}
        or{" "}
        <Link href="/website-audit" style={{ color: "var(--cyan)" }}>
          audit your current site
        </Link>
        .
      </p>
      <style>{`.audience-card::before { content: none; }`}</style>
    </section>
  );
}
