type HotLeadPayload = {
  email: string;
  name?: string | null;
  segment: string;
  source: string;
  summary: string;
};

type NewLeadPayload = {
  leadId: string;
  email: string;
  name?: string | null;
  segment: string;
  source: string;
};

async function postToN8n(path: string, payload: unknown): Promise<void> {
  const baseUrl = process.env.N8N_WEBHOOK_URL;
  if (!baseUrl) return;

  try {
    await fetch(`${baseUrl}/webhook/${path}`, {
      method: "POST",
      headers: { "content-type": "application/json" },
      body: JSON.stringify(payload),
      signal: AbortSignal.timeout(5000),
    });
  } catch (error) {
    console.error(`n8n webhook "${path}" failed:`, error);
  }
}

/**
 * Fires the "lead-hot-alert" n8n webhook so the founder gets an instant
 * Telegram ping for hot leads. App and n8n run on the same VPS, so this
 * hits n8n over localhost (same pattern n8n's own workflows use to call
 * each other) rather than a public URL. Fire-and-forget — a webhook
 * failure should never block lead capture.
 */
export async function notifyHotLead(payload: HotLeadPayload): Promise<void> {
  return postToN8n("lead-hot-alert", payload);
}

/**
 * Fires the "lead-nurture-start" n8n webhook to kick off the 5-email drip
 * (sends Day 0 immediately, schedules the rest). A hot lead gets BOTH this
 * and notifyHotLead — the instant ping doesn't replace the drip.
 */
export async function notifyNewLead(payload: NewLeadPayload): Promise<void> {
  return postToN8n("lead-nurture-start", payload);
}
