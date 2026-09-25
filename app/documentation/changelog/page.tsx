import { DocsPage } from "@/app/_shared/DocsPage";
import { Callout } from "@/components/documentation/blocks";
import { siteConfig } from "@/config/site";
import { pageMetadata } from "@/lib/seo/metadata";

export const metadata = pageMetadata(
  "Changelog and versioning | PesaGuard docs",
  "How PesaGuard versions its API, the deprecation policy it commits to, and where changes are recorded today.",
  "/documentation/changelog",
);

export default function Changelog() {
  return (
    <DocsPage
      slug="changelog"
      title="Changelog and versioning"
      intro="There is no dated release log yet. This page states the versioning rules the project works to, and where to look for changes in the meantime."
      meta={[
        ["Version", "v1"],
        ["Deprecation notice", "90 days minimum"],
        ["Stage", "Pilot"],
      ]}
      sections={[
        {
          id: "versioning",
          title: "How the API is versioned",
          body: (
            <>
              <p>
                The integration API lives under <code>/api/v1</code>. The stated policy in the repository is that a version
                stays supported for at least 90 days after a deprecation notice is published, that a breaking change gets a
                new versioned route prefix rather than changing an existing one, and that deprecations are announced in
                release notes and in the OpenAPI spec.
              </p>
              <p>
                Some dashboard routes, such as <code>/discrepancies</code>, do not carry a version prefix yet. Their shape
                can change without the notice period above.
              </p>
            </>
          ),
        },
        {
          id: "what-counts",
          title: "What counts as breaking",
          body: (
            <ul>
              <li>Removing or renaming a field, header or endpoint.</li>
              <li>Changing the type or meaning of an existing field.</li>
              <li>Making an optional request field required.</li>
            </ul>
          ),
        },
        {
          id: "not-breaking",
          title: "What does not",
          body: (
            <>
              <ul>
                <li>Adding a new endpoint, optional field or response field. Read the fields you need by name and ignore the rest.</li>
                <li>Adding a new error code. Treat an unknown code as its HTTP status.</li>
                <li>Adding a new enum value. Do not assume the set of <code>status</code> or <code>severity</code> values is closed.</li>
              </ul>
            </>
          ),
        },
        {
          id: "where-to-look",
          title: "Where changes are recorded today",
          body: (
            <Callout title="The commit history is the record">
              Until a dated changelog exists, changes are visible in the{" "}
              <a href={siteConfig.repository} rel="noreferrer" target="_blank">
                source repository
              </a>
              . {siteConfig.maturity}
            </Callout>
          ),
        },
      ]}
    />
  );
}
