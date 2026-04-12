import PageWrapper from "@/components/layout/PageWrapper";
import PageHeader from "@/components/ui/PageHeader";
import type { Metadata } from "next";

export const metadata: Metadata = {
    title: "Privacy Policy | NeoKlyn",
    description: "Learn how NeoKlyn collects, uses, and protects your personal data. Compliant with GDPR, UK GDPR, and India DPDP Act 2023.",
};

export default function PrivacyPolicyPage() {
    return (
        <PageWrapper>
            <section className="section" style={{ position: 'relative', overflow: 'hidden' }}>
                <PageHeader
                    label="Legal"
                    titleOutline="PRIVACY"
                    titleSolid="POLICY"
                    titleColorClass="title-cyan"
                    description="How we collect, use, and protect your information."
                />
            </section>

            <section className="section" style={{ maxWidth: '860px', margin: '0 auto', padding: '2rem 2rem 6rem' }}>
                <div style={{
                    color: 'var(--muted)',
                    fontSize: '1rem',
                    lineHeight: 1.85,
                    display: 'flex',
                    flexDirection: 'column',
                    gap: '2.5rem',
                }}>

                    {/* Last Updated */}
                    <p style={{ fontFamily: "'JetBrains Mono', monospace", fontSize: '0.85rem', color: 'var(--cyan)', textTransform: 'uppercase', letterSpacing: '0.05em' }}>
                        Last Updated: 26 March 2026
                    </p>

                    {/* Introduction */}
                    <div>
                        <h2 style={headingStyle}>1. Introduction</h2>
                        <p>
                            Welcome to <strong style={{ color: 'var(--white)' }}>neoklyn.com</strong> (the &quot;Website&quot;), operated by <strong style={{ color: 'var(--white)' }}>NeoKlyn</strong>, a digital agency registered in Bengaluru, India. We provide web development, mobile app development, AI agent solutions, digital marketing, UI/UX design, and ecommerce services to clients worldwide.
                        </p>
                        <p style={{ marginTop: '0.75rem' }}>
                            This Privacy Policy explains what personal data we collect through this Website, how we use it, and your rights under applicable privacy laws — including the <strong style={{ color: 'var(--white)' }}>EU/UK General Data Protection Regulation (GDPR)</strong> and the <strong style={{ color: 'var(--white)' }}>India Digital Personal Data Protection Act, 2023 (DPDP Act)</strong>.
                        </p>
                        <p style={{ marginTop: '0.75rem' }}>
                            By using this Website, you acknowledge that you have read and understood this Privacy Policy.
                        </p>
                    </div>

                    {/* Data We Collect */}
                    <div>
                        <h2 style={headingStyle}>2. Data We Collect</h2>
                        <p>We collect personal data only when you voluntarily submit it through our contact or inquiry forms. This includes:</p>
                        <ul style={listStyle}>
                            <li>Your <strong style={{ color: 'var(--white)' }}>name</strong></li>
                            <li>Your <strong style={{ color: 'var(--white)' }}>email address</strong></li>
                            <li>Your <strong style={{ color: 'var(--white)' }}>company name</strong> (if provided)</li>
                            <li>Your <strong style={{ color: 'var(--white)' }}>budget range</strong> (if selected)</li>
                            <li>Your <strong style={{ color: 'var(--white)' }}>project details</strong> and any message content you share</li>
                        </ul>
                        <p style={{ marginTop: '0.75rem' }}>
                            We do <strong style={{ color: 'var(--white)' }}>not</strong> require user account creation, nor do we process payments on this Website.
                        </p>
                    </div>

                    {/* Automatically Collected Data */}
                    <div>
                        <h2 style={headingStyle}>3. Automatically Collected Data</h2>
                        <p>When you visit our Website, certain technical data may be collected automatically through cookies and similar technologies:</p>
                        <ul style={listStyle}>
                            <li><strong style={{ color: 'var(--white)' }}>Device and browser information</strong> (type, version, operating system)</li>
                            <li><strong style={{ color: 'var(--white)' }}>IP address</strong> (may be anonymised)</li>
                            <li><strong style={{ color: 'var(--white)' }}>Pages visited</strong>, time spent, referral source</li>
                            <li><strong style={{ color: 'var(--white)' }}>General geographic location</strong> (country/city level)</li>
                        </ul>
                        <p style={{ marginTop: '0.75rem' }}>
                            This data is collected via <strong style={{ color: 'var(--white)' }}>Google Analytics</strong> to help us understand how visitors interact with our Website and improve our content and services.
                        </p>
                    </div>

                    {/* How We Use Your Data */}
                    <div>
                        <h2 style={headingStyle}>4. How We Use Your Data</h2>
                        <p>We use the personal data you provide to:</p>
                        <ul style={listStyle}>
                            <li>Respond to your inquiries and discuss potential projects</li>
                            <li>Send you relevant follow-up communications related to your inquiry</li>
                            <li>Improve our Website, services, and user experience</li>
                            <li>Comply with legal obligations</li>
                        </ul>
                        <p style={{ marginTop: '0.75rem' }}>
                            We will <strong style={{ color: 'var(--white)' }}>never</strong> sell, rent, or trade your personal data to third parties for marketing purposes.
                        </p>
                    </div>

                    {/* Legal Basis for Processing */}
                    <div>
                        <h2 style={headingStyle}>5. Legal Basis for Processing (GDPR)</h2>
                        <p>If you are located in the European Economic Area (EEA) or the United Kingdom, we process your personal data based on:</p>
                        <ul style={listStyle}>
                            <li><strong style={{ color: 'var(--white)' }}>Consent</strong> — When you voluntarily submit your information through our forms</li>
                            <li><strong style={{ color: 'var(--white)' }}>Legitimate interest</strong> — To respond to business inquiries and improve our services</li>
                            <li><strong style={{ color: 'var(--white)' }}>Legal obligation</strong> — Where required to comply with applicable law</li>
                        </ul>
                    </div>

                    {/* Third-Party Services */}
                    <div>
                        <h2 style={headingStyle}>6. Third-Party Services</h2>
                        <p>We use the following third-party services that may process data on our behalf:</p>
                        <div style={{ marginTop: '1rem', display: 'flex', flexDirection: 'column', gap: '1rem' }}>
                            <div style={cardStyle}>
                                <strong style={{ color: 'var(--cyan)' }}>Google Analytics</strong>
                                <p style={{ marginTop: '0.25rem' }}>Used for website traffic analysis and user behaviour insights. Google may collect anonymised IP addresses and usage data. See <a href="https://policies.google.com/privacy" target="_blank" rel="noopener noreferrer" style={linkStyle}>Google&apos;s Privacy Policy</a>.</p>
                            </div>
                            <div style={cardStyle}>
                                <strong style={{ color: 'var(--cyan)' }}>Vercel</strong>
                                <p style={{ marginTop: '0.25rem' }}>Our Website is hosted on Vercel&apos;s infrastructure. Vercel may process server logs containing IP addresses and request metadata. See <a href="https://vercel.com/legal/privacy-policy" target="_blank" rel="noopener noreferrer" style={linkStyle}>Vercel&apos;s Privacy Policy</a>.</p>
                            </div>
                        </div>
                        <p style={{ marginTop: '1rem' }}>
                            These services have their own privacy policies, and we encourage you to review them. We do not share your personal data with any other third parties unless required by law.
                        </p>
                    </div>

                    {/* Data Retention */}
                    <div>
                        <h2 style={headingStyle}>7. Data Retention</h2>
                        <p>
                            We retain the personal data you submit through our contact forms for as long as necessary to fulfil the purpose of your inquiry or as required by law. Typically, inquiry data is retained for up to <strong style={{ color: 'var(--white)' }}>24 months</strong> from your last interaction with us, after which it is securely deleted.
                        </p>
                    </div>

                    {/* Your Rights */}
                    <div>
                        <h2 style={headingStyle}>8. Your Rights</h2>
                        <p>Depending on your location, you may have the following rights regarding your personal data:</p>

                        <h3 style={subHeadingStyle}>Under GDPR (EU/UK residents)</h3>
                        <ul style={listStyle}>
                            <li><strong style={{ color: 'var(--white)' }}>Right of access</strong> — Request a copy of the data we hold about you</li>
                            <li><strong style={{ color: 'var(--white)' }}>Right to rectification</strong> — Request correction of inaccurate data</li>
                            <li><strong style={{ color: 'var(--white)' }}>Right to erasure</strong> — Request deletion of your personal data</li>
                            <li><strong style={{ color: 'var(--white)' }}>Right to restrict processing</strong> — Request that we limit how we use your data</li>
                            <li><strong style={{ color: 'var(--white)' }}>Right to data portability</strong> — Receive your data in a structured, machine-readable format</li>
                            <li><strong style={{ color: 'var(--white)' }}>Right to object</strong> — Object to processing based on legitimate interests</li>
                            <li><strong style={{ color: 'var(--white)' }}>Right to withdraw consent</strong> — Withdraw consent at any time without affecting the lawfulness of prior processing</li>
                        </ul>

                        <h3 style={subHeadingStyle}>Under DPDP Act 2023 (Indian residents)</h3>
                        <ul style={listStyle}>
                            <li><strong style={{ color: 'var(--white)' }}>Right to access</strong> information about the personal data being processed</li>
                            <li><strong style={{ color: 'var(--white)' }}>Right to correction and erasure</strong> of personal data</li>
                            <li><strong style={{ color: 'var(--white)' }}>Right to grievance redressal</strong> regarding the processing of your data</li>
                            <li><strong style={{ color: 'var(--white)' }}>Right to nominate</strong> another person to exercise rights on your behalf</li>
                        </ul>

                        <p style={{ marginTop: '1rem' }}>
                            To exercise any of these rights, please contact us at <a href="mailto:hello.neoklyn@gmail.com" style={linkStyle}>hello.neoklyn@gmail.com</a>. We will respond to your request within 30 days.
                        </p>
                    </div>

                    {/* Cookies */}
                    <div>
                        <h2 style={headingStyle}>9. Cookies</h2>
                        <p>
                            Our Website uses cookies — small text files stored on your device — to enhance your browsing experience and collect analytics data. You can control cookie preferences through your browser settings. Disabling cookies may affect certain features of the Website.
                        </p>
                    </div>

                    {/* International Data Transfers */}
                    <div>
                        <h2 style={headingStyle}>10. International Data Transfers</h2>
                        <p>
                            As we serve clients worldwide and use third-party services hosted outside India, your data may be transferred to and processed in countries outside your country of residence, including the United States. We ensure that such transfers are protected by appropriate safeguards, including standard contractual clauses (SCCs) where applicable under GDPR.
                        </p>
                    </div>

                    {/* Data Security */}
                    <div>
                        <h2 style={headingStyle}>11. Data Security</h2>
                        <p>
                            We implement reasonable technical and organisational measures to protect your personal data against unauthorised access, loss, or misuse. However, no method of transmission over the internet is 100% secure, and we cannot guarantee absolute security.
                        </p>
                    </div>

                    {/* Children's Privacy */}
                    <div>
                        <h2 style={headingStyle}>12. Children&apos;s Privacy</h2>
                        <p>
                            Our Website and services are not directed at individuals under the age of 18. We do not knowingly collect personal data from children. If you believe we have inadvertently collected data from a minor, please contact us immediately and we will delete it.
                        </p>
                    </div>

                    {/* Changes */}
                    <div>
                        <h2 style={headingStyle}>13. Changes to This Policy</h2>
                        <p>
                            We may update this Privacy Policy from time to time to reflect changes in our practices or applicable laws. The updated version will be posted on this page with a revised &quot;Last Updated&quot; date. We encourage you to review this policy periodically.
                        </p>
                    </div>

                    {/* Contact */}
                    <div>
                        <h2 style={headingStyle}>14. Contact Us</h2>
                        <p>If you have any questions about this Privacy Policy or wish to exercise your data rights, please contact us:</p>
                        <div style={{ ...cardStyle, marginTop: '1rem' }}>
                            <p><strong style={{ color: 'var(--white)' }}>NeoKlyn</strong></p>
                            <p>Bengaluru, Karnataka, India</p>
                            <p>Email: <a href="mailto:hello.neoklyn@gmail.com" style={linkStyle}>hello.neoklyn@gmail.com</a></p>
                        </div>
                    </div>

                </div>
            </section>
        </PageWrapper>
    );
}

/* ── Shared Styles ── */
const headingStyle: React.CSSProperties = {
    fontSize: '1.4rem',
    color: 'var(--white)',
    marginBottom: '1rem',
    fontWeight: 600,
    letterSpacing: '-0.01em',
};

const subHeadingStyle: React.CSSProperties = {
    fontSize: '1.1rem',
    color: 'var(--cyan)',
    marginTop: '1.5rem',
    marginBottom: '0.75rem',
    fontWeight: 500,
    fontFamily: "'JetBrains Mono', monospace",
    textTransform: 'uppercase',
    letterSpacing: '0.03em',
};

const listStyle: React.CSSProperties = {
    marginTop: '0.75rem',
    paddingLeft: '1.5rem',
    display: 'flex',
    flexDirection: 'column',
    gap: '0.4rem',
};

const cardStyle: React.CSSProperties = {
    padding: '1.25rem 1.5rem',
    background: 'var(--ink)',
    border: '1px solid var(--border)',
    borderRadius: '12px',
    fontSize: '0.95rem',
};

const linkStyle: React.CSSProperties = {
    color: 'var(--cyan)',
    textDecoration: 'underline',
    textUnderlineOffset: '3px',
};
