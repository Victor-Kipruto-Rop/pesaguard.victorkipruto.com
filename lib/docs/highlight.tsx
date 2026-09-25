import type { ReactNode } from "react";

/**
 * Tiny server-side syntax highlighter for the languages the docs use.
 * It is deliberately small: it colours strings, numbers, keys, flags,
 * variables and comments, and leaves everything else as plain text.
 */

type Rule = { pattern: RegExp; className: (match: RegExpExecArray) => string | null };

function scan(source: string, rules: Rule[]): ReactNode[] {
  const combined = new RegExp(rules.map((rule) => `(${rule.pattern.source})`).join("|"), "gm");
  const nodes: ReactNode[] = [];
  let cursor = 0;
  let key = 0;
  let match: RegExpExecArray | null;

  while ((match = combined.exec(source)) !== null) {
    if (match[0] === "") {
      combined.lastIndex += 1;
      continue;
    }
    if (match.index > cursor) nodes.push(source.slice(cursor, match.index));
    const groupIndex = match.findIndex((value, index) => index > 0 && value !== undefined);
    const rule = rules[groupIndex - 1];
    const className = rule.className(match);
    nodes.push(
      className ? (
        <span className={className} key={key++}>
          {match[0]}
        </span>
      ) : (
        match[0]
      ),
    );
    cursor = match.index + match[0].length;
  }
  if (cursor < source.length) nodes.push(source.slice(cursor));
  return nodes;
}

const jsonRules: Rule[] = [
  { pattern: /"(?:\\.|[^"\\])*"(?=\s*:)/, className: () => "code-token-key" },
  { pattern: /"(?:\\.|[^"\\])*"/, className: () => "code-token-string" },
  { pattern: /-?\b\d+(?:\.\d+)?(?:[eE][+-]?\d+)?\b/, className: () => "code-token-number" },
  { pattern: /\b(?:true|false|null)\b/, className: () => "code-token-number" },
];

const bashRules: Rule[] = [
  { pattern: /#.*$/, className: () => "code-token-comment" },
  { pattern: /'[^']*'/, className: () => "code-token-string" },
  { pattern: /"(?:\\.|[^"\\])*"/, className: () => "code-token-string" },
  { pattern: /\$\{?[A-Za-z_][A-Za-z0-9_]*\}?/, className: () => "code-token-var" },
  { pattern: /(?<=\s)--?[A-Za-z][\w-]*/, className: () => "code-token-flag" },
  { pattern: /\b(?:curl|export)\b/, className: () => "code-token-key" },
];

const pythonRules: Rule[] = [
  { pattern: /#.*$/, className: () => "code-token-comment" },
  { pattern: /"""[\s\S]*?"""|'''[\s\S]*?'''/, className: () => "code-token-string" },
  { pattern: /f?"(?:\\.|[^"\\])*"|f?'(?:\\.|[^'\\])*'/, className: () => "code-token-string" },
  { pattern: /\b(?:import|from|def|return|if|else|elif|for|in|not|with|as|None|True|False|raise|try|except|while|and|or)\b/, className: () => "code-token-key" },
  { pattern: /\b\d+(?:\.\d+)?\b/, className: () => "code-token-number" },
];

const jsRules: Rule[] = [
  { pattern: /\/\/.*$/, className: () => "code-token-comment" },
  { pattern: /`(?:\\.|[^`\\])*`|"(?:\\.|[^"\\])*"|'(?:\\.|[^'\\])*'/, className: () => "code-token-string" },
  { pattern: /\b(?:const|let|var|await|async|function|return|if|else|import|from|new|throw|try|catch|for|of|in|true|false|null|undefined)\b/, className: () => "code-token-key" },
  { pattern: /\b\d+(?:\.\d+)?\b/, className: () => "code-token-number" },
];

function highlightHttp(source: string): ReactNode[] {
  const lines = source.split("\n");
  const nodes: ReactNode[] = [];
  const bodyStart = lines.findIndex((line) => line.trim().startsWith("{") || line.trim().startsWith("["));
  lines.forEach((line, index) => {
    const newline = index < lines.length - 1 ? "\n" : "";
    if (bodyStart !== -1 && index >= bodyStart) {
      nodes.push(...scan(line, jsonRules), newline);
      return;
    }
    const status = /^(HTTP\/[\d.]+)\s+(\d{3})(.*)$/.exec(line);
    if (status) {
      nodes.push(
        <span className="code-token-comment" key={`s${index}`}>{status[1]} </span>,
        <span className={status[2].startsWith("2") ? "code-token-status-ok" : "code-token-status-err"} key={`c${index}`}>
          {status[2]}
        </span>,
        status[3],
        newline,
      );
      return;
    }
    const request = /^(GET|POST|PUT|PATCH|DELETE)\s+(\S+)(.*)$/.exec(line);
    if (request) {
      nodes.push(<span className="code-token-key" key={`m${index}`}>{request[1]}</span>, " ", request[2], request[3], newline);
      return;
    }
    const header = /^([A-Za-z][A-Za-z0-9-]*)(:)(.*)$/.exec(line);
    if (header) {
      nodes.push(<span className="code-token-key" key={`h${index}`}>{header[1]}</span>, header[2], ...scan(header[3], bashRules), newline);
      return;
    }
    nodes.push(line, newline);
  });
  return nodes;
}

export function highlight(source: string, language?: string): ReactNode {
  switch (language) {
    case "json":
      return scan(source, jsonRules);
    case "bash":
    case "sh":
    case "shell":
      return scan(source, bashRules);
    case "python":
    case "py":
      return scan(source, pythonRules);
    case "javascript":
    case "js":
    case "node":
    case "typescript":
    case "ts":
      return scan(source, jsRules);
    case "http":
      return highlightHttp(source);
    default:
      return source;
  }
}
