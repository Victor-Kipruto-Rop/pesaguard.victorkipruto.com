import Link from "next/link";
import { ArrowRight, ArrowUpRight, Terminal } from "lucide-react";
import { pageMetadata } from "@/lib/seo/metadata";
import { softwareApplicationJsonLd } from "@/lib/seo/structured-data";
import { PipelineCanvas } from "@/components/home/PipelineCanvas";
import { LiveFeed } from "@/components/home/LiveFeed";
import { ReconciliationDemo } from "@/components/home/ReconciliationDemo";
import { ScrollStages } from "@/components/home/ScrollStages";
import { UseCaseTabs } from "@/components/home/UseCaseTabs";
import { DemoSwitcher } from "@/components/home/DemoSwitcher";
import { Reveal } from "@/components/ui/Reveal";
import "@/styles/homepage.css";

export const metadata = pageMetadata(
  "PesaGuard | Real-time reconciliation infrastructure",
  "PesaGuard gives financial teams real-time transaction reconciliation, anomaly detection, monitoring and alerts across their payment infrastructure.",
  "/",
);

const FAQ_ITEMS = [
  {
    question: "What is PesaGuard?",
    answer:
      "PesaGuard is real-time reconciliation infrastructure. It watches payment events as they arrive, matches them against your internal records, and raises exceptions and risk signals before they become disputes or losses.",
  },
  {
    question: "How does PesaGuard reconcile transactions?",
    answer:
      "Provider callbacks are validated, de-duplicated and matched against internal records using deterministic rules: amount, reference and timestamp tolerance. Every outcome keeps its evidence, and mismatches queue as exceptions with the reason attached.",
  },
  {
    question: "Which payment channels are supported?",
    answer:
      "M-Pesa (Safaricom Daraja) and outbound webhooks are live today. Airtel Money, bank rails and point-of-sale integrations are named on the roadmap but have no adapter yet. The integrations page keeps that boundary explicit.",
  },
  {
    question: "Does PesaGuard support M-Pesa?",
    answer:
      "Yes. M-Pesa via Safaricom Daraja is the active, tested scope: callbacks are received, validated, de-duplicated and matched in real time, with idempotency enforced at the database layer.",
  },
  {
    question: "Does PesaGuard support Airtel Money?",
    answer:
      "Not yet. There is no Airtel Money adapter, test suite or documentation today. We name it so the scope is unambiguous rather than implying support that does not exist.",
  },
  {
    question: "Does PesaGuard provide APIs?",
    answer:
      "Yes. The platform is API-first: documented endpoints with stable error shapes, bearer-token authentication, scoped access and signed outbound webhooks with retries and dead-letter handling.",
  },
  {
    question: "How does anomaly detection work?",
    answer:
      "Explicit rules and statistical checks score signals in context: amount deviation, velocity, duplicate references, timing and channel patterns. A score is a signal for review, never an automatic fraud verdict, and every decision stays traceable.",
  },
  {
    question: "How is transaction data protected?",
    answer:
      "Encryption in transit and at rest, bearer-token authentication with scoped access, role-based authorization, enforced tenant isolation and an append-only audit trail. Our committed load-test run recorded zero cross-tenant rows.",
  },
  {
    question: "Can PesaGuard support multiple organizations?",
    answer:
      "Yes. Multi-tenancy is enforced at the database layer, not just in application code. The committed load test exercised 100 tenants with zero cross-tenant rows observed.",
  },
  {
    question: "How does onboarding work?",
    answer:
      "PesaGuard is deployed with the pilot team so reconciliation matches your flow from day one. We start with one M-Pesa flow, then expand to more owners, history and workflows.",
  },
  {
    question: "How can I request a demo?",
    answer:
      "Use the contact form and tell us about your transaction volume and current reconciliation process. We will walk through what real-time matching and evidence-backed exceptions look like on your data.",
  },
];

const OBSERVABILITY = [
  { name: "Structured logs", note: "JSON logs with request, correlation and tenant IDs; sensitive values redacted.", state: "Shipped" },
  { name: "Metrics", note: "Prometheus metrics for latency, throughput, queues and per-engine timing.", state: "Shipped" },
  { name: "Traces", note: "OpenTelemetry instrumentation; export pipeline still being hardened.", state: "In progress" },
  { name: "Audit trail", note: "Append-only record of decisions, outcomes and configuration changes.", state: "Shipped" },
];

const SECURITY_LAYERS = [
  { name: "Authentication", note: "Bearer tokens with scopes and rotation for server-to-server access." },
  { name: "Authorization", note: "Role-based access control; permissions evaluated server-side." },
  { name: "Tenant isolation", note: "Isolation enforced at the database layer, with 0 cross-tenant rows in the committed load test." },
  { name: "Rate limiting", note: "Bounded, per-endpoint limits with backoff guidance for clients." },
  { name: "Encryption", note: "In transit and at rest, using established managed cryptography." },
  { name: "Audit logging", note: "Every consequential action recorded; nothing silently overridden." },
];
/** Rails and channels, used by the problem and monitoring sections. */
const CHANNELS = ["M-Pesa", "Airtel Money", "Banks", "POS", "Webhooks"];


export default function Home() {
  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(softwareApplicationJsonLd()) }} />
      <div className="pg-home">
        {/* 03 · Hero */}
        <section className="pg-hero">
          <div className="pg-container pg-hero-grid">
            <div>
              <p className="pg-eyebrow">Payment operations infrastructure</p>
              <h1>Know where every transaction stands.</h1>
              <p className="pg-lede">
                PesaGuard gives financial teams real-time transaction reconciliation, anomaly
                detection, monitoring and alerts across their payment infrastructure.
              </p>
              <div className="pg-hero-actions">
                <Link className="pg-btn pg-btn-primary" href="/contact/sales">
                  Request a demo
                </Link>
                <Link className="pg-btn pg-btn-ghost" href="/product">
                  Explore the platform
                  <ArrowRight aria-hidden="true" size={15} />
                </Link>
              </div>
              <Link
                className="pg-devlink"
                href="https://docs.pesaguard.victorkipruto.com"
                rel="noreferrer"
                target="_blank"
              >
                <Terminal aria-hidden="true" size={13} />
                Built for modern payment infrastructure. View API documentation
                <ArrowUpRight aria-hidden="true" size={12} />
              </Link>
            </div>
            <div className="pg-pipeline">
              <div className="pg-pipeline-head">
                <strong>PesaGuard</strong>
                <span>Transaction pipeline</span>
                <span className="pg-live">
                  <i aria-hidden="true" />
                  Live
                </span>
              </div>
              <PipelineCanvas />
              <div className="pg-pipeline-foot">
                <span>
                  Region <b>KE · Africa</b>
                </span>
                <span>
                  Idempotent <b>by write</b>
                </span>
                <span>
                  Evidence <b>append-only</b>
                </span>
              </div>
            </div>
          </div>
        </section>

        {/* 04 · Live transaction visualization */}
        <section className="pg-section-tight">
          <div className="pg-container">
            <Reveal>
              <LiveFeed />
            </Reveal>
          </div>
        </section>

        {/* 05 · Trust / infrastructure strip */}
        <section className="pg-trust">
          <div className="pg-container pg-trust-row">
            <div className="pg-trust-cell">
              <b>Real-time</b>
              <span>transaction processing</span>
            </div>
            <div className="pg-trust-cell">
              <b>Multi-channel</b>
              <span>payment data</span>
            </div>
            <div className="pg-trust-cell">
              <b>Auditable</b>
              <span>reconciliation</span>
            </div>
            <div className="pg-trust-cell">
              <b>API-first</b>
              <span>infrastructure</span>
            </div>
            <div className="pg-trust-cell">
              <b>Observable</b>
              <span>by design</span>
            </div>
          </div>
        </section>


        {/* 06 · Problem */}
        <section className="pg-section">
          <div className="pg-container">
            <Reveal>
              <div className="split split-center" style={{ marginBottom: "clamp(36px, 5vw, 64px)" }}>
                <div>
                  <p className="pg-eyebrow">The problem</p>
                  <h2 className="pg-h2">
                    Payment data moves fast. Reconciliation shouldn&apos;t move slowly.
                  </h2>
                  <p className="pg-lede">
                    Most teams still assemble the truth from exports, spreadsheets and chat threads,
                    long after the money moved.
                  </p>
                </div>
                <div className="pg-frag">
                  {CHANNELS.slice(0, 4).map((channel) => (
                    <div className="pg-frag-row" key={channel}>
                      <i aria-hidden="true" />
                      <span>{channel}</span>
                      <em>manual export</em>
                    </div>
                  ))}
                  {["SACCO system", "Spreadsheets", "Email threads"].map((source) => (
                    <div className="pg-frag-row" data-danger="true" key={source}>
                      <i aria-hidden="true" />
                      <span>{source}</span>
                      <em>manual matching</em>
                    </div>
                  ))}
                  <div className="pg-frag-foot">
                    <b>Fragmented</b> · each source arrives on its own schedule, in its own shape
                  </div>
                </div>
              </div>
            </Reveal>
          </div>
        </section>

        {/* 07 · PesaGuard solution */}
        <section className="pg-section" style={{ paddingTop: 0 }}>
          <div className="pg-container">
            <Reveal>
              <p className="pg-eyebrow">The PesaGuard solution</p>
              <h2 className="pg-h2">One operational layer for your transaction data.</h2>
              <p className="pg-lede" style={{ marginBottom: "clamp(30px, 4vw, 48px)" }}>
                Sources converge into a single pipeline. Hover a stage to see what it decides.
              </p>
              <div className="pg-stages">
                {[
                  ["Payment sources", "M-Pesa callbacks, internal records and partner events, authenticated on arrival."],
                  ["Ingestion", "Events persisted before processing; duplicates rejected by database-level idempotency."],
                  ["Validation", "Schema, currency, amount and reference rules run before anything is trusted."],
                  ["Reconciliation", "Deterministic matching pairs each callback with the record it belongs to."],
                  ["Risk analysis", "Velocity, deviation, duplicates and timing scored as review signals."],
                  ["Alerting", "Exceptions route to SMS, email, Slack and webhooks with severity and context."],
                  ["Reporting", "Reconciliation summaries and exception trends finance can trust."],
                ].map(([name, desc], index) => (
                  <div className="pg-stage" key={name}>
                    <span className="pg-stage-name">
                      <small>{String(index + 1).padStart(2, "0")}</small>
                      {name}
                    </span>
                    <p className="pg-stage-desc">{desc}</p>
                  </div>
                ))}
              </div>
            </Reveal>
          </div>
        </section>


        {/* 08 · Reconciliation engine */}
        <section
          className="pg-section"
          style={{ background: "var(--pg-base-2)", borderTop: "1px solid var(--pg-line)", borderBottom: "1px solid var(--pg-line)" }}
        >
          <div className="pg-container">
            <div className="split split-center">
              <div>
                <p className="pg-eyebrow">Reconciliation engine</p>
                <h2 className="pg-h2">Reconcile transactions as they happen.</h2>
                <p className="pg-lede">
                  Provider events are paired with internal records by amount, reference and
                  timestamp tolerance. Matches keep their evidence; differences become exceptions
                  your team can actually resolve.
                </p>
                <Link className="pg-devlink" href="/features/reconciliation" style={{ marginTop: 22 }}>
                  Explore reconciliation
                  <ArrowUpRight aria-hidden="true" size={12} />
                </Link>
              </div>
              <Reveal>
                <ReconciliationDemo />
              </Reveal>
            </div>
          </div>
        </section>

        {/* 09 · Real-time transaction monitoring */}
        <section className="pg-section">
          <div className="pg-container">
            <div className="split split-center">
              <div>
                <p className="pg-eyebrow">Transaction monitoring</p>
                <h2 className="pg-h2">See every transaction moving through your system.</h2>
                <p className="pg-lede">
                  Channels feed one operational surface. When a rail slows down or an exception
                  rate shifts, you see it while it is still cheap to fix.
                </p>
                <Link className="pg-devlink" href="/features/transaction-monitoring" style={{ marginTop: 22 }}>
                  Explore monitoring
                  <ArrowUpRight aria-hidden="true" size={12} />
                </Link>
              </div>
              <Reveal>
                <div className="pg-rails">
                  {CHANNELS.map((channel, index) => (
                    <div className="pg-rail" data-avail={index > 0 ? "false" : "true"} key={channel}>
                      <b>{channel}</b>
                      <span aria-hidden="true" className="pg-rail-track">
                        <i style={{ animationDelay: `${index * 0.7}s` }} />
                      </span>
                      <small>{index > 0 ? "Planned" : "Live"}</small>
                    </div>
                  ))}
                </div>
              </Reveal>
            </div>
          </div>
        </section>

        {/* 10 · Anomaly & fraud detection */}
        <section
          className="pg-section"
          style={{ background: "var(--pg-base-2)", borderTop: "1px solid var(--pg-line)", borderBottom: "1px solid var(--pg-line)" }}
        >
          <div className="pg-container">
            <div className="split split-center">
              <div>
                <p className="pg-eyebrow">Anomaly &amp; fraud detection</p>
                <h2 className="pg-h2">Find transactions that don&apos;t behave normally.</h2>
                <p className="pg-lede">
                  No black boxes. Explicit rules and statistical checks score signals in context.
                  A high score means a human should look. It is never an automatic verdict of fraud.
                </p>
                <Link className="pg-devlink" href="/features/fraud-detection" style={{ marginTop: 22 }}>
                  Explore fraud signals
                  <ArrowUpRight aria-hidden="true" size={12} />
                </Link>
              </div>
              <Reveal>
                <div className="pg-risk">
                  <div className="pg-signals">
                    {[
                      ["Amount deviation", "KES 45,000 · typical range KES 2,000–8,000", true],
                      ["Velocity spike", "14 transactions from one account in 6 minutes", true],
                      ["Duplicate reference", "REF-9918 seen 3× in the last hour", true],
                      ["Unusual timing", "First activity outside business hours", false],
                      ["Repeated failures", "5 failed validations, same endpoint", false],
                      ["Unexpected channel", "PayBill instead of usual till flow", false],
                    ].map(([label, detail, hot]) => (
                      <div className="pg-signal" data-hot={hot ? "true" : "false"} key={label as string}>
                        <span aria-hidden="true">{hot ? "▲" : "△"}</span>
                        <span>
                          {label}
                          <br />
                          <small style={{ color: "var(--pg-text-3)", fontSize: 11.5 }}>{detail}</small>
                        </span>
                        <em>{hot ? "Review" : "Watch"}</em>
                      </div>
                    ))}
                  </div>
                  <div className="pg-score">
                    <small>Risk score · a signal, not a verdict</small>
                    <div className="pg-score-row">
                      <strong className="pg-num">
                        82<span> / 100</span>
                      </strong>
                      <span className="pg-verdict-chip">High risk</span>
                    </div>
                    <div aria-hidden="true" className="pg-score-bar">
                      <i />
                    </div>
                  </div>
                </div>
              </Reveal>
            </div>
          </div>
        </section>

        {/* 11 · Intelligent alerts */}
        <section className="pg-section">
          <div className="pg-container">
            <div className="split split-center">
              <div>
                <p className="pg-eyebrow">Alerting</p>
                <h2 className="pg-h2">When something needs attention, PesaGuard tells you.</h2>
                <p className="pg-lede">
                  Alerts carry the reason, the severity and the transaction context, and route to
                  the channel your team actually watches. Delivery attempts, retries and
                  dead-letters are all observable.
                </p>
                <Link className="pg-devlink" href="/features/real-time-alerts" style={{ marginTop: 22 }}>
                  Explore alerts
                  <ArrowUpRight aria-hidden="true" size={12} />
                </Link>
              </div>
              <Reveal>
                <div className="pg-alert">
                  <div className="pg-alert-head">
                    <i aria-hidden="true" />
                    Anomaly detected
                  </div>
                  <div className="pg-alert-txn">
                    <strong className="pg-num">KES 45,000</strong>
                    <span>PayBill · REF-9918 · 10:21:22</span>
                  </div>
                  <div className="pg-alert-grid">
                    <div>
                      <small>Reason</small>
                      <span>Unusual transaction velocity</span>
                    </div>
                    <div>
                      <small>Severity</small>
                      <span style={{ color: "var(--pg-warn)" }}>High</span>
                    </div>
                  </div>
                  <div className="pg-channels">
                    {["Email", "SMS", "WhatsApp", "Webhook", "Dashboard"].map((channel, index) => (
                      <span className="pg-channel" data-firing={index < 2 ? "true" : "false"} key={channel}>
                        <i aria-hidden="true" />
                        {channel}
                      </span>
                    ))}
                  </div>
                </div>
              </Reveal>
            </div>
          </div>
        </section>

        {/* 12 · Multi-channel integrations */}
        <section
          className="pg-section"
          style={{ background: "var(--pg-base-2)", borderTop: "1px solid var(--pg-line)", borderBottom: "1px solid var(--pg-line)" }}
        >
          <div className="pg-container">
            <Reveal>
              <p className="pg-eyebrow">Integrations</p>
              <h2 className="pg-h2">Meet your payment stack where it is.</h2>
              <p className="pg-lede" style={{ marginBottom: "clamp(28px, 4vw, 44px)" }}>
                Live rails are labelled live. Everything else is labelled planned, never implied.
              </p>
              <div className="pg-integrations">
                {[
                  ["M-Pesa (Safaricom Daraja)", "Callbacks received, validated, de-duplicated and matched in real time.", "Live"],
                  ["Outbound webhooks", "Signed delivery with attempts, retries and a dead-letter path.", "Live"],
                  ["Airtel Money", "Named so the scope is unambiguous. No adapter, tests or docs exist yet.", "Planned"],
                  ["Bank rails", "Statement and settlement imports are out of today's scope.", "Planned"],
                  ["Point of sale", "In-store terminal feeds are not ingested today.", "Planned"],
                ].map(([name, detail, state]) => (
                  <Link className="pg-integration" href="/integrations" key={name}>
                    <b>{name}</b>
                    <span>{detail}</span>
                    <span className="pg-state" data-state={state === "Live" ? "matched" : "pending"}>
                      <i aria-hidden="true" />
                      {state}
                    </span>
                  </Link>
                ))}
              </div>
            </Reveal>
          </div>
        </section>

        {/* 13 · How PesaGuard works */}
        <section className="pg-section">
          <div className="pg-container">
            <Reveal>
              <p className="pg-eyebrow">How it works</p>
              <h2 className="pg-h2">From payment event to trusted record.</h2>
              <p className="pg-lede" style={{ marginBottom: "clamp(32px, 4vw, 56px)" }}>
                Eight stages, one continuous path. Scroll to follow a transaction through the system.
              </p>
            </Reveal>
            <ScrollStages />
          </div>
        </section>

        {/* 14 · Operations preview */}
        <section className="pg-section" style={{ paddingTop: 0 }}>
          <div className="pg-container">
            <Reveal>
              <p className="pg-eyebrow">Operations console</p>
              <h2 className="pg-h2">Your entire transaction operation, in one view.</h2>
              <p className="pg-lede" style={{ marginBottom: "clamp(28px, 4vw, 44px)" }}>
                Switch between the views your team works in every day: transactions,
                reconciliation, anomalies and reports.
              </p>
              <DemoSwitcher />
            </Reveal>
          </div>
        </section>

        {/* 15 · Data & observability */}
        <section
          className="pg-section"
          style={{ background: "var(--pg-base-2)", borderTop: "1px solid var(--pg-line)", borderBottom: "1px solid var(--pg-line)" }}
        >
          <div className="pg-container">
            <div className="split split-center">
              <div>
                <p className="pg-eyebrow">Data &amp; observability</p>
                <h2 className="pg-h2">Built to be observed, not just operated.</h2>
                <p className="pg-lede">
                  Metrics, logs and audit records are part of the system, not an afterthought.
                  Values are labelled by what has actually shipped today.
                </p>
              </div>
              <Reveal>
                <div className="pg-integrations">
                  {OBSERVABILITY.map((item) => (
                    <div className="pg-integration" key={item.name}>
                      <b>{item.name}</b>
                      <span>{item.note}</span>
                      <span className="pg-state" data-state={item.state === "Shipped" ? "matched" : "pending"}>
                        <i aria-hidden="true" />
                        {item.state}
                      </span>
                    </div>
                  ))}
                </div>
              </Reveal>
            </div>
          </div>
        </section>

        {/* 16 · Security architecture */}
        <section className="pg-section">
          <div className="pg-container">
            <div className="split split-center">
              <div>
                <p className="pg-eyebrow">Security architecture</p>
                <h2 className="pg-h2">Financial data requires more than a login screen.</h2>
                <p className="pg-lede">
                  Controls sit at every layer between the request and the record. Isolation is
                  enforced in the database, so application-code mistakes cannot leak one
                  organization&apos;s data into another&apos;s view.
                </p>
                <Link className="pg-devlink" href="/security" style={{ marginTop: 22 }}>
                  Review the security model
                  <ArrowUpRight aria-hidden="true" size={12} />
                </Link>
              </div>
              <Reveal>
                <div className="pg-signals">
                  {SECURITY_LAYERS.map((layer) => (
                    <div className="pg-signal" key={layer.name}>
                      <span aria-hidden="true">◆</span>
                      <span>
                        {layer.name}
                        <br />
                        <small style={{ color: "var(--pg-text-3)", fontSize: 11.5 }}>{layer.note}</small>
                      </span>
                      <em>Enforced</em>
                    </div>
                  ))}
                </div>
              </Reveal>
            </div>
          </div>
        </section>

        {/* 17 · Use cases */}
        <section
          className="pg-section"
          style={{ background: "var(--pg-base-2)", borderTop: "1px solid var(--pg-line)", borderBottom: "1px solid var(--pg-line)" }}
        >
          <div className="pg-container">
            <Reveal>
              <p className="pg-eyebrow">Use cases</p>
              <h2 className="pg-h2">Built around the teams moving money.</h2>
              <p className="pg-lede" style={{ marginBottom: "clamp(28px, 4vw, 44px)" }}>
                Choose an operation to see the workflow PesaGuard supports for it.
              </p>
              <UseCaseTabs />
            </Reveal>
          </div>
        </section>

        {/* 18 · Developer / API */}
        <section className="pg-section">
          <div className="pg-container">
            <div className="split split-center">
              <div>
                <p className="pg-eyebrow">Developers</p>
                <h2 className="pg-h2">Built for engineers, not around them.</h2>
                <p className="pg-lede">
                  An API-first platform with documented endpoints, stable error shapes, scoped
                  bearer tokens and signed outbound webhooks.
                </p>
                <div className="pg-hero-actions" style={{ marginTop: 24, marginBottom: 0 }}>
                  <Link className="pg-btn pg-btn-primary" href="/documentation">
                    Read the API docs
                  </Link>
                  <Link className="pg-btn pg-btn-ghost" href="/api">
                    Browse endpoints
                  </Link>
                </div>
              </div>
              <Reveal>
                <div className="pg-code">
                  <div className="pg-code-head">
                    <em>POST</em>
                    /v1/transactions
                    <span style={{ marginLeft: "auto" }}>application/json</span>
                  </div>
                  <pre>
                    {`{
  "reference": "TXN-8F3A",
  "amount": 5000,
  "currency": "KES",
  "channel": "mpesa"
}

// 202 Accepted
{
  "status": "accepted",
  "transaction_id": "txn_8f31...",
  "idempotent": false
}`}
                  </pre>
                </div>
              </Reveal>
            </div>
          </div>
        </section>

        {/* 19 · Metrics / proof */}
        <section
          className="pg-section"
          style={{ background: "var(--pg-base-2)", borderTop: "1px solid var(--pg-line)", borderBottom: "1px solid var(--pg-line)" }}
        >
          <div className="pg-container">
            <Reveal>
              <p className="pg-eyebrow">Load test results</p>
              <h2 className="pg-h2">Measured, then documented.</h2>
              <p className="pg-lede" style={{ marginBottom: "clamp(28px, 4vw, 44px)" }}>
                These are benchmark results from a committed load-test run, not customer
                adoption or production traffic.
              </p>
              <div className="pg-proof">
                <div className="pg-proof-cell">
                  <b className="pg-num">
                    100<span>K</span>
                  </b>
                  <small>Rows written · run</small>
                </div>
                <div className="pg-proof-cell">
                  <b className="pg-num">100</b>
                  <small>Tenants exercised</small>
                </div>
                <div className="pg-proof-cell">
                  <b className="pg-num">8</b>
                  <small>Concurrent workers</small>
                </div>
                <div className="pg-proof-cell">
                  <b className="pg-num">
                    3,113<span>/s</span>
                  </b>
                  <small>Write throughput</small>
                </div>
                <div className="pg-proof-cell">
                  <b className="pg-num">0</b>
                  <small>Errors · duplicates</small>
                </div>
                <div className="pg-proof-cell">
                  <b className="pg-num">0</b>
                  <small>Cross-tenant rows</small>
                </div>
              </div>
              <p className="pg-proof-note">
                Run ID LOAD-20260913-8e105384 · 100,000-row profile, SLO gates on write p95 &lt;
                250ms, error rate &lt; 0.1% and tenant isolation. Evidence lives in the{" "}
                <a href="https://github.com/Victor-Kipruto-Rop/pesaguard" rel="noreferrer" target="_blank">
                  source repository
                </a>
                . A benchmark is not customer adoption.
              </p>
            </Reveal>
          </div>
        </section>

        {/* 21 · FAQ */}
        <section className="pg-section">
          <div className="pg-container">
            <div className="split">
              <div>
                <p className="pg-eyebrow">Questions</p>
                <h2 className="pg-h2">Straight answers.</h2>
                <p className="pg-lede">
                  What ships today, what does not, and how the system behaves under load and
                  failure.
                </p>
              </div>
              <div className="pg-faq">
                {FAQ_ITEMS.map((item, index) => (
                  <details key={item.question} open={index === 0}>
                    <summary>{item.question}</summary>
                    <p>{item.answer}</p>
                  </details>
                ))}
              </div>
            </div>
          </div>
        </section>
      </div>

      {/* 22 · Final CTA */}
      <div className="pg-home">
        <section className="pg-cta">
          <div className="pg-container pg-cta-inner">
            <p className="pg-eyebrow">Make every transaction accountable</p>
            <h2>Know where every transaction stands.</h2>
            <p>
              Connect your payment channels, reconcile transactions in real time, and know when
              something needs attention.
            </p>
            <div className="pg-hero-actions" style={{ marginBottom: 0 }}>
              <Link className="pg-btn pg-btn-primary" href="/contact/sales">
                Request a demo
              </Link>
              <Link className="pg-btn pg-btn-ghost" href="/product">
                Explore the platform
                <ArrowRight aria-hidden="true" size={15} />
              </Link>
            </div>
          </div>
        </section>
      </div>
    </>
  );
}


