import { DocsPage } from "@/app/_shared/DocsPage";
import { DocsTable } from "@/app/_shared/DocsTable";
import { Callout } from "@/components/documentation/blocks";
import { CodeBlock } from "@/components/ui/CodeBlock";
import { apiBaseUrl, apiKeyHeader, bearerHeader, errorAuth } from "@/content/api-samples";
import { pageMetadata } from "@/lib/seo/metadata";

export const metadata = pageMetadata(
  "Authentication | PesaGuard docs",
  "API keys, bearer tokens, roles and permissions, and tenant scoping in the PesaGuard API.",
  "/documentation/authentication",
);

const roles: [string, string, string, string, string, string][] = [
  ["owner (28)", "Read + write", "Yes", "Yes", "No", "Yes"],
  ["platform-admin (26)", "Read + write", "Yes", "Yes", "No", "Yes"],
  ["admin (25)", "Read + write", "Yes", "Yes", "No", "No"],
  ["operator (10)", "Read + write", "Yes", "No", "No", "No"],
  ["operations (9)", "Read + write", "Yes", "No", "Yes", "No"],
  ["finance (10)", "Read", "No", "No", "Yes", "No"],
  ["auditor (10)", "Read", "No", "No", "Yes", "No"],
  ["analyst (8)", "Read", "No", "No", "Yes", "No"],
  ["customer-user (5)", "Read", "No", "No", "No", "No"],
  ["read-only (4)", "Read", "No", "No", "No", "No"],
  ["org-admin (7)", "None", "No", "No", "No", "No"],
  ["org-manager (4)", "None", "No", "No", "No", "No"],
  ["department-admin (3)", "None", "No", "No", "No", "No"],
];

export default function Authentication() {
  return (
    <DocsPage
      slug="authentication"
      title="Authentication"
      intro="Two credential types are accepted. Use an API key from servers and jobs, and a bearer token for signed-in people. Both resolve to a tenant, a role and a set of permissions."
      meta={[
        ["Header", "X-API-Key or Authorization"],
        ["Key prefix", "pk_"],
        ["Scope", "One tenant per credential"],
      ]}
      sections={[
        {
          id: "credentials",
          title: "Choosing a credential",
          body: (
            <DocsTable
              caption="API keys compared with bearer tokens"
              head={["", "API key", "Bearer token (JWT)"]}
              rows={[
                ["Header", <code key="a">X-API-Key</code>, <code key="b">Authorization: Bearer</code>],
                ["Meant for", "Servers, scheduled jobs, integrations", "A person signed in to the dashboard"],
                ["Bound to", "One tenant, one role, an optional narrower scope list", "The user, their tenant and their role"],
                ["Lifetime", "1 to 3,650 days, or until revoked", "Short-lived; expires and can be revoked"],
                ["Issued by", "A user with manage:api_keys", "The login flow"],
              ]}
            />
          ),
        },
        {
          id: "api-keys",
          title: "API keys",
          body: (
            <>
              <p>
                A key is created for a tenant and given a role. It may also be given a list of scopes, and every scope must
                be a permission the role already holds, so a key can be narrower than its role but never wider. Keys begin
                with <code>pk_</code>.
              </p>
              <ul>
                <li>The full key is returned once, when it is created. Only a SHA-256 hash is stored.</li>
                <li>Issuing a key writes an audit entry recording who issued it.</li>
                <li>An expired or revoked key fails with <code>invalid_api_key</code>.</li>
                <li>Keys created without an explicit role are given <code>read_only</code>.</li>
              </ul>
              <CodeBlock label="Sending a key" language="http" code={apiKeyHeader} />
            </>
          ),
        },
        {
          id: "bearer-tokens",
          title: "Bearer tokens",
          body: (
            <>
              <p>Signed-in users authenticate with a JWT in the standard header.</p>
              <CodeBlock label="Sending a token" language="http" code={bearerHeader} />
              <Callout tone="warn" title="Do not send an API key as a bearer token">
                When an <code>Authorization</code> header is present it is always treated as a JWT. A <code>pk_</code> key
                placed there fails with <code>invalid_token</code>. If both headers are sent, <code>Authorization</code> wins
                and <code>X-API-Key</code> is ignored.
              </Callout>
            </>
          ),
        },
        {
          id: "tenancy",
          title: "Tenants",
          body: (
            <>
              <p>
                Every credential belongs to a tenant, and every query and write is filtered to it. Passing a different tenant
                in a header or query parameter does not widen access: it returns <code>403 tenant_access_denied</code>.
                Only roles that hold <code>manage:all_tenants</code> (<code>owner</code> and <code>platform-admin</code>) can
                act across tenants.
              </p>
              <p>
                <code>POST /api/v1/transactions</code> accepts an <code>X-Tenant-ID</code> header for credentials that carry
                no tenant of their own. If the credential does carry one, the header is optional and must match.
              </p>
            </>
          ),
        },
        {
          id: "roles",
          title: "Roles and permissions",
          body: (
            <>
              <p>
                Permissions are strings in the form <code>action:resource</code>, such as <code>read:discrepancies</code> or{" "}
                <code>write:discrepancies</code>. Roles are fixed sets of them. The table shows the permissions that matter
                for the endpoints documented here; the number beside each role is the size of its full set.
              </p>
              <DocsTable
                caption="Role capabilities"
                head={["Role (permissions)", "Discrepancies", "Bulk resolve", "Manage keys", "Read transactions", "All tenants"]}
                rows={roles}
                compact
              />
            </>
          ),
        },
        {
          id: "errors",
          title: "Authentication errors",
          body: (
            <>
              <p>
                Credential failures return a JSON body with a machine-readable <code>error</code> and a human{" "}
                <code>message</code>.
              </p>
              <CodeBlock label="401 response" language="json" code={errorAuth} />
              <DocsTable
                caption="Authentication and permission errors"
                head={["Status", "error", "Meaning"]}
                rows={[
                  ["401", <code key="a">missing_auth_header</code>, "No credential was sent."],
                  ["401", <code key="b">invalid_api_key</code>, "The API key is invalid, expired or revoked."],
                  ["401", <code key="c">invalid_auth_header</code>, "The Authorization header is malformed."],
                  ["401", <code key="d">invalid_token</code>, "The token is invalid, expired or revoked."],
                  ["403", <code key="e">insufficient_permissions</code>, "The credential lacks the permission the endpoint needs."],
                  ["403", <code key="f">tenant_access_denied</code>, "The request named a tenant the credential does not belong to."],
                  ["503", <code key="g">authentication_unavailable</code>, "Authentication state could not be read. Retry."],
                ]}
              />
            </>
          ),
        },
        {
          id: "handling-keys",
          title: "Handling keys",
          body: (
            <ul>
              <li>Keep keys in a secret manager or the environment of the service that uses them. Never ship one to a browser or mobile app.</li>
              <li>Issue one key per integration so that revoking one does not interrupt the others.</li>
              <li>Prefer an expiry. Rotate by issuing the new key, deploying it, then revoking the old one.</li>
              <li>
                Host: <code>{apiBaseUrl}</code>. Use HTTPS only.
              </li>
            </ul>
          ),
        },
      ]}
    />
  );
}
