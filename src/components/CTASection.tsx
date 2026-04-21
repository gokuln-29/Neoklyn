'use client';

import { useState } from 'react';
import Link from 'next/link';

export default function CTASection() {
    const [email, setEmail] = useState('');
    const [status, setStatus] = useState<'idle' | 'loading' | 'success' | 'error'>('idle');

    async function handleSubmit(e: React.FormEvent) {
        e.preventDefault();
        if (!email.trim()) return;
        setStatus('loading');
        try {
            const res = await fetch('/api/contact', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({
                    type: 'quote',
                    email: email,
                }),
            });
            if (res.ok) {
                setStatus('success');
            } else {
                setStatus('error');
            }
        } catch {
            setStatus('error');
        }
    }

    return (
        <section className="cta-section" id="contact">
            <div className="cta-bg" />

            {/* decorative corner lines */}
            <span style={{ position: 'absolute', top: '2.5rem', left: '4%', width: 48, height: 48, borderTop: '1px solid rgba(6,182,212,0.2)', borderLeft: '1px solid rgba(6,182,212,0.2)', pointerEvents: 'none' }} />
            <span style={{ position: 'absolute', top: '2.5rem', right: '4%', width: 48, height: 48, borderTop: '1px solid rgba(6,182,212,0.2)', borderRight: '1px solid rgba(6,182,212,0.2)', pointerEvents: 'none' }} />
            <span style={{ position: 'absolute', bottom: '2.5rem', left: '4%', width: 48, height: 48, borderBottom: '1px solid rgba(6,182,212,0.2)', borderLeft: '1px solid rgba(6,182,212,0.2)', pointerEvents: 'none' }} />
            <span style={{ position: 'absolute', bottom: '2.5rem', right: '4%', width: 48, height: 48, borderBottom: '1px solid rgba(6,182,212,0.2)', borderRight: '1px solid rgba(6,182,212,0.2)', pointerEvents: 'none' }} />

            <div className="cta-inner reveal">
                <div className="s-label" style={{ justifyContent: 'center' }}>Let&apos;s Build</div>

                <h2 className="cta-title">
                    READY TO<br />
                    <span className="c-cyan">GO LIVE?</span>
                </h2>

                <p className="cta-sub">
                    Drop your email. We reply within 24 hours with a free project consultation and proposal.
                </p>

                {status === 'success' ? (
                    <div style={{
                        display: 'inline-flex', alignItems: 'center', gap: '0.75rem',
                        padding: '1rem 2rem', borderRadius: '8px',
                        border: '1px solid rgba(6,182,212,0.35)',
                        background: 'rgba(6,182,212,0.07)',
                        color: 'var(--cyan)',
                        fontFamily: 'var(--font-space-grotesk), sans-serif',
                        fontWeight: 600, fontSize: '1rem',
                        marginBottom: '1.5rem',
                    }}>
                        <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                            <polyline points="20 6 9 17 4 12" />
                        </svg>
                        Got it! We&apos;ll be in touch within 24 hours.
                    </div>
                ) : status === 'error' ? (
                    <div style={{
                        display: 'flex', alignItems: 'center', gap: '0.5rem',
                        padding: '1rem 2rem', borderRadius: '8px',
                        border: '1px solid rgba(239,68,68,0.35)',
                        background: 'rgba(239,68,68,0.07)',
                        color: '#ef4444',
                        fontFamily: 'var(--font-space-grotesk), sans-serif',
                        fontWeight: 600, fontSize: '0.9rem',
                        marginBottom: '1.5rem', flexDirection: 'column',
                    }}>
                        <span>Something went wrong. Please email us directly:</span>
                        <a href="mailto:hello@neoklyn.com" style={{ color: 'var(--cyan)', textDecoration: 'underline' }}>hello@neoklyn.com</a>
                    </div>
                ) : (
                    <form className="cta-form" onSubmit={handleSubmit}>
                        <input
                            className="cta-input"
                            type="email"
                            placeholder="your@email.com"
                            value={email}
                            onChange={e => setEmail(e.target.value)}
                            required
                            disabled={status === 'loading'}
                        />
                        <button
                            type="submit"
                            className="btn-main"
                            disabled={status === 'loading'}
                            style={{ cursor: status === 'loading' ? 'wait' : 'pointer', opacity: status === 'loading' ? 0.7 : 1 }}
                        >
                            {status === 'loading' ? (
                                <span style={{ display: 'inline-flex', alignItems: 'center', gap: '0.5rem' }}>
                                    <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" style={{ animation: 'spin 0.8s linear infinite' }}>
                                        <path d="M21 12a9 9 0 1 1-6.219-8.56" strokeLinecap="round" />
                                    </svg>
                                    Sending…
                                </span>
                            ) : 'Get Free Quote ↗'}
                        </button>
                    </form>
                )}

                <p className="cta-note">{`// no spam · no commitment · just a conversation`}</p>

                <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '2rem', marginTop: '2.5rem', flexWrap: 'wrap' }}>
                    <Link href="/contact" style={{ fontFamily: 'JetBrains Mono, monospace', fontSize: '0.7rem', letterSpacing: '0.1em', textTransform: 'uppercase', color: 'var(--muted)', textDecoration: 'none', transition: 'color 0.2s' }}
                        onMouseEnter={e => (e.currentTarget.style.color = 'var(--cyan)')}
                        onMouseLeave={e => (e.currentTarget.style.color = 'var(--muted)')}
                    >
                        Or use the full contact form →
                    </Link>
                    <span style={{ color: 'var(--dim)', fontSize: '0.6rem' }}>|</span>
                    <a href="mailto:hello@neoklyn.com" style={{ fontFamily: 'JetBrains Mono, monospace', fontSize: '0.7rem', letterSpacing: '0.1em', textTransform: 'uppercase', color: 'var(--muted)', textDecoration: 'none', transition: 'color 0.2s' }}
                        onMouseEnter={e => (e.currentTarget.style.color = 'var(--cyan)')}
                        onMouseLeave={e => (e.currentTarget.style.color = 'var(--muted)')}
                    >
                        hello@neoklyn.com
                    </a>
                </div>

                <style>{`@keyframes spin { to { transform: rotate(360deg); } }`}</style>
            </div>
        </section>
    );
}
