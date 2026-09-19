import { DocsPage } from "@/app/_shared/DocsPage";
import { pageMetadata } from "@/lib/seo/metadata";

export const metadata = pageMetadata(
  "Documentation | PesaGuard",
  "Practical guidance for integrating, monitoring, and operating PesaGuard on your M-Pesa flow.",
  "/documentation",
);

export default function Documentation(){return <DocsPage title="Documentation for payment operators." intro="Practical guidance for integrating, monitoring, and operating PesaGuard."/>}
