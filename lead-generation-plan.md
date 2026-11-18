# NeoKlyn Lead Generation Plan (website + skills/plugins)

Written 18 Nov 2026 from a review of the code in this repo and the live site. It builds on `30-day-lead-plan.md` (3 Oct), which covers outreach and social. This plan covers **what to change on the site and in the systems around it**, in order of lead impact.

Nothing here has been implemented yet. Approve the order, and I start at Phase 0.

---

## 1. What I found

**Already done since the 3 Oct plan (don't redo):** INR budget ranges and the friendlier "Tell us what you need" heading on /contact; price and use-case sections on the mobile and AI agent pages; the native-vs-cross-platform article is live; an AI readiness quiz at /audit; chat widget with lead capture; GTM + GA4 + Clarity installed; VPS scripts for blog drafts, lead digests and outreach drafts.

**Problems that cost leads right now**

| # | Finding | Evidence | Impact |
|---|---|---|---|
| 1 | The working tree is far ahead of what is live: 59 modified files, 1,212 lines added and 1,926 removed, none committed. | `git diff --stat` | Fixes can't reach visitors until they are reviewed and deployed. |
| 2 | **/audit has no inbound links.** Nothing on the home page, nav, footer or service pages points to it. Only the sitemap does. | `/audit` count is 0 on every live page except /audit itself; no `href="/audit"` in `src` | The best lead magnet gets almost no traffic. |
| 3 | **The audit is the wrong magnet for the website buyer.** /audit is an *AI automation readiness* quiz. The 30-day plan and outreach scripts promise a "free 5-point website audit". | `src/app/audit/page.tsx`, the outreach scripts | Website buyers (your largest segment) have no lead magnet that matches the promise. |
| 4 | Two cost articles are live in the sitemap on the same topic: `website-development-cost-guide` and `website-development-cost-in-2026-a-real-pricing-breakdown`. | live sitemap.xml | They compete for the same query. Merge them and redirect one. |
| 5 | Only one primary CTA in the nav ("Start Project" to /contact). No WhatsApp or estimate in the nav, and no sticky mobile CTA. | `Navbar.tsx` | Most Indian small-business traffic is mobile and WhatsApp-first. |
| 6 | Articles end with the global CTA and related posts but no CTA matched to the article topic. | `insights/[slug]/page.tsx` | Readers of a cost article should land on /estimate; readers of an AI article on the audit. |
| 7 | Tracking is partial. Events exist for the CTA section, chat, estimate and audit. WhatsApp clicks from the nav, contact page, footer and service pages are not tracked. The contact form event is named `contact_form_submit` with `form_name: contact_enterprise`. No UTM or referrer saved with leads. | grep of `trackEvent(` | You can't tell which channel produces leads. |
| 8 | GA4 is loaded twice: through GTM and again through a direct gtag snippet. Whether GTM forwards the custom events to GA4 as conversions can't be seen from code. | `layout.tsx` | Possible double-counted pageviews, and conversions may not be set up. |
| 9 | Service page titles aim at developers ("Next.js Web Development Agency India") while the buyer you want searches for outcomes and prices ("website for clinic", "website cost"). | live `<title>` tags | Wrong keywords for the target buyer. |
| 10 | Every static page in the sitemap has `lastModified: now`. | `sitemap.ts` | Google learns to ignore the date signal. |
| 11 | Google Business Profile draft is written for "global brands" and "enterprise modernization", while the best buyer is the small-business owner. | `google-business-profile-guide.md` | Mismatched positioning on the profile that shows on Maps. |
| 12 | Services, Case Studies and Testimonials CMS exist but aren't wired to the public pages (known from earlier). Case-study numbers have no source line. | project memory, `work/projects.ts` | Proof is hard-coded and can't be updated without a deploy. |

**Could not verify (needs you):** Search Console and GA4 data (queries, clicks, conversion setup), GTM tag configuration, and PageSpeed scores (Google's API quota was exhausted; I'll measure locally in Phase 1). Anything about traffic volume in this plan is therefore an assumption to check in week 1.

---

## 2. The plan

### Phase 0: Ship what's already built (Day 1)
1. Review the 59-file diff, run `npm run build` and lint, and check nothing still imports the deleted files (`JsonLd.tsx`, `leadWebhooks.ts`, `markdown.ts`, `data/blogs/*`, `api/pipeline/posts`).
2. Commit in logical chunks, then deploy to the VPS following `deployment_guide.md`. The CMS is live and stable, so deploy off-hours and keep a rollback.
3. Move the loose working files (`log.txt`, `page_head*.txt`, `lint*.json`, `restore_markets.js`, `scratch/`) out of the repo root or into `.gitignore`.

### Phase 1: Fix the funnel (Days 2-5, highest impact)
1. **Link the magnets everywhere.** Nav: "Free Estimate" and "Free Audit"; home hero secondary CTA; each service page; footer; end of every article.
2. **Mobile sticky bar** with WhatsApp + Free Estimate (skill: `mobile-native`, plus `emil-design-eng` for the details).
3. **Topic-matched article CTA block.** Web/cost articles go to /estimate, AI articles to /audit, mobile articles to /estimate. WhatsApp link with a prefilled message naming the article.
4. **Build a real Website Audit** (new `/website-audit`): visitor enters URL + email; the page returns a short report (mobile speed, SEO basics, mobile layout, CTA/contact visibility, security headers) and the lead is saved. This matches the offer your outreach already makes and gives you a personalised hook for cold messages. Keep the existing /audit as the AI readiness quiz and rename it clearly.
5. **Tracking that answers "what works".**
   - Add events: `whatsapp_click` (all locations, with `location` param), `estimate_start`, `audit_start`, `phone_click`, `article_cta_click`.
   - Save `utm_*`, referrer and landing page with every lead (in `Lead.metadata`).
   - Remove the duplicate GA4 snippet (keep GTM only, or gtag only), and mark `contact_form_submit`, `estimate_complete`, `audit_quiz_complete`, `chat_lead_captured`, `whatsapp_click` as GA4 key events.
6. **Instant lead response.** Auto-reply email to every lead with the next step and booking link; notify you on WhatsApp/email immediately with a one-line suggested reply (extend the existing `auto:leads` digest). Goal: first reply under 1 hour. This is the cheapest way to raise close rate.
7. **Lead scoring in admin**: tag leads hot/warm/cold from budget, service, source; add a "status" and "next step" so the admin works as the lead sheet from the 30-day plan.
8. **Speed check** with Lighthouse locally on home, /contact, one service page and one article; fix anything under 90 on mobile. The contact page is 1,536 lines in one file and home is ~170 KB of HTML, so these are the first suspects (skills: `animation-performance`, `web-design-guidelines`).

### Phase 2: Proof and trust (Days 6-10)
1. Wire the CMS Case Studies and Testimonials to /work and the home page; add a "how measured" line to each result.
2. Ask the six past clients for a Google review and a 2-line testimonial (templates are in `client-communication-guide.md`); add real reviews to the site, and `aggregateRating` schema **only** once real reviews exist.
3. Add a "Who we work with" strip by buyer type (clinics, builders, traders, D2C, startups), linking to the relevant case study.
4. Fix the Google Business Profile description and categories for small-business buyers; add 3-5 photos a month.
5. Optional (decision below): a deposit link for the fixed-price starter package via Stripe or Razorpay, so a "yes" can become a paid booking without a call.

### Phase 3: Search traffic (Days 6-30, continuing)
1. Run the SEO audit skills on the live site and repo: `seo-audit`, `technical-seo-code-audit`, then `seo-fix-plan` to turn findings into tickets. Expected fixes: duplicate cost article, real `lastModified` dates, retitled service pages, canonical and internal-link gaps.
2. **Buyer-intent pages (about 6-8, each genuinely different, not city-swapped copies):** "Website for clinics", "Website for builders / real estate", "AI WhatsApp agent for clinics", "Mobile app cost in India", "Website development in Bengaluru", "Website development in Madurai". Each carries a matching case study, price band, FAQ and CTA.
3. **Content engine:** keep the VPS draft routine, 1-2 posts a week, always delivered with focus keyword, internal and external links and meta length in the first pass. Cluster topics around cost, "which platform", India small-business automation, and mobile app cost.
4. Directories and backlinks: Clutch, GoodFirms, Sulekha, JustDial, Startup India; 2 guest posts or community talks.
5. After Search Console is connected, run `search-console-data-review` to find queries ranking 8-20 and improve those pages first.

### Phase 4: Outbound, email and paid (Days 10-30)
1. Outbound stays as in the 30-day plan, but each message now carries a **website audit link for that prospect**, which is a much stronger opener than a generic offer. The `auto:outreach` script drafts; you send.
2. **Email nurture** (skill: `marketing:email-sequence`): 5 emails over 14 days for audit and estimate leads (result recap, a case study, a cost guide, FAQs, a booking nudge). Needs a sending tool: the existing SMTP is fine for low volume; Klaviyo or HubSpot if you want automation.
3. **Paid test** only after Phase 1 is live and tracking is verified: Google Search at ₹300-500/day for 7 days on 5-8 high-intent keywords, landing on the matching buyer page. Stop and review after ₹2,000-3,000 without enquiries. Retargeting visitors who start but don't finish the estimate comes after.
4. Referral offer to past clients (already in the 30-day plan).

### Phase 5: Measure and iterate (weekly)
- A weekly admin dashboard from the `Lead` table: leads by source, service, budget and status; funnel from visit to enquiry to call to proposal to client (skills: `data:build-dashboard`, `data:analyze`, `marketing:performance-report`).
- Saturday review as in the 30-day plan. Keep the top two channels, drop the bottom two.

---

## 3. Targets (to measure against, not promises)

| Metric | Baseline | 30-day target |
|---|---|---|
| Visitor-to-enquiry rate (form + WhatsApp + chat + estimate + audit) | unknown until tracking is fixed | 2-3% |
| Enquiries from the site | unknown | 15+ |
| First reply time | unknown | under 1 hour |
| Enquiry to call | unknown | 40%+ |
| Google reviews | check | 5+ |
| Pages ranking in top 20 for a buyer-intent query | check in Search Console | 5+ by day 60 |

---

## 4. Skills and plugins I'll use

| Work | Skill / plugin |
|---|---|
| SEO audit, code audit, ticket list | `seo-audit`, `technical-seo-code-audit`, `seo-page-audit`, `seo-fix-plan`, `search-console-data-review` |
| Page design, CTAs, hero, sticky bar | `impeccable`, `design-taste-frontend`, `frontend-design`, `ui-ux-pro-max`, `emil-design-eng` |
| Mobile feel and performance | `mobile-native`, `animation-performance`, `web-design-guidelines`, `break-ui` |
| Copy, articles, campaigns, email | `marketing:content-creation`, `draft-content`, `campaign-plan`, `email-sequence`, `competitive-brief`, `brand-review` |
| Lead data and reporting | `data:analyze`, `data:build-dashboard`, `marketing:performance-report` |
| Payments (optional) | `stripe:stripe-best-practices` |
| Verification | Browser and Playwright tools to test every flow on desktop and mobile widths |

**Plugins that need your sign-in through `/mcp` before I can use them:** Ahrefs (keywords, backlinks), Similarweb (competitor traffic), HubSpot or Klaviyo (CRM and email), Supermetrics (ad and analytics data), Slack, Notion, Canva (social graphics). The plan works without them; Ahrefs and a connected Search Console would sharpen Phase 3 the most.

---

## 5. Decisions I need from you

1. **Main buyer:** small businesses in India (what the site mostly says now), or also international clients? This sets the keywords, pricing display and the buyer pages.
2. **Website Audit tool:** build it (about 1-2 days, recommended), or keep one audit and rewrite the outreach to match?
3. **Paid ads:** budget yes/no, and how much.
4. **Deploy:** are you happy for me to prepare the commits, with you running the VPS deploy?
5. **Payments:** do you want a deposit link for the starter package, and with Stripe or Razorpay?

## 6. Do not do
- Don't publish case-study numbers, reviews or client names that can't be backed up.
- Don't create near-identical city pages; Google treats them as thin content.
- Don't spend on ads before tracking and the funnel fixes in Phase 1 are verified.
- Don't auto-send outreach or auto-publish posts; keep a human review step, as the VPS scripts already do.
