import Link from "next/link";
import { DocsPage } from "@/app/_shared/DocsPage";
import { DocsTable } from "@/app/_shared/DocsTable";
import { Callout } from "@/components/documentation/blocks";
import { CodeBlock } from "@/components/ui/CodeBlock";
import { duplicateResponse, retryPython } from "@/content/api-samples";
import { pageMetadata } from "@/lib/seo/metadata";

export const metadata = pageMetadata(
  "Idempotency | PesaGuard docs",
  "How PesaGuard detects duplicate transactions, what counts as the same request, and how to retry safely.",
  "/documentation/idempotency",
);

export default function Idempotency() {
  return (
    <DocsPage
      slug="idempotency"
      title="Idempotency"
      intro="Networks drop responses and Daraja retries callbacks. PesaGuard is built so that seeing the same transaction twice is a normal event, recorded once."
      meta={[
        ["Header", "Idempotency-Key"],
        ["Scope", "Tenant + provider + key"],
        ["Max length", "255 characters"],
      ]}
      sections={[
        {
          id: "the-rule",
          title: "The rule",
          body: (
            <>
              <p>
                Send an <code>Idempotency-Key</code> with every write. The first request with a given key is recorded. Any
                later request with the same key, from the same tenant for the same provider, is answered as a duplicate and
                writes nothing.
              </p>
              <CodeBlock label="A repeated request" language="json" code={duplicateResponse} />
              <p>
                A duplicate is a success, not an error: it returns <code>200</code> so that a client that lost the first
                response can stop retrying.
              </p>
            </>
          ),
        },
        {
          id: "two-layers",
          title: "Two ways a duplicate is caught",
          body: (
            <>
              <DocsTable
                caption="Duplicate detection"
                head={["Check", "Catches", "Result"]}
                rows={[
                  [
                    "Idempotency record",
                    <>The same <code key="a">Idempotency-Key</code> for the same tenant and provider.</>,
                    <>Answered as <code key="b">duplicate: true</code> before anything is written.</>,
                  ],
                  [
                    "Unique constraint on the transaction",
                    "The same provider transaction ID and account arriving under a different key.",
                    <>The insert fails, PesaGuard confirms the transaction is already stored, and answers <code key="c">duplicate: true</code>.</>,
                  ],
                ]}
              />
              <p>
                The second check exists because a client can lose its key, and because Daraja can deliver the same callback
                twice. Either way the ledger holds one row.
              </p>
            </>
          ),
        },
        {
          id: "choosing-a-key",
          title: "Choosing a key",
          body: (
            <>
              <ul>
                <li>Generate the key when you create the payment in your own system, and store it with the payment. A retry then reuses it without any lookup.</li>
                <li>A UUID works. A stable business key such as <code>invoice-20418-attempt-1</code> works too, and is easier to trace.</li>
                <li>Do not derive the key from the time of the request. A retry a second later must send the same value.</li>
                <li>Keep it under 255 characters. An empty or longer key is rejected.</li>
              </ul>
              <Callout tone="warn" title="Bodies are not compared">
                PesaGuard stores a hash of the request but does not reject a reused key that arrives with a different body.
                It returns <code>duplicate: true</code> and discards the new body. Never reuse a key for a different
                transaction.
              </Callout>
            </>
          ),
        },
        {
          id: "retrying",
          title: "Retrying safely",
          body: (
            <>
              <p>
                Retry connection errors, timeouts, <code>429</code> and <code>5xx</code> responses with the{" "}
                <em>same</em> key and a growing delay. Do not retry other <code>4xx</code> responses, because they will not
                change. The one caution is <code>500</code>, which also covers a body that failed validation; see the note
                on <Link href="/documentation/transactions#errors">Transactions</Link>.
              </p>
              <CodeBlock label="Retry with backoff" language="python" code={retryPython} />
            </>
          ),
        },
        {
          id: "callbacks",
          title: "Daraja callbacks",
          body: (
            <p>
              The M-Pesa confirmation endpoint applies the same rules using a key derived from the callback payload, and it
              answers duplicates with <code>ResultCode: 0</code> so that Daraja stops retrying. Details are on the{" "}
              <Link href="/documentation/webhooks">Webhooks</Link> page.
            </p>
          ),
        },
      ]}
    />
  );
}
