import { DocsPage } from "@/app/_shared/DocsPage";
import { DocsTable } from "@/app/_shared/DocsTable";
import { CodeBlock } from "@/components/ui/CodeBlock";
import { transactionRequest, transactionResponse } from "@/content/api-samples";

export default function Transactions() {
  return (
    <DocsPage title="Transactions" intro="Create one provider transaction under an explicit idempotency key.">
      <section>
        <h2>POST /api/v1/transactions</h2>
        <CodeBlock label="Request" language="bash" code={transactionRequest} />
        <CodeBlock label="Response" language="http" code={transactionResponse} />
      </section>
      <section>
        <h2>Headers</h2>
        <DocsTable
          caption="Request headers"
          head={["Header", "Required", "Notes"]}
          rows={[
            [<code key="a">X-API-Key</code>, "Yes", <>Or <code>Authorization: Bearer</code> with a JWT. See Authentication.</>],
            [<code key="b">Idempotency-Key</code>, "Yes", "Up to 255 characters. Reuse it only to retry the same transaction."],
            [<code key="c">X-Tenant-ID</code>, "Only without a tenant-scoped credential", "If sent with a tenant-scoped credential it must match, otherwise the request fails with 403."],
          ]}
        />
      </section>
      <section>
        <h2>Body</h2>
        <DocsTable
          caption="JSON body fields"
          head={["Field", "Required", "Notes"]}
          rows={[
            [<code key="a">provider_transaction_id</code>, "Yes", <>The provider’s own transaction ID. Daraja’s <code>TransID</code> is accepted as an alias.</>],
            [<code key="b">provider_account_id</code>, "Yes", <>The provider account or shortcode. Daraja’s <code>BusinessShortCode</code> is accepted as an alias.</>],
            [<code key="c">provider</code>, "No", <>Defaults to <code>mpesa</code>.</>],
          ]}
        />
      </section>
      <section>
        <h2>Responses</h2>
        <DocsTable
          caption="Response codes"
          head={["Status", "When"]}
          rows={[
            ["200", <>Accepted. <code key="a">duplicate</code> is <code key="b">true</code> when the Idempotency-Key was already processed.</>],
            ["400", "The Idempotency-Key or tenant header is missing, or a required body field is missing."],
            ["401 / 403", "Authentication failed, the credential lacks permission, or the tenant does not match."],
            ["500", "The transaction could not be persisted."],
          ]}
        />
        <p>Reading transactions back through the public API is not documented yet.</p>
      </section>
    </DocsPage>
  );
}
