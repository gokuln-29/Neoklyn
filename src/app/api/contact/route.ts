import { NextRequest, NextResponse } from 'next/server';
import nodemailer from 'nodemailer';

export async function POST(req: NextRequest) {
    try {
        const body = await req.json();
        const { type, email, name, company, budget, details } = body;

        if (!email) {
            return NextResponse.json({ error: 'Email is required' }, { status: 400 });
        }

        const transporter = nodemailer.createTransport({
            service: 'gmail',
            auth: {
                user: process.env.GMAIL_USER,
                pass: process.env.GMAIL_APP_PASSWORD,
            },
        });

        let subject: string;
        let html: string;

        if (type === 'quote') {
            // CTA quick quote request
            subject = `🚀 New Quote Request — ${email}`;
            html = `
                <div style="font-family: 'Segoe UI', sans-serif; max-width: 600px; margin: 0 auto; background: #0a0a14; color: #f4f3ee; border-radius: 12px; overflow: hidden;">
                    <div style="padding: 2rem; border-bottom: 2px solid #06B6D4;">
                        <h1 style="color: #06B6D4; margin: 0; font-size: 1.5rem;">New Quote Request</h1>
                    </div>
                    <div style="padding: 2rem;">
                        <p style="color: #999; font-size: 0.85rem; margin: 0 0 0.5rem;">Email</p>
                        <p style="font-size: 1.1rem; margin: 0 0 1.5rem;"><a href="mailto:${email}" style="color: #06B6D4;">${email}</a></p>
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
            subject = `📋 New Project Inquiry — ${name}`;
            html = `
                <div style="font-family: 'Segoe UI', sans-serif; max-width: 600px; margin: 0 auto; background: #0a0a14; color: #f4f3ee; border-radius: 12px; overflow: hidden;">
                    <div style="padding: 2rem; border-bottom: 2px solid #06B6D4;">
                        <h1 style="color: #06B6D4; margin: 0; font-size: 1.5rem;">New Project Inquiry</h1>
                    </div>
                    <div style="padding: 2rem;">
                        <table style="width: 100%; border-collapse: collapse;">
                            <tr>
                                <td style="color: #999; font-size: 0.85rem; padding: 0.5rem 0; vertical-align: top; width: 120px;">Name</td>
                                <td style="font-size: 1rem; padding: 0.5rem 0;">${name}</td>
                            </tr>
                            <tr>
                                <td style="color: #999; font-size: 0.85rem; padding: 0.5rem 0; vertical-align: top;">Email</td>
                                <td style="font-size: 1rem; padding: 0.5rem 0;"><a href="mailto:${email}" style="color: #06B6D4;">${email}</a></td>
                            </tr>
                            <tr>
                                <td style="color: #999; font-size: 0.85rem; padding: 0.5rem 0; vertical-align: top;">Company</td>
                                <td style="font-size: 1rem; padding: 0.5rem 0;">${company || 'Not specified'}</td>
                            </tr>
                            <tr>
                                <td style="color: #999; font-size: 0.85rem; padding: 0.5rem 0; vertical-align: top;">Budget</td>
                                <td style="font-size: 1rem; padding: 0.5rem 0;">${budget || 'Not specified'}</td>
                            </tr>
                        </table>
                        <div style="margin-top: 1.5rem; padding-top: 1.5rem; border-top: 1px solid rgba(255,255,255,0.1);">
                            <p style="color: #999; font-size: 0.85rem; margin: 0 0 0.5rem;">Project Details</p>
                            <p style="font-size: 1rem; line-height: 1.7; margin: 0; white-space: pre-wrap;">${details}</p>
                        </div>
                    </div>
                    <div style="padding: 1rem 2rem; background: rgba(6,182,212,0.05); font-size: 0.75rem; color: #666;">
                        Sent from NeoKlyn Website — Contact Form
                    </div>
                </div>
            `;
        }

        await transporter.sendMail({
            from: `"NeoKlyn Website" <${process.env.GMAIL_USER}>`,
            to: process.env.GMAIL_USER,
            replyTo: email,
            subject,
            html,
        });

        return NextResponse.json({ success: true });
    } catch (error) {
        console.error('Email send error:', error);
        return NextResponse.json({ error: 'Failed to send email' }, { status: 500 });
    }
}
