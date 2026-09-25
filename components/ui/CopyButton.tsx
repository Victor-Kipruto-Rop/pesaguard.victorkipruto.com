"use client";

import { useState } from "react";

/** Copies a code sample. The only client-side code in the docs. */
export function CopyButton({ text }: { text: string }) {
  const [state, setState] = useState<"idle" | "copied" | "failed">("idle");

  async function copy() {
    try {
      await navigator.clipboard.writeText(text);
      setState("copied");
    } catch {
      setState("failed");
    }
    window.setTimeout(() => setState("idle"), 1800);
  }

  return (
    <button type="button" className="code-copy" onClick={copy} aria-label="Copy code to clipboard">
      <span aria-live="polite">{state === "copied" ? "Copied" : state === "failed" ? "Press Ctrl+C" : "Copy"}</span>
    </button>
  );
}
