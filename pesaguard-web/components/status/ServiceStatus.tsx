export function ServiceStatus({ live = false }: { live?: boolean }) {
  return (
    <div className="status-card">
      <span aria-hidden="true" className={live ? "status-dot status-dot-pulse" : "status-dot status-dot-muted"} />
      <div>
        <strong>{live ? "All systems operational" : "No live health signal"}</strong>
        <p>Core API · M-Pesa reconciliation · Outbound webhooks</p>
      </div>
      <span className="status-label">{live ? "Operational" : "Unknown"}</span>
    </div>
  );
}
