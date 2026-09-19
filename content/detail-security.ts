import type { PageData } from "@/types/content";

/**
 * Security detail pages. Keyed by route title, like `content/detail.ts`.
 * Each page describes one control layer: what it guards, how it behaves, and
 * where its boundary is.
 */
export const securityDetails: Record<string, PageData> = {
  "Protect data in motion and at rest.": {
    title: "Protect data in motion and at rest.",
    description: "How payment and operational data is protected across every hop and at every store.",
    label: "Encryption",
    lede: "Encryption is the layer everything else assumes. Traffic between services is protected in transit, sensitive data is protected at rest, and secrets never travel in logs or audit entries.",
    spec: [
      { label: "In transit", value: "Encrypted service traffic" },
      { label: "At rest", value: "Encrypted stores" },
      { label: "Secrets", value: "Excluded from logs and audit" },
      { label: "Keys", value: "Rotated, never in code" },
    ],
    capabilities: [
      {
        index: "01",
        title: "Transit is never plaintext",
        body: "Service-to-service calls, webhook deliveries and dashboard traffic travel over encrypted channels. There is no opt-out mode.",
      },
      {
        index: "02",
        title: "Rest is encrypted too",
        body: "Payment records and operational data sit in encrypted stores, so a disk or snapshot does not become a breach.",
      },
      {
        index: "03",
        title: "Secrets stay out of the record",
        body: "Credentials, tokens and keys are excluded from logs and audit entries. Sensitive fields are redacted at logging boundaries.",
        items: ["No secrets in logs", "No secrets in audit entries", "Field-level redaction"],
      },
    ],
    sections: [
      {
        title: "What encryption does not do alone",
        body: "Encryption protects data from readers it was not meant for. It does not decide who is allowed in. That job belongs to authentication, authorization and tenant isolation, which sit above this layer.",
        items: [
          "Access control decides who arrives",
          "Tenant isolation decides what they can see",
          "Audit keeps the record of both",
        ],
      },
    ],
    faq: [
      {
        question: "Is everything encrypted?",
        answer: "Traffic between services is encrypted in transit and sensitive data is encrypted at rest. Secrets are additionally excluded from logs and audit entries.",
      },
      {
        question: "Where are keys kept?",
        answer: "Keys live outside application source, are rotated, and are never written into code, logs or documentation.",
      },
    ],
    related: [
      { label: "Authentication", href: "/security/authentication", description: "Who is allowed in." },
      { label: "Tenant isolation", href: "/security/tenant-isolation", description: "What each caller can see." },
      { label: "Security model", href: "/security", description: "How the layers combine." },
    ],
    cta: {
      eyebrow: "Review the layers",
      title: "Bring your hardest security question.",
      body: "We will answer it from the actual controls, not a checklist.",
      primary: { label: "Talk to our team", href: "/contact/sales", description: "Discuss the security model." },
    },
  },

  "Authentication teams can reason about.": {
    title: "Authentication teams can reason about.",
    description: "Explicit identity for people, services and providers across the platform.",
    label: "Authentication",
    lede: "Every request has a named, verifiable identity before anything else runs. People, server-to-server callers and provider callbacks are authenticated through different mechanisms, each suited to who or what is calling.",
    spec: [
      { label: "Server access", value: "Bearer tokens, scoped and rotatable" },
      { label: "Provider callbacks", value: "Signature verification" },
      { label: "Dashboard access", value: "Authenticated sessions" },
      { label: "Failure mode", value: "Denied, never degraded to anonymous" },
    ],
    capabilities: [
      {
        index: "01",
        title: "Tokens with an explicit scope",
        body: "Server-to-server callers authenticate with bearer tokens that carry a scope, an expiry and rotation metadata. A token grants exactly the access it was issued for.",
      },
      {
        index: "02",
        title: "Provider identity by signature",
        body: "Inbound provider events are verified by signature rather than trusted by origin. An unverifiable callback is rejected before it touches the database.",
      },
      {
        index: "03",
        title: "No anonymous path to data",
        body: "When authentication fails, the request ends there. There is no degraded mode in which financial data is reachable without identity.",
      },
    ],
    sections: [
      {
        title: "Why scoping beats a single secret",
        body: "One shared secret grants everything to whoever holds it. Scoped tokens bound that risk: a leaked token still only reaches what it was scoped for, and rotation limits how long it matters.",
        items: [
          "Explicit scopes per integration",
          "Expiry with rotation metadata",
          "Revocation that takes effect immediately",
        ],
      },
    ],
    faq: [
      {
        question: "How are server integrations authenticated?",
        answer: "With scoped bearer tokens that carry expiry and rotation metadata. Each token is limited to the access its integration was issued for.",
      },
      {
        question: "What happens on authentication failure?",
        answer: "The request is denied. There is no fallback path that serves financial data without a verified identity.",
      },
    ],
    related: [
      { label: "Access control", href: "/security/access-control", description: "What identity is allowed to do." },
      { label: "Encryption", href: "/security/encryption", description: "Protection across every hop." },
      { label: "Security model", href: "/security", description: "How the layers combine." },
    ],
    cta: {
      eyebrow: "Inspect the identity model",
      title: "Bring your hardest access question.",
      body: "We will trace a request from caller identity to data returned.",
      primary: { label: "Talk to our team", href: "/contact/sales", description: "Review authentication in depth." },
    },
  },

  "Access that matches responsibility.": {
    title: "Access that matches responsibility.",
    description: "Role-based authorization that grants the least access each role needs.",
    label: "Access control",
    lede: "Knowing who called is only half the job. Every operation is checked against what that caller is allowed to do, with roles shaped around real responsibilities rather than open doors.",
    spec: [
      { label: "Model", value: "Role-based authorization" },
      { label: "Principle", value: "Least privilege per role" },
      { label: "Default", value: "Deny unless explicitly granted" },
      { label: "Reviewable", value: "Every check and change logged" },
    ],
    capabilities: [
      {
        index: "01",
        title: "Roles, not shared logins",
        body: "Reviewers, operators and administrators hold distinct roles. A reviewer resolves exceptions; an administrator configures the system; neither borrows the other's access.",
      },
      {
        index: "02",
        title: "Least privilege by default",
        body: "New access starts narrow and widens only with reason. Nothing in the system defaults to full visibility.",
      },
      {
        index: "03",
        title: "Changes leave a trail",
        body: "Granting or removing access is itself a recorded event, so a later review can answer who had what, when.",
      },
    ],
    sections: [
      {
        title: "Access reviewed like money",
        body: "Access decisions are treated with the same seriousness as financial ones: explicit, bounded, and recorded. An unexplained permission is as suspicious as an unexplained shilling.",
        items: [
          "Explicit role definitions",
          "Periodic review of granted access",
          "Immediate revocation path",
        ],
      },
    ],
    faq: [
      {
        question: "How are roles defined?",
        answer: "Around real responsibilities: reviewers resolve exceptions, operators run flows, administrators configure the system. Each role holds the least access that lets it work.",
      },
      {
        question: "Is access itself audited?",
        answer: "Yes. Grants, revocations and role changes are recorded as events, so access history is reviewable at any time.",
      },
    ],
    related: [
      { label: "Authentication", href: "/security/authentication", description: "Identity before permission." },
      { label: "Tenant isolation", href: "/security/tenant-isolation", description: "What identity can reach." },
      { label: "Audit trail", href: "/features/audit-trail", description: "Where changes are recorded." },
    ],
    cta: {
      eyebrow: "Map your responsibilities",
      title: "List the roles in your operation.",
      body: "We will show how each maps onto PesaGuard access with least privilege.",
      primary: { label: "Talk to our team", href: "/contact/sales", description: "Scope access for your team." },
    },
  },

  "Strong boundaries between tenants.": {
    title: "Strong boundaries between tenants.",
    description: "Isolation enforced at the database layer, so application mistakes cannot leak data across organizations.",
    label: "Tenant isolation",
    lede: "Multi-tenancy is a database property here, not an application convention. Every tenant-owned resource is evaluated against the authenticated tenant context, down to the query predicate.",
    status: {
      availability: "available",
      label: "Enforced in the database layer.",
      note: "Load-tested across 100 tenants with zero cross-tenant rows.",
    },
    spec: [
      { label: "Enforcement", value: "Database layer, not application code" },
      { label: "Scope", value: "Queries · mutations · exports · events · cache" },
      { label: "Load test", value: "100 tenants, 0 cross-tenant rows" },
      { label: "Failure mode", value: "Denied query, never partial data" },
    ],
    capabilities: [
      {
        index: "01",
        title: "Queries carry the tenant",
        body: "Tenant identity is part of every data predicate. A query without an authorized tenant resolves to nothing, not to everything.",
      },
      {
        index: "02",
        title: "Beyond reads",
        body: "Isolation covers mutations, exports, cache keys, events and replays, because a boundary that only protects reads is not a boundary.",
      },
      {
        index: "03",
        title: "Tested under load",
        body: "The committed load test exercised 100 tenants concurrently and recorded zero cross-tenant rows, so isolation is measured rather than assumed.",
      },
    ],
    sections: [
      {
        title: "Why the database, not the app",
        body: "Application code changes constantly; a missed check in one handler is all it takes to leak data. Enforcement at the database layer means the boundary holds even when application code has a bad day.",
        items: [
          "Tenant predicates on tenant-owned tables",
          "No undocumented administrative bypasses",
          "100-tenant load test with zero leakage",
        ],
      },
    ],
    faq: [
      {
        question: "Is isolation just a tenant_id column?",
        answer: "No. It is enforced predicates at the database layer covering reads, writes, exports and events, plus a load test that measured zero cross-tenant rows across 100 tenants.",
      },
      {
        question: "Can an operator see across tenants?",
        answer: "Only through explicitly scoped administrative paths, which are themselves recorded. There are no undocumented bypasses.",
      },
    ],
    related: [
      { label: "Authentication", href: "/security/authentication", description: "Identity the tenant is derived from." },
      { label: "Access control", href: "/security/access-control", description: "What identity may do." },
      { label: "Security model", href: "/security", description: "How the layers combine." },
    ],
    cta: {
      eyebrow: "Probe the boundary",
      title: "Ask for the isolation evidence.",
      body: "We will walk through the predicates and the load-test run that measured them.",
      primary: { label: "Talk to our team", href: "/contact/sales", description: "Review tenant isolation." },
    },
  },

  "Compliance as an operating practice.": {
    title: "Compliance as an operating practice.",
    description: "Policies as visible controls: retention, review and evidence that an auditor can follow.",
    label: "Compliance",
    lede: "Compliance is what an auditor can verify, not what a checklist claims. Retention rules, access reviews and evidence trails run as ordinary operations so an audit reads the system rather than interviewing it.",
    spec: [
      { label: "Retention", value: "Documented policy, per tenant" },
      { label: "Access review", value: "Periodic, recorded" },
      { label: "Evidence", value: "Append-only audit trail" },
      { label: "Secrets", value: "Excluded from retained records" },
    ],
    capabilities: [
      {
        index: "01",
        title: "Retention with a policy",
        body: "Data is retained and archived under a documented policy by tenant, legal hold and residency, not kept forever by default.",
      },
      {
        index: "02",
        title: "Reviews that are recorded",
        body: "Access reviews and configuration changes happen as events. An auditor sees what was checked, when, and by whom.",
      },
      {
        index: "03",
        title: "Evidence packs on demand",
        body: "Decisions, matches and reviews trace back to their source events, which is what makes an evidence pack assemblable instead of archaeological.",
      },
    ],
    sections: [
      {
        title: "Certifications, stated once",
        body: "PesaGuard does not carry third-party security certifications today. Rather than borrowing credibility, the platform exposes its controls, its audit trail and its load-test evidence for direct inspection.",
        items: [
          "No certification badges are claimed",
          "Controls documented as implemented",
          "Evidence available on request",
        ],
      },
    ],
    faq: [
      {
        question: "Is PesaGuard certified?",
        answer: "No third-party security certifications are held today. We describe implemented controls and evidence directly rather than implying certifications.",
      },
      {
        question: "How is data retained?",
        answer: "Under a documented policy by tenant, legal hold and residency. Secrets and credentials are excluded from retained records.",
      },
    ],
    related: [
      { label: "Audit trail", href: "/features/audit-trail", description: "Evidence for each decision." },
      { label: "Tenant isolation", href: "/security/tenant-isolation", description: "Boundaries with measured evidence." },
      { label: "Security model", href: "/security", description: "How the layers combine." },
    ],
    cta: {
      eyebrow: "Prepare an audit",
      title: "Bring your auditor's question list.",
      body: "We will answer each item from the system's own records.",
      primary: { label: "Talk to our team", href: "/contact/sales", description: "Walk through compliance evidence." },
    },
  },
};