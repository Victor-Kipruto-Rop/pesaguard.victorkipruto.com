import Link from "next/link";
import { DocsPage } from "@/app/_shared/DocsPage";
import { DocsTable } from "@/app/_shared/DocsTable";
import { Callout, Steps } from "@/components/documentation/blocks";
import { CodeTabs } from "@/components/documentation/CodeTabs";
import { CodeBlock } from "@/components/ui/CodeBlock";
import {
  apiBaseUrl,
  duplicateResponse,
  nodeSend,
  pythonSend,
  transactionRequest,
  transactionResponse,
} from "@/content/api-samples";
import { pageMetadata } from "@/lib/seo/metadata";

export const metadata = pageMetadata(
  "Getting started | PesaGuard docs",
  "Create an API key, send a transaction to PesaGuard, and confirm it was recorded exactly once.",
  "/documentation/getting-started",
);

export default function GettingStarted() {
  return (
    <DocsPage
      slug="getting-started"
      title="Getting started"
      intro="Create an API key, send one transaction, then send it again to see the duplicate handling. About ten minutes."
      meta={[
        ["Base URL", apiBaseUrl],
        ["Auth", "X-API-Key"],
        ["Body", "application/json"],
      ]}
      sections={[
        {
          id: "before-you-start",
          title: "Before you start",
          body: (
            <>
              <ul>
                <li>A tenant on the PesaGuard pilot. API access is limited to pilot customers at the moment.</li>
                <li>
                  A user who holds the <code>manage:api_keys</code> permission. The <code>owner</code>, <code>admin</code>{" "}
                  and <code>platform-admin</code> roles do.
                </li>
                <li>
                  A shell with <code>curl</code>, or Python 3 with <code>requests</code>, or Node 18 or later.
                </li>
              </ul>
              <Callout title="Use a key you can throw away">
                Create the first key with a short expiry (keys can live from 1 to 3,650 days). The full key is shown once,
                at creation, and only its hash is stored, so a lost key is replaced rather than recovered.
              </Callout>
            </>
          ),
        },
        {
          id: "configure",
          title: "Set two environment variables",
          body: (
            <>
              <p>
                The examples on this page read the host and the key from the environment so that neither ends up in shell
                history or source control.
              </p>
              <CodeBlock
                label="Shell"
                language="bash"
                code={`export PESAGUARD_API_URL="${apiBaseUrl}"\nexport PESAGUARD_API_KEY="pk_..."`}
              />
            </>
          ),
        },
        {
          id: "send",
          title: "Send a transaction",
          body: (
            <>
              <p>
                Each request needs three things: your key in <code>X-API-Key</code>, a unique{" "}
                <code>Idempotency-Key</code>, and a JSON body that carries at least the provider transaction ID, the
                provider account and the amount. The amount field keeps its Daraja name, <code>TransAmount</code>.
              </p>
              <CodeTabs
                id="send"
                label="POST /api/v1/transactions"
                tabs={[
                  { id: "curl", title: "curl", language: "bash", code: transactionRequest },
                  { id: "python", title: "Python", language: "python", code: pythonSend },
                  { id: "node", title: "Node", language: "javascript", code: nodeSend },
                ]}
              />
            </>
          ),
        },
        {
          id: "read-the-response",
          title: "Read the response",
          body: (
            <>
              <p>
                A recorded transaction returns <code>200</code> with <code>duplicate: false</code>. The{" "}
                <code>idempotency_key</code> in the body is the one you sent, echoed back so that you can log it.
              </p>
              <CodeBlock label="Response" language="http" code={transactionResponse} />
              <p>
                Every response also carries an <code>X-Correlation-ID</code> header. Quote it when you ask for help with a
                specific request.
              </p>
            </>
          ),
        },
        {
          id: "send-it-again",
          title: "Send it again",
          body: (
            <>
              <p>
                Repeat the exact same request. Nothing new is written, and the body tells you so. This is the behaviour your
                retry logic relies on, so it is worth seeing once by hand.
              </p>
              <CodeBlock label="Second response, same Idempotency-Key" language="json" code={duplicateResponse} />
              <p>
                The full rules, including what happens when the same transaction arrives under a different key, are on the{" "}
                <Link href="/documentation/idempotency">Idempotency</Link> page.
              </p>
            </>
          ),
        },
        {
          id: "handle-failures",
          title: "Decide what to retry",
          body: (
            <>
              <DocsTable
                caption="What a client should do with each outcome"
                head={["Outcome", "Retry?", "Why"]}
                rows={[
                  ["200", "No", "Recorded. Check duplicate if you need to know whether this call was the first."],
                  ["400", "No", "A required header or field is missing. Fix the request."],
                  ["401 / 403", "No", "Credential or tenant problem. Retrying the same request returns the same answer."],
                  ["429", "Yes, after Retry-After", "You are over a rate limit. Wait for the number of seconds in the header."],
                  ["500", "Yes, with the same key, a few times", "Storage failed, or the body failed validation. See the note on the Transactions page."],
                  ["Timeout", "Yes, with the same key", "You do not know whether the write happened. The key makes a retry safe."],
                ]}
              />
            </>
          ),
        },
        {
          id: "next",
          title: "Where to go next",
          body: (
            <Steps
              steps={[
                {
                  title: "Read the transaction reference",
                  body: (
                    <p>
                      <Link href="/documentation/transactions">Transactions</Link> lists every field, what is validated and
                      what is stored.
                    </p>
                  ),
                },
                {
                  title: "Work the exceptions",
                  body: (
                    <p>
                      <Link href="/documentation/discrepancies">Discrepancies</Link> covers listing, assigning and resolving
                      the mismatches reconciliation finds.
                    </p>
                  ),
                },
                {
                  title: "Understand the outcomes",
                  body: (
                    <p>
                      <Link href="/documentation/reconciliation">Reconciliation</Link> explains the order in which a
                      transaction is matched and why it lands in each status.
                    </p>
                  ),
                },
              ]}
            />
          ),
        },
      ]}
    />
  );
}
