import { CAL_URL, whatsappUrl } from "@/lib/contact";
import { escapeHtml, linkBtn, shell } from "@/lib/leadFollowUp";
import { projects } from "@/app/work/projects";

/**
 * Follow-up emails for people who used the website audit, the estimator or the
 * AI readiness quiz. Five emails per track, sent on days 2, 4, 7, 10 and 14.
 *
 * Rules: only facts already published on the site (prices, timelines, terms,
 * confirmed case-study results); no invented urgency or statistics; one
 * clear next step per email; the last email says it is the last.
 */

export type Track = "website" | "estimate" | "ai";

export const NURTURE_DAYS = [2, 4, 7, 10, 14] as const;

export type NurtureContext = {
  firstName?: string;
  /** website track */
  host?: string;
  score?: number;
  topFixes?: Array<{ label: string; fix: string }>;
  /** estimate track */
  projectType?: string;
};

export type NurtureEmail = { subject: string; body: string; cta?: { label: string; href: string } };

const SITE = "https://neoklyn.com";
const caseStudy = (slug: string) => projects.find((p) => p.slug === slug);

function hi(ctx: NurtureContext) {
  return `<p>${ctx.firstName ? `Hi ${escapeHtml(ctx.firstName)},` : "Hi,"}</p>`;
}

const sign = `<p>— Gokulnath, NeoKlyn</p>`;

const p = (text: string) => `<p>${text}</p>`;
const link = (href: string, label: string) => `<a href="${href}" style="color:#06B6D4;">${label}</a>`;

// ─── Website audit track ────────────────────────────────

function websiteEmail(step: number, ctx: NurtureContext): NurtureEmail {
  const host = escapeHtml(ctx.host || "your website");
  const sharon = caseStudy("sharon-physio");
  switch (step) {
    case 1: {
      const fix = ctx.topFixes?.[0];
      return {
        subject: fix ? `The first fix for ${ctx.host || "your site"}` : "What to fix first on your website",
        body:
          hi(ctx) +
          (fix
            ? p(`A couple of days ago you ran our audit on <strong>${host}</strong>${ctx.score != null ? ` and it scored ${ctx.score}/100` : ""}. If you only fix one thing, fix this: <strong>${escapeHtml(fix.label)}</strong>.`) +
              p(escapeHtml(fix.fix))
            : p(`A couple of days ago you ran our audit on <strong>${host}</strong>. The fastest wins are usually page speed on mobile, a clear contact button and a proper page title and description.`)) +
          p("If you're not sure how to make the change, reply with what the site is built on (WordPress, Wix, custom) and I'll tell you the simplest way to do it.") +
          sign,
        cta: { label: "Run the audit again", href: `${SITE}/website-audit` },
      };
    }
    case 2:
      return {
        subject: "What changed for a Madurai clinic",
        body:
          hi(ctx) +
          p("Here's a real example of what a better website does for a small business.") +
          (sharon
            ? p(`<strong>Sharon Physio</strong> is a physiotherapy clinic in Madurai. <strong>The problem:</strong> ${escapeHtml(sharon.caseStudy.challenge)} <strong>What we built:</strong> ${escapeHtml(sharon.caseStudy.solution)} <strong>The result:</strong> ${escapeHtml(sharon.caseStudy.results[0].metric)}, ${escapeHtml(sharon.caseStudy.results[0].description)}.`)
            : "") +
          p("The same approach works for most local businesses: make it obvious what you do, and make it easy to ask.") +
          sign,
        cta: { label: "Read the case study", href: `${SITE}/work/sharon-physio` },
      };
    case 3:
      return {
        subject: "What a website should actually cost",
        body:
          hi(ctx) +
          p("If you're thinking about rebuilding rather than patching, the next question is price. Quotes vary wildly because they skip the part that decides the number: what exactly you're asking for.") +
          p("Our guide explains what moves the price, with real bands (websites start from ₹50,000), and the red flags in a cheap quote.") +
          sign,
        cta: { label: "Read the cost guide", href: `${SITE}/insights/website-development-cost-guide` },
      };
    case 4:
      return {
        subject: "Seven questions to ask any web developer",
        body:
          hi(ctx) +
          p("Whoever you hire, ask these first: who exactly builds it, is the price fixed, do I own the code and the accounts, what does it cost to run each year, what happens if it breaks after launch.") +
          p("We put the full list, with why each one matters, on one page. It's useful even if you never work with us.") +
          sign,
        cta: { label: "See the questions", href: `${SITE}/solutions/website-development-bengaluru` },
      };
    default:
      return {
        subject: "Should I close this out?",
        body:
          hi(ctx) +
          p(`This is the last email in this series. If fixing ${host} is still on your list, here is the simplest next step: tell us what you need and you'll get a fixed written quote within 24 hours.`) +
          p(`Prefer to talk? ${link(CAL_URL, "Book a 20-minute call")} or ${link(whatsappUrl("Hi NeoKlyn, I ran the website audit and I'd like help"), "message us on WhatsApp")}. If the timing isn't right, no problem, and you won't hear from us again.`) +
          sign,
        cta: { label: "Get a free estimate", href: `${SITE}/estimate` },
      };
  }
}

// ─── Estimate track ─────────────────────────────────────

function estimateEmail(step: number, ctx: NurtureContext): NurtureEmail {
  const isMobile = /mobile/i.test(ctx.projectType || "");
  const dwarka = caseStudy("dwarka-trading");
  switch (step) {
    case 1:
      return {
        subject: "How to read your project estimate",
        body:
          hi(ctx) +
          p("The estimate you got is a range, not a quote, and that's on purpose. Three things decide where in the range a project lands: the features (accounts, payments and admin tools cost more than pages), the integrations (every outside system adds work) and how many kinds of users there are.") +
          p("If you're unsure which end of the range you're at, reply with a few lines about what the project should do and I'll tell you honestly.") +
          sign,
        cta: { label: "Review your options", href: `${SITE}/estimate` },
      };
    case 2:
      return {
        subject: "What to demand in any quote",
        body:
          hi(ctx) +
          p("Whoever you hire, insist on: a fixed price in writing with what's in and out of scope, ownership of the code and accounts from day one, the back end and admin panel included or clearly priced, a list of running costs after launch, and a plan for what happens when something breaks.") +
          p(isMobile ? "We wrote this up for apps specifically, including typical costs." : "Our website cost guide covers the same checklist with real price bands."),
        cta: isMobile
          ? { label: "App cost in India", href: `${SITE}/solutions/mobile-app-development-cost-india` }
          : { label: "Read the cost guide", href: `${SITE}/insights/website-development-cost-guide` },
      };
    case 3:
      return {
        subject: "From a legacy site to a B2B platform",
        body:
          hi(ctx) +
          p("A real project, in short.") +
          (dwarka
            ? p(`<strong>Dwarka General Trading</strong> came to us with this problem: ${escapeHtml(dwarka.caseStudy.challenge)} <strong>What we built:</strong> ${escapeHtml(dwarka.caseStudy.solution)} <strong>The result:</strong> ${escapeHtml(dwarka.caseStudy.results[0].metric)}, ${escapeHtml(dwarka.caseStudy.results[0].description)}.`)
            : "") +
          sign,
        cta: { label: "Read the case study", href: `${SITE}/work/dwarka-trading` },
      };
    case 4:
      return {
        subject: "How a NeoKlyn project runs",
        body:
          hi(ctx) +
          p("What working with us looks like: a fixed written quote within 24 hours, a delivery plan (typically 2-5 weeks), the founder, a senior engineer, building and reviewing every line, and 30 days of free fixes after launch. You own the code, data and accounts.") +
          sign,
        cta: { label: "See how we work", href: `${SITE}/how-we-work` },
      };
    default:
      return {
        subject: "Should I close this out?",
        body:
          hi(ctx) +
          p("This is the last email in this series. If your project is still on, the next step is a 20-minute call where we confirm scope and I send you a fixed written quote the same day.") +
          p(`${link(CAL_URL, "Book a call")} or ${link(whatsappUrl("Hi NeoKlyn, I used the estimator and I'd like to talk about my project"), "message us on WhatsApp")}. If the timing isn't right, no problem, and you won't hear from us again.`) +
          sign,
        cta: { label: "Book a 20-min call", href: CAL_URL },
      };
  }
}

// ─── AI readiness quiz track ────────────────────────────

function aiEmail(step: number, ctx: NurtureContext): NurtureEmail {
  switch (step) {
    case 1:
      return {
        subject: "Three jobs an AI agent can take off your team",
        body:
          hi(ctx) +
          p("Most small-business AI agents do three things well: answer the questions customers ask every day (timings, prices, availability), capture booking requests and enquiries in a form your team can act on, and send follow-up reminders so leads aren't forgotten.") +
          p("It's rarely about replacing people. It's about the repetitive replies that eat their day.") +
          sign,
        cta: { label: "See what it looks like", href: `${SITE}/solutions/ai-agent-for-small-business` },
      };
    case 2:
      return {
        subject: "How we stop an agent saying the wrong thing",
        body:
          hi(ctx) +
          p("The honest worry about AI is that it will say something wrong to a customer. We reduce that risk by limiting the agent to information you approve, adding rules for topics it must refuse, keeping logs you can review, and making handover to a person easy.") +
          p("No AI system is perfect, which is why a human stays in the loop for anything important.") +
          sign,
      };
    case 3:
      return {
        subject: "What running an AI agent really takes",
        body:
          hi(ctx) +
          p("If you want the engineering view: what it takes to run an AI agent in production, the failure modes, and how to catch them before customers do.") +
          sign,
        cta: { label: "Read the article", href: `${SITE}/insights/shipping-production-ai-agents` },
      };
    case 4:
      return {
        subject: "What it costs, and what else you'll pay",
        body:
          hi(ctx) +
          p("AI agent projects start from ₹1 lakh, depending on workflows, integrations and channel, with a fixed written quote. If you want WhatsApp, note that WhatsApp's business platform has its own approval process and messaging charges, paid to Meta or a provider. We explain those before you commit so the running cost is clear.") +
          sign,
        cta: { label: "Get a free estimate", href: `${SITE}/estimate` },
      };
    default:
      return {
        subject: "Should I close this out?",
        body:
          hi(ctx) +
          p("This is the last email in this series. If you'd like to see whether an agent fits your business, a 20-minute call is enough to map the first workflow worth automating, with no obligation.") +
          p(`${link(CAL_URL, "Book a call")} or ${link(whatsappUrl("Hi NeoKlyn, I took the AI readiness audit and I'd like to talk"), "message us on WhatsApp")}. If the timing isn't right, no problem, and you won't hear from us again.`) +
          sign,
        cta: { label: "Book a 20-min call", href: CAL_URL },
      };
  }
}

export function buildNurtureEmail(
  track: Track,
  step: number,
  ctx: NurtureContext,
  unsubscribeUrl: string
): { subject: string; html: string } {
  const email = track === "website" ? websiteEmail(step, ctx) : track === "estimate" ? estimateEmail(step, ctx) : aiEmail(step, ctx);
  const button = email.cta ? `<p style="margin-top:20px;">${linkBtn(email.cta.href, escapeHtml(email.cta.label))}</p>` : "";
  const footer = `<p style="margin-top:24px;font-size:12px;color:#71717a;">You're getting this because you used a tool on neoklyn.com. NeoKlyn, Bengaluru, Karnataka, India. <a href="${unsubscribeUrl}" style="color:#a1a1aa;">Unsubscribe</a>.</p>`;
  return { subject: email.subject, html: shell(email.subject, email.body + button + footer) };
}
