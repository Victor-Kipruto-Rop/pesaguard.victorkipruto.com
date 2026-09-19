import { ArrowUpRight } from "lucide-react";
import { pageMetadata } from "@/lib/seo/metadata";
import { pages } from "@/content/pages";
import { PageHero } from "@/components/sections/PageHero";
import { SectionShell } from "@/components/sections/SectionShell";
import { SectionHeading } from "@/components/sections/SectionHeading";
import { Timeline } from "@/components/sections/Timeline";
import { RelatedLinks } from "@/components/sections/RelatedLinks";
import { Button } from "@/components/ui/Button";

export const metadata = pageMetadata(
  "About | PesaGuard",
  "PesaGuard builds the operational layer that makes digital payments dependable.",
  "/about",
);

const data = pages.about;

export default function About() {
  return (
    <>
      <PageHero
        title={data.title}
        lede={data.lede ?? data.description}
        label="About PesaGuard"
        trail={[{ label: "Home", href: "/" }, { label: "About", href: "/about" }]}
        status={{
          availability: "pilot",
          label: "MVP live with a pilot customer.",
          note: "Active payment scope: M-Pesa (Safaricom Daraja).",
        }}
      />

      <SectionShell>
        <div className="split">
          {data.sections.map((section, index) => (
            <div key={section.title}>
              <p className="eyebrow">
                {index === 0 ? "Mission" : "Approach"}
                <span aria-hidden="true" className="eyebrow-rule" />
              </p>
              <h2 className="display-3">{section.title}</h2>
              <p className="large-copy" style={{ marginTop: 16 }}>
                {section.body}
              </p>
            </div>
          ))}
        </div>
      </SectionShell>

      {data.timeline?.length ? (
        <SectionShell tone="sunken">
          <div className="split">
            <SectionHeading
              eyebrow="Trajectory"
              title="Shipped first, promised second."
              body="Rails are added only when adapters, tests and documentation exist."
            />
            <Timeline entries={data.timeline} />
          </div>
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
