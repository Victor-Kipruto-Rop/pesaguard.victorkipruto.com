import type { PageData } from "@/types/content";

/**
 * Per-detail-page content.
 *
 * Detail routes are thin: each one names a title and lets `RoutePage` resolve
 * the body. Before this module existed every detail page inherited a *parent*
 * body, so seven feature pages rendered identical copy with only the heading
 * changed. Entries here are keyed by the exact title the route passes â€” the
 * titles are unique, which is what makes the lookup unambiguous.
 *
 * Wording rules for this file:
 *   - only claim what the platform does today, and label the rest;
 *   - the active payment scope is M-Pesa (Safaricom Daraja);
 *   - capabilities with no adapter are `not-started` and say so.
 */
export const detailPages: Record<string, PageData> = {
  "Evidence for every important decision.": {
    title: "Evidence for every important decision.",
    description: "An append-only record of what was matched, who decided, and why.",
    label: "Audit trail",
    lede: "Reconciliation is only as useful as the reasoning behind it. Every match, exception, review and configuration change is written to a record that is appended to, never rewritten.",
    spec: [
      { label: "Write model", value: "Append-only" },
      { label: "Attached to", value: "Tenant Â· transaction Â· operator" },
      { label: "Secret material", value: "Excluded by design" },
      { label: "Use", value: "Review, dispute response, audit" },
    ],
    capabilities: [
      {
        index: "01",
        title: "Decisions keep their reason",
        body: "When a reviewer accepts, rejects or escalates an exception, the decision is stored with the reason, the actor and the transaction context.",
        items: ["Match evidence retained", "Operator identity recorded", "Timestamps on every change"],
      },
      {
        index: "02",
        title: "History survives staff turnover",
        body: "The record does not depend on anyone remembering a chat thread. Institutional knowledge stays queryable when the team changes.",
      },
      {
        index: "03",
        title: "Redacted at the boundary",
        body: "Secrets are excluded from audit entries and sensitive fields are redacted before they reach logs.",
      },
    ],
    sections: [
      {
        title: "What an audit-ready trail actually needs",
        body: "Three properties matter more than volume: entries can only be added, each entry identifies who did what, and the entry can be traced back to the transaction that caused it.",
        items: [
          "Append-only writes, so a decision cannot be quietly edited",
          "Actor and tenant recorded on each entry",
          "Traceability from provider event to final outcome",
        ],
      },
    ],
    faq: [
      {
        question: "Can an audit entry be deleted?",
        answer: "Entries are append-only, so outcomes cannot be rewritten. Retention and archival follow a documented policy rather than ad-hoc deletion.",
      },
      {
        question: "Does the trail include the underlying transaction?",
        answer: "Yes. Entries reference the transaction and tenant they belong to, so you can move from a decision back to the payment that produced it.",
      },
    ],
    related: [
      { label: "Compliance", href: "/security/compliance", description: "Controls as an operating practice." },
      { label: "Reconciliation", href: "/features/reconciliation", description: "How matches are decided." },
      { label: "Security model", href: "/security", description: "Where the controls sit." },
    ],
    cta: {
      eyebrow: "Review the record",
      title: "Bring an exception your team could not explain.",
      body: "We will show how the evidence, the decision and the operator are captured around it.",
      primary: { label: "Talk to our team", href: "/contact/sales", description: "Walk through the audit trail." },
      secondary: { label: "Read the docs", href: "/documentation", description: "How the platform is built." },
    },
  },

  "Trust the data before you act.": {
    title: "Trust the data before you act.",
    description: "Validation that rejects bad records loudly instead of absorbing them.",
    label: "Data quality",
    lede: "Bad payment data is worse than missing payment data, because it looks authoritative. Records are validated and normalized before anything downstream trusts them.",
    spec: [
      { label: "Checked on arrival", value: "Schema Â· currency Â· amount Â· reference" },
      { label: "On failure", value: "Quarantined with the reason" },
      { label: "On success", value: "Normalized to one canonical shape" },
      { label: "Silent drops", value: "Never" },
    ],
    capabilities: [
      {
        index: "01",
        title: "Validation before trust",
        body: "Provider payloads are checked against explicit rules so malformed events cannot reach matching or reporting.",
        items: ["Required fields enforced", "Currency and amount sanity checks", "Reference format validated"],
      },
      {
        index: "02",
        title: "Invalid records stay visible",
        body: "A rejected record is quarantined with its reason attached. It is not discarded and it is not silently converted into a plausible-looking success.",
      },
      {
        index: "03",
        title: "One canonical shape",
        body: "Normalization means downstream logic sees a single consistent structure regardless of which provider emitted the event.",
      },
    ],
    sections: [
      {
        title: "Quality you can inspect",
        body: "Data quality is reported rather than assumed. When records are rejected, the count and the reason are visible, so a spike is investigated instead of explained away.",
        items: [
          "Rejected-record counts with reasons",
          "Per-source completeness signals",
          "Duplicate detection on write",
        ],
      },
    ],
    faq: [
      {
        question: "What happens to a malformed callback?",
        answer: "It is quarantined with the validation reason attached and surfaced for review. It is never silently dropped or coerced into a passing record.",
      },
      {
        question: "Are duplicates treated as bad data?",
        answer: "Duplicates are rejected on write by database-level idempotency, so a provider retry cannot create a second financial record.",
      },
    ],
    related: [
      { label: "Audit trail", href: "/features/audit-trail", description: "Evidence behind each decision." },
      { label: "Transaction monitoring", href: "/features/transaction-monitoring", description: "Watch the flow as it changes." },
      { label: "Reconciliation", href: "/features/reconciliation", description: "Matching built on clean input." },
    ],
    cta: {
      eyebrow: "Test the input",
      title: "Send us a week of real callback payloads.",
      body: "We will show exactly which records validate, which are quarantined, and why.",
      primary: { label: "Talk to our team", href: "/contact/sales", description: "Review data quality on your traffic." },
    },
  },

  "Make risk signals useful.": {
    title: "Make risk signals useful.",
    description: "Rule-based and statistical checks that explain why a transaction stood out.",
    label: "Fraud detection",
    lede: "A score on its own changes nothing. Every signal names the pattern it saw, so a reviewer can decide quickly instead of forming a theory.",
    spec: [
      { label: "Method", value: "Explicit rules plus statistical checks" },
      { label: "Signals", value: "Amount Â· velocity Â· duplicates Â· timing Â· channel" },
      { label: "Output", value: "Score with the reasons listed" },
      { label: "Authority", value: "Signals review, never declares fraud" },
    ],
    capabilities: [
      {
        index: "01",
        title: "Signals are named, not implied",
        body: "Each flag states the pattern behind it, so the reviewer sees the reasoning rather than an opaque number.",
        items: ["Amount outside typical range", "Velocity spike on one account", "Duplicate reference seen before"],
      },
      {
        index: "02",
        title: "Context beats thresholds",
        body: "A large payment is not a problem on its own. Signals are scored against the account and channel behaviour they came from.",
      },
      {
        index: "03",
        title: "Review stays with people",
        body: "A high score routes a transaction to a human. PesaGuard does not auto-declare fraud, and every decision keeps its reason.",
      },
    ],
    sections: [
      {
        title: "Why not simply block on a score",
        body: "Automatic blocking converts a suspicion into a customer-facing event. PesaGuard treats a score as a prompt to look, and keeps the evidence needed to justify whatever the reviewer decides.",
        items: [
          "Flagged transactions queue with severity and reason",
          "Reviewers accept, reject or escalate with a written reason",
          "Outcomes feed the append-only audit trail",
        ],
      },
    ],
    faq: [
      {
        question: "Does PesaGuard use machine learning to detect fraud?",
        answer: "Today it uses explicit rules and statistical checks over transaction behaviour. We describe it that way rather than implying a model we have not shipped.",
      },
      {
        question: "Will a flagged transaction be blocked automatically?",
        answer: "No. A flag raises the payment for review. Blocking, if it happens at all, is a decision your team makes and records.",
      },
    ],
    related: [
      { label: "Real-time alerts", href: "/features/real-time-alerts", description: "How a flag reaches an owner." },
      { label: "Transaction monitoring", href: "/features/transaction-monitoring", description: "The flow signals are read from." },
      { label: "Audit trail", href: "/features/audit-trail", description: "Where decisions are recorded." },
    ],
    cta: {
      eyebrow: "Pressure-test the signals",
      title: "Show us the pattern that costs you most.",
      body: "We will map it onto named signals and show how a reviewer would see it.",
      primary: { label: "Talk to our team", href: "/contact/sales", description: "Discuss fraud signals." },
    },
  },

  "Route the right alert to the right owner.": {
    title: "Route the right alert to the right owner.",
    description: "Exceptions and signals delivered with severity, reason and context attached.",
    label: "Real-time alerts",
    lede: "An alert that arrives without context creates work instead of removing it. Notifications carry the amount, the reason, the severity and the transaction reference.",
    spec: [
      { label: "Channels", value: "SMS Â· email Â· Slack Â· webhooks" },
      { label: "Payload", value: "Severity, reason, transaction context" },
      { label: "Delivery", value: "Attempts, retries, dead letters" },
      { label: "Routing", value: "By severity and owner" },
    ],
    capabilities: [
      {
        index: "01",
        title: "Context travels with the alert",
        body: "The recipient sees what happened and how urgent it is without opening a dashboard first.",
        items: ["Amount and reference", "Named reason", "Severity level"],
      },
      {
        index: "02",
        title: "Routing follows responsibility",
        body: "Exceptions reach the team that owns them, so a finance issue does not sit unread in an engineering inbox.",
      },
      {
        index: "03",
        title: "Delivery is observable",
        body: "Alerting is not fire-and-forget. Attempts, retries and exhausted deliveries stay visible, along with the dead-letter path.",
      },
    ],
    sections: [
      {
        title: "Alerting that does not become noise",
        body: "Volume is the failure mode of alerting. Severity and routing exist so a high-severity exception stays distinguishable from a routine one.",
        items: [
          "Severity attached to each exception",
          "Multiple channels so the owner is reachable",
          "Dead letters retained rather than discarded",
        ],
      },
    ],
    faq: [
      {
        question: "Which channels are supported?",
        answer: "SMS, email, Slack and outbound webhooks. Delivery attempts, retries and dead letters are recorded so a missed alert can be traced.",
      },
      {
        question: "Can a failed alert disappear?",
        answer: "No. Exhausted deliveries are dead-lettered and remain visible for investigation rather than being silently dropped.",
      },
    ],
    related: [
      { label: "Fraud detection", href: "/features/fraud-detection", description: "What triggers a review." },
      { label: "Webhooks", href: "/integrations/webhooks", description: "Signed delivery with retries." },
      { label: "Data quality", href: "/features/data-quality", description: "Clean input before alerting." },
    ],
    cta: {
      eyebrow: "Fix an alert that failed you",
      title: "Describe an alert your team missed.",
      body: "We will show how routing, severity and delivery evidence would have caught it.",
      primary: { label: "Talk to our team", href: "/contact/sales", description: "Review alert routing." },
    },
  },

  "Reconciliation with the full picture.": {
    title: "Reconciliation with the full picture.",
    description: "Match provider events to internal records while preserving the reason behind every outcome.",
    label: "Reconciliation",
    lede: "Every provider event is paired with the internal record it belongs to, and each pairing keeps the evidence that produced it. Differences become exceptions, not silence.",
    status: {
      availability: "pilot",
      label: "Live for M-Pesa (Safaricom Daraja).",
      note: "Matching runs on Daraja callbacks in the pilot deployment.",
    },
    spec: [
      { label: "Match keys", value: "Amount Â· reference Â· timestamp tolerance" },
      { label: "When", value: "As callbacks arrive" },
      { label: "On difference", value: "Exception with reason attached" },
      { label: "Replay safety", value: "Idempotent by write" },
    ],
    steps: [
      { step: "01", title: "Receive", body: "A Daraja callback is validated, de-duplicated and normalised.", detail: "A retry of the same event does not create a second record." },
      { step: "02", title: "Match", body: "The event is compared against internal records on the configured keys.", detail: "Amount, reference and a timestamp tolerance are evaluated together." },
      { step: "03", title: "Decide", body: "Matched records keep their evidence; differences queue as exceptions.", detail: "Each exception carries the reason it was raised." },
    ],
    capabilities: [
      {
        index: "01",
        title: "Deterministic rules",
        body: "The same inputs produce the same outcome, so a reconciliation result can be explained and reproduced months later.",
      },
      {
        index: "02",
        title: "Differences are first-class",
        body: "An amount that disagrees with the ledger is not smoothed over. It becomes an exception with the difference stated explicitly.",
        items: ["Amount mismatch with the delta shown", "Reference not found", "Outside timestamp tolerance"],
      },
      {
        index: "03",
        title: "Safe to re-run",
        body: "Reprocessing is expected, not feared. Idempotency is enforced where writes happen, so a replay cannot double-count a payment.",
      },
    ],
    sections: [
      {
        title: "What happens to an exception",
        body: "Exceptions queue for review with the transaction, the provider event and the reason it was raised. A reviewer resolves it and the decision is recorded, which is what keeps month-end from becoming archaeology.",
        items: [
          "Queue ordered by severity and age",
          "Resolution captured with a reason",
          "Outcome written to the append-only trail",
        ],
      },
    ],
    faq: [
      {
        question: "Which rails are reconciled today?",
        answer: "M-Pesa via Safaricom Daraja is the active, tested scope. Airtel Money, bank rails and point-of-sale feeds have no adapter yet and are listed as planned.",
      },
      {
        question: "What tolerance is used for timestamps?",
        answer: "A bounded tolerance is configured per flow, because provider and ledger timestamps rarely agree to the second. It is a setting, not a hidden constant.",
      },
    ],
    related: [
      { label: "Data quality", href: "/features/data-quality", description: "The input matching depends on." },
      { label: "Audit trail", href: "/features/audit-trail", description: "Evidence for each decision." },
      { label: "How it works", href: "/how-it-works", description: "The pipeline end to end." },
    ],
    cta: {
      eyebrow: "Reconcile a real day",
      title: "Bring one day of M-Pesa callbacks and your ledger.",
      body: "We will show the matches, the exceptions and the reasons behind each one.",
      primary: { label: "Talk to our team", href: "/contact/sales", description: "Run a reconciliation review." },
      secondary: { label: "Read the docs", href: "/documentation/reconciliation", description: "How matching is configured." },
    },
  },

  "Reports people can act on.": {
    title: "Reports people can act on.",
    description: "Reconciliation summaries and exception trends drawn from reconciled records.",
    label: "Reporting",
    lede: "A report is only useful if it closes the loop. Summaries are built from the same reconciled records the operations team already reviewed, so the numbers and the queue agree.",
    spec: [
      { label: "Built from", value: "Reconciled records, not raw exports" },
      { label: "Covers", value: "Match rate Â· unmatched Â· exceptions Â· trends" },
      { label: "Periods", value: "Daily, weekly, period close" },
      { label: "Traceable", value: "Every figure resolves to its events" },
    ],
    capabilities: [
      {
        index: "01",
        title: "One version of the numbers",
        body: "Reports read from reconciled data rather than a parallel export, so finance and operations stop reconciling each other.",
        items: ["Match rate for the period", "Unmatched and pending counts", "Open exceptions by severity"],
      },
      {
        index: "02",
        title: "Trends, not just totals",
        body: "Exception volume and recurring causes are visible over time, which turns a repeating problem into something worth fixing.",
      },
      {
        index: "03",
        title: "Figures that can be traced",
        body: "Each summary resolves back through the reconciliation outcome to the original provider event and its evidence.",
      },
    ],
    sections: [
      {
        title: "Period close without the scramble",
        body: "Close fails when the exception queue and the spreadsheet disagree. Because reporting reads the reconciled record and its exceptions, the two stay consistent by construction.",
        items: [
          "Exceptions counted where they are resolved",
          "Consistent definitions across periods",
          "Traceability for anything queried later",
        ],
      },
    ],
    faq: [
      {
        question: "Are report figures illustrative?",
        answer: "No. Reports are produced from reconciled records. Any figures shown in marketing previews are labelled illustrative so the two are never confused.",
      },
      {
        question: "Can a figure be traced to its source?",
        answer: "Yes. Summaries resolve through the reconciliation outcome to the original provider event and the evidence it carried.",
      },
    ],
    related: [
      { label: "Reconciliation", href: "/features/reconciliation", description: "The records reports are built on." },
      { label: "Data quality", href: "/features/data-quality", description: "Why the input can be trusted." },
      { label: "Audit trail", href: "/features/audit-trail", description: "Provenance in practice." },
    ],
    cta: {
      eyebrow: "Repeat your last period close",
      title: "Show us the report you assemble by hand.",
      body: "We will show the same view produced from reconciled records instead.",
      primary: { label: "Talk to our team", href: "/contact/sales", description: "Review reporting needs." },
    },
  },

  "See transaction flows as they change.": {
    title: "See transaction flows as they change.",
    description: "One surface for payment flow, exceptions and channel behaviour.",
    label: "Transaction monitoring",
    lede: "Problems are cheapest to fix while they are still a pattern. Monitoring keeps the current state of the payment flow visible instead of reconstructing it after the fact.",
    status: {
      availability: "pilot",
      label: "Monitoring M-Pesa flow today.",
      note: "Other channels appear as planned until an adapter exists.",
    },
    spec: [
      { label: "Source", value: "M-Pesa (Safaricom Daraja) callbacks" },
      { label: "View", value: "Flow, volume, exceptions, state changes" },
      { label: "Cadence", value: "As events arrive" },
      { label: "Scope", value: "Enforced per tenant" },
    ],
    capabilities: [
      {
        index: "01",
        title: "Current state, not last week",
        body: "Transactions are visible as they move through validation, matching and review, so a stall is noticed rather than discovered.",
        items: ["Per-transaction state", "In-flight and pending volume", "Exception rate by channel"],
      },
      {
        index: "02",
        title: "Channel coverage is labelled",
        body: "M-Pesa is marked live. Airtel Money, bank rails and point-of-sale are marked planned, so a dashboard never implies coverage that does not exist.",
      },
      {
        index: "03",
        title: "Operational signals",
        body: "Volume, processing latency and failure counts are first-class operational signals rather than log lines found later.",
      },
    ],
    sections: [
      {
        title: "Built to be watched",
        body: "Monitoring is designed for the person on duty. Filters follow the questions they actually ask: what is pending, what failed, what needs a decision, and what changed since the last shift.",
        items: [
          "Filter by state, channel and time",
          "Exception queue alongside live flow",
          "Drill down from a count to the transaction",
        ],
      },
    ],
    faq: [
      {
        question: "Which channels can be monitored today?",
        answer: "M-Pesa via Safaricom Daraja. Airtel Money, bank rails and point-of-sale are named on the roadmap with no adapter yet, and the interface labels them as planned.",
      },
      {
        question: "Is monitoring real time?",
        answer: "Transactions are reflected as their events are processed. It is not a nightly batch view of yesterday.",
      },
    ],
    related: [
      { label: "Real-time alerts", href: "/features/real-time-alerts", description: "When monitoring needs a human." },
      { label: "Fraud detection", href: "/features/fraud-detection", description: "Signals read from the flow." },
      { label: "System status", href: "/status", description: "Health of the services themselves." },
    ],
    cta: {
      eyebrow: "Watch your flow",
      title: "Walk us through your busiest hour.",
      body: "We will show what your team would see on the monitoring surface during it.",
      primary: { label: "Talk to our team", href: "/contact/sales", description: "Review monitoring scope." },
    },
  },

  "Bring M-Pesa events into focus.": {
    title: "Bring M-Pesa events into focus.",
    description: "Daraja callbacks received, validated, de-duplicated and matched as they arrive.",
    label: "M-Pesa (Daraja)",
    lede: "M-Pesa through Safaricom Daraja is the active, tested integration. Callbacks land as normalized payment events and reconciliation runs against them in the same step.",
    status: {
      availability: "available",
      label: "Live in the pilot deployment.",
      note: "STK Push and PayBill callbacks over Safaricom Daraja.",
    },
    spec: [
      { label: "Provider", value: "Safaricom Daraja" },
      { label: "Flows", value: "STK Push Â· PayBill" },
      { label: "On callback", value: "Validate Â· de-duplicate Â· match" },
      { label: "Retry safety", value: "Idempotent by write" },
    ],
    capabilities: [
      {
        index: "01",
        title: "Callbacks become events",
        body: "Daraja payloads are validated on arrival and normalized into one canonical payment shape before anything downstream trusts them.",
      },
      {
        index: "02",
        title: "Matched against the ledger",
        body: "Each callback is compared to internal records on amount, reference and timestamp tolerance. Differences queue as exceptions with the delta shown.",
      },
      {
        index: "03",
        title: "Retries do no harm",
        body: "Daraja retries and operator replays are expected. Database-level idempotency means a repeated delivery never becomes a second financial record.",
      },
    ],
    sections: [
      {
        title: "What live means here",
        body: "Live means callbacks are being received and reconciled in the pilot deployment, not that the integration works for every M-Pesa configuration. Coverage and edge cases are scoped in the pilot conversation.",
        items: [
          "STK Push callbacks validated and matched",
          "PayBill callbacks validated and matched",
          "Exceptions with reasons for anything unmatched",
        ],
      },
    ],
    faq: [
      {
        question: "Which M-Pesa flows are covered?",
        answer: "STK Push and PayBill callbacks over Safaricom Daraja, validated and matched in the pilot deployment. Other flows are scoped per pilot.",
      },
      {
        question: "What happens when Daraja retries a callback?",
        answer: "The duplicate is rejected on write by idempotency, so no second record, no second match, and no duplicate alert is created.",
      },
    ],
    related: [
      { label: "Reconciliation", href: "/features/reconciliation", description: "How matches are decided." },
      { label: "Webhooks", href: "/integrations/webhooks", description: "Signed outbound delivery." },
      { label: "How it works", href: "/how-it-works", description: "Callback to record, end to end." },
    ],
    cta: {
      eyebrow: "Connect the Daraja flow",
      title: "Bring your shortcode and callback volume.",
      body: "We will scope validation, matching and exception handling around it.",
      primary: { label: "Talk to our team", href: "/contact/sales", description: "Scope the M-Pesa integration." },
      secondary: { label: "M-Pesa docs", href: "/documentation/transactions", description: "Transaction endpoints and shapes." },
    },
  },

  "Connect Airtel Money without losing context.": {
    title: "Connect Airtel Money without losing context.",
    description: "The named roadmap item for a second mobile-money rail, stated without implying it exists.",
    label: "Airtel Money",
    lede: "Airtel Money is on the roadmap, and saying so plainly matters: there is no adapter, no test suite and no documentation for it today. This page describes the shape it will take rather than promising it.",
    status: {
      availability: "not-started",
      label: "Planned. No adapter, tests or docs exist yet.",
      note: "Named so the scope is unambiguous rather than implied.",
    },
    spec: [
      { label: "Adapter", value: "Not built" },
      { label: "Callbacks", value: "Not ingested" },
      { label: "Reconciliation", value: "Not available for this rail" },
      { label: "Path", value: "Scoped after M-Pesa hardening" },
    ],
    capabilities: [
      {
        index: "01",
        title: "Same canonical shape, when it lands",
        body: "The plan is normalization into the same payment-event model as Daraja callbacks, so matching, signals and reporting would work unchanged.",
      },
      {
        index: "02",
        title: "Explicit before implicit",
        body: "Until the adapter exists, the interface labels Airtel Money as planned. A dashboard will not silently treat its absence as coverage.",
      },
    ],
    sections: [
      {
        title: "Why name something unbuilt",
        body: "Teams planning payments across Kenya ask about Airtel Money early. Naming it with an honest status is more useful than leaving the question open and letting readers assume support.",
        items: [
          "No adapter, tests or docs exist today",
          "Intended shape: same canonical event model",
          "Scoped after M-Pesa pilot hardening",
        ],
      },
    ],
    faq: [
      {
        question: "Can we connect Airtel Money today?",
        answer: "No. There is no adapter, test suite or documentation. We name it explicitly so the scope is unambiguous.",
      },
      {
        question: "What will the integration look like when it ships?",
        answer: "The plan is the same one applied to Daraja: validated, normalized callbacks matched against internal records with idempotent writes.",
      },
    ],
    related: [
      { label: "M-Pesa", href: "/integrations/mpesa", description: "The live mobile-money rail." },
      { label: "Integrations", href: "/integrations", description: "The full rail picture." },
      { label: "How it works", href: "/how-it-works", description: "The pipeline any rail feeds." },
    ],
    cta: {
      eyebrow: "Tell us your rail mix",
      title: "If Airtel Money is part of your operation, say so.",
      body: "It helps us sequence the adapter behind real demand rather than a guess.",
      primary: { label: "Talk to our team", href: "/contact/sales", description: "Register Airtel Money interest." },
    },
  },

  "Make bank settlement data useful.": {
    title: "Make bank settlement data useful.",
    description: "Statement and settlement imports are out of scope today, and this page says which parts.",
    label: "Bank rails",
    lede: "Bank settlement files and statements are the classic reconciliation gap for teams that collect on mobile money and settle through banks. Importing them is not in scope today.",
    status: {
      availability: "not-started",
      label: "Planned. No importer exists yet.",
      note: "Out of scope for the current pilot deployment.",
    },
    spec: [
      { label: "Statement import", value: "Not built" },
      { label: "Settlement matching", value: "Not available" },
      { label: "Blocking on", value: "M-Pesa pilot hardening first" },
      { label: "Manual path", value: "Scoped per pilot conversation" },
    ],
    capabilities: [
      {
        index: "01",
        title: "The gap, described honestly",
        body: "Settlements land in bank statements while collections land on mobile money. Without an importer, matching the two is manual work, and we do not pretend otherwise.",
      },
      {
        index: "02",
        title: "What the importer would do",
        body: "When built, bank files would normalize into the same canonical event model as Daraja callbacks, so matching, exceptions and audit would apply unchanged.",
      },
    ],
    sections: [
      {
        title: "What teams do meanwhile",
        body: "Pilot teams keep bank reconciliation where it already lives while PesaGuard handles the mobile-money side. The boundary is explicit so nobody goes looking for a bank import that does not exist.",
        items: [
          "Mobile-money reconciliation handled in PesaGuard",
          "Bank settlement reconciliation stays with existing tools",
          "Boundary reviewed in each pilot conversation",
        ],
      },
    ],
    faq: [
      {
        question: "Can PesaGuard import bank statements?",
        answer: "No. Statement and settlement imports are out of scope today with no importer built. We say so explicitly rather than letting the question hang.",
      },
      {
        question: "Does that limit the pilot?",
        answer: "Pilots focus on the mobile-money side, where PesaGuard is live. The bank boundary is scoped in the pilot conversation.",
      },
    ],
    related: [
      { label: "M-Pesa", href: "/integrations/mpesa", description: "The rail that is live today." },
      { label: "Integrations", href: "/integrations", description: "The full rail picture." },
      { label: "Reconciliation", href: "/features/reconciliation", description: "Matching on live rails." },
    ],
    cta: {
      eyebrow: "Map the settlement gap",
      title: "Show us where banks enter your reconciliation.",
      body: "We will confirm what is live today and shape the path for the rest.",
      primary: { label: "Talk to our team", href: "/contact/sales", description: "Discuss bank settlement scope." },
    },
  },

  "Connect the point of sale.": {
    title: "Connect the point of sale.",
    description: "In-store terminal feeds are not ingested today. This page names the boundary.",
    label: "Point of sale",
    lede: "Terminals settle through acquirers on their own schedules, which makes them a separate reconciliation problem. No terminal feed is ingested today.",
    status: {
      availability: "not-started",
      label: "Planned. No terminal feed is ingested today.",
      note: "Out of scope for the current pilot deployment.",
    },
    spec: [
      { label: "Terminal feeds", value: "Not ingested" },
      { label: "Acquirer files", value: "Not imported" },
      { label: "Coverage", value: "Mobile-money rails today" },
      { label: "Path", value: "Scoped per operation" },
    ],
    capabilities: [
      {
        index: "01",
        title: "Why it stays separate for now",
        body: "Terminal settlement batches, acquirer formats and in-store refunds behave differently from mobile-money callbacks. Folding them in prematurely would weaken the guarantees the live rails already carry.",
      },
      {
        index: "02",
        title: "What would come first",
        body: "Settlement-file import in the same canonical shape as provider callbacks, so matching and audit apply without special cases.",
      },
    ],
    sections: [
      {
        title: "The honest boundary for merchants",
        body: "Merchants that collect in-store and settle through banks keep that side of reconciliation where it lives today. PesaGuard handles the mobile-money side with live guarantees.",
        items: [
          "In-store collection stays with existing tools",
          "Mobile-money collection handled in PesaGuard",
          "Boundary reviewed per operation",
        ],
      },
    ],
    faq: [
      {
        question: "Can terminals feed PesaGuard today?",
        answer: "No. No terminal feed is ingested and no acquirer import exists. We keep the boundary explicit rather than advertising roadmap items as coverage.",
      },
      {
        question: "What about settlement files?",
        answer: "Statement and settlement imports are out of scope today. The bank rails page describes that boundary in full.",
      },
    ],
    related: [
      { label: "Bank rails", href: "/integrations/banks", description: "The settlement boundary." },
      { label: "M-Pesa", href: "/integrations/mpesa", description: "The live collection rail." },
      { label: "Merchants", href: "/solutions/merchants", description: "Operations PesaGuard supports today." },
    ],
    cta: {
      eyebrow: "Describe the in-store mix",
      title: "Tell us how in-store and mobile collections meet.",
      body: "We will confirm what is live and shape the path for the rest.",
      primary: { label: "Talk to our team", href: "/contact/sales", description: "Discuss point-of-sale scope." },
    },
  },

  "Webhooks that respect delivery reality.": {
    title: "Webhooks that respect delivery reality.",
    description: "Signed outbound events with attempts, retries and a dead-letter path.",
    label: "Webhooks",
    lede: "Outbound webhooks carry exceptions and notifications to systems you run. Every delivery is signed, retried on failure, and dead-lettered when exhausted.",
    status: {
      availability: "available",
      label: "Live in the pilot deployment.",
      note: "Signed delivery with observable retries.",
    },
    spec: [
      { label: "Signing", value: "Every delivery is signed" },
      { label: "On failure", value: "Bounded retries, then dead letter" },
      { label: "Visibility", value: "Attempts and outcomes recorded" },
      { label: "Replay", value: "Safe to re-run without duplication" },
    ],
    capabilities: [
      {
        index: "01",
        title: "Signed by default",
        body: "Consumers verify the sender before trusting the payload, which keeps webhook handling from becoming a spoofing surface.",
      },
      {
        index: "02",
        title: "Retries with a limit",
        body: "Transient failures are retried with bounded backoff. Exhausted deliveries move to a dead-letter path instead of vanishing.",
        items: ["Bounded retry schedule", "Dead-letter retention", "Replay from the dead letter"],
      },
      {
        index: "03",
        title: "Replay without duplication",
        body: "A replayed delivery is safe to run more than once, because idempotency is enforced where writes land.",
      },
    ],
    sections: [
      {
        title: "Delivery you can audit",
        body: "Each attempt is recorded with its outcome, so a consumer asking what was sent and when gets an answer from the record rather than the sender's memory.",
        items: [
          "Attempt history per delivery",
          "Dead letters retained for investigation",
          "Signature verifiable by the consumer",
        ],
      },
    ],
    faq: [
      {
        question: "Are webhook deliveries signed?",
        answer: "Yes. Every outbound delivery carries a signature the consumer can verify before trusting the payload.",
      },
      {
        question: "What happens when a consumer stays down?",
        answer: "Deliveries retry on a bounded schedule and then move to the dead-letter path, where they can be inspected and replayed once the consumer recovers.",
      },
    ],
    related: [
      { label: "Webhook docs", href: "/documentation/webhooks", description: "Signature checks, retries and replay." },
      { label: "Real-time alerts", href: "/features/real-time-alerts", description: "What delivery carries." },
      { label: "M-Pesa", href: "/integrations/mpesa", description: "Inbound events, matched live." },
    ],
    cta: {
      eyebrow: "Wire in a consumer",
      title: "Point a staging endpoint at the pilot.",
      body: "We will show signed delivery, a retry, and where the dead letter lands.",
      primary: { label: "Talk to our team", href: "/contact/sales", description: "Scope webhook delivery." },
      secondary: { label: "Webhook docs", href: "/documentation/webhooks", description: "Verify the contract." },
    },
  },
};
