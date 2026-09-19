"use client";

import { useState } from "react";
import { LiveFeed } from "@/components/home/LiveFeed";
import { ReconciliationDemo } from "@/components/home/ReconciliationDemo";

const SIGNALS = [
  { label: "Amount deviation", detail: "KES 45,000 · typical range KES 2,000–8,000", hot: true },
  { label: "Velocity spike", detail: "14 transactions from one account in 6 minutes", hot: true },
  { label: "Duplicate reference", detail: "REF-9918 seen 3× in the last hour", hot: true },
  { label: "Unusual timing", detail: "First activity outside business hours", hot: false },
  { label: "Repeated failures", detail: "5 failed validations, same endpoint", hot: false },
  { label: "Unexpected channel", detail: "PayBill instead of usual till flow", hot: false },
];

const VIEWS = [
  { id: "transactions", label: "Transactions" },
  { id: "reconciliation", label: "Reconciliation" },
  { id: "anomalies", label: "Anomalies" },
  { id: "reports", label: "Reports" },
] as const;

type ViewId = (typeof VIEWS)[number]["id"];

/**
 * Miniature product experience.
 *
 * Switches between four product views on the same dark surface, so a visitor
 * feels the shape of the operations console without a fabricated screenshot.
 */
export function DemoSwitcher() {
  const [view, setView] = useState<ViewId>("transactions");

  return (
    <div>
      <div className="pg-tabs" role="tablist" aria-label="Product preview">
        {VIEWS.map((item) => (
          <button
            aria-controls={`demo-${item.id}`}
            aria-selected={view === item.id}
            className="pg-tab"
            id={`demo-tab-${item.id}`}
            key={item.id}
            onClick={() => setView(item.id)}
            role="tab"
            type="button"
          >
            {item.label}
          </button>
        ))}
      </div>

      <div className="pg-demo-views">
        {view === "transactions" ? (
          <div aria-labelledby="demo-tab-transactions" id="demo-transactions" role="tabpanel">
            <LiveFeed />
          </div>
        ) : null}

        {view === "reconciliation" ? (
          <div aria-labelledby="demo-tab-reconciliation" id="demo-reconciliation" role="tabpanel" style={{ padding: "clamp(18px, 2.6vw, 28px)" }}>
            <ReconciliationDemo />
          </div>
        ) : null}

        {view === "anomalies" ? (
          <div aria-labelledby="demo-tab-anomalies" id="demo-anomalies" role="tabpanel" style={{ padding: "clamp(18px, 2.6vw, 28px)" }}>
            <div className="pg-risk" style={{ border: "1px solid var(--pg-line-strong)" }}>
              <div className="pg-signals">
                {SIGNALS.map((signal) => (
                  <div className="pg-signal" data-hot={signal.hot ? "true" : "false"} key={signal.label}>
                    <span aria-hidden="true">{signal.hot ? "▲" : "△"}</span>
                    <span>
                      {signal.label}
                      <br />
                      <small style={{ color: "var(--pg-text-3)", fontSize: 11.5 }}>{signal.detail}</small>
                    </span>
                    <em>{signal.hot ? "Review" : "Watch"}</em>
                  </div>
                ))}
              </div>
              <div className="pg-score">
                <small>Risk score · signal, not verdict</small>
                <div className="pg-score-row">
                  <strong className="pg-num">
                    82<span> / 100</span>
                  </strong>
                  <span className="pg-verdict-chip">High risk</span>
                </div>
                <div className="pg-score-bar" aria-hidden="true">
                  <i />
                </div>
              </div>
            </div>
          </div>
        ) : null}

        {view === "reports" ? (
          <div aria-labelledby="demo-tab-reports" id="demo-reports" role="tabpanel" style={{ padding: "clamp(18px, 2.6vw, 28px)" }}>
            <div className="pg-proof" style={{ border: "1px solid var(--pg-line-strong)" }}>
              <div className="pg-proof-cell">
                <b className="pg-num">98.67<span>%</span></b>
                <small>Match rate · period</small>
              </div>
              <div className="pg-proof-cell">
                <b className="pg-num">1,234</b>
                <small>Unmatched · queued</small>
              </div>
              <div className="pg-proof-cell">
                <b className="pg-num">7</b>
                <small>Anomalies · open</small>
              </div>
              <div className="pg-proof-cell">
                <b className="pg-num">100<span>%</span></b>
                <small>Decisions audited</small>
              </div>
            </div>
            <p className="pg-proof-note">
              Report figures are illustrative. Live values come from your own reconciled data inside the dashboard.
            </p>
          </div>
        ) : null}
      </div>
    </div>
  );
}
