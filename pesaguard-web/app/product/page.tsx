import { ArrowUpRight, Check } from "lucide-react";
import { pageMetadata } from "@/lib/seo/metadata";
import { pages } from "@/content/pages";
import { PageHero } from "@/components/sections/PageHero";
import { SectionShell } from "@/components/sections/SectionShell";
import { SectionHeading } from "@/components/sections/SectionHeading";
import { ComparisonTable } from "@/components/sections/ComparisonTable";
import { RelatedLinks } from "@/components/sections/RelatedLinks";
import { Button } from "@/components/ui/Button";
import { Reveal } from "@/components/ui/Reveal";

export const metadata = pageMetadata(
  "Product overview | PesaGuard",
  "What PesaGuard does today: real-time M-Pesa reconciliation, monitoring, risk signals and audit evidence. MVP live with a pilot customer.",
  "/product",
);

const data = pages.product;

export default function Product() {
  return (
    <>
      <PageHero
        title={data.title}
        lede={data.lede}
        label="PesaGuard product"
        trail={[{ label: "Home", href: "/" }, { label: "Product", href: "/product" }]}
        status={data.status}
        actions={
          <Button href="/contact/sales" trailing={<ArrowUpRight aria-hidden="true" size={17} />}>
            Talk to our team
          </Button>
        }
      />

      {/* Flow band: the payment path rendered as an editorial sequence */}
      <SectionShell tone="sunken">
        <Reveal>
          <div className="split flow-intro">
            <div>
              <p className="eyebrow">
                The operating layer
                <span aria-hidden="true" className="eyebrow-rule" />
              </p>
              <h2 className="display-3">From event to evidence.</h2>
            </div>
            <p className="large-copy">
              Every payment becomes a clear operational record, so teams move from uncertainty to
              action without losing the thread.
            </p>
          </div>
          <div className="flow-line">
            {data.steps?.map((step) => (
              <div className="flow-step" key={step.step}>
                <small>
                  {step.step} / {step.title}
                </small>
                <strong>{step.body}</strong>
                <p>{step.detail}</p>
              </div>
            ))}
          </div>
        </Reveal>
      </SectionShell>

      {/* Honest contrast on ink */}
      {data.comparison?.length ? (
        <SectionShell tone="ink">
          <SectionHeading
            eyebrow="Honest contrast"
            title="Scoped beats broad."
            body="Depth on one live rail today, with an architecture that admits what is not live yet."
          />
          <ComparisonTable rows={data.comparison} />
        </SectionShell>
      ) : null}

      {/* Prose sections with sticky aside */}
      <SectionShell>
        <div className="content-layout">
          <div className="content-main">
            {data.sections.map((section) => (
              <article className="content-section" key={section.title}>
                <p className="eyebrow">{section.eyebrow ?? "Product"}</p>
                <h2>{section.title}</h2>
                <p>{section.body}</p>
                {section.items ? (
                  <ul className="check-list">
                    {section.items.map((item) => (
                      <li key={item}>
                        <Check aria-hidden="true" size={16} />
                        {item}
                      </li>
                    ))}
                  </ul>
                ) : null}
              </article>
            ))}
          </div>
          <aside className="side-note side-note-ink">
            <span className="status-dot" />
            <strong>MVP, live with a pilot customer</strong>
            <p>
              Active payment scope: M-Pesa (Safaricom Daraja). Airtel Money, bank rails and POS are
              named so the boundary is unambiguous.
            </p>
          </aside>
        </div>
      </SectionShell>

      {/* Closing panel */}
      {data.cta ? (
        <SectionShell>
          <div className="panel panel-split ring-decoration closing-ring">
            <div style={{ maxWidth: "46ch", position: "relative" }}>
              <p className="eyebrow">{data.cta.eyebrow}</p>
              <h2>{data.cta.title}</h2>
              <p>{data.cta.body}</p>
            </div>
            <div className="actions">
              <Button href={data.cta.primary.href} trailing={<ArrowUpRight aria-hidden="true" size={17} />}>
                {data.cta.primary.label}
              </Button>
              {data.cta.secondary ? (
                <Button href={data.cta.secondary.href} variant="ghost-light">
                  {data.cta.secondary.label}
                </Button>
              ) : null}
            </div>
          </div>
        </SectionShell>
      ) : null}

      {data.related?.length ? (
        <SectionShell tone="sunken" tight>
          <SectionHeading eyebrow="Keep reading" title="Adjacent pages." />
          <RelatedLinks links={data.related} />
        </SectionShell>
      ) : null}
    </>
  );
}
