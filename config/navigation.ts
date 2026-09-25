import type { FooterGroup, NavItem } from "@/types/navigation";

/**
 * Header navigation.
 *
 * Every top-level entry links to a real section index page. Entries with
 * `groups` also open a mega-menu panel, and the panels only list destinations
 * that exist as routes so the header cannot promise pages we do not ship.
 */
const primary: NavItem[] = [
  {
    label: "Product",
    href: "/product",
    groups: [
      {
        title: "Platform",
        links: [
          { label: "Product overview", href: "/product", description: "What PesaGuard does and where it stands today" },
          { label: "How it works", href: "/how-it-works", description: "From Daraja callback to reconciled record" },
          { label: "Security model", href: "/security", description: "Tenant isolation, access control, audit trail" },
          { label: "System status", href: "/status", description: "Live health of the services we run" },
        ],
      },
      {
        title: "Capabilities",
        links: [
          { label: "Reconciliation", href: "/features/reconciliation", description: "Match callbacks to internal records as they land" },
          { label: "Transaction monitoring", href: "/features/transaction-monitoring", description: "Watch the M-Pesa flow in real time" },
          { label: "Fraud detection", href: "/features/fraud-detection", description: "Rule-based and statistical anomaly checks" },
          { label: "Real-time alerts", href: "/features/real-time-alerts", description: "SMS, email and Slack notifications" },
          { label: "Reporting", href: "/features/reporting", description: "Operational and reconciliation summaries" },
          { label: "Audit trail", href: "/features/audit-trail", description: "Append-only record of decisions and actions" },
        ],
      },
      {
        title: "Developers",
        links: [
          { label: "API reference", href: "/api", description: "What exists, and what state it is in" },
          { label: "Documentation", href: "/documentation", description: "Guides for building against PesaGuard" },
          { label: "Webhook ingestion", href: "/integrations/webhooks", description: "Idempotent, signature-checked callbacks" },
          { label: "Changelog", href: "/documentation/changelog", description: "Versioning and where changes are recorded" },
        ],
      },
    ],
    foot: {
      label: "Talk to the team about your M-Pesa flow",
      href: "/contact/sales",
      description: "Bring your transaction volume and current reconciliation process.",
    },
  },
  {
    label: "Solutions",
    href: "/solutions",
    groups: [
      {
        title: "By organisation",
        links: [
          { label: "SACCOs", href: "/solutions/saccos", description: "Member contributions and loan repayments" },
          { label: "E-commerce operators", href: "/solutions/merchants", description: "STK Push volume and reversal checks" },
          { label: "Fintechs", href: "/solutions/fintechs", description: "Fraud visibility without a data team" },
          { label: "Financial institutions", href: "/solutions/financial-institutions", description: "Controls and evidence for audits" },
        ],
      },
      {
        title: "By problem",
        links: [
          { label: "Duplicate payments", href: "/features/fraud-detection", description: "Catch the same Daraja transaction twice" },
          { label: "Phantom reversals", href: "/features/fraud-detection", description: "Reversal sequences that do not match settlement" },
          { label: "Callback spoofing", href: "/integrations/mpesa", description: "Signature and source checks on every callback" },
          { label: "Manual reconciliation", href: "/features/reconciliation", description: "Replace statement-by-statement cross-checking" },
        ],
      },
    ],
    foot: { label: "Read how it works end to end", href: "/how-it-works", description: "The full path from callback to reconciled record." },
  },
  {
    label: "Features",
    href: "/features",
    groups: [
      {
        title: "Reconcile",
        links: [
          { label: "Reconciliation", href: "/features/reconciliation", description: "Real-time matching against internal records" },
          { label: "Data quality", href: "/features/data-quality", description: "Completeness, duplicates and validity checks" },
        ],
      },
      {
        title: "Monitor",
        links: [
          { label: "Transaction monitoring", href: "/features/transaction-monitoring", description: "Live flow, timing and volume signals" },
          { label: "Real-time alerts", href: "/features/real-time-alerts", description: "Notify owners the moment something breaks" },
        ],
      },
      {
        title: "Protect",
        links: [
          { label: "Fraud detection", href: "/features/fraud-detection", description: "Duplicate, amount and timing anomalies" },
          { label: "Audit trail", href: "/features/audit-trail", description: "Append-only history with actor and reason" },
        ],
      },
      {
        title: "Report",
        links: [
          { label: "Reporting", href: "/features/reporting", description: "Summaries for finance and operations" },
        ],
      },
    ],
    foot: { label: "See the capability status list", href: "/features", description: "Each capability marked available, in progress, planned or not started." },
  },
  {
    label: "Integrations",
    href: "/integrations",
    groups: [
      {
        title: "Available now",
        links: [
          { label: "M-Pesa (Daraja)", href: "/integrations/mpesa", availability: "available", description: "Callbacks, OAuth, validation and matching" },
          { label: "Outbound webhooks", href: "/integrations/webhooks", availability: "available", description: "Delivery attempts, retries and dead letters" },
        ],
      },
      {
        title: "Not started",
        links: [
          { label: "Airtel Money", href: "/integrations/airtel-money", availability: "not-started", description: "No adapter exists today" },
          { label: "Bank rails", href: "/integrations/banks", availability: "not-started", description: "No adapter exists today" },
          { label: "Point of sale", href: "/integrations/pos", availability: "not-started", description: "No adapter exists today" },
        ],
      },
    ],
    foot: { label: "Read the integration status list", href: "/integrations", description: "What is live, what is planned, and what is out of scope." },
  },
  {
    label: "Docs",
    href: "/documentation",
    groups: [
      {
        title: "Start here",
        links: [
          { label: "Getting started", href: "/documentation/getting-started", description: "Create a key and send a first transaction" },
          { label: "Authentication", href: "/documentation/authentication", description: "API keys, bearer tokens and roles" },
          { label: "Transactions", href: "/documentation/transactions", description: "POST /api/v1/transactions, field by field" },
          { label: "Reconciliation", href: "/documentation/reconciliation", description: "Matching rules and exceptions" },
          { label: "Discrepancies", href: "/documentation/discrepancies", description: "List, assign and resolve exceptions" },
        ],
      },
      {
        title: "Operating PesaGuard",
        links: [
          { label: "Idempotency", href: "/documentation/idempotency", description: "Duplicate detection and safe retries" },
          { label: "Webhooks", href: "/documentation/webhooks", description: "Inbound callbacks and signed outbound delivery" },
          { label: "Fraud", href: "/documentation/fraud", description: "Risk levels and the signals behind them" },
          { label: "Errors", href: "/documentation/errors", description: "Error shapes and retry guidance" },
          { label: "Rate limits", href: "/documentation/rate-limits", description: "Limits, backoff and 429 handling" },
          { label: "Changelog", href: "/documentation/changelog", description: "Versioning and where changes are recorded" },
        ],
      },
    ],
    foot: { label: "Browse the API reference", href: "/api", description: "What exists, and what state it is in." },
  },
  { label: "Pricing", href: "/pricing" },
];

/** Footer columns, rendered by `Footer`. */
const footer: FooterGroup[] = [
  {
    title: "Product",
    links: [
      { label: "Product overview", href: "/product" },
      { label: "Features", href: "/features" },
      { label: "Reconciliation", href: "/features/reconciliation" },
      { label: "Fraud detection", href: "/features/fraud-detection" },
      { label: "Alerts", href: "/features/real-time-alerts" },
      { label: "Integrations", href: "/integrations" },
    ],
  },
  {
    title: "Solutions",
    links: [
      { label: "SACCOs", href: "/solutions/saccos" },
      { label: "Merchants", href: "/solutions/merchants" },
      { label: "Financial institutions", href: "/solutions/financial-institutions" },
      { label: "Fintechs", href: "/solutions/fintechs" },
    ],
  },
  {
    title: "Developers",
    links: [
      { label: "API reference", href: "/api" },
      { label: "Documentation", href: "/documentation" },
      { label: "Webhooks", href: "/documentation/webhooks" },
      { label: "Changelog", href: "/documentation/changelog" },
    ],
  },
  {
    title: "Resources",
    links: [
      { label: "How it works", href: "/how-it-works" },
      { label: "System status", href: "/status" },
      { label: "Incident history", href: "/status/incidents" },
      { label: "Pricing", href: "/pricing" },
    ],
  },
  {
    title: "Company",
    links: [
      { label: "About", href: "/about" },
      { label: "Contact", href: "/contact" },
      { label: "Sales", href: "/contact/sales" },
      { label: "Support", href: "/contact/support" },
    ],
  },
  {
    title: "Security",
    links: [
      { label: "Security model", href: "/security" },
      { label: "Tenant isolation", href: "/security/tenant-isolation" },
      { label: "Privacy", href: "/privacy" },
      { label: "Terms", href: "/terms" },
      { label: "Cookies", href: "/cookies" },
    ],
  },
];

export const navigation = { primary, footer };
