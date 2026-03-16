import CTASection from "@/components/CTASection";

export default function MarketsPage() {
    return (
        <main style={{ paddingTop: '8rem' }}>
            <section className="section">
                <div className="reveal" style={{ textAlign: 'center', maxWidth: '800px', margin: '0 auto 4rem' }}>
                    <div className="s-label" style={{ justifyContent: 'center' }}>Global Presence</div>
                    <h1 className="hero-title" style={{ fontSize: 'clamp(3rem,8vw,6rem)', marginBottom: '1rem' }}>
                        <span className="title-outline">OUR</span>{' '}
                        <span className="title-cyan">MARKETS</span>
                    </h1>
                    <p className="hero-desc" style={{ margin: '0 auto' }}>
                        Operating seamlessly across time zones to deliver enterprise digital transformation exactly when you need it.
                    </p>
                </div>

                {/* ═══ PREMIUM WORLD MAP — IMAGE + GLOBAL CITY NETWORK ═══ */}
                <div className="wmap-wrap reveal">

                    {/* Aurora border */}
                    <div className="wmap-aurora"/>

                    {/* Real satellite world map image */}
                    {/* eslint-disable-next-line @next/next/no-img-element */}
                    <img src="/world-map.png" alt="World Map" className="wmap-img"/>

                    {/* Dark overlay */}
                    <div className="wmap-overlay"/>

                    {/* Scanline sweep */}
                    <div className="wmap-scanline"/>

                    {/* SVG Overlay — Arcs + 21 City Pins */}
                    <svg className="wmap-svg" viewBox="0 0 1000 520" xmlns="http://www.w3.org/2000/svg" preserveAspectRatio="xMidYMid meet">
                        <defs>
                            <filter id="arc-glow" x="-20%" y="-20%" width="140%" height="140%">
                                <feGaussianBlur stdDeviation="2" result="b"/>
                                <feMerge><feMergeNode in="b"/><feMergeNode in="SourceGraphic"/></feMerge>
                            </filter>
                            <filter id="city-glow" x="-150%" y="-150%" width="400%" height="400%">
                                <feGaussianBlur stdDeviation="4" result="b"/>
                                <feMerge><feMergeNode in="b"/><feMergeNode in="SourceGraphic"/></feMerge>
                            </filter>
                            <filter id="beam-glow" x="-200%" y="-200%" width="500%" height="500%">
                                <feGaussianBlur stdDeviation="3" result="b"/>
                                <feMerge><feMergeNode in="b"/><feMergeNode in="SourceGraphic"/></feMerge>
                            </filter>
                            <radialGradient id="hub-ny"><stop offset="0%" stopColor="#06B6D4" stopOpacity="1"/><stop offset="100%" stopColor="#06B6D4" stopOpacity="0"/></radialGradient>
                            <radialGradient id="hub-dub"><stop offset="0%" stopColor="#7C3AED" stopOpacity="1"/><stop offset="100%" stopColor="#7C3AED" stopOpacity="0"/></radialGradient>
                            <radialGradient id="hub-mum"><stop offset="0%" stopColor="#3B82F6" stopOpacity="1"/><stop offset="100%" stopColor="#3B82F6" stopOpacity="0"/></radialGradient>
                        </defs>

                        {/* ARC NETWORK */}
                        <path id="ny-la"     d="M295,275 Q240,240 180,300" fill="none" stroke="rgba(6,182,212,0.35)"  strokeWidth="1"   strokeDasharray="5 6" className="garc"/>
                        <path id="ny-tor"    d="M295,275 Q292,265 289,255" fill="none" stroke="rgba(6,182,212,0.25)"  strokeWidth="0.8" strokeDasharray="4 6" className="garc"/>
                        <path id="ny-sao"    d="M295,275 Q332,325 370,380" fill="none" stroke="rgba(59,130,246,0.3)"  strokeWidth="0.8" strokeDasharray="4 7" className="garc"/>
                        <path id="ny-lon"    d="M295,275 Q397,155 500,225" fill="none" stroke="rgba(6,182,212,0.55)"  strokeWidth="1.4" strokeDasharray="5 5" className="garc"/>
                        <path id="ny-dubai"  d="M295,275 Q474,120 654,300" fill="none" stroke="rgba(6,182,212,0.5)"   strokeWidth="1.5" strokeDasharray="6 5" className="garc"/>
                        <path id="ny-mumbai" d="M295,275 Q499,90  703,325" fill="none" stroke="rgba(59,130,246,0.4)"  strokeWidth="1.2" strokeDasharray="5 6" className="garc"/>
                        <path id="ny-tok"    d="M295,275 Q440,70  888,285" fill="none" stroke="rgba(6,182,212,0.25)"  strokeWidth="0.8" strokeDasharray="4 8" className="garc"/>
                        <path id="lon-par"   d="M500,225 Q503,230 506,235" fill="none" stroke="rgba(255,255,255,0.2)" strokeWidth="0.7" strokeDasharray="3 5" className="garc"/>
                        <path id="lon-ber"   d="M500,225 Q518,222 537,220" fill="none" stroke="rgba(255,255,255,0.2)" strokeWidth="0.7" strokeDasharray="3 5" className="garc"/>
                        <path id="lon-ist"   d="M500,225 Q540,250 580,270" fill="none" stroke="rgba(124,58,237,0.35)" strokeWidth="1"   strokeDasharray="5 6" className="garc"/>
                        <path id="lon-mos"   d="M500,225 Q552,212 605,200" fill="none" stroke="rgba(255,255,255,0.2)" strokeWidth="0.7" strokeDasharray="4 7" className="garc"/>
                        <path id="lon-lago"  d="M500,225 Q505,290 510,348" fill="none" stroke="rgba(59,130,246,0.25)" strokeWidth="0.8" strokeDasharray="4 7" className="garc"/>
                        <path id="lon-dubai" d="M500,225 Q577,165 654,300" fill="none" stroke="rgba(124,58,237,0.45)" strokeWidth="1.2" strokeDasharray="5 5" className="garc"/>
                        <path id="dub-riy"   d="M654,300 Q642,302 630,305" fill="none" stroke="rgba(124,58,237,0.3)" strokeWidth="0.7" strokeDasharray="3 5" className="garc"/>
                        <path id="dub-nai"   d="M654,300 Q628,335 602,367" fill="none" stroke="rgba(124,58,237,0.35)" strokeWidth="0.9" strokeDasharray="4 6" className="garc"/>
                        <path id="dub-mum"   d="M654,300 Q678,312 703,325" fill="none" stroke="rgba(124,58,237,0.6)"  strokeWidth="1.5" strokeDasharray="6 5" className="garc"/>
                        <path id="dub-sin"   d="M654,300 Q721,330 788,365" fill="none" stroke="rgba(124,58,237,0.4)"  strokeWidth="1"   strokeDasharray="5 6" className="garc"/>
                        <path id="dub-bei"   d="M654,300 Q739,195 824,275" fill="none" stroke="rgba(59,130,246,0.3)"  strokeWidth="1"   strokeDasharray="5 6" className="garc"/>
                        <path id="mum-del"   d="M703,325 Q709,307 715,290" fill="none" stroke="rgba(59,130,246,0.3)"  strokeWidth="0.7" strokeDasharray="3 5" className="garc"/>
                        <path id="mum-sin"   d="M703,325 Q745,344 788,365" fill="none" stroke="rgba(59,130,246,0.45)" strokeWidth="1.2" strokeDasharray="5 5" className="garc"/>
                        <path id="mum-tok"   d="M703,325 Q795,255 888,285" fill="none" stroke="rgba(59,130,246,0.3)"  strokeWidth="1"   strokeDasharray="5 6" className="garc"/>
                        <path id="sin-jak"   d="M788,365 Q792,372 797,380" fill="none" stroke="rgba(59,130,246,0.25)" strokeWidth="0.7" strokeDasharray="3 5" className="garc"/>
                        <path id="sin-tok"   d="M788,365 Q838,322 888,285" fill="none" stroke="rgba(59,130,246,0.3)"  strokeWidth="0.8" strokeDasharray="4 6" className="garc"/>
                        <path id="bei-seo"   d="M824,275 Q838,277 853,280" fill="none" stroke="rgba(255,255,255,0.2)" strokeWidth="0.7" strokeDasharray="3 5" className="garc"/>
                        <path id="seo-tok"   d="M853,280 Q870,282 888,285" fill="none" stroke="rgba(255,255,255,0.2)" strokeWidth="0.7" strokeDasharray="3 5" className="garc"/>
                        <path id="tok-syd"   d="M888,285 Q904,350 920,420" fill="none" stroke="rgba(59,130,246,0.3)"  strokeWidth="0.8" strokeDasharray="4 6" className="garc"/>
                        <path id="ist-mos"   d="M580,270 Q592,235 605,200" fill="none" stroke="rgba(255,255,255,0.18)" strokeWidth="0.7" strokeDasharray="3 6" className="garc"/>

                        {/* TRAVELLING BEAMS */}
                        <circle r="4.5" fill="#06B6D4" filter="url(#beam-glow)"><animateMotion dur="5s" repeatCount="indefinite"><mpath href="#ny-lon"/></animateMotion></circle>
                        <circle r="3"   fill="#06B6D4" filter="url(#beam-glow)"><animateMotion dur="5s" repeatCount="indefinite" begin="2.5s" keyPoints="1;0" keyTimes="0;1" calcMode="linear"><mpath href="#ny-lon"/></animateMotion></circle>
                        <circle r="5"   fill="#06B6D4" filter="url(#beam-glow)"><animateMotion dur="7s" repeatCount="indefinite" begin="0.5s"><mpath href="#ny-dubai"/></animateMotion></circle>
                        <circle r="3.5" fill="#7C3AED" filter="url(#beam-glow)"><animateMotion dur="7s" repeatCount="indefinite" begin="4s" keyPoints="1;0" keyTimes="0;1" calcMode="linear"><mpath href="#ny-dubai"/></animateMotion></circle>
                        <circle r="4"   fill="#3B82F6" filter="url(#beam-glow)"><animateMotion dur="8s" repeatCount="indefinite" begin="1s"><mpath href="#ny-mumbai"/></animateMotion></circle>
                        <circle r="4"   fill="#7C3AED" filter="url(#beam-glow)"><animateMotion dur="5s" repeatCount="indefinite" begin="0.3s"><mpath href="#lon-dubai"/></animateMotion></circle>
                        <circle r="3"   fill="#06B6D4" filter="url(#beam-glow)"><animateMotion dur="5s" repeatCount="indefinite" begin="2.8s" keyPoints="1;0" keyTimes="0;1" calcMode="linear"><mpath href="#lon-dubai"/></animateMotion></circle>
                        <circle r="5"   fill="#7C3AED" filter="url(#beam-glow)"><animateMotion dur="3s" repeatCount="indefinite"><mpath href="#dub-mum"/></animateMotion></circle>
                        <circle r="3.5" fill="#3B82F6" filter="url(#beam-glow)"><animateMotion dur="3s" repeatCount="indefinite" begin="1.5s" keyPoints="1;0" keyTimes="0;1" calcMode="linear"><mpath href="#dub-mum"/></animateMotion></circle>
                        <circle r="3.5" fill="#7C3AED" filter="url(#beam-glow)"><animateMotion dur="5s" repeatCount="indefinite" begin="0.7s"><mpath href="#dub-sin"/></animateMotion></circle>
                        <circle r="3.5" fill="#3B82F6" filter="url(#beam-glow)"><animateMotion dur="6s" repeatCount="indefinite" begin="1.2s"><mpath href="#mum-tok"/></animateMotion></circle>
                        <circle r="3"   fill="#3B82F6" filter="url(#beam-glow)"><animateMotion dur="4.5s" repeatCount="indefinite" begin="0.9s"><mpath href="#sin-tok"/></animateMotion></circle>
                        <circle r="3"   fill="#06B6D4" filter="url(#beam-glow)" opacity="0.7"><animateMotion dur="10s" repeatCount="indefinite" begin="2s"><mpath href="#ny-tok"/></animateMotion></circle>

                        {/* SECONDARY CITY DOTS */}
                        {[
                            [180,300],[289,255],[370,380],
                            [506,235],[537,220],[580,270],[605,200],
                            [630,305],[510,348],[602,367],
                            [715,290],[797,380],[824,275],[853,280],[920,420]
                        ].map(([cx,cy],i) => (
                            <g key={i}>
                                <circle cx={cx} cy={cy} r="5" fill="rgba(255,255,255,0.15)" filter="url(#city-glow)"/>
                                <circle cx={cx} cy={cy} r="2.5" fill="white" opacity="0.85"/>
                            </g>
                        ))}

                        {/* PRIMARY HUB — New York */}
                        <g filter="url(#city-glow)">
                            <circle cx="295" cy="275" r="20" fill="url(#hub-ny)" opacity="0.45"/>
                            <circle cx="295" cy="275" r="9"  fill="rgba(6,182,212,0.25)" stroke="#06B6D4" strokeWidth="1.5"/>
                            <circle cx="295" cy="275" r="4"  fill="#06B6D4"/>
                            <circle cx="295" cy="275" r="17" fill="none" stroke="#06B6D4" strokeWidth="0.8" opacity="0.5" className="pin-ring"/>
                            <circle cx="295" cy="275" r="28" fill="none" stroke="#06B6D4" strokeWidth="0.5" opacity="0.2" className="pin-ring" style={{animationDelay:'0.7s'}}/>
                        </g>
                        {/* PRIMARY HUB — Dubai */}
                        <g filter="url(#city-glow)">
                            <circle cx="654" cy="300" r="20" fill="url(#hub-dub)" opacity="0.45"/>
                            <circle cx="654" cy="300" r="9"  fill="rgba(124,58,237,0.25)" stroke="#7C3AED" strokeWidth="1.5"/>
                            <circle cx="654" cy="300" r="4"  fill="#7C3AED"/>
                            <circle cx="654" cy="300" r="17" fill="none" stroke="#7C3AED" strokeWidth="0.8" opacity="0.5" className="pin-ring" style={{animationDelay:'0.3s'}}/>
                            <circle cx="654" cy="300" r="28" fill="none" stroke="#7C3AED" strokeWidth="0.5" opacity="0.2" className="pin-ring" style={{animationDelay:'1s'}}/>
                        </g>
                        {/* PRIMARY HUB — Mumbai */}
                        <g filter="url(#city-glow)">
                            <circle cx="703" cy="325" r="20" fill="url(#hub-mum)" opacity="0.45"/>
                            <circle cx="703" cy="325" r="9"  fill="rgba(59,130,246,0.25)" stroke="#3B82F6" strokeWidth="1.5"/>
                            <circle cx="703" cy="325" r="4"  fill="#3B82F6"/>
                            <circle cx="703" cy="325" r="17" fill="none" stroke="#3B82F6" strokeWidth="0.8" opacity="0.5" className="pin-ring" style={{animationDelay:'0.6s'}}/>
                            <circle cx="703" cy="325" r="28" fill="none" stroke="#3B82F6" strokeWidth="0.5" opacity="0.2" className="pin-ring" style={{animationDelay:'1.3s'}}/>
                        </g>
                        {/* London secondary hub */}
                        <g filter="url(#city-glow)">
                            <circle cx="500" cy="225" r="12" fill="rgba(255,255,255,0.1)" stroke="rgba(255,255,255,0.5)" strokeWidth="1.2"/>
                            <circle cx="500" cy="225" r="3.5" fill="white"/>
                        </g>
                        {/* Singapore secondary hub */}
                        <g filter="url(#city-glow)">
                            <circle cx="788" cy="365" r="10" fill="rgba(59,130,246,0.15)" stroke="rgba(59,130,246,0.5)" strokeWidth="1.2"/>
                            <circle cx="788" cy="365" r="3" fill="#3B82F6"/>
                        </g>
                        {/* Tokyo secondary hub */}
                        <g filter="url(#city-glow)">
                            <circle cx="888" cy="285" r="10" fill="rgba(59,130,246,0.15)" stroke="rgba(59,130,246,0.5)" strokeWidth="1.2"/>
                            <circle cx="888" cy="285" r="3" fill="#3B82F6"/>
                        </g>
                    </svg>

                    {/* Active Hub floating cards */}
                    <div className="wmap-card" style={{'--cc':'#06B6D4', left:'20%', bottom:'18%'} as React.CSSProperties}>
                        <div className="wmap-card-flag">🇺🇸</div>
                        <div className="wmap-card-info">
                            <span className="wmap-card-city">New York <span className="hub-badge">ACTIVE HUB</span></span>
                            <span className="wmap-card-tz">EST · UTC−5</span>
                        </div>
                        <div className="wmap-card-dot"/>
                    </div>
                    <div className="wmap-card" style={{'--cc':'#7C3AED', left:'58%', bottom:'24%'} as React.CSSProperties}>
                        <div className="wmap-card-flag">🇦🇪</div>
                        <div className="wmap-card-info">
                            <span className="wmap-card-city">Dubai <span className="hub-badge">ACTIVE HUB</span></span>
                            <span className="wmap-card-tz">GST · UTC+4</span>
                        </div>
                        <div className="wmap-card-dot"/>
                    </div>
                    <div className="wmap-card" style={{'--cc':'#3B82F6', left:'65%', bottom:'12%'} as React.CSSProperties}>
                        <div className="wmap-card-flag">🇮🇳</div>
                        <div className="wmap-card-info">
                            <span className="wmap-card-city">Mumbai <span className="hub-badge">ACTIVE HUB</span></span>
                            <span className="wmap-card-tz">IST · UTC+5:30</span>
                        </div>
                        <div className="wmap-card-dot"/>
                    </div>

                    {/* Coverage stat bar */}
                    <div className="wmap-cover-bar">
                        <div className="wmap-cover-item"><span className="wmap-cover-n">21</span><span className="wmap-cover-l">Cities</span></div>
                        <div className="wmap-cover-sep"/>
                        <div className="wmap-cover-item"><span className="wmap-cover-n">6</span><span className="wmap-cover-l">Continents</span></div>
                        <div className="wmap-cover-sep"/>
                        <div className="wmap-cover-item"><span className="wmap-cover-n">150<span style={{fontSize:'0.65em',opacity:0.7}}>+</span></span><span className="wmap-cover-l">Countries Served</span></div>
                        <div className="wmap-cover-sep"/>
                        <div className="wmap-cover-item"><span className="wmap-cover-n">24/7</span><span className="wmap-cover-l">Coverage</span></div>
                    </div>

                    <style>{`
                        .wmap-wrap {
                            position: relative;
                            height: 540px;
                            border-radius: 20px;
                            border: 1px solid rgba(255,255,255,0.07);
                            overflow: hidden;
                            margin: 4rem 0;
                            box-shadow:
                                0 0 0 1px rgba(255,255,255,0.03),
                                0 40px 120px rgba(0,0,0,0.8),
                                inset 0 1px 0 rgba(255,255,255,0.05);
                        }
                        .wmap-img {
                            position: absolute; inset: 0;
                            width: 100%; height: 100%;
                            object-fit: cover; object-position: center;
                            z-index: 0; opacity: 0.8;
                        }
                        .wmap-overlay {
                            position: absolute; inset: 0; z-index: 1;
                            background:
                                radial-gradient(ellipse 80% 60% at 50% 50%, rgba(0,0,0,0.05) 0%, rgba(0,0,0,0.4) 100%),
                                linear-gradient(to bottom, rgba(2,2,8,0.25) 0%, rgba(2,2,8,0.1) 50%, rgba(2,2,8,0.55) 100%);
                            pointer-events: none;
                        }
                        .wmap-aurora {
                            position: absolute; inset: -2px; border-radius: 22px;
                            background: conic-gradient(
                                from var(--wa, 0deg),
                                transparent 0deg, rgba(6,182,212,0.5) 60deg, transparent 120deg,
                                rgba(124,58,237,0.4) 200deg, transparent 260deg,
                                rgba(59,130,246,0.4) 320deg, transparent 360deg
                            );
                            animation: wa-spin 10s linear infinite; z-index: 0;
                            mask: linear-gradient(#fff,#fff) content-box, linear-gradient(#fff,#fff);
                            mask-composite: xor;
                            -webkit-mask: linear-gradient(#fff,#fff) content-box, linear-gradient(#fff,#fff);
                            -webkit-mask-composite: xor;
                            padding: 2px; pointer-events: none;
                        }
                        @property --wa { syntax: '<angle>'; initial-value: 0deg; inherits: false; }
                        @keyframes wa-spin { to { --wa: 360deg; } }
                        .wmap-svg {
                            position: absolute; inset: 0;
                            width: 100%; height: 100%; z-index: 3;
                        }
                        .garc { animation: garc-flow 2.5s linear infinite; }
                        @keyframes garc-flow { to { stroke-dashoffset: -22; } }
                        .pin-ring {
                            animation: pin-expand 2.8s ease-out infinite;
                            transform-origin: center;
                        }
                        @keyframes pin-expand {
                            0%   { opacity: 0.7; transform: scale(0.5); }
                            100% { opacity: 0;   transform: scale(1.8); }
                        }
                        .wmap-scanline {
                            position: absolute; top: 0; left: -80%; width: 50%; height: 100%;
                            background: linear-gradient(90deg, transparent 0%, rgba(6,182,212,0.05) 50%, transparent 100%);
                            z-index: 6; animation: wscan 9s linear infinite; pointer-events: none;
                        }
                        @keyframes wscan { to { left: 130%; } }
                        .wmap-card {
                            position: absolute; z-index: 10;
                            display: flex; align-items: center; gap: 0.5rem;
                            padding: 0.5rem 0.85rem;
                            background: rgba(5,5,14,0.78);
                            border: 1px solid color-mix(in srgb, var(--cc) 35%, rgba(255,255,255,0.07));
                            border-radius: 10px;
                            backdrop-filter: blur(20px); -webkit-backdrop-filter: blur(20px);
                            box-shadow:
                                0 0 0 1px rgba(255,255,255,0.04), 0 8px 28px rgba(0,0,0,0.6),
                                0 0 22px color-mix(in srgb, var(--cc) 18%, transparent),
                                inset 0 1px 0 rgba(255,255,255,0.07);
                            animation: card-bob 6s ease-in-out infinite alternate;
                        }
                        @keyframes card-bob { 0% { transform: translateY(0); } 100% { transform: translateY(-7px); } }
                        .wmap-card-flag { font-size: 1.2rem; line-height: 1; }
                        .wmap-card-info { display: flex; flex-direction: column; gap: 0.1rem; }
                        .wmap-card-city { font-family: var(--font-space-grotesk), sans-serif; font-size: 0.78rem; font-weight: 700; color: var(--cc); line-height: 1; }
                        .wmap-card-tz { font-family: 'JetBrains Mono', monospace; font-size: 0.52rem; letter-spacing: 0.08em; color: var(--muted); line-height: 1; }
                        .wmap-card-dot { width: 6px; height: 6px; border-radius: 50%; background: var(--cc); box-shadow: 0 0 8px var(--cc); animation: pulse 2s ease-in-out infinite; flex-shrink: 0; }
                        .wmap-cover-bar {
                            position: absolute; z-index: 10;
                            bottom: 0; left: 0; right: 0;
                            display: flex; align-items: center; justify-content: center;
                            padding: 0.9rem 2rem;
                            background: linear-gradient(to top, rgba(2,2,10,0.92) 0%, rgba(2,2,10,0.5) 100%);
                            backdrop-filter: blur(10px);
                            border-top: 1px solid rgba(255,255,255,0.05);
                        }
                        .wmap-cover-item { display: flex; flex-direction: column; align-items: center; gap: 0.15rem; flex: 1; text-align: center; }
                        .wmap-cover-n {
                            font-family: var(--font-space-grotesk), sans-serif;
                            font-size: 1.4rem; font-weight: 700; line-height: 1;
                            background: linear-gradient(135deg, var(--white), var(--cyan));
                            -webkit-background-clip: text; -webkit-text-fill-color: transparent; background-clip: text;
                        }
                        .wmap-cover-l { font-family: 'JetBrains Mono', monospace; font-size: 0.55rem; letter-spacing: 0.12em; text-transform: uppercase; color: var(--muted); }
                        .wmap-cover-sep { width: 1px; height: 32px; background: rgba(255,255,255,0.07); }
                        .hub-badge { font-size: 0.45rem; padding: 2px 5px; border-radius: 4px; background: rgba(255,255,255,0.1); margin-left: 6px; vertical-align: middle; letter-spacing: 1px; opacity: 0.9; }
                        .m-icon { margin-bottom: 1.5rem; display: inline-flex; align-items: center; justify-content: center; position: relative; }
                        .m-icon::after { content: ''; position: absolute; inset: -10px; background: radial-gradient(circle, var(--orb-color, rgba(255,255,255,0.1)), transparent 70%); border-radius: 50%; z-index: 0; pointer-events: none; opacity: 0.5; }
                        .m-icon svg { z-index: 1; position: relative; }
                    `}</style>

                </div>

                <div className="markets-layout reveal">
                    <div className="market" style={{ '--orb-color': 'rgba(6,182,212,0.15)' } as React.CSSProperties}>
                        <div className="m-num">01</div>
                        <div className="m-icon">
                            <svg width="56" height="56" viewBox="0 0 48 48" fill="none" xmlns="http://www.w3.org/2000/svg">
                                <circle cx="24" cy="24" r="20" stroke="#06B6D4" strokeOpacity="0.3" strokeWidth="1" strokeDasharray="3 3" />
                                <ellipse cx="24" cy="24" rx="20" ry="8" stroke="#06B6D4" strokeOpacity="0.5" strokeWidth="1.2" transform="rotate(25 24 24)" />
                                <ellipse cx="24" cy="24" rx="8" ry="20" stroke="#06B6D4" strokeOpacity="0.5" strokeWidth="1.2" transform="rotate(25 24 24)" />
                                <circle cx="16" cy="18" r="3" fill="#06B6D4" style={{ filter: 'drop-shadow(0 0 6px #06B6D4)' }} />
                                <circle cx="20" cy="30" r="1.5" fill="#06B6D4" />
                            </svg>
                        </div>
                        <div className="m-name">Americas</div>
                        <p className="m-desc">Serving clients globally with dedicated active hubs in the US. We align seamlessly with Western timelines, compliance standards, and product expectations.</p>
                        <span className="m-tag">Active Hubs: New York, LA, Toronto</span>
                    </div>
                    <div className="market" style={{ '--orb-color': 'rgba(124,58,237,0.15)' } as React.CSSProperties}>
                        <div className="m-num">02</div>
                        <div className="m-icon">
                            <svg width="56" height="56" viewBox="0 0 48 48" fill="none" xmlns="http://www.w3.org/2000/svg">
                                <circle cx="24" cy="24" r="20" stroke="#7C3AED" strokeOpacity="0.3" strokeWidth="1" strokeDasharray="3 3" />
                                <ellipse cx="24" cy="24" rx="20" ry="8" stroke="#7C3AED" strokeOpacity="0.5" strokeWidth="1.2" transform="rotate(85 24 24)" />
                                <ellipse cx="24" cy="24" rx="8" ry="20" stroke="#7C3AED" strokeOpacity="0.5" strokeWidth="1.2" transform="rotate(85 24 24)" />
                                <circle cx="24" cy="16" r="3" fill="#7C3AED" style={{ filter: 'drop-shadow(0 0 6px #7C3AED)' }} />
                                <circle cx="28" cy="26" r="2" fill="#7C3AED" />
                                <circle cx="18" cy="32" r="1.5" fill="#7C3AED" />
                            </svg>
                        </div>
                        <div className="m-name">EMEA</div>
                        <p className="m-desc">Complete worldwide coverage across Europe, Middle East, and Africa. Featuring active hubs with local compliances, RTL language support, and enterprise delivery.</p>
                        <span className="m-tag">Active Hubs: Dubai, London, Berlin</span>
                    </div>
                    <div className="market" style={{ '--orb-color': 'rgba(59,130,246,0.15)' } as React.CSSProperties}>
                        <div className="m-num">03</div>
                        <div className="m-icon">
                            <svg width="56" height="56" viewBox="0 0 48 48" fill="none" xmlns="http://www.w3.org/2000/svg">
                                <circle cx="24" cy="24" r="20" stroke="#3B82F6" strokeOpacity="0.3" strokeWidth="1" strokeDasharray="3 3" />
                                <ellipse cx="24" cy="24" rx="20" ry="8" stroke="#3B82F6" strokeOpacity="0.5" strokeWidth="1.2" transform="rotate(145 24 24)" />
                                <ellipse cx="24" cy="24" rx="8" ry="20" stroke="#3B82F6" strokeOpacity="0.5" strokeWidth="1.2" transform="rotate(145 24 24)" />
                                <circle cx="34" cy="20" r="3" fill="#3B82F6" style={{ filter: 'drop-shadow(0 0 6px #3B82F6)' }} />
                                <circle cx="28" cy="32" r="2" fill="#3B82F6" />
                                <circle cx="16" cy="24" r="1.5" fill="#3B82F6" />
                            </svg>
                        </div>
                        <div className="m-name">APAC</div>
                        <p className="m-desc">Providing premium worldwide execution and elite technical talent from our fast-growing hubs across India, Singapore, and the Asia-Pacific regions.</p>
                        <span className="m-tag">Active Hubs: Mumbai, Singapore, Tokyo</span>
                    </div>
                </div>

            </section>
            <CTASection />
        </main>
    );
}
