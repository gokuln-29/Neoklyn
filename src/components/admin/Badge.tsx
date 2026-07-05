interface BadgeProps {
  label: string;
  variant?: "default" | "success" | "warning" | "danger" | "info";
  size?: "sm" | "md";
}

const variantClasses: Record<string, string> = {
  default: "badge-default",
  success: "badge-success",
  warning: "badge-warning",
  danger: "badge-danger",
  info: "badge-info",
};

export default function Badge({ label, variant = "default", size = "sm" }: BadgeProps) {
  return (
    <span className={`admin-badge ${variantClasses[variant]} badge-${size}`}>
      {label}
    </span>
  );
}

export function StatusBadge({ status }: { status: string }) {
  const map: Record<string, { label: string; variant: BadgeProps["variant"] }> = {
    PUBLISHED: { label: "Published", variant: "success" },
    DRAFT: { label: "Draft", variant: "warning" },
    SCHEDULED: { label: "Scheduled", variant: "info" },
    ARCHIVED: { label: "Archived", variant: "default" },
    NEW: { label: "New", variant: "info" },
    CONTACTED: { label: "Contacted", variant: "warning" },
    QUALIFIED: { label: "Qualified", variant: "success" },
    CLOSED: { label: "Closed", variant: "default" },
  };

  const config = map[status] || { label: status, variant: "default" as const };
  return <Badge label={config.label} variant={config.variant} />;
}
