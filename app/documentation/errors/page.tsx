import Link from "next/link";
import { DocsPage } from "@/app/_shared/DocsPage";
import { DocsTable } from "@/app/_shared/DocsTable";

export default function Errors() {
  return (
    <DocsPage title="Errors" intro="Failures return a JSON body with an error field and an HTTP status code.">
      <section>
        <h2>Shape</h2>
        <p>
          The <code>error</code> field is either a short machine-readable code (authentication failures, which also
          add a <code>message</code>) or a plain sentence (request validation). Not every endpoint uses the same shape
          yet, so branch on the HTTP status first.
        </p>
      </section>
      <section>
        <h2>Create-transaction errors</h2>
        <DocsTable
          caption="Errors returned by POST /api/v1/transactions"
          head={["Status", "error"]}
          rows={[
            ["400", "Idempotency-Key header is required"],
            ["400", "X-Tenant-ID header is required"],
            ["400", "provider_transaction_id and provider_account_id are required"],
            ["403", "tenant access denied"],
            ["500", "transaction could not be persisted"],
          ]}
        />
        <p>
          Credential errors (401, 403, 503) are listed under <Link href="/documentation/authentication">Authentication</Link>.
        </p>
      </section>
    </DocsPage>
  );
}
