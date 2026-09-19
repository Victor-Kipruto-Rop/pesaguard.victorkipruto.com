import { ArrowUpRight, Check } from "lucide-react";
import { pageMetadata } from "@/lib/seo/metadata";
import { pages } from "@/content/pages";
import { PageHero } from "@/components/sections/PageHero";
import { SectionShell } from "@/components/sections/SectionShell";
import { SectionHeading } from "@/components/sections/SectionHeading";
import { PillarGrid } from "@/components/sections/PillarGrid";
import { RelatedLinks } from "@/components/sections/RelatedLinks";
import { Button } from "@/components/ui/Button";
import { Reveal } from "@/components/ui/Reveal";

export const metadata = pageMetadata(
  "Security | PesaGuard",
  "Layered controls for sensitive financial data and the teams that operate it.",
  "/security",
);

const data = pages.security;

export default function Security() {
  return (
    <>
      <PageHero
        title={data.title}
        lede={data.lede ?? data.description}
        label="PesaGuard security"
        trail={[{ label: "Home", href: "/" }, { label: "Security", href: "/security" }]}
      />

      {data.pillars?.length ? (
        <SectionShell tone="sunken">
          <Reveal>
            <SectionHeading
              eyebrow="Controls"
              title="Four layers, reviewed together."
              body="Encryption, explicit identity, tenant boundaries and retained evidence — each one auditable."
            />
            <PillarGrid pillars={data.pillars} />
          </Reveal>
        </SectionShell>
      ) : null}

      {data.sections.map((section) => (
        <SectionShell key={section.title}>
          <div className="content-layout">
            <div className="content-main">
              <article className="content-section">
                <p className="eyebrow">{section.eyebrow ?? "Security posture"}</p>
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
            </div>
            <aside className="side-note side-note-ink">
              <span className="status-dot" />
              <strong>Security review welcome</strong>
              <p>
                Bring your questionnaire to the first call. We walk through encryption, isolation,
                access and audit evidence line by line.
              </p>
            </aside>
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
