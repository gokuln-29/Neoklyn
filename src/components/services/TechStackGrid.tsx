"use client";

import { useRef, useState } from "react";

type TechItem = {
  name: string;
  version: string;
  color: string;
  nameColor?: string;
  icon: React.ReactNode;
};

const TECH_ITEMS: TechItem[] = [
  {
    name: "React",
    version: "v18",
    color: "#06B6D4",
    icon: (
      <svg viewBox="0 0 40 40" width="32" height="32">
        <circle cx="20" cy="20" r="4" fill="#06B6D4" />
        <ellipse cx="20" cy="20" rx="18" ry="7" fill="none" stroke="#06B6D4" strokeWidth="1.5" opacity="0.7" />
        <ellipse cx="20" cy="20" rx="18" ry="7" fill="none" stroke="#06B6D4" strokeWidth="1.5" opacity="0.7" transform="rotate(60 20 20)" />
        <ellipse cx="20" cy="20" rx="18" ry="7" fill="none" stroke="#06B6D4" strokeWidth="1.5" opacity="0.7" transform="rotate(120 20 20)" />
      </svg>
    ),
  },
  {
    name: "Next.js",
    version: "v15",
    color: "#ffffff",
    nameColor: "var(--white)",
    icon: (
      <svg viewBox="0 0 40 40" width="32" height="32">
        <text x="4" y="28" fontFamily="monospace" fontWeight="900" fontSize="22" fill="white">N</text>
        <path d="M28 12 L38 28" stroke="white" strokeWidth="2.5" strokeLinecap="round" />
      </svg>
    ),
  },
  {
    name: "Three.js",
    version: "WebGL",
    color: "#7C3AED",
    icon: (
      <svg viewBox="0 0 40 40" width="32" height="32">
        <polygon points="20,4 36,32 4,32" fill="none" stroke="#7C3AED" strokeWidth="1.8" />
        <polygon points="20,13 28,28 12,28" fill="#7C3AED" opacity="0.35" />
      </svg>
    ),
  },
  {
    name: "Flutter",
    version: "iOS/Android",
    color: "#06B6D4",
    icon: (
      <svg viewBox="0 0 40 40" width="32" height="32">
        <polygon points="20,4 36,20 20,36 4,20" fill="none" stroke="#06B6D4" strokeWidth="1.8" />
        <polygon points="20,12 28,20 20,28" fill="#06B6D4" opacity="0.5" />
      </svg>
    ),
  },
  {
    name: "Node.js",
    version: "v20 LTS",
    color: "#3B82F6",
    icon: (
      <svg viewBox="0 0 40 40" width="32" height="32">
        <path d="M20 4 L34 12 L34 28 L20 36 L6 28 L6 12 Z" fill="none" stroke="#3B82F6" strokeWidth="1.8" />
        <text x="13" y="25" fontFamily="monospace" fontWeight="700" fontSize="11" fill="#3B82F6">JS</text>
      </svg>
    ),
  },
  {
    name: "Shopify",
    version: "Headless",
    color: "#7C3AED",
    icon: (
      <svg viewBox="0 0 40 40" width="32" height="32">
        <path d="M30 10 C30 10 28 8 24 9 L23 6 C23 6 17 5 15 14 L10 15 L12 32 L30 35 Z" fill="none" stroke="#7C3AED" strokeWidth="1.6" />
        <circle cx="20" cy="22" r="4" fill="#7C3AED" opacity="0.6" />
      </svg>
    ),
  },
  {
    name: "Python",
    version: "v3.12",
    color: "#3B82F6",
    icon: (
      <svg viewBox="0 0 40 40" width="32" height="32">
        <path
          d="M20 6 C15 6 15.5 8.2 15.5 8.2 L15.5 11 L20.2 11 L20.2 12 L13.5 12 C13.5 12 8 11.4 8 20 C8 28.6 12.8 28.3 12.8 28.3 L15.6 28.3 L15.6 24.8 C15.6 24.8 15.4 20 20.2 20 L27 20 C27 20 31.5 20.1 31.5 15.7 L31.5 11 C31.5 11 32.2 6 20 6 Z"
          fill="none" stroke="#3776AB" strokeWidth="1.4"
        />
        <circle cx="17.5" cy="9" r="1.1" fill="#3776AB" />
        <path
          d="M20 34 C25 34 24.5 31.8 24.5 31.8 L24.5 29 L19.8 29 L19.8 28 L26.5 28 C26.5 28 32 28.6 32 20 C32 11.4 27.2 11.7 27.2 11.7 L24.4 11.7 L24.4 15.2 C24.4 15.2 24.6 20 19.8 20 L13 20 C13 20 8.5 19.9 8.5 24.3 L8.5 29 C8.5 29 7.8 34 20 34 Z"
          fill="none" stroke="#FFD43B" strokeWidth="1.4"
        />
        <circle cx="22.5" cy="31" r="1.1" fill="#FFD43B" />
      </svg>
    ),
  },
  {
    name: "TypeScript",
    version: "v5",
    color: "#3178C6",
    icon: (
      <svg viewBox="0 0 40 40" width="32" height="32">
        <rect x="6" y="6" width="28" height="28" rx="4" fill="none" stroke="#3178C6" strokeWidth="1.6" />
        <text x="10" y="26" fontFamily="monospace" fontWeight="800" fontSize="14" fill="#3178C6">TS</text>
      </svg>
    ),
  },
  {
    name: "OpenAI / LLM",
    version: "Agents",
    color: "#06B6D4",
    icon: (
      <svg viewBox="0 0 40 40" width="32" height="32">
        <circle cx="20" cy="20" r="4" fill="#06B6D4" />
        <circle cx="20" cy="7" r="2.4" fill="none" stroke="#06B6D4" strokeWidth="1.4" />
        <circle cx="32" cy="27" r="2.4" fill="none" stroke="#06B6D4" strokeWidth="1.4" />
        <circle cx="8" cy="27" r="2.4" fill="none" stroke="#06B6D4" strokeWidth="1.4" />
        <line x1="20" y1="16" x2="20" y2="9.5" stroke="#06B6D4" strokeWidth="1.2" opacity="0.7" />
        <line x1="23" y1="22.5" x2="30" y2="26" stroke="#06B6D4" strokeWidth="1.2" opacity="0.7" />
        <line x1="17" y1="22.5" x2="10" y2="26" stroke="#06B6D4" strokeWidth="1.2" opacity="0.7" />
      </svg>
    ),
  },
];

export default function TechStackGrid() {
  const gridRef = useRef<HTMLDivElement>(null);
  const [spot, setSpot] = useState({ x: 0, y: 0, active: false });

  function handleMouseMove(e: React.MouseEvent<HTMLDivElement>) {
    const rect = gridRef.current?.getBoundingClientRect();
    if (!rect) return;
    setSpot({ x: e.clientX - rect.left, y: e.clientY - rect.top, active: true });
  }

  return (
    <div className="tsg-panel">
      {/* Header */}
      <div className="tsg-header">
        <div className="tsg-label">
          <span className="tsg-label-dot" />
          Core Tech Stack
        </div>
        <div className="tsg-badge">{TECH_ITEMS.length} Technologies Active</div>
      </div>

      {/* Spotlight grid */}
      <div
        ref={gridRef}
        className="tsg-grid-wrap"
        onMouseMove={handleMouseMove}
        onMouseLeave={() => setSpot((s) => ({ ...s, active: false }))}
      >
        <div
          className="tsg-spotlight"
          style={{
            left: spot.x,
            top: spot.y,
            opacity: spot.active ? 1 : 0,
          }}
        />
        <div className="tsg-grid">
          {TECH_ITEMS.map((item) => (
            <div
              key={item.name}
              className="tsg-card"
              style={{ "--nc": item.color } as React.CSSProperties}
            >
              <div className="tsg-card-top">
                {item.icon}
                <span className="tsg-card-dot" style={{ background: item.color }} />
              </div>
              <span className="tsg-card-name" style={{ color: item.nameColor || item.color }}>
                {item.name}
              </span>
              <span className="tsg-card-ver">{item.version}</span>
            </div>
          ))}
        </div>
      </div>

      {/* Bottom metric strip */}
      <div className="tsg-metrics">
        <div className="tsg-metric">
          <span className="tsg-metric-val">99<span style={{ fontSize: "0.7em", opacity: 0.6 }}>%</span></span>
          <span className="tsg-metric-label">Uptime SLA</span>
        </div>
        <div className="tsg-metric-div" />
        <div className="tsg-metric">
          <span className="tsg-metric-val">{"<"}50<span style={{ fontSize: "0.7em", opacity: 0.6 }}>ms</span></span>
          <span className="tsg-metric-label">Avg Response</span>
        </div>
        <div className="tsg-metric-div" />
        <div className="tsg-metric">
          <span className="tsg-metric-val">100<span style={{ fontSize: "0.7em", opacity: 0.6 }}>+</span></span>
          <span className="tsg-metric-label">Projects Shipped</span>
        </div>
      </div>

      <style>{`
        .tsg-panel {
          position: sticky;
          top: 6rem;
          background: rgba(8, 8, 14, 0.85);
          border-radius: 20px;
          border: 1px solid rgba(255,255,255,0.07);
          overflow: hidden;
          padding: 2rem 2rem 0;
          box-shadow:
            0 0 0 1px rgba(255,255,255,0.04),
            0 30px 80px rgba(0,0,0,0.7),
            0 0 60px rgba(6,182,212,0.04),
            inset 0 1px 0 rgba(255,255,255,0.06);
          backdrop-filter: blur(32px);
        }

        .tsg-header {
          display: flex;
          align-items: center;
          justify-content: space-between;
          margin-bottom: 1.5rem;
        }
        .tsg-label {
          font-family: 'JetBrains Mono', monospace;
          font-size: 0.62rem;
          letter-spacing: 0.18em;
          text-transform: uppercase;
          color: var(--muted);
          display: flex;
          align-items: center;
          gap: 0.5rem;
        }
        .tsg-label-dot {
          width: 6px; height: 6px;
          border-radius: 50%;
          background: var(--cyan);
          box-shadow: 0 0 8px var(--cyan);
          animation: tsg-pulse 1.8s ease-in-out infinite;
        }
        @keyframes tsg-pulse {
          0%, 100% { opacity: 1; }
          50% { opacity: 0.5; }
        }
        .tsg-badge {
          font-family: 'JetBrains Mono', monospace;
          font-size: 0.58rem;
          letter-spacing: 0.1em;
          color: var(--cyan);
          background: rgba(6,182,212,0.08);
          border: 1px solid rgba(6,182,212,0.2);
          padding: 0.25rem 0.7rem;
          border-radius: 100px;
        }

        .tsg-grid-wrap {
          position: relative;
          padding: 0.5rem 0 2rem;
          overflow: hidden;
        }

        .tsg-spotlight {
          position: absolute;
          width: 260px;
          height: 260px;
          margin-left: -130px;
          margin-top: -130px;
          border-radius: 50%;
          background: radial-gradient(circle, rgba(6,182,212,0.16) 0%, rgba(124,58,237,0.08) 45%, transparent 70%);
          pointer-events: none;
          transition: opacity 0.4s ease;
          mix-blend-mode: plus-lighter;
          z-index: 0;
        }

        .tsg-grid {
          position: relative;
          z-index: 1;
          display: grid;
          grid-template-columns: repeat(3, 1fr);
          gap: 0.9rem;
        }

        .tsg-card {
          position: relative;
          display: flex;
          flex-direction: column;
          align-items: flex-start;
          gap: 0.4rem;
          padding: 1rem 1rem 0.8rem;
          background: rgba(255,255,255,0.02);
          border: 1px solid rgba(255,255,255,0.08);
          border-radius: 14px;
          transition: border-color 0.25s ease, transform 0.25s ease, background 0.25s ease;
        }
        .tsg-card:hover {
          border-color: color-mix(in srgb, var(--nc) 55%, transparent);
          background: color-mix(in srgb, var(--nc) 6%, rgba(255,255,255,0.02));
          transform: translateY(-2px);
        }

        .tsg-card-top {
          display: flex;
          align-items: flex-start;
          justify-content: space-between;
          width: 100%;
        }
        .tsg-card-dot {
          width: 6px; height: 6px;
          border-radius: 50%;
          margin-top: 4px;
          opacity: 0.85;
        }
        .tsg-card-name {
          font-family: 'JetBrains Mono', monospace;
          font-size: 0.72rem;
          font-weight: 600;
          letter-spacing: 0.03em;
        }
        .tsg-card-ver {
          font-family: 'JetBrains Mono', monospace;
          font-size: 0.56rem;
          color: var(--muted);
          letter-spacing: 0.05em;
          opacity: 0.75;
        }

        .tsg-metrics {
          position: relative;
          z-index: 2;
          display: flex;
          align-items: center;
          justify-content: space-around;
          border-top: 1px solid rgba(255,255,255,0.05);
          padding: 1.2rem 1.5rem;
          background: rgba(255,255,255,0.015);
          margin: 0 -2rem;
        }
        .tsg-metric {
          display: flex;
          flex-direction: column;
          align-items: center;
          gap: 0.2rem;
        }
        .tsg-metric-val {
          font-family: var(--font-space-grotesk), sans-serif;
          font-size: 1.5rem;
          font-weight: 700;
          background: linear-gradient(135deg, var(--white), var(--cyan));
          -webkit-background-clip: text;
          -webkit-text-fill-color: transparent;
          background-clip: text;
          line-height: 1;
        }
        .tsg-metric-label {
          font-family: 'JetBrains Mono', monospace;
          font-size: 0.56rem;
          letter-spacing: 0.12em;
          text-transform: uppercase;
          color: var(--muted);
        }
        .tsg-metric-div {
          width: 1px;
          height: 36px;
          background: rgba(255,255,255,0.06);
        }

        @media (max-width: 640px) {
          .tsg-grid {
            grid-template-columns: repeat(2, 1fr);
          }
        }
      `}</style>
    </div>
  );
}
