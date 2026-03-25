import CTASection from "@/components/CTASection";
import MarketsHUD from "@/components/MarketsHUD";

export default function MarketsPage() {
    return (
        <main style={{ paddingTop: '8rem' }}>
            <section className="section">
                <div className="reveal" style={{ textAlign: 'center', maxWidth: '800px', margin: '0 auto 4rem' }}>
                    <div className="s-label" style={{ justifyContent: 'center' }}>Global Presence</div>
                    <h1 className="hero-title" style={{ fontSize: 'clamp(3rem,8vw,6rem)', marginBottom: '1rem' }}>
                        <span className="title-outline">GLOBAL</span>{' '}
                        <span className="title-cyan">SERVICE</span>
                    </h1>
                    <p className="hero-desc" style={{ margin: '0 auto' }}>
                        We provide global digital services from our head office in Bengaluru, India.
                    </p>
                </div>

                {/* ═══ PREMIUM WORLD MAP — IMAGE + GLOBAL CITY NETWORK ═══ */}
                <MarketsHUD />

                <div className="markets-layout reveal">
                    <div className="market" style={{ '--orb-color': 'rgba(6,182,212,0.15)' } as React.CSSProperties}>
                        {/* <div className="m-num">01</div> */}
                        <div className="m-icon">
                            <svg width="56" height="56" viewBox="0 0 48 48" fill="none" xmlns="http://www.w3.org/2000/svg">
                                <circle cx="24" cy="24" r="20" stroke="#06B6D4" strokeOpacity="0.3" strokeWidth="1" strokeDasharray="3 3" />
                                <path d="M8 24H40M24 8V40" stroke="#06B6D4" strokeOpacity="0.55" strokeWidth="1.2" />
                                <path d="M12 16C16 20 16 28 12 32M36 16C32 20 32 28 36 32" stroke="#06B6D4" strokeOpacity="0.55" strokeWidth="1.2" />
                                <path d="M16 12C20 16 28 16 32 12M16 36C20 32 28 32 32 36" stroke="#06B6D4" strokeOpacity="0.55" strokeWidth="1.2" />
                                <circle cx="31" cy="18" r="2" fill="#06B6D4" style={{ filter: 'drop-shadow(0 0 6px #06B6D4)' }} />
                            </svg>
                        </div>
                        <div className="m-name">Global Coverage</div>
                        <p className="m-desc">We support businesses worldwide with consistent engineering quality, clear communication, and reliable execution.</p>
                        <span className="m-tag">Global Service Across Time Zones</span>
                    </div>
                    <div className="market" style={{ '--orb-color': 'rgba(124,58,237,0.15)' } as React.CSSProperties}>
                        {/* <div className="m-num">02</div> */}
                        <div className="m-icon">
                            <svg width="56" height="56" viewBox="0 0 48 48" fill="none" xmlns="http://www.w3.org/2000/svg">
                                <circle cx="24" cy="24" r="20" stroke="#7C3AED" strokeOpacity="0.3" strokeWidth="1" strokeDasharray="3 3" />
                                <rect x="10" y="14" width="28" height="20" rx="4" stroke="#7C3AED" strokeOpacity="0.55" strokeWidth="1.2" />
                                <path d="M16 24H32" stroke="#7C3AED" strokeOpacity="0.75" strokeWidth="1.6" strokeLinecap="round" />
                                <path d="M20 19H28M20 29H28" stroke="#7C3AED" strokeOpacity="0.55" strokeWidth="1.2" strokeLinecap="round" />
                                <circle cx="34" cy="17" r="2" fill="#7C3AED" style={{ filter: 'drop-shadow(0 0 6px #7C3AED)' }} />
                            </svg>
                        </div>
                        <div className="m-name">Seamless Collaboration</div>
                        <p className="m-desc">From discovery to deployment, we collaborate remotely with international teams and adapt to your preferred working hours.</p>
                        <span className="m-tag">Flexible Delivery for Global Teams</span>
                    </div>
                    <div className="market" style={{ '--orb-color': 'rgba(59,130,246,0.15)' } as React.CSSProperties}>
                        {/* <div className="m-num">03</div> */}
                        <div className="m-icon">
                            <svg width="56" height="56" viewBox="0 0 48 48" fill="none" xmlns="http://www.w3.org/2000/svg">
                                <circle cx="24" cy="24" r="20" stroke="#3B82F6" strokeOpacity="0.3" strokeWidth="1" strokeDasharray="3 3" />
                                <path d="M24 10L28.5 19H39L30.5 25.5L34 36L24 30L14 36L17.5 25.5L9 19H19.5L24 10Z" stroke="#3B82F6" strokeOpacity="0.6" strokeWidth="1.2" fill="none" />
                                <circle cx="24" cy="24" r="3" fill="#3B82F6" style={{ filter: 'drop-shadow(0 0 6px #3B82F6)' }} />
                            </svg>
                        </div>
                        <div className="m-name">Trusted Execution</div>
                        <p className="m-desc">Our team delivers secure, scalable products for clients worldwide with a strong process and long-term support.</p>
                        <span className="m-tag">Head Office: Bengaluru, India</span>
                    </div>
                </div>

            </section>
            <CTASection />
        </main>
    );
}
