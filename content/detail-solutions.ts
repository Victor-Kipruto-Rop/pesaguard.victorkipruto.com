import type { PageData } from "@/types/content";

/**
 * Solution and status detail pages. Keyed by route title, like
 * `content/detail.ts`. Each page speaks to one operating reality: what the
 * team reconciles, where the time goes, and which controls apply first.
 */
export const solutionDetails: Record<string, PageData> = {
  "A clearer ledger for every member payment.": {
    title: "A clearer ledger for every member payment.",
    description: "Match member collections and settlements with evidence for every outcome.",
    label: "SACCOs",
    lede: "SACCOs reconcile member money against member records, which makes an unexplained shilling a trust problem, not just an accounting one. Member collections and officer reviews get first-class treatment here.",
    spec: [
      { label: "Collections", value: "M-Pesa member payments, matched live" },
      { label: "Reviews", value: "Exceptions with amount, reference, payer" },
      { label: "Reporting", value: "Period summaries from reconciled records" },
      { label: "Scope", value: "Per SACCO, per tenant" },
    ],
    capabilities: [
      {
        index: "01",
        title: "Member payments, matched",
        body: "PayBill and STK Push collections reconcile against member records as they land, so an officer sees what arrived rather than rebuilding it later.",
      },
      {
        index: "02",
        title: "Exceptions an officer can act on",
        body: "An unmatched payment carries the amount, the reference and the payer context, which is what an officer needs to resolve it in one call.",
      },
      {
        index: "03",
        title: "Reports the board can read",
        body: "Period summaries come from the same reconciled records the officers reviewed, so the numbers presented and the numbers worked match.",
      },
    ],
    sections: [
      {
        title: "Where the time goes today",
        body: "Collection weekends produce volume faster than the office can clear it. Live matching absorbs the routine cases so officers spend their time on the exceptions that actually need judgment.",
        items: [
          "Routine matches clear without review",
          "Exceptions queue with full context",
          "Decisions recorded for the next committee",
        ],
      },
    ],
    faq: [
      {
        question: "Does this replace the loan book?",
        answer: "No. PesaGuard reconciles collections and surfaces exceptions. Lending rules and member records stay in the SACCO's systems.",
      },
      {
        question: "How do officers review exceptions?",
        answer: "Each exception shows the amount, reference, payer context and the reason it was raised, with accept, reject or escalate recorded.",
      },
    ],
    related: [
      { label: "Reconciliation", href: "/features/reconciliation", description: "How matches are decided." },
      { label: "Reporting", href: "/features/reporting", description: "Period summaries that agree." },
      { label: "M-Pesa", href: "/integrations/mpesa", description: "The collection rail." },
    ],
    cta: {
      eyebrow: "Reconcile a collection weekend",
      title: "Bring one weekend of member payments.",
      body: "We will show what clears automatically and what lands in the officer queue.",
      primary: { label: "Talk to our team", href: "/contact/sales", description: "Scope a SACCO pilot." },
    },
  },

  "Protect revenue across every channel.": {
    title: "Protect revenue across every channel.",
    description: "Settlement checks and exception queues for merchants collecting on mobile money.",
    label: "Merchants",
    lede: "Merchants collect across tills, PayBills and STK Push, then settle against bank receipts. PesaGuard matches the mobile-money side live and keeps settlement Exceptions visible rather than buried in a spreadsheet.",
    spec: [
      { label: "Collections", value: "M-Pesa, matched as callbacks arrive" },
      { label: "Settlements", value: "Checked against processed totals" },
      { label: "Exceptions", value: "One queue for failed, pending, reversed" },
      { label: "Coverage", value: "Mobile-money side today" },
    ],
    capabilities: [
      {
        index: "01",
        title: "STK Push checked against orders",
        body: "Every push, callback and reversal is checked against the order reference and amount, so a paid-but-unfulfilled case surfaces immediately.",
      },
      {
        index: "02",
        title: "Settlement totals compared",
        body: "Daily settlement totals are compared against processed transaction sums. A shortfall appears as an exception, not a month-end surprise.",
      },
      {
        index: "03",
        title: "One exception queue",
        body: "Failed, pending and reversed payments live in a single reviewable queue, with the reason each one is there.",
      },
    ],
    sections: [
      {
        title: "Where merchant time goes today",
        body: "Reconciling tills to bank receipts already works for most merchants. The expensive gap is mobile-money collections against orders and settlements, because callbacks arrive fast and settle elsewhere. That is the side PesaGuard takes first.",
        items: [
          "In-store and bank reconciliation stays as-is",
          "Mobile collections matched in PesaGuard",
          "Settlement totals compared daily",
        ],
      },
    ],
    faq: [
      {
        question: "Does this handle in-store terminals?",
        answer: "No. Terminal feeds are not ingested today. PesaGuard handles the mobile-money collection side; in-store stays with existing tools.",
      },
      {
        question: "What about refunds and reversals?",
        answer: "Reversals are handled as first-class events against the original payment, so a reversed collection cannot quietly survive as revenue.",
      },
    ],
    related: [
      { label: "M-Pesa", href: "/integrations/mpesa", description: "The collection rail." },
      { label: "Reconciliation", href: "/features/reconciliation", description: "How matches are decided." },
      { label: "Point of sale", href: "/integrations/pos", description: "The in-store boundary." },
    ],
    cta: {
      eyebrow: "Reconcile a trading day",
      title: "Bring a day of collections and settlements.",
      body: "We will show what clears, what queues, and what your team would resolve first.",
      primary: { label: "Talk to our team", href: "/contact/sales", description: "Scope a merchant pilot." },
    },
  },

  "Controls that keep institutions moving.": {
    title: "Controls that keep institutions moving.",
    description: "Multi-channel overview with tenant boundaries and an evidence trail that survives review.",
    label: "Financial institutions",
    lede: "Institutions carry oversight obligations across channels and teams. PesaGuard gives supervisors one operational surface, tenant boundaries that hold between organizations, and evidence that answers an examiner's questions.",
    spec: [
      { label: "Overview", value: "One surface across live channels" },
      { label: "Boundaries", value: "Tenants isolated at the database" },
      { label: "Evidence", value: "Append-only, traceable to events" },
      { label: "Proof", value: "100-tenant run, zero leakage" },
    ],
    capabilities: [
      {
        index: "01",
        title: "Oversight across channels",
        body: "Transaction flow, exceptions and states are monitored from one surface instead of spread across provider dashboards and spreadsheets.",
      },
      {
        index: "02",
        title: "Boundaries with measured proof",
        body: "Tenant isolation is enforced at the database layer and was measured across 100 tenants with zero cross-tenant rows, which is what an examiner can rely on.",
      },
      {
        index: "03",
        title: "Evidence that survives review",
        body: "Every match, review and configuration change keeps its reason and its actor, so an audit reads the system rather than interviewing it.",
      },
    ],
    sections: [
      {
        title: "What examiners actually ask",
        body: "Who could see what, who decided what, and what proves it. The platform answers all three from its own records: scoped roles, per-decision reasons, and an append-only trail back to source events.",
        items: [
          "Scoped roles with recorded changes",
          "Per-decision reasons and actors",
          "Trail traceable to source events",
        ],
      },
    ],
    faq: [
      {
        question: "Can this support an audit?",
        answer: "It is built for review: roles, reasons and an append-only trail cover the standard examiner questions. No third-party certifications are claimed today.",
      },
      {
        question: "How is multi-organization data separated?",
        answer: "By tenant isolation enforced at the database layer, measured across 100 tenants with zero cross-tenant rows in the committed load test.",
      },
    ],
    related: [
      { label: "Tenant isolation", href: "/security/tenant-isolation", description: "The boundary, with evidence." },
      { label: "Compliance", href: "/security/compliance", description: "Review as an operating practice." },
      { label: "Audit trail", href: "/features/audit-trail", description: "Decisions with reasons." },
    ],
    cta: {
      eyebrow: "Satisfy an overseer",
      title: "Bring the review you need to pass.",
      body: "We will map each requirement onto the controls and evidence PesaGuard holds.",
      primary: { label: "Talk to our team", href: "/contact/sales", description: "Discuss institutional review." },
    },
  },

  "Scale payment operations with durable foundations.": {
    title: "Scale payment operations with durable foundations.",
    description: "API-first ingestion, signed webhooks and anomaly signals built for teams shipping on payments.",
    label: "Fintechs",
    lede: "A fintech building on payments inherits reconciliation, review and evidence as engineering problems. PesaGuard takes those as the platform, with documented endpoints, stable error shapes and webhooks that respect delivery reality.",
    spec: [
      { label: "Ingestion", value: "Documented API, stable errors" },
      { label: "Outbound", value: "Signed webhooks with retries" },
      { label: "Signals", value: "Rules and statistics, no data team" },
      { label: "Isolation", value: "Per-tenant, database-enforced" },
    ],
    capabilities: [
      {
        index: "01",
        title: "An API your engineers can trust",
        body: "Ingestion follows documented endpoints with stable error shapes, so integration work is predictable rather than archaeological.",
      },
      {
        index: "02",
        title: "Events in, events out",
        body: "Provider callbacks come in through validated ingestion and reach your systems through signed, retried, dead-lettered webhooks.",
      },
      {
        index: "03",
        title: "Signals without a data team",
        body: "Named anomaly signals and severity routing arrive built in, so fraud visibility does not wait for a machine-learning hire.",
      },
    ],
    sections: [
      {
        title: "What you stop building",
        body: "Matching logic, exception queues, idempotency handling, delivery retries and audit plumbing are the undifferentiated middle every payments team rebuilds. PesaGuard ships that layer so your engineers work on the product.",
        items: [
          "Matching and exception queues",
          "Idempotent ingestion and delivery",
          "Audit and reporting foundations",
        ],
      },
    ],
    faq: [
      {
        question: "Is the API really first-class?",
        answer: "Yes. Documented endpoints, stable error shapes and versioned interfaces are part of the design principles, not an afterthought for sales demos.",
      },
      {
        question: "Can we run tenants per customer?",
        answer: "Yes. Tenant isolation is enforced at the database layer, measured across 100 tenants with zero cross-tenant rows.",
      },
    ],
    related: [
      { label: "API reference", href: "/api", description: "Endpoints and error shapes." },
      { label: "Webhooks", href: "/integrations/webhooks", description: "Signed delivery with retries." },
      { label: "Developers", href: "/documentation", description: "Guides for building on the platform." },
    ],
    cta: {
      eyebrow: "Build on the platform",
      title: "Show us what your engineers rebuild most.",
      body: "We will show which of it already exists as platform.",
      primary: { label: "Talk to our team", href: "/contact/sales", description: "Discuss building on PesaGuard." },
      secondary: { label: "Read the docs", href: "/documentation", description: "Guides for building." },
    },
  },

  "Incident history and communication.": {
    title: "Incident history and communication.",
    description: "How PesaGuard reports what broke, who it affected, and how it ended.",
    label: "Incident history",
    lede: "An incident page is judged by what it admits. Each incident states what broke, who was affected, how long it lasted, and what changed so it does not recur.",
    spec: [
      { label: "States", value: "Investigating · identified · resolved" },
      { label: "Scope", value: "Affected services and tenants" },
      { label: "Duration", value: "Start to confirmed resolution" },
      { label: "Follow-up", value: "Named change, not a promise" },
    ],
    capabilities: [
      {
        index: "01",
        title: "Scope is named",
        body: "An incident states exactly which services and tenants were affected, so nobody has to guess whether they were in it.",
      },
      {
        index: "02",
        title: "Duration is measured",
        body: "From first detection to confirmed resolution, with each status change timestamped. Estimates are marked as estimates.",
      },
      {
        index: "03",
        title: "Follow-ups are named",
        body: "A resolved incident names the change that prevents recurrence. Empty reassurance is not a follow-up.",
      },
    ],
    sections: [
      {
        title: "How incidents are communicated",
        body: "The status page carries the incident while it is open and keeps the record after it closes. The public strip on this site reflects the same state it shows.",
        items: [
          "Status changes with timestamps",
          "Affected scope stated plainly",
          "History kept, not pruned for looks",
        ],
      },
    ],
    faq: [
      {
        question: "Where do I see current incidents?",
        answer: "On the system status page, which carries open incidents with their scope and state. The strip above this site's header mirrors that state.",
      },
      {
        question: "Is history ever removed?",
        answer: "No. Resolved incidents stay visible with their durations and follow-ups, because reliability claims need a record.",
      },
    ],
    related: [
      { label: "System status", href: "/status", description: "Live service health." },
      { label: "Transaction monitoring", href: "/features/transaction-monitoring", description: "Watching flow as it changes." },
      { label: "Real-time alerts", href: "/features/real-time-alerts", description: "How owners are told." },
    ],
    cta: {
      eyebrow: "Ask about reliability",
      title: "Put a hard question to the incident record.",
      body: "We will answer it from what is recorded, not what sounds good.",
      primary: { label: "Talk to our team", href: "/contact/sales", description: "Discuss reliability evidence." },
    },
  },
};