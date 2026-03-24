import CTASection from "@/components/CTASection";
import MarketsHUD from "@/components/MarketsHUD";

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
                <MarketsHUD />

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
