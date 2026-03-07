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

                {/* Animated Map Representation */}
                <div className="reveal" style={{ position: 'relative', height: '400px', border: '1px solid var(--border)', borderRadius: '16px', background: 'var(--ink)', overflow: 'hidden', margin: '4rem 0', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                    <div className="orb orb-1" style={{ width: '600px', height: '600px', background: 'rgba(0,255,224,0.05)', filter: 'blur(100px)' }}></div>

                    <svg width="100%" height="100%" viewBox="0 0 1000 400" preserveAspectRatio="xMidYMid slice" style={{ position: 'absolute', inset: 0, opacity: 0.4 }}>
                        <path d="M 200 200 Q 400 50 600 250 T 800 200" fill="none" stroke="rgba(0,255,224,0.3)" strokeWidth="2" strokeDasharray="5,5" className="path-anim" />
                        <path d="M 600 250 Q 700 300 800 200" fill="none" stroke="rgba(255,45,107,0.3)" strokeWidth="2" strokeDasharray="5,5" className="path-anim" />
                    </svg>

                    {/* Location Dots */}
                    <div className="pulse-dot" style={{ position: 'absolute', left: '20%', top: '50%' }}>
                        <div className="dot" style={{ background: 'var(--cyan)' }}></div>
                        <div className="l-label">US</div>
                    </div>

                    <div className="pulse-dot" style={{ position: 'absolute', left: '60%', top: '65%' }}>
                        <div className="dot" style={{ background: 'var(--pink)' }}></div>
                        <div className="l-label">UAE</div>
                    </div>

                    <div className="pulse-dot" style={{ position: 'absolute', left: '80%', top: '50%' }}>
                        <div className="dot" style={{ background: 'var(--amber)' }}></div>
                        <div className="l-label">IN</div>
                    </div>

                    <style>{`
             .path-anim { stroke-dashoffset: 1000; animation: dash 20s linear infinite; }
             @keyframes dash { to { stroke-dashoffset: 0; } }
             .pulse-dot { position: relative; display: flex; flex-direction: column; alignItems: center; gap: 0.5rem; }
             .dot { width: 12px; height: 12px; border-radius: 50%; box-shadow: 0 0 20px currentColor, 0 0 40px currentColor; position: relative; z-index: 2; }
             .dot::after { content: ''; position: absolute; inset: -10px; border: 1px solid currentColor; border-radius: 50%; animation: pulse-ring 2s infinite; }
             @keyframes pulse-ring { 0% { transform: scale(0.5); opacity: 1; } 100% { transform: scale(2); opacity: 0; } }
             .l-label { font-family: 'JetBrains Mono', monospace; font-size: 0.7rem; color: var(--white); background: rgba(0,0,0,0.5); padding: 0.2rem 0.5rem; border-radius: 4px; border: 1px solid var(--border); }
           `}</style>
                </div>

                <div className="markets-layout reveal">
                    <div className="market">
                        <div className="m-num">01</div>
                        <div className="m-flag">🇺🇸</div>
                        <div className="m-name">United States</div>
                        <p className="m-desc">Serving US startups and enterprises — we align with American timelines, standards, and expectations for world-class digital products.</p>
                        <span className="m-tag">EST · PST Timezones</span>
                    </div>
                    <div className="market">
                        <div className="m-num">02</div>
                        <div className="m-flag">🇦🇪</div>
                        <div className="m-name">UAE &amp; Middle East</div>
                        <p className="m-desc">Deep expertise in Dubai &amp; Abu Dhabi market — Arabic RTL support, regional compliance, and luxury brand sensibility built in.</p>
                        <span className="m-tag">GST Timezone</span>
                    </div>
                    <div className="market">
                        <div className="m-num">03</div>
                        <div className="m-flag">🇮🇳</div>
                        <div className="m-name">India</div>
                        <p className="m-desc">Home base — premium execution at competitive rates for India&apos;s fast-growing startups, SMEs, and enterprises.</p>
                        <span className="m-tag">IST Timezone</span>
                    </div>
                </div>

            </section>
            <CTASection />
        </main>
    );
}
