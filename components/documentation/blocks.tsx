import type { ReactNode } from "react";
import { Info, TriangleAlert } from "lucide-react";
import { cn } from "@/lib/utils/cn";

/** Note or warning set apart from the running text. */
export function Callout({
  title,
  tone = "note",
  children,
}: {
  title: string;
  tone?: "note" | "warn";
  children: ReactNode;
}) {
  const Icon = tone === "warn" ? TriangleAlert : Info;
  return (
    <aside className={cn("docs-callout", tone === "warn" && "docs-callout-warn")}>
      <Icon size={18} aria-hidden="true" />
      <div>
        <strong>{title}</strong>
        <p>{children}</p>
      </div>
    </aside>
  );
}

/** Numbered procedure. */
export function Steps({ steps }: { steps: { title: string; body: ReactNode }[] }) {
  return (
    <ol className="docs-steps">
      {steps.map((step) => (
        <li key={step.title}>
          <div>
            <strong>{step.title}</strong>
            {step.body}
          </div>
        </li>
      ))}
    </ol>
  );
}

/** Method, path and the facts a caller needs before reading the rest of the page. */
export function EndpointHeader({
  method,
  path,
  facts,
}: {
  method: "GET" | "POST" | "PUT" | "PATCH" | "DELETE";
  path: string;
  facts: [label: string, value: ReactNode][];
}) {
  return (
    <div className="endpoint-head">
      <div className="endpoint-line">
        <span className={`method method-${method.toLowerCase()}`}>{method}</span>
        <code>{path}</code>
      </div>
      <dl className="endpoint-facts">
        {facts.map(([label, value]) => (
          <div key={label}>
            <dt>{label}</dt>
            <dd>{value}</dd>
          </div>
        ))}
      </dl>
    </div>
  );
}

export type Param = {
  name: string;
  type: string;
  /** `true` renders "required"; a string renders that text (for conditional requirements). */
  required?: boolean | string;
  description: ReactNode;
};

/** Field-by-field reference for headers, query parameters and JSON bodies. */
export function ParamTable({ caption, params }: { caption: string; params: Param[] }) {
  return (
    <div className="table-wrap">
      <table className="data-table param-table">
        <caption>{caption}</caption>
        <thead>
          <tr>
            <th scope="col">Field</th>
            <th scope="col">Description</th>
          </tr>
        </thead>
        <tbody>
          {params.map((param) => (
            <tr key={param.name}>
              <td>
                <code>{param.name}</code>
                <span className="param-meta">
                  <span className="param-type">{param.type}</span>
                  {param.required ? (
                    <span className="param-flag">{typeof param.required === "string" ? param.required : "required"}</span>
                  ) : null}
                </span>
              </td>
              <td>{param.description}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
