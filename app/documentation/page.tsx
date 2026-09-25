import Link from "next/link";
import { ArrowUpRight } from "lucide-react";
import { DocsPage } from "@/app/_shared/DocsPage";
import { apiBaseUrl } from "@/content/api-samples";
import { docsHref, docsNav } from "@/lib/docs/nav";
import { pageMetadata } from "@/lib/seo/metadata";

export const metadata = pageMetadata(
  "Documentation | PesaGuard",
  "Guides and reference for integrating with PesaGuard: authentication, transactions, discrepancies, webhooks and reconciliation.",
  "/documentation",
);

export default function Documentation() {
  return (
    <DocsPage
      slug=""
      title="Documentation"
      intro="How to send transactions to PesaGuard, work the exceptions it raises, and understand how it decides. Written from the source of the platform, so where something is not built yet the page says so."
      meta={[
        ["Base URL", apiBaseUrl],
        ["Version", "v1"],
        ["Stage", "Pilot"],
      ]}
    >
      {docsNav.map((group) => (
        <section key={group.title}>
          <h2>{group.title}</h2>
          <div className="docs-cards">
            {group.items.map((item) => (
              <Link className="docs-card" href={docsHref(item.slug)} key={item.slug}>
                <h3>{item.title}</h3>
                <p>{item.summary}</p>
              </Link>
            ))}
          </div>
        </section>
      ))}
      <section>
        <h2>Also useful</h2>
        <ul>
          <li>
            <Link href="/api">API overview</Link>, a one-page summary of what is available.
          </li>
          <li>
            <Link href="/status">Service status</Link>, the live health signal for this deployment.
          </li>
          <li>
            <Link href="/integrations">Integrations</Link>, what is live and what is only planned.
          </li>
          <li>
            <a href="https://github.com/Victor-Kipruto-Rop/pesaguard" rel="noreferrer" target="_blank">
              Source repository <ArrowUpRight size={13} aria-hidden="true" />
            </a>
          </li>
        </ul>
      </section>
    </DocsPage>
  );
}
