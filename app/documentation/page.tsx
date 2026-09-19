import Link from "next/link";
import { DocsPage } from "@/app/_shared/DocsPage";
import { pageMetadata } from "@/lib/seo/metadata";

export const metadata = pageMetadata(
  "Documentation | PesaGuard",
  "Practical guidance for integrating, monitoring, and operating PesaGuard on your M-Pesa flow.",
  "/documentation",
);

export default function Documentation() {
  return (
    <DocsPage
      title="Documentation for payment operators."
      intro="Practical guidance for integrating, monitoring, and operating PesaGuard. Pages marked as not published yet say so plainly."
    >
      <section>
        <h2>Published</h2>
        <ul>
          <li><Link href="/documentation/getting-started">Getting started</Link>: send your first transaction.</li>
          <li><Link href="/documentation/authentication">Authentication</Link>: API keys and bearer tokens.</li>
          <li><Link href="/documentation/transactions">Transactions</Link>: the create-transaction endpoint.</li>
          <li><Link href="/documentation/errors">Errors</Link>: status codes and error bodies.</li>
        </ul>
      </section>
      <section>
        <h2>Not published yet</h2>
        <ul>
          <li><Link href="/documentation/reconciliation">Reconciliation</Link></li>
          <li><Link href="/documentation/fraud">Fraud signals</Link></li>
          <li><Link href="/documentation/webhooks">Webhooks</Link></li>
          <li><Link href="/documentation/rate-limits">Rate limits</Link></li>
          <li><Link href="/documentation/changelog">Changelog</Link></li>
        </ul>
      </section>
    </DocsPage>
  );
}
