# Paid search test plan (Google Ads)

Status: **plan only.** No ad account, billing or spend has been created. Budget is not yet decided; this plan is written for the ₹300-500/day, one-to-two-week test described in the 30-day plan.

## 1. Goal and what this test can and can't tell you

- **Goal:** find out whether paid search can produce enquiries at an acceptable cost, and which of the buyer-intent pages convert best.
- **Primary metric:** cost per enquiry, where an enquiry is any `generate_lead` event (contact form, estimator, website audit, AI quiz, chat lead).
- **Honest limits:** at ₹300-500 a day you will buy roughly a few dozen clicks a week. That is enough to learn click cost and whether the landing pages hold attention, but **not enough for a statistically sound cost per enquiry**. Judge on: click cost, enquiry count, lead quality (hot or warm, and whether they reply), and the search terms people actually used. Run it for 14 days if you can, not 7.
- **Assumption to check:** typical clicks for these keywords cost somewhere around ₹30-80 in India. That is my estimate, not data. Check Google Keyword Planner before setting the budget.

## 2. Do not start until these are true

1. Phases 1-3 are deployed (the sticky mobile bar, tracking, `/solutions` pages and the www redirect are live).
2. In GA4, `generate_lead` is marked as a **key event** (Admin, Events, toggle "Mark as key event"). Without it nothing is counted as a conversion.
3. GA4 is linked to the Google Ads account and the `generate_lead` key event is imported as a conversion.
4. Auto-tagging is on in Google Ads. The site stores `utm_*` values with every lead; use both.
5. You reply to every enquiry within an hour during the test. Paying for clicks and answering slowly wastes the money.
6. You are comfortable that the site has no cookie-consent banner. For an India-only search test this is workable; do **not** add remarketing or target the UK/EU before adding one.

## 3. Audience and targeting

- **Who:** owners and managers of small businesses (clinics, traders, manufacturers, brands) who need a website, app or automation at a fixed, sensible price.
- **Where:** Karnataka and Tamil Nadu first (Bengaluru, Chennai, Madurai, Coimbatore), because the local-page proof and the Madurai case study are strongest there. Use "people in or regularly in" the location, and exclude the rest of the world.
- **Devices:** all. Most clicks will be mobile, which is what the landing pages are built for.
- **Network:** Search only. Turn off Search Partners and Display expansion for the test.

## 3b. Campaign structure

One campaign per goal, so budget goes where it works. Start with **two** ad groups; four would split the budget too thin.

### Ad group A. Local website developer (Bengaluru, Madurai)
- **Landing page:** https://neoklyn.com/solutions/website-development-bengaluru (use /solutions/website-development-madurai for the Madurai ad group)
- **Keywords (phrase match):** "website developer bangalore", "website development company bangalore", "web design company bangalore", "website design madurai", "website developer madurai"
- **Final URL tracking:** `?utm_source=google&utm_medium=cpc&utm_campaign=websites-local&utm_content=bengaluru&utm_term={keyword}`

**Responsive search ad headlines** (max 30 characters; length in brackets)
- Website Developer Bengaluru (27)
- Websites From ₹50,000 (21)
- Fixed Price, Live in 2-5 Weeks (30)
- You Own the Code & Accounts (27)
- Free Website Audit in 10 Sec (28)
- Built by a Senior Engineer (26)
- Get a Free Estimate Today (25)

**Descriptions** (max 90 characters)
- Business websites built in 2-5 weeks at a fixed price. Written quote within 24 hours. (85)
- A senior engineer builds and reviews every line. 30 days of free fixes after launch. (84)

### Ad group B. Clinic websites
- **Landing page:** https://neoklyn.com/solutions/website-for-clinics
- **Keywords (phrase match):** "website for clinic", "clinic website design", "doctor website design", "physiotherapy clinic website", "hospital website design india"
- **Final URL tracking:** `?utm_source=google&utm_medium=cpc&utm_campaign=clinic-websites&utm_content=clinic&utm_term={keyword}`

**Responsive search ad headlines** (max 30 characters; length in brackets)
- Website for Your Clinic (23)
- Clinic Websites From ₹50,000 (28)
- Online Appointment Enquiries (28)
- WhatsApp & Tap-to-Call Ready (28)
- See a Madurai Clinic Project (28)
- Free Estimate in 2 Minutes (26)
- Fixed Price, Live in 2-5 Weeks (30)

**Descriptions** (max 90 characters)
- Clinic websites that make it easy to book. Fixed price, live in 2-5 weeks. (74)
- Built for phones. You own the code. Get a written quote within 24 hours. (72)

### Add later (only after the first two show enquiries)
- **C. App cost (add after A and B show clicks converting):** https://neoklyn.com/solutions/mobile-app-development-cost-india. Keywords: "mobile app development cost india", "app development cost in india", "how much does it cost to build an app in india"
- **D. AI agent / WhatsApp automation:** https://neoklyn.com/solutions/ai-agent-for-small-business. Keywords: "whatsapp chatbot for business", "ai chatbot for small business india", "whatsapp automation for clinics"

### Negative keywords (add on day one)
free, jobs, job, career, internship, course, tutorial, training, salary, template, download, github, source code, wordpress theme, "for students", project report, cheap, "rs 5000", "rs 10000", freelancer, fiverr, upwork

(The last few filter shoppers whose budget is far below ₹50,000. Review the search-terms report daily in week one and add what is irrelevant.)

### Ad copy rules
Every claim must stay true to the site today: from ₹50,000, 2-5 weeks, fixed price, you own the code, senior engineer, 30 days of free fixes, written quote within 24 hours. Do not add "best", "#1", rankings or results claims.

## 4. Budget and guardrails

- **Daily budget:** ₹300-500, split 60/40 between groups A and B. Maximum total for the test: **₹7,000** (14 days at ₹500). Set a campaign end date so it cannot run on.
- **Bidding:** manual CPC or "maximise clicks" with a max-CPC cap at the start (for example ₹80). Move to conversion-based bidding only after about 15 conversions.
- **Stop-loss:** pause and rethink if **₹3,000 is spent with no enquiry**, or if search terms are mostly irrelevant after the first week's cleanup.
- **Continue and extend** if enquiries arrive at roughly ₹3,000 or less each *and* at least one is a real conversation. A website project starts at ₹50,000, so one client from the whole test would pay back the spend many times over. Even one hot enquiry is a good signal.

## 5. Measuring it (no extra tools needed)

Leads record their source. Weekly, run this in the database or ask me to build it into the admin:

```sql
select coalesce(metadata->'attribution'->>'utm_campaign','(none)') as campaign,
       count(*) as leads,
       count(*) filter (where segment = 'hot') as hot
from leads
where "createdAt" > now() - interval '14 days'
group by 1 order by 2 desc;
```

Compare leads per campaign with spend in Google Ads. Also read the lead messages: are these the people you want?

## 6. Weekly routine during the test

- Daily (week 1): search-terms report, add negatives, check that enquiries arrive and are answered.
- After 7 days: compare click cost, click-to-enquiry rate per ad group, and hot leads. Pause the weaker group, move its budget to the stronger one.
- After 14 days: decide continue, change, or stop, using the rules in section 4.

## 7. Risks

| Risk | Mitigation |
|---|---|
| Budget burns on irrelevant searches | Phrase match only, negatives on day one, daily search-term review, daily budget cap |
| Clicks but no enquiries | Check the landing page on a phone first; the sticky WhatsApp bar and estimate link are there to catch this; compare with organic conversion |
| Conversions not recorded | Verify `generate_lead` appears in GA4 DebugView after a test submission before spending |
| Slow replies waste leads | Daily lead digest, reply within an hour, WhatsApp first |

## 8. What I can't do for you

Create the Google Ads account, add billing, accept Google's terms, or launch the campaign. Those need you. Once you have the account and an approved budget, I can prepare the keyword and ad sheets for import.

## 9. Referral ask to past clients (no spend)

Cheapest source of leads. Send personally to each of the six clients, one at a time. Only offer a thank-you you will honour.

> Hi [Name], hope [business] is doing well. A quick favour: if you know another business owner who needs a website, app or automation, would you introduce us? If it turns into a project, I'd like to thank you with [offer you are sure you can give]. No pressure at all, and thank you again for trusting us with [business]'s website.
