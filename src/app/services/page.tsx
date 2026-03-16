import PageWrapper from "@/components/layout/PageWrapper";
import PageHeader from "@/components/ui/PageHeader";
import Link from "next/link";

export default function ServicesPage() {
    return (
        <PageWrapper>
            <section className="section">
                <PageHeader
                    label="Our Expertise"
                    titleOutline="DIGITAL"
                    titleSolid="CAPABILITIES"
                    titleColorClass="title-cyan"
                    description="Full-stack engineering, high-end design, and growth marketing methodologies applied to top-tier enterprise products."
                />

                <div className="services-layout reveal">
                    <div className="service-list">
                        <div className="service-item" id="web">
                            <span className="si-num">01</span>
                            <div>
                                <span className="si-name" style={{ display: 'block', marginBottom: '0.8rem' }}>Web Design &amp; Development</span>
                                <p className="sc-desc" style={{ maxWidth: '400px' }}>Fast, scalable, SEO-optimized web applications built on modern JavaScript stacks.</p>
                                <div className="sc-tags" style={{ marginTop: '1rem', marginBottom: '1.5rem' }}><span className="sc-tag">React</span><span className="sc-tag">Next.js</span><span className="sc-tag">TypeScript</span></div>
                                <Link href="/contact" className="btn-ghost">Start a Web Project ↗</Link>
                            </div>
                        </div>
                        <div className="service-item" id="mobile">
                            <span className="si-num">02</span>
                            <div>
                                <span className="si-name" style={{ display: 'block', marginBottom: '0.8rem' }}>Mobile App Development</span>
                                <p className="sc-desc" style={{ maxWidth: '400px' }}>Native performance with cross-platform efficiency for iOS and Android ecosystems.</p>
                                <div className="sc-tags" style={{ marginTop: '1rem', marginBottom: '1.5rem' }}><span className="sc-tag">Flutter</span><span className="sc-tag">React Native</span><span className="sc-tag">Swift</span></div>
                                <Link href="/contact" className="btn-ghost">Start a Mobile Project ↗</Link>
                            </div>
                        </div>
                        <div className="service-item" id="ecommerce">
                            <span className="si-num">03</span>
                            <div>
                                <span className="si-name" style={{ display: 'block', marginBottom: '0.8rem' }}>Ecommerce Solutions</span>
                                <p className="sc-desc" style={{ maxWidth: '400px' }}>High-converting, scalable storefronts that blend performance with luxury aesthetics.</p>
                                <div className="sc-tags" style={{ marginTop: '1rem', marginBottom: '1.5rem' }}><span className="sc-tag">Shopify</span><span className="sc-tag">WooCommerce</span><span className="sc-tag">Headless</span></div>
                                <Link href="/contact" className="btn-ghost">Start an Ecommerce Project ↗</Link>
                            </div>
                        </div>
                        <div className="service-item" id="3d">
                            <span className="si-num">04</span>
                            <div>
                                <span className="si-name" style={{ display: 'block', marginBottom: '0.8rem' }}>3D &amp; Immersive Web</span>
                                <p className="sc-desc" style={{ maxWidth: '400px' }}>Custom WebGL experiences, 3D product viewers, and interactive storytelling.</p>
                                <div className="sc-tags" style={{ marginTop: '1rem', marginBottom: '1.5rem' }}><span className="sc-tag">Three.js</span><span className="sc-tag">WebGL</span><span className="sc-tag">GSAP</span></div>
                                <Link href="/contact" className="btn-ghost">Start a 3D Project ↗</Link>
                            </div>
                        </div>
                        <div className="service-item" id="marketing">
                            <span className="si-num">05</span>
                            <div>
                                <span className="si-name" style={{ display: 'block', marginBottom: '0.8rem' }}>Digital Marketing</span>
                                <p className="sc-desc" style={{ maxWidth: '400px' }}>Data-driven acquisition, technical SEO, and high-ROI performance campaigns.</p>
                                <div className="sc-tags" style={{ marginTop: '1rem', marginBottom: '1.5rem' }}><span className="sc-tag">Google Ads</span><span className="sc-tag">Meta Ads</span><span className="sc-tag">SEO</span></div>
                                <Link href="/contact" className="btn-ghost">Start a Marketing Campaign ↗</Link>
                            </div>
                        </div>
                        <div className="service-item" id="branding">
                            <span className="si-num">06</span>
                            <div>
                                <span className="si-name" style={{ display: 'block', marginBottom: '0.8rem' }}>UI/UX &amp; Branding</span>
                                <p className="sc-desc" style={{ maxWidth: '400px' }}>Premium brand identity systems, UI kits, and friction-less user experiences.</p>
                                <div className="sc-tags" style={{ marginTop: '1rem', marginBottom: '1.5rem' }}><span className="sc-tag">Figma</span><span className="sc-tag">Design Systems</span><span className="sc-tag">Prototyping</span></div>
                                <Link href="/contact" className="btn-ghost">Start a Branding Project ↗</Link>
                            </div>
                        </div>
                    </div>

                    {/* ═══ PREMIUM TECH PANEL ═══ */}
                    <div className="prem-panel">

                        {/* Aurora shimmer border */}
                        <div className="prem-panel-aurora" />

                        {/* Hex grid background */}
                        <svg className="prem-hexgrid" xmlns="http://www.w3.org/2000/svg" width="100%" height="100%">
                            <defs>
                                <pattern id="hexpat" x="0" y="0" width="56" height="48" patternUnits="userSpaceOnUse">
                                    <polygon points="28,2 52,14 52,34 28,46 4,34 4,14"
                                        fill="none" stroke="rgba(255,255,255,0.03)" strokeWidth="1" />
                                </pattern>
                            </defs>
                            <rect width="100%" height="100%" fill="url(#hexpat)" />
                        </svg>

                        {/* Header */}
                        <div className="prem-header">
                            <div className="prem-label">
                                <span className="prem-label-dot" />
                                Core Tech Stack
                            </div>
                            <div className="prem-badge">6 Technologies Active</div>
                        </div>

                        {/* ── ORBIT SCENE ── */}
                        <div className="orbit-scene">

                            {/* SVG layer — directional gradient lines + travellers */}
                            <svg className="orbit-svg" viewBox="0 0 520 400" xmlns="http://www.w3.org/2000/svg" preserveAspectRatio="xMidYMid meet">
                                <defs>
                                    {/* Per-line directional gradients */}
                                    <linearGradient id="g1" gradientUnits="userSpaceOnUse" x1="260" y1="200" x2="100" y2="60">
                                        <stop offset="0%" stopColor="#06B6D4" stopOpacity="0.9" />
                                        <stop offset="100%" stopColor="#06B6D4" stopOpacity="0.1" />
                                    </linearGradient>
                                    <linearGradient id="g2" gradientUnits="userSpaceOnUse" x1="260" y1="200" x2="420" y2="60">
                                        <stop offset="0%" stopColor="#3B82F6" stopOpacity="0.9" />
                                        <stop offset="100%" stopColor="#3B82F6" stopOpacity="0.1" />
                                    </linearGradient>
                                    <linearGradient id="g3" gradientUnits="userSpaceOnUse" x1="260" y1="200" x2="44" y2="220">
                                        <stop offset="0%" stopColor="#7C3AED" stopOpacity="0.9" />
                                        <stop offset="100%" stopColor="#7C3AED" stopOpacity="0.1" />
                                    </linearGradient>
                                    <linearGradient id="g4" gradientUnits="userSpaceOnUse" x1="260" y1="200" x2="476" y2="220">
                                        <stop offset="0%" stopColor="#06B6D4" stopOpacity="0.9" />
                                        <stop offset="100%" stopColor="#06B6D4" stopOpacity="0.1" />
                                    </linearGradient>
                                    <linearGradient id="g5" gradientUnits="userSpaceOnUse" x1="260" y1="200" x2="100" y2="360">
                                        <stop offset="0%" stopColor="#3B82F6" stopOpacity="0.9" />
                                        <stop offset="100%" stopColor="#3B82F6" stopOpacity="0.1" />
                                    </linearGradient>
                                    <linearGradient id="g6" gradientUnits="userSpaceOnUse" x1="260" y1="200" x2="420" y2="360">
                                        <stop offset="0%" stopColor="#7C3AED" stopOpacity="0.9" />
                                        <stop offset="100%" stopColor="#7C3AED" stopOpacity="0.1" />
                                    </linearGradient>
                                    <filter id="soft-glow" x="-50%" y="-50%" width="200%" height="200%">
                                        <feGaussianBlur stdDeviation="2" result="b" />
                                        <feMerge><feMergeNode in="b" /><feMergeNode in="SourceGraphic" /></feMerge>
                                    </filter>
                                    <filter id="dot-glow" x="-200%" y="-200%" width="500%" height="500%">
                                        <feGaussianBlur stdDeviation="2.5" result="b" />
                                        <feMerge><feMergeNode in="b" /><feMergeNode in="SourceGraphic" /></feMerge>
                                    </filter>
                                </defs>

                                {/* Connection lines */}
                                <line x1="260" y1="200" x2="100" y2="60" stroke="url(#g1)" strokeWidth="1.5" filter="url(#soft-glow)" className="orbit-line" style={{ animationDelay: '0s' }} />
                                <line x1="260" y1="200" x2="420" y2="60" stroke="url(#g2)" strokeWidth="1.5" filter="url(#soft-glow)" className="orbit-line" style={{ animationDelay: '0.4s' }} />
                                <line x1="260" y1="200" x2="44" y2="220" stroke="url(#g3)" strokeWidth="1.5" filter="url(#soft-glow)" className="orbit-line" style={{ animationDelay: '0.8s' }} />
                                <line x1="260" y1="200" x2="476" y2="220" stroke="url(#g4)" strokeWidth="1.5" filter="url(#soft-glow)" className="orbit-line" style={{ animationDelay: '1.2s' }} />
                                <line x1="260" y1="200" x2="100" y2="360" stroke="url(#g5)" strokeWidth="1.5" filter="url(#soft-glow)" className="orbit-line" style={{ animationDelay: '1.6s' }} />
                                <line x1="260" y1="200" x2="420" y2="360" stroke="url(#g6)" strokeWidth="1.5" filter="url(#soft-glow)" className="orbit-line" style={{ animationDelay: '2s' }} />

                                {/* Travelling glowing dots */}
                                <circle r="4" fill="#06B6D4" filter="url(#dot-glow)"><animateMotion dur="2.8s" repeatCount="indefinite"><mpath href="#mp1" /></animateMotion></circle>
                                <path id="mp1" d="M260,200 L100,60" fill="none" />

                                <circle r="4" fill="#3B82F6" filter="url(#dot-glow)"><animateMotion dur="3.2s" repeatCount="indefinite" begin="0.8s"><mpath href="#mp2" /></animateMotion></circle>
                                <path id="mp2" d="M260,200 L420,60" fill="none" />

                                <circle r="4" fill="#7C3AED" filter="url(#dot-glow)"><animateMotion dur="3.6s" repeatCount="indefinite" begin="0.4s"><mpath href="#mp3" /></animateMotion></circle>
                                <path id="mp3" d="M260,200 L44,220" fill="none" />

                                <circle r="4" fill="#06B6D4" filter="url(#dot-glow)"><animateMotion dur="2.6s" repeatCount="indefinite" begin="1.2s"><mpath href="#mp4" /></animateMotion></circle>
                                <path id="mp4" d="M260,200 L476,220" fill="none" />

                                <circle r="4" fill="#3B82F6" filter="url(#dot-glow)"><animateMotion dur="3.0s" repeatCount="indefinite" begin="0.6s"><mpath href="#mp5" /></animateMotion></circle>
                                <path id="mp5" d="M260,200 L100,360" fill="none" />

                                <circle r="4" fill="#7C3AED" filter="url(#dot-glow)"><animateMotion dur="3.4s" repeatCount="indefinite" begin="1.0s"><mpath href="#mp6" /></animateMotion></circle>
                                <path id="mp6" d="M260,200 L420,360" fill="none" />
                            </svg>

                            {/* Orbit rings — 3 layers */}
                            <div className="orbit-ring orbit-ring-1" />
                            <div className="orbit-ring orbit-ring-2" />
                            <div className="orbit-ring orbit-ring-3" />

                            {/* ── PREMIUM CORE ── */}
                            <div className="prem-core">
                                <div className="prem-core-halo prem-core-halo-outer" />
                                <div className="prem-core-halo prem-core-halo-mid" />
                                <div className="prem-core-spin" />
                                <div className="prem-core-body">
                                    <svg width="28" height="28" viewBox="0 0 28 28" fill="none">
                                        <polygon points="14,2 26,8 26,20 14,26 2,20 2,8" fill="none" stroke="#06B6D4" strokeWidth="1.2" opacity="0.6" />
                                        <circle cx="14" cy="14" r="5" fill="#06B6D4" opacity="0.9" />
                                        <circle cx="14" cy="14" r="8" fill="none" stroke="#06B6D4" strokeWidth="0.5" strokeDasharray="2 3" />
                                    </svg>
                                </div>
                            </div>

                            {/* ── TECH NODE CARDS ── */}
                            {/* React */}
                            <div className="prem-node" style={{ '--nc': '#06B6D4', '--nb': 'rgba(6,182,212,0.07)', top: '2%', left: '10%', animationDelay: '0s', animationDuration: '6s' } as React.CSSProperties}>
                                <div className="prem-node-top">
                                    <svg className="prem-node-svg" viewBox="0 0 40 40"><circle cx="20" cy="20" r="4" fill="#06B6D4" /><ellipse cx="20" cy="20" rx="18" ry="7" fill="none" stroke="#06B6D4" strokeWidth="1.5" opacity="0.7" /><ellipse cx="20" cy="20" rx="18" ry="7" fill="none" stroke="#06B6D4" strokeWidth="1.5" opacity="0.7" transform="rotate(60 20 20)" /><ellipse cx="20" cy="20" rx="18" ry="7" fill="none" stroke="#06B6D4" strokeWidth="1.5" opacity="0.7" transform="rotate(120 20 20)" /></svg>
                                    <span className="prem-node-dot" />
                                </div>
                                <span className="prem-node-name">React</span>
                                <span className="prem-node-ver">v18</span>
                            </div>

                            {/* Next.js */}
                            <div className="prem-node" style={{ '--nc': '#ffffff', '--nb': 'rgba(255,255,255,0.05)', top: '2%', right: '8%', animationDelay: '0.5s', animationDuration: '7s' } as React.CSSProperties}>
                                <div className="prem-node-top">
                                    <svg className="prem-node-svg" viewBox="0 0 40 40"><text x="4" y="28" fontFamily="monospace" fontWeight="900" fontSize="22" fill="white">N</text><path d="M28 12 L38 28" stroke="white" strokeWidth="2.5" strokeLinecap="round" /></svg>
                                    <span className="prem-node-dot" style={{ background: '#ffffff' }} />
                                </div>
                                <span className="prem-node-name" style={{ color: 'var(--white)' }}>Next.js</span>
                                <span className="prem-node-ver">v15</span>
                            </div>

                            {/* Three.js */}
                            <div className="prem-node" style={{ '--nc': '#7C3AED', '--nb': 'rgba(124,58,237,0.07)', top: '42%', left: '0%', animationDelay: '1s', animationDuration: '8s' } as React.CSSProperties}>
                                <div className="prem-node-top">
                                    <svg className="prem-node-svg" viewBox="0 0 40 40"><polygon points="20,4 36,32 4,32" fill="none" stroke="#7C3AED" strokeWidth="1.8" /><polygon points="20,13 28,28 12,28" fill="#7C3AED" opacity="0.35" /></svg>
                                    <span className="prem-node-dot" style={{ background: '#7C3AED' }} />
                                </div>
                                <span className="prem-node-name">Three.js</span>
                                <span className="prem-node-ver">WebGL</span>
                            </div>

                            {/* Flutter */}
                            <div className="prem-node" style={{ '--nc': '#06B6D4', '--nb': 'rgba(6,182,212,0.07)', top: '42%', right: '0%', animationDelay: '1.5s', animationDuration: '5.5s' } as React.CSSProperties}>
                                <div className="prem-node-top">
                                    <svg className="prem-node-svg" viewBox="0 0 40 40"><polygon points="20,4 36,20 20,36 4,20" fill="none" stroke="#06B6D4" strokeWidth="1.8" /><polygon points="20,12 28,20 20,28" fill="#06B6D4" opacity="0.5" /></svg>
                                    <span className="prem-node-dot" />
                                </div>
                                <span className="prem-node-name">Flutter</span>
                                <span className="prem-node-ver">iOS/Android</span>
                            </div>

                            {/* Node.js */}
                            <div className="prem-node" style={{ '--nc': '#3B82F6', '--nb': 'rgba(59,130,246,0.07)', bottom: '2%', left: '10%', animationDelay: '2s', animationDuration: '6.5s' } as React.CSSProperties}>
                                <div className="prem-node-top">
                                    <svg className="prem-node-svg" viewBox="0 0 40 40"><path d="M20 4 L34 12 L34 28 L20 36 L6 28 L6 12 Z" fill="none" stroke="#3B82F6" strokeWidth="1.8" /><text x="13" y="25" fontFamily="monospace" fontWeight="700" fontSize="11" fill="#3B82F6">JS</text></svg>
                                    <span className="prem-node-dot" style={{ background: '#3B82F6' }} />
                                </div>
                                <span className="prem-node-name">Node.js</span>
                                <span className="prem-node-ver">v20 LTS</span>
                            </div>

                            {/* Shopify */}
                            <div className="prem-node" style={{ '--nc': '#7C3AED', '--nb': 'rgba(124,58,237,0.07)', bottom: '2%', right: '8%', animationDelay: '2.5s', animationDuration: '7.5s' } as React.CSSProperties}>
                                <div className="prem-node-top">
                                    <svg className="prem-node-svg" viewBox="0 0 40 40"><path d="M30 10 C30 10 28 8 24 9 L23 6 C23 6 17 5 15 14 L10 15 L12 32 L30 35 Z" fill="none" stroke="#7C3AED" strokeWidth="1.6" /><circle cx="20" cy="22" r="4" fill="#7C3AED" opacity="0.6" /></svg>
                                    <span className="prem-node-dot" style={{ background: '#7C3AED' }} />
                                </div>
                                <span className="prem-node-name">Shopify</span>
                                <span className="prem-node-ver">Headless</span>
                            </div>

                            {/* Particle field */}
                            {[...Array(22)].map((_, i) => (
                                <div key={i} className="orbit-particle" style={{
                                    '--px': `${8 + Math.abs(Math.sin(i * 1.37) * 84)}%`,
                                    '--py': `${8 + Math.abs(Math.cos(i * 1.09) * 84)}%`,
                                    '--pc': i % 3 === 0 ? 'rgba(6,182,212,0.5)' : i % 3 === 1 ? 'rgba(124,58,237,0.45)' : 'rgba(59,130,246,0.45)',
                                    animationDelay: `${i * 0.25}s`,
                                    animationDuration: `${2.5 + (i % 5) * 0.6}s`,
                                    width: i % 4 === 0 ? '4px' : '2px',
                                    height: i % 4 === 0 ? '4px' : '2px',
                                } as React.CSSProperties} />
                            ))}
                        </div>

                        {/* Bottom metric strip */}
                        <div className="prem-metrics">
                            <div className="prem-metric">
                                <span className="prem-metric-val">99<span style={{ fontSize: '0.7em', opacity: 0.6 }}>%</span></span>
                                <span className="prem-metric-label">Uptime SLA</span>
                            </div>
                            <div className="prem-metric-div" />
                            <div className="prem-metric">
                                <span className="prem-metric-val">{'<'}50<span style={{ fontSize: '0.7em', opacity: 0.6 }}>ms</span></span>
                                <span className="prem-metric-label">Avg Response</span>
                            </div>
                            <div className="prem-metric-div" />
                            <div className="prem-metric">
                                <span className="prem-metric-val">100<span style={{ fontSize: '0.7em', opacity: 0.6 }}>+</span></span>
                                <span className="prem-metric-label">Projects Shipped</span>
                            </div>
                        </div>

                        <style>{`
                            /* ── PREMIUM PANEL ── */
                            .prem-panel {
                                position: relative;
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
                                top: 6rem;
                                position: sticky;
                            }

                            /* Rotating aurora border */
                            .prem-panel-aurora {
                                position: absolute;
                                inset: -2px;
                                border-radius: 22px;
                                background: conic-gradient(
                                    from var(--aurora-angle, 0deg),
                                    transparent 0deg,
                                    rgba(6,182,212,0.35) 60deg,
                                    transparent 120deg,
                                    rgba(124,58,237,0.3) 200deg,
                                    transparent 260deg,
                                    rgba(59,130,246,0.3) 320deg,
                                    transparent 360deg
                                );
                                animation: aurora-spin 8s linear infinite;
                                z-index: 0;
                                mask: linear-gradient(#fff,#fff) content-box, linear-gradient(#fff,#fff);
                                mask-composite: xor;
                                -webkit-mask: linear-gradient(#fff,#fff) content-box, linear-gradient(#fff,#fff);
                                -webkit-mask-composite: xor;
                                padding: 2px;
                                pointer-events: none;
                            }
                            @property --aurora-angle {
                                syntax: '<angle>';
                                initial-value: 0deg;
                                inherits: false;
                            }
                            @keyframes aurora-spin {
                                to { --aurora-angle: 360deg; }
                            }

                            /* Hex grid bg */
                            .prem-hexgrid {
                                position: absolute;
                                inset: 0;
                                pointer-events: none;
                                z-index: 0;
                                opacity: 0.8;
                            }

                            /* Header area */
                            .prem-header {
                                position: relative;
                                z-index: 2;
                                display: flex;
                                align-items: center;
                                justify-content: space-between;
                                margin-bottom: 0.5rem;
                            }
                            .prem-label {
                                font-family: 'JetBrains Mono', monospace;
                                font-size: 0.62rem;
                                letter-spacing: 0.18em;
                                text-transform: uppercase;
                                color: var(--muted);
                                display: flex;
                                align-items: center;
                                gap: 0.5rem;
                            }
                            .prem-label-dot {
                                width: 6px; height: 6px;
                                border-radius: 50%;
                                background: var(--cyan);
                                box-shadow: 0 0 8px var(--cyan);
                                animation: pulse 1.8s ease-in-out infinite;
                            }
                            .prem-badge {
                                font-family: 'JetBrains Mono', monospace;
                                font-size: 0.58rem;
                                letter-spacing: 0.1em;
                                color: var(--cyan);
                                background: rgba(6,182,212,0.08);
                                border: 1px solid rgba(6,182,212,0.2);
                                padding: 0.25rem 0.7rem;
                                border-radius: 100px;
                            }

                            /* ── ORBIT SCENE ── */
                            .orbit-scene {
                                position: relative;
                                height: 380px;
                                display: flex;
                                align-items: center;
                                justify-content: center;
                                overflow: hidden;
                                z-index: 1;
                            }
                            .orbit-svg {
                                position: absolute;
                                inset: 0;
                                width: 100%;
                                height: 100%;
                                z-index: 1;
                            }
                            .orbit-line {
                                stroke-dasharray: 5 6;
                                animation: dash-flow 1.8s linear infinite;
                            }
                            @keyframes dash-flow { to { stroke-dashoffset: -22; } }

                            /* rings */
                            .orbit-ring {
                                position: absolute;
                                border-radius: 50%;
                                z-index: 0;
                                top: 50%; left: 50%;
                                pointer-events: none;
                            }
                            .orbit-ring-1 {
                                width: 130px; height: 130px;
                                border: 1px solid rgba(6,182,212,0.18);
                                box-shadow: 0 0 20px rgba(6,182,212,0.06) inset;
                                transform: translate(-50%,-50%);
                                animation: spin-cw 16s linear infinite;
                            }
                            .orbit-ring-2 {
                                width: 250px; height: 250px;
                                border: 1px dashed rgba(124,58,237,0.12);
                                transform: translate(-50%,-50%);
                                animation: spin-ccw 26s linear infinite;
                            }
                            .orbit-ring-3 {
                                width: 380px; height: 380px;
                                border: 1px dashed rgba(59,130,246,0.07);
                                transform: translate(-50%,-50%);
                                animation: spin-cw 42s linear infinite;
                            }
                            @keyframes spin-cw  { to { transform: translate(-50%,-50%) rotate(360deg);  } }
                            @keyframes spin-ccw { to { transform: translate(-50%,-50%) rotate(-360deg); } }

                            /* ── PREMIUM CORE ── */
                            .prem-core {
                                position: absolute;
                                top: 50%; left: 50%;
                                transform: translate(-50%, -50%);
                                z-index: 10;
                                display: flex;
                                align-items: center;
                                justify-content: center;
                                width: 80px; height: 80px;
                            }
                            .prem-core-halo {
                                position: absolute;
                                border-radius: 50%;
                                pointer-events: none;
                            }
                            .prem-core-halo-outer {
                                width: 100px; height: 100px;
                                background: radial-gradient(circle, rgba(6,182,212,0.18) 0%, transparent 70%);
                                animation: halo-pulse 3s ease-in-out infinite;
                            }
                            .prem-core-halo-mid {
                                width: 140px; height: 140px;
                                background: radial-gradient(circle, rgba(6,182,212,0.06) 0%, transparent 70%);
                                animation: halo-pulse 3s ease-in-out infinite 0.5s;
                            }
                            @keyframes halo-pulse {
                                0%,100% { transform: scale(1); opacity: 0.6; }
                                50%      { transform: scale(1.3); opacity: 1; }
                            }
                            .prem-core-spin {
                                position: absolute;
                                width: 70px; height: 70px;
                                border-radius: 50%;
                                background: conic-gradient(
                                    rgba(6,182,212,0.6) 0deg,
                                    transparent 90deg,
                                    rgba(124,58,237,0.5) 180deg,
                                    transparent 270deg,
                                    rgba(6,182,212,0.6) 360deg
                                );
                                animation: spin-cw 3s linear infinite;
                                mask: radial-gradient(circle, transparent 28px, black 29px);
                                -webkit-mask: radial-gradient(circle, transparent 28px, black 29px);
                            }
                            .prem-core-body {
                                position: relative;
                                width: 56px; height: 56px;
                                border-radius: 50%;
                                background: rgba(6,182,212,0.10);
                                border: 1px solid rgba(6,182,212,0.4);
                                display: flex; align-items: center; justify-content: center;
                                box-shadow:
                                    0 0 25px rgba(6,182,212,0.5),
                                    0 0 60px rgba(6,182,212,0.12),
                                    inset 0 0 15px rgba(6,182,212,0.1);
                                backdrop-filter: blur(10px);
                            }

                            /* ── PREMIUM NODE CARDS ── */
                            .prem-node {
                                position: absolute;
                                z-index: 5;
                                display: flex;
                                flex-direction: column;
                                align-items: center;
                                gap: 0.3rem;
                                min-width: 84px;
                                padding: 0.8rem 0.9rem 0.65rem;
                                background: linear-gradient(
                                    145deg,
                                    rgba(255,255,255,0.05) 0%,
                                    var(--nb) 100%
                                );
                                border: 1px solid color-mix(in srgb, var(--nc) 25%, rgba(255,255,255,0.06));
                                border-radius: 16px;
                                backdrop-filter: blur(20px);
                                -webkit-backdrop-filter: blur(20px);
                                animation: node-float var(--dur, 6s) ease-in-out infinite alternate;
                                cursor: default;
                                transition: box-shadow 0.35s ease, border-color 0.35s ease;
                                box-shadow:
                                    0 2px 8px rgba(0,0,0,0.5),
                                    inset 0 1px 0 rgba(255,255,255,0.07);
                            }
                            .prem-node::before {
                                content: '';
                                position: absolute;
                                inset: 0;
                                border-radius: 16px;
                                background: repeating-linear-gradient(
                                    0deg,
                                    transparent,
                                    transparent 3px,
                                    rgba(255,255,255,0.012) 3px,
                                    rgba(255,255,255,0.012) 4px
                                );
                                pointer-events: none;
                            }
                            .prem-node:hover {
                                border-color: color-mix(in srgb, var(--nc) 55%, transparent);
                                box-shadow:
                                    0 0 0 1px color-mix(in srgb, var(--nc) 20%, transparent),
                                    0 0 28px color-mix(in srgb, var(--nc) 30%, transparent),
                                    0 12px 40px rgba(0,0,0,0.6),
                                    inset 0 1px 0 rgba(255,255,255,0.12);
                                transform: scale(1.1) translateY(-6px) !important;
                                animation-play-state: paused;
                            }
                            @keyframes node-float {
                                0%   { transform: translateY(0px);   }
                                50%  { transform: translateY(-9px) rotate(0.8deg);  }
                                100% { transform: translateY(-5px) rotate(-0.5deg); }
                            }
                            .prem-node-top {
                                display: flex;
                                align-items: flex-start;
                                justify-content: space-between;
                                width: 100%;
                                gap: 0.3rem;
                            }
                            .prem-node-svg {
                                width: 32px; height: 32px;
                                flex-shrink: 0;
                            }
                            .prem-node-dot {
                                width: 6px; height: 6px;
                                border-radius: 50%;
                                background: var(--nc);
                                box-shadow: 0 0 6px var(--nc);
                                flex-shrink: 0;
                                margin-top: 2px;
                                animation: pulse 2s ease-in-out infinite;
                            }
                            .prem-node-name {
                                font-family: 'JetBrains Mono', monospace;
                                font-size: 0.7rem;
                                font-weight: 600;
                                color: var(--nc);
                                letter-spacing: 0.04em;
                                align-self: flex-start;
                            }
                            .prem-node-ver {
                                font-family: 'JetBrains Mono', monospace;
                                font-size: 0.54rem;
                                color: var(--muted);
                                letter-spacing: 0.06em;
                                align-self: flex-start;
                                opacity: 0.7;
                            }

                            /* particles */
                            .orbit-particle {
                                position: absolute;
                                border-radius: 50%;
                                background: var(--pc, rgba(6,182,212,0.5));
                                left: var(--px);
                                top: var(--py);
                                z-index: 0;
                                animation: twinkle var(--dur, 3s) ease-in-out infinite;
                            }
                            @keyframes twinkle {
                                0%,100% { opacity: 0.08; transform: scale(0.7); }
                                50%     { opacity: 1;    transform: scale(1.6); }
                            }

                            /* ── METRICS STRIP ── */
                            .prem-metrics {
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
                            .prem-metric {
                                display: flex;
                                flex-direction: column;
                                align-items: center;
                                gap: 0.2rem;
                            }
                            .prem-metric-val {
                                font-family: var(--font-space-grotesk), sans-serif;
                                font-size: 1.5rem;
                                font-weight: 700;
                                background: linear-gradient(135deg, var(--white), var(--cyan));
                                -webkit-background-clip: text;
                                -webkit-text-fill-color: transparent;
                                background-clip: text;
                                line-height: 1;
                            }
                            .prem-metric-label {
                                font-family: 'JetBrains Mono', monospace;
                                font-size: 0.56rem;
                                letter-spacing: 0.12em;
                                text-transform: uppercase;
                                color: var(--muted);
                            }
                            .prem-metric-div {
                                width: 1px;
                                height: 36px;
                                background: rgba(255,255,255,0.06);
                            }
                        `}</style>
                    </div>
                </div>
            </section>
        </PageWrapper>
    );
}
