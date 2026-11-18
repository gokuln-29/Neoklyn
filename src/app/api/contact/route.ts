import { NextRequest, NextResponse } from 'next/server';
import { sendMail } from '@/lib/mailer';
import { db } from '@/lib/db';
import { cleanAttribution, escapeHtml, sendLeadAutoReply } from '@/lib/leadFollowUp';
import { rateLimit } from '@/lib/rateLimit';

const NOTIFY_EMAIL = 'hello@neoklyn.com';

export async function POST(req: NextRequest) {
    try {
        const ip = req.headers.get('x-forwarded-for')?.split(',')[0] || null;
        if (!rateLimit(`contact:${ip ?? 'unknown'}`, { limit: 10, windowSeconds: 60 }).success) {
            return NextResponse.json({ error: 'Too many requests' }, { status: 429 });
        }

        const body = await req.json();
        const { type, email, name, company, budget, details } = body;
        const attribution = cleanAttribution(body.attribution);

        if (!email) {
            return NextResponse.json({ error: 'Email is required' }, { status: 400 });
        }

        // Persist lead to CMS database (don't block email on failure)
        try {
            await db.lead.create({
                data: {
                    type: 'CONTACT',
                    email,
                    name: name || null,
                    company: company || null,
                    message: details || null,
                    source: type === 'quote' ? 'cta_email_capture' : 'contact_form',
                    metadata: budget || attribution ? { budget, attribution } : undefined,
                },
            });
        } catch (dbError) {
            console.error('Lead persistence error:', dbError);
        }

        let subject: string;
        let html: string;

        if (type === 'quote') {
            // CTA quick quote request
            subject = `🚀 New Quote Request — ${String(email).replace(/[\r\n]/g, ' ')}`;
            html = `
                <div style="font-family: 'Segoe UI', sans-serif; max-width: 600px; margin: 0 auto; background: #0a0a14; color: #f4f3ee; border-radius: 12px; overflow: hidden;">
                    <div style="padding: 2rem; border-bottom: 2px solid #06B6D4;">
                        <h1 style="color: #06B6D4; margin: 0; font-size: 1.5rem;">New Quote Request</h1>
                    </div>
                    <div style="padding: 2rem;">
                        <p style="color: #999; font-size: 0.85rem; margin: 0 0 0.5rem;">Email</p>
                        <p style="font-size: 1.1rem; margin: 0 0 1.5rem;"><a href="mailto:${escapeHtml(email)}" style="color: #06B6D4;">${escapeHtml(email)}</a></p>
                        <p style="color: #999; font-size: 0.85rem; margin: 0 0 0.5rem;">Source</p>
                        <p style="font-size: 1rem; margin: 0;">Website CTA — Get Free Quote</p>
                    </div>
                    <div style="padding: 1rem 2rem; background: rgba(6,182,212,0.05); font-size: 0.75rem; color: #666;">
                        Sent from NeoKlyn Website
                    </div>
                </div>
            `;
        } else {
            // Full contact form inquiry
            subject = `📋 New Project Inquiry — ${String(name ?? '').replace(/[\r\n]/g, ' ')}`;
            html = `
                <div style="font-family: 'Segoe UI', sans-serif; max-width: 600px; margin: 0 auto; background: #0a0a14; color: #f4f3ee; border-radius: 12px; overflow: hidden;">
                    <div style="padding: 2rem; border-bottom: 2px solid #06B6D4;">
                        <h1 style="color: #06B6D4; margin: 0; font-size: 1.5rem;">New Project Inquiry</h1>
                    </div>
                    <div style="padding: 2rem;">
                        <table style="width: 100%; border-collapse: collapse;">
                            <tr>
                                <td style="color: #999; font-size: 0.85rem; padding: 0.5rem 0; vertical-align: top; width: 120px;">Name</td>
                                <td style="font-size: 1rem; padding: 0.5rem 0;">${escapeHtml(name)}</td>
                            </tr>
                            <tr>
                                <td style="color: #999; font-size: 0.85rem; padding: 0.5rem 0; vertical-align: top;">Email</td>
                                <td style="font-size: 1rem; padding: 0.5rem 0;"><a href="mailto:${escapeHtml(email)}" style="color: #06B6D4;">${escapeHtml(email)}</a></td>
                            </tr>
                            <tr>
                                <td style="color: #999; font-size: 0.85rem; padding: 0.5rem 0; vertical-align: top;">Company</td>
                                <td style="font-size: 1rem; padding: 0.5rem 0;">${escapeHtml(company || 'Not specified')}</td>
                            </tr>
                            <tr>
                                <td style="color: #999; font-size: 0.85rem; padding: 0.5rem 0; vertical-align: top;">Budget</td>
                                <td style="font-size: 1rem; padding: 0.5rem 0;">${escapeHtml(budget || 'Not specified')}</td>
                            </tr>
                        </table>
                        <div style="margin-top: 1.5rem; padding-top: 1.5rem; border-top: 1px solid rgba(255,255,255,0.1);">
                            <p style="color: #999; font-size: 0.85rem; margin: 0 0 0.5rem;">Project Details</p>
                            <p style="font-size: 1rem; line-height: 1.7; margin: 0; white-space: pre-wrap;">${escapeHtml(details)}</p>
                        </div>
                    </div>
                    <div style="padding: 1rem 2rem; background: rgba(6,182,212,0.05); font-size: 0.75rem; color: #666;">
                        Sent from NeoKlyn Website — Contact Form
                    </div>
                </div>
            `;
        }

        // Fire-and-forget: the lead is already saved above, so a broken SMTP
        // send must never turn a successful submission into a user-facing error.
        void sendMail({
            from: `"NeoKlyn Website" <${NOTIFY_EMAIL}>`,
            to: NOTIFY_EMAIL,
            replyTo: email,
            subject,
            html,
        }).catch((error) => console.error('Contact notification email failed:', error));

        void sendLeadAutoReply({ email, name, ip });

        return NextResponse.json({ success: true });
    } catch (error) {
        console.error('Contact API error:', error);
        return NextResponse.json({ error: 'Failed to submit. Please try again.' }, { status: 500 });
    }
}
