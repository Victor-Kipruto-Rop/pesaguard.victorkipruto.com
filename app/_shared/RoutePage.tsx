import { PageTemplate } from "@/components/PageTemplate";
import { pages } from "@/content/pages";
import { detailPages } from "@/content/detail";
import { integrationDetails } from "@/content/detail-integrations";
import { securityDetails } from "@/content/detail-security";
import { solutionDetails } from "@/content/detail-solutions";

/**
 * Eyebrow labels for detail pages, keyed by their title copy.
 *
 * Detail pages borrow a parent PageData body, so without this they would all
 * inherit the parent's label and read as clones. Titles are unique today; an
 * unknown title falls back to the parent label, which is still correct.
 */
const detailLabels: Record<string, string> = {
  "Evidence for every important decision.": "Audit trail",
  "Trust the data before you act.": "Data quality",
  "Make risk signals useful.": "Fraud detection",
  "Route the right alert to the right owner.": "Real-time alerts",
  "Reconciliation with the full picture.": "Reconciliation",
  "Reports people can act on.": "Reporting",
  "See transaction flows as they change.": "Transaction monitoring",
  "Connect Airtel Money without losing context.": "Airtel Money",
  "Make bank settlement data useful.": "Bank rails",
  "Bring M-Pesa events into focus.": "M-Pesa (Daraja)",
  "Connect the point of sale.": "Point of sale",
  "Webhooks that respect delivery reality.": "Webhooks",
  "Access that matches responsibility.": "Access control",
  "Authentication teams can reason about.": "Authentication",
  "Compliance as an operating practice.": "Compliance",
  "Protect data in motion and at rest.": "Encryption",
  "Strong boundaries between tenants.": "Tenant isolation",
  "Controls that keep institutions moving.": "Financial institutions",
  "Scale payment operations with durable foundations.": "Fintechs",
  "Protect revenue across every channel.": "Merchants",
  "A clearer ledger for every member payment.": "SACCOs",
  "Incident history and communication.": "Incident history",
  "Cookies and local storage.": "Cookies",
  "Privacy, stated plainly.": "Privacy",
  "Terms for working together.": "Terms",
};

export function RoutePage({
  slug,
  title,
  description,
}: {
  slug: string;
  title?: string;
  description?: string;
}) {
  const base = pages[slug] ?? pages.product;
  const resolvedTitle = title ?? base.title;
  /**
   * Detail routes name their own title; the dedicated content modules carry
   * their own body, spec, FAQ and CTAs. Key order here matters: titles are
   * unique across the site, while `slug` is the parent page.
   */
  const detail =
    (title && (detailPages[title] ?? integrationDetails[title] ?? securityDetails[title] ?? solutionDetails[title])) ||
    undefined;
  const data = detail ?? base;
  const label = (title && detailLabels[title]) || detail?.label || base.label;

  return (
    <PageTemplate
      slug={slug}
      data={{ ...data, title: resolvedTitle, description: description ?? data.description, label }}
    />
  );
}
