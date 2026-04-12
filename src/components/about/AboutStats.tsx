"use client";

import { useEffect, useState } from "react";

type StatItem = {
  label: string;
  value: number;
  suffix: string;
};

const stats: StatItem[] = [
  { value: 120, suffix: "+", label: "Enterprise Projects" },
  { value: 98, suffix: "%", label: "Client Retention" },
  { value: 5, suffix: "yr", label: "Experience" },
  { value: 3, suffix: "", label: "Global Hubs" },
];

export default function AboutStats() {
  const [counts, setCounts] = useState<number[]>(() => stats.map(() => 0));

  useEffect(() => {
    const duration = 1300;
    const tickRate = 24;
    const totalTicks = Math.ceil(duration / tickRate);
    let currentTick = 0;

    const timer = window.setInterval(() => {
      currentTick += 1;
      const progress = Math.min(1, currentTick / totalTicks);

      setCounts(
        stats.map((item) => {
          const eased = 1 - Math.pow(1 - progress, 3);
          return Math.round(item.value * eased);
        })
      );

      if (progress >= 1) {
        window.clearInterval(timer);
      }
    }, tickRate);

    return () => window.clearInterval(timer);
  }, []);

  return (
    <div className="about-stats-row reveal">
      {stats.map((stat, index) => (
        <article key={stat.label} className="about-stat-card">
          <div className="about-stat-value">
            {counts[index]}
            {stat.suffix}
          </div>
          <div className="about-stat-label">{stat.label}</div>
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
