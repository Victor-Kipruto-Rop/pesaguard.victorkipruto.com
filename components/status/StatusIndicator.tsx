export function StatusIndicator({ label = "Operational" }: { label?: string }) {
  return <span className="status-dot status-dot-muted" role="img" aria-label={label} />;
}
