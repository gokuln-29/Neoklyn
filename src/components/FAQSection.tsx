"use client";

import { useState } from "react";
import { faqSchema } from "@/lib/schema";

const faqs = [
  {
    question: "How much does a web project cost?",
    answer: "Our web projects start from ₹50,000 for a basic landing page. More complex websites and web applications typically range from ₹2-10 lakhs depending on features, integrations, and design requirements. We provide free, detailed quotes within 24 hours.",
  },
  {
    question: "How long does it take to build a website?",
    answer: "Typical timelines: 3-6 weeks for standard websites with 5-10 pages. Web applications and complex platforms take 8-14 weeks. AI-powered solutions and enterprise platforms may require 3-6 months. We'll provide a detailed timeline during the discovery phase.",
  },
  {
    question: "Do you work with international clients?",
    answer: "Yes! We serve clients globally across the UAE, UK, USA, Singapore, Australia, and more. Our async-first approach with clear communication, video calls, and project management tools ensures seamless collaboration across all time zones.",
  },
  {
    question: "What happens after the website launches?",
    answer: "We offer comprehensive post-launch support including 30 days of free bug fixes, monthly maintenance packages, security updates, and performance monitoring. Our retainer options include ongoing improvements, new features, and dedicated support.",
  },
  {
    question: "Do you specialize in redesigns and migrations?",
    answer: "Absolutely. Redesign and platform migration is a core expertise. We've successfully migrated clients from WordPress, Wix, Squarespace, and older platforms to modern stacks like Next.js. We handle content migration, SEO preservation, and performance optimization seamlessly.",
  },
  {
    question: "What makes NeoKlyn different from other agencies?",
    answer: "We operate with 100% in-house engineering and design teams—no outsourcing or templates. Every project gets a dedicated project manager, regular video demos, and transparent milestone-based billing. Our average client relationship spans 2+ years with 98% retention rate.",
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