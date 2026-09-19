/**
 * Product-route loading skeleton. See `app/loading.tsx` for why this renders no
 * heading element.
 */
export default function Loading() {
  return (
    <section aria-busy="true" aria-live="polite" className="page-hero">
      <div aria-hidden="true" className="container skeleton-stack">
        <span className="skeleton-bar skeleton-bar-sm" />
        <span className="skeleton-bar skeleton-bar-xl" />
        <span className="skeleton-bar skeleton-bar-md" />
      </div>
      <span className="visually-hidden">Loading the product view</span>
    </section>
  );
}
