import type { ReactNode } from "react";
import Link from "next/link";
import { ArrowLeft, ArrowRight, ArrowUpRight } from "lucide-react";
import { siteConfig } from "@/config/site";
import { docsHref, docsNav, docsNeighbours, docsPages } from "@/lib/docs/nav";

export type DocsMeta = [label: string, value: string];
export type DocsSectionSpec = { id: string; title: string; body: ReactNode };

function DocsNav({ slug }: { slug: string }) {
  return (
    <nav className="docs-nav" aria-label="Documentation">
      <div className="docs-nav-group">
        <Link href={docsHref("")} aria-current={slug === "" ? "page" : undefined}>
          Overview
        </Link>
      </div>
      {docsNav.map((entry) => (
        <div className="docs-nav-group" key={entry.title}>
          <p className="docs-nav-group-title">{entry.title}</p>
          {entry.items.map((item) => (
            <Link key={item.slug} href={docsHref(item.slug)} aria-current={item.slug === slug ? "page" : undefined}>
              {item.title}
            </Link>
          ))}
        </div>
      ))}
    </nav>
  );
}

/**
 * Documentation shell: grouped sidebar, page header, sections with an
 * "On this page" rail, and a previous/next pager. All server-rendered.
 */
export function DocsLayout({
  slug,
  title,
  intro,
  meta,
  sections = [],
  children,
}: {
  /** Page slug from lib/docs/nav.ts. Use "" for the documentation index. */
  slug: string;
  title: string;
  intro: string;
  meta?: DocsMeta[];
  sections?: DocsSectionSpec[];
  children?: ReactNode;
}) {
  const { previous, next } = docsNeighbours(slug);
  const group = docsNav.find((entry) => entry.items.some((item) => item.slug === slug));
  const hasToc = sections.length > 2;
  const currentTitle = slug === "" ? "Overview" : (docsPages.find((page) => page.slug === slug)?.title ?? title);

  return (
    <div className={hasToc ? "docs-shell docs-shell-toc container" : "docs-shell container"}>
      <aside className="docs-sidebar">
        <div className="docs-sidebar-head">
          <p className="eyebrow">Documentation</p>
          <span className="docs-version">API v1 / pilot</span>
          <p className="small muted">{siteConfig.maturity}</p>
        </div>
        <DocsNav slug={slug} />
        <div className="docs-sidebar-foot">
          <Link className="text-link" href="/api">
            API overview
          </Link>
          <Link className="text-link" href="/status">
            Service status
          </Link>
          <a className="text-link" href={siteConfig.repository} rel="noreferrer" target="_blank">
            Source repository <ArrowUpRight size={14} aria-hidden="true" />
          </a>
        </div>
      </aside>

      <details className="docs-menu">
        <summary>
          <span>Documentation</span>
          <strong>{currentTitle}</strong>
        </summary>
        <DocsNav slug={slug} />
      </details>

      <article className="docs-content">
        <header className="docs-header">
          <p className="eyebrow">{group ? group.title : "Documentation"}</p>
          <h1>{title}</h1>
          <p className="lede">{intro}</p>
          {meta && meta.length > 0 ? (
            <dl className="docs-meta">
              {meta.map(([label, value]) => (
                <div key={label}>
                  <dt>{label}</dt>
                  <dd>{value}</dd>
                </div>
              ))}
            </dl>
          ) : null}
        </header>
        <div className="docs-body">
          {children}
          {sections.map((section) => (
            <section id={section.id} key={section.id}>
              <h2>
                {section.title}
                <a className="docs-anchor" href={`#${section.id}`} aria-label={`Link to ${section.title}`}>
                  #
                </a>
              </h2>
              {section.body}
            </section>
          ))}
        </div>
        {previous || next ? (
          <nav className="docs-pager" aria-label="Previous and next pages">
            {previous ? (
              <Link href={docsHref(previous.slug)} rel="prev">
                <span>
                  <ArrowLeft size={13} aria-hidden="true" /> Previous
                </span>
                <strong>{previous.title}</strong>
              </Link>
            ) : null}
            {next ? (
              <Link href={docsHref(next.slug)} rel="next">
                <span>
                  Next <ArrowRight size={13} aria-hidden="true" />
                </span>
                <strong>{next.title}</strong>
              </Link>
            ) : null}
          </nav>
        ) : null}
      </article>

      {hasToc ? (
        <aside className="docs-toc" aria-label="On this page">
          <p className="docs-nav-group-title">On this page</p>
          <ol>
            {sections.map((section) => (
              <li key={section.id}>
                <a href={`#${section.id}`}>{section.title}</a>
              </li>
            ))}
          </ol>
        </aside>
      ) : null}
    </div>
  );
}
