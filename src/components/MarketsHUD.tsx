"use client";

import { useEffect, useState } from "react";

// Real UTC offsets (standard time; UK/US shift ±1h under DST, noted inline
// rather than computed exactly — good enough for "roughly when to expect a
// reply," which is the only thing this component claims to do).
const REGIONS = [
  { label: "Bengaluru (Home Base)", tz: "Asia/Kolkata", note: "IST, UTC+5:30", color: "#00d4ff" },
  { label: "Dubai / UAE", tz: "Asia/Dubai", note: "GST, UTC+4:00", color: "#a78bfa" },
  { label: "London, UK", tz: "Europe/London", note: "GMT/BST", color: "#34d399" },
  { label: "New York, US", tz: "America/New_York", note: "EST/EDT", color: "#fbbf24" },
];

function formatTime(tz: string) {
  return new Date().toLocaleTimeString("en-GB", {
    timeZone: tz,
    hour: "2-digit",
    minute: "2-digit",
    hour12: false,
  });
}

// Bengaluru working hours (9am-7pm IST), converted to each region's local
// clock, so a visitor can tell at a glance when they'd likely get a live
// reply vs. an async one.
function workingWindowLocal(tz: string) {
  const now = new Date();
  const start = new Date(now);
  const end = new Date(now);
  // Build 9:00 and 19:00 IST today, then read them back in the target zone.
  const istNow = new Date(now.toLocaleString("en-US", { timeZone: "Asia/Kolkata" }));
  start.setTime(now.getTime() - (istNow.getHours() - 9) * 3600000 - istNow.getMinutes() * 60000 - istNow.getSeconds() * 1000);
  end.setTime(now.getTime() - (istNow.getHours() - 19) * 3600000 - istNow.getMinutes() * 60000 - istNow.getSeconds() * 1000);
  const fmt = (d: Date) =>
    d.toLocaleTimeString("en-GB", { timeZone: tz, hour: "2-digit", minute: "2-digit", hour12: false });
  return `${fmt(start)}–${fmt(end)}`;
}

export default function MarketsHUD() {
  const [times, setTimes] = useState<Record<string, string>>({});

  useEffect(() => {
    const tick = () => {
      const next: Record<string, string> = {};
      REGIONS.forEach((r) => {
        next[r.tz] = formatTime(r.tz);
      });
      setTimes(next);
    };
    tick();
    const timer = setInterval(tick, 1000);
    return () => clearInterval(timer);
  }, []);

  return (
    <>
      <style>{`
        #hud-root {
          width: 100%;
          background: #020c1b;
          font-family: 'Rajdhani', sans-serif;
          position: relative;
          overflow: hidden;
          padding: 1.75rem;
          border-radius: 12px;
          border: 1px solid rgba(255,255,255,0.08);
        }
        #scanline {
          position: absolute; left: 0; width: 100%; height: 1px;
          background: linear-gradient(to right, transparent, rgba(0,212,255,0.2), rgba(0,212,255,0.4), rgba(0,212,255,0.2), transparent);
          animation: hud-scan 5s linear infinite; pointer-events: none; top: 0; z-index: 1;
        }
        @keyframes hud-scan { 0% { top: 0; opacity: 0.6; } 100% { top: 100%; opacity: 0; } }
        #top-bar {
          display: flex; align-items: center; justify-content: space-between; flex-wrap: wrap; gap: 0.5rem;
          margin-bottom: 1.5rem; padding-bottom: 1rem; border-bottom: 1px solid #0d2a45;
        }
        .top-title { font-size: 1.1rem; font-weight: 700; color: #e0f4ff; letter-spacing: 0.1em; text-transform: uppercase; }
        .top-title span { color: #00d4ff; }
        .top-note { font-family: 'JetBrains Mono', monospace; font-size: 0.7rem; color: #4a8fb0; }
        #tz-grid {
          display: grid; grid-template-columns: repeat(4, 1fr); gap: 1px;
          background: #0d2a45; border: 1px solid #0d2a45; border-radius: 8px; overflow: hidden;
        }
        .tz-panel {
          background: rgba(0,20,50,0.6); padding: 1.25rem 1rem; text-align: center;
          display: flex; flex-direction: column; gap: 0.4rem;
        }
        .tz-label { font-size: 0.85rem; font-weight: 600; color: #e0f4ff; }
        .tz-note { font-family: 'JetBrains Mono', monospace; font-size: 0.62rem; color: #4a8fb0; letter-spacing: 0.05em; }
        .tz-clock { font-family: 'JetBrains Mono', monospace; font-size: 2rem; font-weight: 700; margin: 0.4rem 0; }
        .tz-window { font-size: 0.68rem; color: #7ea8c4; line-height: 1.5; }
        .tz-window strong { color: #cfeaff; }
        @media (max-width: 800px) {
          #tz-grid { grid-template-columns: repeat(2, 1fr); }
        }
      `}</style>

      <div id="hud-root">
        <div id="scanline"></div>
        <div id="top-bar">
          <div className="top-title">NEO<span>KLYN</span> · WORKING HOURS</div>
          <div className="top-note">Bengaluru-based · one founder · real-time zones below</div>
        </div>

        <div id="tz-grid">
          {REGIONS.map((r) => (
            <div key={r.tz} className="tz-panel">
              <div className="tz-label">{r.label}</div>
              <div className="tz-note">{r.note}</div>
              <div className="tz-clock" style={{ color: r.color }}>{times[r.tz] || "--:--"}</div>
              <div className="tz-window">
                Our workday (9am–7pm IST)
                <br />
                falls at <strong>{workingWindowLocal(r.tz)}</strong> your time
              </div>
            </div>
          ))}
        </div>
      </div>
    </>
  );
}
