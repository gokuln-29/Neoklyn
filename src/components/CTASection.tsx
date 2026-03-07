import Link from 'next/link';

export default function CTASection() {
    return (
        <section className="cta-section" id="contact">
            <div className="cta-bg"></div>
            <div className="cta-inner reveal">
                <div className="s-label" style={{ justifyContent: 'center' }}>Let&apos;s Build</div>
                <h2 className="cta-title">READY TO<br /><span className="c-cyan">GO LIVE?</span></h2>
                <p className="cta-sub">Drop your email. We reply within 24 hours with a free project consultation and proposal.</p>
                <div className="cta-form">
                    <input className="cta-input" type="email" placeholder="your@email.com" />
                    <Link href="/contact" className="btn-main">Get Free Quote ↗</Link>
                </div>
                <p className="cta-note">{`// no spam · no commitment · just a conversation`}</p>
            </div>
        </section>
    );
}
