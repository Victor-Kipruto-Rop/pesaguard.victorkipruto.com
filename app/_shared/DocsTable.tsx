import type { ReactNode } from "react";

/** Small server-rendered table for docs pages, using the shared data-table styling. */
export function DocsTable({
  caption,
  head,
  rows,
  compact = false,
}: {
  caption: string;
  head: string[];
  rows: ReactNode[][];
  /** Tighter cells that never wrap, for wide comparison tables. */
  compact?: boolean;
}) {
  return (
    <div className="table-wrap">
      <table className={compact ? "data-table data-table-compact" : "data-table"}>
        <caption>{caption}</caption>
        <thead>
          <tr>
            {head.map((label) => (
              <th key={label} scope="col">
                {label}
              </th>
            ))}
          </tr>
        </thead>
        <tbody>
          {rows.map((row, index) => (
            <tr key={index}>
              {row.map((cell, cellIndex) => (
                <td key={cellIndex}>{cell}</td>
              ))}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
