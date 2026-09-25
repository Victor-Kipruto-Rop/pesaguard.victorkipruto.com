import Link from "next/link";
import { ArrowRight, ArrowUpRight, Check, Terminal } from "lucide-react";
import { apiBaseUrl, sampleIdempotencyKey } from "@/content/api-samples";
import { highlight } from "@/lib/docs/highlight";

const heroRequest = `curl -X POST "$PESAGUARD_API_URL/api/v1/transactions" \\
  -H "X-API-Key: $PESAGUARD_API_KEY" \\
  -H "Idempotency-Key: ${sampleIdempotencyKey}" \\
  -d '{"provider_transaction_id": "SAB1C2D3E4",
       "provider_account_id": "174379",
       "TransAmount": 2845.00}'`;

type Surface = {
  method?: "GET" | "POST";
  path: string;
  label: string;
  href: string;
  detail: string;
  state: "documented" | "unwired" | "internal";
};

const stateLabel: Record<Surface["state"], string> = {
  documented: "Documented",
  unwired: "Built, not wired",
  internal: "Not exposed",
};

const surface: Surface[] = [
  {
    method: "POST",
    path: "/api/v1/transactions",
    label: "Record a transaction",
    href: "/documentation/transactions",
    detail: "One idempotent write. The transaction, its event trail and its audit entry are stored together.",
    state: "documented",
  },
  {
    method: "GET",
    path: "/discrepancies",
    label: "Work the exceptions",
    href: "/documentation/discrepancies",
    detail: "Filter by severity and status, watch the SLA fields, then assign, annotate or resolve.",
    state: "documented",
  },
  {
    method: "GET",
    path: "/public/customers/{tenant_id}/reconciliations",
    label: "Read reconciliation results",
    href: "/documentation/discrepancies#customer-routes",
    detail: "A read-only, offset-paged view of a tenant’s outcomes, with a matching reports route.",
    state: "documented",
  },
  {
    method: "POST",
    path: "/webhooks",
    label: "Register a webhook",
    href: "/documentation/webhooks",
    detail: "HTTPS-only endpoints with signed payloads and retries. No product event is connected to it yet.",
    state: "unwired",
  },
  {
    path: "X-API-Key",
    label: "Authenticate",
    href: "/documentation/authentication",
    detail: "Tenant-scoped keys with a role and optional narrower scopes, or a bearer token for signed-in users.",
    state: "documented",
  },
  {
    path: "risk_score, risk_level",
    label: "Fraud assessments",
    href: "/documentation/fraud",
    detail: "A rules engine scores each transaction. Nothing returns those assessments over the API today.",
    state: "internal",
  },
];

const conventions: [string, string, string, string][] = [
  ["Idempotency", "Every write carries an Idempotency-Key. Repeat it and you get duplicate: true, not a second record.", "Read the rules", "/documentation/idempotency"],
  ["Tenancy", "A credential belongs to one tenant. Naming another tenant in a header or query returns 403.", "How access is scoped", "/documentation/authentication#tenancy"],
  ["Errors", "Four error shapes exist today, tied to four parts of the surface. Branch on the HTTP status first.", "See each shape", "/documentation/errors"],
  ["Tracing", "Send X-Correlation-ID and it comes back unchanged. Quote it when you ask for help.", "Tracing a request", "/documentation/errors#tracing"],
  ["Limits", "Token buckets with Retry-After on a 429. No per-tenant ingestion quota is published.", "Read the limits", "/documentation/rate-limits"],
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
              <span>Developer API / v1 / pilot</span>
            </div>
            <h1>{title}</h1>
            <p className="api-intro">{intro}</p>
            <div className="actions">
              <Link className="button button-primary" href="/documentation/getting-started">
                Send your first transaction <ArrowRight size={17} />
              </Link>
              <Link className="button button-api-quiet" href="/documentation">
                Browse the docs <ArrowUpRight size={16} />
              </Link>
            </div>
            <div className="api-proof">
              <span>
                <Check size={14} /> JSON over HTTPS
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
              <small>POST /api/v1/transactions</small>
            </div>
            <pre>
              <code>{highlight(heroRequest, "bash")}</code>
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
          <div>
            <span className="api-strip-label">Base URL</span>
            <span className="mono">{apiBaseUrl.replace("https://", "")}</span>
          </div>
          <div>
            <span className="api-strip-label">Auth</span>
            <span className="mono">X-API-Key</span>
          </div>
          <div>
            <span className="api-strip-label">Body</span>
            <span className="mono">application/json</span>
          </div>
        </div>
      </section>

      <section className="section api-section">
        <div className="container">
          <div className="api-section-heading">
            <div>
              <p className="eyebrow">The surface</p>
              <h2>What exists, and what state it is in.</h2>
            </div>
            <p>
              Each card links to a reference page written from the backend source. The label on a card says whether the
              thing is documented for use, built but not connected, or not exposed at all.
            </p>
          </div>
          <div className="endpoint-grid">
            {surface.map((item) => (
              <Link className="endpoint-card" href={item.href} key={item.label}>
                <div className="endpoint-top">
                  {item.method ? (
                    <span className={`method method-${item.method.toLowerCase()}`}>{item.method}</span>
                  ) : (
                    <span className="method">Field</span>
                  )}
                  <span className={`endpoint-state endpoint-state-${item.state}`}>{stateLabel[item.state]}</span>
                </div>
                <code>{item.path.replaceAll("/", "/\u200b")}</code>
                <strong>{item.label}</strong>
                <p>{item.detail}</p>
              </Link>
            ))}
          </div>
        </div>
      </section>

      <section className="section api-dark-section">
        <div className="container api-conventions">
          <div>
            <p className="eyebrow">Conventions</p>
            <h2>Rules that hold across the API.</h2>
            <p>
              These are the behaviours a client can rely on today. Where the API is inconsistent, the page says so rather
              than smoothing it over.
            </p>
          </div>
          <dl className="api-spec">
            {conventions.map(([term, description, linkLabel, href]) => (
              <div key={term}>
                <dt>{term}</dt>
                <dd>
                  {description}{" "}
                  <Link className="text-link api-text-link" href={href}>
                    {linkLabel} <ArrowRight size={14} />
                  </Link>
                </dd>
              </div>
            ))}
          </dl>
        </div>
      </section>
    </main>
  );
}
