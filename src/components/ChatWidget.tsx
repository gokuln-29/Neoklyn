"use client";

import { useEffect, useMemo, useRef, useState } from "react";

type ChatRole = "user" | "assistant";

type ChatMessage = {
  id: string;
  role: ChatRole;
  content: string;
};

type LeadSignals = {
  name: string | null;
  email: string | null;
  budget: string | null;
  companySize: string | null;
};

const MAX_USER_MESSAGES = 20;
const AUTO_GREETING =
  "Hi, I'm KLYN — your project assistant at NeoKlyn. I can help you scope your project and connect you with the right team. What are you building?";

function extractLeadSignalsFromText(text: string): Partial<LeadSignals> {
  const email = text.match(/[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}/i)?.[0] || null;
  const budget =
    text.match(
      /(?:\$|₹|£|AED|SGD|USD|INR|GBP)\s?\d[\d,.]*(?:\s?[kKmMlL]\+?)?(?:\s?(?:-|to)\s?(?:\$|₹|£|AED|SGD|USD|INR|GBP)?\s?\d[\d,.]*(?:\s?[kKmMlL]\+?)?)?/i
    )?.[0] || null;
  const name =
    text.match(/(?:my name is|i am|i'm|this is)\s+([A-Z][a-z]+(?:\s+[A-Z][a-z]+){0,2})/i)?.[1] || null;
  const companySize = text.match(/\b(\d{1,5})\s*(?:employees|team members|people|staff)\b/i)?.[0] || null;

  return { name, email, budget, companySize };
}

function mergeLeadSignals(current: LeadSignals, incoming?: Partial<LeadSignals> | null): LeadSignals {
  if (!incoming) return current;
  return {
    name: incoming.name || current.name,
    email: incoming.email || current.email,
    budget: incoming.budget || current.budget,
    companySize: incoming.companySize || current.companySize,
  };
}

export default function ChatWidget() {
  const [isOpen, setIsOpen] = useState(false);
  const [hasUnread, setHasUnread] = useState(false);
  const [hasAutoGreeted, setHasAutoGreeted] = useState(false);
  const [messages, setMessages] = useState<ChatMessage[]>([]);
  const [input, setInput] = useState("");
  const [isTyping, setIsTyping] = useState(false);
  const [isSending, setIsSending] = useState(false);
  const [leadSignals, setLeadSignals] = useState<LeadSignals>({
    name: null,
    email: null,
    budget: null,
    companySize: null,
  });
  const [errorText, setErrorText] = useState("");

  const viewportRef = useRef<HTMLDivElement>(null);

  const userMessageCount = useMemo(
    () => messages.filter((message) => message.role === "user").length,
    [messages]
  );
  const hasReachedLimit = userMessageCount >= MAX_USER_MESSAGES;

  useEffect(() => {
    if (hasAutoGreeted) return;
    const timer = setTimeout(() => {
      setMessages((prev) => [
        ...prev,
        {
          id: crypto.randomUUID(),
          role: "assistant",
          content: AUTO_GREETING,
        },
      ]);
      setHasAutoGreeted(true);
      setHasUnread(true);
    }, 8000);

    return () => clearTimeout(timer);
  }, [hasAutoGreeted]);

  useEffect(() => {
    if (!viewportRef.current) return;
    viewportRef.current.scrollTop = viewportRef.current.scrollHeight;
  }, [messages, isTyping]);

  function openWidget() {
    setIsOpen(true);
    setHasUnread(false);

    if (!hasAutoGreeted) {
      setMessages((prev) => [
        ...prev,
        {
          id: crypto.randomUUID(),
          role: "assistant",
          content: AUTO_GREETING,
        },
      ]);
      setHasAutoGreeted(true);
    }
  }

  function closeWidget() {
    setIsOpen(false);
  }

  function createContactPrefillUrl() {
    const userTranscript = messages
      .filter((message) => message.role === "user")
      .map((message) => message.content)
      .join("\n");

    const params = new URLSearchParams();
    if (leadSignals.name) params.set("name", leadSignals.name);
    if (leadSignals.email) params.set("email", leadSignals.email);
    if (leadSignals.budget) params.set("budget", leadSignals.budget);
    if (userTranscript) params.set("details", userTranscript.slice(0, 1000));

    const query = params.toString();
    return query ? `/contact?${query}` : "/contact";
  }

  async function sendMessage() {
    const trimmed = input.trim();
    if (!trimmed || isSending || hasReachedLimit) return;

    const nextUserMessage: ChatMessage = {
      id: crypto.randomUUID(),
      role: "user",
      content: trimmed,
    };

    const nextMessages = [...messages, nextUserMessage];
    setMessages(nextMessages);
    setInput("");
    setErrorText("");
    setIsSending(true);
    setIsTyping(true);

    setLeadSignals((current) => mergeLeadSignals(current, extractLeadSignalsFromText(trimmed)));

    try {
      const response = await fetch("/api/chat", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          messages: nextMessages.map((message) => ({
            role: message.role,
            content: message.content,
          })),
        }),
      });

      const payload = (await response.json()) as {
        content?: string;
        message?: string;
        metadata?: { leadSignals?: Partial<LeadSignals> };
      };

      if (!response.ok) {
        const fallback =
          payload.message ||
          "I could not complete that request. Please share your email and we will follow up quickly.";

        setMessages((prev) => [
          ...prev,
          {
            id: crypto.randomUUID(),
            role: "assistant",
            content: fallback,
          },
        ]);

        setErrorText("Temporary issue connecting to the assistant.");
        return;
      }

      setLeadSignals((current) => mergeLeadSignals(current, payload.metadata?.leadSignals || null));

      setMessages((prev) => [
        ...prev,
        {
          id: crypto.randomUUID(),
          role: "assistant",
          content:
            payload.content ||
            "Thanks for sharing. Could you tell me your timeline and expected launch window?",
        },
      ]);
    } catch {
      setMessages((prev) => [
        ...prev,
        {
          id: crypto.randomUUID(),
          role: "assistant",
          content:
            "I am having trouble right now. You can continue via the contact form or email hello.neoklyn@gmail.com.",
        },
      ]);
      setErrorText("Network error. Please try again.");
    } finally {
      setIsTyping(false);
      setIsSending(false);
    }
  }

  useEffect(() => {
    if (!hasReachedLimit) return;

    const alreadyNotified = messages.some(
      (message) =>
        message.role === "assistant" &&
        message.content.includes("20-message limit")
    );

    if (alreadyNotified) return;

    setMessages((prev) => [
      ...prev,
      {
        id: crypto.randomUUID(),
        role: "assistant",
        content:
          "We have reached the 20-message limit for this quick chat. Please continue on the contact form or book directly at https://cal.com/neoklyn.",
      },
    ]);
  }, [hasReachedLimit, messages]);

  return (
    <>
      <div className="nk-chat-root">
        {isOpen ? (
          <div className="nk-chat-window" role="dialog" aria-label="NeoKlyn AI chat assistant">
            <div className="nk-chat-header">
              <div>
                <div className="nk-chat-title">KLYN</div>
                <div className="nk-chat-subtitle">Klyn - Lead Qualification</div>
              </div>
              <button type="button" className="nk-chat-close" onClick={closeWidget} aria-label="Minimize chat">
                -
              </button>
            </div>

            <div className="nk-chat-viewport" ref={viewportRef}>
              {messages.map((message) => (
                <div key={message.id} className={`nk-msg nk-msg-${message.role}`}>
                  {message.content}
                </div>
              ))}

              {isTyping && (
                <div className="nk-msg nk-msg-assistant nk-typing">
                  <span />
                  <span />
                  <span />
                </div>
              )}
            </div>

            <div className="nk-chat-footer">
              {!!(leadSignals.email || leadSignals.budget || leadSignals.name) && (
                <a className="nk-save-contact" href={createContactPrefillUrl()}>
                  Save to Contact Form
                </a>
              )}

              <div className="nk-input-row">
                <textarea
                  value={input}
                  onChange={(event) => setInput(event.target.value)}
                  placeholder={
                    hasReachedLimit
                      ? "Message limit reached. Please continue via contact form."
                      : "Tell us about your project..."
                  }
                  rows={1}
                  disabled={isSending || hasReachedLimit}
                  onKeyDown={(event) => {
                    if (event.key === "Enter" && !event.shiftKey) {
                      event.preventDefault();
                      void sendMessage();
                    }
                  }}
                />
                <button type="button" onClick={() => void sendMessage()} disabled={isSending || hasReachedLimit}>
                  Send
                </button>
              </div>

              <div className="nk-helper-row">
                <span>{MAX_USER_MESSAGES - userMessageCount} messages left</span>
                {errorText && <span className="nk-error">{errorText}</span>}
              </div>
            </div>
          </div>
        ) : null}

        <button type="button" className="nk-chat-bubble" onClick={openWidget} aria-label="Open NeoKlyn chat">
          <span className="nk-bubble-icon">KLYN</span>
          {hasUnread && <span className="nk-bubble-badge">1</span>}
        </button>
      </div>

      <style>{`
        .nk-chat-root {
          position: fixed;
          right: 18px;
          bottom: 18px;
          z-index: 9999;
          display: flex;
          flex-direction: column;
          align-items: flex-end;
          gap: 10px;
        }

        .nk-chat-bubble {
          width: 62px;
          height: 62px;
          border-radius: 50%;
          border: 1px solid rgba(6, 182, 212, 0.35);
          background: radial-gradient(circle at 30% 20%, rgba(6, 182, 212, 0.32), rgba(12, 12, 18, 0.96));
          color: #dff9ff;
          display: flex;
          align-items: center;
          justify-content: center;
          cursor: pointer;
          box-shadow: 0 18px 42px rgba(0, 0, 0, 0.45);
          position: relative;
          transition: transform 0.2s ease;
        }

        .nk-chat-bubble:hover {
          transform: translateY(-3px);
        }

        .nk-bubble-icon {
          font-family: 'JetBrains Mono', monospace;
          font-size: 0.92rem;
          letter-spacing: 0.1em;
        }

        .nk-bubble-badge {
          position: absolute;
          top: -2px;
          right: -2px;
          width: 20px;
          height: 20px;
          border-radius: 999px;
          background: #ef4444;
          color: #fff;
          font-size: 0.66rem;
          display: flex;
          align-items: center;
          justify-content: center;
          border: 2px solid #08080f;
          font-family: 'JetBrains Mono', monospace;
        }

        .nk-chat-window {
          width: 400px;
          height: 550px;
          border-radius: 18px;
          overflow: hidden;
          border: 1px solid rgba(255, 255, 255, 0.08);
          background: rgba(12, 12, 18, 0.92);
          backdrop-filter: blur(16px);
          -webkit-backdrop-filter: blur(16px);
          box-shadow: 0 28px 54px rgba(0, 0, 0, 0.5);
          display: grid;
          grid-template-rows: auto 1fr auto;
          animation: nk-chat-open 0.22s ease;
          transform-origin: bottom right;
        }

        @keyframes nk-chat-open {
          from {
            opacity: 0;
            transform: scale(0.95) translateY(10px);
          }
          to {
            opacity: 1;
            transform: scale(1) translateY(0);
          }
        }

        .nk-chat-header {
          display: flex;
          justify-content: space-between;
          align-items: center;
          padding: 0.9rem 1rem;
          border-bottom: 1px solid rgba(255, 255, 255, 0.08);
          background: linear-gradient(90deg, rgba(6, 182, 212, 0.1), rgba(139, 92, 246, 0.1));
        }

        .nk-chat-title {
          color: var(--white);
          font-size: 0.96rem;
          font-family: var(--font-space-grotesk), sans-serif;
        }

        .nk-chat-subtitle {
          color: var(--muted);
          font-family: 'JetBrains Mono', monospace;
          font-size: 0.62rem;
          letter-spacing: 0.07em;
          text-transform: uppercase;
        }

        .nk-chat-close {
          width: 28px;
          height: 28px;
          border-radius: 8px;
          border: 1px solid rgba(255, 255, 255, 0.2);
          background: rgba(255, 255, 255, 0.05);
          color: var(--white);
          cursor: pointer;
        }

        .nk-chat-viewport {
          padding: 1rem;
          overflow-y: auto;
          display: flex;
          flex-direction: column;
          gap: 0.62rem;
        }

        .nk-msg {
          max-width: 85%;
          border-radius: 12px;
          padding: 0.65rem 0.78rem;
          font-size: 0.84rem;
          line-height: 1.55;
          white-space: pre-wrap;
        }

        .nk-msg-assistant {
          align-self: flex-start;
          background: rgba(255, 255, 255, 0.05);
          border: 1px solid rgba(255, 255, 255, 0.1);
          color: rgba(255, 255, 255, 0.9);
        }

        .nk-msg-user {
          align-self: flex-end;
          background: rgba(6, 182, 212, 0.17);
          border: 1px solid rgba(6, 182, 212, 0.4);
          color: #dff9ff;
        }

        .nk-typing {
          display: inline-flex;
          align-items: center;
          gap: 6px;
          width: fit-content;
          padding-top: 0.75rem;
          padding-bottom: 0.75rem;
        }

        .nk-typing span {
          width: 7px;
          height: 7px;
          border-radius: 999px;
          background: var(--cyan);
          opacity: 0.5;
          animation: nk-dot 1.1s ease infinite;
        }

        .nk-typing span:nth-child(2) {
          animation-delay: 0.15s;
        }

        .nk-typing span:nth-child(3) {
          animation-delay: 0.3s;
        }

        @keyframes nk-dot {
          0%,
          100% {
            transform: translateY(0);
            opacity: 0.35;
          }
          50% {
            transform: translateY(-4px);
            opacity: 1;
          }
        }

        .nk-chat-footer {
          border-top: 1px solid rgba(255, 255, 255, 0.08);
          padding: 0.78rem;
          display: flex;
          flex-direction: column;
          gap: 0.62rem;
        }

        .nk-save-contact {
          border: 1px solid rgba(6, 182, 212, 0.36);
          background: rgba(6, 182, 212, 0.08);
          color: var(--cyan);
          text-decoration: none;
          border-radius: 9px;
          text-align: center;
          padding: 0.45rem 0.65rem;
          font-size: 0.72rem;
          letter-spacing: 0.06em;
          text-transform: uppercase;
          font-family: 'JetBrains Mono', monospace;
        }

        .nk-input-row {
          display: grid;
          grid-template-columns: 1fr auto;
          gap: 0.55rem;
        }

        .nk-input-row textarea {
          border: 1px solid rgba(255, 255, 255, 0.14);
          border-radius: 10px;
          background: rgba(255, 255, 255, 0.04);
          color: var(--white);
          font-size: 0.82rem;
          line-height: 1.45;
          padding: 0.6rem 0.7rem;
          min-height: 42px;
          max-height: 96px;
          resize: none;
          outline: none;
        }

        .nk-input-row textarea:focus {
          border-color: rgba(6, 182, 212, 0.5);
        }

        .nk-input-row button {
          border: none;
          border-radius: 10px;
          padding: 0 0.95rem;
          font-size: 0.75rem;
          text-transform: uppercase;
          letter-spacing: 0.08em;
          font-family: 'JetBrains Mono', monospace;
          background: linear-gradient(90deg, rgba(6, 182, 212, 0.85), rgba(59, 130, 246, 0.85));
          color: #041015;
          cursor: pointer;
        }

        .nk-input-row button:disabled {
          opacity: 0.45;
          cursor: not-allowed;
        }

        .nk-helper-row {
          display: flex;
          justify-content: space-between;
          align-items: center;
          font-size: 0.62rem;
          color: var(--dim);
          font-family: 'JetBrains Mono', monospace;
          letter-spacing: 0.04em;
          min-height: 14px;
        }

        .nk-error {
          color: #fca5a5;
        }

        @media (max-width: 480px) {
          .nk-chat-root {
            right: 10px;
            left: 10px;
            bottom: 10px;
            align-items: stretch;
          }

          .nk-chat-window {
            width: 100%;
            height: min(72vh, 560px);
          }

          .nk-chat-bubble {
            align-self: flex-end;
          }
        }
      `}</style>
    </>
  );
}
