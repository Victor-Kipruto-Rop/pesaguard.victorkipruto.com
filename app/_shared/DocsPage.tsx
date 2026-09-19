import { DocsLayout } from "@/components/documentation/DocsLayout";
import { CodeBlock } from "@/components/ui/CodeBlock";

export function DocsPage({ title, intro }: { title: string; intro: string }) {
  return (
    <DocsLayout title={title}>
      <p>{intro}</p>
      <h2>Overview</h2>
      <p>
        Use this guide to make payment operations predictable, observable, and easy to investigate. Examples are
        intentionally small so they can be adapted to your environment.
      </p>
      <CodeBlock label="Authorization header" language="http" code="Authorization: Bearer $PESAGUARD_API_KEY" />
    </DocsLayout>
  );
}
