# VPS Automation Guide: daily drafts, lead digest, outreach drafts

Everything runs **on your Hostinger VPS**, next to the website, so there is no network block.
Nothing is published or sent without you:

| Job | What it does | You do |
|---|---|---|
| `auto:blog` | Writes 1 SEO article, saves it as a **DRAFT**, and writes LinkedIn + X copy to `.automation/social/` | Read it, fix anything wrong, click Publish in `/admin/posts` |
| `auto:leads` | Emails you new and unanswered leads with a suggested WhatsApp reply | Edit the reply and send it yourself |
| `auto:outreach` | Turns your prospect list into personalised message drafts | Check, edit, and send them by hand |

## 1. One-time setup (on the VPS)

```bash
cd /path/to/neoklyn          # the project folder on the VPS
git pull
npm install
nano .env
```

Add these lines to `.env` (never commit this file, never paste keys in chat):

```
ANTHROPIC_API_KEY=sk-ant-...          # from console.anthropic.com
AUTOMATION_API_KEY=<new random value> # rotate the old one, see below
DIGEST_TO=you@yourmail.com            # optional, defaults to SMTP_USER
```

Rotate the automation key (the old one was visible in an old routine prompt):

```bash
openssl rand -hex 32     # copy the output into AUTOMATION_API_KEY in .env
pm2 restart neoklyn-prod
```

## 2. Test each job once

```bash
DRY_RUN=1 npm run auto:blog   # prints a draft, posts nothing
npm run auto:blog             # creates a real DRAFT, check /admin/posts
npm run auto:leads            # emails the digest (or says no leads)
```

For outreach, copy `scripts/vps/prospects.example.csv` to `.automation/prospects.csv` and add real prospects
(find them on Google Maps, Instagram, LinkedIn; write one specific thing you noticed in `observation`). Then:

```bash
npm run auto:outreach
```

Drafts appear in `.automation/outreach/<date>.md`.

## 3. Schedule it

```bash
crontab -e
```

```
CRON_TZ=Asia/Kolkata
# Blog draft Mon/Wed/Fri 6:00
0 6 * * 1,3,5  cd /path/to/neoklyn && /usr/bin/npm run auto:blog   >> /var/log/neoklyn-auto.log 2>&1
# Lead digest every day 8:00
0 8 * * *      cd /path/to/neoklyn && /usr/bin/npm run auto:leads  >> /var/log/neoklyn-auto.log 2>&1
# Outreach drafts Mon-Fri 8:30
30 8 * * 1-5   cd /path/to/neoklyn && /usr/bin/npm run auto:outreach >> /var/log/neoklyn-auto.log 2>&1
```

Check `which npm` and use that path. Watch the log for the first few days: `tail -f /var/log/neoklyn-auto.log`.

## 4. Notes

- Topics live in `scripts/vps/topics.json`. Each one is used once. Add more any time, especially about Salpe and AI agents when you have real details.
- Each article is checked (length, links, meta description, slug) and retried once. If it still fails, nothing is posted.
- Cost: roughly a few rupees per article. Set a monthly limit in the Anthropic console.
- **Always read the article before publishing.** The prompt forbids invented facts, but you know your business best.
- The old Monday cloud routine can be switched off, because this replaces it.
