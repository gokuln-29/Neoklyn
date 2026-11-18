/**
 * Pure functions that turn lead rows into the numbers on /admin/growth.
 * No database access here, so they can be tested with plain objects.
 */

export type MetricLead = {
  type: string;
  source: string | null;
  status: string;
  segment: string | null;
  sequenceStage: number;
  createdAt: Date;
  metadata: unknown;
};

export type Count = { label: string; count: number };

export type LeadMetrics = {
  days: number;
  total: number;
  previousTotal: number;
  hot: number;
  handled: number;
  booked: number;
  /** Leads per day (India time), oldest first, zero-filled. */
  daily: Array<{ date: string; label: string; count: number }>;
  funnel: Count[];
  bySource: Count[];
  byChannel: Count[];
  byCampaign: Count[];
  byLanding: Count[];
  bySegment: Count[];
  audit: { runs: number; averageScore: number | null; below60: number };
  nurture: { optedIn: number; emailsSent: number; unsubscribed: number };
  /** Share of leads in range that carry any attribution record. */
  trackedShare: number;
};

const DAY = 24 * 60 * 60 * 1000;
const TZ = "Asia/Kolkata";

function meta(lead: MetricLead): Record<string, unknown> {
  return lead.metadata && typeof lead.metadata === "object" && !Array.isArray(lead.metadata)
    ? (lead.metadata as Record<string, unknown>)
    : {};
}

function attribution(lead: MetricLead): Record<string, string> | null {
  const a = meta(lead).attribution;
  return a && typeof a === "object" && !Array.isArray(a) ? (a as Record<string, string>) : null;
}

const SOURCE_LABELS: Record<string, string> = {
  contact_enterprise_form: "Contact form",
  contact_form: "Contact form",
  cta_email_capture: "Quick quote box",
  estimate_wizard: "Estimator",
  website_audit: "Website audit",
  audit_landing_page: "AI readiness quiz",
  klyn_chatbot: "Chat assistant",
};

export function sourceLabel(source: string | null): string {
  if (!source) return "Unknown";
  return SOURCE_LABELS[source] ?? source;
}

const SEARCH_HOSTS = /(^|\.)(google|bing|duckduckgo|yahoo|ecosia|baidu)\./i;
const SOCIAL_HOSTS = /(instagram|facebook|linkedin|twitter|^t\.co$|(^|\.)x\.com$|youtube|whatsapp|reddit|quora)/i;

/** Where the visitor came from, using UTM tags first and the referrer second. */
export function channelOf(lead: MetricLead): string {
  const a = attribution(lead);
  if (!a) return "Not tracked";
  const medium = (a.utm_medium || "").toLowerCase();
  const source = (a.utm_source || "").toLowerCase();
  if (/^(cpc|ppc|paid|paidsearch|paid_search)/.test(medium)) return source === "google" || !source ? "Google Ads" : "Paid (other)";
  if (medium === "email" || source === "email" || source === "nurture") return "Email";
  if (source && SOCIAL_HOSTS.test(source)) return "Social (tagged)";
  if (a.utm_source) return "Other campaign link";
  if (a.referrer) {
    if (SEARCH_HOSTS.test(a.referrer)) return "Organic search";
    if (SOCIAL_HOSTS.test(a.referrer)) return "Social";
    return "Other website";
  }
  return "Direct or unknown";
}

function tally(values: string[]): Count[] {
  const counts = new Map<string, number>();
  for (const v of values) counts.set(v, (counts.get(v) || 0) + 1);
  return [...counts.entries()].map(([label, count]) => ({ label, count })).sort((a, b) => b.count - a.count || a.label.localeCompare(b.label));
}

function istDate(d: Date): string {
  return d.toLocaleDateString("en-CA", { timeZone: TZ }); // YYYY-MM-DD
}

const FUNNEL_ORDER = ["NEW", "CONTACTED", "QUALIFIED", "NURTURING", "BOOKED", "CLOSED"];
const FUNNEL_LABELS: Record<string, string> = {
  NEW: "New, no reply yet",
  CONTACTED: "Contacted",
  QUALIFIED: "Qualified",
  NURTURING: "Nurturing",
  BOOKED: "Call or project booked",
  CLOSED: "Closed",
};

/** Earliest instant any dashboard query needs for the given range (current plus previous period). */
export function metricsQueryStart(days: number, now: Date = new Date()): Date {
  const start = Date.parse(`${istDate(new Date(now.getTime() - (days - 1) * DAY))}T00:00:00+05:30`);
  return new Date(start - days * DAY);
}

export function computeLeadMetrics(leads: MetricLead[], days: number, now: Date = new Date()): LeadMetrics {
  // Windows start at midnight India time, so the total always equals the sum of the daily bars.
  const start = Date.parse(`${istDate(new Date(now.getTime() - (days - 1) * DAY))}T00:00:00+05:30`);
  const prevStart = start - days * DAY;
  const current = leads.filter((l) => l.createdAt.getTime() >= start && l.createdAt.getTime() <= now.getTime());
  const previousTotal = leads.filter((l) => l.createdAt.getTime() >= prevStart && l.createdAt.getTime() < start).length;

  // Daily counts, zero-filled so quiet days show as gaps instead of disappearing.
  const perDay = new Map<string, number>();
  for (const l of current) perDay.set(istDate(l.createdAt), (perDay.get(istDate(l.createdAt)) || 0) + 1);
  const daily: LeadMetrics["daily"] = [];
  for (let i = days - 1; i >= 0; i--) {
    const d = new Date(now.getTime() - i * DAY);
    const key = istDate(d);
    daily.push({
      date: key,
      label: d.toLocaleDateString("en-IN", { timeZone: TZ, day: "numeric", month: "short" }),
      count: perDay.get(key) || 0,
    });
  }

  const statusCounts = tally(current.map((l) => l.status));
  const funnel: Count[] = FUNNEL_ORDER.map((s) => ({
    label: FUNNEL_LABELS[s],
    count: statusCounts.find((c) => c.label === s)?.count || 0,
  }));

  const audits = current.filter((l) => l.source === "website_audit");
  const scores = audits.map((l) => meta(l).score).filter((s): s is number => typeof s === "number");
  const optedIn = current.filter((l) => meta(l).nurture_ok === true);

  const landing = current.map((l) => attribution(l)?.landing_page).filter((p): p is string => !!p);

  return {
    days,
    total: current.length,
    previousTotal,
    hot: current.filter((l) => l.segment === "hot").length,
    handled: current.filter((l) => l.status !== "NEW").length,
    booked: current.filter((l) => l.status === "BOOKED" || l.status === "CLOSED").length,
    daily,
    funnel,
    bySource: tally(current.map((l) => sourceLabel(l.source))),
    byChannel: tally(current.map(channelOf)),
    byCampaign: tally(current.map((l) => attribution(l)?.utm_campaign).filter((c): c is string => !!c)),
    byLanding: tally(landing).slice(0, 8),
    bySegment: tally(current.map((l) => l.segment || "unscored")),
    audit: {
      runs: audits.length,
      averageScore: scores.length ? Math.round(scores.reduce((a, b) => a + b, 0) / scores.length) : null,
      below60: scores.filter((s) => s < 60).length,
    },
    nurture: {
      optedIn: optedIn.length,
      emailsSent: optedIn.reduce((sum, l) => sum + l.sequenceStage, 0),
      unsubscribed: optedIn.filter((l) => !!meta(l).unsubscribed_at).length,
    },
    trackedShare: current.length ? current.filter((l) => attribution(l)).length / current.length : 0,
  };
}

/** Percent change vs the previous period as text, or null when there is no baseline. */
export function changeText(current: number, previous: number): string | null {
  if (previous === 0) return current === 0 ? null : "new";
  const pct = Math.round(((current - previous) / previous) * 100);
  return `${pct > 0 ? "+" : ""}${pct}%`;
}
