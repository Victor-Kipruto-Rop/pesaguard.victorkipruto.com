import { ContactForm } from "@/components/contact/ContactForm";
import { pageMetadata } from "@/lib/seo/metadata";

export const metadata = pageMetadata(
  "Sales | PesaGuard",
  "Share your M-Pesa flow and reconciliation process. We follow up with a focused pilot conversation.",
  "/contact/sales",
);

export default function Sales(){return <section className="section"><div className="container split"><div><p className="eyebrow">Sales</p><h1>Build a more accountable payment operation.</h1><p className="lede">Share a little context and our team will follow up with a focused conversation.</p></div><ContactForm kind="sales"/></div></section>}
