"use client";

import { useState } from "react";
import { faqSchema } from "@/lib/schema";

const faqs = [
  {
    question: "What does \"AI-accelerated development\" mean?",
    answer: "We use professional AI coding tools to handle repetitive development work at high speed, while a senior engineer with 10+ years of experience personally handles architecture, security, code review, and testing. You get the speed and cost savings of AI with the quality and accountability of an experienced human engineer.",
  },
  {
    question: "Is AI-generated code safe and reliable?",
    answer: "Unreviewed AI code isn't — which is why we never ship it. Every line in your project is reviewed, tested, and security-checked by the senior engineer before delivery. You also get 30 days of free post-launch fixes and full ownership of the code, so nothing is hidden.",
  },
  {
    question: "How can you be so much cheaper than agencies?",
    answer: "No offices, no account managers, no sales teams, no junior developers billing hours. AI handles the repetitive work; one experienced engineer handles everything that matters. Lower overhead, not lower quality.",
  },
  {
    question: "Who will actually work on my project?",
    answer: "The founder — a senior engineer with 10+ years of web development experience. The person on your first call is the person who architects, builds, and delivers your project. No handoffs.",
  },
  {
    question: "How much does a project cost?",
    answer: "Websites start from ₹50,000 / $600. Web apps and ecommerce typically range ₹1-4 lakh / $1,200-5,000 depending on features. You get a fixed written quote within 24 hours — and it stays fixed unless you change the scope.",
  },
  {
    question: "How fast can you deliver?",
    answer: "Standard websites: 2-3 weeks. Web apps and ecommerce: 3-6 weeks. Complex platforms and AI products: 6-10 weeks. AI acceleration typically makes us 2-3x faster than traditional agency timelines.",
  },
  {
    question: "Do you work with international clients?",
    answer: "Yes — NeoKlyn is based in Bengaluru, India and works with clients worldwide. Clear async communication, video calls in your time zone, and everything documented in writing.",
  },
  {
    question: "What happens after launch?",
    answer: "30 days of free bug fixes, plus optional monthly retainers for ongoing development, marketing, or AI operations. You own 100% of the code, design files, accounts, and data from day one.",
  },
];

export default function FAQSection() {
  const [openIndex, setOpenIndex] = useState<number | null>(null);

  const toggle = (index: number) => {
    setOpenIndex(openIndex === index ? null : index);
  };

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema(faqs)) }}
      />
      <section className="section section-alt">
        <div className="reveal" style={{ textAlign: "center", marginBottom: "3rem" }}>
          <div className="s-label">FAQ</div>
          <h2 className="s-title">Common Questions</h2>
          <p className="s-sub">Everything you need to know before starting your project.</p>
        </div>

        <div
          className="reveal"
          style={{
            maxWidth: "800px",
            margin: "0 auto",
            border: "1px solid var(--border)",
            borderRadius: "12px",
            background: "var(--ink)",
            overflow: "hidden",
          }}
        >
          {faqs.map((faq, index) => (
            <div
              key={index}
              style={{
                borderBottom: index < faqs.length - 1 ? "1px solid var(--border)" : "none",
              }}
            >
              <button
                onClick={() => toggle(index)}
                style={{
                  width: "100%",
                  padding: "1.5rem 2rem",
                  display: "flex",
                  justifyContent: "space-between",
                  alignItems: "center",
                  background: "transparent",
                  border: "none",
                  cursor: "pointer",
                  textAlign: "left",
                  color: "var(--white)",
                  fontFamily: "var(--font-space-grotesk), sans-serif",
                  fontSize: "1.05rem",
                  fontWeight: 600,
                  transition: "background 0.2s",
                }}
                onMouseEnter={(e) => {
                  e.currentTarget.style.background = "rgba(255,255,255,0.02)";
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.background = "transparent";
                }}
                aria-expanded={openIndex === index}
              >
                <span>{faq.question}</span>
                <span
                  style={{
                    width: "24px",
                    height: "24px",
                    flexShrink: 0,
                    marginLeft: "1rem",
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    color: "var(--cyan)",
                    transition: "transform 0.3s ease",
                    transform: openIndex === index ? "rotate(45deg)" : "rotate(0deg)",
                  }}
                >
                  <svg
                    width="16"
                    height="16"
                    viewBox="0 0 16 16"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path
                      d="M8 2V14M2 8H14"
                      stroke="currentColor"
                      strokeWidth="2"
                      strokeLinecap="round"
                    />
                  </svg>
                </span>
              </button>
              <div
                style={{
                  maxHeight: openIndex === index ? "500px" : "0",
                  overflow: "hidden",
                  transition: "max-height 0.4s ease, padding 0.4s ease",
                }}
              >
                <div
                  style={{
                    padding: openIndex === index ? "0 2rem 1.5rem 2rem" : "0 2rem",
                    color: "var(--muted)",
                    lineHeight: 1.7,
                    fontSize: "0.95rem",
                  }}
                >
                  {faq.answer}
                </div>
              </div>
            </div>
          ))}
        </div>
      </section>
    </>
  );
}