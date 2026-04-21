import OpenAI from "openai";
import nodemailer from "nodemailer";
import { NextRequest, NextResponse } from "next/server";
import { chatSystemPrompt } from "@/lib/chatSystemPrompt";

type IncomingMessage = {
  role: "user" | "assistant";
  content: string;
};

const MAX_USER_MESSAGES = 20;

function extractLeadSignals(messages: IncomingMessage[]) {
  const userText = messages
    .filter((message) => message.role === "user")
    .map((message) => message.content)
    .join("\n");

  const emailMatch = userText.match(/[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}/i);
  const budgetMatch = userText.match(
    /(?:\$|₹|£|AED|SGD|USD|INR|GBP)\s?\d[\d,.]*(?:\s?[kKmMlL]\+?)?(?:\s?(?:-|to)\s?(?:\$|₹|£|AED|SGD|USD|INR|GBP)?\s?\d[\d,.]*(?:\s?[kKmMlL]\+?)?)?/i
  );
  const nameMatch = userText.match(
    /(?:my name is|i am|i'm|this is)\s+([A-Z][a-z]+(?:\s+[A-Z][a-z]+){0,2})/i
  );
  const companySizeMatch = userText.match(/\b(\d{1,5})\s*(?:employees|team members|people|staff)\b/i);

  return {
    name: nameMatch?.[1] || null,
    email: emailMatch?.[0] || null,
    budget: budgetMatch?.[0] || null,
    companySize: companySizeMatch ? `${companySizeMatch[1]} employees` : null,
  };
}

function sanitizeMessages(messages: unknown): IncomingMessage[] {
  if (!Array.isArray(messages)) return [];

  return messages
    .map((message) => {
      if (!message || typeof message !== "object") return null;
      const record = message as Record<string, unknown>;
      const role = record.role;
      const content = record.content;

      if ((role !== "user" && role !== "assistant") || typeof content !== "string") {
        return null;
      }

      const trimmed = content.trim();
      if (!trimmed) return null;

      return {
        role: role as "user" | "assistant",
        content: trimmed.slice(0, 4000),
      };
    })
    .filter((message): message is IncomingMessage => Boolean(message));
}

async function sendLeadNotification(signals: any, transcript: string) {
  const { email, name, budget, companySize } = signals;
  
  if (!process.env.GMAIL_USER || !process.env.GMAIL_APP_PASSWORD) {
    console.error("Email credentials missing, skipping lead notification.");
    return;
  }

  const transporter = nodemailer.createTransport({
    service: 'gmail',
    auth: {
      user: process.env.GMAIL_USER,
      pass: process.env.GMAIL_APP_PASSWORD,
    },
  });

  const subject = `🔥 New Chat Lead — ${email || name || 'Anonymous'}`;
  const html = `
    <div style="font-family: 'Segoe UI', sans-serif; max-width: 600px; margin: 0 auto; background: #0a0a14; color: #f4f3ee; border-radius: 12px; overflow: hidden; border: 1px solid rgba(6,182,212,0.2);">
        <div style="padding: 2rem; border-bottom: 2px solid #06B6D4; background: linear-gradient(90deg, rgba(6,182,212,0.1), transparent);">
            <h1 style="color: #06B6D4; margin: 0; font-size: 1.5rem;">New AI Chat Lead</h1>
            <p style="color: #999; margin: 0.5rem 0 0; font-size: 0.85rem;">Captured by Klyn Assistant</p>
        </div>
        <div style="padding: 2rem;">
            <table style="width: 100%; border-collapse: collapse;">
                <tr>
                    <td style="color: #999; font-size: 0.85rem; padding: 0.5rem 0; vertical-align: top; width: 120px;">Name</td>
                    <td style="font-size: 1rem; padding: 0.5rem 0;">${name || 'Not specified'}</td>
                </tr>
                <tr>
                    <td style="color: #999; font-size: 0.85rem; padding: 0.5rem 0; vertical-align: top;">Email</td>
                    <td style="font-size: 1rem; padding: 0.5rem 0;"><a href="mailto:${email}" style="color: #06B6D4;">${email || 'Not specified'}</a></td>
                </tr>
                <tr>
                    <td style="color: #999; font-size: 0.85rem; padding: 0.5rem 0; vertical-align: top;">Budget</td>
                    <td style="font-size: 1rem; padding: 0.5rem 0;">${budget || 'Not specified'}</td>
                </tr>
                <tr>
                    <td style="color: #999; font-size: 0.85rem; padding: 0.5rem 0; vertical-align: top;">Company</td>
                    <td style="font-size: 1rem; padding: 0.5rem 0;">${companySize || 'Not specified'}</td>
                </tr>
            </table>
            <div style="margin-top: 1.5rem; padding: 1.2rem; background: rgba(255,255,255,0.03); border-radius: 8px; border: 1px solid rgba(255,255,255,0.05);">
                <p style="color: #999; font-size: 0.85rem; margin: 0 0 0.8rem; text-transform: uppercase; letter-spacing: 0.05em;">Initial Requirements</p>
                <p style="font-size: 0.95rem; line-height: 1.6; margin: 0; white-space: pre-wrap; color: #ccc;">${transcript}</p>
            </div>
        </div>
        <div style="padding: 1rem 2rem; background: rgba(6,182,212,0.05); font-size: 0.75rem; color: #666; text-align: center;">
            Sent from NeoKlyn AI Chat System
        </div>
    </div>
  `;

  await transporter.sendMail({
    from: `"NeoKlyn AI" <${process.env.GMAIL_USER}>`,
    to: process.env.GMAIL_USER,
    replyTo: email || undefined,
    subject,
    html,
  });
}

export async function POST(req: NextRequest) {
  try {
    const { messages } = (await req.json()) as { messages?: unknown };
    const sanitizedMessages = sanitizeMessages(messages);

    if (!sanitizedMessages.length) {
      return NextResponse.json({ error: "At least one message is required." }, { status: 400 });
    }

    const userMessageCount = sanitizedMessages.filter((message) => message.role === "user").length;
    if (userMessageCount > MAX_USER_MESSAGES) {
      return NextResponse.json(
        {
          error: "Message limit reached for this conversation.",
          message:
            "We have reached the 20-message limit for this chat. Please continue via the contact form or book a call at https://cal.com/neoklyn.",
        },
        { status: 429 }
      );
    }

    const apiKey = process.env.GROQ_API_KEY;
    if (!apiKey) {
      return NextResponse.json(
        { error: "Groq API key is missing on the server." },
        { status: 500 }
      );
    }

    const groq = new OpenAI({
      apiKey,
      baseURL: "https://api.groq.com/openai/v1",
    });

    const response = await groq.chat.completions.create({
      model: "llama-3.3-70b-versatile",
      messages: [
        { role: "system", content: chatSystemPrompt },
        ...sanitizedMessages.map((msg) => ({
          role: msg.role === "assistant" ? "assistant" as const : "user" as const,
          content: msg.content,
        })),
      ],
      max_tokens: 800,
      temperature: 0.7,
    });

    const assistantText = response.choices[0].message.content?.trim();
    const leadSignals = extractLeadSignals(sanitizedMessages);

    // If an email was just captured in the latest message, trigger the notification
    if (leadSignals.email) {
      const lastMessage = sanitizedMessages[sanitizedMessages.length - 1];
      const previousMessages = sanitizedMessages.slice(0, -1);
      const emailAlreadyKnown = previousMessages.some(m => m.content.toLowerCase().includes(leadSignals.email!.toLowerCase()));

      if (!emailAlreadyKnown && lastMessage.role === "user") {
        const transcript = sanitizedMessages
          .filter(m => m.role === "user")
          .map(m => m.content)
          .join("\n\n");
          
        // Run in background so request doesn't wait
        void sendLeadNotification(leadSignals, transcript).catch(e => console.error("Lead email fail:", e));
      }
    }

    return NextResponse.json({
      content: assistantText || "Thanks for sharing. Could you tell me a little about your project goals?",
      metadata: {
        leadSignals,
        userMessageCount,
      },
    });
  } catch (error: unknown) {
    const errorMessage = error instanceof Error ? error.message : "Unknown error";
    console.error("Chat API error:", errorMessage, error);
    return NextResponse.json(
      {
        error: "Unable to process chat request right now.",
        message: `Please try again or contact hello@neoklyn.com. (${errorMessage})`,
      },
      { status: 500 }
    );
  }
}
