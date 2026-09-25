import Link from "next/link";
import { DocsPage } from "@/app/_shared/DocsPage";
import { DocsTable } from "@/app/_shared/DocsTable";
import { Callout } from "@/components/documentation/blocks";
import { pageMetadata } from "@/lib/seo/metadata";

export const metadata = pageMetadata(
  "Reconciliation | PesaGuard docs",
  "How PesaGuard matches M-Pesa callbacks to internal records: the order of checks, the amount tolerance, the time window and the outcome statuses.",
  "/documentation/reconciliation",
);

export default function Reconciliation() {
  return (
    <DocsPage
      slug="reconciliation"
      title="Reconciliation"
      intro="Reconciliation compares each M-Pesa transaction with your internal records and decides one of seven outcomes. The checks run in a fixed order, and the first one that applies wins."
      meta={[
        ["Default tolerance", "0.5% of the amount, minimum 0.01"],
        ["Default time window", "900 seconds"],
        ["Outcomes", "7 statuses"],
      ]}
      sections={[
        {
          id: "outcomes",
          title: "Outcomes",
          body: (
            <DocsTable
              caption="Reconciliation statuses"
              head={["Status", "Meaning"]}
              rows={[
                [<code key="a">MATCHED</code>, "Reference, amount and time all agree with one internal record."],
                [<code key="b">PENDING</code>, "An exact match exists, but the matched internal record is flagged as pending."],
                [<code key="c">PARTIAL</code>, "The record matches on reference, or on amount and time, but the amount is short or only within tolerance."],
                [<code key="d">MISMATCH</code>, "A candidate exists but the amount is outside tolerance, or the times are too far apart."],
                [<code key="e">UNMATCHED</code>, "No internal record fits."],
                [<code key="f">DUPLICATE</code>, "The transaction ID was already seen, or more than one internal record shares the reference."],
                [<code key="g">EXCEPTION</code>, "The input could not be evaluated, for example a missing ID. The result carries a reason."],
              ]}
            />
          ),
        },
        {
          id: "order",
          title: "The order of checks",
          body: (
            <>
              <p>
                Read the list top to bottom. A transaction leaves at the first step that decides its status, which is why a
                duplicate is never reported as a mismatch.
              </p>
              <DocsTable
                caption="Matching order"
                head={["#", "Check", "Result", "Rule recorded"]}
                rows={[
                  ["1", "The input cannot be normalised, or has no transaction ID", "EXCEPTION", "reason text"],
                  ["2", "A refund or reversal with no original reference", "EXCEPTION", <code key="a">refund_requires_original_reference</code>],
                  ["3", "The transaction ID was already seen", "DUPLICATE", <code key="b">duplicate_transaction_id</code>],
                  ["4", "Refund or reversal, and no record holds the original reference", "UNMATCHED", <code key="c">original_transaction_missing</code>],
                  ["5", "More than one internal record has this reference", "DUPLICATE", <code key="d">duplicate_internal_reference</code>],
                  ["6", "There are no internal records to compare", "UNMATCHED", <code key="e">missing_internal_record</code>],
                  ["7", "Reference, amount and time all match", "MATCHED or PENDING", <code key="f">reference_exact</code>],
                  ["8", "Same reference, internal amount lower than received", "PARTIAL", <code key="g">partial_amount</code>],
                  ["9", "Same reference, amount difference beyond tolerance", "MISMATCH", <code key="h">amount_mismatch</code>],
                  ["10", "Same reference, amount within tolerance", "PARTIAL", <code key="i">amount_within_tolerance</code>],
                  ["11", "No reference match, but amount and time are both within limits", "PARTIAL", <><code key="j1">amount_within_tolerance</code>, <code key="j2">timestamp_within_window</code></>],
                  ["12", "No reference match; the amount matches but the time is outside the window", "MISMATCH", <><code key="k1">amount_match</code>, <code key="k2">timestamp_mismatch_or_reference_mismatch</code></>],
                  ["13", "Nothing fits", "UNMATCHED", <code key="l">no_matching_candidate</code>],
                ]}
              />
              <p>
                On steps 8 to 10, if the timestamps are also outside the window, <code>timestamp_mismatch</code> is added to
                the rules and a <code>PARTIAL</code> becomes a <code>MISMATCH</code>. Refunds also record{" "}
                <code>refund_original_reference</code> or <code>reversal_original_reference</code>.
              </p>
            </>
          ),
        },
        {
          id: "tolerance",
          title: "Tolerance and window",
          body: (
            <>
              <p>
                Two numbers decide how forgiving matching is. The <strong>amount tolerance</strong> is a percentage of the
                received amount with a floor of 0.01, so 0.5% of KES 2,845.00 is KES 14.225, and no payment is ever held to
                less than one cent. The <strong>time window</strong> is the largest gap allowed between the callback
                time and the internal record.
              </p>
              <Callout title="These are the engine defaults">
                0.5% and 900 seconds are what the engine uses when a deployment does not override them. Confirm the values
                for your tenant during onboarding rather than assuming them.
              </Callout>
            </>
          ),
        },
        {
          id: "scoring",
          title: "Every result carries its evidence",
          body: (
            <p>
              A result includes the status, the internal record it was compared with (if any), the list of rules that fired
              and a match score between 0 and 1. An exact match scores 1.0 and a transaction with no candidate scores 0.0.
              The rules are what an analyst reads to understand a status without re-deriving it.
            </p>
          ),
        },
        {
          id: "after",
          title: "After a result",
          body: (
            <p>
              Results that need a person are worked as discrepancies. Listing, assigning and closing them is covered on the{" "}
              <Link href="/documentation/discrepancies">Discrepancies</Link> page.
            </p>
          ),
        },
      ]}
    />
  );
}
