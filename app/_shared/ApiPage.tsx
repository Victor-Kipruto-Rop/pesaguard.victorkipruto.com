import Link from "next/link";
import { ArrowRight, ArrowUpRight, Check, LockKeyhole, RefreshCw, Terminal } from "lucide-react";
import { sampleIdempotencyKey } from "@/content/api-samples";

type Endpoint = {
  /** Present only for endpoints that exist today. */
  method?: "POST";
  path?: string;
  label: string;
  href: string;
  detail: string;
};

const endpoints: Endpoint[] = [
  {
    method: "POST",
    path: "/api/v1/transactions",
    label: "Transactions",
    href: "/api/transactions",
    detail: "Send one provider transaction under an idempotency key.",
  },
  { label: "Reconciliation", href: "/api/reconciliation", detail: "No public endpoint yet." },
  { label: "Fraud signals", href: "/api/fraud", detail: "No public endpoint yet." },
  { label: "Webhooks", href: "/api/webhooks", detail: "No public configuration API yet." },
];

export function ApiPage({ title, intro }: { title: string; intro: string }) {
  return (
    <main className="api-page">
      <section className="api-hero">
        <div className="container api-hero-grid">
          <div>
            <div className="api-kicker">
              <span className="api-kicker-mark">
                <Terminal size={14} />
              </span>
              <span>Developer API / v1</span>
            </div>
            <h1>{title}</h1>
            <p className="api-intro">{intro}</p>
            <div className="actions">
              <Link className="button button-primary" href="/documentation/getting-started">
                Read the docs <ArrowRight size={17} />
              </Link>
              <Link className="button button-api-quiet" href="/contact/sales">
                Talk to engineering <ArrowUpRight size={16} />
              </Link>
            </div>
            <div className="api-proof">
              <span>
                <Check size={14} /> JSON
              </span>
              <span>
                <Check size={14} /> Idempotent writes
              </span>
              <span>
                <Check size={14} /> Tenant-scoped keys
              </span>
            </div>
          </div>
          <div className="api-code-card">
            <div className="api-code-top">
              <span>
                <i /> <i /> <i />
              </span>
              <small>request.sh</small>
              <span className="api-code-secure">
                <LockKeyhole size={12} /> secure
              </span>
            </div>
            <pre>
              <code>
                <span className="code-muted">curl</span> -X POST &quot;$PESAGUARD_API_URL/api/v1/transactions&quot; {"\\"}
                {"\n"}  -H <span className="code-lime">&quot;X-API-Key: $PESAGUARD_API_KEY&quot;</span> {"\\"}
                {"\n"}  -H <span className="code-lime">&quot;Idempotency-Key: {sampleIdempotencyKey}&quot;</span> {"\\"}
                {"\n"}  -H <span className="code-lime">&quot;Content-Type: application/json&quot;</span> {"\\"}
                {"\n"}  -d{" "}
                <span className="code-amber">
                  &apos;{"{"}&quot;provider_transaction_id&quot;: &quot;SAB1C2D3E4&quot;, &quot;provider_account_id&quot;: &quot;174379&quot;{"}"}&apos;
                </span>
              </code>
            </pre>
            <div className="api-code-response">
              <span className="response-status">
                <Check size={13} /> 200 OK
              </span>
              <span>duplicate: false</span>
            </div>
          </div>
        </div>
      </section>
      <section className="api-strip">
        <div className="container api-strip-inner">
          <span>Published today</span>
          <span>transaction ingestion</span>
          <span>API-key authentication</span>
          <span>idempotent writes</span>
        </div>
      </section>
      <section className="section api-section">
        <div className="container">
          <div className="api-section-heading">
            <div>
              <p className="eyebrow">Explore the surface</p>
              <h2>One endpoint today.</h2>
            </div>
            <p>The create-transaction endpoint is documented. The rest of the surface is not published yet.</p>
          </div>
          <div className="endpoint-grid">
            {endpoints.map((endpoint) => (
              <Link className="endpoint-card" href={endpoint.href} key={endpoint.label}>
                <div className="endpoint-top">
                  {endpoint.method ? (
                    <span className={`method method-${endpoint.method.toLowerCase()}`}>{endpoint.method}</span>
                  ) : (
                    <span className="method">Not published</span>
                  )}
                  <ArrowUpRight size={17} />
                </div>
                {endpoint.path ? <code>{endpoint.path}</code> : null}
                <strong>{endpoint.label}</strong>
                <p>{endpoint.detail}</p>
              </Link>
            ))}
          </div>
        </div>
      </section>
      <section className="section api-dark-section">
        <div className="container api-dark-grid">
          <div>
            <p className="eyebrow">What the API does today</p>
            <h2>Explicit about what happened.</h2>
            <p>
              Writes require an idempotency key, credentials are scoped to a tenant, and failures return a JSON error
              with an HTTP status.
            </p>
            <Link className="text-link api-text-link" href="/documentation">
              Browse documentation <ArrowRight size={16} />
            </Link>
          </div>
          <div className="api-control-list">
            <div>
              <span>
                <LockKeyhole size={17} />
              </span>
              <div>
                <strong>Scoped access</strong>
                <p>API keys belong to one tenant, carry a role and scopes, and can expire or be revoked.</p>
              </div>
            </div>
            <div>
              <span>
                <RefreshCw size={17} />
              </span>
              <div>
                <strong>Safe retries</strong>
                <p>Repeating a request with the same Idempotency-Key is reported as a duplicate.</p>
              </div>
            </div>
            <div>
              <span>
                <Terminal size={17} />
              </span>
              <div>
                <strong>Explicit errors</strong>
                <p>Failures return an error field, such as invalid_api_key or insufficient_permissions.</p>
              </div>
            </div>
          </div>
        </div>
      </section>
    </main>
  );
}
