"use client";

import Link from "next/link";
import { useEffect } from "react";
import { usePathname } from "next/navigation";
import { whatsappUrl } from "@/lib/contact";

// Pages that already are the conversion step, so a bar would only get in the way.
const HIDDEN_ON = ["/contact", "/estimate", "/audit", "/website-audit"];

/**
 * Phone-only bottom bar with the two lowest-friction actions: WhatsApp and a
 * free estimate. Clicks are tracked by SiteTracking via `data-track-location`.
 */
export default function StickyMobileCTA() {
  const pathname = usePathname();
  const hidden = HIDDEN_ON.some((p) => pathname === p || pathname.startsWith(`${p}/`));

  useEffect(() => {
    if (hidden) return;
    document.body.classList.add("has-sticky-cta");
    return () => document.body.classList.remove("has-sticky-cta");
  }, [hidden]);

  if (hidden) return null;

  return (
    <>
      <div className="nk-sticky-cta" data-track-location="sticky_mobile_bar" role="region" aria-label="Quick contact">
        <a
          href={whatsappUrl("Hi NeoKlyn, I'd like to discuss a project")}
          target="_blank"
          rel="noopener noreferrer"
          className="nk-sticky-btn nk-sticky-wa"
        >
          <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
            <path d="M20.5 3.5A11.9 11.9 0 0 0 12 0C5.4 0 .1 5.3.1 11.9c0 2.1.5 4.1 1.6 5.9L0 24l6.4-1.7a11.9 11.9 0 0 0 5.6 1.4c6.6 0 11.9-5.3 11.9-11.9 0-3.2-1.2-6.2-3.4-8.3zM12 21.7c-1.8 0-3.5-.5-5-1.4l-.4-.2-3.8 1 1-3.7-.2-.4a9.8 9.8 0 0 1-1.5-5.1C2.1 6.5 6.5 2.1 12 2.1c2.6 0 5.1 1 6.9 2.9a9.7 9.7 0 0 1 2.9 6.9c0 5.4-4.4 9.8-9.8 9.8zm5.4-7.3c-.3-.1-1.8-.9-2-1-.3-.1-.5-.1-.7.1l-.9 1.1c-.2.2-.3.2-.6.1-.3-.1-1.2-.4-2.3-1.4-.9-.8-1.4-1.7-1.6-2-.2-.3 0-.5.1-.6l.4-.5.3-.5c.1-.2 0-.4 0-.5l-.9-2.1c-.2-.5-.4-.5-.6-.5h-.5c-.2 0-.5.1-.7.3-.3.3-1 1-1 2.4s1 2.8 1.2 3c.1.2 2 3.1 4.9 4.3.7.3 1.2.5 1.6.6.7.2 1.3.2 1.8.1.5-.1 1.8-.7 2-1.4.3-.7.3-1.3.2-1.4-.1-.1-.3-.2-.6-.3z" />
          </svg>
          WhatsApp
        </a>
        <Link href="/estimate" className="nk-sticky-btn nk-sticky-est">
          Free Estimate ↗
        </Link>
      </div>

      <style>{`
        .nk-sticky-cta { display: none; }
        @media (max-width: 768px) {
          .nk-sticky-cta {
            display: flex;
            gap: 0.6rem;
            position: fixed;
            left: 0;
            right: 0;
            bottom: 0;
            z-index: 9000;
            padding: 0.6rem 0.75rem calc(0.6rem + env(safe-area-inset-bottom));
            background: rgba(4, 4, 6, 0.92);
            border-top: 1px solid rgba(255, 255, 255, 0.1);
            backdrop-filter: blur(14px);
            -webkit-backdrop-filter: blur(14px);
          }
          .nk-sticky-btn {
            flex: 1;
            display: inline-flex;
            align-items: center;
            justify-content: center;
            gap: 0.45rem;
            min-height: 46px;
            border-radius: 10px;
            font-family: 'JetBrains Mono', monospace;
            font-size: 0.78rem;
            font-weight: 700;
            letter-spacing: 0.04em;
            text-decoration: none;
            -webkit-tap-highlight-color: transparent;
          }
          .nk-sticky-wa { background: #25d366; color: #04210f; }
          .nk-sticky-est { background: var(--cyan); color: #04141a; }
          .nk-sticky-btn:active { transform: scale(0.98); }
          /* room so the footer is not covered, and lift the chat bubble above the bar */
          body.has-sticky-cta { padding-bottom: calc(66px + env(safe-area-inset-bottom)); }
          body.has-sticky-cta .nk-chat-root { bottom: calc(76px + env(safe-area-inset-bottom)) !important; }
        }
      `}</style>
    </>
  );
}
