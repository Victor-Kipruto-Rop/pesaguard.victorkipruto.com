import { ApiPage } from "@/app/_shared/ApiPage";
import { pageMetadata } from "@/lib/seo/metadata";

export const metadata = pageMetadata(
  "API reference | PesaGuard",
  "Endpoints, payloads and error shapes for transactions, reconciliation, fraud signals and webhooks.",
  "/api",
);

export default function Api(){return <ApiPage title="An API built for accountable flows." intro="Connect transaction events, reconciliation workflows, and risk signals to your own systems."/>}
