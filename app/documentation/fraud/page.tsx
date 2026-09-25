import { DocsPage } from "@/app/_shared/DocsPage";
import { DocsTable } from "@/app/_shared/DocsTable";
import { Callout } from "@/components/documentation/blocks";
import { pageMetadata } from "@/lib/seo/metadata";

export const metadata = pageMetadata(
  "Fraud signals | PesaGuard docs",
  "What PesaGuard's rules-based risk engine looks at, the levels and actions it produces, and what is not yet exposed through the API.",
  "/documentation/fraud",
);

export default function Fraud() {
  return (
    <DocsPage
      slug="fraud"
      title="Fraud signals"
      intro="PesaGuard scores each transaction for risk with a layered rules engine. This page describes what it looks at and what it produces. There is no endpoint that returns these assessments yet."
      meta={[
        ["Engine", "Rules-based"],
        ["Model version", "fraud-rules-v1"],
        ["API", "Not exposed"],
      ]}
      sections={[
        {
          id: "status",
          title: "Where this stands",
          body: (
            <Callout title="Internal to the platform today">
              The risk engine is part of the backend and its assessments are stored per transaction, but no public route
              reads them. Nothing here is a contract you can integrate against. It is documented so that the behaviour is
              understood, not because there is an API for it.
            </Callout>
          ),
        },
        {
          id: "signals",
          title: "What it looks at",
          body: (
            <>
              <p>
                Six features are computed for every transaction. Each is a number between 0 and 1, and they are combined
                with the outcome of a set of named rules to produce one score.
              </p>
              <DocsTable
                caption="Features"
                head={["Feature", "Question it answers"]}
                rows={[
                  ["transaction_frequency", "How often has this customer transacted recently?"],
                  ["amount_deviation", "How far is this amount from what this customer usually sends?"],
                  ["velocity", "How many transactions arrived in a short burst?"],
                  ["customer_history", "How much history is there to compare against? A new customer has little."],
                  ["tenant_baseline", "How far is this amount from the tenant’s typical transaction?"],
                  ["time_pattern", "Is the timing unusual for this customer or tenant?"],
                ]}
              />
              <p>
                Separately, an anomaly ruleset checks conditions such as unusually large amounts, delayed callbacks,
                off-hours activity and repeated transaction IDs. Its thresholds are set for the pilot and can be overridden
                per tenant.
              </p>
            </>
          ),
        },
        {
          id: "output",
          title: "What it produces",
          body: (
            <>
              <p>
                An assessment carries a <code>risk_score</code> from 0 to 1, a <code>risk_level</code>, a recommended{" "}
                <code>action</code>, the <code>reason_codes</code> and <code>rules_triggered</code> that explain it, the
                feature values, and the <code>model_version</code>.
              </p>
              <DocsTable
                caption="Levels and actions"
                head={["Risk level", "Score at or above", "Action"]}
                rows={[
                  [<code key="a">LOW</code>, "0", <code key="e">process</code>],
                  [<code key="b">MEDIUM</code>, "0.35", <code key="f">monitor</code>],
                  [<code key="c">HIGH</code>, "0.65", <code key="g">review</code>],
                  [<code key="d">CRITICAL</code>, "0.85", <code key="h">escalate</code>],
                ]}
              />
              <p>
                Every assessment lists the rules that fired, so an analyst can read why a transaction was flagged instead of
                trusting a bare number.
              </p>
            </>
          ),
        },
        {
          id: "limits",
          title: "What it is not",
          body: (
            <ul>
              <li>It is a rules engine, and its version string says so. It is not a trained model and makes no claim to learn from your data.</li>
              <li>The action is a recommendation. Nothing in the engine blocks a payment on M-Pesa; PesaGuard observes and flags.</li>
              <li>Scores are only as good as the history available. A new tenant or customer has thin baselines, so early scores lean on the rules.</li>
            </ul>
          ),
        },
      ]}
    />
  );
}
