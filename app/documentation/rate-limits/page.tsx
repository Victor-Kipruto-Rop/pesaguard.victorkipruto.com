import { DocsPage } from "@/app/_shared/DocsPage";

export default function RateLimits() {
  return (
    <DocsPage title="Rate limits" intro="No per-tenant request limits are published yet.">
      <section>
        <p>Some endpoints can return 429 Too Many Requests. Back off, then retry with the same Idempotency-Key so a retry is never processed twice.</p>
      </section>
    </DocsPage>
  );
}
