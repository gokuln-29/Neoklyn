interface StatCardProps {
  label: string;
  value: string | number;
  icon: string;
  change?: string;
  changeType?: "positive" | "negative" | "neutral";
  color?: string;
}

export default function StatCard({
  label,
  value,
  icon,
  change,
  changeType = "neutral",
  color = "var(--cyan)",
}: StatCardProps) {
  return (
    <div className="stat-card" style={{ "--stat-accent": color } as React.CSSProperties}>
      <div className="stat-card-header">
        <span className="stat-card-icon">{icon}</span>
        {change && (
          <span className={`stat-card-change ${changeType}`}>{change}</span>
        )}
      </div>
      <div className="stat-card-value">{value}</div>
      <div className="stat-card-label">{label}</div>
    </div>
  );
}
