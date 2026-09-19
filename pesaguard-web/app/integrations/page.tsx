import { ArrowUpRight } from "lucide-react";
import { pageMetadata } from "@/lib/seo/metadata";
import { pages } from "@/content/pages";
import { integrations } from "@/config/integrations";
import { PageHero } from "@/components/sections/PageHero";
import { SectionShell } from "@/components/sections/SectionShell";
import { SectionHeading } from "@/components/sections/SectionHeading";
import { AvailabilityBadge } from "@/components/ui/Badge";
import { RelatedLinks } from "@/components/sections/RelatedLinks";
import { Button } from "@/components/ui/Button";
import { Reveal } from "@/components/ui/Reveal";

export const metadata = pageMetadata(
  "Integrations | PesaGuard",
  "Connect the rails, channels and systems that matter to your operation.",
  "/integrations",
);

const data = pages.integrations;

export default function Integrations() {
  return (
    <>
      <PageHero
        title={data.title}
        lede={data.lede ?? data.description}
        label="PesaGuard integrations"
        trail={[{ label: "Home", href: "/" }, { label: "Integrations", href: "/integrations" }]}
      />

      <SectionShell tone="sunken">
        <Reveal>
          <SectionHeading
            eyebrow="Rails and channels"
            title="Live today, named for tomorrow."
            body="Every row states how far along support really is, with the evidence behind the claim."
          />
          <div className="status-board">
            {integrations.map((integration) => (
              <a className="status-row" href={integration.href} key={integration.href}>
                <strong>
                  <AvailabilityBadge availability={integration.availability} />
                  {integration.name}
                </strong>
                <span>{integration.summary}</span>
                <span className="badge badge-neutral">{integration.evidence.split("·")[0].trim()}</span>
              </a>
            ))}
          </div>
        </Reveal>
      </SectionShell>

      {data.sections.map((section) => (
        <SectionShell key={section.title}>
          <div className="split split-center">
            <div>
              <p className="eyebrow">
                {section.eyebrow ?? "Signal model"}
                <span aria-hidden="true" className="eyebrow-rule" />
              </p>
              <h2 className="display-3">{section.title}</h2>
            </div>
            <div>
              <p className="large-copy">{section.body}</p>
              {section.items ? (
                <ul className="check-list" style={{ marginTop: 24 }}>
                  {section.items.map((item) => (
                    <li key={item}>{item}</li>
                  ))}
                </ul>
              ) : null}
            </div>
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
