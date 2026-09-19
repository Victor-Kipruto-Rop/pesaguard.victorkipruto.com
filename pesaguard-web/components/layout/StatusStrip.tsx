import { ArrowUpRight } from "lucide-react";
import { getBackendHealth } from "@/lib/api/client";

/**
 * Infrastructure status strip.
 *
 * Sits above the site header like an operational banner, not a marketing bar.
 * The wording is honest: "All systems operational" appears only when the API
 * health endpoint actually answered. When there is no live signal the strip
 * says so, in the same terms as the status page.
 */
export async function StatusStrip() {
  const probe = await getBackendHealth();
  const operational = probe.reachable;

  return (
    <div className="pg-strip">
      <div className="pg-strip-inner">
        <span
          aria-hidden="true"
          className="pg-strip-dot"
          data-state={operational ? "operational" : "unknown"}
        />
        <strong>{operational ? "All systems operational" : "Status: monitoring"}</strong>
        <span className="pg-strip-middle">Real-time reconciliation infrastructure</span>
        <a className="pg-strip-link" href="https://status.pesaguard.victorkipruto.com" rel="noreferrer" target="_blank">
          View status
          <ArrowUpRight aria-hidden="true" size={12} />
        </a>
      </div>
    </div>
  );
}
