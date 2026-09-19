"use client";

import { useEffect, useRef, useState } from "react";
import { Reveal } from "@/components/ui/Reveal";

const STAGES = [
  {
    id: "connect",
    name: "Connect",
    title: "Attach your payment sources.",
    body: "Daraja callbacks, internal records and partner systems connect through signed webhooks and ingestion endpoints. Every source is authenticated, schema-checked and tied to a tenant from the first write.",
  },
  {
    id: "ingest",
    name: "Ingest",
    title: "Every event lands once — and only once.",
    body: "Events are persisted before processing, de-duplicated on write and queued durably. A replay or a provider retry never creates a second financial record.",
  },
  {
    id: "validate",
    name: "Validate",
    title: "Bad data is caught, not absorbed.",
    body: "Schema, currency, amount and reference rules run before anything is trusted. Invalid records are quarantined with the reason attached — never silently dropped.",
  },
  {
    id: "reconcile",
    name: "Reconcile",
    title: "Callbacks are matched to records in real time.",
    body: "Deterministic matching pairs each provider event with the internal record it belongs to. Mismatches become exceptions with the evidence your team needs to act.",
  },
  {
    id: "analyze",
    name: "Analyze",
    title: "Signals are scored in context.",
    body: "Velocity, amount deviation, duplicate references and timing patterns are checked against explicit rules. An anomaly is a signal to review — never an automatic verdict.",
  },
  {
    id: "alert",
    name: "Alert",
    title: "The right owner is told, quickly.",
    body: "Exceptions and review signals route to SMS, email, Slack and webhooks — with severity, reason and the transaction context attached.",
  },
  {
    id: "resolve",
    name: "Resolve",
    title: "Outcomes are decided and recorded.",
    body: "Reviewers accept, reject or escalate with a reason. Every decision lands in an append-only audit trail, so the why survives staff turnover.",
  },
  {
    id: "report",
    name: "Report",
    title: "Operations get a dependable picture.",
    body: "Reconciliation summaries, exception queues and trend reports close the loop — from raw event to a record finance can trust.",
  },
];

/**
 * Scroll-driven pipeline journey.
 *
 * The left rail mirrors the stages on the right; IntersectionObserver marks
 * the stage currently in view so the rail and the active heading stay in
 * agreement without any scroll-position arithmetic.
 */
export function ScrollStages() {
  const [active, setActive] = useState(0);
  const stageRefs = useRef<Array<HTMLElement | null>>([]);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        for (const entry of entries) {
          if (entry.isIntersecting) {
            const index = Number((entry.target as HTMLElement).dataset.index ?? "0");
            setActive(index);
          }
        }
      },
      { rootMargin: "-38% 0px -52% 0px", threshold: 0 },
    );

    for (const node of stageRefs.current) {
      if (node) observer.observe(node);
    }
    return () => observer.disconnect();
  }, []);

  return (
    <div className="pg-journey">
      <nav aria-label="Pipeline stages" className="pg-journey-rail">
        {STAGES.map((stage, index) => (
          <a
            className="pg-journey-step"
            data-active={active === index ? "true" : "false"}
            href={`#stage-${stage.id}`}
            key={stage.id}
          >
            <em>{String(index + 1).padStart(2, "0")}</em>
            <span>{stage.name}</span>
          </a>
        ))}
      </nav>
      <div className="pg-journey-body">
        {STAGES.map((stage, index) => (
          <Reveal key={stage.id}>
            <section
              className="pg-journey-stage"
              data-index={index}
              id={`stage-${stage.id}`}
              ref={(node) => {
                stageRefs.current[index] = node;
              }}
            >
              <small>
                Stage {String(index + 1).padStart(2, "0")} / {stage.name}
              </small>
              <h3>{stage.title}</h3>
              <p>{stage.body}</p>
            </section>
          </Reveal>
        ))}
      </div>
    </div>
  );
}
