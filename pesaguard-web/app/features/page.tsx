import { ArrowUpRight } from "lucide-react";
import { pageMetadata } from "@/lib/seo/metadata";
import { pages } from "@/content/pages";
import { PageHero } from "@/components/sections/PageHero";
import { SectionShell } from "@/components/sections/SectionShell";
import { SectionHeading } from "@/components/sections/SectionHeading";
import { FeatureGrid } from "@/components/sections/FeatureGrid";
import { RelatedLinks } from "@/components/sections/RelatedLinks";
import { Button } from "@/components/ui/Button";
import { Reveal } from "@/components/ui/Reveal";

export const metadata = pageMetadata(
  "Features | PesaGuard",
  "Reconciliation, monitoring, fraud signals, alerting, reporting and audit evidence.",
  "/features",
);

const data = pages.features;

export default function Features() {
  return (
    <>
      <PageHero
        title={data.title}
        lede={data.description}
        label="PesaGuard features"
        trail={[{ label: "Home", href: "/" }, { label: "Features", href: "/features" }]}
      />

      {data.features?.length ? (
        <SectionShell tone="sunken">
          <Reveal>
            <SectionHeading
              eyebrow="The toolkit"
              title="Six controls, one operating rhythm."
              body="Each control works alone; together they turn raw payment events into accountable outcomes."
            />
            <FeatureGrid items={data.features} />
          </Reveal>
        </SectionShell>
      ) : null}

      {data.sections.map((section) => (
        <SectionShell key={section.title}>
          <div className="split split-center">
            <div>
              <p className="eyebrow">
                {section.eyebrow ?? "A focused toolkit"}
                <span aria-hidden="true" className="eyebrow-rule" />
              </p>
              <h2 className="display-3">{section.title}</h2>
            </div>
            <p className="large-copy">{section.body}</p>
          </div>
        </SectionShell>
      ))}

      {data.related?.length ? (
        <SectionShell tone="sunken" tight>
          <SectionHeading eyebrow="Keep reading" title="Adjacent pages." />
          <RelatedLinks links={data.related} />
        </SectionShell>
      ) : null}

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
            </div>
          </div>
        </SectionShell>
      ) : null}
    </>
  );
}
