import { pageMetadata } from "@/lib/seo/metadata";
import { faqJsonLd } from "@/lib/seo/structured-data";
import { pages } from "@/content/pages";
import { PageHero } from "@/components/sections/PageHero";
import { SectionShell } from "@/components/sections/SectionShell";
import { SectionHeading } from "@/components/sections/SectionHeading";
import { PricingGrid } from "@/components/sections/PricingGrid";
import { Faq } from "@/components/sections/Faq";
import { RelatedLinks } from "@/components/sections/RelatedLinks";
import { Button } from "@/components/ui/Button";
import { ArrowUpRight } from "lucide-react";

export const metadata = pageMetadata(
  "Pricing | PesaGuard",
  "Pilot, growth and institution plans scoped around M-Pesa volume, data sources and retention.",
  "/pricing",
);

const data = pages.pricing;

export default function Pricing() {
  return (
    <>
      {data.faq?.length ? (
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(faqJsonLd(data.faq)) }}
        />
      ) : null}

      <PageHero
        title={data.title}
        lede={data.lede ?? data.description}
        label="PesaGuard pricing"
        trail={[{ label: "Home", href: "/" }, { label: "Pricing", href: "/pricing" }]}
      />

      {data.plans?.length ? (
        <SectionShell tone="sunken">
          <SectionHeading
            eyebrow="Plans"
            title="Three ways to start."
            body="Every plan is deployed with the pilot team, so reconciliation matches your flow from day one."
          />
          <PricingGrid plans={data.plans} />
        </SectionShell>
      ) : null}

      {data.sections.map((section) => (
        <SectionShell key={section.title}>
          <div className="split split-center">
            <div>
              <p className="eyebrow">
                {section.eyebrow ?? "Commercial clarity"}
                <span aria-hidden="true" className="eyebrow-rule" />
              </p>
              <h2 className="display-3">{section.title}</h2>
            </div>
            <p className="large-copy">{section.body}</p>
          </div>
        </SectionShell>
      ))}

      {data.faq?.length ? (
        <SectionShell>
          <div className="split">
            <SectionHeading eyebrow="Questions" title="Asked and answered." />
            <Faq items={data.faq} />
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
