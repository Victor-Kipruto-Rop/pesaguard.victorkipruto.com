import Link from "next/link";
import { DocsPage } from "@/app/_shared/DocsPage";
import { CodeBlock } from "@/components/ui/CodeBlock";
import { duplicateResponse, transactionRequest, transactionResponse } from "@/content/api-samples";

export default function GettingStarted() {
  return (
    <DocsPage title="Getting started" intro="Send your first transaction with a tenant-scoped API key.">
      <section>
        <h2>1. Get an API key</h2>
        <p>
          API keys are issued for your tenant by a user with the <code>manage:api_keys</code> permission. Each key
          starts with <code>pk_</code>, carries a role and scopes, and can be given an expiry. The full key is shown
          once, so store it in a secret manager.
        </p>
      </section>
      <section>
        <h2>2. Send a transaction</h2>
        <p>
          Set <code>PESAGUARD_API_URL</code> to the API host for your deployment and send the key in the{" "}
          <code>X-API-Key</code> header. Every write needs a unique <code>Idempotency-Key</code>.
        </p>
        <CodeBlock label="POST /api/v1/transactions" language="bash" code={transactionRequest} />
      </section>
      <section>
        <h2>3. Check the response</h2>
        <p>A first delivery returns <code>duplicate: false</code>.</p>
        <CodeBlock label="Response" language="http" code={transactionResponse} />
        <p>Repeating the request with the same key is recognised as a duplicate.</p>
        <CodeBlock label="Repeat with the same Idempotency-Key" language="json" code={duplicateResponse} />
      </section>
      <section>
        <h2>Next</h2>
        <ul>
          <li><Link href="/documentation/authentication">Authentication</Link> covers both credential types.</li>
          <li><Link href="/documentation/transactions">Transactions</Link> lists every header and field.</li>
          <li><Link href="/documentation/errors">Errors</Link> lists what failures look like.</li>
        </ul>
      </section>
    </DocsPage>
  );
}
