import { DocsPage } from "@/app/_shared/DocsPage";

export default function Fraud() {
  return (
    <DocsPage title="Fraud signals" intro="There is no public fraud-signals endpoint yet.">
      <section>
        <p>PesaGuard’s anomaly detection is not exposed through a public API.</p>
      </section>
    </DocsPage>
  );
}
