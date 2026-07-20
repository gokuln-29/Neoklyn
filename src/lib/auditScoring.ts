import { AUDIT_QUESTIONS, type AuditAnswers } from "@/data/auditQuestions";

export type Segment = "hot" | "warm" | "cold";

const HOT_THRESHOLD = 9;
const WARM_THRESHOLD = 5;

export function scoreAnswers(answers: AuditAnswers): { score: number; segment: Segment } {
  let score = 0;
  for (const q of AUDIT_QUESTIONS) {
    const chosen = answers[q.key];
    const option = q.options.find((o) => o.value === chosen);
    if (option) score += option.points;
  }

  const segment: Segment = score >= HOT_THRESHOLD ? "hot" : score >= WARM_THRESHOLD ? "warm" : "cold";
  return { score, segment };
}

const PAIN_POINT_COPY: Record<string, string> = {
  "Customer support": "customer support",
  "Content & marketing": "content and marketing production",
  "Sales follow-up": "sales follow-up",
  "Data entry & reporting": "data entry and reporting",
  "Scheduling & operations": "scheduling and day-to-day operations",
};

export function buildTakeaway(answers: AuditAnswers, segment: Segment): string {
  const painPoint = PAIN_POINT_COPY[answers.biggestTimeSink] || "day-to-day operations";

  if (segment === "hot") {
    return `Based on your answers, ${painPoint} is your biggest opportunity — and your timeline and budget both suggest you're ready to move now. Most teams in your position see a working first automation live within 4-6 weeks. Book a 15-minute call and we'll map the fastest path.`;
  }

  if (segment === "warm") {
    return `${painPoint.charAt(0).toUpperCase() + painPoint.slice(1)} is eating more of your team's time than it should, and there's a clear automation opportunity there. You're not in a rush, which is fine — worth a short call now so you have a plan ready for when the timing's right.`;
  }

  return `You're still early in exploring AI/automation, and that's a good place to start from. Keep an eye on ${painPoint} as the first thing worth automating once you're ready — we'll send a few relevant examples over email in the meantime.`;
}
