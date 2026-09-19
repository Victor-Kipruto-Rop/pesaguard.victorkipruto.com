"use client";

import { useState } from "react";

type UseCase = {
  id: string;
  label: string;
  headline: string;
  rows: { title: string; body: string; tag: string }[];
};

const USE_CASES: UseCase[] = [
  {
    id: "saccos",
    label: "SACCOs",
    headline: "Member contributions, matched to the ledger.",
    rows: [
      { title: "Member deposits", body: "PayBill and STK Push collections reconciled against member records as they land.", tag: "Reconcile" },
      { title: "Loan repayments", body: "Repayment callbacks matched to loan accounts; shortfalls become exceptions.", tag: "Match" },
      { title: "Officer review", body: "Unmatched member payments queue with amount, reference and payer context.", tag: "Resolve" },
    ],
  },
  {
    id: "merchants",
    label: "Merchants",
    headline: "Channel volume with fewer surprises.",
    rows: [
      { title: "STK Push flow", body: "Every push, callback and reversal checked for amount and order reference.", tag: "Validate" },
      { title: "Settlement checks", body: "Daily settlement totals compared against processed transaction sums.", tag: "Reconcile" },
      { title: "Exception queue", body: "Failed, pending and reversed payments in one reviewable queue.", tag: "Resolve" },
    ],
  },
  {
    id: "institutions",
    label: "Financial institutions",
    headline: "Oversight that survives an audit.",
    rows: [
      { title: "Multi-channel view", body: "Transaction flow monitored across channels from one operational surface.", tag: "Monitor" },
      { title: "Controls and evidence", body: "Append-only audit records for every decision and configuration change.", tag: "Audit" },
      { title: "Tenant boundaries", body: "Isolated data per organisation, enforced at the database layer.", tag: "Isolate" },
    ],
  },
  {
    id: "fintechs",
    label: "Fintechs",
    headline: "Infrastructure you can build on.",
    rows: [
      { title: "API-first ingestion", body: "Transact and query through documented endpoints with stable error shapes.", tag: "API" },
      { title: "Signed webhooks", body: "Delivery attempts, retries and dead-letter handling you can observe.", tag: "Webhooks" },
      { title: "Fraud visibility", body: "Rule-based and statistical anomaly checks without a data team.", tag: "Signals" },
    ],
  },
];

/**
 * Use case tabs.
 *
 * Buttons switch the workflow rows between audiences. Only the selected
 * panel's rows are rendered, and the tablist/tab/tabpanel roles plus
 * `aria-selected` keep the relationship explicit for screen readers.
 */
export function UseCaseTabs() {
  const [activeId, setActiveId] = useState(USE_CASES[0].id);
  const active = USE_CASES.find((useCase) => useCase.id === activeId) ?? USE_CASES[0];

  return (
    <div>
      <div className="pg-tabs" role="tablist" aria-label="Use cases">
        {USE_CASES.map((useCase) => (
          <button
            aria-controls={`usecase-${useCase.id}`}
            aria-selected={useCase.id === activeId}
            className="pg-tab"
            id={`tab-${useCase.id}`}
            key={useCase.id}
            onClick={() => setActiveId(useCase.id)}
            role="tab"
            type="button"
          >
            {useCase.label}
          </button>
        ))}
      </div>
      <div
        aria-labelledby={`tab-${active.id}`}
        className="pg-workflow"
        id={`usecase-${active.id}`}
        role="tabpanel"
      >
        <div className="pg-workflow-row">
          <div>
            <b>{active.headline}</b>
          </div>
          <em>{active.label}</em>
        </div>
        {active.rows.map((row) => (
          <div className="pg-workflow-row" key={row.title}>
            <div>
              <b>{row.title}</b>
              <p>{row.body}</p>
            </div>
            <em>{row.tag}</em>
          </div>
        ))}
      </div>
    </div>
  );
}
