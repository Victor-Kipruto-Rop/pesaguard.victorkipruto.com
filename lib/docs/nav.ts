/**
 * Single source of truth for documentation navigation.
 * The sidebar, the previous/next pager and the docs index all read from here.
 */

export type DocsNavItem = {
  slug: string;
  title: string;
  summary: string;
};

export type DocsNavGroup = {
  title: string;
  items: DocsNavItem[];
};

export const docsNav: DocsNavGroup[] = [
  {
    title: "Start",
    items: [
      { slug: "getting-started", title: "Getting started", summary: "Get a key, send a transaction, read the response." },
      { slug: "authentication", title: "Authentication", summary: "API keys, bearer tokens, roles and permissions." },
    ],
  },
  {
    title: "Reference",
    items: [
      { slug: "transactions", title: "Transactions", summary: "POST /api/v1/transactions: fields, validation, responses." },
      { slug: "discrepancies", title: "Discrepancies", summary: "List, assign, annotate and resolve reconciliation exceptions." },
      { slug: "errors", title: "Errors", summary: "Every error shape the API returns today, and what to do about it." },
      { slug: "rate-limits", title: "Rate limits", summary: "Token buckets, 429 responses and the headers that come with them." },
    ],
  },
  {
    title: "Concepts",
    items: [
      { slug: "idempotency", title: "Idempotency", summary: "How duplicates are detected and how to retry safely." },
      { slug: "reconciliation", title: "Reconciliation", summary: "The matching order, tolerances and outcome statuses." },
      { slug: "webhooks", title: "Webhooks", summary: "Inbound M-Pesa callbacks, and the two outbound webhook mechanisms." },
      { slug: "fraud", title: "Fraud signals", summary: "What the rules engine looks at, and the levels it produces." },
    ],
  },
  {
    title: "Project",
    items: [{ slug: "changelog", title: "Changelog", summary: "Versioning rules, the deprecation policy and where changes are recorded." }],
  },
];

export const docsPages: DocsNavItem[] = docsNav.flatMap((group) => group.items);

export function docsHref(slug: string): string {
  return slug ? `/documentation/${slug}` : "/documentation";
}

export function docsNeighbours(slug: string): { previous?: DocsNavItem; next?: DocsNavItem } {
  const index = docsPages.findIndex((page) => page.slug === slug);
  if (index === -1) return {};
  return { previous: docsPages[index - 1], next: docsPages[index + 1] };
}
