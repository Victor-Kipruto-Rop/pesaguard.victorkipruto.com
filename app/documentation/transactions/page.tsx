import Link from "next/link";
import { DocsPage } from "@/app/_shared/DocsPage";
import { DocsTable } from "@/app/_shared/DocsTable";
import { Callout, EndpointHeader, ParamTable } from "@/components/documentation/blocks";
import { CodeTabs } from "@/components/documentation/CodeTabs";
import { CodeBlock } from "@/components/ui/CodeBlock";
import {
  apiBaseUrl,
  errorIngest,
  nodeSend,
  pythonSend,
  transactionBody,
  transactionRequest,
  transactionResponse,
} from "@/content/api-samples";
import { pageMetadata } from "@/lib/seo/metadata";

export const metadata = pageMetadata(
  "Transactions API | PesaGuard docs",
  "POST /api/v1/transactions: required headers, body fields, validation rules, what is stored, and every response.",
  "/documentation/transactions",
);

export default function Transactions() {
  return (
    <DocsPage
      slug="transactions"
      title="Transactions"
      intro="Record one provider transaction. The write is atomic and idempotent: the transaction, its event trail and its idempotency record are stored together or not at all."
      meta={[
        ["Base URL", apiBaseUrl],
        ["Auth", "X-API-Key or bearer token"],
        ["Provider", "M-Pesa (Daraja)"],
      ]}
      sections={[
        {
          id: "endpoint",
          title: "Endpoint",
          body: (
            <>
              <EndpointHeader
                method="POST"
                path="/api/v1/transactions"
                facts={[
                  ["Auth", "X-API-Key or bearer token"],
                  ["Idempotency", "Idempotency-Key header, required"],
                  ["Success", "200 with duplicate true or false"],
                ]}
              />
              <p>
                The endpoint accepts a Daraja-shaped transaction from an authenticated tenant and records it through the
                same path as the M-Pesa confirmation callback, so a transaction has one storage shape however it arrives.
              </p>
            </>
          ),
        },
        {
          id: "headers",
          title: "Request headers",
          body: (
            <ParamTable
              caption="Headers"
              params={[
                {
                  name: "X-API-Key",
                  type: "string",
                  required: "one of two",
                  description: (
                    <>
                      An API key. Alternatively send <code>Authorization: Bearer</code> with a JWT. See{" "}
                      <Link href="/documentation/authentication">Authentication</Link>.
                    </>
                  ),
                },
                {
                  name: "Idempotency-Key",
                  type: "string, 1 to 255 chars",
                  required: true,
                  description: "Identifies this transaction to PesaGuard. Reuse it only to retry the same transaction.",
                },
                {
                  name: "X-Tenant-ID",
                  type: "string",
                  required: "conditional",
                  description:
                    "Needed only when the credential carries no tenant. When it does, the header is optional and must match, otherwise the call fails with 403.",
                },
                {
                  name: "X-Correlation-ID",
                  type: "string",
                  description: "Optional. Echoed back on the response so you can trace the call. One is generated if you omit it.",
                },
              ]}
            />
          ),
        },
        {
          id: "body",
          title: "Request body",
          body: (
            <>
              <ParamTable
                caption="JSON fields"
                params={[
                  {
                    name: "provider_transaction_id",
                    type: "string",
                    required: true,
                    description: (
                      <>
                        The provider’s own ID for the transaction. Daraja’s <code>TransID</code> is accepted in its place.
                      </>
                    ),
                  },
                  {
                    name: "provider_account_id",
                    type: "string",
                    required: true,
                    description: (
                      <>
                        The shortcode or account the money moved through. <code>BusinessShortCode</code> is accepted in its
                        place.
                      </>
                    ),
                  },
                  {
                    name: "TransAmount",
                    type: "number or string",
                    required: true,
                    description: "Greater than zero. Parsed as a decimal and rounded to two places, never as a float.",
                  },
                  {
                    name: "Currency",
                    type: "string",
                    description: (
                      <>
                        Three-letter ISO code, upper-cased on the way in. Defaults to <code>KES</code> when absent. The
                        lowercase key <code>currency</code> also works. An empty or malformed value is rejected.
                      </>
                    ),
                  },
                  {
                    name: "provider",
                    type: "string",
                    description: (
                      <>
                        Defaults to <code>mpesa</code>. M-Pesa is the only payment rail supported today.
                      </>
                    ),
                  },
                  {
                    name: "BillRefNumber",
                    type: "string",
                    description: (
                      <>
                        Your reference for the payment, such as an invoice number. <code>external_reference</code> is
                        accepted too. It is stored as the transaction’s external reference.
                      </>
                    ),
                  },
                  {
                    name: "MSISDN",
                    type: "string",
                    description: "Payer phone number. Stored as a keyed token, so it can be compared but not read back.",
                  },
                  {
                    name: "TransTime",
                    type: "string",
                    description: "Provider timestamp, for example 20260919101500 (Daraja’s YYYYMMDDHHmmss).",
                  },
                ]}
              />
              <CodeBlock label="Full body" language="json" code={transactionBody} />
              <p>Fields not listed here are kept with the raw payload but are not interpreted.</p>
            </>
          ),
        },
        {
          id: "example",
          title: "Example",
          body: (
            <CodeTabs
              id="transactions"
              label="POST /api/v1/transactions"
              tabs={[
                { id: "curl", title: "curl", language: "bash", code: transactionRequest },
                { id: "python", title: "Python", language: "python", code: pythonSend },
                { id: "node", title: "Node", language: "javascript", code: nodeSend },
              ]}
            />
          ),
        },
        {
          id: "response",
          title: "Response",
          body: (
            <>
              <CodeBlock label="200 OK" language="http" code={transactionResponse} />
              <DocsTable
                caption="Response fields"
                head={["Field", "Meaning"]}
                rows={[
                  [<code key="a">status</code>, <>Always <code>accepted</code> on success.</>],
                  [<code key="b">duplicate</code>, "true when this transaction was already recorded and nothing new was written."],
                  [<code key="c">idempotency_key</code>, "The key you sent."],
                ]}
              />
            </>
          ),
        },
        {
          id: "what-is-stored",
          title: "What a successful call writes",
          body: (
            <>
              <p>
                One database transaction records all of the following. If any part fails, none of it is kept.
              </p>
              <ul>
                <li>The transaction: provider, account, amount, currency, references and the raw payload.</li>
                <li>A <code>transaction.received</code> event, so the record has a state history from its first moment.</li>
                <li>An audit entry, <code>transaction.accepted</code>, with a hash of the payload.</li>
                <li>An idempotency record scoped to tenant, provider and key.</li>
                <li>An outbox entry that hands the transaction to downstream processing without a second, separate write.</li>
              </ul>
              <p>
                Phone numbers are stored as keyed tokens and sensitive values in the raw payload are encrypted, so a
                database read does not expose them.
              </p>
            </>
          ),
        },
        {
          id: "errors",
          title: "Errors",
          body: (
            <>
              <CodeBlock label="400 response" language="json" code={errorIngest} />
              <DocsTable
                caption="Responses other than 200"
                head={["Status", "error", "Cause"]}
                rows={[
                  ["400", "Idempotency-Key header is required", "The header is missing or blank."],
                  ["400", "X-Tenant-ID header is required", "The credential has no tenant and no header was sent."],
                  ["400", "provider_transaction_id and provider_account_id are required", "One of the two identifiers is missing."],
                  ["401", <code key="a">missing_auth_header</code>, "No credential. Other 401 codes are listed under Authentication."],
                  ["403", "tenant access denied", "X-Tenant-ID names a tenant other than the credential’s."],
                  ["500", "transaction could not be persisted", "See the note below."],
                ]}
              />
              <Callout tone="warn" title="Invalid amounts and currencies return 500 today">
                A missing or non-positive <code>TransAmount</code>, a malformed <code>Currency</code>, or an unrecognised{" "}
                <code>provider</code> is rejected during the write and currently surfaces as the same{" "}
                <code>500 transaction could not be persisted</code> as a storage failure. Validate these three fields before
                you send. A retry with the same body will fail the same way, so do not loop on a 500 without checking them
                first.
              </Callout>
            </>
          ),
        },
      ]}
    />
  );
}
