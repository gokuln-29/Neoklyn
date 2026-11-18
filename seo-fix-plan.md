# SEO fix plan (Phase 3), 18 Nov 2026

Goal: stop losing indexed pages on deploy, give the site one canonical host, and add pages that match what small-business buyers search for. 2 critical, 3 quick wins, 1 planned (done in code, needs live verification).

## Critical

**T-1. Removed or duplicate posts would return 404 after deploy**
- Where: `src/data/removedInsights.ts`, `next.config.ts` (`redirects`), `src/app/sitemap.ts`.
- What: six indexed `/insights/...` URLs (the duplicate "website-development-cost-in-2026..." post created in the CMS, plus legacy posts removed from the code) now 308-redirect to the closest live page and are excluded from the sitemap.
- Who: developer (done), owner for the CMS step below.
- Owner step: in `/admin/posts`, archive the duplicate cost post so it isn't republished.
- Verify after deploy: `curl -sI https://neoklyn.com/insights/website-development-cost-in-2026-a-real-pricing-breakdown` returns 308 to `/insights/website-development-cost-guide`; same check for the other five; none appear in `sitemap.xml`.
- Note: Google may keep the old and new URL in one duplicate cluster for up to two weeks; don't judge the fix sooner.

**T-2. `https://www.neoklyn.com` serves a full 200 page**
- Where: `next.config.ts` (host-based redirect to the apex domain).
- Verify after deploy: `curl -sI https://www.neoklyn.com/services` returns 308 to `https://neoklyn.com/services`.
- If it still returns 200, nginx is rewriting the Host header before Next sees it. Fix in nginx instead:
  ```
  server { listen 443 ssl; server_name www.neoklyn.com; # same ssl lines as the main block
    return 301 https://neoklyn.com$request_uri; }
  ```
- Also check `http://www.neoklyn.com` goes straight to `https://neoklyn.com` (today it goes http-www, then https-www: two hops).

## Quick wins

**T-3. Sitemap dates.** Static pages no longer claim `lastModified: now`; only articles carry a date. Verify: `sitemap.xml` has `<lastmod>` only on `/insights/...` entries.

**T-4. Service page titles and descriptions** now state price and outcome, not stack. Web, mobile and AI agents changed; unverifiable claims ("Built with LangChain & GPT") removed. Verify: view-source titles on `/services/web`, `/services/mobile`, `/services/ai-agents`.

**T-5. Internal links.** Footer "solutions" row, links from each service page, and "similar projects" links on case studies point to the new pages. Verify: each `/solutions/...` page has at least 3 inbound links.

## Planned

**T-6. Nine buyer-intent pages under `/solutions`** plus a hub page, in `src/data/solutions.ts`. Content uses only prices, timelines and terms already published on the site and the confirmed case studies.
- Owner review before publishing (facts only you can confirm): Tamil bilingual sites are possible; a booking calendar can be connected (Cal.com); store submission support; conversation logs and guardrails on AI agents; "we don't recommend collecting medical details in forms".
- Verify after deploy: submit `/sitemap.xml` in Search Console, then request indexing for the hub and 2-3 pages. Check each page's canonical is itself and none is flagged "duplicate, Google chose different canonical".

## After deploy, in Search Console
1. Resubmit `sitemap.xml`.
2. Inspect the six redirected URLs and confirm "Page with redirect".
3. After 2-4 weeks, run the Search Console data review on queries that now show impressions for the new pages.

## Not worth doing yet
- Adding more location pages. Two exist because each has a real local project or base; more would be thin.
- Review/rating structured data, until real, linkable reviews exist.
