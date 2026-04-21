import { siteStats } from "@/data/siteStats";

export default function AboutStats() {
  return (
    <div className="about-stats-row reveal">
      {siteStats.map((stat) => (
        <article key={stat.key} className="about-stat-card">
          <div className="about-stat-value">
            {stat.value}
            {stat.suffix}
          </div>
          <div className="about-stat-label">{stat.aboutLabel}</div>
        </article>
      ))}

      <style>{`
        .about-stats-row {
          margin-top: 1.2rem;
          display: grid;
          grid-template-columns: repeat(4, minmax(0, 1fr));
          gap: 0.9rem;
        }

        .about-stat-card {
          border: 1px solid rgba(255,255,255,0.08);
          border-radius: 12px;
          background: rgba(255,255,255,0.02);
          padding: 1rem;
          text-align: center;
          position: relative;
          overflow: hidden;
        }

        .about-stat-card::after {
          content: "";
          position: absolute;
          inset: auto -30% 0;
          height: 1px;
          background: linear-gradient(90deg, transparent, rgba(6,182,212,0.65), transparent);
          animation: stat-sweep 3.2s linear infinite;
        }

        @keyframes stat-sweep {
          from {
            transform: translateX(-30%);
          }
          to {
            transform: translateX(110%);
          }
        }

        .about-stat-value {
          color: var(--cyan);
          font-family: 'JetBrains Mono', monospace;
          font-size: clamp(1.4rem, 3vw, 2rem);
          letter-spacing: 0.02em;
          line-height: 1;
        }

        .about-stat-label {
          margin-top: 0.45rem;
          color: rgba(255,255,255,0.72);
          font-size: 0.75rem;
          text-transform: uppercase;
          letter-spacing: 0.07em;
          font-family: 'JetBrains Mono', monospace;
        }

        @media (max-width: 980px) {
          .about-stats-row {
            grid-template-columns: repeat(2, minmax(0, 1fr));
          }
        }

        @media (max-width: 640px) {
          .about-stats-row {
            grid-template-columns: 1fr;
          }
        }
      `}</style>
    </div>
  );
}
