import type { ReactNode } from "react";
import { DocsLayout } from "@/components/documentation/DocsLayout";

/**
 * Shared shell for documentation pages. Each page supplies its own sections as
 * children so no page repeats generic filler.
 */
export function DocsPage({ title, intro, children }: { title: string; intro: string; children?: ReactNode }) {
  return (
    <DocsLayout title={title}>
      <p>{intro}</p>
      <div className="docs-body">{children}</div>
    </DocsLayout>
  );
}
