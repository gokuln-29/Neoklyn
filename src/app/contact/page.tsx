'use client';

import { useState } from 'react';
import PageWrapper from "@/components/layout/PageWrapper";
import PageHeader from "@/components/ui/PageHeader";

export default function ContactPage() {
    const [status, setStatus] = useState<'idle' | 'loading' | 'success' | 'error'>('idle');
    const [formData, setFormData] = useState({
        name: '', email: '', company: '', budget: '', details: ''
    });

    function handleChange(e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) {
        setFormData(prev => ({ ...prev, [e.target.name]: e.target.value }));
    }

    async function handleSubmit(e: React.FormEvent) {
        e.preventDefault();
        setStatus('loading');
        try {
            const res = await fetch('/api/contact', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({
                    type: 'inquiry',
                    name: formData.name,
                    email: formData.email,
                    company: formData.company || 'Not specified',
                    budget: formData.budget || 'Not specified',
                    details: formData.details,
                }),
            });
            if (res.ok) {
                setStatus('success');
                setFormData({ name: '', email: '', company: '', budget: '', details: '' });
            } else {
                setStatus('error');
            }
        } catch {
            setStatus('error');
        }
    }

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
                        {status === 'success' ? (
                            <div style={{ textAlign: 'center', padding: '3rem 1rem' }}>
                                <svg width="48" height="48" viewBox="0 0 24 24" fill="none" stroke="var(--cyan)" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" style={{ marginBottom: '1.5rem' }}>
                                    <circle cx="12" cy="12" r="10" />
                                    <polyline points="16 8 10 16 7 13" />
                                </svg>
                                <h3 style={{ fontFamily: 'var(--font-space-grotesk), sans-serif', fontSize: '1.8rem', marginBottom: '1rem' }}>
                                    Inquiry <span style={{ color: 'var(--cyan)' }}>Sent!</span>
                                </h3>
                                <p style={{ color: 'var(--muted)', fontSize: '1rem', lineHeight: 1.7, maxWidth: '400px', margin: '0 auto 2rem' }}>
                                    We&apos;ve received your project details. A partner from our team will reach out to <strong style={{ color: 'var(--white)' }}>{formData.email || 'your email'}</strong> within 24 hours.
                                </p>
                                <button
                                    className="btn-main"
                                    style={{ border: 'none', cursor: 'pointer' }}
                                    onClick={() => setStatus('idle')}
                                >
                                    Submit Another Inquiry ↗
                                </button>
                            </div>
                        ) : (
                            <form style={{ display: 'flex', flexDirection: 'column', gap: '2rem' }} onSubmit={handleSubmit}>
                                <div style={{ display: 'flex', gap: '2rem' }}>
                                    <div style={{ flex: 1, display: 'flex', flexDirection: 'column', gap: '0.8rem' }}>
                                        <label style={{ fontFamily: "'JetBrains Mono', monospace", fontSize: '0.75rem', color: 'var(--muted)', textTransform: 'uppercase', letterSpacing: '0.05em' }}>Full Name *</label>
                                        <input type="text" name="name" placeholder="John Doe" value={formData.name} onChange={handleChange} style={{ background: 'rgba(255,255,255,0.03)', border: '1px solid var(--border)', borderRadius: '6px', padding: '1rem 1.2rem', color: 'var(--white)', outline: 'none', fontFamily: "'Cabinet Grotesk', sans-serif", fontSize: '1rem' }} className="c-input" required disabled={status === 'loading'} />
                                    </div>
                                    <div style={{ flex: 1, display: 'flex', flexDirection: 'column', gap: '0.8rem' }}>
                                        <label style={{ fontFamily: "'JetBrains Mono', monospace", fontSize: '0.75rem', color: 'var(--muted)', textTransform: 'uppercase', letterSpacing: '0.05em' }}>Business Email *</label>
                                        <input type="email" name="email" placeholder="john@company.com" value={formData.email} onChange={handleChange} style={{ background: 'rgba(255,255,255,0.03)', border: '1px solid var(--border)', borderRadius: '6px', padding: '1rem 1.2rem', color: 'var(--white)', outline: 'none', fontFamily: "'Cabinet Grotesk', sans-serif", fontSize: '1rem' }} className="c-input" required disabled={status === 'loading'} />
                                    </div>
                                </div>

                                <div style={{ display: 'flex', gap: '2rem' }}>
                                    <div style={{ flex: 1, display: 'flex', flexDirection: 'column', gap: '0.8rem' }}>
                                        <label style={{ fontFamily: "'JetBrains Mono', monospace", fontSize: '0.75rem', color: 'var(--muted)', textTransform: 'uppercase', letterSpacing: '0.05em' }}>Company</label>
                                        <input type="text" name="company" placeholder="Acme Corp" value={formData.company} onChange={handleChange} style={{ background: 'rgba(255,255,255,0.03)', border: '1px solid var(--border)', borderRadius: '6px', padding: '1rem 1.2rem', color: 'var(--white)', outline: 'none', fontFamily: "'Cabinet Grotesk', sans-serif", fontSize: '1rem' }} className="c-input" disabled={status === 'loading'} />
                                    </div>
                                    <div style={{ flex: 1, display: 'flex', flexDirection: 'column', gap: '0.8rem' }}>
                                        <label style={{ fontFamily: "'JetBrains Mono', monospace", fontSize: '0.75rem', color: 'var(--muted)', textTransform: 'uppercase', letterSpacing: '0.05em' }}>Budget Range</label>
                                        <select name="budget" value={formData.budget} onChange={handleChange} style={{ background: 'rgba(255,255,255,0.03)', border: '1px solid var(--border)', borderRadius: '6px', padding: '1rem 1.2rem', color: 'var(--dim)', outline: 'none', fontFamily: "'Cabinet Grotesk', sans-serif", fontSize: '1rem', appearance: 'none' }} className="c-input c-select" disabled={status === 'loading'}>
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
                                    <textarea name="details" placeholder="Tell us about the scope, timeline, and core objectives..." value={formData.details} onChange={handleChange} style={{ background: 'rgba(255,255,255,0.03)', border: '1px solid var(--border)', borderRadius: '6px', padding: '1rem 1.2rem', color: 'var(--white)', outline: 'none', fontFamily: "'Cabinet Grotesk', sans-serif", fontSize: '1rem', minHeight: '150px', resize: 'vertical' }} className="c-input" required disabled={status === 'loading'}></textarea>
                                </div>

                                {status === 'error' && (
                                    <div style={{ padding: '1rem', borderRadius: '8px', border: '1px solid rgba(239,68,68,0.3)', background: 'rgba(239,68,68,0.06)', color: '#ef4444', fontSize: '0.85rem' }}>
                                        Something went wrong. Please try again or email us at <a href="mailto:hello.neoklyn@gmail.com" style={{ color: 'var(--cyan)', textDecoration: 'underline' }}>hello.neoklyn@gmail.com</a>
                                    </div>
                                )}

                                <button type="submit" className="btn-main" disabled={status === 'loading'} style={{ border: 'none', cursor: status === 'loading' ? 'wait' : 'pointer', justifySelf: 'start', padding: '1.2rem', width: '100%', justifyContent: 'center', marginTop: '1rem', opacity: status === 'loading' ? 0.7 : 1 }}>
                                    {status === 'loading' ? (
                                        <span style={{ display: 'inline-flex', alignItems: 'center', gap: '0.5rem' }}>
                                            <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" style={{ animation: 'spin 0.8s linear infinite' }}>
                                                <path d="M21 12a9 9 0 1 1-6.219-8.56" strokeLinecap="round" />
                                            </svg>
                                            Submitting…
                                        </span>
                                    ) : 'Submit Inquiry ↗'}
                                </button>
                            </form>
                        )}
                    </div>

                    {/* Locations Side */}
                    <div style={{ display: 'flex', flexDirection: 'column', gap: '3rem' }}>
                        <div style={{ position: 'relative', height: '250px', background: 'var(--ink)', borderRadius: '16px', border: '1px solid var(--border)', overflow: 'hidden', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                            <div style={{ position: 'absolute', inset: 0, opacity: 0.1, backgroundImage: 'url("data:image/svg+xml,%3Csvg width=\'20\' height=\'20\' xmlns=\'http://www.w3.org/2000/svg\'%3E%3Ccircle cx=\'2\' cy=\'2\' r=\'1\' fill=\'%2300ffe0\'/%3E%3C/svg%3E")', backgroundSize: '20px 20px', animation: 'pan 30s linear infinite' }}></div>
                            <div className="orb orb-2" style={{ width: '300px', height: '300px', background: 'rgba(6, 182, 212,0.1)', top: '50%', left: '50%', transform: 'translate(-50%, -50%)', filter: 'blur(50px)' }}></div>
                            <h3 className="hero-title" style={{ fontSize: '3rem', margin: 0, zIndex: 1, letterSpacing: '0.1em' }}><span className="title-cyan">GLOBAL</span></h3>
                        </div>

                        <div style={{ display: 'flex', gap: '1rem', flexDirection: 'column' }}>
                            <div style={{ padding: '1.5rem', borderLeft: '2px solid var(--cyan)', background: 'rgba(255,255,255,0.02)' }}>
                                <div style={{ fontFamily: "'JetBrains Mono', monospace", fontSize: '0.7rem', color: 'var(--cyan)', marginBottom: '0.5rem', textTransform: 'uppercase', letterSpacing: '0.1em' }}>United States</div>
                                <h4 style={{ fontFamily: "'Bebas Neue', sans-serif", fontSize: '1.5rem', marginBottom: '0.2rem' }}>New York · Remote</h4>
                                <p className="sc-desc">EST / PST Timezones</p>
                            </div>
                            <div style={{ padding: '1.5rem', borderLeft: '2px solid var(--violet)', background: 'rgba(255,255,255,0.02)' }}>
                                <div style={{ fontFamily: "'JetBrains Mono', monospace", fontSize: '0.7rem', color: 'var(--violet)', marginBottom: '0.5rem', textTransform: 'uppercase', letterSpacing: '0.1em' }}>UAE</div>
                                <h4 style={{ fontFamily: "'Bebas Neue', sans-serif", fontSize: '1.5rem', marginBottom: '0.2rem' }}>Dubai · DT</h4>
                                <p className="sc-desc">GST Timezone</p>
                            </div>
                            <div style={{ padding: '1.5rem', borderLeft: '2px solid var(--blue)', background: 'rgba(255,255,255,0.02)' }}>
                                <div style={{ fontFamily: "'JetBrains Mono', monospace", fontSize: '0.7rem', color: 'var(--blue)', marginBottom: '0.5rem', textTransform: 'uppercase', letterSpacing: '0.1em' }}>India</div>
                                <h4 style={{ fontFamily: "'Bebas Neue', sans-serif", fontSize: '1.5rem', marginBottom: '0.2rem' }}>Bangalore · HQ</h4>
                                <p className="sc-desc">IST Timezone</p>
                            </div>
                        </div>

                        <div style={{ padding: '1.5rem', background: 'rgba(6,182,212,0.04)', border: '1px solid rgba(6,182,212,0.15)', borderRadius: '12px' }}>
                            <div style={{ fontFamily: "'JetBrains Mono', monospace", fontSize: '0.7rem', color: 'var(--cyan)', marginBottom: '0.6rem', textTransform: 'uppercase', letterSpacing: '0.1em' }}>Email Us Directly</div>
                            <a href="mailto:hello.neoklyn@gmail.com" style={{ fontFamily: "var(--font-space-grotesk), sans-serif", fontSize: '1.1rem', color: 'var(--white)', textDecoration: 'none', fontWeight: 600 }}>
                                hello.neoklyn@gmail.com
                            </a>
                            <p className="sc-desc" style={{ marginTop: '0.5rem' }}>We respond within 24 hours</p>
                        </div>
                    </div>
                </div>
            </section>

            <style>{`
         .c-input:focus { border-color: var(--cyan) !important; box-shadow: 0 0 15px rgba(6, 182, 212,0.1); }
         .c-select option { background: var(--bg); color: var(--white); }
         @keyframes pan { 0% { background-position: 0 0; } 100% { background-position: 100% 100%; } }
         @keyframes spin { to { transform: rotate(360deg); } }
         @media(max-width: 900px) {
           .reveal { grid-template-columns: 1fr !important; }
           .c-input { flex-direction: column; }
         }
      `}</style>
        </PageWrapper>
    );
}
