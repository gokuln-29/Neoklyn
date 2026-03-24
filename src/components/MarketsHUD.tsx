"use client";

import React, { useEffect, useRef, useState } from "react";

export default function MarketsHUD() {
  const [time, setTime] = useState("--:--:--");
  const radarGlRef = useRef<HTMLCanvasElement>(null);
  const radarMeRef = useRef<HTMLCanvasElement>(null);
  const radarInRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    // Clock
    const updateClock = () => {
      const now = new Date();
      const h = String(now.getUTCHours()).padStart(2, '0');
      const m = String(now.getUTCMinutes()).padStart(2, '0');
      const s = String(now.getUTCSeconds()).padStart(2, '0');
      setTime(`${h}:${m}:${s}`);
    };
    const timer = setInterval(updateClock, 1000);
    updateClock();

    // Radar Logic
    let animationFrames: number[] = [];

    const buildRadar = (
      canvas: HTMLCanvasElement, 
      color: string, 
      speed: number, 
      dots: {a: number, r: number}[]
    ) => {
      const ctx = canvas.getContext('2d');
      if (!ctx) return;
      
      const W = 160, CX = 80, CY = 80, R = 72;
      let angle = 0;
      let frameId: number;

      const draw = () => {
        ctx.clearRect(0, 0, W, W);
        ctx.fillStyle = '#020c1b';
        ctx.beginPath(); ctx.arc(CX, CY, R, 0, Math.PI * 2); ctx.fill();
        
        [0.3, 0.55, 0.8, 1].forEach(f => {
          ctx.beginPath(); ctx.arc(CX, CY, R * f, 0, Math.PI * 2);
          ctx.strokeStyle = color + '25'; ctx.lineWidth = 0.8; ctx.stroke();
        });
        
        ctx.strokeStyle = color + '20'; ctx.lineWidth = 0.6;
        ctx.beginPath(); ctx.moveTo(CX - R, CY); ctx.lineTo(CX + R, CY); ctx.stroke();
        ctx.beginPath(); ctx.moveTo(CX, CY - R); ctx.lineTo(CX, CY + R); ctx.stroke();
        
        const sweepAngle = Math.PI / 2;
        for (let i = 0; i < 16; i++) {
          const t = i / 16;
          const a = (angle - sweepAngle * t + Math.PI * 4) % (Math.PI * 2);
          ctx.beginPath(); ctx.moveTo(CX, CY);
          ctx.arc(CX, CY, R, a, a + sweepAngle / 16); ctx.lineTo(CX, CY);
          ctx.fillStyle = color + Math.round((1 - t) * 0.22 * 255).toString(16).padStart(2, '0');
          ctx.fill();
        }
        
        ctx.beginPath(); ctx.moveTo(CX, CY);
        ctx.lineTo(CX + Math.cos(angle) * R, CY + Math.sin(angle) * R);
        ctx.strokeStyle = color; ctx.lineWidth = 1.5;
        ctx.shadowColor = color; ctx.shadowBlur = 8; ctx.stroke(); ctx.shadowBlur = 0;
        
        dots.forEach(d => {
          const diff = ((angle - d.a) % (Math.PI * 2) + Math.PI * 2) % (Math.PI * 2);
          const fade = diff < Math.PI ? 1 - diff / Math.PI : 0;
          if (fade > 0.05) {
            const bx = CX + Math.cos(d.a) * R * d.r;
            const by = CY + Math.sin(d.a) * R * d.r;
            ctx.beginPath(); ctx.arc(bx, by, 3, 0, Math.PI * 2);
            ctx.fillStyle = color; ctx.globalAlpha = fade;
            ctx.shadowColor = color; ctx.shadowBlur = 10; ctx.fill();
            ctx.shadowBlur = 0; ctx.globalAlpha = 1;
          }
        });
        
        ctx.beginPath(); ctx.arc(CX, CY, 3, 0, Math.PI * 2);
        ctx.fillStyle = color; ctx.shadowColor = color; ctx.shadowBlur = 10; ctx.fill(); ctx.shadowBlur = 0;
        
        ctx.beginPath(); ctx.arc(CX, CY, R, 0, Math.PI * 2);
        ctx.strokeStyle = color + '55'; ctx.lineWidth = 1.5; ctx.stroke();
        
        angle = (angle + speed) % (Math.PI * 2);
        frameId = requestAnimationFrame(draw);
      };
      
      frameId = requestAnimationFrame(draw);
      animationFrames.push(frameId);
    };

    if (radarGlRef.current) buildRadar(radarGlRef.current, '#00d4ff', 0.018, [{a:0.5,r:0.45},{a:2.1,r:0.65},{a:3.8,r:0.35},{a:4.9,r:0.7},{a:1.2,r:0.55},{a:5.8,r:0.4}]);
    if (radarMeRef.current) buildRadar(radarMeRef.current, '#a78bfa', 0.022, [{a:1.1,r:0.5},{a:2.7,r:0.4},{a:4.2,r:0.75},{a:5.5,r:0.3},{a:0.3,r:0.6}]);
    if (radarInRef.current) buildRadar(radarInRef.current, '#34d399', 0.020, [{a:0.8,r:0.6},{a:2.3,r:0.35},{a:3.5,r:0.7},{a:5.0,r:0.5},{a:1.6,r:0.4},{a:4.7,r:0.55}]);

    return () => {
      clearInterval(timer);
      animationFrames.forEach(cancelAnimationFrame);
    };
  }, []);

  // Helper arrays for pure JSX rendering without direct DOM manip
  const getSignalBarsStyles = (count: number, color: string) => {
    const heights = [8, 12, 16, 20, 24, 20, 24, 28];
    return heights.slice(0, count).map((h, i) => ({
      width: '7px',
      height: `${h}px`,
      borderRadius: '1px 1px 0 0',
      background: color,
      opacity: 0.4 + i * 0.08,
      animationDelay: `${i * 0.12}s`,
    }));
  };

  const renderUptimeBlocks = (onCount: number, color: string) => {
    return Array.from({ length: 30 }).map((_, i) => (
      <div
        key={i}
        className={`uptime-block ${i >= onCount ? 'off' : ''}`}
        style={{
          width: '8px', height: '8px', borderRadius: '1px',
          background: i < onCount ? color : '#0d2a45',
          opacity: i >= onCount ? 1 : 0.9,
        }}
      />
    ));
  };

  return (
    <>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Share+Tech+Mono&family=Rajdhani:wght@400;500;600;700&display=swap');
        
        #hud-root { width: 100%; background: #020c1b; font-family: 'Rajdhani', sans-serif; position: relative; overflow: hidden; min-height: 600px; padding: 20px; border-radius: 12px; border: 1px solid rgba(255,255,255,0.05); }
        .hud-box { position: relative; border: 1px solid #1a3a5c; background: rgba(0, 20, 50, 0.6); }
        .hud-box::before, .hud-box::after { content: ''; position: absolute; width: 12px; height: 12px; border-color: #2a9fd6; border-style: solid; }
        .hud-box::before { top: -1px; left: -1px; border-width: 2px 0 0 2px; }
        .hud-box::after { bottom: -1px; right: -1px; border-width: 0 2px 2px 0; }
        
        .hud-label { font-family: 'Share Tech Mono', monospace; font-size: 9px; letter-spacing: 0.15em; color: #2a9fd6; opacity: 0.7; margin-bottom: 6px; }
        .hud-label::before { content: '[ '; opacity: 0.5; }
        .hud-label::after { content: ' ]'; opacity: 0.5; }
        
        #top-bar { display: flex; align-items: center; justify-content: space-between; margin-bottom: 16px; padding: 10px 14px; border-bottom: 1px solid #0d2a45; }
        .top-title { font-size: 20px; font-weight: 700; color: #e0f4ff; letter-spacing: 0.12em; text-transform: uppercase; }
        .top-title span { color: #2a9fd6; }
        .sys-status { display: flex; align-items: center; gap: 8px; font-family: 'Share Tech Mono', monospace; font-size: 10px; color: #2a9fd6; }
        
        .status-dot { width: 7px; height: 7px; border-radius: 50%; background: #2a9fd6; box-shadow: 0 0 8px #2a9fd6; animation: hud-blink 1.4s ease-in-out infinite; }
        @keyframes hud-blink { 0%, 100% { opacity: 1; } 50% { opacity: 0.2; } }
        
        #main-grid { display: grid; grid-template-columns: 1fr; gap: 14px; margin-bottom: 14px; }
        @media (min-width: 768px) { #main-grid { grid-template-columns: 1fr 1fr 1fr; } }
        
        .radar-panel { padding: 14px; text-align: center; }
        .radar-wrap { position: relative; width: 160px; height: 160px; margin: 8px auto 12px; }
        .radar-canvas { width: 160px; height: 160px; border-radius: 50%; display: block; }
        .radar-region { font-size: 16px; font-weight: 700; color: #e0f4ff; letter-spacing: 0.1em; margin-bottom: 4px; text-transform: uppercase; }
        .radar-hubs { font-family: 'Share Tech Mono', monospace; font-size: 9px; color: #4a8fb0; line-height: 1.85; }
        
        .region-tag { display: inline-block; font-size: 10px; font-weight: 600; letter-spacing: 0.12em; padding: 3px 10px; border: 1px solid; margin-bottom: 8px; border-radius: 2px; }
        .tag-global { color: #00d4ff; border-color: #00d4ff44; background: rgba(0, 212, 255, 0.07); }
        .tag-me { color: #a78bfa; border-color: #a78bfa44; background: rgba(167, 139, 250, 0.07); }
        .tag-india { color: #34d399; border-color: #34d39944; background: rgba(52, 211, 153, 0.07); }
        
        .signal-bars { display: flex; align-items: flex-end; gap: 3px; height: 28px; justify-content: center; margin-top: 8px; }
        .signal-bar { width: 7px; border-radius: 1px 1px 0 0; animation: bar-pulse 1.5s ease-in-out infinite; }
        @keyframes bar-pulse { 0%, 100% { opacity: 1; } 50% { opacity: 0.5; } }
        
        #stats-row { display: grid; grid-template-columns: 1fr 1fr; gap: 14px; }
        @media (min-width: 768px) { #stats-row { grid-template-columns: repeat(4, 1fr); } }
        
        .stat-panel { padding: 12px 16px; display: flex; flex-direction: column; gap: 4px; }
        .stat-num { font-size: 28px; font-weight: 700; color: #e0f4ff; line-height: 1; letter-spacing: -0.02em; }
        .stat-unit { font-size: 11px; font-weight: 600; letter-spacing: 0.1em; margin-top: 2px; }
        .stat-bar-wrap { height: 3px; background: #0d2a45; border-radius: 2px; margin-top: 8px; overflow: hidden; }
        .stat-bar-fill { height: 100%; border-radius: 2px; animation: hud-fill-in 2s ease forwards; }
        @keyframes hud-fill-in { from { width: 0; } }
        
        #scanline { position: absolute; left: 0; width: 100%; height: 1px; background: linear-gradient(to right, transparent, rgba(42, 159, 214, 0.13), rgba(42, 159, 214, 0.26), rgba(42, 159, 214, 0.13), transparent); animation: hud-scan 5s linear infinite; pointer-events: none; top: 0; z-index: 10; }
        @keyframes hud-scan { 0% { top: 0; opacity: 0.6; } 100% { top: 100%; opacity: 0; } }
        
        #ticker { padding: 8px 14px; display: flex; gap: 24px; overflow: hidden; border-top: 1px solid #0d2a45; margin-top: 14px; }
        .tick-item { font-family: 'Share Tech Mono', monospace; font-size: 9px; color: #2a9fd6; opacity: 0.6; white-space: nowrap; animation: ticker-move 22s linear infinite; }
        @keyframes ticker-move { 0% { transform: translateX(0); } 100% { transform: translateX(-100%); } }
        
        .uptime-row { display: flex; gap: 3px; margin-top: 6px; justify-content: center; }
      `}</style>

      <div id="hud-root">
        <div id="scanline"></div>

        <div id="top-bar">
          <div className="top-title">NEO<span>KLYN</span> · GLOBAL OPERATIONS HUD</div>
          <div className="sys-status">
            <div className="status-dot"></div>
            ALL SYSTEMS NOMINAL &nbsp;|&nbsp;
            <span>{time}</span> &nbsp;UTC
          </div>
        </div>

        <div id="main-grid">
          {/* Global Delivery */}
          <div className="hud-box radar-panel">
            <div className="hud-label">REGION 01</div>
            <div className="region-tag tag-global">GLOBAL DELIVERY</div>
            <div className="radar-wrap">
              <canvas className="radar-canvas" ref={radarGlRef} width={160} height={160}></canvas>
            </div>
            <div className="radar-region">WORLDWIDE</div>
            <div className="radar-hubs">
              ◆ New York &nbsp;·&nbsp; ACTIVE<br />
              ◆ Los Angeles &nbsp;·&nbsp; ACTIVE<br />
              ◆ Toronto &nbsp;·&nbsp; ACTIVE<br />
              ◆ London &nbsp;·&nbsp; ACTIVE<br />
              ◆ Berlin &nbsp;·&nbsp; ACTIVE
            </div>
            <div className="signal-bars">
              {getSignalBarsStyles(8, '#00d4ff').map((style, i) => (
                <div key={i} className="signal-bar" style={style}></div>
              ))}
            </div>
            <div className="uptime-row">
              {renderUptimeBlocks(29, '#00d4ff')}
            </div>
          </div>

          {/* Middle East */}
          <div className="hud-box radar-panel">
            <div className="hud-label">REGION 02</div>
            <div className="region-tag tag-me">MIDDLE EAST</div>
            <div className="radar-wrap">
              <canvas className="radar-canvas" ref={radarMeRef} width={160} height={160}></canvas>
            </div>
            <div className="radar-region">DUBAI</div>
            <div className="radar-hubs">
              ◆ Dubai &nbsp;·&nbsp; ACTIVE<br />
              ◆ Abu Dhabi &nbsp;·&nbsp; ACTIVE<br />
              ◆ Sharjah &nbsp;·&nbsp; ACTIVE<br />
              ◆ Riyadh &nbsp;·&nbsp; ACTIVE
            </div>
            <div className="signal-bars">
              {getSignalBarsStyles(7, '#a78bfa').map((style, i) => (
                <div key={i} className="signal-bar" style={style}></div>
              ))}
            </div>
            <div className="uptime-row">
              {renderUptimeBlocks(28, '#a78bfa')}
            </div>
          </div>

          {/* India Tech Hubs */}
          <div className="hud-box radar-panel">
            <div className="hud-label">REGION 03</div>
            <div className="region-tag tag-india">INDIA TECH HUBS</div>
            <div className="radar-wrap">
              <canvas className="radar-canvas" ref={radarInRef} width={160} height={160}></canvas>
            </div>
            <div className="radar-region">BANGALORE</div>
            <div className="radar-hubs">
              ◆ Bangalore &nbsp;·&nbsp; ACTIVE<br />
              ◆ Chennai &nbsp;·&nbsp; ACTIVE<br />
              ◆ Mumbai &nbsp;·&nbsp; ACTIVE<br />
              ◆ Hyderabad &nbsp;·&nbsp; ACTIVE
            </div>
            <div className="signal-bars">
              {getSignalBarsStyles(8, '#34d399').map((style, i) => (
                <div key={i} className="signal-bar" style={style}></div>
              ))}
            </div>
            <div className="uptime-row">
              {renderUptimeBlocks(30, '#34d399')}
            </div>
          </div>
        </div>

        <div id="stats-row">
          <div className="hud-box stat-panel">
            <div className="hud-label">CITIES</div>
            <div className="stat-num">21</div>
            <div className="stat-unit" style={{ color: '#2a9fd6' }}>ACTIVE NODES</div>
            <div className="stat-bar-wrap"><div className="stat-bar-fill" style={{ width: '72%', background: 'linear-gradient(to right, #1a4a8a, #2a9fd6)' }}></div></div>
          </div>
          <div className="hud-box stat-panel">
            <div className="hud-label">CONTINENTS</div>
            <div className="stat-num">6</div>
            <div className="stat-unit" style={{ color: '#a78bfa' }}>ZONES COVERED</div>
            <div className="stat-bar-wrap"><div className="stat-bar-fill" style={{ width: '85%', background: 'linear-gradient(to right, #3b1fa8, #a78bfa)' }}></div></div>
          </div>
          <div className="hud-box stat-panel">
            <div className="hud-label">REACH</div>
            <div className="stat-num">150<span style={{ fontSize: '18px', color: '#2a9fd6' }}>+</span></div>
            <div className="stat-unit" style={{ color: '#34d399' }}>COUNTRIES SERVED</div>
            <div className="stat-bar-wrap"><div className="stat-bar-fill" style={{ width: '95%', background: 'linear-gradient(to right, #065f46, #34d399)' }}></div></div>
          </div>
          <div className="hud-box stat-panel">
            <div className="hud-label">UPTIME</div>
            <div className="stat-num">24<span style={{ fontSize: '18px', color: '#2a9fd6' }}>/7</span></div>
            <div className="stat-unit" style={{ color: '#00d4ff' }}>LIVE COVERAGE</div>
            <div className="stat-bar-wrap"><div className="stat-bar-fill" style={{ width: '100%', background: 'linear-gradient(to right, #064e6e, #00d4ff)' }}></div></div>
          </div>
        </div>

        <div id="ticker">
          <span className="tick-item">
            ◆ SYS:ONLINE &nbsp;///&nbsp; GLOBAL DELIVERY UPLINK STABLE &nbsp;///&nbsp; MIDDLE EAST UPLINK STABLE &nbsp;///&nbsp; INDIA TECH HUBS UPLINK STABLE &nbsp;///&nbsp; 150+ COUNTRIES SERVED &nbsp;///&nbsp; RESPONSE TIME: &lt;2H &nbsp;///&nbsp; CLIENT SATISFACTION: 98% &nbsp;///&nbsp; PROJECTS DEPLOYED: 120+ &nbsp;///&nbsp; DUBAI · ABU DHABI · SHARJAH · RIYADH · BANGALORE · CHENNAI · MUMBAI · HYDERABAD &nbsp;///&nbsp; ALL NODES NOMINAL &nbsp;///&nbsp;
          </span>
          <span className="tick-item" aria-hidden="true">
            ◆ SYS:ONLINE &nbsp;///&nbsp; GLOBAL DELIVERY UPLINK STABLE &nbsp;///&nbsp; MIDDLE EAST UPLINK STABLE &nbsp;///&nbsp; INDIA TECH HUBS UPLINK STABLE &nbsp;///&nbsp; 150+ COUNTRIES SERVED &nbsp;///&nbsp; RESPONSE TIME: &lt;2H &nbsp;///&nbsp; CLIENT SATISFACTION: 98% &nbsp;///&nbsp; PROJECTS DEPLOYED: 120+ &nbsp;///&nbsp; DUBAI · ABU DHABI · SHARJAH · RIYADH · BANGALORE · CHENNAI · MUMBAI · HYDERABAD &nbsp;///&nbsp; ALL NODES NOMINAL &nbsp;///&nbsp;
          </span>
        </div>
      </div>
    </>
  );
}
