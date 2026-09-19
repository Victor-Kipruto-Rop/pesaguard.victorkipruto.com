"use client";

import { Check, TriangleAlert } from "lucide-react";
import { useEffect, useState } from "react";

type Scenario = {
  verdict: "match" | "mismatch" | "idle";
  left: { amount: string; ref: string; time: string; source: string };
  right: { amount: string; ref: string; time: string; source: string };
  checks: { label: string; ok: boolean }[];
  verdictLabel: string;
};

const SCENARIOS: Scenario[] = [
  {
    verdict: "match",
    left: { amount: "KES 5,000", ref: "TXN-8F3A", time: "10:21:28", source: "M-PESA DARAJA" },
    right: { amount: "KES 5,000", ref: "INV-19382", time: "10:21:29", source: "INTERNAL LEDGER" },
    checks: [
      { label: "✓ Amount matched", ok: true },
      { label: "✓ Reference matched", ok: true },
      { label: "✓ Timestamp within tolerance", ok: true },
    ],
    verdictLabel: "Matched · evidence retained",
  },
  {
    verdict: "match",
    left: { amount: "KES 2,500", ref: "TXN-9C12", time: "10:24:03", source: "M-PESA DARAJA" },
    right: { amount: "KES 2,500", ref: "ORD-77531", time: "10:24:05", source: "INTERNAL LEDGER" },
    checks: [
      { label: "✓ Amount matched", ok: true },
      { label: "✓ Reference matched", ok: true },
      { label: "✓ Timestamp within tolerance", ok: true },
    ],
    verdictLabel: "Matched · evidence retained",
  },
  {
    verdict: "mismatch",
    left: { amount: "KES 5,000", ref: "TXN-2B77", time: "10:26:41", source: "M-PESA DARAJA" },
    right: { amount: "KES 4,500", ref: "INV-19407", time: "10:26:43", source: "INTERNAL LEDGER" },
    checks: [
      { label: "⚠ Amount mismatch · difference KES 500", ok: false },
      { label: "✓ Reference matched", ok: true },
      { label: "✓ Timestamp within tolerance", ok: true },
    ],
    verdictLabel: "Exception raised for review",
  },
];

/**
 * Reconciliation demo.
 *
 * Cycles through two matched scenarios and one amount mismatch so the page
 * shows what the engine actually decides on. Static first frame under
 * prefers-reduced-motion.
 */
export function ReconciliationDemo() {
  const [index, setIndex] = useState(0);

  useEffect(() => {
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    const timer = window.setInterval(() => {
      setIndex((prev) => (prev + 1) % SCENARIOS.length);
    }, 4200);
    return () => window.clearInterval(timer);
  }, []);

  const scenario = SCENARIOS[index];
  const mid = scenario.verdict === "mismatch" ? "≠" : scenario.verdict === "match" ? "=" : "…";

  return (
    <div className="pg-recon" data-scenario={scenario.verdict} key={index}>
      <div className="pg-recon-row">
        <div className="pg-txn">
          <small>{scenario.left.source}</small>
          <strong className="pg-num">{scenario.left.amount}</strong>
          <span>
            {scenario.left.ref} · {scenario.left.time}
          </span>
        </div>
        <div className="pg-recon-mid" data-verdict={scenario.verdict} aria-hidden="true">
          {mid}
        </div>
        <div className="pg-txn">
          <small>{scenario.right.source}</small>
          <strong className="pg-num">{scenario.right.amount}</strong>
          <span>
            {scenario.right.ref} · {scenario.right.time}
          </span>
        </div>
      </div>
      <div className="pg-recon-checks">
        {scenario.checks.map((check) => (
          <span data-bad={check.ok ? "false" : "true"} key={check.label}>
            {check.ok ? <Check aria-hidden="true" size={13} /> : <TriangleAlert aria-hidden="true" size={13} />}
            {check.label}
          </span>
        ))}
      </div>
      <div className="pg-verdict">
        <span>Outcome</span>
        <b data-verdict={scenario.verdict}>{scenario.verdictLabel}</b>
      </div>
    </div>
  );
}
