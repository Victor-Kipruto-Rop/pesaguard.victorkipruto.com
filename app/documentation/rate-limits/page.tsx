import { DocsPage } from "@/app/_shared/DocsPage";
import { DocsTable } from "@/app/_shared/DocsTable";
import { Callout } from "@/components/documentation/blocks";
import { CodeBlock } from "@/components/ui/CodeBlock";
import { rateLimited } from "@/content/api-samples";
import { pageMetadata } from "@/lib/seo/metadata";

export const metadata = pageMetadata(
  "Rate limits | PesaGuard docs",
  "How PesaGuard rate limits work: token buckets, 429 responses and the headers that describe your remaining budget.",
  "/documentation/rate-limits",
);

export default function RateLimits() {
  return (
    <DocsPage
      slug="rate-limits"
      title="Rate limits"
      intro="Limits are enforced per endpoint with a token bucket. Where a limit applies, every response tells you how much budget is left."
      meta={[
        ["Algorithm", "Token bucket"],
        ["On exceed", "429 + Retry-After"],
        ["Window", "Per minute"],
      ]}
      sections={[
        {
          id: "how-it-works",
          title: "How the limiter works",
          body: (
            <>
              <p>
                Each limited endpoint holds a bucket of tokens that refills at a steady rate. A request spends a token. When
                the bucket is empty the request is refused with <code>429</code> until enough tokens have returned. Bursts up
                to the bucket size are allowed, which is why a short spike does not trip a limit that a sustained loop would.
              </p>
              <p>
                In a multi-worker deployment the buckets live in Redis so that all workers share one count. A single-process
                deployment keeps them in memory.
              </p>
            </>
          ),
        },
        {
          id: "who-is-counted",
          title: "Who is counted",
          body: (
            <p>
              A request that carries a user context is counted per user. Without one it is counted by tenant and client IP
              together when a tenant is known, and by client IP alone otherwise. Clients behind one shared address can
              therefore share an allowance.
            </p>
          ),
        },
        {
          id: "headers",
          title: "Response headers",
          body: (
            <>
              <DocsTable
                caption="Rate-limit headers"
                head={["Header", "Sent on", "Meaning"]}
                rows={[
                  [<code key="a">X-RateLimit-Limit</code>, "Limited endpoints", "Requests allowed per minute."],
                  [<code key="b">X-RateLimit-Remaining</code>, "Limited endpoints", "Tokens left right now. 0 on a 429."],
                  [<code key="c">X-RateLimit-Reset</code>, "429 responses", "Seconds until a request will succeed."],
                  [<code key="d">Retry-After</code>, "429 responses", "The same value, in the standard header."],
                ]}
              />
              <CodeBlock label="A refused request" language="http" code={rateLimited} />
            </>
          ),
        },
        {
          id: "published-limits",
          title: "Published limits",
          body: (
            <>
              <DocsTable
                caption="Limits documented today"
                head={["Surface", "Budget", "Cost per request"]}
                rows={[
                  ["Bulk assign", "5 tokens per minute", "1 token"],
                  ["Bulk escalate", "3 tokens per minute", "2 tokens"],
                  ["Daraja callbacks", "30 requests per minute per source IP by default; a deployment can change it", "1 request"],
                ]}
              />
              <p>
                The bulk endpoints charge more than one token, so <em>3 tokens at 2 per request</em> allows a single
                escalation followed by a wait, not three in a row.
              </p>
              <Callout title="No per-tenant quota is published for ingestion">
                <code>POST /api/v1/transactions</code> has no documented request quota. That is a statement about
                documentation, not a promise of unlimited throughput. If you plan sustained volume, tell us the expected
                rate before you go live.
              </Callout>
            </>
          ),
        },
        {
          id: "client-behaviour",
          title: "Behaving well",
          body: (
            <ul>
              <li>Read <code>Retry-After</code> on a 429 and sleep that long. Do not retry immediately.</li>
              <li>Add jitter to backoff so that many clients do not return at the same instant.</li>
              <li>Retry writes with the same <code>Idempotency-Key</code>. A retried write that had already succeeded is answered as a duplicate.</li>
              <li>Spread scheduled jobs across the minute rather than starting them all on :00.</li>
            </ul>
          ),
        },
      ]}
    />
  );
}
