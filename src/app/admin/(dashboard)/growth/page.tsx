import Link from "next/link";
import { db } from "@/lib/db";
import StatCard from "@/components/admin/StatCard";
import { changeText, computeLeadMetrics, metricsQueryStart, type Count } from "@/lib/leadMetrics";

// Always render fresh numbers.
export const dynamic = "force-dynamic";

const RANGES = [7, 30, 90] as const;

function BarList({ title, items, empty, note }: { title: string; items: Count[]; empty: string; note?: string }) {
  const max = Math.max(1, ...items.map((i) => i.count));
  const total = items.reduce((s, i) => s + i.count, 0);
  return (
    <section className="gr-card">
      <h2 className="gr-h">{title}</h2>
      {items.length === 0 ? (
        <p className="gr-empty">{empty}</p>
      ) : (
        <ul className="gr-bars">
          {items.map((item) => (
            <li key={item.label} title={`${item.label}: ${item.count} (${Math.round((item.count / total) * 100)}%)`}>
              <span className="gr-bar-label">{item.label}</span>
              <span className="gr-bar-track" aria-hidden="true">
                <span className="gr-bar-fill" style={{ width: `${Math.max(2, (item.count / max) * 100)}%` }} />
              </span>
              <span className="gr-bar-value">{item.count}</span>
            </li>
          ))}
        </ul>
      )}
      {note && <p className="gr-note">{note}</p>}
    </section>
  );
}

export default async function GrowthPage({ searchParams }: { searchParams: Promise<{ days?: string }> }) {
  const { days: daysParam } = await searchParams;
  const parsed = Number(daysParam);
  const days = (RANGES as readonly number[]).includes(parsed) ? parsed : 30;
  const now = new Date();

  const [leads, waiting] = await Promise.all([
    db.lead.findMany({
      where: { createdAt: { gte: metricsQueryStart(days, now) } },
      select: { type: true, source: true, status: true, segment: true, sequenceStage: true, createdAt: true, metadata: true },
      orderBy: { createdAt: "asc" },
      take: 5000,
    }),
    db.lead.count({
      where: {
        status: "NEW",
        createdAt: { lt: new Date(now.getTime() - 24 * 60 * 60 * 1000), gte: new Date(now.getTime() - 30 * 24 * 60 * 60 * 1000) },
      },
    }),
  ]);

  const m = computeLeadMetrics(leads, days, now);
  const change = changeText(m.total, m.previousTotal);
  const maxDaily = Math.max(1, ...m.daily.map((d) => d.count));
  const handledPct = m.total ? Math.round((m.handled / m.total) * 100) : 0;
  const showEvery = m.daily.length > 45 ? 10 : m.daily.length > 14 ? 5 : 1;

  return (
    <div>
      <div className="admin-page-header">
        <div>
          <h1 className="admin-page-title">Growth</h1>
          <p className="admin-page-subtitle">Where enquiries come from, and what happens to them. Dates are in India time.</p>
        </div>
        <nav className="gr-ranges" aria-label="Date range">
          {RANGES.map((r) => (
            <Link key={r} href={`/admin/growth?days=${r}`} className={r === days ? "active" : ""} aria-current={r === days ? "page" : undefined}>
              {r} days
            </Link>
          ))}
        </nav>
      </div>

      <div className="stat-cards-grid gr-stats">
        <StatCard
          label={`Leads, last ${days} days`}
          value={m.total}
          icon="📬"
          color="var(--admin-accent)"
          change={change ? (change === "new" ? "no earlier data" : `${change} vs previous ${days}`) : undefined}
          changeType={change && change !== "new" && change.startsWith("-") ? "negative" : "positive"}
        />
        <StatCard label="Hot leads" value={m.hot} icon="🔥" color="var(--admin-red)" />
        <StatCard label="Waiting for a reply, 24h or more" value={waiting} icon="⏳" color="var(--admin-yellow)" />
        <StatCard label="Handled (status past New)" value={m.total ? `${handledPct}%` : "–"} icon="✅" color="var(--admin-green)" />
        <StatCard label="Booked or closed" value={m.booked} icon="🤝" color="var(--admin-violet)" />
      </div>

      {waiting > 0 && (
        <p className="gr-alert" role="status">
          {waiting} lead{waiting === 1 ? " has" : "s have"} been waiting more than 24 hours for a first reply. <Link href="/admin/leads?status=NEW">Open them</Link>
        </p>
      )}

      <section className="gr-card gr-wide">
        <h2 className="gr-h">Leads per day</h2>
        {m.total === 0 ? (
          <p className="gr-empty">No leads in this period yet.</p>
        ) : (
          <>
            <div className="gr-daily" role="img" aria-label={`Bar chart of leads per day for the last ${days} days. Total ${m.total}. A table with the same data follows.`}>
              {m.daily.map((d, i) => (
                <div key={d.date} className="gr-day" data-tip={`${d.label}: ${d.count} lead${d.count === 1 ? "" : "s"}`}>
                  <span className="gr-day-count">{d.count > 0 && m.daily.length <= 14 ? d.count : ""}</span>
                  <span className="gr-day-bar" style={{ height: `${d.count === 0 ? 0 : Math.max(4, (d.count / maxDaily) * 100)}%` }} />
                  <span className="gr-day-label">{i % showEvery === 0 || i === m.daily.length - 1 ? d.label : ""}</span>
                </div>
              ))}
            </div>
            <details className="gr-table">
              <summary>View as table</summary>
              <table className="admin-table">
                <thead>
                  <tr>
                    <th>Date</th>
                    <th>Leads</th>
                  </tr>
                </thead>
                <tbody>
                  {[...m.daily].reverse().map((d) => (
                    <tr key={d.date}>
                      <td>{d.date}</td>
                      <td>{d.count}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </details>
          </>
        )}
      </section>

      <div className="gr-grid">
        <BarList title="Where leads came from" items={m.byChannel} empty="No leads in this period." note={`Based on UTM tags and the referring site. ${Math.round(m.trackedShare * 100)}% of these leads carry tracking data; older leads show as "Not tracked".`} />
        <BarList title="Which tool they used" items={m.bySource} empty="No leads in this period." />
        <BarList title="Ad campaigns" items={m.byCampaign} empty="No leads with a utm_campaign yet. Tag ad links with utm_source, utm_medium=cpc and utm_campaign." />
        <BarList title="Landing pages (first page visited)" items={m.byLanding} empty="No landing-page data yet." />
        <BarList title="What happened to them" items={m.funnel} empty="No leads in this period." note="Update a lead's status in Leads so this stays accurate. It also stops the follow-up email series." />
        <BarList title="Lead quality" items={m.bySegment} empty="No leads in this period." note="Hot: larger budget or a weak website audit score. Unscored: no rating at capture." />
      </div>

      <div className="gr-grid">
        <section className="gr-card">
          <h2 className="gr-h">Website audit</h2>
          {m.audit.runs === 0 ? (
            <p className="gr-empty">No audits run in this period.</p>
          ) : (
            <dl className="gr-dl">
              <div><dt>Audits run</dt><dd>{m.audit.runs}</dd></div>
              <div><dt>Average score</dt><dd>{m.audit.averageScore ?? "–"}</dd></div>
              <div><dt>Scored under 60 (strong sales opening)</dt><dd>{m.audit.below60}</dd></div>
            </dl>
          )}
        </section>
        <section className="gr-card">
          <h2 className="gr-h">Follow-up emails</h2>
          {m.nurture.optedIn === 0 ? (
            <p className="gr-empty">No leads have opted in to the follow-up series yet.</p>
          ) : (
            <dl className="gr-dl">
              <div><dt>Leads in the series</dt><dd>{m.nurture.optedIn}</dd></div>
              <div><dt>Emails sent so far</dt><dd>{m.nurture.emailsSent}</dd></div>
              <div><dt>Unsubscribed</dt><dd>{m.nurture.unsubscribed}</dd></div>
            </dl>
          )}
        </section>
      </div>

      <style>{`
        .gr-stats { grid-template-columns: repeat(auto-fit, minmax(190px, 1fr)); }
        .gr-ranges { display: flex; gap: 0.4rem; }
        .gr-ranges a { padding: 0.45rem 0.9rem; border: 1px solid var(--admin-border-hover); border-radius: var(--admin-radius-sm); color: var(--admin-text-muted); text-decoration: none; font-size: 0.85rem; }
        .gr-ranges a:hover { color: var(--admin-text); }
        .gr-ranges a.active { color: var(--admin-accent); border-color: var(--admin-accent); background: var(--admin-accent-glow); }
        .gr-alert { margin: 1rem 0 0; padding: 0.75rem 1rem; border: 1px solid rgba(245,158,11,0.4); background: rgba(245,158,11,0.08); border-radius: var(--admin-radius-sm); color: var(--admin-text); font-size: 0.9rem; }
        .gr-alert a { color: var(--admin-yellow); }
        .gr-grid { display: grid; grid-template-columns: repeat(auto-fit, minmax(340px, 1fr)); gap: 1rem; margin-top: 1rem; }
        .gr-card { background: var(--admin-surface); border: 1px solid var(--admin-border); border-radius: var(--admin-radius); padding: 1.25rem 1.4rem; }
        .gr-wide { margin-top: 1rem; }
        .gr-h { margin: 0 0 1rem; font-size: 0.95rem; font-weight: 600; color: var(--admin-text); }
        .gr-empty { margin: 0; color: var(--admin-text-muted); font-size: 0.88rem; line-height: 1.6; }
        .gr-note { margin: 1rem 0 0; color: var(--admin-text-muted); font-size: 0.78rem; line-height: 1.6; }
        .gr-bars { list-style: none; margin: 0; padding: 0; display: grid; gap: 0.7rem; }
        .gr-bars li { display: grid; grid-template-columns: minmax(110px, 38%) 1fr 2.2rem; align-items: center; gap: 0.75rem; }
        .gr-bar-label { color: var(--admin-text); font-size: 0.85rem; overflow-wrap: anywhere; }
        .gr-bar-track { height: 8px; border-radius: 4px; background: rgba(255,255,255,0.05); overflow: hidden; display: block; }
        .gr-bar-fill { display: block; height: 100%; border-radius: 0 4px 4px 0; background: var(--admin-accent); }
        .gr-bar-value { color: var(--admin-text); font-size: 0.85rem; text-align: right; font-variant-numeric: tabular-nums; }
        .gr-daily { display: flex; align-items: stretch; gap: 2px; height: 190px; }
        .gr-day { position: relative; flex: 1; min-width: 0; display: flex; flex-direction: column; justify-content: flex-end; align-items: center; }
        .gr-day-bar { display: block; width: 100%; max-width: 28px; border-radius: 4px 4px 0 0; background: var(--admin-accent); min-height: 0; }
        .gr-day-count { font-size: 0.7rem; color: var(--admin-text); height: 1rem; }
        .gr-day-label { height: 1.2rem; font-size: 0.65rem; color: var(--admin-text-muted); white-space: nowrap; margin-top: 0.3rem; }
        .gr-day::before { content: ""; position: absolute; inset: 0; border-radius: 4px; }
        .gr-day:hover::before { background: rgba(255,255,255,0.04); }
        .gr-day::after { content: attr(data-tip); position: absolute; bottom: 100%; left: 50%; transform: translateX(-50%); white-space: nowrap; background: var(--admin-surface-active); color: var(--admin-text); border: 1px solid var(--admin-border-hover); border-radius: 6px; padding: 0.3rem 0.55rem; font-size: 0.75rem; opacity: 0; pointer-events: none; z-index: 5; transition: opacity 0.12s; }
        .gr-day:hover::after, .gr-day:focus-within::after { opacity: 1; }
        .gr-table { margin-top: 1rem; }
        .gr-table summary { cursor: pointer; color: var(--admin-text-muted); font-size: 0.82rem; }
        .gr-table table { margin-top: 0.75rem; max-width: 320px; }
        .gr-dl { margin: 0; display: grid; gap: 0.8rem; }
        .gr-dl > div { display: flex; justify-content: space-between; gap: 1rem; border-bottom: 1px solid var(--admin-border); padding-bottom: 0.6rem; }
        .gr-dl > div:last-child { border-bottom: none; padding-bottom: 0; }
        .gr-dl dt { color: var(--admin-text-muted); font-size: 0.85rem; }
        .gr-dl dd { margin: 0; color: var(--admin-text); font-weight: 600; font-variant-numeric: tabular-nums; }
        @media (max-width: 640px) { .gr-grid { grid-template-columns: 1fr; } .gr-bars li { grid-template-columns: minmax(90px, 40%) 1fr 2rem; } }
      `}</style>
    </div>
  );
}
