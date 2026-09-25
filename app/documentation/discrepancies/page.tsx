import Link from "next/link";
import { DocsPage } from "@/app/_shared/DocsPage";
import { DocsTable } from "@/app/_shared/DocsTable";
import { Callout, EndpointHeader, ParamTable } from "@/components/documentation/blocks";
import { CodeBlock } from "@/components/ui/CodeBlock";
import {
  discrepancyBulkRequest,
  discrepancyBulkResponse,
  discrepancyListRequest,
  discrepancyListResponse,
  discrepancyResolveRequest,
  publicReconciliationsRequest,
} from "@/content/api-samples";
import { pageMetadata } from "@/lib/seo/metadata";

export const metadata = pageMetadata(
  "Discrepancies API | PesaGuard docs",
  "List, assign, annotate and resolve the reconciliation exceptions PesaGuard raises, with filters, SLA fields and permissions.",
  "/documentation/discrepancies",
);

export default function Discrepancies() {
  return (
    <DocsPage
      slug="discrepancies"
      title="Discrepancies"
      intro="A discrepancy is a transaction that reconciliation could not settle on its own. These endpoints are how a finance or operations team reads, assigns, annotates and closes them."
      meta={[
        ["Paths", "/discrepancies"],
        ["Read", "read:discrepancies"],
        ["Write", "write:discrepancies"],
      ]}
      sections={[
        {
          id: "about-this-api",
          title: "About this API",
          body: (
            <Callout title="This is the dashboard API">
              These are the routes the PesaGuard dashboard calls. They have no <code>/v1</code> prefix and no separate
              versioning promise yet, so treat the response shape as pilot-stage and read fields by name rather than by
              position. Every route is tenant-scoped: you only ever see and change your own tenant’s records.
            </Callout>
          ),
        },
        {
          id: "list",
          title: "List discrepancies",
          body: (
            <>
              <EndpointHeader
                method="GET"
                path="/discrepancies"
                facts={[
                  ["Permission", "read:discrepancies"],
                  ["Order", "Newest detection first"],
                  ["Page size", "1 to 100, default 10"],
                ]}
              />
              <ParamTable
                caption="Query parameters"
                params={[
                  {
                    name: "status",
                    type: "enum",
                    description: (
                      <>
                        One of <code>needs_review</code>, <code>assigned</code>, <code>resolved</code>, <code>open</code>,{" "}
                        <code>closed</code>, <code>pending</code>, <code>missing_payment</code>,{" "}
                        <code>missing_transaction</code>, <code>amount_mismatch</code>, <code>duplicate</code>. Matches
                        either the workflow status or the anomaly type.
                      </>
                    ),
                  },
                  {
                    name: "severity",
                    type: "enum",
                    description: (
                      <>
                        <code>critical</code>, <code>warning</code> or <code>info</code>.
                      </>
                    ),
                  },
                  {
                    name: "resolved",
                    type: "enum",
                    description: (
                      <>
                        <code>open</code> for unresolved, <code>resolved</code> for closed ones.
                      </>
                    ),
                  },
                  {
                    name: "q",
                    type: "string, max 200",
                    description: "Substring match on the transaction ID or the anomaly type.",
                  },
                  { name: "page", type: "integer", description: "1 to 1,000,000. Defaults to 1." },
                  { name: "per_page", type: "integer", description: "1 to 100. Defaults to 10." },
                  {
                    name: "tenant",
                    type: "string",
                    description: "Optional. Must equal your own tenant; any other value returns 403 tenant_access_denied.",
                  },
                ]}
              />
              <CodeBlock label="Request" language="bash" code={discrepancyListRequest} />
              <CodeBlock label="200 OK (illustrative values)" language="json" code={discrepancyListResponse} />
            </>
          ),
        },
        {
          id: "fields",
          title: "Record fields",
          body: (
            <ParamTable
              caption="Fields on each item"
              params={[
                { name: "id", type: "string", description: "The discrepancy ID. Use it in the routes below." },
                { name: "trans_id", type: "string", description: "The provider transaction the exception belongs to." },
                { name: "anomaly_type", type: "string", description: "What reconciliation found, for example amount_mismatch." },
                { name: "status", type: "string", description: "Workflow state, for example needs_review or assigned." },
                { name: "severity", type: "string", description: "critical, warning or info." },
                { name: "resolved", type: "boolean", description: "True once resolved." },
                { name: "details", type: "object", description: "Structured detail recorded with the exception." },
                { name: "assignee", type: "string or null", description: "Who is working it." },
                { name: "notes", type: "string or null", description: "Free-text notes, one line per note." },
                { name: "timeline", type: "array", description: "Dated events: assigned, note_added, bulk_resolved." },
                { name: "detected_at", type: "ISO 8601", description: "When the exception was raised, in UTC." },
                { name: "sla_status", type: "string", description: "on_track, warning, breaching or resolved. See below." },
                { name: "sla_remaining_minutes", type: "integer or null", description: "Minutes left in the response window." },
              ]}
            />
          ),
        },
        {
          id: "sla",
          title: "How the SLA fields work",
          body: (
            <>
              <p>
                Each exception has a response window that starts at <code>detected_at</code>. The default window is 30
                minutes and a deployment can change it. <code>sla_status</code> is computed on every read from the time that
                remains.
              </p>
              <DocsTable
                caption="sla_status values"
                head={["Value", "When"]}
                rows={[
                  [<code key="a">on_track</code>, "More than 20 minutes remain."],
                  [<code key="b">warning</code>, "20 minutes or fewer remain."],
                  [<code key="c">breaching</code>, "10 minutes or fewer remain, or the window has passed."],
                  [<code key="d">resolved</code>, "The exception is resolved. Remaining minutes are 0."],
                ]}
              />
              <p>
                The 20 and 10 minute thresholds are fixed. With the default 30-minute window an item is{" "}
                <code>on_track</code> for its first 10 minutes, <code>warning</code> until minute 20, and{" "}
                <code>breaching</code> after that. A longer window keeps items <code>on_track</code> for longer.
              </p>
            </>
          ),
        },
        {
          id: "customer-routes",
          title: "Read-only customer routes",
          body: (
            <>
              <p>
                Two further routes return a tenant’s results without the dashboard’s filters. Both are read-only, ordered
                newest first, and paged with <code>limit</code> (1 to 200, default 50) and <code>offset</code>.
              </p>
              <DocsTable
                caption="Customer routes"
                head={["Route", "Permission", "Returns"]}
                rows={[
                  [<code key="a">GET /public/customers/{"{tenant_id}"}/reconciliations</code>, <code key="b">read:discrepancies</code>, "count and a list of id, trans_id, anomaly_type, status, severity, details, detected_at, resolved."],
                  [<code key="c">GET /public/customers/{"{tenant_id}"}/reports</code>, <code key="d">read:analytics</code>, "count and a list of generated reports: id, report_type, period_start, period_end, status, created_at, content."],
                ]}
              />
              <CodeBlock label="Request" language="bash" code={publicReconciliationsRequest} />
              <p>
                The <code>tenant_id</code> in the path must be your own; another tenant’s ID is refused with{" "}
                <code>403</code>.
              </p>
            </>
          ),
        },
        {
          id: "assign",
          title: "Assign",
          body: (
            <>
              <EndpointHeader
                method="POST"
                path="/discrepancies/{id}/assign"
                facts={[
                  ["Permission", "write:discrepancies"],
                  ["Body", "assignee (string, required)"],
                  ["Returns", "status and assignee"],
                ]}
              />
              <p>
                Sets <code>assignee</code> and adds an <code>assigned</code> event to the timeline. Send an empty string to
                clear the assignment; the event then reads “Assignment cleared”.
              </p>
            </>
          ),
        },
        {
          id: "notes",
          title: "Add a note",
          body: (
            <>
              <EndpointHeader
                method="POST"
                path="/discrepancies/{id}/notes"
                facts={[
                  ["Permission", "write:discrepancies"],
                  ["Body", "note (string, required)"],
                  ["Returns", "status and all notes"],
                ]}
              />
              <p>
                Notes append; they never overwrite. Each one is also added to the timeline as <code>note_added</code>.
              </p>
            </>
          ),
        },
        {
          id: "resolve",
          title: "Resolve one",
          body: (
            <>
              <EndpointHeader
                method="POST"
                path="/discrepancies/{id}/resolve"
                facts={[
                  ["Permission", "write:discrepancies"],
                  ["Body", "note (string, optional)"],
                  ["Returns", "status and id"],
                ]}
              />
              <CodeBlock label="Request" language="bash" code={discrepancyResolveRequest} />
              <p>
                Marks the record resolved, stamps the time, stores the note as the resolution note, and writes an audit entry
                that names the acting user. An ID that is not in your tenant returns <code>404 not_found</code>.
              </p>
            </>
          ),
        },
        {
          id: "bulk-resolve",
          title: "Resolve many",
          body: (
            <>
              <EndpointHeader
                method="POST"
                path="/discrepancies/bulk-resolve"
                facts={[
                  ["Permission", "bulk:operations"],
                  ["Body", "ids (array, required), note (optional)"],
                  ["Returns", "updated count and skipped_ids"],
                ]}
              />
              <CodeBlock label="Request" language="bash" code={discrepancyBulkRequest} />
              <CodeBlock label="200 OK" language="json" code={discrepancyBulkResponse} />
              <p>
                IDs that do not exist in your tenant are skipped and listed in <code>skipped_ids</code>; the rest are
                resolved. The call does not fail because some IDs were unknown, so check <code>updated</code> against the
                number you sent. The default note is “Bulk resolved”.
              </p>
              <p>
                Which roles hold these permissions is set out on <Link href="/documentation/authentication#roles">Authentication</Link>.
              </p>
            </>
          ),
        },
      ]}
    />
  );
}
