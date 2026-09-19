import type { PageData } from "@/types/content";

/**
 * Point-of-sale detail content. Keyed by route title, like
 * `content/detail.ts`. Terminal feeds are not ingested today, so availability
 * is stated in the open.
 */
export const integrationDetails: Record<string, PageData> = {
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
      { label: "Coverage today", value: "Mobile-money rails" },
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
        answer: "No. No terminal feed is ingested and no acquirer import exists. The boundary stays explicit rather than advertising roadmap items as coverage.",
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
      { label: "Replay", value: "Safe to re-run" },
    ],
    capabilities: [
      {
        index: "01",
        title: "Signed by default",
        body: "Consumers verify the sender before trusting the payload, so webhook handling never becomes a spoofing surface.",
      },
      {
        index: "02",
        title: "Retries with a limit",
        body: "Transient failures retry with bounded backoff. Exhausted deliveries move to a dead-letter path instead of vanishing.",
        items: ["Bounded retry schedule", "Dead-letter retention", "Replay from the dead letter"],
      },
      {
        index: "03",
        title: "Replay without duplication",
        body: "Replaying a delivery is safe to run more than once, because idempotency is enforced where writes land.",
      },
    ],
    sections: [
      {
        title: "Delivery you can audit",
        body: "Each attempt is recorded with its outcome, so a consumer asking what was sent and when gets an answer from the record.",
        items: [
          "Attempt history per delivery",
          "Dead letters retained for investigation",
          "Signatures verifiable by the consumer",
        ],
      },
    ],
    faq: [
      {
        question: "Are webhook deliveries signed?",
        answer: "Yes. Every outbound delivery carries a signature the consumer verifies before trusting the payload.",
      },
      {
        question: "What happens when a consumer stays down?",
        answer: "Deliveries retry on a bounded schedule, then move to the dead-letter path for inspection and replay once the consumer recovers.",
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