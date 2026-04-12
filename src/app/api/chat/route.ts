import Anthropic from "@anthropic-ai/sdk";
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
        role,
        content: trimmed.slice(0, 4000),
      };
    })
    .filter((message): message is IncomingMessage => Boolean(message));
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

    const apiKey = process.env.ANTHROPIC_API_KEY;
    if (!apiKey) {
      return NextResponse.json(
        { error: "Anthropic API key is missing on the server." },
        { status: 500 }
      );
    }

    const anthropic = new Anthropic({ apiKey });
    const response = await anthropic.messages.create({
      model: "claude-sonnet-4-5",
      max_tokens: 600,
      temperature: 0.5,
      system: chatSystemPrompt,
      messages: sanitizedMessages.map((message) => ({
        role: message.role,
        content: message.content,
      })),
    });

    const assistantText = response.content
      .filter((block) => block.type === "text")
      .map((block) => block.text)
      .join("\n")
      .trim();

    return NextResponse.json({
      content: assistantText || "Thanks for sharing. Could you tell me a little about your project goals?",
      metadata: {
        leadSignals: extractLeadSignals(sanitizedMessages),
        userMessageCount,
      },
    });
  } catch (error) {
    console.error("Chat API error:", error);
    return NextResponse.json(
      {
        error: "Unable to process chat request right now.",
        message: "Please try again or contact hello.neoklyn@gmail.com.",
      },
      { status: 500 }
    );
  }
}
