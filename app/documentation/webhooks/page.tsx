import Link from "next/link";
import { DocsPage } from "@/app/_shared/DocsPage";
import { DocsTable } from "@/app/_shared/DocsTable";
import { Callout, EndpointHeader, ParamTable } from "@/components/documentation/blocks";
import { CodeBlock } from "@/components/ui/CodeBlock";
import {
  darajaAccepted,
  errorDaraja,
  escalationHeaders,
  escalationPayload,
  escalationRuleRequest,
  escalationVerify,
  webhookDeliveryHeaders,
  webhookListResponse,
  webhookRegisterRequest,
  webhookRegisterResponse,
  webhookVerify,
} from "@/content/api-samples";
import { pageMetadata } from "@/lib/seo/metadata";

export const metadata = pageMetadata(
  "Webhooks | PesaGuard docs",
  "How PesaGuard receives M-Pesa callbacks, and how tenants register, sign, retry and audit outbound webhook deliveries.",
  "/documentation/webhooks",
);

export default function Webhooks() {
  return (
    <DocsPage
      slug="webhooks"
      title="Webhooks"
      intro="Safaricom calls PesaGuard when money moves, and PesaGuard can call your systems when an incident is escalated. The first is live in the pilot. The second exists in two forms, and neither fires on its own yet."
      meta={[
        ["Inbound", "M-Pesa callbacks"],
        ["Outbound", "Escalation, manual trigger"],
        ["Signing", "HMAC-SHA256"],
      ]}
      sections={[
        {
          id: "inbound",
          title: "Inbound: M-Pesa callbacks",
          body: (
            <>
              <EndpointHeader
                method="POST"
                path="/webhook/mpesa/confirmation"
                facts={[
                  ["Purpose", "Records a completed C2B payment"],
                  ["Idempotent", "Yes, by transaction and account"],
                  ["On failure", "500, so Daraja retries"],
                ]}
              />
              <EndpointHeader
                method="POST"
                path="/webhook/mpesa/validation"
                facts={[
                  ["Purpose", "Pre-confirmation validation"],
                  ["Checks", "Payload shape only"],
                  ["On success", "ResultCode 0"],
                ]}
              />
              <p>
                You register these two URLs with Safaricom against the shortcode. Nothing on your side calls them. In the
                pilot deployment a callback is attributed to the tenant the deployment is configured for.
              </p>
            </>
          ),
        },
        {
          id: "inbound-checks",
          title: "What is checked before a callback is accepted",
          body: (
            <>
              <DocsTable
                caption="Checks, in the order they run"
                head={["Check", "On failure", "Status"]}
                rows={[
                  ["Body is within the size limit (1 MiB by default)", "Request body too large", "413"],
                  ["Source IP is on the allowlist", "Forbidden source", "403"],
                  ["Source is within the rate limit (30 per minute by default)", "Rate limit exceeded, with Retry-After", "429"],
                  ["When an X-Daraja-Signature header is sent, the HMAC matches", "Invalid signature", "403"],
                  ["Body is valid JSON with the fields Daraja documents", "Invalid payload; the body is dead-lettered", "400"],
                  ["Transaction and account not already recorded", "Accepted (duplicate ignored)", "200"],
                ]}
              />
              <p>
                Signatures are compared in constant time against the consumer secret held on the server. A payload that
                fails validation is written to a dead-letter store with the reason, so it can be inspected and replayed
                instead of lost.
              </p>
            </>
          ),
        },
        {
          id: "inbound-responses",
          title: "What PesaGuard answers",
          body: (
            <>
              <p>
                Callback responses use Daraja’s own shape, not the JSON errors used elsewhere in the API.{" "}
                <code>ResultCode</code> <code>0</code> means accepted; <code>1</code> means refused or failed.
              </p>
              <CodeBlock label="Accepted" language="json" code={darajaAccepted} />
              <CodeBlock label="Storage failed; Daraja should retry" language="json" code={errorDaraja} />
              <DocsTable
                caption="Outcome to response"
                head={["Outcome", "HTTP", "ResultCode", "Effect"]}
                rows={[
                  ["Recorded", "200", "0", "Transaction stored with its event trail."],
                  ["Already recorded", "200", "0", "Nothing written. Daraja stops retrying."],
                  ["Invalid payload", "400", "1", "Nothing stored. Dead-lettered."],
                  ["Storage failure", "500", "1", "Nothing stored. Daraja retries."],
                ]}
              />
              <p>
                A genuine storage failure returns <code>500</code> so that Daraja retries, and a benign duplicate returns{" "}
                <code>200</code> so that it stops. The two are never allowed to look alike: treating a failure as a duplicate
                would silently drop a real payment. The rules for what counts as the same transaction are on the{" "}
                <Link href="/documentation/idempotency">Idempotency</Link> page.
              </p>
            </>
          ),
        },
        {
          id: "outbound-status",
          title: "Outbound: what exists",
          body: (
            <>
              <Callout tone="warn" title="Nothing sends a webhook on its own yet">
                In the current backend source, a new discrepancy does not trigger any outbound webhook. Escalation webhooks
                are sent when someone escalates incidents in bulk. Registered endpoints have complete delivery machinery but
                no event is connected to it. Build against the formats below, and expect the triggers to change.
              </Callout>
              <DocsTable
                caption="The two outbound mechanisms"
                head={["", "Escalation webhook", "Registered endpoint"]}
                rows={[
                  ["Sent when", <>An operator calls <code key="a">POST /bulk/escalate</code> and a rule with action webhook matches</>, "Nothing calls it yet"],
                  ["Configured with", <><code key="b">POST /escalation-rules</code></>, <><code key="c">POST /webhooks</code></>],
                  ["Signature header", <code key="d">X-PesaGuard-Signature</code>, <code key="e">X-Webhook-Signature</code>],
                  ["Signing secret", "One secret for the deployment", "One secret per endpoint"],
                  ["Attempts", "One, 10 second timeout", "Up to 5, with backoff"],
                  ["Delivery log", "Result returned to the caller of bulk escalate", "Stored, readable per endpoint"],
                ]}
              />
            </>
          ),
        },
        {
          id: "escalation-webhooks",
          title: "Escalation webhooks",
          body: (
            <>
              <p>
                An escalation rule pairs a condition on an incident with an action. When the action is <code>webhook</code>,
                a matching incident is posted to the rule’s <code>webhook_url</code>. Conditions read fields such as{" "}
                <code>severity</code>, <code>anomaly_type</code>, <code>status</code> and <code>age_minutes</code>, with the
                operators <code>equals</code>, <code>not_equals</code>, <code>greater_than</code>, <code>less_than</code>,{" "}
                <code>contains</code> and <code>in</code>. Creating a rule needs the <code>write:escalation_rules</code>{" "}
                permission.
              </p>
              <CodeBlock label="Create a rule" language="bash" code={escalationRuleRequest} />
              <CodeBlock label="Delivery" language="http" code={escalationHeaders} />
              <CodeBlock label="Body" language="json" code={escalationPayload} />
              <p>
                The URL is held to the same HTTPS and private-address rules as registered endpoints, and redirects are not
                followed. There is one attempt with a 10 second timeout, and no retry, so treat a missed delivery as
                possible and reconcile against the discrepancies list.
              </p>
            </>
          ),
        },
        {
          id: "escalation-verify",
          title: "Verify an escalation webhook",
          body: (
            <>
              <p>
                The header is <code>sha256=&lt;hex&gt;</code>, an HMAC-SHA256 of the payload serialised with keys sorted and
                Python’s default separators. There is no timestamp in the signed text, so this scheme cannot detect a
                replayed request on its own. Deduplicate on <code>incident_id</code> and <code>timestamp</code>.
              </p>
              <CodeBlock label="Verification" language="python" code={escalationVerify} />
            </>
          ),
        },
        {
          id: "outbound-register",
          title: "Registered endpoints: register",
          body: (
            <>
              <Callout tone="warn" title="Not wired to any event yet">
                Registration works and deliveries would be signed, retried and logged as described below, but the dispatcher
                is not called by any part of the backend today. Use it to prepare a receiver.
              </Callout>
              <EndpointHeader
                method="POST"
                path="/webhooks"
                facts={[
                  ["Permission", "manage:webhooks"],
                  ["Success", "201 with the signing secret"],
                  ["Audited", "Yes, create_webhook"],
                ]}
              />
              <ParamTable
                caption="JSON body"
                params={[
                  { name: "tenant_id", type: "string", required: true, description: "Your tenant. Must be one the credential may act for." },
                  {
                    name: "url",
                    type: "string",
                    required: true,
                    description: "An HTTPS URL. See the rules below.",
                  },
                  {
                    name: "event_types",
                    type: "string[]",
                    description: (
                      <>
                        Events to subscribe to. Defaults to <code>{'["escalation"]'}</code>.
                      </>
                    ),
                  },
                  { name: "retry_attempts", type: "integer", description: "Attempts per delivery. Defaults to 3 and is capped at 5." },
                  { name: "timeout_seconds", type: "integer", description: "Per-attempt timeout. Defaults to 10 and is capped at 30." },
                ]}
              />
              <CodeBlock label="Request" language="bash" code={webhookRegisterRequest} />
              <CodeBlock label="201 Created" language="json" code={webhookRegisterResponse} />
              <p>
                The <code>signing_secret</code> begins with <code>whsec_</code> and appears only in this response. Store it
                immediately. Listing or updating a webhook never returns it again.
              </p>
            </>
          ),
        },
        {
          id: "outbound-urls",
          title: "Registered endpoints: URL rules",
          body: (
            <>
              <p>
                Registration and every delivery check the URL against server-side request forgery. A URL is refused with{" "}
                <code>400 invalid_webhook_url</code> and a <code>reason</code> when:
              </p>
              <DocsTable
                caption="Rejection reasons"
                head={["reason", "Cause"]}
                rows={[
                  [<code key="a">url_must_use_https</code>, "The scheme is not https."],
                  [<code key="b">url_missing_hostname</code>, "There is no host in the URL."],
                  [<code key="c">url_targets_reserved_hostname</code>, "The host is localhost or a cloud metadata address."],
                  [<code key="d">url_hostname_cannot_be_resolved</code>, "DNS lookup failed."],
                  [<code key="e">url_resolves_to_disallowed_address</code>, "The host resolves to a private, loopback or reserved address."],
                ]}
              />
              <p>
                The check runs again before each delivery, so a hostname that later starts pointing at a private address is
                not called. Redirects are never followed: a <code>3xx</code> response ends the delivery.
              </p>
            </>
          ),
        },
        {
          id: "outbound-delivery",
          title: "Registered endpoints: delivery",
          body: (
            <>
              <CodeBlock label="Headers on each delivery" language="http" code={webhookDeliveryHeaders} />
              <DocsTable
                caption="Delivery behaviour"
                head={["Aspect", "Behaviour"]}
                rows={[
                  ["Success", "Any 2xx response."],
                  ["Retry", "Timeouts, connection errors and non-2xx responses, up to retry_attempts."],
                  ["Backoff", "Wait 1, 2, 4, 8 seconds between attempts (doubling)."],
                  ["Give up", "After the last attempt the delivery is recorded as failed."],
                  ["Redirects", "Not followed; ends the delivery."],
                  ["Recorded", "Status, attempt count, response status, and the first 500 characters of your response body."],
                ]}
              />
              <p>Answer quickly with a 2xx and do the work afterwards. A slow receiver is retried as if it had failed.</p>
            </>
          ),
        },
        {
          id: "outbound-verify",
          title: "Registered endpoints: verify",
          body: (
            <>
              <p>
                <code>X-Webhook-Signature</code> has the form <code>t=&lt;unix seconds&gt;,v1=&lt;hex&gt;</code>. The digest
                is an HMAC-SHA256, keyed with your signing secret, of the string <code>{"{t}.{canonical_json}"}</code>.
              </p>
              <Callout title="Sign the canonical JSON, not the raw bytes">
                The signed text is the payload re-serialised with keys sorted and no whitespace, and with non-ASCII
                characters escaped as <code>\uXXXX</code>. Parse the body, serialise it that way, then compute the HMAC. A
                digest over the bytes you received will not match.
              </Callout>
              <CodeBlock label="Verification" language="python" code={webhookVerify} />
              <p>Reject signatures older than a few minutes so that a captured request cannot be replayed later.</p>
            </>
          ),
        },
        {
          id: "outbound-manage",
          title: "Registered endpoints: manage",
          body: (
            <>
              <DocsTable
                caption="Management routes"
                head={["Route", "Purpose", "Notes"]}
                rows={[
                  [<code key="a">GET /webhooks?tenant_id=</code>, "List endpoints", "Returns id, url, event_types, active, created_at."],
                  [<code key="b">PUT /webhooks/{"{id}"}</code>, "Change url, event_types, active, retry_attempts or timeout_seconds", "A new url goes through the same checks. The secret cannot be changed."],
                  [<code key="c">GET /webhooks/{"{id}"}/deliveries</code>, "Delivery history", "limit 1 to 200, default 50, newest first. Returns id, event_type, status, attempt_count, response_status, created_at, delivered_at."],
                ]}
              />
              <CodeBlock label="GET /webhooks" language="json" code={webhookListResponse} />
              <p>
                All routes require <code>manage:webhooks</code>, held by the <code>owner</code>, <code>admin</code> and{" "}
                <code>platform-admin</code> roles. Update and delivery history are scoped to the caller’s own tenant.
              </p>
            </>
          ),
        },
      ]}
    />
  );
}
