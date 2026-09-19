import Link from "next/link";
import { ArrowUpRight } from "lucide-react";
import { pageMetadata } from "@/lib/seo/metadata";
import { pages } from "@/content/pages";
import { PageHero } from "@/components/sections/PageHero";
import { SectionShell } from "@/components/sections/SectionShell";
import { SectionHeading } from "@/components/sections/SectionHeading";
import { RelatedLinks } from "@/components/sections/RelatedLinks";
import { Button } from "@/components/ui/Button";

export const metadata = pageMetadata(
  "Solutions | PesaGuard",
  "Purpose-built workflows for SACCOs, merchants, institutions and fintechs.",
  "/solutions",
);

const data = pages.solutions;

const audiences = [
  {
    href: "/solutions/saccos",
    tag: "01",
    title: "SACCOs",
    body: "Reconcile member collections, settlements and records with confidence.",
  },
  {
    href: "/solutions/merchants",
    tag: "02",
    title: "Merchants",
    body: "Make payment exceptions visible, actionable and easy to resolve.",
  },
  {
    href: "/solutions/financial-institutions",
    tag: "03",
    title: "Financial institutions",
    body: "Strengthen payment oversight without adding friction.",
  },
  {
    href: "/solutions/fintechs",
    tag: "04",
    title: "Fintechs",
    body: "Build the operational layer volume, rails and obligations demand.",
  },
];

export default function Solutions() {
  return (
    <>
      <PageHero
        title={data.title}
        lede={data.description}
        label="PesaGuard solutions"
        trail={[{ label: "Home", href: "/" }, { label: "Solutions", href: "/solutions" }]}
      />

      <SectionShell tone="sunken">
        <SectionHeading
          eyebrow="Who it serves"
          title="Built around the teams moving money."
          body="Four operating realities, one accountable system of record."
        />
        <div className="audience-grid">
          {audiences.map((audience) => (
            <Link className="audience-card" href={audience.href} key={audience.href}>
              <span aria-hidden="true" className="audience-count">
                {audience.tag}
              </span>
              <h3>{audience.title}</h3>
              <p>{audience.body}</p>
              <span className="audience-link text-link">
                See the fit
                <ArrowUpRight aria-hidden="true" size={16} />
              </span>
            </Link>
          ))}
        </div>
      </SectionShell>

      {data.sections.map((section) => (
        <SectionShell key={section.title}>
          <div className="split">
            <div>
              <p className="eyebrow">
                {section.eyebrow ?? "Operating rhythm"}
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
