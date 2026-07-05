import nodemailer, { type Transporter } from "nodemailer";

let transporter: Transporter | null | undefined;

export function isMailerConfigured(): boolean {
  return !!(
    process.env.SMTP_HOST &&
    process.env.SMTP_PORT &&
    process.env.SMTP_USER &&
    process.env.SMTP_PASSWORD
  );
}

function getTransporter(): Transporter | null {
  if (transporter !== undefined) return transporter;

  if (!isMailerConfigured()) {
    transporter = null;
    return transporter;
  }

  transporter = nodemailer.createTransport({
    host: process.env.SMTP_HOST,
    port: Number(process.env.SMTP_PORT),
    secure: process.env.SMTP_SECURE !== "false",
    auth: {
      user: process.env.SMTP_USER,
      pass: process.env.SMTP_PASSWORD,
    },
  });

  return transporter;
}

type SendMailInput = {
  from: string;
  to: string | string[];
  subject: string;
  html: string;
  replyTo?: string;
};

/**
 * Sends mail via the domain's own SMTP server (no third-party email API).
 * Returns false without throwing when SMTP isn't configured yet, so callers
 * can degrade gracefully (e.g. still save a lead to the database).
 */
export async function sendMail(input: SendMailInput): Promise<boolean> {
  const client = getTransporter();

  if (!client) {
    console.error("SMTP is not configured — skipping email send.");
    return false;
  }

  await client.sendMail(input);
  return true;
}
