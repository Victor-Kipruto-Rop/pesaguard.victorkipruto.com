import type { ReactNode } from "react";
import { CopyButton } from "@/components/ui/CopyButton";
import { highlight } from "@/lib/docs/highlight";
import { cn } from "@/lib/utils/cn";

/**
 * Code sample, highlighted on the server. Only the copy button ships
 * JavaScript. `label` names the file or endpoint being shown; `language`
 * selects the highlighter and is shown as a small tag.
 */
export function CodeBlock({
  code,
  label,
  language,
  children,
  className,
  copy = true,
}: {
  /** Raw text of the sample. Use `children` if the sample is pre-tokenised. */
  code?: string;
  label?: string;
  language?: string;
  children?: ReactNode;
  className?: string;
  /** Set to false to hide the copy button (for output that is not meant to be pasted). */
  copy?: boolean;
}) {
  const raw = code ?? "";
  return (
    <figure className={cn("code-block", className)}>
      {label || language || copy ? (
        <figcaption className="code-label">
          {label ? <span>{label}</span> : null}
          {language ? <span className="mono-label">{language}</span> : null}
          {copy && raw ? <CopyButton text={raw} /> : null}
        </figcaption>
      ) : null}
      <pre>
        <code>{children ?? highlight(raw, language)}</code>
      </pre>
    </figure>
  );
}
