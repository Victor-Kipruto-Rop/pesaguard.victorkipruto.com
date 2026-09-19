import { DocsPage } from "@/app/_shared/DocsPage";
import { DocsTable } from "@/app/_shared/DocsTable";
import { CodeBlock } from "@/components/ui/CodeBlock";
import { apiKeyHeader, bearerHeader } from "@/content/api-samples";

export default function Authentication() {
  return (
    <DocsPage title="Authentication" intro="Two credential types are accepted: tenant-scoped API keys and JWT bearer tokens.">
      <section>
        <h2>API keys</h2>
        <p>
          Use an API key for server-to-server calls. Keys start with <code>pk_</code>, belong to one tenant, carry a
          role and scopes, and can expire (1 to 3,650 days) or be revoked. Send the key in the{" "}
          <code>X-API-Key</code> header.
        </p>
        <CodeBlock label="API key" language="http" code={apiKeyHeader} />
      </section>
      <section>
        <h2>Bearer tokens</h2>
        <p>Signed-in users authenticate with a JWT in the standard header.</p>
        <CodeBlock label="Bearer token" language="http" code={bearerHeader} />
        <p>
          Do not send an API key as a bearer token. When an <code>Authorization</code> header is present it is
          treated as a JWT, so a <code>pk_</code> key sent there fails with a 401.
        </p>
      </section>
      <section>
        <h2>Authentication errors</h2>
        <DocsTable
          caption="Authentication and permission errors"
          head={["Status", "error", "Meaning"]}
          rows={[
            ["401", <code key="a">missing_auth_header</code>, "No credential was sent."],
            ["401", <code key="b">invalid_api_key</code>, "The API key is invalid, expired, or revoked."],
            ["401", <code key="c">invalid_auth_header</code>, "The Authorization header is malformed."],
            ["401", <code key="d">invalid_token</code>, "The token is invalid, expired, or revoked."],
            ["403", <code key="e">insufficient_permissions</code>, "The credential lacks the required permission."],
            ["503", <code key="f">authentication_unavailable</code>, "Authentication state is temporarily unavailable."],
          ]}
        />
      </section>
    </DocsPage>
  );
}
