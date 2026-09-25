import type { ReactNode } from "react";
import { DocsLayout, type DocsMeta, type DocsSectionSpec } from "@/components/documentation/DocsLayout";

/** Thin wrapper kept so every docs route reads the same. */
export function DocsPage({
  slug,
  title,
  intro,
  meta,
  sections,
  children,
}: {
  slug: string;
  title: string;
  intro: string;
  meta?: DocsMeta[];
  sections?: DocsSectionSpec[];
  children?: ReactNode;
}) {
  return (
    <DocsLayout slug={slug} title={title} intro={intro} meta={meta} sections={sections}>
      {children}
    </DocsLayout>
  );
}
