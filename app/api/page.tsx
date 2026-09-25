import { ApiPage } from "@/app/_shared/ApiPage";
import { pageMetadata } from "@/lib/seo/metadata";

export const metadata = pageMetadata(
  "API overview | PesaGuard",
  "What the PesaGuard API offers today: idempotent transaction ingestion, discrepancy review, and what is not yet exposed.",
  "/api",
);

export default function Api() {
  return (
    <ApiPage
      title="Record transactions. Work the exceptions."
      intro="One idempotent write to put a transaction on the record, then read, assign and resolve what reconciliation raises. Documented from the source, including what is not built yet."
    />
  );
}
