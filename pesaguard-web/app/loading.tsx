/**
 * Route-level loading skeleton.
 *
 * Deliberately contains no heading: the fallback is inlined into the
 * prerendered HTML alongside the resolved page, so an `<h1>` here would give
 * every route two `h1`s and hand crawlers a "Loading" headline. The skeleton
 * mirrors the page-hero proportions instead.
 */
export default function Loading() {
  return (
    <section aria-busy="true" aria-live="polite" className="page-hero">
      <div aria-hidden="true" className="container skeleton-stack">
        <span className="skeleton-bar skeleton-bar-sm" />
        <span className="skeleton-bar skeleton-bar-lg" />
        <span className="skeleton-bar skeleton-bar-md" />
      </div>
      <span className="visually-hidden">Loading page content</span>
    </section>
  );
}
