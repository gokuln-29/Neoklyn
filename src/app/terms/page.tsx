import PageWrapper from "@/components/layout/PageWrapper";
import PageHeader from "@/components/ui/PageHeader";
import type { Metadata } from "next";

export const metadata: Metadata = {
    title: "Terms of Service | NeoKlyn",
    description: "Read the Terms of Service governing your use of the NeoKlyn website. Includes intellectual property rights, limitation of liability, and governing law.",
};

export default function TermsOfServicePage() {
    return (
        <PageWrapper>
            <section className="section" style={{ position: 'relative', overflow: 'hidden' }}>
                <PageHeader
                    label="Legal"
                    titleOutline="TERMS OF"
                    titleSolid="SERVICE"
                    titleColorClass="title-violet"
                    description="The terms governing your use of this website."
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
                    <p style={{ fontFamily: "'JetBrains Mono', monospace", fontSize: '0.85rem', color: 'var(--violet)', textTransform: 'uppercase', letterSpacing: '0.05em' }}>
                        Last Updated: 26 March 2026
                    </p>

                    {/* Introduction */}
                    <div>
                        <h2 style={headingStyle}>1. Introduction</h2>
                        <p>
                            These Terms of Service (&quot;Terms&quot;) govern your access to and use of <strong style={{ color: 'var(--white)' }}>neoklyn.com</strong> (the &quot;Website&quot;), operated by <strong style={{ color: 'var(--white)' }}>NeoKlyn</strong>, a digital agency registered in Bengaluru, India.
                        </p>
                        <p style={{ marginTop: '0.75rem' }}>
                            By accessing or using this Website, you agree to be bound by these Terms. If you do not agree, please do not use the Website.
                        </p>
                    </div>

                    {/* Use of Website */}
                    <div>
                        <h2 style={headingStyle}>2. Use of the Website</h2>
                        <p>You agree to use this Website only for lawful purposes and in accordance with these Terms. You must not:</p>
                        <ul style={listStyle}>
                            <li>Use the Website in any way that violates applicable local, national, or international laws or regulations</li>
                            <li>Attempt to gain unauthorised access to any part of the Website, its servers, or any connected systems</li>
                            <li>Use automated tools (bots, scrapers, crawlers) to extract data from the Website without our prior written consent</li>
                            <li>Transmit any material that is defamatory, offensive, or otherwise objectionable</li>
                            <li>Interfere with or disrupt the integrity or performance of the Website</li>
                        </ul>
                        <p style={{ marginTop: '0.75rem' }}>
                            We reserve the right to restrict or terminate access to the Website for any user who violates these Terms.
                        </p>
                    </div>

                    {/* Services Overview */}
                    <div>
                        <h2 style={headingStyle}>3. Services</h2>
                        <p>
                            NeoKlyn offers web development, mobile application development, AI agent solutions, digital marketing, UI/UX design, and ecommerce services. The Website serves as an informational and inquiry platform for these services.
                        </p>
                        <p style={{ marginTop: '0.75rem' }}>
                            Project engagement, deliverables, timelines, pricing, and payment terms are governed by separate service agreements executed between NeoKlyn and the client. Nothing on this Website constitutes a binding offer or contract for services.
                        </p>
                    </div>

                    {/* Intellectual Property */}
                    <div>
                        <h2 style={headingStyle}>4. Intellectual Property</h2>
                        <p>
                            All content on this Website — including but not limited to text, graphics, logos, icons, images, animations, code, UI designs, and the overall look and feel — is the exclusive property of <strong style={{ color: 'var(--white)' }}>NeoKlyn</strong> or its licensors and is protected by applicable intellectual property laws.
                        </p>
                        <ul style={listStyle}>
                            <li>You may not reproduce, distribute, modify, create derivative works of, or publicly display any content from this Website without our prior written permission</li>
                            <li>The NeoKlyn name, logo, and all related marks are trademarks of NeoKlyn. Unauthorised use is strictly prohibited</li>
                            <li>Case studies and portfolio items displayed on this Website may include intellectual property belonging to our clients, used with permission for showcase purposes only</li>
                        </ul>
                    </div>

                    {/* User Submissions */}
                    <div>
                        <h2 style={headingStyle}>5. User Submissions</h2>
                        <p>
                            When you submit information through our contact or inquiry forms (such as your name, email, company name, budget range, and project details), you grant NeoKlyn the right to use that information solely for the purpose of responding to your inquiry and evaluating potential project engagement.
                        </p>
                        <p style={{ marginTop: '0.75rem' }}>
                            We handle all submitted data in accordance with our <a href="/privacy" style={linkStyle}>Privacy Policy</a>.
                        </p>
                    </div>

                    {/* Third-Party Links */}
                    <div>
                        <h2 style={headingStyle}>6. Third-Party Links</h2>
                        <p>
                            This Website may contain links to third-party websites or services that are not owned or controlled by NeoKlyn. We have no control over, and assume no responsibility for, the content, privacy policies, or practices of any third-party websites. Visiting a third-party site is at your own risk.
                        </p>
                    </div>

                    {/* Disclaimer of Warranties */}
                    <div>
                        <h2 style={headingStyle}>7. Disclaimer of Warranties</h2>
                        <p>
                            This Website is provided on an <strong style={{ color: 'var(--white)' }}>&quot;as is&quot;</strong> and <strong style={{ color: 'var(--white)' }}>&quot;as available&quot;</strong> basis without warranties of any kind, either express or implied, including but not limited to implied warranties of merchantability, fitness for a particular purpose, or non-infringement.
                        </p>
                        <p style={{ marginTop: '0.75rem' }}>
                            We do not warrant that the Website will be uninterrupted, error-free, or free of harmful components. We do not guarantee the accuracy, completeness, or timeliness of any content on the Website.
                        </p>
                    </div>

                    {/* Limitation of Liability */}
                    <div>
                        <h2 style={headingStyle}>8. Limitation of Liability</h2>
                        <p>
                            To the maximum extent permitted by applicable law, NeoKlyn and its founder, employees, contractors, and affiliates shall not be liable for any indirect, incidental, special, consequential, or punitive damages — including but not limited to loss of profits, data, goodwill, or business opportunity — arising out of or in connection with your use of this Website.
                        </p>
                        <p style={{ marginTop: '0.75rem' }}>
                            Our total aggregate liability for any claims arising under these Terms shall not exceed <strong style={{ color: 'var(--white)' }}>₹10,000 (INR Ten Thousand)</strong>.
                        </p>
                    </div>

                    {/* Indemnification */}
                    <div>
                        <h2 style={headingStyle}>9. Indemnification</h2>
                        <p>
                            You agree to indemnify and hold harmless NeoKlyn, its founder, employees, and contractors from and against any claims, liabilities, damages, losses, and expenses (including legal fees) arising out of your use of the Website, your violation of these Terms, or your violation of any rights of a third party.
                        </p>
                    </div>

                    {/* Governing Law */}
                    <div>
                        <h2 style={headingStyle}>10. Governing Law</h2>
                        <p>
                            These Terms shall be governed by and construed in accordance with the laws of <strong style={{ color: 'var(--white)' }}>India</strong>, without regard to its conflict of law provisions.
                        </p>
                    </div>

                    {/* Dispute Resolution */}
                    <div>
                        <h2 style={headingStyle}>11. Dispute Resolution</h2>
                        <p>
                            Any dispute, controversy, or claim arising out of or relating to these Terms shall be resolved as follows:
                        </p>
                        <ol style={{ ...listStyle, listStyleType: 'decimal' }}>
                            <li>
                                <strong style={{ color: 'var(--white)' }}>Informal Resolution</strong> — The parties shall first attempt to resolve the dispute through good-faith negotiation by contacting us at <a href="mailto:hello.neoklyn@gmail.com" style={linkStyle}>hello.neoklyn@gmail.com</a>.
                            </li>
                            <li style={{ marginTop: '0.5rem' }}>
                                <strong style={{ color: 'var(--white)' }}>Arbitration</strong> — If the dispute is not resolved within 30 days of the initial notice, it shall be referred to and finally resolved by arbitration in accordance with the <strong style={{ color: 'var(--white)' }}>Arbitration and Conciliation Act, 1996</strong> (India). The seat of arbitration shall be <strong style={{ color: 'var(--white)' }}>Bengaluru, Karnataka, India</strong>.
                            </li>
                            <li style={{ marginTop: '0.5rem' }}>
                                <strong style={{ color: 'var(--white)' }}>Jurisdiction</strong> — Subject to the arbitration clause above, the courts of Bengaluru, Karnataka, India shall have exclusive jurisdiction over any legal proceedings.
                            </li>
                        </ol>
                    </div>

                    {/* Severability */}
                    <div>
                        <h2 style={headingStyle}>12. Severability</h2>
                        <p>
                            If any provision of these Terms is found to be invalid or unenforceable by a court of competent jurisdiction, the remaining provisions shall remain in full force and effect.
                        </p>
                    </div>

                    {/* Changes */}
                    <div>
                        <h2 style={headingStyle}>13. Changes to These Terms</h2>
                        <p>
                            We reserve the right to modify these Terms at any time. Updated Terms will be posted on this page with a revised &quot;Last Updated&quot; date. Your continued use of the Website after any changes constitutes your acceptance of the updated Terms.
                        </p>
                    </div>

                    {/* Contact */}
                    <div>
                        <h2 style={headingStyle}>14. Contact Us</h2>
                        <p>If you have any questions about these Terms of Service, please contact us:</p>
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
    color: 'var(--violet)',
    textDecoration: 'underline',
    textUnderlineOffset: '3px',
};
