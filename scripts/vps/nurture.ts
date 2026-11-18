/**
 * Sends the next due follow-up email to people who used the website audit,
 * the estimator or the AI readiness quiz (days 2, 4, 7, 10, 14).
 *
 * A lead gets emails only if it opted in when the form showed the notice,
 * has not unsubscribed, and you have not started talking to them: set the
 * lead to CONTACTED in /admin/leads (or reply from the contact form) and the
 * automation stops for that address.
 *
 *   DRY_RUN=1 npx tsx scripts/vps/nurture.ts   # print what would be sent
 *   npx tsx scripts/vps/nurture.ts             # send
 */
// common must load first: it reads .env before db.ts needs DATABASE_URL.
import "./common";
import { runNurture } from "../../src/lib/nurture";
import { db } from "../../src/lib/db";

async function main() {
  const dryRun = process.env.DRY_RUN === "1";
  const result = await runNurture({ dryRun });
  console.log(`${dryRun ? "[dry run] would send" : "Sent"} ${result.sent.length} email(s); considered ${result.considered} lead(s).`);
  for (const s of result.sent) console.log(`  - ${s.email} [${s.track} #${s.step}] ${s.subject}`);
  const skipped = Object.entries(result.skipped);
  if (skipped.length) console.log("Skipped: " + skipped.map(([reason, n]) => `${reason} (${n})`).join(", "));
  await db.$disconnect();
  // rateLimit.ts keeps a timer alive; exit explicitly so cron jobs finish.
  process.exit(0);
}

main().catch((err) => {
  console.error(err);
  process.exit(1);
});
