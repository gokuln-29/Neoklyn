import PageWrapper from "@/components/layout/PageWrapper";
import PageHeader from "@/components/ui/PageHeader";

export default function ContactPage() {
    return (
        <PageWrapper includeCTA={false}>
            <section className="section" style={{ flex: 1 }}>
                <PageHeader
                    label="Enterprise Intake"
                    titleOutline="LET'S"
                    titleSolid="BUILD"
                    titleColorClass="title-cyan"
                    description="We partner with ambitious companies to solve complex engineering and design problems. Fill out the intake form and a partner will reach out within 24 hours."
                />

                <div className="reveal" style={{ display: 'grid', gridTemplateColumns: 'minmax(0, 1.2fr) minmax(0, 0.8fr)', gap: '4rem', marginTop: '5rem' }}>

                    {/* Form Side */}
                    <div style={{ background: 'var(--ink)', padding: '3.5rem', borderRadius: '16px', border: '1px solid var(--border)' }}>
                        <form style={{ display: 'flex', flexDirection: 'column', gap: '2rem' }}>
                            <div style={{ display: 'flex', gap: '2rem' }}>
                                <div style={{ flex: 1, display: 'flex', flexDirection: 'column', gap: '0.8rem' }}>
                                    <label style={{ fontFamily: "'JetBrains Mono', monospace", fontSize: '0.75rem', color: 'var(--muted)', textTransform: 'uppercase', letterSpacing: '0.05em' }}>Full Name *</label>
                                    <input type="text" placeholder="John Doe" style={{ background: 'rgba(255,255,255,0.03)', border: '1px solid var(--border)', borderRadius: '6px', padding: '1rem 1.2rem', color: 'var(--white)', outline: 'none', fontFamily: "'Cabinet Grotesk', sans-serif", fontSize: '1rem' }} className="c-input" required />
                                </div>
                                <div style={{ flex: 1, display: 'flex', flexDirection: 'column', gap: '0.8rem' }}>
                                    <label style={{ fontFamily: "'JetBrains Mono', monospace", fontSize: '0.75rem', color: 'var(--muted)', textTransform: 'uppercase', letterSpacing: '0.05em' }}>Business Email *</label>
                                    <input type="email" placeholder="john@company.com" style={{ background: 'rgba(255,255,255,0.03)', border: '1px solid var(--border)', borderRadius: '6px', padding: '1rem 1.2rem', color: 'var(--white)', outline: 'none', fontFamily: "'Cabinet Grotesk', sans-serif", fontSize: '1rem' }} className="c-input" required />
                                </div>
                            </div>

                            <div style={{ display: 'flex', gap: '2rem' }}>
                                <div style={{ flex: 1, display: 'flex', flexDirection: 'column', gap: '0.8rem' }}>
                                    <label style={{ fontFamily: "'JetBrains Mono', monospace", fontSize: '0.75rem', color: 'var(--muted)', textTransform: 'uppercase', letterSpacing: '0.05em' }}>Company</label>
                                    <input type="text" placeholder="Acme Corp" style={{ background: 'rgba(255,255,255,0.03)', border: '1px solid var(--border)', borderRadius: '6px', padding: '1rem 1.2rem', color: 'var(--white)', outline: 'none', fontFamily: "'Cabinet Grotesk', sans-serif", fontSize: '1rem' }} className="c-input" />
                                </div>
                                <div style={{ flex: 1, display: 'flex', flexDirection: 'column', gap: '0.8rem' }}>
                                    <label style={{ fontFamily: "'JetBrains Mono', monospace", fontSize: '0.75rem', color: 'var(--muted)', textTransform: 'uppercase', letterSpacing: '0.05em' }}>Budget Range</label>
                                    <select style={{ background: 'rgba(255,255,255,0.03)', border: '1px solid var(--border)', borderRadius: '6px', padding: '1rem 1.2rem', color: 'var(--dim)', outline: 'none', fontFamily: "'Cabinet Grotesk', sans-serif", fontSize: '1rem', appearance: 'none' }} className="c-input c-select">
                                        <option value="">Select Range</option>
                                        <option value="10k-25k">$10k - $25k</option>
                                        <option value="25k-50k">$25k - $50k</option>
                                        <option value="50k-100k">$50k - $100k</option>
                                        <option value="100k+">$100k+</option>
                                    </select>
                                </div>
                            </div>

                            <div style={{ display: 'flex', flexDirection: 'column', gap: '0.8rem' }}>
                                <label style={{ fontFamily: "'JetBrains Mono', monospace", fontSize: '0.75rem', color: 'var(--muted)', textTransform: 'uppercase', letterSpacing: '0.05em' }}>Project Details *</label>
                                <textarea placeholder="Tell us about the scope, timeline, and core objectives..." style={{ background: 'rgba(255,255,255,0.03)', border: '1px solid var(--border)', borderRadius: '6px', padding: '1rem 1.2rem', color: 'var(--white)', outline: 'none', fontFamily: "'Cabinet Grotesk', sans-serif", fontSize: '1rem', minHeight: '150px', resize: 'vertical' }} className="c-input" required></textarea>
                            </div>

                            <button type="submit" className="btn-main" style={{ border: 'none', cursor: 'pointer', justifySelf: 'start', padding: '1.2rem', width: '100%', justifyContent: 'center', marginTop: '1rem' }}>Submit Inquiry ↗</button>
                        </form>
                    </div>

                    {/* Locations Side */}
                    <div style={{ display: 'flex', flexDirection: 'column', gap: '3rem' }}>
                        <div style={{ position: 'relative', height: '250px', background: 'var(--ink)', borderRadius: '16px', border: '1px solid var(--border)', overflow: 'hidden', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                            <div style={{ position: 'absolute', inset: 0, opacity: 0.1, backgroundImage: 'url("data:image/svg+xml,%3Csvg width=\'20\' height=\'20\' xmlns=\'http://www.w3.org/2000/svg\'%3E%3Ccircle cx=\'2\' cy=\'2\' r=\'1\' fill=\'%2300ffe0\'/%3E%3C/svg%3E")', backgroundSize: '20px 20px', animation: 'pan 30s linear infinite' }}></div>
                            <div className="orb orb-2" style={{ width: '300px', height: '300px', background: 'rgba(0,255,224,0.1)', top: '50%', left: '50%', transform: 'translate(-50%, -50%)', filter: 'blur(50px)' }}></div>
                            <h3 className="hero-title" style={{ fontSize: '3rem', margin: 0, zIndex: 1, letterSpacing: '0.1em' }}><span className="title-cyan">GLOBAL</span></h3>
                        </div>

                        <div style={{ display: 'flex', gap: '1rem', flexDirection: 'column' }}>
                            <div style={{ padding: '1.5rem', borderLeft: '2px solid var(--cyan)', background: 'rgba(255,255,255,0.02)' }}>
                                <div style={{ fontFamily: "'JetBrains Mono', monospace", fontSize: '0.7rem', color: 'var(--cyan)', marginBottom: '0.5rem', textTransform: 'uppercase', letterSpacing: '0.1em' }}>United States</div>
                                <h4 style={{ fontFamily: "'Bebas Neue', sans-serif", fontSize: '1.5rem', marginBottom: '0.2rem' }}>New York · Remote</h4>
                                <p className="sc-desc">EST / PST Timezones</p>
                            </div>
                            <div style={{ padding: '1.5rem', borderLeft: '2px solid var(--pink)', background: 'rgba(255,255,255,0.02)' }}>
                                <div style={{ fontFamily: "'JetBrains Mono', monospace", fontSize: '0.7rem', color: 'var(--pink)', marginBottom: '0.5rem', textTransform: 'uppercase', letterSpacing: '0.1em' }}>UAE</div>
                                <h4 style={{ fontFamily: "'Bebas Neue', sans-serif", fontSize: '1.5rem', marginBottom: '0.2rem' }}>Dubai · DT</h4>
                                <p className="sc-desc">GST Timezone</p>
                            </div>
                            <div style={{ padding: '1.5rem', borderLeft: '2px solid var(--amber)', background: 'rgba(255,255,255,0.02)' }}>
                                <div style={{ fontFamily: "'JetBrains Mono', monospace", fontSize: '0.7rem', color: 'var(--amber)', marginBottom: '0.5rem', textTransform: 'uppercase', letterSpacing: '0.1em' }}>India</div>
                                <h4 style={{ fontFamily: "'Bebas Neue', sans-serif", fontSize: '1.5rem', marginBottom: '0.2rem' }}>Bangalore · HQ</h4>
                                <p className="sc-desc">IST Timezone</p>
                            </div>
                        </div>
                    </div>
                </div>
            </section>

            <style>{`
         .c-input:focus { border-color: var(--cyan) !important; box-shadow: 0 0 15px rgba(0,255,224,0.1); }
         .c-select option { background: var(--bg); color: var(--white); }
         @keyframes pan { 0% { background-position: 0 0; } 100% { background-position: 100% 100%; } }
         @media(max-width: 900px) {
           .reveal { grid-template-columns: 1fr !important; }
           .c-input { flex-direction: column; }
         }
      `}</style>
        </PageWrapper>
    );
}
