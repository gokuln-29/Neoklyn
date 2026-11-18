type TrackWindow = Window & {
  dataLayer?: Record<string, unknown>[];
  gtag?: (...args: unknown[]) => void;
};

/**
 * Events that mean "a visitor became a lead". Each also fires GA4's standard
 * `generate_lead` event, so there is a single key event to mark as a
 * conversion in GA4 and to compare channels against.
 */
const LEAD_EVENTS = new Set([
  "contact_form_submit",
  "cta_email_capture",
  "estimate_complete",
  "audit_quiz_complete",
  "website_audit_complete",
  "chat_lead_captured",
]);

/**
 * Sends an event to GA4 (through gtag) and mirrors it to dataLayer.
 *
 * The Google tag in the root layout is what delivers events to GA4. The old GTM container
 * (GTM-K4425M6M) had no tags, so it was removed from the page; if GTM is ever added back with
 * GA4 event tags for these events, drop the gtag call below to avoid double counting.
 */
export function trackEvent(event: string, data: Record<string, unknown> = {}) {
  if (typeof window === "undefined") return;
  const w = window as TrackWindow;
  const send = (name: string, params: Record<string, unknown>) => {
    w.dataLayer = w.dataLayer || [];
    w.dataLayer.push({ event: name, ...params });
    try {
      w.gtag?.("event", name, params);
    } catch {
      /* analytics must never break the page */
    }
  };

  send(event, data);
  if (LEAD_EVENTS.has(event)) {
    send("generate_lead", { lead_source: event, ...data });
  }
}

// ─── Attribution ────────────────────────────────────────

export type Attribution = {
  utm_source?: string;
  utm_medium?: string;
  utm_campaign?: string;
  utm_term?: string;
  utm_content?: string;
  referrer?: string;
  landing_page?: string;
  captured_at?: string;
};

const ATTRIBUTION_KEY = "nk_attribution";
const ATTRIBUTION_TTL_MS = 30 * 24 * 60 * 60 * 1000;
const UTM_KEYS = ["utm_source", "utm_medium", "utm_campaign", "utm_term", "utm_content"] as const;

function readStored(): Attribution | null {
  try {
    const raw = window.localStorage.getItem(ATTRIBUTION_KEY);
    if (!raw) return null;
    const parsed = JSON.parse(raw) as Attribution;
    const age = Date.now() - Date.parse(parsed.captured_at || "");
    if (!Number.isFinite(age) || age > ATTRIBUTION_TTL_MS) return null;
    return parsed;
  } catch {
    return null;
  }
}

/**
 * Remembers how the visitor first arrived (UTM tags, external referrer,
 * landing page) for 30 days so it can be saved with any lead they submit.
 * A new visit that carries UTM tags replaces the stored touch.
 */
export function captureAttribution() {
  if (typeof window === "undefined") return;
  try {
    const params = new URLSearchParams(window.location.search);
    const hasUtm = UTM_KEYS.some((key) => params.get(key));
    const existing = readStored();
    if (existing && !hasUtm) return;

    const next: Attribution = {
      landing_page: window.location.pathname,
      captured_at: new Date().toISOString(),
    };
    for (const key of UTM_KEYS) {
      const value = params.get(key);
      if (value) next[key] = value.slice(0, 120);
    }
    if (document.referrer) {
      const ref = new URL(document.referrer);
      if (ref.hostname !== window.location.hostname) next.referrer = ref.hostname;
    }
    window.localStorage.setItem(ATTRIBUTION_KEY, JSON.stringify(next));
  } catch {
    /* storage can be blocked; attribution is best-effort */
  }
}

/** Attribution to attach to a lead submission. Empty object when unknown. */
export function getAttribution(): Attribution {
  if (typeof window === "undefined") return {};
  return readStored() ?? {};
}
