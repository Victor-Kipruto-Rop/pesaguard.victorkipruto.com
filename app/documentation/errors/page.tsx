import Link from "next/link";
import { DocsPage } from "@/app/_shared/DocsPage";
import { DocsTable } from "@/app/_shared/DocsTable";
import { Callout } from "@/components/documentation/blocks";
import { CodeBlock } from "@/components/ui/CodeBlock";
import { errorAuth, errorDaraja, errorIngest } from "@/content/api-samples";
import { pageMetadata } from "@/lib/seo/metadata";

export const metadata = pageMetadata(
  "Errors | PesaGuard docs",
  "Every error shape the PesaGuard API returns today, the codes in use, and how to decide whether to retry.",
  "/documentation/errors",
);

export default function Errors() {
  return (
    <DocsPage
      slug="errors"
      title="Errors"
      intro="The API is pilot-stage and does not yet return one uniform error envelope. There are four shapes, each tied to a part of the surface. Branch on the HTTP status first, then on the fields below."
      meta={[
        ["Format", "JSON"],
        ["Trace headers", "X-Correlation-ID, X-Request-ID"],
        ["Retry on", "429 and 5xx"],
      ]}
      sections={[
        {
          id: "shapes",
          title: "The four shapes",
          body: (
            <>
              <DocsTable
                caption="Error bodies by area"
                head={["Area", "Body", "Example"]}
                rows={[
                  ["Credentials and dashboard routes", <><code key="a">error</code> code plus <code key="b">message</code></>, <code key="c">invalid_api_key</code>],
                  ["POST /api/v1/transactions", <><code key="d">error</code> as a plain sentence</>, "Idempotency-Key header is required"],
                  ["Daraja callbacks", <><code key="e">ResultCode</code> and <code key="f">ResultDesc</code></>, "1, Temporary processing error"],
                  ["Login and token routes", <><code key="g">error</code> from a fixed taxonomy</>, <code key="h">missing_credentials</code>],
                ]}
              />
              <CodeBlock label="Credentials and dashboard routes" language="json" code={errorAuth} />
              <CodeBlock label="Transaction ingestion" language="json" code={errorIngest} />
              <CodeBlock label="Daraja callback" language="json" code={errorDaraja} />
            </>
          ),
        },
        {
          id: "taxonomy",
          title: "Code taxonomy",
          body: (
            <>
              <p>
                These codes come from the shared taxonomy used by the login and token routes, and most of them also appear
                on the dashboard routes.
              </p>
              <DocsTable
                caption="Error codes"
                head={["Code", "HTTP", "Meaning"]}
                rows={[
                  [<code key="1">missing_credentials</code>, "400", "The request has no username or password."],
                  [<code key="2">invalid_credentials</code>, "401", "The credentials did not authenticate."],
                  [<code key="3">not_authenticated</code>, "401", "The token is missing or expired."],
                  [<code key="4">missing_token</code>, "400", "The action needs a token value and none was sent."],
                  [<code key="5">invalid_request</code>, "400", "The payload is malformed or missing required fields."],
                  [<code key="6">invalid_parameter</code>, "400", "A query parameter is out of range or not an allowed value."],
                  [<code key="7">tenant_access_denied</code>, "403", "The caller has no access to the tenant it named."],
                  [<code key="8">tenant_context_required</code>, "403", "The credential resolved to no tenant."],
                  [<code key="9">insufficient_permissions</code>, "403", "The role lacks the required permission."],
                  [<code key="10">not_found</code>, "404", "The record does not exist for this tenant."],
                  [<code key="11">rate_limit_exceeded</code>, "429", "A rate limit was hit. Honour Retry-After."],
                  [<code key="12">internal_server_error</code>, "500", "Unexpected failure. Safe to retry writes that carry an Idempotency-Key."],
                ]}
              />
              <p>
                Authentication-specific codes (<code>invalid_api_key</code>, <code>invalid_token</code> and the rest) are
                listed on <Link href="/documentation/authentication#errors">Authentication</Link>.
              </p>
            </>
          ),
        },
        {
          id: "retrying",
          title: "What to retry",
          body: (
            <>
              <DocsTable
                caption="Retry guidance by status"
                head={["Status", "Retry", "Notes"]}
                rows={[
                  ["400, 401, 403, 404", "No", "The same request will fail the same way."],
                  ["429", "Yes", "Wait for Retry-After seconds, then retry."],
                  ["500, 502, 503, 504", "Yes", "Use exponential backoff with jitter. Reuse the Idempotency-Key on writes."],
                ]}
              />
              <Callout tone="warn" title="One 500 is not transient">
                Transaction ingestion returns 500 when the body fails amount, currency or provider validation, as well as when
                storage fails. Check those three fields before treating a 500 as a fault on our side.
              </Callout>
            </>
          ),
        },
        {
          id: "tracing",
          title: "Tracing a request",
          body: (
            <p>
              Responses carry <code>X-Correlation-ID</code> and, on the ingestion API, <code>X-Request-ID</code> and{" "}
              <code>X-Trace-ID</code>. Send your own <code>X-Correlation-ID</code> and it is returned unchanged; otherwise one
              is generated. Log it beside each call. It is the fastest way to find a specific request when you contact us.
            </p>
          ),
        },
      ]}
    />
  );
}
