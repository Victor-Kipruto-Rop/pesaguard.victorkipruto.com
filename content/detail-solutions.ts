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

/*[[ONEXT]]*/