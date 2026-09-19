import { ArrowUpRight } from "lucide-react";
import { pageMetadata } from "@/lib/seo/metadata";
import { pages } from "@/content/pages";
import { PageHero } from "@/components/sections/PageHero";
import { SectionShell } from "@/components/sections/SectionShell";
import { SectionHeading } from "@/components/sections/SectionHeading";
import { CapabilityList } from "@/components/sections/CapabilityList";
import { RelatedLinks } from "@/components/sections/RelatedLinks";
import { Button } from "@/components/ui/Button";
import { Reveal } from "@/components/ui/Reveal";

export const metadata = pageMetadata(
  "How it works | PesaGuard",
  "From Daraja callback to reconciled, evidenced record.",
  "/how-it-works",
);

const data = pages["how-it-works"];

export default function HowItWorks() {
  return (
    <>
      <PageHero
        title={data.title}
        lede={data.lede ?? data.description}
        label="How it works"
        trail={[{ label: "Home", href: "/" }, { label: "How it works", href: "/how-it-works" }]}
      />

      {data.steps?.length ? (
        <SectionShell tone="sunken">
          <Reveal>
            <SectionHeading
              eyebrow="The pipeline"
              title="Three moves, in order."
              body="Connect, understand, act. Each stage preserves the evidence the next one relies on."
            />
            <div className="flow-line">
              {data.steps.map((step) => (
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
      ) : null}

      {data.sections.length ? (
        <SectionShell>
          <SectionHeading eyebrow="In detail" title="What each stage guarantees." />
          <CapabilityList items={data.sections.map((section, index) => ({
            index: String(index + 1).padStart(2, "0"),
            title: section.title,
            body: section.body,
          }))} />
        </SectionShell>
      ) : null}

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
